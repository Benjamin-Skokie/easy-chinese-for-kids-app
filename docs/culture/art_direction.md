# Culture Art Direction

Last updated: 2026-07-25

This file is the visual source of truth for `culture/` articles.

Use other files for other jobs:

- [story_writing_guidelines.md](./story_writing_guidelines.md): editorial and child-facing writing standard
- [story_research_and_rewrite_workflow.md](./story_research_and_rewrite_workflow.md): research and substantial rewriting
- [story_landing_workflow.md](./story_landing_workflow.md): image review, page integration, build, and verification
- [art_direction.md](../art_direction.md): broader house style

## Core Standard

`One page, one clear visual idea.`

Each image should help a child understand the page faster. It should not be decorative filler.

## Role Of Culture Images

Culture images should do one of these jobs clearly:

- show a place
- show an object
- show how something works
- show a comparison
- show a story moment
- show a present-day cultural connection

If an image cannot do one of those jobs well, use `text-only`.

## Variety Within One Article

Do not repeat the same kind of image across multiple pages unless the second image teaches a clearly different point.

Common bad pattern:

- landscape
- similar landscape
- another similar landscape
- another similar landscape

Prefer variety such as:

- map or overview
- close-up object or mechanism
- human use or story scene
- comparison or present-day connection

## Clarity First

- Keep one dominant idea per image.
- Make the main point readable at a glance.
- Avoid dense crowds, visual clutter, or too many competing props.
- Avoid tiny details that disappear at page size.

If the child has to study the image to figure out what it is saying, it is not clear enough.

## Historical And Cultural Specificity

- Ancient China should read clearly as ancient China.
- In ancient settings, people should read clearly as Chinese historical figures unless the text explicitly calls for others.
- Do not let the generator drift into generic modern Western defaults.
- If a place, object, or institution is specific and recognizable, use that specificity.

Examples:

- Guilin can use the 20-yuan bill view.
- Chengdu Panda Base should not look like a generic bamboo forest.
- China maps in this set should include Taiwan when that is part of the page's teaching goal.

## Comparison Images

When the page is about contrast:

- separate the ideas cleanly
- use a clear top-bottom or left-right split when needed
- do not blend two environments into one muddy scene

The comparison should read immediately.

But do not overuse split images across a batch or within one category. Use them only when the page is truly about comparison or contrast. If a normal single scene can teach the idea more naturally, prefer the single scene.

## Maps

Use maps when location is the teaching point.

Map rules:

- simple and child-friendly
- only the geography needed for the page
- no dense labels
- clear rivers, mountains, coastlines, or borders
- not technical or adult-textbook heavy

## Objects And Mechanisms

For inventions, tools, weapons, money, ships, armor, and similar subjects:

- the structure must be believable
- the important part must be visible
- avoid fantasy embellishment
- prefer one readable mechanism over several crowded objects

The child should be able to tell what the object is doing.

## People Using Objects

When a person is using an object with a functional or readable face, such as an abacus, a book, a brush, a painting surface, a board game, a musical instrument, or a tool:

- the object should face the user, not the camera
- the user should look naturally at the object, not present it to the viewer
- keep physically correct relationships between head, eyes, hands, and object
- prefer `side`, `three-quarter side`, or `over-the-shoulder` views
- for desk work, prefer a back-top diagonal view when it helps show the hands and working surface clearly
- it is fine if the object's functional surface looks angled away, partly hidden, reversed, or less readable from the camera side

Avoid:

- front-facing presentation poses where both person and object face the camera
- camera-oriented books, abacuses, writing surfaces, or paintings that should really be facing the user
- fake readability created by turning the working surface toward the viewer instead of toward the person using it

Prompt pattern for these scenes:

`A person is naturally using [object]. The person is viewed from [side / three-quarter side / over-the-shoulder angle]. The functional or readable side of the [object] faces the person, not the camera. The object is correctly oriented from the user's perspective. From the camera's perspective, the functional surface may be angled away, partially hidden, reversed, or unreadable. This is a candid working scene, not a presentation pose. Maintain physically correct spatial relationships between the person, hands, eyes, and object.`

## People In Images

- Add people when they help explain scale, use, care, motion, or emotion.
- Do not add people by default if they distract from the main point.
- Avoid repeated generic casts across culture articles unless a child viewer or adult-child scene genuinely helps.
- If foreigners matter historically, show them intentionally rather than by generator drift.

## Violence And Child Safety

- No gore, blood, graphic injury, or frightening harm.
- Avoid direct strike-impact images when the point can be taught another way.
- Prefer implied action, preparation, symbolic display, or technology explanation over violent contact.

Examples:

- Guan Yu on horseback with a long weapon is fine; the wounded opponent should not be the focal point.
- Fire arrows and rockets should read as technology, not as people getting burned.

## Avoid Mixed Signals

Do not use visuals that accidentally teach the wrong thing.

Avoid:

- crossbows that read like modern guns
- random floating arrows to explain wind
- blended river scenes that confuse north and south
- repeated mountain scenes that all say the same thing
- dramatic action that adds excitement but not understanding

## Use Strong Real Anchors

When an article has a strong real-world anchor, use it.

Good anchors include:

- banknotes
- panda bases
- river maps
- temples
- specific tool or weapon forms
- famous landscape silhouettes

These usually teach better than another generic scenic image.

## Style

Use:

- original children's picture-book illustration
- soft polished digital painting
- calm natural light
- gentle shading
- clear edges
- restrained texture
- readable realism simplified for children

Avoid:

- flat vector look
- muddy painterly scenes
- heavy watercolor bloom
- dark cinematic drama
- decorative spectacle

## Technical Defaults

- aspect ratio: `4:3` horizontal
- final format: `.webp` by default
- use `.png` only when there is a clear clarity or pipeline reason
- no text, watermark, or signature inside the image

## Quick Review Checklist

- Is the visual idea clear?
- Is it different enough from the other pages in the article?
- Does it teach something specific?
- Does the historical setting read correctly?
- Is anything unintentionally violent or misleading?
- Would `text-only` be better than this image?
