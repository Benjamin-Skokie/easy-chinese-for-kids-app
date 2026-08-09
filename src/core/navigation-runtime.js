export function createNavigationRuntime(context) {
  const { state, topicData, books, topicGroups, learningHomeCategories, bookHomeCategories, topicCardMeta, topicPageUrl, topicGroupsRoot, bookSelect, lessonSelect, lookupCard, bookBrowser, topicPanel, bookPanel, detailLayout, learningCultureNav, numberStages, timeDateWeekItems, getNumberStageItems, renderFocusControls, renderFocusDisplay, renderFocusWordList, renderFocusExplorer, renderActivityPanel, renderTopicDetail, updateDisplayControls, selectBookLesson } = context;

function currentTopic() {
  return topicData.find((topic) => topic.id === state.selectedTopicId) ?? topicData[0];
}

function currentNumberStage() {
  const lesson = currentLesson();
  return (
    numberStages.find((stage) => stage.bookId === currentBook().id && stage.lesson === lesson.lesson) ??
    numberStages[0]
  );
}

function focusItemsForTopic(topic = currentTopic()) {
  if (topic.id === "numbers") {
    return getNumberStageItems();
  }

  if (topic.id === "weekdays") {
    return timeDateWeekItems;
  }

  return topic.focusItems ?? [{ id: "focus", ...topic.focus }];
}

function currentFocusItem() {
  const items = focusItemsForTopic();
  return items.find((item) => item.id === state.selectedFocusItemId) ?? items[0];
}


function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function topicById(topicId) {
  return topicData.find((topic) => topic.id === topicId);
}

function selectedTopicGroupId() {
  return (
    topicGroups.find((group) => group.topicIds.includes(state.selectedTopicId))?.id ??
    topicGroups[0].id
  );
}

function bookById(bookId) {
  return books.find((book) => book.id === bookId) ?? books[0];
}

function bookCategoryForBook(bookId) {
  return bookHomeCategories.find((category) => category.bookIds.includes(bookId)) ?? bookHomeCategories[0];
}

function currentBook() {
  return bookById(state.selectedBookId);
}

function currentLesson() {
  const book = currentBook();
  const exactLesson = book.lessons.find((lesson) => lesson.lesson === state.selectedLessonNumber);
  if (exactLesson && exactLesson.topicId === state.selectedTopicId) {
    return exactLesson;
  }

  return book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
}

function syncBookSelectionFromTopic() {
  const topic = currentTopic();
  const firstMatch = books.find((book) =>
    book.lessons.some((lesson) => topic.steps.some((step) => book.id === step.book.toLowerCase() && step.lesson === lesson.lesson))
  );

  if (firstMatch) {
    state.selectedBookId = firstMatch.id;
    state.selectedBookCategoryId = bookCategoryForBook(firstMatch.id).id;
  }

  syncLessonSelectionFromTopic();
}

function syncLessonSelectionFromTopic() {
  const book = currentBook();
  const firstMatch = book.lessons.find((lesson) => lesson.topicId === state.selectedTopicId) ?? book.lessons[0];
  state.selectedLessonNumber = firstMatch.lesson;
}

function focusLearningPanel() {
  if (!detailLayout) {
    return;
  }

  scrollToSectionTop(detailLayout);
}

function scrollToSectionTop(element) {
  if (!element) {
    return;
  }

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  const stickyNavHeight = learningCultureNav?.getBoundingClientRect().height ?? 0;
  const targetTop = Math.max(0, window.scrollY + element.getBoundingClientRect().top - stickyNavHeight);
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, targetTop);
  root.style.scrollBehavior = previousScrollBehavior;
}

function narrowTopicBrowserTo(groupId) {
  state.openTopicGroups = new Set([groupId]);
}

function categoryIdForTopic(topicId) {
  return learningHomeCategories.find((category) => category.topicIds.includes(topicId))?.id ?? "foundations";
}

function updateTopicPageVisibility() {
  detailLayout?.classList.toggle("is-hidden", !state.topicPageOpen);
  document.body.classList.toggle("is-topic-page", state.topicPageOpen);
}

function scrollCategorySectionIntoView(categoryId) {
  requestAnimationFrame(() => {
    scrollToSectionTop(document.getElementById(categoryId));
  });
}

