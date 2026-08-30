import { readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { learnAudioEntries } from "../../src/data/learn-audio-manifest.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const audioDirectory = path.join(projectRoot, "assets/audio/learn");
const retainedSilenceMs = 100;
const thresholdDb = -45;
const concurrency = 12;
const onlyArgument = process.argv.find((argument) => argument.startsWith("--only="));
const selectedIds = new Set(onlyArgument?.slice("--only=".length).split(",").filter(Boolean) ?? []);
const reportPath = path.join(projectRoot, selectedIds.size ? "docs/audio-boundary-targeted-trim-report.md" : "docs/audio-boundary-trim-report.md");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve({ stdout, stderr }) : reject(new Error(`${command} failed (${code}): ${stderr}`)));
  });
}

async function inspectAudio(fileName) {
  const filePath = path.join(audioDirectory, fileName);
  const [durationResult, silenceResult] = await Promise.all([
    run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", filePath]),
    run("ffmpeg", ["-hide_banner", "-i", filePath, "-af", `silencedetect=noise=${thresholdDb}dB:d=0.015`, "-f", "null", "-"])
  ]);
  const durationMs = Math.round(Number(durationResult.stdout.trim()) * 1000);
  const starts = [...silenceResult.stderr.matchAll(/silence_start: ([0-9.]+)/gu)].map((match) => Number(match[1]) * 1000);
  const ends = [...silenceResult.stderr.matchAll(/silence_end: ([0-9.]+)/gu)].map((match) => Number(match[1]) * 1000);
  const leading = starts[0] === 0 && ends.length ? Math.round(ends[0]) : 0;
  const trailingStart = starts.at(-1);
  const trailing = Number.isFinite(trailingStart) && trailingStart > 0 ? Math.max(0, Math.round(durationMs - trailingStart)) : 0;
  return { fileName, durationMs, leading, trailing };
}

async function trimAudio(measurement) {
  const startMs = Math.max(0, measurement.leading - retainedSilenceMs);
  const endMs = Math.max(0, measurement.trailing - retainedSilenceMs);
  if (!startMs && !endMs) return { ...measurement, startMs, endMs, trimmed: false };
  const inputPath = path.join(audioDirectory, measurement.fileName);
  const outputPath = path.join(audioDirectory, `.${measurement.fileName}.trim.mp3`);
  const contentDurationSeconds = Math.max(0.05, (measurement.durationMs - startMs - endMs) / 1000);
  await run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", inputPath,
    "-ss", (startMs / 1000).toFixed(3), "-t", contentDurationSeconds.toFixed(3),
    "-map_metadata", "-1", "-c:a", "libmp3lame", "-b:a", "128k", outputPath
  ]);
  await rename(outputPath, inputPath);
  return { ...measurement, startMs, endMs, trimmed: true };
}

async function runWorkers(items, task) {
  const results = [];
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const item = items[nextIndex];
      nextIndex += 1;
      results.push(await task(item));
    }
  }));
  return results;
}

const entryById = new Map(learnAudioEntries.map((entry) => [entry.id, entry]));
const allFiles = (await readdir(audioDirectory)).filter((file) => /^[a-f0-9]{12}\.mp3$/u.test(file)).sort();
const files = selectedIds.size
  ? allFiles.filter((file) => selectedIds.has(file.slice(0, -4)))
  : allFiles;
if (selectedIds.size && files.length !== selectedIds.size) {
  const presentIds = new Set(files.map((file) => file.slice(0, -4)));
  throw new Error(`Unknown Learn recording id(s): ${[...selectedIds].filter((id) => !presentIds.has(id)).join(", ")}`);
}
const measurements = await runWorkers(files, inspectAudio);
const results = await runWorkers(measurements, trimAudio);
const largeTailCuts = results
  .filter((item) => item.endMs >= 1000)
  .sort((a, b) => b.endMs - a.endMs);
const reportRows = largeTailCuts.map((item) => {
  const id = item.fileName.slice(0, -4);
  const text = entryById.get(id)?.text ?? "(unregistered asset)";
  return `| \`${id}\` | ${text} | ${item.leading} | ${item.trailing} | ${item.startMs} | ${item.endMs} |`;
});
const scope = selectedIds.size ? `The selected ${files.length}` : `All ${files.length}`;
const report = `# Learn audio boundary trimming report\n\n${scope} Learn MP3 files were measured at ${thresholdDb} dBFS (15 ms minimum silence) and processed with ${concurrency} workers. The source files now retain at most ${retainedSilenceMs} ms at either end.\n\n${results.filter((item) => item.trimmed).length} files changed. The table below lists every recording with at least 1,000 ms removed from its tail.\n\n| ID | Text | Original leading (ms) | Original trailing (ms) | Leading removed (ms) | Trailing removed (ms) |\n| --- | --- | ---: | ---: | ---: | ---: |\n${reportRows.join("\n")}\n`;
await writeFile(reportPath, report);
console.log(`Trimmed ${results.filter((item) => item.trimmed).length}/${files.length} Learn recordings with ${concurrency} workers.`);
console.log(`Large trailing cuts (>= 1000 ms): ${largeTailCuts.length}. Report: ${path.relative(projectRoot, reportPath)}`);
