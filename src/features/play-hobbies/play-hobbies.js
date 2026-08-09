export const hobbiesTopic = {
  id: "hobbies",
  title: "Hobbies",
  summary: "A good branch for personal expression and longer conversations later.",
  progressLabel: "2A to 4B",
  iconText: "喜欢",
  iconColor: "#8f6988",
  focus: { hanzi: "我喜欢看书。", pinyin: "wǒ xǐ huan kàn shū.", english: "I like reading.", audio: "我喜欢看书" },
  parentGuide: "Choose activities the child already loves. Familiar routines make speaking practice feel much less abstract.",
  cultureGuide: "Hobbies are a nice place to introduce art, music, and cultural interests once the core language is stable.",
  activities: ["Tap to hear", "Choose what I like", "Listen and choose", "Talk about my hobby"],
  steps: [
    { book: "2A", lesson: 5, title: "I love reading", note: "Start with a simple preference pattern." },
    { book: "3B", lesson: 4, title: "Hobbies", note: "Broaden the hobby set." },
    { book: "4B", lesson: 4, title: "Hobbies", note: "Revisit hobby language." },
    { book: "4B", lesson: 7, title: "Leisure time", note: "Use hobbies in free-time language." }
  ]
};

export const toysTopic = {
  id: "toys",
  title: "Toys",
  summary: "A focused toy and kid-transport word set that fits Book 2A well and works for quick picture-based review.",
  progressLabel: "2A toy store",
  iconText: "玩具",
  iconColor: "#b86f52",
  iconAccent: "#f2cb7f",
  iconTheme: "toys",
  focus: { hanzi: "玩具汽车，火车，飞机", pinyin: "wán jù qì chē, huǒ chē, fēi jī", english: "toy car, train, airplane", audio: "玩具汽车，火车，飞机" },
  focusItems: [
    { id: "toy-car", hanzi: "玩具汽车", pinyin: "wán jù qì chē", english: "toy car", audio: "玩具汽车" },
    { id: "train", hanzi: "火车", pinyin: "huǒ chē", english: "train", audio: "火车" },
    { id: "airplane", hanzi: "飞机", pinyin: "fēi jī", english: "airplane", audio: "飞机" },
    { id: "school-bus", hanzi: "校车", pinyin: "xiào chē", english: "school bus", audio: "校车" },
    { id: "subway", hanzi: "地铁", pinyin: "dì tiě", english: "subway", audio: "地铁" },
    { id: "toy-doll", hanzi: "玩具娃娃", pinyin: "wán jù wá wa", english: "toy doll", audio: "玩具娃娃" },
    { id: "bicycle", hanzi: "自行车", pinyin: "zì xíng chē", english: "bicycle", audio: "自行车" }
  ],
  parentGuide: "Use the child's own toy shelf first. Point, tap the card, hear the word, then ask the child to find the matching toy or vehicle.",
  cultureGuide: "This set bridges toy language and everyday transport language, so it can grow naturally into later daily-life lessons.",
  activities: ["Tap to hear", "Find the toy", "Listen and choose", "Sort toys and vehicles"],
  steps: [{ book: "2A", lesson: 4, title: "My toys", note: "Learn a core toy set with familiar child-friendly objects." }]
};
