export const telephoneNumbersTopic = {
  id: "telephone-numbers",
  title: "My Family 2",
  summary: "Introduce your grandparents, say where they live, and share a made-up family telephone number.",
  progressLabel: "4A Lesson 1",
  iconText: "电话",
  iconColor: "#6c8c7f",
  iconAccent: "#d7e4ba",
  iconTheme: "telephone",
  ownsExplorerContent: true,
  interactiveScene: "telephone-numbers",
  focus: { hanzi: "他们住在北京。", pinyin: "tā men zhù zài Běi jīng.", english: "They live in Beijing.", audio: "他们住在北京" },
  focusItems: [
    { id: "live", hanzi: "住", pinyin: "zhù", english: "live", audio: "住" },
    { id: "where", hanzi: "哪儿", pinyin: "nǎr", english: "where", audio: "哪儿" },
    { id: "they", hanzi: "他们", pinyin: "tā men", english: "they", audio: "他们" },
    { id: "beijing", hanzi: "北京", pinyin: "Běi jīng", english: "Beijing", audio: "北京" },
    { id: "telephone-number", hanzi: "电话号码", pinyin: "diàn huà hào mǎ", english: "telephone number", audio: "电话号码" },
    { id: "how-many", hanzi: "多少", pinyin: "duō shao", english: "how many", audio: "多少" }
  ],
  parentGuide: "Use a made-up telephone number only. This lesson practises the language pattern, not sharing personal contact details.",
  cultureGuide: "This later family lesson extends an introduction with where grandparents live and a made-up family telephone number.",
  activities: ["Scene", "Book words", "Useful note", "Practice"],
  steps: [{ book: "4A", lesson: 1, title: "Telephone numbers", cardLabel: "Say where family lives", note: "Ask where family lives and exchange a telephone number." }]
};

export const telephonePractice = {
  residence: {
    title: "Living in Beijing",
    imagePath: "assets/illustrated-telephone/grandparents-live-in-beijing.webp",
    imageAlt: "Grandpa and Grandma walking together in a Beijing park",
    lines: [
      { hanzi: "你爷爷、奶奶住在哪儿？", pinyin: "nǐ yé ye, nǎi nai zhù zài nǎr?", english: "Where do your grandpa and grandma live?", audio: "你爷爷奶奶住在哪儿" },
      { hanzi: "他们住在北京。", pinyin: "tā men zhù zài Běi jīng.", english: "They live in Beijing.", audio: "他们住在北京" }
    ]
  },
  telephone: {
    title: "Telephone number",
    imagePath: "assets/illustrated-identity/classmates-exchange-phone-number.webp",
    imageAlt: "Anan and Sisi exchange a made-up family telephone number in class",
    lines: [
      { hanzi: "你的电话号码是多少？", pinyin: "nǐ de diàn huà hào mǎ shì duō shao?", english: "What is your telephone number?", audio: "你的电话号码是多少" },
      { hanzi: "我的电话号码是六七四五一一一一。", pinyin: "wǒ de diàn huà hào mǎ shì liù qī sì wǔ yī yī yī yī.", english: "My telephone number is 6745 1111.", audio: "我的电话号码是六七四五一一一一" }
    ]
  },
  locationChoices: [
    { id: "beijing", hanzi: "北京", pinyin: "Běi jīng", english: "Beijing" },
    { id: "school", hanzi: "学校", pinyin: "xué xiào", english: "school" },
    { id: "park", hanzi: "公园", pinyin: "gōng yuán", english: "park" }
  ]
};
