export const identityTopic = {
  id: "identity",
  title: "Nationality",
  summary: "Ask and answer where someone is from.",
  progressLabel: "3A",
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
    { id: "ask-country", hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What nationality are you?", audio: "你是哪国人" },
    { id: "china", hanzi: "我是中国人。", pinyin: "wǒ shì Zhōng guó rén.", english: "I am Chinese.", audio: "我是中国人" },
    { id: "usa", hanzi: "我是美国人。", pinyin: "wǒ shì Měi guó rén.", english: "I am American.", audio: "我是美国人" },
    { id: "uk", hanzi: "我是英国人。", pinyin: "wǒ shì Yīng guó rén.", english: "I am British.", audio: "我是英国人" },
    { id: "germany", hanzi: "我是德国人。", pinyin: "wǒ shì Dé guó rén.", english: "I am German.", audio: "我是德国人" },
    { id: "france", hanzi: "我是法国人。", pinyin: "wǒ shì Fǎ guó rén.", english: "I am French.", audio: "我是法国人" },
    { id: "speak-language", hanzi: "我是中国人。我说汉语。", pinyin: "wǒ shì Zhōng guó rén. wǒ shuō Hànyǔ.", english: "I am Chinese. I speak Chinese.", audio: "我是中国人。我说汉语" }
  ],
  interactiveScene: "identity-scenes",
  parentGuide: "Look at Lele and Noah's family photos, then practise the question and answer together.",
  cultureGuide: "A flag can help introduce a country word, but it does not define what every person from that country looks like.",
  activities: ["Listen", "Book words", "Ask and answer"],
  steps: [
    { book: "3A", lesson: 5, title: "Nationality", note: "Ask and answer 你是哪国人？ / 我是…人。" }
  ]
};

export const languagesTopic = {
  id: "languages",
  title: "Languages",
  summary: "Say which language someone speaks.",
  progressLabel: "4A",
  iconText: "语言",
  iconColor: "#587d9c",
  iconAccent: "#e5bf70",
  iconTheme: "identity",
  focus: {
    hanzi: "我是中国人。我说汉语。",
    pinyin: "wǒ shì Zhōng guó rén. wǒ shuō Hànyǔ.",
    english: "I am Chinese. I speak Chinese.",
    audio: "我是中国人。我说汉语"
  },
  focusItems: [
    { id: "chinese", hanzi: "汉语", pinyin: "Hànyǔ", english: "Chinese", audio: "汉语" },
    { id: "english", hanzi: "英语", pinyin: "Yīngyǔ", english: "English", audio: "英语" },
    { id: "german", hanzi: "德语", pinyin: "Déyǔ", english: "German", audio: "德语" },
    { id: "french", hanzi: "法语", pinyin: "Fǎyǔ", english: "French", audio: "法语" },
    { id: "speak-language", hanzi: "我是中国人。我说汉语。", pinyin: "wǒ shì Zhōng guó rén. wǒ shuō Hànyǔ.", english: "I am Chinese. I speak Chinese.", audio: "我是中国人。我说汉语" }
  ],
  interactiveScene: "identity-scenes",
  parentGuide: "Read the scene together, then say the country-and-language sentence for each picture.",
  cultureGuide: "People can speak more than one language. A nationality and a language are useful words to learn, not labels for what every person is like.",
  activities: ["Listen", "Book words", "Say the sentence"],
  steps: [
    { book: "4A", lesson: 2, title: "Languages", note: "Say …人说…语 and 我是…人。我说…语。" }
  ]
};

