# Culture Story Two-Level Catalog Mapping

Status: proposed information architecture and card copy; no page routes or landing-page code have been changed.

## Scope and source of truth

- The current Culture landing page has **16** category entrances, not 15.
- There are **111 unique published stories** with a `culture/content/<category>/<slug>/page.md` source.
- The 117 story links found on the landing page include six repeated flagship links; those repeats are not separate stories.
- Every story below appears once. The identifier in the first column is its current source location and gives the old category as well as the slug.
- The proposed structure has **8 top-level catalogs** and **32 subcatalogs**.
- The English description is deliberately short, concrete, child-friendly story-card copy. It tells a child what the story is actually about instead of repeating the title.

## Proposed top-level catalogs

| Order | Top-level catalog | ID | Stories | Subcatalogs |
|---:|---|---|---:|---:|
| 1 | 故事与传说 · Stories & Legends | `stories-legends` | 17 | 4 |
| 2 | 人物与历史 · People & History | `people-history` | 19 | 4 |
| 3 | 节日与日常生活 · Festivals & Everyday Life | `festivals-everyday` | 15 | 4 |
| 4 | 艺术与文学 · Arts & Literature | `arts-literature` | 19 | 5 |
| 5 | 美食与服饰 · Food & Clothing | `food-clothing` | 10 | 4 |
| 6 | 山河与建筑 · Places & Buildings | `places-buildings` | 12 | 4 |
| 7 | 科技、发明与贸易 · Science, Inventions & Trade | `science-inventions-trade` | 10 | 4 |
| 8 | 思想与信仰 · Ideas & Beliefs | `ideas-beliefs` | 9 | 3 |
|  | **Total** |  | **111** | **32** |

The order begins with narrative and familiar everyday subjects, then moves toward places, systems, and abstract ideas. Philosophy stays last, matching the existing editorial principle that the most abstract material should not be the first doorway for a child.

## How the current catalogs roll up

| Proposed top-level catalog | Current catalogs and article-level moves |
|---|---|
| Stories & Legends | All 17 `folk-tales` stories |
| People & History | All 6 `figures`, all 8 `politics`, 4 of 5 `military`, plus `inventions/guan-yu-blade` |
| Festivals & Everyday Life | All 6 `folk-customs` plus 9 of 10 `culture` stories |
| Arts & Literature | All 10 `art`, all 8 `literature`, plus `culture/chinese-characters` |
| Food & Clothing | All 5 `food` plus all 5 `clothing` stories |
| Places & Buildings | All 5 `geography`, all 6 `architecture`, plus `military/great-wall` |
| Science, Inventions & Trade | All 4 `economy` plus 6 of 7 `inventions` stories |
| Ideas & Beliefs | All 4 `philosophy` plus all 5 `religion` stories |

## Full article mapping and story-card copy

### 1. 故事与传说 · Stories & Legends (`stories-legends`) — 17 stories

#### 1.1 神话与传奇 · Myths & Great Legends (`myths-great-legends`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-tales/chang-e-moon` | 嫦娥奔月 · *Chang'e Flies to the Moon* | Chang'e drinks a magic potion, escapes a greedy man, and becomes the lonely lady children look for on the moon. |
| `folk-tales/qixi-cowherd-weaver-girl` | 牛郎织女 · *The Cowherd and the Weaver Girl* | Two lovers separated by the Milky Way meet once a year on a bridge built by magpies. |
| `folk-tales/white-snake` | 白蛇传 · *The Legend of the White Snake* | A white snake spirit becomes a woman, falls in love, and fights to return to her family. |

#### 1.2 坚持与学习 · Keep Trying & Keep Learning (`trying-learning`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-tales/yu-gong` | 愚公移山 · *Yu Gong Moves the Mountains* | An old man keeps digging at two enormous mountains until his determination makes the impossible possible. |
| `folk-tales/grind-an-iron-rod-into-a-needle` | 铁杵磨成针 · *Grind an Iron Rod into a Needle* | Young Li Bai learns that steady effort can turn even an iron bar into a tiny needle. |
| `folk-tales/borrow-a-little-light-and-keep-learning` | 凿壁偷光 · *Borrow a Little Light and Keep Learning* | A poor boy makes a tiny hole in his wall so he can study by his neighbor's lamplight. |

