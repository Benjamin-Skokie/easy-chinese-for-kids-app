# Character Bible

Last updated: 2026-07-12

Purpose: reduce character drift across newly generated scene art by defining recurring cast anchors, stable traits, family relationships, and reusable prompt rules.

## How To Use This File

- For any new scene with a recurring person, do not prompt from scratch.
- First identify whether the person is one of the defined recurring characters below.
- Use the listed anchor asset as the visual source of truth.
- For recurring kids, use the portrait anchor first and the full-body anchor in `assets/illustrated-kids/full-body/` when pose or body proportions matter.
- Keep stable traits fixed across scenes unless the user explicitly asks for a redesign.
- Scene prompts should describe the action and setting, not reinvent the face.

## Character Consistency Rules

- The anchor image file is the primary visual reference.
- A recurring character should keep the same:
  - skin tone band
  - age read
  - hair color
  - hair texture
  - hair length / shape
  - eyebrow shape
  - eye shape
  - eye color
  - face shape
  - overall vibe
- Clothing can change by scene, but should stay within a plausible palette for that character.
- Expression can change by scene, but identity should not.
- If a scene uses `mom`, `dad`, or a named kid, explicitly say "match the existing character asset" in the prompt.
- If the generated result drifts, revise using the anchor character appearance first, not broad style notes.

## Prompt Pattern

Use a character clause like:

`Match the existing <character-id> character from <anchor-path>: same face shape, same eyebrow shape, same eye shape and eye color, same skin tone, same hair color and hairstyle, same age read, same overall identity.`

Then add scene-specific changes:

- expression
- pose
- clothing for the situation
- camera angle
- setting

## Bible Scope

This document is now the first-pass formal bible for:

- the core family cast
- grandparents
- the default recurring teacher `wang-laoshi`
- the recurring kid cast in `assets/illustrated-kids`

Current priority is to keep the family, teacher, and recurring kids stable across scenes instead of re-inventing them case by case.

## Core Cast Summary

### Family adults

- `mom`: warm, friendly mother anchor
- `dad`: calm, dependable father anchor
- `grandma`: soft senior woman with glasses and silver curled bob
- `grandpa`: gentle senior man with glasses and gray mustache

### Family children

- `older-sister`: family version of `anan`
- `older-brother`: family version of `lele`
- `younger-sister`: family version of `meimei`
- `younger-brother`: family-only child anchor for now

### School adult

- `wang-laoshi`: default classroom teacher anchor
- `li-laoshi`: default recurring female principal anchor

## Relationship Rules

- `mom`, `dad`, `grandma`, and `grandpa` belong to one visually coherent family.
- The family should keep one shared warm tan skin-tone band, with normal small variation by person.
- `older-sister`, `older-brother`, and `younger-sister` should not drift away from their mapped kid-cast identities just because they appear in family scenes.
- `wang-laoshi` must stay visually distinct from `mom`.
- `wang-laoshi` should read as a teacher first, not as a parent, aunt, or generic woman.
- `li-laoshi` should read as a school principal or administrator first, even when children address her as `李老师`.
- If a scene includes both `mom` and `wang-laoshi`, their silhouettes, hairstyle, and clothing palette should remain clearly different at a glance.
- If a scene includes `wang-laoshi` and `li-laoshi`, the principal should read older, more administrative, and more formal at a glance.

## Family Anchors

## Family To Kids Mapping

- Anan and Lele are siblings everywhere. Do not use them as a "new friend", "new classmate", or getting-to-know-you speaking pair for age, name, family, or similar personal-information exchanges.
- School, hobby, and daily-life scenes may still show Anan and Lele with other classmates or friends, but prompts must preserve their sibling relationship when they appear together.
- For classroom/social lesson scenes that need classmates asking personal information, pair Anan or Lele with another kid-cast character such as Sisi, Noah, Luna, Jaden, Tiantian, Yangyang, or Meimei instead of pairing Anan with Lele.
- Treat the family children as the same base identities as existing kid-cast anchors when they clearly match.
- This is preferred over maintaining two separate drifting versions of the same child.
- Current mapping:
  - `older-brother` -> `lele`
  - `older-sister` -> `anan`
  - `younger-sister` -> `meimei`
  - `younger-brother` -> family-only anchor for now; keep his current family avatar identity until we intentionally map him to a kid-cast character
