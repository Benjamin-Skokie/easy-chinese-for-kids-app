# Culture Story 快速落地流程 / Fast Story Landing Workflow

Last updated: 2026-09-06

这份文档适用于用户已经提供完整中英文稿件、references 和现成图片，需要把文章快速更新到 Culture 网站的情况。

This workflow applies when the user has already supplied a complete bilingual manuscript, references, and finished images that need to be added to the Culture website.

---

# 中文流程

## 一、适用范围

使用这套流程时，用户提供的中英文稿就是最终底稿。

- 不重新构思故事。
- 不改变标题、语言风格、语气或叙事顺序。
- 只处理明显的多余换行、Markdown 格式问题和必要的段落衔接。
- 不先研究旧文章；旧内容只用于确认目录、页面结构、现有图片和 caption。
- 不读取或恢复已经淘汰的 V0–V3、多难度版本或其他旧稿。
- 一篇一篇完成，不把多篇文章混在一次未验证的大改动里。

如果用户只提供主题或资料、要求重新写作，应该使用 [Culture Story 研究与改写流程](./story_research_and_rewrite_workflow.md)，而不是这套快速流程。

正常单篇文章的目标完成时间是 5–10 分钟。

## 二、确认文章目录和唯一底稿

文章源目录为：

```text
culture/content/<category>/<slug>/
  page.md
  zh.md
  en.md
  references.md
  images/
```

生成后的网页目录为：

```text
culture/books/<category>/<slug>/
```

规则：

- `page.md` 是唯一网站底稿，也是唯一应该手工更新的正文文件。
- `zh.md` 和 `en.md` 从 `page.md` 自动同步生成。
- `references.md` 保存编辑资料，不在故事页面中显示。
- 不手工编辑生成目录中的 `index.html`、`styles.css` 或图片副本。

## 三、一次性替换正文

1. 找到对应的故事目录。
2. 把用户的新稿一次性写入 `page.md`。
3. 保留原稿标题、小标题、信息顺序和结尾。
4. 清理一句一行、依靠断行制造节奏的 fragmented text。
5. 按完整意思组织自然段，中英文段落尽量对应。

段落和图片的关系：

- 普通文章通常每节保留 2–4 个自然段，但不机械凑数。
- 短成语故事不需要拆成许多小节。
- 短故事只有一张图时，正文通常可以组织成一个完整段落。
- 有两张图时，通常按两个完整故事画面分成两段。
- 只有一节时，不重复显示一个与文章主标题相同的子标题，直接进入正文。

完成 `page.md` 后立即同步：

```sh
node scripts/sync_culture_manuscripts.mjs culture/content/<category>/<slug>
```

不要分别手工维护三份稿件。

## 四、统一处理中文术语和 tooltip

人物、朝代、地名、书名、制度、器物或其他陌生中文概念，应遵守同一规则：

- tooltip 只放在每篇文章、每种语言中第一次有帮助的出现位置。
- 后续重复出现时保持普通文字，不重复添加 tooltip。
- 使用 `culture/content/terminology.json` 中的统一术语记录。
- 中文版本直接使用汉字；英文中的中文名称和术语统一使用带声调汉语拼音，不再在括号中重复添加汉字。
- tooltip 在正文第一次有效出现时提供中文、带声调拼音和简短解释，但不能代替英文正文中正确的带声调拼音。
- 不给普通英语词、上下文已经解释清楚的词或纯装饰性词语添加 tooltip。

术语发生变化后运行：

```sh
node scripts/audit_culture_terminology.mjs
```

## 五、直接更新 references

用户给了哪些 references，就优先使用哪些。

- 已经给出链接时直接使用，不重新寻找替代资料。
- 只有缺少链接或关键出处无法确认时，才快速查找原典、博物馆、图书馆、大学、政府、出版机构或其他可靠页面。
- 只确认与正文直接相关的关键事实。
- 不自动扩展成深度研究，也不为一般性描述堆积论文。
- 学术争议、版本差异和不能确定的内容写进 `Editorial boundary`，不要自动加入儿童正文。
- 每篇 Culture 文章都必须有 `references.md`，即使正文主要依据一部原典。

每条来源统一使用：

