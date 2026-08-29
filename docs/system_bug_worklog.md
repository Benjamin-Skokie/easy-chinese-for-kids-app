# System-Level Bug Worklog

Last updated: 2026-08-29

This is the living implementation record for cross-page bugs reported in `docs/bug_report.md`. The original report remains the source record and must not be rewritten from this file.

## Status Summary

| Workstream | Status | Implementation |
| --- | --- | --- |
| SYS-01 Shared audio playback lifecycle | Implementation complete; device verification pending | Implemented in shared service |
| SYS-02 Audio-source routing policy | Scoped | Not started |
| SYS-03 Audio asset QA pipeline | Scoped | Not started |
| SYS-04 Shared game controls and completion behavior | Scoped | Not started |
| SYS-05 Question/picture state synchronization | Scoped | Not started |
| SYS-06 Shared responsive game layout | Scoped | Not started |

**Overall:** classification and the first SYS-01 implementation pass are complete. SYS-01 is not marked fully fixed until it passes target iPad/Safari verification.

## What Has Been Done

- [x] Preserved the original 70-note Bug report without rewriting it.
- [x] Classified all 70 notes into page-specific, system-level, and mixed scopes.
- [x] Grouped repeated page symptoms into shared implementation workstreams.
- [x] Located the central recorded-audio/browser-speech service in `src/core/audio.js`.
- [x] Confirmed that the application does not intentionally use a lower first-click volume.
- [x] Identified a likely first-play cold-start weakness: a new `Audio` object is created and played immediately for every request, without a persistent warmed player or readiness gate.
- [x] Identified an unguarded asynchronous fallback path that can allow an obsolete failed request to invoke browser speech.
- [x] Added one shared playback request lifecycle with stale-request protection.
- [x] Made cancellation settle and rewind the prior recorded-audio request.
- [x] Prevented recorded audio from initializing/cancelling browser speech when no browser utterance is active.
- [x] Set recorded playback volume explicitly to full volume before `play()`.
- [x] Added regression tests for browser-utterance cancellation, explicit recorded volume, stale fallback, and repeated-tap cancellation.
- [x] Rebuilt the production `app.js` bundle successfully.
- [x] Passed the complete automated test suite: 118/118 tests.
- [ ] Reproduce the first-click volume defect with instrumentation on the target iPad/Safari environment and confirm the exact cause.

## SYS-01 — Shared Audio Playback Lifecycle

**Priority:** P0  
**Bug report coverage:** Notes 6, 14 (volume), 25, 45, and 48 (volume)

### Goal

Every user action produces one predictable playback at normal volume. A stale or cancelled request must never start a second voice later.

### Work

- [ ] Add temporary playback diagnostics: request ID, requested text, selected source, readiness events, play resolution/rejection, fallback, cancellation, and completion.
- [ ] Reproduce first-play softness on a fresh page load and after navigation on iPad/Safari.
- [ ] Decide from evidence whether the player needs persistent reuse, explicit warm-up, a readiness gate, or a combination.
- [x] Introduce one shared active playback request with a monotonically increasing request ID.
- [x] Cancel and settle the previous request before starting another request.
- [x] Prevent a cancelled or obsolete recorded-audio request from invoking browser-speech fallback.
- [x] Set the intended recorded playback volume explicitly; target-device verification remains pending.
- [x] Ensure obsolete recorded audio and browser-speech fallback cannot overlap for the same action.
- [x] Add automated unit tests for cancellation, fallback, stale requests, repeated taps, and source exclusivity.
- [ ] Remove or disable temporary diagnostics after verification.

### Acceptance Criteria

- The first and second tap of the same card have equivalent perceived volume.
- A single tap produces at most one audible source.
- Repeated rapid taps leave only the most recent requested audio playing.
- A late error from an older request cannot start browser speech.
- Behavior passes on Safari/iPad as well as the desktop test environment.

### Representative Verification Pages

- Names and Introduction — “我叫思思”
- Days of the Week — weekday cards
- Positions and Direction — “书在书包里面”
- Meals and Feeling — “炒饭” and “我渴了”

## SYS-02 — Audio-Source Routing Policy

**Priority:** P0 after SYS-01  
**Bug report coverage:** Notes 24, 30, 32, 34, 36, 38, 40, 43, 47, 50, 52–55, 57, 59, and 62

### Goal

The caller explicitly states how a sentence should be spoken; the shared audio service applies the rule consistently.

### Required Modes

1. **Deterministic full sentence:** generated full-sentence TTS only; browser speech is not the normal source.
2. **Dynamic sentence, system-first:** browser/system voice reads the complete sentence; configured TTS clips are fallback only.
3. **Composed TTS:** combine approved phrase/word clips only where the exercise explicitly requires composition.
4. **Recorded word/phrase:** play the linked generated asset; use fallback only according to the declared policy.

### Work

- [ ] Define explicit audio modes in the shared API instead of inferring policy from whether an asset happens to exist.
- [ ] Keep deterministic and dynamic policies separate.
- [ ] Add a manifest/configuration audit for required deterministic sentence assets.
- [ ] Migrate shared exercise components before migrating individual pages.
- [ ] Migrate the affected page configurations in batches.
- [ ] Add tests proving that each mode selects only its permitted source and fallback.

