# Category Topic Content Asset Mapping

Last updated: 2026-08-08

Purpose: production-ready mapping from child-facing category to topic to OCR-backed lesson content and reusable asset coverage. The coverage status records asset availability, not complete implementation of every textbook teaching point.

Primary data file: [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json)

Source rules:

- Use the textbooks for curriculum alignment, not copied content or copied art.
- Final product copy should use tone-mark pinyin and original character/visual systems.
- Contact sheets are only a visual review aid; exact lesson content should be verified against OCR and individual pages before implementation.
- Existing asset references point to reusable local assets or content folders; gaps should be reviewed before generating new art.
- A lesson is content-complete only after a lesson-contract audit traces every required word, pattern, dialogue, useful note, and practice requirement to the product page.

## Sources

- `docs/curriculum_reference.json`
- `docs/series_audit.md`
- `docs/ocr/book_asset_coverage_map.json`
- `docs/asset_summary.md`
- `assets/*/manifest.json`
- `generated/easy_chinese_book_sheets_6page/`

## Coverage Summary

- 开口说中文 / Start Speaking: 14 strong, 0 partial, 0 missing lesson/topic records
- 我和家人 / Me & Family: 9 strong, 0 partial, 0 missing lesson/topic records
- 时间和日常 / Time & Daily Life: 8 strong, 0 partial, 0 missing lesson/topic records
- 学校生活 / School Life: 8 strong, 0 partial, 0 missing lesson/topic records
- 食物 / Food: 6 strong, 0 partial, 0 missing lesson/topic records
- 自然和颜色 / World Around Us: 6 strong, 0 partial, 0 missing lesson/topic records
- 兴趣和玩具 / Play & Hobbies: 5 strong, 0 partial, 0 missing lesson/topic records
- 中国文化 / Culture Side Paths: 0 strong, 8 partial, 0 missing lesson/topic records

## 开口说中文 / Start Speaking

First survival language: numbers, greetings, polite classroom language, identity, age, and simple personal facts.

### Numbers

Lessons: 1A-1, 1A-2, 1A-3, 2A-1, 3A-1, 4A-1

Coverage: `strong`

Content focus:

- `counting objects`
- `一`
- `二`
- `三`
- `四`
- `五`
- `六`
- `七`
- `八`
- `九`
- `十`
- `counting larger quantities`
- `二十六`
- `三十八`
- `四十`
- `counting higher numbers`
- ...plus 8 more in the JSON file

Lesson mapping:

- `1A-1`: Numbers (1) (1-5); coverage `strong`; vocab `一`, `二`, `三`, `四`, `五`; patterns `counting objects`
- `1A-2`: Numbers (2) (6-10); coverage `strong`; vocab `六`, `七`, `八`, `九`, `十`; patterns `counting objects`
- `1A-3`: Numbers (3) (11-20); coverage `strong`; vocab `一`, `二`, `三`, `四`, `五`, `六`, `七`, `八`; patterns `counting objects`
- `2A-1`: Numbers (21-40); coverage `strong`; vocab `二十六`, `三十八`, `四十`; patterns `counting larger quantities`
- `3A-1`: Numbers (41-100); coverage `strong`; vocab `四十一`, `五十三`, `一百`; patterns `counting higher numbers`
- `4A-1`: Telephone numbers; coverage `strong`; vocab `电话号码`, `多少`, `哪里`, `他们`; patterns `电话号码是多少`

Use now:

- `assets/illustrated-counting/ten-yellow-ducks.webp`
- `assets/illustrated-counting/twenty-to-forty-counting-board.webp`
- `assets/illustrated-counting/forty-one-to-one-hundred-counting-board.webp`
- `assets/illustrated-measure-words/three-ducks.webp`

Next pass:

- Use this as the pilot multi-lesson progression. Confirm exact lesson boundary pages, then build stages for 1-5, 6-10, 11-20, 21-40, 41-100, and phone numbers.

### Greetings

Lessons: 1A-4

Coverage: `strong`

Content focus:

- `greeting at school`
- `你好`
- `您好`
- `再见`

Lesson mapping:

- `1A-4`: Hello!; coverage `strong`; vocab `你好`, `您好`, `再见`; patterns `greeting at school`

Use now:

- `assets/greetings`
- `assets/navigation-icons/lele-wave-icon.webp`

Next pass:

- Build a short audio-first greeting exchange with tap-to-hear dialogue cards.

### Polite Words

Lessons: 1A-5, 3A-6

Coverage: `strong`

Content focus:

- `polite classroom exchanges`
- `谢谢`
- `不客气`
- `对不起`
- `请...`
- `我可以...吗`
- `request phrases`

