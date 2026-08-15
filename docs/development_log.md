# Development Log

Last updated: 2026-08-14

This is the short, forward-looking record for **cross-page workflow discoveries**. Add an entry only when a completed page exposes a reusable gap in the active workflow, then update [lesson_page_workflow.md](./lesson_page_workflow.md) in the same change. Keep page-specific iteration, rejected assets, and local design redirects in `page-build-logs/` instead.

## How to use this log

- One entry per reusable discovery, not one entry per implementation step.
- State the failed assumption, the corrected rule, and where it was added to the workflow.
- If the lesson is page-specific, create or update `page-build-logs/<topic>_<book>_<lesson>.md` instead.
- Periodically remove entries whose rule is already clear in the workflow; the workflow is the source of truth.

## 2026-08-14 — Focused follow-on lessons need independent pages

**Failed assumption:** A later book lesson could live as a branch, tab, or large navigation shelf inside an earlier completed page.

**Corrected rule:** When a later lesson has its own scenes, language job, and practice, make it a sibling activity page in the relevant home category. Keep the parent lesson page focused; do not add a feature-sized in-page lesson shelf.

**Workflow update:** Section 3 now requires the contract to decide whether the lesson is an independent sibling page before implementation.

## 2026-08-14 — Scene assets and practice states need explicit display contracts

**Failed assumption:** A shared CSS image style or a finished correct answer automatically produces an appropriate learning surface.

**Corrected rule:** Lock a scene grid’s display ratio before selecting assets; choose/generate assets for that ratio rather than exposing mixed source shapes. Each scene sentence must name only the people visibly present. For practice, state whether the response is a question, which marker it requires, which rounds are eligible for randomization, what disappears after success, and whether a distractor is actually incompatible with the pictured evidence.

**Workflow update:** Sections 3–5 now require display-ratio and subject checks, plus an explicit completion-state and randomization rule for practice.

The detailed records are [What I Like (2A)](./page-build-logs/what_i_like_2a_5.md) and [Music & Movement (3B)](./page-build-logs/music_movement_3b_4.md).

## 2026-08-14 — Attention-based actions need an attention direction

**Failed assumption:** A named screen or activity prop alone makes a viewing or making action clear, even when the child turns toward the camera.

**Corrected rule:** For watching, reading, drawing, writing, and similar attention-based actions, show the character’s body and gaze directed toward the activity object. A side or rear three-quarter view is usually the clearest option; keep enough of the object visible for the learner to identify the activity.

**Workflow update:** Section 5 now requires the prompt to lock the attention direction as well as the action pose.

## 2026-08-14 — New game must visibly be new

**Failed assumption:** A random reshuffle is enough for a child-facing New game control.

**Corrected rule:** When multiple rounds exist, New game must choose a new randomized round that differs from the current one. A possible no-op is not a usable reset experience.

**Workflow update:** Section 4 now makes the non-repetition requirement explicit.

## 2026-08-14 — Child-facing audio needs a listening audit

**Failed assumption:** Correct Hanzi and pinyin guarantee that browser TTS will pronounce a polyphonic word correctly.

**Corrected rule:** Listen to every new or polyphonic target in its actual page. If the default voice is wrong, use a documented page-scoped voice preference first; only promote it after it is tested across more lessons.

**Workflow update:** Section 6 now includes the rendered-audio check. Hobbies at Home uses Meijia as the first scoped trial.
