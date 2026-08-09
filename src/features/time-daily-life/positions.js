export const positionVisualItems = [
    ["上和下", "shàng hé xià", "up and down", "positions-up-down.webp"],
    ["里和外", "lǐ hé wài", "inside and outside", "positions-inside-outside.webp"],
    ["上、下、前、后、左、右", "shàng, xià, qián, hòu, zuǒ, yòu", "up, down, front, back, left, right", "positions-all-directions.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-rooms/${file}` }));

export const positionScenes = [
  {
    id: "up-down",
    number: "1",
    prompt: "Up and down",
    imagePath: "assets/illustrated-rooms/positions-up-down.webp",
    imageAlt: "A book and backpack showing up and down positions around a desk",
    lines: [
      { hanzi: "书在桌子上。", pinyin: "shū zài zhuō zi shàng.", english: "The book is on the desk.", audio: "书在桌子上" },
      { hanzi: "桌子上有书。", pinyin: "zhuō zi shàng yǒu shū.", english: "There is a book on the desk.", audio: "桌子上有书" },
      { hanzi: "书包在桌子下。", pinyin: "shū bāo zài zhuō zi xià.", english: "The backpack is under the desk.", audio: "书包在桌子下" }
    ]
  },
  {
    id: "inside-outside",
    number: "2",
    prompt: "Inside and outside",
    imagePath: "assets/illustrated-rooms/positions-inside-outside.webp",
    imageAlt: "A backpack, book, and pencil case showing inside and outside positions",
    lines: [
      { hanzi: "书包里有书。", pinyin: "shū bāo lǐ yǒu shū.", english: "There is a book in the backpack.", audio: "书包里有书" },
      { hanzi: "书在书包里。", pinyin: "shū zài shū bāo lǐ.", english: "The book is in the backpack.", audio: "书在书包里" },
      { hanzi: "文具盒在书包外面。", pinyin: "wén jù hé zài shū bāo wài miàn.", english: "The pencil case is outside the backpack.", audio: "文具盒在书包外面" }
    ]
  },
  {
    id: "directions",
    number: "3",
    prompt: "Front, back, left, and right",
    imagePath: "assets/illustrated-rooms/positions-all-directions.webp",
    imageAlt: "A room board showing front, back, left, and right directions",
    lines: [
      { hanzi: "上、下、前、后、左、右。", pinyin: "shàng, xià, qián, hòu, zuǒ, yòu.", english: "Up, down, front, back, left, right.", audio: "上下前后左右" }
    ]
  },
  {
    id: "room-directions",
    number: "4",
    prompt: "Directions in a room",
    imagePath: "assets/illustrated-rooms/positions-room.webp",
    imageAlt: "A girl, chair, bookshelf, and dog in a room for practicing directions",
    lines: [
      { hanzi: "女孩在桌子前面。", pinyin: "nǚ hái zài zhuō zi qián miàn.", english: "The girl is in front of the desk.", audio: "女孩在桌子前面" },
      { hanzi: "椅子在女孩后面。", pinyin: "yǐ zi zài nǚ hái hòu miàn.", english: "The chair is behind the girl.", audio: "椅子在女孩后面" },
      { hanzi: "书架在女孩左边。", pinyin: "shū jià zài nǚ hái zuǒ biān.", english: "The bookshelf is to the girl's left.", audio: "书架在女孩左边" },
      { hanzi: "小狗在女孩右边。", pinyin: "xiǎo gǒu zài nǚ hái yòu biān.", english: "The dog is to the girl's right.", audio: "小狗在女孩右边" }
    ]
  }
];

export const positionPracticeItems = positionScenes.flatMap((scene) => scene.lines.map((line, index) => ({ id: `${scene.id}-${index}`, ...line, imagePath: scene.imagePath, imageAlt: scene.imageAlt })));

