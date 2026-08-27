export function createIntroductionsController({
  state, introductionsGameSpeakerIds, introductionsGamePrompts, introductionsBuildPhrases, introductionsPractice,
  illustratedKids, topicById, shuffleArray, speak, speakSceneLines, currentTopic, currentFocusItem, currentBook,
  currentLesson, renderActivityPanel, renderFocusDisplay, renderFocusExplorer, renderFocusStatus, elements
}) {
  const { focusExplorer, focusStatus } = elements;

  function lessonKey() {
    return state.lessonScope ? `${state.lessonScope.bookId}:${state.lessonScope.lessonNumber}` : "";
  }

  function scoped(items) {
    const source = lessonKey();
    return source ? items.filter((item) => item.lessonSources?.includes(source)) : items;
  }

  function introductionsPromptById(promptId) {
    return scoped(introductionsGamePrompts).find((entry) => entry.id === promptId) ?? null;
  }

  function introductionsGameKids() {
    return introductionsGameSpeakerIds.map((id) => illustratedKids[id]).filter(Boolean);
  }

  function introductionsSelfIntroItemForKid(kidId) {
    const introductionsTopic = topicById("introductions");
    const itemIdByKidId = { anan: "my-name-anan", tiantian: "my-name-tiantian", sisi: "my-name-sisi", lele: "my-name-lele" };
    return introductionsTopic?.focusItems.find((item) => item.id === itemIdByKidId[kidId]) ?? null;
  }

  function resetIntroductionsChallenge(options = {}) {
    const prompts = scoped(introductionsGamePrompts);
    if (!prompts.length || !introductionsGameSpeakerIds.length) return;
    const promptId = nextRandomCycleId(state, "introductions-listen", prompts.map((entry) => entry.id));
    const prompt = introductionsPromptById(promptId);
    if (!prompt) return;
    state.introductionsChallengeAnswerId = prompt.speakerId;
    state.introductionsChallengePromptId = prompt.id;
    state.introductionsChallengeOptionIds = shuffleArray([...introductionsGameSpeakerIds]);
    state.lastIntroductionsFeedback = options.feedback ?? "";
  }

  function ensureIntroductionsChallenge() {
    if (!state.introductionsChallengeAnswerId || !state.introductionsChallengeOptionIds.length) resetIntroductionsChallenge();
  }

  function handleIntroductionsChallengePlay() {
    ensureIntroductionsChallenge();
    const prompt = introductionsPromptById(state.introductionsChallengePromptId);
    if (!prompt) return;
    if (state.tapAudioEnabled) speak(prompt.audio, 0.78);
    state.lastIntroductionsFeedback = "Listen again, then tap the child whose name you heard.";
    renderActivityPanel(currentTopic());
  }

  function handleIntroductionsChallengeGuess(kidId) {
    ensureIntroductionsChallenge();
    const answerPrompt = introductionsPromptById(state.introductionsChallengePromptId);
    const pickedKid = illustratedKids[kidId];
    const answerKid = illustratedKids[state.introductionsChallengeAnswerId];
    if (!answerPrompt || !pickedKid || !answerKid) return;

    if (kidId === answerPrompt.speakerId) {
      state.selectedFocusItemId = answerPrompt.sourceItemId;
      if (state.tapAudioEnabled) speak(answerPrompt.audio, 0.78);
      state.lastIntroductionsFeedback = `Correct! ${answerKid.hanziName} said ${answerPrompt.hanzi}`;
      renderFocusDisplay(currentFocusItem());
      renderFocusExplorer();
      renderFocusStatus();
      window.setTimeout(() => {
        resetIntroductionsChallenge();
        renderActivityPanel(currentTopic());
      }, 650);
      return;
    }

    state.lastIntroductionsFeedback = `Try again. You picked ${pickedKid.hanziName}, but the voice was ${answerKid.hanziName}.`;
    renderActivityPanel(currentTopic());
  }

  function introductionsBuildTarget() {
    const phrases = scoped(introductionsBuildPhrases);
    return phrases.find((entry) => entry.id === state.introductionsBuildTargetId) ?? phrases[0];
  }

  function resetIntroductionsBuilder(options = {}) {
    const phrases = scoped(introductionsBuildPhrases);
    const targetId = nextRandomCycleId(state, "introductions-build", phrases.map((entry) => entry.id));
    const target = phrases.find((entry) => entry.id === targetId);
    if (!target) return;
    state.introductionsBuildTargetId = target.id;
    state.introductionsBuildAvailableTokens = shuffleArray(target.tokens);
    state.introductionsBuildSelectedTokens = [];
    state.lastIntroductionsFeedback = options.feedback ?? "Tap the word pieces below to build the sentence.";
  }

  function ensureIntroductionsBuilder() {
    const target = introductionsBuildTarget();
    if (!state.introductionsBuildTargetId || (!state.introductionsBuildAvailableTokens.length && !state.introductionsBuildSelectedTokens.length) || !target) resetIntroductionsBuilder();
  }

  function handleIntroductionsBuildToken(tokenIndex) {
    const target = introductionsBuildTarget();
    const token = state.introductionsBuildAvailableTokens[tokenIndex];
    if (!target || !token) return;
    state.introductionsBuildSelectedTokens = [...state.introductionsBuildSelectedTokens, token];
    state.introductionsBuildAvailableTokens = state.introductionsBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
    if (state.introductionsBuildSelectedTokens.length === target.tokens.length) {
      const correct = target.tokens.every((entry, index) => state.introductionsBuildSelectedTokens[index] === entry);
      if (correct) {
        if (state.tapAudioEnabled) speak(target.audio, 0.78);
        state.lastIntroductionsFeedback = `Correct! ${target.targetHanzi}`;
        if (target.sourceItemId) {
          state.selectedFocusItemId = target.sourceItemId;
          renderFocusDisplay(currentFocusItem());
          renderFocusExplorer();
          renderFocusStatus();
        }
      } else {
        state.introductionsBuildAvailableTokens = shuffleArray(target.tokens);
        state.introductionsBuildSelectedTokens = [];
        state.lastIntroductionsFeedback = "Not quite. Try again.";
      }
    }
    renderActivityPanel(currentTopic());
  }

  function handleIntroductionsBuildClear() {
    const target = introductionsBuildTarget();
    if (!target) return;
    state.introductionsBuildAvailableTokens = shuffleArray([...state.introductionsBuildAvailableTokens, ...state.introductionsBuildSelectedTokens]);
    state.introductionsBuildSelectedTokens = [];
    state.lastIntroductionsFeedback = "Try building the sentence again.";
    renderActivityPanel(currentTopic());
  }

  function renderIntroductionsExplorer() {
    const scenes = scoped(introductionsPractice);
    focusExplorer.innerHTML = `<div class="numbers-board"><div class="greetings-practice-grid introductions-explorer-grid">${scenes.map((exchange) => `<section class="greetings-exchange"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${exchange.title}</p></div><button class="small-button is-play-button" type="button" data-intro-play-all="${exchange.id}">Play</button></div><div class="greetings-scene-layout introductions-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" /></div><div class="greetings-line-stack">${exchange.lines.map((line) => `<article class="greetings-line-card intro-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div></section>`).join("")}</div></div>`;
    focusExplorer.querySelectorAll("[data-intro-play-all]").forEach((button) => {
      button.addEventListener("click", () => {
        const exchange = scenes.find((entry) => entry.id === button.dataset.introPlayAll);
        if (!exchange || !state.tapAudioEnabled) return;
        speakSceneLines(exchange.lines);
        focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
      });
    });
  }

  return { introductionsPromptById, introductionsGameKids, introductionsSelfIntroItemForKid, resetIntroductionsChallenge, ensureIntroductionsChallenge, handleIntroductionsChallengePlay, handleIntroductionsChallengeGuess, introductionsBuildTarget, resetIntroductionsBuilder, ensureIntroductionsBuilder, handleIntroductionsBuildToken, handleIntroductionsBuildClear, renderIntroductionsExplorer };
}
import { nextRandomCycleId } from "../../core/random-cycle.js";
