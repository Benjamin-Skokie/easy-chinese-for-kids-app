import { createAudioService } from "../core/audio.js";
import { createAppState } from "../core/app-state.js";
import { getAppElements } from "../core/dom.js";
import { createDisplayControlsRuntime } from "../core/display-controls-runtime.js";
import { createFocusRuntime } from "../core/focus-runtime.js";
import { createLessonPracticeRuntime } from "../core/lesson-practice-runtime.js";
import { createTopicDetailRuntime } from "../core/topic-detail-runtime.js";
import { createFocusExplorerRuntime } from "../core/focus-explorer-runtime.js";
import { createNavigationRuntime } from "../core/navigation-runtime.js";
import { bindViewNavigationEvents } from "../core/view-navigation-events.js";
import { topicIdFromLocation, topicPageUrl, viewFromLocation } from "../core/router.js";
import { timeDateWeekItems } from "../features/time-daily-life/weekdays.js";
import { timeDateClockItems, timeDateExpressionItems, timeDateRoutineItems } from "../features/time-daily-life/time.js";
import { datePracticeItems, timeDateDateItems, timeDateMonthItems } from "../features/time-daily-life/dates.js";
import { comparisonPracticeItems, comparisonsTopic, comparisonVisualItems, comparisonWordItems } from "../features/time-daily-life/comparisons.js";
import { positionPracticeItems, positionScenes, positionsTopic, positionVisualItems } from "../features/time-daily-life/positions.js";
import { transportSentenceTokens, transportTopic, transportVisualItems } from "../features/time-daily-life/transport.js";
import { dailyLifeTopic, roomScenes, roomSentenceTokens, roomVisualItems } from "../features/time-daily-life/rooms.js";
import { stationeryPictureMatchChoices, stationeryPictureMatchEnglish, stationeryPictureMatchRounds, stationerySentenceBuilds, stationeryTopicData } from "../features/school-life/stationery.js";
import { schoolSuppliesSentenceBuilds, schoolSuppliesTopicData } from "../features/school-life/school-supplies.js";
import { classroomTopicData } from "../features/school-life/classroom.js";
import { schoolSentenceBuilds as schoolLessonSentenceBuilds, schoolTopicData as schoolLessonTopicData } from "../features/school-life/school.js";
import { schoolSubjectsSentenceBuilds as schoolLessonSubjectsSentenceBuilds, schoolSubjectsTopicData } from "../features/school-life/school-subjects.js";
import { createSchoolFoodRuntime } from "../features/school-life/school-food-runtime.js";
import { foodSentenceBuilds, foodTopic, foodTopicData } from "../features/food/food.js";
import { foodPreferencesTopic, foodPreferencesTopicData } from "../features/food/food-preferences.js";
import { mealsFeelingsSentenceBuilds as mealsFeelingsLessonSentenceBuilds, mealsFeelingsTopic, mealsFeelingsTopicData } from "../features/food/meals-feelings.js";
import { introductionsBuildPhrases, introductionsGamePrompts, introductionsPractice, introductionsTopic } from "../features/foundations/introductions.js";
import { createIntroductionsController } from "../features/foundations/introductions-controller.js";
import { ageBuildPhrases, agePractice, ageTopic } from "../features/foundations/age.js";
import { createAgeController } from "../features/foundations/age-controller.js";
import { politeGameItemIds, politePractice, politeWordsTopic } from "../features/foundations/polite-words.js";
import { createPoliteWordsController } from "../features/foundations/polite-words-controller.js";
import { greetingsGameItemIds, greetingsPractice, greetingsTopic } from "../features/foundations/greetings.js";
import { createGreetingsController } from "../features/foundations/greetings-controller.js";
import { identityConversation, identityCountries, identityQuestion, identityTopic } from "../features/foundations/identity.js";
import { familyGameItemIds, familyHeadshotsByItemId, familyPersonIdsByItemId, familyPractice, familyTopic, illustratedFamily } from "../features/family/family.js";
import { clothesMatchItems, clothesPractice, clothesTopic } from "../features/daily-life/clothes.js";
import { coloursTopic } from "../features/world/colours.js";
import { hobbiesTopic, toysTopic } from "../features/play-hobbies/play-hobbies.js";
import { bodyBonusItemIds, bodyCoreItemIds, bodyDiagramLayout, bodyTopic } from "../features/foundations/body.js";
import { buildNumberItem, multiplicationRhymeTopic, numberHanzi, numberPinyin, numberStages, numbersTopic, telephonePractice } from "../features/foundations/numbers.js";
import { createFoundationState } from "../features/foundations/state.js";
import { createFoundationsRuntime } from "../features/foundations/foundations-runtime.js";
import { createTimeDailyLifeState } from "../features/time-daily-life/state.js";
import { createTimeDailyLifeRuntime } from "../features/time-daily-life/time-daily-life-runtime.js";
import { createWorldRuntime } from "../features/world/world-runtime.js";
import { createPlayHobbiesRuntime } from "../features/play-hobbies/play-hobbies-runtime.js";
import { illustratedKids } from "../data/characters.js";
import { bookHomeCategories, books, learningHomeCategories, topicCardMeta, topicGroups } from "../data/curriculum.js";
import { schoolSentenceBuilds, schoolTopicData, topicData, visualTopicItems } from "../data/topic-registry.js";
import { createSharedLessonPractice } from "../games/shared-lesson-practice.js";

