import { statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { collectProjectStats } from "./build_project_stats.mjs";

export const ordinaryImageBudget = 120_000;
export const imageBudgetExceptions = new Map([
  ["culture/books/literature/shan-hai-jing/map/assets/map-world.webp", 1_536_000]
]);
export const imageBudgetFor = (file) => imageBudgetExceptions.get(file) ?? ordinaryImageBudget;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export async function auditImageBudgets() {
  const { allImagePaths } = await collectProjectStats();
  const images = allImagePaths.map((file) => ({
    file, bytes: statSync(join(root, file)).size, budget: imageBudgetFor(file)
  }));
  return { images, oversized: images.filter(({ bytes, budget }) => bytes > budget) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { images, oversized } = await auditImageBudgets();
  if (oversized.length) {
    for (const { file, bytes, budget } of oversized) console.error(`${file}: ${bytes} bytes exceeds ${budget}`);
    process.exitCode = 1;
  } else {
    console.log(`Checked ${images.length} referenced image files: ordinary images <= 120,000 bytes; only the full creature map has an exception.`);
  }
}