- Priority rule:
  - if a family scene uses one of these children, prompt it as the mapped kid identity first, then apply the family outfit / scene
- Priority note:
  - `jaden` is not a high-frequency reuse anchor right now, so identity-control effort should focus first on `mom`, `dad`, `lele`, `anan`, and `meimei`

### `mom`

- Anchor: [family-avatar-mom.webp](../assets/illustrated-family/family-avatar-mom.webp)
- Role: mother
- Family function:
  - default home adult
  - warmth, care, and everyday authority
- Stable traits:
  - adult woman
  - warm medium tan skin tone
  - soft oval face with a rounded chin
  - thick dark brown arched eyebrows
  - large round dark brown eyes
  - small rounded nose
  - broad friendly smile
  - dark brown wavy shoulder-length bob
  - loose side part, hair tucked back slightly near the crown
  - clothing palette usually warm yellow, blue denim, cream, and soft neutrals
- Allowed variation:
  - top color can change by scene
  - expression can range from kind to firm
  - pose can change freely
- Scene-use notes:
  - suitable for cooking, helping, reminding, comforting, and everyday home scenes
  - can be gently strict, but should not read as severe or intimidating by default
- Do not drift into:
  - straight blunt hair
  - pale skin
  - tiny eyes or thin brows
  - a sharply angular face

### `dad`

- Anchor: [family-avatar-dad.webp](../assets/illustrated-family/family-avatar-dad.webp)
- Role: father
- Family function:
  - default home adult male anchor
- Stable traits:
  - adult man
  - warm medium tan skin tone, same family band as `mom`
  - long oval face, slightly longer than `mom`
  - thick dark brown eyebrows with a strong clean arch
  - large round dark brown eyes
  - small straight nose
  - open smile, no facial hair
  - dark brown hair with volume on top
  - clean side sweep with short tapered sides
  - clothing palette usually deep blue, forest green, khaki, and other muted solid colors
- Allowed variation:
  - shirt color, pose, and expression can change
- Scene-use notes:
  - suitable for reading, talking, helping, walking with kids, and calm home scenes
  - should read as approachable and steady, not flashy or comic
- Do not drift into:
  - beard or mustache
  - curly hair
  - glasses
  - a much older or rugged face

### `grandma`

- Anchor: [grandma.webp](../assets/illustrated-family/grandma.webp)
- Role: grandmother
- Family function:
  - soft senior female anchor
- Stable traits:
  - senior woman
  - warm light-medium tan skin tone
  - soft round-oval face with gentle cheeks
  - thin gray arched eyebrows
  - large round brown eyes behind round glasses
  - small nose and warm smile
  - silver-gray short curled bob
  - soft center-to-side volume with neat waves
  - pearl earrings and pearl necklace are strong identity markers
  - clothing palette usually lavender, plum, dusty rose, and soft purple tones
- Scene-use notes:
  - suitable for reading, sitting, smiling, chatting, and gentle family scenes
  - can look amused, proud, or caring without losing identity
- Do not drift into:
  - dark hair
  - no glasses
  - severe expression
  - sharp cheekbones or narrow face

### `grandpa`

- Anchor: [grandpa.webp](../assets/illustrated-family/grandpa.webp)
- Role: grandfather
- Family function:
  - soft senior male anchor
- Stable traits:
  - senior man
  - warm light-medium tan skin tone
  - oval face with full cheeks
  - gray eyebrows
  - round brown eyes behind round glasses
  - neat gray side-parted hair
  - full gray mustache
  - wide gentle smile
  - clothing palette usually camel, brown, olive, and traditional warm earth tones
- Scene-use notes:
  - suitable for writing, sitting, walking slowly, chatting, and calm family scenes
  - should feel wise and gentle rather than stern