#### 1.3 糊涂与矛盾 · Silly Mistakes & Contradictions (`mistakes-contradictions`) — 6

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-tales/heading-north-to-go-south` | 南辕北辙 · *Heading North to Go South* | A traveler insists he can reach the south even while his carriage keeps racing north. |
| `folk-tales/marking-the-boat-to-find-a-lost-sword` | 刻舟求剑 · *Marking the Boat to Find a Lost Sword* | A man marks a moving boat instead of the river spot where his sword actually fell. |
| `folk-tales/the-spear-and-the-shield` | 自相矛盾 · *The Spear and the Shield* | A seller's “unbreakable” shield meets his “unstoppable” spear, and his boast falls apart. |
| `folk-tales/covering-ears-to-steal-a-bell` | 掩耳盗铃 · *The Man Who Covered His Ears to Steal a Bell* | A thief covers his own ears and foolishly thinks no one else can hear the stolen bell. |
| `folk-tales/drawing-legs-on-a-snake` | 画蛇添足 · *Drawing Legs on a Snake* | A man finishes first but loses his prize by adding legs to a snake that needed none. |
| `folk-tales/the-man-who-pretended-to-play` | 滥竽充数 · *The Man Who Pretended to Play* | A man hides in a big orchestra until a solo performance reveals that he cannot play. |

#### 1.4 计谋、运气与惊喜 · Clever Plans, Luck & Surprises (`plans-luck-surprises`) — 5

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-tales/the-fox-who-borrowed-the-tigers-power` | 狐假虎威 · *The Fox Who Borrowed the Tiger’s Power* | A clever fox walks before a tiger and pretends the frightened animals are afraid of him. |
| `folk-tales/the-fisherman-who-wasnt-fishing-for-fish` | 愿者上钩 · *The Willing One Takes the Hook* | A patient fisherman uses a straight hook because he is waiting for the right leader, not a fish. |
| `folk-tales/the-old-man-who-lost-his-horse` | 塞翁失马 · *The Old Man Who Lost His Horse* | A lost horse brings one surprise after another, showing that luck can change its face. |
| `folk-tales/make-noise-here-move-there` | 声东击西 · *Make Noise Here, Move There* | A clever commander draws attention to one place while quietly making his real move somewhere else. |
| `folk-tales/add-the-eyes-and-the-whole-thing-comes-alive` | 画龙点睛 · *Add the Eyes, and the Whole Thing Comes Alive* | A painter adds the final eyes to his dragons—and they burst from the wall and fly away. |

### 2. 人物与历史 · People & History (`people-history`) — 19 stories

#### 2.1 不平凡的人生 · Remarkable Lives (`remarkable-lives`) — 6

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `figures/mulan` | 木兰的勇敢旅程 · *Mulan's Brave Journey* | Mulan takes her father's place in the army, proves her courage, and chooses home over a palace reward. |
| `figures/cao-cao` | 曹操：带兵的诗人 · *Cao Cao: The Commander with a Poet's Brush* | Cao Cao leads armies, restores farms, and writes poems while China is divided by war. |
| `figures/li-bai` | 李白：诗仙 · *Li Bai: The Poet Immortal* | Li Bai turns moonlight, waterfalls, friendship, and homesickness into poems remembered for more than a thousand years. |
| `figures/li-shi-zhen` | 李时珍和那本写了二十七年的大书 · *Li Shizhen and the Book That Took Twenty-Seven Years* | Li Shizhen spends twenty-seven years checking medicines and building a giant book to help future doctors. |
| `figures/luban` | 鲁班和长着小齿的草叶 · *Lu Ban and the Leaf with Tiny Teeth* | A toothed leaf inspires Lu Ban as he becomes the legendary teacher of Chinese builders and craftspeople. |
| `figures/zheng-he` | 郑和与七次远航 · *Zheng He and the Seven Great Voyages* | Zheng He commands huge fleets across the Indian Ocean and brings travelers, gifts, and ideas between distant ports. |

