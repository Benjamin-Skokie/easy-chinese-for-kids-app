export const schoolSubjectsTopicData = {
    scenes: [
      {
        id: "subjects",
        label: "School subjects",
        hanzi: "我喜欢音乐课。你喜欢什么课？",
        pinyin: "wǒ xǐ huan yīn yuè kè. nǐ xǐ huan shén me kè?",
        english: "I like music class. What class do you like?",
        audio: "我喜欢音月课你喜欢什么课",
        imagePath: "assets/illustrated-school-subjects/subjects-dialogue.webp"
      },
      {
        id: "go-to-music",
        label: "Music class",
        hanzi: "我去上音乐课。",
        pinyin: "wǒ qù shàng yīn yuè kè.",
        english: "I am going to music class.",
        audio: "我去上音月课",
        imagePath: "assets/illustrated-activities/anan_go_to_music_class.webp"
      },
      {
        id: "in-music",
        label: "Music class",
        hanzi: "我在上音乐课。",
        pinyin: "wǒ zài shàng yīn yuè kè.",
        english: "I am in music class.",
        audio: "我在上音月课",
        imagePath: "assets/illustrated-activities/anan_in_music_class.webp"
      },
      {
        id: "likes-music",
        label: "Music class",
        hanzi: "我喜欢音乐课。",
        pinyin: "wǒ xǐ huan yīn yuè kè.",
        english: "I like music class.",
        audio: "我喜欢音月课",
        imagePath: "assets/illustrated-activities/anan_likes_music_class.webp"
      },
      {
        id: "likes-pe",
        label: "PE class",
        hanzi: "我喜欢体育课。",
        pinyin: "wǒ xǐ huan tǐ yù kè.",
        english: "I like PE class.",
        audio: "我喜欢体育课",
        imagePath: "assets/illustrated-activities/yangyang_likes_pe_class.webp"
      },
      {
        id: "dislikes-math",
        label: "Math class",
        hanzi: "我不喜欢数学课。",
        pinyin: "wǒ bù xǐ huan shù xué kè.",
        english: "I do not like math class.",
        audio: "我不喜欢数学课",
        imagePath: "assets/illustrated-activities/lele_dislikes_math_class.webp"
      }
    ],
    words: [
      ["chinese", "语文课", "yǔ wén kè", "Chinese class"],
      ["english", "英语课", "yīng yǔ kè", "English class"],
      ["math", "数学课", "shù xué kè", "math class"],
      ["music", "音乐课", "yīn yuè kè", "music class"],
      ["art", "美术课", "měi shù kè", "art class"],
      ["pe", "体育课", "tǐ yù kè", "PE class"]
    ].map(([id, hanzi, pinyin, english]) => ({ id, hanzi, pinyin, english, audio: id === "music" ? "音月课" : hanzi }))
};

export const schoolSubjectsSentenceBuilds = [
    { id: "ask-favorite", imagePath: "assets/illustrated-school-subjects/subjects-dialogue.webp", target: ["你", "喜欢", "什么", "课"], distractors: ["学校", "有", "图书馆"], audio: "你喜欢什么课？", pinyin: "nǐ xǐ huan shén me kè?", english: "What class do you like?" },
    { id: "go-music", imagePath: "assets/illustrated-activities/anan_go_to_music_class.webp", target: ["我", "去", "上", "音乐课"], distractors: ["学校", "有", "图书馆"], pinyin: "wǒ qù shàng yīn yuè kè.", english: "I go to music class.", audio: "我去上音月课" },
    { id: "in-music", imagePath: "assets/illustrated-activities/anan_in_music_class.webp", target: ["我", "在", "上", "音乐课"], distractors: ["学校", "有", "图书馆"], pinyin: "wǒ zài shàng yīn yuè kè.", english: "I am in music class.", audio: "我在上音月课" },
    { id: "music", imagePath: "assets/illustrated-activities/anan_likes_music_class.webp", target: ["我", "喜欢", "音乐课"], distractors: ["学校", "有", "图书馆"], pinyin: "wǒ xǐ huan yīn yuè kè.", english: "I like music class.", audio: "我喜欢音月课" },
    { id: "pe", imagePath: "assets/illustrated-activities/yangyang_likes_pe_class.webp", target: ["我", "喜欢", "体育课"], distractors: ["学校", "有", "文具盒"], pinyin: "wǒ xǐ huan tǐ yù kè.", english: "I like PE class." },
    { id: "dislikes-math", imagePath: "assets/illustrated-activities/lele_dislikes_math_class.webp", target: ["我", "不喜欢", "数学课"], distractors: ["学校", "有", "文具盒"], pinyin: "wǒ bù xǐ huan shù xué kè.", english: "I do not like math class." }
];
