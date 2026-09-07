import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCultureCatalogLocations } from "./culture_catalog_locations.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const storyLocations = await loadCultureCatalogLocations(projectRoot);

const backLinkPattern =
  /(<nav class="back-nav">\s*)<a href="[^"]*">←(?:\s*返回目录)?\s*Back to Catalog<\/a>/;
let updatedCount = 0;

for (const [storyId, catalogLocation] of storyLocations) {
  const articlePath = resolve(projectRoot, "culture/books", storyId, "index.html");
  const articleHTML = await readFile(articlePath, "utf8");
  const expectedLink = `<a href="../../../../culture.html#${catalogLocation}">← Back to Catalog</a>`;

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
