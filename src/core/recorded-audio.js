import { learnAudioEntries } from "../data/learn-audio-manifest.js";
import { recordedLearnAudioIds, recordedLearnAudioVersion } from "../data/learn-recorded-audio.js";

const entryByText = new Map(learnAudioEntries.map((entry) => [entry.text, entry]));

export function recordedLearnAudioPath(text) {
  const entry = entryByText.get(text);
  if (!entry || !recordedLearnAudioIds.has(entry.id)) return "";
  return `assets/audio/learn/${entry.id}.mp3?v=${recordedLearnAudioVersion}`;
}

export function hasRecordedLearnAudio(text) {
  return Boolean(recordedLearnAudioPath(text));
}
