import { learnAudioEntries } from "../data/learn-audio-manifest.js";
import { recordedLearnAudioIds, recordedLearnAudioVersion } from "../data/learn-recorded-audio.js";

const entryByText = new Map(learnAudioEntries.map((entry) => [entry.text, entry]));
const normalizedEntryByText = new Map();

function normalizedAudioText(text) {
  return String(text ?? "")
    .normalize("NFKC")
    .replace(/[\s，。！？、,.!?；;：:]+/gu, "");
}

for (const entry of learnAudioEntries) {
  const normalizedText = normalizedAudioText(entry.text);
  if (normalizedText && !normalizedEntryByText.has(normalizedText)) normalizedEntryByText.set(normalizedText, entry);
}

export function recordedLearnAudioPath(text) {
  const entry = entryByText.get(text) ?? normalizedEntryByText.get(normalizedAudioText(text));
  if (!entry || !recordedLearnAudioIds.has(entry.id)) return "";
  return `assets/audio/learn/${entry.id}.mp3?v=${recordedLearnAudioVersion}`;
}

export function hasRecordedLearnAudio(text) {
  return Boolean(recordedLearnAudioPath(text));
}
