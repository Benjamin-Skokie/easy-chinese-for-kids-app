# Nature — Lesson Contract and Content Plan

Status: `content-complete; product visual review pending`
Topic URL: `lesson.html?topic=nature`
Topic ID: `nature`
Primary lesson: **Book 3B, Lesson 7 — Nature**

This is the content contract for the implemented Nature page. It records the language, visual evidence, and practice design that the page must preserve.

## Section ownership

| Section | Owner | Decision |
| --- | --- | --- |
| Scenes | Nature custom renderer | Render the two approved scene cards once. |
| Book words | Nature custom renderer | Render one in-topic word-card row. |
| Useful notes | Nature custom renderer | Render one memory note after Book words. |
| Generic focus display and word list | Shared shell | Suppress via `natureTopic.ownsExplorerContent`; they would duplicate the custom content. |

## 1. Cross-book audit

### Primary lesson evidence

The 3B Lesson 7 OCR (pages 86–88 in the textbook) introduces:

| Language job | Required language |
| --- | --- |
| Place words | `天上`, `地上` |
| Things in the sky | `太阳`, `星星`, `月亮` |
| Things on the ground | `树`, `花`, `草` |
| Core sentence frames | `天上有……。` / `地上有……。` |
| Complete examples | `天上有太阳。` `天上有星星。` `天上有月亮。` `地上有树。` `地上有花。` `地上有草。` |
| Extended book lines | `天上有太阳、星星和月亮。` / `地上有绿树、红花和小草。` |

The page adds `白天` and `晚上` as scene-title keywords because the approved visuals deliberately contrast daytime and nighttime. They appear in the single Book words row, but are not added as a separate grammar target.

### Reuse elsewhere in the series

- **Colours (1B L6, 2A L7):** The book's extension contains colour descriptors, but this page deliberately keeps the child-facing sentence to `地上有树、花和草。`; it does not reteach the colour inventory or `颜色 + 的 + 名词` here.
- **Positions (3B L3) and Room (4B L3):** `地上` later appears in indoor location language such as `地上有书。`. Nature must keep the broader sky-versus-ground contrast clear; it is not a positions lesson.
- **Weather review (4B L1):** the 4B OCR reuses `天上有太阳` in a weather exercise. That is a later recognition check, not a reason to place rain, snow, heat, cold, or clothing on the Nature page.

### Boundary decision

**Nature answers “what is in the sky / on the ground?”**
**Weather answers “what is today’s weather like?”**

Clouds and wind are not required Nature vocabulary for 3B L7. They remain out of scope unless a later book source makes them part of a deliberate Nature expansion.

## 2. Scene plan

The current page has one composite day-and-night illustration. It is suitable source art, but a single undifferentiated card is not enough evidence that a child understands the two place frames. Use the established scene template with the following two teaching beats.

| Scene | Custom scene title | What the child sees | Sentences carried by the scene | Asset decision |
| --- | --- | --- | --- | --- |
| 1 | `白天` | A complete daytime nature scene: the sun is high in the sky; trees, flowers, and grass are on the ground. | `天上有太阳。` / `地上有树、花和草。` | Use `assets/illustrated-nature/daytime-nature.webp`. It is a dedicated day scene, not a crop of the former composite image. |
| 2 | `晚上` | A complete nighttime nature scene: the moon and stars are high above the treetops. | `天上有星星。` / `天上有月亮。` | Use `assets/illustrated-nature/nighttime-nature.webp`. It is a dedicated night scene, not a crop of the former composite image. |

The scenes should use their own titles (`抬头看`, `低头看`) rather than a generic `Scene` label. Sentence lines belong beside or directly below their corresponding visual cue; do not create a loose vertical list whose relationship to the artwork is unclear.

## 3. Supporting sections

### Book words — include once

Include one Book words row inside the Nature content area, using the same word-card component as Colours: `白天`, `晚上`, `天上`, `太阳`, `星星`, `月亮`, `地上`, `树`, `花`, `草`.

Do not render the generic page-level focus card or a second word list. The one in-topic row is the only Book words section for Nature.

### Useful notes — include one memory cue

Include one card after Book words: `抬头看天上，低头看地上。`

It connects `天上／地上` to a physical gesture, so it helps a child remember the contrast instead of repeating the vocabulary or another scene sentence.

## 4. Practice coverage to settle before game design

| Practice goal | Prior page evidence | What remains to practise | Valid answers / useful distractors |
| --- | --- | --- | --- |
| Fill a sentence | Scenes and Book words show day/night, sky/ground, and each pictured noun. | Complete `____有____。` from one inline icon cue. | Choose `白天` / `晚上` / `地上`, then the nature word. Valid sentences are `白天有太阳。`, `晚上有月亮。`, `晚上有星星。`, `地上有树。`, `地上有花。`, and `地上有草。` Choice order randomizes once per round. |

The selected interaction is **看图填一填**. The small visual cue is inline in the sentence, and the child fills both blanks. It never combines a time word with `地上`: the day/night sentences and ground sentences are separate book frames. The Play button says only the pictured noun before the answer is complete, so it does not reveal the blanks; after success, it speaks the full sentence and Play advances to the next randomized round.

## 5. Asset audit

| Asset | Decision | Reason |
| --- | --- | --- |
| `assets/illustrated-nature/daytime-nature.webp` | Use | Daytime scene with the sun high above the trees, plus natural ground examples for `树、花、草`. |
| `assets/illustrated-nature/nighttime-nature.webp` | Use | Night scene with the moon and stars high above the trees. |
| `assets/illustrated-nature/day-night-nature.webp` | Retire from this lesson | It conflates daytime and night in one visual and makes the location relationship less clear. |
| `assets/illustrated-sky-day-night/sky-ground-scene.webp` | Do not use | Visual inspection shows unrelated historical people and an airplane, so it does not teach this lesson despite its filename and manifest entry. |
| Weather artwork | Do not use | It teaches weather conditions rather than `天上／地上 + 有……`. |

No new asset should be generated until the scene layout proves the composite Nature artwork cannot support the two planned scenes.

## 6. Current verification state

The approved two-scene structure, one in-topic Book words row, memory note, and `看图填一填` practice are implemented. Automated content and rendering tests pass. Product visual review remains required to confirm scene clarity and touch readability in the live page.
