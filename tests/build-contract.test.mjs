import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import test from "node:test";
import { audioSourcePolicies, createAudioService } from "../src/core/audio.js";
import { bindBookWordAudioFeedback, bindSceneLineAudio, prepareSceneLineAudioCards, sceneLineAudioText } from "../src/core/scene-line-audio.js";
import { recordedAudioBoundaryIds, recordedAudioPlaybackWindow } from "../src/core/recorded-audio-boundaries.js";
import { recordedLearnAudioPath } from "../src/core/recorded-audio.js";
import { learnAudioEntries } from "../src/data/learn-audio-manifest.js";
import { recordedLearnAudioIds } from "../src/data/learn-recorded-audio.js";
import { filterLessonContent, filterLessonGroups, lessonScopeKey } from "../src/core/lesson-scoping.js";
import { advanceShuffledOrder, nextRandomCycleId } from "../src/core/random-cycle.js";
import { renderLessonNotes } from "../src/core/lesson-notes.js";
import { bookIdFromLocation, lessonScopeFromLocation, topicIdFromLocation, topicPageUrl, viewFromLocation } from "../src/core/router.js";
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
import { foodPreferenceFallbackAudioEntries, foodPreferencesTopic, foodPreferencesTopicData } from "../src/features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds, mealsFeelingsTopic, mealsFeelingsTopicData } from "../src/features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "../src/features/foundations/introductions.js";
import { ageBuildPhrases, agePractice, ageTopic } from "../src/features/foundations/age.js";
import { identityConversation, identityCountries, identityExploreCountries, identityLanguageQuestion, identityQuestion, identityTopic, languagesTopic, nationalityConversation } from "../src/features/foundations/identity.js";
import { greetingsGameItemIds, greetingsPractice, greetingsTopic } from "../src/features/foundations/greetings.js";
import { politeGameItemIds, politePractice, politeWordsTopic } from "../src/features/foundations/polite-words.js";
import { isItPracticeRounds, isItScene, isItTopic } from "../src/features/foundations/is-it.js";
import { pinyinBuildTasks, pinyinUnits } from "../src/features/foundations/pinyin-course.js";
import { requestBuildPhrases, requestGameItemIds, requestPractice, requestsPermissionTopic } from "../src/features/daily-life/requests-permission.js";
import { clothesBookWords, clothesMatchItems, clothesPractice, clothesSentenceItems, clothesTopic } from "../src/features/daily-life/clothes.js";
import { natureLesson, natureTopic, weatherLesson, weatherOutfitScenes, weatherTopic } from "../src/features/world/weather.js";
import { animalLessons, animalsTopic, petsTopic } from "../src/features/world/animals.js";
import { colourLessons, colourPreferenceFallbackAudioEntries, coloursTopic } from "../src/features/world/colours.js";
import { animalMeasureRounds, createWorldRuntime, natureFillRounds, weatherDressRounds, weatherFillRounds } from "../src/features/world/world-runtime.js";
import { hobbies3bTopic, hobbiesAtHomeTopic, hobbiesLeisureTopic, hobbiesTopic, toysTopic } from "../src/features/play-hobbies/play-hobbies.js";
import { createPlayHobbiesRuntime, hobbiesLessonAudioData, hobbiesSceneAudioEntries, toyPracticeAudioEntries, toySceneAudioEntries } from "../src/features/play-hobbies/play-hobbies-runtime.js";
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

test("shared lesson Notes stay concise, bilingual, and free of pinyin markup", () => {
  const markup = renderLessonNotes([{
    hanzi: "我喜欢猫。",
    explanation: "喜欢 works much like “like” in English.",
    examples: [{ hanzi: "我喜欢猫。", english: "I like cats." }]
  }]);

  assert.match(markup, /data-lesson-notes/);
  assert.match(markup, />Notes</);
  assert.match(markup, /喜欢 works much like/);
  assert.match(markup, /I like cats/);
  assert.match(markup, /visual-topic-note-example-separator[^>]*[^<]*>-/);
  assert.doesNotMatch(markup, /pinyin/i);
  assert.doesNotMatch(markup, /[—–]/);
});

test("the local page loads a single bundled application script", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<title>Nihao World \| Learn Chinese Through Language and Culture<\/title>/);
  assert.match(html, /name="description"\s+content="Nihao World helps children learn Chinese as a second language through interactive Mandarin practice and explore rich Chinese culture from the very beginning\."/);
  assert.match(html, /<link rel="canonical" href="https:\/\/nihaoworld\.org\/" \/>/);
  assert.doesNotMatch(html, /No Stress Learning Chinese/);
  assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=[^"]+" \/>/);
  assert.match(html, /<script src="app\.js\?v=[^"]+"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
  assert.doesNotMatch(html, /Tap a word to hear it and explore the picture\./);
  assert.doesNotMatch(html, /<h3>Review<\/h3>/);
});

test("Privacy and Safety opens a plain-language family page", () => {
  const html = readFileSync("index.html", "utf8");
  const privacyPage = readFileSync("about/privacy-safety/index.html", "utf8");
  const feedbackPage = readFileSync("about/feedback-problems/index.html", "utf8");
  const sourcesPage = readFileSync("about/sources-research/index.html", "utf8");
  const authorPage = readFileSync("about/author-project/index.html", "utf8");
  const aboutPages = [privacyPage, feedbackPage, sourcesPage, authorPage];
  const cultureSources = readFileSync("about/sources-research/culture-sources.js", "utf8");
  assert.match(html, /href="about\/privacy-safety\/"/);
  assert.match(html, /href="about\/feedback-problems\/"/);
  assert.match(feedbackPage, /https:\/\/forms\.gle\/ksfMPko89fj6PpzJ9/);
  assert.match(feedbackPage, /https:\/\/forms\.gle\/mrJ71Hfo5zXwmpDL6/);
  assert.match(feedbackPage, /Report a Problem/);
  assert.match(feedbackPage, /Share Feedback/);
  assert.match(html, /href="about\/sources-research\/"/);
  assert.match(sourcesPage, /Chinese Learning References/);
  assert.match(sourcesPage, /Culture Story Sources/);
  assert.match(sourcesPage, /Easy Steps to Chinese for Kids/);
  assert.match(sourcesPage, /Character writing technology &amp; data/);
  assert.match(sourcesPage, /https:\/\/github\.com\/chanind\/hanzi-writer"/);
  assert.match(sourcesPage, /https:\/\/github\.com\/chanind\/hanzi-writer-data"/);
  assert.match(sourcesPage, /selected, locally stored stroke outlines and median paths/);
  assert.match(sourcesPage, /Arphic Public License/);
  assert.match(cultureSources, /window\.NIHAO_CULTURE_SOURCES/);
  assert.match(cultureSources, /culture\/books\/figures\/mulan/);
  assert.match(html, /href="about\/author-project\/"/);
  assert.match(authorPage, /Benjamin Sun/);
  assert.match(authorPage, /Livingston High School/);
  assert.equal((authorPage.match(/assets\/photos\/benjamin-sun-portrait\.webp\?v=20260830-square-v1/g) ?? []).length, 1);
  assert.equal((authorPage.match(/width="582" height="582"/g) ?? []).length, 1);
  assert.match(authorPage, /gpt-4o-mini-tts/);
  assert.match(authorPage, /1,244/);
  assert.match(privacyPage, /No accounts/);
  assert.match(privacyPage, /the site is publicly available/);
  assert.doesNotMatch(privacyPage, /not yet publicly deployed/);
  assert.match(privacyPage, /Aggregate analytics only/);
  assert.match(privacyPage, /Cloudflare hosting and aggregate analytics/);
  assert.match(privacyPage, /do not use them to identify children/);
  assert.match(privacyPage, /do not require a Google sign-in/);
  assert.match(privacyPage, /contact email is optional/);
  assert.match(privacyPage, /© 2026 Nihao World\. All rights reserved\./);
  assert.match(privacyPage, /local storage to remember the selected Culture reading level/);
  assert.match(privacyPage, /No gore, blood, graphic injury, or frightening harm/);
  assert.match(privacyPage, /does not request microphone access/);
  for (const aboutPage of aboutPages) {
    assert.match(aboutPage, /zongzi-guide\.webp/);
    assert.match(aboutPage, /Made with curiosity, care, and technology\./);
    assert.match(aboutPage, /© 2026 Nihao World\. All rights reserved\./);
  }
});

test("the mobile menu exposes About and production pages show site copyright", () => {
  const homePage = readFileSync("index.html", "utf8");
  const footerSource = readFileSync("site-footer.js", "utf8");
  const cultureTemplate = readFileSync("culture/shared/template.html", "utf8");
  const culturePages = [];
  const collectCulturePages = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filePath = join(directory, entry.name);
      if (entry.isDirectory()) collectCulturePages(filePath);
      if (entry.isFile() && entry.name === "index.html") culturePages.push(filePath);
    }
  };
  collectCulturePages("culture/books");

  assert.match(homePage, /class="global-view-item" href="about\/author-project\/"/);
  assert.match(homePage, /<span class="global-view-zh">关于<\/span>/);
  assert.match(homePage, /<span class="global-view-en">About<\/span>/);
  assert.match(homePage, /site-footer\.js/);
  assert.match(footerSource, /zongzi-guide\.webp/);
  assert.match(footerSource, /Made with curiosity, care, and technology\./);
  assert.match(footerSource, /© 2026 Nihao World\. All rights reserved\./);
  assert.match(cultureTemplate, /site-footer\.js/);
  assert.equal(culturePages.length, 103);
  for (const pagePath of culturePages) {
    assert.match(readFileSync(pagePath, "utf8"), /site-footer\.js/, `${pagePath} is missing the site footer`);
  }
});

test("scene sentence cards support independent playback without changing scene playback", () => {
  const attributes = new Map();
  const classes = new Set();
  const hanzi = { textContent: "文具盒里有铅笔。" };
  const card = {
    querySelector: (selector) => selector === ".telephone-line-hanzi" ? hanzi : null,
    setAttribute: (name, value) => attributes.set(name, value),
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name)
    },
    offsetWidth: 0
  };
  const listeners = new Map();
  const root = {
    querySelectorAll: (selector) => selector === ".greetings-line-card" ? [card] : [],
    addEventListener: (type, listener) => listeners.set(type, listener),
    contains: (element) => element === card
  };
  const target = { closest: (selector) => selector === ".greetings-line-card" ? card : null };
  const spoken = [];

  assert.equal(sceneLineAudioText(card), "文具盒里有铅笔。");
  prepareSceneLineAudioCards(root);
  assert.equal(card.tabIndex, 0);
  assert.equal(attributes.get("role"), "button");
  assert.equal(attributes.get("aria-label"), "Play: 文具盒里有铅笔。");

  bindSceneLineAudio(root, { speak: (text, rate) => spoken.push([text, rate]), isEnabled: () => true });
  listeners.get("click")({ target });
  assert.deepEqual(spoken, [["文具盒里有铅笔。", 0.78]]);
  assert.equal(classes.has("is-audio-playing"), true);
});

