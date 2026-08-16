import { colourLessons } from "./colours.js";
import { animalLessons } from "./animals.js";
import { natureLesson, weatherLesson } from "./weather.js";
import { imageLoadingAttrs } from "../../core/image-loading.js";
import { advanceShuffledOrder, nextRandomCycleId } from "../../core/random-cycle.js";

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

const natureFillRounds = [
  { id: "sun", subject: "白天", word: "太阳", pinyin: "bái tiān yǒu tài yáng", english: "There is a sun in the daytime." },
  { id: "moon", subject: "晚上", word: "月亮", pinyin: "wǎn shang yǒu yuè liang", english: "There is a moon at night." },
  { id: "star", subject: "晚上", word: "星星", pinyin: "wǎn shang yǒu xīng xing", english: "There are stars at night." },
  { id: "tree", subject: "地上", word: "树", pinyin: "dì shàng yǒu shù", english: "There is a tree on the ground." },
  { id: "flower", subject: "地上", word: "花", pinyin: "dì shàng yǒu huā", english: "There are flowers on the ground." },
  { id: "grass", subject: "地上", word: "草", pinyin: "dì shàng yǒu cǎo", english: "There is grass on the ground." }
];

const animalMeasureRounds = [
  { id: "tiger", number: "一", measure: "只", animal: "老虎", pinyin: "yì zhī lǎo hǔ", english: "one tiger", imagePath: "assets/illustrated-animals/tiger.webp", imageAlt: "A tiger" },
  { id: "elephant", number: "两", measure: "头", animal: "大象", pinyin: "liǎng tóu dà xiàng", english: "two elephants", imagePath: "assets/illustrated-animals/elephant.webp", imageAlt: "An elephant" },
  { id: "panda", number: "三", measure: "只", animal: "熊猫", pinyin: "sān zhī xióng māo", english: "three pandas", imagePath: "assets/illustrated-animals/panda.webp", imageAlt: "A panda" },
  { id: "goldfish", number: "七", measure: "条", animal: "金鱼", pinyin: "qī tiáo jīn yú", english: "seven goldfish", imagePath: "assets/illustrated-animals/goldfish.webp", imageAlt: "A goldfish" },
  { id: "turtle", number: "六", measure: "只", animal: "乌龟", pinyin: "liù zhī wū guī", english: "six turtles", imagePath: "assets/illustrated-animals/turtle.webp", imageAlt: "A turtle" }
];

