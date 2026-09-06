import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { createGlossaryFormatter } from "../scripts/culture_glossary.mjs";

const terms = {
  "guan-yu": {
    zh: "关羽",
    en: "Guan Yu",
    pinyin: "Guān Yǔ",
    note_zh: "三国时期的将领。",
    note_en: "A general from the Three Kingdoms period."
  }
};

test("structured culture terms expose pronunciation and a bilingual identity", () => {
  const format = createGlossaryFormatter(terms);
  const zh = format("[[关羽|guan-yu]]");
  const en = format("[[Guan Yu|guan-yu]]");

  assert.match(zh, /Guān Yǔ · 三国时期的将领。/);
  assert.match(en, /Guān Yǔ · 关羽 · A general from the Three Kingdoms period\./);
});

test("a culture term receives only one tooltip per language on each page", () => {
  const format = createGlossaryFormatter(terms);
  const firstZh = format("[[关羽|guan-yu]]");
  const secondZh = format("[[关羽|guan-yu]]");
  const firstEn = format("[[Guan Yu|guan-yu]]");
  const secondEn = format("[[Guan Yu|guan-yu]]");

  assert.match(firstZh, /class="glossary-term"/);
  assert.equal(secondZh, "关羽");
  assert.match(firstEn, /class="glossary-term"/);
  assert.equal(secondEn, "Guan Yu");
});

test("unknown culture terms remain readable plain text", () => {
  const format = createGlossaryFormatter(terms);
  assert.equal(format("[[Missing term|missing-term]]"), "Missing term");
});

test("mobile culture tooltips stay near their terms instead of docking to the screen bottom", () => {
  const sharedStyles = readFileSync("culture/shared/styles.css", "utf8");
  const articleStyles = readFileSync("culture/article-template.css", "utf8");
  const glossaryScript = readFileSync("scripts/culture_glossary.mjs", "utf8");

  for (const styles of [sharedStyles, articleStyles]) {
    assert.doesNotMatch(styles, /right: 16px;\s*bottom: 16px;\s*left: 16px;/);
    assert.match(styles, /width: min\(320px, calc\(100vw - 24px\)\);/);
    assert.match(styles, /background: #fff2cf;/);
    assert.match(styles, /border: 2px solid/);
    assert.match(styles, /\.glossary-entry:hover \.glossary-popover \{[\s\S]*?position: fixed;[\s\S]*?left: var\(--glossary-left, 50vw\);/);
  }

  assert.match(glossaryScript, /compactViewport \? "below" : "above"/);
});