Lesson mapping:

- `1A-5`: Thank you!; coverage `strong`; vocab `谢谢`, `不客气`, `对不起`; patterns `polite classroom exchanges`
- `3A-6`: Request; coverage `strong`; vocab `request phrases`; patterns `请...`, `我可以...吗`

Use now:

- `assets/polite`
- `assets/illustrated-grammar/can-watch-tv-homework-first.webp`

Next pass:

- Build scenario cards for thanks, apology, classroom quiet, and requests.

### Names & Introductions

Lessons: 1A-6, 2A-3

Coverage: `strong`

Content focus:

- `你叫什么名字`
- `我叫...`
- `名字`
- `他是我的好朋友`
- `朋友`

Lesson mapping:

- `1A-6`: What's your name?; coverage `strong`; vocab `名字`; patterns `你叫什么名字`, `我叫...`
- `2A-3`: Good friends; coverage `strong`; vocab `朋友`; patterns `他是我的好朋友`

Use now:

- `assets/introductions`
- `assets/illustrated-identity/classmates-exchange-phone-number.webp`

Next pass:

- Keep name exchange and friend introduction separate in data, even if they share one page.

### Age

Lessons: 1A-7

Coverage: `strong`

Content focus:

- `你几岁`
- `我五岁`
- `岁`

Lesson mapping:

- `1A-7`: I'm 5 years old; coverage `strong`; vocab `岁`; patterns `你几岁`, `我五岁`

Use now:

- `assets/age`
- `assets/illustrated-dates/calendar-example-dates-board.webp`

Next pass:

- Small page: age cards, listening prompt, child chooses or says age.

### Identity

Lessons: 3A-5, 4A-2

Coverage: `strong`

Content focus:

- `你是哪国人`
- `我是...人`
- `中国`
- `美国`
- `英国`
- `法国`
- `你会说...吗`
- `我会说...`
- `汉语`
- `英语 and language words`

Lesson mapping:

- `3A-5`: Nationality; coverage `strong`; vocab `中国`, `美国`, `英国`, `法国`; patterns `你是哪国人`, `我是...人`
- `4A-2`: Languages; coverage `strong`; vocab `汉语`, `英语 and language words`; patterns `你会说...吗`, `我会说...`

Use now:

- `assets/illustrated-flags`
- `assets/illustrated-country-symbols`
- `assets/illustrated-identity/classmates-speak-different-languages.webp`

Next pass:

- Lead with children speaking, use flags as vocabulary support, and avoid making flags the whole experience.

## 我和家人 / Me & Family

Self, family, body, clothes, and personal-world language.

### Family

Lessons: 1B-1, 1B-2, 2A-2, 3A-4

Coverage: `strong`

Content focus:

- `我爱爸爸`
- `我爱妈妈`
- `爸爸`
- `妈妈`
- `爱`
- `family member identification`
- `哥哥`
- `姐姐`
- `弟弟`
- `妹妹`
- `我有...`
- `我没有...`
- `一个`
- `两个`
- `没有`
- `introduce family`
- ...plus 1 more in the JSON file

Lesson mapping:

- `1B-1`: Mum and dad; coverage `strong`; vocab `爸爸`, `妈妈`, `爱`; patterns `我爱爸爸`, `我爱妈妈`
- `1B-2`: Brothers and sisters; coverage `strong`; vocab `哥哥`, `姐姐`, `弟弟`, `妹妹`; patterns `family member identification`
- `2A-2`: Two younger brothers; coverage `strong`; vocab `一个`, `两个`, `没有`; patterns `我有...`, `我没有...`
- `3A-4`: Family; coverage `strong`; vocab `family members`; patterns `introduce family`

Use now:

- `assets/illustrated-family`
- `assets/illustrated-kids`

Next pass:

- Good second pilot after Numbers because it tests image-rich matching and dialogue.

### Body

Lessons: 1B-3, 1B-4

Coverage: `strong`

Content focus:

- `identify body parts`
- `body parts`

Lesson mapping:

- `1B-3`: Parts of the body (1); coverage `strong`; vocab `body parts`; patterns `identify body parts`
- `1B-4`: Parts of the body (2); coverage `strong`; vocab `body parts`; patterns `identify body parts`

Use now:

- `assets/body/body-topic-kid.webp`
- `assets/body/body-topic-kid-largehead.webp`

Next pass:

- Verify body lesson vocabulary from individual pages, then decide whether to split into face/body mini-scenes.

### Clothes

Lessons: 2A-6, 3A-7, 4B-2

Coverage: `strong`

Content focus:

