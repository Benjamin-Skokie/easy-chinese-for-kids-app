export const timeDateClockItems = [
  [1, "一点", "yī diǎn"], [2, "两点", "liǎng diǎn"], [3, "三点", "sān diǎn"], [4, "四点", "sì diǎn"],
  [5, "五点", "wǔ diǎn"], [6, "六点", "liù diǎn"], [7, "七点", "qī diǎn"], [8, "八点", "bā diǎn"],
  [9, "九点", "jiǔ diǎn"], [10, "十点", "shí diǎn"], [11, "十一点", "shí yī diǎn"], [12, "十二点", "shí èr diǎn"]
].map(([hour, hanzi, pinyin]) => ({ id: `clock-${hour}`, hanzi, pinyin, english: `${hour} o'clock`, audio: hanzi, imagePath: `assets/illustrated-clocks/${hour}oclock.webp` }));

export const timeDateExpressionItems = [
  { id: "seven-oclock", hanzi: "七点", pinyin: "qī diǎn", english: "7:00", audio: "七点" },
  { id: "quarter-past-seven", hanzi: "七点一刻", pinyin: "qī diǎn yī kè", english: "7:15", audio: "七点一刻" },
  { id: "fifteen-past-seven", hanzi: "七点十五分", pinyin: "qī diǎn shí wǔ fēn", english: "7:15", audio: "七点十五分" },
  { id: "half-past-seven", hanzi: "七点半", pinyin: "qī diǎn bàn", english: "7:30", audio: "七点半" },
  { id: "thirty-past-seven", hanzi: "七点三十分", pinyin: "qī diǎn sān shí fēn", english: "7:30", audio: "七点三十分" },
  { id: "three-quarters-seven", hanzi: "七点三刻", pinyin: "qī diǎn sān kè", english: "7:45", audio: "七点三刻" },
  { id: "forty-five-past-seven", hanzi: "七点四十五分", pinyin: "qī diǎn sì shí wǔ fēn", english: "7:45", audio: "七点四十五分" }
];

export const timeAdvancedBookWords = [
  { id: "now", hanzi: "现在", pinyin: "xiàn zài", english: "now", audio: "现在" },
  { id: "quarter", hanzi: "一刻", pinyin: "yī kè", english: "a quarter (of an hour)", audio: "一刻" },
  { id: "half", hanzi: "半", pinyin: "bàn", english: "half", audio: "半" },
  { id: "minute", hanzi: "分", pinyin: "fēn", english: "minute", audio: "分" },
  { id: "three-quarters", hanzi: "三刻", pinyin: "sān kè", english: "three quarters (of an hour)", audio: "三刻" },
  { id: "zero", hanzi: "零", pinyin: "líng", english: "zero", audio: "零" }
];

export const timeRoutineBookWords = [
  { id: "wake-up", hanzi: "起床", pinyin: "qǐ chuáng", english: "get up", audio: "起床" },
  { id: "comb-hair", hanzi: "梳头", pinyin: "shū tóu", english: "comb your hair", audio: "梳头" },
  { id: "brush-teeth", hanzi: "刷牙", pinyin: "shuā yá", english: "brush your teeth", audio: "刷牙" },
  { id: "breakfast", hanzi: "吃早饭", pinyin: "chī zǎo fàn", english: "have breakfast", audio: "吃早饭" },
  { id: "go-to-school", hanzi: "去学校", pinyin: "qù xué xiào", english: "go to school", audio: "去学校" },
  { id: "school-ends", hanzi: "放学", pinyin: "fàng xué", english: "school ends", audio: "放学" },
  { id: "dinner", hanzi: "吃晚饭", pinyin: "chī wǎn fàn", english: "have dinner", audio: "吃晚饭" },
  { id: "bedtime", hanzi: "睡觉", pinyin: "shuì jiào", english: "go to bed", audio: "睡觉" }
];

export const timeRoutineSentenceBuilds = [
  { itemId: "wake-up", hourChoices: [6, 7, 8, 9], action: "起床", actionPinyin: "qǐ chuáng", actionEnglish: "get up" },
  { itemId: "breakfast", hourChoices: [6, 7, 8, 9], action: "吃早饭", actionPinyin: "chī zǎo fàn", actionEnglish: "have breakfast" },
  { itemId: "school", hourChoices: [7, 8, 9, 10], action: "去学校", actionPinyin: "qù xué xiào", actionEnglish: "go to school" },
  { itemId: "lunch", hourChoices: [11, 12, 1, 2], action: "吃午饭", actionPinyin: "chī wǔ fàn", actionEnglish: "have lunch" },
  { itemId: "home", hourChoices: [1, 2, 3, 4], action: "放学", actionPinyin: "fàng xué", actionEnglish: "school ends" },
  { itemId: "dinner", hourChoices: [5, 6, 7, 8], action: "吃晚饭", actionPinyin: "chī wǎn fàn", actionEnglish: "have dinner" },
  { itemId: "bedtime", hourChoices: [8, 9, 10, 11], action: "睡觉", actionPinyin: "shuì jiào", actionEnglish: "go to bed" }
];

export const timeDateRoutineItems = [
  ["wake-up", "Wake up", "七点起床。", "qī diǎn qǐ chuáng.", "Wake up at 7:00.", "七点起床", "07am-lele-wake-up.webp"],
  ["breakfast", "Breakfast", "七点十五分吃早饭。", "qī diǎn shí wǔ fēn chī zǎo fàn.", "Have breakfast at 7:15.", "七点十五分吃早饭", "0715am-lele-having-breakfast.webp"],
  ["school", "School time", "八点去学校。", "bā diǎn qù xué xiào.", "Go to school at 8:00.", "八点去学校", "08am-go-to-school.webp"],
  ["writing", "Writing class", "十点上写字课。", "shí diǎn shàng xiě zì kè.", "Writing class at 10:00.", "十点上写字课", "10am-writing-class.webp"],
  ["lunch", "Lunch", "十二点吃午饭。", "shí èr diǎn chī wǔ fàn.", "Have lunch at 12:00.", "十二点吃午饭", "12pm-lunch-time.webp"],
  ["home", "After school", "两点半放学。", "liǎng diǎn bàn fàng xué.", "School ends at 2:30.", "两点半放学", "0230pm-school-dismissal.webp"],
  ["playground", "Playtime", "四点去操场玩。", "sì diǎn qù cāo chǎng wán.", "Play outside at 4:00.", "四点去操场玩", "04pm-playground.webp"],
  ["dinner", "Dinner", "六点吃晚饭。", "liù diǎn chī wǎn fàn.", "Have dinner at 6:00.", "六点吃晚饭", "06pm-family-dinner.webp"],
  ["tv", "TV time", "七点看电视。", "qī diǎn kàn diàn shì.", "Watch TV at 7:00.", "七点看电视", "07pm-tv-time.webp"],
  ["story", "Story time", "八点讲故事。", "bā diǎn jiǎng gù shì.", "Story time at 8:00.", "八点讲故事", "08pm-story-time.webp"],
  ["bedtime", "Bedtime", "九点睡觉。", "jiǔ diǎn shuì jiào.", "Go to bed at 9:00.", "九点睡觉", "09pm-bedtime.webp"]
].map(([id, title, hanzi, pinyin, english, audio, file]) => ({ id, title, hanzi, pinyin, english, audio, imagePath: `assets/illustrated-clock-routines/${file}` }));