- Do not drift into:
  - black hair
  - no mustache
  - square modern glasses
  - a thin severe face

### `older-sister`

- Anchor: [family-avatar-older-sister.webp](../assets/illustrated-family/family-avatar-older-sister.webp)
- Base kid identity: `anan`
- Role: older sister
- Family function:
  - older girl in the family set
- Stable traits:
  - girl, age read around `8-9`
  - light skin tone
  - soft oval face
  - dark brown softly arched eyebrows
  - large round dark brown eyes
  - dark brown high ponytail
  - loose front bangs and pink hair tie
  - rosy cheeks
  - open cheerful smile
  - clothing palette usually coral pink, peach, and warm pastel tones
- Do not drift into:
  - short bob
  - pigtails
  - much older proportions
  - blue or green eyes

### `older-brother`

- Anchor: [family-avatar-older-brother.webp](../assets/illustrated-family/family-avatar-older-brother.webp)
- Base kid identity: `lele`
- Role: older brother
- Family function:
  - older boy in the family set
- Stable traits:
  - boy, age read around `7-8`
  - light skin tone
  - round face with full cheeks
  - medium-thick dark brown eyebrows
  - large round dark brown eyes
  - dark brown short spiky hair with uneven playful points
  - cheerful open smile
  - clothing palette usually green and yellow accents
- Do not drift into:
  - neat side-part hair
  - long oval face
  - blue eyes
  - a clearly different child from `lele`

### `younger-sister`

- Anchor: [family-avatar-younger-sister.webp](../assets/illustrated-family/family-avatar-younger-sister.webp)
- Base kid identity: `meimei`
- Role: younger sister
- Family function:
  - younger girl in the family set
- Stable traits:
  - girl, age read around `6-7`
  - light-medium skin tone
  - rounded face with soft chin
  - dark brown softly arched eyebrows
  - large round dark brown eyes
  - dark brown chin-length bob with slight inward curve
  - short side bangs
  - pink bow / clip on one side
  - soft open smile
  - clothing palette usually lavender, pink, and soft pastel tones
- Do not drift into:
  - ponytail
  - very long hair
  - blue or green eyes
  - a clearly different child from `meimei`

### `younger-brother`

- Anchor: [family-avatar-younger-brother.webp](../assets/illustrated-family/family-avatar-younger-brother.webp)
- Base kid identity: none yet
- Role: younger brother
- Family function:
  - youngest boy anchor in the family set
- Stable traits:
  - boy, age read around `5-6`
  - warm medium tan skin tone
  - round face with full cheeks
  - dark brown softly arched eyebrows
  - large round dark brown eyes
  - short dark brown spiky-tousled hair
  - small button nose
  - bright smile
  - clothing palette usually yellow, white, blue, and playful primary colors
- Do not drift into:
  - long or sleek hair
  - narrow face
  - older age read
  - glasses

## Teacher Anchors

### `wang-laoshi`

- Anchor: [wang-laoshi.webp](../assets/illustrated-teachers/wang-laoshi.webp)
- Hanzi name: `王老师`
- Role: teacher
- School function:
  - default recurring classroom teacher
  - default adult anchor for greetings, politeness, and school scenes
- Stable traits:
  - adult woman, early `30s`
  - clearly reads as a teacher and clearly reads as an adult
  - East Asian appearance
  - warm light-medium skin tone
  - soft oval face, slightly longer and more mature than `mom`
  - neat medium-thick dark eyebrows
  - large almond-round dark brown eyes
  - small straight nose
  - calm, confident friendly smile
  - dark brown to near-black straight bob at shoulder length
  - clean side part, smooth tidy silhouette
  - clothing palette usually muted teal, soft green, cream, and other calm professional tones
- Allowed variation:
  - classroom expression can shift from warm to gently firm
  - top can change between cardigan, blouse, or simple teacher outfit
  - pose can change freely
- Scene-use notes:
  - suitable for greeting students, teaching, pointing, reading, standing beside a board, or calmly correcting behavior
  - should feel composed and classroom-ready, not like a fashion portrait
