# Chinese Learning Website Notes

## Note 1

在“开口说中文”这个 page，**Book Words "你“ 没有发音**。

## Note 2

好多对话的停顿时间太长。语音开始以后，真正开始说话之前有一段空白；话说完以后也有一段空白。感觉每段语音前后都有比较明显的 overhead / dead air。

## Note 3

在 **Names and Introduction / 介绍自己** 这一页，比如“你叫什么名字”“我叫苏菲”。“我叫苏菲”本来应该连在一起说，但现在中间的停顿感非常强。

## Note 4

同样是 **Names and Introduction / 介绍自己** 这一页，基本上所有对话都 move 得非常慢。比如“你好”“你叫什么名字”“我叫乐乐”等。

这里每一个 card 本身都应该可以单独点击播放。只有 press green button 的时候，才把四个 card 连起来读。现在下面的 card 都不能单独点击播放。

## Note 5

在 **Names and Introduction → Build a Sentence** 里面，比如“我叫卢娜”“我叫诺亚”“我叫天天”“我叫思思”“我叫杰登”等，需要逐个检查语音。

现在好像是有些用了正确的声音，有些用了 System Default voice / 没有正确接上预期的 voice，并不是全部都没有声音。

另外，比如“我叫安安”，短短一句话中间停顿了两次，停顿不自然。

## Note 6

同一个 card 第一次点击和第二次点击的音量不一样。

比如“我叫思思”：第一次 press 的时候声音很轻，第二次 press 的时候才变成正常音量。这个好像是一个 bug。

## Note 7

在“我和我的家人”里面也有类似的问题。

“爸爸妈妈爱我”之后，“我爱爸爸”“我爱妈妈”之间的停顿非常长，而且“我爱爸爸”和“我爱妈妈”这两个 sentence 已经不能单独点击播放了。

另外，“这是我的家人”和“我家有六口人”之间的停顿也非常长。

## Note 8

在 **My Body / 我的身体** 里面，body-part highlight 的位置需要调整：

- **腿**：现在 highlight 中间的点偏到腿的内侧，需要往左移一些。

- **耳朵**：需要往脸的方向、往右稍微移一点。

- **脖子**：现在指的位置比较像下巴，需要往下移一些。

## Note 9

在 **My Body → Look and Choose** 这里，现在 picture 是 portrait mode，并且放在中间。

在 iPad 上基本上只能先看到 picture，下面的“手、眼睛、脖子、手臂”等选项需要不停 scroll / toggle up and down。

建议把 picture 放到整个屏幕的左边，把选项放到右边，这样就不用一直上下滚动。

## Note 10

也是 **My Body** 这一页。

像“手 / Hand”这种中英文，现在是上下 stack。其实有足够空间把中文和英文 **side by side** 放在同一行。这样两个字都可以稍微放大一点。

英文和中文的字体需要有 consistent 的视觉高度，不能英文看起来比中文小很多。

下面的 **Matching Game**：

- description 要 clean up 一下；

- “Chinese to English” 这句话不要；

- 可以用类似 “Tap a Chinese card, then tap the matching English card.”

- English 的字体现在看起来比 Chinese 小很多，两边应该是同样的视觉高度。

## Note 11

在 **Clothes / Clothing** lesson 里面，**T-shirt / T恤** 这个 card 的发音不对。

现在“T恤”发得很不自然。中文的“T恤”发音其实和英文 T-shirt 比较接近。这个需要重做。

## Note 12

在 **Clothes / Clothing** lesson 里面，“**短裤**”的 picture 出错了。

现在画的是一条牛仔长裤，不是短裤。

另外这里好像还有两个类似的 card，需要检查一下是不是有重复。

## Note 13

在 **Clothes / Clothing** lesson 里面，“**裤子**”和“**长裤**”用了同一个 picture，但是有两张不同的 card。

需要确认课本里面到底用的是“裤子”还是“长裤”，以及这两个是不是应该同时存在。

## Note 14

在 **Days of the Week** lesson 里面，“今天星期几”“星期一”等这些内容，也应该使用我们 **TTS generated audio**。

另外，这里也出现了同一张 card 第一次点击声音很轻、第二次点击才正常的问题。

