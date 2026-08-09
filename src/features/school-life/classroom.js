export const classroomTopicData = {
    practiceSummary: "Choose a classroom sentence start and an object to make your own sentence.",
    scenes: [
      {
        id: "classroom",
        label: "Our classroom",
        hanzi: "这是我们的教室。教室里有很多桌子和椅子。",
        pinyin: "zhè shì wǒ men de jiào shì. jiào shì lǐ yǒu hěn duō zhuō zi hé yǐ zi.",
        english: "This is our classroom. There are many tables and chairs in the classroom.",
        audio: "这是我们的教室教室里有很多桌子和椅子",
        imagePath: "assets/illustrated-school-anchors/classroom_anchor.webp"
      },
      {
        id: "classroom-things",
        label: "On the table",
        hanzi: "桌子上有铅笔和笔记本。",
        pinyin: "zhuō zi shàng yǒu qiān bǐ hé bǐ jì běn.",
        english: "There are pencils and notebooks on the table.",
        audio: "桌子上有铅笔和笔记本",
        imagePath: "assets/illustrated-classrooms/us-classroom-clusters.webp"
      },
      {
        id: "classroom-computer-tv-bookshelf",
        label: "More classroom things",
        hanzi: "教室里有白板、电视、电脑和书架。",
        pinyin: "jiào shì lǐ yǒu bái bǎn, diàn shì, diàn nǎo hé shū jià.",
        english: "There is a whiteboard, a television, a computer, and a bookshelf in the classroom.",
        audio: "教室里有白板电视电脑和书架",
        imagePath: "assets/illustrated-classrooms/classroom-computer-tv-bookshelf.webp"
      },
    ],
    words: [
      ["classroom", "教室", "jiào shì", "classroom", "assets/illustrated-school-anchors/classroom_anchor.webp"],
      ["table", "桌子", "zhuō zi", "table", "assets/illustrated-stationery/table.webp"],
      ["chair", "椅子", "yǐ zi", "chair", "assets/illustrated-stationery/chair.webp"],
      ["whiteboard", "白板", "bái bǎn", "whiteboard", "assets/illustrated-classrooms/whiteboard.webp"],
      ["blackboard", "黑板", "hēi bǎn", "blackboard", "assets/illustrated-classrooms/blackboard.png"],
      ["computer", "电脑", "diàn nǎo", "computer (laptop)", "assets/illustrated-classrooms/computer.webp"],
      ["television", "电视", "diàn shì", "television", "assets/illustrated-classrooms/television.webp"],
      ["bookshelf", "书架", "shū jià", "bookshelf", "assets/illustrated-classrooms/bookshelf.webp"]
    ].map(([id, hanzi, pinyin, english, imagePath]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath })),
    sentenceFrames: [
      { id: "in-classroom", hanzi: "教室里有", pinyin: "jiào shì lǐ yǒu", english: "There is / are ... in the classroom", wordIds: ["table", "chair", "whiteboard", "blackboard", "computer", "television", "bookshelf"] },
      { id: "many-in-classroom", hanzi: "教室里有很多", pinyin: "jiào shì lǐ yǒu hěn duō", english: "There are many ... in the classroom", wordIds: ["table", "chair", "textbook"] },
      { id: "on-table", hanzi: "桌子上有", pinyin: "zhuō zi shàng yǒu", english: "There is / are ... on the table", wordIds: ["computer", "textbook", "workbook", "pencil", "ruler", "eraser", "colored-pencils"] }
    ],
    review: [
      { pattern: "教室里有……", pinyin: "jiào shì lǐ yǒu...", english: "There is / are ... in the classroom.", example: "教室里有桌子和椅子。" },
      { pattern: "桌子上有……", pinyin: "zhuō zi shàng yǒu...", english: "There is / are ... on the table.", example: "桌子上有电脑。" },
      { pattern: "很多", pinyin: "hěn duō", english: "many; much", example: "教室里有很多桌子和椅子。" }
    ]
};
