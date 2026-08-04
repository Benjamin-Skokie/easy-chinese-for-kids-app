const topicData = [
  {
    id: "numbers",
    title: "Numbers",
    summary: "A stage-by-stage number path that grows from first counting to real-life number use.",
    progressLabel: "1A to 4A",
    iconText: "一二三",
    iconColor: "#be5b49",
    iconAccent: "#f3c977",
    iconTheme: "counting",
    focus: {
      hanzi: "一 二 三 四 五",
      pinyin: "yī, èr, sān, sì, wǔ",
      english: "one, two, three, four, five",
      audio: "一，二，三，四，五"
    },
    focusItems: [
      { id: "one", hanzi: "一", pinyin: "yī", english: "one", audio: "一" },
      { id: "two", hanzi: "二", pinyin: "èr", english: "two", audio: "二" },
      { id: "three", hanzi: "三", pinyin: "sān", english: "three", audio: "三" },
      { id: "four", hanzi: "四", pinyin: "sì", english: "four", audio: "四" },
      { id: "five", hanzi: "五", pinyin: "wǔ", english: "five", audio: "五" }
    ],
    parentGuide:
      "Use short rounds. Tap a number, hear it, then count real objects together like crackers, pencils, or toys.",
    cultureGuide:
      "Numbers connect easily to food, family, and festival routines. Counting dumplings, oranges, or mooncakes makes practice feel real.",
    activities: ["Tap to hear", "Count and say", "Match picture to number", "Listen and choose"],
    steps: [
      { book: "1A", lesson: 1, title: "Numbers (1)", note: "Learn 1-5 with first counting practice." },
      { book: "1A", lesson: 2, title: "Numbers (2)", note: "Extend to 6-10." },
      { book: "1A", lesson: 3, title: "Numbers (3)", note: "Move into 11-20." },
      { book: "2A", lesson: 1, title: "Numbers", note: "Grow to 21-40." },
      { book: "3A", lesson: 1, title: "Numbers", note: "Grow to 41-100." },
      { book: "4A", lesson: 1, title: "Telephone numbers", note: "Use numbers in a real-life format." }
    ]
  },
  {
    id: "multiplication-rhyme",
    title: "99 Multiplication Rhyme",
    summary: "Learn the classic Chinese multiplication lines with tap-to-hear rhythm practice.",
    progressLabel: "Special topic",
    iconText: "九九",
    iconColor: "#a15e45",
    iconAccent: "#f0c36d",
    iconTheme: "rhyme",
    focus: {
      hanzi: "九九八十一",
      pinyin: "jiǔ jiǔ bā shí yī",
      english: "9 x 9 = 81",
      audio: "九九八十一"
    },
    focusItems: [],
    interactiveScene: "multiplication-rhyme",
    parentGuide:
      "Use short, rhythmic repetition. Tap one line, hear it together, then repeat it with a steady beat or clap.",
    cultureGuide:
      "The 九九乘法口诀 is a familiar memorization pattern in Chinese learning. It is valued because the rhythm makes multiplication facts stick.",
    activities: ["Tap line to hear", "Repeat with rhythm", "Learn one table at a time", "Build multiplication confidence"],
    steps: []
  },
  {
    id: "greetings",
    title: "Greetings",
    summary: "Simple social language children can use right away in class and at home.",
    progressLabel: "1A foundation",
    iconText: "你好",
    iconColor: "#d2874f",
    iconAccent: "#f7d98f",
    iconTheme: "greeting",
    focus: {
      hanzi: "你好！",
      pinyin: "nǐ hǎo!",
      english: "Hello!",
      audio: "你好"
    },
    focusItems: [
      { id: "hello", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { id: "you-casual", hanzi: "你", pinyin: "nǐ", english: "you", audio: "你" },
      { id: "you-polite", hanzi: "您", pinyin: "nín", english: "you (polite)", audio: "您" },
      {
        id: "teacher-hello",
        hanzi: "李老师，您好！",
        pinyin: "Lǐ lǎo shī, nín hǎo!",
        english: "Hello, Teacher Li!",
        audio: "李老师您好"
      },
      { id: "good-morning", hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
      { id: "goodbye", hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
      { id: "teacher", hanzi: "老师", pinyin: "lǎo shī", english: "teacher", audio: "老师" },
      { id: "surname-li", hanzi: "李", pinyin: "Lǐ", english: "Li (surname)", audio: "李" }
    ],
    interactiveScene: "greetings-conversation",
    parentGuide:
      "Pair the phrase with movement. Wave, smile, and say it together. Young children remember social language best when it feels physical.",
    cultureGuide:
      "Greetings are a gentle bridge into relationship-focused language. The point is warmth and confidence, not a long explanation.",
    activities: ["Tap to hear", "Echo and repeat", "Choose the greeting", "Role-play turns"],
    steps: [{ book: "1A", lesson: 4, title: "Hello!", note: "Begin with friendly greetings." }]
  },
  {
    id: "polite-words",
    title: "Polite Words",
    summary: "Useful everyday phrases like thank you and simple requests.",
    progressLabel: "1A to 3A",
    iconText: "谢谢",
    iconColor: "#8f6c46",
    iconAccent: "#e6c77e",
    iconTheme: "polite",
    focus: {
      hanzi: "谢谢你！",
      pinyin: "xiè xie nǐ!",
      english: "Thank you!",
      audio: "谢谢你"
    },
    focusItems: [
      { id: "thank-you", hanzi: "谢谢你！", pinyin: "xiè xie nǐ!", english: "Thank you!", audio: "谢谢你" },
      { id: "youre-welcome", hanzi: "不客气。", pinyin: "bú kè qi.", english: "You're welcome.", audio: "不客气" },
      { id: "sorry", hanzi: "对不起。", pinyin: "duì bu qǐ.", english: "I'm sorry.", audio: "对不起" },
      { id: "never-mind", hanzi: "没关系。", pinyin: "méi guān xi.", english: "Never mind.", audio: "没关系" },
      { id: "please", hanzi: "请", pinyin: "qǐng", english: "please", audio: "请" }
    ],
    interactiveScene: "polite-phrases",
    parentGuide:
      "Use these during real routines: handing snacks, passing pencils, cleaning up, or asking for help.",
    cultureGuide:
      "Polite language works best when tied to real exchanges. A quick classroom or home routine is better than a long explanation.",
    activities: ["Tap to hear", "Match phrase to situation", "Listen and choose", "Speak after me"],
    steps: [
      { book: "1A", lesson: 5, title: "Thank you!", note: "Start with a core manners phrase." },
      { book: "3A", lesson: 6, title: "Request", note: "Expand polite language into asking for things." }
    ]
  },
  {
    id: "introductions",
    title: "Names & Introductions",
    summary: "Meet a new friend, ask a name, and answer with a warm first self-introduction.",
    progressLabel: "1A to 3A",
    iconText: "我叫",
    iconColor: "#7e8f63",
    iconAccent: "#d9e49a",
    iconTheme: "introductions",
    focus: {
      hanzi: "我叫安安。",
      pinyin: "wǒ jiào Ān'ān.",
      english: "My name is Anan.",
      audio: "我叫安安"
    },
    focusItems: [
      { id: "ask-name", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { id: "my-name-anan", hanzi: "我叫安安。", pinyin: "wǒ jiào Ān'ān.", english: "My name is Anan.", audio: "我叫安安" },
      { id: "my-name-tiantian", hanzi: "我叫天天。", pinyin: "wǒ jiào Tiān tiān.", english: "My name is Tiantian.", audio: "我叫天天" },
      { id: "my-name-sisi", hanzi: "我叫思思。", pinyin: "wǒ jiào Sī si.", english: "My name is Sisi.", audio: "我叫思思" },
      { id: "my-name-lele", hanzi: "我叫乐乐。", pinyin: "wǒ jiào Lè le.", english: "My name is Lele.", audio: "我叫乐乐" },
      { id: "me-word", hanzi: "我", pinyin: "wǒ", english: "I; me", audio: "我" },
      { id: "call-word", hanzi: "叫", pinyin: "jiào", english: "to be called", audio: "叫" },
      { id: "what-word", hanzi: "什么", pinyin: "shén me", english: "what", audio: "什么" },
      { id: "name-word", hanzi: "名字", pinyin: "míng zi", english: "name", audio: "名字" }
    ],
    interactiveScene: "introductions-conversation",
    parentGuide:
      "Practice the whole mini-conversation first: 你好, 你叫什么名字? 我叫... Then pause after 我叫 and let the child fill in their own name.",
    cultureGuide:
      "Children connect strongly to names and faces, so recurring kid characters help this lesson feel social instead of abstract.",
    activities: ["Tap to hear", "Play the conversation", "Say your own name", "Who said their name?"],
    steps: [
      { book: "1A", lesson: 6, title: "What's your name?", note: "Learn a first self-introduction pattern." },
      { book: "2A", lesson: 3, title: "Good friends", note: "Use names and social language in a wider context." },
      { book: "3A", lesson: 5, title: "Nationality", note: "Add more identity language." }
    ]
  },
  {
    id: "age",
    title: "Age",
    summary: "A first identity lesson: say age, then say what grade you are in.",
    progressLabel: "1A to 3A",
    iconText: "五岁",
    iconColor: "#7998a5",
    iconAccent: "#f3d88a",
    iconTheme: "birthday",
    focus: {
      hanzi: "我五岁。",
      pinyin: "wǒ wǔ suì.",
      english: "I am five years old.",
      audio: "我五岁"
    },
    focusItems: [
      { id: "ask-age", hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { id: "age-five", hanzi: "我五岁。", pinyin: "wǒ wǔ suì.", english: "I am five years old.", audio: "我五岁" },
      { id: "age-six", hanzi: "我六岁。", pinyin: "wǒ liù suì.", english: "I am six years old.", audio: "我六岁" },
      { id: "age-seven", hanzi: "我七岁。", pinyin: "wǒ qī suì.", english: "I am seven years old.", audio: "我七岁" },
      { id: "ask-grade", hanzi: "你上几年级？", pinyin: "nǐ shàng jǐ nián jí?", english: "What grade are you in?", audio: "你上几年级" },
      { id: "grade-one", hanzi: "我上一年级。", pinyin: "wǒ shàng yì nián jí.", english: "I am in first grade.", audio: "我上一年级" },
      { id: "me-age-word", hanzi: "我", pinyin: "wǒ", english: "I; me", audio: "我" },
      { id: "how-many-age-word", hanzi: "几", pinyin: "jǐ", english: "how many", audio: "几" },
      { id: "age-word", hanzi: "岁", pinyin: "suì", english: "years old", audio: "岁" },
      { id: "attend-word", hanzi: "上", pinyin: "shàng", english: "to attend; to be in", audio: "上" },
      { id: "grade-word", hanzi: "年级", pinyin: "nián jí", english: "grade; school year", audio: "年级" }
    ],
    interactiveScene: "age-conversation",
    parentGuide:
      "Practice with the child's real age and real school year. Start with the whole exchange, then pause after 我 and let the child fill in the number or grade.",
    cultureGuide:
      "This lesson often works as an early identity bundle: name, age, and school year all come together in one short getting-to-know-you conversation.",
    activities: ["Tap to hear", "Fill in my age", "Say my grade", "Listen and point"],
    steps: [
      { book: "1A", lesson: 7, title: "I'm 5 years old", note: "Learn the first age sentence pattern." },
      { book: "3A", lesson: 3, title: "Happy birthday!", note: "Reconnect age with date and birthday language." }
    ]
  },
  {
    id: "family",
    title: "Family",
    summary: "Start with love and belonging, then sort family words by older and younger.",
    progressLabel: "1B to 3A",
    iconText: "家人",
    iconColor: "#aa7051",
    iconAccent: "#f1d29b",
    iconTheme: "family",
    focus: {
      hanzi: "爸爸妈妈爱我。",
      pinyin: "bà ba mā ma ài wǒ.",
      english: "Dad and Mum love me.",
      audio: "爸爸妈妈爱我"
    },
    focusItems: [
      { id: "parents-love-me", hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
      { id: "i-love-dad", hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
      { id: "i-love-mom", hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" },
      { id: "mom-word", hanzi: "妈妈", pinyin: "mā ma", english: "mum", audio: "妈妈" },
      { id: "dad-word", hanzi: "爸爸", pinyin: "bà ba", english: "dad", audio: "爸爸" },
      { id: "older-brother-word", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
      { id: "younger-brother-word", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
      { id: "older-sister-word", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
      { id: "younger-sister-word", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
    ],
    interactiveScene: "family-home",
    parentGuide:
      "Use one warm family picture for 爸爸妈妈爱我, then switch quickly to family photos, pointing, and real names.",
    cultureGuide:
      "This early family lesson works best when love words and family roles stay close to the child's real home life.",
    activities: ["Tap to hear", "Match family member", "Listen and choose", "Talk about my family"],
    steps: [
      { book: "1B", lesson: 1, title: "Mum and dad", note: "Start with immediate family." },
      { book: "1B", lesson: 2, title: "Brothers and sisters", note: "Expand the family set." },
      { book: "2A", lesson: 2, title: "Two younger brothers", note: "Add sibling language in sentences." },
      { book: "3A", lesson: 4, title: "Family", note: "Widen the family topic." }
    ]
  },
  {
    id: "body",
    title: "Body",
    summary: "A visual topic that works well for touch interaction and movement.",
    progressLabel: "1B core topic",
    iconText: "手眼",
    iconColor: "#5f8f8a",
    focus: {
      hanzi: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚",
      pinyin: "tóu, é tóu, tóu fa, yǎn jing, ěr duo, bí zi, zuǐ ba, bó zi, shǒu bì, shǒu, tuǐ, jiǎo",
      english: "head, forehead, hair, eyes, ears, nose, mouth, neck, arm, hand, leg, foot",
      audio: "头，额头，头发，眼睛，耳朵，鼻子，嘴巴，脖子，手臂，手，腿，脚"
    },
    focusItems: [
      { id: "head", hanzi: "头", pinyin: "tóu", english: "head", audio: "头" },
      { id: "forehead", hanzi: "额头", pinyin: "é tóu", english: "forehead", audio: "额头" },
      { id: "hair", hanzi: "头发", pinyin: "tóu fa", english: "hair", audio: "头发" },
      { id: "eyes", hanzi: "眼睛", pinyin: "yǎn jing", english: "eyes", audio: "眼睛" },
      { id: "ears", hanzi: "耳朵", pinyin: "ěr duo", english: "ears", audio: "耳朵" },
      { id: "nose", hanzi: "鼻子", pinyin: "bí zi", english: "nose", audio: "鼻子" },
      { id: "mouth", hanzi: "嘴巴", pinyin: "zuǐ ba", english: "mouth", audio: "嘴巴" },
      { id: "neck", hanzi: "脖子", pinyin: "bó zi", english: "neck", audio: "脖子" },
      { id: "arm", hanzi: "手臂", pinyin: "shǒu bì", english: "arm", audio: "手臂" },
      { id: "hand", hanzi: "手", pinyin: "shǒu", english: "hand", audio: "手" },
      { id: "leg", hanzi: "腿", pinyin: "tuǐ", english: "leg", audio: "腿" },
      { id: "foot", hanzi: "脚", pinyin: "jiǎo", english: "foot", audio: "脚" }
    ],
    interactiveScene: "body-face",
    parentGuide:
      "Tap a body word, hear it together, then point to the same body part on yourself or on the character.",
    cultureGuide:
      "Body vocabulary is simple to act out, so it is a good topic for young beginners who are still building confidence.",
    activities: ["Tap word to hear", "See the body part glow", "Listen and point", "Picture matching"],
    steps: [
      { book: "1B", lesson: 3, title: "Parts of the body (1)", note: "Start with the first body words." },
      { book: "1B", lesson: 4, title: "Parts of the body (2)", note: "Expand and reinforce the body set." }
    ]
  },
  {
    id: "animals",
    title: "Pets & Animals",
    summary: "High-interest vocabulary that can connect to home life and stories.",
    progressLabel: "1B to 2B",
    iconText: "小狗",
    iconColor: "#8e6f9b",
    focus: {
      hanzi: "小狗，小猫",
      pinyin: "xiǎo gǒu, xiǎo māo",
      english: "puppy, kitten",
      audio: "小狗，小猫"
    },
    parentGuide:
      "This topic works especially well with pictures and sound imitation. Keep it playful and quick.",
    cultureGuide:
      "Animals can later connect naturally to zodiac content and story-based culture lessons.",
    activities: ["Tap to hear", "Match picture to word", "Listen and choose", "Animal sound game"],
    steps: [
      { book: "1B", lesson: 5, title: "Pets", note: "Begin with common pet words." },
      { book: "2B", lesson: 5, title: "Animals", note: "Broaden into a larger animal set." }
    ]
  },
  {
    id: "colours",
    title: "Colours",
    summary: "A repeated visual topic that can be practiced easily on phones and tablets.",
    progressLabel: "1B to 2A",
    iconText: "红蓝",
    iconColor: "#c36f62",
    focus: {
      hanzi: "红色，蓝色，黄色",
      pinyin: "hóng sè, lán sè, huáng sè",
      english: "red, blue, yellow",
      audio: "红色，蓝色，黄色"
    },
    focusItems: [
      { id: "red", hanzi: "红色", pinyin: "hóng sè", english: "red", audio: "红色" },
      { id: "blue", hanzi: "蓝色", pinyin: "lán sè", english: "blue", audio: "蓝色" },
      { id: "yellow", hanzi: "黄色", pinyin: "huáng sè", english: "yellow", audio: "黄色" }
    ],
    parentGuide:
      "Practice with crayons, clothes, fruit, or toys. The more real and visible the better.",
    cultureGuide:
      "Colour topics are a natural place to add small festival and clothing connections later.",
    activities: ["Tap to hear", "Choose the colour", "Colour hunt", "Listen and point"],
    steps: [
      { book: "1B", lesson: 6, title: "Colours", note: "Start with common colour words." },
      { book: "2A", lesson: 7, title: "Colours", note: "Review and strengthen the same topic later." }
    ]
  },
  {
    id: "food",
    title: "Food & Drinks",
    summary: "An especially strong branch for child motivation, home practice, and culture tie-ins.",
    progressLabel: "1B to 4A",
    iconText: "水果",
    iconColor: "#c48d46",
    focus: {
      hanzi: "我饿了。",
      pinyin: "wǒ è le.",
      english: "I am hungry.",
      audio: "我饿了"
    },
    parentGuide:
      "This is one of the easiest topics to make real. Use snack time, lunch, and shopping to repeat words naturally.",
    cultureGuide:
      "Food is a great place to add extra content later: dumplings, mooncakes, zòngzi, fruit names, and meal routines.",
    activities: ["Tap to hear", "Choose the food", "Listen and choose", "Meal-time phrase practice"],
    steps: [
      { book: "1B", lesson: 7, title: "Fruit", note: "Begin with highly visual food words." },
      { book: "2B", lesson: 7, title: "Snacks", note: "Add everyday treat vocabulary." },
      { book: "3B", lesson: 5, title: "Food and drink", note: "Broaden core food language." },
      { book: "3B", lesson: 6, title: "Vegetables", note: "Extend the category." },
      { book: "4A", lesson: 5, title: "My lunch", note: "Add meals and choice language." },
      { book: "4A", lesson: 7, title: "I'm hungry", note: "Use food in a daily-life sentence." }
    ]
  },
  {
    id: "time-date",
    title: "Time & Date",
    summary: "A progressive branch that grows from week and clock concepts into dates and daily time.",
    progressLabel: "2B to 4A",
    iconText: "时间",
    iconColor: "#517b8d",
    focus: {
      hanzi: "乐乐七点起床。",
      pinyin: "Lè le qī diǎn qǐ chuáng.",
      english: "Lele wakes up at 7:00 AM.",
      audio: "乐乐七点起床"
    },
    focusItems: [
      {
        id: "wake-up-7am",
        hanzi: "七点",
        pinyin: "qī diǎn",
        english: "seven o'clock",
        audio: "七点",
        timeOfDayHanzi: "早上",
        timeOfDayPinyin: "zǎo shang",
        timeOfDayEnglish: "early morning",
        routineHanzi: "乐乐七点起床。",
        routinePinyin: "Lè le qī diǎn qǐ chuáng.",
        routineEnglish: "Lele wakes up at 7:00 AM.",
        routineAction: "Wake up",
        scenePath: "assets/illustrated-clock-routines/07am-lele-wake-up.webp"
      },
      {
        id: "school-8am",
        hanzi: "八点",
        pinyin: "bā diǎn",
        english: "eight o'clock",
        audio: "八点",
        timeOfDayHanzi: "早上",
        timeOfDayPinyin: "zǎo shang",
        timeOfDayEnglish: "early morning",
        routineHanzi: "八点去学校。",
        routinePinyin: "bā diǎn qù xué xiào.",
        routineEnglish: "Go to school at 8:00 AM.",
        routineAction: "Go to school",
        scenePath: "assets/illustrated-clock-routines/08am-go-to-school.webp"
      },
      {
        id: "writing-10am",
        hanzi: "十点",
        pinyin: "shí diǎn",
        english: "ten o'clock",
        audio: "十点",
        timeOfDayHanzi: "上午",
        timeOfDayPinyin: "shàng wǔ",
        timeOfDayEnglish: "morning",
        routineHanzi: "十点上写字课。",
        routinePinyin: "shí diǎn shàng xiě zì kè.",
        routineEnglish: "Writing class at 10:00 AM.",
        routineAction: "Writing class",
        scenePath: "assets/illustrated-clock-routines/10am-writing-class.webp"
      },
      {
        id: "lunch-12pm",
        hanzi: "十二点",
        pinyin: "shí'èr diǎn",
        english: "twelve o'clock",
        audio: "十二点",
        timeOfDayHanzi: "中午",
        timeOfDayPinyin: "zhōng wǔ",
        timeOfDayEnglish: "noon",
        routineHanzi: "十二点吃午饭。",
        routinePinyin: "shí'èr diǎn chī wǔ fàn.",
        routineEnglish: "Lunch time at 12:00 PM.",
        routineAction: "Lunch time",
        scenePath: "assets/illustrated-clock-routines/12pm-lunch-time.webp"
      },
      {
        id: "playground-4pm",
        hanzi: "四点",
        pinyin: "sì diǎn",
        english: "four o'clock",
        audio: "四点",
        timeOfDayHanzi: "下午",
        timeOfDayPinyin: "xià wǔ",
        timeOfDayEnglish: "afternoon",
        routineHanzi: "四点去操场玩。",
        routinePinyin: "sì diǎn qù cāo chǎng wán.",
        routineEnglish: "Go play on the playground at 4:00 PM.",
        routineAction: "Playground",
        scenePath: "assets/illustrated-clock-routines/04pm-playground.webp"
      },
      {
        id: "story-time-8pm",
        hanzi: "八点",
        pinyin: "bā diǎn",
        english: "eight o'clock",
        audio: "八点",
        timeOfDayHanzi: "晚上",
        timeOfDayPinyin: "wǎn shang",
        timeOfDayEnglish: "evening",
        routineHanzi: "八点讲故事。",
        routinePinyin: "bā diǎn jiǎng gù shì.",
        routineEnglish: "Story time at 8:00 PM.",
        routineAction: "Story time",
        scenePath: "assets/illustrated-clock-routines/08pm-story-time.webp"
      }
    ],
    interactiveScene: "time-date-routine",
    parentGuide:
      "This topic works best with routines. Tie it to breakfast time, school time, bedtime, and birthdays.",
    cultureGuide:
      "Time and date language pairs naturally with birthday and holiday content later.",
    activities: ["Tap to hear", "Clock matching", "Listen and choose", "Routine ordering"],
    steps: [
      { book: "2B", lesson: 1, title: "Today is Monday", note: "Begin with days of the week." },
      { book: "2B", lesson: 2, title: "What time is it?", note: "Add telling time." },
      { book: "3A", lesson: 2, title: "Date", note: "Expand into date language." },
      { book: "3A", lesson: 3, title: "Happy birthday!", note: "Connect date language to birthdays." },
      { book: "4A", lesson: 3, title: "Tell the time", note: "Revisit time in a more functional way." },
      { book: "4A", lesson: 4, title: "Daily routine", note: "Use time language in everyday life." }
    ]
  },
  {
    id: "school",
    title: "School",
    summary: "A strong long-running topic that can become one of the main content branches.",
    progressLabel: "2B to 4B",
    iconText: "学校",
    iconColor: "#6d8a4f",
    focus: {
      hanzi: "我的书包。",
      pinyin: "wǒ de shū bāo.",
      english: "My schoolbag.",
      audio: "我的书包"
    },
    parentGuide:
      "This topic works well with real objects. Use the child’s backpack, pencils, books, and classroom routine as practice anchors.",
    cultureGuide:
      "School topics are practical and support classroom promotion, since teachers can quickly point students to the matching content.",
    activities: ["Tap to hear", "Find the object", "Listen and choose", "Classroom matching"],
    steps: [
      { book: "2B", lesson: 3, title: "Stationery", note: "Start with school objects." },
      { book: "2B", lesson: 4, title: "My classroom", note: "Move into the room and classroom items." },
      { book: "3B", lesson: 1, title: "My schoolbag", note: "Add schoolbag vocabulary." },
      { book: "3B", lesson: 2, title: "Our classroom", note: "Expand school setting language." },
      { book: "4B", lesson: 5, title: "Our school", note: "Broaden to the whole school." },
      { book: "4B", lesson: 6, title: "School subjects", note: "Add subject names." }
    ]
  },
  {
    id: "hobbies",
    title: "Hobbies",
    summary: "A good branch for personal expression and longer conversations later.",
    progressLabel: "2A to 4B",
    iconText: "喜欢",
    iconColor: "#8f6988",
    focus: {
      hanzi: "我喜欢看书。",
      pinyin: "wǒ xǐ huan kàn shū.",
      english: "I like reading.",
      audio: "我喜欢看书"
    },
    parentGuide:
      "Choose activities the child already loves. Familiar routines make speaking practice feel much less abstract.",
    cultureGuide:
      "Hobbies are a nice place to introduce art, music, and cultural interests once the core language is stable.",
    activities: ["Tap to hear", "Choose what I like", "Listen and choose", "Talk about my hobby"],
    steps: [
      { book: "2A", lesson: 5, title: "I love reading", note: "Start with a simple preference pattern." },
      { book: "3B", lesson: 4, title: "Hobbies", note: "Broaden the hobby set." },
      { book: "4B", lesson: 4, title: "Hobbies", note: "Revisit hobby language." },
      { book: "4B", lesson: 7, title: "Leisure time", note: "Use hobbies in free-time language." }
    ]
  },
  {
    id: "toys",
    title: "Toys",
    summary: "A focused toy and kid-transport word set that fits Book 2A well and works for quick picture-based review.",
    progressLabel: "2A toy store",
    iconText: "玩具",
    iconColor: "#b86f52",
    iconAccent: "#f2cb7f",
    iconTheme: "toys",
    focus: {
      hanzi: "玩具汽车，火车，飞机",
      pinyin: "wán jù qì chē, huǒ chē, fēi jī",
      english: "toy car, train, airplane",
      audio: "玩具汽车，火车，飞机"
    },
    focusItems: [
      { id: "toy-car", hanzi: "玩具汽车", pinyin: "wán jù qì chē", english: "toy car", audio: "玩具汽车" },
      { id: "train", hanzi: "火车", pinyin: "huǒ chē", english: "train", audio: "火车" },
      { id: "airplane", hanzi: "飞机", pinyin: "fēi jī", english: "airplane", audio: "飞机" },
      { id: "school-bus", hanzi: "校车", pinyin: "xiào chē", english: "school bus", audio: "校车" },
      { id: "subway", hanzi: "地铁", pinyin: "dì tiě", english: "subway", audio: "地铁" },
      { id: "toy-doll", hanzi: "玩具娃娃", pinyin: "wán jù wá wa", english: "toy doll", audio: "玩具娃娃" },
      { id: "bicycle", hanzi: "自行车", pinyin: "zì xíng chē", english: "bicycle", audio: "自行车" }
    ],
    parentGuide:
      "Use the child's own toy shelf first. Point, tap the card, hear the word, then ask the child to find the matching toy or vehicle.",
    cultureGuide:
      "This set bridges toy language and everyday transport language, so it can grow naturally into later daily-life lessons.",
    activities: ["Tap to hear", "Find the toy", "Listen and choose", "Sort toys and vehicles"],
    steps: [{ book: "2A", lesson: 4, title: "My toys", note: "Learn a core toy set with familiar child-friendly objects." }]
  },
  {
    id: "clothes",
    title: "Clothes",
    summary: "A concrete everyday topic that can grow from basic words into dressing and weather use.",
    progressLabel: "2A to 4B",
    iconText: "衣服",
    iconColor: "#9c7b4f",
    focus: {
      hanzi: "我会穿衣服。",
      pinyin: "wǒ huì chuān yī fu.",
      english: "I can get dressed.",
      audio: "我会穿衣服"
    },
    parentGuide:
      "Use getting dressed as the practice moment. Repeating the words during a real routine makes them stick.",
    cultureGuide:
      "Clothes can later connect to colours, weather, and festival dress without needing a lot of extra explanation.",
    activities: ["Tap to hear", "Match the clothing", "Dress for the weather", "Listen and choose"],
    steps: [
      { book: "2A", lesson: 6, title: "I can dress myself", note: "Start with dressing language." },
      { book: "3A", lesson: 7, title: "Clothes", note: "Build a fuller clothing set." },
      { book: "4B", lesson: 2, title: "Clothes", note: "Reconnect clothing with weather and daily life." }
    ]
  },
  {
    id: "daily-life",
    title: "Daily Life",
    summary: "Useful everyday language for home, routines, rooms, and movement.",
    progressLabel: "4A to 4B",
    iconText: "日常",
    iconColor: "#6c8c7f",
    focus: {
      hanzi: "这是我的房间。",
      pinyin: "zhè shì wǒ de fáng jiān.",
      english: "This is my room.",
      audio: "这是我的房间"
    },
    parentGuide:
      "This topic becomes much easier when children can point to real places and routines in their own day.",
    cultureGuide:
      "Daily life topics make the tool feel practical instead of toy-like, which fits your goal well.",
    activities: ["Tap to hear", "Find it at home", "Routine order", "Listen and choose"],
    steps: [
      { book: "4A", lesson: 4, title: "Daily routine", note: "Use Chinese inside everyday routines." },
      { book: "4A", lesson: 6, title: "Means of transport", note: "Add getting-around language." },
      { book: "4B", lesson: 3, title: "My room", note: "Bring language into the home setting." }
    ]
  },
  {
    id: "weather",
    title: "Weather",
    summary: "A natural topic for daily check-ins, clothing choices, and routine speech.",
    progressLabel: "4B branch",
    iconText: "下雨",
    iconColor: "#6f7fa4",
    focus: {
      hanzi: "下雨了。",
      pinyin: "xià yǔ le.",
      english: "It is raining.",
      audio: "下雨了"
    },
    parentGuide:
      "This is best as a daily one-minute habit. Check the weather together and say the phrase before leaving home.",
    cultureGuide:
      "Weather combines nicely with clothing and seasonal culture content later.",
    activities: ["Tap to hear", "Choose today's weather", "Dress for the weather", "Listen and choose"],
    steps: [{ book: "4B", lesson: 1, title: "It's raining", note: "Start weather language with a concrete daily phrase." }]
  }
];

const numberEnglishBase = [
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

const numberDigitMap = {
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

const numberStages = [
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

const telephonePractice = {
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

const greetingsPractice = [
  {
    id: "scene-1",
    number: "1",
    prompt: "Greeting a teacher politely",
    imagePath: "assets/greetings/greetings-scene-1.webp",
    imageAlt: "Teacher Li greeting Anan outside the school entrance",
    lines: [
      { hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      {
        hanzi: "李老师，您好！",
        pinyin: "Lǐ lǎo shī, nín hǎo!",
        english: "Hello, Teacher Li!",
        audio: "李老师您好"
      }
    ]
  },
  {
    id: "scene-2",
    number: "2",
    prompt: "Friends meeting in the morning",
    imagePath: "assets/greetings/greetings-scene-2.webp",
    imageAlt: "Lele and Anan greeting each other on the way into school, with other children arriving behind them",
    lines: [
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" },
      { hanzi: "你早！", pinyin: "nǐ zǎo!", english: "Good morning!", audio: "你早" }
    ]
  },
  {
    id: "scene-3",
    number: "3",
    prompt: "Saying goodbye",
    imagePath: "assets/greetings/greetings-scene-3.webp",
    imageAlt: "Lele and Anan waving goodbye after school as children come out of the building and head home",
    lines: [
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" },
      { hanzi: "再见！", pinyin: "zài jiàn!", english: "Goodbye!", audio: "再见" }
    ]
  }
];

const greetingsGameItemIds = ["hello", "teacher-hello", "good-morning", "goodbye"];
const politeGameItemIds = ["thank-you", "youre-welcome", "sorry", "never-mind"];
const introductionsGameSpeakerIds = ["anan", "tiantian", "sisi", "lele"];
const ageGameItemIds = ["ask-age", "age-five", "age-six", "age-seven", "ask-grade", "grade-one"];
const familyGameItemIds = [
  "dad-word",
  "mom-word",
  "older-brother-word",
  "younger-brother-word",
  "older-sister-word",
  "younger-sister-word"
];

const sceneSpeechRate = 0.64;
const sceneLinePauseMs = 280;

const introductionsPractice = [
  {
    id: "intro-scene-1",
    number: "1",
    prompt: "Meet a new friend and ask their name",
    cast: ["lele", "anan"],
    lines: [
      { speakerId: "lele", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "anan", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "lele", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { speakerId: "anan", hanzi: "我叫安安。", pinyin: "wǒ jiào Ān'ān.", english: "My name is Anan.", audio: "我叫安安" }
    ]
  },
  {
    id: "intro-scene-2",
    number: "2",
    prompt: "Say your own name clearly, then greet back",
    cast: ["tiantian", "sisi"],
    lines: [
      { speakerId: "sisi", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi?", english: "What is your name?", audio: "你叫什么名字" },
      { speakerId: "tiantian", hanzi: "我叫天天。", pinyin: "wǒ jiào Tiān tiān.", english: "My name is Tiantian.", audio: "我叫天天" },
      { speakerId: "sisi", hanzi: "你好，天天！", pinyin: "nǐ hǎo, Tiān tiān!", english: "Hello, Tiantian!", audio: "你好天天" }
    ]
  },
  {
    id: "intro-scene-3",
    number: "3",
    prompt: "Two children trade names after saying hello",
    cast: ["sisi", "lele"],
    lines: [
      { speakerId: "sisi", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "lele", hanzi: "你好！", pinyin: "nǐ hǎo!", english: "Hello!", audio: "你好" },
      { speakerId: "sisi", hanzi: "我叫思思。", pinyin: "wǒ jiào Sī si.", english: "My name is Sisi.", audio: "我叫思思" },
      { speakerId: "lele", hanzi: "我叫乐乐。", pinyin: "wǒ jiào Lè le.", english: "My name is Lele.", audio: "我叫乐乐" }
    ]
  }
];

const introductionsGamePrompts = [
  {
    id: "intro-game-anan",
    speakerId: "anan",
    sourceItemId: "my-name-anan",
    hanzi: "我叫安安。",
    pinyin: "wǒ jiào Ān'ān.",
    english: "My name is Anan.",
    audio: "我叫安安"
  },
  {
    id: "intro-game-tiantian",
    speakerId: "tiantian",
    sourceItemId: "my-name-tiantian",
    hanzi: "我叫天天。",
    pinyin: "wǒ jiào Tiān tiān.",
    english: "My name is Tiantian.",
    audio: "我叫天天"
  },
  {
    id: "intro-game-sisi",
    speakerId: "sisi",
    sourceItemId: "my-name-sisi",
    hanzi: "我叫思思。",
    pinyin: "wǒ jiào Sī si.",
    english: "My name is Sisi.",
    audio: "我叫思思"
  },
  {
    id: "intro-game-lele",
    speakerId: "lele",
    sourceItemId: "my-name-lele",
    hanzi: "我叫乐乐。",
    pinyin: "wǒ jiào Lè le.",
    english: "My name is Lele.",
    audio: "我叫乐乐"
  }
];

const introductionsBuildPhrases = [
  {
    id: "build-ask-name",
    sourceItemId: "ask-name",
    targetHanzi: "你叫什么名字？",
    prompt: "Build: What is your name?",
    english: "What is your name?",
    audio: "你叫什么名字",
    tokens: ["你", "叫", "什么", "名字"]
  },
  {
    id: "build-my-name",
    sourceItemId: "my-name-anan",
    targetHanzi: "我叫安安。",
    prompt: "Build: My name is Anan.",
    english: "My name is Anan.",
    audio: "我叫安安",
    tokens: ["我", "叫", "安安"]
  }
];

const agePractice = [
  {
    id: "age-scene-1",
    number: "1",
    prompt: "Ask a new friend how old they are",
    imagePath: "assets/age/age-scene-1.webp",
    imageAlt: "Anan and Sisi talking outside a classroom and asking about age",
    lines: [
      { hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { hanzi: "我五岁。", pinyin: "wǒ wǔ suì.", english: "I am five years old.", audio: "我五岁" }
    ]
  },
  {
    id: "age-scene-2",
    number: "2",
    prompt: "Ask age first, then ask what grade a classmate is in",
    imagePath: "assets/age/age-scene-2.webp",
    imageAlt: "Lele and Noah inside a classroom asking age first and then what grade someone is in",
    lines: [
      { hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { hanzi: "我六岁。", pinyin: "wǒ liù suì.", english: "I am six years old.", audio: "我六岁" },
      { hanzi: "你上几年级？", pinyin: "nǐ shàng jǐ nián jí?", english: "What grade are you in?", audio: "你上几年级" },
      { hanzi: "我上一年级。", pinyin: "wǒ shàng yì nián jí.", english: "I am in first grade.", audio: "我上一年级" }
    ]
  },
  {
    id: "age-scene-3",
    number: "3",
    prompt: "Connect age language to a birthday moment",
    imagePath: "assets/age/age-scene-3.webp",
    imageAlt: "Sisi at a birthday party with seven candles on a cake and friends around the table",
    lines: [
      { hanzi: "你几岁？", pinyin: "nǐ jǐ suì?", english: "How old are you?", audio: "你几岁" },
      { hanzi: "我七岁。", pinyin: "wǒ qī suì.", english: "I am seven years old.", audio: "我七岁" }
    ]
  }
];

const ageBuildPhrases = [
  {
    id: "build-ask-age",
    sourceItemId: "ask-age",
    targetHanzi: "你几岁？",
    prompt: "Build: How old are you?",
    english: "How old are you?",
    audio: "你几岁",
    tokens: ["你", "几", "岁"]
  },
  {
    id: "build-age-five",
    sourceItemId: "age-five",
    targetHanzi: "我五岁。",
    prompt: "Build: I am five years old.",
    english: "I am five years old.",
    audio: "我五岁",
    tokens: ["我", "五", "岁"]
  },
  {
    id: "build-age-six",
    sourceItemId: "age-six",
    targetHanzi: "我六岁。",
    prompt: "Build: I am six years old.",
    english: "I am six years old.",
    audio: "我六岁",
    tokens: ["我", "六", "岁"]
  },
  {
    id: "build-age-seven",
    sourceItemId: "age-seven",
    targetHanzi: "我七岁。",
    prompt: "Build: I am seven years old.",
    english: "I am seven years old.",
    audio: "我七岁",
    tokens: ["我", "七", "岁"]
  },
  {
    id: "build-ask-grade",
    sourceItemId: "ask-grade",
    targetHanzi: "你上几年级？",
    prompt: "Build: What grade are you in?",
    english: "What grade are you in?",
    audio: "你上几年级",
    tokens: ["你", "上", "几", "年级"]
  },
  {
    id: "build-grade-one",
    sourceItemId: "grade-one",
    targetHanzi: "我上一年级。",
    prompt: "Build: I am in first grade.",
    english: "I am in first grade.",
    audio: "我上一年级",
    tokens: ["我", "上", "一", "年级"]
  }
];

const politePractice = [
  {
    id: "polite-scene-1",
    number: "1",
    prompt: "Saying thank you after a friend helps you",
    imagePath: "assets/polite/polite-scene-1.webp",
    imageAlt: "Two children in a classroom sharing a crayon politely",
    lines: [
      { hanzi: "谢谢你！", pinyin: "xiè xie nǐ!", english: "Thank you!", audio: "谢谢你" },
      { hanzi: "不客气。", pinyin: "bú kè qi.", english: "You're welcome.", audio: "不客气" }
    ]
  },
  {
    id: "polite-scene-2",
    number: "2",
    prompt: "Saying sorry after a mistake",
    imagePath: "assets/polite/polite-scene-2.webp",
    imageAlt: "One child apologizing after dropping a pencil case and another child forgiving kindly",
    lines: [
      { hanzi: "对不起。", pinyin: "duì bu qǐ.", english: "I'm sorry.", audio: "对不起" },
      { hanzi: "没关系。", pinyin: "méi guān xi.", english: "Never mind.", audio: "没关系" }
    ]
  },
  {
    id: "polite-scene-3",
    number: "3",
    prompt: "A polite classroom phrase from the teacher",
    imagePath: "assets/polite/polite-scene-3.webp",
    imageAlt: "A teacher kindly asking children to be quiet in the classroom",
    lines: [
      { hanzi: "请安静。", pinyin: "qǐng ān jìng.", english: "Please be quiet.", audio: "请安静" },
      { hanzi: "好。", pinyin: "hǎo.", english: "Okay.", audio: "好" }
    ]
  }
];

const familyPractice = [
  {
    id: "family-scene-1",
    number: "1",
    prompt: "Start with the family-love sentences from Book 1B",
    visual: "parents-love",
    imagePath: "assets/illustrated-family/family-scene-parents-love.webp",
    imageAlt: "A child happily hugged by mum and dad in a cozy living room",
    roomLabel: "living-room",
    sceneLabel: "Living room",
    sceneMood: "Loved at home",
    lines: [
      { hanzi: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ.", english: "Dad and Mum love me.", audio: "爸爸妈妈爱我" },
      { hanzi: "我爱爸爸。", pinyin: "wǒ ài bà ba.", english: "I love Dad.", audio: "我爱爸爸" },
      { hanzi: "我爱妈妈。", pinyin: "wǒ ài mā ma.", english: "I love Mum.", audio: "我爱妈妈" }
    ]
  },
  {
    id: "family-scene-2",
    number: "2",
    prompt: "Compare siblings by boy or girl, then older or younger",
    visual: "siblings-compare",
    imagePath: "assets/illustrated-family/family-scene-siblings.webp",
    imageAlt: "Four siblings together in a living room: older brother, younger brother, older sister, and younger sister",
    roomLabel: "playroom",
    sceneLabel: "Sibling map",
    sceneMood: "See both pairs at once",
    lines: [
      { personId: "older-brother", hanzi: "哥哥", pinyin: "gē ge", english: "older brother", audio: "哥哥" },
      { personId: "younger-brother", hanzi: "弟弟", pinyin: "dì di", english: "younger brother", audio: "弟弟" },
      { personId: "older-sister", hanzi: "姐姐", pinyin: "jiě jie", english: "older sister", audio: "姐姐" },
      { personId: "younger-sister", hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister", audio: "妹妹" }
    ]
  }
];

const illustratedFamily = {
  grandpa: {
    id: "grandpa",
    label: "Grandpa",
    ageGroup: "senior",
    path: "assets/illustrated-family/grandpa.webp"
  },
  grandma: {
    id: "grandma",
    label: "Grandma",
    ageGroup: "senior",
    path: "assets/illustrated-family/grandma.webp"
  },
  dad: {
    id: "dad",
    label: "Dad",
    ageGroup: "adult",
    path: "assets/illustrated-family/family-avatar-dad.webp"
  },
  mom: {
    id: "mom",
    label: "Mom",
    ageGroup: "adult",
    path: "assets/illustrated-family/family-avatar-mom.webp"
  },
  girl: {
    id: "girl",
    label: "Older sister",
    ageGroup: "8",
    path: "assets/illustrated-family/family-avatar-older-sister.webp"
  },
  boy: {
    id: "boy",
    label: "Younger brother",
    ageGroup: "6",
    path: "assets/illustrated-family/family-avatar-younger-brother.webp"
  }
};

const illustratedKids = {
  lele: {
    id: "lele",
    label: "Lele",
    hanziName: "乐乐",
    gender: "boy",
    ageGroup: "6-7",
    skinTone: "light",
    path: "assets/illustrated-kids/lele.webp"
  },
  meimei: {
    id: "meimei",
    label: "Meimei",
    hanziName: "美美",
    gender: "girl",
    ageGroup: "6-7",
    skinTone: "light-medium",
    path: "assets/illustrated-kids/meimei.webp"
  },
  yangyang: {
    id: "yangyang",
    label: "Yangyang",
    hanziName: "阳阳",
    gender: "boy",
    ageGroup: "8-9",
    skinTone: "tan",
    path: "assets/illustrated-kids/yangyang.webp"
  },
  anan: {
    id: "anan",
    label: "Anan",
    hanziName: "安安",
    gender: "girl",
    ageGroup: "8-9",
    skinTone: "light",
    path: "assets/illustrated-kids/anan.webp"
  },
  tiantian: {
    id: "tiantian",
    label: "Tiantian",
    hanziName: "天天",
    gender: "boy",
    ageGroup: "9-10",
    skinTone: "light-medium",
    path: "assets/illustrated-kids/tiantian.webp"
  },
  sisi: {
    id: "sisi",
    label: "Sisi",
    hanziName: "思思",
    gender: "girl",
    ageGroup: "8-10",
    skinTone: "medium brown",
    path: "assets/illustrated-kids/sisi.webp"
  },
  luna: {
    id: "luna",
    label: "Luna",
    hanziName: "露娜",
    gender: "girl",
    ageGroup: "8-10",
    skinTone: "medium",
    path: "assets/illustrated-kids/luna.webp"
  },
  jaden: {
    id: "jaden",
    label: "Jaden",
    hanziName: "杰登",
    gender: "boy",
    ageGroup: "7-8",
    skinTone: "deep brown",
    path: "assets/illustrated-kids/jaden.webp"
  }
};

function timeDateRoutineVisual(item) {
  if (item.personId && item.clockPath) {
    const kid = illustratedKids[item.personId];
    if (!kid) {
      return "";
    }

    return `
      <div class="time-routine-visual time-routine-visual-split">
        <div class="time-routine-kid-card">
          <img class="time-routine-kid-image" src="${kid.path}" alt="${kid.label}" />
        </div>
        <div class="time-routine-clock-card">
          <img class="time-routine-clock-image" src="${item.clockPath}" alt="${item.english}" />
        </div>
      </div>
    `;
  }

  if (item.scenePath) {
    return `
      <div class="time-routine-visual">
        ${
          item.timeOfDayHanzi
            ? `
              <div class="time-routine-time-of-day-badge" aria-label="${item.timeOfDayEnglish}">
                <span class="time-routine-time-of-day-hanzi">${item.timeOfDayHanzi}</span>
                <span class="time-routine-time-of-day-label">${item.timeOfDayEnglish}</span>
              </div>
            `
            : ""
        }
        <img class="time-routine-scene-image" src="${item.scenePath}" alt="${item.routineEnglish}" />
      </div>
    `;
  }

  return "";
}

function numberEnglish(value) {
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

function numberHanzi(value) {
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

function numberPinyin(value) {
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

function buildNumberItem(value) {
  return {
    id: `num-${value}`,
    value,
    hanzi: numberHanzi(value),
    pinyin: numberPinyin(value),
    english: numberEnglish(value),
    audio: numberHanzi(value)
  };
}

function buildMultiplicationRhymeItems() {
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

topicData.find((topic) => topic.id === "multiplication-rhyme").focusItems = buildMultiplicationRhymeItems();

const books = [
  {
    id: "1a",
    label: "Book 1A",
    lessons: [
      { lesson: 1, title: "Numbers (1)", topicId: "numbers" },
      { lesson: 2, title: "Numbers (2)", topicId: "numbers" },
      { lesson: 3, title: "Numbers (3)", topicId: "numbers" },
      { lesson: 4, title: "Hello!", topicId: "greetings" },
      { lesson: 5, title: "Thank you!", topicId: "polite-words" },
      { lesson: 6, title: "What's your name?", topicId: "introductions" },
      { lesson: 7, title: "I'm 5 years old", topicId: "age" }
    ]
  },
  {
    id: "1b",
    label: "Book 1B",
    lessons: [
      { lesson: 1, title: "Mum and dad", topicId: "family" },
      { lesson: 2, title: "Brothers and sisters", topicId: "family" },
      { lesson: 3, title: "Parts of the body (1)", topicId: "body" },
      { lesson: 4, title: "Parts of the body (2)", topicId: "body" },
      { lesson: 5, title: "Pets", topicId: "animals" },
      { lesson: 6, title: "Colours", topicId: "colours" },
      { lesson: 7, title: "Fruit", topicId: "food" }
    ]
  },
  {
    id: "2a",
    label: "Book 2A",
    lessons: [
      { lesson: 1, title: "Numbers", topicId: "numbers" },
      { lesson: 2, title: "Two younger brothers", topicId: "family" },
      { lesson: 3, title: "Good friends", topicId: "introductions" },
      { lesson: 4, title: "My toys", topicId: "toys" },
      { lesson: 5, title: "I love reading", topicId: "hobbies" },
      { lesson: 6, title: "I can dress myself", topicId: "clothes" },
      { lesson: 7, title: "Colours", topicId: "colours" }
    ]
  },
  {
    id: "2b",
    label: "Book 2B",
    lessons: [
      { lesson: 1, title: "Today is Monday", topicId: "time-date" },
      { lesson: 2, title: "What time is it?", topicId: "time-date" },
      { lesson: 3, title: "Stationery", topicId: "school" },
      { lesson: 4, title: "My classroom", topicId: "school" },
      { lesson: 5, title: "Animals", topicId: "animals" },
      { lesson: 6, title: "Big or small", topicId: "daily-life" },
      { lesson: 7, title: "Snacks", topicId: "food" }
    ]
  },
  {
    id: "3a",
    label: "Book 3A",
    lessons: [
      { lesson: 1, title: "Numbers", topicId: "numbers" },
      { lesson: 2, title: "Date", topicId: "time-date" },
      { lesson: 3, title: "Happy birthday!", topicId: "age" },
      { lesson: 4, title: "Family", topicId: "family" },
      { lesson: 5, title: "Nationality", topicId: "introductions" },
      { lesson: 6, title: "Request", topicId: "polite-words" },
      { lesson: 7, title: "Clothes", topicId: "clothes" }
    ]
  },
  {
    id: "3b",
    label: "Book 3B",
    lessons: [
      { lesson: 1, title: "My schoolbag", topicId: "school" },
      { lesson: 2, title: "Our classroom", topicId: "school" },
      { lesson: 3, title: "Positions", topicId: "daily-life" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies" },
      { lesson: 5, title: "Food and drink", topicId: "food" },
      { lesson: 6, title: "Vegetables", topicId: "food" },
      { lesson: 7, title: "Nature", topicId: "weather" }
    ]
  },
  {
    id: "4a",
    label: "Book 4A",
    lessons: [
      { lesson: 1, title: "Telephone numbers", topicId: "numbers" },
      { lesson: 2, title: "Languages", topicId: "introductions" },
      { lesson: 3, title: "Tell the time", topicId: "time-date" },
      { lesson: 4, title: "Daily routine", topicId: "daily-life" },
      { lesson: 5, title: "My lunch", topicId: "food" },
      { lesson: 6, title: "Means of transport", topicId: "daily-life" },
      { lesson: 7, title: "I'm hungry", topicId: "food" }
    ]
  },
  {
    id: "4b",
    label: "Book 4B",
    lessons: [
      { lesson: 1, title: "It's raining", topicId: "weather" },
      { lesson: 2, title: "Clothes", topicId: "clothes" },
      { lesson: 3, title: "My room", topicId: "daily-life" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies" },
      { lesson: 5, title: "Our school", topicId: "school" },
      { lesson: 6, title: "School subjects", topicId: "school" },
      { lesson: 7, title: "Leisure time", topicId: "hobbies" }
    ]
  }
];

const bookHomeCategories = [
  {
    id: "first-steps",
    zhTitle: "第一阶段",
    enTitle: "First Steps",
    hint: "Book 1A and 1B: first speaking, family, colours, food",
    accent: "#be5b49",
    iconEmoji: "🌱",
    bookIds: ["1a", "1b"]
  },
  {
    id: "build-core",
    zhTitle: "第二阶段",
    enTitle: "Build the Core",
    hint: "Book 2A and 2B: toys, school, time, daily language",
    accent: "#6d8a4f",
    iconEmoji: "🧩",
    bookIds: ["2a", "2b"]
  },
  {
    id: "expand-language",
    zhTitle: "第三阶段",
    enTitle: "Expand the Language",
    hint: "Book 3A and 3B: birthdays, requests, schoolbag, hobbies",
    accent: "#517b8d",
    iconEmoji: "📘",
    bookIds: ["3a", "3b"]
  },
  {
    id: "real-life-use",
    zhTitle: "第四阶段",
    enTitle: "Real-Life Use",
    hint: "Book 4A and 4B: routines, weather, transport, school life",
    accent: "#8f6988",
    iconEmoji: "🗣️",
    bookIds: ["4a", "4b"]
  }
];

const topicGroups = [
  {
    id: "foundations",
    label: "Foundations",
    description: "The first speaking patterns young learners need most.",
    topicIds: ["numbers", "multiplication-rhyme", "greetings", "polite-words", "introductions", "age"]
  },
  {
    id: "me-and-family",
    label: "Me & Family",
    description: "Personal, family, body, clothes, and everyday child language.",
    topicIds: ["family", "body", "animals", "colours", "clothes"]
  },
  {
    id: "daily-world",
    label: "Daily World",
    description: "Food, hobbies, routines, weather, and the world around the child.",
    topicIds: ["food", "toys", "hobbies", "daily-life", "weather"]
  },
  {
    id: "school-and-time",
    label: "School & Time",
    description: "Practical classroom, calendar, and time-based language.",
    topicIds: ["time-date", "school"]
  }
];

const topicCardMeta = {
  numbers: { zhTitle: "数字", enTitle: "Numbers", hint: "Count, hear, and use numbers" },
  "multiplication-rhyme": { zhTitle: "九九乘法", enTitle: "Multiplication Rhyme", hint: "Classic rhythm practice" },
  greetings: { zhTitle: "打招呼", enTitle: "Greetings", hint: "Hello, good morning, goodbye" },
  "polite-words": { zhTitle: "礼貌用语", enTitle: "Polite Words", hint: "Thank you, sorry, please" },
  introductions: { zhTitle: "介绍自己", enTitle: "Introductions", hint: "Say your name and meet friends" },
  age: { zhTitle: "年龄", enTitle: "Age", hint: "Ask and say how old you are" },
  family: { zhTitle: "家人", enTitle: "Family", hint: "Mom, dad, siblings, grandparents" },
  body: { zhTitle: "身体", enTitle: "Body", hint: "Tap body parts and listen" },
  animals: { zhTitle: "动物", enTitle: "Animals", hint: "Pets and favorite animals" },
  colours: { zhTitle: "颜色", enTitle: "Colours", hint: "Red, yellow, blue, green" },
  food: { zhTitle: "食物", enTitle: "Food & Drinks", hint: "Fruit, snacks, meals" },
  "time-date": { zhTitle: "时间", enTitle: "Time & Date", hint: "Clock, days, dates, routines" },
  school: { zhTitle: "学校", enTitle: "School", hint: "Classroom, schoolbag, subjects" },
  hobbies: { zhTitle: "爱好", enTitle: "Hobbies", hint: "Reading, music, sports, games" },
  toys: { zhTitle: "玩具", enTitle: "Toys", hint: "Toy car, train, airplane" },
  clothes: { zhTitle: "衣服", enTitle: "Clothes", hint: "Dress for the day" },
  "daily-life": { zhTitle: "日常生活", enTitle: "Daily Life", hint: "Home, rooms, routines" },
  weather: { zhTitle: "天气", enTitle: "Weather", hint: "Sun, rain, snow, wind" }
};

const learningHomeCategories = [
  {
    id: "foundations",
    zhTitle: "开口说中文",
    enTitle: "Start Speaking",
    hint: "Numbers, greetings, names, age",
    accent: "#be5b49",
    iconSrc: "assets/navigation-icons/lele-wave-icon.webp",
    topicIds: ["numbers", "greetings", "polite-words", "introductions", "age", "multiplication-rhyme"]
  },
  {
    id: "me-family",
    zhTitle: "我和家人",
    enTitle: "Me & Family",
    hint: "Family, body, clothes",
    accent: "#aa7051",
    iconEmoji: "🏠",
    topicIds: ["family", "body", "clothes"]
  },
  {
    id: "time-daily",
    zhTitle: "时间和日常",
    enTitle: "Time & Daily Life",
    hint: "Time, dates, routines, rooms",
    accent: "#517b8d",
    iconSrc: "assets/illustrated-clocks/10oclock.webp",
    topicIds: ["time-date", "daily-life"]
  },
  {
    id: "school-life",
    zhTitle: "学校生活",
    enTitle: "School Life",
    hint: "Classroom, schoolbag, subjects",
    accent: "#6d8a4f",
    iconEmoji: "🏫",
    topicIds: ["school"]
  },
  {
    id: "food",
    zhTitle: "食物",
    enTitle: "Food",
    hint: "Fruit, snacks, meals",
    accent: "#c48d46",
    iconSrc: "assets/navigation-icons/burger-fries-icon.webp",
    topicIds: ["food"]
  },
  {
    id: "world",
    zhTitle: "自然和颜色",
    enTitle: "World Around Us",
    hint: "Weather, animals, colours",
    accent: "#6f7fa4",
    iconSrc: "assets/navigation-icons/panda-bamboo-icon.webp",
    topicIds: ["weather", "animals", "colours"]
  },
  {
    id: "play",
    zhTitle: "兴趣和玩具",
    enTitle: "Play & Hobbies",
    hint: "Toys, sports, music, games",
    accent: "#8f6988",
    iconSrc: "assets/navigation-icons/teddy-robot-icon.webp",
    topicIds: ["toys", "hobbies"]
  }
];

const state = {
  currentView: "topics",
  selectedTopicId: "numbers",
  expandedCategoryId: "foundations",
  selectedBookCategoryId: "first-steps",
  selectedBookId: "1a",
  selectedLessonNumber: 1,
  topicPageOpen: false,
  openTopicGroups: new Set(["foundations"]),
  showPinyin: true,
  showArabic: true,
  showEnglish: true,
  tapAudioEnabled: true,
  selectedFocusItemId: null,
  bodyMatchIncludeBonus: false,
  bodySelectedChineseId: null,
  bodySelectedEnglishId: null,
  bodyMatchedIds: new Set(),
  bodyRoundIds: [],
  bodyChineseOrder: [],
  bodyEnglishOrder: [],
  bodyMatchUniverseKey: "",
  lastBodyFeedback: "",
  numberChallengeStageId: "",
  numberChallengeTargetValue: null,
  numberChallengeOptionValues: [],
  lastNumberFeedback: "",
  numberChallengeAdvanceTimer: null,
  mathChallengeStageId: "",
  mathChallengeOperator: "+",
  mathChallengeLeft: null,
  mathChallengeRight: null,
  mathChallengeAnswer: null,
  lastMathFeedback: "",
  mathChallengeSolved: false,
  mathChallengeInput: "",
  greetingsChallengeAnswerId: "",
  greetingsChallengeOptionIds: [],
  greetingsChallengePromptId: "",
  lastGreetingsFeedback: "",
  greetingsSelectedPhraseId: null,
  greetingsMatchedIds: new Set(),
  greetingsPhraseOrder: [],
  greetingsMeaningOrder: [],
  familyChallengeAnswerId: "",
  familyChallengeOptionIds: [],
  familyChallengePickedId: "",
  familyChallengePromptId: "",
  familyChallengeResult: "",
  familyChallengeWrongIds: new Set(),
  lastFamilyFeedback: "",
  familyListenFeedback: "",
  familyMatchFeedback: "",
  familySelectedPhraseId: null,
  familyMatchedIds: new Set(),
  familyPhraseOrder: [],
  familyMeaningOrder: [],
  introductionsChallengeAnswerId: "",
  introductionsChallengeOptionIds: [],
  introductionsChallengePromptId: "",
  lastIntroductionsFeedback: "",
  introductionsBuildTargetId: "",
  introductionsBuildAvailableTokens: [],
  introductionsBuildSelectedTokens: [],
  ageChallengeAnswerId: "",
  ageChallengeOptionIds: [],
  ageChallengePromptId: "",
  lastAgeFeedback: "",
  ageBuildTargetId: "",
  ageBuildAvailableTokens: [],
  ageBuildSelectedTokens: [],
  politeChallengeAnswerId: "",
  politeChallengeOptionIds: [],
  politeChallengePromptId: "",
  lastPoliteFeedback: "",
  politeSelectedPhraseId: null,
  politeMatchedIds: new Set(),
  politePhraseOrder: [],
  politeMeaningOrder: []
};

const topicGroupsRoot = document.getElementById("topic-groups");
const bookSelect = document.getElementById("book-select");
const lessonSelect = document.getElementById("lesson-select");
const lookupCard = document.getElementById("lookup-card");
const bookBrowser = document.getElementById("book-browser");
const topicTitle = document.getElementById("topic-title");
const topicSummary = document.getElementById("topic-summary");
const topicProgress = document.getElementById("topic-progress");
const topicLessonStrip = document.getElementById("topic-lesson-strip");
const subtopicShelf = document.getElementById("subtopic-shelf");
const focusExplorer = document.getElementById("focus-explorer");
const focusStatus = document.getElementById("focus-status");
const focusDisplay = document.getElementById("focus-display");
const focusHanzi = document.getElementById("focus-hanzi");
const focusPinyin = document.getElementById("focus-pinyin");
const focusEnglish = document.getElementById("focus-english");
const focusWordList = document.getElementById("focus-word-list");
const toggleAudioButton = document.getElementById("toggle-audio-button");
const togglePinyinButton = document.getElementById("toggle-pinyin-button");
const toggleArabicButton = document.getElementById("toggle-arabic-button");
const toggleEnglishButton = document.getElementById("toggle-english-button");
const activityList = document.getElementById("activity-list");
const activityPanelTitle = document.getElementById("activity-panel-title");
const activityPanelSummary = document.getElementById("activity-panel-summary");
const topicPanel = document.getElementById("topics-panel");
const bookPanel = document.getElementById("books-panel");
const topicColumns = document.querySelector(".topic-columns");
const detailLayout = document.querySelector(".detail-layout");
const learningCultureNav = document.getElementById("learningCultureNav");

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.viewTarget);
    document.querySelector(".switcher-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

document.querySelectorAll("[data-global-view]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    state.topicPageOpen = false;
    switchView(link.dataset.globalView);
    updateTopicPageVisibility();
    document.querySelector(".switcher-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    link.closest(".global-view-menu")?.removeAttribute("open");
  });
});

function updateDisplayControls() {
  renderFocusControls();
  renderFocusDisplay(currentFocusItem());
  renderFocusWordList();
  renderFocusExplorer();
  renderActivityPanel(currentTopic());
}

toggleAudioButton.addEventListener("click", () => {
  state.tapAudioEnabled = !state.tapAudioEnabled;
  updateDisplayControls();
});

togglePinyinButton.addEventListener("click", () => {
  state.showPinyin = !state.showPinyin;
  updateDisplayControls();
});

toggleArabicButton.addEventListener("click", () => {
  state.showArabic = !state.showArabic;
  renderFocusControls();
  renderFocusExplorer();
  renderActivityPanel(currentTopic());
});

toggleEnglishButton.addEventListener("click", () => {
  state.showEnglish = !state.showEnglish;
  updateDisplayControls();
});

function currentTopic() {
  return topicData.find((topic) => topic.id === state.selectedTopicId) ?? topicData[0];
}

function currentNumberStage() {
  const lesson = currentLesson();
  return (
    numberStages.find((stage) => stage.bookId === currentBook().id && stage.lesson === lesson.lesson) ??
    numberStages[0]
  );
}

function numberStageItems(stage = currentNumberStage()) {
  const start = Math.min(stage.start, stage.end);
  const end = Math.max(stage.start, stage.end);
  const items = [];
  for (let value = start; value <= end; value += 1) {
    items.push(buildNumberItem(value));
  }
  return items;
}

function resetNumberChallenge(options = {}) {
  const stage = currentNumberStage();
  const items = numberStageItems(stage);
  const pool = items.map((entry) => entry.value);
  const targetValue = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffleArray(pool.filter((value) => value !== targetValue)).slice(
    0,
    Math.min(3, Math.max(0, pool.length - 1))
  );

  state.numberChallengeStageId = stage.id;
  state.numberChallengeTargetValue = targetValue;
  state.numberChallengeOptionValues = shuffleArray([targetValue, ...distractors]);
  state.lastNumberFeedback =
    options.feedback ??
    "Look carefully. Pick the number without counting from one every time.";
}

function ensureNumberChallenge() {
  const stage = currentNumberStage();
  if (state.numberChallengeStageId !== stage.id || !state.numberChallengeOptionValues.length) {
    resetNumberChallenge();
  }
}

function resetMathChallenge() {
  const stage = currentNumberStage();
  const low = Math.max(1, stage.start);
  const high = Math.max(low, stage.end);
  const operator = Math.random() < 0.5 ? "+" : "-";
  let left;
  let right;
  let answer;

  if (operator === "+") {
    const additionMaxLeft = high > low ? high - 1 : high;
    left = Math.floor(Math.random() * (additionMaxLeft - low + 1)) + low;
    const maxRight = Math.max(1, high - left);
    right = Math.floor(Math.random() * maxRight) + 1;
    answer = left + right;
  } else {
    left = Math.floor(Math.random() * (high - low + 1)) + low;
    right = Math.floor(Math.random() * (left + 1));
    answer = left - right;
  }

  state.mathChallengeStageId = stage.id;
  state.mathChallengeOperator = operator;
  state.mathChallengeLeft = left;
  state.mathChallengeRight = right;
  state.mathChallengeAnswer = answer;
  state.lastMathFeedback = "Type the answer, then check it.";
  state.mathChallengeSolved = false;
  state.mathChallengeInput = "";
}

function ensureMathChallenge() {
  const stage = currentNumberStage();
  if (state.mathChallengeStageId !== stage.id || state.mathChallengeAnswer === null) {
    resetMathChallenge();
  }
}

function greetingsGameItems() {
  const greetingsTopic = topicById("greetings");
  return greetingsGameItemIds
    .map((id) => greetingsTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function resetGreetingsChallenge(options = {}) {
  const items = greetingsGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.greetingsChallengeAnswerId = answer.id;
  state.greetingsChallengePromptId = answer.id;
  state.greetingsChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.lastGreetingsFeedback =
    options.feedback ?? "Press play, listen carefully, then choose the matching greeting.";
}

function ensureGreetingsChallenge() {
  if (!state.greetingsChallengeAnswerId || !state.greetingsChallengeOptionIds.length) {
    resetGreetingsChallenge();
  }
}

function greetingsMeaningLabel(itemId) {
  const labels = {
    hello: "Say hello to a friend",
    "teacher-hello": "Greet Teacher Li politely",
    "good-morning": "Say good morning at the start of the day",
    goodbye: "Say goodbye when leaving"
  };

  return labels[itemId] ?? "";
}

function resetGreetingsMatchGame(options = {}) {
  const items = greetingsGameItems();
  state.greetingsSelectedPhraseId = null;
  state.greetingsMatchedIds = new Set();
  state.greetingsPhraseOrder = shuffleArray(items.map((item) => item.id));
  state.greetingsMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.lastGreetingsFeedback = options.feedback ?? "Tap a Chinese greeting, then tap the matching situation.";
}

function ensureGreetingsMatchGame() {
  const items = greetingsGameItems();
  if (
    !state.greetingsPhraseOrder.length ||
    state.greetingsPhraseOrder.length !== items.length ||
    state.greetingsMeaningOrder.length !== items.length
  ) {
    resetGreetingsMatchGame();
  }
}

function handleGreetingsMatchPhrase(itemId) {
  const item = greetingsGameItems().find((entry) => entry.id === itemId);
  if (!item || state.greetingsMatchedIds.has(itemId)) {
    return;
  }

  state.greetingsSelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastGreetingsFeedback = `Now find the situation for ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handleGreetingsMatchAttempt(targetId) {
  if (!state.greetingsSelectedPhraseId || state.greetingsMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.greetingsSelectedPhraseId;
  const selectedItem = greetingsGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.greetingsMatchedIds = new Set([...state.greetingsMatchedIds, targetId]);
    state.greetingsSelectedPhraseId = null;
    state.lastGreetingsFeedback = `Correct! ${selectedItem.hanzi} matches that situation.`;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.greetingsMatchedIds.size === greetingsGameItems().length) {
      state.lastGreetingsFeedback = "Great job! You matched all the greetings.";
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.lastGreetingsFeedback = `Try again. ${selectedItem.hanzi} does not match that situation.`;
  renderActivityPanel(currentTopic());
}

function familyGameItems() {
  const familyTopic = topicById("family");
  return familyGameItemIds
    .map((id) => familyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function familyPersonForItemId(itemId) {
  const personIdByItemId = {
    "dad-word": "dad",
    "mom-word": "mom",
    "older-brother-word": "older-brother",
    "younger-brother-word": "younger-brother",
    "older-sister-word": "older-sister",
    "younger-sister-word": "younger-sister"
  };
  const personId = personIdByItemId[itemId];
  return (
    {
      dad: illustratedFamily.dad,
      mom: illustratedFamily.mom,
      "older-brother": { ...illustratedKids.yangyang, label: "Older brother" },
      "younger-brother": { ...illustratedKids.lele, label: "Younger brother" },
      "older-sister": { ...illustratedKids.anan, label: "Older sister" },
      "younger-sister": { ...illustratedKids.meimei, label: "Younger sister" }
    }[personId] ?? null
  );
}

function familyHeadshotForItemId(itemId) {
  return {
    "mom-word": "assets/illustrated-family/family-avatar-mom.webp",
    "dad-word": "assets/illustrated-family/family-avatar-dad.webp",
    "older-brother-word": "assets/illustrated-family/family-avatar-older-brother.webp",
    "younger-brother-word": "assets/illustrated-family/family-avatar-younger-brother.webp",
    "older-sister-word": "assets/illustrated-family/family-avatar-older-sister.webp",
    "younger-sister-word": "assets/illustrated-family/family-avatar-younger-sister.webp"
  }[itemId] ?? null;
}

function isFamilySentenceItemId(itemId) {
  return ["parents-love-me", "i-love-dad", "i-love-mom"].includes(itemId);
}

function familyBookWordItems() {
  return focusItemsForTopic(topicById("family")).filter((item) => !isFamilySentenceItemId(item.id));
}

function familyWordForPersonId(personId) {
  return {
    mom: "妈妈",
    dad: "爸爸",
    "older-brother": "哥哥",
    "younger-brother": "弟弟",
    "older-sister": "姐姐",
    "younger-sister": "妹妹"
  }[personId] ?? "";
}

function resetFamilyChallenge(options = {}) {
  const items = familyGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.familyChallengeAnswerId = answer.id;
  state.familyChallengePickedId = "";
  state.familyChallengePromptId = answer.id;
  state.familyChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.familyChallengeResult = "";
  state.familyChallengeWrongIds = new Set();
  state.familyListenFeedback = options.feedback ?? "";
  state.lastFamilyFeedback = state.familyListenFeedback;
}

function ensureFamilyChallenge() {
  if (!state.familyChallengeAnswerId || !state.familyChallengeOptionIds.length) {
    resetFamilyChallenge();
  }
}

function handleFamilyChallengePlay() {
  ensureFamilyChallenge();
  const item = familyGameItems().find((entry) => entry.id === state.familyChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyListenFeedback = `Listen again and find ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyChallengeGuess(itemId) {
  ensureFamilyChallenge();
  const answer = familyGameItems().find((entry) => entry.id === state.familyChallengeAnswerId);
  const picked = familyGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    state.familyChallengePickedId = itemId;
    state.familyChallengeResult = "correct";
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.familyListenFeedback = "Nice listening.";
    state.lastFamilyFeedback = state.familyListenFeedback;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    renderActivityPanel(currentTopic());
    window.setTimeout(() => {
      resetFamilyChallenge();
      renderActivityPanel(currentTopic());
    }, 900);
    return;
  }

  state.familyChallengePickedId = itemId;
  state.familyChallengeResult = "wrong";
  state.familyChallengeWrongIds = new Set([...state.familyChallengeWrongIds, itemId]);
  state.familyListenFeedback = "Not that one. Try another card.";
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function resetFamilyMatchGame() {
  const items = familyGameItems();
  state.familySelectedPhraseId = null;
  state.familyMatchedIds = new Set();
  state.familyPhraseOrder = shuffleArray(items.map((item) => item.id));
  state.familyMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.familyMatchFeedback = "";
  state.lastFamilyFeedback = state.familyMatchFeedback;
}

function ensureFamilyMatchGame() {
  const items = familyGameItems();
  if (
    !state.familyPhraseOrder.length ||
    state.familyPhraseOrder.length !== items.length ||
    state.familyMeaningOrder.length !== items.length
  ) {
    resetFamilyMatchGame();
  }
}

function handleFamilyMatchPhrase(itemId) {
  const item = familyGameItems().find((entry) => entry.id === itemId);
  if (!item || state.familyMatchedIds.has(itemId)) {
    return;
  }

  state.familySelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyMatchFeedback = `Now find who matches ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyMatchAttempt(targetId) {
  if (!state.familySelectedPhraseId || state.familyMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.familySelectedPhraseId;
  const selectedItem = familyGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.familyMatchedIds = new Set([...state.familyMatchedIds, targetId]);
    state.familySelectedPhraseId = null;
    state.familyMatchFeedback = "Matched.";
    state.lastFamilyFeedback = state.familyMatchFeedback;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.familyMatchedIds.size === familyGameItems().length) {
      state.familyMatchFeedback = "All family members matched.";
      state.lastFamilyFeedback = state.familyMatchFeedback;
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.familyMatchFeedback = "Try a different family member.";
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function introductionsPromptById(promptId) {
  return introductionsGamePrompts.find((entry) => entry.id === promptId) ?? null;
}

function introductionsGameKids() {
  return introductionsGameSpeakerIds
    .map((id) => illustratedKids[id])
    .filter(Boolean);
}

function introductionsSelfIntroItemForKid(kidId) {
  const introductionsTopic = topicById("introductions");
  const itemIdByKidId = {
    anan: "my-name-anan",
    tiantian: "my-name-tiantian",
    sisi: "my-name-sisi",
    lele: "my-name-lele"
  };
  return introductionsTopic?.focusItems.find((item) => item.id === itemIdByKidId[kidId]) ?? null;
}

function resetIntroductionsChallenge(options = {}) {
  if (!introductionsGamePrompts.length || !introductionsGameSpeakerIds.length) {
    return;
  }

  const prompt = introductionsGamePrompts[Math.floor(Math.random() * introductionsGamePrompts.length)];
  state.introductionsChallengeAnswerId = prompt.speakerId;
  state.introductionsChallengePromptId = prompt.id;
  state.introductionsChallengeOptionIds = shuffleArray([...introductionsGameSpeakerIds]);
  state.lastIntroductionsFeedback =
    options.feedback ?? "Press play, listen carefully, then tap the child who said the name.";
}

function ensureIntroductionsChallenge() {
  if (!state.introductionsChallengeAnswerId || !state.introductionsChallengeOptionIds.length) {
    resetIntroductionsChallenge();
  }
}

function handleIntroductionsChallengePlay() {
  ensureIntroductionsChallenge();
  const prompt = introductionsPromptById(state.introductionsChallengePromptId);
  if (!prompt) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(prompt.audio, 0.78);
  }
  state.lastIntroductionsFeedback = "Listen again, then tap the child whose name you heard.";
  renderActivityPanel(currentTopic());
}

function handleIntroductionsChallengeGuess(kidId) {
  ensureIntroductionsChallenge();
  const answerPrompt = introductionsPromptById(state.introductionsChallengePromptId);
  const pickedKid = illustratedKids[kidId];
  const answerKid = illustratedKids[state.introductionsChallengeAnswerId];
  if (!answerPrompt || !pickedKid || !answerKid) {
    return;
  }

  if (kidId === answerPrompt.speakerId) {
    state.selectedFocusItemId = answerPrompt.sourceItemId;
    if (state.tapAudioEnabled) {
      speak(answerPrompt.audio, 0.78);
    }
    state.lastIntroductionsFeedback = `Correct! ${answerKid.hanziName} said ${answerPrompt.hanzi}`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetIntroductionsChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastIntroductionsFeedback = `Try again. You picked ${pickedKid.hanziName}, but the voice was ${answerKid.hanziName}.`;
  renderActivityPanel(currentTopic());
}

function introductionsBuildTarget() {
  return introductionsBuildPhrases.find((entry) => entry.id === state.introductionsBuildTargetId) ?? introductionsBuildPhrases[0];
}

function resetIntroductionsBuilder(options = {}) {
  const target = introductionsBuildPhrases[Math.floor(Math.random() * introductionsBuildPhrases.length)];
  state.introductionsBuildTargetId = target.id;
  state.introductionsBuildAvailableTokens = shuffleArray(target.tokens);
  state.introductionsBuildSelectedTokens = [];
  state.lastIntroductionsFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
}

function ensureIntroductionsBuilder() {
  const target = introductionsBuildTarget();
  if (!state.introductionsBuildTargetId || !state.introductionsBuildAvailableTokens.length && !state.introductionsBuildSelectedTokens.length) {
    resetIntroductionsBuilder();
    return;
  }
  if (!target) {
    resetIntroductionsBuilder();
  }
}

function handleIntroductionsBuildToken(tokenIndex) {
  const target = introductionsBuildTarget();
  const token = state.introductionsBuildAvailableTokens[tokenIndex];
  if (!target || !token) {
    return;
  }

  state.introductionsBuildSelectedTokens = [...state.introductionsBuildSelectedTokens, token];
  state.introductionsBuildAvailableTokens = state.introductionsBuildAvailableTokens.filter((_, index) => index !== tokenIndex);

  if (state.introductionsBuildSelectedTokens.length === target.tokens.length) {
    const correct = target.tokens.every((entry, index) => state.introductionsBuildSelectedTokens[index] === entry);
    if (correct) {
      if (state.tapAudioEnabled) {
        speak(target.audio, 0.78);
      }
      state.lastIntroductionsFeedback = `Correct! ${target.targetHanzi}`;
      if (target.sourceItemId) {
        state.selectedFocusItemId = target.sourceItemId;
        renderFocusDisplay(currentFocusItem());
        renderFocusExplorer();
        renderFocusStatus();
      }
    } else {
      state.lastIntroductionsFeedback = "Not quite. Try building the sentence again.";
    }
  }

  renderActivityPanel(currentTopic());
}

function handleIntroductionsBuildClear() {
  const target = introductionsBuildTarget();
  if (!target) {
    return;
  }
  state.introductionsBuildAvailableTokens = shuffleArray([...state.introductionsBuildAvailableTokens, ...state.introductionsBuildSelectedTokens]);
  state.introductionsBuildSelectedTokens = [];
  state.lastIntroductionsFeedback = "Try building the sentence again.";
  renderActivityPanel(currentTopic());
}

function ageGameItems() {
  const ageTopic = topicById("age");
  return ageGameItemIds
    .map((id) => ageTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function resetAgeChallenge(options = {}) {
  const items = ageGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.ageChallengeAnswerId = answer.id;
  state.ageChallengePromptId = answer.id;
  state.ageChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.lastAgeFeedback =
    options.feedback ?? "Press play, listen carefully, then choose the matching age or grade line.";
}

function ensureAgeChallenge() {
  if (!state.ageChallengeAnswerId || !state.ageChallengeOptionIds.length) {
    resetAgeChallenge();
  }
}

function handleAgeChallengePlay() {
  ensureAgeChallenge();
  const item = ageGameItems().find((entry) => entry.id === state.ageChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastAgeFeedback = `Listen again and find ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handleAgeChallengeGuess(itemId) {
  ensureAgeChallenge();
  const answer = ageGameItems().find((entry) => entry.id === state.ageChallengeAnswerId);
  const picked = ageGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.lastAgeFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetAgeChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastAgeFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function ageBuildTarget() {
  return ageBuildPhrases.find((entry) => entry.id === state.ageBuildTargetId) ?? ageBuildPhrases[0];
}

function resetAgeBuilder(options = {}) {
  const target = ageBuildPhrases[Math.floor(Math.random() * ageBuildPhrases.length)];
  state.ageBuildTargetId = target.id;
  state.ageBuildAvailableTokens = shuffleArray(target.tokens);
  state.ageBuildSelectedTokens = [];
  state.lastAgeFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
}

function ensureAgeBuilder() {
  const target = ageBuildTarget();
  if (!state.ageBuildTargetId || !state.ageBuildAvailableTokens.length && !state.ageBuildSelectedTokens.length) {
    resetAgeBuilder();
    return;
  }
  if (!target) {
    resetAgeBuilder();
  }
}

function handleAgeBuildToken(tokenIndex) {
  const target = ageBuildTarget();
  const token = state.ageBuildAvailableTokens[tokenIndex];
  if (!target || !token) {
    return;
  }

  state.ageBuildSelectedTokens = [...state.ageBuildSelectedTokens, token];
  state.ageBuildAvailableTokens = state.ageBuildAvailableTokens.filter((_, index) => index !== tokenIndex);

  if (state.ageBuildSelectedTokens.length === target.tokens.length) {
    const correct = target.tokens.every((entry, index) => state.ageBuildSelectedTokens[index] === entry);
    if (correct) {
      if (state.tapAudioEnabled) {
        speak(target.audio, 0.78);
      }
      state.lastAgeFeedback = `Correct! ${target.targetHanzi}`;
      if (target.sourceItemId) {
        state.selectedFocusItemId = target.sourceItemId;
        renderFocusDisplay(currentFocusItem());
        renderFocusExplorer();
        renderFocusStatus();
      }
    } else {
      state.lastAgeFeedback = "Not quite. Try building the sentence again.";
    }
  }

  renderActivityPanel(currentTopic());
}

function handleAgeBuildClear() {
  const target = ageBuildTarget();
  if (!target) {
    return;
  }
  state.ageBuildAvailableTokens = shuffleArray([...state.ageBuildAvailableTokens, ...state.ageBuildSelectedTokens]);
  state.ageBuildSelectedTokens = [];
  state.lastAgeFeedback = "Try building the sentence again.";
  renderActivityPanel(currentTopic());
}

function politeGameItems() {
  const politeTopic = topicById("polite-words");
  return politeGameItemIds
    .map((id) => politeTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function politeMeaningLabel(itemId) {
  const labels = {
    "thank-you": "Thank a friend who helped you",
    "youre-welcome": "Reply kindly after someone thanks you",
    sorry: "Say sorry after a mistake",
    "never-mind": "Forgive kindly after an apology"
  };

  return labels[itemId] ?? "";
}

function resetPoliteMatchGame(options = {}) {
  const items = politeGameItems();
  state.politeSelectedPhraseId = null;
  state.politeMatchedIds = new Set();
  state.politePhraseOrder = shuffleArray(items.map((item) => item.id));
  state.politeMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.lastPoliteFeedback = options.feedback ?? "Tap a Chinese phrase, then tap the matching meaning.";
}

function ensurePoliteMatchGame() {
  const items = politeGameItems();
  if (
    !state.politePhraseOrder.length ||
    state.politePhraseOrder.length !== items.length ||
    state.politeMeaningOrder.length !== items.length
  ) {
    resetPoliteMatchGame();
  }
}

function handlePoliteMatchPhrase(itemId) {
  const item = politeGameItems().find((entry) => entry.id === itemId);
  if (!item || state.politeMatchedIds.has(itemId)) {
    return;
  }

  state.politeSelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastPoliteFeedback = `Now find the meaning for ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handlePoliteMatchAttempt(targetId) {
  if (!state.politeSelectedPhraseId || state.politeMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.politeSelectedPhraseId;
  const selectedItem = politeGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.politeMatchedIds = new Set([...state.politeMatchedIds, targetId]);
    state.politeSelectedPhraseId = null;
    state.lastPoliteFeedback = `Correct! ${selectedItem.hanzi} matches that meaning.`;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.politeMatchedIds.size === politeGameItems().length) {
      state.lastPoliteFeedback = "Great job! You matched all the polite phrases.";
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.lastPoliteFeedback = `Try again. ${selectedItem.hanzi} does not match that meaning.`;
  renderActivityPanel(currentTopic());
}

function resetPoliteChallenge(options = {}) {
  const items = politeGameItems();
  if (!items.length) {
    return;
  }

  const answer = items[Math.floor(Math.random() * items.length)];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.politeChallengeAnswerId = answer.id;
  state.politeChallengePromptId = answer.id;
  state.politeChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.lastPoliteFeedback =
    options.feedback ?? "Press play, listen carefully, then choose the matching polite phrase.";
}

function ensurePoliteChallenge() {
  if (!state.politeChallengeAnswerId || !state.politeChallengeOptionIds.length) {
    resetPoliteChallenge();
  }
}

function handlePoliteChallengePlay() {
  ensurePoliteChallenge();
  const item = politeGameItems().find((entry) => entry.id === state.politeChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastPoliteFeedback = `Listen again and find ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handlePoliteChallengeGuess(itemId) {
  ensurePoliteChallenge();
  const answer = politeGameItems().find((entry) => entry.id === state.politeChallengeAnswerId);
  const picked = politeGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.lastPoliteFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetPoliteChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastPoliteFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handleGreetingsChallengePlay() {
  ensureGreetingsChallenge();
  const item = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengePromptId);
  if (!item) {
    return;
  }

  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.lastGreetingsFeedback = `Listen again and find ${item.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function handleGreetingsChallengeGuess(itemId) {
  ensureGreetingsChallenge();
  const answer = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengeAnswerId);
  const picked = greetingsGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.lastGreetingsFeedback = `Correct! ${answer.hanzi} matches the audio.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    window.setTimeout(() => {
      resetGreetingsChallenge();
      renderActivityPanel(currentTopic());
    }, 650);
    return;
  }

  state.lastGreetingsFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
  renderActivityPanel(currentTopic());
}

function mathChallengeAudioText() {
  if (state.mathChallengeAnswer === null) {
    return "";
  }

  const chineseOperator = state.mathChallengeOperator === "+" ? "加" : "减";
  return `${numberHanzi(state.mathChallengeLeft)}${chineseOperator}${numberHanzi(state.mathChallengeRight)}等于${numberHanzi(state.mathChallengeAnswer)}`;
}

function handleMathChallengeSubmit(rawValue) {
  ensureMathChallenge();
  if (state.mathChallengeSolved) {
    return;
  }

  const trimmed = rawValue.trim();
  state.mathChallengeInput = trimmed;
  const answer = Number(trimmed);
  const audioText = mathChallengeAudioText();

  if (!Number.isFinite(answer)) {
    state.lastMathFeedback = "Type one number first.";
    renderActivityPanel(currentTopic());
    return;
  }

  if (answer === state.mathChallengeAnswer) {
    if (state.tapAudioEnabled && audioText) {
      speak(audioText, 0.78);
    }
    state.lastMathFeedback = `Correct! ${audioText}`;
    state.mathChallengeSolved = true;
  } else {
    state.lastMathFeedback = "Try again.";
  }

  renderActivityPanel(currentTopic());
}

function handleNumberChallengeGuess(value) {
  ensureNumberChallenge();
  const target = state.numberChallengeTargetValue;
  const targetItem = buildNumberItem(target);

  if (value === target) {
    state.selectedFocusItemId = targetItem.id;
    if (state.tapAudioEnabled) {
      speak(targetItem.audio, 0.78);
    }
    state.lastNumberFeedback = `Correct! ${targetItem.hanzi} is right. Here comes a new round.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusWordList();
    renderFocusStatus();

    if (state.numberChallengeAdvanceTimer) {
      window.clearTimeout(state.numberChallengeAdvanceTimer);
    }

    state.numberChallengeAdvanceTimer = window.setTimeout(() => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(currentTopic());
      renderFocusStatus();
      state.numberChallengeAdvanceTimer = null;
    }, 700);
    return;
  }

  state.lastNumberFeedback = `Try again. This group is ${targetItem.hanzi}, not ${buildNumberItem(value).hanzi}.`;
  renderFocusStatus();
}

function focusItemsForTopic(topic = currentTopic()) {
  if (topic.id === "numbers") {
    return numberStageItems();
  }

  return topic.focusItems ?? [{ id: "focus", ...topic.focus }];
}

function currentFocusItem() {
  const items = focusItemsForTopic();
  return items.find((item) => item.id === state.selectedFocusItemId) ?? items[0];
}

const bodyDiagramLayout = {
  left: ["hair", "ears", "nose", "hand", "leg", "foot"],
  right: ["head", "forehead", "eyes", "mouth", "neck", "arm"]
};
const bodyCoreItemIds = ["head", "hair", "eyes", "ears", "nose", "mouth", "hand", "foot"];
const bodyBonusItemIds = ["forehead", "neck", "arm", "leg"];

function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function bodyMatchItems() {
  const ids = state.bodyMatchIncludeBonus ? [...bodyCoreItemIds, ...bodyBonusItemIds] : bodyCoreItemIds;
  const bodyTopic = topicById("body");
  return ids
    .map((id) => bodyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function nextBodyRound() {
  const allIds = bodyMatchItems().map((item) => item.id);
  const remaining = allIds.filter((id) => !state.bodyMatchedIds.has(id));

  state.bodySelectedChineseId = null;
  state.bodySelectedEnglishId = null;
  state.bodyRoundIds = shuffleArray(remaining).slice(0, Math.min(3, remaining.length));
  state.bodyChineseOrder = shuffleArray(state.bodyRoundIds);
  state.bodyEnglishOrder = shuffleArray(state.bodyRoundIds);
}

function resetBodyMatchGame() {
  state.bodyMatchedIds = new Set();
  state.bodyMatchUniverseKey = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  nextBodyRound();
  state.lastBodyFeedback = "Match the Chinese words with the English words.";
}

function ensureBodyMatchGame() {
  const ids = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  if (!state.bodyRoundIds.length || state.bodyMatchUniverseKey !== ids) {
    resetBodyMatchGame();
  }
}

function handleBodyMatchChinese(itemId) {
  state.bodySelectedChineseId = itemId;
  state.bodySelectedEnglishId = null;
  selectFocusItem(itemId, {
    playAudio: true,
    bodyFeedback: "Now drag it to the matching English word, or tap the English word."
  });
}

function handleBodyMatchAttempt(englishId, chineseId = state.bodySelectedChineseId) {
  const itemsById = Object.fromEntries(bodyMatchItems().map((item) => [item.id, item]));

  if (!chineseId) {
    state.bodySelectedEnglishId = englishId;
    state.lastBodyFeedback = "Tap a Chinese word first, or drag one into a row.";
    renderFocusExplorer();
    renderFocusStatus();
    return;
  }

  state.bodySelectedEnglishId = englishId;

  if (englishId === chineseId) {
    state.bodyMatchedIds.add(englishId);
    state.bodySelectedChineseId = null;
    state.bodySelectedEnglishId = null;
    selectFocusItem(englishId, {
      playAudio: state.tapAudioEnabled,
      bodyFeedback: `Nice match! ${itemsById[englishId].hanzi} means ${itemsById[englishId].english}.`
    });

    const roundComplete = state.bodyRoundIds.every((id) => state.bodyMatchedIds.has(id));
    if (roundComplete) {
      const total = bodyMatchItems().length;
      const allDone = state.bodyMatchedIds.size === total;
      state.lastBodyFeedback = allDone
        ? "Great job! You matched all the words."
        : "Round complete! Tap Next set for the next words.";
      renderFocusExplorer();
      renderFocusStatus();
    }
    return;
  }

  state.lastBodyFeedback = `Try again. ${itemsById[chineseId].hanzi} is not ${itemsById[englishId].english}.`;
  renderFocusExplorer();
  renderFocusStatus();
}

function topicById(topicId) {
  return topicData.find((topic) => topic.id === topicId);
}

function selectedTopicGroupId() {
  return (
    topicGroups.find((group) => group.topicIds.includes(state.selectedTopicId))?.id ??
    topicGroups[0].id
  );
}

function bookById(bookId) {
  return books.find((book) => book.id === bookId) ?? books[0];
}

function bookCategoryForBook(bookId) {
  return bookHomeCategories.find((category) => category.bookIds.includes(bookId)) ?? bookHomeCategories[0];
}

function currentBook() {
  return bookById(state.selectedBookId);
}

function currentLesson() {
  const book = currentBook();
  const exactLesson = book.lessons.find((lesson) => lesson.lesson === state.selectedLessonNumber);
  if (exactLesson && exactLesson.topicId === state.selectedTopicId) {
    return exactLesson;
  }

  return book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
}

function syncBookSelectionFromTopic() {
  const topic = currentTopic();
  const firstMatch = books.find((book) =>
    book.lessons.some((lesson) => topic.steps.some((step) => book.id === step.book.toLowerCase() && step.lesson === lesson.lesson))
  );

  if (firstMatch) {
    state.selectedBookId = firstMatch.id;
    state.selectedBookCategoryId = bookCategoryForBook(firstMatch.id).id;
  }

  syncLessonSelectionFromTopic();
}

function syncLessonSelectionFromTopic() {
  const book = currentBook();
  const firstMatch = book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
  state.selectedLessonNumber = firstMatch.lesson;
}

function focusLearningPanel() {
  if (!detailLayout) {
    return;
  }

  detailLayout.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function narrowTopicBrowserTo(groupId) {
  state.openTopicGroups = new Set([groupId]);
}

function categoryIdForTopic(topicId) {
  return learningHomeCategories.find((category) => category.topicIds.includes(topicId))?.id ?? "foundations";
}

function topicPageUrl(topicId) {
  return `${window.location.pathname}?topic=${encodeURIComponent(topicId)}#topic-detail`;
}

function updateTopicPageVisibility() {
  detailLayout?.classList.toggle("is-hidden", !state.topicPageOpen);
  document.body.classList.toggle("is-topic-page", state.topicPageOpen);
}

function scrollCategorySectionIntoView(categoryId) {
  requestAnimationFrame(() => {
    document.getElementById(categoryId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function openTopicPage(topicId, options = {}) {
  const topic = topicById(topicId);
  if (!topic) {
    return;
  }

  state.selectedTopicId = topic.id;
  state.expandedCategoryId = categoryIdForTopic(topic.id);
  state.topicPageOpen = true;
  syncBookSelectionFromTopic();
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();

  const nextUrl = topicPageUrl(topic.id);
  if (options.replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }

  if (options.scroll !== false) {
    focusLearningPanel();
  }
}

function switchView(view) {
  state.currentView = view;
  document.querySelectorAll(".view-tab").forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  topicPanel.classList.toggle("is-hidden", view !== "topics");
  bookPanel.classList.toggle("is-hidden", view !== "books");
  document.querySelectorAll("[data-global-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.globalView === view);
  });
  renderStickyNav();
  updateLearningCultureNav();
}

function toggleTopicGroup(groupId) {
  if (state.openTopicGroups.has(groupId)) {
    state.openTopicGroups.delete(groupId);
  } else {
    state.openTopicGroups.add(groupId);
  }

  renderTopics();
}

function renderTopicScene(topic) {
  const style = `background: linear-gradient(180deg, ${topic.iconColor}, ${topic.iconColor}dd); --topic-accent:${topic.iconAccent ?? "#f5d9a6"};`;

  if (topic.id === "numbers") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-numbers" style="${style}">
        <span class="topic-scene-dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
        <span class="topic-scene-chip-row" aria-hidden="true">
          <span class="topic-scene-chip">一</span>
          <span class="topic-scene-chip">二</span>
          <span class="topic-scene-chip">三</span>
        </span>
      </span>
    `;
  }

  if (topic.id === "multiplication-rhyme") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-rhyme" style="${style}">
        <span class="topic-scene-rhyme-row" aria-hidden="true">
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip topic-scene-chip-accent">81</span>
        </span>
        <span class="topic-scene-rhythm-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "greetings") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-greetings" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-left" aria-hidden="true">你</span>
        <span class="topic-scene-bubble topic-scene-bubble-right" aria-hidden="true">好</span>
        <span class="topic-scene-spark topic-scene-spark-top" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "polite-words") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-polite" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-wide" aria-hidden="true">谢谢</span>
        <span class="topic-scene-heart" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "introductions") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-intro" style="${style}">
        <span class="topic-scene-name-tag" aria-hidden="true">我叫</span>
        <span class="topic-scene-faces" aria-hidden="true">
          <span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "age") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-age" style="${style}">
        <span class="topic-scene-pill topic-scene-pill-age" aria-hidden="true">六岁</span>
        <span class="topic-scene-pill topic-scene-pill-grade" aria-hidden="true">一年级</span>
      </span>
    `;
  }

  return `<span class="topic-scene" style="background:${topic.iconColor};">${topic.iconText}</span>`;
}

function displayControlsMarkup() {
  return `
    <span class="learning-display-controls" aria-label="Display options">
      <button class="learning-display-toggle" type="button" data-display-toggle="sound"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="pinyin"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="english"></button>
    </span>
  `;
}

function bindDisplayControls() {
  learningCultureNav.querySelectorAll("[data-display-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.displayToggle === "sound") {
        state.tapAudioEnabled = !state.tapAudioEnabled;
      } else if (button.dataset.displayToggle === "pinyin") {
        state.showPinyin = !state.showPinyin;
      } else {
        state.showEnglish = !state.showEnglish;
      }
      updateDisplayControls();
    });
  });
}

function renderTopicStickyNav() {
  learningCultureNav.innerHTML = learningHomeCategories
    .map(
      (category) => `
        <button
          class="learning-culture-nav-item${category.id === state.expandedCategoryId ? " active" : ""}"
          type="button"
          data-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${category.id === state.expandedCategoryId ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.enTitle}</span>
        </button>
      `
    )
    .join("") + displayControlsMarkup();

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expandedCategoryId = button.dataset.target;
      state.topicPageOpen = false;
      renderTopics();
      updateTopicPageVisibility();
      window.history.pushState(null, "", "#topics-panel");
      scrollCategorySectionIntoView(button.dataset.target);
    });
  });
}

function bookAccent(index) {
  const accents = ["#be5b49", "#aa7051", "#517b8d", "#6d8a4f", "#c48d46", "#6f7fa4", "#8f6988", "#b8863e"];
  return accents[index % accents.length];
}

function renderBookStickyNav() {
  learningCultureNav.innerHTML = bookHomeCategories
    .map((category) => {
      const isActive = category.id === state.selectedBookCategoryId;
      return `
        <button
          class="learning-culture-nav-item book-nav-item${isActive ? " active" : ""}"
          type="button"
          data-book-category-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${isActive ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.bookIds.length} books</span>
        </button>
      `;
    })
    .join("") + displayControlsMarkup();

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-book-category-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryTarget);
      if (!selectedCategory) {
        return;
      }

      state.selectedBookCategoryId = selectedCategory.id;
      if (!selectedCategory.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(selectedCategory.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      state.topicPageOpen = false;
      renderBooks();
      renderTopicDetail();
      updateTopicPageVisibility();
      document.getElementById(`book-category-${selectedCategory.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderStickyNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books") {
    renderBookStickyNav();
  } else {
    renderTopicStickyNav();
  }
  renderFocusControls();
}

function categoryIconMarkup(category) {
  if (category.iconEmoji) {
    return `<span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>`;
  }

  return `
    <img
      class="category-generated-icon category-generated-icon-${category.id}"
      src="${category.iconSrc}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}

function renderTopics() {
  topicGroupsRoot.innerHTML = "";
  renderStickyNav();

  const board = document.createElement("div");
  board.className = "learning-home-board";
  learningHomeCategories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "learning-home-card";
    card.style.setProperty("--category-accent", category.accent);
    if (category.id === state.expandedCategoryId) {
      card.classList.add("is-selected");
    }

    card.innerHTML = `
      <button class="learning-home-card-main" type="button" aria-label="Open ${category.enTitle}">
        <span class="learning-card-count">${category.topicIds.length} topics</span>
        <span class="learning-home-card-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <span class="topic-copy">
          <span class="topic-zh-title">${category.zhTitle}</span>
          <span class="topic-row-title">${category.enTitle}</span>
          <span class="topic-row-meta">${category.hint}</span>
        </span>
      </button>
    `;

    card.querySelector(".learning-home-card-main").addEventListener("click", () => {
      state.expandedCategoryId = category.id;
      renderTopics();
      scrollCategorySectionIntoView(category.id);
    });
    board.appendChild(card);
  });

  topicGroupsRoot.appendChild(board);

  learningHomeCategories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "learning-category-section";
    section.id = category.id;
    section.style.setProperty("--category-accent", category.accent);
    section.innerHTML = `
      <div class="learning-category-head">
        <span class="learning-category-head-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <div>
          <h3>${category.zhTitle}</h3>
          <h4>${category.enTitle}</h4>
          <p>${category.hint}</p>
        </div>
      </div>
      <div class="category-topic-grid">
        ${category.topicIds
          .map((topicId) => topicById(topicId))
          .filter(Boolean)
          .map((topic) => {
            const meta = topicCardMeta[topic.id] ?? {};
            return `
              <a class="category-topic-card${topic.id === state.selectedTopicId ? " is-selected" : ""}" href="${topicPageUrl(topic.id)}" data-topic-id="${topic.id}">
                <span class="category-topic-zh">${meta.zhTitle ?? topic.iconText}</span>
                <span class="category-topic-en">${meta.enTitle ?? topic.title}</span>
                <span class="category-topic-hint">${meta.hint ?? topic.progressLabel}</span>
              </a>
            `;
          })
          .join("")}
      </div>
    `;

    section.querySelectorAll("[data-topic-id]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        openTopicPage(link.dataset.topicId);
      });
    });

    topicGroupsRoot.appendChild(section);
  });

  updateLearningCultureNav();
}

function renderBooks() {
  bookSelect.innerHTML = books
    .map((book) => `<option value="${book.id}">${book.label}</option>`)
    .join("");
  bookSelect.value = state.selectedBookId;

  const book = currentBook();
  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  lessonSelect.innerHTML = book.lessons
    .map(
      (lesson) =>
        `<option value="${lesson.lesson}">Lesson ${lesson.lesson}: ${lesson.title}</option>`
    )
    .join("");

  const activeLesson = currentLesson();
  lessonSelect.value = String(activeLesson.lesson);

  bookBrowser.innerHTML = `
    <div class="learning-home-board book-home-board">
      ${bookHomeCategories
        .map((category) => {
          const isSelected = category.id === state.selectedBookCategoryId;
          return `
            <article class="learning-home-card book-home-card${isSelected ? " is-selected" : ""}" style="--category-accent: ${category.accent};">
              <button class="learning-home-card-main" type="button" data-book-category-card="${category.id}" aria-label="Open ${category.enTitle}">
                <span class="learning-card-count">${category.bookIds.length} books</span>
                <span class="learning-home-card-icon" aria-hidden="true">
                  <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
                </span>
                <span class="topic-copy">
                  <span class="topic-zh-title">${category.zhTitle}</span>
                  <span class="topic-row-title">${category.enTitle}</span>
                  <span class="topic-row-meta">${category.hint}</span>
                </span>
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  lookupCard.innerHTML = bookHomeCategories
    .map((category) => {
      const booksInCategory = category.bookIds.map((bookId) => bookById(bookId));
      const isActiveCategory = category.id === state.selectedBookCategoryId;
      const selectedBookInCategory =
        booksInCategory.find((entry) => entry.id === state.selectedBookId) ?? booksInCategory[0];
      const selectedBookIndex = books.findIndex((entry) => entry.id === selectedBookInCategory.id);

      return `
        <section
          class="learning-category-section book-category-section${isActiveCategory ? " is-selected" : ""}"
          id="book-category-${category.id}"
          style="--category-accent: ${category.accent}; --book-accent: ${bookAccent(Math.max(selectedBookIndex, 0))};"
        >
          <div class="learning-category-head">
            <span class="learning-category-head-icon" aria-hidden="true">
              <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
            </span>
            <div>
              <h3>${category.zhTitle}</h3>
              <h4>${category.enTitle}</h4>
              <p>${category.hint}</p>
            </div>
          </div>
          <div class="book-category-grid">
            ${booksInCategory
              .map((entry) => {
                const firstTopic = topicById(entry.lessons[0]?.topicId);
                const isSelectedBook = entry.id === selectedBookInCategory.id;
                const entryIndex = books.findIndex((bookEntry) => bookEntry.id === entry.id);
                return `
                  <button
                    class="book-browser-card book-category-book-card${isSelectedBook ? " is-selected" : ""}"
                    style="--book-accent: ${bookAccent(Math.max(entryIndex, 0))}"
                    type="button"
                    data-book-browser="${entry.id}"
                  >
                    <span>${entry.label}</span>
                    <small>${entry.lessons.length} lessons</small>
                    <em>${firstTopic?.title ?? "Chinese practice"}</em>
                  </button>
                `;
              })
              .join("")}
          </div>
          <div class="book-category-lessons">
            <div class="book-category-lessons-head">
              <div>
                <span class="progress-label">Lessons</span>
                <h3>${selectedBookInCategory.label}</h3>
                <p>Pick a lesson to open the matching topic practice.</p>
              </div>
            </div>
            <div class="book-lesson-grid">
              ${selectedBookInCategory.lessons
                .map((lesson) => {
                  const lessonTopic = topicById(lesson.topicId);
                  const isSelectedLesson =
                    selectedBookInCategory.id === book.id && lesson.lesson === activeLesson.lesson;
                  return `
                    <button
                      class="book-lesson-card${isSelectedLesson ? " is-selected" : ""}"
                      type="button"
                      data-book-lesson="${selectedBookInCategory.id}:${lesson.lesson}"
                    >
                      <span>Lesson ${lesson.lesson}</span>
                      <strong>${lesson.title}</strong>
                      <small>${lessonTopic?.title ?? "Topic practice"}</small>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>
      `;
    })
    .join("");

  bookBrowser.querySelectorAll("[data-book-category-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryCard);
      if (!category) {
        return;
      }

      state.selectedBookCategoryId = category.id;
      if (!category.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(category.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      renderBooks();
      document.getElementById(`book-category-${category.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-browser]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedBook = books.find((entry) => entry.id === button.dataset.bookBrowser);
      if (!selectedBook) {
        return;
      }

      state.selectedBookCategoryId = bookCategoryForBook(selectedBook.id).id;
      state.selectedBookId = selectedBook.id;
      state.selectedLessonNumber = selectedBook.lessons[0].lesson;
      state.selectedTopicId = selectedBook.lessons[0].topicId;
      renderBooks();
      renderTopicDetail();
      document.getElementById(`book-category-${state.selectedBookCategoryId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonNumber] = button.dataset.bookLesson.split(":");
      selectBookLesson(bookId, Number(lessonNumber));
    });
  });

  renderStickyNav();
}

function updateLearningCultureNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books" && !bookPanel.classList.contains("is-hidden")) {
    const bookBoard = bookBrowser.querySelector(".book-home-board");
    const bookSections = lookupCard.querySelectorAll(".book-category-section");
    const bookNavItems = learningCultureNav.querySelectorAll("[data-book-category-target]");
    const showBookNav = bookBoard && window.scrollY > bookBoard.offsetTop + bookBoard.offsetHeight - 60;
    learningCultureNav.classList.toggle("visible", showBookNav);
    if (!showBookNav) {
      return;
    }

    let activeCategoryId = state.selectedBookCategoryId;
    const scrollY = window.scrollY + 120;
    bookSections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        activeCategoryId = section.id.replace("book-category-", "");
      }
    });

    bookNavItems.forEach((item) => {
      const isActive = item.dataset.bookCategoryTarget === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  const cardGrid = topicGroupsRoot.querySelector(".learning-home-board");
  const sections = topicGroupsRoot.querySelectorAll(".learning-category-section");
  const navItems = learningCultureNav.querySelectorAll("[data-target]");

  if (state.topicPageOpen) {
    learningCultureNav.classList.add("visible");
    const activeCategoryId = state.expandedCategoryId ?? categoryIdForTopic(state.selectedTopicId);
    navItems.forEach((item) => {
      const isActive = item.dataset.target === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  if (!cardGrid || state.currentView !== "topics" || topicPanel.classList.contains("is-hidden")) {
    learningCultureNav.classList.remove("visible");
    return;
  }

  const showNav = window.scrollY > cardGrid.offsetTop + cardGrid.offsetHeight - 60;
  learningCultureNav.classList.toggle("visible", showNav);
  if (!showNav) {
    return;
  }

  let current = "";
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.target === current;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
}

function renderFocusControls() {
  const topic = currentTopic();
  document.body.classList.toggle("is-pinyin-hidden", !state.showPinyin);
  document.body.classList.toggle("is-english-hidden", !state.showEnglish);
  const controlPairs = [
    [toggleAudioButton, state.tapAudioEnabled, "Tap sound"],
    [togglePinyinButton, state.showPinyin, "Pinyin"],
    [toggleArabicButton, state.showArabic, "Numbers"],
    [toggleEnglishButton, state.showEnglish, "English"]
  ];

  controlPairs.forEach(([button, enabled, label]) => {
    button.classList.toggle("is-toggle-active", enabled);
    button.classList.toggle("is-toggle-inactive", !enabled);
    button.textContent = `${label} ${enabled ? "on" : "off"}`;
  });

  toggleArabicButton.classList.toggle("is-hidden", topic.id !== "numbers");

  learningCultureNav?.querySelectorAll("[data-display-toggle]").forEach((button) => {
    const control = button.dataset.displayToggle;
    const enabled =
      control === "sound"
        ? state.tapAudioEnabled
        : control === "pinyin"
          ? state.showPinyin
          : state.showEnglish;
    const label = control === "sound" ? "Sound" : control === "pinyin" ? "Pinyin" : "English";
    button.classList.toggle("is-toggle-active", enabled);
    button.classList.toggle("is-toggle-inactive", !enabled);
    button.textContent = `${label} ${enabled ? "on" : "off"}`;
    button.setAttribute("aria-pressed", String(enabled));
  });
}

function renderFocusDisplay(item) {
  if (!item) {
    focusHanzi.textContent = "";
    focusPinyin.textContent = "";
    focusEnglish.textContent = "";
    return;
  }

  focusHanzi.textContent = item.hanzi;
  focusPinyin.textContent = state.showPinyin ? item.pinyin : "";
  focusEnglish.textContent = state.showEnglish ? item.english : "";
}

function bodySentenceForItem(item) {
  return {
    hanzi: `我的${item.hanzi}`,
    pinyin: `wǒ de ${item.pinyin}`,
    english: `my ${item.english}`
  };
}

function renderFocusStatus() {
  const topic = currentTopic();

  if (topic.id === "body") {
    focusStatus.textContent =
      state.lastBodyFeedback || "Tap a body word to hear it, then point to the same part.";
    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    focusStatus.textContent =
      stage.telephoneMode
        ? "Listen to the question, then the answer. Telephone numbers are for speaking and listening, not counting objects."
        : state.lastNumberFeedback || `Now learning ${stage.title}. ${stage.summary}`;
    return;
  }

  if (topic.id === "greetings") {
    focusStatus.textContent =
      "Tap a greeting, play a short exchange, then say it back with a wave or smile.";
    return;
  }

  if (topic.id === "polite-words") {
    focusStatus.textContent =
      "Tap a polite phrase, listen to the exchange, then use it in a real helping or sharing moment.";
    return;
  }

  if (topic.id === "introductions") {
    focusStatus.textContent =
      "Tap a name phrase, listen to the exchange, then practice saying your own name clearly.";
    return;
  }

  if (topic.id === "family") {
    focusStatus.textContent = "";
    return;
  }

  if (topic.id === "age") {
    focusStatus.textContent =
      "Tap an age or grade line, listen to the exchange, then swap in the child's real age or school year.";
    return;
  }

  if (topic.id === "time-date") {
    focusStatus.textContent =
      "Tap a time card, hear the sentence, then match it to a real part of the day like waking up or going to school.";
    return;
  }

  focusStatus.textContent = "Tap a card to hear it and see it more clearly.";
}

function selectFocusItem(itemId, options = {}) {
  const topic = currentTopic();
  const items = focusItemsForTopic(topic);
  const item = items.find((entry) => entry.id === itemId) ?? items[0];

  state.selectedFocusItemId = item.id;
  if (topic.id === "body") {
    state.lastBodyFeedback =
      options.bodyFeedback ?? `Showing ${item.hanzi}${state.showEnglish ? ` (${item.english})` : ""}.`;
  }
  renderFocusDisplay(item);
  renderFocusWordList();
  renderFocusExplorer();
  renderFocusStatus();

  if (options.playAudio && state.tapAudioEnabled) {
    speak(options.audioText ?? item.audio, 0.78);
  }
}

function renderFocusWordList() {
  if (
    ["body", "greetings", "polite-words", "introductions", "age", "time-date", "multiplication-rhyme"].includes(currentTopic().id) ||
    (currentTopic().id === "numbers" && currentNumberStage().telephoneMode)
  ) {
    focusWordList.innerHTML = "";
    focusWordList.classList.add("is-hidden");
    return;
  }

  focusWordList.classList.remove("is-hidden");
  const topic = currentTopic();
  const items = focusItemsForTopic();
  focusWordList.classList.toggle("is-family-book-words", topic.id === "family");
  const visibleItems =
    topic.id === "numbers"
      ? numberWordListItems(items, currentFocusItem(), currentNumberStage())
      : topic.id === "family"
        ? familyBookWordItems()
        : items;
  focusWordList.innerHTML = "";

  if (topic.id === "family") {
    const heading = document.createElement("div");
    heading.className = "family-book-words-heading";
    heading.innerHTML = `
      <p class="body-match-kicker">Book words</p>
    `;
    focusWordList.appendChild(heading);
  }

  visibleItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "focus-word-button";
    if (item.id === state.selectedFocusItemId) {
      button.classList.add("is-selected");
    }

    button.innerHTML = `
      <span class="focus-word-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="focus-word-label">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="focus-helper">${item.english}</span>` : ""}
    `;

    button.addEventListener("click", () => {
      selectFocusItem(item.id, { playAudio: true });
    });

    focusWordList.appendChild(button);
  });

  if (topic.id === "family") {
    const note = document.createElement("div");
    note.className = "greetings-note-card family-book-words-note";
    note.innerHTML = `
      <p class="body-match-kicker">Useful note</p>
      <p class="greetings-note-hanzi">爸爸 / 妈妈 / 哥哥 / 弟弟 / 姐姐 / 妹妹</p>
      <p class="greetings-note-copy">
        In sentences like <strong>我爱爸爸</strong> and <strong>我爱妈妈</strong>, the family word names who the child loves. <strong>我</strong> names the speaker, and <strong>爱</strong> names the feeling.
      </p>
      <p class="greetings-note-copy">
        <strong>哥哥</strong> and <strong>弟弟</strong> are the brother pair: older brother, then younger brother. <strong>姐姐</strong> and <strong>妹妹</strong> are the sister pair: older sister, then younger sister.
      </p>
      <p class="greetings-note-copy">
        In listening practice, the repeated family word is the anchor. For sisters, <strong>姐姐</strong> and <strong>妹妹</strong> both use <strong>女</strong>, so children can group the two sister words together.
      </p>
    `;
    focusWordList.appendChild(note);
  }
}

function numberWordListItems(items, currentItem, stage) {
  if (stage.end <= 10) {
    return items;
  }

  const byValue = [...items].sort((left, right) => left.value - right.value);
  const currentIndex = Math.max(
    0,
    byValue.findIndex((item) => item.id === currentItem.id)
  );
  const picked = new Map([[currentItem.id, currentItem]]);

  const offsets = [-1, 1, -2, 2];
  offsets.forEach((offset) => {
    const candidate = byValue[currentIndex + offset];
    if (candidate && picked.size < 5) {
      picked.set(candidate.id, candidate);
    }
  });

  if (picked.size < Math.min(5, byValue.length)) {
    shuffleArray(byValue).forEach((candidate) => {
      if (picked.size < Math.min(5, byValue.length)) {
        picked.set(candidate.id, candidate);
      }
    });
  }

  return shuffleArray([...picked.values()]);
}

function renderBodyLabelButton(item, align) {
  const isActive = item.id === state.selectedFocusItemId;
  return `
    <button
      class="body-label-button${isActive ? " is-active" : " is-muted"}"
      type="button"
      data-body-item-id="${item.id}"
      data-body-align="${align}"
      aria-pressed="${isActive ? "true" : "false"}"
    >
      <span class="body-label-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="body-label-pinyin">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="body-label-english">${item.english}</span>` : ""}
    </button>
  `;
}

function renderBodyExplorer() {
  ensureBodyMatchGame();
  const item = currentFocusItem();
  const sentence = bodySentenceForItem(item);
  const items = Object.fromEntries(focusItemsForTopic().map((entry) => [entry.id, entry]));
  const matchItems = Object.fromEntries(bodyMatchItems().map((entry) => [entry.id, entry]));
  const roundComplete =
    state.bodyRoundIds.length > 0 && state.bodyRoundIds.every((id) => state.bodyMatchedIds.has(id));
  const allDone =
    bodyMatchItems().length > 0 && state.bodyMatchedIds.size === bodyMatchItems().length;
  focusExplorer.innerHTML = `
    <div class="body-game">
      <div class="body-practice-visual">
        <div class="body-diagram">
          <div class="body-label-column body-label-column-left">
            ${bodyDiagramLayout.left.map((id) => renderBodyLabelButton(items[id], "left")).join("")}
          </div>
          <div class="body-scene">
            <div class="body-scene-card">
              <img
                class="body-scene-kid"
                src="assets/body/body-topic-kid-largehead.webp"
                alt="Cartoon child for body parts learning activity"
              />
              <div class="body-part-indicator body-part-indicator-${item.id}" aria-hidden="true"></div>
            </div>
          </div>
          <div class="body-label-column body-label-column-right">
            ${bodyDiagramLayout.right.map((id) => renderBodyLabelButton(items[id], "right")).join("")}
          </div>
        </div>
        <div class="body-match-panel">
          <div class="body-match-heading">
            <div>
              <p class="body-match-kicker">Match Game</p>
              <h4>Chinese to English</h4>
            </div>
            <div class="body-match-actions">
              <button class="small-button" type="button" data-body-toggle-bonus>
                Bonus words ${state.bodyMatchIncludeBonus ? "on" : "off"}
              </button>
              <button class="small-button" type="button" data-body-reset-match>
                New mix
              </button>
            </div>
          </div>
          <p class="body-match-helper">Drag a Chinese card into the matching row, or tap Chinese then English.</p>
          <div class="body-match-progress">
            Matched ${state.bodyMatchedIds.size} of ${bodyMatchItems().length}
          </div>
          <div class="body-match-pool">
            ${state.bodyChineseOrder
              .filter((id) => !state.bodyMatchedIds.has(id))
              .map((id) => {
                const matchItem = matchItems[id];
                const selected = state.bodySelectedChineseId === id;
                return `
                  <button
                    class="body-match-card body-match-card-chinese${selected ? " is-selected" : ""}"
                    type="button"
                    draggable="true"
                    data-body-match-chinese="${id}"
                  >
                    <span class="body-match-hanzi">${matchItem.hanzi}</span>
                    ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
          <div class="body-match-rows">
            ${state.bodyEnglishOrder
              .map((id) => {
                const matchItem = matchItems[id];
                if (!matchItem) {
                  return "";
                }
                const solved = state.bodyMatchedIds.has(id);
                const selected = state.bodySelectedEnglishId === id;
                return `
                  <div class="body-match-row${solved ? " is-solved" : ""}">
                    <button
                      class="body-match-drop${solved ? " is-solved" : ""}${selected ? " is-selected" : ""}"
                      type="button"
                      data-body-match-drop="${id}"
                    >
                      ${
                        solved
                          ? `
                            <span class="body-match-hanzi">${matchItem.hanzi}</span>
                            ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                          `
                          : `<span class="body-match-drop-label">Drop here</span>`
                      }
                    </button>
                    <button
                      class="body-match-card body-match-card-english${solved ? " is-solved" : ""}${selected ? " is-selected" : ""}"
                      type="button"
                      data-body-match-english="${id}"
                    >
                      <span class="body-match-english">${matchItem.english}</span>
                    </button>
                  </div>
                `;
              })
              .join("")}
          </div>
          ${
            roundComplete && !allDone
              ? '<button class="small-button body-next-round" type="button" data-body-next-round>Next set</button>'
              : ""
          }
          ${
            allDone
              ? '<button class="small-button body-next-round" type="button" data-body-play-again>Play again</button>'
              : ""
          }
        </div>
        <div class="body-more-practice-card">
          <p class="body-match-kicker">More Practice</p>
          <h4>Say it with 我的</h4>
          <p class="body-sentence-hanzi">${sentence.hanzi}</p>
          ${state.showPinyin ? `<p class="body-sentence-pinyin">${sentence.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="body-sentence-english">${sentence.english}</p>` : ""}
          <p class="body-sentence-note">Tap a body word, then say the whole phrase aloud.</p>
          <div class="body-sentence-examples">
            ${["eyes", "ears", "nose", "mouth", "head", "hair", "hand", "foot"]
              .map((id) => {
                const practiceItem = items[id];
                const practiceSentence = bodySentenceForItem(practiceItem);
                const isActivePractice = item.id === id;
                return `
                  <button
                    class="body-sentence-chip${isActivePractice ? " is-active" : ""}"
                    type="button"
                    data-body-sentence-item="${id}"
                  >
                    ${practiceSentence.hanzi}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-body-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.bodyItemId, { playAudio: true });
    });
  });

  focusExplorer.querySelectorAll("[data-body-sentence-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const sentenceItemId = button.dataset.bodySentenceItem;
      const sentenceItem = items[sentenceItemId];
      if (!sentenceItem) {
        return;
      }

      selectFocusItem(sentenceItemId, {
        playAudio: true,
        audioText: bodySentenceForItem(sentenceItem).hanzi,
        bodyFeedback: `Practice saying ${bodySentenceForItem(sentenceItem).hanzi}.`
      });
    });
  });

  focusExplorer.querySelector("[data-body-toggle-bonus]")?.addEventListener("click", () => {
    state.bodyMatchIncludeBonus = !state.bodyMatchIncludeBonus;
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-reset-match]")?.addEventListener("click", () => {
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-next-round]")?.addEventListener("click", () => {
    nextBodyRound();
    state.lastBodyFeedback = "Here is the next set.";
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelector("[data-body-play-again]")?.addEventListener("click", () => {
    resetBodyMatchGame();
    renderFocusExplorer();
    renderFocusStatus();
  });

  focusExplorer.querySelectorAll("[data-body-match-chinese]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBodyMatchChinese(button.dataset.bodyMatchChinese);
    });
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", button.dataset.bodyMatchChinese);
      event.dataTransfer.effectAllowed = "move";
      handleBodyMatchChinese(button.dataset.bodyMatchChinese);
    });
  });

  focusExplorer.querySelectorAll("[data-body-match-english]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBodyMatchAttempt(button.dataset.bodyMatchEnglish);
    });
  });

  focusExplorer.querySelectorAll("[data-body-match-drop]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBodyMatchAttempt(button.dataset.bodyMatchDrop);
    });
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggedId = event.dataTransfer?.getData("text/plain");
      if (draggedId) {
        handleBodyMatchAttempt(button.dataset.bodyMatchDrop, draggedId);
      }
    });
  });
}

function renderActivityPanel(topic) {
  topicColumns?.classList.remove("is-hidden");

  if (topic.id === "body") {
    topicColumns?.classList.add("is-hidden");
    activityPanelTitle.textContent = "";
    activityPanelSummary.textContent = "";
    activityList.innerHTML = "";
    return;
  }

  if (topic.id === "family") {
    ensureFamilyChallenge();
    ensureFamilyMatchGame();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Practice the three core family sentences, then sort sibling and parent words by who they name.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const solvedFamilyIds = state.familyPhraseOrder.filter((id) => state.familyMatchedIds.has(id));
    const remainingFamilyPhraseIds = state.familyPhraseOrder.filter((id) => !state.familyMatchedIds.has(id));
    const remainingFamilyMeaningIds = state.familyMeaningOrder.filter((id) => !state.familyMatchedIds.has(id));
    const gameCard = document.createElement("section");
    gameCard.className = "family-practice-shell";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which family line did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-family-game-play>Play audio</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching Chinese family line.</p>
          ${state.familyListenFeedback ? `<p class="greetings-game-feedback">${state.familyListenFeedback}</p>` : ""}
          <div class="numbers-game-options">
            ${state.familyChallengeOptionIds
              .map((id) => {
                const item = familyGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                const isCorrectPick =
                  state.familyChallengePickedId === item.id && state.familyChallengeResult === "correct";
                const isWrongPick = state.familyChallengeWrongIds.has(item.id);
                const resultClass = isCorrectPick ? " is-correct" : isWrongPick ? " is-wrong" : "";
                const resultMark =
                  isCorrectPick || isWrongPick
                    ? `<span class="answer-result-mark" aria-hidden="true">${isCorrectPick ? "✓" : "×"}</span>`
                    : "";
                return `
                  <button class="numbers-game-option greetings-game-option family-listen-option${resultClass}" type="button" data-family-game-guess="${item.id}">
                    ${resultMark}
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Matching game</p>
              <h4>Match the family member</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-family-match-new>New mix</button>
          </div>
          <p class="numbers-game-note">Tap a Chinese family line on the left, hear it, then tap the matching person on the right.</p>
          ${state.familyMatchFeedback ? `<div class="greetings-game-feedback">${state.familyMatchFeedback}</div>` : ""}
          <div class="family-match-board-headings">
            <p class="body-match-kicker">Chinese</p>
            <p class="body-match-kicker">Family member</p>
          </div>
          ${
            solvedFamilyIds.length
              ? `
                <div class="family-match-solved-pairs">
                  ${solvedFamilyIds
                    .map((id) => {
                      const item = familyGameItems().find((entry) => entry.id === id);
                      const person = familyPersonForItemId(id);
                      if (!item || !person) {
                        return "";
                      }
                      return `
                        <article class="family-match-solved-row">
                          <div class="polite-match-card polite-match-card-phrase family-match-pair-card is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="numbers-game-hanzi">${item.hanzi}</span>
                            ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                          </div>
                          <div class="polite-match-card family-match-card family-match-pair-card is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="family-match-avatar"><img class="family-match-avatar-image family-match-avatar-image-headshot" src="${familyHeadshotForItemId(id)}" alt="${person.label}" /></span>
                            <span class="family-match-copy">
                              <span class="numbers-game-english">${person.label}</span>
                            </span>
                          </div>
                        </article>
                      `;
                    })
                    .join("")}
                </div>
              `
              : ""
          }
          ${
            remainingFamilyPhraseIds.length
              ? `
                <div class="polite-match-board family-match-open-board">
                  <div class="polite-match-column">
                    ${remainingFamilyPhraseIds
                .map((id) => {
                  const item = familyGameItems().find((entry) => entry.id === id);
                  if (!item) {
                    return "";
                  }
                  const selected = state.familySelectedPhraseId === id;
                  return `
                    <button
                      class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}"
                      type="button"
                      data-family-match-phrase="${id}"
                    >
                      <span class="numbers-game-hanzi">${item.hanzi}</span>
                      ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    </button>
                  `;
                })
                .join("")}
                  </div>
                  <div class="polite-match-column">
                    ${remainingFamilyMeaningIds
                .map((id) => {
                  const person = familyPersonForItemId(id);
                  if (!person) {
                    return "";
                  }
                  return `
                    <button
                      class="polite-match-card family-match-card"
                      type="button"
                      data-family-match-meaning="${id}"
                    >
                      <span class="family-match-avatar"><img class="family-match-avatar-image family-match-avatar-image-headshot" src="${familyHeadshotForItemId(id)}" alt="${person.label}" /></span>
                      <span class="family-match-copy">
                        <span class="numbers-game-english">${person.label}</span>
                      </span>
                    </button>
                  `;
                })
                .join("")}
                  </div>
                </div>
              `
              : ""
          }
          ${
            state.familyMatchedIds.size === familyGameItems().length
              ? '<button class="small-button is-action-button" type="button" data-family-match-play-again>Play again</button>'
              : ""
          }
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-family-game-play]")?.addEventListener("click", () => {
      handleFamilyChallengePlay();
    });

    activityList.querySelectorAll("[data-family-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleFamilyChallengeGuess(button.dataset.familyGameGuess);
      });
    });

    activityList.querySelector("[data-family-match-new]")?.addEventListener("click", () => {
      resetFamilyMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-family-match-play-again]")?.addEventListener("click", () => {
      resetFamilyMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-family-match-phrase]").forEach((button) => {
      button.addEventListener("click", () => {
        handleFamilyMatchPhrase(button.dataset.familyMatchPhrase);
      });
    });

    activityList.querySelectorAll("[data-family-match-meaning]").forEach((button) => {
      button.addEventListener("click", () => {
        handleFamilyMatchAttempt(button.dataset.familyMatchMeaning);
      });
    });

    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    if (stage.telephoneMode) {
      topicColumns?.classList.add("is-hidden");
      activityPanelTitle.textContent = "";
      activityPanelSummary.textContent = "";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      return;
    }

    const challengeItem = buildNumberItem(state.numberChallengeTargetValue ?? stage.start);
    ensureMathChallenge();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Practice seeing quantities quickly, then solve one small number sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Quick Game</p>
          <h4>How many do you see?</h4>
        </div>
        <button class="small-button is-action-button" type="button" data-number-game-refresh>Try another</button>
      </div>
      <p class="numbers-game-note">The quantity changes each round, so kids do not always count in order from one.</p>
      <div class="numbers-game-visual">
        ${renderNumberVisual(challengeItem.value, stage)}
      </div>
      <div class="numbers-game-options">
        ${state.numberChallengeOptionValues
          .map((value) => {
            const option = buildNumberItem(value);
            return `
              <button class="numbers-game-option" type="button" data-number-game-guess="${value}">
                <span class="numbers-game-hanzi">${option.hanzi}</span>
                ${state.showArabic ? `<span class="numbers-game-arabic">${option.value}</span>` : ""}
                ${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}
                ${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
    activityList.appendChild(gameCard);

    const mathCard = document.createElement("section");
    mathCard.className = "numbers-game-card";
    const displayAnswer = state.mathChallengeSolved ? state.mathChallengeAnswer : state.mathChallengeInput;
    const operatorSymbol = state.mathChallengeOperator;
    const operatorChinese = state.mathChallengeOperator === "+" ? "加" : "减";
    mathCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Mini Math</p>
        </div>
      </div>
      <p class="numbers-game-note">Type the answer and press Enter. After a correct answer, listen first, then move to the next question.</p>
      <form class="math-game-form" data-math-game-form>
        <div class="math-game-equation-wrap">
          <div class="math-game-equation">
            <span>${state.mathChallengeLeft}</span>
            <span>${operatorSymbol}</span>
            <span>${state.mathChallengeRight}</span>
            <span>=</span>
            <input
              id="math-game-input"
              class="math-game-input"
              type="text"
              inputmode="numeric"
              maxlength="3"
              autocomplete="off"
              value="${displayAnswer ?? ""}"
              ${state.mathChallengeSolved ? "disabled" : ""}
            />
          </div>
          <div class="math-game-chinese">
            <span>${numberHanzi(state.mathChallengeLeft)}</span>
            <span>${operatorChinese}</span>
            <span>${numberHanzi(state.mathChallengeRight)}</span>
            <span>等于</span>
            <span>${state.mathChallengeSolved ? numberHanzi(state.mathChallengeAnswer) : "?"}</span>
          </div>
        </div>
      </form>
      <p class="numbers-game-note">This stage uses numbers up to ${stage.end}.</p>
      <p class="math-game-feedback">${state.lastMathFeedback}</p>
      ${
        state.mathChallengeSolved
          ? '<button class="small-button is-action-button math-game-next" type="button" data-math-game-next>Next question</button>'
          : ""
      }
    `;
    activityList.appendChild(mathCard);

    activityList.querySelector("[data-number-game-refresh]")?.addEventListener("click", () => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(topic);
      renderFocusStatus();
    });

    activityList.querySelectorAll("[data-number-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleNumberChallengeGuess(Number(button.dataset.numberGameGuess));
      });
    });

    activityList.querySelector("[data-math-game-next]")?.addEventListener("click", () => {
      resetMathChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-math-game-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = activityList.querySelector("#math-game-input");
      handleMathChallengeSubmit(input?.value ?? "");
    });
    return;
  }

  if (topic.id === "greetings") {
    ensureGreetingsChallenge();
    ensureGreetingsMatchGame();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Listen, choose the matching greeting, then match each line to its situation.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const challenge = greetingsGameItems().find((item) => item.id === state.greetingsChallengePromptId);
    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which greeting did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-greetings-game-new>Try another</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching Chinese line.</p>
          <div class="greetings-game-audio-row">
            <button class="small-button is-action-button greetings-game-play" type="button" data-greetings-game-play>
              Play audio
            </button>
            <p class="greetings-game-feedback">${state.lastGreetingsFeedback}</p>
          </div>
          <div class="numbers-game-options">
            ${state.greetingsChallengeOptionIds
              .map((id) => {
                const item = greetingsGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                return `
                  <button class="numbers-game-option greetings-game-option" type="button" data-greetings-game-guess="${item.id}">
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
          ${
            challenge
              ? `
                <div class="greetings-game-scene-note">
                  <p class="body-match-kicker">Tip</p>
                  <p>Think about the scene too: teacher greeting, morning greeting, or goodbye.</p>
                </div>
              `
              : ""
          }
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Matching game</p>
              <h4>Match the greeting</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-greetings-match-new>New mix</button>
          </div>
          <p class="numbers-game-note">Tap a Chinese greeting on the left, hear it, then tap the matching situation on the right.</p>
          <div class="greetings-game-feedback">${state.lastGreetingsFeedback}</div>
          <div class="polite-match-board">
            <div class="polite-match-column">
              <p class="body-match-kicker">Chinese</p>
              ${state.greetingsPhraseOrder
                .map((id) => {
                  const item = greetingsGameItems().find((entry) => entry.id === id);
                  if (!item) {
                    return "";
                  }
                  const selected = state.greetingsSelectedPhraseId === id;
                  const solved = state.greetingsMatchedIds.has(id);
                  return `
                    <button
                      class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}${solved ? " is-solved" : ""}"
                      type="button"
                      data-greetings-match-phrase="${id}"
                      ${solved ? "disabled" : ""}
                    >
                      <span class="numbers-game-hanzi">${item.hanzi}</span>
                      ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    </button>
                  `;
                })
                .join("")}
            </div>
            <div class="polite-match-column">
              <p class="body-match-kicker">Situation</p>
              ${state.greetingsMeaningOrder
                .map((id) => {
                  const solved = state.greetingsMatchedIds.has(id);
                  return `
                    <button
                      class="polite-match-card polite-match-card-meaning${solved ? " is-solved" : ""}"
                      type="button"
                      data-greetings-match-meaning="${id}"
                      ${solved ? "disabled" : ""}
                    >
                      <span class="numbers-game-english">${greetingsMeaningLabel(id)}</span>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
          ${
            state.greetingsMatchedIds.size === greetingsGameItems().length
              ? '<button class="small-button is-action-button" type="button" data-greetings-match-play-again>Play again</button>'
              : ""
          }
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-greetings-game-play]")?.addEventListener("click", () => {
      handleGreetingsChallengePlay();
    });

    activityList.querySelector("[data-greetings-game-new]")?.addEventListener("click", () => {
      resetGreetingsChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-greetings-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleGreetingsChallengeGuess(button.dataset.greetingsGameGuess);
      });
    });

    activityList.querySelector("[data-greetings-match-new]")?.addEventListener("click", () => {
      resetGreetingsMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-greetings-match-play-again]")?.addEventListener("click", () => {
      resetGreetingsMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-greetings-match-phrase]").forEach((button) => {
      button.addEventListener("click", () => {
        handleGreetingsMatchPhrase(button.dataset.greetingsMatchPhrase);
      });
    });

    activityList.querySelectorAll("[data-greetings-match-meaning]").forEach((button) => {
      button.addEventListener("click", () => {
        handleGreetingsMatchAttempt(button.dataset.greetingsMatchMeaning);
      });
    });

    return;
  }

  if (topic.id === "introductions") {
    ensureIntroductionsChallenge();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Listen for a child's self-introduction, then choose the matching friend from the lesson cast.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const challenge = introductionsPromptById(state.introductionsChallengePromptId);
    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Simple game</p>
            <h4>Who said their name?</h4>
          </div>
          <button class="small-button is-action-button" type="button" data-intro-game-new>Try another</button>
        </div>
        <p class="numbers-game-note">Play the audio, then tap the child who introduced themself.</p>
        <div class="greetings-game-audio-row">
          <button class="small-button is-action-button greetings-game-play" type="button" data-intro-game-play>
            Play audio
          </button>
          <p class="greetings-game-feedback">${state.lastIntroductionsFeedback}</p>
        </div>
        <div class="intro-character-grid">
          ${state.introductionsChallengeOptionIds
            .map((id) => {
              const kid = illustratedKids[id];
              if (!kid) {
                return "";
              }
              return `
                <button class="intro-character-card" type="button" data-intro-game-guess="${kid.id}">
                  <div class="intro-character-portrait">
                    <img class="intro-character-image" src="${kid.path}" alt="${kid.label}" />
                  </div>
                  <span class="intro-character-hanzi">${kid.hanziName}</span>
                  <span class="intro-character-label">${kid.label}</span>
                </button>
              `;
            })
            .join("")}
        </div>
        ${
          challenge
            ? `
              <div class="greetings-game-scene-note">
                <p class="body-match-kicker">Tip</p>
                <p>All four choices say 我叫 plus their own name. Listen for the last two characters.</p>
              </div>
            `
            : ""
        }
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-intro-game-play]")?.addEventListener("click", () => {
      handleIntroductionsChallengePlay();
    });

    activityList.querySelector("[data-intro-game-new]")?.addEventListener("click", () => {
      resetIntroductionsChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-intro-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleIntroductionsChallengeGuess(button.dataset.introGameGuess);
      });
    });

    return;
  }

  if (topic.id === "age") {
    ensureAgeChallenge();
    ensureAgeBuilder();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Practice age first, then add the grade-level question from the same Book 1A identity lesson.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const challenge = ageGameItems().find((item) => item.id === state.ageChallengePromptId);
    const buildTarget = ageBuildTarget();
    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which line did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-game-new>Try another</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching age or grade question or answer.</p>
          <div class="greetings-game-audio-row">
            <button class="small-button is-action-button greetings-game-play" type="button" data-age-game-play>
              Play audio
            </button>
            <p class="greetings-game-feedback">${state.lastAgeFeedback}</p>
          </div>
          <div class="numbers-game-options">
            ${state.ageChallengeOptionIds
              .map((id) => {
                const item = ageGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                return `
                  <button class="numbers-game-option greetings-game-option" type="button" data-age-game-guess="${item.id}">
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
          ${
            challenge
              ? `
                <div class="greetings-game-scene-note">
                  <p class="body-match-kicker">Tip</p>
                  <p>Listen for the question word <strong>几</strong>, the age word <strong>岁</strong>, or the school word <strong>年级</strong>.</p>
                </div>
              `
              : ""
          }
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Build the phrase</p>
              <h4>${buildTarget.prompt}</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-build-new>New phrase</button>
          </div>
          <p class="numbers-game-note">Tap the word pieces in order to build the sentence.</p>
          <div class="intro-build-target">
            <p class="body-match-kicker">Sentence</p>
            <div class="intro-build-selected">
              ${
                state.ageBuildSelectedTokens.length
                  ? state.ageBuildSelectedTokens
                      .map((token) => `<span class="intro-build-chip is-selected">${token}</span>`)
                      .join("")
                  : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'
              }
            </div>
            <p class="numbers-game-english">${buildTarget.english}</p>
          </div>
          <div class="intro-build-choices">
            ${state.ageBuildAvailableTokens
              .map(
                (token, index) => `
                  <button class="intro-build-chip" type="button" data-age-build-token="${index}">
                    ${token}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="intro-build-actions">
            <button class="small-button" type="button" data-age-build-clear>Clear</button>
          </div>
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-age-game-play]")?.addEventListener("click", () => {
      handleAgeChallengePlay();
    });

    activityList.querySelector("[data-age-game-new]")?.addEventListener("click", () => {
      resetAgeChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-age-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeChallengeGuess(button.dataset.ageGameGuess);
      });
    });

    activityList.querySelector("[data-age-build-new]")?.addEventListener("click", () => {
      resetAgeBuilder();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-age-build-clear]")?.addEventListener("click", () => {
      handleAgeBuildClear();
    });

    activityList.querySelectorAll("[data-age-build-token]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeBuildToken(Number(button.dataset.ageBuildToken));
      });
    });

    return;
  }

  if (topic.id === "polite-words") {
    ensurePoliteChallenge();
    ensurePoliteMatchGame();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Listen, choose the matching polite phrase, then match each phrase to its meaning.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const challenge = politeGameItems().find((item) => item.id === state.politeChallengePromptId);
    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which polite phrase did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-polite-quiz-new>Try another</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching polite phrase.</p>
          <div class="greetings-game-audio-row">
            <button class="small-button is-action-button greetings-game-play" type="button" data-polite-game-play>
              Play audio
            </button>
            <p class="greetings-game-feedback">${state.lastPoliteFeedback}</p>
          </div>
          <div class="numbers-game-options">
            ${state.politeChallengeOptionIds
              .map((id) => {
                const item = politeGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                return `
                  <button class="numbers-game-option greetings-game-option" type="button" data-polite-game-guess="${item.id}">
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
          ${
            challenge
              ? `
                <div class="greetings-game-scene-note">
                  <p class="body-match-kicker">Tip</p>
                  <p>Think about the situation too: thanking, apologizing, or replying kindly.</p>
                </div>
              `
              : ""
          }
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Matching game</p>
              <h4>Match the polite phrase</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-polite-game-new>New mix</button>
          </div>
          <p class="numbers-game-note">Tap a Chinese phrase on the left, hear it, then tap the matching meaning on the right.</p>
          <div class="greetings-game-feedback">${state.lastPoliteFeedback}</div>
          <div class="polite-match-board">
            <div class="polite-match-column">
              <p class="body-match-kicker">Chinese</p>
              ${state.politePhraseOrder
                .map((id) => {
                  const item = politeGameItems().find((entry) => entry.id === id);
                  if (!item) {
                    return "";
                  }
                  const selected = state.politeSelectedPhraseId === id;
                  const solved = state.politeMatchedIds.has(id);
                  return `
                    <button
                      class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}${solved ? " is-solved" : ""}"
                      type="button"
                      data-polite-match-phrase="${id}"
                      ${solved ? "disabled" : ""}
                    >
                      <span class="numbers-game-hanzi">${item.hanzi}</span>
                      ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    </button>
                  `;
                })
                .join("")}
            </div>
            <div class="polite-match-column">
              <p class="body-match-kicker">Meaning</p>
              ${state.politeMeaningOrder
                .map((id) => {
                  const solved = state.politeMatchedIds.has(id);
                  return `
                    <button
                      class="polite-match-card polite-match-card-meaning${solved ? " is-solved" : ""}"
                      type="button"
                      data-polite-match-meaning="${id}"
                      ${solved ? "disabled" : ""}
                    >
                      <span class="numbers-game-english">${politeMeaningLabel(id)}</span>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
          ${
            state.politeMatchedIds.size === politeGameItems().length
              ? '<button class="small-button is-action-button" type="button" data-polite-game-play-again>Play again</button>'
              : ""
          }
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-polite-game-play]")?.addEventListener("click", () => {
      handlePoliteChallengePlay();
    });

    activityList.querySelector("[data-polite-quiz-new]")?.addEventListener("click", () => {
      resetPoliteChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-polite-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handlePoliteChallengeGuess(button.dataset.politeGameGuess);
      });
    });

    activityList.querySelector("[data-polite-game-new]")?.addEventListener("click", () => {
      resetPoliteMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-polite-game-play-again]")?.addEventListener("click", () => {
      resetPoliteMatchGame();
      renderActivityPanel(topic);
    });

    activityList.querySelectorAll("[data-polite-match-phrase]").forEach((button) => {
      button.addEventListener("click", () => {
        handlePoliteMatchPhrase(button.dataset.politeMatchPhrase);
      });
    });

    activityList.querySelectorAll("[data-polite-match-meaning]").forEach((button) => {
      button.addEventListener("click", () => {
        handlePoliteMatchAttempt(button.dataset.politeMatchMeaning);
      });
    });

    return;
  }

  topicColumns?.classList.add("is-hidden");
  activityPanelTitle.textContent = "";
  activityPanelSummary.textContent = "";
  activityList.innerHTML = "";
}

function renderDefaultExplorer() {
  focusExplorer.innerHTML = `
    <p class="focus-helper">Tap a word card below to hear it and see it more clearly.</p>
  `;
}

function renderMultiplicationExplorer() {
  const items = focusItemsForTopic();
  const activeItem = currentFocusItem();
  const itemByPair = new Map(items.map((item) => [`${item.first}-${item.second}`, item]));

  focusExplorer.innerHTML = `
    <div class="multiplication-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">Chinese math rhythm</p>
        <h4>九九乘法口诀</h4>
        <p>Tap a cell in the matrix. First see the multiplication fact, then hear and read the Chinese rhyme line.</p>
      </div>
      <div class="multiplication-matrix-card">
        <div class="multiplication-matrix">
          <div class="multiplication-corner"></div>
          ${Array.from({ length: 9 }, (_, index) => index + 1)
            .map((value) => `<div class="multiplication-header">${value}</div>`)
            .join("")}
          ${Array.from({ length: 9 }, (_, rowIndex) => rowIndex + 1)
            .map((rowValue) => {
              const rowHeader = `<div class="multiplication-header">${rowValue}</div>`;
              const cells = Array.from({ length: 9 }, (_, colIndex) => colIndex + 1)
                .map((colValue) => {
                  if (colValue < rowValue) {
                    return '<div class="multiplication-cell multiplication-cell-empty"></div>';
                  }
                  const item = itemByPair.get(`${rowValue}-${colValue}`);
                  const isActive = item?.id === activeItem.id;
                  return `
                    <button
                      class="multiplication-cell${isActive ? " is-active" : ""}"
                      type="button"
                      data-multiplication-item="${item?.id ?? ""}"
                    >
                      <span class="multiplication-cell-fact">${rowValue}×${colValue}</span>
                      <span class="multiplication-cell-product">=${item?.product ?? ""}</span>
                    </button>
                  `;
                })
                .join("");
              return rowHeader + cells;
            })
            .join("")}
        </div>
      </div>
      <div class="multiplication-detail-card">
        <p class="body-match-kicker">Selected line</p>
        <p class="multiplication-line-hanzi">${activeItem.hanzi}</p>
        ${state.showPinyin ? `<p class="multiplication-line-pinyin">${activeItem.pinyin}</p>` : ""}
        ${state.showEnglish ? `<p class="multiplication-line-english">${activeItem.english}</p>` : ""}
        <button class="small-button is-action-button" type="button" data-multiplication-item="${activeItem.id}">Play audio</button>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-multiplication-item]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.multiplicationItem, { playAudio: true });
    });
  });
}

function renderNumberVisual(value, stage) {
  if (value === 0) {
    return '<p class="numbers-visual-note">Start with zero for phone-number reading.</p>';
  }

  const emojis = stage.visualEmojis?.length ? stage.visualEmojis : ["⭐"];
  const chosenEmoji = emojis[(Math.max(value, 1) - 1) % emojis.length];
  const objectMarkup = (count) =>
    Array.from(
      { length: count },
      () => `<span class="numbers-object">${chosenEmoji}</span>`
    ).join("");

  if (value <= 20) {
    const groups = [];
    let remaining = value;
    while (remaining > 0) {
      groups.push(Math.min(5, remaining));
      remaining -= 5;
    }

    return groups
      .map(
        (count) => `
          <div class="numbers-object-group">
            ${objectMarkup(count)}
          </div>
        `
      )
      .join("");
  }

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return `
    <div class="numbers-bundle-row">
      ${Array.from(
        { length: tens },
        () => `
          <div class="numbers-bundle-card">
            <span class="numbers-bundle-emoji">${chosenEmoji}</span>
            <span class="numbers-bundle-count">× 10</span>
          </div>
        `
      ).join("")}
    </div>
    ${
      ones
        ? `
          <div class="numbers-object-group">
            ${objectMarkup(ones)}
          </div>
        `
        : ""
    }
  `;
}

function renderNumbersExplorer() {
  ensureNumberChallenge();
  const stage = currentNumberStage();
  if (stage.telephoneMode) {
    renderTelephoneExplorer(stage);
    return;
  }
  const item = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="numbers-showcase-card">
        <div class="numbers-showcase-copy">
          <p class="body-match-kicker">Current number</p>
          <div class="numbers-current-line">
            <p class="numbers-hanzi">${item.hanzi}</p>
            <p class="numbers-arabic${state.showArabic ? "" : " is-hidden"}">${item.value}</p>
          </div>
        </div>
        <div class="numbers-count-board">
          ${renderNumberVisual(item.value, stage)}
        </div>
      </div>
    </div>
  `;
}

function renderTelephoneExplorer(stage) {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="telephone-scene-card">
        <div class="telephone-scene-people">
          <article class="telephone-bubble telephone-bubble-question">
            <div class="telephone-figure-card telephone-figure-card-left" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.anan.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Ask</p>
              <p class="telephone-line-hanzi">${telephonePractice.question.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.question.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.question.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="question">Play audio</button>
            </div>
          </article>
          <article class="telephone-bubble telephone-bubble-answer">
            <div class="telephone-figure-card telephone-figure-card-right" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.tiantian.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Answer</p>
              <p class="telephone-line-hanzi">${telephonePractice.answer.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.answer.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.answer.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="answer">Play audio</button>
            </div>
          </article>
        </div>
        <div class="telephone-number-strip">
          <p class="body-match-kicker">Listen to the digits</p>
          <div class="telephone-digit-row">
            ${telephonePractice.digits
              .map(
                (digit) => `
                  <button class="telephone-digit-chip" type="button" data-telephone-digit="${digit}">
                    ${digit}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-telephone-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const line = button.dataset.telephonePlay === "question" ? telephonePractice.question : telephonePractice.answer;
      if (state.tapAudioEnabled) {
        speak(line.audio, 0.78);
      }
      focusStatus.textContent = button.dataset.telephonePlay === "question"
        ? "Listen to the question first, then listen for the answer."
        : "Listen to the answer and notice how each digit is said one by one.";
    });
  });

  focusExplorer.querySelectorAll("[data-telephone-digit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) {
        speak(button.dataset.telephoneDigit, 0.78);
      }
      focusStatus.textContent = `Practice the digit ${button.dataset.telephoneDigit} by itself.`;
    });
  });
}

function renderGreetingsExplorer() {
  const activeItem = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: school greetings</h4>
        <p>This lesson follows the book page: greet a teacher politely, greet a friend in the morning, and say goodbye.</p>
      </div>
      <div class="greetings-scene-card">
        <div class="greetings-practice-grid">
          ${greetingsPractice
            .map(
              (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                    <div>
                      <p class="body-match-kicker">Scene ${exchange.number}</p>
                      <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                    </div>
                    <button class="small-button is-action-button" type="button" data-greeting-play-all="${exchange.id}">Play scene</button>
                  </div>
                  <div class="greetings-scene-layout">
                    <div class="greetings-scene-visual">
                      <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                    </div>
                    <div class="greetings-line-stack">
                      ${exchange.lines
                        .map(
                          (line, index) => `
                            <article class="greetings-line-card">
                              <div class="telephone-bubble-copy">
                                <p class="telephone-line-hanzi">${line.hanzi}</p>
                                ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                                ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                              </div>
                            </article>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
        <div class="greetings-word-strip">
          <p class="body-match-kicker">Book words</p>
          <div class="greetings-word-row">
            ${focusItemsForTopic()
              .map(
                (item) => `
                  <button
                    class="telephone-digit-chip${activeItem.id === item.id ? " is-selected" : ""}"
                    type="button"
                    data-greeting-word="${item.id}"
                  >
                    ${item.hanzi}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="greetings-note-card">
            <p class="body-match-kicker">Useful note</p>
            <p class="greetings-note-hanzi">你 and 您</p>
            <p class="greetings-note-copy">
              <strong>你</strong> is the everyday word for “you.” <strong>您</strong> is the polite form, often used for teachers and other adults to show respect.
            </p>
            <p class="greetings-note-copy">
              <strong>老师</strong> means “teacher,” so <strong>李老师，您好！</strong> sounds warm and respectful.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-greeting-play-all]").forEach((button) => {
    button.addEventListener("click", async () => {
      const exchange = greetingsPractice.find((entry) => entry.id === button.dataset.greetingPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-greeting-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.greetingWord, { playAudio: true });
    });
  });
}

function renderTimeDateExplorer() {
  const item = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Hour of day</h4>
        <p>Start with 7:00 AM and connect each clock to a real daily routine children already know.</p>
      </div>
      <div class="greetings-scene-card time-routine-card">
        <div class="time-routine-layout">
          ${timeDateRoutineVisual(item)}
          <div class="time-routine-copy">
            <p class="body-match-kicker">${item.routineAction ?? "Daily routine"}</p>
            <p class="time-routine-hanzi">${item.routineHanzi ?? item.hanzi}</p>
            ${state.showPinyin ? `<p class="time-routine-pinyin">${item.routinePinyin ?? item.pinyin}</p>` : ""}
            ${state.showEnglish ? `<p class="time-routine-english">${item.routineEnglish ?? item.english}</p>` : ""}
            <button class="small-button is-action-button" type="button" data-time-routine-play="${item.id}">Play audio</button>
          </div>
        </div>
        <div class="time-routine-chip-row">
          ${focusItemsForTopic()
            .map(
              (entry) => `
                <button
                  class="time-routine-chip${entry.id === item.id ? " is-active" : ""}"
                  type="button"
                  data-time-routine-item="${entry.id}"
                >
                  <span class="time-routine-chip-hanzi">${entry.hanzi}</span>
                  <span class="time-routine-chip-label">${entry.routineAction ?? entry.english}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-time-routine-item]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.timeRoutineItem, { playAudio: true });
    });
  });

  focusExplorer.querySelector("[data-time-routine-play]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speak(item.routineHanzi ?? item.hanzi, 0.78);
    }
    focusStatus.textContent = `Practice saying ${item.routineHanzi ?? item.hanzi}`;
  });
}

function renderPoliteWordsExplorer() {
  const activeItem = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: kind classroom language</h4>
        <p>This topic starts with thank you and sorry, then grows into kind replies and polite requests.</p>
      </div>
      <div class="greetings-scene-card">
        <div class="greetings-practice-grid">
          ${politePractice
            .map(
              (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                    <div>
                      <p class="body-match-kicker">Scene ${exchange.number}</p>
                      <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                    </div>
                    <button class="small-button is-action-button" type="button" data-polite-play-all="${exchange.id}">Play scene</button>
                  </div>
                  <div class="greetings-scene-layout">
                    <div class="greetings-scene-visual">
                      <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                    </div>
                    <div class="greetings-line-stack">
                      ${exchange.lines
                        .map(
                          (line, index) => `
                            <article class="greetings-line-card">
                              <div class="telephone-bubble-copy">
                                <p class="telephone-line-hanzi">${line.hanzi}</p>
                                ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                                ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                              </div>
                            </article>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
        <div class="greetings-word-strip">
          <p class="body-match-kicker">Book words</p>
          <div class="greetings-word-row">
            ${focusItemsForTopic()
              .map(
                (item) => `
                  <button
                    class="telephone-digit-chip${activeItem.id === item.id ? " is-selected" : ""}"
                    type="button"
                    data-polite-word="${item.id}"
                  >
                    ${item.hanzi}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="greetings-note-card">
            <p class="body-match-kicker">Useful note</p>
            <p class="greetings-note-hanzi">谢谢 / 不客气 / 对不起 / 没关系</p>
            <p class="greetings-note-copy">
              <strong>谢谢你</strong> means “thank you,” and <strong>不客气</strong> is the kind reply: “you’re welcome.”
            </p>
            <p class="greetings-note-copy">
              <strong>对不起</strong> means “I’m sorry,” and <strong>没关系</strong> is the calm reply: “never mind” or “that’s okay.”
            </p>
            <p class="greetings-note-copy">
              <strong>请</strong> helps children sound polite in requests and classroom directions, for example:
              <strong>请安静。</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-polite-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = politePractice.find((entry) => entry.id === button.dataset.politePlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-polite-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.politeWord, { playAudio: true });
    });
  });
}

function renderIntroductionsExplorer() {
  const activeItem = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: asking and saying names</h4>
        <p>This lesson mirrors Book 1A Lesson 6: say hello, ask a name, answer with 我叫..., and repeat the new friend's name.</p>
      </div>
      <div class="greetings-scene-card">
        <div class="greetings-practice-grid">
          ${introductionsPractice
            .map(
              (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                    <div>
                      <p class="body-match-kicker">Scene ${exchange.number}</p>
                      <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                    </div>
                    <button class="small-button is-action-button" type="button" data-intro-play-all="${exchange.id}">Play scene</button>
                  </div>
                  <div class="greetings-scene-layout introductions-scene-layout">
                    <div class="intro-scene-cast">
                      ${exchange.cast
                        .map((kidId) => {
                          const kid = illustratedKids[kidId];
                          if (!kid) {
                            return "";
                          }
                          return `
                            <button class="intro-cast-card" type="button" data-intro-cast="${kid.id}">
                              <div class="intro-cast-portrait">
                                <img class="intro-cast-image" src="${kid.path}" alt="${kid.label}" />
                              </div>
                              <span class="intro-cast-hanzi">${kid.hanziName}</span>
                              <span class="intro-cast-label">${kid.label}</span>
                            </button>
                          `;
                        })
                        .join("")}
                    </div>
                    <div class="greetings-line-stack">
                      ${exchange.lines
                        .map(
                          (line, index) => `
                            <article class="greetings-line-card intro-line-card">
                              <div class="intro-line-copy">
                                <div class="intro-line-speaker">
                                  <div class="intro-line-portrait" aria-hidden="true">
                                    <img class="intro-line-image" src="${illustratedKids[line.speakerId].path}" alt="" />
                                  </div>
                                  <p class="body-match-kicker">${illustratedKids[line.speakerId].hanziName}</p>
                                </div>
                                <p class="telephone-line-hanzi">${line.hanzi}</p>
                                ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                                ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                              </div>
                            </article>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
        <div class="greetings-word-strip">
          <p class="body-match-kicker">Book words</p>
          <div class="greetings-word-row">
            ${focusItemsForTopic()
              .map(
                (item) => `
                  <button
                    class="telephone-digit-chip${activeItem.id === item.id ? " is-selected" : ""}"
                    type="button"
                    data-intro-word="${item.id}"
                  >
                    ${item.hanzi}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="greetings-note-card">
            <p class="body-match-kicker">Useful note</p>
            <p class="greetings-note-hanzi">我 / 叫 / 什么 / 名字</p>
            <p class="greetings-note-copy">
              <strong>我</strong> means “I” or “me,” and <strong>叫</strong> is used in beginner Chinese to say what someone is called.
            </p>
            <p class="greetings-note-copy">
              <strong>你叫什么名字？</strong> means “What is your name?” and <strong>我叫安安。</strong> means “My name is Anan.”
            </p>
            <p class="greetings-note-copy">
              Let children pause after <strong>我叫</strong> and say their own name out loud.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-intro-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = introductionsPractice.find((entry) => entry.id === button.dataset.introPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-intro-cast]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = introductionsSelfIntroItemForKid(button.dataset.introCast);
      if (!item) {
        return;
      }
      selectFocusItem(item.id, { playAudio: true });
      focusStatus.textContent = `Practice saying ${item.hanzi}`;
    });
  });

  focusExplorer.querySelectorAll("[data-intro-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.introWord, { playAudio: true });
    });
  });
}

function renderAgeExplorer() {
  const activeItem = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: age and school year</h4>
        <p>This lesson starts with <strong>你几岁？</strong> / <strong>我...岁。</strong> and then adds <strong>你上几年级？</strong> / <strong>我上一年级。</strong></p>
      </div>
      <div class="greetings-scene-card">
        <div class="greetings-practice-grid">
          ${agePractice
            .map(
              (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                    <div>
                      <p class="body-match-kicker">Scene ${exchange.number}</p>
                      <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                    </div>
                    <button class="small-button is-action-button" type="button" data-age-play-all="${exchange.id}">Play scene</button>
                  </div>
                  <div class="greetings-scene-layout">
                    <div class="greetings-scene-visual">
                      <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                    </div>
                    <div class="greetings-line-stack">
                      ${exchange.lines
                        .map(
                          (line, index) => `
                            <article class="greetings-line-card">
                              <div class="telephone-bubble-copy">
                                <p class="telephone-line-hanzi">${line.hanzi}</p>
                                ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                                ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                              </div>
                            </article>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
        <div class="greetings-word-strip">
          <p class="body-match-kicker">Book words</p>
          <div class="greetings-word-row">
            ${focusItemsForTopic()
              .map(
                (item) => `
                  <button
                    class="telephone-digit-chip${activeItem.id === item.id ? " is-selected" : ""}"
                    type="button"
                    data-age-word="${item.id}"
                  >
                    ${item.hanzi}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="greetings-note-card">
            <p class="body-match-kicker">Useful note</p>
            <p class="greetings-note-hanzi">你几岁？ / 我...岁。 / 你上几年级？ / 我上一年级。</p>
            <p class="greetings-note-copy">
              <strong>你几岁？</strong> literally means “you how-many years old?” Here, <strong>几</strong> asks for a small number, and <strong>岁</strong> is the common word for a child's age.
            </p>
            <p class="greetings-note-copy">
              The answer pattern stays simple: <strong>我 + number + 岁</strong>. So <strong>我五岁</strong> is “I am five years old,” <strong>我六岁</strong> is “I am six years old,” and <strong>我七岁</strong> is “I am seven years old.”
            </p>
            <p class="greetings-note-copy">
              <strong>你上几年级？</strong> asks what school year someone is in, and <strong>我上一年级。</strong> means “I am in first grade.” This topic links naturally with earlier self-introduction language: <strong>你好！你叫什么名字？我叫安安。你几岁？我五岁。你上几年级？我上一年级。</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-age-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = agePractice.find((entry) => entry.id === button.dataset.agePlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-age-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.ageWord, { playAudio: true });
    });
  });
}

function renderFamilyHomeVisual(exchange) {
  if (exchange.visual === "parents-love") {
    return `
      <div class="family-lesson-visual family-lesson-visual-love">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  if (exchange.visual === "siblings-compare") {
    return `
      <div class="family-lesson-visual family-lesson-visual-siblings">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  const roomClass = {
    "living-room": "family-room-living",
    playroom: "family-room-playroom",
    "family-visit": "family-room-visit"
  }[exchange.roomLabel] ?? "family-room-living";

  return `
    <div class="family-room ${roomClass}">
      <div class="family-room-scene-bar">
        <div class="family-room-scene-copy">
          <p class="family-room-scene-label">${exchange.sceneLabel}</p>
          <p class="family-room-scene-mood">${exchange.sceneMood}</p>
        </div>
        <div class="family-room-scene-sun" aria-hidden="true"></div>
      </div>
      <div class="family-room-backdrop">
        <div class="family-room-window">
          <div class="family-room-window-sky"></div>
          <div class="family-room-window-hill family-room-window-hill-back"></div>
          <div class="family-room-window-hill family-room-window-hill-front"></div>
        </div>
        <div class="family-room-curtain family-room-curtain-left"></div>
        <div class="family-room-curtain family-room-curtain-right"></div>
        <div class="family-room-rug"></div>
        <div class="family-room-floor-line"></div>
        <div class="family-room-furniture family-room-furniture-left"></div>
        <div class="family-room-furniture family-room-furniture-right"></div>
        <div class="family-room-decor family-room-decor-left"></div>
        <div class="family-room-decor family-room-decor-right"></div>
      </div>
      <div class="family-room-cast">
        ${exchange.cast
          .map((personId, index) => {
            const person = illustratedFamily[personId];
            if (!person) {
              return "";
            }
            return `
              <article class="family-room-person family-room-person-${person.id} family-room-person-${index === 0 ? "left" : "right"}">
                <div class="family-room-callout">${familyWordForPersonId(person.id)}</div>
                <div class="family-room-portrait">
                  <img class="family-room-image" src="${person.path}" alt="${person.label}" />
                </div>
                <div class="family-room-name">
                  <span class="family-room-name-hanzi">${familyWordForPersonId(person.id)}</span>
                  <span class="family-room-name-english">${person.label}</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderFamilyExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: family at home</h4>
        <p>Start with 爸爸妈妈爱我, then reuse the same small word set as the child moves to 我爱爸爸, 我爱妈妈, and sibling words.</p>
      </div>
      <div class="greetings-practice-grid family-scenes-grid">
        ${familyPractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-family-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout family-scene-layout">
                  <div class="family-scene-visual">
                    ${renderFamilyHomeVisual(exchange)}
                  </div>
                  <div class="greetings-line-stack">
                    ${exchange.lines
                      .map(
                        (line, index) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-family-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = familyPractice.find((entry) => entry.id === button.dataset.familyPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-family-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.familyWord, { playAudio: true });
    });
  });
}

function renderFocusExplorer() {
  const topic = currentTopic();
  if (topic.interactiveScene === "body-face") {
    renderBodyExplorer();
    return;
  }

  if (topic.id === "numbers") {
    renderNumbersExplorer();
    return;
  }

  if (topic.interactiveScene === "polite-phrases") {
    renderPoliteWordsExplorer();
    return;
  }

  if (topic.interactiveScene === "introductions-conversation") {
    renderIntroductionsExplorer();
    return;
  }

  if (topic.interactiveScene === "age-conversation") {
    renderAgeExplorer();
    return;
  }

  if (topic.interactiveScene === "family-home") {
    renderFamilyExplorer();
    return;
  }

  if (topic.interactiveScene === "greetings-conversation") {
    renderGreetingsExplorer();
    return;
  }

  if (topic.interactiveScene === "time-date-routine") {
    renderTimeDateExplorer();
    return;
  }

  if (topic.interactiveScene === "multiplication-rhyme") {
    renderMultiplicationExplorer();
    return;
  }

  renderDefaultExplorer();
}

function selectBookLesson(bookId, lessonNumber) {
  const book = books.find((entry) => entry.id === bookId) ?? books[0];
  const lesson = book.lessons.find((entry) => entry.lesson === lessonNumber) ?? book.lessons[0];

  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  state.selectedBookId = book.id;
  state.selectedLessonNumber = lesson.lesson;
  state.selectedTopicId = lesson.topicId;
  state.expandedCategoryId = categoryIdForTopic(lesson.topicId);
  state.topicPageOpen = true;
  narrowTopicBrowserTo(selectedTopicGroupId());
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
  window.history.pushState(null, "", topicPageUrl(lesson.topicId));
  focusLearningPanel();
}

function topicLessonTitle(topic, step) {
  if (topic.id !== "numbers") {
    return step.title;
  }

  const stage = numberStages.find(
    (entry) => entry.bookId === step.book.toLowerCase() && entry.lesson === step.lesson
  );
  return stage?.title ?? step.title;
}

function renderTopicLessonStrip(topic) {
  if (!topicLessonStrip) {
    return;
  }

  const steps = topic.steps ?? [];
  if (!steps.length) {
    topicLessonStrip.innerHTML = "";
    topicLessonStrip.classList.add("is-hidden");
    return;
  }

  const current = currentLesson();
  topicLessonStrip.classList.remove("is-hidden");
  topicLessonStrip.innerHTML = steps
    .map((step) => {
      const bookId = step.book.toLowerCase();
      const isActive = currentBook().id === bookId && current.lesson === step.lesson;
      return `
        <button class="topic-lesson-card${isActive ? " is-active" : ""}" type="button" data-topic-lesson="${bookId}:${step.lesson}">
          <span class="topic-lesson-meta">Book ${step.book} Lesson ${step.lesson}</span>
          <strong>${topicLessonTitle(topic, step)}</strong>
        </button>
      `;
    })
    .join("");

  topicLessonStrip.querySelectorAll("[data-topic-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonText] = button.dataset.topicLesson.split(":");
      selectBookLesson(bookId, Number(lessonText));
    });
  });
}

function renderSubtopicShelf() {
  if (!subtopicShelf) {
    return;
  }

  subtopicShelf.innerHTML = "";
  subtopicShelf.classList.add("is-hidden");
}

function renderTopicDetail() {
  const topic = currentTopic();
  const items = focusItemsForTopic(topic);

  if (topic.id !== "body") {
    state.lastBodyFeedback = "";
    if (topic.id !== "numbers") {
      state.lastNumberFeedback = "";
    }
  } else if (!state.selectedFocusItemId) {
    state.selectedFocusItemId = items[0].id;
    ensureBodyMatchGame();
  }

  if (topic.id !== "numbers" && state.numberChallengeAdvanceTimer) {
    window.clearTimeout(state.numberChallengeAdvanceTimer);
    state.numberChallengeAdvanceTimer = null;
  }

  const selectedItem = items.find((item) => item.id === state.selectedFocusItemId);
  if (topic.id === "family" && (!selectedItem || isFamilySentenceItemId(selectedItem.id))) {
    state.selectedFocusItemId = familyBookWordItems()[0]?.id ?? items[0].id;
  } else {
    state.selectedFocusItemId = selectedItem?.id ?? items[0].id;
  }

  topicTitle.textContent = topic.title;
  if (topicSummary) {
    topicSummary.textContent = topic.summary;
  }
  if (topicProgress) {
    topicProgress.textContent = topic.progressLabel;
  }
  renderTopicLessonStrip(topic);
  renderSubtopicShelf(topic);
  focusDisplay.classList.toggle(
    "is-hidden",
    topic.id === "body" ||
      topic.id === "family" ||
      topic.id === "numbers" ||
      topic.id === "multiplication-rhyme" ||
      (topic.id === "numbers" && currentNumberStage().telephoneMode)
  );
  renderFocusControls();
  renderFocusDisplay(currentFocusItem());
  renderFocusExplorer();
  renderFocusWordList();
  renderFocusStatus();

  renderActivityPanel(topic);
}

bookSelect.addEventListener("change", () => {
  const book = books.find((entry) => entry.id === bookSelect.value) ?? currentBook();
  selectBookLesson(book.id, book.lessons[0].lesson);
});

lessonSelect.addEventListener("change", () => {
  const book = currentBook();
  const lesson = book.lessons.find((entry) => String(entry.lesson) === lessonSelect.value) ?? book.lessons[0];
  selectBookLesson(book.id, lesson.lesson);
});

function chineseUtterance(text, rate) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = rate;
  utterance.pitch = 1;
  return utterance;
}

function speak(text, rate = 0.8) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(chineseUtterance(text, rate));
}

function speakSceneLines(lines) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const audioLines = lines.map((line) => line.audio).filter(Boolean);
  let index = 0;

  window.speechSynthesis.cancel();

  const playNextLine = () => {
    if (index >= audioLines.length) {
      return;
    }

    const utterance = chineseUtterance(audioLines[index], sceneSpeechRate);
    index += 1;
    utterance.onend = () => {
      window.setTimeout(playNextLine, sceneLinePauseMs);
    };
    window.speechSynthesis.speak(utterance);
  };

  playNextLine();
}

function viewFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const requestedView = params.get("view");
  const hash = window.location.hash.replace("#", "");
  return requestedView === "books" || hash === "books" || hash === "books-panel" ? "books" : "topics";
}

function topicIdFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const topicId = params.get("topic");
  return topicById(topicId) ? topicId : null;
}

window.addEventListener("scroll", () => {
  updateLearningCultureNav();
});

window.addEventListener("popstate", () => {
  const topicId = topicIdFromLocation();
  state.topicPageOpen = Boolean(topicId);
  if (topicId) {
    state.selectedTopicId = topicId;
    state.expandedCategoryId = categoryIdForTopic(topicId);
    syncBookSelectionFromTopic();
  }
  switchView(viewFromLocation());
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
});

syncBookSelectionFromTopic();

const initialTopicId = topicIdFromLocation();
if (initialTopicId) {
  state.selectedTopicId = initialTopicId;
  state.expandedCategoryId = categoryIdForTopic(initialTopicId);
  state.topicPageOpen = true;
  syncBookSelectionFromTopic();
}

renderTopics();
renderBooks();
renderTopicDetail();
switchView(viewFromLocation());
updateTopicPageVisibility();
