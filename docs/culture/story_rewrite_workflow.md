# Culture Story Rewrite and Handover Workflow

Last updated: 2026-08-21

This is the operational handover document for revising the app's Chinese culture stories. It is written so that a new editor, researcher, or coding agent can take over a batch without needing the history of the project.

Use this workflow for all categories under `culture/content/`, including philosophy, religion, history, politics, literature, folk tales, inventions, geography, food, art, and daily culture.

## 1. Product and Editorial Goal

The audience is primarily children in the United States who are learning Chinese as an additional language or who have little prior knowledge of China. The broad age range is roughly elementary school through junior high school, but not every article must suit every age.

Each finished article should:

- feel like a complete, engaging piece of children's nonfiction rather than a story outline;
- give the child concrete scenes, questions, actions, contrasts, or discoveries to follow;
- explain essential cultural context without assuming prior knowledge of Chinese geography, dynasties, books, titles, or customs;
- be historically responsible and traceable to saved research;
- contain natural Chinese and an independently polished, native-sounding English version;
- preserve the spirit and meaning of the Chinese without forcing sentence-by-sentence translation;
- keep existing images whenever they remain accurate and useful;
- carry an honest reading-difficulty label;
- use tooltips only when they add optional information that is genuinely new.

The core quality standard is:

`Accurate research + a story-shaped explanation + natural bilingual writing.`

## 2. Source of Truth and File Contract

A normal article directory is:

```text
culture/content/<category>/<slug>/
  page.md
  zh.md
  en.md
  references.md
  images/
```

The files have different jobs:

- `page.md` is the source used by the current bilingual page builder. Treat it as the canonical website copy.
- `zh.md` is the readable standalone Chinese manuscript.
- `en.md` is the readable standalone English manuscript.
- `references.md` is the private research record. It does not render on the website.
- `images/` contains source images copied into generated pages during the build.

Keep the article title, section order, claims, and difficulty consistent across `page.md`, `zh.md`, and `en.md`. Do not revise only `zh.md` or `en.md` and assume the website will change.

Generated pages live under both:

```text
culture/books/<category>/<slug>/
culture/experiments/<category>/<slug>/
```

Do not hand-edit generated `index.html`, `styles.css`, or copied images. Rebuild them from `page.md` and the shared page builder.

Some older stories do not yet have the full four-file structure. Before assigning one, inspect the directory and its build script. If a story has only `page.md`, create aligned `zh.md`, `en.md`, and `references.md`. If several legacy source files feed one rendered story, the coordinator must define the mapping before writing begins.

## 3. Roles in a Parallel Batch

The tested batch size is three stories at a time: three independent story owners and one coordinator/reviewer. A story owner owns one complete article, not just one language. This prevents Chinese research, English meaning, and source boundaries from drifting apart.

### Story owner

The story owner may edit only the assigned story directory:

- `page.md`
- `zh.md`
- `en.md`
- `references.md`
- image captions or image files only when the assignment explicitly includes them

The story owner is responsible for research, claim checking, Chinese rewriting, English adaptation, internal consistency, and a clear handoff note.

### Coordinator/reviewer

The coordinator:

- inventories and assigns non-overlapping story directories;
- identifies high-risk claims before writing;
- reviews every source and every finished story;
- makes the final difficulty decision;
- controls shared files such as `culture/content/glossary.json`, category annotation files, catalogs, styles, templates, and build scripts;
- rebuilds generated output;
- runs repository-wide validation;
- records batch status and unresolved editorial decisions.

### Shared-file rule

Parallel story owners must not edit these files unless the coordinator assigns exclusive ownership:

```text
index.html
culture/index.html
culture/styles.css
culture/shared/styles.css
culture/content/glossary.json
culture/content/*image-prompts*.md
culture/content/*/image-annotations.json
scripts/
```

This rule avoids merge conflicts and inconsistent catalog or glossary entries. Story owners should list requested shared-file changes in their handoff instead.

## 4. Batch Workflow

### Phase A: Inventory and risk triage

For every candidate story, inspect:

1. Which of `page.md`, `zh.md`, `en.md`, and `references.md` exist.
2. Whether its titles and section order already disagree.
3. Which existing images and captions the page uses.
4. Which category build script contains the slug.
5. Whether the story contains claims that require especially careful research.

High-risk subjects include:

