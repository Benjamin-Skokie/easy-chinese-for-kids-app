import fs from "node:fs/promises";
import path from "node:path";

const requestedDirs = process.argv.slice(2);
const contentRoot = path.resolve("culture/content");

async function findArticleDirs(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const directories = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(directory, entry.name);
    try {
      await fs.access(path.join(fullPath, "page.md"));
      directories.push(fullPath);
    } catch (error) {
      if (!error || error.code !== "ENOENT") throw error;
      directories.push(...await findArticleDirs(fullPath));
    }
  }
  return directories;
}

const articleDirs = requestedDirs.length === 1 && requestedDirs[0] === "--all"
  ? (await findArticleDirs(contentRoot)).sort()
  : requestedDirs;

if (!articleDirs.length) {
  console.error("Usage: node scripts/sync_culture_manuscripts.mjs --all | culture/content/<category>/<slug> [...]");
  process.exit(2);
}

const difficultyEnglish = new Map([
  ["简单", "Easy"],
  ["中等", "Medium"],
  ["困难", "Hard"]
]);

function parseValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:[ \\t]*([^\\r\\n]*)$`, "m"))?.[1]?.trim();
}

function parseTaggedBlock(block, tag) {
  return block.match(new RegExp(`\\[${tag}\\]\\n([\\s\\S]*?)\\n\\[\\/${tag}\\]`))?.[1]?.trim() ?? "";
}

function renderManuscript(page, language, difficulty, sourceName = "page.md") {
  const titleKey = language === "zh" ? "title_zh" : "title_en";
  const headingKey = language === "zh" ? "heading_zh" : "heading_en";
  const hero = page.match(/\[hero\]\n([\s\S]*?)\n\[\/hero\]/)?.[1] ?? "";
  const title = parseValue(hero, titleKey);
  const blocks = [...page.matchAll(/\[(?:section|ending)\]\n([\s\S]*?)\n\[\/(?:section|ending)\]/g)]
    .map((match) => match[1])
    .map((block) => {
      const heading = parseValue(block, headingKey);
      const body = parseTaggedBlock(block, language);
      if (!body) return "";
      return heading ? `## ${heading}\n\n${body}` : body;
    })
    .filter(Boolean);

  if (!title || !blocks.length) throw new Error(`Could not parse ${language} manuscript from ${sourceName}`);
  const label = language === "zh" ? `> 难度：${difficulty}` : `> Difficulty: ${difficultyEnglish.get(difficulty)}`;
  return `${label}\n\n# ${title}\n\n${blocks.join("\n\n---\n\n")}\n`;
}

async function syncPage(articleDir, sourceName, outputSuffix = "") {
  const pagePath = path.join(articleDir, sourceName);
  const page = await fs.readFile(pagePath, "utf8");
  const difficulty = parseValue(page.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "", "difficulty");
  if (!difficultyEnglish.has(difficulty)) throw new Error(`Invalid difficulty in ${pagePath}`);

  await Promise.all([
    fs.writeFile(path.join(articleDir, `zh${outputSuffix}.md`), renderManuscript(page, "zh", difficulty, sourceName)),
    fs.writeFile(path.join(articleDir, `en${outputSuffix}.md`), renderManuscript(page, "en", difficulty, sourceName))
  ]);
}

for (const inputDir of articleDirs) {
  const articleDir = path.resolve(inputDir);
  await syncPage(articleDir, "page.md");

  for (const variant of ["early", "story"]) {
    try {
      await fs.access(path.join(articleDir, `page.${variant}.md`));
      await syncPage(articleDir, `page.${variant}.md`, `.${variant}`);
    } catch (error) {
      if (!error || error.code !== "ENOENT") throw error;
    }
  }
  console.log(`SYNC ${path.relative(process.cwd(), articleDir)}`);
}
