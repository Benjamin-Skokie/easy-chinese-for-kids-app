# Development Log

Last updated: 2026-08-09

This is the short narrative record of how the learning app evolved: the recurring problems, the decisions that resolved them, and the rules worth preserving. It is context, not a second source of instructions. For current build rules, use [lesson_page_workflow.md](./lesson_page_workflow.md).

## 1. We began with coverage, but coverage was not learning

**What went wrong:** Early planning could show that a topic had an asset folder or a mapped textbook lesson, yet the page still failed to teach the required sentence, distinction, or dialogue.

**What we learned:** An image path and a `strong` asset-coverage label prove availability, not curriculum completeness. A child needs a scene that gives a sentence meaning, focused word access when needed, and practice that checks the actual language job.

**Decision:** Every substantive topic now starts with a cross-book lesson contract. It records vocabulary, sentence frames, scene evidence, optional Book words, useful notes, assets, and the practice goal before any interaction is designed.

## 2. We stopped treating a topic as one isolated book page

**What went wrong:** Topics such as Colours, Animals, Time, and Clothes return across books with new language jobs. A single flat vocabulary page made those returns look like repetition instead of progression.

**What we learned:** The curriculum is connected by reusable sentence families: `颜色 + 的 + 名词`, `有 / 没有`, `喜欢 / 不喜欢`, `会`, locations, and time expressions.

**Decision:** Audit a topic across all of its mapped lessons first. Each later return must add an explicit new use, not just more cards. The cross-book audits and individual contracts provide the evidence.

## 3. We moved from generic panels to scene-led lessons

**What went wrong:** Generic focus cards and word lists were easy to render, but they often separated words from meaning. Pages could also accidentally show the same Book words twice: once in a custom lesson and once in the shared shell.

**What we learned:** A child understands a short sentence more readily when an illustration clearly supplies its context. Generic surfaces are useful only when a custom topic does not own the same teaching job.

**Decision:** Scene-led topics use a consistent order: scenes, optional Book words, optional Useful notes, then practice. Each visible section has exactly one owner. Custom renderers set `ownsExplorerContent: true` and tests check that a generic duplicate does not appear.

## Navigation follows the learner's job

**What went wrong:** A single long list of lessons mixed two different needs: a child trying to choose an interesting thing to learn, and an adult trying to find the exact assigned book lesson. Adding every possible link or bar made the screen busier without making either job easier.

**What we learned:** Topic and book are two views of the same curriculum, not two copies of it. The child-facing route should group language by meaningful life topic; the parent/teacher route should preserve the original book and lesson lookup.

**Decision:**

- **Learn by Topic** is the primary child path. Topics are grouped into broad, recognizable categories such as Start Speaking, Me & Family, School Life, Food, World Around Us, and Play & Hobbies.
- **Find by Book** is the secondary lookup path. It maps a book and lesson to the same topic page instead of creating a parallel lesson experience.
- A navigation bar is added only when it helps a learner move among peer-level choices: category anchors on a longer home, lesson tabs within a multi-book topic, or compact display controls that are useful across pages.
- Navigation should remain compact, have a clear current state, and disappear when it would compete with the lesson’s own task. It must not become a second content panel.
- The URL keeps the selected topic (`?topic=...`) and topic-detail state, so a parent can share or return to the exact lesson without duplicating the page structure.

This gives children a stable mental model - “I want to learn animals” - while retaining the book alignment adults need - “Book 2B, Lesson 5.”

## 4. We learned not to choose games before settling content

**What went wrong:** It was tempting to attach a familiar game to every topic. That can make the page feel active without practising the missing knowledge.

**What we learned:** The same interaction can be correct for one lesson and misleading for another. A fill-in exercise must use approved complete sentences; it cannot generate arbitrary combinations from compatible words. A listening game needs plausible distractors and randomized positions.

**Decision:** Define the remaining practice goal, cue, response, valid answers, distractors, feedback, and randomization before choosing a template. Reuse the shared game patterns only when they fit that contract.

## How we design games, and why

The app uses games to make a child retrieve a specific piece of language, not merely to add motion to a page. A game is selected after the lesson contract identifies what scenes and Book words have not already proved.

| Game pattern | Use it when the child needs to | Why it fits | Design rules we learned |
| --- | --- | --- | --- |
| Listen and choose | recognize a spoken word, phrase, or sentence | It makes audio essential and gives quick, age-appropriate feedback. | Randomize prompt and choice order; use believable distractors; clear the previous wrong state when a new prompt begins. |
| Find and tap | connect a spoken phrase to an object in a meaningful scene | It tests comprehension in context, rather than translation recall. | The target must be visually unambiguous; do not depend on fixed left/right position or tiny scene details. |
| Matching | connect a word to a picture, meaning, or paired phrase | It gives focused repetition when a small set of relationships matters. | Use equal, touch-friendly cards; keep the relation consistent; show completion clearly. |
| Sentence-frame fill | complete one already taught sentence pattern | It moves from recognition toward controlled production without asking a beginner to invent language. | Store whole approved sentences as rounds; never manufacture sentences from independently shuffled word categories; keep the complete sentence visible after success. |
| Build a phrase | order short, stable chunks into a sentence | It makes word order and a reusable frame visible. | Use only chunks the child has already seen in scenes; accept valid alternatives where Chinese permits them; avoid a puzzle that can be solved by card shape. |
| Situation chooser | choose the phrase that fits a small social or everyday context | It tests meaning, politeness, and practical use more honestly than a word-definition quiz. | Make the situation distinct before asking the child to choose; do not make English the only clue. |
| Collection or sorting | group items by a meaningful category or fulfill a short request | It works when classification itself is the lesson, such as packing, shopping, food/drink, or pets/zoo. | Reset the mix deliberately, randomize targets, show red/green feedback, and make the destination meaningful rather than decorative. |

