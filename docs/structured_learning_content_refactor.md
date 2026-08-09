# Structured Learning Content Refactor Plan

> Superseded for implementation by [app_js_modular_refactor.md](./app_js_modular_refactor.md). This document records the earlier multi-page, no-build proposal and is retained for historical context.

Last updated: 2026-08-03

This plan moves `Learn by Topic` and `Learn by Books` from one large `app.js` content model toward a culture-like structure with real URLs, structured content files, and shared rendering.

The goal is easier debugging and safer iteration without copying the same lesson UI into dozens of hand-written pages.

## Current Problem

The current learning app has the right user-facing information architecture:

- `Learn by Topic`: categories -> topics -> lesson detail
- `Learn by Books`: stages -> books -> lessons -> lesson detail
- `Culture`: categories -> story pages

The difference is implementation:

- `culture` uses a real directory tree and independent story pages.
- learning topics and books are still mostly data and rendering branches inside `app.js`.

This makes isolated debugging harder. A small issue in one topic can require reading a large shared file with unrelated topic data, book data, games, rendering, state, and navigation logic.

## Target Architecture

Use a structured static-site model:

```text
data/
  learning/
    topic-categories.js
    topics.js
    book-categories.js
    books.js
    lessons.js

topics/
  index.html
  numbers/index.html
  greetings/index.html
  family/index.html

books/
  index.html
  1a/index.html
  1b/index.html
  2a/index.html

shared/
  learning.css
  learning-data.js
  learning-page.js
  learning-audio.js
  learning-games.js
```

The exact folder names can change, but the ownership should stay clear:

- `data/learning/*` owns content and curriculum relationships.
- `topics/*` owns topic entry pages and focused topic practice pages.
- `books/*` owns book lookup pages.
- `shared/*` owns reusable rendering, audio, and interaction behavior.

## Content Model

### Topic Categories

Top-level categories for the child-facing route.

```js
export const topicCategories = [
  {
    id: "foundations",
    zhTitle: "开口说中文",
    enTitle: "Start Speaking",
    hint: "Numbers, greetings, names, age",
    accent: "#be5b49",
    icon: { type: "image", src: "/assets/navigation-icons/lele-wave-icon.webp" },
    topicIds: ["numbers", "greetings", "polite-words", "introductions", "age"]
  }
];
```

### Topics

Topic pages should answer: what does the child want to learn?

```js
export const topics = [
  {
    id: "numbers",
    categoryId: "foundations",
    zhTitle: "数字",
    enTitle: "Numbers",
    route: "/topics/numbers/",
    summary: "Counting, listening, reading, and number use.",
    defaultLessonId: "1a-1",
    lessonIds: ["1a-1", "1a-2", "1a-3", "2a-1", "3a-1", "4a-1"],
    practiceTemplate: "numbers",
    assets: {
      hero: "/assets/illustrated-counting/ten-yellow-ducks.webp"
    }
  }
];
```

### Book Categories

Top-level stages for the adult / homework route.

```js
export const bookCategories = [
  {
    id: "first-steps",
    zhTitle: "第一阶段",
    enTitle: "First Steps",
    hint: "Book 1A and 1B",
    bookIds: ["1a", "1b"]
  }
];
```

### Books

Book pages should answer: which textbook lesson does the adult need?

```js
export const books = [
  {
    id: "1a",
    label: "Book 1A",
    categoryId: "first-steps",
    route: "/books/1a/",
    lessonIds: ["1a-1", "1a-2", "1a-3", "1a-4", "1a-5", "1a-6", "1a-7"]
  }
];
```

### Lessons

Lessons should be the bridge between book lookup and topic practice.

```js
export const lessons = [
  {
    id: "1a-1",
    bookId: "1a",
    lessonNumber: 1,
    title: "Numbers (1)",
    topicId: "numbers",
    route: "/topics/numbers/?lesson=1a-1",
    practiceStageId: "numbers-1-to-5",
    vocabularyIds: ["number-1", "number-2", "number-3", "number-4", "number-5"]
  }
];
```

## URL Strategy

Use real URLs for stable entry points:

- `/topics/`
- `/topics/numbers/`
- `/topics/family/`
- `/books/`
- `/books/1a/`
- `/books/2b/`

Use query params only for substate inside a page:

- `/topics/numbers/?lesson=1a-3`
- `/topics/family/?lesson=1b-2`

Do not create one standalone HTML file per lesson at first. A lesson is usually a state of a topic page, not a completely separate content type. Creating topic pages first gives most of the debugging benefit with less duplication.

## Shared Rendering

Create shared renderers instead of copying page markup:

- `renderTopicIndex(categories, topics)`
- `renderBookIndex(bookCategories, books, lessons)`
- `renderTopicPage(topic, lesson, data)`
- `renderBookPage(book, lessons)`
- `renderDisplayControls(state)`

Topic-specific practice can stay modular:

- `renderNumbersPractice(topic, lesson, state)`
- `renderFamilyPractice(topic, lesson, state)`
- `renderGreetingsPractice(topic, lesson, state)`

This keeps the code searchable by topic while preserving shared layout and controls.

## Migration Plan

### Phase 1: Extract Data

Move the current hard-coded data out of `app.js`:

- `topicData` -> `data/learning/topics.js`
- `books` -> `data/learning/books.js`
- `learningHomeCategories` -> `data/learning/topic-categories.js`
- `bookHomeCategories` -> `data/learning/book-categories.js`
- book lesson records -> `data/learning/lessons.js`

Keep `index.html` working during this phase. It should import data modules and render the same UI.

Exit criteria:

- `app.js` no longer contains the large topic and book datasets.
- The current main page still works.
- `node --check` passes for all learning JS modules.

### Phase 2: Split Index Pages

Create real index pages:

- `topics/index.html`
- `books/index.html`

The main `index.html` can become a small entrance page or redirect-style hub, but it should not own all learning content.

Exit criteria:

- Topic browsing works from `/topics/`.
- Book browsing works from `/books/`.
- The global hamburger menu links to `/topics/`, `/books/`, and `/culture/`.

### Phase 3: Split Topic Pages

Create one page per stable topic:

- `topics/numbers/index.html`
- `topics/greetings/index.html`
- `topics/family/index.html`
- `topics/time-date/index.html`

Each topic page loads the shared renderer and topic-specific practice module.

Exit criteria:

- Topic URLs are direct and bookmarkable.
- A topic bug can usually be debugged from its topic page and its practice module.
- Topic pages still share display controls, audio behavior, and page layout.

### Phase 4: Split Book Pages

Create one page per book:

- `books/1a/index.html`
- `books/1b/index.html`
- `books/2a/index.html`

Book pages list lessons and link into topic pages with the correct `lesson` query param.

Exit criteria:

- A parent can open `/books/1a/`, choose Lesson 3, and land at `/topics/numbers/?lesson=1a-3`.
- Book pages do not duplicate topic practice UI.

### Phase 5: Reduce Legacy App Shell

Once the split pages are stable:

- Keep `app.js` only as a compatibility shell if needed.
- Move shared behavior into `shared/learning-page.js`.
- Remove rendering branches that are no longer used by the split pages.

Exit criteria:

- No large content arrays remain in `app.js`.
- The old single-page state restoration logic is no longer needed for normal navigation.
- The learning app can be debugged by page, data file, and practice module.

## Debugging Rules

Use this ownership model when debugging:

- Directory or URL bug: check `topics/*/index.html` or `books/*/index.html`.
- Wrong curriculum mapping: check `data/learning/lessons.js`.
- Wrong topic grouping: check `data/learning/topic-categories.js`.
- Wrong book grouping: check `data/learning/book-categories.js`.
- Wrong vocabulary or phrase content: check the topic data and lesson data.
- Broken shared UI: check `shared/learning-page.js` and `shared/learning.css`.
- Broken topic-specific interaction: check the topic practice module.

## Non-Goals

Do not do these in the first pass:

- Do not hand-copy the full lesson UI into every lesson page.
- Do not create separate HTML pages for every lesson unless a lesson becomes truly unique.
- Do not move culture into the learning data model.
- Do not introduce a build system unless plain static modules become too hard to maintain.
- Do not rewrite all games while extracting the data.

## Recommended First Slice

Start with `Numbers`, because it already spans multiple books and exposes the hardest routing problem.

First slice:

1. Extract number topic data and book lesson mapping.
2. Create `topics/index.html`.
3. Create `topics/numbers/index.html`.
4. Create `books/index.html`.
5. Link `Book 1A Lesson 1`, `1A Lesson 2`, and `1A Lesson 3` to `/topics/numbers/?lesson=1a-1`, `/topics/numbers/?lesson=1a-2`, and `/topics/numbers/?lesson=1a-3`.

This proves the architecture before migrating every topic.

## Validation Checklist

Before committing each phase:

- Run `node --check` on changed JS files.
- Run `git diff --check`.
- Open the affected page locally.
- Verify desktop and mobile widths.
- Verify direct URL entry works.
- Verify back/forward navigation is understandable.
- Verify topic and book routes do not duplicate the same lesson-end related links.
- Verify pinyin, English, and sound controls still apply to the intended page area.
