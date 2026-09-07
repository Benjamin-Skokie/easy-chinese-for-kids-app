import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalogMemoPath = resolve(projectRoot, "docs/culture/catalog_mapping_proposal.md");
const catalogMemo = await readFile(catalogMemoPath, "utf8");

const storyLocations = new Map();
let mainCatalogId = "";
let subcatalogId = "";

for (const line of catalogMemo.split(/\r?\n/)) {
  const mainCatalogMatch = line.match(/^###\s+\d+\.\s+.+?\s+\(`([^`]+)`\)/);
  if (mainCatalogMatch) {
    mainCatalogId = mainCatalogMatch[1];
    subcatalogId = "";
    continue;
  }

  const subcatalogMatch = line.match(/^####\s+\d+\.\d+\s+.+?\s+\(`([^`]+)`\)/);
  if (subcatalogMatch) {
    subcatalogId = subcatalogMatch[1];
    continue;
  }

  const storyMatch = line.match(/^\|\s*`([^`]+)`\s*\|/);
  if (!storyMatch || !mainCatalogId || !subcatalogId) continue;

  const storyId = storyMatch[1];
  if (storyLocations.has(storyId)) {
    throw new Error(`Duplicate story in catalog memo: ${storyId}`);
  }
  storyLocations.set(storyId, `${mainCatalogId}/${subcatalogId}`);
}

if (storyLocations.size !== 111) {
  throw new Error(`Expected 111 mapped stories, found ${storyLocations.size}.`);
}

const backLinkPattern =
  /(<nav class="back-nav">\s*)<a href="[^"]*">←(?:\s*返回目录)?\s*Back to Catalog<\/a>/;
let updatedCount = 0;

for (const [storyId, catalogLocation] of storyLocations) {
  const articlePath = resolve(projectRoot, "culture/books", storyId, "index.html");
  const articleHTML = await readFile(articlePath, "utf8");
  const expectedLink = `<a href="../../../../culture-v2.html#${catalogLocation}">← Back to Catalog</a>`;

  if (!backLinkPattern.test(articleHTML)) {
    throw new Error(`Back-to-catalog link not found in ${storyId}.`);
  }

  const updatedHTML = articleHTML.replace(backLinkPattern, `$1${expectedLink}`);
  if (updatedHTML !== articleHTML) {
    await writeFile(articlePath, updatedHTML);
    updatedCount += 1;
  }
}

console.log(`Updated ${updatedCount} of ${storyLocations.size} story catalog links.`);
