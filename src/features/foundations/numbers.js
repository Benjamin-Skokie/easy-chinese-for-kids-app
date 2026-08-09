export const numbersTopic = {
  id: "numbers",
  title: "Numbers",
  summary: "A stage-by-stage number path that grows from first counting to real-life number use.",
  progressLabel: "1A to 4A",
  iconText: "一二三",
  iconColor: "#be5b49",
  iconAccent: "#f3c977",
  iconTheme: "counting",
  focus: { hanzi: "一 二 三 四 五", pinyin: "yī, èr, sān, sì, wǔ", english: "one, two, three, four, five", audio: "一，二，三，四，五" },
  focusItems: [
    { id: "one", hanzi: "一", pinyin: "yī", english: "one", audio: "一" },
    { id: "two", hanzi: "二", pinyin: "èr", english: "two", audio: "二" },
    { id: "three", hanzi: "三", pinyin: "sān", english: "three", audio: "三" },
    { id: "four", hanzi: "四", pinyin: "sì", english: "four", audio: "四" },
    { id: "five", hanzi: "五", pinyin: "wǔ", english: "five", audio: "五" }
  ],
  parentGuide: "Use short rounds. Tap a number, hear it, then count real objects together like crackers, pencils, or toys.",
  cultureGuide: "Numbers connect easily to food, family, and festival routines. Counting dumplings, oranges, or mooncakes makes practice feel real.",
  activities: ["Tap to hear", "Count and say", "Match picture to number", "Listen and choose"],
  steps: [
    { book: "1A", lesson: 1, title: "Numbers (1)", note: "Learn 1-5 with first counting practice." },
    { book: "1A", lesson: 2, title: "Numbers (2)", note: "Extend to 6-10." },
    { book: "1A", lesson: 3, title: "Numbers (3)", note: "Move into 11-20." },
    { book: "2A", lesson: 1, title: "Numbers", note: "Grow to 21-40." },
    { book: "3A", lesson: 1, title: "Numbers", note: "Grow to 41-100." },
    { book: "4A", lesson: 1, title: "Telephone numbers", note: "Use numbers in a real-life format." }
  ]
};

export const multiplicationRhymeTopic = {
  id: "multiplication-rhyme",
  title: "99 Multiplication Rhyme",
  summary: "Learn the classic Chinese multiplication lines with tap-to-hear rhythm practice.",
  progressLabel: "Special topic",
  iconText: "九九",
  iconColor: "#a15e45",
  iconAccent: "#f0c36d",
  iconTheme: "rhyme",
  focus: { hanzi: "九九八十一", pinyin: "jiǔ jiǔ bā shí yī", english: "9 x 9 = 81", audio: "九九八十一" },
  focusItems: [],
  interactiveScene: "multiplication-rhyme",
  parentGuide: "Use short, rhythmic repetition. Tap one line, hear it together, then repeat it with a steady beat or clap.",
  cultureGuide: "The 九九乘法口诀 is a familiar memorization pattern in Chinese learning. It is valued because the rhythm makes multiplication facts stick.",
  activities: ["Tap line to hear", "Repeat with rhythm", "Learn one table at a time", "Build multiplication confidence"],
  steps: []
};


export const numberEnglishBase = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty"
];

export const numberDigitMap = {
  0: { hanzi: "零", pinyin: "líng" },
  1: { hanzi: "一", pinyin: "yī" },
  2: { hanzi: "二", pinyin: "èr" },
  3: { hanzi: "三", pinyin: "sān" },
  4: { hanzi: "四", pinyin: "sì" },
  5: { hanzi: "五", pinyin: "wǔ" },
  6: { hanzi: "六", pinyin: "liù" },
  7: { hanzi: "七", pinyin: "qī" },
  8: { hanzi: "八", pinyin: "bā" },
  9: { hanzi: "九", pinyin: "jiǔ" },
  10: { hanzi: "十", pinyin: "shí" }
};

