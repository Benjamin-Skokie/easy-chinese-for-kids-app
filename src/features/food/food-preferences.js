export const foodPreferencesTopic = {
    id: "food-preferences",
    title: "Food Preferences",
    summary: "Ask what someone likes to eat and say what you like or do not like.",
    progressLabel: "3B Lesson 5",
    iconText: "喜欢",
    iconColor: "#c48d46",
    focus: { hanzi: "你喜欢吃什么？", pinyin: "nǐ xǐ huan chī shén me?", english: "What do you like to eat?", audio: "你喜欢吃什么" },
    interactiveScene: "food-preferences",
    parentGuide: "Ask 你喜欢吃什么？, then let your child answer with one food they like or do not like.",
    cultureGuide: "喜欢吃 and 不喜欢吃 make it easy to share a real preference at a meal or snack time.",
    activities: ["Play scenes", "Say a preference", "Listen and choose", "Build a sentence"],
    steps: [{ book: "3B", lesson: 5, title: "Food and drink", cardLabel: "Talk about food you like", note: "Talk about foods and drinks you like." }]
  };

export const foodPreferencesTopicData = {
    practiceSummary: "Make your own sentences about foods you like and do not like.",
    scenes: [
      {
        id: "food-preferences-dialogue",
        label: "Food talk",
        hanzi: "我喜欢吃冰淇淋。你喜欢吃什么？",
        pinyin: "wǒ xǐ huan chī bīng qí lín. nǐ xǐ huan chī shén me?",
        english: "I like to eat ice cream. What do you like to eat?",
        audio: "我喜欢吃冰淇淋你喜欢吃什么",
        imagePath: "assets/illustrated-snacks/food-preferences-dialogue.webp"
      },
      {
        id: "like-pizza",
        label: "I like",
        hanzi: "我喜欢吃披萨。",
        pinyin: "wǒ xǐ huan chī pī sà.",
        english: "I like to eat pizza.",
        audio: "我喜欢吃披萨",
        imagePath: "assets/illustrated-food-feelings/like-pizza.webp"
      },
      {
        id: "dislike-broccoli",
        label: "I do not like",
        hanzi: "我不喜欢吃西兰花。",
        pinyin: "wǒ bù xǐ huan chī xī lán huā.",
        english: "I do not like to eat broccoli.",
        audio: "我不喜欢吃西兰花",
        imagePath: "assets/illustrated-food-feelings/dislike-broccoli.webp"
      },
      {
        id: "parents-food-preferences",
        label: "Family preferences",
        hanzi: "妈妈喜欢吃饺子。爸爸不喜欢吃饺子。",
        pinyin: "mā ma xǐ huan chī jiǎo zi. bà ba bù xǐ huan chī jiǎo zi.",
        english: "Mom likes to eat dumplings. Dad does not like to eat dumplings.",
        audio: "妈妈喜欢吃饺子爸爸不喜欢吃饺子",
        imagePath: "assets/illustrated-snacks/parents-food-preferences.webp"
      }
    ],
    words: [
      ["ice-cream", "冰淇淋", "bīng qí lín", "ice cream", "ice-cream.webp"],
      ["pizza", "披萨", "pī sà", "pizza", "pizza.webp"],
      ["broccoli", "西兰花", "xī lán huā", "broccoli", "broccoli.webp"],
      ["dumplings", "饺子", "jiǎo zi", "dumplings", "dumplings.webp"],
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-food/${file}` })),
    review: [
      { pattern: "你喜欢吃什么？", pinyin: "nǐ xǐ huan chī shén me?", english: "What do you like to eat?", example: "Use this question to ask about a favorite food." },
      { pattern: "喜欢吃 / 不喜欢吃", pinyin: "xǐ huan chī / bù xǐ huan chī", english: "like to eat / do not like to eat", example: "我喜欢吃披萨。我不喜欢吃西兰花。" }
    ]
};
