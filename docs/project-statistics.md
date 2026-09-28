# Project snapshot counts

Run `npm run build:stats` to refresh the About page and catalog count labels.
The regular `npm run build` also rebuilds the sitemap and refreshes these counts.

## Counting rules

- Learning topics: keys in the current topic registry.
- Textbook lessons: lesson entries across the textbook curriculum.
- Culture stories: unique entries in the culture catalog. Reading-level variants do not add stories. The creature map is a separate interactive page, not an extra story.
- Visual assets: existing image files referenced by the sitemap pages, their linked pages and local scripts/styles, and the learning application's dependency graph. The scan also resolves table-driven image filenames within their source modules and the generated clock/month collections.
- Identical image bytes are counted once. Unreferenced drafts, previous versions, and source copies are not counted. Different image resolutions are separate deployed asset files, not separate original artworks.
- The displayed visual count is a conservative lower bound, rounded down to the nearest ten with `+`. Inline SVG drawings and unresolved dynamic image references are excluded.
- Audio clips: existing files in the active recorded-learning IDs and pinyin clip manifest. Unused recordings in the asset directory are excluded.
- Sitemap: published-path entries from the culture catalog plus the main site pages and the creature map. Building a local sitemap does not publish it to production or submit it to Search Console.

## Verified in the September 27, 2026 working version

- 43 learning topics
- 56 textbook lessons
- 114 culture stories, including Four Symbols
- 698 byte-distinct referenced image assets found; displayed as **690+**
- 1,244 recorded audio clips
- 123 sitemap URLs, including the Four Symbols article and the creature map

`tests/project-stats.test.mjs` checks the displayed numbers against the data, includes all current creature images, excludes known backups, and verifies the generated sitemap.

## Image delivery budget

Every referenced image must be at most **120,000 bytes**, not 120 KiB (122,880 bytes). The only active exception is `culture/books/literature/shan-hai-jing/map/assets/map-world.webp`, with a 1,536,000-byte maximum. Map previews, creature portraits, story illustrations, and catalog covers use the ordinary limit.

`npm run check:images` audits the referenced files, including untracked new assets and source-directory images accidentally used by pages. The normal build runs this check as well. `npm run optimize:images` compresses oversized referenced WebP files without changing dimensions or transparency, retaining originals in a temporary backup directory. Unused high-resolution editorial sources and old map drafts are not modified.
