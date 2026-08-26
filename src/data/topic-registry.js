import { comparisonVisualItems, comparisonsTopic, comparisonWordItems } from "../features/time-daily-life/comparisons.js";
import { positionsTopic, positionVisualItems } from "../features/time-daily-life/positions.js";
import { transportTopic, transportVisualItems } from "../features/time-daily-life/transport.js";
import { dailyLifeTopic, roomVisualItems } from "../features/time-daily-life/rooms.js";
import { everydayActionsTopic } from "../features/time-daily-life/everyday-actions.js";
import { stationerySentenceBuilds, stationeryTopicData } from "../features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "../features/school-life/school-supplies.js";
import { classroomTopicData } from "../features/school-life/classroom.js";
import { schoolSentenceBuilds as schoolLessonSentenceBuilds, schoolTopicData as schoolLessonTopicData } from "../features/school-life/school.js";
import { schoolSubjectsSentenceBuilds as schoolLessonSubjectsSentenceBuilds, schoolSubjectsTopicData } from "../features/school-life/school-subjects.js";
import { foodSentenceBuilds, foodTopic, foodTopicData } from "../features/food/food.js";
import { foodPreferencesTopic, foodPreferencesTopicData } from "../features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds as mealsFeelingsLessonSentenceBuilds, mealsFeelingsTopic, mealsFeelingsTopicData } from "../features/food/meals-feelings.js";
import { introductionsTopic } from "../features/foundations/introductions.js";
import { ageTopic } from "../features/foundations/age.js";
import { politeWordsTopic } from "../features/foundations/polite-words.js";
import { greetingsTopic } from "../features/foundations/greetings.js";
import { identityTopic, languagesTopic } from "../features/foundations/identity.js";
import { familyTopic } from "../features/family/family.js";
import { clothesTopic } from "../features/daily-life/clothes.js";
import { requestsPermissionTopic } from "../features/daily-life/requests-permission.js";
import { natureTopic, weatherTopic } from "../features/world/weather.js";
import { animalsTopic, petsTopic } from "../features/world/animals.js";
import { coloursTopic } from "../features/world/colours.js";
import { hobbies3bTopic, hobbiesAtHomeTopic, hobbiesLeisureTopic, hobbiesTopic, toysTopic } from "../features/play-hobbies/play-hobbies.js";
import { bodyTopic } from "../features/foundations/body.js";
import { multiplicationRhymeTopic, numbersTopic } from "../features/foundations/numbers.js";
import { telephoneNumbersTopic } from "../features/foundations/telephone-numbers.js";
import { isItTopic } from "../features/foundations/is-it.js";

export const visualTopicItems = {
  comparisons: comparisonVisualItems,
  positions: positionVisualItems,
  transport: transportVisualItems,
  rooms: roomVisualItems
};

export const schoolTopicData = {
  stationery: stationeryTopicData,
  "school-supplies": schoolSuppliesTopicData,
  classroom: classroomTopicData,
  school: schoolLessonTopicData,
  "school-subjects": schoolSubjectsTopicData,
  food: foodTopicData,
  "food-preferences": foodPreferencesTopicData,
  "meals-feelings": mealsFeelingsTopicData
};

export const schoolSentenceBuilds = {
  stationery: stationerySentenceBuilds,
  "school-supplies": schoolSuppliesSentenceBuilds,
  school: schoolLessonSentenceBuilds,
  "school-subjects": schoolLessonSubjectsSentenceBuilds,
  food: foodSentenceBuilds,
  "meals-feelings": mealsFeelingsLessonSentenceBuilds
};

export const topicData = [
  numbersTopic,
  telephoneNumbersTopic,
  multiplicationRhymeTopic,
  greetingsTopic,
  politeWordsTopic,
  isItTopic,
  introductionsTopic,
  identityTopic,
  languagesTopic,
  ageTopic,
  familyTopic,
  bodyTopic,
  petsTopic,
  animalsTopic,
  coloursTopic,
  foodTopic,
  foodPreferencesTopic,
  mealsFeelingsTopic,
  requestsPermissionTopic,
  everydayActionsTopic,
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
      { book: "2B", lesson: 2, title: "What time is it?", cardLabel: "Tell the time", note: "Add telling time." },
      { book: "4A", lesson: 3, title: "Tell the time", cardLabel: "Read clock times", note: "Revisit time in a more functional way." },
      { book: "4A", lesson: 4, title: "Daily routine", cardLabel: "Talk about your routine", note: "Use time language in everyday life." }
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
    steps: [{ book: "2B", lesson: 1, title: "Today is Monday", cardLabel: "Name the days of the week", note: "Learn the days of the week." }]
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
      { book: "3A", lesson: 2, title: "Date", cardLabel: "Say the date", note: "Say month and day." },
      { book: "3A", lesson: 3, title: "Happy birthday!", cardLabel: "Talk about birthdays", note: "Use dates for birthdays and celebrations." }
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
    steps: [{ book: "2B", lesson: 3, title: "Stationery", cardLabel: "Name your school things", note: "Talk about school things, colors, and measure words." }]
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
    steps: [{ book: "3B", lesson: 1, title: "My schoolbag", cardLabel: "Pack your backpack", note: "Say what is in a backpack." }]
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
      { book: "2B", lesson: 4, title: "My classroom", cardLabel: "Name classroom things", note: "Name the classroom and its furniture." },
      { book: "3B", lesson: 2, title: "Our classroom", cardLabel: "Describe your classroom", note: "Describe things in the classroom." }
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
    steps: [{ book: "4B", lesson: 5, title: "Our school", cardLabel: "Name places at school", note: "Name school places with 学校有..." }]
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
    steps: [{ book: "4B", lesson: 6, title: "School subjects", cardLabel: "Talk about school subjects", note: "Talk about favorite classes." }]
  },
  hobbiesTopic,
  hobbies3bTopic,
  hobbiesAtHomeTopic,
  hobbiesLeisureTopic,
  toysTopic,
  clothesTopic,
  dailyLifeTopic,
  comparisonsTopic,
  positionsTopic,
  transportTopic,
  natureTopic,
  weatherTopic
];
