import { additionalLandCreatures } from "./additions-land.js?v=20260928-source-audit-v1";
import { additionalSkyCreatures } from "./additions-sky.js?v=20260928-source-audit-v1";
import { placements } from "./map-regions.js?v=20260928-jingwei-sea-v1";

const creatureEntries = [
  {
    id: "lushu",
    nameZh: "鹿蜀",
    pinyin: "lù shǔ",
    nameEn: "Lushu",
    locationZh: "杻阳山",
    locationPinyin: "niǔ yáng shān",
    locationEn: "Niuyang Mountain",
    chapter: "《南山经》",
    image: "./assets/lushu.webp",
    factsZh: "鹿蜀像马，有白色的头、老虎一样的条纹和红色的尾巴，叫声像人在唱歌。",
    factsEn: "Lushu looks like a horse, with a white head, tiger stripes, and a red tail. Its call sounds like a person singing.",
    words: [
      { hanzi: "唱歌", pinyin: "chàng gē", english: "sing" },
      { hanzi: "条纹", pinyin: "tiáo wén", english: "stripes" }
    ]
  },
  {
    id: "xuangui",
    nameZh: "旋龟",
    pinyin: "xuán guī",
    nameEn: "Xuangui",
    locationZh: "杻阳山的怪水（河名）",
    locationPinyin: "niǔ yáng shān de guài shuǐ",
    locationEn: "Guai River at Niuyang Mountain",
    chapter: "《南山经》",
    image: "./assets/xuangui.webp",
    factsZh: "旋龟生活在怪水里，有乌龟一样的身体、鸟一样的头和蛇一样的尾巴，叫声像劈开木头的声音。",
    factsEn: "Xuangui lives in the Guai River. It has a turtle's body, a bird-like head, and a snake-like tail. Its call sounds like wood being split.",
    words: [
      { hanzi: "水里", pinyin: "shuǐ lǐ", english: "in the water" },
      { hanzi: "鸟头", pinyin: "niǎo tóu", english: "bird head" }
    ]
  },
  {
    id: "nine-tailed-fox",
    nameZh: "九尾狐",
    pinyin: "jiǔ wěi hú",
    nameEn: "Nine-Tailed Fox",
    locationZh: "青丘山",
    locationPinyin: "qīng qiū shān",
    locationEn: "Qingqiu Mountain",
    chapter: "《南山经》",
    image: "./assets/nine-tailed-fox.webp",
    storyTitleZh: "青丘山里的一声啼哭",
    storyTitleEn: "A Cry from Qingqiu Mountain",
    longRead: true,
    factsZh: "九尾狐像狐狸，长着九条尾巴，叫声像婴儿啼哭。书中也说，它会伤害人，是危险的动物。",
    factsEn: "The Nine-Tailed Fox looks like a fox with nine tails and cries like a baby. The book also describes it as dangerous to people.",
    words: [
      { hanzi: "九", pinyin: "jiǔ", english: "nine" },
      { hanzi: "尾巴", pinyin: "wěi ba", english: "tail" }
    ]
  },
  {
    id: "wenyaoyu",
    nameZh: "文鳐鱼",
    pinyin: "wén yáo yú",
    nameEn: "Wenyaoyu",
    locationZh: "泰器山的观水",
    locationPinyin: "tài qì shān de guān shuǐ",
    locationEn: "the Guan River at Taiqi Mountain",
    chapter: "《西山经》",
    image: "./assets/wenyaoyu.webp",
    factsZh: "文鳐鱼像鲤鱼，长着鸟翼，身上有青色花纹，头是白色的，嘴是红色的。书中说，它常从西海游向东海，在夜里飞行，出现时预示丰收。",
    factsEn: "Wenyaoyu looks like a carp with bird wings, blue-green markings, a white head, and a red beak. The book says it travels from the Western Sea to the Eastern Sea and flies at night. Its appearance is a sign of a good harvest in the book.",
    words: [
      { hanzi: "翅膀", pinyin: "chì bǎng", english: "wings" },
      { hanzi: "夜里", pinyin: "yè lǐ", english: "at night" }
    ]
  },
  {
    id: "dijiang",
    nameZh: "帝江",
    pinyin: "dì jiāng",
    nameEn: "Dijiang",
    locationZh: "天山",
    locationPinyin: "tiān shān",
    locationEn: "Tianshan",
    chapter: "《西山经》",
    image: "./assets/dijiang-six-feet.webp",
    factsZh: "书里把帝江比作黄色的口袋，又说它红得像火。它有六只脚和四只翅膀，没有面目，却懂得歌舞。",
    factsEn: "The book compares Dijiang to a yellow bag and says it is red as fire. It has six feet and four wings, with no face, yet it knows how to sing and dance.",
    words: [
      { hanzi: "六只脚", pinyin: "liù zhī jiǎo", english: "six feet" },
      { hanzi: "跳舞", pinyin: "tiào wǔ", english: "dance" }
    ]
  },
  {
    id: "jingwei",
    nameZh: "精卫",
    pinyin: "jīng wèi",
    nameEn: "Jingwei",
    locationZh: "发鸠山与东海",
    locationPinyin: "fā jiū shān yǔ dōng hǎi",
    locationEn: "Fajiu Mountain and the Eastern Sea",
    chapter: "《北山经》",
    image: "./assets/jingwei.webp",
    factsZh: "精卫像乌鸦，头上有花纹，嘴是白色的，脚是红色的。书中说，炎帝的小女儿女娃在东海溺水后化成精卫，常从西边的山衔来树枝和石头，想把东海填平。",
    factsEn: "Jingwei looks like a crow, with a patterned head, a white beak, and red feet. In the book, the Flame Emperor's young daughter drowns in the Eastern Sea and becomes this bird. She keeps bringing twigs and stones from the western mountains to fill the sea.",
    words: [
      { hanzi: "树枝", pinyin: "shù zhī", english: "twig" },
      { hanzi: "大海", pinyin: "dà hǎi", english: "sea" }
    ]
  },
  {
    id: "zheng",
    nameZh: "狰",
    pinyin: "zhēng",
    nameEn: "Zheng",
    locationZh: "章莪山",
    locationPinyin: "zhāng é shān",
    locationEn: "Zhang'e Mountain",
    chapter: "《西山经》",
    image: "./assets/zheng.webp",
    factsZh: "狰像赤红色的豹子，长着一只角和五条尾巴，叫声像石头互相敲击。",
    factsEn: "Zheng looks like a red leopard with one horn and five tails. Its call sounds like stones striking each other.",
    words: [
      { hanzi: "五条", pinyin: "wǔ tiáo", english: "five" },
      { hanzi: "一只角", pinyin: "yì zhī jiǎo", english: "one horn" }
    ]
  },
  {
    id: "bifang",
    nameZh: "毕方",
    pinyin: "bì fāng",
    nameEn: "Bifang",
    locationZh: "章莪山",
    locationPinyin: "zhāng é shān",
    locationEn: "Zhang'e Mountain",
    chapter: "《西山经》",
    image: "./assets/bifang.webp",
    factsZh: "毕方像鹤，只有一只脚，青色的身体上有红色花纹，嘴是白色的，叫声像在喊自己的名字。书中把它的出现看作怪火的征兆。",
    factsEn: "Bifang looks like a crane with one leg, a blue-green body, red markings, and a white beak. Its call sounds like its own name. The book links its appearance with mysterious fires.",
    words: [
      { hanzi: "一只脚", pinyin: "yì zhī jiǎo", english: "one leg" },
      { hanzi: "火", pinyin: "huǒ", english: "fire" }
    ]
  },
  {
    id: "changyou",
    nameZh: "长右",
    pinyin: "cháng yòu",
    nameEn: "Changyou",
    locationZh: "长右山",
    locationPinyin: "cháng yòu shān",
    locationEn: "Changyou Mountain",
    chapter: "《南山经》",
    image: "./assets/changyou.webp",
    factsZh: "长右像猿猴，有四只耳朵，叫声像人在低声呻吟。书中把它的出现看作大水的征兆。",
    factsEn: "Changyou looks like an ape with four ears. Its call sounds like a person moaning. In the book, seeing Changyou is a sign of a flood.",
    words: [
      { hanzi: "四只耳朵", pinyin: "sì zhī ěr duo", english: "four ears" },
      { hanzi: "大水", pinyin: "dà shuǐ", english: "flood" }
    ]
  },
  {
    id: "feifei",
    nameZh: "朏朏",
    pinyin: "fěi fěi",
    nameEn: "Feifei",
    locationZh: "霍山",
    locationPinyin: "huò shān",
    locationEn: "Huo Mountain",
    chapter: "《中山经》",
    image: "./assets/feifei.webp",
    factsZh: "朏朏像狸，有白色的尾巴和鬃毛。书中说，养着它可以让人少些忧愁。",
    factsEn: "Feifei looks like a wildcat, with a white tail and a mane. The book says keeping one could ease a person's worries.",
    words: [
      { hanzi: "白尾巴", pinyin: "bái wěi ba", english: "white tail" },
      { hanzi: "忧愁", pinyin: "yōu chóu", english: "worry" }
    ]
  },
  {
    id: "qitu",
    nameZh: "鵸鵌",
    pinyin: "qí tú",
    nameEn: "Qitu",
    locationZh: "翼望山",
    locationPinyin: "yì wàng shān",
    locationEn: "Yiwang Mountain",
    chapter: "《西山经》",
    image: "./assets/qitu.webp",
    factsZh: "鵸鵌像乌鸦，有三个头和六条尾巴，善于发出笑声。",
    factsEn: "Qitu looks like a crow with three heads and six tails. It makes laughing sounds.",
    words: [
      { hanzi: "三个头", pinyin: "sān ge tóu", english: "three heads" },
      { hanzi: "笑", pinyin: "xiào", english: "laugh" }
    ]
  },
  {
    id: "gudiao",
    nameZh: "蛊雕",
    pinyin: "gǔ diāo",
    nameEn: "Gudiao",
    locationZh: "鹿吴山的水中",
    locationPinyin: "lù wú shān de shuǐ zhōng",
    locationEn: "the waters of Luwu Mountain",
    chapter: "《南山经》",
    image: "./assets/gudiao.webp",
    factsZh: "蛊雕生活在水中，像雕，长着角，叫声像婴儿啼哭。书中也说，它会伤害人，是危险的动物。",
    factsEn: "Gudiao lives in the water and looks like an eagle with a horn. Its call sounds like a baby's cry. The book also describes it as dangerous to people.",
    words: [
      { hanzi: "哭声", pinyin: "kū shēng", english: "crying sound" },
      { hanzi: "角", pinyin: "jiǎo", english: "horn" }
    ]
  },
  {
    id: "fenghuang",
    nameZh: "凤凰",
    pinyin: "fèng huáng",
    nameEn: "Fenghuang",
    locationZh: "丹穴山",
    locationPinyin: "dān xué shān",
    locationEn: "Danxue Mountain",
    chapter: "《南山经》",
    image: "./assets/fenghuang.webp",
    factsZh: "凤凰像鸡，羽毛有五彩花纹，会自己唱歌、跳舞。书中把它的出现看作天下安宁的征兆。",
    factsEn: "Fenghuang looks like a chicken with feathers patterned in five colors. It sings and dances. In the book, its appearance is a sign of peace throughout the world.",
    words: [
      { hanzi: "五彩", pinyin: "wǔ cǎi", english: "five-colored" },
      { hanzi: "安宁", pinyin: "ān níng", english: "peaceful" }
    ]
  },
  {
    id: "mengji",
    nameZh: "孟极",
    pinyin: "mèng jí",
    nameEn: "Mengji",
    locationZh: "石者山",
    locationPinyin: "shí zhě shān",
    locationEn: "Shizhe Mountain",
    chapter: "《北山经》",
    image: "./assets/mengji.webp",
    factsZh: "孟极像豹子，身体是白色的，额头上有花纹，善于隐藏，叫声像在喊自己的名字。",
    factsEn: "Mengji looks like a white leopard with markings on its forehead. It is good at hiding, and its call sounds like its own name.",
    words: [
      { hanzi: "躲起来", pinyin: "duǒ qǐ lái", english: "hide" },
      { hanzi: "白色", pinyin: "bái sè", english: "white" }
    ]
  },
  {
    id: "zhuyan",
    nameZh: "朱厌",
    pinyin: "zhū yàn",
    nameEn: "Zhuyan",
    locationZh: "小次山",
    locationPinyin: "xiǎo cì shān",
    locationEn: "Xiaoci Mountain",
    chapter: "《西山经》",
    image: "./assets/zhuyan.webp",
    factsZh: "朱厌像猿猴，有白色的头和红色的脚。书中把它的出现看作战争的征兆。",
    factsEn: "Zhuyan looks like an ape with a white head and red feet. In the book, its appearance is a sign of war.",
    words: [
      { hanzi: "白头", pinyin: "bái tóu", english: "white head" },
      { hanzi: "红脚", pinyin: "hóng jiǎo", english: "red feet" }
    ]
  },
  {
    id: "fuzhu",
    nameZh: "夫诸",
    pinyin: "fū zhū",
    nameEn: "Fuzhu",
    locationZh: "敖岸山",
    locationPinyin: "áo àn shān",
    locationEn: "Ao'an Mountain",
    chapter: "《中山经》",
    image: "./assets/fuzhu-pearl.webp",
    factsZh: "夫诸像白鹿，长着四只角。书中把它的出现看作大水的征兆。",
    factsEn: "Fuzhu looks like a white deer with four horns. In the book, its appearance is a sign of a flood.",
    words: [
      { hanzi: "白鹿", pinyin: "bái lù", english: "white deer" },
      { hanzi: "四只角", pinyin: "sì zhī jiǎo", english: "four horns" }
    ]
  },
  {
    id: "dangkang",
    nameZh: "当康",
    pinyin: "dāng kāng",
    nameEn: "Dangkang",
    locationZh: "钦山",
    locationPinyin: "qīn shān",
    locationEn: "Qin Mountain",
    chapter: "《东山经》",
    image: "./assets/dangkang.webp",
    factsZh: "当康像野猪，有獠牙，叫声像在喊自己的名字。书中把它的出现看作丰收的征兆。",
    factsEn: "Dangkang looks like a boar with tusks, and its call sounds like its own name. In the book, its appearance is a sign of a good harvest.",
    words: [
      { hanzi: "獠牙", pinyin: "liáo yá", english: "tusks" },
      { hanzi: "丰收", pinyin: "fēng shōu", english: "harvest" }
    ]
  },
  {
    id: "kui",
    nameZh: "夔",
    pinyin: "kuí",
    nameEn: "Kui",
    locationZh: "流波山",
    locationPinyin: "liú bō shān",
    locationEn: "Liubo Mountain",
    chapter: "《大荒东经》",
    image: "./assets/kui.webp",
    factsZh: "夔像青色的牛，没有角，只有一只脚，身上的光像日月，吼声像雷。书中说，它每次进出水中，都会带来风雨。",
    factsEn: "Kui looks like a blue-gray ox with no horns and just one leg. It shines like the sun and moon and roars like thunder. The book says wind and rain arrive whenever it enters or leaves the water.",
    words: [
      { hanzi: "一只脚", pinyin: "yì zhī jiǎo", english: "one leg" },
      { hanzi: "雷声", pinyin: "léi shēng", english: "thunder" }
    ]
  },
  {
    id: "jiao",
    nameZh: "狡",
    pinyin: "jiǎo",
    nameEn: "Jiao",
    locationZh: "玉山",
    locationPinyin: "yù shān",
    locationEn: "Jade Mountain",
    chapter: "《西山经》",
    image: "./assets/jiao.webp",
    factsZh: "狡像狗，身上有豹纹，长着牛一样的角，叫声像狗吠。书中把它的出现看作丰收的征兆。",
    factsEn: "Jiao looks like a dog with leopard markings and ox-like horns. It barks like a dog. In the book, its appearance is a sign of a good harvest.",
    words: [
      { hanzi: "斑点", pinyin: "bān diǎn", english: "spots" },
      { hanzi: "丰收", pinyin: "fēng shōu", english: "harvest" }
    ]
  },
  {
    id: "ershu",
    nameZh: "耳鼠",
    pinyin: "ěr shǔ",
    nameEn: "Ear Mouse",
    locationZh: "丹熏山",
    locationPinyin: "dān xūn shān",
    locationEn: "Danxun Mountain",
    chapter: "《北山经》",
    image: "./assets/ershu.webp",
    factsZh: "耳鼠像鼠，长着兔子一样的头和鹿一样的身体，叫声像狗。书中说，它能用尾巴飞行。",
    factsEn: "Ear Mouse looks like a mouse with a rabbit's head and a deer-like body. Its call sounds like a dog. The book says it can fly using its tail.",
    words: [
      { hanzi: "兔子", pinyin: "tù zi", english: "rabbit" },
      { hanzi: "飞", pinyin: "fēi", english: "fly" }
    ]
  }
];

