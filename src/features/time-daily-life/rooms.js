export const roomVisualItems = [
    ["客厅", "kè tīng", "living room", "living-room.webp", "assets/illustrated-rooms"],
    ["卧室", "wò shì", "bedroom", "bedroom.webp", "assets/illustrated-rooms"],
    ["车库", "chē kù", "garage", "garage.webp", "assets/illustrated-rooms"],
    ["床", "chuáng", "bed", "bed.webp", "assets/illustrated-furniture"],
    ["书桌", "shū zhuō", "desk", "desk.webp", "assets/illustrated-furniture"],
    ["书架", "shū jià", "bookshelf", "bookshelf.webp", "assets/illustrated-furniture"],
    ["衣柜", "yī guì", "wardrobe", "wardrobe.webp", "assets/illustrated-furniture"],
    ["钢琴", "gāng qín", "piano", "piano_anchor.webp", "assets/illustrated-school-anchors"],
    ["沙发", "shā fa", "sofa", "sofa.webp", "assets/illustrated-furniture"],
    ["电视柜", "diàn shì guì", "TV stand", "tv-stand.webp", "assets/illustrated-furniture"],
    ["自行车", "zì xíng chē", "bicycle", "bicycle.png", "assets/illustrated-rooms"]
  ].map(([hanzi, pinyin, english, file, folder]) => ({ id: hanzi, hanzi, pinyin, english, audio: hanzi, imagePath: `${folder}/${file}` }));

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