- Do not drift into:
  - childlike proportions
  - a mom clone
  - curly or highly playful hairstyle
  - bright flashy fashion styling
  - glasses by default

### `li-laoshi`

- Anchor: [li-laoshi.webp](../assets/illustrated-teachers/li-laoshi.webp)
- Hanzi name: `李老师`
- Role: principal
- School function:
  - default recurring female principal anchor
  - school authority figure for announcements, greetings, hallway scenes, and school-wide situations
  - beginner-friendly teacher-address form for the principal in early lessons
- Stable traits:
  - middle-aged woman
  - clearly reads as a principal and clearly reads as older than `wang-laoshi`
  - East Asian appearance
  - warm light-medium skin tone
  - mature oval face with slightly fuller cheeks
  - neat dark eyebrows
  - calm dark brown eyes
  - small straight nose
  - gentle confident smile
  - neat dark short-to-medium hair with a more mature, structured silhouette than `wang-laoshi`
  - light glasses as a stable identity marker
  - clothing palette usually burgundy, forest green, dusty teal, soft olive, cream, and other practical professional tones
- Allowed variation:
  - expression can range from welcoming to gently serious
  - outfit can change between cardigan, soft structured jacket, or other simple principal clothing
  - pose can change freely
- Scene-use notes:
  - suitable for school entrance greetings, assemblies, office-adjacent scenes, hallway supervision, and calm authority moments
  - should feel warm and approachable, not harsh or scary
  - default styling should read school-professional but slightly relaxed, not corporate
- Do not drift into:
  - a young classroom-teacher vibe
  - a mom clone
  - flashy jewelry or fashion styling
  - severe angry expression by default

## Prompt Recipes

Use these as starting fragments when generating scenes with recurring adults.

### Family prompt base

`Match the existing family character anchor exactly. Keep the same face shape, eyebrows, eye shape, eye color, skin tone band, hairstyle, and age read. Preserve the same family identity and clean storybook avatar look.`

### Grandma prompt base

`Match the existing grandma anchor exactly: silver curled bob, round glasses, pearl jewelry, warm gentle senior face, lavender-plum palette, same identity.`

### Grandpa prompt base

`Match the existing grandpa anchor exactly: gray side-part hair, round glasses, gray mustache, warm gentle senior face, camel-brown palette, same identity.`

### Teacher prompt base

`Match the existing wang-laoshi anchor exactly: adult teacher in her early 30s, East Asian woman, neat straight dark bob, almond-round dark brown eyes, calm friendly authority, muted teal-green teacher clothing, clearly distinct from mom.`

### Principal prompt base

`Match the existing li-laoshi anchor exactly: middle-aged East Asian woman, light glasses, mature neat dark hairstyle, calm confident principal energy, practical school-professional clothing in burgundy, forest green, dusty teal, soft olive, or cream, clearly older and more administrative than wang-laoshi. Keep the outfit slightly relaxed and approachable, like a cardigan or soft structured jacket rather than a corporate suit. In beginner school scenes, children may address her as 李老师 rather than 校长.`

### Lele prompt base

`Match the existing lele anchor exactly: younger boy, light skin, round cheeks, dark brown spiky hair, large round dark brown eyes, cheerful open smile, same child identity, same energetic younger-boy feel.`

### Meimei prompt base

`Match the existing meimei anchor exactly: younger girl, light-medium skin, chin-length dark bob, pink clip, large round dark brown eyes, soft open smile, same child identity, same gentle younger-girl feel.`

### Anan prompt base

`Match the existing anan anchor exactly: older girl, light skin, high dark ponytail with pink tie, large round dark brown eyes, rosy cheeks, same child identity, slightly older and more composed than meimei.`

### Younger-brother prompt base

`Match the existing younger-brother family anchor exactly: youngest boy, warm medium tan skin, round cheeks, short dark spiky-tousled hair, large round dark brown eyes, bright smile, same family child identity.`

### Yangyang prompt base

`Match the existing yangyang anchor exactly: older active boy, tan skin, thick dark curly hair with dense volume, large round dark brown eyes, confident open smile, same child identity, athletic outdoor feel.`

