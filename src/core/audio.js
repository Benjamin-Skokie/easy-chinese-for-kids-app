export function createAudioService({
  synthesis = globalThis.speechSynthesis,
  createUtterance = (text) => new globalThis.SpeechSynthesisUtterance(text),
  getSceneRate,
  getSceneLinePauseMs,
  schedule = globalThis.setTimeout
} = {}) {
  function chineseUtterance(text, rate) {
    const utterance = createUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = rate;
    utterance.pitch = 1;
    return utterance;
  }

  function speak(text, rate = 0.8) {
    if (!synthesis || !text) return;
    synthesis.cancel();
    synthesis.speak(chineseUtterance(text, rate));
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

  return { speak, speakSceneLines };
}
