# Next Session Notes

Start with these files:

- [series_audit.md](./series_audit.md)
- [README.md](./README.md)
- [curriculum_reference.json](./curriculum_reference.json)
- [art_direction.md](./art_direction.md)
- [culture_art_direction.md](./culture_art_direction.md)
- [security_publish.md](./security_publish.md)
- [game_templates.md](./game_templates.md)
- [asset_summary.md](./asset_summary.md)
- [assets/vocabulary-index.json](../assets/vocabulary-index.json)
- [character_bible.md](./character_bible.md)
- [school_bible.md](./school_bible.md)
- [learning_home_refactor.md](./learning_home_refactor.md)
- [structured_learning_content_refactor.md](./structured_learning_content_refactor.md)
- [learning_topic_coverage_plan.md](./learning_topic_coverage_plan.md)
- [topic_content_asset_matrix.md](./topic_content_asset_matrix.md)
- [learn_by_topics_asset_mapping.md](./learn_by_topics_asset_mapping.md)
- [learn_by_books_asset_mapping.md](./learn_by_books_asset_mapping.md)
- [culture_index_template.md](./culture_index_template.md)

These are the local source of truth for the textbook audit.

Asset lookup workflow:

- per-folder `assets/*/manifest.json` files are the source of truth
- `docs/asset_summary.md` is the generated high-level inventory
- `docs/learn_by_topics_asset_mapping.md` is the manual-review view for child-facing topic navigation
- `docs/learn_by_books_asset_mapping.md` is the manual-review view for parent/teacher book navigation
- after any asset or manifest change, refresh it with `node scripts/generate_asset_summary.mjs`
- prefer checking manifests, `asset_summary.md`, and `assets/vocabulary-index.json` before opening image files
- avoid looking at images unless the task truly requires visual quality or teaching-accuracy review
- for recurring characters, check `character_bible.md` before generating a new scene
- for recurring kid scenes, use the kid anchor definitions in `character_bible.md` and prefer the matching full-body anchor in `assets/illustrated-kids/full-body/` when the pose matters
- for recurring school scenes, check `school_bible.md` before generating a new scene
- in family scenes, reuse the mapped kid-cast identities instead of treating family children as separate people:
  - `older-brother` -> `lele`
  - `older-sister` -> `anan`
  - `younger-sister` -> `meimei`
  - `younger-brother` -> family-only anchor for now
- `lele` and `anan` are siblings everywhere; do not use them as a new-friend, new-classmate, or getting-to-know-you pair
- school, hobby, and daily-life scenes may show `lele` and `anan` with classmates or friends, but if they appear together the prompt must preserve their sibling relationship
- for personal-information exchanges such as name, age, nationality, or family, pair `anan` or `lele` with another kid-cast character such as `sisi`, `noah`, `luna`, `jaden`, `tiantian`, `yangyang`, or `meimei`
- for classroom scenes with a recurring teacher, use `wang-laoshi` as the default teacher anchor unless the lesson clearly needs a different adult
- for school authority scenes, use `li-laoshi` as the default female principal anchor rather than reusing `wang-laoshi` or `mom`

## New Session Startup Rule

When starting a fresh session, do not begin by browsing image files.

Default startup order:

1. Read [next_session_notes.md](./next_session_notes.md)
2. Read [character_bible.md](./character_bible.md)
3. Read [school_bible.md](./school_bible.md) if the task involves school scenes
4. Read [asset_summary.md](./asset_summary.md) if the task is about existing assets
5. Read the relevant folder `manifest.json` files before opening any image
6. Open image files only if the task truly requires visual inspection

Only inspect images early when one of these is true:

- the user says a character does not look like the intended person
- the teaching meaning may be visually wrong
- the composition, expression, occlusion, or object position must be judged directly
- a new recurring character is being defined

If the question can be answered from docs or manifests, do not open images.

## What Is Already Done