### Tiantian prompt base

`Match the existing tiantian anchor exactly: older calm boy, light-medium skin, smooth side-swept dark hair, large round dark brown eyes, same child identity, older and more composed than lele.`

### Sisi prompt base

`Match the existing sisi anchor exactly: older girl, medium brown skin, two curly puff buns with loose ringlets, large round dark brown eyes, bright smile, same child identity, lively school-age feel.`

### Noah prompt base

`Match the existing noah anchor exactly: fair-haired boy, fair skin, tousled blond short hair, large round blue eyes, bright smile, same child identity, clear blond-boy silhouette.`

## Prompting Priority

When a generated image is wrong, fix in this order:

1. identity
2. age read
3. relationship clarity
4. gesture / expression
5. clothing
6. setting and composition

## Anchor Workflow

Use this workflow for the highest-frequency recurring characters first:

- `mom`
- `wang-laoshi`
- `lele`
- `anan`
- `meimei`

The goal is to stop treating these people as newly invented characters in each scene.
They should be treated as fixed reusable anchors.

### Step 1: Choose the anchor

- Identify whether the scene includes one of the high-frequency recurring characters.
- If yes, start from that anchor instead of writing a fresh character description.

### Step 2: Pull the fixed identity traits

- Copy the character's stable identity from this bible.
- Keep the same:
  - face shape
  - eyebrow shape
  - eye shape
  - eye color
  - skin tone band
  - hair color
  - hair silhouette
  - age read
  - overall vibe

### Step 3: Lock identity first in the prompt

- Start the prompt with an identity-lock sentence.
- Example:
  - `Match the existing anan anchor exactly: same face shape, same eyebrows, same eye shape and eye color, same skin tone, same ponytail silhouette, same age read, same overall identity.`
- Only after that should the prompt describe:
  - action
  - expression
  - clothing for the scene
  - camera angle
  - setting

### Step 4: Review identity before scene quality

- After generation, check the person first.
- Ask:
  - does this still look like the same character?
  - does the age still read correctly?
  - is the hairstyle still the same identity marker?
- Do not review background, props, or composition first if identity is already drifting.

### Step 5: Revise identity before revising scene details

- If the image drifts, fix the character match first.
- Do not start by changing color mood, composition, or prop placement when the face is already wrong.

### Step 6: Reuse approved prompt bases

- For high-frequency anchors, prefer reusing the prompt bases already defined in this file.
- This keeps wording stable across generations and reduces unnecessary drift.

### Step 7: Expand to stronger anchors when needed

- If drift remains high, the next step is not more descriptive prompting alone.
- The next step is to create a stronger anchor pack for that character, such as:
  - head-and-shoulders view
  - half-body view
  - full-body view
  - optional side-angle reference

## Current Anchor Priority

The first anchors to harden with this workflow are:

1. `mom`
2. `wang-laoshi`
3. `lele`
4. `anan`
5. `meimei`

## Approved Prompt Set

Use these as ready-to-paste starting blocks for new scene prompts.
Each block is meant to lock character identity first, then leave room for scene-specific instructions.

### Approved prompt: `mom`

```text
Match the existing mom anchor exactly from assets/illustrated-family/family-avatar-mom.webp.
Keep the same warm medium tan skin tone, soft oval face with rounded chin, thick dark brown arched eyebrows, large round dark brown eyes, small rounded nose, broad friendly smile, and dark brown wavy shoulder-length bob with a loose side part.
Keep the same adult mother identity and the same warm, caring, everyday-home authority.
Do not turn her into a different woman, a younger girl, or a generic mom.
After identity is locked, adjust only the expression, pose, clothing, and setting for the new scene.
```

### Approved prompt: `wang-laoshi`

