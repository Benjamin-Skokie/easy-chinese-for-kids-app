# Culture Story Rewrite and Handover Workflow

> Archived on 2026-09-06. Replaced by `docs/culture/story_research_and_rewrite_workflow.md` and `docs/culture/story_landing_workflow.md`.

Last updated: 2026-09-01

This is the operating guide for revising the app's Chinese culture stories. Each topic has one canonical, bilingual story: the page rendered from `page.md`.

## Product Goal

The audience is children in the United States who are learning Chinese as an additional language or have little prior knowledge of China. Every finished story should:

- feel like engaging children's nonfiction rather than an outline or a research note;
- give the reader concrete scenes, questions, actions, contrasts, or discoveries;
- explain essential cultural context without assuming knowledge of China, its history, or its terminology;
- be historically responsible and supported by saved research;
- use natural Chinese and independently polished English;
- retain accurate, useful images;
- use tooltips only for genuinely optional orientation.

The quality standard is:

`Accurate research + a story-shaped explanation + natural bilingual writing.`

## Source of Truth and File Contract

A normal article directory is:

```text
culture/content/<category>/<slug>/
  page.md
  zh.md
  en.md
  references.md
  images/
```

- `page.md` is the canonical website manuscript and the only source rendered into the Culture pages.
- `zh.md` and `en.md` are readable standalone manuscripts.
- `references.md` records sources, supported claims, and editorial boundaries; it does not render.
- `images/` contains source images copied into generated pages during a build.

Keep factual boundaries, story beats, captions, and title meaning aligned across the three manuscripts. Chinese and English should be independently written from the same research, not translated sentence by sentence.

Generated pages live under:

```text
culture/books/<category>/<slug>/
```

Do not hand-edit generated `index.html`, `styles.css`, or copied images. Rebuild them from `page.md` using the shared page builder.

The earlier Easy/Medium/Advanced pilot has been retired. Do not add `page.early.md`, `page.story.md`, their language companions, reading-level controls, or difficulty badges.

## Workflow

### 1. Inventory and research

Before drafting, inspect the story directory, its current generated page, related glossary entries, and image captions. Search for sources before expanding factual claims.

Use strong sources appropriate to the claim: museum or library collections, scholarly publications, university projects, primary sources with reliable context, and major reference works. Do not treat image-search snippets, unsourced blogs, generated summaries, or dramatic popular retellings as proof.

### 2. Save `references.md`

For every significant source, record a direct URL, access date, the claims it supports, and the editorial boundary:

```markdown
## <Source or claim group>

URL: <direct source URL>
Accessed: YYYY-MM-DD

Supports:
- <specific claim supported by this source>

Editorial boundary:
- <what the story may safely say>
- <what must remain uncertain, labeled as legend, or omitted>
```

Record disagreements instead of silently choosing the most dramatic version. A small set of reviewed sources is better than a long unexamined link list.

### 3. Design one coherent story

Choose one child-facing main idea and a clear throughline: a documented question, problem, goal, discovery, change, or sequence. Keep only the names, dates, terms, and details that help that story move.

Do not invent dialogue, private thoughts, emotions, weather, or scenes to create drama. When a tradition, legend, or historical claim is uncertain, say so plainly and keep the distinction visible.

### 4. Draft Chinese and English independently

Write each language as original children's nonfiction from the same research and story plan. Titles, sentence lengths, paragraph breaks, and the amount of inline explanation can differ naturally.

Chinese should use concrete nouns, active verbs, and natural phrasing. English should follow `culture/content/english_rewrite_guidelines.md`: native-sounding, clear, and interesting without becoming babyish or academic.

### 5. Review and build

Read both languages aloud. Check that the story has a concrete hook, a coherent middle, and a satisfying ending; that every section advances the main line; and that captions and images remain accurate.

Run the per-story structural audit:

```sh
npm run audit:culture-rewrite -- culture/content/<category>/<slug>
```

Then run the appropriate category build. Builds must run sequentially because the shared page builder keeps glossary-formatting state at module scope. Do not run image conversion while a build is copying that image.

## Acceptance Checklist

### Research

- [ ] The web was searched before factual expansion.
- [ ] Central and risky claims have reliable sources.
- [ ] `references.md` includes direct URLs, access dates, supported claims, and editorial boundaries.
- [ ] History, tradition, legend, interpretation, and modern illustration are not blurred together.
- [ ] No dialogue, thoughts, motives, scene details, or exact numbers were invented.

### Writing

- [ ] The story has one coherent child-facing main idea and a clear throughline.
- [ ] Both languages read as complete children's nonfiction, not a synopsis or teacher lecture.
- [ ] Chinese and English were written independently from the same facts.
- [ ] Background needed for comprehension appears inline.
- [ ] Paragraph breaks follow changes in thought or scene.
- [ ] The standalone English read found no stiffness, hidden assumptions, or accidental new claims.
- [ ] The ending stops naturally and does not add a templated reader prompt, forced callback, repeated summary, or oversized moral.

### Product integration

- [ ] `page.md`, `zh.md`, and `en.md` agree on factual boundaries and story beats.
- [ ] Tooltips add optional orientation only at the first useful occurrence.
- [ ] Images and captions remain accurate.
- [ ] The page has no reading-level selector or difficulty badge.
- [ ] Both generated targets build successfully and have been visually inspected.
- [ ] `npm run check` passes.

## Current Program Note

The 2026-08-31 multi-level reading experiment was retired because its Easy and Medium variants did not consistently meet their intended audience contracts. The retained `page.md` manuscripts and their companion `zh.md`, `en.md`, references, and accepted images are the single source of truth going forward.
