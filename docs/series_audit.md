# Easy Steps to Chinese for Kids Series Audit

Last updated: 2026-06-13

Purpose: preserve textbook audit knowledge locally so future sessions can build from OCR-backed notes instead of starting over.

## Audit Scope

This file tracks:

1. The content each book teaches
2. The recurring practice formats
3. The visual / illustration style
4. The recurring character names
5. Important cross-book structure notes for website information architecture

## Important Product Notes

- Treat the books as curriculum alignment, not as assets to copy.
- Child-facing organization should likely be by `topic`, with progressive steps aligned to the book sequence.
- Teacher / parent-facing views should still expose `book -> lesson` alignment.
- Use tone-mark pinyin in product content.
  - Example: `yī, èr, sān, sì, wǔ`
  - Not: `yi, er, san, si, wu`
- Do not reuse textbook illustrations or named child characters directly.

## Source Notes

OCR text for all 8 books is stored in:

- `docs/ocr/轻松学中文少儿版1a.txt`
- `docs/ocr/轻松学中文少儿版1b.txt`
- `docs/ocr/轻松学中文少儿版2a.txt`
- `docs/ocr/轻松学中文少儿版2b.txt`
- `docs/ocr/轻松学中文少儿版3a.txt`
- `docs/ocr/轻松学中文少儿版3b.txt`
- `docs/ocr/轻松学中文少儿版4a.txt`
- `docs/ocr/轻松学中文少儿版4b.txt`

## Series-Level Notes

Observed from OCR intro pages and repeated lesson structure:

- The series is designed for total beginners, especially children from non-Chinese backgrounds.
- Listening and speaking are the primary goals throughout the series.
- Character recognition and writing are introduced progressively rather than all at once.
- Each lesson includes a song using the new words and sentences.
- Chinese culture appears in a dedicated section in every book.
- The books use games, colouring, tracing, drawing, matching, and craft-like tasks to maintain engagement.
- `3a` introduces pinyin systematically.
- `4a` and `4b` shift from learning pinyin to reviewing pinyin and learning radicals more explicitly.
- The series consists of 8 books across 4 levels: `1a`, `1b`, `2a`, `2b`, `3a`, `3b`, `4a`, `4b`.

## Practice Format Patterns

### Stable Core Pattern in Early Books

The early books repeatedly use this lesson flow:

- `Let's learn new words`
- `Let's practise`
- `Let's use new words`
- `Let's sing`
- `Let's say it`
- `Let's write`
- `Let's play`
- `Let's try it`
- `It's time to work`

This pattern is clearly present across `1a`, `1b`, `2a`, and `2b`.

### Skill Expansion in Later Books

From `3a` onward, the books add literacy support more explicitly:

- `Let's learn pinyin`
- `Let's learn simple characters`
- `Listening Scripts`

From `4a` onward, the books shift again:

- `Let's review pinyin`
- `Let's learn radicals`
- `It's time to listen`
- `Listening Scripts`

### Recurring Exercise Types

Observed exercise styles across the series:

- picture-supported vocabulary introduction
- Chinese + English pairing
- Chinese + English + pinyin presentation in later books
- counting and saying aloud
- short dialogues
- sentence substitution
- matching pictures to words
- matching Chinese to English meanings
- tracing strokes
- tracing and copying characters
- tracing and copying radicals
- listening and choosing pictures or answers
- describing time, dates, positions, routines, and objects
- songs for memorization
- game-based reinforcement

### Product Implication

The website should not be a passive reader. It should support:

- tap-to-hear audio
- picture-supported matching
- speaking/listening style prompts
- tracing or trace-like practice later
- progressive difficulty by topic
- lively interactive scenes that make vocabulary feel playful and physically explorable
- large touch-friendly targets instead of small precision-dependent controls
- visual feedback that clearly shows the currently active word or concept
- parent-friendly supervision patterns so non-Chinese-speaking adults can still help

Reference implementation note:

- the `Body` topic refactor in the live site should be treated as the current tone-setting pattern for the project
- future topic interactions should aim for the same mix of:
  - original illustration
  - touch-first interaction
  - audio-first support
  - obvious visual response
  - child-friendly play rather than passive content display

## Illustration Style Notes

General style across the series:

- colorful, playful, hand-drawn illustrations
- soft outlines
- watercolor or colored-pencil feel
- child-friendly, non-realistic proportions
- recurring cartoon children in everyday scenes
- strong use of object-centered picture panels for vocabulary
- workbook-like layouts with borders, frames, and activity boxes

Design implication for the website:

- keep the warmth and friendliness
- avoid copying the original drawings directly
- use original illustrations with simple shapes and strong semantic clarity
- make visuals instructional first and decorative second
- prefer touch-friendly icons and tappable picture cards over small mouse-dependent targets
- make topic illustrations inclusive across skin tones, hair textures, hair styles, and child appearance
- avoid implying that one look is the default for "American kids learning Chinese"

## Recurring Character Names

Confirmed from OCR:

- `京京` / `jīng jing`
- `丁一` / `dīng yī`
- `田力` / `tián lì`
- `乐乐` / `lè le`
- `兰兰` / `lán lan`
- `豆豆` / `dòu dou`

Additional names also appear in example content, such as `小红`, but the six above appear to function more like a recurring child cast.

OCR examples:

