export function createPoliteWordsController({
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
  elements
}) {
  const { focusExplorer, focusStatus } = elements;

  function politeGameItems() {
    const politeTopic = topicById("polite-words");
    return politeGameItemIds
      .map((id) => politeTopic?.focusItems.find((item) => item.id === id))
      .filter(Boolean);
  }

  function politeMeaningLabel(itemId) {
    const labels = {
      "thank-you": "Thank a friend who helped you",
      "youre-welcome": "Reply kindly after someone thanks you",
      sorry: "Say sorry after a mistake",
      "never-mind": "Forgive kindly after an apology"
    };

    return labels[itemId] ?? "";
  }

  function resetPoliteMatchGame(options = {}) {
    const items = politeGameItems();
    state.politeSelectedPhraseId = null;
    state.politeMatchedIds = new Set();
    state.politePhraseOrder = shuffleArray(items.map((item) => item.id));
    state.politeMeaningOrder = shuffleArray(items.map((item) => item.id));
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
    state.lastPoliteFeedback = state.politeMatchFeedback;
    renderActivityPanel(currentTopic());
  }

  function resetPoliteChallenge(options = {}) {
    const items = politeGameItems();
    if (!items.length) {
      return;
    }

    const answerChoices = items.filter((item) => item.id !== options.excludeId);
    const answerPool = answerChoices.length ? answerChoices : items;
    const answer = answerPool[Math.floor(Math.random() * answerPool.length)];
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
      if (state.tapAudioEnabled) {
        speak(answer.audio, 0.78);
      }
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
    focusExplorer.innerHTML = `
      <div class="numbers-board">
        <div class="numbers-stage-card">
          <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
          <h4>Book theme: kind classroom language</h4>
          <p>This topic starts with thank you and sorry, then grows into kind replies and polite requests.</p>
        </div>
        <div class="greetings-practice-grid">
          ${politePractice.map((exchange) => `
            <section class="greetings-exchange">
              <div class="greetings-exchange-top">
                <div>
                  <p class="body-match-kicker">Scene ${exchange.number}</p>
                  <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                </div>
                <button class="small-button is-play-button" type="button" data-polite-play-all="${exchange.id}">Play</button>
              </div>
              <div class="greetings-scene-layout">
                <div class="greetings-scene-visual">
                  <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                </div>
                <div class="greetings-line-stack">
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
      </div>
    `;

    focusExplorer.querySelectorAll("[data-polite-play-all]").forEach((button) => {
      button.addEventListener("click", () => {
        const exchange = politePractice.find((entry) => entry.id === button.dataset.politePlayAll);
        if (!exchange || !state.tapAudioEnabled) {
          return;
        }

        speakSceneLines(exchange.lines);
        focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
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
