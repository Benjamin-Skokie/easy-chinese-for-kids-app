import { recordedLearnAudioPath } from "./recorded-audio.js";

export function createAudioService({
  synthesis = globalThis.speechSynthesis,
  createUtterance = (text) => new globalThis.SpeechSynthesisUtterance(text),
  createAudio = (source) => typeof globalThis.Audio === "function" ? new globalThis.Audio(source) : null,
  getRecordedAudioPath = typeof globalThis.document !== "undefined" ? recordedLearnAudioPath : () => "",
  getSceneRate,
  getSceneLinePauseMs,
  schedule = globalThis.setTimeout
} = {}) {
  const preferredVoiceNames = ["tingting", "ting-ting"];
  let activeRecording;

  function preferredChineseVoice(names = preferredVoiceNames) {
    const voices = synthesis?.getVoices?.() ?? [];
    return names
      .map((name) => voices.find((voice) => voice.name.toLowerCase() === name))
      .find(Boolean);
  }

  function chineseUtterance(text, rate, voiceNames = preferredVoiceNames) {
    const utterance = createUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = rate;
    utterance.pitch = 1;
    const voice = preferredChineseVoice(voiceNames);
    if (voice) utterance.voice = voice;
    return utterance;
  }

  function speakWithBrowser(text, rate = 0.8, voiceNames = preferredVoiceNames) {
    if (!synthesis || !text) return;
    synthesis.speak(chineseUtterance(text, rate, voiceNames));
  }

  function stopActiveRecording() {
    if (!activeRecording) return;
    activeRecording.pause?.();
    activeRecording.currentTime = 0;
    activeRecording = null;
  }

  function playRecording(text) {
    const source = getRecordedAudioPath(text);
    if (!source) return Promise.resolve(false);
    const recording = createAudio(source);
    if (!recording) return Promise.resolve(false);

    activeRecording = recording;
    recording.preload = "auto";
    return new Promise((resolve) => {
      const finish = (didPlay) => {
        if (activeRecording === recording) activeRecording = null;
        resolve(didPlay);
      };
      recording.onended = () => finish(true);
      recording.onerror = () => finish(false);
      const started = recording.play?.();
      if (started?.catch) started.catch(() => finish(false));
    });
  }

  function speak(text, rate = 0.8, voiceNames = preferredVoiceNames) {
    if (!text) return;
    synthesis?.cancel?.();
    stopActiveRecording();
    if (!getRecordedAudioPath(text)) {
      speakWithBrowser(text, rate, voiceNames);
      return;
    }
    playRecording(text).then((didPlay) => {
      if (!didPlay) speakWithBrowser(text, rate, voiceNames);
    });
  }

  function speakSceneLines(lines) {
    if (!synthesis) return;
    const audioLines = lines.map((line) => line.audio).filter(Boolean);
    let index = 0;
    synthesis.cancel();
    stopActiveRecording();

    const playNextLine = () => {
      if (index >= audioLines.length) return;
      const text = audioLines[index];
      index += 1;
      if (!getRecordedAudioPath(text)) {
        const utterance = chineseUtterance(text, getSceneRate());
        utterance.onend = () => schedule(playNextLine, getSceneLinePauseMs());
        synthesis.speak(utterance);
        return;
      }
      playRecording(text).then((didPlay) => {
        if (didPlay) {
          schedule(playNextLine, getSceneLinePauseMs());
          return;
        }
        const utterance = chineseUtterance(text, getSceneRate());
        utterance.onend = () => schedule(playNextLine, getSceneLinePauseMs());
        synthesis.speak(utterance);
      });
    };

    playNextLine();
  }

  return { chineseUtterance, speak, speakSceneLines };
}