- philosophy or religion presented as a single settled doctrine;
- legends mixed with historical biography;
- the authorship or formation date of ancient texts;
- “first,” “only,” “invented by,” or exact-number claims;
- invented motives, dialogue, private thoughts, weather, or scene details attributed to historical people;
- exact dimensions, routes, dates, populations, or construction totals;
- traditional medicine or science claims that could sound like modern medical advice;
- one folklore version presented as the only authentic version.

Assign each story to exactly one owner. Do not have separate people rewrite its Chinese and English simultaneously.

### Phase B: Research before drafting

Search the web before expanding the story. The purpose is not to collect decorative facts; it is to establish what can safely be said, what is uncertain, and what is later legend.

Prefer sources in this order:

1. Primary texts, inscriptions, museum collections, archives, or official historical documents.
2. University publications, peer-reviewed scholarship, scholarly reference works, and recognized subject specialists.
3. Major museums, libraries, government cultural institutions, and reputable encyclopedias.
4. Strong general-audience sources used only for orientation or child-friendly framing.

Avoid treating travel pages, commercial blogs, unsourced listicles, content farms, social posts, or AI summaries as factual authority. Wikipedia may help locate leads, but important claims should be checked against stronger sources.

For each claim, decide which of these labels applies:

- **Documented:** supported directly by a reliable source.
- **Traditional account:** reported by a later historical or religious tradition, not independently proven.
- **Legend or folklore:** important to cultural memory but not presented as verified history.
- **Scholarly interpretation:** a reasoned reading that should not be stated as undisputed fact.
- **Modern illustrative scene:** an invented example used to explain an idea, clearly separated from historical events.

Do not invent historical dialogue, gestures, emotions, locations, weather, or private thoughts merely to make a story vivid. If the source preserves dialogue, identify the text that preserves it. If a modern imagined scene is useful, frame it openly with language such as “Imagine…” rather than attaching it to a real historical person.

### Phase C: Save `references.md`

Create one `references.md` inside every story directory. It is an editorial artifact and must remain non-rendered.

Use this pattern for each source:

```markdown
# <Article> — References and Editorial Notes

This file is for editorial research and does not render on the website.

## <Source or claim group>

Source: <publisher and title>
URL: <direct URL>
Accessed: YYYY-MM-DD

Supports:

- <specific claim supported by this source>
- <another specific claim>

Editorial boundary:

- <what the article may safely say>
- <what must remain uncertain, labeled as legend, or omitted>
```

A URL alone is not enough. The notes must tell the next editor which statements the source supports and where the boundary lies. Record disagreements between sources rather than silently choosing the most dramatic version.

Usually two to six strong sources are better than a long unreviewed link dump. Direct URLs and access dates are required.

### Phase D: Design the story spine

Before drafting paragraphs, write a one-sentence story spine:

`A child begins with <concrete question or scene>, discovers <cultural idea through evidence or action>, corrects <common misconception>, and leaves with <memorable way to think or act>.`

A strong article normally contains:

1. A concrete hook, puzzle, scene, object, or question.
2. The essential time-and-place orientation.
3. A sequence of discoveries rather than a list of definitions.
4. At least one complication, contrast, misconception, or change over time.
5. A return to the opening image or question in the ending.

Sections should earn their place. Each one should change what the child understands. Do not inflate the article with repeated moral lessons, generic praise of Chinese culture, or unrelated trivia.

Recent successful hard articles range roughly from 1,500 to 2,500 Chinese characters and 800 to 1,450 English words. These are calibration ranges, not quotas. A shorter concrete article may be complete; a complex article may need more room. Depth means a clearer chain of ideas and evidence, not merely more words.

### Phase E: Write the Chinese manuscript

Write the Chinese as original children's nonfiction, not as an abstract encyclopedia entry.

- Prefer concrete nouns and active verbs.
- Make cause, sequence, comparison, and uncertainty visible.
- Explain required background in the main sentence when the child needs it immediately.
- Distinguish documented history, later tradition, folklore, and modern examples.
- Avoid adult academic compression and unexplained idioms.
- Avoid making every paragraph deliver a moral.
- Preserve nuance without turning the article into a debate among scholars.
- Build real paragraphs around one connected idea. Do not place a blank line after every short sentence.

Read the Chinese aloud. If it sounds like lecture notes or a plot summary, revise the scene, transitions, and question chain.

#### Paragraph integrity

A paragraph is a unit of thought, not a single sentence followed by a line break. In both Chinese and English, combine related sentences into a continuous paragraph with a clear internal movement: scene to observation, question to answer, cause to result, or claim to example.

