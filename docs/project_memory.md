# Project Memory

Last updated: 2026-08-04

This file is the quick handoff memory for the current product state. It should help the next session continue without re-discovering the same decisions.

## Product Direction

- The site is a child-friendly companion tool for learning Chinese as a second language.
- It is not meant to reproduce the books page-by-page.
- The books are used as curriculum alignment and lesson guidance, not as art assets.
- The experience should feel low-stress, playful, audio-first, and usable by younger kids with parent support.
- Topic-first browsing is the main child-facing structure.
- Book -> lesson lookup is still preserved for parents and teachers.

## Non-Negotiable Rules

- Do not use textbook images in the product.
- Do not copy textbook layouts too closely.
- Read the relevant book lesson first, understand what it teaches, then create an original version in the same educational spirit.
- Audio is required, not optional.
- Prefer a static-site-friendly architecture when possible.
- Keep child inputs browser-local and simple.

## House Art Style

- Soft colored-pencil and watercolor children's-book look.
- Warm, friendly, gentle classroom tone.
- Clear gestures and readable expressions.
- Wide-screen layout should usually place the image on the left and language cards / controls on the right.
- Avoid text baked into the image.
- Adults must read clearly as adults.
- Keep the cast intentionally diverse across skin tones, hair textures, hair styles, face shapes, and clothing.
- Preserve explicit character coverage in the asset store instead of relying on one scene to carry all diversity.
- If a blond boy appears in generated art, prefer clearly blue eyes unless a different brief is given.

Reference: [art_direction.md](./art_direction.md)

Culture-specific reference: [culture_art_direction.md](./culture_art_direction.md)

## Current Foundation Topics Implemented

The following topics are no longer placeholders and have custom topic experiences in [app.js](../app.js):

- `Numbers`
- `Greetings`
- `Polite Words`
- `Names & Introductions`
- `Age`
- `Body`
- `Multiplication rhyme`

These custom topics use:

- original scene art
- tap-to-hear audio
- topic-specific explorer layouts
- `Let's practice` sections with game-based interaction
- related-content cards that chain to the next useful topic

## Topic Notes

### Greetings

- Theme follows the books: school greetings.
- Includes:
  - `你好`
  - `王老师，您好`
  - `你早`
  - `再见`
- Practice area uses:
  - listen-and-choose
  - matching game
- Includes note explaining `你` vs `您` and `老师`.

### Polite Words

- Theme follows classroom / helping / social politeness.
- Includes:
  - `谢谢你`
  - `不客气`
  - `对不起`
  - `没关系`
  - `请`
  - `请安静`
- Practice area uses:
  - listen-and-choose
  - matching game

### Names & Introductions

- Theme: asking and saying names.
- Includes:
  - `你叫什么名字？`
  - `我叫安安。`
  - additional sample names for variation
- Practice area uses:
  - listen-and-choose
  - build-the-phrase
- This topic should chain naturally into `Age`.

### Age

- Theme: asking and saying age.
- Includes:
  - `你几岁？`
  - `我五岁。`
  - `我六岁。`
  - `我七岁。`
  - `几`
  - `岁`
- Practice area uses:
  - listen-and-choose
  - build-the-phrase
- Key conversation chain to preserve:
  - `你好！你叫什么名字？我叫安安。你几岁？我五岁。`
- Visual consistency fixes already made:
  - scene 2 now clearly shows six with one full hand plus one finger
  - birthday scene now shows exactly seven candles
  - birthday scene blond boy was revised so the eyes read blue, not black

## Character Asset Store

Current reusable kid assets live in:

- [assets/illustrated-kids](../assets/illustrated-kids)

Current manifest:

- [assets/illustrated-kids/manifest.json](../assets/illustrated-kids/manifest.json)

Important note:

- The composite sheet `kid-cast-sheet.webp` may lag behind the actual individual assets. The manifest and individual `.webp` files are the source of truth. Archived PNG source files, if needed, now live under `assets/_png-archive/`.
- For recurring kid scenes, the portrait anchor in `assets/illustrated-kids/` is the identity source of truth, and the matching file in `assets/illustrated-kids/full-body/` should be used when pose or body proportions matter.

Current kid cast includes:

- `lele`
- `meimei`
- `yangyang`
- `anan`
- `tiantian`
- `sisi`
- `luna`
- `jaden`
- `noah`
- `sophie`

New diversity additions from this session:

- `jaden`: Black boy

Character identity note:

- The former ponytail girl artwork has been renamed to canonical `anan`.
- The older pigtail Anan artwork is retired in `assets/illustrated-kids/archive/` and should not be used as an active anchor.

## Files That Matter Most

