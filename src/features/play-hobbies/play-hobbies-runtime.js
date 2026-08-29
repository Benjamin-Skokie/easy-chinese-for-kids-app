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
  },
  "4b:4": {
    book: "Book 4B Lesson 4", title: "Hobbies at Home", intro: "Hear the home activities, then notice the difference between a favorite and an activity happening now.",
    itemIds: ["television", "piano", "computer-game", "movie", "cartoons"],
    scenes: [
      ["cartoons", "她喜欢看动画片儿。", "tā xǐ huan kàn dòng huà piānr.", "She likes watching cartoons.", "她喜欢看动画片儿"],
      ["piano", "她在弹钢琴。", "tā zài tán gāng qín.", "She is playing the piano.", "她在弹钢琴"],
      ["computer-game", "他在玩儿电脑游戏。", "tā zài wánr diàn nǎo yóu xì.", "He is playing computer games.", "他在玩儿电脑游戏"],
      ["television", "她喜欢看电视。", "tā xǐ huan kàn diàn shì.", "She likes watching television.", "她喜欢看电视"],
      ["movie", "他爱看电影。", "tā ài kàn diàn yǐng.", "He loves watching movies.", "他爱看电影"]
    ],
    note: ["喜欢 / 爱 …；在 + 活动", "xǐ huan / ài …; zài + huó dòng", "喜欢 and 爱 say what someone generally likes. 在 + activity says what someone is doing now.", "她喜欢看电视。 她在弹钢琴。"],
    practiceType: "sentence-choice",
    sentenceOptions: {
      cartoons: { hanzi: "她喜欢看动画片儿。", pinyin: "tā xǐ huan kàn dòng huà piānr.", english: "She likes watching cartoons.", audio: "她喜欢看动画片儿" },
      piano: { hanzi: "她在弹钢琴。", pinyin: "tā zài tán gāng qín.", english: "She is playing the piano.", audio: "她在弹钢琴" },
      computer: { hanzi: "他在玩儿电脑游戏。", pinyin: "tā zài wánr diàn nǎo yóu xì.", english: "He is playing computer games.", audio: "他在玩儿电脑游戏" },
      television: { hanzi: "她喜欢看电视。", pinyin: "tā xǐ huan kàn diàn shì.", english: "She likes watching television.", audio: "她喜欢看电视" },
      movie: { hanzi: "他爱看电影。", pinyin: "tā ài kàn diàn yǐng.", english: "He loves watching movies.", audio: "他爱看电影" }
    },
    rounds: [
      { itemId: "cartoons", correctId: "cartoons", optionIds: ["cartoons", "piano"] },
      { itemId: "piano", correctId: "piano", optionIds: ["piano", "computer"] },
      { itemId: "computer-game", correctId: "computer", optionIds: ["computer", "movie"] },
      { itemId: "television", correctId: "television", optionIds: ["television", "movie"] },
      { itemId: "movie", correctId: "movie", optionIds: ["movie", "computer"] }
    ]
  },
  "4b:7": {
    book: "Book 4B Lesson 7", title: "Leisure Time", intro: "Hear each outdoor activity, then say where it happens.",
    itemIds: ["run", "soccer", "bike", "sand", "playground", "park", "beach"],
    scenes: [
      ["run", "孩子们在学校操场上跑步。", "hái zi men zài xué xiào cāo chǎng shàng pǎo bù.", "The children are running on the school playground.", "孩子们在学校操场上跑步"],
      ["soccer", "天天在公园踢足球。", "tiān tiān zài gōng yuán tī zú qiú.", "Tiantian is playing soccer in the park.", "天天在公园踢足球"],
      ["bike", "思思在公园骑自行车。", "sī si zài gōng yuán qí zì xíng chē.", "Sisi is riding a bike in the park.", "思思在公园骑自行车"],
      ["sand", "美美在海边玩儿沙子。", "měi mei zài hǎi biān wánr shā zi.", "Meimei is playing with sand at the beach.", "美美在海边玩儿沙子"]
    ],
    note: ["在 + 地点 + 活动", "zài + dì diǎn + huó dòng", "Use 在 + place + activity to say where someone is doing something.", "思思在公园骑自行车。"],
    rounds: [
      { itemId: "run", distractors: ["公园", "踢足球"], answers: [{ tokens: ["孩子们", "在", "学校操场上", "跑步"], hanzi: "孩子们在学校操场上跑步。", pinyin: "hái zi men zài xué xiào cāo chǎng shàng pǎo bù.", english: "The children are running on the school playground.", audio: "孩子们在学校操场上跑步" }] },
      { itemId: "soccer", distractors: ["海边", "骑自行车"], answers: [{ tokens: ["天天", "在", "公园", "踢足球"], hanzi: "天天在公园踢足球。", pinyin: "tiān tiān zài gōng yuán tī zú qiú.", english: "Tiantian is playing soccer in the park.", audio: "天天在公园踢足球" }] },
      { itemId: "bike", distractors: ["学校操场", "玩儿沙子"], answers: [{ tokens: ["思思", "在", "公园", "骑自行车"], hanzi: "思思在公园骑自行车。", pinyin: "sī si zài gōng yuán qí zì xíng chē.", english: "Sisi is riding a bike in the park.", audio: "思思在公园骑自行车" }] },
      { itemId: "sand", distractors: ["公园", "跑步"], answers: [{ tokens: ["美美", "在", "海边", "玩儿沙子"], hanzi: "美美在海边玩儿沙子。", pinyin: "měi mei zài hǎi biān wánr shā zi.", english: "Meimei is playing with sand at the beach.", audio: "美美在海边玩儿沙子" }] }
    ]
  }
};

