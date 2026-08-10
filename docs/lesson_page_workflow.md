# Lesson Page Build Checklist

Last updated: 2026-08-09

Use this checklist to build or materially change one learning topic. It is a decision order, not a page template and not a required reading list.

## 1. Start with only the evidence for this topic

Read the relevant book OCR, curriculum reference, topic mapping, and existing asset manifests. Do not begin with broad audits, art guidance, character bibles, or past development notes unless the topic creates a specific need for them.

Record the target URL and confirm in code:

- `topic.id` and the mapped book lesson or lessons;
- the topic data that owns scenes, words, notes, and practice;
- the explorer and practice render functions;
- any existing game pattern being reused.

Search for the topic ID and current child-facing copy before editing. Do not assume similarly named topics share a renderer or data model. Record book evidence separately from mapping inference; the book wins if they conflict.

## 2. Create one short contract before implementation

Create a contract before changing the page, then update that same file as evidence and implementation decisions become clear. Put it in the matching [lesson-contracts/](./lesson-contracts/) category. It is required even when no new art is needed.

Keep only:

- confirmed language for each mapped book lesson;
- unresolved source gaps;
- the planned scene, optional Book words, optional Useful note, and practice goal;
- ownership of each visible section.

Use the contract to trace every confirmed requirement to a scene, Book words, Useful note, or practice. If a sentence cannot have its own picture, record how another child-facing surface covers it. Do not create a second planning, audit, or handoff document. Remove proposals from the contract once they are rejected or resolved. An asset path or asset-coverage label is not lesson evidence.

If the topic returns in a later book, identify the new language job. If it is not clear, then consult [curriculum_guide.md](./curriculum_guide.md).

## 3. Plan the smallest useful page

Decide the teaching beats before selecting art or a game:

1. What scene or scenes make each target sentence understandable?
2. Which words still need a focused Book words reference after the scenes?
3. Does a Useful note explain a reusable distinction that scenes do not?
4. What remains unpractised after those sections?

The usual page order is: **scenes → optional Book words → optional Useful notes → practice**. This is not compulsory: omit any section that does not add a distinct teaching job. Each visible section has one owner. If a custom renderer owns the page content, set `ownsExplorerContent: true` and suppress generic duplicate panels.

## 4. Define the practice before choosing the game

For each remaining learning goal, write down:

- the cue the child receives;
- the response the child gives;
- complete valid answers and plausible distractors;
- feedback and completion behavior;
- what randomizes between rounds and what stays stable within a round.

Then consult [Practice Patterns](./game_templates.md) and choose the smallest fitting pattern. For sentence-fill practice, each configured round must own a whole approved sentence; never generate sentences from independently mixed word categories.

## 5. Build from approved assets

Reuse the asset library when it clearly teaches the planned scene. Generate new art only for a genuine teaching gap found during page planning. Read visual guidance only at this point, and only the guidance relevant to the new asset.

For new art, follow [art_direction.md](./art_direction.md), plus the character or school bible when applicable. Keep source assets, manifests, lesson data, and practice data aligned; do not copy the same file path into unrelated arrays.

## 6. Verify the page

Before handoff:

- verify every asset path exists and every retired asset is unreferenced;
- check that scenes, Book words, notes, and generic panels do not duplicate each other;
- verify the topic is included in both the explorer and practice dispatch paths, not merely its data and renderer;
- test selected, wrong, correct, and completed states;
- confirm all visible copy describes the current interaction;
- run the relevant data validation, build, tests, and `git diff --check`;
- review the actual page at its target desktop and mobile widths.

Update the same contract with the result and remaining evidence gaps. Keep the change scoped to one topic or one reusable pattern.
