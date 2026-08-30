export const weatherLesson = {
  title: "It's Raining",
  summary: "Describe today’s weather, then connect it to how you feel and what you wear.",
  scenes: [
    { id: "rain", title: "Rainy day", imagePath: "assets/illustrated-weather/rainy-umbrella.webp", imageAlt: "A child under an umbrella in the rain", lines: [{ hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" }] },
    { id: "snow", title: "Snowy day", imagePath: "assets/illustrated-weather/snowy-cold.webp", imageAlt: "A snowy winter scene", lines: [{ hanzi: "下雪了。今天很冷。", pinyin: "xià xuě le. jīn tiān hěn lěng.", english: "It is snowing. Today is very cold.", audio: "下雪了，今天很冷" }] },
    { id: "sunny", title: "Sunny day", imagePath: "assets/illustrated-weather/sunny-hot.webp", imageAlt: "A bright sunny day", lines: [{ hanzi: "今天是晴天。今天很热。", pinyin: "jīn tiān shì qíng tiān. jīn tiān hěn rè.", english: "Today is sunny. Today is very hot.", audio: "今天是晴天，今天很热" }] },
    { id: "windy", title: "Windy day", imagePath: "assets/illustrated-weather/windy-leaves.webp", imageAlt: "Leaves blowing on a windy day", lines: [{ hanzi: "今天刮大风。", pinyin: "jīn tiān guā dà fēng.", english: "It is very windy today.", audio: "今天刮大风" }] }
  ],
  items: [
    { id: "rain", hanzi: "下雨了", pinyin: "xià yǔ le", english: "It is raining.", audio: "下雨了", imagePath: "assets/illustrated-weather/rainy-umbrella.webp", imageAlt: "A child under an umbrella in the rain" },
    { id: "snow", hanzi: "下雪了", pinyin: "xià xuě le", english: "It is snowing.", audio: "下雪了", imagePath: "assets/illustrated-weather/snowy-cold.webp", imageAlt: "A snowy winter scene" },
    { id: "sunny", hanzi: "今天是晴天", pinyin: "jīn tiān shì qíng tiān", english: "Today is sunny.", audio: "今天是晴天", imagePath: "assets/illustrated-weather/sunny-hot.webp", imageAlt: "A bright sunny day" },
    { id: "cold", hanzi: "今天很冷", pinyin: "jīn tiān hěn lěng", english: "Today is very cold.", audio: "今天很冷", imagePath: "assets/illustrated-weather/snowy-cold.webp", imageAlt: "A snowy winter scene" },
    { id: "hot", hanzi: "今天很热", pinyin: "jīn tiān hěn rè", english: "Today is very hot.", audio: "今天很热", imagePath: "assets/illustrated-weather/sunny-hot.webp", imageAlt: "A bright sunny day" },
    { id: "windy", hanzi: "今天刮大风", pinyin: "jīn tiān guā dà fēng", english: "It is very windy today.", audio: "今天刮大风", imagePath: "assets/illustrated-weather/windy-leaves.webp", imageAlt: "Leaves blowing on a windy day" }
  ]
};

// Book 4B Lesson 1 ends by connecting today's weather to what a child wears.
// These application scenes keep that bridge on the Weather page; Lesson 2 stays
// focused on naming and describing clothes themselves.
export const weatherOutfitScenes = [
  { id: "rainy-outfit", title: "Rainy day", imagePath: "assets/illustrated-clothes/weather-outfits/rainy-lele.webp", imageAlt: "Lele wearing a yellow raincoat and rain boots in the rain", lines: [{ hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" }, { hanzi: "乐乐穿雨衣和雨鞋。", pinyin: "lè le chuān yǔ yī hé yǔ xié.", english: "Lele wears a raincoat and rain boots.", audio: "乐乐穿雨衣和雨鞋" }] },
  { id: "sunny-outfit", title: "Sunny day", imagePath: "assets/illustrated-clothes/weather-outfits/sunny-luna.webp", imageAlt: "Luna wearing a T-shirt and shorts on a sunny day", lines: [{ hanzi: "今天是晴天，天气很热。", pinyin: "jīn tiān shì qíng tiān, tiān qì hěn rè.", english: "Today is sunny and hot.", audio: "今天是晴天天气很热" }, { hanzi: "露娜穿T恤和短裤。", pinyin: "lù nà chuān T xù hé duǎn kù.", english: "Luna wears a T-shirt and shorts.", audio: "露娜穿T恤和短裤" }] },
  { id: "snowy-outfit", title: "Snowy day", imagePath: "assets/illustrated-clothes/weather-outfits/snowy-noah-winter-gear.webp", imageAlt: "Noah wearing a coat, hat, scarf, and gloves in the snow", lines: [{ hanzi: "下雪了，天气很冷。", pinyin: "xià xuě le, tiān qì hěn lěng.", english: "It is snowing and cold.", audio: "下雪了天气很冷" }, { hanzi: "诺亚穿外套，戴帽子、围巾和手套。", pinyin: "nuò yà chuān wài tào, dài mào zi, wéi jīn hé shǒu tào.", english: "Noah wears a coat, hat, scarf, and gloves.", audio: "诺亚穿外套戴帽子围巾和手套" }] },
  { id: "windy-outfit", title: "Windy day", imagePath: "assets/illustrated-clothes/weather-outfits/windy-sophie.webp", imageAlt: "Sophie wearing a coat, long pants, and knit hat on a windy day", lines: [{ hanzi: "今天刮大风。", pinyin: "jīn tiān guā dà fēng.", english: "It is very windy today.", audio: "今天刮大风" }, { hanzi: "苏菲穿长裤和大衣，戴帽子。", pinyin: "sū fēi chuān cháng kù hé dà yī, dài mào zi.", english: "Sophie wears long pants and a coat, with a hat.", audio: "苏菲穿长裤和大衣戴帽子" }] }
];

export const natureLesson = {
  title: "Nature",
  summary: "Describe what is in the sky and on the ground using 天上有… and 地上有….",
  imagePath: "assets/illustrated-nature/day-night-nature.webp",
  usefulNote: {
    hanzi: "抬头看天上，低头看地上。",
    pinyin: "tái tóu kàn tiān shàng, dī tóu kàn dì shàng.",
    english: "Look up for the sky; look down for the ground."
  },
  scenes: [
    {
      id: "look-up",
      title: "Daytime",
      imagePath: "assets/illustrated-nature/daytime-nature.webp",
      imageAlt: "The sun high in a bright daytime sky above trees, small red flowers, and grass",
      lines: [
        { hanzi: "天上有太阳。", pinyin: "tiān shàng yǒu tài yáng.", english: "There is a sun in the sky.", audio: "天上有太阳" },
        { hanzi: "地上有树、花和草。", pinyin: "dì shàng yǒu shù, huā hé cǎo.", english: "There are trees, flowers, and grass on the ground.", audio: "地上有树花和草" }
      ]
    },
    {
      id: "look-down",
      title: "Nighttime",
      imagePath: "assets/illustrated-nature/nighttime-nature.webp",
      imageAlt: "The moon and stars high in a night sky above trees and grass",
      lines: [
        { hanzi: "天上有星星。", pinyin: "tiān shàng yǒu xīng xing.", english: "There are stars in the sky.", audio: "天上有星星" },
        { hanzi: "天上有月亮。", pinyin: "tiān shàng yǒu yuè liang.", english: "There is a moon in the sky.", audio: "天上有月亮" }
      ]
    }
  ],
  items: [
    { id: "daytime", hanzi: "白天", pinyin: "bái tiān", english: "daytime", audio: "白天" },
    { id: "nighttime", hanzi: "晚上", pinyin: "wǎn shang", english: "nighttime", audio: "晚上" },
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
    { hanzi: "地上有树、花和草。", pinyin: "dì shàng yǒu shù, huā hé cǎo.", english: "There are trees, flowers, and grass on the ground.", audio: "地上有树花和草" }
  ]
};

export const weatherTopic = {
  id: "weather",
  ownsExplorerContent: true,
  title: "Weather",
  summary: "Use concrete daily weather phrases for rain, snow, sun, wind, heat, and cold.",
  progressLabel: "4B Lesson 1",
  iconText: "下雨",
  iconColor: "#6f7fa4",
  focus: { hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" },
  parentGuide: "This is best as a daily one-minute habit. Check the weather together and say the phrase before leaving home.",
  cultureGuide: "Weather combines nicely with clothing and seasonal culture content later.",
  activities: ["Tap to hear", "Describe the scene", "Choose today's weather", "Dress for the weather"],
  steps: [{ book: "4B", lesson: 1, title: "It's raining", cardLabel: "Talk about rainy weather", note: "Use concrete daily weather phrases." }]
};

export const natureTopic = {
  id: "nature",
  ownsExplorerContent: true,
  title: "Nature",
  summary: "Look up and down: describe what is in the sky and on the ground.",
  progressLabel: "3B Lesson 7",
  iconText: "天地",
  iconColor: "#6e9872",
  focus: { hanzi: "天上有太阳。", pinyin: "tiān shàng yǒu tài yáng.", english: "There is a sun in the sky.", audio: "天上有太阳" },
  parentGuide: "Point outside, or use the scene: ask what is in the sky and what is on the ground before saying the full sentence together.",
  cultureGuide: "Keep the focus on the sky-and-ground sentence pattern; colour is not a target of this lesson.",
  activities: ["Tap to hear", "Look up and down", "Describe the scene", "Say the full sentence"],
  steps: [{ book: "3B", lesson: 7, title: "Nature", cardLabel: "Talk about nature", note: "Describe what is in the sky and on the ground." }]
};