As a practical default, a prose paragraph will often contain two to five related sentences. This is guidance rather than a mechanical quota. A one-sentence paragraph is acceptable only when it has a deliberate job, such as:

- a brief opening hook;
- an important question that changes the direction of the story;
- a line of dialogue;
- a carefully chosen moment of emphasis;
- a short transition whose isolation improves the rhythm.

Do not use repeated one-sentence paragraphs merely to make the article look easier. That pattern makes the page feel fragmented and forces the reader to restart after every line. It also creates excessive vertical scrolling.

In the Markdown sources, a blank line starts a new rendered paragraph. Use a blank line only when the idea, speaker, time, scene, or argumentative step actually changes. Normal sentences belonging to the same paragraph should remain together. Apply this rule independently to `page.md`, `zh.md`, and `en.md` so that none of the three manuscripts keeps the old fragmented formatting.

### Phase F: Rewrite the English independently

Stabilize the Chinese meaning first, then write the English. Follow `culture/content/english_rewrite_guidelines.md`.

The English is not a line-by-line translation. It should:

- preserve the idea, evidence, mood, and story energy;
- sound natural to a native speaker;
- use vocabulary and sentence rhythm accessible to U.S. children;
- explain unfamiliar ideas without sounding babyish or stiff;
- keep uncertainties and legend labels just as carefully as the Chinese;
- preserve every important section and claim while allowing sentences and paragraph breaks to differ.

After drafting, review the English on its own without looking at the Chinese. Then compare the two versions for omitted facts, added certainty, changed tone, or accidental new claims.

Natural English paragraphing does not have to copy the Chinese paragraph boundaries exactly. However, it must still use developed prose paragraphs rather than turning each short sentence into its own line.

### Phase G: Assign difficulty

Difficulty measures the reading and concept load of the article, not whether the subject is “good for children.” Use the same label in all three manuscript files and in the catalog.

- **Easy / 简单:** concrete, familiar subject; mostly linear action; little background knowledge; short explanations.
- **Medium / 中等:** unfamiliar cultural setting or vocabulary; several linked ideas; some historical orientation or comparison.
- **Hard / 困难:** abstract ideas, multiple historical layers, contested evidence, subtle distinctions, or sustained reading. Philosophy will usually be Hard even when its sentences are clear.

Do not lower the label merely because the prose has been improved. Clear writing makes a hard idea accessible; it does not make the idea simple.

Required notation:

```markdown
# page.md frontmatter
difficulty: 困难

# zh.md
> 难度：困难

# en.md
> Difficulty: Hard
```

### Phase H: Tooltips and glossary

Tooltip markers use `[[term]]` and draw from `culture/content/glossary.json`.

Apply this decision test:

1. If the child must know the explanation to follow the sentence, put it in the main text.
2. If the sentence or paragraph already explains the term, do not add a tooltip.
3. Add a tooltip only for optional new orientation: a map relationship, approximate date range, unfamiliar office, book type, object use, or other compact anchor.
4. Mark only the first useful occurrence.

A tooltip that merely repeats “the ancient state where this person was born” adds no value. A useful tooltip might explain that a location was in eastern China near today’s Shandong, or that a dynasty existed about one thousand years ago.

Story owners should note proposed glossary entries in their handoff. The coordinator reviews and adds them to the shared glossary after checking that the wording works everywhere the term appears.

### Phase I: Preserve and audit images

The default is to keep the current art and filename. Do not create new images simply because the text changed.

For every retained image, verify:

- it still matches the revised section;
- its caption does not repeat a corrected myth or unsupported claim;
- it is not being described as literal evidence when it is symbolic or imaginative;
- the `image:` filename in `page.md` exists under the story's `images/` directory;
- moving a section has not separated the image from the idea it teaches.

Rewrite captions when needed. Clearly label symbolic artwork, modern reconstruction, or imaginative scenes. Request new art only when an existing image materially misleads the child or no longer supports any useful teaching beat.

Follow `docs/culture/article_image_workflow.md` if image creation or conversion is actually required. Image conversion must finish before the page build begins.

### Phase J: Synchronize the three manuscripts

Before handoff, confirm:

- titles match in meaning and tone;
- `page.md` frontmatter and hero titles agree;
- all sections appear in the same order;
- the Chinese and English make the same factual distinctions;
- captions are bilingual and accurate;
- difficulty labels agree;
- `references.md` supports every risky or central factual claim;
- no obsolete title, claim, or section survives in one version.

