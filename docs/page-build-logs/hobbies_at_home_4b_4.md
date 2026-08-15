# Hobbies at Home — 4B Lesson 4

Started: 2026-08-14  
Completed: 2026-08-14  
URL: `index.html?topic=hobbies-at-home#topic-detail`

## Evidence and scope

- Book vocabulary: `看电视`, `弹钢琴`, `玩儿电脑游戏`, `看电影`, `看动画片儿`.
- Book frames: `喜欢…`, `爱…`, and `在…`.
- This is a sibling page under Play & Hobbies, not a section inside either completed Hobbies lesson.

## Locked build decisions

- Scene is a 2×3 desktop grid, with five 4:3 landscape assets and one complete sentence per card.
- Book words are text-only; scenes already carry the visual teaching work.
- Useful note distinguishes a general preference (`喜欢` / `爱`) from an action happening now (`在 + activity`).
- Practice is sentence choice, not a builder that claims a still image can decide whether someone generally likes an activity. Each round has one exact approved scene sentence, two same-topic options, randomized order, success support, and a New game control.
- Existing cartoon art is exact. The tablet and piano-environment assets are not substitutes for the required computer-game and piano-action scenes.

## Completed asset batch

- Reused `meimei_watching_cartoons.webp` for the cartoon activity.
- Added four exact 4:3 scene cues: Anan playing piano, Lele playing a desktop computer game, Sisi watching television, and Tiantian at the cinema.
- The generated scenes were reviewed for the character anchor, action evidence, visible 4:3 composition, and final optimized WebP size before page wiring.

## Iteration: screen-viewing poses

- The first computer-game, television, and cinema scenes had the child turn back toward the viewer, which weakened the visual claim that they were watching or playing.
- Replaced all three with side or rear three-quarter compositions. Each child now faces the relevant screen naturally; the screen remains visible to the learner.
- Reusable rule: for watching, reading, drawing, writing, and similar attention-based actions, the character’s body and gaze must point to the activity object rather than to the camera.

## Iteration: sentence-choice completion

- The correct option already shows the complete Hanzi, pinyin, and English, so the separate completion block repeated the same answer without teaching anything new.
- Completion now leaves the selected option and its green check in place, speaks it, and removes the duplicate sentence block.

## Iteration: `弹钢琴` pronunciation

- `弹钢琴` is `tán gāng qín` (second tone), not `dàn gāng qín`.
- The displayed Hanzi and pinyin remain the book phrase. Context alone did not disambiguate this browser voice. After confirming Meijia reads it correctly, the complete Hobbies at Home page now explicitly prefers the installed Meijia Mandarin voice; other topic pages retain their existing voice preference.

## Iteration: compatible sentence choices

- A television scene showing cartoons supports both `她喜欢看电视。` and `她喜欢看动画片儿。`; those statements must not be presented as right versus wrong.
- The television and cartoon rounds now use visibly incompatible activities as distractors. Sentence-choice distractors must be false for the pictured evidence, not merely less specific than the target.

## Iteration: New game behavior

- A random reshuffle could place the same round first again, so the green New game arrow appeared to do nothing.
- New game now reshuffles the complete eligible set and, when another round exists, guarantees that its next round differs from the current one.

## Final verification

- The custom explorer and practice dispatch paths include `hobbies-at-home`.
- All five scene assets are 4:3 landscape WebP files and match their visible sentence subjects.
- Hobbies at Home uses Meijia audio as a scoped pronunciation trial; the default preference remains unchanged elsewhere.
- `npm run check` passes.
