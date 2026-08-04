# OCR Book Asset Coverage Audit

Last updated: 2026-07-12

Status: historical first-pass OCR asset audit. Keep for provenance, but prefer [docs/learn_by_topics_asset_mapping.md](../learn_by_topics_asset_mapping.md) and [docs/learn_by_books_asset_mapping.md](../learn_by_books_asset_mapping.md) for current manual coverage review.

Purpose: audit the OCR textbook sequence against the current `assets` library, focusing on lesson-level vocabulary coverage and sentence-pattern scene coverage.

Scope:

- This is a practical production audit, not a full textbook transcription.
- Coverage is judged by each lesson's core teaching goal: the nouns, verbs, settings, and sentence patterns that clearly need visual support.
- Existing inventory is based on the current `assets` folders, `assets/*/manifest.json`, [docs/asset_summary.md](../asset_summary.md), and [docs/grammar_asset_map.md](../grammar_asset_map.md).

Status labels:

- `Strong`: the current library already teaches the lesson well.
- `Partial`: some words or one side of the pattern exists, but the lesson still lacks a clean supporting scene set.
- `Missing`: no clear reusable support yet.

## 1A

### Lesson 1-3 Numbers

- Core words: `一` to `十`
- Sentence/picture need: counting objects, not just isolated numerals
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-clocks](../../assets/illustrated-clocks)
  - [assets/illustrated-clock-routines](../../assets/illustrated-clock-routines)
  - [assets/illustrated-counting/ten-yellow-ducks.webp](../../assets/illustrated-counting/ten-yellow-ducks.webp)
- Gap:
  - still missing expanded counting boards for larger ranges

### Lesson 4 Hello!

- Core pattern: `你好 / 您好 / 再见`
- Coverage: `Strong`
- Existing support:
  - [assets/greetings](../../assets/greetings)

### Lesson 5 Thank you!

- Core pattern: `谢谢 / 不客气 / 对不起 / 请安静`
- Coverage: `Strong`
- Existing support:
  - [assets/polite](../../assets/polite)

### Lesson 6 What's your name?

- Core pattern: `你叫什么名字？ / 我叫...`
- Coverage: `Strong`
- Existing support:
  - [assets/introductions](../../assets/introductions)

### Lesson 7 I'm 5 years old

- Core pattern: `你几岁？ / 我五岁`
- Coverage: `Strong`
- Existing support:
  - [assets/age](../../assets/age)

## 1B

### Lesson 1 Mum and dad

- Core words: `爸爸 / 妈妈 / 爱`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-family](../../assets/illustrated-family)

### Lesson 2 Brothers and sisters

- Core words: `哥哥 / 姐姐 / 弟弟 / 妹妹`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-family](../../assets/illustrated-family)

### Lesson 3-4 Parts of the body

- Core words: body-part vocabulary
- Coverage: `Partial`
- Existing support:
  - [assets/body/body-topic-kid.webp](../../assets/body/body-topic-kid.webp)
  - [assets/body/body-topic-kid-largehead.webp](../../assets/body/body-topic-kid-largehead.webp)
- Gap:
  - no broken-out reusable body-part assets or clearly labeled part-focused mini-scenes

### Lesson 5 Pets

- Core words: likely pet animals such as `狗 / 猫 / 金鱼 / 兔子`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-animals](../../assets/illustrated-animals)
  - [assets/illustrated-pets/lele-with-pets-at-home.webp](../../assets/illustrated-pets/lele-with-pets-at-home.webp)
- Gap:
  - still no pet variant for cat / turtle if broader scene support is needed

### Lesson 6 Colours

- Core words: color words
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-colors/basic-colors-board.webp](../../assets/illustrated-colors/basic-colors-board.webp)

### Lesson 7 Fruit

- Core words: fruit vocabulary
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-food/fruit-group-1b-core.webp](../../assets/illustrated-food/fruit-group-1b-core.webp)
  - [assets/illustrated-food](../../assets/illustrated-food)

## 2A

### Lesson 1 Numbers

- Core words: higher numbers such as `二十六 / 三十八 / 四十`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-counting/ten-yellow-ducks.webp](../../assets/illustrated-counting/ten-yellow-ducks.webp) as a base counting visual
- Gap:
  - no object-count set for 20-40 range

