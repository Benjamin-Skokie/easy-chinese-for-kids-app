export const stationeryTopicData = {
    showWords: false,
    sceneGroups: [
      {
        id: "my-things",
        items: [
          {
            id: "my-stationery",
            label: "My stationery",
            compactLines: true,
            lines: [
              { hanzi: "这是我的铅笔。", pinyin: "zhè shì wǒ de qiān bǐ.", english: "This is my pencil." },
              { hanzi: "这是我的剪刀。", pinyin: "zhè shì wǒ de jiǎn dāo.", english: "This is my scissors." },
              { hanzi: "这是我的橡皮。", pinyin: "zhè shì wǒ de xiàng pí.", english: "This is my eraser." }
            ],
            audio: "这是我的铅笔这是我的剪刀这是我的橡皮",
            imagePath: "assets/illustrated-possession/i-have-stationery.webp"
          },
          {
            id: "my-classroom-things",
            label: "My classroom things",
            lines: [
              { hanzi: "这是我的椅子。", pinyin: "zhè shì wǒ de yǐ zi.", english: "This is my chair." },
              { hanzi: "这是我的桌子。", pinyin: "zhè shì wǒ de zhuō zi.", english: "This is my table." }
            ],
            audio: "这是我的椅子这是我的桌子",
            imagePath: "assets/illustrated-stationery/my-chair-and-table.webp"
          },
          {
            id: "my-book",
            label: "My book",
            lines: [
              { hanzi: "这是我的书。", pinyin: "zhè shì wǒ de shū.", english: "This is my book." }
            ],
            audio: "这是我的书",
            imagePath: "assets/illustrated-stationery/my-book-tiantian-landscape.webp"
          },
          {
            id: "three-red-pencils",
            label: "Three red pencils",
            lines: [
              { hanzi: "安安有三支红色的铅笔。", pinyin: "ān ān yǒu sān zhī hóng sè de qiān bǐ.", english: "Anan has three red pencils." }
            ],
            audio: "安安有三支红色的铅笔",
            imagePath: "assets/illustrated-stationery/anan-three-red-pencils.webp"
          }
        ]
      }
    ],
    words: [
      ["pencil", "铅笔", "qiān bǐ", "pencil", "pencil.webp"],
      ["ruler", "尺子", "chǐ zi", "ruler", "ruler.webp"],
      ["eraser", "橡皮", "xiàng pí", "eraser", "eraser.webp"],
      ["colored-pencils", "彩色铅笔", "cǎi sè qiān bǐ", "colored pencils", "colored-pencils.webp"],
      ["scissors", "剪刀", "jiǎn dāo", "scissors", "scissors.webp"],
      ["glue", "胶水", "jiāo shuǐ", "glue", "glue-stick.webp"],
      ["textbook", "课本", "kè běn", "textbook", "textbook.webp"],
      ["workbook", "练习本", "liàn xí běn", "workbook", "workbook.webp"],
      ["chair", "椅子", "yǐ zi", "chair", "chair.webp"],
      ["table", "桌子", "zhuō zi", "table", "table.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-stationery/${file}` })),
    review: [
      { pattern: "这是我的……", pinyin: "zhè shì wǒ de...", english: "This is my ...", example: "这是我的铅笔。", examplePinyin: "zhè shì wǒ de qiān bǐ.", exampleEnglish: "This is my pencil." },
      { pattern: "有 + 数量 + 颜色 + 文具", pinyin: "yǒu + shù liàng + yán sè + wén jù", english: "has + number + color + school thing", example: "安安有三支红色的铅笔。", examplePinyin: "ān ān yǒu sān zhī hóng sè de qiān bǐ.", exampleEnglish: "Anan has three red pencils." },
      { pattern: "一支 / 一把 / 一块", pinyin: "yì zhī / yì bǎ / yí kuài", english: "measure words for pens, scissors, and erasers", example: "一支铅笔。一把剪刀。一块橡皮。", examplePinyin: "yì zhī qiān bǐ. yì bǎ jiǎn dāo. yí kuài xiàng pí.", exampleEnglish: "one pencil, one pair of scissors, one eraser" }
    ]
};

export const stationerySentenceBuilds = [
    { id: "my-pencil", imagePath: "assets/illustrated-stationery/pencil.webp", target: ["这", "是", "我的", "铅笔"], distractors: ["有", "书包", "里"], pinyin: "zhè shì wǒ de qiān bǐ.", english: "This is my pencil." },
    { id: "my-chair", imagePath: "assets/illustrated-stationery/chair.webp", target: ["这", "是", "我的", "椅子"], distractors: ["有", "书包", "里"], pinyin: "zhè shì wǒ de yǐ zi.", english: "This is my chair." },
    { id: "my-book", imagePath: "assets/illustrated-stationery/my-book-tiantian-landscape.webp", target: ["这", "是", "我的", "书"], distractors: ["有", "书包", "里"], pinyin: "zhè shì wǒ de shū.", english: "This is my book." },
    { id: "anan-scissors", imagePath: "assets/illustrated-possession/this-is-my-scissors.webp", target: ["安安", "有", "剪刀"], distractors: ["这是", "我的", "书包"], pinyin: "ān ān yǒu jiǎn dāo.", english: "Anan has scissors." },
    { id: "red-pencil", imagePath: "assets/illustrated-stationery/anan-three-red-pencils.webp", target: ["安安", "有", "三支", "红色的", "铅笔"], distractors: ["一把", "书包", "里"], pinyin: "ān ān yǒu sān zhī hóng sè de qiān bǐ.", english: "Anan has three red pencils." },
    { id: "one-pencil", imagePath: "assets/illustrated-measure-words/one-pencil.webp", target: ["我", "有", "一支", "铅笔"], distractors: ["一把", "书包", "里"], pinyin: "wǒ yǒu yì zhī qiān bǐ.", english: "I have one pencil." },
    { id: "one-scissors", imagePath: "assets/illustrated-measure-words/one-scissors.webp", target: ["我", "有", "一把", "剪刀"], distractors: ["一支", "书包", "里"], pinyin: "wǒ yǒu yì bǎ jiǎn dāo.", english: "I have one pair of scissors." },
    { id: "one-eraser", imagePath: "assets/illustrated-measure-words/one-eraser.webp", target: ["我", "有", "一块", "橡皮"], distractors: ["一支", "书包", "里"], pinyin: "wǒ yǒu yí kuài xiàng pí.", english: "I have one eraser." }
];

export const stationeryPictureMatchRounds = [
  {
    id: "three-red-pencils",
    imagePath: "assets/illustrated-stationery/three-red-pencils.webp",
    alt: "three red pencils",
    target: { measure: "三支", color: "红色的", item: "铅笔" },
    pinyin: "sān zhī hóng sè de qiān bǐ.",
    english: "three red pencils"
  },
  {
    id: "orange-scissors",
    imagePath: "assets/illustrated-stationery/scissors.webp",
    alt: "orange scissors",
    target: { measure: "一把", color: "橙色的", item: "剪刀" },
    pinyin: "yì bǎ chéng sè de jiǎn dāo.",
    english: "one pair of orange scissors"
  },
  {
    id: "blue-eraser",
    imagePath: "assets/illustrated-stationery/blue-eraser.webp",
    alt: "blue eraser",
    target: { measure: "一块", color: "蓝色的", item: "橡皮" },
    pinyin: "yí kuài lán sè de xiàng pí.",
    english: "one blue eraser"
  }
];

export const stationeryPictureMatchChoices = {
  measure: ["三支", "一把", "一块"],
  color: ["红色的", "橙色的", "蓝色的"],
  item: ["铅笔", "剪刀", "橡皮"]
};

export const stationeryPictureMatchEnglish = {
  "三支": "three",
  "一把": "one pair",
  "一块": "one",
  "红色的": "red",
  "橙色的": "orange",
  "蓝色的": "blue",
  "铅笔": "pencil",
  "剪刀": "scissors",
  "橡皮": "eraser"
};
