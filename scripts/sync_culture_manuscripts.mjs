import fs from "node:fs/promises";
import path from "node:path";

const articleDirs = process.argv.slice(2);

if (!articleDirs.length) {
  console.error("Usage: node scripts/sync_culture_manuscripts.mjs culture/content/<category>/<slug> [...]");
  process.exit(2);
}

const difficultyEnglish = new Map([
  ["简单", "Easy"],
  ["中等", "Medium"],
  ["困难", "Hard"]
]);

function parseValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim();
}

function parseTaggedBlock(block, tag) {
  return block.match(new RegExp(`\\[${tag}\\]\\n([\\s\\S]*?)\\n\\[\\/${tag}\\]`))?.[1]?.trim() ?? "";
}

function renderManuscript(page, language, difficulty) {
  const titleKey = language === "zh" ? "title_zh" : "title_en";
  const headingKey = language === "zh" ? "heading_zh" : "heading_en";
  const hero = page.match(/\[hero\]\n([\s\S]*?)\n\[\/hero\]/)?.[1] ?? "";
  const title = parseValue(hero, titleKey);
  const blocks = [...page.matchAll(/\[(?:section|ending)\]\n([\s\S]*?)\n\[\/(?:section|ending)\]/g)]
    .map((match) => match[1])
    .map((block) => {
      const heading = parseValue(block, headingKey);
      const body = parseTaggedBlock(block, language);
      return heading && body ? `## ${heading}\n\n${body}` : "";
    })
    .filter(Boolean);

  if (!title || !blocks.length) throw new Error(`Could not parse ${language} manuscript from page.md`);
  const label = language === "zh" ? `> 难度：${difficulty}` : `> Difficulty: ${difficultyEnglish.get(difficulty)}`;
  return `${label}\n\n# ${title}\n\n${blocks.join("\n\n")}\n`;
}

for (const inputDir of articleDirs) {
  const articleDir = path.resolve(inputDir);
  const pagePath = path.join(articleDir, "page.md");
  const page = await fs.readFile(pagePath, "utf8");
  const difficulty = parseValue(page.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "", "difficulty");
  if (!difficultyEnglish.has(difficulty)) throw new Error(`Invalid difficulty in ${pagePath}`);

  await Promise.all([
    fs.writeFile(path.join(articleDir, "zh.md"), renderManuscript(page, "zh", difficulty)),
    fs.writeFile(path.join(articleDir, "en.md"), renderManuscript(page, "en", difficulty))
  ]);
  console.log(`SYNC ${path.relative(process.cwd(), articleDir)}`);
}