const introductionsGameSpeakerIds = ["anan", "tiantian", "sisi", "lele"];
const ageGameItemIds = ["ask-age", "age-five", "age-six", "age-seven", "ask-grade", "grade-one"];
const sceneSpeechRate = 0.64;
const sceneLinePauseMs = 280;
const { chineseUtterance, speak, speakSceneLines } = createAudioService({
  getSceneRate: () => sceneSpeechRate,
  getSceneLinePauseMs: () => sceneLinePauseMs
});

const state = createAppState();

const {
  topicGroupsRoot, bookSelect, lessonSelect, lookupCard, bookBrowser, topicTitle, topicSummary,
  topicProgress, topicLessonStrip, subtopicShelf, focusExplorer, focusStatus, focusDisplay,
  focusHanzi, focusPinyin, focusEnglish, focusWordList, toggleAudioButton, togglePinyinButton,
  toggleArabicButton, toggleEnglishButton, activityList, activityPanelTitle, activityPanelSummary,
  topicPanel, bookPanel, culturePanel, topicColumns, detailLayout, learningCultureNav
} = getAppElements();
const renderSharedLessonPractice = createSharedLessonPractice({
  state,
  speak,
  elements: { activityPanelTitle, activityPanelSummary, activityList }
});
const renderListenPractice = renderSharedLessonPractice.renderListenPractice;
const renderMatchPractice = renderSharedLessonPractice.renderMatchPractice;
const renderPracticeSayCards = renderSharedLessonPractice.renderPracticeSayCards;
const bindPracticeSayCards = renderSharedLessonPractice.bindPracticeSayCards;

let greetingsGameItems;
let resetGreetingsChallenge;
let ensureGreetingsChallenge;
let greetingsMeaningLabel;
let resetGreetingsMatchGame;
let ensureGreetingsMatchGame;
let handleGreetingsMatchPhrase;
let handleGreetingsMatchAttempt;
let handleGreetingsChallengePlay;
let handleGreetingsChallengeGuess;
let renderGreetingsExplorer;
let politeGameItems;
let politeMeaningLabel;
let resetPoliteMatchGame;
let ensurePoliteMatchGame;
let handlePoliteMatchPhrase;
let handlePoliteMatchAttempt;
let resetPoliteChallenge;
let ensurePoliteChallenge;
let handlePoliteChallengePlay;
let handlePoliteChallengeGuess;
let renderPoliteWordsExplorer;
let introductionsPromptById;
let introductionsGameKids;
let introductionsSelfIntroItemForKid;
let resetIntroductionsChallenge;
let ensureIntroductionsChallenge;
let handleIntroductionsChallengePlay;
let handleIntroductionsChallengeGuess;
let introductionsBuildTarget;
let resetIntroductionsBuilder;
let ensureIntroductionsBuilder;
let handleIntroductionsBuildToken;
let handleIntroductionsBuildClear;
let renderIntroductionsExplorer;
let ageGameItems;
let resetAgeChallenge;
let ensureAgeChallenge;
let handleAgeChallengePlay;
let handleAgeChallengeGuess;
let ageBuildTarget;
let resetAgeBuilder;
let ensureAgeBuilder;
let handleAgeBuildToken;
let handleAgeBuildClear;
let renderAgeExplorer;
let schoolPracticeItems;
let ensureSchoolPractice;
let renderSchoolPractice;
let renderStationeryPractice;
let renderSchoolSuppliesPractice;
let renderFoodPractice;
let renderMealsConversationPractice;
let renderFoodPreferencesPractice;
let renderClassroomPractice;
let renderSchoolExplorer;

