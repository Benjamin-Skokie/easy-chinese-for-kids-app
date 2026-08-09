export const introductionsTopic = {
    id: "introductions",
    title: "Names & Introductions",
    summary: "Meet a new friend, ask a name, and answer with a warm first self-introduction.",
    progressLabel: "1A to 3A",
    iconText: "我叫",
    iconColor: "#7e8f63",
    iconAccent: "#d9e49a",
    iconTheme: "introductions",
    focus: {
      hanzi: "我叫……",
      pinyin: "wǒ jiào...",
      english: "My name is...",
      audio: "我叫"
    },
    focusItems: [
      { id: "ask-name", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { id: "my-name", hanzi: "我叫……", pinyin: "wǒ jiào...", english: "My name is...", audio: "我叫" },
      { id: "me-word", hanzi: "我", pinyin: "wǒ", english: "I; me", audio: "我" },
      { id: "call-word", hanzi: "叫", pinyin: "jiào", english: "to be called", audio: "叫" },
      { id: "what-word", hanzi: "什么", pinyin: "shén me", english: "what", audio: "什么" },
      { id: "name-word", hanzi: "名字", pinyin: "míng zi", english: "name", audio: "名字" }
    ],
    interactiveScene: "introductions-conversation",
    parentGuide:
      "Practice the whole mini-conversation first: 你好, 你叫什么名字? 我叫... Then pause after 我叫 and let the child fill in their own name.",
    cultureGuide:
      "Children connect strongly to names and faces, so recurring kid characters help this lesson feel social instead of abstract.",
    activities: ["Tap to hear", "Play the conversation", "Say your own name", "Build the sentence"],
    steps: [
      { book: "1A", lesson: 6, title: "What's your name?", note: "Learn a first self-introduction pattern." },
      { book: "2A", lesson: 3, title: "Good friends", note: "Use names and social language in a wider context." }
    ]
};
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
    id: "intro-game-anan",
    speakerId: "anan",
    sourceItemId: "my-name",
    hanzi: "我叫安安。",
    pinyin: "wǒ jiào Ān an.",
    english: "My name is Anan.",
    audio: "我叫安安"
  },
  { id: "intro-game-tiantian", speakerId: "tiantian", sourceItemId: "my-name", hanzi: "我叫天天。", pinyin: "wǒ jiào Tiān tiān.", english: "My name is Tiantian.", audio: "我叫天天" },
  { id: "intro-game-sisi", speakerId: "sisi", sourceItemId: "my-name", hanzi: "我叫思思。", pinyin: "wǒ jiào Sī si.", english: "My name is Sisi.", audio: "我叫思思" },
  { id: "intro-game-lele", speakerId: "lele", sourceItemId: "my-name", hanzi: "我叫乐乐。", pinyin: "wǒ jiào Lè le.", english: "My name is Lele.", audio: "我叫乐乐" }
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
