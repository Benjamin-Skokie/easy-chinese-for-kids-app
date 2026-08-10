# Cross-Book Knowledge Audit

Last updated: 2026-08-09

## Scope and order of work

This is the content-first audit for Books 1A–4B. It deliberately does **not** prescribe games. Before an interaction is chosen, each topic must have a settled answer to:

1. What words does this lesson add?
2. What complete sentences can the child understand and say?
3. What changes when the topic returns in a later book?
4. Which earlier knowledge is being reused in the new sentence?

Only after those answers are implemented as scenes, Book words, and Useful notes should we decide whether a particular knowledge set calls for a scene task, an audio task, a builder, or something new. A generic game template is not a substitute for this map.

Sources: the book OCR files in `docs/ocr/` and the book/lesson mapping in `src/data/curriculum.js`. Where OCR is unreliable, the target is checked against the established lesson mapping before implementation.

## The sentence building blocks that recur across the whole series

These are not separate pages by default. They are the links that make the site feel like one curriculum.

| Building block | First clear use | Later reuse that must remain visible |
|---|---|---|
| `这是我的……` | 2A toys, 2B stationery | family introduction; school things |
| `……有……` / `……没有……` | 2A family; 2B classroom | 3B schoolbag/classroom; 4B room |
| `颜色 + 的 + 名词` | 1B colours | 2B stationery; 3A/4B clothes; 3B schoolbag/food; 4A transport; 4B room |
| `我喜欢……` / `我不喜欢……` | 1B/2A colours; 2A reading | 3B food and hobbies; 4B subjects and leisure |
| `我会……` | 2A dressing | 3B hobbies; 4A languages |
| `在` | 2B classroom | 3B positions; 4B room; 4B school subjects (`在上……课`) |
| `……点……` | 2B time | 3A dates/birthdays; 4A exact time and routine |
| `今天……` | 2B weekdays | 4B weather; should also make a natural bridge to clothes |

## Knowledge contract by topic

### Numbers — 1A L1–3, 2A L1, 3A L1, 4A L1

- **1A:** quantities 1–20. The core knowledge is counting real objects, not recognising a static numeral list.
- **2A:** compound numbers 21–40: tens + ones.
- **3A:** extend the same number system to 41–100.
- **4A:** change the job of numbers: say telephone digits one by one in `你的电话号码是多少？` / `我的电话号码是……`.
- **Useful-note requirement:** distinguish a number used to count from digits read separately in a telephone number.

### First speaking — 1A L4–7

- **Greetings:** `你好。`, `您好。`, `再见。` in the appropriate social setting.
- **Polite words:** `谢谢。`, `不客气。`, `对不起。`; later expand this topic with request language rather than adding unrelated phrases.
- **Name:** `你叫什么名字？` / `我叫……。`.
- **Age:** `你几岁？` / `我……岁。`.
- **Knowledge relationship:** these form a short first-meeting conversation. They should be able to appear together in a later review scene.

### Family — 1B L1–2, 2A L2, 3A L4

- **1B L1:** `爸爸`, `妈妈`, `爱`; usable sentences `我爱爸爸。` / `我爱妈妈。`.
- **1B L2:** `哥哥`, `姐姐`, `弟弟`, `妹妹`; identify the relationship correctly.
- **2A L2:** quantity and presence: `我有……。` / `我没有……。`, with `一个 / 两个` and sibling terms.
- **3A L4:** introduce a family member: `这是我的……。` / `他（她）是我的……。`.
- **Useful-note requirement:** make the gender and older/younger distinctions clear without presenting the family terms as an unconnected pile of nouns.

### Body and animals — 1B L3–5, 2B L5

- **Body:** the child should identify the taught face/body parts when they are named, then understand a short point-and-say description.
- **Pets:** `狗`, `猫`, `金鱼`, `兔子` and `我有一只……。`.
- **Animals:** expand beyond pets to animal recognition, without accidentally treating every animal as a pet.
- **Knowledge relationship:** `一只` belongs with animals; it should not be introduced as a disconnected measure-word fact.