#### 2.2 皇帝、领袖与改革者 · Emperors, Leaders & Reformers (`emperors-leaders-reformers`) — 5

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `politics/emperor-day` | 朱元璋为什么成了一个特别忙的皇帝？ · *Why Did Zhu Yuanzhang Become Such a Busy Emperor?* | Zhu Yuanzhang removes his chief minister and discovers that running every part of an empire creates endless work. |
| `politics/qin-shi-huang` | 秦始皇：想让所有规则都一样的皇帝 · *Qin Shi Huang: The Emperor Who Wanted Everything to Match* | China's first emperor unites rules, writing, money, and measurements, but his giant projects demand a terrible cost. |
| `politics/shang-yang` | 商鞅和那根没人敢搬的木头 · *Shang Yang and the Log No One Wanted to Move* | Shang Yang uses a strange log-moving challenge to earn trust before bringing strict new laws to Qin. |
| `politics/wu-zetian` | 武则天：从宫中少女到皇帝 · *Wu Zetian: The Girl Who Became Emperor* | Wu Zetian rises from a palace teenager to become the only woman in Chinese history to claim the title of emperor. |
| `politics/yu-the-great` | 大禹治水：给洪水找一条路 · *Yu the Great: Making a Path for the Water* | Yu controls a great flood by guiding the water through new paths, then becomes a legendary leader. |

#### 2.3 学校、考试与政府 · School, Exams & Government (`school-exams-government`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `politics/imperial-exam-history` | 科举考试：一张考卷能带你走多远？ · *The Imperial Examination: How Far Could a Test Take You?* | Follow a student through guarded exam cells and many test levels on the long road to a government job. |
| `politics/exam-content` | 科举到底考什么？ · *What Was on the Imperial Exam?* | See how China's great exams changed from poetry and classics to tightly controlled essays across different dynasties. |
| `politics/six-arts` | 六艺：为什么射箭、音乐和算术要一起学？ · *The Six Arts: Why Learn Archery, Music, and Math Together?* | Ancient students practiced manners, music, archery, chariot driving, writing, and math to train the whole person. |

#### 2.4 战争、谋略与铠甲 · War, Strategy & Armor (`war-strategy-armor`) — 5

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `military/art-of-war` | 《孙子兵法》：打仗以前，先看清楚 · *The Art of War: Look Before You Fight* | Sunzi shows why understanding people, places, timing, and changing plans matters before any battle begins. |
| `military/ancient-armor` | 一片一片，怎么变成一身铠甲？ · *Hundreds of Little Plates: How Ancient Chinese Armor Worked* | Hundreds of small leather or metal plates join together to protect a soldier while still letting him move. |
| `military/mingguang-armor` | 明光铠：为什么叫“明光”？ · *Mingguang Armor: Why Was It Called “Bright Light”?* | Shining round plates on a warrior's chest may explain why this famous armor was called “bright light.” |
| `military/warships` | 古代战船：当战场来到了水上 · *Ancient Warships: When the Battlefield Moved onto Water* | Ancient shipbuilders add steering, protected sections, and battle tools to make wooden ships ready for war. |
| `inventions/guan-yu-blade` | 关羽真的用过青龙偃月刀吗？ · *Did Guan Yu Really Use the Green Dragon Crescent Blade?* | Stories give Guan Yu a mighty crescent blade, but history suggests this famous weapon appeared much later. |

### 3. 节日与日常生活 · Festivals & Everyday Life (`festivals-everyday`) — 15 stories

#### 3.1 新年与灯火 · New Year & Lanterns (`new-year-lanterns`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-customs/chinese-new-year` | 过年：年兽的故事 · *Guo Nian: The Story of Nian* | Villagers use red cloth, bright fire, and loud sounds to frighten Nian and welcome a safe new year. |
| `folk-customs/lantern-festival` | 元宵节：长安灯火的传说 · *Lantern Festival: The Night Chang'an Glowed* | A clever plan fills Chang'an with lanterns and helps the city escape a frightening prediction. |
| `culture/new-year-greeting` | 给长辈拜年：双手抱拳的学问 · *Greeting Elders at New Year* | Learn how folded hands, kind wishes, and red envelopes turn a New Year greeting into family respect. |

