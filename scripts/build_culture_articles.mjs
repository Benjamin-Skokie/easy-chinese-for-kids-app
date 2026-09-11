import fs from "node:fs/promises";
import path from "node:path";
import {
  createGlossaryFormatter,
  escapeHtml,
  glossaryScriptHtml,
  loadCultureGlossary
} from "./culture_glossary.mjs";

const projectRoot = process.cwd();
const cultureRoot = path.join(projectRoot, "culture");
const manifestPath = path.join(cultureRoot, "content", "article-manifest.json");
const templateCssHref = "../article-template.css";
let formatGlossaryTerms = (text) => text;

function formatInlineMarkdown(text) {
  const escapedText = escapeHtml(text).replace(/`([^`]+)`/g, (_match, code) => `<code>${code}</code>`);
  return formatGlossaryTerms(escapedText);
}

function parseMarkdownSections(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let difficulty = "";
  let title = "";
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (line.startsWith("> 难度：")) {
      difficulty = line.replace("> 难度：", "").trim();
      continue;
    }

    if (line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }

    if (line === "---") {
      current = null;
      continue;
    }

    if (line.startsWith("## ")) {
      current = { heading: line.slice(3).trim(), paragraphs: [] };
      sections.push(current);
      continue;
    }

    if (!current) {
      current = { heading: "", paragraphs: [] };
      sections.push(current);
    }

    current.paragraphs.push(line);
  }

  return { difficulty, title, sections };
}

function pairSections(zhSections, enSections) {
  const count = Math.max(zhSections.length, enSections.length);
  const paired = [];

  for (let index = 0; index < count; index += 1) {
    paired.push({
      index: index + 1,
      zh: zhSections[index] ?? { heading: "", paragraphs: [] },
      en: enSections[index] ?? { heading: "", paragraphs: [] }
    });
  }

  return paired;
}

function renderParagraphs(paragraphs) {
  return paragraphs
    .map((paragraph) => `<p>${formatInlineMarkdown(paragraph)}</p>`)
    .join("\n");
}

function renderFigure(image) {
  const caption = [image.captionZh, image.captionEn].filter(Boolean).map(escapeHtml).join(" ");
  return `      <figure class="gallery-card">
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" />
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>`;
}

function renderArtBriefs(images) {
  const missingImages = images.filter((image) => !image.src && image.brief);
  if (!missingImages.length) {
    return "";
  }

  const items = missingImages
    .map((image, index) => `<li><strong>图 ${index + 1}：</strong>${escapeHtml(image.brief)}</li>`)
    .join("\n");

  return `    <section class="art-briefs">
      <h3>Pending Art Briefs</h3>
      <p class="zh">这些图片位还没有成品图，可以按下面的 brief 继续做图。目标格式：WebP，单张约 120 KB。</p>
      <p>These slots still need final art. Target format: WebP, around 120 KB each.</p>
      <ul>
${items}
      </ul>
    </section>`;
}

function renderSections(pairedSections, images) {
  const summary = pairedSections[pairedSections.length - 1];
  const storySections = pairedSections.slice(0, -1);
  const floatingImages = images.filter(
    (image) => image.slot !== "hero" && image.src && Number.isInteger(image.placementAfterSection)
  );
  const topImages = images.filter(
    (image) => image.slot !== "hero" && image.src && !Number.isInteger(image.placementAfterSection)
  );
  const storyParts = [];

  for (const section of storySections) {
    storyParts.push(`      <article class="section-card">
        <div class="section-head">
          <span class="section-number">${section.index.toString().padStart(2, "0")}</span>
          <div>
            ${section.zh.heading ? `<h3 class="zh">${formatInlineMarkdown(section.zh.heading)}</h3>` : ""}
            ${section.en.heading ? `<h4>${formatInlineMarkdown(section.en.heading)}</h4>` : ""}
          </div>
        </div>
        <div class="section-copy">
          <div class="language-block">
            <p class="language-label">Chinese</p>
            ${renderParagraphs(section.zh.paragraphs)}
          </div>
          <div class="language-block">
            <p class="language-label">English</p>
            ${renderParagraphs(section.en.paragraphs)}
          </div>
        </div>
      </article>`);

    for (const image of floatingImages.filter((entry) => entry.placementAfterSection === section.index)) {
      storyParts.push(`      <aside class="story-break">
