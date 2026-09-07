import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function loadCultureCatalogLocations(projectRoot) {
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

  return storyLocations;
}