#### 3.2 时节、团圆与纪念 · Seasons, Reunion & Remembrance (`seasons-remembrance`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `folk-customs/dragon-boat` | 端午节：赛龙舟与屈原 · *Dragon Boat Festival: Dragon Boats and Qu Yuan* | Drums, racing boats, rice dumplings, and the story of Qu Yuan come together at the Dragon Boat Festival. |
| `folk-customs/mid-autumn` | 中秋节：月亮里的故事 · *Mid-Autumn Festival: Stories in the Moon* | Families share mooncakes and look for a rabbit, a tree, and old stories in the full autumn moon. |
| `folk-customs/qingming` | 清明节：在春天思念祖先 · *Qingming Festival: Remembering Our Ancestors in Spring* | Families remember loved ones with flowers and tomb visits, then step outside to enjoy the returning spring. |

#### 3.3 家人、象征与祝福 · Family, Symbols & Good Wishes (`family-symbols-wishes`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `culture/family-titles` | 舅舅还是叔叔？中国人的亲戚地图 · *Which Uncle? A Chinese Family Map* | Chinese family words tell exactly how each aunt, uncle, and cousin is connected to you. |
| `culture/chinese-knot` | 红红的中国结，满满的祝福 · *Red Chinese Knots, Full of Good Wishes* | One red cord twists into a beautiful knot that can carry wishes for luck, safety, and happiness. |
| `culture/dragon-phoenix` | 龙和凤凰：中国最吉祥的伙伴 · *Dragon and Phoenix: China’s Luckiest Pair* | The dragon and phoenix grow from ancient symbols into a joyful pair for harmony, weddings, and good luck. |
| `folk-customs/chinese-zodiac` | 十二生肖 · *The Chinese Zodiac* | Twelve animals take turns naming the years, while an old race explains how their order was chosen. |

#### 3.4 游戏、棋类与运动 · Games, Boards & Sports (`games-boards-sports`) — 5

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `culture/cuju` | 蹴鞠：两千年前的踢球游戏 · *Cuju: A Ball Game from Two Thousand Years Ago* | Long before modern soccer, Chinese players kicked a ball through a high goal or kept it dancing in the air. |
| `culture/kung-fu` | 功夫：像风一样快，像山一样稳 · *Kung Fu: Fast Like Wind, Steady Like a Mountain* | Kung fu grows from patient practice, strong balance, careful control, and many different movement traditions. |
| `culture/mahjong` | 麻将：在小方牌以前，它竟然是纸牌 · *Mahjong: Before the Tiles, There Were Cards* | Mahjong grows from older card games into the clicking tile game families and friends know today. |
| `culture/polo` | 马球：唐朝人最爱的马上比赛 · *Polo: A Favorite Horseback Game in the Tang Dynasty* | Tang riders—including women and royal players—race on horseback to strike a ball across the field. |
| `culture/weiqi` | 围棋：黑白棋子里的一整个世界 · *Weiqi: A Whole World in Black and White* | Two players place simple black and white stones while imagining how the whole board may change. |

### 4. 艺术与文学 · Arts & Literature (`arts-literature`) — 19 stories

#### 4.1 汉字、书画与纸艺 · Characters, Painting & Paper Arts (`characters-painting-paper`) — 5

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `culture/chinese-characters` | 汉字是画出来的吗？ · *Were Chinese Characters Drawn Like Pictures?* | Some Chinese characters began as picture-like marks, then changed into a writing system able to express almost anything. |
| `art/calligraphy` | 同一个字，为什么能写得完全不同？ · *How Can the Same Character Look So Different?* | Brush, ink, movement, and writing style can give the same Chinese character a completely different personality. |
| `art/gongbi` | 工笔画是怎么把细节画出来的？ · *How Does Gongbi Painting Create So Much Detail?* | Gongbi artists build birds, flowers, and tiny details with careful outlines and patient layers of color. |
| `art/ink-wash` | 黑色的墨里，怎么藏得下一整段旅程？ · *How Can Black Ink Hold a Whole Journey?* | A handscroll uses black ink, empty space, and unfolding views to carry you through mountains and water. |
| `art/paper-cutting` | 一张纸里，藏着多少只蝴蝶？ · *How Many Butterflies Are Hiding in One Sheet of Paper?* | Folding and cutting one sheet of red paper reveals repeating pictures filled with wishes and meaning. |