- `I can dress myself`
- `穿`
- `鞋`
- `帽子`
- `wearing clothes`
- `衬衫`
- `裤子`
- `裙子`
- `手套`
- `外套`
- `穿...`
- `校服`

Lesson mapping:

- `2A-6`: I can dress myself; coverage `strong`; vocab `穿`, `鞋`, `帽子`; patterns `I can dress myself`
- `3A-7`: Clothes; coverage `strong`; vocab `衬衫`, `裤子`, `裙子`, `鞋`, `帽子`, `手套`, `外套`; patterns `wearing clothes`
- `4B-2`: Clothes; coverage `strong`; vocab `衬衫`, `裤子`, `裙子`, `校服`; patterns `穿...`

Use now:

- `assets/illustrated-clothes`
- `assets/illustrated-self-dressing`
- `assets/illustrated-weather/rainy-day.webp`

Next pass:

- Combine clothes nouns with self-dressing/weather-use scenes so it is not only isolated clothing cards.

## 时间和日常 / Time & Daily Life

Time, dates, routines, rooms, transportation, and repeated daily actions.

### Time & Date

Lessons: 2B-1, 2B-2, 3A-2, 3A-3, 4A-3

Coverage: `strong`

Content focus:

- `今天星期...`
- `星期一 to 星期天`
- `今天`
- `几点了`
- `一点 to 十二点`
- `X月X日`
- `month names`
- `day numbers`
- `生日快乐`
- `生日`
- `蛋糕`
- `clock times`

Lesson mapping:

- `2B-1`: Today is Monday; coverage `strong`; vocab `星期一 to 星期天`, `今天`; patterns `今天星期...`
- `2B-2`: What time is it?; coverage `strong`; vocab `一点 to 十二点`; patterns `几点了`
- `3A-2`: Date; coverage `strong`; vocab `month names`, `day numbers`; patterns `X月X日`
- `3A-3`: Happy birthday!; coverage `strong`; vocab `生日`, `蛋糕`; patterns `生日快乐`
- `4A-3`: Tell the time; coverage `strong`; vocab `clock times`; patterns `几点了`

Use now:

- `assets/illustrated-day-of-week`
- `assets/illustrated-clocks`
- `assets/illustrated-clock-routines`
- `assets/illustrated-dates`
- `assets/illustrated-months-of-year`

Next pass:

- Create a shared date/time engine that supports weekdays, calendar dates, birthday, and clock routines.

### Daily Life

Lessons: 4A-4, 4A-6, 4B-3

Coverage: `strong`

Content focus:

- `X点做什么`
- `wake up / breakfast / school / dinner`
- `坐...去...`
- `骑...去...`
- `走路`
- `自行车`
- `汽车`
- `出租车`
- `火车`
- `飞机`
- `校车`
- `房间里有...`
- `房间`
- `床`
- `书桌`
- `衣柜`

Lesson mapping:

- `4A-4`: Daily routine; coverage `strong`; vocab `wake up / breakfast / school / dinner`; patterns `X点做什么`
- `4A-6`: Means of transport; coverage `strong`; vocab `走路`, `自行车`, `汽车`, `出租车`, `火车`, `飞机`, `校车`; patterns `坐...去...`, `骑...去...`
- `4B-3`: My room; coverage `strong`; vocab `房间`, `床`, `书桌`, `衣柜`; patterns `房间里有...`

Use now:

- `assets/illustrated-clock-routines`
- `assets/illustrated-everyday-life`
- `assets/illustrated-transportation`
- `assets/illustrated-rooms`
- `assets/illustrated-furniture`

Next pass:

- Build as routine sequence cards, then add transport and room/location scenes.

## 学校生活 / School Life

Classroom objects, school spaces, subjects, positions, and descriptive language used at school.

### School

Lessons: 2B-3, 2B-4, 3B-1, 3B-2, 4B-5, 4B-6

Coverage: `strong`

Content focus:

- `there is in the pencil box / schoolbag`
- `铅笔`
- `橡皮`
- `尺子`
- `文具盒`
- `课本`
- `有`
- `在`
- `教室`
- `桌子`
- `椅子`
- `黑板`
- `没有`
- `书包`
- `练习本`
- `学校有...`
- ...plus 8 more in the JSON file

Lesson mapping:

