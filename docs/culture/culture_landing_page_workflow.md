# Culture Landing Page 流程 / Culture Landing Page Workflow

Last updated: 2026-09-06

这份文档说明怎样维护 Nihao World 根页面中的 Culture landing view，包括分类顺序、文章列表、flagship stories、数量、导航、生成和测试。

This document explains how to maintain the Culture landing view inside the Nihao World root page, including category order, story lists, flagship stories, counts, navigation, builds, and tests.

---

# 中文流程

## 一、当前页面结构

真正的 Culture 入口是根页面中的内嵌 view：

```text
index.html?view=culture
```

主要文件职责：

- `index.html`：Culture 分类卡片、分类 section、文章链接和首页 flagship story 内容。
- `src/core/navigation-runtime.js`：分类实际显示顺序、Culture sticky navigation 和运行时交互。
- `src/core/story-highlights.js`：flagship story carousel 的滚动和圆点交互。
- `styles.css`：根页面、分类卡片、文章列表、sticky navigation 和 carousel 样式。
- `culture/index.html`：保留的独立 Culture 目录页面；它不是当前根页面 Culture view 的设计标准，但文章标题和链接仍应保持同步。
- `culture/content/<category>/<slug>/page.md`：每篇文章标题和正文的唯一底稿。

不要再把旧 `culture/index.html` 当成当前 landing page template，也不要从它推断实际分类顺序。

## 二、分类顺序

分类实际顺序由以下数组控制：

```text
src/core/navigation-runtime.js → cultureStoryRanking
```

运行时会按照这个数组重新排列：

- `.culture-category-card`
- `.culture-category-section`
- sticky navigation 项目

因此：

- 调整分类顺序时只修改 `cultureStoryRanking` 的顺序和分数。
- 卡片、section 和 sticky navigation 必须保持同一个分类 ID。
- 不要只移动 `index.html` 里的静态 HTML 顺序；运行时仍会再次排序。
- 当前原则是故事性强、儿童更容易进入的分类在前，哲学放在最后。

当前顺序：

1. Folk Tales
2. Literature
3. Figures
4. Architecture
5. Clothing
6. Folk Customs
7. Culture
8. Food
9. Inventions
10. Military
11. Economy
12. Politics
13. Geography
14. Art
15. Religion
16. Philosophy

## 三、分类卡片和文章列表

每个分类在 `index.html` 中有两个对应部分：

1. 顶部 `.culture-category-card`；
2. 下方 `#culture-<category>` section。

检查规则：

- `data-culture-target="<category>"` 必须与 `id="culture-<category>"` 对应。
- 分类卡片中英文名称、简介、颜色和 emoji 必须与 section 对应。
- 每篇文章链接必须指向 `culture/books/<category>/<slug>/index.html`。
- 同一分类内的文章顺序按照 `index.html` 中 `<li class="topic done">` 的顺序显示。
- 添加、移动或删除文章时，必须更新文章列表和分类卡片上的文章数量。

运行：

```sh
node scripts/sync_culture_index_titles.mjs
```

这个脚本会从每篇 `page.md` 同步文章标题到 `index.html` 和 `culture/index.html`，并更新 `culture/index.html` 的分类数量。

当前脚本不会自动更新根 `index.html` 分类卡片上的数量，所以根页面数量必须人工核对。

## 四、flagship stories

首页 Culture carousel 当前固定为 6 篇 flagship stories。

每张 flagship card 需要：

- 正确的文章链接；
- 已经接受并存在于网站目录中的图片；
- 简短 category kicker；
- 与 `page.md` 一致的中英文标题；
- 对应的 carousel dot。

规则：

- card 顺序就是 carousel 显示顺序。
- 6 张 card 与 6 个 dot 必须一一对应。
- `sync_culture_index_titles.mjs` 不负责更新 flagship card，所以 flagship 标题、链接和图片需要单独检查。
- 标题变化但文章仍是 flagship 时，同步修改 flagship card。
- 文章被移除、改分类或不再适合作为首页精选时，先选择替代文章，再删除旧 card。
- 不为了填满 carousel 使用低质量图片；优先选择画面清楚、故事性强、在小尺寸下仍能读懂的文章图片。

## 五、常见改动

### 文章只改标题

1. 先在文章 `page.md` 中修改标题。
2. 同步 `zh.md` 和 `en.md`。
3. 运行 `sync_culture_index_titles.mjs`。
4. 如果文章是 flagship，手工同步 carousel 标题。
5. 检查根目录和独立 Culture 目录中的标题。

