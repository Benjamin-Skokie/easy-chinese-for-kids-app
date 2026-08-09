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
import { classroomTopicData } from "../src/features/school-life/classroom.js";
import { schoolSentenceBuilds, schoolTopicData } from "../src/features/school-life/school.js";
import { schoolSubjectsSentenceBuilds, schoolSubjectsTopicData } from "../src/features/school-life/school-subjects.js";
import { foodSentenceBuilds, foodTopicData } from "../src/features/food/food.js";
import { foodPreferencesTopicData } from "../src/features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds, mealsFeelingsTopicData } from "../src/features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice } from "../src/features/foundations/introductions.js";
import { ageBuildPhrases, agePractice } from "../src/features/foundations/age.js";
import { identityConversation, identityCountries } from "../src/features/foundations/identity.js";
import { greetingsPractice } from "../src/features/foundations/greetings.js";
import { politePractice } from "../src/features/foundations/polite-words.js";
import { clothesMatchItems, clothesPractice } from "../src/features/daily-life/clothes.js";
import { familyPractice, illustratedFamily } from "../src/features/family/family.js";
import { illustratedKids } from "../src/data/characters.js";
import { books, learningHomeCategories, topicGroups } from "../src/data/curriculum.js";

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

for (const [label, items] of [
  ["classroom scene", classroomTopicData.scenes],
  ["classroom word", classroomTopicData.words]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["school scene", schoolTopicData.scenes],
  ["school word", schoolTopicData.words],
  ["school sentence", schoolSentenceBuilds]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["school subjects scene", schoolSubjectsTopicData.scenes],
  ["school subjects sentence", schoolSubjectsSentenceBuilds]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["food scene", foodTopicData.scenes],
  ["food word", foodTopicData.words],
  ["food sentence", foodSentenceBuilds]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const [label, items] of [
  ["food preferences scene", foodPreferencesTopicData.scenes],
  ["food preferences word", foodPreferencesTopicData.words]
]) {
  items.forEach((item) => assertAsset(item, `${label}:${item.id}`));
}

for (const group of mealsFeelingsTopicData.sceneGroups) {
  group.items.forEach((item) => assertAsset(item, `meals scene:${item.id}`));
}
for (const group of mealsFeelingsTopicData.wordGroups) {
  group.items.forEach(([, , , , imagePath]) => assertAsset({ id: group.id, imagePath }, `meals word:${group.id}`));
}
mealsFeelingsTopicData.pictureChoices.forEach((item) => assertAsset(item, `meals picture choice:${item.id}`));
mealsFeelingsSentenceBuilds.forEach((item) => assertAsset(item, `meals sentence:${item.id}`));
introductionsPractice.forEach((item) => assertAsset(item, `introductions scene:${item.id}`));
agePractice.forEach((item) => assertAsset(item, `age scene:${item.id}`));
identityCountries.forEach((item) => assertAsset({ id: item.id, imagePath: item.asset }, `identity flag:${item.id}`));
assertAsset({ id: "conversation", imagePath: identityConversation.imagePath }, "identity conversation");
greetingsPractice.forEach((item) => assertAsset(item, `greetings scene:${item.id}`));
politePractice.forEach((item) => assertAsset(item, `polite scene:${item.id}`));
clothesPractice.forEach((item) => assertAsset(item, `clothes scene:${item.id}`));
clothesMatchItems.forEach((item) => assertAsset(item, `clothes match:${item.id}`));
familyPractice.forEach((item) => assertAsset(item, `family scene:${item.id}`));
Object.values(illustratedFamily).forEach((item) => assertAsset({ id: item.id, imagePath: item.path }, `family avatar:${item.id}`));
Object.values(illustratedKids).forEach((item) => assertAsset({ id: item.id, imagePath: item.path }, `character:${item.id}`));

const transportIds = new Set(transportVisualItems.map((item) => item.id));
Object.keys(transportSentenceTokens).forEach((id) => assert(transportIds.has(id), `transport token entry has no visual: ${id}`));
transportIds.forEach((id) => assert(transportSentenceTokens[id], `transport visual has no sentence tokens: ${id}`));

const positionLineCount = positionScenes.reduce((count, scene) => count + scene.lines.length, 0);
assert(positionPracticeItems.length === positionLineCount, "position practice items do not match scene lines");
assert(datePracticeItems.every((item) => item.id && item.hanzi && item.audio), "date practice has an incomplete item");
assert(comparisonPracticeItems.every((item) => comparisonVisualItems.some((visual) => visual.id === item.id)), "comparison practice references an unknown visual");
assert(stationerySentenceBuilds.length >= 8, "stationery sentence practice is incomplete");
assert(schoolSuppliesSentenceBuilds.length >= 6, "school supplies sentence practice is incomplete");
assert(classroomTopicData.sentenceFrames.length === 3, "classroom sentence frames are incomplete");
assert(schoolSentenceBuilds.length === 7, "school sentence practice is incomplete");
assert(schoolSubjectsTopicData.words.length === 6, "school subjects word set is incomplete");
assert(schoolSubjectsSentenceBuilds.length === 6, "school subjects sentence practice is incomplete");
assert(foodTopicData.words.length === 27, "food word set is incomplete");
assert(foodSentenceBuilds.length === 2, "food sentence practice is incomplete");
assert(foodPreferencesTopicData.scenes.length === 4, "food preferences scenes are incomplete");
assert(mealsFeelingsTopicData.conversationPairs.length === 6, "meals conversation practice is incomplete");
assert(mealsFeelingsTopicData.pictureChoices.length === 6, "meals picture choices are incomplete");
assert(mealsFeelingsSentenceBuilds.length === 5, "meals sentence practice is incomplete");
assert(introductionsGamePrompts.length === 1, "introductions listening prompt is incomplete");
assert(introductionsBuildPhrases.length === 2, "introductions sentence practice is incomplete");
assert(ageBuildPhrases.length === 6, "age sentence practice is incomplete");
assert(identityCountries.length === 3, "identity country set is incomplete");
assert(greetingsPractice.length === 3, "greetings lesson scenes are incomplete");
assert(politePractice.length === 3, "polite words lesson scenes are incomplete");
assert(clothesMatchItems.length === 5, "clothes matching set is incomplete");
assert(familyPractice.length === 2, "family lesson scenes are incomplete");

const curriculumTopicIds = new Set([
  "numbers", "multiplication-rhyme", "greetings", "polite-words", "introductions", "age", "identity", "family", "body", "animals", "colours", "food", "food-preferences", "meals-feelings", "weekdays", "time-date", "dates", "stationery", "school-supplies", "classroom", "school", "school-subjects", "hobbies", "toys", "clothes", "comparisons", "positions", "transport", "daily-life", "weather"
]);
for (const book of books) {
  book.lessons.forEach((lesson) => assert(curriculumTopicIds.has(lesson.topicId), `book lesson references an unknown topic: ${lesson.topicId}`));
}
for (const category of [...topicGroups, ...learningHomeCategories]) {
  category.topicIds.forEach((topicId) => assert(curriculumTopicIds.has(topicId), `category references an unknown topic: ${topicId}`));
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Time & Daily Life data validation passed.");
}
