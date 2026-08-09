import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createAudioService } from "../src/core/audio.js";
import { topicIdFromLocation, topicPageUrl, viewFromLocation } from "../src/core/router.js";
import { datePracticeItems, timeDateClockItems, timeDateMonthItems, timeDateRoutineItems, timeDateWeekItems } from "../src/features/time-daily-life/calendar-data.js";
import { timeDailyVisualTopicItems } from "../src/features/time-daily-life/visual-data.js";
import { comparisonPracticeItems, positionPracticeItems, positionScenes, roomScenes, transportSentenceTokens } from "../src/features/time-daily-life/practice-data.js";

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

test("router preserves the existing topic query and detail hash contract", () => {
  const location = { pathname: "/index.html", search: "?topic=weekdays", hash: "#topic-detail" };
  assert.equal(topicIdFromLocation(location, (id) => id === "weekdays"), "weekdays");
  assert.equal(viewFromLocation(location), "topics");
  assert.equal(topicPageUrl(location, "time-date"), "/index.html?topic=time-date#topic-detail");
});

test("time and calendar content retains its expected teaching sets", () => {
  assert.equal(timeDateWeekItems.length, 7);
  assert.equal(timeDateClockItems.length, 12);
  assert.equal(timeDateMonthItems.length, 12);
  assert.equal(timeDateRoutineItems.length, 11);
  assert.equal(datePracticeItems.length, 6);
});

test("time and daily life visual data stays owned by its feature", () => {
  assert.deepEqual(Object.keys(timeDailyVisualTopicItems), ["comparisons", "positions", "transport", "rooms"]);
});

test("time and daily life practice data retains every interaction set", () => {
  assert.equal(roomScenes.length, 3);
  assert.equal(positionScenes.length, 4);
  assert.equal(positionPracticeItems.length, 11);
  assert.equal(comparisonPracticeItems.length, 7);
  assert.equal(Object.keys(transportSentenceTokens).length, 8);
});
