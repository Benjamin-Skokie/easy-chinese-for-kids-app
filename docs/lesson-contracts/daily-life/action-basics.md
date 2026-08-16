# Everyday Actions / 日常动作

Status: `implemented; visual QA complete`<br>
URL: `index.html?topic=everyday-actions#topic-detail`<br>
Topic group: **Time & Daily Life / 时间和日常**

## Scope

This is a Learn by Topic enrichment unit, not a claimed textbook lesson. It
turns the existing, child-friendly action illustrations into a coherent visual
vocabulary page. The unit may reinforce book language where it overlaps—such
as `走路` in 4A Transport and `跑步` in 4B Leisure Time—but it must not imply
that the six actions were taught together by one book lesson.

The topic belongs in **Time & Daily Life**, not Play & Hobbies: the set spans
movement, posture, and rest in ordinary settings rather than a single hobby or
game.

## Confirmed topic language

| Action | Scene sentence | Asset |
| --- | --- | --- |
| `走路` | `他在走路。` | `walk-v2.webp` |
| `跑步` | `他在跑步。` | `run-v2.webp` |
| `坐` | `他坐在椅子上。` | `sit-chair-v2.webp` |
| `站` | `他站着。` | `stand-v2.webp` |
| `爬` | `他在爬梯子。` | `climb-ladder-v2.webp` |
| `躺` | `他躺在床上。` | `lie-bed-v3.webp` |

All six final assets live in `assets/illustrated-actions-basic/` and use a
consistent 4:3 landscape canvas, the same boy and outfit, and a clean white
background.

## Page blueprint

| Section | Owner | Decision |
| --- | --- | --- |
| Scene | Everyday Actions renderer | A responsive 2-column gallery with six cards (one column on phones). Every card uses the same 4:3 image stage and a consistent white-background asset. It shows one action word, the complete sentence, pinyin, English, and Play audio. |
| Book words | Everyday Actions renderer | Omit a duplicate word-card row: every target already has a clear image and sentence in the gallery. |
| Useful note | Everyday Actions renderer | Omit. This is a vocabulary unit, not a standalone grammar explanation. |
| Practice | Everyday Actions renderer | Picture-to-word choice. The sole green top-right button starts a different randomized action round; no bottom action button appears. Choose the matching Hanzi action word from the six choices. On success, show and automatically speak that image's complete sentence with Hanzi, pinyin, and English. |
| Shared focus panels | Shared shell | Suppress generic duplicate panels when the Everyday Actions renderer owns the topic content. |

## Implementation guardrails

- Add `everyday-actions` to the `time-daily` learning-home category and its
  topic-card metadata; do not place it under Play & Hobbies.
- Use the child visibly shown in each asset as `他`; do not introduce a named
  character that the illustration does not establish.
- Keep `走路` and `跑步` useful as cross-topic review, but do not remove the
  more specific Transport and Leisure Time scenes that teach their book
  contexts.
- Keep the final action series uniform: same boy, outfit, white background,
  4:3 canvas, and child-appropriate scene details.

## Completion checklist

- [x] Topic data, renderer dispatch, explorer, and practice paths are wired.
- [x] Every asset path and sentence matches the approved table above.
- [x] All six practice rounds, incorrect feedback, correct feedback, automatic
  success audio, and top-right New game behavior are tested.
- [x] Desktop and mobile gallery layouts preserve the evidence in every asset.
- [x] This contract and `docs/topic_build_backlog.md` are marked complete.
