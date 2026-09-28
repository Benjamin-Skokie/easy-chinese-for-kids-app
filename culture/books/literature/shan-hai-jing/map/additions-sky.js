export const additionalSkyCreatures = [
  {
    id: "sanqingniao",
    nameZh: "三青鸟",
    pinyin: "sān qīng niǎo",
    nameEn: "Three Blue-Green Birds",
    locationZh: "三危山",
    locationPinyin: "sān wēi shān",
    locationEn: "Sanwei Mountain",
    chapter: "《西山经》",
    image: "./assets/sanqingniao.webp",
    factsZh: "《西山经》说三青鸟住在三危山；《大荒西经》写它们红头、黑眼睛，分别叫大鵹、少鵹和青鸟。书中另有记载说，它们为西王母取食。",
    factsEn: "The Western Mountains chapter places three blue-green birds on Sanwei Mountain. The Great Wilderness: West chapter gives them red heads, black eyes, and the names Dali, Shaoli, and Qingniao. Another passage says they fetch food for the Queen Mother of the West.",
    words: [
      { hanzi: "三只鸟", pinyin: "sān zhī niǎo", english: "three birds" },
      { hanzi: "食物", pinyin: "shí wù", english: "food" }
    ],
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "红头黑眼", en: "Red heads, black eyes" }, { zh: "为西王母取食", en: "Fetch food for the Queen Mother" }],
    sources: [
      {
        title: "《山海经·西山经》三危山",
        url: "https://zh.wikisource.org/zh-hans/山海經/西山經",
        note: "原文：三危之山，三青鸟居之。三只完整鸟是同一条目；不画三头或三足鸟。"
      },
      {
        title: "《山海经·大荒西经》三青鸟",
        url: "https://zh.wikisource.org/zh-hans/山海經/大荒西經",
        note: "原文：有三青鸟，赤首黑目，一名曰大鵹，一名少鵹，一名曰青鸟。青色的蓝绿比例、羽形和姿态属于插画选择。"
      },
      {
        title: "《山海经·海内北经》西王母与三青鸟",
        url: "https://ctext.org/shan-hai-jing/hai-nei-bei-jing",
        note: "原文：其南有三青鸟，为西王母取食。在昆仑虚北。维基文库根据校注将此段移入《海内西经》；卡片的取食职能有直接依据，未采用后世送信情节。"
      }
    ]
  },
  {
    id: "biyiniao",
    nameZh: "比翼鸟",
    pinyin: "bǐ yì niǎo",
    nameEn: "Paired-Wing Birds",
    locationZh: "崇吾山",
    locationPinyin: "chóng wú shān",
    locationEn: "Chongwu Mountain",
    chapter: "《西山经》",
    image: "./assets/biyiniao.webp",
    factsZh: "《西山经》的蛮蛮像野鸭，每只只有一只眼睛和一只翅膀，结伴才能飞，出现时预示大水。郭璞把它解释为比翼鸟；《海外南经》写比翼鸟有青、赤两种颜色。",
    factsEn: "In the Western Mountains chapter, Manman look like wild ducks. Each has one eye and one wing, and they can fly only together. Their appearance is a sign of floods in the book. Guo Pu identifies them as paired-wing birds, which another chapter describes as blue-green and red.",
    words: [
      { hanzi: "一起", pinyin: "yì qǐ", english: "together" },
      { hanzi: "翅膀", pinyin: "chì bǎng", english: "wing" }
    ],
    kind: { key: "bird", zh: "飞鸟", en: "Bird" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "一眼一翼", en: "One eye, one wing each" }, { zh: "结伴飞行", en: "Fly as a pair" }],
    sources: [
      {
        title: "《山海经·西山经》崇吾山蛮蛮",
        url: "https://zh.wikisource.org/zh-hans/山海經/西山經",
        note: "原文：其状如凫，而一翼一目，相得乃飞，名曰蛮蛮，见则天下大水。郭璞注认作比翼鸟；不可混同后文鼠身鳖首的同名蛮蛮。"
      },
      {
        title: "《山海经·海外南经》比翼鸟",
        url: "https://zh.wikisource.org/zh-hans/山海經/海外南經",
        note: "原文：比翼鸟在其东，其为鸟青、赤，两鸟比翼。一曰在南山东。一青一赤的具体配色与左右排列是插画选择；两只独立鸟合为一个条目，未增加爱情、对白或救援情节。"
      }
    ]
  },
  {
    id: "tianma",
    nameZh: "天马",
    pinyin: "tiān mǎ",
    nameEn: "Heavenly Horse",
    locationZh: "马成山",
    locationPinyin: "mǎ chéng shān",
    locationEn: "Macheng Mountain",
    chapter: "《北山经》",
    image: "./assets/tianma.webp",
    factsZh: "天马像白狗，有黑色的头。它见到人就飞起来，叫声像在喊自己的名字。",
    factsEn: "Tianma looks like a white dog with a black head. It flies when it sees a person, and its call sounds like its own name.",
    words: [
      { hanzi: "白狗", pinyin: "bái gǒu", english: "white dog" },
      { hanzi: "飞起来", pinyin: "fēi qǐ lái", english: "take flight" }
    ],
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "白身黑头", en: "White body, black head" }, { zh: "见人则飞", en: "Flies when it sees people" }],
    sources: [
      {
        title: "《山海经·北山经》马成山",
        url: "https://zh.wikisource.org/zh-hans/山海經/北山經",
        note: "原文：其状如白犬而黑头，见人则飞，其名曰天马，其鸣自訆。山上多文石，山阴多金玉。原文未说明翅膀；不加翼是保守绘图选择，不在正文断言天马没有翅膀。"
      }
    ]
  },
  {
    id: "jiliang",
    nameZh: "吉量",
    pinyin: "jí liáng",
    nameEn: "Jíliáng",
    locationZh: "犬封国",
    locationPinyin: "quǎn fēng guó",
    locationEn: "Quanfeng Country",
    chapter: "《海内北经》",
    image: "./assets/jiliang.webp",
    factsZh: "吉量是一匹白马，长着红色的鬃毛，眼睛像黄金。书中的传说还说，骑上它的人能活到一千岁。",
    factsEn: "Jiliang is a white horse with a red mane and eyes like gold. In the book's legend, anyone who rides it can live for a thousand years.",
    words: [
      { hanzi: "鬃毛", pinyin: "zōng máo", english: "mane" },
      { hanzi: "金色", pinyin: "jīn sè", english: "golden" }
    ],
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "land", zh: "陆地", en: "Land" },
    traits: [{ zh: "白身红鬃", en: "White coat, red mane" }, { zh: "金色眼睛", en: "Golden eyes" }],
    sources: [
      {
        title: "《山海经·海内北经》犬封国吉量",
        url: "https://zh.wikisource.org/zh-hans/山海經/海內北經",
        note: "犬封国段原文：有文马，缟身朱鬛，目若黄金，名曰吉量，乘之寿千岁。缟指白色，朱鬣是红鬃；眼睛像黄金，不是金属眼睛。千岁寿命明确作为书中的神话说法讲述。图上山间落点仅为插画布局，不代表原著给出犬封国的精确地形。"
      }
    ]
  }
];