## Note 15

在 **Matching Game** 刚完成之后，game 最下方又出现了一个 green arrow。

之前的规则是：**整个 game 只保留一个 green arrow，并且放在右上角。**

现在底部又出现一个 green arrow，违反了这个规则。

## Note 16

在 **Routine** 里面，12 个整点 clock 的图片现在不一致。

比如：

- 每个 clock 的颜色不一样；

- 有的 clock 甚至不完全是同样的圆；

- 1 点、2 点、3 点……12 个 clock 的形状都有一点差别；

- 时针和分针的长短不一致；

- 时针现在是红色，但是不同 clock 的红色、长度也不完全一样。

这一批 clock 可能需要重新做。可以考虑用 **SVG** 的方式 generate。

需要先定义一个统一的 **clock template**，然后 1–12 点都基于这个 template 生成。

## Note 17

同样在 **Routine** 这一页，“**几点了？现在七点。**”这句话应该使用标准的 **TTS generated voice**，而不是 System 自带的声音。

## Note 18

在 **Dates and Months** page，第一句话的文字和声音不匹配。

屏幕上写的是：

“**看日历可以知道几月几号。**”

但是声音只说：

“**几月几号。**”

需要让声音和页面上的句子一致。

## Note 19

在 **Dates and Months** page，“**一年有十二月**”这句话现在是 System Generated voice。

应该改成 **TTS Generated voice**。

## Note 20

在 **Dates and Months** page，“**九月开学了**”这句话说得不是特别清楚。

尤其“**九月**”听起来非常 soft，需要重新 generate。

## Note 21

在 **Listen and Choose** 这种配置里面：

先 listen，然后学生 choose。如果答对了，我觉得不需要把同一句话再重新念一遍。

现在答对以后又把句子重新播放一次，这个可以去掉。

## Note 22

在 **Dates and Months → Matching Game** 里面，Chinese 这边像“一月 + 拼音”现在是上下 stack。

我觉得中文和拼音应该放在 **same line / side by side**。

这样可以省垂直空间，整个 card / box 的 height 可以减少一点。

现在 Matching Game 基本上占满整个 iPad 屏幕，小朋友需要 scroll up and down 去找所有 pair。把中文和拼音放在同一行以后，希望整个 game 可以更紧凑一些。

## Note 23

在 **Description and Comparison → Many / Few** 这个 picture 下面，“**多少**”念得很不好。

现在“多少”已经几乎听不清楚了，需要重新 generate。

## Note 24

在 **Description and Comparison → Complete Sentence** 里面，这个 sentence 是 deterministic 的，并不是根据学生选择动态变化，它只有一个正确答案。

所以这里也可以直接使用 **TTS generated audio**。

## Note 25

在 **时间和日程 → Positions and Direction** 里面，比如点击 Inside and Outside 的 picture，“**书在书包里面**”。

第一次点击的时候，好像先听到了 System voice，然后又听到了 TTS generated voice。

第二次点击的时候，就只剩下 TTS voice。

可能是第一次 TTS audio 还没有立刻 ready / download，所以 System voice 先出来，然后 TTS 又接着播放。

这里需要处理一下：不要同一次点击出现两个声音。如果已经开始播放 System voice，就不应该再接着播放 TTS；或者应该等 TTS ready 再播放，不要先触发 System voice。

## Note 26

在 **Transportation** 这一页，“**地铁站**”的发音有颤音，听起来不对，需要重做。

## Note 27

在 **My Home** 这一页，“**书桌**”发音错了。

是“书桌”，不是“书卓”。“桌”是第一声，这个 audio 要重做。

## Note 28

在 **Request and Permission** page，**Choose Water** 下面：

- “**我可以喝可乐吗？**”这个 box 可以再宽一点。现在 sentence 被 wrap 了。

- “**不行，你可以喝水。**”这个 box 可以再 narrow 一点。

下面 **Book Words** 里面，“可以 / 不行”以及拼音的 alignment 需要检查。

这两个词应该 center align。现在中文和拼音看起来没有对齐，尤其“可以”的拼音有 misalignment。

## Note 29

在 **Request and Permission → Build a Sentence**：

