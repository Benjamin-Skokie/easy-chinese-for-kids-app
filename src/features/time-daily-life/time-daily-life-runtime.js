import { renderLessonNotes } from "../../core/lesson-notes.js";

export function createTimeDailyLifeRuntime(context) {
  const { state, timeDateWeekItems, timeDateClockItems, timeDateExpressionItems, timeDateRoutineItems, timeAdvancedBookWords, timeRoutineBookWords, datePracticeItems, timeDateDateItems, timeDateMonthItems, comparisonPracticeItems, comparisonWordItems, positionPracticeItems, positionScenes, positionBookWords, clothesMatchItems, clothesSentenceItems, clothesBookWords, clothesPractice, clothesUsefulNotes, roomScenes, roomSentenceTokens, transportSentenceTokens, transportBookWords, everydayActionItems, visualTopicItems, shuffleArray, speak, speakSceneLines, currentTopic, currentBook, currentLesson, renderActivityPanel, focusExplorer, focusStatus } = context;

function resetWeekdayChallenge(options = {}) {
  const answerId = nextRandomCycleId(state, "weekdays-listen", timeDateWeekItems.map((item) => item.id));
  const answer = timeDateWeekItems.find((item) => item.id === answerId);
  if (!answer) return;
  const distractors = shuffleArray(timeDateWeekItems.filter((item) => item.id !== answer.id)).slice(0, 3);
  state.weekdayChallengeAnswerId = answer.id;
  state.weekdayChallengePromptId = answer.id;
  state.weekdayChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.weekdayChallengePickedId = "";
  state.weekdayChallengeResult = "";
  state.weekdayChallengeWrongIds = new Set();
  state.weekdayListenFeedback = "";
}

function ensureWeekdayChallenge() {
  if (!state.weekdayChallengeAnswerId || !state.weekdayChallengeOptionIds.length) resetWeekdayChallenge();
}

function handleWeekdayChallengePlay() {
  ensureWeekdayChallenge();
  const previousPromptId = state.weekdayChallengePromptId;
  resetWeekdayChallenge({ excludeId: previousPromptId });
  const item = timeDateWeekItems.find((entry) => entry.id === state.weekdayChallengePromptId);
  if (item && state.tapAudioEnabled) speak(`今天星期几？今天${item.hanzi}。`, 0.78);
  renderActivityPanel(currentTopic());
}

function handleWeekdayChallengeGuess(itemId) {
  ensureWeekdayChallenge();
  const isCorrect = itemId === state.weekdayChallengeAnswerId;
  state.weekdayChallengePickedId = itemId;
  state.weekdayChallengeResult = isCorrect ? "correct" : "wrong";
  if (!isCorrect) {
    state.weekdayChallengeWrongIds = new Set([...state.weekdayChallengeWrongIds, itemId]);
  }
  renderActivityPanel(currentTopic());
}

function resetWeekdayMatchGame() {
  state.weekdaySelectedPhraseId = null;
  state.weekdayMatchedIds = new Set();
  state.weekdayPhraseOrder = shuffleArray(timeDateWeekItems.map((item) => item.id));
  state.weekdayMeaningOrder = shuffleArray(timeDateWeekItems.map((item) => item.id));
  state.weekdayMatchWrongPhraseIds = new Set();
  state.weekdayMatchWrongMeaningIds = new Set();
  state.weekdayMatchFeedback = "";
}

function ensureWeekdayMatchGame() {
  if (!state.weekdayPhraseOrder.length || !state.weekdayMeaningOrder.length) resetWeekdayMatchGame();
}

function handleWeekdayMatchPhrase(itemId) {
  if (state.weekdayMatchedIds.has(itemId)) return;
  state.weekdaySelectedPhraseId = itemId;
  const item = timeDateWeekItems.find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.hanzi, 0.78);
  renderActivityPanel(currentTopic());
}

function handleWeekdayMatchAttempt(targetId) {
  if (!state.weekdaySelectedPhraseId || state.weekdayMatchedIds.has(targetId)) return;
  if (state.weekdaySelectedPhraseId === targetId) {
    state.weekdayMatchedIds = new Set([...state.weekdayMatchedIds, targetId]);
    state.weekdaySelectedPhraseId = null;
    state.weekdayMatchFeedback = "";
  } else {
    state.weekdayMatchFeedback = "Try a different card.";
    state.weekdayMatchWrongPhraseIds = new Set([...state.weekdayMatchWrongPhraseIds, state.weekdaySelectedPhraseId]);
    state.weekdayMatchWrongMeaningIds = new Set([...state.weekdayMatchWrongMeaningIds, targetId]);
  }
  renderActivityPanel(currentTopic());
}

function resetClothesQuiz() {
  const ids = scopedClothesContent(clothesMatchItems).map((item) => item.id);
  state.clothesQuizOrder = shuffleArray(ids);
  state.clothesQuizIndex = 0;
  prepareClothesQuizQuestion();
}

