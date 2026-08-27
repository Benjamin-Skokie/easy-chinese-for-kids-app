import { pinyinUnits } from "./pinyin-course.js";

const starterSounds = [
  { id: "a", letter: "a", cue: "Open wide", hint: "Start with a relaxed, open mouth.", sample: "ā" },
  { id: "o", letter: "o", cue: "Round your lips", hint: "Make a small round mouth.", sample: "ō" },
  { id: "e", letter: "e", cue: "Smile gently", hint: "Keep your tongue relaxed and say e.", sample: "ē" }
];

const tones = [
  { id: 1, mark: "mā", audio: "妈", movement: "high and level", arrow: "→", label: "First tone" },
  { id: 2, mark: "má", audio: "麻", movement: "rises", arrow: "↗", label: "Second tone" },
  { id: 3, mark: "mǎ", audio: "马", movement: "dips, then rises", arrow: "⌄↗", label: "Third tone" },
  { id: 4, mark: "mà", audio: "骂", movement: "falls", arrow: "↘", label: "Fourth tone" }
];

// Browser voices pronounce isolated Latin letters unreliably.  Every Pinyin
// control therefore speaks a Mandarin carrier character instead of the text
// shown on screen.  Replace these with reviewed native recordings before the
// complete Pinyin path is released.
const pronunciationText = {
  "ā": "啊",
  "ō": "哦",
  "ē": "鹅",
  "mā": "妈",
  "má": "麻",
  "mǎ": "马",
  "mà": "骂"
};

