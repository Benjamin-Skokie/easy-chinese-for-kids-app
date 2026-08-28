import { pinyinBuildTasks, pinyinChapterGroups, pinyinUnits } from "./pinyin-course.js";
import { pinyinBasicsAudioId, pinyinBasicsAudioPath } from "./pinyin-audio-manifest.js";
import { nextRandomCycleId } from "../../core/random-cycle.js";

const basicToneRounds = [
  { audio: "妈", pinyin: "mā", tone: 1 }, { audio: "麻", pinyin: "má", tone: 2 },
  { audio: "马", pinyin: "mǎ", tone: 3 }, { audio: "骂", pinyin: "mà", tone: 4 },
  { audio: "书", pinyin: "shū", tone: 1 }, { audio: "十", pinyin: "shí", tone: 2 },
  { audio: "你", pinyin: "nǐ", tone: 3 }, { audio: "四", pinyin: "sì", tone: 4 },
  { audio: "哥", pinyin: "gē", tone: 1 }, { audio: "牛", pinyin: "niú", tone: 2 },
  { audio: "米", pinyin: "mǐ", tone: 3 }, { audio: "大", pinyin: "dà", tone: 4 }
];

const basicFinalRounds = [
  { audio: "妈", pinyin: "mā", final: "a" }, { audio: "爸", pinyin: "bà", final: "a" },
  { audio: "波", pinyin: "bō", final: "o" }, { audio: "我", pinyin: "wǒ", final: "o" },
  { audio: "哥", pinyin: "gē", final: "e" }, { audio: "得", pinyin: "dé", final: "e" },
  { audio: "你", pinyin: "nǐ", final: "i" }, { audio: "米", pinyin: "mǐ", final: "i" },
  { audio: "书", pinyin: "shū", final: "u" }, { audio: "土", pinyin: "tǔ", final: "u" },
  { audio: "女", pinyin: "nǚ", final: "ü" }, { audio: "鱼", pinyin: "yú", final: "ü" }
];