- [app.js](../app.js): main app logic and topic rendering
- [styles.css](../styles.css): shared layout and UI styling
- [index.html](../index.html): page shell
- [docs/art_direction.md](./art_direction.md): visual and adaptation rules
- [docs/culture_art_direction.md](./culture_art_direction.md): culture-article visual rules
- [docs/security_publish.md](./security_publish.md): publish/security reminders
- [docs/game_templates.md](./game_templates.md): game patterns to reuse
- [docs/series_audit.md](./series_audit.md): book audit
- [docs/curriculum_reference.json](./curriculum_reference.json): curriculum mapping
- [docs/asset_summary.md](./asset_summary.md): generated asset inventory and gap check
- [assets/vocabulary-index.json](../assets/vocabulary-index.json): generated vocabulary-level asset index
- [docs/character_bible.md](./character_bible.md): recurring character anchors and anti-drift rules
- [docs/school_bible.md](./school_bible.md): recurring school environment anchor and anti-drift rules

## Asset Inventory Workflow

- `manifest.json` inside each asset folder is the source of truth.
- [docs/asset_summary.md](./asset_summary.md) is a generated summary, not a hand-edited document.
- When any asset is added, removed, renamed, or when any asset manifest changes, regenerate `asset_summary.md`.
- Regenerate with `node scripts/generate_asset_summary.mjs`.
- Use `asset_summary.md`, folder manifests, and `assets/vocabulary-index.json` to answer "what do we already have?" before making new art.
- Avoid opening image files by default. Looking at images is expensive and should be reserved for cases where teaching accuracy, composition, or visible quality must be judged directly.
- If the question can be answered from manifest metadata or summary docs, do not inspect the image.

## Character Workflow

- Recurrent people should not be regenerated as generic new faces each time.
- Use [docs/character_bible.md](./character_bible.md) when prompting any scene with `mom`, `dad`, `grandma`, `grandpa`, or named kids.
- Also use it for recurring teacher anchors such as `wang-laoshi`.
- Anchor image identity comes before scene-specific styling details.
- For recurring kids, use the portrait anchor first and the full-body anchor when the scene depends on body shape, sitting posture, or action pose.
- If a user says `Jaden doesn't look like Jaden` or `mom doesn't look like mom`, treat that as a character-drift bug, not a minor style note.
- Family children should reuse kid-cast identities when there is a clear match, instead of being maintained as separate drifting characters.
- `lele` and `anan` are siblings everywhere. Do not use them as a new-friend, new-classmate, or getting-to-know-you pair.
- School, hobby, and daily-life scenes may still show `lele` and `anan` with classmates or friends, but prompts must preserve their sibling relationship when they appear together.
- For personal-information exchanges such as name, age, nationality, or family, pair `anan` or `lele` with another kid-cast character such as `sisi`, `noah`, `luna`, `jaden`, `tiantian`, `yangyang`, or `meimei`.
- Current mapping to preserve:
  - `older-brother` -> `lele`
  - `older-sister` -> `anan`
  - `younger-sister` -> `meimei`
  - `younger-brother` -> family-only anchor for now
- `jaden` is not a current high-frequency reuse anchor; focus identity consistency work first on `mom`, `dad`, `lele`, `anan`, and `meimei`.
- `wang-laoshi` now exists as the default recurring teacher anchor for classroom and politeness scenes.
- `li-laoshi` now exists as the default recurring female principal anchor for school-wide authority scenes and should stay visually distinct from both `wang-laoshi` and `mom`.

## School Workflow

- The school itself is also a recurring anchor, not a fresh setting every time.
- Use [docs/school_bible.md](./school_bible.md) before generating any school exterior or interior scene.
- Default school identity:
  - American elementary school
  - red brick exterior
  - white window frames
  - long driveway for parent drop-off
- Default stable school spaces:
  - exterior / driveway
  - hallway
  - classroom
  - restroom entrance
  - gym
  - cafeteria
  - library
  - music classroom
  - art classroom
  - playground
- If a user says `the school looks different again`, treat that as an environment-drift bug, not a minor style note.
- Current corrections already identified by the user and now part of the school bible:
  - music classroom should usually have children seated on a carpet, not on chairs
  - playground should usually read as side/back of school, not the front facade
  - playground should not default to grand stairs, fancy entry doors, or a visible flag behind it
  - general classroom should usually use grouped clusters of four desks rather than neat separated rows
- The current school anchor images are first-pass references and still need these corrections in later revisions.

## Interaction Patterns To Reuse

- Large touch-friendly targets.
- Audio-first interaction.
- Image-supported scene teaching instead of flat vocabulary lists.
- Split practice boards on wide screens.
- `Listen and choose` works well as a default left-panel game.
- Right panel can hold:
  - matching game
  - build-the-phrase
  - future small partner game
