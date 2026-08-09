export const introductionsPractice = [
  {
    id: "intro-scene-1",
    number: "1",
    prompt: "Meet a new friend and ask their name",
    imagePath: "assets/introductions/introductions-scene-1.webp",
    imageAlt: "Two children meeting and introducing themselves",
    cast: ["lele", "anan"],
    lines: [
      { speakerId: "luna", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "sophie", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "luna", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { speakerId: "sophie", hanzi: "我叫苏菲。", pinyin: "wǒ jiào Sū fēi.", english: "My name is Sophie.", audio: "我叫苏菲" }
    ]
  },
  {
    id: "intro-scene-2",
    number: "2",
    prompt: "Say your own name clearly, then greet back",
    imagePath: "assets/introductions/introductions-scene-2.webp",
    imageAlt: "Two children talking in a classroom",
    cast: ["tiantian", "sisi"],
    lines: [
      { speakerId: "sisi", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { speakerId: "lele", hanzi: "我叫乐乐。", pinyin: "wǒ jiào Lè le.", english: "My name is Lele.", audio: "我叫乐乐" },
      { speakerId: "sisi", hanzi: "你好，乐乐！", pinyin: "nǐ hǎo, Lè le!", english: "Hello, Lele!", audio: "你好乐乐" }
    ]
  },
  {
    id: "intro-scene-3",
    number: "3",
    prompt: "Two children trade names after saying hello",
    imagePath: "assets/introductions/introductions-scene-3.webp",
    imageAlt: "Two friends greeting each other",
    cast: ["sisi", "lele"],
    lines: [
      { speakerId: "yangyang", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "jaden", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "yangyang", hanzi: "我叫阳阳。", pinyin: "wǒ jiào Yáng yáng.", english: "My name is Yangyang.", audio: "我叫阳阳" },
      { speakerId: "jaden", hanzi: "我叫杰登。", pinyin: "wǒ jiào Jié dēng.", english: "My name is Jaden.", audio: "我叫杰登" }
    ]
  }
];

export const introductionsGamePrompts = [
  {
    id: "intro-game-pattern",
    speakerId: "",
    sourceItemId: "my-name",
    hanzi: "我叫……",
    pinyin: "wǒ jiào...",
    english: "My name is...",
    audio: "我叫"
  }
];

export const introductionsBuildPhrases = [
  {
    id: "build-ask-name",
    sourceItemId: "ask-name",
    targetHanzi: "你叫什么名字？",
    prompt: "Build: What is your name?",
    english: "What is your name?",
    audio: "你叫什么名字",
    tokens: ["你", "叫", "什么", "名字"]
  },
  {
    id: "build-my-name",
    sourceItemId: "my-name",
    targetHanzi: "我叫……",
    prompt: "Build: My name is...",
    english: "My name is...",
    audio: "我叫",
    tokens: ["我", "叫"]
  }
];
