# Scene Lesson Page Template

> Archived. The active scene-led page structure now lives in [lesson_page_workflow.md](../lesson_page_workflow.md).

The Weather page is the reference implementation for a scene-led topic page. Nature uses the same template, with different optional sections.

## Fixed structure

```text
Lesson heading
→ scene grid (one or more scene cards)
→ optional Book words (one in-topic row only)
→ optional Useful notes (only a memory or understanding aid)
→ practice
```

Each scene card always has:

1. a custom scene title;
2. one green Play button;
3. one undistorted scene illustration;
4. sentence line(s) that directly describe that illustration.

The shared `worldSceneCardMarkup()` renderer owns this card structure. A topic supplies only scene data: title, illustration, and sentence lines. The active workflow does not allow a compact scene-card variant within a shared grid.

## Optional section rules

| Section | Include when | Do not include when |
| --- | --- | --- |
| Book words | A child benefits from replaying individual new words after the scenes. Use visual-cue cards when that helps recognition. For compact vocabulary, prefer an equal-width horizontal card: icon at left and Chinese, pinyin, English stacked at right. | The scenes already provide enough focused word access, or it would duplicate another word list. |
| Useful notes | A short cue explains a distinction or creates a memory hook, such as `抬头看天上，低头看地上。` | It merely repeats a scene sentence or re-lists vocabulary. |

The topic renderer owns these sections. When it does, set `ownsExplorerContent: true` so the page shell does not render a second focus card or word list.

## Weather and Nature mapping

| Template part | Weather | Nature |
| --- | --- | --- |
| Scene grid | Four weather scenes in a 2 × 2 grid | Two scene cards: `白天`, `晚上` |
| Book words | Omitted: scene labels and lines are sufficient | One visual-cue row, including `白天` and `晚上` |
| Useful notes | Two grammar notes | One gesture-memory note |
| Practice | Weather → item / weather fill-in | Sentence-Frame Fill: visual cue → complete one approved sentence |

Do not vary the scene card frame, Play button, sentence stack, or section order from this template without first updating this document and its render tests.
