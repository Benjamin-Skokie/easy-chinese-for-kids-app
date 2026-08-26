export const greetingsTopic = {
  id: "greetings",
  title: "Greetings",
  summary: "Simple social language children can use right away in class and at home.",
  progressLabel: "1A foundation",
  iconText: "你好",
  iconColor: "#d2874f",
  iconAccent: "#f7d98f",
  iconTheme: "greeting",
  focus: {
    hanzi: "你好！",
    pinyin: "nǐ hǎo!",
    english: "Hello!",
    audio: "你好"
  },
  focusItems: [
    { id: "hello", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
    { id: "you-casual", hanzi: "你", pinyin: "nǐ", english: "you", audio: "你" },
    { id: "you-polite", hanzi: "您", pinyin: "nín", english: "you (polite)", audio: "您" },
    { id: "teacher-hello", hanzi: "李老师，您好！", pinyin: "Lǐ lǎo shī, nín hǎo!", english: "Hello, Teacher Li!", audio: "李老师您好" },
    { id: "good-morning", hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
    { id: "goodbye", hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
    { id: "teacher", hanzi: "老师", pinyin: "lǎo shī", english: "teacher", audio: "老师" },
    { id: "surname-li", hanzi: "李", pinyin: "Lǐ", english: "Li (surname)", audio: "李" }
  ],
  interactiveScene: "greetings-conversation",
  parentGuide: "Pair the phrase with movement. Wave, smile, and say it together. Young children remember social language best when it feels physical.",
  cultureGuide: "Greetings are a gentle bridge into relationship-focused language. The point is warmth and confidence, not a long explanation.",
  activities: ["Tap to hear", "Echo and repeat", "Choose the greeting", "Role-play turns"],
  steps: [{ book: "1A", lesson: 4, title: "Hello!", cardLabel: "Say hello and goodbye", note: "Begin with friendly greetings." }]
};

export const greetingsPractice = [
  {
    id: "scene-1",
    title: "Greeting a teacher",
    imagePath: "assets/greetings/greetings-scene-1.webp",
    imageAlt: "Teacher Li greeting Anan outside the school entrance",
    lines: [
      { hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { hanzi: "李老师，您好！", pinyin: "Lǐ lǎo shī, nín hǎo!", english: "Hello, Teacher Li!", audio: "李老师您好" }
    ]
  },
  {
    id: "scene-2",
    title: "Morning friends",
    imagePath: "assets/greetings/greetings-scene-2.webp",
    imageAlt: "Lele and Anan greeting each other on the way into school, with other children arriving behind them",
    lines: [
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" }
    ]
  },
  {
    id: "scene-3",
    title: "Saying goodbye",
    imagePath: "assets/greetings/greetings-scene-3.webp",
    imageAlt: "Lele and Anan waving goodbye after school as children come out of the building and head home",
    lines: [
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" }
    ]
  }
];

export const greetingsGameItemIds = ["hello", "teacher-hello", "good-morning", "goodbye"];
