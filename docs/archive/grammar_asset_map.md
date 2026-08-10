# Grammar Asset Map

Last updated: 2026-07-11

Purpose: map textbook-style sentence patterns to existing illustration assets before generating any new grammar-specific art.

## Current Direction

- Reuse existing asset images wherever the picture already teaches the sentence clearly.
- Add new art only for true contrast pairs that the current library does not cover well.
- Prefer schoolbag, classroom, room, and activity contexts because they align with the OCR-backed lesson content.

## Textbook-Aligned Patterns

### 有 / 没有

Best anchor from `3B`:

- `书包里有课本。`
- `书包里有练习本。`
- `书包里有文具盒。`
- `文具盒里有铅笔。`
- `桌子上有电脑。`

Existing asset matches:

- `assets/illustrated-grammar/you-mei-you-contrast.webp`
  - direct side-by-side contrast for `书包里有课本。` and `书包里没有课本。`
- `assets/illustrated-rooms/positions-inside-outside.webp`
  - good for `书包里有课本。`
  - good for `书包外面有铅笔盒。`
- `assets/illustrated-rooms/positions-up-down.webp`
  - good for `桌子上有课本。`

### 可以 / 不可以

Current preferred direction:

- one home scene with a common child request
- `我可以看电视吗？`
- `先做作业，不可以看电视。`

Existing asset match:

- `assets/illustrated-grammar/can-watch-tv-homework-first.webp`
  - supports both the request and the rule in one scene

Reasoning:

- this is more natural than `可以喝水吗`
- the contrast is easy for kids to understand in daily life
- one picture can support both `可以` and `不可以`

### 是 / 不是

Best visual direction:

- use a playful package reveal with very low background load
- positive: `这是一个包裹。`
- negative: `这不是包裹。这是美美。`

Current asset match:

- `assets/illustrated-grammar/shi-bu-shi-meimei-package.webp`

Reasoning:

- more natural and more memorable than the backpack / pencil-box substitution
- playful for children without adding scene clutter
- works well for direct `这是 / 这不是` contrast in one image

### 在 / 不在

Two sub-patterns are worth teaching.

Location pattern from `3B`:

- `书包在桌子下面。`
- `椅子在书包后边。`

Activity pattern the user requested:

- `我在跑步。`
- `她在跳舞。`
- `她在看书。`

Existing asset matches:

- `assets/illustrated-rooms/positions-up-down.webp`
  - good for `书包在桌子下面。`
- `assets/illustrated-actions-basic/run.webp`
  - good for `我在跑步。`
- `assets/illustrated-activities/luna_dancing.webp`
  - good for `她在跳舞。`
- `assets/illustrated-activities/grandma_reading_armchair.webp`
  - good for `她在看书。`

Gaps:

- none for the current `在 / 不在` core pair

## Suggested Production Order

1. Ship the pairs that already work with existing assets:
   - `这是一个包裹。`
   - `这不是包裹。这是美美。`
   - `书包里有课本。`
   - `书包里没有课本。`
   - `书包在桌子下面。`
   - `书包不在桌子下面。`
   - `我在跑步。`
   - `她在跳舞。`
   - `她在看书。`
   - `我可以看电视吗？`
   - `没做完作业，不可以看电视。`
   - `我现在可以看电视吗？`
   - `可以。`
2. Only add new grammar art when the current scene does not clearly support the sentence.
