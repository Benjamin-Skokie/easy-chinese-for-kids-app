// Keep this deliberately small. These are the only characters whose stroke
// outlines may be shipped with the site; the paths live in individual local
// JSON files and are loaded only when a learner opens that character.
export const strokeCorpus = [
  "一", "二", "三", "五", "六", "人", "大", "天", "田", "口", "日", "月", "书", "丁", "小", "打", "中",
  "字", "么", "姐", "名", "您", "眼", "你", "级", "四", "九", "七", "有",
  "穿", "热", "冷", "他", "爷", "家", "薯", "狗", "上", "下", "水",
  "山", "木", "火", "门", "鱼", "鸟", "羊", "牛", "竹"
];

export const advancedStrokePlan = [
  { id: "wan-gou", zh: "弯钩", pinyin: "wān gōu", word: "字" },
  { id: "pie-zhe", zh: "撇折", pinyin: "piě zhé", word: "么" },
  { id: "pie-dian", zh: "撇点", pinyin: "piě diǎn", word: "姐" },
  { id: "heng-pie", zh: "横撇", pinyin: "héng piě", word: "名" },
  { id: "wo-gou", zh: "卧钩", pinyin: "wò gōu", word: "您" },
  { id: "shu-ti", zh: "竖提", pinyin: "shù tí", word: "眼" },
  { id: "heng-gou", zh: "横钩", pinyin: "héng gōu", word: "你" },
  { id: "heng-zhe-zhe-pie", zh: "横折折撇", pinyin: "héng zhé zhé piě", word: "级" },
  { id: "shu-wan", zh: "竖弯", pinyin: "shù wān", word: "四" },
  { id: "heng-zhe-wan-gou", zh: "横折弯钩", pinyin: "héng zhé wān gōu", word: "九" },
  { id: "shu-wan-gou", zh: "竖弯钩", pinyin: "shù wān gōu", word: "七" },
  { id: "heng-zhe-gou", zh: "横折钩", pinyin: "héng zhé gōu", word: "有" }
];
