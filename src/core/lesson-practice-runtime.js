import { imageLoadingAttrs } from "./image-loading.js";
import { nextRandomCycleId } from "./random-cycle.js";

export function createLessonPracticeRuntime(context) {
  const { state, schoolTopicData, visualTopicItems, positionPracticeItems, timeDateWeekItems, timeDateClockItems, datePracticeItems, timeDateMonthItems, timeDateRoutineItems, timeRoutineSentenceBuilds, clothesMatchItems, clothesSentenceItems, everydayActionItems, requestBuildPhrases, isItPracticeRounds, illustratedKids, numberHanzi, buildNumberItem, currentTopic, currentNumberStage, currentBook, currentLesson, focusItemsForTopic, shuffleArray, speak, renderFocusExplorer, renderFocusStatus, renderSharedLessonPractice, renderPracticeSayCards, bindPracticeSayCards, activityPanelTitle, activityPanelSummary, activityList, topicColumns, renderBodyPractice, renderWorldPractice, renderHobbiesPractice, activeTimeDateSection, ensureWeekdayChallenge, ensureWeekdayMatchGame, handleWeekdayChallengePlay, handleWeekdayChallengeGuess, resetWeekdayMatchGame, handleWeekdayMatchPhrase, handleWeekdayMatchAttempt, ensureDateChallenge, ensureDateMatchGame, handleDateChallengePlay, handleDateChallengeGuess, resetDateMatchGame, handleDateMatchPhrase, handleDateMatchEvent, familyGameItems, familyListenItems, familyPersonForItemId, familyHeadshotForItemId, ensureFamilyChallenge, ensureFamilyMatchGame, handleFamilyChallengePlay, handleFamilyChallengeGuess, resetFamilyMatchGame, handleFamilyMatchPhrase, handleFamilyMatchAttempt, greetingsGameItems, greetingsMeaningLabel, ensureGreetingsChallenge, ensureGreetingsMatchGame, handleGreetingsChallengePlay, handleGreetingsChallengeGuess, resetGreetingsMatchGame, handleGreetingsMatchPhrase, handleGreetingsMatchAttempt, nationalityPracticeItems, ensureNationalityChallenge, currentNationalityAnswer, handleNationalityChallengePlay, handleNationalityChallengeGuess, ensureNationalityMatchGame, resetNationalityMatchGame, handleNationalityMatchPhrase, handleNationalityMatchAttempt, languagePracticeItems, ensureLanguageChallenge, currentLanguageAnswer, handleLanguageChallengePlay, handleLanguageChallengeGuess, politeGameItems, politeMeaningLabel, ensurePoliteChallenge, ensurePoliteMatchGame, handlePoliteChallengePlay, handlePoliteChallengeGuess, resetPoliteMatchGame, handlePoliteMatchPhrase, handlePoliteMatchAttempt, ensureRoomBuilder, currentRoomBuildItem, handleRoomBuildToken, clearRoomBuilder, nextRoomBuilder, ensureClothesQuiz, handleClothesQuizPick, nextClothesQuizQuestion, ensureClothesSentenceQuiz, handleClothesSentencePick, nextClothesSentenceQuestion, ensureTimeRoutineQuiz, handleTimeRoutineQuizPick, nextTimeRoutineQuizQuestion, ensureClockQuiz, handleClockQuizPick, nextClockQuizQuestion, ensureComparisonBuilder, currentComparisonBuildItem, handleComparisonBuildToken, clearComparisonBuilder, nextComparisonBuilder, ensurePositionQuiz, handlePositionQuizPlay, handlePositionQuizPick, nextPositionQuizQuestion, ensureTransportBuilder, currentTransportBuildItem, handleTransportBuildToken, clearTransportBuilder, nextTransportBuilder, ensureEverydayActionsQuiz, currentEverydayAction, handleEverydayActionsPick, nextEverydayActionsQuestion, resetNumberChallenge, ensureMathChallenge, handleNumberChallengeGuess, resetMathChallenge, handleMathChallengeSubmit, renderNumberVisual, introductionsBuildTarget, ensureIntroductionsBuilder, resetIntroductionsBuilder, handleIntroductionsBuildClear, handleIntroductionsBuildToken, ageGameItems, ensureAgeChallenge, ensureAgeBuilder, ageBuildTarget, handleAgeChallengePlay, handleAgeChallengeGuess, resetAgeBuilder, handleAgeBuildClear, handleAgeBuildToken, renderSchoolPractice } = context;

  function startIsItPracticeRound() {
    state.isItPracticeRoundId = nextRandomCycleId(state, "is-it-practice", isItPracticeRounds.map((round) => round.id));
    state.isItPracticePickedId = "";
    state.isItPracticeResult = "";
    state.isItPracticeWrongIds = new Set();
  }

  function currentIsItPracticeRound() {
    if (!state.isItPracticeRoundId) startIsItPracticeRound();
    return isItPracticeRounds.find((round) => round.id === state.isItPracticeRoundId) ?? isItPracticeRounds[0];
  }

  function chooseIsItPracticeAnswer(answerId) {
    const round = currentIsItPracticeRound();
    if (!round || state.isItPracticeResult === "correct") return;
    state.isItPracticePickedId = answerId;
    if (answerId === round.answerId) {
      state.isItPracticeResult = "correct";
      const answer = round.options.find((option) => option.id === answerId);
      if (answer && state.tapAudioEnabled) speak(answer.audio, 0.78);
    } else {
      state.isItPracticeResult = "wrong";
      state.isItPracticeWrongIds = new Set([...state.isItPracticeWrongIds, answerId]);
    }
    renderActivityPanel(currentTopic());
  }

  function resetTimeRoutineBuilder(advance = false) {
    if (!state.timeRoutineBuildOrder.length) state.timeRoutineBuildOrder = shuffleArray(timeRoutineSentenceBuilds.map((item) => item.itemId));
    else if (advance) {
      state.timeRoutineBuildIndex = (state.timeRoutineBuildIndex + 1) % state.timeRoutineBuildOrder.length;
      if (state.timeRoutineBuildIndex === 0) state.timeRoutineBuildOrder = shuffleArray(timeRoutineSentenceBuilds.map((item) => item.itemId));
    }
    state.timeRoutineBuildHour = null;
    state.timeRoutineBuildMinute = null;
    state.timeRoutineBuildAction = "";
    state.timeRoutineBuildActionChoices = shuffleArray(timeRoutineSentenceBuilds.map((item) => item.itemId)).slice(0, 4);
    state.timeRoutineBuildComplete = false;
  }

  function currentTimeRoutineBuild() {
    const itemId = state.timeRoutineBuildOrder[state.timeRoutineBuildIndex];
    const build = timeRoutineSentenceBuilds.find((item) => item.itemId === itemId);
    const item = timeDateRoutineItems.find((entry) => entry.id === itemId);
    return build && item ? { build, item } : null;
  }

  function ensureTimeRoutineBuilder() {
    if (!state.timeRoutineBuildOrder.length) resetTimeRoutineBuilder();
  }

  function updateTimeRoutineBuilder(kind, value) {
    const target = currentTimeRoutineBuild();
    if (!target || state.timeRoutineBuildComplete) return;
    const numericValue = Number(value);
    if (kind === "hour") state.timeRoutineBuildHour = numericValue;
    else if (kind === "minute") state.timeRoutineBuildMinute = numericValue;
    else state.timeRoutineBuildAction = value;
    state.timeRoutineBuildComplete = state.timeRoutineBuildHour !== null && state.timeRoutineBuildMinute !== null && Boolean(state.timeRoutineBuildAction);
    if (state.timeRoutineBuildComplete) speak(timeRoutineBuildSentence(), 0.78);
    renderActivityPanel(currentTopic());
  }

  function timeRoutineBuildAction() {
    return timeRoutineSentenceBuilds.find((item) => item.itemId === state.timeRoutineBuildAction);
  }

  function timeRoutineBuildSentence() {
    const hours = { 1: "一", 2: "两", 3: "三", 4: "四", 5: "五", 6: "六", 7: "七", 8: "八", 9: "九", 10: "十", 11: "十一", 12: "十二" };
    const minutes = { 0: "", 15: "十五分", 30: "三十分", 45: "四十五分" };
    return `${hours[state.timeRoutineBuildHour]}点${minutes[state.timeRoutineBuildMinute]}${timeRoutineBuildAction().action}`;
  }

  function timeRoutineBuildPinyin() {
    const hours = { 1: "yī", 2: "liǎng", 3: "sān", 4: "sì", 5: "wǔ", 6: "liù", 7: "qī", 8: "bā", 9: "jiǔ", 10: "shí", 11: "shí yī", 12: "shí èr" };
    const minutes = { 0: "", 15: "shí wǔ fēn", 30: "sān shí fēn", 45: "sì shí wǔ fēn" };
    return `${hours[state.timeRoutineBuildHour]} diǎn${minutes[state.timeRoutineBuildMinute] ? ` ${minutes[state.timeRoutineBuildMinute]}` : ""} ${timeRoutineBuildAction().actionPinyin}.`;
  }

  function timeRoutineBuildEnglish() {
    const minutes = String(state.timeRoutineBuildMinute).padStart(2, "0");
    return `${timeRoutineBuildAction().actionEnglish} at ${state.timeRoutineBuildHour}:${minutes}.`;
  }

function familySentenceBuilderMarkup() {
  const labels = { "older-sister": "姐姐", "older-brother": "哥哥", "younger-brother": "弟弟", "younger-sister": "妹妹" };
  const counts = state.familySentenceCounts;
  const selectedSiblingCount = Object.values(counts).reduce((sum, count) => sum + (count ?? 0), 0);
  const minimumHouseholdCount = 2 + selectedSiblingCount;
  const countWords = ["没有", "一个", "两个", "三个"];
  const phrases = Object.entries(counts).filter(([, count]) => count > 0).map(([id, count]) => `${countWords[count]}${labels[id]}`);
  const total = state.familyHouseholdCount;
  const householdHanzi = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四"];
  const totalHanzi = householdHanzi[total];
  const totalPinyin = ["", "yī", "èr", "sān", "sì", "wǔ", "liù", "qī", "bā", "jiǔ", "shí", "shí yī", "shí èr", "shí sān", "shí sì"][total];
  const join = (items) => items.length < 2 ? items[0] : `${items.slice(0, -1).join("、")}和${items.at(-1)}`;
  const noSiblings = Object.entries(counts).filter(([, count]) => count === 0).map(([id]) => labels[id]);
  const complete = Boolean(total) && Object.values(counts).every((count) => count !== null);
  return `<section class="practice-split-card family-sentence-builder"><div class="numbers-game-top"><div><p class="body-match-kicker">Make your own sentence</p><p class="numbers-game-note">Choose your household size and the brothers and sisters you have.</p></div><button class="small-button is-play-button" type="button" data-family-sentence-play>Play</button></div><div class="family-sentence-choice family-household-choice"><p class="family-household-label">我家有几口人？</p><div class="family-household-choice-options">${[2,3,4,5,6].map((value) => `<button class="numbers-game-option${total === value ? " is-selected" : ""}" type="button" data-family-household-count="${value}" ${value < minimumHouseholdCount ? "disabled" : ""}>${householdHanzi[value]}口</button>`).join("")}</div></div><div class="family-sentence-choice-grid">${Object.entries(labels).map(([id, label]) => `<div class="family-sentence-choice"><p class="family-sentence-sibling-label">${label}</p><div class="family-sentence-choice-options">${countWords.map((text, value) => `<button class="numbers-game-option${counts[id] === value ? " is-selected" : ""}" type="button" data-family-sentence-count="${id}" data-family-sentence-value="${value}" ${selectedSiblingCount - (counts[id] ?? 0) + value > 4 ? "disabled" : ""}>${text}</button>`).join("")}</div></div>`).join("")}</div>${complete ? `<div class="family-sentence-preview"><p class="numbers-game-hanzi">我家有${totalHanzi}口人。</p>${state.showPinyin ? `<p class="numbers-game-pinyin">wǒ jiā yǒu ${totalPinyin} kǒu rén.</p>` : ""}${phrases.length ? `<p class="numbers-game-hanzi">我有${join(phrases)}。</p>` : ""}${noSiblings.length ? `<p class="numbers-game-hanzi">我没有${join(noSiblings)}。</p>` : ""}</div>` : ""}</section>`;
}

function bindFamilySentenceBuilder(container) {
  const completedSentence = () => {
    const labels = { "older-sister": "姐姐", "older-brother": "哥哥", "younger-brother": "弟弟", "younger-sister": "妹妹" };
    const countWords = ["没有", "一个", "两个", "三个"];
    const householdHanzi = ["", "一", "二", "三", "四", "五", "六"];
    const counts = state.familySentenceCounts;
    const join = (items) => items.length < 2 ? items[0] : `${items.slice(0, -1).join("、")}和${items.at(-1)}`;
    const positive = Object.entries(counts).filter(([, count]) => count > 0).map(([id, count]) => `${countWords[count]}${labels[id]}`);
    const negative = Object.entries(counts).filter(([, count]) => count === 0).map(([id]) => labels[id]);
    return [`我家有${householdHanzi[state.familyHouseholdCount]}口人。`, positive.length ? `我有${join(positive)}。` : "", negative.length ? `我没有${join(negative)}。` : ""].filter(Boolean).join("");
  };
  const speakSentence = () => {
    const hasAllChoices = state.familyHouseholdCount && Object.values(state.familySentenceCounts).every((count) => count !== null);
    if (!hasAllChoices) return;
    const text = completedSentence();
  if (text) speak(text, 0.78);
  };
  container.querySelector("[data-family-sentence-play]")?.addEventListener("click", () => {
    state.familyHouseholdCount = 0;
    state.familySentenceCounts = { "older-sister": null, "older-brother": null, "younger-brother": null, "younger-sister": null };
    renderActivityPanel(currentTopic());
  });
  container.querySelectorAll("[data-family-household-count]").forEach((button) => button.addEventListener("click", () => {
    state.familyHouseholdCount = Number(button.dataset.familyHouseholdCount);
    renderActivityPanel(currentTopic());
    speakSentence();
  }));
  container.querySelectorAll("[data-family-sentence-count]").forEach((button) => button.addEventListener("click", () => {
    const nextCounts = { ...state.familySentenceCounts, [button.dataset.familySentenceCount]: Number(button.dataset.familySentenceValue) };
    const nextMinimum = 2 + Object.values(nextCounts).reduce((sum, count) => sum + (count ?? 0), 0);
    state.familySentenceCounts = nextCounts;
    if (state.familyHouseholdCount && state.familyHouseholdCount < nextMinimum) state.familyHouseholdCount = 0;
    renderActivityPanel(currentTopic());
    speakSentence();
  }));
}

function requestBuildTarget() {
  return requestBuildPhrases.find((entry) => entry.id === state.requestBuildTargetId) ?? requestBuildPhrases[0];
}

function resetRequestBuilder() {
  const targetId = nextRandomCycleId(state, "requests-permission-build", requestBuildPhrases.map((entry) => entry.id));
  const target = requestBuildPhrases.find((entry) => entry.id === targetId);
  if (!target) return;
  state.requestBuildTargetId = target.id;
  state.requestBuildAvailableTokens = shuffleArray(target.tokens);
  state.requestBuildSelectedTokens = [];
  state.requestBuildFeedback = "Look at the picture, then tap the word pieces in order.";
  state.requestBuildResult = "";
}

function ensureRequestBuilder() {
  const target = requestBuildTarget();
  if (!state.requestBuildTargetId || (!state.requestBuildAvailableTokens.length && !state.requestBuildSelectedTokens.length) || !target) resetRequestBuilder();
}

function handleRequestBuildToken(tokenIndex) {
  const target = requestBuildTarget();
  const token = state.requestBuildAvailableTokens[tokenIndex];
  if (!target || !token || state.requestBuildResult === "correct") return;
  state.requestBuildSelectedTokens = [...state.requestBuildSelectedTokens, token];
  state.requestBuildAvailableTokens = state.requestBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
  if (state.requestBuildSelectedTokens.length === target.tokens.length) {
    const isCorrect = target.tokens.every((entry, index) => state.requestBuildSelectedTokens[index] === entry);
    if (isCorrect) {
      state.requestBuildResult = "correct";
      state.requestBuildFeedback = `Correct! ${target.targetHanzi}`;
      speak(target.audio, 0.78);
    } else {
      state.requestBuildResult = "wrong";
      state.requestBuildFeedback = "Not quite. Try again.";
      state.requestBuildAvailableTokens = shuffleArray(target.tokens);
      state.requestBuildSelectedTokens = [];
    }
  }
  renderActivityPanel(currentTopic());
}

function requestSentenceBuilderMarkup() {
  const target = requestBuildTarget();
  if (!target) return "";
  const complete = state.requestBuildResult === "correct";
  return `<section class="practice-split-card request-sentence-builder"><div class="numbers-game-top"><div><p class="body-match-kicker">Build a sentence</p><p class="numbers-game-note">Look at the picture, then tap the word pieces in order.</p></div><button class="small-button is-play-button" type="button" data-request-builder-play>Play</button></div><img class="request-builder-visual" src="${target.imagePath}" alt="${target.imageAlt}" ${imageLoadingAttrs({ width: 1200, height: 900 })} /><div class="intro-build-target"><p class="numbers-game-english">${target.english}</p><div class="intro-build-selected">${state.requestBuildSelectedTokens.length ? state.requestBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Tap the word pieces below.</span>'}</div>${complete ? `<p class="numbers-game-pinyin">${target.targetPinyin}</p>` : ""}</div><div class="intro-build-choices">${state.requestBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-request-builder-token="${index}">${token}</button>`).join("")}</div>${state.requestBuildFeedback ? `<p class="greetings-game-feedback${state.requestBuildResult === "correct" ? " is-correct" : state.requestBuildResult === "wrong" ? " is-wrong" : ""}">${state.requestBuildFeedback}</p>` : ""}</section>`;
}

function bindRequestSentenceBuilder(container) {
  container.querySelector("[data-request-builder-play]")?.addEventListener("click", () => {
    resetRequestBuilder();
    renderActivityPanel(currentTopic());
  });
  container.querySelectorAll("[data-request-builder-token]").forEach((button) => button.addEventListener("click", () => {
    handleRequestBuildToken(Number(button.dataset.requestBuilderToken));
  }));
}

function sharedLessonPracticeConfig(topic) {
  if (topic.id === "languages") {
    return {
      summary: "Listen to the sentence, then choose the language you hear.",
      shellClass: "lesson-practice-shell nationality-practice-shell",
      ensure: ensureLanguageChallenge,
      listen: {
        kicker: "Listen and choose",
        title: "Which language do you hear?",
        instruction: "Listen carefully, then choose the language you hear.",
        items: languagePracticeItems,
        optionIds: () => state.languageChallengeOptionIds,
        pickedId: () => state.languageChallengePickedId,
        result: () => state.languageChallengeResult,
        wrongIds: () => state.languageChallengeWrongIds,
        feedback: () => state.languageListenFeedback,
        playLabel: () => state.languageChallengeResult === "correct" ? "New game" : "Play",
        visualMarkup: () => { const item = currentLanguageAnswer(); return item ? `<figure class="nationality-practice-flag"><img src="${item.flagAsset}" alt="${item.flagAlt}" /></figure>` : ""; },
        completionMarkup: () => { if (state.languageChallengeResult !== "correct") return ""; const item = currentLanguageAnswer(); return `<section class="nationality-conversation-reveal" aria-live="polite"><p class="body-match-kicker">Sentence</p><article><p class="telephone-line-hanzi">${item.sentence.hanzi}</p><p class="telephone-line-pinyin">${item.sentence.pinyin}</p><p class="telephone-line-english">${item.sentence.english}</p></article></section>`; },
        onPlay: handleLanguageChallengePlay,
        onGuess: handleLanguageChallengeGuess
      }
    };
  }

  if (topic.id === "identity") {
    return {
      summary: "Listen to the conversation. Use the flag as a clue, then choose the nationality you hear.",
      shellClass: "lesson-practice-shell nationality-practice-shell",
      ensure: () => { ensureNationalityChallenge(); ensureNationalityMatchGame(); },
      listen: {
        kicker: "Listen and choose",
        title: "Which nationality do you hear?",
        items: nationalityPracticeItems,
        optionIds: () => state.nationalityChallengeOptionIds,
        pickedId: () => state.nationalityChallengePickedId,
        result: () => state.nationalityChallengeResult,
        wrongIds: () => state.nationalityChallengeWrongIds,
        feedback: () => state.nationalityListenFeedback,
        playLabel: () => state.nationalityChallengeResult === "correct" ? "New game" : "Play",
        visualMarkup: () => {
          const item = currentNationalityAnswer();
          return item ? `<figure class="nationality-practice-flag"><img src="${item.flagAsset}" alt="${item.flagAlt}" /></figure>` : "";
        },
        completionMarkup: () => {
          if (state.nationalityChallengeResult !== "correct") return "";
          const item = currentNationalityAnswer();
          return `<section class="nationality-conversation-reveal" aria-live="polite"><p class="body-match-kicker">Conversation</p><article><p class="telephone-line-hanzi">你是哪国人？</p><p class="telephone-line-pinyin">nǐ shì nǎ guó rén?</p><p class="telephone-line-english">What nationality are you?</p></article><article><p class="telephone-line-hanzi">${item.response.hanzi}</p><p class="telephone-line-pinyin">${item.response.pinyin}</p><p class="telephone-line-english">${item.response.english}</p></article></section>`;
        },
        onPlay: handleNationalityChallengePlay,
        onGuess: handleNationalityChallengeGuess
      },
      match: {
        phraseHeading: "Flag and country",
        meaningHeading: "Country symbol",
        instruction: "Match each flag and country name to its country symbol.",
        items: nationalityPracticeItems,
        phraseIds: () => state.nationalityMatchPhraseOrder,
        meaningIds: () => state.nationalityMatchSymbolOrder,
        matchedIds: () => state.nationalityMatchedIds,
        selectedId: () => state.nationalityMatchSelectedId,
        feedback: () => state.nationalityMatchFeedback,
        phraseContent: (id) => { const item = nationalityPracticeItems().find((entry) => entry.id === id); return item ? `<span class="nationality-match-country"><img class="nationality-match-flag" src="${item.flagAsset}" alt="${item.flagAlt}" /><span class="nationality-match-copy"><span class="numbers-game-hanzi">${item.countryHanzi}</span><span class="numbers-game-english">${item.flagAlt.replace(" flag", "")}</span></span></span>` : ""; },
        meaningContent: (id) => { const item = nationalityPracticeItems().find((entry) => entry.id === id); return item ? `<span class="nationality-match-symbol-card"><img class="nationality-match-symbol" src="${item.symbolAsset}" alt="${item.symbolCaption}" /><span class="numbers-game-english">${item.symbolCaption}</span></span>` : ""; },
        onNew: () => { resetNationalityMatchGame(); renderActivityPanel(topic); },
        onPhrase: handleNationalityMatchPhrase,
        onMeaning: handleNationalityMatchAttempt
      }
    };
  }

  if (topic.id === "weekdays") {
    return {
      summary: "Listen for the weekday, then match each Chinese day to its English name.",
      shellClass: "lesson-practice-shell",
      sayItems: [
        { hanzi: "今天星期几？", pinyin: "jīn tiān xīng qī jǐ?", english: "What day is it today?", audio: "今天星期几" },
        { hanzi: "今天星期一。", pinyin: "jīn tiān xīng qī yī.", english: "Today is Monday.", audio: "今天星期一" }
      ],
      ensure: () => {
        ensureWeekdayChallenge();
        ensureWeekdayMatchGame();
      },
      listen: {
        items: () => timeDateWeekItems,
        optionIds: () => state.weekdayChallengeOptionIds,
        pickedId: () => state.weekdayChallengePickedId,
        result: () => state.weekdayChallengeResult,
        wrongIds: () => state.weekdayChallengeWrongIds,
        feedback: () => state.weekdayListenFeedback,
        onPlay: handleWeekdayChallengePlay,
        onGuess: handleWeekdayChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: () => timeDateWeekItems,
        phraseIds: () => state.weekdayPhraseOrder,
        meaningIds: () => state.weekdayMeaningOrder,
        matchedIds: () => state.weekdayMatchedIds,
        selectedId: () => state.weekdaySelectedPhraseId,
        feedback: () => state.weekdayMatchFeedback,
        meaningLabel: (id) => timeDateWeekItems.find((item) => item.id === id)?.english ?? "",
        onNew: () => {
          resetWeekdayMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleWeekdayMatchPhrase,
        onMeaning: handleWeekdayMatchAttempt
      }
    };
  }

  if (topic.id === "family") {
    return {
      summary: "Make your own family sentence, then match each family word to the right family member.",
      ensure: () => {
        ensureFamilyMatchGame();
      },
      builder: { markup: familySentenceBuilderMarkup, bind: bindFamilySentenceBuilder },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Family member",
        meaningCardClass: "family-match-card",
        items: familyGameItems,
        phraseIds: () => state.familyPhraseOrder,
        meaningIds: () => state.familyMeaningOrder,
        matchedIds: () => state.familyMatchedIds,
        selectedId: () => state.familySelectedPhraseId,
        feedback: () => state.familyMatchFeedback,
        meaningLabel: (id) => familyPersonForItemId(id)?.label ?? "",
        meaningContent: (id) => {
          const person = familyPersonForItemId(id);
          if (!person) {
            return "";
          }
          return `
            <span class="family-match-avatar"><img class="family-match-avatar-image family-match-avatar-image-headshot" src="${familyHeadshotForItemId(id)}" alt="${person.label}" /></span>
            <span class="family-match-copy">
              <span class="match-answer-label">${person.label}</span>
            </span>
          `;
        },
        onNew: () => {
          resetFamilyMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleFamilyMatchPhrase,
        onMeaning: handleFamilyMatchAttempt
      }
    };
  }

  if (topic.id === "greetings") {
    return {
      summary: "Listen, choose the matching greeting, then match each line to its situation.",
      shellClass: "lesson-practice-shell",
      ensure: () => {
        ensureGreetingsChallenge();
        ensureGreetingsMatchGame();
      },
      listen: {
        items: greetingsGameItems,
        optionIds: () => state.greetingsChallengeOptionIds,
        pickedId: () => state.greetingsChallengePickedId,
        result: () => state.greetingsChallengeResult,
        wrongIds: () => state.greetingsChallengeWrongIds,
        feedback: () => state.greetingsListenFeedback,
        playLabel: () => state.greetingsChallengeResult === "correct" ? "New game" : "Play",
        onPlay: handleGreetingsChallengePlay,
        onGuess: handleGreetingsChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Situation",
        items: greetingsGameItems,
        phraseIds: () => state.greetingsPhraseOrder,
        meaningIds: () => state.greetingsMeaningOrder,
        matchedIds: () => state.greetingsMatchedIds,
        selectedId: () => state.greetingsSelectedPhraseId,
        feedback: () => state.greetingsMatchFeedback,
        meaningLabel: greetingsMeaningLabel,
        onNew: () => {
          resetGreetingsMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleGreetingsMatchPhrase,
        onMeaning: handleGreetingsMatchAttempt
      }
    };
  }

  if (topic.id === "requests-permission") {
    return {
      summary: "Build a complete request, then match each Chinese sentence to its English translation.",
      shellClass: "lesson-practice-shell",
      ensure: () => {
        ensureRequestBuilder();
        ensurePoliteMatchGame();
      },
      builder: { markup: requestSentenceBuilderMarkup, bind: bindRequestSentenceBuilder },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: politeGameItems,
        phraseIds: () => state.politePhraseOrder,
        meaningIds: () => state.politeMeaningOrder,
        matchedIds: () => state.politeMatchedIds,
        selectedId: () => state.politeSelectedPhraseId,
        feedback: () => state.politeMatchFeedback,
        meaningLabel: politeMeaningLabel,
        onNew: () => {
          resetPoliteMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handlePoliteMatchPhrase,
        onMeaning: handlePoliteMatchAttempt
      }
    };
  }

  if (topic.id === "polite-words") {
    return {
      summary: "Listen, choose the matching polite phrase, then match each phrase to its meaning.",
      shellClass: "lesson-practice-shell",
      ensure: () => {
        ensurePoliteChallenge();
        ensurePoliteMatchGame();
      },
      listen: {
        items: politeGameItems,
        optionIds: () => state.politeChallengeOptionIds,
        pickedId: () => state.politeChallengePickedId,
        result: () => state.politeChallengeResult,
        wrongIds: () => state.politeChallengeWrongIds,
        feedback: () => state.politeListenFeedback,
        playLabel: () => state.politeChallengeResult === "correct" ? "New game" : "Play",
        onPlay: handlePoliteChallengePlay,
        onGuess: handlePoliteChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "Meaning",
        items: politeGameItems,
        phraseIds: () => state.politePhraseOrder,
        meaningIds: () => state.politeMeaningOrder,
        matchedIds: () => state.politeMatchedIds,
        selectedId: () => state.politeSelectedPhraseId,
        feedback: () => state.politeMatchFeedback,
        meaningLabel: politeMeaningLabel,
        onNew: () => {
          resetPoliteMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handlePoliteMatchPhrase,
        onMeaning: handlePoliteMatchAttempt
      }
    };
  }

  if (topic.id === "dates") {
    return {
      summary: "Listen for a date or celebration, then match months to their English names.",
      shellClass: "lesson-practice-shell",
      sayItems: [
        { hanzi: "今天几月几号？", pinyin: "jīn tiān jǐ yuè jǐ hào?", english: "What is the date today?", audio: "今天几月几号" },
        { hanzi: "今天五月二十号。", pinyin: "jīn tiān wǔ yuè èr shí hào.", english: "Today is May twentieth.", audio: "今天五月二十号" },
        { hanzi: "五月二十号 = 五月二十日。", pinyin: "wǔ yuè èr shí hào = wǔ yuè èr shí rì.", english: "Both mean May twentieth.", audio: "五月二十号五月二十日" }
      ],
      ensure: () => {
        ensureDateChallenge();
        ensureDateMatchGame();
      },
      listen: {
        items: () => datePracticeItems,
        optionIds: () => state.dateChallengeOptionIds,
        pickedId: () => state.dateChallengePickedId,
        result: () => state.dateChallengeResult,
        wrongIds: () => state.dateChallengeWrongIds,
        feedback: () => state.dateListenFeedback,
        onPlay: handleDateChallengePlay,
        onGuess: handleDateChallengeGuess
      },
      match: {
        phraseHeading: "Chinese",
        meaningHeading: "English",
        items: () => timeDateMonthItems.filter((item) => state.datePhraseOrder.includes(item.id)),
        phraseIds: () => state.datePhraseOrder,
        meaningIds: () => state.dateEventOrder,
        matchedIds: () => state.dateMatchedIds,
        selectedId: () => state.dateSelectedPhraseId,
        feedback: () => state.dateMatchFeedback,
        meaningLabel: (id) => timeDateMonthItems.find((item) => item.id === id)?.english ?? "",
        onNew: () => {
          resetDateMatchGame();
          renderActivityPanel(topic);
        },
        onPhrase: handleDateMatchPhrase,
        onMeaning: handleDateMatchEvent
      }
    };
  }

  return null;
}

function renderActivityPanel(topic) {
  if (topic.id === "telephone-numbers") {
    topicColumns?.classList.add("is-hidden");
    activityPanelTitle.textContent = "";
    activityPanelSummary.textContent = "";
    activityList.className = "support-list";
    activityList.innerHTML = "";
    return;
  }

  topicColumns?.classList.remove("is-hidden");
  activityPanelSummary.hidden = false;

  if (topic.id === "is-it") {
    const round = currentIsItPracticeRound();
    const complete = state.isItPracticeResult === "correct";
    const answer = round.options.find((option) => option.id === round.answerId);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at one picture, then choose the answer.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell is-it-practice-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Look and choose</p>
            <p class="numbers-game-note">Look at the picture, then choose the answer.</p>
          </div>
          <button class="small-button is-practice-advance-button" type="button" data-is-it-practice-new aria-label="Start a new game">New game</button>
        </div>
        <figure class="clothes-quiz-visual is-it-practice-visual">
          <img class="is-it-practice-image is-${round.panel}" src="assets/illustrated-grammar/shi-bu-shi-meimei-package.webp" alt="${round.panel === "left" ? "A sealed package" : "Meimei under an opened box"}" ${imageLoadingAttrs()} />
        </figure>
        <div class="is-it-question-card">
          <p class="telephone-line-hanzi">${round.question}</p>
          ${state.showPinyin ? `<p class="telephone-line-pinyin">${round.questionPinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="telephone-line-english">${round.questionEnglish}</p>` : ""}
        </div>
        <div class="numbers-game-options is-it-practice-options">
          ${round.options.map((option) => {
            const isCorrect = complete && option.id === round.answerId;
            const isWrong = state.isItPracticeWrongIds.has(option.id);
            return `<button class="numbers-game-option greetings-game-option family-listen-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-is-it-practice-answer="${option.id}" ${complete ? "disabled" : ""}>${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}<span class="family-listen-copy"><span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</span></button>`;
          }).join("")}
        </div>
        ${complete && answer ? `<div class="everyday-actions-answer"><p class="telephone-line-hanzi">${answer.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${answer.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${answer.english}</p>` : ""}</div>` : ""}
      </section>
    `;
    activityList.querySelector("[data-is-it-practice-new]")?.addEventListener("click", () => {
      startIsItPracticeRound();
      renderActivityPanel(topic);
    });
    activityList.querySelectorAll("[data-is-it-practice-answer]").forEach((button) => {
      button.addEventListener("click", () => chooseIsItPracticeAnswer(button.dataset.isItPracticeAnswer));
    });
    return;
  }

  if (topic.id === "body") {
    renderBodyPractice();
    return;
  }

  if (["pets", "animals", "colours", "nature", "weather"].includes(topic.id)) {
    renderWorldPractice(topic);
    return;
  }

  if (["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"].includes(topic.id)) {
    renderHobbiesPractice(topic);
    return;
  }

  if (schoolTopicData[topic.id]) {
    renderSchoolPractice(topic);
    return;
  }

  const sharedPracticeConfig = sharedLessonPracticeConfig(topic);
  if (sharedPracticeConfig) {
    renderSharedLessonPractice(topic, sharedPracticeConfig);
    return;
  }

  if (topic.id === "daily-life") {
    ensureRoomBuilder();
    const prompt = currentRoomBuildItem();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell room-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div><button class="small-button is-practice-advance-button" type="button" data-room-build-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual room-build-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.roomBuildResult}">
          ${state.roomBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.roomBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          ${state.roomBuildSelectedTokens.length ? state.roomBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.roomBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-room-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-room-build-clear>Clear</button></div>
      </section>
    `;
    activityList.querySelectorAll("[data-room-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleRoomBuildToken(Number(button.dataset.roomBuildToken)));
    });
    activityList.querySelector("[data-room-build-clear]")?.addEventListener("click", clearRoomBuilder);
    activityList.querySelector("[data-room-build-new]")?.addEventListener("click", nextRoomBuilder);
    return;
  }

  if (topic.id === "comparisons") {
    ensureComparisonBuilder();
    const prompt = currentComparisonBuildItem();
    const visual = visualTopicItems.comparisons.find((item) => item.id === prompt.id);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Complete the sentence with the matching comparison words.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell comparison-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Complete the sentence</p><p class="numbers-game-note">Tap the two word cards in the order that completes the sentence.</p></div><button class="small-button is-practice-advance-button" type="button" data-comparison-build-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual comparison-quiz-visual"><img class="clothes-quiz-image" src="${visual.imagePath}" alt="${visual.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target comparison-build-target is-${state.comparisonBuildResult}">
          ${state.comparisonBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.comparisonBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          <span>${prompt.before}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[0] ?? ""}</span>
          <span>${prompt.between}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[1] ?? ""}</span>
          <span>${prompt.after}</span>
        </div>
        <div class="intro-build-choices">
          ${state.comparisonBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-comparison-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-comparison-build-clear>Clear</button></div>
      </section>
    `;
    activityList.querySelectorAll("[data-comparison-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleComparisonBuildToken(Number(button.dataset.comparisonBuildToken)));
    });
    activityList.querySelector("[data-comparison-build-clear]")?.addEventListener("click", clearComparisonBuilder);
    activityList.querySelector("[data-comparison-build-new]")?.addEventListener("click", nextComparisonBuilder);
    return;
  }

  if (topic.id === "positions") {
    ensurePositionQuiz();
    const prompt = positionPracticeItems.find((item) => item.id === state.positionQuizOrder[state.positionQuizIndex]);
    const complete = state.positionQuizResult === "correct";
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the picture, then complete the sentence with the right position word.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell position-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Finish the sentence</p><p class="numbers-game-note">Look at the picture, then choose the word that completes the sentence.</p></div><button class="small-button is-play-button" type="button" data-position-quiz-new>New game</button></div>
        <figure class="clothes-quiz-visual position-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" ${imageLoadingAttrs()} /></figure>
        <div class="clothes-sentence-frame${complete ? " is-correct" : ""}">
          <span class="numbers-game-hanzi">${prompt.sentenceStart}</span><span class="clothes-sentence-blank${state.positionQuizResult ? ` is-${state.positionQuizResult}` : ""}">${state.positionQuizSelectedId || "____"}</span><span class="numbers-game-hanzi">。</span>
          ${complete && state.showPinyin ? `<span class="numbers-game-pinyin">${prompt.pinyin}</span>` : ""}
          ${complete && state.showEnglish ? `<span class="numbers-game-english">${prompt.english}</span>` : ""}
        </div>
        <div class="clothes-quiz-options">
          ${state.positionQuizOptionIds.map((word) => {
            const isSelected = state.positionQuizSelectedId === word;
            const resultClass = isSelected ? ` is-${state.positionQuizResult}` : "";
            const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.positionQuizResult === "correct" ? "✓" : "×"}</span>` : "";
            return `<button class="clothes-quiz-option${resultClass}" type="button" data-position-quiz-pick="${word}" ${complete ? "disabled" : ""}>${mark}<span class="numbers-game-hanzi">${word}</span></button>`;
          }).join("")}
        </div>
      </section>
    `;
    activityList.querySelectorAll("[data-position-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => handlePositionQuizPick(button.dataset.positionQuizPick));
    });
    activityList.querySelector("[data-position-quiz-new]")?.addEventListener("click", () => {
      nextPositionQuizQuestion();
    });
    return;
  }

  if (topic.id === "everyday-actions") {
    ensureEverydayActionsQuiz();
    const prompt = currentEverydayAction();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the picture, then choose the matching action word.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell everyday-actions-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture choice</p><p class="numbers-game-note">Which action does the picture show?</p></div><button class="small-button is-practice-advance-button" type="button" data-everyday-actions-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual everyday-actions-quiz-visual"><img class="everyday-actions-quiz-image" src="${prompt.imagePath}" alt="${prompt.sentenceEnglish}" /></figure>
        <div class="clothes-quiz-options">
          ${state.everydayActionsOptionIds.map((itemId) => {
            const item = everydayActionItems.find((entry) => entry.id === itemId);
            const isSelected = state.everydayActionsSelectedId === itemId;
            const resultClass = isSelected ? ` is-${state.everydayActionsResult}` : "";
            const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.everydayActionsResult === "correct" ? "✓" : "×"}</span>` : "";
            return `<button class="clothes-quiz-option${resultClass}" type="button" data-everyday-actions-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
          }).join("")}
        </div>
        ${state.everydayActionsResult === "correct" ? `<div class="everyday-actions-answer"><p class="telephone-line-hanzi">${prompt.sentence}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${prompt.sentencePinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${prompt.sentenceEnglish}</p>` : ""}</div>` : ""}
      </section>
    `;
    activityList.querySelectorAll("[data-everyday-actions-pick]").forEach((button) => {
      button.addEventListener("click", () => handleEverydayActionsPick(button.dataset.everydayActionsPick));
    });
    activityList.querySelector("[data-everyday-actions-new]")?.addEventListener("click", nextEverydayActionsQuestion);
    return;
  }

  if (topic.id === "transport") {
    ensureTransportBuilder();
    const prompt = currentTransportBuildItem();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell transport-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div><button class="small-button is-practice-advance-button" type="button" data-transport-build-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual transport-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.transportBuildResult}">
          ${state.transportBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.transportBuildResult === "correct" ? "✓" : "×"}</span>` : ""}
          ${state.transportBuildSelectedTokens.length ? state.transportBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.transportBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-transport-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-transport-build-clear>Clear</button></div>
      </section>
    `;
    activityList.querySelectorAll("[data-transport-build-token]").forEach((button) => {
      button.addEventListener("click", () => handleTransportBuildToken(Number(button.dataset.transportBuildToken)));
    });
    activityList.querySelector("[data-transport-build-clear]")?.addEventListener("click", clearTransportBuilder);
    activityList.querySelector("[data-transport-build-new]")?.addEventListener("click", nextTransportBuilder);
    return;
  }

  if (topic.id === "time-date" && activeTimeDateSection() === "clock") {
    ensureClockQuiz();
    const answerId = state.clockQuizOrder[state.clockQuizIndex];
    const prompt = timeDateClockItems.find((item) => item.id === answerId);
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the clock, then choose the matching Chinese time.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture choice</p><p class="numbers-game-note">Tap the Chinese time that matches the clock.</p></div><button class="small-button is-practice-advance-button" type="button" data-clock-quiz-new aria-label="Start a new game">New game</button></div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="clothes-quiz-options">
          ${state.clockQuizOptionIds
            .map((itemId) => {
              const item = timeDateClockItems.find((entry) => entry.id === itemId);
              const isSelected = state.clockQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.clockQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clockQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-clock-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
      </section>
    `;
    activityList.querySelectorAll("[data-clock-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => handleClockQuizPick(button.dataset.clockQuizPick));
    });
    activityList.querySelector("[data-clock-quiz-new]")?.addEventListener("click", nextClockQuizQuestion);
    return;
  }

  if (topic.id === "time-date") {
    ensureTimeRoutineQuiz();
    ensureTimeRoutineBuilder();
    const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
    const prompt = timeDateRoutineItems.find((item) => item.id === answerId);
    const timeBuilder = currentTimeRoutineBuild();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the routine picture, then choose the matching Chinese sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese sentence that matches the picture.</p>
          </div><button class="small-button is-practice-advance-button" type="button" data-time-routine-quiz-new aria-label="Start a new game">New game</button>
        </div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" />
        </figure>
        <div class="clothes-quiz-options">
          ${state.timeRoutineQuizOptionIds
            .map((itemId) => {
              const item = timeDateRoutineItems.find((entry) => entry.id === itemId);
              const isSelected = state.timeRoutineQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.timeRoutineQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.timeRoutineQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-time-routine-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
      </section>
      <section class="clothes-quiz-shell time-routine-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Complete the sentence</p><p class="numbers-game-note">Choose an hour, minutes, and an action to make your own sentence.</p></div><button class="small-button is-play-button" type="button" data-time-routine-builder-new>Play</button></div>
        <div class="clothes-sentence-frame">
          ${state.timeRoutineBuildComplete ? `<span class="numbers-game-hanzi">${timeRoutineBuildSentence()}。</span>` : `<span class="clothes-sentence-blank">${state.timeRoutineBuildHour ?? "__"}</span><span class="numbers-game-hanzi">点</span><span class="clothes-sentence-blank">${state.timeRoutineBuildMinute ?? "__"}</span><span class="numbers-game-hanzi">分</span><span class="clothes-sentence-blank is-action">${timeRoutineBuildAction()?.action ?? "__"}</span><span class="numbers-game-hanzi">。</span>`}
          ${state.timeRoutineBuildComplete && state.showPinyin ? `<span class="numbers-game-pinyin">${timeRoutineBuildPinyin()}</span>` : ""}
          ${state.timeRoutineBuildComplete && state.showEnglish ? `<span class="numbers-game-english">${timeRoutineBuildEnglish()}</span>` : ""}
        </div>
        <div class="weather-fill-choice-groups time-routine-builder-options"><div class="time-routine-builder-group is-hour"><p class="weather-fill-choice-label">Hour</p><div class="weather-fill-options">${timeBuilder.build.hourChoices.map((hour) => `<button class="weather-fill-option${state.timeRoutineBuildHour === hour ? " is-selected" : ""}" type="button" data-time-routine-builder-hour="${hour}" ${state.timeRoutineBuildComplete ? "disabled" : ""}>${hour}</button>`).join("")}</div></div><div class="time-routine-builder-group is-minutes"><p class="weather-fill-choice-label">Minutes</p><div class="weather-fill-options">${[0, 15, 30, 45].map((minute) => `<button class="weather-fill-option${state.timeRoutineBuildMinute === minute ? " is-selected" : ""}" type="button" data-time-routine-builder-minute="${minute}" ${state.timeRoutineBuildComplete ? "disabled" : ""}>${minute}</button>`).join("")}</div></div><div class="time-routine-builder-group is-action"><p class="weather-fill-choice-label">Action</p><div class="weather-fill-options">${state.timeRoutineBuildActionChoices.map((actionId) => { const action = timeRoutineSentenceBuilds.find((item) => item.itemId === actionId); return `<button class="weather-fill-option${state.timeRoutineBuildAction === actionId ? " is-selected" : ""}" type="button" data-time-routine-builder-action="${actionId}" ${state.timeRoutineBuildComplete ? "disabled" : ""}>${action.action}</button>`; }).join("")}</div></div></div>
      </section>
    `;

    activityList.querySelectorAll("[data-time-routine-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        handleTimeRoutineQuizPick(button.dataset.timeRoutineQuizPick);
      });
    });
    activityList.querySelector("[data-time-routine-quiz-new]")?.addEventListener("click", nextTimeRoutineQuizQuestion);
    activityList.querySelector("[data-time-routine-builder-new]")?.addEventListener("click", () => { resetTimeRoutineBuilder(true); renderActivityPanel(currentTopic()); });
    activityList.querySelectorAll("[data-time-routine-builder-hour]").forEach((button) => button.addEventListener("click", () => updateTimeRoutineBuilder("hour", button.dataset.timeRoutineBuilderHour)));
    activityList.querySelectorAll("[data-time-routine-builder-minute]").forEach((button) => button.addEventListener("click", () => updateTimeRoutineBuilder("minute", button.dataset.timeRoutineBuilderMinute)));
    activityList.querySelectorAll("[data-time-routine-builder-action]").forEach((button) => button.addEventListener("click", () => updateTimeRoutineBuilder("action", button.dataset.timeRoutineBuilderAction)));
    return;
  }

  if (topic.id === "clothes") {
    ensureClothesQuiz();
    ensureClothesSentenceQuiz();
    const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
    const prompt = clothesMatchItems.find((item) => item.id === answerId);
    const sentenceAnswerId = state.clothesSentenceOrder[state.clothesSentenceIndex];
    const sentencePrompt = clothesSentenceItems.find((item) => item.id === sentenceAnswerId);
    const sentenceComplete = state.clothesSentenceResult === "correct";

    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Look at the picture, then choose the matching Chinese word.";
    activityList.className = "support-list";
    activityList.innerHTML = `
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese word that matches the picture.</p>
          </div>
          <button class="small-button is-practice-advance-button" type="button" data-clothes-quiz-new aria-label="Start a new game">New game</button>
        </div>
        <figure class="clothes-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" ${imageLoadingAttrs()} />
        </figure>
        <div class="clothes-quiz-options">
          ${state.clothesQuizOptionIds
            .map((itemId) => {
              const item = clothesMatchItems.find((entry) => entry.id === itemId);
              const isSelected = state.clothesQuizSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.clothesQuizResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clothesQuizResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-clothes-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
      </section>
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Complete the sentence</p>
            <p class="numbers-game-note">Look at the action, then choose the word that completes the sentence.</p>
          </div>
          <button class="small-button is-practice-advance-button" type="button" data-clothes-sentence-new aria-label="Start a new game">New game</button>
        </div>
        <figure class="clothes-quiz-visual">
          <img class="clothes-quiz-image" src="${sentencePrompt.imagePath}" alt="${sentencePrompt.imageAlt}" ${imageLoadingAttrs()} />
        </figure>
        <div class="clothes-sentence-frame${sentenceComplete ? " is-correct" : ""}">
          <span class="numbers-game-hanzi">${sentencePrompt.frame}</span>
          <span class="clothes-sentence-blank">${sentenceComplete ? sentencePrompt.hanzi : "……"}</span><span class="numbers-game-hanzi">。</span>
          ${sentenceComplete && state.showPinyin ? `<span class="numbers-game-pinyin">${sentencePrompt.framePinyin} ${sentencePrompt.pinyin}.</span>` : ""}
          ${sentenceComplete && state.showEnglish ? `<span class="numbers-game-english">I wear ${sentencePrompt.english}.</span>` : ""}
        </div>
        <div class="clothes-quiz-options">
          ${state.clothesSentenceOptionIds
            .map((itemId) => {
              const item = clothesSentenceItems.find((entry) => entry.id === itemId);
              const isSelected = state.clothesSentenceSelectedId === itemId;
              const resultClass = isSelected ? ` is-${state.clothesSentenceResult}` : "";
              const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clothesSentenceResult === "correct" ? "✓" : "×"}</span>` : "";
              return `<button class="clothes-quiz-option${resultClass}" type="button" data-clothes-sentence-pick="${item.id}" ${sentenceComplete ? "disabled" : ""}>${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
      </section>
    `;

    activityList.querySelectorAll("[data-clothes-quiz-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        handleClothesQuizPick(button.dataset.clothesQuizPick);
      });
    });
    activityList.querySelector("[data-clothes-quiz-new]")?.addEventListener("click", nextClothesQuizQuestion);
    activityList.querySelectorAll("[data-clothes-sentence-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        handleClothesSentencePick(button.dataset.clothesSentencePick);
      });
    });
    activityList.querySelector("[data-clothes-sentence-new]")?.addEventListener("click", nextClothesSentenceQuestion);
    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    if (stage.telephoneMode) {
      topicColumns?.classList.add("is-hidden");
      activityPanelTitle.textContent = "";
      activityPanelSummary.textContent = "";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      return;
    }

    const challengeItem = buildNumberItem(state.numberChallengeTargetValue ?? stage.start);
    ensureMathChallenge();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Practice seeing quantities quickly, then solve one small number sentence.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const gameCard = document.createElement("section");
    gameCard.className = "numbers-game-card";
    gameCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Quick Game</p>
          <h4>How many do you see?</h4>
        </div>
        <button class="small-button is-practice-advance-button" type="button" data-number-game-refresh>Try another</button>
      </div>
      <p class="numbers-game-note">The quantity changes each round, so kids do not always count in order from one.</p>
      <div class="numbers-game-visual">
        ${renderNumberVisual(challengeItem.value, stage)}
      </div>
      <div class="numbers-game-options">
        ${state.numberChallengeOptionValues
          .map((value) => {
            const option = buildNumberItem(value);
            const isCorrect = state.numberChallengeResult === "correct" && value === state.numberChallengeTargetValue;
            const isWrong = state.numberChallengeWrongValues.has(value);
            const feedbackStyle = isCorrect
              ? "border-color: #5f8f51; background: #dcefd2; box-shadow: 0 0 0 3px rgba(111, 143, 97, 0.16);"
              : isWrong
                ? "border-color: #be5b49; background: #f7ded8; box-shadow: 0 0 0 3px rgba(190, 91, 73, 0.12);"
                : "";
            return `
              <button class="numbers-game-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-number-game-guess="${value}" style="${feedbackStyle}" ${state.numberChallengeResult === "correct" ? "disabled" : ""}>
                ${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}
                <span class="numbers-game-hanzi">${option.hanzi}</span>
                ${state.showArabic ? `<span class="numbers-game-arabic">${option.value}</span>` : ""}
                ${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}
                ${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
      ${state.numberChallengeResult ? `<p class="greetings-game-feedback is-${state.numberChallengeResult}">${state.lastNumberFeedback}</p>` : ""}
    `;
    activityList.appendChild(gameCard);

    const mathCard = document.createElement("section");
    mathCard.className = "numbers-game-card";
    const displayAnswer = state.mathChallengeSolved ? state.mathChallengeAnswer : state.mathChallengeInput;
    const operatorSymbol = state.mathChallengeOperator;
    const operatorChinese = state.mathChallengeOperator === "+" ? "加" : "减";
    mathCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Mini Math</p>
        </div>
        <button class="small-button is-practice-advance-button" type="button" data-math-game-new aria-label="Start a new game">New game</button>
      </div>
      <p class="numbers-game-note">Type the answer and press Enter. After a correct answer, listen first, then move to the next question.</p>
      <form class="math-game-form" data-math-game-form>
        <div class="math-game-equation-wrap">
          <div class="math-game-equation">
            <span>${state.mathChallengeLeft}</span>
            <span>${operatorSymbol}</span>
            <span>${state.mathChallengeRight}</span>
            <span>=</span>
            <input
              id="math-game-input"
              class="math-game-input"
              type="text"
              inputmode="numeric"
              maxlength="3"
              autocomplete="off"
              value="${displayAnswer ?? ""}"
              ${state.mathChallengeSolved ? "disabled" : ""}
            />
          </div>
          <div class="math-game-chinese">
            <span>${numberHanzi(state.mathChallengeLeft)}</span>
            <span>${operatorChinese}</span>
            <span>${numberHanzi(state.mathChallengeRight)}</span>
            <span>等于</span>
            <span>${state.mathChallengeSolved ? numberHanzi(state.mathChallengeAnswer) : "?"}</span>
          </div>
        </div>
      </form>
      <p class="numbers-game-note">This stage uses numbers up to ${stage.end}.</p>
      <p class="math-game-feedback">${state.lastMathFeedback}</p>
    `;
    activityList.appendChild(mathCard);

    activityList.querySelector("[data-number-game-refresh]")?.addEventListener("click", () => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(topic);
      renderFocusStatus();
    });

    activityList.querySelectorAll("[data-number-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = Number(button.dataset.numberGameGuess);
        const correct = value === state.numberChallengeTargetValue;
        button.classList.add(correct ? "is-correct" : "is-wrong");
        button.style.borderColor = correct ? "#5f8f51" : "#be5b49";
        button.style.background = correct ? "#dcefd2" : "#f7ded8";
        button.style.boxShadow = correct
          ? "0 0 0 3px rgba(111, 143, 97, 0.16)"
          : "0 0 0 3px rgba(190, 91, 73, 0.12)";
        if (!button.querySelector(".answer-result-mark")) {
          button.insertAdjacentHTML("afterbegin", `<span class="answer-result-mark" aria-hidden="true">${correct ? "✓" : "×"}</span>`);
        }
        handleNumberChallengeGuess(value);
      });
    });

    activityList.querySelector("[data-math-game-new]")?.addEventListener("click", () => {
      resetMathChallenge();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-math-game-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = activityList.querySelector("#math-game-input");
      handleMathChallengeSubmit(input?.value ?? "");
    });
    return;
  }

  if (topic.id === "introductions") {
    ensureIntroductionsBuilder();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = "Build the introduction sentences from the book.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const buildTarget = introductionsBuildTarget();
    const buildComplete = state.introductionsBuildSelectedTokens.length === buildTarget.tokens.length;
    const gameCard = document.createElement("section");
    gameCard.className = "family-practice-shell";
    gameCard.innerHTML = `
      <div class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Build the sentence</p>
            <p class="numbers-game-note">Tap the word pieces below to build the sentence.</p>
          </div>
          <button class="small-button is-play-button" type="button" data-intro-build-new>Play</button>
        </div>
        ${state.lastIntroductionsFeedback ? `<p class="greetings-game-feedback">${state.lastIntroductionsFeedback}</p>` : ""}
        <div class="intro-build-target">
          <div class="intro-build-selected">
            ${state.introductionsBuildSelectedTokens.length ? state.introductionsBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
          </div>
          ${buildComplete ? `<p class="numbers-game-pinyin">${buildTarget.targetPinyin}</p><p class="numbers-game-english">${buildTarget.english}</p>` : `<p class="numbers-game-english">${buildTarget.english}</p>`}
        </div>
        <div class="intro-build-choices">
          ${state.introductionsBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-intro-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-character-grid" aria-label="Friends">
          ${Object.values(illustratedKids)
            .map(
              (kid) => `
                <button class="intro-character-card" type="button" data-intro-character="${kid.id}">
                  <div class="intro-character-portrait">
                    <img class="intro-character-image intro-character-image-${kid.id}" src="${kid.path}" alt="${kid.label}" />
                  </div>
                  <span class="intro-character-hanzi">${kid.hanziName}</span>
                  <span class="intro-character-label">${kid.label}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-intro-build-new]")?.addEventListener("click", () => {
      resetIntroductionsBuilder();
      renderActivityPanel(topic);
    });
    activityList.querySelectorAll("[data-intro-build-token]").forEach((button) => {
      button.addEventListener("click", () => {
        handleIntroductionsBuildToken(Number(button.dataset.introBuildToken));
      });
    });
    activityList.querySelectorAll("[data-intro-character]").forEach((button) => {
      button.addEventListener("click", () => {
        const kid = illustratedKids[button.dataset.introCharacter];
        if (kid && state.tapAudioEnabled) {
          speak(`我叫${kid.hanziName}`, 0.78);
        }
      });
    });
    return;
  }

  if (topic.id === "age") {
    ensureAgeChallenge();
    ensureAgeBuilder();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent =
      "Practice age first, then add the grade-level question from the same Book 1A identity lesson.";
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const buildTarget = ageBuildTarget();
    const gameCard = document.createElement("section");
    gameCard.className = "family-practice-shell";
    gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which line did you hear?</h4>
            </div>
            <button class="small-button is-play-button" type="button" data-age-game-play>Play</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching age or grade question or answer.</p>
          ${state.lastAgeFeedback ? `<p class="greetings-game-feedback">${state.lastAgeFeedback}</p>` : ""}
          <div class="numbers-game-options">
            ${state.ageChallengeOptionIds
              .map((id) => {
                const item = ageGameItems().find((entry) => entry.id === id);
                if (!item) {
                  return "";
                }
                const isCorrect = state.ageChallengeResult === "correct" && item.id === state.ageChallengeAnswerId;
                const isWrong = state.ageChallengeWrongIds.has(item.id);
                return `
                  <button class="numbers-game-option greetings-game-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-age-game-guess="${item.id}" ${state.ageChallengeResult === "correct" ? "disabled" : ""}>
                    ${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "✓" : "×"}</span>` : ""}
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Build the phrase</p>
              <h4>${buildTarget.prompt}</h4>
            </div>
            <button class="small-button is-practice-advance-button" type="button" data-age-build-new>New phrase</button>
          </div>
          <p class="numbers-game-note">Tap the word pieces in order to build the sentence.</p>
          <div class="intro-build-target">
            <p class="body-match-kicker">Sentence</p>
            <div class="intro-build-selected">
              ${
                state.ageBuildSelectedTokens.length
                  ? state.ageBuildSelectedTokens
                      .map((token) => `<span class="intro-build-chip is-selected">${token}</span>`)
                      .join("")
                  : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'
              }
            </div>
            <p class="numbers-game-english">${buildTarget.english}</p>
          </div>
          <div class="intro-build-choices">
            ${state.ageBuildAvailableTokens
              .map(
                (token, index) => `
                  <button class="intro-build-chip" type="button" data-age-build-token="${index}">
                    ${token}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="intro-build-actions">
            <button class="small-button" type="button" data-age-build-clear>Clear</button>
          </div>
        </section>
      </div>
    `;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-age-game-play]")?.addEventListener("click", () => {
      handleAgeChallengePlay();
    });

    activityList.querySelectorAll("[data-age-game-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeChallengeGuess(button.dataset.ageGameGuess);
      });
    });

    activityList.querySelector("[data-age-build-new]")?.addEventListener("click", () => {
      resetAgeBuilder();
      renderActivityPanel(topic);
    });

    activityList.querySelector("[data-age-build-clear]")?.addEventListener("click", () => {
      handleAgeBuildClear();
    });

    activityList.querySelectorAll("[data-age-build-token]").forEach((button) => {
      button.addEventListener("click", () => {
        handleAgeBuildToken(Number(button.dataset.ageBuildToken));
      });
    });

    return;
  }

  topicColumns?.classList.add("is-hidden");
  activityPanelTitle.textContent = "";
  activityPanelSummary.textContent = "";
  activityList.innerHTML = "";
}


  return { renderActivityPanel };
}
