export const foodTopic = {
    id: "food",
    title: "Food & Drinks",
    summary: "Name food and drinks, from fruit and vegetables to snacks and everyday meals.",
    progressLabel: "1B to 3B",
    iconText: "水果",
    iconColor: "#c48d46",
    focus: { hanzi: "我吃苹果，喝牛奶。", pinyin: "wǒ chī píng guǒ, hē niú nǎi.", english: "I eat apples and drink milk.", audio: "我吃苹果喝牛奶" },
    interactiveScene: "food-scenes",
    parentGuide: "This is one of the easiest topics to make real. Use snack time, lunch, and shopping to repeat words naturally.",
    cultureGuide: "Food is a great place to add extra content later: dumplings, mooncakes, zòngzi, fruit names, and meal routines.",
    activities: ["Tap to hear", "Name the food", "Match the words", "Build a sentence"],
    steps: [
      { book: "1B", lesson: 7, title: "Fruit", cardLabel: "Name fruit", note: "Begin with highly visual food words." },
      { book: "2B", lesson: 7, title: "Snacks", cardLabel: "Name snacks", note: "Add everyday treat vocabulary." },
      { book: "3B", lesson: 6, title: "Vegetables", cardLabel: "Name vegetables", note: "Extend the category." }
    ]
  };