function openTopicPage(topicId, options = {}) {
  const topic = topicById(topicId);
  if (!topic) {
    return;
  }

  state.selectedTopicId = topic.id;
  state.expandedCategoryId = categoryIdForTopic(topic.id);
  state.topicPageOpen = true;
  renderTopics();
  renderBooks();
  renderTopicDetail();
  updateTopicPageVisibility();

  const nextUrl = topicPageUrl(window.location, topic.id);
  if (options.replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }

  if (options.scroll !== false) {
    focusLearningPanel();
  }
}

function switchView(view) {
  state.currentView = view;
  document.querySelectorAll(".view-tab").forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  topicPanel.classList.toggle("is-hidden", view !== "topics");
  bookPanel.classList.toggle("is-hidden", view !== "books");
  document.querySelectorAll("[data-global-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.globalView === view);
  });
  renderStickyNav();
  updateLearningCultureNav();
}

function toggleTopicGroup(groupId) {
  if (state.openTopicGroups.has(groupId)) {
    state.openTopicGroups.delete(groupId);
  } else {
    state.openTopicGroups.add(groupId);
  }

  renderTopics();
}

function renderTopicScene(topic) {
  const style = `background: linear-gradient(180deg, ${topic.iconColor}, ${topic.iconColor}dd); --topic-accent:${topic.iconAccent ?? "#f5d9a6"};`;

  if (topic.id === "numbers") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-numbers" style="${style}">
        <span class="topic-scene-dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
        <span class="topic-scene-chip-row" aria-hidden="true">
          <span class="topic-scene-chip">一</span>
          <span class="topic-scene-chip">二</span>
          <span class="topic-scene-chip">三</span>
        </span>
      </span>
    `;
  }

  if (topic.id === "multiplication-rhyme") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-rhyme" style="${style}">
        <span class="topic-scene-rhyme-row" aria-hidden="true">
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip">九</span>
          <span class="topic-scene-chip topic-scene-chip-accent">81</span>
        </span>
        <span class="topic-scene-rhythm-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "greetings") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-greetings" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-left" aria-hidden="true">你</span>
        <span class="topic-scene-bubble topic-scene-bubble-right" aria-hidden="true">好</span>
        <span class="topic-scene-spark topic-scene-spark-top" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "polite-words") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-polite" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-wide" aria-hidden="true">谢谢</span>
        <span class="topic-scene-heart" aria-hidden="true"></span>
      </span>
    `;
  }

  if (topic.id === "introductions") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-intro" style="${style}">
        <span class="topic-scene-name-tag" aria-hidden="true">我叫</span>
        <span class="topic-scene-faces" aria-hidden="true">
          <span></span><span></span>
        </span>
      </span>
    `;
  }

  if (topic.id === "age") {
    return `
      <span class="topic-scene topic-scene-art topic-scene-age" style="${style}">
        <span class="topic-scene-pill topic-scene-pill-age" aria-hidden="true">六岁</span>
        <span class="topic-scene-pill topic-scene-pill-grade" aria-hidden="true">一年级</span>
      </span>
    `;
  }

  return `<span class="topic-scene" style="background:${topic.iconColor};">${topic.iconText}</span>`;
}

function displayControlsMarkup() {
  return `
    <span class="learning-display-controls" aria-label="Display options">
      <button class="learning-display-toggle" type="button" data-display-toggle="sound"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="pinyin"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="english"></button>
    </span>
  `;
}

function bindDisplayControls() {
  learningCultureNav.querySelectorAll("[data-display-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.displayToggle === "sound") {
        state.tapAudioEnabled = !state.tapAudioEnabled;
      } else if (button.dataset.displayToggle === "pinyin") {
        state.showPinyin = !state.showPinyin;
      } else {
        state.showEnglish = !state.showEnglish;
      }
      updateDisplayControls();
    });
  });
}

function renderTopicStickyNav() {
  const categoriesMarkup = learningHomeCategories
    .map(
      (category) => `
        <button
          class="learning-culture-nav-item${category.id === state.expandedCategoryId ? " active" : ""}"
          type="button"
          data-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${category.id === state.expandedCategoryId ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.enTitle}</span>
        </button>
      `
    )
    .join("");

  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup()}
  `;

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expandedCategoryId = button.dataset.target;
      state.topicPageOpen = false;
      renderTopics();
      updateTopicPageVisibility();
      window.history.pushState(null, "", "#topics-panel");
      scrollCategorySectionIntoView(button.dataset.target);
    });
  });
}

