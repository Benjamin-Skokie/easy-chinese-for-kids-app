export const clothesBookWords = [
  { id: "shirt", hanzi: "T恤", pinyin: "T xù", english: "T-shirt", audio: "T恤", imagePath: "assets/illustrated-everyday-life/clothes.webp" },
  { id: "pants", hanzi: "裤子", pinyin: "kù zi", english: "trousers; pants", audio: "裤子", imagePath: "assets/illustrated-everyday-life/pants.webp" },
  { id: "dress", hanzi: "裙子", pinyin: "qún zi", english: "dress; skirt", audio: "裙子", imagePath: "assets/illustrated-everyday-life/skirt.webp" },
  { id: "shoes", hanzi: "鞋子", pinyin: "xié zi", english: "shoes", audio: "鞋子", imagePath: "assets/illustrated-everyday-life/shoes.webp" },
  { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "hat", audio: "帽子", imagePath: "assets/illustrated-everyday-life/hat.webp" },
  { id: "jacket", hanzi: "外套", pinyin: "wài tào", english: "jacket; coat", audio: "外套", imagePath: "assets/illustrated-everyday-life/jacket.webp" },
  { id: "gloves", hanzi: "手套", pinyin: "shǒu tào", english: "gloves", audio: "手套", imagePath: "assets/illustrated-everyday-life/gloves.webp" },
  { id: "school-uniform", hanzi: "校服", pinyin: "xiào fú", english: "school uniform", audio: "校服", imagePath: "assets/illustrated-everyday-life/school-uniform.webp" }
];

export const clothesTopic = {
  id: "clothes",
  title: "Clothes",
  summary: "A concrete everyday topic that can grow from basic words into dressing and weather use.",
  progressLabel: "2A to 4B",
  iconText: "衣服",
  iconColor: "#9c7b4f",
  ownsExplorerContent: true,
  focus: { hanzi: "我会穿衣服。", pinyin: "wǒ huì chuān yī fu.", english: "I can get dressed.", audio: "我会穿衣服" },
  focusItems: clothesBookWords,
  interactiveScene: "clothes-scenes",
  parentGuide: "Use getting dressed as the practice moment. Repeating the words during a real routine makes them stick.",
  cultureGuide: "Clothes can later connect to colours, weather, and festival dress without needing a lot of extra explanation.",
  activities: ["Tap to hear", "Match the clothing", "Dress for the weather", "Listen and choose"],
  steps: [
    { book: "2A", lesson: 6, title: "I can dress myself", note: "Start with dressing language." },
    { book: "3A", lesson: 7, title: "Clothes", note: "Build a fuller clothing set." },
    { book: "4B", lesson: 2, title: "Clothes", note: "Reconnect clothing with weather and daily life." }
  ]
};

export const clothesPractice = [
  { id: "clothes-scene-1", title: "Getting dressed", imagePath: "assets/illustrated-clothes/wearing-clothes-scene.webp", imageAlt: "A child putting on a jacket beside a clothes rack and mirror", lines: [{ hanzi: "我会穿衣服。", pinyin: "wǒ huì chuān yī fu.", english: "I can get dressed.", audio: "我会穿衣服" }, { hanzi: "我穿外套。", pinyin: "wǒ chuān wài tào.", english: "I wear a jacket.", audio: "我穿外套" }] },
  { id: "clothes-scene-2", title: "Rainy day clothes", imagePath: "assets/illustrated-clothes/weather-linked-clothing-scene.webp", imageAlt: "A child choosing a raincoat by a rainy window", lines: [{ hanzi: "下雨了。", pinyin: "xià yǔ le.", english: "It is raining.", audio: "下雨了" }, { hanzi: "我穿雨衣和雨鞋。", pinyin: "wǒ chuān yǔ yī hé yǔ xié.", english: "I wear a raincoat and rain boots.", audio: "我穿雨衣和雨鞋" }] }
];

// The quiz deliberately reuses the isolated Book Words icons.  Action images belong
// to the separate self-dressing sentence lesson, not a single-word recognition game.
export const clothesMatchItems = clothesBookWords;

export const clothesSentenceItems = [
  { id: "shoes", hanzi: "鞋子", pinyin: "xié zi", english: "shoes", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿鞋子", imagePath: "assets/illustrated-self-dressing/putting-on-shoes.webp", imageAlt: "A child putting on shoes" },
  { id: "socks", hanzi: "袜子", pinyin: "wà zi", english: "socks", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿袜子", imagePath: "assets/illustrated-self-dressing/putting-on-socks.webp", imageAlt: "A child putting on socks" },
  { id: "jacket", hanzi: "外套", pinyin: "wài tào", english: "a jacket", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿外套", imagePath: "assets/illustrated-self-dressing/putting-on-jacket.webp", imageAlt: "A child putting on a jacket" },
  { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "a hat", frame: "我戴", framePinyin: "wǒ dài", audio: "我戴帽子", imagePath: "assets/illustrated-self-dressing/putting-on-hat.webp", imageAlt: "A child putting on a hat" },
  { id: "school-uniform", hanzi: "校服", pinyin: "xiào fú", english: "a school uniform", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿校服", imagePath: "assets/illustrated-self-dressing/putting-on-school-uniform.webp", imageAlt: "A child putting on a school uniform" }
];
