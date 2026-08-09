export const timeDateWeekItems = [
  ["monday", "星期一", "xīng qī yī", "Monday", "星期一，我们坐校车去学校。", "xīng qī yī, wǒ men zuò xiào chē qù xué xiào.", "On Monday, we take the school bus to school.", "Monday.webp"],
  ["tuesday", "星期二", "xīng qī èr", "Tuesday", "星期二，我们上体育课。", "xīng qī èr, wǒ men shàng tǐ yù kè.", "On Tuesday, we have PE class.", "Tuesday.webp"],
  ["wednesday", "星期三", "xīng qī sān", "Wednesday", "星期三，我们上美术课。", "xīng qī sān, wǒ men shàng měi shù kè.", "On Wednesday, we have art class.", "Wednesday.webp"],
  ["thursday", "星期四", "xīng qī sì", "Thursday", "星期四，我们上音乐课。", "xīng qī sì, wǒ men shàng yīn yuè kè.", "On Thursday, we have music class.", "Thursday.webp", "星期四，我们上音月课。"],
  ["friday", "星期五", "xīng qī wǔ", "Friday", "星期五，我们去图书馆看书。", "xīng qī wǔ, wǒ men qù tú shū guǎn kàn shū.", "On Friday, we read at the library.", "Friday.webp"],
  ["saturday", "星期六", "xīng qī liù", "Saturday", "星期六，我们去公园骑自行车。", "xīng qī liù, wǒ men qù gōng yuán qí zì xíng chē.", "On Saturday, we ride bikes in the park.", "Saturday.webp"],
  ["sunday", "星期天", "xīng qī tiān", "Sunday", "星期天，我们在家看电影。", "xīng qī tiān, wǒ men zài jiā kàn diàn yǐng.", "On Sunday, we watch a movie at home.", "Sunday.webp"]
].map(([id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, file, audio]) => ({ id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, audio: audio ?? context, imagePath: `assets/illustrated-day-of-week/${file}` }));
