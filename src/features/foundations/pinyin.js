export const pinyinTopic = {
  id: "pinyin",
  title: "Pinyin Sounds",
  summary: "Hear a sound, say it, then use the letters to start reading Chinese.",
  progressLabel: "Special topic · Start with a o e",
  iconText: "拼音",
  iconColor: "#b85f75",
  ownsExplorerContent: true,
  interactiveScene: "pinyin-lab",
  focus: { hanzi: "啊", pinyin: "ā", english: "first-tone a", audio: "ā" },
  focusItems: [{ id: "a", hanzi: "啊", pinyin: "ā", english: "first-tone a", audio: "ā" }],
  parentGuide: "Listen first. Let your child copy the sound and hand movement before showing the letter.",
  cultureGuide: "Pinyin is a tool for Mandarin pronunciation and reading. It does not replace Chinese characters.",
  activities: ["Listen and copy", "Hear the tone", "Blend a syllable", "Read a familiar word"]
};
