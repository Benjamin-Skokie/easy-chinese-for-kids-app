# Hobbies 2A — What I Like: Build Log

Last updated: 2026-08-12

This file preserves the detailed iteration record for the first Hobbies page, **What I Like** (Book 2A Lesson 5), including the redirects that changed its assets, page structure, and practice. The earlier product-history sections are retained as context for why the current workflow exists. It is not current build instruction; use [lesson_page_workflow.md](../lesson_page_workflow.md) instead.

## Follow-on page: Hobbies (3B Lesson 4)

**Scope decision:** The next page remains inside the Hobbies navigation area, but is selected by **Book 3B · Lesson 4**. It does not append its vocabulary to the 2A page. The lesson owns five new activity words—`唱歌`, `跳舞`, `游泳`, `滑冰`, and `滑雪`—and its distinct language job is asking `你喜欢…吗？` and answering `我喜欢…`.

**Blueprint before implementation:** The page uses a 2×3 scene grid (five activity scenes), text-only Book words, one question/answer Useful note, and a question builder. Completion shows and speaks both the built question and an affirmative answer. **Play** changes to a new activity.

**Asset decision:** Four exact, character-anchored activity scenes already existed. `滑冰` was the only genuine gap. A new Noah ice-skating scene was created only after reviewing the art direction and Noah’s character anchor; it was accepted because it clearly shows skates and a gliding pose, preserves Noah’s blond hair and blue eyes, and stays within the lesson-scene size limit.

**Implementation decision:** Lesson-specific data is selected by the active book and lesson, so the existing 2A content remains untouched when the learner chooses 3B. This is the working model for the later Hobbies pages too: shared navigation, separate lesson data, scenes, note, and practice.

## Redirect: separate child page, preserve parent layout

**What went wrong:** The first implementation used one Hobbies renderer keyed by the selected book lesson. That made the 3B six-cell grid class apply to the existing 2A scene section, changing the approved 2×2 layout. It also exposed the 3B lesson as a book-selection tab rather than as its own page under Hobbies. The generic scene image rule used `object-fit: cover`, which cropped Noah’s skates—the exact visual evidence for `滑冰`.

**Corrected rule:** A later book lesson that needs its own scenes and practice must be a separate child topic/page beneath its parent topic, not a branch in the parent renderer. Its renderer, state, and grid classes must be scoped to that child page so an earlier page cannot change. For action scenes where the whole figure or object is teaching evidence, use a contain-style image treatment rather than crop it.

**Correction:** Restore **What I Like (2A)** to its dedicated 2×2 grid. Create a separate **Hobbies (3B)** child page reachable from the Hobbies page shelf and from Book 3B Lesson 4. Scope the five-scene 3B grid and the non-cropping scene image rule to that child only.

## Redirect: activity pages, not an in-page Hobbies landing shelf

**What went wrong:** The child-page correction still treated the 2A lesson as a Hobbies landing page and inserted a large “More Hobbies lessons” card with a feature-sized image underneath it. That makes the completed lesson feel like navigation furniture rather than a focused learning page, and it is not what “separate pages” meant.

**Corrected rule:** Hobbies is a grouping in the home navigation, not a page that needs its own large child-page shelf. Each focused activity lesson is a normal, sibling topic card in **Play & Hobbies**. The first two are **What I Like (2A)** and **Music & Movement (3B)**. Later 4B lessons will be added as their own cards when built. No in-page lesson shelf, no parent/child detour, and no oversized navigation image.

## Redirect: scene sentence must match the visible subject

**What went wrong:** The 3B dance card used `我们爱跳舞。` even though its asset shows Luna alone. It also appeared cropped because the general `.school-scene-image` rule came later in the stylesheet and overrode the earlier 3B contain rule.

**Corrected rule:** A scene sentence must state exactly the visible subject: one child uses `她` or `他`; `我们` is only valid when the image visibly shows the group. For a scene where the full figure teaches the action, the scoped non-cropping rule must appear after the shared image rule (or have stronger specificity), then be checked in the actual page.

