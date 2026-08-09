# Lesson Page Production Workflow

Last updated: 2026-08-09

This is the required workflow for building or materially changing a learning topic page. It keeps lesson content, reusable templates, assets, and verification aligned as the app grows.

## Required Topic-Build Order

This order is non-negotiable. Do not choose or build a game while the content steps above it are unsettled.

1. **Cross-book audit.** Find every lesson in the series that belongs to the topic. Record new words, sentence frames, dialogues, and later reuse; do not treat an existing asset as content coverage.
2. **Scene plan.** Decide the minimum scenes that teach those sentence frames. Use the established scene-page template and check the available assets only after the teaching beat of each scene is clear.
3. **Book words and Useful notes.** Decide whether either section is needed after the scenes are planned. Neither is automatic: include Book words for words that need focused reference, and Useful notes only for a generalizable pattern or distinction that the scenes do not already make clear.
4. **Practice coverage.** List what the scenes, Book words, and Useful notes already teach and what remains unpractised. Define the exact knowledge a child must recognize, distinguish, complete, or say.
5. **Interaction design.** Only now choose or invent a game. Its rules, visuals, audio, feedback, and randomization must be a direct fit for the remaining practice goal—not a reused game added to fill space.

The required page order is therefore usually: **scene(s) → optional Book words → optional Useful notes → practice**. A page may omit either or both optional sections when they would duplicate the scenes.

## Sources Of Truth

Before work begins, use these files in this order:

1. [curriculum_reference.json](./curriculum_reference.json), [series_audit.md](./series_audit.md), and the relevant OCR text: confirm what the book teaches.
2. [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json): confirm the topic, lesson, and known asset mapping.
3. [art_direction.md](./art_direction.md), then [character_bible.md](./character_bible.md) and [school_bible.md](./school_bible.md) when applicable: define the visual brief for the approved scene plan.
4. [game_templates.md](./game_templates.md): consult only after the practice goal is defined; choose a pattern that fits it.

Do not build a page from memory, create visuals before the scene plan is clear, or choose a game before the practice goal is clear.

## 0. Bind The Exact Page Before Editing

Before changing a topic, write down the exact target URL and verify all of the following in code:

- the `topic.id` used by that URL
- the topic data object that owns its scenes, words, notes, and practice data
- the explorer and practice render functions that output the page
- the established reference template for the requested interaction

Search for the topic ID and for the visible text before editing. Do not assume similarly named topics use the same data block. For example, `food` and `food-preferences` are separate lessons and must be reviewed independently.

List every visible output for a changed interaction: section summary, game title, instructions, progress label, correct/wrong feedback, completion message, and accessibility label. All must describe the same interaction and container. Do not leave stale wording such as a former game container in any of these outputs.

## 1. Build Cross-Book Lesson Contracts Before Topic Work

For every textbook lesson assigned to a topic, create or update a lesson contract before page implementation. The contract is the content-completeness record; an asset inventory is not a substitute.

Each lesson contract must identify:

- exact book and lesson reference, plus the reviewed OCR/page source
- required vocabulary and measure words
- required sentence patterns and grammar distinctions
- dialogue or question-and-answer patterns that need to be understood, even if they do not each need a separate scene
- required useful notes and examples
- the scene, book-word, and practice evidence that covers each requirement
- existing assets, missing assets, and assets that are only reusable visuals rather than teaching proof
- an audit status: `needs-content-audit`, `partial`, or `content-complete`

Audit one book at a time, then compare the complete set of lesson contracts against the topic configuration. A topic is incomplete when any required lesson concept has no child-facing scene, note, word, or practice evidence. Do not call a lesson or topic complete merely because it has an asset path or a `strong` asset-coverage label. This audit must happen before scene or game design.

## 2. Plan Scenes, Then Write The Topic Brief

For each topic, record:

- the lesson or lessons it covers across all books
- the vocabulary and sentence patterns to teach and reuse
- the minimum scenes needed to explain those patterns, using the approved page template
- whether Book words are necessary, and exactly which scene gap they fill
- whether Useful notes are necessary, and exactly which generalizable pattern they explain
- the required assets, including reusable assets and new scene assets
- the remaining practice goals after the scenes and optional supporting sections are accounted for

The brief should distinguish between facts the child needs to learn and optional enrichment. Do not add Book words, Useful notes, or a game merely to make a page longer.

## 3. Define Practice Before Choosing A Game

For each remaining practice goal, record:

- the exact sentence, distinction, or response being practised
- what provides the cue (scene, object, audio, question, or sentence frame)
- what the child must provide (tap, select, sort, fill, order, say, or build)
- the valid answers and invalid-but-plausible distractors
- whether the target, answer order, or visual details need randomization
- whether a complete sentence should remain visible after success

Only after this list is approved may the topic use an existing game template or propose a new interaction.

## 4. Use One Topic Data Model

Each topic should have one structured configuration that owns:

- scenes and their asset IDs
- book words
- useful notes
- listen-and-choose prompts and choices
- matching pairs
- build-sentence or fill-in-the-blank items

