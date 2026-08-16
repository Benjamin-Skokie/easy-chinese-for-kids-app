# Lesson Page Build Checklist

Last updated: 2026-08-15

Use this checklist to build or materially change one learning topic. It is a decision order, not a page template and not a required reading list.

## 1. Start with only the evidence for this topic

Read the relevant book OCR, curriculum reference, topic mapping, and existing asset manifests. Do not begin with broad audits, art guidance, character bibles, or past development notes unless the topic creates a specific need for them.

Record the target URL and confirm in code:

- `topic.id` and the mapped book lesson or lessons;
- the topic data that owns scenes, words, notes, and practice;
- the explorer and practice render functions;
- any existing game pattern being reused.

Search for the topic ID and current child-facing copy before editing. Do not assume similarly named topics share a renderer or data model. Record book evidence separately from mapping inference; the book wins if they conflict.

## 2. Create and maintain one short contract

Create a contract before changing the page, then update that same file as evidence and implementation decisions become clear. Every visible topic keeps a contract after it is built, so it remains the compact cross-book record of the page's current and future learning layers. Put it in the matching [lesson-contracts/](./lesson-contracts/) category. It is required even when no new art is needed.

Keep only:

- confirmed language for each mapped book lesson;
- unresolved source gaps;
- the planned scene, optional Book words, optional Useful note, and practice goal;
- ownership of each visible section.

Use the contract to trace every confirmed requirement to a scene, Book words, Useful note, or practice. If a sentence cannot have its own picture, record how another child-facing surface covers it. Do not create a second planning, audit, or handoff document. Remove proposals from the contract once they are rejected or resolved. An asset path or asset-coverage label is not lesson evidence.

If the topic returns in a later book, identify the new language job. If it is not clear, then consult [curriculum_guide.md](./curriculum_guide.md).

## 3. Lock the page blueprint before assets or code

Before generating an asset or writing a renderer, put this compact, final decision table in the topic contract. Do not infer extra cards, narrative, layouts, or practice rules while building.

| Section | Decide before build |
| --- | --- |
| Scene | Grid/layout, required visible image ratio, one teaching beat per card, and the exact sentence each scene supports—including the people visibly present. For a repeated action set, also lock the recurring character, clothing, backdrop, and image dimensions across the complete set. |
| Book words | The exact words; whether cards are text-only or need isolated visual support. |
| Useful note | The single reusable distinction it explains, or omit it. |
| Practice | The remaining language job, game pattern, allowed answer family, whether the response is a question and its required marker, completion display (including unused-choice treatment), and the exact job of every control: audio replay, new round, or both. Do not reuse a Play-shaped control for a different job without stating its state transition. |

The usual page order is: **Scene → optional Book words → optional Useful notes → Practice**. Start from this structure; do not add narrative or filler cards unless the contract establishes a distinct teaching job for them. If Scene already gives every target word a clear picture and sentence, Book words must be text-only rather than repeat the same images. Each visible section has one owner. If a custom renderer owns the page content, set `ownsExplorerContent: true` and suppress generic duplicate panels.

If a later book lesson owns different scenes, language, and practice, make it a separate sibling activity page in the relevant home category. Do not place it as a tab, renderer branch, or feature-sized navigation shelf inside an earlier completed lesson.

## 4. Define practice as an answer model, not a fixed string

For each remaining learning goal, write down:

- the cue the child receives;
- the response the child gives;
- every valid answer or a small explicit answer grammar, including equivalent frames such as `爱` / `喜欢` where the lesson permits them;
- distractors and invalid combinations; for picture-based choice, a distractor must be visually and semantically incompatible, not simply a less-specific sentence that could also fit;
- feedback, completion display (Hanzi, pinyin, and English), and speech behavior; do not repeat an already visible selected answer unless the duplicate adds a distinct teaching job;
- any construction scaffold the child needs (for example, `Who · 在 · Where · What`), including whether it appears as pale slots inside the answer box and disappears as words are selected;
- which unused choices, distractors, or controls remain visible after success;
- what **Play** does: a new randomized round, not merely audio replay; when more than one round exists, it must differ from the current round;
- the full eligible round set for randomization and what stays stable within a round.

