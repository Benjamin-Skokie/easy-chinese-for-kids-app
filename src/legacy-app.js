import { createAudioService } from "./core/audio.js";
import { topicIdFromLocation, topicPageUrl, viewFromLocation } from "./core/router.js";
import { timeDateWeekItems } from "./features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateExpressionItems, timeDateRoutineItems } from "./features/time-daily-life/time.js";
import { datePracticeItems, timeDateDateItems, timeDateMonthItems } from "./features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonsTopic, comparisonVisualItems, comparisonWordItems } from "./features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionsTopic, positionVisualItems } from "./features/time-daily-life/positions.js";
import { transportSentenceTokens, transportTopic, transportVisualItems } from "./features/time-daily-life/transport.js";
import { dailyLifeTopic, roomScenes, roomSentenceTokens, roomVisualItems } from "./features/time-daily-life/rooms.js";
import { stationeryPictureMatchChoices, stationeryPictureMatchEnglish, stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "./features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "./features/school-life/school-supplies.js";
import { classroomTopicData } from "./features/school-life/classroom.js";
import { schoolSentenceBuilds as schoolLessonSentenceBuilds, schoolTopicData as schoolLessonTopicData } from "./features/school-life/school.js";
import { schoolSubjectsSentenceBuilds as schoolLessonSubjectsSentenceBuilds, schoolSubjectsTopicData } from "./features/school-life/school-subjects.js";
import { createSchoolFoodRuntime } from "./features/school-life/school-food-runtime.js";
import { foodSentenceBuilds, foodTopic, foodTopicData } from "./features/food/food.js";
import { foodPreferencesTopic, foodPreferencesTopicData } from "./features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds as mealsFeelingsLessonSentenceBuilds, mealsFeelingsTopic, mealsFeelingsTopicData } from "./features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "./features/foundations/introductions.js";
import { createIntroductionsController } from "./features/foundations/introductions-controller.js";
import { ageBuildPhrases, agePractice, ageTopic } from "./features/foundations/age.js";
import { createAgeController } from "./features/foundations/age-controller.js";
import { politeGameItemIds, politePractice, politeWordsTopic } from "./features/foundations/polite-words.js";
import { createPoliteWordsController } from "./features/foundations/polite-words-controller.js";
import { greetingsGameItemIds, greetingsPractice, greetingsTopic } from "./features/foundations/greetings.js";
import { createGreetingsController } from "./features/foundations/greetings-controller.js";
import { identityConversation, identityCountries, identityQuestion, identityTopic } from "./features/foundations/identity.js";
import { familyGameItemIds, familyHeadshotsByItemId, familyPersonIdsByItemId, familyPractice, familyTopic, illustratedFamily } from "./features/family/family.js";
import { clothesMatchItems, clothesPractice, clothesTopic } from "./features/daily-life/clothes.js";
import { weatherTopic } from "./features/world/weather.js";
import { animalsTopic } from "./features/world/animals.js";
import { coloursTopic } from "./features/world/colours.js";
import { hobbiesTopic, toysTopic } from "./features/play-hobbies/play-hobbies.js";
import { bodyBonusItemIds, bodyCoreItemIds, bodyDiagramLayout, bodyTopic } from "./features/foundations/body.js";
import { buildNumberItem, multiplicationRhymeTopic, numberHanzi, numberPinyin, numberStages, numbersTopic, telephonePractice } from "./features/foundations/numbers.js";
import { createFoundationState } from "./features/foundations/state.js";
import { createTimeDailyLifeState } from "./features/time-daily-life/state.js";
import { createTimeDailyLifeRuntime } from "./features/time-daily-life/time-daily-life-runtime.js";
import { illustratedKids } from "./data/characters.js";
import { bookHomeCategories, books, learningHomeCategories, topicCardMeta, topicGroups } from "./data/curriculum.js";
import { createSharedLessonPractice } from "./games/shared-lesson-practice.js";

const introductionsGameSpeakerIds = ["anan", "tiantian", "sisi", "lele"];
const ageGameItemIds = ["ask-age", "age-five", "age-six", "age-seven", "ask-grade", "grade-one"];
const sceneSpeechRate = 0.64;
const sceneLinePauseMs = 280;
const { speak, speakSceneLines } = createAudioService({
  getSceneRate: () => sceneSpeechRate,
  getSceneLinePauseMs: () => sceneLinePauseMs
});

const visualTopicItems = {
  comparisons: comparisonVisualItems,
  positions: positionVisualItems,
  transport: transportVisualItems,
  rooms: roomVisualItems
};

const schoolTopicData = {
  stationery: stationeryTopicData,
  "school-supplies": schoolSuppliesTopicData,
  classroom: classroomTopicData,
  school: schoolLessonTopicData,
  "school-subjects": schoolSubjectsTopicData,
  food: foodTopicData,
  "food-preferences": foodPreferencesTopicData,
  "meals-feelings": mealsFeelingsTopicData
};

const schoolSentenceBuilds = {
  stationery: stationerySentenceBuilds,
  "school-supplies": schoolSuppliesSentenceBuilds,
  school: schoolLessonSentenceBuilds,
  "school-subjects": schoolLessonSubjectsSentenceBuilds,
  food: foodSentenceBuilds,
  "meals-feelings": mealsFeelingsLessonSentenceBuilds
};

const topicData = [
  numbersTopic,
  multiplicationRhymeTopic,
  greetingsTopic,
  politeWordsTopic,
  introductionsTopic,
  identityTopic,
  ageTopic,
  familyTopic,
  bodyTopic,
  animalsTopic,
  coloursTopic,
  foodTopic,
  foodPreferencesTopic,
  mealsFeelingsTopic,
  {
    id: "time-date",
    title: "Time & Routines",
    summary: "Read the clock, then use time in everyday routines.",
    progressLabel: "2B to 4A",
    iconText: "时间",
    iconColor: "#517b8d",
    focus: {
      hanzi: "乐乐七点起床。",
      pinyin: "Lè le qī diǎn qǐ chuáng.",
      english: "Lele wakes up at 7:00 AM.",
      audio: "乐乐七点起床"
    },
    focusItems: [
      {
        id: "wake-up-7am",
        hanzi: "七点",
        pinyin: "qī diǎn",
        english: "seven o'clock",
        audio: "七点",
        timeOfDayHanzi: "早上",
        timeOfDayPinyin: "zǎo shang",
        timeOfDayEnglish: "early morning",
        routineHanzi: "乐乐七点起床。",
        routinePinyin: "Lè le qī diǎn qǐ chuáng.",
        routineEnglish: "Lele wakes up at 7:00 AM.",
        routineAction: "Wake up",
        scenePath: "assets/illustrated-clock-routines/07am-lele-wake-up.webp"
      },
      {
        id: "school-8am",
        hanzi: "八点",
        pinyin: "bā diǎn",
        english: "eight o'clock",
        audio: "八点",
        timeOfDayHanzi: "早上",
        timeOfDayPinyin: "zǎo shang",
        timeOfDayEnglish: "early morning",
        routineHanzi: "八点去学校。",
        routinePinyin: "bā diǎn qù xué xiào.",
        routineEnglish: "Go to school at 8:00 AM.",
        routineAction: "Go to school",
        scenePath: "assets/illustrated-clock-routines/08am-go-to-school.webp"
      },
      {
        id: "writing-10am",
        hanzi: "十点",
        pinyin: "shí diǎn",
        english: "ten o'clock",
        audio: "十点",
        timeOfDayHanzi: "上午",
        timeOfDayPinyin: "shàng wǔ",
        timeOfDayEnglish: "morning",
        routineHanzi: "十点上写字课。",
        routinePinyin: "shí diǎn shàng xiě zì kè.",
        routineEnglish: "Writing class at 10:00 AM.",
        routineAction: "Writing class",
        scenePath: "assets/illustrated-clock-routines/10am-writing-class.webp"
      },
      {
        id: "lunch-12pm",
        hanzi: "十二点",
        pinyin: "shí'èr diǎn",
        english: "twelve o'clock",
        audio: "十二点",
        timeOfDayHanzi: "中午",
        timeOfDayPinyin: "zhōng wǔ",
        timeOfDayEnglish: "noon",
        routineHanzi: "十二点吃午饭。",
        routinePinyin: "shí'èr diǎn chī wǔ fàn.",
        routineEnglish: "Lunch time at 12:00 PM.",
        routineAction: "Lunch time",
        scenePath: "assets/illustrated-clock-routines/12pm-lunch-time.webp"
      },
      {
        id: "playground-4pm",
        hanzi: "四点",
        pinyin: "sì diǎn",
        english: "four o'clock",
        audio: "四点",
        timeOfDayHanzi: "下午",
        timeOfDayPinyin: "xià wǔ",
        timeOfDayEnglish: "afternoon",
        routineHanzi: "四点去操场玩。",
        routinePinyin: "sì diǎn qù cāo chǎng wán.",
        routineEnglish: "Go play on the playground at 4:00 PM.",
        routineAction: "Playground",
        scenePath: "assets/illustrated-clock-routines/04pm-playground.webp"
      },
      {
        id: "story-time-8pm",
        hanzi: "八点",
        pinyin: "bā diǎn",
        english: "eight o'clock",
        audio: "八点",
        timeOfDayHanzi: "晚上",
        timeOfDayPinyin: "wǎn shang",
        timeOfDayEnglish: "evening",
        routineHanzi: "八点讲故事。",
        routinePinyin: "bā diǎn jiǎng gù shì.",
        routineEnglish: "Story time at 8:00 PM.",
        routineAction: "Story time",
        scenePath: "assets/illustrated-clock-routines/08pm-story-time.webp"
      }
    ],
    interactiveScene: "time-date-routine",
    parentGuide:
      "This topic works best with routines. Tie it to breakfast time, school time, bedtime, and birthdays.",
    cultureGuide:
      "Time and date language pairs naturally with birthday and holiday content later.",
    activities: ["Tap to hear", "Read the clock", "Daily routines"],
    steps: [
      { book: "2B", lesson: 2, title: "What time is it?", note: "Add telling time." },
      { book: "4A", lesson: 3, title: "Tell the time", note: "Revisit time in a more functional way." },
      { book: "4A", lesson: 4, title: "Daily routine", note: "Use time language in everyday life." }
    ]
  },
  {
    id: "weekdays",
    title: "Days of the Week",
    summary: "Learn the seven days through familiar school and home moments.",
    progressLabel: "2B Lesson 1",
    iconText: "星期",
    iconColor: "#6f7fa4",
    focus: {
      hanzi: "今天星期几？",
      pinyin: "jīn tiān xīng qī jǐ?",
      english: "What day is it today?",
      audio: "今天星期几"
    },
    focusItems: [
      { id: "monday", hanzi: "星期一", pinyin: "xīng qī yī", english: "Monday", audio: "星期一" },
      { id: "tuesday", hanzi: "星期二", pinyin: "xīng qī èr", english: "Tuesday", audio: "星期二" },
      { id: "wednesday", hanzi: "星期三", pinyin: "xīng qī sān", english: "Wednesday", audio: "星期三" },
      { id: "thursday", hanzi: "星期四", pinyin: "xīng qī sì", english: "Thursday", audio: "星期四" },
      { id: "friday", hanzi: "星期五", pinyin: "xīng qī wǔ", english: "Friday", audio: "星期五" },
      { id: "saturday", hanzi: "星期六", pinyin: "xīng qī liù", english: "Saturday", audio: "星期六" },
      { id: "sunday", hanzi: "星期天", pinyin: "xīng qī tiān", english: "Sunday", audio: "星期天" }
    ],
    interactiveScene: "weekdays",
    parentGuide: "Use the real day of the week at breakfast or on the way to school, then repeat it together.",
    cultureGuide: "A weekly rhythm gives children an easy, useful way to connect school, family routines, and calendar language.",
    activities: ["Tap to hear", "Say today's day", "Put the week in order"],
    steps: [{ book: "2B", lesson: 1, title: "Today is Monday", note: "Learn the days of the week." }]
  },
  {
    id: "dates",
    title: "Dates & Months",
    summary: "Say a month and day, then connect dates to birthdays and events.",
    progressLabel: "3A Lessons 2-3",
    iconText: "日期",
    iconColor: "#c48d46",
    focus: {
      hanzi: "几月几号？",
      pinyin: "jǐ yuè jǐ hào?",
      english: "What month and day?",
      audio: "几月几号"
    },
    focusItems: [
      { id: "date-question", hanzi: "几月几号？", pinyin: "jǐ yuè jǐ hào?", english: "What month and day?", audio: "几月几号" },
      { id: "new-year", hanzi: "一月一号", pinyin: "yī yuè yī hào", english: "January first", audio: "一月一号" },
      { id: "field-trip", hanzi: "五月二十号", pinyin: "wǔ yuè èr shí hào", english: "May twentieth", audio: "五月二十号" },
      { id: "christmas", hanzi: "十二月二十五号", pinyin: "shí èr yuè èr shí wǔ hào", english: "December twenty-fifth", audio: "十二月二十五号" },
      { id: "birthday", hanzi: "生日快乐！", pinyin: "shēng rì kuài lè!", english: "Happy birthday!", audio: "生日快乐" }
    ],
    interactiveScene: "dates",
    parentGuide: "Start with family birthdays or a coming event. Point to a calendar while saying the month and day together.",
    cultureGuide: "Dates are most memorable when connected to a child's own celebrations, school events, and seasonal activities.",
    activities: ["Tap to hear", "Read a calendar", "Say a birthday date"],
    steps: [
      { book: "3A", lesson: 2, title: "Date", note: "Say month and day." },
      { book: "3A", lesson: 3, title: "Happy birthday!", note: "Use dates for birthdays and celebrations." }
    ]
  },
  {
    id: "stationery",
    title: "My Stationery",
    summary: "Talk about your school things, their colors, and how many you have.",
    progressLabel: "2B Lesson 3",
    iconText: "文具",
    iconColor: "#6d8a4f",
    focus: { hanzi: "这是我的铅笔。", pinyin: "zhè shì wǒ de qiān bǐ.", english: "This is my pencil.", audio: "这是我的铅笔" },
    interactiveScene: "stationery",
    parentGuide: "Use a real pencil, eraser, or pair of scissors to practise 这是我的 and count the objects together.",
    cultureGuide: "This lesson builds practical ownership, color, and measure-word language from everyday school objects.",
    activities: ["Tap to hear", "Name my things", "Match the picture", "Build a sentence"],
    steps: [{ book: "2B", lesson: 3, title: "Stationery", note: "Talk about school things, colors, and measure words." }]
  },
  {
    id: "school-supplies",
    title: "Stationery & Backpack",
    summary: "Say what is in a pencil case or backpack and where things are.",
    progressLabel: "3B Lesson 1",
    iconText: "书包",
    iconColor: "#6d8a4f",
    focus: { hanzi: "我的书包。", pinyin: "wǒ de shū bāo.", english: "My backpack.", audio: "我的书包" },
    interactiveScene: "school-supplies",
    parentGuide: "Use a real pencil case or backpack to point to each object while saying its Chinese name.",
    cultureGuide: "These everyday classroom words give children quick, useful ways to speak Chinese during school routines.",
    activities: ["Tap to hear", "Name school things", "Pack a backpack", "Build a sentence"],
    steps: [{ book: "3B", lesson: 1, title: "My schoolbag", note: "Say what is in a backpack." }]
  },
  {
    id: "classroom",
    title: "Classroom",
    summary: "Look around the classroom and name the furniture and learning space.",
    progressLabel: "2B Lesson 4 and 3B Lesson 2",
    iconText: "教室",
    iconColor: "#6d8a4f",
    focus: { hanzi: "这是教室。", pinyin: "zhè shì jiào shì.", english: "This is the classroom.", audio: "这是教室" },
    interactiveScene: "classroom",
    parentGuide: "Point to the table, chair, and board in a real classroom, then say the complete sentence together.",
    cultureGuide: "Classroom language supports simple descriptions with 有 (there is / are) and 在 (at / in).",
    activities: ["Tap to hear", "Look around", "Listen and choose", "Match the words"],
    steps: [
      { book: "2B", lesson: 4, title: "My classroom", note: "Name the classroom and its furniture." },
      { book: "3B", lesson: 2, title: "Our classroom", note: "Describe things in the classroom." }
    ]
  },
  {
    id: "school",
    title: "Our School",
    summary: "Explore the places in a school and say what the school has.",
    progressLabel: "4B Lesson 5",
    iconText: "学校",
    iconColor: "#6d8a4f",
    focus: { hanzi: "学校有图书馆。", pinyin: "xué xiào yǒu tú shū guǎn.", english: "The school has a library.", audio: "学校有图书馆" },
    interactiveScene: "school-places",
    parentGuide: "Use the school map or a walk around school to connect each place name to a real place.",
    cultureGuide: "The pattern 学校有... is a natural way for children to describe places and things around them.",
    activities: ["Play scenes", "Explore school places", "Listen and choose", "Match the words"],
    steps: [{ book: "4B", lesson: 5, title: "Our school", note: "Name school places with 学校有..." }]
  },
  {
    id: "school-subjects",
    title: "School Subjects",
    summary: "Name school subjects and say which class you like.",
    progressLabel: "4B Lesson 6",
    iconText: "学科",
    iconColor: "#6d8a4f",
    focus: { hanzi: "我喜欢音乐课。", pinyin: "wǒ xǐ huan yīn yuè kè.", english: "I like music class.", audio: "我喜欢音月课" },
    interactiveScene: "school-subjects",
    parentGuide: "Ask which class your child likes best, then replace the final subject word in 我喜欢...课.",
    cultureGuide: "School subjects make a useful bridge from naming words to sharing a personal preference.",
    activities: ["Tap to hear", "Say a favorite", "Listen and choose", "Match the words"],
    steps: [{ book: "4B", lesson: 6, title: "School subjects", note: "Talk about favorite classes." }]
  },
  hobbiesTopic,
  toysTopic,
  clothesTopic,
  dailyLifeTopic,
  comparisonsTopic,
  positionsTopic,
  transportTopic,
  weatherTopic
];

const state = {
  currentView: "topics",
  selectedTopicId: "numbers",
  expandedCategoryId: "foundations",
  selectedBookCategoryId: "first-steps",
  selectedBookId: "1a",
  selectedLessonNumber: 1,
  topicPageOpen: false,
  openTopicGroups: new Set(["foundations"]),
  showPinyin: true,
  showArabic: true,
  showEnglish: true,
  tapAudioEnabled: true,
  selectedFocusItemId: null,
  ...createFoundationState(),
  ...createTimeDailyLifeState(),
  schoolPracticeTopicId: "",
  schoolChallengeAnswerId: "",
  schoolChallengeOptionIds: [],
  schoolChallengePickedId: "",
  schoolChallengePromptId: "",
  schoolChallengeResult: "",
  schoolChallengeWrongIds: new Set(),
  schoolListenFeedback: "",
  schoolMatchFeedback: "",
  schoolSelectedPhraseId: null,
  schoolMatchedIds: new Set(),
  schoolPhraseOrder: [],
  schoolMeaningOrder: [],
  backpackGameRoundIds: [],
  backpackGameTargetIndex: 0,
  backpackGameOptionIds: [],
  backpackGamePlacedIds: [],
  backpackGameWrongIds: new Set(),
  backpackGameComplete: false,
  stationeryPictureMatchIndex: 0,
  stationeryPictureMatchSelections: { measure: "", color: "", item: "" },
  stationeryPictureMatchWrong: { measure: new Set(), color: new Set(), item: new Set() },
  stationeryPictureMatchChoiceOrders: { measure: [], color: [], item: [] },
  stationeryPictureMatchComplete: false,
  mealsConversationMatchReady: false,
  mealsConversationWrongPhraseIds: new Set(),
  mealsConversationWrongReplyIds: new Set(),
  mealsPictureQuizOrder: [],
  mealsPictureQuizIndex: 0,
  mealsPictureQuizOptionIds: [],
  mealsPictureQuizSelectedId: "",
  mealsPictureQuizResult: "",
  foodPreferenceSubjectId: "我",
  foodPreferencePatternId: "like",
  foodPreferenceFoodId: "",
  classroomSentenceFrameId: "in-classroom",
  classroomSentenceWordId: "",
  schoolBuildTopicId: "",
  schoolBuildOrder: [],
  schoolBuildIndex: 0,
  schoolBuildAvailableTokens: [],
  schoolBuildSelectedTokens: [],
  schoolBuildResult: "",
  foodBookCategoryId: "fruit",
  mealsWordGroupId: "lunch",
  foodHungerModeId: "mix",
  foodHungerRoundIds: [],
  foodHungerTargetIndex: 0,
  foodHungerOptionIds: [],
  foodHungerPlatedIds: [],
  foodHungerWrongIds: new Set(),
  foodHungerComplete: false,
  timeDateSectionId: "",
  timeDateSectionSource: "",
  identitySelectedCountryId: ""
};

let multiplicationPlaybackToken = 0;
let multiplicationPlaybackPaused = false;
let multiplicationPlaybackContainer = null;

const topicGroupsRoot = document.getElementById("topic-groups");
const bookSelect = document.getElementById("book-select");
const lessonSelect = document.getElementById("lesson-select");
const lookupCard = document.getElementById("lookup-card");
const bookBrowser = document.getElementById("book-browser");
const topicTitle = document.getElementById("topic-title");
const topicSummary = document.getElementById("topic-summary");
const topicProgress = document.getElementById("topic-progress");
const topicLessonStrip = document.getElementById("topic-lesson-strip");
const subtopicShelf = document.getElementById("subtopic-shelf");
const focusExplorer = document.getElementById("focus-explorer");
const focusStatus = document.getElementById("focus-status");
const focusDisplay = document.getElementById("focus-display");
const focusHanzi = document.getElementById("focus-hanzi");
const focusPinyin = document.getElementById("focus-pinyin");
const focusEnglish = document.getElementById("focus-english");
const focusWordList = document.getElementById("focus-word-list");
const toggleAudioButton = document.getElementById("toggle-audio-button");
const togglePinyinButton = document.getElementById("toggle-pinyin-button");
const toggleArabicButton = document.getElementById("toggle-arabic-button");
const toggleEnglishButton = document.getElementById("toggle-english-button");
const activityList = document.getElementById("activity-list");
const activityPanelTitle = document.getElementById("activity-panel-title");
const activityPanelSummary = document.getElementById("activity-panel-summary");
const topicPanel = document.getElementById("topics-panel");
const bookPanel = document.getElementById("books-panel");
const topicColumns = document.querySelector(".topic-columns");
const detailLayout = document.querySelector(".detail-layout");
const learningCultureNav = document.getElementById("learningCultureNav");
const renderSharedLessonPractice = createSharedLessonPractice({
  state,
  speak,
  elements: { activityPanelTitle, activityPanelSummary, activityList }
});
const renderListenPractice = renderSharedLessonPractice.renderListenPractice;
const renderMatchPractice = renderSharedLessonPractice.renderMatchPractice;
const renderPracticeSayCards = renderSharedLessonPractice.renderPracticeSayCards;
const bindPracticeSayCards = renderSharedLessonPractice.bindPracticeSayCards;

let greetingsGameItems;
let resetGreetingsChallenge;
let ensureGreetingsChallenge;
let greetingsMeaningLabel;
let resetGreetingsMatchGame;
let ensureGreetingsMatchGame;
let handleGreetingsMatchPhrase;
let handleGreetingsMatchAttempt;
let handleGreetingsChallengePlay;
let handleGreetingsChallengeGuess;
let renderGreetingsExplorer;
let politeGameItems;
let politeMeaningLabel;
let resetPoliteMatchGame;
let ensurePoliteMatchGame;
let handlePoliteMatchPhrase;
let handlePoliteMatchAttempt;
let resetPoliteChallenge;
let ensurePoliteChallenge;
let handlePoliteChallengePlay;
let handlePoliteChallengeGuess;
let renderPoliteWordsExplorer;
let introductionsPromptById;
let introductionsGameKids;
let introductionsSelfIntroItemForKid;
let resetIntroductionsChallenge;
let ensureIntroductionsChallenge;
let handleIntroductionsChallengePlay;
let handleIntroductionsChallengeGuess;
let introductionsBuildTarget;
let resetIntroductionsBuilder;
let ensureIntroductionsBuilder;
let handleIntroductionsBuildToken;
let handleIntroductionsBuildClear;
let renderIntroductionsExplorer;
let ageGameItems;
let resetAgeChallenge;
let ensureAgeChallenge;
let handleAgeChallengePlay;
let handleAgeChallengeGuess;
let ageBuildTarget;
let resetAgeBuilder;
let ensureAgeBuilder;
let handleAgeBuildToken;
let handleAgeBuildClear;
let renderAgeExplorer;
let schoolPracticeItems;
let ensureSchoolPractice;
let renderSchoolPractice;
let renderStationeryPractice;
let renderSchoolSuppliesPractice;
let renderFoodPractice;
let renderMealsConversationPractice;
let renderFoodPreferencesPractice;
let renderClassroomPractice;

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.viewTarget);
    document.querySelector(".switcher-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

document.querySelectorAll("[data-global-view]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    state.topicPageOpen = false;
    switchView(link.dataset.globalView);
    updateTopicPageVisibility();
    document.querySelector(".switcher-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    link.closest(".global-view-menu")?.removeAttribute("open");
  });
});

