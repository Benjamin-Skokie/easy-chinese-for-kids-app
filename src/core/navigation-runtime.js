export function createNavigationRuntime(context) {
  const { state, topicData, books, topicGroups, learningHomeCategories, bookHomeCategories, topicCardMeta, topicPageUrl, topicGroupsRoot, bookSelect, lessonSelect, lookupCard, bookBrowser, topicPanel, bookPanel, culturePanel, detailLayout, learningCultureNav, numberStages, timeDateWeekItems, getNumberStageItems, getWorldFocusItems, renderFocusControls, renderFocusDisplay, renderFocusWordList, renderFocusExplorer, renderActivityPanel, renderTopicDetail, updateDisplayControls, selectBookLesson } = context;

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
  const source = state.lessonScope ? `${state.lessonScope.bookId}:${state.lessonScope.lessonNumber}` : "";
  const strictLessonTopicIds = new Set(["body", "introductions", "age", "dates", "classroom", "clothes", "food"]);
  const forSelectedLesson = (items) => source
    ? items.filter((item) => strictLessonTopicIds.has(topic.id) ? item.lessonSources?.includes(source) : !item.lessonSources || item.lessonSources.includes(source))
    : items;

  if (topic.id === "numbers") {
    return getNumberStageItems();
  }

  if (topic.id === "weekdays") {
    return forSelectedLesson(timeDateWeekItems);
  }

  const worldItems = getWorldFocusItems?.(topic);
  if (worldItems) {
    return forSelectedLesson(worldItems);
  }

  const defaultItems = topic.focusItems ?? [{ id: "focus", ...topic.focus }];
  const scopedItems = forSelectedLesson(defaultItems);
  // Explorer-owned topics such as Classroom hide this legacy focus area. Keep
  // its fallback item available so selecting a lesson never stops rendering
  // before the scoped explorer content is reached.
  return scopedItems.length ? scopedItems : defaultItems;
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
  state.lessonScope = null;
  state.expandedCategoryId = categoryIdForTopic(topic.id);
  state.topicPageOpen = true;
  syncBookSelectionFromTopic();
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
  culturePanel?.classList.toggle("is-hidden", view !== "culture");
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
      <button class="learning-display-toggle" type="button" data-display-toggle="sound" aria-label="Sound on" title="Sound on"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="pinyin" aria-label="Pinyin on" title="Pinyin on"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="english" aria-label="English on" title="English on"></button>
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
  const booksMarkup = books
    .map((book, index) => {
      const isActive = book.id === state.selectedBookId;
      return `
        <button
          class="learning-culture-nav-item book-nav-item${isActive ? " active" : ""}"
          type="button"
          data-book-nav-target="${book.id}"
          style="--category-accent: ${bookAccent(index)};"
          ${isActive ? 'aria-current="true"' : ""}
        >
          <span class="zh">课本 ${book.id.toUpperCase()}</span>
          <span class="en">${book.label}</span>
        </button>
      `;
    })
    .join("");

  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">${booksMarkup}</span>
    ${displayControlsMarkup()}
  `;

  bindDisplayControls();
  learningCultureNav.querySelectorAll("[data-book-nav-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedBook = bookById(button.dataset.bookNavTarget);
      if (!selectedBook) {
        return;
      }

      state.selectedBookCategoryId = bookCategoryForBook(selectedBook.id).id;
      state.selectedBookId = selectedBook.id;
      state.selectedLessonNumber = selectedBook.lessons[0].lesson;
      state.selectedTopicId = selectedBook.lessons[0].topicId;
      state.topicPageOpen = false;
      renderBooks();
      updateTopicPageVisibility();
      document.getElementById(`book-lessons-${selectedBook.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderCultureStickyNav() {
  const cards = [...culturePanel.querySelectorAll("[data-culture-target]")];
  learningCultureNav.innerHTML = `
    <span class="learning-culture-nav-items">
      ${cards
        .map((card) => {
          const accent = card.style.getPropertyValue("--cat-accent");
          return `
          <button class="learning-culture-nav-item" type="button" data-culture-nav-target="${card.dataset.cultureTarget}" style="--category-accent: ${accent};">
            <span class="zh">${card.querySelector(".culture-card-name strong")?.textContent ?? ""}</span>
            <span class="en">${card.querySelector(".culture-card-name em")?.textContent ?? ""}</span>
          </button>
        `;
        })
        .join("")}
    </span>
  `;

  learningCultureNav.querySelectorAll("[data-culture-nav-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(`culture-${button.dataset.cultureNavTarget}`);
      if (target) {
        window.history.pushState(null, "", `#culture-${button.dataset.cultureNavTarget}`);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderStickyNav() {
  if (!learningCultureNav) {
    return;
  }

  if (state.currentView === "culture") {
    renderCultureStickyNav();
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
        <div class="learning-category-title">
          <h3>${category.zhTitle}</h3>
          <span class="learning-category-title-separator" aria-hidden="true">·</span>
          <h4>${category.enTitle}</h4>
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
                <span class="category-topic-title">
                  <span class="category-topic-zh">${meta.zhTitle ?? topic.iconText}</span>
                  <span class="category-topic-separator" aria-hidden="true">·</span>
                  <span class="category-topic-en">${meta.enTitle ?? topic.title}</span>
                </span>
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
    <div class="learning-home-board book-library-grid" aria-label="Chinese textbooks">
      ${books
        .map((entry, index) => {
          const isSelectedBook = entry.id === book.id;
          return `
            <article class="learning-home-card book-library-card${isSelectedBook ? " is-selected" : ""}" style="--category-accent: ${bookAccent(index)};">
              <button class="learning-home-card-main" type="button" data-book-browser="${entry.id}" aria-label="Open ${entry.label}">
                <span class="learning-card-count">${entry.lessons.length} lessons</span>
                <span class="learning-home-card-icon" aria-hidden="true">${entry.id.toUpperCase()}</span>
                <span class="topic-copy">
                  <span class="topic-zh-title">课本 ${entry.id.toUpperCase()}</span>
                  <span class="topic-row-title">${entry.label}</span>
                </span>
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  lookupCard.innerHTML = books
    .map((entry, index) => {
      const isSelectedBook = entry.id === book.id;
      return `
        <section class="book-lesson-section${isSelectedBook ? " is-selected" : ""}" id="book-lessons-${entry.id}" data-book-lesson-section="${entry.id}" style="--book-accent: ${bookAccent(index)};">
          <div class="book-lesson-head">
            <h3>${entry.label}</h3>
          </div>
          <div class="book-lesson-grid">
            ${entry.lessons
              .map((lesson) => {
                const cardTitle = [lesson.displayTitle?.zh, lesson.displayTitle?.en].filter(Boolean).join(" · ") || lesson.title;
                const isSelectedLesson = isSelectedBook && lesson.lesson === activeLesson.lesson;
                return `
                  <button class="book-lesson-card${isSelectedLesson ? " is-selected" : ""}" type="button" data-book-lesson="${entry.id}:${lesson.lesson}">
                    <span class="book-lesson-meta">${entry.label.toUpperCase()} LESSON ${lesson.lesson}</span>
                    <strong>${cardTitle}</strong>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");

  bookBrowser.querySelectorAll("[data-book-browser]").forEach((button) => {
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
      document.getElementById(`book-lessons-${selectedBook.id}`)?.scrollIntoView({
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

  const atPageBottom = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  if (state.currentView === "culture" && !culturePanel?.classList.contains("is-hidden")) {
    const cardGrid = culturePanel.querySelector(".culture-card-grid");
    const sections = culturePanel.querySelectorAll(".culture-category-section");
    const navItems = learningCultureNav.querySelectorAll("[data-culture-nav-target]");
    const showNav = cardGrid && window.scrollY > cardGrid.offsetTop + cardGrid.offsetHeight - 60;
    learningCultureNav.classList.toggle("visible", showNav);
    if (!showNav) {
      return;
    }

    let activeCategoryId = "";
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        activeCategoryId = section.id.replace("culture-", "");
      }
    });
    if (atPageBottom()) {
      activeCategoryId = sections[sections.length - 1]?.id.replace("culture-", "") ?? activeCategoryId;
    }
    navItems.forEach((item) => {
      const isActive = item.dataset.cultureNavTarget === activeCategoryId;
      item.classList.toggle("active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
    return;
  }

  if (state.currentView === "books" && !bookPanel.classList.contains("is-hidden")) {
    const bookBoard = bookBrowser.querySelector(".book-library-grid");
    const bookSections = lookupCard.querySelectorAll("[data-book-lesson-section]");
    const bookNavItems = learningCultureNav.querySelectorAll("[data-book-nav-target]");
    const showBookNav = bookBoard && window.scrollY > bookBoard.offsetTop + bookBoard.offsetHeight - 60;
    learningCultureNav.classList.toggle("visible", showBookNav);
    if (!showBookNav) {
      return;
    }

    // Keep the source book selected while its lesson detail is open. That
    // detail sits below the book sections, so using its page position would
    // otherwise make the final book appear selected.
    let activeBookId = state.selectedBookId;
    if (!state.topicPageOpen) {
      const scrollY = window.scrollY + 120;
      bookSections.forEach((section) => {
        if (section.offsetTop <= scrollY) {
          activeBookId = section.dataset.bookLessonSection;
        }
      });
      if (atPageBottom()) {
        activeBookId = bookSections[bookSections.length - 1]?.dataset.bookLessonSection ?? activeBookId;
      }
    }

    bookNavItems.forEach((item) => {
      const isActive = item.dataset.bookNavTarget === activeBookId;
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
  if (atPageBottom()) {
    current = sections[sections.length - 1]?.id ?? current;
  }

  navItems.forEach((item) => {
    const isActive = item.dataset.target === current;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
}


  return { currentTopic, currentNumberStage, focusItemsForTopic, currentFocusItem, shuffleArray, topicById, selectedTopicGroupId, bookById, bookCategoryForBook, currentBook, currentLesson, syncBookSelectionFromTopic, syncLessonSelectionFromTopic, focusLearningPanel, scrollToSectionTop, narrowTopicBrowserTo, categoryIdForTopic, updateTopicPageVisibility, scrollCategorySectionIntoView, openTopicPage, switchView, toggleTopicGroup, renderTopicScene, displayControlsMarkup, bindDisplayControls, renderTopicStickyNav, bookAccent, renderBookStickyNav, renderStickyNav, categoryIconMarkup, renderTopics, renderBooks, updateLearningCultureNav };
}
