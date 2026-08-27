import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, normalize } from "node:path";
import test from "node:test";
import { createAudioService } from "../src/core/audio.js";
import { filterLessonContent, filterLessonGroups, lessonScopeKey } from "../src/core/lesson-scoping.js";
import { advanceShuffledOrder, nextRandomCycleId } from "../src/core/random-cycle.js";
import { lessonScopeFromLocation, topicIdFromLocation, topicPageUrl, viewFromLocation } from "../src/core/router.js";
import { timeDateWeekItems } from "../src/features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateRoutineItems } from "../src/features/time-daily-life/time.js";
import { datePracticeItems, timeDateDateItems, timeDateMonthItems } from "../src/features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonsTopic, comparisonVisualItems } from "../src/features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionsTopic, positionVisualItems } from "../src/features/time-daily-life/positions.js";
import { transportSentenceTokens, transportTopic, transportVisualItems } from "../src/features/time-daily-life/transport.js";
import { dailyLifeTopic, roomScenes, roomVisualItems } from "../src/features/time-daily-life/rooms.js";
import { stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "../src/features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "../src/features/school-life/school-supplies.js";
import { classroomTopicData } from "../src/features/school-life/classroom.js";
import { schoolSentenceBuilds, schoolTopicData } from "../src/features/school-life/school.js";
import { schoolSubjectsSentenceBuilds, schoolSubjectsTopicData } from "../src/features/school-life/school-subjects.js";
import { foodSentenceBuilds, foodTopic, foodTopicData } from "../src/features/food/food.js";
import { foodPreferencesTopic, foodPreferencesTopicData } from "../src/features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds, mealsFeelingsTopic, mealsFeelingsTopicData } from "../src/features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "../src/features/foundations/introductions.js";
import { ageBuildPhrases, agePractice, ageTopic } from "../src/features/foundations/age.js";
import { identityConversation, identityCountries, identityExploreCountries, identityLanguageQuestion, identityQuestion, identityTopic, languagesTopic, nationalityConversation } from "../src/features/foundations/identity.js";
import { greetingsGameItemIds, greetingsPractice, greetingsTopic } from "../src/features/foundations/greetings.js";
import { politeGameItemIds, politePractice, politeWordsTopic } from "../src/features/foundations/polite-words.js";
import { isItPracticeRounds, isItScene, isItTopic } from "../src/features/foundations/is-it.js";
import { requestBuildPhrases, requestGameItemIds, requestPractice, requestsPermissionTopic } from "../src/features/daily-life/requests-permission.js";
import { clothesBookWords, clothesMatchItems, clothesPractice, clothesSentenceItems, clothesTopic } from "../src/features/daily-life/clothes.js";
import { natureLesson, natureTopic, weatherLesson, weatherOutfitScenes, weatherTopic } from "../src/features/world/weather.js";
import { animalLessons, animalsTopic, petsTopic } from "../src/features/world/animals.js";
import { colourLessons, coloursTopic } from "../src/features/world/colours.js";
import { createWorldRuntime } from "../src/features/world/world-runtime.js";
import { hobbies3bTopic, hobbiesAtHomeTopic, hobbiesLeisureTopic, hobbiesTopic, toysTopic } from "../src/features/play-hobbies/play-hobbies.js";
import { createPlayHobbiesRuntime } from "../src/features/play-hobbies/play-hobbies-runtime.js";
import { bodyBonusItemIds, bodyCoreItemIds, bodyDiagramLayout, bodyTopic } from "../src/features/foundations/body.js";
import { illustratedKids } from "../src/data/characters.js";
import { bookHomeCategories, books, learningHomeCategories, topicCardMeta, topicGroups } from "../src/data/curriculum.js";
import { topicData } from "../src/data/topic-registry.js";
import { buildMultiplicationRhymeItems, buildNumberItem, multiplicationRhymeTopic, numberStages, numbersTopic } from "../src/features/foundations/numbers.js";
import { telephoneNumbersTopic, telephonePractice } from "../src/features/foundations/telephone-numbers.js";
import { createFoundationState } from "../src/features/foundations/state.js";
import { createGreetingsController } from "../src/features/foundations/greetings-controller.js";
import { createPoliteWordsController } from "../src/features/foundations/polite-words-controller.js";
import { createIntroductionsController } from "../src/features/foundations/introductions-controller.js";
import { familyGameItemIds, familyPractice, familyTopic, illustratedFamily } from "../src/features/family/family.js";

test("the local page loads a single bundled application script", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=20260825-number-feedback-v3" \/>/);
  assert.match(html, /<script src="app\.js\?v=20260825-lesson-scope-v2"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
  assert.doesNotMatch(html, /Tap a word to hear it and explore the picture\./);
  assert.doesNotMatch(html, /<h3>Review<\/h3>/);
});

test("absolute filesystem paths are rejected before commits and deployment", () => {
  const packageSource = readFileSync("package.json", "utf8");
  const workflowSource = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
  assert.match(packageSource, /"check:paths": "node scripts\/check_relative_paths\.mjs"/);
  assert.match(packageSource, /"setup:hooks": "git config core\.hooksPath \.githooks"/);
  assert.match(readFileSync(".githooks/pre-commit", "utf8"), /check_relative_paths\.mjs --staged/);
  assert.match(readFileSync(".githooks/commit-msg", "utf8"), /check_relative_paths\.mjs --message-file/);
  assert.match(workflowSource, /run: npm run check:paths/);
  assert.match(workflowSource, /check_relative_paths\.mjs --commit-range/);
});

test("topic scenes use short English titles instead of ordinal labels", () => {
  const sceneRenderers = [
    "src/features/foundations/greetings-controller.js",
    "src/features/foundations/introductions-controller.js",
    "src/features/foundations/age-controller.js",
    "src/features/foundations/polite-words-controller.js",
    "src/features/foundations/foundations-runtime.js",
    "src/features/time-daily-life/time-daily-life-runtime.js"
  ].map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(sceneRenderers, /Scene \$\{/);
  assert.doesNotMatch(sceneRenderers, /exchange\.prompt|scene\.prompt/);
  assert.match(readFileSync("src/features/world/weather.js", "utf8"), /title: "Rainy day"/);
  assert.match(readFileSync("src/features/world/animals.js", "utf8"), /title: "Pets at home"/);
  assert.match(readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8"), /sceneTitle = \(id\)/);
});

test("scene and practice learner copy share the same Chinese, pinyin, and English type scale", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /--learner-hanzi-size: 1\.3rem;/);
  assert.match(styles, /--learner-pinyin-size: 0\.95rem;/);
  assert.match(styles, /--learner-english-size: 1\.1rem;/);
  for (const selector of ["telephone-line-hanzi", "numbers-game-hanzi", "weather-fill-sentence", "animals-measure-prompt", "multiplication-line-hanzi", "body-match-hanzi", "time-asset-hanzi", "visual-topic-note-hanzi"]) {
    assert.match(styles, new RegExp(`\\.${selector.replace("-", "-")} \\{[\\s\\S]{0,180}font-size: var\\(--learner-hanzi-size\\)`));
  }
  assert.doesNotMatch(styles, /sentence-choice-options \.numbers-game-(hanzi|pinyin|english)/);
  assert.doesNotMatch(styles, /\.greetings-line-stack\.is-compact/);
  assert.doesNotMatch(readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8"), /greetings-line-stack is-compact/);
});

test("Comparisons uses illustrated pairs as scenes and individual characters as Book words", () => {
  const runtimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(runtimeSource, /const comparisonScenes = sceneId === "comparisons"/);
  assert.match(runtimeSource, /school-scene-grid comparison-scene-grid/);
  assert.match(runtimeSource, /data-comparison-scene/);
  assert.match(runtimeSource, /const comparisonWords = sceneId === "comparisons"[\s\S]{0,900}Book words[\s\S]{0,300}comparison-word-grid/);
  assert.match(runtimeSource, /\$\{comparisonScenes \|\| transportScenes \|\| `<div class="time-months-heading">/);
  assert.match(styles, /\.comparison-word-grid \{\s+display: grid;\s+grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
});

test("Transport keeps its illustrated sentence cards in Scenes", () => {
  const runtimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  const transportSource = readFileSync("src/features/time-daily-life/transport.js", "utf8");
  assert.match(runtimeSource, /const transportScenes = sceneId === "transport"/);
  assert.match(runtimeSource, /school-scene-grid transport-scene-grid/);
  assert.match(runtimeSource, /data-transport-scene/);
  assert.match(runtimeSource, /comparisonScenes \|\| transportScenes \|\|/);
  assert.match(transportSource, /sceneTitle:/);
});

test("Dates and months use standard scene cards", () => {
  const runtimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(runtimeSource, /school-scene-grid date-scene-grid/);
  assert.match(runtimeSource, /data-date-scene/);
  assert.match(runtimeSource, /school-scene-grid month-scene-grid/);
  assert.match(runtimeSource, /data-month-scene/);
  assert.match(runtimeSource, /telephone-line-hanzi">\$\{item\.context\}/);
  assert.match(runtimeSource, /function scopedDateContent\(items\) \{[\s\S]{0,220}state\.lessonScope/);
  assert.match(styles, /\.date-scene-grid \.school-scene-image \{\s+object-fit: contain;/);
  assert.match(styles, /\.month-scene-grid \.school-scene-image \{\s+object-fit: contain;/);
});

test("all phone scene grids use one portrait column and aligned landscape headers", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /@media \(max-width: 760px\) and \(orientation: portrait\) \{\s+\.school-scene-grid,[\s\S]{0,240}\.time-routine-scene-grid,[\s\S]{0,240}grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(styles, /@media \(max-width: 760px\) and \(orientation: landscape\) \{\s+\.school-scene-grid,[\s\S]{0,300}\.toys-scene-grid \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(styles, /@media \(max-width: 760px\) and \(orientation: landscape\) \{[\s\S]{0,600}\.school-scene-grid \.greetings-exchange-top,[\s\S]{0,300}\.greetings-practice-grid \.greetings-exchange-top \{\s+min-height: 58px;/);
  assert.match(styles, /\.greetings-practice-grid > \.greetings-exchange \{\s+grid-template-rows: minmax\(58px, auto\) minmax\(0, 1fr\);/);
  assert.match(styles, /@media \(max-width: 760px\) \{\s+\.school-scene-grid \.greetings-exchange-top,[\s\S]{0,360}\.greetings-practice-grid \.greetings-exchange-top \{\s+flex-direction: row;\s+align-items: flex-start;/);
  assert.match(styles, /\.school-scene-grid \.small-button\.is-play-button,[\s\S]{0,380}\.greetings-practice-grid \.small-button\.is-play-button \{\s+width: 46px !important;\s+height: 46px;/);
});

test("phone matching games keep their left and right columns together", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.polite-match-board,[\s\S]{0,220}\.body-match-open-board \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);\s+gap: 8px;/);
  assert.match(styles, /@media \(max-width: 760px\) and \(orientation: portrait\) \{[\s\S]{0,900}\.lesson-practice-shell \.polite-match-card \{\s+height: auto;\s+min-height: 92px;/);
});

test("portrait phone navigation keeps display controls compact", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /@media \(max-width: 760px\) and \(orientation: portrait\) \{[\s\S]{0,500}\.learning-display-controls \{\s+gap: 4px;\s+padding-left: 4px;/);
  assert.match(styles, /\.learning-display-toggle \{\s+width: 44px;\s+height: 44px;\s+border-radius: 12px;/);
});

test("Comparisons keeps its sole new-game control at the top right", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  assert.match(practiceSource, /is-practice-advance-button" type="button" data-comparison-build-new aria-label="Start a new game">New game<\/button>/);
  assert.match(practiceSource, /\[data-comparison-build-new\]"\)\?\.addEventListener\("click", nextComparisonBuilder\)/);
  assert.doesNotMatch(practiceSource, /data-comparison-build-next/);
});

test("Number choice cards use the same two-column language layout for every range", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.numbers-game-option\[data-number-game-guess\] \{\s+grid-template-columns: minmax\(4\.5rem, 0\.7fr\) minmax\(0, 1fr\);/);
  assert.match(styles, /data-number-game-guess\] \.numbers-game-hanzi,[\s\S]{0,120}grid-column: 1;/);
  assert.match(styles, /data-number-game-guess\] \.numbers-game-pinyin,[\s\S]{0,120}grid-column: 2;/);
  assert.match(styles, /\.numbers-game-option\.is-correct,[\s\S]{0,220}background: linear-gradient\(180deg, #f4fbf0, #dcefd2\);/);
  assert.match(styles, /\.numbers-game-option\.is-wrong,[\s\S]{0,220}background: linear-gradient\(180deg, #fff7f4, #f7ded8\);/);
  assert.match(practiceSource, /numberChallengeWrongValues\.has\(value\)/);
  assert.match(practiceSource, /border-color: #5f8f51; background: #dcefd2/);
  assert.match(practiceSource, /border-color: #be5b49; background: #f7ded8/);
  assert.match(practiceSource, /button\.style\.background = correct \? "#dcefd2" : "#f7ded8"/);
  assert.match(practiceSource, /data-number-game-guess="\$\{value\}" style="\$\{feedbackStyle\}" \$\{state\.numberChallengeResult === "correct" \? "disabled" : ""\}/);
  assert.match(foundationsSource, /state\.numberChallengeResult = "correct"/);
  assert.match(foundationsSource, /state\.numberChallengeWrongValues = new Set/);
  assert.doesNotMatch(foundationsSource, /Here comes a new round/);
});

test("listen-and-choose games show card-level correct or wrong feedback", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const ageControllerSource = readFileSync("src/features/foundations/age-controller.js", "utf8");
  assert.match(practiceSource, /data-age-game-guess="\$\{item\.id\}" \$\{state\.ageChallengeResult === "correct" \? "disabled" : ""\}/);
  assert.match(practiceSource, /state\.ageChallengeWrongIds\.has\(item\.id\)/);
  assert.match(ageControllerSource, /state\.ageChallengeResult = "correct"/);
  assert.match(ageControllerSource, /state\.ageChallengeWrongIds = new Set/);
});

test("Everyday Actions keeps one silent new-game button in the practice header", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const timeRuntimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  assert.match(practiceSource, /is-practice-advance-button" type="button" data-everyday-actions-new aria-label="Start a new game">New game<\/button>/);
  assert.match(practiceSource, /\[data-everyday-actions-new\]"\)\?\.addEventListener\("click", nextEverydayActionsQuestion\)/);
  assert.doesNotMatch(practiceSource, /data-everyday-actions-play/);
  assert.match(timeRuntimeSource, /handleEverydayActionsPick[\s\S]{0,500}state\.everydayActionsResult === "correct"[\s\S]{0,160}speak\(currentEverydayAction\(\)\?\.sentence, 0\.78\)/);
  assert.doesNotMatch(practiceSource, /data-everyday-actions-next/);
});

test("Greetings starts a different listen-and-choose round after a correct answer", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const controllerSource = readFileSync("src/features/foundations/greetings-controller.js", "utf8");
  const sharedPracticeSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  assert.match(practiceSource, /playLabel: \(\) => state\.greetingsChallengeResult === "correct" \? "New game" : "Play"/);
  assert.match(sharedPracticeSource, /const playLabel = typeof config\.playLabel === "function" \? config\.playLabel\(\) : \(config\.playLabel \?\? "Play"\)/);
  assert.match(controllerSource, /state\.greetingsChallengeResult === "correct"[\s\S]{0,300}resetGreetingsChallenge\(\{[\s\S]{0,360}speak\(nextItem\.audio, 0\.78\)/);
  assert.match(controllerSource, /nextRandomCycleId\(state, "greetings-listen", items\.map\(\(item\) => item\.id\)\)/);
});

test("evaluated practice choices keep visible correct or wrong feedback", () => {
  const sharedPracticeSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");

  assert.match(sharedPracticeSource, /wrongPhraseIds\?\.\(\)\.has\(id\)/);
  assert.match(sharedPracticeSource, /wrongMeaningIds\?\.\(\)\.has\(id\)/);
  for (const game of ["nationality", "weekday", "family", "greetings", "polite", "date"]) {
    assert.match(practiceSource, new RegExp(`wrongPhraseIds: \\(\\) => state\\.${game}MatchWrongPhraseIds`));
    assert.match(practiceSource, new RegExp(`wrongMeaningIds: \\(\\) => state\\.${game}MatchWrongMeaningIds`));
  }
  assert.match(foundationsSource, /bodyMatchWrongChineseIds[\s\S]{0,800}answer-result-mark/);
  assert.match(foundationsSource, /telephoneWrongQuestionIds[\s\S]{0,2200}telephoneWrongAnswerIds/);
  assert.match(schoolSource, /backpackGameFeedback[\s\S]{0,1000}Correct!/);
  assert.match(schoolSource, /foodHungerFeedback[\s\S]{0,1200}Correct!/);
});

test("My Family matching keeps paired cards aligned and one round-reset control", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(practiceSource, /const familyPracticeSummary = \{[\s\S]{0,700}shellClass: "family-lesson-practice-shell"/);
  assert.match(practiceSource, /feedback: \(\) => state\.familyMatchFeedback,[\s\S]{0,100}showPlayAgain: false/);
  assert.match(styles, /\.family-lesson-practice-shell \.family-match-open-board \.polite-match-card \{[\s\S]{0,120}height: 104px;/);
});

test("lesson scope keeps all-topic content first and filters every My Family section", () => {
  const detailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");

  assert.match(detailSource, /topicLessonStrip\.innerHTML = allContentCard \+ steps/);
  assert.match(detailSource, /const allContentCard = steps\.length > 1/);
  assert.match(detailSource, /<strong>\$\{topicLessonTitle\(topic, step\)\}<\/strong>/);
  assert.match(detailSource, /topicSummary\.textContent = scopedStep\?\.note \?\? topic\.summary/);
  assert.match(detailSource, /event\.target\.closest\("\[data-topic-all-content\]"\)/);
  assert.match(detailSource, /state\.lessonScope = null;[\s\S]{0,100}syncBookSelectionFromTopic\(\)/);
  assert.match(foundationsSource, /familyBookWordItems\(\)[\s\S]{0,360}lessonSources\?\.includes\(source\)/);
  assert.match(foundationsSource, /familyPractice[\s\S]{0,800}lessonSources\?\.includes/);
  assert.match(foundationsSource, /family: state\.lessonScope[\s\S]{0,800}"1b:2"/);
  assert.match(foundationsSource, /familyLessonTheme[\s\S]{0,1500}"2a:2"/);
  assert.match(practiceSource, /familyPracticeSummary[\s\S]{0,700}"3a:4"/);
  assert.match(practiceSource, /items: familyGameItems,/);
});

test("My Family sentence choices center their labels", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.family-sentence-builder \.numbers-game-option \{[\s\S]{0,100}justify-items: center;[\s\S]{0,100}text-align: center;/);
});

test("random practice cycles show every prompt before repeating", () => {
  const state = {};
  const ids = ["one", "two", "three", "four"];
  const firstPass = ids.map(() => nextRandomCycleId(state, "test", ids, () => 0.25));
  assert.equal(new Set(firstPass).size, ids.length);
  assert.deepEqual(new Set(firstPass), new Set(ids));
  assert.notEqual(nextRandomCycleId(state, "test", ids, () => 0.25), firstPass.at(-1));

  const orderState = { order: ["one", "two", "three"], index: 2 };
  advanceShuffledOrder(orderState, "order", "index", (items) => [...items]);
  assert.equal(orderState.index, 0);
  assert.equal(orderState.order[0], "one");
});

test("Culture book image references are present and committed for GitHub Pages", () => {
  const pages = [];
  const collectBookPages = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filePath = join(directory, entry.name);
      if (entry.isDirectory()) collectBookPages(filePath);
      if (entry.isFile() && entry.name === "index.html") pages.push(filePath);
    }
  };
  collectBookPages("culture/books");

  for (const pagePath of pages) {
    const html = readFileSync(pagePath, "utf8");
    for (const match of html.matchAll(/(?:src|href)="([^\"]+)"/g)) {
      const assetUrl = match[1];
      if (!/^\.?\/?images\/.+\.(?:webp|png|jpe?g|gif|svg)(?:[?#].*)?$/i.test(assetUrl)) continue;
      const assetPath = normalize(join(pagePath, "..", assetUrl.split(/[?#]/)[0]));
      assert.ok(existsSync(assetPath), `${pagePath} references a missing image: ${assetUrl}`);
      const tracked = spawnSync("git", ["ls-files", "--error-unmatch", assetPath], { encoding: "utf8" });
      assert.equal(tracked.status, 0, `${pagePath} references an image not committed for GitHub Pages: ${assetUrl}`);
    }
  }
});

test("the Chinese landing-page headline is slightly reduced while keeping its original palette", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.library-hero h1 \{[\s\S]*font-size: clamp\(2\.3rem, 4vw, 3\.4rem\)[\s\S]*background: linear-gradient\(135deg, #7c5420, #b8863e\)/);
  assert.match(stylesSource, /\.library-hero h2 \{[\s\S]*font-size: clamp\(1\.3rem, 2\.2vw, 1\.7rem\)[\s\S]*color: var\(--sun\)/);
});

test("the landing hero features six scrollable culture-story highlights", () => {
  const html = readFileSync("index.html", "utf8");
  const carouselSource = readFileSync("src/core/story-highlights.js", "utf8");
  assert.match(html, /<section class="story-highlights" data-story-highlights/);
  assert.equal((html.match(/data-story-highlight-dot=/g) ?? []).length, 6);
  assert.match(html, /culture\/books\/folk-tales\/monkey-king\/index\.html/);
  assert.match(html, /culture\/books\/figures\/mulan\/index\.html/);
  assert.match(html, /culture\/books\/politics\/emperor-day\/index\.html/);
  assert.match(carouselSource, /viewport\.scrollTo/);
});

test("culture is an in-page landing view with category cards and no duplicate culture hero", () => {
  const landingHtml = readFileSync("index.html", "utf8");
  const cultureHtml = readFileSync("culture/index.html", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(landingHtml, /href="#culture-panel" data-global-view="culture"/);
  assert.match(landingHtml, /id="culture-panel"/);
  assert.match(landingHtml, /href="#culture-philosophy"/);
  assert.match(landingHtml, /id="culture-economy"/);
  assert.match(landingHtml, /id="culture-military"/);
  assert.match(landingHtml, /culture\/books\/philosophy\/yin-yang\/index\.html/);
  assert.match(landingHtml, /id="culture-panel"[\s\S]*id="culture-philosophy"[\s\S]*id="culture-folk-tales"[\s\S]*<\/section>\s*<\/section>\s*<section id="topic-detail"/);
  assert.match(stylesSource, /\.culture-category-section \.topic\.done \{\s*border: 1px solid rgba\(240, 168, 48, 0\.25\);\s*background: var\(--paper-soft\)/);
  assert.match(stylesSource, /\.culture-category-section \.topic\.done \.zh \{\s*color: var\(--cat-accent, var\(--berry\)\);/);
  assert.match(readFileSync("src/core/navigation-runtime.js", "utf8"), /card\.style\.getPropertyValue\("--cat-accent"\)/);
  assert.doesNotMatch(cultureHtml, /发现中国文化/);
  assert.equal(viewFromLocation({ search: "", hash: "#culture-panel" }), "culture");
  assert.equal(viewFromLocation({ search: "", hash: "#culture-philosophy" }), "culture");
});

test("Learn by Books shows each textbook directly and links lessons to topic practice", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(navigationSource, /class="learning-home-board book-library-grid"/);
  assert.match(navigationSource, /data-book-browser="\$\{entry\.id\}"/);
  assert.match(navigationSource, /data-book-lesson-section="\$\{entry\.id\}"/);
  assert.match(navigationSource, /主题练习：\$\{topicMeta\?\.zhTitle/);
  assert.doesNotMatch(navigationSource, /data-book-category-card/);
});

test("sticky category navigation highlights the final item at the bottom of the page", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(navigationSource, /const atPageBottom = \(\) =>/);
  assert.match(navigationSource, /activeCategoryId = sections\[sections\.length - 1\]/);
  assert.match(navigationSource, /activeBookId = bookSections\[bookSections\.length - 1\]/);
});

test("direct topic links immediately focus the topic detail for every topic", () => {
  const landingHtml = readFileSync("index.html", "utf8");
  const runtimeWiringSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(landingHtml, /href="#topics-panel" data-global-view="topics">← Back to Topics/);
  assert.match(runtimeWiringSource, /if \(initialTopicId\) \{\s*requestAnimationFrame\(\(\) => focusLearningPanel\(\)\);/);
  assert.match(navigationSource, /state\.topicPageOpen = true;\s*syncBookSelectionFromTopic\(\);\s*renderTopics\(\);/);
  assert.match(stylesSource, /html \{\s*scroll-behavior: auto;/);
});

test("the generated bundle keeps its source-of-truth marker", () => {
  const bundle = readFileSync("app.js", "utf8");
  assert.match(bundle, /This file is automatically generated from src\/main\.js\. Do not edit manually/);
});

test("the lazy-image trial keeps the first lesson scene eager and game art lazy", () => {
  const imageLoadingSource = readFileSync("src/core/image-loading.js", "utf8");
  const worldSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  assert.match(imageLoadingSource, /loading="eager" decoding="async"/);
  assert.match(imageLoadingSource, /loading="lazy" decoding="async"/);
  assert.match(worldSource, /imageLoadingAttrs\(\{ primary: index === 0 \}\)/);
  assert.match(practiceSource, /imageLoadingAttrs\(\)/);
});

test("randomized practice keeps its single green new-game control in the header", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  const lessonSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  const worldSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  assert.match(stylesSource, /\.small-button\.is-practice-advance-button/);
  assert.match(lessonSource, /is-practice-advance-button" type="button" data-room-build-new/);
  assert.match(lessonSource, /is-practice-advance-button" type="button" data-number-game-refresh/);
  assert.match(lessonSource, /numbers-game-top[\s\S]*data-clothes-quiz-new[\s\S]*clothes-quiz-visual/);
  assert.match(schoolSource, /is-practice-advance-button" type="button" data-stationery-picture-match-new/);
  assert.match(worldSource, /is-practice-advance-button" type="button" data-world-colour-new/);
  assert.match(foundationsSource, /is-practice-advance-button" type="button" data-body-reset-match/);
  assert.doesNotMatch(lessonSource, /data-(room-build|comparison-build|position-quiz|transport-build|clock-quiz|time-routine-quiz|clothes-quiz)-next/);
  assert.doesNotMatch(schoolSource, /data-(school-build|stationery-picture-match|meals-picture)-next/);
  assert.doesNotMatch(worldSource, /data-world-colour-next/);
  assert.doesNotMatch(foundationsSource, /data-body-(next-round|play-again)/);
});

test("picture-led practice cards keep their image centered", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.clothes-quiz-visual \{[\s\S]*margin: 0 auto;[\s\S]*justify-self: center;/);
  assert.match(stylesSource, /\.clothes-quiz-image \{[\s\S]*object-fit: contain;/);
});

test("Leisure Time uses Tiantian for the park soccer scene", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(runtimeSource, /天天在公园踢足球/);
  assert.match(runtimeSource, /tokens: \["天天", "在", "公园", "踢足球"\]/);
});

test("Leisure Time sentence builder shows its word-order scaffold", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(runtimeSource, /const leisureSlots = \["Who", "在", "Where", "What"\]/);
  assert.match(runtimeSource, /hobbies-sentence-slot/);
});

test("Leisure Time uses the shared site-wide Tingting preference", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(runtimeSource, /const speakLesson = \(text, rate\) => speak\(text, rate\);/);
  assert.doesNotMatch(runtimeSource, /const voiceNames/);
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

test("audio prefers Tingting over other installed Chinese voices", () => {
  const spoken = [];
  const tingting = { name: "Tingting", lang: "zh-CN" };
  const meijia = { name: "Meijia", lang: "zh-CN" };
  const audio = createAudioService({
    synthesis: { cancel: () => {}, speak: (utterance) => spoken.push(utterance), getVoices: () => [{ name: "Eddy", lang: "zh-CN" }, tingting, meijia] },
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
  assert.equal(topicPageUrl(location, "family", { bookId: "1b", lessonNumber: 2 }), "/index.html?topic=family&book=1b&lesson=2#topic-detail");
  assert.deepEqual(lessonScopeFromLocation({ pathname: "/", search: "?topic=family&book=1b&lesson=2", hash: "#topic-detail" }, books, "family"), { bookId: "1b", lessonNumber: 2 });
  assert.equal(lessonScopeFromLocation({ pathname: "/", search: "?topic=family&book=1b&lesson=2", hash: "#topic-detail" }, books, "numbers"), null);
  assert.doesNotMatch(topicPageUrl({ pathname: "/", search: "", hash: "" }, "time-date"), /^undefined/);
});

test("lesson scoping keeps enrichment in all-topic content and filters grouped content strictly", () => {
  const scope = { bookId: "1b", lessonNumber: 7 };
  const items = [{ id: "fruit", lessonSources: ["1b:7"] }, { id: "enrichment" }, { id: "snack", lessonSources: ["2b:7"] }];
  assert.equal(lessonScopeKey(scope), "1b:7");
  assert.deepEqual(filterLessonContent(items, scope).map((item) => item.id), ["fruit"]);
  assert.deepEqual(filterLessonContent(items).map((item) => item.id), ["fruit", "enrichment", "snack"]);
  assert.deepEqual(filterLessonGroups([{ id: "fruit", items }, { id: "empty", items: [{ id: "snack", lessonSources: ["2b:7"] }] }], scope).map((group) => group.id), ["fruit"]);
});

test("the remaining multi-lesson topics tag their lesson-owned content", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  const owned = (items, source) => filterLessonContent(items, { bookId: source.slice(0, 2), lessonNumber: Number(source.slice(3)) });
  assert.ok(owned(bodyTopic.focusItems, "1b:3").length);
  assert.ok(owned(bodyTopic.focusItems, "1b:4").length);
  assert.ok(owned(introductionsTopic.focusItems, "1a:6").length && owned(introductionsPractice, "1a:6").length && owned(introductionsBuildPhrases, "1a:6").length);
  assert.ok(owned(introductionsTopic.focusItems, "2a:3").length && owned(introductionsPractice, "2a:3").length && owned(introductionsBuildPhrases, "2a:3").length);
  assert.ok(owned(ageTopic.focusItems, "1a:7").length && owned(agePractice, "1a:7").length && owned(ageBuildPhrases, "1a:7").length);
  assert.ok(owned(ageTopic.focusItems, "3a:3").length && owned(agePractice, "3a:3").length && owned(ageBuildPhrases, "3a:3").length);
  assert.ok(owned(timeDateDateItems, "3a:2").length && owned(timeDateMonthItems, "3a:2").length && owned(datePracticeItems, "3a:2").length);
  assert.ok(owned(timeDateDateItems, "3a:3").length && owned(datePracticeItems, "3a:3").length);
  const datesTopic = topicData.find((topic) => topic.id === "dates");
  assert.ok(owned(datesTopic.focusItems, "3a:2").length && owned(datesTopic.focusItems, "3a:3").length);
  assert.ok(owned(classroomTopicData.scenes, "2b:4").length && owned(classroomTopicData.words, "2b:4").length && owned(classroomTopicData.sentenceFrames, "2b:4").length && owned(classroomTopicData.review, "2b:4").length);
  assert.ok(owned(classroomTopicData.scenes, "3b:2").length && owned(classroomTopicData.words, "3b:2").length && owned(classroomTopicData.sentenceFrames, "3b:2").length && owned(classroomTopicData.review, "3b:2").length);
  assert.match(navigationSource, /const scopedItems = forSelectedLesson\(defaultItems\);[\s\S]{0,360}return scopedItems\.length \? scopedItems : defaultItems;/);
  for (const source of ["2a:6", "3a:7", "4b:2"]) {
    assert.ok(owned(clothesBookWords, source).length && owned(clothesPractice, source).length && owned(clothesMatchItems, source).length && owned(clothesSentenceItems, source).length);
  }
});

test("shared lesson practice is provided by an explicit game factory", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const gameSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  assert.match(legacySource, /createSharedLessonPractice\(\{[\s\S]*elements:/);
  assert.match(legacySource, /const renderPracticeSayCards = renderSharedLessonPractice\.renderPracticeSayCards/);
  assert.match(legacySource, /const renderMatchPractice = renderSharedLessonPractice\.renderMatchPractice/);
  assert.doesNotMatch(legacySource, /function renderSharedLessonPractice\(/);
  assert.match(gameSource, /export function createSharedLessonPractice/);
  assert.match(gameSource, /renderSharedLessonPractice\.renderPracticeSayCards = renderPracticeSayCards/);
});

test("legacy bootstrap retains its shared data and audio bindings", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const registrySource = readFileSync("src/data/topic-registry.js", "utf8");
  assert.match(legacySource, /const \{ chineseUtterance, speak, speakSceneLines \} = createAudioService/);
  assert.match(legacySource, /from "\.\.\/data\/topic-registry\.js"/);
  assert.match(registrySource, /export const visualTopicItems = \{/);
  assert.match(registrySource, /export const schoolTopicData = \{/);
  assert.match(registrySource, /export const schoolSentenceBuilds = \{/);
});

test("school and food runtime is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.match(legacySource, /createSchoolFoodRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function schoolPracticeItems\(/);
  assert.doesNotMatch(legacySource, /function renderFoodPractice\(/);
  assert.doesNotMatch(legacySource, /function renderSchoolExplorer\(/);
  assert.match(runtimeSource, /export function createSchoolFoodRuntime/);
  assert.match(runtimeSource, /function renderSchoolExplorer\(/);
  assert.match(runtimeSource, /function schoolWordGroups\(/);
});

test("time and daily life runtime is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  assert.match(legacySource, /createTimeDailyLifeRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function resetWeekdayChallenge\(/);
  assert.doesNotMatch(legacySource, /function renderTimeDateExplorer\(/);
  assert.match(runtimeSource, /export function createTimeDailyLifeRuntime/);
});

test("foundations runtime is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  assert.match(legacySource, /createFoundationsRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function familyGameItems\(/);
  assert.doesNotMatch(legacySource, /function renderNumbersExplorer\(/);
  assert.match(runtimeSource, /export function createFoundationsRuntime/);
  assert.match(runtimeSource, /familyPractice/);
  assert.match(legacySource, /familyPractice,/);
  assert.match(runtimeSource, /bodySentenceForItem/);
  assert.match(legacySource, /bodySentenceForItem,/);
});

test("feature runtimes initialize before the first landing-page render", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const openTopicPageStart = legacySource.indexOf("function openTopicPage(");
  const openTopicPageEnd = legacySource.indexOf("function switchView(", openTopicPageStart);
  const initialRender = legacySource.lastIndexOf("renderTopics();");
  const openTopicPageSource = legacySource.slice(openTopicPageStart, openTopicPageEnd);

  assert.doesNotMatch(openTopicPageSource, /create(?:SchoolFood|TimeDailyLife|Foundations)Runtime\(/);
  assert.ok(legacySource.indexOf("createSchoolFoodRuntime({") < initialRender);
  assert.ok(legacySource.indexOf("createTimeDailyLifeRuntime({") < initialRender);
  assert.ok(legacySource.indexOf("createFoundationsRuntime({") < initialRender);
});

test("navigation and landing-page behavior is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(legacySource, /createNavigationRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function openTopicPage\(/);
  assert.doesNotMatch(legacySource, /function renderTopics\(/);
  assert.match(runtimeSource, /export function createNavigationRuntime/);
  assert.match(runtimeSource, /function openTopicPage\(/);
  assert.match(runtimeSource, /function renderTopics\(/);
});

test("global view-event bindings stay outside the application composition root", () => {
  const wiringSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const eventSource = readFileSync("src/core/view-navigation-events.js", "utf8");

  assert.match(wiringSource, /import \{ bindViewNavigationEvents \} from "\.\.\/core\/view-navigation-events\.js"/);
  assert.match(wiringSource, /bindViewNavigationEvents\(\{ state, switchView, updateTopicPageVisibility \}\)/);
  assert.doesNotMatch(wiringSource, /document\.querySelectorAll\("\[data-global-view\]"\)/);
  assert.match(eventSource, /export function bindViewNavigationEvents/);
  assert.match(eventSource, /\[data-global-view\]/);
  assert.match(eventSource, /window\.history\.pushState\(null, "", `\$\{window\.location\.pathname\}\$\{viewHash\(link\.dataset\.globalView\)\}`\)/);
});

test("shared focus behavior is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/core/focus-runtime.js", "utf8");
  assert.match(legacySource, /createFocusRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function renderFocusWordList\(/);
  assert.doesNotMatch(legacySource, /function selectFocusItem\(/);
  assert.match(runtimeSource, /export function createFocusRuntime/);
  assert.match(runtimeSource, /function renderFocusWordList\(/);
  assert.match(runtimeSource, /function selectFocusItem\(/);
});

test("focus explorer dispatch is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/core/focus-explorer-runtime.js", "utf8");
  assert.match(legacySource, /createFocusExplorerRuntime\(\{/);
  assert.doesNotMatch(legacySource, /if \(topic\.interactiveScene === "body-face"\)/);
  assert.match(runtimeSource, /export function createFocusExplorerRuntime/);
  assert.match(runtimeSource, /if \(topic\.interactiveScene === "body-face"\)/);
});

test("shared lesson practice dispatch is separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  assert.match(legacySource, /createLessonPracticeRuntime\(\{/);
  assert.doesNotMatch(legacySource, /function sharedLessonPracticeConfig\(/);
  assert.match(legacySource, /return lessonPracticeRuntime\?\.renderActivityPanel\(topic\)/);
  assert.match(runtimeSource, /export function createLessonPracticeRuntime/);
  assert.match(runtimeSource, /function sharedLessonPracticeConfig\(/);
  assert.match(runtimeSource, /function renderActivityPanel\(/);
});

test("topic detail rendering and history events are separated from the legacy bootstrap", () => {
  const legacySource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const runtimeSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  assert.match(legacySource, /createTopicDetailRuntime\(\{/);
  assert.match(legacySource, /return topicDetailRuntime\?\.renderTopicDetail/);
  assert.doesNotMatch(legacySource, /function renderTopicLessonStrip\(/);
  assert.match(runtimeSource, /export function createTopicDetailRuntime/);
  assert.match(runtimeSource, /function bindTopicDetailEvents\(/);
  assert.match(runtimeSource, /function renderTopicDetail\(/);
});

test("every learning topic link boots after runtime composition", () => {
  const bootstrap = `
class Element {
  constructor() {
    this.classList = { add() {}, remove() {}, toggle() {} };
    this.style = { setProperty() {} };
    this.dataset = {};
    this.hidden = false;
    this.innerHTML = "";
    this.textContent = "";
    this.value = "";
  }
  addEventListener() {}
  appendChild() {}
  setAttribute() {}
  removeAttribute() {}
  querySelectorAll() { return []; }
  querySelector() { return new Element(); }
  closest() { return null; }
  getBoundingClientRect() { return { top: 0, height: 0 }; }
}
const makeElement = () => new Element();
globalThis.document = {
  getElementById: makeElement, querySelector: makeElement, querySelectorAll: () => [],
  createElement: makeElement, body: makeElement(), documentElement: { style: { scrollBehavior: "" } }
};
globalThis.window = {
  location: { pathname: "/index.html", search: \`?topic=\${process.env.TOPIC}\`, hash: "#topic-detail" },
  history: { pushState() {}, replaceState() {} }, addEventListener() {}, setTimeout, clearTimeout,
  scrollY: 0, scrollTo() {}, speechSynthesis: { cancel() {}, speak() {}, getVoices() { return []; } }
};
globalThis.requestAnimationFrame = (callback) => callback();
await import(\`./src/app/runtime-wiring.js?topic=\${process.env.TOPIC}\${Date.now()}\`);
`;

  for (const topic of topicData) {
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", bootstrap], {
      cwd: process.cwd(),
      env: { ...process.env, TOPIC: topic.id },
      encoding: "utf8"
    });
    assert.equal(result.status, 0, `${topic.id} failed to boot:\n${result.stderr}`);
  }
});

test("greetings interaction is owned by its feature controller", () => {
  const state = { ...createFoundationState(), tapAudioEnabled: false, selectedFocusItemId: null };
  const rendered = [];
  const controller = createGreetingsController({
    state,
    greetingsGameItemIds,
    greetingsPractice,
    topicById: (id) => id === "greetings" ? greetingsTopic : null,
    shuffleArray: (items) => [...items],
    speak: () => {},
    speakSceneLines: () => {},
    currentTopic: () => greetingsTopic,
    currentFocusItem: () => greetingsTopic.focusItems.find((item) => item.id === state.selectedFocusItemId),
    currentBook: () => ({ label: "Book 1A" }),
    currentLesson: () => ({ lesson: 4 }),
    resetListenChallengeResult: () => {},
    renderActivityPanel: () => rendered.push("activity"),
    renderFocusDisplay: () => rendered.push("display"),
    renderFocusExplorer: () => rendered.push("explorer"),
    renderFocusStatus: () => rendered.push("status"),
    elements: {
      focusExplorer: { innerHTML: "", querySelectorAll: () => [] },
      focusStatus: { textContent: "" }
    }
  });

  controller.resetGreetingsChallenge();
  const answerId = state.greetingsChallengeAnswerId;
  assert.ok(greetingsGameItemIds.includes(answerId));
  assert.equal(state.greetingsChallengeOptionIds.length, greetingsGameItemIds.length);
  controller.handleGreetingsChallengeGuess(answerId);
  assert.equal(state.greetingsChallengeResult, "correct");
  assert.equal(state.selectedFocusItemId, answerId);
  assert.deepEqual(rendered, ["display", "explorer", "status", "activity"]);
});

test("polite words controller refreshes the prompt when audio is replayed", () => {
  const state = { ...createFoundationState(), tapAudioEnabled: false, selectedFocusItemId: null };
  const controller = createPoliteWordsController({
    state,
    politeGameItemIds,
    politePractice,
    topicById: (id) => id === "polite-words" ? politeWordsTopic : null,
    shuffleArray: (items) => [...items],
    speak: () => {},
    speakSceneLines: () => {},
    currentTopic: () => politeWordsTopic,
    currentFocusItem: () => null,
    currentBook: () => ({ label: "Book 1A" }),
    currentLesson: () => ({ lesson: 5 }),
    renderActivityPanel: () => {},
    renderFocusDisplay: () => {},
    renderFocusExplorer: () => {},
    renderFocusStatus: () => {},
    elements: {
      focusExplorer: { innerHTML: "", querySelectorAll: () => [] },
      focusStatus: { textContent: "" }
    }
  });

  controller.resetPoliteChallenge();
  const firstPromptId = state.politeChallengePromptId;
  controller.handlePoliteChallengePlay();
  assert.notEqual(state.politeChallengePromptId, firstPromptId);
});

test("introductions controller owns its listening challenge and sentence builder", () => {
  const state = { ...createFoundationState(), tapAudioEnabled: false };
  const controller = createIntroductionsController({
    state,
    introductionsGameSpeakerIds: ["anan", "tiantian", "sisi", "lele"],
    introductionsGamePrompts,
    introductionsBuildPhrases,
    introductionsPractice,
    illustratedKids,
    topicById: (id) => id === "introductions" ? introductionsTopic : null,
    shuffleArray: (items) => [...items],
    speak: () => {}, speakSceneLines: () => {}, currentTopic: () => introductionsTopic,
    currentFocusItem: () => null, currentBook: () => ({ label: "Book 1A" }), currentLesson: () => ({ lesson: 6 }),
    renderActivityPanel: () => {}, renderFocusDisplay: () => {}, renderFocusExplorer: () => {}, renderFocusStatus: () => {},
    elements: { focusExplorer: { innerHTML: "", querySelectorAll: () => [] }, focusStatus: { textContent: "" } }
  });

  controller.resetIntroductionsChallenge();
  assert.ok(state.introductionsChallengeOptionIds.includes(state.introductionsChallengeAnswerId));
  controller.resetIntroductionsBuilder();
  assert.equal(state.introductionsBuildSelectedTokens.length, 0);
  assert.ok(state.introductionsBuildAvailableTokens.length > 0);
});

test("time and calendar content retains its expected teaching sets", () => {
  assert.equal(timeDateWeekItems.length, 7);
  assert.equal(timeDateClockItems.length, 12);
  assert.equal(timeDateMonthItems.length, 12);
  assert.equal(timeDateRoutineItems.length, 11);
  assert.equal(datePracticeItems.length, 6);
});

test("time and daily life data stays owned by its topics", () => {
  assert.equal(comparisonsTopic.id, "comparisons");
  assert.equal(comparisonsTopic.interactiveScene, "comparisons");
  assert.equal(comparisonVisualItems.length, 7);
  assert.equal(positionsTopic.id, "positions");
  assert.equal(positionVisualItems.length, 3);
  assert.equal(transportTopic.id, "transport");
  assert.equal(transportVisualItems.length, 9);
  assert.equal(roomVisualItems.length, 11);
});

test("time and daily life practice data retains every interaction set", () => {
  assert.equal(dailyLifeTopic.id, "daily-life");
  assert.equal(dailyLifeTopic.interactiveScene, "rooms");
  assert.equal(roomScenes.length, 4);
  assert.equal(positionScenes.length, 4);
  assert.equal(positionPracticeItems.length, 8);
  assert.equal(comparisonPracticeItems.length, 7);
  assert.equal(Object.keys(transportSentenceTokens).length, 9);
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
  assert.equal(foodTopic.id, "food");
  assert.equal(foodTopicData.scenes.length, 1);
  assert.equal(foodTopicData.words.length, 27);
  assert.equal(foodSentenceBuilds.length, 10);
});

test("Food uses one Review heading only when the selected lesson has scene cards", () => {
  const source = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.match(source, /filteredSceneGroups\.length \? '<div class="time-months-heading"><p class="body-match-kicker">Review<\/p><\/div>' : ""/);
});

test("Food lesson cards describe and scope their matching food content", () => {
  const detailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  const foodRuntime = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  const foodData = readFileSync("src/features/food/food.js", "utf8");

  assert.match(detailSource, /<strong>\$\{topicLessonTitle\(topic, step\)\}<\/strong>/);
  assert.match(foodRuntime, /foodCategoryByLessonSource[\s\S]{0,180}"1b:7": "fruit"[\s\S]{0,120}"2b:7": "snack"[\s\S]{0,120}"3b:6": "vegetable"/);
  assert.match(foodRuntime, /\["food", "classroom", "meals-feelings"\]\.includes\(topicId\) \? state\.lessonScope : null;[\s\S]{0,160}filteredSceneGroups = filterLessonGroups\(sceneGroups, contentScope\)/);
  assert.match(foodRuntime, /function renderFoodPractice\(topic\) \{[\s\S]{0,180}ensureSchoolBuilder\(topic\.id\)[\s\S]{0,700}renderFoodHungerGame/);
  assert.match(foodData, /lessonSources: \["1b:7"\]/);
});

test("Food enrichment builds eat and drink sentences from individual pictures", () => {
  const foodData = readFileSync("src/features/food/food.js", "utf8");
  assert.match(foodData, /id: "apple", imagePath: "assets\/illustrated-food\/apple\.webp"/);
  assert.match(foodData, /id: "banana", imagePath: "assets\/illustrated-food\/banana\.webp"/);
  assert.match(foodData, /id: "carrot", imagePath: "assets\/illustrated-food\/carrot\.webp"/);
  assert.match(foodData, /id: "cola", imagePath: "assets\/illustrated-food\/cola\.webp"[\s\S]{0,180}我喝可乐/);
  assert.doesNotMatch(foodData, /id: "cola"[\s\S]{0,260}lessonSources/);
  const foodRuntime = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.match(foodRuntime, /function schoolBuildItems[\s\S]{0,300}filterLessonContent\(items, state\.lessonScope\)/);
});

test("Food all-topic sentence builder includes like and dislike prompts without changing book-scoped lessons", () => {
  const foodData = readFileSync("src/features/food/food.js", "utf8");
  assert.match(foodData, /id: "like-cola"[\s\S]{0,240}我喜欢喝可乐/);
  assert.match(foodData, /id: "like-apple"[\s\S]{0,240}我喜欢吃苹果/);
  assert.match(foodData, /id: "dislike-broccoli"[\s\S]{0,280}我不喜欢吃西兰花/);
  assert.doesNotMatch(foodData, /id: "like-cola"[\s\S]{0,300}lessonSources/);
});

test("food preferences owns its scenes and vocabulary", () => {
  assert.equal(foodPreferencesTopic.id, "food-preferences");
  assert.equal(foodPreferencesTopicData.scenes.length, 4);
  assert.equal(foodPreferencesTopicData.words.length, 4);
});

test("meals and feelings owns its scenes and practice activities", () => {
  assert.equal(mealsFeelingsTopic.id, "meals-feelings");
  assert.equal(mealsFeelingsTopicData.sceneGroups.length, 2);
  assert.equal(mealsFeelingsTopicData.conversationPairs.length, 6);
  assert.equal(mealsFeelingsTopicData.pictureChoices.length, 6);
  assert.equal(mealsFeelingsSentenceBuilds.length, 5);
  assert.deepEqual(mealsFeelingsTopicData.sceneGroups[0].lessonSources, ["4a:5"]);
  assert.deepEqual(mealsFeelingsTopicData.sceneGroups[1].lessonSources, ["4a:7"]);
  assert.deepEqual(mealsFeelingsSentenceBuilds.filter((item) => item.lessonSources?.includes("4a:5")).map((item) => item.id), ["lunch"]);
});

test("introductions owns its scenes and practice activities", () => {
  assert.equal(introductionsTopic.id, "introductions");
  assert.equal(introductionsTopic.interactiveScene, "introductions-conversation");
  assert.equal(introductionsTopic.steps.length, 2);
  assert.equal(introductionsPractice.length, 4);
  assert.ok(introductionsPractice.some((scene) => scene.id === "good-friends" && scene.lines.some((line) => line.hanzi === "他是我的好朋友。")));
  assert.equal(introductionsGamePrompts.length, 4);
  assert.ok(introductionsGamePrompts.every((prompt) => prompt.speakerId));
  assert.equal(introductionsBuildPhrases.length, 3);
  assert.ok(introductionsBuildPhrases.some((phrase) => phrase.targetHanzi === "他是我的好朋友。"));
});

test("age owns its scenes and sentence practice", () => {
  assert.equal(ageTopic.id, "age");
  assert.equal(ageTopic.interactiveScene, "age-conversation");
  assert.equal(ageTopic.steps.length, 2);
  assert.equal(agePractice.length, 2);
  assert.equal(ageBuildPhrases.length, 6);
});

test("nationality and languages are separate book-aligned topics", () => {
  assert.equal(identityTopic.id, "identity");
  assert.equal(identityTopic.interactiveScene, "identity-scenes");
  assert.equal(identityTopic.steps.length, 1);
  assert.equal(languagesTopic.id, "languages");
  assert.equal(languagesTopic.interactiveScene, "identity-scenes");
  assert.equal(languagesTopic.steps.length, 1);
  assert.equal(identityCountries.length, 5);
  assert.deepEqual(identityCountries.map((country) => country.hanzi), ["中国", "美国", "英国", "德国", "法国"]);
  assert.deepEqual(identityExploreCountries.map((country) => country.hanzi), ["加拿大", "墨西哥", "澳大利亚"]);
  assert.ok(identityCountries.every((country) => country.symbolAsset && country.symbolCaption));
  assert.ok(identityCountries.every((country) => country.language));
  assert.ok(identityExploreCountries.every((country) => country.symbolAsset && country.symbolCaption));
  assert.equal(identityQuestion.hanzi, "你是哪国人？");
  assert.equal(identityLanguageQuestion.hanzi, "说一说。");
  assert.equal(identityConversation.lines.length, 2);
  assert.equal(nationalityConversation.imagePath, "assets/introductions/introductions-scene-4.webp");
});

test("greetings owns its template lesson scenes and listening set", () => {
  assert.equal(greetingsTopic.id, "greetings");
  assert.equal(greetingsTopic.interactiveScene, "greetings-conversation");
  assert.equal(greetingsPractice.length, 3);
  assert.equal(greetingsGameItemIds.length, 4);
});

test("Is It is an explicit enrichment topic with visual yes-or-no practice", () => {
  assert.equal(isItTopic.progressLabel, "Topic enrichment");
  assert.equal(isItTopic.interactiveScene, "is-it-contrast");
  assert.equal(isItScene.imagePath, "assets/illustrated-grammar/shi-bu-shi-meimei-package.webp");
  assert.deepEqual(isItPracticeRounds.map((round) => round.panel), ["left", "right"]);
  assert.ok(topicData.includes(isItTopic));
  assert.ok(topicGroups.find((group) => group.id === "daily-world")?.topicIds.includes("is-it"));
  assert.ok(learningHomeCategories.find((category) => category.id === "time-daily")?.topicIds.includes("is-it"));
});

test("Polite Words and Requests & Permission own separate book-aligned lessons", () => {
  assert.equal(politeWordsTopic.id, "polite-words");
  assert.equal(politeWordsTopic.interactiveScene, "polite-phrases");
  assert.equal(politeWordsTopic.ownsExplorerContent, true);
  assert.equal(politePractice.length, 3);
  assert.equal(politeGameItemIds.length, 4);
  assert.equal(requestsPermissionTopic.id, "requests-permission");
  assert.equal(requestsPermissionTopic.summary, "Ask with 我可以…吗？, then listen for 可以 or 不行。");
  assert.equal(requestPractice.length, 4);
  assert.equal(requestGameItemIds.length, 4);
  assert.equal(requestBuildPhrases.length, 4);
  assert.ok(requestBuildPhrases.every((phrase) => phrase.tokens.length >= 4 && existsSync(phrase.imagePath)));
  assert.deepEqual(requestPractice[0]?.lines.map((line) => line.hanzi), ["我可以喝可乐吗？", "不行。你可以喝水。"]);
  assert.deepEqual(requestPractice[1]?.lines.map((line) => line.hanzi), ["我可以看电视吗？", "不可以。"]);
  assert.deepEqual(requestPractice[2]?.lines.map((line) => line.hanzi), ["我现在可以看电视吗？", "可以。"]);
  assert.deepEqual(requestPractice[3]?.lines.map((line) => line.hanzi), ["我可以问老师吗？", "可以。"]);
  assert.deepEqual(requestsPermissionTopic.bookWords.map((word) => word.hanzi), ["可以。", "不行。", "吗", "喝水", "吃饭", "厕所"]);
  assert.ok(existsSync("assets/illustrated-grammar/school-request-teacher-help.webp"));
  assert.ok(existsSync("assets/illustrated-grammar/can-watch-tv-homework-first.webp"));
  assert.ok(existsSync("assets/illustrated-meals/anan-mom-fridge-cola-water.webp"));
});

test("Requests & Permission uses the shared two-column scene grid, sentence builder, and literal translations", () => {
  const controllerSource = readFileSync("src/features/foundations/polite-words-controller.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(controllerSource, /polite-scene-grid/);
  assert.match(controllerSource, /isRequestLesson \? "" : `<div class="numbers-stage-card">/);
  assert.match(controllerSource, /data-polite-word/);
  assert.match(controllerSource, /我可以…吗？/);
  assert.match(practiceSource, /function requestSentenceBuilderMarkup\(\)/);
  assert.match(practiceSource, /Build a complete request, then match each Chinese sentence to its English translation/);
  assert.match(practiceSource, /state\.requestBuildFeedback = "Not quite\. Try again\."/);
  assert.match(practiceSource, /speak\(target\.audio, 0\.78\)/);
  assert.match(stylesSource, /\.polite-scene-grid \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(stylesSource, /\.polite-scene-grid \{\s+grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(controllerSource, /is-request-cola-scene/);
  assert.match(controllerSource, /is-request-teacher-scene/);
  assert.match(controllerSource, /is-request-cola-lines/);
  assert.match(stylesSource, /\.polite-scene-grid \.is-request-cola-scene \{\s+order: 1;/);
  assert.match(stylesSource, /\.polite-scene-grid \.is-request-teacher-scene \{\s+order: 1;/);
  assert.match(stylesSource, /is-request-lines\.is-request-cola-lines \{\s+grid-template-columns: minmax\(0, 0\.72fr\) minmax\(0, 1\.28fr\);/);
  assert.match(stylesSource, /\.greetings-scene-layout\.polite-scene-layout \{\s+grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(stylesSource, /\.polite-scene-layout \.greetings-line-stack \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
});

test("clothes owns its scenes and picture matching set", () => {
  const runtimeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  assert.equal(clothesTopic.id, "clothes");
  assert.equal(clothesTopic.interactiveScene, "clothes-scenes");
  assert.equal(clothesTopic.ownsExplorerContent, true);
  assert.equal(clothesPractice.length, 6);
  assert.deepEqual(clothesBookWords.filter((item) => item.lessonSources?.includes("2a:6")).map((item) => item.hanzi), ["衣服", "鞋子"]);
  assert.deepEqual(clothesBookWords.filter((item) => item.lessonSources?.includes("3a:7")).map((item) => item.hanzi), ["校服", "衬衫", "裤子", "裙子", "皮鞋"]);
  assert.deepEqual(clothesBookWords.filter((item) => item.lessonSources?.includes("4b:2")).map((item) => item.hanzi), ["T恤", "短裤", "毛衣", "长裤", "大衣", "帽子"]);
  assert.equal(clothesPractice[1]?.lines[0]?.hanzi, "我穿校服。");
  assert.equal(clothesPractice.filter((item) => item.lessonSources?.includes("4b:2")).length, 4);
  assert.ok(clothesMatchItems.every((item) => item.imagePath));
  assert.ok(clothesSentenceItems.every((item) => item.lessonSources?.length));
  assert.ok(clothesBookWords.filter((item) => item.imagePath).every((item) => existsSync(item.imagePath)));
  assert.ok(clothesSentenceItems.every((item) => existsSync(item.imagePath)));
  assert.match(runtimeSource, /time-asset-card book-word-card/);
  assert.match(runtimeSource, /function scopedClothesContent\(items\) \{[\s\S]{0,220}state\.lessonScope/);
  assert.doesNotMatch(runtimeSource, /clothes-book-board/);
});

test("Nature and Weather remain separate book topics", () => {
  const topicDetailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  const focusRuntimeSource = readFileSync("src/core/focus-runtime.js", "utf8");
  const worldRuntimeSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  assert.equal(weatherTopic.id, "weather");
  assert.equal(weatherTopic.ownsExplorerContent, true);
  assert.equal(weatherTopic.steps.length, 1);
  assert.equal(weatherTopic.steps[0].book, "4B");
  assert.equal(natureTopic.id, "nature");
  assert.equal(natureTopic.ownsExplorerContent, true);
  assert.equal(natureTopic.steps.length, 1);
  assert.equal(natureTopic.steps[0].book, "3B");
  assert.equal(natureLesson.items.length, 10);
  assert.equal(natureLesson.sentences.length, 8);
  assert.equal(natureLesson.scenes.length, 2);
  assert.deepEqual(natureLesson.scenes.map((scene) => scene.title), ["Daytime", "Nighttime"]);
  assert.match(natureLesson.scenes[0].imagePath, /daytime-nature\.webp/);
  assert.match(natureLesson.scenes[1].imagePath, /nighttime-nature\.webp/);
  assert.match(natureLesson.scenes.flatMap((scene) => scene.lines).map((line) => line.hanzi).join(" "), /地上有树、花和草/);
  assert.equal(natureLesson.usefulNote.hanzi, "抬头看天上，低头看地上。");
  assert.equal(weatherLesson.items.length, 6);
  assert.match(natureLesson.imagePath, /illustrated-nature\/day-night-nature\.webp/);
  assert.match(topicDetailSource, /topic\.ownsExplorerContent/);
  assert.match(focusRuntimeSource, /currentTopic\(\)\.ownsExplorerContent/);
  assert.match(worldRuntimeSource, /function worldSceneCardMarkup/);
  assert.equal((worldRuntimeSource.match(/worldSceneCardMarkup\(/g) ?? []).length, 5);
});

test("Weather groups repeated scene artwork into a two-by-two scene grid", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const runtime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true },
    currentTopic: () => weatherTopic,
    currentBook: () => ({ id: "4b", label: "Book 4B" }),
    currentLesson: () => ({ lesson: 1 }),
    focusExplorer,
    speak: () => {},
    selectFocusItem: () => {}
  });

  runtime.renderWorldExplorer();
  assert.equal(weatherLesson.scenes.length, 4);
  assert.equal(weatherOutfitScenes.length, 4);
  assert.equal((focusExplorer.innerHTML.match(/school-scene-card/g) ?? []).length, 8);
  assert.match(focusExplorer.innerHTML, /weather-scene-grid/);
  assert.doesNotMatch(focusExplorer.innerHTML, />Scenes</);
  assert.match(focusExplorer.innerHTML, /Rainy day/);
  assert.match(focusExplorer.innerHTML, /Snowy day/);
  assert.doesNotMatch(focusExplorer.innerHTML, /Book words/);
  assert.match(focusExplorer.innerHTML, /Useful notes/);
  assert.doesNotMatch(focusExplorer.innerHTML, /下 \+ weather \+ 了/);
  assert.match(focusExplorer.innerHTML, /今天很 \+ 冷 \/ 热/);
  assert.match(focusExplorer.innerHTML, /今天是 \+ 天气/);
  assert.match(focusExplorer.innerHTML, /今天是晴天/);
  assert.match(focusExplorer.innerHTML, /今天很热/);
  assert.match(focusExplorer.innerHTML, /下雪了/);
  assert.match(focusExplorer.innerHTML, /今天很冷/);
  assert.match(focusExplorer.innerHTML, /下雪了。今天很冷。/);
});

test("Nature keeps its vocabulary inside the two scene cards", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const runtime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true },
    currentTopic: () => natureTopic,
    currentBook: () => ({ id: "3b", label: "Book 3B" }),
    currentLesson: () => ({ lesson: 7 }),
    focusExplorer,
    speak: () => {},
    selectFocusItem: () => {}
  });

  runtime.renderWorldExplorer();
  assert.equal((focusExplorer.innerHTML.match(/school-scene-card/g) ?? []).length, 2);
  assert.match(focusExplorer.innerHTML, /Book words/);
  assert.match(focusExplorer.innerHTML, /天上有太阳。/);
  assert.match(focusExplorer.innerHTML, /天上有星星。/);
  assert.match(focusExplorer.innerHTML, /天上有月亮。/);
  assert.match(focusExplorer.innerHTML, /地上有树、花和草。/);
  assert.match(focusExplorer.innerHTML, />白天</);
  assert.match(focusExplorer.innerHTML, />晚上</);
  assert.match(focusExplorer.innerHTML, /抬头看天上，低头看地上。/);
  assert.match(focusExplorer.innerHTML, /nature-word-icon/);
  assert.match(focusExplorer.innerHTML, /nature-word-copy/);
  assert.match(focusExplorer.innerHTML, /nature-word-row/);
});

test("Nature practice fills a complete sentence from one inline visual cue", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const activityPanelTitle = { textContent: "" };
  const activityPanelSummary = { textContent: "" };
  const activityList = { className: "", innerHTML: "", querySelector: () => null, querySelectorAll: () => [] };
  const runtime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => natureTopic,
    currentBook: () => ({ id: "3b", label: "Book 3B" }),
    currentLesson: () => ({ lesson: 7 }),
    focusExplorer,
    activityPanelTitle,
    activityPanelSummary,
    activityList,
    speak: () => {},
    selectFocusItem: () => {},
    renderActivityPanel: () => {}
  });

  runtime.renderWorldPractice(natureTopic);
  assert.match(activityList.innerHTML, /Look and complete/);
  assert.match(activityList.innerHTML, /data-nature-fill-subject/);
  assert.match(activityList.innerHTML, /data-nature-fill-word/);
  assert.match(activityList.innerHTML, /nature-fill-inline-icon/);
  assert.match(activityList.innerHTML, /白天/);
  assert.match(activityList.innerHTML, /晚上/);
  assert.match(activityList.innerHTML, /地上/);
});

test("Weather practice connects a weather sentence to getting ready", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const activityPanelTitle = { textContent: "" };
  const activityPanelSummary = { textContent: "" };
  const activityList = { className: "", innerHTML: "", querySelector: () => null, querySelectorAll: () => [] };
  const runtime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => weatherTopic,
    currentBook: () => ({ id: "4b", label: "Book 4B" }),
    currentLesson: () => ({ lesson: 1 }),
    focusExplorer,
    activityPanelTitle,
    activityPanelSummary,
    activityList,
    speak: () => {},
    selectFocusItem: () => {},
    renderActivityPanel: () => {}
  });

  runtime.renderWorldPractice(weatherTopic);
  assert.equal(activityPanelTitle.textContent, "Let's practice");
  assert.match(activityList.innerHTML, /Get ready for the weather/);
  assert.match(activityList.innerHTML, /下雨了。带什么？|下雪了。今天很冷。穿什么？|今天是晴天。今天很热。穿什么？|今天刮大风。穿什么？/);
  assert.match(activityList.innerHTML, /data-weather-dress-choice="umbrella"/);
  assert.match(activityList.innerHTML, /data-weather-dress-choice="knit-hat"/);
  assert.match(activityList.innerHTML, /data-weather-dress-choice="shorts"/);
  assert.match(activityList.innerHTML, /data-weather-dress-choice="jacket"/);
  assert.match(activityList.innerHTML, /Finish the sentence/);
  assert.match(activityList.innerHTML, /weather-outfits\/(rainy-lele|sunny-luna|snowy-noah-winter-gear|windy-sophie)\.webp/);
  assert.match(activityList.innerHTML, /class="weather-fill-blank">____<\/span>/);
  assert.match(activityList.innerHTML, /data-weather-fill-choice="[^"]+:(雨衣|热|下雪了|帽子|大衣)"/);
});

test("Pets and Zoo Animals are distinct topic pages", () => {
  const focusRuntimeSource = readFileSync("src/core/focus-explorer-runtime.js", "utf8");
  const practiceRuntimeSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  assert.equal(animalsTopic.id, "animals");
  assert.equal(animalsTopic.ownsExplorerContent, true);
  assert.equal(animalsTopic.steps.length, 1);
  assert.equal(animalsTopic.steps[0].book, "2B");
  assert.equal(petsTopic.id, "pets");
  assert.equal(petsTopic.steps.length, 1);
  assert.equal(petsTopic.steps[0].book, "1B");
  assert.equal(animalLessons["1b"].items.length, 4);
  assert.equal(animalLessons["2b"].items.length, 6);
  assert.equal(animalLessons["1b"].scenes[0].lines[0].hanzi, "乐乐喜欢狗和金鱼。");
  assert.equal(animalLessons["2b"].usefulNote, undefined);
  assert.match(focusRuntimeSource, /\["pets", "animals", "colours", "nature", "weather"\]/);
  assert.match(practiceRuntimeSource, /\["pets", "animals", "colours", "nature", "weather"\]/);
  assert.match(readFileSync("src/features/world/world-runtime.js", "utf8"), /topic\.id === "pets"\) return renderAnimalsPractice/);
});

test("Animals renders book-aware scenes, word cards, and listening practice", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const oneB = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => petsTopic,
    currentBook: () => ({ id: "1b", label: "Book 1B" }),
    currentLesson: () => ({ lesson: 5 }),
    focusExplorer,
    speak: () => {},
    selectFocusItem: () => {}
  });

  oneB.renderWorldExplorer();
  assert.match(focusExplorer.innerHTML, /乐乐喜欢狗和金鱼。/);
  assert.match(focusExplorer.innerHTML, /book-word-card/);
  assert.match(focusExplorer.innerHTML, /Pet story/);
  assert.match(focusExplorer.innerHTML, /狗吃骨头。/);
  assert.match(focusExplorer.innerHTML, /熊猫吃竹子。/);
  assert.match(focusExplorer.innerHTML, /猴子吃香蕉。/);
  assert.match(focusExplorer.innerHTML, /data-pet-food-story="dog-bone"/);
  assert.match(focusExplorer.innerHTML, /Useful note/);
  assert.match(focusExplorer.innerHTML, /我喜欢 \+ 名词。比如：我喜欢猫。/);

  const activityList = { className: "", innerHTML: "", querySelector: () => null, querySelectorAll: () => [] };
  const twoB = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => animalsTopic,
    currentBook: () => ({ id: "2b", label: "Book 2B" }),
    currentLesson: () => ({ lesson: 5 }),
    focusExplorer,
    activityPanelTitle: { textContent: "" },
    activityPanelSummary: { textContent: "" },
    activityList,
    speak: () => {},
    selectFocusItem: () => {},
    renderActivityPanel: () => {}
  });

  twoB.renderWorldExplorer();
  assert.match(focusExplorer.innerHTML, /动物园里有一只老虎，两头大象，三只熊猫。/);
  assert.match(focusExplorer.innerHTML, /动物园里有很多猴子、金鱼和乌龟。/);
  assert.doesNotMatch(focusExplorer.innerHTML, /Useful note/);
  twoB.renderWorldPractice(animalsTopic);
  assert.match(activityList.innerHTML, /动物园有/);
  assert.match(activityList.innerHTML, /data-zoo-sentence-choice="tiger"/);
  assert.match(activityList.innerHTML, /一只老虎/);

  const petsActivityList = { className: "", innerHTML: "", querySelector: () => null, querySelectorAll: () => [] };
  const petsRuntime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => petsTopic,
    currentBook: () => ({ id: "1b", label: "Book 1B" }),
    currentLesson: () => ({ lesson: 5 }),
    focusExplorer,
    activityPanelTitle: { textContent: "" },
    activityPanelSummary: { textContent: "" },
    activityList: petsActivityList,
    speak: () => {},
    selectFocusItem: () => {},
    renderActivityPanel: () => {}
  });
  petsRuntime.renderWorldPractice(petsTopic);
  assert.match(petsActivityList.innerHTML, /我喜欢/);
  assert.match(petsActivityList.innerHTML, /data-pets-preference-choice="dog"/);
  assert.match(petsActivityList.innerHTML, /family-match-open-board/);
  assert.match(petsActivityList.innerHTML, /data-pet-food-match-animal="dog-bone"/);
  assert.match(petsActivityList.innerHTML, /data-pet-food-match-food="dog-bone"/);
});

test("colours covers both book colour sets with pictured examples", () => {
  assert.equal(coloursTopic.ownsExplorerContent, true);
  assert.equal(coloursTopic.id, "colours");
  assert.equal(colourLessons["1b"].items.length, 4);
  assert.equal(colourLessons["2a"].items.length, 9);
  assert(colourLessons["2a"].items.every((item) => item.imagePath));
});

test("the Colours topic defaults to the complete nine-colour set", () => {
  const runtime = createWorldRuntime({
    state: {},
    currentTopic: () => coloursTopic,
    currentBook: () => ({ id: "1b", label: "Book 1B" }),
    currentLesson: () => ({ lesson: 6 }),
    focusExplorer: { innerHTML: "", querySelectorAll: () => [] },
    speak: () => {},
    selectFocusItem: () => {}
  });

  assert.equal(runtime.focusItemsForTopic(coloursTopic).length, 9);
});

test("the Colours lesson filter keeps the 1B core set and hides the later sentence", () => {
  const focusExplorer = { innerHTML: "", querySelectorAll: () => [] };
  const runtime = createWorldRuntime({
    state: { lessonScope: { bookId: "1b", lessonNumber: 6 } },
    currentTopic: () => coloursTopic,
    currentBook: () => ({ id: "1b", label: "Book 1B" }),
    currentLesson: () => ({ lesson: 6 }),
    focusExplorer,
    speak: () => {},
    selectFocusItem: () => {}
  });

  assert.equal(runtime.focusItemsForTopic(coloursTopic).length, 4);
  runtime.renderWorldExplorer();
  assert.doesNotMatch(focusExplorer.innerHTML, /Book 1B Lesson 6/);
});

test("the Colours practice starts with a randomized colour-and-object mission", () => {
  const activityList = {
    className: "",
    innerHTML: "",
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const runtime = createWorldRuntime({
    state: { showEnglish: true, showPinyin: true, tapAudioEnabled: true },
    currentTopic: () => coloursTopic,
    currentBook: () => ({ id: "2a", label: "Book 2A" }),
    currentLesson: () => ({ lesson: 7 }),
    focusExplorer: { innerHTML: "", querySelectorAll: () => [] },
    speak: () => {},
    selectFocusItem: () => {},
    activityPanelTitle: { textContent: "" },
    activityPanelSummary: { textContent: "" },
    activityList,
    renderActivityPanel: () => {}
  });

  runtime.renderWorldPractice(coloursTopic);
  assert.match(activityList.innerHTML, /Colour mission/);
  assert.match(activityList.innerHTML, /data-world-mission-pick/);
  assert.match(activityList.innerHTML, /Every round mixes the object colours and their positions/);
  assert.doesNotMatch(activityList.innerHTML, /Find something orange/);
  assert.doesNotMatch(activityList.innerHTML, /Next mission/);
});

test("learner audio controls use the shared green Play button", () => {
  const styles = readFileSync("styles.css", "utf8");
  const multiplicationSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const worldSource = readFileSync("src/features/world/world-runtime.js", "utf8");

  assert.match(styles, /\.small-button\.is-play-button/);
  assert.match(styles, /border-radius: 999px/);
  assert.match(styles, /#3f8d58/);
  assert.match(worldSource, /data-world-mission-play>Play</);
  assert.match(multiplicationSource, /data-multiplication-play-all>Play</);
  assert.match(multiplicationSource, /is-playback-control-button is-pause-button/);
  assert.match(multiplicationSource, /is-playback-control-button is-stop-button/);
  assert.match(styles, /\.small-button\.is-playback-control-button/);
  assert.match(styles, /\.small-button\.is-pause-button \{[\s\S]*#dfa92d/);
  assert.match(styles, /\.small-button\.is-stop-button \{[\s\S]*#b9473b/);
  assert.match(multiplicationSource, /<div class="numbers-game-top">[\s\S]*Selected line[\s\S]*data-multiplication-item="\$\{activeItem\.id\}"/);
  assert.match(styles, /\.multiplication-detail-card \.numbers-game-top \.small-button \{[\s\S]*position: absolute/);
});

test("navigation display toggles use the compact speaker, Pī, and ABC icon set", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  const displaySource = readFileSync("src/core/display-controls-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");

  assert.match(navigationSource, /aria-label="Sound on"/);
  assert.match(displaySource, /learning-display-sound-icon/);
  assert.match(displaySource, /learning-display-pinyin-icon[\s\S]*>Pīn</);
  assert.match(displaySource, /learning-display-english-icon[\s\S]*>En</);
  assert.match(styles, /\.learning-display-toggle \{[\s\S]*width: 56px/);
});

test("play owns separate activity pages for its Hobbies lessons", () => {
  assert.equal(hobbiesTopic.id, "hobbies");
  assert.equal(hobbiesTopic.steps.length, 1);
  assert.equal(hobbiesTopic.ownsExplorerContent, true);
  assert.equal(hobbiesTopic.title, "What I Like");
  assert.equal(hobbies3bTopic.title, "Music & Movement");
  assert.equal(hobbies3bTopic.progressLabel, "3B Lesson 4");
  assert.equal(hobbiesAtHomeTopic.title, "Hobbies at Home");
  assert.equal(hobbiesAtHomeTopic.progressLabel, "4B Lesson 4");
  assert.equal(hobbiesAtHomeTopic.focusItems.length, 5);
  assert.ok(hobbiesAtHomeTopic.focusItems.some((item) => item.imagePath === "assets/illustrated-activities/anan-playing-piano.webp"));
  assert.equal(hobbiesLeisureTopic.title, "Leisure Time");
  assert.equal(hobbiesLeisureTopic.progressLabel, "4B Lesson 7");
  assert.equal(hobbiesLeisureTopic.focusItems.length, 7);
  assert.ok(hobbiesLeisureTopic.focusItems.some((item) => item.imagePath === "assets/illustrated-activities/kids-running-playground-landscape.webp"));
  assert.ok(hobbiesTopic.focusItems.length >= 11);
  assert.ok(hobbiesTopic.focusItems.some((item) => item.imagePath === "assets/illustrated-activities/noah-ice-skating.webp"));
  assert.equal(toysTopic.id, "toys");
  assert.equal(toysTopic.ownsExplorerContent, true);
  assert.deepEqual(toysTopic.focusItems.map((item) => item.hanzi), ["娃娃", "玩具火车", "玩具飞机", "玩具熊"]);
  assert.ok(toysTopic.focusItems.every((item) => item.imagePath.startsWith("assets/illustrated-toys/")));
});

test("Toys owns a 2 by 2 scene series and a no-repeat picture-choice practice", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  const explorerSource = readFileSync("src/core/focus-explorer-runtime.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  for (const file of ["lele-playing-doll.webp", "lele-playing-toy-train.webp", "lele-playing-toy-airplane.webp", "lele-playing-toy-bear.webp"]) {
    assert.match(runtimeSource, new RegExp(`assets/illustrated-toys/${file.replace(".", "\\.")}`));
    assert.ok(existsSync(`assets/illustrated-toys/${file}`));
  }
  assert.match(runtimeSource, /school-scene-grid toys-scene-grid/);
  assert.match(runtimeSource, /data-toys-flashcard/);
  assert.match(runtimeSource, /<p class="body-match-kicker">Book words &amp; more<\/p>/);
  assert.doesNotMatch(runtimeSource, /data-toys-word/);
  assert.deepEqual(toysTopic.flashcardItems.map((item) => item.id), ["toys", "toy-car", "toy-train", "toy-airplane", "school-bus", "doll", "bicycle", "toy-bear"]);
  assert.equal(toysTopic.flashcardItems.find((item) => item.id === "toys")?.hanzi, "玩具");
  assert.ok(existsSync("assets/illustrated-toys/toys-collection.webp"));
  assert.equal(toysTopic.flashcardItems.find((item) => item.id === "school-bus")?.hanzi, "玩具校车");
  assert.ok(toysTopic.flashcardItems.every((item) => item.imagePath.startsWith("assets/illustrated-toys/")));
  assert.match(stylesSource, /\.toys-scene-grid \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(stylesSource, /\.toys-scene-grid \{\s+grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(runtimeSource, /nextRandomCycleId\(state, "toys-picture-choice"/);
  assert.match(runtimeSource, /const toyItems = \(\) => currentTopic\(\)\.flashcardItems/);
  assert.match(runtimeSource, /data-toys-practice-new/);
  assert.match(runtimeSource, /speakLesson\(`我有\$\{item\.hanzi\}`, 0\.78\)/);
  assert.match(explorerSource, /\["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"\]/);
  assert.match(practiceSource, /\["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"\]/);
});

test("Hobbies keeps separate 2A, 3B, and 4B lesson pages and practice", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.equal(typeof createPlayHobbiesRuntime, "function");
  for (const action of ["看书", "画画", "写字", "玩儿游戏", "唱歌", "跳舞", "游泳", "滑冰", "滑雪"]) assert.match(runtimeSource, new RegExp(`"${action}"`));
  assert.match(runtimeSource, /Book 2A Lesson 5/);
  assert.match(runtimeSource, /Book 3B Lesson 4/);
  assert.match(runtimeSource, /Book 4B Lesson 4/);
  assert.match(runtimeSource, /Book 4B Lesson 7/);
  assert.match(runtimeSource, /孩子们在学校操场上跑步/);
  assert.match(runtimeSource, /tokens: \["孩子们", "在", "学校操场上", "跑步"\]/);
  assert.match(runtimeSource, /sentence-choice/);
  assert.match(runtimeSource, /data-hobbies-choice/);
  assert.match(runtimeSource, /你喜欢\$\{action\}吗/);
  assert.match(runtimeSource, /data-hobbies-build-token/);
  assert.match(runtimeSource, /More than one answer can be correct/);
  assert.match(runtimeSource, /any sentence that fits the picture/);
  assert.match(runtimeSource, /data-hobbies-build-clear/);
  assert.match(runtimeSource, /resetRound\(true\)/);
  assert.match(runtimeSource, /tokens: \["我", "爱", "每天", action\]/);
  assert.match(runtimeSource, /tokens: \["我", "喜欢", "每天", action\]/);
  assert.match(runtimeSource, /我爱\$\{action\}/);
  assert.match(runtimeSource, /我喜欢\$\{action\}/);
  assert.match(runtimeSource, /validPrefix\(entry, selected\)/);
  assert.match(runtimeSource, /answer\.pinyin/);
  assert.match(runtimeSource, /answer\.english/);
  assert.match(runtimeSource, /hobbies-scene-grid/);
  assert.match(runtimeSource, /Review<\/p>/);
  assert.match(runtimeSource, /const sceneTitle = \(id\)/);
  assert.match(runtimeSource, /audio: `我喜欢\$\{action\}`/);
});

test("body owns its vocabulary, diagram, and matching sets", () => {
  assert.equal(bodyTopic.id, "body");
  assert.equal(bodyTopic.focusItems.length, 12);
  assert.equal(bodyDiagramLayout.left.length + bodyDiagramLayout.right.length, 12);
  assert.equal(bodyCoreItemIds.length, 8);
  assert.equal(bodyBonusItemIds.length, 4);
});

test("Body adds a no-repeat spotlight-and-choose practice without duplicating its matching review", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  assert.match(practiceSource, /if \(topic\.id === "body"\) \{\s+renderBodyPractice\(\);/);
  assert.match(foundationsSource, /nextRandomCycleId\(state, "body-spotlight-choose"/);
  assert.match(foundationsSource, /data-body-spotlight-new/);
  assert.match(foundationsSource, /data-body-spotlight-guess/);
  assert.match(foundationsSource, /bodySpotlightRegions/);
  assert.match(foundationsSource, /ears: \{ x: 28, y: 31\.5, width: 13, height: 13 \}/);
  assert.doesNotMatch(foundationsSource, /body-listen-hotspot/);
  assert.match(foundationsSource, /\$\{renderBodyMatchPanel\(\)\}/);
  assert.doesNotMatch(foundationsSource, /Say it with 我的/);
  assert.doesNotMatch(foundationsSource, /bodyMatchIncludeBonus|data-body-toggle-bonus/);
  assert.match(foundationsSource, /body-spotlight-mobile/);
  assert.match(foundationsSource, /bodySentenceForItem\(prompt\)\.hanzi/);
});

test("the shared character catalog retains every illustrated child", () => {
  assert.equal(Object.keys(illustratedKids).length, 10);
  assert.equal(illustratedKids.anan.hanziName, "安安");
  assert.equal(illustratedKids.tiantian.label, "Tiantian");
  assert.equal(illustratedKids.noah.hanziName, "诺亚");
});

test("every textbook lesson uses the OCR title and an explicit page-range tag", () => {
  const reference = JSON.parse(readFileSync("docs/curriculum_reference.json", "utf8"));
  const pageTags = JSON.parse(readFileSync("docs/ocr/book_lesson_page_tags.json", "utf8"));
  assert.equal(reference.books.length, books.length);

  for (const referenceBook of reference.books) {
    const appBook = books.find((book) => book.id === referenceBook.book);
    const tags = pageTags.books[referenceBook.book];
    assert.ok(appBook, `missing app book mapping for ${referenceBook.book}`);
    assert.ok(tags, `missing OCR page tags for ${referenceBook.book}`);
    assert.equal(appBook.lessons.length, referenceBook.lessons.length);
    assert.equal(tags.lessonStartPages.length, referenceBook.lessons.length);
    assert.equal(tags.lessonEndPages.length, referenceBook.lessons.length);

    referenceBook.lessons.forEach((referenceLesson, index) => {
      const appLesson = appBook.lessons[index];
      assert.equal(appLesson.lesson, referenceLesson.lesson, `${referenceBook.book} lesson order`);
      assert.equal(appLesson.title, referenceLesson.title, `${referenceBook.book} lesson ${referenceLesson.lesson} title`);
      assert.ok(appLesson.topicId, `${referenceBook.book} lesson ${referenceLesson.lesson} needs a topic tag`);
      assert.ok(tags.lessonStartPages[index] <= tags.lessonEndPages[index], `${referenceBook.book} lesson ${referenceLesson.lesson} page range`);
    });
  }
});

test("every displayed book lesson source resolves to the exact curriculum lesson", () => {
  for (const topic of topicData) {
    for (const step of topic.steps ?? []) {
      const book = books.find((entry) => entry.id === step.book.toLowerCase());
      const lesson = book?.lessons.find((entry) => entry.lesson === step.lesson);
      assert.ok(lesson, `${topic.id} has a valid ${step.book} Lesson ${step.lesson} source`);
      assert.equal(lesson.title, step.title, `${topic.id} source title matches ${step.book} Lesson ${step.lesson}`);
      assert.ok(step.cardLabel, `${topic.id} ${step.book} Lesson ${step.lesson} needs a useful lesson-card label`);
    }
  }

  const topicDetailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  assert.match(topicDetailSource, /function linkInlineBookLessonBadges\(\)/);
  assert.match(topicDetailSource, /data-topic-lesson-source/);
  assert.match(topicDetailSource, /const lessonUrl = topicPageUrl\(window\.location, lesson\.topicId, \{ bookId: book\.id, lessonNumber: lesson\.lesson \}\)/);
  assert.match(topicDetailSource, /window\.history\.pushState\(null, "", lessonUrl\)/);
  assert.match(topicDetailSource, /state\.lessonScope = lessonScopeFromLocation\(window\.location, books, lesson\.topicId\)/);
  assert.match(topicDetailSource, /topicLessonStrip\.addEventListener\("click", \(event\) =>/);
  assert.match(topicDetailSource, /selectBookLesson\(bookId, Number\(lessonText\)\)/);
  assert.match(topicDetailSource, /data-topic-all-content/);
  assert.match(topicDetailSource, /event\.target\.closest\("\[data-topic-all-content\]"\)/);
  assert.match(topicDetailSource, /topicLessonStrip\.innerHTML = allContentCard \+ steps/);
  assert.match(topicDetailSource, /topicSummary\.textContent = scopedStep\?\.note \?\? topic\.summary/);
  assert.match(topicDetailSource, /if \(step\.cardLabel\) \{/);
  assert.match(topicDetailSource, /link\.dataset\.topicLessonSource/);
});

test("the shared curriculum retains its books and learning navigation", () => {
  assert.equal(books.length, 8);
  assert.equal(bookHomeCategories.length, 4);
  assert.equal(topicGroups.length, 4);
  assert.equal(learningHomeCategories.length, 7);
  assert.equal(topicCardMeta["school-subjects"].zhTitle, "学校学科");
});

test("numbers keeps its counting stages while My Family 2 owns 4A Lesson 1", () => {
  assert.equal(numbersTopic.id, "numbers");
  assert.equal(numberStages.length, 5);
  assert.equal(buildNumberItem(42).hanzi, "四十二");
  assert.equal(telephoneNumbersTopic.id, "telephone-numbers");
  assert.equal(telephoneNumbersTopic.title, "My Family 2");
  assert.equal(telephonePractice.residence.lines[1].hanzi, "他们住在北京。");
  assert.equal(multiplicationRhymeTopic.focusItems.length, 45);
  assert.equal(buildMultiplicationRhymeItems().at(-1).hanzi, "九九八十一");
});

test("foundation state creates isolated challenge state", () => {
  const first = createFoundationState();
  const second = createFoundationState();
  first.bodyMatchedIds.add("head");
  first.greetingsChallengeOptionIds.push("hello");
  assert.equal(second.bodyMatchedIds.size, 0);
  assert.equal(second.greetingsChallengeOptionIds.length, 0);
});

test("family owns its lesson metadata, scenes, and matching set", () => {
  assert.equal(familyTopic.id, "family");
  assert.equal(familyTopic.interactiveScene, "family-home");
  assert.equal(familyTopic.steps.length, 4);
  assert.equal(familyPractice.length, 4);
  assert.equal(familyPractice[2].lines[0].hanzi, "我有两个弟弟。");
  assert.equal(familyPractice[2].lines[1].hanzi, "我有一个姐姐和一个弟弟。");
  assert.equal(familyPractice[2].lines[2].hanzi, "我有一个姐姐和一个哥哥。");
  assert.equal(familyPractice[3].lines[0].hanzi, "这是我的家人。");
  assert.equal(familyPractice[3].lines[1].hanzi, "我家有六口人。");
  assert.equal(familyGameItemIds.length, 6);
  assert.equal(Object.keys(illustratedFamily).length, 6);
});