```markdown
## <来源或事实组>

Source: <来源名称>
URL: <直接链接>
Accessed: YYYY-MM-DD

Supports:

- <这条来源具体支持的正文事实>

Editorial boundary:

- <可以安全写到什么程度>
- <哪些内容属于传说、改编、推断或不应写入正文>
```

文件开头必须说明：

```text
This file is for editorial research and does not render on the website.
```

## 六、快速检查图片

每张图片只检查以下事项：

1. 是否对应所在小节或故事画面；
2. 是否存在明显历史、人物身份、器物结构或动作错误；
3. caption 是否具体描述画面；
4. 是否为 4:3 WebP，并低于 120 KB；
5. 是否没有水印、烘焙文字、脏污、严重模糊或明显生成瑕疵。

处理规则：

- 图片合适：保留，不重新生成。
- 只有 caption 不合适：只改 caption。
- caption 直接描述读者看见的画面，不写“现代绘制”“现代综合想象图”或“供孩子观察”等后台说明。
- 图片明显错误：先完成文字落地，再把具体问题告诉用户并确认新图方向。
- 未经用户确认，不自行生成新图。
- 不为了“可能更漂亮”而替换已经合格的图片。
- 人物、服装和标志性器物跨图片必须保持一致。

最终图片必须同时存在于源目录和网站目录，并确认生成目录中的副本确实是当前版本：

```text
culture/content/<category>/<slug>/images/
culture/books/<category>/<slug>/images/
```

## 七、统一生成页面

正文、references、tooltip 和图片全部完成后，再统一生成一次。

1. 运行对应分类的构建脚本：

```sh
node scripts/build_<category>_all.mjs
```

例如：

```sh
node scripts/build_literature_all.mjs
node scripts/build_folk_tales_all.mjs
node scripts/build_philosophy_all.mjs
```

2. 标题发生变化时，才同步目录卡片：

```sh
node scripts/sync_culture_index_titles.mjs
```

3. 文章被加入或移出首页精选时，才更新 flagship story。
4. 最后重新生成 Sources & Research：

```sh
node scripts/build_sources_research.mjs
```

不要在每次小修改后重新生成整个网站。

## 八、先做针对性检查

检查当前文章：

- `page.md`、`zh.md`、`en.md` 是否同步；
- 中英文标题、小标题、段落和结尾是否完整；
- 是否仍有一句一行的 fragmented text；
- 单节文章是否重复显示主标题和同名子标题；
- tooltip 是否只出现在每种语言第一次有效出现的位置；
- 图片路径、caption、格式、比例和大小是否正确；
- 源图片与网站目录中的图片是否为同一版本；
- `references.md` 是否包含直接 URL、Accessed、Supports 和 Editorial boundary；
- 生成的 `index.html` 是否包含新标题和新正文；
- 目录卡片和 flagship story 是否只在需要时发生变化。

运行文章和术语检查：

```sh
node scripts/audit_culture_rewrite.mjs culture/content/<category>/<slug>
node scripts/audit_culture_terminology.mjs
```

然后在本地网页上查看桌面和手机宽度，重点检查标题换行、段落、图片、caption、tooltip 位置和横向溢出。

## 九、最后只运行一次全站测试

所有内容和页面都完成后运行：

```sh
npm run check
```

这一次检查包含路径、数据、构建、测试、JavaScript 语法、图片预算和 Git diff 格式。

- 中间不反复运行全站测试。
- 只替换图片时，可以先运行相关图片和页面检查。
- 修改正文、目录、tooltip 数据或构建逻辑时，最后运行一次完整检查。
- 如果完整检查失败，只修复真实错误，再重新运行验证。

## 十、完成报告

最终报告保持简短，只说明：

- 故事是否已经写入；
- `page.md`、`zh.md`、`en.md` 是否同步；
- fragmented text 是否处理；
- references 是否更新；
- tooltip 是否更新；
- 图片是保留、移除还是替换，以及最终尺寸和文件大小；
- 页面、目录、flagship 和 Sources & Research 是否重新生成；
- 针对性检查和全站测试结果；
- 是否 commit 或 push。

除非用户明确要求，否则不 commit、不 push。

## 十一、时间和停止规则

标准文章目标：5–10 分钟。

只有以下情况可以超过十分钟：

- 用户确认需要生成或重做图片；
- 关键 reference 没有链接，而且无法快速确认；
- 中英文稿内容互相冲突；
- 网站构建或测试出现真实错误；
- 需要改变目录结构、构建逻辑或全站术语规则。