比如“**我可以喝可乐吗？**”这一题，现在 iPad 上的 vertical space 不够。

可以：

- 把 picture 再缩小一点；

- 或者把 description “Look at the picture, then tap the word pieces in order” 和 picture 之间的 gap 再缩小一点；

- 或者两者都做一点。

现在一句话做完之后，为了看到下面的内容、trigger New Game，需要在 iPad 上上下 scroll。

目标是尽量让下面这些内容都能放在一个 iPad screen 里面：

- description

- picture

- word choices

- 最后显示的 correct sentence（例如“我可以喝可乐吗？”）

- New Game 的 green button

这样小朋友就不用为了完成一题和开始下一题不停上下滚动。

## 30. School Life → My Stationery → Let’s Practice：TTS narration

- 例子：图片是一把橙色的剪刀，用户根据 picture 来 build sentence。

- 因为答案是根据图片确定的，属于 deterministic sentence。

- 目前完成句子后播放的是系统声音。

- 修改：改成 TTS-generated narrative / audio，不要使用 system voice。

## 31. School Life → My Stationery → Build the Sentence：节省 vertical space（global change）

- Prompt 例如：

  - “This is my book”

  - “这是我的书”

- 修改：英文和中文改成 side by side 显示，减少 vertical space。

- Build the Sentence 下面的 description，例如：

  - “Tap the word cards in the right order. Some cards do not belong.”

- 修改：description 的 font size 调小。

- 这个 description font size 的修改要 affect all pages，保持 consistency。

- Game name / section title，例如：

  - “Match the Picture”

  - “Build the Sentence”

- 这些 game name 的字体也可以再小一点，帮助节省 vertical space。

- Game name 的修改也要 affect all pages。

## 32. School Life → My Stationery → Build the Sentence：答案音频改成 TTS

- 同一个 page、同一个 Build the Sentence。

- 例如答案是“有剪刀”这类根据 picture 来 build 的 sentence。

- 和 Match the Picture 一样，因为是看图说话，答案是 deterministic。

- 修改：答案对应的声音改成 TTS-generated audio / narrative，不要使用 system voice。

## 33. School Life → Stationery and Backpack：词语发音问题

- **尺子**

  - “子”目前听起来太重。

  - 正确应该是轻声。

- **练习本**

  - 目前发音太轻，需要更清楚一些。

- **文具盒**

  - 目前像把“文 / 具 / 盒”逐字分开念。

  - “文具盒”应该作为一个完整的词，连贯、自然地读。

- **书包**

  - 这个 card 目前没有声音，需要补上 audio / TTS。

## 34. School Life → Stationery and Backpack → Build a Sentence：使用 TTS-generated audio

- 这是一个看图说话 / 根据图片 build sentence 的练习。

- 因为答案由图片决定，属于 deterministic。

- 修改：答案音频使用 TTS-generated audio，不要使用 system voice。

## 35. School Life → Classroom：「电视」图片需要更换

- “电视”现在的 image 基本看起来像一个黑色 block。

- 从图片上看不出来这是电视。

- 修改：重新 generate / 更换一张新的“电视” image，让电视的形状和特征更明显。

## 36. School Life → Classroom → Make a Sentence：拼接 TTS audio，减少 system voice

- 目前可选择的 sentence structure 比较有限，例如：

  - “教室里有……”

  - “教室里有很多……”

  - “桌子上有……”

- 可以把这些固定 sentence opening 提前录好 / 用 TTS generate 好 audio。

- 下面用户选择的 single word，也使用 TTS-generated audio。

- 希望把固定 sentence opening audio + 用户选择的 word audio 拼起来，形成完整 sentence。

- 目标：尽量减少 system / machine voice 的使用。

## 37. School Life → Our School：TTS 发音问题

- **“学校有教室”**

  - 目前五个字之间有明显停顿。

  - 需要重新 TTS generate，让整句话自然、连续地读出来。

- **Book Words → “音乐教室”**

  - 目前读得太轻，不够 confident。

  - 重新生成 TTS，让发音更清楚、更有力度。

## 38. School Life → Our School → Build a Sentence：使用 TTS-generated audio

