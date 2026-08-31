export const clothesBookWords = [
  { id: "clothes", hanzi: "衣服", pinyin: "yī fu", english: "clothes", audio: "衣服", imagePath: "assets/illustrated-everyday-life/clothes-stack.webp", lessonSources: ["2a:6"] },
  { id: "shoes", hanzi: "鞋子", pinyin: "xié zi", english: "shoes", audio: "鞋子", imagePath: "assets/illustrated-everyday-life/shoes.webp", lessonSources: ["2a:6"] },
  { id: "school-uniform", hanzi: "校服", pinyin: "xiào fú", english: "school uniform", audio: "校服", imagePath: "assets/illustrated-everyday-life/school-uniform.webp", lessonSources: ["3a:7"] },
  { id: "shirt", hanzi: "衬衫", pinyin: "chèn shān", english: "shirt", audio: "衬衫", imagePath: "assets/illustrated-everyday-life/collared-shirt.webp", lessonSources: ["3a:7"] },
  { id: "pants", hanzi: "裤子", pinyin: "kù zi", english: "pants", audio: "裤子", imagePath: "assets/illustrated-everyday-life/pants.webp", lessonSources: ["3a:7"] },
  { id: "dress", hanzi: "裙子", pinyin: "qún zi", english: "skirt", audio: "裙子", imagePath: "assets/illustrated-everyday-life/skirt.webp", lessonSources: ["3a:7"] },
  { id: "leather-shoes", hanzi: "皮鞋", pinyin: "pí xié", english: "leather shoes", audio: "皮鞋", imagePath: "assets/illustrated-everyday-life/leather-shoes.webp?v=5bfc063", lessonSources: ["3a:7"] },
  { id: "t-shirt", hanzi: "T恤", pinyin: "T xù", english: "T-shirt", audio: "T恤", imagePath: "assets/illustrated-everyday-life/clothes.webp", lessonSources: ["4b:2"] },
  { id: "shorts", hanzi: "短裤", pinyin: "duǎn kù", english: "shorts", audio: "短裤", imagePath: "assets/illustrated-weather/shorts.webp", lessonSources: ["4b:2"] },
  { id: "sweater", hanzi: "毛衣", pinyin: "máo yī", english: "sweater", audio: "毛衣", imagePath: "assets/illustrated-everyday-life/sweater.webp?v=5bfc063", lessonSources: ["4b:2"] },
  { id: "long-pants", hanzi: "长裤", pinyin: "cháng kù", english: "long pants", audio: "长裤", imagePath: "assets/illustrated-everyday-life/pants.webp", lessonSources: ["4b:2"] },
  { id: "coat", hanzi: "大衣", pinyin: "dà yī", english: "coat", audio: "大衣", imagePath: "assets/illustrated-everyday-life/coat.webp", lessonSources: ["4b:2"] },
  { id: "hat", hanzi: "帽子", pinyin: "mào zi", english: "hat", audio: "帽子", imagePath: "assets/illustrated-everyday-life/hat.webp", lessonSources: ["4b:2"] }
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
    { book: "2A", lesson: 6, title: "I can dress myself", cardLabel: "Get dressed", note: "Start with dressing language." },
    { book: "3A", lesson: 7, title: "Clothes", cardLabel: "Wear school clothes", note: "Use 校服, 衬衫, 裤子, 裙子, and 皮鞋 in what-I-wear sentences." },
    { book: "4B", lesson: 2, title: "Clothes", cardLabel: "Describe what you wear", note: "Use T恤, 短裤, 毛衣, 长裤, 大衣, 帽子, and 戴 in clothing sentences." }
  ]
};