### 新增文章

1. 先完成文章快速落地流程。
2. 在正确分类 section 中添加文章链接。
3. 更新根页面分类数量。
4. 运行标题同步脚本，让两份目录保持一致。
5. 只有明确要成为首页精选时才添加 flagship card。

### 移动文章到另一个分类

1. 先完成文章目录、frontmatter、back link 和生成路径的迁移。
2. 从旧分类 section 删除链接。
3. 在新分类 section 加入链接。
4. 同时更新两个分类的数量。
5. 重新生成文章页面并同步目录标题。
6. 检查旧路径是否仍被目录或 flagship 引用。

### 删除文章

1. 确认用户明确要求删除的范围。
2. 从分类文章列表中移除链接。
3. 更新分类数量。
4. 如果它是 flagship，先替换对应 card 和 dot。
5. 检查目录中没有遗留链接。
6. 源文件或生成文件的删除遵守单独的删除确认和验证流程。

### 调整分类顺序

1. 修改 `cultureStoryRanking`。
2. 保持分类 ID 不变。
3. 构建 `app.js`。
4. 在浏览器中确认卡片、section 和 sticky navigation 都按同一顺序显示。

## 六、构建顺序

文章内容和图片先按 [Culture Story 快速落地流程](./story_landing_workflow.md) 生成。

Landing page 相关改动完成后：

```sh
node scripts/sync_culture_index_titles.mjs
```

如果修改了 `src/core/navigation-runtime.js` 或 `src/core/story-highlights.js`：

```sh
npm run build
```

如果文章或 references 发生变化：

```sh
node scripts/build_sources_research.mjs
```

所有改动结束后只运行一次：

```sh
npm run check
```

不要手工修改生成的 `app.js`。

## 七、针对性检查

在本地服务器打开：

```text
http://127.0.0.1:<port>/index.html?view=culture
```

桌面和手机宽度都检查：

- 打开 Culture view 后没有重复 hero；
- flagship carousel 有 6 张 card 和 6 个 dot；
- 每张 flagship 图片、标题和链接正确；
- 分类卡片按照 `cultureStoryRanking` 显示；
- 分类 section 与卡片顺序一致；
- Folk Tales 在最前，Philosophy 在最后；
- 分类数量与实际文章数一致；
- 每篇文章标题与 `page.md` 一致；
- 每个分类卡片能滚动到正确 section；
- sticky navigation 出现、滚动和 active state 正常；
- 页面底部最后一个分类能够正确变为 active；
- 页面没有横向溢出，手机上的标题和导航没有挤坏。

## 八、完成报告

只报告：

- 修改了哪些分类、文章列表或 flagship stories；
- 标题和数量是否同步；
- 根 Culture view 和独立 Culture 目录是否一致；
- 桌面和手机检查结果；
- 构建和测试结果；
- 是否 commit 或 push。

除非用户明确要求，否则不 commit、不 push。

---

# English Workflow

## 1. Current page structure

The primary Culture entrance is the in-page view inside the root page:

```text
index.html?view=culture
```

File responsibilities:

- `index.html`: Culture category cards, category sections, story links, and flagship-story content.
- `src/core/navigation-runtime.js`: actual category order, Culture sticky navigation, and runtime interaction.
- `src/core/story-highlights.js`: flagship carousel scrolling and dot behavior.
- `styles.css`: root-page, category-card, story-list, sticky-navigation, and carousel styling.
- `culture/index.html`: retained standalone Culture directory. It is not the design source of truth for the current root Culture view, but its story titles and links should remain synchronized.
- `culture/content/<category>/<slug>/page.md`: the canonical source for each story’s titles and manuscript.

Do not treat the old `culture/index.html` as the current landing-page template, and do not infer the visible category order from it.

## 2. Category order

The visible order is controlled by:

```text
src/core/navigation-runtime.js → cultureStoryRanking
```

At runtime, this array reorders:

- `.culture-category-card` elements;
- `.culture-category-section` elements; and
- sticky-navigation items.

Therefore:

- Change category order only in `cultureStoryRanking`, including its order and scores.
- Cards, sections, and sticky-navigation items must keep the same category ID.
- Do not merely rearrange the static HTML in `index.html`; the runtime will reorder it again.
- The current principle is to place story-rich, child-accessible categories first and Philosophy last.

Current order:

1. Folk Tales
2. Literature
3. Figures
4. Architecture
5. Clothing
6. Folk Customs
7. Culture
8. Food
9. Inventions
10. Military
11. Economy
12. Politics
13. Geography
14. Art
15. Religion
16. Philosophy