function bookAccent(index) {
  const accents = ["#be5b49", "#aa7051", "#517b8d", "#6d8a4f", "#c48d46", "#6f7fa4", "#8f6988", "#b8863e"];
  return accents[index % accents.length];
}

function renderBookStickyNav() {
  const categoriesMarkup = bookHomeCategories
    .map((category) => {
      const isActive = category.id === state.selectedBookCategoryId;
      return `
        <button
          class="learning-culture-nav-item book-nav-item${isActive ? " active" : ""}"
          type="button"
          data-book-category-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${isActive ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.bookIds.length} books</span>
        </button>
      `;
    })
    .join("");

  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup()}
  `;

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-book-category-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryTarget);
      if (!selectedCategory) {
        return;
      }

      state.selectedBookCategoryId = selectedCategory.id;
      if (!selectedCategory.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(selectedCategory.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      state.topicPageOpen = false;
      renderBooks();
      renderTopicDetail();
      updateTopicPageVisibility();
      document.getElementById(`book-category-${selectedCategory.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderStickyNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books") {
    renderBookStickyNav();
  } else {
    renderTopicStickyNav();
  }
  renderFocusControls();
}

function categoryIconMarkup(category) {
  if (category.iconEmoji) {
    return `<span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>`;
  }

  return `
    <img
      class="category-generated-icon category-generated-icon-${category.id}"
      src="${category.iconSrc}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}

function renderTopics() {
  topicGroupsRoot.innerHTML = "";
  renderStickyNav();

  const board = document.createElement("div");
  board.className = "learning-home-board";
  learningHomeCategories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "learning-home-card";
    card.style.setProperty("--category-accent", category.accent);
    if (category.id === state.expandedCategoryId) {
      card.classList.add("is-selected");
    }

    card.innerHTML = `
      <button class="learning-home-card-main" type="button" aria-label="Open ${category.enTitle}">
        <span class="learning-card-count">${category.topicIds.length} topics</span>
        <span class="learning-home-card-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <span class="topic-copy">
          <span class="topic-zh-title">${category.zhTitle}</span>
          <span class="topic-row-title">${category.enTitle}</span>
          <span class="topic-row-meta">${category.hint}</span>
        </span>
      </button>
    `;

    card.querySelector(".learning-home-card-main").addEventListener("click", () => {
      state.expandedCategoryId = category.id;
      renderTopics();
      scrollCategorySectionIntoView(category.id);
    });
    board.appendChild(card);
  });

  topicGroupsRoot.appendChild(board);

  learningHomeCategories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "learning-category-section";
    section.id = category.id;
    section.style.setProperty("--category-accent", category.accent);
    section.innerHTML = `
      <div class="learning-category-head">
        <span class="learning-category-head-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
        <div>
          <h3>${category.zhTitle}</h3>
          <h4>${category.enTitle}</h4>
          <p>${category.hint}</p>
        </div>
      </div>
      <div class="category-topic-grid">
        ${category.topicIds
          .map((topicId) => topicById(topicId))
          .filter(Boolean)
          .map((topic) => {
            const meta = topicCardMeta[topic.id] ?? {};
            return `
              <a class="category-topic-card${topic.id === state.selectedTopicId ? " is-selected" : ""}" href="${topicPageUrl(window.location, topic.id)}" data-topic-id="${topic.id}">
                <span class="category-topic-zh">${meta.zhTitle ?? topic.iconText}</span>
                <span class="category-topic-en">${meta.enTitle ?? topic.title}</span>
                <span class="category-topic-hint">${meta.hint ?? topic.progressLabel}</span>
              </a>
            `;
          })
          .join("")}
      </div>
    `;

    section.querySelectorAll("[data-topic-id]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        try {
          openTopicPage(link.dataset.topicId);
        } catch (error) {
          console.error("Could not open topic in place.", error);
        }
      });
    });

    topicGroupsRoot.appendChild(section);
  });

  updateLearningCultureNav();
}

function renderBooks() {
  bookSelect.innerHTML = books
    .map((book) => `<option value="${book.id}">${book.label}</option>`)
    .join("");
  bookSelect.value = state.selectedBookId;

  const book = currentBook();
  state.selectedBookCategoryId = bookCategoryForBook(book.id).id;
  lessonSelect.innerHTML = book.lessons
    .map(
      (lesson) =>
        `<option value="${lesson.lesson}">Lesson ${lesson.lesson}: ${lesson.title}</option>`
    )
    .join("");

  const activeLesson = currentLesson();
  lessonSelect.value = String(activeLesson.lesson);

  bookBrowser.innerHTML = `
    <div class="learning-home-board book-home-board">
      ${bookHomeCategories
        .map((category) => {
          const isSelected = category.id === state.selectedBookCategoryId;
          return `
            <article class="learning-home-card book-home-card${isSelected ? " is-selected" : ""}" style="--category-accent: ${category.accent};">
              <button class="learning-home-card-main" type="button" data-book-category-card="${category.id}" aria-label="Open ${category.enTitle}">
                <span class="learning-card-count">${category.bookIds.length} books</span>
                <span class="learning-home-card-icon" aria-hidden="true">
                  <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
                </span>
                <span class="topic-copy">
                  <span class="topic-zh-title">${category.zhTitle}</span>
                  <span class="topic-row-title">${category.enTitle}</span>
                  <span class="topic-row-meta">${category.hint}</span>
                </span>
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  lookupCard.innerHTML = bookHomeCategories
    .map((category) => {
      const booksInCategory = category.bookIds.map((bookId) => bookById(bookId));
      const isActiveCategory = category.id === state.selectedBookCategoryId;
      const selectedBookInCategory =
        booksInCategory.find((entry) => entry.id === state.selectedBookId) ?? booksInCategory[0];
      const selectedBookIndex = books.findIndex((entry) => entry.id === selectedBookInCategory.id);

      return `
        <section
          class="learning-category-section book-category-section${isActiveCategory ? " is-selected" : ""}"
          id="book-category-${category.id}"
          style="--category-accent: ${category.accent}; --book-accent: ${bookAccent(Math.max(selectedBookIndex, 0))};"
        >
          <div class="learning-category-head">
            <span class="learning-category-head-icon" aria-hidden="true">
              <span class="category-emoji-icon category-emoji-icon-${category.id}">${category.iconEmoji}</span>
            </span>
            <div>
              <h3>${category.zhTitle}</h3>
              <h4>${category.enTitle}</h4>
              <p>${category.hint}</p>
            </div>
          </div>
          <div class="book-category-grid">
            ${booksInCategory
              .map((entry) => {
                const firstTopic = topicById(entry.lessons[0]?.topicId);
                const isSelectedBook = entry.id === selectedBookInCategory.id;
                const entryIndex = books.findIndex((bookEntry) => bookEntry.id === entry.id);
                return `
                  <button
                    class="book-browser-card book-category-book-card${isSelectedBook ? " is-selected" : ""}"
                    style="--book-accent: ${bookAccent(Math.max(entryIndex, 0))}"
                    type="button"
                    data-book-browser="${entry.id}"
                  >
                    <span>${entry.label}</span>
                    <small>${entry.lessons.length} lessons</small>
                    <em>${firstTopic?.title ?? "Chinese practice"}</em>
                  </button>
                `;
              })
              .join("")}
          </div>
          <div class="book-category-lessons">
            <div class="book-category-lessons-head">
              <div>
                <span class="progress-label">Lessons</span>
                <h3>${selectedBookInCategory.label}</h3>
                <p>Pick a lesson to open the matching topic practice.</p>
              </div>
            </div>
            <div class="book-lesson-grid">
              ${selectedBookInCategory.lessons
                .map((lesson) => {
                  const lessonTopic = topicById(lesson.topicId);
                  const isSelectedLesson =
                    selectedBookInCategory.id === book.id && lesson.lesson === activeLesson.lesson;
                  return `
                    <button
                      class="book-lesson-card${isSelectedLesson ? " is-selected" : ""}"
                      type="button"
                      data-book-lesson="${selectedBookInCategory.id}:${lesson.lesson}"
                    >
                      <span>Lesson ${lesson.lesson}</span>
                      <strong>${lesson.title}</strong>
                      <small>${lessonTopic?.title ?? "Topic practice"}</small>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>
      `;
    })
    .join("");

  bookBrowser.querySelectorAll("[data-book-category-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = bookHomeCategories.find((entry) => entry.id === button.dataset.bookCategoryCard);
      if (!category) {
        return;
      }

      state.selectedBookCategoryId = category.id;
      if (!category.bookIds.includes(state.selectedBookId)) {
        const selectedBook = bookById(category.bookIds[0]);
        state.selectedBookId = selectedBook.id;
        state.selectedLessonNumber = selectedBook.lessons[0].lesson;
        state.selectedTopicId = selectedBook.lessons[0].topicId;
      }
      renderBooks();
      document.getElementById(`book-category-${category.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-browser]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedBook = books.find((entry) => entry.id === button.dataset.bookBrowser);
      if (!selectedBook) {
        return;
      }

      state.selectedBookCategoryId = bookCategoryForBook(selectedBook.id).id;
      state.selectedBookId = selectedBook.id;
      state.selectedLessonNumber = selectedBook.lessons[0].lesson;
      state.selectedTopicId = selectedBook.lessons[0].topicId;
      renderBooks();
      renderTopicDetail();
      document.getElementById(`book-category-${state.selectedBookCategoryId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  lookupCard.querySelectorAll("[data-book-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [bookId, lessonNumber] = button.dataset.bookLesson.split(":");
      selectBookLesson(bookId, Number(lessonNumber));
    });
  });

  renderStickyNav();
}

function updateLearningCultureNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "books" && !bookPanel.classList.contains("is-hidden")) {
    const bookBoard = bookBrowser.querySelector(".book-home-board");
    const bookSections = lookupCard.querySelectorAll(".book-category-section");
    const bookNavItems = learningCultureNav.querySelectorAll("[data-book-category-target]");
    const showBookNav = bookBoard && window.scrollY > bookBoard.offsetTop + bookBoard.offsetHeight - 60;
    learningCultureNav.classList.toggle("visible", showBookNav);
    if (!showBookNav) {
      return;
    }

    let activeCategoryId = state.selectedBookCategoryId;
    const scrollY = window.scrollY + 120;
    bookSections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        activeCategoryId = section.id.replace("book-category-", "");
      }
    });

    bookNavItems.forEach((item) => {
      const isActive = item.dataset.bookCategoryTarget === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  const cardGrid = topicGroupsRoot.querySelector(".learning-home-board");
  const sections = topicGroupsRoot.querySelectorAll(".learning-category-section");
  const navItems = learningCultureNav.querySelectorAll("[data-target]");

  if (state.topicPageOpen) {
    learningCultureNav.classList.add("visible");
    const activeCategoryId = state.expandedCategoryId ?? categoryIdForTopic(state.selectedTopicId);
    navItems.forEach((item) => {
      const isActive = item.dataset.target === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  if (!cardGrid || state.currentView !== "topics" || topicPanel.classList.contains("is-hidden")) {
    learningCultureNav.classList.remove("visible");
    return;
  }

  const showNav = window.scrollY > cardGrid.offsetTop + cardGrid.offsetHeight - 60;
  learningCultureNav.classList.toggle("visible", showNav);
  if (!showNav) {
    return;
  }

  let current = "";
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.target === current;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
}


  return { currentTopic, currentNumberStage, focusItemsForTopic, currentFocusItem, shuffleArray, topicById, selectedTopicGroupId, bookById, bookCategoryForBook, currentBook, currentLesson, syncBookSelectionFromTopic, syncLessonSelectionFromTopic, focusLearningPanel, scrollToSectionTop, narrowTopicBrowserTo, categoryIdForTopic, updateTopicPageVisibility, scrollCategorySectionIntoView, openTopicPage, switchView, toggleTopicGroup, renderTopicScene, displayControlsMarkup, bindDisplayControls, renderTopicStickyNav, bookAccent, renderBookStickyNav, renderStickyNav, categoryIconMarkup, renderTopics, renderBooks, updateLearningCultureNav };
}
