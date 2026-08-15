export function createFocusRuntime(context) {
  const {
    state,
    elements: { focusStatus, focusWordList },
    getCurrentTopic,
    getCurrentNumberStage,
    getFocusItemsForTopic,
    getCurrentFocusItem,
    getFoundations,
    timeDateExpressionItems,
    speak,
    renderFocusDisplay,
    renderFocusExplorer
  } = context;
  const currentTopic = () => getCurrentTopic();
  const currentNumberStage = () => getCurrentNumberStage();
  const focusItemsForTopic = (topic) => getFocusItemsForTopic(topic);
  const currentFocusItem = () => getCurrentFocusItem();
  const usesLessonTemplate = (...args) => getFoundations().usesLessonTemplate(...args);
  const numberWordListItems = (...args) => getFoundations().numberWordListItems(...args);
  const bookWordItemsForTopic = (...args) => getFoundations().bookWordItemsForTopic(...args);
  const usefulNoteForTopic = (...args) => getFoundations().usefulNoteForTopic(...args);

function bodySentenceForItem(item) {
  return {
    hanzi: `我的${item.hanzi}`,
    pinyin: `wǒ de ${item.pinyin}`,
    english: `my ${item.english}`
  };
}

function renderFocusStatus() {
  const topic = currentTopic();

  if (topic.id === "body") {
    focusStatus.textContent =
      state.lastBodyFeedback || "Tap a body word to hear it, then point to the same part.";
    return;
  }

  if (topic.id === "numbers") {
    const stage = currentNumberStage();
    focusStatus.textContent =
      stage.telephoneMode
        ? "Listen to the question, then the answer. Telephone numbers are for speaking and listening, not counting objects."
        : state.lastNumberFeedback || `Now learning ${stage.title}. ${stage.summary}`;
    return;
  }

  if (usesLessonTemplate(topic)) {
    focusStatus.textContent = "";
    return;
  }

  if (topic.id === "time-date") {
    focusStatus.textContent = "";
    return;
  }

  if (topic.id === "weekdays" || topic.id === "dates") {
    focusStatus.textContent = "";
    return;
  }

  focusStatus.textContent = "";
}

function selectFocusItem(itemId, options = {}) {
  const topic = currentTopic();
  const items = focusItemsForTopic(topic);
  const item = items.find((entry) => entry.id === itemId) ?? items[0];

  state.selectedFocusItemId = item.id;
  if (topic.id === "body") {
    state.lastBodyFeedback =
      options.bodyFeedback ?? `Showing ${item.hanzi}${state.showEnglish ? ` (${item.english})` : ""}.`;
  }
  renderFocusDisplay(item);
  renderFocusWordList();
  renderFocusExplorer();
  renderFocusStatus();

  if (options.playAudio && state.tapAudioEnabled) {
    speak(options.audioText ?? item.audio, 0.78, options.voiceNames);
  }
}

function renderFocusWordList() {
  if (
    currentTopic().ownsExplorerContent ||
    ["body", "dates", "comparisons", "positions", "transport", "daily-life", "multiplication-rhyme", "identity", "stationery", "school-supplies", "classroom", "school", "school-subjects", "food", "food-preferences", "meals-feelings"].includes(currentTopic().id) ||
    (currentTopic().id === "numbers" && currentNumberStage().telephoneMode)
  ) {
    focusWordList.innerHTML = "";
    focusWordList.classList.add("is-hidden");
    return;
  }

  focusWordList.classList.remove("is-hidden");
  const topic = currentTopic();
  const items = focusItemsForTopic();
  const isLessonTemplate = usesLessonTemplate(topic);
  const showBookWordsHeading = isLessonTemplate || topic.id === "clothes" || topic.id === "time-date" || topic.id === "weekdays";
  focusWordList.classList.toggle("is-family-book-words", showBookWordsHeading);
  const visibleItems =
    topic.id === "numbers"
      ? numberWordListItems(items, currentFocusItem(), currentNumberStage())
      : topic.id === "time-date"
        ? timeDateExpressionItems
      : isLessonTemplate
        ? bookWordItemsForTopic(topic)
        : items;
  focusWordList.innerHTML = "";

  if (showBookWordsHeading) {
    const heading = document.createElement("div");
    heading.className = "family-book-words-heading";
    heading.innerHTML = `
      <p class="body-match-kicker">Book words</p>
    `;
    focusWordList.appendChild(heading);
  }

  visibleItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "focus-word-button";
    if (item.id === state.selectedFocusItemId) {
      button.classList.add("is-selected");
    }

    button.innerHTML = `
      <span class="focus-word-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="focus-word-label">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="focus-helper">${item.english}</span>` : ""}
    `;

    button.addEventListener("click", () => {
      if (topic.id === "time-date" || topic.id === "weekdays") {
        if (topic.id === "weekdays") {
          state.selectedFocusItemId = item.id;
          renderFocusWordList();
        }
        if (state.tapAudioEnabled) speak(topic.id === "weekdays" ? item.hanzi : item.audio, 0.78);
        return;
      }
      selectFocusItem(item.id, { playAudio: true });
    });

    focusWordList.appendChild(button);
  });

  const noteMarkup = usefulNoteForTopic(topic);
  if (noteMarkup) {
    const note = document.createElement("div");
    note.className = "greetings-note-card family-book-words-note";
    note.innerHTML = `
      <p class="body-match-kicker">Useful note</p>
      ${noteMarkup}
    `;
    focusWordList.appendChild(note);
  }
}


  return { bodySentenceForItem, renderFocusStatus, renderFocusWordList, selectFocusItem };
}
