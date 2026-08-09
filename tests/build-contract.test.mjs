import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createAudioService } from "../src/core/audio.js";
import { topicIdFromLocation, topicPageUrl, viewFromLocation } from "../src/core/router.js";
import { timeDateWeekItems } from "../src/features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateRoutineItems } from "../src/features/time-daily-life/time.js";
import { datePracticeItems, timeDateMonthItems } from "../src/features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonVisualItems } from "../src/features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionVisualItems } from "../src/features/time-daily-life/positions.js";
import { transportSentenceTokens, transportVisualItems } from "../src/features/time-daily-life/transport.js";
import { roomScenes, roomVisualItems } from "../src/features/time-daily-life/rooms.js";

test("the local page loads a single bundled application script", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<script src="app\.js"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
});

test("the generated bundle keeps its source-of-truth marker", () => {
  const bundle = readFileSync("app.js", "utf8");
  assert.match(bundle, /Generated from src\/main\.js\. Do not edit directly/);
});

test("audio cancels the prior utterance before speaking a new phrase", () => {
  const spoken = [];
  let cancelCount = 0;
  const audio = createAudioService({
    synthesis: { cancel: () => { cancelCount += 1; }, speak: (utterance) => spoken.push(utterance) },
    createUtterance: (text) => ({ text }),
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("你好", 0.78);
  assert.equal(cancelCount, 1);
  assert.deepEqual(spoken[0], { text: "你好", lang: "zh-CN", rate: 0.78, pitch: 1 });
});

test("audio prefers the clear Mandarin female voice when it is installed", () => {
  const spoken = [];
  const tingting = { name: "Tingting", lang: "zh-CN" };
  const audio = createAudioService({
    synthesis: { cancel: () => {}, speak: (utterance) => spoken.push(utterance), getVoices: () => [{ name: "Eddy", lang: "zh-CN" }, tingting] },
    createUtterance: (text) => ({ text }),
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("你好");
  assert.equal(spoken[0].voice, tingting);
});

test("router preserves the existing topic query and detail hash contract", () => {
  const location = { pathname: "/index.html", search: "?topic=weekdays", hash: "#topic-detail" };
  assert.equal(topicIdFromLocation(location, (id) => id === "weekdays"), "weekdays");
  assert.equal(viewFromLocation(location), "topics");
  assert.equal(topicPageUrl(location, "time-date"), "/index.html?topic=time-date#topic-detail");
  assert.doesNotMatch(topicPageUrl({ pathname: "/", search: "", hash: "" }, "time-date"), /^undefined/);
});

test("shared lesson practice is provided by an explicit game factory", () => {
  const legacySource = readFileSync("src/legacy-app.js", "utf8");
  const gameSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  assert.match(legacySource, /createSharedLessonPractice\(\{[\s\S]*elements:/);
  assert.doesNotMatch(legacySource, /function renderSharedLessonPractice\(/);
  assert.match(gameSource, /export function createSharedLessonPractice/);
});

test("time and calendar content retains its expected teaching sets", () => {
  assert.equal(timeDateWeekItems.length, 7);
  assert.equal(timeDateClockItems.length, 12);
  assert.equal(timeDateMonthItems.length, 12);
  assert.equal(timeDateRoutineItems.length, 11);
  assert.equal(datePracticeItems.length, 6);
});

test("time and daily life data stays owned by its topics", () => {
  assert.equal(comparisonVisualItems.length, 7);
  assert.equal(positionVisualItems.length, 3);
  assert.equal(transportVisualItems.length, 8);
  assert.equal(roomVisualItems.length, 11);
});

test("time and daily life practice data retains every interaction set", () => {
  assert.equal(roomScenes.length, 3);
  assert.equal(positionScenes.length, 4);
  assert.equal(positionPracticeItems.length, 11);
  assert.equal(comparisonPracticeItems.length, 7);
  assert.equal(Object.keys(transportSentenceTokens).length, 8);
});
