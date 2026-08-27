import fs from "node:fs/promises";
import path from "node:path";
import { strokeCorpus } from "../src/data/stroke-corpus.js";

const outputDirectory = path.resolve("assets/stroke-data");
const sourceRoot = "https://raw.githubusercontent.com/chanind/hanzi-writer-data/master/data";

await fs.mkdir(outputDirectory, { recursive: true });

for (const character of strokeCorpus) {
  const response = await fetch(`${sourceRoot}/${encodeURIComponent(character)}.json`);
  if (!response.ok) throw new Error(`Could not fetch ${character}: ${response.status}`);
  const data = await response.json();
  const valid = Array.isArray(data.strokes)
    && Array.isArray(data.medians)
    && data.strokes.length === data.medians.length
    && data.strokes.every((stroke) => typeof stroke === "string" && /^M(?:\s|[-\d])/.test(stroke))
    && data.medians.every((median) => Array.isArray(median));
  if (!valid) throw new Error(`Rejected unexpected data for ${character}`);
  const safeData = { strokes: data.strokes, medians: data.medians };
  await fs.writeFile(path.join(outputDirectory, `${character}.json`), `${JSON.stringify(safeData)}\n`);
  console.log(`${character}: ${data.strokes.length} strokes`);
}