```text
Match the existing wang-laoshi anchor exactly from assets/illustrated-teachers/wang-laoshi.webp.
Keep the same adult teacher identity: East Asian woman in her early 30s, warm light-medium skin tone, soft oval face, neat medium-thick dark eyebrows, large almond-round dark brown eyes, small straight nose, calm confident friendly smile, and dark brown to near-black straight shoulder-length bob with a clean side part.
Keep her clearly distinct from mom and clearly readable as a teacher, not a parent or generic adult woman.
Use calm professional teacher clothing in muted teal, soft green, or cream.
After identity is locked, adjust only the classroom action, expression, pose, and setting for the new scene.
```

### Approved prompt: `lele`

```text
Match the existing lele anchor exactly from assets/illustrated-kids/lele.webp.
Keep the same younger-boy identity: light skin tone, round face with full cheeks, medium-thick dark brown eyebrows, large round dark brown eyes, small rounded nose, cheerful open smile, and dark brown short spiky hair with uneven playful points.
Keep the same energetic and friendly younger-boy feel.
Do not make him look older, calmer like tiantian, or like a different boy with neat side-parted hair.
After identity is locked, adjust only the action, expression, clothing, and setting for the new scene.
```

### Approved prompt: `anan`

```text
Match the existing anan anchor exactly from assets/illustrated-kids/anan.webp.
Keep the same older-girl identity: light skin tone, soft oval face, dark brown gently arched eyebrows, large round dark brown eyes, rosy cheeks, and dark brown high ponytail with loose front bangs and a pink hair tie.
Keep the same slightly older, more composed school-age feel than meimei.
Do not turn her into a bob-haired girl, pigtail girl, or a more mature teen-like character.
After identity is locked, adjust only the action, expression, clothing, and setting for the new scene.
```

### Approved prompt: `meimei`

```text
Match the existing meimei anchor exactly from assets/illustrated-kids/meimei.webp.
Keep the same younger-girl identity: light-medium skin tone, rounded face with soft chin, dark brown softly arched eyebrows, large round dark brown eyes, dark brown chin-length bob with a slight inward curve, short side bangs, pink hair clip, and soft open smile.
Keep the same gentle younger-girl feel without making her babyish.
Do not turn her into a ponytail girl, a much older girl, or a visibly different child.
After identity is locked, adjust only the action, expression, clothing, and setting for the new scene.
```

## Kid Anchors

Use the kid anchors as a reusable cast, not as one-off illustrations.

- Portrait anchors live in `assets/illustrated-kids/`
- Full-body anchors live in `assets/illustrated-kids/full-body/`
- If a new scene uses a recurring kid, start from the kid anchor first before describing expression, pose, clothing, or setting
- If the scene is a family scene, apply the family mapping rules on top of the kid identity rather than replacing it

For now, the highest-priority kid anchors are:

- `lele`
- `meimei`
- `anan`
- `younger-brother`

These are the most likely to appear repeatedly across family scenes, school scenes, and simple daily-action lessons.

### `jaden`

- Anchor: [jaden.webp](../assets/illustrated-kids/jaden.webp)
- Hanzi name: `杰登`
- Role: boy
- Kid function:
  - alternate younger-boy anchor
  - sports and action-friendly Black boy anchor
- Stable traits:
  - boy, age `7-8`
  - deep brown skin tone
  - rounded oval face with soft cheeks
  - thick dark eyebrows
  - large round dark brown eyes
  - short tightly curled black hair
  - clean low fade on the sides
  - small rounded nose
  - bright open smile
  - clothing palette usually red, yellow, and other bold primary colors
- Scene-use notes:
  - suitable for sports, running, swimming, playground movement, and high-energy action lessons
  - should stay specific to Jaden, not collapse into a generic different Black boy each time
- Special note:
  - Jaden should not drift into a generic different Black boy design from scene to scene.
  - keep the short tight curls and fade; do not replace with loose curls, braids, or straight hair

### `lele`

- Anchor: [lele.webp](../assets/illustrated-kids/lele.webp)
- Hanzi name: `乐乐`
- Role: boy
- Kid function:
  - core younger-boy anchor
  - base identity for `older-brother` in family scenes
- Stable traits:
  - boy, age `6-7`
  - light skin tone
  - round face with full cheeks
  - medium-thick dark brown eyebrows
  - large round dark brown eyes
  - dark brown short spiky hair with uneven playful points
  - small rounded nose
  - cheerful open smile
  - clothing palette usually green and yellow accents
