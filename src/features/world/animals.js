export const animalLessons = {
  "1b": {
    title: "Pets",
    summary: "Meet familiar pets and say which animals Lele likes.",
    scenes: [
      {
        title: "Pets at home",
        imagePath: "assets/illustrated-pets/lele-with-pets-at-home.webp",
        imageAlt: "Lele with a dog and a goldfish at home",
        lines: [
          { hanzi: "乐乐喜欢狗和金鱼。", pinyin: "Lè le xǐ huan gǒu hé jīn yú.", english: "Lele likes dogs and goldfish.", audio: "乐乐喜欢狗和金鱼" }
        ]
      }
    ],
    items: [
      { id: "dog", hanzi: "狗", pinyin: "gǒu", english: "dog", audio: "狗", imagePath: "assets/illustrated-animals/dog.webp", imageAlt: "A dog" },
      { id: "cat", hanzi: "猫", pinyin: "māo", english: "cat", audio: "猫", imagePath: "assets/illustrated-animals/cat.webp", imageAlt: "A cat" },
      { id: "turtle", hanzi: "乌龟", pinyin: "wū guī", english: "turtle", audio: "乌龟", imagePath: "assets/illustrated-animals/turtle.webp", imageAlt: "A turtle" },
      { id: "goldfish", hanzi: "金鱼", pinyin: "jīn yú", english: "goldfish", audio: "金鱼", imagePath: "assets/illustrated-animals/goldfish.webp", imageAlt: "A goldfish" }
    ],
    usefulNote: {
      hanzi: "我喜欢 + 名词。比如：我喜欢猫。",
      pinyin: "Wǒ xǐ huan + míng cí. Bǐ rú: Wǒ xǐ huan māo.",
      english: "我喜欢 means “I like.” Put an animal or thing after it."
    },
  },
  "2b": {
    title: "Animals",
    summary: "Count zoo animals with the right measure words.",
    scenes: [
      {
        title: "At the zoo",
        imagePath: "assets/illustrated-animals/zoo-scene.webp",
        imageAlt: "A zoo scene with a tiger, elephant, panda, and monkey",
        lines: [
          { hanzi: "动物园里有一只老虎，两头大象，三只熊猫。", pinyin: "Dòng wù yuán lǐ yǒu yì zhī lǎo hǔ, liǎng tóu dà xiàng, sān zhī xióng māo.", english: "There is one tiger, two elephants, and three pandas in the zoo.", audio: "动物园里有一只老虎，两头大象，三只熊猫" },
          { hanzi: "动物园里有很多猴子、金鱼和乌龟。", pinyin: "Dòng wù yuán lǐ yǒu hěn duō hóu zi, jīn yú hé wū guī.", english: "There are many monkeys, goldfish, and turtles in the zoo.", audio: "动物园里有很多猴子，金鱼和乌龟" }
        ]
      }
    ],
    items: [
      { id: "tiger", hanzi: "老虎", pinyin: "lǎo hǔ", english: "tiger", audio: "老虎", imagePath: "assets/illustrated-animals/tiger.webp", imageAlt: "A tiger" },
      { id: "elephant", hanzi: "大象", pinyin: "dà xiàng", english: "elephant", audio: "大象", imagePath: "assets/illustrated-animals/elephant.webp", imageAlt: "An elephant" },
      { id: "panda", hanzi: "熊猫", pinyin: "xióng māo", english: "panda", audio: "熊猫", imagePath: "assets/illustrated-animals/panda.webp", imageAlt: "A panda" },
      { id: "monkey", hanzi: "猴子", pinyin: "hóu zi", english: "monkey", audio: "猴子", imagePath: "assets/illustrated-animals/monkey.webp", imageAlt: "A monkey" },
      { id: "goldfish", hanzi: "金鱼", pinyin: "jīn yú", english: "goldfish", audio: "金鱼", imagePath: "assets/illustrated-animals/goldfish.webp", imageAlt: "A goldfish" },
      { id: "turtle", hanzi: "乌龟", pinyin: "wū guī", english: "turtle", audio: "乌龟", imagePath: "assets/illustrated-animals/turtle.webp", imageAlt: "A turtle" }
    ],
    foodStory: [
      { id: "dog-bone", animalHanzi: "狗", animalPinyin: "gǒu", animalEnglish: "dog", foodHanzi: "骨头", foodPinyin: "gǔ tou", foodEnglish: "bones", animalImagePath: "assets/illustrated-animals/dog.webp", animalImageAlt: "A dog", foodImagePath: "assets/illustrated-food/bones.webp", foodImageAlt: "Bones", hanzi: "狗吃骨头。", pinyin: "Gǒu chī gǔ tou.", english: "Dogs eat bones.", audio: "狗吃骨头" },
      { id: "cat-fish", animalHanzi: "猫", animalPinyin: "māo", animalEnglish: "cat", foodHanzi: "鱼", foodPinyin: "yú", foodEnglish: "fish", animalImagePath: "assets/illustrated-animals/cat.webp", animalImageAlt: "A cat", foodImagePath: "assets/illustrated-food/small-fish.webp", foodImageAlt: "Fish", hanzi: "猫吃鱼。", pinyin: "Māo chī yú.", english: "Cats eat fish.", audio: "猫吃鱼" },
      { id: "rabbit-carrot", animalHanzi: "小兔子", animalPinyin: "xiǎo tù zi", animalEnglish: "rabbit", foodHanzi: "胡萝卜", foodPinyin: "hú luó bo", foodEnglish: "carrot", animalImagePath: "assets/illustrated-animals/bunny.webp", animalImageAlt: "A rabbit", foodImagePath: "assets/illustrated-food/carrot.webp", foodImageAlt: "A carrot", hanzi: "小兔子吃胡萝卜。", pinyin: "Xiǎo tù zi chī hú luó bo.", english: "The little rabbit eats carrots.", audio: "小兔子吃胡萝卜" },
      { id: "panda-bamboo", animalHanzi: "熊猫", animalPinyin: "xióng māo", animalEnglish: "panda", foodHanzi: "竹子", foodPinyin: "zhú zi", foodEnglish: "bamboo", animalImagePath: "assets/illustrated-animals/panda.webp", animalImageAlt: "A panda", foodImagePath: "assets/illustrated-food/bamboo.webp", foodImageAlt: "Bamboo", hanzi: "熊猫吃竹子。", pinyin: "Xióng māo chī zhú zi.", english: "Pandas eat bamboo.", audio: "熊猫吃竹子" },
      { id: "monkey-banana", animalHanzi: "猴子", animalPinyin: "hóu zi", animalEnglish: "monkey", foodHanzi: "香蕉", foodPinyin: "xiāng jiāo", foodEnglish: "banana", animalImagePath: "assets/illustrated-animals/monkey.webp", animalImageAlt: "A monkey", foodImagePath: "assets/illustrated-food/banana.webp", foodImageAlt: "A banana", hanzi: "猴子吃香蕉。", pinyin: "Hóu zi chī xiāng jiāo.", english: "Monkeys eat bananas.", audio: "猴子吃香蕉" }
    ]
  }
};

