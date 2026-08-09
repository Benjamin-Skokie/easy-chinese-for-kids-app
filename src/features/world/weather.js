export const weatherLesson = {
  title: "It's Raining",
  summary: "Describe today’s weather, then connect it to how you feel and what you wear.",
  items: [
    { id: "rain", hanzi: "下雨了", pinyin: "xià yǔ le", english: "It is raining.", audio: "下雨了", imagePath: "assets/illustrated-weather/rainy-umbrella.webp", imageAlt: "A child under an umbrella in the rain" },
    { id: "snow", hanzi: "下雪了", pinyin: "xià xuě le", english: "It is snowing.", audio: "下雪了", imagePath: "assets/illustrated-weather/snowy-cold.webp", imageAlt: "A snowy winter scene" },
    { id: "sunny", hanzi: "今天是晴天", pinyin: "jīn tiān shì qíng tiān", english: "Today is sunny.", audio: "今天是晴天", imagePath: "assets/illustrated-weather/sunny-hot.webp", imageAlt: "A bright sunny day" },
    { id: "cold", hanzi: "今天很冷", pinyin: "jīn tiān hěn lěng", english: "Today is very cold.", audio: "今天很冷", imagePath: "assets/illustrated-weather/snowy-cold.webp", imageAlt: "A snowy winter scene" },
    { id: "hot", hanzi: "今天很热", pinyin: "jīn tiān hěn rè", english: "Today is very hot.", audio: "今天很热", imagePath: "assets/illustrated-weather/sunny-hot.webp", imageAlt: "A bright sunny day" },
    { id: "windy", hanzi: "今天刮大风", pinyin: "jīn tiān guā dà fēng", english: "It is very windy today.", audio: "今天刮大风", imagePath: "assets/illustrated-weather/windy-leaves.webp", imageAlt: "Leaves blowing on a windy day" }
  ]
};

export const natureLesson = {
  title: "Nature",
  summary: "Describe what is in the sky and on the ground using 天上有… and 地上有….",
  imagePath: "assets/illustrated-nature/day-night-nature.webp",
  imageAlt: "A day and night nature scene with sun, moon, stars, trees, flowers, and grass",
  items: [
    { id: "sky", hanzi: "天上", pinyin: "tiān shàng", english: "in the sky", audio: "天上" },
    { id: "sun", hanzi: "太阳", pinyin: "tài yáng", english: "sun", audio: "太阳" },
    { id: "star", hanzi: "星星", pinyin: "xīng xing", english: "star", audio: "星星" },
    { id: "moon", hanzi: "月亮", pinyin: "yuè liang", english: "moon", audio: "月亮" },
    { id: "ground", hanzi: "地上", pinyin: "dì shàng", english: "on the ground", audio: "地上" },
    { id: "tree", hanzi: "树", pinyin: "shù", english: "tree", audio: "树" },
    { id: "flower", hanzi: "花", pinyin: "huā", english: "flower", audio: "花" },
    { id: "grass", hanzi: "草", pinyin: "cǎo", english: "grass", audio: "草" }
  ],
  sentences: [
    { hanzi: "天上有太阳。", pinyin: "tiān shàng yǒu tài yáng.", english: "There is a sun in the sky.", audio: "天上有太阳" },
    { hanzi: "天上有星星。", pinyin: "tiān shàng yǒu xīng xing.", english: "There are stars in the sky.", audio: "天上有星星" },
    { hanzi: "天上有月亮。", pinyin: "tiān shàng yǒu yuè liang.", english: "There is a moon in the sky.", audio: "天上有月亮" },
    { hanzi: "地上有树。", pinyin: "dì shàng yǒu shù.", english: "There is a tree on the ground.", audio: "地上有树" },
    { hanzi: "地上有花。", pinyin: "dì shàng yǒu huā.", english: "There are flowers on the ground.", audio: "地上有花" },
    { hanzi: "地上有草。", pinyin: "dì shàng yǒu cǎo.", english: "There is grass on the ground.", audio: "地上有草" },
    { hanzi: "天上有太阳、星星和月亮。", pinyin: "tiān shàng yǒu tài yáng, xīng xing hé yuè liang.", english: "There are a sun, stars, and a moon in the sky.", audio: "天上有太阳星星和月亮" },
    { hanzi: "地上有绿树、红花和小草。", pinyin: "dì shàng yǒu lǜ shù, hóng huā hé xiǎo cǎo.", english: "There are green trees, red flowers, and small grass on the ground.", audio: "地上有绿树红花和小草" }
  ]
};

export const weatherTopic = {
  id: "weather",
  title: "Weather",
  summary: "Use concrete daily weather phrases for rain, snow, sun, wind, heat, and cold.",
  progressLabel: "4B Lesson 1",
  iconText: "下雨",
  iconColor: "#6f7fa4",
  focus: { hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" },
  parentGuide: "This is best as a daily one-minute habit. Check the weather together and say the phrase before leaving home.",
  cultureGuide: "Weather combines nicely with clothing and seasonal culture content later.",
  activities: ["Tap to hear", "Describe the scene", "Choose today's weather", "Dress for the weather"],
  steps: [{ book: "4B", lesson: 1, title: "It's raining", note: "Use concrete daily weather phrases." }]
};

export const natureTopic = {
  id: "nature",
  title: "Nature",
  summary: "Look up and down: describe what is in the sky and on the ground.",
  progressLabel: "3B Lesson 7",
  iconText: "天地",
  iconColor: "#6e9872",
  focus: { hanzi: "天上有太阳。", pinyin: "tiān shàng yǒu tài yáng.", english: "There is a sun in the sky.", audio: "天上有太阳" },
  parentGuide: "Point outside, or use the scene: ask what is in the sky and what is on the ground before saying the full sentence together.",
  cultureGuide: "This lesson carries colour naturally into meaningful descriptions: 绿树、红花和小草。",
  activities: ["Tap to hear", "Look up and down", "Describe the scene", "Say the full sentence"],
  steps: [{ book: "3B", lesson: 7, title: "Nature", note: "Describe what is in the sky and on the ground." }]
};
