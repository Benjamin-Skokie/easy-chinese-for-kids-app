export function createTopicDetailRuntime(context) {
  const { state, books, schoolTopicData, topicPageUrl, topicIdFromLocation, lessonScopeFromLocation, viewFromLocation, bookSelect, lessonSelect, topicTitle, topicSummary, topicProgress, topicLessonStrip, subtopicShelf, focusDisplay, focusExplorer, currentTopic, currentNumberStage, focusItemsForTopic, currentFocusItem, currentBook, currentLesson, selectedTopicGroupId, bookCategoryForBook, categoryIdForTopic, narrowTopicBrowserTo, renderTopics, renderBooks, updateTopicPageVisibility, focusLearningPanel, renderFocusControls, renderFocusDisplay, renderFocusExplorer, renderFocusWordList, renderFocusStatus, renderActivityPanel, ensureBodyMatchGame, isFamilySentenceItemId, familyBookWordItems, usesLessonTemplate, syncBookSelectionFromTopic, switchView, updateLearningCultureNav } = context;

function selectBookLesson(bookId, lessonNumber) {
  const book = books.find((entry) => entry.id === bookId) ?? books[0];
  const lesson = book.lessons.find((entry) => entry.lesson === lessonNumber) ?? book.lessons[0];
  const lessonUrl = topicPageUrl(window.location, lesson.topicId, { bookId: book.id, lessonNumber: lesson.lesson });

  // Make the URL the source of truth before rendering. This keeps a lesson-card
  // selection reliable even when this topic is re-rendered by another control.
  window.history.pushState(null, "", lessonUrl);

  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  state.selectedBookId = book.id;
  state.selectedLessonNumber = lesson.lesson;
  state.selectedTopicId = lesson.topicId;
  state.lessonScope = lessonScopeFromLocation(window.location, books, lesson.topicId)
    ?? { bookId: book.id, lessonNumber: lesson.lesson };
  state.expandedCategoryId = categoryIdForTopic(lesson.topicId);
  state.topicPageOpen = true;
  narrowTopicBrowserTo(selectedTopicGroupId());
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
  focusLearningPanel();
}

function topicLessonTitle(step) {
  const lesson = books
    .find((book) => book.id === step.book.toLowerCase())
    ?.lessons.find((entry) => entry.lesson === step.lesson);
  return [lesson?.displayTitle?.zh, lesson?.displayTitle?.en].filter(Boolean).join(" · ") || step.title;
}

function renderTopicLessonStrip(topic) {
  if (!topicLessonStrip) {
    return;
  }

  const steps = topic.steps ?? [];
  if (!steps.length) {
    topicLessonStrip.innerHTML = "";
    topicLessonStrip.classList.add("is-hidden");
    return;
  }

  topicLessonStrip.classList.remove("is-hidden");
  const allContentCard = steps.length > 1
    ? `
      <button class="topic-lesson-card topic-lesson-card-all${state.lessonScope ? "" : " is-active"}" type="button" data-topic-all-content aria-label="Show all ${topic.title} content across books">
        <span class="topic-lesson-meta">Learn by topic</span>
        <strong>All topic content</strong>
      </button>
    `
    : "";
  topicLessonStrip.innerHTML = allContentCard + steps
    .map((step) => {
      const bookId = step.book.toLowerCase();
      const isActive = state.lessonScope?.bookId === bookId && state.lessonScope.lessonNumber === step.lesson;
      return `
        <button class="topic-lesson-card${isActive ? " is-active" : ""}" type="button" data-topic-lesson-source="${bookId}:${step.lesson}" aria-label="Show only Book ${step.book} Lesson ${step.lesson}: ${topicLessonTitle(step)}">
          <span class="topic-lesson-meta">Book ${step.book} Lesson ${step.lesson}</span>
          <strong>${topicLessonTitle(step)}</strong>
        </button>
      `;
    })
    .join("");
}

function linkInlineBookLessonBadges() {
  if (!focusExplorer) {
    return;
  }

  focusExplorer.querySelectorAll(".numbers-stage-card .body-match-kicker").forEach((badge) => {
    const match = badge.textContent.trim().match(/^(?:Book\s+)?([1-4][AB])\s+Lesson\s+(\d+)\b/i);
    if (!match) {
      return;
    }

    const bookId = match[1].toLowerCase();
    const lessonNumber = Number(match[2]);
    const lesson = books.find((book) => book.id === bookId)?.lessons.find((entry) => entry.lesson === lessonNumber);
    if (!lesson) {
      return;
    }

    const link = document.createElement("button");
    link.className = "inline-book-lesson-link";
    link.type = "button";
    link.dataset.topicLessonSource = `${bookId}:${lessonNumber}`;
    link.textContent = badge.textContent;
    link.setAttribute("aria-label", `Show only Book ${match[1].toUpperCase()} Lesson ${lessonNumber}: ${lesson.title}`);
    link.addEventListener("click", () => selectBookLesson(bookId, lessonNumber));
    badge.replaceWith(link);
  });
}

function renderSubtopicShelf() {
  if (!subtopicShelf) {
    return;
  }

  subtopicShelf.innerHTML = "";
  subtopicShelf.classList.add("is-hidden");
}

function renderTopicDetail() {
  // A scoped topic URL is the authoritative navigation state. Reapply it here
  // because this renderer can run after either topic or book navigation has
  // refreshed the shared controls.
  const scopedBook = state.lessonScope
    ? books.find((book) => book.id === state.lessonScope.bookId)
    : null;
  if (scopedBook) {
    state.selectedBookId = scopedBook.id;
    state.selectedBookCategoryId = bookCategoryForBook(scopedBook.id).id;
    state.selectedLessonNumber = state.lessonScope.lessonNumber;
  }

  const topic = currentTopic();
  const items = focusItemsForTopic(topic);

  if (topic.id !== "body") {
    state.lastBodyFeedback = "";
    if (topic.id !== "numbers") {
      state.lastNumberFeedback = "";
    }
  } else if (!state.selectedFocusItemId) {
    state.selectedFocusItemId = items[0].id;
    ensureBodyMatchGame();
  }

  if (topic.id !== "numbers" && state.numberChallengeAdvanceTimer) {
    window.clearTimeout(state.numberChallengeAdvanceTimer);
    state.numberChallengeAdvanceTimer = null;
  }

  const selectedItem = items.find((item) => item.id === state.selectedFocusItemId);
  if (topic.id === "family" && (!selectedItem || isFamilySentenceItemId(selectedItem.id))) {
    state.selectedFocusItemId = familyBookWordItems()[0]?.id ?? items[0].id;
  } else {
    state.selectedFocusItemId = selectedItem?.id ?? items[0].id;
  }

  topicTitle.textContent = topic.title;
  if (topicSummary) {
    const scope = state.lessonScope;
    const scopedStep = scope ? (topic.steps ?? []).find((step) => step.book.toLowerCase() === scope.bookId && step.lesson === scope.lessonNumber) : null;
    topicSummary.textContent = scopedStep?.note ?? topic.summary;
  }
  if (topicProgress) {
    topicProgress.textContent = topic.progressLabel;
  }
  renderTopicLessonStrip(topic);
  renderSubtopicShelf(topic);
  focusDisplay.classList.toggle(
    "is-hidden",
    topic.id === "body" ||
      topic.ownsExplorerContent ||
      usesLessonTemplate(topic) ||
      topic.id === "numbers" ||
      topic.id === "multiplication-rhyme" ||
      topic.id === "weekdays" ||
      topic.id === "time-date" ||
      topic.id === "dates" ||
      topic.id === "comparisons" ||
      topic.id === "positions" ||
      topic.id === "transport" ||
      topic.id === "daily-life" ||
      ["identity", "languages"].includes(topic.id) ||
      topic.id === "clothes" ||
      schoolTopicData[topic.id] ||
      (topic.id === "numbers" && currentNumberStage().telephoneMode)
  );
  renderFocusControls();
  renderFocusDisplay(currentFocusItem());
  renderFocusExplorer();
  linkInlineBookLessonBadges();
  renderFocusWordList();
  renderFocusStatus();

  renderActivityPanel(topic);
}

function bindTopicDetailEvents() {
topicLessonStrip.addEventListener("click", (event) => {
  const lessonCard = event.target.closest("[data-topic-lesson-source]");
  if (lessonCard) {
    const [bookId, lessonText] = lessonCard.dataset.topicLessonSource.split(":");
    selectBookLesson(bookId, Number(lessonText));
    return;
  }

  if (event.target.closest("[data-topic-all-content]")) {
    state.lessonScope = null;
    syncBookSelectionFromTopic();
    renderTopics();
    renderBooks();
    renderTopicDetail();
    window.history.pushState(null, "", topicPageUrl(window.location, currentTopic().id));
  }
});

bookSelect.addEventListener("change", () => {
  const book = books.find((entry) => entry.id === bookSelect.value) ?? currentBook();
  selectBookLesson(book.id, book.lessons[0].lesson);
});

lessonSelect.addEventListener("change", () => {
  const book = currentBook();
  const lesson = book.lessons.find((entry) => String(entry.lesson) === lessonSelect.value) ?? book.lessons[0];
  selectBookLesson(book.id, lesson.lesson);
});

window.addEventListener("scroll", () => {
  updateLearningCultureNav();
});

window.addEventListener("popstate", () => {
  const topicId = topicIdFromLocation(window.location, topicById);
  state.topicPageOpen = Boolean(topicId);
  if (topicId) {
    state.selectedTopicId = topicId;
    state.expandedCategoryId = categoryIdForTopic(topicId);
    const scope = lessonScopeFromLocation(window.location, books, topicId);
    state.lessonScope = scope;
    if (scope) {
      state.selectedBookId = scope.bookId;
      state.selectedBookCategoryId = bookCategoryForBook(scope.bookId).id;
      state.selectedLessonNumber = scope.lessonNumber;
    } else {
      syncBookSelectionFromTopic();
    }
  } else {
    state.lessonScope = null;
  }
  switchView(viewFromLocation(window.location));
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
});


}

  return { bindTopicDetailEvents, renderTopicDetail, selectBookLesson };
}