export function createPinyinRuntime({ state, focusExplorer, activityPanelTitle, activityPanelSummary, activityList, speak }) {
  let activeRecording = null;
  let playbackSequence = 0;

  function audioAttributes(text, pinyin = text, explicitId = "") {
    const id = explicitId || pinyinBasicsAudioId(text, pinyin);
    return `data-pinyin-audio="${text}"${id ? ` data-pinyin-audio-id="${id}"` : ""}`;
  }

  function soundChipMarkup(label, audioText, audioId = "") {
    return `<button class="pinyin-sound-chip" type="button" ${audioAttributes(audioText, audioText, audioId)} aria-label="Play ${label}">${label}</button>`;
  }

  function wordAudioMarkup(hanzi, pinyin) {
    return `<button class="pinyin-word-audio" type="button" ${audioAttributes(hanzi, pinyin)} aria-label="Play ${hanzi}"><b>${hanzi}</b><span>${pinyin}</span></button>`;
  }

  function playAllButton(audioTexts, audioIds = []) {
    return `<button class="small-button is-play-button pinyin-play-all" type="button" data-pinyin-play-all="${audioTexts.join("|")}"${audioIds.length ? ` data-pinyin-play-all-ids="${audioIds.join("|")}"` : ""} aria-label="Play all">▶ <span>Play all</span></button>`;
  }

  function stopRecording() {
    if (!activeRecording) return;
    const { audio, resolve } = activeRecording;
    activeRecording = null;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    resolve(false);
  }

  function playRecording(id, fallbackText, sequence = ++playbackSequence) {
    const source = pinyinBasicsAudioPath(id);
    if (!source || typeof Audio === "undefined") {
      speak?.(fallbackText, 0.58);
      return Promise.resolve(false);
    }
    stopRecording();
    globalThis.speechSynthesis?.cancel?.();
    return new Promise((resolve) => {
      const audio = new Audio(source);
      const recording = { audio, resolve, sequence };
      activeRecording = recording;
      audio.preload = "auto";
      audio.addEventListener("ended", () => {
        if (activeRecording !== recording) return;
        activeRecording = null;
        resolve(true);
      }, { once: true });
      audio.addEventListener("error", () => {
        if (activeRecording !== recording) return;
        activeRecording = null;
        speak?.(fallbackText, 0.58);
        resolve(false);
      }, { once: true });
      audio.play().catch(() => {
        if (activeRecording !== recording) return;
        activeRecording = null;
        speak?.(fallbackText, 0.58);
        resolve(false);
      });
    });
  }

  async function playRecordingSequence(ids, fallbackTexts) {
    const sequence = ++playbackSequence;
    stopRecording();
    if (!ids.length) {
      speak?.(fallbackTexts.join("，"), 0.46);
      return;
    }
    for (let index = 0; index < ids.length; index += 1) {
      if (sequence !== playbackSequence) return;
      await playRecording(ids[index], fallbackTexts[index] ?? "", sequence);
    }
  }

  function activeGroup() {
    return pinyinChapterGroups.find((group) => group.id === state.pinyinGroupId) ?? pinyinChapterGroups[0];
  }

  function unitsForActiveGroup() {
    return pinyinUnits.filter((unit) => unit.groupId === activeGroup().id);
  }

  function selectGroup(groupId) {
    state.pinyinGroupId = groupId;
    state.pinyinUnitId = pinyinUnits.find((unit) => unit.groupId === groupId)?.id ?? pinyinUnits[0].id;
    renderPinyinExplorer();
    renderPinyinPractice();
  }

  function chapterNavigationMarkup() {
    const group = activeGroup();
    return `<nav class="pinyin-course-nav" aria-label="Pinyin chapters"><div class="pinyin-course-books">${pinyinChapterGroups.map((item) => `<button class="pinyin-course-book${item.id === group.id ? " is-selected" : ""}" type="button" data-pinyin-group="${item.id}" aria-pressed="${item.id === group.id}"><span>${item.label}<b aria-hidden="true"> · </b>${item.english}</span></button>`).join("")}</div></nav>`;
  }

  function chapterCardMarkup(unit) {
    if (unit.id === "spelling-rules") return spellingRulesCardMarkup(unit);
    const examples = unit.examples ?? [{ sound: unit.sounds[0], words: [[unit.example, unit.reading]] }];
    const definition = ([3, 9, 11, 12].includes(unit.number) || unit.groupId === "reading") ? `<p class="pinyin-chapter-definition">${unit.note}</p>` : "";
    const sounds = unit.id === "blending-tones" ? "" : `<section><div class="pinyin-ready-sounds pinyin-basic-sound-row pinyin-chapter-sound-row pinyin-sound-count-${unit.sounds.length}">${unit.sounds.map((sound, index) => soundChipMarkup(sound, unit.listenTargets[index] ?? sound)).join("")}</div></section>`;
    return `<section class="pinyin-chapter-card pinyin-standard-chapter-card pinyin-unit-${unit.id}"><header class="pinyin-chapter-heading"><p class="body-match-kicker">第 ${unit.number} 章 · Chapter ${unit.number}</p><h4>${unit.title}</h4><p class="pinyin-chapter-english">${unit.englishTitle}</p>${playAllButton(unit.listenTargets)}</header>${definition}<div class="pinyin-chapter-card-body">${sounds}<section class="pinyin-basic-examples pinyin-chapter-examples">${examples.map((item) => `<div><strong>${item.sound}</strong>${item.words.map(([hanzi, pinyin]) => wordAudioMarkup(hanzi, pinyin)).join("")}</div>`).join("")}</section></div>${chapterPracticeMarkup(unit, examples)}</section>`;
  }

  function spellingRulesCardMarkup(unit) {
    return `<section class="pinyin-chapter-card pinyin-standard-chapter-card pinyin-spelling-rules"><header class="pinyin-chapter-heading"><p class="body-match-kicker">第 ${unit.number} 章 · Chapter ${unit.number}</p><h4>${unit.title}</h4><p class="pinyin-chapter-english">${unit.englishTitle}</p></header><p class="pinyin-chapter-definition">${unit.note}</p><div class="pinyin-rule-list"><section><strong>j, q, x, y + ü</strong><p>Write <b>ju · qu · xu · yu</b>. The vowel still sounds like <b>ü</b>.</p></section><section><strong>No initial sound</strong><p>At the start of a syllable, write <b>i → yi</b>, <b>u → wu</b>, and <b>ü → yu</b>.</p></section><section><strong>Tone marks</strong><p>Mark <b>a</b> first, then <b>o</b> or <b>e</b>. Otherwise mark the last vowel: <b>guǐ · liù</b>. A marked <b>i</b> loses its dot.</p></section></div></section>`;
  }

  function chapterPracticeMarkup(unit, examples) {
    const rounds = examples.flatMap((item) => item.words.map(([audio, pinyin]) => ({ audio, pinyin, answer: item.sound })));
    const index = (state.pinyinChapterPracticeIndexes?.[unit.id] ?? 0) % rounds.length;
    const round = rounds[index];
    const choice = state.pinyinChapterPracticeChoices?.[unit.id] ?? "";
    const result = state.pinyinChapterPracticeResults?.[unit.id] ?? "";
    const kind = unit.groupId === "initials" ? "initial" : unit.groupId === "finals" ? "final" : "whole syllable";
    return `<section class="pinyin-chapter-practice"><div class="pinyin-ear-game-heading"><h4>Which ${kind} did you hear?</h4><button class="small-button is-play-button" type="button" data-pinyin-chapter-play="${unit.id}" aria-label="Play a new sound">▶</button></div><div class="pinyin-chapter-practice-options pinyin-sound-count-${unit.sounds.length}">${unit.sounds.map((sound) => { const stateClass = result && choice === sound ? result === "correct" ? " is-correct" : " is-wrong" : ""; const mark = result && choice === sound ? `<span class="answer-result-mark" aria-hidden="true">${result === "correct" ? "✓" : "×"}</span>` : ""; return `<button type="button" class="pinyin-final-choice${stateClass}" data-pinyin-chapter-choice="${unit.id}" data-pinyin-chapter-sound="${sound}">${mark}${sound}</button>`; }).join("")}</div><p class="pinyin-basics-feedback" aria-live="polite">${result === "correct" ? `<strong>${round.pinyin}</strong> · ${round.answer}` : ""}</p></section>`;
  }

  function basicChapterCardMarkup() {
    const examples = [
      { sound: "a", words: [["妈", "mā"], ["爸", "bà"], ["大", "dà"]] },
      { sound: "o", words: [["我", "wǒ"], ["摸", "mō"], ["波", "bō"]] },
      { sound: "e", words: [["哥", "gē"], ["得", "dé"], ["和", "hé"]] },
      { sound: "i", words: [["你", "nǐ"], ["米", "mǐ"], ["弟", "dì"]] },
      { sound: "u", words: [["书", "shū"], ["土", "tǔ"], ["路", "lù"]] },
      { sound: "ü", words: [["女", "nǚ"], ["雨", "yǔ"], ["鱼", "yú"]] }
    ];
    const singleFinalAudio = { a: ["ā", "final-a1"], o: ["ō", "final-o1"], e: ["ē", "final-e1"], i: ["ī", "final-i1"], u: ["ū", "final-u1"], ü: ["ǖ", "final-v1"] };
    const finalSounds = ["a", "o", "e", "i", "u", "ü"];
    return `<section class="pinyin-chapter-card pinyin-basic-chapter-card"><header class="pinyin-chapter-heading"><p class="body-match-kicker">第 2 章 · Chapter 2</p><h4>单韵母</h4><p class="pinyin-chapter-english">Single finals</p>${playAllButton(finalSounds.map((sound) => singleFinalAudio[sound][0]), finalSounds.map((sound) => singleFinalAudio[sound][1]))}</header><p class="pinyin-chapter-definition">A final is the vowel part at the end of a syllable. A single final has one vowel sound.</p><div class="pinyin-chapter-card-body"><section><div class="pinyin-ready-sounds pinyin-basic-sound-row">${finalSounds.map((sound) => soundChipMarkup(sound, singleFinalAudio[sound][0], singleFinalAudio[sound][1])).join("")}</div></section><section class="pinyin-basic-examples">${examples.map((item) => `<div><strong>${item.sound}</strong>${item.words.map(([hanzi, pinyin]) => wordAudioMarkup(hanzi, pinyin)).join("")}</div>`).join("")}</section><aside class="pinyin-u-rule"><strong>Why do ü’s dots sometimes disappear?</strong><p>Usually, the dots stay: <b>女 nǚ</b> is <b>n + ü</b>. Only after <b>j, q, x,</b> or <b>y</b> are the dots left off. Those letters are never followed by the plain <b>u</b> sound, so readers still know to say <b>ü</b>. We will practise those combinations later.</p></aside></div></section>`;
  }

  function toneChapterCardMarkup() {
    const tones = [
      ["mā", "妈", "high and level", "M6 19 L26 18 L45 19 L63 19", "59,8 78,19 59,30"],
      ["má", "麻", "rising", "M6 30 L25 25 L43 18 L64 10", "61,2 78,5 67,18"],
      ["mǎ", "马", "dip, then rise", "M6 9 L15 12 L40 34 L64 14", "57,9 76,3 69,21"],
      ["mà", "骂", "falling", "M6 6 L25 12 L44 20 L63 29", "59,36 76,36 67,22"]
    ];
    return `<section class="pinyin-chapter-card pinyin-tone-chapter-card"><header class="pinyin-chapter-heading"><p class="body-match-kicker">第 1 章 · Chapter 1</p><h4>四声</h4><p class="pinyin-chapter-english">Four tones</p>${playAllButton(tones.map(([, hanzi]) => hanzi), tones.map(([pinyin, hanzi]) => pinyinBasicsAudioId(hanzi, pinyin)))}</header><p class="pinyin-chapter-definition">A tone is the pitch pattern of one syllable. With <b>ma</b>, changing that pattern makes four different words: <b>mā</b>, <b>má</b>, <b>mǎ</b>, and <b>mà</b>.</p><div class="pinyin-tone-row">${tones.map(([pinyin, hanzi, movement, line, head]) => `<button type="button" ${audioAttributes(hanzi, pinyin)} aria-label="Play ${pinyin}, ${hanzi}"><strong>${pinyin}</strong><svg class="pinyin-tone-contour" viewBox="0 0 80 38" aria-hidden="true"><path d="${line}" /><polygon points="${head}" /></svg><b>${hanzi}</b><small>${movement}</small></button>`).join("")}</div></section>`;
  }

  function basicPracticeMarkup(kind) {
    const toneRound = basicToneRounds[state.pinyinBasicsToneRoundIndex % basicToneRounds.length];
    const finalRound = basicFinalRounds[state.pinyinBasicsFinalRoundIndex % basicFinalRounds.length];
    const toneResult = state.pinyinBasicsToneResult;
    const finalResult = state.pinyinBasicsFinalResult;
    const toneMark = (tone) => toneResult && tone === state.pinyinBasicsToneChoice ? `<span class="answer-result-mark" aria-hidden="true">${toneResult === "correct" ? "✓" : "×"}</span>` : "";
    const finalMark = (final) => finalResult && final === state.pinyinBasicsFinalChoice ? `<span class="answer-result-mark" aria-hidden="true">${finalResult === "correct" ? "✓" : "×"}</span>` : "";
    const toneChoices = [
      [1, "M6 19 L26 18 L45 19 L63 19", "59,8 78,19 59,30"],
      [2, "M6 30 L25 25 L43 18 L64 10", "61,2 78,5 67,18"],
      [3, "M6 9 L15 12 L40 34 L64 14", "57,9 76,3 69,21"],
      [4, "M6 6 L25 12 L44 20 L63 29", "59,36 76,36 67,22"]
    ];
    return `<section class="pinyin-basics-practice pinyin-basics-practice-${kind}"><div class="pinyin-basics-practice-grid"><section class="pinyin-ear-game"><div class="pinyin-ear-game-heading"><h4>Which tone did you hear?</h4><button class="small-button is-play-button" type="button" data-pinyin-basics-play="tone" aria-label="Play a new sound">▶</button></div><div class="pinyin-tone-choice-row">${toneChoices.map(([tone, line, head]) => `<button type="button" class="pinyin-tone-choice${toneResult && tone === state.pinyinBasicsToneChoice ? toneResult === "correct" ? " is-correct" : " is-wrong" : ""}" data-pinyin-basics-tone="${tone}" aria-label="Tone ${tone}">${toneMark(tone)}<svg class="pinyin-tone-choice-contour" viewBox="0 0 80 38" aria-hidden="true"><path d="${line}" /><polygon points="${head}" /></svg></button>`).join("")}</div><p class="pinyin-basics-feedback" aria-live="polite">${toneResult === "correct" ? `<strong>${toneRound.pinyin}</strong> · ${toneRound.tone}${toneRound.tone === 1 ? "st" : toneRound.tone === 2 ? "nd" : toneRound.tone === 3 ? "rd" : "th"} tone` : ""}</p></section><section class="pinyin-ear-game"><div class="pinyin-ear-game-heading"><h4>Which final did you hear?</h4><button class="small-button is-play-button" type="button" data-pinyin-basics-play="final" aria-label="Play a new sound">▶</button></div><div class="pinyin-final-choice-row">${["a", "o", "e", "i", "u", "ü"].map((final) => `<button type="button" class="pinyin-final-choice${finalResult && final === state.pinyinBasicsFinalChoice ? finalResult === "correct" ? " is-correct" : " is-wrong" : ""}" data-pinyin-basics-final="${final}">${finalMark(final)}${final}</button>`).join("")}</div><p class="pinyin-basics-feedback" aria-live="polite">${finalResult === "correct" ? `<strong>${finalRound.pinyin}</strong> · ${finalRound.final}` : ""}</p></section></div></section>`;
  }

  function bindChapterNavigation() {
    focusExplorer.querySelectorAll("[data-pinyin-group]").forEach((button) => button.addEventListener("click", () => selectGroup(button.dataset.pinyinGroup)));
    focusExplorer.querySelectorAll("[data-pinyin-audio]").forEach((button) => button.addEventListener("click", () => {
      const id = button.dataset.pinyinAudioId;
      if (id) playRecording(id, button.dataset.pinyinAudio);
      else speak?.(button.dataset.pinyinAudio, 0.62);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-play-all]").forEach((button) => button.addEventListener("click", () => {
      const audioTexts = button.dataset.pinyinPlayAll.split("|").filter(Boolean);
      const audioIds = button.dataset.pinyinPlayAllIds?.split("|").filter(Boolean) ?? [];
      playRecordingSequence(audioIds, audioTexts);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-basics-play]").forEach((button) => button.addEventListener("click", () => {
      const isTone = button.dataset.pinyinBasicsPlay === "tone";
      const rounds = isTone ? basicToneRounds : basicFinalRounds;
      const cycleKey = isTone ? "pinyin-basics-tone" : "pinyin-basics-final";
      const nextIndex = Number(nextRandomCycleId(state, cycleKey, rounds.map((_, index) => String(index))));
      if (isTone) {
        state.pinyinBasicsToneRoundIndex = nextIndex;
        state.pinyinBasicsToneChoice = null;
        state.pinyinBasicsToneResult = "";
      } else {
        state.pinyinBasicsFinalRoundIndex = nextIndex;
        state.pinyinBasicsFinalChoice = "";
        state.pinyinBasicsFinalResult = "";
      }
      renderPinyinExplorer();
      const round = rounds[nextIndex];
      const id = pinyinBasicsAudioId(round.audio, round.pinyin);
      if (id) playRecording(id, round.audio);
      else speak?.(round.audio, 0.52);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-basics-tone]").forEach((button) => button.addEventListener("click", () => {
      const correctTone = basicToneRounds[state.pinyinBasicsToneRoundIndex % basicToneRounds.length].tone;
      state.pinyinBasicsToneChoice = Number(button.dataset.pinyinBasicsTone);
      state.pinyinBasicsToneResult = state.pinyinBasicsToneChoice === correctTone ? "correct" : "wrong";
      renderPinyinExplorer();
    }));
    focusExplorer.querySelectorAll("[data-pinyin-basics-final]").forEach((button) => button.addEventListener("click", () => {
      const correctFinal = basicFinalRounds[state.pinyinBasicsFinalRoundIndex % basicFinalRounds.length].final;
      state.pinyinBasicsFinalChoice = button.dataset.pinyinBasicsFinal;
      state.pinyinBasicsFinalResult = state.pinyinBasicsFinalChoice === correctFinal ? "correct" : "wrong";
      renderPinyinExplorer();
    }));
    focusExplorer.querySelectorAll("[data-pinyin-chapter-play]").forEach((button) => button.addEventListener("click", () => {
      const unit = pinyinUnits.find((item) => item.id === button.dataset.pinyinChapterPlay);
      if (!unit?.examples) return;
      const rounds = unit.examples.flatMap((item) => item.words.map(([audio, pinyin]) => ({ audio, pinyin, answer: item.sound })));
      const nextIndex = Number(nextRandomCycleId(state, `pinyin-chapter:${unit.id}`, rounds.map((_, index) => String(index))));
      state.pinyinChapterPracticeIndexes = { ...(state.pinyinChapterPracticeIndexes ?? {}), [unit.id]: nextIndex };
      state.pinyinChapterPracticeChoices = { ...(state.pinyinChapterPracticeChoices ?? {}), [unit.id]: "" };
      state.pinyinChapterPracticeResults = { ...(state.pinyinChapterPracticeResults ?? {}), [unit.id]: "" };
      renderPinyinExplorer();
      speak?.(rounds[nextIndex].audio, 0.52);
    }));
    focusExplorer.querySelectorAll("[data-pinyin-chapter-choice]").forEach((button) => button.addEventListener("click", () => {
      const unit = pinyinUnits.find((item) => item.id === button.dataset.pinyinChapterChoice);
      if (!unit?.examples) return;
      const rounds = unit.examples.flatMap((item) => item.words.map(([audio, pinyin]) => ({ audio, pinyin, answer: item.sound })));
      const round = rounds[(state.pinyinChapterPracticeIndexes?.[unit.id] ?? 0) % rounds.length];
      const selected = button.dataset.pinyinChapterSound;
      state.pinyinChapterPracticeChoices = { ...(state.pinyinChapterPracticeChoices ?? {}), [unit.id]: selected };
      state.pinyinChapterPracticeResults = { ...(state.pinyinChapterPracticeResults ?? {}), [unit.id]: selected === round.answer ? "correct" : "wrong" };
      renderPinyinExplorer();
    }));
  }

  function renderPinyinExplorer() {
    const group = activeGroup();
    const units = unitsForActiveGroup();
    const chapterMarkup = group.id === "basics" ? `${toneChapterCardMarkup()}${basicPracticeMarkup("tone")}${basicChapterCardMarkup()}${basicPracticeMarkup("final")}` : units.map(chapterCardMarkup).join("");
    focusExplorer.innerHTML = `<section class="pinyin-lab pinyin-course-lab" aria-label="Pinyin ${group.english} chapters"><header class="pinyin-lab-header"><div><p>Pinyin uses Roman letters and tone marks to show how Standard Mandarin sounds. It helps children pronounce words, connect sounds to characters, and begin reading.</p></div></header>${chapterNavigationMarkup()}<section class="school-lesson-section pinyin-chapter-section"><div class="school-scene-grid pinyin-chapter-grid">${chapterMarkup}</div></section></section>`;
    bindChapterNavigation();
  }

  function renderPinyinPractice() {
    const group = activeGroup();
    const activityColumns = activityList.closest(".topic-columns");
    if (group.id === "basics" || group.id === "initials" || group.id === "finals" || group.id === "reading") {
      activityColumns?.classList.add("is-hidden");
      activityPanelTitle.textContent = "";
      activityPanelSummary.textContent = "";
      activityList.innerHTML = "";
      return;
    }
    activityColumns?.classList.remove("is-hidden");
    const units = unitsForActiveGroup();
    const results = state.pinyinPracticeResults ?? {};
    activityPanelTitle.textContent = "Practise";
    activityPanelSummary.textContent = `${group.english} · ${group.label}: Listen · 听 · Choose · 选 · Build · 拼.`;
    activityList.className = "support-list pinyin-practice-grid";
    activityList.innerHTML = units.map((unit) => {
      const result = results[unit.id] ?? "";
      const listened = state.pinyinListenedIds?.has(unit.id);
      const build = pinyinBuildTasks[unit.id];
      const buildSelection = state.pinyinBuildSelections?.[unit.id] ?? [];
      const buildResult = state.pinyinBuildResults?.[unit.id] ?? "";
      const chapterHeading = `<p class="body-match-kicker">Chapter ${unit.number} · 第 ${unit.number} 章</p><h4>${unit.englishTitle}</h4><p class="pinyin-practice-english-title">${unit.title}</p>`;
      const wordMapping = `<p class="pinyin-practice-word">${unit.example}</p><p class="pinyin-practice-reading">${unit.reading} · ${unit.translation}</p>`;
      if (!listened) {
        return `<section class="pinyin-practice-card">${chapterHeading}<section class="pinyin-practice-step"><div><p class="body-match-kicker">1 · Listen · 听</p><p class="pinyin-practice-instruction">Listen to this word.<span>听一听这个词。</span></p>${wordMapping}</div><button class="small-button is-play-button" type="button" data-pinyin-listen="${unit.id}" aria-label="Play ${unit.example}">▶ <span>Play</span></button></section></section>`;
      }
      if (result !== "correct") {
        return `<section class="pinyin-practice-card">${chapterHeading}<section class="pinyin-practice-step"><p class="body-match-kicker">2 · Choose · 选</p><p class="pinyin-practice-instruction">Choose the Pinyin you just heard.<span>选出刚才听到的拼音。</span></p><div class="pinyin-practice-options">${unit.practice.options.map((option, index) => `<button class="pinyin-practice-option${result === "wrong" && state.pinyinPracticeChoices?.[unit.id] === index ? " is-wrong" : ""}" type="button" data-pinyin-practice-unit="${unit.id}" data-pinyin-practice-choice="${index}"><span>${option}</span></button>`).join("")}</div><p class="pinyin-practice-feedback" aria-live="polite">${result === "wrong" ? "Listen again, then try once more. 再听一遍，再试一次。" : ""}</p></section></section>`;
      }
      return `<section class="pinyin-practice-card">${chapterHeading}<section class="pinyin-practice-step"><p class="body-match-kicker">3 · Build · 拼</p><p class="pinyin-practice-instruction">Build this sound: <strong>${build.answer}</strong><span>把声音拼出来。</span></p><div class="pinyin-build-options">${build.pieces.map((piece, index) => `<button class="pinyin-build-piece" type="button" data-pinyin-build-unit="${unit.id}" data-pinyin-build-piece="${index}" ${buildResult === "correct" ? "disabled" : ""}>${piece}</button>`).join("")}</div><p class="pinyin-build-answer" aria-live="polite">${buildSelection.length ? buildSelection.join(" + ") : ""}${buildResult === "correct" ? ` = ${build.answer} ✓` : buildResult === "wrong" ? "Try again. 再试一次。" : ""}</p></section></section>`;
    }).join("");
    activityList.querySelectorAll("[data-pinyin-listen]").forEach((button) => button.addEventListener("click", () => {
      const unit = pinyinUnits.find((item) => item.id === button.dataset.pinyinListen);
      if (!unit) return;
      state.pinyinListenedIds = new Set([...(state.pinyinListenedIds ?? []), unit.id]);
      speak?.(unit.example, 0.65);
      renderPinyinPractice();
    }));
    activityList.querySelectorAll("[data-pinyin-practice-choice]").forEach((button) => button.addEventListener("click", () => {
      const unit = pinyinUnits.find((item) => item.id === button.dataset.pinyinPracticeUnit);
      if (!unit) return;
      const choice = Number(button.dataset.pinyinPracticeChoice);
      state.pinyinPracticeChoices = { ...(state.pinyinPracticeChoices ?? {}), [unit.id]: choice };
      state.pinyinPracticeResults = { ...(state.pinyinPracticeResults ?? {}), [unit.id]: choice === unit.practice.correct ? "correct" : "wrong" };
      renderPinyinPractice();
    }));
    activityList.querySelectorAll("[data-pinyin-build-piece]").forEach((button) => button.addEventListener("click", () => {
      const unitId = button.dataset.pinyinBuildUnit;
      const task = pinyinBuildTasks[unitId];
      if (!task) return;
      const piece = task.pieces[Number(button.dataset.pinyinBuildPiece)];
      const selection = [...(state.pinyinBuildSelections?.[unitId] ?? []), piece];
      const completed = selection.length === task.pieces.length;
      const completedCorrectly = completed && selection.join("") === (task.sequence ?? task.answer);
      state.pinyinBuildSelections = { ...(state.pinyinBuildSelections ?? {}), [unitId]: completed && !completedCorrectly ? [] : selection };
      state.pinyinBuildResults = { ...(state.pinyinBuildResults ?? {}), [unitId]: completedCorrectly ? "correct" : completed ? "wrong" : "" };
      renderPinyinPractice();
    }));
  }

  return { renderPinyinExplorer, renderPinyinPractice };
}