let focusExplorerRuntime;
function renderDefaultExplorer() {
  return focusExplorerRuntime?.renderDefaultExplorer();
}
function renderFocusExplorer() {
  return focusExplorerRuntime?.renderFocusExplorer();
}

let foundationsRuntime;
let worldRuntime;
let playHobbiesRuntime;
let renderFocusDisplay;
const { bodySentenceForItem, renderFocusStatus, renderFocusWordList, selectFocusItem } = createFocusRuntime({
  state,
  elements: { focusStatus, focusWordList },
  getCurrentTopic: () => currentTopic(),
  getCurrentNumberStage: () => currentNumberStage(),
  getFocusItemsForTopic: (topic) => focusItemsForTopic(topic),
  getCurrentFocusItem: () => currentFocusItem(),
  getFoundations: () => foundationsRuntime,
  timeDateExpressionItems,
  speak,
  renderFocusDisplay: (...args) => renderFocusDisplay(...args),
  renderFocusExplorer
});
const { bindDisplayControls: bindGlobalDisplayControls, renderFocusControls, renderFocusDisplay: renderFocusDisplayImpl, updateDisplayControls } = createDisplayControlsRuntime({
  state,
  elements: { toggleAudioButton, togglePinyinButton, toggleArabicButton, toggleEnglishButton, focusHanzi, focusPinyin, focusEnglish, learningCultureNav },
  getCurrentTopic: () => currentTopic(),
  getCurrentFocusItem: () => currentFocusItem(),
  renderFocusWordList,
  renderFocusExplorer,
  renderActivityPanel
});
renderFocusDisplay = renderFocusDisplayImpl;
bindGlobalDisplayControls();

let lessonPracticeRuntime;
function renderActivityPanel(topic) {
  return lessonPracticeRuntime?.renderActivityPanel(topic);
}

let topicDetailRuntime;
function selectBookLesson(...args) { return topicDetailRuntime?.selectBookLesson(...args); }
function renderTopicDetail(...args) { return topicDetailRuntime?.renderTopicDetail(...args); }

const {
  currentTopic,
  currentNumberStage,
  focusItemsForTopic,
  currentFocusItem,
  shuffleArray,
  topicById,
  selectedTopicGroupId,
  bookById,
  bookCategoryForBook,
  currentBook,
  currentLesson,
  syncBookSelectionFromTopic,
  syncLessonSelectionFromTopic,
  focusLearningPanel,
  scrollToSectionTop,
  narrowTopicBrowserTo,
  categoryIdForTopic,
  updateTopicPageVisibility,
  scrollCategorySectionIntoView,
  openTopicPage,
  switchView,
  toggleTopicGroup,
  renderTopicScene,
  displayControlsMarkup,
  bindDisplayControls,
  renderTopicStickyNav,
  bookAccent,
  renderBookStickyNav,
  renderStickyNav,
  categoryIconMarkup,
  renderTopics,
  renderBooks,
  updateLearningCultureNav
} = createNavigationRuntime({
  state,
  topicData,
  books,
  topicGroups,
  learningHomeCategories,
  bookHomeCategories,
  topicCardMeta,
  topicPageUrl,
  topicGroupsRoot,
  bookSelect,
  lessonSelect,
  lookupCard,
  bookBrowser,
  topicPanel,
  bookPanel,
  culturePanel,
  detailLayout,
  learningCultureNav,
  numberStages,
  timeDateWeekItems,
  getNumberStageItems: () => numberStageItems(),
  getWorldFocusItems: (topic) => worldRuntime?.focusItemsForTopic(topic),
  renderFocusControls,
  renderFocusDisplay,
  renderFocusWordList,
  renderFocusExplorer,
  renderActivityPanel,
  renderTopicDetail,
  updateDisplayControls,
  selectBookLesson
});

