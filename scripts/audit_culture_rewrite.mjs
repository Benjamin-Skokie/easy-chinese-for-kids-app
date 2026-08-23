import fs from "node:fs/promises";
import path from "node:path";

const articleDirs = process.argv.slice(2);

if (!articleDirs.length) {
  console.error("Usage: node scripts/audit_culture_rewrite.mjs culture/content/<category>/<slug> [...]");
  process.exit(2);
}

const allowedDifficulty = new Set(["简单", "中等", "困难"]);
const difficultyEnglish = new Map([
  ["简单", "Easy"],
  ["中等", "Medium"],
  ["困难", "Hard"]
]);

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) return null;
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^"|"$/g, "")
        ];
      })
      .filter(Boolean)
  );
}

function parseTaggedBlock(block, tag) {
  return block.match(new RegExp(`\\[${tag}\\]\\n([\\s\\S]*?)\\n\\[\\/${tag}\\]`))?.[1] ?? "";
}

function pageLanguageDocument(markdown, language, heroTitle) {
  const headingKey = language === "zh" ? "heading_zh" : "heading_en";
  const sections = [...markdown.matchAll(/\[section\]\n([\s\S]*?)\n\[\/section\]/g)]
    .map((match) => match[1])
    .map((section) => {
      const heading = section.match(new RegExp(`^${headingKey}:\\s*(.+)$`, "m"))?.[1]?.trim();
      const body = parseTaggedBlock(section, language).trim();
      return heading && body ? `## ${heading}\n\n${body}` : "";
    })
    .filter(Boolean);

  const endingBlock = markdown.match(/\[ending\]\n([\s\S]*?)\n\[\/ending\]/)?.[1] ?? "";
  const endingHeading = endingBlock.match(new RegExp(`^${headingKey}:\\s*(.+)$`, "m"))?.[1]?.trim();
  const endingBody = parseTaggedBlock(endingBlock, language).trim();
  if (endingHeading && endingBody) sections.push(`## ${endingHeading}\n\n${endingBody}`);

  return [`# ${heroTitle}`, ...sections].join("\n\n").trim();
}

function standaloneLanguageDocument(markdown) {
  return markdown.replace(/^> (?:难度|Difficulty)[:：][^\n]*\n+/, "").trim();
}

function normalizeTitle(title) {
  return title.replace(/\s*[—–-]{1,2}\s*/g, "：").replace(/\s+/g, " ").trim();
}