// These authored scene and practice utterances are also a recording catalog.
// Keep them exported so the audio-manifest audit can cover the text actually
// passed to `speak()` by this runtime.
export { lessons as hobbiesLessonAudioData };
export const hobbiesSceneAudioEntries = Object.values(lessons).flatMap((lesson) => lesson.scenes.map(([, hanzi, pinyin, english, audio]) => ({ hanzi, pinyin, english, audio })));
export const toySceneAudioEntries = [
  { id: "doll", hanzi: "我有娃娃。", pinyin: "wǒ yǒu wá wa.", english: "I have a doll.", audio: "我有娃娃" },
  { id: "toy-train", hanzi: "我有玩具火车。", pinyin: "wǒ yǒu wán jù huǒ chē.", english: "I have a toy train.", audio: "我有玩具火车" },
  { id: "toy-airplane", hanzi: "我有玩具飞机。", pinyin: "wǒ yǒu wán jù fēi jī.", english: "I have a toy airplane.", audio: "我有玩具飞机" },
  { id: "toy-bear", hanzi: "我有玩具熊。", pinyin: "wǒ yǒu wán jù xióng.", english: "I have a toy bear.", audio: "我有玩具熊" }
];

import { advanceShuffledOrder, nextRandomCycleId } from "../../core/random-cycle.js";

function shuffled(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }

