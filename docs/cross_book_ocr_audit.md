# Cross-book OCR audit

Last reviewed: 2026-08-25
Source of truth: [`ocr/`](./ocr/) text, with the lesson-title sequence cross-checked against [`curriculum_reference.json`](./curriculum_reference.json). The app navigation is checked against this record; assets, historical coverage maps, and existing page names do not override it.

## Tagging rules

- A **book lesson tag** is the exact OCR book, lesson number, canonical OCR title, and OCR/PDF page range.
- `book_lesson_page_tags.json` is the page-boundary source. Every non-lesson page is explicitly tagged as front matter, culture, vocabulary, or listening-script material rather than silently assigned to the neighbouring lesson.
- A page may contain broader enrichment, but its `book` tags must name only the lesson it actually covers.
- An enrichment-only topic such as **Is It?** and **九九乘法** has no book lesson tag.

## Canonical lesson map

### Book 1A

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–14 | 1 | Numbers (1) | `numbers` |
| 15–26 | 2 | Numbers (2) | `numbers` |
| 27–38 | 3 | Numbers (3) | `numbers` |
| 39–50 | 4 | Hello! | `greetings` |
| 51–62 | 5 | Thank you! | `polite-words` |
| 63–74 | 6 | What's your name? | `introductions` |
| 75–86 | 7 | I'm 5 years old | `age` |

### Book 1B

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–14 | 1 | Mum and dad | `family` |
| 15–26 | 2 | Brothers and sisters | `family` |
| 27–38 | 3 | Parts of the body (1) | `body` |
| 39–50 | 4 | Parts of the body (2) | `body` |
| 51–62 | 5 | Pets | `pets` |
| 63–74 | 6 | Colours | `colours` |
| 75–86 | 7 | Fruit | `food` |

### Book 2A

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–14 | 1 | Numbers | `numbers` |
| 15–26 | 2 | Two younger brothers | `family` |
| 27–38 | 3 | Good friends | `introductions` |
| 39–50 | 4 | My toys | `toys` |
| 51–62 | 5 | I love reading | `hobbies` |
| 63–74 | 6 | I can dress myself | `clothes` |
| 75–86 | 7 | Colours | `colours` |

### Book 2B

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–14 | 1 | Today is Monday | `weekdays` |
| 15–26 | 2 | What time is it? | `time-date` |
| 27–38 | 3 | Stationery | `stationery` |
| 39–50 | 4 | My classroom | `classroom` |
| 51–62 | 5 | Animals | `animals` |
| 63–74 | 6 | Big or small | `comparisons` |
| 75–86 | 7 | Snacks | `food` |

### Book 3A

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–16 | 1 | Numbers | `numbers` |
| 17–30 | 2 | Date | `dates` |
| 31–44 | 3 | Happy birthday! | `dates` |
| 45–58 | 4 | Family | `family` |
| 59–72 | 5 | Nationality | `identity` |
| 73–86 | 6 | Request | `requests-permission` |
| 87–100 | 7 | Clothes | `clothes` |

### Book 3B

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 11–24 | 1 | My schoolbag | `school-supplies` |
| 25–38 | 2 | Our classroom | `classroom` |
| 39–52 | 3 | Positions | `positions` |
| 53–66 | 4 | Hobbies | `hobbies-3b` |
| 67–80 | 5 | Food and drink | `food-preferences` |
| 81–94 | 6 | Vegetables | `food` |
| 95–108 | 7 | Nature | `nature` |

### Book 4A

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–16 | 1 | Telephone numbers | `telephone-numbers` |
| 17–30 | 2 | Languages | `languages` |
| 31–44 | 3 | Tell the time | `time-date` |
| 45–58 | 4 | Daily routine | `time-date` |
| 59–72 | 5 | My lunch | `meals-feelings` |
| 73–86 | 6 | Means of transport | `transport` |
| 87–100 | 7 | I'm hungry | `meals-feelings` |

### Book 4B

| OCR pages | Lesson | Canonical title | App topic |
| --- | --- | --- | --- |
| 3–16 | 1 | It's raining | `weather` |
| 17–30 | 2 | Clothes | `clothes` |
| 31–44 | 3 | My room | `daily-life` |
| 45–58 | 4 | Hobbies | `hobbies-at-home` |
| 59–72 | 5 | Our school | `school` |
| 73–86 | 6 | School subjects | `school-subjects` |
| 87–100 | 7 | Leisure time | `hobbies-leisure` |

## Audit result

All 56 textbook lessons have one exact title-and-lesson mapping in `src/data/curriculum.js`. There are no unmapped textbook lessons and no current navigation title that differs from the OCR/reference title.

The following are intentionally **not** textbook lesson mappings: `is-it`, `multiplication-rhyme`, and `everyday-actions`. They remain visible as enrichment and must keep that label.

## Content coverage to verify next

This audit found no missing lesson *route*. The remaining work is to verify lesson-language coverage, not to create duplicate topic pages:

1. **Pets (1B Lesson 5):** no new ownership/counting frame is needed. The OCR pages use `喜欢` with cats, dogs, turtles, and goldfish; the existing lesson already covers that book frame.
2. **Requests (3A Lesson 6):** the cola/water scene now covers the OCR’s `我可以…吗？ / 不行 / 可以 / 喝水` core; finish visual review and keep TV/teacher scenes tagged as enrichment.
3. **Existing partial contracts:** their status often records visual QA or deliberate scope limits, not a missing textbook lesson. Review each against the canonical map before creating any new topic.
4. **Culture/appendix pages:** all are page-tagged as non-lesson material in the source map. They need a separate content-alignment decision; do not attach them to the closest language lesson by default.
