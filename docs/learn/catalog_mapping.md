# Learn Chinese Two-Level Catalog Mapping

Status: implemented in `learn.html`. The eight existing main catalogs, all 43 learning topics, and their page routes are preserved.

## Structure

- The eight large cards remain the main catalogs.
- A second-level catalog is added only where a main catalog contains several distinct clusters of topics.
- `Chinese 101` and `Food` remain direct topic lists because each has only three closely related entries.
- Selecting a second-level catalog filters the topic cards beneath it.
- The landing-page hash records `#main-catalog/subcatalog` when a second level exists. Topic pages return to that exact selection.
- Every second-level catalog contains at least two topics; there are no artificial one-topic wrappers.

## Main catalogs and second-level catalogs

### 1. 汉语一零一 · Chinese 101 (`special-topics`)

No second level. The three foundational tools remain directly visible:

- 汉语拼音 · Pinyin
- 笔画 · Chinese Strokes
- 象形文字 · Pictographic Characters

### 2. 开口说中文 · Start Speaking (`foundations`)

| Second-level catalog | Topics |
|---|---|
| 数字与口诀 · Numbers & Number Rhyme (`numbers-rhyme`) | Numbers; Multiplication Rhyme |
| 日常交流 · Everyday Conversation (`everyday-conversation`) | Greetings; Polite Words |
| 介绍自己 · About Me (`about-me`) | Introductions; Age; Nationality; Languages |

### 3. 我和家人 · Me & Family (`me-family`)

| Second-level catalog | Topics |
|---|---|
| 我的家人 · My Family (`family-members`) | My Family 1; My Family 2 |
| 身体与衣服 · Body & Clothes (`body-clothes`) | Body; Clothes |

### 4. 时间和日常 · Time & Daily Life (`time-daily`)

| Second-level catalog | Topics |
|---|---|
| 星期、时间与日期 · Week, Time & Dates (`calendar-time`) | Days of the Week; Time & Routines; Dates & Months |
| 描述、位置与方向 · Descriptions & Directions (`descriptions-directions`) | Descriptions & Comparisons; Positions & Directions |
| 日常生活与出行 · Daily Life & Getting Around (`daily-life-travel`) | Transportation; My Room; Everyday Actions |
| 日常问句 · Everyday Questions (`everyday-questions`) | Requests & Permission; Is It? |

### 5. 学校生活 · School Life (`school-life`)

| Second-level catalog | Topics |
|---|---|
| 文具与书包 · School Things (`school-things`) | My Stationery; Stationery & Backpack |
| 教室与学校 · Classroom & School (`classroom-school`) | Classroom; Our School; School Subjects |

### 6. 食物 · Food (`food`)

No second level. The three food topics remain directly visible:

- 食物和饮料 · Food & Drinks
- 喜欢和不喜欢 · Food Preferences
- 午饭和感觉 · Meals & Feelings

### 7. 自然和颜色 · Nature & Colors (`world`)

| Second-level catalog | Topics |
|---|---|
| 自然、天气与颜色 · Nature, Weather & Colours (`nature-weather-colours`) | Nature; Weather; Colours |
| 宠物与动物园 · Pets & Zoo Animals (`pets-zoo-animals`) | Pets; Zoo Animals |

### 8. 兴趣和玩具 · Play & Hobbies (`play`)

| Second-level catalog | Topics |
|---|---|
| 玩具与居家爱好 · Toys & At-Home Fun (`toys-home-fun`) | Toys; Hobbies at Home |
| 兴趣与活动 · Interests & Activities (`interests-activities`) | What I Like; Music & Movement; Leisure Time |

## Classification notes

The main-catalog assignments remain unchanged. This avoids moving familiar material while making the larger categories easier to scan.

- `Requests & Permission` and `Is It?` stay under Time & Daily Life and are grouped as everyday questions.
- `My Family 2` keeps its legacy internal ID, `telephone-numbers`, but remains visibly grouped with My Family 1.
- Colours stays under Nature & Colors and is grouped with the observable natural world.