function updateDisplayControls() {
  renderFocusControls();
  renderFocusDisplay(currentFocusItem());
  renderFocusWordList();
  renderFocusExplorer();
  renderActivityPanel(currentTopic());
}

toggleAudioButton.addEventListener("click", () => {
  state.tapAudioEnabled = !state.tapAudioEnabled;
  updateDisplayControls();
});

togglePinyinButton.addEventListener("click", () => {
  state.showPinyin = !state.showPinyin;
  updateDisplayControls();
});

toggleArabicButton.addEventListener("click", () => {
  state.showArabic = !state.showArabic;
  renderFocusControls();
  renderFocusExplorer();
  renderActivityPanel(currentTopic());
});

toggleEnglishButton.addEventListener("click", () => {
  state.showEnglish = !state.showEnglish;
  updateDisplayControls();
});

function currentTopic() {
  return topicData.find((topic) => topic.id === state.selectedTopicId) ?? topicData[0];
}

function currentNumberStage() {
  const lesson = currentLesson();
  return (
    numberStages.find((stage) => stage.bookId === currentBook().id && stage.lesson === lesson.lesson) ??
    numberStages[0]
  );
}

function numberStageItems(stage = currentNumberStage()) {
  const start = Math.min(stage.start, stage.end);
  const end = Math.max(stage.start, stage.end);
  const items = [];
  for (let value = start; value <= end; value += 1) {
    items.push(buildNumberItem(value));
  }
  return items;
}

function resetNumberChallenge(options = {}) {
  const stage = currentNumberStage();
  const items = numberStageItems(stage);
  const pool = items.map((entry) => entry.value);
  const targetValue = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffleArray(pool.filter((value) => value !== targetValue)).slice(
    0,
    Math.min(3, Math.max(0, pool.length - 1))
  );

  state.numberChallengeStageId = stage.id;
  state.numberChallengeTargetValue = targetValue;
  state.numberChallengeOptionValues = shuffleArray([targetValue, ...distractors]);
  state.lastNumberFeedback =
    options.feedback ??
    "Look carefully. Pick the number without counting from one every time.";
}

function ensureNumberChallenge() {
  const stage = currentNumberStage();
  if (state.numberChallengeStageId !== stage.id || !state.numberChallengeOptionValues.length) {
    resetNumberChallenge();
  }
}

function resetMathChallenge() {
  const stage = currentNumberStage();
  const low = Math.max(1, stage.start);
  const high = Math.max(low, stage.end);
  const operator = Math.random() < 0.5 ? "+" : "-";
  let left;
  let right;
  let answer;

  if (operator === "+") {
    const additionMaxLeft = high > low ? high - 1 : high;
    left = Math.floor(Math.random() * (additionMaxLeft - low + 1)) + low;
    const maxRight = Math.max(1, high - left);
    right = Math.floor(Math.random() * maxRight) + 1;
    answer = left + right;
  } else {
    left = Math.floor(Math.random() * (high - low + 1)) + low;
    right = Math.floor(Math.random() * (left + 1));
    answer = left - right;
  }

  state.mathChallengeStageId = stage.id;
  state.mathChallengeOperator = operator;
  state.mathChallengeLeft = left;
  state.mathChallengeRight = right;
  state.mathChallengeAnswer = answer;
  state.lastMathFeedback = "Type the answer, then check it.";
  state.mathChallengeSolved = false;
  state.mathChallengeInput = "";
}

function ensureMathChallenge() {
  const stage = currentNumberStage();
  if (state.mathChallengeStageId !== stage.id || state.mathChallengeAnswer === null) {
    resetMathChallenge();
  }
}