For a compact picture-choice practice panel, use one top-right green control only. Its label, icon, and behavior must agree in every state. If it starts a new round, it must never speak; if the correct choice should speak the complete sentence, trigger that speech from the correct-answer event instead. Do not add a second bottom Play, arrow, or New-game control after success.

Then consult [Practice Patterns](./game_templates.md) and choose the smallest fitting pattern. For sentence-fill practice, each configured round must own a whole approved sentence; never generate sentences from independently mixed word categories.

For a builder with more than one valid answer, use valid-prefix checking against the approved answer set. Tell the learner before play that more than one answer can be correct. Do not make punctuation a selectable word card.

When the target is a question, say so in both the instruction and empty target, and name the required question marker (for example, `吗`). A statement without that marker must not appear to be an equally valid target.

## 5. Build from reviewed assets

Reuse the asset library when it clearly teaches the planned scene. Generate new art only for a genuine teaching gap found during page planning. Before any new asset prompt, read [art_direction.md](./art_direction.md); if the scene has a recurring person or school setting, also read the relevant character or school bible and inspect the anchor images.

Check each selected asset’s native aspect ratio against the scene grid before coding. The grid’s visible image ratio is a page requirement: select or generate an asset that fits it rather than relying on `contain` to expose mismatched source shapes. Use a deliberate crop only when it preserves the teaching evidence.

For a scene grid specified as **N × 2**, render exactly two columns on desktop and one column on phones. Every card must have the same visible image frame and height. CSS padding or `object-fit: contain` is not a substitute for a coherent asset series when source backgrounds or subject scale make cards look uneven. For a new repeated action series, create final assets at the contracted ratio (normally 4:3), with the same recurring child, consistent clothing and scale, and a clean white or transparent background. Inspect every final image at normal page size for visual defects and semantic mistakes—for example, damaged skin details, unsafe poses, or shoes on a bed—before wiring it into the lesson.

Keep production image URLs relative to the page or application root; never use a local `file://` or machine-specific path. Prefer WebP for new raster assets. A file that only exists locally is not a deployable asset: confirm that every referenced image is tracked and will be included in the published site.

Write the prompt from the page blueprint. It must explicitly lock:

- the named recurring character and its supplied anchor references;
- the action pose and what makes the action visibly active;
- for attention-based actions (watching, reading, drawing, writing), the character's body and gaze toward the activity object rather than the camera;
- object orientation from the character's point of view (especially paper, books, screens, and drawings);
- the required landscape, portrait, or square composition and the full teaching evidence that must remain inside the frame;
- what must be unreadable or omitted to avoid false visual claims;
- the accepted composition and scene purpose.

Review each generated asset before copying it into the app. Reject it if identity, action, orientation, or teaching beat is wrong, even if its general style is attractive. If a reviewed named-character asset is rejected, replace its lesson sentence, practice round, manifest entry, and file together; remove the rejected production asset. Keep source assets, manifests, lesson data, and practice data aligned; do not copy the same file path into unrelated arrays.

## 6. Verify the page

Before handoff:

- verify every asset path exists, is repository-tracked for deployment, uses the intended relative URL, and every retired asset is unreferenced;
- verify every scene image uses the contracted display ratio and its sentence matches the visible subject;
- check that scenes, Book words, notes, and generic panels do not duplicate each other;
- verify the topic is included in both the explorer and practice dispatch paths, not merely its data and renderer;
- test selected, wrong, correct, completed, hidden-unused-choice, Clear (when present), and every control state; confirm each eligible round can be drawn and that a new-round control creates a different round; test at least one alternative valid sentence where the answer model allows more than one;
- after the correct answer, confirm speech occurs only at the contracted moment, every duplicate bottom control is absent, and the sole top-right control performs its contracted job;
- confirm all visible copy describes the current interaction;
- listen to every new or polyphonic target word in its rendered page; if the default voice is wrong, use and document a scoped voice preference before widening it to other topics. Verify that preference reaches every lesson speech surface: scene controls, Book words, and practice-completion playback;
- run the relevant data validation, build, tests, and `git diff --check`;
- when a browser-facing bundle or stylesheet changes, update its versioned URL in `index.html` so local cached copies cannot hide the change;
- review the actual page at its target desktop and mobile widths.

Update the same contract with the result and remaining evidence gaps. Keep the change scoped to one topic or one reusable pattern.
