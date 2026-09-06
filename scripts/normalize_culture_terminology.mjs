import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "culture", "content");
const terminologyPath = path.join(contentRoot, "terminology.json");
const shouldWrite = process.argv.includes("--write");
const requestedPaths = process.argv.slice(2).filter((argument) => argument !== "--write");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function replaceExact(text, source, replacement) {
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(source)}(?![\\p{L}\\p{N}])`, "gu");
  return text.replace(pattern, replacement);
}

function stripRegisteredMarkers(text, terminology) {
  const registeredLabels = new Set();
  for (const [id, term] of Object.entries(terminology)) {
    registeredLabels.add(id);
    for (const value of [term.zh, term.en, ...(term.aliases_zh ?? []), ...(term.aliases_en ?? [])]) {
      if (value) registeredLabels.add(value);
    }
  }

  return text.replace(/\[\[([^\]]+)\]\]/g, (match, rawTerm) => {
    const [rawLabel, rawKey] = rawTerm.split("|").map((part) => part.trim());
    const label = rawLabel || rawKey;
    const key = rawKey || rawLabel;
    return registeredLabels.has(key) || registeredLabels.has(label) ? label : match;
  });
}

function removeInlinePronunciationParentheses(text, terminology) {
  let result = text;
  for (const term of Object.values(terminology)) {
    if (!term.zh || !term.pinyin) continue;
    const chineseForms = [term.zh, ...(term.aliases_zh ?? [])];
    const pronunciationForms = [term.pinyin, term.en, ...(term.replace_en ?? [])]
      .filter(Boolean);
    for (const chineseForm of chineseForms) {
      for (const pronunciation of pronunciationForms) {
        const parenthetical = new RegExp(
          `${escapeRegExp(chineseForm)}([”"’']?)[（(]\\*{0,2}${escapeRegExp(pronunciation)}\\*{0,2}[）)]`,
          "gu"
        );
        result = result.replace(parenthetical, `${chineseForm}$1`);
      }
    }

    const englishForms = [term.en, ...(term.aliases_en ?? [])].filter(Boolean);
    for (const englishForm of englishForms) {
      for (const pronunciation of [term.pinyin, term.en, ...(term.replace_en ?? [])].filter(Boolean)) {
        const parenthetical = new RegExp(
          `${escapeRegExp(englishForm)}\\s*[（(]\\*{0,2}${escapeRegExp(pronunciation)}\\*{0,2}[）)]`,
          "gu"
        );
        result = result.replace(parenthetical, englishForm);
      }
    }
  }
  return result;
}

function removeCrossLanguageParentheses(text, terminology) {
  let result = text;
  for (const term of Object.values(terminology)) {
    const chineseForms = [term.zh, ...(term.aliases_zh ?? [])].filter(Boolean);
    const englishForms = [term.en, ...(term.aliases_en ?? [])].filter(Boolean);
    for (const englishForm of englishForms) {
      for (const chineseForm of chineseForms) {
        const detailedParenthetical = new RegExp(
          `(\\*{0,2})${escapeRegExp(englishForm)}(\\*{0,2})\\s*[（(]\\*{0,2}${escapeRegExp(chineseForm)}\\*{0,2}\\s*[,，]\\s*\\*{0,2}${escapeRegExp(term.pinyin)}\\*{0,2}[）)]`,
          "gu"
        );
        result = result.replace(detailedParenthetical, `$1${englishForm}$2`);
        const parenthetical = new RegExp(
          `(\\*{0,2})${escapeRegExp(englishForm)}(\\*{0,2})\\s*[（(]\\*{0,2}${escapeRegExp(chineseForm)}\\*{0,2}[）)]`,
          "gu"
        );
        result = result.replace(parenthetical, `$1${englishForm}$2`);
      }
    }
  }
  return result;
}

function canonicalizeEnglishForms(text, terminology) {
  let result = text;
  for (const term of Object.values(terminology)) {
    if (!term.en) continue;
    for (const variant of term.replace_en ?? []) {
      result = replaceExact(result, variant, term.en);
    }
  }
  return result;
}

function protectInlineMarkup(text, callback) {
  const protectedPattern = /(\[\[[^\]]+\]\]|\[[^\]\n]+\]\([^)\n]+\)|`[^`\n]+`)/g;
  let output = "";
  let cursor = 0;
  for (const match of text.matchAll(protectedPattern)) {
    output += callback(text.slice(cursor, match.index));
    output += match[0];
    cursor = match.index + match[0].length;
  }
  output += callback(text.slice(cursor));
  return output;
}

function buildAliasMatcher(terminology, language) {
  const aliasToId = new Map();
  for (const [id, term] of Object.entries(terminology)) {
    if (term.tooltip === false || term.auto_tag === false) continue;
    const aliases = language === "zh"
      ? [term.zh, ...(term.aliases_zh ?? [])]
      : [term.en, ...(term.aliases_en ?? [])];
    for (const alias of aliases.filter(Boolean)) {
      if (!aliasToId.has(alias)) aliasToId.set(alias, id);
    }
  }
  const aliases = [...aliasToId.keys()].sort((a, b) => b.length - a.length);
  if (!aliases.length) return { aliasToId, pattern: null };
  const alternatives = aliases.map(escapeRegExp).join("|");
  const pattern = language === "zh"
    ? new RegExp(alternatives, "gu")
    : new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`, "gu");
  return { aliasToId, pattern };
}

function addFirstOccurrenceMarkers(text, terminology) {
  const matchers = {
    zh: buildAliasMatcher(terminology, "zh"),
    en: buildAliasMatcher(terminology, "en")
  };
  const seen = { zh: new Set(), en: new Set() };

  return text.replace(/\[(zh|en)\]\n([\s\S]*?)\n\[\/\1\]/g, (match, language, body) => {
    const { aliasToId, pattern } = matchers[language];
    if (!pattern) return match;
    const markedBody = protectInlineMarkup(body, (plainText) => plainText.replace(pattern, (label) => {
      const id = aliasToId.get(label);
      if (!id || seen[language].has(id)) return label;
      seen[language].add(id);
      return `[[${label}|${id}]]`;
    }));
    const cleanMarkedBody = markedBody
      .replace(/\*\*(\[\[[^\]]+\]\])\*\*/g, "$1")
      .replace(/\*(\[\[[^\]]+\]\])\*/g, "$1");
    return `[${language}]\n${cleanMarkedBody}\n[/${language}]`;
  });
}

const terminology = JSON.parse(await fs.readFile(terminologyPath, "utf8"));
const files = requestedPaths.length
  ? requestedPaths.map((file) => path.resolve(root, file)).sort()
  : (await walk(contentRoot)).sort();
let changed = 0;

for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  let normalized = stripRegisteredMarkers(source, terminology);
  normalized = removeInlinePronunciationParentheses(normalized, terminology);
  normalized = removeCrossLanguageParentheses(normalized, terminology);
  normalized = canonicalizeEnglishForms(normalized, terminology);
  normalized = addFirstOccurrenceMarkers(normalized, terminology);

  if (normalized === source) continue;
  changed += 1;
  console.log(path.relative(root, file));
  if (shouldWrite) await fs.writeFile(file, normalized, "utf8");
}

console.log(`${shouldWrite ? "Updated" : "Would update"} ${changed} Culture manuscripts.`);
