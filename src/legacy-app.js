import { createAudioService } from "./core/audio.js";
import { createNavigationRuntime } from "./core/navigation-runtime.js";
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
import { createFoundationsRuntime } from "./features/foundations/foundations-runtime.js";
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

const {
  currentTopic,
  currentNumberStage,
  focusItemsForTopic,
  currentFocusItem,
  shuffleArray,
  topicById,
  selectedTopicGroupId,
  bookById,
  bookCategoryForBook,
  currentBook,
  currentLesson,
  syncBookSelectionFromTopic,
  syncLessonSelectionFromTopic,
  focusLearningPanel,
  scrollToSectionTop,
  narrowTopicBrowserTo,
  categoryIdForTopic,
  updateTopicPageVisibility,
  scrollCategorySectionIntoView,
  openTopicPage,
  switchView,
  toggleTopicGroup,
  renderTopicScene,
  displayControlsMarkup,
  bindDisplayControls,
  renderTopicStickyNav,
  bookAccent,
  renderBookStickyNav,
  renderStickyNav,
  categoryIconMarkup,
  renderTopics,
  renderBooks,
  updateLearningCultureNav
} = createNavigationRuntime({
  state,
  topicData,
  books,
  topicGroups,
  learningHomeCategories,
  bookHomeCategories,
  topicCardMeta,
  topicPageUrl,
  topicGroupsRoot,
  bookSelect,
  lessonSelect,
  lookupCard,
  bookBrowser,
  topicPanel,
  bookPanel,
  detailLayout,
  learningCultureNav,
  renderFocusControls,
  renderFocusDisplay,
  renderFocusWordList,
  renderFocusExplorer,
  renderActivityPanel,
  renderTopicDetail,
  updateDisplayControls,
  selectBookLesson
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
  renderClassroomPractice,
  renderSchoolExplorer
} = createSchoolFoodRuntime({
  state,
  schoolTopicData,
  schoolSentenceBuilds,
  stationeryPictureMatchRounds,
  stationeryPictureMatchChoices,
  stationeryPictureMatchEnglish,
  currentTopic,
  currentBook,
  currentLesson,
  shuffleArray,
  speak,
  speakSceneLines,
  renderActivityPanel,
  focusItemsForTopic,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  focusExplorer,
  renderDefaultExplorer,
  renderListenPractice,
  renderMatchPractice
}));

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

const {
numberStageItems,
resetNumberChallenge,
ensureNumberChallenge,
resetMathChallenge,
ensureMathChallenge,
familyGameItems,
familyPersonForItemId,
familyHeadshotForItemId,
isFamilySentenceItemId,
familyBookWordItems,
usesLessonTemplate,
bookWordItemsForTopic,
usefulNoteForTopic,
familyWordForPersonId,
resetFamilyChallenge,
ensureFamilyChallenge,
resetListenChallengeResult,
handleFamilyChallengePlay,
handleFamilyChallengeGuess,
resetFamilyMatchGame,
ensureFamilyMatchGame,
handleFamilyMatchPhrase,
handleFamilyMatchAttempt,
mathChallengeAudioText,
handleMathChallengeSubmit,
handleNumberChallengeGuess,
bodyMatchItems,
nextBodyRound,
resetBodyMatchGame,
ensureBodyMatchGame,
handleBodyMatchChinese,
handleBodyMatchAttempt,
numberWordListItems,
renderBodyLabelButton,
renderBodyExplorer,
renderNumberVisual,
renderNumbersExplorer,
renderTelephoneExplorer,
renderFamilyHomeVisual,
renderFamilyExplorer,
renderIdentityExplorer
} = createFoundationsRuntime({
state,
numberHanzi,
numberPinyin,
buildNumberItem,
numberStages,
telephonePractice,
familyGameItemIds,
  familyPersonIdsByItemId,
  familyHeadshotsByItemId,
  familyPractice,
  illustratedFamily,
illustratedKids,
bodyBonusItemIds,
bodyCoreItemIds,
bodyDiagramLayout,
identityConversation,
identityCountries,
identityQuestion,
topicById,
focusItemsForTopic,
currentTopic,
currentNumberStage,
currentFocusItem,
currentBook,
currentLesson,
shuffleArray,
speak,
speakSceneLines,
renderActivityPanel,
renderFocusDisplay,
renderFocusExplorer,
renderFocusStatus,
selectFocusItem,
focusExplorer,
focusStatus
});


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
