# Art Direction And Lesson Adaptation Rules

This file captures the visual and lesson-design rules we want to preserve for future work.

## Non-Negotiable Rules

- Do not use textbook images in the product, even temporarily.
- Do not copy textbook compositions too closely.
- Do read the textbook lesson first, understand what it is teaching, then create an original scene that teaches the same idea.
- Keep audio as a first-class part of the interaction.

## Picture Style To Reuse

Target style for new generated lesson art:

- original children's storybook-style illustration
- soft, polished digital illustration with gentle shading
- only light texture; avoid heavy watercolor wash or paper grain
- warm, friendly, calm teaching tone
- bright daytime lighting or soft warm indoor lighting
- expressive faces, clear gestures, easy-to-read emotions
- simple but believable school / home / street backgrounds
- clean, uncluttered compositions that leave room for lesson UI
- fully original characters and settings, not textbook character copies

## Asset-Type Style Rules

Different asset types should share one visual family, but not all use the same amount of detail.

### Lesson scenes

- Scenes may include a soft storybook background.
- Backgrounds should support the teaching point, not compete with it.
- Keep the composition readable at app size.
- Avoid tiny figures floating inside large empty space.
- Avoid unnecessary decorative clutter.
- For school and playground scenes, prefer believable real-world campus architecture over toy-like or overly childish school designs.
- School buildings can look like modern elementary schools, brick public schools, or simple community-school buildings with realistic windows, doors, walkways, and entry areas.
- Do not add a flag by default. Only include a flag when the lesson explicitly requires it, and never let a flag become the visual focal point.
- Playgrounds and school yards should feel plausible and grounded rather than fantasy-like, overly colorful, or theme-park styled.

### Reusable avatar and dictionary assets

- Reusable people, kids, family members, stationery, fruit, clothing, and similar asset-store images should be cleaner than scenes.
- Prefer a plain white background, or an almost invisible neutral background when needed.
- Use centered head-and-shoulders framing for character avatars unless a different crop is required.
- Keep silhouettes clean and fully visible.
- Avoid beige paper backgrounds, visible texture wash, decorative frames, and scene props unless the asset explicitly calls for them.
- These assets should feel crisp, simple, and teaching-friendly.

## Consistency Standard

- New asset batches must match the current house style before they are accepted into the library.
- If an older folder looks noticeably more watercolor-heavy, grainy, painterly, or less clean than newer folders, plan to regenerate it instead of forcing mixed styles to coexist.
- `illustrated-kids` and `illustrated-family` should match the cleaner newer look used by the more recent assets.
- When testing a new batch, generate a small sample first and confirm the look before replacing a whole set.

## Character Direction

- Adults must read clearly as adults. Do not make teachers look like children.
- Children should feel lively, kind, and age-appropriate.
- Keep the cast inclusive across skin tones, hair textures, hair styles, and clothing.
- Do not let generated casts drift toward one repeated default look.
- Reusable kids asset libraries should be intentionally diverse across the full set, including visible variation in skin tones, hair textures, and hair styles.
- Preserve explicit reusable cast coverage in the asset store, including white children, Black children, and other visible variation instead of relying on one scene to carry all diversity.
- If a blond boy appears in generated art, prefer blue eyes unless the lesson or character brief says otherwise.
- People inside the same family scene or family asset set should look racially and visually coherent as one family unless the lesson intentionally depicts an adoptive family or a multi-ethnic family.
- Across a topic set, intentionally vary:
  - skin tones
  - hair textures
  - hair styles
  - face shapes
  - clothing colors and silhouettes