const creatureClassifications = {
  lushu: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "虎纹", en: "Tiger stripes" }, { zh: "歌声", en: "Singing call" }]
  },
  xuangui: {
    kind: { key: "water", zh: "水族", en: "Water creature" },
    habitat: { key: "river", zh: "河流", en: "River" },
    traits: [{ zh: "鸟头龟身", en: "Bird head, turtle body" }, { zh: "蛇尾", en: "Snake tail" }]
  },
  "nine-tailed-fox": {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "九条尾巴", en: "Nine tails" }, { zh: "神秘叫声", en: "Mysterious call" }]
  },
  wenyaoyu: {
    kind: { key: "water", zh: "水族", en: "Water creature" },
    habitat: { key: "river-sea", zh: "河海", en: "Rivers and seas" },
    traits: [{ zh: "鱼身鸟翼", en: "Fish body, bird wings" }, { zh: "会飞", en: "Can fly" }]
  },
  dijiang: {
    kind: { key: "spirit", zh: "神异", en: "Spirit" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "六足四翼", en: "Six feet, four wings" }, { zh: "会歌舞", en: "Sings and dances" }]
  },
  jingwei: {
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "coast", zh: "山与海", en: "Mountain and sea" },
    traits: [{ zh: "衔木石", en: "Carries twigs and stones" }, { zh: "填东海", en: "Fills the Eastern Sea" }]
  },
  zheng: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "五条尾巴", en: "Five tails" }, { zh: "一只角", en: "One horn" }]
  },
  bifang: {
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "一只脚", en: "One leg" }, { zh: "与火有关", en: "Linked with fire" }]
  },
  changyou: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "四只耳朵", en: "Four ears" }, { zh: "大水征兆", en: "Flood omen" }]
  },
  feifei: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "白尾巴", en: "White tail" }, { zh: "少忧愁", en: "Eases worries" }]
  },
  qitu: {
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "三个头", en: "Three heads" }, { zh: "笑声", en: "Laughing call" }]
  },
  gudiao: {
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "river", zh: "水边", en: "Waterside" },
    traits: [{ zh: "头上有角", en: "Horned head" }, { zh: "神秘叫声", en: "Mysterious call" }]
  },
  fenghuang: {
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "五彩羽毛", en: "Five-colored feathers" }, { zh: "安宁", en: "Peace" }]
  },
  mengji: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "善于隐藏", en: "Good at hiding" }, { zh: "白色", en: "White" }]
  },
  zhuyan: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "白头红脚", en: "White head, red feet" }, { zh: "战争征兆", en: "War omen" }]
  },
  fuzhu: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "四只角", en: "Four horns" }, { zh: "大水征兆", en: "Flood omen" }]
  },
  dangkang: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山野", en: "Mountain fields" },
    traits: [{ zh: "獠牙", en: "Tusks" }, { zh: "丰收", en: "Harvest" }]
  },
  kui: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "sea", zh: "海中", en: "Sea" },
    traits: [{ zh: "一只脚", en: "One leg" }, { zh: "雷声风雨", en: "Thunder and rain" }]
  },
  jiao: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "豹纹牛角", en: "Leopard spots, ox horns" }, { zh: "丰收", en: "Harvest" }]
  },
  ershu: {
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "兔耳鹿身", en: "Rabbit ears, deer body" }, { zh: "用尾巴飞", en: "Flies with its tail" }]
  }
};

export const creatures = [
  ...creatureEntries.map((creature) => ({
    ...creature,
    ...creatureClassifications[creature.id]
  })),
  ...additionalLandCreatures,
  ...additionalSkyCreatures
].map((creature) => ({
  ...creature,
  ...placements[creature.id],
  habitat: creature.habitat.key === "mountain"
    ? { ...creature.habitat, zh: "山地", en: "Mountains" }
    : creature.habitat
}));