### Lesson 2 Two younger brothers

- Core pattern: `有 / 没有`, family counting, `一个 / 两个`
- Coverage: `Partial`
- Existing support:
  - [docs/grammar_asset_map.md](../grammar_asset_map.md) already maps `有 / 没有`
  - [assets/illustrated-family](../../assets/illustrated-family)
- Gap:
  - no family-specific scene that clearly teaches sibling counting

### Lesson 3 Good friends

- Core pattern: friend introduction, likely `他是我的好朋友`
- Coverage: `Partial`
- Existing support:
  - [assets/introductions](../../assets/introductions)
- Gap:
  - no dedicated best-friends or classmates scene package

### Lesson 4 My toys

- Core words: toy vocabulary
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-toys](../../assets/illustrated-toys)

### Lesson 5 I love reading

- Core pattern: `我喜欢看书`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-activities/grandma_reading_armchair.webp](../../assets/illustrated-activities/grandma_reading_armchair.webp)
- Gap:
  - no child reading scene, library reading scene, or `喜欢看书` child-friendly counterpart

### Lesson 6 I can dress myself

- Core words/patterns: dressing, clothes, self-care
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-everyday-life](../../assets/illustrated-everyday-life)
  - [assets/illustrated-actions-basic](../../assets/illustrated-actions-basic)
- Gap:
  - no clean self-dressing action set such as `穿衣服 / 穿鞋 / 戴帽子`

### Lesson 7 Colours

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-colors/basic-colors-board.webp](../../assets/illustrated-colors/basic-colors-board.webp)

## 2B

### Lesson 1 Today is Monday

- Core pattern: `今天星期...`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-day-of-week](../../assets/illustrated-day-of-week)

### Lesson 2 What time is it?

- Core pattern: `几点了？`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-clocks](../../assets/illustrated-clocks)
  - [assets/illustrated-clock-routines](../../assets/illustrated-clock-routines)

### Lesson 3 Stationery

- Core words: `铅笔 / 橡皮 / 尺子 / 文具盒 / 书包 / 课本 / 练习本`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-stationery](../../assets/illustrated-stationery)
  - [assets/illustrated-measure-words/one-pencil.webp](../../assets/illustrated-measure-words/one-pencil.webp)

### Lesson 4 My classroom

- Core words: `教室 / 桌子 / 椅子 / 黑板 / 书包`
- Core patterns: `有 / 没有`, `在`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-classrooms](../../assets/illustrated-classrooms)
  - [assets/illustrated-school-anchors/classroom_anchor.webp](../../assets/illustrated-school-anchors/classroom_anchor.webp)
  - [assets/illustrated-grammar](../../assets/illustrated-grammar)
  - [assets/illustrated-measure-words/two-books.webp](../../assets/illustrated-measure-words/two-books.webp)

### Lesson 5 Animals

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-animals](../../assets/illustrated-animals)
  - [assets/illustrated-animals/zoo-scene.webp](../../assets/illustrated-animals/zoo-scene.webp)
  - [assets/illustrated-measure-words/three-ducks.webp](../../assets/illustrated-measure-words/three-ducks.webp)

### Lesson 6 Big or small

- Core pattern: `大 / 小`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-comparisons/big-small-animals.webp](../../assets/illustrated-comparisons/big-small-animals.webp)

### Lesson 7 Snacks

- Core words: snack foods and drinks
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-food](../../assets/illustrated-food)
  - [assets/illustrated-food-feelings](../../assets/illustrated-food-feelings)

## 3A

### Lesson 1 Numbers

- Core words: `四十一` to `一百`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-counting/ten-yellow-ducks.webp](../../assets/illustrated-counting/ten-yellow-ducks.webp) as a base counting visual
- Gap:
  - still no dedicated higher-number picture support for 40-100

### Lesson 2 Date

- Core words/patterns: month + day date expressions
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-months-of-year](../../assets/illustrated-months-of-year)
- Gap:
  - no day-of-month calendar/date visual set

### Lesson 3 Happy birthday!

- Core words/patterns: birthdays, cake, date of birth
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-food/cake.webp](../../assets/illustrated-food/cake.webp)
  - [assets/illustrated-months-of-year](../../assets/illustrated-months-of-year)