- 例如 sentence：“学校有操场”。

- 因为这是根据题目 / 图片确定的，属于 deterministic sentence。

- 修改：完整 sentence narrative 使用 TTS-generated audio，不要使用 system voice。

## 39. School Life → School Subject → Review Session 2 / 3 / 4：title 没有体现 verb 区别

- Review Session 2、3、4 的 title 目前都一样。

- 但三张图强调的是不同的 verb / sentence pattern：

  - “我去上……课”

  - “我在……”

  - “我喜欢……”

- 修改：title 应该体现它们各自强调的 verb / sentence pattern。

## 40. School Life → School Subject → Build the Sentence：使用 TTS-generated audio

- 例如：“你喜欢什么课？”

- 这些 sentence 是 deterministic 的。

- 修改：使用 TTS-generated audio，不要使用 system voice。

## 41. Food and Drink → Book Words：音频问题

- **梨**

  - 点击后前面有一段较长的静音，不是立刻开始发音。

  - 去掉音频开头多余的 silence，让 click 后马上开始播放。

- **西兰花**

  - 目前发音很差。

  - 正确声调：西（第一声）＋兰（第二声）＋花（第一声）。

  - 最主要的问题是中间的“兰”。

  - “兰”要发得完整、准确；现在像“兰”还没结束就开始进入“花”。

  - 重新生成 TTS，让“兰”完整结束后再自然进入“花”。

- **披萨**

  - 开头的 P 音有破音 / 爆音。

  - 重新生成 TTS，避免开头破音，让整体更干净、自然。

## 42. Food and Drink → Build a Sentence：不要引入量词复杂度，统一表达习惯

- 原本考虑把：

  - “我吃苹果”

  - “我吃香蕉”

  - “我吃胡萝卜”

  改成带量词的句子，例如“我吃了一个苹果”“我吃了一根香蕉”等。

- 最终决定：**不要引入量词和过去时这一层 complexity**。

- 这一页统一理解为表达一种习惯 / 一般行为，而不是“刚刚吃了一个具体的东西”。

- 中文可以继续保持简单形式，例如：

  - 我吃苹果。

  - 我吃香蕉。

  - 我吃胡萝卜。

  - 我喝果汁。

  - 我喝可乐。

- 重点修改英文翻译，让英文也表达习惯：

  - I eat apples.

  - I eat bananas.

  - I eat carrots.

  - I drink juice.

  - I drink Coke.

- 因此不需要增加“一个 / 一根 / 一块 / 一杯”等量词，也不需要修改 Build a Sentence 的 word choices 来加入这些量词。

- 核心原则：这一页保持语言结构简单，中英文都表达 general habit / general action。

## 43. Food and Drink → Food Preference → Make a Sentence：system voice 优先，TTS 拼接作为 fallback

- 例如 sentence：“弟弟不想吃梨。”

- 句子由三个部分组成：

  - Subject：我、爸爸、妈妈、姐姐、妹妹、弟弟……

  - Verb / preference phrase：喜欢吃、不喜欢吃、喜欢喝、不喜欢喝、想吃、不想吃、要吃、不要吃……

  - Food / drink：梨、薯条、炒面等。

- 对这个 exercise，default 优先使用 browser / system generated voice，例如 Safari 一次性生成完整句子。

- 原因：完整句子一次性读出来通常比三个 TTS clips 拼接更自然。

- Fallback：

  - 如果 system voice unavailable / 无法正常播放，再使用提前生成好的三段 TTS audio：

    - Subject audio

    - Verb phrase audio

    - Food / drink audio

  - 再把三段拼成完整 sentence。

- TTS 三段拼接是 backup solution，不是 default。

## 44. Food → Meals and Feeling：句子 TTS + wording 问题

- Sentence：“我午饭喝了牛奶，吃了披萨。”

- 目前整句话读得很不自然，也不清楚。

- 最主要的问题是“午饭”这个词发音不准确。

- 修改：

  - 把“午饭”发准确、发清楚。

  - “午饭”之后可以略有一点自然停顿。

  - 然后继续读“喝了牛奶，吃了披萨”。

  - 整句话重新 TTS generate。

- 下面出现了“披萨饼”。

