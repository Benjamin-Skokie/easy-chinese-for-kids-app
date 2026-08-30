# System-Level Bug Worklog

Last updated: 2026-08-29

This is the living implementation record for cross-page bugs reported in `docs/bug_report.md`. The original report remains the source record and must not be rewritten from this file.

## Status Summary

| Workstream | Status | Implementation |
| --- | --- | --- |
| SYS-01 Shared audio playback lifecycle | Implementation complete; device verification pending | Implemented in shared service |
| SYS-02 Audio-source routing policy | Implementation complete; device verification pending | Explicit recorded-first, recorded-only, browser-first, and composed-recording paths implemented |
| SYS-03 Audio asset QA pipeline | Automated pass complete; listening verification remains targeted | Shared prompt, manifest coverage, full boundary audit, and targeted regeneration are implemented |
| SYS-04 Shared game controls and completion behavior | Implementation complete; cross-page verification pending | Shared New game/Clear contract and silent correct-answer behavior applied |
| SYS-05 Question/picture state synchronization | Implementation verified | Hobbies round state uses one item ID for picture, prompt, choices, and answer |
| SYS-06 Shared responsive game layout | Implementation complete; representative iPad verification complete | Shared compact prompt/choice layout and horizontal matching-card metadata applied |

**Overall:** classification and the SYS-01/SYS-02 implementation passes are complete. SYS-03 generation-quality work is in progress. SYS-01 and SYS-02 are not marked fully fixed until they pass target iPad/Safari verification.

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

- [x] Define explicit audio modes in the shared API instead of inferring policy from whether an asset happens to exist.
- [x] Keep deterministic and dynamic policies separate.
- [x] Add a manifest/configuration audit for required deterministic sentence assets.
- [x] Migrate shared exercise components before migrating individual pages.
- [x] Migrate the affected page configurations in batches.
- [x] Add tests proving that each mode selects only its permitted source and fallback.

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

- [x] Centralize the Learn TTS request prompt so it can be inspected and tested without calling the API.
- [x] Tell the model exactly how to handle natural punctuation pauses, connected words, clean first-syllable onset, and a clean ending with no added tail.
- [x] Define 儿化 as a light rhotic ending fused to the preceding syllable, while preserving lexical 儿 as in `儿子`.
- [x] Add targeted input rewrites and pronunciation guidance for `画画儿`, `玩儿游戏`, `玩儿电脑游戏`, `玩儿沙子`, and `动画片儿`.
- [x] Add a dry-run prompt preview and automated tests that make no API request.
- [x] Measure leading and trailing silence for every generated audio asset.
- [x] Define conservative retained-boundary thresholds: 100 ms for standalone playback and 60 ms for composed clips.
- [x] Add a report-only audit and targeted trim path before updating playback boundaries.
- [x] Trim excessive boundary silence without cutting consonants or natural sentence endings.
- [ ] Normalize loudness to a documented target without clipping; do not alter loudness without listening verification.
- [x] Detect missing files and manifest entries that point to no recorded asset.
- [x] Produce a targeted human listening checklist for pronunciation, tone, pauses, voice consistency, and artifacts.

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

- [x] Define the arrow contract: upper-right, one per game, skip/new-question behavior.
- [x] Separate “play prompt,” “submit answer,” and “next/skip” actions for sentence builders: the green control advances to a new round; Clear retains the existing round and resets only the learner's answer.
- [x] Inventory green-arrow implementations and remove duplicate completion controls.
- [x] Remove automatic prompt replay after a correct Listen and Choose answer in Greetings, Polite Words, Family, Introductions, Age, Numbers, Weekdays, Dates, School, and School Subjects.
- [x] Add shared regression checks for completion controls and silent correct-answer states.

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

- [x] Identify the shared Hobbies round-state pattern used by the affected exercises.
- [x] Use one selected round/item ID for picture, word choices, and correct answer.
- [x] Ensure New Game selects a different eligible round when alternatives exist.
- [x] Render every dependent surface from the selected round.
- [x] Add regression checks for each affected round set; manually verify repeated New Game transitions on all three reported pages.

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

