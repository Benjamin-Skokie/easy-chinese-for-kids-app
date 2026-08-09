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
import { stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "../src/features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "../src/features/school-life/school-supplies.js";
import { classroomTopicData } from "../src/features/school-life/classroom.js";
import { schoolSentenceBuilds, schoolTopicData } from "../src/features/school-life/school.js";
import { schoolSubjectsSentenceBuilds, schoolSubjectsTopicData } from "../src/features/school-life/school-subjects.js";
import { foodSentenceBuilds, foodTopicData } from "../src/features/food/food.js";
import { foodPreferencesTopicData } from "../src/features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds, mealsFeelingsTopicData } from "../src/features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "../src/features/foundations/introductions.js";
import { ageBuildPhrases, agePractice, ageTopic } from "../src/features/foundations/age.js";
import { identityConversation, identityCountries, identityQuestion, identityTopic } from "../src/features/foundations/identity.js";
import { greetingsGameItemIds, greetingsPractice, greetingsTopic } from "../src/features/foundations/greetings.js";
import { politeGameItemIds, politePractice, politeWordsTopic } from "../src/features/foundations/polite-words.js";
import { familyGameItemIds, familyPractice, familyTopic, illustratedFamily } from "../src/features/family/family.js";

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
  assert.match(legacySource, /const renderPracticeSayCards = renderSharedLessonPractice\.renderPracticeSayCards/);
  assert.match(legacySource, /const renderMatchPractice = renderSharedLessonPractice\.renderMatchPractice/);
  assert.doesNotMatch(legacySource, /function renderSharedLessonPractice\(/);
  assert.match(gameSource, /export function createSharedLessonPractice/);
  assert.match(gameSource, /renderSharedLessonPractice\.renderPracticeSayCards = renderPracticeSayCards/);
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

test("stationery owns its scenes, words, and practice rounds", () => {
  assert.equal(stationeryTopicData.sceneGroups[0].items.length, 4);
  assert.equal(stationeryTopicData.words.length, 10);
  assert.equal(stationerySentenceBuilds.length, 8);
  assert.equal(stationeryPictureMatchRounds.length, 3);
});

test("school supplies owns its scenes, words, and practice rounds", () => {
  assert.equal(schoolSuppliesTopicData.scenes.length, 2);
  assert.equal(schoolSuppliesTopicData.words.length, 10);
  assert.equal(schoolSuppliesSentenceBuilds.length, 6);
});

test("classroom owns its scenes, words, and sentence frames", () => {
  assert.equal(classroomTopicData.scenes.length, 3);
  assert.equal(classroomTopicData.words.length, 8);
  assert.equal(classroomTopicData.sentenceFrames.length, 3);
});

test("school owns its scenes, words, and sentence practice", () => {
  assert.equal(schoolTopicData.scenes.length, 7);
  assert.equal(schoolTopicData.words.length, 7);
  assert.equal(schoolSentenceBuilds.length, 7);
});

test("school subjects owns its scenes, words, and sentence practice", () => {
  assert.equal(schoolSubjectsTopicData.scenes.length, 6);
  assert.equal(schoolSubjectsTopicData.words.length, 6);
  assert.equal(schoolSubjectsSentenceBuilds.length, 6);
});

test("food owns its scenes, words, and sentence practice", () => {
  assert.equal(foodTopicData.scenes.length, 1);
  assert.equal(foodTopicData.words.length, 27);
  assert.equal(foodSentenceBuilds.length, 2);
});

test("food preferences owns its scenes and vocabulary", () => {
  assert.equal(foodPreferencesTopicData.scenes.length, 4);
  assert.equal(foodPreferencesTopicData.words.length, 4);
});

test("meals and feelings owns its scenes and practice activities", () => {
  assert.equal(mealsFeelingsTopicData.sceneGroups.length, 2);
  assert.equal(mealsFeelingsTopicData.conversationPairs.length, 6);
  assert.equal(mealsFeelingsTopicData.pictureChoices.length, 6);
  assert.equal(mealsFeelingsSentenceBuilds.length, 5);
});

test("introductions owns its scenes and practice activities", () => {
  assert.equal(introductionsTopic.id, "introductions");
  assert.equal(introductionsTopic.interactiveScene, "introductions-conversation");
  assert.equal(introductionsTopic.steps.length, 2);
  assert.equal(introductionsPractice.length, 3);
  assert.equal(introductionsGamePrompts.length, 1);
  assert.equal(introductionsBuildPhrases.length, 2);
});

test("age owns its scenes and sentence practice", () => {
  assert.equal(ageTopic.id, "age");
  assert.equal(ageTopic.interactiveScene, "age-conversation");
  assert.equal(ageTopic.steps.length, 2);
  assert.equal(agePractice.length, 2);
  assert.equal(ageBuildPhrases.length, 6);
});

test("identity owns its countries, question, and conversation", () => {
  assert.equal(identityTopic.id, "identity");
  assert.equal(identityTopic.interactiveScene, "identity-scenes");
  assert.equal(identityCountries.length, 3);
  assert.equal(identityQuestion.hanzi, "你是哪国人？");
  assert.equal(identityConversation.lines.length, 2);
});

test("greetings owns its template lesson scenes and listening set", () => {
  assert.equal(greetingsTopic.id, "greetings");
  assert.equal(greetingsTopic.interactiveScene, "greetings-conversation");
  assert.equal(greetingsPractice.length, 3);
  assert.equal(greetingsGameItemIds.length, 4);
});

test("polite words owns its template lesson scenes and listening set", () => {
  assert.equal(politeWordsTopic.id, "polite-words");
  assert.equal(politeWordsTopic.interactiveScene, "polite-phrases");
  assert.equal(politePractice.length, 3);
  assert.equal(politeGameItemIds.length, 4);
});

test("family owns its lesson metadata, scenes, and matching set", () => {
  assert.equal(familyTopic.id, "family");
  assert.equal(familyTopic.interactiveScene, "family-home");
  assert.equal(familyTopic.steps.length, 4);
  assert.equal(familyPractice.length, 2);
  assert.equal(familyGameItemIds.length, 6);
  assert.equal(Object.keys(illustratedFamily).length, 6);
});
