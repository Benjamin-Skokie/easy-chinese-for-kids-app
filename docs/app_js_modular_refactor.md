# App JavaScript Modular Refactor

Last updated: 2026-08-09

## Goal

Keep the current single-page application, its `?topic=...` links, and direct `file://` opening behavior while moving maintainable source code out of the monolithic `app.js`.

`src/` is the only hand-edited JavaScript source. The root `app.js` is a committed, generated bundle so a fresh clone can open `index.html` without installing npm packages.

## Decisions

- Preserve `index.html`, current URLs, and Culture as-is.
- Use a single, exact-version `esbuild` development dependency; it has no runtime browser dependency.
- Build a non-minified ES2020 IIFE bundle with no dynamic chunks or source map, so `file://` does not need module loading or a local server.
- Do not split CSS, redesign lessons, or introduce a framework in this refactor.
- Keep `docs/structured_learning_content_refactor.md` as historical context only; its multi-page/no-build proposal is superseded by this document.

## Target Source Layout

```text
src/
  main.js
  core/          # route, state, DOM, audio, feature registry
  games/         # shared game behavior
  features/      # topic data, explorer, practice, scoped state
  data/          # navigation, books, lessons, shared references
```

A feature registers its owned topic IDs, creates its scoped state, renders its explorer and practice areas, and cleans up timers or audio on topic changes. Shared games receive declarative configuration and never import a feature renderer.

## Migration Checklist

### 1. Build baseline

- [x] Commit pre-refactor course work separately.
- [x] Add `src/main.js`, `src/legacy-app.js`, `scripts/build_app.mjs`, package scripts, and an initial build contract test.
- [x] Install the exact locked dependency and generate the first bundle without changing behavior.

### 2. Core and validation

- [ ] Extract navigation actions, DOM lookup, and shared utilities.
- [x] Extract URL parsing and topic URL generation into `src/core/router.js` with unit coverage.
- [x] Extract audio into `src/core/audio.js` with unit coverage.
- [x] Prefer the installed Mandarin female voice (`Tingting`) while retaining browser-default fallback.
- [ ] Add data validation for duplicate topic IDs, lesson references, practice references, and asset paths.
- [x] Validate Time & Daily Life asset paths and scene/practice relationships in `scripts/validate_learning_data.mjs`.

### 3. Feature migration

- [ ] Migrate Time & Daily Life in topic-sized commits.
- [x] Organize Time & Daily Life data into topic-owned files: `weekdays.js`, `time.js`, `dates.js`, `comparisons.js`, `positions.js`, `transport.js`, and `rooms.js`.
- [x] Move the My Home topic registry definition into its existing `src/features/time-daily-life/rooms.js` module.
- [x] Move the Descriptions & Comparisons topic registry definition into `src/features/time-daily-life/comparisons.js`.
- [x] Move the complete Stationery topic into `src/features/school-life/stationery.js` as the School Life migration pattern.
- [x] Move the complete School Supplies topic into `src/features/school-life/school-supplies.js` using atomic source replacement.
- [x] Move the complete Classroom topic into `src/features/school-life/classroom.js`.
- [x] Move the complete School topic into `src/features/school-life/school.js`.
- [x] Move the complete School Subjects topic into `src/features/school-life/school-subjects.js`.
- [x] Move the Food topic into `src/features/food/food.js`; Food no longer belongs to the School Life data object.
- [x] Move Food Preferences into `src/features/food/food-preferences.js`.
- [x] Move Meals & Feelings into `src/features/food/meals-feelings.js`, including conversation, picture-choice, and sentence practice data.
- [x] Move the complete Introductions topic definition, scenes, and practice data into `src/features/foundations/introductions.js`.
- [x] Move the complete Greetings template lesson definition, scenes, and listening set into `src/features/foundations/greetings.js`.
- [x] Move the complete Polite Words template lesson definition, scenes, and listening set into `src/features/foundations/polite-words.js`.
- [x] Move the complete Age topic definition, scenes, and sentence-building data into `src/features/foundations/age.js`.
- [x] Move the complete Countries & Languages topic definition, flag set, and conversation data into `src/features/foundations/identity.js`.
- [x] Move the complete Family topic definition, scenes, avatar mappings, and matching data into `src/features/family/family.js`.
- [x] Move the complete Clothes topic definition, scenes, and picture matching data into `src/features/daily-life/clothes.js`.
- [x] Extract the shared Listen and Choose, Matching Game, and Say It renderer into `src/games/shared-lesson-practice.js` with explicit state, audio, and DOM dependencies.
- [ ] Migrate School, Food, Foundations, and Family/Home.
- [ ] Delete the matching legacy code after each replacement passes checks.

### 4. Completion

- [ ] Remove `src/legacy-app.js`.
- [ ] Keep `src/main.js` as bootstrap, global controls, and feature dispatch only.
- [ ] Record ownership and maintenance rules in this document.

## Required Checks

Run for every refactor commit:

```sh
npm run check
```

The command regenerates the bundle, runs unit checks, syntax-checks it, and rejects whitespace errors. Before a commit, also verify direct `file://` opening, representative topic URLs, display controls, audio, reset behavior, and browser history manually.

For development, run `npm run dev` once. It serves the app at `http://127.0.0.1:4173`, rebuilds after every change under `src/`, and automatically refreshes the browser. The normal `file://` page remains supported for direct viewing of committed output.

## Ownership Rules

- Feature state belongs in `state.features[featureId]`; navigation and display controls remain core state.
- A topic configuration owns its scenes, Book Words, Useful Notes, and practice items.
- Shared games own standard feedback, reset, and completion behavior; features own learning content and answer rules.
- Generated `app.js` must never be edited by hand.
