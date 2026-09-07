import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const indexPaths = [
  path.join(projectRoot, "culture", "index.html"),
  path.join(projectRoot, "index.html")
];
const contentRoot = path.join(projectRoot, "culture", "content");

function readPageTitles(category, slug) {
  const pagePath = path.join(contentRoot, category, slug, "page.md");
  const source = fs.readFileSync(pagePath, "utf8");
  const titleZh = source.match(/^title_zh:\s*(.+)$/m)?.[1]?.replace(/^"|"$/g, "");
  const titleEn = source.match(/^title_en:\s*(.+)$/m)?.[1]?.replace(/^"|"$/g, "");

  if (!titleZh || !titleEn) {
    throw new Error(`Missing title in ${pagePath}`);
  }

  return { titleZh, titleEn };
}

for (const indexPath of indexPaths) {
  const indexSource = fs.readFileSync(indexPath, "utf8");
  let synced = indexSource.replace(
    /(<a href="(?:\.\/books|culture\/books)\/([^/]+)\/([^/]+)\/index\.html">\s*<span class="zh">)([^<]+)(<\/span>\s*<span class="en">)([^<]+)(<\/span>\s*<\/a>)/g,
    (_, prefix, category, slug, _oldZh, middle, _oldEn, suffix) => {
      const { titleZh, titleEn } = readPageTitles(category, slug);
      return `${prefix}${titleZh}${middle}${titleEn}${suffix}`;
    }
  );

  if (indexPath.endsWith(path.join("culture", "index.html"))) {
    const sectionCounts = new Map();
    for (const match of synced.matchAll(/<section class="section(?: with-books)?" id="([^"]+)"[\s\S]*?<ul class="topic-grid">([\s\S]*?)<\/ul>/g)) {
      const category = match[1];
      const count = (match[2].match(/<li class="topic done">/g) || []).length;
      sectionCounts.set(category, count);
    }

    synced = synced.replace(
      /<a href="#([^"]+)" class="cat-card[^>]*>[\s\S]*?<\/a>/g,
      (cardHtml, category) => {
        const count = sectionCounts.get(category);
        if (count == null) return cardHtml;
        if (cardHtml.includes('<span class="book-count">')) {
          return cardHtml.replace(
            /<span class="book-count">\d+ books<\/span>/,
            `<span class="book-count">${count} books</span>`
          );
        }
        return cardHtml.replace("</a>", `\n          <span class="book-count">${count} books</span>\n        </a>`);
      }
    );
  }

  const relative = path.relative(projectRoot, indexPath);
  if (synced !== indexSource) {
    fs.writeFileSync(indexPath, synced);
    console.log(`Updated ${relative} titles and book counts`);
  } else {
    console.log(`${relative} is already synced`);
  }
}