#### 4.2 音乐、舞台与壁画 · Music, Stage & Murals (`music-stage-murals`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `art/bianzhong` | 一口钟，为什么能敲出两个音？ · *Why Can One Bell Play Two Notes?* | Strike different parts of an ancient oval bell and one bronze instrument can answer with two clear notes. |
| `art/erhu` | 没有指板，二胡怎样找到音？ · *How Does an Erhu Find Notes Without a Fingerboard?* | An erhu player presses two strings in midair while a bow fixed between them makes the music sing. |
| `art/peking-opera` | 京剧：台上没有马，为什么你却看见了马？ · *Peking Opera: There Is No Horse on Stage—So Why Can You See One?* | Costumes, painted faces, music, and a few precise movements help your imagination build an entire world onstage. |
| `art/dunhuang` | 一面墙是一千年前的照片吗？ · *Is a Wall a Photograph from 1,000 Years Ago?* | Dunhuang's cave murals mix Buddhist stories with clues about the clothes, work, and travel of people long ago. |

#### 4.3 泥土与古代艺术宝藏 · Clay & Ancient Art Treasures (`clay-ancient-treasures`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `art/porcelain` | 泥土怎样变成会“唱歌”的碗？ · *How Does Clay Become a Bowl That Can Sing?* | Special clay, fierce kiln heat, and blue decoration turn earth into thin, ringing porcelain loved around the world. |
| `art/terracotta-warriors` | 兵马俑：八千张脸，八千幅肖像吗？ · *Terracotta Warriors: Are 8,000 Faces 8,000 Portraits?* | Craftspeople combine molded parts, hand-shaped details, and bright paint to create a huge army of different-looking clay soldiers. |

#### 4.4 诗歌与想象世界 · Poetry & Imagined Worlds (`poetry-imagined-worlds`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `literature/quiet-night-thought` | 静夜思：很多小孩都会念 · *Quiet Night Thought: A Poem Many Children Know* | In just twenty Chinese characters, Li Bai sees moonlight, looks up, and suddenly misses home. |
| `literature/tang-poems` | 唐诗：读一首诗，看见一幅画 · *Tang Poems: Read a Poem, See a Picture* | Four Tang poems turn a few carefully chosen words into snowy rivers, moonlit roofs, and unforgettable pictures. |
| `literature/song-ci` | 宋词：给曲子配上新词 · *Song Ci: New Words for a Tune* | Song poets fit fresh words to familiar tunes, making moonlit longing and joyful boat rides sing. |
| `literature/shan-hai-jing` | 《山海经》：山的那边住着什么？ · *Shan Hai Jing: What Lives Beyond the Next Mountain?* | An ancient book guides readers across strange mountains filled with singing beasts, magical birds, and nine-tailed foxes. |

#### 4.5 四大名著 · The Four Great Novels (`four-great-novels`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `literature/journey-to-west` | 《西游记》：美猴王的冒险 · *Journey to the West: The Adventures of the Monkey King* | A stone-born Monkey King learns humility while protecting a monk on a dangerous journey for Buddhist scriptures. |
| `literature/three-kingdoms` | 《三国演义》：三个国家斗智斗勇 · *Romance of the Three Kingdoms: Three States, Many Heroes* | Warriors, leaders, and brilliant planners use loyalty and clever ideas while three states struggle for China. |
| `literature/water-margin` | 《水浒传》：梁山好汉的故事 · *Water Margin: Heroes of Mount Liang* | People pushed outside the law gather at Mount Liang, fight unfairness, and face a difficult choice about serving the emperor. |
| `literature/dream-red-chamber` | 《红楼梦》：大观园里的世界 · *Dream of the Red Chamber: A World Inside Grand View Garden* | Baoyu, Daiyu, and Baochai grow up inside a magnificent garden as their wealthy family slowly falls apart. |

### 5. 美食与服饰 · Food & Clothing (`food-clothing`) — 10 stories

#### 5.1 食物与味道 · Foods & Flavors (`foods-flavors`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `food/chinese-cuisine` | 中国菜是什么味道？ · *What Does Chinese Food Taste Like?* | Travel through China's many regional kitchens, where weather, crops, coastlines, and family recipes make every table different. |
| `food/flavors` | 食物为什么有这么多味道？ · *Why Does Food Have So Many Flavors?* | Taste, smell, texture, heat, and ingredients work together to make foods sweet, sour, bitter, spicy, fresh, or savory. |
| `food/dumplings` | 饺子的故事 · *The Story of Dumplings* | Folded dumplings carry warm fillings, family teamwork, old healing stories, and sometimes a lucky surprise. |

