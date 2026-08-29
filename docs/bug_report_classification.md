# Bug Report Classification

Source: `docs/bug_report.md`

This document is a read-only classification companion. It does not replace or rewrite the original 70 notes.

## Executive Summary

Classification unit: one numbered note in the source report.

| Classification | Count | Share | Meaning |
| --- | ---: | ---: | --- |
| Page-specific | 60 | 85.7% | The requested fix is confined to one named lesson, page, exercise, asset, or sentence. |
| System-level | 7 | 10.0% | The behavior belongs to shared playback, layout, or game logic and can affect multiple pages. |
| Mixed | 3 | 4.3% | The note contains both a local page fix and a reusable/global change. |
| **Total** | **70** | **100%** | |

If every mixed note must be forced into a two-bucket view based on its dominant implementation scope, the result is:

- **Page-specific: 62** (88.6%)
- **System-level: 8** (11.4%)

In that binary view, Notes 14 and 48 are counted as page-specific, and Note 31 as system-level.

## 1. Page-Specific Notes (60)

### Audio, voice, and playback on a named page

- **Note 1** — 开口说中文: Book Words has no audio.
- **Note 3** — Names and Introduction: unnatural pause inside “我叫苏菲”.
- **Note 4** — Names and Introduction: dialogue pacing is slow; individual cards cannot be played separately.
- **Note 5** — Names and Introduction → Build a Sentence: inconsistent voice source and unnatural pauses in named answers.
- **Note 7** — 我和我的家人: long pauses and sentences no longer individually playable.
- **Note 11** — Clothes: regenerate the pronunciation of “T恤”.
- **Note 17** — Routine: “几点了？现在七点。” should use generated TTS.
- **Note 18** — Dates and Months: displayed text and audio do not match.
- **Note 19** — Dates and Months: “一年有十二月” uses the system voice instead of generated TTS.
- **Note 20** — Dates and Months: regenerate “九月开学了”.
- **Note 23** — Description and Comparison → Many / Few: regenerate “多少”.
- **Note 24** — Description and Comparison → Complete Sentence: deterministic answer should use generated TTS.
- **Note 26** — Transportation: regenerate “地铁站”.
- **Note 27** — My Home: correct and regenerate “书桌”.
- **Note 30** — My Stationery → Let’s Practice: deterministic answer should use generated TTS.
- **Note 32** — My Stationery → Build the Sentence: deterministic answer should use generated TTS.
- **Note 33** — Stationery and Backpack: fix or add audio for 尺子、练习本、文具盒、书包.
- **Note 34** — Stationery and Backpack → Build a Sentence: deterministic answer should use generated TTS.
- **Note 36** — Classroom → Make a Sentence: compose fixed generated-TTS openings with generated-TTS word audio.
- **Note 37** — Our School: regenerate “学校有教室” and “音乐教室”.
- **Note 38** — Our School → Build a Sentence: deterministic answer should use generated TTS.
- **Note 40** — School Subject → Build the Sentence: deterministic answer should use generated TTS.
- **Note 41** — Food and Drink → Book Words: trim/regenerate 梨、西兰花、披萨 audio.
- **Note 43** — Food Preference → Make a Sentence: use full-sentence system voice first, with three-part generated TTS as fallback.
- **Note 44** — Meals and Feeling: regenerate the named sentence, especially “午饭”.
- **Note 46** — Meals and Feeling: verify 好吃 / 饱 are linked to generated TTS.
- **Note 47** — Meals and Feeling → Matching Game: deterministic sentences should consistently use generated TTS.
- **Note 49** — Nature: add and link audio for “花”.
- **Note 50** — Nature → Look and Complete: correct local skip behavior and use generated TTS for the completed deterministic sentence.
- **Note 51** — Weather: simplify the named sentence and regenerate its TTS.
- **Note 52** — Weather: deterministic prompts should use generated TTS.
- **Note 53** — Weather → Finish the Sentence: deterministic completed sentences should use generated TTS.
- **Note 54** — Pets → Build a Sentence: generate TTS for the four fixed sentences.
- **Note 55** — Zoo Animals → Build a Sentence: generate TTS for the fixed sentences.
- **Note 57** — Colors: complete Book Words phrase audio, simplify Color Mission instructions, and use generated TTS prompts.
- **Note 58** — Colors → Picture and Phrase: prepare compact, reusable color-word and full-phrase TTS clips.
- **Note 59** — Colors → My Favorite Color: prefer full system speech, with two-part generated TTS as fallback.
- **Note 61** — Toys: regenerate “玩具熊” with the consistent female voice.
- **Note 62** — Toys → Look and Choose: prefer full system speech, then full-sentence or composed generated TTS as fallback.
- **Note 64** — What I Like: regenerate “玩游戏” without the unnatural 儿化 sound.
- **Note 65** — Music and Movement: remove leading silence from “跳舞”.
- **Note 68** — Leisure Time: regenerate “玩儿沙子” with natural 儿化.

### Page layout, copy, content, and visual assets

