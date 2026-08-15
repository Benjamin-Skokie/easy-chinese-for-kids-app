export function createAudioService({
  synthesis = globalThis.speechSynthesis,
  createUtterance = (text) => new globalThis.SpeechSynthesisUtterance(text),
  getSceneRate,
  getSceneLinePauseMs,
  schedule = globalThis.setTimeout
} = {}) {
  const preferredVoiceNames = ["tingting", "ting-ting", "meijia", "mei-jia", "sinji", "sin-ji"];

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

  function speak(text, rate = 0.8, voiceNames = preferredVoiceNames) {
    if (!synthesis || !text) return;
    synthesis.cancel();
    synthesis.speak(chineseUtterance(text, rate, voiceNames));
  }

  function speakSceneLines(lines) {
    if (!synthesis) return;
    const audioLines = lines.map((line) => line.audio).filter(Boolean);
    let index = 0;
    synthesis.cancel();

    const playNextLine = () => {
      if (index >= audioLines.length) return;
      const utterance = chineseUtterance(audioLines[index], getSceneRate());
      index += 1;
      utterance.onend = () => schedule(playNextLine, getSceneLinePauseMs());
      synthesis.speak(utterance);
    };

    playNextLine();
  }

  return { chineseUtterance, speak, speakSceneLines };
}
