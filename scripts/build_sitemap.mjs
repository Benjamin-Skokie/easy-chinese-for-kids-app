import { access, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadCultureCatalogLocations } from "./culture_catalog_locations.mjs";

export const sitemapSiteOrigin = "https://nihaoworld.org";
export const creatorProfileUrl = `${sitemapSiteOrigin}/about/author-project/`;
export const creatorPortraitUrl = `${sitemapSiteOrigin}/assets/photos/benjamin-sun-portrait.webp`;

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = resolve(scriptDirectory, "..");
const staticPaths = [
  "/",
  "/learn.html",
  "/books.html",
  "/culture.html",
  "/about/author-project/",
  "/about/sources-research/",
  "/about/feedback-problems/",
  "/about/privacy-safety/"
];

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function localFileForPath(projectRoot, pathname) {
  if (pathname === "/") return resolve(projectRoot, "index.html");
  const relativePath = pathname.replace(/^\/+/, "");
  const localPath = pathname.endsWith("/") ? `${relativePath}index.html` : relativePath;
  return resolve(projectRoot, localPath);
}

export async function buildSitemapUrls(projectRoot = defaultProjectRoot) {
  const storyLocations = await loadCultureCatalogLocations(projectRoot);
  const storyPaths = [...storyLocations.keys()]
    .sort((left, right) => left.localeCompare(right))
    .map((storyId) => `/culture/books/${storyId}/`);
  const paths = [...staticPaths, ...storyPaths];

  if (new Set(paths).size !== paths.length) {
    throw new Error("The sitemap contains duplicate paths.");
  }

  for (const pathname of paths) {
    await access(localFileForPath(projectRoot, pathname));
  }

  return paths.map((pathname) => new URL(pathname, sitemapSiteOrigin).href);
}

export function renderSitemapXml(urls) {
  const entries = urls.map((url) => {
    const imageEntry = url === creatorProfileUrl
      ? `\n    <image:image>\n      <image:loc>${xmlEscape(creatorPortraitUrl)}</image:loc>\n    </image:image>`
      : "";
    return `  <url>\n    <loc>${xmlEscape(url)}</loc>${imageEntry}\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`;
}

export async function buildSitemap(projectRoot = defaultProjectRoot) {
  const urls = await buildSitemapUrls(projectRoot);
  await writeFile(resolve(projectRoot, "sitemap.xml"), renderSitemapXml(urls), "utf8");
  return urls;
}

const isEntrypoint = process.argv[1]
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isEntrypoint) {
  const urls = await buildSitemap();
  console.log(`Built sitemap.xml with ${urls.length} URLs.`);
}
