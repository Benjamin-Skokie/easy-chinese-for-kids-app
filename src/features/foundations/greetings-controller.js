export function createGreetingsController({
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
  elements
}) {
  const { focusExplorer, focusStatus } = elements;

  function greetingsGameItems() {
    const greetingsTopic = topicById("greetings");
    return greetingsGameItemIds
      .map((id) => greetingsTopic?.focusItems.find((item) => item.id === id))
      .filter(Boolean);
  }

  function resetGreetingsChallenge(options = {}) {
    const items = greetingsGameItems();
    if (!items.length) {
      return;
    }

    const answerId = nextRandomCycleId(state, "greetings-listen", items.map((item) => item.id));
    const answer = items.find((item) => item.id === answerId);
    if (!answer) return;
    const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
      0,
      Math.min(3, Math.max(0, items.length - 1))
    );

    state.greetingsChallengeAnswerId = answer.id;
    state.greetingsChallengePickedId = "";
    state.greetingsChallengePromptId = answer.id;
    state.greetingsChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
    state.greetingsChallengeResult = "";
    state.greetingsChallengeWrongIds = new Set();
    state.greetingsListenFeedback = options.feedback ?? "";
    state.lastGreetingsFeedback = state.greetingsListenFeedback;
  }

  function ensureGreetingsChallenge() {
    if (!state.greetingsChallengeAnswerId || !state.greetingsChallengeOptionIds.length) {
      resetGreetingsChallenge();
    }
  }

  function greetingsMeaningLabel(itemId) {
    const labels = {
      hello: "Say hello to a friend",
      "teacher-hello": "Greet Teacher Li politely",
      "good-morning": "Say good morning at the start of the day",
      goodbye: "Say goodbye when leaving"
    };

    return labels[itemId] ?? "";
  }

  function resetGreetingsMatchGame(options = {}) {
    const items = greetingsGameItems();
    state.greetingsSelectedPhraseId = null;
    state.greetingsMatchedIds = new Set();
    state.greetingsPhraseOrder = shuffleArray(items.map((item) => item.id));
    state.greetingsMeaningOrder = shuffleArray(items.map((item) => item.id));
    state.greetingsMatchWrongPhraseIds = new Set();
    state.greetingsMatchWrongMeaningIds = new Set();
    state.greetingsMatchFeedback = options.feedback ?? "";
    state.lastGreetingsFeedback = state.greetingsMatchFeedback;
  }

  function ensureGreetingsMatchGame() {
    const items = greetingsGameItems();
    if (
      !state.greetingsPhraseOrder.length ||
      state.greetingsPhraseOrder.length !== items.length ||
      state.greetingsMeaningOrder.length !== items.length
    ) {
      resetGreetingsMatchGame();
    }
  }

  function handleGreetingsMatchPhrase(itemId) {
    const item = greetingsGameItems().find((entry) => entry.id === itemId);
    if (!item || state.greetingsMatchedIds.has(itemId)) {
      return;
    }

    state.greetingsSelectedPhraseId = itemId;
    if (state.tapAudioEnabled) {
      speak(item.audio, 0.78);
    }
    state.greetingsMatchFeedback = `Now find the situation for ${item.hanzi}.`;
    state.lastGreetingsFeedback = state.greetingsMatchFeedback;
    renderActivityPanel(currentTopic());
  }

  function handleGreetingsMatchAttempt(targetId) {
    if (!state.greetingsSelectedPhraseId || state.greetingsMatchedIds.has(targetId)) {
      return;
    }

    const selectedId = state.greetingsSelectedPhraseId;
    const selectedItem = greetingsGameItems().find((entry) => entry.id === selectedId);
    if (!selectedItem) {
      return;
    }

    if (selectedId === targetId) {
      state.greetingsMatchedIds = new Set([...state.greetingsMatchedIds, targetId]);
      state.greetingsSelectedPhraseId = null;
      state.greetingsMatchFeedback = `Correct! ${selectedItem.hanzi} matches that situation.`;
      state.lastGreetingsFeedback = state.greetingsMatchFeedback;
      state.selectedFocusItemId = selectedItem.id;
      renderFocusDisplay(currentFocusItem());
      renderFocusExplorer();
      renderFocusStatus();

      if (state.greetingsMatchedIds.size === greetingsGameItems().length) {
        state.greetingsMatchFeedback = "Great job! You matched all the greetings.";
        state.lastGreetingsFeedback = state.greetingsMatchFeedback;
      }
      renderActivityPanel(currentTopic());
      return;
    }

    state.greetingsMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that situation.`;
    state.greetingsMatchWrongPhraseIds = new Set([...state.greetingsMatchWrongPhraseIds, selectedId]);
    state.greetingsMatchWrongMeaningIds = new Set([...state.greetingsMatchWrongMeaningIds, targetId]);
    state.lastGreetingsFeedback = state.greetingsMatchFeedback;
    renderActivityPanel(currentTopic());
  }

  function handleGreetingsChallengePlay() {
    ensureGreetingsChallenge();
    if (state.greetingsChallengeResult === "correct") {
      resetGreetingsChallenge({
        excludeId: state.greetingsChallengeAnswerId,
        feedback: "Listen carefully, then tap the matching card."
      });
      const nextItem = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengePromptId);
      if (nextItem && state.tapAudioEnabled) {
        speak(nextItem.audio, 0.78);
      }
      renderActivityPanel(currentTopic());
      return;
    }

    const item = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengePromptId);
    if (!item) {
      return;
    }

    resetListenChallengeResult("greetings");
    if (state.tapAudioEnabled) {
      speak(item.audio, 0.78);
    }
    state.greetingsListenFeedback = `Listen again and find ${item.hanzi}.`;
    state.lastGreetingsFeedback = state.greetingsListenFeedback;
    renderActivityPanel(currentTopic());
  }

  function handleGreetingsChallengeGuess(itemId) {
    ensureGreetingsChallenge();
    const answer = greetingsGameItems().find((entry) => entry.id === state.greetingsChallengeAnswerId);
    const picked = greetingsGameItems().find((entry) => entry.id === itemId);
    if (!answer || !picked) {
      return;
    }

    if (itemId === answer.id) {
      state.selectedFocusItemId = answer.id;
      state.greetingsChallengePickedId = itemId;
      state.greetingsChallengeResult = "correct";
      if (state.tapAudioEnabled) {
        speak(answer.audio, 0.78);
      }
      state.greetingsListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
      state.lastGreetingsFeedback = state.greetingsListenFeedback;
      renderFocusDisplay(currentFocusItem());
      renderFocusExplorer();
      renderFocusStatus();
      renderActivityPanel(currentTopic());
      return;
    }

    state.greetingsChallengePickedId = itemId;
    state.greetingsChallengeResult = "wrong";
    state.greetingsChallengeWrongIds = new Set([...state.greetingsChallengeWrongIds, itemId]);
    state.greetingsListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
    state.lastGreetingsFeedback = state.greetingsListenFeedback;
    renderActivityPanel(currentTopic());
  }

  function renderGreetingsExplorer() {
    focusExplorer.innerHTML = `
      <div class="numbers-board">
        <div class="numbers-stage-card">
          <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
          <h4>Book theme: school greetings</h4>
          <p>This lesson follows the book page: greet a teacher politely, greet a friend in the morning, and say goodbye.</p>
        </div>
        <div class="greetings-practice-grid">
          ${greetingsPractice
            .map(
              (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                  <div><p class="body-match-kicker">${exchange.title}</p></div>
                    <button class="small-button is-play-button" type="button" data-greeting-play-all="${exchange.id}">Play</button>
                  </div>
                  <div class="greetings-scene-layout">
                    <div class="greetings-scene-visual">
                      <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                    </div>
                      <div class="greetings-line-stack">
                      ${exchange.lines
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
      </div>
    `;

    focusExplorer.querySelectorAll("[data-greeting-play-all]").forEach((button) => {
      button.addEventListener("click", () => {
        const exchange = greetingsPractice.find((entry) => entry.id === button.dataset.greetingPlayAll);
        if (!exchange || !state.tapAudioEnabled) {
          return;
        }

        speakSceneLines(exchange.lines);
        focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
      });
    });
  }

  return {
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
  };
}
import { nextRandomCycleId } from "../../core/random-cycle.js";