Practice items must reference the same scene or asset IDs used by the topic. Do not copy file paths into separate, unrelated page sections. When a scene or asset is removed, update or remove every practice item that uses it.

The current app still contains some topic data in `app.js`. New work should move toward a single declarative topic configuration rather than introducing additional parallel arrays.

Keep child-facing copy in the topic or template configuration where possible. If an interaction has a summary, in-card instruction, and completion message, define them together or verify each explicitly after a behavior change. Do not fix one hard-coded string while leaving duplicate wording elsewhere.

## 5. Reuse The Practice Templates

Use the shared templates in [game_templates.md](./game_templates.md) unless a lesson genuinely requires a new interaction.

Template acceptance rules:

- **Listen and choose:** uses the standard instruction, randomizes a new prompt when replayed as appropriate, clears prior wrong-state feedback, and shows a green check for correct and red cross for wrong.
- **Matching:** uses the standard two-column click interaction, equal card sizing, clear completion feedback, and no topic-specific duplicate prompt.
- **Build sentence / fill blank:** has enough varied items to practice the topic pattern, accepts valid ordering rules where the language permits them, and does not reuse retired assets.
- **Sentence choice:** uses one picture at a time, two equal-width option columns, and the matching-card type scale: `1.45rem` Hanzi, `0.92rem` pinyin, and `0.95rem` English.
- **All templates:** use the same button sizes, colors, feedback states, and touch targets as the established reference template.

When a new game is needed, define its behavior and acceptance checklist in `game_templates.md` before applying it to multiple topics.

For collection games such as `Pack the backpack` or a food shopping-cart game, define:

- category or mix reset behavior
- the target image and answer choice behavior
- red cross for a wrong answer and green check for a correct answer
- where a correct item lands, and the completion state after all items are collected
- concise, child-readable instructions that explain those steps

## 6. Asset Workflow

### Before generating or selecting an asset

- Confirm whether an existing asset already teaches the required concept.
- For recurring characters, read `character_bible.md` and use the named character anchors.
- For school settings, read `school_bible.md` and use the recurring campus direction.
- State the required aspect ratio, crop-safe area, character relationship, pose, and lesson beat in the asset brief.

### Asset handoff

1. Generate or select a temporary source image.
2. The product owner reviews the visual: character identity, teaching relationship, pose, composition, and whether it matches the intended page container.
3. After approval, convert the final image to `.webp`, optimize it, and place it in the relevant asset folder.
4. Add or update the folder `manifest.json`.
5. Update the topic data to reference the final asset.
6. Search the codebase for the retired asset filename before removing or replacing it.

Final app assets must follow [art_direction.md](./art_direction.md): WebP unless an exception is documented, no temporary PNG sources in the asset library, and the applicable size limit.

### Container-fit rules

- Decide the rendered aspect ratio before generating or selecting the asset.
- Preserve the asset's aspect ratio with `object-fit: contain` unless intentional crop is explicitly required.
- Never use `object-fit: fill` for illustrated objects, faces, wheels, clocks, or other shapes that must retain their proportions.
- If a scene is the only item in a section, choose a compact layout deliberately; do not allow a single asset to become a full-width oversized card by default.

## 7. Verification

### Automated checks run for every code change

```sh
node --check app.js
git diff --check
```

Also check:

- every referenced asset path exists
- final image format, dimensions, and file size meet the asset rules
- removed asset names have no remaining code references
- a topic's practice item count matches its configured data rather than stale UI state
- every lesson contract mapped to the topic has evidence for each required word, pattern, dialogue, and note
- every CSS custom property used by new selectors is declared in the relevant scope
- a changed game has no stale labels, asset names, or container terms found by `rg`
- selected, correct, wrong, and completed states use the intended visible colors rather than relying only on a subtle border

### Product review

The product owner performs visual and lesson review in the page itself:

- scene meaning, vocabulary, and dialogue are correct
- images are not clipped or distorted at their rendered aspect ratio
- cards are readable and practical on the target iPad layout
- audio uses the intended pronunciation
- practice feels age-appropriate and covers the intended pattern

Codex should prepare the page and automated checks; visual acceptance of generated art remains a human decision.

### Change sequencing

For an existing page, make one focused change at a time:

1. data and child-facing copy
2. interaction behavior and state reset
3. layout and styling
4. asset replacement or generation

After each focused change, run the relevant checks and confirm the target topic/data/render path again. Do not combine unrelated page work into the same verification cycle.

## 8. Topic Completion Checklist

Before considering a topic complete:

- lesson mapping is correct
- every mapped lesson has a `content-complete` lesson contract, or an explicit approved exception
- scenes teach the intended language using the approved scene template
- Book words and Useful notes are present only where needed and do not duplicate a scene
- every practice goal is defined before its game, and the chosen interaction fits that goal
- every displayed asset is final and listed in a manifest
- no retired asset is still referenced
- automated checks pass
- product review has approved the page

Commit only after this checklist is satisfied or the remaining exceptions are explicitly noted.

Keep commits narrow: one topic or one reusable template change per commit. Do not accumulate unrelated assets, documentation, and interaction changes into one large commit unless they are required for the same completed feature.
