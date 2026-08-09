export const timeDateWeekItems = [
  ["monday", "星期一", "xīng qī yī", "Monday", "星期一，我们坐校车去学校。", "xīng qī yī, wǒ men zuò xiào chē qù xué xiào.", "On Monday, we take the school bus to school.", "Monday.webp"],
  ["tuesday", "星期二", "xīng qī èr", "Tuesday", "星期二，我们上体育课。", "xīng qī èr, wǒ men shàng tǐ yù kè.", "On Tuesday, we have PE class.", "Tuesday.webp"],
  ["wednesday", "星期三", "xīng qī sān", "Wednesday", "星期三，我们上美术课。", "xīng qī sān, wǒ men shàng měi shù kè.", "On Wednesday, we have art class.", "Wednesday.webp"],
  ["thursday", "星期四", "xīng qī sì", "Thursday", "星期四，我们上音乐课。", "xīng qī sì, wǒ men shàng yīn yuè kè.", "On Thursday, we have music class.", "Thursday.webp", "星期四，我们上音月课。"],
  ["friday", "星期五", "xīng qī wǔ", "Friday", "星期五，我们去图书馆看书。", "xīng qī wǔ, wǒ men qù tú shū guǎn kàn shū.", "On Friday, we read at the library.", "Friday.webp"],
  ["saturday", "星期六", "xīng qī liù", "Saturday", "星期六，我们去公园骑自行车。", "xīng qī liù, wǒ men qù gōng yuán qí zì xíng chē.", "On Saturday, we ride bikes in the park.", "Saturday.webp"],
  ["sunday", "星期天", "xīng qī tiān", "Sunday", "星期天，我们在家看电影。", "xīng qī tiān, wǒ men zài jiā kàn diàn yǐng.", "On Sunday, we watch a movie at home.", "Sunday.webp"]
].map(([id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, file, audio]) => ({ id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, audio: audio ?? context, imagePath: `assets/illustrated-day-of-week/${file}` }));

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

export const timeDateDateItems = [
  { id: "date-board", hanzi: "几月几号？", pinyin: "jǐ yuè jǐ hào?", english: "What month and day?", context: "看日历，可以知道几月几号。", audio: "几月几号", imagePath: "assets/illustrated-dates/calendar-example-dates-board.webp" },
  { id: "new-year", hanzi: "一月一号", pinyin: "yī yuè yī hào", english: "January first", context: "一月一号是新年。", audio: "一月一号是新年", imagePath: "assets/illustrated-dates/january-first-new-year-calendar.webp" },
  { id: "field-trip", hanzi: "五月二十号", pinyin: "wǔ yuè èr shí hào", english: "May twentieth", context: "五月二十号，我们去春游。", audio: "五月二十号我们去春游", imagePath: "assets/illustrated-dates/may-twentieth-field-trip-calendar.webp" },
  { id: "christmas", hanzi: "十二月二十五号", pinyin: "shí èr yuè èr shí wǔ hào", english: "December twenty-fifth", context: "十二月二十五号是圣诞节。", audio: "十二月二十五号是圣诞节", imagePath: "assets/illustrated-dates/december-twenty-fifth-christmas-calendar.webp" },
  { id: "birthday", hanzi: "生日快乐！", pinyin: "shēng rì kuài lè!", english: "Happy birthday!", context: "今天是我的生日。生日快乐！", audio: "今天是我的生日生日快乐", imagePath: "assets/illustrated-dates/birthday-party-scene.webp" }
];

export const timeDateMonthItems = [
  ["January", "一月", "yī yuè", "一月，新年的第一个月。", "yī yuè, xīn nián de dì yī ge yuè.", "January: the first month of the new year."],
  ["February", "二月", "èr yuè", "二月，中国新年。", "èr yuè, Zhōng guó xīn nián.", "February: Chinese New Year."],
  ["March", "三月", "sān yuè", "三月，圣帕特里克节。", "sān yuè, Shèng pà tè lǐ kè Jié.", "March: St. Patrick's Day."],
  ["April", "四月", "sì yuè", "四月，树开始发芽。", "sì yuè, shù kāi shǐ fā yá.", "In April, trees start to bud."],
  ["May", "五月", "wǔ yuè", "五月，母亲节。", "wǔ yuè, Mǔ qīn Jié.", "May: Mother's Day."],
  ["June", "六月", "liù yuè", "六月，暑假快到了。", "liù yuè, shǔ jià kuài dào le.", "In June, summer vacation is coming soon."],
  ["July", "七月", "qī yuè", "七月，去海边玩。", "qī yuè, qù hǎi biān wán.", "In July, go to the beach."],
  ["August", "八月", "bā yuè", "八月，去度假。", "bā yuè, qù dù jià.", "In August, go on vacation."],
  ["September", "九月", "jiǔ yuè", "九月，开学了。", "jiǔ yuè, kāi xué le.", "In September, school starts."],
  ["October", "十月", "shí yuè", "十月，树叶变红了。", "shí yuè, shù yè biàn hóng le.", "In October, leaves turn red."],
  ["November", "十一月", "shí yī yuè", "十一月，感恩节。", "shí yī yuè, Gǎn ēn Jié.", "Thanksgiving is in November."],
  ["December", "十二月", "shí èr yuè", "十二月，去滑雪。", "shí èr yuè, qù huá xuě.", "In December, go skiing."]
].map(([english, hanzi, pinyin, context, contextPinyin, contextEnglish]) => ({ id: english.toLowerCase(), hanzi, pinyin, english, context, contextPinyin, contextEnglish, hideLabelHanzi: true, hideLabelDetails: true, audio: context, imagePath: `assets/illustrated-months-of-year/${english}.webp` }));