**Correction:** Luna’s card now says `她爱跳舞。` and the 3B image rule is placed after the shared scene-image declaration so all five action scenes use `object-fit: contain`.

## Redirect: asset aspect ratio must match its assigned layout

**What went wrong:** The existing Luna dancing asset is portrait (`1024×1536`), but the Music & Movement scene grid is landscape. Changing CSS to avoid a crop only exposed unused background space; the asset itself was the wrong format for that card.

**Corrected rule:** Check each assigned asset’s native aspect ratio before layout implementation. If a scene card requires a landscape image, generate or select a landscape scene rather than trying to rescue a portrait asset with CSS. Keep a still-useful portrait asset in the library unless replacement was explicitly requested.

**Correction:** A new `1400×1050` landscape Luna dancing scene is used only by Music & Movement. It preserves Luna’s side-braid identity and keeps her full dance pose inside the 4:3 scene frame; the original portrait file is retained but unreferenced by this page.

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

## 11. Hobbies page start: lesson boundaries before implementation

This entry records the start of the Hobbies work so the next implementation step is easy to resume without repeating the same decisions.

### What we established

1. **Started from cross-book evidence, not the existing generic topic card.** We confirmed that Hobbies returns in four distinct book lessons:
   - **2A Lesson 5:** `看书、画画儿、写字、玩儿游戏、每天`; `我爱…`, `我喜欢…`, and `我每天…`.
   - **3B Lesson 4:** `唱歌、跳舞、游泳、滑冰、滑雪`; preference questions.
   - **4B Lesson 4:** TV, piano, computer games, films, and cartoons; preference versus an action happening now.
   - **4B Lesson 7:** leisure activities in places, using `在 + place + activity`.

2. **Initial proposal:** Keep these as progressive sections on one Hobbies page, initially building only the 2A section. The intention was to avoid adding extra navigation while preserving the curriculum sequence.

3. **User redirect:** A single page containing several book lessons would be too busy, and each lesson needs its own focused practice. The accepted architecture is therefore a Hobbies navigation area with four focused lesson pages: *What I Like* (2A), *Hobbies* (3B), *Hobbies at Home* (4B), and *Leisure Time* (4B). A page must not mix the other lessons' Book words, scenes, notes, or games.

4. **Asset audit before UI work:** We stopped before building the page to check whether the asset library could teach each lesson honestly.
   - 2A has an exact `看书` child scene.
   - A grandfather-writing image visibly supports `写字` only as a word cue; it cannot support a first-person 2A story sentence.
   - 2A is missing an exact `画画儿` scene and a general non-device `玩儿游戏` scene.
   - 3B already has singing, dancing, swimming, and skiing; skating is missing.
   - 4B-at-home already has cartoons; television, piano, and films are missing, and tablet games are only a close substitute for computer games.
   - 4B leisure already has running, soccer, and cycling; playing in sand is missing.

5. **User redirect on new art:** For drawing and writing scenes, a paper surface must face the child. Even when the child faces the camera, the paper should angle away from the viewer rather than become a camera-facing presentation prop.

### Current next step

Build only **What I Like (2A Lesson 5)** after adding or approving the two missing exact visuals for `画画儿` and `玩儿游戏`. Its page and practice should stay limited to the four 2A activities and the complete approved sentences: `我爱看书。`, `我喜欢画画儿。`, `我喜欢写字。`, and `我每天玩儿游戏。`

### Correction during the first asset attempt

We attempted the three missing 2A hobby illustrations (`画画儿`, `写字`, and non-device `玩儿游戏`) before the page implementation. The drawing composition was usable in isolation, but all three results introduced generic children rather than the recurring cast; the writing scene also had the child turn back to the viewer instead of concentrating naturally on the workbook. The results were rejected and removed from the app library.

**What caused the drift:** The generation prompts described a general child and style but did not first use [art_direction.md](../art_direction.md) and [character_bible.md](../character_bible.md) as required identity sources. This skipped the anchor step that preserves a character’s recognisable face, hair, age, and overall identity.