The same design checks apply to every game:

- The prompt, instruction, accessible label, feedback, and completion state must all describe the same task.
- Audio is a first-class cue, not an optional replay button.
- One round should have one clear language goal.
- Correctness must not be discoverable from a fixed screen position, card size, or a stale selected state.
- A game needs an explicit success state and a recoverable wrong state.
- When a topic returns in a later book, its game should practise the new language job, not re-skin the earlier one.

## 5. Existing art is reusable only when it teaches the right thing

**What went wrong:** Asset names and broad topic labels made some visuals appear suitable even when their composition did not demonstrate the language. A composite image could be attractive but fail to distinguish the required relationships.

**What we learned:** Asset inventory is not teaching proof. The visual must make the target contrast immediately readable at the size used in the app.

**Decision:** Write the teaching beat and target container before selecting or generating art. Preserve aspect ratio with `object-fit: contain` unless a deliberate crop is approved. Use the art direction and recurring-character anchors when new art is genuinely required.

## 6. We made visual consistency a product rule, not a finishing touch

**What went wrong:** Different rounds of asset generation drifted in style, composition, character identity, and background treatment. This was especially noticeable for recurring kids, family members, teachers, and school settings.

**What we learned:** A friendly style is not enough; a learning library needs stable anchors. An adult must read as an adult, named children must remain recognisable, and an illustration must leave room for the lesson UI.

**Decision:** The character and school bibles are visual source-of-truth files. New illustrations are original, WebP, proportion-preserving, and reviewed for teaching clarity, identity, file size, and container fit before adoption.

### The anchor technique

We created **character bibles** and a **school bible** because a text-only prompt was not enough to keep repeated people and places stable across independently generated illustrations.

- A character anchor records the canonical asset and the traits that must not drift: face shape, skin tone, hair, eyes, age read, relationship, and visual role.
- An environment anchor records the recurring setting: the school’s architecture, key rooms, adult roles, and the visual details that make a scene read as part of the same campus.
- A new prompt starts by naming the anchor and explicitly requiring a match, then adds only the new action, expression, clothing, camera angle, and teaching beat.
- When a result is wrong, correct identity or setting first; do not try to compensate with more decorative style language.

This technique lets us reuse Lele, Anan, family members, teachers, and school spaces without creating a new visual identity every time a lesson needs a scene. It also keeps the child focused on the language task rather than having to re-interpret who or where they are seeing.

### Build the asset library before building the page

**What went wrong:** Creating one illustration while implementing each page slowed both jobs down. The page layout kept changing while the visual brief was still unsettled, and one-off generations caused noticeable drift in characters, composition, and style.

**What we learned:** Asset production and page composition are related but different decisions. A consistent, reusable visual library gives a page builder stable ingredients; page building then reveals only the genuinely missing teaching beats.

**Decision:** Create and review assets in coherent batches first - for example, a complete animal vocabulary set, a stable character cast, or a family of related school scenes. Register the accepted assets in their manifests and reuse them across pages. During page work, generate a new image only when the approved scene plan exposes a real gap that the library cannot teach clearly.

This order improves speed, avoids mid-build visual drift, and keeps new art intentional rather than a reaction to an unfinished layout.

## 7. We protected the static-app experience while making the code maintainable

**What went wrong:** The original single `app.js` was convenient to open directly, but difficult to change safely as topic-specific behavior accumulated.

**What we learned:** The product benefits from modular source ownership without giving up direct `file://` opening for a fresh clone.

**Decision:** Hand-edited code lives in `src/`; `app.js` is a committed generated browser bundle. Runtime wiring, topic rendering, shared games, state, and feature data are separated. Build-contract tests protect the bundle and routing behavior.

## 8. We treated card density as an interaction problem

**What went wrong:** Vocabulary cards with a large image above several labels used too much vertical space and left empty horizontal space, especially in Book words grids.

**What we learned:** The image, Hanzi, pinyin, and English should read as one compact unit. A horizontal composition improves scanability and makes more of a topic visible at once.

**Decision:** Image-backed Book words use the shared compact card pattern: illustration on the left, language stack on the right, with smaller artwork at mobile widths. Nature’s icon cards use the same visual logic.

## 9. We found that source documents can disagree

**What went wrong:** The Animals audit exposed a mapping that named `我有一只...` while the available OCR clearly supported pet vocabulary and `喜欢` but did not confirm that exact ownership frame.

**What we learned:** A tidy mapping cannot override primary lesson evidence. Uncertainty must be written down rather than silently converted into child-facing copy.

**Decision:** Lesson contracts can remain `needs-content-audit`. When sources conflict or OCR is incomplete, pause content implementation, identify the missing verification, and keep the proposed scope explicit.

## 10. Documentation became useful, then became too diffuse

**What went wrong:** Each iteration created a plan, audit, handoff, or review export for a legitimate reason. Over time, finding the active source of truth became harder than finding the information itself.

**What we learned:** Documentation needs ownership too. A file should be either an active instruction, primary data, generated review view, active lesson contract, or historical record. It should not pretend to be several.

**Decision:** The documentation guide identifies the current starting points. Active lesson contracts live together. Superseded plans and historical first-pass work are archived rather than destroyed. This log records why the structure exists, so future cleanup does not lose the reasoning behind it.

## Working principle going forward

For a new topic: verify the book evidence, define the teaching scene, decide whether focused words or a note add value, state the remaining practice goal, then choose the interaction and assets. Build and polish only after that chain is sound.