- `2B-3`: Stationery; coverage `strong`; vocab `铅笔`, `橡皮`, `尺子`, `文具盒`, `课本`; patterns `there is in the pencil box / schoolbag`
- `2B-4`: My classroom; coverage `strong`; vocab `教室`, `桌子`, `椅子`, `黑板`; patterns `有`, `在`
- `3B-1`: My schoolbag; coverage `strong`; vocab `书包`, `课本`, `练习本`, `文具盒`; patterns `有`, `没有`
- `3B-2`: Our classroom; coverage `strong`; vocab `教室`, `桌子`, `椅子`; patterns `有`, `在`
- `4B-5`: Our school; coverage `strong`; vocab `学校`, `教室`, `图书馆`, `操场`, `礼堂`, `食堂`, `钢琴`; patterns `学校有...`
- `4B-6`: School subjects; coverage `strong`; vocab `subject names`; patterns `我喜欢...课`

Use now:

- `assets/illustrated-stationery`
- `assets/illustrated-classrooms`
- `assets/illustrated-school-anchors`
- `assets/illustrated-school-layouts`
- `assets/illustrated-school-subjects`

Next pass:

- Use school as a hub with subviews for stationery, classroom, bag, school map, and subjects.

### Describing Things

Lessons: 2B-6, 3B-3

Coverage: `strong`

Content focus:

- `A big / small`
- `大`
- `小`
- `A在B上面/下面/里面/外面`
- `front/back/left/right position words`
- `上`
- `下`
- `里`
- `外`
- `前`
- `后`
- `左`
- `右`

Lesson mapping:

- `2B-6`: Big or small; coverage `strong`; vocab `大`, `小`; patterns `A big / small`
- `3B-3`: Positions; coverage `strong`; vocab `上`, `下`, `里`, `外`, `前`, `后`, `左`, `右`; patterns `A在B上面/下面/里面/外面`, `front/back/left/right position words`

Use now:

- `assets/illustrated-comparisons`
- `assets/illustrated-rooms/positions-room.webp`
- `assets/illustrated-rooms/positions-up-down.webp`
- `assets/illustrated-rooms/positions-inside-outside.webp`
- `assets/illustrated-rooms/positions-all-directions.webp`
- `assets/illustrated-grammar`

Next pass:

- Use stable interaction primitives: compare sizes and place objects in/on/under/inside/outside/front/back/left/right scenes.

## 食物 / Food

Fruit, snacks, meals, vegetables, hunger, and food/drink choices.

### Food & Drinks

Lessons: 1B-7, 2B-7, 3B-5, 3B-6, 4A-5, 4A-7

Coverage: `strong`

Content focus:

- `identify fruit`
- `苹果`
- `香蕉`
- `葡萄`
- `草莓`
- `like / eat / drink`
- `snack foods`
- `drinks`
- `喜欢吃/喝`
- `food and drink words`
- `identify vegetables`
- `胡萝卜`
- `黄瓜`
- `西红柿`
- `西兰花`
- `土豆`
- ...plus 7 more in the JSON file

Lesson mapping:

- `1B-7`: Fruit; coverage `strong`; vocab `苹果`, `香蕉`, `葡萄`, `草莓`; patterns `identify fruit`
- `2B-7`: Snacks; coverage `strong`; vocab `snack foods`, `drinks`; patterns `like / eat / drink`
- `3B-5`: Food and drink; coverage `strong`; vocab `food and drink words`; patterns `喜欢吃/喝`
- `3B-6`: Vegetables; coverage `strong`; vocab `胡萝卜`, `黄瓜`, `西红柿`, `西兰花`, `土豆`; patterns `identify vegetables`
- `4A-5`: My lunch; coverage `strong`; vocab `lunch foods`; patterns `我中午吃...`
- `4A-7`: I'm hungry; coverage `strong`; vocab `饿`, `渴`, `好吃`; patterns `我饿了`, `我渴了`

Use now:

- `assets/illustrated-food`
- `assets/illustrated-meals`
- `assets/illustrated-food-feelings`

Next pass:

- Use menu-style choices plus hunger/feelings prompts; verify vegetable gaps before generation.

## 自然和颜色 / World Around Us

Animals, pets, colors, weather, nature, and observable world vocabulary.

### Pets & Animals

Lessons: 1B-5, 2B-5

Coverage: `strong`

Content focus:

- `我有一只...`
- `狗`
- `猫`
- `金鱼`
- `兔子`
- `identify animals`
- `animal words`

Lesson mapping:

- `1B-5`: Pets; coverage `strong`; vocab `狗`, `猫`, `金鱼`, `兔子`; patterns `我有一只...`
- `2B-5`: Animals; coverage `strong`; vocab `animal words`; patterns `identify animals`

Use now:

- `assets/illustrated-animals`
- `assets/illustrated-pets/lele-with-pets-at-home.webp`

Next pass:

- Keep pet ownership and general animal/zoo vocabulary as separate stages.

### Colours

Lessons: 1B-6, 2A-7

Coverage: `strong`

