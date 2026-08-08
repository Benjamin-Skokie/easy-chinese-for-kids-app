# Lesson Page Production Workflow

Last updated: 2026-08-08

This is the required workflow for building or materially changing a learning topic page. It keeps lesson content, reusable templates, assets, and verification aligned as the app grows.

## Sources Of Truth

Before work begins, use these files in this order:

1. [curriculum_reference.json](./curriculum_reference.json), [series_audit.md](./series_audit.md), and the relevant OCR text: confirm what the book teaches.
2. [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json): confirm the topic, lesson, and known asset mapping.
3. [game_templates.md](./game_templates.md): choose a practice pattern that fits the learning goal.
4. [art_direction.md](./art_direction.md), then [character_bible.md](./character_bible.md) and [school_bible.md](./school_bible.md) when applicable: define the visual brief.

Do not build a page from memory or create visuals before the lesson goal is clear.

## 1. Write The Topic Brief

For each topic, record:

- the lesson or lessons it covers
- the vocabulary and sentence patterns to teach
- the minimum scenes needed to explain those patterns
- book words and useful notes
- one or two appropriate practice templates
- the required assets, including reusable assets and new scene assets

The brief should distinguish between facts the child needs to learn and optional enrichment. Do not add a game only to make a page longer.

## 2. Use One Topic Data Model

Each topic should have one structured configuration that owns:

- scenes and their asset IDs
- book words
- useful notes
- listen-and-choose prompts and choices
- matching pairs
- build-sentence or fill-in-the-blank items

Practice items must reference the same scene or asset IDs used by the topic. Do not copy file paths into separate, unrelated page sections. When a scene or asset is removed, update or remove every practice item that uses it.

The current app still contains some topic data in `app.js`. New work should move toward a single declarative topic configuration rather than introducing additional parallel arrays.

## 3. Reuse The Practice Templates

Use the shared templates in [game_templates.md](./game_templates.md) unless a lesson genuinely requires a new interaction.

Template acceptance rules:

- **Listen and choose:** uses the standard instruction, randomizes a new prompt when replayed as appropriate, clears prior wrong-state feedback, and shows a green check for correct and red cross for wrong.
- **Matching:** uses the standard two-column click interaction, equal card sizing, clear completion feedback, and no topic-specific duplicate prompt.
- **Build sentence / fill blank:** has enough varied items to practice the topic pattern, accepts valid ordering rules where the language permits them, and does not reuse retired assets.
- **Sentence choice:** uses one picture at a time, two equal-width option columns, and the matching-card type scale: `1.45rem` Hanzi, `0.92rem` pinyin, and `0.95rem` English.
- **All templates:** use the same button sizes, colors, feedback states, and touch targets as the established reference template.

When a new game is needed, define its behavior and acceptance checklist in `game_templates.md` before applying it to multiple topics.

## 4. Asset Workflow

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

## 5. Verification

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

### Product review

The product owner performs visual and lesson review in the page itself:

- scene meaning, vocabulary, and dialogue are correct
- images are not clipped or distorted at their rendered aspect ratio
- cards are readable and practical on the target iPad layout
- audio uses the intended pronunciation
- practice feels age-appropriate and covers the intended pattern

Codex should prepare the page and automated checks; visual acceptance of generated art remains a human decision.

## 6. Topic Completion Checklist

Before considering a topic complete:

- lesson mapping is correct
- scenes, book words, and useful notes teach the intended language without duplication
- practice uses the common template behavior
- every displayed asset is final and listed in a manifest
- no retired asset is still referenced
- automated checks pass
- product review has approved the page

Commit only after this checklist is satisfied or the remaining exceptions are explicitly noted.