bindViewNavigationEvents({ state, switchView, updateTopicPageVisibility });

worldRuntime = createWorldRuntime({
  state,
  currentTopic,
  currentBook,
  currentLesson,
  focusExplorer,
  speak,
  selectFocusItem,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  renderActivityPanel
});

playHobbiesRuntime = createPlayHobbiesRuntime({
  state,
  currentTopic,
  currentBook,
  currentLesson,
  focusExplorer,
  speak,
  selectFocusItem,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  renderActivityPanel
});

foundationsRuntime = createFoundationsRuntime({
state,
numberHanzi,
numberPinyin,
buildNumberItem,
numberStages,
telephonePractice,
familyGameItemIds,
  familyPersonIdsByItemId,
  familyHeadshotsByItemId,
  familyPractice,
  illustratedFamily,
illustratedKids,
bodyBonusItemIds,
bodyCoreItemIds,
bodyDiagramLayout,
identityConversation,
identityCountries,
identityQuestion,
topicById,
focusItemsForTopic,
currentTopic,
currentNumberStage,
currentFocusItem,
currentBook,
currentLesson,
shuffleArray,
speak,
speakSceneLines,
renderActivityPanel,
renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  selectFocusItem,
  bodySentenceForItem,
  chineseUtterance,
focusExplorer,
focusStatus
});

const {
numberStageItems,
resetNumberChallenge,
ensureNumberChallenge,
resetMathChallenge,
ensureMathChallenge,
familyGameItems,
familyPersonForItemId,
familyHeadshotForItemId,
isFamilySentenceItemId,
familyBookWordItems,
usesLessonTemplate,
bookWordItemsForTopic,
usefulNoteForTopic,
familyWordForPersonId,
resetFamilyChallenge,
ensureFamilyChallenge,
resetListenChallengeResult,
handleFamilyChallengePlay,
handleFamilyChallengeGuess,
resetFamilyMatchGame,
ensureFamilyMatchGame,
handleFamilyMatchPhrase,
handleFamilyMatchAttempt,
mathChallengeAudioText,
handleMathChallengeSubmit,
handleNumberChallengeGuess,
bodyMatchItems,
nextBodyRound,
resetBodyMatchGame,
ensureBodyMatchGame,
handleBodyMatchChinese,
handleBodyMatchAttempt,
numberWordListItems,
renderBodyLabelButton,
renderBodyExplorer,
renderNumberVisual,
renderNumbersExplorer,
renderTelephoneExplorer,
renderFamilyHomeVisual,
renderFamilyExplorer,
renderIdentityExplorer,
renderMultiplicationExplorer
} = foundationsRuntime;


syncBookSelectionFromTopic();

