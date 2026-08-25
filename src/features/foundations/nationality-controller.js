import { nextRandomCycleId } from "../../core/random-cycle.js";

export function createNationalityController({ state, countries, question, shuffleArray, speakSceneLines, currentTopic, renderActivityPanel }) {
  const practiceItems = countries.map((country) => ({
    id: country.id,
    hanzi: country.nationality,
    pinyin: country.pinyin,
    english: country.response.english,
    flagAsset: country.asset,
    flagAlt: `${country.label} flag`,
    countryHanzi: country.hanzi,
    countryPinyin: country.pinyin.replace(" rén", ""),
    symbolAsset: country.symbolAsset,
    symbolCaption: country.symbolCaption,
    response: country.response
  }));
  const languageItems = countries
    .filter((country) => ["china", "usa", "germany", "france"].includes(country.id))
    .map((country) => ({
      id: country.language.hanzi,
      hanzi: country.language.hanzi,
      pinyin: country.language.pinyin,
      english: country.language.english,
      flagAsset: country.asset,
      flagAlt: `${country.label} flag`,
      sentence: { hanzi: `${country.nationality}说${country.language.hanzi}。`, pinyin: `${country.pinyin} shuō ${country.language.pinyin}.`, english: `${country.nationality} people speak ${country.language.english}.`, audio: `${country.nationality}说${country.language.hanzi}` }
    }));

  function resetNationalityChallenge(options = {}) {
    const answerId = nextRandomCycleId(state, "nationality-listen", practiceItems.map((item) => item.id));
    const answer = practiceItems.find((item) => item.id === answerId);
    if (!answer) return;
    const distractors = shuffleArray(practiceItems.filter((item) => item.id !== answer.id)).slice(0, 3);
    state.nationalityChallengeAnswerId = answer.id;
    state.nationalityChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
    state.nationalityChallengePickedId = "";
    state.nationalityChallengeResult = "";
    state.nationalityChallengeWrongIds = new Set();
    state.nationalityListenFeedback = options.feedback ?? "Press Play. Listen to the conversation, then choose the nationality you hear.";
  }

  function ensureNationalityChallenge() {
    if (!state.nationalityChallengeAnswerId || !state.nationalityChallengeOptionIds.length) resetNationalityChallenge();
  }

  function currentAnswer() {
    ensureNationalityChallenge();
    return practiceItems.find((item) => item.id === state.nationalityChallengeAnswerId) ?? practiceItems[0];
  }

  function playConversation(item) {
    if (state.tapAudioEnabled && item) speakSceneLines([question, item.response]);
  }

  function handleNationalityChallengePlay() {
    ensureNationalityChallenge();
    if (state.nationalityChallengeResult === "correct") {
      resetNationalityChallenge();
    }
    const answer = currentAnswer();
    playConversation(answer);
    state.nationalityListenFeedback = "Listen carefully, then choose the nationality you hear.";
    renderActivityPanel(currentTopic());
  }

  function handleNationalityChallengeGuess(itemId) {
    const answer = currentAnswer();
    const picked = practiceItems.find((item) => item.id === itemId);
    if (!answer || !picked || state.nationalityChallengeResult === "correct") return;
    state.nationalityChallengePickedId = itemId;
    if (itemId === answer.id) {
      state.nationalityChallengeResult = "correct";
      state.nationalityListenFeedback = "Correct! Read the conversation below.";
    } else {
      state.nationalityChallengeResult = "wrong";
      state.nationalityChallengeWrongIds = new Set([...state.nationalityChallengeWrongIds, itemId]);
      state.nationalityListenFeedback = "Not this one. Press Play and listen again.";
    }
    renderActivityPanel(currentTopic());
  }

  function resetNationalityMatchGame() {
    state.nationalityMatchSelectedId = null;
    state.nationalityMatchedIds = new Set();
    state.nationalityMatchPhraseOrder = shuffleArray(practiceItems.map((item) => item.id));
    state.nationalityMatchSymbolOrder = shuffleArray(practiceItems.map((item) => item.id));
    state.nationalityMatchWrongPhraseIds = new Set();
    state.nationalityMatchWrongMeaningIds = new Set();
    state.nationalityMatchFeedback = "";
  }

  function ensureNationalityMatchGame() {
    if (state.nationalityMatchPhraseOrder.length !== practiceItems.length || state.nationalityMatchSymbolOrder.length !== practiceItems.length) resetNationalityMatchGame();
  }

  function handleNationalityMatchPhrase(itemId) {
    if (state.nationalityMatchedIds.has(itemId)) return;
    state.nationalityMatchSelectedId = itemId;
    state.nationalityMatchFeedback = "Now choose the matching country symbol.";
    renderActivityPanel(currentTopic());
  }

  function handleNationalityMatchAttempt(itemId) {
    const selectedId = state.nationalityMatchSelectedId;
    if (!selectedId || state.nationalityMatchedIds.has(itemId)) return;
    if (selectedId === itemId) {
      state.nationalityMatchedIds = new Set([...state.nationalityMatchedIds, itemId]);
      state.nationalityMatchSelectedId = null;
      state.nationalityMatchFeedback = state.nationalityMatchedIds.size === practiceItems.length ? "Great job! You matched every country." : "Correct! Choose another flag and country name.";
    } else {
      state.nationalityMatchFeedback = "Not that symbol. Try another one.";
      state.nationalityMatchWrongPhraseIds = new Set([...state.nationalityMatchWrongPhraseIds, selectedId]);
      state.nationalityMatchWrongMeaningIds = new Set([...state.nationalityMatchWrongMeaningIds, itemId]);
    }
    renderActivityPanel(currentTopic());
  }

  function resetLanguageChallenge() {
    const answerId = nextRandomCycleId(state, "languages-listen", languageItems.map((item) => item.id));
    const answer = languageItems.find((item) => item.id === answerId);
    if (!answer) return;
    state.languageChallengeAnswerId = answer.id;
    state.languageChallengeOptionIds = shuffleArray(languageItems.map((item) => item.id));
    state.languageChallengePickedId = "";
    state.languageChallengeResult = "";
    state.languageChallengeWrongIds = new Set();
    state.languageListenFeedback = "";
  }

  function ensureLanguageChallenge() {
    if (!state.languageChallengeAnswerId || !state.languageChallengeOptionIds.length) resetLanguageChallenge();
  }

  function currentLanguageAnswer() {
    ensureLanguageChallenge();
    return languageItems.find((item) => item.id === state.languageChallengeAnswerId) ?? languageItems[0];
  }

  function handleLanguageChallengePlay() {
    ensureLanguageChallenge();
    if (state.languageChallengeResult === "correct") resetLanguageChallenge();
    const answer = currentLanguageAnswer();
    if (state.tapAudioEnabled && answer) speakSceneLines([answer.sentence]);
    state.languageListenFeedback = "";
    renderActivityPanel(currentTopic());
  }

  function handleLanguageChallengeGuess(itemId) {
    const answer = currentLanguageAnswer();
    if (!answer || state.languageChallengeResult === "correct") return;
    state.languageChallengePickedId = itemId;
    if (itemId === answer.id) {
      state.languageChallengeResult = "correct";
      state.languageListenFeedback = "Correct! Read the sentence below.";
    } else {
      state.languageChallengeResult = "wrong";
      state.languageChallengeWrongIds = new Set([...state.languageChallengeWrongIds, itemId]);
      state.languageListenFeedback = "Not this one. Press Play and listen again.";
    }
    renderActivityPanel(currentTopic());
  }

  return { nationalityPracticeItems: () => practiceItems, ensureNationalityChallenge, currentNationalityAnswer: currentAnswer, handleNationalityChallengePlay, handleNationalityChallengeGuess, ensureNationalityMatchGame, resetNationalityMatchGame, handleNationalityMatchPhrase, handleNationalityMatchAttempt, languagePracticeItems: () => languageItems, ensureLanguageChallenge, currentLanguageAnswer, handleLanguageChallengePlay, handleLanguageChallengeGuess };
}