- 其他课里已经使用过“披萨”。

- 修改：这里统一改成“披萨”，不要用“披萨饼”。

- “披萨”可以在不同 lesson 里重复出现，保持 wording consistency。

## 45. Food → Meals and Feeling → 饿了 / 渴了 tab：「炒饭」第一次播放声音过轻

- 第一次 tap 时，“炒饭”的发音特别轻。

- 第二次 tap 才恢复正常音量。

- 修改：确保第一次点击就以正常音量、清楚地播放“炒饭”。

## 46. Food → Meals and Feeling → “好吃 / 饱”：检查是否仍在使用 machine voice

- 检查“好吃”“饱”现在是否仍使用 machine / system-generated voice。

- 如果是，可能还没有正确 link 到已有的 TTS audio。

- 修改：确认并优先连接对应的 TTS-generated audio。

## 47. Food → Meals and Feeling → Matching Game：deterministic sentence 统一使用 TTS-generated audio

- 目前声音不一致：

  - “没有可乐”使用 TTS-generated audio。

  - “你可以喝水”使用 system-generated voice。

- 这些句子都是 deterministic。

- 修改：确保 Matching Game 里的每一句 deterministic sentence 都有对应的 TTS-generated audio，不要混用 system voice。

## 48. Food → Meals and Feeling：音量与 reply TTS 检查

- **“我渴了”**

  - 第一次播放声音非常小。

  - 第二次才恢复正常音量。

  - 修改：确保第一次 tap 就正常播放。

- 检查这一页里 reply / response 的句子：

  - 感觉不少 reply 可能还不是 TTS-generated audio。

  - 检查哪些 reply 仍在使用 system / machine voice。

  - 对可以提前确定的 reply，尽量统一使用 TTS-generated audio。

## 49. Nature and Colors → Nature → Book Words：“花”没有声音

- 点击“花”的 Book Words / bookmark 后没有声音。

- 修改：补上并正确 link “花”的 audio / TTS。

## 50. Nature and Colors → Nature → Look and Complete：Skip button behavior + deterministic TTS

- **Bug 1：green button behavior 不对**

  - green button 本来应该允许用户 skip 当前题目。

  - 现在用户还没填空、没选择答案时直接按 green button，会自动读出某个词，例如“星星”。

  - 这不是想要的 behavior。

  - 修改：green button 应该直接跳到下一道新题，让用户能够 shuffle through different questions，而不是自动播放 / 提示当前答案。

- **Bug 2：完整句子可以提前生成 TTS**

  - 例如 visual cue 对应“晚上有星星。”

  - 因为答案由图片决定，是 deterministic sentence。

  - 修改：这类完整句子提前生成 TTS audio，完成题目后播放对应完整 sentence。

## 51. Nature and Colors → Weather：句子简化 + 重新生成 TTS

- 原句类似：“诺亚戴帽子、围巾和手套，穿外套和长裤。”

- 问题：句子太长，“长裤”在这里不必要。

- 修改为：

  - **“诺亚穿外套，戴帽子、围巾和手套。”**

- 句子简化后，对应 TTS audio 也需要重新 generate。

- 确保新句子发音自然、清楚、连贯。

## 52. Nature and Colors → Weather：deterministic prompt 改用 TTS-generated audio

- 例如：“下雨了，带什么？”

- 目前这些 prompt 还在使用 machine / system voice。

- 这些句子是 deterministic 的。

- 修改：统一改成 TTS-generated audio。

## 53. Nature and Colors → Weather → Finish the Sentence：使用 TTS-generated audio

- 这些句子也是 very deterministic。

- 修改：对应完整句子统一使用 TTS-generated audio。

- 尽量不要使用 system / machine voice。

## 54. Pets → Build a Sentence：四个 deterministic sentence 改用 TTS

- 一共只有四句话：

  - 我喜欢狗。

  - 我喜欢猫。

  - 我喜欢乌龟。

  - 我不喜欢鲸鱼。

- 这些句子都是 deterministic。

- 修改：四句话都提前生成对应的 TTS audio，不要使用 system / machine voice。

## 55. Zoo Animals → Build a Sentence：使用 TTS-generated audio

