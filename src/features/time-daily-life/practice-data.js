export const roomScenes = [
  {
    id: "my-room",
    label: "My room",
    hanzi: "我的房间里有床、书桌和衣柜。",
    pinyin: "wǒ de fáng jiān lǐ yǒu chuáng, shū zhuō hé yī guì.",
    english: "There is a bed, desk, and wardrobe in my room.",
    audio: "我的房间里有床书桌和衣柜",
    imagePath: "assets/illustrated-rooms/bedroom.webp"
  },
  {
    id: "living-room",
    label: "Living room",
    hanzi: "客厅里有沙发和电视。",
    pinyin: "kè tīng lǐ yǒu shā fa hé diàn shì.",
    english: "There is a sofa and TV in the living room.",
    audio: "客厅里有沙发和电视",
    imagePath: "assets/illustrated-rooms/living-room.webp"
  },
  {
    id: "garage",
    label: "Garage",
    hanzi: "车库里有自行车。",
    pinyin: "chē kù lǐ yǒu zì xíng chē.",
    english: "There is a bicycle in the garage.",
    audio: "车库里有自行车",
    imagePath: "assets/illustrated-rooms/garage.webp"
  }
];

export const roomSentenceTokens = {
  "my-room": { prefix: ["我的", "房间", "里", "有"], target: ["我的", "房间", "里", "有", "床", "书桌", "和", "衣柜"], unorderedObjects: ["床", "书桌", "衣柜"], distractors: ["客厅", "沙发", "自行车"] },
  "living-room": { prefix: ["客厅", "里", "有"], target: ["客厅", "里", "有", "沙发", "和", "电视"], unorderedObjects: ["沙发", "电视"], distractors: ["床", "车库", "自行车"] },
  garage: { prefix: ["车库", "里", "有"], target: ["车库", "里", "有", "自行车"], unorderedObjects: ["自行车"], distractors: ["书桌", "沙发", "电视"] }
};

export const transportSentenceTokens = {
  "walk-to-school.webp": { target: ["我", "走路", "去", "上学"], distractors: ["坐", "校车", "动物园"] },
  "bike-to-school.webp": { target: ["我", "骑自行车", "去", "上学"], distractors: ["坐", "火车", "北京"] },
  "school-bus-to-zoo.webp": { target: ["我", "坐", "校车", "去", "动物园"], distractors: ["骑自行车", "上学"] },
  "taxi-to-airport.webp": { target: ["我", "坐", "出租车", "去", "机场"], distractors: ["校车", "动物园"] },
  "airplane-to-grandparents.webp": { target: ["我", "坐", "飞机", "去看", "爷爷奶奶"], distractors: ["火车", "北京"] },
  "train-to-beijing.webp": { target: ["我", "坐", "火车", "去", "北京"], distractors: ["飞机", "机场"] },
  "mom-car-to-school.webp": { target: ["我", "坐", "妈妈的车", "去", "上学"], distractors: ["爸爸的车", "动物园"] },
  "dad-car-to-grocery-store.webp": { target: ["我", "坐", "爸爸的车", "去", "商店"], distractors: ["妈妈的车", "上学"] }
};

export const comparisonPracticeItems = [
  { id: "big-small-animals.webp", before: "大象很", between: "，兔子很", after: "。", target: ["大", "小"], options: ["大", "小", "长", "短"], pinyin: "Dà xiàng hěn dà, tù zi hěn xiǎo.", english: "The elephant is big and the rabbit is small." },
  { id: "many-few-carrots.webp", before: "这边的胡萝卜很", between: "，那边的胡萝卜很", after: "。", target: ["多", "少"], options: ["多", "少", "快", "慢"], pinyin: "Zhè biān de hú luó bo hěn duō, nà biān de hú luó bo hěn shǎo.", english: "These carrots are many, and those carrots are few." },
  { id: "fast-slow-running.webp", before: "兔子跑得很", between: "，乌龟跑得很", after: "。", target: ["快", "慢"], options: ["快", "慢", "大", "小"], pinyin: "Tù zi pǎo de hěn kuài, wū guī pǎo de hěn màn.", english: "The rabbit runs fast and the turtle runs slowly." },
  { id: "long-short-pencils.webp", before: "这支铅笔很", between: "，那支铅笔很", after: "。", target: ["长", "短"], options: ["长", "短", "冷", "热"], pinyin: "Zhè zhī qiān bǐ hěn cháng, nà zhī qiān bǐ hěn duǎn.", english: "This pencil is long and that pencil is short." },
  { id: "tall-short-animals.webp", before: "长颈鹿很", between: "，兔子很", after: "。", target: ["高", "矮"], options: ["高", "矮", "新", "旧"], pinyin: "Cháng jǐng lù hěn gāo, tù zi hěn ǎi.", english: "The giraffe is tall and the rabbit is short." },
  { id: "cold-hot-foods.webp", before: "冰棒很", between: "，面包很", after: "。", target: ["冷", "热"], options: ["冷", "热", "多", "少"], pinyin: "Bīng bàng hěn lěng, miàn bāo hěn rè.", english: "The ice pop is cold and the bread is hot." },
  { id: "new-old-teddy-bears.webp", before: "这个泰迪熊很", between: "，那个泰迪熊很", after: "。", target: ["新", "旧"], options: ["新", "旧", "快", "慢"], pinyin: "Zhè ge tài dí xióng hěn xīn, nà ge tài dí xióng hěn jiù.", english: "This teddy bear is new and that teddy bear is old." }
];

