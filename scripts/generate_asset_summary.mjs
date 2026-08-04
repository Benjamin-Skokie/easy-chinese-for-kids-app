import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, "assets");
const outputPath = path.join(rootDir, "docs", "asset_summary.md");

const manifestPaths = fs
  .readdirSync(assetsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(assetsDir, entry.name, "manifest.json"))
  .filter((manifestPath) => fs.existsSync(manifestPath))
  .sort();

function rel(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}

function mdPath(filePath) {
  let relativePath = path.relative(path.dirname(outputPath), filePath).replaceAll(path.sep, "/");
  if (!relativePath.startsWith(".")) relativePath = `./${relativePath}`;
  return relativePath;
}

function titleFromKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function nonEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function describeEntry(entry) {
  const parts = [];

  if (nonEmpty(entry.hanzi) && nonEmpty(entry.pinyin)) {
    parts.push(`\`${entry.hanzi}\` (${entry.pinyin})`);
  } else if (nonEmpty(entry.hanzi)) {
    parts.push(`\`${entry.hanzi}\``);
  } else if (nonEmpty(entry.hanziName)) {
    parts.push(`\`${entry.hanziName}\``);
  }

  if (nonEmpty(entry.label)) parts.push(entry.label);
  if (nonEmpty(entry.english)) parts.push(entry.english);
  if (nonEmpty(entry.theme)) parts.push(`theme: ${entry.theme}`);
  if (nonEmpty(entry.sentenceHanzi)) parts.push(`sentence: ${entry.sentenceHanzi}`);
  if (Array.isArray(entry.focus) && entry.focus.length > 0) parts.push(`focus: ${entry.focus.join(" / ")}`);
  if (nonEmpty(entry.location)) parts.push(`location: ${entry.location}`);
  if (nonEmpty(entry.gender)) parts.push(`gender: ${entry.gender}`);
  if (nonEmpty(entry.ageGroup)) parts.push(`age: ${entry.ageGroup}`);
  if (nonEmpty(entry.role)) parts.push(`role: ${entry.role}`);
  if (nonEmpty(entry.needsNewArt)) parts.push("MISSING ART");
  if (nonEmpty(entry.artDirection)) parts.push(`art direction: ${entry.artDirection}`);

  return parts.join(" | ");
}

function collectArraySections(manifest) {
  return Object.entries(manifest)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, value]) => ({ key, value }));
}

const collections = manifestPaths.map((manifestPath) => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const folder = path.dirname(manifestPath);
  const sections = collectArraySections(manifest);
  const fileRefs = new Set();
  let entryCount = 0;
  let missingCount = 0;

  for (const { value } of sections) {
    for (const entry of value) {
      entryCount += 1;
      if (entry.file) fileRefs.add(path.join(folder, entry.file));
      if (entry.sheet) fileRefs.add(path.join(folder, entry.sheet));
      if (entry.scenePath) fileRefs.add(path.join(rootDir, entry.scenePath));
      if (entry.needsNewArt) missingCount += 1;

      if (Array.isArray(entry.items)) {
        for (const item of entry.items) {
          if (typeof item === "string") continue;
          if (item?.file) fileRefs.add(path.join(folder, item.file));
        }
      }

      if (Array.isArray(entry.examples)) {
        for (const example of entry.examples) {
          if (example.file) fileRefs.add(path.join(folder, example.file));
          if (example.scenePath) fileRefs.add(path.join(rootDir, example.scenePath));
          if (example.needsNewArt) missingCount += 1;
        }
      }
    }
  }

  if (manifest.sheet) fileRefs.add(path.join(folder, manifest.sheet));

  return {
    manifestPath,
    manifest,
    sections,
    entryCount,
    missingCount,
    fileCount: Array.from(fileRefs).filter((filePath) => fs.existsSync(filePath)).length
  };
});

const totalEntries = collections.reduce((sum, collection) => sum + collection.entryCount, 0);
const totalMissing = collections.reduce((sum, collection) => sum + collection.missingCount, 0);

let markdown = "";
markdown += "# Asset Summary\n\n";
markdown += `Last generated: ${new Date().toISOString().slice(0, 10)}\n\n`;
markdown += "Purpose: provide one searchable inventory of illustration assets, using each folder's `manifest.json` as the source of truth.\n\n";
markdown += "## Snapshot\n\n";
markdown += `- Collections: ${collections.length}\n`;
markdown += `- Manifest entries: ${totalEntries}\n`;
markdown += `- Entries flagged as missing art: ${totalMissing}\n`;
markdown += `- Source of truth: per-folder manifests under \`assets/*/manifest.json\`\n\n`;
markdown += "## Collections\n\n";

for (const collection of collections) {
  const name = collection.manifest.collection ?? path.basename(path.dirname(collection.manifestPath));
  markdown += `### \`${name}\`\n\n`;
  markdown += `- Manifest: [${rel(collection.manifestPath)}](${mdPath(collection.manifestPath)})\n`;
  if (nonEmpty(collection.manifest.style)) markdown += `- Style: ${collection.manifest.style}\n`;
  markdown += `- Entries: ${collection.entryCount}\n`;
  markdown += `- Files present: ${collection.fileCount}\n`;
  if (collection.missingCount > 0) markdown += `- Missing-art markers: ${collection.missingCount}\n`;
  markdown += "\n";

  for (const { key, value } of collection.sections) {
    markdown += `**${titleFromKey(key)}**\n`;
    markdown += "\n";
    for (const entry of value) {
      const line = describeEntry(entry);
      const refs = [];
      if (entry.file) {
        const filePath = path.join(path.dirname(collection.manifestPath), entry.file);
        refs.push(fs.existsSync(filePath) ? `[file](${mdPath(filePath)})` : `missing file: \`${rel(filePath)}\``);
      }
      if (entry.scenePath) {
        const scenePath = path.join(rootDir, entry.scenePath);
        refs.push(fs.existsSync(scenePath) ? `[scene](${mdPath(scenePath)})` : `missing scene: \`${rel(scenePath)}\``);
      }
      if (entry.sourceCollection && entry.sourceItemId) refs.push(`source: \`${entry.sourceCollection}/${entry.sourceItemId}\``);
      markdown += `- \`${entry.id ?? "entry"}\`${line ? `: ${line}` : ""}${refs.length ? ` | ${refs.join(" | ")}` : ""}\n`;

      if (Array.isArray(entry.examples) && entry.examples.length > 0) {
        for (const example of entry.examples) {
          const exampleLine = describeEntry(example);
          const exampleRefs = [];
          if (example.file) {
            const filePath = path.join(path.dirname(collection.manifestPath), example.file);
            exampleRefs.push(fs.existsSync(filePath) ? `[file](${mdPath(filePath)})` : `missing file: \`${rel(filePath)}\``);
          }
          if (example.scenePath) {
            const scenePath = path.join(rootDir, example.scenePath);
            exampleRefs.push(fs.existsSync(scenePath) ? `[scene](${mdPath(scenePath)})` : `missing scene: \`${rel(scenePath)}\``);
          }
          if (example.sourceCollection && example.sourceItemId) exampleRefs.push(`source: \`${example.sourceCollection}/${example.sourceItemId}\``);
          markdown += `- example: ${exampleLine}${exampleRefs.length ? ` | ${exampleRefs.join(" | ")}` : ""}\n`;
        }
      }
    }
    markdown += "\n";
  }
}

fs.writeFileSync(outputPath, markdown);
console.log(`Wrote ${rel(outputPath)}`);