- Scene-use notes:
  - suitable for simple action verbs, toys, indoor play, movement practice, and beginner routine scenes
  - should feel energetic and friendly, but still clearly younger than `tiantian`
- Do not drift into:
  - neat side-part hair
  - older age read
  - narrow chin
  - blue eyes

### `meimei`

- Anchor: [meimei.webp](../assets/illustrated-kids/meimei.webp)
- Hanzi name: `美美`
- Role: girl
- Kid function:
  - core younger-girl anchor
  - base identity for `younger-sister` in family scenes
- Stable traits:
  - girl, age `6-7`
  - light-medium skin tone
  - rounded face with soft chin
  - dark brown softly arched eyebrows
  - large round dark brown eyes
  - dark brown chin-length bob with slight inward curve
  - short side bangs
  - pink hair clip on one side
  - soft open smile
  - clothing palette usually lavender, pink, and soft pastel tones
- Scene-use notes:
  - suitable for food reactions, beginner feelings, simple classroom scenes, and gentle everyday actions
  - should feel sweet and easy to read, but not babyish
- Do not drift into:
  - ponytail or braid
  - very long hair
  - blue or green eyes
  - sharp angular jaw

### `yangyang`

- Anchor: [yangyang.webp](../assets/illustrated-kids/yangyang.webp)
- Hanzi name: `阳阳`
- Role: boy
- Kid function:
  - older active-boy anchor
  - strong fit for sports and outdoor movement scenes
- Stable traits:
  - boy, age `8-9`
  - tan skin tone
  - oval face
  - thick dark eyebrows
  - large round dark brown eyes
  - very curly dark brown to black hair with dense volume
  - small nose
  - confident open smile
  - clothing palette usually teal, green, and earthy casual colors
- Scene-use notes:
  - suitable for soccer, biking, outdoor action, and confident movement verbs
  - should read athletic and outgoing, older than `lele`
- Do not drift into:
  - straight hair
  - flat top silhouette
  - pale skin
  - timid or babyish age read

### `anan`

- Anchor: [anan.webp](../assets/illustrated-kids/anan.webp)
- Hanzi name: `安安`
- Role: girl
- Kid function:
  - core older-girl anchor
  - good fit for school, movement, paired-kid scenes, and simple daily activities
- Stable traits:
  - girl, age `8-9`
  - light skin tone
  - soft oval face
  - dark brown softly arched eyebrows
  - large round dark brown eyes
  - dark brown high ponytail
  - loose front bangs and pink hair tie
  - small rounded nose
  - rosy cheeks
  - open cheerful smile
  - clothing palette usually coral pink, peach, and warm pastel tones
- Scene-use notes:
  - suitable for school scenes, reading, standing, walking, music class, dancing, and older-child activity lessons
  - should read a bit older and more composed than `meimei`
- Do not drift into:
  - blonde hair
  - short bob
  - pigtails
  - blue eyes
  - older teen-like proportions

### `tiantian`

- Anchor: [tiantian.webp](../assets/illustrated-kids/tiantian.webp)
- Hanzi name: `天天`
- Role: boy
- Kid function:
  - older calm-boy anchor
  - useful for reading, thinking, board games, and more composed school actions
- Stable traits:
  - boy, age `9-10`
  - light-medium skin tone
  - slightly longer oval face than younger boys
  - thick dark brown eyebrows
  - large round dark brown eyes
  - dark brown side-swept hair with smooth combed volume
  - small straight nose
  - open smile
  - clothing palette usually navy, blue, and other cooler solid colors
- Scene-use notes:
  - suitable for reading, writing, iPad use, chess, classroom focus, and older-boy verbs
  - should read clearly older and calmer than `lele`
- Do not drift into:
  - spiky hair
  - curly hair
  - very young age read
  - glasses

### `sisi`

