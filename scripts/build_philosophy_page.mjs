import fs from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import {
  createGlossaryFormatter,
  escapeHtml,
  glossaryScriptHtml,
  loadCultureGlossary
} from "./culture_glossary.mjs";

let formatGlossaryTerms = (text) => text;

function normalizeDisplayDashes(value) {
  return value
    .replace(/\s*[—–]+\s*/g, " - ")
    .replace(/\s*--+\s*/g, " - ");
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    throw new Error("Missing frontmatter");
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const separator = trimmed.indexOf(":");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^"|"$/g, "");
    data[key] = value;
  }

  return {
    data,
    body: markdown.slice(match[0].length)
  };
}

function parseField(block, name) {
  const pattern = new RegExp(`^${name}:\\s*(.+)$`, "m");
  const match = block.match(pattern);
  return match ? normalizeDisplayDashes(match[1].trim()) : "";
}

function parseTaggedBlock(block, tagName) {
  const pattern = new RegExp(`\\[${tagName}\\]\\n([\\s\\S]*?)\\n\\[\\/${tagName}\\]`);
  const match = block.match(pattern);
  return match ? normalizeDisplayDashes(match[1].trim()) : "";
}

function parseBlocks(body) {
  const blocks = [];
  const pattern = /\[(hero|section|ending)\]\n([\s\S]*?)\n\[\/\1\]/g;
  let match;
  while ((match = pattern.exec(body))) {
    blocks.push({ type: match[1], raw: match[2].trim() });
  }
  return blocks;
}

function formatInline(text) {
  const escapedText = escapeHtml(text)
    .replace(/`([^`]+)`/g, (_match, code) => `<code>${code}</code>`)
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return formatGlossaryTerms(escapedText);
}

function renderTextBlock(text, langClass = "") {
  const parts = text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts
    .map((part) => {
      if (part.startsWith("### ")) {
        const languageClass = langClass ? ` ${langClass}` : "";
        return `<p class="subhead${languageClass}">${formatInline(part.slice(4))}</p>`;
      }
      return `<p>${formatInline(part)}</p>`;
    })
    .join("\n          ");
}

function countParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function shouldUseTextWrap(layout, zh, en, hasImage) {
  if (!hasImage || !layout.startsWith("two-column")) {
    return false;
  }

  const paragraphCount = countParagraphs(zh) + countParagraphs(en);
  const textLength = zh.replace(/\s/g, "").length + en.replace(/\s/g, "").length;

  return paragraphCount >= 6 || textLength >= 850;
}

function renderSection(block, availableImages = new Set()) {
  const layout = parseField(block.raw, "layout");
  const page = parseField(block.raw, "page");
  const headingZh = parseField(block.raw, "heading_zh");
  const headingEn = parseField(block.raw, "heading_en");
  const image = parseField(block.raw, "image");
  const captionZh = parseField(block.raw, "caption_zh");
  const captionEn = parseField(block.raw, "caption_en");
  const zh = parseTaggedBlock(block.raw, "zh");
  const en = parseTaggedBlock(block.raw, "en");
  const hasImage = Boolean(image) && availableImages.has(image);
  const imageSrc = hasImage ? `./images/${image}` : "";
  const resolvedLayout = shouldUseTextWrap(layout, zh, en, hasImage) ? "text-wrap-image" : layout;

  if (resolvedLayout === "text-only" || !hasImage) {
    return `      <section class="page story text-only">
        <div class="story-copy">
          <p class="page-label">Page ${escapeHtml(page)}</p>
          <h3>${formatInline(headingZh)}</h3>
          <h4>${formatInline(headingEn)}</h4>
          <div class="zh">
            ${renderTextBlock(zh, "zh")}
          </div>
          <div class="en">
            ${renderTextBlock(en, "en")}
          </div>
        </div>
      </section>`;
  }

  if (resolvedLayout === "text-wrap-image") {
    return `      <section class="page story two-column text-wrap-image">
        <div class="story-copy">
          <p class="page-label">Page ${escapeHtml(page)}</p>
          <h3>${formatInline(headingZh)}</h3>
          <h4>${formatInline(headingEn)}</h4>
          <figure class="floated-figure">
            <img src="${escapeHtml(imageSrc)}" alt="" class="floated-image" />
            <figcaption class="caption floated-caption"><span class="zh">${formatInline(captionZh)}</span><br><span class="en">${formatInline(captionEn)}</span></figcaption>
          </figure>
          ${renderTextBlock(zh, "zh")}
          ${renderTextBlock(en, "en")}
        </div>
      </section>`;
  }

  return `      <section class="page story ${escapeHtml(resolvedLayout)}">
        <div class="story-copy">
          <p class="page-label">Page ${escapeHtml(page)}</p>
          <h3>${formatInline(headingZh)}</h3>
          <h4>${formatInline(headingEn)}</h4>
          <div class="zh">
            ${renderTextBlock(zh, "zh")}
          </div>
          <div class="en">
            ${renderTextBlock(en, "en")}
          </div>
        </div>
        <div class="story-art">
          <img src="${escapeHtml(imageSrc)}" alt="" />
          <p class="caption"><span class="zh">${formatInline(captionZh)}</span><br><span class="en">${formatInline(captionEn)}</span></p>
        </div>
      </section>`;
}

function formatDifficulty(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const levels = {
    easy: { zh: "简单", en: "Easy" },
    "简单": { zh: "简单", en: "Easy" },
    medium: { zh: "中等", en: "Medium" },
    "中等": { zh: "中等", en: "Medium" },
    hard: { zh: "困难", en: "Hard" },
    "困难": { zh: "困难", en: "Hard" }
  };

  return levels[normalized] || { zh: value || "未标注", en: value || "Not rated" };
}

function buildBody(blocks, availableImages = new Set(), difficulty = "", readingLevels = []) {
  const output = [];
  const difficultyLabel = formatDifficulty(difficulty);

  for (const block of blocks) {
    if (block.type === "hero") {
      output.push(`      <section class="page hero">
        <div class="hero-copy">
          <h1>${formatInline(parseField(block.raw, "title_zh"))}</h1>
          <h2>${formatInline(parseField(block.raw, "title_en"))}</h2>
          ${readingLevels.length
            ? readingLevelQuickSwitcherHtml(readingLevels)
            : `<p class="difficulty-badge"><span class="zh">阅读难度 · ${escapeHtml(difficultyLabel.zh)}</span><span class="en">Reading level · ${escapeHtml(difficultyLabel.en)}</span></p>`}
        </div>
      </section>`);
      continue;
    }

    if (block.type === "section") {
      output.push(renderSection(block, availableImages));
      continue;
    }

    if (block.type === "ending") {
      output.push(`      <section class="page ending">
        <div class="ending-copy">
          <h3>${formatInline(parseField(block.raw, "heading_zh"))}</h3>
          <h4>${formatInline(parseField(block.raw, "heading_en"))}</h4>
          <div class="closing zh">
            ${renderTextBlock(parseTaggedBlock(block.raw, "zh"), "zh")}
          </div>
          <div class="closing en">
            ${renderTextBlock(parseTaggedBlock(block.raw, "en"), "en")}
          </div>
        </div>
      </section>`);
    }
  }

  return output.join("\n\n");
}

function readingLevelQuickSwitcherHtml(levels) {
  const labels = { early: "Easy", story: "Medium", advanced: "Advanced" };
  const buttons = levels
    .map((level) => `          <button type="button" data-reading-level-button="${level}" aria-pressed="false">${labels[level]}</button>`)
    .join("\n");

  return `<div class="reading-level-quick-switch" role="group" aria-label="Reading level">
        <div class="reading-level-quick-options">
