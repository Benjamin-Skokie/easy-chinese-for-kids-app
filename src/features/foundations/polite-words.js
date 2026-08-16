export const politeWordsTopic = {
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
    { id: "please", hanzi: "请", pinyin: "qǐng", english: "please", audio: "请" },
    { id: "ask-teacher", hanzi: "我可以问老师吗？", pinyin: "wǒ kě yǐ wèn lǎo shī ma?", english: "May I ask the teacher?", audio: "我可以问老师吗" }
  ],
  interactiveScene: "polite-phrases",
  parentGuide: "Use these during real routines: handing snacks, passing pencils, cleaning up, or asking for help.",
  cultureGuide: "Polite language works best when tied to real exchanges. A quick classroom or home routine is better than a long explanation.",
  activities: ["Tap to hear", "Match phrase to situation", "Listen and choose", "Speak after me"],
  steps: [
    { book: "1A", lesson: 5, title: "Thank you!", note: "Start with a core manners phrase." },
    { book: "3A", lesson: 6, title: "Request", note: "Expand polite language into asking for things." }
  ]
};

export const politePractice = [
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
  },
  {
    id: "school-request-teacher-help",
    number: "4",
    prompt: "Asking a teacher politely for help",
    imagePath: "assets/illustrated-grammar/school-request-teacher-help.webp",
    imageAlt: "A child politely asking a teacher for help in a classroom",
    lines: [
      { hanzi: "我可以问老师吗？", pinyin: "wǒ kě yǐ wèn lǎo shī ma?", english: "May I ask the teacher?", audio: "我可以问老师吗" },
      { hanzi: "可以。", pinyin: "kě yǐ.", english: "Yes, you may.", audio: "可以" }
    ]
  }
];

export const politeGameItemIds = ["thank-you", "youre-welcome", "sorry", "never-mind", "ask-teacher"];
