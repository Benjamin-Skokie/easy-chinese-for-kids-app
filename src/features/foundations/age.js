export const ageTopic = {
    id: "age",
    title: "Age",
    summary: "A first identity lesson: say age, then say what grade you are in.",
    progressLabel: "1A to 3A",
    iconText: "五岁",
    iconColor: "#7998a5",
    iconAccent: "#f3d88a",
    iconTheme: "birthday",
    focus: {
      hanzi: "我五岁。",
      pinyin: "wǒ wǔ suì.",
      english: "I am five years old.",
      audio: "我五岁"
    },
    focusItems: [
      { id: "ask-age", hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { id: "age-five", hanzi: "我五岁。", pinyin: "wǒ wǔ suì.", english: "I am five years old.", audio: "我五岁" },
      { id: "age-six", hanzi: "我六岁。", pinyin: "wǒ liù suì.", english: "I am six years old.", audio: "我六岁" },
      { id: "age-seven", hanzi: "我七岁。", pinyin: "wǒ qī suì.", english: "I am seven years old.", audio: "我七岁" },
      { id: "ask-grade", hanzi: "你上几年级？", pinyin: "nǐ shàng jǐ nián jí?", english: "What grade are you in?", audio: "你上几年级" },
      { id: "grade-one", hanzi: "我上一年级。", pinyin: "wǒ shàng yì nián jí.", english: "I am in first grade.", audio: "我上一年级" },
      { id: "me-age-word", hanzi: "我", pinyin: "wǒ", english: "I; me", audio: "我" },
      { id: "how-many-age-word", hanzi: "几", pinyin: "jǐ", english: "how many", audio: "几" },
      { id: "age-word", hanzi: "岁", pinyin: "suì", english: "years old", audio: "岁" },
      { id: "attend-word", hanzi: "上", pinyin: "shàng", english: "to attend; to be in", audio: "上" },
      { id: "grade-word", hanzi: "年级", pinyin: "nián jí", english: "grade; school year", audio: "年级" }
    ],
    interactiveScene: "age-conversation",
    parentGuide:
      "Practice with the child's real age and real school year. Start with the whole exchange, then pause after 我 and let the child fill in the number or grade.",
    cultureGuide:
      "This lesson often works as an early identity bundle: name, age, and school year all come together in one short getting-to-know-you conversation.",
    activities: ["Tap to hear", "Fill in my age", "Say my grade", "Listen and point"],
    steps: [
      { book: "1A", lesson: 7, title: "I'm 5 years old", note: "Learn the first age sentence pattern." },
      { book: "3A", lesson: 3, title: "Happy birthday!", note: "Reconnect age with date and birthday language." }
    ]
};
export const agePractice = [
  {
    id: "age-scene-2",
    title: "Age and grade",
    imagePath: "assets/age/age-scene-2.webp",
    imageAlt: "Lele and Noah inside a classroom asking age first and then what grade someone is in",
    lines: [
      { hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { hanzi: "我六岁。", pinyin: "wǒ liù suì.", english: "I am six years old.", audio: "我六岁" },
      { hanzi: "你上几年级？", pinyin: "nǐ shàng jǐ nián jí?", english: "What grade are you in?", audio: "你上几年级" },
      { hanzi: "我上一年级。", pinyin: "wǒ shàng yì nián jí.", english: "I am in first grade.", audio: "我上一年级" }
    ]
  },
  {
    id: "age-scene-3",
    title: "Birthday age",
    imagePath: "assets/age/age-scene-3.webp",
    imageAlt: "Sisi at a birthday party with seven candles on a cake and friends around the table",
    lines: [
      { hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { hanzi: "我七岁。", pinyin: "wǒ qī suì.", english: "I am seven years old.", audio: "我七岁" }
    ]
  }
];

export const ageBuildPhrases = [
  {
    id: "build-ask-age",
    sourceItemId: "ask-age",
    targetHanzi: "你几岁？",
    prompt: "Build: How old are you?",
    english: "How old are you?",
    audio: "你几岁",
    tokens: ["你", "几", "岁"]
  },
  {
    id: "build-age-five",
    sourceItemId: "age-five",
    targetHanzi: "我五岁。",
    prompt: "Build: I am five years old.",
    english: "I am five years old.",
    audio: "我五岁",
    tokens: ["我", "五", "岁"]
  },
  {
    id: "build-age-six",
    sourceItemId: "age-six",
    targetHanzi: "我六岁。",
    prompt: "Build: I am six years old.",
    english: "I am six years old.",
    audio: "我六岁",
    tokens: ["我", "六", "岁"]
  },
  {
    id: "build-age-seven",
    sourceItemId: "age-seven",
    targetHanzi: "我七岁。",
    prompt: "Build: I am seven years old.",
    english: "I am seven years old.",
    audio: "我七岁",
    tokens: ["我", "七", "岁"]
  },
  {
    id: "build-ask-grade",
    sourceItemId: "ask-grade",
    targetHanzi: "你上几年级？",
    prompt: "Build: What grade are you in?",
    english: "What grade are you in?",
    audio: "你上几年级",
    tokens: ["你", "上", "几", "年级"]
  },
  {
    id: "build-grade-one",
    sourceItemId: "grade-one",
    targetHanzi: "我上一年级。",
    prompt: "Build: I am in first grade.",
    english: "I am in first grade.",
    audio: "我上一年级",
    tokens: ["我", "上", "一", "年级"]
  }
];