export const numberStages = [
  {
    id: "1a-1",
    bookId: "1a",
    lesson: 1,
    title: "1 to 5",
    summary: "Start with the first counting words and match them to real objects.",
    start: 1,
    end: 5,
    practicePrompt: "Count animals, fingers, or blocks from one to five.",
    visualEmojis: ["🐥", "🐰", "🦆", "🐻", "🐸"],
    visualLabel: "chicks"
  },
  {
    id: "1a-2",
    bookId: "1a",
    lesson: 2,
    title: "6 to 10",
    summary: "Add six to ten, while still keeping one to five warm through movement.",
    start: 6,
    end: 10,
    practicePrompt: "Clap for one to five and stamp for six to ten.",
    visualEmojis: ["🧸", "🚗", "🪀", "🧩", "⚽"],
    visualLabel: "toys"
  },
  {
    id: "1a-3",
    bookId: "1a",
    lesson: 3,
    title: "11 to 20",
    summary: "Move into teen numbers with card finding, counting, and sequence work.",
    start: 11,
    end: 20,
    practicePrompt: "Point to the right number card and count objects up to twenty.",
    visualEmojis: ["🍦", "🍎", "🍓", "🧁", "🍊"],
    visualLabel: "ice creams"
  },
  {
    id: "2a-1",
    bookId: "2a",
    lesson: 1,
    title: "21 to 40",
    summary: "Grow into larger counting while keeping the tens pattern clear.",
    start: 21,
    end: 40,
    practicePrompt: "Read the tens pattern first, then add the last digit.",
    visualEmojis: ["🚗", "🚌", "🚲", "🚕", "🚙"],
    visualLabel: "cars"
  },
  {
    id: "3a-1",
    bookId: "3a",
    lesson: 1,
    title: "41 to 100",
    summary: "Extend number fluency into bigger sets and longer counting runs.",
    start: 41,
    end: 100,
    practicePrompt: "Read by tens first, then slow down and notice the ones.",
    visualEmojis: ["⭐", "🌟", "✨", "💫", "🪐"],
    visualLabel: "stars"
  },
  {
    id: "4a-1",
    bookId: "4a",
    lesson: 1,
    title: "Telephone numbers",
    summary: "Use number reading in a real-life sequence instead of isolated counting.",
    start: 0,
    end: 9,
    practicePrompt: "Say each digit clearly, one by one, in a phone-number rhythm.",
    telephoneMode: true,
    visualEmojis: ["☎️", "📞", "🔢", "🎧", "📟"],
    visualLabel: "phone digits"
  }
];

export const telephonePractice = {
  question: {
    hanzi: "你的电话号码是多少？",
    pinyin: "nǐ de diàn huà hào mǎ shì duō shao?",
    english: "What is your phone number?",
    audio: "你的电话号码是多少"
  },
  answer: {
    hanzi: "我的电话号码是六八二四九七三一三二。",
    pinyin: "wǒ de diàn huà hào mǎ shì liù bā èr sì jiǔ qī sān yī sān èr.",
    english: "My phone number is 6824973132.",
    audio: "我的电话号码是六八二四九七三一三二"
  },
  digits: ["六", "八", "二", "四", "九", "七", "三", "一", "三", "二"]
};
export function numberEnglish(value) {
  if (value <= 20) {
    return numberEnglishBase[value];
  }

  if (value < 100) {
    const tensWords = {
      20: "twenty",
      30: "thirty",
      40: "forty",
      50: "fifty",
      60: "sixty",
      70: "seventy",
      80: "eighty",
      90: "ninety"
    };
    const tens = Math.floor(value / 10) * 10;
    const ones = value % 10;
    return ones === 0 ? tensWords[tens] : `${tensWords[tens]}-${numberEnglishBase[ones]}`;
  }

  if (value === 100) {
    return "one hundred";
  }

  return String(value);
}

export function numberHanzi(value) {
  if (value <= 10) {
    return numberDigitMap[value].hanzi;
  }

  if (value < 20) {
    return `十${numberDigitMap[value % 10].hanzi}`;
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0
      ? `${numberDigitMap[tens].hanzi}十`
      : `${numberDigitMap[tens].hanzi}十${numberDigitMap[ones].hanzi}`;
  }

  if (value === 100) {
    return "一百";
  }

  return String(value);
}

export function numberPinyin(value) {
  if (value <= 10) {
    return numberDigitMap[value].pinyin;
  }

  if (value < 20) {
    return `shí ${numberDigitMap[value % 10].pinyin}`;
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0
      ? `${numberDigitMap[tens].pinyin} shí`
      : `${numberDigitMap[tens].pinyin} shí ${numberDigitMap[ones].pinyin}`;
  }

  if (value === 100) {
    return "yì bǎi";
  }

  return String(value);
}

export function buildNumberItem(value) {
  return {
    id: `num-${value}`,
    value,
    hanzi: numberHanzi(value),
    pinyin: numberPinyin(value),
    english: numberEnglish(value),
    audio: numberHanzi(value)
  };
}

export function buildMultiplicationRhymeItems() {
  const items = [];
  for (let first = 1; first <= 9; first += 1) {
    for (let second = first; second <= 9; second += 1) {
      const product = first * second;
      const usesDe = product < 10;
      const hanzi = usesDe
        ? `${numberHanzi(first)}${numberHanzi(second)}得${numberHanzi(product)}`
        : `${numberHanzi(first)}${numberHanzi(second)}${numberHanzi(product)}`;
      const pinyin = usesDe
        ? `${numberPinyin(first)} ${numberPinyin(second)} dé ${numberPinyin(product)}`
        : `${numberPinyin(first)} ${numberPinyin(second)} ${numberPinyin(product)}`;
      items.push({
        id: `times-${first}-${second}`,
        hanzi,
        pinyin,
        english: `${first} x ${second} = ${product}`,
        audio: hanzi,
        first,
        second,
        product
      });
    }
  }
  return items;
}

multiplicationRhymeTopic.focusItems = buildMultiplicationRhymeItems();
