export function createTopicDetailRuntime(context) {
  const { state, books, numberStages, schoolTopicData, topicPageUrl, topicIdFromLocation, viewFromLocation, bookSelect, lessonSelect, topicTitle, topicSummary, topicProgress, topicLessonStrip, subtopicShelf, focusDisplay, focusExplorer, currentTopic, currentNumberStage, focusItemsForTopic, currentFocusItem, currentBook, currentLesson, selectedTopicGroupId, bookCategoryForBook, categoryIdForTopic, narrowTopicBrowserTo, renderTopics, renderBooks, updateTopicPageVisibility, focusLearningPanel, renderFocusControls, renderFocusDisplay, renderFocusExplorer, renderFocusWordList, renderFocusStatus, renderActivityPanel, ensureBodyMatchGame, isFamilySentenceItemId, familyBookWordItems, usesLessonTemplate, syncBookSelectionFromTopic, switchView, updateLearningCultureNav } = context;

function selectBookLesson(bookId, lessonNumber) {
  const book = books.find((entry) => entry.id === bookId) ?? books[0];
  const lesson = book.lessons.find((entry) => entry.lesson === lessonNumber) ?? book.lessons[0];

  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  state.selectedBookId = book.id;
  state.selectedLessonNumber = lesson.lesson;
  state.selectedTopicId = lesson.topicId;
  state.expandedCategoryId = categoryIdForTopic(lesson.topicId);
  state.topicPageOpen = true;
  narrowTopicBrowserTo(selectedTopicGroupId());
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();
  window.history.pushState(null, "", topicPageUrl(window.location, lesson.topicId));
  focusLearningPanel();
}

function viewBookLessonSource(bookId, lessonNumber) {
  const book = books.find((entry) => entry.id === bookId);
  const lesson = book?.lessons.find((entry) => entry.lesson === lessonNumber);
  if (!book || !lesson) {
    return;
  }

  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  state.selectedBookId = book.id;
  state.selectedLessonNumber = lesson.lesson;
  state.selectedTopicId = lesson.topicId;
  state.topicPageOpen = false;
  renderTopics();
  renderBooks();
  updateTopicPageVisibility();
  switchView("books");
  window.history.pushState(null, "", `${window.location.pathname}?view=books#book-lessons-${book.id}`);

  window.requestAnimationFrame(() => {
    document.querySelector(`[data-book-lesson="${book.id}:${lesson.lesson}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

function topicLessonTitle(topic, step) {
  if (topic.id !== "numbers") {
    return step.title;
  }

  const stage = numberStages.find(
    (entry) => entry.bookId === step.book.toLowerCase() && entry.lesson === step.lesson
  );
  return stage?.title ?? step.title;
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

  const current = currentLesson();
  topicLessonStrip.classList.remove("is-hidden");
  topicLessonStrip.innerHTML = steps
    .map((step) => {
      const bookId = step.book.toLowerCase();
      const isActive = currentBook().id === bookId && current.lesson === step.lesson;
      return `
        <button class="topic-lesson-card${isActive ? " is-active" : ""}" type="button" data-topic-lesson-source="${bookId}:${step.lesson}" aria-label="View Book ${step.book} Lesson ${step.lesson}: ${step.title} in Learn by Books">
          <span class="topic-lesson-meta">Book ${step.book} Lesson ${step.lesson}</span>
          <strong>${topicLessonTitle(topic, step)}</strong>
        </button>
      `;
    })
    .join("");

  topicLessonStrip.querySelectorAll("[data-topic-lesson-source]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonText] = button.dataset.topicLessonSource.split(":");
      viewBookLessonSource(bookId, Number(lessonText));
    });
  });
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
    link.setAttribute("aria-label", `View Book ${match[1].toUpperCase()} Lesson ${lessonNumber}: ${lesson.title} in Learn by Books`);
    link.addEventListener("click", () => viewBookLessonSource(bookId, lessonNumber));
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
    topicSummary.textContent = topic.summary;
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
    syncBookSelectionFromTopic();
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
