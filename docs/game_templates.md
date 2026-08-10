# Practice Patterns

Last updated: 2026-08-09

Use this catalog after the lesson contract identifies the language a child still needs to practise. The [lesson page workflow](./lesson_page_workflow.md) decides **when** to add practice; this file selects the pattern.

## Shared rules

- One round has one clear language goal.
- Audio is a required cue, not optional decoration.
- A correct answer shows a clear green check; a wrong answer shows a clear red cross and remains recoverable.
- Randomize target and answer order when a fixed arrangement could reveal the answer. Keep the order stable while a child answers the same round.
- Prompts, instructions, accessibility labels, feedback, and completion copy must describe the same task.
- Use large, equal, touch-friendly targets. Do not rely on card position, shape, or English-only clues.
- Use a game to practise language already modelled by a scene, Book words, or a Useful note. Do not make the game introduce the lesson.

## 1. Listen and choose

**Use when:** the child needs to recognize a spoken word, phrase, or sentence.

**Required behavior:**

- Randomize the prompt and option order for a new round.
- Use distractors from the same lesson, not unrelated vocabulary.
- Clear stale wrong feedback when a new prompt begins.
- Keep the correct target active until it is chosen; show a green check on success.

## 2. Matching

**Use when:** a small, stable set of pairs needs focused repetition: Chinese-to-picture, Chinese-to-meaning, phrase-to-situation, or word-to-object.

**Required behavior:**

- Use two equal, clearly titled columns.
- Keep matched pairs visible as solved evidence.
- Mark incorrect selections clearly and let the child try again.
- Do not use a translation-only match when a picture or situation can carry the meaning better.

## 3. Sentence choice

**Use when:** the child must distinguish complete sentences that describe a pictured scene or situation.

**Required behavior:**

- Use one unambiguous picture per round.
- Present exactly two plausible, same-topic options.
- Use matching-card type scale: `1.45rem` Hanzi, `0.92rem` pinyin, and `0.95rem` English.
- Randomize which option is correct; do not make the answer predictable by side or wording length.
- After success, show the complete sentence with its pinyin and English support when those displays are enabled.

## 4. Sentence-frame fill

**Use when:** the child needs controlled practice of a short sentence frame already taught by scenes, such as `____有____。`.

**Data rule:** Each round owns one complete, approved sentence. Do not manufacture sentences by independently mixing categories just because individual words are compatible.

```js
const rounds = [
  { id: "sun", answers: ["白天", "太阳"], sentence: "白天有太阳。", cue: "sun" },
  { id: "flower", answers: ["地上", "花"], sentence: "地上有花。", cue: "flower" }
];
```

**Required behavior:**

- Randomize round and answer-bank order only when a new round begins.
- Mark each chosen blank green or red immediately; a wrong answer remains replaceable.
- Before completion, Play gives a non-revealing cue. After completion, Play says the full sentence and advances.
- Keep the completed sentence visible after success.
- Use plausible same-lesson distractors, never an answer that depends on an unspoken real-world assumption.

## 5. Phrase or sentence builder

**Use when:** the child needs to arrange already familiar chunks into a short, reusable sentence.

**Required behavior:**

- Supply only chunks already established by the lesson.
- Accept every natural ordering where the language permits more than one.
- Keep the completed sentence, audio, pinyin, and English aligned to the same result.
- Do not turn the task into a visual-shape puzzle with a predictable solution.

## 6. Find, collect, or sort

**Use when:** the language goal is identification in a scene, grouping by a meaningful category, or fulfilling a short request.

**Required behavior:**

- The target must be visually clear at the rendered size.
- Randomize targets and answer order for a new round.
- Keep the destination meaningful, not decorative, and preserve its illustration aspect ratio.
- For collection tasks, define reset behavior, progress markers, wrong-answer behavior, and a clear completion state.
- Do not use fixed left/right positions or tiny scene details as the real test.

## Choosing the pattern

| Remaining lesson goal | Best first choice |
| --- | --- |
| Hear and recognize a word or short line | Listen and choose |
| Pair two stable representations | Matching |
| Understand which full line fits a visual context | Sentence choice |
| Complete an approved beginner frame | Sentence-frame fill |
| Control word order in a familiar sentence | Phrase or sentence builder |
| Identify, group, pack, shop for, or place concrete items | Find, collect, or sort |

If none of these patterns practices the stated goal cleanly, define the new interaction's cue, response, valid answers, distractors, feedback, randomization, and acceptance checklist before implementing it.
