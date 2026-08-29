import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { learnAudioEntries } from "../../src/data/learn-audio-manifest.js";
import { buildLearnAudioRequest } from "./learn-audio-prompt.mjs";

const apiKey = process.env.OPENAI_API_KEY;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const showPrompt = process.argv.includes("--show-prompt");
const onlyArgument = process.argv.find((argument) => argument.startsWith("--only="));
const selectedIds = new Set(onlyArgument?.slice("--only=".length).split(",").filter(Boolean) ?? []);
const limitArgument = process.argv.find((argument) => argument.startsWith("--limit="));
const limit = Number(limitArgument?.slice("--limit=".length) ?? 0);
const concurrencyArgument = process.argv.find((argument) => argument.startsWith("--concurrency="));
const concurrency = Math.max(1, Number(concurrencyArgument?.slice("--concurrency=".length) ?? 3));
const sourceArgument = process.argv.find((argument) => argument.startsWith("--source="));
const sources = new Set(
  sourceArgument?.slice("--source=".length).split(",").filter(Boolean) ?? []
);
const projectRoot = path.resolve(import.meta.dirname, "../..");
const audioDirectory = path.join(projectRoot, "assets/audio/learn");

if (!apiKey && !dryRun) {
  console.error("OPENAI_API_KEY is unavailable. Run with node --env-file=.env.local ...");
  process.exit(1);
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generate(entry) {
  const outputPath = path.join(audioDirectory, `${entry.id}.mp3`);
  const speechRequest = buildLearnAudioRequest(entry);
  if (dryRun) {
    if (showPrompt) {
      console.log(JSON.stringify({ id: entry.id, text: entry.text, pinyin: entry.pinyin, ...speechRequest }, null, 2));
    } else {
      console.log(`${entry.id}\t${entry.text}\t${entry.pinyin}`);
    }
    return "listed";
  }
  if (!force && await exists(outputPath)) return "skipped";
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "marin",
      response_format: "mp3",
      speed: 0.95,
      ...speechRequest
    })
  });
  if (!response.ok) throw new Error(`${entry.id}: OpenAI TTS failed (${response.status}): ${await response.text()}`);
  await mkdir(audioDirectory, { recursive: true });
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
  console.log(`made ${entry.id} — ${entry.text}`);
  return "generated";
}

let selected = selectedIds.size ? learnAudioEntries.filter((entry) => selectedIds.has(entry.id)) : learnAudioEntries;
if (selectedIds.size !== 0 && selected.length !== selectedIds.size) {
  const knownIds = new Set(selected.map((entry) => entry.id));
  throw new Error(`Unknown audio clip id(s): ${[...selectedIds].filter((id) => !knownIds.has(id)).join(", ")}`);
}
if (sources.size) selected = selected.filter((entry) => entry.sources.some((entrySource) => sources.has(entrySource)));
if (limit > 0) selected = selected.slice(0, limit);

let nextIndex = 0;
let generated = 0;
let skipped = 0;
const workers = Array.from({ length: Math.min(concurrency, selected.length) }, async () => {
  while (nextIndex < selected.length) {
    const entry = selected[nextIndex];
    nextIndex += 1;
    const result = await generate(entry);
    if (result === "generated") generated += 1;
    if (result === "skipped") skipped += 1;
  }
});
await Promise.all(workers);
console.log(`Done: ${generated} generated, ${skipped} skipped, ${selected.length} selected.`);
