export const strokesTopic = {
  id: "strokes",
  title: "Chinese Strokes",
  summary: "See how a character grows one stroke at a time, then practise the order.",
  progressLabel: "Special topic · Basic strokes",
  iconText: "笔画",
  iconColor: "#477c86",
  ownsExplorerContent: true,
  interactiveScene: "stroke-lab",
  focus: { hanzi: "一", pinyin: "yī", english: "one; horizontal stroke", audio: "一" },
  focusItems: [{ id: "heng", hanzi: "一", pinyin: "yī", english: "horizontal stroke", audio: "一" }],
  parentGuide: "Ask what comes next before pressing play. A child learns stroke order by predicting and tracing, not merely watching.",
  cultureGuide: "Stroke order gives characters a stable writing rhythm. The topic follows simplified Chinese writing conventions.",
  activities: ["Watch one stroke", "Trace with a finger", "Predict the next stroke", "Write in order"]
};