test("Book Word cards use the same brief audio feedback", async () => {
  const classes = new Set();
  const bookWord = {
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name)
    },
    offsetWidth: 0
  };
  const listeners = new Map();
  const root = {
    addEventListener: (type, listener) => listeners.set(type, listener),
    contains: (element) => element === bookWord
  };
  const target = { closest: (selector) => selector.includes(".school-word-card") ? bookWord : null };

  bindBookWordAudioFeedback(root);
  listeners.get("click")({ target });
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(classes.has("is-audio-playing"), true);
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

test("Age listening stays on a solved round until its green New game button is pressed", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const ageSource = readFileSync("src/features/foundations/age-controller.js", "utf8");

  assert.match(practiceSource, /data-age-game-play>\$\{state\.ageChallengeResult === "correct" \? "New game" : "Play"\}/);
  assert.match(ageSource, /function handleAgeChallengePlay\(\) \{[\s\S]{0,260}state\.ageChallengeResult === "correct"[\s\S]{0,180}resetAgeChallenge\(\);[\s\S]{0,260}speak\(nextItem\.audio, 0\.78\)[\s\S]{0,160}return;/);
  assert.doesNotMatch(ageSource, /window\.setTimeout\(\(\) => \{ resetAgeChallenge\(\)/);
  assert.doesNotMatch(practiceSource, /<h4>Which line did you hear\?<\/h4>|<p class="body-match-kicker">Build the phrase<\/p>|<h4>\$\{buildTarget\.prompt\}<\/h4>/);
  assert.match(ageSource, /state\.ageBuildFeedback = options\.feedback \?\? "";/);
  assert.match(practiceSource, /state\.ageBuildFeedback \? `<p class="greetings-game-feedback">\$\{state\.ageBuildFeedback\}<\/p>` : ""/);
  assert.match(practiceSource, /<p class="body-match-kicker">Listen and choose<\/p>\s*<p class="numbers-game-note">Play the audio, then tap the matching age or grade question or answer\.<\/p>/);
  assert.match(practiceSource, /<p class="body-match-kicker">Build a sentence<\/p>\s*<p class="numbers-game-note">Tap the word pieces in order to build the sentence\.<\/p>/);
  assert.doesNotMatch(ageSource, /Correct! \$\{target\.targetHanzi\}/);
});

test("Age Listen and Choose uses a stable two-by-two answer grid", () => {
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(practiceSource, /<div class="numbers-game-options age-listen-options">/);
  assert.match(styles, /\.age-listen-options \{[\s\S]{0,120}grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(styles, /\.age-listen-options \.greetings-game-option \{[\s\S]{0,180}justify-items: start;[\s\S]{0,180}padding-inline: 20px;[\s\S]{0,120}text-align: left;/);
});

test("shared game headings use compact, consistent title and instruction spacing", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.numbers-game-top > div \{[\s\S]{0,80}gap: 4px;/);
  assert.match(styles, /\.numbers-game-note \{[\s\S]{0,160}font-size: 0\.95rem;[\s\S]{0,120}margin: 0;/);
  assert.match(styles, /\.numbers-game-top \.body-match-kicker \{[\s\S]{0,120}font-size: 1\.1rem;/);
  assert.match(styles, /\.practice-split-card \{[\s\S]{0,80}gap: 10px;/);
  assert.match(styles, /\.clothes-quiz-shell \{[\s\S]{0,80}gap: 10px;/);
});

test("listen-and-choose card copy uses one shared left edge", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.numbers-game-option\.family-listen-option \{[\s\S]{0,260}grid-template-columns: minmax\(0, 1fr\);[\s\S]{0,260}align-items: stretch;/);
  assert.match(styles, /\.family-listen-copy \{[\s\S]{0,300}grid-template-rows: 2\.1rem 1\.5rem 2\.5rem;[\s\S]{0,300}height: 100%;/);
  assert.match(styles, /\.family-listen-copy \.numbers-game-hanzi,[\s\S]{0,360}align-self: center;[\s\S]{0,120}justify-self: stretch;[\s\S]{0,120}text-align: left;/);
});

test("correct Listen and Choose answers show feedback without replaying the prompt", () => {
  const sources = {
    greetings: readFileSync("src/features/foundations/greetings-controller.js", "utf8"),
    politeWords: readFileSync("src/features/foundations/polite-words-controller.js", "utf8"),
    introductions: readFileSync("src/features/foundations/introductions-controller.js", "utf8"),
    age: readFileSync("src/features/foundations/age-controller.js", "utf8"),
    familyAndNumbers: readFileSync("src/features/foundations/foundations-runtime.js", "utf8"),
    weekdaysAndDates: readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8"),
    school: readFileSync("src/features/school-life/school-food-runtime.js", "utf8")
  };
  assert.doesNotMatch(sources.greetings, /function handleGreetingsChallengeGuess[\s\S]{0,900}speak\(answer\.audio/);
  assert.doesNotMatch(sources.politeWords, /function handlePoliteChallengeGuess[\s\S]{0,900}speak\(answer\.audio/);
  assert.doesNotMatch(sources.introductions, /function handleIntroductionsChallengeGuess[\s\S]{0,800}speak\(answerPrompt\.audio/);
  assert.doesNotMatch(sources.age, /function handleAgeChallengeGuess[\s\S]{0,800}speak\(answer\.audio/);
  assert.doesNotMatch(sources.familyAndNumbers, /function handleFamilyChallengeGuess[\s\S]{0,800}speak\(answer\.audio/);
  assert.doesNotMatch(sources.familyAndNumbers, /function handleNumberChallengeGuess[\s\S]{0,800}speak\(targetItem\.audio/);
  assert.doesNotMatch(sources.weekdaysAndDates, /function handleWeekdayChallengeGuess[\s\S]{0,700}speak\(/);
  assert.doesNotMatch(sources.weekdaysAndDates, /function handleDateChallengeGuess[\s\S]{0,700}speak\(/);
  assert.doesNotMatch(sources.school, /function handleSchoolChallengeGuess[\s\S]{0,420}speak\(/);
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

test("Greetings matching keeps selection quiet until an answer is checked", () => {
  const greetingsSource = readFileSync("src/features/foundations/greetings-controller.js", "utf8");
  assert.doesNotMatch(greetingsSource, /Now find the situation/);
  assert.match(greetingsSource, /state\.greetingsSelectedPhraseId = itemId;[\s\S]{0,260}state\.greetingsMatchFeedback = "";/);
});

test("Greetings matching uses a shared left edge inside both card columns", () => {
  const styles = readFileSync("styles.css", "utf8");
  assert.match(styles, /\.greetings-practice-shell \.polite-match-card \{[\s\S]{0,160}justify-items: stretch;[\s\S]{0,120}text-align: left;/);
  assert.match(styles, /\.greetings-practice-shell \.polite-match-card-meaning \.match-answer-label \{[\s\S]{0,100}text-align: left;/);
});

test("Listen and choose plays audio without adding a redundant instruction", () => {
  const greetingsSource = readFileSync("src/features/foundations/greetings-controller.js", "utf8");
  const politeSource = readFileSync("src/features/foundations/polite-words-controller.js", "utf8");
  const introductionsSource = readFileSync("src/features/foundations/introductions-controller.js", "utf8");
  const ageSource = readFileSync("src/features/foundations/age-controller.js", "utf8");
  const familySource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const nationalitySource = readFileSync("src/features/foundations/nationality-controller.js", "utf8");

  assert.doesNotMatch(greetingsSource, /Listen again and find/);
  assert.doesNotMatch(politeSource, /Listen carefully, then tap the matching card/);
  assert.doesNotMatch(introductionsSource, /Listen again, then tap the child/);
  assert.doesNotMatch(ageSource, /Listen again and find/);
  assert.doesNotMatch(familySource, /Listen again and find/);
  assert.doesNotMatch(nationalitySource, /Press Play\. Listen to the conversation|Listen carefully, then choose the nationality/);
});

test("Listen and choose uses card checks instead of correct-answer sentences", () => {
  const sources = [
    "src/features/foundations/greetings-controller.js",
    "src/features/foundations/polite-words-controller.js",
    "src/features/foundations/introductions-controller.js",
    "src/features/foundations/age-controller.js",
    "src/features/foundations/foundations-runtime.js",
    "src/features/foundations/nationality-controller.js",
    "src/features/school-life/school-food-runtime.js"
  ].map((file) => readFileSync(file, "utf8")).join("\n");

  assert.doesNotMatch(sources, /Correct!.*(?:matches the audio|said|Read the conversation|Read the sentence)/);
  assert.doesNotMatch(sources, /Nice listening\.|schoolListenFeedback = "Correct!"/);
});

test("Polite Words matching keeps selection quiet until an answer is checked", () => {
  const politeSource = readFileSync("src/features/foundations/polite-words-controller.js", "utf8");
  assert.doesNotMatch(politeSource, /Now find the meaning/);
  assert.match(politeSource, /state\.politeSelectedPhraseId = itemId;[\s\S]{0,260}state\.politeMatchFeedback = "";/);
});

test("Greeting and polite matching rely on card checks for successful feedback", () => {
  const greetingsSource = readFileSync("src/features/foundations/greetings-controller.js", "utf8");
  const politeSource = readFileSync("src/features/foundations/polite-words-controller.js", "utf8");
  assert.doesNotMatch(greetingsSource, /Correct! .*matches that situation|Great job! You matched all the greetings/);
  assert.doesNotMatch(politeSource, /Correct! .*matches that meaning|Great job! You matched all the polite phrases/);
});

test("matching games keep selection and success feedback on the cards", () => {
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const nationalitySource = readFileSync("src/features/foundations/nationality-controller.js", "utf8");
  const timeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.doesNotMatch(foundationsSource, /Now find who matches|All family members matched|Now choose its answer|Grandparents profile complete|Matched\. Choose the next question/);
  assert.doesNotMatch(nationalitySource, /Now choose the matching country symbol|Great job! You matched every country|Correct! Choose another flag and country name/);
  assert.doesNotMatch(timeSource, /weekdayMatchFeedback = "Matched\."/);
  assert.doesNotMatch(schoolSource, /schoolMatchFeedback = "Correct!"/);
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
  const sharedPracticeSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  const styles = readFileSync("styles.css", "utf8");
  assert.match(practiceSource, /const familyPracticeSummary = \{[\s\S]{0,700}shellClass: "family-lesson-practice-shell"/);
  assert.match(practiceSource, /feedback: \(\) => state\.familyMatchFeedback,[\s\S]{0,100}showPlayAgain: false/);
  assert.match(sharedPracticeSource, /is-practice-advance-button" type="button" data-template-match-new aria-label="Start a new game">New game/);
  assert.match(sharedPracticeSource, /matchedIds\.size > 0 && matchedIds\.size < config\.items\(\)\.length[\s\S]{0,240}data-template-match-clear/);
  assert.doesNotMatch(sharedPracticeSource, /data-template-match-play-again/);
  assert.match(styles, /\.family-lesson-practice-shell \.family-match-open-board \.polite-match-card \{[\s\S]{0,120}height: 104px;/);
});

test("lesson scope keeps all-topic content first and filters every My Family section", () => {
  const detailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");

  assert.match(detailSource, /topicLessonStrip\.innerHTML = allContentCard \+ steps/);
  assert.match(detailSource, /const allContentCard = steps\.length > 1/);
  assert.match(detailSource, /const lesson = books/);
  assert.match(detailSource, /return \[lesson\?\.displayTitle\?\.zh, lesson\?\.displayTitle\?\.en\]\.filter\(Boolean\)\.join\(" · "\) \|\| step\.title/);
  assert.match(detailSource, /<strong>\$\{topicLessonTitle\(step\)\}<\/strong>/);
  assert.match(detailSource, /topicSummary\.textContent = scopedStep\?\.note \?\? topic\.summary/);
  assert.match(detailSource, /event\.target\.closest\("\[data-topic-all-content\]"\)/);
  assert.match(detailSource, /state\.lessonScope = null;[\s\S]{0,100}syncBookSelectionFromTopic\(\)/);
  assert.match(foundationsSource, /familyBookWordItems\(\)[\s\S]{0,360}lessonSources\?\.includes\(source\)/);
  assert.match(foundationsSource, /familyPractice[\s\S]{0,800}lessonSources\?\.includes/);
  assert.match(foundationsSource, /const familyScope = state\.lessonScope[\s\S]{0,180}if \(topic\.id === "family"\)/);
  assert.match(foundationsSource, /familyScope === "1b:2"[\s\S]{0,500}哥哥 \/ 弟弟 \/ 姐姐 \/ 妹妹/);
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

test("Pinyin listening practice uses the shared no-repeat random cycle", () => {
  const runtimeSource = readFileSync("src/features/foundations/pinyin-runtime.js", "utf8");
  assert.match(runtimeSource, /nextRandomCycleId\(state, cycleKey, rounds\.map/);
  assert.match(runtimeSource, /nextRandomCycleId\(state, `pinyin-chapter:\$\{unit\.id\}`, rounds\.map/);
  assert.doesNotMatch(runtimeSource, /Math\.random/);
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

test("deployed raster images stay within the site-wide asset budget", () => {
  const tracked = spawnSync("git", ["ls-files", "--", "*.webp", "*.png"], { encoding: "utf8" });
  assert.equal(tracked.status, 0);
  const deployedImages = tracked.stdout
    .split("\n")
    .filter(Boolean)
    .filter((file) => existsSync(file))
    .filter((file) => (
      (file.startsWith("assets/") && !file.startsWith("assets/_png-archive/"))
      || (file.startsWith("culture/")
        && !file.startsWith("culture/content/")
        && !file.startsWith("culture/image-archive/"))
    ));

  const pngs = deployedImages.filter((file) => file.endsWith(".png"));
  assert.deepEqual(pngs, [], "PNG files belong in the excluded archive, not the deployed site");

  for (const file of deployedImages.filter((item) => item.endsWith(".webp"))) {
    assert.ok(statSync(file).size <= 120 * 1024, `${file} exceeds the 120 KB deployed image budget`);
  }

  const singleFoodItems = deployedImages.filter((file) => (
    file.startsWith("assets/illustrated-food/")
    && !["assets/illustrated-food/game-shopping-cart.webp", "assets/illustrated-food/fruit-group-1b-core.webp"].includes(file)
  ));
  for (const file of singleFoodItems) {
    assert.ok(statSync(file).size <= 40 * 1024, `${file} exceeds the 40 KB single-item image budget`);
  }
});

test("the Chinese landing-page headline is slightly reduced while keeping its original palette", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.library-hero h1 \{[\s\S]*font-size: clamp\(2\.3rem, 4vw, 3\.4rem\)[\s\S]*background: linear-gradient\(135deg, #7c5420, #b8863e\)/);
  assert.match(stylesSource, /\.library-hero h2 \{[\s\S]*font-size: clamp\(1\.3rem, 2\.2vw, 1\.7rem\)[\s\S]*color: var\(--sun\)/);
});

test("the landing hero features five scrollable culture-story highlights", () => {
  const html = readFileSync("index.html", "utf8");
  const carouselSource = readFileSync("src/core/story-highlights.js", "utf8");
  assert.match(html, /<section class="story-highlights" data-story-highlights/);
  assert.equal((html.match(/data-story-highlight-dot=/g) ?? []).length, 5);
  assert.match(html, /culture\/books\/folk-tales\/monkey-king\/index\.html/);
  assert.match(html, /culture\/books\/figures\/mulan\/index\.html/);
  assert.match(html, /culture\/books\/politics\/emperor-day\/index\.html\?reading=story/);
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
  assert.equal(viewFromLocation({ search: "?view=books&book=2a", hash: "#book-lessons-2a" }), "books");
  assert.equal(bookIdFromLocation({ search: "?view=books&book=2a", hash: "#book-lessons-2a" }, books), "2a");
  assert.equal(bookIdFromLocation({ search: "", hash: "#book-lessons-4b" }, books), "4b");
  assert.equal(bookIdFromLocation({ search: "?book=9z", hash: "#book-lessons-9z" }, books), null);
});

test("Culture category headers stay compact on phones", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /@media \(max-width: 520px\) \{[\s\S]*?\.culture-category-section \.cat-head \{[\s\S]{0,220}grid-template-columns: 56px minmax\(0, 1fr\);[\s\S]{0,220}flex-wrap: nowrap;/);
  assert.match(stylesSource, /\.culture-category-section \.cat-head > div \{[\s\S]{0,100}flex: none;/);
});

test("Culture stories render their single canonical page.md manuscript", () => {
  const source = readFileSync("culture/content/figures/mulan/page.md", "utf8");
  const bookHtml = readFileSync("culture/books/figures/mulan/index.html", "utf8");
  assert.match(source, /^title_zh: /m);
  assert.match(bookHtml, /木兰的勇敢旅程/);
  assert.doesNotMatch(bookHtml, /data-reading-version|data-reading-level-button|easyChineseCultureReadingLevel|difficulty-badge/);
  const catalogHtml = readFileSync("index.html", "utf8");
  assert.doesNotMatch(catalogHtml, /culture-reading-level|culture-level-picker|culture-difficulty|data-culture-reading-level/);
  assert.equal(existsSync("culture-reading-level.js"), false);
});

test("Culture generates one previewable output tree under books", () => {
  assert.equal(existsSync("culture/experiments"), false);
  const cultureBuildScripts = readdirSync("scripts")
    .filter((file) => /^build_.+_all\.mjs$/.test(file));
  for (const file of cultureBuildScripts) {
    assert.doesNotMatch(readFileSync(join("scripts", file), "utf8"), /target:\s*["']experiments["']/);
  }
  assert.doesNotMatch(readFileSync("scripts/build_philosophy_page.mjs", "utf8"), /books\|experiments/);
});

test("Learn by Books shows each textbook directly and links lessons to topic practice", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(navigationSource, /class="learning-home-board book-library-grid"/);
  assert.match(navigationSource, /data-book-browser="\$\{entry\.id\}"/);
  assert.match(navigationSource, /data-book-lesson-section="\$\{entry\.id\}"/);
  assert.match(navigationSource, /const cardTitle = \[lesson\.displayTitle\?\.zh, lesson\.displayTitle\?\.en\]\.filter\(Boolean\)\.join\(" · "\) \|\| lesson\.title/);
  assert.ok(books.every((book) => book.lessons.every((lesson) => lesson.displayTitle?.zh && lesson.displayTitle?.en)));
  assert.match(navigationSource, /<span class="book-lesson-meta">\$\{entry\.label\.toUpperCase\(\)\} LESSON \$\{lesson\.lesson\}<\/span>/);
  assert.match(navigationSource, /<strong>\$\{cardTitle\}<\/strong>/);
  assert.doesNotMatch(navigationSource, /主题练习：/);
  assert.doesNotMatch(navigationSource, /topicLabels/);
  assert.doesNotMatch(navigationSource, /topic-row-meta">\$\{category\.hint\}/);
  assert.doesNotMatch(navigationSource, /data-book-category-card/);
});

test("topic cards keep their bilingual title together above the description", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(navigationSource, /class="category-topic-title"/);
  assert.match(navigationSource, /class="category-topic-separator" aria-hidden="true">·<\/span>/);
  assert.match(stylesSource, /\.category-topic-title \{\s*display: flex;/);
  assert.match(stylesSource, /\.category-topic-hint \{[\s\S]*font-size: 0\.98rem/);
});

test("category home cards stack their Chinese and English titles", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.learning-home-card:not\(\.book-library-card\) \.topic-zh-title,/);
  assert.match(stylesSource, /\.learning-home-card:not\(\.book-library-card\) \.topic-row-title::before \{\s*content: none;/);
});

test("sticky category navigation highlights the final item at the bottom of the page", () => {
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(navigationSource, /const atPageBottom = \(\) =>/);
  assert.match(navigationSource, /activeCategoryId = sections\[sections\.length - 1\]/);
  assert.match(navigationSource, /activeBookId = bookSections\[bookSections\.length - 1\]/);
  assert.match(navigationSource, /if \(!state\.topicPageOpen\) \{/);
  assert.match(navigationSource, /let activeBookId = state\.selectedBookId/);
});

test("direct topic links immediately focus the topic detail for every topic", () => {
  const landingHtml = readFileSync("index.html", "utf8");
  const runtimeWiringSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(landingHtml, /class="detail-back-nav" aria-label="Return to learning paths"/);
  assert.match(landingHtml, /href="#topics-panel" data-global-view="topics" data-return-target="topic">← Back to Topics/);
  assert.match(landingHtml, /class="detail-back-link is-book" href="#books-panel" data-global-view="books" data-return-target="book">← Back to Books/);
  assert.match(stylesSource, /\.detail-back-nav \{\s*display: flex;/);
  assert.match(stylesSource, /\.detail-back-link\.is-book \{/);
  assert.match(runtimeWiringSource, /if \(initialTopicId\) \{\s*requestAnimationFrame\(\(\) => focusLearningPanel\(\)\);/);
  assert.match(navigationSource, /state\.topicPageOpen = true;\s*syncBookSelectionFromTopic\(\);\s*renderTopics\(\);/);
  assert.match(stylesSource, /html \{\s*scroll-behavior: auto;/);
});

test("the generated bundle keeps its source-of-truth marker", () => {
  const bundle = readFileSync("app.js", "utf8");
  assert.match(bundle, /This file is automatically generated from src\/main\.js\. Do not edit manually/);
});

test("Pinyin covers the complete primary-school sound and spelling path", () => {
  assert.equal(pinyinUnits.length, 18);
  assert.deepEqual(
    pinyinUnits.filter((unit) => unit.groupId === "initials").flatMap((unit) => unit.sounds),
    ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"]
  );
  assert.deepEqual(pinyinUnits.find((unit) => unit.id === "tones")?.sounds, ["mā", "má", "mǎ", "mà"]);
  assert.deepEqual(
    pinyinUnits.filter((unit) => ["single-finals", "compound-one", "compound-two", "front-nasal", "back-nasal"].includes(unit.id)).flatMap((unit) => unit.sounds),
    ["a", "o", "e", "i", "u", "ü", "ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er", "an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"]
  );
  assert.deepEqual(
    pinyinUnits.filter((unit) => ["whole-zhchshr", "whole-zcs", "whole-yiwu", "whole-yueyuan"].includes(unit.id)).flatMap((unit) => unit.sounds),
    ["zhi", "chi", "shi", "ri", "zi", "ci", "si", "yi", "wu", "yu", "ye", "yue", "yuan", "yin", "yun", "ying"]
  );
  assert.match(pinyinUnits.find((unit) => unit.id === "blending-tones")?.note ?? "", /two-part blend/);
  assert.equal(Object.keys(pinyinBuildTasks).length, pinyinUnits.length - 1);
});

test("Pinyin keeps each chapter in a listen, choose, then build learning loop", () => {
  const runtimeSource = readFileSync("src/features/foundations/pinyin-runtime.js", "utf8");
  assert.match(runtimeSource, /data-pinyin-listen/);
  assert.match(runtimeSource, /data-pinyin-practice-choice/);
  assert.match(runtimeSource, /data-pinyin-build-piece/);
  assert.match(runtimeSource, /data-pinyin-group/);
  assert.doesNotMatch(runtimeSource, /data-pinyin-unit-select/);
});

test("Review images start together while game art stays lazy", () => {
  const imageLoadingSource = readFileSync("src/core/image-loading.js", "utf8");
  const worldSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  const pictographSource = readFileSync("src/features/foundations/pictograph-runtime.js", "utf8");
  const practiceSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const runtimeWiringSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  assert.match(imageLoadingSource, /loading="eager" decoding="async"/);
  assert.match(imageLoadingSource, /loading="lazy" decoding="async"/);
  assert.match(imageLoadingSource, /if \(eager\) \{\s*image\.loading = "eager";/);
  assert.match(runtimeWiringSource, /applyImageLoading\(focusExplorer, \{ eager: true \}\)/);
  assert.match(worldSource, /imageLoadingAttrs\(\{ primary: true \}\)/);
  assert.match(pictographSource, /applyImageLoading\(focusExplorer, \{ eager: true \}\)/);
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
  assert.match(foundationsSource, /is-practice-advance-button" type="button" data-body-advance-match/);
  assert.doesNotMatch(lessonSource, /data-(room-build|comparison-build|position-quiz|transport-build|clock-quiz|time-routine-quiz|clothes-quiz)-next/);
  assert.doesNotMatch(schoolSource, /data-(school-build|stationery-picture-match|meals-picture)-next/);
  assert.doesNotMatch(worldSource, /data-world-colour-next/);
  assert.doesNotMatch(foundationsSource, /data-body-(next-round|play-again)/);
});

test("sentence builders keep New game and Clear as separate actions", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  const lessonSource = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const hobbiesSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.match(stylesSource, /Clear restarts only the learner's answer; it must never look like New game/);
  for (const source of [lessonSource, hobbiesSource, schoolSource]) {
    assert.match(source, /small-button is-clear-button" type="button" data-[a-z-]+-clear/);
  }
  assert.match(lessonSource, /data-request-builder-new aria-label="Start a new game">New game/);
  assert.match(lessonSource, /function clearRequestBuilder/);
  assert.match(lessonSource, /state\.requestBuildTargetId = target\.id/);
  assert.match(lessonSource, /data-time-routine-builder-clear[\s\S]{0,250}resetTimeRoutineBuilder\(\)/);
  assert.match(hobbiesSource, /data-hobbies-build-new aria-label="Start a new game">New game/);
  assert.match(hobbiesSource, /data-hobbies-build-clear[\s\S]{0,160}resetRound\(\)/);
  assert.doesNotMatch(hobbiesSource, /data-hobbies-build-clear[\s\S]{0,160}resetRound\(true\)/);
});

test("completed games never append a second green New game button below their board", () => {
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  const sharedPracticeSource = readFileSync("src/games/shared-lesson-practice.js", "utf8");
  assert.doesNotMatch(foundationsSource, /identity-practice-feedback[\s\S]{0,260}is-(?:new-game-button|practice-advance-button)/);
  assert.match(foundationsSource, /data-nationality-next-round aria-label="Start a new game">New game/);
  assert.match(foundationsSource, /data-flag-next-round aria-label="Start a new game">New game/);
  assert.doesNotMatch(sharedPracticeSource, /data-template-match-play-again/);
  assert.doesNotMatch(schoolSource, /data-template-match-play-again/);
});

test("picture-led practice cards keep their image centered", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.clothes-quiz-visual \{[\s\S]*margin: 0 auto;[\s\S]*justify-self: center;/);
  assert.match(stylesSource, /\.clothes-quiz-image \{[\s\S]*object-fit: contain;/);
});

test("compact practice layout keeps pictures beside choices until phone width", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  const lessonRuntime = readFileSync("src/core/lesson-practice-runtime.js", "utf8");
  const hobbiesRuntime = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(stylesSource, /\.practice-compact-split \{[\s\S]{0,220}grid-template-columns: minmax\(220px, 0\.82fr\) minmax\(0, 1\.18fr\);/);
  assert.match(stylesSource, /@media \(max-width: 760px\) \{[\s\S]{0,420}\.practice-compact-split \{[\s\S]{0,120}grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(lessonRuntime, /request-sentence-builder practice-compact-split/);
  assert.match(lessonRuntime, /topic\.id === "greetings"[\s\S]{0,180}shellClass: "lesson-practice-shell greetings-practice-shell"/);
  assert.match(stylesSource, /\.greetings-practice-shell \.polite-match-card,[\s\S]{0,160}\.polite-words-practice-shell \.polite-match-card,[\s\S]{0,160}\.weekdays-practice-shell \.polite-match-card \{[\s\S]{0,160}grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(lessonRuntime, /topic\.id === "polite-words"[\s\S]{0,180}shellClass: "lesson-practice-shell polite-words-practice-shell"/);
  assert.match(lessonRuntime, /topic\.id === "weekdays"[\s\S]{0,180}shellClass: "lesson-practice-shell weekdays-practice-shell"/);
  assert.match(lessonRuntime, /requests-permission-practice-shell/);
  assert.match(stylesSource, /\.requests-permission-practice-shell \.polite-match-card \{[\s\S]{0,160}grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(lessonRuntime, /is-it-practice-shell practice-compact-split/);
  assert.match(stylesSource, /\.is-it-practice-shell \{[\s\S]{0,120}width: 100%;[\s\S]{0,120}max-width: none;/);
  assert.match(lessonRuntime, /is-it-practice-board/);
  assert.match(stylesSource, /\.is-it-practice-board \{[\s\S]{0,160}grid-template-columns: minmax\(240px, 1fr\) minmax\(240px, 1fr\);/);
  assert.match(stylesSource, /\.is-it-practice-options \{[\s\S]{0,180}grid-template-columns: minmax\(0, 1fr\);[\s\S]{0,120}height: auto;/);
  assert.match(lessonRuntime, /function playIsItQuestion\(\)[\s\S]{0,160}speak\(round\.question, 0\.78\)/);
  assert.match(lessonRuntime, /data-is-it-practice-new[\s\S]{0,220}playIsItQuestion\(\)/);
  assert.doesNotMatch(lessonRuntime, /\$\{complete && answer \? `<div class="everyday-actions-answer"/);
  assert.match(hobbiesRuntime, /toys-practice-shell practice-compact-split/);
  assert.match(hobbiesRuntime, /clothes-quiz-shell practice-compact-split/);
  assert.match(hobbiesRuntime, /const leisureShellClass = isLeisure \? " practice-compact-split hobbies-leisure-practice-shell"/);
  assert.match(hobbiesRuntime, /const leisureVisualClass = isLeisure \? " practice-compact-visual"/);
  assert.match(hobbiesRuntime, /const leisureContentStart = isLeisure \? '<div class="practice-compact-content hobbies-leisure-practice-content">'/);
  assert.match(hobbiesRuntime, /topic\.id === "hobbies-at-home" \? " hobbies-at-home-sentence-choice-options"/);
  assert.match(stylesSource, /\.hobbies-at-home-sentence-choice-options \{[\s\S]{0,100}grid-template-columns: minmax\(0, 1fr\);/);
});

test("Meals & Feelings matching stacks its complete sentence copy inside each card", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  assert.match(schoolSource, /family-practice-shell lesson-practice-shell meals-feelings-practice-shell/);
  assert.match(stylesSource, /\.lesson-practice-shell\.meals-feelings-practice-shell \.polite-match-card\.meals-match-card \{[\s\S]{0,200}min-height: 126px;[\s\S]{0,220}grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(stylesSource, /\.meals-feelings-practice-shell \.meals-match-copy \.numbers-game-hanzi \{[^}]*white-space: nowrap;/);
});

test("Meals & Feelings picture choice keeps its image beside a 2-by-2 answer board", () => {
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");

  assert.match(schoolSource, /clothes-quiz-shell meals-picture-choice practice-compact-split/);
  assert.match(schoolSource, /time-routine-quiz-visual practice-compact-visual/);
  assert.match(schoolSource, /<div class="practice-compact-content">\s*<div class="clothes-quiz-options sentence-choice-options">/);
  assert.match(stylesSource, /\.meals-picture-choice\.practice-compact-split \{[\s\S]{0,200}grid-template-rows: auto 400px;/);
  assert.match(stylesSource, /\.meals-picture-choice \.clothes-quiz-options \{[\s\S]{0,160}grid-template-rows: repeat\(2, minmax\(0, 1fr\)\);[\s\S]{0,80}height: 400px;/);
});

test("Toys picture choice keeps four roomy options and a fixed answer area", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(runtimeSource, /slice\(0, 3\)/);
  assert.match(runtimeSource, /shuffled\(\[itemId, \.\.\.distractorIds\]\)/);
  assert.doesNotMatch(runtimeSource, /toy-practice-answer-pinyin/);
  assert.match(runtimeSource, /toy-practice-answer-english\$\{complete \? "" : " is-placeholder"\}/);
  assert.match(stylesSource, /\.toys-practice-shell \.clothes-quiz-options \{[\s\S]{0,120}repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(stylesSource, /\.toy-practice-answer \{[\s\S]{0,120}min-height: 4\.8rem;/);
  assert.match(stylesSource, /\.toys-practice-shell > \.practice-compact-visual \{[\s\S]{0,180}align-self: stretch;[\s\S]{0,120}aspect-ratio: auto;/);
  assert.match(stylesSource, /\.toys-practice-shell \.clothes-quiz-option \{[\s\S]{0,180}grid-template-rows: repeat\(3, auto\);/);
  assert.match(stylesSource, /\.toys-practice-shell \.clothes-quiz-option > \.numbers-game-pinyin \{[\s\S]{0,100}text-align: center;/);
  assert.match(stylesSource, /\.toys-practice-shell \.clothes-quiz-option > \.numbers-game-english \{[\s\S]{0,100}text-align: center;/);
  assert.match(stylesSource, /\.toys-practice-shell\.practice-compact-split \{[\s\S]{0,180}grid-template-rows: auto 332px;/);
  assert.match(stylesSource, /\.toy-practice-sentence-row \{[\s\S]{0,140}justify-content: flex-start;/);
  assert.match(stylesSource, /\.toy-practice-answer-english \{[\s\S]{0,80}justify-self: start;/);
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

test("Hobbies practice rounds keep their picture, prompt, and answer choices in one round state", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  const roundSets = [
    ["3b:4", hobbies3bTopic.focusItems],
    ["4b:4", hobbiesAtHomeTopic.focusItems],
    ["4b:7", hobbiesLeisureTopic.focusItems]
  ];

  for (const [lessonKey, items] of roundSets) {
    const rounds = hobbiesLessonAudioData[lessonKey].rounds;
    assert.equal(new Set(rounds.map((round) => round.itemId)).size, rounds.length, `${lessonKey} has unique rounds`);
    for (const round of rounds) {
      assert.ok(items.some((item) => item.id === round.itemId && item.imagePath), `${lessonKey}:${round.itemId} has its own picture`);
      assert.ok(round.answers?.length || round.optionIds?.length, `${lessonKey}:${round.itemId} has linked answer choices`);
    }
  }

  assert.match(runtimeSource, /const round = \(\) => lesson\(\)\.rounds\.find\(\(entry\) => entry\.itemId === state\.hobbiesBuildOrder\[state\.hobbiesBuildRoundIndex\]\)/);
  assert.match(runtimeSource, /if \(!sameLesson\) \{[\s\S]{0,420}state\.hobbiesBuildOrder = \[\];[\s\S]{0,180}state\.hobbiesBuildRoundIndex = 0;/);
  assert.match(runtimeSource, /const item = topic\.focusItems\.find\(\(item\) => item\.id === entry\.itemId\)/);
  assert.match(runtimeSource, /const item = topic\.focusItems\.find\(\(focusItem\) => focusItem\.id === entry\.itemId\)/);
  assert.match(runtimeSource, /data-hobbies-build-new[\s\S]{0,180}resetRound\(true\)/);
  assert.match(runtimeSource, /data-hobbies-choice-new[\s\S]{0,180}resetRound\(true\)/);
});

test("Leisure Time uses the shared site-wide Tingting preference", () => {
  const runtimeSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  assert.match(runtimeSource, /const speakLesson = \(text, rate, options\) => speak\(text, rate, options\);/);
  assert.doesNotMatch(runtimeSource, /const voiceNames/);
});

test("audio cancels an active browser utterance before speaking a new phrase", () => {
  const spoken = [];
  let cancelCount = 0;
  const audio = createAudioService({
    synthesis: { cancel: () => { cancelCount += 1; }, speak: (utterance) => spoken.push(utterance) },
    createUtterance: (text) => ({ text }),
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("你好", 0.78);
  audio.speak("再见", 0.78);
  assert.equal(cancelCount, 1);
  assert.deepEqual(
    spoken.map(({ text, lang, rate, pitch }) => ({ text, lang, rate, pitch })),
    [
      { text: "你好", lang: "zh-CN", rate: 0.78, pitch: 1 },
      { text: "再见", lang: "zh-CN", rate: 0.78, pitch: 1 }
    ]
  );
});

test("recorded scene lines play even when browser speech is unavailable", async () => {
  const played = [];
  const audio = createAudioService({
    synthesis: undefined,
    createAudio: (source) => ({
      duration: 1,
      play() {
        played.push(source);
        this.onended?.();
        return Promise.resolve();
      }
    }),
    getRecordedAudioPath: (text) => `recordings/${text}.mp3`,
    getRecordedAudioPlaybackWindow: () => null,
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 0,
    schedule: (callback) => { callback(); return 0; }
  });

  audio.speakSceneLines([{ audio: "你是哪国人" }]);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.deepEqual(played, ["recordings/你是哪国人.mp3"]);
});

test("recorded Learn audio covers every authored audio entry", () => {
  assert.equal(recordedLearnAudioIds.size, learnAudioEntries.length);
  for (const entry of learnAudioEntries) {
    assert.ok(recordedLearnAudioIds.has(entry.id), `missing recorded id for ${entry.text}`);
    const audioPath = recordedLearnAudioPath(entry.text).split("?")[0];
    assert.ok(existsSync(audioPath), `missing audio file for ${entry.text}`);
    assert.ok(statSync(audioPath).size > 0, `empty audio file for ${entry.text}`);
  }
});

test("reported audio fixes use the intended recorded text", () => {
  assert.equal(timeDateDateItems.find((item) => item.id === "date-board")?.audio, "看日历，可以知道几月几号。");
  assert.equal(schoolTopicData.words.find((item) => item.id === "music-room")?.audio, "音乐教室");
  assert.ok(!learnAudioEntries.some((entry) => entry.text === "音月教室"));
  for (const item of timeDateClockItems) {
    assert.equal(item.answerAudio, `几点了？现在${item.hanzi}。`);
    assert.ok(recordedLearnAudioPath(item.answerAudio), `missing clock-answer recording for ${item.hanzi}`);
  }
});

test("SYS-02 deterministic and composed policies have every required recorded segment", () => {
  const comparisonSentences = comparisonPracticeItems.map((item) => `${item.before}${item.target[0]}${item.between}${item.target[1]}${item.after}`);
  const weatherFillAudio = weatherFillRounds.flatMap((round) => [
    round.audio,
    ...Object.values(round.audioByAccessory ?? {}).map((entry) => entry.audio)
  ]).filter(Boolean);
  const colourItems = colourLessons["2a"].items;
  const requiredTexts = new Set([
    ...comparisonSentences,
    ...stationeryPictureMatchRounds.map((item) => item.audio),
    ...stationerySentenceBuilds.map((item) => item.audio),
    ...schoolSuppliesSentenceBuilds.map((item) => item.audio),
    ...schoolSentenceBuilds.map((item) => item.audio),
    ...schoolSubjectsSentenceBuilds.map((item) => item.audio),
    ...mealsFeelingsSentenceBuilds.map((item) => item.audio),
    ...natureFillRounds.map((item) => item.audio),
    ...animalMeasureRounds.map((item) => item.sentenceAudio),
    ...weatherDressRounds.map((item) => item.answerAudio),
    ...weatherFillAudio,
    ...classroomTopicData.sentenceFrames.map((item) => item.hanzi),
    ...classroomTopicData.words.map((item) => item.hanzi),
    "课本", "练习本", "铅笔", "尺子", "橡皮", "彩色铅笔",
    ...colourItems.flatMap((item) => [item.audio, item.phraseAudio, item.hanzi]),
    ...colourPreferenceFallbackAudioEntries.map((item) => item.audio),
    ...foodPreferenceFallbackAudioEntries.map((item) => item.audio),
    ...toySceneAudioEntries.map((item) => item.audio),
    ...toyPracticeAudioEntries.map((item) => item.audio)
  ].filter(Boolean));

  for (const text of requiredTexts) {
    assert.ok(recordedLearnAudioPath(text), `missing SYS-02 recording or segment for ${text}`);
  }
});

test("recorded Learn audio resolves punctuation-only text variants", () => {
  assert.equal(recordedLearnAudioPath("学校有教室"), recordedLearnAudioPath("学校有教室。"));
  assert.equal(recordedLearnAudioPath("书在书包里"), recordedLearnAudioPath("书在书包里。"));
});

test("recorded Learn audio uses conservative single-clip and tighter sequence silence windows", () => {
  const broccoli = "assets/audio/learn/cd75fd2c0ac1.mp3";
  const standaloneWindow = recordedAudioPlaybackWindow(broccoli, 100);
  const sequenceWindow = recordedAudioPlaybackWindow(broccoli, 60);
  assert.ok(standaloneWindow.startOffsetMs >= 0 && standaloneWindow.endOffsetMs >= 0);
  assert.ok(sequenceWindow.startOffsetMs > standaloneWindow.startOffsetMs);
  assert.ok(sequenceWindow.endOffsetMs > standaloneWindow.endOffsetMs);
  assert.equal(recordedAudioPlaybackWindow("assets/audio/learn/not-a-recording.mp3", 100), null);
});

test("every recorded Learn clip has a measured silence boundary", () => {
  assert.ok(recordedAudioBoundaryIds.size >= recordedLearnAudioIds.size);
  for (const id of recordedLearnAudioIds) assert.ok(recordedAudioBoundaryIds.has(id), `missing measured boundary for ${id}`);
});

test("tappable scene lines and weekday cards have recorded audio", () => {
  const stationeryLines = stationeryTopicData.sceneGroups
    .flatMap((group) => group.items)
    .flatMap((scene) => scene.lines ?? []);
  for (const line of stationeryLines) {
    assert.ok(recordedLearnAudioPath(line.hanzi), `missing recorded scene line for ${line.hanzi}`);
  }
  for (const item of timeDateWeekItems) {
    assert.ok(recordedLearnAudioPath(item.hanzi), `missing recorded weekday for ${item.hanzi}`);
  }
});

test("runtime-owned Hobbies and Toys utterances are included in the audio audit", () => {
  const runtimeAudio = [
    ...hobbiesSceneAudioEntries.map((entry) => entry.audio),
    ...toySceneAudioEntries.map((entry) => entry.audio),
    ...Object.values(hobbiesLessonAudioData).flatMap((lesson) => [
      ...Object.values(lesson.sentenceOptions ?? {}).map((entry) => entry.audio),
      ...lesson.rounds.flatMap((round) => round.answers?.map((entry) => entry.audio) ?? [])
    ])
  ];
  for (const text of runtimeAudio) {
    assert.ok(recordedLearnAudioPath(text), `missing runtime recording for ${text}`);
  }
});

test("mapped word cards play their recorded audio before browser speech", async () => {
  const startedSources = [];
  const spoken = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance) },
    createUtterance: (text) => ({ text }),
    createAudio: (source) => {
      const recording = {
        source,
        pause() {},
        currentTime: 0,
        play() {
          startedSources.push(recording.source);
          recording.onended?.();
          return Promise.resolve();
        }
      };
      return recording;
    },
    getRecordedAudioPath: (text) => text === "你" ? "assets/audio/learn/f3210ff9d774.mp3" : "",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("你", 0.78);
  await Promise.resolve();
  assert.deepEqual(startedSources, ["assets/audio/learn/f3210ff9d774.mp3"]);
  assert.deepEqual(spoken, []);
});

test("recorded audio starts at full volume without initializing browser speech", async () => {
  let cancelCount = 0;
  let volumeAtPlay;
  const audio = createAudioService({
    synthesis: { cancel: () => { cancelCount += 1; }, speak() {} },
    createAudio: () => {
      const recording = {
        volume: 0.2,
        currentTime: 0,
        pause() {},
        play() {
          volumeAtPlay = recording.volume;
          recording.onended?.();
          return Promise.resolve();
        }
      };
      return recording;
    },
    getRecordedAudioPath: () => "recorded.mp3",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("炒饭");
  await Promise.resolve();
  assert.equal(volumeAtPlay, 1);
  assert.equal(cancelCount, 0);
});

test("a stale recorded-audio failure cannot start browser fallback", async () => {
  const recordings = [];
  const spoken = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance.text) },
    createUtterance: (text) => ({ text }),
    createAudio: (source) => {
      let rejectPlay;
      const recording = {
        source,
        currentTime: 0,
        pause() {},
        play() {
          return new Promise((resolve, reject) => { rejectPlay = reject; });
        },
        rejectPlay: () => rejectPlay?.(new Error("late failure"))
      };
      recordings.push(recording);
      return recording;
    },
    getRecordedAudioPath: (text) => `${text}.mp3`,
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("第一句");
  audio.speak("第二句");
  recordings[0].rejectPlay();
  await Promise.resolve();
  await Promise.resolve();
  assert.deepEqual(spoken, []);
});

test("recorded-only policy reports missing audio without using browser speech", async () => {
  const missing = [];
  const spoken = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance.text) },
    createUtterance: (text) => ({ text }),
    getRecordedAudioPath: () => "",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280,
    reportMissingRecordedAudio: (text) => missing.push(text)
  });

  audio.speak("固定句子", 0.78, { sourcePolicy: audioSourcePolicies.recordedOnly });
  await Promise.resolve();
  assert.deepEqual(missing, ["固定句子"]);
  assert.deepEqual(spoken, []);
});

test("recorded-only policy does not use browser speech after a recording failure", async () => {
  const missing = [];
  const spoken = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance.text) },
    createUtterance: (text) => ({ text }),
    createAudio: () => ({ currentTime: 0, pause() {}, play: () => Promise.reject(new Error("failed")) }),
    getRecordedAudioPath: () => "fixed.mp3",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280,
    reportMissingRecordedAudio: (text) => missing.push(text)
  });

  audio.speak("固定句子", 0.78, { sourcePolicy: audioSourcePolicies.recordedOnly });
  await Promise.resolve();
  await Promise.resolve();
  assert.deepEqual(missing, ["固定句子"]);
  assert.deepEqual(spoken, []);
});

test("browser-first policy uses system speech and falls back to a complete recording on error", async () => {
  const spoken = [];
  const recorded = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance) },
    createUtterance: (text) => ({ text }),
    createAudio: (source) => {
      const recording = {
        source,
        currentTime: 0,
        pause() {},
        play() {
          recorded.push(source);
          recording.onended?.();
          return Promise.resolve();
        }
      };
      return recording;
    },
    getRecordedAudioPath: () => "fallback.mp3",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("动态句子", 0.78, { sourcePolicy: audioSourcePolicies.browserFirst });
  assert.deepEqual(spoken.map((utterance) => utterance.text), ["动态句子"]);
  assert.deepEqual(recorded, []);

  spoken[0].onerror();
  await Promise.resolve();
  assert.deepEqual(recorded, ["fallback.mp3"]);
});

test("browser-first policy uses its recording immediately when system speech is unavailable", async () => {
  const recorded = [];
  const audio = createAudioService({
    synthesis: null,
    createAudio: (source) => {
      const recording = {
        currentTime: 0,
        pause() {},
        play() {
          recorded.push(source);
          recording.onended?.();
          return Promise.resolve();
        }
      };
      return recording;
    },
    getRecordedAudioPath: () => "fallback.mp3",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("动态句子", 0.78, { sourcePolicy: audioSourcePolicies.browserFirst });
  await Promise.resolve();
  assert.deepEqual(recorded, ["fallback.mp3"]);
});

test("browser-first policy uses recorded fallback when the developer system-voice switch is off", async () => {
  const recorded = [];
  const spoken = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance) },
    createUtterance: (text) => ({ text }),
    createAudio: (source) => ({
      currentTime: 0,
      pause() {},
      play() {
        recorded.push(source);
        this.onended?.();
        return Promise.resolve();
      }
    }),
    getRecordedAudioPath: () => "fallback.mp3",
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280,
    isBrowserSpeechEnabled: () => false
  });

  audio.speak("动态句子", 0.78, { sourcePolicy: audioSourcePolicies.browserFirst });
  await Promise.resolve();
  assert.deepEqual(recorded, ["fallback.mp3"]);
  assert.deepEqual(spoken, []);
});

test("recorded-only policy can compose an authored sequence without browser speech", async () => {
  const recordings = [];
  const spoken = [];
  const boundaryWindows = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak: (utterance) => spoken.push(utterance.text) },
    createUtterance: (text) => ({ text }),
    createAudio: (source) => {
      const recording = {
        currentTime: 0,
        pause() {},
        play() {
          recordings.push({ source, recording });
          return Promise.resolve();
        }
      };
      return recording;
    },
    getRecordedAudioPath: (text) => `${text}.mp3`,
    getRecordedAudioPlaybackWindow: (source, retainedBoundarySilenceMs) => {
      boundaryWindows.push({ source, retainedBoundarySilenceMs });
      return null;
    },
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("教室里有书架", 0.78, {
    sourcePolicy: audioSourcePolicies.recordedOnly,
    recordedTexts: ["教室里有", "书架"],
    recordedBoundarySilenceMs: 0
  });
  await Promise.resolve();
  assert.equal(recordings[0].source, "教室里有.mp3");
  recordings[0].recording.onended();
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(recordings[1].source, "书架.mp3");
  recordings[1].recording.onended();
  await Promise.resolve();
  assert.deepEqual(spoken, []);
  assert.deepEqual(boundaryWindows, [
    { source: "教室里有.mp3", retainedBoundarySilenceMs: 0 },
    { source: "书架.mp3", retainedBoundarySilenceMs: 0 }
  ]);
});

test("reported deterministic and dynamic exercises declare their audio policies", () => {
  const schoolSource = readFileSync("src/features/school-life/school-food-runtime.js", "utf8");
  const worldSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  const hobbiesSource = readFileSync("src/features/play-hobbies/play-hobbies-runtime.js", "utf8");
  const timeSource = readFileSync("src/features/time-daily-life/time-daily-life-runtime.js", "utf8");

  assert.match(schoolSource, /speak\(sentence, 0\.78, \{[\s\S]*sourcePolicy: "browser-first",[\s\S]*recordedFallbackTexts: \[subject\.hanzi, `\$\{pattern\.hanzi\}\$\{item\.verb\}`, item\.hanzi\]/);
  assert.match(schoolSource, /speak\(`\$\{frame\.hanzi\}\$\{word\.hanzi\}`, 0\.78, \{[\s\S]*sourcePolicy: "recorded-only",[\s\S]*recordedTexts: \[frame\.hanzi, word\.hanzi\]/);
  assert.match(worldSource, /speak\(`我喜欢\$\{favourite\.hanzi\}`, 0\.78, \{[\s\S]*sourcePolicy: "browser-first",[\s\S]*recordedFallbackTexts: \["我喜欢", favourite\.hanzi\]/);
  assert.match(worldSource, /speak\(`我不喜欢\$\{unfavourite\.hanzi\}`, 0\.78, \{[\s\S]*sourcePolicy: "browser-first",[\s\S]*recordedFallbackTexts: \["我不喜欢", unfavourite\.hanzi\]/);
  assert.match(hobbiesSource, /speakLesson\(`我有\$\{item\.hanzi\}`, 0\.78, \{ sourcePolicy: "recorded-only" \}\)/);
  assert.match(timeSource, /speak\(`\$\{item\.before\}\$\{selected\[0\]\}\$\{item\.between\}\$\{selected\[1\]\}\$\{item\.after\}`, 0\.78, \{ sourcePolicy: "recorded-only" \}\)/);
});

test("the developer system-voice switch is URL-only and not a learner-facing control", () => {
  const runtimeSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const navigationSource = readFileSync("src/core/navigation-runtime.js", "utf8");
  assert.match(runtimeSource, /new URLSearchParams\(window\.location\.search\)\.get\("systemVoice"\) !== "off"/);
  assert.doesNotMatch(navigationSource, /systemVoice/);
});

test("replacing recorded audio settles and rewinds the prior request", async () => {
  const recordings = [];
  const audio = createAudioService({
    synthesis: { cancel() {}, speak() {} },
    createAudio: () => {
      const recording = {
        currentTime: 4,
        pauseCount: 0,
        pause() { recording.pauseCount += 1; },
        play() { return new Promise(() => {}); }
      };
      recordings.push(recording);
      return recording;
    },
    getRecordedAudioPath: (text) => `${text}.mp3`,
    getSceneRate: () => 0.64,
    getSceneLinePauseMs: () => 280
  });

  audio.speak("第一句");
  audio.speak("第二句");
  assert.equal(recordings[0].pauseCount, 1);
  assert.equal(recordings[0].currentTime, 0);
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

  const appSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  const topicDetailSource = readFileSync("src/core/topic-detail-runtime.js", "utf8");
  assert.match(appSource, /category\.bookIds\.includes\(initialLessonScope\.bookId\)/);
  assert.match(topicDetailSource, /state\.selectedBookCategoryId = bookCategoryForBook\(scope\.bookId\)\.id/);
  assert.match(topicDetailSource, /const scopedBook = state\.lessonScope/);
  assert.match(topicDetailSource, /state\.selectedBookId = scopedBook\.id/);
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

test("Let's practice keeps instructions inside the game card", () => {
  const wiringSource = readFileSync("src/app/runtime-wiring.js", "utf8");
  assert.match(wiringSource, /function syncActivityPanelSummary\(\)[\s\S]*activityPanelTitle\.textContent\.trim\(\) === "Let's practice"/);
  assert.match(wiringSource, /activityPanelSummary\.hidden = isPracticePanel \|\| !activityPanelSummary\.textContent\.trim\(\)/);
  assert.match(wiringSource, /typeof MutationObserver !== "undefined"[\s\S]*activityPanelSummaryObserver\.observe\(activityPanelSummary/);
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
  assert.match(eventSource, /const returningToBooks = link\.dataset\.returnTarget === "book"/);
  assert.match(eventSource, /book-lessons-\$\{state\.selectedBookId\}/);
  assert.match(eventSource, /\(returnTarget \?\? document\.querySelector\("\.switcher-panel"\)\)\?\.scrollIntoView\(\{\s*behavior: "auto"/);
  assert.doesNotMatch(eventSource, /behavior: "smooth"/);
  assert.match(eventSource, /document\.getElementById\(returnTargetId\)/);
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
  assert.match(legacySource, /const result = lessonPracticeRuntime\?\.renderActivityPanel\(topic\);[\s\S]{0,120}applyImageLoading\(activityList\);[\s\S]{0,120}return result;/);
  assert.match(legacySource, /applyImageLoading\(focusExplorer, \{ eager: true \}\)/);
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
  assert.equal(schoolSubjectsTopicData.scenes.find((scene) => scene.id === "go-to-music")?.label, "Going to class");
  assert.equal(schoolSubjectsTopicData.scenes.find((scene) => scene.id === "in-music")?.label, "In class");
  assert.equal(schoolSubjectsTopicData.scenes.find((scene) => scene.id === "likes-music")?.label, "Liking a class");
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

  assert.match(detailSource, /<strong>\$\{topicLessonTitle\(step\)\}<\/strong>/);
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
  assert.match(foodData, /id: "apple"[\s\S]{0,240}english: "I eat apples\."/);
  assert.match(foodData, /id: "banana"[\s\S]{0,240}english: "I eat bananas\."/);
  assert.match(foodData, /id: "carrot"[\s\S]{0,240}english: "I eat carrots\."/);
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
  const lunchWords = mealsFeelingsTopicData.wordGroups.find((group) => group.id === "lunch").items;
  assert.equal(new Set(lunchWords.map(([, , , , imagePath]) => imagePath)).size, lunchWords.length);
});

test("introductions owns its scenes and practice activities", () => {
  assert.equal(introductionsTopic.id, "introductions");
  assert.equal(introductionsTopic.interactiveScene, "introductions-conversation");
  assert.equal(introductionsTopic.steps.length, 2);
  assert.equal(introductionsPractice.length, 4);
  assert.ok(introductionsPractice.some((scene) => scene.id === "good-friends" && scene.lines.some((line) => line.hanzi === "他是我的好朋友。")));
  assert.deepEqual(introductionsTopic.characterIntros.map((entry) => entry.id), ["lele", "meimei", "yangyang", "anan", "tiantian", "sisi", "luna", "noah", "sophie", "jaden"]);
  assert.equal(introductionsTopic.characterIntros.find((entry) => entry.id === "meimei")?.audio, "我叫美美");
  assert.equal(introductionsTopic.characterIntros.find((entry) => entry.id === "luna")?.audio, "我叫露娜");
  assert.equal(introductionsTopic.characterIntros.find((entry) => entry.id === "noah")?.audio, "我叫诺亚");
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
  assert.ok(!isItTopic.focusItems.some((word) => word.hanzi === "妹妹"));
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
  assert.match(practiceSource, /state\.requestBuildResult === "wrong" && state\.requestBuildFeedback/);
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
  assert.ok(clothesBookWords.filter((item) => item.imagePath).every((item) => existsSync(item.imagePath.split("?")[0])));
  assert.ok(clothesSentenceItems.every((item) => existsSync(item.imagePath.split("?")[0])));
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
  assert.equal(natureLesson.notes[0].hanzi, "天上有太阳。 / 地上有树。");
  assert.equal(weatherLesson.items.length, 6);
  assert.match(natureLesson.imagePath, /illustrated-nature\/day-night-nature\.webp/);
  assert.match(topicDetailSource, /topic\.ownsExplorerContent/);
  assert.match(focusRuntimeSource, /currentTopic\(\)\.ownsExplorerContent/);
  assert.match(worldRuntimeSource, /function worldSceneCardMarkup/);
  assert.match(worldRuntimeSource, /speakSceneLines\(scene\.lines\)/);
  assert.doesNotMatch(worldRuntimeSource, /scene\.lines\.map\(\(line\) => line\.audio\)\.join\("，"\)/);
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
  assert.match(focusExplorer.innerHTML, />Notes</);
  assert.doesNotMatch(focusExplorer.innerHTML, /visual-topic-note-pinyin/);
  assert.match(focusExplorer.innerHTML, /English uses “is” before an adjective/);
  assert.match(focusExplorer.innerHTML, /does not need the English subject “it/);
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
  assert.match(focusExplorer.innerHTML, /English begins these sentences with “There is” or “There are/);
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

test("Nature practice waits for the complete sentence before speaking", () => {
  const listeners = {};
  const makeButton = (selector, dataset) => ({
    dataset,
    addEventListener: (event, listener) => { listeners[`${selector}:${event}`] = listener; }
  });
  const subjectButton = makeButton("subject", { natureFillSubject: "地上" });
  const wordButton = makeButton("word", { natureFillWord: "花" });
  const activityList = {
    className: "",
    innerHTML: "",
    querySelector: () => null,
    querySelectorAll: (selector) => selector === "[data-nature-fill-subject]" ? [subjectButton] : selector === "[data-nature-fill-word]" ? [wordButton] : []
  };
  const state = {
    showEnglish: true,
    showPinyin: true,
    tapAudioEnabled: true,
    worldNatureFillRoundIds: natureFillRounds.map((round) => round.id),
    worldNatureFillRoundIndex: natureFillRounds.findIndex((round) => round.id === "flower"),
    worldNatureFillSubjectChoices: ["白天", "晚上", "地上"],
    worldNatureFillWordChoices: natureFillRounds.map((round) => round.word),
    worldNatureFillSubjectPicked: "",
    worldNatureFillWordPicked: "",
    worldNatureFillSubjectResult: "",
    worldNatureFillWordResult: ""
  };
  const spoken = [];
  const runtime = createWorldRuntime({
    state,
    currentTopic: () => natureTopic,
    currentBook: () => ({ id: "3b", label: "Book 3B" }),
    currentLesson: () => ({ lesson: 7 }),
    focusExplorer: { innerHTML: "", querySelectorAll: () => [] },
    activityPanelTitle: { textContent: "" },
    activityPanelSummary: { textContent: "" },
    activityList,
    speak: (...args) => spoken.push(args),
    selectFocusItem: () => {},
    renderActivityPanel: () => {}
  });

  runtime.renderWorldPractice(natureTopic);
  listeners["subject:click"]();
  assert.deepEqual(spoken, []);
  listeners["word:click"]();
  assert.deepEqual(spoken, [["地上有花。", 0.76, { sourcePolicy: "recorded-only" }]]);
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
  assert.equal(animalLessons["2b"].notes.length, 1);
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
  assert.doesNotMatch(focusExplorer.innerHTML, /Animal food/);
  assert.doesNotMatch(focusExplorer.innerHTML, /狗吃骨头。/);
  assert.match(focusExplorer.innerHTML, />Notes</);
  assert.match(focusExplorer.innerHTML, /喜欢 works much like “like” in English/);
  assert.match(focusExplorer.innerHTML, /我喜欢猫。/);

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
  assert.match(focusExplorer.innerHTML, /Animal food/);
  assert.match(focusExplorer.innerHTML, /狗吃骨头。/);
  assert.match(focusExplorer.innerHTML, /熊猫吃竹子。/);
  assert.match(focusExplorer.innerHTML, /猴子吃香蕉。/);
  assert.match(focusExplorer.innerHTML, />Notes</);
  assert.match(focusExplorer.innerHTML, /measure word between a number and an animal/);
  twoB.renderWorldPractice(animalsTopic);
  assert.match(activityList.innerHTML, /动物园有/);
  assert.match(activityList.innerHTML, /data-zoo-sentence-choice="tiger"/);
  assert.match(activityList.innerHTML, /一只老虎/);
  assert.match(activityList.innerHTML, /zoo-sentence-choice-image/);
  assert.match(activityList.innerHTML, /zoo-sentence-choice-copy/);
  assert.match(activityList.innerHTML, /data-pet-food-match-animal="dog-bone"/);
  assert.match(activityList.innerHTML, /data-pet-food-match-food="dog-bone"/);

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
  assert.match(petsActivityList.innerHTML, /pets-sentence-choice-image/);
  assert.match(petsActivityList.innerHTML, /pets-sentence-choice-copy/);
  assert.doesNotMatch(petsActivityList.innerHTML, /family-match-open-board/);
  assert.doesNotMatch(petsActivityList.innerHTML, /data-pet-food-match-animal/);
});

test("colours covers both book colour sets with pictured examples", () => {
  assert.equal(coloursTopic.ownsExplorerContent, true);
  assert.equal(coloursTopic.id, "colours");
  assert.equal(colourLessons["1b"].items.length, 4);
  assert.equal(colourLessons["2a"].items.length, 9);
  assert(colourLessons["2a"].items.every((item) => item.imagePath));
});

test("Colour picture practice keeps its answer and feedback fixed until New game", () => {
  const worldRuntimeSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(worldRuntimeSource, /world-colour-answer-feedback\$\{state\.worldColourPickedId/);
  assert.match(worldRuntimeSource, /if \(state\.worldColourPickedId\) return;/);
  assert.match(worldRuntimeSource, /data-world-colour-new/);
  assert.doesNotMatch(worldRuntimeSource, /data-world-mission-new/);
  assert.match(stylesSource, /\.world-colour-answer-feedback \{[\s\S]*min-height: 2\.7rem;/);
});

test("Colours keeps answer positions fixed until its New game control advances the round", () => {
  const worldRuntimeSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  assert.match(worldRuntimeSource, /state\.worldColourChoiceIds = shuffled/);
  assert.match(worldRuntimeSource, /const choices = state\.worldColourChoiceIds/);
  assert.match(worldRuntimeSource, /data-world-colour-new[\s\S]{0,500}state\.worldColourChoiceIds = \[\]/);
  assert.doesNotMatch(worldRuntimeSource, /const choices = shuffled\(\[target/);
});

test("Colour Mission retains its original coloured everyday-object game", () => {
  const worldRuntimeSource = readFileSync("src/features/world/world-runtime.js", "utf8");
  assert.match(worldRuntimeSource, /const colourMissionObjects = \[/);
  assert.match(worldRuntimeSource, /missionObjectMarkup\(objectId, colour\)/);
  assert.match(worldRuntimeSource, /Listen and find the object/);
  assert.match(worldRuntimeSource, /data-world-mission-play>Play</);
  assert.match(worldRuntimeSource, /data-world-mission-pick/);
  assert.doesNotMatch(worldRuntimeSource, /Every round mixes the object colours and their positions/);
  assert.match(worldRuntimeSource, /world-colour-mission-sentence/);
  assert.match(worldRuntimeSource, /world-colour-mission-pinyin/);
  assert.match(worldRuntimeSource, /colourMissionAudioSegments = \[/);
  assert.match(worldRuntimeSource, /playMissionPrompt[\s\S]{0,400}sourcePolicy: "recorded-only"/);
  assert.match(worldRuntimeSource, /recordedTexts: \[promptPrefix, object\.hanzi\]/);
  assert.match(worldRuntimeSource, /recordedBoundarySilenceMs: 0/);
  for (const text of ["找一找，粉红色的", "找一找，黑色的", "气球", "风筝", "杯子", "积木", "笔"]) {
    assert.ok(recordedLearnAudioPath(text), `missing Colour Mission recording: ${text}`);
  }
  assert.match(worldRuntimeSource, /if \(state\.worldColourMissionPickedObjectId\) return;/);
  assert.doesNotMatch(worldRuntimeSource, /data-world-mission-new/);
});

test("Colours uses a compact contained square image for its picture-and-phrase prompt", () => {
  const stylesSource = readFileSync("styles.css", "utf8");
  assert.match(stylesSource, /\.world-colour-picture-practice \.clothes-quiz-visual \{[\s\S]*width: min\(100%, 20rem\);[\s\S]*aspect-ratio: 1;/);
  assert.match(stylesSource, /\.world-colour-picture-practice \.clothes-quiz-image \{[\s\S]*padding: 1rem;/);
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

test("the Colours practice uses concise randomized authored phrase cards", () => {
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
  assert.match(activityList.innerHTML, /Picture and phrase/);
  assert.match(activityList.innerHTML, /data-world-colour-guess/);
  assert.match(activityList.innerHTML, /assets\/illustrated-colors\//);
  assert.match(activityList.innerHTML, /Colour mission/);
  assert.doesNotMatch(activityList.innerHTML, /Every round mixes the object colours and their positions/);
  assert.match(activityList.innerHTML, /data-world-mission-pick/);
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
  assert.equal(toysTopic.flashcardItems.find((item) => item.id === "toys")?.sentenceEnglish, "I have toys.");
  assert.ok(toysTopic.flashcardItems.every((item) => item.sentenceEnglish));
  assert.ok(existsSync("assets/illustrated-toys/toys-collection.webp"));
  assert.equal(toysTopic.flashcardItems.find((item) => item.id === "school-bus")?.hanzi, "玩具校车");
  assert.ok(toysTopic.flashcardItems.every((item) => item.imagePath.startsWith("assets/illustrated-toys/")));
  assert.match(stylesSource, /\.toys-scene-grid \{\s+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(stylesSource, /\.toys-scene-grid \{\s+grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(runtimeSource, /nextRandomCycleId\(state, "toys-picture-choice"/);
  assert.match(runtimeSource, /const toyItems = \(\) => currentTopic\(\)\.flashcardItems/);
  assert.match(runtimeSource, /data-toys-practice-new/);
  assert.match(runtimeSource, /complete \? item\.sentenceEnglish : " "/);
  assert.match(runtimeSource, /speakLesson\(`我有\$\{item\.hanzi\}`, 0\.78, \{/);
  assert.match(explorerSource, /\["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"\]/);
  assert.match(practiceSource, /\["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"\]/);
  assert.deepEqual(toySceneAudioEntries.map((entry) => entry.id), ["doll", "toy-train", "toy-airplane", "toy-bear"]);
  assert.ok(toySceneAudioEntries.every((entry) => entry.hanzi && entry.pinyin && entry.english && entry.audio));
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
  assert.match(foundationsSource, /function ensureBodySpotlightRound\(\)[\s\S]{0,240}bodySpotlightRegions\[prompt\.id\]/);
  assert.match(foundationsSource, /forehead: \{ x: 50, y: 20, width: 22, height: 6 \}/);
  assert.match(foundationsSource, /neck: \{ x: 50, y: 41, width: 15, height: 7 \}/);
  assert.match(foundationsSource, /arm: \{ x: 70, y: 55, width: 16, height: 23, rotation: -30 \}/);
  assert.match(foundationsSource, /leg: \{ x: 43, y: 76, width: 18, height: 25 \}/);
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
  assert.match(topicDetailSource, /function topicLessonTitle\(step\)/);
  assert.match(topicDetailSource, /lesson\?\.displayTitle\?\.zh/);
  assert.match(topicDetailSource, /link\.dataset\.topicLessonSource/);
});

test("the shared curriculum retains its books and learning navigation", () => {
  assert.equal(books.length, 8);
  assert.equal(bookHomeCategories.length, 4);
  assert.equal(topicGroups.length, 4);
  assert.equal(learningHomeCategories.length, 8);
  assert.deepEqual(learningHomeCategories[0].topicIds, ["pinyin", "strokes", "pictographs"]);
  assert.equal(topicCardMeta.pinyin.zhTitle, "汉语拼音");
  assert.equal(topicCardMeta.strokes.zhTitle, "笔画");
  assert.equal(topicCardMeta.pictographs.zhTitle, "象形文字");
  assert.equal(topicCardMeta["school-subjects"].zhTitle, "学校学科");
});

test("numbers keeps its counting stages while My Family 2 owns 4A Lesson 1", () => {
  const foundationsSource = readFileSync("src/features/foundations/foundations-runtime.js", "utf8");
  assert.equal(numbersTopic.id, "numbers");
  assert.equal(numberStages.length, 5);
  assert.equal(buildNumberItem(42).hanzi, "四十二");
  assert.equal(telephoneNumbersTopic.id, "telephone-numbers");
  assert.equal(telephoneNumbersTopic.title, "My Family 2");
  assert.equal(telephonePractice.residence.lines[1].hanzi, "他们住在北京。");
  assert.match(foundationsSource, /data-telephone-practice-new aria-label="Start a new game">New game/);
  assert.match(foundationsSource, /querySelectorAll\("\[data-telephone-question\]"\)[\s\S]{0,900}speak\(pair\.question\.audio, 0\.78\)/);
  assert.match(foundationsSource, /telephoneMatchSelectedId === button\.dataset\.telephoneAnswer[\s\S]{0,700}speak\(pair\.answer\.audio, 0\.78\)/);
  assert.doesNotMatch(foundationsSource, /data-telephone-practice-play/);
  assert.doesNotMatch(foundationsSource, /data-telephone-practice-new[\s\S]{0,520}speakSceneLines\(profilePairs/);
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

test("advanced stroke cards wait for their local paths before rendering", () => {
  const strokeRuntime = readFileSync("src/features/foundations/stroke-runtime.js", "utf8");
  assert.match(strokeRuntime, /function prepareAllAdvancedStrokes\(\)/);
  assert.match(strokeRuntime, /Preparing combination strokes[\s\S]{0,500}prepareAllAdvancedStrokes\(\)\.then\(\(\) => \{[\s\S]{0,160}renderStrokePractice\(\)/);
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
