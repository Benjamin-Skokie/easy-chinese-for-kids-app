export const everydayActionsTopic = {
  id: "everyday-actions",
  title: "Everyday Actions",
  summary: "See, hear, and name six everyday actions.",
  progressLabel: "Everyday words",
  iconText: "动作",
  iconColor: "#517b8d",
  focus: { hanzi: "他在走路。", pinyin: "tā zài zǒu lù.", english: "He is walking.", audio: "他在走路" },
  interactiveScene: "everyday-actions",
  ownsExplorerContent: true,
  parentGuide: "Act out one word at a time—walk, run, sit, stand, climb, or lie down—then say it together.",
  cultureGuide: "Everyday action words make it easier to describe what people are doing in familiar places.",
  activities: ["Tap to hear", "Name the action", "Picture choice"],
  steps: []
};

export const everydayActionItems = [
  { id: "walk", hanzi: "走路", pinyin: "zǒu lù", english: "walk", sentence: "他在走路。", sentencePinyin: "tā zài zǒu lù.", sentenceEnglish: "He is walking.", imagePath: "assets/illustrated-actions-basic/walk-v2.webp" },
  { id: "run", hanzi: "跑步", pinyin: "pǎo bù", english: "run", sentence: "他在跑步。", sentencePinyin: "tā zài pǎo bù.", sentenceEnglish: "He is running.", imagePath: "assets/illustrated-actions-basic/run-v2.webp" },
  { id: "sit", hanzi: "坐", pinyin: "zuò", english: "sit", sentence: "他坐在椅子上。", sentencePinyin: "tā zuò zài yǐ zi shàng.", sentenceEnglish: "He is sitting on a chair.", imagePath: "assets/illustrated-actions-basic/sit-chair-v2.webp" },
  { id: "stand", hanzi: "站", pinyin: "zhàn", english: "stand", sentence: "他站着。", sentencePinyin: "tā zhàn zhe.", sentenceEnglish: "He is standing.", imagePath: "assets/illustrated-actions-basic/stand-v2.webp" },
  { id: "climb", hanzi: "爬", pinyin: "pá", english: "climb", sentence: "他在爬梯子。", sentencePinyin: "tā zài pá tī zi.", sentenceEnglish: "He is climbing a ladder.", imagePath: "assets/illustrated-actions-basic/climb-ladder-v2.webp" },
  { id: "lie-down", hanzi: "躺", pinyin: "tǎng", english: "lie down", sentence: "他躺在床上。", sentencePinyin: "tā tǎng zài chuáng shàng.", sentenceEnglish: "He is lying on a bed.", imagePath: "assets/illustrated-actions-basic/lie-bed-v3.webp" }
].map((item) => ({ ...item, audio: item.sentence }));
