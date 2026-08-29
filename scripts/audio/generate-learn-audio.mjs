import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { learnAudioEntries } from "../../src/data/learn-audio-manifest.js";

const apiKey = process.env.OPENAI_API_KEY;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
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
const pronunciationGuidance = new Map([
  ["爸爸妈妈爱我", "Say 爸爸 as two clean, fully voiced syllables: bà ba. Keep the first syllable crisp with no crackle, clipping, or break."],
  ["爸爸妈妈爱我。", "Say 爸爸 as two clean, fully voiced syllables: bà ba. Keep the first syllable crisp with no crackle, clipping, or break."],
  ["我们是哥哥弟弟姐姐和妹妹", "Say every family word smoothly and clearly: gē ge, dì di, jiě jie, hé mèi mei. Keep every syllable fully voiced, with no crackle, clipped consonant, or broken sound."],
  ["我们是哥哥、弟弟、姐姐和妹妹。", "Say every family word smoothly and clearly: gē ge, dì di, jiě jie, hé mèi mei. Keep every syllable fully voiced, with no crackle, clipped consonant, or broken sound."],
  ["玩儿电脑游戏", "Say 玩儿电脑 as one unbroken sound sequence: wánrdiàn. The r is a very brief rhotic ending attached to wán and must flow immediately into diàn, with no separate er syllable and no silence after it."],
  ["他在玩儿电脑游戏", "Say 玩儿电脑 as one unbroken sound sequence: wánrdiàn. The r is a very brief rhotic ending attached to wán and must flow immediately into diàn, with no separate er syllable and no silence after it."],
  ["他在玩儿电脑游戏。", "Say 玩儿电脑 as one unbroken sound sequence: wánrdiàn. The r is a very brief rhotic ending attached to wán and must flow immediately into diàn, with no separate er syllable and no silence after it."],
  ["看动画片儿", "The final word is piānr. Keep the 儿化 ending extremely short and connected directly to piān; do not pause or make 儿 a separate syllable."],
  ["她喜欢看动画片儿", "The final word is piānr. Keep the 儿化 ending extremely short and connected directly to piān; do not pause or make 儿 a separate syllable. Begin 她 clearly and confidently."],
  ["她喜欢看动画片儿。", "The final word is piānr. Keep the 儿化 ending extremely short and connected directly to piān; do not pause or make 儿 a separate syllable. Begin 她 clearly and confidently."],
  ["书桌", "Say shū zhuō clearly and deliberately as two full syllables. Do not rush, clip, or omit either syllable."],
  ["我可以看电视吗", "Keep 可以看 as one connected phrase with no artificial pause between 可以 and 看."],
  ["我可以看电视吗？", "Keep 可以看 as one connected phrase with no artificial pause between 可以 and 看."]
]);

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
  if (!force && await exists(outputPath)) return "skipped";
  if (dryRun) {
    console.log(`${entry.id}\t${entry.text}\t${entry.pinyin}`);
    return "listed";
  }

  const reading = entry.pinyin ? ` The intended Mandarin reading is “${entry.pinyin}”.` : "";
  const weekdayGuidance = /^星期[一二三四五六天]$/.test(entry.text)
    ? " Say xīng and qī as two crisp, confident syllables; do not blur them together."
    : "";
  const clipGuidance = pronunciationGuidance.has(entry.text)
    ? ` ${pronunciationGuidance.get(entry.text)}`
    : "";
  // TTS models can mistake the written 儿 in 儿化 words for a separate syllable.
  // Feed the base spelling while the instructions retain the intended rhotic reading.
  const spokenInput = new Map([
    ["玩儿电脑游戏", "玩电脑游戏"],
    ["他在玩儿电脑游戏", "他在玩电脑游戏"],
    ["他在玩儿电脑游戏。", "他在玩电脑游戏。"]
  ]).get(entry.text) ?? entry.text;
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "marin",
      response_format: "mp3",
      speed: 0.95,
      input: spokenInput,
      instructions: `Chinese lesson for young children. Use a clear, warm adult female teaching voice. Say exactly the supplied Chinese text once at a natural, slightly slow pace.${reading}${weekdayGuidance}${clipGuidance} Preserve every Mandarin tone. Do not add an introduction, translation, spelling, or a repeat.`
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
