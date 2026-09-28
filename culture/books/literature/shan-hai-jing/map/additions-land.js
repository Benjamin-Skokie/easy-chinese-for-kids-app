export const additionalLandCreatures = [
  {
    id: "yinglong",
    nameZh: "应龙",
    pinyin: "yìng lóng",
    nameEn: "Yinglong",
    locationZh: "南方",
    locationPinyin: "nán fāng",
    locationEn: "the southern lands",
    chapter: "《大荒北经》",
    image: "./assets/yinglong.webp",
    kind: { key: "spirit", zh: "神灵", en: "Spirit" },
    habitat: { key: "river", zh: "水边", en: "Waterside" },
    traits: [{ zh: "有翼的龙", en: "Winged dragon" }, { zh: "与雨有关", en: "Linked with rain" }],
    factsZh: "书中说，应龙能够蓄水，后来住在南方，和雨水有关。郭璞在给《山海经》写的注释中，把应龙解释为有翅膀的龙。",
    factsEn: "The book says Yinglong gathers water and later settles in the south, where it is linked with rain. Guo Pu, who wrote notes explaining the book, describes Yinglong as a dragon with wings.",
    words: [
      { hanzi: "下雨", pinyin: "xià yǔ", english: "rain" },
      { hanzi: "翅膀", pinyin: "chì bǎng", english: "wings" }
    ],
    sources: [
      { title: "《山海经·大荒北经》", url: "https://zh.wikisource.org/wiki/山海經/大荒北經", note: "应龙畜水；风伯雨师纵大风雨，女魃使雨停止；应龙后来居南，书中以此解释南方多雨。地图水边分类为主题布局，不是精确古地理定位。" },
      { title: "《山海经·大荒东经》", url: "https://zh.wikisource.org/wiki/山海經/大荒東經", note: "旱而为应龙之状，乃得大雨。正文未说明颜色与具体龙形。" },
      { title: "《山海经》四部丛刊本卷十四·郭璞注", url: "https://zh.wikisource.org/wiki/山海經_(四部叢刊本)/卷第十四", note: "郭璞注：应龙，龙有翼者也。图像双翼据古注，鳞片颜色与翼形为艺术选择。" }
    ]
  },
  {
    id: "qiongqi",
    nameZh: "穷奇",
    pinyin: "qióng qí",
    nameEn: "Qiongqi",
    locationZh: "蜪犬之北",
    locationPinyin: "táo quǎn zhī běi",
    locationEn: "north of the Tao Dogs",
    chapter: "《海内北经》",
    image: "./assets/qiongqi.webp",
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "land", zh: "陆地", en: "Land" },
    traits: [{ zh: "老虎模样", en: "Tiger-like" }, { zh: "有翅膀", en: "Wings" }],
    factsZh: "《海内北经》的穷奇像老虎，有翅膀，书中说它会伤害人。《西山经》还记有另一种模样：像牛，披着刺猬般的毛，叫声像狗。",
    factsEn: "In the Within the Seas: North chapter, Qiongqi looks like a tiger with wings and is dangerous to people. The Western Mountains chapter gives a different description: an ox-like creature with prickly hair and a dog's call.",
    words: [
      { hanzi: "老虎", pinyin: "lǎo hǔ", english: "tiger" },
      { hanzi: "北边", pinyin: "běi biān", english: "north of" }
    ],
    sources: [
      { title: "《山海经·海内北经》", url: "https://zh.wikisource.org/wiki/山海經/海內北經", note: "穷奇状如虎，有翼；在蜪犬北。采用有翼虎版本，不把《西山经》的邽山地点移入本条。原文的伤害描写只概括为危险。图上山林是美术布局，原文此条未指明山名。" },
      { title: "《山海经·西山经》", url: "https://zh.wikisource.org/wiki/山海經/西山經", note: "另一条穷奇在邽山，状如牛、猬毛、音如獆狗。拓展阅读作为另一种描述介绍，不混合为同一造型，也不加入《神异经》的惩善扬恶传说。" }
    ]
  },
  {
    id: "zouwu",
    nameZh: "驺吾",
    pinyin: "zōu wú",
    nameEn: "Zouwu",
    locationZh: "林氏国",
    locationPinyin: "lín shì guó",
    locationEn: "the land of Linshi",
    chapter: "《海内北经》",
    image: "./assets/zouwu-single-tail.webp",
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "land", zh: "陆地", en: "Land" },
    traits: [{ zh: "五彩毛色", en: "Many-colored coat" }, { zh: "尾长于身", en: "Extra-long tail" }],
    factsZh: "驺吾和老虎差不多大，身上有五彩颜色，尾巴比身体长。书中说，骑着它一天能走千里，那是一段非常远的路。",
    factsEn: "Zouwu is as big as a tiger, with a coat of many colors and a tail longer than its body. The book says a rider can travel a thousand li in one day. A li is an old Chinese measure of distance, so this is an enormous journey.",
    words: [
      { hanzi: "五彩", pinyin: "wǔ cǎi", english: "many-colored" },
      { hanzi: "长", pinyin: "cháng", english: "long" }
    ],
    sources: [
      { title: "《山海经·海内北经》", url: "https://zh.wikisource.org/wiki/山海經/海內北經", note: "林氏国有珍兽，大若虎，五采毕具，尾长于身，名曰驺吾，乘之日行千里。大若虎是体量比较，不是严格规定虎头；五色分布为艺术选择。未加入不食活物、特定性情等别处传说。山林为地图布局，非精确地理主张。" }
    ]
  },
  {
    id: "tiangou",
    nameZh: "天狗",
    pinyin: "tiān gǒu",
    nameEn: "Tiangou",
    locationZh: "阴山",
    locationPinyin: "yīn shān",
    locationEn: "Yin Mountain",
    chapter: "《西山经》",
    image: "./assets/tiangou.webp",
    kind: { key: "beast", zh: "走兽", en: "Beast" },
    habitat: { key: "mountain", zh: "山林", en: "Mountain" },
    traits: [{ zh: "白色脑袋", en: "White head" }, { zh: "像狸", en: "Cat-like" }],
    factsZh: "天狗像狸，有白色的头，叫声被写作“榴榴”。书中说，它可以抵挡凶险。",
    factsEn: "Tiangou looks like a wildcat with a white head. The book writes its call as 'liu-liu' and says it can keep danger away.",
    words: [
      { hanzi: "白色", pinyin: "bái sè", english: "white" },
      { hanzi: "脑袋", pinyin: "nǎo dai", english: "head" }
    ],
    sources: [
      { title: "《山海经·西山经》", url: "https://zh.wikisource.org/wiki/山海經/西山經", note: "西次三经阴山条：状如狸而白首，其音如榴榴，可以御凶。附近水道南流注于蕃泽，多文贝。狸不指定为某一种现代物种；白头据正文，身体灰褐为艺术选择。不混入吞月黑犬或日本天狗形象，也不将此阴山硬定位于现代山脉。" }
    ]
  }
];

