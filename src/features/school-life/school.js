export const schoolTopicData = {
    scenes: [
      ["school", "School", "这是学校。", "zhè shì xué xiào.", "This is a school.", "school_exterior_anchor.webp"],
      ["classroom", "Classroom", "学校有教室。", "xué xiào yǒu jiào shì.", "The school has classrooms.", "classroom_anchor.webp"],
      ["library", "Library", "学校有图书馆。", "xué xiào yǒu tú shū guǎn.", "The school has a library.", "library_anchor.webp"],
      ["playground", "Playground", "学校有操场。", "xué xiào yǒu cāo chǎng.", "The school has a playground.", "playground_anchor.webp"],
      ["cafeteria", "Cafeteria", "学校有食堂。", "xué xiào yǒu shí táng.", "The school has a cafeteria.", "cafeteria_anchor.webp"],
      ["auditorium", "Auditorium", "学校有礼堂。", "xué xiào yǒu lǐ táng.", "The school has an auditorium.", "auditorium_anchor.webp"],
      ["music-room", "Music room", "学校有音乐教室。音乐教室有钢琴。", "xué xiào yǒu yīn yuè jiào shì. yīn yuè jiào shì yǒu gāng qín.", "The school has a music room. The music room has a piano.", "music_classroom_anchor.webp"]
    ].map(([id, label, hanzi, pinyin, english, file, folder = "assets/illustrated-school-anchors"]) => ({ id, label, hanzi, pinyin, english, audio: id === "music-room" ? "学校有音乐教室音乐教室有钢琴" : hanzi, imagePath: `${folder}/${file}` })),
    words: [
      ["classroom", "教室", "jiào shì", "classroom", "classroom_anchor.webp"],
      ["library", "图书馆", "tú shū guǎn", "library", "library_anchor.webp"],
      ["playground", "操场", "cāo chǎng", "playground", "playground_anchor.webp"],
      ["cafeteria", "食堂", "shí táng", "cafeteria", "cafeteria_anchor.webp"],
      ["auditorium", "礼堂", "lǐ táng", "auditorium", "auditorium_anchor.webp"],
      ["music-room", "音乐教室", "yīn yuè jiào shì", "music room", "music_classroom_anchor.webp"],
      ["piano", "钢琴", "gāng qín", "piano", "piano_anchor.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: id === "music-room" ? "音月教室" : hanzi, imagePath: `assets/illustrated-school-anchors/${file}` }))
};

export const schoolSentenceBuilds = [
    { id: "classroom", imagePath: "assets/illustrated-school-anchors/classroom_anchor.webp", target: ["学校", "有", "教室"], distractors: ["书包", "里", "喜欢"], pinyin: "xué xiào yǒu jiào shì.", english: "The school has classrooms." },
    { id: "library", imagePath: "assets/illustrated-school-anchors/library_anchor.webp", target: ["学校", "有", "图书馆"], distractors: ["书包", "里", "喜欢"], pinyin: "xué xiào yǒu tú shū guǎn.", english: "The school has a library." },
    { id: "playground", imagePath: "assets/illustrated-school-anchors/playground_anchor.webp", target: ["学校", "有", "操场"], distractors: ["文具盒", "里", "喜欢"], pinyin: "xué xiào yǒu cāo chǎng.", english: "The school has a playground." },
    { id: "cafeteria", imagePath: "assets/illustrated-school-anchors/cafeteria_anchor.webp", target: ["学校", "有", "食堂"], distractors: ["教室", "里", "喜欢"], pinyin: "xué xiào yǒu shí táng.", english: "The school has a cafeteria." },
    { id: "auditorium", imagePath: "assets/illustrated-school-anchors/auditorium_anchor.webp", target: ["学校", "有", "礼堂"], distractors: ["书包", "里", "喜欢"], pinyin: "xué xiào yǒu lǐ táng.", english: "The school has an auditorium." },
    { id: "music-room", imagePath: "assets/illustrated-school-anchors/music_classroom_anchor.webp", target: ["学校", "有", "音乐教室"], distractors: ["文具盒", "里", "喜欢"], pinyin: "xué xiào yǒu yīn yuè jiào shì.", english: "The school has a music room.", audio: "学校有音乐教室" },
    { id: "music-room-piano", imagePath: "assets/illustrated-school-anchors/piano_anchor.webp", target: ["音乐教室", "有", "钢琴"], distractors: ["文具盒", "里", "喜欢"], pinyin: "yīn yuè jiào shì yǒu gāng qín.", english: "The music room has a piano.", audio: "音乐教室有钢琴" }
];
