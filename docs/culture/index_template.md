# Culture Index Template

Use this template for the learning home and future index-style pages. The goal is to match `culture/index.html`: a visual category grid first, full sections below, and a fixed nav that appears only after the category grid has scrolled away.

## Font System

Use the same fonts everywhere:

- Body / English UI: `"Avenir Next", "Trebuchet MS", "Helvetica Neue", sans-serif`
- Headings: `"Palatino Linotype", "Book Antiqua", Georgia, serif`
- Chinese text: `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`

In CSS, use the existing variables:

```css
--latin-font: "Avenir Next", "Trebuchet MS", "Helvetica Neue", sans-serif;
--hanzi-font: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
--display-font: "Palatino Linotype", "Book Antiqua", Georgia, serif;
```

## Required Page Structure

```html
<nav class="learning-culture-nav" id="learningCultureNav" aria-label="Topic categories"></nav>

<main class="book-like-page">
  <section class="hero">...</section>

  <section class="card-grid-like">
    <!-- category cards only -->
  </section>

  <section class="section-like" id="category-id">
    <div class="cat-head-like">...</div>
    <div class="topic-grid-like">
      <!-- topic links/buttons only -->
    </div>
  </section>
</main>
```

## Interaction Rules

- Category cards do not expand inline.
- Clicking a category card scrolls to its matching section.
- All category sections exist in the page at the same time.
- The fixed nav is hidden initially and appears after scrolling past the category card grid.
- The fixed nav updates active state from scroll position, not from hover or last click alone.
- Book lookup remains a separate tab/flow and should not be mixed into topic sections.

## Visual Rules

- Top-level category cards should follow the `culture` `cat-card` proportions: compact, centered, accent bar, icon, bilingual title, hint, count badge.
- Sections should follow the `culture` `section` proportions: white card, large radius, shadow, icon header, two-column topic grid on desktop.
- Topic rows inside sections should be text-first, not image-first. Use Chinese title, English title, and a short hint.
- Use generated icons only for top-level category cards. Do not put large illustration thumbnails into every topic row unless the page is a gallery.

## Current Learning Home Mapping

- `learning-culture-nav` maps to culture `sticky-nav`.
- `learning-home-board` maps to culture `card-grid`.
- `learning-home-card` maps to culture `cat-card`.
- `learning-category-section` maps to culture `section`.
- `learning-category-head` maps to culture `cat-head`.
- `category-topic-grid` maps to culture `topic-grid`.
- `category-topic-card` maps to culture `topic done`.