- OCR text exists for all 8 books in `docs/ocr`
- curriculum topics have been mapped book-by-book
- normal book lessons now have review docs for both `learn by topics` and `learn by books`
- all 56 ordinary book lessons currently map to a topic with strong reusable asset coverage
- culture side paths are tracked separately and still have partial coverage
- recurring practice stages have been summarized by level
- recurring textbook character names have been identified
- repeated themes across books have been grouped into topic progressions

## Product Direction To Preserve

- build a website first
- organize the child-facing experience by `topic`
- preserve teacher / parent lookup by `book -> lesson`
- move learning content toward structured data files and real topic/book URLs, following [structured_learning_content_refactor.md](./structured_learning_content_refactor.md)
- use [learning_topic_coverage_plan.md](./learning_topic_coverage_plan.md) and [topic_content_asset_matrix.md](./topic_content_asset_matrix.md) before generating new learning pages or assets
- keep tone-mark pinyin throughout
- treat audio as required
- design for touch-first interaction
- use the culture index template for index-style navigation pages: fixed nav, category card grid, full sections below, no inline drawer
- do not reuse textbook illustrations or textbook character identities directly
- read the relevant textbook lesson before designing a topic scene, then create an original illustration that preserves the teaching goal without copying the source image
- keep topic illustrations inclusive across skin tones, hair textures, hair styles, and child appearance
- preserve the current preferred illustration style:
  - soft colored-pencil and watercolor children's book feel
  - warm, friendly, gentle classroom tone
  - expressive faces and readable gestures
  - simple original backgrounds that support the lesson scene
- on wide screens, prefer lesson image on the left and text / controls on the right
- keep the product publishable as a static site if possible
- allow simple child input like taps and short number answers, but keep it browser-local, validated, and never treated as HTML
- treat the `Body` topic refactor as the reference interaction pattern for future topic work
  - use original animated-feeling or lively illustrations, not static textbook-like lists
  - make the child interact through large touch-friendly targets
  - support tap-to-hear audio as a first-class part of the lesson
  - let visuals react clearly to selection so the child sees what part or word is active
  - prefer playful, guided interaction over passive reading
  - design exercises so a parent who does not speak Chinese can still supervise
  - this is the tone target for the whole project, not just the body topic
- for culture articles, preserve the glossary/tooltip decision in [project_memory.md](./project_memory.md): dynasty names, historical peoples, regions, books, and titles should get touch-friendly glossary popovers when inline explanation would break story flow; this must work on iPad and desktop Chrome/Safari. The implemented markup is `[[term]]`, backed by `culture/content/glossary.json`.
- for culture article images, use [culture_art_direction.md](./culture_art_direction.md) as the source of truth: one teaching beat per page, avoid repetitive images within an article, and prefer `text-only` over filler art.
- do not overuse split comparison images in culture articles. Keep them for pages that are truly about contrast; otherwise prefer a single clear scene so the category does not become visually repetitive.
- common `page.md` cleanup issue: if `[zh]` or `[en]` text is written one sentence per line, the current renderer turns those lines into separate paragraphs, which makes reading feel choppy, especially on `text-only` pages. Until the shared builder is improved, write fuller paragraphs and use blank lines only for real paragraph breaks.

## Best Next Steps

1. Move the current in-`app.js` learning data toward structured data files and real topic/book URLs
2. Use `learn_by_topics_asset_mapping.md` and `learn_by_books_asset_mapping.md` to manually spot-check lesson coverage before generating more art
3. Continue building reusable interaction templates for matching, listening, tap-to-hear, and short-answer practice
4. Review culture side paths separately because they are not part of the 56 ordinary book lessons and still have partial coverage
5. Keep improving character consistency and scene correctness when generating or replacing images

## Best First Pilot Topics

- `Numbers`
- `Names & Introductions`
- `Age`
- `Body`

These work well because they:

- start early in the books
- repeat later in more advanced forms
- are easy to support with touch interaction and audio
- can demonstrate progressive learning clearly

These are no longer blank-start pilots; they are the best reference topics for future implementation quality.