function natureIconMarkup(id) {
  const start = '<svg viewBox="0 0 96 72" aria-hidden="true" focusable="false">';
  const end = "</svg>";
  const stroke = '#3f5844';
  if (id === "daytime" || id === "sun") return `${start}<circle cx="48" cy="36" r="15" fill="#f5c64a" stroke="${stroke}" stroke-width="3"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => `<path d="M48 12v-7" transform="rotate(${angle} 48 36)" stroke="#e5a832" stroke-width="3" stroke-linecap="round"/>`).join("")}${end}`;
  if (id === "nighttime") return `${start}<rect x="10" y="9" width="76" height="54" rx="12" fill="#172f55" stroke="#244570" stroke-width="3"/><path d="M56 18c-13 3-16 21-2 28 6 3 13 2 18-3-11 2-19-9-15-19 1-3 1-5-1-6Z" fill="#f6e6a3"/><circle cx="28" cy="25" r="2.5" fill="#f8d861"/><circle cx="33" cy="46" r="2" fill="#f8d861"/><circle cx="70" cy="30" r="2.5" fill="#f8d861"/>${end}`;
  if (id === "moon") return `${start}<path d="M56 16c-17 4-20 28-3 37 7 4 17 3 23-3-15 3-26-12-20-26 1-4 2-6 0-8Z" fill="#f6e6a3" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>${end}`;
  if (id === "star") return `${start}<path d="m48 10 7 19 20 1-16 12 5 20-16-11-17 11 6-20-17-12 21-1Z" fill="#f7d25a" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>${end}`;
  if (id === "sky") return `${start}<path d="M10 54V16h76v38Z" fill="#a9ddf3"/><path d="M10 54h76" stroke="#77b7d3" stroke-width="4"/><path d="M18 28c4-9 15-8 18 0 8-7 19-1 18 7H18c-6-1-5-6 0-7Z" fill="#fff" stroke="#7aa4bb" stroke-width="2"/>${end}`;
  if (id === "ground") return `${start}<path d="M8 39c13-7 24 3 38-2 15-6 26 3 42-2v10H8Z" fill="#79b65b"/><path d="M8 48h80v15H8Z" fill="#bb8659" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/><path d="M17 55h10m11-4h13m12 6h13" stroke="#936441" stroke-width="3" stroke-linecap="round"/>${end}`;
  if (id === "tree") return `${start}<path d="M45 60h10l-3-23h-4Z" fill="#9a6a43" stroke="${stroke}" stroke-width="3"/><path d="M22 37c0-14 13-22 25-15 10-10 30-1 26 14 10 9 1 23-11 20H30c-11 0-16-12-8-19Z" fill="#72b65c" stroke="${stroke}" stroke-width="3"/>${end}`;
  if (id === "flower") return `${start}<path d="M48 60V38" stroke="#5b994f" stroke-width="4" stroke-linecap="round"/><path d="M48 50c-9-8-13-1-12 4 6 0 10-1 12-4Zm0-6c8-8 13-1 12 4-6 0-10-1-12-4Z" fill="#73b85e"/><circle cx="48" cy="29" r="7" fill="#f1bf43"/>${[0,72,144,216,288].map((angle) => `<ellipse cx="48" cy="19" rx="6" ry="10" fill="#e8786d" stroke="${stroke}" stroke-width="2" transform="rotate(${angle} 48 29)"/>`).join("")}${end}`;
  return `${start}<path d="M12 60h72" stroke="#9bc774" stroke-width="4" stroke-linecap="round"/><path d="M26 60V31m0 18-10-12m10 7 9-13M48 60V23m0 24-11-14m11 8 10-15M69 60V34m0 15-8-10m8 6 9-12" stroke="#4c8b49" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${end}`;
}

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
    if (topic.id === "pets") return animalLessons["1b"];
    if (topic.id === "animals") return animalLessons["2b"];
    if (topic.id === "nature") return natureLesson;
    if (topic.id === "weather") return weatherLesson;
    return null;
  }

  function focusItemsForTopic(topic) {
    if (["pets", "animals", "colours", "nature", "weather"].includes(topic.id)) return lessonForCurrentBook()?.items ?? topic.focusItems;
    return topic.focusItems;
  }

  function worldSceneCardMarkup(scene, { playAttribute, index, compact = false, extraClass = "" }) {
    return `<section class="greetings-exchange school-scene-card${extraClass ? ` ${extraClass}` : ""}"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.title}</p></div><button class="small-button is-play-button" type="button" ${playAttribute}="${index}">Play</button></div><div class="school-scene-layout${compact ? " is-compact" : ""}"><img class="school-scene-image${scene.imageClass ? ` ${scene.imageClass}` : ""}" src="${scene.imagePath}" alt="${scene.imageAlt}" ${imageLoadingAttrs({ primary: index === 0 })} /><div class="greetings-line-stack">${scene.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi${line.className ? ` ${line.className}` : ""}">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div></section>`;
  }

  function renderWorldExplorer() {
    const lesson = lessonForCurrentBook();
    if (!lesson) return;
    if (["pets", "animals"].includes(currentTopic().id)) return renderAnimalsExplorer(lesson);
    if (lesson === weatherLesson) return renderWeatherExplorer();
    if (lesson === natureLesson) return renderNatureExplorer();
    const hasScene = Boolean(lesson.imagePath);
    focusExplorer.innerHTML = `
      <div class="time-date-board world-lesson-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${lesson.title}</h4><p>${lesson.summary}</p></div>
        ${hasScene ? `<section class="world-scene-card"><img src="${lesson.imagePath}" alt="${lesson.imageAlt}" /><div>${lesson.sentences.map((line) => `<button class="small-button is-action-button" type="button" data-world-sentence="${line.audio}">${line.hanzi}</button>`).join("")}</div></section>` : ""}
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        <div class="time-asset-grid world-asset-grid">
          ${lesson.items.map((item) => `<button class="time-asset-card book-word-card" type="button" data-world-item="${item.id}">${item.imagePath ? `<img class="book-word-image" src="${item.imagePath}" alt="${item.imageAlt}" />` : ""}<span class="book-word-copy"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}${item.phrase ? `<span class="time-asset-context">${item.phrase}</span>` : ""}</span></button>`).join("")}
        </div>
      </div>
    `;
    focusExplorer.querySelectorAll("[data-world-item]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.worldItem, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-world-sentence]").forEach((button) => button.addEventListener("click", () => { if (state.tapAudioEnabled) speak(button.dataset.worldSentence, 0.72); }));
  }

  function renderAnimalsExplorer(lesson) {
    focusExplorer.innerHTML = `
      <div class="time-date-board school-topic-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${lesson.title}</h4><p>${lesson.summary}</p></div>
        <section class="school-lesson-section is-animals"><div class="school-scene-grid is-single">${lesson.scenes.map((scene, index) => worldSceneCardMarkup(scene, { playAttribute: "data-animals-scene", index, compact: true, extraClass: "animals-scene-card" })).join("")}</div></section>
        <section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="time-asset-grid world-asset-grid animal-word-grid">${lesson.items.map((item) => `<button class="time-asset-card book-word-card" type="button" data-world-item="${item.id}" aria-label="${item.hanzi}，${item.pinyin}，${item.english}"><img class="book-word-image" src="${item.imagePath}" alt="${item.imageAlt}"><span class="book-word-copy"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></section>
        ${lesson.foodStory ? `<section class="school-lesson-section pet-food-story"><div class="time-months-heading"><p class="body-match-kicker">Pet story</p></div><div class="pet-food-story-grid">${lesson.foodStory.map((story) => `<button class="pet-food-story-card" type="button" data-pet-food-story="${story.id}"><span class="pet-food-story-pair"><img src="${story.animalImagePath}" alt="${story.animalImageAlt}"><span aria-hidden="true">→</span><img src="${story.foodImagePath}" alt="${story.foodImageAlt}"></span><span class="pet-food-story-copy"><span class="time-asset-context">${story.hanzi}</span>${state.showPinyin ? `<span class="time-asset-context-pinyin">${story.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-context-english">${story.english}</span>` : ""}</span></button>`).join("")}</div></section>` : ""}
        ${lesson.usefulNote ? `<section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful note</p><div class="visual-topic-note-grid school-review-grid"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${lesson.usefulNote.hanzi}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${lesson.usefulNote.pinyin}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${lesson.usefulNote.english}</p>` : ""}</article></div></section>` : ""}
      </div>
    `;
    focusExplorer.querySelectorAll("[data-world-item]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.worldItem, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-animals-scene]").forEach((button) => button.addEventListener("click", () => {
      const scene = lesson.scenes[Number(button.dataset.animalsScene)];
      if (scene && state.tapAudioEnabled) speak(scene.lines.map((line) => line.audio).join("，"), 0.74);
    }));
    focusExplorer.querySelectorAll("[data-pet-food-story]").forEach((button) => button.addEventListener("click", () => {
      const story = lesson.foodStory?.find((entry) => entry.id === button.dataset.petFoodStory);
      if (story && state.tapAudioEnabled) speak(story.audio, 0.74);
    }));
  }

  function renderWeatherExplorer() {
    const scenes = weatherLesson.scenes;
    focusExplorer.innerHTML = `
      <div class="time-date-board school-topic-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${weatherLesson.title}</h4><p>${weatherLesson.summary}</p></div>
        <section class="school-lesson-section is-weather"><div class="school-scene-grid weather-scene-grid">${scenes.map((scene, index) => worldSceneCardMarkup(scene, { playAttribute: "data-weather-scene", index })).join("")}</div></section>
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
      if (scene && state.tapAudioEnabled) speak(scene.lines.map((line) => line.audio).join("，"), 0.74);
    }));
  }

  function renderNatureExplorer() {
    focusExplorer.innerHTML = `
      <div class="time-date-board school-topic-board">
        <div class="numbers-stage-card"><p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p><h4>${natureLesson.title}</h4><p>${natureLesson.summary}</p></div>
        <section class="school-lesson-section is-nature"><div class="school-scene-grid is-single">${natureLesson.scenes.map((scene, index) => worldSceneCardMarkup({ ...scene, imageClass: "nature-scene-image" }, { playAttribute: "data-nature-scene", index, compact: true, extraClass: "nature-scene-card" }))}</div></section>
        <section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="time-asset-grid world-asset-grid nature-word-grid">${natureLesson.items.map((item) => `<button class="time-asset-card nature-word-card" type="button" data-world-item="${item.id}" aria-label="${item.hanzi}，${item.pinyin}，${item.english}"><span class="nature-word-row" style="display:flex; width:100%; align-items:center; gap:0.9rem; text-align:left;"><span class="nature-word-icon" style="flex:0 0 4.5rem;">${natureIconMarkup(item.id)}</span><span class="nature-word-copy" style="display:flex; flex:1 1 auto; flex-direction:column; align-items:flex-start; justify-content:center; gap:0.16rem;"><span class="time-asset-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</span></span></button>`).join("")}</div></section>
        <section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${natureLesson.usefulNote.hanzi}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${natureLesson.usefulNote.pinyin}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${natureLesson.usefulNote.english}</p>` : ""}</article></div></section>
      </div>
    `;
    focusExplorer.querySelectorAll("[data-world-item]").forEach((button) => button.addEventListener("click", () => selectFocusItem(button.dataset.worldItem, { playAudio: true })));
    focusExplorer.querySelectorAll("[data-nature-scene]").forEach((button) => button.addEventListener("click", () => {
      const scene = natureLesson.scenes[Number(button.dataset.natureScene)];
      if (scene && state.tapAudioEnabled) speak(scene.lines.map((line) => line.audio).join("，"), 0.74);
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

  function shuffledWithoutAlignedPairs(items, oppositeOrder) {
    let order = shuffled(items);
    let attempts = 0;
    while (order.some((id, index) => id === oppositeOrder[index]) && attempts < 12) {
      order = shuffled(items);
      attempts += 1;
    }
    return order.some((id, index) => id === oppositeOrder[index])
      ? [...oppositeOrder.slice(1), oppositeOrder[0]]
      : order;
  }

  function renderAnimalsPractice() {
    if (currentTopic().id === "pets") return renderPetsPractice();
    return renderZooSentencePractice();
  }

  function petSentenceFeedback(sentence) {
    return `<div class="pets-practice-feedback"><p class="numbers-game-hanzi">${sentence.hanzi}</p>${state.showPinyin ? `<p class="numbers-game-pinyin">${sentence.pinyin}</p>` : ""}${state.showEnglish ? `<p class="numbers-game-english">${sentence.english}</p>` : ""}</div>`;
  }

  function ensurePetFoodMatch() {
    const stories = animalLessons["1b"].foodStory;
    if (state.petFoodMatchOrder?.length === stories.length) return;
    state.petFoodMatchOrder = shuffled(stories.map((story) => story.id));
    state.petFoodFoodOrder = shuffledWithoutAlignedPairs(stories.map((story) => story.id), state.petFoodMatchOrder);
    state.petFoodMatchAnimalId = "";
    state.petFoodMatchedIds = [];
    state.petFoodWrongAnimalId = "";
    state.petFoodWrongFoodId = "";
  }

  function petFoodMatchCard(story, side) {
    const isAnimal = side === "animal";
    if (isAnimal) return `<span class="numbers-game-hanzi">${story.animalHanzi}</span>`;
    return `<span class="pet-food-match-meaning"><img src="${story.foodImagePath}" alt="${story.foodImageAlt}"><span class="pet-food-match-copy"><span class="match-answer-label">${story.foodHanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${story.foodPinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${story.foodEnglish}</span>` : ""}</span></span>`;
  }

  function renderPetFoodMatch(stories) {
    const matchedIds = new Set(state.petFoodMatchedIds);
    const solvedIds = state.petFoodMatchOrder.filter((id) => matchedIds.has(id));
    const remainingAnimalIds = state.petFoodMatchOrder.filter((id) => !matchedIds.has(id));
    const remainingFoodIds = state.petFoodFoodOrder.filter((id) => !matchedIds.has(id));
    const storyFor = (id) => stories.find((story) => story.id === id);
    const feedback = state.petFoodWrongFoodId
      ? "Try again. Which food does that animal eat?"
      : solvedIds.length === stories.length ? "都配对了！" : "";

    return `<section class="practice-split-card pet-food-match-practice"><div class="numbers-game-top"><div><p class="body-match-kicker">Match the pairs</p><p class="numbers-game-note">Tap an animal on the left, then tap the food it eats on the right.</p></div><button class="small-button is-play-button" type="button" data-pet-food-match-new>Play</button></div>${feedback ? `<div class="greetings-game-feedback">${feedback}</div>` : ""}<div class="family-match-board-headings"><p class="body-match-kicker">Animal</p><p class="body-match-kicker">Food</p></div>${solvedIds.length ? `<div class="family-match-solved-pairs">${solvedIds.map((id) => { const story = storyFor(id); return `<article class="family-match-solved-row"><div class="polite-match-card polite-match-card-phrase family-match-pair-card is-solved"><span class="answer-result-mark" aria-hidden="true">✓</span>${petFoodMatchCard(story, "animal")}</div><div class="polite-match-card polite-match-card-meaning family-match-pair-card is-solved"><span class="answer-result-mark" aria-hidden="true">✓</span>${petFoodMatchCard(story, "food")}</div></article>`; }).join("")}</div>` : ""}${remainingAnimalIds.length ? `<div class="polite-match-board family-match-open-board"><div class="polite-match-column">${remainingAnimalIds.map((id) => { const story = storyFor(id); const selected = state.petFoodMatchAnimalId === id; const wrong = state.petFoodWrongAnimalId === id; return `<button class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}${wrong ? " is-wrong" : ""}" type="button" data-pet-food-match-animal="${id}">${wrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}${petFoodMatchCard(story, "animal")}</button>`; }).join("")}</div><div class="polite-match-column">${remainingFoodIds.map((id) => { const story = storyFor(id); const wrong = state.petFoodWrongFoodId === id; return `<button class="polite-match-card polite-match-card-meaning${wrong ? " is-wrong" : ""}" type="button" data-pet-food-match-food="${id}">${wrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}${petFoodMatchCard(story, "food")}</button>`; }).join("")}</div></div>` : ""}${solvedIds.length === stories.length ? '<button class="small-button is-play-button" type="button" data-pet-food-match-new>Play</button>' : ""}</section>`;
  }

  function renderPetsPractice() {
    const stories = animalLessons["1b"].foodStory;
    const preferenceChoices = [
      ...animalLessons["1b"].items,
      ...stories.filter((story) => !["dog-bone", "cat-fish"].includes(story.id)).map((story) => ({
        id: story.id,
        hanzi: story.animalHanzi,
        pinyin: story.animalPinyin,
        english: story.animalEnglish,
        imagePath: story.animalImagePath,
        imageAlt: story.animalImageAlt
      }))
    ];
    const selectedPet = preferenceChoices.find((choice) => choice.id === state.petsPreferencePickedId);
    const preference = selectedPet
      ? { hanzi: `我喜欢${selectedPet.hanzi}。`, pinyin: `Wǒ xǐ huan ${selectedPet.pinyin}.`, english: `I like ${selectedPet.english}.`, audio: `我喜欢${selectedPet.hanzi}` }
      : null;
    ensurePetFoodMatch();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build a sentence about a pet you like, then match animals to their food.";
    activityList.className = "support-list pets-practice-list";
    activityList.innerHTML = `<section class="practice-split-card pets-sentence-practice"><div class="numbers-game-top"><div><p class="body-match-kicker">Build a sentence</p><p class="numbers-game-note">Choose an animal to build a sentence. It will read itself aloud.</p></div><button class="small-button is-play-button" type="button" data-pets-preference-play>Play</button></div><p class="pets-sentence-prompt">我喜欢<span class="animals-measure-blank is-${selectedPet ? "correct" : "empty"}">${selectedPet?.hanzi || "____"}</span>。</p><div class="numbers-game-options">${preferenceChoices.map((choice) => { const selected = state.petsPreferencePickedId === choice.id; return `<button class="numbers-game-option greetings-game-option family-listen-option pets-sentence-choice${selected ? " is-correct" : ""}" type="button" data-pets-preference-choice="${choice.id}"><img src="${choice.imagePath}" alt="${choice.imageAlt}"><span><span class="numbers-game-hanzi">${choice.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${choice.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${choice.english}</span>` : ""}</span>${selected ? '<span class="answer-result-mark" aria-hidden="true">✓</span>' : ""}</button>`; }).join("")}</div>${preference ? petSentenceFeedback(preference) : ""}</section>${renderPetFoodMatch(stories)}`;
    activityList.querySelector("[data-pets-preference-play]")?.addEventListener("click", () => {
      state.petsPreferencePickedId = "";
      renderActivityPanel(currentTopic());
    });
    activityList.querySelectorAll("[data-pets-preference-choice]").forEach((button) => button.addEventListener("click", () => {
      state.petsPreferencePickedId = button.dataset.petsPreferenceChoice;
      const choice = preferenceChoices.find((entry) => entry.id === state.petsPreferencePickedId);
      if (choice && state.tapAudioEnabled) speak(`我喜欢${choice.hanzi}`, 0.78);
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-pet-food-match-animal]").forEach((button) => button.addEventListener("click", () => {
      state.petFoodMatchAnimalId = button.dataset.petFoodMatchAnimal;
      state.petFoodWrongAnimalId = "";
      state.petFoodWrongFoodId = "";
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-pet-food-match-food]").forEach((button) => button.addEventListener("click", () => {
      const foodId = button.dataset.petFoodMatchFood;
      if (!state.petFoodMatchAnimalId) return;
      if (state.petFoodMatchAnimalId === foodId) {
        state.petFoodMatchedIds = [...state.petFoodMatchedIds, foodId];
        if (state.tapAudioEnabled) speak(stories.find((story) => story.id === foodId).audio, 0.78);
        state.petFoodMatchAnimalId = "";
        state.petFoodWrongAnimalId = "";
        state.petFoodWrongFoodId = "";
      } else {
        state.petFoodWrongAnimalId = state.petFoodMatchAnimalId;
        state.petFoodWrongFoodId = foodId;
      }
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-pet-food-match-new]").forEach((button) => button.addEventListener("click", () => {
      state.petFoodMatchOrder = [];
      state.petFoodFoodOrder = [];
      ensurePetFoodMatch();
      renderActivityPanel(currentTopic());
    }));
  }

  function renderZooSentencePractice() {
    const selectedRound = animalMeasureRounds.find((round) => round.id === state.zooSentencePickedId);
    const sentence = selectedRound ? `动物园有${selectedRound.number}${selectedRound.measure}${selectedRound.animal}。` : "";
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build zoo sentences with 动物园有… and animal counting phrases.";
    activityList.className = "support-list";
    activityList.innerHTML = `<section class="practice-split-card zoo-sentence-practice"><div class="numbers-game-top"><div><p class="body-match-kicker">Build a sentence</p><p class="numbers-game-note">Choose an animal phrase to build a zoo sentence. It will read itself aloud.</p></div><button class="small-button is-play-button" type="button" data-zoo-sentence-new>Play</button></div><p class="animals-measure-prompt">动物园有<span class="animals-measure-blank is-${selectedRound ? "correct" : "empty"}">${selectedRound ? `${selectedRound.number}${selectedRound.measure}${selectedRound.animal}` : "____"}</span>。</p><div class="numbers-game-options">${animalMeasureRounds.map((round) => { const selected = selectedRound?.id === round.id; return `<button class="numbers-game-option greetings-game-option family-listen-option zoo-sentence-choice${selected ? " is-correct" : ""}" type="button" data-zoo-sentence-choice="${round.id}"><img src="${round.imagePath}" alt="${round.imageAlt}"><span><span class="numbers-game-hanzi">${round.number}${round.measure}${round.animal}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${round.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${round.english}</span>` : ""}</span>${selected ? '<span class="answer-result-mark" aria-hidden="true">✓</span>' : ""}</button>`; }).join("")}</div>${selectedRound ? `<div class="animals-measure-feedback"><p class="numbers-game-hanzi">${sentence}</p>${state.showPinyin ? `<p class="numbers-game-pinyin">Dòng wù yuán yǒu ${selectedRound.pinyin}.</p>` : ""}${state.showEnglish ? `<p class="numbers-game-english">There are ${selectedRound.english} in the zoo.</p>` : ""}</div>` : ""}</section>`;
    activityList.querySelector("[data-zoo-sentence-new]")?.addEventListener("click", () => {
      state.zooSentencePickedId = "";
      renderActivityPanel(currentTopic());
    });
    activityList.querySelectorAll("[data-zoo-sentence-choice]").forEach((button) => button.addEventListener("click", () => {
      state.zooSentencePickedId = button.dataset.zooSentenceChoice;
      const round = animalMeasureRounds.find((entry) => entry.id === state.zooSentencePickedId);
      if (round && state.tapAudioEnabled) speak(`动物园有${round.number}${round.measure}${round.animal}`, 0.78);
      renderActivityPanel(currentTopic());
    }));
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
    const targetObjectId = nextRandomCycleId(state, "colours-mission-target", colourMissionObjects.map((object) => object.id));
    const targetObject = colourMissionObjects.find((object) => object.id === targetObjectId);
    const objects = shuffled([
      targetObject,
      ...shuffled(colourMissionObjects.filter((object) => object.id !== targetObjectId)).slice(0, 5)
    ].filter(Boolean));
    const colours = shuffled(colourItems).slice(0, 6);
    state.worldColourMissionCards = shuffled(objects.map((object, index) => ({ objectId: object.id, colourId: colours[index].id })));
    state.worldColourMissionTargetObjectId = targetObjectId;
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
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture and phrase</p><p class="numbers-game-note">Look at the picture. Which complete Chinese phrase matches it?</p></div><button class="small-button is-practice-advance-button" type="button" data-world-colour-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual"><img class="clothes-quiz-image" src="${target.imagePath}" alt="${target.imageAlt}" /></figure>
        <div class="clothes-quiz-options">${choices.map((item) => { const selected = state.worldColourPickedId === item.id; const resultClass = selected ? ` is-${state.worldColourResult}` : ""; const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${state.worldColourResult === "correct" ? "✓" : "×"}</span>` : ""; return `<button class="clothes-quiz-option${resultClass}" type="button" data-world-colour-guess="${item.id}">${mark}<span class="numbers-game-hanzi">${item.phrase}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.phrasePinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.phraseEnglish}</span>` : ""}</button>`; }).join("")}</div>
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
    activityList.querySelector("[data-world-colour-new]")?.addEventListener("click", () => {
      advanceShuffledOrder(state, "worldColourRoundIds", "worldColourRoundIndex", shuffled);
      state.worldColourPickedId = "";
      state.worldColourResult = "";
      renderActivityPanel(currentTopic());
    });
    activityList.querySelectorAll("[data-world-colour-guess]").forEach((button) => button.addEventListener("click", () => {
      state.worldColourPickedId = button.dataset.worldColourGuess;
      state.worldColourResult = button.dataset.worldColourGuess === target.id ? "correct" : "wrong";
      if (state.worldColourResult === "correct" && state.tapAudioEnabled) speak(target.phrase, 0.78);
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-world-favourite]").forEach((button) => button.addEventListener("click", () => {
      state.worldFavouriteColourId = button.dataset.worldFavourite;
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelector("[data-world-favourite-play]")?.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(`我喜欢${favourite.hanzi}`, 0.78);
    });
    activityList.querySelectorAll("[data-world-say]").forEach((button) => button.addEventListener("click", () => { if (state.tapAudioEnabled) speak(button.dataset.worldSay, 0.78); }));
  }

  function ensureNatureFillPractice() {
    if (!state.worldNatureFillRoundIds?.length || state.worldNatureFillRoundIds.length !== natureFillRounds.length) {
      state.worldNatureFillRoundIds = shuffled(natureFillRounds.map((round) => round.id));
      state.worldNatureFillRoundIndex = 0;
      resetNatureFillChoices();
    }
  }

  function resetNatureFillChoices() {
    state.worldNatureFillSubjectChoices = shuffled(["白天", "晚上", "地上"]);
    state.worldNatureFillWordChoices = shuffled(natureFillRounds.map((round) => round.word));
    state.worldNatureFillSubjectPicked = "";
    state.worldNatureFillWordPicked = "";
    state.worldNatureFillSubjectResult = "";
    state.worldNatureFillWordResult = "";
  }

  function currentNatureFillRound() {
    ensureNatureFillPractice();
    const id = state.worldNatureFillRoundIds[state.worldNatureFillRoundIndex];
    return natureFillRounds.find((item) => item.id === id) ?? natureFillRounds[0];
  }

  function renderNaturePractice() {
    const round = currentNatureFillRound();
    const complete = state.worldNatureFillSubjectResult === "correct" && state.worldNatureFillWordResult === "correct";
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the picture and complete the sentence with the right words.";
    activityList.className = "support-list";
    activityList.innerHTML = `<section class="practice-split-card nature-fill-practice"><div class="numbers-game-top"><div><p class="body-match-kicker">Look and complete</p><p class="numbers-game-note">Choose the two words that make the sentence match the picture.</p></div><button class="small-button is-play-button" type="button" data-nature-fill-play>Play</button></div><p class="nature-fill-sentence"><span class="weather-fill-blank${state.worldNatureFillSubjectResult ? ` is-${state.worldNatureFillSubjectResult}` : ""}">${state.worldNatureFillSubjectPicked || "____"}</span>有<span class="weather-fill-blank${state.worldNatureFillWordResult ? ` is-${state.worldNatureFillWordResult}` : ""}">${state.worldNatureFillWordPicked || "____"}</span><span class="nature-fill-inline-icon">${natureIconMarkup(round.id)}</span>。</p>${complete && state.showPinyin ? `<p class="numbers-game-pinyin">${round.pinyin}</p>` : ""}${complete && state.showEnglish ? `<p class="numbers-game-english">${round.english}</p>` : ""}<div class="weather-fill-choice-groups"><div><p class="weather-fill-choice-label">第一个词</p><div class="weather-fill-options">${state.worldNatureFillSubjectChoices.map((choice) => `<button class="weather-fill-option${state.worldNatureFillSubjectPicked === choice ? ` is-${state.worldNatureFillSubjectResult}` : ""}" type="button" data-nature-fill-subject="${choice}">${choice}</button>`).join("")}</div></div><div><p class="weather-fill-choice-label">有什么？</p><div class="weather-fill-options">${state.worldNatureFillWordChoices.map((choice) => `<button class="weather-fill-option${state.worldNatureFillWordPicked === choice ? ` is-${state.worldNatureFillWordResult}` : ""}" type="button" data-nature-fill-word="${choice}">${choice}</button>`).join("")}</div></div></div>${state.worldNatureFillSubjectResult === "wrong" || state.worldNatureFillWordResult === "wrong" ? '<p class="weather-fill-feedback">再看看图，想想句子的第一个词和有什么。</p>' : ""}</section>`;
    activityList.querySelector("[data-nature-fill-play]")?.addEventListener("click", () => {
      if (complete) {
        advanceShuffledOrder(state, "worldNatureFillRoundIds", "worldNatureFillRoundIndex", shuffled);
        resetNatureFillChoices();
        renderActivityPanel(currentTopic());
        return;
      }
      if (state.tapAudioEnabled) speak(round.word, 0.76);
    });
    activityList.querySelectorAll("[data-nature-fill-subject]").forEach((button) => button.addEventListener("click", () => {
      state.worldNatureFillSubjectPicked = button.dataset.natureFillSubject;
      state.worldNatureFillSubjectResult = state.worldNatureFillSubjectPicked === round.subject ? "correct" : "wrong";
      if (state.worldNatureFillSubjectResult === "correct" && state.tapAudioEnabled) speak(round.subject, 0.76);
      renderActivityPanel(currentTopic());
    }));
    activityList.querySelectorAll("[data-nature-fill-word]").forEach((button) => button.addEventListener("click", () => {
      state.worldNatureFillWordPicked = button.dataset.natureFillWord;
      state.worldNatureFillWordResult = state.worldNatureFillWordPicked === round.word ? "correct" : "wrong";
      const nowComplete = state.worldNatureFillSubjectResult === "correct" && state.worldNatureFillWordResult === "correct";
      if (nowComplete && state.tapAudioEnabled) speak(`${round.subject}有${round.word}`, 0.76);
      renderActivityPanel(currentTopic());
    }));
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
        advanceShuffledOrder(state, "worldWeatherDressRoundIds", "worldWeatherDressRoundIndex", shuffled);
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
        advanceShuffledOrder(state, "worldWeatherFillRoundIds", "worldWeatherFillRoundIndex", shuffled);
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
    if (topic.id === "pets") return renderAnimalsPractice();
    if (topic.id === "animals") return renderAnimalsPractice();
    if (topic.id === "colours") return renderColourPractice();
    if (topic.id === "nature") return renderNaturePractice();
    if (topic.id === "weather") return renderWeatherPractice();
  }

  return { focusItemsForTopic, renderWorldExplorer, renderWorldPractice };
}