export function createPlayHobbiesRuntime({ state, currentTopic, currentBook, currentLesson, focusExplorer, speak, selectFocusItem, activityPanelTitle, activityPanelSummary, activityList, renderActivityPanel }) {
  const toyItems = () => currentTopic().flashcardItems;
  const currentToyPracticeItem = () => toyItems().find((item) => item.id === state.toysPracticeItemId) ?? toyItems()[0];
  const nextToysPracticeRound = () => {
    const items = toyItems();
    const itemId = nextRandomCycleId(state, "toys-picture-choice", items.map((item) => item.id));
    state.toysPracticeItemId = itemId;
    state.toysPracticeOptionIds = shuffled(items.map((item) => item.id));
    state.toysPracticeSelectedId = "";
    state.toysPracticeResult = "";
    state.toysPracticeWrongIds = new Set();
  };
  const ensureToysPractice = () => {
    if (!state.toysPracticeItemId || !state.toysPracticeOptionIds.length) nextToysPracticeRound();
  };
  const lessonKey = () => ({ "hobbies-3b": "3b:4", "hobbies-at-home": "4b:4", "hobbies-leisure": "4b:7" }[currentTopic().id] ?? "2a:5");
  const lesson = () => lessons[lessonKey()] ?? lessons["2a:5"];
  const sceneTitle = (id) => ({
    "2a:5": { read: "Reading time", draw: "Drawing time", write: "Writing time", play: "Game time" },
    "3b:4": { sing: "Singing together", dance: "Dance time", swim: "Swimming", skate: "Ice skating", ski: "Skiing" },
    "4b:4": { cartoons: "Watching cartoons", piano: "Playing piano", "computer-game": "Computer games", television: "Watching TV", movie: "Movie time" },
    "4b:7": { run: "Running", soccer: "Playing soccer", bike: "Riding a bike", sand: "Playing in sand" }
  }[lessonKey()]?.[id] ?? "Look and listen");
  const speakLesson = (text, rate) => speak(text, rate);
  const round = () => lesson().rounds.find((entry) => entry.itemId === state.hobbiesBuildOrder[state.hobbiesBuildRoundIndex]) ?? lesson().rounds[0];
  const answerFor = (entry, tokens = state.hobbiesBuildSelectedTokens) => entry.answers.find((answer) => answer.tokens.length === tokens.length && answer.tokens.every((token, index) => token === tokens[index]));
  const validPrefix = (entry, tokens) => entry.answers.some((answer) => tokens.every((token, index) => token === answer.tokens[index]));
  function resetRound(newGame = false) {
    const sameLesson = state.hobbiesBuildLessonKey === lessonKey();
    if (!sameLesson) { state.hobbiesBuildLessonKey = lessonKey(); newGame = true; }
    if (!state.hobbiesBuildOrder.length) {
      const order = shuffled(lesson().rounds).map((entry) => entry.itemId);
      state.hobbiesBuildOrder = order; state.hobbiesBuildRoundIndex = 0;
    } else if (newGame) {
      advanceShuffledOrder(state, "hobbiesBuildOrder", "hobbiesBuildRoundIndex", shuffled);
    }
    const entry = round(); state.hobbiesBuildSelectedTokens = []; state.hobbiesBuildAvailableTokens = lesson().practiceType === "sentence-choice" ? shuffled(entry.optionIds) : shuffled([...new Set([...entry.answers.flatMap((answer) => answer.tokens), ...entry.distractors])]); state.hobbiesBuildResult = "";
  }
  function renderHobbiesExplorer() {
    if (currentTopic().id === "toys") return renderToysExplorer();
    if (!["hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"].includes(currentTopic().id)) return;
    const page = lesson(); const items = currentTopic().focusItems; const itemFor = (id) => items.find((item) => item.id === id);
    const imageClass = "school-scene-image";
    focusExplorer.innerHTML = `<div class="time-date-board school-topic-board hobbies-topic-board"><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Review</p></div><div class="school-scene-grid hobbies-scene-grid">${page.scenes.map(([id, hanzi, pinyin, english, audio]) => { const item = itemFor(id); return `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${sceneTitle(id)}</p></div><button class="small-button is-play-button" type="button" data-hobbies-scene="${audio}">Play</button></div><div class="school-scene-layout"><img class="${imageClass}" src="${item.imagePath}" alt="${item.imageAlt}"><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${english}</p>` : ""}</div></article></div></div></section>`; }).join("")}</div></section><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="school-word-grid is-text-only hobbies-word-grid">${page.itemIds.map((id) => { const item = itemFor(id); return `<button class="school-word-card is-text-only" type="button" data-hobbies-word="${id}"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</button>`; }).join("")}</div></section><section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${page.note[0]}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${page.note[1]}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${page.note[2]}</p>` : ""}<p class="visual-topic-note-example">${page.note[3]}</p></article></div></section></div>`;
    focusExplorer.querySelectorAll("[data-hobbies-word]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.hobbiesWord, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-hobbies-scene]").forEach((button) => button.addEventListener("click", () => state.tapAudioEnabled && speakLesson(button.dataset.hobbiesScene, 0.74)));
  }
  function renderToysExplorer() {
    const flashcards = currentTopic().flashcardItems;
    const scenes = toySceneAudioEntries.map((scene) => ({
      ...scene,
      title: { doll: "Doll tea party", "toy-train": "Toy train", "toy-airplane": "Toy airplane", "toy-bear": "Toy bear" }[scene.id],
      imagePath: { doll: "assets/illustrated-toys/lele-playing-doll.webp", "toy-train": "assets/illustrated-toys/lele-playing-toy-train.webp", "toy-airplane": "assets/illustrated-toys/lele-playing-toy-airplane.webp", "toy-bear": "assets/illustrated-toys/lele-playing-toy-bear.webp" }[scene.id],
      alt: { doll: "Lele playing with a doll", "toy-train": "Lele pushing a toy train", "toy-airplane": "Lele flying a toy airplane", "toy-bear": "Lele high-fiving a toy bear" }[scene.id]
    }));
    focusExplorer.innerHTML = `<div class="time-date-board school-topic-board hobbies-topic-board"><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Review</p></div><div class="school-scene-grid toys-scene-grid">${scenes.map((scene) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.title}</p></div><button class="small-button is-play-button" type="button" data-toys-scene-play="${scene.id}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${scene.imagePath}" alt="${scene.alt}"><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${scene.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${scene.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${scene.english}</p>` : ""}</div></article></div></div></section>`).join("")}</div></section><section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words &amp; more</p></div><div class="school-word-grid toys-flashcard-grid">${flashcards.map((item) => `<button class="school-word-card book-word-card" type="button" data-toys-flashcard="${item.id}"><img class="school-word-image book-word-image" src="${item.imagePath}" alt="${item.imageAlt}"><span class="book-word-copy"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></section></div>`;
    focusExplorer.querySelectorAll("[data-toys-scene-play]").forEach((button) => button.addEventListener("click", () => {
      const scene = scenes.find((entry) => entry.id === button.dataset.toysScenePlay);
      if (scene && state.tapAudioEnabled) speakLesson(scene.audio, 0.74);
    }));
    focusExplorer.querySelectorAll("[data-toys-flashcard]").forEach((button) => button.addEventListener("click", () => {
      const item = flashcards.find((entry) => entry.id === button.dataset.toysFlashcard);
      if (item && state.tapAudioEnabled) speakLesson(item.audio, 0.78);
    }));
  }
  function renderToysPractice(topic) {
    ensureToysPractice();
    const item = currentToyPracticeItem();
    if (!item) return;
    const complete = state.toysPracticeResult === "correct";
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the toy, then choose the word that completes 我有…";
    activityList.className = "support-list";
    activityList.innerHTML = `<section class="clothes-quiz-shell toys-practice-shell"><div class="numbers-game-top"><div><p class="body-match-kicker">Look and choose</p><p class="numbers-game-note">Look at the picture. Which toy completes 我有…?</p></div><button class="small-button is-practice-advance-button" type="button" data-toys-practice-new>New game</button></div><figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.imageAlt}"></figure><p class="toy-practice-frame">我有<span class="toy-practice-blank${complete ? " is-correct" : ""}">${complete ? item.hanzi : "…"}</span>。</p>${complete && state.showPinyin ? `<p class="numbers-game-pinyin">wǒ yǒu ${item.pinyin}.</p>` : ""}${complete && state.showEnglish ? `<p class="numbers-game-english">I have a ${item.english}.</p>` : ""}<div class="clothes-quiz-options">${state.toysPracticeOptionIds.map((optionId) => { const option = toyItems().find((entry) => entry.id === optionId); if (!option) return ""; const isCorrect = complete && option.id === item.id; const isWrong = state.toysPracticeWrongIds.has(option.id); return `<button class="clothes-quiz-option${isCorrect ? " is-correct" : isWrong ? " is-wrong" : ""}" type="button" data-toys-practice-pick="${option.id}" ${complete ? "disabled" : ""}>${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}<span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`; }).join("")}</div></section>`;
    activityList.querySelector("[data-toys-practice-new]")?.addEventListener("click", () => { nextToysPracticeRound(); renderActivityPanel(topic); });
    activityList.querySelectorAll("[data-toys-practice-pick]").forEach((button) => button.addEventListener("click", () => {
      if (state.toysPracticeResult === "correct") return;
      const pickedId = button.dataset.toysPracticePick;
      state.toysPracticeSelectedId = pickedId;
      if (pickedId === item.id) {
        state.toysPracticeResult = "correct";
        if (state.tapAudioEnabled) speakLesson(`我有${item.hanzi}`, 0.78);
      } else {
        state.toysPracticeResult = "wrong";
        state.toysPracticeWrongIds = new Set([...state.toysPracticeWrongIds, pickedId]);
      }
      renderActivityPanel(topic);
    }));
  }
  function renderHobbiesPractice(topic) {
    if (topic.id === "toys") return renderToysPractice(topic);
    if (lesson().practiceType === "sentence-choice") return renderHobbiesSentenceChoice(topic);
    if (state.hobbiesBuildLessonKey !== lessonKey() || !state.hobbiesBuildAvailableTokens.length) resetRound(); const entry = round(); const item = topic.focusItems.find((item) => item.id === entry.itemId); const complete = state.hobbiesBuildResult === "correct"; const answer = complete ? answerFor(entry) : null;
    const isQuestion = lessonKey() === "3b:4"; const isLeisure = lessonKey() === "4b:7";
    activityPanelTitle.textContent = "Let's practice"; activityPanelSummary.textContent = isQuestion ? "Build a question with 吗, then hear a friend’s answer." : isLeisure ? "Build the complete sentence that matches the picture." : "Build a sentence that fits the picture. More than one answer can be correct."; activityList.className = "support-list";
    const reply = lessonKey() === "3b:4" && answer ? `<div class="transport-build-hint"><p class="numbers-game-hanzi">我喜欢${entry.action}。</p><p class="transport-build-hint-pinyin">wǒ xǐ huan ${entry.actionPinyin}.</p><p class="transport-build-hint-english">I like ${entry.actionEnglish}.</p></div>` : "";
    const usesFourByThreeCover = isQuestion || isLeisure;
    const leisureSlots = ["Who", "在", "Where", "What"];
    const targetContent = isLeisure
      ? `${state.hobbiesBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("")}${leisureSlots.slice(state.hobbiesBuildSelectedTokens.length).map((slot) => `<span class="intro-build-placeholder hobbies-sentence-slot">${slot}</span>`).join("")}`
      : state.hobbiesBuildSelectedTokens.length ? state.hobbiesBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : isQuestion ? '<span class="intro-build-placeholder">Build a question: …吗</span>' : '<span class="intro-build-placeholder">Your sentence will appear here.</span>';
    activityList.innerHTML = `<section class="clothes-quiz-shell transport-builder-shell"><div class="numbers-game-top"><div><p class="body-match-kicker">Build the ${isQuestion ? "question" : "sentence"}</p><p class="numbers-game-note">${isQuestion ? "Make a question about the picture. Use 吗 at the end." : isLeisure ? "Use the pale hints in the answer box: who · 在 · where · what." : "More than one answer can be correct. Tap the word cards in the right order to make any sentence that fits the picture."}</p></div><button class="small-button is-play-button" type="button" data-hobbies-build-play>${isQuestion || isLeisure ? "New game" : "Play"}</button></div><figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image${usesFourByThreeCover ? " hobbies-3b-practice-image" : ""}" src="${item.imagePath}" alt="${item.imageAlt}"></figure><div class="transport-build-target is-${state.hobbiesBuildResult}">${state.hobbiesBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${complete ? "✓" : "×"}</span>` : ""}${targetContent}</div>${answer ? `<div class="transport-build-hint"><p class="numbers-game-hanzi">${answer.hanzi}</p><p class="transport-build-hint-pinyin">${answer.pinyin}</p><p class="transport-build-hint-english">${answer.english}</p></div>${reply}` : ""}${complete && (isQuestion || isLeisure) ? "" : `<div class="intro-build-choices">${state.hobbiesBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-hobbies-build-token="${index}" ${complete ? "disabled" : ""}>${token}</button>`).join("")}</div>`}${isQuestion || isLeisure ? "" : '<div class="intro-build-actions"><button class="small-button" type="button" data-hobbies-build-clear>Clear</button></div>'}</section>`;
    activityList.querySelector("[data-hobbies-build-play]").addEventListener("click", () => { resetRound(true); renderActivityPanel(topic); });
    activityList.querySelectorAll("[data-hobbies-build-token]").forEach((button) => button.addEventListener("click", () => { const token = state.hobbiesBuildAvailableTokens[Number(button.dataset.hobbiesBuildToken)]; const selected = [...state.hobbiesBuildSelectedTokens, token]; if (!validPrefix(entry, selected)) { resetRound(); state.hobbiesBuildResult = "wrong"; renderActivityPanel(topic); return; } state.hobbiesBuildSelectedTokens = selected; state.hobbiesBuildAvailableTokens = state.hobbiesBuildAvailableTokens.filter((_, index) => index !== Number(button.dataset.hobbiesBuildToken)); const done = answerFor(entry, selected); state.hobbiesBuildResult = done ? "correct" : ""; if (done && state.tapAudioEnabled) speakLesson(done.audio, 0.76); renderActivityPanel(topic); }));
    activityList.querySelector("[data-hobbies-build-clear]")?.addEventListener("click", () => { resetRound(); renderActivityPanel(topic); });
  }
  function renderHobbiesSentenceChoice(topic) {
    if (state.hobbiesBuildLessonKey !== lessonKey() || !state.hobbiesBuildAvailableTokens.length) resetRound();
    const entry = round(); const item = topic.focusItems.find((focusItem) => focusItem.id === entry.itemId); const page = lesson(); const complete = state.hobbiesBuildResult === "correct";
    activityPanelTitle.textContent = "Let's practice"; activityPanelSummary.textContent = "Look at the picture, then choose the Chinese sentence that matches it."; activityList.className = "support-list";
    activityList.innerHTML = `<section class="clothes-quiz-shell"><div class="numbers-game-top"><div><p class="body-match-kicker">Look and choose</p><p class="numbers-game-note">Choose the complete sentence that matches the picture.</p></div><button class="small-button is-play-button" type="button" data-hobbies-choice-new>New game</button></div><figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image hobbies-3b-practice-image" src="${item.imagePath}" alt="${item.imageAlt}"></figure><div class="clothes-quiz-options sentence-choice-options">${state.hobbiesBuildAvailableTokens.map((optionId) => { const option = page.sentenceOptions[optionId]; const selected = state.hobbiesBuildSelectedTokens[0] === optionId; const resultClass = selected ? ` is-${state.hobbiesBuildResult}` : ""; const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${complete ? "✓" : "×"}</span>` : ""; return `<button class="clothes-quiz-option${resultClass}" type="button" data-hobbies-choice="${optionId}" ${complete ? "disabled" : ""}>${mark}<span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`; }).join("")}</div></section>`;
    activityList.querySelector("[data-hobbies-choice-new]").addEventListener("click", () => { resetRound(true); renderActivityPanel(topic); });
    activityList.querySelectorAll("[data-hobbies-choice]").forEach((button) => button.addEventListener("click", () => { if (state.hobbiesBuildResult === "correct") return; const optionId = button.dataset.hobbiesChoice; state.hobbiesBuildSelectedTokens = [optionId]; state.hobbiesBuildResult = optionId === entry.correctId ? "correct" : "wrong"; if (state.hobbiesBuildResult === "correct" && state.tapAudioEnabled) speakLesson(page.sentenceOptions[optionId].audio, 0.76); renderActivityPanel(topic); }));
  }
  return { renderHobbiesExplorer, renderHobbiesPractice, renderToysExplorer, renderToysPractice };
}