export function createPinyinRuntime({ state, focusExplorer, activityPanelTitle, activityPanelSummary, activityList, speak }) {
  function activeUnit() {
    return pinyinUnits.find((unit) => unit.id === state.pinyinUnitId) ?? pinyinUnits[0];
  }

  function courseNavigationMarkup(unit) {
    return `<nav class="pinyin-course-nav" aria-label="Pinyin lesson path">${pinyinUnits.map((item) => `<button class="pinyin-course-step${item.id === unit.id ? " is-selected" : ""}" type="button" data-pinyin-unit="${item.id}" aria-pressed="${item.id === unit.id}"><span>${item.number}</span><small>${item.title}</small></button>`).join("")}</nav>`;
  }

  function bindCourseNavigation() {
    focusExplorer.querySelectorAll("[data-pinyin-unit]").forEach((button) => button.addEventListener("click", () => {
      state.pinyinUnitId = button.dataset.pinyinUnit;
      state.pinyinSoundId = "a";
      state.pinyinTonePracticeChoice = null;
      state.pinyinTonePracticeResult = "";
      renderPinyinExplorer();
      renderPinyinPractice();
    }));
  }

  function activeSound() {
    return starterSounds.find((sound) => sound.id === state.pinyinSoundId) ?? starterSounds[0];
  }

  function play(text) {
    if (state.tapAudioEnabled) speak(pronunciationText[text] ?? text, 0.7);
  }

  function renderPreparedUnitExplorer(unit) {
    focusExplorer.innerHTML = `
      <section class="pinyin-lab" aria-label="Pinyin lesson ${unit.number}: ${unit.title}">
        <header class="pinyin-lab-header"><div><p class="body-match-kicker">Pinyin path · lesson ${unit.number} of 14</p><h3>${unit.title}</h3><p>${unit.group} · ${unit.note}</p></div><span class="pinyin-lab-badge">听 · 说 · 拼 · 用</span></header>
        ${courseNavigationMarkup(unit)}
        <section class="pinyin-ready-card">
          <p class="body-match-kicker">Sound set</p>
          <div class="pinyin-ready-sounds">${unit.sounds.map((sound) => `<span>${sound}</span>`).join("")}</div>
          <h4>This lesson page is ready for its checked voice clips.</h4>
          <p>Its practice flow, review position, and CSL word connection are already fixed. When you send the recordings, each sound card becomes a listen-and-copy control—without changing the lesson design.</p>
        </section>
        <section class="pinyin-blend-card"><div><p class="body-match-kicker">Blend and use</p><h4>${unit.example}</h4><p class="pinyin-use-reading">${unit.reading}</p><p>Use this familiar CSL word after the child has practised the sounds above.</p></div><div class="pinyin-ready-rule"><strong>Listen</strong><span>→</span><strong>copy</strong><span>→</span><strong>blend</strong><span>→</span><strong>read</strong></div></section>
      </section>
    `;
    bindCourseNavigation();
  }

  function renderPinyinExplorer() {
    const unit = activeUnit();
    if (unit.id !== "aoe") {
      renderPreparedUnitExplorer(unit);
      return;
    }
    const sound = activeSound();
    const selectedTone = tones.find((tone) => tone.id === state.pinyinToneId) ?? tones[0];
    const blendReady = Boolean(state.pinyinBlendRevealed);
    focusExplorer.innerHTML = `
      <section class="pinyin-lab" aria-label="Pinyin lesson: a o e">
        <header class="pinyin-lab-header">
          <div>
            <p class="body-match-kicker">Pinyin path · lesson 1 of 14</p>
            <h3>Start with a · o · e</h3>
            <p>Listen first. The letter comes after the sound.</p>
          </div>
          <span class="pinyin-lab-badge">听 · 说 · 拼 · 用</span>
        </header>

        ${courseNavigationMarkup(unit)}

        <nav class="pinyin-sound-tabs" aria-label="Choose a sound">
          ${starterSounds.map((item) => `<button class="pinyin-sound-tab${item.id === sound.id ? " is-selected" : ""}" type="button" data-pinyin-sound="${item.id}" aria-pressed="${item.id === sound.id}"><span>${item.letter}</span><small>${item.cue}</small></button>`).join("")}
        </nav>

        <div class="pinyin-listen-card">
          <div class="pinyin-letter-stage" aria-hidden="true">${sound.letter}</div>
          <div class="pinyin-listen-copy">
            <p class="body-match-kicker">1 · Listen and copy</p>
            <h4>${sound.cue}</h4>
            <p>${sound.hint} Tap the sound, listen once, then say it back.</p>
            <button class="small-button is-play-button" type="button" data-pinyin-play="${sound.sample}">Play ${sound.sample}</button>
          </div>
        </div>

        <section class="pinyin-tone-card">
          <div>
            <p class="body-match-kicker">2 · Feel the tone</p>
            <h4>Move your hand while you say a.</h4>
            <p>Every tone changes the meaning. We use one familiar sound pattern to hear the four movements.</p>
          </div>
          <div class="pinyin-tone-options" role="group" aria-label="Choose a tone">
            ${tones.map((tone) => `<button class="pinyin-tone-button${tone.id === selectedTone.id ? " is-selected" : ""}" type="button" data-pinyin-tone="${tone.id}" aria-pressed="${tone.id === selectedTone.id}"><span class="pinyin-tone-mark">${tone.mark}</span><span class="pinyin-tone-arrow">${tone.arrow}</span><small>${tone.movement}</small></button>`).join("")}
          </div>
          <div class="pinyin-tone-result" aria-live="polite"><strong>${selectedTone.mark}</strong><span>${selectedTone.label}: move ${selectedTone.movement}.</span><button class="text-play-button" type="button" data-pinyin-play="${selectedTone.mark}">Listen</button></div>
        </section>

        <section class="pinyin-blend-card">
          <div>
            <p class="body-match-kicker">3 · Get ready to blend</p>
            <h4>Two sounds can become one syllable.</h4>
            <p>When you later learn <strong>m</strong>, you can join it with <strong>ā</strong>.</p>
          </div>
          <div class="pinyin-blend-equation" aria-label="m plus a makes ma"><span>m</span><b>+</b><span>ā</span><b>=</b><strong class="${blendReady ? "is-revealed" : ""}">${blendReady ? "mā" : "?"}</strong></div>
          <button class="small-button" type="button" data-pinyin-blend>${blendReady ? "Play mā" : "Make the sound"}</button>
        </section>

        <section class="pinyin-use-card">
          <div>
            <p class="body-match-kicker">4 · Use it in a CSL word</p>
            <h4>妈妈</h4>
            <p class="pinyin-use-reading">mā ma · mum</p>
            <p>When the child learns <strong>m</strong>, this familiar Book 1B word becomes readable—not just a label to memorize.</p>
          </div>
          <button class="small-button is-play-button" type="button" data-pinyin-play="妈妈">Hear 妈妈</button>
        </section>
      </section>
    `;

    focusExplorer.querySelectorAll("[data-pinyin-sound]").forEach((button) => button.addEventListener("click", () => {
      state.pinyinSoundId = button.dataset.pinyinSound;
      renderPinyinExplorer();
      play(activeSound().sample);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-tone]").forEach((button) => button.addEventListener("click", () => {
      state.pinyinToneId = Number(button.dataset.pinyinTone);
      renderPinyinExplorer();
      play(tones.find((tone) => tone.id === state.pinyinToneId)?.mark);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-play]").forEach((button) => button.addEventListener("click", () => play(button.dataset.pinyinPlay)));
    focusExplorer.querySelector("[data-pinyin-blend]")?.addEventListener("click", () => {
      state.pinyinBlendRevealed = true;
      renderPinyinExplorer();
      play("mā");
    });
    bindCourseNavigation();
  }

  function renderPinyinPractice() {
    const unit = activeUnit();
    if (unit.id !== "aoe") {
      activityPanelTitle.textContent = "Practice will open with the lesson audio";
      activityPanelSummary.textContent = `Lesson ${unit.number} is ready for its recorded listen-and-copy game.`;
      activityList.className = "support-list";
      activityList.innerHTML = `<section class="pinyin-practice-card pinyin-audio-waiting"><p class="body-match-kicker">Audio checklist</p><h4>${unit.title}</h4><p>Sound clips needed: <strong>${unit.sounds.join(" · ")}</strong></p><p>After the voice clips are checked, this panel will ask the child to hear, choose, blend, and read <strong>${unit.example}</strong>.</p></section>`;
      return;
    }
    const result = state.pinyinTonePracticeResult ?? "";
    activityPanelTitle.textContent = "Listen and choose";
    activityPanelSummary.textContent = "Play the sound. Which hand movement matches it?";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="pinyin-practice-card">
        <div class="numbers-game-top">
          <div><p class="body-match-kicker">Sound detective</p><p class="numbers-game-note">Listen to <strong>má</strong>, then choose its tone movement.</p></div>
          <button class="small-button is-play-button" type="button" data-pinyin-practice-play>Play má</button>
        </div>
        <div class="pinyin-practice-options">
          ${tones.map((tone) => `<button class="pinyin-practice-option${result && tone.id === 2 ? " is-correct" : ""}${result === "wrong" && state.pinyinTonePracticeChoice === tone.id ? " is-wrong" : ""}" type="button" data-pinyin-practice-choice="${tone.id}" ${result === "correct" ? "disabled" : ""}><span>${tone.arrow}</span><small>${tone.movement}</small></button>`).join("")}
        </div>
        <p class="pinyin-practice-feedback" aria-live="polite">${result === "correct" ? "Yes! má rises. Say it once with your hand moving up." : result === "wrong" ? "Almost—play it again and listen for the direction." : ""}</p>
      </section>
    `;
    activityList.querySelector("[data-pinyin-practice-play]")?.addEventListener("click", () => play("má"));
    activityList.querySelectorAll("[data-pinyin-practice-choice]").forEach((button) => button.addEventListener("click", () => {
      state.pinyinTonePracticeChoice = Number(button.dataset.pinyinPracticeChoice);
      state.pinyinTonePracticeResult = state.pinyinTonePracticeChoice === 2 ? "correct" : "wrong";
      renderPinyinPractice();
      if (state.pinyinTonePracticeResult === "correct") play("má");
    }));
  }

  return { renderPinyinExplorer, renderPinyinPractice };
}