export const animalsTopic = {
  id: "animals",
  title: "Zoo Animals",
  summary: "Count zoo animals and match animals with their food.",
  progressLabel: "2B",
  iconText: "动物园",
  iconColor: "#6f7fa4",
  ownsExplorerContent: true,
  focus: { hanzi: "老虎，大象", pinyin: "lǎo hǔ, dà xiàng", english: "tiger, elephant", audio: "老虎，大象" },
  focusItems: animalLessons["2b"].items,
  parentGuide: "Use zoo animals to practise the measure words 只, 头, and 条 in context.",
  cultureGuide: "Animals can later connect naturally to zodiac content and story-based culture lessons.",
  activities: ["Tap to hear", "Build a zoo sentence", "Match animal food"],
  steps: [
    { book: "2B", lesson: 5, title: "Animals", cardLabel: "Count zoo animals", note: "Count zoo animals with 只, 头, and 条." }
  ]
};

export const petsTopic = {
  id: "pets",
  title: "Pets",
  summary: "Meet familiar pets and say which ones you like.",
  progressLabel: "1B",
  iconText: "宠物",
  iconColor: "#8e6f9b",
  ownsExplorerContent: true,
  focus: { hanzi: "狗，猫", pinyin: "gǒu, māo", english: "dog, cat", audio: "狗，猫" },
  focusItems: animalLessons["1b"].items,
  parentGuide: "Name familiar pets, then use 我喜欢… to say which one you like.",
  cultureGuide: "Pets can later connect naturally to animal-care stories and everyday home life.",
  activities: ["Tap to hear", "Complete a pet sentence"],
  steps: [
    { book: "1B", lesson: 5, title: "Pets", cardLabel: "Name pets", note: "Name familiar pets and hear a simple preference sentence." }
  ]
};
