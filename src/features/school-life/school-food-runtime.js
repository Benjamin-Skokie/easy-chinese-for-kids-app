export function createSchoolFoodRuntime(context) {
  const { state, schoolTopicData, schoolSentenceBuilds, stationeryPictureMatchRounds, stationeryPictureMatchChoices, stationeryPictureMatchEnglish, currentTopic, currentBook, currentLesson, shuffleArray, speak, speakSceneLines, renderActivityPanel, focusItemsForTopic, activityPanelTitle, activityPanelSummary, activityList, focusExplorer, renderDefaultExplorer, renderListenPractice, renderMatchPractice } = context;

function schoolPracticeItems(topicId = currentTopic().id) {
  const data = schoolTopicData[topicId];
  return data?.practiceItems ?? data?.words ?? schoolWordGroups(topicId).flatMap((group) => group.items);
}

function backpackGameItems() {
  const portableItemIds = new Set(["pencil", "ruler", "eraser", "colored-pencils", "scissors", "glue", "pencil-box", "textbook", "workbook"]);
  return schoolPracticeItems("school-supplies").filter((item) => portableItemIds.has(item.id));
}

 function currentStationeryPictureMatchRound() {
  return stationeryPictureMatchRounds[state.stationeryPictureMatchIndex] ?? stationeryPictureMatchRounds[0];
}

function resetStationeryPictureMatch(index = state.stationeryPictureMatchIndex) {
  state.stationeryPictureMatchIndex = index % stationeryPictureMatchRounds.length;
  state.stationeryPictureMatchSelections = { measure: "", color: "", item: "" };
  state.stationeryPictureMatchWrong = { measure: new Set(), color: new Set(), item: new Set() };
  state.stationeryPictureMatchChoiceOrders = Object.fromEntries(Object.entries(stationeryPictureMatchChoices).map(([column, choices]) => [column, shuffleArray([...choices])]));
  state.stationeryPictureMatchComplete = false;
}

function ensureStationeryPictureMatch() {
  const hasValidOrders = Object.entries(stationeryPictureMatchChoices).every(([column, choices]) => {
    const order = state.stationeryPictureMatchChoiceOrders[column];
    return order?.length === choices.length && choices.every((choice) => order.includes(choice));
  });
  if (!hasValidOrders) resetStationeryPictureMatch();
}

function handleStationeryPictureMatchPick(column, value) {
  if (state.stationeryPictureMatchComplete) return;
  const round = currentStationeryPictureMatchRound();
  if (!round || !stationeryPictureMatchChoices[column]) return;
  if (value !== round.target[column]) {
    state.stationeryPictureMatchWrong = {
      ...state.stationeryPictureMatchWrong,
      [column]: new Set([...state.stationeryPictureMatchWrong[column], value])
    };
    renderActivityPanel(currentTopic());
    return;
  }
  state.stationeryPictureMatchSelections = { ...state.stationeryPictureMatchSelections, [column]: value };
  state.stationeryPictureMatchWrong = {
    ...state.stationeryPictureMatchWrong,
    [column]: new Set()
  };
  state.stationeryPictureMatchComplete = Object.entries(round.target).every(([key, target]) => state.stationeryPictureMatchSelections[key] === target);
  if (state.stationeryPictureMatchComplete && state.tapAudioEnabled) speak(Object.values(round.target).join(""), 0.78);
  renderActivityPanel(currentTopic());
}

function nextStationeryPictureMatch() {
  resetStationeryPictureMatch((state.stationeryPictureMatchIndex + 1) % stationeryPictureMatchRounds.length);
  renderActivityPanel(currentTopic());
}

function prepareBackpackGameOptions() {
  const targetId = state.backpackGameRoundIds[state.backpackGameTargetIndex];
  const items = backpackGameItems();
  state.backpackGameOptionIds = shuffleArray([
    targetId,
    ...shuffleArray(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
  ]);
  state.backpackGameWrongIds = new Set();
}

function resetBackpackGame() {
  state.backpackGameRoundIds = shuffleArray(backpackGameItems().map((item) => item.id)).slice(0, 3);
  state.backpackGameTargetIndex = 0;
  state.backpackGamePlacedIds = [];
  state.backpackGameComplete = false;
  prepareBackpackGameOptions();
}

function ensureBackpackGame() {
  const items = backpackGameItems();
  const isValidRound =
    state.backpackGameRoundIds.length === 3 &&
    state.backpackGameRoundIds.every((id) => items.some((item) => item.id === id));
  if (!isValidRound) resetBackpackGame();
}

function currentBackpackGameTarget() {
  return backpackGameItems().find((item) => item.id === state.backpackGameRoundIds[state.backpackGameTargetIndex]);
}

function handleBackpackGameGuess(itemId) {
  if (state.backpackGameComplete) return;
  const target = currentBackpackGameTarget();
  if (!target) return;
  if (itemId !== target.id) {
    state.backpackGameWrongIds = new Set([...state.backpackGameWrongIds, itemId]);
    renderActivityPanel(currentTopic());
    return;
  }
  state.backpackGamePlacedIds = [...state.backpackGamePlacedIds, target.id];
  if (state.tapAudioEnabled) speak(target.audio, 0.78);
  state.backpackGameTargetIndex += 1;
  state.backpackGameComplete = state.backpackGameTargetIndex === state.backpackGameRoundIds.length;
  if (!state.backpackGameComplete) prepareBackpackGameOptions();
  renderActivityPanel(currentTopic());
}

function resetSchoolChallenge(options = {}) {
  const items = schoolPracticeItems();
  const candidates = items.filter((item) => item.id !== options.excludeId);
  const answers = candidates.length ? candidates : items;
  const answer = answers[Math.floor(Math.random() * answers.length)];
  if (!answer) return;
  const optionIds = currentTopic().id === "school-subjects"
    ? shuffleArray(items.map((item) => item.id))
    : shuffleArray([answer.id, ...shuffleArray(items.filter((item) => item.id !== answer.id)).slice(0, 3).map((item) => item.id)]);
  state.schoolChallengeAnswerId = answer.id;
  state.schoolChallengePromptId = answer.id;
  state.schoolChallengeOptionIds = optionIds;
  state.schoolChallengePickedId = "";
  state.schoolChallengeResult = "";
  state.schoolChallengeWrongIds = new Set();
  state.schoolListenFeedback = "";
}

function resetSchoolMatchGame() {
  const ids = schoolPracticeItems().slice(0, 6).map((item) => item.id);
  state.schoolSelectedPhraseId = null;
  state.schoolMatchedIds = new Set();
  state.schoolPhraseOrder = shuffleArray(ids);
  state.schoolMeaningOrder = shuffleArray(ids);
  state.schoolMatchFeedback = "";
}

function mealsConversationItems() {
  return schoolTopicData["meals-feelings"]?.conversationPairs ?? [];
}

function resetMealsConversationMatch() {
  const ids = mealsConversationItems().map((item) => item.id);
  state.schoolSelectedPhraseId = null;
  state.schoolMatchedIds = new Set();
  state.schoolPhraseOrder = shuffleArray(ids);
  state.schoolMeaningOrder = shuffleArray(ids);
  state.schoolMatchFeedback = "";
  state.mealsConversationMatchReady = true;
  state.mealsConversationWrongPhraseIds = new Set();
  state.mealsConversationWrongReplyIds = new Set();
}

function ensureMealsConversationMatch() {
  const ids = mealsConversationItems().map((item) => item.id);
  const currentIds = [...state.schoolPhraseOrder].sort();
  if (!state.mealsConversationMatchReady || currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
    resetMealsConversationMatch();
  }
}

function handleMealsConversationPhrase(itemId) {
  if (state.schoolMatchedIds.has(itemId)) return;
  state.schoolSelectedPhraseId = itemId;
  state.mealsConversationWrongPhraseIds = new Set();
  state.mealsConversationWrongReplyIds = new Set();
  const item = mealsConversationItems().find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleMealsConversationAttempt(itemId) {
  const selectedId = state.schoolSelectedPhraseId;
  if (!selectedId || state.schoolMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.schoolMatchedIds = new Set([...state.schoolMatchedIds, itemId]);
    state.schoolMatchFeedback = "Correct!";
    state.mealsConversationWrongPhraseIds = new Set();
    state.mealsConversationWrongReplyIds = new Set();
  } else {
    state.schoolMatchFeedback = "Try again.";
    state.mealsConversationWrongPhraseIds = new Set([selectedId]);
    state.mealsConversationWrongReplyIds = new Set([itemId]);
  }
  state.schoolSelectedPhraseId = null;
  renderActivityPanel(currentTopic());
}

function mealsPictureChoiceItems() {
  return schoolTopicData["meals-feelings"]?.pictureChoices ?? [];
}

function resetMealsPictureQuestion() {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt) return;
  state.mealsPictureQuizOptionIds = shuffleArray(prompt.options.map((option) => option.id));
  state.mealsPictureQuizSelectedId = "";
  state.mealsPictureQuizResult = "";
}

function ensureMealsPictureChoice() {
  const ids = mealsPictureChoiceItems().map((item) => item.id);
  const currentIds = [...state.mealsPictureQuizOrder].sort();
  if (currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
    state.mealsPictureQuizOrder = shuffleArray(ids);
    state.mealsPictureQuizIndex = 0;
    resetMealsPictureQuestion();
  }
}

function handleMealsPictureChoice(optionId) {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt || state.mealsPictureQuizResult === "correct") return;
  state.mealsPictureQuizSelectedId = optionId;
  state.mealsPictureQuizResult = optionId === prompt.correctId ? "correct" : "wrong";
  renderActivityPanel(currentTopic());
}

function nextMealsPictureChoice() {
  const items = mealsPictureChoiceItems();
  if (!items.length) return;
  state.mealsPictureQuizIndex = (state.mealsPictureQuizIndex + 1) % items.length;
  resetMealsPictureQuestion();
  renderActivityPanel(currentTopic());
}

function renderMealsPictureChoice() {
  const prompt = mealsPictureChoiceItems().find((item) => item.id === state.mealsPictureQuizOrder[state.mealsPictureQuizIndex]);
  if (!prompt) return "";
  return `
    <section class="clothes-quiz-shell meals-picture-choice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Look and Choose</p><p class="numbers-game-note">Look at the picture, then tap the Chinese sentence that matches it.</p></div></div>
      <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" /></figure>
      <div class="clothes-quiz-options sentence-choice-options">
        ${state.mealsPictureQuizOptionIds.map((optionId) => {
          const option = prompt.options.find((item) => item.id === optionId);
          if (!option) return "";
          const selected = state.mealsPictureQuizSelectedId === optionId;
          const resultClass = selected ? ` is-${state.mealsPictureQuizResult}` : "";
          const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${state.mealsPictureQuizResult === "correct" ? "✓" : "×"}</span>` : "";
          return `<button class="clothes-quiz-option${resultClass}" type="button" data-meals-picture-pick="${option.id}">${mark}<span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`;
        }).join("")}
      </div>
      ${state.mealsPictureQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-practice-advance-button" type="button" data-meals-picture-next>Next picture</button></div>' : ""}
    </section>
  `;
}

function foodPreferenceFillItems() {
  return [
    { id: "apple", hanzi: "苹果", pinyin: "píng guǒ", english: "apple" },
    { id: "ice-cream", hanzi: "冰淇淋", pinyin: "bīng qí lín", english: "ice cream" },
    { id: "pizza", hanzi: "披萨", pinyin: "pī sà", english: "pizza" },
    { id: "broccoli", hanzi: "西兰花", pinyin: "xī lán huā", english: "broccoli" },
    { id: "dumplings", hanzi: "饺子", pinyin: "jiǎo zi", english: "dumplings" },
    { id: "fried-rice", hanzi: "炒饭", pinyin: "chǎo fàn", english: "fried rice" },
    { id: "chow-mein", hanzi: "炒面", pinyin: "chǎo miàn", english: "chow mein" },
    { id: "hamburger", hanzi: "汉堡", pinyin: "hàn bǎo", english: "hamburger" },
    { id: "hot-dog", hanzi: "热狗", pinyin: "rè gǒu", english: "hot dog" },
    { id: "sandwich", hanzi: "三明治", pinyin: "sān míng zhì", english: "sandwich" }
  ];
}

function foodPreferenceSubjects() {
  return [
    { id: "我", hanzi: "我", pinyin: "wǒ", english: "I" },
    { id: "爸爸", hanzi: "爸爸", pinyin: "bà ba", english: "Dad" },
    { id: "妈妈", hanzi: "妈妈", pinyin: "mā ma", english: "Mom" },
    { id: "爷爷", hanzi: "爷爷", pinyin: "yé ye", english: "Grandpa" },
    { id: "奶奶", hanzi: "奶奶", pinyin: "nǎi nai", english: "Grandma" },
    { id: "姐姐", hanzi: "姐姐", pinyin: "jiě jie", english: "Older sister" },
    { id: "妹妹", hanzi: "妹妹", pinyin: "mèi mei", english: "Younger sister" },
    { id: "弟弟", hanzi: "弟弟", pinyin: "dì di", english: "Younger brother" },
    { id: "哥哥", hanzi: "哥哥", pinyin: "gē ge", english: "Older brother" }
  ];
}

function foodPreferencePatterns() {
  return [
    { id: "like", hanzi: "喜欢", pinyin: "xǐ huan", english: "likes to eat", firstPersonEnglish: "like to eat" },
    { id: "dislike", hanzi: "不喜欢", pinyin: "bù xǐ huan", english: "does not like to eat", firstPersonEnglish: "do not like to eat" },
    { id: "want", hanzi: "想", pinyin: "xiǎng", english: "wants to eat", firstPersonEnglish: "want to eat" },
    { id: "not-want", hanzi: "不想", pinyin: "bù xiǎng", english: "does not want to eat", firstPersonEnglish: "do not want to eat" },
    { id: "need", hanzi: "要", pinyin: "yào", english: "wants to eat", firstPersonEnglish: "want to eat" },
    { id: "not-need", hanzi: "不要", pinyin: "bú yào", english: "does not want to eat", firstPersonEnglish: "do not want to eat" }
  ];
}

function selectedFoodPreferencePattern() {
  return foodPreferencePatterns().find((item) => item.id === state.foodPreferencePatternId) ?? foodPreferencePatterns()[0];
}

function handleFoodPreferenceSubject(subjectId) {
  state.foodPreferenceSubjectId = subjectId;
  renderActivityPanel(currentTopic());
}

function handleFoodPreferencePattern(patternId) {
  state.foodPreferencePatternId = patternId;
  state.foodPreferenceFoodId = "";
  renderActivityPanel(currentTopic());
}

function handleFoodPreferenceFill(foodId) {
  const item = foodPreferenceFillItems().find((entry) => entry.id === foodId);
  if (!item) return;
  const pattern = selectedFoodPreferencePattern();
  const subject = foodPreferenceSubjects().find((entry) => entry.id === state.foodPreferenceSubjectId) ?? foodPreferenceSubjects()[0];
  const sentence = `${subject.hanzi}${pattern.hanzi}吃${item.hanzi}`;
  state.foodPreferenceFoodId = foodId;
  if (state.tapAudioEnabled) speak(sentence, 0.78);
  renderActivityPanel(currentTopic());
}

function renderFoodPreferenceFillPractice() {
  const items = foodPreferenceFillItems();
  const pattern = selectedFoodPreferencePattern();
  const subjects = foodPreferenceSubjects();
  const subject = subjects.find((item) => item.id === state.foodPreferenceSubjectId) ?? subjects[0];
  const selectedFood = items.find((item) => item.id === state.foodPreferenceFoodId);
  const sentenceHanzi = `${subject.hanzi}${pattern.hanzi}吃${selectedFood?.hanzi ?? "____"}。`;
  const sentencePinyin = `${subject.pinyin} ${pattern.pinyin} chī${selectedFood?.pinyin ? ` ${selectedFood.pinyin}` : ""}.`;
  const sentenceEnglish = `${subject.english} ${subject.id === "我" ? pattern.firstPersonEnglish : pattern.english}${selectedFood?.english ? ` ${selectedFood.english}` : ""}.`;
  return `
    <section class="clothes-quiz-shell food-preference-fill-practice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Make your sentence</p><p class="numbers-game-note">Choose one card in each column. There is no right or wrong answer.</p></div></div>
      <div class="food-preference-builder-columns">
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Subject</p><div class="food-preference-builder-list">${subjects.map((item) => `<button class="food-preference-subject-choice${subject.id === item.id ? " is-active" : ""}" type="button" data-food-preference-subject="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Word</p><div class="food-preference-builder-list">${foodPreferencePatterns().map((item) => `<button class="food-preference-pattern-choice${pattern.id === item.id ? " is-active" : ""}" type="button" data-food-preference-pattern="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Food</p><div class="food-preference-builder-list">${items.map((item) => `<button class="food-preference-fill-choice${selectedFood?.id === item.id ? " is-active" : ""}" type="button" data-food-preference-food="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
      </div>
      <div class="food-preference-built-sentence"><span class="numbers-game-hanzi">${sentenceHanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${sentencePinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${sentenceEnglish}</span>` : ""}</div>
    </section>
  `;
}

function classroomSentenceFrames() {
  return schoolTopicData.classroom?.sentenceFrames ?? [];
}

function classroomSentenceWords() {
  return [
    ...(schoolTopicData.classroom?.words ?? []).map((item) => item.id === "computer" ? { ...item, sentenceEnglish: "laptop" } : item),
    { id: "textbook", hanzi: "课本", pinyin: "kè běn", english: "textbook", imagePath: "assets/illustrated-stationery/textbook.webp" },
    { id: "workbook", hanzi: "练习本", pinyin: "liàn xí běn", english: "workbook", imagePath: "assets/illustrated-stationery/workbook.webp" },
    { id: "pencil", hanzi: "铅笔", pinyin: "qiān bǐ", english: "pencil", imagePath: "assets/illustrated-stationery/pencil.webp" },
    { id: "ruler", hanzi: "尺子", pinyin: "chǐ zi", english: "ruler", imagePath: "assets/illustrated-stationery/ruler.webp" },
    { id: "eraser", hanzi: "橡皮", pinyin: "xiàng pí", english: "eraser", imagePath: "assets/illustrated-stationery/eraser.webp" },
    { id: "colored-pencils", hanzi: "彩色铅笔", pinyin: "cǎi sè qiān bǐ", english: "colored pencils", imagePath: "assets/illustrated-stationery/colored-pencils.webp" }
  ];
}

function selectedClassroomSentenceFrame() {
  return classroomSentenceFrames().find((frame) => frame.id === state.classroomSentenceFrameId) ?? classroomSentenceFrames()[0];
}

function classroomSentenceEnglish(frame, word) {
  if (!word) return "";
  const noun = word.sentenceEnglish ?? word.english;
  if (frame.id === "many-in-classroom") {
    return `There are many ${noun.endsWith("s") ? noun : `${noun}s`} in the classroom.`;
  }
  if (word.id === "colored-pencils") {
    return `There are colored pencils${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
  }
  const article = /^[aeiou]/i.test(noun) ? "an" : "a";
  return `There is ${article} ${noun}${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
}

function handleClassroomSentenceFrame(frameId) {
  const frame = classroomSentenceFrames().find((item) => item.id === frameId);
  if (!frame) return;
  state.classroomSentenceFrameId = frameId;
  if (!frame.wordIds.includes(state.classroomSentenceWordId)) {
    state.classroomSentenceWordId = "";
  }
  renderActivityPanel(currentTopic());
}

function handleClassroomSentenceWord(wordId) {
  const frame = selectedClassroomSentenceFrame();
  const word = classroomSentenceWords().find((item) => item.id === wordId);
  if (!frame || !word || !frame.wordIds.includes(wordId)) return;
  state.classroomSentenceWordId = wordId;
  if (state.tapAudioEnabled) speak(`${frame.hanzi}${word.hanzi}`, 0.78);
  renderActivityPanel(currentTopic());
}

function renderClassroomPractice(topic) {
  const frames = classroomSentenceFrames();
  const frame = selectedClassroomSentenceFrame();
  const words = classroomSentenceWords().filter((item) => frame.wordIds.includes(item.id));
  const selectedWord = words.find((item) => item.id === state.classroomSentenceWordId);
  const hanzi = `${frame.hanzi}${selectedWord?.hanzi ?? "____"}。`;
  const pinyin = `${frame.pinyin}${selectedWord?.pinyin ? ` ${selectedWord.pinyin}` : ""}.`;
  const english = classroomSentenceEnglish(frame, selectedWord);
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData.classroom.practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Make a sentence</p><p class="numbers-game-note">Choose a sentence start and an object. Every choice can make a good sentence.</p></div></div>
        <div class="intro-build-choices">${frames.map((item) => `<button class="intro-build-chip${frame.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-frame="${item.id}">${item.hanzi}</button>`).join("")}</div>
        <div class="transport-build-target classroom-sentence-output"><span class="numbers-game-hanzi">${hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${pinyin}</span>` : ""}${state.showEnglish && english ? `<span class="numbers-game-english">${english}</span>` : ""}</div>
        <div class="intro-build-choices classroom-sentence-object-choices">${words.map((item) => `<button class="intro-build-chip classroom-sentence-object-chip${selectedWord?.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-word="${item.id}"><img class="classroom-sentence-object-icon" src="${item.imagePath}" alt="" aria-hidden="true"><span>${item.hanzi}</span></button>`).join("")}</div>
      </section>
    </section>
  `;
  activityList.querySelectorAll("[data-classroom-sentence-frame]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceFrame(button.dataset.classroomSentenceFrame)));
  activityList.querySelectorAll("[data-classroom-sentence-word]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceWord(button.dataset.classroomSentenceWord)));
}

function ensureSchoolPractice(topicId = currentTopic().id) {
  const items = schoolPracticeItems(topicId);
  const expectedOptionCount = topicId === "school-subjects" ? items.length : Math.min(4, items.length);
  if (state.schoolPracticeTopicId !== topicId || state.schoolChallengeOptionIds.length !== expectedOptionCount) {
    state.schoolPracticeTopicId = topicId;
    resetSchoolChallenge();
    resetSchoolMatchGame();
  }
}

function handleSchoolChallengePlay() {
  ensureSchoolPractice();
  resetSchoolChallenge({ excludeId: state.schoolChallengePromptId });
  const item = schoolPracticeItems().find((entry) => entry.id === state.schoolChallengePromptId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleSchoolChallengeGuess(itemId) {
  ensureSchoolPractice();
  const correct = itemId === state.schoolChallengeAnswerId;
  state.schoolChallengePickedId = itemId;
  state.schoolChallengeResult = correct ? "correct" : "wrong";
  if (correct) {
    state.schoolListenFeedback = "Correct!";
    const item = schoolPracticeItems().find((entry) => entry.id === itemId);
    if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  } else {
    state.schoolChallengeWrongIds = new Set([...state.schoolChallengeWrongIds, itemId]);
    state.schoolListenFeedback = "Try again.";
  }
  renderActivityPanel(currentTopic());
}

function handleSchoolMatchPhrase(itemId) {
  if (state.schoolMatchedIds.has(itemId)) return;
  state.schoolSelectedPhraseId = itemId;
  const item = schoolPracticeItems().find((entry) => entry.id === itemId);
  if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
  renderActivityPanel(currentTopic());
}

function handleSchoolMatchAttempt(itemId) {
  const selectedId = state.schoolSelectedPhraseId;
  if (!selectedId || state.schoolMatchedIds.has(itemId)) return;
  if (selectedId === itemId) {
    state.schoolMatchedIds = new Set([...state.schoolMatchedIds, itemId]);
    state.schoolMatchFeedback = "Correct!";
  } else {
    state.schoolMatchFeedback = "Try again.";
  }
  state.schoolSelectedPhraseId = null;
  renderActivityPanel(currentTopic());
}

function currentSchoolBuildItem() {
  const items = schoolSentenceBuilds[currentTopic().id] ?? [];
  return items.find((item) => item.id === state.schoolBuildOrder[state.schoolBuildIndex]) ?? items[0];
}

function prepareSchoolBuilder() {
  const item = currentSchoolBuildItem();
  state.schoolBuildSelectedTokens = [];
  state.schoolBuildResult = "";
  state.schoolBuildAvailableTokens = shuffleArray([...(item?.target ?? []), ...(item?.distractors ?? [])]);
}

function ensureSchoolBuilder(topicId = currentTopic().id) {
  const items = schoolSentenceBuilds[topicId] ?? [];
  const hasCurrentItems =
    state.schoolBuildOrder.length === items.length &&
    state.schoolBuildOrder.every((id) => items.some((item) => item.id === id));
  if (state.schoolBuildTopicId !== topicId || !hasCurrentItems) {
    state.schoolBuildTopicId = topicId;
    state.schoolBuildOrder = shuffleArray(items.map((item) => item.id));
    state.schoolBuildIndex = 0;
    prepareSchoolBuilder();
  }
}

function handleSchoolBuildToken(index) {
  if (state.schoolBuildResult === "correct") return;
  const item = currentSchoolBuildItem();
  const token = state.schoolBuildAvailableTokens[index];
  if (!item || !token) return;
  const selected = [...state.schoolBuildSelectedTokens, token];
  const isPrefix = selected.every((entry, tokenIndex) => entry === item.target[tokenIndex]);
  if (!isPrefix) {
    state.schoolBuildResult = "wrong";
    prepareSchoolBuilder();
    state.schoolBuildResult = "wrong";
    renderActivityPanel(currentTopic());
    return;
  }
  state.schoolBuildSelectedTokens = selected;
  state.schoolBuildAvailableTokens = state.schoolBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
  if (selected.length === item.target.length) {
    state.schoolBuildResult = "correct";
    if (state.tapAudioEnabled) speak(item.audio ?? selected.join(""), 0.78);
  }
  renderActivityPanel(currentTopic());
}

function clearSchoolBuilder() {
  prepareSchoolBuilder();
  renderActivityPanel(currentTopic());
}

function nextSchoolBuilder() {
  state.schoolBuildIndex = (state.schoolBuildIndex + 1) % state.schoolBuildOrder.length;
  prepareSchoolBuilder();
  renderActivityPanel(currentTopic());
}

const foodCategoryGroups = {
  fruit: {
    hanzi: "水果",
    english: "Fruit",
    items: [
      { id: "apple", hanzi: "苹果", pinyin: "píng guǒ", english: "apple" },
      { id: "banana", hanzi: "香蕉", pinyin: "xiāng jiāo", english: "banana" },
      { id: "grapes", hanzi: "葡萄", pinyin: "pú tao", english: "grapes" },
      { id: "strawberry", hanzi: "草莓", pinyin: "cǎo méi", english: "strawberry" },
      { id: "orange", hanzi: "橙子", pinyin: "chéng zi", english: "orange" },
      { id: "pear", hanzi: "梨", pinyin: "lí", english: "pear" },
      { id: "watermelon", hanzi: "西瓜", pinyin: "xī guā", english: "watermelon" },
      { id: "peach", hanzi: "桃子", pinyin: "táo zi", english: "peach" },
      { id: "cherries", hanzi: "樱桃", pinyin: "yīng táo", english: "cherries" }
    ]
  },
  vegetable: {
    hanzi: "蔬菜",
    english: "Vegetables",
    items: [
      { id: "carrot", hanzi: "胡萝卜", pinyin: "hú luó bo", english: "carrot" },
      { id: "cucumber", hanzi: "黄瓜", pinyin: "huáng guā", english: "cucumber" },
      { id: "tomato", hanzi: "西红柿", pinyin: "xī hóng shì", english: "tomato" },
      { id: "broccoli", hanzi: "西兰花", pinyin: "xī lán huā", english: "broccoli" },
      { id: "potatoes", hanzi: "土豆", pinyin: "tǔ dòu", english: "potatoes" }
    ]
  },
  snack: {
    hanzi: "零食",
    english: "Snacks",
    items: [
      { id: "candies", hanzi: "糖果", pinyin: "táng guǒ", english: "candies" },
      { id: "chocolate", hanzi: "巧克力", pinyin: "qiǎo kè lì", english: "chocolate" },
      { id: "ice-cream", hanzi: "冰淇淋", pinyin: "bīng qí lín", english: "ice cream" },
      { id: "cake", hanzi: "蛋糕", pinyin: "dàn gāo", english: "cake" }
    ]
  },
  meal: {
    hanzi: "主食",
    english: "Meal",
    items: [
      { id: "pizza", hanzi: "披萨", pinyin: "pī sà", english: "pizza" },
      { id: "chow-mein", hanzi: "炒面", pinyin: "chǎo miàn", english: "chow mein" },
      { id: "fried-rice", hanzi: "炒饭", pinyin: "chǎo fàn", english: "fried rice" },
      { id: "french-fries", hanzi: "薯条", pinyin: "shǔ tiáo", english: "French fries" },
      { id: "hamburger", hanzi: "汉堡", pinyin: "hàn bǎo", english: "hamburger" },
      { id: "hot-dog", hanzi: "热狗", pinyin: "rè gǒu", english: "hot dog" }
    ]
  },
  drink: {
    hanzi: "饮料",
    english: "Drinks",
    items: [
      { id: "milk", hanzi: "牛奶", pinyin: "niú nǎi", english: "milk" },
      { id: "juice", hanzi: "果汁", pinyin: "guǒ zhī", english: "juice" },
      { id: "cola", hanzi: "可乐", pinyin: "kě lè", english: "Coke" }
    ]
  }
};

function foodBookWordItems(data) {
  const itemIds = new Set(foodCategoryGroups[state.foodBookCategoryId]?.items.map((item) => item.id) ?? []);
  return data.words.filter((item) => itemIds.has(item.id));
}

function foodCategoryIconPath(itemId) {
  return `assets/illustrated-food/${itemId}.webp`;
}

const foodHungerModes = {
  mix: { hanzi: "混合", english: "Mix" },
  ...Object.fromEntries(Object.entries(foodCategoryGroups).map(([id, group]) => [id, { hanzi: group.hanzi, english: group.english }]))
};

function foodHungerItems(modeId = state.foodHungerModeId) {
  if (modeId === "mix") return Object.values(foodCategoryGroups).flatMap((group) => group.items);
  return foodCategoryGroups[modeId]?.items ?? [];
}

function prepareFoodHungerOptions() {
  const targetId = state.foodHungerRoundIds[state.foodHungerTargetIndex];
  const items = foodHungerItems();
  state.foodHungerOptionIds = shuffleArray([
    targetId,
    ...shuffleArray(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
  ]);
  state.foodHungerWrongIds = new Set();
}

function resetFoodHungerGame(modeId = state.foodHungerModeId) {
  state.foodHungerModeId = modeId;
  state.foodHungerRoundIds = shuffleArray(foodHungerItems(modeId).map((item) => item.id)).slice(0, 3);
  state.foodHungerTargetIndex = 0;
  state.foodHungerPlatedIds = [];
  state.foodHungerComplete = false;
  prepareFoodHungerOptions();
}

function ensureFoodHungerGame() {
  const items = foodHungerItems();
  const expectedCount = Math.min(3, items.length);
  const hasCurrentRound =
    state.foodHungerRoundIds.length === expectedCount &&
    state.foodHungerRoundIds.every((id) => items.some((item) => item.id === id));
  if (!hasCurrentRound) resetFoodHungerGame();
}

function currentFoodHungerTarget() {
  return foodHungerItems().find((item) => item.id === state.foodHungerRoundIds[state.foodHungerTargetIndex]);
}

function handleFoodHungerGuess(itemId) {
  if (state.foodHungerComplete) return;
  const target = currentFoodHungerTarget();
  if (!target) return;
  if (itemId !== target.id) {
    state.foodHungerWrongIds = new Set([...state.foodHungerWrongIds, itemId]);
    renderActivityPanel(currentTopic());
    return;
  }
  state.foodHungerPlatedIds = [...state.foodHungerPlatedIds, target.id];
  if (state.tapAudioEnabled) speak(target.hanzi, 0.78);
  state.foodHungerTargetIndex += 1;
  state.foodHungerComplete = state.foodHungerTargetIndex === state.foodHungerRoundIds.length;
  if (!state.foodHungerComplete) prepareFoodHungerOptions();
  renderActivityPanel(currentTopic());
}

function renderFoodHungerGame() {
  ensureFoodHungerGame();
  const items = foodHungerItems();
  const target = currentFoodHungerTarget();
  const platedItems = state.foodHungerPlatedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const optionItems = state.foodHungerOptionIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const isComplete = state.foodHungerComplete;
  return `
    <section class="practice-split-card food-hunger-game-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Hungry? What should we eat?</p><p class="numbers-game-note">Choose a food group or Mix. A food picture will appear. Tap the matching Chinese word to put it in your cart.</p></div></div>
      <div class="food-category-tabs food-hunger-tabs">${Object.entries(foodHungerModes).map(([id, mode]) => `<button class="food-category-tab${state.foodHungerModeId === id ? " is-active" : ""}" type="button" data-food-hunger-mode="${id}">${mode.hanzi}${state.showEnglish ? `<small>${mode.english}</small>` : ""}</button>`).join("")}</div>
      <div class="backpack-game-progress" aria-label="${state.foodHungerPlatedIds.length} of ${state.foodHungerRoundIds.length} foods in the cart">${state.foodHungerRoundIds.map((_, index) => `<span class="backpack-game-progress-dot${index < state.foodHungerPlatedIds.length ? " is-packed" : ""}">${index < state.foodHungerPlatedIds.length ? "✓" : ""}</span>`).join("")}</div>
      <div class="food-hunger-visual${isComplete ? " is-complete" : ""}">
        ${!isComplete && target ? `<div class="food-hunger-target"><img src="${foodCategoryIconPath(target.id)}" alt="${target.english}"></div>` : ""}
        <div class="food-hunger-cart"><img class="food-hunger-cart-image" src="assets/illustrated-food/game-shopping-cart.webp" alt="empty shopping cart">${platedItems.map((item, index) => `<img class="food-hunger-plated-item is-item-${index}" src="${foodCategoryIconPath(item.id)}" alt="">`).join("")}${isComplete ? '<span class="food-hunger-complete-mark" aria-label="All foods are in the cart">✓</span>' : ""}</div>
      </div>
      ${isComplete ? '<p class="backpack-game-complete-message">Your cart is ready!</p>' : `<div class="numbers-game-options backpack-game-options food-hunger-options">${optionItems.map((item) => { const isWrong = state.foodHungerWrongIds.has(item.id); return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-food-hunger-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`; }).join("")}</div>`}
    </section>
  `;
}

function renderFoodPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "";
  activityPanelSummary.hidden = true;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderFoodHungerGame()}
        <section class="practice-split-card">
          <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
          <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
          <div class="transport-build-hint">${state.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
          <div class="transport-build-target is-${state.schoolBuildResult}">${state.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.schoolBuildResult === "correct" ? "✓" : "×"}</span>` : ""}${state.schoolBuildSelectedTokens.length ? state.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
          <div class="intro-build-choices">${state.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
          <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state.schoolBuildResult === "correct" ? '<button class="small-button is-practice-advance-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
        </section>
      </div>
    </section>
  `;
  activityList.querySelectorAll("[data-food-hunger-mode]").forEach((button) => button.addEventListener("click", () => {
    resetFoodHungerGame(button.dataset.foodHungerMode);
    renderActivityPanel(topic);
  }));
  activityList.querySelectorAll("[data-food-hunger-guess]").forEach((button) => button.addEventListener("click", () => handleFoodHungerGuess(button.dataset.foodHungerGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolSentenceBuilder(item) {
  return `
    <section class="practice-split-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
      <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
      <div class="transport-build-hint">${state.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
      <div class="transport-build-target is-${state.schoolBuildResult}">${state.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.schoolBuildResult === "correct" ? "✓" : "×"}</span>` : ""}${state.schoolBuildSelectedTokens.length ? state.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
      <div class="intro-build-choices">${state.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
      <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state.schoolBuildResult === "correct" ? '<button class="small-button is-practice-advance-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
    </section>
  `;
}

function renderBackpackGame() {
  ensureBackpackGame();
  const items = backpackGameItems();
  const target = currentBackpackGameTarget();
  const placedItems = state.backpackGamePlacedIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);
  const optionItems = state.backpackGameOptionIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);
  const isComplete = state.backpackGameComplete;
  return `
    <section class="practice-split-card backpack-game-card">
      <div class="numbers-game-top">
        <div><p class="body-match-kicker">Pack the backpack</p><p class="numbers-game-note">Look at the school thing, then tap its Chinese word.</p></div>
        <button class="small-button is-play-button" type="button" data-backpack-game-new>Play</button>
      </div>
      <div class="backpack-game-progress" aria-label="${state.backpackGamePlacedIds.length} of 3 items packed">
        ${[0, 1, 2].map((index) => `<span class="backpack-game-progress-dot${index < state.backpackGamePlacedIds.length ? " is-packed" : ""}">${index < state.backpackGamePlacedIds.length ? "✓" : ""}</span>`).join("")}
      </div>
      <div class="backpack-game-visual${isComplete ? " is-complete" : ""}">
        <img class="backpack-game-bag" src="assets/illustrated-stationery/${isComplete ? "backpack.webp" : "open-backpack.webp"}" alt="${isComplete ? "closed backpack" : "open backpack"}">
        ${!isComplete && target ? `<div class="backpack-game-target"><img src="${target.imagePath}" alt="${target.english}"></div>` : ""}
        ${!isComplete ? `<div class="backpack-game-packed-items">${placedItems.map((item, index) => `<img class="backpack-game-packed-item is-item-${index}" src="${item.imagePath}" alt="">`).join("")}</div>` : '<span class="backpack-game-complete-mark" aria-label="All packed">✓</span>'}
      </div>
      ${isComplete
        ? '<p class="backpack-game-complete-message">All packed!</p>'
        : `<div class="numbers-game-options backpack-game-options">${optionItems.map((item) => {
            const isWrong = state.backpackGameWrongIds.has(item.id);
            return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-backpack-game-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
          }).join("")}</div>`}
    </section>
  `;
}

function renderStationeryPictureMatch() {
  ensureStationeryPictureMatch();
  const round = currentStationeryPictureMatchRound();
  const columnLabels = { measure: "数量 + 量词", color: "颜色", item: "文具" };
  const selected = state.stationeryPictureMatchSelections;
  const isComplete = state.stationeryPictureMatchComplete;
  return `
    <section class="practice-split-card stationery-picture-match-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Match the picture</p><p class="numbers-game-note">Look at the picture. Choose the quantity, color, and school thing.</p></div></div>
      <figure class="stationery-picture-match-visual"><img src="${round.imagePath}" alt="${round.alt}"></figure>
      <div class="stationery-picture-match-columns">
        ${Object.entries(stationeryPictureMatchChoices).map(([column, choices]) => `
          <div class="stationery-picture-match-column">
            <p class="stationery-picture-match-label">${columnLabels[column]}</p>
            ${state.stationeryPictureMatchChoiceOrders[column].map((choice) => {
              const isCorrect = selected[column] === choice;
              const isWrong = state.stationeryPictureMatchWrong[column].has(choice);
              return `<button class="stationery-picture-match-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-stationery-picture-match-pick="${column}" data-stationery-picture-match-value="${choice}"${isCorrect || isComplete ? " disabled" : ""}><span class="stationery-picture-match-word">${choice}</span>${state.showEnglish ? `<span class="stationery-picture-match-english">${stationeryPictureMatchEnglish[choice]}</span>` : ""}${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}</button>`;
            }).join("")}
          </div>
        `).join("")}
      </div>
      ${isComplete ? `<div class="stationery-picture-match-result is-correct"><span class="answer-result-mark" aria-hidden="true">✓</span><div><strong>${Object.values(round.target).join("")}。</strong>${state.showPinyin ? `<span>${round.pinyin}</span>` : ""}${state.showEnglish ? `<span>${round.english}</span>` : ""}</div><button class="small-button is-practice-advance-button" type="button" data-stationery-picture-match-next>Next picture</button></div>` : ""}
    </section>
  `;
}

function renderStationeryPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "Match the words to the picture, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderStationeryPictureMatch()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelectorAll("[data-stationery-picture-match-pick]").forEach((button) => button.addEventListener("click", () => handleStationeryPictureMatchPick(button.dataset.stationeryPictureMatchPick, button.dataset.stationeryPictureMatchValue)));
  activityList.querySelector("[data-stationery-picture-match-next]")?.addEventListener("click", nextStationeryPictureMatch);
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolSuppliesPractice(topic) {
  ensureSchoolBuilder(topic.id);
  const item = currentSchoolBuildItem();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "Pack three school things, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderBackpackGame()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelector("[data-backpack-game-new]")?.addEventListener("click", () => {
    resetBackpackGame();
    renderActivityPanel(topic);
  });
  activityList.querySelectorAll("[data-backpack-game-guess]").forEach((button) => button.addEventListener("click", () => handleBackpackGameGuess(button.dataset.backpackGameGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderSchoolPractice(topic) {
  if (topic.id === "food") {
    renderFoodPractice(topic);
    return;
  }
  if (topic.id === "food-preferences") {
    renderFoodPreferencesPractice(topic);
    return;
  }
  if (topic.id === "meals-feelings") {
    renderMealsConversationPractice(topic);
    return;
  }
  if (topic.id === "classroom") {
    renderClassroomPractice(topic);
    return;
  }
  if (topic.id === "stationery") {
    renderStationeryPractice(topic);
    return;
  }
  if (topic.id === "school-supplies") {
    renderSchoolSuppliesPractice(topic);
    return;
  }
  ensureSchoolPractice(topic.id);
  ensureSchoolBuilder(topic.id);
  const topicData = schoolTopicData[topic.id];
  const item = currentSchoolBuildItem();
  const listen = {
    items: () => schoolPracticeItems(topic.id),
    optionIds: () => state.schoolChallengeOptionIds,
    pickedId: () => state.schoolChallengePickedId,
    result: () => state.schoolChallengeResult,
    wrongIds: () => state.schoolChallengeWrongIds,
    feedback: () => state.schoolListenFeedback
  };
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = topicData?.practiceSummary ?? "Listen for a school word, then build a sentence from the picture.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderListenPractice(listen)}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
  activityList.querySelector("[data-template-listen-play]")?.addEventListener("click", handleSchoolChallengePlay);
  activityList.querySelectorAll("[data-template-listen-guess]").forEach((button) => button.addEventListener("click", () => handleSchoolChallengeGuess(button.dataset.templateListenGuess)));
  activityList.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
  activityList.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
  activityList.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
}

function renderMealsConversationPractice(topic) {
  ensureMealsConversationMatch();
  ensureMealsPictureChoice();
  const items = mealsConversationItems();
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData[topic.id].practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderMatchPractice({
        phraseHeading: "First line",
        meaningHeading: "Reply",
        items: () => items,
        phraseIds: () => state.schoolPhraseOrder,
        meaningIds: () => state.schoolMeaningOrder,
        matchedIds: () => state.schoolMatchedIds,
        selectedId: () => state.schoolSelectedPhraseId,
        feedback: () => state.schoolMatchFeedback,
        wrongPhraseIds: () => state.mealsConversationWrongPhraseIds,
        wrongMeaningIds: () => state.mealsConversationWrongReplyIds,
        meaningContent: (id) => {
          const item = items.find((entry) => entry.id === id);
          if (!item) return "";
          return `<span class="numbers-game-hanzi">${item.reply}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.replyPinyin}</span>` : ""}`;
        }
      })}
      ${renderMealsPictureChoice()}
    </section>
  `;
  activityList.querySelector("[data-template-match-new]")?.addEventListener("click", () => {
    resetMealsConversationMatch();
    renderActivityPanel(topic);
  });
  activityList.querySelector("[data-template-match-play-again]")?.addEventListener("click", () => {
    resetMealsConversationMatch();
    renderActivityPanel(topic);
  });
  activityList.querySelectorAll("[data-template-match-phrase]").forEach((button) => button.addEventListener("click", () => handleMealsConversationPhrase(button.dataset.templateMatchPhrase)));
  activityList.querySelectorAll("[data-template-match-meaning]").forEach((button) => button.addEventListener("click", () => handleMealsConversationAttempt(button.dataset.templateMatchMeaning)));
  activityList.querySelectorAll("[data-meals-picture-pick]").forEach((button) => button.addEventListener("click", () => handleMealsPictureChoice(button.dataset.mealsPicturePick)));
  activityList.querySelector("[data-meals-picture-next]")?.addEventListener("click", nextMealsPictureChoice);
}

function renderFoodPreferencesPractice(topic) {
  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = schoolTopicData[topic.id].practiceSummary;
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderFoodPreferenceFillPractice()}
    </section>
  `;
  activityList.querySelectorAll("[data-food-preference-subject]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceSubject(button.dataset.foodPreferenceSubject)));
  activityList.querySelectorAll("[data-food-preference-pattern]").forEach((button) => button.addEventListener("click", () => handleFoodPreferencePattern(button.dataset.foodPreferencePattern)));
  activityList.querySelectorAll("[data-food-preference-food]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceFill(button.dataset.foodPreferenceFood)));
}

 function schoolWordGroups(topicId = currentTopic().id) {
  const data = schoolTopicData[topicId];
  if (!data?.wordGroups) return [];
  return data.wordGroups.map((group) => ({
    ...group,
    items: group.items.map(([id, hanzi, pinyin, english, file]) => ({
      id,
      hanzi,
      pinyin,
      english,
      audio: hanzi,
      imagePath: file ? (file.startsWith("assets/") ? file : `assets/illustrated-food/${file}`) : ""
    }))
  }));
}



function renderSchoolExplorer(topicId) {
  const topic = currentTopic();
  const data = schoolTopicData[topicId];
  if (!data) {
    renderDefaultExplorer();
    return;
  }
  const sceneGroups = data.sceneGroups ?? [{ id: "all", items: data.scenes ?? [] }];
  const wordGroups = schoolWordGroups(topicId);
  if (topicId === "meals-feelings" && !wordGroups.some((group) => group.id === state.mealsWordGroupId)) {
    state.mealsWordGroupId = wordGroups[0]?.id ?? "";
  }
  const visibleWords = topicId === "food"
    ? foodBookWordItems(data)
    : topicId === "meals-feelings"
      ? wordGroups.find((group) => group.id === state.mealsWordGroupId)?.items ?? []
      : data.words;

  focusExplorer.innerHTML = `
    <div class="time-date-board school-topic-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      ${sceneGroups.map((group) => `
        <section class="school-lesson-section is-${group.id}">
          ${group.label ? `<p class="body-match-kicker school-lesson-heading">${group.label}</p>` : ""}
          <div class="school-scene-grid${group.items.length === 1 ? " is-single" : ""}">
            ${group.items.map((scene) => `
              <section class="greetings-exchange school-scene-card">
                <div class="greetings-exchange-top">${scene.label ? `<div><p class="body-match-kicker">${scene.label}</p></div>` : "<span></span>"}<button class="small-button is-play-button" type="button" data-school-play-scene="${scene.id}">Play</button></div>
                <div class="school-scene-layout${topicId === "food" ? " is-compact" : ""}">
                  <img class="school-scene-image" src="${scene.imagePath}" alt="${scene.english ?? scene.lines?.[0]?.english ?? ""}" />
                  <div class="greetings-line-stack${scene.compactLines ? " is-compact" : ""}">
                    ${(scene.lines ?? [scene]).map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `).join("")}
          </div>
        </section>
      `).join("")}
      ${data.showWords !== false ? `
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        ${topicId === "food" ? `<div class="food-book-tabs" role="tablist" aria-label="Food word categories">${Object.entries(foodCategoryGroups).map(([id, group]) => `<button class="food-book-tab${state.foodBookCategoryId === id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.foodBookCategoryId === id}" data-food-book-category="${id}">${group.hanzi}${state.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        ${topicId === "meals-feelings" && wordGroups.length > 1 ? `<div class="food-book-tabs lesson-word-tabs" role="tablist" aria-label="Meals and feelings word categories">${wordGroups.map((group) => `<button class="food-book-tab${state.mealsWordGroupId === group.id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.mealsWordGroupId === group.id}" data-meals-word-group="${group.id}">${group.hanzi}${state.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        <div class="school-word-grid${topicId === "school-subjects" ? " is-text-only" : ""}${topicId === "meals-feelings" ? " is-uniform-images" : ""}">
          ${visibleWords.map((item) => `
            <button class="school-word-card${item.imagePath ? " book-word-card" : ""}" type="button" data-school-word="${item.id}">
              ${item.imagePath ? `<img class="school-word-image book-word-image" src="${item.imagePath}" alt="${item.english}" />` : ""}
              <span class="${item.imagePath ? "book-word-copy" : ""}"><span class="time-asset-hanzi">${item.hanzi}</span>
              ${state.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
              ${state.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${data.review ? `<section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid">${data.review.map((item) => `<article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${item.pattern}</p>${state.showPinyin ? `<p class="visual-topic-note-pinyin">${item.pinyin}</p>` : ""}${state.showEnglish ? `<p class="visual-topic-note-english">${item.english}</p>` : ""}<p class="visual-topic-note-example">${item.example}</p>${state.showPinyin && item.examplePinyin ? `<p class="visual-topic-note-pinyin">${item.examplePinyin}</p>` : ""}${state.showEnglish && item.exampleEnglish ? `<p class="visual-topic-note-english">${item.exampleEnglish}</p>` : ""}</article>`).join("")}</div></section>` : ""}
      ${topicId === "school-subjects" ? `<section class="visual-topic-notes"><p class="body-match-kicker">Useful note</p><div class="visual-topic-note-grid school-subject-note"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">去</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">qù</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to go</p>' : ""}<p class="visual-topic-note-example">我去上音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">在</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">zài</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">at / in; marks an action happening now</p>' : ""}<p class="visual-topic-note-example">我在上音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">喜欢</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">xǐ huan</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to like</p>' : ""}<p class="visual-topic-note-example">我喜欢音乐课。</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">不喜欢</p>${state.showPinyin ? '<p class="visual-topic-note-pinyin">bù xǐ huan</p>' : ""}${state.showEnglish ? '<p class="visual-topic-note-english">to not like</p>' : ""}<p class="visual-topic-note-example">我不喜欢数学课。</p></article></div></section>` : ""}
    </div>
  `;

  focusExplorer.querySelectorAll("[data-school-play-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = sceneGroups.flatMap((group) => group.items).find((entry) => entry.id === button.dataset.schoolPlayScene);
      if (!scene || !state.tapAudioEnabled) return;
      if (scene.lines?.length) {
        speakSceneLines(scene.lines.map((line) => ({ ...line, audio: line.audio ?? line.hanzi })));
        return;
      }
      speak(scene.audio, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-school-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = visibleWords.find((entry) => entry.id === button.dataset.schoolWord);
      if (item && state.tapAudioEnabled) speak(item.audio, 0.78);
    });
  });
  focusExplorer.querySelectorAll("[data-food-book-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.foodBookCategoryId = button.dataset.foodBookCategory;
      renderSchoolExplorer(topicId);
    });
  });
  focusExplorer.querySelectorAll("[data-meals-word-group]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mealsWordGroupId = button.dataset.mealsWordGroup;
      renderSchoolExplorer(topicId);
    });
  });
}


  return { schoolPracticeItems, ensureSchoolPractice, renderSchoolPractice, renderStationeryPractice, renderSchoolSuppliesPractice, renderFoodPractice, renderMealsConversationPractice, renderFoodPreferencesPractice, renderClassroomPractice, renderSchoolExplorer };
}