- When generating multiple scenes for one topic, check whether the cast already looks too same-y before keeping the images.
- Avoid baked-in labels or names inside the artwork.
- For recurring named characters and recurring family members, use [character_bible.md](./character_bible.md) as the identity anchor before writing the scene prompt.
- For recurring school scenes, use [school_bible.md](./school_bible.md) as the environment anchor before writing the scene prompt.
- Do not invent a fresh "mom", "dad", or named kid from scratch when an anchor asset already exists.
- If a generated scene drifts away from the anchor identity, fix identity first, then fix pose / composition.
- Family children are not automatically separate identities from the kid cast.
- If a family child clearly matches an existing kid-cast anchor, reuse that base identity instead of maintaining two drifting versions.
- Anan and Lele are siblings everywhere. Do not use them as a "new friend", "new classmate", or getting-to-know-you speaking pair for age, name, family, or similar personal-information exchanges.
- School, hobby, and daily-life scenes may still show Anan and Lele with other classmates or friends, but prompts must preserve their sibling relationship when they appear together.
- For classroom/social lesson scenes that need classmates asking personal information, pair Anan or Lele with another kid-cast character such as Sisi, Noah, Luna, Jaden, Tiantian, Yangyang, or Meimei instead of pairing Anan with Lele.
- Current preferred mapping:
  - `older-brother` -> `lele`
  - `older-sister` -> `anan`
  - `younger-sister` -> `meimei`
  - `younger-brother` -> keep as family-only for now
- When prompting a family scene, state the mapped kid identity first, then describe the family-specific clothing, pose, and setting.
- When prompting a school scene, state the recurring school anchor first, then describe the specific school space, action, and lesson beat.

## File Format And Size Rules

- Final app-ready image assets should be saved as `.webp` unless there is a specific reason to keep another format.
- Do not keep generated `.png` source files in the asset library. If the generator outputs `.png` temporarily, convert it to `.webp` immediately and delete the temporary `.png` before finishing.
- Lesson scene images should be no larger than `150 KB`.
- Avatar, portrait, and other small reusable headshot assets should be no larger than `50 KB`.
- Any reusable non-scene asset should stay under `50 KB` unless a different size limit is explicitly requested.
- Generate at high quality first, then compress to final `.webp` delivery size.
- Do not accept oversized files into the main asset library just because the art looks good; optimize them before wiring them into the app.

## How To Adapt A Book Lesson

Before making visuals for a lesson:

1. Read the relevant book page and surrounding lesson material.
2. Identify the teaching goal:
   - vocabulary
   - sentence pattern
   - social situation
   - setting
   - who is speaking to whom
3. Recreate the teaching goal with an original scene.
4. Keep the same lesson beat, but not the same copyrighted image.

Example for `你好`:

- preserve the book's theme of school greetings
- include teacher-to-student politeness
- include child-to-child morning greeting
- include saying goodbye
- generate original scenes in the same educational spirit, not copied layouts

## Layout Rules For Wide Screens

- On wide screens, prefer image on the left and lesson lines / controls on the right.
- Use the image panel to set the scene quickly.
- Use the right panel for Hanzi, pinyin, English, and play buttons.
- Avoid leaving a large empty center area with tiny figures at the edges.

## Image Prompting Guidance

When generating new lesson scenes, prompts should usually include:

- the lesson purpose
- the social relationship between speakers
- whether the adult must clearly read as an adult
- desired diversity in the cast, including skin tone and hair variation when relevant
- the setting such as school gate, classroom, home, or street
- when relevant, whether the school or playground should look like a believable real campus rather than a stylized cartoon school
- "soft children's storybook illustration"
- "fully original"
- "no text"
- "no watermark"

When generating reusable avatar or dictionary assets, prompts should usually also include:

- "pure white background"
- "no props"
- "no frame"
- "clean silhouette"
- "centered composition"
- "minimal texture"
- "not painterly"

## Asset Organization Reminder

- Keep topic scenes grouped in topic folders such as `assets/greetings`, `assets/family`, `assets/age`, and `assets/polite`.
- Keep reusable dictionary-style assets grouped by category such as `illustrated-food`, `illustrated-stationery`, `illustrated-everyday-life`, `illustrated-kids`, and related folders.
- Avoid leaving production assets scattered at the root of `assets/`.

## Process Reminder

- Read the book first.
- Extract the lesson goal.
- Build an original visual in this house style.
- Make the final UI composition work for the screen, not just for the source page.
