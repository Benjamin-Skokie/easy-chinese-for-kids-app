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
  steps: [{ book: "2A", lesson: 5, title: "I love reading", cardLabel: "Say what you like", note: "Start with a simple preference pattern." }],
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
  steps: [{ book: "3B", lesson: 4, title: "Hobbies", cardLabel: "Ask about hobbies", note: "Ask and answer about activity preferences." }]
};

export const hobbiesAtHomeTopic = {
  id: "hobbies-at-home",
  title: "Hobbies at Home",
  summary: "Talk about home media and music activities—what someone likes and what they are doing now.",
  progressLabel: "4B Lesson 4",
  iconText: "在家爱好",
  iconColor: "#8f6988",
  ownsExplorerContent: true,
  focus: { hanzi: "她在弹钢琴。", pinyin: "tā zài tán gāng qín.", english: "She is playing the piano.", audio: "她在弹钢琴" },
  focusItems: [
    { id: "television", hanzi: "看电视", pinyin: "kàn diàn shì", english: "watch television", audio: "看电视", imagePath: "assets/illustrated-activities/sisi-watching-television.webp", imageAlt: "Sisi watching television at home" },
    { id: "piano", hanzi: "弹钢琴", pinyin: "tán gāng qín", english: "play the piano", audio: "弹钢琴", imagePath: "assets/illustrated-activities/anan-playing-piano.webp", imageAlt: "Anan actively playing the piano" },
    { id: "computer-game", hanzi: "玩儿电脑游戏", pinyin: "wánr diàn nǎo yóu xì", english: "play computer games", audio: "玩儿电脑游戏", imagePath: "assets/illustrated-activities/lele-playing-computer-game.webp", imageAlt: "Lele playing a desktop computer game" },
    { id: "movie", hanzi: "看电影", pinyin: "kàn diàn yǐng", english: "watch a movie", audio: "看电影", imagePath: "assets/illustrated-activities/tiantian-at-cinema.webp", imageAlt: "Tiantian watching a movie at the cinema" },
    { id: "cartoons", hanzi: "看动画片儿", pinyin: "kàn dòng huà piānr", english: "watch cartoons", audio: "看动画片儿", imagePath: "assets/illustrated-activities/meimei_watching_cartoons.webp", imageAlt: "Meimei watching cartoons at home" }
  ],
  parentGuide: "Ask what your child likes to do at home, then notice the difference between a favorite activity and something happening right now.",
  cultureGuide: "Home activities give children a natural reason to use both preferences and present actions in short conversations.",
  activities: ["Tap to hear", "Choose the sentence"],
  steps: [{ book: "4B", lesson: 4, title: "Hobbies", cardLabel: "Talk about home activities", note: "Talk about home activities with 喜欢, 爱, and 在." }]
};

export const hobbiesLeisureTopic = {
  id: "hobbies-leisure",
  title: "Leisure Time",
  summary: "Say where people are doing outdoor activities.",
  progressLabel: "4B Lesson 7",
  iconText: "休闲",
  iconColor: "#8f6988",
  ownsExplorerContent: true,
  focus: { hanzi: "思思在公园骑自行车。", pinyin: "sī si zài gōng yuán qí zì xíng chē.", english: "Sisi is riding a bike in the park.", audio: "思思在公园骑自行车" },
  focusItems: [
    { id: "run", hanzi: "跑步", pinyin: "pǎo bù", english: "run", audio: "跑步", imagePath: "assets/illustrated-activities/kids-running-playground-landscape.webp", imageAlt: "Children running on a school playground" },
    { id: "soccer", hanzi: "踢足球", pinyin: "tī zú qiú", english: "play soccer", audio: "踢足球", imagePath: "assets/illustrated-activities/tiantian-playing-soccer-landscape.webp", imageAlt: "Tiantian kicking a soccer ball in a park" },
    { id: "bike", hanzi: "骑自行车", pinyin: "qí zì xíng chē", english: "ride a bike", audio: "骑自行车", imagePath: "assets/illustrated-activities/sisi-riding-bike-landscape.webp", imageAlt: "Sisi riding a bike in a park" },
    { id: "sand", hanzi: "玩儿沙子", pinyin: "wánr shā zi", english: "play with sand", audio: "玩儿沙子", imagePath: "assets/illustrated-activities/meimei-playing-sand-4x3.webp", imageAlt: "Meimei playing with sand at the beach" },
    { id: "playground", hanzi: "学校操场", pinyin: "xué xiào cāo chǎng", english: "school playground", audio: "学校操场" },
    { id: "park", hanzi: "公园", pinyin: "gōng yuán", english: "park", audio: "公园" },
    { id: "beach", hanzi: "海边", pinyin: "hǎi biān", english: "beach", audio: "海边" }
  ],
  parentGuide: "Use a familiar park, playground, or beach picture to help your child connect the place word with the activity.",
  cultureGuide: "Outdoor activities make a natural next step after talking about what someone likes to do at home.",
  activities: ["Tap to hear", "Build the sentence"],
  steps: [{ book: "4B", lesson: 7, title: "Leisure time", cardLabel: "Say where activities happen", note: "Say where someone is doing an outdoor activity." }]
};