遇到这些情况，应立即告诉用户具体卡在哪里，不在后台默默研究很久。

标准快速落地任务中不做：

- 不重新写故事；
- 不扩大研究范围；
- 不寻找大量替代来源；
- 不重做合格图片；
- 不修改无关文章；
- 不反复生成和测试；
- 不主动 commit 或 push。

---

# English Workflow

## 1. When to use this workflow

Use this workflow when the bilingual manuscript supplied by the user is the final source copy.

- Do not reconceive or rewrite the story.
- Do not change its titles, voice, tone, or narrative order.
- Fix only unnecessary line breaks, Markdown problems, and essential paragraph transitions.
- Do not research the old article first. Inspect it only to locate the directory, understand the page structure, and review existing images and captions.
- Do not read or restore retired V0–V3 drafts, reading-level variants, or other obsolete manuscripts.
- Finish and verify one story at a time.

If the user has supplied only a topic or research material and wants a new story written, use the [Culture Story Research and Rewrite Workflow](./story_research_and_rewrite_workflow.md) instead.

The normal target time for one article is 5–10 minutes.

## 2. Confirm the story directory and canonical manuscript

The source directory is:

```text
culture/content/<category>/<slug>/
  page.md
  zh.md
  en.md
  references.md
  images/
```

The generated page lives under:

```text
culture/books/<category>/<slug>/
```

Rules:

- `page.md` is the canonical website manuscript and the only story file edited by hand.
- `zh.md` and `en.md` are generated from `page.md`.
- `references.md` holds editorial research and does not render on the story page.
- Never hand-edit generated `index.html`, `styles.css`, or copied images.

## 3. Replace the manuscript once

1. Locate the story directory.
2. Put the supplied manuscript into `page.md` in one pass.
3. Preserve the supplied titles, section order, information sequence, and ending.
4. Remove fragmented one-sentence-per-line formatting.
5. Group sentences into complete natural paragraphs, keeping the Chinese and English structures reasonably aligned.

Paragraph and image rules:

- A normal section often has two to four natural paragraphs, but never add breaks merely to reach a number.
- A short idiom story does not need many sections.
- A short story with one image can normally use one complete body paragraph.
- With two images, divide the story into two complete visual beats.
- If an article has only one section, do not repeat a section heading identical to the main title. Begin with the body.

After editing `page.md`, immediately synchronize the standalone manuscripts:

```sh
node scripts/sync_culture_manuscripts.mjs culture/content/<category>/<slug>
```

Do not maintain all three manuscript files by hand.

## 4. Standardize Chinese terms and tooltips

Apply one rule to people, dynasties, places, books, institutions, objects, and other unfamiliar Chinese concepts:

- Add a tooltip only at the first useful occurrence in each language of each article.
- Leave later repetitions as ordinary text.
- Use the shared records in `culture/content/terminology.json`.
- The Chinese version uses Chinese characters directly. Chinese names and terms in English use tone-marked Hanyu Pinyin without repeating Chinese characters in parentheses.
- At the first useful body occurrence, the tooltip supplies Chinese, tone-marked pinyin, and a concise explanation; it does not replace correct tone-marked pinyin in the English prose.
- Do not add tooltips to ordinary English words, concepts already explained by context, or decorative terms.

After terminology changes, run:

```sh
node scripts/audit_culture_terminology.mjs
```

## 5. Replace references directly

Prefer the references supplied by the user.

- If a direct link is already supplied, use it instead of searching for a substitute.
- Search briefly only when a link is missing or a key source cannot be confirmed. Prefer primary texts, museums, libraries, universities, government sources, publishers, and other reliable institutions.
- Verify only the facts that directly support the manuscript.
- Do not turn routine landing work into deep research or collect papers for general statements.
- Keep scholarly disputes, textual variants, and uncertainty in `Editorial boundary`; do not automatically add them to the children’s story.
- Every Culture article must have a `references.md`, even when it primarily relies on one original text.

Use this format for every source:

```markdown
## <Source or claim group>

Source: <source name>
URL: <direct URL>
Accessed: YYYY-MM-DD

Supports:

- <specific article claim supported by the source>

Editorial boundary:

- <what the article may safely say>
- <what is legendary, adapted, inferred, or should remain outside the article>
```

The file must begin with this notice:

```text
This file is for editorial research and does not render on the website.
```

## 6. Review images quickly

Check only these points for every image:

1. It matches its section or visual story beat.
2. It has no obvious historical, identity, object-structure, or action error.
3. Its caption specifically describes the visible scene.
4. It is a 4:3 WebP below 120 KB.
5. It has no watermark, baked-in text, dirty artifacts, severe blur, or obvious generation defect.

Rules:

- Keep a suitable image. Do not regenerate it.
- If only the caption is wrong, change only the caption.
- Describe what the reader sees. Do not add boilerplate such as “modern illustration,” “modern composite reconstruction,” or “for children to observe.”
- If an image is clearly wrong, finish the text first, report the exact problem, and confirm the new direction with the user.
- Do not generate a new image without confirmation.
- Do not replace an accepted image merely because another image might be prettier.
- Keep recurring characters, clothing, and signature objects consistent across images.

The final image must exist in both the source and generated directories, and the generated copy must be confirmed as the current version:

```text
culture/content/<category>/<slug>/images/
culture/books/<category>/<slug>/images/
```

## 7. Build related pages once

After the manuscript, references, tooltips, and images are complete, generate everything once.

1. Run the category build:

```sh
node scripts/build_<category>_all.mjs
```

Examples:

```sh
node scripts/build_literature_all.mjs
node scripts/build_folk_tales_all.mjs
node scripts/build_philosophy_all.mjs
```

2. Synchronize catalog cards only when a title changed:

```sh
node scripts/sync_culture_index_titles.mjs
```

3. Update the flagship selection only when the article is being added to or removed from the featured stories.
4. Regenerate Sources & Research last:

```sh
node scripts/build_sources_research.mjs
```

Do not rebuild the whole site after every small edit.

## 8. Run targeted checks first

For the current article, confirm:

- `page.md`, `zh.md`, and `en.md` are synchronized.
- Both titles, all section headings, paragraphs, and endings are complete.
- No fragmented one-sentence-per-line text remains.
- A single-section article does not repeat the hero title as an identical section heading.
- Tooltips appear only at the first useful occurrence in each language.
- Image paths, captions, format, aspect ratio, and file size are correct.
- Source images and generated website images are the same version.
- `references.md` contains direct URLs, Accessed dates, Supports sections, and Editorial boundaries.
- The generated `index.html` contains the new title and body.
- Catalog cards and flagship stories changed only when required.

Run the article and terminology audits:

```sh
node scripts/audit_culture_rewrite.mjs culture/content/<category>/<slug>
node scripts/audit_culture_terminology.mjs
```

Then inspect the local page at desktop and phone widths. Check title wrapping, paragraphs, images, captions, tooltip placement, and horizontal overflow.

## 9. Run the full site check once

After all content and generated pages are finished, run:

```sh
npm run check
```

This covers paths, data validation, builds, tests, JavaScript syntax, image budgets, and Git diff formatting.

- Do not repeatedly run the full-site check during intermediate edits.
- For an image-only replacement, targeted image and page checks may be run first.
- When manuscripts, catalogs, terminology data, or build logic change, run one complete check at the end.
- If the complete check fails, fix the real error and rerun it for verification.

## 10. Completion report

Keep the final report short. State only:

- whether the story was written;
- whether `page.md`, `zh.md`, and `en.md` are synchronized;
- whether fragmented text was resolved;
- whether references were updated;
- whether tooltips were updated;
- whether images were kept, removed, or replaced, including final dimensions and file sizes;
- whether the story page, catalog, flagship stories, and Sources & Research were regenerated;
- the targeted-check and full-site-test results;
- whether anything was committed or pushed.

Do not commit or push unless the user explicitly asks.

## 11. Timing and stop rules

The target for a standard article is 5–10 minutes.

The task may take longer only when:

- the user confirms that images must be generated or remade;
- a key reference has no link and cannot be confirmed quickly;
- the Chinese and English manuscripts conflict;
- the build or tests reveal a real error; or
- the directory structure, build logic, or site-wide terminology rules must change.

Report the specific issue immediately instead of researching silently for a long time.

Do not do the following during a standard fast landing task:

- rewrite the story;
- expand the research scope;
- search for many substitute sources;
- remake acceptable images;
- change unrelated articles;
- repeatedly rebuild and test;
- commit or push without an explicit request.
