export const books = [
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
      { lesson: 5, title: "Pets", topicId: "pets" },
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
      { lesson: 1, title: "Today is Monday", topicId: "weekdays" },
      { lesson: 2, title: "What time is it?", topicId: "time-date" },
      { lesson: 3, title: "Stationery", topicId: "stationery" },
      { lesson: 4, title: "My classroom", topicId: "classroom" },
      { lesson: 5, title: "Animals", topicId: "animals" },
      { lesson: 6, title: "Big or small", topicId: "comparisons" },
      { lesson: 7, title: "Snacks", topicId: "food" }
    ]
  },
  {
    id: "3a",
    label: "Book 3A",
    lessons: [
      { lesson: 1, title: "Numbers", topicId: "numbers" },
      { lesson: 2, title: "Date", topicId: "dates" },
      { lesson: 3, title: "Happy birthday!", topicId: "dates" },
      { lesson: 4, title: "Family", topicId: "family" },
      { lesson: 5, title: "Nationality", topicId: "identity" },
      { lesson: 6, title: "Request", topicId: "polite-words" },
      { lesson: 7, title: "Clothes", topicId: "clothes" }
    ]
  },
  {
    id: "3b",
    label: "Book 3B",
    lessons: [
      { lesson: 1, title: "My schoolbag", topicId: "school-supplies" },
      { lesson: 2, title: "Our classroom", topicId: "classroom" },
      { lesson: 3, title: "Positions", topicId: "positions" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies-3b" },
      { lesson: 5, title: "Food and drink", topicId: "food-preferences" },
      { lesson: 6, title: "Vegetables", topicId: "food" },
      { lesson: 7, title: "Nature", topicId: "nature" }
    ]
  },
  {
    id: "4a",
    label: "Book 4A",
    lessons: [
      { lesson: 1, title: "Telephone numbers", topicId: "numbers" },
      { lesson: 2, title: "Languages", topicId: "languages" },
      { lesson: 3, title: "Tell the time", topicId: "time-date" },
      { lesson: 4, title: "Daily routine", topicId: "time-date" },
      { lesson: 5, title: "My lunch", topicId: "meals-feelings" },
      { lesson: 6, title: "Means of transport", topicId: "transport" },
      { lesson: 7, title: "I'm hungry", topicId: "meals-feelings" }
    ]
  },
  {
    id: "4b",
    label: "Book 4B",
    lessons: [
      { lesson: 1, title: "It's raining", topicId: "weather" },
      { lesson: 2, title: "Clothes", topicId: "clothes" },
      { lesson: 3, title: "My room", topicId: "daily-life" },
      { lesson: 4, title: "Hobbies", topicId: "hobbies-at-home" },
      { lesson: 5, title: "Our school", topicId: "school" },
      { lesson: 6, title: "School subjects", topicId: "school-subjects" },
      { lesson: 7, title: "Leisure time", topicId: "hobbies-leisure" }
    ]
  }
];

