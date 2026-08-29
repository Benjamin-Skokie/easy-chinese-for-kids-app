export const colourLessons = {
  "1b": {
    title: "Colours",
    summary: "Name four everyday colours, then describe familiar fruit and animals.",
    items: [
      { id: "red", hanzi: "红色", pinyin: "hóng sè", english: "red", audio: "红色，红色的苹果", phraseAudio: "红色的苹果", imagePath: "assets/illustrated-colors/red-apple.webp", imageAlt: "A red apple", phrase: "红色的苹果", phrasePinyin: "hóng sè de píng guǒ", phraseEnglish: "a red apple" },
      { id: "yellow", hanzi: "黄色", pinyin: "huáng sè", english: "yellow", audio: "黄色，黄色的香蕉", phraseAudio: "黄色的香蕉", imagePath: "assets/illustrated-colors/yellow-banana.webp", imageAlt: "A yellow banana", phrase: "黄色的香蕉", phrasePinyin: "huáng sè de xiāng jiāo", phraseEnglish: "a yellow banana" },
      { id: "blue", hanzi: "蓝色", pinyin: "lán sè", english: "blue", audio: "蓝色，蓝色的书包", phraseAudio: "蓝色的书包", imagePath: "assets/illustrated-colors/blue-backpack.webp", imageAlt: "A blue backpack", phrase: "蓝色的书包", phrasePinyin: "lán sè de shū bāo", phraseEnglish: "a blue schoolbag" },
      { id: "green", hanzi: "绿色", pinyin: "lǜ sè", english: "green", audio: "绿色，绿色的黄瓜", phraseAudio: "绿色的黄瓜", imagePath: "assets/illustrated-colors/green-cucumber.webp", imageAlt: "A green cucumber", phrase: "绿色的黄瓜", phrasePinyin: "lǜ sè de huáng guā", phraseEnglish: "a green cucumber" }
    ]
  },
  "2a": {
    title: "Colours",
    summary: "The complete nine-colour set: 1B starts with four core colours; 2A adds five more for objects, animals, clothes, and body parts.",
    items: [
      { id: "purple", hanzi: "紫色", pinyin: "zǐ sè", english: "purple", audio: "紫色，紫色的葡萄", phraseAudio: "紫色的葡萄", imagePath: "assets/illustrated-colors/purple-grapes.webp", imageAlt: "Purple grapes", phrase: "紫色的葡萄", phrasePinyin: "zǐ sè de pú tao", phraseEnglish: "purple grapes" },
      { id: "orange", hanzi: "橙色", pinyin: "chéng sè", english: "orange", audio: "橙色，橙色的橘子", phraseAudio: "橙色的橘子", imagePath: "assets/illustrated-colors/orange-fruit.webp", imageAlt: "An orange fruit", phrase: "橙色的橘子", phrasePinyin: "chéng sè de jú zi", phraseEnglish: "an orange" },
      { id: "pink", hanzi: "粉红色", pinyin: "fěn hóng sè", english: "pink", audio: "粉红色，粉红色的花", phraseAudio: "粉红色的花", imagePath: "assets/illustrated-colors/pink-flower-white.webp", imageAlt: "A pink flower", phrase: "粉红色的花", phrasePinyin: "fěn hóng sè de huā", phraseEnglish: "a pink flower" },
      { id: "black", hanzi: "黑色", pinyin: "hēi sè", english: "black", audio: "黑色，黑色的鞋", phraseAudio: "黑色的鞋", imagePath: "assets/illustrated-colors/black-sneakers.webp", imageAlt: "Black sneakers", phrase: "黑色的鞋", phrasePinyin: "hēi sè de xié", phraseEnglish: "black shoes" },
      { id: "white", hanzi: "白色", pinyin: "bái sè", english: "white", audio: "白色，白色的狗", phraseAudio: "白色的狗", imagePath: "assets/illustrated-colors/white-dog.webp", imageAlt: "A white dog", phrase: "白色的狗", phrasePinyin: "bái sè de gǒu", phraseEnglish: "a white dog" },
      { id: "red", hanzi: "红色", pinyin: "hóng sè", english: "red", audio: "红色，红色的苹果", phraseAudio: "红色的苹果", imagePath: "assets/illustrated-colors/red-apple.webp", imageAlt: "A red apple", phrase: "红色的苹果", phrasePinyin: "hóng sè de píng guǒ", phraseEnglish: "a red apple" },
      { id: "yellow", hanzi: "黄色", pinyin: "huáng sè", english: "yellow", audio: "黄色，黄色的香蕉", phraseAudio: "黄色的香蕉", imagePath: "assets/illustrated-colors/yellow-banana.webp", imageAlt: "A yellow banana", phrase: "黄色的香蕉", phrasePinyin: "huáng sè de xiāng jiāo", phraseEnglish: "a yellow banana" },
      { id: "blue", hanzi: "蓝色", pinyin: "lán sè", english: "blue", audio: "蓝色，蓝色的书包", phraseAudio: "蓝色的书包", imagePath: "assets/illustrated-colors/blue-backpack.webp", imageAlt: "A blue backpack", phrase: "蓝色的书包", phrasePinyin: "lán sè de shū bāo", phraseEnglish: "a blue schoolbag" },
      { id: "green", hanzi: "绿色", pinyin: "lǜ sè", english: "green", audio: "绿色，绿色的黄瓜", phraseAudio: "绿色的黄瓜", imagePath: "assets/illustrated-colors/green-cucumber.webp", imageAlt: "A green cucumber", phrase: "绿色的黄瓜", phrasePinyin: "lǜ sè de huáng guā", phraseEnglish: "a green cucumber" }
    ]
  }
};

export const colourPreferenceFallbackAudioEntries = [
  { audio: "我喜欢", pinyin: "wǒ xǐ huan" },
  { audio: "我不喜欢", pinyin: "wǒ bù xǐ huan" }
];

export const coloursTopic = {
  id: "colours",
  ownsExplorerContent: true,
  title: "Colours",
  summary: "A repeated visual topic that can be practiced easily on phones and tablets.",
  progressLabel: "1B to 2A",
  iconText: "红蓝",
  iconColor: "#c36f62",
  focus: { hanzi: "红色，蓝色，黄色", pinyin: "hóng sè, lán sè, huáng sè", english: "red, blue, yellow", audio: "红色，蓝色，黄色" },
  focusItems: colourLessons["1b"].items,
  parentGuide: "Practice with crayons, clothes, fruit, or toys. The more real and visible the better.",
  cultureGuide: "Colour topics are a natural place to add small festival and clothing connections later.",
  activities: ["Tap to hear", "Find the colour and object", "Match picture and phrase", "Say what I like"],
  steps: [
    { book: "1B", lesson: 6, title: "Colours", cardLabel: "Name basic colours", note: "Start with common colour words." },
    { book: "2A", lesson: 7, title: "Colours", cardLabel: "Talk about colours you like", note: "Review and strengthen the same topic later." }
  ]
};