## 5. Story Owner Handoff Template

Every parallel story owner should return this compact report:

```markdown
Story: <category>/<slug>
Title: <Chinese> / <English>
Difficulty recommendation: <level and one-sentence reason>

Files changed:
- page.md
- zh.md
- en.md
- references.md

Major factual corrections:
- <correction>

Legend/uncertainty boundaries:
- <boundary>

Images retained or questioned:
- <filename and decision>

Requested coordinator changes:
- <catalog title, glossary term, annotation update, or none>

Open questions:
- <question or none>
```

The coordinator should reject a handoff that says only “rewritten” or “fact-checked.” The report must surface consequential corrections and uncertainty.

## 6. Coordinator Integration

After reviewing the story manuscripts and references, the coordinator performs shared integration in this order:

1. Resolve editorial comments in the assigned story directories.
2. Add approved glossary definitions.
3. Update image annotation or prompt documents when titles, section names, or factual captions changed.
4. Update both culture catalogs: root `index.html` and `culture/index.html`.
5. Confirm the slug appears in the correct `scripts/build_<category>_all.mjs` file.
6. Run the category build, which generates both `books` and `experiments` pages.
7. Inspect the generated page for title, difficulty badge, section order, missing images, tooltip behavior, and bilingual text.
8. Run the complete repository check.

Typical category build:

```sh
node scripts/build_<category>_all.mjs
```

Full verification:

```sh
npm run check
```

If `page.md` is final but the standalone manuscripts have drifted, regenerate them from the canonical bilingual page copy before editing them further:

```sh
npm run sync:culture-manuscripts -- culture/content/<category>/<slug>
```

This command overwrites `zh.md` and `en.md`. Use it only after confirming that the Chinese and English inside `page.md` are the accepted versions. It preserves the page's section order, prose paragraphs, tooltip markers, ending, and difficulty labels.

Per-story handoff audit:

```sh
npm run audit:culture-rewrite -- culture/content/<category>/<slug>
```

Pass several story directories to the same command to audit a whole batch. This check verifies the four required files, aligned difficulty labels, page/hero/standalone title agreement, aligned section counts, referenced images, the required research-note fields, and repeated one-sentence paragraph runs. It is a structural guardrail, not a substitute for source review or reading the prose aloud.

Do not run multiple category builds concurrently. The current page builder stores glossary formatting state at module scope, so sequential builds are the safer handover rule. Do not run an image conversion and a build that copies that image at the same time.

## 7. Acceptance Checklist

An article is complete only when every applicable item passes.

### Research

- [ ] The web was searched before factual expansion.
- [ ] Central and risky claims have reliable sources.
- [ ] `references.md` contains direct URLs, access dates, supported claims, and editorial boundaries.
- [ ] History, tradition, legend, interpretation, and modern illustration are not blurred together.
- [ ] No historical dialogue, thoughts, motives, scene details, or exact numbers were invented.

### Chinese

- [ ] The article reads as a complete narrative explanation, not a synopsis.
- [ ] It has a concrete hook and a satisfying ending.
- [ ] Background needed for comprehension is explained inline.
- [ ] Detail adds understanding rather than padding.
- [ ] The prose reads naturally aloud.
- [ ] Related sentences form developed paragraphs instead of repeated one-sentence fragments.

### English

- [ ] It sounds written by a native children's nonfiction writer, not translated sentence by sentence.
- [ ] It preserves the Chinese article's meaning, spirit, uncertainty, and interesting details.
- [ ] Vocabulary is clear without becoming babyish.
- [ ] A standalone English read found no stiffness, hidden assumptions, or accidental new claims.
- [ ] Paragraph breaks follow changes in thought or scene, not every short sentence.

### Product integration

- [ ] `page.md`, `zh.md`, and `en.md` agree.
- [ ] Fragmented paragraphing has been removed from all three manuscript files.
- [ ] Difficulty is present and consistent.
- [ ] Tooltips add new optional context and appear only at the first useful occurrence.
- [ ] Existing images and captions remain accurate.
- [ ] Catalog titles and difficulty badges are updated in both indexes.
- [ ] Both generated targets build successfully.
- [ ] The rendered page has been inspected.
- [ ] `npm run check` passes.

## 8. Recommended Production Rhythm

Use batches of three stories until the workflow has been stable across several categories. For each batch:

