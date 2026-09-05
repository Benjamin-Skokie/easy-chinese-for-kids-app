#!/usr/bin/env node
/**
 * Enforce the deployed image budget: no image shipped to GitHub Pages may
 * exceed 120 KB. Quality is reduced first; dimensions are reduced only when
 * necessary. The replacement is made atomically in place.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, renameSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const maxDeployedImageBytes = 120 * 1024;
const qualitySteps = [82, 76, 70, 64, 58, 52, 46];
const scaleSteps = [1, 0.9, 0.8, 0.7, 0.6, 0.5];
const tracked = execFileSync('git', ['ls-files', '*.webp'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((file) => (
    (file.startsWith('assets/') && !file.startsWith('assets/_png-archive/'))
    || (file.startsWith('culture/')
      && !file.startsWith('culture/content/')
      && !file.startsWith('culture/image-archive/'))
  ))
  .filter(existsSync);

const candidates = tracked.filter((file) => statSync(file).size > maxDeployedImageBytes);
let savedBytes = 0;
const failed = [];
let optimizedCount = 0;

function dimensionsFor(file) {
  const info = execFileSync('webpinfo', [file], { encoding: 'utf8' });
  const width = info.match(/Width:\s*(\d+)/)?.[1];
  const height = info.match(/Height:\s*(\d+)/)?.[1];
  if (!width || !height) throw new Error(`Could not read WebP dimensions: ${file}`);
  return { width: Number(width), height: Number(height) };
}

for (const file of candidates) {
  const originalBytes = statSync(file).size;
  const temporary = join('.', `${file}.optimizing.webp`);
  const { width, height } = dimensionsFor(file);
  let finalBytes = Infinity;

  for (const scale of scaleSteps) {
    for (const quality of qualitySteps) {
      const args = ['-quiet', '-q', String(quality)];
      if (scale < 1) args.push('-resize', String(Math.round(width * scale)), String(Math.round(height * scale)));
      args.push(file, '-o', temporary);
      execFileSync('cwebp', args);
      finalBytes = statSync(temporary).size;
      if (finalBytes <= maxDeployedImageBytes) break;
    }
    if (finalBytes <= maxDeployedImageBytes) break;
  }

  if (finalBytes > maxDeployedImageBytes || finalBytes >= originalBytes) {
    rmSync(temporary, { force: true });
    failed.push(file);
    console.log(`Could not meet the 120 KB limit: ${file}`);
    continue;
  }

  renameSync(temporary, file);
  savedBytes += originalBytes - finalBytes;
  optimizedCount += 1;
  if (optimizedCount % 50 === 0) console.log(`Optimized ${optimizedCount} images…`);
}

console.log(`Optimized ${optimizedCount}/${candidates.length} deployed WebP files; saved ${(savedBytes / 1024 / 1024).toFixed(2)} MiB.`);
if (failed.length) process.exitCode = 1;
