# Culture Article Image Workflow

This file describes the process.

Source-of-truth policy:

- Use [culture_art_direction.md](./culture_art_direction.md) for visual judgment and image quality rules.
- Use this file for the operational steps of how culture article images are added and built.

## Goal

Turn each `culture/content/**/{zh,en}.md` article into a static bilingual web page with `1-5` images that help comprehension instead of acting as decoration.

## Current Structure

- article source list: `culture/content/article-manifest.json`
- page generator: `scripts/build_culture_articles.mjs`
- shared article styles: `culture/article-template.css`
- output pages: `culture/<slug>/index.html`

## Image Rules

- final format: `.webp`
- target size: around `120 KB` each
- each image should explain a key idea, scene, object, or contrast in the article
- do not add filler backgrounds just to make the page feel more designed
- preferred count: `1-5` images per article

## Build Order Rule

Do not run image conversion and page build at the same time.

Required order:

1. Generate or prepare the source image.
2. Convert it to the final repo asset, usually with `cwebp`.
3. Verify the output file exists and is not `0 bytes`.
4. Only then run the build script that copies images into `books/` and `experiments/`.

Reason:

- If `cwebp` and the build run in parallel, the build can copy the destination file before `cwebp` finishes writing it.
- That produces broken `0-byte` images in the built pages even when the source file later becomes valid.

In practice:

- Do not put `cwebp` and `node scripts/build_*.mjs` in the same parallel batch.
- Run conversion first, then rebuild.

## Per-Article Workflow

1. Read `zh.md` and `en.md`.
2. Pick the `1-5` moments that most need visual help.
3. Add those image slots to `culture/content/article-manifest.json`.
4. Put finished `.webp` files in `culture/<slug>/images/`.
5. Run `node scripts/build_culture_articles.mjs`.

## Image Slot Guidance

Good image targets:

- a place the child should picture clearly
- a process that happens over time
- an object that may be unfamiliar
- a comparison that is easier to see than describe
- a family or festival action with clear social meaning

Avoid:

- generic decorative cover art with no teaching value
- repeated versions of the same concept
- text baked into the image
- crowded scenes where the teaching point is hard to spot

## Example

`food-dumplings` currently has:

- `hero`: finished local asset
- `gallery`: planned family dumpling-making scene

If an image `src` is missing in the manifest, the generated page will show the remaining art brief so the slot is not forgotten.
