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

**Corrected rule:** Lock a scene grid’s display ratio before selecting assets; choose/generate assets for that ratio rather than exposing mixed source shapes. Each scene sentence must name only the people visibly present. For practice, state whether the response is a question, which marker it requires, which rounds are eligible for randomization, and what disappears after success.

**Workflow update:** Sections 3–5 now require display-ratio and subject checks, plus an explicit completion-state and randomization rule for practice.

The detailed records are [What I Like (2A)](./page-build-logs/what_i_like_2a_5.md) and [Music & Movement (3B)](./page-build-logs/music_movement_3b_4.md).
