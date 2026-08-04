# Learning Topic Coverage and Asset Plan

Last updated: 2026-08-03

This document is the planning layer between the OCR-backed curriculum audit and page production. It answers:

- which topics the learning site needs to cover
- which book lessons belong to each topic
- which topics already have usable assets
- which assets still need to be generated
- what workflow should be followed before building a new topic or book page

Primary sources:

- [series_audit.md](./series_audit.md)
- [curriculum_reference.json](./curriculum_reference.json)
- [asset_summary.md](./asset_summary.md)
- [structured_learning_content_refactor.md](./structured_learning_content_refactor.md)
- [topic_content_asset_matrix.md](./topic_content_asset_matrix.md)

## Core Principle

The books define curriculum coverage, but the child-facing site should be organized by topic.

The production model should be:

```text
OCR audit -> curriculum reference -> topic coverage plan -> asset plan -> structured data -> page build
```

Do not build a new page directly from memory. Start from `curriculum_reference.json`, confirm the lesson in the OCR text if needed, check existing assets, then create or update the structured topic data.

Current caveat: `curriculum_reference.json` has detailed progressions for `Numbers`, `Family`, `School`, `Food & Drinks`, and `Time & Date`, but it is not yet a complete topic index. Until it is expanded, use `series_audit.md` as the full book-by-book source for the remaining topics.

## Topic Taxonomy

The current OCR-backed curriculum buckets produce these topic areas:

- Numbers
- Greetings
- Polite Words
- Names & Introductions
- Age
- Family
- Body
- Pets & Animals
- Colours
- Food & Drinks
- Toys & Play
- Hobbies
- Clothes
- Time & Date
- School
- Describing Things
- Identity
- Nature
- Daily Life
- Weather

The app can group these into child-facing categories, but the structured data should preserve the individual topic areas so coverage is traceable.

## Recommended Category Structure

### 开口说中文 / Start Speaking

Purpose: first survival language and identity language.

Topics:

- Numbers
- Greetings
- Polite Words
- Names & Introductions
- Age
- Identity

Notes:

- `Identity` is currently partly folded into `introductions`.
- In structured content, keep `Identity` explicit because `3A Lesson 5 Nationality` and `4A Lesson 2 Languages` are not just name practice.

### 我和家人 / Me & Family

Purpose: self, family, body, and clothing.

Topics:

- Family
- Body
- Clothes

Notes:

- These are concrete and visual. They should each get focused topic pages.
- `Family` spans multiple books and should be treated as a priority topic after `Numbers`.

### 时间和日常 / Time & Daily Life

Purpose: calendar, clock, routine, home life, rooms, and movement.

Topics:

- Time & Date
- Daily Life
- Home & Rooms
- Transportation

Notes:

- `Home & Rooms` and `Transportation` currently sit inside `Daily Life`.
- In structured data, they can remain subtopics until they grow enough to need separate topic pages.

### 学校生活 / School Life

Purpose: objects, classroom, school places, subjects, and school routine.

Topics:

- School
- Stationery
- Classroom
- School Places
- School Subjects
- Positions

Notes:

- `Positions` comes from the OCR bucket `Describing Things`.
- It should probably live under `School Life` or `Time & Daily Life` visually, but remain traceable as `Describing Things` in lesson data.

### 食物 / Food

Purpose: fruit, snacks, vegetables, meals, hunger, and lunch choices.

Topics:

- Food & Drinks
- Fruit
- Snacks
- Vegetables
- Meals
- Hunger / Thirst

Notes:

- The current `food` topic should become a larger structured topic with stages.
- It has many existing assets and is a good candidate after `Numbers` and `Family`.

### 自然和颜色 / World Around Us

Purpose: animals, colours, weather, nature, and comparison language.

Topics:

- Pets & Animals
- Colours
- Weather
- Nature
- Describing Things

Notes:

- `Nature` appears in `3B Lesson 7`.
- `Describing Things` includes `Big or small` and `Positions`; these need explicit structured coverage even if the UI groups them under world/school/daily life.

### 兴趣和玩具 / Play & Hobbies

Purpose: toys, play, hobbies, leisure time, and preference language.

Topics:

- Toys & Play
- Hobbies
- Leisure Time

Notes:

- `Hobbies` appears across `2A`, `3B`, and `4B`; it needs progression rather than a single vocabulary list.

## Lesson Coverage Matrix

### Numbers

Lessons:

- `1A Lesson 1`: Numbers (1), 1-5
- `1A Lesson 2`: Numbers (2), 6-10
- `1A Lesson 3`: Numbers (3), 11-20
- `2A Lesson 1`: Numbers, 21-40
- `3A Lesson 1`: Numbers, 41-100
- `4A Lesson 1`: Telephone numbers