export const additionalSkyStories = {
  sanqingniao: {
    kind: "source-reading",
    titleZh: "西王母的三只小帮手",
    titleEn: "Three Birds with a Job to Do",
    zh: [
      "先看红色的头，再看黑亮的眼睛：这三只青鸟都有同样醒目的颜色。它们一起被叫作三青鸟，却各有自己的名字，分别是大鵹、少鵹和青鸟。一、二、三，数一数，红头青羽的伙伴一个也没有少。",
      "三危山是它们的住处。书里还把它们写在西王母身旁。西王母是居住在西方的神灵，而三青鸟有一件具体的工作：为她取食。想到它们时，除了展开的翅膀，还可以想到忙着寻找食物的鸟喙。",
      "把这几处记载放在一起，三只鸟的模样就清楚了：青色的羽毛，红色的脑袋，黑色的眼睛；有自己的山，也有要照顾的西王母。它们带回的是食物，红头和青羽之间，藏着一份忙碌的差事。"
    ],
    en: [
      "Three red heads, three pairs of black eyes, and plenty of blue-green feathers: meet the three birds of Sanwei Mountain. They look alike in color, but each has a name of its own. There is Dali, Shaoli, and Qingniao. These are three separate birds, all sharing a mountain home.",
      "Their next appearance brings us to the Queen Mother of the West, a powerful spirit who lives in the western lands. The birds have a job to do for her. They fetch her food. Alongside all the fierce beasts and strange calls in the Classic of Mountains and Seas, here are three birds busy helping someone eat.",
      "Different parts of the book let us follow them a little farther. One gives us their mountain. Another gives us their colors and names. A third shows them beside the Queen Mother of the West, where those bright birds have food to bring back."
    ]
  },
  biyiniao: {
    kind: "source-reading",
    titleZh: "两只鸟，一起飞",
    titleEn: "It Takes Two to Fly",
    zh: [
      "一只鸟只有一只翅膀，怎么飞呢？崇吾山的蛮蛮就有这个奇怪的模样：身体像野鸭，却只有一只眼睛和一只翅膀。书里接着说，两只结伴，才能飞起来。少了伙伴，就少了另一边展开的翅膀。",
      "古代学者郭璞把蛮蛮解释为比翼鸟。两只鸟并排靠在一起，青色和赤色的羽毛相伴出现在空中。每只都有自己的身体，飞行时却离不开另一只。把两只放在一起看，那双完整的翅膀才出现了。",
      "《山海经》还把蛮蛮的出现和大水联系起来。在这本书的世界里，一种奇鸟飞过，也可能像天气发来的消息。这对鸟不只有特别的飞行方式，在书中还带着大水将来的消息。"
    ],
    en: [
      "How do you fly with just one wing? The strange birds of Chongwu Mountain have an answer: fly together. Each looks like a wild duck, but each has only one eye and one wing. The book calls them Manman and says they can take flight only when they have a partner.",
      "Guo Pu, who wrote notes explaining the book, identifies them as paired-wing birds. Picture two separate bodies close together, with one wing reaching out on either side. Another passage describes their colors as blue-green and red. Together, the birds make a shape that one of them could never make alone: two bodies carried between two spreading wings.",
      "There is another surprise in their description. The Classic of Mountains and Seas links their arrival with great floods. In its marvelous world, seeing a strange bird could also mean watching for a change in the weather. This pair brings more than a puzzle about flying; it brings a warning about rising water."
    ]
  },
  tianma: {
    kind: "source-reading",
    titleZh: "叫天马的白狗？",
    titleEn: "A Horse That Looks Like a Dog?",
    zh: [
      "听到“天马”，你可能已经想到一匹在天上奔跑的马。可翻到《山海经》的马成山，等着你的却是另一副模样：白白的身体，黑黑的脑袋，整个样子像一只狗。名字里有一个“马”字，找它时却得留意犬形的小兽。",
      "马成山上有带花纹的石头，山的背阴处还藏着金和玉。不过，天马最奇妙的地方会在它看见人的时候出现：它会飞起来。原文把这个动作说得很直接，刚才还像白狗的动物，忽然就有了飞向空中的本领。",
      "它还有一种特别的叫声，听起来像在喊自己的名字。书里许多奇兽都有这样的声音，天马也是其中之一。白身黑头的模样帮你认出它，声音又把名字送进耳朵：这位马成山的居民，会飞，也会自己报名字。"
    ],
    en: [
      "Tianma means ‘heavenly horse.’ You might expect a magnificent horse racing through the clouds. But the creature on Macheng Mountain is a surprise. The Classic of Mountains and Seas says it looks like a white dog with a black head. You could search the whole hillside for a horse and miss it completely.",
      "The mountain has patterned stones, with gold and jade on its shady side. Among these treasures lives a creature with a trick of its own. When it sees a person, it flies. That familiar dog-like shape suddenly belongs up in the air. Its name begins to make a little more sense, even if its body still looks nothing like a horse.",
      "Then comes its call. The book says Tianma sounds as though it is calling its own name. Several creatures in the Classic of Mountains and Seas do that. For this one, a black head and a white body help you spot it; its voice helps you learn what to call it."
    ]
  },
  jiliang: {
    kind: "source-reading",
    titleZh: "白马的一抹红",
    titleEn: "The Horse with the Red Mane",
    zh: [
      "先看见一匹白马，再看见它脖子上的一抹朱红：那是吉量的鬃毛。鬃毛是沿着马脖子长出的长毛，一转头就能看得很清楚。白色的身体衬着红色的鬃毛，让这匹马有了特别醒目的模样。",
      "再往前看，它还有像黄金一样的眼睛。《山海经》把吉量写在犬封国的记载里，还给了它一份神奇的本领：在这个传说中，骑上吉量的人能活到一千岁。一趟骑行，竟和这么长的岁月连在一起。",
      "地图上的鹿蜀也像马，不过它长着白色的头、老虎一样的条纹和红色的尾巴。吉量的红色长在脖子上，鹿蜀的红色长在尾巴上。把两只放在一起，目光从头走到尾，就能看出它们各自不同的模样。"
    ],
    en: [
      "First you see a white horse. Then you spot the bright red hair along its neck. That is its mane, the long hair that grows behind a horse’s ears and down its neck. Against a white coat, this red mane makes Jiliang easy to recognize before you even reach its face.",
      "Look at the eyes next. The Classic of Mountains and Seas compares them to gold. The book places Jiliang in Quanfeng Country and gives it one more extraordinary gift: in this legend, anyone who rides it can live for a thousand years. That is a very big promise for a single horse ride.",
      "Another creature on the map, Lushu, looks like a horse too. But Lushu has a white head, tiger stripes, and a red tail. On Jiliang, the red belongs along the neck. On Lushu, it belongs at the other end. Following those colors from head to tail helps tell the two creatures apart."
    ]
  }
};