function prepareClothesQuizQuestion() {
  const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
  const distractorIds = shuffleArray(scopedClothesContent(clothesMatchItems).filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.clothesQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.clothesQuizSelectedId = "";
  state.clothesQuizResult = "";
}

function ensureClothesQuiz() {
  const ids = new Set(scopedClothesContent(clothesMatchItems).map((item) => item.id));
  if (!state.clothesQuizOrder.length || state.clothesQuizOrder.some((id) => !ids.has(id))) {
    resetClothesQuiz();
  }
}

function handleClothesQuizPick(itemId) {
  if (state.clothesQuizResult === "correct") {
    return;
  }

  const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
  state.clothesQuizSelectedId = itemId;
  state.clothesQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.clothesQuizResult === "correct" && state.tapAudioEnabled) {
    const answer = scopedClothesContent(clothesMatchItems).find((item) => item.id === answerId);
    speak(answer?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextClothesQuizQuestion() {
  advanceShuffledOrder(state, "clothesQuizOrder", "clothesQuizIndex", shuffleArray);
  prepareClothesQuizQuestion();
  renderActivityPanel(currentTopic());
}

function resetClothesSentenceQuiz() {
  state.clothesSentenceOrder = shuffleArray(scopedClothesContent(clothesSentenceItems).map((item) => item.id));
  state.clothesSentenceIndex = 0;
  prepareClothesSentenceQuestion();
}

function prepareClothesSentenceQuestion() {
  const answerId = state.clothesSentenceOrder[state.clothesSentenceIndex];
  const distractorIds = shuffleArray(scopedClothesContent(clothesSentenceItems).filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.clothesSentenceOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.clothesSentenceSelectedId = "";
  state.clothesSentenceResult = "";
}

function ensureClothesSentenceQuiz() {
  const ids = new Set(scopedClothesContent(clothesSentenceItems).map((item) => item.id));
  if (!state.clothesSentenceOrder.length || state.clothesSentenceOrder.some((id) => !ids.has(id))) resetClothesSentenceQuiz();
}

function handleClothesSentencePick(itemId) {
  if (state.clothesSentenceResult === "correct") return;
  const answerId = state.clothesSentenceOrder[state.clothesSentenceIndex];
  state.clothesSentenceSelectedId = itemId;
  state.clothesSentenceResult = itemId === answerId ? "correct" : "wrong";
  if (state.clothesSentenceResult === "correct" && state.tapAudioEnabled) {
    speak(scopedClothesContent(clothesSentenceItems).find((item) => item.id === answerId)?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextClothesSentenceQuestion() {
  advanceShuffledOrder(state, "clothesSentenceOrder", "clothesSentenceIndex", shuffleArray);
  prepareClothesSentenceQuestion();
  renderActivityPanel(currentTopic());
}

function resetTimeRoutineQuiz() {
  state.timeRoutineQuizOrder = shuffleArray(timeDateRoutineItems.map((item) => item.id));
  state.timeRoutineQuizIndex = 0;
  prepareTimeRoutineQuizQuestion();
}

function prepareTimeRoutineQuizQuestion() {
  const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
  const distractorIds = shuffleArray(timeDateRoutineItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.timeRoutineQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.timeRoutineQuizSelectedId = "";
  state.timeRoutineQuizResult = "";
}

function ensureTimeRoutineQuiz() {
  if (!state.timeRoutineQuizOrder.length) {
    resetTimeRoutineQuiz();
  }
}

function handleTimeRoutineQuizPick(itemId) {
  if (state.timeRoutineQuizResult === "correct") {
    return;
  }

  const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
  state.timeRoutineQuizSelectedId = itemId;
  state.timeRoutineQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.timeRoutineQuizResult === "correct" && state.tapAudioEnabled) {
    const item = timeDateRoutineItems.find((entry) => entry.id === answerId);
    speak(item?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextTimeRoutineQuizQuestion() {
  advanceShuffledOrder(state, "timeRoutineQuizOrder", "timeRoutineQuizIndex", shuffleArray);
  prepareTimeRoutineQuizQuestion();
  renderActivityPanel(currentTopic());
}

function resetClockQuiz() {
  state.clockQuizOrder = shuffleArray(timeDateClockItems.map((item) => item.id));
  state.clockQuizIndex = 0;
  prepareClockQuizQuestion();
}

function prepareClockQuizQuestion() {
  const answerId = state.clockQuizOrder[state.clockQuizIndex];
  const distractorIds = shuffleArray(timeDateClockItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.clockQuizOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.clockQuizSelectedId = "";
  state.clockQuizResult = "";
}

function ensureClockQuiz() {
  if (!state.clockQuizOrder.length) {
    resetClockQuiz();
  }
}

function handleClockQuizPick(itemId) {
  if (state.clockQuizResult === "correct") {
    return;
  }

  const answerId = state.clockQuizOrder[state.clockQuizIndex];
  state.clockQuizSelectedId = itemId;
  state.clockQuizResult = itemId === answerId ? "correct" : "wrong";
  if (state.clockQuizResult === "correct" && state.tapAudioEnabled) {
    const item = timeDateClockItems.find((entry) => entry.id === answerId);
    if (item) speak(item.answerAudio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextClockQuizQuestion() {
  advanceShuffledOrder(state, "clockQuizOrder", "clockQuizIndex", shuffleArray);
  prepareClockQuizQuestion();
  renderActivityPanel(currentTopic());
}

function currentRoomBuildItem() {
  const id = state.roomBuildOrder[state.roomBuildIndex];
  return roomScenes.find((item) => item.id === id);
}

function resetRoomBuilder() {
  state.roomBuildOrder = shuffleArray(roomScenes.map((item) => item.id));
  state.roomBuildIndex = 0;
  prepareRoomBuilder();
}

function prepareRoomBuilder() {
  const item = currentRoomBuildItem();
  const tokens = roomSentenceTokens[item?.id];
  state.roomBuildSelectedTokens = [];
  state.roomBuildResult = "";
  state.roomBuildAvailableTokens = shuffleArray([...(tokens?.target ?? []), ...(tokens?.distractors ?? [])]);
}

function ensureRoomBuilder() {
  if (!state.roomBuildOrder.length) resetRoomBuilder();
}

function isRoomBuildPrefixValid(selected, tokens) {
  const prefix = tokens.prefix ?? [];
  if (selected.length <= prefix.length) {
    return selected.every((token, index) => token === prefix[index]);
  }

  if (!selected.slice(0, prefix.length).every((token, index) => token === prefix[index])) {
    return false;
  }

  const objects = tokens.unorderedObjects ?? [];
  const body = selected.slice(prefix.length);
  if (objects.length === 1) {
    return body.length === 1 && body[0] === objects[0];
  }

  const beforeConnectorCount = objects.length - 1;
  const chosenObjects = body.slice(0, beforeConnectorCount);
  const chosenAreUniqueObjects = chosenObjects.every((token) => objects.includes(token)) && new Set(chosenObjects).size === chosenObjects.length;
  if (body.length <= beforeConnectorCount) return chosenAreUniqueObjects;
  if (body.length === beforeConnectorCount + 1) return chosenAreUniqueObjects && body[beforeConnectorCount] === "和";
  if (body.length === beforeConnectorCount + 2) {
    const finalObject = body[beforeConnectorCount + 1];
    return chosenAreUniqueObjects && body[beforeConnectorCount] === "和" && objects.includes(finalObject) && !chosenObjects.includes(finalObject);
  }
  return false;
}

function handleRoomBuildToken(tokenIndex) {
  if (state.roomBuildResult === "correct") return;
  const item = currentRoomBuildItem();
  const tokens = roomSentenceTokens[item?.id];
  const token = state.roomBuildAvailableTokens[tokenIndex];
  if (!token || !tokens) return;

  const selected = [...state.roomBuildSelectedTokens, token];
  if (!isRoomBuildPrefixValid(selected, tokens)) {
    state.roomBuildResult = "wrong";
    state.roomBuildSelectedTokens = [];
    state.roomBuildAvailableTokens = shuffleArray([...tokens.target, ...tokens.distractors]);
    renderActivityPanel(currentTopic());
    return;
  }

  state.roomBuildResult = "";
  state.roomBuildSelectedTokens = selected;
  state.roomBuildAvailableTokens = state.roomBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
  if (selected.length === tokens.target.length) {
    state.roomBuildResult = "correct";
    if (state.tapAudioEnabled) speak(selected.join(""), 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearRoomBuilder() {
  prepareRoomBuilder();
  renderActivityPanel(currentTopic());
}

function nextRoomBuilder() {
  advanceShuffledOrder(state, "roomBuildOrder", "roomBuildIndex", shuffleArray);
  prepareRoomBuilder();
  renderActivityPanel(currentTopic());
}

function currentTransportBuildItem() {
  const id = state.transportBuildOrder[state.transportBuildIndex];
  return visualTopicItems.transport.find((item) => item.id === id);
}

function resetTransportBuilder() {
  state.transportBuildOrder = shuffleArray(visualTopicItems.transport.map((item) => item.id));
  state.transportBuildIndex = 0;
  prepareTransportBuilder();
}

function prepareTransportBuilder() {
  const item = currentTransportBuildItem();
  const tokens = transportSentenceTokens[item?.id];
  state.transportBuildSelectedTokens = [];
  state.transportBuildResult = "";
  state.transportBuildAvailableTokens = shuffleArray([...(tokens?.target ?? []), ...(tokens?.distractors ?? [])]);
}

function ensureTransportBuilder() {
  if (!state.transportBuildOrder.length) resetTransportBuilder();
}

function handleTransportBuildToken(tokenIndex) {
  if (state.transportBuildResult === "correct") return;
  const item = currentTransportBuildItem();
  const tokens = transportSentenceTokens[item?.id];
  const token = state.transportBuildAvailableTokens[tokenIndex];
  if (!token || !tokens) return;

  const selected = [...state.transportBuildSelectedTokens, token];
  const isPrefix = selected.every((entry, index) => entry === tokens.target[index]);
  if (!isPrefix) {
    state.transportBuildResult = "wrong";
    state.transportBuildSelectedTokens = [];
    state.transportBuildAvailableTokens = shuffleArray([...tokens.target, ...tokens.distractors]);
    renderActivityPanel(currentTopic());
    return;
  }

  state.transportBuildResult = "";
  state.transportBuildSelectedTokens = selected;
  state.transportBuildAvailableTokens = state.transportBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
  if (selected.length === tokens.target.length) {
    state.transportBuildResult = "correct";
    if (state.tapAudioEnabled) speak(item.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearTransportBuilder() {
  prepareTransportBuilder();
  renderActivityPanel(currentTopic());
}

function nextTransportBuilder() {
  advanceShuffledOrder(state, "transportBuildOrder", "transportBuildIndex", shuffleArray);
  prepareTransportBuilder();
  renderActivityPanel(currentTopic());
}

function currentEverydayAction() {
  const id = state.everydayActionsOrder[state.everydayActionsIndex];
  return everydayActionItems.find((item) => item.id === id);
}

function resetEverydayActionsQuiz(options = {}) {
  const ids = everydayActionItems.map((item) => item.id);
  const availableIds = ids.filter((id) => id !== options.excludeId);
  state.everydayActionsOrder = shuffleArray(availableIds.length ? availableIds : ids);
  state.everydayActionsIndex = 0;
  prepareEverydayActionsQuestion();
}

function prepareEverydayActionsQuestion() {
  const answerId = state.everydayActionsOrder[state.everydayActionsIndex];
  const distractorIds = shuffleArray(everydayActionItems.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
  state.everydayActionsOptionIds = shuffleArray([answerId, ...distractorIds]);
  state.everydayActionsSelectedId = "";
  state.everydayActionsResult = "";
}

function ensureEverydayActionsQuiz() {
  if (!state.everydayActionsOrder.length) resetEverydayActionsQuiz();
}

function handleEverydayActionsPick(itemId) {
  if (state.everydayActionsResult === "correct") return;
  const answerId = state.everydayActionsOrder[state.everydayActionsIndex];
  state.everydayActionsSelectedId = itemId;
  state.everydayActionsResult = itemId === answerId ? "correct" : "wrong";
  if (state.everydayActionsResult === "correct") {
    speak(currentEverydayAction()?.sentence, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextEverydayActionsQuestion() {
  advanceShuffledOrder(state, "everydayActionsOrder", "everydayActionsIndex", shuffleArray);
  prepareEverydayActionsQuestion();
  renderActivityPanel(currentTopic());
}

function resetPositionQuiz() {
  state.positionQuizOrder = shuffleArray(positionPracticeItems.map((item) => item.id));
  state.positionQuizIndex = 0;
  preparePositionQuizQuestion();
}

function preparePositionQuizQuestion() {
  const answerId = state.positionQuizOrder[state.positionQuizIndex];
  const answer = positionPracticeItems.find((item) => item.id === answerId)?.answer;
  const distractors = shuffleArray([...new Set(positionPracticeItems.map((item) => item.answer).filter((word) => word !== answer))]).slice(0, 3);
  state.positionQuizOptionIds = shuffleArray([answer, ...distractors]);
  state.positionQuizSelectedId = "";
  state.positionQuizResult = "";
}

function ensurePositionQuiz() {
  if (!state.positionQuizOrder.length) resetPositionQuiz();
}

function handlePositionQuizPlay() {
  ensurePositionQuiz();
  const item = positionPracticeItems.find((entry) => entry.id === state.positionQuizOrder[state.positionQuizIndex]);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
}

function handlePositionQuizPick(itemId) {
  if (state.positionQuizResult === "correct") return;
  const answerId = state.positionQuizOrder[state.positionQuizIndex];
  const answer = positionPracticeItems.find((entry) => entry.id === answerId)?.answer;
  state.positionQuizSelectedId = itemId;
  state.positionQuizResult = itemId === answer ? "correct" : "wrong";
  if (state.positionQuizResult === "correct" && state.tapAudioEnabled) {
    const item = positionPracticeItems.find((entry) => entry.id === answerId);
    speak(item?.audio, 0.78);
  }
  renderActivityPanel(currentTopic());
}

function nextPositionQuizQuestion() {
  advanceShuffledOrder(state, "positionQuizOrder", "positionQuizIndex", shuffleArray);
  preparePositionQuizQuestion();
  renderActivityPanel(currentTopic());
}

function currentComparisonBuildItem() {
  const id = state.comparisonBuildOrder[state.comparisonBuildIndex];
  return comparisonPracticeItems.find((item) => item.id === id);
}

function resetComparisonBuilder() {
  state.comparisonBuildOrder = shuffleArray(comparisonPracticeItems.map((item) => item.id));
  state.comparisonBuildIndex = 0;
  prepareComparisonBuilder();
}

function prepareComparisonBuilder() {
  const item = currentComparisonBuildItem();
  state.comparisonBuildSelectedTokens = [];
  state.comparisonBuildAvailableTokens = shuffleArray(item?.options ?? []);
  state.comparisonBuildResult = "";
}

function ensureComparisonBuilder() {
  if (!state.comparisonBuildOrder.length) resetComparisonBuilder();
}

function handleComparisonBuildToken(index) {
  if (state.comparisonBuildResult === "correct") return;
  const item = currentComparisonBuildItem();
  const token = state.comparisonBuildAvailableTokens[index];
  if (!item || !token) return;
  const selected = [...state.comparisonBuildSelectedTokens, token];
  if (selected.some((entry, tokenIndex) => entry !== item.target[tokenIndex])) {
    state.comparisonBuildResult = "wrong";
    state.comparisonBuildSelectedTokens = [];
    state.comparisonBuildAvailableTokens = shuffleArray(item.options);
    renderActivityPanel(currentTopic());
    return;
  }
  state.comparisonBuildResult = "";
  state.comparisonBuildSelectedTokens = selected;
  state.comparisonBuildAvailableTokens = state.comparisonBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
  if (selected.length === item.target.length) {
    state.comparisonBuildResult = "correct";
    if (state.tapAudioEnabled) speak(`${item.before}${selected[0]}${item.between}${selected[1]}${item.after}`, 0.78, { sourcePolicy: "recorded-only" });
  }
  renderActivityPanel(currentTopic());
}

function clearComparisonBuilder() {
  prepareComparisonBuilder();
  renderActivityPanel(currentTopic());
}

function scopedDateContent(items) {
  const source = currentTopic().id === "dates" && state.lessonScope
    ? `${state.lessonScope.bookId}:${state.lessonScope.lessonNumber}`
    : "";
  return source ? items.filter((item) => item.lessonSources?.includes(source)) : items;
}

function scopedClothesContent(items) {
  const source = currentTopic().id === "clothes" && state.lessonScope
    ? `${state.lessonScope.bookId}:${state.lessonScope.lessonNumber}`
    : "";
  return source ? items.filter((item) => item.lessonSources?.includes(source)) : items;
}

function nextComparisonBuilder() {
  advanceShuffledOrder(state, "comparisonBuildOrder", "comparisonBuildIndex", shuffleArray);
  prepareComparisonBuilder();
  renderActivityPanel(currentTopic());
}

function resetDateMatchGame() {
  const roundIds = shuffleArray(scopedDateContent(timeDateMonthItems).map((item) => item.id)).slice(0, 6);
  state.dateSelectedPhraseId = null;
  state.dateMatchedIds = new Set();
  state.datePhraseOrder = shuffleArray(roundIds);
  state.dateEventOrder = shuffleArray(roundIds);
  state.dateMatchWrongPhraseIds = new Set();
  state.dateMatchWrongMeaningIds = new Set();
  state.dateMatchFeedback = "";
}

function ensureDateMatchGame() {
  const monthIds = new Set(scopedDateContent(timeDateMonthItems).map((item) => item.id));
  if (
    !state.datePhraseOrder.length ||
    !state.dateEventOrder.length ||
    state.datePhraseOrder.length !== 6 ||
    state.dateEventOrder.length !== 6 ||
    state.datePhraseOrder.some((id) => !monthIds.has(id)) ||
    state.dateEventOrder.some((id) => !monthIds.has(id))
  ) {
    resetDateMatchGame();
  }
}

function handleDateMatchPhrase(itemId) {
  if (state.dateMatchedIds.has(itemId)) return;
  state.dateSelectedPhraseId = itemId;
  const item = scopedDateContent(timeDateMonthItems).find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.hanzi, 0.78);
  state.dateMatchFeedback = "";
  renderActivityPanel(currentTopic());
}

function handleDateMatchEvent(itemId) {
  const selectedId = state.dateSelectedPhraseId;
  if (!selectedId || state.dateMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.dateMatchedIds = new Set([...state.dateMatchedIds, itemId]);
    state.dateSelectedPhraseId = null;
    state.dateMatchFeedback = "";
  } else {
    state.dateMatchFeedback = "Try again.";
    state.dateMatchWrongPhraseIds = new Set([...state.dateMatchWrongPhraseIds, selectedId]);
    state.dateMatchWrongMeaningIds = new Set([...state.dateMatchWrongMeaningIds, itemId]);
  }
  renderActivityPanel(currentTopic());
}

function resetDateChallenge(options = {}) {
  const items = scopedDateContent(datePracticeItems);
  const answerId = nextRandomCycleId(state, "dates-listen", items.map((item) => item.id));
  const answer = items.find((item) => item.id === answerId) ?? items[0];
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(0, 3);
  state.dateChallengeAnswerId = answer.id;
  state.dateChallengePromptId = answer.id;
  state.dateChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.dateChallengePickedId = "";
  state.dateChallengeResult = "";
  state.dateChallengeWrongIds = new Set();
  state.dateListenFeedback = "";
}

function ensureDateChallenge() {
  if (!state.dateChallengeAnswerId || !state.dateChallengeOptionIds.length) resetDateChallenge();
}

function handleDateChallengePlay() {
  const previousId = state.dateChallengePromptId;
  resetDateChallenge({ excludeId: previousId });
  const item = scopedDateContent(datePracticeItems).find((entry) => entry.id === state.dateChallengePromptId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleDateChallengeGuess(itemId) {
  const isCorrect = itemId === state.dateChallengeAnswerId;
  state.dateChallengePickedId = itemId;
  state.dateChallengeResult = isCorrect ? "correct" : "wrong";
  if (isCorrect) {
  } else {
    state.dateChallengeWrongIds = new Set([...state.dateChallengeWrongIds, itemId]);
  }
  renderActivityPanel(currentTopic());
}


function timeDateSectionForCurrentLesson() {
  const lessonKey = `${currentBook().id}:${currentLesson().lesson}`;
  if (lessonKey === "2b:2") return "clock";
  if (lessonKey === "4a:3") return "routine";
  return "routine";
}

function activeTimeDateSection() {
  const source = `${currentBook().id}:${currentLesson().lesson}`;
  if (state.timeDateSectionSource !== source) {
    state.timeDateSectionSource = source;
    state.timeDateSectionId = timeDateSectionForCurrentLesson();
  }
  return state.timeDateSectionId || "week";
}

function renderTimeAssetGrid(items, modifier, collection = modifier) {
  return `<div class="time-asset-grid time-asset-grid-${modifier}">
    ${items
      .map(
        (item) => `
          <button class="time-asset-card book-word-card" type="button" data-time-asset="${collection}:${item.id}">
            <img class="book-word-image" src="${item.imagePath}" alt="${item.english}" />
            <span class="book-word-copy">
              ${item.hideLabels || item.hideLabelHanzi ? "" : item.words ? `<span class="time-asset-word-list">${item.words.map((word) => `<span>${word}</span>`).join("")}</span>` : `<span class="time-asset-hanzi">${item.hanzi}</span>`}
              ${!item.hideLabels && !item.hideLabelDetails && state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
              ${!item.hideLabels && !item.hideLabelDetails && state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}
              ${item.context ? `<span class="time-asset-context">${item.context}</span>` : ""}
              ${item.contextPinyin && state.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
              ${item.contextEnglish && state.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
            </span>
          </button>
        `
      )
      .join("")}
  </div>`;
}

function bindTimeAssetAudio(container) {
  container.querySelectorAll("[data-time-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collection, id] = button.dataset.timeAsset.split(":");
      const items = {
        week: timeDateWeekItems,
        clock: timeDateClockItems,
        date: timeDateDateItems,
        month: timeDateMonthItems,
        visual: Object.values(visualTopicItems).flat()
      }[collection] ?? [];
      const item = items.find((entry) => entry.id === id);
      if (item && state.tapAudioEnabled) {
        speak(item.audio, 0.78);
      }
    });
  });
}

function renderWeekdaysExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Days of the Week</h4>
      </div>
      <div class="time-asset-grid time-asset-grid-week">
        ${timeDateWeekItems.map((item) => `
          <section class="time-asset-card weekday-scene-card">
            <div class="greetings-exchange-top"><div><span class="time-asset-hanzi">${item.hanzi}</span></div><button class="small-button is-play-button" type="button" data-weekday-play-scene="${item.id}">Play</button></div>
            <img class="time-asset-image" src="${item.imagePath}" alt="${item.english}" />
            <span class="time-asset-context">${item.context}</span>
            ${state.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
            ${state.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
          </section>
        `).join("")}
      </div>
      ${renderLessonNotes([{
        hanzi: "今天星期几？",
        explanation: "Chinese keeps the answer position and replaces the day number with 几. English moves “what day” to the front.",
        examples: [{ hanzi: "今天星期一。", english: "Today is Monday." }]
      }])}
    </div>
  `;
  focusExplorer.querySelectorAll("[data-weekday-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = timeDateWeekItems.find((entry) => entry.id === button.dataset.weekdayPlayScene);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
}

function renderDatesExplorer() {
  const dateItems = scopedDateContent(timeDateDateItems);
  const monthItems = scopedDateContent(timeDateMonthItems);
  const lessonScope = state.lessonScope;
  const dateNotes = [
    {
      hanzi: "今天几月几号？",
      explanation: "Chinese gives dates from larger unit to smaller unit: month, then day. 几 stays where the unknown number belongs.",
      examples: [{ hanzi: "今天五月二十号。", english: "Today is May 20." }],
      lessonSources: ["3a:2"]
    },
    {
      hanzi: "五月二十号 / 五月二十日",
      explanation: "号 is common in speech. 日 is more formal and common in written dates. Both mean May 20.",
      lessonSources: ["3a:2"]
    }
  ];
  const visibleNotes = lessonScope
    ? dateNotes.filter((note) => note.lessonSources.includes(`${lessonScope.bookId}:${lessonScope.lessonNumber}`))
    : dateNotes;
  const monthSection = monthItems.length ? `
      <section class="time-months-intro">
        <div>
          <p class="body-match-kicker">Months of the year</p>
          <p class="time-months-hanzi">一年有十二个月。</p>
          ${state.showPinyin ? '<p class="time-months-pinyin">yī nián yǒu shí èr ge yuè.</p>' : ""}
          ${state.showEnglish ? '<p class="time-months-english">There are twelve months in a year.</p>' : ""}
        </div>
        <button class="small-button is-play-button" type="button" data-months-play>Play</button>
      </section>
      <section class="school-lesson-section">
        <div class="school-scene-grid month-scene-grid">
          ${monthItems.map((item) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${item.english}</p></div><button class="small-button is-play-button" type="button" data-month-scene="${item.id}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${item.imagePath}" alt="${item.english}" /><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${item.context}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${item.contextPinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${item.contextEnglish}</p>` : ""}</div></article></div></div></section>`).join("")}
        </div>
      </section>` : "";
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      ${lessonScope ? `<div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Dates & Months</h4>
      </div>` : ""}
      <section class="school-lesson-section">
        <div class="time-months-heading"><p class="body-match-kicker">Scenes</p></div>
        <div class="school-scene-grid date-scene-grid">
          ${dateItems.map((item) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${item.english}</p></div><button class="small-button is-play-button" type="button" data-date-scene="${item.id}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${item.imagePath}" alt="${item.english}" /><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${item.context}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${item.contextPinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${item.contextEnglish}</p>` : ""}</div></article></div></div></section>`).join("")}
        </div>
      </section>
      ${monthSection}
      ${renderLessonNotes(visibleNotes)}
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-date-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = dateItems.find((entry) => entry.id === button.dataset.dateScene);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-month-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = monthItems.find((entry) => entry.id === button.dataset.monthScene);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
  focusExplorer.querySelector("[data-months-play]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speak("一年有十二个月", 0.78);
    }
  });
}

function renderVisualTopicExplorer(sceneId) {
  const topic = currentTopic();
  const items = visualTopicItems[sceneId] ?? [];
  const comparisonScenes = sceneId === "comparisons"
    ? `<section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Scenes</p></div><div class="school-scene-grid comparison-scene-grid">${items.map((item) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${item.english}</p></div><button class="small-button is-play-button" type="button" data-comparison-scene="${item.audio}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${item.imagePath}" alt="${item.english}" /><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${item.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${item.english}</p>` : ""}</div></article></div></div></section>`).join("")}</div></section>`
    : "";
  const transportScenes = sceneId === "transport"
    ? `<section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Scenes</p></div><div class="school-scene-grid transport-scene-grid">${items.map((item) => `<section class="greetings-exchange school-scene-card"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${item.sceneTitle}</p></div><button class="small-button is-play-button" type="button" data-transport-scene="${item.audio}">Play</button></div><div class="school-scene-layout"><img class="school-scene-image" src="${item.imagePath}" alt="${item.english}" /><div class="greetings-line-stack"><article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${item.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${item.english}</p>` : ""}</div></article></div></div></section>`).join("")}</div></section>`
    : "";
  const comparisonWords = sceneId === "comparisons"
    ? `<section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="comparison-word-grid">${comparisonWordItems.map((item) => `<button class="comparison-word-card" type="button" data-comparison-word="${item.hanzi}"><span class="comparison-word-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="comparison-word-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="comparison-word-english">${item.english}</span>` : ""}</button>`).join("")}</div></section>`
    : "";
  const transportWords = sceneId === "transport"
    ? `<section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="comparison-word-grid">${transportBookWords.map((item) => `<button class="comparison-word-card" type="button" data-transport-word="${item.hanzi}"><span class="comparison-word-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="comparison-word-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="comparison-word-english">${item.english}</span>` : ""}</button>`).join("")}</div></section>`
    : "";
  const usefulNotes = sceneId === "transport"
    ? renderLessonNotes([
        {
          hanzi: "坐校车 / 骑自行车",
          explanation: "English may use “take” or “ride.” Chinese uses 坐 for travelling in a vehicle and 骑 for a bicycle or something you straddle."
        },
        {
          hanzi: "我坐校车去学校。",
          explanation: "Chinese uses 去 + place without a separate word for English “to.”",
          examples: [{ hanzi: "我骑自行车去公园。", english: "I ride a bicycle to the park." }]
        }
      ])
    : sceneId === "comparisons"
      ? renderLessonNotes([{
          hanzi: "A 比 B + 形容词",
          explanation: "Chinese places 比 and the comparison item before the adjective. English puts “than” after the adjective.",
          examples: [{ hanzi: "哥哥比弟弟高。", english: "The older brother is taller than the younger brother." }]
        }])
      : "";
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      ${comparisonScenes || transportScenes || `<div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>${renderTimeAssetGrid(items, `visual visual-${sceneId}`, "visual")}`}
      ${comparisonWords}
      ${transportWords}
      ${usefulNotes}
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-comparison-word]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.comparisonWord, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-transport-word]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.transportWord, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-comparison-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.comparisonScene, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-transport-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.transportScene, 0.78);
    });
  });
}

function renderEverydayActionsExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board everyday-actions-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">Topic unit</p>
        <h4>Everyday Actions</h4>
        <p>Look at each picture, hear the action, and say the full sentence.</p>
      </div>
      <div class="everyday-actions-gallery">
        ${everydayActionItems.map((item) => `
          <article class="everyday-action-card">
            <div class="everyday-action-card-top"><p class="body-match-kicker">${item.english}</p><button class="small-button is-play-button" type="button" data-everyday-action-play="${item.id}">Play</button></div>
            <div class="everyday-action-visual"><img class="everyday-action-image" src="${item.imagePath}" alt="${item.sentenceEnglish}" /></div>
            <div class="everyday-action-copy"><p class="everyday-action-word">${item.hanzi}</p><p class="telephone-line-hanzi">${item.sentence}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${item.sentencePinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${item.sentenceEnglish}</p>` : ""}</div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
  focusExplorer.querySelectorAll("[data-everyday-action-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = everydayActionItems.find((entry) => entry.id === button.dataset.everydayActionPlay);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
}

function renderRoomsExplorer() {
  const topic = currentTopic();
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      <div class="greetings-practice-grid room-scene-grid">
        ${roomScenes.map((scene) => `
          <section class="greetings-exchange room-scene-card">
            <div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.title}</p></div><button class="small-button is-play-button" type="button" data-room-play-scene="${scene.id}">Play</button></div>
            <div class="room-scene-layout">
              <img class="room-scene-image" src="${scene.imagePath}" alt="${scene.english}" />
              <article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${scene.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${scene.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${scene.english}</p>` : ""}</div></article>
            </div>
          </section>
        `).join("")}
      </div>
      <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
      ${renderTimeAssetGrid(visualTopicItems.rooms, "visual visual-rooms", "visual")}
      ${renderLessonNotes([
        {
          hanzi: "房间里有钢琴。",
          explanation: "English begins with “There is” or “There are.” Chinese begins with the place, then 有, then the thing.",
          examples: [{ hanzi: "地上有书。", english: "There is a book on the floor." }]
        },
        {
          hanzi: "房间里没有钢琴。",
          explanation: "The negative form of 有 is 没有, not 不有."
        }
      ], { gridClass: "room-useful-note-grid" })}
    </div>
  `;
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-room-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = roomScenes.find((entry) => entry.id === button.dataset.roomPlayScene);
      if (scene && state.tapAudioEnabled) speak(scene.audio, 0.78);
    });
  });
}


function renderPositionsExplorer() {
  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Positions & Directions</h4>
      </div>
      <div class="greetings-practice-grid position-scene-grid">
        ${positionScenes
          .map(
            (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.title}</p></div><button class="small-button is-play-button" type="button" data-position-play-scene="${scene.id}">Play</button></div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image position-scene-image position-scene-image-${scene.id}" src="${scene.imagePath}" alt="${scene.imageAlt}" /></div>
                  <div class="greetings-line-stack">
                    ${scene.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
      <section class="school-lesson-section">
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        <div class="comparison-word-grid position-word-grid">
          ${positionBookWords.map((word) => `<button class="comparison-word-card" type="button" data-position-word="${word.hanzi}"><span class="comparison-word-hanzi">${word.hanzi}</span>${state.showPinyin ? `<span class="comparison-word-pinyin">${word.pinyin}</span>` : ""}${state.showEnglish ? `<span class="comparison-word-english">${word.english}</span>` : ""}</button>`).join("")}
        </div>
      </section>
      ${renderLessonNotes([{
        hanzi: "A 在 B + 位置",
        explanation: "Chinese puts the position word after the reference object. English usually puts the position phrase before it.",
        examples: [{ hanzi: "书架在桌子左边。", english: "The bookshelf is to the left of the desk." }]
      }], { gridClass: "position-note-grid" })}
    </div>
  `;
  focusExplorer.querySelectorAll("[data-position-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = positionScenes.find((entry) => entry.id === button.dataset.positionPlayScene);
      if (scene && state.tapAudioEnabled) speakSceneLines(scene.lines);
    });
  });
  focusExplorer.querySelectorAll("[data-position-word]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) speak(button.dataset.positionWord, 0.78);
    });
  });
}

function renderTimeDateExplorer() {
  const activeSection = activeTimeDateSection();
  const sections = [
    { id: "clock", hanzi: "整点", english: "Whole hours" },
    { id: "routine", hanzi: "作息", english: "Routine" }
  ];
  const wordGrid = (words) => `<section class="school-lesson-section time-book-word-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div><div class="comparison-word-grid time-text-word-grid">${words.map((word) => `<button class="comparison-word-card" type="button" data-time-book-word="${word.id}"><span class="comparison-word-hanzi">${word.hanzi}</span>${state.showPinyin ? `<span class="comparison-word-pinyin">${word.pinyin}</span>` : ""}${state.showEnglish ? `<span class="comparison-word-english">${word.english}</span>` : ""}</button>`).join("")}</div></section>`;
  const clockNotes = renderLessonNotes([{
    hanzi: "几点了？",
    explanation: "Chinese replaces the hour number with 几. Compare 七点 and 几点.",
    examples: [{ hanzi: "现在七点。", english: "It is seven o’clock now." }]
  }], { sectionClass: "time-useful-notes" });
  const routineNotes = renderLessonNotes([
    {
      hanzi: "两点一刻 / 两点半",
      explanation: "Chinese starts with the hour, then adds 一刻 for 15 minutes or 半 for 30 minutes.",
      examples: [{ hanzi: "两点一刻。", english: "A quarter past two." }]
    },
    {
      hanzi: "七点起床。",
      explanation: "Chinese normally puts the time before the action. English often puts it after the action.",
      examples: [{ hanzi: "两点半放学。", english: "School ends at 2:30." }]
    }
  ], { sectionClass: "time-useful-notes" });
  let content = "";
  let notes = "";

  if (activeSection === "clock") {
    content = `<section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>${renderTimeAssetGrid(timeDateClockItems, "clock")}</section>`;
    notes = clockNotes;
  } else {
    content = `
      <section class="school-lesson-section"><div class="time-months-heading"><p class="body-match-kicker">Scenes</p></div><div class="greetings-practice-grid time-routine-scene-grid">
        ${timeDateRoutineItems
          .map(
            (item) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div><p class="body-match-kicker">${item.title}</p></div>
                  <button class="small-button is-play-button" type="button" data-time-routine-play="${item.id}">Play</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image time-routine-scene-image" src="${item.imagePath}" alt="${item.english}" /></div>
                  <div class="greetings-line-stack">
                    <article class="greetings-line-card">
                      <div class="telephone-bubble-copy">
                        <p class="telephone-line-hanzi">${item.hanzi}</p>
                        ${state.showPinyin ? `<p class="telephone-line-pinyin">${item.pinyin}</p>` : ""}
                        ${state.showEnglish ? `<p class="telephone-line-english">${item.english}</p>` : ""}
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div></section>
      ${wordGrid([...timeAdvancedBookWords, ...timeRoutineBookWords])}
    `;
    notes = routineNotes;
  }

  focusExplorer.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Time & Routines</h4>
      </div>
      <div class="time-date-section-tabs" role="tablist" aria-label="Time and date sections">
        ${sections
          .map(
            (section) => `<button class="time-date-section-tab${section.id === activeSection ? " is-active" : ""}" type="button" role="tab" aria-selected="${String(section.id === activeSection)}" data-time-date-section="${section.id}"><span>${section.hanzi}</span><small>${section.english}</small></button>`
          )
          .join("")}
      </div>
      ${content}
      ${notes}
    </div>
  `;

  focusExplorer.querySelectorAll("[data-time-date-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.timeDateSectionId = button.dataset.timeDateSection;
      renderTimeDateExplorer();
      renderActivityPanel(currentTopic());
    });
  });
  focusExplorer.querySelectorAll("[data-time-book-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const word = [...timeAdvancedBookWords, ...timeRoutineBookWords].find((item) => item.id === button.dataset.timeBookWord);
      if (word && state.tapAudioEnabled) speak(word.audio, 0.78);
    });
  });
  bindTimeAssetAudio(focusExplorer);
  focusExplorer.querySelectorAll("[data-time-routine-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = timeDateRoutineItems.find((entry) => entry.id === button.dataset.timeRoutinePlay);
      if (item && state.tapAudioEnabled) {
        speak(item.audio, 0.78);
      }
    });
  });
}

function renderClothesExplorer() {
  const scenes = scopedClothesContent(clothesPractice);
  const words = scopedClothesContent(clothesBookWords);
  const notes = scopedClothesContent(clothesUsefulNotes);
  const lessonScope = state.lessonScope;
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      ${lessonScope ? `<div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: getting dressed</h4>
        <p>Learn everyday clothes first, then choose what to wear for the weather.</p>
      </div>` : ""}
      <div class="greetings-practice-grid clothes-scene-grid">
        ${scenes
          .map(
            (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div><p class="body-match-kicker">${scene.title}</p></div>
                  <button class="small-button is-play-button" type="button" data-clothes-play-scene="${scene.id}">Play</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${scene.imagePath}" alt="${scene.imageAlt}" />
                  </div>
                  <div class="greetings-line-stack">
                    ${scene.lines
                      .map(
                        (line) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
      <section class="school-lesson-section clothes-book-words">
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        <div class="time-asset-grid clothes-word-grid">
          ${words.map((word) => `<button class="time-asset-card book-word-card" type="button" data-clothes-word="${word.id}">${word.imagePath ? `<img class="book-word-image" src="${word.imagePath}" alt="${word.english}" />` : `<span class="book-word-image book-word-image-fallback" aria-hidden="true">${word.hanzi}</span>`}<span class="book-word-copy"><span class="time-asset-hanzi">${word.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${word.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${word.english}</span>` : ""}</span></button>`).join("")}
        </div>
      </section>
      ${renderLessonNotes(notes)}
    </div>
  `;

  focusExplorer.querySelectorAll("[data-clothes-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = scenes.find((entry) => entry.id === button.dataset.clothesPlayScene);
      if (scene && state.tapAudioEnabled) {
        speakSceneLines(scene.lines);
      }
    });
  });
  focusExplorer.querySelectorAll("[data-clothes-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const word = words.find((entry) => entry.id === button.dataset.clothesWord);
      if (word && state.tapAudioEnabled) speak(word.audio, 0.78);
    });
  });
}


  return { resetWeekdayChallenge, ensureWeekdayChallenge, handleWeekdayChallengePlay, handleWeekdayChallengeGuess, resetWeekdayMatchGame, ensureWeekdayMatchGame, handleWeekdayMatchPhrase, handleWeekdayMatchAttempt, resetClothesQuiz, prepareClothesQuizQuestion, ensureClothesQuiz, handleClothesQuizPick, nextClothesQuizQuestion, resetClothesSentenceQuiz, prepareClothesSentenceQuestion, ensureClothesSentenceQuiz, handleClothesSentencePick, nextClothesSentenceQuestion, resetTimeRoutineQuiz, prepareTimeRoutineQuizQuestion, ensureTimeRoutineQuiz, handleTimeRoutineQuizPick, nextTimeRoutineQuizQuestion, resetClockQuiz, prepareClockQuizQuestion, ensureClockQuiz, handleClockQuizPick, nextClockQuizQuestion, currentRoomBuildItem, resetRoomBuilder, prepareRoomBuilder, ensureRoomBuilder, isRoomBuildPrefixValid, handleRoomBuildToken, clearRoomBuilder, nextRoomBuilder, currentTransportBuildItem, resetTransportBuilder, prepareTransportBuilder, ensureTransportBuilder, handleTransportBuildToken, clearTransportBuilder, nextTransportBuilder, ensureEverydayActionsQuiz, currentEverydayAction, handleEverydayActionsPick, nextEverydayActionsQuestion, resetPositionQuiz, preparePositionQuizQuestion, ensurePositionQuiz, handlePositionQuizPlay, handlePositionQuizPick, nextPositionQuizQuestion, currentComparisonBuildItem, resetComparisonBuilder, prepareComparisonBuilder, ensureComparisonBuilder, handleComparisonBuildToken, clearComparisonBuilder, nextComparisonBuilder, resetDateMatchGame, ensureDateMatchGame, handleDateMatchPhrase, handleDateMatchEvent, resetDateChallenge, ensureDateChallenge, handleDateChallengePlay, handleDateChallengeGuess, timeDateSectionForCurrentLesson, activeTimeDateSection, renderTimeAssetGrid, bindTimeAssetAudio, renderWeekdaysExplorer, renderDatesExplorer, renderVisualTopicExplorer, renderEverydayActionsExplorer, renderRoomsExplorer, renderPositionsExplorer, renderTimeDateExplorer, renderClothesExplorer };
}
import { advanceShuffledOrder, nextRandomCycleId } from "../../core/random-cycle.js";
