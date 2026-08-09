import { colourLessons } from "./colours.js";
import { natureLesson, weatherLesson } from "./weather.js";

const colourSwatches = {
  red: "#e85b50",
  yellow: "#f2bd3c",
  blue: "#4b91d3",
  green: "#69a95a",
  purple: "#9b70be",
  orange: "#e98a38",
  pink: "#e97aa9",
  black: "#39404b",
  white: "#f7f7f2"
};

const colourMissionObjects = [
  { id: "balloon", hanzi: "气球", pinyin: "qì qiú", english: "balloon" },
  { id: "kite", hanzi: "风筝", pinyin: "fēng zheng", english: "kite" },
  { id: "backpack", hanzi: "书包", pinyin: "shū bāo", english: "backpack" },
  { id: "cup", hanzi: "杯子", pinyin: "bēi zi", english: "cup" },
  { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "hat" },
  { id: "block", hanzi: "积木", pinyin: "jī mù", english: "building block" },
  { id: "pen", hanzi: "笔", pinyin: "bǐ", english: "pen" },
  { id: "toy-car", hanzi: "玩具汽车", pinyin: "wán jù qì chē", english: "toy car" }
];

const weatherDressRounds = [
  {
    id: "rain",
    prompt: "下雨了。带什么？",
    promptPinyin: "xià yǔ le. dài shén me?",
    promptEnglish: "It is raining. What should we take?",
    answerId: "umbrella",
    answerSentence: "下雨了。带雨伞。",
    answerAudio: "带雨伞",
    answerPinyin: "xià yǔ le. dài yǔ sǎn.",
    answerEnglish: "It is raining. Take an umbrella."
  },
  {
    id: "snow",
    prompt: "下雪了。今天很冷。穿什么？",
    promptPinyin: "xià xuě le. jīn tiān hěn lěng. chuān shén me?",
    promptEnglish: "It is snowing. Today is cold. What should we wear?",
    answerId: "knit-hat",
    answerSentence: "下雪了。今天很冷。戴帽子。",
    answerAudio: "戴帽子",
    answerPinyin: "xià xuě le. jīn tiān hěn lěng. dài mào zi.",
    answerEnglish: "It is snowing. Today is cold. Wear a hat."
  },
  {
    id: "sunny",
    prompt: "今天是晴天。今天很热。穿什么？",
    promptPinyin: "jīn tiān shì qíng tiān. jīn tiān hěn rè. chuān shén me?",
    promptEnglish: "Today is sunny. Today is hot. What should we wear?",
    answerId: "shorts",
    answerSentence: "今天是晴天。今天很热。穿短裤。",
    answerAudio: "穿短裤",
    answerPinyin: "jīn tiān shì qíng tiān. jīn tiān hěn rè. chuān duǎn kù.",
    answerEnglish: "Today is sunny. Today is hot. Wear shorts."
  },
  {
    id: "windy",
    prompt: "今天刮大风。穿什么？",
    promptPinyin: "jīn tiān guā dà fēng. chuān shén me?",
    promptEnglish: "It is very windy today. What should we wear?",
    answerId: "jacket",
    answerSentence: "今天刮大风。穿外套。",
    answerAudio: "穿外套",
    answerPinyin: "jīn tiān guā dà fēng. chuān wài tào.",
    answerEnglish: "It is very windy today. Wear a jacket."
  }
];

const weatherDressChoices = [
  { id: "umbrella", hanzi: "雨伞", imagePath: "assets/illustrated-weather/umbrella.png", imageAlt: "A blue umbrella" },
  { id: "knit-hat", hanzi: "帽子", imagePath: "assets/illustrated-weather/knit-hat.png", imageAlt: "A muted red knit hat" },
  { id: "shorts", hanzi: "短裤", imagePath: "assets/illustrated-weather/shorts.png", imageAlt: "A pair of orange shorts" },
  { id: "jacket", hanzi: "外套", imagePath: "assets/illustrated-weather/windbreaker.png", imageAlt: "A lightweight green windbreaker" }
];

