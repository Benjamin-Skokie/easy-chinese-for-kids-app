# School Bible

Last updated: 2026-07-12

Purpose: reduce environment drift across all school-related illustrations by defining one recurring school campus and its key interior and exterior spaces.

## Core Principle

The school should be treated like a recurring anchor, similar to a recurring character.
Do not reinvent a different school building for each new scene.

If a scene happens at school, start from this school bible first.

## School Identity

This project's default school is:

- a believable American elementary school
- primarily red brick
- white window frames
- practical, real-world public-school proportions
- calm, grounded, child-friendly without looking fantasy-like

It should not drift into:

- random modern glass campus
- castle-like school
- overly colorful toy-like cartoon school
- generic suburban office building
- school with wildly different facade colors from scene to scene

## Exterior Anchor

The exterior school anchor should usually include:

- red brick main building
- white-trimmed rectangular windows
- a long front driveway for car drop-off and pick-up
- a curbside or loop area where cars can queue
- a sidewalk for walking children
- enough open space for walking or biking to school scenes

Optional exterior elements:

- small lawn areas
- a modest school sign
- bike rack when relevant
- crosswalk when relevant

Avoid by default:

- giant flag focal points
- fantasy towers
- exaggerated rainbow facades
- oversized playground equipment in front of the main school building

## Morning Drop-off Rule

For morning arrival scenes at school:

- the default reference is a long driveway with a line of parent cars dropping children off
- some children may also arrive by sidewalk or bike
- all three can coexist in a believable way

This is the preferred anchor for:

- walking to school
- biking to school
- arriving at school
- parent drop-off

## School Exterior Prompt Base

`Use the recurring school anchor from the school bible: a believable American elementary school with a red brick main building, white window frames, and a long front driveway for parent drop-off. Keep the campus grounded, calm, and realistic, not fantasy-like or toy-like.`

## Interior Design Language

All school interiors should feel like they belong to the same campus.

Shared interior traits:

- clean, practical school finishes
- bright but soft lighting
- neutral walls with some warm accents
- simple institutional flooring appropriate to the room
- white or light trim where needed
- believable doors, hardware, and storage

The school should feel consistent across:

- hallway
- classroom
- restroom entrance
- gym
- cafeteria
- library
- music classroom
- art classroom

## Hallway Anchor

The school hallway should usually include:

- brick or painted school walls
- white or light door frames
- several classroom doors that feel consistent from room to room
- a hallway view that can suggest different classrooms along the corridor
- one boys restroom door and one girls restroom door as the default restroom anchor when the scene needs school navigation context
- simple bulletin boards or student art when needed
- polished school floor

Avoid:

- hotel hallway feel
- office corridor feel
- highly decorative fantasy murals everywhere
- text-heavy restroom signage as the main way to distinguish the doors

## Classroom Anchor

The general classroom should include:

- red-brick-school continuity in trim and architecture
- grouped student tables rather than isolated single desks
- the default layout is small clusters, usually four desks pushed together
- clustered tables should support student discussion and small-group interaction
- whiteboard or teaching board
- practical storage shelves or cubbies
- child-height classroom furniture

Avoid:

- rows of perfectly separated desks as the default
- overly preschool-like rainbow clutter
- luxury private-school look
- generic office training room

## Restroom Door Anchor

The restroom area should read as a school restroom, not a home bathroom.

Use:

- simple institutional restroom entrance
- sturdy painted doors or stall-area entry
- school hallway continuity outside the restroom

Avoid:

- fancy spa bathroom styling
- home bathroom mirrors and decor

## Gym Anchor

The gym should include:

- wood floor
- high ceiling
- painted court lines
- school-wall padding or simple sports equipment storage

Avoid:

- professional arena look
- giant stadium seating

## Cafeteria Anchor

Preferred Chinese label: `食堂`

The cafeteria should include:

- long cafeteria tables or bench tables
- school lunchroom feel
- tray line or serving counter when relevant
- bright practical lighting

Avoid:

- restaurant feel
- mall food court feel

## Library Anchor

The library should include:

- low-to-medium book stacks
- reading tables
- kid-accessible shelves
- a calm quiet school-library atmosphere

Avoid:

- cathedral-like grand library
- bookstore feel

## Music Classroom Anchor

The music classroom should include:

- piano as the most common anchor object
- a teaching board or music staff board
- open floor area for children
- children usually sit on a carpet or rug area rather than on chairs
- a clear teacher area

Avoid:

- rows of chairs as the default setup
- full orchestra setup by default
- concert stage as the default room
- formal recital-room layout

## Art Classroom Anchor

The art classroom should include:

- tables for drawing or painting
- visible art supplies storage
- drying rack, easels, or supply shelves when relevant

Avoid:

- messy studio chaos
- adult fine-art atelier look

## Playground Anchor

The playground belongs to the same school campus and should feel physically related to the school.

Use:

- realistic elementary-school playground
- blacktop, field, or practical play structures
- enough open running space
- the playground should usually sit beside or behind the school, not in front like the main entrance
- the visible school connection should feel like the side or back of campus
- simple practical doors if a school wall is visible nearby

Avoid:

- front-facade school view reused as a playground view
- grand front-entry stairs
- fancy or luxurious entrance doors
- prominent flags behind the playground by default
- theme-park playground design
- fantasy colors and oversized toy structures

## Space Mapping

Use these defaults unless the lesson needs something else:

- `上学 / 放学 / 走路去学校 / 骑车去学校 / 坐车去学校` -> school exterior + driveway + sidewalk
- `走廊` -> hallway anchor
- `男厕所 / 女厕所 / 洗手间` -> hallway anchor or restroom door anchor, depending on how much navigation context the scene needs
- `教室` -> general classroom anchor
- `上音乐课` -> music classroom anchor
- `上画画课` -> art classroom anchor
- `体育馆` -> gym anchor
- `图书馆` -> library anchor
- `食堂` -> cafeteria anchor
- `操场` -> playground anchor

## Practical Corrections To Preserve

- Music classroom:
  - default child seating is on the carpet, not on chairs
- Playground:
  - default relationship is side/back of school, not front facade
  - no grand stairs
  - no fancy front-entry doors
  - no prominent flag unless the lesson explicitly needs it
- General classroom:
  - default student layout is grouped table clusters, usually four desks together

## School Drift Checklist

When a school scene looks wrong, check in this order:

1. does it still look like the same red-brick school?
2. do the windows and trim still match the campus identity?
3. does the exterior still support driveway drop-off logic?
4. does the interior still feel like the same campus?
5. is the room type visually clear?

## Prompting Rule

When a school scene is generated, the prompt should explicitly say:

- use the recurring school anchor from `school_bible.md`
- red brick exterior
- white window frames
- long driveway drop-off when exterior
- room type from the defined school spaces when interior

## Current Priority

The most important places to keep stable first are:

1. school exterior / front driveway
2. classroom
3. music classroom
4. playground
5. cafeteria
6. library

## Current Anchor Status

- The current school anchor images are first-pass anchors, not final locked references.
- The next school-environment revisions should specifically correct:
  - music classroom floor seating
  - playground relation to the back/side of school
  - classroom grouped table layout