### Colours — 1B L6 and 2A L7, with later reuse everywhere

The colour topic is a grammar topic as well as a vocabulary topic. The book sequence does not support a page that teaches only four colour flashcards.

- **Core colour set to keep available:** `红色`, `黄色`, `蓝色`, `绿色`, `橙色`, `粉红色`, `黑色`, `白色`, `紫色`.
- **1B foundation:** recognise and say the colours; early sentence use includes preferences such as `……喜欢红色。` and `……喜欢蓝色。`.
- **1B fruit link:** `红色的苹果。` This is the first clear use of colour as a descriptor.
- **2A extension:** colour + noun across objects and living things, including `黄色的苹果`, `黑色的猫`, `白色的狗`, `红色的金鱼`, `粉红色的鞋`; then `我喜欢橙色。`, `我喜欢粉红色。`, `我不喜欢黑色和白色。`.
- **2A body/face extension:** colour descriptions can attach to hair, eyes, nose, and mouth in a deliberately fictional drawing task; do not use this to imply real children should be sorted by colour.
- **Later required reuse:**
  - 2B stationery: `红色的剪刀`, `蓝色的橡皮`, `黄色的铅笔`, `粉红色的书`;
  - 3A/4B clothes: colour + clothing, with `穿` and `戴`;
  - 3B schoolbag: `黄色的铅笔`, `橙色的尺子`, `粉红色的彩色笔`, `蓝色的书包`;
  - 3B vegetables/food: use the food’s natural colour where the book does;
  - 4A transport: `黄色的校车`, `红色的出租车`;
  - 4B room: `粉红色的床`, `红色的自行车`, `黄色的书桌`, `橙色的椅子`, `白色的电脑`.
- **Useful-note requirement:** explicitly teach `颜色 + 的 + 名词`; the same rule must be reused in later pages instead of reintroduced as new vocabulary every time.

### Food — 1B L7, 2B L7, 3B L5–6, 4A L5 and L7

- **Fruit/snacks:** name concrete food and drink words first.
- **Preference:** `我喜欢吃……。` versus `我喜欢喝……。` The difference between eating and drinking must be semantic, not a blank-fill pattern.
- **Vegetables:** add vegetable nouns and natural-colour descriptions where useful.
- **Lunch:** `我中午吃……。` connects food to time of day.
- **Feeling/need:** `我饿了。` / `我渴了。` / `我想吃……。` / `我想喝……。`; `好吃。` belongs as a response to food.
- **Knowledge relationship:** food preference, meals, and hungry/thirsty are one progression; they should not be isolated pages with duplicated food cards.

### Toys, hobbies, and leisure — 2A L4–5, 3B L4, 4B L4 and L7

- **Toys:** concrete toy names and `这是我的……。`.
- **2A reading:** `我喜欢看书。` is the first personal-preference model.
- **3B hobbies:** add activity verbs and distinguish `我喜欢……` from `我会……`.
- **4B hobbies/leisure:** place the activity in time: `放学后……` and `周末……`; use preference/ability language in this wider context.
- **Useful-note requirement:** show that `喜欢` is what someone likes, while `会` means what someone can do. Do not collapse them into one “hobbies” word list.

### Clothes — 2A L6, 3A L7, 4B L2

- **2A:** dressing actions: `我会穿衣服。`, plus basic clothing and `穿` / `戴`.
- **3A:** describe a person’s outfit: `他（她）穿……。`; add colour + `的` clothing.
- **4B:** fuller clothing set, repeated colour descriptions, and the natural link from weather to what someone wears.
- **Knowledge relationship:** Weather supplies the reason; clothes supplies the response. Do not make the weather page and clothes page independent vocabularies.

### Weekdays, time, dates, birthdays, and routine — 2B L1–2, 3A L2–3, 4A L3–4

