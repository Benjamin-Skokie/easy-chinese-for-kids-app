const lessons = {
  "2a:5": {
    book: "Book 2A Lesson 5", title: "I Love Reading", intro: "Hear each activity, then use it to say what you like or do every day.",
    itemIds: ["read", "draw", "write", "play", "every-day"],
    scenes: [
      ["read", "我爱看书。", "wǒ ài kàn shū.", "I love reading.", "我爱看书"],
      ["draw", "我喜欢画画。", "wǒ xǐ huan huà huà.", "I like drawing.", "我喜欢画画"],
      ["write", "我喜欢写字。", "wǒ xǐ huan xiě zì.", "I like writing.", "我喜欢写字"],
      ["play", "我每天玩儿游戏。", "wǒ měi tiān wánr yóu xì.", "I play games every day.", "我每天玩儿游戏"]
    ],
    note: ["我喜欢… / 我每天…", "wǒ xǐ huan… / wǒ měi tiān…", "Use 我喜欢… to say what you like. Use 我每天… to say what you do every day.", "我喜欢画画。 我每天玩儿游戏。"],
    rounds: [
      ["read", "看书", "kàn shū", "reading", ["写字"]], ["draw", "画画", "huà huà", "drawing", ["玩儿游戏"]],
      ["write", "写字", "xiě zì", "writing", ["画画"]], ["play", "玩儿游戏", "wánr yóu xì", "playing games", ["看书"]]
    ].map(([itemId, action, actionPinyin, actionEnglish, distractors]) => ({ itemId, action, actionPinyin, actionEnglish, distractors, answers: [
      { tokens: ["我", "爱", action], hanzi: `我爱${action}。`, pinyin: `wǒ ài ${actionPinyin}.`, english: `I love ${actionEnglish}.`, audio: `我爱${action}` },
      { tokens: ["我", "喜欢", action], hanzi: `我喜欢${action}。`, pinyin: `wǒ xǐ huan ${actionPinyin}.`, english: `I like ${actionEnglish}.`, audio: `我喜欢${action}` },
      { tokens: ["我", "每天", action], hanzi: `我每天${action}。`, pinyin: `wǒ měi tiān ${actionPinyin}.`, english: `I ${actionEnglish} every day.`, audio: `我每天${action}` },
      { tokens: ["我", "爱", "每天", action], hanzi: `我爱每天${action}。`, pinyin: `wǒ ài měi tiān ${actionPinyin}.`, english: `I love ${actionEnglish} every day.`, audio: `我爱每天${action}` },
      { tokens: ["我", "喜欢", "每天", action], hanzi: `我喜欢每天${action}。`, pinyin: `wǒ xǐ huan měi tiān ${actionPinyin}.`, english: `I like ${actionEnglish} every day.`, audio: `我喜欢每天${action}` }
    ] }))
  },
  "3b:4": {
    book: "Book 3B Lesson 4", title: "Hobbies", intro: "Hear each activity, then ask a friend whether they like it.",
    itemIds: ["we", "sing", "dance", "swim", "skate", "ski"],
    scenes: [
      ["sing", "我们爱唱歌。", "wǒ men ài chàng gē.", "We love singing.", "我们爱唱歌"],
      ["dance", "她爱跳舞。", "tā ài tiào wǔ.", "She loves dancing.", "她爱跳舞"],
      ["swim", "我喜欢游泳。", "wǒ xǐ huan yóu yǒng.", "I like swimming.", "我喜欢游泳"],
      ["skate", "我喜欢滑冰。", "wǒ xǐ huan huá bīng.", "I like skating.", "我喜欢滑冰"],
      ["ski", "我喜欢滑雪。", "wǒ xǐ huan huá xuě.", "I like skiing.", "我喜欢滑雪"]
    ],
    note: ["你喜欢…吗？ / 我喜欢…", "nǐ xǐ huan… ma? / wǒ xǐ huan…", "Use 你喜欢…吗？ to ask if someone likes an activity. Answer: 我喜欢…。", "你喜欢游泳吗？ 我喜欢游泳。"],
    rounds: [["sing", "唱歌", "chàng gē", "singing"], ["dance", "跳舞", "tiào wǔ", "dancing"], ["swim", "游泳", "yóu yǒng", "swimming"], ["skate", "滑冰", "huá bīng", "skating"], ["ski", "滑雪", "huá xuě", "skiing"]].map(([itemId, action, actionPinyin, actionEnglish]) => ({ itemId, action, actionPinyin, actionEnglish, distractors: ["看书"], answers: [
      { tokens: ["你", "喜欢", action, "吗"], hanzi: `你喜欢${action}吗？`, pinyin: `nǐ xǐ huan ${actionPinyin} ma?`, english: `Do you like ${actionEnglish}?`, audio: `你喜欢${action}吗？我喜欢${action}。` }
    ] }))
  }
};