const weatherFillRounds = [
  {
    id: "rain",
    imagePath: "assets/illustrated-weather/umbrella.png",
    imageAlt: "A blue umbrella",
    clothing: "带雨伞",
    clothingPinyin: "dài yǔ sǎn",
    clothingEnglish: "Take an umbrella.",
    weather: "下雨了",
    weatherPinyin: "xià yǔ le",
    weatherEnglish: "it is raining",
    temperatures: ["冷", "热"]
  },
  {
    id: "hot",
    imagePath: "assets/illustrated-weather/shorts.png",
    imageAlt: "A pair of orange shorts",
    clothing: "穿短裤",
    clothingPinyin: "chuān duǎn kù",
    clothingEnglish: "Wear shorts.",
    weather: "是晴天",
    weatherPinyin: "shì qíng tiān",
    weatherEnglish: "is sunny",
    temperature: "热",
    temperaturePinyin: "rè",
    temperatureEnglish: "hot"
  },
  {
    id: "cold",
    imagePath: "assets/illustrated-weather/knit-hat.png",
    imageAlt: "A muted red knit hat",
    clothing: "戴帽子",
    clothingPinyin: "dài mào zi",
    clothingEnglish: "Wear a hat.",
    weather: "下雪了",
    weatherPinyin: "xià xuě le",
    weatherEnglish: "is snowing",
    temperature: "冷",
    temperaturePinyin: "lěng",
    temperatureEnglish: "cold"
  },
  {
    id: "windy",
    imagePath: "assets/illustrated-weather/windbreaker.png",
    imageAlt: "A lightweight green windbreaker",
    clothing: "穿外套",
    clothingPinyin: "chuān wài tào",
    clothingEnglish: "Wear a jacket.",
    weather: "刮大风",
    weatherPinyin: "guā dà fēng",
    weatherEnglish: "is very windy",
    temperature: "冷",
    temperaturePinyin: "lěng",
    temperatureEnglish: "cold"
  }
];

const weatherFillWeatherChoices = ["下雨了", "下雪了", "是晴天", "刮大风"];
const weatherFillTemperatureData = {
  冷: { pinyin: "lěng", english: "cold" },
  热: { pinyin: "rè", english: "hot" }
};

