export const isItTopic = {
  id: "is-it",
  title: "Is It?",
  summary: "Ask a simple yes-or-no question, then answer with 是 or 不是.",
  progressLabel: "Topic enrichment",
  iconText: "是不是",
  iconColor: "#8a6e4a",
  iconAccent: "#efd38e",
  iconTheme: "grammar",
  focus: {
    hanzi: "这是不是包裹？",
    pinyin: "zhè shì bú shì bāo guǒ?",
    english: "Is this a package?",
    audio: "这是不是包裹"
  },
  focusItems: [
    { id: "is", hanzi: "是", pinyin: "shì", english: "is; yes", audio: "是" },
    { id: "is-not", hanzi: "不是", pinyin: "bú shì", english: "is not; no", audio: "不是" },
    { id: "package", hanzi: "包裹", pinyin: "bāo guǒ", english: "package", audio: "包裹" }
  ],
  interactiveScene: "is-it-contrast",
  parentGuide: "Point to a familiar object and ask 这是不是…？ Let the child answer 是 or 不是 before naming what it really is.",
  cultureGuide: "This is an optional speaking pattern, separate from the book sequence. Keep it concrete: one visible object, one short yes-or-no answer.",
  activities: ["Play the scene", "Learn the words", "Look and choose"],
  steps: []
};

export const isItScene = {
  id: "package-or-meimei",
  title: "Package surprise",
  imagePath: "assets/illustrated-grammar/shi-bu-shi-meimei-package.webp",
  imageAlt: "A package on the left and Meimei under the opened box on the right",
  lines: [
    { hanzi: "这是不是包裹？", pinyin: "zhè shì bú shì bāo guǒ?", english: "Is this a package?", audio: "这是不是包裹" },
    { hanzi: "不是，这是美美。", pinyin: "bú shì, zhè shì Měi mei.", english: "No, this is Meimei.", audio: "不是这是美美" }
  ]
};

export const isItPracticeRounds = [
  {
    id: "package",
    panel: "left",
    question: "这是不是包裹？",
    questionPinyin: "zhè shì bú shì bāo guǒ?",
    questionEnglish: "Is this a package?",
    answerId: "yes-package",
    options: [
      { id: "yes-package", hanzi: "是，这是一个包裹。", pinyin: "shì, zhè shì yí ge bāo guǒ.", english: "Yes, this is a package.", audio: "是这是一个包裹" },
      { id: "no-meimei", hanzi: "不是，这是美美。", pinyin: "bú shì, zhè shì Měi mei.", english: "No, this is Meimei.", audio: "不是这是美美" }
    ]
  },
  {
    id: "meimei",
    panel: "right",
    question: "这是不是包裹？",
    questionPinyin: "zhè shì bú shì bāo guǒ?",
    questionEnglish: "Is this a package?",
    answerId: "no-meimei",
    options: [
      { id: "yes-package", hanzi: "是，这是一个包裹。", pinyin: "shì, zhè shì yí ge bāo guǒ.", english: "Yes, this is a package.", audio: "是这是一个包裹" },
      { id: "no-meimei", hanzi: "不是，这是美美。", pinyin: "bú shì, zhè shì Měi mei.", english: "No, this is Meimei.", audio: "不是这是美美" }
    ]
  }
];