function shuffled(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }

export function createPlayHobbiesRuntime({ state, currentTopic, currentBook, currentLesson, focusExplorer, speak, selectFocusItem, activityPanelTitle, activityPanelSummary, activityList, renderActivityPanel }) {
  const lessonKey = () => currentTopic().id === "hobbies-3b" ? "3b:4" : "2a:5";
  const lesson = () => lessons[lessonKey()] ?? lessons["2a:5"];
  const round = () => lesson().rounds.find((entry) => entry.itemId === state.hobbiesBuildOrder[state.hobbiesBuildRoundIndex]) ?? lesson().rounds[0];
  const answerFor = (entry, tokens = state.hobbiesBuildSelectedTokens) => entry.answers.find((answer) => answer.tokens.length === tokens.length && answer.tokens.every((token, index) => token === tokens[index]));
  const validPrefix = (entry, tokens) => entry.answers.some((answer) => tokens.every((token, index) => token === answer.tokens[index]));
  function resetRound(newGame = false) {
    if (state.hobbiesBuildLessonKey !== lessonKey()) { state.hobbiesBuildLessonKey = lessonKey(); newGame = true; }
    if (!state.hobbiesBuildOrder.length || newGame) { state.hobbiesBuildOrder = shuffled(lesson().rounds).map((entry) => entry.itemId); state.hobbiesBuildRoundIndex = 0; }
    const entry = round(); state.hobbiesBuildSelectedTokens = []; state.hobbiesBuildAvailableTokens = shuffled([...new Set([...entry.answers.flatMap((answer) => answer.tokens), ...entry.distractors])]); state.hobbiesBuildResult = "";
  }
  function renderHobbiesExplorer() {
    if (!["hobbies", "hobbies-3b"].includes(currentTopic().id)) return;
    const page = lesson(); const items = currentTopic().focusItems; const itemFor = (id) => items.find((item) => item.id === id);
    focusExplorer.innerHTML = `<div class="time-date-board school-topic-board hobbies-topic-board"><div class="numbers-stage-card"><p class="body-match-kicker">${page.book}</p><h4>${page.title}</h4><p>${page.intro}</p></div><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Scene</p></div><div class="school-scene-grid hobbies-scene-grid">${page.scenes.map(([id, hanzi, pinyin, english, audio]) => { const item = itemFor(id); return `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><span></span><button class="small-button is-play-button" type="button" data-hobbies-scene="${audio}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${item.imagePath}" alt="${item.imageAlt}"><div class="greetings-line-stack is-compact"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${english}</p>` : ""}</div></article></div></div></section>`; }).join("")}</div></section><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="school-word-grid is-text-only hobbies-word-grid">${page.itemIds.map((id) => { const item = itemFor(id); return `<button class="school-word-card is-text-only" type="button" data-hobbies-word="${id}"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</button>`; }).join("")}</div></section><section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${page.note[0]}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${page.note[1]}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${page.note[2]}</p>` : ""}<p class="visual-topic-note-example">${page.note[3]}</p></article></div></section></div>`;
    focusExplorer.querySelectorAll("[data-hobbies-word]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.hobbiesWord, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-hobbies-scene]").forEach((button) => button.addEventListener("click", () => state.tapAudioEnabled && speak(button.dataset.hobbiesScene, 0.74)));
  }
  function renderHobbiesPractice(topic) {
    if (state.hobbiesBuildLessonKey !== lessonKey() || !state.hobbiesBuildAvailableTokens.length) resetRound(); const entry = round(); const item = topic.focusItems.find((item) => item.id === entry.itemId); const complete = state.hobbiesBuildResult === "correct"; const answer = complete ? answerFor(entry) : null;
    activityPanelTitle.textContent = "Let's practice"; activityPanelSummary.textContent = lessonKey() === "3b:4" ? "Build a question with 吗, then hear a friend’s answer." : "Build a sentence that fits the picture. More than one answer can be correct."; activityList.className = "support-list";
    const reply = lessonKey() === "3b:4" && answer ? `<div class="transport-build-hint"><p class="numbers-game-hanzi">我喜欢${entry.action}。</p><p class="transport-build-hint-pinyin">wǒ xǐ huan ${entry.actionPinyin}.</p><p class="transport-build-hint-english">I like ${entry.actionEnglish}.</p></div>` : "";
    const usesFourByThreeCover = lessonKey() === "3b:4";
    activityList.innerHTML = `<section class="clothes-quiz-shell transport-builder-shell"><div class="numbers-game-top"><div><p class="body-match-kicker">Build the ${lessonKey() === "3b:4" ? "question" : "sentence"}</p><p class="numbers-game-note">${lessonKey() === "3b:4" ? "Make a question about the picture. Use 吗 at the end." : "More than one answer can be correct. Tap the word cards in the right order to make any sentence that fits the picture."}</p></div><button class="small-button is-play-button" type="button" data-hobbies-build-play>${lessonKey() === "3b:4" ? "New game" : "Play"}</button></div><figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image${usesFourByThreeCover ? " hobbies-3b-practice-image" : ""}" src="${item.imagePath}" alt="${item.imageAlt}"></figure><div class="transport-build-target is-${state.hobbiesBuildResult}">${state.hobbiesBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${complete ? "✓" : "×"}</span>` : ""}${state.hobbiesBuildSelectedTokens.length ? state.hobbiesBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : lessonKey() === "3b:4" ? '<span class="intro-build-placeholder">Build a question: …吗</span>' : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>${answer ? `<div class="transport-build-hint"><p class="numbers-game-hanzi">${answer.hanzi}</p><p class="transport-build-hint-pinyin">${answer.pinyin}</p><p class="transport-build-hint-english">${answer.english}</p></div>${reply}` : ""}${complete && lessonKey() === "3b:4" ? "" : `<div class="intro-build-choices">${state.hobbiesBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-hobbies-build-token="${index}" ${complete ? "disabled" : ""}>${token}</button>`).join("")}</div>`}${lessonKey() === "3b:4" ? "" : '<div class="intro-build-actions"><button class="small-button" type="button" data-hobbies-build-clear>Clear</button></div>'}</section>`;
    activityList.querySelector("[data-hobbies-build-play]").addEventListener("click", () => { resetRound(true); renderActivityPanel(topic); });
    activityList.querySelectorAll("[data-hobbies-build-token]").forEach((button) => button.addEventListener("click", () => { const token = state.hobbiesBuildAvailableTokens[Number(button.dataset.hobbiesBuildToken)]; const selected = [...state.hobbiesBuildSelectedTokens, token]; if (!validPrefix(entry, selected)) { resetRound(); state.hobbiesBuildResult = "wrong"; renderActivityPanel(topic); return; } state.hobbiesBuildSelectedTokens = selected; state.hobbiesBuildAvailableTokens = state.hobbiesBuildAvailableTokens.filter((_, index) => index !== Number(button.dataset.hobbiesBuildToken)); const done = answerFor(entry, selected); state.hobbiesBuildResult = done ? "correct" : ""; if (done && state.tapAudioEnabled) speak(done.audio, 0.76); renderActivityPanel(topic); }));
    activityList.querySelector("[data-hobbies-build-clear]")?.addEventListener("click", () => { resetRound(); renderActivityPanel(topic); });
  }
  return { renderHobbiesExplorer, renderHobbiesPractice };
}
