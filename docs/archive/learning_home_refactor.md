# Learning Home Refactor Plan

Last updated: 2026-08-02

This document records the design direction for refactoring the main learning app home. The goal is to make the CSL learning experience feel as polished and release-ready as the current culture index while keeping topic navigation and book navigation clearly separate.

## Core Decision

The main page should become a learning home, not a marketing landing page and not a dashboard.

The finished app should have two clean entrances:

- `Learn by Topic`: the child-facing path.
- `Find by Book`: the parent / teacher / homework path.

These routes can point to the same learning content, but they should not be mixed together in the first-level navigation.

## Reference Experience

Use [culture/index.html](../culture/index.html) and [culture/styles.css](../culture/styles.css) as the design reference.

The culture page feels more release-ready because it has:

- A clear bilingual hero.
- A visual category board near the top.
- Large, scannable cards with Chinese and English labels.
- Anchored sections below the card board.
- A sticky horizontal nav that appears after scrolling.
- Simple page mechanics: tap a card, jump to a section, choose a story.
- No mixed navigation model.

The learning home should borrow that structure, but use CSL learning topics and generated topic assets instead of culture categories and emoji.

## Target Information Architecture

### Learn by Topic

This is the default child-facing experience.

It should show a visual topic map with large touch targets. A young child using an iPad should be able to find `时间` by recognizing a clock/time image, not by typing, filtering, or carefully scanning long text.

Topic cards should include:

- Chinese-first topic name.
- Small English support label.
- A clear generated image or strongly recognizable icon-like illustration.
- Optional short hint text, only if it helps recognition.

The topic board should avoid book metadata on the card. Book alignment belongs inside the selected topic detail, lower on the page, where parents and teachers can use it.

Recommended topic card examples:

- `数字` / Numbers: counting blocks, fingers, or number cards.
- `时间` / Time: clock, calendar, morning / afternoon cues.
- `家人` / Family: family scene.
- `学校` / School: classroom or school building.
- `天气` / Weather: sun, cloud, rain, snow.
- `食物` / Food: meal table or food items.
- `动物` / Animals: animal group.
- `颜色` / Colors: paint, crayons, or colorful objects.

### Topic Sections

Below the visual topic board, each topic should have an anchored section similar to the culture page's category sections.

Each section should contain the child-facing learning experience:

- Main image or interactive visual.
- Tap-to-hear vocabulary / phrases.
- Short phrase practice.
- One or two simple activity patterns.
- A parent guide.
- Book alignment as supporting metadata.

Topic sections should feel like places to learn, not database records.

### Find by Book

This is the adult-facing path.

It should be visually separate from the topic board. It can live as a separate tab, mode, or full section, but it should not be interleaved with topic cards.

The book route should work like:

1. Choose a book, such as `Book 1A`, `Book 1B`, `Book 2A`.
2. See the lessons in that book.
3. Open the related learning topic or lesson practice.

The book page can show curriculum alignment clearly because this route is for homework, exam preparation, and teacher / parent lookup.

## Layout Recommendation

Use this structure for the main page:

1. Global nav
   - Brand / home.
   - `Learn`.
   - `Books`.
   - `Culture stories`.

2. Bilingual hero
   - Chinese-first title.
   - Short English support.
   - Keep it warm and polished like the culture hero.
   - Do not make it a marketing funnel.

3. Primary mode switch
   - `Learn by Topic`.
   - `Find by Book`.
   - The default view should be `Learn by Topic`.

4. Topic board
   - Visual cards in a responsive grid.
   - All top-level topics available in the finished curriculum.
   - No search box required for young children.
   - Avoid deep categories unless the topic count becomes too large.

5. Anchored topic sections
   - Similar to culture category sections.
   - Each topic section has a strong visual header and learning cards.
   - Sticky topic nav can appear after the topic board, matching culture behavior.

6. Book shelf view
   - Separate from the topic board.
   - Book cards first.
   - Lessons inside the selected book.
   - Lesson cards can link to the relevant topic experience.

## Styling Direction

Carry over the culture page's polish, but keep the learning app visually distinct enough to feel like a study companion.

Keep:

- Warm paper background.
- White content surfaces.
- Soft shadows.
- Red / gold accents used with restraint.
- Bilingual hierarchy.
- Classic display type for major headings.
- Clear touch-friendly spacing.

Adapt:

- Replace culture emoji cards with generated educational images.
- Use slightly more playful learning visuals for topic cards.
- Keep card labels larger and easier for young children.
- Make active / selected states obvious for touch interaction.

Avoid:

- Marketing-style hero copy.
- Dense dashboard controls.
- Topic grouping that forces children to know the category before finding the topic.
- Mixing book progress, book counts, or lesson metadata into first-level topic cards.
- "Coming soon" states in the released app.

## Content Model Implications

The app should eventually render from structured data instead of hand-maintained UI fragments.

Recommended data shapes:

- `topics`: top-level learning topics with `id`, `zhTitle`, `enTitle`, `image`, `accent`, `summary`, `sectionContent`, and `bookRefs`.
- `books`: book metadata with `id`, `title`, `level`, and ordered lesson records.
- `bookLessons`: lesson records with `bookId`, `lessonNumber`, `title`, `topicIds`, and optional direct practice target.

Important separation:

- Topic data answers: "What does the child want to learn?"
- Book data answers: "Which book lesson does the adult need?"
- Cross-links connect them only after one route is selected.

## Implementation Steps

1. Clean up the current landing/home shell.
   - Remove unused marketing-style layout blocks.
   - Preserve existing topic interactions that already work.

2. Rebuild the home around the culture pattern.
   - Bilingual hero.
   - Visual topic card grid.
   - Anchor behavior.
   - Sticky horizontal topic nav after scrolling.

3. Convert the current topic list into a visual board.
   - Use generated assets where available.
   - Use consistent fallback illustrations only where necessary.
   - Make `时间` directly visible as a clock/time card.

4. Keep book lookup as a separate route.
   - Replace dropdown-first lookup with a book shelf if possible.
   - Keep lesson order and book alignment clear.
   - Link lesson cards into topic practice.

5. Move book alignment out of first-level topic cards.
   - Keep it inside the topic detail / parent guide area.
   - Make the child-facing topic selection clean.

6. Verify on iPad-sized and phone-sized layouts.
   - Topic cards must be easy to tap.
   - Text must not overflow.
   - The sticky nav must not cover anchored content.
   - The first viewport should clearly show that this is a learning app.

## Open Design Questions

- Should `Books` be a tab inside the same page or a separate `books.html` page?
- Should topic sections all live on the home page, like culture, or should topic cards open focused topic pages once the content grows?
- Should the sticky topic nav use Chinese-only labels for compactness, or Chinese plus English like culture?
- How many top-level topics should appear in the final topic board before a secondary organization pattern is needed?

## Current Working Assumption

Keep a single-page home for now:

- Topic board first.
- Topic sections below.
- Book shelf in a separate tab / mode.
- Culture remains a separate subpage.

This is the closest match to the existing codebase and the culture page, and it avoids introducing routing complexity before the content model is stable.
