# Leisure Time — 4B Lesson 7

Started: 2026-08-14  
URL: `lesson.html?topic=hobbies-leisure`
Completed: 2026-08-14

## Evidence and scope

- Book vocabulary: `跑步`, `踢足球`, `骑自行车`, `玩儿沙子`.
- Target frame: `在 + 地点 + 活动`.
- This is the final sibling page in Play & Hobbies, not an addition to Hobbies at Home.

## Locked build decisions

- Scene is a 2×2 desktop grid of four 4:3 landscape assets: school playground/running, park/soccer, park/cycling, and beach/sand play.
- Book words are text-only; scene cards already carry the visual evidence.
- Useful note explains `在 + 地点 + 活动`.
- Practice is sentence-frame fill. Every round owns one full approved sentence and a New game control must move to a different randomized round.
- The asset-library audit found established running, soccer, and bike scenes; their source ratios differ, but the activity evidence remains intact in the fixed 4:3 UI frame. Sand play was the only genuine scene gap.

## Completed build

- Added Leisure Time as its own equal landing card in Play & Hobbies and mapped Book 4B Lesson 7 directly to it.
- Reused the existing running and bike character scenes. Added only the missing sand-play scene, then added scene narration, text-only Book words, and the place-and-activity Useful note.
- Corrected an initial generated-asset mistake: do not generate replacements before auditing the library. The three drifted generated duplicates are not referenced or listed as production assets.
- The original running and bike scenes are 3:2 and the original Yangyang soccer scene is portrait. Adapt the established scenes to reviewed native 4:3 landscape files before wiring them, rather than relying on `cover`, `contain`, or forced cropping. The final grid now has four native 4:3 production assets.
- User correction after review: the generated Yangyang soccer image had unnatural hair. Replace that exact scene and its narration with Tiantian (`天天在公园踢足球。`), generating from Tiantian's character-bible anchor. Remove the rejected Yangyang landscape asset rather than leaving it as an unused production file.
- Sentence-builder correction: show the word-order scaffold `Who · 在 · Where · What` as pale, disappearing slots inside the target box so the child has a clear construction hint, not only a generic instruction.
- Voice correction: use the Meijia-preferred Mandarin voice stack for every Leisure Time scene, Book words playback, and completed sentence-builder utterance.
- Added a fixed-sentence builder. It shows Hanzi, pinyin, English, and speech on success; it hides unused chunks and **New game** always starts a different round when one is available.
- Regenerated the asset summary and ran `npm run check` successfully.
