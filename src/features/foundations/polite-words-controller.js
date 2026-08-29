export function createPoliteWordsController({
  state,
  politeGameItemIds,
  politePractice,
  requestGameItemIds,
  requestPractice,
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
  elements
}) {
  const { focusExplorer, focusStatus } = elements;

  function activeLesson() {
    const isRequestLesson = currentTopic().id === "requests-permission";
    return {
      topicId: isRequestLesson ? "requests-permission" : "polite-words",
      gameItemIds: isRequestLesson ? requestGameItemIds : politeGameItemIds,
      practice: isRequestLesson ? requestPractice : politePractice,
      title: isRequestLesson ? "Book theme: asking permission" : "Book theme: kind classroom language",
      introduction: isRequestLesson ? "Ask with 我可以…吗？, then listen for 可以 or 不行." : "Use thank you, sorry, and please in kind everyday classroom moments.",
      note: isRequestLesson
        ? `<p class="greetings-note-hanzi">我可以……吗？ / 可以 / 不行</p><p class="greetings-note-copy"><strong>我可以…吗？</strong> asks permission and ends with <strong>吗</strong>.</p><p class="greetings-note-copy"><strong>可以。</strong> means yes; <strong>不行。</strong> means no. The book practises this with actions such as <strong>喝水</strong>, <strong>吃饭</strong>, and <strong>去厕所</strong>.</p>`
        : `<p class="greetings-note-hanzi">谢谢 / 不客气 / 对不起 / 没关系</p><p class="greetings-note-copy"><strong>谢谢你</strong> means “thank you,” and <strong>不客气</strong> is the kind reply: “you’re welcome.”</p><p class="greetings-note-copy"><strong>对不起</strong> is an apology; <strong>没关系</strong> is a gentle response.</p>`
    };
  }

  function politeGameItems() {
    const lesson = activeLesson();
    const politeTopic = topicById(lesson.topicId);
    return lesson.gameItemIds
      .map((id) => politeTopic?.focusItems.find((item) => item.id === id))
      .filter(Boolean);
  }

  function politeMeaningLabel(itemId) {
    const labels = {
      "thank-you": "Thank a friend who helped you",
      "youre-welcome": "Reply kindly after someone thanks you",
      sorry: "Say sorry after a mistake",
      "never-mind": "Forgive kindly after an apology",
      "ask-teacher": "Ask politely before speaking with the teacher"
    };

    if (currentTopic().id === "requests-permission") {
      return {
        "ask-teacher": "May I ask the teacher a question?",
        "ask-tv": "May I watch TV?",
        "ask-cola": "May I drink Coke?",
        "no-water": "No. You may drink water.",
        "yes-permission": "Yes, you may.",
        "no-permission": "No, you may not."
      }[itemId] ?? "";
    }

    return labels[itemId] ?? "";
  }

  function resetPoliteMatchGame(options = {}) {
    const items = politeGameItems();
    state.politeSelectedPhraseId = null;
    state.politeMatchedIds = new Set();
    state.politePhraseOrder = shuffleArray(items.map((item) => item.id));
    state.politeMeaningOrder = shuffleArray(items.map((item) => item.id));
    state.politeMatchWrongPhraseIds = new Set();
    state.politeMatchWrongMeaningIds = new Set();
    state.politeMatchFeedback = options.feedback ?? "";
    state.lastPoliteFeedback = state.politeMatchFeedback;
  }

  function ensurePoliteMatchGame() {
    const items = politeGameItems();
    if (
      !state.politePhraseOrder.length ||
      state.politePhraseOrder.length !== items.length ||
      state.politeMeaningOrder.length !== items.length
    ) {
      resetPoliteMatchGame();
    }
  }

  function handlePoliteMatchPhrase(itemId) {
    const item = politeGameItems().find((entry) => entry.id === itemId);
    if (!item || state.politeMatchedIds.has(itemId)) {
      return;
    }

    state.politeSelectedPhraseId = itemId;
    if (state.tapAudioEnabled) {
      speak(item.audio, 0.78);
    }
    state.politeMatchFeedback = `Now find the meaning for ${item.hanzi}.`;
    state.lastPoliteFeedback = state.politeMatchFeedback;
    renderActivityPanel(currentTopic());
  }

  function handlePoliteMatchAttempt(targetId) {
    if (!state.politeSelectedPhraseId || state.politeMatchedIds.has(targetId)) {
      return;
    }

    const selectedId = state.politeSelectedPhraseId;
    const selectedItem = politeGameItems().find((entry) => entry.id === selectedId);
    if (!selectedItem) {
      return;
    }

    if (selectedId === targetId) {
      state.politeMatchedIds = new Set([...state.politeMatchedIds, targetId]);
      state.politeSelectedPhraseId = null;
      state.politeMatchFeedback = `Correct! ${selectedItem.hanzi} matches that meaning.`;
      state.lastPoliteFeedback = state.politeMatchFeedback;
      state.selectedFocusItemId = selectedItem.id;
      renderFocusDisplay(currentFocusItem());
      renderFocusExplorer();
      renderFocusStatus();

      if (state.politeMatchedIds.size === politeGameItems().length) {
        state.politeMatchFeedback = "Great job! You matched all the polite phrases.";
        state.lastPoliteFeedback = state.politeMatchFeedback;
      }
      renderActivityPanel(currentTopic());
      return;
    }

    state.politeMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that meaning.`;
    state.politeMatchWrongPhraseIds = new Set([...state.politeMatchWrongPhraseIds, selectedId]);
    state.politeMatchWrongMeaningIds = new Set([...state.politeMatchWrongMeaningIds, targetId]);
    state.lastPoliteFeedback = state.politeMatchFeedback;
    renderActivityPanel(currentTopic());
  }

  function resetPoliteChallenge(options = {}) {
    const items = politeGameItems();
    if (!items.length) {
      return;
    }

    const answerId = nextRandomCycleId(state, "polite-words-listen", items.map((item) => item.id));
    const answer = items.find((item) => item.id === answerId);
    if (!answer) return;
    const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
      0,
      Math.min(3, Math.max(0, items.length - 1))
    );

    state.politeChallengeAnswerId = answer.id;
    state.politeChallengePickedId = "";
    state.politeChallengePromptId = answer.id;
    state.politeChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
    state.politeChallengeResult = "";
    state.politeChallengeWrongIds = new Set();
    state.politeListenFeedback = options.feedback ?? "";
    state.lastPoliteFeedback = state.politeListenFeedback;
  }

  function ensurePoliteChallenge() {
    if (!state.politeChallengeAnswerId || !state.politeChallengeOptionIds.length) {
      resetPoliteChallenge();
    }
  }

  function handlePoliteChallengePlay() {
    const previousPromptId = state.politeChallengePromptId;
    resetPoliteChallenge({ excludeId: previousPromptId });
    const item = politeGameItems().find((entry) => entry.id === state.politeChallengePromptId);
    if (!item) {
      return;
    }

    if (state.tapAudioEnabled) {
      speak(item.audio, 0.78);
    }
    state.politeListenFeedback = "Listen carefully, then tap the matching card.";
    state.lastPoliteFeedback = state.politeListenFeedback;
    renderActivityPanel(currentTopic());
  }

  function handlePoliteChallengeGuess(itemId) {
    ensurePoliteChallenge();
    const answer = politeGameItems().find((entry) => entry.id === state.politeChallengeAnswerId);
    const picked = politeGameItems().find((entry) => entry.id === itemId);
    if (!answer || !picked) {
      return;
    }

    if (itemId === answer.id) {
      state.selectedFocusItemId = answer.id;
      state.politeChallengePickedId = itemId;
      state.politeChallengeResult = "correct";
      state.politeListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
      state.lastPoliteFeedback = state.politeListenFeedback;
      renderFocusDisplay(currentFocusItem());
      renderFocusExplorer();
      renderFocusStatus();
      renderActivityPanel(currentTopic());
      return;
    }

    state.politeChallengePickedId = itemId;
    state.politeChallengeResult = "wrong";
    state.politeChallengeWrongIds = new Set([...state.politeChallengeWrongIds, itemId]);
    state.politeListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
    state.lastPoliteFeedback = state.politeListenFeedback;
    renderActivityPanel(currentTopic());
  }

  function renderPoliteWordsExplorer() {
    const lesson = activeLesson();
    const isRequestLesson = currentTopic().id === "requests-permission";
    const topic = topicById(lesson.topicId);
    const words = topic?.bookWords ?? topic?.focusItems ?? [];
    focusExplorer.innerHTML = `
      <div class="numbers-board">
        ${isRequestLesson ? "" : `<div class="numbers-stage-card">
          <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
          <h4>${lesson.title}</h4>
          <p>${lesson.introduction}</p>
        </div>`}
        <div class="greetings-practice-grid polite-scene-grid">
          ${lesson.practice.map((exchange) => `
            <section class="greetings-exchange${currentTopic().id === "requests-permission" && exchange.id === "cola-or-water" ? " is-request-cola-scene" : ""}${currentTopic().id === "requests-permission" && exchange.id === "school-request-teacher-help" ? " is-request-teacher-scene" : ""}">
              <div class="greetings-exchange-top">
                <div><p class="body-match-kicker">${exchange.title}</p></div>
                <button class="small-button is-play-button" type="button" data-polite-play-all="${exchange.id}">Play</button>
              </div>
              <div class="greetings-scene-layout polite-scene-layout">
                <div class="greetings-scene-visual">
                  <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                </div>
                <div class="greetings-line-stack${currentTopic().id === "requests-permission" ? ` is-request-lines${exchange.id === "cola-or-water" ? " is-request-cola-lines" : ""}` : ""}">
                  ${exchange.lines.map((line) => `
                    <article class="greetings-line-card">
                      <div class="telephone-bubble-copy">
                        <p class="telephone-line-hanzi">${line.hanzi}</p>
                        ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                        ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                      </div>
                    </article>
                  `).join("")}
                </div>
              </div>
            </section>
          `).join("")}
        </div>
        <section class="school-lesson-section polite-book-words">
          <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
          <div class="school-word-grid is-text-only">
            ${words.map((word) => `<button class="school-word-card is-text-only" type="button" data-polite-word="${word.id}"><span class="time-asset-hanzi">${word.hanzi}</span>${state.showPinyin ? `<span class="time-asset-pinyin">${word.pinyin}</span>` : ""}${state.showEnglish ? `<span class="time-asset-english">${word.english}</span>` : ""}</button>`).join("")}
          </div>
        </section>
        <section class="greetings-note-card polite-useful-note">
          <p class="body-match-kicker">Notes</p>
          ${lesson.note}
        </section>
      </div>
    `;

    focusExplorer.querySelectorAll("[data-polite-play-all]").forEach((button) => {
      button.addEventListener("click", () => {
        const exchange = lesson.practice.find((entry) => entry.id === button.dataset.politePlayAll);
        if (!exchange || !state.tapAudioEnabled) {
          return;
        }

        speakSceneLines(exchange.lines);
        focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
      });
    });
    focusExplorer.querySelectorAll("[data-polite-word]").forEach((button) => {
      button.addEventListener("click", () => {
        const word = words.find((entry) => entry.id === button.dataset.politeWord);
        if (word && state.tapAudioEnabled) speak(word.audio, 0.78);
      });
    });
  }

  return {
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
  };
}
import { nextRandomCycleId } from "../../core/random-cycle.js";