- 这里的句子也是 deterministic。

- 大概只有 5 个选择 / 5 种句子。

- 修改：把这些固定句子提前生成对应的 TTS audio，不要使用 system / machine voice。

## 56. Match the Pairs：补拼音，并改成横向布局节省 vertical space

- 狗、猫、小兔子等词目前没有拼音。

- 修改：给中文词补上对应 Pinyin。

- 同时可以加入对应 English。

- 不要上下 stack，尽量 side by side / horizontal layout。

- 普通文字项：

  - 中文 → 拼音 → English

  - English align to the right。

- 已经有 icon 的项目：

  - Icon → 中文 → 拼音 → English

  - English align to the right。

- 目标：保持信息完整，同时减少 vertical space。

## 57. Nature and Colors → Colors：Book Words + Color Mission

- **Book Words**

  - 例如“紫色的葡萄”，目前 audio 只念“紫色”，没有念完整 phrase。

  - 修改：把完整内容都读出来，例如：

    - 紫色，紫色的葡萄

    - 橙色，橙色的橘子

    - 粉红色，粉红色的花

    - 黑色，黑色的鞋

  - 不要只念 color，要把后面的完整 phrase 也念出来。

- **Color Mission**

  - 目前 description：

    - “Listen and find the object.”

    - 后面还有一大段类似：“Everyone mix the object colors and their positions. Listen for the complete phrase and tap the matching picture.”

  - 问题：后面这一长段太啰嗦。

  - 修改：删掉后面那一长段，只保留简洁 instruction。

- **Color Mission audio**

  - 这是 listen and find exercise，audio 是核心。

  - 如果依赖 Safari / browser system voice，可能出现无法正常播放的问题。

  - 修改：prompt / phrase 应该提前生成好 TTS audio，exercise 里直接播放 TTS，不依赖 browser/system voice。

## 58. Nature and Colors → Colors → Picture and Phrase：复用可拆分的 TTS phrase audio

- 这里会出现：

  - 蓝色的书包

  - 粉红色的花

  - 黄色的香蕉

- 和前面 Book Words 使用的是同一套 phrase。

- 生成 audio 时把 color word 和完整 phrase 分开准备，例如：

  - “粉红色”

  - “粉红色的花”

- 这样：

  - Book Words 可以播放“粉红色，粉红色的花”

  - Exercise 里可以单独播放“粉红色的花”

- 其他颜色和物品同样处理，保证 audio separable / reusable。

- TTS clips 要紧凑：

  - 不要有明显 leading silence。

  - 不要有过长 trailing / ending silence。

  - 便于在不同 exercise 中复用或拼接。

## 59. Nature and Colors → Colors → My Favorite Color：system voice 优先，TTS 两段拼接作为 fallback

- 动态 sentence 例如：

  - 我喜欢粉红色。

  - 我喜欢紫色。

  - 我不喜欢黑色。

- 句子结构拆成两部分：

  - 固定 phrase：“我喜欢” / “我不喜欢”

  - 用户选择的 color

- Default / first choice：

  - 优先使用 browser / system-generated voice 一次性读完整 sentence。

  - 因为通常比 TTS clips 拼接更自然。

- Fallback / second choice：

  - 如果 system voice unavailable / 没有声音，再用两段 TTS 拼接：

    - “我喜欢” + color

    - “我不喜欢” + color

- 需要提前准备：

  - “我喜欢”

  - “我不喜欢”

  - 各个 color 的独立 TTS audio。

## 60. Toys：玩具火车需要重新 generate

- “玩具火车”目前生成得不太好。

- 修改：之后重新 generate 一版“玩具火车”。

## 61. Toys：「玩具熊」TTS 声音不一致

- “玩具熊”目前生成的 audio 不太好。

- 声音突然不像前面一直使用的女声，听起来像变成了男声。

- 修改：重新 generate “玩具熊”的 TTS，保持和其他词一致的女声 voice / voice consistency。

## 62. Toys → Look and Choose：system voice 优先，TTS 作为 fallback

- 处理方式和 My Favorite Color 一样。

- Default / first choice：

  - 优先使用 browser / machine / system voice 直接读完整 sentence。

