export const familyTopic = {
  id: "family",
  title: "My Family 1",
  summary: "Name family members, then introduce who is in your family.",
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
    , { id: "grandpa-word", hanzi: "爷爷", pinyin: "yé ye", english: "paternal grandpa", audio: "爷爷" }
    , { id: "grandma-word", hanzi: "奶奶", pinyin: "nǎi nai", english: "paternal grandma", audio: "奶奶" }
    , { id: "maternal-grandpa-word", hanzi: "外公", pinyin: "wài gōng", english: "maternal grandpa", audio: "外公" }
    , { id: "maternal-grandma-word", hanzi: "外婆", pinyin: "wài pó", english: "maternal grandma", audio: "外婆" }
  ],
  interactiveScene: "family-home",
  parentGuide: "Use the family-photo scene to count five people, then let children point to and introduce their own family members.",
  cultureGuide: "This early family lesson works best when love words and family roles stay close to the child's real home life.",
  activities: ["Listen", "Book words", "Introduce my family", "Practice"],
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
  , {
    id: "family-scene-3",
    title: "My family",
    visual: "family-introduction",
    imagePath: "assets/illustrated-family/family-introduction-full-family.webp",
    imageAlt: "A family of six in a living room: Mum, Dad, Anan, Lele, a younger sister, and a younger brother",
    lines: [
      { hanzi: "这是我的家人。", pinyin: "zhè shì wǒ de jiā rén.", english: "This is my family.", audio: "这是我的家人" },
      { hanzi: "我家有六口人。", pinyin: "wǒ jiā yǒu liù kǒu rén.", english: "There are six people in my family.", audio: "我家有六口人" }
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
  , "grandpa-word": "grandpa"
  , "grandma-word": "grandma"
  , "maternal-grandpa-word": "grandpa"
  , "maternal-grandma-word": "grandma"
};

export const familyHeadshotsByItemId = {
  "mom-word": "assets/illustrated-family/family-avatar-mom.webp",
  "dad-word": "assets/illustrated-family/family-avatar-dad.webp",
  "older-brother-word": "assets/illustrated-family/family-avatar-older-brother.webp",
  "younger-brother-word": "assets/illustrated-family/family-avatar-younger-brother.webp",
  "older-sister-word": "assets/illustrated-family/family-avatar-older-sister.webp",
  "younger-sister-word": "assets/illustrated-family/family-avatar-younger-sister.webp"
  , "grandpa-word": "assets/illustrated-family/grandpa.webp"
  , "grandma-word": "assets/illustrated-family/grandma.webp"
  , "maternal-grandpa-word": "assets/illustrated-family/grandpa.webp"
  , "maternal-grandma-word": "assets/illustrated-family/grandma.webp"
};
