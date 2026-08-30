export const mealsFeelingsTopic = {
    id: "meals-feelings",
    title: "Meals & Feelings",
    summary: "Talk about lunch and say when you are hungry or thirsty.",
    progressLabel: "4A Lessons 5 and 7",
    iconText: "午饭",
    iconColor: "#c48d46",
    focus: { hanzi: "我午饭喝了牛奶，吃了披萨。", pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza.", audio: "我午饭喝了牛奶吃了披萨" },
    interactiveScene: "meals-feelings",
    parentGuide: "Use lunch or snack time to ask whether your child is hungry or thirsty, then say what they eat or drink.",
    cultureGuide: "Meals and feelings connect simple food words to a useful everyday situation.",
    activities: ["Play scenes", "Talk about lunch", "Listen and choose", "Build a sentence"],
    steps: [
      { book: "4A", lesson: 5, title: "My lunch", cardLabel: "Talk about lunch", note: "Say what you eat and drink for lunch." },
      { book: "4A", lesson: 7, title: "I'm hungry", cardLabel: "Say when you are hungry", note: "Say when you are hungry or thirsty." }
    ]
  };

export const mealsFeelingsTopicData = {
    practiceSummary: "Match the first line of each food conversation to its reply.",
    sceneGroups: [
      {
        id: "lunch",
        label: "",
        lessonSources: ["4a:5"],
        items: [
          {
            id: "lunch",
            label: "Lunch",
            hanzi: "我午饭喝了牛奶，吃了披萨。",
            pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.",
            english: "For lunch, I drank milk and ate pizza.",
            audio: "我午饭喝了牛奶吃了披萨",
            imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp",
            lessonSources: ["4a:5"]
          },
          {
            id: "cola-water",
            label: "No Coke",
            hanzi: "我要喝可乐。没有可乐，你可以喝水。",
            pinyin: "wǒ yào hē kě lè. méi yǒu kě lè, nǐ kě yǐ hē shuǐ.",
            english: "I want to drink Coke. There is no Coke. You can drink water.",
            audio: "我要喝可乐没有可乐你可以喝水",
            imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp"
          }
        ]
      },
      {
        id: "feelings",
        label: "Food Feelings",
        lessonSources: ["4a:7"],
        items: [
          { id: "hungry", label: "Hungry", hanzi: "我饿了，我要吃炒饭。", pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice.", audio: "我饿了我要吃炒饭", imagePath: "assets/illustrated-food-feelings/hungry.webp", lessonSources: ["4a:7"] },
          { id: "thirsty", label: "Thirsty", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water.", audio: "我渴了我要喝水", imagePath: "assets/illustrated-food-feelings/thirsty.webp", lessonSources: ["4a:7"] },
          { id: "delicious", label: "Delicious", hanzi: "炒饭好吃。", pinyin: "chǎo fàn hǎo chī.", english: "Fried rice is delicious.", audio: "炒饭好吃", imagePath: "assets/illustrated-food-feelings/delicious-fried-rice.webp", lessonSources: ["4a:7"] },
          { id: "full", label: "Full", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more.", audio: "妈妈我饱了不吃了", imagePath: "assets/illustrated-food-feelings/full.webp", lessonSources: ["4a:7"] }
        ]
      }
    ],
    wordGroups: [
      { id: "lunch", hanzi: "午饭", english: "My Lunch", lessonSources: ["4a:5"], items: [["fried-noodles", "炒面", "chǎo miàn", "fried noodles", "assets/illustrated-food/chow-mein.webp"], ["fries", "薯条", "shǔ tiáo", "French fries", "assets/illustrated-food/french-fries.webp"], ["hot-dog", "热狗", "rè gǒu", "hot dog", "assets/illustrated-food/hot-dog.webp"], ["sandwich", "三明治", "sān míng zhì", "sandwich", "assets/illustrated-food/sandwich.webp"], ["pizza", "披萨", "pī sà", "pizza", "assets/illustrated-food/pizza.webp"]] },
      { id: "feelings", hanzi: "饿了和渴了", english: "Hungry & Thirsty", lessonSources: ["4a:7"], items: [["hungry", "饿", "è", "hungry", "assets/illustrated-food-feelings/hungry.webp"], ["thirsty", "渴", "kě", "thirsty", "assets/illustrated-food-feelings/thirsty.webp"], ["want", "要", "yào", "want", "assets/illustrated-food-feelings/want-eat-fried-rice-landscape.webp"], ["fried-rice", "炒饭", "chǎo fàn", "fried rice", "assets/illustrated-food/fried-rice.webp"], ["coke", "可乐", "kě lè", "Coke", "assets/illustrated-food/cola.webp"], ["delicious", "好吃", "hǎo chī", "delicious", "assets/illustrated-food-feelings/delicious-fried-rice.webp"], ["full", "饱", "bǎo", "full", "assets/illustrated-food-feelings/full.webp"]] }
    ],
    practiceItems: [
      { id: "ask-lunch", hanzi: "你午饭吃什么？", pinyin: "nǐ wǔ fàn chī shén me?", english: "What do you have for lunch?", audio: "你午饭吃什么" },
      { id: "lunch-answer", hanzi: "三明治和果汁。", pinyin: "sān míng zhì hé guǒ zhī.", english: "Sandwiches and juice.", audio: "三明治和果汁" },
      { id: "can-eat-chocolate", hanzi: "我可以吃巧克力吗？", pinyin: "wǒ kě yǐ chī qiǎo kè lì ma?", english: "May I eat chocolate?", audio: "我可以吃巧克力吗" },
      { id: "not-now", hanzi: "不行，现在吃饭。", pinyin: "bù xíng, xiàn zài chī fàn.", english: "No, it is time to eat now.", audio: "不行现在吃饭" },
      { id: "no-hotdog", hanzi: "对不起，没有热狗。", pinyin: "duì bu qǐ, méi yǒu rè gǒu.", english: "Sorry, there are no hot dogs.", audio: "对不起没有热狗" },
      { id: "no-cola-water", hanzi: "没有可乐，你可以喝水。", pinyin: "méi yǒu kě lè, nǐ kě yǐ hē shuǐ.", english: "There is no Coke. You can drink water.", audio: "没有可乐你可以喝水" }
    ],
    conversationPairs: [
      { id: "thirsty-coke", hanzi: "我渴了。", pinyin: "wǒ kě le.", english: "I am thirsty.", reply: "我要喝可乐。", replyAudio: "我要喝可乐。", replyPinyin: "wǒ yào hē kě lè.", replyEnglish: "I want to drink Coke.", audio: "我渴了", lessonSources: ["4a:7"] },
      { id: "hungry-fried-rice", hanzi: "我饿了。", pinyin: "wǒ è le.", english: "I am hungry.", reply: "我要吃炒饭。", replyAudio: "我要吃炒饭。", replyPinyin: "wǒ yào chī chǎo fàn.", replyEnglish: "I want to eat fried rice.", audio: "我饿了", lessonSources: ["4a:7"] },
      { id: "full-stop", hanzi: "妈妈，我饱了。", pinyin: "mā ma, wǒ bǎo le.", english: "Mom, I am full.", reply: "好，不吃了。", replyAudio: "好，不吃了。", replyPinyin: "hǎo, bù chī le.", replyEnglish: "Okay, stop eating.", audio: "妈妈我饱了", lessonSources: ["4a:7"] },
      { id: "lunch-sandwich", hanzi: "你午饭吃什么？", pinyin: "nǐ wǔ fàn chī shén me?", english: "What do you eat for lunch?", reply: "三明治和果汁。", replyAudio: "三明治和果汁。", replyPinyin: "sān míng zhì hé guǒ zhī.", replyEnglish: "Sandwiches and juice.", audio: "你午饭吃什么", lessonSources: ["4a:5"] },
      { id: "chocolate-mealtime", hanzi: "我可以吃巧克力吗？", pinyin: "wǒ kě yǐ chī qiǎo kè lì ma?", english: "May I eat chocolate?", reply: "不行，现在吃饭。", replyAudio: "不行，现在吃饭。", replyPinyin: "bù xíng, xiàn zài chī fàn.", replyEnglish: "No, it is time to eat now.", audio: "我可以吃巧克力吗" },
      { id: "no-coke-water", hanzi: "没有可乐。", pinyin: "méi yǒu kě lè.", english: "There is no Coke.", reply: "你可以喝水。", replyAudio: "你可以喝水。", replyPinyin: "nǐ kě yǐ hē shuǐ.", replyEnglish: "You can drink water.", audio: "没有可乐" }
    ],
    pictureChoices: [
      {
        id: "lunch-picture",
        imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp",
        imageAlt: "Anan eating lunch.",
        correctId: "lunch-sentence",
        lessonSources: ["4a:5"],
        options: [
          { id: "lunch-sentence", hanzi: "我午饭喝了牛奶，吃了披萨。", pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza." },
          { id: "lunch-coke", hanzi: "我要喝可乐。", pinyin: "wǒ yào hē kě lè.", english: "I want to drink Coke." },
          { id: "lunch-hungry", hanzi: "我饿了，我要吃炒饭。", pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice." },
          { id: "lunch-full", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "no-coke-picture",
        imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp",
        imageAlt: "Anan looking for Coke while Mom offers water.",
        correctId: "no-coke-sentence",
        options: [
          { id: "no-coke-sentence", hanzi: "我要喝可乐。没有可乐，你可以喝水。", pinyin: "wǒ yào hē kě lè. méi yǒu kě lè, nǐ kě yǐ hē shuǐ.", english: "I want to drink Coke. There is no Coke. You can drink water." },
          { id: "no-coke-lunch", hanzi: "我午饭喝了牛奶，吃了披萨。", pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza." },
          { id: "no-coke-water", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water." },
          { id: "no-coke-sandwich", hanzi: "我喜欢吃三明治。", pinyin: "wǒ xǐ huan chī sān míng zhì.", english: "I like to eat sandwiches." }
        ]
      },
      {
        id: "hungry-picture",
        imagePath: "assets/illustrated-food-feelings/hungry.webp",
        imageAlt: "A child who is hungry and wants fried rice.",
        correctId: "hungry-sentence",
        lessonSources: ["4a:7"],
        options: [
          { id: "hungry-sentence", hanzi: "我饿了，我要吃炒饭。", pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice." },
          { id: "hungry-thirsty", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water." },
          { id: "hungry-coke", hanzi: "我要喝可乐。", pinyin: "wǒ yào hē kě lè.", english: "I want to drink Coke." },
          { id: "hungry-full", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "thirsty-picture",
        imagePath: "assets/illustrated-food-feelings/thirsty.webp",
        imageAlt: "A child who is thirsty and wants water.",
        correctId: "thirsty-sentence",
        lessonSources: ["4a:7"],
        options: [
          { id: "thirsty-sentence", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water." },
          { id: "thirsty-hungry", hanzi: "我饿了，我要吃炒饭。", pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice." },
          { id: "thirsty-lunch", hanzi: "我午饭喝了牛奶，吃了披萨。", pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza." },
          { id: "thirsty-full", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "delicious-picture",
        imagePath: "assets/illustrated-food-feelings/delicious-fried-rice.webp",
        imageAlt: "Fried rice that tastes delicious.",
        correctId: "delicious-sentence",
        lessonSources: ["4a:7"],
        options: [
          { id: "delicious-sentence", hanzi: "炒饭好吃。", pinyin: "chǎo fàn hǎo chī.", english: "Fried rice is delicious." },
          { id: "delicious-thirsty", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water." },
          { id: "delicious-coke", hanzi: "我要喝可乐。", pinyin: "wǒ yào hē kě lè.", english: "I want to drink Coke." },
          { id: "delicious-full", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "full-picture",
        imagePath: "assets/illustrated-food-feelings/full.webp",
        imageAlt: "A child who is full after eating.",
        correctId: "full-sentence",
        lessonSources: ["4a:7"],
        options: [
          { id: "full-sentence", hanzi: "妈妈，我饱了，不吃了。", pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more." },
          { id: "full-hungry", hanzi: "我饿了，我要吃炒饭。", pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice." },
          { id: "full-thirsty", hanzi: "我渴了，我要喝水。", pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water." },
          { id: "full-lunch", hanzi: "我午饭喝了牛奶，吃了披萨。", pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza." }
        ]
      }
    ],
    review: [
      { pattern: "你午饭吃什么？", pinyin: "nǐ wǔ fàn chī shén me?", english: "What do you have for lunch?", example: "我午饭吃……，喝……", examplePinyin: "wǒ wǔ fàn chī..., hē...", exampleEnglish: "For lunch, I eat ... and drink ...", lessonSources: ["4a:5"] },
      { pattern: "饿了 / 渴了", pinyin: "è le / kě le", english: "hungry / thirsty", example: "我饿了，我要吃炒饭。 我渴了，我要喝水。", examplePinyin: "wǒ è le, wǒ yào chī chǎo fàn. wǒ kě le, wǒ yào hē shuǐ.", exampleEnglish: "When you are hungry, eat. When you are thirsty, drink.", lessonSources: ["4a:7"] },
      { pattern: "要 + 吃 / 喝 + 食物", pinyin: "yào + chī / hē + shí wù", english: "want to eat / drink + food", example: "我要吃炒饭。我要喝可乐。", examplePinyin: "wǒ yào chī chǎo fàn. wǒ yào hē kě lè.", exampleEnglish: "I want to eat fried rice. I want to drink Coke.", lessonSources: ["4a:7"] },
      { pattern: "好吃 / 饱了", pinyin: "hǎo chī / bǎo le", english: "delicious / full", example: "炒饭好吃。妈妈，我饱了，不吃了。", examplePinyin: "chǎo fàn hǎo chī. mā ma, wǒ bǎo le, bù chī le.", exampleEnglish: "Fried rice is delicious. Mom, I am full. I do not want to eat any more.", lessonSources: ["4a:7"] },
      { pattern: "没有……，你可以……", pinyin: "méi yǒu..., nǐ kě yǐ...", english: "There is no ...; you can ...", example: "没有可乐。你可以喝水。", examplePinyin: "méi yǒu kě lè. nǐ kě yǐ hē shuǐ.", exampleEnglish: "There is no Coke. You can drink water." }
    ]
};

export const mealsFeelingsSentenceBuilds = [
    { id: "lunch", imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp", target: ["我", "午饭", "喝了", "牛奶", "吃了", "披萨"], distractors: ["要", "水", "学校"], pinyin: "wǒ wǔ fàn hē le niú nǎi, chī le pī sà.", english: "For lunch, I drank milk and ate pizza.", lessonSources: ["4a:5"] },
    { id: "hungry", imagePath: "assets/illustrated-food-feelings/hungry.webp", target: ["我", "饿", "了", "我", "要", "吃", "炒饭"], distractors: ["喝", "水", "学校"], pinyin: "wǒ è le, wǒ yào chī chǎo fàn.", english: "I am hungry. I want to eat fried rice.", lessonSources: ["4a:7"] },
    { id: "thirsty", imagePath: "assets/illustrated-food-feelings/thirsty.webp", target: ["我", "渴", "了", "我", "要", "喝", "水"], distractors: ["吃", "炒饭", "学校"], pinyin: "wǒ kě le, wǒ yào hē shuǐ.", english: "I am thirsty. I want to drink water.", lessonSources: ["4a:7"] },
    { id: "delicious", imagePath: "assets/illustrated-food-feelings/delicious-fried-rice.webp", target: ["炒饭", "好吃"], distractors: ["可乐", "学校", "教室"], pinyin: "chǎo fàn hǎo chī.", english: "Fried rice is delicious.", lessonSources: ["4a:7"] },
    { id: "full", imagePath: "assets/illustrated-food-feelings/full.webp", target: ["妈妈", "我", "饱", "了", "不吃", "了"], distractors: ["渴", "要", "学校"], pinyin: "mā ma, wǒ bǎo le, bù chī le.", english: "Mom, I am full. I do not want to eat any more.", lessonSources: ["4a:7"] }
];
