export const requestsPermissionTopic = {
  id: "requests-permission",
  title: "Requests & Permission",
  summary: "Ask with 我可以…吗？, then listen for 可以 or 不行。",
  progressLabel: "3A Lesson 6",
  iconText: "可以吗",
  iconColor: "#517b8d",
  iconAccent: "#b9d6df",
  iconTheme: "requests",
  ownsExplorerContent: true,
  interactiveScene: "polite-phrases",
  focus: { hanzi: "我可以喝可乐吗？", pinyin: "wǒ kě yǐ hē kě lè ma?", english: "May I drink Coke?", audio: "我可以喝可乐吗" },
  bookWords: [
    { id: "yes-permission", hanzi: "可以。", pinyin: "kě yǐ.", english: "yes; may", audio: "可以" },
    { id: "no-permission", hanzi: "不行。", pinyin: "bù xíng.", english: "no; may not", audio: "不行" },
    { id: "question-particle", hanzi: "吗", pinyin: "ma", english: "question particle", audio: "吗" },
    { id: "drink-water", hanzi: "喝水", pinyin: "hē shuǐ", english: "drink water", audio: "喝水" },
    { id: "eat-meal", hanzi: "吃饭", pinyin: "chī fàn", english: "eat a meal", audio: "吃饭" },
    { id: "toilet", hanzi: "厕所", pinyin: "cè suǒ", english: "toilet; restroom", audio: "厕所" }
  ],
  focusItems: [
    { id: "ask-teacher", hanzi: "我可以问老师吗？", pinyin: "wǒ kě yǐ wèn lǎo shī ma?", english: "May I ask the teacher?", audio: "我可以问老师吗" },
    { id: "ask-tv", hanzi: "我可以看电视吗？", pinyin: "wǒ kě yǐ kàn diàn shì ma?", english: "May I watch TV?", audio: "我可以看电视吗" },
    { id: "ask-cola", hanzi: "我可以喝可乐吗？", pinyin: "wǒ kě yǐ hē kě lè ma?", english: "May I drink Coke?", audio: "我可以喝可乐吗" },
    { id: "no-water", hanzi: "不行。你可以喝水。", pinyin: "bù xíng. nǐ kě yǐ hē shuǐ.", english: "No. You may drink water.", audio: "不行你可以喝水" },
    { id: "yes-permission", hanzi: "可以。", pinyin: "kě yǐ.", english: "Yes, you may.", audio: "可以" },
    { id: "no-permission", hanzi: "不行。", pinyin: "bù xíng.", english: "No, you may not.", audio: "不行" },
    { id: "please", hanzi: "请", pinyin: "qǐng", english: "please", audio: "请" }
  ],
  steps: [{ book: "3A", lesson: 6, title: "Request", cardLabel: "Ask for permission", note: "Ask politely and understand permission answers." }]
};

export const requestPractice = [
  {
    id: "cola-or-water",
    title: "Choose water",
    imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp",
    imageAlt: "Anan asks Mom for Coke and Mom offers water instead",
    lines: [
      { hanzi: "我可以喝可乐吗？", pinyin: "wǒ kě yǐ hē kě lè ma?", english: "May I drink Coke?", audio: "我可以喝可乐吗" },
      { hanzi: "不行。你可以喝水。", pinyin: "bù xíng. nǐ kě yǐ hē shuǐ.", english: "No. You may drink water.", audio: "不行你可以喝水" }
    ]
  },
  {
    id: "tv-not-yet",
    title: "Not yet",
    imagePath: "assets/illustrated-grammar/request-tv-not-yet.webp",
    imageAlt: "A child asks to watch television before finishing homework",
    lines: [
      { hanzi: "我可以看电视吗？", pinyin: "wǒ kě yǐ kàn diàn shì ma?", english: "May I watch TV?", audio: "我可以看电视吗" },
      { hanzi: "不可以。", pinyin: "bù kě yǐ.", english: "No, you may not.", audio: "不可以" }
    ]
  },
  {
    id: "tv-now-you-can",
    title: "Now you can",
    imagePath: "assets/illustrated-grammar/request-tv-now-you-can.webp",
    imageAlt: "A child receives permission to watch television after finishing homework",
    lines: [
      { hanzi: "我现在可以看电视吗？", pinyin: "wǒ xiàn zài kě yǐ kàn diàn shì ma?", english: "May I watch TV now?", audio: "我现在可以看电视吗" },
      { hanzi: "可以。", pinyin: "kě yǐ.", english: "Yes, you may.", audio: "可以" }
    ]
  },
  {
    id: "school-request-teacher-help",
    title: "Asking a teacher",
    imagePath: "assets/illustrated-grammar/school-request-teacher-help.webp",
    imageAlt: "A child politely asking a teacher for help in a classroom",
    lines: [
      { hanzi: "我可以问老师吗？", pinyin: "wǒ kě yǐ wèn lǎo shī ma?", english: "May I ask the teacher?", audio: "我可以问老师吗" },
      { hanzi: "可以。", pinyin: "kě yǐ.", english: "Yes, you may.", audio: "可以" }
    ]
  }
];

export const requestGameItemIds = ["ask-cola", "no-water", "ask-tv", "yes-permission"];

export const requestBuildPhrases = [
  {
    id: "drink-cola",
    tokens: ["我", "可以", "喝可乐", "吗"],
    targetHanzi: "我可以喝可乐吗？",
    targetPinyin: "wǒ kě yǐ hē kě lè ma?",
    english: "May I drink Coke?",
    audio: "我可以喝可乐吗",
    imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp",
    imageAlt: "Anan asks Mom if she may drink Coke"
  },
  {
    id: "watch-tv",
    tokens: ["我", "可以", "看电视", "吗"],
    targetHanzi: "我可以看电视吗？",
    targetPinyin: "wǒ kě yǐ kàn diàn shì ma?",
    english: "May I watch TV?",
    audio: "我可以看电视吗",
    imagePath: "assets/illustrated-grammar/request-tv-not-yet.webp",
    imageAlt: "Lele asks his mother if he may watch television before finishing homework"
  },
  {
    id: "watch-tv-now",
    tokens: ["我", "现在", "可以", "看电视", "吗"],
    targetHanzi: "我现在可以看电视吗？",
    targetPinyin: "wǒ xiàn zài kě yǐ kàn diàn shì ma?",
    english: "May I watch TV now?",
    audio: "我现在可以看电视吗",
    imagePath: "assets/illustrated-grammar/request-tv-now-you-can.webp",
    imageAlt: "Lele asks his mother if he may watch television after finishing homework"
  },
  {
    id: "ask-teacher",
    tokens: ["我", "可以", "问老师", "吗"],
    targetHanzi: "我可以问老师吗？",
    targetPinyin: "wǒ kě yǐ wèn lǎo shī ma?",
    english: "May I ask the teacher a question?",
    audio: "我可以问老师吗",
    imagePath: "assets/illustrated-grammar/school-request-teacher-help.webp",
    imageAlt: "A child asks a teacher if he may ask her a question"
  }
];