- **Note 8** — My Body: move the highlight positions for 腿、耳朵、脖子.
- **Note 9** — My Body → Look and Choose: use a left-image/right-options iPad layout.
- **Note 10** — My Body: improve Chinese/English sizing and alignment; clean up the local Matching Game copy and typography.
- **Note 12** — Clothes: replace the incorrect shorts image and check possible duplicate cards.
- **Note 13** — Clothes: resolve the duplicated 裤子 / 长裤 concept and image.
- **Note 16** — Routine: rebuild the 12 clock images from one consistent template.
- **Note 22** — Dates and Months → Matching Game: place Chinese and pinyin on one line and reduce card/game height.
- **Note 28** — Request and Permission: adjust box widths and Book Words alignment.
- **Note 29** — Request and Permission → Build a Sentence: reduce vertical space to fit one iPad screen.
- **Note 35** — Classroom: replace the “电视” image.
- **Note 39** — School Subject: make Review Session 2/3/4 titles reflect their different sentence patterns.
- **Note 42** — Food and Drink → Build a Sentence: retain simple Chinese habit expressions and revise English translations to general-habit wording.
- **Note 60** — Toys: regenerate the “玩具火车” visual asset.
- **Note 63** — Toys → Look and Choose: use a left-picture/right-choices layout to reduce scrolling.
- **Note 66** — Music and Movement → Build a Question: make the picture follow the current question.
- **Note 67** — Hobbies at Home → Look and Choose: use the compact side-by-side layout and make picture/question shuffling work.
- **Note 69** — Leisure Time → Build the Sentence: make the picture change with the shuffled question.
- **Note 70** — Time and Daily Routine → Ask, Is It: remove the unrelated Book Words item and normalize the Look and Choose layout.

## 2. System-Level Notes (7)

### Shared audio lifecycle and playback state

- **Note 2** — Remove leading/trailing dead air from dialogue audio generally.
- **Note 6** — Fix first-click versus second-click volume inconsistency.
- **Note 25** — Prevent a first click from playing both fallback system voice and late-arriving generated TTS.
- **Note 45** — The first-play volume defect appears again on “炒饭”; treat it as another instance of the shared Note 6 playback-state bug.

### Shared game behavior

- **Note 15** — Enforce one green arrow per game, in the upper-right only.
- **Note 21** — In Listen and Choose, do not replay the prompt automatically after a correct answer.

### Shared component layout

- **Note 56** — Give Match the Pairs a reusable horizontal Chinese → pinyin → English row layout, with an optional leading icon.

## 3. Mixed Notes (3)

- **Note 14 — Days of the Week**
  - Page-specific: use generated TTS for the named lesson content.
  - System-level: the same first-click/second-click volume inconsistency described in Note 6.

- **Note 31 — My Stationery → Build the Sentence**
  - Page-specific: show the English and Chinese prompt side by side on this exercise.
  - System-level: reduce shared description and game-title font sizes across all pages.

- **Note 48 — Meals and Feeling**
  - Page-specific: audit reply/response sentences and link predetermined replies to generated TTS.
  - System-level: “我渴了” repeats the shared first-play volume defect from Notes 6, 14, and 45.

## 4. Repeated Page Reports That Point to Shared System Work

These notes are classified as page-specific because they name concrete lesson fixes, but implementing each one independently would repeat the same work.

### Deterministic-answer audio policy

**Notes 24, 30, 32, 34, 38, 40, 47, 50, 52, 53, 54, and 55** all request the same rule:

> When an exercise has one predetermined correct sentence, play a pre-generated full-sentence TTS asset instead of browser/system speech.

This should be treated as one reusable exercise-audio capability with page-level content/configuration.

### Audio quality and asset QA

**Notes 3, 5, 11, 20, 23, 26, 27, 33, 37, 41, 44, 49, 51, 57, 58, 61, 64, 65, and 68** are local asset defects, but together suggest a common QA checklist for:

- leading and trailing silence;
- word-internal pauses;
- pronunciation and tones;
- loudness consistency;
- clipped, soft, or distorted syllables;
- correct voice source and complete asset coverage.

### iPad vertical-space pressure

**Notes 9, 22, 29, 31, 56, 63, 67, and 70** report the same usability pressure: exercises do not fit comfortably on one iPad screen. Shared responsive spacing, row layouts, and typography tokens could reduce one-off layout fixes.

### Picture/question state synchronization

**Notes 66, 67, and 69** report pictures that do not follow the current or shuffled question. These are page-level symptoms of a likely shared exercise-state or rendering problem.

## 5. Recommended Workstreams

1. **Playback engine and shared game behavior** — Notes 2, 6, 14 (volume portion), 15, 21, 25, 45, 48 (volume portion), 50 (skip behavior).
2. **Reusable deterministic-TTS support** — Notes 24, 30, 32, 34, 38, 40, 47, 50, 52–55; then evaluate Note 36 against the same audio architecture.
3. **Page-level audio asset repairs** — Notes 1, 3–5, 7, 11, 17–20, 23, 26, 27, 33, 37, 41, 44, 46, 49, 51, 57, 58, 61, 64, 65, 68.
4. **Responsive layout and shared typography** — Notes 9, 10, 22, 28, 29, 31, 56, 63, 67, 70.
5. **Page content and visual assets** — Notes 8, 12, 13, 16, 35, 39, 42, 60, 66, 69, 70.
6. **Exercise-specific voice strategy** — Notes 36, 43, 59, and 62, which use dynamic sentence composition and should not automatically follow the deterministic full-sentence rule.
