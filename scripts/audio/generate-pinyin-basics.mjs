import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pinyinAudioClips, pinyinAudioBase } from "../../src/features/foundations/pinyin-audio-manifest.js";

const apiKey = process.env.OPENAI_API_KEY;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const onlyArgument = process.argv.find((argument) => argument.startsWith("--only="));
const selectedIds = new Set(onlyArgument?.slice("--only=".length).split(",").filter(Boolean) ?? []);
const chaptersArgument = process.argv.find((argument) => argument.startsWith("--chapters="));
const selectedChapters = new Set(
  chaptersArgument?.slice("--chapters=".length).split(",").flatMap((part) => {
    const [start, end = start] = part.split("-").map(Number);
    return Number.isFinite(start) && Number.isFinite(end)
      ? Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index)
      : [];
  }) ?? []
);
// Keep the entire Pinyin course on one reviewed voice. Do not let a local
// environment variable silently change production lesson audio.
const voice = "marin";
const outputDirectory = path.resolve(pinyinAudioBase);

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
  const outputPath = path.join(outputDirectory, clip.file);
  if (!force && await exists(outputPath)) {
    console.log(`skip ${clip.id}`);
    return { status: "skipped", bytes: 0 };
  }
  if (dryRun) {
    console.log(`${clip.id}\t${clip.text}\t${clip.pinyin}`);
    return { status: "listed", bytes: 0 };
  }

  const targetKind = clip.kind === "single-final" ? "single final" : clip.kind === "compound-final" ? "compound final" : clip.kind === "nasal-final" ? "nasal final" : clip.kind === "initial" ? "initial classroom call-sound" : "word";
  const instructions = clip.kind === "initial"
    ? `Chinese Hanyu Pinyin lesson for young children. Use a gentle adult female teaching voice. The target initial is ${clip.text}. Its classroom call-sound is “${clip.pinyin}”. Say only “${clip.pinyin}” once in standard Mandarin: clear, crisp, steady first tone, with no held-out final vowel or trailing sound. Do not say the English letter name. Do not explain, spell, translate, or repeat it.`
    : clip.kind === "compound-final" || clip.kind === "nasal-final"
      ? `Chinese Hanyu Pinyin lesson for young children. Use a gentle adult female teaching voice. The target ${targetKind} is “${clip.text}”. Say only the final “${clip.pinyin}” once, clearly and smoothly in standard Mandarin, with a steady first-tone teaching contour. ${clip.context ? `Important: ${clip.context}. ` : ""}Do not say the anchor word, spell letters, explain, translate, or repeat it.`
    : `Chinese Pinyin lesson for children. Use a gentle adult female teaching voice. Say exactly one syllable: “${clip.pinyin}”, the ${targetKind} “${clip.text}”${clip.context ? `, ${clip.context}` : ""}. Say it once, clearly and slowly in standard Mandarin. Do not add words.`;
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
      instructions
    })
  });

  if (!response.ok) {
    throw new Error(`${clip.id}: OpenAI TTS failed (${response.status}): ${await response.text()}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, audio);
  console.log(`made ${clip.id} (${audio.length} bytes)`);
  return { status: "generated", bytes: audio.length };
}

await mkdir(outputDirectory, { recursive: true });
let generated = 0;
let skipped = 0;
let bytes = 0;

const clipsToGenerate = selectedIds.size
  ? pinyinAudioClips.filter((clip) => selectedIds.has(clip.id))
  : selectedChapters.size
    ? pinyinAudioClips.filter((clip) => clip.chapters?.some((chapter) => selectedChapters.has(chapter)))
    : pinyinAudioClips;

if (selectedIds.size && selectedIds.size !== clipsToGenerate.length) {
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