- Anchor: [sisi.webp](../assets/illustrated-kids/sisi.webp)
- Hanzi name: `思思`
- Role: girl
- Kid function:
  - older girl anchor with curly hair texture
  - strong fit for dance, biking, and active school-age scenes
- Stable traits:
  - girl, age `8-10`
  - medium brown skin tone
  - oval face
  - dark thick eyebrows
  - large round dark brown eyes
  - black curly hair in two puff buns
  - a few loose ringlets framing the forehead
  - small rounded nose
  - bright smile
  - clothing palette usually turquoise, aqua, and fresh saturated colors
- Scene-use notes:
  - suitable for dance, bike riding, action verbs, and diversity-preserving cast balance
  - should feel energetic and confident without becoming older teen-like
- Do not drift into:
  - straight hair
  - single ponytail
  - pale skin
  - tiny narrow eyes

### `luna`

- Anchor: [luna.webp](../assets/illustrated-kids/luna.webp)
- Hanzi name: `露娜`
- Role: girl
- Kid function:
  - older girl anchor with side braid silhouette
  - good fit for graceful actions and composed outdoor scenes
- Stable traits:
  - girl, age `8-10`
  - medium skin tone
  - long oval face
  - thick dark brows
  - very large round warm brown eyes
  - long dark brown hair in a thick side braid
  - loose side-swept front section
  - broad smile
  - clothing palette usually turquoise and cool jewel tones
- Scene-use notes:
  - suitable for walking, standing, greeting, calm outdoor scenes, and readable medium shots
  - should feel composed and warm, not tiny or toddler-like
- Do not drift into:
  - blonde hair
  - pigtails
  - blue eyes
  - a tiny childlike face

### `noah`

- Anchor: [noah.webp](../assets/illustrated-kids/noah.webp)
- Hanzi name: `诺亚`
- Role: boy
- Kid function:
  - fair-haired boy anchor
  - useful for winter, sports, and visible cast diversity
- Stable traits:
  - boy, age `7-8`
  - fair skin tone
  - round face with soft cheeks
  - light blond eyebrows
  - large round blue eyes
  - tousled light blond short hair
  - small rounded nose
  - bright smile
  - clothing palette usually sky blue and other light cool colors
- Scene-use notes:
  - suitable for skiing, outdoor play, cold-weather scenes, and simple action lessons
  - keep him clearly blond with blue eyes; that contrast is part of the cast coverage
- Do not drift into:
  - brown or black hair
  - brown eyes
  - sharp jawline
  - older age read

### `sophie`

- Anchor: [sophie.webp](../assets/illustrated-kids/sophie.webp)
- Hanzi name: `苏菲`
- Role: girl
- Kid function:
  - fair-haired girl anchor
  - useful for balance-beam, calm action, and visible cast diversity
- Stable traits:
  - girl, age `7-8`
  - fair skin tone
  - soft oval face
  - light blond eyebrows
  - large round blue eyes
  - shoulder-length wavy blond bob
  - side part with smooth wave pattern
  - small nose
  - gentle open smile
  - clothing palette usually pink, lavender, and other soft pastel tones
- Scene-use notes:
  - suitable for balance, standing, gentle action, and clean portrait-friendly scenes
  - should feel soft and composed rather than flashy
- Do not drift into:
  - straight dark hair
  - brown eyes
  - severe expression
  - older teen-like proportions

## Workflow For New Scene Generation

1. Choose the recurring character ids in the scene.
2. Pull their anchor paths from this file.
3. In the prompt, explicitly say the character must match the existing asset.
4. Describe only the new action, setting, and expression.
5. After generation, check identity first, then teaching clarity.
6. If identity drift is large, revise the character match before revising the scene.

## When To Inspect Images

- Do not open images just to remember what exists.
- Use this file, `asset_summary.md`, and manifests first.
- Open the anchor image only when:
  - a scene with a recurring character is drifting
  - a new recurring character is being defined
  - the user reports a mismatch

## Next Improvement

- If drift still shows up in scene generation, the next step is not broader prompting.
- The next step is to create 3-view anchor packs for the four most reused people:
  - `mom`
  - `dad`
  - `jaden`
  - `lele`