- **Weekdays:** `今天星期几？` / `今天星期……。`.
- **First clock:** `现在几点？` / `现在……点。`.
- **Dates:** `几月几号？` / `……月……号（日）。`.
- **Birthdays:** `生日快乐！` and `我的生日是……月……号。`.
- **Exact time:** add `……点零……分`, `一刻`, `半`, and time-of-day terms.
- **Routine:** apply exact time to actions: `……点起床。`, `……点刷牙。`, `……点去学校。`.
- **Useful-note requirement:** distinguish `今天星期……`, a calendar date, and a clock time. They are all “time” but answer different questions.

### School and location — 2B L3–4, 3B L1–3, 4B L5–6

- **Stationery:** `这是我的……。`; colour + `的` + object; appropriate measure words.
- **Classroom:** `教室里有……。`; introductory `……在……。`.
- **Schoolbag:** `书包里有……。` / `书包里没有……。`; `文具盒里有……。`.
- **Positions:** `A 在 B 上面 / 下面 / 里面 / 外面 / 前边 / 后边 / 左边 / 右边。`.
- **School:** `学校有……。` with its places.
- **Subjects:** `我喜欢……课。` / `我不喜欢……课。`; distinguish `去上……课` from `在上……课`.
- **Useful-note requirement:** keep three location frames distinct: `X 里有 Y`, `A 在 B + position`, and `学校有 X`.

### Describing things — 2B L6 and 3B L3

- **Size:** `……大。` / `……小。`; comparisons should use two comparable objects.
- **Position:** the location sequence above builds from concrete classroom/schoolbag objects, not abstract arrows alone.
- **Knowledge relationship:** descriptive words modify the familiar nouns from animals, school things, clothes, and rooms.

### Identity and languages — 3A L5 and 4A L2

- **Nationality:** `你是哪国人？` / `我是……人。`.
- **Language:** `你会说……吗？` / `我会说……。`.
- **Useful-note requirement:** country and language are different words and different sentence endings. A flag can support a country word but cannot substitute for the speaking scene.

### Transport — 4A L6

- **Means and destination:** `坐……去……。`, `骑……去……。`, `走路去……。`.
- **Useful-note requirement:** use the action that fits the vehicle; do not allow a sentence builder to generate nonsensical combinations.

### Nature — 3B L7

- **Place words:** `天上`, `地上`.
- **Sky nouns:** `太阳`, `星星`, `月亮`.
- **Ground nouns:** `树`, `花`, `草`.
- **Core frames:** `天上有……。` / `地上有……。`.
- **Extension:** `地上有绿树、红花和小草。` deliberately brings colour back as a useful descriptor.
- **Boundary:** this is a separate lesson from Weather. Nature answers what is in the sky/on the ground; Weather describes today’s conditions.

### Weather — 4B L1

- **Events:** `下雨了。`, `下雪了。`.
- **Conditions:** `今天很冷。`, `今天很热。`, `今天刮大风。`, `今天是晴天。`.
- **Useful notes:** `今天很 + adjective` describes a feeling/condition; `今天是 + weather noun` names the weather. Do not make `下 + weather + 了` a third generic note if it is already obvious in the scene cards.
- **Cross-book relationship:** Weather should hand off to 4B Clothes (`下雨了` → appropriate clothing). Colour is not part of the Weather lesson.

### Home and room — 4B L3

- **Core frame:** `房间里有……。`.
- **Extension:** furniture plus position language, connected to the 3B location lesson.
- **Colour reuse:** the room lesson explicitly provides a late, real-use setting for colour + `的` + object, including `白色的电脑`.

## Content decisions before any game design

For every topic page, write and approve this mini-contract first:

1. Book lesson(s) and new vocabulary.
2. The 2–4 sentence frames the page is responsible for.
3. What earlier frame or word the page intentionally reuses.
4. Scene list: each scene must make at least one complete sentence visible.
5. Useful notes: only generalizations that help the child produce a new sentence.
6. What knowledge would be confused if the page were reduced to flashcards.

Only after this is approved should we ask: what interaction would make *this particular knowledge* memorable? It may be a game, but it does not have to be, and the answer should not default to the same game type each time.
