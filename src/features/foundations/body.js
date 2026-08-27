export const bodyTopic = {
  id: "body",
  title: "Body",
  summary: "A visual topic that works well for touch interaction and movement.",
  progressLabel: "1B core topic",
  iconText: "手眼",
  iconColor: "#5f8f8a",
  focus: { hanzi: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚", pinyin: "tóu, é tóu, tóu fa, yǎn jing, ěr duo, bí zi, zuǐ ba, bó zi, shǒu bì, shǒu, tuǐ, jiǎo", english: "head, forehead, hair, eyes, ears, nose, mouth, neck, arm, hand, leg, foot", audio: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚" },
  focusItems: [
    { id: "head", hanzi: "头", pinyin: "tóu", english: "head", audio: "头", lessonSources: ["1b:3"] }, { id: "forehead", hanzi: "额头", pinyin: "é tóu", english: "forehead", audio: "额头", lessonSources: ["1b:4"] }, { id: "hair", hanzi: "头发", pinyin: "tóu fa", english: "hair", audio: "头发", lessonSources: ["1b:3"] }, { id: "eyes", hanzi: "眼睛", pinyin: "yǎn jing", english: "eyes", audio: "眼睛", lessonSources: ["1b:3"] }, { id: "ears", hanzi: "耳朵", pinyin: "ěr duo", english: "ears", audio: "耳朵", lessonSources: ["1b:3"] }, { id: "nose", hanzi: "鼻子", pinyin: "bí zi", english: "nose", audio: "鼻子", lessonSources: ["1b:3"] }, { id: "mouth", hanzi: "嘴巴", pinyin: "zuǐ ba", english: "mouth", audio: "嘴巴", lessonSources: ["1b:3"] }, { id: "neck", hanzi: "脖子", pinyin: "bó zi", english: "neck", audio: "脖子", lessonSources: ["1b:4"] }, { id: "arm", hanzi: "手臂", pinyin: "shǒu bì", english: "arm", audio: "手臂", lessonSources: ["1b:4"] }, { id: "hand", hanzi: "手", pinyin: "shǒu", english: "hand", audio: "手", lessonSources: ["1b:3"] }, { id: "leg", hanzi: "腿", pinyin: "tuǐ", english: "leg", audio: "腿", lessonSources: ["1b:4"] }, { id: "foot", hanzi: "脚", pinyin: "jiǎo", english: "foot", audio: "脚", lessonSources: ["1b:3"] }
  ],
  interactiveScene: "body-face",
  parentGuide: "Tap a body word, hear it together, then point to the same body part on yourself or on the character.",
  cultureGuide: "Body vocabulary is simple to act out, so it is a good topic for young beginners who are still building confidence.",
  activities: ["Tap word to hear", "See the body part glow", "Listen and point", "Picture matching"],
  steps: [{ book: "1B", lesson: 3, title: "Parts of the body (1)", cardLabel: "Name body parts", note: "Start with the first body words." }, { book: "1B", lesson: 4, title: "Parts of the body (2)", cardLabel: "Learn more body parts", note: "Expand and reinforce the body set." }]
};

export const bodyDiagramLayout = { left: ["hair", "ears", "nose", "hand", "leg", "foot"], right: ["head", "forehead", "eyes", "mouth", "neck", "arm"] };
export const bodyCoreItemIds = ["head", "hair", "eyes", "ears", "nose", "mouth", "hand", "foot"];
export const bodyBonusItemIds = ["forehead", "neck", "arm", "leg"];
