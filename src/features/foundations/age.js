export const agePractice = [
  {
    id: "age-scene-2",
    number: "1",
    prompt: "Ask age first, then ask what grade a classmate is in",
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
    number: "2",
    prompt: "Connect age language to a birthday moment",
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