export const identityCountries = [
  {
    id: "china", label: "China", hanzi: "中国", nationality: "中国人", pinyin: "Zhōng guó rén",
    language: { hanzi: "汉语", pinyin: "Hànyǔ", english: "Chinese" },
    asset: "assets/illustrated-flags/china.webp", focusItemId: "china",
    symbolAsset: "assets/illustrated-country-symbols/china.webp",
    symbolCaption: "The Great Wall is a well-known landmark in China.",
    response: { hanzi: "我是中国人。", pinyin: "wǒ shì Zhōng guó rén.", english: "I am Chinese.", audio: "我是中国人" }
  },
  {
    id: "usa", label: "United States", hanzi: "美国", nationality: "美国人", pinyin: "Měi guó rén",
    language: { hanzi: "英语", pinyin: "Yīngyǔ", english: "English" },
    asset: "assets/illustrated-flags/united-states.webp", focusItemId: "usa",
    symbolAsset: "assets/illustrated-country-symbols/united-states.webp",
    symbolCaption: "The Statue of Liberty is a well-known landmark in the United States.",
    response: { hanzi: "我是美国人。", pinyin: "wǒ shì Měi guó rén.", english: "I am American.", audio: "我是美国人" }
  },
  {
    id: "uk", label: "United Kingdom", hanzi: "英国", nationality: "英国人", pinyin: "Yīng guó rén",
    language: { hanzi: "英语", pinyin: "Yīngyǔ", english: "English" },
    asset: "assets/illustrated-flags/united-kingdom.webp", focusItemId: "uk",
    symbolAsset: "assets/illustrated-country-symbols/united-kingdom.webp",
    symbolCaption: "Big Ben is a well-known landmark in the United Kingdom.",
    response: { hanzi: "我是英国人。", pinyin: "wǒ shì Yīng guó rén.", english: "I am British.", audio: "我是英国人" }
  },
  {
    id: "germany", label: "Germany", hanzi: "德国", nationality: "德国人", pinyin: "Dé guó rén",
    language: { hanzi: "德语", pinyin: "Déyǔ", english: "German" },
    asset: "assets/illustrated-flags/germany.webp", focusItemId: "germany",
    symbolAsset: "assets/illustrated-country-symbols/germany.webp",
    symbolCaption: "The Brandenburg Gate is a well-known landmark in Germany.",
    response: { hanzi: "我是德国人。", pinyin: "wǒ shì Dé guó rén.", english: "I am German.", audio: "我是德国人" }
  },
  {
    id: "france", label: "France", hanzi: "法国", nationality: "法国人", pinyin: "Fǎ guó rén",
    language: { hanzi: "法语", pinyin: "Fǎyǔ", english: "French" },
    asset: "assets/illustrated-flags/france.webp", focusItemId: "france",
    symbolAsset: "assets/illustrated-country-symbols/france.webp",
    symbolCaption: "The Eiffel Tower is a well-known landmark in France.",
    response: { hanzi: "我是法国人。", pinyin: "wǒ shì Fǎ guó rén.", english: "I am French.", audio: "我是法国人" }
  }
];

export const identityExploreCountries = [
  {
    id: "canada", label: "Canada", hanzi: "加拿大", nationality: "加拿大人", pinyin: "Jiā ná dà rén",
    asset: "assets/illustrated-flags/canada.webp", symbolAsset: "assets/illustrated-country-symbols/canada.webp",
    symbolCaption: "Hockey is a popular sport in Canada.",
    response: { hanzi: "我是加拿大人。", pinyin: "wǒ shì Jiā ná dà rén.", english: "I am Canadian.", audio: "我是加拿大人" }
  },
  {
    id: "mexico", label: "Mexico", hanzi: "墨西哥", nationality: "墨西哥人", pinyin: "Mò xī gē rén",
    asset: "assets/illustrated-flags/mexico.webp", symbolAsset: "assets/illustrated-country-symbols/mexico.webp",
    symbolCaption: "Chichén Itzá is an ancient city in Mexico.",
    response: { hanzi: "我是墨西哥人。", pinyin: "wǒ shì Mò xī gē rén.", english: "I am Mexican.", audio: "我是墨西哥人" }
  },
  {
    id: "australia", label: "Australia", hanzi: "澳大利亚", nationality: "澳大利亚人", pinyin: "Ào dà lì yà rén",
    asset: "assets/illustrated-flags/australia.webp", symbolAsset: "assets/illustrated-country-symbols/australia.webp",
    symbolCaption: "Kangaroos live in Australia.",
    response: { hanzi: "我是澳大利亚人。", pinyin: "wǒ shì Ào dà lì yà rén.", english: "I am Australian.", audio: "我是澳大利亚人" }
  }
];

export const identityQuestion = {
  hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What nationality are you?", audio: "你是哪国人"
};

export const identityLanguageQuestion = {
  hanzi: "说一说。", pinyin: "shuō yi shuō.", english: "Say a sentence.", audio: "说一说"
};

export const identityConversation = {
  imagePath: "assets/illustrated-identity/classmates-speak-different-languages.webp",
  imageAlt: "Two classmates talking about the languages they speak",
  lines: [
    { hanzi: "我是中国人。我说汉语。", pinyin: "wǒ shì Zhōng guó rén. wǒ shuō Hànyǔ.", english: "I am Chinese. I speak Chinese.", audio: "我是中国人。我说汉语" },
    { hanzi: "我是美国人。我说英语。", pinyin: "wǒ shì Měi guó rén. wǒ shuō Yīngyǔ.", english: "I am American. I speak English.", audio: "我是美国人。我说英语" }
  ]
};

export const nationalityConversation = {
  imagePath: "assets/introductions/introductions-scene-4.webp",
  imageAlt: "Lele and Noah hold family photos and talk together at school",
  lines: [
    { hanzi: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?", english: "What nationality are you?", audio: "你是哪国人" },
    { hanzi: "我是中国人。", pinyin: "wǒ shì Zhōng guó rén.", english: "I am Chinese.", audio: "我是中国人" },
    { hanzi: "我是美国人。", pinyin: "wǒ shì Měi guó rén.", english: "I am American.", audio: "我是美国人" }
  ]
};
