import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error(
    "OPENAI_API_KEY is not available in this Terminal session. Load it, then run this command again.",
  );
  process.exit(1);
}

const target = process.argv[2] || "ā";
const voice = process.argv[4] || process.env.OPENAI_TTS_VOICE || "marin";
const outputArgument =
  process.argv[3] || `tmp/tts-preview/pinyin-a-${voice}.mp3`;
const outputPath = path.resolve(outputArgument);

const response = await fetch("https://api.openai.com/v1/audio/speech", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-4o-mini-tts",
    voice,
    response_format: "mp3",
    input: target,
    instructions:
      "Hanyu Pinyin lesson for children: a o e i u ü, b p m f, d t n l, g k h, j q x, zh ch sh r, z c s, y w. Use a clear, calm adult woman's voice. Pronounce only the supplied target once, clearly and slowly, in standard Mandarin. Do not explain or add words.",
  }),
});

if (!response.ok) {
  const detail = await response.text();
  console.error(`OpenAI TTS request failed (${response.status}).`);
  console.error(detail);
  process.exit(1);
}

const audio = Buffer.from(await response.arrayBuffer());
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, audio);

console.log(`Created ${outputPath}`);
console.log(`${audio.length} bytes`);
