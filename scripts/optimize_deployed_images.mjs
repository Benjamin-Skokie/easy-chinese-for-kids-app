#!/usr/bin/env node
/**
 * Compress only oversized images referenced by the current site.
 * Ordinary images: 120,000 bytes. Only the full creature map is exempt.
 * Keep dimensions and composition; retain originals in a temporary backup.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, renameSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { auditImageBudgets, imageBudgetExceptions } from "./check_image_budgets.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { oversized } = await auditImageBudgets();
const candidates = oversized.filter(({ file }) => !imageBudgetExceptions.has(file));
const unsupported = candidates.filter(({ file }) => !file.endsWith(".webp"));
if (unsupported.length) throw new Error("Convert oversized non-WebP images explicitly before optimizing.");
const overBudgetMaps = oversized.filter(({ file }) => imageBudgetExceptions.has(file));
if (overBudgetMaps.length) throw new Error("The large map exceeds its separate budget; review it without automatic recompression.");

if (!candidates.length) {
  console.log("All referenced images already meet their budgets.");
} else {
  const backup = mkdtempSync(join(tmpdir(), "nihao-image-budget-"));
  console.log(`Original image backups: ${backup}`);
  writeFileSync(join(backup, "manifest.json"), JSON.stringify(candidates.map((entry, index) => ({
    ...entry, original: `${index}-original.webp`
  })), null, 2));
  let saved = 0;
  for (const [index, { file, bytes, budget }] of candidates.entries()) {
    const input = join(root, file);
    const original = join(backup, `${index}-original.webp`);
    const encoded = join(backup, `${index}-encoded.webp`);
    copyFileSync(input, original);
    const beforeInfo = execFileSync("webpinfo", [original], { encoding: "utf8" });
    const alphaBytes = Number(beforeInfo.match(/Chunk ALPH[^\n]*length\s+(\d+)/)?.[1] ?? 0);
    // Target slightly below the hard cap to allow encoder size variation.
    // Never resize, crop, redraw, or remove the alpha channel.
    for (const target of [budget - 1_000, budget - 4_000, budget - 8_000]) {
      // WebP's target-size search does not fully account for the alpha chunk.
      // Reserve its space while keeping transparency lossless.
      execFileSync("cwebp", ["-quiet", "-m", "6", "-q", "95", "-alpha_q", "100", "-size", String(Math.max(1_000, target - alphaBytes)), "-pass", "10", original, "-o", encoded]);
      if (statSync(encoded).size <= budget) break;
    }
    const finalBytes = statSync(encoded).size;
    if (finalBytes > budget) throw new Error(`Could not meet budget without resizing: ${file}`);
    const afterInfo = execFileSync("webpinfo", [encoded], { encoding: "utf8" });
    const shape = (info) => [info.match(/Width:\s*(\d+)/)?.[1], info.match(/Height:\s*(\d+)/)?.[1], /Chunk ALPH/.test(info)];
    if (JSON.stringify(shape(beforeInfo)) !== JSON.stringify(shape(afterInfo))) throw new Error(`Dimensions or transparency changed: ${file}`);
    // The temporary output is on the same machine. Copy to a sibling first
    // so replacement is atomic even if the temporary directory is another volume.
    const sibling = `${input}.optimizing.webp`;
    copyFileSync(encoded, sibling);
    renameSync(sibling, input);
    saved += bytes - finalBytes;
    console.log(`${index + 1}/${candidates.length}: ${file}: ${bytes} -> ${finalBytes} bytes`);
  }
  console.log(`Compressed ${candidates.length} images without resizing; saved ${saved} bytes. Originals retained at ${backup}`);
}