- Gap:
  - no birthday party or birthday-greeting scene

### Lesson 4 Family

- Core pattern: introduce family members
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-family](../../assets/illustrated-family)

### Lesson 5 Nationality

- Core words/patterns: `你是哪国人？ / 我是中国人`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-flags](../../assets/illustrated-flags)
  - [assets/illustrated-country-symbols](../../assets/illustrated-country-symbols)
- Gap:
  - no nationality conversation scene using recurring characters

### Lesson 6 Request

- Core patterns: request / permission language
- Coverage: `Partial`
- Existing support:
  - [assets/polite](../../assets/polite)
  - [assets/illustrated-grammar/can-watch-tv-homework-first.webp](../../assets/illustrated-grammar/can-watch-tv-homework-first.webp)
- Gap:
  - no school-life request pack such as `请给我... / 我可以...吗`

### Lesson 7 Clothes

- Core words: `衬衫 / 裤子 / 裙子 / 鞋 / 帽子 / 手套 / 外套`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-everyday-life](../../assets/illustrated-everyday-life)
- Gap:
  - no single coherent clothing lesson scene or grouped clothing plate

## 3B

### Lesson 1 My schoolbag

- Core words/patterns: schoolbag contents, `有 / 没有`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-stationery](../../assets/illustrated-stationery)
  - [assets/illustrated-grammar/you-mei-you-contrast.webp](../../assets/illustrated-grammar/you-mei-you-contrast.webp)
  - [assets/illustrated-rooms/positions-inside-outside.webp](../../assets/illustrated-rooms/positions-inside-outside.webp)

### Lesson 2 Our classroom

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-classrooms](../../assets/illustrated-classrooms)
  - [assets/illustrated-school-anchors/classroom_anchor.webp](../../assets/illustrated-school-anchors/classroom_anchor.webp)

### Lesson 3 Positions

- Core patterns: `上 / 下 / 里 / 外 / 前 / 后`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-rooms/positions-up-down.webp](../../assets/illustrated-rooms/positions-up-down.webp)
  - [assets/illustrated-rooms/positions-inside-outside.webp](../../assets/illustrated-rooms/positions-inside-outside.webp)
  - [assets/illustrated-grammar/zai-bu-zai-under-table-contrast.webp](../../assets/illustrated-grammar/zai-bu-zai-under-table-contrast.webp)
- Gap:
  - `前 / 后 / 左 / 右` support is still weak

### Lesson 4 Hobbies

- Core pattern: `我喜欢... / 我会...`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-activities](../../assets/illustrated-activities)

### Lesson 5 Food and drink

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-food](../../assets/illustrated-food)
  - [assets/illustrated-food-feelings](../../assets/illustrated-food-feelings)

### Lesson 6 Vegetables

- Coverage: `Partial`
- Existing support:
  - `胡萝卜`, `黄瓜`, `西红柿`, `西兰花`, `土豆`
- Gap:
  - no grouped vegetable board equivalent to the fruit core group

### Lesson 7 Nature

- Core words: likely sky, sun, moon, weather, outdoor nature nouns
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-sky-day-night](../../assets/illustrated-sky-day-night)
  - [assets/illustrated-weather](../../assets/illustrated-weather)
- Gap:
  - no broader nature set beyond day/night and basic weather

## 4A

### Lesson 1 Telephone numbers

- Core pattern: `电话号码是多少`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-identity/classmates-exchange-phone-number.webp](../../assets/illustrated-identity/classmates-exchange-phone-number.webp)
- Gap:
  - still missing a second variant if we want direct support for the grandparent-introduction subtask

### Lesson 2 Languages

- Core pattern: `你会说汉语吗？ / 我会说英语`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-identity/classmates-speak-different-languages.webp](../../assets/illustrated-identity/classmates-speak-different-languages.webp)
- Gap:
  - still missing a second variant if we want fuller support for `德语 / 法语`

### Lesson 3 Tell the time

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-clocks](../../assets/illustrated-clocks)
  - [assets/illustrated-clock-routines](../../assets/illustrated-clock-routines)

### Lesson 4 Daily routine

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-clock-routines](../../assets/illustrated-clock-routines)
  - `assets/illustrated-activities/0710am-brush-teeth.webp` (historical missing-file reference)

### Lesson 5 My lunch

