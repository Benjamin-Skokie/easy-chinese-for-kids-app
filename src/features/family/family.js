export const familyTopic = {
  id: "family",
  title: "Family",
  summary: "Start with love and belonging, then sort family words by older and younger.",
  progressLabel: "1B to 3A",
  iconText: "家人",
  iconColor: "#aa7051",
  iconAccent: "#f1d29b",
  iconTheme: "family",
  focus: {
    hanzi: "爸爸妈妈爱我。",
    pinyin: "bà ba mā ma ài wǒ.",
    english: "Dad and Mum love me.",
    audio: "爸爸妈妈爱我"
  },
  focusItems: [
    { id: "parents-love-me", hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
    { id: "i-love-dad", hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
    { id: "i-love-mom", hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" },
    { id: "mom-word", hanzi: "妈妈", pinyin: "mā ma", english: "mum", audio: "妈妈" },
    { id: "dad-word", hanzi: "爸爸", pinyin: "bà ba", english: "dad", audio: "爸爸" },
    { id: "older-brother-word", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
    { id: "younger-brother-word", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
    { id: "older-sister-word", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
    { id: "younger-sister-word", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
  ],
  interactiveScene: "family-home",
  parentGuide: "Use one warm family picture for 爸爸妈妈爱我, then switch quickly to family photos, pointing, and real names.",
  cultureGuide: "This early family lesson works best when love words and family roles stay close to the child's real home life.",
  activities: ["Tap to hear", "Match family member", "Listen and choose", "Talk about my family"],
  steps: [
    { book: "1B", lesson: 1, title: "Mum and dad", note: "Start with immediate family." },
    { book: "1B", lesson: 2, title: "Brothers and sisters", note: "Expand the family set." },
    { book: "2A", lesson: 2, title: "Two younger brothers", note: "Add sibling language in sentences." },
    { book: "3A", lesson: 4, title: "Family", note: "Widen the family topic." }
  ]
};

export const familyGameItemIds = [
  "dad-word",
  "mom-word",
  "older-brother-word",
  "younger-brother-word",
  "older-sister-word",
  "younger-sister-word"
];

export const familyPractice = [
  {
    id: "family-scene-1",
    title: "Family love",
    visual: "parents-love",
    imagePath: "assets/illustrated-family/family-scene-parents-love.webp",
    imageAlt: "A child happily hugged by mum and dad in a cozy living room",
    roomLabel: "living-room",
    sceneLabel: "Living room",
    sceneMood: "Loved at home",
    lines: [
      { hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
      { hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
      { hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" }
    ]
  },
  {
    id: "family-scene-2",
    title: "Siblings",
    visual: "siblings-compare",
    imagePath: "assets/illustrated-family/family-scene-siblings.webp",
    imageAlt: "Four siblings together in a living room: older brother, younger brother, older sister, and younger sister",
    roomLabel: "playroom",
    sceneLabel: "Sibling map",
    sceneMood: "See both pairs at once",
    lines: [
      { personId: "older-brother", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
      { personId: "younger-brother", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
      { personId: "older-sister", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
      { personId: "younger-sister", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
    ]
  }
];

export const illustratedFamily = {
  grandpa: { id: "grandpa", label: "Grandpa", ageGroup: "senior", path: "assets/illustrated-family/grandpa.webp" },
  grandma: { id: "grandma", label: "Grandma", ageGroup: "senior", path: "assets/illustrated-family/grandma.webp" },
  dad: { id: "dad", label: "Dad", ageGroup: "adult", path: "assets/illustrated-family/family-avatar-dad.webp" },
  mom: { id: "mom", label: "Mom", ageGroup: "adult", path: "assets/illustrated-family/family-avatar-mom.webp" },
  girl: { id: "girl", label: "Older sister", ageGroup: "8", path: "assets/illustrated-family/family-avatar-older-sister.webp" },
  boy: { id: "boy", label: "Younger brother", ageGroup: "6", path: "assets/illustrated-family/family-avatar-younger-brother.webp" }
};

export const familyPersonIdsByItemId = {
  "dad-word": "dad",
  "mom-word": "mom",
  "older-brother-word": "older-brother",
  "younger-brother-word": "younger-brother",
  "older-sister-word": "older-sister",
  "younger-sister-word": "younger-sister"
};

export const familyHeadshotsByItemId = {
  "mom-word": "assets/illustrated-family/family-avatar-mom.webp",
  "dad-word": "assets/illustrated-family/family-avatar-dad.webp",
  "older-brother-word": "assets/illustrated-family/family-avatar-older-brother.webp",
  "younger-brother-word": "assets/illustrated-family/family-avatar-younger-brother.webp",
  "older-sister-word": "assets/illustrated-family/family-avatar-older-sister.webp",
  "younger-sister-word": "assets/illustrated-family/family-avatar-younger-sister.webp"
};