**Correction:** Before any replacement asset is generated, choose the named recurring character for the teaching beat, inspect that character’s portrait and full-body anchors, include them as visual references, and explicitly require the scene to match the anchor. For writing and drawing, the character should be engaged with the page rather than looking back at the viewer; the paper must face the character, away from the camera. Review identity and pose before accepting an image, then only copy approved files into `assets/`.

### Follow-up: Anan’s drawing is for Anan, not a viewer-facing prop

The first character-anchored drawing revision successfully restored Anan’s identity, but a closer review found that the sheet still lay flat toward the viewer. Its house drawing was upside down from Anan’s point of view and read as a camera-facing presentation image. The user also redirected the content away from a generic house toward a more imaginative castle drawing.

**Decision:** Identity matching alone is not enough. For any drawing activity, review the orientation of both the paper and the pictured subject from the character’s point of view. If the page must remain legible in the scene, use an over-the-shoulder or side-on camera angle; never rotate the child’s work simply to make it upright to the viewer. The accepted replacement shows Anan from behind/side, concentrating on a castle-and-dragon drawing oriented for her use.

### Follow-up: writing must look like working, not posing at a desk

The first writing revision had the right paper-facing rule and a recognisable character, but the child sat back in the chair. The action read as resting with a pencil rather than actually writing. The user directed us to use the existing `grandpa_writing.webp` scene as the pose reference and to switch the recurring character from Meimei to Luna.

**Decision:** A writing asset needs a forward working posture: the writer leans naturally toward the desk, one hand writes, and the other steadies the paper. Use the grandfather scene as a composition reference for this activity, while keeping the new character’s own identity anchor. Keep paper content intentionally soft and unreadable (faint grids and blurred practice marks only), so the image teaches `写字` without turning a page’s orientation into a visual correctness problem. The accepted asset is Luna writing at a desk.

### Follow-up: keep the lesson structure standard

While deciding how to show the four 2A activity sentences, an initial proposal added two narrative/text cards to make a 2×3 grid. The user redirected this: those cards are not part of the established lesson structure and would invent a new layer of content.

**Decision:** Keep the page in the shared order: **Scene → Book words → Useful notes → Practice**. The Scene section is a **2×2** grid, with one clear illustration and one complete book-backed sentence per activity. Book words then carry `看书、画画儿、写字、玩儿游戏、每天`; the Useful note explains `我喜欢…` versus `我每天…`; practice uses only the approved complete sentences. Do not add narrative cards unless a lesson contract explicitly calls for a narrative scene.

### Follow-up: do not repeat scene visuals in Book words

After the 2×2 Hobbies Scene grid was added, the initial Book words section repeated the same four activity images. The user identified that this added no teaching value and made the page heavier.

**Decision:** When a Scene section already gives each target word a clear visual cue and complete sentence, Book words should be compact text-only cards. Their job is quick vocabulary review, not a duplicate picture gallery. Use pictured Book words only when the scene does not already establish the visual reference or when a specific contrast needs isolated visual support.

### Follow-up: sentence builders must accept equivalent language

The first Hobbies sentence builder treated each picture as if it had one fixed answer. This wrongly rejected natural alternatives such as `我喜欢玩儿游戏。`, `我爱玩儿游戏。`, and `我爱每天看书。` when the picture and the lesson language supported them.

**Decision:** A sentence game validates the language job, not merely a preselected sentence string. For this lesson, every activity image accepts the equivalent preference and routine frames: `我爱 + 活动`, `我喜欢 + 活动`, `我每天 + 活动`, and `我爱 / 喜欢每天 + 活动`. The game must use valid-prefix checking so it can accept more than one correct completion, then show and speak the exact sentence the child built. This avoids teaching the false rule that `爱` and `喜欢` cannot be exchanged here.

## Working principle going forward

For a new topic: verify the book evidence, define the teaching scene, decide whether focused words or a note add value, state the remaining practice goal, then choose the interaction and assets. Build and polish only after that chain is sound.
