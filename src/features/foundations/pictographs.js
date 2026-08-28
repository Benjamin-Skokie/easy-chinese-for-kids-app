const source = "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/";

export const pictographItems = [
  { id: "water", hanzi: "水", pinyin: "shuǐ", english: "water", scenePath: "assets/pictographs/story-scenes/water-flow.webp", sceneAlt: "Abstract flowing water", story: "The story of 水", world: "A flowing river", early: "A middle stream, with drops on each side.", notice: "The long middle line is the stream. The smaller marks are drops of water.", knownWord: "喝水", theme: "#3c96a8", source },
  { id: "sun", hanzi: "日", pinyin: "rì", english: "sun; day", scenePath: "assets/pictographs/story-scenes/sun-disc.webp", sceneAlt: "Abstract golden sun", story: "The story of 日", world: "A bright sun", early: "A round sun with a mark in its centre.", notice: "The old form was round like the sun people could see in the sky.", knownWord: "今天", theme: "#d99231", source },
  { id: "moon", hanzi: "月", pinyin: "yuè", english: "moon; month", scenePath: "assets/pictographs/story-scenes/moon-crescent-left.webp", sceneAlt: "Abstract crescent moon curving left", story: "The story of 月", world: "A crescent moon", early: "A curved moon shape with a line inside.", notice: "The old form remembers the curved shape of a moon in the night sky.", knownWord: "月亮", theme: "#7869b2", source },
  { id: "mountain", hanzi: "山", pinyin: "shān", english: "mountain", scenePath: "assets/pictographs/story-scenes/mountain-peaks.webp", sceneAlt: "Abstract three mountain peaks", story: "The story of 山", world: "Three mountain peaks", early: "Three peaks stand side by side.", notice: "The middle peak rises the highest, with two smaller peaks beside it.", knownWord: "山", theme: "#43816b", source },
  { id: "tree", hanzi: "木", pinyin: "mù", english: "tree; wood", scenePath: "assets/pictographs/story-scenes/tree-branches.webp", sceneAlt: "Abstract tree with branches", story: "The story of 木", world: "A tree with branches", early: "A trunk, branches, and roots.", notice: "The old form is a picture of a tree: its trunk, branches, and roots.", knownWord: "木头", theme: "#4c8a52", source },
  { id: "fire", hanzi: "火", pinyin: "huǒ", english: "fire", scenePath: "assets/pictographs/story-scenes/fire-flame.webp", sceneAlt: "Abstract flame", story: "The story of 火", world: "A dancing flame", early: "A flame with lively points at the top.", notice: "The old form catches the pointed, moving shape of a flame.", knownWord: "火", theme: "#d55e47", source },
  { id: "field", hanzi: "田", pinyin: "tián", english: "field", scenePath: "assets/pictographs/story-scenes/field-plots.webp", sceneAlt: "Abstract divided field plots", story: "The story of 田", world: "A field in small plots", early: "A field divided into sections.", notice: "The lines show the paths and edges that divide a field into plots.", knownWord: "田", theme: "#9b8a3e", source },
  { id: "person", hanzi: "人", pinyin: "rén", english: "person", scenePath: "assets/pictographs/story-scenes/person-bowing.webp", sceneAlt: "Ancient child bowing in profile", story: "The story of 人", world: "A person seen from the side", early: "A person standing in profile.", notice: "The top is the head and the middle is the body. One extended stroke is an arm; the lower part shows the legs.", knownWord: "人", theme: "#4d83a8", source },
  { id: "home", hanzi: "家", pinyin: "jiā", english: "home; family", scenePath: "assets/pictographs/story-scenes/home-roof-v2.webp", sceneAlt: "Traditional home with a child upstairs and a pig below", story: "The story of 家", world: "A child upstairs; a pig below", early: "A roof above a pig.", notice: "The roof sits above a pig. Together they remember an old household: people above, with pigs kept below.", knownWord: "家", theme: "#c27646", source },
  { id: "gate", hanzi: "门", pinyin: "mén", english: "door; gate", scenePath: "assets/pictographs/story-scenes/gate-doors.webp", sceneAlt: "Abstract open double gate", story: "The story of 门", world: "A pair of doors", early: "Two doors under one top beam.", notice: "The old form shows the two sides of a gate standing open.", knownWord: "门", theme: "#9a7050", source },
  { id: "fish", hanzi: "鱼", pinyin: "yú", english: "fish", scenePath: "assets/pictographs/story-scenes/fish-swim.webp", sceneAlt: "Abstract fish swimming", story: "The story of 鱼", world: "A fish swimming", early: "A fish body with fins and tail.", notice: "In the early form, you can still spot a head, fins, and a tail.", knownWord: "鱼", theme: "#397fa6", source },
  { id: "bird", hanzi: "鸟", pinyin: "niǎo", english: "bird", scenePath: "assets/pictographs/story-scenes/bird-perch.webp", sceneAlt: "Abstract bird on a branch", story: "The story of 鸟", world: "A bird on a branch", early: "A pointed beak, claws, and a body outline.", notice: "The old form pictures a bird’s pointed beak, claws, and body outline.", knownWord: "小鸟", theme: "#9a6d9e", source },
  { id: "sheep", hanzi: "羊", pinyin: "yáng", english: "sheep", scenePath: "assets/pictographs/story-scenes/sheep-horns.webp", sceneAlt: "Abstract sheep with curved horns", story: "The story of 羊", world: "A sheep with horns", early: "A sheep’s head with curved horns.", notice: "The old form pictures a sheep’s head, with its curved horns standing out most clearly.", knownWord: "羊", theme: "#729777", source },
  { id: "cow", hanzi: "牛", pinyin: "niú", english: "cow", scenePath: "assets/pictographs/story-scenes/cow-horns.webp", sceneAlt: "Abstract cow head with horns", story: "The story of 牛", world: "A cow with horns", early: "A cow’s head and horns.", notice: "The old form highlights the shape of a cow’s head and horns.", knownWord: "牛", theme: "#9a743c", source },
  { id: "bamboo", hanzi: "竹", pinyin: "zhú", english: "bamboo", scenePath: "assets/pictographs/story-scenes/bamboo-stalks.webp", sceneAlt: "Abstract bamboo stalks", story: "The story of 竹", world: "Two bamboo stalks", early: "Bamboo branches with paired leaves.", notice: "The old form looks like bamboo branches with balanced, matching leaves.", knownWord: "竹子", theme: "#548c65", source }
];

export const pictographsTopic = {
  id: "pictographs",
  title: "Pictographic Characters",
  summary: "See how a few everyday pictures became Chinese characters.",
  progressLabel: "汉语一零一 · Character origins",
  iconText: "象形",
  iconColor: "#b46a47",
  ownsExplorerContent: true,
  interactiveScene: "pictograph-lab",
  focus: { hanzi: "水", pinyin: "shuǐ", english: "water", audio: "水" },
  focusItems: pictographItems.map(({ id, hanzi, pinyin, english }) => ({ id, hanzi, pinyin, english, audio: hanzi })),
  parentGuide: "Ask, “What do you notice?” before naming the character. The goal is visual curiosity, then recognition—not a history lecture.",
  cultureGuide: "These are a few characters whose early forms were picture-like. Most modern characters need other tools too, including components and sound clues.",
  activities: ["Look for the picture", "Follow the change", "Match picture to character"]
};