({
  greetingsGameItems,
  resetGreetingsChallenge,
  ensureGreetingsChallenge,
  greetingsMeaningLabel,
  resetGreetingsMatchGame,
  ensureGreetingsMatchGame,
  handleGreetingsMatchPhrase,
  handleGreetingsMatchAttempt,
  handleGreetingsChallengePlay,
  handleGreetingsChallengeGuess,
  renderGreetingsExplorer
} = createGreetingsController({
  state,
  greetingsGameItemIds,
  greetingsPractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  resetListenChallengeResult,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  politeGameItems,
  politeMeaningLabel,
  resetPoliteMatchGame,
  ensurePoliteMatchGame,
  handlePoliteMatchPhrase,
  handlePoliteMatchAttempt,
  resetPoliteChallenge,
  ensurePoliteChallenge,
  handlePoliteChallengePlay,
  handlePoliteChallengeGuess,
  renderPoliteWordsExplorer
} = createPoliteWordsController({
  state,
  politeGameItemIds,
  politePractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  introductionsPromptById,
  introductionsGameKids,
  introductionsSelfIntroItemForKid,
  resetIntroductionsChallenge,
  ensureIntroductionsChallenge,
  handleIntroductionsChallengePlay,
  handleIntroductionsChallengeGuess,
  introductionsBuildTarget,
  resetIntroductionsBuilder,
  ensureIntroductionsBuilder,
  handleIntroductionsBuildToken,
  handleIntroductionsBuildClear,
  renderIntroductionsExplorer
} = createIntroductionsController({
  state,
  introductionsGameSpeakerIds,
  introductionsGamePrompts,
  introductionsBuildPhrases,
  introductionsPractice,
  illustratedKids,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  ageGameItems,
  resetAgeChallenge,
  ensureAgeChallenge,
  handleAgeChallengePlay,
  handleAgeChallengeGuess,
  ageBuildTarget,
  resetAgeBuilder,
  ensureAgeBuilder,
  handleAgeBuildToken,
  handleAgeBuildClear,
  renderAgeExplorer
} = createAgeController({
  state,
  ageGameItemIds,
  ageBuildPhrases,
  agePractice,
  topicById,
  shuffleArray,
  speak,
  speakSceneLines,
  currentTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  renderActivityPanel,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusStatus,
  elements: { focusExplorer, focusStatus }
}));

({
  schoolPracticeItems,
  ensureSchoolPractice,
  renderSchoolPractice,
  renderStationeryPractice,
  renderSchoolSuppliesPractice,
  renderFoodPractice,
  renderMealsConversationPractice,
  renderFoodPreferencesPractice,
  renderClassroomPractice,
  renderSchoolExplorer
} = createSchoolFoodRuntime({
  state,
  schoolTopicData,
  schoolSentenceBuilds,
  stationeryPictureMatchRounds,
  stationeryPictureMatchChoices,
  stationeryPictureMatchEnglish,
  currentTopic,
  currentBook,
  currentLesson,
  shuffleArray,
  speak,
  speakSceneLines,
  renderActivityPanel,
  focusItemsForTopic,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  focusExplorer,
  renderDefaultExplorer,
  renderListenPractice,
  renderMatchPractice
}));

const {
resetWeekdayChallenge,
ensureWeekdayChallenge,
handleWeekdayChallengePlay,
handleWeekdayChallengeGuess,
resetWeekdayMatchGame,
ensureWeekdayMatchGame,
handleWeekdayMatchPhrase,
handleWeekdayMatchAttempt,
resetClothesQuiz,
prepareClothesQuizQuestion,
ensureClothesQuiz,
handleClothesQuizPick,
nextClothesQuizQuestion,
resetTimeRoutineQuiz,
prepareTimeRoutineQuizQuestion,
ensureTimeRoutineQuiz,
handleTimeRoutineQuizPick,
nextTimeRoutineQuizQuestion,
resetClockQuiz,
prepareClockQuizQuestion,
ensureClockQuiz,
handleClockQuizPick,
nextClockQuizQuestion,
currentRoomBuildItem,
resetRoomBuilder,
prepareRoomBuilder,
ensureRoomBuilder,
isRoomBuildPrefixValid,
handleRoomBuildToken,
clearRoomBuilder,
nextRoomBuilder,
currentTransportBuildItem,
resetTransportBuilder,
prepareTransportBuilder,
ensureTransportBuilder,
handleTransportBuildToken,
clearTransportBuilder,
nextTransportBuilder,
resetPositionQuiz,
preparePositionQuizQuestion,
ensurePositionQuiz,
handlePositionQuizPlay,
handlePositionQuizPick,
nextPositionQuizQuestion,
currentComparisonBuildItem,
resetComparisonBuilder,
prepareComparisonBuilder,
ensureComparisonBuilder,
handleComparisonBuildToken,
clearComparisonBuilder,
nextComparisonBuilder,
resetDateMatchGame,
ensureDateMatchGame,
handleDateMatchPhrase,
handleDateMatchEvent,
resetDateChallenge,
ensureDateChallenge,
handleDateChallengePlay,
handleDateChallengeGuess,
timeDateSectionForCurrentLesson,
activeTimeDateSection,
renderTimeAssetGrid,
bindTimeAssetAudio,
renderWeekdaysExplorer,
renderDatesExplorer,
renderVisualTopicExplorer,
renderRoomsExplorer,
renderPositionsExplorer,
renderTimeDateExplorer,
renderClothesExplorer
} = createTimeDailyLifeRuntime({
state,
timeDateWeekItems,
timeDateClockItems,
timeDateExpressionItems,
timeDateRoutineItems,
datePracticeItems,
timeDateDateItems,
timeDateMonthItems,
comparisonPracticeItems,
comparisonWordItems,
positionPracticeItems,
positionScenes,
clothesMatchItems,
clothesPractice,
roomScenes,
roomSentenceTokens,
transportSentenceTokens,
visualTopicItems,
shuffleArray,
speak,
speakSceneLines,
currentTopic,
currentBook,
currentLesson,
renderActivityPanel,
focusExplorer,
focusStatus
});


topicDetailRuntime = createTopicDetailRuntime({
  state,
  books,
  numberStages,
  schoolTopicData,
  topicPageUrl,
  topicIdFromLocation,
  viewFromLocation,
  bookSelect,
  lessonSelect,
  topicTitle,
  topicSummary,
  topicProgress,
  topicLessonStrip,
  subtopicShelf,
  focusDisplay,
  currentTopic,
  currentNumberStage,
  focusItemsForTopic,
  currentFocusItem,
  currentBook,
  currentLesson,
  selectedTopicGroupId,
  bookCategoryForBook,
  categoryIdForTopic,
  narrowTopicBrowserTo,
  renderTopics,
  renderBooks,
  updateTopicPageVisibility,
  focusLearningPanel,
  renderFocusControls,
  renderFocusDisplay,
  renderFocusExplorer,
  renderFocusWordList,
  renderFocusStatus,
  renderActivityPanel,
  ensureBodyMatchGame,
  isFamilySentenceItemId,
  familyBookWordItems,
  usesLessonTemplate,
  syncBookSelectionFromTopic,
  switchView,
  updateLearningCultureNav
});
topicDetailRuntime.bindTopicDetailEvents();

lessonPracticeRuntime = createLessonPracticeRuntime({
  state,
  schoolTopicData,
  visualTopicItems,
  positionPracticeItems,
  timeDateWeekItems,
  timeDateClockItems,
  datePracticeItems,
  timeDateMonthItems,
  timeDateRoutineItems,
  clothesMatchItems,
  illustratedKids,
  numberHanzi,
  buildNumberItem,
  currentTopic,
  currentNumberStage,
  currentBook,
  currentLesson,
  focusItemsForTopic,
  shuffleArray,
  speak,
  renderFocusExplorer,
  renderFocusStatus,
  renderSharedLessonPractice,
  renderPracticeSayCards,
  bindPracticeSayCards,
  renderWorldPractice: worldRuntime.renderWorldPractice,
  renderHobbiesPractice: playHobbiesRuntime.renderHobbiesPractice,
  activeTimeDateSection,
  activityPanelTitle,
  activityPanelSummary,
  activityList,
  topicColumns,
  ensureWeekdayChallenge,
  ensureWeekdayMatchGame,
  handleWeekdayChallengePlay,
  handleWeekdayChallengeGuess,
  resetWeekdayMatchGame,
  handleWeekdayMatchPhrase,
  handleWeekdayMatchAttempt,
  ensureDateChallenge,
  ensureDateMatchGame,
  handleDateChallengePlay,
  handleDateChallengeGuess,
  resetDateMatchGame,
  handleDateMatchPhrase,
  handleDateMatchEvent,
  familyGameItems,
  familyPersonForItemId,
  familyHeadshotForItemId,
  ensureFamilyChallenge,
  ensureFamilyMatchGame,
  handleFamilyChallengePlay,
  handleFamilyChallengeGuess,
  resetFamilyMatchGame,
  handleFamilyMatchPhrase,
  handleFamilyMatchAttempt,
  greetingsGameItems,
  greetingsMeaningLabel,
  ensureGreetingsChallenge,
  ensureGreetingsMatchGame,
  handleGreetingsChallengePlay,
  handleGreetingsChallengeGuess,
  resetGreetingsMatchGame,
  handleGreetingsMatchPhrase,
  handleGreetingsMatchAttempt,
  politeGameItems,
  politeMeaningLabel,
  ensurePoliteChallenge,
  ensurePoliteMatchGame,
  handlePoliteChallengePlay,
  handlePoliteChallengeGuess,
  resetPoliteMatchGame,
  handlePoliteMatchPhrase,
  handlePoliteMatchAttempt,
  ensureRoomBuilder,
  currentRoomBuildItem,
  handleRoomBuildToken,
  clearRoomBuilder,
  nextRoomBuilder,
  ensureClothesQuiz,
  handleClothesQuizPick,
  nextClothesQuizQuestion,
  ensureTimeRoutineQuiz,
  handleTimeRoutineQuizPick,
  nextTimeRoutineQuizQuestion,
  ensureClockQuiz,
  handleClockQuizPick,
  nextClockQuizQuestion,
  ensureComparisonBuilder,
  currentComparisonBuildItem,
  handleComparisonBuildToken,
  clearComparisonBuilder,
  nextComparisonBuilder,
  ensurePositionQuiz,
  handlePositionQuizPlay,
  handlePositionQuizPick,
  nextPositionQuizQuestion,
  ensureTransportBuilder,
  currentTransportBuildItem,
  handleTransportBuildToken,
  clearTransportBuilder,
  nextTransportBuilder,
  resetNumberChallenge,
  ensureMathChallenge,
  handleNumberChallengeGuess,
  resetMathChallenge,
  handleMathChallengeSubmit,
  renderNumberVisual,
  introductionsBuildTarget,
  ensureIntroductionsBuilder,
  resetIntroductionsBuilder,
  handleIntroductionsBuildClear,
  handleIntroductionsBuildToken,
  ageGameItems,
  ensureAgeChallenge,
  ensureAgeBuilder,
  ageBuildTarget,
  handleAgeChallengePlay,
  handleAgeChallengeGuess,
  resetAgeBuilder,
  handleAgeBuildClear,
  handleAgeBuildToken,
  renderSchoolPractice
});

focusExplorerRuntime = createFocusExplorerRuntime({
  focusExplorer,
  schoolTopicData,
  currentTopic,
  renderBodyExplorer,
  renderNumbersExplorer,
  renderPoliteWordsExplorer,
  renderIntroductionsExplorer,
  renderIdentityExplorer,
  renderAgeExplorer,
  renderFamilyExplorer,
  renderGreetingsExplorer,
  renderClothesExplorer,
  renderTimeDateExplorer,
  renderWeekdaysExplorer,
  renderDatesExplorer,
  renderPositionsExplorer,
  renderRoomsExplorer,
  renderSchoolExplorer,
  renderVisualTopicExplorer,
  renderMultiplicationExplorer,
  renderWorldExplorer: worldRuntime.renderWorldExplorer,
  renderHobbiesExplorer: playHobbiesRuntime.renderHobbiesExplorer
});


const initialTopicId = topicIdFromLocation(window.location, topicById);
if (initialTopicId) {
  state.selectedTopicId = initialTopicId;
  state.expandedCategoryId = categoryIdForTopic(initialTopicId);
  state.topicPageOpen = true;
  syncBookSelectionFromTopic();
}

renderTopics();
renderBooks();
renderTopicDetail();
switchView(viewFromLocation(window.location));
updateTopicPageVisibility();

if (initialTopicId) {
  requestAnimationFrame(() => focusLearningPanel());
} else if (window.location.hash.startsWith("#culture-")) {
  requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" }));
}
