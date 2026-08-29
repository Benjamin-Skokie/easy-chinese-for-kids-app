export const comparisonsTopic = {
  id: "comparisons",
  title: "Descriptions & Comparisons",
  summary: "Compare size, amount, speed, length, temperature, and more.",
  progressLabel: "2B Lesson 6",
  iconText: "大小",
  iconColor: "#aa7051",
  focus: { hanzi: "大和小", pinyin: "dà hé xiǎo", english: "big and small", audio: "大和小" },
  interactiveScene: "comparisons",
  parentGuide: "Compare real objects together: a big and small cup, a long and short pencil, or a fast and slow walk.",
  cultureGuide: "Comparison words are useful across nearly every later topic because children can see and act them out immediately.",
  activities: ["Tap to hear", "Compare two things", "Say what you see"],
  steps: [{ book: "2B", lesson: 6, title: "Big or small", cardLabel: "Compare big and small", note: "Use opposite description words." }]
};

export const comparisonVisualItems = [
    ["大，小", "dà, xiǎo", "big, small", "big-small-animals.webp", ["大", "小"]],
    ["多，少", "duō, shǎo", "many, few", "many-few-carrots.webp", ["多", "少"]],
    ["快，慢", "kuài, màn", "fast, slow", "fast-slow-running.webp", ["快", "慢"]],
    ["长，短", "cháng, duǎn", "long, short", "long-short-pencils.webp", ["长", "短"]],
    ["高，矮", "gāo, ǎi", "tall, short", "tall-short-animals.webp", ["高", "矮"]],
    ["冷，热", "lěng, rè", "cold, hot", "cold-hot-foods.webp", ["冷", "热"]],
    ["新，旧", "xīn, jiù", "new, old", "new-old-teddy-bears.webp", ["新", "旧"]]
  ].map(([hanzi, pinyin, english, file, words]) => ({ id: file, hanzi, pinyin, english, words, audio: hanzi, imagePath: `assets/illustrated-comparisons/${file}` }));

export const comparisonPracticeItems = [
  { id: "big-small-animals.webp", before: "大象很", between: "，兔子很", after: "。", target: ["大", "小"], options: ["大", "小", "长", "短"], pinyin: "Dà xiàng hěn dà, tù zi hěn xiǎo.", english: "The elephant is big and the rabbit is small." },
  { id: "many-few-carrots.webp", before: "这边的胡萝卜很", between: "，那边的胡萝卜很", after: "。", target: ["多", "少"], options: ["多", "少", "快", "慢"], pinyin: "Zhè biān de hú luó bo hěn duō, nà biān de hú luó bo hěn shǎo.", english: "These carrots are many, and those carrots are few." },
  { id: "fast-slow-running.webp", before: "兔子跑得很", between: "，乌龟跑得很", after: "。", target: ["快", "慢"], options: ["快", "慢", "大", "小"], pinyin: "Tù zi pǎo de hěn kuài, wū guī pǎo de hěn màn.", english: "The rabbit runs fast and the turtle runs slowly." },
  { id: "long-short-pencils.webp", before: "这支铅笔很", between: "，那支铅笔很", after: "。", target: ["长", "短"], options: ["长", "短", "冷", "热"], pinyin: "Zhè zhī qiān bǐ hěn cháng, nà zhī qiān bǐ hěn duǎn.", english: "This pencil is long and that pencil is short." },
  { id: "tall-short-animals.webp", before: "长颈鹿很", between: "，兔子很", after: "。", target: ["高", "矮"], options: ["高", "矮", "新", "旧"], pinyin: "Cháng jǐng lù hěn gāo, tù zi hěn ǎi.", english: "The giraffe is tall and the rabbit is short." },
  { id: "cold-hot-foods.webp", before: "冰棒很", between: "，面包很", after: "。", target: ["冷", "热"], options: ["冷", "热", "多", "少"], pinyin: "Bīng bàng hěn lěng, miàn bāo hěn rè.", english: "The ice pop is cold and the bread is hot." },
  { id: "new-old-teddy-bears.webp", before: "这个泰迪熊很", between: "，那个泰迪熊很", after: "。", target: ["新", "旧"], options: ["新", "旧", "快", "慢"], pinyin: "Zhè ge tài dí xióng hěn xīn, nà ge tài dí xióng hěn jiù.", english: "This teddy bear is new and that teddy bear is old." }
].map((item) => ({ ...item, audio: `${item.before}${item.target[0]}${item.between}${item.target[1]}${item.after}` }));

export const comparisonWordItems = [
  ["大", "dà", "big"], ["小", "xiǎo", "small"],
  ["多", "duō", "many"], ["少", "shǎo", "few"],
  ["快", "kuài", "fast"], ["慢", "màn", "slow"],
  ["长", "cháng", "long"], ["短", "duǎn", "short"],
  ["高", "gāo", "tall"], ["矮", "ǎi", "short"],
  ["冷", "lěng", "cold"], ["热", "rè", "hot"],
  ["新", "xīn", "new"], ["旧", "jiù", "old"]
].map(([hanzi, pinyin, english]) => ({ hanzi, pinyin, english }));