export const timeDateRoutineItems = [
  ["wake-up", "七点起床。", "qī diǎn qǐ chuáng.", "Wake up at 7:00.", "七点起床", "07am-lele-wake-up.webp"],
  ["breakfast", "七点十五分吃早饭。", "qī diǎn shí wǔ fēn chī zǎo fàn.", "Have breakfast at 7:15.", "七点十五分吃早饭", "0715am-lele-having-breakfast.webp"],
  ["school", "八点去学校。", "bā diǎn qù xué xiào.", "Go to school at 8:00.", "八点去学校", "08am-go-to-school.webp"],
  ["writing", "十点上写字课。", "shí diǎn shàng xiě zì kè.", "Writing class at 10:00.", "十点上写字课", "10am-writing-class.webp"],
  ["lunch", "十二点吃午饭。", "shí èr diǎn chī wǔ fàn.", "Have lunch at 12:00.", "十二点吃午饭", "12pm-lunch-time.webp"],
  ["home", "两点半放学。", "liǎng diǎn bàn fàng xué.", "School ends at 2:30.", "两点半放学", "0230pm-school-dismissal.webp"],
  ["playground", "四点去操场玩。", "sì diǎn qù cāo chǎng wán.", "Play outside at 4:00.", "四点去操场玩", "04pm-playground.webp"],
  ["dinner", "六点吃晚饭。", "liù diǎn chī wǎn fàn.", "Have dinner at 6:00.", "六点吃晚饭", "06pm-family-dinner.webp"],
  ["tv", "七点看电视。", "qī diǎn kàn diàn shì.", "Watch TV at 7:00.", "七点看电视", "07pm-tv-time.webp"],
  ["story", "八点讲故事。", "bā diǎn jiǎng gù shì.", "Story time at 8:00.", "八点讲故事", "08pm-story-time.webp"],
  ["bedtime", "九点睡觉。", "jiǔ diǎn shuì jiào.", "Go to bed at 9:00.", "九点睡觉", "09pm-bedtime.webp"]
].map(([id, hanzi, pinyin, english, audio, file]) => ({ id, hanzi, pinyin, english, audio, imagePath: `assets/illustrated-clock-routines/${file}` }));

export const datePracticeItems = [
  { id: "date-new-year", hanzi: "一月一号", pinyin: "yī yuè yī hào", english: "January first", audio: "一月一号是新年", eventHanzi: "新年", eventPinyin: "xīn nián", eventEnglish: "New Year" },
  { id: "date-chinese-new-year", hanzi: "二月", pinyin: "èr yuè", english: "February", audio: "二月中国新年", eventHanzi: "中国新年", eventPinyin: "Zhōng guó xīn nián", eventEnglish: "Chinese New Year" },
  { id: "date-field-trip", hanzi: "五月二十号", pinyin: "wǔ yuè èr shí hào", english: "May twentieth", audio: "五月二十号我们去春游", eventHanzi: "春游", eventPinyin: "chūn yóu", eventEnglish: "Field trip" },
  { id: "date-christmas", hanzi: "十二月二十五号", pinyin: "shí èr yuè èr shí wǔ hào", english: "December twenty-fifth", audio: "十二月二十五号是圣诞节", eventHanzi: "圣诞节", eventPinyin: "Shèng dàn Jié", eventEnglish: "Christmas" },
  { id: "birthday-wish", hanzi: "祝你生日快乐！", pinyin: "zhù nǐ shēng rì kuài lè!", english: "Happy birthday!", audio: "祝你生日快乐" },
  { id: "birthday-party", hanzi: "生日会上有礼物。", pinyin: "shēng rì huì shàng yǒu lǐ wù.", english: "There are presents at a birthday party.", audio: "生日会上有礼物" }
];

