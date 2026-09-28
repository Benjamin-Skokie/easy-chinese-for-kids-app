import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { posix } from "node:path";
import test from "node:test";
import { collectProjectStats } from "../scripts/build_project_stats.mjs";
import { auditImageBudgets, imageBudgetFor, ordinaryImageBudget } from "../scripts/check_image_budgets.mjs";
import { buildSitemapUrls, renderSitemapXml } from "../scripts/build_sitemap.mjs";
import { creatures } from "../culture/books/literature/shan-hai-jing/map/creatures.js";

const snapshot = collectProjectStats();

test("all referenced images meet the strict 120,000-byte limit except the full map", async () => {
  const { oversized, images } = await auditImageBudgets();
  assert.equal(ordinaryImageBudget, 120_000);
  assert.equal(imageBudgetFor("culture/books/literature/shan-hai-jing/map/assets/map-world-preview.webp"), 120_000);
  assert.equal(imageBudgetFor("culture/books/literature/shan-hai-jing/map/assets/nine-tailed-fox.webp"), 120_000);
  assert.deepEqual(oversized, []);
  assert.equal(images.filter(({ budget }) => budget > ordinaryImageBudget).length, 1);
  assert.ok(!images.some(({ file }) => file.startsWith("culture/content/religion/lord-guan/")));
  const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts;
  assert.ok(scripts.build.includes("scripts/check_image_budgets.mjs"));
});

test("project snapshot and catalog counts match the current content", async () => {
  const stats = await snapshot;
  const html = readFileSync("about/author-project/index.html", "utf8");
  for (const [label, count] of [
    ["learning topics", stats.learningTopics.toLocaleString("en-US")],
    ["textbook lessons aligned", stats.textbookLessons.toLocaleString("en-US")],
    ["culture stories", stats.cultureStories.toLocaleString("en-US")],
    ["referenced visual assets", stats.visualAssetsDisplay],
    ["recorded audio clips", stats.recordedAudioClips.toLocaleString("en-US")]
  ]) assert.ok(html.includes(`<strong>${count}</strong><span>${label}</span>`), label);
  assert.ok(readFileSync("culture.html", "utf8").includes(`data-total-stories>${stats.cultureStories}</strong>`));
  assert.ok(readFileSync("about/sources-research/index.html", "utf8").includes(`>${stats.cultureStories} stories</p>`));
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assert.ok(packageJson.scripts.build.includes("scripts/build_project_stats.mjs"));
});

test("visual inventory includes current map art but not unused backups", async () => {
  const stats = await snapshot;
  const paths = new Set(stats.imagePaths);
  for (const creature of creatures) {
    assert.ok(paths.has(posix.join("culture/books/literature/shan-hai-jing/map", creature.image)), creature.id);
  }
  assert.ok(paths.has("culture/books/culture/four-symbols/images/2-four-symbols-night-sky.webp"));
  assert.ok(paths.has("culture/books/culture/four-symbols/images/3-four-symbols-wadang.webp"));
  assert.ok(![...paths].some((path) => /before-shirt-cleanup|clean-shirt|_png-archive/.test(path)));
  assert.ok(!paths.has("culture/content/culture/four-symbols/images/2-four-symbols-night-sky.webp"));
  assert.equal(Number.parseInt(stats.visualAssetsDisplay), Math.floor(stats.visualAssets / 10) * 10);
});

test("retired map drafts are removed while the current map and preview remain", () => {
  const assets = "culture/books/literature/shan-hai-jing/map/assets";
  for (const name of ["map-northern.webp", "map-other.webp", "map-southern.webp", "map-western.webp", "shan-hai-map-base.webp"]) {
    assert.ok(!existsSync(posix.join(assets, name)), `Retired map draft remains: ${name}`);
  }
  for (const name of ["map-world.webp", "map-world-preview.webp"]) {
    assert.ok(existsSync(posix.join(assets, name)), `Current map asset is missing: ${name}`);
  }
});

test("sitemap includes the Four Symbols story and the separate creature map", async () => {
  const urls = await buildSitemapUrls();
  const stats = await snapshot;
  assert.equal(readFileSync("sitemap.xml", "utf8"), renderSitemapXml(urls));
  assert.equal(urls.length, stats.sitemapUrls);
  assert.ok(urls.includes("https://nihaoworld.org/culture/books/culture/four-symbols/"));
  assert.ok(urls.includes("https://nihaoworld.org/culture/books/literature/shan-hai-jing/map/"));
  assert.equal(new Set(urls).size, urls.length);
});
