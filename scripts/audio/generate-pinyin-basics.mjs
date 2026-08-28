import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pinyinBasicsAudioClips, pinyinBasicsAudioBase } from "../../src/features/foundations/pinyin-audio-manifest.js";

const apiKey = process.env.OPENAI_API_KEY;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const onlyArgument = process.argv.find((argument) => argument.startsWith("--only="));
const selectedIds = new Set(onlyArgument?.slice("--only=".length).split(",").filter(Boolean) ?? []);
const voice = process.env.OPENAI_TTS_VOICE || "marin";
const outputDirectory = path.resolve(pinyinBasicsAudioBase);

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

async function generate(clip) {
  const outputPath = path.join(outputDirectory, `${clip.id}.mp3`);
  if (!force && await exists(outputPath)) {
    console.log(`skip ${clip.id}`);
    return { status: "skipped", bytes: 0 };
  }
  if (dryRun) {
    console.log(`${clip.id}\t${clip.text}\t${clip.pinyin}`);
    return { status: "listed", bytes: 0 };
  }

  const targetKind = clip.kind === "single-final" ? "single final" : "word";
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice,
      response_format: "mp3",
      input: clip.ttsInput ?? clip.text,
      instructions: `Chinese Pinyin lesson for children. Say exactly one syllable: “${clip.pinyin}”, the ${targetKind} “${clip.text}”${clip.context ? `, ${clip.context}` : ""}. Say it once, clearly and slowly in standard Mandarin. Do not add words.`
    })
  });

  if (!response.ok) {
    throw new Error(`${clip.id}: OpenAI TTS failed (${response.status}): ${await response.text()}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, audio);
  console.log(`made ${clip.id} (${audio.length} bytes)`);
  return { status: "generated", bytes: audio.length };
}

await mkdir(outputDirectory, { recursive: true });
let generated = 0;
let skipped = 0;
let bytes = 0;

const clipsToGenerate = selectedIds.size
  ? pinyinBasicsAudioClips.filter((clip) => selectedIds.has(clip.id))
  : pinyinBasicsAudioClips;

if (selectedIds.size !== clipsToGenerate.length) {
  const knownIds = new Set(clipsToGenerate.map((clip) => clip.id));
  const unknownIds = [...selectedIds].filter((id) => !knownIds.has(id));
  throw new Error(`Unknown audio clip id(s): ${unknownIds.join(", ")}`);
}

for (const clip of clipsToGenerate) {
  const result = await generate(clip);
  if (result.status === "generated") generated += 1;
  if (result.status === "skipped") skipped += 1;
  bytes += result.bytes;
}

console.log(`Done: ${generated} generated, ${skipped} skipped, ${(bytes / 1024).toFixed(1)} KiB written.`);
