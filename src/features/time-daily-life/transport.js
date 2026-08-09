export const transportVisualItems = [
    ["我走路去上学。", "wǒ zǒu lù qù shàng xué.", "I walk to school.", "walk-to-school.webp"],
    ["我骑自行车去上学。", "wǒ qí zì xíng chē qù shàng xué.", "I ride a bike to school.", "bike-to-school.webp"],
    ["我坐校车去动物园。", "wǒ zuò xiào chē qù dòng wù yuán.", "I take the school bus to the zoo.", "school-bus-to-zoo.webp"],
    ["我坐出租车去机场。", "wǒ zuò chū zū chē qù jī chǎng.", "I take a taxi to the airport.", "taxi-to-airport.webp"],
    ["我坐飞机去看爷爷奶奶。", "wǒ zuò fēi jī qù kàn yé ye nǎi nai.", "I take an airplane to visit my grandparents.", "airplane-to-grandparents.webp"],
    ["我坐火车去北京。", "wǒ zuò huǒ chē qù Běi jīng.", "I take a train to Beijing.", "train-to-beijing.webp"],
    ["我坐妈妈的车去上学。", "wǒ zuò mā ma de chē qù shàng xué.", "I ride in Mom's car to school.", "mom-car-to-school.webp"],
    ["我坐爸爸的车去商店。", "wǒ zuò bà ba de chē qù shāng diàn.", "I ride in Dad's car to the store.", "dad-car-to-grocery-store.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-transportation/${file}` }));

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
