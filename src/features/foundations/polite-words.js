export const politeWordsTopic = {
  id: "polite-words",
  title: "Polite Words",
  summary: "Useful everyday phrases for kind classroom moments.",
  progressLabel: "1A Lesson 5",
  iconText: "谢谢",
  iconColor: "#8f6c46",
  iconAccent: "#e6c77e",
  iconTheme: "polite",
  ownsExplorerContent: true,
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
  parentGuide: "Use these during real routines: handing snacks, passing pencils, cleaning up, or asking for help.",
  cultureGuide: "Polite language works best when tied to real exchanges. A quick classroom or home routine is better than a long explanation.",
  activities: ["Tap to hear", "Match phrase to situation", "Listen and choose", "Speak after me"],
  steps: [{ book: "1A", lesson: 5, title: "Thank you!", note: "Use kind words in everyday classroom moments." }]
};

export const politePractice = [
  {
    id: "polite-scene-1",
    title: "Thanking a friend",
    imagePath: "assets/polite/polite-scene-1.webp",
    imageAlt: "Two children in a classroom sharing a crayon politely",
    lines: [
      { hanzi: "谢谢你！", pinyin: "xiè xie nǐ!", english: "Thank you!", audio: "谢谢你" },
      { hanzi: "不客气。", pinyin: "bú kè qi.", english: "You're welcome.", audio: "不客气" }
    ]
  },
  {
    id: "polite-scene-2",
    title: "Saying sorry",
    imagePath: "assets/polite/polite-scene-2.webp",
    imageAlt: "One child apologizing after dropping a pencil case and another child forgiving kindly",
    lines: [
      { hanzi: "对不起。", pinyin: "duì bu qǐ.", english: "I'm sorry.", audio: "对不起" },
      { hanzi: "没关系。", pinyin: "méi guān xi.", english: "Never mind.", audio: "没关系" }
    ]
  },
  {
    id: "polite-scene-3",
    title: "Quiet classroom",
    imagePath: "assets/polite/polite-scene-3.webp",
    imageAlt: "A teacher kindly asking children to be quiet in the classroom",
    lines: [
      { hanzi: "请安静。", pinyin: "qǐng ān jìng.", english: "Please be quiet.", audio: "请安静" },
      { hanzi: "好。", pinyin: "hǎo.", english: "Okay.", audio: "好" }
    ]
  }
];

export const politeGameItemIds = ["thank-you", "youre-welcome", "sorry", "never-mind"];