1. Coordinator spends a short pass on inventory, risk flags, and assignments.
2. Three story owners research and rewrite in parallel.
3. Coordinator reviews one completed story at a time instead of waiting to review all three together.
4. Coordinator integrates shared files once all story-level changes are settled.
5. Build sequentially, inspect, and run the complete check.

Group stories by related expertise when helpful, but avoid assigning three stories that all require the same shared file to change extensively. Accuracy and review capacity, not token availability, should determine batch size. Increase concurrency only when another independent reviewer can preserve the same acceptance standard.

## 9. Restarting After a Handover

A new coordinator should begin by reading:

1. This document.
2. `docs/culture/README.md`.
3. `culture/content/english_rewrite_guidelines.md`.
4. One finished article such as `culture/content/philosophy/yin-yang/page.md`.
5. That article's `references.md`.
6. The target category's `scripts/build_<category>_all.mjs`.

Then inspect the working tree before editing. Existing changes may belong to another task and must not be overwritten. Select the next unassigned story directories, record their risks, and begin with a three-story batch.

## 10. Current Program Checkpoint

The inventory on 2026-08-20 found approximately 104 logical culture stories. The number is not identical to the number of directories because a few legacy sources are page-only and several invention source files map into combined rendered stories. Re-inventory before using the count for scheduling.

The first sixty-three stories accepted under this workflow are:

- `philosophy/confucius`
- `philosophy/laozi`
- `philosophy/yin-yang`
- `philosophy/seed-dao`
- `religion/daoism`
- `military/art-of-war`
- `politics/yu-the-great`
- `politics/emperor-day`
- `religion/maitreya-buddha`
- `politics/six-arts`
- `politics/imperial-exam-history`
- `politics/exam-content`
- `religion/buddhism-comes-to-china`
- `religion/lord-guan`
- `military/great-wall`
- `military/ancient-armor`
- `military/mingguang-armor`
- `military/warships`
- `architecture/forbidden-city`
- `architecture/temple-of-heaven`
- `architecture/pagodas`
- `architecture/suzhou-gardens`
- `architecture/tulou`
- `architecture/zhaozhou-bridge`
- `geography/guilin`
- `geography/highest-mountains`
- `geography/panda-hometown`
- `geography/yangtze-yellow-river`
- `economy/ancient-money`
- `economy/ancient-market`
- `economy/silk-road`
- `economy/tang-cosmopolitan`
- `economy/tea`
- `food/chinese-cuisine`
- `food/chopsticks`
- `food/dumplings`
- `food/flavors`
- `clothing/hanfu`
- `clothing/bufu`
- `clothing/imperial-robes`
- `clothing/tang-men-headwear`
- `clothing/tang-women-hair`
- `art/bianzhong`
- `art/calligraphy`
- `art/dunhuang`
- `art/erhu`
- `art/gongbi`
- `art/guqin`
- `art/ink-wash`
- `art/paper-cutting`
- `art/peking-opera`
- `art/pipa`
- `art/porcelain`
- `art/terracotta-warriors`
- `figures/cao-cao`
- `figures/li-bai`
- `figures/li-shi-zhen`
- `figures/luban`
- `figures/mulan`
- `figures/qin-shi-huang`
- `figures/shang-yang`
- `figures/wu-zetian`
- `figures/zheng-he`

All four philosophy articles, all five politics articles, all four religion articles, all five military articles, all six architecture articles, all four geography articles, all five economy articles, all four food articles, all five clothing articles, all twelve art articles, and all nine figures articles are therefore complete under the new standard. The initial parallel trial completed `yin-yang`, `seed-dao`, and `daoism` together and passed the full repository check. Subsequent rolling batches completed politics, religion, military, architecture, geography, economy, food, clothing, art, and figures. All sixty-three accepted stories pass the structural story audit. Completed categories were rebuilt sequentially for both books and experiments targets. The full repository check passed all 88 tests after the figures batch on 2026-08-21. At this checkpoint, approximately 41 logical stories remain.

Currently assigned invention stories:

- `inventions/gunpowder`
- `inventions/paper-making`

This suggested order is not a content dependency. A new coordinator may choose another batch after checking current priorities and the working tree.

After every accepted batch, update this checkpoint or replace it with a dedicated tracker containing:

- completion date;
- completed `category/slug` values;
- reviewer;
- build/check result;
- unresolved research or image issues;
- next assigned batch.
