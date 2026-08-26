export const positionsTopic = {
  id: "positions",
  title: "Positions & Directions",
  summary: "Use up, down, inside, outside, and directions to describe where things are.",
  progressLabel: "3B Lesson 3",
  iconText: "上下",
  iconColor: "#587d9c",
  ownsExplorerContent: true,
  focus: { hanzi: "在上面。", pinyin: "zài shàng miàn.", english: "It is on top.", audio: "在上面" },
  interactiveScene: "positions",
  parentGuide: "Use a book, backpack, and pencil case to act out each position before naming it.",
  cultureGuide: "Position language becomes useful quickly in classroom directions, home routines, and simple games.",
  activities: ["Tap to hear", "Find the position", "Say where it is"],
  steps: [{ book: "3B", lesson: 3, title: "Positions", cardLabel: "Say where things are", note: "Describe where objects are." }]
};

export const positionVisualItems = [
    ["上和下", "shàng hé xià", "up and down", "positions-up-down.webp"],
    ["里和外", "lǐ hé wài", "inside and outside", "positions-inside-outside.webp"],
    ["上、下、前、后、左、右", "shàng, xià, qián, hòu, zuǒ, yòu", "up, down, front, back, left, right", "positions-all-directions.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-rooms/${file}` }));

export const positionScenes = [
  {
    id: "up-down",
    title: "Up and down",
    imagePath: "assets/illustrated-rooms/positions-up-down.webp",
    imageAlt: "A book and backpack showing up and down positions around a desk",
    lines: [
      { hanzi: "书在桌子上。", sentenceStart: "书在桌子", answer: "上", pinyin: "shū zài zhuō zi shàng.", english: "The book is on the desk.", audio: "书在桌子上" },
      { hanzi: "书包在桌子下面。", sentenceStart: "书包在桌子", answer: "下面", pinyin: "shū bāo zài zhuō zi xià miàn.", english: "The backpack is under the desk.", audio: "书包在桌子下面" }
    ]
  },
  {
    id: "inside-outside",
    title: "Inside and outside",
    imagePath: "assets/illustrated-rooms/positions-inside-outside.webp",
    imageAlt: "A backpack, book, and pencil case showing inside and outside positions",
    lines: [
      { hanzi: "书在书包里面。", sentenceStart: "书在书包", answer: "里面", pinyin: "shū zài shū bāo lǐ miàn.", english: "The book is in the backpack.", audio: "书在书包里面" },
      { hanzi: "文具盒在书包外面。", sentenceStart: "文具盒在书包", answer: "外面", pinyin: "wén jù hé zài shū bāo wài miàn.", english: "The pencil case is outside the backpack.", audio: "文具盒在书包外面" }
    ]
  },
  {
    id: "room-directions",
    title: "Around the room",
    imagePath: "assets/illustrated-rooms/positions-room.webp",
    imageAlt: "A girl, chair, bookshelf, and dog in a room for practicing directions",
    lines: [
      { hanzi: "女孩在桌子前面。", sentenceStart: "女孩在桌子", answer: "前面", pinyin: "nǚ hái zài zhuō zi qián miàn.", english: "The girl is in front of the desk.", audio: "女孩在桌子前面" },
      { hanzi: "椅子在女孩后面。", sentenceStart: "椅子在女孩", answer: "后面", pinyin: "yǐ zi zài nǚ hái hòu miàn.", english: "The chair is behind the girl.", audio: "椅子在女孩后面" },
      { hanzi: "书架在桌子左边。", sentenceStart: "书架在桌子", answer: "左边", pinyin: "shū jià zài zhuō zi zuǒ biān.", english: "The bookshelf is to the left of the desk.", audio: "书架在桌子左边" },
      { hanzi: "小狗在桌子右边。", sentenceStart: "小狗在桌子", answer: "右边", pinyin: "xiǎo gǒu zài zhuō zi yòu biān.", english: "The dog is to the right of the desk.", audio: "小狗在桌子右边" }
    ]
  },
  {
    id: "all-directions",
    title: "Directions",
    imagePath: "assets/illustrated-rooms/positions-all-directions.webp",
    imageAlt: "A visual board showing up, down, front, back, left, and right",
    practice: false,
    lines: [
      { hanzi: "上、下、前、后、左、右。", pinyin: "shàng, xià, qián, hòu, zuǒ, yòu.", english: "Up, down, front, back, left, right.", audio: "上，下，前，后，左，右" }
    ]
  }
];

export const positionBookWords = [
  { hanzi: "上", pinyin: "shàng", english: "up; on" },
  { hanzi: "下", pinyin: "xià", english: "down; under" },
  { hanzi: "里", pinyin: "lǐ", english: "inside" },
  { hanzi: "外", pinyin: "wài", english: "outside" },
  { hanzi: "前", pinyin: "qián", english: "front" },
  { hanzi: "后", pinyin: "hòu", english: "back" },
  { hanzi: "左", pinyin: "zuǒ", english: "left" },
  { hanzi: "右", pinyin: "yòu", english: "right" }
];

export const positionPracticeItems = positionScenes
  .filter((scene) => scene.practice !== false)
  .flatMap((scene) => scene.lines.map((line, index) => ({ id: `${scene.id}-${index}`, ...line, imagePath: scene.imagePath, imageAlt: scene.imageAlt })));
