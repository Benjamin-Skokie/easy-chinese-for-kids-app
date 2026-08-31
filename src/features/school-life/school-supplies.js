export const schoolSuppliesTopicData = {
    scenes: [
      {
        id: "stationery",
        label: "In the pencil case",
        lines: [
          { hanzi: "文具盒里有铅笔。", pinyin: "wén jù hé lǐ yǒu qiān bǐ.", english: "There is a pencil in the pencil case." },
          { hanzi: "文具盒里有橡皮。", pinyin: "wén jù hé lǐ yǒu xiàng pí.", english: "There is an eraser in the pencil case." },
          { hanzi: "文具盒里有彩色铅笔。", pinyin: "wén jù hé lǐ yǒu cǎi sè qiān bǐ.", english: "There are colored pencils in the pencil case." }
        ],
        audio: "文具盒里有铅笔文具盒里有橡皮文具盒里有彩色铅笔",
        imagePath: "assets/illustrated-stationery/pencil-box.webp"
      },
      {
        id: "schoolbag",
        label: "In the backpack",
        lines: [
          { hanzi: "书在书包里。", pinyin: "shū zài shū bāo lǐ.", english: "The book is in the backpack." },
          { hanzi: "书包里有书。", pinyin: "shū bāo lǐ yǒu shū.", english: "There is a book in the backpack." },
          { hanzi: "文具盒在书包外面。", pinyin: "wén jù hé zài shū bāo wài miàn.", english: "The pencil case is outside the backpack." }
        ],
        audio: "书在书包里书包里有书文具盒在书包外面",
        imagePath: "assets/illustrated-rooms/positions-inside-outside.webp"
      }
    ],
    words: [
      ["pencil", "铅笔", "qiān bǐ", "pencil", "pencil.webp"],
      ["ruler", "尺子", "chǐ zi", "ruler", "ruler.webp"],
      ["eraser", "橡皮", "xiàng pí", "eraser", "eraser.webp"],
      ["colored-pencils", "彩色铅笔", "cǎi sè qiān bǐ", "colored pencils", "colored-pencils.webp"],
      ["scissors", "剪刀", "jiǎn dāo", "scissors", "scissors.webp"],
      ["glue", "胶水", "jiāo shuǐ", "glue", "glue-stick.webp"],
      ["pencil-box", "文具盒", "wén jù hé", "pencil case", "pencil-box.webp"],
      ["textbook", "课本", "kè běn", "textbook", "textbook.webp"],
      ["workbook", "练习本", "liàn xí běn", "workbook", "workbook.webp"],
      ["schoolbag", "书包", "shū bāo", "backpack", "backpack.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-stationery/${file}` })),
    review: [
      {
        pattern: "书包里有书。",
        english: "English begins with “There is” or “There are.” Chinese begins with the place, then 有, then the thing.",
        examples: [{ hanzi: "文具盒里有铅笔。", english: "There is a pencil in the pencil case." }]
      },
      {
        pattern: "书在书包里。",
        english: "To say where something is, Chinese uses object + 在 + place + position word.",
        examples: [{ hanzi: "文具盒在书包外面。", english: "The pencil case is outside the backpack." }]
      }
    ]
};

export const schoolSuppliesSentenceBuilds = [
    { id: "stationery", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["文具盒", "里", "有", "铅笔"], distractors: ["学校", "喜欢", "图书馆"], audio: "文具盒里有铅笔。", pinyin: "wén jù hé lǐ yǒu qiān bǐ.", english: "There is a pencil in the pencil case." },
    { id: "eraser", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["文具盒", "里", "有", "橡皮"], distractors: ["学校", "喜欢", "图书馆"], audio: "文具盒里有橡皮。", pinyin: "wén jù hé lǐ yǒu xiàng pí.", english: "There is an eraser in the pencil case." },
    { id: "colored-pencils", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["文具盒", "里", "有", "彩色铅笔"], distractors: ["学校", "喜欢", "图书馆"], audio: "文具盒里有彩色铅笔。", pinyin: "wén jù hé lǐ yǒu cǎi sè qiān bǐ.", english: "There are colored pencils in the pencil case." },
    { id: "book-in-backpack", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["书", "在", "书包", "里"], distractors: ["教室", "喜欢", "椅子"], audio: "书在书包里。", pinyin: "shū zài shū bāo lǐ.", english: "The book is in the backpack." },
    { id: "backpack-has-book", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["书包", "里", "有", "书"], distractors: ["教室", "喜欢", "椅子"], audio: "书包里有书。", pinyin: "shū bāo lǐ yǒu shū.", english: "There is a book in the backpack." },
    { id: "pencil-case-outside", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["文具盒", "在", "书包", "外面"], distractors: ["教室", "喜欢", "椅子"], audio: "文具盒在书包外面。", pinyin: "wén jù hé zài shū bāo wài miàn.", english: "The pencil case is outside the backpack." }
];