### Acceptance Criteria

- Deterministic exercises never unexpectedly use system voice.
- Dynamic exercises in Notes 43, 59, and 62 retain their explicitly requested system-first behavior.
- Missing assets are reported during validation rather than silently changing the voice policy.

## SYS-03 — Audio Asset QA Pipeline

**Priority:** P1  
**Bug report coverage:** Note 2 and repeated page-level audio defects

### Goal

Generated assets enter the app with consistent silence, loudness, clarity, and manifest coverage.

### Work

- [ ] Measure leading silence, trailing silence, peak level, and average loudness for every generated audio asset.
- [ ] Define acceptable thresholds for short words, phrases, and full sentences.
- [ ] Add a report-only audit before enabling any automated trimming or normalization.
- [ ] Trim excessive boundary silence without cutting consonants or natural sentence endings.
- [ ] Normalize loudness to a documented target without clipping.
- [ ] Detect missing files, duplicate text variants, and manifest entries that point to no recorded asset.
- [ ] Produce a human listening checklist for pronunciation, tone, pauses, voice consistency, and artifacts.

### Acceptance Criteria

- Clicking a short word produces speech promptly.
- Dialogue gaps come from the application’s deliberate pause setting, not hidden silence in the files.
- Loudness is consistent across regenerated and existing assets.
- The audit can identify failures before assets are shipped.

## SYS-04 — Shared Game Controls and Completion Behavior

**Priority:** P1  
**Bug report coverage:** Notes 15, 21, and 50 (skip behavior)

### Goal

Shared controls have one meaning and one placement across exercises.

### Work

- [ ] Inventory green-arrow implementations and identify duplicate local controls.
- [ ] Define the arrow contract: upper-right, one per game, skip/new-question behavior.
- [ ] Separate “play prompt,” “submit answer,” and “next/skip” actions.
- [ ] Remove automatic prompt replay after a correct Listen and Choose answer.
- [ ] Add shared interaction tests for initial, incomplete, correct, and completed states.

### Acceptance Criteria

- Each game renders no more than one green arrow.
- The arrow is in the upper-right and advances/skips without revealing or speaking the current answer.
- Correct-answer feedback does not replay the prompt unless the exercise explicitly opts in.

## SYS-05 — Question/Picture State Synchronization

**Priority:** P1  
**Bug report coverage:** Notes 66, 67, and 69

### Goal

Question text, word choices, correct answer, and picture always derive from the same current round.

### Work

- [ ] Identify whether affected exercises use one shared round-state pattern.
- [ ] Store one current-round object instead of independently updating picture and choices.
- [ ] Ensure New Game selects a different eligible round when alternatives exist.
- [ ] Render every dependent surface from the selected round.
- [ ] Add tests that advance repeatedly and assert picture/question/choices remain synchronized.

### Acceptance Criteria

- The picture changes with the question.
- Repeated New Game actions do not leave a stale picture.
- The displayed picture always supports the configured correct answer.

## SYS-06 — Shared Responsive Game Layout

**Priority:** P2  
**Bug report coverage:** Notes 9, 22, 29, 31, 56, 63, 67, and 70

### Goal

Common exercises use iPad space efficiently while retaining readable text and touch targets.

### Work

- [ ] Define shared iPad layout tokens for titles, descriptions, gaps, media size, and answer controls.
- [ ] Add a responsive left-picture/right-choices layout for suitable exercises.
- [ ] Add a reusable horizontal Chinese → pinyin → English row, with optional icon.
- [ ] Keep smaller-screen stacking as an intentional breakpoint behavior.
- [ ] Run visual QA at the supported iPad viewport sizes.

### Acceptance Criteria

- Target exercises fit within one iPad screen whenever their content count makes that practical.
- Chinese, pinyin, and English have balanced visual hierarchy.
- Touch targets remain usable after spacing reductions.
- No content overlaps, clips, or becomes inaccessible at smaller widths.

## Recommended Execution Order

1. SYS-01 — playback lifecycle and race prevention
2. SYS-02 — explicit audio routing policy
3. SYS-03 — audio asset QA pipeline
4. SYS-04 — shared game controls
5. SYS-05 — question/picture synchronization
6. SYS-06 — responsive layout system

Do not mark a workstream complete because its shared code changed. Completion requires automated checks plus verification on every representative page listed for that workstream.

## Change Log

### 2026-08-29

- Created the worklog from the 70-note Bug report and its classification.
- Recorded the initial source-code findings for the shared audio service.
- Implemented the first SYS-01 shared audio lifecycle pass in `src/core/audio.js`.
- Added regression coverage in `tests/build-contract.test.mjs` and rebuilt `app.js`.
- Verified `npm test` (118/118), `node --check app.js`, and `git diff --check`.
- The aggregate `npm run check` remains blocked by pre-existing learning-data validation failures, including missing clothing assets and incomplete lesson sets; the audio change introduces no new test failure.
- Target iPad/Safari verification remains pending; SYS-01 is not yet marked fully fixed.