function familyGameItems() {
  const familyTopic = topicById("family");
  return familyGameItemIds
    .map((id) => familyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function familyPersonForItemId(itemId) {
  const personId = familyPersonIdsByItemId[itemId];
  return (
    {
      dad: illustratedFamily.dad,
      mom: illustratedFamily.mom,
      "older-brother": { ...illustratedKids.yangyang, label: "Older brother" },
      "younger-brother": { ...illustratedKids.lele, label: "Younger brother" },
      "older-sister": { ...illustratedKids.anan, label: "Older sister" },
      "younger-sister": { ...illustratedKids.meimei, label: "Younger sister" }
    }[personId] ?? null
  );
}

function familyHeadshotForItemId(itemId) {
  return familyHeadshotsByItemId[itemId] ?? null;
}

function isFamilySentenceItemId(itemId) {
  return ["parents-love-me", "i-love-dad", "i-love-mom"].includes(itemId);
}

function familyBookWordItems() {
  return focusItemsForTopic(topicById("family")).filter((item) => !isFamilySentenceItemId(item.id));
}

const lessonTemplateTopicIds = new Set(["greetings", "polite-words", "introductions", "age", "family"]);

function usesLessonTemplate(topic) {
  return lessonTemplateTopicIds.has(topic.id);
}

function bookWordItemsForTopic(topic) {
  if (topic.id === "family") {
    return familyBookWordItems();
  }

  return focusItemsForTopic(topic);
}

function usefulNoteForTopic(topic) {
  const notes = {
    greetings: `
      <p class="greetings-note-hanzi">你 and 您</p>
      <p class="greetings-note-copy">
        <strong>你</strong> is the everyday word for “you.” <strong>您</strong> is the polite form, often used for teachers and other adults to show respect.
      </p>
      <p class="greetings-note-copy">
        <strong>老师</strong> means “teacher,” so <strong>李老师，您好！</strong> sounds warm and respectful.
      </p>
    `,
    "polite-words": `
      <p class="greetings-note-hanzi">谢谢 / 不客气 / 对不起 / 没关系</p>
      <p class="greetings-note-copy">
        <strong>谢谢你</strong> means “thank you,” and <strong>不客气</strong> is the kind reply: “you’re welcome.”
      </p>
      <p class="greetings-note-copy">
        <strong>对不起</strong> means “I’m sorry,” and <strong>没关系</strong> is the calm reply: “never mind” or “that’s okay.”
      </p>
      <p class="greetings-note-copy">
        <strong>请</strong> helps children sound polite in requests and classroom directions, for example:
        <strong>请安静。</strong>
      </p>
    `,
    introductions: `
      <p class="greetings-note-hanzi">我 / 叫 / 什么 / 名字</p>
      <p class="greetings-note-copy">
        <strong>我</strong> means “I” or “me,” and <strong>叫</strong> is used in beginner Chinese to say what someone is called.
      </p>
      <p class="greetings-note-copy">
        <strong>你叫什么名字？</strong> means “What is your name?” and <strong>我叫……</strong> gives the answer pattern: “My name is…”
      </p>
      <p class="greetings-note-copy">
        Let children pause after <strong>我叫</strong> and say their own name out loud.
      </p>
    `,
    age: `
      <p class="greetings-note-hanzi">你几岁？ / 我...岁。 / 你上几年级？ / 我上一年级。</p>
      <p class="greetings-note-copy">
        <strong>你几岁？</strong> literally means “you how-many years old?” Here, <strong>几</strong> asks for a small number, and <strong>岁</strong> is the common word for a child's age.
      </p>
      <p class="greetings-note-copy">
        The answer pattern stays simple: <strong>我 + number + 岁</strong>. So <strong>我五岁</strong> is “I am five years old,” <strong>我六岁</strong> is “I am six years old,” and <strong>我七岁</strong> is “I am seven years old.”
      </p>
      <p class="greetings-note-copy">
        <strong>你上几年级？</strong> asks what school year someone is in, and <strong>我上一年级。</strong> means “I am in first grade.” This topic links naturally with earlier self-introduction language: <strong>你好！你叫什么名字？我叫…… 你几岁？我五岁。你上几年级？我上一年级。</strong>
      </p>
    `,
    family: `
      <p class="greetings-note-hanzi">爸爸 / 妈妈 / 哥哥 / 弟弟 / 姐姐 / 妹妹</p>
      <p class="greetings-note-copy">
        In sentences like <strong>我爱爸爸</strong> and <strong>我爱妈妈</strong>, the family word names who the child loves. <strong>我</strong> names the speaker, and <strong>爱</strong> names the feeling.
      </p>
      <p class="greetings-note-copy">
        <strong>哥哥</strong> and <strong>弟弟</strong> are the brother pair: older brother, then younger brother. <strong>姐姐</strong> and <strong>妹妹</strong> are the sister pair: older sister, then younger sister.
      </p>
      <p class="greetings-note-copy">
        In listening practice, the repeated family word is the anchor. For sisters, <strong>姐姐</strong> and <strong>妹妹</strong> both use <strong>女</strong>, so children can group the two sister words together.
      </p>
    `
  };

  return notes[topic.id] ?? "";
}

function familyWordForPersonId(personId) {
  return {
    mom: "妈妈",
    dad: "爸爸",
    "older-brother": "哥哥",
    "younger-brother": "弟弟",
    "older-sister": "姐姐",
    "younger-sister": "妹妹"
  }[personId] ?? "";
}

function resetFamilyChallenge(options = {}) {
  const items = familyGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.familyChallengeAnswerId = answer.id;
  state.familyChallengePickedId = "";
  state.familyChallengePromptId = answer.id;
  state.familyChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.familyChallengeResult = "";
  state.familyChallengeWrongIds = new Set();
  state.familyListenFeedback = options.feedback ?? "";
  state.lastFamilyFeedback = state.familyListenFeedback;
}

function ensureFamilyChallenge() {
  if (!state.familyChallengeAnswerId || !state.familyChallengeOptionIds.length) {
    resetFamilyChallenge();
  }
}

function resetListenChallengeResult(challengeKey) {
  state[`${challengeKey}ChallengePickedId`] = "";
  state[`${challengeKey}ChallengeResult`] = "";
  state[`${challengeKey}ChallengeWrongIds`] = new Set();
}

function handleFamilyChallengePlay() {
  ensureFamilyChallenge();
  const item = familyGameItems().find((entry) => entry.id === state.familyChallengePromptId);
  if (!item) {
    return;
  }

  resetListenChallengeResult("family");
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyListenFeedback = `Listen again and find ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyChallengeGuess(itemId) {
  ensureFamilyChallenge();
  const answer = familyGameItems().find((entry) => entry.id === state.familyChallengeAnswerId);
  const picked = familyGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    state.familyChallengePickedId = itemId;
    state.familyChallengeResult = "correct";
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.familyListenFeedback = "Nice listening.";
    state.lastFamilyFeedback = state.familyListenFeedback;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    renderActivityPanel(currentTopic());
    return;
  }

  state.familyChallengePickedId = itemId;
  state.familyChallengeResult = "wrong";
  state.familyChallengeWrongIds = new Set([...state.familyChallengeWrongIds, itemId]);
  state.familyListenFeedback = "Not that one. Try another card.";
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function resetFamilyMatchGame() {
  const items = familyGameItems();
  state.familySelectedPhraseId = null;
  state.familyMatchedIds = new Set();
  state.familyPhraseOrder = shuffleArray(items.map((item) => item.id));
  state.familyMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.familyMatchFeedback = "";
  state.lastFamilyFeedback = state.familyMatchFeedback;
}

function ensureFamilyMatchGame() {
  const items = familyGameItems();
  if (
    !state.familyPhraseOrder.length ||
    state.familyPhraseOrder.length !== items.length ||
    state.familyMeaningOrder.length !== items.length
  ) {
    resetFamilyMatchGame();
  }
}

function handleFamilyMatchPhrase(itemId) {
  const item = familyGameItems().find((entry) => entry.id === itemId);
  if (!item || state.familyMatchedIds.has(itemId)) {
    return;
  }

  state.familySelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyMatchFeedback = `Now find who matches ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyMatchAttempt(targetId) {
  if (!state.familySelectedPhraseId || state.familyMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.familySelectedPhraseId;
  const selectedItem = familyGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.familyMatchedIds = new Set([...state.familyMatchedIds, targetId]);
    state.familySelectedPhraseId = null;
    state.familyMatchFeedback = "Matched.";
    state.lastFamilyFeedback = state.familyMatchFeedback;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.familyMatchedIds.size === familyGameItems().length) {
      state.familyMatchFeedback = "All family members matched.";
      state.lastFamilyFeedback = state.familyMatchFeedback;
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.familyMatchFeedback = "Try a different family member.";
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function mathChallengeAudioText() {
  if (state.mathChallengeAnswer === null) {
    return "";
  }

  const chineseOperator = state.mathChallengeOperator === "+" ? "加" : "减";
  return `${numberHanzi(state.mathChallengeLeft)}${chineseOperator}${numberHanzi(state.mathChallengeRight)}等于${numberHanzi(state.mathChallengeAnswer)}`;
}

function handleMathChallengeSubmit(rawValue) {
  ensureMathChallenge();
  if (state.mathChallengeSolved) {
    return;
  }

  const trimmed = rawValue.trim();
  state.mathChallengeInput = trimmed;
  const answer = Number(trimmed);
  const audioText = mathChallengeAudioText();

  if (!Number.isFinite(answer)) {
    state.lastMathFeedback = "Type one number first.";
    renderActivityPanel(currentTopic());
    return;
  }

  if (answer === state.mathChallengeAnswer) {
    if (state.tapAudioEnabled && audioText) {
      speak(audioText, 0.78);
    }
    state.lastMathFeedback = `Correct! ${audioText}`;
    state.mathChallengeSolved = true;
  } else {
    state.lastMathFeedback = "Try again.";
  }

  renderActivityPanel(currentTopic());
}

function handleNumberChallengeGuess(value) {
  ensureNumberChallenge();
  const target = state.numberChallengeTargetValue;
  const targetItem = buildNumberItem(target);

  if (value === target) {
    state.selectedFocusItemId = targetItem.id;
    if (state.tapAudioEnabled) {
      speak(targetItem.audio, 0.78);
    }
    state.lastNumberFeedback = `Correct! ${targetItem.hanzi} is right. Here comes a new round.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusWordList();
    renderFocusStatus();

    if (state.numberChallengeAdvanceTimer) {
      window.clearTimeout(state.numberChallengeAdvanceTimer);
    }

    state.numberChallengeAdvanceTimer = window.setTimeout(() => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(currentTopic());
      renderFocusStatus();
      state.numberChallengeAdvanceTimer = null;
    }, 700);
    return;
  }

  state.lastNumberFeedback = `Try again. This group is ${targetItem.hanzi}, not ${buildNumberItem(value).hanzi}.`;
  renderFocusStatus();
}

function focusItemsForTopic(topic = currentTopic()) {
  if (topic.id === "numbers") {
    return numberStageItems();
  }

  if (topic.id === "weekdays") {
    return timeDateWeekItems;
  }

  return topic.focusItems ?? [{ id: "focus", ...topic.focus }];
}

function currentFocusItem() {
  const items = focusItemsForTopic();
  return items.find((item) => item.id === state.selectedFocusItemId) ?? items[0];
}


function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function bodyMatchItems() {
  const ids = state.bodyMatchIncludeBonus ? [...bodyCoreItemIds, ...bodyBonusItemIds] : bodyCoreItemIds;
  const bodyTopic = topicById("body");
  return ids
    .map((id) => bodyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function nextBodyRound() {
  const allIds = bodyMatchItems().map((item) => item.id);
  const remaining = allIds.filter((id) => !state.bodyMatchedIds.has(id));

  state.bodySelectedChineseId = null;
  state.bodySelectedEnglishId = null;
  state.bodyRoundIds = shuffleArray(remaining).slice(0, Math.min(3, remaining.length));
  state.bodyChineseOrder = shuffleArray(state.bodyRoundIds);
  state.bodyEnglishOrder = shuffleArray(state.bodyRoundIds);
}

function resetBodyMatchGame() {
  state.bodyMatchedIds = new Set();
  state.bodyMatchUniverseKey = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  nextBodyRound();
  state.lastBodyFeedback = "Match the Chinese words with the English words.";
}

function ensureBodyMatchGame() {
  const ids = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  if (!state.bodyRoundIds.length || state.bodyMatchUniverseKey !== ids) {
    resetBodyMatchGame();
  }
}

function handleBodyMatchChinese(itemId) {
  state.bodySelectedChineseId = itemId;
  state.bodySelectedEnglishId = null;
  selectFocusItem(itemId, {
    playAudio: true,
    bodyFeedback: "Now tap the matching English word."
  });
}

function handleBodyMatchAttempt(englishId, chineseId = state.bodySelectedChineseId) {
  const itemsById = Object.fromEntries(bodyMatchItems().map((item) => [item.id, item]));

  if (!chineseId) {
    state.bodySelectedEnglishId = englishId;
    state.lastBodyFeedback = "Tap a Chinese word first.";
    renderFocusExplorer();
    renderFocusStatus();
    return;
  }

  state.bodySelectedEnglishId = englishId;

  if (englishId === chineseId) {
    state.bodyMatchedIds.add(englishId);
    state.bodySelectedChineseId = null;
    state.bodySelectedEnglishId = null;
    selectFocusItem(englishId, {
      playAudio: state.tapAudioEnabled,
      bodyFeedback: `Nice match! ${itemsById[englishId].hanzi} means ${itemsById[englishId].english}.`
    });

    const roundComplete = state.bodyRoundIds.every((id) => state.bodyMatchedIds.has(id));
    if (roundComplete) {
      const total = bodyMatchItems().length;
      const allDone = state.bodyMatchedIds.size === total;
      state.lastBodyFeedback = allDone
        ? "Great job! You matched all the words."
        : "Round complete! Tap Next set for the next words.";
      renderFocusExplorer();
      renderFocusStatus();
    }
    return;
  }

  state.lastBodyFeedback = `Try again. ${itemsById[chineseId].hanzi} is not ${itemsById[englishId].english}.`;
  renderFocusExplorer();
  renderFocusStatus();
}

function topicById(topicId) {
  return topicData.find((topic) => topic.id === topicId);
}

function selectedTopicGroupId() {
  return (
    topicGroups.find((group) => group.topicIds.includes(state.selectedTopicId))?.id ??
    topicGroups[0].id
  );
}

function bookById(bookId) {
  return books.find((book) => book.id === bookId) ?? books[0];
}

function bookCategoryForBook(bookId) {
  return bookHomeCategories.find((category) => category.bookIds.includes(bookId)) ?? bookHomeCategories[0];
}

function currentBook() {
  return bookById(state.selectedBookId);
}

function currentLesson() {
  const book = currentBook();
  const exactLesson = book.lessons.find((lesson) => lesson.lesson === state.selectedLessonNumber);
  if (exactLesson && exactLesson.topicId === state.selectedTopicId) {
    return exactLesson;
  }

  return book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
}

function syncBookSelectionFromTopic() {
  const topic = currentTopic();
  const firstMatch = books.find((book) =>
    book.lessons.some((lesson) => topic.steps.some((step) => book.id === step.book.toLowerCase() && step.lesson === lesson.lesson))
  );

  if (firstMatch) {
    state.selectedBookId = firstMatch.id;
    state.selectedBookCategoryId = bookCategoryForBook(firstMatch.id).id;
  }

  syncLessonSelectionFromTopic();
}

function syncLessonSelectionFromTopic() {
  const book = currentBook();
  const firstMatch = book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
  state.selectedLessonNumber = firstMatch.lesson;
}

function focusLearningPanel() {
  if (!detailLayout) {
    return;
  }

  scrollToSectionTop(detailLayout);
}

function scrollToSectionTop(element) {
  if (!element) {
    return;
  }

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  const stickyNavHeight = learningCultureNav?.getBoundingClientRect().height ?? 0;
  const targetTop = Math.max(0, window.scrollY + element.getBoundingClientRect().top - stickyNavHeight);
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, targetTop);
  root.style.scrollBehavior = previousScrollBehavior;
}

function narrowTopicBrowserTo(groupId) {
  state.openTopicGroups = new Set([groupId]);
}

function categoryIdForTopic(topicId) {
  return learningHomeCategories.find((category) => category.topicIds.includes(topicId))?.id ?? "foundations";
}

function updateTopicPageVisibility() {
  detailLayout?.classList.toggle("is-hidden", !state.topicPageOpen);
  document.body.classList.toggle("is-topic-page", state.topicPageOpen);
}

function scrollCategorySectionIntoView(categoryId) {
  requestAnimationFrame(() => {
    scrollToSectionTop(document.getElementById(categoryId));
  });
}

function openTopicPage(topicId, options = {}) {
  const topic = topicById(topicId);
  if (!topic) {
    return;
  }

  state.selectedTopicId = topic.id;
  state.expandedCategoryId = categoryIdForTopic(topic.id);
  state.topicPageOpen = true;
  const {
  resetWeekdayChallenge,
  ensureWeekdayChallenge,
  handleWeekdayChallengePlay,
  handleWeekdayChallengeGuess,
  resetWeekdayMatchGame,
  ensureWeekdayMatchGame,
  handleWeekdayMatchPhrase,
  handleWeekdayMatchAttempt,
  resetClothesQuiz,
  prepareClothesQuizQuestion,
  ensureClothesQuiz,
  handleClothesQuizPick,
  nextClothesQuizQuestion,
  resetTimeRoutineQuiz,
  prepareTimeRoutineQuizQuestion,
  ensureTimeRoutineQuiz,
  handleTimeRoutineQuizPick,
  nextTimeRoutineQuizQuestion,
  resetClockQuiz,
  prepareClockQuizQuestion,
  ensureClockQuiz,
  handleClockQuizPick,
  nextClockQuizQuestion,
  currentRoomBuildItem,
  resetRoomBuilder,
  prepareRoomBuilder,
  ensureRoomBuilder,
  isRoomBuildPrefixValid,
  handleRoomBuildToken,
  clearRoomBuilder,
  nextRoomBuilder,
  currentTransportBuildItem,
  resetTransportBuilder,
  prepareTransportBuilder,
  ensureTransportBuilder,
  handleTransportBuildToken,
  clearTransportBuilder,
  nextTransportBuilder,
  resetPositionQuiz,
  preparePositionQuizQuestion,
  ensurePositionQuiz,
  handlePositionQuizPlay,
  handlePositionQuizPick,
  nextPositionQuizQuestion,
  currentComparisonBuildItem,
  resetComparisonBuilder,
  prepareComparisonBuilder,
  ensureComparisonBuilder,
  handleComparisonBuildToken,
  clearComparisonBuilder,
  nextComparisonBuilder,
  resetDateMatchGame,
  ensureDateMatchGame,
  handleDateMatchPhrase,
  handleDateMatchEvent,
  resetDateChallenge,
  ensureDateChallenge,
  handleDateChallengePlay,
  handleDateChallengeGuess,
  timeDateSectionForCurrentLesson,
  activeTimeDateSection,
  renderTimeAssetGrid,
  bindTimeAssetAudio,
  renderWeekdaysExplorer,
  renderDatesExplorer,
  renderVisualTopicExplorer,
  renderRoomsExplorer,
  renderPositionsExplorer,
  renderTimeDateExplorer,
  renderClothesExplorer
} = createTimeDailyLifeRuntime({
  state,
  timeDateWeekItems,
  timeDateClockItems,
  timeDateExpressionItems,
  timeDateRoutineItems,
  datePracticeItems,
  timeDateDateItems,
  timeDateMonthItems,
  comparisonPracticeItems,
  comparisonWordItems,
  positionPracticeItems,
  positionScenes,
  clothesMatchItems,
  clothesPractice,
  roomScenes,
  roomSentenceTokens,
  transportSentenceTokens,
  visualTopicItems,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentBook,
  currentLesson,
  renderActivityPanel,
  focusExplorer,
  focusStatus
});

syncBookSelectionFromTopic();
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();

  const nextUrl = topicPageUrl(window.location, topic.id);
  if (options.replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }

  if (options.scroll !== false) {
    focusLearningPanel();
  }
}

function switchView(view) {
  state.currentView = view;
  document.querySelectorAll(".view-tab").forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  topicPanel.classList.toggle("is-hidden", view !== "topics");
  bookPanel.classList.toggle("is-hidden", view !== "books");
  document.querySelectorAll("[data-global-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.globalView === view);
  });
  renderStickyNav();
  updateLearningCultureNav();
}

function toggleTopicGroup(groupId) {
  if (state.openTopicGroups.has(groupId)) {
    state.openTopicGroups.delete(groupId);
  } else {
    state.openTopicGroups.add(groupId);
  }

  renderTopics();
}

function renderTopicScene(topic) {
  const style = `background: linear-gradient(180deg, ${topic.iconColor}, ${topic.iconColor}dd); --topic-accent:${topic.iconAccent ?? "#f5d9a6"};`;

  if (topic.id === "numbers") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-numbers" style="${style}">
        <span class="topic-scene-dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
        <span class="topic-scene-chip-row" aria-hidden="true">
          <span class="topic-scene-chip">一</span>
          <span class="topic-scene-chip">二</span>
          <span class="topic-scene-chip">三</span>
        </span>
      </span>
    `;
  }

  if (topic.id === "multiplication-rhyme") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-rhyme" style="${style}">
        <span class="topic-scene-rhyme-row" aria-hidden="true">
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip topic-scene-chip-accent">81</span>
        </span>
        <span class="topic-scene-rhythm-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "greetings") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-greetings" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-left" aria-hidden="true">你</span>
        <span class="topic-scene-bubble topic-scene-bubble-right" aria-hidden="true">好</span>
        <span class="topic-scene-spark topic-scene-spark-top" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "polite-words") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-polite" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-wide" aria-hidden="true">谢谢</span>
        <span class="topic-scene-heart" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "introductions") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-intro" style="${style}">
        <span class="topic-scene-name-tag" aria-hidden="true">我叫</span>
        <span class="topic-scene-faces" aria-hidden="true">
          <span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "age") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-age" style="${style}">
        <span class="topic-scene-pill topic-scene-pill-age" aria-hidden="true">六岁</span>
        <span class="topic-scene-pill topic-scene-pill-grade" aria-hidden="true">一年级</span>
      </span>
    `;
  }

  return `<span class="topic-scene" style="background:${topic.iconColor};">${topic.iconText}</span>`;
}

function displayControlsMarkup() {
  return `
    <span class="learning-display-controls" aria-label="Display options">
      <button class="learning-display-toggle" type="button" data-display-toggle="sound"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="pinyin"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="english"></button>
    </span>
  `;
}

function bindDisplayControls() {
  learningCultureNav.querySelectorAll("[data-display-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.displayToggle === "sound") {
        state.tapAudioEnabled = !state.tapAudioEnabled;
      } else if (button.dataset.displayToggle === "pinyin") {
        state.showPinyin = !state.showPinyin;
      } else {
        state.showEnglish = !state.showEnglish;
      }
      updateDisplayControls();
    });
  });
}

function renderTopicStickyNav() {
  const categoriesMarkup = learningHomeCategories
    .map(
      (category) => `
        <button
          class="learning-culture-nav-item${category.id === state.expandedCategoryId ? " active" : ""}"
          type="button"
          data-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${category.id === state.expandedCategoryId ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.enTitle}</span>
        </button>
      `
    )
    .join("");

  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup()}
  `;

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expandedCategoryId = button.dataset.target;
      state.topicPageOpen = false;
      renderTopics();
      updateTopicPageVisibility();
      window.history.pushState(null, "", "#topics-panel");
      scrollCategorySectionIntoView(button.dataset.target);
    });
  });
}