function countSentences(paragraph, language) {
  if (language === "zh") {
    return (paragraph.match(/[。！？]/g) ?? []).length;
  }
  return (paragraph.match(/[.!?](?=[ ”\"’)]|$)/g) ?? []).length;
}

function proseParagraphs(markdown, language, isPage) {
  const sourceBlocks = isPage
    ? [...markdown.matchAll(new RegExp(`\\[${language}\\]\\n([\\s\\S]*?)\\n\\[\\/${language}\\]`, "g"))].map(
        (match) => match[1]
      )
    : [markdown];

  return sourceBlocks
    .flatMap((block) => block.split(/\n\s*\n/))
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph) =>
        paragraph &&
        paragraph !== "---" &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith(">") &&
        !paragraph.startsWith("[")
    );
}

function findFragmentedRuns(markdown, language, isPage) {
  const paragraphs = proseParagraphs(markdown, language, isPage);
  const runs = [];
  let current = [];

  for (const paragraph of paragraphs) {
    if (countSentences(paragraph, language) <= 1) {
      current.push(paragraph);
      continue;
    }

    if (current.length >= 3) runs.push(current);
    current = [];
  }

  if (current.length >= 3) runs.push(current);
  return runs;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function auditArticle(inputDir) {
  const articleDir = path.resolve(inputDir);
  const label = path.relative(process.cwd(), articleDir);
  const failures = [];
  const files = Object.fromEntries(
    await Promise.all(
      ["page.md", "zh.md", "en.md", "references.md"].map(async (filename) => {
        const filePath = path.join(articleDir, filename);
        if (!(await exists(filePath))) {
          failures.push(`missing ${filename}`);
          return [filename, ""];
        }
        return [filename, await fs.readFile(filePath, "utf8")];
      })
    )
  );

  if (!files["page.md"]) return { label, failures };

  const frontmatter = parseFrontmatter(files["page.md"]);
  if (!allowedDifficulty.has(frontmatter.difficulty)) {
    failures.push(`invalid page.md difficulty: ${frontmatter.difficulty || "missing"}`);
  }

  const hero = files["page.md"].match(/\[hero\]\n([\s\S]*?)\n\[\/hero\]/)?.[1] ?? "";
  const heroTitleZh = hero.match(/^title_zh:\s*(.+)$/m)?.[1]?.trim();
  const heroTitleEn = hero.match(/^title_en:\s*(.+)$/m)?.[1]?.trim();
  if (frontmatter.title_zh !== heroTitleZh) failures.push("page.md Chinese frontmatter and hero titles differ");
  if (frontmatter.title_en !== heroTitleEn) failures.push("page.md English frontmatter and hero titles differ");

  if (files["zh.md"] && !files["zh.md"].startsWith(`> 难度：${frontmatter.difficulty}\n`)) {
    failures.push("zh.md difficulty does not match page.md");
  }

  const expectedEnglishDifficulty = difficultyEnglish.get(frontmatter.difficulty);
  if (files["en.md"] && !files["en.md"].startsWith(`> Difficulty: ${expectedEnglishDifficulty}\n`)) {
    failures.push("en.md difficulty does not match page.md");
  }

  for (const [filename, language, heroTitle] of [
    ["zh.md", "zh", heroTitleZh],
    ["en.md", "en", heroTitleEn]
  ]) {
    if (!files[filename] || !heroTitle) continue;
    const pageDocument = pageLanguageDocument(files["page.md"], language, heroTitle);
    const standaloneDocument = standaloneLanguageDocument(files[filename]);
    const standaloneTitle = standaloneDocument.match(/^#\s+(.+)$/m)?.[1]?.trim();
    if (normalizeTitle(standaloneTitle ?? "") !== normalizeTitle(heroTitle)) {
      failures.push(`${filename} title does not match page.md`);
    }
    const pageSectionCount = (pageDocument.match(/^##\s+/gm) ?? []).length;
    const standaloneSectionCount = (standaloneDocument.match(/^##\s+/gm) ?? []).length;
    if (pageSectionCount !== standaloneSectionCount) {
      failures.push(`${filename} section count is not synchronized with page.md`);
    }
  }

  const imageNames = [...files["page.md"].matchAll(/^image:\s*(.+)$/gm)].map((match) => match[1].trim());
  for (const imageName of imageNames) {
    if (!(await exists(path.join(articleDir, "images", imageName)))) {
      failures.push(`missing image: images/${imageName}`);
    }
  }

  for (const [filename, language, isPage] of [
    ["page.md", "zh", true],
    ["page.md", "en", true],
    ["zh.md", "zh", false],
    ["en.md", "en", false]
  ]) {
    if (!files[filename]) continue;
    const runs = findFragmentedRuns(files[filename], language, isPage);
    if (runs.length) {
      failures.push(
        `${filename} has ${runs.length} run(s) of 3+ consecutive one-sentence paragraphs (${language})`
      );
    }
  }

  if (files["references.md"]) {
    if (!files["references.md"].includes("does not render on the website")) {
      failures.push("references.md is missing the non-rendering editorial note");
    }
    if (!/^URL:\s*https?:\/\//m.test(files["references.md"])) {
      failures.push("references.md has no direct URL");
    }
    if (!/^Accessed:\s*\d{4}-\d{2}-\d{2}$/m.test(files["references.md"])) {
      failures.push("references.md has no valid access date");
    }
    if (!files["references.md"].includes("Supports:")) {
      failures.push("references.md has no Supports section");
    }
    if (!files["references.md"].includes("Editorial boundary:")) {
      failures.push("references.md has no Editorial boundary section");
    }
  }

  return { label, failures };
}

let failed = false;
for (const articleDir of articleDirs) {
  const result = await auditArticle(articleDir);
  if (result.failures.length) {
    failed = true;
    console.error(`FAIL ${result.label}`);
    for (const failure of result.failures) console.error(`  - ${failure}`);
  } else {
    console.log(`PASS ${result.label}`);
  }
}

if (failed) process.exitCode = 1;
