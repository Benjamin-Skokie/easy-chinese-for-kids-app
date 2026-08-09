import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { datePracticeItems, timeDateClockItems, timeDateDateItems, timeDateMonthItems, timeDateRoutineItems, timeDateWeekItems } from "../src/features/time-daily-life/calendar-data.js";
import { comparisonPracticeItems, positionPracticeItems, positionScenes, roomScenes, transportSentenceTokens } from "../src/features/time-daily-life/practice-data.js";
import { timeDailyVisualTopicItems } from "../src/features/time-daily-life/visual-data.js";

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
  ["comparison visual", timeDailyVisualTopicItems.comparisons],
  ["position visual", timeDailyVisualTopicItems.positions],
  ["transport visual", timeDailyVisualTopicItems.transport],
  ["room visual", timeDailyVisualTopicItems.rooms],
  ["room scene", roomScenes],
  ["position scene", positionScenes]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

const transportIds = new Set(timeDailyVisualTopicItems.transport.map((item) => item.id));
Object.keys(transportSentenceTokens).forEach((id) => assert(transportIds.has(id), `transport token entry has no visual: ${id}`));
transportIds.forEach((id) => assert(transportSentenceTokens[id], `transport visual has no sentence tokens: ${id}`));

const positionLineCount = positionScenes.reduce((count, scene) => count + scene.lines.length, 0);
assert(positionPracticeItems.length === positionLineCount, "position practice items do not match scene lines");
assert(datePracticeItems.every((item) => item.id && item.hanzi && item.audio), "date practice has an incomplete item");
assert(comparisonPracticeItems.every((item) => timeDailyVisualTopicItems.comparisons.some((visual) => visual.id === item.id)), "comparison practice references an unknown visual");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Time & Daily Life data validation passed.");
}