- [x] Define shared sizing for descriptions, gaps, media size, and answer controls.
- [x] Add a responsive left-picture/right-choices layout for suitable exercises.
- [x] Add a reusable horizontal Chinese → pinyin → English row for shared matching cards.
- [x] Keep smaller-screen stacking as an intentional breakpoint behavior.
- [x] Run representative visual QA at the desktop/iPad layout width.

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

- SYS-03 targeted remediation: regenerated the reported pronunciation and coverage defects for Names and Introduction, Clothes, Dates and Months, Comparisons, Transportation, My Home, School, Food, Nature, Weather, and Toys. The pass includes `T恤`, `九月，开学了。`, `多少`, `地铁站`, `书桌`, `学校有教室。`, `音乐教室`, `西兰花`, `披萨`, the named 午饭 sentence, `花`, `玩具火车`, and `玩具熊`.
- Corrected two source mappings that could not be solved by regeneration alone: Dates now requests the complete displayed calendar sentence, and School now requests `音乐教室` rather than the typo `音月教室`.
- Added pre-generated recorded answers for all 12 clock prompts (`几点了？现在…。`) and generated the two Weather sentence variants that had been missing from the manifest. Automated coverage is now 1017/1017 recorded assets.
- Removed the contradictory 儿化 instruction for `玩儿游戏` and `玩儿沙子`: their display spelling remains unchanged, while the generated speech input uses `玩游戏` / `玩沙子` without an attempted erhua.
- Generated clips are measured and trimmed only in the target batch; the original site-wide audit is not re-run. Standalone playback retains at most 100 ms at either boundary; composed playback keeps 60 ms.

- Corrected the source-report scope for Note 60: “玩具火车” is a TTS audio-quality regeneration issue, not a visual-asset request. It belongs to SYS-03 audio asset QA.

- SYS-06: added the shared `practice-compact-split` layout for Toys, Hobbies at Home / Leisure, and Ask, Is It; My Body now uses the same left-art/right-options principle at wider widths. Request & Permission remains single-column because its builder already sits inside a half-width practice panel. Matching cards in shared lesson practice render Chinese, pinyin, and English on one compact row where available. The game-description style is shared and reduced across practice pages.

- Created the worklog from the 70-note Bug report and its classification.
- Recorded the initial source-code findings for the shared audio service.
- Implemented the first SYS-01 shared audio lifecycle pass in `src/core/audio.js`.
- Added regression coverage in `tests/build-contract.test.mjs` and rebuilt `app.js`.
- Verified `npm test` (118/118), `node --check app.js`, and `git diff --check`.
- The aggregate `npm run check` remains blocked by pre-existing learning-data validation failures, including missing clothing assets and incomplete lesson sets; the audio change introduces no new test failure.
- Target iPad/Safari verification remains pending; SYS-01 is not yet marked fully fixed.
- Began SYS-03 before requesting any new TTS generation: centralized the Learn audio prompt and added explicit pause, onset, ending, and 儿化 requirements.
- Added phrase-level 儿化 handling plus a `--dry-run --show-prompt` inspection path; no TTS API request was made.
- Added four prompt regression tests. Before generation, the full suite exposed 46 newly authored manifest entries with no recorded asset.
- After explicit approval, generated all 46 previously missing Learn recordings with the revised prompt and synchronized the recorded-audio index to 953/953 coverage.
- Force-regenerated 33 reported or related quality-sensitive clips, including the `玩儿…` / `…片儿` families, `披萨`, `西兰花`, `跳舞`, `学校有教室`, `音乐教室`, and the existing clip-specific pronunciation cases.
- Verified the complete automated suite at 125/125 and `git diff --check`; human listening review and waveform-boundary measurement remain pending.
- Completed the SYS-02 implementation pass with explicit `recorded-only`, `browser-first`, and composed recorded-sequence behavior in the shared audio service.
- Migrated the reported deterministic exercises to recorded-only playback and preserved system-first behavior for Food Preference, My Favorite Color, and Toys with recorded fallback segments.
- Reworked Color Mission to use authored colour-object phrases, concise instructions, and recorded-only playback; Book Words now read both the colour and its complete example phrase.
- Generated 39 new fallback/phrase recordings and synchronized manifest coverage to 992/992.
- Verified 130/130 automated tests, `node --check app.js`, and `git diff --check`. The aggregate `npm run check` still stops at the pre-existing learning-data validation failures listed above; target Safari/iPad audio verification remains pending.