#### 5.2 茶与餐桌 · Tea & the Table (`tea-table`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `food/tea` | 从茶树到茶杯：中国茶的故事 · *From Leaf to Cup: The Story of Chinese Tea* | Follow tea leaves from mountain gardens through rolling and heating until green or black tea reaches a cup. |
| `food/chopsticks` | 两根筷子，怎么夹得稳？ · *How Do Two Chopsticks Work Together?* | Keep one chopstick still and move the other to pick up everything from soft tofu to a tiny peanut. |

#### 5.3 传统服装与身份 · Traditional Clothes & Rank (`traditional-clothes-rank`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `clothing/hanfu` | 汉服：布料、衣领和大袖子 · *Hanfu: Cloth, Collars, and Wide Sleeves* | Wrapped collars, belts, flowing skirts, and wide sleeves changed across the many centuries of hanfu. |
| `clothing/bufu` | 官服上的鸟和猛兽 · *Birds and Beasts on Official Robes* | Embroidered birds and beasts on square badges helped people recognize an official's job and rank. |
| `clothing/imperial-robes` | 皇帝为什么穿黄色？ · *Why Did Chinese Emperors Wear Yellow?* | Yellow silk, dragons, mountains, and stars turned an emperor's robe into a picture of power and the universe. |

#### 5.4 唐代时尚 · Tang Fashion (`tang-fashion`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `clothing/tang-men-headwear` | 唐朝男子为什么要戴幞头？ · *Why Did Men in Tang China Wear Futou?* | Tang men wrap and shape cloth into futou for work, travel, ceremonies, and many different social roles. |
| `clothing/tang-women-hair` | 唐朝为什么有这么多时尚？ · *Why Did Tang China Have So Many Fashions?* | Tang women experiment with towering hair, forehead flowers, bold clothing, and simpler everyday styles. |

### 6. 山河与建筑 · Places & Buildings (`places-buildings`) — 12 stories

#### 6.1 江河、群山与风景 · Rivers, Mountains & Scenic Places (`rivers-mountains-scenery`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `geography/guilin` | 桂林：坐船走进一幅山水画 · *Guilin: A Boat Ride into a Landscape Painting* | A boat on the Li River winds past tower-shaped limestone peaks, hidden caves, and views that change around every bend. |
| `geography/highest-mountains` | 珠穆朗玛峰：怎样量出世界最高峰？ · *Mount Everest: How Do You Measure the World's Highest Mountain?* | Surveyors use angles, satellites, and careful definitions to measure a summit made from rocks once under the sea. |
| `geography/yangtze-yellow-river` | 长江和黄河：两条河为什么不一样？ · *The Yangtze and Yellow Rivers: Why Are They So Different?* | Follow China's two great rivers from high mountains past yellow silt, deep gorges, farms, cities, and dams. |

#### 6.2 熊猫、农田与活的土地 · Pandas, Farms & Living Land (`pandas-farms-land`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `geography/panda-hometown` | 大熊猫的家乡 · *The Giant Panda's Homeland* | Giant pandas need misty mountain forests, plenty of bamboo, and safe paths connecting one habitat to another. |
| `geography/rice-terraces` | 梯田：1300年前，人们怎么把整座山变成现实版 Minecraft？ · *Rice Terraces: How Did People Turn a Mountain into Real-Life Minecraft 1,300 Years Ago?* | Farmers carve giant steps, guide water downhill, and raise rice and fish together on a living mountain. |

#### 6.3 宫殿与神圣建筑 · Palaces & Sacred Buildings (`palaces-sacred-buildings`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `architecture/forbidden-city` | 故宫：一座城里的皇宫 · *The Forbidden City: A Palace Inside a City* | China's emperors lived and ruled inside a vast walled palace of gates, courtyards, great halls, and hidden engineering. |
| `architecture/temple-of-heaven` | 天坛：皇帝为什么向天祈祷？ · *The Temple of Heaven: Why Did the Emperor Pray to Heaven?* | The emperor prepared carefully and prayed for good harvests among blue roofs, circles, echoes, and giant wooden columns. |
| `architecture/pagodas` | 宝塔为什么不是普通的高楼？ · *Why Isn't a Pagoda Just a Tall Building?* | Chinese pagodas grew from Buddhist monuments, and their many roofs can hide surprising spaces and clever wooden structures. |