Content focus:

- `X色`
- `颜色 words`

Lesson mapping:

- `1B-6`: Colours; coverage `strong`; vocab `颜色 words`; patterns `X色`
- `2A-7`: Colours; coverage `strong`; vocab `颜色 words`; patterns `X色`

Use now:

- `assets/illustrated-colors/basic-colors-board.webp`

Next pass:

- Use color swatches tied to real objects, not abstract color-only cards.

### Weather

Lessons: 4B-1

Coverage: `strong`

Content focus:

- `今天...`
- `下雨`
- `下雪`
- `晴天`
- `冷`
- `热`
- `刮大风`

Lesson mapping:

- `4B-1`: It's raining; coverage `strong`; vocab `下雨`, `下雪`, `晴天`, `冷`, `热`, `刮大风`; patterns `今天...`

Use now:

- `assets/illustrated-weather`

Next pass:

- Build as listen-and-choose weather scene cards with clothing crossover.

### Nature

Lessons: 3B-7

Coverage: `strong`

Content focus:

- `describe nature scene`
- `sky and weather words`

Lesson mapping:

- `3B-7`: Nature; coverage `strong`; vocab `sky and weather words`; patterns `describe nature scene`

Use now:

- `assets/illustrated-sky-day-night`
- `assets/illustrated-weather`
- `assets/illustrated-food/bamboo.webp`

Next pass:

- Needs individual-page review before building because current coverage is only partial.

## 兴趣和玩具 / Play & Hobbies

Toys, reading, hobbies, and free-time activities.

### Toys & Play

Lessons: 2A-4

Coverage: `strong`

Content focus:

- `这是我的...`
- `toy words`

Lesson mapping:

- `2A-4`: My toys; coverage `strong`; vocab `toy words`; patterns `这是我的...`

Use now:

- `assets/illustrated-toys`

Next pass:

- Good standalone early page with object tap/match interactions.

### Hobbies

Lessons: 2A-5, 3B-4, 4B-4, 4B-7

Coverage: `strong`

Content focus:

- `我喜欢看书`
- `看书`
- `喜欢`
- `我喜欢...`
- `我会...`
- `hobby verbs`
- `喜欢...`
- `会...`
- `activity words`
- `放学后 / 周末做什么`
- `leisure activity words`

Lesson mapping:

- `2A-5`: I love reading; coverage `strong`; vocab `看书`, `喜欢`; patterns `我喜欢看书`
- `3B-4`: Hobbies; coverage `strong`; vocab `hobby verbs`; patterns `我喜欢...`, `我会...`
- `4B-4`: Hobbies; coverage `strong`; vocab `activity words`; patterns `喜欢...`, `会...`
- `4B-7`: Leisure time; coverage `strong`; vocab `leisure activity words`; patterns `放学后 / 周末做什么`

Use now:

- `assets/illustrated-activities`
- `assets/illustrated-actions-basic`
- `assets/illustrated-clock-routines/08pm-story-time.webp`

Next pass:

- Unify reading, hobbies, and leisure time as activity choices with sentence patterns.

## 中国文化 / Culture Side Paths

Culture entries from the eighth unit of each book. These are side paths, not copied textbook pages.

### Culture

Lessons: 1A-culture, 1B-culture, 2A-culture, 2B-culture, 3A-culture, 3B-culture, 4A-culture, 4B-culture

Coverage: `partial`

Content focus:

- `short culture reading`
- `image-led explanation`
- `optional parent/teacher context`

Lesson mapping:

- `1A-culture`: Mid-Autumn Festival; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `1B-culture`: Chinese New Year; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `2A-culture`: The story of Nian; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `2B-culture`: Dragon Boat Festival; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `3A-culture`: Beijing Opera; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `3B-culture`: The Twelve Zodiac Animals; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `4A-culture`: Four Treasures of the Study; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`
- `4B-culture`: The Chinese Painting; coverage `partial`; vocab none listed; patterns `short culture reading`, `image-led explanation`, `optional parent/teacher context`

Use now:

- `culture/content/folk-customs`
- `culture/content/art`
- `culture/content/culture`

Gaps:

- confirm culture-side-path reading level against textbook culture pages
- generate missing child-friendly visuals only after page review

Next pass:

- Treat culture as short unlockable side paths, not core drill pages; use existing culture content where age-appropriate.

## Implementation Notes

- Use the JSON file for code-facing lookup and this Markdown file for planning/review.
- Before generating any new asset, confirm the relevant `missingAssets` item against the individual PDF page or a 6-page contact sheet.
- For page builds, prefer topic progression over book order, but keep `ref` visible for parent/teacher lookup.