export function createWorldRuntime({ state, currentTopic, currentBook, currentLesson, focusExplorer, speak, selectFocusItem, activityPanelTitle, activityPanelSummary, activityList, renderActivityPanel }) {
  function lessonForCurrentBook() {
    const topic = currentTopic();
    // Colours is one cumulative topic: 1B introduces four core colours and
    // 2A expands that foundation to the complete nine-colour set. Show the
    // full set by default so the topic never silently collapses to four cards.
    if (topic.id === "colours") return colourLessons["2a"];
    if (topic.id === "nature") return natureLesson;
    if (topic.id === "weather") return weatherLesson;
    return null;
  }

  function focusItemsForTopic(topic) {
    if (topic.id === "colours" || topic.id === "nature" || topic.id === "weather") return lessonForCurrentBook()?.items ?? topic.focusItems;
    return topic.focusItems;
  }

  function renderWorldExplorer() {
    const lesson = lessonForCurrentBook();
    if (!lesson) return;
    if (lesson === weatherLesson) return renderWeatherExplorer();
    const hasScene = Boolean(lesson.imagePath);
    focusExplorer.innerHTML = `
      <div class="time-date-board world-lesson-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${lesson.title}</h4><p>${lesson.summary}</p></div>
        ${hasScene ? `<section class="world-scene-card"><img src="${lesson.imagePath}" alt="${lesson.imageAlt}" /><div>${lesson.sentences.map((line) => `<button class="small-button is-action-button" type="button" data-world-sentence="${line.audio}">${line.hanzi}</button>`).join("")}</div></section>` : ""}
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        <div class="time-asset-grid world-asset-grid">
          ${lesson.items.map((item) => `<button class="time-asset-card" type="button" data-world-item="${item.id}">${item.imagePath ? `<img class="time-asset-image" src="${item.imagePath}" alt="${item.imageAlt}" />` : ""}<span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}${item.phrase ? `<span class="time-asset-context">${item.phrase}</span>` : ""}</button>`).join("")}
        </div>
      </div>
    `;
    focusExplorer.querySelectorAll("[data-world-item]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.worldItem, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-world-sentence]").forEach((button) => button.addEventListener("click", () => { if (state.tapAudioEnabled) speak(button.dataset.worldSentence, 0.72); }));
  }

  function renderWeatherExplorer() {
    const sceneLabels = {
      rain: "下雨天",
      snow: "下雪天",
      sunny: "晴天",
      windy: "刮大风"
    };
    const scenes = Array.from(weatherLesson.items.reduce((groups, item) => {
      const scene = groups.get(item.imagePath) ?? { imagePath: item.imagePath, imageAlt: item.imageAlt, items: [] };
      scene.items.push(item);
      groups.set(item.imagePath, scene);
      return groups;
    }, new Map()).values()).map((scene) => ({ ...scene, title: sceneLabels[scene.items[0].id] }));
    focusExplorer.innerHTML = `
      <div class="time-date-board school-topic-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${weatherLesson.title}</h4><p>${weatherLesson.summary}</p></div>
        <section class="school-lesson-section is-weather"><div class="school-scene-grid">${scenes.map((scene, index) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.title}</p></div><button class="small-button is-play-button" type="button" data-weather-scene="${index}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${scene.imagePath}" alt="${scene.imageAlt}" /><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi weather-scene-line">${scene.items.map((item) => item.hanzi).join("。")}。</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${scene.items.map((item) => item.pinyin).join(". ")}.</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${scene.items.map((item) => item.english).join(" ")}</p>` : ""}</div></article></div></div></section>`).join("")}</div></section>
        <section class="visual-topic-notes school-review-notes">
          <p class="body-match-kicker">Useful notes</p>
          <div class="visual-topic-note-grid school-review-grid">
            <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">今天很 + 冷 / 热</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān hěn lěng / rè</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Use 很 + an adjective to say how the weather feels today.</p>' : ""}<p class="visual-topic-note-example">今天很冷。今天很热。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān hěn lěng. jīn tiān hěn rè.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Today is cold. Today is hot.</p>' : ""}</article>
            <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">今天是 + 天气</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān shì + tiān qì</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Use 今天是 to name today’s kind of weather.</p>' : ""}<p class="visual-topic-note-example">今天是晴天。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān shì qíng tiān.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Today is sunny.</p>' : ""}</article>
          </div>
        </section>
      </div>
    `;
    focusExplorer.querySelectorAll("[data-world-item]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.worldItem, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-weather-scene]").forEach((button) => button.addEventListener("click", () => {
      const scene = scenes[Number(button.dataset.weatherScene)];
      if (scene && state.tapAudioEnabled) speak(scene.items.map((item) => item.audio).join("，"), 0.74);
    }));
  }

  function shuffled(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function ensureColourPractice() {
    const items = colourLessons["2a"].items;
    if (!state.worldColourRoundIds?.length || state.worldColourRoundIds.length !== items.length) {
      state.worldColourRoundIds = shuffled(items.map((item) => item.id));
      state.worldColourRoundIndex = 0;
      state.worldColourPickedId = "";
      state.worldColourResult = "";
      state.worldFavouriteColourId = "purple";
    }
  }

  function missionObjectMarkup(objectId, colour) {
    const outline = "#43372c";
    const shine = "rgba(255,255,255,.34)";
    const svgStart = `<svg viewBox="0 0 120 96" aria-hidden="true" focusable="false">`;
    const svgEnd = "";
    if (objectId === "balloon") return `${svgStart}<path d="M60 8C34 8 25 29 30 48c4 17 17 28 30 34 13-6 26-17 30-34C95 29 86 8 60 8Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M60 82v11M54 89h12" stroke="${outline}" stroke-width="3" stroke-linecap="round"/><ellipse cx="48" cy="31" rx="7" ry="12" fill="${shine}"/></svg>${svgEnd}`;
    if (objectId === "kite") return `${svgStart}<path d="M60 7 99 47 60 87 21 47Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M21 47 99 47M60 7v80M60 87c15 1 18 9 8 11 12 1 15 7 5 10" fill="none" stroke="${outline}" stroke-width="3" stroke-linecap="round"/><path d="M48 22 60 12" stroke="${shine}" stroke-width="6" stroke-linecap="round"/></svg>${svgEnd}`;
    if (objectId === "backpack") return `${svgStart}<path d="M38 34V24c0-15 44-15 44 0v10" fill="none" stroke="${outline}" stroke-width="6" stroke-linecap="round"/><path d="M28 34c0-8 8-12 16-12h32c8 0 16 4 16 12v49H28V34Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M37 51h46v25H37z" fill="${shine}" stroke="${outline}" stroke-width="3"/><path d="M51 63h18" stroke="${outline}" stroke-width="3" stroke-linecap="round"/></svg>${svgEnd}`;
    if (objectId === "cup") return `${svgStart}<path d="M28 24h55v47c0 16-14 18-27 18S28 87 28 71V24Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M83 35h10c18 0 18 29 0 29H83" fill="none" stroke="${outline}" stroke-width="5"/><path d="M36 30h38" stroke="${shine}" stroke-width="6" stroke-linecap="round"/></svg>${svgEnd}`;
    if (objectId === "hat") return `${svgStart}<path d="M35 49c0-26 50-26 50 0v12H35V49Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M14 64c7-10 84-10 92 0 7 9-4 15-46 15S7 73 14 64Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M45 45c9-7 20-7 29 0" fill="none" stroke="${shine}" stroke-width="5" stroke-linecap="round"/></svg>${svgEnd}`;
    if (objectId === "block") return `${svgStart}<path d="M26 32 60 13l34 19v38L60 89 26 70V32Z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="m26 32 34 19 34-19M60 51v38" fill="none" stroke="${outline}" stroke-width="3"/><path d="m38 35 18-10" stroke="${shine}" stroke-width="6" stroke-linecap="round"/></svg>${svgEnd}`;
    if (objectId === "pen") return `${svgStart}<path d="M48 19h24l7 13-10 48H51L41 32l7-13Z" fill="${colour}" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/><path d="M48 19 60 8l12 11" fill="${colour}" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/><path d="M50 33h20" stroke="rgba(255,255,255,.58)" stroke-width="5" stroke-linecap="round"/><path d="M72 28h13l-7 24" fill="none" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/><path d="m51 80 9 11 9-11Z" fill="#d9d9d3" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/><path d="M60 91v3" stroke="${outline}" stroke-width="4" stroke-linecap="round"/></svg>${svgEnd}`;
    return `${svgStart}<path d="M21 45h75v29H21z" fill="${colour}" stroke="${outline}" stroke-width="3"/><path d="M35 45 47 31h28l12 14" fill="${colour}" stroke="${outline}" stroke-width="3"/><circle cx="38" cy="76" r="10" fill="#f7f7f2" stroke="${outline}" stroke-width="3"/><circle cx="80" cy="76" r="10" fill="#f7f7f2" stroke="${outline}" stroke-width="3"/><path d="M51 38h18" stroke="${shine}" stroke-width="5" stroke-linecap="round"/></svg>${svgEnd}`;
  }

  function resetColourMission() {
    const colourItems = colourLessons["2a"].items;
    const objects = shuffled(colourMissionObjects).slice(0, 6);
    const colours = shuffled(colourItems).slice(0, 6);
    state.worldColourMissionCards = shuffled(objects.map((object, index) => ({ objectId: object.id, colourId: colours[index].id })));
    state.worldColourMissionTargetObjectId = state.worldColourMissionCards[Math.floor(Math.random() * state.worldColourMissionCards.length)].objectId;
    state.worldColourMissionPickedObjectId = "";
    state.worldColourMissionResult = "";
  }

  function ensureColourMission() {
    if (!state.worldColourMissionCards?.length || state.worldColourMissionCards.length !== 6) resetColourMission();
  }

  function currentColourPracticeItem() {
    ensureColourPractice();
    const itemId = state.worldColourRoundIds[state.worldColourRoundIndex];
    return colourLessons["2a"].items.find((item) => item.id === itemId) ?? colourLessons["2a"].items[0];
  }

  function renderColourPractice() {
    ensureColourPractice();
    const items = colourLessons["2a"].items;
    const target = currentColourPracticeItem();
    const choices = shuffled([target, ...shuffled(items.filter((item) => item.id !== target.id)).slice(0, 3)]);
    const favourite = items.find((item) => item.id === state.worldFavouriteColourId) ?? items[0];
    ensureColourMission();
    const missionCards = state.worldColourMissionCards;
    const missionTargetCard = missionCards.find((card) => card.objectId === state.worldColourMissionTargetObjectId) ?? missionCards[0];
    const missionTargetObject = colourMissionObjects.find((item) => item.id === missionTargetCard.objectId);
    const missionTargetColour = items.find((item) => item.id === missionTargetCard.colourId);
    const missionPrompt = `${missionTargetColour.hanzi}的${missionTargetObject.hanzi}`;
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Listen carefully, find the right colour-and-object pair, then practise complete Chinese descriptions.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="practice-split-card world-colour-mission">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Colour mission</p><h4>Listen and find the object</h4><p class="numbers-game-note">Every round mixes the object colours and their positions. Listen for the complete phrase, then tap the matching picture.</p></div><button class="small-button is-play-button" type="button" data-world-mission-play>Play</button></div>
        ${state.worldColourMissionPickedObjectId ? `<p class="greetings-game-feedback">${state.worldColourMissionResult === "correct" ? `Great! ${missionPrompt}.` : "Not that one. Listen again and try another picture."}</p>` : ""}
        <div class="world-colour-mission-grid">${missionCards.map((card) => { const object = colourMissionObjects.find((item) => item.id === card.objectId); const colour = items.find((item) => item.id === card.colourId); const selected = state.worldColourMissionPickedObjectId === card.objectId; const resultClass = selected ? ` is-${state.worldColourMissionResult}` : ""; return `<button class="world-colour-mission-card${resultClass}" type="button" data-world-mission-pick="${card.objectId}"><span class="world-colour-mission-art">${missionObjectMarkup(object.id, colourSwatches[colour.id])}</span><span class="world-colour-mission-label">${state.showEnglish ? object.english : ""}</span></button>`; }).join("")}</div>
      </section>
      <section class="clothes-quiz-shell world-colour-picture-practice">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture and phrase</p><p class="numbers-game-note">Look at the picture. Which complete Chinese phrase matches it?</p></div><button class="small-button is-play-button" type="button" data-world-colour-play>Play</button></div>
        <figure class="clothes-quiz-visual"><img class="clothes-quiz-image" src="${target.imagePath}" alt="${target.imageAlt}" /></figure>
        <div class="clothes-quiz-options">${choices.map((item) => { const selected = state.worldColourPickedId === item.id; const resultClass = selected ? ` is-${state.worldColourResult}` : ""; const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${state.worldColourResult === "correct" ? "✓" : "×"}</span>` : ""; return `<button class="clothes-quiz-option${resultClass}" type="button" data-world-colour-guess="${item.id}">${mark}<span class="numbers-game-hanzi">${item.phrase}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.phrasePinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.phraseEnglish}</span>` : ""}</button>`; }).join("")}</div>
        ${state.worldColourResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-world-colour-next>Next picture</button></div>' : ""}
      </section>
      <section class="practice-split-card world-favourite-colour-practice"><div class="numbers-game-top"><div><p class="body-match-kicker">My favourite colour</p><p class="numbers-game-note">Choose your favourite colour, then listen and say the sentence.</p></div><button class="small-button is-play-button" type="button" data-world-favourite-play>Play</button></div><div class="world-favourite-colour-options">${items.map((item) => `<button class="small-button${item.id === favourite.id ? " is-action-button" : ""}" type="button" data-world-favourite="${item.id}">${item.hanzi}</button>`).join("")}</div><p class="world-favourite-sentence">我喜欢${favourite.hanzi}。${state.showPinyin ? `<span>wǒ xǐ huan ${favourite.pinyin}.</span>` : ""}${state.showEnglish ? `<span>I like ${favourite.english}.</span>` : ""}</p></section>
      <section class="practice-split-card practice-say-card"><p class="body-match-kicker">Book sentence</p><div class="numbers-game-options"><button class="numbers-game-option greetings-game-option family-listen-option" type="button" data-world-say="我不喜欢黑色和白色">我不喜欢黑色和白色。${state.showPinyin ? '<span class="numbers-game-pinyin">wǒ bù xǐ huan hēi sè hé bái sè.</span>' : ""}${state.showEnglish ? '<span class="numbers-game-english">I do not like black and white.</span>' : ""}</button></div></section>
    `;
    activityList.querySelector("[data-world-mission-play]")?.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(`找一找，${missionPrompt}`, 0.78);
    });
    activityList.querySelectorAll("[data-world-mission-pick]").forEach((button) => button.addEventListener("click", () => {
      state.worldColourMissionPickedObjectId = button.dataset.worldMissionPick;
      state.worldColourMissionResult = button.dataset.worldMissionPick === missionTargetObject.id ? "correct" : "wrong";
      if (state.worldColourMissionResult === "correct") {
        if (state.tapAudioEnabled) speak(missionPrompt, 0.78);
        window.setTimeout(() => { resetColourMission(); renderActivityPanel(currentTopic()); }, 1100);
      }
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelector("[data-world-colour-play]")?.addEventListener("click", () => { if (state.tapAudioEnabled) speak(target.phrase, 0.78); });
    activityList.querySelectorAll("[data-world-colour-guess]").forEach((button) => button.addEventListener("click", () => {
      state.worldColourPickedId = button.dataset.worldColourGuess;
      state.worldColourResult = button.dataset.worldColourGuess === target.id ? "correct" : "wrong";
      if (state.worldColourResult === "correct" && state.tapAudioEnabled) speak(target.phrase, 0.78);
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelector("[data-world-colour-next]")?.addEventListener("click", () => {
      state.worldColourRoundIndex = (state.worldColourRoundIndex + 1) % state.worldColourRoundIds.length;
      state.worldColourPickedId = "";
      state.worldColourResult = "";
      renderActivityPanel(currentTopic());
    });
    activityList.querySelectorAll("[data-world-favourite]").forEach((button) => button.addEventListener("click", () => {
      state.worldFavouriteColourId = button.dataset.worldFavourite;
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelector("[data-world-favourite-play]")?.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(`我喜欢${favourite.hanzi}`, 0.78);
    });
    activityList.querySelectorAll("[data-world-say]").forEach((button) => button.addEventListener("click", () => { if (state.tapAudioEnabled) speak(button.dataset.worldSay, 0.78); }));
  }

  function renderNaturePractice() {
    const target = natureLesson.sentences[Math.floor(Math.random() * natureLesson.sentences.length)];
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the day-and-night scene, listen to a sentence, then say it back.";
    activityList.className = "support-list";
    activityList.innerHTML = `<section class="practice-split-card practice-say-card"><div class="numbers-game-top"><div><p class="body-match-kicker">Describe nature</p><p class="numbers-game-note">Play the sentence, point to it in the picture, then say it back.</p></div><button class="small-button is-play-button" type="button" data-world-nature-play>Play</button></div><p class="world-nature-sentence">${target.hanzi}</p>${state.showPinyin ? `<p>${target.pinyin}</p>` : ""}${state.showEnglish ? `<p>${target.english}</p>` : ""}</section>`;
    activityList.querySelector("[data-world-nature-play]")?.addEventListener("click", () => { if (state.tapAudioEnabled) speak(target.audio, 0.72); });
  }

  function ensureWeatherDressPractice() {
    if (!state.worldWeatherDressRoundIds?.length || state.worldWeatherDressRoundIds.length !== weatherDressRounds.length) {
      state.worldWeatherDressRoundIds = shuffled(weatherDressRounds.map((round) => round.id));
      state.worldWeatherDressRoundIndex = 0;
      state.worldWeatherDressPickedId = "";
      state.worldWeatherDressResult = "";
    }
  }

  function currentWeatherDressRound() {
    ensureWeatherDressPractice();
    const id = state.worldWeatherDressRoundIds[state.worldWeatherDressRoundIndex];
    return weatherDressRounds.find((round) => round.id === id) ?? weatherDressRounds[0];
  }

  function ensureWeatherFillPractice() {
    if (!state.worldWeatherFillRoundIds?.length || state.worldWeatherFillRoundIds.length !== weatherFillRounds.length) {
      state.worldWeatherFillRoundIds = shuffled(weatherFillRounds.map((round) => round.id));
      state.worldWeatherFillRoundIndex = 0;
      state.worldWeatherFillWeatherPicked = "";
      state.worldWeatherFillTemperaturePicked = "";
      state.worldWeatherFillWeatherResult = "";
      state.worldWeatherFillTemperatureResult = "";
    }
  }

  function currentWeatherFillRound() {
    ensureWeatherFillPractice();
    const id = state.worldWeatherFillRoundIds[state.worldWeatherFillRoundIndex];
    return weatherFillRounds.find((round) => round.id === id) ?? weatherFillRounds[0];
  }

  function renderWeatherPractice() {
    const round = currentWeatherDressRound();
    const choices = shuffled(weatherDressChoices);
    const selectedChoice = weatherDressChoices.find((choice) => choice.id === state.worldWeatherDressPickedId);
    const fillRound = currentWeatherFillRound();
    const weatherChoices = shuffled(weatherFillWeatherChoices);
    const temperatureChoices = shuffled(["冷", "热"]);
    const fillComplete = state.worldWeatherFillWeatherResult === "correct" && state.worldWeatherFillTemperatureResult === "correct";
    const chosenTemperature = weatherFillTemperatureData[state.worldWeatherFillTemperaturePicked] ?? weatherFillTemperatureData[fillRound.temperature];
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Listen to today’s weather, then choose the one thing that helps the child get ready.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="practice-split-card weather-dress-practice">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Get ready for the weather</p><h4>${round.prompt}</h4>${state.showPinyin ? `<p class="numbers-game-pinyin">${round.promptPinyin}</p>` : ""}${state.showEnglish ? `<p class="numbers-game-english">${round.promptEnglish}</p>` : ""}</div><button class="small-button is-play-button" type="button" data-weather-dress-play>Play</button></div>
        <div class="weather-dress-options">${choices.map((choice) => { const selected = selectedChoice?.id === choice.id; const stateClass = selected ? ` is-${state.worldWeatherDressResult}` : ""; return `<button class="weather-dress-option${stateClass}" type="button" data-weather-dress-choice="${choice.id}" aria-label="${choice.hanzi}"><img src="${choice.imagePath}" alt="${choice.imageAlt}" />${selected ? `<span class="answer-result-mark" aria-hidden="true">${state.worldWeatherDressResult === "correct" ? "✓" : "×"}</span>` : ""}</button>`; }).join("")}</div>
        ${state.worldWeatherDressPickedId ? `<div class="weather-dress-feedback ${state.worldWeatherDressResult === "correct" ? "is-correct" : "is-wrong"}"><p>${state.worldWeatherDressResult === "correct" ? round.answerSentence : "再听一听，想想天气和用品。"}</p>${state.worldWeatherDressResult === "correct" && state.showPinyin ? `<p class="numbers-game-pinyin">${round.answerPinyin}</p>` : ""}${state.worldWeatherDressResult === "correct" && state.showEnglish ? `<p>${round.answerEnglish}</p>` : ""}</div>` : ""}
      </section>
      <section class="practice-split-card weather-fill-practice">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Fill in the weather</p><h4>看一看，填一填。</h4>${state.showEnglish ? '<p class="numbers-game-english">Choose a weather phrase and cold or hot.</p>' : ""}</div><button class="small-button is-play-button" type="button" data-weather-fill-play>Play</button></div>
        <div><p class="weather-fill-sentence">今天<span class="weather-fill-blank${state.worldWeatherFillWeatherResult ? ` is-${state.worldWeatherFillWeatherResult}` : ""}">${state.worldWeatherFillWeatherPicked || "____"}</span>，很<span class="weather-fill-blank${state.worldWeatherFillTemperatureResult ? ` is-${state.worldWeatherFillTemperatureResult}` : ""}">${state.worldWeatherFillTemperaturePicked || "____"}</span>，${fillRound.clothing}<span class="weather-fill-icon"><img src="${fillRound.imagePath}" alt="${fillRound.imageAlt}" /></span>。</p>${state.showPinyin && fillComplete ? `<p class="numbers-game-pinyin">jīn tiān ${fillRound.weatherPinyin}, hěn ${chosenTemperature.pinyin}, ${fillRound.clothingPinyin}.</p>` : ""}${state.showEnglish && fillComplete ? `<p class="numbers-game-english">Today ${fillRound.weatherEnglish}, very ${chosenTemperature.english}. ${fillRound.clothingEnglish}</p>` : ""}</div>
        <div class="weather-fill-choice-groups"><div><p class="weather-fill-choice-label">天气</p><div class="weather-fill-options weather-fill-weather-options">${weatherChoices.map((choice) => { const selected = state.worldWeatherFillWeatherPicked === choice; const stateClass = selected ? ` is-${state.worldWeatherFillWeatherResult}` : ""; return `<button class="weather-fill-option${stateClass}" type="button" data-weather-fill-weather="${choice}">${choice}${selected ? `<span class="answer-result-mark" aria-hidden="true">${state.worldWeatherFillWeatherResult === "correct" ? "✓" : "×"}</span>` : ""}</button>`; }).join("")}</div></div><div><p class="weather-fill-choice-label">冷 / 热</p><div class="weather-fill-options">${temperatureChoices.map((choice) => { const selected = state.worldWeatherFillTemperaturePicked === choice; const stateClass = selected ? ` is-${state.worldWeatherFillTemperatureResult}` : ""; return `<button class="weather-fill-option${stateClass}" type="button" data-weather-fill-temperature="${choice}">${choice}${selected ? `<span class="answer-result-mark" aria-hidden="true">${state.worldWeatherFillTemperatureResult === "correct" ? "✓" : "×"}</span>` : ""}</button>`; }).join("")}</div></div></div>
        ${state.worldWeatherFillWeatherResult === "wrong" || state.worldWeatherFillTemperatureResult === "wrong" ? '<p class="weather-fill-feedback">再看一看衣服，想想天气和冷 / 热。</p>' : ""}
      </section>
    `;
    activityList.querySelector("[data-weather-dress-play]")?.addEventListener("click", () => {
      if (state.worldWeatherDressResult === "correct") {
        state.worldWeatherDressRoundIndex = (state.worldWeatherDressRoundIndex + 1) % state.worldWeatherDressRoundIds.length;
        state.worldWeatherDressPickedId = "";
        state.worldWeatherDressResult = "";
        renderActivityPanel(currentTopic());
        const nextRound = currentWeatherDressRound();
        if (state.tapAudioEnabled) speak(nextRound.prompt, 0.76);
        return;
      }
      if (state.tapAudioEnabled) speak(round.prompt, 0.76);
    });
    activityList.querySelectorAll("[data-weather-dress-choice]").forEach((button) => button.addEventListener("click", () => {
      state.worldWeatherDressPickedId = button.dataset.weatherDressChoice;
      state.worldWeatherDressResult = state.worldWeatherDressPickedId === round.answerId ? "correct" : "wrong";
      if (state.worldWeatherDressResult === "correct") {
        if (state.tapAudioEnabled) speak(round.answerAudio, 0.76);
      }
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelector("[data-weather-fill-play]")?.addEventListener("click", () => {
      if (fillComplete) {
        state.worldWeatherFillRoundIndex = (state.worldWeatherFillRoundIndex + 1) % state.worldWeatherFillRoundIds.length;
        state.worldWeatherFillWeatherPicked = "";
        state.worldWeatherFillTemperaturePicked = "";
        state.worldWeatherFillWeatherResult = "";
        state.worldWeatherFillTemperatureResult = "";
        renderActivityPanel(currentTopic());
        const nextRound = currentWeatherFillRound();
        return;
      }
    });
    activityList.querySelectorAll("[data-weather-fill-weather]").forEach((button) => button.addEventListener("click", () => {
      state.worldWeatherFillWeatherPicked = button.dataset.weatherFillWeather;
      state.worldWeatherFillWeatherResult = state.worldWeatherFillWeatherPicked === fillRound.weather ? "correct" : "wrong";
      if (state.worldWeatherFillWeatherResult === "correct" && state.tapAudioEnabled) speak(fillRound.weather, 0.76);
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-weather-fill-temperature]").forEach((button) => button.addEventListener("click", () => {
      state.worldWeatherFillTemperaturePicked = button.dataset.weatherFillTemperature;
      state.worldWeatherFillTemperatureResult = (fillRound.temperatures ?? [fillRound.temperature]).includes(state.worldWeatherFillTemperaturePicked) ? "correct" : "wrong";
      if (state.worldWeatherFillTemperatureResult === "correct" && state.tapAudioEnabled) speak(fillRound.temperature, 0.76);
      renderActivityPanel(currentTopic());
    }));
  }

  function renderWorldPractice(topic) {
    if (topic.id === "colours") return renderColourPractice();
    if (topic.id === "nature") return renderNaturePractice();
    if (topic.id === "weather") return renderWeatherPractice();
  }

  return { focusItemsForTopic, renderWorldExplorer, renderWorldPractice };
}
