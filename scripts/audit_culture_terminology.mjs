import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "culture", "content");
const terminology = JSON.parse(await fs.readFile(path.join(contentRoot, "terminology.json"), "utf8"));
const legacyGlossary = JSON.parse(await fs.readFile(path.join(contentRoot, "glossary.json"), "utf8"));
const knownKeys = new Set([...Object.keys(legacyGlossary), ...Object.keys(terminology)]);
const tonePattern = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/u;
const errors = [];
const plainPinyin = (value) => value
  .normalize("NFD")
  .replace(/\p{M}/gu, "")
  .toLocaleLowerCase("en")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phrasePattern = (value) => escapeRegExp(value).replace(/\s+/g, "\\s+");

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    if (entry.isFile() && entry.name === "page.md") files.push(fullPath);
  }
  return files;
}

for (const [id, term] of Object.entries(terminology)) {
  for (const field of ["zh", "en", "pinyin"]) {
    if (!term[field]) errors.push(`terminology.json: ${id} is missing ${field}`);
  }
  if (tonePattern.test(term.en)) errors.push(`terminology.json: ${id}.en contains tone marks`);
}

for (const language of ["zh", "en"]) {
  const owners = new Map();
  for (const [id, term] of Object.entries(terminology)) {
    const forms = [term[language], ...(term[`aliases_${language}`] ?? [])].filter(Boolean);
    for (const form of forms) {
      const existing = owners.get(form);
      if (existing && existing !== id) {
        errors.push(`terminology.json: duplicate ${language} form ${form} in ${existing} and ${id}`);
      } else {
        owners.set(form, id);
      }
    }
  }
}

for (const file of await walk(contentRoot)) {
  const relative = path.relative(root, file);
  const source = await fs.readFile(file, "utf8");
  const titleZh = source.match(/^title_zh:\s*(.+)$/m)?.[1] ?? "";
  const titleEn = source.match(/^title_en:\s*(.+)$/m)?.[1] ?? "";
  if (/[（(][^）)]*[A-Za-z][^）)]*[）)]/.test(titleZh)) {
    errors.push(`${relative}: Chinese title contains parenthetical romanization`);
  }
  if (tonePattern.test(titleEn)) {
    errors.push(`${relative}: English title contains tone marks`);
  }
  if (/^["']?[a-z]/.test(titleEn)) {
    errors.push(`${relative}: English title starts with a lowercase letter`);
  }

  for (const match of source.matchAll(/^(heading|caption)_(zh|en):\s*(.+)$/gm)) {
    const [, field, language, value] = match;
    if (language === "zh" && /[（(][^）)]*[A-Za-z][^）)]*[）)]/.test(value)) {
      errors.push(`${relative}: Chinese ${field} contains parenthetical romanization`);
    }
    if (language === "en" && tonePattern.test(value)) {
      errors.push(`${relative}: English ${field} contains tone marks`);
    }
    if (language === "en" && /[（(][^）)]*[\u3400-\u9fff][^）)]*[）)]/u.test(value)) {
      errors.push(`${relative}: English ${field} contains parenthetical Chinese text`);
    }
  }

  const seen = { zh: new Set(), en: new Set() };
  for (const block of source.matchAll(/\[(zh|en)\]\n([\s\S]*?)\n\[\/\1\]/g)) {
    const language = block[1];
    if (language === "en") {
      const visibleBody = block[2]
        .replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, "$1")
        .replace(/\*+/g, "")
        .replace(/[“”"‘’]/g, "");
      for (const [key, term] of Object.entries(terminology)) {
        const alternatives = [term.en, term.pinyin, plainPinyin(term.pinyin)]
          .filter(Boolean)
          .filter((value, index, values) => values.indexOf(value) === index)
          .map(phrasePattern)
          .join("|");
        const repeatedName = new RegExp(
          `(?<![\\p{L}\\p{N}])${phrasePattern(term.en)}(?![\\p{L}\\p{N}])\\s*,?\\s+or\\s+(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`,
          "iu"
        );
        if (repeatedName.test(visibleBody)) {
          errors.push(`${relative}: English name ${key} is redundantly restated after “or”`);
        }
      }

      for (const repeat of block[2].matchAll(/\[\[([^|\]]+)\|([^\]]+)\]\]\s+(?:is|are|means)\s+(?:an?\s+|the\s+)?\1\b/giu)) {
        errors.push(`${relative}: English tooltip ${repeat[2]} is repeated in its own definition`);
      }

      for (const repeat of block[2].matchAll(/\[\[([^|\]]+)\|([^\]]+)\]\]\s*,?\s+or\s+(?:\*{1,2}|[“"'‘])*([^,.;!?*\n]{1,80})(?:\*{1,2}|[”"'’])*(?=[,.;!?])/gi)) {
        const [, label, key, alternative] = repeat;
        const term = terminology[key];
        const repeatedLabel = plainPinyin(label) === plainPinyin(alternative);
        const repeatedPinyin = term && plainPinyin(term.pinyin) === plainPinyin(alternative);
        if (repeatedLabel || repeatedPinyin) {
          errors.push(`${relative}: ${language} tooltip ${key} is immediately restated after “or”`);
        }
      }
    }
    for (const marker of block[2].matchAll(/\[\[([^\]]+)\]\]/g)) {
      const [rawLabel, rawKey] = marker[1].split("|").map((part) => part.trim());
      const key = rawKey || rawLabel;
      if (!knownKeys.has(key)) errors.push(`${relative}: unknown tooltip key ${key}`);
      const seenKey = `${language}:${key}`;
      if (seen[language].has(seenKey)) errors.push(`${relative}: repeated ${language} tooltip key ${key}`);
      seen[language].add(seenKey);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`Culture terminology audit failed with ${errors.length} issue(s).`);
  process.exitCode = 1;
} else {
  console.log("Culture terminology audit passed.");
}
