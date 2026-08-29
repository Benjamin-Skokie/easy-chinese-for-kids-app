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
  let activeBrowserUtterance;
  let playbackRequestId = 0;

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

  function isCurrentRequest(requestId) {
    return requestId === playbackRequestId;
  }

  function speakWithBrowser(text, rate = 0.8, voiceNames = preferredVoiceNames, requestId = playbackRequestId, onEnd) {
    if (!synthesis || !text || !isCurrentRequest(requestId)) return;
    const utterance = chineseUtterance(text, rate, voiceNames);
    activeBrowserUtterance = utterance;
    const finish = () => {
      if (activeBrowserUtterance === utterance) activeBrowserUtterance = null;
      if (isCurrentRequest(requestId)) onEnd?.();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    synthesis.speak(utterance);
  }

  function stopActiveBrowserSpeech() {
    if (!activeBrowserUtterance) return;
    activeBrowserUtterance = null;
    synthesis?.cancel?.();
  }

  function stopActiveRecording() {
    if (!activeRecording) return;
    const recording = activeRecording;
    activeRecording = null;
    recording.audio.pause?.();
    recording.audio.currentTime = 0;
    recording.finish(false);
  }

  function beginPlaybackRequest() {
    const requestId = ++playbackRequestId;
    stopActiveBrowserSpeech();
    stopActiveRecording();
    return requestId;
  }

  function playRecording(text, requestId) {
    const source = getRecordedAudioPath(text);
    if (!source) return Promise.resolve(false);
    const recording = createAudio(source);
    if (!recording || !isCurrentRequest(requestId)) return Promise.resolve(false);

    recording.preload = "auto";
    recording.volume = 1;
    return new Promise((resolve) => {
      let settled = false;
      const finish = (didPlay) => {
        if (settled) return;
        settled = true;
        if (activeRecording?.audio === recording) activeRecording = null;
        resolve(didPlay);
      };
      activeRecording = { audio: recording, finish, requestId };
      recording.onended = () => finish(true);
      recording.onerror = () => finish(false);
      try {
        const started = recording.play?.();
        if (started?.catch) started.catch(() => finish(false));
      } catch {
        finish(false);
      }
    });
  }

  function speak(text, rate = 0.8, voiceNames = preferredVoiceNames) {
    if (!text) return;
    const requestId = beginPlaybackRequest();
    if (!getRecordedAudioPath(text)) {
      speakWithBrowser(text, rate, voiceNames, requestId);
      return;
    }
    playRecording(text, requestId).then((didPlay) => {
      if (!didPlay && isCurrentRequest(requestId)) speakWithBrowser(text, rate, voiceNames, requestId);
    });
  }

  function speakSceneLines(lines) {
    if (!synthesis) return;
    const audioLines = lines.map((line) => line.audio).filter(Boolean);
    let index = 0;
    const requestId = beginPlaybackRequest();

    const playNextLine = () => {
      if (!isCurrentRequest(requestId) || index >= audioLines.length) return;
      const text = audioLines[index];
      index += 1;
      if (!getRecordedAudioPath(text)) {
        speakWithBrowser(
          text,
          getSceneRate(),
          preferredVoiceNames,
          requestId,
          () => schedule(playNextLine, getSceneLinePauseMs())
        );
        return;
      }
      playRecording(text, requestId).then((didPlay) => {
        if (!isCurrentRequest(requestId)) return;
        if (didPlay) {
          schedule(playNextLine, getSceneLinePauseMs());
          return;
        }
        speakWithBrowser(
          text,
          getSceneRate(),
          preferredVoiceNames,
          requestId,
          () => schedule(playNextLine, getSceneLinePauseMs())
        );
      });
    };

    playNextLine();
  }

  return { chineseUtterance, speak, speakSceneLines };
}
