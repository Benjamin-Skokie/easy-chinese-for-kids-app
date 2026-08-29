import { recordedLearnAudioPath } from "./recorded-audio.js";
import { recordedAudioPlaybackWindow, sequenceBoundarySilenceMs, standaloneBoundarySilenceMs } from "./recorded-audio-boundaries.js";

export const audioSourcePolicies = Object.freeze({
  recordedFirst: "recorded-first",
  recordedOnly: "recorded-only",
  browserFirst: "browser-first"
});

export function createAudioService({
  synthesis = globalThis.speechSynthesis,
  createUtterance = (text) => new globalThis.SpeechSynthesisUtterance(text),
  createAudio = (source) => typeof globalThis.Audio === "function" ? new globalThis.Audio(source) : null,
  getRecordedAudioPath = typeof globalThis.document !== "undefined" ? recordedLearnAudioPath : () => "",
  getSceneRate,
  getSceneLinePauseMs,
  isBrowserSpeechEnabled = () => true,
  schedule = globalThis.setTimeout,
  clearScheduled = globalThis.clearTimeout,
  getRecordedAudioPlaybackWindow = recordedAudioPlaybackWindow,
  reportMissingRecordedAudio = (text) => globalThis.console?.warn?.(`Recorded audio unavailable: ${text}`)
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

  function speakWithBrowser(text, rate = 0.8, voiceNames = preferredVoiceNames, requestId = playbackRequestId, onEnd, onError = onEnd) {
    if (!isBrowserSpeechEnabled() || !synthesis || !text || !isCurrentRequest(requestId)) return false;
    let utterance;
    try {
      utterance = chineseUtterance(text, rate, voiceNames);
    } catch {
      return false;
    }
    activeBrowserUtterance = utterance;
    const finish = (callback) => {
      if (activeBrowserUtterance === utterance) activeBrowserUtterance = null;
      if (isCurrentRequest(requestId)) callback?.();
    };
    utterance.onend = () => finish(onEnd);
    utterance.onerror = () => finish(onError);
    try {
      synthesis.speak(utterance);
      return true;
    } catch {
      if (activeBrowserUtterance === utterance) activeBrowserUtterance = null;
      return false;
    }
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

  function playRecording(text, requestId, retainedBoundarySilenceMs = standaloneBoundarySilenceMs) {
    const source = getRecordedAudioPath(text);
    if (!source) return Promise.resolve(false);
    const recording = createAudio(source);
    if (!recording || !isCurrentRequest(requestId)) return Promise.resolve(false);
    const playbackWindow = getRecordedAudioPlaybackWindow(source, retainedBoundarySilenceMs);

    recording.preload = "auto";
    recording.volume = 1;
    return new Promise((resolve) => {
      let settled = false;
      let started = false;
      let cutoffTimer;
      const finish = (didPlay) => {
        if (settled) return;
        settled = true;
        if (cutoffTimer !== undefined) clearScheduled?.(cutoffTimer);
        if (activeRecording?.audio === recording) activeRecording = null;
        resolve(didPlay);
      };
      activeRecording = { audio: recording, finish, requestId };
      recording.onended = () => finish(true);
      recording.onerror = () => finish(false);

      const start = () => {
        if (started || !isCurrentRequest(requestId)) return;
        started = true;
        const duration = Number(recording.duration);
        const startOffsetSeconds = (playbackWindow?.startOffsetMs ?? 0) / 1000;
        const endOffsetSeconds = (playbackWindow?.endOffsetMs ?? 0) / 1000;
        if (Number.isFinite(duration) && startOffsetSeconds > 0) {
          recording.currentTime = Math.min(startOffsetSeconds, Math.max(0, duration - 0.05));
        }
        if (Number.isFinite(duration) && endOffsetSeconds > 0) {
          const cutoffAfterMs = Math.max(0, (duration - endOffsetSeconds - recording.currentTime) * 1000);
          cutoffTimer = schedule(() => {
            recording.pause?.();
            recording.currentTime = 0;
            finish(true);
          }, cutoffAfterMs);
        }
        try {
          const playback = recording.play?.();
          if (playback?.catch) playback.catch(() => finish(false));
        } catch {
          finish(false);
        }
      };

      const canWaitForMetadata = typeof recording.addEventListener === "function" || "readyState" in recording;
      if (playbackWindow && !Number.isFinite(Number(recording.duration)) && canWaitForMetadata) {
        recording.onloadedmetadata = start;
        if (recording.readyState >= 1) start();
      } else {
        start();
      }
    });
  }

  async function playRecordingSequence(texts, requestId, retainedBoundarySilenceMs) {
    for (const text of texts) {
      if (!isCurrentRequest(requestId) || !getRecordedAudioPath(text)) return { didPlay: false, missingText: text };
      const retainedSilence = retainedBoundarySilenceMs ?? (texts.length > 1 ? sequenceBoundarySilenceMs : standaloneBoundarySilenceMs);
      const didPlay = await playRecording(text, requestId, retainedSilence);
      if (!didPlay) return { didPlay: false, missingText: text };
    }
    return { didPlay: true, missingText: "" };
  }

  function speak(text, rate = 0.8, voiceNamesOrOptions = preferredVoiceNames) {
    if (!text) return;
    const options = Array.isArray(voiceNamesOrOptions)
      ? { voiceNames: voiceNamesOrOptions }
      : (voiceNamesOrOptions && typeof voiceNamesOrOptions === "object" ? voiceNamesOrOptions : {});
    const voiceNames = options.voiceNames ?? preferredVoiceNames;
    const sourcePolicy = options.sourcePolicy ?? audioSourcePolicies.recordedFirst;
    const recordedBoundarySilenceMs = options.recordedBoundarySilenceMs;
    const requestId = beginPlaybackRequest();
    const recordedTexts = options.recordedTexts?.filter(Boolean) ?? [text];
    if (sourcePolicy === audioSourcePolicies.browserFirst) {
      const fallbackTexts = options.recordedFallbackTexts?.filter(Boolean) ?? [text];
      const playRecordedFallback = () => {
        if (!isCurrentRequest(requestId)) return;
        playRecordingSequence(fallbackTexts, requestId, recordedBoundarySilenceMs).then(({ didPlay, missingText }) => {
          if (!didPlay && isCurrentRequest(requestId)) reportMissingRecordedAudio(missingText || text);
        });
      };
      const browserStarted = speakWithBrowser(text, rate, voiceNames, requestId, undefined, playRecordedFallback);
      if (!browserStarted) playRecordedFallback();
      return;
    }
    if (sourcePolicy === audioSourcePolicies.recordedOnly && recordedTexts.length > 1) {
      playRecordingSequence(recordedTexts, requestId, recordedBoundarySilenceMs).then(({ didPlay, missingText }) => {
        if (!didPlay && isCurrentRequest(requestId)) reportMissingRecordedAudio(missingText || text);
      });
      return;
    }
    if (!getRecordedAudioPath(text)) {
      if (sourcePolicy === audioSourcePolicies.recordedOnly) {
        reportMissingRecordedAudio(text);
        return;
      }
      speakWithBrowser(text, rate, voiceNames, requestId);
      return;
    }
    playRecording(text, requestId).then((didPlay) => {
      if (didPlay || !isCurrentRequest(requestId)) return;
      if (sourcePolicy === audioSourcePolicies.recordedOnly) {
        reportMissingRecordedAudio(text);
        return;
      }
      speakWithBrowser(text, rate, voiceNames, requestId);
    });
  }

  function speakSceneLines(lines) {
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
