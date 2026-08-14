export const hobbiesTopic = {
  id: "hobbies",
  title: "What I Like",
  summary: "Talk about activities you like and what you do every day.",
  progressLabel: "2A Lesson 5",
  iconText: "喜欢",
  iconColor: "#8f6988",
  ownsExplorerContent: true,
  focus: { hanzi: "我喜欢看书。", pinyin: "wǒ xǐ huan kàn shū.", english: "I like reading.", audio: "我喜欢看书" },
  focusItems: [
    { id: "read", hanzi: "看书", pinyin: "kàn shū", english: "read", audio: "看书", imagePath: "assets/illustrated-activities/child-reading-book-facing-child.webp", imageAlt: "Meimei reading a book" },
    { id: "draw", hanzi: "画画", pinyin: "huà huà", english: "draw", audio: "画画", imagePath: "assets/illustrated-activities/anan-drawing.webp", imageAlt: "Anan drawing at a table" },
    { id: "write", hanzi: "写字", pinyin: "xiě zì", english: "write", audio: "写字", imagePath: "assets/illustrated-activities/luna-writing-workbook.webp", imageAlt: "Luna writing in a workbook" },
    { id: "play", hanzi: "玩儿游戏", pinyin: "wánr yóu xì", english: "play games", audio: "玩儿游戏", imagePath: "assets/illustrated-activities/lele-anan-playing-board-game.webp", imageAlt: "Lele and Anan playing a board game" },
    { id: "every-day", hanzi: "每天", pinyin: "měi tiān", english: "every day", audio: "每天" },
    { id: "we", hanzi: "我们", pinyin: "wǒ men", english: "we", audio: "我们" },
    { id: "sing", hanzi: "唱歌", pinyin: "chàng gē", english: "sing", audio: "唱歌", imagePath: "assets/illustrated-activities/kids_singing_chorus.webp", imageAlt: "Children singing together" },
    { id: "dance", hanzi: "跳舞", pinyin: "tiào wǔ", english: "dance", audio: "跳舞", imagePath: "assets/illustrated-activities/luna-dancing-landscape.webp", imageAlt: "Luna dancing in a studio" },
    { id: "swim", hanzi: "游泳", pinyin: "yóu yǒng", english: "swim", audio: "游泳", imagePath: "assets/illustrated-activities/jaden_swimming.webp", imageAlt: "Jaden swimming" },
    { id: "skate", hanzi: "滑冰", pinyin: "huá bīng", english: "skate", audio: "滑冰", imagePath: "assets/illustrated-activities/noah-ice-skating.webp", imageAlt: "Noah ice skating" },
    { id: "ski", hanzi: "滑雪", pinyin: "huá xuě", english: "ski", audio: "滑雪", imagePath: "assets/illustrated-activities/noah_skiing.webp", imageAlt: "Noah skiing" }
  ],
  parentGuide: "Choose activities the child already loves. Familiar routines make speaking practice feel much less abstract.",
  cultureGuide: "Hobbies are a nice place to introduce art, music, and cultural interests once the core language is stable.",
  activities: ["Tap to hear", "Build a sentence"],
  steps: [{ book: "2A", lesson: 5, title: "I love reading", note: "Start with a simple preference pattern." }],
};

export const hobbies3bTopic = {
  id: "hobbies-3b",
  title: "Music & Movement",
  summary: "Ask which music and movement activities someone likes.",
  progressLabel: "3B Lesson 4",
  iconText: "爱好",
  iconColor: "#8f6988",
  ownsExplorerContent: true,
  focus: { hanzi: "你喜欢游泳吗？", pinyin: "nǐ xǐ huan yóu yǒng ma?", english: "Do you like swimming?", audio: "你喜欢游泳吗" },
  focusItems: hobbiesTopic.focusItems,
  parentGuide: hobbiesTopic.parentGuide,
  cultureGuide: hobbiesTopic.cultureGuide,
  activities: ["Tap to hear", "Build a question"],
  steps: [{ book: "3B", lesson: 4, title: "Hobbies", note: "Ask and answer about activity preferences." }]
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