function bookAccent(index) {
  const accents = ["#be5b49", "#aa7051", "#517b8d", "#6d8a4f", "#c48d46", "#6f7fa4", "#8f6988", "#b8863e"];
  return accents[index % accents.length];
}

function renderBookStickyNav() {
  const categoriesMarkup = bookHomeCategories
    .map((category) => {
      const isActive = category.id === state.selectedBookCategoryId;
      return `
        <button
          class="learning-culture-nav-item book-nav-item${isActive ? " active" : ""}"
          type="button"
          data-book-category-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${isActive ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.bookIds.length} books</span>
        </button>
      `;
    })
    .join("");

  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup()}
  `;

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-book-category-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryTarget);
      if (!selectedCategory) {
        return;
      }

      state.selectedBookCategoryId = selectedCategory.id;
      if (!selectedCategory.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(selectedCategory.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      state.topicPageOpen = false;
      renderBooks();
      renderTopicDetail();
      updateTopicPageVisibility();
      document.getElementById(`book-category-${selectedCategory.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderStickyNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books") {
    renderBookStickyNav();
  } else {
    renderTopicStickyNav();
  }
  renderFocusControls();
}

function categoryIconMarkup(category) {
  if (category.iconEmoji) {
    return `<span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>`;
  }

  return `
    <img
      class="category-generated-icon category-generated-icon-${category.id}"
      src="${category.iconSrc}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}

function renderTopics() {
  topicGroupsRoot.innerHTML = "";
  renderStickyNav();

  const board = document.createElement("div");
  board.className = "learning-home-board";
  learningHomeCategories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "learning-home-card";
    card.style.setProperty("--category-accent", category.accent);
    if (category.id === state.expandedCategoryId) {
      card.classList.add("is-selected");
    }

    card.innerHTML = `
      <button class="learning-home-card-main" type="button" aria-label="Open ${category.enTitle}">
        <span class="learning-card-count">${category.topicIds.length} topics</span>
        <span class="learning-home-card-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <span class="topic-copy">
          <span class="topic-zh-title">${category.zhTitle}</span>
          <span class="topic-row-title">${category.enTitle}</span>
          <span class="topic-row-meta">${category.hint}</span>
        </span>
      </button>
    `;

    card.querySelector(".learning-home-card-main").addEventListener("click", () => {
      state.expandedCategoryId = category.id;
      renderTopics();
      scrollCategorySectionIntoView(category.id);
    });
    board.appendChild(card);
  });

  topicGroupsRoot.appendChild(board);

  learningHomeCategories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "learning-category-section";
    section.id = category.id;
    section.style.setProperty("--category-accent", category.accent);
    section.innerHTML = `
      <div class="learning-category-head">
        <span class="learning-category-head-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <div>
          <h3>${category.zhTitle}</h3>
          <h4>${category.enTitle}</h4>
          <p>${category.hint}</p>
        </div>
      </div>
      <div class="category-topic-grid">
        ${category.topicIds
          .map((topicId) => topicById(topicId))
          .filter(Boolean)
          .map((topic) => {
            const meta = topicCardMeta[topic.id] ?? {};
            return `
              <a class="category-topic-card${topic.id === state.selectedTopicId ? " is-selected" : ""}" href="${topicPageUrl(window.location, topic.id)}" data-topic-id="${topic.id}">
                <span class="category-topic-zh">${meta.zhTitle ?? topic.iconText}</span>
                <span class="category-topic-en">${meta.enTitle ?? topic.title}</span>
                <span class="category-topic-hint">${meta.hint ?? topic.progressLabel}</span>
              </a>
            `;
          })
          .join("")}
      </div>
    `;

    section.querySelectorAll("[data-topic-id]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        try {
          openTopicPage(link.dataset.topicId);
        } catch (error) {
          console.error("Could not open topic in place.", error);
        }
      });
    });

    topicGroupsRoot.appendChild(section);
  });

  updateLearningCultureNav();
}

function renderBooks() {
  bookSelect.innerHTML = books
    .map((book) => `<option value="${book.id}">${book.label}</option>`)
    .join("");
  bookSelect.value = state.selectedBookId;

  const book = currentBook();
  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  lessonSelect.innerHTML = book.lessons
    .map(
      (lesson) =>
        `<option value="${lesson.lesson}">Lesson ${lesson.lesson}: ${lesson.title}</option>`
    )
    .join("");

  const activeLesson = currentLesson();
  lessonSelect.value = String(activeLesson.lesson);

  bookBrowser.innerHTML = `
    <div class="learning-home-board book-home-board">
      ${bookHomeCategories
        .map((category) => {
          const isSelected = category.id === state.selectedBookCategoryId;
          return `
            <article class="learning-home-card book-home-card${isSelected ? " is-selected" : ""}" style="--category-accent: ${category.accent};">
              <button class="learning-home-card-main" type="button" data-book-category-card="${category.id}" aria-label="Open ${category.enTitle}">
                <span class="learning-card-count">${category.bookIds.length} books</span>
                <span class="learning-home-card-icon" aria-hidden="true">
                  <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
                </span>
                <span class="topic-copy">
                  <span class="topic-zh-title">${category.zhTitle}</span>
                  <span class="topic-row-title">${category.enTitle}</span>
                  <span class="topic-row-meta">${category.hint}</span>
                </span>
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  lookupCard.innerHTML = bookHomeCategories
    .map((category) => {
      const booksInCategory = category.bookIds.map((bookId) => bookById(bookId));
      const isActiveCategory = category.id === state.selectedBookCategoryId;
      const selectedBookInCategory =
        booksInCategory.find((entry) => entry.id === state.selectedBookId) ?? booksInCategory[0];
      const selectedBookIndex = books.findIndex((entry) => entry.id === selectedBookInCategory.id);

      return `
        <section
          class="learning-category-section book-category-section${isActiveCategory ? " is-selected" : ""}"
          id="book-category-${category.id}"
          style="--category-accent: ${category.accent}; --book-accent: ${bookAccent(Math.max(selectedBookIndex, 0))};"
        >
          <div class="learning-category-head">
            <span class="learning-category-head-icon" aria-hidden="true">
              <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
            </span>
            <div>
              <h3>${category.zhTitle}</h3>
              <h4>${category.enTitle}</h4>
              <p>${category.hint}</p>
            </div>
          </div>
          <div class="book-category-grid">
            ${booksInCategory
              .map((entry) => {
                const firstTopic = topicById(entry.lessons[0]?.topicId);
                const isSelectedBook = entry.id === selectedBookInCategory.id;
                const entryIndex = books.findIndex((bookEntry) => bookEntry.id === entry.id);
                return `
                  <button
                    class="book-browser-card book-category-book-card${isSelectedBook ? " is-selected" : ""}"
                    style="--book-accent: ${bookAccent(Math.max(entryIndex, 0))}"
                    type="button"
                    data-book-browser="${entry.id}"
                  >
                    <span>${entry.label}</span>
                    <small>${entry.lessons.length} lessons</small>
                    <em>${firstTopic?.title ?? "Chinese practice"}</em>
                  </button>
                `;
              })
              .join("")}
          </div>
          <div class="book-category-lessons">
            <div class="book-category-lessons-head">
              <div>
                <span class="progress-label">Lessons</span>
                <h3>${selectedBookInCategory.label}</h3>
                <p>Pick a lesson to open the matching topic practice.</p>
              </div>
            </div>
            <div class="book-lesson-grid">
              ${selectedBookInCategory.lessons
                .map((lesson) => {
                  const lessonTopic = topicById(lesson.topicId);
                  const isSelectedLesson =
                    selectedBookInCategory.id === book.id && lesson.lesson === activeLesson.lesson;
                  return `
                    <button
                      class="book-lesson-card${isSelectedLesson ? " is-selected" : ""}"
                      type="button"
                      data-book-lesson="${selectedBookInCategory.id}:${lesson.lesson}"
                    >
                      <span>Lesson ${lesson.lesson}</span>
                      <strong>${lesson.title}</strong>
                      <small>${lessonTopic?.title ?? "Topic practice"}</small>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>
      `;
    })
    .join("");

  bookBrowser.querySelectorAll("[data-book-category-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryCard);
      if (!category) {
        return;
      }

      state.selectedBookCategoryId = category.id;
      if (!category.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(category.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      renderBooks();
      document.getElementById(`book-category-${category.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-browser]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedBook = books.find((entry) => entry.id === button.dataset.bookBrowser);
      if (!selectedBook) {
        return;
      }

      state.selectedBookCategoryId = bookCategoryForBook(selectedBook.id).id;
      state.selectedBookId = selectedBook.id;
      state.selectedLessonNumber = selectedBook.lessons[0].lesson;
      state.selectedTopicId = selectedBook.lessons[0].topicId;
      renderBooks();
      renderTopicDetail();
      document.getElementById(`book-category-${state.selectedBookCategoryId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonNumber] = button.dataset.bookLesson.split(":");
      selectBookLesson(bookId, Number(lessonNumber));
    });
  });

  renderStickyNav();
}

function updateLearningCultureNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books" && !bookPanel.classList.contains("is-hidden")) {
    const bookBoard = bookBrowser.querySelector(".book-home-board");
    const bookSections = lookupCard.querySelectorAll(".book-category-section");
    const bookNavItems = learningCultureNav.querySelectorAll("[data-book-category-target]");
    const showBookNav = bookBoard && window.scrollY > bookBoard.offsetTop + bookBoard.offsetHeight - 60;
    learningCultureNav.classList.toggle("visible", showBookNav);
    if (!showBookNav) {
      return;
    }

    let activeCategoryId = state.selectedBookCategoryId;
    const scrollY = window.scrollY + 120;
    bookSections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        activeCategoryId = section.id.replace("book-category-", "");
      }
    });

    bookNavItems.forEach((item) => {
      const isActive = item.dataset.bookCategoryTarget === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  const cardGrid = topicGroupsRoot.querySelector(".learning-home-board");
  const sections = topicGroupsRoot.querySelectorAll(".learning-category-section");
  const navItems = learningCultureNav.querySelectorAll("[data-target]");

  if (state.topicPageOpen) {
    learningCultureNav.classList.add("visible");
    const activeCategoryId = state.expandedCategoryId ?? categoryIdForTopic(state.selectedTopicId);
    navItems.forEach((item) => {
      const isActive = item.dataset.target === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  if (!cardGrid || state.currentView !== "topics" || topicPanel.classList.contains("is-hidden")) {
    learningCultureNav.classList.remove("visible");
    return;
  }

  const showNav = window.scrollY > cardGrid.offsetTop + cardGrid.offsetHeight - 60;
  learningCultureNav.classList.toggle("visible", showNav);
  if (!showNav) {
    return;
  }

  let current = "";
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.target === current;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
}

function renderFocusControls() {
  const topic = currentTopic();
  document.body.classList.toggle("is-pinyin-hidden", !state.showPinyin);
  document.body.classList.toggle("is-english-hidden", !state.showEnglish);
  const controlPairs = [
    [toggleAudioButton, state.tapAudioEnabled, "Tap sound"],
    [togglePinyinButton, state.showPinyin, "Pinyin"],
    [toggleArabicButton, state.showArabic, "Numbers"],
    [toggleEnglishButton, state.showEnglish, "English"]
  ];

  controlPairs.forEach(([button, enabled, label]) => {
    button.classList.toggle("is-toggle-active", enabled);
    button.classList.toggle("is-toggle-inactive", !enabled);
    button.textContent = `${label} ${enabled ? "on" : "off"}`;
  });

  toggleArabicButton.classList.toggle("is-hidden", topic.id !== "numbers");

  learningCultureNav?.querySelectorAll("[data-display-toggle]").forEach((button) => {
    const control = button.dataset.displayToggle;
    const enabled =
      control === "sound"
        ? state.tapAudioEnabled
        : control === "pinyin"
          ? state.showPinyin
          : state.showEnglish;
    const label = control === "sound" ? "Sound" : control === "pinyin" ? "Pinyin" : "English";
    button.classList.toggle("is-toggle-active", enabled);
    button.classList.toggle("is-toggle-inactive", !enabled);
    button.textContent = `${label} ${enabled ? "on" : "off"}`;
    button.setAttribute("aria-pressed", String(enabled));
  });
}

function renderFocusDisplay(item) {
  if (!item) {
    focusHanzi.textContent = "";
    focusPinyin.textContent = "";
    focusEnglish.textContent = "";
    return;
  }

  focusHanzi.textContent = item.hanzi;
  focusPinyin.textContent = state.showPinyin ? item.pinyin : "";
  focusEnglish.textContent = state.showEnglish ? item.english : "";
}

function bodySentenceForItem(item) {
  return {
    hanzi: `我的${item.hanzi}`,
    pinyin: `wǒ de ${item.pinyin}`,
    english: `my ${item.english}`
  };
}

function renderFocusStatus() {
  const topic = currentTopic();

  if (topic.id === "body") {
    focusStatus.textContent =
      state.lastBodyFeedback || "Tap a body word to hear it, then point to the same part.";
    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    focusStatus.textContent =
      stage.telephoneMode
        ? "Listen to the question, then the answer. Telephone numbers are for speaking and listening, not counting objects."
        : state.lastNumberFeedback || `Now learning ${stage.title}. ${stage.summary}`;
    return;
  }

  if (usesLessonTemplate(topic)) {
    focusStatus.textContent = "";
    return;
  }

  if (topic.id === "time-date") {
    focusStatus.textContent = "";
    return;
  }

  if (topic.id === "weekdays" || topic.id === "dates") {
    focusStatus.textContent = "";
    return;
  }

  focusStatus.textContent = "";
}

function selectFocusItem(itemId, options = {}) {
  const topic = currentTopic();
  const items = focusItemsForTopic(topic);
  const item = items.find((entry) => entry.id === itemId) ?? items[0];

  state.selectedFocusItemId = item.id;
  if (topic.id === "body") {
    state.lastBodyFeedback =
      options.bodyFeedback ?? `Showing ${item.hanzi}${state.showEnglish ? ` (${item.english})` : ""}.`;
  }
  renderFocusDisplay(item);
  renderFocusWordList();
  renderFocusExplorer();
  renderFocusStatus();

  if (options.playAudio && state.tapAudioEnabled) {
    speak(options.audioText ?? item.audio, 0.78);
  }
}

function renderFocusWordList() {
  if (
    ["body", "dates", "comparisons", "positions", "transport", "daily-life", "multiplication-rhyme", "identity", "stationery", "school-supplies", "classroom", "school", "school-subjects", "food", "food-preferences", "meals-feelings"].includes(currentTopic().id) ||
    (currentTopic().id === "numbers" && currentNumberStage().telephoneMode)
  ) {
    focusWordList.innerHTML = "";
    focusWordList.classList.add("is-hidden");
    return;
  }

  focusWordList.classList.remove("is-hidden");
  const topic = currentTopic();
  const items = focusItemsForTopic();
  const isLessonTemplate = usesLessonTemplate(topic);
  const showBookWordsHeading = isLessonTemplate || topic.id === "clothes" || topic.id === "time-date" || topic.id === "weekdays";
  focusWordList.classList.toggle("is-family-book-words", showBookWordsHeading);
  const visibleItems =
    topic.id === "numbers"
      ? numberWordListItems(items, currentFocusItem(), currentNumberStage())
      : topic.id === "time-date"
        ? timeDateExpressionItems
      : isLessonTemplate
        ? bookWordItemsForTopic(topic)
        : items;
  focusWordList.innerHTML = "";

  if (showBookWordsHeading) {
    const heading = document.createElement("div");
    heading.className = "family-book-words-heading";
    heading.innerHTML = `
      <p class="body-match-kicker">Book words</p>
    `;
    focusWordList.appendChild(heading);
  }

  visibleItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "focus-word-button";
    if (item.id === state.selectedFocusItemId) {
      button.classList.add("is-selected");
    }

    button.innerHTML = `
      <span class="focus-word-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="focus-word-label">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="focus-helper">${item.english}</span>` : ""}
    `;

    button.addEventListener("click", () => {
      if (topic.id === "time-date" || topic.id === "weekdays") {
        if (topic.id === "weekdays") {
          state.selectedFocusItemId = item.id;
          renderFocusWordList();
        }
        if (state.tapAudioEnabled) speak(topic.id === "weekdays" ? item.hanzi : item.audio, 0.78);
        return;
      }
      selectFocusItem(item.id, { playAudio: true });
    });

    focusWordList.appendChild(button);
  });

  const noteMarkup = usefulNoteForTopic(topic);
  if (noteMarkup) {
    const note = document.createElement("div");
    note.className = "greetings-note-card family-book-words-note";
    note.innerHTML = `
      <p class="body-match-kicker">Useful note</p>
      ${noteMarkup}
    `;
    focusWordList.appendChild(note);
  }
}

function numberWordListItems(items, currentItem, stage) {
  if (stage.end <= 10) {
    return items;
  }

  const byValue = [...items].sort((left, right) => left.value - right.value);
  const currentIndex = Math.max(
    0,
    byValue.findIndex((item) => item.id === currentItem.id)
  );
  const picked = new Map([[currentItem.id, currentItem]]);

  const offsets = [-1, 1, -2, 2];
  offsets.forEach((offset) => {
    const candidate = byValue[currentIndex + offset];
    if (candidate && picked.size < 5) {
      picked.set(candidate.id, candidate);
    }
  });

  if (picked.size < Math.min(5, byValue.length)) {
    shuffleArray(byValue).forEach((candidate) => {
      if (picked.size < Math.min(5, byValue.length)) {
        picked.set(candidate.id, candidate);
      }
    });
  }

  return shuffleArray([...picked.values()]);
}

function renderBodyLabelButton(item, align) {
  const isActive = item.id === state.selectedFocusItemId;
  return `
    <button
      class="body-label-button${isActive ? " is-active" : " is-muted"}"
      type="button"
      data-body-item-id="${item.id}"
      data-body-align="${align}"
      aria-pressed="${isActive ? "true" : "false"}"
    >
      <span class="body-label-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="body-label-pinyin">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="body-label-english">${item.english}</span>` : ""}
    </button>
  `;
}

function renderBodyExplorer() {
  ensureBodyMatchGame();
  const item = currentFocusItem();
  const sentence = bodySentenceForItem(item);
  const items = Object.fromEntries(focusItemsForTopic().map((entry) => [entry.id, entry]));
  const matchItems = Object.fromEntries(bodyMatchItems().map((entry) => [entry.id, entry]));
  const roundComplete =
    state.bodyRoundIds.length > 0 && state.bodyRoundIds.every((id) => state.bodyMatchedIds.has(id));
  const allDone =
    bodyMatchItems().length > 0 && state.bodyMatchedIds.size === bodyMatchItems().length;
  const solvedMatchIds = state.bodyChineseOrder.filter((id) => state.bodyMatchedIds.has(id));
  const remainingChineseIds = state.bodyChineseOrder.filter((id) => !state.bodyMatchedIds.has(id));
  const remainingEnglishIds = state.bodyEnglishOrder.filter((id) => !state.bodyMatchedIds.has(id));
  focusExplorer.innerHTML = `
    <div class="body-game">
      <div class="body-practice-visual">
        <div class="body-diagram">
          <div class="body-label-column body-label-column-left">
            ${bodyDiagramLayout.left.map((id) => renderBodyLabelButton(items[id], "left")).join("")}
          </div>
          <div class="body-scene">
            <div class="body-scene-card">
              <img
                class="body-scene-kid"
                src="assets/body/body-topic-kid-largehead.webp"
                alt="Cartoon child for body parts learning activity"
              />
              <div class="body-part-indicator body-part-indicator-${item.id}" aria-hidden="true"></div>
            </div>
          </div>
          <div class="body-label-column body-label-column-right">
            ${bodyDiagramLayout.right.map((id) => renderBodyLabelButton(items[id], "right")).join("")}
          </div>
        </div>
        <div class="body-match-panel">
          <div class="body-match-heading">
            <div>
              <p class="body-match-kicker">Match Game</p>
              <h4>Chinese to English</h4>
            </div>
            <div class="body-match-actions">
              <button class="small-button is-action-button" type="button" data-body-toggle-bonus aria-pressed="${state.bodyMatchIncludeBonus}">
                Bonus words ${state.bodyMatchIncludeBonus ? "on" : "off"}
              </button>
              <button class="small-button is-action-button" type="button" data-body-reset-match>
                New mix
              </button>
            </div>
          </div>
          <p class="body-match-helper">Tap a Chinese card, then tap the matching English card.</p>
          <div class="body-match-progress">
            Matched ${state.bodyMatchedIds.size} of ${bodyMatchItems().length}
          </div>
          <div class="body-match-board-headings">
            <p class="body-match-kicker">Chinese</p>
            <p class="body-match-kicker">English</p>
          </div>
          ${
            solvedMatchIds.length
              ? `
                <div class="body-match-solved-pairs">
                  ${solvedMatchIds
                    .map((id) => {
                      const matchItem = matchItems[id];
                      return `
                        <article class="body-match-solved-row">
                          <div class="body-match-card body-match-card-chinese is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="body-match-hanzi">${matchItem.hanzi}</span>
                            ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                          </div>
                          <div class="body-match-card body-match-card-english is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="body-match-english">${matchItem.english}</span>
                          </div>
                        </article>
                      `;
                    })
                    .join("")}
                </div>
              `
              : ""
          }
          ${
            remainingChineseIds.length
              ? `
                <div class="body-match-open-board">
                  <div class="body-match-column">
                    ${remainingChineseIds
              .map((id) => {
                const matchItem = matchItems[id];
                const selected = state.bodySelectedChineseId === id;
                return `
                  <button
                    class="body-match-card body-match-card-chinese${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-chinese="${id}"
                  >
                    <span class="body-match-hanzi">${matchItem.hanzi}</span>
                    ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
                  </div>
                  <div class="body-match-column">
                    ${remainingEnglishIds
              .map((id) => {
                const matchItem = matchItems[id];
                if (!matchItem) {
                  return "";
                }
                const solved = state.bodyMatchedIds.has(id);
                const selected = state.bodySelectedEnglishId === id;
                return `
                  <button
                    class="body-match-card body-match-card-english${solved ? " is-solved" : ""}${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-english="${id}"
                  >
                    <span class="body-match-english">${matchItem.english}</span>
                  </button>
                `;
              })
              .join("")}
                  </div>
                </div>
              `
              : ""
          }
          ${
            roundComplete && !allDone
              ? '<button class="small-button body-next-round" type="button" data-body-next-round>Next set</button>'
              : ""
          }
          ${
            allDone
              ? '<button class="small-button body-next-round" type="button" data-body-play-again>Play again</button>'
              : ""
          }
        </div>
        <div class="body-more-practice-card">
          <p class="body-match-kicker">More Practice</p>
          <h4>Say it with 我的</h4>
          <p class="body-sentence-hanzi">${sentence.hanzi}</p>
          ${state.showPinyin ? `<p class="body-sentence-pinyin">${sentence.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="body-sentence-english">${sentence.english}</p>` : ""}
          <p class="body-sentence-note">Tap a body word, then say the whole phrase aloud.</p>
          <div class="body-sentence-examples">
            ${["eyes", "ears", "nose", "mouth", "head", "hair", "hand", "foot"]
              .map((id) => {
                const practiceItem = items[id];
                const practiceSentence = bodySentenceForItem(practiceItem);
                const isActivePractice = item.id === id;
                return `
                  <button
                    class="body-sentence-chip${isActivePractice ? " is-active" : ""}"
                    type="button"
                    data-body-sentence-item="${id}"
                  >
                    ${practiceSentence.hanzi}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-body-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.bodyItemId, { playAudio: true });
    });
  });

  focusExplorer.querySelectorAll("[data-body-sentence-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const sentenceItemId = button.dataset.bodySentenceItem;
      const sentenceItem = items[sentenceItemId];
      if (!sentenceItem) {
        return;
      }

      selectFocusItem(sentenceItemId, {
        playAudio: true,
        audioText: bodySentenceForItem(sentenceItem).hanzi,
        bodyFeedback: `Practice saying ${bodySentenceForItem(sentenceItem).hanzi}.`
      });
    });
  });

  focusExplorer.querySelector("[data-body-toggle-bonus]")?.addEventListener("click", () => {
    state.bodyMatchIncludeBonus = !state.bodyMatchIncludeBonus;
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-reset-match]")?.addEventListener("click", () => {
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-next-round]")?.addEventListener("click", () => {
    nextBodyRound();
    state.lastBodyFeedback = "Here is the next set.";
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-play-again]")?.addEventListener("click", () => {
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelectorAll("[data-body-match-chinese]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBodyMatchChinese(button.dataset.bodyMatchChinese);
    });
  });

  focusExplorer.querySelectorAll("[data-body-match-english]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBodyMatchAttempt(button.dataset.bodyMatchEnglish);
    });
  });

}

 function schoolWordGroups(topicId = currentTopic().id) {
  const data = schoolTopicData[topicId];
  if (!data?.wordGroups) return [];
  return data.wordGroups.map((group) => ({
    ...group,
    items: group.items.map(([id, hanzi, pinyin, english, file]) => ({
      id,
      hanzi,
      pinyin,
      english,
      audio: hanzi,
      imagePath: file ? (file.startsWith("assets/") ? file : `assets/illustrated-food/${file}`) : ""
    }))
  }));
}