export const toysTopic = {
  id: "toys",
  title: "Toys",
  summary: "Name four toys and say what you have.",
  progressLabel: "2A Lesson 4",
  iconText: "玩具",
  iconColor: "#b86f52",
  iconAccent: "#f2cb7f",
  iconTheme: "toys",
  ownsExplorerContent: true,
  focus: { hanzi: "我有玩具。", pinyin: "wǒ yǒu wán jù.", english: "I have toys.", audio: "我有玩具" },
  focusItems: [
    { id: "doll", hanzi: "娃娃", pinyin: "wá wa", english: "doll", audio: "娃娃", imagePath: "assets/illustrated-toys/toy-doll.webp", imageAlt: "A doll" },
    { id: "toy-train", hanzi: "玩具火车", pinyin: "wán jù huǒ chē", english: "toy train", audio: "玩具火车", imagePath: "assets/illustrated-toys/train.webp", imageAlt: "A toy train" },
    { id: "toy-airplane", hanzi: "玩具飞机", pinyin: "wán jù fēi jī", english: "toy airplane", audio: "玩具飞机", imagePath: "assets/illustrated-toys/airplane.webp", imageAlt: "A toy airplane" },
    { id: "toy-bear", hanzi: "玩具熊", pinyin: "wán jù xióng", english: "toy bear", audio: "玩具熊", imagePath: "assets/illustrated-toys/teddy-bear.webp", imageAlt: "A toy bear" }
  ],
  flashcardItems: [
    { id: "toys", hanzi: "玩具", pinyin: "wán jù", english: "toys", sentenceEnglish: "I have toys.", audio: "玩具", imagePath: "assets/illustrated-toys/toys-collection.webp", imageAlt: "A collection of toys" },
    { id: "toy-car", hanzi: "玩具汽车", pinyin: "wán jù qì chē", english: "toy car", sentenceEnglish: "I have a toy car.", audio: "玩具汽车", imagePath: "assets/illustrated-toys/toy-car.webp", imageAlt: "A toy car" },
    { id: "toy-train", hanzi: "玩具火车", pinyin: "wán jù huǒ chē", english: "toy train", sentenceEnglish: "I have a toy train.", audio: "玩具火车", imagePath: "assets/illustrated-toys/train.webp", imageAlt: "A toy train" },
    { id: "toy-airplane", hanzi: "玩具飞机", pinyin: "wán jù fēi jī", english: "toy airplane", sentenceEnglish: "I have a toy airplane.", audio: "玩具飞机", imagePath: "assets/illustrated-toys/airplane.webp", imageAlt: "A toy airplane" },
    { id: "school-bus", hanzi: "玩具校车", pinyin: "wán jù xiào chē", english: "toy school bus", sentenceEnglish: "I have a toy school bus.", audio: "玩具校车", imagePath: "assets/illustrated-toys/school-bus.webp", imageAlt: "A toy school bus" },
    { id: "doll", hanzi: "娃娃", pinyin: "wá wa", english: "doll", sentenceEnglish: "I have a doll.", audio: "娃娃", imagePath: "assets/illustrated-toys/toy-doll.webp", imageAlt: "A doll" },
    { id: "bicycle", hanzi: "自行车", pinyin: "zì xíng chē", english: "bicycle", sentenceEnglish: "I have a bicycle.", audio: "自行车", imagePath: "assets/illustrated-toys/bicycle.webp", imageAlt: "A bicycle" },
    { id: "toy-bear", hanzi: "玩具熊", pinyin: "wán jù xióng", english: "toy bear", sentenceEnglish: "I have a toy bear.", audio: "玩具熊", imagePath: "assets/illustrated-toys/teddy-bear.webp", imageAlt: "A toy bear" }
  ],
  parentGuide: "Point to a real toy at home and say 我有… together.",
  cultureGuide: "Keep this page with the Book 2A ownership frame; later requests to use someone else's toy belong in Requests.",
  activities: ["Tap to hear", "Say 我有…", "Picture choice"],
  steps: [{ book: "2A", lesson: 4, title: "My toys", cardLabel: "Say what toys you have", note: "Name four toys with 我有…" }]
};
