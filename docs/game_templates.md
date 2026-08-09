# Reusable Game Templates

This file maps the best game patterns for this app.

The goal is to reuse a small number of strong, touch-first, audio-first game templates across many topics.

## Best Reusable Templates

### 1. Listen And Choose

What it is:

- play audio
- child taps the matching word, phrase, picture, or meaning

Why it works:

- simple for young kids
- audio-first
- easy to reuse

Best topics:

- greetings
- polite words
- family
- food
- animals
- clothes
- weather
- school objects
- time phrases

Build priority:

- already in use
- keep as a core template

## 2. Matching Game

What it is:

- match Chinese to English
- Chinese to picture
- phrase to meaning
- phrase to situation

Why it works:

- uses wide screen well
- easy to understand
- flexible across vocabulary and phrases

Best topics:

- polite words
- body
- family
- school
- clothes
- food
- hobbies

Build priority:

- already in use
- keep as a core template

## 3. Situation Chooser

What it is:

- show 2 to 4 small scenes
- ask which scene matches the phrase or audio

Why it works:

- very good for social language
- helps meaning feel real
- strong fit for young learners

Best topics:

- greetings
- polite words
- daily life
- weather
- school

Build priority:

- very high

## 4. Order The Dialogue

What it is:

- child puts short lines in the correct order

Why it works:

- helps with conversation flow
- good bridge from isolated phrases to real exchanges

Best topics:

- greetings
- polite words
- introductions
- daily routine

Build priority:

- high

## 5. Find And Tap

What it is:

- show a scene
- ask child to tap the correct object, person, color, body part, or item

Why it works:

- feels playful
- ideal for touch screens
- strong for younger children

Best topics:

- body
- clothes
- school
- room
- animals
- colors

Build priority:

- high

### Collection Into A Container

What it is:

- choose a category or a mixed set
- show one target picture at a time
- child taps the matching Chinese card
- a correct item moves into a meaningful container, such as a backpack, shopping cart, or basket
- complete a short set of three items to finish the round

Required behavior:

- randomize target and answer-card order for every new round
- show a red cross on a wrong card and keep the target active
- show a green check on a correct card, then place the item in the container
- show three progress markers and a clear completion state
- state the container consistently in the section summary, in-game instruction, accessibility labels, and completion message
- preserve the container illustration's aspect ratio; never stretch it to fill a card

Best topics:

- school supplies: pack a backpack
- food and drinks: collect food in a shopping cart
- clothes: pack for an activity or weather

Build priority:

- already in use; treat as a shared template

## 6. Build The Phrase

What it is:

- give word chunks
- child arranges them into a simple sentence

Why it works:

- good next step after recognition games
- supports pattern learning

Best topics:

- introductions
- polite words
- age
- time
- daily life

Build priority:

- medium

## 7. Sentence-Frame Fill

What it is:

- show one short, already-taught sentence frame with one or two blanks
- show a small inline visual cue for the answer sentence
- child chooses one word for each blank
- keep the completed sentence visible after success

Use it when:

- the practice goal is recognition and production of a specific beginner sentence frame
- every valid answer is a complete, natural sentence already taught by the lesson scenes or Book words
- a small picture cue can distinguish the target without turning the page into a large scene game

Data contract:

```js
const rounds = [
  { id: "sun", frame: "____有____。", answers: ["白天", "太阳"], cue: "sun" },
  { id: "flower", frame: "____有____。", answers: ["地上", "花"], cue: "flower" }
];
```

Each round owns the whole valid sentence. Do **not** assemble a sentence by independently mixing categories such as time, location, and noun unless every resulting combination has been explicitly approved as natural and meaningful. For example, Nature uses `白天有太阳。` and `地上有花。` as separate rounds; it must not generate `白天，地上有花。`.

Required behavior:

- Randomize the round order and each answer-bank order when a new round begins.
- Keep an answer-bank order stable while the child is answering that round; do not reshuffle after each tap.
- Mark each chosen blank green or red immediately. A wrong choice remains replaceable.
- Before completion, the green Play button says only the cue word or another non-revealing prompt. After completion, it says the complete sentence; Play then advances to the next round.
- Put the cue inline with the sentence, not as a large separate illustration, when the purpose is sentence completion rather than scene exploration.
- Include plausible words from the same lesson as distractors, but never make the correct answer depend on an unspoken real-world assumption.

Acceptance checklist:

- Every configured round reads as a natural Chinese sentence when its answers are inserted.
- No words from separate book frames are combined merely to create more permutations.
- The cue, full sentence, pinyin, English gloss, audio, feedback, and completion state all refer to the same round.
- Both the round order and answer positions vary across rounds, while answer positions remain stable within a round.
- The interaction has enough rounds to practise the approved sentence set, rather than only the most visually convenient nouns.

Best topics:

- nature (`白天有太阳。`, `地上有花。`)
- weather and clothing (`今天下雨了，带雨伞。`)
- room and positions (`桌子上有书。`)
- daily life and routine frames

## 8. Sorting Game

What it is:

- sort words into categories

Why it works:

- useful for review
- good for broader vocabulary sets

Best topics:

- food and drinks
- animals
- school
- family
- hobbies

Build priority:

- medium

## 9. Memory Flip Cards

What it is:

- flip and match pairs

Why it works:

- familiar
- playful
- good for review

Best topics:

- small vocabulary sets across almost all topics

Build priority:

- medium to low

## 10. Drag Into Scene

What it is:

- move an item into the correct place in a picture

Why it works:

- highly visual
- engaging on touch screens

Best topics:

- clothes
- schoolbag
- room
- food table

Build priority:

- medium to low

## 11. Count And Choose

What it is:

- count items or hear a number
- choose the matching answer

Why it works:

- perfect for number progression
- easy to scale by level

Best topics:

- numbers
- age
- date
- telephone numbers

Build priority:

- already in use

## Best First Three Templates To Reuse Across The Site

If we want the highest return, prioritize:

1. Listen And Choose
2. Matching Game
3. Situation Chooser

These three cover a large part of the curriculum and fit young learners well.

## Topic Suggestions

### Greetings

- listen and choose
- order the dialogue
- situation chooser

### Polite Words

- listen and choose
- matching game
- situation chooser

### Introductions

- build the phrase
- order the dialogue
- listen and choose

### Body

- find and tap
- matching game

### Family

- match person to word
- who says it
- listen and choose

### School

- find and tap
- drag into scene
- situation chooser

### Clothes

- drag into scene
- find and tap
- matching game

### Food

- sorting game
- listen and choose
- choose the right meal item

### Time And Daily Life

- order the routine
- listen and choose
- phrase builder

## Design Rules For All Games

- audio should matter, not just be optional decoration
- keep tasks short
- use large touch targets
- show clear success and try-again feedback
- avoid long text instructions for kids
- let a parent supervise without knowing Chinese well
- prefer one clear learning goal per game
- use the full width on desktop when a game benefits from space
