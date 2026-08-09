import { createAudioService } from "./core/audio.js";
import { topicIdFromLocation, topicPageUrl, viewFromLocation } from "./core/router.js";
import { timeDateWeekItems } from "./features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateExpressionItems, timeDateRoutineItems } from "./features/time-daily-life/time.js";
import { datePracticeItems, timeDateDateItems, timeDateMonthItems } from "./features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonVisualItems, comparisonWordItems } from "./features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionVisualItems } from "./features/time-daily-life/positions.js";
import { transportSentenceTokens, transportVisualItems } from "./features/time-daily-life/transport.js";
import { roomScenes, roomSentenceTokens, roomVisualItems } from "./features/time-daily-life/rooms.js";
import { stationeryPictureMatchChoices, stationeryPictureMatchEnglish, stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "./features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "./features/school-life/school-supplies.js";
import { classroomTopicData } from "./features/school-life/classroom.js";
import { schoolSentenceBuilds as schoolLessonSentenceBuilds, schoolTopicData as schoolLessonTopicData } from "./features/school-life/school.js";
import { schoolSubjectsSentenceBuilds as schoolLessonSubjectsSentenceBuilds, schoolSubjectsTopicData } from "./features/school-life/school-subjects.js";
import { foodSentenceBuilds, foodTopicData } from "./features/food/food.js";
import { foodPreferencesTopicData } from "./features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds as mealsFeelingsLessonSentenceBuilds, mealsFeelingsTopicData } from "./features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "./features/foundations/introductions.js";
import { ageBuildPhrases, agePractice, ageTopic } from "./features/foundations/age.js";
import { createSharedLessonPractice } from "./games/shared-lesson-practice.js";

const topicData = [
  {
    id: "numbers",
    title: "Numbers",
    summary: "A stage-by-stage number path that grows from first counting to real-life number use.",
    progressLabel: "1A to 4A",
    iconText: "一二三",
    iconColor: "#be5b49",
    iconAccent: "#f3c977",
    iconTheme: "counting",
    focus: {
      hanzi: "一 二 三 四 五",
      pinyin: "yī, èr, sān, sì, wǔ",
      english: "one, two, three, four, five",
      audio: "一，二，三，四，五"
    },
    focusItems: [
      { id: "one", hanzi: "一", pinyin: "yī", english: "one", audio: "一" },
      { id: "two", hanzi: "二", pinyin: "èr", english: "two", audio: "二" },
      { id: "three", hanzi: "三", pinyin: "sān", english: "three", audio: "三" },
      { id: "four", hanzi: "四", pinyin: "sì", english: "four", audio: "四" },
      { id: "five", hanzi: "五", pinyin: "wǔ", english: "five", audio: "五" }
    ],
    parentGuide:
      "Use short rounds. Tap a number, hear it, then count real objects together like crackers, pencils, or toys.",
    cultureGuide:
      "Numbers connect easily to food, family, and festival routines. Counting dumplings, oranges, or mooncakes makes practice feel real.",
    activities: ["Tap to hear", "Count and say", "Match picture to number", "Listen and choose"],
    steps: [
      { book: "1A", lesson: 1, title: "Numbers (1)", note: "Learn 1-5 with first counting practice." },
      { book: "1A", lesson: 2, title: "Numbers (2)", note: "Extend to 6-10." },
      { book: "1A", lesson: 3, title: "Numbers (3)", note: "Move into 11-20." },
      { book: "2A", lesson: 1, title: "Numbers", note: "Grow to 21-40." },
      { book: "3A", lesson: 1, title: "Numbers", note: "Grow to 41-100." },
      { book: "4A", lesson: 1, title: "Telephone numbers", note: "Use numbers in a real-life format." }
    ]
  },
  {
    id: "multiplication-rhyme",
    title: "99 Multiplication Rhyme",
    summary: "Learn the classic Chinese multiplication lines with tap-to-hear rhythm practice.",
    progressLabel: "Special topic",
    iconText: "九九",
    iconColor: "#a15e45",
    iconAccent: "#f0c36d",
    iconTheme: "rhyme",
    focus: {
      hanzi: "九九八十一",
      pinyin: "jiǔ jiǔ bā shí yī",
      english: "9 x 9 = 81",
      audio: "九九八十一"
    },
    focusItems: [],
    interactiveScene: "multiplication-rhyme",
    parentGuide:
      "Use short, rhythmic repetition. Tap one line, hear it together, then repeat it with a steady beat or clap.",
    cultureGuide:
      "The 九九乘法口诀 is a familiar memorization pattern in Chinese learning. It is valued because the rhythm makes multiplication facts stick.",
    activities: ["Tap line to hear", "Repeat with rhythm", "Learn one table at a time", "Build multiplication confidence"],
    steps: []
  },
  {
    id: "greetings",
    title: "Greetings",
    summary: "Simple social language children can use right away in class and at home.",
    progressLabel: "1A foundation",
    iconText: "你好",
    iconColor: "#d2874f",
    iconAccent: "#f7d98f",
    iconTheme: "greeting",
    focus: {
      hanzi: "你好！",
      pinyin: "nǐ hǎo!",
      english: "Hello!",
      audio: "你好"
    },
    focusItems: [
      { id: "hello", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { id: "you-casual", hanzi: "你", pinyin: "nǐ", english: "you", audio: "你" },
      { id: "you-polite", hanzi: "您", pinyin: "nín", english: "you (polite)", audio: "您" },
      {
        id: "teacher-hello",
        hanzi: "李老师，您好！",
        pinyin: "Lǐ lǎo shī, nín hǎo!",
        english: "Hello, Teacher Li!",
        audio: "李老师您好"
      },
      { id: "good-morning", hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
      { id: "goodbye", hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
      { id: "teacher", hanzi: "老师", pinyin: "lǎo shī", english: "teacher", audio: "老师" },
      { id: "surname-li", hanzi: "李", pinyin: "Lǐ", english: "Li (surname)", audio: "李" }
    ],
    interactiveScene: "greetings-conversation",
    parentGuide:
      "Pair the phrase with movement. Wave, smile, and say it together. Young children remember social language best when it feels physical.",
    cultureGuide:
      "Greetings are a gentle bridge into relationship-focused language. The point is warmth and confidence, not a long explanation.",
    activities: ["Tap to hear", "Echo and repeat", "Choose the greeting", "Role-play turns"],
    steps: [{ book: "1A", lesson: 4, title: "Hello!", note: "Begin with friendly greetings." }]
  },
  {
    id: "polite-words",
    title: "Polite Words",
    summary: "Useful everyday phrases like thank you and simple requests.",
    progressLabel: "1A to 3A",
    iconText: "谢谢",
    iconColor: "#8f6c46",
    iconAccent: "#e6c77e",
    iconTheme: "polite",
    focus: {
      hanzi: "谢谢你！",
      pinyin: "xiè xie nǐ!",
      english: "Thank you!",
      audio: "谢谢你"
    },
    focusItems: [
      { id: "thank-you", hanzi: "谢谢你！", pinyin: "xiè xie nǐ!", english: "Thank you!", audio: "谢谢你" },
      { id: "youre-welcome", hanzi: "不客气。", pinyin: "bú kè qi.", english: "You're welcome.", audio: "不客气" },
      { id: "sorry", hanzi: "对不起。", pinyin: "duì bu qǐ.", english: "I'm sorry.", audio: "对不起" },
      { id: "never-mind", hanzi: "没关系。", pinyin: "méi guān xi.", english: "Never mind.", audio: "没关系" },
      { id: "please", hanzi: "请", pinyin: "qǐng", english: "please", audio: "请" }
    ],
    interactiveScene: "polite-phrases",
    parentGuide:
      "Use these during real routines: handing snacks, passing pencils, cleaning up, or asking for help.",
    cultureGuide:
      "Polite language works best when tied to real exchanges. A quick classroom or home routine is better than a long explanation.",
    activities: ["Tap to hear", "Match phrase to situation", "Listen and choose", "Speak after me"],
    steps: [
      { book: "1A", lesson: 5, title: "Thank you!", note: "Start with a core manners phrase." },
      { book: "3A", lesson: 6, title: "Request", note: "Expand polite language into asking for things." }
    ]
  },
  introductionsTopic,
  {
    id: "identity",
    title: "Countries & Languages",
    summary: "Say where someone is from and the languages they can speak.",
    progressLabel: "3A to 4A",
    iconText: "中国",
    iconColor: "#587d9c",
    iconAccent: "#e5bf70",
    iconTheme: "identity",
    focus: {
      hanzi: "我是中国人。",
      pinyin: "wǒ shì Zhōng guó rén.",
      english: "I am Chinese.",
      audio: "我是中国人"
    },
    focusItems: [
      { id: "ask-country", hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What country are you from?", audio: "你是哪国人" },
      { id: "china", hanzi: "我是中国人。", pinyin: "wǒ shì Zhōng guó rén.", english: "I am Chinese.", audio: "我是中国人" },
      { id: "usa", hanzi: "我是美国人。", pinyin: "wǒ shì Měi guó rén.", english: "I am American.", audio: "我是美国人" },
      { id: "uk", hanzi: "我是英国人。", pinyin: "wǒ shì Yīng guó rén.", english: "I am British.", audio: "我是英国人" },
      { id: "ask-language", hanzi: "你会说汉语吗？", pinyin: "nǐ huì shuō Hànyǔ ma?", english: "Can you speak Chinese?", audio: "你会说汉语吗" },
      { id: "speak-chinese", hanzi: "我会说汉语。", pinyin: "wǒ huì shuō Hànyǔ.", english: "I can speak Chinese.", audio: "我会说汉语" },
      { id: "speak-english", hanzi: "我会说英语。", pinyin: "wǒ huì shuō Yīngyǔ.", english: "I can speak English.", audio: "我会说英语" }
    ],
    interactiveScene: "identity-scenes",
    parentGuide: "Use the child's real country and languages. Start with one short answer, then switch the country or language together.",
    cultureGuide: "Country and language words work best as respectful descriptions of people, not as labels for how anyone should look or act.",
    activities: ["Tap to hear", "Meet classmates", "Match country and flag", "Say what I speak"],
    steps: [
      { book: "3A", lesson: 5, title: "Nationality", note: "Ask and say where someone is from." },
      { book: "4A", lesson: 2, title: "Languages", note: "Say which languages someone can speak." }
    ]
  },
  ageTopic,
  {
    id: "family",
    title: "Family",
    summary: "Start with love and belonging, then sort family words by older and younger.",
    progressLabel: "1B to 3A",
    iconText: "家人",
    iconColor: "#aa7051",
    iconAccent: "#f1d29b",
    iconTheme: "family",
    focus: {
      hanzi: "爸爸妈妈爱我。",
      pinyin: "bà ba mā ma ài wǒ.",
      english: "Dad and Mum love me.",
      audio: "爸爸妈妈爱我"
    },
    focusItems: [
      { id: "parents-love-me", hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
      { id: "i-love-dad", hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
      { id: "i-love-mom", hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" },
      { id: "mom-word", hanzi: "妈妈", pinyin: "mā ma", english: "mum", audio: "妈妈" },
      { id: "dad-word", hanzi: "爸爸", pinyin: "bà ba", english: "dad", audio: "爸爸" },
      { id: "older-brother-word", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
      { id: "younger-brother-word", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
      { id: "older-sister-word", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
      { id: "younger-sister-word", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
    ],
    interactiveScene: "family-home",
    parentGuide:
      "Use one warm family picture for 爸爸妈妈爱我, then switch quickly to family photos, pointing, and real names.",
    cultureGuide:
      "This early family lesson works best when love words and family roles stay close to the child's real home life.",
    activities: ["Tap to hear", "Match family member", "Listen and choose", "Talk about my family"],
    steps: [
      { book: "1B", lesson: 1, title: "Mum and dad", note: "Start with immediate family." },
      { book: "1B", lesson: 2, title: "Brothers and sisters", note: "Expand the family set." },
      { book: "2A", lesson: 2, title: "Two younger brothers", note: "Add sibling language in sentences." },
      { book: "3A", lesson: 4, title: "Family", note: "Widen the family topic." }
    ]
  },
  {
    id: "body",
    title: "Body",
    summary: "A visual topic that works well for touch interaction and movement.",
    progressLabel: "1B core topic",
    iconText: "手眼",
    iconColor: "#5f8f8a",
    focus: {
      hanzi: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚",
      pinyin: "tóu, é tóu, tóu fa, yǎn jing, ěr duo, bí zi, zuǐ ba, bó zi, shǒu bì, shǒu, tuǐ, jiǎo",
      english: "head, forehead, hair, eyes, ears, nose, mouth, neck, arm, hand, leg, foot",
      audio: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚"
    },
    focusItems: [
      { id: "head", hanzi: "头", pinyin: "tóu", english: "head", audio: "头" },
      { id: "forehead", hanzi: "额头", pinyin: "é tóu", english: "forehead", audio: "额头" },
      { id: "hair", hanzi: "头发", pinyin: "tóu fa", english: "hair", audio: "头发" },
      { id: "eyes", hanzi: "眼睛", pinyin: "yǎn jing", english: "eyes", audio: "眼睛" },
      { id: "ears", hanzi: "耳朵", pinyin: "ěr duo", english: "ears", audio: "耳朵" },
      { id: "nose", hanzi: "鼻子", pinyin: "bí zi", english: "nose", audio: "鼻子" },
      { id: "mouth", hanzi: "嘴巴", pinyin: "zuǐ ba", english: "mouth", audio: "嘴巴" },
      { id: "neck", hanzi: "脖子", pinyin: "bó zi", english: "neck", audio: "脖子" },
      { id: "arm", hanzi: "手臂", pinyin: "shǒu bì", english: "arm", audio: "手臂" },
      { id: "hand", hanzi: "手", pinyin: "shǒu", english: "hand", audio: "手" },
      { id: "leg", hanzi: "腿", pinyin: "tuǐ", english: "leg", audio: "腿" },
      { id: "foot", hanzi: "脚", pinyin: "jiǎo", english: "foot", audio: "脚" }
    ],
    interactiveScene: "body-face",
    parentGuide:
      "Tap a body word, hear it together, then point to the same body part on yourself or on the character.",
    cultureGuide:
      "Body vocabulary is simple to act out, so it is a good topic for young beginners who are still building confidence.",
    activities: ["Tap word to hear", "See the body part glow", "Listen and point", "Picture matching"],
    steps: [
      { book: "1B", lesson: 3, title: "Parts of the body (1)", note: "Start with the first body words." },
      { book: "1B", lesson: 4, title: "Parts of the body (2)", note: "Expand and reinforce the body set." }
    ]
  },
  {
    id: "animals",
    title: "Pets & Animals",
    summary: "High-interest vocabulary that can connect to home life and stories.",
    progressLabel: "1B to 2B",
    iconText: "小狗",
    iconColor: "#8e6f9b",
    focus: {
      hanzi: "小狗，小猫",
      pinyin: "xiǎo gǒu, xiǎo māo",
      english: "puppy, kitten",
      audio: "小狗，小猫"
    },
    parentGuide:
      "This topic works especially well with pictures and sound imitation. Keep it playful and quick.",
    cultureGuide:
      "Animals can later connect naturally to zodiac content and story-based culture lessons.",
    activities: ["Tap to hear", "Match picture to word", "Listen and choose", "Animal sound game"],
    steps: [
      { book: "1B", lesson: 5, title: "Pets", note: "Begin with common pet words." },
      { book: "2B", lesson: 5, title: "Animals", note: "Broaden into a larger animal set." }
    ]
  },
  {
    id: "colours",
    title: "Colours",
    summary: "A repeated visual topic that can be practiced easily on phones and tablets.",
    progressLabel: "1B to 2A",
    iconText: "红蓝",
    iconColor: "#c36f62",
    focus: {
      hanzi: "红色，蓝色，黄色",
      pinyin: "hóng sè, lán sè, huáng sè",
      english: "red, blue, yellow",
      audio: "红色，蓝色，黄色"
    },
    focusItems: [
      { id: "red", hanzi: "红色", pinyin: "hóng sè", english: "red", audio: "红色" },
      { id: "blue", hanzi: "蓝色", pinyin: "lán sè", english: "blue", audio: "蓝色" },
      { id: "yellow", hanzi: "黄色", pinyin: "huáng sè", english: "yellow", audio: "黄色" }
    ],
    parentGuide:
      "Practice with crayons, clothes, fruit, or toys. The more real and visible the better.",
    cultureGuide:
      "Colour topics are a natural place to add small festival and clothing connections later.",
    activities: ["Tap to hear", "Choose the colour", "Colour hunt", "Listen and point"],
    steps: [
      { book: "1B", lesson: 6, title: "Colours", note: "Start with common colour words." },
      { book: "2A", lesson: 7, title: "Colours", note: "Review and strengthen the same topic later." }
    ]
  },
  {
    id: "food",
    title: "Food & Drinks",
    summary: "Name food and drinks, from fruit and vegetables to snacks and everyday meals.",
    progressLabel: "1B to 3B",
    iconText: "水果",
    iconColor: "#c48d46",
    focus: {
      hanzi: "我吃苹果，喝牛奶。",
      pinyin: "wǒ chī píng guǒ, hē niú nǎi.",
      english: "I eat apples and drink milk.",
      audio: "我吃苹果喝牛奶"
    },
    interactiveScene: "food-scenes",
    parentGuide:
      "This is one of the easiest topics to make real. Use snack time, lunch, and shopping to repeat words naturally.",
    cultureGuide:
      "Food is a great place to add extra content later: dumplings, mooncakes, zòngzi, fruit names, and meal routines.",
    activities: ["Tap to hear", "Name the food", "Match the words", "Build a sentence"],
    steps: [
      { book: "1B", lesson: 7, title: "Fruit", note: "Begin with highly visual food words." },
      { book: "2B", lesson: 7, title: "Snacks", note: "Add everyday treat vocabulary." },
      { book: "3B", lesson: 6, title: "Vegetables", note: "Extend the category." }
    ]
  },
  {
    id: "food-preferences",
    title: "Food Preferences",
    summary: "Ask what someone likes to eat and say what you like or do not like.",
    progressLabel: "3B Lesson 5",
    iconText: "喜欢",
    iconColor: "#c48d46",
    focus: {
      hanzi: "你喜欢吃什么？",
      pinyin: "nǐ xǐ huan chī shén me?",
      english: "What do you like to eat?",
      audio: "你喜欢吃什么"
    },
    interactiveScene: "food-preferences",
    parentGuide: "Ask 你喜欢吃什么？, then let your child answer with one food they like or do not like.",
    cultureGuide: "喜欢吃 and 不喜欢吃 make it easy to share a real preference at a meal or snack time.",
    activities: ["Play scenes", "Say a preference", "Listen and choose", "Build a sentence"],
    steps: [{ book: "3B", lesson: 5, title: "Food and drink", note: "Talk about foods and drinks you like." }]
  },
  {
    id: "meals-feelings",
    title: "Meals & Feelings",
    summary: "Talk about lunch and say when you are hungry or thirsty.",
    progressLabel: "4A Lessons 5 and 7",
    iconText: "午饭",
    iconColor: "#c48d46",
    focus: {
      hanzi: "我午饭喝了牛奶，吃了披萨。",
      pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.",
      english: "For lunch, I drank milk and ate pizza.",
      audio: "我午饭喝了牛奶吃了披萨"
    },
    interactiveScene: "meals-feelings",
    parentGuide: "Use lunch or snack time to ask whether your child is hungry or thirsty, then say what they eat or drink.",
    cultureGuide: "Meals and feelings connect simple food words to a useful everyday situation.",
    activities: ["Play scenes", "Talk about lunch", "Listen and choose", "Build a sentence"],
    steps: [
      { book: "4A", lesson: 5, title: "My lunch", note: "Say what you eat and drink for lunch." },
      { book: "4A", lesson: 7, title: "I'm hungry", note: "Say when you are hungry or thirsty." }
    ]
  },
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
  {
    id: "hobbies",
    title: "Hobbies",
    summary: "A good branch for personal expression and longer conversations later.",
    progressLabel: "2A to 4B",
    iconText: "喜欢",
    iconColor: "#8f6988",
    focus: {
      hanzi: "我喜欢看书。",
      pinyin: "wǒ xǐ huan kàn shū.",
      english: "I like reading.",
      audio: "我喜欢看书"
    },
    parentGuide:
      "Choose activities the child already loves. Familiar routines make speaking practice feel much less abstract.",
    cultureGuide:
      "Hobbies are a nice place to introduce art, music, and cultural interests once the core language is stable.",
    activities: ["Tap to hear", "Choose what I like", "Listen and choose", "Talk about my hobby"],
    steps: [
      { book: "2A", lesson: 5, title: "I love reading", note: "Start with a simple preference pattern." },
      { book: "3B", lesson: 4, title: "Hobbies", note: "Broaden the hobby set." },
      { book: "4B", lesson: 4, title: "Hobbies", note: "Revisit hobby language." },
      { book: "4B", lesson: 7, title: "Leisure time", note: "Use hobbies in free-time language." }
    ]
  },
  {
    id: "toys",
    title: "Toys",
    summary: "A focused toy and kid-transport word set that fits Book 2A well and works for quick picture-based review.",
    progressLabel: "2A toy store",
    iconText: "玩具",
    iconColor: "#b86f52",
    iconAccent: "#f2cb7f",
    iconTheme: "toys",
    focus: {
      hanzi: "玩具汽车，火车，飞机",
      pinyin: "wán jù qì chē, huǒ chē, fēi jī",
      english: "toy car, train, airplane",
      audio: "玩具汽车，火车，飞机"
    },
    focusItems: [
      { id: "toy-car", hanzi: "玩具汽车", pinyin: "wán jù qì chē", english: "toy car", audio: "玩具汽车" },
      { id: "train", hanzi: "火车", pinyin: "huǒ chē", english: "train", audio: "火车" },
      { id: "airplane", hanzi: "飞机", pinyin: "fēi jī", english: "airplane", audio: "飞机" },
      { id: "school-bus", hanzi: "校车", pinyin: "xiào chē", english: "school bus", audio: "校车" },
      { id: "subway", hanzi: "地铁", pinyin: "dì tiě", english: "subway", audio: "地铁" },
      { id: "toy-doll", hanzi: "玩具娃娃", pinyin: "wán jù wá wa", english: "toy doll", audio: "玩具娃娃" },
      { id: "bicycle", hanzi: "自行车", pinyin: "zì xíng chē", english: "bicycle", audio: "自行车" }
    ],
    parentGuide:
      "Use the child's own toy shelf first. Point, tap the card, hear the word, then ask the child to find the matching toy or vehicle.",
    cultureGuide:
      "This set bridges toy language and everyday transport language, so it can grow naturally into later daily-life lessons.",
    activities: ["Tap to hear", "Find the toy", "Listen and choose", "Sort toys and vehicles"],
    steps: [{ book: "2A", lesson: 4, title: "My toys", note: "Learn a core toy set with familiar child-friendly objects." }]
  },
  {
    id: "clothes",
    title: "Clothes",
    summary: "A concrete everyday topic that can grow from basic words into dressing and weather use.",
    progressLabel: "2A to 4B",
    iconText: "衣服",
    iconColor: "#9c7b4f",
    focus: {
      hanzi: "我会穿衣服。",
      pinyin: "wǒ huì chuān yī fu.",
      english: "I can get dressed.",
      audio: "我会穿衣服"
    },
    focusItems: [
      { id: "shirt", hanzi: "T恤", pinyin: "T xù", english: "T-shirt", audio: "T恤" },
      { id: "pants", hanzi: "裤子", pinyin: "kù zi", english: "trousers; pants", audio: "裤子" },
      { id: "dress", hanzi: "裙子", pinyin: "qún zi", english: "dress; skirt", audio: "裙子" },
      { id: "shoes", hanzi: "鞋子", pinyin: "xié zi", english: "shoes", audio: "鞋子" },
      { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "hat", audio: "帽子" },
      { id: "jacket", hanzi: "外套", pinyin: "wài tào", english: "jacket; coat", audio: "外套" },
      { id: "gloves", hanzi: "手套", pinyin: "shǒu tào", english: "gloves", audio: "手套" }
    ],
    interactiveScene: "clothes-scenes",
    parentGuide:
      "Use getting dressed as the practice moment. Repeating the words during a real routine makes them stick.",
    cultureGuide:
      "Clothes can later connect to colours, weather, and festival dress without needing a lot of extra explanation.",
    activities: ["Tap to hear", "Match the clothing", "Dress for the weather", "Listen and choose"],
    steps: [
      { book: "2A", lesson: 6, title: "I can dress myself", note: "Start with dressing language." },
      { book: "3A", lesson: 7, title: "Clothes", note: "Build a fuller clothing set." },
      { book: "4B", lesson: 2, title: "Clothes", note: "Reconnect clothing with weather and daily life." }
    ]
  },
  {
    id: "daily-life",
    title: "My Home",
    summary: "Explore the rooms and familiar things in a home.",
    progressLabel: "4B Lesson 3",
    iconText: "我的家",
    iconColor: "#6c8c7f",
    focus: {
      hanzi: "我的家里有客厅、卧室和车库。",
      pinyin: "wǒ de jiā lǐ yǒu kè tīng, wò shì hé chē kù.",
      english: "My home has a living room, bedroom, and garage.",
      audio: "我的家里有客厅卧室和车库"
    },
    interactiveScene: "rooms",
    parentGuide:
      "This topic becomes much easier when children can point to real places and routines in their own day.",
    cultureGuide:
      "Daily life topics make the tool feel practical instead of toy-like, which fits your goal well.",
    activities: ["Tap to hear", "Room scenes", "Room words"],
    steps: [{ book: "4B", lesson: 3, title: "My room", note: "Bring language into the home setting." }]
  },
  {
    id: "comparisons",
    title: "Descriptions & Comparisons",
    summary: "Compare size, amount, speed, length, temperature, and more.",
    progressLabel: "2B Lesson 6",
    iconText: "大小",
    iconColor: "#aa7051",
    focus: { hanzi: "大和小", pinyin: "dà hé xiǎo", english: "big and small", audio: "大和小" },
    interactiveScene: "comparisons",
    parentGuide: "Compare real objects together: a big and small cup, a long and short pencil, or a fast and slow walk.",
    cultureGuide: "Comparison words are useful across nearly every later topic because children can see and act them out immediately.",
    activities: ["Tap to hear", "Compare two things", "Say what you see"],
    steps: [{ book: "2B", lesson: 6, title: "Big or small", note: "Use opposite description words." }]
  },
  {
    id: "positions",
    title: "Positions & Directions",
    summary: "Use up, down, inside, outside, and directions to describe where things are.",
    progressLabel: "3B Lesson 3",
    iconText: "上下",
    iconColor: "#587d9c",
    focus: { hanzi: "在上面。", pinyin: "zài shàng miàn.", english: "It is on top.", audio: "在上面" },
    interactiveScene: "positions",
    parentGuide: "Use a book, backpack, and pencil case to act out each position before naming it.",
    cultureGuide: "Position language becomes useful quickly in classroom directions, home routines, and simple games.",
    activities: ["Tap to hear", "Find the position", "Say where it is"],
    steps: [{ book: "3B", lesson: 3, title: "Positions", note: "Describe where objects are." }]
  },
  {
    id: "transport",
    title: "Transportation",
    summary: "Talk about how people travel to school, places, and family visits.",
    progressLabel: "4A Lesson 6",
    iconText: "交通",
    iconColor: "#6d8a4f",
    focus: { hanzi: "我坐校车去动物园。", pinyin: "wǒ zuò xiào chē qù dòng wù yuán.", english: "I take the school bus to the zoo.", audio: "我坐校车去动物园" },
    interactiveScene: "transport",
    parentGuide: "Start with how the child actually gets to school, then use the other scenes as conversation prompts.",
    cultureGuide: "Travel scenes make useful speaking practice because each vehicle has a clear destination and reason for the trip.",
    activities: ["Tap to hear", "Choose the vehicle", "Talk about a trip"],
    steps: [{ book: "4A", lesson: 6, title: "Means of transport", note: "Say how people travel." }]
  },
  {
    id: "weather",
    title: "Weather",
    summary: "A natural topic for daily check-ins, clothing choices, and routine speech.",
    progressLabel: "4B branch",
    iconText: "下雨",
    iconColor: "#6f7fa4",
    focus: {
      hanzi: "下雨了。",
      pinyin: "xià yǔ le.",
      english: "It is raining.",
      audio: "下雨了"
    },
    parentGuide:
      "This is best as a daily one-minute habit. Check the weather together and say the phrase before leaving home.",
    cultureGuide:
      "Weather combines nicely with clothing and seasonal culture content later.",
    activities: ["Tap to hear", "Choose today's weather", "Dress for the weather", "Listen and choose"],
    steps: [{ book: "4B", lesson: 1, title: "It's raining", note: "Start weather language with a concrete daily phrase." }]
  }
];

const numberEnglishBase = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty"
];

const numberDigitMap = {
  0: { hanzi: "零", pinyin: "líng" },
  1: { hanzi: "一", pinyin: "yī" },
  2: { hanzi: "二", pinyin: "èr" },
  3: { hanzi: "三", pinyin: "sān" },
  4: { hanzi: "四", pinyin: "sì" },
  5: { hanzi: "五", pinyin: "wǔ" },
  6: { hanzi: "六", pinyin: "liù" },
  7: { hanzi: "七", pinyin: "qī" },
  8: { hanzi: "八", pinyin: "bā" },
  9: { hanzi: "九", pinyin: "jiǔ" },
  10: { hanzi: "十", pinyin: "shí" }
};

const numberStages = [
  {
    id: "1a-1",
    bookId: "1a",
    lesson: 1,
    title: "1 to 5",
    summary: "Start with the first counting words and match them to real objects.",
    start: 1,
    end: 5,
    practicePrompt: "Count animals, fingers, or blocks from one to five.",
    visualEmojis: ["🐥", "🐰", "🦆", "🐻", "🐸"],
    visualLabel: "chicks"
  },
  {
    id: "1a-2",
    bookId: "1a",
    lesson: 2,
    title: "6 to 10",
    summary: "Add six to ten, while still keeping one to five warm through movement.",
    start: 6,
    end: 10,
    practicePrompt: "Clap for one to five and stamp for six to ten.",
    visualEmojis: ["🧸", "🚗", "🪀", "🧩", "⚽"],
    visualLabel: "toys"
  },
  {
    id: "1a-3",
    bookId: "1a",
    lesson: 3,
    title: "11 to 20",
    summary: "Move into teen numbers with card finding, counting, and sequence work.",
    start: 11,
    end: 20,
    practicePrompt: "Point to the right number card and count objects up to twenty.",
    visualEmojis: ["🍦", "🍎", "🍓", "🧁", "🍊"],
    visualLabel: "ice creams"
  },
  {
    id: "2a-1",
    bookId: "2a",
    lesson: 1,
    title: "21 to 40",
    summary: "Grow into larger counting while keeping the tens pattern clear.",
    start: 21,
    end: 40,
    practicePrompt: "Read the tens pattern first, then add the last digit.",
    visualEmojis: ["🚗", "🚌", "🚲", "🚕", "🚙"],
    visualLabel: "cars"
  },
  {
    id: "3a-1",
    bookId: "3a",
    lesson: 1,
    title: "41 to 100",
    summary: "Extend number fluency into bigger sets and longer counting runs.",
    start: 41,
    end: 100,
    practicePrompt: "Read by tens first, then slow down and notice the ones.",
    visualEmojis: ["⭐", "🌟", "✨", "💫", "🪐"],
    visualLabel: "stars"
  },
  {
    id: "4a-1",
    bookId: "4a",
    lesson: 1,
    title: "Telephone numbers",
    summary: "Use number reading in a real-life sequence instead of isolated counting.",
    start: 0,
    end: 9,
    practicePrompt: "Say each digit clearly, one by one, in a phone-number rhythm.",
    telephoneMode: true,
    visualEmojis: ["☎️", "📞", "🔢", "🎧", "📟"],
    visualLabel: "phone digits"
  }
];

const telephonePractice = {
  question: {
    hanzi: "你的电话号码是多少？",
    pinyin: "nǐ de diàn huà hào mǎ shì duō shao?",
    english: "What is your phone number?",
    audio: "你的电话号码是多少"
  },
  answer: {
    hanzi: "我的电话号码是六八二四九七三一三二。",
    pinyin: "wǒ de diàn huà hào mǎ shì liù bā èr sì jiǔ qī sān yī sān èr.",
    english: "My phone number is 6824973132.",
    audio: "我的电话号码是六八二四九七三一三二"
  },
  digits: ["六", "八", "二", "四", "九", "七", "三", "一", "三", "二"]
};

const greetingsPractice = [
  {
    id: "scene-1",
    number: "1",
    prompt: "Greeting a teacher politely",
    imagePath: "assets/greetings/greetings-scene-1.webp",
    imageAlt: "Teacher Li greeting Anan outside the school entrance",
    lines: [
      { hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      {
        hanzi: "李老师，您好！",
        pinyin: "Lǐ lǎo shī, nín hǎo!",
        english: "Hello, Teacher Li!",
        audio: "李老师您好"
      }
    ]
  },
  {
    id: "scene-2",
    number: "2",
    prompt: "Friends meeting in the morning",
    imagePath: "assets/greetings/greetings-scene-2.webp",
    imageAlt: "Lele and Anan greeting each other on the way into school, with other children arriving behind them",
    lines: [
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" }
    ]
  },
  {
    id: "scene-3",
    number: "3",
    prompt: "Saying goodbye",
    imagePath: "assets/greetings/greetings-scene-3.webp",
    imageAlt: "Lele and Anan waving goodbye after school as children come out of the building and head home",
    lines: [
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" }
    ]
  }
];

const greetingsGameItemIds = ["hello", "teacher-hello", "good-morning", "goodbye"];
const politeGameItemIds = ["thank-you", "youre-welcome", "sorry", "never-mind"];
const introductionsGameSpeakerIds = ["anan", "tiantian", "sisi", "lele"];
const ageGameItemIds = ["ask-age", "age-five", "age-six", "age-seven", "ask-grade", "grade-one"];
const familyGameItemIds = [
  "dad-word",
  "mom-word",
  "older-brother-word",
  "younger-brother-word",
  "older-sister-word",
  "younger-sister-word"
];

const identityCountries = [
  { id: "china", label: "China", hanzi: "中国", nationality: "中国人", pinyin: "Zhōng guó rén", asset: "assets/illustrated-flags/china.webp", focusItemId: "china", response: { hanzi: "我是中国人，我会说汉语。", pinyin: "wǒ shì Zhōng guó rén, wǒ huì shuō Hànyǔ.", english: "I am Chinese. I can speak Chinese.", audio: "我是中国人，我会说汉语" } },
  { id: "usa", label: "United States", hanzi: "美国", nationality: "美国人", pinyin: "Měi guó rén", asset: "assets/illustrated-flags/united-states.webp", focusItemId: "usa", response: { hanzi: "我是美国人，我会说英语。", pinyin: "wǒ shì Měi guó rén, wǒ huì shuō Yīngyǔ.", english: "I am American. I can speak English.", audio: "我是美国人，我会说英语" } },
  { id: "uk", label: "United Kingdom", hanzi: "英国", nationality: "英国人", pinyin: "Yīng guó rén", asset: "assets/illustrated-flags/united-kingdom.webp", focusItemId: "uk", response: { hanzi: "我是英国人，我会说英语。", pinyin: "wǒ shì Yīng guó rén, wǒ huì shuō Yīngyǔ.", english: "I am British. I can speak English.", audio: "我是英国人，我会说英语" } }
];

const identityQuestion = { hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What country are you from?", audio: "你是哪国人" };

const identityConversation = {
  imagePath: "assets/illustrated-identity/classmates-speak-different-languages.webp",
  imageAlt: "Two classmates talking about where they are from and the languages they speak",
  lines: [
    { hanzi: "我是中国人，我会说汉语。", pinyin: "wǒ shì Zhōng guó rén, wǒ huì shuō Hànyǔ.", english: "I am Chinese. I can speak Chinese.", audio: "我是中国人，我会说汉语" },
    { hanzi: "我是美国人，我会说英语。", pinyin: "wǒ shì Měi guó rén, wǒ huì shuō Yīngyǔ.", english: "I am American. I can speak English.", audio: "我是美国人，我会说英语" }
  ]
};

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
  "meals-feelings": mealsFeelingsTopicData,

};

const schoolSentenceBuilds = {
  stationery: stationerySentenceBuilds,
  "school-supplies": schoolSuppliesSentenceBuilds,
  school: schoolLessonSentenceBuilds,
  "school-subjects": schoolLessonSubjectsSentenceBuilds,
  food: foodSentenceBuilds,
  "meals-feelings": mealsFeelingsLessonSentenceBuilds

};
const clothesPractice = [
  {
    id: "clothes-scene-1",
    number: "1",
    prompt: "Getting dressed for the day",
    imagePath: "assets/illustrated-clothes/wearing-clothes-scene.webp",
    imageAlt: "A child getting dressed beside a clothes rack and mirror",
    lines: [
      { hanzi: "我会穿衣服。", pinyin: "wǒ huì chuān yī fu.", english: "I can get dressed.", audio: "我会穿衣服" },
      { hanzi: "我穿T恤和裤子。", pinyin: "wǒ chuān T xù hé kù zi.", english: "I wear a T-shirt and trousers.", audio: "我穿T恤和裤子" }
    ]
  },
  {
    id: "clothes-scene-2",
    number: "2",
    prompt: "Choosing clothes for rainy weather",
    imagePath: "assets/illustrated-clothes/weather-linked-clothing-scene.webp",
    imageAlt: "A child choosing a raincoat by a rainy window",
    lines: [
      { hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" },
      { hanzi: "我穿雨衣和雨鞋。", pinyin: "wǒ chuān yǔ yī hé yǔ xié.", english: "I wear a raincoat and rain boots.", audio: "我穿雨衣和雨鞋" }
    ]
  }
];

const clothesMatchItems = [
  { id: "shoes", hanzi: "鞋子", pinyin: "xié zi", english: "shoes", audio: "鞋子", imagePath: "assets/illustrated-self-dressing/putting-on-shoes.webp", imageAlt: "A child putting on shoes" },
  { id: "socks", hanzi: "袜子", pinyin: "wà zi", english: "socks", audio: "袜子", imagePath: "assets/illustrated-self-dressing/putting-on-socks.webp", imageAlt: "A child putting on socks" },
  { id: "jacket", hanzi: "外套", pinyin: "wài tào", english: "jacket", audio: "外套", imagePath: "assets/illustrated-self-dressing/putting-on-jacket.webp", imageAlt: "A child putting on a jacket" },
  { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "hat", audio: "帽子", imagePath: "assets/illustrated-self-dressing/putting-on-hat.webp", imageAlt: "A child putting on a hat" },
  { id: "school-uniform", hanzi: "校服", pinyin: "xiào fú", english: "school uniform", audio: "校服", imagePath: "assets/illustrated-self-dressing/putting-on-school-uniform.webp", imageAlt: "A child putting on a school uniform" }
];

const politePractice = [
  {
    id: "polite-scene-1",
    number: "1",
    prompt: "Saying thank you after a friend helps you",
    imagePath: "assets/polite/polite-scene-1.webp",
    imageAlt: "Two children in a classroom sharing a crayon politely",
    lines: [
      { hanzi: "谢谢你！", pinyin: "xiè xie nǐ!", english: "Thank you!", audio: "谢谢你" },
      { hanzi: "不客气。", pinyin: "bú kè qi.", english: "You're welcome.", audio: "不客气" }
    ]
  },
  {
    id: "polite-scene-2",
    number: "2",
    prompt: "Saying sorry after a mistake",
    imagePath: "assets/polite/polite-scene-2.webp",
    imageAlt: "One child apologizing after dropping a pencil case and another child forgiving kindly",
    lines: [
      { hanzi: "对不起。", pinyin: "duì bu qǐ.", english: "I'm sorry.", audio: "对不起" },
      { hanzi: "没关系。", pinyin: "méi guān xi.", english: "Never mind.", audio: "没关系" }
    ]
  },
  {
    id: "polite-scene-3",
    number: "3",
    prompt: "A polite classroom phrase from the teacher",
    imagePath: "assets/polite/polite-scene-3.webp",
    imageAlt: "A teacher kindly asking children to be quiet in the classroom",
    lines: [
      { hanzi: "请安静。", pinyin: "qǐng ān jìng.", english: "Please be quiet.", audio: "请安静" },
      { hanzi: "好。", pinyin: "hǎo.", english: "Okay.", audio: "好" }
    ]
  }
];

const familyPractice = [
  {
    id: "family-scene-1",
    number: "1",
    prompt: "Start with the family-love sentences from Book 1B",
    visual: "parents-love",
    imagePath: "assets/illustrated-family/family-scene-parents-love.webp",
    imageAlt: "A child happily hugged by mum and dad in a cozy living room",
    roomLabel: "living-room",
    sceneLabel: "Living room",
    sceneMood: "Loved at home",
    lines: [
      { hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
      { hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
      { hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" }
    ]
  },
  {
    id: "family-scene-2",
    number: "2",
    prompt: "Compare siblings by boy or girl, then older or younger",
    visual: "siblings-compare",
    imagePath: "assets/illustrated-family/family-scene-siblings.webp",
    imageAlt: "Four siblings together in a living room: older brother, younger brother, older sister, and younger sister",
    roomLabel: "playroom",
    sceneLabel: "Sibling map",
    sceneMood: "See both pairs at once",
    lines: [
      { personId: "older-brother", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
      { personId: "younger-brother", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
      { personId: "older-sister", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
      { personId: "younger-sister", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
    ]
  }
];

const illustratedFamily = {
  grandpa: {
    id: "grandpa",
    label: "Grandpa",
    ageGroup: "senior",
    path: "assets/illustrated-family/grandpa.webp"
  },
  grandma: {
    id: "grandma",
    label: "Grandma",
    ageGroup: "senior",
    path: "assets/illustrated-family/grandma.webp"
  },
  dad: {
    id: "dad",
    label: "Dad",
    ageGroup: "adult",
    path: "assets/illustrated-family/family-avatar-dad.webp"
  },
  mom: {
    id: "mom",
    label: "Mom",
    ageGroup: "adult",
    path: "assets/illustrated-family/family-avatar-mom.webp"
  },
  girl: {
    id: "girl",
    label: "Older sister",
    ageGroup: "8",
    path: "assets/illustrated-family/family-avatar-older-sister.webp"
  },
  boy: {
    id: "boy",
    label: "Younger brother",
    ageGroup: "6",
    path: "assets/illustrated-family/family-avatar-younger-brother.webp"
  }
};

const illustratedKids = {
  lele: {
    id: "lele",
    label: "Lele",
    hanziName: "乐乐",
    gender: "boy",
    ageGroup: "6-7",
    skinTone: "light",
    path: "assets/illustrated-kids/lele.webp"
  },
  meimei: {
    id: "meimei",
    label: "Meimei",
    hanziName: "美美",
    gender: "girl",
    ageGroup: "6-7",
    skinTone: "light-medium",
    path: "assets/illustrated-kids/meimei.webp"
  },
  yangyang: {
    id: "yangyang",
    label: "Yangyang",
    hanziName: "阳阳",
    gender: "boy",
    ageGroup: "8-9",
    skinTone: "tan",
    path: "assets/illustrated-kids/yangyang.webp"
  },
  anan: {
    id: "anan",
    label: "Anan",
    hanziName: "安安",
    gender: "girl",
    ageGroup: "8-9",
    skinTone: "light",
    path: "assets/illustrated-kids/anan.webp"
  },
  tiantian: {
    id: "tiantian",
    label: "Tiantian",
    hanziName: "天天",
    gender: "boy",
    ageGroup: "9-10",
    skinTone: "light-medium",
    path: "assets/illustrated-kids/tiantian.webp"
  },
  sisi: {
    id: "sisi",
    label: "Sisi",
    hanziName: "思思",
    gender: "girl",
    ageGroup: "8-10",
    skinTone: "medium brown",
    path: "assets/illustrated-kids/sisi.webp"
  },
  luna: {
    id: "luna",
    label: "Luna",
    hanziName: "露娜",
    gender: "girl",
    ageGroup: "8-10",
    skinTone: "medium",
    path: "assets/illustrated-kids/luna.webp"
  },
  sophie: {
    id: "sophie",
    label: "Sophie",
    hanziName: "苏菲",
    gender: "girl",
    ageGroup: "8-10",
    skinTone: "light",
    path: "assets/illustrated-kids/sophie.webp"
  },
  jaden: {
    id: "jaden",
    label: "Jaden",
    hanziName: "杰登",
    gender: "boy",
    ageGroup: "7-8",
    skinTone: "deep brown",
    path: "assets/illustrated-kids/jaden.webp"
  }
};

function timeDateRoutineVisual(item) {
  if (item.personId && item.clockPath) {
    const kid = illustratedKids[item.personId];
    if (!kid) {
      return "";
    }

    return `
      <div class="time-routine-visual time-routine-visual-split">
        <div class="time-routine-kid-card">
          <img class="time-routine-kid-image" src="${kid.path}" alt="${kid.label}" />
        </div>
        <div class="time-routine-clock-card">
          <img class="time-routine-clock-image" src="${item.clockPath}" alt="${item.english}" />
        </div>
      </div>
    `;
  }

  if (item.scenePath) {
    return `
      <div class="time-routine-visual">
        ${
          item.timeOfDayHanzi
            ? `
              <div class="time-routine-time-of-day-badge" aria-label="${item.timeOfDayEnglish}">
                <span class="time-routine-time-of-day-hanzi">${item.timeOfDayHanzi}</span>
                <span class="time-routine-time-of-day-label">${item.timeOfDayEnglish}</span>
              </div>
            `
            : ""
        }
        <img class="time-routine-scene-image" src="${item.scenePath}" alt="${item.routineEnglish}" />
      </div>
    `;
  }

  return "";
}

function numberEnglish(value) {
  if (value <= 20) {
    return numberEnglishBase[value];
  }

  if (value < 100) {
    const tensWords = {
      20: "twenty",
      30: "thirty",
      40: "forty",
      50: "fifty",
      60: "sixty",
      70: "seventy",
      80: "eighty",
      90: "ninety"
    };
    const tens = Math.floor(value / 10) * 10;
    const ones = value % 10;
    return ones === 0 ? tensWords[tens] : `${tensWords[tens]}-${numberEnglishBase[ones]}`;
  }

  if (value === 100) {
    return "one hundred";
  }

  return String(value);
}

function numberHanzi(value) {
  if (value <= 10) {
    return numberDigitMap[value].hanzi;
  }

  if (value < 20) {
    return `十${numberDigitMap[value % 10].hanzi}`;
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0
      ? `${numberDigitMap[tens].hanzi}十`
      : `${numberDigitMap[tens].hanzi}十${numberDigitMap[ones].hanzi}`;
  }

  if (value === 100) {
    return "一百";
  }

  return String(value);
}

function numberPinyin(value) {
  if (value <= 10) {
    return numberDigitMap[value].pinyin;
  }

  if (value < 20) {
    return `shí ${numberDigitMap[value % 10].pinyin}`;
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0
      ? `${numberDigitMap[tens].pinyin} shí`
      : `${numberDigitMap[tens].pinyin} shí ${numberDigitMap[ones].pinyin}`;
  }

  if (value === 100) {
    return "yì bǎi";
  }

  return String(value);
}

function buildNumberItem(value) {
  return {
    id: `num-${value}`,
    value,
    hanzi: numberHanzi(value),
    pinyin: numberPinyin(value),
    english: numberEnglish(value),
    audio: numberHanzi(value)
  };
}

function buildMultiplicationRhymeItems() {
  const items = [];
  for (let first = 1; first <= 9; first += 1) {
    for (let second = first; second <= 9; second += 1) {
      const product = first * second;
      const usesDe = product < 10;
      const hanzi = usesDe
        ? `${numberHanzi(first)}${numberHanzi(second)}得${numberHanzi(product)}`
        : `${numberHanzi(first)}${numberHanzi(second)}${numberHanzi(product)}`;
      const pinyin = usesDe
        ? `${numberPinyin(first)} ${numberPinyin(second)} dé ${numberPinyin(product)}`
        : `${numberPinyin(first)} ${numberPinyin(second)} ${numberPinyin(product)}`;
      items.push({
        id: `times-${first}-${second}`,
        hanzi,
        pinyin,
        english: `${first} x ${second} = ${product}`,
        audio: hanzi,
        first,
        second,
        product
      });
    }
  }
  return items;
}

topicData.find((topic) => topic.id === "multiplication-rhyme").focusItems = buildMultiplicationRhymeItems();

const books = [
  {
    id: "1a",
    label: "Book 1A",
    lessons: [
      { lesson: 1, title: "Numbers (1)", topicId: "numbers" },
      { lesson: 2, title: "Numbers (2)", topicId: "numbers" },
      { lesson: 3, title: "Numbers (3)", topicId: "numbers" },
      { lesson: 4, title: "Hello!", topicId: "greetings" },
      { lesson: 5, title: "Thank you!", topicId: "polite-words" },
      { lesson: 6, title: "What's your name?", topicId: "introductions" },
      { lesson: 7, title: "I'm 5 years old", topicId: "age" }
    ]
  },
  {
    id: "1b",
    label: "Book 1B",
    lessons: [
      { lesson: 1, title: "Mum and dad", topicId: "family" },
      { lesson: 2, title: "Brothers and sisters", topicId: "family" },
      { lesson: 3, title: "Parts of the body (1)", topicId: "body" },
      { lesson: 4, title: "Parts of the body (2)", topicId: "body" },
      { lesson: 5, title: "Pets", topicId: "animals" },
      { lesson: 6, title: "Colours", topicId: "colours" },
      { lesson: 7, title: "Fruit", topicId: "food" }
    ]
  },
  {
    id: "2a",
    label: "Book 2A",
    lessons: [
      { lesson: 1, title: "Numbers", topicId: "numbers" },
      { lesson: 2, title: "Two younger brothers", topicId: "family" },
      { lesson: 3, title: "Good friends", topicId: "introductions" },
      { lesson: 4, title: "My toys", topicId: "toys" },
      { lesson: 5, title: "I love reading", topicId: "hobbies" },
      { lesson: 6, title: "I can dress myself", topicId: "clothes" },
      { lesson: 7, title: "Colours", topicId: "colours" }
    ]
  },
  {
    id: "2b",
    label: "Book 2B",
    lessons: [
      { lesson: 1, title: "Today is Monday", topicId: "weekdays" },
      { lesson: 2, title: "What time is it?", topicId: "time-date" },
      { lesson: 3, title: "Stationery", topicId: "stationery" },
      { lesson: 4, title: "My classroom", topicId: "classroom" },
      { lesson: 5, title: "Animals", topicId: "animals" },
      { lesson: 6, title: "Big or small", topicId: "comparisons" },
      { lesson: 7, title: "Snacks", topicId: "food" }
    ]
  },
  {
    id: "3a",
    label: "Book 3A",
    lessons: [
      { lesson: 1, title: "Numbers", topicId: "numbers" },
      { lesson: 2, title: "Date", topicId: "dates" },
      { lesson: 3, title: "Happy birthday!", topicId: "dates" },
      { lesson: 4, title: "Family", topicId: "family" },
      { lesson: 5, title: "Nationality", topicId: "identity" },
      { lesson: 6, title: "Request", topicId: "polite-words" },
      { lesson: 7, title: "Clothes", topicId: "clothes" }
    ]
  },
  {
    id: "3b",
    label: "Book 3B",
    lessons: [
      { lesson: 1, title: "My schoolbag", topicId: "school-supplies" },
      { lesson: 2, title: "Our classroom", topicId: "classroom" },
      { lesson: 3, title: "Positions", topicId: "positions" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies" },
      { lesson: 5, title: "Food and drink", topicId: "food-preferences" },
      { lesson: 6, title: "Vegetables", topicId: "food" },
      { lesson: 7, title: "Nature", topicId: "weather" }
    ]
  },
  {
    id: "4a",
    label: "Book 4A",
    lessons: [
      { lesson: 1, title: "Telephone numbers", topicId: "numbers" },
      { lesson: 2, title: "Languages", topicId: "identity" },
      { lesson: 3, title: "Tell the time", topicId: "time-date" },
      { lesson: 4, title: "Daily routine", topicId: "time-date" },
      { lesson: 5, title: "My lunch", topicId: "meals-feelings" },
      { lesson: 6, title: "Means of transport", topicId: "transport" },
      { lesson: 7, title: "I'm hungry", topicId: "meals-feelings" }
    ]
  },
  {
    id: "4b",
    label: "Book 4B",
    lessons: [
      { lesson: 1, title: "It's raining", topicId: "weather" },
      { lesson: 2, title: "Clothes", topicId: "clothes" },
      { lesson: 3, title: "My room", topicId: "daily-life" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies" },
      { lesson: 5, title: "Our school", topicId: "school" },
      { lesson: 6, title: "School subjects", topicId: "school-subjects" },
      { lesson: 7, title: "Leisure time", topicId: "hobbies" }
    ]
  }
];

const bookHomeCategories = [
  {
    id: "first-steps",
    zhTitle: "第一阶段",
    enTitle: "First Steps",
    hint: "Book 1A and 1B: first speaking, family, colours, food",
    accent: "#be5b49",
    iconEmoji: "🌱",
    bookIds: ["1a", "1b"]
  },
  {
    id: "build-core",
    zhTitle: "第二阶段",
    enTitle: "Build the Core",
    hint: "Book 2A and 2B: toys, school, time, daily language",
    accent: "#6d8a4f",
    iconEmoji: "🧩",
    bookIds: ["2a", "2b"]
  },
  {
    id: "expand-language",
    zhTitle: "第三阶段",
    enTitle: "Expand the Language",
    hint: "Book 3A and 3B: birthdays, requests, backpack, hobbies",
    accent: "#517b8d",
    iconEmoji: "📘",
    bookIds: ["3a", "3b"]
  },
  {
    id: "real-life-use",
    zhTitle: "第四阶段",
    enTitle: "Real-Life Use",
    hint: "Book 4A and 4B: routines, weather, transport, school life",
    accent: "#8f6988",
    iconEmoji: "🗣️",
    bookIds: ["4a", "4b"]
  }
];

const topicGroups = [
  {
    id: "foundations",
    label: "Foundations",
    description: "The first speaking patterns young learners need most.",
    topicIds: ["numbers", "multiplication-rhyme", "greetings", "polite-words", "introductions", "age", "identity"]
  },
  {
    id: "me-and-family",
    label: "Me & Family",
    description: "Personal, family, body, clothes, and everyday child language.",
    topicIds: ["family", "body", "animals", "colours", "clothes"]
  },
  {
    id: "daily-world",
    label: "Daily World",
    description: "Food, hobbies, routines, weather, and the world around the child.",
    topicIds: ["food", "food-preferences", "meals-feelings", "toys", "hobbies", "comparisons", "positions", "transport", "daily-life", "weather"]
  },
  {
    id: "school-and-time",
    label: "School & Time",
    description: "Practical classroom, calendar, and time-based language.",
    topicIds: ["weekdays", "time-date", "dates", "stationery", "school-supplies", "classroom", "school", "school-subjects"]
  }
];

const topicCardMeta = {
  numbers: { zhTitle: "数字", enTitle: "Numbers", hint: "Count, hear, and use numbers" },
  "multiplication-rhyme": { zhTitle: "九九乘法", enTitle: "Multiplication Rhyme", hint: "Classic rhythm practice" },
  greetings: { zhTitle: "打招呼", enTitle: "Greetings", hint: "Hello, good morning, goodbye" },
  "polite-words": { zhTitle: "礼貌用语", enTitle: "Polite Words", hint: "Thank you, sorry, please" },
  introductions: { zhTitle: "介绍自己", enTitle: "Introductions", hint: "Say your name and meet friends" },
  age: { zhTitle: "年龄", enTitle: "Age", hint: "Ask and say how old you are" },
  identity: { zhTitle: "国家和语言", enTitle: "Countries & Languages", hint: "Say where you are from and what you speak" },
  family: { zhTitle: "家人", enTitle: "Family", hint: "Mom, dad, siblings, grandparents" },
  body: { zhTitle: "身体", enTitle: "Body", hint: "Tap body parts and listen" },
  animals: { zhTitle: "动物", enTitle: "Animals", hint: "Pets and favorite animals" },
  colours: { zhTitle: "颜色", enTitle: "Colours", hint: "Red, yellow, blue, green" },
  food: { zhTitle: "食物和饮料", enTitle: "Food & Drinks", hint: "Fruit, vegetables, snacks, drinks" },
  "food-preferences": { zhTitle: "喜欢和不喜欢", enTitle: "Food Preferences", hint: "Ask and say what you like to eat" },
  "meals-feelings": { zhTitle: "午饭和感觉", enTitle: "Meals & Feelings", hint: "Lunch, hungry, thirsty" },
  weekdays: { zhTitle: "星期", enTitle: "Days of the Week", hint: "Monday to Sunday" },
  "time-date": { zhTitle: "时间", enTitle: "Time & Routines", hint: "Clock and daily routines" },
  dates: { zhTitle: "日期", enTitle: "Dates & Months", hint: "Months, dates, birthdays" },
  stationery: { zhTitle: "我的文具", enTitle: "My Stationery", hint: "My things, colors, and measure words" },
  "school-supplies": { zhTitle: "文具和书包", enTitle: "Stationery & Backpack", hint: "Pencil, ruler, books, backpack" },
  classroom: { zhTitle: "教室", enTitle: "Classroom", hint: "Classroom, table, chair, board" },
  school: { zhTitle: "我们的学校", enTitle: "Our School", hint: "Library, playground, cafeteria" },
  "school-subjects": { zhTitle: "学校学科", enTitle: "School Subjects", hint: "Chinese, English, music, art, PE" },
  hobbies: { zhTitle: "爱好", enTitle: "Hobbies", hint: "Reading, music, sports, games" },
  toys: { zhTitle: "玩具", enTitle: "Toys", hint: "Toy car, train, airplane" },
  clothes: { zhTitle: "衣服", enTitle: "Clothes", hint: "Dress for the day" },
  comparisons: { zhTitle: "描述和比较", enTitle: "Descriptions & Comparisons", hint: "Big, small, long, short" },
  positions: { zhTitle: "位置和方向", enTitle: "Positions & Directions", hint: "Up, down, inside, outside" },
  transport: { zhTitle: "交通", enTitle: "Transportation", hint: "Walk, bike, bus, train" },
  "daily-life": { zhTitle: "我的房间", enTitle: "My Room", hint: "Rooms and furniture" },
  weather: { zhTitle: "天气", enTitle: "Weather", hint: "Sun, rain, snow, wind" }
};

const learningHomeCategories = [
  {
    id: "foundations",
    zhTitle: "开口说中文",
    enTitle: "Start Speaking",
    hint: "Numbers, greetings, names, age, identity",
    accent: "#be5b49",
    iconSrc: "assets/navigation-icons/lele-wave-icon.webp",
    topicIds: ["numbers", "greetings", "polite-words", "introductions", "age", "identity", "multiplication-rhyme"]
  },
  {
    id: "me-family",
    zhTitle: "我和家人",
    enTitle: "Me & Family",
    hint: "Family, body, clothes",
    accent: "#aa7051",
    iconEmoji: "🏠",
    topicIds: ["family", "body", "clothes"]
  },
  {
    id: "time-daily",
    zhTitle: "时间和日常",
    enTitle: "Time & Daily Life",
    hint: "Week, time, dates, routines, home",
    accent: "#517b8d",
    iconSrc: "assets/illustrated-clocks/10oclock.webp",
    topicIds: ["weekdays", "time-date", "dates", "comparisons", "positions", "transport", "daily-life"]
  },
  {
    id: "school-life",
    zhTitle: "学校生活",
    enTitle: "School Life",
    hint: "Classroom, backpack, subjects",
    accent: "#6d8a4f",
    iconEmoji: "🏫",
    topicIds: ["stationery", "school-supplies", "classroom", "school", "school-subjects"]
  },
  {
    id: "food",
    zhTitle: "食物",
    enTitle: "Food",
    hint: "Food words, preferences, and meals",
    accent: "#c48d46",
    iconSrc: "assets/navigation-icons/burger-fries-icon.webp",
    topicIds: ["food", "food-preferences", "meals-feelings"]
  },
  {
    id: "world",
    zhTitle: "自然和颜色",
    enTitle: "World Around Us",
    hint: "Weather, animals, colours",
    accent: "#6f7fa4",
    iconSrc: "assets/navigation-icons/panda-bamboo-icon.webp",
    topicIds: ["weather", "animals", "colours"]
  },
  {
    id: "play",
    zhTitle: "兴趣和玩具",
    enTitle: "Play & Hobbies",
    hint: "Toys, sports, music, games",
    accent: "#8f6988",
    iconSrc: "assets/navigation-icons/teddy-robot-icon.webp",
    topicIds: ["toys", "hobbies"]
  }
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
  bodyMatchIncludeBonus: false,
  bodySelectedChineseId: null,
  bodySelectedEnglishId: null,
  bodyMatchedIds: new Set(),
  bodyRoundIds: [],
  bodyChineseOrder: [],
  bodyEnglishOrder: [],
  bodyMatchUniverseKey: "",
  lastBodyFeedback: "",
  numberChallengeStageId: "",
  numberChallengeTargetValue: null,
  numberChallengeOptionValues: [],
  lastNumberFeedback: "",
  numberChallengeAdvanceTimer: null,
  mathChallengeStageId: "",
  mathChallengeOperator: "+",
  mathChallengeLeft: null,
  mathChallengeRight: null,
  mathChallengeAnswer: null,
  lastMathFeedback: "",
  mathChallengeSolved: false,
  mathChallengeInput: "",
  greetingsChallengeAnswerId: "",
  greetingsChallengeOptionIds: [],
  greetingsChallengePickedId: "",
  greetingsChallengePromptId: "",
  greetingsChallengeResult: "",
  greetingsChallengeWrongIds: new Set(),
  lastGreetingsFeedback: "",
  greetingsListenFeedback: "",
  greetingsMatchFeedback: "",
  greetingsSelectedPhraseId: null,
  greetingsMatchedIds: new Set(),
  greetingsPhraseOrder: [],
  greetingsMeaningOrder: [],
  familyChallengeAnswerId: "",
  familyChallengeOptionIds: [],
  familyChallengePickedId: "",
  familyChallengePromptId: "",
  familyChallengeResult: "",
  familyChallengeWrongIds: new Set(),
  lastFamilyFeedback: "",
  familyListenFeedback: "",
  familyMatchFeedback: "",
  familySelectedPhraseId: null,
  familyMatchedIds: new Set(),
  familyPhraseOrder: [],
  familyMeaningOrder: [],
  weekdayChallengeAnswerId: "",
  weekdayChallengeOptionIds: [],
  weekdayChallengePickedId: "",
  weekdayChallengePromptId: "",
  weekdayChallengeResult: "",
  weekdayChallengeWrongIds: new Set(),
  weekdayListenFeedback: "",
  weekdayMatchFeedback: "",
  weekdaySelectedPhraseId: null,
  weekdayMatchedIds: new Set(),
  weekdayPhraseOrder: [],
  weekdayMeaningOrder: [],
  introductionsChallengeAnswerId: "",
  introductionsChallengeOptionIds: [],
  introductionsChallengePromptId: "",
  lastIntroductionsFeedback: "",
  introductionsBuildTargetId: "",
  introductionsBuildAvailableTokens: [],
  introductionsBuildSelectedTokens: [],
  ageChallengeAnswerId: "",
  ageChallengeOptionIds: [],
  ageChallengePromptId: "",
  lastAgeFeedback: "",
  ageBuildTargetId: "",
  ageBuildAvailableTokens: [],
  ageBuildSelectedTokens: [],
  politeChallengeAnswerId: "",
  politeChallengeOptionIds: [],
  politeChallengePickedId: "",
  politeChallengePromptId: "",
  politeChallengeResult: "",
  politeChallengeWrongIds: new Set(),
  lastPoliteFeedback: "",
  politeListenFeedback: "",
  politeMatchFeedback: "",
  politeSelectedPhraseId: null,
  politeMatchedIds: new Set(),
  politePhraseOrder: [],
  politeMeaningOrder: [],
  clothesQuizOrder: [],
  clothesQuizIndex: 0,
  clothesQuizOptionIds: [],
  clothesQuizSelectedId: "",
  clothesQuizResult: "",
  timeRoutineQuizOrder: [],
  timeRoutineQuizIndex: 0,
  timeRoutineQuizOptionIds: [],
  timeRoutineQuizSelectedId: "",
  timeRoutineQuizResult: "",
  clockQuizOrder: [],
  clockQuizIndex: 0,
  clockQuizOptionIds: [],
  clockQuizSelectedId: "",
  clockQuizResult: "",
  roomBuildOrder: [],
  roomBuildIndex: 0,
  roomBuildAvailableTokens: [],
  roomBuildSelectedTokens: [],
  roomBuildResult: "",
  dateChallengeAnswerId: "",
  dateChallengeOptionIds: [],
  dateChallengePickedId: "",
  dateChallengePromptId: "",
  dateChallengeResult: "",
  dateChallengeWrongIds: new Set(),
  dateListenFeedback: "",
  dateMatchFeedback: "",
  dateSelectedPhraseId: null,
  dateMatchedIds: new Set(),
  datePhraseOrder: [],
  dateEventOrder: [],
  transportBuildOrder: [],
  transportBuildIndex: 0,
  transportBuildAvailableTokens: [],
  transportBuildSelectedTokens: [],
  transportBuildResult: "",
  positionQuizOrder: [],
  positionQuizIndex: 0,
  positionQuizOptionIds: [],
  positionQuizSelectedId: "",
  positionQuizResult: "",
  comparisonBuildOrder: [],
  comparisonBuildIndex: 0,
  comparisonBuildAvailableTokens: [],
  comparisonBuildSelectedTokens: [],
  comparisonBuildResult: "",
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

function greetingsGameItems() {
  const greetingsTopic = topicById("greetings");
  return greetingsGameItemIds
    .map((id) => greetingsTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function resetGreetingsChallenge(options = {}) {
  const items = greetingsGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.greetingsChallengeAnswerId = answer.id;
  state.greetingsChallengePickedId = "";
  state.greetingsChallengePromptId = answer.id;
  state.greetingsChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.greetingsChallengeResult = "";
  state.greetingsChallengeWrongIds = new Set();
  state.greetingsListenFeedback = options.feedback ?? "";
  state.lastGreetingsFeedback = state.greetingsListenFeedback;
}

function ensureGreetingsChallenge() {
  if (!state.greetingsChallengeAnswerId || !state.greetingsChallengeOptionIds.length) {
    resetGreetingsChallenge();
  }
}

function greetingsMeaningLabel(itemId) {
  const labels = {
    hello: "Say hello to a friend",
    "teacher-hello": "Greet Teacher Li politely",
    "good-morning": "Say good morning at the start of the day",
    goodbye: "Say goodbye when leaving"
  };

  return labels[itemId] ?? "";
}

function resetGreetingsMatchGame(options = {}) {
  const items = greetingsGameItems();
  state.greetingsSelectedPhraseId = null;
  state.greetingsMatchedIds = new Set();
  state.greetingsPhraseOrder = shuffleArray(items.map((item) => item.id));
  state.greetingsMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.greetingsMatchFeedback = options.feedback ?? "";
  state.lastGreetingsFeedback = state.greetingsMatchFeedback;
}

function ensureGreetingsMatchGame() {
  const items = greetingsGameItems();
  if (
    !state.greetingsPhraseOrder.length ||
    state.greetingsPhraseOrder.length !== items.length ||
    state.greetingsMeaningOrder.length !== items.length
  ) {
    resetGreetingsMatchGame();
  }
}

function handleGreetingsMatchPhrase(itemId) {
  const item = greetingsGameItems().find((entry) => entry.id === itemId);
  if (!item || state.greetingsMatchedIds.has(itemId)) {
    return;
  }

  state.greetingsSelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.greetingsMatchFeedback = `Now find the situation for ${item.hanzi}.`;
  state.lastGreetingsFeedback = state.greetingsMatchFeedback;
  renderActivityPanel(currentTopic());
}

function handleGreetingsMatchAttempt(targetId) {
  if (!state.greetingsSelectedPhraseId || state.greetingsMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.greetingsSelectedPhraseId;
  const selectedItem = greetingsGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.greetingsMatchedIds = new Set([...state.greetingsMatchedIds, targetId]);
    state.greetingsSelectedPhraseId = null;
    state.greetingsMatchFeedback = `Correct! ${selectedItem.hanzi} matches that situation.`;
    state.lastGreetingsFeedback = state.greetingsMatchFeedback;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.greetingsMatchedIds.size === greetingsGameItems().length) {
      state.greetingsMatchFeedback = "Great job! You matched all the greetings.";
      state.lastGreetingsFeedback = state.greetingsMatchFeedback;
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.greetingsMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that situation.`;
  state.lastGreetingsFeedback = state.greetingsMatchFeedback;
  renderActivityPanel(currentTopic());
}

function familyGameItems() {
  const familyTopic = topicById("family");
  return familyGameItemIds
    .map((id) => familyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function familyPersonForItemId(itemId) {
  const personIdByItemId = {
    "dad-word": "dad",
    "mom-word": "mom",
    "older-brother-word": "older-brother",
    "younger-brother-word": "younger-brother",
    "older-sister-word": "older-sister",
    "younger-sister-word": "younger-sister"
  };
  const personId = personIdByItemId[itemId];
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
  return {
    "mom-word": "assets/illustrated-family/family-avatar-mom.webp",
    "dad-word": "assets/illustrated-family/family-avatar-dad.webp",
    "older-brother-word": "assets/illustrated-family/family-avatar-older-brother.webp",
    "younger-brother-word": "assets/illustrated-family/family-avatar-younger-brother.webp",
    "older-sister-word": "assets/illustrated-family/family-avatar-older-sister.webp",
    "younger-sister-word": "assets/illustrated-family/family-avatar-younger-sister.webp"
  }[itemId] ?? null;
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

function resetWeekdayChallenge(options = {}) {
  const candidates = timeDateWeekItems.filter((item) => item.id !== options.excludeId);
  const answers = candidates.length ? candidates : timeDateWeekItems;
  const answer = answers[Math.floor(Math.random() * answers.length)];
  const distractors = shuffleArray(timeDateWeekItems.filter((item) => item.id !== answer.id)).slice(0, 3);
  state.weekdayChallengeAnswerId = answer.id;
  state.weekdayChallengePromptId = answer.id;
  state.weekdayChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.weekdayChallengePickedId = "";
  state.weekdayChallengeResult = "";
  state.weekdayChallengeWrongIds = new Set();
  state.weekdayListenFeedback = "";
}

function ensureWeekdayChallenge() {
  if (!state.weekdayChallengeAnswerId || !state.weekdayChallengeOptionIds.length) resetWeekdayChallenge();
}

function handleWeekdayChallengePlay() {
  ensureWeekdayChallenge();
  const previousPromptId = state.weekdayChallengePromptId;
  resetWeekdayChallenge({ excludeId: previousPromptId });
  const item = timeDateWeekItems.find((entry) => entry.id === state.weekdayChallengePromptId);
  if (item && state.tapAudioEnabled) speak(`今天星期几？今天${item.hanzi}。`, 0.78);
  renderActivityPanel(currentTopic());
}

function handleWeekdayChallengeGuess(itemId) {
  ensureWeekdayChallenge();
  const isCorrect = itemId === state.weekdayChallengeAnswerId;
  state.weekdayChallengePickedId = itemId;
  state.weekdayChallengeResult = isCorrect ? "correct" : "wrong";
  if (!isCorrect) {
    state.weekdayChallengeWrongIds = new Set([...state.weekdayChallengeWrongIds, itemId]);
  } else if (state.tapAudioEnabled) {
    const item = timeDateWeekItems.find((entry) => entry.id === itemId);
    speak(item?.hanzi, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function resetWeekdayMatchGame() {
  state.weekdaySelectedPhraseId = null;
  state.weekdayMatchedIds = new Set();
  state.weekdayPhraseOrder = shuffleArray(timeDateWeekItems.map((item) => item.id));
  state.weekdayMeaningOrder = shuffleArray(timeDateWeekItems.map((item) => item.id));
  state.weekdayMatchFeedback = "";
}

function ensureWeekdayMatchGame() {
  if (!state.weekdayPhraseOrder.length || !state.weekdayMeaningOrder.length) resetWeekdayMatchGame();
}

function handleWeekdayMatchPhrase(itemId) {
  if (state.weekdayMatchedIds.has(itemId)) return;
  state.weekdaySelectedPhraseId = itemId;
  const item = timeDateWeekItems.find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.hanzi, 0.78);
  renderActivityPanel(currentTopic());
}

function handleWeekdayMatchAttempt(targetId) {
  if (!state.weekdaySelectedPhraseId || state.weekdayMatchedIds.has(targetId)) return;
  if (state.weekdaySelectedPhraseId === targetId) {
    state.weekdayMatchedIds = new Set([...state.weekdayMatchedIds, targetId]);
    state.weekdaySelectedPhraseId = null;
    state.weekdayMatchFeedback = "Matched.";
  } else {
    state.weekdayMatchFeedback = "Try a different card.";
  }
  renderActivityPanel(currentTopic());
}

function introductionsPromptById(promptId) {
  return introductionsGamePrompts.find((entry) => entry.id === promptId) ?? null;
}

function introductionsGameKids() {
  return introductionsGameSpeakerIds
    .map((id) => illustratedKids[id])
    .filter(Boolean);
}

function introductionsSelfIntroItemForKid(kidId) {
  const introductionsTopic = topicById("introductions");
  const itemIdByKidId = {
    anan: "my-name-anan",
    tiantian: "my-name-tiantian",
    sisi: "my-name-sisi",
    lele: "my-name-lele"
  };
  return introductionsTopic?.focusItems.find((item) => item.id === itemIdByKidId[kidId]) ?? null;
}

function resetIntroductionsChallenge(options = {}) {
  if (!introductionsGamePrompts.length || !introductionsGameSpeakerIds.length) {
    return;
  }

  const prompt = introductionsGamePrompts[Math.floor(Math.random() * introductionsGamePrompts.length)];
  state.introductionsChallengeAnswerId = prompt.speakerId;
  state.introductionsChallengePromptId = prompt.id;
  state.introductionsChallengeOptionIds = shuffleArray([...introductionsGameSpeakerIds]);
  state.lastIntroductionsFeedback = options.feedback ?? "";
}

function ensureIntroductionsChallenge() {
  if (!state.introductionsChallengeAnswerId || !state.introductionsChallengeOptionIds.length) {
    resetIntroductionsChallenge();
  }
}

function handleIntroductionsChallengePlay() {
  ensureIntroductionsChallenge();
  const prompt = introductionsPromptById(state.introductionsChallengePromptId);
  if (!prompt) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(prompt.audio, 0.78);
  }
  state.lastIntroductionsFeedback = "Listen again, then tap the child whose name you heard.";
  renderActivityPanel(currentTopic());
}

function handleIntroductionsChallengeGuess(kidId) {
  ensureIntroductionsChallenge();
  const answerPrompt = introductionsPromptById(state.introductionsChallengePromptId);
  const pickedKid = illustratedKids[kidId];
  const answerKid = illustratedKids[state.introductionsChallengeAnswerId];
  if (!answerPrompt || !pickedKid || !answerKid) {
    return;
  }

  if (kidId === answerPrompt.speakerId) {
    state.selectedFocusItemId = answerPrompt.sourceItemId;
    if (state.tapAudioEnabled) {
      speak(answerPrompt.audio, 0.78);
    }
    state.lastIntroductionsFeedback = `Correct! ${answerKid.hanziName} said ${answerPrompt.hanzi}`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetIntroductionsChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastIntroductionsFeedback = `Try again. You picked ${pickedKid.hanziName}, but the voice was ${answerKid.hanziName}.`;
  renderActivityPanel(currentTopic());
}

function introductionsBuildTarget() {
  return introductionsBuildPhrases.find((entry) => entry.id === state.introductionsBuildTargetId) ?? introductionsBuildPhrases[0];
}

function resetIntroductionsBuilder(options = {}) {
  const target = introductionsBuildPhrases[Math.floor(Math.random() * introductionsBuildPhrases.length)];
  state.introductionsBuildTargetId = target.id;
  state.introductionsBuildAvailableTokens = shuffleArray(target.tokens);
  state.introductionsBuildSelectedTokens = [];
  state.lastIntroductionsFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
}

function ensureIntroductionsBuilder() {
  const target = introductionsBuildTarget();
  if (!state.introductionsBuildTargetId || !state.introductionsBuildAvailableTokens.length && !state.introductionsBuildSelectedTokens.length) {
    resetIntroductionsBuilder();
    return;
  }
  if (!target) {
    resetIntroductionsBuilder();
  }
}

function handleIntroductionsBuildToken(tokenIndex) {
  const target = introductionsBuildTarget();
  const token = state.introductionsBuildAvailableTokens[tokenIndex];
  if (!target || !token) {
    return;
  }

  state.introductionsBuildSelectedTokens = [...state.introductionsBuildSelectedTokens, token];
  state.introductionsBuildAvailableTokens = state.introductionsBuildAvailableTokens.filter((_, index) => index !== tokenIndex);

  if (state.introductionsBuildSelectedTokens.length === target.tokens.length) {
    const correct = target.tokens.every((entry, index) => state.introductionsBuildSelectedTokens[index] === entry);
    if (correct) {
      if (state.tapAudioEnabled) {
        speak(target.audio, 0.78);
      }
      state.lastIntroductionsFeedback = `Correct! ${target.targetHanzi}`;
      if (target.sourceItemId) {
        state.selectedFocusItemId = target.sourceItemId;
        renderFocusDisplay(currentFocusItem());
        renderFocusExplorer();
        renderFocusStatus();
      }
    } else {
      state.lastIntroductionsFeedback = "Not quite. Try building the sentence again.";
    }
  }

  renderActivityPanel(currentTopic());
}

function handleIntroductionsBuildClear() {
  const target = introductionsBuildTarget();
  if (!target) {
    return;
  }
  state.introductionsBuildAvailableTokens = shuffleArray([...state.introductionsBuildAvailableTokens, ...state.introductionsBuildSelectedTokens]);
  state.introductionsBuildSelectedTokens = [];
  state.lastIntroductionsFeedback = "Try building the sentence again.";
  renderActivityPanel(currentTopic());
}

function ageGameItems() {
  const ageTopic = topicById("age");
  return ageGameItemIds
    .map((id) => ageTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function resetAgeChallenge(options = {}) {
  const items = ageGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.ageChallengeAnswerId = answer.id;
  state.ageChallengePromptId = answer.id;
  state.ageChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.lastAgeFeedback = options.feedback ?? "";
}

function ensureAgeChallenge() {
  if (!state.ageChallengeAnswerId || !state.ageChallengeOptionIds.length) {
    resetAgeChallenge();
  }
}

function handleAgeChallengePlay() {
  ensureAgeChallenge();
  const item = ageGameItems().find((entry) => entry.id === state.ageChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastAgeFeedback = `Listen again and find ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handleAgeChallengeGuess(itemId) {
  ensureAgeChallenge();
  const answer = ageGameItems().find((entry) => entry.id === state.ageChallengeAnswerId);
  const picked = ageGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.lastAgeFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetAgeChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastAgeFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function ageBuildTarget() {
  return ageBuildPhrases.find((entry) => entry.id === state.ageBuildTargetId) ?? ageBuildPhrases[0];
}

function resetAgeBuilder(options = {}) {
  const target = ageBuildPhrases[Math.floor(Math.random() * ageBuildPhrases.length)];
  state.ageBuildTargetId = target.id;
  state.ageBuildAvailableTokens = shuffleArray(target.tokens);
  state.ageBuildSelectedTokens = [];
  state.lastAgeFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
}

function ensureAgeBuilder() {
  const target = ageBuildTarget();
  if (!state.ageBuildTargetId || !state.ageBuildAvailableTokens.length && !state.ageBuildSelectedTokens.length) {
    resetAgeBuilder();
    return;
  }
  if (!target) {
    resetAgeBuilder();
  }
}

function handleAgeBuildToken(tokenIndex) {
  const target = ageBuildTarget();
  const token = state.ageBuildAvailableTokens[tokenIndex];
  if (!target || !token) {
    return;
  }

  state.ageBuildSelectedTokens = [...state.ageBuildSelectedTokens, token];
  state.ageBuildAvailableTokens = state.ageBuildAvailableTokens.filter((_, index) => index !== tokenIndex);

  if (state.ageBuildSelectedTokens.length === target.tokens.length) {
    const correct = target.tokens.every((entry, index) => state.ageBuildSelectedTokens[index] === entry);
    if (correct) {
      if (state.tapAudioEnabled) {
        speak(target.audio, 0.78);
      }
      state.lastAgeFeedback = `Correct! ${target.targetHanzi}`;
      if (target.sourceItemId) {
        state.selectedFocusItemId = target.sourceItemId;
        renderFocusDisplay(currentFocusItem());
        renderFocusExplorer();
        renderFocusStatus();
      }
    } else {
      state.lastAgeFeedback = "Not quite. Try building the sentence again.";
    }
  }

  renderActivityPanel(currentTopic());
}

function handleAgeBuildClear() {
  const target = ageBuildTarget();
  if (!target) {
    return;
  }
  state.ageBuildAvailableTokens = shuffleArray([...state.ageBuildAvailableTokens, ...state.ageBuildSelectedTokens]);
  state.ageBuildSelectedTokens = [];
  state.lastAgeFeedback = "Try building the sentence again.";
  renderActivityPanel(currentTopic());
}

function politeGameItems() {
  const politeTopic = topicById("polite-words");
  return politeGameItemIds
    .map((id) => politeTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function politeMeaningLabel(itemId) {
  const labels = {
    "thank-you": "Thank a friend who helped you",
    "youre-welcome": "Reply kindly after someone thanks you",
    sorry: "Say sorry after a mistake",
    "never-mind": "Forgive kindly after an apology"
  };

  return labels[itemId] ?? "";
}

function resetPoliteMatchGame(options = {}) {
  const items = politeGameItems();
  state.politeSelectedPhraseId = null;
  state.politeMatchedIds = new Set();
  state.politePhraseOrder = shuffleArray(items.map((item) => item.id));
  state.politeMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.politeMatchFeedback = options.feedback ?? "";
  state.lastPoliteFeedback = state.politeMatchFeedback;
}

function ensurePoliteMatchGame() {
  const items = politeGameItems();
  if (
    !state.politePhraseOrder.length ||
    state.politePhraseOrder.length !== items.length ||
    state.politeMeaningOrder.length !== items.length
  ) {
    resetPoliteMatchGame();
  }
}

function handlePoliteMatchPhrase(itemId) {
  const item = politeGameItems().find((entry) => entry.id === itemId);
  if (!item || state.politeMatchedIds.has(itemId)) {
    return;
  }

  state.politeSelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.politeMatchFeedback = `Now find the meaning for ${item.hanzi}.`;
  state.lastPoliteFeedback = state.politeMatchFeedback;
  renderActivityPanel(currentTopic());
}

function handlePoliteMatchAttempt(targetId) {
  if (!state.politeSelectedPhraseId || state.politeMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.politeSelectedPhraseId;
  const selectedItem = politeGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.politeMatchedIds = new Set([...state.politeMatchedIds, targetId]);
    state.politeSelectedPhraseId = null;
    state.politeMatchFeedback = `Correct! ${selectedItem.hanzi} matches that meaning.`;
    state.lastPoliteFeedback = state.politeMatchFeedback;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.politeMatchedIds.size === politeGameItems().length) {
      state.politeMatchFeedback = "Great job! You matched all the polite phrases.";
      state.lastPoliteFeedback = state.politeMatchFeedback;
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.politeMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that meaning.`;
  state.lastPoliteFeedback = state.politeMatchFeedback;
  renderActivityPanel(currentTopic());
}

function resetPoliteChallenge(options = {}) {
  const items = politeGameItems();
  if (!items.length) {
    return;
  }

  const answerChoices = items.filter((item) => item.id !== options.excludeId);
  const answerPool = answerChoices.length ? answerChoices : items;
  const answer = answerPool[Math.floor(Math.random() * answerPool.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.politeChallengeAnswerId = answer.id;
  state.politeChallengePickedId = "";
  state.politeChallengePromptId = answer.id;
  state.politeChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.politeChallengeResult = "";
  state.politeChallengeWrongIds = new Set();
  state.politeListenFeedback = options.feedback ?? "";
  state.lastPoliteFeedback = state.politeListenFeedback;
}

function ensurePoliteChallenge() {
  if (!state.politeChallengeAnswerId || !state.politeChallengeOptionIds.length) {
    resetPoliteChallenge();
  }
}

function handlePoliteChallengePlay() {
  const previousPromptId = state.politeChallengePromptId;
  resetPoliteChallenge({ excludeId: previousPromptId });
  const item = politeGameItems().find((entry) => entry.id === state.politeChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.politeListenFeedback = "Listen carefully, then tap the matching card.";
  state.lastPoliteFeedback = state.politeListenFeedback;
  renderActivityPanel(currentTopic());
}

function handlePoliteChallengeGuess(itemId) {
  ensurePoliteChallenge();
  const answer = politeGameItems().find((entry) => entry.id === state.politeChallengeAnswerId);
  const picked = politeGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    state.politeChallengePickedId = itemId;
    state.politeChallengeResult = "correct";
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.politeListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    state.lastPoliteFeedback = state.politeListenFeedback;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    renderActivityPanel(currentTopic());
    return;
  }

  state.politeChallengePickedId = itemId;
  state.politeChallengeResult = "wrong";
  state.politeChallengeWrongIds = new Set([...state.politeChallengeWrongIds, itemId]);
  state.politeListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  state.lastPoliteFeedback = state.politeListenFeedback;
  renderActivityPanel(currentTopic());
}

function resetClothesQuiz() {
  const ids = clothesMatchItems.map((item) => item.id);
  state.clothesQuizOrder = shuffleArray(ids);
  state.clothesQuizIndex = 0;
  prepareClothesQuizQuestion();
}

function prepareClothesQuizQuestion() {
  const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
  const distractorIds = shuffleArray(clothesMatchItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.clothesQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.clothesQuizSelectedId = "";
  state.clothesQuizResult = "";
}

function ensureClothesQuiz() {
  if (!state.clothesQuizOrder.length) {
    resetClothesQuiz();
  }
}

function handleClothesQuizPick(itemId) {
  if (state.clothesQuizResult === "correct") {
    return;
  }

  const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
  state.clothesQuizSelectedId = itemId;
  state.clothesQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.clothesQuizResult === "correct" && state.tapAudioEnabled) {
    const answer = clothesMatchItems.find((item) => item.id === answerId);
    speak(answer?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextClothesQuizQuestion() {
  state.clothesQuizIndex = (state.clothesQuizIndex + 1) % state.clothesQuizOrder.length;
  prepareClothesQuizQuestion();
  renderActivityPanel(currentTopic());
}

function resetTimeRoutineQuiz() {
  state.timeRoutineQuizOrder = shuffleArray(timeDateRoutineItems.map((item) => item.id));
  state.timeRoutineQuizIndex = 0;
  prepareTimeRoutineQuizQuestion();
}

function prepareTimeRoutineQuizQuestion() {
  const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
  const distractorIds = shuffleArray(timeDateRoutineItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.timeRoutineQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.timeRoutineQuizSelectedId = "";
  state.timeRoutineQuizResult = "";
}

function ensureTimeRoutineQuiz() {
  if (!state.timeRoutineQuizOrder.length) {
    resetTimeRoutineQuiz();
  }
}

function handleTimeRoutineQuizPick(itemId) {
  if (state.timeRoutineQuizResult === "correct") {
    return;
  }

  const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
  state.timeRoutineQuizSelectedId = itemId;
  state.timeRoutineQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.timeRoutineQuizResult === "correct" && state.tapAudioEnabled) {
    const item = timeDateRoutineItems.find((entry) => entry.id === answerId);
    speak(item?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextTimeRoutineQuizQuestion() {
  state.timeRoutineQuizIndex = (state.timeRoutineQuizIndex + 1) % state.timeRoutineQuizOrder.length;
  prepareTimeRoutineQuizQuestion();
  renderActivityPanel(currentTopic());
}

function resetClockQuiz() {
  state.clockQuizOrder = shuffleArray(timeDateClockItems.map((item) => item.id));
  state.clockQuizIndex = 0;
  prepareClockQuizQuestion();
}

function prepareClockQuizQuestion() {
  const answerId = state.clockQuizOrder[state.clockQuizIndex];
  const distractorIds = shuffleArray(timeDateClockItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.clockQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.clockQuizSelectedId = "";
  state.clockQuizResult = "";
}

function ensureClockQuiz() {
  if (!state.clockQuizOrder.length) {
    resetClockQuiz();
  }
}

function handleClockQuizPick(itemId) {
  if (state.clockQuizResult === "correct") {
    return;
  }

  const answerId = state.clockQuizOrder[state.clockQuizIndex];
  state.clockQuizSelectedId = itemId;
  state.clockQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.clockQuizResult === "correct" && state.tapAudioEnabled) {
    const item = timeDateClockItems.find((entry) => entry.id === answerId);
    if (item) speak(`几点了？现在${item.hanzi}。`, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextClockQuizQuestion() {
  state.clockQuizIndex = (state.clockQuizIndex + 1) % state.clockQuizOrder.length;
  prepareClockQuizQuestion();
  renderActivityPanel(currentTopic());
}

function currentRoomBuildItem() {
  const id = state.roomBuildOrder[state.roomBuildIndex];
  return roomScenes.find((item) => item.id === id);
}

function resetRoomBuilder() {
  state.roomBuildOrder = shuffleArray(roomScenes.map((item) => item.id));
  state.roomBuildIndex = 0;
  prepareRoomBuilder();
}

function prepareRoomBuilder() {
  const item = currentRoomBuildItem();
  const tokens = roomSentenceTokens[item?.id];
  state.roomBuildSelectedTokens = [];
  state.roomBuildResult = "";
  state.roomBuildAvailableTokens = shuffleArray([...(tokens?.target ?? []), ...(tokens?.distractors ?? [])]);
}

function ensureRoomBuilder() {
  if (!state.roomBuildOrder.length) resetRoomBuilder();
}

function isRoomBuildPrefixValid(selected, tokens) {
  const prefix = tokens.prefix ?? [];
  if (selected.length <= prefix.length) {
    return selected.every((token, index) => token === prefix[index]);
  }

  if (!selected.slice(0, prefix.length).every((token, index) => token === prefix[index])) {
    return false;
  }

  const objects = tokens.unorderedObjects ?? [];
  const body = selected.slice(prefix.length);
  if (objects.length === 1) {
    return body.length === 1 && body[0] === objects[0];
  }

  const beforeConnectorCount = objects.length - 1;
  const chosenObjects = body.slice(0, beforeConnectorCount);
  const chosenAreUniqueObjects = chosenObjects.every((token) => objects.includes(token)) && new Set(chosenObjects).size === chosenObjects.length;
  if (body.length <= beforeConnectorCount) return chosenAreUniqueObjects;
  if (body.length === beforeConnectorCount + 1) return chosenAreUniqueObjects && body[beforeConnectorCount] === "和";
  if (body.length === beforeConnectorCount + 2) {
    const finalObject = body[beforeConnectorCount + 1];
    return chosenAreUniqueObjects && body[beforeConnectorCount] === "和" && objects.includes(finalObject) && !chosenObjects.includes(finalObject);
  }
  return false;
}

function handleRoomBuildToken(tokenIndex) {
  if (state.roomBuildResult === "correct") return;
  const item = currentRoomBuildItem();
  const tokens = roomSentenceTokens[item?.id];
  const token = state.roomBuildAvailableTokens[tokenIndex];
  if (!token || !tokens) return;

  const selected = [...state.roomBuildSelectedTokens, token];
  if (!isRoomBuildPrefixValid(selected, tokens)) {
    state.roomBuildResult = "wrong";
    state.roomBuildSelectedTokens = [];
    state.roomBuildAvailableTokens = shuffleArray([...tokens.target, ...tokens.distractors]);
    renderActivityPanel(currentTopic());
    return;
  }

  state.roomBuildResult = "";
  state.roomBuildSelectedTokens = selected;
  state.roomBuildAvailableTokens = state.roomBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
  if (selected.length === tokens.target.length) {
    state.roomBuildResult = "correct";
    if (state.tapAudioEnabled) speak(selected.join(""), 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearRoomBuilder() {
  prepareRoomBuilder();
  renderActivityPanel(currentTopic());
}

function nextRoomBuilder() {
  state.roomBuildIndex = (state.roomBuildIndex + 1) % state.roomBuildOrder.length;
  prepareRoomBuilder();
  renderActivityPanel(currentTopic());
}

function currentTransportBuildItem() {
  const id = state.transportBuildOrder[state.transportBuildIndex];
  return visualTopicItems.transport.find((item) => item.id === id);
}

function resetTransportBuilder() {
  state.transportBuildOrder = shuffleArray(visualTopicItems.transport.map((item) => item.id));
  state.transportBuildIndex = 0;
  prepareTransportBuilder();
}

function prepareTransportBuilder() {
  const item = currentTransportBuildItem();
  const tokens = transportSentenceTokens[item?.id];
  state.transportBuildSelectedTokens = [];
  state.transportBuildResult = "";
  state.transportBuildAvailableTokens = shuffleArray([...(tokens?.target ?? []), ...(tokens?.distractors ?? [])]);
}

function ensureTransportBuilder() {
  if (!state.transportBuildOrder.length) resetTransportBuilder();
}

function handleTransportBuildToken(tokenIndex) {
  if (state.transportBuildResult === "correct") return;
  const item = currentTransportBuildItem();
  const tokens = transportSentenceTokens[item?.id];
  const token = state.transportBuildAvailableTokens[tokenIndex];
  if (!token || !tokens) return;

  const selected = [...state.transportBuildSelectedTokens, token];
  const isPrefix = selected.every((entry, index) => entry === tokens.target[index]);
  if (!isPrefix) {
    state.transportBuildResult = "wrong";
    state.transportBuildSelectedTokens = [];
    state.transportBuildAvailableTokens = shuffleArray([...tokens.target, ...tokens.distractors]);
    renderActivityPanel(currentTopic());
    return;
  }

  state.transportBuildResult = "";
  state.transportBuildSelectedTokens = selected;
  state.transportBuildAvailableTokens = state.transportBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
  if (selected.length === tokens.target.length) {
    state.transportBuildResult = "correct";
    if (state.tapAudioEnabled) speak(item.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearTransportBuilder() {
  prepareTransportBuilder();
  renderActivityPanel(currentTopic());
}

function nextTransportBuilder() {
  state.transportBuildIndex = (state.transportBuildIndex + 1) % state.transportBuildOrder.length;
  prepareTransportBuilder();
  renderActivityPanel(currentTopic());
}

function resetPositionQuiz() {
  state.positionQuizOrder = shuffleArray(positionPracticeItems.map((item) => item.id));
  state.positionQuizIndex = 0;
  preparePositionQuizQuestion();
}

function preparePositionQuizQuestion() {
  const answerId = state.positionQuizOrder[state.positionQuizIndex];
  const distractorIds = shuffleArray(positionPracticeItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.positionQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.positionQuizSelectedId = "";
  state.positionQuizResult = "";
}

function ensurePositionQuiz() {
  if (!state.positionQuizOrder.length) resetPositionQuiz();
}

function handlePositionQuizPlay() {
  ensurePositionQuiz();
  const item = positionPracticeItems.find((entry) => entry.id === state.positionQuizOrder[state.positionQuizIndex]);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
}

function handlePositionQuizPick(itemId) {
  if (state.positionQuizResult === "correct") return;
  const answerId = state.positionQuizOrder[state.positionQuizIndex];
  state.positionQuizSelectedId = itemId;
  state.positionQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.positionQuizResult === "correct" && state.tapAudioEnabled) {
    const item = positionPracticeItems.find((entry) => entry.id === answerId);
    speak(item?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextPositionQuizQuestion() {
  state.positionQuizIndex = (state.positionQuizIndex + 1) % state.positionQuizOrder.length;
  preparePositionQuizQuestion();
  renderActivityPanel(currentTopic());
}

function currentComparisonBuildItem() {
  const id = state.comparisonBuildOrder[state.comparisonBuildIndex];
  return comparisonPracticeItems.find((item) => item.id === id);
}

function resetComparisonBuilder() {
  state.comparisonBuildOrder = shuffleArray(comparisonPracticeItems.map((item) => item.id));
  state.comparisonBuildIndex = 0;
  prepareComparisonBuilder();
}

function prepareComparisonBuilder() {
  const item = currentComparisonBuildItem();
  state.comparisonBuildSelectedTokens = [];
  state.comparisonBuildAvailableTokens = shuffleArray(item?.options ?? []);
  state.comparisonBuildResult = "";
}

function ensureComparisonBuilder() {
  if (!state.comparisonBuildOrder.length) resetComparisonBuilder();
}

function handleComparisonBuildToken(index) {
  if (state.comparisonBuildResult === "correct") return;
  const item = currentComparisonBuildItem();
  const token = state.comparisonBuildAvailableTokens[index];
  if (!item || !token) return;
  const selected = [...state.comparisonBuildSelectedTokens, token];
  if (selected.some((entry, tokenIndex) => entry !== item.target[tokenIndex])) {
    state.comparisonBuildResult = "wrong";
    state.comparisonBuildSelectedTokens = [];
    state.comparisonBuildAvailableTokens = shuffleArray(item.options);
    renderActivityPanel(currentTopic());
    return;
  }
  state.comparisonBuildResult = "";
  state.comparisonBuildSelectedTokens = selected;
  state.comparisonBuildAvailableTokens = state.comparisonBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
  if (selected.length === item.target.length) {
    state.comparisonBuildResult = "correct";
    if (state.tapAudioEnabled) speak(`${item.before}${selected[0]}${item.between}${selected[1]}${item.after}`, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearComparisonBuilder() {
  prepareComparisonBuilder();
  renderActivityPanel(currentTopic());
}

function nextComparisonBuilder() {
  state.comparisonBuildIndex = (state.comparisonBuildIndex + 1) % state.comparisonBuildOrder.length;
  prepareComparisonBuilder();
  renderActivityPanel(currentTopic());
}

function resetDateMatchGame() {
  const roundIds = shuffleArray(timeDateMonthItems.map((item) => item.id)).slice(0, 6);
  state.dateSelectedPhraseId = null;
  state.dateMatchedIds = new Set();
  state.datePhraseOrder = shuffleArray(roundIds);
  state.dateEventOrder = shuffleArray(roundIds);
  state.dateMatchFeedback = "";
}

function ensureDateMatchGame() {
  const monthIds = new Set(timeDateMonthItems.map((item) => item.id));
  if (
    !state.datePhraseOrder.length ||
    !state.dateEventOrder.length ||
    state.datePhraseOrder.length !== 6 ||
    state.dateEventOrder.length !== 6 ||
    state.datePhraseOrder.some((id) => !monthIds.has(id)) ||
    state.dateEventOrder.some((id) => !monthIds.has(id))
  ) {
    resetDateMatchGame();
  }
}

function handleDateMatchPhrase(itemId) {
  if (state.dateMatchedIds.has(itemId)) return;
  state.dateSelectedPhraseId = itemId;
  const item = timeDateMonthItems.find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.hanzi, 0.78);
  state.dateMatchFeedback = "";
  renderActivityPanel(currentTopic());
}

function handleDateMatchEvent(itemId) {
  const selectedId = state.dateSelectedPhraseId;
  if (!selectedId || state.dateMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.dateMatchedIds = new Set([...state.dateMatchedIds, itemId]);
    state.dateSelectedPhraseId = null;
    state.dateMatchFeedback = "";
  } else {
    state.dateMatchFeedback = "Try again.";
  }
  renderActivityPanel(currentTopic());
}

function resetDateChallenge(options = {}) {
  const available = options.excludeId ? datePracticeItems.filter((item) => item.id !== options.excludeId) : datePracticeItems;
  const answer = available[Math.floor(Math.random() * available.length)] ?? datePracticeItems[0];
  const distractors = shuffleArray(datePracticeItems.filter((item) => item.id !== answer.id)).slice(0, 3);
  state.dateChallengeAnswerId = answer.id;
  state.dateChallengePromptId = answer.id;
  state.dateChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.dateChallengePickedId = "";
  state.dateChallengeResult = "";
  state.dateChallengeWrongIds = new Set();
  state.dateListenFeedback = "";
}

function ensureDateChallenge() {
  if (!state.dateChallengeAnswerId || !state.dateChallengeOptionIds.length) resetDateChallenge();
}

function handleDateChallengePlay() {
  const previousId = state.dateChallengePromptId;
  resetDateChallenge({ excludeId: previousId });
  const item = datePracticeItems.find((entry) => entry.id === state.dateChallengePromptId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleDateChallengeGuess(itemId) {
  const isCorrect = itemId === state.dateChallengeAnswerId;
  state.dateChallengePickedId = itemId;
  state.dateChallengeResult = isCorrect ? "correct" : "wrong";
  if (isCorrect) {
    if (state.tapAudioEnabled) {
      const item = datePracticeItems.find((entry) => entry.id === itemId);
      speak(item?.hanzi, 0.78);
    }
  } else {
    state.dateChallengeWrongIds = new Set([...state.dateChallengeWrongIds, itemId]);
  }
  renderActivityPanel(currentTopic());
}

function handleGreetingsChallengePlay() {
  ensureGreetingsChallenge();
  const item = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengePromptId);
  if (!item) {
    return;
  }

  resetListenChallengeResult("greetings");
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.greetingsListenFeedback = `Listen again and find ${item.hanzi}.`;
  state.lastGreetingsFeedback = state.greetingsListenFeedback;
  renderActivityPanel(currentTopic());
}

function handleGreetingsChallengeGuess(itemId) {
  ensureGreetingsChallenge();
  const answer = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengeAnswerId);
  const picked = greetingsGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    state.greetingsChallengePickedId = itemId;
    state.greetingsChallengeResult = "correct";
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.greetingsListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    state.lastGreetingsFeedback = state.greetingsListenFeedback;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    renderActivityPanel(currentTopic());
    return;
  }

  state.greetingsChallengePickedId = itemId;
  state.greetingsChallengeResult = "wrong";
  state.greetingsChallengeWrongIds = new Set([...state.greetingsChallengeWrongIds, itemId]);
  state.greetingsListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  state.lastGreetingsFeedback = state.greetingsListenFeedback;
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

const bodyDiagramLayout = {
  left: ["hair", "ears", "nose", "hand", "leg", "foot"],
  right: ["head", "forehead", "eyes", "mouth", "neck", "arm"]
};
const bodyCoreItemIds = ["head", "hair", "eyes", "ears", "nose", "mouth", "hand", "foot"];
const bodyBonusItemIds = ["forehead", "neck", "arm", "leg"];

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

function schoolPracticeItems(topicId = currentTopic().id) {
  const data = schoolTopicData[topicId];
  return data?.practiceItems ?? data?.words ?? schoolWordGroups(topicId).flatMap((group) => group.items);
}

function backpackGameItems() {
  const portableItemIds = new Set(["pencil", "ruler", "eraser", "colored-pencils", "scissors", "glue", "pencil-box", "textbook", "workbook"]);
  return schoolPracticeItems("school-supplies").filter((item) => portableItemIds.has(item.id));
}

 function currentStationeryPictureMatchRound() {
  return stationeryPictureMatchRounds[state.stationeryPictureMatchIndex] ?? stationeryPictureMatchRounds[0];
}

function resetStationeryPictureMatch(index = state.stationeryPictureMatchIndex) {
  state.stationeryPictureMatchIndex = index % stationeryPictureMatchRounds.length;
  state.stationeryPictureMatchSelections = { measure: "", color: "", item: "" };
  state.stationeryPictureMatchWrong = { measure: new Set(), color: new Set(), item: new Set() };
  state.stationeryPictureMatchChoiceOrders = Object.fromEntries(Object.entries(stationeryPictureMatchChoices).map(([column, choices]) => [column, shuffleArray([...choices])]));
  state.stationeryPictureMatchComplete = false;
}

function ensureStationeryPictureMatch() {
  const hasValidOrders = Object.entries(stationeryPictureMatchChoices).every(([column, choices]) => {
    const order = state.stationeryPictureMatchChoiceOrders[column];
    return order?.length === choices.length && choices.every((choice) => order.includes(choice));
  });
  if (!hasValidOrders) resetStationeryPictureMatch();
}

function handleStationeryPictureMatchPick(column, value) {
  if (state.stationeryPictureMatchComplete) return;
  const round = currentStationeryPictureMatchRound();
  if (!round || !stationeryPictureMatchChoices[column]) return;
  if (value !== round.target[column]) {
    state.stationeryPictureMatchWrong = {
      ...state.stationeryPictureMatchWrong,
      [column]: new Set([...state.stationeryPictureMatchWrong[column], value])
    };
    renderActivityPanel(currentTopic());
    return;
  }
  state.stationeryPictureMatchSelections = { ...state.stationeryPictureMatchSelections, [column]: value };
  state.stationeryPictureMatchWrong = {
    ...state.stationeryPictureMatchWrong,
    [column]: new Set()
  };
  state.stationeryPictureMatchComplete = Object.entries(round.target).every(([key, target]) => state.stationeryPictureMatchSelections[key] === target);
  if (state.stationeryPictureMatchComplete && state.tapAudioEnabled) speak(Object.values(round.target).join(""), 0.78);
  renderActivityPanel(currentTopic());
}

function nextStationeryPictureMatch() {
  resetStationeryPictureMatch((state.stationeryPictureMatchIndex + 1) % stationeryPictureMatchRounds.length);
  renderActivityPanel(currentTopic());
}

function prepareBackpackGameOptions() {
  const targetId = state.backpackGameRoundIds[state.backpackGameTargetIndex];
  const items = backpackGameItems();
  state.backpackGameOptionIds = shuffleArray([
    targetId,
    ...shuffleArray(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
  ]);
  state.backpackGameWrongIds = new Set();
}

function resetBackpackGame() {
  state.backpackGameRoundIds = shuffleArray(backpackGameItems().map((item) => item.id)).slice(0, 3);
  state.backpackGameTargetIndex = 0;
  state.backpackGamePlacedIds = [];
  state.backpackGameComplete = false;
  prepareBackpackGameOptions();
}

function ensureBackpackGame() {
  const items = backpackGameItems();
  const isValidRound =
    state.backpackGameRoundIds.length === 3 &&
    state.backpackGameRoundIds.every((id) => items.some((item) => item.id === id));
  if (!isValidRound) resetBackpackGame();
}

function currentBackpackGameTarget() {
  return backpackGameItems().find((item) => item.id === state.backpackGameRoundIds[state.backpackGameTargetIndex]);
}

function handleBackpackGameGuess(itemId) {
  if (state.backpackGameComplete) return;
  const target = currentBackpackGameTarget();
  if (!target) return;
  if (itemId !== target.id) {
    state.backpackGameWrongIds = new Set([...state.backpackGameWrongIds, itemId]);
    renderActivityPanel(currentTopic());
    return;
  }
  state.backpackGamePlacedIds = [...state.backpackGamePlacedIds, target.id];
  if (state.tapAudioEnabled) speak(target.audio, 0.78);
  state.backpackGameTargetIndex += 1;
  state.backpackGameComplete = state.backpackGameTargetIndex === state.backpackGameRoundIds.length;
  if (!state.backpackGameComplete) prepareBackpackGameOptions();
  renderActivityPanel(currentTopic());
}

function resetSchoolChallenge(options = {}) {
  const items = schoolPracticeItems();
  const candidates = items.filter((item) => item.id !== options.excludeId);
  const answers = candidates.length ? candidates : items;
  const answer = answers[Math.floor(Math.random() * answers.length)];
  if (!answer) return;
  const optionIds = currentTopic().id === "school-subjects"
    ? shuffleArray(items.map((item) => item.id))
    : shuffleArray([answer.id, ...shuffleArray(items.filter((item) => item.id !== answer.id)).slice(0, 3).map((item) => item.id)]);
  state.schoolChallengeAnswerId = answer.id;
  state.schoolChallengePromptId = answer.id;
  state.schoolChallengeOptionIds = optionIds;
  state.schoolChallengePickedId = "";
  state.schoolChallengeResult = "";
  state.schoolChallengeWrongIds = new Set();
  state.schoolListenFeedback = "";
}

function resetSchoolMatchGame() {
  const ids = schoolPracticeItems().slice(0, 6).map((item) => item.id);
  state.schoolSelectedPhraseId = null;
  state.schoolMatchedIds = new Set();
  state.schoolPhraseOrder = shuffleArray(ids);
  state.schoolMeaningOrder = shuffleArray(ids);
  state.schoolMatchFeedback = "";
}

function mealsConversationItems() {
  return schoolTopicData["meals-feelings"]?.conversationPairs ?? [];
}

function resetMealsConversationMatch() {
  const ids = mealsConversationItems().map((item) => item.id);
  state.schoolSelectedPhraseId = null;
  state.schoolMatchedIds = new Set();
  state.schoolPhraseOrder = shuffleArray(ids);
  state.schoolMeaningOrder = shuffleArray(ids);
  state.schoolMatchFeedback = "";
  state.mealsConversationMatchReady = true;
  state.mealsConversationWrongPhraseIds = new Set();
  state.mealsConversationWrongReplyIds = new Set();
}

function ensureMealsConversationMatch() {
  const ids = mealsConversationItems().map((item) => item.id);
  const currentIds = [...state.schoolPhraseOrder].sort();
  if (!state.mealsConversationMatchReady || currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
    resetMealsConversationMatch();
  }
}

function handleMealsConversationPhrase(itemId) {
  if (state.schoolMatchedIds.has(itemId)) return;
  state.schoolSelectedPhraseId = itemId;
  state.mealsConversationWrongPhraseIds = new Set();
  state.mealsConversationWrongReplyIds = new Set();
  const item = mealsConversationItems().find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleMealsConversationAttempt(itemId) {
  const selectedId = state.schoolSelectedPhraseId;
  if (!selectedId || state.schoolMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.schoolMatchedIds = new Set([...state.schoolMatchedIds, itemId]);
    state.schoolMatchFeedback = "Correct!";
    state.mealsConversationWrongPhraseIds = new Set();
    state.mealsConversationWrongReplyIds = new Set();
  } else {
    state.schoolMatchFeedback = "Try again.";
    state.mealsConversationWrongPhraseIds = new Set([selectedId]);
    state.mealsConversationWrongReplyIds = new Set([itemId]);
  }
  state.schoolSelectedPhraseId = null;
  renderActivityPanel(currentTopic());
}

function mealsPictureChoiceItems() {
  return schoolTopicData["meals-feelings"]?.pictureChoices ?? [];
}

function resetMealsPictureQuestion() {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt) return;
  state.mealsPictureQuizOptionIds = shuffleArray(prompt.options.map((option) => option.id));
  state.mealsPictureQuizSelectedId = "";
  state.mealsPictureQuizResult = "";
}

function ensureMealsPictureChoice() {
  const ids = mealsPictureChoiceItems().map((item) => item.id);
  const currentIds = [...state.mealsPictureQuizOrder].sort();
  if (currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
    state.mealsPictureQuizOrder = shuffleArray(ids);
    state.mealsPictureQuizIndex = 0;
    resetMealsPictureQuestion();
  }
}

function handleMealsPictureChoice(optionId) {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt || state.mealsPictureQuizResult === "correct") return;
  state.mealsPictureQuizSelectedId = optionId;
  state.mealsPictureQuizResult = optionId === prompt.correctId ? "correct" : "wrong";
  renderActivityPanel(currentTopic());
}

function nextMealsPictureChoice() {
  const items = mealsPictureChoiceItems();
  if (!items.length) return;
  state.mealsPictureQuizIndex = (state.mealsPictureQuizIndex + 1) % items.length;
  resetMealsPictureQuestion();
  renderActivityPanel(currentTopic());
}

function renderMealsPictureChoice() {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt) return "";
  return `
    <section class="clothes-quiz-shell meals-picture-choice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Look and Choose</p><p class="numbers-game-note">Look at the picture, then tap the Chinese sentence that matches it.</p></div></div>
      <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" /></figure>
      <div class="clothes-quiz-options sentence-choice-options">
        ${state.mealsPictureQuizOptionIds.map((optionId) => {
          const option = prompt.options.find((item) => item.id === optionId);
          if (!option) return "";
          const selected = state.mealsPictureQuizSelectedId === optionId;
          const resultClass = selected ? ` is-${state.mealsPictureQuizResult}` : "";
          const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${state.mealsPictureQuizResult === "correct" ? "✓" : "×"}</span>` : "";
          return `<button class="clothes-quiz-option${resultClass}" type="button" data-meals-picture-pick="${option.id}">${mark}<span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`;
        }).join("")}
      </div>
      ${state.mealsPictureQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-meals-picture-next>Next picture</button></div>' : ""}
    </section>
  `;
}

function foodPreferenceFillItems() {
  return [
    { id: "apple", hanzi: "苹果", pinyin: "píng guǒ", english: "apple" },
    { id: "ice-cream", hanzi: "冰淇淋", pinyin: "bīng qí lín", english: "ice cream" },
    { id: "pizza", hanzi: "披萨", pinyin: "pī sà", english: "pizza" },
    { id: "broccoli", hanzi: "西兰花", pinyin: "xī lán huā", english: "broccoli" },
    { id: "dumplings", hanzi: "饺子", pinyin: "jiǎo zi", english: "dumplings" },
    { id: "fried-rice", hanzi: "炒饭", pinyin: "chǎo fàn", english: "fried rice" },
    { id: "chow-mein", hanzi: "炒面", pinyin: "chǎo miàn", english: "chow mein" },
    { id: "hamburger", hanzi: "汉堡", pinyin: "hàn bǎo", english: "hamburger" },
    { id: "hot-dog", hanzi: "热狗", pinyin: "rè gǒu", english: "hot dog" },
    { id: "sandwich", hanzi: "三明治", pinyin: "sān míng zhì", english: "sandwich" }
  ];
}

function foodPreferenceSubjects() {
  return [
    { id: "我", hanzi: "我", pinyin: "wǒ", english: "I" },
    { id: "爸爸", hanzi: "爸爸", pinyin: "bà ba", english: "Dad" },
    { id: "妈妈", hanzi: "妈妈", pinyin: "mā ma", english: "Mom" },
    { id: "爷爷", hanzi: "爷爷", pinyin: "yé ye", english: "Grandpa" },
    { id: "奶奶", hanzi: "奶奶", pinyin: "nǎi nai", english: "Grandma" },
    { id: "姐姐", hanzi: "姐姐", pinyin: "jiě jie", english: "Older sister" },
    { id: "妹妹", hanzi: "妹妹", pinyin: "mèi mei", english: "Younger sister" },
    { id: "弟弟", hanzi: "弟弟", pinyin: "dì di", english: "Younger brother" },
    { id: "哥哥", hanzi: "哥哥", pinyin: "gē ge", english: "Older brother" }
  ];
}

function foodPreferencePatterns() {
  return [
    { id: "like", hanzi: "喜欢", pinyin: "xǐ huan", english: "likes to eat", firstPersonEnglish: "like to eat" },
    { id: "dislike", hanzi: "不喜欢", pinyin: "bù xǐ huan", english: "does not like to eat", firstPersonEnglish: "do not like to eat" },
    { id: "want", hanzi: "想", pinyin: "xiǎng", english: "wants to eat", firstPersonEnglish: "want to eat" },
    { id: "not-want", hanzi: "不想", pinyin: "bù xiǎng", english: "does not want to eat", firstPersonEnglish: "do not want to eat" },
    { id: "need", hanzi: "要", pinyin: "yào", english: "wants to eat", firstPersonEnglish: "want to eat" },
    { id: "not-need", hanzi: "不要", pinyin: "bú yào", english: "does not want to eat", firstPersonEnglish: "do not want to eat" }
  ];
}

function selectedFoodPreferencePattern() {
  return foodPreferencePatterns().find((item) => item.id === state.foodPreferencePatternId) ?? foodPreferencePatterns()[0];
}

function handleFoodPreferenceSubject(subjectId) {
  state.foodPreferenceSubjectId = subjectId;
  renderActivityPanel(currentTopic());
}

function handleFoodPreferencePattern(patternId) {
  state.foodPreferencePatternId = patternId;
  state.foodPreferenceFoodId = "";
  renderActivityPanel(currentTopic());
}

function handleFoodPreferenceFill(foodId) {
  const item = foodPreferenceFillItems().find((entry) => entry.id === foodId);
  if (!item) return;
  const pattern = selectedFoodPreferencePattern();
  const subject = foodPreferenceSubjects().find((entry) => entry.id === state.foodPreferenceSubjectId) ?? foodPreferenceSubjects()[0];
  const sentence = `${subject.hanzi}${pattern.hanzi}吃${item.hanzi}`;
  state.foodPreferenceFoodId = foodId;
  if (state.tapAudioEnabled) speak(sentence, 0.78);
  renderActivityPanel(currentTopic());
}

function renderFoodPreferenceFillPractice() {
  const items = foodPreferenceFillItems();
  const pattern = selectedFoodPreferencePattern();
  const subjects = foodPreferenceSubjects();
  const subject = subjects.find((item) => item.id === state.foodPreferenceSubjectId) ?? subjects[0];
  const selectedFood = items.find((item) => item.id === state.foodPreferenceFoodId);
  const sentenceHanzi = `${subject.hanzi}${pattern.hanzi}吃${selectedFood?.hanzi ?? "____"}。`;
  const sentencePinyin = `${subject.pinyin} ${pattern.pinyin} chī${selectedFood?.pinyin ? ` ${selectedFood.pinyin}` : ""}.`;
  const sentenceEnglish = `${subject.english} ${subject.id === "我" ? pattern.firstPersonEnglish : pattern.english}${selectedFood?.english ? ` ${selectedFood.english}` : ""}.`;
  return `
    <section class="clothes-quiz-shell food-preference-fill-practice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Make your sentence</p><p class="numbers-game-note">Choose one card in each column. There is no right or wrong answer.</p></div></div>
      <div class="food-preference-builder-columns">
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Subject</p><div class="food-preference-builder-list">${subjects.map((item) => `<button class="food-preference-subject-choice${subject.id === item.id ? " is-active" : ""}" type="button" data-food-preference-subject="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Word</p><div class="food-preference-builder-list">${foodPreferencePatterns().map((item) => `<button class="food-preference-pattern-choice${pattern.id === item.id ? " is-active" : ""}" type="button" data-food-preference-pattern="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Food</p><div class="food-preference-builder-list">${items.map((item) => `<button class="food-preference-fill-choice${selectedFood?.id === item.id ? " is-active" : ""}" type="button" data-food-preference-food="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
      </div>
      <div class="food-preference-built-sentence"><span class="numbers-game-hanzi">${sentenceHanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${sentencePinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${sentenceEnglish}</span>` : ""}</div>
    </section>
  `;
}

function classroomSentenceFrames() {
  return schoolTopicData.classroom?.sentenceFrames ?? [];
}

function classroomSentenceWords() {
  return [
    ...(schoolTopicData.classroom?.words ?? []).map((item) => item.id === "computer" ? { ...item, sentenceEnglish: "laptop" } : item),
    { id: "textbook", hanzi: "课本", pinyin: "kè běn", english: "textbook", imagePath: "assets/illustrated-stationery/textbook.webp" },
    { id: "workbook", hanzi: "练习本", pinyin: "liàn xí běn", english: "workbook", imagePath: "assets/illustrated-stationery/workbook.webp" },
    { id: "pencil", hanzi: "铅笔", pinyin: "qiān bǐ", english: "pencil", imagePath: "assets/illustrated-stationery/pencil.webp" },
    { id: "ruler", hanzi: "尺子", pinyin: "chǐ zi", english: "ruler", imagePath: "assets/illustrated-stationery/ruler.webp" },
    { id: "eraser", hanzi: "橡皮", pinyin: "xiàng pí", english: "eraser", imagePath: "assets/illustrated-stationery/eraser.webp" },
    { id: "colored-pencils", hanzi: "彩色铅笔", pinyin: "cǎi sè qiān bǐ", english: "colored pencils", imagePath: "assets/illustrated-stationery/colored-pencils.webp" }
  ];
}

function selectedClassroomSentenceFrame() {
  return classroomSentenceFrames().find((frame) => frame.id === state.classroomSentenceFrameId) ?? classroomSentenceFrames()[0];
}

function classroomSentenceEnglish(frame, word) {
  if (!word) return "";
  const noun = word.sentenceEnglish ?? word.english;
  if (frame.id === "many-in-classroom") {
    return `There are many ${noun.endsWith("s") ? noun : `${noun}s`} in the classroom.`;
  }
  if (word.id === "colored-pencils") {
    return `There are colored pencils${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
  }
  const article = /^[aeiou]/i.test(noun) ? "an" : "a";
  return `There is ${article} ${noun}${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
}

function handleClassroomSentenceFrame(frameId) {
  const frame = classroomSentenceFrames().find((item) => item.id === frameId);
  if (!frame) return;
  state.classroomSentenceFrameId = frameId;
  if (!frame.wordIds.includes(state.classroomSentenceWordId)) {
    state.classroomSentenceWordId = "";
  }
  renderActivityPanel(currentTopic());
}

function handleClassroomSentenceWord(wordId) {
  const frame = selectedClassroomSentenceFrame();
  const word = classroomSentenceWords().find((item) => item.id === wordId);
  if (!frame || !word || !frame.wordIds.includes(wordId)) return;
  state.classroomSentenceWordId = wordId;
  if (state.tapAudioEnabled) speak(`${frame.hanzi}${word.hanzi}`, 0.78);
  renderActivityPanel(currentTopic());
}

function renderClassroomPractice(topic) {
  const frames = classroomSentenceFrames();
  const frame = selectedClassroomSentenceFrame();
  const words = classroomSentenceWords().filter((item) => frame.wordIds.includes(item.id));
  const selectedWord = words.find((item) => item.id === state.classroomSentenceWordId);
  const hanzi = `${frame.hanzi}${selectedWord?.hanzi ?? "____"}。`;
  const pinyin = `${frame.pinyin}${selectedWord?.pinyin ? ` ${selectedWord.pinyin}` : ""}.`;
  const english = classroomSentenceEnglish(frame, selectedWord);
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData.classroom.practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Make a sentence</p><p class="numbers-game-note">Choose a sentence start and an object. Every choice can make a good sentence.</p></div></div>
        <div class="intro-build-choices">${frames.map((item) => `<button class="intro-build-chip${frame.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-frame="${item.id}">${item.hanzi}</button>`).join("")}</div>
        <div class="transport-build-target classroom-sentence-output"><span class="numbers-game-hanzi">${hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${pinyin}</span>` : ""}${state.showEnglish && english ? `<span class="numbers-game-english">${english}</span>` : ""}</div>
        <div class="intro-build-choices classroom-sentence-object-choices">${words.map((item) => `<button class="intro-build-chip classroom-sentence-object-chip${selectedWord?.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-word="${item.id}"><img class="classroom-sentence-object-icon" src="${item.imagePath}" alt="" aria-hidden="true"><span>${item.hanzi}</span></button>`).join("")}</div>
      </section>
    </section>
  `;
  activityList.querySelectorAll("[data-classroom-sentence-frame]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceFrame(button.dataset.classroomSentenceFrame)));
  activityList.querySelectorAll("[data-classroom-sentence-word]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceWord(button.dataset.classroomSentenceWord)));
}

function ensureSchoolPractice(topicId = currentTopic().id) {
  const items = schoolPracticeItems(topicId);
  const expectedOptionCount = topicId === "school-subjects" ? items.length : Math.min(4, items.length);
  if (state.schoolPracticeTopicId !== topicId || state.schoolChallengeOptionIds.length !== expectedOptionCount) {
    state.schoolPracticeTopicId = topicId;
    resetSchoolChallenge();
    resetSchoolMatchGame();
  }
}

function handleSchoolChallengePlay() {
  ensureSchoolPractice();
  resetSchoolChallenge({ excludeId: state.schoolChallengePromptId });
  const item = schoolPracticeItems().find((entry) => entry.id === state.schoolChallengePromptId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleSchoolChallengeGuess(itemId) {
  ensureSchoolPractice();
  const correct = itemId === state.schoolChallengeAnswerId;
  state.schoolChallengePickedId = itemId;
  state.schoolChallengeResult = correct ? "correct" : "wrong";
  if (correct) {
    state.schoolListenFeedback = "Correct!";
    const item = schoolPracticeItems().find((entry) => entry.id === itemId);
    if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  } else {
    state.schoolChallengeWrongIds = new Set([...state.schoolChallengeWrongIds, itemId]);
    state.schoolListenFeedback = "Try again.";
  }
  renderActivityPanel(currentTopic());
}

function handleSchoolMatchPhrase(itemId) {
  if (state.schoolMatchedIds.has(itemId)) return;
  state.schoolSelectedPhraseId = itemId;
  const item = schoolPracticeItems().find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleSchoolMatchAttempt(itemId) {
  const selectedId = state.schoolSelectedPhraseId;
  if (!selectedId || state.schoolMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.schoolMatchedIds = new Set([...state.schoolMatchedIds, itemId]);
    state.schoolMatchFeedback = "Correct!";
  } else {
    state.schoolMatchFeedback = "Try again.";
  }
  state.schoolSelectedPhraseId = null;
  renderActivityPanel(currentTopic());
}

function currentSchoolBuildItem() {
  const items = schoolSentenceBuilds[currentTopic().id] ?? [];
  return items.find((item) => item.id === state.schoolBuildOrder[state.schoolBuildIndex]) ?? items[0];
}

function prepareSchoolBuilder() {
  const item = currentSchoolBuildItem();
  state.schoolBuildSelectedTokens = [];
  state.schoolBuildResult = "";
  state.schoolBuildAvailableTokens = shuffleArray([...(item?.target ?? []), ...(item?.distractors ?? [])]);
}

function ensureSchoolBuilder(topicId = currentTopic().id) {
  const items = schoolSentenceBuilds[topicId] ?? [];
  const hasCurrentItems =
    state.schoolBuildOrder.length === items.length &&
    state.schoolBuildOrder.every((id) => items.some((item) => item.id === id));
  if (state.schoolBuildTopicId !== topicId || !hasCurrentItems) {
    state.schoolBuildTopicId = topicId;
    state.schoolBuildOrder = shuffleArray(items.map((item) => item.id));
    state.schoolBuildIndex = 0;
    prepareSchoolBuilder();
  }
}

function handleSchoolBuildToken(index) {
  if (state.schoolBuildResult === "correct") return;
  const item = currentSchoolBuildItem();
  const token = state.schoolBuildAvailableTokens[index];
  if (!item || !token) return;
  const selected = [...state.schoolBuildSelectedTokens, token];
  const isPrefix = selected.every((entry, tokenIndex) => entry === item.target[tokenIndex]);
  if (!isPrefix) {
    state.schoolBuildResult = "wrong";
    prepareSchoolBuilder();
    state.schoolBuildResult = "wrong";
    renderActivityPanel(currentTopic());
    return;
  }
  state.schoolBuildSelectedTokens = selected;
  state.schoolBuildAvailableTokens = state.schoolBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
  if (selected.length === item.target.length) {
    state.schoolBuildResult = "correct";
    if (state.tapAudioEnabled) speak(item.audio ?? selected.join(""), 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearSchoolBuilder() {
  prepareSchoolBuilder();
  renderActivityPanel(currentTopic());
}

function nextSchoolBuilder() {
  state.schoolBuildIndex = (state.schoolBuildIndex + 1) % state.schoolBuildOrder.length;
  prepareSchoolBuilder();
  renderActivityPanel(currentTopic());
}

const foodCategoryGroups = {
  fruit: {
    hanzi: "水果",
    english: "Fruit",
    items: [
      { id: "apple", hanzi: "苹果", pinyin: "píng guǒ", english: "apple" },
      { id: "banana", hanzi: "香蕉", pinyin: "xiāng jiāo", english: "banana" },
      { id: "grapes", hanzi: "葡萄", pinyin: "pú tao", english: "grapes" },
      { id: "strawberry", hanzi: "草莓", pinyin: "cǎo méi", english: "strawberry" },
      { id: "orange", hanzi: "橙子", pinyin: "chéng zi", english: "orange" },
      { id: "pear", hanzi: "梨", pinyin: "lí", english: "pear" },
      { id: "watermelon", hanzi: "西瓜", pinyin: "xī guā", english: "watermelon" },
      { id: "peach", hanzi: "桃子", pinyin: "táo zi", english: "peach" },
      { id: "cherries", hanzi: "樱桃", pinyin: "yīng táo", english: "cherries" }
    ]
  },
  vegetable: {
    hanzi: "蔬菜",
    english: "Vegetables",
    items: [
      { id: "carrot", hanzi: "胡萝卜", pinyin: "hú luó bo", english: "carrot" },
      { id: "cucumber", hanzi: "黄瓜", pinyin: "huáng guā", english: "cucumber" },
      { id: "tomato", hanzi: "西红柿", pinyin: "xī hóng shì", english: "tomato" },
      { id: "broccoli", hanzi: "西兰花", pinyin: "xī lán huā", english: "broccoli" },
      { id: "potatoes", hanzi: "土豆", pinyin: "tǔ dòu", english: "potatoes" }
    ]
  },
  snack: {
    hanzi: "零食",
    english: "Snacks",
    items: [
      { id: "candies", hanzi: "糖果", pinyin: "táng guǒ", english: "candies" },
      { id: "chocolate", hanzi: "巧克力", pinyin: "qiǎo kè lì", english: "chocolate" },
      { id: "ice-cream", hanzi: "冰淇淋", pinyin: "bīng qí lín", english: "ice cream" },
      { id: "cake", hanzi: "蛋糕", pinyin: "dàn gāo", english: "cake" }
    ]
  },
  meal: {
    hanzi: "主食",
    english: "Meal",
    items: [
      { id: "pizza", hanzi: "披萨", pinyin: "pī sà", english: "pizza" },
      { id: "chow-mein", hanzi: "炒面", pinyin: "chǎo miàn", english: "chow mein" },
      { id: "fried-rice", hanzi: "炒饭", pinyin: "chǎo fàn", english: "fried rice" },
      { id: "french-fries", hanzi: "薯条", pinyin: "shǔ tiáo", english: "French fries" },
      { id: "hamburger", hanzi: "汉堡", pinyin: "hàn bǎo", english: "hamburger" },
      { id: "hot-dog", hanzi: "热狗", pinyin: "rè gǒu", english: "hot dog" }
    ]
  },
  drink: {
    hanzi: "饮料",
    english: "Drinks",
    items: [
      { id: "milk", hanzi: "牛奶", pinyin: "niú nǎi", english: "milk" },
      { id: "juice", hanzi: "果汁", pinyin: "guǒ zhī", english: "juice" },
      { id: "cola", hanzi: "可乐", pinyin: "kě lè", english: "Coke" }
    ]
  }
};

function foodBookWordItems(data) {
  const itemIds = new Set(foodCategoryGroups[state.foodBookCategoryId]?.items.map((item) => item.id) ?? []);
  return data.words.filter((item) => itemIds.has(item.id));
}

function foodCategoryIconPath(itemId) {
  return `assets/illustrated-food/${itemId}.webp`;
}

const foodHungerModes = {
  mix: { hanzi: "混合", english: "Mix" },
  ...Object.fromEntries(Object.entries(foodCategoryGroups).map(([id, group]) => [id, { hanzi: group.hanzi, english: group.english }]))
};

function foodHungerItems(modeId = state.foodHungerModeId) {
  if (modeId === "mix") return Object.values(foodCategoryGroups).flatMap((group) => group.items);
  return foodCategoryGroups[modeId]?.items ?? [];
}

function prepareFoodHungerOptions() {
  const targetId = state.foodHungerRoundIds[state.foodHungerTargetIndex];
  const items = foodHungerItems();
  state.foodHungerOptionIds = shuffleArray([
    targetId,
    ...shuffleArray(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
  ]);
  state.foodHungerWrongIds = new Set();
}

function resetFoodHungerGame(modeId = state.foodHungerModeId) {
  state.foodHungerModeId = modeId;
  state.foodHungerRoundIds = shuffleArray(foodHungerItems(modeId).map((item) => item.id)).slice(0, 3);
  state.foodHungerTargetIndex = 0;
  state.foodHungerPlatedIds = [];
  state.foodHungerComplete = false;
  prepareFoodHungerOptions();
}

function ensureFoodHungerGame() {
  const items = foodHungerItems();
  const expectedCount = Math.min(3, items.length);
  const hasCurrentRound =
    state.foodHungerRoundIds.length === expectedCount &&
    state.foodHungerRoundIds.every((id) => items.some((item) => item.id === id));
  if (!hasCurrentRound) resetFoodHungerGame();
}

function currentFoodHungerTarget() {
  return foodHungerItems().find((item) => item.id === state.foodHungerRoundIds[state.foodHungerTargetIndex]);
}

function handleFoodHungerGuess(itemId) {
  if (state.foodHungerComplete) return;
  const target = currentFoodHungerTarget();
  if (!target) return;
  if (itemId !== target.id) {
    state.foodHungerWrongIds = new Set([...state.foodHungerWrongIds, itemId]);
    renderActivityPanel(currentTopic());
    return;
  }
  state.foodHungerPlatedIds = [...state.foodHungerPlatedIds, target.id];
  if (state.tapAudioEnabled) speak(target.hanzi, 0.78);
  state.foodHungerTargetIndex += 1;
  state.foodHungerComplete = state.foodHungerTargetIndex === state.foodHungerRoundIds.length;
  if (!state.foodHungerComplete) prepareFoodHungerOptions();
  renderActivityPanel(currentTopic());
}

function renderFoodHungerGame() {
  ensureFoodHungerGame();
  const items = foodHungerItems();
  const target = currentFoodHungerTarget();
  const platedItems = state.foodHungerPlatedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const optionItems = state.foodHungerOptionIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const isComplete = state.foodHungerComplete;
  return `
    <section class="practice-split-card food-hunger-game-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">饿了，吃点什么？${state.showEnglish ? '<span class="food-hunger-kicker-english">Hungry? What should we eat?</span>' : ""}</p><p class="numbers-game-note">Choose a food group or Mix. A food picture will appear. Tap the matching Chinese word to put it in your cart.</p></div></div>
      <div class="food-category-tabs food-hunger-tabs">${Object.entries(foodHungerModes).map(([id, mode]) => `<button class="food-category-tab${state.foodHungerModeId === id ? " is-active" : ""}" type="button" data-food-hunger-mode="${id}">${mode.hanzi}${state.showEnglish ? `<small>${mode.english}</small>` : ""}</button>`).join("")}</div>
      <div class="backpack-game-progress" aria-label="${state.foodHungerPlatedIds.length} of ${state.foodHungerRoundIds.length} foods in the cart">${state.foodHungerRoundIds.map((_, index) => `<span class="backpack-game-progress-dot${index < state.foodHungerPlatedIds.length ? " is-packed" : ""}">${index < state.foodHungerPlatedIds.length ? "✓" : ""}</span>`).join("")}</div>
      <div class="food-hunger-visual${isComplete ? " is-complete" : ""}">
        ${!isComplete && target ? `<div class="food-hunger-target"><img src="${foodCategoryIconPath(target.id)}" alt="${target.english}"></div>` : ""}
        <div class="food-hunger-cart"><img class="food-hunger-cart-image" src="assets/illustrated-food/game-shopping-cart.webp" alt="empty shopping cart">${platedItems.map((item, index) => `<img class="food-hunger-plated-item is-item-${index}" src="${foodCategoryIconPath(item.id)}" alt="">`).join("")}${isComplete ? '<span class="food-hunger-complete-mark" aria-label="All foods are in the cart">✓</span>' : ""}</div>
      </div>
      ${isComplete ? '<p class="backpack-game-complete-message">Your cart is ready!</p>' : `<div class="numbers-game-options backpack-game-options food-hunger-options">${optionItems.map((item) => { const isWrong = state.foodHungerWrongIds.has(item.id); return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-food-hunger-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`; }).join("")}</div>`}
    </section>
  `;
}

function renderFoodPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "";
  activityPanelSummary.hidden = true;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderFoodHungerGame()}
        <section class="practice-split-card">
          <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
          <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
          <div class="transport-build-hint">${state.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
          <div class="transport-build-target is-${state.schoolBuildResult}">${state.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.schoolBuildResult === "correct" ? "✓" : "×"}</span>` : ""}${state.schoolBuildSelectedTokens.length ? state.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
          <div class="intro-build-choices">${state.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
          <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state.schoolBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
        </section>
      </div>
    </section>
  `;
  activityList.querySelectorAll("[data-food-hunger-mode]").forEach((button) => button.addEventListener("click", () => {
    resetFoodHungerGame(button.dataset.foodHungerMode);
    renderActivityPanel(topic);
  }));
  activityList.querySelectorAll("[data-food-hunger-guess]").forEach((button) => button.addEventListener("click", () => handleFoodHungerGuess(button.dataset.foodHungerGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolSentenceBuilder(item) {
  return `
    <section class="practice-split-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
      <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
      <div class="transport-build-hint">${state.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
      <div class="transport-build-target is-${state.schoolBuildResult}">${state.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.schoolBuildResult === "correct" ? "✓" : "×"}</span>` : ""}${state.schoolBuildSelectedTokens.length ? state.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
      <div class="intro-build-choices">${state.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
      <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state.schoolBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
    </section>
  `;
}

function renderBackpackGame() {
  ensureBackpackGame();
  const items = backpackGameItems();
  const target = currentBackpackGameTarget();
  const placedItems = state.backpackGamePlacedIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);
  const optionItems = state.backpackGameOptionIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);
  const isComplete = state.backpackGameComplete;
  return `
    <section class="practice-split-card backpack-game-card">
      <div class="numbers-game-top">
        <div><p class="body-match-kicker">Pack the backpack</p><p class="numbers-game-note">Look at the school thing, then tap its Chinese word.</p></div>
        <button class="small-button is-action-button" type="button" data-backpack-game-new>New mix</button>
      </div>
      <div class="backpack-game-progress" aria-label="${state.backpackGamePlacedIds.length} of 3 items packed">
        ${[0, 1, 2].map((index) => `<span class="backpack-game-progress-dot${index < state.backpackGamePlacedIds.length ? " is-packed" : ""}">${index < state.backpackGamePlacedIds.length ? "✓" : ""}</span>`).join("")}
      </div>
      <div class="backpack-game-visual${isComplete ? " is-complete" : ""}">
        <img class="backpack-game-bag" src="assets/illustrated-stationery/${isComplete ? "backpack.webp" : "open-backpack.webp"}" alt="${isComplete ? "closed backpack" : "open backpack"}">
        ${!isComplete && target ? `<div class="backpack-game-target"><img src="${target.imagePath}" alt="${target.english}"></div>` : ""}
        ${!isComplete ? `<div class="backpack-game-packed-items">${placedItems.map((item, index) => `<img class="backpack-game-packed-item is-item-${index}" src="${item.imagePath}" alt="">`).join("")}</div>` : '<span class="backpack-game-complete-mark" aria-label="All packed">✓</span>'}
      </div>
      ${isComplete
        ? '<p class="backpack-game-complete-message">All packed!</p>'
        : `<div class="numbers-game-options backpack-game-options">${optionItems.map((item) => {
            const isWrong = state.backpackGameWrongIds.has(item.id);
            return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-backpack-game-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
          }).join("")}</div>`}
    </section>
  `;
}

function renderStationeryPictureMatch() {
  ensureStationeryPictureMatch();
  const round = currentStationeryPictureMatchRound();
  const columnLabels = { measure: "数量 + 量词", color: "颜色", item: "文具" };
  const selected = state.stationeryPictureMatchSelections;
  const isComplete = state.stationeryPictureMatchComplete;
  return `
    <section class="practice-split-card stationery-picture-match-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Match the picture</p><p class="numbers-game-note">Look at the picture. Choose the quantity, color, and school thing.</p></div></div>
      <figure class="stationery-picture-match-visual"><img src="${round.imagePath}" alt="${round.alt}"></figure>
      <div class="stationery-picture-match-columns">
        ${Object.entries(stationeryPictureMatchChoices).map(([column, choices]) => `
          <div class="stationery-picture-match-column">
            <p class="stationery-picture-match-label">${columnLabels[column]}</p>
            ${state.stationeryPictureMatchChoiceOrders[column].map((choice) => {
              const isCorrect = selected[column] === choice;
              const isWrong = state.stationeryPictureMatchWrong[column].has(choice);
              return `<button class="stationery-picture-match-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-stationery-picture-match-pick="${column}" data-stationery-picture-match-value="${choice}"${isCorrect || isComplete ? " disabled" : ""}><span class="stationery-picture-match-word">${choice}</span>${state.showEnglish ? `<span class="stationery-picture-match-english">${stationeryPictureMatchEnglish[choice]}</span>` : ""}${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}</button>`;
            }).join("")}
          </div>
        `).join("")}
      </div>
      ${isComplete ? `<div class="stationery-picture-match-result is-correct"><span class="answer-result-mark" aria-hidden="true">✓</span><div><strong>${Object.values(round.target).join("")}。</strong>${state.showPinyin ? `<span>${round.pinyin}</span>` : ""}${state.showEnglish ? `<span>${round.english}</span>` : ""}</div><button class="small-button is-action-button" type="button" data-stationery-picture-match-next>Next picture</button></div>` : ""}
    </section>
  `;
}

function renderStationeryPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "Match the words to the picture, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderStationeryPictureMatch()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelectorAll("[data-stationery-picture-match-pick]").forEach((button) => button.addEventListener("click", () => handleStationeryPictureMatchPick(button.dataset.stationeryPictureMatchPick, button.dataset.stationeryPictureMatchValue)));
  activityList.querySelector("[data-stationery-picture-match-next]")?.addEventListener("click", nextStationeryPictureMatch);
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolSuppliesPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "Pack three school things, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderBackpackGame()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelector("[data-backpack-game-new]")?.addEventListener("click", () => {
    resetBackpackGame();
    renderActivityPanel(topic);
  });
  activityList.querySelectorAll("[data-backpack-game-guess]").forEach((button) => button.addEventListener("click", () => handleBackpackGameGuess(button.dataset.backpackGameGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolPractice(topic) {
  if (topic.id === "food") {
    renderFoodPractice(topic);
    return;
  }
  if (topic.id === "food-preferences") {
    renderFoodPreferencesPractice(topic);
    return;
  }
  if (topic.id === "meals-feelings") {
    renderMealsConversationPractice(topic);
    return;
  }
  if (topic.id === "classroom") {
    renderClassroomPractice(topic);
    return;
  }
  if (topic.id === "stationery") {
    renderStationeryPractice(topic);
    return;
  }
  if (topic.id === "school-supplies") {
    renderSchoolSuppliesPractice(topic);
    return;
  }
  ensureSchoolPractice(topic.id);
  ensureSchoolBuilder(topic.id);
  const topicData = schoolTopicData[topic.id];
  const item = currentSchoolBuildItem();
  const listen = {
    items: () => schoolPracticeItems(topic.id),
    optionIds: () => state.schoolChallengeOptionIds,
    pickedId: () => state.schoolChallengePickedId,
    result: () => state.schoolChallengeResult,
    wrongIds: () => state.schoolChallengeWrongIds,
    feedback: () => state.schoolListenFeedback
  };
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = topicData?.practiceSummary ?? "Listen for a school word, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderListenPractice(listen)}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelector("[data-template-listen-play]")?.addEventListener("click", handleSchoolChallengePlay);
  activityList.querySelectorAll("[data-template-listen-guess]").forEach((button) => button.addEventListener("click", () => handleSchoolChallengeGuess(button.dataset.templateListenGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderMealsConversationPractice(topic) {
  ensureMealsConversationMatch();
  ensureMealsPictureChoice();
  const items = mealsConversationItems();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData[topic.id].practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderMatchPractice({
        phraseHeading: "First line",
        meaningHeading: "Reply",
        items: () => items,
        phraseIds: () => state.schoolPhraseOrder,
        meaningIds: () => state.schoolMeaningOrder,
        matchedIds: () => state.schoolMatchedIds,
        selectedId: () => state.schoolSelectedPhraseId,
        feedback: () => state.schoolMatchFeedback,
        wrongPhraseIds: () => state.mealsConversationWrongPhraseIds,
        wrongMeaningIds: () => state.mealsConversationWrongReplyIds,
        meaningContent: (id) => {
          const item = items.find((entry) => entry.id === id);
          if (!item) return "";
          return `<span class="numbers-game-hanzi">${item.reply}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.replyPinyin}</span>` : ""}`;
        }
      })}
      ${renderMealsPictureChoice()}
    </section>
  `;
  activityList.querySelector("[data-template-match-new]")?.addEventListener("click", () => {
    resetMealsConversationMatch();
    renderActivityPanel(topic);
  });
  activityList.querySelector("[data-template-match-play-again]")?.addEventListener("click", () => {
    resetMealsConversationMatch();
    renderActivityPanel(topic);
  });
  activityList.querySelectorAll("[data-template-match-phrase]").forEach((button) => button.addEventListener("click", () => handleMealsConversationPhrase(button.dataset.templateMatchPhrase)));
  activityList.querySelectorAll("[data-template-match-meaning]").forEach((button) => button.addEventListener("click", () => handleMealsConversationAttempt(button.dataset.templateMatchMeaning)));
  activityList.querySelectorAll("[data-meals-picture-pick]").forEach((button) => button.addEventListener("click", () => handleMealsPictureChoice(button.dataset.mealsPicturePick)));
  activityList.querySelector("[data-meals-picture-next]")?.addEventListener("click", nextMealsPictureChoice);
}

function renderFoodPreferencesPractice(topic) {
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData[topic.id].practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderFoodPreferenceFillPractice()}
    </section>
  `;
  activityList.querySelectorAll("[data-food-preference-subject]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceSubject(button.dataset.foodPreferenceSubject)));
  activityList.querySelectorAll("[data-food-preference-pattern]").forEach((button) => button.addEventListener("click", () => handleFoodPreferencePattern(button.dataset.foodPreferencePattern)));
  activityList.querySelectorAll("[data-food-preference-food]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceFill(button.dataset.foodPreferenceFood)));
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

function renderGreetingsExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: school greetings</h4>
        <p>This lesson follows the book page: greet a teacher politely, greet a friend in the morning, and say goodbye.</p>
      </div>
      <div class="greetings-practice-grid">
        ${greetingsPractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-greeting-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
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

  focusExplorer.querySelectorAll("[data-greeting-play-all]").forEach((button) => {
    button.addEventListener("click", async () => {
      const exchange = greetingsPractice.find((entry) => entry.id === button.dataset.greetingPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });
}

function timeDateSectionForCurrentLesson() {
  const lessonKey = `${currentBook().id}:${currentLesson().lesson}`;
  if (lessonKey === "2b:2" || lessonKey === "4a:3") return "clock";
  return "routine";
}

function activeTimeDateSection() {
  const source = `${currentBook().id}:${currentLesson().lesson}`;
  if (state.timeDateSectionSource !== source) {
    state.timeDateSectionSource = source;
    state.timeDateSectionId = timeDateSectionForCurrentLesson();
  }
  return state.timeDateSectionId || "week";
}

function renderTimeAssetGrid(items, modifier, collection = modifier) {
  return `<div class="time-asset-grid time-asset-grid-${modifier}">
    ${items
      .map(
        (item) => `
          <button class="time-asset-card" type="button" data-time-asset="${collection}:${item.id}">
            <img class="time-asset-image" src="${item.imagePath}" alt="${item.english}" />
            ${item.hideLabels || item.hideLabelHanzi ? "" : item.words ? `<span class="time-asset-word-list">${item.words.map((word) => `<span>${word}</span>`).join("")}</span>` : `<span class="time-asset-hanzi">${item.hanzi}</span>`}
            ${!item.hideLabels && !item.hideLabelDetails && state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
            ${!item.hideLabels && !item.hideLabelDetails && state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}
            ${item.context ? `<span class="time-asset-context">${item.context}</span>` : ""}
            ${item.contextPinyin && state.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
            ${item.contextEnglish && state.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
          </button>
        `
      )
      .join("")}
  </div>`;
}

function bindTimeAssetAudio(container) {
  container.querySelectorAll("[data-time-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collection, id] = button.dataset.timeAsset.split(":");
      const items = {
        week: timeDateWeekItems,
        clock: timeDateClockItems,
        date: timeDateDateItems,
        month: timeDateMonthItems,
        visual: Object.values(visualTopicItems).flat()
      }[collection] ?? [];
      const item = items.find((entry) => entry.id === id);
      if (item && state.tapAudioEnabled) {
        speak(item.audio, 0.78);
      }
    });
  });
}

function renderWeekdaysExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Days of the Week</h4>
      </div>
      <div class="time-asset-grid time-asset-grid-week">
        ${timeDateWeekItems.map((item) => `
          <section class="time-asset-card weekday-scene-card">
            <div class="greetings-exchange-top"><div><span class="time-asset-hanzi">${item.hanzi}</span></div><button class="small-button is-action-button" type="button" data-weekday-play-scene="${item.id}">Play scene</button></div>
            <img class="time-asset-image" src="${item.imagePath}" alt="${item.english}" />
            <span class="time-asset-context">${item.context}</span>
            ${state.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
            ${state.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
          </section>
        `).join("")}
      </div>
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">今天星期几？</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān xīng qī jǐ?</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">What day is it today?</p>' : ""}<p class="visual-topic-note-example">今天星期一。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān xīng qī yī.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Today is Monday.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
  focusExplorer.querySelectorAll("[data-weekday-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = timeDateWeekItems.find((entry) => entry.id === button.dataset.weekdayPlayScene);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
}

function renderDatesExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Dates & Months</h4>
      </div>
      ${renderTimeAssetGrid(timeDateDateItems, "date")}
      <section class="time-months-intro">
        <div>
          <p class="body-match-kicker">Months of the year</p>
          <p class="time-months-hanzi">一年有十二个月。</p>
          ${state.showPinyin ? '<p class="time-months-pinyin">yī nián yǒu shí èr ge yuè.</p>' : ""}
          ${state.showEnglish ? '<p class="time-months-english">There are twelve months in a year.</p>' : ""}
        </div>
        <button class="small-button is-action-button" type="button" data-months-play>Play audio</button>
      </section>
      ${renderTimeAssetGrid(timeDateMonthItems, "month")}
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">今天几月几号？</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān jǐ yuè jǐ hào?</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">What is the date today?</p>' : ""}<p class="visual-topic-note-example">今天五月二十号。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jīn tiān wǔ yuè èr shí hào.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Today is May twentieth.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">号 / 日</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">hào / rì</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">two ways to say the day of a date</p>' : ""}<p class="visual-topic-note-example">五月二十号 = 五月二十日。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">wǔ yuè èr shí hào = wǔ yuè èr shí rì.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Both mean May twentieth.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">祝你生日快乐！</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">zhù nǐ shēng rì kuài lè!</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">Wish you a happy birthday!</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">生日会 / 礼物</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">shēng rì huì / lǐ wù</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">birthday party / present</p>' : ""}<p class="visual-topic-note-example">生日会上有礼物。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">shēng rì huì shàng yǒu lǐ wù.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">There are presents at a birthday party.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelector("[data-months-play]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speak("一年有十二个月", 0.78);
    }
  });
}

function renderVisualTopicExplorer(sceneId) {
  const topic = currentTopic();
  const items = visualTopicItems[sceneId] ?? [];
  const comparisonWords = sceneId === "comparisons"
    ? `<div class="comparison-word-grid">${comparisonWordItems.map((item) => `<button class="comparison-word-card" type="button" data-comparison-word="${item.hanzi}"><span class="comparison-word-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="comparison-word-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="comparison-word-english">${item.english}</span>` : ""}</button>`).join("")}</div>`
    : "";
  const usefulNotes =
    sceneId === "transport"
      ? `
        <section class="visual-topic-notes">
          <p class="body-match-kicker">Useful notes</p>
          <div class="visual-topic-note-grid">
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">坐车</p>
              ${state.showPinyin ? '<p class="visual-topic-note-pinyin">zuò chē</p>' : ""}
              ${state.showEnglish ? '<p class="visual-topic-note-english">travel by vehicle; take a ride</p>' : ""}
              <p class="visual-topic-note-example">坐校车，坐出租车，坐火车。</p>
            </article>
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">去</p>
              ${state.showPinyin ? '<p class="visual-topic-note-pinyin">qù</p>' : ""}
              ${state.showEnglish ? '<p class="visual-topic-note-english">to go to</p>' : ""}
              <p class="visual-topic-note-example">去学校，去动物园，去北京。</p>
            </article>
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">骑</p>
              ${state.showPinyin ? '<p class="visual-topic-note-pinyin">qí</p>' : ""}
              ${state.showEnglish ? '<p class="visual-topic-note-english">to ride</p>' : ""}
              <p class="visual-topic-note-example">骑自行车。</p>
            </article>
          </div>
        </section>
      `
      : "";
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
      ${renderTimeAssetGrid(items, `visual visual-${sceneId}`, "visual")}
      ${comparisonWords}
      ${usefulNotes}
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-comparison-word]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.comparisonWord, 0.78);
    });
  });
}

function renderRoomsExplorer() {
  const topic = currentTopic();
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      <div class="greetings-practice-grid room-scene-grid">
        ${roomScenes.map((scene) => `
          <section class="greetings-exchange room-scene-card">
            <div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.label}</p></div><button class="small-button is-action-button" type="button" data-room-play-scene="${scene.id}">Play scene</button></div>
            <div class="room-scene-layout">
              <img class="room-scene-image" src="${scene.imagePath}" alt="${scene.english}" />
              <article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${scene.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${scene.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${scene.english}</p>` : ""}</div></article>
            </div>
          </section>
        `).join("")}
      </div>
      <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
      ${renderTimeAssetGrid(visualTopicItems.rooms, "visual visual-rooms", "visual")}
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid room-useful-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">房间里有……</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">fáng jiān lǐ yǒu...</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">There is / are ... in the room.</p>' : ""}<p class="visual-topic-note-example">里 means “in”; 有 means “there is / are.”</p></article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">地上有……</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">dì shàng yǒu...</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">There is / are ... on the floor.</p>' : ""}<p class="visual-topic-note-example">地上有书。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">dì shàng yǒu shū.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">There is a book on the floor.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-room-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = roomScenes.find((entry) => entry.id === button.dataset.roomPlayScene);
      if (scene && state.tapAudioEnabled) speak(scene.audio, 0.78);
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

function renderPositionsExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Positions & Directions</h4>
      </div>
      <div class="greetings-practice-grid">
        ${positionScenes
          .map(
            (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top"><div><p class="body-match-kicker">Scene ${scene.number}</p><p class="greetings-exchange-prompt">${scene.prompt}</p></div><button class="small-button is-action-button" type="button" data-position-play-scene="${scene.id}">Play scene</button></div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image position-scene-image position-scene-image-${scene.id}" src="${scene.imagePath}" alt="${scene.imageAlt}" /></div>
                  <div class="greetings-line-stack">
                    ${scene.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid position-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">A 在 B + 位置</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">A zài B + wèi zhì</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">A is in / on / beside B.</p>' : ""}<p class="visual-topic-note-example">书架在桌子左边。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">shū jià zài zhuō zi zuǒ biān.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">The bookshelf is to the left of the desk.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">前边 = 前面；后边 = 后面</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qián biān = qián miàn; hòu biān = hòu miàn</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">front and back can use either form here</p>' : ""}</article>
          ${[["上", "shàng", "up"], ["下", "xià", "down"], ["前", "qián", "front"], ["后", "hòu", "back"], ["左", "zuǒ", "left"], ["右", "yòu", "right"]].map(([hanzi, pinyin, english]) => `<article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${hanzi}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${pinyin}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${english}</p>` : ""}</article>`).join("")}
        </div>
      </section>
    </div>
  `;
  focusExplorer.querySelectorAll("[data-position-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = positionScenes.find((entry) => entry.id === button.dataset.positionPlayScene);
      if (scene && state.tapAudioEnabled) speakSceneLines(scene.lines);
    });
  });
}

function renderTimeDateExplorer() {
  const activeSection = activeTimeDateSection();
  const sections = [
    { id: "routine", hanzi: "作息", english: "Routine" },
    { id: "clock", hanzi: "时间", english: "Time" }
  ];
  let content = "";

  if (activeSection === "clock") {
    content = renderTimeAssetGrid(timeDateClockItems.filter((item) => item.id !== "clock-7"), "clock");
  } else {
    content = `
      <div class="greetings-practice-grid time-routine-scene-grid">
        ${timeDateRoutineItems
          .map(
            (item, index) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${index + 1}</p>
                    <p class="greetings-exchange-prompt">${item.english}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-time-routine-play="${item.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image time-routine-scene-image" src="${item.imagePath}" alt="${item.english}" /></div>
                  <div class="greetings-line-stack">
                    <article class="greetings-line-card">
                      <div class="telephone-bubble-copy">
                        <p class="telephone-line-hanzi">${item.hanzi}</p>
                        ${state.showPinyin ? `<p class="telephone-line-pinyin">${item.pinyin}</p>` : ""}
                        ${state.showEnglish ? `<p class="telephone-line-english">${item.english}</p>` : ""}
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    `;
  }

  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Time & Routines</h4>
      </div>
      <div class="time-date-section-tabs" role="tablist" aria-label="Time and date sections">
        ${sections
          .map(
            (section) => `<button class="time-date-section-tab${section.id === activeSection ? " is-active" : ""}" type="button" role="tab" aria-selected="${String(section.id === activeSection)}" data-time-date-section="${section.id}"><span>${section.hanzi}</span><small>${section.english}</small></button>`
          )
          .join("")}
      </div>
      ${content}
      <section class="visual-topic-notes time-useful-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">几点了？</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">jǐ diǎn le?</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">What time is it?</p>' : ""}<p class="visual-topic-note-example">现在七点。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">xiàn zài qī diǎn.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">It is seven o\'clock now.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">分 / 零</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">fēn / líng</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">minute / zero</p>' : ""}<p class="visual-topic-note-example">现在七点零五分。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">xiàn zài qī diǎn líng wǔ fēn.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">It is 7:05 now.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">早上 / 上午 / 中午 / 下午 / 晚上</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">zǎo shang / shàng wǔ / zhōng wǔ / xià wǔ / wǎn shang</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">early morning / morning / noon / afternoon / evening</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">你每天几点起床？</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">nǐ měi tiān jǐ diǎn qǐ chuáng?</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">What time do you get up every day?</p>' : ""}<p class="visual-topic-note-example">我每天七点起床。</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">wǒ měi tiān qī diǎn qǐ chuáng.</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">I get up at seven every day.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">刷牙 / 梳头 / 穿校服 / 穿鞋子</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">shuā yá / shū tóu / chuān xiào fú / chuān xié zi</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">brush teeth / comb hair / put on a school uniform / put on shoes</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">七点一刻 = 七点十五分</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qī diǎn yī kè = qī diǎn shí wǔ fēn</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">7:15</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">七点半 = 七点三十分</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qī diǎn bàn = qī diǎn sān shí fēn</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">7:30</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">七点三刻 = 七点四十五分</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qī diǎn sān kè = qī diǎn sì shí wǔ fēn</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">7:45</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-time-date-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.timeDateSectionId = button.dataset.timeDateSection;
      renderTimeDateExplorer();
      renderActivityPanel(currentTopic());
    });
  });
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-time-routine-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = timeDateRoutineItems.find((entry) => entry.id === button.dataset.timeRoutinePlay);
      if (item && state.tapAudioEnabled) {
        speak(item.audio, 0.78);
      }
    });
  });
}

function renderClothesExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: getting dressed</h4>
        <p>Learn everyday clothes first, then choose what to wear for the weather.</p>
      </div>
      <div class="greetings-practice-grid">
        ${clothesPractice
          .map(
            (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${scene.number}</p>
                    <p class="greetings-exchange-prompt">${scene.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-clothes-play-scene="${scene.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${scene.imagePath}" alt="${scene.imageAlt}" />
                  </div>
                  <div class="greetings-line-stack">
                    ${scene.lines
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
            `
          )
          .join("")}
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-clothes-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = clothesPractice.find((entry) => entry.id === button.dataset.clothesPlayScene);
      if (scene && state.tapAudioEnabled) {
        speakSceneLines(scene.lines);
      }
    });
  });
}

function renderPoliteWordsExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: kind classroom language</h4>
        <p>This topic starts with thank you and sorry, then grows into kind replies and polite requests.</p>
      </div>
      <div class="greetings-practice-grid">
        ${politePractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-polite-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
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

  focusExplorer.querySelectorAll("[data-polite-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = politePractice.find((entry) => entry.id === button.dataset.politePlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });
}

function renderIntroductionsExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: asking and saying names</h4>
        <p>This lesson mirrors Book 1A Lesson 6: say hello, ask a name, answer with 我叫..., and repeat the new friend's name.</p>
      </div>
      <div class="greetings-practice-grid">
        ${introductionsPractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-intro-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout introductions-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                  </div>
                  <div class="greetings-line-stack">
                    ${exchange.lines
                      .map(
                        (line, index) => `
                          <article class="greetings-line-card intro-line-card">
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

  focusExplorer.querySelectorAll("[data-intro-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = introductionsPractice.find((entry) => entry.id === button.dataset.introPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

}

function renderAgeExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: age and school year</h4>
        <p>This lesson starts with <strong>你几岁？</strong> / <strong>我...岁。</strong> and then adds <strong>你上几年级？</strong> / <strong>我上一年级。</strong></p>
      </div>
      <div class="greetings-practice-grid">
        ${agePractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-age-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
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

  focusExplorer.querySelectorAll("[data-age-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = agePractice.find((entry) => entry.id === button.dataset.agePlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
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