export const bookHomeCategories = [
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
    hint: "Book 3A and 3B: birthdays, requests, backpack, hobbies",
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

export const topicGroups = [
  {
    id: "foundations",
    label: "Foundations",
    description: "The first speaking patterns young learners need most.",
    topicIds: ["numbers", "multiplication-rhyme", "greetings", "polite-words", "introductions", "age", "identity", "languages"]
  },
  {
    id: "me-and-family",
    label: "Me & Family",
    description: "Personal, family, body, clothes, and everyday child language.",
    topicIds: ["family", "body", "colours", "clothes"]
  },
  {
    id: "daily-world",
    label: "Daily World",
    description: "Food, routines, weather, and the world around the child.",
    topicIds: ["food", "food-preferences", "meals-feelings", "toys", "comparisons", "positions", "transport", "daily-life", "everyday-actions", "pets", "animals", "nature", "weather"]
  },
  {
    id: "school-and-time",
    label: "School & Time",
    description: "Practical classroom, calendar, and time-based language.",
    topicIds: ["weekdays", "time-date", "dates", "stationery", "school-supplies", "classroom", "school", "school-subjects"]
  }
];

export const topicCardMeta = {
  numbers: { zhTitle: "数字", enTitle: "Numbers", hint: "Count, hear, and use numbers" },
  "multiplication-rhyme": { zhTitle: "九九乘法", enTitle: "Multiplication Rhyme", hint: "Classic rhythm practice" },
  greetings: { zhTitle: "打招呼", enTitle: "Greetings", hint: "Hello, good morning, goodbye" },
  "polite-words": { zhTitle: "礼貌用语", enTitle: "Polite Words", hint: "Thank you, sorry, please" },
  introductions: { zhTitle: "介绍自己", enTitle: "Introductions", hint: "Say your name and meet friends" },
  age: { zhTitle: "年龄", enTitle: "Age", hint: "Ask and say how old you are" },
  identity: { zhTitle: "国籍", enTitle: "Nationality", hint: "Ask and say where someone is from" },
  languages: { zhTitle: "语言", enTitle: "Languages", hint: "Say which language someone speaks" },
  family: { zhTitle: "家人", enTitle: "Family", hint: "Mom, dad, siblings, grandparents" },
  body: { zhTitle: "身体", enTitle: "Body", hint: "Tap body parts and listen" },
  pets: { zhTitle: "宠物", enTitle: "Pets", hint: "Dog, cat, turtle, goldfish" },
  animals: { zhTitle: "动物园", enTitle: "Zoo Animals", hint: "Count animals with measure words" },
  colours: { zhTitle: "颜色", enTitle: "Colours", hint: "Red, yellow, blue, green" },
  food: { zhTitle: "食物和饮料", enTitle: "Food & Drinks", hint: "Fruit, vegetables, snacks, drinks" },
  "food-preferences": { zhTitle: "喜欢和不喜欢", enTitle: "Food Preferences", hint: "Ask and say what you like to eat" },
  "meals-feelings": { zhTitle: "午饭和感觉", enTitle: "Meals & Feelings", hint: "Lunch, hungry, thirsty" },
  weekdays: { zhTitle: "星期", enTitle: "Days of the Week", hint: "Monday to Sunday" },
  "time-date": { zhTitle: "时间", enTitle: "Time & Routines", hint: "Clock and daily routines" },
  dates: { zhTitle: "日期", enTitle: "Dates & Months", hint: "Months, dates, birthdays" },
  stationery: { zhTitle: "我的文具", enTitle: "My Stationery", hint: "My things, colors, and measure words" },
  "school-supplies": { zhTitle: "文具和书包", enTitle: "Stationery & Backpack", hint: "Pencil, ruler, books, backpack" },
  classroom: { zhTitle: "教室", enTitle: "Classroom", hint: "Classroom, table, chair, board" },
  school: { zhTitle: "我们的学校", enTitle: "Our School", hint: "Library, playground, cafeteria" },
  "school-subjects": { zhTitle: "学校学科", enTitle: "School Subjects", hint: "Chinese, English, music, art, PE" },
  hobbies: { zhTitle: "我喜欢", enTitle: "What I Like", hint: "Reading, drawing, writing, games" },
  "hobbies-3b": { zhTitle: "音乐和运动", enTitle: "Music & Movement", hint: "Singing, dancing, swimming, skating" },
  "hobbies-at-home": { zhTitle: "在家爱好", enTitle: "Hobbies at Home", hint: "Television, piano, games, movies" },
  "hobbies-leisure": { zhTitle: "休闲时间", enTitle: "Leisure Time", hint: "Running, soccer, biking, sand" },
  toys: { zhTitle: "玩具", enTitle: "Toys", hint: "Doll, toy train, airplane, bear" },
  clothes: { zhTitle: "衣服", enTitle: "Clothes", hint: "Dress for the day" },
  comparisons: { zhTitle: "描述和比较", enTitle: "Descriptions & Comparisons", hint: "Big, small, long, short" },
  positions: { zhTitle: "位置和方向", enTitle: "Positions & Directions", hint: "Up, down, inside, outside" },
  transport: { zhTitle: "交通", enTitle: "Transportation", hint: "Walk, bike, bus, train" },
  "daily-life": { zhTitle: "我的房间", enTitle: "My Room", hint: "Rooms and furniture" },
  "everyday-actions": { zhTitle: "日常动作", enTitle: "Everyday Actions", hint: "Walk, run, sit, stand, climb, lie down" },
  nature: { zhTitle: "自然", enTitle: "Nature", hint: "Sky, ground, trees, flowers" },
  weather: { zhTitle: "天气", enTitle: "Weather", hint: "Sun, rain, snow, wind" }
};

export const learningHomeCategories = [
  {
    id: "foundations",
    zhTitle: "开口说中文",
    enTitle: "Start Speaking",
    hint: "Numbers, greetings, names, age, nationality, languages",
    accent: "#be5b49",
    iconSrc: "assets/navigation-icons/lele-wave-icon.webp",
    topicIds: ["numbers", "greetings", "polite-words", "introductions", "age", "identity", "languages", "multiplication-rhyme"]
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
    hint: "Week, time, dates, routines, home, actions",
    accent: "#517b8d",
    iconSrc: "assets/illustrated-clocks/10oclock.webp",
    topicIds: ["weekdays", "time-date", "dates", "comparisons", "positions", "transport", "daily-life", "everyday-actions"]
  },
  {
    id: "school-life",
    zhTitle: "学校生活",
    enTitle: "School Life",
    hint: "Classroom, backpack, subjects",
    accent: "#6d8a4f",
    iconEmoji: "🏫",
    topicIds: ["stationery", "school-supplies", "classroom", "school", "school-subjects"]
  },
  {
    id: "food",
    zhTitle: "食物",
    enTitle: "Food",
    hint: "Food words, preferences, and meals",
    accent: "#c48d46",
    iconSrc: "assets/navigation-icons/burger-fries-icon.webp",
    topicIds: ["food", "food-preferences", "meals-feelings"]
  },
  {
    id: "world",
    zhTitle: "自然和颜色",
    enTitle: "World Around Us",
    hint: "Nature, weather, pets, zoo animals, colours",
    accent: "#6f7fa4",
    iconSrc: "assets/navigation-icons/panda-bamboo-icon.webp",
    topicIds: ["nature", "weather", "pets", "animals", "colours"]
  },
  {
    id: "play",
    zhTitle: "兴趣和玩具",
    enTitle: "Play & Hobbies",
    hint: "Toys, reading, music, movement",
    accent: "#8f6988",
    iconSrc: "assets/navigation-icons/teddy-robot-icon.webp",
    topicIds: ["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"]
  }
];
