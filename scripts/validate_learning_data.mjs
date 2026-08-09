import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { timeDateWeekItems } from "../src/features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateRoutineItems } from "../src/features/time-daily-life/time.js";
import { datePracticeItems, timeDateDateItems, timeDateMonthItems } from "../src/features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonVisualItems } from "../src/features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionVisualItems } from "../src/features/time-daily-life/positions.js";
import { transportSentenceTokens, transportVisualItems } from "../src/features/time-daily-life/transport.js";
import { roomScenes, roomVisualItems } from "../src/features/time-daily-life/rooms.js";
import { stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "../src/features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "../src/features/school-life/school-supplies.js";

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertAsset(item, label) {
  assert(Boolean(item.imagePath), `${label} is missing imagePath`);
  assert(existsSync(resolve(item.imagePath)), `${label} references a missing asset: ${item.imagePath}`);
}

for (const [label, items] of [
  ["weekday", timeDateWeekItems],
  ["clock", timeDateClockItems],
  ["date", timeDateDateItems],
  ["month", timeDateMonthItems],
  ["routine", timeDateRoutineItems],
  ["comparison visual", comparisonVisualItems],
  ["position visual", positionVisualItems],
  ["transport visual", transportVisualItems],
  ["room visual", roomVisualItems],
  ["room scene", roomScenes],
  ["position scene", positionScenes]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["stationery word", stationeryTopicData.words],
  ["stationery picture-match", stationeryPictureMatchRounds],
  ["stationery sentence", stationerySentenceBuilds]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["school supplies word", schoolSuppliesTopicData.words],
  ["school supplies sentence", schoolSuppliesSentenceBuilds]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

const transportIds = new Set(transportVisualItems.map((item) => item.id));
Object.keys(transportSentenceTokens).forEach((id) => assert(transportIds.has(id), `transport token entry has no visual: ${id}`));
transportIds.forEach((id) => assert(transportSentenceTokens[id], `transport visual has no sentence tokens: ${id}`));

const positionLineCount = positionScenes.reduce((count, scene) => count + scene.lines.length, 0);
assert(positionPracticeItems.length === positionLineCount, "position practice items do not match scene lines");
assert(datePracticeItems.every((item) => item.id && item.hanzi && item.audio), "date practice has an incomplete item");
assert(comparisonPracticeItems.every((item) => comparisonVisualItems.some((visual) => visual.id === item.id)), "comparison practice references an unknown visual");
assert(stationerySentenceBuilds.length >= 8, "stationery sentence practice is incomplete");
assert(schoolSuppliesSentenceBuilds.length >= 6, "school supplies sentence practice is incomplete");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Time & Daily Life data validation passed.");
}