- 如果 system voice 不能正常播放，再使用 TTS-generated audio 作为 fallback。

- TTS fallback：

  - 如果已经有完整 sentence 的 TTS，例如“我有玩具汽车。”，就直接播放完整句子，不需要拼接。

  - 如果没有完整 sentence audio，再把句子拆成两段 TTS 来拼接，例如固定 phrase + 用户选择的 toy。

- 原则：能用完整 TTS sentence 就不要拼；只有没有完整 audio 时才用两段拼接。

## 63. Toys → Look and Choose：调整 layout，减少 vertical scrolling

- 这个 game 的选项比较多，可能有 8 个左右。

- Picture 本身占的面积比较小。

- 现在 layout 占用太多 vertical space，一个 screen 里显示不完，需要上下 scroll。

- 修改：

  - picture 移到左边。

  - 多个 choices 放到 picture 的右边。

  - 尽量采用 side-by-side / horizontal layout，而不是上下堆叠。

- 目标：减少 vertical space，让更多内容在一个 screen 里同时显示，尽量避免频繁 scroll up and down。

## 64. What I Like：「玩游戏」TTS 发音不自然

- 目前“玩游戏”的“儿化感”被读得太重，像硬生生加了一个明显的“儿”。

- 正确应该更自然、轻微，不能把“儿”单独强调出来。

- 修改：重新 generate “玩游戏”的 TTS，让“玩”读得自然，避免过重的“儿”音。

## 65. Music and Movement：「跳舞」音频开头静音过长

- 点击播放后，前面有明显 silence，要过一会儿“跳舞”才出来。

- 修改：去掉音频开头多余的 silence，让点击后马上听到“跳舞”。

## 66. Music and Movement → Let’s Practice → Build a Question：Picture 没有随题目变化

- 下面的 Word Cards / choices 会随着题目变化。

- 但上面的 Picture 一直都是同一张“唱歌”的图片。

- 这是一个 bug。

- 修改：Picture 应该根据当前题目 / word choices 同步切换，不能一直固定显示“唱歌”。

## 67. Hobbies at Home → Look and Choose：layout + picture 不会 shuffle

- **Layout**

  - picture 放到左边。

  - choices 列在右边。

  - 减少 vertical space，尽量避免一个 screen 显示不完。

- **Bug：picture 不会随题目 shuffle**

  - 现在一直显示同一张“妹妹在看动画片”的照片。

  - 即使持续 press green button，也不会换成其他 picture。

  - 修改：green button 应该让题目正常 shuffle，picture 也随当前题目变化。

## 68. Leisure Time / 休闲时光：「玩儿沙子」TTS 儿化音不自然

- Phrase：“玩儿沙子”。

- 目前“儿”音被读得太重、太突出，像单独强调了一个“儿”字。

- 正确效果：儿化音应该很轻、很快、自然地融在“玩”里面。

- 修改：重新 generate “玩儿沙子”的 TTS，让儿化音更自然。

## 69. Leisure Time / 休闲时光 → Build the Sentence：Picture 不会 shuffle

- 目前只有一张 picture：孩子们在学校操场上跑步。

- 即使点击 green button，picture 也不会切换到其他题目 / 图片。

- 修改：green button 应该正常 shuffle 到不同 question，并且 picture 随题目一起变化。

## 70. Time and Daily Routine → Ask, Is It：Book Words 内容 + Look and Choose layout

- **Book Words**

  - 这里的“妹妹”不应该出现在 Book Words 里。

  - 实际上这里指的是“美美”，是人物名字，不是“妹妹”这个词。

  - 而且它本身和这一页的 Book Words 内容也没有关系。

  - 修改：把这一项从 Book Words 里拿掉。

- **Let’s Practice → Look and Choose**

  - 目前这个 game 的 format 和其他 pages 不一致。

  - 需要参考其他 pages 的 Build / layout，保持 consistency。

  - 修改 layout：

    - Picture 放在左边。

    - Answer choices 放在右边。

    - 每个 answer choice 用一个 box，多个 box 可以在右侧 stack。

  - 目标：减少 vertical space，让页面尽量在一个 screen 里显示更多内容，减少上下 scrolling。