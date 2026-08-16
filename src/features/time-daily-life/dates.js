export const timeDateDateItems = [
  { id: "date-board", hanzi: "几月几号？", pinyin: "jǐ yuè jǐ hào?", english: "What month and day?", context: "看日历，可以知道几月几号。", contextPinyin: "kàn rì lì, kě yǐ zhī dào jǐ yuè jǐ hào.", contextEnglish: "Look at a calendar to find the month and day.", audio: "几月几号", imagePath: "assets/illustrated-dates/calendar-example-dates-board.webp" },
  { id: "new-year", hanzi: "一月一号", pinyin: "yī yuè yī hào", english: "January first", context: "一月一号是新年。", contextPinyin: "yī yuè yī hào shì xīn nián.", contextEnglish: "January first is New Year's Day.", audio: "一月一号是新年", imagePath: "assets/illustrated-dates/january-first-new-year-calendar.webp" },
  { id: "field-trip", hanzi: "五月二十号", pinyin: "wǔ yuè èr shí hào", english: "May twentieth", context: "五月二十号，我们去春游。", contextPinyin: "wǔ yuè èr shí hào, wǒ men qù chūn yóu.", contextEnglish: "On May twentieth, we go on a spring outing.", audio: "五月二十号我们去春游", imagePath: "assets/illustrated-dates/may-twentieth-field-trip-calendar.webp" },
  { id: "christmas", hanzi: "十二月二十五号", pinyin: "shí èr yuè èr shí wǔ hào", english: "December twenty-fifth", context: "十二月二十五号是圣诞节。", contextPinyin: "shí èr yuè èr shí wǔ hào shì shèng dàn jié.", contextEnglish: "December twenty-fifth is Christmas.", audio: "十二月二十五号是圣诞节", imagePath: "assets/illustrated-dates/december-twenty-fifth-christmas-calendar.webp" },
  { id: "birthday", hanzi: "生日快乐！", pinyin: "shēng rì kuài lè!", english: "Happy birthday!", context: "今天是我的生日。生日快乐！", contextPinyin: "jīn tiān shì wǒ de shēng rì. shēng rì kuài lè!", contextEnglish: "Today is my birthday. Happy birthday!", audio: "今天是我的生日生日快乐", imagePath: "assets/illustrated-dates/birthday-party-scene.webp" }
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

export const datePracticeItems = [
  { id: "date-new-year", hanzi: "一月一号", pinyin: "yī yuè yī hào", english: "January first", audio: "一月一号是新年", eventHanzi: "新年", eventPinyin: "xīn nián", eventEnglish: "New Year" },
  { id: "date-chinese-new-year", hanzi: "二月", pinyin: "èr yuè", english: "February", audio: "二月中国新年", eventHanzi: "中国新年", eventPinyin: "Zhōng guó xīn nián", eventEnglish: "Chinese New Year" },
  { id: "date-field-trip", hanzi: "五月二十号", pinyin: "wǔ yuè èr shí hào", english: "May twentieth", audio: "五月二十号我们去春游", eventHanzi: "春游", eventPinyin: "chūn yóu", eventEnglish: "Field trip" },
  { id: "date-christmas", hanzi: "十二月二十五号", pinyin: "shí èr yuè èr shí wǔ hào", english: "December twenty-fifth", audio: "十二月二十五号是圣诞节", eventHanzi: "圣诞节", eventPinyin: "Shèng dàn Jié", eventEnglish: "Christmas" },
  { id: "birthday-wish", hanzi: "祝你生日快乐！", pinyin: "zhù nǐ shēng rì kuài lè!", english: "Happy birthday!", audio: "祝你生日快乐" },
  { id: "birthday-party", hanzi: "生日会上有礼物。", pinyin: "shēng rì huì shàng yǒu lǐ wù.", english: "There are presents at a birthday party.", audio: "生日会上有礼物" }
];