Existing assets:

- `assets/illustrated-counting/`
- `assets/illustrated-clocks/` for nearby number/time crossover

Asset needs:

- Number stage visuals for 1-5, 6-10, 11-20, 21-40, 41-100
- Telephone-number listening scene
- Reusable quantity visual system for random number games

Build priority: highest.

### Greetings

Lessons:

- `1A Lesson 4`: Hello!

Existing assets:

- `assets/greetings/`
- `assets/navigation-icons/lele-wave-icon.webp`
- recurring kid anchors in `assets/illustrated-kids/`

Asset needs:

- Teacher greeting scene
- Friend greeting scene
- Morning greeting scene
- Goodbye scene

Build priority: high.

### Polite Words

Lessons:

- `1A Lesson 5`: Thank you!
- `3A Lesson 6`: Request

Existing assets:

- `assets/polite/`
- `assets/illustrated-grammar/` for request patterns

Asset needs:

- Thank you / you are welcome exchange
- Sorry exchange
- Please / request exchange
- Classroom sharing or helping scene

Build priority: high.

### Names & Introductions

Lessons:

- `1A Lesson 6`: What's your name?
- `2A Lesson 3`: Good friends

Existing assets:

- `assets/introductions/`
- `assets/illustrated-identity/`
- `assets/illustrated-kids/`

Asset needs:

- Child self-introduction portraits
- Pair or group friend-introduction scene
- Name question / answer scene

Build priority: high.

### Age

Lessons:

- `1A Lesson 7`: I'm 5 years old

Existing assets:

- `assets/age/`
- `assets/illustrated-dates/` for birthday crossover

Asset needs:

- Age question and answer scene
- Grade-level question and answer scene
- Birthday candle or class-year visual

Build priority: high.

### Family

Lessons:

- `1B Lesson 1`: Mum and dad
- `1B Lesson 2`: Brothers and sisters
- `2A Lesson 2`: Two younger brothers
- `3A Lesson 4`: Family

Existing assets:

- `assets/illustrated-family/`
- family avatar images

Asset needs:

- Immediate family love scene
- Sibling contrast scene
- Extended family scene
- Family relationship matching assets

Build priority: highest after Numbers.

### Body

Lessons:

- `1B Lesson 3`: Parts of the body (1)
- `1B Lesson 4`: Parts of the body (2)

Existing assets:

- `assets/body/`

Asset needs:

- Full-body interactive figure
- Face detail / body detail states
- Optional action prompts: point, touch, wash, wear

Build priority: already a reference interaction pattern; preserve and modularize.

### Pets & Animals

Lessons:

- `1B Lesson 5`: Pets
- `2B Lesson 5`: Animals

Existing assets:

- `assets/illustrated-animals/`
- `assets/illustrated-pets/`

Asset needs:

- Pet home scene
- Zoo or animal group scene
- Animal matching cards

Build priority: medium.

### Colours

Lessons:

- `1B Lesson 6`: Colours
- `2A Lesson 7`: Colours

Existing assets:

- `assets/illustrated-colors/`
- `assets/illustrated-food/`
- `assets/illustrated-everyday-life/`

Asset needs:

- Basic colour board
- Colour-object matching cards
- Later review scene using multiple objects

Build priority: medium.

### Food & Drinks

Lessons:

- `1B Lesson 7`: Fruit
- `2B Lesson 7`: Snacks
- `3B Lesson 5`: Food and drink
- `3B Lesson 6`: Vegetables
- `4A Lesson 5`: My lunch
- `4A Lesson 7`: I'm hungry

Existing assets:

- `assets/illustrated-food/`
- `assets/illustrated-food-feelings/`
- `assets/illustrated-meals/`

Asset needs:

- Fruit board
- Snack board
- Food and drink board
- Vegetable board
- Lunch tray / choice scene
- Hunger / thirst scene

Build priority: high because assets are mostly present.

### Toys & Play

Lessons:

- `2A Lesson 4`: My toys

Existing assets:

- `assets/illustrated-toys/`
- `assets/navigation-icons/teddy-robot-icon.webp`

Asset needs:

- Toy shelf or playroom scene
- Toy matching cards

Build priority: medium.

### Hobbies

Lessons:

- `2A Lesson 5`: I love reading
- `3B Lesson 4`: Hobbies
- `4B Lesson 4`: Hobbies
- `4B Lesson 7`: Leisure time

Existing assets:

- `assets/illustrated-activities/`
- `assets/illustrated-actions-basic/`

Asset needs:

- Preference scenes: like / dislike
- Hobby group board
- Leisure-time scene
- Audio-first preference questions

Build priority: high because it repeats across books.

### Clothes

Lessons:

- `2A Lesson 6`: I can dress myself
- `3A Lesson 7`: Clothes
- `4B Lesson 2`: Clothes

Existing assets:

- `assets/illustrated-clothes/`
- `assets/illustrated-self-dressing/`
- `assets/illustrated-everyday-life/`

Asset needs:

- Dress myself sequence
- Clothing item board
- Weather-to-clothes scene

Build priority: high.

### Time & Date

Lessons:

- `2B Lesson 1`: Today is Monday
- `2B Lesson 2`: What time is it?
- `3A Lesson 2`: Date
- `3A Lesson 3`: Happy birthday!
- `4A Lesson 3`: Tell the time

Existing assets:

- `assets/illustrated-day-of-week/`
- `assets/illustrated-clock-routines/`
- `assets/illustrated-clocks/`
- `assets/illustrated-dates/`
- `assets/illustrated-months-of-year/`

Asset needs:

- Day-of-week board
- Clock reading board
- Date / calendar board
- Birthday date scene
- Routine time scene

Build priority: high.

### School

Lessons:

- `2B Lesson 3`: Stationery
- `2B Lesson 4`: My classroom
- `3B Lesson 1`: My schoolbag
- `3B Lesson 2`: Our classroom
- `4B Lesson 5`: Our school
- `4B Lesson 6`: School subjects

Existing assets:

- `assets/illustrated-classrooms/`
- `assets/illustrated-school-anchors/`
- `assets/illustrated-school-layouts/`
- `assets/illustrated-school-subjects/`
- `assets/illustrated-stationery/`
- `assets/illustrated-teachers/`

Asset needs:

- Stationery board
- Classroom object scene
- Schoolbag contents scene
- School places scene
- School subjects board
- Teacher / classroom routine scene

Build priority: high.

### Describing Things

Lessons:

- `2B Lesson 6`: Big or small
- `3B Lesson 3`: Positions

Existing assets:

- `assets/illustrated-comparisons/`
- `assets/illustrated-rooms/`
- `assets/illustrated-grammar/`

Asset needs:

- Big / small contrast scene
- Position scene: on, under, inside, outside, next to
- Object placement interactive visual

Build priority: medium-high because it supports many later sentences.

### Identity

Lessons:

- `3A Lesson 5`: Nationality
- `4A Lesson 2`: Languages

Existing assets:

- `assets/illustrated-flags/`
- `assets/illustrated-country-symbols/`
- `assets/illustrated-identity/`

Asset needs:

- Country / nationality board
- Language exchange scene
- Inclusive group of children speaking different languages

Build priority: medium.

### Nature

Lessons:

- `3B Lesson 7`: Nature

Existing assets:

- `assets/illustrated-weather/`
- `assets/illustrated-sky-day-night/`
- `assets/illustrated-animals/`

Asset needs:

- Nature board with sky, plants, animals, water, mountains
- Outdoor observation scene

Build priority: medium.

### Daily Life

Lessons:

- `4A Lesson 4`: Daily routine
- `4A Lesson 6`: Means of transport
- `4B Lesson 3`: My room

Existing assets:

- `assets/illustrated-clock-routines/`
- `assets/illustrated-transportation/`
- `assets/illustrated-rooms/`
- `assets/illustrated-furniture/`
- `assets/illustrated-everyday-life/`

Asset needs:

- Daily routine timeline
- Transport choices scene
- Room / furniture scene
- Sequence practice cards

Build priority: medium-high.

### Weather

Lessons:

- `4B Lesson 1`: It's raining

Existing assets:

- `assets/illustrated-weather/`
- `assets/illustrated-sky-day-night/`

Asset needs:

- Weather board
- Rainy day sentence scene
- Weather-to-clothes connection scene

Build priority: medium.

## Coverage Status

Use these status labels in topic data and planning docs:

- `built`: topic has a working page and interaction
- `partial`: topic has some vocabulary or UI but incomplete lesson coverage
- `asset-ready`: topic has most required assets but page is not built
- `needs-assets`: topic requires image generation before page work
- `planned`: topic exists in curriculum but has not been implemented

Initial rough status:

| Topic | Current status | Notes |
| --- | --- | --- |
| Numbers | built | Needs extraction into structured data and topic page pilot |
| Body | built | Treat as interaction reference pattern |
| Greetings | partial | Has interaction, should become standalone topic page |
| Polite Words | partial | Needs full request stage |
| Names & Introductions | partial | Needs identity split later |
| Age | partial | One lesson only, but interaction exists |
| Family | partial | Good candidate for second pilot |
| Food & Drinks | asset-ready | Many assets already exist |
| Time & Date | asset-ready | Many assets already exist |
| School | asset-ready | Many assets already exist |
| Hobbies | asset-ready | Many assets already exist |
| Clothes | asset-ready | Several assets already exist |
| Pets & Animals | asset-ready | Assets exist, page needs structure |
| Colours | asset-ready | Assets exist, page needs structure |
| Toys & Play | asset-ready | Assets exist, page needs structure |
| Daily Life | asset-ready | Assets exist but topic needs splitting decisions |
| Weather | asset-ready | Assets exist |
| Describing Things | planned | Needs explicit topic data |
| Identity | planned | Needs explicit topic data |
| Nature | planned | Needs explicit topic data |

## Asset Planning Workflow

Before building a topic page:

1. Read the topic lessons in `curriculum_reference.json`.
2. Check the relevant OCR text if the lesson goal is unclear.
3. Check `asset_summary.md` and relevant `assets/*/manifest.json` files.
4. Classify each needed visual as one of:
   - `existing`
   - `existing-but-needs-cropping-or-compression`
   - `needs-generation`
   - `not-needed`
5. Write or update the topic asset checklist.
6. Generate only missing visuals.
7. Add generated assets to the proper folder with a manifest entry.
8. Refresh `asset_summary.md` with `node scripts/generate_asset_summary.mjs`.
9. Build or update the topic page.
10. Verify desktop and mobile layout.

## Topic Asset Checklist Shape

Every topic should eventually have an asset checklist like this:

```js
{
  topicId: "family",
  heroAsset: "assets/illustrated-family/family-scene-parents-love.webp",
  vocabularyAssets: [
    "assets/illustrated-family/family-avatar-mom.webp",
    "assets/illustrated-family/family-avatar-dad.webp"
  ],
  sceneAssets: [
    "assets/illustrated-family/family-scene-siblings.webp"
  ],
  generatedNeeded: [
    "extended-family-scene",
    "family-question-answer-scene"
  ],
  reusableTemplates: [
    "listen-and-choose",
    "match-phrase-to-person"
  ]
}
```

This should live in structured data once the refactor starts, not only in prose.

## Page Production Workflow

For each topic:

1. Create or update the topic data record.
2. Create lesson records for every book lesson in that topic.
3. Map vocabulary and sentence patterns to each lesson.
4. Map existing assets to vocabulary and scene needs.
5. Generate missing assets only after the checklist is clear.
6. Build the topic page using the shared topic renderer.
7. Link book lesson pages into the topic page with `?lesson=`.
8. Add display controls and audio behavior through shared code.
9. Test topic entry, book entry, direct URL entry, and back navigation.
10. Mark the topic status in the coverage table.

For each book:

1. Create or update the book data record.
2. Confirm all seven lesson records exist.
3. Link each lesson to a topic page and lesson state.
4. Keep book pages as lookup pages; do not duplicate full topic practice UI.
5. Verify every lesson card opens the intended topic and lesson.

## Recommended Build Order

Use this order to maximize coverage and reduce architectural risk:

1. Numbers
2. Family
3. Food & Drinks
4. Time & Date
5. School
6. Hobbies
7. Clothes
8. Greetings / Polite Words / Names & Introductions / Age cleanup
9. Pets & Animals
10. Colours
11. Daily Life
12. Describing Things
13. Identity
14. Weather
15. Nature
16. Toys & Play

Reasoning:

- `Numbers` proves multi-book progression and query-param lesson state.
- `Family` proves image-rich dialogue and matching patterns.
- `Food`, `Time`, and `School` have strong existing asset coverage.
- `Describing Things`, `Identity`, and `Nature` need explicit topic decisions before asset generation.

## Data Files To Create First

Start with these files:

```text
data/learning/topic-categories.js
data/learning/topics.js
data/learning/book-categories.js
data/learning/books.js
data/learning/lessons.js
data/learning/topic-assets.js
data/learning/coverage-status.js
```

Keep them small and explicit. Do not hide curriculum relationships inside renderer logic.

## Quality Gates

Before a topic is considered ready:

- Every mapped book lesson opens correctly.
- Every required vocabulary item has Chinese, tone-mark pinyin, English, and audio text.
- Every visual has a manifest entry or is clearly marked as not needed.
- The topic works from topic navigation and book navigation.
- Pinyin and English controls apply across the page.
- The page has no related-content block at the end.
- Mobile layout has no overlapping text or oversized cards.
- The topic status is updated in the coverage table.