- In `1a`, self-introduction lines include `wǒ jiào jīng jing`, `wǒ jiào dīng yī`, and `wǒ jiào tián lì`.
- In `1b`, the same names are reused in family, body, pets, colours, and fruit contexts.
- In `2a`, `2b`, `4a`, and `4b`, names such as `jīng jing`, `tián lì`, `lán lan`, and `dòu dou` continue to appear in example dialogue and practice lines.

Product implication:

- treat these as textbook continuity references only
- do not reuse these names directly in the website
- create an original cast with a similar educational function

## Book-by-Book Curriculum Map

### Book 1A

Main topics:

1. `Numbers (1)` - `1-5`
2. `Numbers (2)` - `6-10`
3. `Numbers (3)` - `11-20`
4. `Hello!`
5. `Thank you!`
6. `What's your name?`
7. `I'm 5 years old`
8. Culture: `Mid-Autumn Festival`

Key notes:

- very strong beginner speaking foundation
- heavy use of picture support
- early stroke and simple character awareness

### Book 1B

Main topics:

1. `Mum and dad`
2. `Brothers and sisters`
3. `Parts of the body (1)`
4. `Parts of the body (2)`
5. `Pets`
6. `Colours`
7. `Fruit`
8. Culture: `Chinese New Year`

Key notes:

- expands from self and counting into family and concrete nouns
- still strongly picture-based

### Book 2A

Main topics:

1. `Numbers` - `21-40`
2. `Two younger brothers`
3. `Good friends`
4. `My toys`
5. `I love reading`
6. `I can dress myself`
7. `Colours`
8. Culture: `The story of Nian`

Key notes:

- continues number progression
- introduces more sentence-based daily-life language

### Book 2B

Main topics:

1. `Today is Monday`
2. `What time is it?`
3. `Stationery`
4. `My classroom`
5. `Animals`
6. `Big or small`
7. `Snacks`
8. Culture: `Dragon Boat Festival`

Key notes:

- school life and time concepts become more important
- comparison language begins to matter more

### Book 3A

Main topics:

1. `Numbers` - `41-100`
2. `Date`
3. `Happy birthday!`
4. `Family`
5. `Nationality`
6. `Request`
7. `Clothes`
8. Culture: `Beijing Opera`

Key notes:

- pinyin is introduced systematically
- social and biographical language expands

### Book 3B

Main topics:

1. `My schoolbag`
2. `Our classroom`
3. `Positions`
4. `Hobbies`
5. `Food and drink`
6. `Vegetables`
7. `Nature`
8. Culture: `The Twelve Zodiac Animals`

Key notes:

- spatial language and school vocabulary deepen
- topic variety broadens noticeably

### Book 4A

Main topics:

1. `Telephone numbers`
2. `Languages`
3. `Tell the time`
4. `Daily routine`
5. `My lunch`
6. `Means of transport`
7. `I'm hungry`
8. Culture: `Four Treasures of the Study`

Key notes:

- functional daily-life communication becomes stronger
- routines and practical use cases increase

### Book 4B

Main topics:

1. `It's raining`
2. `Clothes`
3. `My room`
4. `Hobbies`
5. `Our school`
6. `School subjects`
7. `Leisure time`
8. Culture: `The Chinese Painting`

Key notes:

- home, weather, school, and free-time language broaden the child world
- later practice expects more independent recall

## Repetition / Progression Notes

Themes that clearly recur across books:

- numbers
- greetings and polite speech
- names and self-introduction
- age and personal facts
- family
- colours
- school objects and classroom life
- food
- hobbies
- clothes
- time

This means a topic-first product structure is more useful than a book-only structure.

### Suggested Child-Facing Topic Buckets

- `Numbers`
- `Greetings`
- `Polite Words`
- `Names & Introductions`
- `Age`
- `Family`
- `Body`
- `Pets & Animals`
- `Colours`
- `Toys & Play`
- `Food & Drinks`
- `Time & Date`
- `School`
- `Clothes`
- `Hobbies`
- `Weather`
- `Nature`
- `Culture`

### Best Product Interpretation

Each topic should progress across books instead of restarting from zero each time.

Example:

- `Numbers`
  - `1A`: `1-5`
  - `1A`: `6-10`
  - `1A`: `11-20`
  - `2A`: `21-40`
  - `3A`: `41-100`
  - `4A`: `telephone numbers`
- `Family`
  - `1B`: `mum and dad`
  - `1B`: `brothers and sisters`
  - `2A`: `younger brothers / siblings`
  - `3A`: `family`
- `School`
  - `2B`: `stationery`
  - `2B`: `my classroom`
  - `3B`: `my schoolbag`
  - `3B`: `our classroom`
  - `4B`: `our school`
  - `4B`: `school subjects`

This supports both:

- child-facing progression by topic
- teacher / parent lookup by book and lesson

## Website Planning Implications

Recommended architecture:

- child-facing home should lead with topics, not book numbers
- teacher / parent area should provide `book -> lesson` lookup
- every activity should be touch-friendly first
- audio should be first-class, not optional
- culture content should appear as short unlockable side paths, not long reading blocks
- repeated textbook patterns can become repeatable website activity templates

Good candidate templates:

- tap the picture to hear the word
- match Chinese to picture
- match English to Chinese
- listen and choose
- build the phrase
- say it after me
- trace later, not first

## Recommended Next Build Step

Use this audit together with `curriculum_reference.json` to design:

1. the site information architecture
2. a topic progression model
3. reusable activity components
4. an original visual and character system