${renderFigure(image)}
      </aside>`);
    }
  }

  return {
    topGalleryHtml: topImages.length
      ? `    <section class="image-grid">
${topImages.map((image) => renderFigure(image)).join("\n")}
    </section>`
      : "",
    storyHtml: storyParts.join("\n"),
    summaryHtml: summary
      ? `    <section class="summary">
      ${summary.zh.heading ? `<h3 class="zh">${formatInlineMarkdown(summary.zh.heading)}</h3>` : ""}
      ${summary.en.heading ? `<h4>${formatInlineMarkdown(summary.en.heading)}</h4>` : ""}
      <div class="summary-copy">
        ${renderParagraphs(summary.zh.paragraphs)}
        ${renderParagraphs(summary.en.paragraphs)}
      </div>
    </section>`
      : ""
  };
}

function buildArticleHtml(article, zhDoc, enDoc) {
  const pairedSections = pairSections(zhDoc.sections, enDoc.sections);
  const heroImage = article.images.find((image) => image.slot === "hero" && image.src);
  const { topGalleryHtml, storyHtml, summaryHtml } = renderSections(pairedSections, article.images);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png?v=20260910-white-teal-leaf-v1" />
    <title>${escapeHtml(article.titleEn)} | Discover Chinese Culture</title>
    <meta
      name="description"
      content="${escapeHtml(article.deckEn || article.summary?.en || article.titleEn)}"
    />
    <link rel="stylesheet" href="${templateCssHref}" />
  </head>
  <body>
    <main class="article-shell">
      <a class="back-link" href="../index.html#${escapeHtml(article.categoryEn.toLowerCase())}">← Back to Culture Library</a>

      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(article.categoryEn)} · <span class="zh">${escapeHtml(article.categoryZh)}</span></p>
          <h1 class="zh">${formatInlineMarkdown(article.titleZh || zhDoc.title)}</h1>
          <h2>${formatInlineMarkdown(article.titleEn || enDoc.title)}</h2>
          ${article.deckZh ? `<p class="hero-dek zh">${escapeHtml(article.deckZh)}</p>` : ""}
          ${article.deckEn ? `<p class="hero-dek">${escapeHtml(article.deckEn)}</p>` : ""}
          <div class="hero-meta">
            <span class="chip">Bilingual article</span>
            <span class="chip"><span class="zh">难度</span> ${escapeHtml(article.difficulty || zhDoc.difficulty || "未标注")}</span>
            <span class="chip">${article.images.length} image slot${article.images.length === 1 ? "" : "s"}</span>
          </div>
        </div>
        <div class="hero-art">
          ${
            heroImage
              ? `<figure class="hero-image">
            <img src="${escapeHtml(heroImage.src)}" alt="${escapeHtml(heroImage.alt)}" />
            ${
              heroImage.captionZh || heroImage.captionEn
                ? `<figcaption>${[heroImage.captionZh, heroImage.captionEn].filter(Boolean).map(escapeHtml).join(" ")}</figcaption>`
                : ""
            }
          </figure>`
              : ""
          }
        </div>
      </section>

${topGalleryHtml}

      <section class="story">
${storyHtml}
      </section>

${summaryHtml}

${renderArtBriefs(article.images)}
    </main>
${glossaryScriptHtml}
  </body>
</html>
`;
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const glossary = await loadCultureGlossary(projectRoot);

  for (const article of manifest.articles) {
    formatGlossaryTerms = createGlossaryFormatter(glossary);
    const zhPath = path.join(projectRoot, article.source.zh);
    const enPath = path.join(projectRoot, article.source.en);
    const [zhMarkdown, enMarkdown] = await Promise.all([
      fs.readFile(zhPath, "utf8"),
      fs.readFile(enPath, "utf8")
    ]);

    const zhDoc = parseMarkdownSections(zhMarkdown);
    const enDoc = parseMarkdownSections(enMarkdown);
    const html = buildArticleHtml(article, zhDoc, enDoc);
    const outputDir = path.join(cultureRoot, article.slug);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, "index.html"), html, "utf8");
  }
}

await main();
