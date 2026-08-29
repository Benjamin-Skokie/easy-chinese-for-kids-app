export function createAgeController({ state, ageGameItemIds, ageBuildPhrases, agePractice, topicById, shuffleArray, speak, speakSceneLines, currentTopic, currentFocusItem, currentBook, currentLesson, renderActivityPanel, renderFocusDisplay, renderFocusExplorer, renderFocusStatus, elements }) {
  const { focusExplorer, focusStatus } = elements;
  function lessonKey() { return state.lessonScope ? `${state.lessonScope.bookId}:${state.lessonScope.lessonNumber}` : ""; }
  function scoped(items) { const source = lessonKey(); return source ? items.filter((item) => item.lessonSources?.includes(source)) : items; }
  function ageGameItems() { return scoped(ageGameItemIds.map((id) => topicById("age")?.focusItems.find((item) => item.id === id)).filter(Boolean)); }
  function resetAgeChallenge(options = {}) {
    const items = ageGameItems();
    if (!items.length) return;
    const answerId = nextRandomCycleId(state, "age-listen", items.map((item) => item.id));
    const answer = items.find((item) => item.id === answerId);
    if (!answer) return;
    const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(0, Math.min(3, Math.max(0, items.length - 1)));
    state.ageChallengeAnswerId = answer.id;
    state.ageChallengePickedId = "";
    state.ageChallengeResult = "";
    state.ageChallengeWrongIds = new Set();
    state.ageChallengePromptId = answer.id;
    state.ageChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
    state.lastAgeFeedback = options.feedback ?? "";
  }
  function ensureAgeChallenge() { if (!state.ageChallengeAnswerId || !state.ageChallengeOptionIds.length) resetAgeChallenge(); }
  function handleAgeChallengePlay() {
    ensureAgeChallenge();
    const item = ageGameItems().find((entry) => entry.id === state.ageChallengePromptId);
    if (!item) return;
    if (state.tapAudioEnabled) speak(item.audio, 0.78);
    state.lastAgeFeedback = `Listen again and find ${item.hanzi}.`;
    renderActivityPanel(currentTopic());
  }
  function handleAgeChallengeGuess(itemId) {
    ensureAgeChallenge();
    const answer = ageGameItems().find((entry) => entry.id === state.ageChallengeAnswerId);
    const picked = ageGameItems().find((entry) => entry.id === itemId);
    if (!answer || !picked) return;
    if (itemId === answer.id) {
      state.ageChallengePickedId = itemId;
      state.ageChallengeResult = "correct";
      state.selectedFocusItemId = answer.id;
      state.lastAgeFeedback = `Correct! ${answer.hanzi} matches the audio.`;
      renderFocusDisplay(currentFocusItem()); renderFocusExplorer(); renderFocusStatus(); renderActivityPanel(currentTopic());
      window.setTimeout(() => { resetAgeChallenge(); renderActivityPanel(currentTopic()); }, 650);
      return;
    }
    state.ageChallengePickedId = itemId;
    state.ageChallengeResult = "wrong";
    state.ageChallengeWrongIds = new Set([...state.ageChallengeWrongIds, itemId]);
    state.lastAgeFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
    renderActivityPanel(currentTopic());
  }
  function ageBuildTarget() { const phrases = scoped(ageBuildPhrases); return phrases.find((entry) => entry.id === state.ageBuildTargetId) ?? phrases[0]; }
  function resetAgeBuilder(options = {}) {
    const phrases = scoped(ageBuildPhrases);
    const targetId = nextRandomCycleId(state, "age-build", phrases.map((entry) => entry.id));
    const target = phrases.find((entry) => entry.id === targetId);
    if (!target) return;
    state.ageBuildTargetId = target.id;
    state.ageBuildAvailableTokens = shuffleArray(target.tokens);
    state.ageBuildSelectedTokens = [];
    state.lastAgeFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
  }
  function ensureAgeBuilder() {
    const target = ageBuildTarget();
    if (!state.ageBuildTargetId || (!state.ageBuildAvailableTokens.length && !state.ageBuildSelectedTokens.length) || !target) resetAgeBuilder();
  }
  function handleAgeBuildToken(tokenIndex) {
    const target = ageBuildTarget(); const token = state.ageBuildAvailableTokens[tokenIndex];
    if (!target || !token) return;
    state.ageBuildSelectedTokens = [...state.ageBuildSelectedTokens, token];
    state.ageBuildAvailableTokens = state.ageBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
    if (state.ageBuildSelectedTokens.length === target.tokens.length) {
      const correct = target.tokens.every((entry, index) => state.ageBuildSelectedTokens[index] === entry);
      if (correct) {
        if (state.tapAudioEnabled) speak(target.audio, 0.78);
        state.lastAgeFeedback = `Correct! ${target.targetHanzi}`;
        if (target.sourceItemId) { state.selectedFocusItemId = target.sourceItemId; renderFocusDisplay(currentFocusItem()); renderFocusExplorer(); renderFocusStatus(); }
      } else state.lastAgeFeedback = "Not quite. Try building the sentence again.";
    }
    renderActivityPanel(currentTopic());
  }
  function handleAgeBuildClear() {
    const target = ageBuildTarget(); if (!target) return;
    state.ageBuildAvailableTokens = shuffleArray([...state.ageBuildAvailableTokens, ...state.ageBuildSelectedTokens]);
    state.ageBuildSelectedTokens = []; state.lastAgeFeedback = "Try building the sentence again.";
    renderActivityPanel(currentTopic());
  }
  function renderAgeExplorer() {
    const scenes = scoped(agePractice);
    focusExplorer.innerHTML = `<div class="numbers-board"><div class="greetings-practice-grid">${scenes.map((exchange) => `<section class="greetings-exchange"><div class="greetings-exchange-top"><div><p class="body-match-kicker">${exchange.title}</p></div><button class="small-button is-play-button" type="button" data-age-play-all="${exchange.id}">Play</button></div><div class="greetings-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" /></div><div class="greetings-line-stack">${exchange.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div></section>`).join("")}</div></div>`;
    focusExplorer.querySelectorAll("[data-age-play-all]").forEach((button) => button.addEventListener("click", () => {
      const exchange = scenes.find((entry) => entry.id === button.dataset.agePlayAll);
      if (!exchange || !state.tapAudioEnabled) return;
      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    }));
  }
  return { ageGameItems, resetAgeChallenge, ensureAgeChallenge, handleAgeChallengePlay, handleAgeChallengeGuess, ageBuildTarget, resetAgeBuilder, ensureAgeBuilder, handleAgeBuildToken, handleAgeBuildClear, renderAgeExplorer };
}
import { nextRandomCycleId } from "../../core/random-cycle.js";
