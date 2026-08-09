import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("the local page loads a single bundled application script", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<script src="app\.js"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
});

test("the generated bundle keeps its source-of-truth marker", () => {
  const bundle = readFileSync("app.js", "utf8");
  assert.match(bundle, /Generated from src\/main\.js\. Do not edit directly/);
});
