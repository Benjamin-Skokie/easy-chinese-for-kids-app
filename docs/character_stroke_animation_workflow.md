# Character stroke-animation workflow

Use this workflow whenever a Chinese character receives a writing-animation card.
The goal is to show a child a **real simplified-character form** and a legible
writing motion—not an approximate drawing or a font with coloured lines placed
on top.

## 1. Choose the teaching character

Start with a character already used by a CSL lesson. Record:

- the character and its CSL lesson anchor;
- its standard simplified-Chinese stroke order and stroke names;
- the particular learning reason (for example, `书` distinguishes 横折 from
  横折钩).

Use the [通用规范汉字笔顺规范](https://hudong.moe.gov.cn/jyb_sjzl/ziliao/A19/202103/W020210318300204215237.pdf)
to settle stroke order. Do not infer order from the appearance of a font.

## 2. Obtain reviewed vector stroke data

Use local, version-pinned vector outlines. Hanzi Writer Data provides one SVG
outline and one median path for each stroke; it is derived from Make Me a Hanzi
and is licensed under the Arphic Public License. Keep the required paths in the
repository (or a locally stored data file), rather than requesting a CDN from a
child's browser.

For each stroke retain:

```js
{
  name: "横折钩",
  path: "…",   // exact filled SVG outline
  median: "…"  // centreline, in writing direction
}
```

The `书` proof of concept is in
`src/features/foundations/stroke-runtime.js` as `bookStrokePaths`.

## 3. Render the character without changing its outline

1. Place each `path` in one SVG, in standard stroke order.
2. Preserve the source coordinate transform; many stroke data sets use an
   upward-positive coordinate system.
3. Never redraw a character approximately and never layer a generic line over
   a font glyph. Either method can make a different character.

## 4. Animate like handwriting

For every stroke:

1. Create an SVG `mask` containing its `median` as a white, rounded line.
2. Set `stroke-dasharray` and start `stroke-dashoffset` at the full path
   length.
3. Animate the dash offset to zero. The mask reveals the genuine filled stroke
   along its own writing direction.
4. Delay the next stroke until the current stroke has finished; use a short
   pause between strokes.
5. Restart the animation whenever a learner chooses the character or stroke
   again; respect reduced-motion preferences when they are added site-wide.

This is why the `书` animation looks like a pen travelling along the stroke,
rather than a cartoon shape scaling into view.

## 5. Add a short learning card beside it

Keep the text small and specific:

- character: `书`;
- stroke order: `横折 → 横折钩 → 竖 → 点`;
- one observation: “the second stroke ends with a small left hook”;
- CSL anchor: record the exact book and review page before publishing.

## 6. Build the ordering exercise

For basic strokes, use the CSL book's own review characters wherever possible.
In the current Book 1A source, the teaching order is `横、竖` (page 8),
`撇、捺` (page 20), `折、钩` (page 32), then `点、提` (page 44). Its later
review uses simple characters including `三、人、小、田`.

1. Show one target character and its plain-English meaning.
2. Render each genuine stroke outline as a separate selectable card, shuffled.
3. Let the learner fill numbered positions; allow them to remove a card before
   judging.
4. Only after the full sequence is correct, replay the complete handwriting
   animation using those exact outlines and median paths.

## 7. Create error-discrimination practice safely

Wrong examples should teach one decision, not show a malformed character as a
model. Use one of these patterns:

- **Choose the next stroke:** show a correct partial character and two labels;
  e.g. after the first stroke of `书`, choose `横折钩` rather than `竖`.
- **Order cards:** let a learner put named strokes in order, then play the
  correct animation as feedback.
- **Spot the order error:** show two numbered sequences using the *same* correct
  character outline; mark only one sequence as standard.

Always label a wrong sequence “Not the standard order” and immediately replay
the standard one after a choice. Do not animate a wrong-looking glyph, because
children can remember the visual error as a valid character.

## 8. Review before publishing

- Confirm the final glyph visually with a fluent simplified-Chinese writer.
- Confirm the stroke names and order against the standard.
- Check the animation from its first frame, at normal speed and after replay.
- Run `npm run build`, `npm test`, and `git diff --check`.

## Asset-size guidance

These are vector paths, not PNG or JPEG pictures. The `书` source data is about
1.6 KB as a character-data JSON file. A typical simple character is therefore
only a few kilobytes; even several hundred locally stored character animations
are normally far lighter than an equivalent library of bitmap images. The
current full generated application bundle is about 888 KB, so one character's
stroke paths are a very small addition.