export const comparisonWordItems = [
  ["大", "dà", "big"], ["小", "xiǎo", "small"],
  ["多", "duō", "many"], ["少", "shǎo", "few"],
  ["快", "kuài", "fast"], ["慢", "màn", "slow"],
  ["长", "cháng", "long"], ["短", "duǎn", "short"],
  ["高", "gāo", "tall"], ["矮", "ǎi", "short"],
  ["冷", "lěng", "cold"], ["热", "rè", "hot"],
  ["新", "xīn", "new"], ["旧", "jiù", "old"]
].map(([hanzi, pinyin, english]) => ({ hanzi, pinyin, english }));

export const positionScenes = [
  {
    id: "up-down",
    number: "1",
    prompt: "Up and down",
    imagePath: "assets/illustrated-rooms/positions-up-down.webp",
    imageAlt: "A book and backpack showing up and down positions around a desk",
    lines: [
      { hanzi: "书在桌子上。", pinyin: "shū zài zhuō zi shàng.", english: "The book is on the desk.", audio: "书在桌子上" },
      { hanzi: "桌子上有书。", pinyin: "zhuō zi shàng yǒu shū.", english: "There is a book on the desk.", audio: "桌子上有书" },
      { hanzi: "书包在桌子下。", pinyin: "shū bāo zài zhuō zi xià.", english: "The backpack is under the desk.", audio: "书包在桌子下" }
    ]
  },
  {
    id: "inside-outside",
    number: "2",
    prompt: "Inside and outside",
    imagePath: "assets/illustrated-rooms/positions-inside-outside.webp",
    imageAlt: "A backpack, book, and pencil case showing inside and outside positions",
    lines: [
      { hanzi: "书包里有书。", pinyin: "shū bāo lǐ yǒu shū.", english: "There is a book in the backpack.", audio: "书包里有书" },
      { hanzi: "书在书包里。", pinyin: "shū zài shū bāo lǐ.", english: "The book is in the backpack.", audio: "书在书包里" },
      { hanzi: "文具盒在书包外面。", pinyin: "wén jù hé zài shū bāo wài miàn.", english: "The pencil case is outside the backpack.", audio: "文具盒在书包外面" }
    ]
  },
  {
    id: "directions",
    number: "3",
    prompt: "Front, back, left, and right",
    imagePath: "assets/illustrated-rooms/positions-all-directions.webp",
    imageAlt: "A room board showing front, back, left, and right directions",
    lines: [
      { hanzi: "上、下、前、后、左、右。", pinyin: "shàng, xià, qián, hòu, zuǒ, yòu.", english: "Up, down, front, back, left, right.", audio: "上下前后左右" }
    ]
  },
  {
    id: "room-directions",
    number: "4",
    prompt: "Directions in a room",
    imagePath: "assets/illustrated-rooms/positions-room.webp",
    imageAlt: "A girl, chair, bookshelf, and dog in a room for practicing directions",
    lines: [
      { hanzi: "女孩在桌子前面。", pinyin: "nǚ hái zài zhuō zi qián miàn.", english: "The girl is in front of the desk.", audio: "女孩在桌子前面" },
      { hanzi: "椅子在女孩后面。", pinyin: "yǐ zi zài nǚ hái hòu miàn.", english: "The chair is behind the girl.", audio: "椅子在女孩后面" },
      { hanzi: "书架在女孩左边。", pinyin: "shū jià zài nǚ hái zuǒ biān.", english: "The bookshelf is to the girl's left.", audio: "书架在女孩左边" },
      { hanzi: "小狗在女孩右边。", pinyin: "xiǎo gǒu zài nǚ hái yòu biān.", english: "The dog is to the girl's right.", audio: "小狗在女孩右边" }
    ]
  }
];

export const positionPracticeItems = positionScenes.flatMap((scene) => scene.lines.map((line, index) => ({ id: `${scene.id}-${index}`, ...line, imagePath: scene.imagePath, imageAlt: scene.imageAlt })));