- Core words/patterns: lunch foods, likely `我中午吃...`
- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-food](../../assets/illustrated-food)
  - [assets/illustrated-school-anchors/cafeteria_anchor.webp](../../assets/illustrated-school-anchors/cafeteria_anchor.webp)
  - [assets/illustrated-meals/anan-eating-school-lunch.webp](../../assets/illustrated-meals/anan-eating-school-lunch.webp)
- Gap:
  - still missing a second variant if we want broader lunch-food coverage

### Lesson 6 Means of transport

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-transportation](../../assets/illustrated-transportation)

### Lesson 7 I'm hungry

- Core pattern: `我饿了 / 我渴了 / 好吃`
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-food-feelings](../../assets/illustrated-food-feelings)

## 4B

### Lesson 1 It's raining

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-weather](../../assets/illustrated-weather)

### Lesson 2 Clothes

- Coverage: `Partial`
- Existing support:
  - [assets/illustrated-everyday-life](../../assets/illustrated-everyday-life)
- Gap:
  - still no coherent clothes lesson set matched to weather-based sentence practice

### Lesson 3 My room

- Core words/patterns: `房间里有...`, furniture and positions
- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-rooms/bedroom.webp](../../assets/illustrated-rooms/bedroom.webp)
  - [assets/illustrated-furniture](../../assets/illustrated-furniture)
  - [assets/illustrated-rooms/garage.webp](../../assets/illustrated-rooms/garage.webp)

### Lesson 4 Hobbies

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-activities](../../assets/illustrated-activities)

### Lesson 5 Our school

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-school-anchors](../../assets/illustrated-school-anchors)
  - [assets/illustrated-school-layouts/school-cutaway-layout.webp](../../assets/illustrated-school-layouts/school-cutaway-layout.webp)

### Lesson 6 School subjects

- Core words: likely `语文 / 数学 / 英语 / 音乐 / 体育 / 美术`
- Coverage: `Partial`
- Existing support:
  - music: [assets/illustrated-school-anchors/music_classroom_anchor.webp](../../assets/illustrated-school-anchors/music_classroom_anchor.webp)
  - gym / PE: [assets/illustrated-school-anchors/gym_anchor.webp](../../assets/illustrated-school-anchors/gym_anchor.webp)
  - library-related support exists, but not as a subject set
  - [assets/illustrated-school-subjects/basic-subjects-board.webp](../../assets/illustrated-school-subjects/basic-subjects-board.webp)
  - [assets/illustrated-activities/yangyang_likes_pe_class.webp](../../assets/illustrated-activities/yangyang_likes_pe_class.webp)
  - [assets/illustrated-activities/lele_dislikes_math_class.webp](../../assets/illustrated-activities/lele_dislikes_math_class.webp)
- Gap:
  - still missing direct scene support for subjects like `英语课 / 汉语课 / 美术课`

### Lesson 7 Leisure time

- Coverage: `Strong`
- Existing support:
  - [assets/illustrated-activities](../../assets/illustrated-activities)

## Cross-Book Gaps Worth Fixing First

These gaps affect multiple books, so they should be the next production priorities.

1. Higher-number visual support
   - Base counting support now exists
   - Next fix: reusable boards for 20-40 and 40-100

2. Dedicated color-teaching assets
   - Base board now exists for `1B` and `2A`
   - Optional next step: one child-friendly color scene for phrase practice such as `红色的苹果`

3. Clothing lesson pack
   - Needed for `3A` and `4B`
   - Best fix: one grouped clothing board and one weather-based outfit scene

4. Language / telephone-number conversational scenes
   - Needed most for `4A`
   - telephone-number coverage has started, and core language coverage has started

5. Positions expansion
   - `上 / 下 / 里 / 外` exists
   - `前 / 后 / 左 / 右` still needs cleaner support

6. School subjects pack
   - Needed most for `4B`
   - Music and gym exist, but the full subject set does not

## Recommended Next Mapping File

If we want a stricter production checklist, the next step should be a machine-readable mapping file with one row per lesson:

- `book`
- `lesson`
- `lessonTitle`
- `coreVocabulary`
- `corePatterns`
- `existingAssets`
- `coverage`
- `missingAssets`

That file can drive future generation work lesson by lesson.