function sharedLessonPracticeConfig(topic) {
  if (schoolTopicData[topic.id]) {
    return {
      summary: "Listen for a school word, then match each Chinese card to its English meaning.",
      shellClass: "lesson-practice-shell",
      ensure: () => ensureSchoolPractice(topic.id),
      listen: {
        items: () => schoolPracticeItems(topic.id),
        optionIds: () => state.schoolChallengeOptionIds,
        pickedId: () => state.schoolChallengePickedId,
        result: () => state.schoolChallengeResult,
        wrongIds: () => state.schoolChallengeWrongIds,
        feedback: () => state.schoolListenFeedback,
        onPlay: handleSchoolChallengePlay,
        onGuess: handleSchoolChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: () => schoolPracticeItems(topic.id).slice(0, 6),
        phraseIds: () => state.schoolPhraseOrder,
        meaningIds: () => state.schoolMeaningOrder,
        matchedIds: () => state.schoolMatchedIds,
        selectedId: () => state.schoolSelectedPhraseId,
        feedback: () => state.schoolMatchFeedback,
        meaningLabel: (id) => schoolPracticeItems(topic.id).find((item) => item.id === id)?.english ?? "",
        onNew: () => {
          resetSchoolMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleSchoolMatchPhrase,
        onMeaning: handleSchoolMatchAttempt
      }
    };
  }

  if (topic.id === "weekdays") {
    return {
      summary: "Listen for the weekday, then match each Chinese day to its English name.",
      shellClass: "lesson-practice-shell",
      sayItems: [
        { hanzi: "今天星期几？", pinyin: "jīn tiān xīng qī jǐ?", english: "What day is it today?", audio: "今天星期几" },
        { hanzi: "今天星期一。", pinyin: "jīn tiān xīng qī yī.", english: "Today is Monday.", audio: "今天星期一" }
      ],
      ensure: () => {
        ensureWeekdayChallenge();
        ensureWeekdayMatchGame();
      },
      listen: {
        items: () => timeDateWeekItems,
        optionIds: () => state.weekdayChallengeOptionIds,
        pickedId: () => state.weekdayChallengePickedId,
        result: () => state.weekdayChallengeResult,
        wrongIds: () => state.weekdayChallengeWrongIds,
        feedback: () => state.weekdayListenFeedback,
        onPlay: handleWeekdayChallengePlay,
        onGuess: handleWeekdayChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: () => timeDateWeekItems,
        phraseIds: () => state.weekdayPhraseOrder,
        meaningIds: () => state.weekdayMeaningOrder,
        matchedIds: () => state.weekdayMatchedIds,
        selectedId: () => state.weekdaySelectedPhraseId,
        feedback: () => state.weekdayMatchFeedback,
        meaningLabel: (id) => timeDateWeekItems.find((item) => item.id === id)?.english ?? "",
        onNew: () => {
          resetWeekdayMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleWeekdayMatchPhrase,
        onMeaning: handleWeekdayMatchAttempt
      }
    };
  }

  if (topic.id === "family") {
    return {
      summary: "Practice the three core family sentences, then sort sibling and parent words by who they name.",
      ensure: () => {
        ensureFamilyChallenge();
        ensureFamilyMatchGame();
      },
      listen: {
        items: familyGameItems,
        optionIds: () => state.familyChallengeOptionIds,
        pickedId: () => state.familyChallengePickedId,
        result: () => state.familyChallengeResult,
        wrongIds: () => state.familyChallengeWrongIds,
        feedback: () => state.familyListenFeedback,
        onPlay: handleFamilyChallengePlay,
        onGuess: handleFamilyChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Family member",
        meaningCardClass: "family-match-card",
        items: familyGameItems,
        phraseIds: () => state.familyPhraseOrder,
        meaningIds: () => state.familyMeaningOrder,
        matchedIds: () => state.familyMatchedIds,
        selectedId: () => state.familySelectedPhraseId,
        feedback: () => state.familyMatchFeedback,
        meaningLabel: (id) => familyPersonForItemId(id)?.label ?? "",
        meaningContent: (id) => {
          const person = familyPersonForItemId(id);
          if (!person) {
            return "";
          }
          return `
            <span class="family-match-avatar"><img class="family-match-avatar-image family-match-avatar-image-headshot" src="${familyHeadshotForItemId(id)}" alt="${person.label}" /></span>
            <span class="family-match-copy">
              <span class="match-answer-label">${person.label}</span>
            </span>
          `;
        },
        onNew: () => {
          resetFamilyMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleFamilyMatchPhrase,
        onMeaning: handleFamilyMatchAttempt
      }
    };
  }

  if (topic.id === "greetings") {
    return {
      summary: "Listen, choose the matching greeting, then match each line to its situation.",
      shellClass: "lesson-practice-shell",
      ensure: () => {
        ensureGreetingsChallenge();
        ensureGreetingsMatchGame();
      },
      listen: {
        items: greetingsGameItems,
        optionIds: () => state.greetingsChallengeOptionIds,
        pickedId: () => state.greetingsChallengePickedId,
        result: () => state.greetingsChallengeResult,
        wrongIds: () => state.greetingsChallengeWrongIds,
        feedback: () => state.greetingsListenFeedback,
        onPlay: handleGreetingsChallengePlay,
        onGuess: handleGreetingsChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Situation",
        items: greetingsGameItems,
        phraseIds: () => state.greetingsPhraseOrder,
        meaningIds: () => state.greetingsMeaningOrder,
        matchedIds: () => state.greetingsMatchedIds,
        selectedId: () => state.greetingsSelectedPhraseId,
        feedback: () => state.greetingsMatchFeedback,
        meaningLabel: greetingsMeaningLabel,
        onNew: () => {
          resetGreetingsMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleGreetingsMatchPhrase,
        onMeaning: handleGreetingsMatchAttempt
      }
    };
  }

  if (topic.id === "polite-words") {
    return {
      summary: "Listen, choose the matching polite phrase, then match each phrase to its meaning.",
      shellClass: "lesson-practice-shell",
      ensure: () => {
        ensurePoliteChallenge();
        ensurePoliteMatchGame();
      },
      listen: {
        items: politeGameItems,
        optionIds: () => state.politeChallengeOptionIds,
        pickedId: () => state.politeChallengePickedId,
        result: () => state.politeChallengeResult,
        wrongIds: () => state.politeChallengeWrongIds,
        feedback: () => state.politeListenFeedback,
        onPlay: handlePoliteChallengePlay,
        onGuess: handlePoliteChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Meaning",
        items: politeGameItems,
        phraseIds: () => state.politePhraseOrder,
        meaningIds: () => state.politeMeaningOrder,
        matchedIds: () => state.politeMatchedIds,
        selectedId: () => state.politeSelectedPhraseId,
        feedback: () => state.politeMatchFeedback,
        meaningLabel: politeMeaningLabel,
        onNew: () => {
          resetPoliteMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handlePoliteMatchPhrase,
        onMeaning: handlePoliteMatchAttempt
      }
    };
  }

  if (topic.id === "dates") {
    return {
      summary: "Listen for a date or celebration, then match months to their English names.",
      shellClass: "lesson-practice-shell",
      sayItems: [
        { hanzi: "今天几月几号？", pinyin: "jīn tiān jǐ yuè jǐ hào?", english: "What is the date today?", audio: "今天几月几号" },
        { hanzi: "今天五月二十号。", pinyin: "jīn tiān wǔ yuè èr shí hào.", english: "Today is May twentieth.", audio: "今天五月二十号" },
        { hanzi: "五月二十号 = 五月二十日。", pinyin: "wǔ yuè èr shí hào = wǔ yuè èr shí rì.", english: "Both mean May twentieth.", audio: "五月二十号五月二十日" }
      ],
      ensure: () => {
        ensureDateChallenge();
        ensureDateMatchGame();
      },
      listen: {
        items: () => datePracticeItems,
        optionIds: () => state.dateChallengeOptionIds,
        pickedId: () => state.dateChallengePickedId,
        result: () => state.dateChallengeResult,
        wrongIds: () => state.dateChallengeWrongIds,
        feedback: () => state.dateListenFeedback,
        onPlay: handleDateChallengePlay,
        onGuess: handleDateChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: () => timeDateMonthItems.filter((item) => state.datePhraseOrder.includes(item.id)),
        phraseIds: () => state.datePhraseOrder,
        meaningIds: () => state.dateEventOrder,
        matchedIds: () => state.dateMatchedIds,
        selectedId: () => state.dateSelectedPhraseId,
        feedback: () => state.dateMatchFeedback,
        meaningLabel: (id) => timeDateMonthItems.find((item) => item.id === id)?.english ?? "",
        onNew: () => {
          resetDateMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleDateMatchPhrase,
        onMeaning: handleDateMatchEvent
      }
    };
  }

  return null;
}

function renderActivityPanel(topic) {
  topicColumns?.classList.remove("is-hidden");
  activityPanelSummary.hidden = false;

  if (topic.id === "body") {
    topicColumns?.classList.add("is-hidden");
    activityPanelTitle.textContent = "";
    activityPanelSummary.textContent = "";
    activityList.innerHTML = "";
    return;
  }

  if (schoolTopicData[topic.id]) {
    renderSchoolPractice(topic);
    return;
  }

  const sharedPracticeConfig = sharedLessonPracticeConfig(topic);
  if (sharedPracticeConfig) {
    renderSharedLessonPractice(topic, sharedPracticeConfig);
    return;
  }

  if (topic.id === "daily-life") {
    ensureRoomBuilder();
    const prompt = currentRoomBuildItem();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell room-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div></div>
        <figure class="clothes-quiz-visual room-build-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.roomBuildResult}">
          ${state.roomBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.roomBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          ${state.roomBuildSelectedTokens.length ? state.roomBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.roomBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-room-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-room-build-clear>Clear</button>${state.roomBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-room-build-next>Next picture</button>' : ""}</div>
      </section>
      ${renderPracticeSayCards([
        { hanzi: "地上有书。", pinyin: "dì shàng yǒu shū.", english: "There is a book on the floor.", audio: "地上有书" }
      ])}
    `;
    activityList.querySelectorAll("[data-room-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleRoomBuildToken(Number(button.dataset.roomBuildToken)));
    });
    activityList.querySelector("[data-room-build-clear]")?.addEventListener("click", clearRoomBuilder);
    activityList.querySelector("[data-room-build-next]")?.addEventListener("click", nextRoomBuilder);
    bindPracticeSayCards(activityList);
    return;
  }

  if (topic.id === "comparisons") {
    ensureComparisonBuilder();
    const prompt = currentComparisonBuildItem();
    const visual = visualTopicItems.comparisons.find((item) => item.id === prompt.id);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Complete the sentence with the matching comparison words.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell comparison-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Complete the sentence</p><p class="numbers-game-note">Tap the two word cards in the order that completes the sentence.</p></div></div>
        <figure class="clothes-quiz-visual comparison-quiz-visual"><img class="clothes-quiz-image" src="${visual.imagePath}" alt="${visual.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target comparison-build-target is-${state.comparisonBuildResult}">
          ${state.comparisonBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.comparisonBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          <span>${prompt.before}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[0] ?? ""}</span>
          <span>${prompt.between}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[1] ?? ""}</span>
          <span>${prompt.after}</span>
        </div>
        <div class="intro-build-choices">
          ${state.comparisonBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-comparison-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-comparison-build-clear>Clear</button>${state.comparisonBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-comparison-build-next>Next picture</button>' : ""}</div>
      </section>
    `;
    activityList.querySelectorAll("[data-comparison-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleComparisonBuildToken(Number(button.dataset.comparisonBuildToken)));
    });
    activityList.querySelector("[data-comparison-build-clear]")?.addEventListener("click", clearComparisonBuilder);
    activityList.querySelector("[data-comparison-build-next]")?.addEventListener("click", nextComparisonBuilder);
    return;
  }

  if (topic.id === "positions") {
    ensurePositionQuiz();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Play the audio, then choose the matching Chinese sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell position-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Listen and choose</p><p class="numbers-game-note">Play the audio, then tap the matching Chinese sentence.</p></div><button class="small-button is-action-button" type="button" data-position-quiz-play>Play audio</button></div>
        <div class="clothes-quiz-options">
          ${state.positionQuizOptionIds.map((itemId) => {
            const item = positionPracticeItems.find((entry) => entry.id === itemId);
            const isSelected = state.positionQuizSelectedId === itemId;
            const resultClass = isSelected ? ` is-${state.positionQuizResult}` : "";
            const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.positionQuizResult === "correct" ? "✓" : "×"}</span>` : "";
            return `<button class="clothes-quiz-option${resultClass}" type="button" data-position-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
          }).join("")}
        </div>
        ${state.positionQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-position-quiz-next>Next sentence</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "书架在桌子左边。", pinyin: "shū jià zài zhuō zi zuǒ biān.", english: "The bookshelf is to the left of the desk.", audio: "书架在桌子左边" },
        { hanzi: "椅子在女孩后面。", pinyin: "yǐ zi zài nǚ hái hòu miàn.", english: "The chair is behind the girl.", audio: "椅子在女孩后面" }
      ])}
    `;
    activityList.querySelectorAll("[data-position-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => handlePositionQuizPick(button.dataset.positionQuizPick));
    });
    activityList.querySelector("[data-position-quiz-play]")?.addEventListener("click", handlePositionQuizPlay);
    activityList.querySelector("[data-position-quiz-next]")?.addEventListener("click", nextPositionQuizQuestion);
    bindPracticeSayCards(activityList);
    return;
  }

  if (topic.id === "transport") {
    ensureTransportBuilder();
    const prompt = currentTransportBuildItem();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell transport-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div></div>
        <figure class="clothes-quiz-visual transport-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.transportBuildResult}">
          ${state.transportBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.transportBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          ${state.transportBuildSelectedTokens.length ? state.transportBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.transportBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-transport-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-transport-build-clear>Clear</button>${state.transportBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-transport-build-next>Next picture</button>' : ""}</div>
      </section>
    `;
    activityList.querySelectorAll("[data-transport-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleTransportBuildToken(Number(button.dataset.transportBuildToken)));
    });
    activityList.querySelector("[data-transport-build-clear]")?.addEventListener("click", clearTransportBuilder);
    activityList.querySelector("[data-transport-build-next]")?.addEventListener("click", nextTransportBuilder);
    return;
  }

  if (topic.id === "time-date" && activeTimeDateSection() === "clock") {
    ensureClockQuiz();
    const answerId = state.clockQuizOrder[state.clockQuizIndex];
    const prompt = timeDateClockItems.find((item) => item.id === answerId);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the clock, then choose the matching Chinese time.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture choice</p><p class="numbers-game-note">Tap the Chinese time that matches the clock.</p></div></div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="clothes-quiz-options">
          ${state.clockQuizOptionIds
            .map((itemId) => {
              const item = timeDateClockItems.find((entry) => entry.id === itemId);
              const isSelected = state.clockQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.clockQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clockQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-clock-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
        ${state.clockQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-clock-quiz-next>Next clock</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "几点了？", pinyin: "jǐ diǎn le?", english: "What time is it?", audio: "几点了" },
        { hanzi: "现在七点零五分。", pinyin: "xiàn zài qī diǎn líng wǔ fēn.", english: "It is 7:05 now.", audio: "现在七点零五分" },
        { hanzi: "七点一刻 = 七点十五分。", pinyin: "qī diǎn yī kè = qī diǎn shí wǔ fēn.", english: "7:15", audio: "七点一刻七点十五分" }
      ])}
    `;
    activityList.querySelectorAll("[data-clock-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => handleClockQuizPick(button.dataset.clockQuizPick));
    });
    activityList.querySelector("[data-clock-quiz-next]")?.addEventListener("click", nextClockQuizQuestion);
    bindPracticeSayCards(activityList);
    return;
  }

  if (topic.id === "time-date") {
    ensureTimeRoutineQuiz();
    const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
    const prompt = timeDateRoutineItems.find((item) => item.id === answerId);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the routine picture, then choose the matching Chinese sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese sentence that matches the picture.</p>
          </div>
        </div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" />
        </figure>
        <div class="clothes-quiz-options">
          ${state.timeRoutineQuizOptionIds
            .map((itemId) => {
              const item = timeDateRoutineItems.find((entry) => entry.id === itemId);
              const isSelected = state.timeRoutineQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.timeRoutineQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.timeRoutineQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-time-routine-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
        ${state.timeRoutineQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-time-routine-quiz-next>Next picture</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "你每天几点起床？", pinyin: "nǐ měi tiān jǐ diǎn qǐ chuáng?", english: "What time do you get up every day?", audio: "你每天几点起床" },
        { hanzi: "我每天七点起床。", pinyin: "wǒ měi tiān qī diǎn qǐ chuáng.", english: "I get up at seven every day.", audio: "我每天七点起床" },
        { hanzi: "刷牙、梳头、穿校服、穿鞋子。", pinyin: "shuā yá, shū tóu, chuān xiào fú, chuān xié zi.", english: "Brush teeth, comb hair, put on a school uniform, put on shoes.", audio: "刷牙梳头穿校服穿鞋子" }
      ])}
    `;

    activityList.querySelectorAll("[data-time-routine-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        handleTimeRoutineQuizPick(button.dataset.timeRoutineQuizPick);
      });
    });
    activityList.querySelector("[data-time-routine-quiz-next]")?.addEventListener("click", nextTimeRoutineQuizQuestion);
    bindPracticeSayCards(activityList);
    return;
  }

  if (topic.id === "clothes") {
    ensureClothesQuiz();
    const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
    const prompt = clothesMatchItems.find((item) => item.id === answerId);

    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the picture, then choose the matching Chinese word.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese word that matches the picture.</p>
          </div>
        </div>
        <figure class="clothes-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" />
        </figure>
        <div class="clothes-quiz-options">
          ${state.clothesQuizOptionIds
            .map((itemId) => {
              const item = clothesMatchItems.find((entry) => entry.id === itemId);
              const isSelected = state.clothesQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.clothesQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clothesQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-clothes-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
        ${
          state.clothesQuizResult === "correct"
            ? `<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-clothes-quiz-next>Next picture</button></div>`
            : ""
        }
      </section>
    `;

    activityList.querySelectorAll("[data-clothes-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        handleClothesQuizPick(button.dataset.clothesQuizPick);
      });
    });
    activityList.querySelector("[data-clothes-quiz-next]")?.addEventListener("click", nextClothesQuizQuestion);
    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    if (stage.telephoneMode) {
      topicColumns?.classList.add("is-hidden");
      activityPanelTitle.textContent = "";
      activityPanelSummary.textContent = "";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      return;
    }

    const challengeItem = buildNumberItem(state.numberChallengeTargetValue ?? stage.start);
    ensureMathChallenge();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Practice seeing quantities quickly, then solve one small number sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Quick Game</p>
          <h4>How many do you see?</h4>
        </div>
        <button class="small-button is-action-button" type="button" data-number-game-refresh>Try another</button>
      </div>
      <p class="numbers-game-note">The quantity changes each round, so kids do not always count in order from one.</p>
      <div class="numbers-game-visual">
        ${renderNumberVisual(challengeItem.value, stage)}
      </div>
      <div class="numbers-game-options">
        ${state.numberChallengeOptionValues
          .map((value) => {
            const option = buildNumberItem(value);
            return `
              <button class="numbers-game-option" type="button" data-number-game-guess="${value}">
                <span class="numbers-game-hanzi">${option.hanzi}</span>
                ${state.showArabic ? `<span class="numbers-game-arabic">${option.value}</span>` : ""}
                ${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}
                ${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
    activityList.appendChild(gameCard);

    const mathCard = document.createElement("section");
    mathCard.className = "numbers-game-card";
    const displayAnswer = state.mathChallengeSolved ? state.mathChallengeAnswer : state.mathChallengeInput;
    const operatorSymbol = state.mathChallengeOperator;
    const operatorChinese = state.mathChallengeOperator === "+" ? "加" : "减";
    mathCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Mini Math</p>
        </div>
      </div>
      <p class="numbers-game-note">Type the answer and press Enter. After a correct answer, listen first, then move to the next question.</p>
      <form class="math-game-form" data-math-game-form>
        <div class="math-game-equation-wrap">
          <div class="math-game-equation">
            <span>${state.mathChallengeLeft}</span>
            <span>${operatorSymbol}</span>
            <span>${state.mathChallengeRight}</span>
            <span>=</span>
            <input
              id="math-game-input"
              class="math-game-input"
              type="text"
              inputmode="numeric"
              maxlength="3"
              autocomplete="off"
              value="${displayAnswer ?? ""}"
              ${state.mathChallengeSolved ? "disabled" : ""}
            />
          </div>
          <div class="math-game-chinese">
            <span>${numberHanzi(state.mathChallengeLeft)}</span>
            <span>${operatorChinese}</span>
            <span>${numberHanzi(state.mathChallengeRight)}</span>
            <span>等于</span>
            <span>${state.mathChallengeSolved ? numberHanzi(state.mathChallengeAnswer) : "?"}</span>
          </div>
        </div>
      </form>
      <p class="numbers-game-note">This stage uses numbers up to ${stage.end}.</p>
      <p class="math-game-feedback">${state.lastMathFeedback}</p>
      ${
        state.mathChallengeSolved
          ? '<button class="small-button is-action-button math-game-next" type="button" data-math-game-next>Next question</button>'
          : ""
      }
    `;
    activityList.appendChild(mathCard);

    activityList.querySelector("[data-number-game-refresh]")?.addEventListener("click", () => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(topic);
      renderFocusStatus();
    });

    activityList.querySelectorAll("[data-number-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleNumberChallengeGuess(Number(button.dataset.numberGameGuess));
      });
    });

    activityList.querySelector("[data-math-game-next]")?.addEventListener("click", () => {
      resetMathChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-math-game-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = activityList.querySelector("#math-game-input");
      handleMathChallengeSubmit(input?.value ?? "");
    });
    return;
  }

  if (topic.id === "introductions") {
    ensureIntroductionsBuilder();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the two core introduction patterns, then say your own name.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const buildTarget = introductionsBuildTarget();
    const gameCard = document.createElement("section");
    gameCard.className = "family-practice-shell";
    gameCard.innerHTML = `
      <div class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Build the sentence</p>
            <p class="numbers-game-note">Tap the word pieces in order.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-intro-build-new>New phrase</button>
        </div>
        ${state.lastIntroductionsFeedback ? `<p class="greetings-game-feedback">${state.lastIntroductionsFeedback}</p>` : ""}
        <div class="intro-build-target">
          <p class="body-match-kicker">Sentence</p>
          <div class="intro-build-selected">
            ${state.introductionsBuildSelectedTokens.length ? state.introductionsBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
          </div>
          <p class="numbers-game-english">${buildTarget.english}</p>
        </div>
        <div class="intro-build-choices">
          ${state.introductionsBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-intro-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions">
          <button class="small-button" type="button" data-intro-build-clear>Clear</button>
        </div>
        <div class="intro-character-grid" aria-label="Friends">
          ${Object.values(illustratedKids)
            .map(
              (kid) => `
                <button class="intro-character-card" type="button" data-intro-character="${kid.id}">
                  <div class="intro-character-portrait">
                    <img class="intro-character-image intro-character-image-${kid.id}" src="${kid.path}" alt="${kid.label}" />
                  </div>
                  <span class="intro-character-hanzi">${kid.hanziName}</span>
                  <span class="intro-character-label">${kid.label}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-intro-build-new]")?.addEventListener("click", () => {
      resetIntroductionsBuilder();
      renderActivityPanel(topic);
    });
    activityList.querySelector("[data-intro-build-clear]")?.addEventListener("click", () => {
      handleIntroductionsBuildClear();
    });
    activityList.querySelectorAll("[data-intro-build-token]").forEach((button) => {
      button.addEventListener("click", () => {
        handleIntroductionsBuildToken(Number(button.dataset.introBuildToken));
      });
    });
    activityList.querySelectorAll("[data-intro-character]").forEach((button) => {
      button.addEventListener("click", () => {
        const kid = illustratedKids[button.dataset.introCharacter];
        if (kid && state.tapAudioEnabled) {
          speak(`我叫${kid.hanziName}`, 0.78);
        }
      });
    });

    return;
  }

  if (topic.id === "age") {
    ensureAgeChallenge();
    ensureAgeBuilder();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Practice age first, then add the grade-level question from the same Book 1A identity lesson.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const buildTarget = ageBuildTarget();
    const gameCard = document.createElement("section");
    gameCard.className = "family-practice-shell";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which line did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-game-play>Play audio</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching age or grade question or answer.</p>
          ${state.lastAgeFeedback ? `<p class="greetings-game-feedback">${state.lastAgeFeedback}</p>` : ""}
          <div class="numbers-game-options">
            ${state.ageChallengeOptionIds
              .map((id) => {
                const item = ageGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                return `
                  <button class="numbers-game-option greetings-game-option" type="button" data-age-game-guess="${item.id}">
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Build the phrase</p>
              <h4>${buildTarget.prompt}</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-build-new>New phrase</button>
          </div>
          <p class="numbers-game-note">Tap the word pieces in order to build the sentence.</p>
          <div class="intro-build-target">
            <p class="body-match-kicker">Sentence</p>
            <div class="intro-build-selected">
              ${
                state.ageBuildSelectedTokens.length
                  ? state.ageBuildSelectedTokens
                      .map((token) => `<span class="intro-build-chip is-selected">${token}</span>`)
                      .join("")
                  : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'
              }
            </div>
            <p class="numbers-game-english">${buildTarget.english}</p>
          </div>
          <div class="intro-build-choices">
            ${state.ageBuildAvailableTokens
              .map(
                (token, index) => `
                  <button class="intro-build-chip" type="button" data-age-build-token="${index}">
                    ${token}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="intro-build-actions">
            <button class="small-button" type="button" data-age-build-clear>Clear</button>
          </div>
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-age-game-play]")?.addEventListener("click", () => {
      handleAgeChallengePlay();
    });

    activityList.querySelectorAll("[data-age-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeChallengeGuess(button.dataset.ageGameGuess);
      });
    });

    activityList.querySelector("[data-age-build-new]")?.addEventListener("click", () => {
      resetAgeBuilder();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-age-build-clear]")?.addEventListener("click", () => {
      handleAgeBuildClear();
    });

    activityList.querySelectorAll("[data-age-build-token]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeBuildToken(Number(button.dataset.ageBuildToken));
      });
    });

    return;
  }

  topicColumns?.classList.add("is-hidden");
  activityPanelTitle.textContent = "";
  activityPanelSummary.textContent = "";
  activityList.innerHTML = "";
}

function renderDefaultExplorer() {
  focusExplorer.innerHTML = "";
}

function renderMultiplicationExplorer() {
  const items = focusItemsForTopic();
  const activeItem = currentFocusItem();
  const itemByPair = new Map(items.map((item) => [`${item.first}-${item.second}`, item]));

  focusExplorer.innerHTML = `
    <div class="multiplication-board">
      <div class="numbers-stage-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Chinese math rhythm</p>
            <h4>九九乘法口诀</h4>
            <p>Tap a cell in the matrix. First see the multiplication fact, then hear and read the Chinese rhyme line.</p>
          </div>
          <div class="multiplication-playback-controls">
            <button class="small-button is-action-button" type="button" data-multiplication-play-all>Play</button>
            <button class="small-button" type="button" data-multiplication-pause disabled>Pause</button>
            <button class="small-button" type="button" data-multiplication-stop disabled>Stop</button>
          </div>
        </div>
      </div>
      <div class="multiplication-matrix-card">
        <div class="multiplication-matrix">
          <div class="multiplication-corner"></div>
          ${Array.from({ length: 9 }, (_, index) => index + 1)
            .map((value) => `<div class="multiplication-header">${value}</div>`)
            .join("")}
          ${Array.from({ length: 9 }, (_, rowIndex) => rowIndex + 1)
            .map((rowValue) => {
              const rowHeader = `<div class="multiplication-header">${rowValue}</div>`;
              const cells = Array.from({ length: 9 }, (_, colIndex) => colIndex + 1)
                .map((colValue) => {
                  if (colValue < rowValue) {
                    return '<div class="multiplication-cell multiplication-cell-empty"></div>';
                  }
                  const item = itemByPair.get(`${rowValue}-${colValue}`);
                  const isActive = item?.id === activeItem.id;
                  return `
                    <button
                      class="multiplication-cell${isActive ? " is-active" : ""}"
                      type="button"
                      data-multiplication-item="${item?.id ?? ""}"
                    >
                      <span class="multiplication-cell-fact">${rowValue}×${colValue}</span>
                      <span class="multiplication-cell-product">=${item?.product ?? ""}</span>
                    </button>
                  `;
                })
                .join("");
              return rowHeader + cells;
            })
            .join("")}
        </div>
      </div>
      <div class="multiplication-detail-card">
        <p class="body-match-kicker">Selected line</p>
        <p class="multiplication-line-hanzi">${activeItem.hanzi}</p>
        ${state.showPinyin ? `<p class="multiplication-line-pinyin">${activeItem.pinyin}</p>` : ""}
        ${state.showEnglish ? `<p class="multiplication-line-english">${activeItem.english}</p>` : ""}
        <button class="small-button is-action-button" type="button" data-multiplication-item="${activeItem.id}">Play audio</button>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-multiplication-item]").forEach((button) => {
    button.addEventListener("click", () => {
      stopMultiplicationRhyme();
      selectFocusItem(button.dataset.multiplicationItem, { playAudio: true });
    });
  });

  focusExplorer.querySelector("[data-multiplication-play-all]")?.addEventListener("click", () => {
    playMultiplicationRhyme(items, focusExplorer);
  });
  focusExplorer.querySelector("[data-multiplication-pause]")?.addEventListener("click", () => {
    toggleMultiplicationPause();
  });
  focusExplorer.querySelector("[data-multiplication-stop]")?.addEventListener("click", () => {
    stopMultiplicationRhyme();
  });
}

function playMultiplicationRhyme(items, container) {
  if (!state.tapAudioEnabled || !("speechSynthesis" in window)) {
    return;
  }

  stopMultiplicationRhyme();
  multiplicationPlaybackToken += 1;
  const playbackToken = multiplicationPlaybackToken;
  let index = 0;
  multiplicationPlaybackPaused = false;
  multiplicationPlaybackContainer = container;
  updateMultiplicationPlaybackControls(container);

  const playNext = () => {
    if (playbackToken !== multiplicationPlaybackToken || index >= items.length) {
      finishMultiplicationRhyme(container, playbackToken);
      return;
    }

    const item = items[index];
    index += 1;
    container.querySelectorAll(".multiplication-cell").forEach((cell) => {
      cell.classList.toggle("is-playing", cell.dataset.multiplicationItem === item.id);
    });

    const utterance = chineseUtterance(item.audio, 0.72);
    utterance.onend = () => window.setTimeout(playNext, 140);
    window.speechSynthesis.speak(utterance);
  };

  playNext();
}

function toggleMultiplicationPause() {
  if (!multiplicationPlaybackContainer || !("speechSynthesis" in window)) {
    return;
  }

  multiplicationPlaybackPaused = !multiplicationPlaybackPaused;
  if (multiplicationPlaybackPaused) {
    window.speechSynthesis.pause();
  } else {
    window.speechSynthesis.resume();
  }
  updateMultiplicationPlaybackControls(multiplicationPlaybackContainer);
}

function stopMultiplicationRhyme() {
  multiplicationPlaybackToken += 1;
  multiplicationPlaybackPaused = false;
  window.speechSynthesis?.cancel();

  const container = multiplicationPlaybackContainer;
  multiplicationPlaybackContainer = null;
  if (container) {
    container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => {
      cell.classList.remove("is-playing");
    });
    updateMultiplicationPlaybackControls(container);
  }
}

function finishMultiplicationRhyme(container, playbackToken) {
  if (playbackToken !== multiplicationPlaybackToken) {
    return;
  }
  container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => {
    cell.classList.remove("is-playing");
  });
  multiplicationPlaybackPaused = false;
  multiplicationPlaybackContainer = null;
  updateMultiplicationPlaybackControls(container);
}

function updateMultiplicationPlaybackControls(container) {
  const isPlaying = multiplicationPlaybackContainer === container;
  const pauseButton = container.querySelector("[data-multiplication-pause]");
  const stopButton = container.querySelector("[data-multiplication-stop]");
  if (pauseButton) {
    pauseButton.disabled = !isPlaying;
    pauseButton.textContent = multiplicationPlaybackPaused ? "Resume" : "Pause";
  }
  if (stopButton) {
    stopButton.disabled = !isPlaying;
  }
}

function renderNumberVisual(value, stage) {
  if (value === 0) {
    return '<p class="numbers-visual-note">Start with zero for phone-number reading.</p>';
  }

  const emojis = stage.visualEmojis?.length ? stage.visualEmojis : ["⭐"];
  const chosenEmoji = emojis[(Math.max(value, 1) - 1) % emojis.length];
  const objectMarkup = (count) =>
    Array.from(
      { length: count },
      () => `<span class="numbers-object">${chosenEmoji}</span>`
    ).join("");

  if (value <= 20) {
    const groups = [];
    let remaining = value;
    while (remaining > 0) {
      groups.push(Math.min(5, remaining));
      remaining -= 5;
    }

    return groups
      .map(
        (count) => `
          <div class="numbers-object-group">
            ${objectMarkup(count)}
          </div>
        `
      )
      .join("");
  }

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return `
    <div class="numbers-bundle-row">
      ${Array.from(
        { length: tens },
        () => `
          <div class="numbers-bundle-card">
            <span class="numbers-bundle-emoji">${chosenEmoji}</span>
            <span class="numbers-bundle-count">× 10</span>
          </div>
        `
      ).join("")}
    </div>
    ${
      ones
        ? `
          <div class="numbers-object-group">
            ${objectMarkup(ones)}
          </div>
        `
        : ""
    }
  `;
}

function renderNumbersExplorer() {
  ensureNumberChallenge();
  const stage = currentNumberStage();
  if (stage.telephoneMode) {
    renderTelephoneExplorer(stage);
    return;
  }
  const item = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="numbers-showcase-card">
        <div class="numbers-showcase-copy">
          <p class="body-match-kicker">Current number</p>
          <div class="numbers-current-line">
            <p class="numbers-hanzi">${item.hanzi}</p>
            <p class="numbers-arabic${state.showArabic ? "" : " is-hidden"}">${item.value}</p>
          </div>
        </div>
        <div class="numbers-count-board">
          ${renderNumberVisual(item.value, stage)}
        </div>
      </div>
    </div>
  `;
}

function renderTelephoneExplorer(stage) {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="telephone-scene-card">
        <div class="telephone-scene-people">
          <article class="telephone-bubble telephone-bubble-question">
            <div class="telephone-figure-card telephone-figure-card-left" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.anan.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Ask</p>
              <p class="telephone-line-hanzi">${telephonePractice.question.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.question.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.question.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="question">Play audio</button>
            </div>
          </article>
          <article class="telephone-bubble telephone-bubble-answer">
            <div class="telephone-figure-card telephone-figure-card-right" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.tiantian.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Answer</p>
              <p class="telephone-line-hanzi">${telephonePractice.answer.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.answer.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.answer.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="answer">Play audio</button>
            </div>
          </article>
        </div>
        <div class="telephone-number-strip">
          <p class="body-match-kicker">Listen to the digits</p>
          <div class="telephone-digit-row">
            ${telephonePractice.digits
              .map(
                (digit) => `
                  <button class="telephone-digit-chip" type="button" data-telephone-digit="${digit}">
                    ${digit}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-telephone-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const line = button.dataset.telephonePlay === "question" ? telephonePractice.question : telephonePractice.answer;
      if (state.tapAudioEnabled) {
        speak(line.audio, 0.78);
      }
      focusStatus.textContent = button.dataset.telephonePlay === "question"
        ? "Listen to the question first, then listen for the answer."
        : "Listen to the answer and notice how each digit is said one by one.";
    });
  });

  focusExplorer.querySelectorAll("[data-telephone-digit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) {
        speak(button.dataset.telephoneDigit, 0.78);
      }
      focusStatus.textContent = `Practice the digit ${button.dataset.telephoneDigit} by itself.`;
    });
  });
}

