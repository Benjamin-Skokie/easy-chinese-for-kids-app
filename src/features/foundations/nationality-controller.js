import { nextRandomCycleId } from "../../core/random-cycle.js";

export function createNationalityController({ state, countries, question, shuffleArray, speakSceneLines, currentTopic, renderActivityPanel }) {
  const practiceItems = countries.map((country) => ({
    id: country.id,
    hanzi: country.nationality,
    pinyin: country.pinyin,
    english: country.response.english,
    flagAsset: country.asset,
    flagAlt: `${country.label} flag`,
    response: country.response
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

  return { nationalityPracticeItems: () => practiceItems, ensureNationalityChallenge, currentNationalityAnswer: currentAnswer, handleNationalityChallengePlay, handleNationalityChallengeGuess };
}
