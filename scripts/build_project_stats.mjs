import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { books } from "../src/data/curriculum.js";
import { topicData } from "../src/data/topic-registry.js";
import { recordedLearnAudioIds } from "../src/data/learn-recorded-audio.js";
import { pinyinAudioBase, pinyinAudioClips } from "../src/features/foundations/pinyin-audio-manifest.js";
import { timeDateClockItems } from "../src/features/time-daily-life/time.js";
import { timeDateMonthItems } from "../src/features/time-daily-life/dates.js";
import { buildSitemapUrls } from "./build_sitemap.mjs";
import { loadCultureCatalogLocations } from "./culture_catalog_locations.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imageExtension = /\.(?:webp|png|jpe?g|svg|gif|avif)$/i;

// Follow deployed pages and their local dependencies, not image directories.
// This excludes unreferenced drafts, superseded art, and manuscript copies.
export async function collectProjectStats() {
  const urls = await buildSitemapUrls(root);
  const stories = await loadCultureCatalogLocations(root);
  const bundle = await build({
    absWorkingDir: root, entryPoints: ["src/main.js"], bundle: true,
    write: false, metafile: true, platform: "browser", logLevel: "silent"
  });
  const sourceFiles = Object.keys(bundle.metafile.inputs);
  const pending = urls.map((url) => {
    const pathname = new URL(url).pathname.slice(1);
    return !pathname || pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  });
  pending.push("lesson.html", ...sourceFiles);
  const scanned = new Set();
  const images = new Set();

  function scan(text, from) {
    // Resolve table-driven filenames only within their original module, not
    // against every image prefix in the combined application bundle.
    const prefixes = from.startsWith("src/")
      ? [...text.matchAll(/["'`](assets\/[\w/-]+\/)\$\{/g)].map((match) => match[1]) : [];
    const references = /(?:["'`(\s])((?:\.{1,2}\/|\/)?[\w./-]+\.(?:webp|png|jpe?g|svg|gif|avif|css|js|html))(?:[?#][^"'`\s<>)]*)?(?=["'`\s<>)])/g;
    for (const match of text.matchAll(references)) {
      const ref = match[1];
      const file = normalize(ref.startsWith("/") ? ref.slice(1)
        : from.startsWith("src/") && ref.startsWith("assets/") ? ref
        : join(dirname(from), ref));
      const candidates = [file];
      if (!ref.includes("/")) candidates.push(...prefixes.map((prefix) => prefix + ref));
      for (const candidate of candidates) {
        if (candidate.startsWith("../") || !existsSync(join(root, candidate))) continue;
        if (imageExtension.test(candidate)) images.add(candidate);
        else if (candidate !== "app.js" && !scanned.has(candidate)) pending.push(candidate);
      }
    }
  }

  // These two collections build filenames from numbers/month names at runtime.
  scan(JSON.stringify({ timeDateClockItems, timeDateMonthItems }), "index.html");
  while (pending.length) {
    const file = pending.pop();
    if (scanned.has(file) || file === "app.js") continue;
    scanned.add(file);
    scan(readFileSync(join(root, file), "utf8"), file);
  }
  const uniqueImages = new Map();
  for (const file of [...images].sort()) {
    const hash = createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
    if (!uniqueImages.has(hash)) uniqueImages.set(hash, file);
  }
  const audioFiles = new Set([
    ...[...recordedLearnAudioIds].map((id) => `assets/audio/learn/${id}.mp3`),
    ...pinyinAudioClips.map((clip) => `${pinyinAudioBase}/${clip.file}`)
  ]);
  for (const file of audioFiles) {
    if (!existsSync(join(root, file))) throw new Error(`Missing recorded clip: ${file}`);
  }
  return {
    learningTopics: Object.keys(topicData).length,
    textbookLessons: books.reduce((sum, book) => sum + book.lessons.length, 0),
    cultureStories: stories.size,
    sitemapUrls: urls.length,
    // A conservative lower bound: inline SVG and unresolved dynamic assets
    // are not counted. Different resolutions remain separate asset files.
    visualAssets: uniqueImages.size,
    visualAssetsDisplay: `${Math.floor(uniqueImages.size / 10) * 10}+`,
    recordedAudioClips: audioFiles.size,
    imagePaths: [...uniqueImages.values()],
    allImagePaths: [...images].sort(),
    scannedFiles: [...scanned].sort()
  };
}

export async function buildProjectStats() {
  const stats = await collectProjectStats();
  const format = (number) => number.toLocaleString("en-US");
  const replacements = [
    ["learning topics", format(stats.learningTopics)],
    ["textbook lessons aligned", format(stats.textbookLessons)],
    ["culture stories", format(stats.cultureStories)],
    ["referenced visual assets", stats.visualAssetsDisplay],
    ["recorded audio clips", format(stats.recordedAudioClips)]
  ];
  const authorPath = join(root, "about/author-project/index.html");
  let author = readFileSync(authorPath, "utf8");
  for (const [label, count] of replacements) {
    const pattern = new RegExp(`<strong>[^<]+</strong><span>${label}</span>`, "g");
    if ([...author.matchAll(pattern)].length !== 1) throw new Error(`Missing or duplicate stat: ${label}`);
    author = author.replace(pattern, `<strong>${count}</strong><span>${label}</span>`);
  }
  writeFileSync(authorPath, author);
  for (const [file, pattern, replacement] of [
    ["culture.html", /(data-total-stories>)[\d,]+(<\/strong>)/, `$1${stats.cultureStories}$2`],
    ["about/sources-research/index.html", /(data-source-count aria-live="polite">)[\d,]+ stories(<\/p>)/, `$1${stats.cultureStories} stories$2`]
  ]) {
    const text = readFileSync(join(root, file), "utf8");
    if (!pattern.test(text)) throw new Error(`Missing story count: ${file}`);
    writeFileSync(join(root, file), text.replace(pattern, replacement));
  }
  return stats;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const stats = await buildProjectStats();
  const { imagePaths, allImagePaths, scannedFiles, ...counts } = stats;
  console.log(JSON.stringify(counts, null, 2));
}