function renderSchoolExplorer(topicId) {
  const topic = currentTopic();
  const data = schoolTopicData[topicId];
  if (!data) {
    renderDefaultExplorer();
    return;
  }
  const sceneGroups = data.sceneGroups ?? [{ id: "all", items: data.scenes ?? [] }];
  const wordGroups = schoolWordGroups(topicId);
  if (topicId === "meals-feelings" && !wordGroups.some((group) => group.id === state.mealsWordGroupId)) {
    state.mealsWordGroupId = wordGroups[0]?.id ?? "";
  }
  const visibleWords = topicId === "food"
    ? foodBookWordItems(data)
    : topicId === "meals-feelings"
      ? wordGroups.find((group) => group.id === state.mealsWordGroupId)?.items ?? []
      : data.words;

  focusExplorer.innerHTML = `
    <div class="time-date-board school-topic-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      ${sceneGroups.map((group) => `
        <section class="school-lesson-section is-${group.id}">
          ${group.label ? `<p class="body-match-kicker school-lesson-heading">${group.label}</p>` : ""}
          <div class="school-scene-grid${group.items.length === 1 ? " is-single" : ""}">
            ${group.items.map((scene) => `
              <section class="greetings-exchange school-scene-card">
                <div class="greetings-exchange-top">${scene.label ? `<div><p class="body-match-kicker">${scene.label}</p></div>` : "<span></span>"}<button class="small-button is-action-button" type="button" data-school-play-scene="${scene.id}">Play scene</button></div>
                <div class="school-scene-layout${topicId === "food" ? " is-compact" : ""}">
                  <img class="school-scene-image" src="${scene.imagePath}" alt="${scene.english ?? scene.lines?.[0]?.english ?? ""}" />
                  <div class="greetings-line-stack${scene.compactLines ? " is-compact" : ""}">
                    ${(scene.lines ?? [scene]).map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `).join("")}
          </div>
        </section>
      `).join("")}
      ${data.showWords !== false ? `
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        ${topicId === "food" ? `<div class="food-book-tabs" role="tablist" aria-label="Food word categories">${Object.entries(foodCategoryGroups).map(([id, group]) => `<button class="food-book-tab${state.foodBookCategoryId === id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.foodBookCategoryId === id}" data-food-book-category="${id}">${group.hanzi}${state.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        ${topicId === "meals-feelings" && wordGroups.length > 1 ? `<div class="food-book-tabs lesson-word-tabs" role="tablist" aria-label="Meals and feelings word categories">${wordGroups.map((group) => `<button class="food-book-tab${state.mealsWordGroupId === group.id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.mealsWordGroupId === group.id}" data-meals-word-group="${group.id}">${group.hanzi}${state.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        <div class="school-word-grid${topicId === "school-subjects" ? " is-text-only" : ""}${topicId === "meals-feelings" ? " is-uniform-images" : ""}">
          ${visibleWords.map((item) => `
            <button class="school-word-card" type="button" data-school-word="${item.id}">
              ${item.imagePath ? `<img class="school-word-image" src="${item.imagePath}" alt="${item.english}" />` : ""}
              <span class="time-asset-hanzi">${item.hanzi}</span>
              ${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
              ${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${data.review ? `<section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid">${data.review.map((item) => `<article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${item.pattern}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${item.english}</p>` : ""}<p class="visual-topic-note-example">${item.example}</p>${state.showPinyin && item.examplePinyin ? `<p class="visual-topic-note-pinyin">${item.examplePinyin}</p>` : ""}${state.showEnglish && item.exampleEnglish ? `<p class="visual-topic-note-english">${item.exampleEnglish}</p>` : ""}</article>`).join("")}</div></section>` : ""}
      ${topicId === "school-subjects" ? `<section class="visual-topic-notes"><p class="body-match-kicker">Useful note</p><div class="visual-topic-note-grid school-subject-note"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">去</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qù</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to go</p>' : ""}<p class="visual-topic-note-example">我去上音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">在</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">zài</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">at / in; marks an action happening now</p>' : ""}<p class="visual-topic-note-example">我在上音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">喜欢</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">xǐ huan</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to like</p>' : ""}<p class="visual-topic-note-example">我喜欢音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">不喜欢</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">bù xǐ huan</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to not like</p>' : ""}<p class="visual-topic-note-example">我不喜欢数学课。</p></article></div></section>` : ""}
    </div>
  `;

  focusExplorer.querySelectorAll("[data-school-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = sceneGroups.flatMap((group) => group.items).find((entry) => entry.id === button.dataset.schoolPlayScene);
      if (!scene || !state.tapAudioEnabled) return;
      if (scene.lines?.length) {
        speakSceneLines(scene.lines.map((line) => ({ ...line, audio: line.audio ?? line.hanzi })));
        return;
      }
      speak(scene.audio, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-school-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = visibleWords.find((entry) => entry.id === button.dataset.schoolWord);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-food-book-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.foodBookCategoryId = button.dataset.foodBookCategory;
      renderSchoolExplorer(topicId);
    });
  });
  focusExplorer.querySelectorAll("[data-meals-word-group]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mealsWordGroupId = button.dataset.mealsWordGroup;
      renderSchoolExplorer(topicId);
    });
  });
}

function renderFamilyHomeVisual(exchange) {
  if (exchange.visual === "parents-love") {
    return `
      <div class="family-lesson-visual family-lesson-visual-love">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  if (exchange.visual === "siblings-compare") {
    return `
      <div class="family-lesson-visual family-lesson-visual-siblings">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  const roomClass = {
    "living-room": "family-room-living",
    playroom: "family-room-playroom",
    "family-visit": "family-room-visit"
  }[exchange.roomLabel] ?? "family-room-living";

  return `
    <div class="family-room ${roomClass}">
      <div class="family-room-scene-bar">
        <div class="family-room-scene-copy">
          <p class="family-room-scene-label">${exchange.sceneLabel}</p>
          <p class="family-room-scene-mood">${exchange.sceneMood}</p>
        </div>
        <div class="family-room-scene-sun" aria-hidden="true"></div>
      </div>
      <div class="family-room-backdrop">
        <div class="family-room-window">
          <div class="family-room-window-sky"></div>
          <div class="family-room-window-hill family-room-window-hill-back"></div>
          <div class="family-room-window-hill family-room-window-hill-front"></div>
        </div>
        <div class="family-room-curtain family-room-curtain-left"></div>
        <div class="family-room-curtain family-room-curtain-right"></div>
        <div class="family-room-rug"></div>
        <div class="family-room-floor-line"></div>
        <div class="family-room-furniture family-room-furniture-left"></div>
        <div class="family-room-furniture family-room-furniture-right"></div>
        <div class="family-room-decor family-room-decor-left"></div>
        <div class="family-room-decor family-room-decor-right"></div>
      </div>
      <div class="family-room-cast">
        ${exchange.cast
          .map((personId, index) => {
            const person = illustratedFamily[personId];
            if (!person) {
              return "";
            }
            return `
              <article class="family-room-person family-room-person-${person.id} family-room-person-${index === 0 ? "left" : "right"}">
                <div class="family-room-callout">${familyWordForPersonId(person.id)}</div>
                <div class="family-room-portrait">
                  <img class="family-room-image" src="${person.path}" alt="${person.label}" />
                </div>
                <div class="family-room-name">
                  <span class="family-room-name-hanzi">${familyWordForPersonId(person.id)}</span>
                  <span class="family-room-name-english">${person.label}</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderFamilyExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: family at home</h4>
        <p>Start with 爸爸妈妈爱我, then reuse the same small word set as the child moves to 我爱爸爸, 我爱妈妈, and sibling words.</p>
      </div>
      <div class="greetings-practice-grid family-scenes-grid">
        ${familyPractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-family-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout family-scene-layout">
                  <div class="family-scene-visual">
                    ${renderFamilyHomeVisual(exchange)}
                  </div>
                  <div class="greetings-line-stack">
                    ${exchange.lines
                      .map(
                        (line, index) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-family-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = familyPractice.find((entry) => entry.id === button.dataset.familyPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-family-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.familyWord, { playAudio: true });
    });
  });
}

function renderIdentityExplorer() {
  const selectedCountry = identityCountries.find((country) => country.id === state.identitySelectedCountryId);
  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div>
            <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
            <p class="greetings-exchange-prompt">Countries and languages</p>
          </div>
          <button class="small-button is-action-button" type="button" data-identity-play-scene>Play scene</button>
        </div>
        <div class="greetings-scene-layout">
          <div class="greetings-scene-visual">
            <img class="greetings-scene-image" src="${identityConversation.imagePath}" alt="${identityConversation.imageAlt}" />
          </div>
          <div class="greetings-line-stack">
            ${identityConversation.lines
              .map(
                (line) => `
                  <article class="greetings-line-card">
                    <div class="telephone-bubble-copy">
                      <p class="telephone-line-hanzi">${line.hanzi}</p>
                      ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                      ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="identity-question-section">
        <div class="identity-question-top">
          <div>
            <p class="body-match-kicker">Question</p>
            <p class="telephone-line-hanzi">${identityQuestion.hanzi}</p>
            ${state.showPinyin ? `<p class="telephone-line-pinyin">${identityQuestion.pinyin}</p>` : ""}
            ${state.showEnglish ? `<p class="telephone-line-english">${identityQuestion.english}</p>` : ""}
          </div>
          <button class="small-button is-action-button" type="button" data-identity-play-question>Play audio</button>
        </div>
        <div class="identity-country-grid">
          ${identityCountries
            .map(
              (country) => `
                <button class="identity-country-card${selectedCountry?.id === country.id ? " is-selected" : ""}" type="button" data-identity-country="${country.id}">
                  <img class="identity-flag" src="${country.asset}" alt="${country.label} flag" />
                  <span class="numbers-game-hanzi">${country.nationality}</span>
                  ${state.showPinyin ? `<span class="numbers-game-pinyin">${country.pinyin}</span>` : ""}
                  ${state.showEnglish ? `<span class="numbers-game-english">${country.label}</span>` : ""}
                </button>
              `
            )
            .join("")}
        </div>
        ${
          selectedCountry
            ? `
              <article class="greetings-line-card identity-answer-card">
                <div class="telephone-bubble-copy">
                  <p class="telephone-line-hanzi">${selectedCountry.response.hanzi}</p>
                  ${state.showPinyin ? `<p class="telephone-line-pinyin">${selectedCountry.response.pinyin}</p>` : ""}
                  ${state.showEnglish ? `<p class="telephone-line-english">${selectedCountry.response.english}</p>` : ""}
                </div>
              </article>
            `
            : ""
        }
      </section>
    </div>
  `;

  focusExplorer.querySelector("[data-identity-play-scene]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speakSceneLines(identityConversation.lines);
    }
  });
  focusExplorer.querySelector("[data-identity-play-question]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speak(identityQuestion.audio, 0.78);
    }
  });
  focusExplorer.querySelectorAll("[data-identity-country]").forEach((button) => {
    button.addEventListener("click", () => {
      const country = identityCountries.find((entry) => entry.id === button.dataset.identityCountry);
      if (!country) {
        return;
      }
      state.identitySelectedCountryId = country.id;
      if (state.tapAudioEnabled) {
        speak(country.response.audio, 0.78);
      }
      renderIdentityExplorer();
    });
  });
}

function renderFocusExplorer() {
  const topic = currentTopic();
  if (topic.interactiveScene === "body-face") {
    renderBodyExplorer();
    return;
  }

  if (topic.id === "numbers") {
    renderNumbersExplorer();
    return;
  }

  if (topic.interactiveScene === "polite-phrases") {
    renderPoliteWordsExplorer();
    return;
  }

  if (topic.interactiveScene === "introductions-conversation") {
    renderIntroductionsExplorer();
    return;
  }

  if (topic.interactiveScene === "identity-scenes") {
    renderIdentityExplorer();
    return;
  }

  if (topic.interactiveScene === "age-conversation") {
    renderAgeExplorer();
    return;
  }

  if (topic.interactiveScene === "family-home") {
    renderFamilyExplorer();
    return;
  }

  if (topic.interactiveScene === "greetings-conversation") {
    renderGreetingsExplorer();
    return;
  }

  if (topic.interactiveScene === "clothes-scenes") {
    renderClothesExplorer();
    return;
  }

  if (topic.interactiveScene === "time-date-routine") {
    renderTimeDateExplorer();
    return;
  }

  if (topic.interactiveScene === "weekdays") {
    renderWeekdaysExplorer();
    return;
  }

  if (topic.interactiveScene === "dates") {
    renderDatesExplorer();
    return;
  }

  if (topic.interactiveScene === "positions") {
    renderPositionsExplorer();
    return;
  }

  if (topic.interactiveScene === "rooms") {
    renderRoomsExplorer();
    return;
  }

  if (schoolTopicData[topic.id]) {
    renderSchoolExplorer(topic.id);
    return;
  }

  if (["comparisons", "transport", "rooms"].includes(topic.interactiveScene)) {
    renderVisualTopicExplorer(topic.interactiveScene);
    return;
  }

  if (topic.interactiveScene === "multiplication-rhyme") {
    renderMultiplicationExplorer();
    return;
  }

  renderDefaultExplorer();
}

function selectBookLesson(bookId, lessonNumber) {
  const book = books.find((entry) => entry.id === bookId) ?? books[0];
  const lesson = book.lessons.find((entry) => entry.lesson === lessonNumber) ?? book.lessons[0];

  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  state.selectedBookId = book.id;
  state.selectedLessonNumber = lesson.lesson;
  state.selectedTopicId = lesson.topicId;
  state.expandedCategoryId = categoryIdForTopic(lesson.topicId);
  state.topicPageOpen = true;
  narrowTopicBrowserTo(selectedTopicGroupId());
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
  window.history.pushState(null, "", topicPageUrl(window.location, lesson.topicId));
  focusLearningPanel();
}

function topicLessonTitle(topic, step) {
  if (topic.id !== "numbers") {
    return step.title;
  }

  const stage = numberStages.find(
    (entry) => entry.bookId === step.book.toLowerCase() && entry.lesson === step.lesson
  );
  return stage?.title ?? step.title;
}

function renderTopicLessonStrip(topic) {
  if (!topicLessonStrip) {
    return;
  }

  const steps = topic.steps ?? [];
  if (!steps.length) {
    topicLessonStrip.innerHTML = "";
    topicLessonStrip.classList.add("is-hidden");
    return;
  }

  const current = currentLesson();
  topicLessonStrip.classList.remove("is-hidden");
  topicLessonStrip.innerHTML = steps
    .map((step) => {
      const bookId = step.book.toLowerCase();
      const isActive = currentBook().id === bookId && current.lesson === step.lesson;
      return `
        <button class="topic-lesson-card${isActive ? " is-active" : ""}" type="button" data-topic-lesson="${bookId}:${step.lesson}">
          <span class="topic-lesson-meta">Book ${step.book} Lesson ${step.lesson}</span>
          <strong>${topicLessonTitle(topic, step)}</strong>
        </button>
      `;
    })
    .join("");

  topicLessonStrip.querySelectorAll("[data-topic-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonText] = button.dataset.topicLesson.split(":");
      selectBookLesson(bookId, Number(lessonText));
    });
  });
}

function renderSubtopicShelf() {
  if (!subtopicShelf) {
    return;
  }

  subtopicShelf.innerHTML = "";
  subtopicShelf.classList.add("is-hidden");
}

function renderTopicDetail() {
  const topic = currentTopic();
  const items = focusItemsForTopic(topic);

  if (topic.id !== "body") {
    state.lastBodyFeedback = "";
    if (topic.id !== "numbers") {
      state.lastNumberFeedback = "";
    }
  } else if (!state.selectedFocusItemId) {
    state.selectedFocusItemId = items[0].id;
    ensureBodyMatchGame();
  }

  if (topic.id !== "numbers" && state.numberChallengeAdvanceTimer) {
    window.clearTimeout(state.numberChallengeAdvanceTimer);
    state.numberChallengeAdvanceTimer = null;
  }

  const selectedItem = items.find((item) => item.id === state.selectedFocusItemId);
  if (topic.id === "family" && (!selectedItem || isFamilySentenceItemId(selectedItem.id))) {
    state.selectedFocusItemId = familyBookWordItems()[0]?.id ?? items[0].id;
  } else {
    state.selectedFocusItemId = selectedItem?.id ?? items[0].id;
  }

  topicTitle.textContent = topic.title;
  if (topicSummary) {
    topicSummary.textContent = topic.summary;
  }
  if (topicProgress) {
    topicProgress.textContent = topic.progressLabel;
  }
  renderTopicLessonStrip(topic);
  renderSubtopicShelf(topic);
  focusDisplay.classList.toggle(
    "is-hidden",
    topic.id === "body" ||
      usesLessonTemplate(topic) ||
      topic.id === "numbers" ||
      topic.id === "multiplication-rhyme" ||
      topic.id === "weekdays" ||
      topic.id === "time-date" ||
      topic.id === "dates" ||
      topic.id === "comparisons" ||
      topic.id === "positions" ||
      topic.id === "transport" ||
      topic.id === "daily-life" ||
      topic.id === "identity" ||
      topic.id === "clothes" ||
      schoolTopicData[topic.id] ||
      (topic.id === "numbers" && currentNumberStage().telephoneMode)
  );
  renderFocusControls();
  renderFocusDisplay(currentFocusItem());
  renderFocusExplorer();
  renderFocusWordList();
  renderFocusStatus();

  renderActivityPanel(topic);
}

bookSelect.addEventListener("change", () => {
  const book = books.find((entry) => entry.id === bookSelect.value) ?? currentBook();
  selectBookLesson(book.id, book.lessons[0].lesson);
});

lessonSelect.addEventListener("change", () => {
  const book = currentBook();
  const lesson = book.lessons.find((entry) => String(entry.lesson) === lessonSelect.value) ?? book.lessons[0];
  selectBookLesson(book.id, lesson.lesson);
});

window.addEventListener("scroll", () => {
  updateLearningCultureNav();
});

window.addEventListener("popstate", () => {
  const topicId = topicIdFromLocation(window.location, topicById);
  state.topicPageOpen = Boolean(topicId);
  if (topicId) {
    state.selectedTopicId = topicId;
    state.expandedCategoryId = categoryIdForTopic(topicId);
    syncBookSelectionFromTopic();
  }
  switchView(viewFromLocation(window.location));
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
});

({
  greetingsGameItems,
  resetGreetingsChallenge,
  ensureGreetingsChallenge,
  greetingsMeaningLabel,
  resetGreetingsMatchGame,
  ensureGreetingsMatchGame,
  handleGreetingsMatchPhrase,
  handleGreetingsMatchAttempt,
  handleGreetingsChallengePlay,
  handleGreetingsChallengeGuess,
  renderGreetingsExplorer
} = createGreetingsController({
  state,
  greetingsGameItemIds,
  greetingsPractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  resetListenChallengeResult,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  politeGameItems,
  politeMeaningLabel,
  resetPoliteMatchGame,
  ensurePoliteMatchGame,
  handlePoliteMatchPhrase,
  handlePoliteMatchAttempt,
  resetPoliteChallenge,
  ensurePoliteChallenge,
  handlePoliteChallengePlay,
  handlePoliteChallengeGuess,
  renderPoliteWordsExplorer
} = createPoliteWordsController({
  state,
  politeGameItemIds,
  politePractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  introductionsPromptById,
  introductionsGameKids,
  introductionsSelfIntroItemForKid,
  resetIntroductionsChallenge,
  ensureIntroductionsChallenge,
  handleIntroductionsChallengePlay,
  handleIntroductionsChallengeGuess,
  introductionsBuildTarget,
  resetIntroductionsBuilder,
  ensureIntroductionsBuilder,
  handleIntroductionsBuildToken,
  handleIntroductionsBuildClear,
  renderIntroductionsExplorer
} = createIntroductionsController({
  state,
  introductionsGameSpeakerIds,
  introductionsGamePrompts,
  introductionsBuildPhrases,
  introductionsPractice,
  illustratedKids,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  ageGameItems,
  resetAgeChallenge,
  ensureAgeChallenge,
  handleAgeChallengePlay,
  handleAgeChallengeGuess,
  ageBuildTarget,
  resetAgeBuilder,
  ensureAgeBuilder,
  handleAgeBuildToken,
  handleAgeBuildClear,
  renderAgeExplorer
} = createAgeController({
  state,
  ageGameItemIds,
  ageBuildPhrases,
  agePractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  schoolPracticeItems,
  ensureSchoolPractice,
  renderSchoolPractice,
  renderStationeryPractice,
  renderSchoolSuppliesPractice,
  renderFoodPractice,
  renderMealsConversationPractice,
  renderFoodPreferencesPractice,
  renderClassroomPractice
} = createSchoolFoodRuntime({
  state,
  schoolTopicData,
  schoolSentenceBuilds,
  stationeryPictureMatchRounds,
  stationeryPictureMatchChoices,
  stationeryPictureMatchEnglish,
  currentTopic,
  shuffleArray,
  speak,
  renderActivityPanel,
  focusItemsForTopic,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  renderListenPractice,
  renderMatchPractice
}));

syncBookSelectionFromTopic();

const initialTopicId = topicIdFromLocation(window.location, topicById);
if (initialTopicId) {
  state.selectedTopicId = initialTopicId;
  state.expandedCategoryId = categoryIdForTopic(initialTopicId);
  state.topicPageOpen = true;
  syncBookSelectionFromTopic();
}

renderTopics();
renderBooks();
renderTopicDetail();
switchView(viewFromLocation(window.location));
updateTopicPageVisibility();