#### 6.4 家园、园林与大工程 · Homes, Gardens & Great Engineering (`homes-gardens-engineering`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `architecture/suzhou-gardens` | 苏州园林：转个弯，又是一幅画 · *Suzhou Gardens: A New View Around Every Corner* | Curving paths, framed windows, rocks, water, and borrowed views make a small Suzhou garden feel like a changing world. |
| `architecture/tulou` | 土楼：一扇门后的许多家 · *Tulou: Many Homes Behind One Gate* | Thick earthen walls surround a shared courtyard where many families live, work, cook, and celebrate together. |
| `architecture/zhaozhou-bridge` | 赵州桥和神仙的毛驴 · *Zhaozhou Bridge and the Immortal's Donkey* | A funny donkey legend leads to the real secret of an elegant stone arch that has lasted fourteen centuries. |
| `military/great-wall` | 长城从来不只是一堵墙 · *The Great Wall Was Never Just One Wall* | Walls, towers, soldiers, gates, and signals worked together across different dynasties to guard and manage a vast frontier. |

### 7. 科技、发明与贸易 · Science, Inventions & Trade (`science-inventions-trade`) — 10 stories

#### 7.1 数字、时间与方向 · Numbers, Time & Direction (`numbers-time-direction`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `inventions/abacus` | 算盘：噼里啪啦的计算器 · *The Abacus: A Click-Clack Calculator* | Beads slide into place values so hands, eyes, and ears can work together to solve math quickly. |
| `inventions/compass` | 指南针为什么总朝着同一个方向？ · *Why Does a Compass Needle Keep Pointing the Same Way?* | A magnetized needle follows Earth's invisible magnetic pull and helps travelers find direction when landmarks disappear. |
| `inventions/solar-terms` | 二十四节气：跟着太阳过一年 · *The 24 Solar Terms: Following the Sun Through the Year* | Twenty-four seasonal markers follow the sun through the year and help people notice weather, crops, dew, and frost. |

#### 7.2 纸、火与飞行 · Paper, Fire & Flight (`paper-fire-flight`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `inventions/paper-making` | 纸是怎么从树皮变出来的？ · *How Did Tree Bark Become Paper?* | Bark, rags, and old nets are soaked, pounded, and dried into light sheets that make ideas easier to carry. |
| `inventions/gunpowder` | 火药的发明：从炼丹炉到烟花 · *Gunpowder: From Alchemy to Fireworks* | A dangerous mixture leaves the alchemist's furnace and becomes fire arrows, weapons, and brilliant fireworks. |
| `inventions/kites` | 会飞的彩虹：中国的风筝 · *Flying Rainbows: Chinese Kites* | Wood and bamboo flying machines become bright paper birds, butterflies, and singing dragons lifted by the wind. |

#### 7.3 钱币与市场 · Money & Markets (`money-markets`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `economy/ancient-money` | 古代的钱为什么有这么多样子？ · *Why Did Ancient Chinese Money Have So Many Shapes?* | Money changes from valuable shells and tool-shaped bronze to round coins with holes and the world's earliest paper money. |
| `economy/ancient-market` | 古代市场：从赶集日到夜市 · *Ancient Markets: From Market Day to Night Market* | Follow shoppers from country market days to walled city markets, lively night stalls, and before-dawn “ghost markets.” |

#### 7.4 丝路与文化交流 · Trade Roads & Shared Ideas (`trade-roads-shared-ideas`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `economy/silk-road` | 一匹中国丝绸，怎么走了那么远？ · *How Did Chinese Silk Travel So Far?* | Silk crosses deserts and mountains through many traders, while goods, stories, beliefs, and skills travel with it. |
| `economy/tang-cosmopolitan` | 唐代长安：远方的东西来到这里以后 · *Tang Chang'an: When New Ideas Came to Town* | In Tang Chang'an, visitors bring music, clothing, games, cups, and beliefs that become part of city life. |

### 8. 思想与信仰 · Ideas & Beliefs (`ideas-beliefs`) — 9 stories

