export const timeDailyVisualTopicItems = {
  comparisons: [
    ["大，小", "dà, xiǎo", "big, small", "big-small-animals.webp", ["大", "小"]],
    ["多，少", "duō, shǎo", "many, few", "many-few-carrots.webp", ["多", "少"]],
    ["快，慢", "kuài, màn", "fast, slow", "fast-slow-running.webp", ["快", "慢"]],
    ["长，短", "cháng, duǎn", "long, short", "long-short-pencils.webp", ["长", "短"]],
    ["高，矮", "gāo, ǎi", "tall, short", "tall-short-animals.webp", ["高", "矮"]],
    ["冷，热", "lěng, rè", "cold, hot", "cold-hot-foods.webp", ["冷", "热"]],
    ["新，旧", "xīn, jiù", "new, old", "new-old-teddy-bears.webp", ["新", "旧"]]
  ].map(([hanzi, pinyin, english, file, words]) => ({ id: file, hanzi, pinyin, english, words, audio: hanzi, imagePath: `assets/illustrated-comparisons/${file}` })),
  positions: [
    ["上和下", "shàng hé xià", "up and down", "positions-up-down.webp"],
    ["里和外", "lǐ hé wài", "inside and outside", "positions-inside-outside.webp"],
    ["上、下、前、后、左、右", "shàng, xià, qián, hòu, zuǒ, yòu", "up, down, front, back, left, right", "positions-all-directions.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-rooms/${file}` })),
  transport: [
    ["我走路去上学。", "wǒ zǒu lù qù shàng xué.", "I walk to school.", "walk-to-school.webp"],
    ["我骑自行车去上学。", "wǒ qí zì xíng chē qù shàng xué.", "I ride a bike to school.", "bike-to-school.webp"],
    ["我坐校车去动物园。", "wǒ zuò xiào chē qù dòng wù yuán.", "I take the school bus to the zoo.", "school-bus-to-zoo.webp"],
    ["我坐出租车去机场。", "wǒ zuò chū zū chē qù jī chǎng.", "I take a taxi to the airport.", "taxi-to-airport.webp"],
    ["我坐飞机去看爷爷奶奶。", "wǒ zuò fēi jī qù kàn yé ye nǎi nai.", "I take an airplane to visit my grandparents.", "airplane-to-grandparents.webp"],
    ["我坐火车去北京。", "wǒ zuò huǒ chē qù Běi jīng.", "I take a train to Beijing.", "train-to-beijing.webp"],
    ["我坐妈妈的车去上学。", "wǒ zuò mā ma de chē qù shàng xué.", "I ride in Mom's car to school.", "mom-car-to-school.webp"],
    ["我坐爸爸的车去商店。", "wǒ zuò bà ba de chē qù shāng diàn.", "I ride in Dad's car to the store.", "dad-car-to-grocery-store.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-transportation/${file}` })),
  rooms: [
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
  ].map(([hanzi, pinyin, english, file, folder]) => ({ id: hanzi, hanzi, pinyin, english, audio: hanzi, imagePath: `${folder}/${file}` }))
};

