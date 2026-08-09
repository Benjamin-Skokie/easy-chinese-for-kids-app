export const identityTopic = {
  id: "identity",
  title: "Countries & Languages",
  summary: "Say where someone is from and the languages they can speak.",
  progressLabel: "3A to 4A",
  iconText: "中国",
  iconColor: "#587d9c",
  iconAccent: "#e5bf70",
  iconTheme: "identity",
  focus: {
    hanzi: "我是中国人。",
    pinyin: "wǒ shì Zhōng guó rén.",
    english: "I am Chinese.",
    audio: "我是中国人"
  },
  focusItems: [
    { id: "ask-country", hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What country are you from?", audio: "你是哪国人" },
    { id: "china", hanzi: "我是中国人。", pinyin: "wǒ shì Zhōng guó rén.", english: "I am Chinese.", audio: "我是中国人" },
    { id: "usa", hanzi: "我是美国人。", pinyin: "wǒ shì Měi guó rén.", english: "I am American.", audio: "我是美国人" },
    { id: "uk", hanzi: "我是英国人。", pinyin: "wǒ shì Yīng guó rén.", english: "I am British.", audio: "我是英国人" },
    { id: "ask-language", hanzi: "你会说汉语吗？", pinyin: "nǐ huì shuō Hànyǔ ma?", english: "Can you speak Chinese?", audio: "你会说汉语吗" },
    { id: "speak-chinese", hanzi: "我会说汉语。", pinyin: "wǒ huì shuō Hànyǔ.", english: "I can speak Chinese.", audio: "我会说汉语" },
    { id: "speak-english", hanzi: "我会说英语。", pinyin: "wǒ huì shuō Yīngyǔ.", english: "I can speak English.", audio: "我会说英语" }
  ],
  interactiveScene: "identity-scenes",
  parentGuide: "Use the child's real country and languages. Start with one short answer, then switch the country or language together.",
  cultureGuide: "Country and language words work best as respectful descriptions of people, not as labels for how anyone should look or act.",
  activities: ["Tap to hear", "Meet classmates", "Match country and flag", "Say what I speak"],
  steps: [
    { book: "3A", lesson: 5, title: "Nationality", note: "Ask and say where someone is from." },
    { book: "4A", lesson: 2, title: "Languages", note: "Say which languages someone can speak." }
  ]
};

export const identityCountries = [
  {
    id: "china",
    label: "China",
    hanzi: "中国",
    nationality: "中国人",
    pinyin: "Zhōng guó rén",
    asset: "assets/illustrated-flags/china.webp",
    focusItemId: "china",
    response: { hanzi: "我是中国人，我会说汉语。", pinyin: "wǒ shì Zhōng guó rén, wǒ huì shuō Hànyǔ.", english: "I am Chinese. I can speak Chinese.", audio: "我是中国人，我会说汉语" }
  },
  {
    id: "usa",
    label: "United States",
    hanzi: "美国",
    nationality: "美国人",
    pinyin: "Měi guó rén",
    asset: "assets/illustrated-flags/united-states.webp",
    focusItemId: "usa",
    response: { hanzi: "我是美国人，我会说英语。", pinyin: "wǒ shì Měi guó rén, wǒ huì shuō Yīngyǔ.", english: "I am American. I can speak English.", audio: "我是美国人，我会说英语" }
  },
  {
    id: "uk",
    label: "United Kingdom",
    hanzi: "英国",
    nationality: "英国人",
    pinyin: "Yīng guó rén",
    asset: "assets/illustrated-flags/united-kingdom.webp",
    focusItemId: "uk",
    response: { hanzi: "我是英国人，我会说英语。", pinyin: "wǒ shì Yīng guó rén, wǒ huì shuō Yīngyǔ.", english: "I am British. I can speak English.", audio: "我是英国人，我会说英语" }
  }
];

export const identityQuestion = {
  hanzi: "你是哪国人？",
  pinyin: "nǐ shì nǎ guó rén?",
  english: "What country are you from?",
  audio: "你是哪国人"
};

export const identityConversation = {
  imagePath: "assets/illustrated-identity/classmates-speak-different-languages.webp",
  imageAlt: "Two classmates talking about where they are from and the languages they speak",
  lines: [
    { hanzi: "我是中国人，我会说汉语。", pinyin: "wǒ shì Zhōng guó rén, wǒ huì shuō Hànyǔ.", english: "I am Chinese. I can speak Chinese.", audio: "我是中国人，我会说汉语" },
    { hanzi: "我是美国人，我会说英语。", pinyin: "wǒ shì Měi guó rén, wǒ huì shuō Yīngyǔ.", english: "I am American. I can speak English.", audio: "我是美国人，我会说英语" }
  ]
};
