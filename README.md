# Easy Chinese for Kids

This is a small, static learning website for children studying Chinese. It has topic-based lessons, book-based lessons, practice games, illustrated assets, and a separate Culture reading area.

The sections below explain what the files do and where to make changes.

## The three web building blocks

Think of each screen as a house:

- **HTML** is the structure: the rooms, headings, buttons, and empty spaces where lesson content appears. In this project, [index.html](./index.html) is the main page.
- **CSS** is the appearance: colours, fonts, spacing, mobile layout, and animations. [styles.css](./styles.css) controls the main app’s appearance; Culture pages have their own CSS files.
- **JavaScript** is the behaviour: it fills in lesson content, responds when a child presses a button, plays audio, runs games, and changes between topics. The editable JavaScript lives in `src/`.

Images and other media live in `assets/`. A lesson’s JavaScript data points to the image it needs.

## How the app starts

```text
index.html
  ├─ loads styles.css              (how the app looks)
  └─ loads app.js                  (how the app behaves)
       └─ generated from src/main.js
            └─ starts src/app/runtime-wiring.js
                 ├─ core shared behaviour
                 ├─ lesson/topic data
                 └─ feature-specific games and displays
```

`app.js` is **automatically generated**. Do not edit it manually. It is kept in the repository so a fresh copy of the project can be opened directly from `index.html`, even without installing developer tools.

## Important file structure

```text
.
├── index.html                 Main page structure
├── styles.css                 Main page styling
├── app.js                     Generated browser file — do not edit
├── src/                       Editable JavaScript source code
│   ├── main.js                Build entry point
│   ├── app/
│   │   └── runtime-wiring.js  Connects the app’s parts at startup
│   ├── core/                  Shared navigation, audio, state, and UI behaviour
│   ├── data/                  Course, book, character, and topic registry data
│   ├── features/              Lesson content and interactions, grouped by subject
│   │   ├── foundations/       Numbers, greetings, introductions, family basics
│   │   ├── food/              Food, preferences, and meals
│   │   ├── school-life/       Stationery, classroom, and school lessons
│   │   ├── time-daily-life/   Weekdays, time, dates, home, transport, and positions
│   │   └── ...                Other topic groups
│   └── games/                 Reusable practice-game behaviour
├── assets/                    Lesson images and image manifests
├── culture/                   Separate Culture reading pages and their images
├── scripts/                   Build, development-server, and validation tools
├── tests/                     Automated checks for lesson data and app structure
└── docs/                      Planning notes and detailed project documentation
```

## Where to make common changes

| If you want to change… | Start here |
| --- | --- |
| Text, buttons, or the overall page layout | `index.html` |
| Colours, spacing, fonts, or layout | `styles.css` |
| A topic’s words, sentences, scenes, or practice items | The matching file under `src/features/` |
| Book order, lesson-to-topic links, or home-page categories | `src/data/curriculum.js` |
| Which topics the app knows about | `src/data/topic-registry.js` |
| Shared audio, navigation, or game behaviour | `src/core/` or `src/games/` |
| Culture articles | `culture/` |
| An illustration | `assets/` and the lesson file that references it |

For a new or changed learning topic, edit the relevant `src/features/` file first, then make sure it is registered in `src/data/topic-registry.js` and linked from `src/data/curriculum.js` if it should appear in the book or topic navigation.

## Everyday developer commands

Install the project’s development tool once:

```sh
npm install
```

Start a local development site that automatically rebuilds after source changes:

```sh
npm run dev
```

Then visit `http://127.0.0.1:4173` in a browser.

Create the updated generated `app.js` after changing files in `src/`:

```sh
npm run build
```

Run the complete safety check before committing changes:

```sh
npm run check
```

That command validates lesson data, rebuilds `app.js`, runs the automated tests, checks JavaScript syntax, and checks for whitespace errors.

## A note on generated files

Edit files in `src/`, not `app.js`. The build process combines the modular source files into one browser-ready script. This makes the project easier to maintain while keeping the finished site simple to open and share.