export const clothesPractice = [
  { id: "self-care-routine", lessonSources: ["2a:6"], title: "Getting ready", imagePath: "assets/illustrated-clothes/wearing-clothes-scene.webp", imageAlt: "Anan putting on a jacket and wearing a hat", lines: [{ hanzi: "我会穿衣服。", pinyin: "wǒ huì chuān yī fu.", english: "I can get dressed.", audio: "我会穿衣服" }] },
  { id: "school-uniform", lessonSources: ["3a:7"], title: "School clothes", imagePath: "assets/illustrated-clothes/school-morning-uniform.webp", imageAlt: "Luna in a school uniform with a skirt and leather shoes", lines: [{ hanzi: "我穿校服。", pinyin: "wǒ chuān xiào fú.", english: "I wear a school uniform.", audio: "我穿校服" }, { hanzi: "我穿衬衫、裙子和皮鞋。", pinyin: "wǒ chuān chèn shān, qún zi hé pí xié.", english: "I wear a shirt, a skirt, and leather shoes.", audio: "我穿衬衫裙子和皮鞋" }] },
  { id: "t-shirt-and-shorts", lessonSources: ["4b:2"], title: "T-shirt and shorts", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/luna-tshirt-shorts.webp", imageAlt: "Luna wearing a yellow T-shirt and blue shorts indoors", lines: [{ hanzi: "露娜穿黄色的T恤和蓝色的短裤。", pinyin: "lù nà chuān huáng sè de T xù hé lán sè de duǎn kù.", english: "Luna wears a yellow T-shirt and blue shorts.", audio: "露娜穿黄色的T恤和蓝色的短裤" }] },
  { id: "coats-and-hats", lessonSources: ["4b:2"], title: "Colorful coats", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/lele-noah-outdoor-coats-hats.webp", imageAlt: "Lele in a green coat and Noah in a blue coat outside school", lines: [{ hanzi: "乐乐穿绿色的大衣，诺亚穿蓝色的大衣。", pinyin: "lè le chuān lǜ sè de dà yī, nuò yà chuān lán sè de dà yī.", english: "Lele wears a green coat, and Noah wears a blue coat.", audio: "乐乐穿绿色的大衣诺亚穿蓝色的大衣" }] },
  { id: "sweater-and-pants", lessonSources: ["4b:2"], title: "Sweater and pants", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/sophie-sweater-pants.webp", imageAlt: "Sophie wearing a purple sweater and blue long pants indoors", lines: [{ hanzi: "苏菲穿紫色的毛衣和蓝色的长裤。", pinyin: "sū fēi chuān zǐ sè de máo yī hé lán sè de cháng kù.", english: "Sophie wears a purple sweater and blue long pants.", audio: "苏菲穿紫色的毛衣和蓝色的长裤" }] },
  { id: "noah-blue-white", lessonSources: ["4b:2"], title: "Blue sweater", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/noah-blue-sweater-white-shoes.webp", imageAlt: "Noah in a blue sweater and white shoes", lines: [{ hanzi: "诺亚穿蓝色的毛衣和白色的鞋子。", pinyin: "nuò yà chuān lán sè de máo yī hé bái sè de xié zi.", english: "Noah wears a blue sweater and white shoes.", audio: "诺亚穿蓝色的毛衣和白色的鞋子" }] }
];

export const clothesUsefulNotes = [
  {
    hanzi: "穿大衣 / 戴帽子",
    explanation: "English uses “wear” for both. Chinese uses 穿 for clothes and shoes, and 戴 for hats and many accessories.",
    examples: [
      { hanzi: "我穿大衣。", english: "I wear a coat." },
      { hanzi: "我戴帽子。", english: "I wear a hat." }
    ],
    lessonSources: ["4b:2"]
  }
];

// The picture-choice game only uses concrete clothes. Grammar and action words
// such as 会、穿、戴 belong in Notes rather than picture cards.
export const clothesMatchItems = clothesBookWords.filter((item) => item.imagePath);

export const clothesSentenceItems = [
  { id: "wear-clothes", hanzi: "穿衣服", pinyin: "chuān yī fu", english: "get dressed", sentenceEnglish: "I can get dressed.", frame: "我会", framePinyin: "wǒ huì", audio: "我会穿衣服", imagePath: "assets/illustrated-clothes/wearing-clothes-scene.webp", imageAlt: "A child getting dressed", lessonSources: ["2a:6"] },
  { id: "wear-shoes", hanzi: "穿鞋子", pinyin: "chuān xié zi", english: "put on shoes", sentenceEnglish: "I can put on shoes.", frame: "我会", framePinyin: "wǒ huì", audio: "我会穿鞋子", imagePath: "assets/illustrated-self-dressing/putting-on-shoes.webp", imageAlt: "A child putting on shoes", lessonSources: ["2a:6"] },
  { id: "uniform", hanzi: "校服", pinyin: "xiào fú", english: "school uniform", sentenceEnglish: "I wear a school uniform.", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿校服", imagePath: "assets/illustrated-self-dressing/putting-on-school-uniform.webp", imageAlt: "A child putting on a school uniform", lessonSources: ["3a:7"] },
  { id: "shirt", hanzi: "衬衫", pinyin: "chèn shān", english: "shirt", sentenceEnglish: "I wear a shirt.", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿衬衫", imagePath: "assets/illustrated-everyday-life/collared-shirt.webp", imageAlt: "A shirt", lessonSources: ["3a:7"] },
  { id: "pants", hanzi: "裤子", pinyin: "kù zi", english: "pants", sentenceEnglish: "I wear pants.", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿裤子", imagePath: "assets/illustrated-everyday-life/pants.webp", imageAlt: "Pants", lessonSources: ["3a:7"] },
  { id: "skirt", hanzi: "裙子", pinyin: "qún zi", english: "skirt", sentenceEnglish: "I wear a skirt.", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿裙子", imagePath: "assets/illustrated-everyday-life/skirt.webp", imageAlt: "A skirt", lessonSources: ["3a:7"] },
  { id: "leather-shoes", hanzi: "皮鞋", pinyin: "pí xié", english: "leather shoes", sentenceEnglish: "I wear leather shoes.", frame: "我穿", framePinyin: "wǒ chuān", audio: "我穿皮鞋", imagePath: "assets/illustrated-everyday-life/leather-shoes.webp?v=5bfc063", imageAlt: "Leather shoes", lessonSources: ["3a:7"] },
  { id: "t-shirt-and-shorts", hanzi: "穿黄色的T恤和蓝色的短裤", pinyin: "chuān huáng sè de T xù hé lán sè de duǎn kù", fullPinyin: "lù nà chuān huáng sè de T xù hé lán sè de duǎn kù.", english: "wear a yellow T-shirt and blue shorts", sentenceEnglish: "Luna wears a yellow T-shirt and blue shorts.", frame: "露娜穿", framePinyin: "lù nà chuān", audio: "露娜穿黄色的T恤和蓝色的短裤", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/luna-tshirt-shorts.webp", imageAlt: "Luna in a yellow T-shirt and blue shorts", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "黄色的", answer: "T恤", options: ["T恤", "短裤", "毛衣", "长裤"] }, { id: "second", prefix: "蓝色的", answer: "短裤", options: ["短裤", "T恤", "毛衣", "长裤"] }] },
  { id: "coats-and-hats", hanzi: "乐乐穿绿色的大衣，诺亚穿蓝色的大衣", pinyin: "lè le chuān lǜ sè de dà yī, nuò yà chuān lán sè de dà yī", fullPinyin: "lè le chuān lǜ sè de dà yī, nuò yà chuān lán sè de dà yī.", english: "Lele wears a green coat, and Noah wears a blue coat", sentenceEnglish: "Lele wears a green coat, and Noah wears a blue coat.", frame: "", framePinyin: "", audio: "乐乐穿绿色的大衣诺亚穿蓝色的大衣", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/lele-noah-outdoor-coats-hats.webp", imageAlt: "Lele in a green coat and Noah in a blue coat outside school", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "乐乐穿绿色的", answer: "大衣", options: ["大衣", "帽子", "毛衣", "T恤"] }, { id: "second", joiner: "，", prefix: "诺亚穿蓝色的", answer: "大衣", options: ["大衣", "帽子", "短裤", "长裤"] }] },
  { id: "orange-and-blue-hats", hanzi: "乐乐戴橙色的帽子，诺亚戴蓝色的帽子", pinyin: "lè le dài chéng sè de mào zi, nuò yà dài lán sè de mào zi", fullPinyin: "lè le dài chéng sè de mào zi, nuò yà dài lán sè de mào zi.", english: "Lele wears an orange hat, and Noah wears a blue hat", sentenceEnglish: "Lele wears an orange hat, and Noah wears a blue hat.", frame: "", audio: "乐乐戴橙色的帽子诺亚戴蓝色的帽子", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/lele-noah-outdoor-coats-hats.webp", imageAlt: "Lele in an orange hat and Noah in a blue hat outside school", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "乐乐戴橙色的", answer: "帽子", options: ["帽子", "大衣", "毛衣", "鞋子"] }, { id: "second", joiner: "，", prefix: "诺亚戴蓝色的", answer: "帽子", options: ["帽子", "大衣", "毛衣", "鞋子"] }] },
  { id: "blue-and-white-shoes", hanzi: "乐乐穿蓝色的鞋，诺亚穿白色的鞋", pinyin: "lè le chuān lán sè de xié, nuò yà chuān bái sè de xié", fullPinyin: "lè le chuān lán sè de xié, nuò yà chuān bái sè de xié.", english: "Lele wears blue shoes, and Noah wears white shoes", sentenceEnglish: "Lele wears blue shoes, and Noah wears white shoes.", frame: "", audio: "乐乐穿蓝色的鞋诺亚穿白色的鞋", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/lele-noah-outdoor-coats-hats.webp", imageAlt: "Lele in blue shoes and Noah in white shoes outside school", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "乐乐穿蓝色的", answer: "鞋", options: ["鞋", "帽子", "大衣", "毛衣"] }, { id: "second", joiner: "，", prefix: "诺亚穿白色的", answer: "鞋", options: ["鞋", "帽子", "大衣", "毛衣"] }] },
  { id: "sweater-and-pants", hanzi: "穿紫色的毛衣和蓝色的长裤", pinyin: "chuān zǐ sè de máo yī hé lán sè de cháng kù", fullPinyin: "sū fēi chuān zǐ sè de máo yī hé lán sè de cháng kù.", english: "wear a purple sweater and blue long pants", sentenceEnglish: "Sophie wears a purple sweater and blue long pants.", frame: "苏菲穿", framePinyin: "sū fēi chuān", audio: "苏菲穿紫色的毛衣和蓝色的长裤", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/sophie-sweater-pants.webp", imageAlt: "Sophie in a purple sweater and blue long pants", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "紫色的", answer: "毛衣", options: ["毛衣", "长裤", "T恤", "帽子"] }, { id: "second", prefix: "蓝色的", answer: "长裤", options: ["长裤", "毛衣", "短裤", "大衣"] }] },
  { id: "noah-blue-white", hanzi: "穿蓝色的毛衣和白色的鞋子", pinyin: "chuān lán sè de máo yī hé bái sè de xié zi", fullPinyin: "nuò yà chuān lán sè de máo yī hé bái sè de xié zi.", sentenceEnglish: "Noah wears a blue sweater and white shoes.", frame: "诺亚穿", audio: "诺亚穿蓝色的毛衣和白色的鞋子", imagePath: "assets/illustrated-clothes/book-4b-lesson-2/noah-blue-sweater-white-shoes.webp", imageAlt: "Noah in a blue sweater and white shoes", lessonSources: ["4b:2"], slots: [{ id: "first", prefix: "蓝色的", answer: "毛衣", options: ["毛衣", "鞋子", "帽子", "短裤"] }, { id: "second", prefix: "白色的", answer: "鞋子", options: ["鞋子", "毛衣", "帽子", "短裤"] }] }
];