## 3. Category cards and story lists

Every category has two matching parts in `index.html`:

1. a `.culture-category-card` near the top; and
2. a `#culture-<category>` section below.

Checks:

- `data-culture-target="<category>"` must match `id="culture-<category>"`.
- The bilingual name, description, color, and emoji on the card must match the section.
- Every story link must point to `culture/books/<category>/<slug>/index.html`.
- Story order within a category follows the order of `<li class="topic done">` elements in `index.html`.
- When adding, moving, or deleting a story, update both the list and the category-card count.

Run:

```sh
node scripts/sync_culture_index_titles.mjs
```

This synchronizes story titles from each `page.md` into `index.html` and `culture/index.html`, and updates category counts in `culture/index.html`.

It currently does not update category-card counts in the root `index.html`, so those counts must be checked manually.

## 4. Flagship stories

The home-page Culture carousel currently contains exactly six flagship stories.

Every flagship card needs:

- the correct story link;
- an accepted image that exists in the generated website directory;
- a short category kicker;
- Chinese and English titles matching `page.md`; and
- one corresponding carousel dot.

Rules:

- Card order is carousel order.
- Six cards and six dots must correspond one to one.
- `sync_culture_index_titles.mjs` does not update flagship cards, so their titles, links, and images require a separate check.
- If a flagship story’s title changes, update the card manually.
- If a story is removed, moved, or no longer suitable as a flagship, choose its replacement before removing the old card.
- Do not use weak imagery merely to fill the carousel. Prefer clear, story-rich images that remain understandable at small sizes.

## 5. Common changes

### Changing only a story title

1. Change the title in the story’s `page.md`.
2. Synchronize `zh.md` and `en.md`.
3. Run `sync_culture_index_titles.mjs`.
4. If the story is a flagship, update its carousel title manually.
5. Verify the title in both the root and standalone Culture directories.

### Adding a story

1. Complete the fast story landing workflow first.
2. Add the story link to the correct category section.
3. Update the root-page category count.
4. Run the title-sync script to keep both directories aligned.
5. Add a flagship card only when the story is explicitly selected for the home-page carousel.

### Moving a story to another category

1. Move the story directory, frontmatter, back link, and generated path first.
2. Remove its link from the old category section.
3. Add it to the new category section.
4. Update both category counts.
5. Rebuild the story and synchronize directory titles.
6. Check that no catalog or flagship entry still uses the old path.

### Deleting a story

1. Confirm the exact deletion scope requested by the user.
2. Remove the link from the category list.
3. Update the category count.
4. If it is a flagship, replace its card and dot first.
5. Verify that no catalog link remains.
6. Follow the separate deletion confirmation and verification process before removing source or generated files.

### Reordering categories

1. Change `cultureStoryRanking`.
2. Keep category IDs unchanged.
3. Rebuild `app.js`.
4. Confirm in the browser that cards, sections, and sticky navigation use the same order.

## 6. Build order

Build article content and images through the [Fast Story Landing Workflow](./story_landing_workflow.md) first.

After landing-page changes:

```sh
node scripts/sync_culture_index_titles.mjs
```

If `src/core/navigation-runtime.js` or `src/core/story-highlights.js` changed:

```sh
npm run build
```

If stories or references changed:

```sh
node scripts/build_sources_research.mjs
```

After all changes are finished, run once:

```sh
npm run check
```

Do not hand-edit the generated `app.js`.

## 7. Targeted checks

Open the local page at:

```text
http://127.0.0.1:<port>/index.html?view=culture
```

Check at desktop and phone widths:

- the Culture view opens without a duplicate hero;
- the flagship carousel contains six cards and six dots;
- every flagship image, title, and link is correct;
- category cards follow `cultureStoryRanking`;
- category sections follow the same order as the cards;
- Folk Tales is first and Philosophy is last;
- every category count matches its actual story count;
- every story title matches its `page.md`;
- every category card scrolls to the correct section;
- sticky navigation appears, scrolls, and updates its active state correctly;
- the last category becomes active at the bottom of the page; and
- there is no horizontal overflow or broken phone-width title/navigation layout.

## 8. Completion report

Report only:

- which categories, story lists, or flagship stories changed;
- whether titles and counts are synchronized;
- whether the root Culture view and standalone Culture directory agree;
- desktop and phone inspection results;
- build and test results; and
- whether anything was committed or pushed.

Do not commit or push unless the user explicitly requests it.