${buttons}
        </div>
      </div>`;
}

const readingLevelScriptHtml = `  <script>
    (() => {
      const storageKey = "easyChineseCultureReadingLevel";
      const buttons = [...document.querySelectorAll("[data-reading-level-button]")];
      const versions = [...document.querySelectorAll("[data-reading-version]")];
      if (!versions.length) return;

      const supportedLevels = new Set(versions.map((version) => version.dataset.readingVersion));
      const defaultLevel = supportedLevels.has("story") ? "story" : versions[0].dataset.readingVersion;
      const requestedLevel = new URLSearchParams(window.location.search).get("reading") || "";

      const setLevel = (level) => {
        const nextLevel = supportedLevels.has(level) ? level : defaultLevel;
        document.documentElement.dataset.readingLevel = nextLevel;
        for (const version of versions) {
          version.hidden = version.dataset.readingVersion !== nextLevel;
        }
        for (const button of buttons) {
          button.setAttribute("aria-pressed", String(button.dataset.readingLevelButton === nextLevel));
        }
        const selectedTitle = versions.find((version) => version.dataset.readingVersion === nextLevel)
          ?.querySelector("h1")?.textContent?.trim();
        if (selectedTitle) document.title = selectedTitle;
      };

      for (const button of buttons) {
        button.addEventListener("click", () => {
          const level = button.dataset.readingLevelButton;
          setLevel(level);
          try {
            window.localStorage.setItem(storageKey, level);
          } catch {}
          const url = new URL(window.location.href);
          url.searchParams.set("reading", level);
          window.history.replaceState(null, "", url);
        });
      }

      const initialLevel = supportedLevels.has(requestedLevel) ? requestedLevel : defaultLevel;
      setLevel(initialLevel);
      if (supportedLevels.has(requestedLevel)) {
        try {
          window.localStorage.setItem(storageKey, requestedLevel);
        } catch {}
      }
    })();
  </script>`;

export async function buildPhilosophyPage({ category = "philosophy", slug, target }) {
  const root = process.cwd();
  const pagePath = path.join(root, "culture/content", category, slug, "page.md");
  const earlyPagePath = path.join(root, "culture/content", category, slug, "page.early.md");
  const storyPagePath = path.join(root, "culture/content", category, slug, "page.story.md");
  const templatePath = path.join(root, "culture/shared/template.html");
  const sharedStylesPath = path.join(root, "culture/shared/styles.css");
  const sourceImagesDir = path.join(root, "culture/content", category, slug, "images");
  const outputDir = path.join(root, "culture", target, category, slug);
  const outputPath = path.join(outputDir, "index.html");
  const outputStylesPath = path.join(outputDir, "styles.css");
  const outputImagesDir = path.join(outputDir, "images");

  const markdown = await fs.readFile(pagePath, "utf8");
  const template = await fs.readFile(templatePath, "utf8");
  const sharedStyles = await fs.readFile(sharedStylesPath, "utf8");
  const glossary = await loadCultureGlossary(root);
  formatGlossaryTerms = createGlossaryFormatter(glossary);
  const { data: frontmatter, body } = parseFrontmatter(markdown);
  const blocks = parseBlocks(body);
  const readOptional = async (filePath) => {
    try {
      return await fs.readFile(filePath, "utf8");
    } catch (error) {
      if (!error || error.code !== "ENOENT") throw error;
      return "";
    }
  };
  const earlyMarkdown = await readOptional(earlyPagePath);
  const storyMarkdown = await readOptional(storyPagePath);
  let sourceFiles = [];
  try {
    sourceFiles = await fs.readdir(sourceImagesDir);
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }
  const availableImages = new Set(sourceFiles);
  const advancedBody = buildBody(blocks, availableImages, frontmatter.difficulty);
  let builtBody = advancedBody;
  let pageScripts = glossaryScriptHtml;
  let documentTitle = frontmatter.title_zh;

  if (earlyMarkdown || storyMarkdown) {
    const variants = [];
    if (earlyMarkdown) {
      const { data, body: variantBody } = parseFrontmatter(earlyMarkdown);
      variants.push({ level: "early", frontmatter: data, blocks: parseBlocks(variantBody) });
    }
    if (storyMarkdown) {
      const { data, body: variantBody } = parseFrontmatter(storyMarkdown);
      variants.push({ level: "story", frontmatter: data, blocks: parseBlocks(variantBody) });
    }
    variants.push({ level: "advanced", frontmatter, blocks });
    documentTitle = variants[0].frontmatter.title_zh;
    const variantLevels = variants.map((variant) => variant.level);
    const variantBodies = variants
      .map((variant, index) => `      <div class="reading-version" data-reading-version="${variant.level}"${index ? " hidden" : ""}>\n${buildBody(variant.blocks, availableImages, variant.frontmatter.difficulty, variantLevels)}\n      </div>`)
      .join("\n");
    builtBody = variantBodies;
    pageScripts = `${glossaryScriptHtml}\n${readingLevelScriptHtml}`;
  }

  const html = template
    .replace("{{TITLE}}", documentTitle)
    .replace("{{STYLESHEET_HREF}}", "./styles.css")
    .replace("{{BACK_HREF}}", `../../../../index.html?view=culture#culture-${category}`)
    .replace("{{BODY}}", builtBody)
    .replace("</body>", `${pageScripts}\n  </body>`);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
  await fs.writeFile(outputStylesPath, sharedStyles, "utf8");

  if (sourceFiles.length) {
    await fs.mkdir(outputImagesDir, { recursive: true });
    for (const file of sourceFiles) {
      try {
        await fs.copyFile(
          path.join(sourceImagesDir, file),
          path.join(outputImagesDir, file),
          fsConstants.COPYFILE_EXCL
        );
      } catch (error) {
        if (!error || error.code !== "EEXIST") throw error;
      }
    }
  }
}

const isEntrypoint = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isEntrypoint) {
  const slug = process.argv[2];
  const target = process.argv[3];

  if (!slug || !target || !["books", "experiments"].includes(target)) {
    throw new Error("Usage: node scripts/build_philosophy_page.mjs <slug> <books|experiments>");
  }

  await buildPhilosophyPage({ slug, target });
}