- Use related-content cards to bridge to the next topic instead of leaving dead-end pages.

## Culture Article Glossary / Tooltip Decision

- Culture articles often include background names that are easy for adults but hard for 6-10 year olds without Chinese history context: dynasties such as Han, Tang, Song; states such as Qin or Qi; peoples such as Xiongnu; regions such as Jiangnan or the Central Plains; government titles, book titles, and famous historical periods.
- Avoid solving this with long inline explanations everywhere, because it can break the story flow.
- Use short inline context only when the child needs it immediately to follow the sentence. Example: `About 1,000 years ago, in the Song dynasty, cuju became very popular.`
- For repeated or optional background terms, prefer a shared glossary rendered as touch-friendly popovers.
- Common `page.md` readability issue to remember: if `[zh]` or `[en]` source text is written one sentence per line, the current shared renderer can make the output feel over-broken into small reading chunks, especially on `text-only` pages. For now, keep normal prose in fuller paragraphs and use blank lines only for intentional paragraph breaks. Later, the `page.md` pipeline should be improved so sentence-per-line authoring does not create choppy layout.
- For child-facing English in this project, prefer U.S. units first. Use `pounds`, `feet`, and other familiar U.S. measurements in the main sentence. Use metric only when it adds real value.
- For culture article images, do not lean too heavily on split comparison images. They work when the teaching point is truly a contrast, but if too many pages use them, the category starts to feel repetitive and diagram-like. Prefer a single clear scene unless the comparison format is genuinely doing important teaching work.
- Do not use native `title` tooltips or hover-only CSS. The site must work on iPad and desktop Chrome/Safari.
- Expected behavior:
  - desktop Chrome/Safari: hover and click can reveal the note
  - iPad Safari/Chrome: tap reveals the note
  - tap outside closes the note
  - keyboard users can tab to the term, press Enter/Space to open, and Esc to close
- Glossary terms should render as accessible controls, such as a small button-style inline term with a subtle dotted underline, not as plain spans.
- Authoring direction to consider: explicit markup such as `[[Song dynasty]]`, backed by a shared glossary JSON file.
- Glossary notes should be one child-friendly sentence, not mini-articles. Examples:
  - `Song dynasty`: `A time in China about 1,000 years ago.`
  - `Han dynasty`: `A powerful time in China more than 2,000 years ago.`
  - `Xiongnu`: `A horse-riding people from the northern grasslands.`
- Implementation note: glossary support now uses explicit `[[term]]` markup, backed by [culture/content/glossary.json](../culture/content/glossary.json).
- Shared renderer/UI code lives in [scripts/culture_glossary.mjs](../scripts/culture_glossary.mjs).
- Both article builders support the syntax:
  - [scripts/build_culture_articles.mjs](../scripts/build_culture_articles.mjs) for `zh.md` / `en.md` manifest articles
  - [scripts/build_philosophy_page.mjs](../scripts/build_philosophy_page.mjs) for `page.md` culture book / experiment pages
- Glossary CSS lives in both [culture/article-template.css](../culture/article-template.css) and [culture/shared/styles.css](../culture/shared/styles.css). Generated `page.md` pages copy `culture/shared/styles.css` into each output folder when rebuilt.
- Older hand-authored static book pages under `culture/books/food`, `culture/books/figures`, `culture/books/folk-customs`, and `culture/books/folk-tales` link shared assets [culture/shared/glossary.css](../culture/shared/glossary.css) and [culture/shared/glossary.js](../culture/shared/glossary.js). If glossary terms are added directly to those HTML pages, use the same rendered structure as the builders: `.glossary-entry` wrapping a `.glossary-term` button and `.glossary-popover`.

## Security / Publishing Memory

- No login is planned.
- No database is planned.
- Static site is preferred if possible.
- Simple child input like tapping and short numeric answers is acceptable.
- Keep all user input local, validated, and never treated as HTML.
- Avoid unnecessary third-party scripts.

Reference: [security_publish.md](./security_publish.md)

## Good Next Steps

- Continue foundations in the same format for the next missing topic.
- Build a short chained conversation activity that combines:
  - greeting
  - name
  - age
- Keep expanding the reusable cast library when a clear visual gap appears.
- Refresh any outdated cast-sheet composites if they are needed in the UI.
- Continue checking every generated lesson image for teaching accuracy, not just style quality.

## Session Reminder

- If a generated image looks nice but teaches the wrong thing, replace it.
- Educational accuracy beats decorative quality.
- When the user points out a visual mismatch, trust the mismatch and fix the image, not just the copy.
- For school and playground scenes, avoid default cartoon-school tropes like oversized bright play structures or automatic red flags unless the lesson specifically needs them.
- Prefer believable school buildings and realistic campus layouts as the base visual language for education scenes.