export const foodTopicData = {
    practiceSummary: "Listen for a food word, then build a sentence from the picture.",
    scenes: [
      {
        id: "fruit",
        label: "Fruit",
        hanzi: "我喜欢苹果、香蕉、葡萄和草莓。",
        pinyin: "wǒ xǐ huan píng guǒ, xiāng jiāo, pú tao hé cǎo méi.",
        english: "I like apples, bananas, grapes, and strawberries.",
        audio: "我喜欢苹果香蕉葡萄和草莓",
        imagePath: "assets/illustrated-food/fruit-group-1b-core.webp",
        lessonSources: ["1b:7"]
      }
    ],
    words: [
      ["apple", "苹果", "píng guǒ", "apple", "apple.webp"],
      ["banana", "香蕉", "xiāng jiāo", "banana", "banana.webp"],
      ["grapes", "葡萄", "pú tao", "grapes", "grapes.webp"],
      ["strawberry", "草莓", "cǎo méi", "strawberry", "strawberry.webp"],
      ["orange", "橙子", "chéng zi", "orange", "orange.webp"],
      ["pear", "梨", "lí", "pear", "pear.webp"],
      ["watermelon", "西瓜", "xī guā", "watermelon", "watermelon.webp"],
      ["peach", "桃子", "táo zi", "peach", "peach.webp"],
      ["cherries", "樱桃", "yīng táo", "cherries", "cherries.webp"],
      ["candies", "糖果", "táng guǒ", "candies", "candies.webp"],
      ["chocolate", "巧克力", "qiǎo kè lì", "chocolate", "chocolate.webp"],
      ["ice-cream", "冰淇淋", "bīng qí lín", "ice cream", "ice-cream.webp"],
      ["cake", "蛋糕", "dàn gāo", "cake", "cake.webp"],
      ["pizza", "披萨", "pī sà", "pizza", "pizza.webp"],
      ["milk", "牛奶", "niú nǎi", "milk", "milk.webp"],
      ["juice", "果汁", "guǒ zhī", "juice", "juice.webp"],
      ["cola", "可乐", "kě lè", "Coke", "cola.webp"],
      ["chow-mein", "炒面", "chǎo miàn", "chow mein", "chow-mein.webp"],
      ["fried-rice", "炒饭", "chǎo fàn", "fried rice", "fried-rice.webp"],
      ["french-fries", "薯条", "shǔ tiáo", "French fries", "french-fries.webp"],
      ["hamburger", "汉堡", "hàn bǎo", "hamburger", "hamburger.webp"],
      ["hot-dog", "热狗", "rè gǒu", "hot dog", "hot-dog.webp"],
      ["carrot", "胡萝卜", "hú luó bo", "carrot", "carrot.webp"],
      ["cucumber", "黄瓜", "huáng guā", "cucumber", "cucumber.webp"],
      ["tomato", "西红柿", "xī hóng shì", "tomato", "tomato.webp"],
      ["broccoli", "西兰花", "xī lán huā", "broccoli", "broccoli.webp"],
      ["potatoes", "土豆", "tǔ dòu", "potatoes", "potatoes.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-food/${file}` })),
    review: [
      {
        pattern: "吃苹果 / 喝牛奶",
        english: "吃 and 喝 work much like “eat” and “drink” in English: use 吃 for food and 喝 for drinks.",
        examples: [
          { hanzi: "我吃苹果。", english: "I eat apples." },
          { hanzi: "我喝牛奶。", english: "I drink milk." }
        ],
        lessonSources: ["1b:7", "2b:7", "3b:6"]
      }
    ]
};

export const foodSentenceBuilds = [
    { id: "apple", imagePath: "assets/illustrated-food/apple.webp", target: ["我", "吃", "苹果"], distractors: ["喝", "学校", "教室"], pinyin: "wǒ chī píng guǒ.", english: "I eat apples.", audio: "我吃苹果", lessonSources: ["1b:7"] },
    { id: "banana", imagePath: "assets/illustrated-food/banana.webp", target: ["我", "吃", "香蕉"], distractors: ["喝", "学校", "教室"], pinyin: "wǒ chī xiāng jiāo.", english: "I eat bananas.", audio: "我吃香蕉", lessonSources: ["1b:7"] },
    { id: "cake", imagePath: "assets/illustrated-food/cake.webp", target: ["我", "吃", "蛋糕"], distractors: ["喝", "学校", "教室"], pinyin: "wǒ chī dàn gāo.", english: "I eat cake.", audio: "我吃蛋糕", lessonSources: ["2b:7"] },
    { id: "carrot", imagePath: "assets/illustrated-food/carrot.webp", target: ["我", "吃", "胡萝卜"], distractors: ["喝", "学校", "教室"], pinyin: "wǒ chī hú luó bo.", english: "I eat carrots.", audio: "我吃胡萝卜", lessonSources: ["3b:6"] },
    { id: "milk", imagePath: "assets/illustrated-food/milk.webp", target: ["我", "喝", "牛奶"], distractors: ["吃", "学校", "教室"], pinyin: "wǒ hē niú nǎi.", english: "I drink milk.", audio: "我喝牛奶" },
    { id: "juice", imagePath: "assets/illustrated-food/juice.webp", target: ["我", "喝", "果汁"], distractors: ["吃", "学校", "教室"], pinyin: "wǒ hē guǒ zhī.", english: "I drink juice.", audio: "我喝果汁" },
    { id: "cola", imagePath: "assets/illustrated-food/cola.webp", target: ["我", "喝", "可乐"], distractors: ["吃", "学校", "教室"], pinyin: "wǒ hē kě lè.", english: "I drink Coke.", audio: "我喝可乐" },
    { id: "like-cola", imagePath: "assets/illustrated-food/cola.webp", target: ["我", "喜欢", "喝", "可乐"], distractors: ["不喜欢", "吃", "学校"], pinyin: "wǒ xǐ huan hē kě lè.", english: "I like to drink Coke.", audio: "我喜欢喝可乐" },
    { id: "like-apple", imagePath: "assets/illustrated-food/apple.webp", target: ["我", "喜欢", "吃", "苹果"], distractors: ["不喜欢", "喝", "学校"], pinyin: "wǒ xǐ huan chī píng guǒ.", english: "I like to eat apples.", audio: "我喜欢吃苹果" },
    { id: "dislike-broccoli", imagePath: "assets/illustrated-food/broccoli.webp", target: ["我", "不喜欢", "吃", "西兰花"], distractors: ["喜欢", "喝", "学校"], pinyin: "wǒ bù xǐ huan chī xī lán huā.", english: "I do not like to eat broccoli.", audio: "我不喜欢吃西兰花" }
];