#### 8.1 生活的大问题 · Big Ideas for Life (`big-ideas-life`) — 4

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `philosophy/confucius` | 孔子：一个可以问一辈子的问题 · *Confucius: One Question for a Lifetime* | Confucius asks us to imagine another person's place before doing something we would dislike ourselves. |
| `philosophy/laozi` | 老子的智慧：水为什么不一定要“赢”？ · *Laozi’s Wisdom: Why Does Water Never Need to Win?* | Water shows how softness, patience, and going around an obstacle can be another kind of strength. |
| `philosophy/seed-dao` | 大树也从很小的时候开始 · *A Great Tree Starts Small* | A tiny seed and a first step show why big things begin small and careful endings still matter. |
| `philosophy/yin-yang` | 阴和阳：同一座山的两边 · *Yin and Yang: Two Sides of One Mountain* | Sun and shade on one mountain show how different forces can depend on each other and keep changing. |

#### 8.2 佛教与寺院故事 · Buddhism & Temple Stories (`buddhism-temple-stories`) — 3

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `religion/buddhism-comes-to-china` | 佛教怎样来到中国？白马寺的传说 · *How Did Buddhism Come to China? The White Horse Story* | A dream, traveling monks, and a white horse introduce how Buddhism journeyed from India and took root in China. |
| `religion/maitreya-buddha` | 笑和尚和他的大布袋 · *The Smiling Monk and His Big Cloth Bag* | A cheerful wandering monk named Budai becomes linked with Maitreya and welcomes visitors near many temple doors. |
| `religion/shaolin-kung-fu` | 少林寺为什么会有功夫？ · *How Did Kung Fu Come to Shaolin Temple?* | Shaolin begins as a Buddhist temple, while monks, staff fighting, history, and movies build its martial-arts fame. |

#### 8.3 神仙与守护人物 · Immortals & Sacred Heroes (`immortals-sacred-heroes`) — 2

| Current article ID | Article title | Compact English story-card description |
|---|---|---|
| `religion/daoism` | 八仙是怎样过海的？ · *How Did the Eight Immortals Cross the Sea?* | Eight immortals use their own magical treasures to cross the sea in a story shaped by Daoist traditions. |
| `religion/lord-guan` | 关羽为什么成了关公？ · *How Did Guan Yu Become Lord Guan?* | Stories of Guan Yu's loyalty turn a historical warrior into Lord Guan, a protector honored in temples and shops. |

## Editorial and implementation notes

1. **Keep one primary home per story.** Cross-links and search tags can connect related stories, but the catalog should not duplicate a card in several subcatalogs.
2. **Treat the new catalog IDs as navigation metadata first.** Article routes do not need to change in the first implementation. Keeping current URLs avoids a large redirect and asset-migration project.
3. **Separate catalog identity from source folders.** For example, `inventions/guan-yu-blade` can appear under “War, Strategy & Armor” without immediately moving its files.
4. **Use the short English descriptions as card copy, not SEO summaries.** Each sentence favors a concrete action, image, discovery, or question a child can understand.
5. **Keep difficulty, format, and age as filters or badges, not additional catalog levels.** The two catalog levels should answer “What kind of story is this?”
6. **Recommended card hierarchy:** image → bilingual title → one-line English description → optional difficulty/time badge.
7. **Recommended mobile behavior:** show the eight top-level cards first; opening one reveals only its subcatalogs and stories instead of rendering all 111 stories in one long page.

## Borderline placements to revisit during design review

- `figures/mulan` stays under People & History because the article centers on Mulan's choices and life journey, even though her earliest source is a poem and the story has legendary elements.
- `military/great-wall` moves to Places & Buildings because the article explains a network of walls, towers, gates, and frontier systems more than a single battle.
- `inventions/guan-yu-blade` moves to War, Strategy & Armor because its central question is historical weapon attribution, not how a technology was invented.
- `culture/chinese-characters` moves to Arts & Literature because the article is about the development of writing; it sits beside calligraphy without being confused with calligraphy itself.
- `folk-customs/chinese-zodiac` moves to Family, Symbols & Good Wishes because it is a year-naming cultural system rather than a festival.
- `art/dunhuang` sits with Music, Stage & Murals because the story reads painted cave walls as visual storytelling; it can also receive secondary tags for Buddhism and the Silk Road.