export const additionalLandStories = {
  yinglong: {
    kind: "source-reading",
    titleZh: "一条龙和一场雨",
    titleEn: "The Dragon and the Rain",
    zh: [
      "应龙和雨之间，藏着怎样的故事？《山海经》说，黄帝和蚩尤交战时，应龙帮助黄帝，积蓄了大水。蚩尤请来风伯和雨师，刮起大风，下起大雨。后来黄帝派女魃到来，雨才停住。这场神话里的较量，连风和雨都加入了。",
      "战斗以后，应龙去了南方。书里把南方的雨水多，和这条龙住在那里联系起来。另一篇还说，应龙没能回到天上，地上便常常遇到干旱。遇到旱天，人们做出应龙的样子，盼着大雨到来。",
      "它的翅膀也有来历。古代学者郭璞读到应龙时，特地解释：这是一种有翅膀的龙。于是，长长的龙身、一对展开的翅膀，还有人们等待的雨水，便连在了一起。"
    ],
    en: [
      "What does a dragon have to do with rain? In the Classic of Mountains and Seas, Yinglong gathers water to help the Yellow Emperor in a battle. The other side calls on the spirits of wind and rain. A storm breaks out, and the rain keeps falling until the emperor sends a powerful woman who can stop it. Even the weather takes sides in this tale.",
      "After the fighting, Yinglong settles in the south. The book connects the dragon's new home with the south's rainy weather. Another passage says the dragon cannot return to the sky, and dry spells follow. When rain fails to come, people make a figure of Yinglong, hoping the rain will return.",
      "And those wings? An ancient scholar named Guo Pu explained that Yinglong was a dragon with wings. That gives us a wonderful picture: a long dragon body, a pair of wings, and a whole story about the rain people were waiting for."
    ]
  },
  qiongqi: {
    kind: "source-reading",
    titleZh: "老虎背上的翅膀",
    titleEn: "A Tiger with Wings",
    zh: [
      "老虎的背上，竟然还有一对翅膀。这样的奇兽叫穷奇。《山海经》的《海内北经》把它放在蜪犬的北边：沿着书里的方向往前找，就从一种奇兽走到了另一种奇兽。穷奇虽然长得威风，书里却提醒我们，它十分危险。",
      "有趣的是，翻到《西山经》，又能找到一个同样叫穷奇的动物。那里写的是邽山，它的模样像牛，身上的毛却像刺猬的刺。一个名字，竟然带着两幅不同的面孔：一边是有翼的老虎，一边是长着硬毛的牛。",
      "声音也藏着一个意外。《西山经》的穷奇，叫起来像狗在吼叫。眼睛看到的是牛，身上披着的是刺猬般的毛，耳朵听到的却是狗叫。几种熟悉的动物，就这样凑成了一种陌生的奇兽。"
    ],
    en: [
      "A tiger is impressive enough. Give it wings, and you have Qiongqi. One part of the Classic of Mountains and Seas describes this winged, tiger-like creature and places it north of another strange animal, the Tao Dog. Following the book's directions takes you from one creature to the next. This one is dangerous, so its beautiful wings are best admired from a distance.",
      "Turn to a different chapter, and Qiongqi looks surprisingly different. Now it lives on Gui Mountain and has the shape of an ox. Instead of an ox's smooth coat, it wears stiff hair like a hedgehog's spines. The same name comes with two very different pictures.",
      "The ox-like version has one more surprise: its call sounds like a dog barking. An ox's shape, a hedgehog's prickly coat, and a dog's voice all belong to one creature. Even before it moves, there is plenty to puzzle over."
    ]
  },
  zouwu: {
    kind: "source-reading",
    titleZh: "尾巴比身体还长",
    titleEn: "A Tail Longer Than Its Body",
    zh: [
      "驺吾最让人难忘的，也许就是尾巴。它已经和老虎差不多大，尾巴却比身体还长！《山海经》说，林氏国有这种珍奇的动物，身上五彩俱全。先看满身的颜色，再顺着身体找到尾巴，眼睛还要接着往后看很远。",
      "它的奇妙还不止这条长尾巴。书里还说，骑上驺吾，一天就能走千里。“里”是古人量路程的单位，“千里”在这里让我们想到一段非常遥远的路。这样一匹神奇的坐骑，能把漫长的旅程缩进一天里。",
      "书里把驺吾叫作“珍兽”，一种珍奇的动物。它那满身的颜色和格外长的尾巴，让人很容易记住它；“日行千里”又让它成了神话里的好坐骑。"
    ],
    en: [
      "Zouwu has a tail that seems to go on and on. The creature is already as big as a tiger, yet its tail is even longer than its body. The Classic of Mountains and Seas places it in a land called Linshi and gives it a coat filled with color. There is a lot to take in before your eyes even reach the tip of that tail.",
      "But its most remarkable gift is speed. The book says someone riding Zouwu could travel a thousand li in a single day. A li is an old Chinese measure of distance. Here, a thousand of them makes the journey sound enormous: a faraway destination could be just one day's ride away.",
      "That is what makes this creature such a memorable traveler. Its bright colors and extra-long tail would make it easy to recognize, while its legendary speed could carry a rider across a vast stretch of the world."
    ]
  },
  tiangou: {
    kind: "source-reading",
    titleZh: "名字叫狗，模样像狸",
    titleEn: "A Dog's Name, a Cat's Shape",
    zh: [
      "听见“天狗”这个名字，你会想到一只什么样的狗？翻开《山海经》，答案却有点出乎意料：它的模样像狸，脑袋是白色的。狸是一种猫模样的动物。只凭名字来找天狗，说不定会从它身边走过去，还以为自己看到的是一只野猫。",
      "它住在阴山。书里沿着山路一站一站往前写，到这里，还记下了从山里流出的水。河水向南，流进一处大泽，水中有带花纹的贝壳。天狗的白脑袋，就属于这片有山也有水的神话天地。",
      "它的叫声在这里被写成“榴榴”。书里还给了天狗一份特别的本领：抵挡凶险。这个长得像狸、名字却带着“狗”的动物，在古人的想象里，能把不好的事情挡在外面。"
    ],
    en: [
      "The name Tiangou means Heavenly Dog, so you might start looking for a dog. But the Classic of Mountains and Seas gives this creature a cat-like shape and a white head. The animal used for comparison is a li, a wildcat-like animal. That white face is a much better clue than the name if you are trying to spot it on the map.",
      "Its home is Yin Mountain. As the book leads us there, it follows water flowing out of the mountain and south toward a lake. Patterned shells lie in the water nearby. Mountains, waterways, and curious animals all share the same pages.",
      "The book writes its call here as 'liu-liu.' And this creature has a special role: it is said to keep danger away. This familiar-looking animal has been given an extraordinary job."
    ]
  }
};
