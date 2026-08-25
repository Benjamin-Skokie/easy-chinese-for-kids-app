export const transportTopic = {
  id: "transport",
  title: "Transportation",
  summary: "Talk about how people travel to school, places, and family visits.",
  progressLabel: "4A Lesson 6",
  iconText: "交通",
  iconColor: "#6d8a4f",
  focus: { hanzi: "我坐校车去动物园。", pinyin: "wǒ zuò xiào chē qù dòng wù yuán.", english: "I take the school bus to the zoo.", audio: "我坐校车去动物园" },
  interactiveScene: "transport",
  parentGuide: "Start with how the child actually gets to school, then use the other scenes as conversation prompts.",
  cultureGuide: "Travel scenes make useful speaking practice because each vehicle has a clear destination and reason for the trip.",
  activities: ["Tap to hear", "Choose the vehicle", "Talk about a trip"],
  steps: [{ book: "4A", lesson: 6, title: "Means of transport", note: "Say how people travel." }]
};

export const transportVisualItems = [
    ["我走路去上学。", "wǒ zǒu lù qù shàng xué.", "I walk to school.", "walk-to-school.webp"],
    ["我骑自行车去上学。", "wǒ qí zì xíng chē qù shàng xué.", "I ride a bike to school.", "bike-to-school.webp"],
    ["我坐校车去动物园。", "wǒ zuò xiào chē qù dòng wù yuán.", "I take the school bus to the zoo.", "school-bus-to-zoo.webp"],
    ["我坐公共汽车去地铁站。", "wǒ zuò gōng gòng qì chē qù dì tiě zhàn.", "I take the public bus to the subway station.", "public-bus-to-subway-station.webp"],
    ["我坐出租车去机场。", "wǒ zuò chū zū chē qù jī chǎng.", "I take a taxi to the airport.", "taxi-to-airport.webp"],
    ["我坐飞机去看爷爷奶奶。", "wǒ zuò fēi jī qù kàn yé ye nǎi nai.", "I take an airplane to visit my grandparents.", "airplane-to-grandparents.webp"],
    ["我坐火车去北京。", "wǒ zuò huǒ chē qù Běi jīng.", "I take a train to Beijing.", "train-to-beijing.webp"],
    ["我坐妈妈的车去上学。", "wǒ zuò mā ma de chē qù shàng xué.", "I ride in Mom's car to school.", "mom-car-to-school.webp"],
    ["我坐爸爸的车去商店。", "wǒ zuò bà ba de chē qù shāng diàn.", "I ride in Dad's car to the store.", "dad-car-to-grocery-store.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({
    id: file,
    hanzi,
    pinyin,
    english,
    sceneTitle: {
      "walk-to-school.webp": "Walk to school",
      "bike-to-school.webp": "Bike to school",
      "school-bus-to-zoo.webp": "School bus trip",
      "public-bus-to-subway-station.webp": "Bus to the subway station",
      "taxi-to-airport.webp": "Taxi to the airport",
      "airplane-to-grandparents.webp": "Fly to grandparents",
      "train-to-beijing.webp": "Train to Beijing",
      "mom-car-to-school.webp": "Mom's car to school",
      "dad-car-to-grocery-store.webp": "Dad's car to the store"
    }[file],
    audio: hanzi,
    imagePath: `assets/illustrated-transportation/${file}`
  }));

export const transportBookWords = [
  ["走路", "zǒu lù", "walk"],
  ["自行车", "zì xíng chē", "bicycle"],
  ["汽车", "qì chē", "car"],
  ["公共汽车", "gōng gòng qì chē", "public bus"],
  ["出租车", "chū zū chē", "taxi"],
  ["火车", "huǒ chē", "train"],
  ["飞机", "fēi jī", "airplane"],
  ["校车", "xiào chē", "school bus"],
  ["地铁站", "dì tiě zhàn", "subway station"]
].map(([hanzi, pinyin, english]) => ({ hanzi, pinyin, english, audio: hanzi }));

export const transportSentenceTokens = {
  "walk-to-school.webp": { target: ["我", "走路", "去", "上学"], distractors: ["坐", "校车", "动物园"] },
  "bike-to-school.webp": { target: ["我", "骑自行车", "去", "上学"], distractors: ["坐", "火车", "北京"] },
  "school-bus-to-zoo.webp": { target: ["我", "坐", "校车", "去", "动物园"], distractors: ["骑自行车", "上学"] },
  "public-bus-to-subway-station.webp": { target: ["我", "坐", "公共汽车", "去", "地铁站"], distractors: ["校车", "动物园"] },
  "taxi-to-airport.webp": { target: ["我", "坐", "出租车", "去", "机场"], distractors: ["校车", "动物园"] },
  "airplane-to-grandparents.webp": { target: ["我", "坐", "飞机", "去看", "爷爷奶奶"], distractors: ["火车", "北京"] },
  "train-to-beijing.webp": { target: ["我", "坐", "火车", "去", "北京"], distractors: ["飞机", "机场"] },
  "mom-car-to-school.webp": { target: ["我", "坐", "妈妈的车", "去", "上学"], distractors: ["爸爸的车", "动物园"] },
  "dad-car-to-grocery-store.webp": { target: ["我", "坐", "爸爸的车", "去", "商店"], distractors: ["妈妈的车", "上学"] }
};
