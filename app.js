/* Generated from src/main.js. Do not edit directly. */
(() => {
  // src/core/audio.js
  function createAudioService({
    synthesis = globalThis.speechSynthesis,
    createUtterance = (text) => new globalThis.SpeechSynthesisUtterance(text),
    getSceneRate,
    getSceneLinePauseMs,
    schedule = globalThis.setTimeout
  } = {}) {
    const preferredVoiceNames = ["tingting", "ting-ting", "meijia", "mei-jia", "sinji", "sin-ji"];
    function preferredChineseVoice() {
      const voices = synthesis?.getVoices?.() ?? [];
      return preferredVoiceNames.map((name) => voices.find((voice) => voice.name.toLowerCase() === name)).find(Boolean);
    }
    function chineseUtterance2(text, rate) {
      const utterance = createUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = rate;
      utterance.pitch = 1;
      const voice = preferredChineseVoice();
      if (voice) utterance.voice = voice;
      return utterance;
    }
    function speak2(text, rate = 0.8) {
      if (!synthesis || !text) return;
      synthesis.cancel();
      synthesis.speak(chineseUtterance2(text, rate));
    }
    function speakSceneLines2(lines) {
      if (!synthesis) return;
      const audioLines = lines.map((line) => line.audio).filter(Boolean);
      let index = 0;
      synthesis.cancel();
      const playNextLine = () => {
        if (index >= audioLines.length) return;
        const utterance = chineseUtterance2(audioLines[index], getSceneRate());
        index += 1;
        utterance.onend = () => schedule(playNextLine, getSceneLinePauseMs());
        synthesis.speak(utterance);
      };
      playNextLine();
    }
    return { speak: speak2, speakSceneLines: speakSceneLines2 };
  }

  // src/core/navigation-runtime.js
  function createNavigationRuntime(context) {
    const { state: state2, topicData: topicData2, books: books2, topicGroups: topicGroups2, learningHomeCategories: learningHomeCategories2, bookHomeCategories: bookHomeCategories2, topicCardMeta: topicCardMeta2, topicPageUrl: topicPageUrl2, topicGroupsRoot: topicGroupsRoot2, bookSelect: bookSelect2, lessonSelect: lessonSelect2, lookupCard: lookupCard2, bookBrowser: bookBrowser2, topicPanel: topicPanel2, bookPanel: bookPanel2, detailLayout: detailLayout2, learningCultureNav: learningCultureNav2, renderFocusControls: renderFocusControls2, renderFocusDisplay: renderFocusDisplay2, renderFocusWordList: renderFocusWordList3, renderFocusExplorer: renderFocusExplorer2, renderActivityPanel: renderActivityPanel2, renderTopicDetail: renderTopicDetail2, updateDisplayControls: updateDisplayControls2, selectBookLesson: selectBookLesson2 } = context;
    function currentTopic2() {
      return topicData2.find((topic) => topic.id === state2.selectedTopicId) ?? topicData2[0];
    }
    function currentNumberStage2() {
      const lesson = currentLesson2();
      return numberStages.find((stage) => stage.bookId === currentBook2().id && stage.lesson === lesson.lesson) ?? numberStages[0];
    }
    function focusItemsForTopic2(topic = currentTopic2()) {
      if (topic.id === "numbers") {
        return numberStageItems();
      }
      if (topic.id === "weekdays") {
        return timeDateWeekItems;
      }
      return topic.focusItems ?? [{ id: "focus", ...topic.focus }];
    }
    function currentFocusItem2() {
      const items = focusItemsForTopic2();
      return items.find((item) => item.id === state2.selectedFocusItemId) ?? items[0];
    }
    function shuffleArray2(items) {
      const copy = [...items];
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
      }
      return copy;
    }
    function topicById2(topicId) {
      return topicData2.find((topic) => topic.id === topicId);
    }
    function selectedTopicGroupId2() {
      return topicGroups2.find((group) => group.topicIds.includes(state2.selectedTopicId))?.id ?? topicGroups2[0].id;
    }
    function bookById2(bookId) {
      return books2.find((book) => book.id === bookId) ?? books2[0];
    }
    function bookCategoryForBook2(bookId) {
      return bookHomeCategories2.find((category) => category.bookIds.includes(bookId)) ?? bookHomeCategories2[0];
    }
    function currentBook2() {
      return bookById2(state2.selectedBookId);
    }
    function currentLesson2() {
      const book = currentBook2();
      const exactLesson = book.lessons.find((lesson) => lesson.lesson === state2.selectedLessonNumber);
      if (exactLesson && exactLesson.topicId === state2.selectedTopicId) {
        return exactLesson;
      }
      return book.lessons.find((lesson) => lesson.topicId === state2.selectedTopicId) ?? book.lessons[0];
    }
    function syncBookSelectionFromTopic2() {
      const topic = currentTopic2();
      const firstMatch = books2.find(
        (book) => book.lessons.some((lesson) => topic.steps.some((step) => book.id === step.book.toLowerCase() && step.lesson === lesson.lesson))
      );
      if (firstMatch) {
        state2.selectedBookId = firstMatch.id;
        state2.selectedBookCategoryId = bookCategoryForBook2(firstMatch.id).id;
      }
      syncLessonSelectionFromTopic2();
    }
    function syncLessonSelectionFromTopic2() {
      const book = currentBook2();
      const firstMatch = book.lessons.find((lesson) => lesson.topicId === state2.selectedTopicId) ?? book.lessons[0];
      state2.selectedLessonNumber = firstMatch.lesson;
    }
    function focusLearningPanel2() {
      if (!detailLayout2) {
        return;
      }
      scrollToSectionTop2(detailLayout2);
    }
    function scrollToSectionTop2(element) {
      if (!element) {
        return;
      }
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      const stickyNavHeight = learningCultureNav2?.getBoundingClientRect().height ?? 0;
      const targetTop = Math.max(0, window.scrollY + element.getBoundingClientRect().top - stickyNavHeight);
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, targetTop);
      root.style.scrollBehavior = previousScrollBehavior;
    }
    function narrowTopicBrowserTo2(groupId) {
      state2.openTopicGroups = /* @__PURE__ */ new Set([groupId]);
    }
    function categoryIdForTopic2(topicId) {
      return learningHomeCategories2.find((category) => category.topicIds.includes(topicId))?.id ?? "foundations";
    }
    function updateTopicPageVisibility2() {
      detailLayout2?.classList.toggle("is-hidden", !state2.topicPageOpen);
      document.body.classList.toggle("is-topic-page", state2.topicPageOpen);
    }
    function scrollCategorySectionIntoView2(categoryId) {
      requestAnimationFrame(() => {
        scrollToSectionTop2(document.getElementById(categoryId));
      });
    }
    function openTopicPage2(topicId, options = {}) {
      const topic = topicById2(topicId);
      if (!topic) {
        return;
      }
      state2.selectedTopicId = topic.id;
      state2.expandedCategoryId = categoryIdForTopic2(topic.id);
      state2.topicPageOpen = true;
      renderTopics2();
      renderBooks2();
      renderTopicDetail2();
      updateTopicPageVisibility2();
      const nextUrl = topicPageUrl2(window.location, topic.id);
      if (options.replace) {
        window.history.replaceState(null, "", nextUrl);
      } else {
        window.history.pushState(null, "", nextUrl);
      }
      if (options.scroll !== false) {
        focusLearningPanel2();
      }
    }
    function switchView2(view) {
      state2.currentView = view;
      document.querySelectorAll(".view-tab").forEach((button) => {
        const isActive = button.dataset.view === view;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });
      topicPanel2.classList.toggle("is-hidden", view !== "topics");
      bookPanel2.classList.toggle("is-hidden", view !== "books");
      document.querySelectorAll("[data-global-view]").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.globalView === view);
      });
      renderStickyNav2();
      updateLearningCultureNav2();
    }
    function toggleTopicGroup2(groupId) {
      if (state2.openTopicGroups.has(groupId)) {
        state2.openTopicGroups.delete(groupId);
      } else {
        state2.openTopicGroups.add(groupId);
      }
      renderTopics2();
    }
    function renderTopicScene2(topic) {
      const style = `background: linear-gradient(180deg, ${topic.iconColor}, ${topic.iconColor}dd); --topic-accent:${topic.iconAccent ?? "#f5d9a6"};`;
      if (topic.id === "numbers") {
        return `
      <span class="topic-scene topic-scene-art topic-scene-numbers" style="${style}">
        <span class="topic-scene-dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
        <span class="topic-scene-chip-row" aria-hidden="true">
          <span class="topic-scene-chip">\u4E00</span>
          <span class="topic-scene-chip">\u4E8C</span>
          <span class="topic-scene-chip">\u4E09</span>
        </span>
      </span>
    `;
      }
      if (topic.id === "multiplication-rhyme") {
        return `
      <span class="topic-scene topic-scene-art topic-scene-rhyme" style="${style}">
        <span class="topic-scene-rhyme-row" aria-hidden="true">
          <span class="topic-scene-chip">\u4E5D</span>
          <span class="topic-scene-chip">\u4E5D</span>
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
        <span class="topic-scene-bubble topic-scene-bubble-left" aria-hidden="true">\u4F60</span>
        <span class="topic-scene-bubble topic-scene-bubble-right" aria-hidden="true">\u597D</span>
        <span class="topic-scene-spark topic-scene-spark-top" aria-hidden="true"></span>
      </span>
    `;
      }
      if (topic.id === "polite-words") {
        return `
      <span class="topic-scene topic-scene-art topic-scene-polite" style="${style}">
        <span class="topic-scene-bubble topic-scene-bubble-wide" aria-hidden="true">\u8C22\u8C22</span>
        <span class="topic-scene-heart" aria-hidden="true"></span>
      </span>
    `;
      }
      if (topic.id === "introductions") {
        return `
      <span class="topic-scene topic-scene-art topic-scene-intro" style="${style}">
        <span class="topic-scene-name-tag" aria-hidden="true">\u6211\u53EB</span>
        <span class="topic-scene-faces" aria-hidden="true">
          <span></span><span></span>
        </span>
      </span>
    `;
      }
      if (topic.id === "age") {
        return `
      <span class="topic-scene topic-scene-art topic-scene-age" style="${style}">
        <span class="topic-scene-pill topic-scene-pill-age" aria-hidden="true">\u516D\u5C81</span>
        <span class="topic-scene-pill topic-scene-pill-grade" aria-hidden="true">\u4E00\u5E74\u7EA7</span>
      </span>
    `;
      }
      return `<span class="topic-scene" style="background:${topic.iconColor};">${topic.iconText}</span>`;
    }
    function displayControlsMarkup2() {
      return `
    <span class="learning-display-controls" aria-label="Display options">
      <button class="learning-display-toggle" type="button" data-display-toggle="sound"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="pinyin"></button>
      <button class="learning-display-toggle" type="button" data-display-toggle="english"></button>
    </span>
  `;
    }
    function bindDisplayControls2() {
      learningCultureNav2.querySelectorAll("[data-display-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.displayToggle === "sound") {
            state2.tapAudioEnabled = !state2.tapAudioEnabled;
          } else if (button.dataset.displayToggle === "pinyin") {
            state2.showPinyin = !state2.showPinyin;
          } else {
            state2.showEnglish = !state2.showEnglish;
          }
          updateDisplayControls2();
        });
      });
    }
    function renderTopicStickyNav2() {
      const categoriesMarkup = learningHomeCategories2.map(
        (category) => `
        <button
          class="learning-culture-nav-item${category.id === state2.expandedCategoryId ? " active" : ""}"
          type="button"
          data-target="${category.id}"
          style="--category-accent: ${category.accent};"
          ${category.id === state2.expandedCategoryId ? 'aria-current="true"' : ""}
        >
          <span class="zh">${category.zhTitle}</span>
          <span class="en">${category.enTitle}</span>
        </button>
      `
      ).join("");
      learningCultureNav2.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup2()}
  `;
      bindDisplayControls2();
      learningCultureNav2.querySelectorAll("[data-target]").forEach((button) => {
        button.addEventListener("click", () => {
          state2.expandedCategoryId = button.dataset.target;
          state2.topicPageOpen = false;
          renderTopics2();
          updateTopicPageVisibility2();
          window.history.pushState(null, "", "#topics-panel");
          scrollCategorySectionIntoView2(button.dataset.target);
        });
      });
    }
    function bookAccent2(index) {
      const accents = ["#be5b49", "#aa7051", "#517b8d", "#6d8a4f", "#c48d46", "#6f7fa4", "#8f6988", "#b8863e"];
      return accents[index % accents.length];
    }
    function renderBookStickyNav2() {
      const categoriesMarkup = bookHomeCategories2.map((category) => {
        const isActive = category.id === state2.selectedBookCategoryId;
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
      }).join("");
      learningCultureNav2.innerHTML = `
    <span class="learning-culture-nav-items">${categoriesMarkup}</span>
    ${displayControlsMarkup2()}
  `;
      bindDisplayControls2();
      learningCultureNav2.querySelectorAll("[data-book-category-target]").forEach((button) => {
        button.addEventListener("click", () => {
          const selectedCategory = bookHomeCategories2.find((entry) => entry.id === button.dataset.bookCategoryTarget);
          if (!selectedCategory) {
            return;
          }
          state2.selectedBookCategoryId = selectedCategory.id;
          if (!selectedCategory.bookIds.includes(state2.selectedBookId)) {
            const selectedBook = bookById2(selectedCategory.bookIds[0]);
            state2.selectedBookId = selectedBook.id;
            state2.selectedLessonNumber = selectedBook.lessons[0].lesson;
            state2.selectedTopicId = selectedBook.lessons[0].topicId;
          }
          state2.topicPageOpen = false;
          renderBooks2();
          renderTopicDetail2();
          updateTopicPageVisibility2();
          document.getElementById(`book-category-${selectedCategory.id}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
    }
    function renderStickyNav2() {
      if (!learningCultureNav2) {
        return;
      }
      if (state2.currentView === "books") {
        renderBookStickyNav2();
      } else {
        renderTopicStickyNav2();
      }
      renderFocusControls2();
    }
    function categoryIconMarkup2(category) {
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
    function renderTopics2() {
      topicGroupsRoot2.innerHTML = "";
      renderStickyNav2();
      const board = document.createElement("div");
      board.className = "learning-home-board";
      learningHomeCategories2.forEach((category) => {
        const card = document.createElement("article");
        card.className = "learning-home-card";
        card.style.setProperty("--category-accent", category.accent);
        if (category.id === state2.expandedCategoryId) {
          card.classList.add("is-selected");
        }
        card.innerHTML = `
      <button class="learning-home-card-main" type="button" aria-label="Open ${category.enTitle}">
        <span class="learning-card-count">${category.topicIds.length} topics</span>
        <span class="learning-home-card-icon" aria-hidden="true">${categoryIconMarkup2(category)}</span>
        <span class="topic-copy">
          <span class="topic-zh-title">${category.zhTitle}</span>
          <span class="topic-row-title">${category.enTitle}</span>
          <span class="topic-row-meta">${category.hint}</span>
        </span>
      </button>
    `;
        card.querySelector(".learning-home-card-main").addEventListener("click", () => {
          state2.expandedCategoryId = category.id;
          renderTopics2();
          scrollCategorySectionIntoView2(category.id);
        });
        board.appendChild(card);
      });
      topicGroupsRoot2.appendChild(board);
      learningHomeCategories2.forEach((category) => {
        const section = document.createElement("section");
        section.className = "learning-category-section";
        section.id = category.id;
        section.style.setProperty("--category-accent", category.accent);
        section.innerHTML = `
      <div class="learning-category-head">
        <span class="learning-category-head-icon" aria-hidden="true">${categoryIconMarkup2(category)}</span>
        <div>
          <h3>${category.zhTitle}</h3>
          <h4>${category.enTitle}</h4>
          <p>${category.hint}</p>
        </div>
      </div>
      <div class="category-topic-grid">
        ${category.topicIds.map((topicId) => topicById2(topicId)).filter(Boolean).map((topic) => {
          const meta = topicCardMeta2[topic.id] ?? {};
          return `
              <a class="category-topic-card${topic.id === state2.selectedTopicId ? " is-selected" : ""}" href="${topicPageUrl2(window.location, topic.id)}" data-topic-id="${topic.id}">
                <span class="category-topic-zh">${meta.zhTitle ?? topic.iconText}</span>
                <span class="category-topic-en">${meta.enTitle ?? topic.title}</span>
                <span class="category-topic-hint">${meta.hint ?? topic.progressLabel}</span>
              </a>
            `;
        }).join("")}
      </div>
    `;
        section.querySelectorAll("[data-topic-id]").forEach((link) => {
          link.addEventListener("click", (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
              return;
            }
            event.preventDefault();
            try {
              openTopicPage2(link.dataset.topicId);
            } catch (error) {
              console.error("Could not open topic in place.", error);
            }
          });
        });
        topicGroupsRoot2.appendChild(section);
      });
      updateLearningCultureNav2();
    }
    function renderBooks2() {
      bookSelect2.innerHTML = books2.map((book2) => `<option value="${book2.id}">${book2.label}</option>`).join("");
      bookSelect2.value = state2.selectedBookId;
      const book = currentBook2();
      state2.selectedBookCategoryId = bookCategoryForBook2(book.id).id;
      lessonSelect2.innerHTML = book.lessons.map(
        (lesson) => `<option value="${lesson.lesson}">Lesson ${lesson.lesson}: ${lesson.title}</option>`
      ).join("");
      const activeLesson = currentLesson2();
      lessonSelect2.value = String(activeLesson.lesson);
      bookBrowser2.innerHTML = `
    <div class="learning-home-board book-home-board">
      ${bookHomeCategories2.map((category) => {
        const isSelected = category.id === state2.selectedBookCategoryId;
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
      }).join("")}
    </div>
  `;
      lookupCard2.innerHTML = bookHomeCategories2.map((category) => {
        const booksInCategory = category.bookIds.map((bookId) => bookById2(bookId));
        const isActiveCategory = category.id === state2.selectedBookCategoryId;
        const selectedBookInCategory = booksInCategory.find((entry) => entry.id === state2.selectedBookId) ?? booksInCategory[0];
        const selectedBookIndex = books2.findIndex((entry) => entry.id === selectedBookInCategory.id);
        return `
        <section
          class="learning-category-section book-category-section${isActiveCategory ? " is-selected" : ""}"
          id="book-category-${category.id}"
          style="--category-accent: ${category.accent}; --book-accent: ${bookAccent2(Math.max(selectedBookIndex, 0))};"
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
            ${booksInCategory.map((entry) => {
          const firstTopic = topicById2(entry.lessons[0]?.topicId);
          const isSelectedBook = entry.id === selectedBookInCategory.id;
          const entryIndex = books2.findIndex((bookEntry) => bookEntry.id === entry.id);
          return `
                  <button
                    class="book-browser-card book-category-book-card${isSelectedBook ? " is-selected" : ""}"
                    style="--book-accent: ${bookAccent2(Math.max(entryIndex, 0))}"
                    type="button"
                    data-book-browser="${entry.id}"
                  >
                    <span>${entry.label}</span>
                    <small>${entry.lessons.length} lessons</small>
                    <em>${firstTopic?.title ?? "Chinese practice"}</em>
                  </button>
                `;
        }).join("")}
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
              ${selectedBookInCategory.lessons.map((lesson) => {
          const lessonTopic = topicById2(lesson.topicId);
          const isSelectedLesson = selectedBookInCategory.id === book.id && lesson.lesson === activeLesson.lesson;
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
        }).join("")}
            </div>
          </div>
        </section>
      `;
      }).join("");
      bookBrowser2.querySelectorAll("[data-book-category-card]").forEach((button) => {
        button.addEventListener("click", () => {
          const category = bookHomeCategories2.find((entry) => entry.id === button.dataset.bookCategoryCard);
          if (!category) {
            return;
          }
          state2.selectedBookCategoryId = category.id;
          if (!category.bookIds.includes(state2.selectedBookId)) {
            const selectedBook = bookById2(category.bookIds[0]);
            state2.selectedBookId = selectedBook.id;
            state2.selectedLessonNumber = selectedBook.lessons[0].lesson;
            state2.selectedTopicId = selectedBook.lessons[0].topicId;
          }
          renderBooks2();
          document.getElementById(`book-category-${category.id}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      lookupCard2.querySelectorAll("[data-book-browser]").forEach((button) => {
        button.addEventListener("click", () => {
          const selectedBook = books2.find((entry) => entry.id === button.dataset.bookBrowser);
          if (!selectedBook) {
            return;
          }
          state2.selectedBookCategoryId = bookCategoryForBook2(selectedBook.id).id;
          state2.selectedBookId = selectedBook.id;
          state2.selectedLessonNumber = selectedBook.lessons[0].lesson;
          state2.selectedTopicId = selectedBook.lessons[0].topicId;
          renderBooks2();
          renderTopicDetail2();
          document.getElementById(`book-category-${state2.selectedBookCategoryId}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      lookupCard2.querySelectorAll("[data-book-lesson]").forEach((button) => {
        button.addEventListener("click", () => {
          const [bookId, lessonNumber] = button.dataset.bookLesson.split(":");
          selectBookLesson2(bookId, Number(lessonNumber));
        });
      });
      renderStickyNav2();
    }
    function updateLearningCultureNav2() {
      if (!learningCultureNav2) {
        return;
      }
      if (state2.currentView === "books" && !bookPanel2.classList.contains("is-hidden")) {
        const bookBoard = bookBrowser2.querySelector(".book-home-board");
        const bookSections = lookupCard2.querySelectorAll(".book-category-section");
        const bookNavItems = learningCultureNav2.querySelectorAll("[data-book-category-target]");
        const showBookNav = bookBoard && window.scrollY > bookBoard.offsetTop + bookBoard.offsetHeight - 60;
        learningCultureNav2.classList.toggle("visible", showBookNav);
        if (!showBookNav) {
          return;
        }
        let activeCategoryId = state2.selectedBookCategoryId;
        const scrollY2 = window.scrollY + 120;
        bookSections.forEach((section) => {
          if (section.offsetTop <= scrollY2) {
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
      const cardGrid = topicGroupsRoot2.querySelector(".learning-home-board");
      const sections = topicGroupsRoot2.querySelectorAll(".learning-category-section");
      const navItems = learningCultureNav2.querySelectorAll("[data-target]");
      if (state2.topicPageOpen) {
        learningCultureNav2.classList.add("visible");
        const activeCategoryId = state2.expandedCategoryId ?? categoryIdForTopic2(state2.selectedTopicId);
        navItems.forEach((item) => {
          const isActive = item.dataset.target === activeCategoryId;
          item.classList.toggle("active", isActive);
          item.toggleAttribute("aria-current", isActive);
        });
        return;
      }
      if (!cardGrid || state2.currentView !== "topics" || topicPanel2.classList.contains("is-hidden")) {
        learningCultureNav2.classList.remove("visible");
        return;
      }
      const showNav = window.scrollY > cardGrid.offsetTop + cardGrid.offsetHeight - 60;
      learningCultureNav2.classList.toggle("visible", showNav);
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
    return { currentTopic: currentTopic2, currentNumberStage: currentNumberStage2, focusItemsForTopic: focusItemsForTopic2, currentFocusItem: currentFocusItem2, shuffleArray: shuffleArray2, topicById: topicById2, selectedTopicGroupId: selectedTopicGroupId2, bookById: bookById2, bookCategoryForBook: bookCategoryForBook2, currentBook: currentBook2, currentLesson: currentLesson2, syncBookSelectionFromTopic: syncBookSelectionFromTopic2, syncLessonSelectionFromTopic: syncLessonSelectionFromTopic2, focusLearningPanel: focusLearningPanel2, scrollToSectionTop: scrollToSectionTop2, narrowTopicBrowserTo: narrowTopicBrowserTo2, categoryIdForTopic: categoryIdForTopic2, updateTopicPageVisibility: updateTopicPageVisibility2, scrollCategorySectionIntoView: scrollCategorySectionIntoView2, openTopicPage: openTopicPage2, switchView: switchView2, toggleTopicGroup: toggleTopicGroup2, renderTopicScene: renderTopicScene2, displayControlsMarkup: displayControlsMarkup2, bindDisplayControls: bindDisplayControls2, renderTopicStickyNav: renderTopicStickyNav2, bookAccent: bookAccent2, renderBookStickyNav: renderBookStickyNav2, renderStickyNav: renderStickyNav2, categoryIconMarkup: categoryIconMarkup2, renderTopics: renderTopics2, renderBooks: renderBooks2, updateLearningCultureNav: updateLearningCultureNav2 };
  }

  // src/core/router.js
  function viewFromLocation(location) {
    const params = new URLSearchParams(location.search);
    const requestedView = params.get("view");
    const hash = location.hash.replace("#", "");
    return requestedView === "books" || hash === "books" || hash === "books-panel" ? "books" : "topics";
  }
  function topicIdFromLocation(location, hasTopic) {
    const topicId = new URLSearchParams(location.search).get("topic");
    return hasTopic(topicId) ? topicId : null;
  }
  function topicPageUrl(location, topicId) {
    return `${location.pathname}?topic=${encodeURIComponent(topicId)}#topic-detail`;
  }

  // src/features/time-daily-life/weekdays.js
  var timeDateWeekItems2 = [
    ["monday", "\u661F\u671F\u4E00", "x\u012Bng q\u012B y\u012B", "Monday", "\u661F\u671F\u4E00\uFF0C\u6211\u4EEC\u5750\u6821\u8F66\u53BB\u5B66\u6821\u3002", "x\u012Bng q\u012B y\u012B, w\u01D2 men zu\xF2 xi\xE0o ch\u0113 q\xF9 xu\xE9 xi\xE0o.", "On Monday, we take the school bus to school.", "Monday.webp"],
    ["tuesday", "\u661F\u671F\u4E8C", "x\u012Bng q\u012B \xE8r", "Tuesday", "\u661F\u671F\u4E8C\uFF0C\u6211\u4EEC\u4E0A\u4F53\u80B2\u8BFE\u3002", "x\u012Bng q\u012B \xE8r, w\u01D2 men sh\xE0ng t\u01D0 y\xF9 k\xE8.", "On Tuesday, we have PE class.", "Tuesday.webp"],
    ["wednesday", "\u661F\u671F\u4E09", "x\u012Bng q\u012B s\u0101n", "Wednesday", "\u661F\u671F\u4E09\uFF0C\u6211\u4EEC\u4E0A\u7F8E\u672F\u8BFE\u3002", "x\u012Bng q\u012B s\u0101n, w\u01D2 men sh\xE0ng m\u011Bi sh\xF9 k\xE8.", "On Wednesday, we have art class.", "Wednesday.webp"],
    ["thursday", "\u661F\u671F\u56DB", "x\u012Bng q\u012B s\xEC", "Thursday", "\u661F\u671F\u56DB\uFF0C\u6211\u4EEC\u4E0A\u97F3\u4E50\u8BFE\u3002", "x\u012Bng q\u012B s\xEC, w\u01D2 men sh\xE0ng y\u012Bn yu\xE8 k\xE8.", "On Thursday, we have music class.", "Thursday.webp", "\u661F\u671F\u56DB\uFF0C\u6211\u4EEC\u4E0A\u97F3\u6708\u8BFE\u3002"],
    ["friday", "\u661F\u671F\u4E94", "x\u012Bng q\u012B w\u01D4", "Friday", "\u661F\u671F\u4E94\uFF0C\u6211\u4EEC\u53BB\u56FE\u4E66\u9986\u770B\u4E66\u3002", "x\u012Bng q\u012B w\u01D4, w\u01D2 men q\xF9 t\xFA sh\u016B gu\u01CEn k\xE0n sh\u016B.", "On Friday, we read at the library.", "Friday.webp"],
    ["saturday", "\u661F\u671F\u516D", "x\u012Bng q\u012B li\xF9", "Saturday", "\u661F\u671F\u516D\uFF0C\u6211\u4EEC\u53BB\u516C\u56ED\u9A91\u81EA\u884C\u8F66\u3002", "x\u012Bng q\u012B li\xF9, w\u01D2 men q\xF9 g\u014Dng yu\xE1n q\xED z\xEC x\xEDng ch\u0113.", "On Saturday, we ride bikes in the park.", "Saturday.webp"],
    ["sunday", "\u661F\u671F\u5929", "x\u012Bng q\u012B ti\u0101n", "Sunday", "\u661F\u671F\u5929\uFF0C\u6211\u4EEC\u5728\u5BB6\u770B\u7535\u5F71\u3002", "x\u012Bng q\u012B ti\u0101n, w\u01D2 men z\xE0i ji\u0101 k\xE0n di\xE0n y\u01D0ng.", "On Sunday, we watch a movie at home.", "Sunday.webp"]
  ].map(([id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, file, audio]) => ({ id, hanzi, pinyin, english, context, contextPinyin, contextEnglish, audio: audio ?? context, imagePath: `assets/illustrated-day-of-week/${file}` }));

  // src/features/time-daily-life/time.js
  var timeDateClockItems = [
    [1, "\u4E00\u70B9", "y\u012B di\u01CEn"],
    [2, "\u4E24\u70B9", "li\u01CEng di\u01CEn"],
    [3, "\u4E09\u70B9", "s\u0101n di\u01CEn"],
    [4, "\u56DB\u70B9", "s\xEC di\u01CEn"],
    [5, "\u4E94\u70B9", "w\u01D4 di\u01CEn"],
    [6, "\u516D\u70B9", "li\xF9 di\u01CEn"],
    [7, "\u4E03\u70B9", "q\u012B di\u01CEn"],
    [8, "\u516B\u70B9", "b\u0101 di\u01CEn"],
    [9, "\u4E5D\u70B9", "ji\u01D4 di\u01CEn"],
    [10, "\u5341\u70B9", "sh\xED di\u01CEn"],
    [11, "\u5341\u4E00\u70B9", "sh\xED y\u012B di\u01CEn"],
    [12, "\u5341\u4E8C\u70B9", "sh\xED \xE8r di\u01CEn"]
  ].map(([hour, hanzi, pinyin]) => ({ id: `clock-${hour}`, hanzi, pinyin, english: `${hour} o'clock`, audio: hanzi, imagePath: `assets/illustrated-clocks/${hour}oclock.webp` }));
  var timeDateExpressionItems = [
    { id: "seven-oclock", hanzi: "\u4E03\u70B9", pinyin: "q\u012B di\u01CEn", english: "7:00", audio: "\u4E03\u70B9" },
    { id: "quarter-past-seven", hanzi: "\u4E03\u70B9\u4E00\u523B", pinyin: "q\u012B di\u01CEn y\u012B k\xE8", english: "7:15", audio: "\u4E03\u70B9\u4E00\u523B" },
    { id: "fifteen-past-seven", hanzi: "\u4E03\u70B9\u5341\u4E94\u5206", pinyin: "q\u012B di\u01CEn sh\xED w\u01D4 f\u0113n", english: "7:15", audio: "\u4E03\u70B9\u5341\u4E94\u5206" },
    { id: "half-past-seven", hanzi: "\u4E03\u70B9\u534A", pinyin: "q\u012B di\u01CEn b\xE0n", english: "7:30", audio: "\u4E03\u70B9\u534A" },
    { id: "thirty-past-seven", hanzi: "\u4E03\u70B9\u4E09\u5341\u5206", pinyin: "q\u012B di\u01CEn s\u0101n sh\xED f\u0113n", english: "7:30", audio: "\u4E03\u70B9\u4E09\u5341\u5206" },
    { id: "three-quarters-seven", hanzi: "\u4E03\u70B9\u4E09\u523B", pinyin: "q\u012B di\u01CEn s\u0101n k\xE8", english: "7:45", audio: "\u4E03\u70B9\u4E09\u523B" },
    { id: "forty-five-past-seven", hanzi: "\u4E03\u70B9\u56DB\u5341\u4E94\u5206", pinyin: "q\u012B di\u01CEn s\xEC sh\xED w\u01D4 f\u0113n", english: "7:45", audio: "\u4E03\u70B9\u56DB\u5341\u4E94\u5206" }
  ];
  var timeDateRoutineItems = [
    ["wake-up", "\u4E03\u70B9\u8D77\u5E8A\u3002", "q\u012B di\u01CEn q\u01D0 chu\xE1ng.", "Wake up at 7:00.", "\u4E03\u70B9\u8D77\u5E8A", "07am-lele-wake-up.webp"],
    ["breakfast", "\u4E03\u70B9\u5341\u4E94\u5206\u5403\u65E9\u996D\u3002", "q\u012B di\u01CEn sh\xED w\u01D4 f\u0113n ch\u012B z\u01CEo f\xE0n.", "Have breakfast at 7:15.", "\u4E03\u70B9\u5341\u4E94\u5206\u5403\u65E9\u996D", "0715am-lele-having-breakfast.webp"],
    ["school", "\u516B\u70B9\u53BB\u5B66\u6821\u3002", "b\u0101 di\u01CEn q\xF9 xu\xE9 xi\xE0o.", "Go to school at 8:00.", "\u516B\u70B9\u53BB\u5B66\u6821", "08am-go-to-school.webp"],
    ["writing", "\u5341\u70B9\u4E0A\u5199\u5B57\u8BFE\u3002", "sh\xED di\u01CEn sh\xE0ng xi\u011B z\xEC k\xE8.", "Writing class at 10:00.", "\u5341\u70B9\u4E0A\u5199\u5B57\u8BFE", "10am-writing-class.webp"],
    ["lunch", "\u5341\u4E8C\u70B9\u5403\u5348\u996D\u3002", "sh\xED \xE8r di\u01CEn ch\u012B w\u01D4 f\xE0n.", "Have lunch at 12:00.", "\u5341\u4E8C\u70B9\u5403\u5348\u996D", "12pm-lunch-time.webp"],
    ["home", "\u4E24\u70B9\u534A\u653E\u5B66\u3002", "li\u01CEng di\u01CEn b\xE0n f\xE0ng xu\xE9.", "School ends at 2:30.", "\u4E24\u70B9\u534A\u653E\u5B66", "0230pm-school-dismissal.webp"],
    ["playground", "\u56DB\u70B9\u53BB\u64CD\u573A\u73A9\u3002", "s\xEC di\u01CEn q\xF9 c\u0101o ch\u01CEng w\xE1n.", "Play outside at 4:00.", "\u56DB\u70B9\u53BB\u64CD\u573A\u73A9", "04pm-playground.webp"],
    ["dinner", "\u516D\u70B9\u5403\u665A\u996D\u3002", "li\xF9 di\u01CEn ch\u012B w\u01CEn f\xE0n.", "Have dinner at 6:00.", "\u516D\u70B9\u5403\u665A\u996D", "06pm-family-dinner.webp"],
    ["tv", "\u4E03\u70B9\u770B\u7535\u89C6\u3002", "q\u012B di\u01CEn k\xE0n di\xE0n sh\xEC.", "Watch TV at 7:00.", "\u4E03\u70B9\u770B\u7535\u89C6", "07pm-tv-time.webp"],
    ["story", "\u516B\u70B9\u8BB2\u6545\u4E8B\u3002", "b\u0101 di\u01CEn ji\u01CEng g\xF9 sh\xEC.", "Story time at 8:00.", "\u516B\u70B9\u8BB2\u6545\u4E8B", "08pm-story-time.webp"],
    ["bedtime", "\u4E5D\u70B9\u7761\u89C9\u3002", "ji\u01D4 di\u01CEn shu\xEC ji\xE0o.", "Go to bed at 9:00.", "\u4E5D\u70B9\u7761\u89C9", "09pm-bedtime.webp"]
  ].map(([id, hanzi, pinyin, english, audio, file]) => ({ id, hanzi, pinyin, english, audio, imagePath: `assets/illustrated-clock-routines/${file}` }));

  // src/features/time-daily-life/dates.js
  var timeDateDateItems = [
    { id: "date-board", hanzi: "\u51E0\u6708\u51E0\u53F7\uFF1F", pinyin: "j\u01D0 yu\xE8 j\u01D0 h\xE0o?", english: "What month and day?", context: "\u770B\u65E5\u5386\uFF0C\u53EF\u4EE5\u77E5\u9053\u51E0\u6708\u51E0\u53F7\u3002", audio: "\u51E0\u6708\u51E0\u53F7", imagePath: "assets/illustrated-dates/calendar-example-dates-board.webp" },
    { id: "new-year", hanzi: "\u4E00\u6708\u4E00\u53F7", pinyin: "y\u012B yu\xE8 y\u012B h\xE0o", english: "January first", context: "\u4E00\u6708\u4E00\u53F7\u662F\u65B0\u5E74\u3002", audio: "\u4E00\u6708\u4E00\u53F7\u662F\u65B0\u5E74", imagePath: "assets/illustrated-dates/january-first-new-year-calendar.webp" },
    { id: "field-trip", hanzi: "\u4E94\u6708\u4E8C\u5341\u53F7", pinyin: "w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o", english: "May twentieth", context: "\u4E94\u6708\u4E8C\u5341\u53F7\uFF0C\u6211\u4EEC\u53BB\u6625\u6E38\u3002", audio: "\u4E94\u6708\u4E8C\u5341\u53F7\u6211\u4EEC\u53BB\u6625\u6E38", imagePath: "assets/illustrated-dates/may-twentieth-field-trip-calendar.webp" },
    { id: "christmas", hanzi: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7", pinyin: "sh\xED \xE8r yu\xE8 \xE8r sh\xED w\u01D4 h\xE0o", english: "December twenty-fifth", context: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7\u662F\u5723\u8BDE\u8282\u3002", audio: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7\u662F\u5723\u8BDE\u8282", imagePath: "assets/illustrated-dates/december-twenty-fifth-christmas-calendar.webp" },
    { id: "birthday", hanzi: "\u751F\u65E5\u5FEB\u4E50\uFF01", pinyin: "sh\u0113ng r\xEC ku\xE0i l\xE8!", english: "Happy birthday!", context: "\u4ECA\u5929\u662F\u6211\u7684\u751F\u65E5\u3002\u751F\u65E5\u5FEB\u4E50\uFF01", audio: "\u4ECA\u5929\u662F\u6211\u7684\u751F\u65E5\u751F\u65E5\u5FEB\u4E50", imagePath: "assets/illustrated-dates/birthday-party-scene.webp" }
  ];
  var timeDateMonthItems = [
    ["January", "\u4E00\u6708", "y\u012B yu\xE8", "\u4E00\u6708\uFF0C\u65B0\u5E74\u7684\u7B2C\u4E00\u4E2A\u6708\u3002", "y\u012B yu\xE8, x\u012Bn ni\xE1n de d\xEC y\u012B ge yu\xE8.", "January: the first month of the new year."],
    ["February", "\u4E8C\u6708", "\xE8r yu\xE8", "\u4E8C\u6708\uFF0C\u4E2D\u56FD\u65B0\u5E74\u3002", "\xE8r yu\xE8, Zh\u014Dng gu\xF3 x\u012Bn ni\xE1n.", "February: Chinese New Year."],
    ["March", "\u4E09\u6708", "s\u0101n yu\xE8", "\u4E09\u6708\uFF0C\u5723\u5E15\u7279\u91CC\u514B\u8282\u3002", "s\u0101n yu\xE8, Sh\xE8ng p\xE0 t\xE8 l\u01D0 k\xE8 Ji\xE9.", "March: St. Patrick's Day."],
    ["April", "\u56DB\u6708", "s\xEC yu\xE8", "\u56DB\u6708\uFF0C\u6811\u5F00\u59CB\u53D1\u82BD\u3002", "s\xEC yu\xE8, sh\xF9 k\u0101i sh\u01D0 f\u0101 y\xE1.", "In April, trees start to bud."],
    ["May", "\u4E94\u6708", "w\u01D4 yu\xE8", "\u4E94\u6708\uFF0C\u6BCD\u4EB2\u8282\u3002", "w\u01D4 yu\xE8, M\u01D4 q\u012Bn Ji\xE9.", "May: Mother's Day."],
    ["June", "\u516D\u6708", "li\xF9 yu\xE8", "\u516D\u6708\uFF0C\u6691\u5047\u5FEB\u5230\u4E86\u3002", "li\xF9 yu\xE8, sh\u01D4 ji\xE0 ku\xE0i d\xE0o le.", "In June, summer vacation is coming soon."],
    ["July", "\u4E03\u6708", "q\u012B yu\xE8", "\u4E03\u6708\uFF0C\u53BB\u6D77\u8FB9\u73A9\u3002", "q\u012B yu\xE8, q\xF9 h\u01CEi bi\u0101n w\xE1n.", "In July, go to the beach."],
    ["August", "\u516B\u6708", "b\u0101 yu\xE8", "\u516B\u6708\uFF0C\u53BB\u5EA6\u5047\u3002", "b\u0101 yu\xE8, q\xF9 d\xF9 ji\xE0.", "In August, go on vacation."],
    ["September", "\u4E5D\u6708", "ji\u01D4 yu\xE8", "\u4E5D\u6708\uFF0C\u5F00\u5B66\u4E86\u3002", "ji\u01D4 yu\xE8, k\u0101i xu\xE9 le.", "In September, school starts."],
    ["October", "\u5341\u6708", "sh\xED yu\xE8", "\u5341\u6708\uFF0C\u6811\u53F6\u53D8\u7EA2\u4E86\u3002", "sh\xED yu\xE8, sh\xF9 y\xE8 bi\xE0n h\xF3ng le.", "In October, leaves turn red."],
    ["November", "\u5341\u4E00\u6708", "sh\xED y\u012B yu\xE8", "\u5341\u4E00\u6708\uFF0C\u611F\u6069\u8282\u3002", "sh\xED y\u012B yu\xE8, G\u01CEn \u0113n Ji\xE9.", "Thanksgiving is in November."],
    ["December", "\u5341\u4E8C\u6708", "sh\xED \xE8r yu\xE8", "\u5341\u4E8C\u6708\uFF0C\u53BB\u6ED1\u96EA\u3002", "sh\xED \xE8r yu\xE8, q\xF9 hu\xE1 xu\u011B.", "In December, go skiing."]
  ].map(([english, hanzi, pinyin, context, contextPinyin, contextEnglish]) => ({ id: english.toLowerCase(), hanzi, pinyin, english, context, contextPinyin, contextEnglish, hideLabelHanzi: true, hideLabelDetails: true, audio: context, imagePath: `assets/illustrated-months-of-year/${english}.webp` }));
  var datePracticeItems = [
    { id: "date-new-year", hanzi: "\u4E00\u6708\u4E00\u53F7", pinyin: "y\u012B yu\xE8 y\u012B h\xE0o", english: "January first", audio: "\u4E00\u6708\u4E00\u53F7\u662F\u65B0\u5E74", eventHanzi: "\u65B0\u5E74", eventPinyin: "x\u012Bn ni\xE1n", eventEnglish: "New Year" },
    { id: "date-chinese-new-year", hanzi: "\u4E8C\u6708", pinyin: "\xE8r yu\xE8", english: "February", audio: "\u4E8C\u6708\u4E2D\u56FD\u65B0\u5E74", eventHanzi: "\u4E2D\u56FD\u65B0\u5E74", eventPinyin: "Zh\u014Dng gu\xF3 x\u012Bn ni\xE1n", eventEnglish: "Chinese New Year" },
    { id: "date-field-trip", hanzi: "\u4E94\u6708\u4E8C\u5341\u53F7", pinyin: "w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o", english: "May twentieth", audio: "\u4E94\u6708\u4E8C\u5341\u53F7\u6211\u4EEC\u53BB\u6625\u6E38", eventHanzi: "\u6625\u6E38", eventPinyin: "ch\u016Bn y\xF3u", eventEnglish: "Field trip" },
    { id: "date-christmas", hanzi: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7", pinyin: "sh\xED \xE8r yu\xE8 \xE8r sh\xED w\u01D4 h\xE0o", english: "December twenty-fifth", audio: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7\u662F\u5723\u8BDE\u8282", eventHanzi: "\u5723\u8BDE\u8282", eventPinyin: "Sh\xE8ng d\xE0n Ji\xE9", eventEnglish: "Christmas" },
    { id: "birthday-wish", hanzi: "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF01", pinyin: "zh\xF9 n\u01D0 sh\u0113ng r\xEC ku\xE0i l\xE8!", english: "Happy birthday!", audio: "\u795D\u4F60\u751F\u65E5\u5FEB\u4E50" },
    { id: "birthday-party", hanzi: "\u751F\u65E5\u4F1A\u4E0A\u6709\u793C\u7269\u3002", pinyin: "sh\u0113ng r\xEC hu\xEC sh\xE0ng y\u01D2u l\u01D0 w\xF9.", english: "There are presents at a birthday party.", audio: "\u751F\u65E5\u4F1A\u4E0A\u6709\u793C\u7269" }
  ];

  // src/features/time-daily-life/comparisons.js
  var comparisonsTopic = {
    id: "comparisons",
    title: "Descriptions & Comparisons",
    summary: "Compare size, amount, speed, length, temperature, and more.",
    progressLabel: "2B Lesson 6",
    iconText: "\u5927\u5C0F",
    iconColor: "#aa7051",
    focus: { hanzi: "\u5927\u548C\u5C0F", pinyin: "d\xE0 h\xE9 xi\u01CEo", english: "big and small", audio: "\u5927\u548C\u5C0F" },
    interactiveScene: "comparisons",
    parentGuide: "Compare real objects together: a big and small cup, a long and short pencil, or a fast and slow walk.",
    cultureGuide: "Comparison words are useful across nearly every later topic because children can see and act them out immediately.",
    activities: ["Tap to hear", "Compare two things", "Say what you see"],
    steps: [{ book: "2B", lesson: 6, title: "Big or small", note: "Use opposite description words." }]
  };
  var comparisonVisualItems = [
    ["\u5927\uFF0C\u5C0F", "d\xE0, xi\u01CEo", "big, small", "big-small-animals.webp", ["\u5927", "\u5C0F"]],
    ["\u591A\uFF0C\u5C11", "du\u014D, sh\u01CEo", "many, few", "many-few-carrots.webp", ["\u591A", "\u5C11"]],
    ["\u5FEB\uFF0C\u6162", "ku\xE0i, m\xE0n", "fast, slow", "fast-slow-running.webp", ["\u5FEB", "\u6162"]],
    ["\u957F\uFF0C\u77ED", "ch\xE1ng, du\u01CEn", "long, short", "long-short-pencils.webp", ["\u957F", "\u77ED"]],
    ["\u9AD8\uFF0C\u77EE", "g\u0101o, \u01CEi", "tall, short", "tall-short-animals.webp", ["\u9AD8", "\u77EE"]],
    ["\u51B7\uFF0C\u70ED", "l\u011Bng, r\xE8", "cold, hot", "cold-hot-foods.webp", ["\u51B7", "\u70ED"]],
    ["\u65B0\uFF0C\u65E7", "x\u012Bn, ji\xF9", "new, old", "new-old-teddy-bears.webp", ["\u65B0", "\u65E7"]]
  ].map(([hanzi, pinyin, english, file, words]) => ({ id: file, hanzi, pinyin, english, words, audio: hanzi, imagePath: `assets/illustrated-comparisons/${file}` }));
  var comparisonPracticeItems = [
    { id: "big-small-animals.webp", before: "\u5927\u8C61\u5F88", between: "\uFF0C\u5154\u5B50\u5F88", after: "\u3002", target: ["\u5927", "\u5C0F"], options: ["\u5927", "\u5C0F", "\u957F", "\u77ED"], pinyin: "D\xE0 xi\xE0ng h\u011Bn d\xE0, t\xF9 zi h\u011Bn xi\u01CEo.", english: "The elephant is big and the rabbit is small." },
    { id: "many-few-carrots.webp", before: "\u8FD9\u8FB9\u7684\u80E1\u841D\u535C\u5F88", between: "\uFF0C\u90A3\u8FB9\u7684\u80E1\u841D\u535C\u5F88", after: "\u3002", target: ["\u591A", "\u5C11"], options: ["\u591A", "\u5C11", "\u5FEB", "\u6162"], pinyin: "Zh\xE8 bi\u0101n de h\xFA lu\xF3 bo h\u011Bn du\u014D, n\xE0 bi\u0101n de h\xFA lu\xF3 bo h\u011Bn sh\u01CEo.", english: "These carrots are many, and those carrots are few." },
    { id: "fast-slow-running.webp", before: "\u5154\u5B50\u8DD1\u5F97\u5F88", between: "\uFF0C\u4E4C\u9F9F\u8DD1\u5F97\u5F88", after: "\u3002", target: ["\u5FEB", "\u6162"], options: ["\u5FEB", "\u6162", "\u5927", "\u5C0F"], pinyin: "T\xF9 zi p\u01CEo de h\u011Bn ku\xE0i, w\u016B gu\u012B p\u01CEo de h\u011Bn m\xE0n.", english: "The rabbit runs fast and the turtle runs slowly." },
    { id: "long-short-pencils.webp", before: "\u8FD9\u652F\u94C5\u7B14\u5F88", between: "\uFF0C\u90A3\u652F\u94C5\u7B14\u5F88", after: "\u3002", target: ["\u957F", "\u77ED"], options: ["\u957F", "\u77ED", "\u51B7", "\u70ED"], pinyin: "Zh\xE8 zh\u012B qi\u0101n b\u01D0 h\u011Bn ch\xE1ng, n\xE0 zh\u012B qi\u0101n b\u01D0 h\u011Bn du\u01CEn.", english: "This pencil is long and that pencil is short." },
    { id: "tall-short-animals.webp", before: "\u957F\u9888\u9E7F\u5F88", between: "\uFF0C\u5154\u5B50\u5F88", after: "\u3002", target: ["\u9AD8", "\u77EE"], options: ["\u9AD8", "\u77EE", "\u65B0", "\u65E7"], pinyin: "Ch\xE1ng j\u01D0ng l\xF9 h\u011Bn g\u0101o, t\xF9 zi h\u011Bn \u01CEi.", english: "The giraffe is tall and the rabbit is short." },
    { id: "cold-hot-foods.webp", before: "\u51B0\u68D2\u5F88", between: "\uFF0C\u9762\u5305\u5F88", after: "\u3002", target: ["\u51B7", "\u70ED"], options: ["\u51B7", "\u70ED", "\u591A", "\u5C11"], pinyin: "B\u012Bng b\xE0ng h\u011Bn l\u011Bng, mi\xE0n b\u0101o h\u011Bn r\xE8.", english: "The ice pop is cold and the bread is hot." },
    { id: "new-old-teddy-bears.webp", before: "\u8FD9\u4E2A\u6CF0\u8FEA\u718A\u5F88", between: "\uFF0C\u90A3\u4E2A\u6CF0\u8FEA\u718A\u5F88", after: "\u3002", target: ["\u65B0", "\u65E7"], options: ["\u65B0", "\u65E7", "\u5FEB", "\u6162"], pinyin: "Zh\xE8 ge t\xE0i d\xED xi\xF3ng h\u011Bn x\u012Bn, n\xE0 ge t\xE0i d\xED xi\xF3ng h\u011Bn ji\xF9.", english: "This teddy bear is new and that teddy bear is old." }
  ];
  var comparisonWordItems = [
    ["\u5927", "d\xE0", "big"],
    ["\u5C0F", "xi\u01CEo", "small"],
    ["\u591A", "du\u014D", "many"],
    ["\u5C11", "sh\u01CEo", "few"],
    ["\u5FEB", "ku\xE0i", "fast"],
    ["\u6162", "m\xE0n", "slow"],
    ["\u957F", "ch\xE1ng", "long"],
    ["\u77ED", "du\u01CEn", "short"],
    ["\u9AD8", "g\u0101o", "tall"],
    ["\u77EE", "\u01CEi", "short"],
    ["\u51B7", "l\u011Bng", "cold"],
    ["\u70ED", "r\xE8", "hot"],
    ["\u65B0", "x\u012Bn", "new"],
    ["\u65E7", "ji\xF9", "old"]
  ].map(([hanzi, pinyin, english]) => ({ hanzi, pinyin, english }));

  // src/features/time-daily-life/positions.js
  var positionsTopic = {
    id: "positions",
    title: "Positions & Directions",
    summary: "Use up, down, inside, outside, and directions to describe where things are.",
    progressLabel: "3B Lesson 3",
    iconText: "\u4E0A\u4E0B",
    iconColor: "#587d9c",
    focus: { hanzi: "\u5728\u4E0A\u9762\u3002", pinyin: "z\xE0i sh\xE0ng mi\xE0n.", english: "It is on top.", audio: "\u5728\u4E0A\u9762" },
    interactiveScene: "positions",
    parentGuide: "Use a book, backpack, and pencil case to act out each position before naming it.",
    cultureGuide: "Position language becomes useful quickly in classroom directions, home routines, and simple games.",
    activities: ["Tap to hear", "Find the position", "Say where it is"],
    steps: [{ book: "3B", lesson: 3, title: "Positions", note: "Describe where objects are." }]
  };
  var positionVisualItems = [
    ["\u4E0A\u548C\u4E0B", "sh\xE0ng h\xE9 xi\xE0", "up and down", "positions-up-down.webp"],
    ["\u91CC\u548C\u5916", "l\u01D0 h\xE9 w\xE0i", "inside and outside", "positions-inside-outside.webp"],
    ["\u4E0A\u3001\u4E0B\u3001\u524D\u3001\u540E\u3001\u5DE6\u3001\u53F3", "sh\xE0ng, xi\xE0, qi\xE1n, h\xF2u, zu\u01D2, y\xF2u", "up, down, front, back, left, right", "positions-all-directions.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-rooms/${file}` }));
  var positionScenes = [
    {
      id: "up-down",
      number: "1",
      prompt: "Up and down",
      imagePath: "assets/illustrated-rooms/positions-up-down.webp",
      imageAlt: "A book and backpack showing up and down positions around a desk",
      lines: [
        { hanzi: "\u4E66\u5728\u684C\u5B50\u4E0A\u3002", pinyin: "sh\u016B z\xE0i zhu\u014D zi sh\xE0ng.", english: "The book is on the desk.", audio: "\u4E66\u5728\u684C\u5B50\u4E0A" },
        { hanzi: "\u684C\u5B50\u4E0A\u6709\u4E66\u3002", pinyin: "zhu\u014D zi sh\xE0ng y\u01D2u sh\u016B.", english: "There is a book on the desk.", audio: "\u684C\u5B50\u4E0A\u6709\u4E66" },
        { hanzi: "\u4E66\u5305\u5728\u684C\u5B50\u4E0B\u3002", pinyin: "sh\u016B b\u0101o z\xE0i zhu\u014D zi xi\xE0.", english: "The backpack is under the desk.", audio: "\u4E66\u5305\u5728\u684C\u5B50\u4E0B" }
      ]
    },
    {
      id: "inside-outside",
      number: "2",
      prompt: "Inside and outside",
      imagePath: "assets/illustrated-rooms/positions-inside-outside.webp",
      imageAlt: "A backpack, book, and pencil case showing inside and outside positions",
      lines: [
        { hanzi: "\u4E66\u5305\u91CC\u6709\u4E66\u3002", pinyin: "sh\u016B b\u0101o l\u01D0 y\u01D2u sh\u016B.", english: "There is a book in the backpack.", audio: "\u4E66\u5305\u91CC\u6709\u4E66" },
        { hanzi: "\u4E66\u5728\u4E66\u5305\u91CC\u3002", pinyin: "sh\u016B z\xE0i sh\u016B b\u0101o l\u01D0.", english: "The book is in the backpack.", audio: "\u4E66\u5728\u4E66\u5305\u91CC" },
        { hanzi: "\u6587\u5177\u76D2\u5728\u4E66\u5305\u5916\u9762\u3002", pinyin: "w\xE9n j\xF9 h\xE9 z\xE0i sh\u016B b\u0101o w\xE0i mi\xE0n.", english: "The pencil case is outside the backpack.", audio: "\u6587\u5177\u76D2\u5728\u4E66\u5305\u5916\u9762" }
      ]
    },
    {
      id: "directions",
      number: "3",
      prompt: "Front, back, left, and right",
      imagePath: "assets/illustrated-rooms/positions-all-directions.webp",
      imageAlt: "A room board showing front, back, left, and right directions",
      lines: [
        { hanzi: "\u4E0A\u3001\u4E0B\u3001\u524D\u3001\u540E\u3001\u5DE6\u3001\u53F3\u3002", pinyin: "sh\xE0ng, xi\xE0, qi\xE1n, h\xF2u, zu\u01D2, y\xF2u.", english: "Up, down, front, back, left, right.", audio: "\u4E0A\u4E0B\u524D\u540E\u5DE6\u53F3" }
      ]
    },
    {
      id: "room-directions",
      number: "4",
      prompt: "Directions in a room",
      imagePath: "assets/illustrated-rooms/positions-room.webp",
      imageAlt: "A girl, chair, bookshelf, and dog in a room for practicing directions",
      lines: [
        { hanzi: "\u5973\u5B69\u5728\u684C\u5B50\u524D\u9762\u3002", pinyin: "n\u01DA h\xE1i z\xE0i zhu\u014D zi qi\xE1n mi\xE0n.", english: "The girl is in front of the desk.", audio: "\u5973\u5B69\u5728\u684C\u5B50\u524D\u9762" },
        { hanzi: "\u6905\u5B50\u5728\u5973\u5B69\u540E\u9762\u3002", pinyin: "y\u01D0 zi z\xE0i n\u01DA h\xE1i h\xF2u mi\xE0n.", english: "The chair is behind the girl.", audio: "\u6905\u5B50\u5728\u5973\u5B69\u540E\u9762" },
        { hanzi: "\u4E66\u67B6\u5728\u5973\u5B69\u5DE6\u8FB9\u3002", pinyin: "sh\u016B ji\xE0 z\xE0i n\u01DA h\xE1i zu\u01D2 bi\u0101n.", english: "The bookshelf is to the girl's left.", audio: "\u4E66\u67B6\u5728\u5973\u5B69\u5DE6\u8FB9" },
        { hanzi: "\u5C0F\u72D7\u5728\u5973\u5B69\u53F3\u8FB9\u3002", pinyin: "xi\u01CEo g\u01D2u z\xE0i n\u01DA h\xE1i y\xF2u bi\u0101n.", english: "The dog is to the girl's right.", audio: "\u5C0F\u72D7\u5728\u5973\u5B69\u53F3\u8FB9" }
      ]
    }
  ];
  var positionPracticeItems = positionScenes.flatMap((scene) => scene.lines.map((line, index) => ({ id: `${scene.id}-${index}`, ...line, imagePath: scene.imagePath, imageAlt: scene.imageAlt })));

  // src/features/time-daily-life/transport.js
  var transportTopic = {
    id: "transport",
    title: "Transportation",
    summary: "Talk about how people travel to school, places, and family visits.",
    progressLabel: "4A Lesson 6",
    iconText: "\u4EA4\u901A",
    iconColor: "#6d8a4f",
    focus: { hanzi: "\u6211\u5750\u6821\u8F66\u53BB\u52A8\u7269\u56ED\u3002", pinyin: "w\u01D2 zu\xF2 xi\xE0o ch\u0113 q\xF9 d\xF2ng w\xF9 yu\xE1n.", english: "I take the school bus to the zoo.", audio: "\u6211\u5750\u6821\u8F66\u53BB\u52A8\u7269\u56ED" },
    interactiveScene: "transport",
    parentGuide: "Start with how the child actually gets to school, then use the other scenes as conversation prompts.",
    cultureGuide: "Travel scenes make useful speaking practice because each vehicle has a clear destination and reason for the trip.",
    activities: ["Tap to hear", "Choose the vehicle", "Talk about a trip"],
    steps: [{ book: "4A", lesson: 6, title: "Means of transport", note: "Say how people travel." }]
  };
  var transportVisualItems = [
    ["\u6211\u8D70\u8DEF\u53BB\u4E0A\u5B66\u3002", "w\u01D2 z\u01D2u l\xF9 q\xF9 sh\xE0ng xu\xE9.", "I walk to school.", "walk-to-school.webp"],
    ["\u6211\u9A91\u81EA\u884C\u8F66\u53BB\u4E0A\u5B66\u3002", "w\u01D2 q\xED z\xEC x\xEDng ch\u0113 q\xF9 sh\xE0ng xu\xE9.", "I ride a bike to school.", "bike-to-school.webp"],
    ["\u6211\u5750\u6821\u8F66\u53BB\u52A8\u7269\u56ED\u3002", "w\u01D2 zu\xF2 xi\xE0o ch\u0113 q\xF9 d\xF2ng w\xF9 yu\xE1n.", "I take the school bus to the zoo.", "school-bus-to-zoo.webp"],
    ["\u6211\u5750\u51FA\u79DF\u8F66\u53BB\u673A\u573A\u3002", "w\u01D2 zu\xF2 ch\u016B z\u016B ch\u0113 q\xF9 j\u012B ch\u01CEng.", "I take a taxi to the airport.", "taxi-to-airport.webp"],
    ["\u6211\u5750\u98DE\u673A\u53BB\u770B\u7237\u7237\u5976\u5976\u3002", "w\u01D2 zu\xF2 f\u0113i j\u012B q\xF9 k\xE0n y\xE9 ye n\u01CEi nai.", "I take an airplane to visit my grandparents.", "airplane-to-grandparents.webp"],
    ["\u6211\u5750\u706B\u8F66\u53BB\u5317\u4EAC\u3002", "w\u01D2 zu\xF2 hu\u01D2 ch\u0113 q\xF9 B\u011Bi j\u012Bng.", "I take a train to Beijing.", "train-to-beijing.webp"],
    ["\u6211\u5750\u5988\u5988\u7684\u8F66\u53BB\u4E0A\u5B66\u3002", "w\u01D2 zu\xF2 m\u0101 ma de ch\u0113 q\xF9 sh\xE0ng xu\xE9.", "I ride in Mom's car to school.", "mom-car-to-school.webp"],
    ["\u6211\u5750\u7238\u7238\u7684\u8F66\u53BB\u5546\u5E97\u3002", "w\u01D2 zu\xF2 b\xE0 ba de ch\u0113 q\xF9 sh\u0101ng di\xE0n.", "I ride in Dad's car to the store.", "dad-car-to-grocery-store.webp"]
  ].map(([hanzi, pinyin, english, file]) => ({ id: file, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-transportation/${file}` }));
  var transportSentenceTokens = {
    "walk-to-school.webp": { target: ["\u6211", "\u8D70\u8DEF", "\u53BB", "\u4E0A\u5B66"], distractors: ["\u5750", "\u6821\u8F66", "\u52A8\u7269\u56ED"] },
    "bike-to-school.webp": { target: ["\u6211", "\u9A91\u81EA\u884C\u8F66", "\u53BB", "\u4E0A\u5B66"], distractors: ["\u5750", "\u706B\u8F66", "\u5317\u4EAC"] },
    "school-bus-to-zoo.webp": { target: ["\u6211", "\u5750", "\u6821\u8F66", "\u53BB", "\u52A8\u7269\u56ED"], distractors: ["\u9A91\u81EA\u884C\u8F66", "\u4E0A\u5B66"] },
    "taxi-to-airport.webp": { target: ["\u6211", "\u5750", "\u51FA\u79DF\u8F66", "\u53BB", "\u673A\u573A"], distractors: ["\u6821\u8F66", "\u52A8\u7269\u56ED"] },
    "airplane-to-grandparents.webp": { target: ["\u6211", "\u5750", "\u98DE\u673A", "\u53BB\u770B", "\u7237\u7237\u5976\u5976"], distractors: ["\u706B\u8F66", "\u5317\u4EAC"] },
    "train-to-beijing.webp": { target: ["\u6211", "\u5750", "\u706B\u8F66", "\u53BB", "\u5317\u4EAC"], distractors: ["\u98DE\u673A", "\u673A\u573A"] },
    "mom-car-to-school.webp": { target: ["\u6211", "\u5750", "\u5988\u5988\u7684\u8F66", "\u53BB", "\u4E0A\u5B66"], distractors: ["\u7238\u7238\u7684\u8F66", "\u52A8\u7269\u56ED"] },
    "dad-car-to-grocery-store.webp": { target: ["\u6211", "\u5750", "\u7238\u7238\u7684\u8F66", "\u53BB", "\u5546\u5E97"], distractors: ["\u5988\u5988\u7684\u8F66", "\u4E0A\u5B66"] }
  };

  // src/features/time-daily-life/rooms.js
  var dailyLifeTopic = {
    id: "daily-life",
    title: "My Home",
    summary: "Explore the rooms and familiar things in a home.",
    progressLabel: "4B Lesson 3",
    iconText: "\u6211\u7684\u5BB6",
    iconColor: "#6c8c7f",
    focus: { hanzi: "\u6211\u7684\u5BB6\u91CC\u6709\u5BA2\u5385\u3001\u5367\u5BA4\u548C\u8F66\u5E93\u3002", pinyin: "w\u01D2 de ji\u0101 l\u01D0 y\u01D2u k\xE8 t\u012Bng, w\xF2 sh\xEC h\xE9 ch\u0113 k\xF9.", english: "My home has a living room, bedroom, and garage.", audio: "\u6211\u7684\u5BB6\u91CC\u6709\u5BA2\u5385\u5367\u5BA4\u548C\u8F66\u5E93" },
    interactiveScene: "rooms",
    parentGuide: "This topic becomes much easier when children can point to real places and routines in their own day.",
    cultureGuide: "Daily life topics make the tool feel practical instead of toy-like, which fits your goal well.",
    activities: ["Tap to hear", "Room scenes", "Room words"],
    steps: [{ book: "4B", lesson: 3, title: "My room", note: "Bring language into the home setting." }]
  };
  var roomVisualItems = [
    ["\u5BA2\u5385", "k\xE8 t\u012Bng", "living room", "living-room.webp", "assets/illustrated-rooms"],
    ["\u5367\u5BA4", "w\xF2 sh\xEC", "bedroom", "bedroom.webp", "assets/illustrated-rooms"],
    ["\u8F66\u5E93", "ch\u0113 k\xF9", "garage", "garage.webp", "assets/illustrated-rooms"],
    ["\u5E8A", "chu\xE1ng", "bed", "bed.webp", "assets/illustrated-furniture"],
    ["\u4E66\u684C", "sh\u016B zhu\u014D", "desk", "desk.webp", "assets/illustrated-furniture"],
    ["\u4E66\u67B6", "sh\u016B ji\xE0", "bookshelf", "bookshelf.webp", "assets/illustrated-furniture"],
    ["\u8863\u67DC", "y\u012B gu\xEC", "wardrobe", "wardrobe.webp", "assets/illustrated-furniture"],
    ["\u94A2\u7434", "g\u0101ng q\xEDn", "piano", "piano_anchor.webp", "assets/illustrated-school-anchors"],
    ["\u6C99\u53D1", "sh\u0101 fa", "sofa", "sofa.webp", "assets/illustrated-furniture"],
    ["\u7535\u89C6\u67DC", "di\xE0n sh\xEC gu\xEC", "TV stand", "tv-stand.webp", "assets/illustrated-furniture"],
    ["\u81EA\u884C\u8F66", "z\xEC x\xEDng ch\u0113", "bicycle", "bicycle.png", "assets/illustrated-rooms"]
  ].map(([hanzi, pinyin, english, file, folder]) => ({ id: hanzi, hanzi, pinyin, english, audio: hanzi, imagePath: `${folder}/${file}` }));
  var roomScenes = [
    {
      id: "my-room",
      label: "My room",
      hanzi: "\u6211\u7684\u623F\u95F4\u91CC\u6709\u5E8A\u3001\u4E66\u684C\u548C\u8863\u67DC\u3002",
      pinyin: "w\u01D2 de f\xE1ng ji\u0101n l\u01D0 y\u01D2u chu\xE1ng, sh\u016B zhu\u014D h\xE9 y\u012B gu\xEC.",
      english: "There is a bed, desk, and wardrobe in my room.",
      audio: "\u6211\u7684\u623F\u95F4\u91CC\u6709\u5E8A\u4E66\u684C\u548C\u8863\u67DC",
      imagePath: "assets/illustrated-rooms/bedroom.webp"
    },
    {
      id: "living-room",
      label: "Living room",
      hanzi: "\u5BA2\u5385\u91CC\u6709\u6C99\u53D1\u548C\u7535\u89C6\u3002",
      pinyin: "k\xE8 t\u012Bng l\u01D0 y\u01D2u sh\u0101 fa h\xE9 di\xE0n sh\xEC.",
      english: "There is a sofa and TV in the living room.",
      audio: "\u5BA2\u5385\u91CC\u6709\u6C99\u53D1\u548C\u7535\u89C6",
      imagePath: "assets/illustrated-rooms/living-room.webp"
    },
    {
      id: "garage",
      label: "Garage",
      hanzi: "\u8F66\u5E93\u91CC\u6709\u81EA\u884C\u8F66\u3002",
      pinyin: "ch\u0113 k\xF9 l\u01D0 y\u01D2u z\xEC x\xEDng ch\u0113.",
      english: "There is a bicycle in the garage.",
      audio: "\u8F66\u5E93\u91CC\u6709\u81EA\u884C\u8F66",
      imagePath: "assets/illustrated-rooms/garage.webp"
    }
  ];
  var roomSentenceTokens = {
    "my-room": { prefix: ["\u6211\u7684", "\u623F\u95F4", "\u91CC", "\u6709"], target: ["\u6211\u7684", "\u623F\u95F4", "\u91CC", "\u6709", "\u5E8A", "\u4E66\u684C", "\u548C", "\u8863\u67DC"], unorderedObjects: ["\u5E8A", "\u4E66\u684C", "\u8863\u67DC"], distractors: ["\u5BA2\u5385", "\u6C99\u53D1", "\u81EA\u884C\u8F66"] },
    "living-room": { prefix: ["\u5BA2\u5385", "\u91CC", "\u6709"], target: ["\u5BA2\u5385", "\u91CC", "\u6709", "\u6C99\u53D1", "\u548C", "\u7535\u89C6"], unorderedObjects: ["\u6C99\u53D1", "\u7535\u89C6"], distractors: ["\u5E8A", "\u8F66\u5E93", "\u81EA\u884C\u8F66"] },
    garage: { prefix: ["\u8F66\u5E93", "\u91CC", "\u6709"], target: ["\u8F66\u5E93", "\u91CC", "\u6709", "\u81EA\u884C\u8F66"], unorderedObjects: ["\u81EA\u884C\u8F66"], distractors: ["\u4E66\u684C", "\u6C99\u53D1", "\u7535\u89C6"] }
  };

  // src/features/school-life/stationery.js
  var stationeryTopicData = {
    showWords: false,
    sceneGroups: [
      {
        id: "my-things",
        items: [
          {
            id: "my-stationery",
            label: "My stationery",
            compactLines: true,
            lines: [
              { hanzi: "\u8FD9\u662F\u6211\u7684\u94C5\u7B14\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de qi\u0101n b\u01D0.", english: "This is my pencil." },
              { hanzi: "\u8FD9\u662F\u6211\u7684\u526A\u5200\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de ji\u01CEn d\u0101o.", english: "This is my scissors." },
              { hanzi: "\u8FD9\u662F\u6211\u7684\u6A61\u76AE\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de xi\xE0ng p\xED.", english: "This is my eraser." }
            ],
            audio: "\u8FD9\u662F\u6211\u7684\u94C5\u7B14\u8FD9\u662F\u6211\u7684\u526A\u5200\u8FD9\u662F\u6211\u7684\u6A61\u76AE",
            imagePath: "assets/illustrated-possession/i-have-stationery.webp"
          },
          {
            id: "my-classroom-things",
            label: "My classroom things",
            lines: [
              { hanzi: "\u8FD9\u662F\u6211\u7684\u6905\u5B50\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de y\u01D0 zi.", english: "This is my chair." },
              { hanzi: "\u8FD9\u662F\u6211\u7684\u684C\u5B50\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de zhu\u014D zi.", english: "This is my table." }
            ],
            audio: "\u8FD9\u662F\u6211\u7684\u6905\u5B50\u8FD9\u662F\u6211\u7684\u684C\u5B50",
            imagePath: "assets/illustrated-stationery/my-chair-and-table.webp"
          },
          {
            id: "my-book",
            label: "My book",
            lines: [
              { hanzi: "\u8FD9\u662F\u6211\u7684\u4E66\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de sh\u016B.", english: "This is my book." }
            ],
            audio: "\u8FD9\u662F\u6211\u7684\u4E66",
            imagePath: "assets/illustrated-stationery/my-book-tiantian-landscape.webp"
          },
          {
            id: "three-red-pencils",
            label: "Three red pencils",
            lines: [
              { hanzi: "\u5B89\u5B89\u6709\u4E09\u652F\u7EA2\u8272\u7684\u94C5\u7B14\u3002", pinyin: "\u0101n \u0101n y\u01D2u s\u0101n zh\u012B h\xF3ng s\xE8 de qi\u0101n b\u01D0.", english: "Anan has three red pencils." }
            ],
            audio: "\u5B89\u5B89\u6709\u4E09\u652F\u7EA2\u8272\u7684\u94C5\u7B14",
            imagePath: "assets/illustrated-stationery/anan-three-red-pencils.webp"
          }
        ]
      }
    ],
    words: [
      ["pencil", "\u94C5\u7B14", "qi\u0101n b\u01D0", "pencil", "pencil.webp"],
      ["ruler", "\u5C3A\u5B50", "ch\u01D0 zi", "ruler", "ruler.webp"],
      ["eraser", "\u6A61\u76AE", "xi\xE0ng p\xED", "eraser", "eraser.webp"],
      ["colored-pencils", "\u5F69\u8272\u94C5\u7B14", "c\u01CEi s\xE8 qi\u0101n b\u01D0", "colored pencils", "colored-pencils.webp"],
      ["scissors", "\u526A\u5200", "ji\u01CEn d\u0101o", "scissors", "scissors.webp"],
      ["glue", "\u80F6\u6C34", "ji\u0101o shu\u01D0", "glue", "glue-stick.webp"],
      ["textbook", "\u8BFE\u672C", "k\xE8 b\u011Bn", "textbook", "textbook.webp"],
      ["workbook", "\u7EC3\u4E60\u672C", "li\xE0n x\xED b\u011Bn", "workbook", "workbook.webp"],
      ["chair", "\u6905\u5B50", "y\u01D0 zi", "chair", "chair.webp"],
      ["table", "\u684C\u5B50", "zhu\u014D zi", "table", "table.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-stationery/${file}` })),
    review: [
      { pattern: "\u8FD9\u662F\u6211\u7684\u2026\u2026", pinyin: "zh\xE8 sh\xEC w\u01D2 de...", english: "This is my ...", example: "\u8FD9\u662F\u6211\u7684\u94C5\u7B14\u3002", examplePinyin: "zh\xE8 sh\xEC w\u01D2 de qi\u0101n b\u01D0.", exampleEnglish: "This is my pencil." },
      { pattern: "\u6709 + \u6570\u91CF + \u989C\u8272 + \u6587\u5177", pinyin: "y\u01D2u + sh\xF9 li\xE0ng + y\xE1n s\xE8 + w\xE9n j\xF9", english: "has + number + color + school thing", example: "\u5B89\u5B89\u6709\u4E09\u652F\u7EA2\u8272\u7684\u94C5\u7B14\u3002", examplePinyin: "\u0101n \u0101n y\u01D2u s\u0101n zh\u012B h\xF3ng s\xE8 de qi\u0101n b\u01D0.", exampleEnglish: "Anan has three red pencils." },
      { pattern: "\u4E00\u652F / \u4E00\u628A / \u4E00\u5757", pinyin: "y\xEC zh\u012B / y\xEC b\u01CE / y\xED ku\xE0i", english: "measure words for pens, scissors, and erasers", example: "\u4E00\u652F\u94C5\u7B14\u3002\u4E00\u628A\u526A\u5200\u3002\u4E00\u5757\u6A61\u76AE\u3002", examplePinyin: "y\xEC zh\u012B qi\u0101n b\u01D0. y\xEC b\u01CE ji\u01CEn d\u0101o. y\xED ku\xE0i xi\xE0ng p\xED.", exampleEnglish: "one pencil, one pair of scissors, one eraser" }
    ]
  };
  var stationerySentenceBuilds = [
    { id: "my-pencil", imagePath: "assets/illustrated-stationery/pencil.webp", target: ["\u8FD9", "\u662F", "\u6211\u7684", "\u94C5\u7B14"], distractors: ["\u6709", "\u4E66\u5305", "\u91CC"], pinyin: "zh\xE8 sh\xEC w\u01D2 de qi\u0101n b\u01D0.", english: "This is my pencil." },
    { id: "my-chair", imagePath: "assets/illustrated-stationery/chair.webp", target: ["\u8FD9", "\u662F", "\u6211\u7684", "\u6905\u5B50"], distractors: ["\u6709", "\u4E66\u5305", "\u91CC"], pinyin: "zh\xE8 sh\xEC w\u01D2 de y\u01D0 zi.", english: "This is my chair." },
    { id: "my-book", imagePath: "assets/illustrated-stationery/my-book-tiantian-landscape.webp", target: ["\u8FD9", "\u662F", "\u6211\u7684", "\u4E66"], distractors: ["\u6709", "\u4E66\u5305", "\u91CC"], pinyin: "zh\xE8 sh\xEC w\u01D2 de sh\u016B.", english: "This is my book." },
    { id: "anan-scissors", imagePath: "assets/illustrated-possession/this-is-my-scissors.webp", target: ["\u5B89\u5B89", "\u6709", "\u526A\u5200"], distractors: ["\u8FD9\u662F", "\u6211\u7684", "\u4E66\u5305"], pinyin: "\u0101n \u0101n y\u01D2u ji\u01CEn d\u0101o.", english: "Anan has scissors." },
    { id: "red-pencil", imagePath: "assets/illustrated-stationery/anan-three-red-pencils.webp", target: ["\u5B89\u5B89", "\u6709", "\u4E09\u652F", "\u7EA2\u8272\u7684", "\u94C5\u7B14"], distractors: ["\u4E00\u628A", "\u4E66\u5305", "\u91CC"], pinyin: "\u0101n \u0101n y\u01D2u s\u0101n zh\u012B h\xF3ng s\xE8 de qi\u0101n b\u01D0.", english: "Anan has three red pencils." },
    { id: "one-pencil", imagePath: "assets/illustrated-measure-words/one-pencil.webp", target: ["\u6211", "\u6709", "\u4E00\u652F", "\u94C5\u7B14"], distractors: ["\u4E00\u628A", "\u4E66\u5305", "\u91CC"], pinyin: "w\u01D2 y\u01D2u y\xEC zh\u012B qi\u0101n b\u01D0.", english: "I have one pencil." },
    { id: "one-scissors", imagePath: "assets/illustrated-measure-words/one-scissors.webp", target: ["\u6211", "\u6709", "\u4E00\u628A", "\u526A\u5200"], distractors: ["\u4E00\u652F", "\u4E66\u5305", "\u91CC"], pinyin: "w\u01D2 y\u01D2u y\xEC b\u01CE ji\u01CEn d\u0101o.", english: "I have one pair of scissors." },
    { id: "one-eraser", imagePath: "assets/illustrated-measure-words/one-eraser.webp", target: ["\u6211", "\u6709", "\u4E00\u5757", "\u6A61\u76AE"], distractors: ["\u4E00\u652F", "\u4E66\u5305", "\u91CC"], pinyin: "w\u01D2 y\u01D2u y\xED ku\xE0i xi\xE0ng p\xED.", english: "I have one eraser." }
  ];
  var stationeryPictureMatchRounds = [
    {
      id: "three-red-pencils",
      imagePath: "assets/illustrated-stationery/three-red-pencils.webp",
      alt: "three red pencils",
      target: { measure: "\u4E09\u652F", color: "\u7EA2\u8272\u7684", item: "\u94C5\u7B14" },
      pinyin: "s\u0101n zh\u012B h\xF3ng s\xE8 de qi\u0101n b\u01D0.",
      english: "three red pencils"
    },
    {
      id: "orange-scissors",
      imagePath: "assets/illustrated-stationery/scissors.webp",
      alt: "orange scissors",
      target: { measure: "\u4E00\u628A", color: "\u6A59\u8272\u7684", item: "\u526A\u5200" },
      pinyin: "y\xEC b\u01CE ch\xE9ng s\xE8 de ji\u01CEn d\u0101o.",
      english: "one pair of orange scissors"
    },
    {
      id: "blue-eraser",
      imagePath: "assets/illustrated-stationery/blue-eraser.webp",
      alt: "blue eraser",
      target: { measure: "\u4E00\u5757", color: "\u84DD\u8272\u7684", item: "\u6A61\u76AE" },
      pinyin: "y\xED ku\xE0i l\xE1n s\xE8 de xi\xE0ng p\xED.",
      english: "one blue eraser"
    }
  ];
  var stationeryPictureMatchChoices = {
    measure: ["\u4E09\u652F", "\u4E00\u628A", "\u4E00\u5757"],
    color: ["\u7EA2\u8272\u7684", "\u6A59\u8272\u7684", "\u84DD\u8272\u7684"],
    item: ["\u94C5\u7B14", "\u526A\u5200", "\u6A61\u76AE"]
  };
  var stationeryPictureMatchEnglish = {
    "\u4E09\u652F": "three",
    "\u4E00\u628A": "one pair",
    "\u4E00\u5757": "one",
    "\u7EA2\u8272\u7684": "red",
    "\u6A59\u8272\u7684": "orange",
    "\u84DD\u8272\u7684": "blue",
    "\u94C5\u7B14": "pencil",
    "\u526A\u5200": "scissors",
    "\u6A61\u76AE": "eraser"
  };

  // src/features/school-life/school-supplies.js
  var schoolSuppliesTopicData = {
    scenes: [
      {
        id: "stationery",
        label: "In the pencil case",
        lines: [
          { hanzi: "\u6587\u5177\u76D2\u91CC\u6709\u94C5\u7B14\u3002", pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u qi\u0101n b\u01D0.", english: "There is a pencil in the pencil case." },
          { hanzi: "\u6587\u5177\u76D2\u91CC\u6709\u6A61\u76AE\u3002", pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u xi\xE0ng p\xED.", english: "There is an eraser in the pencil case." },
          { hanzi: "\u6587\u5177\u76D2\u91CC\u6709\u5F69\u8272\u94C5\u7B14\u3002", pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u c\u01CEi s\xE8 qi\u0101n b\u01D0.", english: "There are colored pencils in the pencil case." }
        ],
        audio: "\u6587\u5177\u76D2\u91CC\u6709\u94C5\u7B14\u6587\u5177\u76D2\u91CC\u6709\u6A61\u76AE\u6587\u5177\u76D2\u91CC\u6709\u5F69\u8272\u94C5\u7B14",
        imagePath: "assets/illustrated-stationery/pencil-box.webp"
      },
      {
        id: "schoolbag",
        label: "In the backpack",
        lines: [
          { hanzi: "\u4E66\u5728\u4E66\u5305\u91CC\u3002", pinyin: "sh\u016B z\xE0i sh\u016B b\u0101o l\u01D0.", english: "The book is in the backpack." },
          { hanzi: "\u4E66\u5305\u91CC\u6709\u4E66\u3002", pinyin: "sh\u016B b\u0101o l\u01D0 y\u01D2u sh\u016B.", english: "There is a book in the backpack." },
          { hanzi: "\u6587\u5177\u76D2\u5728\u4E66\u5305\u5916\u9762\u3002", pinyin: "w\xE9n j\xF9 h\xE9 z\xE0i sh\u016B b\u0101o w\xE0i mi\xE0n.", english: "The pencil case is outside the backpack." }
        ],
        audio: "\u4E66\u5728\u4E66\u5305\u91CC\u4E66\u5305\u91CC\u6709\u4E66\u6587\u5177\u76D2\u5728\u4E66\u5305\u5916\u9762",
        imagePath: "assets/illustrated-rooms/positions-inside-outside.webp"
      }
    ],
    words: [
      ["pencil", "\u94C5\u7B14", "qi\u0101n b\u01D0", "pencil", "pencil.webp"],
      ["ruler", "\u5C3A\u5B50", "ch\u01D0 zi", "ruler", "ruler.webp"],
      ["eraser", "\u6A61\u76AE", "xi\xE0ng p\xED", "eraser", "eraser.webp"],
      ["colored-pencils", "\u5F69\u8272\u94C5\u7B14", "c\u01CEi s\xE8 qi\u0101n b\u01D0", "colored pencils", "colored-pencils.webp"],
      ["scissors", "\u526A\u5200", "ji\u01CEn d\u0101o", "scissors", "scissors.webp"],
      ["glue", "\u80F6\u6C34", "ji\u0101o shu\u01D0", "glue", "glue-stick.webp"],
      ["pencil-box", "\u6587\u5177\u76D2", "w\xE9n j\xF9 h\xE9", "pencil case", "pencil-box.webp"],
      ["textbook", "\u8BFE\u672C", "k\xE8 b\u011Bn", "textbook", "textbook.webp"],
      ["workbook", "\u7EC3\u4E60\u672C", "li\xE0n x\xED b\u011Bn", "workbook", "workbook.webp"],
      ["schoolbag", "\u4E66\u5305", "sh\u016B b\u0101o", "backpack", "backpack.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-stationery/${file}` })),
    review: [
      { pattern: "\u2026\u2026\u91CC\u6709\u2026\u2026", pinyin: "... l\u01D0 y\u01D2u...", english: "There is / are ... in ...", example: "\u6587\u5177\u76D2\u91CC\u6709\u94C5\u7B14\u3002\u4E66\u5305\u91CC\u6709\u4E66\u3002" },
      { pattern: "\u91CC / \u5916\u9762", pinyin: "l\u01D0 / w\xE0i mi\xE0n", english: "inside / outside", example: "\u4E66\u5728\u4E66\u5305\u91CC\u3002\u6587\u5177\u76D2\u5728\u4E66\u5305\u5916\u9762\u3002" }
    ]
  };
  var schoolSuppliesSentenceBuilds = [
    { id: "stationery", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["\u6587\u5177\u76D2", "\u91CC", "\u6709", "\u94C5\u7B14"], distractors: ["\u5B66\u6821", "\u559C\u6B22", "\u56FE\u4E66\u9986"], pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u qi\u0101n b\u01D0.", english: "There is a pencil in the pencil case." },
    { id: "eraser", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["\u6587\u5177\u76D2", "\u91CC", "\u6709", "\u6A61\u76AE"], distractors: ["\u5B66\u6821", "\u559C\u6B22", "\u56FE\u4E66\u9986"], pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u xi\xE0ng p\xED.", english: "There is an eraser in the pencil case." },
    { id: "colored-pencils", imagePath: "assets/illustrated-stationery/pencil-box.webp", target: ["\u6587\u5177\u76D2", "\u91CC", "\u6709", "\u5F69\u8272\u94C5\u7B14"], distractors: ["\u5B66\u6821", "\u559C\u6B22", "\u56FE\u4E66\u9986"], pinyin: "w\xE9n j\xF9 h\xE9 l\u01D0 y\u01D2u c\u01CEi s\xE8 qi\u0101n b\u01D0.", english: "There are colored pencils in the pencil case." },
    { id: "book-in-backpack", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["\u4E66", "\u5728", "\u4E66\u5305", "\u91CC"], distractors: ["\u6559\u5BA4", "\u559C\u6B22", "\u6905\u5B50"], pinyin: "sh\u016B z\xE0i sh\u016B b\u0101o l\u01D0.", english: "The book is in the backpack." },
    { id: "backpack-has-book", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["\u4E66\u5305", "\u91CC", "\u6709", "\u4E66"], distractors: ["\u6559\u5BA4", "\u559C\u6B22", "\u6905\u5B50"], pinyin: "sh\u016B b\u0101o l\u01D0 y\u01D2u sh\u016B.", english: "There is a book in the backpack." },
    { id: "pencil-case-outside", imagePath: "assets/illustrated-rooms/positions-inside-outside.webp", target: ["\u6587\u5177\u76D2", "\u5728", "\u4E66\u5305", "\u5916\u9762"], distractors: ["\u6559\u5BA4", "\u559C\u6B22", "\u6905\u5B50"], pinyin: "w\xE9n j\xF9 h\xE9 z\xE0i sh\u016B b\u0101o w\xE0i mi\xE0n.", english: "The pencil case is outside the backpack." }
  ];

  // src/features/school-life/classroom.js
  var classroomTopicData = {
    practiceSummary: "Choose a classroom sentence start and an object to make your own sentence.",
    scenes: [
      {
        id: "classroom",
        label: "Our classroom",
        hanzi: "\u8FD9\u662F\u6211\u4EEC\u7684\u6559\u5BA4\u3002\u6559\u5BA4\u91CC\u6709\u5F88\u591A\u684C\u5B50\u548C\u6905\u5B50\u3002",
        pinyin: "zh\xE8 sh\xEC w\u01D2 men de ji\xE0o sh\xEC. ji\xE0o sh\xEC l\u01D0 y\u01D2u h\u011Bn du\u014D zhu\u014D zi h\xE9 y\u01D0 zi.",
        english: "This is our classroom. There are many tables and chairs in the classroom.",
        audio: "\u8FD9\u662F\u6211\u4EEC\u7684\u6559\u5BA4\u6559\u5BA4\u91CC\u6709\u5F88\u591A\u684C\u5B50\u548C\u6905\u5B50",
        imagePath: "assets/illustrated-school-anchors/classroom_anchor.webp"
      },
      {
        id: "classroom-things",
        label: "On the table",
        hanzi: "\u684C\u5B50\u4E0A\u6709\u94C5\u7B14\u548C\u7B14\u8BB0\u672C\u3002",
        pinyin: "zhu\u014D zi sh\xE0ng y\u01D2u qi\u0101n b\u01D0 h\xE9 b\u01D0 j\xEC b\u011Bn.",
        english: "There are pencils and notebooks on the table.",
        audio: "\u684C\u5B50\u4E0A\u6709\u94C5\u7B14\u548C\u7B14\u8BB0\u672C",
        imagePath: "assets/illustrated-classrooms/us-classroom-clusters.webp"
      },
      {
        id: "classroom-computer-tv-bookshelf",
        label: "More classroom things",
        hanzi: "\u6559\u5BA4\u91CC\u6709\u767D\u677F\u3001\u7535\u89C6\u3001\u7535\u8111\u548C\u4E66\u67B6\u3002",
        pinyin: "ji\xE0o sh\xEC l\u01D0 y\u01D2u b\xE1i b\u01CEn, di\xE0n sh\xEC, di\xE0n n\u01CEo h\xE9 sh\u016B ji\xE0.",
        english: "There is a whiteboard, a television, a computer, and a bookshelf in the classroom.",
        audio: "\u6559\u5BA4\u91CC\u6709\u767D\u677F\u7535\u89C6\u7535\u8111\u548C\u4E66\u67B6",
        imagePath: "assets/illustrated-classrooms/classroom-computer-tv-bookshelf.webp"
      }
    ],
    words: [
      ["classroom", "\u6559\u5BA4", "ji\xE0o sh\xEC", "classroom", "assets/illustrated-school-anchors/classroom_anchor.webp"],
      ["table", "\u684C\u5B50", "zhu\u014D zi", "table", "assets/illustrated-stationery/table.webp"],
      ["chair", "\u6905\u5B50", "y\u01D0 zi", "chair", "assets/illustrated-stationery/chair.webp"],
      ["whiteboard", "\u767D\u677F", "b\xE1i b\u01CEn", "whiteboard", "assets/illustrated-classrooms/whiteboard.webp"],
      ["blackboard", "\u9ED1\u677F", "h\u0113i b\u01CEn", "blackboard", "assets/illustrated-classrooms/blackboard.png"],
      ["computer", "\u7535\u8111", "di\xE0n n\u01CEo", "computer (laptop)", "assets/illustrated-classrooms/computer.webp"],
      ["television", "\u7535\u89C6", "di\xE0n sh\xEC", "television", "assets/illustrated-classrooms/television.webp"],
      ["bookshelf", "\u4E66\u67B6", "sh\u016B ji\xE0", "bookshelf", "assets/illustrated-classrooms/bookshelf.webp"]
    ].map(([id, hanzi, pinyin, english, imagePath]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath })),
    sentenceFrames: [
      { id: "in-classroom", hanzi: "\u6559\u5BA4\u91CC\u6709", pinyin: "ji\xE0o sh\xEC l\u01D0 y\u01D2u", english: "There is / are ... in the classroom", wordIds: ["table", "chair", "whiteboard", "blackboard", "computer", "television", "bookshelf"] },
      { id: "many-in-classroom", hanzi: "\u6559\u5BA4\u91CC\u6709\u5F88\u591A", pinyin: "ji\xE0o sh\xEC l\u01D0 y\u01D2u h\u011Bn du\u014D", english: "There are many ... in the classroom", wordIds: ["table", "chair", "textbook"] },
      { id: "on-table", hanzi: "\u684C\u5B50\u4E0A\u6709", pinyin: "zhu\u014D zi sh\xE0ng y\u01D2u", english: "There is / are ... on the table", wordIds: ["computer", "textbook", "workbook", "pencil", "ruler", "eraser", "colored-pencils"] }
    ],
    review: [
      { pattern: "\u6559\u5BA4\u91CC\u6709\u2026\u2026", pinyin: "ji\xE0o sh\xEC l\u01D0 y\u01D2u...", english: "There is / are ... in the classroom.", example: "\u6559\u5BA4\u91CC\u6709\u684C\u5B50\u548C\u6905\u5B50\u3002" },
      { pattern: "\u684C\u5B50\u4E0A\u6709\u2026\u2026", pinyin: "zhu\u014D zi sh\xE0ng y\u01D2u...", english: "There is / are ... on the table.", example: "\u684C\u5B50\u4E0A\u6709\u7535\u8111\u3002" },
      { pattern: "\u5F88\u591A", pinyin: "h\u011Bn du\u014D", english: "many; much", example: "\u6559\u5BA4\u91CC\u6709\u5F88\u591A\u684C\u5B50\u548C\u6905\u5B50\u3002" }
    ]
  };

  // src/features/school-life/school.js
  var schoolTopicData = {
    scenes: [
      ["school", "School", "\u8FD9\u662F\u5B66\u6821\u3002", "zh\xE8 sh\xEC xu\xE9 xi\xE0o.", "This is a school.", "school_exterior_anchor.webp"],
      ["classroom", "Classroom", "\u5B66\u6821\u6709\u6559\u5BA4\u3002", "xu\xE9 xi\xE0o y\u01D2u ji\xE0o sh\xEC.", "The school has classrooms.", "classroom_anchor.webp"],
      ["library", "Library", "\u5B66\u6821\u6709\u56FE\u4E66\u9986\u3002", "xu\xE9 xi\xE0o y\u01D2u t\xFA sh\u016B gu\u01CEn.", "The school has a library.", "library_anchor.webp"],
      ["playground", "Playground", "\u5B66\u6821\u6709\u64CD\u573A\u3002", "xu\xE9 xi\xE0o y\u01D2u c\u0101o ch\u01CEng.", "The school has a playground.", "playground_anchor.webp"],
      ["cafeteria", "Cafeteria", "\u5B66\u6821\u6709\u98DF\u5802\u3002", "xu\xE9 xi\xE0o y\u01D2u sh\xED t\xE1ng.", "The school has a cafeteria.", "cafeteria_anchor.webp"],
      ["auditorium", "Auditorium", "\u5B66\u6821\u6709\u793C\u5802\u3002", "xu\xE9 xi\xE0o y\u01D2u l\u01D0 t\xE1ng.", "The school has an auditorium.", "auditorium_anchor.webp"],
      ["music-room", "Music room", "\u5B66\u6821\u6709\u97F3\u4E50\u6559\u5BA4\u3002\u97F3\u4E50\u6559\u5BA4\u6709\u94A2\u7434\u3002", "xu\xE9 xi\xE0o y\u01D2u y\u012Bn yu\xE8 ji\xE0o sh\xEC. y\u012Bn yu\xE8 ji\xE0o sh\xEC y\u01D2u g\u0101ng q\xEDn.", "The school has a music room. The music room has a piano.", "music_classroom_anchor.webp"]
    ].map(([id, label, hanzi, pinyin, english, file, folder = "assets/illustrated-school-anchors"]) => ({ id, label, hanzi, pinyin, english, audio: id === "music-room" ? "\u5B66\u6821\u6709\u97F3\u4E50\u6559\u5BA4\u97F3\u4E50\u6559\u5BA4\u6709\u94A2\u7434" : hanzi, imagePath: `${folder}/${file}` })),
    words: [
      ["classroom", "\u6559\u5BA4", "ji\xE0o sh\xEC", "classroom", "classroom_anchor.webp"],
      ["library", "\u56FE\u4E66\u9986", "t\xFA sh\u016B gu\u01CEn", "library", "library_anchor.webp"],
      ["playground", "\u64CD\u573A", "c\u0101o ch\u01CEng", "playground", "playground_anchor.webp"],
      ["cafeteria", "\u98DF\u5802", "sh\xED t\xE1ng", "cafeteria", "cafeteria_anchor.webp"],
      ["auditorium", "\u793C\u5802", "l\u01D0 t\xE1ng", "auditorium", "auditorium_anchor.webp"],
      ["music-room", "\u97F3\u4E50\u6559\u5BA4", "y\u012Bn yu\xE8 ji\xE0o sh\xEC", "music room", "music_classroom_anchor.webp"],
      ["piano", "\u94A2\u7434", "g\u0101ng q\xEDn", "piano", "piano_anchor.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: id === "music-room" ? "\u97F3\u6708\u6559\u5BA4" : hanzi, imagePath: `assets/illustrated-school-anchors/${file}` }))
  };
  var schoolSentenceBuilds = [
    { id: "classroom", imagePath: "assets/illustrated-school-anchors/classroom_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u6559\u5BA4"], distractors: ["\u4E66\u5305", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u ji\xE0o sh\xEC.", english: "The school has classrooms." },
    { id: "library", imagePath: "assets/illustrated-school-anchors/library_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u56FE\u4E66\u9986"], distractors: ["\u4E66\u5305", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u t\xFA sh\u016B gu\u01CEn.", english: "The school has a library." },
    { id: "playground", imagePath: "assets/illustrated-school-anchors/playground_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u64CD\u573A"], distractors: ["\u6587\u5177\u76D2", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u c\u0101o ch\u01CEng.", english: "The school has a playground." },
    { id: "cafeteria", imagePath: "assets/illustrated-school-anchors/cafeteria_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u98DF\u5802"], distractors: ["\u6559\u5BA4", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u sh\xED t\xE1ng.", english: "The school has a cafeteria." },
    { id: "auditorium", imagePath: "assets/illustrated-school-anchors/auditorium_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u793C\u5802"], distractors: ["\u4E66\u5305", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u l\u01D0 t\xE1ng.", english: "The school has an auditorium." },
    { id: "music-room", imagePath: "assets/illustrated-school-anchors/music_classroom_anchor.webp", target: ["\u5B66\u6821", "\u6709", "\u97F3\u4E50\u6559\u5BA4"], distractors: ["\u6587\u5177\u76D2", "\u91CC", "\u559C\u6B22"], pinyin: "xu\xE9 xi\xE0o y\u01D2u y\u012Bn yu\xE8 ji\xE0o sh\xEC.", english: "The school has a music room.", audio: "\u5B66\u6821\u6709\u97F3\u4E50\u6559\u5BA4" },
    { id: "music-room-piano", imagePath: "assets/illustrated-school-anchors/piano_anchor.webp", target: ["\u97F3\u4E50\u6559\u5BA4", "\u6709", "\u94A2\u7434"], distractors: ["\u6587\u5177\u76D2", "\u91CC", "\u559C\u6B22"], pinyin: "y\u012Bn yu\xE8 ji\xE0o sh\xEC y\u01D2u g\u0101ng q\xEDn.", english: "The music room has a piano.", audio: "\u97F3\u4E50\u6559\u5BA4\u6709\u94A2\u7434" }
  ];

  // src/features/school-life/school-subjects.js
  var schoolSubjectsTopicData = {
    scenes: [
      {
        id: "subjects",
        label: "School subjects",
        hanzi: "\u6211\u559C\u6B22\u97F3\u4E50\u8BFE\u3002\u4F60\u559C\u6B22\u4EC0\u4E48\u8BFE\uFF1F",
        pinyin: "w\u01D2 x\u01D0 huan y\u012Bn yu\xE8 k\xE8. n\u01D0 x\u01D0 huan sh\xE9n me k\xE8?",
        english: "I like music class. What class do you like?",
        audio: "\u6211\u559C\u6B22\u97F3\u6708\u8BFE\u4F60\u559C\u6B22\u4EC0\u4E48\u8BFE",
        imagePath: "assets/illustrated-school-subjects/subjects-dialogue.webp"
      },
      {
        id: "go-to-music",
        label: "Music class",
        hanzi: "\u6211\u53BB\u4E0A\u97F3\u4E50\u8BFE\u3002",
        pinyin: "w\u01D2 q\xF9 sh\xE0ng y\u012Bn yu\xE8 k\xE8.",
        english: "I am going to music class.",
        audio: "\u6211\u53BB\u4E0A\u97F3\u6708\u8BFE",
        imagePath: "assets/illustrated-activities/anan_go_to_music_class.webp"
      },
      {
        id: "in-music",
        label: "Music class",
        hanzi: "\u6211\u5728\u4E0A\u97F3\u4E50\u8BFE\u3002",
        pinyin: "w\u01D2 z\xE0i sh\xE0ng y\u012Bn yu\xE8 k\xE8.",
        english: "I am in music class.",
        audio: "\u6211\u5728\u4E0A\u97F3\u6708\u8BFE",
        imagePath: "assets/illustrated-activities/anan_in_music_class.webp"
      },
      {
        id: "likes-music",
        label: "Music class",
        hanzi: "\u6211\u559C\u6B22\u97F3\u4E50\u8BFE\u3002",
        pinyin: "w\u01D2 x\u01D0 huan y\u012Bn yu\xE8 k\xE8.",
        english: "I like music class.",
        audio: "\u6211\u559C\u6B22\u97F3\u6708\u8BFE",
        imagePath: "assets/illustrated-activities/anan_likes_music_class.webp"
      },
      {
        id: "likes-pe",
        label: "PE class",
        hanzi: "\u6211\u559C\u6B22\u4F53\u80B2\u8BFE\u3002",
        pinyin: "w\u01D2 x\u01D0 huan t\u01D0 y\xF9 k\xE8.",
        english: "I like PE class.",
        audio: "\u6211\u559C\u6B22\u4F53\u80B2\u8BFE",
        imagePath: "assets/illustrated-activities/yangyang_likes_pe_class.webp"
      },
      {
        id: "dislikes-math",
        label: "Math class",
        hanzi: "\u6211\u4E0D\u559C\u6B22\u6570\u5B66\u8BFE\u3002",
        pinyin: "w\u01D2 b\xF9 x\u01D0 huan sh\xF9 xu\xE9 k\xE8.",
        english: "I do not like math class.",
        audio: "\u6211\u4E0D\u559C\u6B22\u6570\u5B66\u8BFE",
        imagePath: "assets/illustrated-activities/lele_dislikes_math_class.webp"
      }
    ],
    words: [
      ["chinese", "\u8BED\u6587\u8BFE", "y\u01D4 w\xE9n k\xE8", "Chinese class"],
      ["english", "\u82F1\u8BED\u8BFE", "y\u012Bng y\u01D4 k\xE8", "English class"],
      ["math", "\u6570\u5B66\u8BFE", "sh\xF9 xu\xE9 k\xE8", "math class"],
      ["music", "\u97F3\u4E50\u8BFE", "y\u012Bn yu\xE8 k\xE8", "music class"],
      ["art", "\u7F8E\u672F\u8BFE", "m\u011Bi sh\xF9 k\xE8", "art class"],
      ["pe", "\u4F53\u80B2\u8BFE", "t\u01D0 y\xF9 k\xE8", "PE class"]
    ].map(([id, hanzi, pinyin, english]) => ({ id, hanzi, pinyin, english, audio: id === "music" ? "\u97F3\u6708\u8BFE" : hanzi }))
  };
  var schoolSubjectsSentenceBuilds = [
    { id: "ask-favorite", imagePath: "assets/illustrated-school-subjects/subjects-dialogue.webp", target: ["\u4F60", "\u559C\u6B22", "\u4EC0\u4E48", "\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u56FE\u4E66\u9986"], pinyin: "n\u01D0 x\u01D0 huan sh\xE9n me k\xE8?", english: "What class do you like?" },
    { id: "go-music", imagePath: "assets/illustrated-activities/anan_go_to_music_class.webp", target: ["\u6211", "\u53BB", "\u4E0A", "\u97F3\u4E50\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u56FE\u4E66\u9986"], pinyin: "w\u01D2 q\xF9 sh\xE0ng y\u012Bn yu\xE8 k\xE8.", english: "I go to music class.", audio: "\u6211\u53BB\u4E0A\u97F3\u6708\u8BFE" },
    { id: "in-music", imagePath: "assets/illustrated-activities/anan_in_music_class.webp", target: ["\u6211", "\u5728", "\u4E0A", "\u97F3\u4E50\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u56FE\u4E66\u9986"], pinyin: "w\u01D2 z\xE0i sh\xE0ng y\u012Bn yu\xE8 k\xE8.", english: "I am in music class.", audio: "\u6211\u5728\u4E0A\u97F3\u6708\u8BFE" },
    { id: "music", imagePath: "assets/illustrated-activities/anan_likes_music_class.webp", target: ["\u6211", "\u559C\u6B22", "\u97F3\u4E50\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u56FE\u4E66\u9986"], pinyin: "w\u01D2 x\u01D0 huan y\u012Bn yu\xE8 k\xE8.", english: "I like music class.", audio: "\u6211\u559C\u6B22\u97F3\u6708\u8BFE" },
    { id: "pe", imagePath: "assets/illustrated-activities/yangyang_likes_pe_class.webp", target: ["\u6211", "\u559C\u6B22", "\u4F53\u80B2\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u6587\u5177\u76D2"], pinyin: "w\u01D2 x\u01D0 huan t\u01D0 y\xF9 k\xE8.", english: "I like PE class." },
    { id: "dislikes-math", imagePath: "assets/illustrated-activities/lele_dislikes_math_class.webp", target: ["\u6211", "\u4E0D\u559C\u6B22", "\u6570\u5B66\u8BFE"], distractors: ["\u5B66\u6821", "\u6709", "\u6587\u5177\u76D2"], pinyin: "w\u01D2 b\xF9 x\u01D0 huan sh\xF9 xu\xE9 k\xE8.", english: "I do not like math class." }
  ];

  // src/features/school-life/school-food-runtime.js
  function createSchoolFoodRuntime(context) {
    const { state: state2, schoolTopicData: schoolTopicData3, schoolSentenceBuilds: schoolSentenceBuilds3, stationeryPictureMatchRounds: stationeryPictureMatchRounds2, stationeryPictureMatchChoices: stationeryPictureMatchChoices2, stationeryPictureMatchEnglish: stationeryPictureMatchEnglish2, currentTopic: currentTopic2, currentBook: currentBook2, currentLesson: currentLesson2, shuffleArray: shuffleArray2, speak: speak2, speakSceneLines: speakSceneLines2, renderActivityPanel: renderActivityPanel2, focusItemsForTopic: focusItemsForTopic2, activityPanelTitle: activityPanelTitle2, activityPanelSummary: activityPanelSummary2, activityList: activityList2, focusExplorer: focusExplorer2, renderDefaultExplorer: renderDefaultExplorer2, renderListenPractice: renderListenPractice2, renderMatchPractice: renderMatchPractice2 } = context;
    function schoolPracticeItems2(topicId = currentTopic2().id) {
      const data = schoolTopicData3[topicId];
      return data?.practiceItems ?? data?.words ?? schoolWordGroups(topicId).flatMap((group) => group.items);
    }
    function backpackGameItems() {
      const portableItemIds = /* @__PURE__ */ new Set(["pencil", "ruler", "eraser", "colored-pencils", "scissors", "glue", "pencil-box", "textbook", "workbook"]);
      return schoolPracticeItems2("school-supplies").filter((item) => portableItemIds.has(item.id));
    }
    function currentStationeryPictureMatchRound() {
      return stationeryPictureMatchRounds2[state2.stationeryPictureMatchIndex] ?? stationeryPictureMatchRounds2[0];
    }
    function resetStationeryPictureMatch(index = state2.stationeryPictureMatchIndex) {
      state2.stationeryPictureMatchIndex = index % stationeryPictureMatchRounds2.length;
      state2.stationeryPictureMatchSelections = { measure: "", color: "", item: "" };
      state2.stationeryPictureMatchWrong = { measure: /* @__PURE__ */ new Set(), color: /* @__PURE__ */ new Set(), item: /* @__PURE__ */ new Set() };
      state2.stationeryPictureMatchChoiceOrders = Object.fromEntries(Object.entries(stationeryPictureMatchChoices2).map(([column, choices]) => [column, shuffleArray2([...choices])]));
      state2.stationeryPictureMatchComplete = false;
    }
    function ensureStationeryPictureMatch() {
      const hasValidOrders = Object.entries(stationeryPictureMatchChoices2).every(([column, choices]) => {
        const order = state2.stationeryPictureMatchChoiceOrders[column];
        return order?.length === choices.length && choices.every((choice) => order.includes(choice));
      });
      if (!hasValidOrders) resetStationeryPictureMatch();
    }
    function handleStationeryPictureMatchPick(column, value) {
      if (state2.stationeryPictureMatchComplete) return;
      const round = currentStationeryPictureMatchRound();
      if (!round || !stationeryPictureMatchChoices2[column]) return;
      if (value !== round.target[column]) {
        state2.stationeryPictureMatchWrong = {
          ...state2.stationeryPictureMatchWrong,
          [column]: /* @__PURE__ */ new Set([...state2.stationeryPictureMatchWrong[column], value])
        };
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.stationeryPictureMatchSelections = { ...state2.stationeryPictureMatchSelections, [column]: value };
      state2.stationeryPictureMatchWrong = {
        ...state2.stationeryPictureMatchWrong,
        [column]: /* @__PURE__ */ new Set()
      };
      state2.stationeryPictureMatchComplete = Object.entries(round.target).every(([key, target]) => state2.stationeryPictureMatchSelections[key] === target);
      if (state2.stationeryPictureMatchComplete && state2.tapAudioEnabled) speak2(Object.values(round.target).join(""), 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function nextStationeryPictureMatch() {
      resetStationeryPictureMatch((state2.stationeryPictureMatchIndex + 1) % stationeryPictureMatchRounds2.length);
      renderActivityPanel2(currentTopic2());
    }
    function prepareBackpackGameOptions() {
      const targetId = state2.backpackGameRoundIds[state2.backpackGameTargetIndex];
      const items = backpackGameItems();
      state2.backpackGameOptionIds = shuffleArray2([
        targetId,
        ...shuffleArray2(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
      ]);
      state2.backpackGameWrongIds = /* @__PURE__ */ new Set();
    }
    function resetBackpackGame() {
      state2.backpackGameRoundIds = shuffleArray2(backpackGameItems().map((item) => item.id)).slice(0, 3);
      state2.backpackGameTargetIndex = 0;
      state2.backpackGamePlacedIds = [];
      state2.backpackGameComplete = false;
      prepareBackpackGameOptions();
    }
    function ensureBackpackGame() {
      const items = backpackGameItems();
      const isValidRound = state2.backpackGameRoundIds.length === 3 && state2.backpackGameRoundIds.every((id) => items.some((item) => item.id === id));
      if (!isValidRound) resetBackpackGame();
    }
    function currentBackpackGameTarget() {
      return backpackGameItems().find((item) => item.id === state2.backpackGameRoundIds[state2.backpackGameTargetIndex]);
    }
    function handleBackpackGameGuess(itemId) {
      if (state2.backpackGameComplete) return;
      const target = currentBackpackGameTarget();
      if (!target) return;
      if (itemId !== target.id) {
        state2.backpackGameWrongIds = /* @__PURE__ */ new Set([...state2.backpackGameWrongIds, itemId]);
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.backpackGamePlacedIds = [...state2.backpackGamePlacedIds, target.id];
      if (state2.tapAudioEnabled) speak2(target.audio, 0.78);
      state2.backpackGameTargetIndex += 1;
      state2.backpackGameComplete = state2.backpackGameTargetIndex === state2.backpackGameRoundIds.length;
      if (!state2.backpackGameComplete) prepareBackpackGameOptions();
      renderActivityPanel2(currentTopic2());
    }
    function resetSchoolChallenge(options = {}) {
      const items = schoolPracticeItems2();
      const candidates = items.filter((item) => item.id !== options.excludeId);
      const answers = candidates.length ? candidates : items;
      const answer = answers[Math.floor(Math.random() * answers.length)];
      if (!answer) return;
      const optionIds = currentTopic2().id === "school-subjects" ? shuffleArray2(items.map((item) => item.id)) : shuffleArray2([answer.id, ...shuffleArray2(items.filter((item) => item.id !== answer.id)).slice(0, 3).map((item) => item.id)]);
      state2.schoolChallengeAnswerId = answer.id;
      state2.schoolChallengePromptId = answer.id;
      state2.schoolChallengeOptionIds = optionIds;
      state2.schoolChallengePickedId = "";
      state2.schoolChallengeResult = "";
      state2.schoolChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.schoolListenFeedback = "";
    }
    function resetSchoolMatchGame2() {
      const ids = schoolPracticeItems2().slice(0, 6).map((item) => item.id);
      state2.schoolSelectedPhraseId = null;
      state2.schoolMatchedIds = /* @__PURE__ */ new Set();
      state2.schoolPhraseOrder = shuffleArray2(ids);
      state2.schoolMeaningOrder = shuffleArray2(ids);
      state2.schoolMatchFeedback = "";
    }
    function mealsConversationItems() {
      return schoolTopicData3["meals-feelings"]?.conversationPairs ?? [];
    }
    function resetMealsConversationMatch() {
      const ids = mealsConversationItems().map((item) => item.id);
      state2.schoolSelectedPhraseId = null;
      state2.schoolMatchedIds = /* @__PURE__ */ new Set();
      state2.schoolPhraseOrder = shuffleArray2(ids);
      state2.schoolMeaningOrder = shuffleArray2(ids);
      state2.schoolMatchFeedback = "";
      state2.mealsConversationMatchReady = true;
      state2.mealsConversationWrongPhraseIds = /* @__PURE__ */ new Set();
      state2.mealsConversationWrongReplyIds = /* @__PURE__ */ new Set();
    }
    function ensureMealsConversationMatch() {
      const ids = mealsConversationItems().map((item) => item.id);
      const currentIds = [...state2.schoolPhraseOrder].sort();
      if (!state2.mealsConversationMatchReady || currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
        resetMealsConversationMatch();
      }
    }
    function handleMealsConversationPhrase(itemId) {
      if (state2.schoolMatchedIds.has(itemId)) return;
      state2.schoolSelectedPhraseId = itemId;
      state2.mealsConversationWrongPhraseIds = /* @__PURE__ */ new Set();
      state2.mealsConversationWrongReplyIds = /* @__PURE__ */ new Set();
      const item = mealsConversationItems().find((entry) => entry.id === itemId);
      if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleMealsConversationAttempt(itemId) {
      const selectedId = state2.schoolSelectedPhraseId;
      if (!selectedId || state2.schoolMatchedIds.has(itemId)) return;
      if (selectedId === itemId) {
        state2.schoolMatchedIds = /* @__PURE__ */ new Set([...state2.schoolMatchedIds, itemId]);
        state2.schoolMatchFeedback = "Correct!";
        state2.mealsConversationWrongPhraseIds = /* @__PURE__ */ new Set();
        state2.mealsConversationWrongReplyIds = /* @__PURE__ */ new Set();
      } else {
        state2.schoolMatchFeedback = "Try again.";
        state2.mealsConversationWrongPhraseIds = /* @__PURE__ */ new Set([selectedId]);
        state2.mealsConversationWrongReplyIds = /* @__PURE__ */ new Set([itemId]);
      }
      state2.schoolSelectedPhraseId = null;
      renderActivityPanel2(currentTopic2());
    }
    function mealsPictureChoiceItems() {
      return schoolTopicData3["meals-feelings"]?.pictureChoices ?? [];
    }
    function resetMealsPictureQuestion() {
      const prompt = mealsPictureChoiceItems().find((item) => item.id === state2.mealsPictureQuizOrder[state2.mealsPictureQuizIndex]);
      if (!prompt) return;
      state2.mealsPictureQuizOptionIds = shuffleArray2(prompt.options.map((option) => option.id));
      state2.mealsPictureQuizSelectedId = "";
      state2.mealsPictureQuizResult = "";
    }
    function ensureMealsPictureChoice() {
      const ids = mealsPictureChoiceItems().map((item) => item.id);
      const currentIds = [...state2.mealsPictureQuizOrder].sort();
      if (currentIds.length !== ids.length || currentIds.some((id, index) => id !== [...ids].sort()[index])) {
        state2.mealsPictureQuizOrder = shuffleArray2(ids);
        state2.mealsPictureQuizIndex = 0;
        resetMealsPictureQuestion();
      }
    }
    function handleMealsPictureChoice(optionId) {
      const prompt = mealsPictureChoiceItems().find((item) => item.id === state2.mealsPictureQuizOrder[state2.mealsPictureQuizIndex]);
      if (!prompt || state2.mealsPictureQuizResult === "correct") return;
      state2.mealsPictureQuizSelectedId = optionId;
      state2.mealsPictureQuizResult = optionId === prompt.correctId ? "correct" : "wrong";
      renderActivityPanel2(currentTopic2());
    }
    function nextMealsPictureChoice() {
      const items = mealsPictureChoiceItems();
      if (!items.length) return;
      state2.mealsPictureQuizIndex = (state2.mealsPictureQuizIndex + 1) % items.length;
      resetMealsPictureQuestion();
      renderActivityPanel2(currentTopic2());
    }
    function renderMealsPictureChoice() {
      const prompt = mealsPictureChoiceItems().find((item) => item.id === state2.mealsPictureQuizOrder[state2.mealsPictureQuizIndex]);
      if (!prompt) return "";
      return `
    <section class="clothes-quiz-shell meals-picture-choice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Look and Choose</p><p class="numbers-game-note">Look at the picture, then tap the Chinese sentence that matches it.</p></div></div>
      <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" /></figure>
      <div class="clothes-quiz-options sentence-choice-options">
        ${state2.mealsPictureQuizOptionIds.map((optionId) => {
        const option = prompt.options.find((item) => item.id === optionId);
        if (!option) return "";
        const selected = state2.mealsPictureQuizSelectedId === optionId;
        const resultClass = selected ? ` is-${state2.mealsPictureQuizResult}` : "";
        const mark = selected ? `<span class="answer-result-mark" aria-hidden="true">${state2.mealsPictureQuizResult === "correct" ? "\u2713" : "\xD7"}</span>` : "";
        return `<button class="clothes-quiz-option${resultClass}" type="button" data-meals-picture-pick="${option.id}">${mark}<span class="numbers-game-hanzi">${option.hanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`;
      }).join("")}
      </div>
      ${state2.mealsPictureQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-meals-picture-next>Next picture</button></div>' : ""}
    </section>
  `;
    }
    function foodPreferenceFillItems() {
      return [
        { id: "apple", hanzi: "\u82F9\u679C", pinyin: "p\xEDng gu\u01D2", english: "apple" },
        { id: "ice-cream", hanzi: "\u51B0\u6DC7\u6DCB", pinyin: "b\u012Bng q\xED l\xEDn", english: "ice cream" },
        { id: "pizza", hanzi: "\u62AB\u8428", pinyin: "p\u012B s\xE0", english: "pizza" },
        { id: "broccoli", hanzi: "\u897F\u5170\u82B1", pinyin: "x\u012B l\xE1n hu\u0101", english: "broccoli" },
        { id: "dumplings", hanzi: "\u997A\u5B50", pinyin: "ji\u01CEo zi", english: "dumplings" },
        { id: "fried-rice", hanzi: "\u7092\u996D", pinyin: "ch\u01CEo f\xE0n", english: "fried rice" },
        { id: "chow-mein", hanzi: "\u7092\u9762", pinyin: "ch\u01CEo mi\xE0n", english: "chow mein" },
        { id: "hamburger", hanzi: "\u6C49\u5821", pinyin: "h\xE0n b\u01CEo", english: "hamburger" },
        { id: "hot-dog", hanzi: "\u70ED\u72D7", pinyin: "r\xE8 g\u01D2u", english: "hot dog" },
        { id: "sandwich", hanzi: "\u4E09\u660E\u6CBB", pinyin: "s\u0101n m\xEDng zh\xEC", english: "sandwich" }
      ];
    }
    function foodPreferenceSubjects() {
      return [
        { id: "\u6211", hanzi: "\u6211", pinyin: "w\u01D2", english: "I" },
        { id: "\u7238\u7238", hanzi: "\u7238\u7238", pinyin: "b\xE0 ba", english: "Dad" },
        { id: "\u5988\u5988", hanzi: "\u5988\u5988", pinyin: "m\u0101 ma", english: "Mom" },
        { id: "\u7237\u7237", hanzi: "\u7237\u7237", pinyin: "y\xE9 ye", english: "Grandpa" },
        { id: "\u5976\u5976", hanzi: "\u5976\u5976", pinyin: "n\u01CEi nai", english: "Grandma" },
        { id: "\u59D0\u59D0", hanzi: "\u59D0\u59D0", pinyin: "ji\u011B jie", english: "Older sister" },
        { id: "\u59B9\u59B9", hanzi: "\u59B9\u59B9", pinyin: "m\xE8i mei", english: "Younger sister" },
        { id: "\u5F1F\u5F1F", hanzi: "\u5F1F\u5F1F", pinyin: "d\xEC di", english: "Younger brother" },
        { id: "\u54E5\u54E5", hanzi: "\u54E5\u54E5", pinyin: "g\u0113 ge", english: "Older brother" }
      ];
    }
    function foodPreferencePatterns() {
      return [
        { id: "like", hanzi: "\u559C\u6B22", pinyin: "x\u01D0 huan", english: "likes to eat", firstPersonEnglish: "like to eat" },
        { id: "dislike", hanzi: "\u4E0D\u559C\u6B22", pinyin: "b\xF9 x\u01D0 huan", english: "does not like to eat", firstPersonEnglish: "do not like to eat" },
        { id: "want", hanzi: "\u60F3", pinyin: "xi\u01CEng", english: "wants to eat", firstPersonEnglish: "want to eat" },
        { id: "not-want", hanzi: "\u4E0D\u60F3", pinyin: "b\xF9 xi\u01CEng", english: "does not want to eat", firstPersonEnglish: "do not want to eat" },
        { id: "need", hanzi: "\u8981", pinyin: "y\xE0o", english: "wants to eat", firstPersonEnglish: "want to eat" },
        { id: "not-need", hanzi: "\u4E0D\u8981", pinyin: "b\xFA y\xE0o", english: "does not want to eat", firstPersonEnglish: "do not want to eat" }
      ];
    }
    function selectedFoodPreferencePattern() {
      return foodPreferencePatterns().find((item) => item.id === state2.foodPreferencePatternId) ?? foodPreferencePatterns()[0];
    }
    function handleFoodPreferenceSubject(subjectId) {
      state2.foodPreferenceSubjectId = subjectId;
      renderActivityPanel2(currentTopic2());
    }
    function handleFoodPreferencePattern(patternId) {
      state2.foodPreferencePatternId = patternId;
      state2.foodPreferenceFoodId = "";
      renderActivityPanel2(currentTopic2());
    }
    function handleFoodPreferenceFill(foodId) {
      const item = foodPreferenceFillItems().find((entry) => entry.id === foodId);
      if (!item) return;
      const pattern = selectedFoodPreferencePattern();
      const subject = foodPreferenceSubjects().find((entry) => entry.id === state2.foodPreferenceSubjectId) ?? foodPreferenceSubjects()[0];
      const sentence = `${subject.hanzi}${pattern.hanzi}\u5403${item.hanzi}`;
      state2.foodPreferenceFoodId = foodId;
      if (state2.tapAudioEnabled) speak2(sentence, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function renderFoodPreferenceFillPractice() {
      const items = foodPreferenceFillItems();
      const pattern = selectedFoodPreferencePattern();
      const subjects = foodPreferenceSubjects();
      const subject = subjects.find((item) => item.id === state2.foodPreferenceSubjectId) ?? subjects[0];
      const selectedFood = items.find((item) => item.id === state2.foodPreferenceFoodId);
      const sentenceHanzi = `${subject.hanzi}${pattern.hanzi}\u5403${selectedFood?.hanzi ?? "____"}\u3002`;
      const sentencePinyin = `${subject.pinyin} ${pattern.pinyin} ch\u012B${selectedFood?.pinyin ? ` ${selectedFood.pinyin}` : ""}.`;
      const sentenceEnglish = `${subject.english} ${subject.id === "\u6211" ? pattern.firstPersonEnglish : pattern.english}${selectedFood?.english ? ` ${selectedFood.english}` : ""}.`;
      return `
    <section class="clothes-quiz-shell food-preference-fill-practice">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Make your sentence</p><p class="numbers-game-note">Choose one card in each column. There is no right or wrong answer.</p></div></div>
      <div class="food-preference-builder-columns">
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Subject</p><div class="food-preference-builder-list">${subjects.map((item) => `<button class="food-preference-subject-choice${subject.id === item.id ? " is-active" : ""}" type="button" data-food-preference-subject="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Word</p><div class="food-preference-builder-list">${foodPreferencePatterns().map((item) => `<button class="food-preference-pattern-choice${pattern.id === item.id ? " is-active" : ""}" type="button" data-food-preference-pattern="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
        <div class="food-preference-builder-column"><p class="food-preference-choice-label">Food</p><div class="food-preference-builder-list">${items.map((item) => `<button class="food-preference-fill-choice${selectedFood?.id === item.id ? " is-active" : ""}" type="button" data-food-preference-food="${item.id}"><span class="numbers-game-hanzi">${item.hanzi}</span><span class="food-preference-card-meta">${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</span></button>`).join("")}</div></div>
      </div>
      <div class="food-preference-built-sentence"><span class="numbers-game-hanzi">${sentenceHanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${sentencePinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${sentenceEnglish}</span>` : ""}</div>
    </section>
  `;
    }
    function classroomSentenceFrames() {
      return schoolTopicData3.classroom?.sentenceFrames ?? [];
    }
    function classroomSentenceWords() {
      return [
        ...(schoolTopicData3.classroom?.words ?? []).map((item) => item.id === "computer" ? { ...item, sentenceEnglish: "laptop" } : item),
        { id: "textbook", hanzi: "\u8BFE\u672C", pinyin: "k\xE8 b\u011Bn", english: "textbook", imagePath: "assets/illustrated-stationery/textbook.webp" },
        { id: "workbook", hanzi: "\u7EC3\u4E60\u672C", pinyin: "li\xE0n x\xED b\u011Bn", english: "workbook", imagePath: "assets/illustrated-stationery/workbook.webp" },
        { id: "pencil", hanzi: "\u94C5\u7B14", pinyin: "qi\u0101n b\u01D0", english: "pencil", imagePath: "assets/illustrated-stationery/pencil.webp" },
        { id: "ruler", hanzi: "\u5C3A\u5B50", pinyin: "ch\u01D0 zi", english: "ruler", imagePath: "assets/illustrated-stationery/ruler.webp" },
        { id: "eraser", hanzi: "\u6A61\u76AE", pinyin: "xi\xE0ng p\xED", english: "eraser", imagePath: "assets/illustrated-stationery/eraser.webp" },
        { id: "colored-pencils", hanzi: "\u5F69\u8272\u94C5\u7B14", pinyin: "c\u01CEi s\xE8 qi\u0101n b\u01D0", english: "colored pencils", imagePath: "assets/illustrated-stationery/colored-pencils.webp" }
      ];
    }
    function selectedClassroomSentenceFrame() {
      return classroomSentenceFrames().find((frame) => frame.id === state2.classroomSentenceFrameId) ?? classroomSentenceFrames()[0];
    }
    function classroomSentenceEnglish(frame, word) {
      if (!word) return "";
      const noun = word.sentenceEnglish ?? word.english;
      if (frame.id === "many-in-classroom") {
        return `There are many ${noun.endsWith("s") ? noun : `${noun}s`} in the classroom.`;
      }
      if (word.id === "colored-pencils") {
        return `There are colored pencils${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
      }
      const article = /^[aeiou]/i.test(noun) ? "an" : "a";
      return `There is ${article} ${noun}${frame.id === "on-table" ? " on the table" : " in the classroom"}.`;
    }
    function handleClassroomSentenceFrame(frameId) {
      const frame = classroomSentenceFrames().find((item) => item.id === frameId);
      if (!frame) return;
      state2.classroomSentenceFrameId = frameId;
      if (!frame.wordIds.includes(state2.classroomSentenceWordId)) {
        state2.classroomSentenceWordId = "";
      }
      renderActivityPanel2(currentTopic2());
    }
    function handleClassroomSentenceWord(wordId) {
      const frame = selectedClassroomSentenceFrame();
      const word = classroomSentenceWords().find((item) => item.id === wordId);
      if (!frame || !word || !frame.wordIds.includes(wordId)) return;
      state2.classroomSentenceWordId = wordId;
      if (state2.tapAudioEnabled) speak2(`${frame.hanzi}${word.hanzi}`, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function renderClassroomPractice2(topic) {
      const frames = classroomSentenceFrames();
      const frame = selectedClassroomSentenceFrame();
      const words = classroomSentenceWords().filter((item) => frame.wordIds.includes(item.id));
      const selectedWord = words.find((item) => item.id === state2.classroomSentenceWordId);
      const hanzi = `${frame.hanzi}${selectedWord?.hanzi ?? "____"}\u3002`;
      const pinyin = `${frame.pinyin}${selectedWord?.pinyin ? ` ${selectedWord.pinyin}` : ""}.`;
      const english = classroomSentenceEnglish(frame, selectedWord);
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = schoolTopicData3.classroom.practiceSummary;
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Make a sentence</p><p class="numbers-game-note">Choose a sentence start and an object. Every choice can make a good sentence.</p></div></div>
        <div class="intro-build-choices">${frames.map((item) => `<button class="intro-build-chip${frame.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-frame="${item.id}">${item.hanzi}</button>`).join("")}</div>
        <div class="transport-build-target classroom-sentence-output"><span class="numbers-game-hanzi">${hanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${pinyin}</span>` : ""}${state2.showEnglish && english ? `<span class="numbers-game-english">${english}</span>` : ""}</div>
        <div class="intro-build-choices classroom-sentence-object-choices">${words.map((item) => `<button class="intro-build-chip classroom-sentence-object-chip${selectedWord?.id === item.id ? " is-selected" : ""}" type="button" data-classroom-sentence-word="${item.id}"><img class="classroom-sentence-object-icon" src="${item.imagePath}" alt="" aria-hidden="true"><span>${item.hanzi}</span></button>`).join("")}</div>
      </section>
    </section>
  `;
      activityList2.querySelectorAll("[data-classroom-sentence-frame]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceFrame(button.dataset.classroomSentenceFrame)));
      activityList2.querySelectorAll("[data-classroom-sentence-word]").forEach((button) => button.addEventListener("click", () => handleClassroomSentenceWord(button.dataset.classroomSentenceWord)));
    }
    function ensureSchoolPractice2(topicId = currentTopic2().id) {
      const items = schoolPracticeItems2(topicId);
      const expectedOptionCount = topicId === "school-subjects" ? items.length : Math.min(4, items.length);
      if (state2.schoolPracticeTopicId !== topicId || state2.schoolChallengeOptionIds.length !== expectedOptionCount) {
        state2.schoolPracticeTopicId = topicId;
        resetSchoolChallenge();
        resetSchoolMatchGame2();
      }
    }
    function handleSchoolChallengePlay2() {
      ensureSchoolPractice2();
      resetSchoolChallenge({ excludeId: state2.schoolChallengePromptId });
      const item = schoolPracticeItems2().find((entry) => entry.id === state2.schoolChallengePromptId);
      if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleSchoolChallengeGuess2(itemId) {
      ensureSchoolPractice2();
      const correct = itemId === state2.schoolChallengeAnswerId;
      state2.schoolChallengePickedId = itemId;
      state2.schoolChallengeResult = correct ? "correct" : "wrong";
      if (correct) {
        state2.schoolListenFeedback = "Correct!";
        const item = schoolPracticeItems2().find((entry) => entry.id === itemId);
        if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
      } else {
        state2.schoolChallengeWrongIds = /* @__PURE__ */ new Set([...state2.schoolChallengeWrongIds, itemId]);
        state2.schoolListenFeedback = "Try again.";
      }
      renderActivityPanel2(currentTopic2());
    }
    function handleSchoolMatchPhrase2(itemId) {
      if (state2.schoolMatchedIds.has(itemId)) return;
      state2.schoolSelectedPhraseId = itemId;
      const item = schoolPracticeItems2().find((entry) => entry.id === itemId);
      if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleSchoolMatchAttempt2(itemId) {
      const selectedId = state2.schoolSelectedPhraseId;
      if (!selectedId || state2.schoolMatchedIds.has(itemId)) return;
      if (selectedId === itemId) {
        state2.schoolMatchedIds = /* @__PURE__ */ new Set([...state2.schoolMatchedIds, itemId]);
        state2.schoolMatchFeedback = "Correct!";
      } else {
        state2.schoolMatchFeedback = "Try again.";
      }
      state2.schoolSelectedPhraseId = null;
      renderActivityPanel2(currentTopic2());
    }
    function currentSchoolBuildItem() {
      const items = schoolSentenceBuilds3[currentTopic2().id] ?? [];
      return items.find((item) => item.id === state2.schoolBuildOrder[state2.schoolBuildIndex]) ?? items[0];
    }
    function prepareSchoolBuilder() {
      const item = currentSchoolBuildItem();
      state2.schoolBuildSelectedTokens = [];
      state2.schoolBuildResult = "";
      state2.schoolBuildAvailableTokens = shuffleArray2([...item?.target ?? [], ...item?.distractors ?? []]);
    }
    function ensureSchoolBuilder(topicId = currentTopic2().id) {
      const items = schoolSentenceBuilds3[topicId] ?? [];
      const hasCurrentItems = state2.schoolBuildOrder.length === items.length && state2.schoolBuildOrder.every((id) => items.some((item) => item.id === id));
      if (state2.schoolBuildTopicId !== topicId || !hasCurrentItems) {
        state2.schoolBuildTopicId = topicId;
        state2.schoolBuildOrder = shuffleArray2(items.map((item) => item.id));
        state2.schoolBuildIndex = 0;
        prepareSchoolBuilder();
      }
    }
    function handleSchoolBuildToken(index) {
      if (state2.schoolBuildResult === "correct") return;
      const item = currentSchoolBuildItem();
      const token = state2.schoolBuildAvailableTokens[index];
      if (!item || !token) return;
      const selected = [...state2.schoolBuildSelectedTokens, token];
      const isPrefix = selected.every((entry, tokenIndex) => entry === item.target[tokenIndex]);
      if (!isPrefix) {
        state2.schoolBuildResult = "wrong";
        prepareSchoolBuilder();
        state2.schoolBuildResult = "wrong";
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.schoolBuildSelectedTokens = selected;
      state2.schoolBuildAvailableTokens = state2.schoolBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
      if (selected.length === item.target.length) {
        state2.schoolBuildResult = "correct";
        if (state2.tapAudioEnabled) speak2(item.audio ?? selected.join(""), 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function clearSchoolBuilder() {
      prepareSchoolBuilder();
      renderActivityPanel2(currentTopic2());
    }
    function nextSchoolBuilder() {
      state2.schoolBuildIndex = (state2.schoolBuildIndex + 1) % state2.schoolBuildOrder.length;
      prepareSchoolBuilder();
      renderActivityPanel2(currentTopic2());
    }
    const foodCategoryGroups = {
      fruit: {
        hanzi: "\u6C34\u679C",
        english: "Fruit",
        items: [
          { id: "apple", hanzi: "\u82F9\u679C", pinyin: "p\xEDng gu\u01D2", english: "apple" },
          { id: "banana", hanzi: "\u9999\u8549", pinyin: "xi\u0101ng ji\u0101o", english: "banana" },
          { id: "grapes", hanzi: "\u8461\u8404", pinyin: "p\xFA tao", english: "grapes" },
          { id: "strawberry", hanzi: "\u8349\u8393", pinyin: "c\u01CEo m\xE9i", english: "strawberry" },
          { id: "orange", hanzi: "\u6A59\u5B50", pinyin: "ch\xE9ng zi", english: "orange" },
          { id: "pear", hanzi: "\u68A8", pinyin: "l\xED", english: "pear" },
          { id: "watermelon", hanzi: "\u897F\u74DC", pinyin: "x\u012B gu\u0101", english: "watermelon" },
          { id: "peach", hanzi: "\u6843\u5B50", pinyin: "t\xE1o zi", english: "peach" },
          { id: "cherries", hanzi: "\u6A31\u6843", pinyin: "y\u012Bng t\xE1o", english: "cherries" }
        ]
      },
      vegetable: {
        hanzi: "\u852C\u83DC",
        english: "Vegetables",
        items: [
          { id: "carrot", hanzi: "\u80E1\u841D\u535C", pinyin: "h\xFA lu\xF3 bo", english: "carrot" },
          { id: "cucumber", hanzi: "\u9EC4\u74DC", pinyin: "hu\xE1ng gu\u0101", english: "cucumber" },
          { id: "tomato", hanzi: "\u897F\u7EA2\u67FF", pinyin: "x\u012B h\xF3ng sh\xEC", english: "tomato" },
          { id: "broccoli", hanzi: "\u897F\u5170\u82B1", pinyin: "x\u012B l\xE1n hu\u0101", english: "broccoli" },
          { id: "potatoes", hanzi: "\u571F\u8C46", pinyin: "t\u01D4 d\xF2u", english: "potatoes" }
        ]
      },
      snack: {
        hanzi: "\u96F6\u98DF",
        english: "Snacks",
        items: [
          { id: "candies", hanzi: "\u7CD6\u679C", pinyin: "t\xE1ng gu\u01D2", english: "candies" },
          { id: "chocolate", hanzi: "\u5DE7\u514B\u529B", pinyin: "qi\u01CEo k\xE8 l\xEC", english: "chocolate" },
          { id: "ice-cream", hanzi: "\u51B0\u6DC7\u6DCB", pinyin: "b\u012Bng q\xED l\xEDn", english: "ice cream" },
          { id: "cake", hanzi: "\u86CB\u7CD5", pinyin: "d\xE0n g\u0101o", english: "cake" }
        ]
      },
      meal: {
        hanzi: "\u4E3B\u98DF",
        english: "Meal",
        items: [
          { id: "pizza", hanzi: "\u62AB\u8428", pinyin: "p\u012B s\xE0", english: "pizza" },
          { id: "chow-mein", hanzi: "\u7092\u9762", pinyin: "ch\u01CEo mi\xE0n", english: "chow mein" },
          { id: "fried-rice", hanzi: "\u7092\u996D", pinyin: "ch\u01CEo f\xE0n", english: "fried rice" },
          { id: "french-fries", hanzi: "\u85AF\u6761", pinyin: "sh\u01D4 ti\xE1o", english: "French fries" },
          { id: "hamburger", hanzi: "\u6C49\u5821", pinyin: "h\xE0n b\u01CEo", english: "hamburger" },
          { id: "hot-dog", hanzi: "\u70ED\u72D7", pinyin: "r\xE8 g\u01D2u", english: "hot dog" }
        ]
      },
      drink: {
        hanzi: "\u996E\u6599",
        english: "Drinks",
        items: [
          { id: "milk", hanzi: "\u725B\u5976", pinyin: "ni\xFA n\u01CEi", english: "milk" },
          { id: "juice", hanzi: "\u679C\u6C41", pinyin: "gu\u01D2 zh\u012B", english: "juice" },
          { id: "cola", hanzi: "\u53EF\u4E50", pinyin: "k\u011B l\xE8", english: "Coke" }
        ]
      }
    };
    function foodBookWordItems(data) {
      const itemIds = new Set(foodCategoryGroups[state2.foodBookCategoryId]?.items.map((item) => item.id) ?? []);
      return data.words.filter((item) => itemIds.has(item.id));
    }
    function foodCategoryIconPath(itemId) {
      return `assets/illustrated-food/${itemId}.webp`;
    }
    const foodHungerModes = {
      mix: { hanzi: "\u6DF7\u5408", english: "Mix" },
      ...Object.fromEntries(Object.entries(foodCategoryGroups).map(([id, group]) => [id, { hanzi: group.hanzi, english: group.english }]))
    };
    function foodHungerItems(modeId = state2.foodHungerModeId) {
      if (modeId === "mix") return Object.values(foodCategoryGroups).flatMap((group) => group.items);
      return foodCategoryGroups[modeId]?.items ?? [];
    }
    function prepareFoodHungerOptions() {
      const targetId = state2.foodHungerRoundIds[state2.foodHungerTargetIndex];
      const items = foodHungerItems();
      state2.foodHungerOptionIds = shuffleArray2([
        targetId,
        ...shuffleArray2(items.filter((item) => item.id !== targetId)).slice(0, 3).map((item) => item.id)
      ]);
      state2.foodHungerWrongIds = /* @__PURE__ */ new Set();
    }
    function resetFoodHungerGame(modeId = state2.foodHungerModeId) {
      state2.foodHungerModeId = modeId;
      state2.foodHungerRoundIds = shuffleArray2(foodHungerItems(modeId).map((item) => item.id)).slice(0, 3);
      state2.foodHungerTargetIndex = 0;
      state2.foodHungerPlatedIds = [];
      state2.foodHungerComplete = false;
      prepareFoodHungerOptions();
    }
    function ensureFoodHungerGame() {
      const items = foodHungerItems();
      const expectedCount = Math.min(3, items.length);
      const hasCurrentRound = state2.foodHungerRoundIds.length === expectedCount && state2.foodHungerRoundIds.every((id) => items.some((item) => item.id === id));
      if (!hasCurrentRound) resetFoodHungerGame();
    }
    function currentFoodHungerTarget() {
      return foodHungerItems().find((item) => item.id === state2.foodHungerRoundIds[state2.foodHungerTargetIndex]);
    }
    function handleFoodHungerGuess(itemId) {
      if (state2.foodHungerComplete) return;
      const target = currentFoodHungerTarget();
      if (!target) return;
      if (itemId !== target.id) {
        state2.foodHungerWrongIds = /* @__PURE__ */ new Set([...state2.foodHungerWrongIds, itemId]);
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.foodHungerPlatedIds = [...state2.foodHungerPlatedIds, target.id];
      if (state2.tapAudioEnabled) speak2(target.hanzi, 0.78);
      state2.foodHungerTargetIndex += 1;
      state2.foodHungerComplete = state2.foodHungerTargetIndex === state2.foodHungerRoundIds.length;
      if (!state2.foodHungerComplete) prepareFoodHungerOptions();
      renderActivityPanel2(currentTopic2());
    }
    function renderFoodHungerGame() {
      ensureFoodHungerGame();
      const items = foodHungerItems();
      const target = currentFoodHungerTarget();
      const platedItems = state2.foodHungerPlatedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
      const optionItems = state2.foodHungerOptionIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
      const isComplete = state2.foodHungerComplete;
      return `
    <section class="practice-split-card food-hunger-game-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">\u997F\u4E86\uFF0C\u5403\u70B9\u4EC0\u4E48\uFF1F${state2.showEnglish ? '<span class="food-hunger-kicker-english">Hungry? What should we eat?</span>' : ""}</p><p class="numbers-game-note">Choose a food group or Mix. A food picture will appear. Tap the matching Chinese word to put it in your cart.</p></div></div>
      <div class="food-category-tabs food-hunger-tabs">${Object.entries(foodHungerModes).map(([id, mode]) => `<button class="food-category-tab${state2.foodHungerModeId === id ? " is-active" : ""}" type="button" data-food-hunger-mode="${id}">${mode.hanzi}${state2.showEnglish ? `<small>${mode.english}</small>` : ""}</button>`).join("")}</div>
      <div class="backpack-game-progress" aria-label="${state2.foodHungerPlatedIds.length} of ${state2.foodHungerRoundIds.length} foods in the cart">${state2.foodHungerRoundIds.map((_, index) => `<span class="backpack-game-progress-dot${index < state2.foodHungerPlatedIds.length ? " is-packed" : ""}">${index < state2.foodHungerPlatedIds.length ? "\u2713" : ""}</span>`).join("")}</div>
      <div class="food-hunger-visual${isComplete ? " is-complete" : ""}">
        ${!isComplete && target ? `<div class="food-hunger-target"><img src="${foodCategoryIconPath(target.id)}" alt="${target.english}"></div>` : ""}
        <div class="food-hunger-cart"><img class="food-hunger-cart-image" src="assets/illustrated-food/game-shopping-cart.webp" alt="empty shopping cart">${platedItems.map((item, index) => `<img class="food-hunger-plated-item is-item-${index}" src="${foodCategoryIconPath(item.id)}" alt="">`).join("")}${isComplete ? '<span class="food-hunger-complete-mark" aria-label="All foods are in the cart">\u2713</span>' : ""}</div>
      </div>
      ${isComplete ? '<p class="backpack-game-complete-message">Your cart is ready!</p>' : `<div class="numbers-game-options backpack-game-options food-hunger-options">${optionItems.map((item) => {
        const isWrong = state2.foodHungerWrongIds.has(item.id);
        return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-food-hunger-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">\xD7</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}</div>`}
    </section>
  `;
    }
    function renderFoodPractice2(topic) {
      ensureSchoolBuilder(topic.id);
      const item = currentSchoolBuildItem();
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = "";
      activityPanelSummary2.hidden = true;
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderFoodHungerGame()}
        <section class="practice-split-card">
          <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
          <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
          <div class="transport-build-hint">${state2.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
          <div class="transport-build-target is-${state2.schoolBuildResult}">${state2.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state2.schoolBuildResult === "correct" ? "\u2713" : "\xD7"}</span>` : ""}${state2.schoolBuildSelectedTokens.length ? state2.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
          <div class="intro-build-choices">${state2.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
          <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state2.schoolBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
        </section>
      </div>
    </section>
  `;
      activityList2.querySelectorAll("[data-food-hunger-mode]").forEach((button) => button.addEventListener("click", () => {
        resetFoodHungerGame(button.dataset.foodHungerMode);
        renderActivityPanel2(topic);
      }));
      activityList2.querySelectorAll("[data-food-hunger-guess]").forEach((button) => button.addEventListener("click", () => handleFoodHungerGuess(button.dataset.foodHungerGuess)));
      activityList2.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
      activityList2.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
      activityList2.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
    }
    function renderSchoolSentenceBuilder(item) {
      return `
    <section class="practice-split-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in the right order. Some cards do not belong.</p></div></div>
      <figure class="clothes-quiz-visual school-build-visual"><img class="clothes-quiz-image" src="${item.imagePath}" alt="${item.english}" /></figure>
      <div class="transport-build-hint">${state2.showPinyin ? `<p class="transport-build-hint-pinyin">${item.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="transport-build-hint-english">${item.english}</p>` : ""}</div>
      <div class="transport-build-target is-${state2.schoolBuildResult}">${state2.schoolBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state2.schoolBuildResult === "correct" ? "\u2713" : "\xD7"}</span>` : ""}${state2.schoolBuildSelectedTokens.length ? state2.schoolBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}</div>
      <div class="intro-build-choices">${state2.schoolBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-school-build-token="${index}">${token}</button>`).join("")}</div>
      <div class="intro-build-actions"><button class="small-button" type="button" data-school-build-clear>Clear</button>${state2.schoolBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-school-build-next>Next picture</button>' : ""}</div>
    </section>
  `;
    }
    function renderBackpackGame() {
      ensureBackpackGame();
      const items = backpackGameItems();
      const target = currentBackpackGameTarget();
      const placedItems = state2.backpackGamePlacedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
      const optionItems = state2.backpackGameOptionIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
      const isComplete = state2.backpackGameComplete;
      return `
    <section class="practice-split-card backpack-game-card">
      <div class="numbers-game-top">
        <div><p class="body-match-kicker">Pack the backpack</p><p class="numbers-game-note">Look at the school thing, then tap its Chinese word.</p></div>
        <button class="small-button is-action-button" type="button" data-backpack-game-new>New mix</button>
      </div>
      <div class="backpack-game-progress" aria-label="${state2.backpackGamePlacedIds.length} of 3 items packed">
        ${[0, 1, 2].map((index) => `<span class="backpack-game-progress-dot${index < state2.backpackGamePlacedIds.length ? " is-packed" : ""}">${index < state2.backpackGamePlacedIds.length ? "\u2713" : ""}</span>`).join("")}
      </div>
      <div class="backpack-game-visual${isComplete ? " is-complete" : ""}">
        <img class="backpack-game-bag" src="assets/illustrated-stationery/${isComplete ? "backpack.webp" : "open-backpack.webp"}" alt="${isComplete ? "closed backpack" : "open backpack"}">
        ${!isComplete && target ? `<div class="backpack-game-target"><img src="${target.imagePath}" alt="${target.english}"></div>` : ""}
        ${!isComplete ? `<div class="backpack-game-packed-items">${placedItems.map((item, index) => `<img class="backpack-game-packed-item is-item-${index}" src="${item.imagePath}" alt="">`).join("")}</div>` : '<span class="backpack-game-complete-mark" aria-label="All packed">\u2713</span>'}
      </div>
      ${isComplete ? '<p class="backpack-game-complete-message">All packed!</p>' : `<div class="numbers-game-options backpack-game-options">${optionItems.map((item) => {
        const isWrong = state2.backpackGameWrongIds.has(item.id);
        return `<button class="numbers-game-option greetings-game-option family-listen-option${isWrong ? " is-wrong" : ""}" type="button" data-backpack-game-guess="${item.id}">${isWrong ? '<span class="answer-result-mark" aria-hidden="true">\xD7</span>' : ""}<span class="numbers-game-hanzi">${item.hanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}</div>`}
    </section>
  `;
    }
    function renderStationeryPictureMatch() {
      ensureStationeryPictureMatch();
      const round = currentStationeryPictureMatchRound();
      const columnLabels = { measure: "\u6570\u91CF + \u91CF\u8BCD", color: "\u989C\u8272", item: "\u6587\u5177" };
      const selected = state2.stationeryPictureMatchSelections;
      const isComplete = state2.stationeryPictureMatchComplete;
      return `
    <section class="practice-split-card stationery-picture-match-card">
      <div class="numbers-game-top"><div><p class="body-match-kicker">Match the picture</p><p class="numbers-game-note">Look at the picture. Choose the quantity, color, and school thing.</p></div></div>
      <figure class="stationery-picture-match-visual"><img src="${round.imagePath}" alt="${round.alt}"></figure>
      <div class="stationery-picture-match-columns">
        ${Object.entries(stationeryPictureMatchChoices2).map(([column, choices]) => `
          <div class="stationery-picture-match-column">
            <p class="stationery-picture-match-label">${columnLabels[column]}</p>
            ${state2.stationeryPictureMatchChoiceOrders[column].map((choice) => {
        const isCorrect = selected[column] === choice;
        const isWrong = state2.stationeryPictureMatchWrong[column].has(choice);
        return `<button class="stationery-picture-match-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-stationery-picture-match-pick="${column}" data-stationery-picture-match-value="${choice}"${isCorrect || isComplete ? " disabled" : ""}><span class="stationery-picture-match-word">${choice}</span>${state2.showEnglish ? `<span class="stationery-picture-match-english">${stationeryPictureMatchEnglish2[choice]}</span>` : ""}${isCorrect || isWrong ? `<span class="answer-result-mark" aria-hidden="true">${isCorrect ? "\u2713" : "\xD7"}</span>` : ""}</button>`;
      }).join("")}
          </div>
        `).join("")}
      </div>
      ${isComplete ? `<div class="stationery-picture-match-result is-correct"><span class="answer-result-mark" aria-hidden="true">\u2713</span><div><strong>${Object.values(round.target).join("")}\u3002</strong>${state2.showPinyin ? `<span>${round.pinyin}</span>` : ""}${state2.showEnglish ? `<span>${round.english}</span>` : ""}</div><button class="small-button is-action-button" type="button" data-stationery-picture-match-next>Next picture</button></div>` : ""}
    </section>
  `;
    }
    function renderStationeryPractice2(topic) {
      ensureSchoolBuilder(topic.id);
      const item = currentSchoolBuildItem();
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = "Match the words to the picture, then build a sentence from the picture.";
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderStationeryPictureMatch()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
      activityList2.querySelectorAll("[data-stationery-picture-match-pick]").forEach((button) => button.addEventListener("click", () => handleStationeryPictureMatchPick(button.dataset.stationeryPictureMatchPick, button.dataset.stationeryPictureMatchValue)));
      activityList2.querySelector("[data-stationery-picture-match-next]")?.addEventListener("click", nextStationeryPictureMatch);
      activityList2.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
      activityList2.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
      activityList2.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
    }
    function renderSchoolSuppliesPractice2(topic) {
      ensureSchoolBuilder(topic.id);
      const item = currentSchoolBuildItem();
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = "Pack three school things, then build a sentence from the picture.";
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderBackpackGame()}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
      activityList2.querySelector("[data-backpack-game-new]")?.addEventListener("click", () => {
        resetBackpackGame();
        renderActivityPanel2(topic);
      });
      activityList2.querySelectorAll("[data-backpack-game-guess]").forEach((button) => button.addEventListener("click", () => handleBackpackGameGuess(button.dataset.backpackGameGuess)));
      activityList2.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
      activityList2.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
      activityList2.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
    }
    function renderSchoolPractice2(topic) {
      if (topic.id === "food") {
        renderFoodPractice2(topic);
        return;
      }
      if (topic.id === "food-preferences") {
        renderFoodPreferencesPractice2(topic);
        return;
      }
      if (topic.id === "meals-feelings") {
        renderMealsConversationPractice2(topic);
        return;
      }
      if (topic.id === "classroom") {
        renderClassroomPractice2(topic);
        return;
      }
      if (topic.id === "stationery") {
        renderStationeryPractice2(topic);
        return;
      }
      if (topic.id === "school-supplies") {
        renderSchoolSuppliesPractice2(topic);
        return;
      }
      ensureSchoolPractice2(topic.id);
      ensureSchoolBuilder(topic.id);
      const topicData2 = schoolTopicData3[topic.id];
      const item = currentSchoolBuildItem();
      const listen = {
        items: () => schoolPracticeItems2(topic.id),
        optionIds: () => state2.schoolChallengeOptionIds,
        pickedId: () => state2.schoolChallengePickedId,
        result: () => state2.schoolChallengeResult,
        wrongIds: () => state2.schoolChallengeWrongIds,
        feedback: () => state2.schoolListenFeedback
      };
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = topicData2?.practiceSummary ?? "Listen for a school word, then build a sentence from the picture.";
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      <div class="practice-split-board">
        ${renderListenPractice2(listen)}
        ${renderSchoolSentenceBuilder(item)}
      </div>
    </section>
  `;
      activityList2.querySelector("[data-template-listen-play]")?.addEventListener("click", handleSchoolChallengePlay2);
      activityList2.querySelectorAll("[data-template-listen-guess]").forEach((button) => button.addEventListener("click", () => handleSchoolChallengeGuess2(button.dataset.templateListenGuess)));
      activityList2.querySelectorAll("[data-school-build-token]").forEach((button) => button.addEventListener("click", () => handleSchoolBuildToken(Number(button.dataset.schoolBuildToken))));
      activityList2.querySelector("[data-school-build-clear]")?.addEventListener("click", clearSchoolBuilder);
      activityList2.querySelector("[data-school-build-next]")?.addEventListener("click", nextSchoolBuilder);
    }
    function renderMealsConversationPractice2(topic) {
      ensureMealsConversationMatch();
      ensureMealsPictureChoice();
      const items = mealsConversationItems();
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = schoolTopicData3[topic.id].practiceSummary;
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderMatchPractice2({
        phraseHeading: "First line",
        meaningHeading: "Reply",
        items: () => items,
        phraseIds: () => state2.schoolPhraseOrder,
        meaningIds: () => state2.schoolMeaningOrder,
        matchedIds: () => state2.schoolMatchedIds,
        selectedId: () => state2.schoolSelectedPhraseId,
        feedback: () => state2.schoolMatchFeedback,
        wrongPhraseIds: () => state2.mealsConversationWrongPhraseIds,
        wrongMeaningIds: () => state2.mealsConversationWrongReplyIds,
        meaningContent: (id) => {
          const item = items.find((entry) => entry.id === id);
          if (!item) return "";
          return `<span class="numbers-game-hanzi">${item.reply}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.replyPinyin}</span>` : ""}`;
        }
      })}
      ${renderMealsPictureChoice()}
    </section>
  `;
      activityList2.querySelector("[data-template-match-new]")?.addEventListener("click", () => {
        resetMealsConversationMatch();
        renderActivityPanel2(topic);
      });
      activityList2.querySelector("[data-template-match-play-again]")?.addEventListener("click", () => {
        resetMealsConversationMatch();
        renderActivityPanel2(topic);
      });
      activityList2.querySelectorAll("[data-template-match-phrase]").forEach((button) => button.addEventListener("click", () => handleMealsConversationPhrase(button.dataset.templateMatchPhrase)));
      activityList2.querySelectorAll("[data-template-match-meaning]").forEach((button) => button.addEventListener("click", () => handleMealsConversationAttempt(button.dataset.templateMatchMeaning)));
      activityList2.querySelectorAll("[data-meals-picture-pick]").forEach((button) => button.addEventListener("click", () => handleMealsPictureChoice(button.dataset.mealsPicturePick)));
      activityList2.querySelector("[data-meals-picture-next]")?.addEventListener("click", nextMealsPictureChoice);
    }
    function renderFoodPreferencesPractice2(topic) {
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = schoolTopicData3[topic.id].practiceSummary;
      activityList2.className = "support-list";
      activityList2.innerHTML = `
    <section class="family-practice-shell lesson-practice-shell">
      ${renderFoodPreferenceFillPractice()}
    </section>
  `;
      activityList2.querySelectorAll("[data-food-preference-subject]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceSubject(button.dataset.foodPreferenceSubject)));
      activityList2.querySelectorAll("[data-food-preference-pattern]").forEach((button) => button.addEventListener("click", () => handleFoodPreferencePattern(button.dataset.foodPreferencePattern)));
      activityList2.querySelectorAll("[data-food-preference-food]").forEach((button) => button.addEventListener("click", () => handleFoodPreferenceFill(button.dataset.foodPreferenceFood)));
    }
    function schoolWordGroups(topicId = currentTopic2().id) {
      const data = schoolTopicData3[topicId];
      if (!data?.wordGroups) return [];
      return data.wordGroups.map((group) => ({
        ...group,
        items: group.items.map(([id, hanzi, pinyin, english, file]) => ({
          id,
          hanzi,
          pinyin,
          english,
          audio: hanzi,
          imagePath: file ? file.startsWith("assets/") ? file : `assets/illustrated-food/${file}` : ""
        }))
      }));
    }
    function renderSchoolExplorer2(topicId) {
      const topic = currentTopic2();
      const data = schoolTopicData3[topicId];
      if (!data) {
        renderDefaultExplorer2();
        return;
      }
      const sceneGroups = data.sceneGroups ?? [{ id: "all", items: data.scenes ?? [] }];
      const wordGroups = schoolWordGroups(topicId);
      if (topicId === "meals-feelings" && !wordGroups.some((group) => group.id === state2.mealsWordGroupId)) {
        state2.mealsWordGroupId = wordGroups[0]?.id ?? "";
      }
      const visibleWords = topicId === "food" ? foodBookWordItems(data) : topicId === "meals-feelings" ? wordGroups.find((group) => group.id === state2.mealsWordGroupId)?.items ?? [] : data.words;
      focusExplorer2.innerHTML = `
    <div class="time-date-board school-topic-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      ${sceneGroups.map((group) => `
        <section class="school-lesson-section is-${group.id}">
          ${group.label ? `<p class="body-match-kicker school-lesson-heading">${group.label}</p>` : ""}
          <div class="school-scene-grid${group.items.length === 1 ? " is-single" : ""}">
            ${group.items.map((scene) => `
              <section class="greetings-exchange school-scene-card">
                <div class="greetings-exchange-top">${scene.label ? `<div><p class="body-match-kicker">${scene.label}</p></div>` : "<span></span>"}<button class="small-button is-action-button" type="button" data-school-play-scene="${scene.id}">Play scene</button></div>
                <div class="school-scene-layout${topicId === "food" ? " is-compact" : ""}">
                  <img class="school-scene-image" src="${scene.imagePath}" alt="${scene.english ?? scene.lines?.[0]?.english ?? ""}" />
                  <div class="greetings-line-stack${scene.compactLines ? " is-compact" : ""}">
                    ${(scene.lines ?? [scene]).map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `).join("")}
          </div>
        </section>
      `).join("")}
      ${data.showWords !== false ? `
        <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
        ${topicId === "food" ? `<div class="food-book-tabs" role="tablist" aria-label="Food word categories">${Object.entries(foodCategoryGroups).map(([id, group]) => `<button class="food-book-tab${state2.foodBookCategoryId === id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state2.foodBookCategoryId === id}" data-food-book-category="${id}">${group.hanzi}${state2.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        ${topicId === "meals-feelings" && wordGroups.length > 1 ? `<div class="food-book-tabs lesson-word-tabs" role="tablist" aria-label="Meals and feelings word categories">${wordGroups.map((group) => `<button class="food-book-tab${state2.mealsWordGroupId === group.id ? " is-active" : ""}" type="button" role="tab" aria-selected="${state2.mealsWordGroupId === group.id}" data-meals-word-group="${group.id}">${group.hanzi}${state2.showEnglish ? `<small>${group.english}</small>` : ""}</button>`).join("")}</div>` : ""}
        <div class="school-word-grid${topicId === "school-subjects" ? " is-text-only" : ""}${topicId === "meals-feelings" ? " is-uniform-images" : ""}">
          ${visibleWords.map((item) => `
            <button class="school-word-card" type="button" data-school-word="${item.id}">
              ${item.imagePath ? `<img class="school-word-image" src="${item.imagePath}" alt="${item.english}" />` : ""}
              <span class="time-asset-hanzi">${item.hanzi}</span>
              ${state2.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
              ${state2.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${data.review ? `<section class="visual-topic-notes school-review-notes"><p class="body-match-kicker">Useful notes</p><div class="visual-topic-note-grid school-review-grid">${data.review.map((item) => `<article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${item.pattern}</p>${state2.showPinyin ? `<p class="visual-topic-note-pinyin">${item.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="visual-topic-note-english">${item.english}</p>` : ""}<p class="visual-topic-note-example">${item.example}</p>${state2.showPinyin && item.examplePinyin ? `<p class="visual-topic-note-pinyin">${item.examplePinyin}</p>` : ""}${state2.showEnglish && item.exampleEnglish ? `<p class="visual-topic-note-english">${item.exampleEnglish}</p>` : ""}</article>`).join("")}</div></section>` : ""}
      ${topicId === "school-subjects" ? `<section class="visual-topic-notes"><p class="body-match-kicker">Useful note</p><div class="visual-topic-note-grid school-subject-note"><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u53BB</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\xF9</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">to go</p>' : ""}<p class="visual-topic-note-example">\u6211\u53BB\u4E0A\u97F3\u4E50\u8BFE\u3002</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u5728</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">z\xE0i</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">at / in; marks an action happening now</p>' : ""}<p class="visual-topic-note-example">\u6211\u5728\u4E0A\u97F3\u4E50\u8BFE\u3002</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u559C\u6B22</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">x\u01D0 huan</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">to like</p>' : ""}<p class="visual-topic-note-example">\u6211\u559C\u6B22\u97F3\u4E50\u8BFE\u3002</p></article><article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4E0D\u559C\u6B22</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">b\xF9 x\u01D0 huan</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">to not like</p>' : ""}<p class="visual-topic-note-example">\u6211\u4E0D\u559C\u6B22\u6570\u5B66\u8BFE\u3002</p></article></div></section>` : ""}
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-school-play-scene]").forEach((button) => {
        button.addEventListener("click", () => {
          const scene = sceneGroups.flatMap((group) => group.items).find((entry) => entry.id === button.dataset.schoolPlayScene);
          if (!scene || !state2.tapAudioEnabled) return;
          if (scene.lines?.length) {
            speakSceneLines2(scene.lines.map((line) => ({ ...line, audio: line.audio ?? line.hanzi })));
            return;
          }
          speak2(scene.audio, 0.78);
        });
      });
      focusExplorer2.querySelectorAll("[data-school-word]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = visibleWords.find((entry) => entry.id === button.dataset.schoolWord);
          if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
        });
      });
      focusExplorer2.querySelectorAll("[data-food-book-category]").forEach((button) => {
        button.addEventListener("click", () => {
          state2.foodBookCategoryId = button.dataset.foodBookCategory;
          renderSchoolExplorer2(topicId);
        });
      });
      focusExplorer2.querySelectorAll("[data-meals-word-group]").forEach((button) => {
        button.addEventListener("click", () => {
          state2.mealsWordGroupId = button.dataset.mealsWordGroup;
          renderSchoolExplorer2(topicId);
        });
      });
    }
    return { schoolPracticeItems: schoolPracticeItems2, ensureSchoolPractice: ensureSchoolPractice2, renderSchoolPractice: renderSchoolPractice2, renderStationeryPractice: renderStationeryPractice2, renderSchoolSuppliesPractice: renderSchoolSuppliesPractice2, renderFoodPractice: renderFoodPractice2, renderMealsConversationPractice: renderMealsConversationPractice2, renderFoodPreferencesPractice: renderFoodPreferencesPractice2, renderClassroomPractice: renderClassroomPractice2, renderSchoolExplorer: renderSchoolExplorer2 };
  }

  // src/features/food/food.js
  var foodTopic = {
    id: "food",
    title: "Food & Drinks",
    summary: "Name food and drinks, from fruit and vegetables to snacks and everyday meals.",
    progressLabel: "1B to 3B",
    iconText: "\u6C34\u679C",
    iconColor: "#c48d46",
    focus: { hanzi: "\u6211\u5403\u82F9\u679C\uFF0C\u559D\u725B\u5976\u3002", pinyin: "w\u01D2 ch\u012B p\xEDng gu\u01D2, h\u0113 ni\xFA n\u01CEi.", english: "I eat apples and drink milk.", audio: "\u6211\u5403\u82F9\u679C\u559D\u725B\u5976" },
    interactiveScene: "food-scenes",
    parentGuide: "This is one of the easiest topics to make real. Use snack time, lunch, and shopping to repeat words naturally.",
    cultureGuide: "Food is a great place to add extra content later: dumplings, mooncakes, z\xF2ngzi, fruit names, and meal routines.",
    activities: ["Tap to hear", "Name the food", "Match the words", "Build a sentence"],
    steps: [
      { book: "1B", lesson: 7, title: "Fruit", note: "Begin with highly visual food words." },
      { book: "2B", lesson: 7, title: "Snacks", note: "Add everyday treat vocabulary." },
      { book: "3B", lesson: 6, title: "Vegetables", note: "Extend the category." }
    ]
  };
  var foodTopicData = {
    practiceSummary: "Listen for a food word, then build a sentence from the picture.",
    scenes: [
      {
        id: "fruit",
        label: "Fruit",
        hanzi: "\u6211\u559C\u6B22\u82F9\u679C\u3001\u9999\u8549\u3001\u8461\u8404\u548C\u8349\u8393\u3002",
        pinyin: "w\u01D2 x\u01D0 huan p\xEDng gu\u01D2, xi\u0101ng ji\u0101o, p\xFA tao h\xE9 c\u01CEo m\xE9i.",
        english: "I like apples, bananas, grapes, and strawberries.",
        audio: "\u6211\u559C\u6B22\u82F9\u679C\u9999\u8549\u8461\u8404\u548C\u8349\u8393",
        imagePath: "assets/illustrated-food/fruit-group-1b-core.webp"
      }
    ],
    words: [
      ["apple", "\u82F9\u679C", "p\xEDng gu\u01D2", "apple", "apple.webp"],
      ["banana", "\u9999\u8549", "xi\u0101ng ji\u0101o", "banana", "banana.webp"],
      ["grapes", "\u8461\u8404", "p\xFA tao", "grapes", "grapes.webp"],
      ["strawberry", "\u8349\u8393", "c\u01CEo m\xE9i", "strawberry", "strawberry.webp"],
      ["orange", "\u6A59\u5B50", "ch\xE9ng zi", "orange", "orange.webp"],
      ["pear", "\u68A8", "l\xED", "pear", "pear.webp"],
      ["watermelon", "\u897F\u74DC", "x\u012B gu\u0101", "watermelon", "watermelon.webp"],
      ["peach", "\u6843\u5B50", "t\xE1o zi", "peach", "peach.webp"],
      ["cherries", "\u6A31\u6843", "y\u012Bng t\xE1o", "cherries", "cherries.webp"],
      ["candies", "\u7CD6\u679C", "t\xE1ng gu\u01D2", "candies", "candies.webp"],
      ["chocolate", "\u5DE7\u514B\u529B", "qi\u01CEo k\xE8 l\xEC", "chocolate", "chocolate.webp"],
      ["ice-cream", "\u51B0\u6DC7\u6DCB", "b\u012Bng q\xED l\xEDn", "ice cream", "ice-cream.webp"],
      ["cake", "\u86CB\u7CD5", "d\xE0n g\u0101o", "cake", "cake.webp"],
      ["pizza", "\u62AB\u8428", "p\u012B s\xE0", "pizza", "pizza.webp"],
      ["milk", "\u725B\u5976", "ni\xFA n\u01CEi", "milk", "milk.webp"],
      ["juice", "\u679C\u6C41", "gu\u01D2 zh\u012B", "juice", "juice.webp"],
      ["cola", "\u53EF\u4E50", "k\u011B l\xE8", "Coke", "cola.webp"],
      ["chow-mein", "\u7092\u9762", "ch\u01CEo mi\xE0n", "chow mein", "chow-mein.webp"],
      ["fried-rice", "\u7092\u996D", "ch\u01CEo f\xE0n", "fried rice", "fried-rice.webp"],
      ["french-fries", "\u85AF\u6761", "sh\u01D4 ti\xE1o", "French fries", "french-fries.webp"],
      ["hamburger", "\u6C49\u5821", "h\xE0n b\u01CEo", "hamburger", "hamburger.webp"],
      ["hot-dog", "\u70ED\u72D7", "r\xE8 g\u01D2u", "hot dog", "hot-dog.webp"],
      ["carrot", "\u80E1\u841D\u535C", "h\xFA lu\xF3 bo", "carrot", "carrot.webp"],
      ["cucumber", "\u9EC4\u74DC", "hu\xE1ng gu\u0101", "cucumber", "cucumber.webp"],
      ["tomato", "\u897F\u7EA2\u67FF", "x\u012B h\xF3ng sh\xEC", "tomato", "tomato.webp"],
      ["broccoli", "\u897F\u5170\u82B1", "x\u012B l\xE1n hu\u0101", "broccoli", "broccoli.webp"],
      ["potatoes", "\u571F\u8C46", "t\u01D4 d\xF2u", "potatoes", "potatoes.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-food/${file}` })),
    review: [
      { pattern: "\u5403", pinyin: "ch\u012B", english: "eat solid food", example: "Use \u5403 for food you chew: \u5403\u82F9\u679C\u3001\u62AB\u8428\u3001\u7092\u996D\u3002" },
      { pattern: "\u559D", pinyin: "h\u0113", english: "drink liquids", example: "Use \u559D for drinks: \u559D\u6C34\u3001\u725B\u5976\u3001\u679C\u6C41\u3002" }
    ]
  };
  var foodSentenceBuilds = [
    { id: "fruit", imagePath: "assets/illustrated-food/fruit-group-1b-core.webp", target: ["\u6211", "\u5403", "\u82F9\u679C"], distractors: ["\u559D", "\u5B66\u6821", "\u6559\u5BA4"], pinyin: "w\u01D2 ch\u012B p\xEDng gu\u01D2.", english: "I eat an apple." },
    { id: "milk", imagePath: "assets/illustrated-food/milk.webp", target: ["\u6211", "\u559D", "\u725B\u5976"], distractors: ["\u5403", "\u5B66\u6821", "\u6559\u5BA4"], pinyin: "w\u01D2 h\u0113 ni\xFA n\u01CEi.", english: "I drink milk." }
  ];

  // src/features/food/food-preferences.js
  var foodPreferencesTopic = {
    id: "food-preferences",
    title: "Food Preferences",
    summary: "Ask what someone likes to eat and say what you like or do not like.",
    progressLabel: "3B Lesson 5",
    iconText: "\u559C\u6B22",
    iconColor: "#c48d46",
    focus: { hanzi: "\u4F60\u559C\u6B22\u5403\u4EC0\u4E48\uFF1F", pinyin: "n\u01D0 x\u01D0 huan ch\u012B sh\xE9n me?", english: "What do you like to eat?", audio: "\u4F60\u559C\u6B22\u5403\u4EC0\u4E48" },
    interactiveScene: "food-preferences",
    parentGuide: "Ask \u4F60\u559C\u6B22\u5403\u4EC0\u4E48\uFF1F, then let your child answer with one food they like or do not like.",
    cultureGuide: "\u559C\u6B22\u5403 and \u4E0D\u559C\u6B22\u5403 make it easy to share a real preference at a meal or snack time.",
    activities: ["Play scenes", "Say a preference", "Listen and choose", "Build a sentence"],
    steps: [{ book: "3B", lesson: 5, title: "Food and drink", note: "Talk about foods and drinks you like." }]
  };
  var foodPreferencesTopicData = {
    practiceSummary: "Make your own sentences about foods you like and do not like.",
    scenes: [
      {
        id: "food-preferences-dialogue",
        label: "Food talk",
        hanzi: "\u6211\u559C\u6B22\u5403\u51B0\u6DC7\u6DCB\u3002\u4F60\u559C\u6B22\u5403\u4EC0\u4E48\uFF1F",
        pinyin: "w\u01D2 x\u01D0 huan ch\u012B b\u012Bng q\xED l\xEDn. n\u01D0 x\u01D0 huan ch\u012B sh\xE9n me?",
        english: "I like to eat ice cream. What do you like to eat?",
        audio: "\u6211\u559C\u6B22\u5403\u51B0\u6DC7\u6DCB\u4F60\u559C\u6B22\u5403\u4EC0\u4E48",
        imagePath: "assets/illustrated-snacks/food-preferences-dialogue.webp"
      },
      {
        id: "like-pizza",
        label: "I like",
        hanzi: "\u6211\u559C\u6B22\u5403\u62AB\u8428\u3002",
        pinyin: "w\u01D2 x\u01D0 huan ch\u012B p\u012B s\xE0.",
        english: "I like to eat pizza.",
        audio: "\u6211\u559C\u6B22\u5403\u62AB\u8428",
        imagePath: "assets/illustrated-food-feelings/like-pizza.webp"
      },
      {
        id: "dislike-broccoli",
        label: "I do not like",
        hanzi: "\u6211\u4E0D\u559C\u6B22\u5403\u897F\u5170\u82B1\u3002",
        pinyin: "w\u01D2 b\xF9 x\u01D0 huan ch\u012B x\u012B l\xE1n hu\u0101.",
        english: "I do not like to eat broccoli.",
        audio: "\u6211\u4E0D\u559C\u6B22\u5403\u897F\u5170\u82B1",
        imagePath: "assets/illustrated-food-feelings/dislike-broccoli.webp"
      },
      {
        id: "parents-food-preferences",
        label: "Family preferences",
        hanzi: "\u5988\u5988\u559C\u6B22\u5403\u997A\u5B50\u3002\u7238\u7238\u4E0D\u559C\u6B22\u5403\u997A\u5B50\u3002",
        pinyin: "m\u0101 ma x\u01D0 huan ch\u012B ji\u01CEo zi. b\xE0 ba b\xF9 x\u01D0 huan ch\u012B ji\u01CEo zi.",
        english: "Mom likes to eat dumplings. Dad does not like to eat dumplings.",
        audio: "\u5988\u5988\u559C\u6B22\u5403\u997A\u5B50\u7238\u7238\u4E0D\u559C\u6B22\u5403\u997A\u5B50",
        imagePath: "assets/illustrated-snacks/parents-food-preferences.webp"
      }
    ],
    words: [
      ["ice-cream", "\u51B0\u6DC7\u6DCB", "b\u012Bng q\xED l\xEDn", "ice cream", "ice-cream.webp"],
      ["pizza", "\u62AB\u8428", "p\u012B s\xE0", "pizza", "pizza.webp"],
      ["broccoli", "\u897F\u5170\u82B1", "x\u012B l\xE1n hu\u0101", "broccoli", "broccoli.webp"],
      ["dumplings", "\u997A\u5B50", "ji\u01CEo zi", "dumplings", "dumplings.webp"]
    ].map(([id, hanzi, pinyin, english, file]) => ({ id, hanzi, pinyin, english, audio: hanzi, imagePath: `assets/illustrated-food/${file}` })),
    review: [
      { pattern: "\u4F60\u559C\u6B22\u5403\u4EC0\u4E48\uFF1F", pinyin: "n\u01D0 x\u01D0 huan ch\u012B sh\xE9n me?", english: "What do you like to eat?", example: "Use this question to ask about a favorite food." },
      { pattern: "\u559C\u6B22\u5403 / \u4E0D\u559C\u6B22\u5403", pinyin: "x\u01D0 huan ch\u012B / b\xF9 x\u01D0 huan ch\u012B", english: "like to eat / do not like to eat", example: "\u6211\u559C\u6B22\u5403\u62AB\u8428\u3002\u6211\u4E0D\u559C\u6B22\u5403\u897F\u5170\u82B1\u3002" }
    ]
  };

  // src/features/food/meals-feelings.js
  var mealsFeelingsTopic = {
    id: "meals-feelings",
    title: "Meals & Feelings",
    summary: "Talk about lunch and say when you are hungry or thirsty.",
    progressLabel: "4A Lessons 5 and 7",
    iconText: "\u5348\u996D",
    iconColor: "#c48d46",
    focus: { hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002", pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza.", audio: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\u5403\u4E86\u62AB\u8428" },
    interactiveScene: "meals-feelings",
    parentGuide: "Use lunch or snack time to ask whether your child is hungry or thirsty, then say what they eat or drink.",
    cultureGuide: "Meals and feelings connect simple food words to a useful everyday situation.",
    activities: ["Play scenes", "Talk about lunch", "Listen and choose", "Build a sentence"],
    steps: [
      { book: "4A", lesson: 5, title: "My lunch", note: "Say what you eat and drink for lunch." },
      { book: "4A", lesson: 7, title: "I'm hungry", note: "Say when you are hungry or thirsty." }
    ]
  };
  var mealsFeelingsTopicData = {
    practiceSummary: "Match the first line of each food conversation to its reply.",
    sceneGroups: [
      {
        id: "lunch",
        label: "",
        items: [
          {
            id: "lunch",
            label: "Lunch",
            hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002",
            pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.",
            english: "For lunch, I drank milk and ate pizza.",
            audio: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\u5403\u4E86\u62AB\u8428",
            imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp"
          },
          {
            id: "cola-water",
            label: "No Coke",
            hanzi: "\u6211\u8981\u559D\u53EF\u4E50\u3002\u6CA1\u6709\u53EF\u4E50\uFF0C\u4F60\u53EF\u4EE5\u559D\u6C34\u3002",
            pinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8. m\xE9i y\u01D2u k\u011B l\xE8, n\u01D0 k\u011B y\u01D0 h\u0113 shu\u01D0.",
            english: "I want to drink Coke. There is no Coke. You can drink water.",
            audio: "\u6211\u8981\u559D\u53EF\u4E50\u6CA1\u6709\u53EF\u4E50\u4F60\u53EF\u4EE5\u559D\u6C34",
            imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp"
          }
        ]
      },
      {
        id: "feelings",
        label: "Food Feelings",
        items: [
          { id: "hungry", label: "Hungry", hanzi: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002", pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice.", audio: "\u6211\u997F\u4E86\u6211\u8981\u5403\u7092\u996D", imagePath: "assets/illustrated-food-feelings/hungry.webp" },
          { id: "thirsty", label: "Thirsty", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water.", audio: "\u6211\u6E34\u4E86\u6211\u8981\u559D\u6C34", imagePath: "assets/illustrated-food-feelings/thirsty.webp" },
          { id: "delicious", label: "Delicious", hanzi: "\u997A\u5B50\u597D\u5403\u3002", pinyin: "ji\u01CEo zi h\u01CEo ch\u012B.", english: "Dumplings are delicious.", audio: "\u997A\u5B50\u597D\u5403", imagePath: "assets/illustrated-food-feelings/delicious.webp" },
          { id: "full", label: "Full", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more.", audio: "\u5988\u5988\u6211\u9971\u4E86\u4E0D\u5403\u4E86", imagePath: "assets/illustrated-food-feelings/full.webp" }
        ]
      }
    ],
    wordGroups: [
      { id: "feelings", hanzi: "\u98DF\u7269\u611F\u89C9", english: "Food Feelings", items: [["hungry", "\u997F", "\xE8", "hungry", "assets/illustrated-food-feelings/hungry.webp"], ["thirsty", "\u6E34", "k\u011B", "thirsty", "assets/illustrated-food-feelings/thirsty.webp"], ["want", "\u8981", "y\xE0o", "want", "assets/illustrated-food-feelings/want-eat-fried-rice-landscape.webp"], ["delicious", "\u597D\u5403", "h\u01CEo ch\u012B", "delicious", "assets/illustrated-food-feelings/delicious.webp"], ["full", "\u9971", "b\u01CEo", "full", "assets/illustrated-food-feelings/full.webp"]] }
    ],
    practiceItems: [
      { id: "ask-lunch", hanzi: "\u4F60\u5348\u996D\u5403\u4EC0\u4E48\uFF1F", pinyin: "n\u01D0 w\u01D4 f\xE0n ch\u012B sh\xE9n me?", english: "What do you have for lunch?", audio: "\u4F60\u5348\u996D\u5403\u4EC0\u4E48" },
      { id: "lunch-answer", hanzi: "\u4E09\u660E\u6CBB\u548C\u679C\u6C41\u3002", pinyin: "s\u0101n m\xEDng zh\xEC h\xE9 gu\u01D2 zh\u012B.", english: "Sandwiches and juice.", audio: "\u4E09\u660E\u6CBB\u548C\u679C\u6C41" },
      { id: "can-eat-chocolate", hanzi: "\u6211\u53EF\u4EE5\u5403\u5DE7\u514B\u529B\u5417\uFF1F", pinyin: "w\u01D2 k\u011B y\u01D0 ch\u012B qi\u01CEo k\xE8 l\xEC ma?", english: "May I eat chocolate?", audio: "\u6211\u53EF\u4EE5\u5403\u5DE7\u514B\u529B\u5417" },
      { id: "not-now", hanzi: "\u4E0D\u884C\uFF0C\u73B0\u5728\u5403\u996D\u3002", pinyin: "b\xF9 x\xEDng, xi\xE0n z\xE0i ch\u012B f\xE0n.", english: "No, it is time to eat now.", audio: "\u4E0D\u884C\u73B0\u5728\u5403\u996D" },
      { id: "no-hotdog", hanzi: "\u5BF9\u4E0D\u8D77\uFF0C\u6CA1\u6709\u70ED\u72D7\u3002", pinyin: "du\xEC bu q\u01D0, m\xE9i y\u01D2u r\xE8 g\u01D2u.", english: "Sorry, there are no hot dogs.", audio: "\u5BF9\u4E0D\u8D77\u6CA1\u6709\u70ED\u72D7" },
      { id: "no-cola-water", hanzi: "\u6CA1\u6709\u53EF\u4E50\uFF0C\u4F60\u53EF\u4EE5\u559D\u6C34\u3002", pinyin: "m\xE9i y\u01D2u k\u011B l\xE8, n\u01D0 k\u011B y\u01D0 h\u0113 shu\u01D0.", english: "There is no Coke. You can drink water.", audio: "\u6CA1\u6709\u53EF\u4E50\u4F60\u53EF\u4EE5\u559D\u6C34" }
    ],
    conversationPairs: [
      { id: "thirsty-coke", hanzi: "\u6211\u6E34\u4E86\u3002", pinyin: "w\u01D2 k\u011B le.", reply: "\u6211\u8981\u559D\u53EF\u4E50\u3002", replyPinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8.", audio: "\u6211\u6E34\u4E86" },
      { id: "hungry-hotdog", hanzi: "\u6211\u997F\u4E86\u3002", pinyin: "w\u01D2 \xE8 le.", reply: "\u6211\u8981\u5403\u70ED\u72D7\u3002", replyPinyin: "w\u01D2 y\xE0o ch\u012B r\xE8 g\u01D2u.", audio: "\u6211\u997F\u4E86" },
      { id: "full-stop", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le.", reply: "\u597D\uFF0C\u4E0D\u5403\u4E86\u3002", replyPinyin: "h\u01CEo, b\xF9 ch\u012B le.", audio: "\u5988\u5988\u6211\u9971\u4E86" },
      { id: "lunch-sandwich", hanzi: "\u4F60\u5348\u996D\u5403\u4EC0\u4E48\uFF1F", pinyin: "n\u01D0 w\u01D4 f\xE0n ch\u012B sh\xE9n me?", reply: "\u4E09\u660E\u6CBB\u548C\u679C\u6C41\u3002", replyPinyin: "s\u0101n m\xEDng zh\xEC h\xE9 gu\u01D2 zh\u012B.", audio: "\u4F60\u5348\u996D\u5403\u4EC0\u4E48" },
      { id: "chocolate-mealtime", hanzi: "\u6211\u53EF\u4EE5\u5403\u5DE7\u514B\u529B\u5417\uFF1F", pinyin: "w\u01D2 k\u011B y\u01D0 ch\u012B qi\u01CEo k\xE8 l\xEC ma?", reply: "\u4E0D\u884C\uFF0C\u73B0\u5728\u5403\u996D\u3002", replyPinyin: "b\xF9 x\xEDng, xi\xE0n z\xE0i ch\u012B f\xE0n.", audio: "\u6211\u53EF\u4EE5\u5403\u5DE7\u514B\u529B\u5417" },
      { id: "no-coke-water", hanzi: "\u6CA1\u6709\u53EF\u4E50\u3002", pinyin: "m\xE9i y\u01D2u k\u011B l\xE8.", reply: "\u4F60\u53EF\u4EE5\u559D\u6C34\u3002", replyPinyin: "n\u01D0 k\u011B y\u01D0 h\u0113 shu\u01D0.", audio: "\u6CA1\u6709\u53EF\u4E50" }
    ],
    pictureChoices: [
      {
        id: "lunch-picture",
        imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp",
        imageAlt: "Anan eating lunch.",
        correctId: "lunch-sentence",
        options: [
          { id: "lunch-sentence", hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002", pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza." },
          { id: "lunch-coke", hanzi: "\u6211\u8981\u559D\u53EF\u4E50\u3002", pinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8.", english: "I want to drink Coke." },
          { id: "lunch-hungry", hanzi: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002", pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice." },
          { id: "lunch-full", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "no-coke-picture",
        imagePath: "assets/illustrated-meals/anan-mom-fridge-cola-water.webp",
        imageAlt: "Anan looking for Coke while Mom offers water.",
        correctId: "no-coke-sentence",
        options: [
          { id: "no-coke-sentence", hanzi: "\u6211\u8981\u559D\u53EF\u4E50\u3002\u6CA1\u6709\u53EF\u4E50\uFF0C\u4F60\u53EF\u4EE5\u559D\u6C34\u3002", pinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8. m\xE9i y\u01D2u k\u011B l\xE8, n\u01D0 k\u011B y\u01D0 h\u0113 shu\u01D0.", english: "I want to drink Coke. There is no Coke. You can drink water." },
          { id: "no-coke-lunch", hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002", pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza." },
          { id: "no-coke-water", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
          { id: "no-coke-sandwich", hanzi: "\u6211\u559C\u6B22\u5403\u4E09\u660E\u6CBB\u3002", pinyin: "w\u01D2 x\u01D0 huan ch\u012B s\u0101n m\xEDng zh\xEC.", english: "I like to eat sandwiches." }
        ]
      },
      {
        id: "hungry-picture",
        imagePath: "assets/illustrated-food-feelings/hungry.webp",
        imageAlt: "A child who is hungry and wants fried rice.",
        correctId: "hungry-sentence",
        options: [
          { id: "hungry-sentence", hanzi: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002", pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice." },
          { id: "hungry-thirsty", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
          { id: "hungry-coke", hanzi: "\u6211\u8981\u559D\u53EF\u4E50\u3002", pinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8.", english: "I want to drink Coke." },
          { id: "hungry-full", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "thirsty-picture",
        imagePath: "assets/illustrated-food-feelings/thirsty.webp",
        imageAlt: "A child who is thirsty and wants water.",
        correctId: "thirsty-sentence",
        options: [
          { id: "thirsty-sentence", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
          { id: "thirsty-hungry", hanzi: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002", pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice." },
          { id: "thirsty-lunch", hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002", pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza." },
          { id: "thirsty-full", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "delicious-picture",
        imagePath: "assets/illustrated-food-feelings/delicious.webp",
        imageAlt: "Dumplings that taste delicious.",
        correctId: "delicious-sentence",
        options: [
          { id: "delicious-sentence", hanzi: "\u997A\u5B50\u597D\u5403\u3002", pinyin: "ji\u01CEo zi h\u01CEo ch\u012B.", english: "Dumplings are delicious." },
          { id: "delicious-thirsty", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
          { id: "delicious-coke", hanzi: "\u6211\u8981\u559D\u53EF\u4E50\u3002", pinyin: "w\u01D2 y\xE0o h\u0113 k\u011B l\xE8.", english: "I want to drink Coke." },
          { id: "delicious-full", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." }
        ]
      },
      {
        id: "full-picture",
        imagePath: "assets/illustrated-food-feelings/full.webp",
        imageAlt: "A child who is full after eating.",
        correctId: "full-sentence",
        options: [
          { id: "full-sentence", hanzi: "\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." },
          { id: "full-hungry", hanzi: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002", pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice." },
          { id: "full-thirsty", hanzi: "\u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
          { id: "full-lunch", hanzi: "\u6211\u5348\u996D\u559D\u4E86\u725B\u5976\uFF0C\u5403\u4E86\u62AB\u8428\u3002", pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza." }
        ]
      }
    ],
    review: [
      { pattern: "\u997F\u4E86 / \u6E34\u4E86", pinyin: "\xE8 le / k\u011B le", english: "hungry / thirsty", example: "\u6211\u997F\u4E86\uFF0C\u6211\u8981\u5403\u7092\u996D\u3002 \u6211\u6E34\u4E86\uFF0C\u6211\u8981\u559D\u6C34\u3002", examplePinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n. w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", exampleEnglish: "When you are hungry, eat. When you are thirsty, drink." },
      { pattern: "\u4F60\u5348\u996D\u5403\u4EC0\u4E48\uFF1F", pinyin: "n\u01D0 w\u01D4 f\xE0n ch\u012B sh\xE9n me?", english: "What do you have for lunch?", example: "\u6211\u5348\u996D\u5403\u2026\u2026\uFF0C\u559D\u2026\u2026", examplePinyin: "w\u01D2 w\u01D4 f\xE0n ch\u012B..., h\u0113...", exampleEnglish: "For lunch, I eat ... and drink ..." },
      { pattern: "\u8981 + \u5403 / \u559D + \u98DF\u7269", pinyin: "y\xE0o + ch\u012B / h\u0113 + sh\xED w\xF9", english: "want to eat / drink + food", example: "\u6211\u8981\u5403\u7092\u996D\u3002\u6211\u8981\u559D\u53EF\u4E50\u3002", examplePinyin: "w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n. w\u01D2 y\xE0o h\u0113 k\u011B l\xE8.", exampleEnglish: "I want to eat fried rice. I want to drink Coke." },
      { pattern: "\u597D\u5403 / \u9971\u4E86", pinyin: "h\u01CEo ch\u012B / b\u01CEo le", english: "delicious / full", example: "\u997A\u5B50\u597D\u5403\u3002\u5988\u5988\uFF0C\u6211\u9971\u4E86\uFF0C\u4E0D\u5403\u4E86\u3002", examplePinyin: "ji\u01CEo zi h\u01CEo ch\u012B. m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", exampleEnglish: "Dumplings are delicious. Mom, I am full. I do not want to eat any more." },
      { pattern: "\u6CA1\u6709\u2026\u2026\uFF0C\u4F60\u53EF\u4EE5\u2026\u2026", pinyin: "m\xE9i y\u01D2u..., n\u01D0 k\u011B y\u01D0...", english: "There is no ...; you can ...", example: "\u6CA1\u6709\u53EF\u4E50\u3002\u4F60\u53EF\u4EE5\u559D\u6C34\u3002", examplePinyin: "m\xE9i y\u01D2u k\u011B l\xE8. n\u01D0 k\u011B y\u01D0 h\u0113 shu\u01D0.", exampleEnglish: "There is no Coke. You can drink water." }
    ]
  };
  var mealsFeelingsSentenceBuilds = [
    { id: "lunch", imagePath: "assets/illustrated-meals/anan-eating-school-lunch.webp", target: ["\u6211", "\u5348\u996D", "\u559D\u4E86", "\u725B\u5976", "\u5403\u4E86", "\u62AB\u8428"], distractors: ["\u8981", "\u6C34", "\u5B66\u6821"], pinyin: "w\u01D2 w\u01D4 f\xE0n h\u0113 le ni\xFA n\u01CEi, ch\u012B le p\u012B s\xE0.", english: "For lunch, I drank milk and ate pizza." },
    { id: "hungry", imagePath: "assets/illustrated-food-feelings/hungry.webp", target: ["\u6211", "\u997F", "\u4E86", "\u6211", "\u8981", "\u5403", "\u7092\u996D"], distractors: ["\u559D", "\u6C34", "\u5B66\u6821"], pinyin: "w\u01D2 \xE8 le, w\u01D2 y\xE0o ch\u012B ch\u01CEo f\xE0n.", english: "I am hungry. I want to eat fried rice." },
    { id: "thirsty", imagePath: "assets/illustrated-food-feelings/thirsty.webp", target: ["\u6211", "\u6E34", "\u4E86", "\u6211", "\u8981", "\u559D", "\u6C34"], distractors: ["\u5403", "\u7092\u996D", "\u5B66\u6821"], pinyin: "w\u01D2 k\u011B le, w\u01D2 y\xE0o h\u0113 shu\u01D0.", english: "I am thirsty. I want to drink water." },
    { id: "delicious", imagePath: "assets/illustrated-food-feelings/delicious.webp", target: ["\u997A\u5B50", "\u597D\u5403"], distractors: ["\u53EF\u4E50", "\u5B66\u6821", "\u6559\u5BA4"], pinyin: "ji\u01CEo zi h\u01CEo ch\u012B.", english: "Dumplings are delicious." },
    { id: "full", imagePath: "assets/illustrated-food-feelings/full.webp", target: ["\u5988\u5988", "\u6211", "\u9971", "\u4E86", "\u4E0D\u5403", "\u4E86"], distractors: ["\u6E34", "\u8981", "\u5B66\u6821"], pinyin: "m\u0101 ma, w\u01D2 b\u01CEo le, b\xF9 ch\u012B le.", english: "Mom, I am full. I do not want to eat any more." }
  ];

  // src/features/foundations/introductions.js
  var introductionsTopic = {
    id: "introductions",
    title: "Names & Introductions",
    summary: "Meet a new friend, ask a name, and answer with a warm first self-introduction.",
    progressLabel: "1A to 3A",
    iconText: "\u6211\u53EB",
    iconColor: "#7e8f63",
    iconAccent: "#d9e49a",
    iconTheme: "introductions",
    focus: {
      hanzi: "\u6211\u53EB\u2026\u2026",
      pinyin: "w\u01D2 ji\xE0o...",
      english: "My name is...",
      audio: "\u6211\u53EB"
    },
    focusItems: [
      { id: "ask-name", hanzi: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F", pinyin: "n\u01D0 ji\xE0o sh\xE9n me m\xEDng zi?", english: "What is your name?", audio: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57" },
      { id: "my-name", hanzi: "\u6211\u53EB\u2026\u2026", pinyin: "w\u01D2 ji\xE0o...", english: "My name is...", audio: "\u6211\u53EB" },
      { id: "me-word", hanzi: "\u6211", pinyin: "w\u01D2", english: "I; me", audio: "\u6211" },
      { id: "call-word", hanzi: "\u53EB", pinyin: "ji\xE0o", english: "to be called", audio: "\u53EB" },
      { id: "what-word", hanzi: "\u4EC0\u4E48", pinyin: "sh\xE9n me", english: "what", audio: "\u4EC0\u4E48" },
      { id: "name-word", hanzi: "\u540D\u5B57", pinyin: "m\xEDng zi", english: "name", audio: "\u540D\u5B57" }
    ],
    interactiveScene: "introductions-conversation",
    parentGuide: "Practice the whole mini-conversation first: \u4F60\u597D, \u4F60\u53EB\u4EC0\u4E48\u540D\u5B57? \u6211\u53EB... Then pause after \u6211\u53EB and let the child fill in their own name.",
    cultureGuide: "Children connect strongly to names and faces, so recurring kid characters help this lesson feel social instead of abstract.",
    activities: ["Tap to hear", "Play the conversation", "Say your own name", "Build the sentence"],
    steps: [
      { book: "1A", lesson: 6, title: "What's your name?", note: "Learn a first self-introduction pattern." },
      { book: "2A", lesson: 3, title: "Good friends", note: "Use names and social language in a wider context." }
    ]
  };
  var introductionsPractice = [
    {
      id: "intro-scene-1",
      number: "1",
      prompt: "Meet a new friend and ask their name",
      imagePath: "assets/introductions/introductions-scene-1.webp",
      imageAlt: "Two children meeting and introducing themselves",
      cast: ["lele", "anan"],
      lines: [
        { speakerId: "luna", hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
        { speakerId: "sophie", hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
        { speakerId: "luna", hanzi: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F", pinyin: "n\u01D0 ji\xE0o sh\xE9n me m\xEDng zi?", english: "What is your name?", audio: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57" },
        { speakerId: "sophie", hanzi: "\u6211\u53EB\u82CF\u83F2\u3002", pinyin: "w\u01D2 ji\xE0o S\u016B f\u0113i.", english: "My name is Sophie.", audio: "\u6211\u53EB\u82CF\u83F2" }
      ]
    },
    {
      id: "intro-scene-2",
      number: "2",
      prompt: "Say your own name clearly, then greet back",
      imagePath: "assets/introductions/introductions-scene-2.webp",
      imageAlt: "Two children talking in a classroom",
      cast: ["tiantian", "sisi"],
      lines: [
        { speakerId: "sisi", hanzi: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F", pinyin: "n\u01D0 ji\xE0o sh\xE9n me m\xEDng zi?", english: "What is your name?", audio: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57" },
        { speakerId: "lele", hanzi: "\u6211\u53EB\u4E50\u4E50\u3002", pinyin: "w\u01D2 ji\xE0o L\xE8 le.", english: "My name is Lele.", audio: "\u6211\u53EB\u4E50\u4E50" },
        { speakerId: "sisi", hanzi: "\u4F60\u597D\uFF0C\u4E50\u4E50\uFF01", pinyin: "n\u01D0 h\u01CEo, L\xE8 le!", english: "Hello, Lele!", audio: "\u4F60\u597D\u4E50\u4E50" }
      ]
    },
    {
      id: "intro-scene-3",
      number: "3",
      prompt: "Two children trade names after saying hello",
      imagePath: "assets/introductions/introductions-scene-3.webp",
      imageAlt: "Two friends greeting each other",
      cast: ["sisi", "lele"],
      lines: [
        { speakerId: "yangyang", hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
        { speakerId: "jaden", hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
        { speakerId: "yangyang", hanzi: "\u6211\u53EB\u9633\u9633\u3002", pinyin: "w\u01D2 ji\xE0o Y\xE1ng y\xE1ng.", english: "My name is Yangyang.", audio: "\u6211\u53EB\u9633\u9633" },
        { speakerId: "jaden", hanzi: "\u6211\u53EB\u6770\u767B\u3002", pinyin: "w\u01D2 ji\xE0o Ji\xE9 d\u0113ng.", english: "My name is Jaden.", audio: "\u6211\u53EB\u6770\u767B" }
      ]
    }
  ];
  var introductionsGamePrompts = [
    {
      id: "intro-game-anan",
      speakerId: "anan",
      sourceItemId: "my-name",
      hanzi: "\u6211\u53EB\u5B89\u5B89\u3002",
      pinyin: "w\u01D2 ji\xE0o \u0100n an.",
      english: "My name is Anan.",
      audio: "\u6211\u53EB\u5B89\u5B89"
    },
    { id: "intro-game-tiantian", speakerId: "tiantian", sourceItemId: "my-name", hanzi: "\u6211\u53EB\u5929\u5929\u3002", pinyin: "w\u01D2 ji\xE0o Ti\u0101n ti\u0101n.", english: "My name is Tiantian.", audio: "\u6211\u53EB\u5929\u5929" },
    { id: "intro-game-sisi", speakerId: "sisi", sourceItemId: "my-name", hanzi: "\u6211\u53EB\u601D\u601D\u3002", pinyin: "w\u01D2 ji\xE0o S\u012B si.", english: "My name is Sisi.", audio: "\u6211\u53EB\u601D\u601D" },
    { id: "intro-game-lele", speakerId: "lele", sourceItemId: "my-name", hanzi: "\u6211\u53EB\u4E50\u4E50\u3002", pinyin: "w\u01D2 ji\xE0o L\xE8 le.", english: "My name is Lele.", audio: "\u6211\u53EB\u4E50\u4E50" }
  ];
  var introductionsBuildPhrases = [
    {
      id: "build-ask-name",
      sourceItemId: "ask-name",
      targetHanzi: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F",
      prompt: "Build: What is your name?",
      english: "What is your name?",
      audio: "\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57",
      tokens: ["\u4F60", "\u53EB", "\u4EC0\u4E48", "\u540D\u5B57"]
    },
    {
      id: "build-my-name",
      sourceItemId: "my-name",
      targetHanzi: "\u6211\u53EB\u2026\u2026",
      prompt: "Build: My name is...",
      english: "My name is...",
      audio: "\u6211\u53EB",
      tokens: ["\u6211", "\u53EB"]
    }
  ];

  // src/features/foundations/introductions-controller.js
  function createIntroductionsController({
    state: state2,
    introductionsGameSpeakerIds: introductionsGameSpeakerIds2,
    introductionsGamePrompts: introductionsGamePrompts2,
    introductionsBuildPhrases: introductionsBuildPhrases2,
    introductionsPractice: introductionsPractice2,
    illustratedKids: illustratedKids2,
    topicById: topicById2,
    shuffleArray: shuffleArray2,
    speak: speak2,
    speakSceneLines: speakSceneLines2,
    currentTopic: currentTopic2,
    currentFocusItem: currentFocusItem2,
    currentBook: currentBook2,
    currentLesson: currentLesson2,
    renderActivityPanel: renderActivityPanel2,
    renderFocusDisplay: renderFocusDisplay2,
    renderFocusExplorer: renderFocusExplorer2,
    renderFocusStatus: renderFocusStatus2,
    elements
  }) {
    const { focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = elements;
    function introductionsPromptById2(promptId) {
      return introductionsGamePrompts2.find((entry) => entry.id === promptId) ?? null;
    }
    function introductionsGameKids2() {
      return introductionsGameSpeakerIds2.map((id) => illustratedKids2[id]).filter(Boolean);
    }
    function introductionsSelfIntroItemForKid2(kidId) {
      const introductionsTopic2 = topicById2("introductions");
      const itemIdByKidId = { anan: "my-name-anan", tiantian: "my-name-tiantian", sisi: "my-name-sisi", lele: "my-name-lele" };
      return introductionsTopic2?.focusItems.find((item) => item.id === itemIdByKidId[kidId]) ?? null;
    }
    function resetIntroductionsChallenge2(options = {}) {
      if (!introductionsGamePrompts2.length || !introductionsGameSpeakerIds2.length) return;
      const prompt = introductionsGamePrompts2[Math.floor(Math.random() * introductionsGamePrompts2.length)];
      state2.introductionsChallengeAnswerId = prompt.speakerId;
      state2.introductionsChallengePromptId = prompt.id;
      state2.introductionsChallengeOptionIds = shuffleArray2([...introductionsGameSpeakerIds2]);
      state2.lastIntroductionsFeedback = options.feedback ?? "";
    }
    function ensureIntroductionsChallenge2() {
      if (!state2.introductionsChallengeAnswerId || !state2.introductionsChallengeOptionIds.length) resetIntroductionsChallenge2();
    }
    function handleIntroductionsChallengePlay2() {
      ensureIntroductionsChallenge2();
      const prompt = introductionsPromptById2(state2.introductionsChallengePromptId);
      if (!prompt) return;
      if (state2.tapAudioEnabled) speak2(prompt.audio, 0.78);
      state2.lastIntroductionsFeedback = "Listen again, then tap the child whose name you heard.";
      renderActivityPanel2(currentTopic2());
    }
    function handleIntroductionsChallengeGuess2(kidId) {
      ensureIntroductionsChallenge2();
      const answerPrompt = introductionsPromptById2(state2.introductionsChallengePromptId);
      const pickedKid = illustratedKids2[kidId];
      const answerKid = illustratedKids2[state2.introductionsChallengeAnswerId];
      if (!answerPrompt || !pickedKid || !answerKid) return;
      if (kidId === answerPrompt.speakerId) {
        state2.selectedFocusItemId = answerPrompt.sourceItemId;
        if (state2.tapAudioEnabled) speak2(answerPrompt.audio, 0.78);
        state2.lastIntroductionsFeedback = `Correct! ${answerKid.hanziName} said ${answerPrompt.hanzi}`;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        window.setTimeout(() => {
          resetIntroductionsChallenge2();
          renderActivityPanel2(currentTopic2());
        }, 650);
        return;
      }
      state2.lastIntroductionsFeedback = `Try again. You picked ${pickedKid.hanziName}, but the voice was ${answerKid.hanziName}.`;
      renderActivityPanel2(currentTopic2());
    }
    function introductionsBuildTarget2() {
      return introductionsBuildPhrases2.find((entry) => entry.id === state2.introductionsBuildTargetId) ?? introductionsBuildPhrases2[0];
    }
    function resetIntroductionsBuilder2(options = {}) {
      const target = introductionsBuildPhrases2[Math.floor(Math.random() * introductionsBuildPhrases2.length)];
      state2.introductionsBuildTargetId = target.id;
      state2.introductionsBuildAvailableTokens = shuffleArray2(target.tokens);
      state2.introductionsBuildSelectedTokens = [];
      state2.lastIntroductionsFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
    }
    function ensureIntroductionsBuilder2() {
      const target = introductionsBuildTarget2();
      if (!state2.introductionsBuildTargetId || !state2.introductionsBuildAvailableTokens.length && !state2.introductionsBuildSelectedTokens.length || !target) resetIntroductionsBuilder2();
    }
    function handleIntroductionsBuildToken2(tokenIndex) {
      const target = introductionsBuildTarget2();
      const token = state2.introductionsBuildAvailableTokens[tokenIndex];
      if (!target || !token) return;
      state2.introductionsBuildSelectedTokens = [...state2.introductionsBuildSelectedTokens, token];
      state2.introductionsBuildAvailableTokens = state2.introductionsBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
      if (state2.introductionsBuildSelectedTokens.length === target.tokens.length) {
        const correct = target.tokens.every((entry, index) => state2.introductionsBuildSelectedTokens[index] === entry);
        if (correct) {
          if (state2.tapAudioEnabled) speak2(target.audio, 0.78);
          state2.lastIntroductionsFeedback = `Correct! ${target.targetHanzi}`;
          if (target.sourceItemId) {
            state2.selectedFocusItemId = target.sourceItemId;
            renderFocusDisplay2(currentFocusItem2());
            renderFocusExplorer2();
            renderFocusStatus2();
          }
        } else {
          state2.lastIntroductionsFeedback = "Not quite. Try building the sentence again.";
        }
      }
      renderActivityPanel2(currentTopic2());
    }
    function handleIntroductionsBuildClear2() {
      const target = introductionsBuildTarget2();
      if (!target) return;
      state2.introductionsBuildAvailableTokens = shuffleArray2([...state2.introductionsBuildAvailableTokens, ...state2.introductionsBuildSelectedTokens]);
      state2.introductionsBuildSelectedTokens = [];
      state2.lastIntroductionsFeedback = "Try building the sentence again.";
      renderActivityPanel2(currentTopic2());
    }
    function renderIntroductionsExplorer2() {
      focusExplorer2.innerHTML = `<div class="numbers-board"><div class="numbers-stage-card"><p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p><h4>Book theme: asking and saying names</h4><p>This lesson mirrors Book 1A Lesson 6: say hello, ask a name, answer with \u6211\u53EB..., and repeat the new friend's name.</p></div><div class="greetings-practice-grid">${introductionsPractice2.map((exchange) => `<section class="greetings-exchange"><div class="greetings-exchange-top"><div><p class="body-match-kicker">Scene ${exchange.number}</p><p class="greetings-exchange-prompt">${exchange.prompt}</p></div><button class="small-button is-action-button" type="button" data-intro-play-all="${exchange.id}">Play scene</button></div><div class="greetings-scene-layout introductions-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" /></div><div class="greetings-line-stack">${exchange.lines.map((line) => `<article class="greetings-line-card intro-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div></section>`).join("")}</div></div>`;
      focusExplorer2.querySelectorAll("[data-intro-play-all]").forEach((button) => {
        button.addEventListener("click", () => {
          const exchange = introductionsPractice2.find((entry) => entry.id === button.dataset.introPlayAll);
          if (!exchange || !state2.tapAudioEnabled) return;
          speakSceneLines2(exchange.lines);
          focusStatus2.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
        });
      });
    }
    return { introductionsPromptById: introductionsPromptById2, introductionsGameKids: introductionsGameKids2, introductionsSelfIntroItemForKid: introductionsSelfIntroItemForKid2, resetIntroductionsChallenge: resetIntroductionsChallenge2, ensureIntroductionsChallenge: ensureIntroductionsChallenge2, handleIntroductionsChallengePlay: handleIntroductionsChallengePlay2, handleIntroductionsChallengeGuess: handleIntroductionsChallengeGuess2, introductionsBuildTarget: introductionsBuildTarget2, resetIntroductionsBuilder: resetIntroductionsBuilder2, ensureIntroductionsBuilder: ensureIntroductionsBuilder2, handleIntroductionsBuildToken: handleIntroductionsBuildToken2, handleIntroductionsBuildClear: handleIntroductionsBuildClear2, renderIntroductionsExplorer: renderIntroductionsExplorer2 };
  }

  // src/features/foundations/age.js
  var ageTopic = {
    id: "age",
    title: "Age",
    summary: "A first identity lesson: say age, then say what grade you are in.",
    progressLabel: "1A to 3A",
    iconText: "\u4E94\u5C81",
    iconColor: "#7998a5",
    iconAccent: "#f3d88a",
    iconTheme: "birthday",
    focus: {
      hanzi: "\u6211\u4E94\u5C81\u3002",
      pinyin: "w\u01D2 w\u01D4 su\xEC.",
      english: "I am five years old.",
      audio: "\u6211\u4E94\u5C81"
    },
    focusItems: [
      { id: "ask-age", hanzi: "\u4F60\u51E0\u5C81\uFF1F", pinyin: "n\u01D0 j\u01D0 su\xEC?", english: "How old are you?", audio: "\u4F60\u51E0\u5C81" },
      { id: "age-five", hanzi: "\u6211\u4E94\u5C81\u3002", pinyin: "w\u01D2 w\u01D4 su\xEC.", english: "I am five years old.", audio: "\u6211\u4E94\u5C81" },
      { id: "age-six", hanzi: "\u6211\u516D\u5C81\u3002", pinyin: "w\u01D2 li\xF9 su\xEC.", english: "I am six years old.", audio: "\u6211\u516D\u5C81" },
      { id: "age-seven", hanzi: "\u6211\u4E03\u5C81\u3002", pinyin: "w\u01D2 q\u012B su\xEC.", english: "I am seven years old.", audio: "\u6211\u4E03\u5C81" },
      { id: "ask-grade", hanzi: "\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F", pinyin: "n\u01D0 sh\xE0ng j\u01D0 ni\xE1n j\xED?", english: "What grade are you in?", audio: "\u4F60\u4E0A\u51E0\u5E74\u7EA7" },
      { id: "grade-one", hanzi: "\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002", pinyin: "w\u01D2 sh\xE0ng y\xEC ni\xE1n j\xED.", english: "I am in first grade.", audio: "\u6211\u4E0A\u4E00\u5E74\u7EA7" },
      { id: "me-age-word", hanzi: "\u6211", pinyin: "w\u01D2", english: "I; me", audio: "\u6211" },
      { id: "how-many-age-word", hanzi: "\u51E0", pinyin: "j\u01D0", english: "how many", audio: "\u51E0" },
      { id: "age-word", hanzi: "\u5C81", pinyin: "su\xEC", english: "years old", audio: "\u5C81" },
      { id: "attend-word", hanzi: "\u4E0A", pinyin: "sh\xE0ng", english: "to attend; to be in", audio: "\u4E0A" },
      { id: "grade-word", hanzi: "\u5E74\u7EA7", pinyin: "ni\xE1n j\xED", english: "grade; school year", audio: "\u5E74\u7EA7" }
    ],
    interactiveScene: "age-conversation",
    parentGuide: "Practice with the child's real age and real school year. Start with the whole exchange, then pause after \u6211 and let the child fill in the number or grade.",
    cultureGuide: "This lesson often works as an early identity bundle: name, age, and school year all come together in one short getting-to-know-you conversation.",
    activities: ["Tap to hear", "Fill in my age", "Say my grade", "Listen and point"],
    steps: [
      { book: "1A", lesson: 7, title: "I'm 5 years old", note: "Learn the first age sentence pattern." },
      { book: "3A", lesson: 3, title: "Happy birthday!", note: "Reconnect age with date and birthday language." }
    ]
  };
  var agePractice = [
    {
      id: "age-scene-2",
      number: "1",
      prompt: "Ask age first, then ask what grade a classmate is in",
      imagePath: "assets/age/age-scene-2.webp",
      imageAlt: "Lele and Noah inside a classroom asking age first and then what grade someone is in",
      lines: [
        { hanzi: "\u4F60\u51E0\u5C81\uFF1F", pinyin: "n\u01D0 j\u01D0 su\xEC?", english: "How old are you?", audio: "\u4F60\u51E0\u5C81" },
        { hanzi: "\u6211\u516D\u5C81\u3002", pinyin: "w\u01D2 li\xF9 su\xEC.", english: "I am six years old.", audio: "\u6211\u516D\u5C81" },
        { hanzi: "\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F", pinyin: "n\u01D0 sh\xE0ng j\u01D0 ni\xE1n j\xED?", english: "What grade are you in?", audio: "\u4F60\u4E0A\u51E0\u5E74\u7EA7" },
        { hanzi: "\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002", pinyin: "w\u01D2 sh\xE0ng y\xEC ni\xE1n j\xED.", english: "I am in first grade.", audio: "\u6211\u4E0A\u4E00\u5E74\u7EA7" }
      ]
    },
    {
      id: "age-scene-3",
      number: "2",
      prompt: "Connect age language to a birthday moment",
      imagePath: "assets/age/age-scene-3.webp",
      imageAlt: "Sisi at a birthday party with seven candles on a cake and friends around the table",
      lines: [
        { hanzi: "\u4F60\u51E0\u5C81\uFF1F", pinyin: "n\u01D0 j\u01D0 su\xEC?", english: "How old are you?", audio: "\u4F60\u51E0\u5C81" },
        { hanzi: "\u6211\u4E03\u5C81\u3002", pinyin: "w\u01D2 q\u012B su\xEC.", english: "I am seven years old.", audio: "\u6211\u4E03\u5C81" }
      ]
    }
  ];
  var ageBuildPhrases = [
    {
      id: "build-ask-age",
      sourceItemId: "ask-age",
      targetHanzi: "\u4F60\u51E0\u5C81\uFF1F",
      prompt: "Build: How old are you?",
      english: "How old are you?",
      audio: "\u4F60\u51E0\u5C81",
      tokens: ["\u4F60", "\u51E0", "\u5C81"]
    },
    {
      id: "build-age-five",
      sourceItemId: "age-five",
      targetHanzi: "\u6211\u4E94\u5C81\u3002",
      prompt: "Build: I am five years old.",
      english: "I am five years old.",
      audio: "\u6211\u4E94\u5C81",
      tokens: ["\u6211", "\u4E94", "\u5C81"]
    },
    {
      id: "build-age-six",
      sourceItemId: "age-six",
      targetHanzi: "\u6211\u516D\u5C81\u3002",
      prompt: "Build: I am six years old.",
      english: "I am six years old.",
      audio: "\u6211\u516D\u5C81",
      tokens: ["\u6211", "\u516D", "\u5C81"]
    },
    {
      id: "build-age-seven",
      sourceItemId: "age-seven",
      targetHanzi: "\u6211\u4E03\u5C81\u3002",
      prompt: "Build: I am seven years old.",
      english: "I am seven years old.",
      audio: "\u6211\u4E03\u5C81",
      tokens: ["\u6211", "\u4E03", "\u5C81"]
    },
    {
      id: "build-ask-grade",
      sourceItemId: "ask-grade",
      targetHanzi: "\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F",
      prompt: "Build: What grade are you in?",
      english: "What grade are you in?",
      audio: "\u4F60\u4E0A\u51E0\u5E74\u7EA7",
      tokens: ["\u4F60", "\u4E0A", "\u51E0", "\u5E74\u7EA7"]
    },
    {
      id: "build-grade-one",
      sourceItemId: "grade-one",
      targetHanzi: "\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002",
      prompt: "Build: I am in first grade.",
      english: "I am in first grade.",
      audio: "\u6211\u4E0A\u4E00\u5E74\u7EA7",
      tokens: ["\u6211", "\u4E0A", "\u4E00", "\u5E74\u7EA7"]
    }
  ];

  // src/features/foundations/age-controller.js
  function createAgeController({ state: state2, ageGameItemIds: ageGameItemIds2, ageBuildPhrases: ageBuildPhrases2, agePractice: agePractice2, topicById: topicById2, shuffleArray: shuffleArray2, speak: speak2, speakSceneLines: speakSceneLines2, currentTopic: currentTopic2, currentFocusItem: currentFocusItem2, currentBook: currentBook2, currentLesson: currentLesson2, renderActivityPanel: renderActivityPanel2, renderFocusDisplay: renderFocusDisplay2, renderFocusExplorer: renderFocusExplorer2, renderFocusStatus: renderFocusStatus2, elements }) {
    const { focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = elements;
    function ageGameItems2() {
      return ageGameItemIds2.map((id) => topicById2("age")?.focusItems.find((item) => item.id === id)).filter(Boolean);
    }
    function resetAgeChallenge2(options = {}) {
      const items = ageGameItems2();
      if (!items.length) return;
      const answer = items[Math.floor(Math.random() * items.length)];
      const distractors = shuffleArray2(items.filter((item) => item.id !== answer.id)).slice(0, Math.min(3, Math.max(0, items.length - 1)));
      state2.ageChallengeAnswerId = answer.id;
      state2.ageChallengePromptId = answer.id;
      state2.ageChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.lastAgeFeedback = options.feedback ?? "";
    }
    function ensureAgeChallenge2() {
      if (!state2.ageChallengeAnswerId || !state2.ageChallengeOptionIds.length) resetAgeChallenge2();
    }
    function handleAgeChallengePlay2() {
      ensureAgeChallenge2();
      const item = ageGameItems2().find((entry) => entry.id === state2.ageChallengePromptId);
      if (!item) return;
      if (state2.tapAudioEnabled) speak2(item.audio, 0.78);
      state2.lastAgeFeedback = `Listen again and find ${item.hanzi}.`;
      renderActivityPanel2(currentTopic2());
    }
    function handleAgeChallengeGuess2(itemId) {
      ensureAgeChallenge2();
      const answer = ageGameItems2().find((entry) => entry.id === state2.ageChallengeAnswerId);
      const picked = ageGameItems2().find((entry) => entry.id === itemId);
      if (!answer || !picked) return;
      if (itemId === answer.id) {
        state2.selectedFocusItemId = answer.id;
        if (state2.tapAudioEnabled) speak2(answer.audio, 0.78);
        state2.lastAgeFeedback = `Correct! ${answer.hanzi} matches the audio.`;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        window.setTimeout(() => {
          resetAgeChallenge2();
          renderActivityPanel2(currentTopic2());
        }, 650);
        return;
      }
      state2.lastAgeFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
      renderActivityPanel2(currentTopic2());
    }
    function ageBuildTarget2() {
      return ageBuildPhrases2.find((entry) => entry.id === state2.ageBuildTargetId) ?? ageBuildPhrases2[0];
    }
    function resetAgeBuilder2(options = {}) {
      const target = ageBuildPhrases2[Math.floor(Math.random() * ageBuildPhrases2.length)];
      state2.ageBuildTargetId = target.id;
      state2.ageBuildAvailableTokens = shuffleArray2(target.tokens);
      state2.ageBuildSelectedTokens = [];
      state2.lastAgeFeedback = options.feedback ?? "Build the sentence by tapping the word pieces in order.";
    }
    function ensureAgeBuilder2() {
      const target = ageBuildTarget2();
      if (!state2.ageBuildTargetId || !state2.ageBuildAvailableTokens.length && !state2.ageBuildSelectedTokens.length || !target) resetAgeBuilder2();
    }
    function handleAgeBuildToken2(tokenIndex) {
      const target = ageBuildTarget2();
      const token = state2.ageBuildAvailableTokens[tokenIndex];
      if (!target || !token) return;
      state2.ageBuildSelectedTokens = [...state2.ageBuildSelectedTokens, token];
      state2.ageBuildAvailableTokens = state2.ageBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
      if (state2.ageBuildSelectedTokens.length === target.tokens.length) {
        const correct = target.tokens.every((entry, index) => state2.ageBuildSelectedTokens[index] === entry);
        if (correct) {
          if (state2.tapAudioEnabled) speak2(target.audio, 0.78);
          state2.lastAgeFeedback = `Correct! ${target.targetHanzi}`;
          if (target.sourceItemId) {
            state2.selectedFocusItemId = target.sourceItemId;
            renderFocusDisplay2(currentFocusItem2());
            renderFocusExplorer2();
            renderFocusStatus2();
          }
        } else state2.lastAgeFeedback = "Not quite. Try building the sentence again.";
      }
      renderActivityPanel2(currentTopic2());
    }
    function handleAgeBuildClear2() {
      const target = ageBuildTarget2();
      if (!target) return;
      state2.ageBuildAvailableTokens = shuffleArray2([...state2.ageBuildAvailableTokens, ...state2.ageBuildSelectedTokens]);
      state2.ageBuildSelectedTokens = [];
      state2.lastAgeFeedback = "Try building the sentence again.";
      renderActivityPanel2(currentTopic2());
    }
    function renderAgeExplorer2() {
      focusExplorer2.innerHTML = `<div class="numbers-board"><div class="numbers-stage-card"><p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p><h4>Book theme: age and school year</h4><p>This lesson starts with <strong>\u4F60\u51E0\u5C81\uFF1F</strong> / <strong>\u6211...\u5C81\u3002</strong> and then adds <strong>\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F</strong> / <strong>\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002</strong></p></div><div class="greetings-practice-grid">${agePractice2.map((exchange) => `<section class="greetings-exchange"><div class="greetings-exchange-top"><div><p class="body-match-kicker">Scene ${exchange.number}</p><p class="greetings-exchange-prompt">${exchange.prompt}</p></div><button class="small-button is-action-button" type="button" data-age-play-all="${exchange.id}">Play scene</button></div><div class="greetings-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" /></div><div class="greetings-line-stack">${exchange.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div></section>`).join("")}</div></div>`;
      focusExplorer2.querySelectorAll("[data-age-play-all]").forEach((button) => button.addEventListener("click", () => {
        const exchange = agePractice2.find((entry) => entry.id === button.dataset.agePlayAll);
        if (!exchange || !state2.tapAudioEnabled) return;
        speakSceneLines2(exchange.lines);
        focusStatus2.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
      }));
    }
    return { ageGameItems: ageGameItems2, resetAgeChallenge: resetAgeChallenge2, ensureAgeChallenge: ensureAgeChallenge2, handleAgeChallengePlay: handleAgeChallengePlay2, handleAgeChallengeGuess: handleAgeChallengeGuess2, ageBuildTarget: ageBuildTarget2, resetAgeBuilder: resetAgeBuilder2, ensureAgeBuilder: ensureAgeBuilder2, handleAgeBuildToken: handleAgeBuildToken2, handleAgeBuildClear: handleAgeBuildClear2, renderAgeExplorer: renderAgeExplorer2 };
  }

  // src/features/foundations/polite-words.js
  var politeWordsTopic = {
    id: "polite-words",
    title: "Polite Words",
    summary: "Useful everyday phrases like thank you and simple requests.",
    progressLabel: "1A to 3A",
    iconText: "\u8C22\u8C22",
    iconColor: "#8f6c46",
    iconAccent: "#e6c77e",
    iconTheme: "polite",
    focus: {
      hanzi: "\u8C22\u8C22\u4F60\uFF01",
      pinyin: "xi\xE8 xie n\u01D0!",
      english: "Thank you!",
      audio: "\u8C22\u8C22\u4F60"
    },
    focusItems: [
      { id: "thank-you", hanzi: "\u8C22\u8C22\u4F60\uFF01", pinyin: "xi\xE8 xie n\u01D0!", english: "Thank you!", audio: "\u8C22\u8C22\u4F60" },
      { id: "youre-welcome", hanzi: "\u4E0D\u5BA2\u6C14\u3002", pinyin: "b\xFA k\xE8 qi.", english: "You're welcome.", audio: "\u4E0D\u5BA2\u6C14" },
      { id: "sorry", hanzi: "\u5BF9\u4E0D\u8D77\u3002", pinyin: "du\xEC bu q\u01D0.", english: "I'm sorry.", audio: "\u5BF9\u4E0D\u8D77" },
      { id: "never-mind", hanzi: "\u6CA1\u5173\u7CFB\u3002", pinyin: "m\xE9i gu\u0101n xi.", english: "Never mind.", audio: "\u6CA1\u5173\u7CFB" },
      { id: "please", hanzi: "\u8BF7", pinyin: "q\u01D0ng", english: "please", audio: "\u8BF7" }
    ],
    interactiveScene: "polite-phrases",
    parentGuide: "Use these during real routines: handing snacks, passing pencils, cleaning up, or asking for help.",
    cultureGuide: "Polite language works best when tied to real exchanges. A quick classroom or home routine is better than a long explanation.",
    activities: ["Tap to hear", "Match phrase to situation", "Listen and choose", "Speak after me"],
    steps: [
      { book: "1A", lesson: 5, title: "Thank you!", note: "Start with a core manners phrase." },
      { book: "3A", lesson: 6, title: "Request", note: "Expand polite language into asking for things." }
    ]
  };
  var politePractice = [
    {
      id: "polite-scene-1",
      number: "1",
      prompt: "Saying thank you after a friend helps you",
      imagePath: "assets/polite/polite-scene-1.webp",
      imageAlt: "Two children in a classroom sharing a crayon politely",
      lines: [
        { hanzi: "\u8C22\u8C22\u4F60\uFF01", pinyin: "xi\xE8 xie n\u01D0!", english: "Thank you!", audio: "\u8C22\u8C22\u4F60" },
        { hanzi: "\u4E0D\u5BA2\u6C14\u3002", pinyin: "b\xFA k\xE8 qi.", english: "You're welcome.", audio: "\u4E0D\u5BA2\u6C14" }
      ]
    },
    {
      id: "polite-scene-2",
      number: "2",
      prompt: "Saying sorry after a mistake",
      imagePath: "assets/polite/polite-scene-2.webp",
      imageAlt: "One child apologizing after dropping a pencil case and another child forgiving kindly",
      lines: [
        { hanzi: "\u5BF9\u4E0D\u8D77\u3002", pinyin: "du\xEC bu q\u01D0.", english: "I'm sorry.", audio: "\u5BF9\u4E0D\u8D77" },
        { hanzi: "\u6CA1\u5173\u7CFB\u3002", pinyin: "m\xE9i gu\u0101n xi.", english: "Never mind.", audio: "\u6CA1\u5173\u7CFB" }
      ]
    },
    {
      id: "polite-scene-3",
      number: "3",
      prompt: "A polite classroom phrase from the teacher",
      imagePath: "assets/polite/polite-scene-3.webp",
      imageAlt: "A teacher kindly asking children to be quiet in the classroom",
      lines: [
        { hanzi: "\u8BF7\u5B89\u9759\u3002", pinyin: "q\u01D0ng \u0101n j\xECng.", english: "Please be quiet.", audio: "\u8BF7\u5B89\u9759" },
        { hanzi: "\u597D\u3002", pinyin: "h\u01CEo.", english: "Okay.", audio: "\u597D" }
      ]
    }
  ];
  var politeGameItemIds = ["thank-you", "youre-welcome", "sorry", "never-mind"];

  // src/features/foundations/polite-words-controller.js
  function createPoliteWordsController({
    state: state2,
    politeGameItemIds: politeGameItemIds2,
    politePractice: politePractice2,
    topicById: topicById2,
    shuffleArray: shuffleArray2,
    speak: speak2,
    speakSceneLines: speakSceneLines2,
    currentTopic: currentTopic2,
    currentFocusItem: currentFocusItem2,
    currentBook: currentBook2,
    currentLesson: currentLesson2,
    renderActivityPanel: renderActivityPanel2,
    renderFocusDisplay: renderFocusDisplay2,
    renderFocusExplorer: renderFocusExplorer2,
    renderFocusStatus: renderFocusStatus2,
    elements
  }) {
    const { focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = elements;
    function politeGameItems2() {
      const politeTopic = topicById2("polite-words");
      return politeGameItemIds2.map((id) => politeTopic?.focusItems.find((item) => item.id === id)).filter(Boolean);
    }
    function politeMeaningLabel2(itemId) {
      const labels = {
        "thank-you": "Thank a friend who helped you",
        "youre-welcome": "Reply kindly after someone thanks you",
        sorry: "Say sorry after a mistake",
        "never-mind": "Forgive kindly after an apology"
      };
      return labels[itemId] ?? "";
    }
    function resetPoliteMatchGame2(options = {}) {
      const items = politeGameItems2();
      state2.politeSelectedPhraseId = null;
      state2.politeMatchedIds = /* @__PURE__ */ new Set();
      state2.politePhraseOrder = shuffleArray2(items.map((item) => item.id));
      state2.politeMeaningOrder = shuffleArray2(items.map((item) => item.id));
      state2.politeMatchFeedback = options.feedback ?? "";
      state2.lastPoliteFeedback = state2.politeMatchFeedback;
    }
    function ensurePoliteMatchGame2() {
      const items = politeGameItems2();
      if (!state2.politePhraseOrder.length || state2.politePhraseOrder.length !== items.length || state2.politeMeaningOrder.length !== items.length) {
        resetPoliteMatchGame2();
      }
    }
    function handlePoliteMatchPhrase2(itemId) {
      const item = politeGameItems2().find((entry) => entry.id === itemId);
      if (!item || state2.politeMatchedIds.has(itemId)) {
        return;
      }
      state2.politeSelectedPhraseId = itemId;
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.politeMatchFeedback = `Now find the meaning for ${item.hanzi}.`;
      state2.lastPoliteFeedback = state2.politeMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handlePoliteMatchAttempt2(targetId) {
      if (!state2.politeSelectedPhraseId || state2.politeMatchedIds.has(targetId)) {
        return;
      }
      const selectedId = state2.politeSelectedPhraseId;
      const selectedItem = politeGameItems2().find((entry) => entry.id === selectedId);
      if (!selectedItem) {
        return;
      }
      if (selectedId === targetId) {
        state2.politeMatchedIds = /* @__PURE__ */ new Set([...state2.politeMatchedIds, targetId]);
        state2.politeSelectedPhraseId = null;
        state2.politeMatchFeedback = `Correct! ${selectedItem.hanzi} matches that meaning.`;
        state2.lastPoliteFeedback = state2.politeMatchFeedback;
        state2.selectedFocusItemId = selectedItem.id;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        if (state2.politeMatchedIds.size === politeGameItems2().length) {
          state2.politeMatchFeedback = "Great job! You matched all the polite phrases.";
          state2.lastPoliteFeedback = state2.politeMatchFeedback;
        }
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.politeMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that meaning.`;
      state2.lastPoliteFeedback = state2.politeMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function resetPoliteChallenge2(options = {}) {
      const items = politeGameItems2();
      if (!items.length) {
        return;
      }
      const answerChoices = items.filter((item) => item.id !== options.excludeId);
      const answerPool = answerChoices.length ? answerChoices : items;
      const answer = answerPool[Math.floor(Math.random() * answerPool.length)];
      const distractors = shuffleArray2(items.filter((item) => item.id !== answer.id)).slice(
        0,
        Math.min(3, Math.max(0, items.length - 1))
      );
      state2.politeChallengeAnswerId = answer.id;
      state2.politeChallengePickedId = "";
      state2.politeChallengePromptId = answer.id;
      state2.politeChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.politeChallengeResult = "";
      state2.politeChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.politeListenFeedback = options.feedback ?? "";
      state2.lastPoliteFeedback = state2.politeListenFeedback;
    }
    function ensurePoliteChallenge2() {
      if (!state2.politeChallengeAnswerId || !state2.politeChallengeOptionIds.length) {
        resetPoliteChallenge2();
      }
    }
    function handlePoliteChallengePlay2() {
      const previousPromptId = state2.politeChallengePromptId;
      resetPoliteChallenge2({ excludeId: previousPromptId });
      const item = politeGameItems2().find((entry) => entry.id === state2.politeChallengePromptId);
      if (!item) {
        return;
      }
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.politeListenFeedback = "Listen carefully, then tap the matching card.";
      state2.lastPoliteFeedback = state2.politeListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handlePoliteChallengeGuess2(itemId) {
      ensurePoliteChallenge2();
      const answer = politeGameItems2().find((entry) => entry.id === state2.politeChallengeAnswerId);
      const picked = politeGameItems2().find((entry) => entry.id === itemId);
      if (!answer || !picked) {
        return;
      }
      if (itemId === answer.id) {
        state2.selectedFocusItemId = answer.id;
        state2.politeChallengePickedId = itemId;
        state2.politeChallengeResult = "correct";
        if (state2.tapAudioEnabled) {
          speak2(answer.audio, 0.78);
        }
        state2.politeListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
        state2.lastPoliteFeedback = state2.politeListenFeedback;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.politeChallengePickedId = itemId;
      state2.politeChallengeResult = "wrong";
      state2.politeChallengeWrongIds = /* @__PURE__ */ new Set([...state2.politeChallengeWrongIds, itemId]);
      state2.politeListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
      state2.lastPoliteFeedback = state2.politeListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function renderPoliteWordsExplorer2() {
      focusExplorer2.innerHTML = `
      <div class="numbers-board">
        <div class="numbers-stage-card">
          <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
          <h4>Book theme: kind classroom language</h4>
          <p>This topic starts with thank you and sorry, then grows into kind replies and polite requests.</p>
        </div>
        <div class="greetings-practice-grid">
          ${politePractice2.map((exchange) => `
            <section class="greetings-exchange">
              <div class="greetings-exchange-top">
                <div>
                  <p class="body-match-kicker">Scene ${exchange.number}</p>
                  <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                </div>
                <button class="small-button is-action-button" type="button" data-polite-play-all="${exchange.id}">Play scene</button>
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
                        ${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                        ${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
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
      focusExplorer2.querySelectorAll("[data-polite-play-all]").forEach((button) => {
        button.addEventListener("click", () => {
          const exchange = politePractice2.find((entry) => entry.id === button.dataset.politePlayAll);
          if (!exchange || !state2.tapAudioEnabled) {
            return;
          }
          speakSceneLines2(exchange.lines);
          focusStatus2.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
        });
      });
    }
    return {
      politeGameItems: politeGameItems2,
      politeMeaningLabel: politeMeaningLabel2,
      resetPoliteMatchGame: resetPoliteMatchGame2,
      ensurePoliteMatchGame: ensurePoliteMatchGame2,
      handlePoliteMatchPhrase: handlePoliteMatchPhrase2,
      handlePoliteMatchAttempt: handlePoliteMatchAttempt2,
      resetPoliteChallenge: resetPoliteChallenge2,
      ensurePoliteChallenge: ensurePoliteChallenge2,
      handlePoliteChallengePlay: handlePoliteChallengePlay2,
      handlePoliteChallengeGuess: handlePoliteChallengeGuess2,
      renderPoliteWordsExplorer: renderPoliteWordsExplorer2
    };
  }

  // src/features/foundations/greetings.js
  var greetingsTopic = {
    id: "greetings",
    title: "Greetings",
    summary: "Simple social language children can use right away in class and at home.",
    progressLabel: "1A foundation",
    iconText: "\u4F60\u597D",
    iconColor: "#d2874f",
    iconAccent: "#f7d98f",
    iconTheme: "greeting",
    focus: {
      hanzi: "\u4F60\u597D\uFF01",
      pinyin: "n\u01D0 h\u01CEo!",
      english: "Hello!",
      audio: "\u4F60\u597D"
    },
    focusItems: [
      { id: "hello", hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
      { id: "you-casual", hanzi: "\u4F60", pinyin: "n\u01D0", english: "you", audio: "\u4F60" },
      { id: "you-polite", hanzi: "\u60A8", pinyin: "n\xEDn", english: "you (polite)", audio: "\u60A8" },
      { id: "teacher-hello", hanzi: "\u674E\u8001\u5E08\uFF0C\u60A8\u597D\uFF01", pinyin: "L\u01D0 l\u01CEo sh\u012B, n\xEDn h\u01CEo!", english: "Hello, Teacher Li!", audio: "\u674E\u8001\u5E08\u60A8\u597D" },
      { id: "good-morning", hanzi: "\u4F60\u65E9\uFF01", pinyin: "n\u01D0 z\u01CEo!", english: "Good morning!", audio: "\u4F60\u65E9" },
      { id: "goodbye", hanzi: "\u518D\u89C1\uFF01", pinyin: "z\xE0i ji\xE0n!", english: "Goodbye!", audio: "\u518D\u89C1" },
      { id: "teacher", hanzi: "\u8001\u5E08", pinyin: "l\u01CEo sh\u012B", english: "teacher", audio: "\u8001\u5E08" },
      { id: "surname-li", hanzi: "\u674E", pinyin: "L\u01D0", english: "Li (surname)", audio: "\u674E" }
    ],
    interactiveScene: "greetings-conversation",
    parentGuide: "Pair the phrase with movement. Wave, smile, and say it together. Young children remember social language best when it feels physical.",
    cultureGuide: "Greetings are a gentle bridge into relationship-focused language. The point is warmth and confidence, not a long explanation.",
    activities: ["Tap to hear", "Echo and repeat", "Choose the greeting", "Role-play turns"],
    steps: [{ book: "1A", lesson: 4, title: "Hello!", note: "Begin with friendly greetings." }]
  };
  var greetingsPractice = [
    {
      id: "scene-1",
      number: "1",
      prompt: "Greeting a teacher politely",
      imagePath: "assets/greetings/greetings-scene-1.webp",
      imageAlt: "Teacher Li greeting Anan outside the school entrance",
      lines: [
        { hanzi: "\u4F60\u597D\uFF01", pinyin: "n\u01D0 h\u01CEo!", english: "Hello!", audio: "\u4F60\u597D" },
        { hanzi: "\u674E\u8001\u5E08\uFF0C\u60A8\u597D\uFF01", pinyin: "L\u01D0 l\u01CEo sh\u012B, n\xEDn h\u01CEo!", english: "Hello, Teacher Li!", audio: "\u674E\u8001\u5E08\u60A8\u597D" }
      ]
    },
    {
      id: "scene-2",
      number: "2",
      prompt: "Friends meeting in the morning",
      imagePath: "assets/greetings/greetings-scene-2.webp",
      imageAlt: "Lele and Anan greeting each other on the way into school, with other children arriving behind them",
      lines: [
        { hanzi: "\u4F60\u65E9\uFF01", pinyin: "n\u01D0 z\u01CEo!", english: "Good morning!", audio: "\u4F60\u65E9" },
        { hanzi: "\u4F60\u65E9\uFF01", pinyin: "n\u01D0 z\u01CEo!", english: "Good morning!", audio: "\u4F60\u65E9" }
      ]
    },
    {
      id: "scene-3",
      number: "3",
      prompt: "Saying goodbye",
      imagePath: "assets/greetings/greetings-scene-3.webp",
      imageAlt: "Lele and Anan waving goodbye after school as children come out of the building and head home",
      lines: [
        { hanzi: "\u518D\u89C1\uFF01", pinyin: "z\xE0i ji\xE0n!", english: "Goodbye!", audio: "\u518D\u89C1" },
        { hanzi: "\u518D\u89C1\uFF01", pinyin: "z\xE0i ji\xE0n!", english: "Goodbye!", audio: "\u518D\u89C1" }
      ]
    }
  ];
  var greetingsGameItemIds = ["hello", "teacher-hello", "good-morning", "goodbye"];

  // src/features/foundations/greetings-controller.js
  function createGreetingsController({
    state: state2,
    greetingsGameItemIds: greetingsGameItemIds2,
    greetingsPractice: greetingsPractice2,
    topicById: topicById2,
    shuffleArray: shuffleArray2,
    speak: speak2,
    speakSceneLines: speakSceneLines2,
    currentTopic: currentTopic2,
    currentFocusItem: currentFocusItem2,
    currentBook: currentBook2,
    currentLesson: currentLesson2,
    resetListenChallengeResult: resetListenChallengeResult2,
    renderActivityPanel: renderActivityPanel2,
    renderFocusDisplay: renderFocusDisplay2,
    renderFocusExplorer: renderFocusExplorer2,
    renderFocusStatus: renderFocusStatus2,
    elements
  }) {
    const { focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = elements;
    function greetingsGameItems2() {
      const greetingsTopic2 = topicById2("greetings");
      return greetingsGameItemIds2.map((id) => greetingsTopic2?.focusItems.find((item) => item.id === id)).filter(Boolean);
    }
    function resetGreetingsChallenge2(options = {}) {
      const items = greetingsGameItems2();
      if (!items.length) {
        return;
      }
      const answer = items[Math.floor(Math.random() * items.length)];
      const distractors = shuffleArray2(items.filter((item) => item.id !== answer.id)).slice(
        0,
        Math.min(3, Math.max(0, items.length - 1))
      );
      state2.greetingsChallengeAnswerId = answer.id;
      state2.greetingsChallengePickedId = "";
      state2.greetingsChallengePromptId = answer.id;
      state2.greetingsChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.greetingsChallengeResult = "";
      state2.greetingsChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.greetingsListenFeedback = options.feedback ?? "";
      state2.lastGreetingsFeedback = state2.greetingsListenFeedback;
    }
    function ensureGreetingsChallenge2() {
      if (!state2.greetingsChallengeAnswerId || !state2.greetingsChallengeOptionIds.length) {
        resetGreetingsChallenge2();
      }
    }
    function greetingsMeaningLabel2(itemId) {
      const labels = {
        hello: "Say hello to a friend",
        "teacher-hello": "Greet Teacher Li politely",
        "good-morning": "Say good morning at the start of the day",
        goodbye: "Say goodbye when leaving"
      };
      return labels[itemId] ?? "";
    }
    function resetGreetingsMatchGame2(options = {}) {
      const items = greetingsGameItems2();
      state2.greetingsSelectedPhraseId = null;
      state2.greetingsMatchedIds = /* @__PURE__ */ new Set();
      state2.greetingsPhraseOrder = shuffleArray2(items.map((item) => item.id));
      state2.greetingsMeaningOrder = shuffleArray2(items.map((item) => item.id));
      state2.greetingsMatchFeedback = options.feedback ?? "";
      state2.lastGreetingsFeedback = state2.greetingsMatchFeedback;
    }
    function ensureGreetingsMatchGame2() {
      const items = greetingsGameItems2();
      if (!state2.greetingsPhraseOrder.length || state2.greetingsPhraseOrder.length !== items.length || state2.greetingsMeaningOrder.length !== items.length) {
        resetGreetingsMatchGame2();
      }
    }
    function handleGreetingsMatchPhrase2(itemId) {
      const item = greetingsGameItems2().find((entry) => entry.id === itemId);
      if (!item || state2.greetingsMatchedIds.has(itemId)) {
        return;
      }
      state2.greetingsSelectedPhraseId = itemId;
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.greetingsMatchFeedback = `Now find the situation for ${item.hanzi}.`;
      state2.lastGreetingsFeedback = state2.greetingsMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handleGreetingsMatchAttempt2(targetId) {
      if (!state2.greetingsSelectedPhraseId || state2.greetingsMatchedIds.has(targetId)) {
        return;
      }
      const selectedId = state2.greetingsSelectedPhraseId;
      const selectedItem = greetingsGameItems2().find((entry) => entry.id === selectedId);
      if (!selectedItem) {
        return;
      }
      if (selectedId === targetId) {
        state2.greetingsMatchedIds = /* @__PURE__ */ new Set([...state2.greetingsMatchedIds, targetId]);
        state2.greetingsSelectedPhraseId = null;
        state2.greetingsMatchFeedback = `Correct! ${selectedItem.hanzi} matches that situation.`;
        state2.lastGreetingsFeedback = state2.greetingsMatchFeedback;
        state2.selectedFocusItemId = selectedItem.id;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        if (state2.greetingsMatchedIds.size === greetingsGameItems2().length) {
          state2.greetingsMatchFeedback = "Great job! You matched all the greetings.";
          state2.lastGreetingsFeedback = state2.greetingsMatchFeedback;
        }
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.greetingsMatchFeedback = `Try again. ${selectedItem.hanzi} does not match that situation.`;
      state2.lastGreetingsFeedback = state2.greetingsMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handleGreetingsChallengePlay2() {
      ensureGreetingsChallenge2();
      const item = greetingsGameItems2().find((entry) => entry.id === state2.greetingsChallengePromptId);
      if (!item) {
        return;
      }
      resetListenChallengeResult2("greetings");
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.greetingsListenFeedback = `Listen again and find ${item.hanzi}.`;
      state2.lastGreetingsFeedback = state2.greetingsListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handleGreetingsChallengeGuess2(itemId) {
      ensureGreetingsChallenge2();
      const answer = greetingsGameItems2().find((entry) => entry.id === state2.greetingsChallengeAnswerId);
      const picked = greetingsGameItems2().find((entry) => entry.id === itemId);
      if (!answer || !picked) {
        return;
      }
      if (itemId === answer.id) {
        state2.selectedFocusItemId = answer.id;
        state2.greetingsChallengePickedId = itemId;
        state2.greetingsChallengeResult = "correct";
        if (state2.tapAudioEnabled) {
          speak2(answer.audio, 0.78);
        }
        state2.greetingsListenFeedback = `Correct! ${answer.hanzi} matches the audio.`;
        state2.lastGreetingsFeedback = state2.greetingsListenFeedback;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.greetingsChallengePickedId = itemId;
      state2.greetingsChallengeResult = "wrong";
      state2.greetingsChallengeWrongIds = /* @__PURE__ */ new Set([...state2.greetingsChallengeWrongIds, itemId]);
      state2.greetingsListenFeedback = `Try again. You picked ${picked.hanzi}, but the audio is ${answer.hanzi}.`;
      state2.lastGreetingsFeedback = state2.greetingsListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function renderGreetingsExplorer2() {
      focusExplorer2.innerHTML = `
      <div class="numbers-board">
        <div class="numbers-stage-card">
          <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
          <h4>Book theme: school greetings</h4>
          <p>This lesson follows the book page: greet a teacher politely, greet a friend in the morning, and say goodbye.</p>
        </div>
        <div class="greetings-practice-grid">
          ${greetingsPractice2.map(
        (exchange) => `
                <section class="greetings-exchange">
                  <div class="greetings-exchange-top">
                    <div>
                      <p class="body-match-kicker">Scene ${exchange.number}</p>
                      <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                    </div>
                    <button class="small-button is-action-button" type="button" data-greeting-play-all="${exchange.id}">Play scene</button>
                  </div>
                  <div class="greetings-scene-layout">
                    <div class="greetings-scene-visual">
                      <img class="greetings-scene-image" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
                    </div>
                      <div class="greetings-line-stack">
                      ${exchange.lines.map(
          (line) => `
                            <article class="greetings-line-card">
                              <div class="telephone-bubble-copy">
                                <p class="telephone-line-hanzi">${line.hanzi}</p>
                                ${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                                ${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                              </div>
                            </article>
                          `
        ).join("")}
                    </div>
                  </div>
                </section>
              `
      ).join("")}
        </div>
      </div>
    `;
      focusExplorer2.querySelectorAll("[data-greeting-play-all]").forEach((button) => {
        button.addEventListener("click", () => {
          const exchange = greetingsPractice2.find((entry) => entry.id === button.dataset.greetingPlayAll);
          if (!exchange || !state2.tapAudioEnabled) {
            return;
          }
          speakSceneLines2(exchange.lines);
          focusStatus2.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
        });
      });
    }
    return {
      greetingsGameItems: greetingsGameItems2,
      resetGreetingsChallenge: resetGreetingsChallenge2,
      ensureGreetingsChallenge: ensureGreetingsChallenge2,
      greetingsMeaningLabel: greetingsMeaningLabel2,
      resetGreetingsMatchGame: resetGreetingsMatchGame2,
      ensureGreetingsMatchGame: ensureGreetingsMatchGame2,
      handleGreetingsMatchPhrase: handleGreetingsMatchPhrase2,
      handleGreetingsMatchAttempt: handleGreetingsMatchAttempt2,
      handleGreetingsChallengePlay: handleGreetingsChallengePlay2,
      handleGreetingsChallengeGuess: handleGreetingsChallengeGuess2,
      renderGreetingsExplorer: renderGreetingsExplorer2
    };
  }

  // src/features/foundations/identity.js
  var identityTopic = {
    id: "identity",
    title: "Countries & Languages",
    summary: "Say where someone is from and the languages they can speak.",
    progressLabel: "3A to 4A",
    iconText: "\u4E2D\u56FD",
    iconColor: "#587d9c",
    iconAccent: "#e5bf70",
    iconTheme: "identity",
    focus: {
      hanzi: "\u6211\u662F\u4E2D\u56FD\u4EBA\u3002",
      pinyin: "w\u01D2 sh\xEC Zh\u014Dng gu\xF3 r\xE9n.",
      english: "I am Chinese.",
      audio: "\u6211\u662F\u4E2D\u56FD\u4EBA"
    },
    focusItems: [
      { id: "ask-country", hanzi: "\u4F60\u662F\u54EA\u56FD\u4EBA\uFF1F", pinyin: "n\u01D0 sh\xEC n\u01CE gu\xF3 r\xE9n?", english: "What country are you from?", audio: "\u4F60\u662F\u54EA\u56FD\u4EBA" },
      { id: "china", hanzi: "\u6211\u662F\u4E2D\u56FD\u4EBA\u3002", pinyin: "w\u01D2 sh\xEC Zh\u014Dng gu\xF3 r\xE9n.", english: "I am Chinese.", audio: "\u6211\u662F\u4E2D\u56FD\u4EBA" },
      { id: "usa", hanzi: "\u6211\u662F\u7F8E\u56FD\u4EBA\u3002", pinyin: "w\u01D2 sh\xEC M\u011Bi gu\xF3 r\xE9n.", english: "I am American.", audio: "\u6211\u662F\u7F8E\u56FD\u4EBA" },
      { id: "uk", hanzi: "\u6211\u662F\u82F1\u56FD\u4EBA\u3002", pinyin: "w\u01D2 sh\xEC Y\u012Bng gu\xF3 r\xE9n.", english: "I am British.", audio: "\u6211\u662F\u82F1\u56FD\u4EBA" },
      { id: "ask-language", hanzi: "\u4F60\u4F1A\u8BF4\u6C49\u8BED\u5417\uFF1F", pinyin: "n\u01D0 hu\xEC shu\u014D H\xE0ny\u01D4 ma?", english: "Can you speak Chinese?", audio: "\u4F60\u4F1A\u8BF4\u6C49\u8BED\u5417" },
      { id: "speak-chinese", hanzi: "\u6211\u4F1A\u8BF4\u6C49\u8BED\u3002", pinyin: "w\u01D2 hu\xEC shu\u014D H\xE0ny\u01D4.", english: "I can speak Chinese.", audio: "\u6211\u4F1A\u8BF4\u6C49\u8BED" },
      { id: "speak-english", hanzi: "\u6211\u4F1A\u8BF4\u82F1\u8BED\u3002", pinyin: "w\u01D2 hu\xEC shu\u014D Y\u012Bngy\u01D4.", english: "I can speak English.", audio: "\u6211\u4F1A\u8BF4\u82F1\u8BED" }
    ],
    interactiveScene: "identity-scenes",
    parentGuide: "Use the child's real country and languages. Start with one short answer, then switch the country or language together.",
    cultureGuide: "Country and language words work best as respectful descriptions of people, not as labels for how anyone should look or act.",
    activities: ["Tap to hear", "Meet classmates", "Match country and flag", "Say what I speak"],
    steps: [
      { book: "3A", lesson: 5, title: "Nationality", note: "Ask and say where someone is from." },
      { book: "4A", lesson: 2, title: "Languages", note: "Say which languages someone can speak." }
    ]
  };
  var identityCountries = [
    {
      id: "china",
      label: "China",
      hanzi: "\u4E2D\u56FD",
      nationality: "\u4E2D\u56FD\u4EBA",
      pinyin: "Zh\u014Dng gu\xF3 r\xE9n",
      asset: "assets/illustrated-flags/china.webp",
      focusItemId: "china",
      response: { hanzi: "\u6211\u662F\u4E2D\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u6C49\u8BED\u3002", pinyin: "w\u01D2 sh\xEC Zh\u014Dng gu\xF3 r\xE9n, w\u01D2 hu\xEC shu\u014D H\xE0ny\u01D4.", english: "I am Chinese. I can speak Chinese.", audio: "\u6211\u662F\u4E2D\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u6C49\u8BED" }
    },
    {
      id: "usa",
      label: "United States",
      hanzi: "\u7F8E\u56FD",
      nationality: "\u7F8E\u56FD\u4EBA",
      pinyin: "M\u011Bi gu\xF3 r\xE9n",
      asset: "assets/illustrated-flags/united-states.webp",
      focusItemId: "usa",
      response: { hanzi: "\u6211\u662F\u7F8E\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED\u3002", pinyin: "w\u01D2 sh\xEC M\u011Bi gu\xF3 r\xE9n, w\u01D2 hu\xEC shu\u014D Y\u012Bngy\u01D4.", english: "I am American. I can speak English.", audio: "\u6211\u662F\u7F8E\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED" }
    },
    {
      id: "uk",
      label: "United Kingdom",
      hanzi: "\u82F1\u56FD",
      nationality: "\u82F1\u56FD\u4EBA",
      pinyin: "Y\u012Bng gu\xF3 r\xE9n",
      asset: "assets/illustrated-flags/united-kingdom.webp",
      focusItemId: "uk",
      response: { hanzi: "\u6211\u662F\u82F1\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED\u3002", pinyin: "w\u01D2 sh\xEC Y\u012Bng gu\xF3 r\xE9n, w\u01D2 hu\xEC shu\u014D Y\u012Bngy\u01D4.", english: "I am British. I can speak English.", audio: "\u6211\u662F\u82F1\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED" }
    }
  ];
  var identityQuestion = {
    hanzi: "\u4F60\u662F\u54EA\u56FD\u4EBA\uFF1F",
    pinyin: "n\u01D0 sh\xEC n\u01CE gu\xF3 r\xE9n?",
    english: "What country are you from?",
    audio: "\u4F60\u662F\u54EA\u56FD\u4EBA"
  };
  var identityConversation = {
    imagePath: "assets/illustrated-identity/classmates-speak-different-languages.webp",
    imageAlt: "Two classmates talking about where they are from and the languages they speak",
    lines: [
      { hanzi: "\u6211\u662F\u4E2D\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u6C49\u8BED\u3002", pinyin: "w\u01D2 sh\xEC Zh\u014Dng gu\xF3 r\xE9n, w\u01D2 hu\xEC shu\u014D H\xE0ny\u01D4.", english: "I am Chinese. I can speak Chinese.", audio: "\u6211\u662F\u4E2D\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u6C49\u8BED" },
      { hanzi: "\u6211\u662F\u7F8E\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED\u3002", pinyin: "w\u01D2 sh\xEC M\u011Bi gu\xF3 r\xE9n, w\u01D2 hu\xEC shu\u014D Y\u012Bngy\u01D4.", english: "I am American. I can speak English.", audio: "\u6211\u662F\u7F8E\u56FD\u4EBA\uFF0C\u6211\u4F1A\u8BF4\u82F1\u8BED" }
    ]
  };

  // src/features/family/family.js
  var familyTopic = {
    id: "family",
    title: "Family",
    summary: "Start with love and belonging, then sort family words by older and younger.",
    progressLabel: "1B to 3A",
    iconText: "\u5BB6\u4EBA",
    iconColor: "#aa7051",
    iconAccent: "#f1d29b",
    iconTheme: "family",
    focus: {
      hanzi: "\u7238\u7238\u5988\u5988\u7231\u6211\u3002",
      pinyin: "b\xE0 ba m\u0101 ma \xE0i w\u01D2.",
      english: "Dad and Mum love me.",
      audio: "\u7238\u7238\u5988\u5988\u7231\u6211"
    },
    focusItems: [
      { id: "parents-love-me", hanzi: "\u7238\u7238\u5988\u5988\u7231\u6211\u3002", pinyin: "b\xE0 ba m\u0101 ma \xE0i w\u01D2.", english: "Dad and Mum love me.", audio: "\u7238\u7238\u5988\u5988\u7231\u6211" },
      { id: "i-love-dad", hanzi: "\u6211\u7231\u7238\u7238\u3002", pinyin: "w\u01D2 \xE0i b\xE0 ba.", english: "I love Dad.", audio: "\u6211\u7231\u7238\u7238" },
      { id: "i-love-mom", hanzi: "\u6211\u7231\u5988\u5988\u3002", pinyin: "w\u01D2 \xE0i m\u0101 ma.", english: "I love Mum.", audio: "\u6211\u7231\u5988\u5988" },
      { id: "mom-word", hanzi: "\u5988\u5988", pinyin: "m\u0101 ma", english: "mum", audio: "\u5988\u5988" },
      { id: "dad-word", hanzi: "\u7238\u7238", pinyin: "b\xE0 ba", english: "dad", audio: "\u7238\u7238" },
      { id: "older-brother-word", hanzi: "\u54E5\u54E5", pinyin: "g\u0113 ge", english: "older brother", audio: "\u54E5\u54E5" },
      { id: "younger-brother-word", hanzi: "\u5F1F\u5F1F", pinyin: "d\xEC di", english: "younger brother", audio: "\u5F1F\u5F1F" },
      { id: "older-sister-word", hanzi: "\u59D0\u59D0", pinyin: "ji\u011B jie", english: "older sister", audio: "\u59D0\u59D0" },
      { id: "younger-sister-word", hanzi: "\u59B9\u59B9", pinyin: "m\xE8i mei", english: "younger sister", audio: "\u59B9\u59B9" }
    ],
    interactiveScene: "family-home",
    parentGuide: "Use one warm family picture for \u7238\u7238\u5988\u5988\u7231\u6211, then switch quickly to family photos, pointing, and real names.",
    cultureGuide: "This early family lesson works best when love words and family roles stay close to the child's real home life.",
    activities: ["Tap to hear", "Match family member", "Listen and choose", "Talk about my family"],
    steps: [
      { book: "1B", lesson: 1, title: "Mum and dad", note: "Start with immediate family." },
      { book: "1B", lesson: 2, title: "Brothers and sisters", note: "Expand the family set." },
      { book: "2A", lesson: 2, title: "Two younger brothers", note: "Add sibling language in sentences." },
      { book: "3A", lesson: 4, title: "Family", note: "Widen the family topic." }
    ]
  };
  var familyGameItemIds = [
    "dad-word",
    "mom-word",
    "older-brother-word",
    "younger-brother-word",
    "older-sister-word",
    "younger-sister-word"
  ];
  var familyPractice = [
    {
      id: "family-scene-1",
      number: "1",
      prompt: "Start with the family-love sentences from Book 1B",
      visual: "parents-love",
      imagePath: "assets/illustrated-family/family-scene-parents-love.webp",
      imageAlt: "A child happily hugged by mum and dad in a cozy living room",
      roomLabel: "living-room",
      sceneLabel: "Living room",
      sceneMood: "Loved at home",
      lines: [
        { hanzi: "\u7238\u7238\u5988\u5988\u7231\u6211\u3002", pinyin: "b\xE0 ba m\u0101 ma \xE0i w\u01D2.", english: "Dad and Mum love me.", audio: "\u7238\u7238\u5988\u5988\u7231\u6211" },
        { hanzi: "\u6211\u7231\u7238\u7238\u3002", pinyin: "w\u01D2 \xE0i b\xE0 ba.", english: "I love Dad.", audio: "\u6211\u7231\u7238\u7238" },
        { hanzi: "\u6211\u7231\u5988\u5988\u3002", pinyin: "w\u01D2 \xE0i m\u0101 ma.", english: "I love Mum.", audio: "\u6211\u7231\u5988\u5988" }
      ]
    },
    {
      id: "family-scene-2",
      number: "2",
      prompt: "Compare siblings by boy or girl, then older or younger",
      visual: "siblings-compare",
      imagePath: "assets/illustrated-family/family-scene-siblings.webp",
      imageAlt: "Four siblings together in a living room: older brother, younger brother, older sister, and younger sister",
      roomLabel: "playroom",
      sceneLabel: "Sibling map",
      sceneMood: "See both pairs at once",
      lines: [
        { personId: "older-brother", hanzi: "\u54E5\u54E5", pinyin: "g\u0113 ge", english: "older brother", audio: "\u54E5\u54E5" },
        { personId: "younger-brother", hanzi: "\u5F1F\u5F1F", pinyin: "d\xEC di", english: "younger brother", audio: "\u5F1F\u5F1F" },
        { personId: "older-sister", hanzi: "\u59D0\u59D0", pinyin: "ji\u011B jie", english: "older sister", audio: "\u59D0\u59D0" },
        { personId: "younger-sister", hanzi: "\u59B9\u59B9", pinyin: "m\xE8i mei", english: "younger sister", audio: "\u59B9\u59B9" }
      ]
    }
  ];
  var illustratedFamily = {
    grandpa: { id: "grandpa", label: "Grandpa", ageGroup: "senior", path: "assets/illustrated-family/grandpa.webp" },
    grandma: { id: "grandma", label: "Grandma", ageGroup: "senior", path: "assets/illustrated-family/grandma.webp" },
    dad: { id: "dad", label: "Dad", ageGroup: "adult", path: "assets/illustrated-family/family-avatar-dad.webp" },
    mom: { id: "mom", label: "Mom", ageGroup: "adult", path: "assets/illustrated-family/family-avatar-mom.webp" },
    girl: { id: "girl", label: "Older sister", ageGroup: "8", path: "assets/illustrated-family/family-avatar-older-sister.webp" },
    boy: { id: "boy", label: "Younger brother", ageGroup: "6", path: "assets/illustrated-family/family-avatar-younger-brother.webp" }
  };
  var familyPersonIdsByItemId = {
    "dad-word": "dad",
    "mom-word": "mom",
    "older-brother-word": "older-brother",
    "younger-brother-word": "younger-brother",
    "older-sister-word": "older-sister",
    "younger-sister-word": "younger-sister"
  };
  var familyHeadshotsByItemId = {
    "mom-word": "assets/illustrated-family/family-avatar-mom.webp",
    "dad-word": "assets/illustrated-family/family-avatar-dad.webp",
    "older-brother-word": "assets/illustrated-family/family-avatar-older-brother.webp",
    "younger-brother-word": "assets/illustrated-family/family-avatar-younger-brother.webp",
    "older-sister-word": "assets/illustrated-family/family-avatar-older-sister.webp",
    "younger-sister-word": "assets/illustrated-family/family-avatar-younger-sister.webp"
  };

  // src/features/daily-life/clothes.js
  var clothesTopic = {
    id: "clothes",
    title: "Clothes",
    summary: "A concrete everyday topic that can grow from basic words into dressing and weather use.",
    progressLabel: "2A to 4B",
    iconText: "\u8863\u670D",
    iconColor: "#9c7b4f",
    focus: { hanzi: "\u6211\u4F1A\u7A7F\u8863\u670D\u3002", pinyin: "w\u01D2 hu\xEC chu\u0101n y\u012B fu.", english: "I can get dressed.", audio: "\u6211\u4F1A\u7A7F\u8863\u670D" },
    focusItems: [
      { id: "shirt", hanzi: "T\u6064", pinyin: "T x\xF9", english: "T-shirt", audio: "T\u6064" },
      { id: "pants", hanzi: "\u88E4\u5B50", pinyin: "k\xF9 zi", english: "trousers; pants", audio: "\u88E4\u5B50" },
      { id: "dress", hanzi: "\u88D9\u5B50", pinyin: "q\xFAn zi", english: "dress; skirt", audio: "\u88D9\u5B50" },
      { id: "shoes", hanzi: "\u978B\u5B50", pinyin: "xi\xE9 zi", english: "shoes", audio: "\u978B\u5B50" },
      { id: "hat", hanzi: "\u5E3D\u5B50", pinyin: "m\xE0o zi", english: "hat", audio: "\u5E3D\u5B50" },
      { id: "jacket", hanzi: "\u5916\u5957", pinyin: "w\xE0i t\xE0o", english: "jacket; coat", audio: "\u5916\u5957" },
      { id: "gloves", hanzi: "\u624B\u5957", pinyin: "sh\u01D2u t\xE0o", english: "gloves", audio: "\u624B\u5957" }
    ],
    interactiveScene: "clothes-scenes",
    parentGuide: "Use getting dressed as the practice moment. Repeating the words during a real routine makes them stick.",
    cultureGuide: "Clothes can later connect to colours, weather, and festival dress without needing a lot of extra explanation.",
    activities: ["Tap to hear", "Match the clothing", "Dress for the weather", "Listen and choose"],
    steps: [
      { book: "2A", lesson: 6, title: "I can dress myself", note: "Start with dressing language." },
      { book: "3A", lesson: 7, title: "Clothes", note: "Build a fuller clothing set." },
      { book: "4B", lesson: 2, title: "Clothes", note: "Reconnect clothing with weather and daily life." }
    ]
  };
  var clothesPractice = [
    { id: "clothes-scene-1", number: "1", prompt: "Getting dressed for the day", imagePath: "assets/illustrated-clothes/wearing-clothes-scene.webp", imageAlt: "A child getting dressed beside a clothes rack and mirror", lines: [{ hanzi: "\u6211\u4F1A\u7A7F\u8863\u670D\u3002", pinyin: "w\u01D2 hu\xEC chu\u0101n y\u012B fu.", english: "I can get dressed.", audio: "\u6211\u4F1A\u7A7F\u8863\u670D" }, { hanzi: "\u6211\u7A7FT\u6064\u548C\u88E4\u5B50\u3002", pinyin: "w\u01D2 chu\u0101n T x\xF9 h\xE9 k\xF9 zi.", english: "I wear a T-shirt and trousers.", audio: "\u6211\u7A7FT\u6064\u548C\u88E4\u5B50" }] },
    { id: "clothes-scene-2", number: "2", prompt: "Choosing clothes for rainy weather", imagePath: "assets/illustrated-clothes/weather-linked-clothing-scene.webp", imageAlt: "A child choosing a raincoat by a rainy window", lines: [{ hanzi: "\u4E0B\u96E8\u4E86\u3002", pinyin: "xi\xE0 y\u01D4 le.", english: "It is raining.", audio: "\u4E0B\u96E8\u4E86" }, { hanzi: "\u6211\u7A7F\u96E8\u8863\u548C\u96E8\u978B\u3002", pinyin: "w\u01D2 chu\u0101n y\u01D4 y\u012B h\xE9 y\u01D4 xi\xE9.", english: "I wear a raincoat and rain boots.", audio: "\u6211\u7A7F\u96E8\u8863\u548C\u96E8\u978B" }] }
  ];
  var clothesMatchItems = [
    { id: "shoes", hanzi: "\u978B\u5B50", pinyin: "xi\xE9 zi", english: "shoes", audio: "\u978B\u5B50", imagePath: "assets/illustrated-self-dressing/putting-on-shoes.webp", imageAlt: "A child putting on shoes" },
    { id: "socks", hanzi: "\u889C\u5B50", pinyin: "w\xE0 zi", english: "socks", audio: "\u889C\u5B50", imagePath: "assets/illustrated-self-dressing/putting-on-socks.webp", imageAlt: "A child putting on socks" },
    { id: "jacket", hanzi: "\u5916\u5957", pinyin: "w\xE0i t\xE0o", english: "jacket", audio: "\u5916\u5957", imagePath: "assets/illustrated-self-dressing/putting-on-jacket.webp", imageAlt: "A child putting on a jacket" },
    { id: "hat", hanzi: "\u5E3D\u5B50", pinyin: "m\xE0o zi", english: "hat", audio: "\u5E3D\u5B50", imagePath: "assets/illustrated-self-dressing/putting-on-hat.webp", imageAlt: "A child putting on a hat" },
    { id: "school-uniform", hanzi: "\u6821\u670D", pinyin: "xi\xE0o f\xFA", english: "school uniform", audio: "\u6821\u670D", imagePath: "assets/illustrated-self-dressing/putting-on-school-uniform.webp", imageAlt: "A child putting on a school uniform" }
  ];

  // src/features/world/weather.js
  var weatherTopic = {
    id: "weather",
    title: "Weather",
    summary: "A natural topic for daily check-ins, clothing choices, and routine speech.",
    progressLabel: "4B branch",
    iconText: "\u4E0B\u96E8",
    iconColor: "#6f7fa4",
    focus: { hanzi: "\u4E0B\u96E8\u4E86\u3002", pinyin: "xi\xE0 y\u01D4 le.", english: "It is raining.", audio: "\u4E0B\u96E8\u4E86" },
    parentGuide: "This is best as a daily one-minute habit. Check the weather together and say the phrase before leaving home.",
    cultureGuide: "Weather combines nicely with clothing and seasonal culture content later.",
    activities: ["Tap to hear", "Choose today's weather", "Dress for the weather", "Listen and choose"],
    steps: [{ book: "4B", lesson: 1, title: "It's raining", note: "Start weather language with a concrete daily phrase." }]
  };

  // src/features/world/animals.js
  var animalsTopic = {
    id: "animals",
    title: "Pets & Animals",
    summary: "High-interest vocabulary that can connect to home life and stories.",
    progressLabel: "1B to 2B",
    iconText: "\u5C0F\u72D7",
    iconColor: "#8e6f9b",
    focus: { hanzi: "\u5C0F\u72D7\uFF0C\u5C0F\u732B", pinyin: "xi\u01CEo g\u01D2u, xi\u01CEo m\u0101o", english: "puppy, kitten", audio: "\u5C0F\u72D7\uFF0C\u5C0F\u732B" },
    parentGuide: "This topic works especially well with pictures and sound imitation. Keep it playful and quick.",
    cultureGuide: "Animals can later connect naturally to zodiac content and story-based culture lessons.",
    activities: ["Tap to hear", "Match picture to word", "Listen and choose", "Animal sound game"],
    steps: [
      { book: "1B", lesson: 5, title: "Pets", note: "Begin with common pet words." },
      { book: "2B", lesson: 5, title: "Animals", note: "Broaden into a larger animal set." }
    ]
  };

  // src/features/world/colours.js
  var coloursTopic = {
    id: "colours",
    title: "Colours",
    summary: "A repeated visual topic that can be practiced easily on phones and tablets.",
    progressLabel: "1B to 2A",
    iconText: "\u7EA2\u84DD",
    iconColor: "#c36f62",
    focus: { hanzi: "\u7EA2\u8272\uFF0C\u84DD\u8272\uFF0C\u9EC4\u8272", pinyin: "h\xF3ng s\xE8, l\xE1n s\xE8, hu\xE1ng s\xE8", english: "red, blue, yellow", audio: "\u7EA2\u8272\uFF0C\u84DD\u8272\uFF0C\u9EC4\u8272" },
    focusItems: [
      { id: "red", hanzi: "\u7EA2\u8272", pinyin: "h\xF3ng s\xE8", english: "red", audio: "\u7EA2\u8272" },
      { id: "blue", hanzi: "\u84DD\u8272", pinyin: "l\xE1n s\xE8", english: "blue", audio: "\u84DD\u8272" },
      { id: "yellow", hanzi: "\u9EC4\u8272", pinyin: "hu\xE1ng s\xE8", english: "yellow", audio: "\u9EC4\u8272" }
    ],
    parentGuide: "Practice with crayons, clothes, fruit, or toys. The more real and visible the better.",
    cultureGuide: "Colour topics are a natural place to add small festival and clothing connections later.",
    activities: ["Tap to hear", "Choose the colour", "Colour hunt", "Listen and point"],
    steps: [
      { book: "1B", lesson: 6, title: "Colours", note: "Start with common colour words." },
      { book: "2A", lesson: 7, title: "Colours", note: "Review and strengthen the same topic later." }
    ]
  };

  // src/features/play-hobbies/play-hobbies.js
  var hobbiesTopic = {
    id: "hobbies",
    title: "Hobbies",
    summary: "A good branch for personal expression and longer conversations later.",
    progressLabel: "2A to 4B",
    iconText: "\u559C\u6B22",
    iconColor: "#8f6988",
    focus: { hanzi: "\u6211\u559C\u6B22\u770B\u4E66\u3002", pinyin: "w\u01D2 x\u01D0 huan k\xE0n sh\u016B.", english: "I like reading.", audio: "\u6211\u559C\u6B22\u770B\u4E66" },
    parentGuide: "Choose activities the child already loves. Familiar routines make speaking practice feel much less abstract.",
    cultureGuide: "Hobbies are a nice place to introduce art, music, and cultural interests once the core language is stable.",
    activities: ["Tap to hear", "Choose what I like", "Listen and choose", "Talk about my hobby"],
    steps: [
      { book: "2A", lesson: 5, title: "I love reading", note: "Start with a simple preference pattern." },
      { book: "3B", lesson: 4, title: "Hobbies", note: "Broaden the hobby set." },
      { book: "4B", lesson: 4, title: "Hobbies", note: "Revisit hobby language." },
      { book: "4B", lesson: 7, title: "Leisure time", note: "Use hobbies in free-time language." }
    ]
  };
  var toysTopic = {
    id: "toys",
    title: "Toys",
    summary: "A focused toy and kid-transport word set that fits Book 2A well and works for quick picture-based review.",
    progressLabel: "2A toy store",
    iconText: "\u73A9\u5177",
    iconColor: "#b86f52",
    iconAccent: "#f2cb7f",
    iconTheme: "toys",
    focus: { hanzi: "\u73A9\u5177\u6C7D\u8F66\uFF0C\u706B\u8F66\uFF0C\u98DE\u673A", pinyin: "w\xE1n j\xF9 q\xEC ch\u0113, hu\u01D2 ch\u0113, f\u0113i j\u012B", english: "toy car, train, airplane", audio: "\u73A9\u5177\u6C7D\u8F66\uFF0C\u706B\u8F66\uFF0C\u98DE\u673A" },
    focusItems: [
      { id: "toy-car", hanzi: "\u73A9\u5177\u6C7D\u8F66", pinyin: "w\xE1n j\xF9 q\xEC ch\u0113", english: "toy car", audio: "\u73A9\u5177\u6C7D\u8F66" },
      { id: "train", hanzi: "\u706B\u8F66", pinyin: "hu\u01D2 ch\u0113", english: "train", audio: "\u706B\u8F66" },
      { id: "airplane", hanzi: "\u98DE\u673A", pinyin: "f\u0113i j\u012B", english: "airplane", audio: "\u98DE\u673A" },
      { id: "school-bus", hanzi: "\u6821\u8F66", pinyin: "xi\xE0o ch\u0113", english: "school bus", audio: "\u6821\u8F66" },
      { id: "subway", hanzi: "\u5730\u94C1", pinyin: "d\xEC ti\u011B", english: "subway", audio: "\u5730\u94C1" },
      { id: "toy-doll", hanzi: "\u73A9\u5177\u5A03\u5A03", pinyin: "w\xE1n j\xF9 w\xE1 wa", english: "toy doll", audio: "\u73A9\u5177\u5A03\u5A03" },
      { id: "bicycle", hanzi: "\u81EA\u884C\u8F66", pinyin: "z\xEC x\xEDng ch\u0113", english: "bicycle", audio: "\u81EA\u884C\u8F66" }
    ],
    parentGuide: "Use the child's own toy shelf first. Point, tap the card, hear the word, then ask the child to find the matching toy or vehicle.",
    cultureGuide: "This set bridges toy language and everyday transport language, so it can grow naturally into later daily-life lessons.",
    activities: ["Tap to hear", "Find the toy", "Listen and choose", "Sort toys and vehicles"],
    steps: [{ book: "2A", lesson: 4, title: "My toys", note: "Learn a core toy set with familiar child-friendly objects." }]
  };

  // src/features/foundations/body.js
  var bodyTopic = {
    id: "body",
    title: "Body",
    summary: "A visual topic that works well for touch interaction and movement.",
    progressLabel: "1B core topic",
    iconText: "\u624B\u773C",
    iconColor: "#5f8f8a",
    focus: { hanzi: "\u5934\uFF0C\u989D\u5934\uFF0C\u5934\u53D1\uFF0C\u773C\u775B\uFF0C\u8033\u6735\uFF0C\u9F3B\u5B50\uFF0C\u5634\u5DF4\uFF0C\u8116\u5B50\uFF0C\u624B\u81C2\uFF0C\u624B\uFF0C\u817F\uFF0C\u811A", pinyin: "t\xF3u, \xE9 t\xF3u, t\xF3u fa, y\u01CEn jing, \u011Br duo, b\xED zi, zu\u01D0 ba, b\xF3 zi, sh\u01D2u b\xEC, sh\u01D2u, tu\u01D0, ji\u01CEo", english: "head, forehead, hair, eyes, ears, nose, mouth, neck, arm, hand, leg, foot", audio: "\u5934\uFF0C\u989D\u5934\uFF0C\u5934\u53D1\uFF0C\u773C\u775B\uFF0C\u8033\u6735\uFF0C\u9F3B\u5B50\uFF0C\u5634\u5DF4\uFF0C\u8116\u5B50\uFF0C\u624B\u81C2\uFF0C\u624B\uFF0C\u817F\uFF0C\u811A" },
    focusItems: [
      { id: "head", hanzi: "\u5934", pinyin: "t\xF3u", english: "head", audio: "\u5934" },
      { id: "forehead", hanzi: "\u989D\u5934", pinyin: "\xE9 t\xF3u", english: "forehead", audio: "\u989D\u5934" },
      { id: "hair", hanzi: "\u5934\u53D1", pinyin: "t\xF3u fa", english: "hair", audio: "\u5934\u53D1" },
      { id: "eyes", hanzi: "\u773C\u775B", pinyin: "y\u01CEn jing", english: "eyes", audio: "\u773C\u775B" },
      { id: "ears", hanzi: "\u8033\u6735", pinyin: "\u011Br duo", english: "ears", audio: "\u8033\u6735" },
      { id: "nose", hanzi: "\u9F3B\u5B50", pinyin: "b\xED zi", english: "nose", audio: "\u9F3B\u5B50" },
      { id: "mouth", hanzi: "\u5634\u5DF4", pinyin: "zu\u01D0 ba", english: "mouth", audio: "\u5634\u5DF4" },
      { id: "neck", hanzi: "\u8116\u5B50", pinyin: "b\xF3 zi", english: "neck", audio: "\u8116\u5B50" },
      { id: "arm", hanzi: "\u624B\u81C2", pinyin: "sh\u01D2u b\xEC", english: "arm", audio: "\u624B\u81C2" },
      { id: "hand", hanzi: "\u624B", pinyin: "sh\u01D2u", english: "hand", audio: "\u624B" },
      { id: "leg", hanzi: "\u817F", pinyin: "tu\u01D0", english: "leg", audio: "\u817F" },
      { id: "foot", hanzi: "\u811A", pinyin: "ji\u01CEo", english: "foot", audio: "\u811A" }
    ],
    interactiveScene: "body-face",
    parentGuide: "Tap a body word, hear it together, then point to the same body part on yourself or on the character.",
    cultureGuide: "Body vocabulary is simple to act out, so it is a good topic for young beginners who are still building confidence.",
    activities: ["Tap word to hear", "See the body part glow", "Listen and point", "Picture matching"],
    steps: [{ book: "1B", lesson: 3, title: "Parts of the body (1)", note: "Start with the first body words." }, { book: "1B", lesson: 4, title: "Parts of the body (2)", note: "Expand and reinforce the body set." }]
  };
  var bodyDiagramLayout = { left: ["hair", "ears", "nose", "hand", "leg", "foot"], right: ["head", "forehead", "eyes", "mouth", "neck", "arm"] };
  var bodyCoreItemIds = ["head", "hair", "eyes", "ears", "nose", "mouth", "hand", "foot"];
  var bodyBonusItemIds = ["forehead", "neck", "arm", "leg"];

  // src/features/foundations/numbers.js
  var numbersTopic = {
    id: "numbers",
    title: "Numbers",
    summary: "A stage-by-stage number path that grows from first counting to real-life number use.",
    progressLabel: "1A to 4A",
    iconText: "\u4E00\u4E8C\u4E09",
    iconColor: "#be5b49",
    iconAccent: "#f3c977",
    iconTheme: "counting",
    focus: { hanzi: "\u4E00 \u4E8C \u4E09 \u56DB \u4E94", pinyin: "y\u012B, \xE8r, s\u0101n, s\xEC, w\u01D4", english: "one, two, three, four, five", audio: "\u4E00\uFF0C\u4E8C\uFF0C\u4E09\uFF0C\u56DB\uFF0C\u4E94" },
    focusItems: [
      { id: "one", hanzi: "\u4E00", pinyin: "y\u012B", english: "one", audio: "\u4E00" },
      { id: "two", hanzi: "\u4E8C", pinyin: "\xE8r", english: "two", audio: "\u4E8C" },
      { id: "three", hanzi: "\u4E09", pinyin: "s\u0101n", english: "three", audio: "\u4E09" },
      { id: "four", hanzi: "\u56DB", pinyin: "s\xEC", english: "four", audio: "\u56DB" },
      { id: "five", hanzi: "\u4E94", pinyin: "w\u01D4", english: "five", audio: "\u4E94" }
    ],
    parentGuide: "Use short rounds. Tap a number, hear it, then count real objects together like crackers, pencils, or toys.",
    cultureGuide: "Numbers connect easily to food, family, and festival routines. Counting dumplings, oranges, or mooncakes makes practice feel real.",
    activities: ["Tap to hear", "Count and say", "Match picture to number", "Listen and choose"],
    steps: [
      { book: "1A", lesson: 1, title: "Numbers (1)", note: "Learn 1-5 with first counting practice." },
      { book: "1A", lesson: 2, title: "Numbers (2)", note: "Extend to 6-10." },
      { book: "1A", lesson: 3, title: "Numbers (3)", note: "Move into 11-20." },
      { book: "2A", lesson: 1, title: "Numbers", note: "Grow to 21-40." },
      { book: "3A", lesson: 1, title: "Numbers", note: "Grow to 41-100." },
      { book: "4A", lesson: 1, title: "Telephone numbers", note: "Use numbers in a real-life format." }
    ]
  };
  var multiplicationRhymeTopic = {
    id: "multiplication-rhyme",
    title: "99 Multiplication Rhyme",
    summary: "Learn the classic Chinese multiplication lines with tap-to-hear rhythm practice.",
    progressLabel: "Special topic",
    iconText: "\u4E5D\u4E5D",
    iconColor: "#a15e45",
    iconAccent: "#f0c36d",
    iconTheme: "rhyme",
    focus: { hanzi: "\u4E5D\u4E5D\u516B\u5341\u4E00", pinyin: "ji\u01D4 ji\u01D4 b\u0101 sh\xED y\u012B", english: "9 x 9 = 81", audio: "\u4E5D\u4E5D\u516B\u5341\u4E00" },
    focusItems: [],
    interactiveScene: "multiplication-rhyme",
    parentGuide: "Use short, rhythmic repetition. Tap one line, hear it together, then repeat it with a steady beat or clap.",
    cultureGuide: "The \u4E5D\u4E5D\u4E58\u6CD5\u53E3\u8BC0 is a familiar memorization pattern in Chinese learning. It is valued because the rhythm makes multiplication facts stick.",
    activities: ["Tap line to hear", "Repeat with rhythm", "Learn one table at a time", "Build multiplication confidence"],
    steps: []
  };
  var numberEnglishBase = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty"
  ];
  var numberDigitMap = {
    0: { hanzi: "\u96F6", pinyin: "l\xEDng" },
    1: { hanzi: "\u4E00", pinyin: "y\u012B" },
    2: { hanzi: "\u4E8C", pinyin: "\xE8r" },
    3: { hanzi: "\u4E09", pinyin: "s\u0101n" },
    4: { hanzi: "\u56DB", pinyin: "s\xEC" },
    5: { hanzi: "\u4E94", pinyin: "w\u01D4" },
    6: { hanzi: "\u516D", pinyin: "li\xF9" },
    7: { hanzi: "\u4E03", pinyin: "q\u012B" },
    8: { hanzi: "\u516B", pinyin: "b\u0101" },
    9: { hanzi: "\u4E5D", pinyin: "ji\u01D4" },
    10: { hanzi: "\u5341", pinyin: "sh\xED" }
  };
  var numberStages2 = [
    {
      id: "1a-1",
      bookId: "1a",
      lesson: 1,
      title: "1 to 5",
      summary: "Start with the first counting words and match them to real objects.",
      start: 1,
      end: 5,
      practicePrompt: "Count animals, fingers, or blocks from one to five.",
      visualEmojis: ["\u{1F425}", "\u{1F430}", "\u{1F986}", "\u{1F43B}", "\u{1F438}"],
      visualLabel: "chicks"
    },
    {
      id: "1a-2",
      bookId: "1a",
      lesson: 2,
      title: "6 to 10",
      summary: "Add six to ten, while still keeping one to five warm through movement.",
      start: 6,
      end: 10,
      practicePrompt: "Clap for one to five and stamp for six to ten.",
      visualEmojis: ["\u{1F9F8}", "\u{1F697}", "\u{1FA80}", "\u{1F9E9}", "\u26BD"],
      visualLabel: "toys"
    },
    {
      id: "1a-3",
      bookId: "1a",
      lesson: 3,
      title: "11 to 20",
      summary: "Move into teen numbers with card finding, counting, and sequence work.",
      start: 11,
      end: 20,
      practicePrompt: "Point to the right number card and count objects up to twenty.",
      visualEmojis: ["\u{1F366}", "\u{1F34E}", "\u{1F353}", "\u{1F9C1}", "\u{1F34A}"],
      visualLabel: "ice creams"
    },
    {
      id: "2a-1",
      bookId: "2a",
      lesson: 1,
      title: "21 to 40",
      summary: "Grow into larger counting while keeping the tens pattern clear.",
      start: 21,
      end: 40,
      practicePrompt: "Read the tens pattern first, then add the last digit.",
      visualEmojis: ["\u{1F697}", "\u{1F68C}", "\u{1F6B2}", "\u{1F695}", "\u{1F699}"],
      visualLabel: "cars"
    },
    {
      id: "3a-1",
      bookId: "3a",
      lesson: 1,
      title: "41 to 100",
      summary: "Extend number fluency into bigger sets and longer counting runs.",
      start: 41,
      end: 100,
      practicePrompt: "Read by tens first, then slow down and notice the ones.",
      visualEmojis: ["\u2B50", "\u{1F31F}", "\u2728", "\u{1F4AB}", "\u{1FA90}"],
      visualLabel: "stars"
    },
    {
      id: "4a-1",
      bookId: "4a",
      lesson: 1,
      title: "Telephone numbers",
      summary: "Use number reading in a real-life sequence instead of isolated counting.",
      start: 0,
      end: 9,
      practicePrompt: "Say each digit clearly, one by one, in a phone-number rhythm.",
      telephoneMode: true,
      visualEmojis: ["\u260E\uFE0F", "\u{1F4DE}", "\u{1F522}", "\u{1F3A7}", "\u{1F4DF}"],
      visualLabel: "phone digits"
    }
  ];
  var telephonePractice = {
    question: {
      hanzi: "\u4F60\u7684\u7535\u8BDD\u53F7\u7801\u662F\u591A\u5C11\uFF1F",
      pinyin: "n\u01D0 de di\xE0n hu\xE0 h\xE0o m\u01CE sh\xEC du\u014D shao?",
      english: "What is your phone number?",
      audio: "\u4F60\u7684\u7535\u8BDD\u53F7\u7801\u662F\u591A\u5C11"
    },
    answer: {
      hanzi: "\u6211\u7684\u7535\u8BDD\u53F7\u7801\u662F\u516D\u516B\u4E8C\u56DB\u4E5D\u4E03\u4E09\u4E00\u4E09\u4E8C\u3002",
      pinyin: "w\u01D2 de di\xE0n hu\xE0 h\xE0o m\u01CE sh\xEC li\xF9 b\u0101 \xE8r s\xEC ji\u01D4 q\u012B s\u0101n y\u012B s\u0101n \xE8r.",
      english: "My phone number is 6824973132.",
      audio: "\u6211\u7684\u7535\u8BDD\u53F7\u7801\u662F\u516D\u516B\u4E8C\u56DB\u4E5D\u4E03\u4E09\u4E00\u4E09\u4E8C"
    },
    digits: ["\u516D", "\u516B", "\u4E8C", "\u56DB", "\u4E5D", "\u4E03", "\u4E09", "\u4E00", "\u4E09", "\u4E8C"]
  };
  function numberEnglish(value) {
    if (value <= 20) {
      return numberEnglishBase[value];
    }
    if (value < 100) {
      const tensWords = {
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety"
      };
      const tens = Math.floor(value / 10) * 10;
      const ones = value % 10;
      return ones === 0 ? tensWords[tens] : `${tensWords[tens]}-${numberEnglishBase[ones]}`;
    }
    if (value === 100) {
      return "one hundred";
    }
    return String(value);
  }
  function numberHanzi(value) {
    if (value <= 10) {
      return numberDigitMap[value].hanzi;
    }
    if (value < 20) {
      return `\u5341${numberDigitMap[value % 10].hanzi}`;
    }
    if (value < 100) {
      const tens = Math.floor(value / 10);
      const ones = value % 10;
      return ones === 0 ? `${numberDigitMap[tens].hanzi}\u5341` : `${numberDigitMap[tens].hanzi}\u5341${numberDigitMap[ones].hanzi}`;
    }
    if (value === 100) {
      return "\u4E00\u767E";
    }
    return String(value);
  }
  function numberPinyin(value) {
    if (value <= 10) {
      return numberDigitMap[value].pinyin;
    }
    if (value < 20) {
      return `sh\xED ${numberDigitMap[value % 10].pinyin}`;
    }
    if (value < 100) {
      const tens = Math.floor(value / 10);
      const ones = value % 10;
      return ones === 0 ? `${numberDigitMap[tens].pinyin} sh\xED` : `${numberDigitMap[tens].pinyin} sh\xED ${numberDigitMap[ones].pinyin}`;
    }
    if (value === 100) {
      return "y\xEC b\u01CEi";
    }
    return String(value);
  }
  function buildNumberItem(value) {
    return {
      id: `num-${value}`,
      value,
      hanzi: numberHanzi(value),
      pinyin: numberPinyin(value),
      english: numberEnglish(value),
      audio: numberHanzi(value)
    };
  }
  function buildMultiplicationRhymeItems() {
    const items = [];
    for (let first = 1; first <= 9; first += 1) {
      for (let second = first; second <= 9; second += 1) {
        const product = first * second;
        const usesDe = product < 10;
        const hanzi = usesDe ? `${numberHanzi(first)}${numberHanzi(second)}\u5F97${numberHanzi(product)}` : `${numberHanzi(first)}${numberHanzi(second)}${numberHanzi(product)}`;
        const pinyin = usesDe ? `${numberPinyin(first)} ${numberPinyin(second)} d\xE9 ${numberPinyin(product)}` : `${numberPinyin(first)} ${numberPinyin(second)} ${numberPinyin(product)}`;
        items.push({
          id: `times-${first}-${second}`,
          hanzi,
          pinyin,
          english: `${first} x ${second} = ${product}`,
          audio: hanzi,
          first,
          second,
          product
        });
      }
    }
    return items;
  }
  multiplicationRhymeTopic.focusItems = buildMultiplicationRhymeItems();

  // src/features/foundations/state.js
  function createFoundationState() {
    return {
      bodyMatchIncludeBonus: false,
      bodySelectedChineseId: null,
      bodySelectedEnglishId: null,
      bodyMatchedIds: /* @__PURE__ */ new Set(),
      bodyRoundIds: [],
      bodyChineseOrder: [],
      bodyEnglishOrder: [],
      bodyMatchUniverseKey: "",
      lastBodyFeedback: "",
      numberChallengeStageId: "",
      numberChallengeTargetValue: null,
      numberChallengeOptionValues: [],
      lastNumberFeedback: "",
      numberChallengeAdvanceTimer: null,
      mathChallengeStageId: "",
      mathChallengeOperator: "+",
      mathChallengeLeft: null,
      mathChallengeRight: null,
      mathChallengeAnswer: null,
      lastMathFeedback: "",
      mathChallengeSolved: false,
      mathChallengeInput: "",
      greetingsChallengeAnswerId: "",
      greetingsChallengeOptionIds: [],
      greetingsChallengePickedId: "",
      greetingsChallengePromptId: "",
      greetingsChallengeResult: "",
      greetingsChallengeWrongIds: /* @__PURE__ */ new Set(),
      lastGreetingsFeedback: "",
      greetingsListenFeedback: "",
      greetingsMatchFeedback: "",
      greetingsSelectedPhraseId: null,
      greetingsMatchedIds: /* @__PURE__ */ new Set(),
      greetingsPhraseOrder: [],
      greetingsMeaningOrder: [],
      familyChallengeAnswerId: "",
      familyChallengeOptionIds: [],
      familyChallengePickedId: "",
      familyChallengePromptId: "",
      familyChallengeResult: "",
      familyChallengeWrongIds: /* @__PURE__ */ new Set(),
      lastFamilyFeedback: "",
      familyListenFeedback: "",
      familyMatchFeedback: "",
      familySelectedPhraseId: null,
      familyMatchedIds: /* @__PURE__ */ new Set(),
      familyPhraseOrder: [],
      familyMeaningOrder: [],
      introductionsChallengeAnswerId: "",
      introductionsChallengeOptionIds: [],
      introductionsChallengePromptId: "",
      lastIntroductionsFeedback: "",
      introductionsBuildTargetId: "",
      introductionsBuildAvailableTokens: [],
      introductionsBuildSelectedTokens: [],
      ageChallengeAnswerId: "",
      ageChallengeOptionIds: [],
      ageChallengePromptId: "",
      lastAgeFeedback: "",
      ageBuildTargetId: "",
      ageBuildAvailableTokens: [],
      ageBuildSelectedTokens: [],
      politeChallengeAnswerId: "",
      politeChallengeOptionIds: [],
      politeChallengePickedId: "",
      politeChallengePromptId: "",
      politeChallengeResult: "",
      politeChallengeWrongIds: /* @__PURE__ */ new Set(),
      lastPoliteFeedback: "",
      politeListenFeedback: "",
      politeMatchFeedback: "",
      politeSelectedPhraseId: null,
      politeMatchedIds: /* @__PURE__ */ new Set(),
      politePhraseOrder: [],
      politeMeaningOrder: []
    };
  }

  // src/features/foundations/foundations-runtime.js
  function createFoundationsRuntime(context) {
    const { state: state2, numberHanzi: numberHanzi2, numberPinyin: numberPinyin2, buildNumberItem: buildNumberItem2, numberStages: numberStages3, telephonePractice: telephonePractice2, familyGameItemIds: familyGameItemIds2, familyPersonIdsByItemId: familyPersonIdsByItemId2, familyHeadshotsByItemId: familyHeadshotsByItemId2, familyPractice: familyPractice2, illustratedFamily: illustratedFamily2, illustratedKids: illustratedKids2, bodyBonusItemIds: bodyBonusItemIds2, bodyCoreItemIds: bodyCoreItemIds2, bodyDiagramLayout: bodyDiagramLayout2, identityConversation: identityConversation2, identityCountries: identityCountries2, identityQuestion: identityQuestion2, topicById: topicById2, focusItemsForTopic: focusItemsForTopic2, currentTopic: currentTopic2, currentNumberStage: currentNumberStage2, currentFocusItem: currentFocusItem2, currentBook: currentBook2, currentLesson: currentLesson2, shuffleArray: shuffleArray2, speak: speak2, speakSceneLines: speakSceneLines2, renderActivityPanel: renderActivityPanel2, renderFocusDisplay: renderFocusDisplay2, renderFocusExplorer: renderFocusExplorer2, renderFocusStatus: renderFocusStatus2, selectFocusItem: selectFocusItem2, focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = context;
    function numberStageItems3(stage = currentNumberStage2()) {
      const start = Math.min(stage.start, stage.end);
      const end = Math.max(stage.start, stage.end);
      const items = [];
      for (let value = start; value <= end; value += 1) {
        items.push(buildNumberItem2(value));
      }
      return items;
    }
    function resetNumberChallenge2(options = {}) {
      const stage = currentNumberStage2();
      const items = numberStageItems3(stage);
      const pool = items.map((entry) => entry.value);
      const targetValue = pool[Math.floor(Math.random() * pool.length)];
      const distractors = shuffleArray2(pool.filter((value) => value !== targetValue)).slice(
        0,
        Math.min(3, Math.max(0, pool.length - 1))
      );
      state2.numberChallengeStageId = stage.id;
      state2.numberChallengeTargetValue = targetValue;
      state2.numberChallengeOptionValues = shuffleArray2([targetValue, ...distractors]);
      state2.lastNumberFeedback = options.feedback ?? "Look carefully. Pick the number without counting from one every time.";
    }
    function ensureNumberChallenge2() {
      const stage = currentNumberStage2();
      if (state2.numberChallengeStageId !== stage.id || !state2.numberChallengeOptionValues.length) {
        resetNumberChallenge2();
      }
    }
    function resetMathChallenge2() {
      const stage = currentNumberStage2();
      const low = Math.max(1, stage.start);
      const high = Math.max(low, stage.end);
      const operator = Math.random() < 0.5 ? "+" : "-";
      let left;
      let right;
      let answer;
      if (operator === "+") {
        const additionMaxLeft = high > low ? high - 1 : high;
        left = Math.floor(Math.random() * (additionMaxLeft - low + 1)) + low;
        const maxRight = Math.max(1, high - left);
        right = Math.floor(Math.random() * maxRight) + 1;
        answer = left + right;
      } else {
        left = Math.floor(Math.random() * (high - low + 1)) + low;
        right = Math.floor(Math.random() * (left + 1));
        answer = left - right;
      }
      state2.mathChallengeStageId = stage.id;
      state2.mathChallengeOperator = operator;
      state2.mathChallengeLeft = left;
      state2.mathChallengeRight = right;
      state2.mathChallengeAnswer = answer;
      state2.lastMathFeedback = "Type the answer, then check it.";
      state2.mathChallengeSolved = false;
      state2.mathChallengeInput = "";
    }
    function ensureMathChallenge2() {
      const stage = currentNumberStage2();
      if (state2.mathChallengeStageId !== stage.id || state2.mathChallengeAnswer === null) {
        resetMathChallenge2();
      }
    }
    function familyGameItems2() {
      const familyTopic2 = topicById2("family");
      return familyGameItemIds2.map((id) => familyTopic2?.focusItems.find((item) => item.id === id)).filter(Boolean);
    }
    function familyPersonForItemId2(itemId) {
      const personId = familyPersonIdsByItemId2[itemId];
      return {
        dad: illustratedFamily2.dad,
        mom: illustratedFamily2.mom,
        "older-brother": { ...illustratedKids2.yangyang, label: "Older brother" },
        "younger-brother": { ...illustratedKids2.lele, label: "Younger brother" },
        "older-sister": { ...illustratedKids2.anan, label: "Older sister" },
        "younger-sister": { ...illustratedKids2.meimei, label: "Younger sister" }
      }[personId] ?? null;
    }
    function familyHeadshotForItemId2(itemId) {
      return familyHeadshotsByItemId2[itemId] ?? null;
    }
    function isFamilySentenceItemId2(itemId) {
      return ["parents-love-me", "i-love-dad", "i-love-mom"].includes(itemId);
    }
    function familyBookWordItems2() {
      return focusItemsForTopic2(topicById2("family")).filter((item) => !isFamilySentenceItemId2(item.id));
    }
    const lessonTemplateTopicIds = /* @__PURE__ */ new Set(["greetings", "polite-words", "introductions", "age", "family"]);
    function usesLessonTemplate2(topic) {
      return lessonTemplateTopicIds.has(topic.id);
    }
    function bookWordItemsForTopic2(topic) {
      if (topic.id === "family") {
        return familyBookWordItems2();
      }
      return focusItemsForTopic2(topic);
    }
    function usefulNoteForTopic2(topic) {
      const notes = {
        greetings: `
      <p class="greetings-note-hanzi">\u4F60 and \u60A8</p>
      <p class="greetings-note-copy">
        <strong>\u4F60</strong> is the everyday word for \u201Cyou.\u201D <strong>\u60A8</strong> is the polite form, often used for teachers and other adults to show respect.
      </p>
      <p class="greetings-note-copy">
        <strong>\u8001\u5E08</strong> means \u201Cteacher,\u201D so <strong>\u674E\u8001\u5E08\uFF0C\u60A8\u597D\uFF01</strong> sounds warm and respectful.
      </p>
    `,
        "polite-words": `
      <p class="greetings-note-hanzi">\u8C22\u8C22 / \u4E0D\u5BA2\u6C14 / \u5BF9\u4E0D\u8D77 / \u6CA1\u5173\u7CFB</p>
      <p class="greetings-note-copy">
        <strong>\u8C22\u8C22\u4F60</strong> means \u201Cthank you,\u201D and <strong>\u4E0D\u5BA2\u6C14</strong> is the kind reply: \u201Cyou\u2019re welcome.\u201D
      </p>
      <p class="greetings-note-copy">
        <strong>\u5BF9\u4E0D\u8D77</strong> means \u201CI\u2019m sorry,\u201D and <strong>\u6CA1\u5173\u7CFB</strong> is the calm reply: \u201Cnever mind\u201D or \u201Cthat\u2019s okay.\u201D
      </p>
      <p class="greetings-note-copy">
        <strong>\u8BF7</strong> helps children sound polite in requests and classroom directions, for example:
        <strong>\u8BF7\u5B89\u9759\u3002</strong>
      </p>
    `,
        introductions: `
      <p class="greetings-note-hanzi">\u6211 / \u53EB / \u4EC0\u4E48 / \u540D\u5B57</p>
      <p class="greetings-note-copy">
        <strong>\u6211</strong> means \u201CI\u201D or \u201Cme,\u201D and <strong>\u53EB</strong> is used in beginner Chinese to say what someone is called.
      </p>
      <p class="greetings-note-copy">
        <strong>\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F</strong> means \u201CWhat is your name?\u201D and <strong>\u6211\u53EB\u2026\u2026</strong> gives the answer pattern: \u201CMy name is\u2026\u201D
      </p>
      <p class="greetings-note-copy">
        Let children pause after <strong>\u6211\u53EB</strong> and say their own name out loud.
      </p>
    `,
        age: `
      <p class="greetings-note-hanzi">\u4F60\u51E0\u5C81\uFF1F / \u6211...\u5C81\u3002 / \u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F / \u6211\u4E0A\u4E00\u5E74\u7EA7\u3002</p>
      <p class="greetings-note-copy">
        <strong>\u4F60\u51E0\u5C81\uFF1F</strong> literally means \u201Cyou how-many years old?\u201D Here, <strong>\u51E0</strong> asks for a small number, and <strong>\u5C81</strong> is the common word for a child's age.
      </p>
      <p class="greetings-note-copy">
        The answer pattern stays simple: <strong>\u6211 + number + \u5C81</strong>. So <strong>\u6211\u4E94\u5C81</strong> is \u201CI am five years old,\u201D <strong>\u6211\u516D\u5C81</strong> is \u201CI am six years old,\u201D and <strong>\u6211\u4E03\u5C81</strong> is \u201CI am seven years old.\u201D
      </p>
      <p class="greetings-note-copy">
        <strong>\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F</strong> asks what school year someone is in, and <strong>\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002</strong> means \u201CI am in first grade.\u201D This topic links naturally with earlier self-introduction language: <strong>\u4F60\u597D\uFF01\u4F60\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F\u6211\u53EB\u2026\u2026 \u4F60\u51E0\u5C81\uFF1F\u6211\u4E94\u5C81\u3002\u4F60\u4E0A\u51E0\u5E74\u7EA7\uFF1F\u6211\u4E0A\u4E00\u5E74\u7EA7\u3002</strong>
      </p>
    `,
        family: `
      <p class="greetings-note-hanzi">\u7238\u7238 / \u5988\u5988 / \u54E5\u54E5 / \u5F1F\u5F1F / \u59D0\u59D0 / \u59B9\u59B9</p>
      <p class="greetings-note-copy">
        In sentences like <strong>\u6211\u7231\u7238\u7238</strong> and <strong>\u6211\u7231\u5988\u5988</strong>, the family word names who the child loves. <strong>\u6211</strong> names the speaker, and <strong>\u7231</strong> names the feeling.
      </p>
      <p class="greetings-note-copy">
        <strong>\u54E5\u54E5</strong> and <strong>\u5F1F\u5F1F</strong> are the brother pair: older brother, then younger brother. <strong>\u59D0\u59D0</strong> and <strong>\u59B9\u59B9</strong> are the sister pair: older sister, then younger sister.
      </p>
      <p class="greetings-note-copy">
        In listening practice, the repeated family word is the anchor. For sisters, <strong>\u59D0\u59D0</strong> and <strong>\u59B9\u59B9</strong> both use <strong>\u5973</strong>, so children can group the two sister words together.
      </p>
    `
      };
      return notes[topic.id] ?? "";
    }
    function familyWordForPersonId2(personId) {
      return {
        mom: "\u5988\u5988",
        dad: "\u7238\u7238",
        "older-brother": "\u54E5\u54E5",
        "younger-brother": "\u5F1F\u5F1F",
        "older-sister": "\u59D0\u59D0",
        "younger-sister": "\u59B9\u59B9"
      }[personId] ?? "";
    }
    function resetFamilyChallenge2(options = {}) {
      const items = familyGameItems2();
      if (!items.length) {
        return;
      }
      const answer = items[Math.floor(Math.random() * items.length)];
      const distractors = shuffleArray2(items.filter((item) => item.id !== answer.id)).slice(
        0,
        Math.min(3, Math.max(0, items.length - 1))
      );
      state2.familyChallengeAnswerId = answer.id;
      state2.familyChallengePickedId = "";
      state2.familyChallengePromptId = answer.id;
      state2.familyChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.familyChallengeResult = "";
      state2.familyChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.familyListenFeedback = options.feedback ?? "";
      state2.lastFamilyFeedback = state2.familyListenFeedback;
    }
    function ensureFamilyChallenge2() {
      if (!state2.familyChallengeAnswerId || !state2.familyChallengeOptionIds.length) {
        resetFamilyChallenge2();
      }
    }
    function resetListenChallengeResult2(challengeKey) {
      state2[`${challengeKey}ChallengePickedId`] = "";
      state2[`${challengeKey}ChallengeResult`] = "";
      state2[`${challengeKey}ChallengeWrongIds`] = /* @__PURE__ */ new Set();
    }
    function handleFamilyChallengePlay2() {
      ensureFamilyChallenge2();
      const item = familyGameItems2().find((entry) => entry.id === state2.familyChallengePromptId);
      if (!item) {
        return;
      }
      resetListenChallengeResult2("family");
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.familyListenFeedback = `Listen again and find ${item.hanzi}.`;
      state2.lastFamilyFeedback = state2.familyListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handleFamilyChallengeGuess2(itemId) {
      ensureFamilyChallenge2();
      const answer = familyGameItems2().find((entry) => entry.id === state2.familyChallengeAnswerId);
      const picked = familyGameItems2().find((entry) => entry.id === itemId);
      if (!answer || !picked) {
        return;
      }
      if (itemId === answer.id) {
        state2.selectedFocusItemId = answer.id;
        state2.familyChallengePickedId = itemId;
        state2.familyChallengeResult = "correct";
        if (state2.tapAudioEnabled) {
          speak2(answer.audio, 0.78);
        }
        state2.familyListenFeedback = "Nice listening.";
        state2.lastFamilyFeedback = state2.familyListenFeedback;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.familyChallengePickedId = itemId;
      state2.familyChallengeResult = "wrong";
      state2.familyChallengeWrongIds = /* @__PURE__ */ new Set([...state2.familyChallengeWrongIds, itemId]);
      state2.familyListenFeedback = "Not that one. Try another card.";
      state2.lastFamilyFeedback = state2.familyListenFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function resetFamilyMatchGame2() {
      const items = familyGameItems2();
      state2.familySelectedPhraseId = null;
      state2.familyMatchedIds = /* @__PURE__ */ new Set();
      state2.familyPhraseOrder = shuffleArray2(items.map((item) => item.id));
      state2.familyMeaningOrder = shuffleArray2(items.map((item) => item.id));
      state2.familyMatchFeedback = "";
      state2.lastFamilyFeedback = state2.familyMatchFeedback;
    }
    function ensureFamilyMatchGame2() {
      const items = familyGameItems2();
      if (!state2.familyPhraseOrder.length || state2.familyPhraseOrder.length !== items.length || state2.familyMeaningOrder.length !== items.length) {
        resetFamilyMatchGame2();
      }
    }
    function handleFamilyMatchPhrase2(itemId) {
      const item = familyGameItems2().find((entry) => entry.id === itemId);
      if (!item || state2.familyMatchedIds.has(itemId)) {
        return;
      }
      state2.familySelectedPhraseId = itemId;
      if (state2.tapAudioEnabled) {
        speak2(item.audio, 0.78);
      }
      state2.familyMatchFeedback = `Now find who matches ${item.hanzi}.`;
      state2.lastFamilyFeedback = state2.familyMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function handleFamilyMatchAttempt2(targetId) {
      if (!state2.familySelectedPhraseId || state2.familyMatchedIds.has(targetId)) {
        return;
      }
      const selectedId = state2.familySelectedPhraseId;
      const selectedItem = familyGameItems2().find((entry) => entry.id === selectedId);
      if (!selectedItem) {
        return;
      }
      if (selectedId === targetId) {
        state2.familyMatchedIds = /* @__PURE__ */ new Set([...state2.familyMatchedIds, targetId]);
        state2.familySelectedPhraseId = null;
        state2.familyMatchFeedback = "Matched.";
        state2.lastFamilyFeedback = state2.familyMatchFeedback;
        state2.selectedFocusItemId = selectedItem.id;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusExplorer2();
        renderFocusStatus2();
        if (state2.familyMatchedIds.size === familyGameItems2().length) {
          state2.familyMatchFeedback = "All family members matched.";
          state2.lastFamilyFeedback = state2.familyMatchFeedback;
        }
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.familyMatchFeedback = "Try a different family member.";
      state2.lastFamilyFeedback = state2.familyMatchFeedback;
      renderActivityPanel2(currentTopic2());
    }
    function mathChallengeAudioText2() {
      if (state2.mathChallengeAnswer === null) {
        return "";
      }
      const chineseOperator = state2.mathChallengeOperator === "+" ? "\u52A0" : "\u51CF";
      return `${numberHanzi2(state2.mathChallengeLeft)}${chineseOperator}${numberHanzi2(state2.mathChallengeRight)}\u7B49\u4E8E${numberHanzi2(state2.mathChallengeAnswer)}`;
    }
    function handleMathChallengeSubmit2(rawValue) {
      ensureMathChallenge2();
      if (state2.mathChallengeSolved) {
        return;
      }
      const trimmed = rawValue.trim();
      state2.mathChallengeInput = trimmed;
      const answer = Number(trimmed);
      const audioText = mathChallengeAudioText2();
      if (!Number.isFinite(answer)) {
        state2.lastMathFeedback = "Type one number first.";
        renderActivityPanel2(currentTopic2());
        return;
      }
      if (answer === state2.mathChallengeAnswer) {
        if (state2.tapAudioEnabled && audioText) {
          speak2(audioText, 0.78);
        }
        state2.lastMathFeedback = `Correct! ${audioText}`;
        state2.mathChallengeSolved = true;
      } else {
        state2.lastMathFeedback = "Try again.";
      }
      renderActivityPanel2(currentTopic2());
    }
    function handleNumberChallengeGuess2(value) {
      ensureNumberChallenge2();
      const target = state2.numberChallengeTargetValue;
      const targetItem = buildNumberItem2(target);
      if (value === target) {
        state2.selectedFocusItemId = targetItem.id;
        if (state2.tapAudioEnabled) {
          speak2(targetItem.audio, 0.78);
        }
        state2.lastNumberFeedback = `Correct! ${targetItem.hanzi} is right. Here comes a new round.`;
        renderFocusDisplay2(currentFocusItem2());
        renderFocusWordList();
        renderFocusStatus2();
        if (state2.numberChallengeAdvanceTimer) {
          window.clearTimeout(state2.numberChallengeAdvanceTimer);
        }
        state2.numberChallengeAdvanceTimer = window.setTimeout(() => {
          resetNumberChallenge2();
          renderFocusExplorer2();
          renderActivityPanel2(currentTopic2());
          renderFocusStatus2();
          state2.numberChallengeAdvanceTimer = null;
        }, 700);
        return;
      }
      state2.lastNumberFeedback = `Try again. This group is ${targetItem.hanzi}, not ${buildNumberItem2(value).hanzi}.`;
      renderFocusStatus2();
    }
    function bodyMatchItems2() {
      const ids = state2.bodyMatchIncludeBonus ? [...bodyCoreItemIds2, ...bodyBonusItemIds2] : bodyCoreItemIds2;
      const bodyTopic2 = topicById2("body");
      return ids.map((id) => bodyTopic2?.focusItems.find((item) => item.id === id)).filter(Boolean);
    }
    function nextBodyRound2() {
      const allIds = bodyMatchItems2().map((item) => item.id);
      const remaining = allIds.filter((id) => !state2.bodyMatchedIds.has(id));
      state2.bodySelectedChineseId = null;
      state2.bodySelectedEnglishId = null;
      state2.bodyRoundIds = shuffleArray2(remaining).slice(0, Math.min(3, remaining.length));
      state2.bodyChineseOrder = shuffleArray2(state2.bodyRoundIds);
      state2.bodyEnglishOrder = shuffleArray2(state2.bodyRoundIds);
    }
    function resetBodyMatchGame2() {
      state2.bodyMatchedIds = /* @__PURE__ */ new Set();
      state2.bodyMatchUniverseKey = bodyMatchItems2().map((item) => item.id).sort().join("|");
      nextBodyRound2();
      state2.lastBodyFeedback = "Match the Chinese words with the English words.";
    }
    function ensureBodyMatchGame2() {
      const ids = bodyMatchItems2().map((item) => item.id).sort().join("|");
      if (!state2.bodyRoundIds.length || state2.bodyMatchUniverseKey !== ids) {
        resetBodyMatchGame2();
      }
    }
    function handleBodyMatchChinese2(itemId) {
      state2.bodySelectedChineseId = itemId;
      state2.bodySelectedEnglishId = null;
      selectFocusItem2(itemId, {
        playAudio: true,
        bodyFeedback: "Now tap the matching English word."
      });
    }
    function handleBodyMatchAttempt2(englishId, chineseId = state2.bodySelectedChineseId) {
      const itemsById = Object.fromEntries(bodyMatchItems2().map((item) => [item.id, item]));
      if (!chineseId) {
        state2.bodySelectedEnglishId = englishId;
        state2.lastBodyFeedback = "Tap a Chinese word first.";
        renderFocusExplorer2();
        renderFocusStatus2();
        return;
      }
      state2.bodySelectedEnglishId = englishId;
      if (englishId === chineseId) {
        state2.bodyMatchedIds.add(englishId);
        state2.bodySelectedChineseId = null;
        state2.bodySelectedEnglishId = null;
        selectFocusItem2(englishId, {
          playAudio: state2.tapAudioEnabled,
          bodyFeedback: `Nice match! ${itemsById[englishId].hanzi} means ${itemsById[englishId].english}.`
        });
        const roundComplete = state2.bodyRoundIds.every((id) => state2.bodyMatchedIds.has(id));
        if (roundComplete) {
          const total = bodyMatchItems2().length;
          const allDone = state2.bodyMatchedIds.size === total;
          state2.lastBodyFeedback = allDone ? "Great job! You matched all the words." : "Round complete! Tap Next set for the next words.";
          renderFocusExplorer2();
          renderFocusStatus2();
        }
        return;
      }
      state2.lastBodyFeedback = `Try again. ${itemsById[chineseId].hanzi} is not ${itemsById[englishId].english}.`;
      renderFocusExplorer2();
      renderFocusStatus2();
    }
    function numberWordListItems2(items, currentItem, stage) {
      if (stage.end <= 10) {
        return items;
      }
      const byValue = [...items].sort((left, right) => left.value - right.value);
      const currentIndex = Math.max(
        0,
        byValue.findIndex((item) => item.id === currentItem.id)
      );
      const picked = /* @__PURE__ */ new Map([[currentItem.id, currentItem]]);
      const offsets = [-1, 1, -2, 2];
      offsets.forEach((offset) => {
        const candidate = byValue[currentIndex + offset];
        if (candidate && picked.size < 5) {
          picked.set(candidate.id, candidate);
        }
      });
      if (picked.size < Math.min(5, byValue.length)) {
        shuffleArray2(byValue).forEach((candidate) => {
          if (picked.size < Math.min(5, byValue.length)) {
            picked.set(candidate.id, candidate);
          }
        });
      }
      return shuffleArray2([...picked.values()]);
    }
    function renderBodyLabelButton2(item, align) {
      const isActive = item.id === state2.selectedFocusItemId;
      return `
    <button
      class="body-label-button${isActive ? " is-active" : " is-muted"}"
      type="button"
      data-body-item-id="${item.id}"
      data-body-align="${align}"
      aria-pressed="${isActive ? "true" : "false"}"
    >
      <span class="body-label-hanzi">${item.hanzi}</span>
      ${state2.showPinyin ? `<span class="body-label-pinyin">${item.pinyin}</span>` : ""}
      ${state2.showEnglish ? `<span class="body-label-english">${item.english}</span>` : ""}
    </button>
  `;
    }
    function renderBodyExplorer2() {
      ensureBodyMatchGame2();
      const item = currentFocusItem2();
      const sentence = bodySentenceForItem(item);
      const items = Object.fromEntries(focusItemsForTopic2().map((entry) => [entry.id, entry]));
      const matchItems = Object.fromEntries(bodyMatchItems2().map((entry) => [entry.id, entry]));
      const roundComplete = state2.bodyRoundIds.length > 0 && state2.bodyRoundIds.every((id) => state2.bodyMatchedIds.has(id));
      const allDone = bodyMatchItems2().length > 0 && state2.bodyMatchedIds.size === bodyMatchItems2().length;
      const solvedMatchIds = state2.bodyChineseOrder.filter((id) => state2.bodyMatchedIds.has(id));
      const remainingChineseIds = state2.bodyChineseOrder.filter((id) => !state2.bodyMatchedIds.has(id));
      const remainingEnglishIds = state2.bodyEnglishOrder.filter((id) => !state2.bodyMatchedIds.has(id));
      focusExplorer2.innerHTML = `
    <div class="body-game">
      <div class="body-practice-visual">
        <div class="body-diagram">
          <div class="body-label-column body-label-column-left">
            ${bodyDiagramLayout2.left.map((id) => renderBodyLabelButton2(items[id], "left")).join("")}
          </div>
          <div class="body-scene">
            <div class="body-scene-card">
              <img
                class="body-scene-kid"
                src="assets/body/body-topic-kid-largehead.webp"
                alt="Cartoon child for body parts learning activity"
              />
              <div class="body-part-indicator body-part-indicator-${item.id}" aria-hidden="true"></div>
            </div>
          </div>
          <div class="body-label-column body-label-column-right">
            ${bodyDiagramLayout2.right.map((id) => renderBodyLabelButton2(items[id], "right")).join("")}
          </div>
        </div>
        <div class="body-match-panel">
          <div class="body-match-heading">
            <div>
              <p class="body-match-kicker">Match Game</p>
              <h4>Chinese to English</h4>
            </div>
            <div class="body-match-actions">
              <button class="small-button is-action-button" type="button" data-body-toggle-bonus aria-pressed="${state2.bodyMatchIncludeBonus}">
                Bonus words ${state2.bodyMatchIncludeBonus ? "on" : "off"}
              </button>
              <button class="small-button is-action-button" type="button" data-body-reset-match>
                New mix
              </button>
            </div>
          </div>
          <p class="body-match-helper">Tap a Chinese card, then tap the matching English card.</p>
          <div class="body-match-progress">
            Matched ${state2.bodyMatchedIds.size} of ${bodyMatchItems2().length}
          </div>
          <div class="body-match-board-headings">
            <p class="body-match-kicker">Chinese</p>
            <p class="body-match-kicker">English</p>
          </div>
          ${solvedMatchIds.length ? `
                <div class="body-match-solved-pairs">
                  ${solvedMatchIds.map((id) => {
        const matchItem = matchItems[id];
        return `
                        <article class="body-match-solved-row">
                          <div class="body-match-card body-match-card-chinese is-solved">
                            <span class="answer-result-mark" aria-hidden="true">\u2713</span>
                            <span class="body-match-hanzi">${matchItem.hanzi}</span>
                            ${state2.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                          </div>
                          <div class="body-match-card body-match-card-english is-solved">
                            <span class="answer-result-mark" aria-hidden="true">\u2713</span>
                            <span class="body-match-english">${matchItem.english}</span>
                          </div>
                        </article>
                      `;
      }).join("")}
                </div>
              ` : ""}
          ${remainingChineseIds.length ? `
                <div class="body-match-open-board">
                  <div class="body-match-column">
                    ${remainingChineseIds.map((id) => {
        const matchItem = matchItems[id];
        const selected = state2.bodySelectedChineseId === id;
        return `
                  <button
                    class="body-match-card body-match-card-chinese${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-chinese="${id}"
                  >
                    <span class="body-match-hanzi">${matchItem.hanzi}</span>
                    ${state2.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                  </button>
                `;
      }).join("")}
                  </div>
                  <div class="body-match-column">
                    ${remainingEnglishIds.map((id) => {
        const matchItem = matchItems[id];
        if (!matchItem) {
          return "";
        }
        const solved = state2.bodyMatchedIds.has(id);
        const selected = state2.bodySelectedEnglishId === id;
        return `
                  <button
                    class="body-match-card body-match-card-english${solved ? " is-solved" : ""}${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-english="${id}"
                  >
                    <span class="body-match-english">${matchItem.english}</span>
                  </button>
                `;
      }).join("")}
                  </div>
                </div>
              ` : ""}
          ${roundComplete && !allDone ? '<button class="small-button body-next-round" type="button" data-body-next-round>Next set</button>' : ""}
          ${allDone ? '<button class="small-button body-next-round" type="button" data-body-play-again>Play again</button>' : ""}
        </div>
        <div class="body-more-practice-card">
          <p class="body-match-kicker">More Practice</p>
          <h4>Say it with \u6211\u7684</h4>
          <p class="body-sentence-hanzi">${sentence.hanzi}</p>
          ${state2.showPinyin ? `<p class="body-sentence-pinyin">${sentence.pinyin}</p>` : ""}
          ${state2.showEnglish ? `<p class="body-sentence-english">${sentence.english}</p>` : ""}
          <p class="body-sentence-note">Tap a body word, then say the whole phrase aloud.</p>
          <div class="body-sentence-examples">
            ${["eyes", "ears", "nose", "mouth", "head", "hair", "hand", "foot"].map((id) => {
        const practiceItem = items[id];
        const practiceSentence = bodySentenceForItem(practiceItem);
        const isActivePractice = item.id === id;
        return `
                  <button
                    class="body-sentence-chip${isActivePractice ? " is-active" : ""}"
                    type="button"
                    data-body-sentence-item="${id}"
                  >
                    ${practiceSentence.hanzi}
                  </button>
                `;
      }).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-body-item-id]").forEach((button) => {
        button.addEventListener("click", () => {
          selectFocusItem2(button.dataset.bodyItemId, { playAudio: true });
        });
      });
      focusExplorer2.querySelectorAll("[data-body-sentence-item]").forEach((button) => {
        button.addEventListener("click", () => {
          const sentenceItemId = button.dataset.bodySentenceItem;
          const sentenceItem = items[sentenceItemId];
          if (!sentenceItem) {
            return;
          }
          selectFocusItem2(sentenceItemId, {
            playAudio: true,
            audioText: bodySentenceForItem(sentenceItem).hanzi,
            bodyFeedback: `Practice saying ${bodySentenceForItem(sentenceItem).hanzi}.`
          });
        });
      });
      focusExplorer2.querySelector("[data-body-toggle-bonus]")?.addEventListener("click", () => {
        state2.bodyMatchIncludeBonus = !state2.bodyMatchIncludeBonus;
        resetBodyMatchGame2();
        renderFocusExplorer2();
        renderFocusStatus2();
      });
      focusExplorer2.querySelector("[data-body-reset-match]")?.addEventListener("click", () => {
        resetBodyMatchGame2();
        renderFocusExplorer2();
        renderFocusStatus2();
      });
      focusExplorer2.querySelector("[data-body-next-round]")?.addEventListener("click", () => {
        nextBodyRound2();
        state2.lastBodyFeedback = "Here is the next set.";
        renderFocusExplorer2();
        renderFocusStatus2();
      });
      focusExplorer2.querySelector("[data-body-play-again]")?.addEventListener("click", () => {
        resetBodyMatchGame2();
        renderFocusExplorer2();
        renderFocusStatus2();
      });
      focusExplorer2.querySelectorAll("[data-body-match-chinese]").forEach((button) => {
        button.addEventListener("click", () => {
          handleBodyMatchChinese2(button.dataset.bodyMatchChinese);
        });
      });
      focusExplorer2.querySelectorAll("[data-body-match-english]").forEach((button) => {
        button.addEventListener("click", () => {
          handleBodyMatchAttempt2(button.dataset.bodyMatchEnglish);
        });
      });
    }
    function renderNumberVisual2(value, stage) {
      if (value === 0) {
        return '<p class="numbers-visual-note">Start with zero for phone-number reading.</p>';
      }
      const emojis = stage.visualEmojis?.length ? stage.visualEmojis : ["\u2B50"];
      const chosenEmoji = emojis[(Math.max(value, 1) - 1) % emojis.length];
      const objectMarkup = (count) => Array.from(
        { length: count },
        () => `<span class="numbers-object">${chosenEmoji}</span>`
      ).join("");
      if (value <= 20) {
        const groups = [];
        let remaining = value;
        while (remaining > 0) {
          groups.push(Math.min(5, remaining));
          remaining -= 5;
        }
        return groups.map(
          (count) => `
          <div class="numbers-object-group">
            ${objectMarkup(count)}
          </div>
        `
        ).join("");
      }
      const tens = Math.floor(value / 10);
      const ones = value % 10;
      return `
    <div class="numbers-bundle-row">
      ${Array.from(
        { length: tens },
        () => `
          <div class="numbers-bundle-card">
            <span class="numbers-bundle-emoji">${chosenEmoji}</span>
            <span class="numbers-bundle-count">\xD7 10</span>
          </div>
        `
      ).join("")}
    </div>
    ${ones ? `
          <div class="numbers-object-group">
            ${objectMarkup(ones)}
          </div>
        ` : ""}
  `;
    }
    function renderNumbersExplorer2() {
      ensureNumberChallenge2();
      const stage = currentNumberStage2();
      if (stage.telephoneMode) {
        renderTelephoneExplorer2(stage);
        return;
      }
      const item = currentFocusItem2();
      focusExplorer2.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="numbers-showcase-card">
        <div class="numbers-showcase-copy">
          <p class="body-match-kicker">Current number</p>
          <div class="numbers-current-line">
            <p class="numbers-hanzi">${item.hanzi}</p>
            <p class="numbers-arabic${state2.showArabic ? "" : " is-hidden"}">${item.value}</p>
          </div>
        </div>
        <div class="numbers-count-board">
          ${renderNumberVisual2(item.value, stage)}
        </div>
      </div>
    </div>
  `;
    }
    function renderTelephoneExplorer2(stage) {
      focusExplorer2.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="telephone-scene-card">
        <div class="telephone-scene-people">
          <article class="telephone-bubble telephone-bubble-question">
            <div class="telephone-figure-card telephone-figure-card-left" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids2.anan.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Ask</p>
              <p class="telephone-line-hanzi">${telephonePractice2.question.hanzi}</p>
              ${state2.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice2.question.pinyin}</p>` : ""}
              ${state2.showEnglish ? `<p class="telephone-line-english">${telephonePractice2.question.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="question">Play audio</button>
            </div>
          </article>
          <article class="telephone-bubble telephone-bubble-answer">
            <div class="telephone-figure-card telephone-figure-card-right" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids2.tiantian.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Answer</p>
              <p class="telephone-line-hanzi">${telephonePractice2.answer.hanzi}</p>
              ${state2.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice2.answer.pinyin}</p>` : ""}
              ${state2.showEnglish ? `<p class="telephone-line-english">${telephonePractice2.answer.english}</p>` : ""}
              <button class="small-button is-action-button" type="button" data-telephone-play="answer">Play audio</button>
            </div>
          </article>
        </div>
        <div class="telephone-number-strip">
          <p class="body-match-kicker">Listen to the digits</p>
          <div class="telephone-digit-row">
            ${telephonePractice2.digits.map(
        (digit) => `
                  <button class="telephone-digit-chip" type="button" data-telephone-digit="${digit}">
                    ${digit}
                  </button>
                `
      ).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-telephone-play]").forEach((button) => {
        button.addEventListener("click", () => {
          const line = button.dataset.telephonePlay === "question" ? telephonePractice2.question : telephonePractice2.answer;
          if (state2.tapAudioEnabled) {
            speak2(line.audio, 0.78);
          }
          focusStatus2.textContent = button.dataset.telephonePlay === "question" ? "Listen to the question first, then listen for the answer." : "Listen to the answer and notice how each digit is said one by one.";
        });
      });
      focusExplorer2.querySelectorAll("[data-telephone-digit]").forEach((button) => {
        button.addEventListener("click", () => {
          if (state2.tapAudioEnabled) {
            speak2(button.dataset.telephoneDigit, 0.78);
          }
          focusStatus2.textContent = `Practice the digit ${button.dataset.telephoneDigit} by itself.`;
        });
      });
    }
    function renderFamilyHomeVisual2(exchange) {
      if (exchange.visual === "parents-love") {
        return `
      <div class="family-lesson-visual family-lesson-visual-love">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
      }
      if (exchange.visual === "siblings-compare") {
        return `
      <div class="family-lesson-visual family-lesson-visual-siblings">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
      }
      const roomClass = {
        "living-room": "family-room-living",
        playroom: "family-room-playroom",
        "family-visit": "family-room-visit"
      }[exchange.roomLabel] ?? "family-room-living";
      return `
    <div class="family-room ${roomClass}">
      <div class="family-room-scene-bar">
        <div class="family-room-scene-copy">
          <p class="family-room-scene-label">${exchange.sceneLabel}</p>
          <p class="family-room-scene-mood">${exchange.sceneMood}</p>
        </div>
        <div class="family-room-scene-sun" aria-hidden="true"></div>
      </div>
      <div class="family-room-backdrop">
        <div class="family-room-window">
          <div class="family-room-window-sky"></div>
          <div class="family-room-window-hill family-room-window-hill-back"></div>
          <div class="family-room-window-hill family-room-window-hill-front"></div>
        </div>
        <div class="family-room-curtain family-room-curtain-left"></div>
        <div class="family-room-curtain family-room-curtain-right"></div>
        <div class="family-room-rug"></div>
        <div class="family-room-floor-line"></div>
        <div class="family-room-furniture family-room-furniture-left"></div>
        <div class="family-room-furniture family-room-furniture-right"></div>
        <div class="family-room-decor family-room-decor-left"></div>
        <div class="family-room-decor family-room-decor-right"></div>
      </div>
      <div class="family-room-cast">
        ${exchange.cast.map((personId, index) => {
        const person = illustratedFamily2[personId];
        if (!person) {
          return "";
        }
        return `
              <article class="family-room-person family-room-person-${person.id} family-room-person-${index === 0 ? "left" : "right"}">
                <div class="family-room-callout">${familyWordForPersonId2(person.id)}</div>
                <div class="family-room-portrait">
                  <img class="family-room-image" src="${person.path}" alt="${person.label}" />
                </div>
                <div class="family-room-name">
                  <span class="family-room-name-hanzi">${familyWordForPersonId2(person.id)}</span>
                  <span class="family-room-name-english">${person.label}</span>
                </div>
              </article>
            `;
      }).join("")}
      </div>
    </div>
  `;
    }
    function renderFamilyExplorer2() {
      focusExplorer2.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Book theme: family at home</h4>
        <p>Start with \u7238\u7238\u5988\u5988\u7231\u6211, then reuse the same small word set as the child moves to \u6211\u7231\u7238\u7238, \u6211\u7231\u5988\u5988, and sibling words.</p>
      </div>
      <div class="greetings-practice-grid family-scenes-grid">
        ${familyPractice2.map(
        (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${exchange.number}</p>
                    <p class="greetings-exchange-prompt">${exchange.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-family-play-all="${exchange.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout family-scene-layout">
                  <div class="family-scene-visual">
                    ${renderFamilyHomeVisual2(exchange)}
                  </div>
                  <div class="greetings-line-stack">
                    ${exchange.lines.map(
          (line, index) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
        ).join("")}
                  </div>
                </div>
              </section>
            `
      ).join("")}
      </div>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-family-play-all]").forEach((button) => {
        button.addEventListener("click", () => {
          const exchange = familyPractice2.find((entry) => entry.id === button.dataset.familyPlayAll);
          if (!exchange || !state2.tapAudioEnabled) {
            return;
          }
          speakSceneLines2(exchange.lines);
          focusStatus2.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
        });
      });
      focusExplorer2.querySelectorAll("[data-family-word]").forEach((button) => {
        button.addEventListener("click", () => {
          selectFocusItem2(button.dataset.familyWord, { playAudio: true });
        });
      });
    }
    function renderIdentityExplorer2() {
      const selectedCountry = identityCountries2.find((country) => country.id === state2.identitySelectedCountryId);
      focusExplorer2.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div>
            <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
            <p class="greetings-exchange-prompt">Countries and languages</p>
          </div>
          <button class="small-button is-action-button" type="button" data-identity-play-scene>Play scene</button>
        </div>
        <div class="greetings-scene-layout">
          <div class="greetings-scene-visual">
            <img class="greetings-scene-image" src="${identityConversation2.imagePath}" alt="${identityConversation2.imageAlt}" />
          </div>
          <div class="greetings-line-stack">
            ${identityConversation2.lines.map(
        (line) => `
                  <article class="greetings-line-card">
                    <div class="telephone-bubble-copy">
                      <p class="telephone-line-hanzi">${line.hanzi}</p>
                      ${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                      ${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                    </div>
                  </article>
                `
      ).join("")}
          </div>
        </div>
      </section>
      <section class="identity-question-section">
        <div class="identity-question-top">
          <div>
            <p class="body-match-kicker">Question</p>
            <p class="telephone-line-hanzi">${identityQuestion2.hanzi}</p>
            ${state2.showPinyin ? `<p class="telephone-line-pinyin">${identityQuestion2.pinyin}</p>` : ""}
            ${state2.showEnglish ? `<p class="telephone-line-english">${identityQuestion2.english}</p>` : ""}
          </div>
          <button class="small-button is-action-button" type="button" data-identity-play-question>Play audio</button>
        </div>
        <div class="identity-country-grid">
          ${identityCountries2.map(
        (country) => `
                <button class="identity-country-card${selectedCountry?.id === country.id ? " is-selected" : ""}" type="button" data-identity-country="${country.id}">
                  <img class="identity-flag" src="${country.asset}" alt="${country.label} flag" />
                  <span class="numbers-game-hanzi">${country.nationality}</span>
                  ${state2.showPinyin ? `<span class="numbers-game-pinyin">${country.pinyin}</span>` : ""}
                  ${state2.showEnglish ? `<span class="numbers-game-english">${country.label}</span>` : ""}
                </button>
              `
      ).join("")}
        </div>
        ${selectedCountry ? `
              <article class="greetings-line-card identity-answer-card">
                <div class="telephone-bubble-copy">
                  <p class="telephone-line-hanzi">${selectedCountry.response.hanzi}</p>
                  ${state2.showPinyin ? `<p class="telephone-line-pinyin">${selectedCountry.response.pinyin}</p>` : ""}
                  ${state2.showEnglish ? `<p class="telephone-line-english">${selectedCountry.response.english}</p>` : ""}
                </div>
              </article>
            ` : ""}
      </section>
    </div>
  `;
      focusExplorer2.querySelector("[data-identity-play-scene]")?.addEventListener("click", () => {
        if (state2.tapAudioEnabled) {
          speakSceneLines2(identityConversation2.lines);
        }
      });
      focusExplorer2.querySelector("[data-identity-play-question]")?.addEventListener("click", () => {
        if (state2.tapAudioEnabled) {
          speak2(identityQuestion2.audio, 0.78);
        }
      });
      focusExplorer2.querySelectorAll("[data-identity-country]").forEach((button) => {
        button.addEventListener("click", () => {
          const country = identityCountries2.find((entry) => entry.id === button.dataset.identityCountry);
          if (!country) {
            return;
          }
          state2.identitySelectedCountryId = country.id;
          if (state2.tapAudioEnabled) {
            speak2(country.response.audio, 0.78);
          }
          renderIdentityExplorer2();
        });
      });
    }
    return { numberStageItems: numberStageItems3, resetNumberChallenge: resetNumberChallenge2, ensureNumberChallenge: ensureNumberChallenge2, resetMathChallenge: resetMathChallenge2, ensureMathChallenge: ensureMathChallenge2, familyGameItems: familyGameItems2, familyPersonForItemId: familyPersonForItemId2, familyHeadshotForItemId: familyHeadshotForItemId2, isFamilySentenceItemId: isFamilySentenceItemId2, familyBookWordItems: familyBookWordItems2, usesLessonTemplate: usesLessonTemplate2, bookWordItemsForTopic: bookWordItemsForTopic2, usefulNoteForTopic: usefulNoteForTopic2, familyWordForPersonId: familyWordForPersonId2, resetFamilyChallenge: resetFamilyChallenge2, ensureFamilyChallenge: ensureFamilyChallenge2, resetListenChallengeResult: resetListenChallengeResult2, handleFamilyChallengePlay: handleFamilyChallengePlay2, handleFamilyChallengeGuess: handleFamilyChallengeGuess2, resetFamilyMatchGame: resetFamilyMatchGame2, ensureFamilyMatchGame: ensureFamilyMatchGame2, handleFamilyMatchPhrase: handleFamilyMatchPhrase2, handleFamilyMatchAttempt: handleFamilyMatchAttempt2, mathChallengeAudioText: mathChallengeAudioText2, handleMathChallengeSubmit: handleMathChallengeSubmit2, handleNumberChallengeGuess: handleNumberChallengeGuess2, bodyMatchItems: bodyMatchItems2, nextBodyRound: nextBodyRound2, resetBodyMatchGame: resetBodyMatchGame2, ensureBodyMatchGame: ensureBodyMatchGame2, handleBodyMatchChinese: handleBodyMatchChinese2, handleBodyMatchAttempt: handleBodyMatchAttempt2, numberWordListItems: numberWordListItems2, renderBodyLabelButton: renderBodyLabelButton2, renderBodyExplorer: renderBodyExplorer2, renderNumberVisual: renderNumberVisual2, renderNumbersExplorer: renderNumbersExplorer2, renderTelephoneExplorer: renderTelephoneExplorer2, renderFamilyHomeVisual: renderFamilyHomeVisual2, renderFamilyExplorer: renderFamilyExplorer2, renderIdentityExplorer: renderIdentityExplorer2 };
  }

  // src/features/time-daily-life/state.js
  function createTimeDailyLifeState() {
    return {
      weekdayChallengeAnswerId: "",
      weekdayChallengeOptionIds: [],
      weekdayChallengePickedId: "",
      weekdayChallengePromptId: "",
      weekdayChallengeResult: "",
      weekdayChallengeWrongIds: /* @__PURE__ */ new Set(),
      weekdayListenFeedback: "",
      weekdayMatchFeedback: "",
      weekdaySelectedPhraseId: null,
      weekdayMatchedIds: /* @__PURE__ */ new Set(),
      weekdayPhraseOrder: [],
      weekdayMeaningOrder: [],
      clothesQuizOrder: [],
      clothesQuizIndex: 0,
      clothesQuizOptionIds: [],
      clothesQuizSelectedId: "",
      clothesQuizResult: "",
      timeRoutineQuizOrder: [],
      timeRoutineQuizIndex: 0,
      timeRoutineQuizOptionIds: [],
      timeRoutineQuizSelectedId: "",
      timeRoutineQuizResult: "",
      clockQuizOrder: [],
      clockQuizIndex: 0,
      clockQuizOptionIds: [],
      clockQuizSelectedId: "",
      clockQuizResult: "",
      roomBuildOrder: [],
      roomBuildIndex: 0,
      roomBuildAvailableTokens: [],
      roomBuildSelectedTokens: [],
      roomBuildResult: "",
      dateChallengeAnswerId: "",
      dateChallengeOptionIds: [],
      dateChallengePickedId: "",
      dateChallengePromptId: "",
      dateChallengeResult: "",
      dateChallengeWrongIds: /* @__PURE__ */ new Set(),
      dateListenFeedback: "",
      dateMatchFeedback: "",
      dateSelectedPhraseId: null,
      dateMatchedIds: /* @__PURE__ */ new Set(),
      datePhraseOrder: [],
      dateEventOrder: [],
      transportBuildOrder: [],
      transportBuildIndex: 0,
      transportBuildAvailableTokens: [],
      transportBuildSelectedTokens: [],
      transportBuildResult: "",
      positionQuizOrder: [],
      positionQuizIndex: 0,
      positionQuizOptionIds: [],
      positionQuizSelectedId: "",
      positionQuizResult: "",
      comparisonBuildOrder: [],
      comparisonBuildIndex: 0,
      comparisonBuildAvailableTokens: [],
      comparisonBuildSelectedTokens: [],
      comparisonBuildResult: ""
    };
  }

  // src/features/time-daily-life/time-daily-life-runtime.js
  function createTimeDailyLifeRuntime(context) {
    const { state: state2, timeDateWeekItems: timeDateWeekItems3, timeDateClockItems: timeDateClockItems2, timeDateExpressionItems: timeDateExpressionItems2, timeDateRoutineItems: timeDateRoutineItems2, datePracticeItems: datePracticeItems2, timeDateDateItems: timeDateDateItems2, timeDateMonthItems: timeDateMonthItems2, comparisonPracticeItems: comparisonPracticeItems2, comparisonWordItems: comparisonWordItems2, positionPracticeItems: positionPracticeItems2, positionScenes: positionScenes2, clothesMatchItems: clothesMatchItems2, clothesPractice: clothesPractice2, roomScenes: roomScenes2, roomSentenceTokens: roomSentenceTokens2, transportSentenceTokens: transportSentenceTokens2, visualTopicItems: visualTopicItems2, shuffleArray: shuffleArray2, speak: speak2, speakSceneLines: speakSceneLines2, currentTopic: currentTopic2, currentBook: currentBook2, currentLesson: currentLesson2, renderActivityPanel: renderActivityPanel2, focusExplorer: focusExplorer2, focusStatus: focusStatus2 } = context;
    function resetWeekdayChallenge2(options = {}) {
      const candidates = timeDateWeekItems3.filter((item) => item.id !== options.excludeId);
      const answers = candidates.length ? candidates : timeDateWeekItems3;
      const answer = answers[Math.floor(Math.random() * answers.length)];
      const distractors = shuffleArray2(timeDateWeekItems3.filter((item) => item.id !== answer.id)).slice(0, 3);
      state2.weekdayChallengeAnswerId = answer.id;
      state2.weekdayChallengePromptId = answer.id;
      state2.weekdayChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.weekdayChallengePickedId = "";
      state2.weekdayChallengeResult = "";
      state2.weekdayChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.weekdayListenFeedback = "";
    }
    function ensureWeekdayChallenge2() {
      if (!state2.weekdayChallengeAnswerId || !state2.weekdayChallengeOptionIds.length) resetWeekdayChallenge2();
    }
    function handleWeekdayChallengePlay2() {
      ensureWeekdayChallenge2();
      const previousPromptId = state2.weekdayChallengePromptId;
      resetWeekdayChallenge2({ excludeId: previousPromptId });
      const item = timeDateWeekItems3.find((entry) => entry.id === state2.weekdayChallengePromptId);
      if (item && state2.tapAudioEnabled) speak2(`\u4ECA\u5929\u661F\u671F\u51E0\uFF1F\u4ECA\u5929${item.hanzi}\u3002`, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleWeekdayChallengeGuess2(itemId) {
      ensureWeekdayChallenge2();
      const isCorrect = itemId === state2.weekdayChallengeAnswerId;
      state2.weekdayChallengePickedId = itemId;
      state2.weekdayChallengeResult = isCorrect ? "correct" : "wrong";
      if (!isCorrect) {
        state2.weekdayChallengeWrongIds = /* @__PURE__ */ new Set([...state2.weekdayChallengeWrongIds, itemId]);
      } else if (state2.tapAudioEnabled) {
        const item = timeDateWeekItems3.find((entry) => entry.id === itemId);
        speak2(item?.hanzi, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function resetWeekdayMatchGame2() {
      state2.weekdaySelectedPhraseId = null;
      state2.weekdayMatchedIds = /* @__PURE__ */ new Set();
      state2.weekdayPhraseOrder = shuffleArray2(timeDateWeekItems3.map((item) => item.id));
      state2.weekdayMeaningOrder = shuffleArray2(timeDateWeekItems3.map((item) => item.id));
      state2.weekdayMatchFeedback = "";
    }
    function ensureWeekdayMatchGame2() {
      if (!state2.weekdayPhraseOrder.length || !state2.weekdayMeaningOrder.length) resetWeekdayMatchGame2();
    }
    function handleWeekdayMatchPhrase2(itemId) {
      if (state2.weekdayMatchedIds.has(itemId)) return;
      state2.weekdaySelectedPhraseId = itemId;
      const item = timeDateWeekItems3.find((entry) => entry.id === itemId);
      if (item && state2.tapAudioEnabled) speak2(item.hanzi, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleWeekdayMatchAttempt2(targetId) {
      if (!state2.weekdaySelectedPhraseId || state2.weekdayMatchedIds.has(targetId)) return;
      if (state2.weekdaySelectedPhraseId === targetId) {
        state2.weekdayMatchedIds = /* @__PURE__ */ new Set([...state2.weekdayMatchedIds, targetId]);
        state2.weekdaySelectedPhraseId = null;
        state2.weekdayMatchFeedback = "Matched.";
      } else {
        state2.weekdayMatchFeedback = "Try a different card.";
      }
      renderActivityPanel2(currentTopic2());
    }
    function resetClothesQuiz2() {
      const ids = clothesMatchItems2.map((item) => item.id);
      state2.clothesQuizOrder = shuffleArray2(ids);
      state2.clothesQuizIndex = 0;
      prepareClothesQuizQuestion2();
    }
    function prepareClothesQuizQuestion2() {
      const answerId = state2.clothesQuizOrder[state2.clothesQuizIndex];
      const distractorIds = shuffleArray2(clothesMatchItems2.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
      state2.clothesQuizOptionIds = shuffleArray2([answerId, ...distractorIds]);
      state2.clothesQuizSelectedId = "";
      state2.clothesQuizResult = "";
    }
    function ensureClothesQuiz2() {
      if (!state2.clothesQuizOrder.length) {
        resetClothesQuiz2();
      }
    }
    function handleClothesQuizPick2(itemId) {
      if (state2.clothesQuizResult === "correct") {
        return;
      }
      const answerId = state2.clothesQuizOrder[state2.clothesQuizIndex];
      state2.clothesQuizSelectedId = itemId;
      state2.clothesQuizResult = itemId === answerId ? "correct" : "wrong";
      if (state2.clothesQuizResult === "correct" && state2.tapAudioEnabled) {
        const answer = clothesMatchItems2.find((item) => item.id === answerId);
        speak2(answer?.audio, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function nextClothesQuizQuestion2() {
      state2.clothesQuizIndex = (state2.clothesQuizIndex + 1) % state2.clothesQuizOrder.length;
      prepareClothesQuizQuestion2();
      renderActivityPanel2(currentTopic2());
    }
    function resetTimeRoutineQuiz2() {
      state2.timeRoutineQuizOrder = shuffleArray2(timeDateRoutineItems2.map((item) => item.id));
      state2.timeRoutineQuizIndex = 0;
      prepareTimeRoutineQuizQuestion2();
    }
    function prepareTimeRoutineQuizQuestion2() {
      const answerId = state2.timeRoutineQuizOrder[state2.timeRoutineQuizIndex];
      const distractorIds = shuffleArray2(timeDateRoutineItems2.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
      state2.timeRoutineQuizOptionIds = shuffleArray2([answerId, ...distractorIds]);
      state2.timeRoutineQuizSelectedId = "";
      state2.timeRoutineQuizResult = "";
    }
    function ensureTimeRoutineQuiz2() {
      if (!state2.timeRoutineQuizOrder.length) {
        resetTimeRoutineQuiz2();
      }
    }
    function handleTimeRoutineQuizPick2(itemId) {
      if (state2.timeRoutineQuizResult === "correct") {
        return;
      }
      const answerId = state2.timeRoutineQuizOrder[state2.timeRoutineQuizIndex];
      state2.timeRoutineQuizSelectedId = itemId;
      state2.timeRoutineQuizResult = itemId === answerId ? "correct" : "wrong";
      if (state2.timeRoutineQuizResult === "correct" && state2.tapAudioEnabled) {
        const item = timeDateRoutineItems2.find((entry) => entry.id === answerId);
        speak2(item?.audio, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function nextTimeRoutineQuizQuestion2() {
      state2.timeRoutineQuizIndex = (state2.timeRoutineQuizIndex + 1) % state2.timeRoutineQuizOrder.length;
      prepareTimeRoutineQuizQuestion2();
      renderActivityPanel2(currentTopic2());
    }
    function resetClockQuiz2() {
      state2.clockQuizOrder = shuffleArray2(timeDateClockItems2.map((item) => item.id));
      state2.clockQuizIndex = 0;
      prepareClockQuizQuestion2();
    }
    function prepareClockQuizQuestion2() {
      const answerId = state2.clockQuizOrder[state2.clockQuizIndex];
      const distractorIds = shuffleArray2(timeDateClockItems2.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
      state2.clockQuizOptionIds = shuffleArray2([answerId, ...distractorIds]);
      state2.clockQuizSelectedId = "";
      state2.clockQuizResult = "";
    }
    function ensureClockQuiz2() {
      if (!state2.clockQuizOrder.length) {
        resetClockQuiz2();
      }
    }
    function handleClockQuizPick2(itemId) {
      if (state2.clockQuizResult === "correct") {
        return;
      }
      const answerId = state2.clockQuizOrder[state2.clockQuizIndex];
      state2.clockQuizSelectedId = itemId;
      state2.clockQuizResult = itemId === answerId ? "correct" : "wrong";
      if (state2.clockQuizResult === "correct" && state2.tapAudioEnabled) {
        const item = timeDateClockItems2.find((entry) => entry.id === answerId);
        if (item) speak2(`\u51E0\u70B9\u4E86\uFF1F\u73B0\u5728${item.hanzi}\u3002`, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function nextClockQuizQuestion2() {
      state2.clockQuizIndex = (state2.clockQuizIndex + 1) % state2.clockQuizOrder.length;
      prepareClockQuizQuestion2();
      renderActivityPanel2(currentTopic2());
    }
    function currentRoomBuildItem2() {
      const id = state2.roomBuildOrder[state2.roomBuildIndex];
      return roomScenes2.find((item) => item.id === id);
    }
    function resetRoomBuilder2() {
      state2.roomBuildOrder = shuffleArray2(roomScenes2.map((item) => item.id));
      state2.roomBuildIndex = 0;
      prepareRoomBuilder2();
    }
    function prepareRoomBuilder2() {
      const item = currentRoomBuildItem2();
      const tokens = roomSentenceTokens2[item?.id];
      state2.roomBuildSelectedTokens = [];
      state2.roomBuildResult = "";
      state2.roomBuildAvailableTokens = shuffleArray2([...tokens?.target ?? [], ...tokens?.distractors ?? []]);
    }
    function ensureRoomBuilder2() {
      if (!state2.roomBuildOrder.length) resetRoomBuilder2();
    }
    function isRoomBuildPrefixValid2(selected, tokens) {
      const prefix = tokens.prefix ?? [];
      if (selected.length <= prefix.length) {
        return selected.every((token, index) => token === prefix[index]);
      }
      if (!selected.slice(0, prefix.length).every((token, index) => token === prefix[index])) {
        return false;
      }
      const objects = tokens.unorderedObjects ?? [];
      const body = selected.slice(prefix.length);
      if (objects.length === 1) {
        return body.length === 1 && body[0] === objects[0];
      }
      const beforeConnectorCount = objects.length - 1;
      const chosenObjects = body.slice(0, beforeConnectorCount);
      const chosenAreUniqueObjects = chosenObjects.every((token) => objects.includes(token)) && new Set(chosenObjects).size === chosenObjects.length;
      if (body.length <= beforeConnectorCount) return chosenAreUniqueObjects;
      if (body.length === beforeConnectorCount + 1) return chosenAreUniqueObjects && body[beforeConnectorCount] === "\u548C";
      if (body.length === beforeConnectorCount + 2) {
        const finalObject = body[beforeConnectorCount + 1];
        return chosenAreUniqueObjects && body[beforeConnectorCount] === "\u548C" && objects.includes(finalObject) && !chosenObjects.includes(finalObject);
      }
      return false;
    }
    function handleRoomBuildToken2(tokenIndex) {
      if (state2.roomBuildResult === "correct") return;
      const item = currentRoomBuildItem2();
      const tokens = roomSentenceTokens2[item?.id];
      const token = state2.roomBuildAvailableTokens[tokenIndex];
      if (!token || !tokens) return;
      const selected = [...state2.roomBuildSelectedTokens, token];
      if (!isRoomBuildPrefixValid2(selected, tokens)) {
        state2.roomBuildResult = "wrong";
        state2.roomBuildSelectedTokens = [];
        state2.roomBuildAvailableTokens = shuffleArray2([...tokens.target, ...tokens.distractors]);
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.roomBuildResult = "";
      state2.roomBuildSelectedTokens = selected;
      state2.roomBuildAvailableTokens = state2.roomBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
      if (selected.length === tokens.target.length) {
        state2.roomBuildResult = "correct";
        if (state2.tapAudioEnabled) speak2(selected.join(""), 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function clearRoomBuilder2() {
      prepareRoomBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function nextRoomBuilder2() {
      state2.roomBuildIndex = (state2.roomBuildIndex + 1) % state2.roomBuildOrder.length;
      prepareRoomBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function currentTransportBuildItem2() {
      const id = state2.transportBuildOrder[state2.transportBuildIndex];
      return visualTopicItems2.transport.find((item) => item.id === id);
    }
    function resetTransportBuilder2() {
      state2.transportBuildOrder = shuffleArray2(visualTopicItems2.transport.map((item) => item.id));
      state2.transportBuildIndex = 0;
      prepareTransportBuilder2();
    }
    function prepareTransportBuilder2() {
      const item = currentTransportBuildItem2();
      const tokens = transportSentenceTokens2[item?.id];
      state2.transportBuildSelectedTokens = [];
      state2.transportBuildResult = "";
      state2.transportBuildAvailableTokens = shuffleArray2([...tokens?.target ?? [], ...tokens?.distractors ?? []]);
    }
    function ensureTransportBuilder2() {
      if (!state2.transportBuildOrder.length) resetTransportBuilder2();
    }
    function handleTransportBuildToken2(tokenIndex) {
      if (state2.transportBuildResult === "correct") return;
      const item = currentTransportBuildItem2();
      const tokens = transportSentenceTokens2[item?.id];
      const token = state2.transportBuildAvailableTokens[tokenIndex];
      if (!token || !tokens) return;
      const selected = [...state2.transportBuildSelectedTokens, token];
      const isPrefix = selected.every((entry, index) => entry === tokens.target[index]);
      if (!isPrefix) {
        state2.transportBuildResult = "wrong";
        state2.transportBuildSelectedTokens = [];
        state2.transportBuildAvailableTokens = shuffleArray2([...tokens.target, ...tokens.distractors]);
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.transportBuildResult = "";
      state2.transportBuildSelectedTokens = selected;
      state2.transportBuildAvailableTokens = state2.transportBuildAvailableTokens.filter((_, index) => index !== tokenIndex);
      if (selected.length === tokens.target.length) {
        state2.transportBuildResult = "correct";
        if (state2.tapAudioEnabled) speak2(item.audio, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function clearTransportBuilder2() {
      prepareTransportBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function nextTransportBuilder2() {
      state2.transportBuildIndex = (state2.transportBuildIndex + 1) % state2.transportBuildOrder.length;
      prepareTransportBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function resetPositionQuiz2() {
      state2.positionQuizOrder = shuffleArray2(positionPracticeItems2.map((item) => item.id));
      state2.positionQuizIndex = 0;
      preparePositionQuizQuestion2();
    }
    function preparePositionQuizQuestion2() {
      const answerId = state2.positionQuizOrder[state2.positionQuizIndex];
      const distractorIds = shuffleArray2(positionPracticeItems2.filter((item) => item.id !== answerId).map((item) => item.id)).slice(0, 3);
      state2.positionQuizOptionIds = shuffleArray2([answerId, ...distractorIds]);
      state2.positionQuizSelectedId = "";
      state2.positionQuizResult = "";
    }
    function ensurePositionQuiz2() {
      if (!state2.positionQuizOrder.length) resetPositionQuiz2();
    }
    function handlePositionQuizPlay2() {
      ensurePositionQuiz2();
      const item = positionPracticeItems2.find((entry) => entry.id === state2.positionQuizOrder[state2.positionQuizIndex]);
      if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
    }
    function handlePositionQuizPick2(itemId) {
      if (state2.positionQuizResult === "correct") return;
      const answerId = state2.positionQuizOrder[state2.positionQuizIndex];
      state2.positionQuizSelectedId = itemId;
      state2.positionQuizResult = itemId === answerId ? "correct" : "wrong";
      if (state2.positionQuizResult === "correct" && state2.tapAudioEnabled) {
        const item = positionPracticeItems2.find((entry) => entry.id === answerId);
        speak2(item?.audio, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function nextPositionQuizQuestion2() {
      state2.positionQuizIndex = (state2.positionQuizIndex + 1) % state2.positionQuizOrder.length;
      preparePositionQuizQuestion2();
      renderActivityPanel2(currentTopic2());
    }
    function currentComparisonBuildItem2() {
      const id = state2.comparisonBuildOrder[state2.comparisonBuildIndex];
      return comparisonPracticeItems2.find((item) => item.id === id);
    }
    function resetComparisonBuilder2() {
      state2.comparisonBuildOrder = shuffleArray2(comparisonPracticeItems2.map((item) => item.id));
      state2.comparisonBuildIndex = 0;
      prepareComparisonBuilder2();
    }
    function prepareComparisonBuilder2() {
      const item = currentComparisonBuildItem2();
      state2.comparisonBuildSelectedTokens = [];
      state2.comparisonBuildAvailableTokens = shuffleArray2(item?.options ?? []);
      state2.comparisonBuildResult = "";
    }
    function ensureComparisonBuilder2() {
      if (!state2.comparisonBuildOrder.length) resetComparisonBuilder2();
    }
    function handleComparisonBuildToken2(index) {
      if (state2.comparisonBuildResult === "correct") return;
      const item = currentComparisonBuildItem2();
      const token = state2.comparisonBuildAvailableTokens[index];
      if (!item || !token) return;
      const selected = [...state2.comparisonBuildSelectedTokens, token];
      if (selected.some((entry, tokenIndex) => entry !== item.target[tokenIndex])) {
        state2.comparisonBuildResult = "wrong";
        state2.comparisonBuildSelectedTokens = [];
        state2.comparisonBuildAvailableTokens = shuffleArray2(item.options);
        renderActivityPanel2(currentTopic2());
        return;
      }
      state2.comparisonBuildResult = "";
      state2.comparisonBuildSelectedTokens = selected;
      state2.comparisonBuildAvailableTokens = state2.comparisonBuildAvailableTokens.filter((_, tokenIndex) => tokenIndex !== index);
      if (selected.length === item.target.length) {
        state2.comparisonBuildResult = "correct";
        if (state2.tapAudioEnabled) speak2(`${item.before}${selected[0]}${item.between}${selected[1]}${item.after}`, 0.78);
      }
      renderActivityPanel2(currentTopic2());
    }
    function clearComparisonBuilder2() {
      prepareComparisonBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function nextComparisonBuilder2() {
      state2.comparisonBuildIndex = (state2.comparisonBuildIndex + 1) % state2.comparisonBuildOrder.length;
      prepareComparisonBuilder2();
      renderActivityPanel2(currentTopic2());
    }
    function resetDateMatchGame2() {
      const roundIds = shuffleArray2(timeDateMonthItems2.map((item) => item.id)).slice(0, 6);
      state2.dateSelectedPhraseId = null;
      state2.dateMatchedIds = /* @__PURE__ */ new Set();
      state2.datePhraseOrder = shuffleArray2(roundIds);
      state2.dateEventOrder = shuffleArray2(roundIds);
      state2.dateMatchFeedback = "";
    }
    function ensureDateMatchGame2() {
      const monthIds = new Set(timeDateMonthItems2.map((item) => item.id));
      if (!state2.datePhraseOrder.length || !state2.dateEventOrder.length || state2.datePhraseOrder.length !== 6 || state2.dateEventOrder.length !== 6 || state2.datePhraseOrder.some((id) => !monthIds.has(id)) || state2.dateEventOrder.some((id) => !monthIds.has(id))) {
        resetDateMatchGame2();
      }
    }
    function handleDateMatchPhrase2(itemId) {
      if (state2.dateMatchedIds.has(itemId)) return;
      state2.dateSelectedPhraseId = itemId;
      const item = timeDateMonthItems2.find((entry) => entry.id === itemId);
      if (item && state2.tapAudioEnabled) speak2(item.hanzi, 0.78);
      state2.dateMatchFeedback = "";
      renderActivityPanel2(currentTopic2());
    }
    function handleDateMatchEvent2(itemId) {
      const selectedId = state2.dateSelectedPhraseId;
      if (!selectedId || state2.dateMatchedIds.has(itemId)) return;
      if (selectedId === itemId) {
        state2.dateMatchedIds = /* @__PURE__ */ new Set([...state2.dateMatchedIds, itemId]);
        state2.dateSelectedPhraseId = null;
        state2.dateMatchFeedback = "";
      } else {
        state2.dateMatchFeedback = "Try again.";
      }
      renderActivityPanel2(currentTopic2());
    }
    function resetDateChallenge2(options = {}) {
      const available = options.excludeId ? datePracticeItems2.filter((item) => item.id !== options.excludeId) : datePracticeItems2;
      const answer = available[Math.floor(Math.random() * available.length)] ?? datePracticeItems2[0];
      const distractors = shuffleArray2(datePracticeItems2.filter((item) => item.id !== answer.id)).slice(0, 3);
      state2.dateChallengeAnswerId = answer.id;
      state2.dateChallengePromptId = answer.id;
      state2.dateChallengeOptionIds = shuffleArray2([answer.id, ...distractors.map((item) => item.id)]);
      state2.dateChallengePickedId = "";
      state2.dateChallengeResult = "";
      state2.dateChallengeWrongIds = /* @__PURE__ */ new Set();
      state2.dateListenFeedback = "";
    }
    function ensureDateChallenge2() {
      if (!state2.dateChallengeAnswerId || !state2.dateChallengeOptionIds.length) resetDateChallenge2();
    }
    function handleDateChallengePlay2() {
      const previousId = state2.dateChallengePromptId;
      resetDateChallenge2({ excludeId: previousId });
      const item = datePracticeItems2.find((entry) => entry.id === state2.dateChallengePromptId);
      if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
      renderActivityPanel2(currentTopic2());
    }
    function handleDateChallengeGuess2(itemId) {
      const isCorrect = itemId === state2.dateChallengeAnswerId;
      state2.dateChallengePickedId = itemId;
      state2.dateChallengeResult = isCorrect ? "correct" : "wrong";
      if (isCorrect) {
        if (state2.tapAudioEnabled) {
          const item = datePracticeItems2.find((entry) => entry.id === itemId);
          speak2(item?.hanzi, 0.78);
        }
      } else {
        state2.dateChallengeWrongIds = /* @__PURE__ */ new Set([...state2.dateChallengeWrongIds, itemId]);
      }
      renderActivityPanel2(currentTopic2());
    }
    function timeDateSectionForCurrentLesson2() {
      const lessonKey = `${currentBook2().id}:${currentLesson2().lesson}`;
      if (lessonKey === "2b:2" || lessonKey === "4a:3") return "clock";
      return "routine";
    }
    function activeTimeDateSection2() {
      const source = `${currentBook2().id}:${currentLesson2().lesson}`;
      if (state2.timeDateSectionSource !== source) {
        state2.timeDateSectionSource = source;
        state2.timeDateSectionId = timeDateSectionForCurrentLesson2();
      }
      return state2.timeDateSectionId || "week";
    }
    function renderTimeAssetGrid2(items, modifier, collection = modifier) {
      return `<div class="time-asset-grid time-asset-grid-${modifier}">
    ${items.map(
        (item) => `
          <button class="time-asset-card" type="button" data-time-asset="${collection}:${item.id}">
            <img class="time-asset-image" src="${item.imagePath}" alt="${item.english}" />
            ${item.hideLabels || item.hideLabelHanzi ? "" : item.words ? `<span class="time-asset-word-list">${item.words.map((word) => `<span>${word}</span>`).join("")}</span>` : `<span class="time-asset-hanzi">${item.hanzi}</span>`}
            ${!item.hideLabels && !item.hideLabelDetails && state2.showPinyin ? `<span class="time-asset-pinyin">${item.pinyin}</span>` : ""}
            ${!item.hideLabels && !item.hideLabelDetails && state2.showEnglish ? `<span class="time-asset-english">${item.english}</span>` : ""}
            ${item.context ? `<span class="time-asset-context">${item.context}</span>` : ""}
            ${item.contextPinyin && state2.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
            ${item.contextEnglish && state2.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
          </button>
        `
      ).join("")}
  </div>`;
    }
    function bindTimeAssetAudio2(container) {
      container.querySelectorAll("[data-time-asset]").forEach((button) => {
        button.addEventListener("click", () => {
          const [collection, id] = button.dataset.timeAsset.split(":");
          const items = {
            week: timeDateWeekItems3,
            clock: timeDateClockItems2,
            date: timeDateDateItems2,
            month: timeDateMonthItems2,
            visual: Object.values(visualTopicItems2).flat()
          }[collection] ?? [];
          const item = items.find((entry) => entry.id === id);
          if (item && state2.tapAudioEnabled) {
            speak2(item.audio, 0.78);
          }
        });
      });
    }
    function renderWeekdaysExplorer2() {
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Days of the Week</h4>
      </div>
      <div class="time-asset-grid time-asset-grid-week">
        ${timeDateWeekItems3.map((item) => `
          <section class="time-asset-card weekday-scene-card">
            <div class="greetings-exchange-top"><div><span class="time-asset-hanzi">${item.hanzi}</span></div><button class="small-button is-action-button" type="button" data-weekday-play-scene="${item.id}">Play scene</button></div>
            <img class="time-asset-image" src="${item.imagePath}" alt="${item.english}" />
            <span class="time-asset-context">${item.context}</span>
            ${state2.showPinyin ? `<span class="time-asset-context-pinyin">${item.contextPinyin}</span>` : ""}
            ${state2.showEnglish ? `<span class="time-asset-context-english">${item.contextEnglish}</span>` : ""}
          </section>
        `).join("")}
      </div>
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4ECA\u5929\u661F\u671F\u51E0\uFF1F</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">j\u012Bn ti\u0101n x\u012Bng q\u012B j\u01D0?</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">What day is it today?</p>' : ""}<p class="visual-topic-note-example">\u4ECA\u5929\u661F\u671F\u4E00\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">j\u012Bn ti\u0101n x\u012Bng q\u012B y\u012B.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">Today is Monday.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-weekday-play-scene]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = timeDateWeekItems3.find((entry) => entry.id === button.dataset.weekdayPlayScene);
          if (item && state2.tapAudioEnabled) speak2(item.audio, 0.78);
        });
      });
    }
    function renderDatesExplorer2() {
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Dates & Months</h4>
      </div>
      ${renderTimeAssetGrid2(timeDateDateItems2, "date")}
      <section class="time-months-intro">
        <div>
          <p class="body-match-kicker">Months of the year</p>
          <p class="time-months-hanzi">\u4E00\u5E74\u6709\u5341\u4E8C\u4E2A\u6708\u3002</p>
          ${state2.showPinyin ? '<p class="time-months-pinyin">y\u012B ni\xE1n y\u01D2u sh\xED \xE8r ge yu\xE8.</p>' : ""}
          ${state2.showEnglish ? '<p class="time-months-english">There are twelve months in a year.</p>' : ""}
        </div>
        <button class="small-button is-action-button" type="button" data-months-play>Play audio</button>
      </section>
      ${renderTimeAssetGrid2(timeDateMonthItems2, "month")}
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4ECA\u5929\u51E0\u6708\u51E0\u53F7\uFF1F</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">j\u012Bn ti\u0101n j\u01D0 yu\xE8 j\u01D0 h\xE0o?</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">What is the date today?</p>' : ""}<p class="visual-topic-note-example">\u4ECA\u5929\u4E94\u6708\u4E8C\u5341\u53F7\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">j\u012Bn ti\u0101n w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">Today is May twentieth.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u53F7 / \u65E5</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">h\xE0o / r\xEC</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">two ways to say the day of a date</p>' : ""}<p class="visual-topic-note-example">\u4E94\u6708\u4E8C\u5341\u53F7 = \u4E94\u6708\u4E8C\u5341\u65E5\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o = w\u01D4 yu\xE8 \xE8r sh\xED r\xEC.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">Both mean May twentieth.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u795D\u4F60\u751F\u65E5\u5FEB\u4E50\uFF01</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">zh\xF9 n\u01D0 sh\u0113ng r\xEC ku\xE0i l\xE8!</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">Wish you a happy birthday!</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u751F\u65E5\u4F1A / \u793C\u7269</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">sh\u0113ng r\xEC hu\xEC / l\u01D0 w\xF9</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">birthday party / present</p>' : ""}<p class="visual-topic-note-example">\u751F\u65E5\u4F1A\u4E0A\u6709\u793C\u7269\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">sh\u0113ng r\xEC hu\xEC sh\xE0ng y\u01D2u l\u01D0 w\xF9.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">There are presents at a birthday party.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
      bindTimeAssetAudio2(focusExplorer2);
      focusExplorer2.querySelector("[data-months-play]")?.addEventListener("click", () => {
        if (state2.tapAudioEnabled) {
          speak2("\u4E00\u5E74\u6709\u5341\u4E8C\u4E2A\u6708", 0.78);
        }
      });
    }
    function renderVisualTopicExplorer2(sceneId) {
      const topic = currentTopic2();
      const items = visualTopicItems2[sceneId] ?? [];
      const comparisonWords = sceneId === "comparisons" ? `<div class="comparison-word-grid">${comparisonWordItems2.map((item) => `<button class="comparison-word-card" type="button" data-comparison-word="${item.hanzi}"><span class="comparison-word-hanzi">${item.hanzi}</span>${state2.showPinyin ? `<span class="comparison-word-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="comparison-word-english">${item.english}</span>` : ""}</button>`).join("")}</div>` : "";
      const usefulNotes = sceneId === "transport" ? `
        <section class="visual-topic-notes">
          <p class="body-match-kicker">Useful notes</p>
          <div class="visual-topic-note-grid">
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">\u5750\u8F66</p>
              ${state2.showPinyin ? '<p class="visual-topic-note-pinyin">zu\xF2 ch\u0113</p>' : ""}
              ${state2.showEnglish ? '<p class="visual-topic-note-english">travel by vehicle; take a ride</p>' : ""}
              <p class="visual-topic-note-example">\u5750\u6821\u8F66\uFF0C\u5750\u51FA\u79DF\u8F66\uFF0C\u5750\u706B\u8F66\u3002</p>
            </article>
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">\u53BB</p>
              ${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\xF9</p>' : ""}
              ${state2.showEnglish ? '<p class="visual-topic-note-english">to go to</p>' : ""}
              <p class="visual-topic-note-example">\u53BB\u5B66\u6821\uFF0C\u53BB\u52A8\u7269\u56ED\uFF0C\u53BB\u5317\u4EAC\u3002</p>
            </article>
            <article class="visual-topic-note-card">
              <p class="visual-topic-note-hanzi">\u9A91</p>
              ${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\xED</p>' : ""}
              ${state2.showEnglish ? '<p class="visual-topic-note-english">to ride</p>' : ""}
              <p class="visual-topic-note-example">\u9A91\u81EA\u884C\u8F66\u3002</p>
            </article>
          </div>
        </section>
      ` : "";
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
      ${renderTimeAssetGrid2(items, `visual visual-${sceneId}`, "visual")}
      ${comparisonWords}
      ${usefulNotes}
    </div>
  `;
      bindTimeAssetAudio2(focusExplorer2);
      focusExplorer2.querySelectorAll("[data-comparison-word]").forEach((button) => {
        button.addEventListener("click", () => {
          if (state2.tapAudioEnabled) speak2(button.dataset.comparisonWord, 0.78);
        });
      });
    }
    function renderRoomsExplorer2() {
      const topic = currentTopic2();
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>${topic.title}</h4>
      </div>
      <div class="greetings-practice-grid room-scene-grid">
        ${roomScenes2.map((scene) => `
          <section class="greetings-exchange room-scene-card">
            <div class="greetings-exchange-top"><div><p class="body-match-kicker">${scene.label}</p></div><button class="small-button is-action-button" type="button" data-room-play-scene="${scene.id}">Play scene</button></div>
            <div class="room-scene-layout">
              <img class="room-scene-image" src="${scene.imagePath}" alt="${scene.english}" />
              <article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${scene.hanzi}</p>${state2.showPinyin ? `<p class="telephone-line-pinyin">${scene.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="telephone-line-english">${scene.english}</p>` : ""}</div></article>
            </div>
          </section>
        `).join("")}
      </div>
      <div class="time-months-heading"><p class="body-match-kicker">Book words</p></div>
      ${renderTimeAssetGrid2(visualTopicItems2.rooms, "visual visual-rooms", "visual")}
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid room-useful-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u623F\u95F4\u91CC\u6709\u2026\u2026</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">f\xE1ng ji\u0101n l\u01D0 y\u01D2u...</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">There is / are ... in the room.</p>' : ""}<p class="visual-topic-note-example">\u91CC means \u201Cin\u201D; \u6709 means \u201Cthere is / are.\u201D</p></article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u5730\u4E0A\u6709\u2026\u2026</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">d\xEC sh\xE0ng y\u01D2u...</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">There is / are ... on the floor.</p>' : ""}<p class="visual-topic-note-example">\u5730\u4E0A\u6709\u4E66\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">d\xEC sh\xE0ng y\u01D2u sh\u016B.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">There is a book on the floor.</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
      bindTimeAssetAudio2(focusExplorer2);
      focusExplorer2.querySelectorAll("[data-room-play-scene]").forEach((button) => {
        button.addEventListener("click", () => {
          const scene = roomScenes2.find((entry) => entry.id === button.dataset.roomPlayScene);
          if (scene && state2.tapAudioEnabled) speak2(scene.audio, 0.78);
        });
      });
    }
    function renderPositionsExplorer2() {
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Positions & Directions</h4>
      </div>
      <div class="greetings-practice-grid">
        ${positionScenes2.map(
        (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top"><div><p class="body-match-kicker">Scene ${scene.number}</p><p class="greetings-exchange-prompt">${scene.prompt}</p></div><button class="small-button is-action-button" type="button" data-position-play-scene="${scene.id}">Play scene</button></div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image position-scene-image position-scene-image-${scene.id}" src="${scene.imagePath}" alt="${scene.imageAlt}" /></div>
                  <div class="greetings-line-stack">
                    ${scene.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
                  </div>
                </div>
              </section>
            `
      ).join("")}
      </div>
      <section class="visual-topic-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid position-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">A \u5728 B + \u4F4D\u7F6E</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">A z\xE0i B + w\xE8i zh\xEC</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">A is in / on / beside B.</p>' : ""}<p class="visual-topic-note-example">\u4E66\u67B6\u5728\u684C\u5B50\u5DE6\u8FB9\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">sh\u016B ji\xE0 z\xE0i zhu\u014D zi zu\u01D2 bi\u0101n.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">The bookshelf is to the left of the desk.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u524D\u8FB9 = \u524D\u9762\uFF1B\u540E\u8FB9 = \u540E\u9762</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">qi\xE1n bi\u0101n = qi\xE1n mi\xE0n; h\xF2u bi\u0101n = h\xF2u mi\xE0n</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">front and back can use either form here</p>' : ""}</article>
          ${[["\u4E0A", "sh\xE0ng", "up"], ["\u4E0B", "xi\xE0", "down"], ["\u524D", "qi\xE1n", "front"], ["\u540E", "h\xF2u", "back"], ["\u5DE6", "zu\u01D2", "left"], ["\u53F3", "y\xF2u", "right"]].map(([hanzi, pinyin, english]) => `<article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">${hanzi}</p>${state2.showPinyin ? `<p class="visual-topic-note-pinyin">${pinyin}</p>` : ""}${state2.showEnglish ? `<p class="visual-topic-note-english">${english}</p>` : ""}</article>`).join("")}
        </div>
      </section>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-position-play-scene]").forEach((button) => {
        button.addEventListener("click", () => {
          const scene = positionScenes2.find((entry) => entry.id === button.dataset.positionPlayScene);
          if (scene && state2.tapAudioEnabled) speakSceneLines2(scene.lines);
        });
      });
    }
    function renderTimeDateExplorer2() {
      const activeSection = activeTimeDateSection2();
      const sections = [
        { id: "routine", hanzi: "\u4F5C\u606F", english: "Routine" },
        { id: "clock", hanzi: "\u65F6\u95F4", english: "Time" }
      ];
      let content = "";
      if (activeSection === "clock") {
        content = renderTimeAssetGrid2(timeDateClockItems2.filter((item) => item.id !== "clock-7"), "clock");
      } else {
        content = `
      <div class="greetings-practice-grid time-routine-scene-grid">
        ${timeDateRoutineItems2.map(
          (item, index) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${index + 1}</p>
                    <p class="greetings-exchange-prompt">${item.english}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-time-routine-play="${item.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual"><img class="greetings-scene-image time-routine-scene-image" src="${item.imagePath}" alt="${item.english}" /></div>
                  <div class="greetings-line-stack">
                    <article class="greetings-line-card">
                      <div class="telephone-bubble-copy">
                        <p class="telephone-line-hanzi">${item.hanzi}</p>
                        ${state2.showPinyin ? `<p class="telephone-line-pinyin">${item.pinyin}</p>` : ""}
                        ${state2.showEnglish ? `<p class="telephone-line-english">${item.english}</p>` : ""}
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            `
        ).join("")}
      </div>
    `;
      }
      focusExplorer2.innerHTML = `
    <div class="time-date-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Time & Routines</h4>
      </div>
      <div class="time-date-section-tabs" role="tablist" aria-label="Time and date sections">
        ${sections.map(
        (section) => `<button class="time-date-section-tab${section.id === activeSection ? " is-active" : ""}" type="button" role="tab" aria-selected="${String(section.id === activeSection)}" data-time-date-section="${section.id}"><span>${section.hanzi}</span><small>${section.english}</small></button>`
      ).join("")}
      </div>
      ${content}
      <section class="visual-topic-notes time-useful-notes">
        <p class="body-match-kicker">Useful notes</p>
        <div class="visual-topic-note-grid">
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u51E0\u70B9\u4E86\uFF1F</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">j\u01D0 di\u01CEn le?</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">What time is it?</p>' : ""}<p class="visual-topic-note-example">\u73B0\u5728\u4E03\u70B9\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">xi\xE0n z\xE0i q\u012B di\u01CEn.</p>' : ""}${state2.showEnglish ? `<p class="visual-topic-note-english">It is seven o'clock now.</p>` : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u5206 / \u96F6</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">f\u0113n / l\xEDng</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">minute / zero</p>' : ""}<p class="visual-topic-note-example">\u73B0\u5728\u4E03\u70B9\u96F6\u4E94\u5206\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">xi\xE0n z\xE0i q\u012B di\u01CEn l\xEDng w\u01D4 f\u0113n.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">It is 7:05 now.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u65E9\u4E0A / \u4E0A\u5348 / \u4E2D\u5348 / \u4E0B\u5348 / \u665A\u4E0A</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">z\u01CEo shang / sh\xE0ng w\u01D4 / zh\u014Dng w\u01D4 / xi\xE0 w\u01D4 / w\u01CEn shang</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">early morning / morning / noon / afternoon / evening</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4F60\u6BCF\u5929\u51E0\u70B9\u8D77\u5E8A\uFF1F</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">n\u01D0 m\u011Bi ti\u0101n j\u01D0 di\u01CEn q\u01D0 chu\xE1ng?</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">What time do you get up every day?</p>' : ""}<p class="visual-topic-note-example">\u6211\u6BCF\u5929\u4E03\u70B9\u8D77\u5E8A\u3002</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">w\u01D2 m\u011Bi ti\u0101n q\u012B di\u01CEn q\u01D0 chu\xE1ng.</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">I get up at seven every day.</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u5237\u7259 / \u68B3\u5934 / \u7A7F\u6821\u670D / \u7A7F\u978B\u5B50</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">shu\u0101 y\xE1 / sh\u016B t\xF3u / chu\u0101n xi\xE0o f\xFA / chu\u0101n xi\xE9 zi</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">brush teeth / comb hair / put on a school uniform / put on shoes</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4E03\u70B9\u4E00\u523B = \u4E03\u70B9\u5341\u4E94\u5206</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\u012B di\u01CEn y\u012B k\xE8 = q\u012B di\u01CEn sh\xED w\u01D4 f\u0113n</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">7:15</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4E03\u70B9\u534A = \u4E03\u70B9\u4E09\u5341\u5206</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\u012B di\u01CEn b\xE0n = q\u012B di\u01CEn s\u0101n sh\xED f\u0113n</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">7:30</p>' : ""}</article>
          <article class="visual-topic-note-card"><p class="visual-topic-note-hanzi">\u4E03\u70B9\u4E09\u523B = \u4E03\u70B9\u56DB\u5341\u4E94\u5206</p>${state2.showPinyin ? '<p class="visual-topic-note-pinyin">q\u012B di\u01CEn s\u0101n k\xE8 = q\u012B di\u01CEn s\xEC sh\xED w\u01D4 f\u0113n</p>' : ""}${state2.showEnglish ? '<p class="visual-topic-note-english">7:45</p>' : ""}</article>
        </div>
      </section>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-time-date-section]").forEach((button) => {
        button.addEventListener("click", () => {
          state2.timeDateSectionId = button.dataset.timeDateSection;
          renderTimeDateExplorer2();
          renderActivityPanel2(currentTopic2());
        });
      });
      bindTimeAssetAudio2(focusExplorer2);
      focusExplorer2.querySelectorAll("[data-time-routine-play]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = timeDateRoutineItems2.find((entry) => entry.id === button.dataset.timeRoutinePlay);
          if (item && state2.tapAudioEnabled) {
            speak2(item.audio, 0.78);
          }
        });
      });
    }
    function renderClothesExplorer2() {
      focusExplorer2.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook2().label} Lesson ${currentLesson2().lesson}</p>
        <h4>Book theme: getting dressed</h4>
        <p>Learn everyday clothes first, then choose what to wear for the weather.</p>
      </div>
      <div class="greetings-practice-grid">
        ${clothesPractice2.map(
        (scene) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div>
                    <p class="body-match-kicker">Scene ${scene.number}</p>
                    <p class="greetings-exchange-prompt">${scene.prompt}</p>
                  </div>
                  <button class="small-button is-action-button" type="button" data-clothes-play-scene="${scene.id}">Play scene</button>
                </div>
                <div class="greetings-scene-layout">
                  <div class="greetings-scene-visual">
                    <img class="greetings-scene-image" src="${scene.imagePath}" alt="${scene.imageAlt}" />
                  </div>
                  <div class="greetings-line-stack">
                    ${scene.lines.map(
          (line) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state2.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state2.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
        ).join("")}
                  </div>
                </div>
              </section>
            `
      ).join("")}
      </div>
    </div>
  `;
      focusExplorer2.querySelectorAll("[data-clothes-play-scene]").forEach((button) => {
        button.addEventListener("click", () => {
          const scene = clothesPractice2.find((entry) => entry.id === button.dataset.clothesPlayScene);
          if (scene && state2.tapAudioEnabled) {
            speakSceneLines2(scene.lines);
          }
        });
      });
    }
    return { resetWeekdayChallenge: resetWeekdayChallenge2, ensureWeekdayChallenge: ensureWeekdayChallenge2, handleWeekdayChallengePlay: handleWeekdayChallengePlay2, handleWeekdayChallengeGuess: handleWeekdayChallengeGuess2, resetWeekdayMatchGame: resetWeekdayMatchGame2, ensureWeekdayMatchGame: ensureWeekdayMatchGame2, handleWeekdayMatchPhrase: handleWeekdayMatchPhrase2, handleWeekdayMatchAttempt: handleWeekdayMatchAttempt2, resetClothesQuiz: resetClothesQuiz2, prepareClothesQuizQuestion: prepareClothesQuizQuestion2, ensureClothesQuiz: ensureClothesQuiz2, handleClothesQuizPick: handleClothesQuizPick2, nextClothesQuizQuestion: nextClothesQuizQuestion2, resetTimeRoutineQuiz: resetTimeRoutineQuiz2, prepareTimeRoutineQuizQuestion: prepareTimeRoutineQuizQuestion2, ensureTimeRoutineQuiz: ensureTimeRoutineQuiz2, handleTimeRoutineQuizPick: handleTimeRoutineQuizPick2, nextTimeRoutineQuizQuestion: nextTimeRoutineQuizQuestion2, resetClockQuiz: resetClockQuiz2, prepareClockQuizQuestion: prepareClockQuizQuestion2, ensureClockQuiz: ensureClockQuiz2, handleClockQuizPick: handleClockQuizPick2, nextClockQuizQuestion: nextClockQuizQuestion2, currentRoomBuildItem: currentRoomBuildItem2, resetRoomBuilder: resetRoomBuilder2, prepareRoomBuilder: prepareRoomBuilder2, ensureRoomBuilder: ensureRoomBuilder2, isRoomBuildPrefixValid: isRoomBuildPrefixValid2, handleRoomBuildToken: handleRoomBuildToken2, clearRoomBuilder: clearRoomBuilder2, nextRoomBuilder: nextRoomBuilder2, currentTransportBuildItem: currentTransportBuildItem2, resetTransportBuilder: resetTransportBuilder2, prepareTransportBuilder: prepareTransportBuilder2, ensureTransportBuilder: ensureTransportBuilder2, handleTransportBuildToken: handleTransportBuildToken2, clearTransportBuilder: clearTransportBuilder2, nextTransportBuilder: nextTransportBuilder2, resetPositionQuiz: resetPositionQuiz2, preparePositionQuizQuestion: preparePositionQuizQuestion2, ensurePositionQuiz: ensurePositionQuiz2, handlePositionQuizPlay: handlePositionQuizPlay2, handlePositionQuizPick: handlePositionQuizPick2, nextPositionQuizQuestion: nextPositionQuizQuestion2, currentComparisonBuildItem: currentComparisonBuildItem2, resetComparisonBuilder: resetComparisonBuilder2, prepareComparisonBuilder: prepareComparisonBuilder2, ensureComparisonBuilder: ensureComparisonBuilder2, handleComparisonBuildToken: handleComparisonBuildToken2, clearComparisonBuilder: clearComparisonBuilder2, nextComparisonBuilder: nextComparisonBuilder2, resetDateMatchGame: resetDateMatchGame2, ensureDateMatchGame: ensureDateMatchGame2, handleDateMatchPhrase: handleDateMatchPhrase2, handleDateMatchEvent: handleDateMatchEvent2, resetDateChallenge: resetDateChallenge2, ensureDateChallenge: ensureDateChallenge2, handleDateChallengePlay: handleDateChallengePlay2, handleDateChallengeGuess: handleDateChallengeGuess2, timeDateSectionForCurrentLesson: timeDateSectionForCurrentLesson2, activeTimeDateSection: activeTimeDateSection2, renderTimeAssetGrid: renderTimeAssetGrid2, bindTimeAssetAudio: bindTimeAssetAudio2, renderWeekdaysExplorer: renderWeekdaysExplorer2, renderDatesExplorer: renderDatesExplorer2, renderVisualTopicExplorer: renderVisualTopicExplorer2, renderRoomsExplorer: renderRoomsExplorer2, renderPositionsExplorer: renderPositionsExplorer2, renderTimeDateExplorer: renderTimeDateExplorer2, renderClothesExplorer: renderClothesExplorer2 };
  }

  // src/data/characters.js
  var illustratedKids = {
    lele: { id: "lele", label: "Lele", hanziName: "\u4E50\u4E50", gender: "boy", ageGroup: "6-7", skinTone: "light", path: "assets/illustrated-kids/lele.webp" },
    meimei: { id: "meimei", label: "Meimei", hanziName: "\u7F8E\u7F8E", gender: "girl", ageGroup: "6-7", skinTone: "light-medium", path: "assets/illustrated-kids/meimei.webp" },
    yangyang: { id: "yangyang", label: "Yangyang", hanziName: "\u9633\u9633", gender: "boy", ageGroup: "8-9", skinTone: "tan", path: "assets/illustrated-kids/yangyang.webp" },
    anan: { id: "anan", label: "Anan", hanziName: "\u5B89\u5B89", gender: "girl", ageGroup: "8-9", skinTone: "light", path: "assets/illustrated-kids/anan.webp" },
    tiantian: { id: "tiantian", label: "Tiantian", hanziName: "\u5929\u5929", gender: "boy", ageGroup: "9-10", skinTone: "light-medium", path: "assets/illustrated-kids/tiantian.webp" },
    sisi: { id: "sisi", label: "Sisi", hanziName: "\u601D\u601D", gender: "girl", ageGroup: "8-10", skinTone: "medium brown", path: "assets/illustrated-kids/sisi.webp" },
    luna: { id: "luna", label: "Luna", hanziName: "\u9732\u5A1C", gender: "girl", ageGroup: "8-10", skinTone: "medium", path: "assets/illustrated-kids/luna.webp" },
    sophie: { id: "sophie", label: "Sophie", hanziName: "\u82CF\u83F2", gender: "girl", ageGroup: "8-10", skinTone: "light", path: "assets/illustrated-kids/sophie.webp" },
    jaden: { id: "jaden", label: "Jaden", hanziName: "\u6770\u767B", gender: "boy", ageGroup: "7-8", skinTone: "deep brown", path: "assets/illustrated-kids/jaden.webp" }
  };

  // src/data/curriculum.js
  var books = [
    {
      id: "1a",
      label: "Book 1A",
      lessons: [
        { lesson: 1, title: "Numbers (1)", topicId: "numbers" },
        { lesson: 2, title: "Numbers (2)", topicId: "numbers" },
        { lesson: 3, title: "Numbers (3)", topicId: "numbers" },
        { lesson: 4, title: "Hello!", topicId: "greetings" },
        { lesson: 5, title: "Thank you!", topicId: "polite-words" },
        { lesson: 6, title: "What's your name?", topicId: "introductions" },
        { lesson: 7, title: "I'm 5 years old", topicId: "age" }
      ]
    },
    {
      id: "1b",
      label: "Book 1B",
      lessons: [
        { lesson: 1, title: "Mum and dad", topicId: "family" },
        { lesson: 2, title: "Brothers and sisters", topicId: "family" },
        { lesson: 3, title: "Parts of the body (1)", topicId: "body" },
        { lesson: 4, title: "Parts of the body (2)", topicId: "body" },
        { lesson: 5, title: "Pets", topicId: "animals" },
        { lesson: 6, title: "Colours", topicId: "colours" },
        { lesson: 7, title: "Fruit", topicId: "food" }
      ]
    },
    {
      id: "2a",
      label: "Book 2A",
      lessons: [
        { lesson: 1, title: "Numbers", topicId: "numbers" },
        { lesson: 2, title: "Two younger brothers", topicId: "family" },
        { lesson: 3, title: "Good friends", topicId: "introductions" },
        { lesson: 4, title: "My toys", topicId: "toys" },
        { lesson: 5, title: "I love reading", topicId: "hobbies" },
        { lesson: 6, title: "I can dress myself", topicId: "clothes" },
        { lesson: 7, title: "Colours", topicId: "colours" }
      ]
    },
    {
      id: "2b",
      label: "Book 2B",
      lessons: [
        { lesson: 1, title: "Today is Monday", topicId: "weekdays" },
        { lesson: 2, title: "What time is it?", topicId: "time-date" },
        { lesson: 3, title: "Stationery", topicId: "stationery" },
        { lesson: 4, title: "My classroom", topicId: "classroom" },
        { lesson: 5, title: "Animals", topicId: "animals" },
        { lesson: 6, title: "Big or small", topicId: "comparisons" },
        { lesson: 7, title: "Snacks", topicId: "food" }
      ]
    },
    {
      id: "3a",
      label: "Book 3A",
      lessons: [
        { lesson: 1, title: "Numbers", topicId: "numbers" },
        { lesson: 2, title: "Date", topicId: "dates" },
        { lesson: 3, title: "Happy birthday!", topicId: "dates" },
        { lesson: 4, title: "Family", topicId: "family" },
        { lesson: 5, title: "Nationality", topicId: "identity" },
        { lesson: 6, title: "Request", topicId: "polite-words" },
        { lesson: 7, title: "Clothes", topicId: "clothes" }
      ]
    },
    {
      id: "3b",
      label: "Book 3B",
      lessons: [
        { lesson: 1, title: "My schoolbag", topicId: "school-supplies" },
        { lesson: 2, title: "Our classroom", topicId: "classroom" },
        { lesson: 3, title: "Positions", topicId: "positions" },
        { lesson: 4, title: "Hobbies", topicId: "hobbies" },
        { lesson: 5, title: "Food and drink", topicId: "food-preferences" },
        { lesson: 6, title: "Vegetables", topicId: "food" },
        { lesson: 7, title: "Nature", topicId: "weather" }
      ]
    },
    {
      id: "4a",
      label: "Book 4A",
      lessons: [
        { lesson: 1, title: "Telephone numbers", topicId: "numbers" },
        { lesson: 2, title: "Languages", topicId: "identity" },
        { lesson: 3, title: "Tell the time", topicId: "time-date" },
        { lesson: 4, title: "Daily routine", topicId: "time-date" },
        { lesson: 5, title: "My lunch", topicId: "meals-feelings" },
        { lesson: 6, title: "Means of transport", topicId: "transport" },
        { lesson: 7, title: "I'm hungry", topicId: "meals-feelings" }
      ]
    },
    {
      id: "4b",
      label: "Book 4B",
      lessons: [
        { lesson: 1, title: "It's raining", topicId: "weather" },
        { lesson: 2, title: "Clothes", topicId: "clothes" },
        { lesson: 3, title: "My room", topicId: "daily-life" },
        { lesson: 4, title: "Hobbies", topicId: "hobbies" },
        { lesson: 5, title: "Our school", topicId: "school" },
        { lesson: 6, title: "School subjects", topicId: "school-subjects" },
        { lesson: 7, title: "Leisure time", topicId: "hobbies" }
      ]
    }
  ];
  var bookHomeCategories = [
    {
      id: "first-steps",
      zhTitle: "\u7B2C\u4E00\u9636\u6BB5",
      enTitle: "First Steps",
      hint: "Book 1A and 1B: first speaking, family, colours, food",
      accent: "#be5b49",
      iconEmoji: "\u{1F331}",
      bookIds: ["1a", "1b"]
    },
    {
      id: "build-core",
      zhTitle: "\u7B2C\u4E8C\u9636\u6BB5",
      enTitle: "Build the Core",
      hint: "Book 2A and 2B: toys, school, time, daily language",
      accent: "#6d8a4f",
      iconEmoji: "\u{1F9E9}",
      bookIds: ["2a", "2b"]
    },
    {
      id: "expand-language",
      zhTitle: "\u7B2C\u4E09\u9636\u6BB5",
      enTitle: "Expand the Language",
      hint: "Book 3A and 3B: birthdays, requests, backpack, hobbies",
      accent: "#517b8d",
      iconEmoji: "\u{1F4D8}",
      bookIds: ["3a", "3b"]
    },
    {
      id: "real-life-use",
      zhTitle: "\u7B2C\u56DB\u9636\u6BB5",
      enTitle: "Real-Life Use",
      hint: "Book 4A and 4B: routines, weather, transport, school life",
      accent: "#8f6988",
      iconEmoji: "\u{1F5E3}\uFE0F",
      bookIds: ["4a", "4b"]
    }
  ];
  var topicGroups = [
    {
      id: "foundations",
      label: "Foundations",
      description: "The first speaking patterns young learners need most.",
      topicIds: ["numbers", "multiplication-rhyme", "greetings", "polite-words", "introductions", "age", "identity"]
    },
    {
      id: "me-and-family",
      label: "Me & Family",
      description: "Personal, family, body, clothes, and everyday child language.",
      topicIds: ["family", "body", "animals", "colours", "clothes"]
    },
    {
      id: "daily-world",
      label: "Daily World",
      description: "Food, hobbies, routines, weather, and the world around the child.",
      topicIds: ["food", "food-preferences", "meals-feelings", "toys", "hobbies", "comparisons", "positions", "transport", "daily-life", "weather"]
    },
    {
      id: "school-and-time",
      label: "School & Time",
      description: "Practical classroom, calendar, and time-based language.",
      topicIds: ["weekdays", "time-date", "dates", "stationery", "school-supplies", "classroom", "school", "school-subjects"]
    }
  ];
  var topicCardMeta = {
    numbers: { zhTitle: "\u6570\u5B57", enTitle: "Numbers", hint: "Count, hear, and use numbers" },
    "multiplication-rhyme": { zhTitle: "\u4E5D\u4E5D\u4E58\u6CD5", enTitle: "Multiplication Rhyme", hint: "Classic rhythm practice" },
    greetings: { zhTitle: "\u6253\u62DB\u547C", enTitle: "Greetings", hint: "Hello, good morning, goodbye" },
    "polite-words": { zhTitle: "\u793C\u8C8C\u7528\u8BED", enTitle: "Polite Words", hint: "Thank you, sorry, please" },
    introductions: { zhTitle: "\u4ECB\u7ECD\u81EA\u5DF1", enTitle: "Introductions", hint: "Say your name and meet friends" },
    age: { zhTitle: "\u5E74\u9F84", enTitle: "Age", hint: "Ask and say how old you are" },
    identity: { zhTitle: "\u56FD\u5BB6\u548C\u8BED\u8A00", enTitle: "Countries & Languages", hint: "Say where you are from and what you speak" },
    family: { zhTitle: "\u5BB6\u4EBA", enTitle: "Family", hint: "Mom, dad, siblings, grandparents" },
    body: { zhTitle: "\u8EAB\u4F53", enTitle: "Body", hint: "Tap body parts and listen" },
    animals: { zhTitle: "\u52A8\u7269", enTitle: "Animals", hint: "Pets and favorite animals" },
    colours: { zhTitle: "\u989C\u8272", enTitle: "Colours", hint: "Red, yellow, blue, green" },
    food: { zhTitle: "\u98DF\u7269\u548C\u996E\u6599", enTitle: "Food & Drinks", hint: "Fruit, vegetables, snacks, drinks" },
    "food-preferences": { zhTitle: "\u559C\u6B22\u548C\u4E0D\u559C\u6B22", enTitle: "Food Preferences", hint: "Ask and say what you like to eat" },
    "meals-feelings": { zhTitle: "\u5348\u996D\u548C\u611F\u89C9", enTitle: "Meals & Feelings", hint: "Lunch, hungry, thirsty" },
    weekdays: { zhTitle: "\u661F\u671F", enTitle: "Days of the Week", hint: "Monday to Sunday" },
    "time-date": { zhTitle: "\u65F6\u95F4", enTitle: "Time & Routines", hint: "Clock and daily routines" },
    dates: { zhTitle: "\u65E5\u671F", enTitle: "Dates & Months", hint: "Months, dates, birthdays" },
    stationery: { zhTitle: "\u6211\u7684\u6587\u5177", enTitle: "My Stationery", hint: "My things, colors, and measure words" },
    "school-supplies": { zhTitle: "\u6587\u5177\u548C\u4E66\u5305", enTitle: "Stationery & Backpack", hint: "Pencil, ruler, books, backpack" },
    classroom: { zhTitle: "\u6559\u5BA4", enTitle: "Classroom", hint: "Classroom, table, chair, board" },
    school: { zhTitle: "\u6211\u4EEC\u7684\u5B66\u6821", enTitle: "Our School", hint: "Library, playground, cafeteria" },
    "school-subjects": { zhTitle: "\u5B66\u6821\u5B66\u79D1", enTitle: "School Subjects", hint: "Chinese, English, music, art, PE" },
    hobbies: { zhTitle: "\u7231\u597D", enTitle: "Hobbies", hint: "Reading, music, sports, games" },
    toys: { zhTitle: "\u73A9\u5177", enTitle: "Toys", hint: "Toy car, train, airplane" },
    clothes: { zhTitle: "\u8863\u670D", enTitle: "Clothes", hint: "Dress for the day" },
    comparisons: { zhTitle: "\u63CF\u8FF0\u548C\u6BD4\u8F83", enTitle: "Descriptions & Comparisons", hint: "Big, small, long, short" },
    positions: { zhTitle: "\u4F4D\u7F6E\u548C\u65B9\u5411", enTitle: "Positions & Directions", hint: "Up, down, inside, outside" },
    transport: { zhTitle: "\u4EA4\u901A", enTitle: "Transportation", hint: "Walk, bike, bus, train" },
    "daily-life": { zhTitle: "\u6211\u7684\u623F\u95F4", enTitle: "My Room", hint: "Rooms and furniture" },
    weather: { zhTitle: "\u5929\u6C14", enTitle: "Weather", hint: "Sun, rain, snow, wind" }
  };
  var learningHomeCategories = [
    {
      id: "foundations",
      zhTitle: "\u5F00\u53E3\u8BF4\u4E2D\u6587",
      enTitle: "Start Speaking",
      hint: "Numbers, greetings, names, age, identity",
      accent: "#be5b49",
      iconSrc: "assets/navigation-icons/lele-wave-icon.webp",
      topicIds: ["numbers", "greetings", "polite-words", "introductions", "age", "identity", "multiplication-rhyme"]
    },
    {
      id: "me-family",
      zhTitle: "\u6211\u548C\u5BB6\u4EBA",
      enTitle: "Me & Family",
      hint: "Family, body, clothes",
      accent: "#aa7051",
      iconEmoji: "\u{1F3E0}",
      topicIds: ["family", "body", "clothes"]
    },
    {
      id: "time-daily",
      zhTitle: "\u65F6\u95F4\u548C\u65E5\u5E38",
      enTitle: "Time & Daily Life",
      hint: "Week, time, dates, routines, home",
      accent: "#517b8d",
      iconSrc: "assets/illustrated-clocks/10oclock.webp",
      topicIds: ["weekdays", "time-date", "dates", "comparisons", "positions", "transport", "daily-life"]
    },
    {
      id: "school-life",
      zhTitle: "\u5B66\u6821\u751F\u6D3B",
      enTitle: "School Life",
      hint: "Classroom, backpack, subjects",
      accent: "#6d8a4f",
      iconEmoji: "\u{1F3EB}",
      topicIds: ["stationery", "school-supplies", "classroom", "school", "school-subjects"]
    },
    {
      id: "food",
      zhTitle: "\u98DF\u7269",
      enTitle: "Food",
      hint: "Food words, preferences, and meals",
      accent: "#c48d46",
      iconSrc: "assets/navigation-icons/burger-fries-icon.webp",
      topicIds: ["food", "food-preferences", "meals-feelings"]
    },
    {
      id: "world",
      zhTitle: "\u81EA\u7136\u548C\u989C\u8272",
      enTitle: "World Around Us",
      hint: "Weather, animals, colours",
      accent: "#6f7fa4",
      iconSrc: "assets/navigation-icons/panda-bamboo-icon.webp",
      topicIds: ["weather", "animals", "colours"]
    },
    {
      id: "play",
      zhTitle: "\u5174\u8DA3\u548C\u73A9\u5177",
      enTitle: "Play & Hobbies",
      hint: "Toys, sports, music, games",
      accent: "#8f6988",
      iconSrc: "assets/navigation-icons/teddy-robot-icon.webp",
      topicIds: ["toys", "hobbies"]
    }
  ];

  // src/games/shared-lesson-practice.js
  function createSharedLessonPractice({ state: state2, speak: speak2, elements, documentRef = document }) {
    const { activityPanelTitle: activityPanelTitle2, activityPanelSummary: activityPanelSummary2, activityList: activityList2 } = elements;
    function renderListenPractice2(config) {
      return `
      <section class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">${config.kicker ?? "Listen and choose"}</p>
            ${config.title ? `<h4>${config.title}</h4>` : ""}
            <p class="numbers-game-note">Play the audio, then tap the matching Chinese card.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-template-listen-play>Play audio</button>
        </div>
        ${config.feedback() ? `<p class="greetings-game-feedback">${config.feedback()}</p>` : ""}
        <div class="numbers-game-options">
          ${config.optionIds().map((id) => {
        const item = config.items().find((entry) => entry.id === id);
        if (!item) return "";
        const isCorrectPick = config.pickedId() === item.id && config.result() === "correct";
        const isWrongPick = config.wrongIds().has(item.id);
        const resultClass = isCorrectPick ? " is-correct" : isWrongPick ? " is-wrong" : "";
        const resultMark = isCorrectPick || isWrongPick ? `<span class="answer-result-mark" aria-hidden="true">${isCorrectPick ? "\u2713" : "\xD7"}</span>` : "";
        return `
              <button class="numbers-game-option greetings-game-option family-listen-option${resultClass}" type="button" data-template-listen-guess="${item.id}">
                ${resultMark}
                <span class="numbers-game-hanzi">${item.hanzi}</span>
                ${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                ${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
              </button>
            `;
      }).join("")}
        </div>
      </section>
    `;
    }
    function renderMatchMeaningContent(config, id) {
      return config.meaningContent ? config.meaningContent(id) : `<span class="match-answer-label">${config.meaningLabel(id)}</span>`;
    }
    function renderMatchPractice2(config) {
      const phraseIds = config.phraseIds();
      const meaningIds = config.meaningIds();
      const matchedIds = config.matchedIds();
      const solvedIds = phraseIds.filter((id) => matchedIds.has(id));
      const remainingPhraseIds = phraseIds.filter((id) => !matchedIds.has(id));
      const remainingMeaningIds = meaningIds.filter((id) => !matchedIds.has(id));
      return `
      <section class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">${config.kicker ?? "Matching game"}</p>
            ${config.title ? `<h4>${config.title}</h4>` : ""}
            <p class="numbers-game-note">Tap a card on the left, then tap its matching card on the right.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-template-match-new>New mix</button>
        </div>
        ${config.feedback() ? `<div class="greetings-game-feedback">${config.feedback()}</div>` : ""}
        <div class="family-match-board-headings">
          <p class="body-match-kicker">${config.phraseHeading ?? "Chinese"}</p>
          <p class="body-match-kicker">${config.meaningHeading ?? "Meaning"}</p>
        </div>
        ${solvedIds.length ? `
          <div class="family-match-solved-pairs">
            ${solvedIds.map((id) => {
        const item = config.items().find((entry) => entry.id === id);
        if (!item) return "";
        return `
                <article class="family-match-solved-row">
                  <div class="polite-match-card polite-match-card-phrase family-match-pair-card is-solved">
                    <span class="answer-result-mark" aria-hidden="true">\u2713</span>
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                  </div>
                  <div class="polite-match-card ${config.meaningCardClass ?? "polite-match-card-meaning"} family-match-pair-card is-solved">
                    <span class="answer-result-mark" aria-hidden="true">\u2713</span>
                    ${renderMatchMeaningContent(config, id)}
                  </div>
                </article>
              `;
      }).join("")}
          </div>
        ` : ""}
        ${remainingPhraseIds.length ? `
          <div class="polite-match-board family-match-open-board">
            <div class="polite-match-column">
              ${remainingPhraseIds.map((id) => {
        const item = config.items().find((entry) => entry.id === id);
        if (!item) return "";
        const selected = config.selectedId() === id;
        const wrong = config.wrongPhraseIds?.().has(id);
        return `
                  <button class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}${wrong ? " is-wrong" : ""}" type="button" data-template-match-phrase="${id}">
                    ${wrong ? '<span class="answer-result-mark" aria-hidden="true">\xD7</span>' : ""}
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                  </button>
                `;
      }).join("")}
            </div>
            <div class="polite-match-column">
              ${remainingMeaningIds.map((id) => {
        const wrong = config.wrongMeaningIds?.().has(id);
        return `
                  <button class="polite-match-card ${config.meaningCardClass ?? "polite-match-card-meaning"}${wrong ? " is-wrong" : ""}" type="button" data-template-match-meaning="${id}">
                    ${wrong ? '<span class="answer-result-mark" aria-hidden="true">\xD7</span>' : ""}
                    ${renderMatchMeaningContent(config, id)}
                  </button>
                `;
      }).join("")}
            </div>
          </div>
        ` : ""}
        ${config.showPlayAgain !== false && matchedIds.size === config.items().length ? '<button class="small-button is-action-button" type="button" data-template-match-play-again>Play again</button>' : ""}
      </section>
    `;
    }
    function renderPracticeSayCards2(items = []) {
      if (!items.length) return "";
      return `
      <section class="practice-split-card practice-say-card">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Say it</p><p class="numbers-game-note">Tap a sentence, listen, then say it back.</p></div></div>
        <div class="numbers-game-options">
          ${items.map((item) => `<button class="numbers-game-option greetings-game-option family-listen-option" type="button" data-practice-say="${item.audio ?? item.hanzi}"><span class="numbers-game-hanzi">${item.hanzi}</span>${state2.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state2.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`).join("")}
        </div>
      </section>
    `;
    }
    function bindPracticeSayCards2(container) {
      container.querySelectorAll("[data-practice-say]").forEach((button) => {
        button.addEventListener("click", () => {
          if (state2.tapAudioEnabled) speak2(button.dataset.practiceSay, 0.78);
        });
      });
    }
    function renderSharedLessonPractice2(topic, config) {
      config.ensure();
      activityPanelTitle2.textContent = "Let's practice";
      activityPanelSummary2.textContent = config.summary;
      activityList2.className = "support-list";
      activityList2.innerHTML = "";
      const gameCard = documentRef.createElement("section");
      gameCard.className = `family-practice-shell${config.shellClass ? ` ${config.shellClass}` : ""}`;
      gameCard.innerHTML = `<div class="practice-split-board">${renderListenPractice2(config.listen)}${renderMatchPractice2(config.match)}</div>${renderPracticeSayCards2(config.sayItems)}`;
      activityList2.appendChild(gameCard);
      activityList2.querySelector("[data-template-listen-play]")?.addEventListener("click", () => config.listen.onPlay());
      activityList2.querySelectorAll("[data-template-listen-guess]").forEach((button) => button.addEventListener("click", () => config.listen.onGuess(button.dataset.templateListenGuess)));
      activityList2.querySelector("[data-template-match-new]")?.addEventListener("click", () => config.match.onNew());
      activityList2.querySelector("[data-template-match-play-again]")?.addEventListener("click", () => config.match.onNew());
      activityList2.querySelectorAll("[data-template-match-phrase]").forEach((button) => button.addEventListener("click", () => config.match.onPhrase(button.dataset.templateMatchPhrase)));
      activityList2.querySelectorAll("[data-template-match-meaning]").forEach((button) => button.addEventListener("click", () => config.match.onMeaning(button.dataset.templateMatchMeaning)));
      bindPracticeSayCards2(activityList2);
    }
    renderSharedLessonPractice2.renderListenPractice = renderListenPractice2;
    renderSharedLessonPractice2.renderMatchPractice = renderMatchPractice2;
    renderSharedLessonPractice2.renderPracticeSayCards = renderPracticeSayCards2;
    renderSharedLessonPractice2.bindPracticeSayCards = bindPracticeSayCards2;
    return renderSharedLessonPractice2;
  }

  // src/legacy-app.js
  var introductionsGameSpeakerIds = ["anan", "tiantian", "sisi", "lele"];
  var ageGameItemIds = ["ask-age", "age-five", "age-six", "age-seven", "ask-grade", "grade-one"];
  var sceneSpeechRate = 0.64;
  var sceneLinePauseMs = 280;
  var { speak, speakSceneLines } = createAudioService({
    getSceneRate: () => sceneSpeechRate,
    getSceneLinePauseMs: () => sceneLinePauseMs
  });
  var visualTopicItems = {
    comparisons: comparisonVisualItems,
    positions: positionVisualItems,
    transport: transportVisualItems,
    rooms: roomVisualItems
  };
  var schoolTopicData2 = {
    stationery: stationeryTopicData,
    "school-supplies": schoolSuppliesTopicData,
    classroom: classroomTopicData,
    school: schoolTopicData,
    "school-subjects": schoolSubjectsTopicData,
    food: foodTopicData,
    "food-preferences": foodPreferencesTopicData,
    "meals-feelings": mealsFeelingsTopicData
  };
  var schoolSentenceBuilds2 = {
    stationery: stationerySentenceBuilds,
    "school-supplies": schoolSuppliesSentenceBuilds,
    school: schoolSentenceBuilds,
    "school-subjects": schoolSubjectsSentenceBuilds,
    food: foodSentenceBuilds,
    "meals-feelings": mealsFeelingsSentenceBuilds
  };
  var topicData = [
    numbersTopic,
    multiplicationRhymeTopic,
    greetingsTopic,
    politeWordsTopic,
    introductionsTopic,
    identityTopic,
    ageTopic,
    familyTopic,
    bodyTopic,
    animalsTopic,
    coloursTopic,
    foodTopic,
    foodPreferencesTopic,
    mealsFeelingsTopic,
    {
      id: "time-date",
      title: "Time & Routines",
      summary: "Read the clock, then use time in everyday routines.",
      progressLabel: "2B to 4A",
      iconText: "\u65F6\u95F4",
      iconColor: "#517b8d",
      focus: {
        hanzi: "\u4E50\u4E50\u4E03\u70B9\u8D77\u5E8A\u3002",
        pinyin: "L\xE8 le q\u012B di\u01CEn q\u01D0 chu\xE1ng.",
        english: "Lele wakes up at 7:00 AM.",
        audio: "\u4E50\u4E50\u4E03\u70B9\u8D77\u5E8A"
      },
      focusItems: [
        {
          id: "wake-up-7am",
          hanzi: "\u4E03\u70B9",
          pinyin: "q\u012B di\u01CEn",
          english: "seven o'clock",
          audio: "\u4E03\u70B9",
          timeOfDayHanzi: "\u65E9\u4E0A",
          timeOfDayPinyin: "z\u01CEo shang",
          timeOfDayEnglish: "early morning",
          routineHanzi: "\u4E50\u4E50\u4E03\u70B9\u8D77\u5E8A\u3002",
          routinePinyin: "L\xE8 le q\u012B di\u01CEn q\u01D0 chu\xE1ng.",
          routineEnglish: "Lele wakes up at 7:00 AM.",
          routineAction: "Wake up",
          scenePath: "assets/illustrated-clock-routines/07am-lele-wake-up.webp"
        },
        {
          id: "school-8am",
          hanzi: "\u516B\u70B9",
          pinyin: "b\u0101 di\u01CEn",
          english: "eight o'clock",
          audio: "\u516B\u70B9",
          timeOfDayHanzi: "\u65E9\u4E0A",
          timeOfDayPinyin: "z\u01CEo shang",
          timeOfDayEnglish: "early morning",
          routineHanzi: "\u516B\u70B9\u53BB\u5B66\u6821\u3002",
          routinePinyin: "b\u0101 di\u01CEn q\xF9 xu\xE9 xi\xE0o.",
          routineEnglish: "Go to school at 8:00 AM.",
          routineAction: "Go to school",
          scenePath: "assets/illustrated-clock-routines/08am-go-to-school.webp"
        },
        {
          id: "writing-10am",
          hanzi: "\u5341\u70B9",
          pinyin: "sh\xED di\u01CEn",
          english: "ten o'clock",
          audio: "\u5341\u70B9",
          timeOfDayHanzi: "\u4E0A\u5348",
          timeOfDayPinyin: "sh\xE0ng w\u01D4",
          timeOfDayEnglish: "morning",
          routineHanzi: "\u5341\u70B9\u4E0A\u5199\u5B57\u8BFE\u3002",
          routinePinyin: "sh\xED di\u01CEn sh\xE0ng xi\u011B z\xEC k\xE8.",
          routineEnglish: "Writing class at 10:00 AM.",
          routineAction: "Writing class",
          scenePath: "assets/illustrated-clock-routines/10am-writing-class.webp"
        },
        {
          id: "lunch-12pm",
          hanzi: "\u5341\u4E8C\u70B9",
          pinyin: "sh\xED'\xE8r di\u01CEn",
          english: "twelve o'clock",
          audio: "\u5341\u4E8C\u70B9",
          timeOfDayHanzi: "\u4E2D\u5348",
          timeOfDayPinyin: "zh\u014Dng w\u01D4",
          timeOfDayEnglish: "noon",
          routineHanzi: "\u5341\u4E8C\u70B9\u5403\u5348\u996D\u3002",
          routinePinyin: "sh\xED'\xE8r di\u01CEn ch\u012B w\u01D4 f\xE0n.",
          routineEnglish: "Lunch time at 12:00 PM.",
          routineAction: "Lunch time",
          scenePath: "assets/illustrated-clock-routines/12pm-lunch-time.webp"
        },
        {
          id: "playground-4pm",
          hanzi: "\u56DB\u70B9",
          pinyin: "s\xEC di\u01CEn",
          english: "four o'clock",
          audio: "\u56DB\u70B9",
          timeOfDayHanzi: "\u4E0B\u5348",
          timeOfDayPinyin: "xi\xE0 w\u01D4",
          timeOfDayEnglish: "afternoon",
          routineHanzi: "\u56DB\u70B9\u53BB\u64CD\u573A\u73A9\u3002",
          routinePinyin: "s\xEC di\u01CEn q\xF9 c\u0101o ch\u01CEng w\xE1n.",
          routineEnglish: "Go play on the playground at 4:00 PM.",
          routineAction: "Playground",
          scenePath: "assets/illustrated-clock-routines/04pm-playground.webp"
        },
        {
          id: "story-time-8pm",
          hanzi: "\u516B\u70B9",
          pinyin: "b\u0101 di\u01CEn",
          english: "eight o'clock",
          audio: "\u516B\u70B9",
          timeOfDayHanzi: "\u665A\u4E0A",
          timeOfDayPinyin: "w\u01CEn shang",
          timeOfDayEnglish: "evening",
          routineHanzi: "\u516B\u70B9\u8BB2\u6545\u4E8B\u3002",
          routinePinyin: "b\u0101 di\u01CEn ji\u01CEng g\xF9 sh\xEC.",
          routineEnglish: "Story time at 8:00 PM.",
          routineAction: "Story time",
          scenePath: "assets/illustrated-clock-routines/08pm-story-time.webp"
        }
      ],
      interactiveScene: "time-date-routine",
      parentGuide: "This topic works best with routines. Tie it to breakfast time, school time, bedtime, and birthdays.",
      cultureGuide: "Time and date language pairs naturally with birthday and holiday content later.",
      activities: ["Tap to hear", "Read the clock", "Daily routines"],
      steps: [
        { book: "2B", lesson: 2, title: "What time is it?", note: "Add telling time." },
        { book: "4A", lesson: 3, title: "Tell the time", note: "Revisit time in a more functional way." },
        { book: "4A", lesson: 4, title: "Daily routine", note: "Use time language in everyday life." }
      ]
    },
    {
      id: "weekdays",
      title: "Days of the Week",
      summary: "Learn the seven days through familiar school and home moments.",
      progressLabel: "2B Lesson 1",
      iconText: "\u661F\u671F",
      iconColor: "#6f7fa4",
      focus: {
        hanzi: "\u4ECA\u5929\u661F\u671F\u51E0\uFF1F",
        pinyin: "j\u012Bn ti\u0101n x\u012Bng q\u012B j\u01D0?",
        english: "What day is it today?",
        audio: "\u4ECA\u5929\u661F\u671F\u51E0"
      },
      focusItems: [
        { id: "monday", hanzi: "\u661F\u671F\u4E00", pinyin: "x\u012Bng q\u012B y\u012B", english: "Monday", audio: "\u661F\u671F\u4E00" },
        { id: "tuesday", hanzi: "\u661F\u671F\u4E8C", pinyin: "x\u012Bng q\u012B \xE8r", english: "Tuesday", audio: "\u661F\u671F\u4E8C" },
        { id: "wednesday", hanzi: "\u661F\u671F\u4E09", pinyin: "x\u012Bng q\u012B s\u0101n", english: "Wednesday", audio: "\u661F\u671F\u4E09" },
        { id: "thursday", hanzi: "\u661F\u671F\u56DB", pinyin: "x\u012Bng q\u012B s\xEC", english: "Thursday", audio: "\u661F\u671F\u56DB" },
        { id: "friday", hanzi: "\u661F\u671F\u4E94", pinyin: "x\u012Bng q\u012B w\u01D4", english: "Friday", audio: "\u661F\u671F\u4E94" },
        { id: "saturday", hanzi: "\u661F\u671F\u516D", pinyin: "x\u012Bng q\u012B li\xF9", english: "Saturday", audio: "\u661F\u671F\u516D" },
        { id: "sunday", hanzi: "\u661F\u671F\u5929", pinyin: "x\u012Bng q\u012B ti\u0101n", english: "Sunday", audio: "\u661F\u671F\u5929" }
      ],
      interactiveScene: "weekdays",
      parentGuide: "Use the real day of the week at breakfast or on the way to school, then repeat it together.",
      cultureGuide: "A weekly rhythm gives children an easy, useful way to connect school, family routines, and calendar language.",
      activities: ["Tap to hear", "Say today's day", "Put the week in order"],
      steps: [{ book: "2B", lesson: 1, title: "Today is Monday", note: "Learn the days of the week." }]
    },
    {
      id: "dates",
      title: "Dates & Months",
      summary: "Say a month and day, then connect dates to birthdays and events.",
      progressLabel: "3A Lessons 2-3",
      iconText: "\u65E5\u671F",
      iconColor: "#c48d46",
      focus: {
        hanzi: "\u51E0\u6708\u51E0\u53F7\uFF1F",
        pinyin: "j\u01D0 yu\xE8 j\u01D0 h\xE0o?",
        english: "What month and day?",
        audio: "\u51E0\u6708\u51E0\u53F7"
      },
      focusItems: [
        { id: "date-question", hanzi: "\u51E0\u6708\u51E0\u53F7\uFF1F", pinyin: "j\u01D0 yu\xE8 j\u01D0 h\xE0o?", english: "What month and day?", audio: "\u51E0\u6708\u51E0\u53F7" },
        { id: "new-year", hanzi: "\u4E00\u6708\u4E00\u53F7", pinyin: "y\u012B yu\xE8 y\u012B h\xE0o", english: "January first", audio: "\u4E00\u6708\u4E00\u53F7" },
        { id: "field-trip", hanzi: "\u4E94\u6708\u4E8C\u5341\u53F7", pinyin: "w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o", english: "May twentieth", audio: "\u4E94\u6708\u4E8C\u5341\u53F7" },
        { id: "christmas", hanzi: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7", pinyin: "sh\xED \xE8r yu\xE8 \xE8r sh\xED w\u01D4 h\xE0o", english: "December twenty-fifth", audio: "\u5341\u4E8C\u6708\u4E8C\u5341\u4E94\u53F7" },
        { id: "birthday", hanzi: "\u751F\u65E5\u5FEB\u4E50\uFF01", pinyin: "sh\u0113ng r\xEC ku\xE0i l\xE8!", english: "Happy birthday!", audio: "\u751F\u65E5\u5FEB\u4E50" }
      ],
      interactiveScene: "dates",
      parentGuide: "Start with family birthdays or a coming event. Point to a calendar while saying the month and day together.",
      cultureGuide: "Dates are most memorable when connected to a child's own celebrations, school events, and seasonal activities.",
      activities: ["Tap to hear", "Read a calendar", "Say a birthday date"],
      steps: [
        { book: "3A", lesson: 2, title: "Date", note: "Say month and day." },
        { book: "3A", lesson: 3, title: "Happy birthday!", note: "Use dates for birthdays and celebrations." }
      ]
    },
    {
      id: "stationery",
      title: "My Stationery",
      summary: "Talk about your school things, their colors, and how many you have.",
      progressLabel: "2B Lesson 3",
      iconText: "\u6587\u5177",
      iconColor: "#6d8a4f",
      focus: { hanzi: "\u8FD9\u662F\u6211\u7684\u94C5\u7B14\u3002", pinyin: "zh\xE8 sh\xEC w\u01D2 de qi\u0101n b\u01D0.", english: "This is my pencil.", audio: "\u8FD9\u662F\u6211\u7684\u94C5\u7B14" },
      interactiveScene: "stationery",
      parentGuide: "Use a real pencil, eraser, or pair of scissors to practise \u8FD9\u662F\u6211\u7684 and count the objects together.",
      cultureGuide: "This lesson builds practical ownership, color, and measure-word language from everyday school objects.",
      activities: ["Tap to hear", "Name my things", "Match the picture", "Build a sentence"],
      steps: [{ book: "2B", lesson: 3, title: "Stationery", note: "Talk about school things, colors, and measure words." }]
    },
    {
      id: "school-supplies",
      title: "Stationery & Backpack",
      summary: "Say what is in a pencil case or backpack and where things are.",
      progressLabel: "3B Lesson 1",
      iconText: "\u4E66\u5305",
      iconColor: "#6d8a4f",
      focus: { hanzi: "\u6211\u7684\u4E66\u5305\u3002", pinyin: "w\u01D2 de sh\u016B b\u0101o.", english: "My backpack.", audio: "\u6211\u7684\u4E66\u5305" },
      interactiveScene: "school-supplies",
      parentGuide: "Use a real pencil case or backpack to point to each object while saying its Chinese name.",
      cultureGuide: "These everyday classroom words give children quick, useful ways to speak Chinese during school routines.",
      activities: ["Tap to hear", "Name school things", "Pack a backpack", "Build a sentence"],
      steps: [{ book: "3B", lesson: 1, title: "My schoolbag", note: "Say what is in a backpack." }]
    },
    {
      id: "classroom",
      title: "Classroom",
      summary: "Look around the classroom and name the furniture and learning space.",
      progressLabel: "2B Lesson 4 and 3B Lesson 2",
      iconText: "\u6559\u5BA4",
      iconColor: "#6d8a4f",
      focus: { hanzi: "\u8FD9\u662F\u6559\u5BA4\u3002", pinyin: "zh\xE8 sh\xEC ji\xE0o sh\xEC.", english: "This is the classroom.", audio: "\u8FD9\u662F\u6559\u5BA4" },
      interactiveScene: "classroom",
      parentGuide: "Point to the table, chair, and board in a real classroom, then say the complete sentence together.",
      cultureGuide: "Classroom language supports simple descriptions with \u6709 (there is / are) and \u5728 (at / in).",
      activities: ["Tap to hear", "Look around", "Listen and choose", "Match the words"],
      steps: [
        { book: "2B", lesson: 4, title: "My classroom", note: "Name the classroom and its furniture." },
        { book: "3B", lesson: 2, title: "Our classroom", note: "Describe things in the classroom." }
      ]
    },
    {
      id: "school",
      title: "Our School",
      summary: "Explore the places in a school and say what the school has.",
      progressLabel: "4B Lesson 5",
      iconText: "\u5B66\u6821",
      iconColor: "#6d8a4f",
      focus: { hanzi: "\u5B66\u6821\u6709\u56FE\u4E66\u9986\u3002", pinyin: "xu\xE9 xi\xE0o y\u01D2u t\xFA sh\u016B gu\u01CEn.", english: "The school has a library.", audio: "\u5B66\u6821\u6709\u56FE\u4E66\u9986" },
      interactiveScene: "school-places",
      parentGuide: "Use the school map or a walk around school to connect each place name to a real place.",
      cultureGuide: "The pattern \u5B66\u6821\u6709... is a natural way for children to describe places and things around them.",
      activities: ["Play scenes", "Explore school places", "Listen and choose", "Match the words"],
      steps: [{ book: "4B", lesson: 5, title: "Our school", note: "Name school places with \u5B66\u6821\u6709..." }]
    },
    {
      id: "school-subjects",
      title: "School Subjects",
      summary: "Name school subjects and say which class you like.",
      progressLabel: "4B Lesson 6",
      iconText: "\u5B66\u79D1",
      iconColor: "#6d8a4f",
      focus: { hanzi: "\u6211\u559C\u6B22\u97F3\u4E50\u8BFE\u3002", pinyin: "w\u01D2 x\u01D0 huan y\u012Bn yu\xE8 k\xE8.", english: "I like music class.", audio: "\u6211\u559C\u6B22\u97F3\u6708\u8BFE" },
      interactiveScene: "school-subjects",
      parentGuide: "Ask which class your child likes best, then replace the final subject word in \u6211\u559C\u6B22...\u8BFE.",
      cultureGuide: "School subjects make a useful bridge from naming words to sharing a personal preference.",
      activities: ["Tap to hear", "Say a favorite", "Listen and choose", "Match the words"],
      steps: [{ book: "4B", lesson: 6, title: "School subjects", note: "Talk about favorite classes." }]
    },
    hobbiesTopic,
    toysTopic,
    clothesTopic,
    dailyLifeTopic,
    comparisonsTopic,
    positionsTopic,
    transportTopic,
    weatherTopic
  ];
  var state = {
    currentView: "topics",
    selectedTopicId: "numbers",
    expandedCategoryId: "foundations",
    selectedBookCategoryId: "first-steps",
    selectedBookId: "1a",
    selectedLessonNumber: 1,
    topicPageOpen: false,
    openTopicGroups: /* @__PURE__ */ new Set(["foundations"]),
    showPinyin: true,
    showArabic: true,
    showEnglish: true,
    tapAudioEnabled: true,
    selectedFocusItemId: null,
    ...createFoundationState(),
    ...createTimeDailyLifeState(),
    schoolPracticeTopicId: "",
    schoolChallengeAnswerId: "",
    schoolChallengeOptionIds: [],
    schoolChallengePickedId: "",
    schoolChallengePromptId: "",
    schoolChallengeResult: "",
    schoolChallengeWrongIds: /* @__PURE__ */ new Set(),
    schoolListenFeedback: "",
    schoolMatchFeedback: "",
    schoolSelectedPhraseId: null,
    schoolMatchedIds: /* @__PURE__ */ new Set(),
    schoolPhraseOrder: [],
    schoolMeaningOrder: [],
    backpackGameRoundIds: [],
    backpackGameTargetIndex: 0,
    backpackGameOptionIds: [],
    backpackGamePlacedIds: [],
    backpackGameWrongIds: /* @__PURE__ */ new Set(),
    backpackGameComplete: false,
    stationeryPictureMatchIndex: 0,
    stationeryPictureMatchSelections: { measure: "", color: "", item: "" },
    stationeryPictureMatchWrong: { measure: /* @__PURE__ */ new Set(), color: /* @__PURE__ */ new Set(), item: /* @__PURE__ */ new Set() },
    stationeryPictureMatchChoiceOrders: { measure: [], color: [], item: [] },
    stationeryPictureMatchComplete: false,
    mealsConversationMatchReady: false,
    mealsConversationWrongPhraseIds: /* @__PURE__ */ new Set(),
    mealsConversationWrongReplyIds: /* @__PURE__ */ new Set(),
    mealsPictureQuizOrder: [],
    mealsPictureQuizIndex: 0,
    mealsPictureQuizOptionIds: [],
    mealsPictureQuizSelectedId: "",
    mealsPictureQuizResult: "",
    foodPreferenceSubjectId: "\u6211",
    foodPreferencePatternId: "like",
    foodPreferenceFoodId: "",
    classroomSentenceFrameId: "in-classroom",
    classroomSentenceWordId: "",
    schoolBuildTopicId: "",
    schoolBuildOrder: [],
    schoolBuildIndex: 0,
    schoolBuildAvailableTokens: [],
    schoolBuildSelectedTokens: [],
    schoolBuildResult: "",
    foodBookCategoryId: "fruit",
    mealsWordGroupId: "lunch",
    foodHungerModeId: "mix",
    foodHungerRoundIds: [],
    foodHungerTargetIndex: 0,
    foodHungerOptionIds: [],
    foodHungerPlatedIds: [],
    foodHungerWrongIds: /* @__PURE__ */ new Set(),
    foodHungerComplete: false,
    timeDateSectionId: "",
    timeDateSectionSource: "",
    identitySelectedCountryId: ""
  };
  var multiplicationPlaybackToken = 0;
  var multiplicationPlaybackPaused = false;
  var multiplicationPlaybackContainer = null;
  var topicGroupsRoot = document.getElementById("topic-groups");
  var bookSelect = document.getElementById("book-select");
  var lessonSelect = document.getElementById("lesson-select");
  var lookupCard = document.getElementById("lookup-card");
  var bookBrowser = document.getElementById("book-browser");
  var topicTitle = document.getElementById("topic-title");
  var topicSummary = document.getElementById("topic-summary");
  var topicProgress = document.getElementById("topic-progress");
  var topicLessonStrip = document.getElementById("topic-lesson-strip");
  var subtopicShelf = document.getElementById("subtopic-shelf");
  var focusExplorer = document.getElementById("focus-explorer");
  var focusStatus = document.getElementById("focus-status");
  var focusDisplay = document.getElementById("focus-display");
  var focusHanzi = document.getElementById("focus-hanzi");
  var focusPinyin = document.getElementById("focus-pinyin");
  var focusEnglish = document.getElementById("focus-english");
  var focusWordList = document.getElementById("focus-word-list");
  var toggleAudioButton = document.getElementById("toggle-audio-button");
  var togglePinyinButton = document.getElementById("toggle-pinyin-button");
  var toggleArabicButton = document.getElementById("toggle-arabic-button");
  var toggleEnglishButton = document.getElementById("toggle-english-button");
  var activityList = document.getElementById("activity-list");
  var activityPanelTitle = document.getElementById("activity-panel-title");
  var activityPanelSummary = document.getElementById("activity-panel-summary");
  var topicPanel = document.getElementById("topics-panel");
  var bookPanel = document.getElementById("books-panel");
  var topicColumns = document.querySelector(".topic-columns");
  var detailLayout = document.querySelector(".detail-layout");
  var learningCultureNav = document.getElementById("learningCultureNav");
  var renderSharedLessonPractice = createSharedLessonPractice({
    state,
    speak,
    elements: { activityPanelTitle, activityPanelSummary, activityList }
  });
  var renderListenPractice = renderSharedLessonPractice.renderListenPractice;
  var renderMatchPractice = renderSharedLessonPractice.renderMatchPractice;
  var renderPracticeSayCards = renderSharedLessonPractice.renderPracticeSayCards;
  var bindPracticeSayCards = renderSharedLessonPractice.bindPracticeSayCards;
  var greetingsGameItems;
  var resetGreetingsChallenge;
  var ensureGreetingsChallenge;
  var greetingsMeaningLabel;
  var resetGreetingsMatchGame;
  var ensureGreetingsMatchGame;
  var handleGreetingsMatchPhrase;
  var handleGreetingsMatchAttempt;
  var handleGreetingsChallengePlay;
  var handleGreetingsChallengeGuess;
  var renderGreetingsExplorer;
  var politeGameItems;
  var politeMeaningLabel;
  var resetPoliteMatchGame;
  var ensurePoliteMatchGame;
  var handlePoliteMatchPhrase;
  var handlePoliteMatchAttempt;
  var resetPoliteChallenge;
  var ensurePoliteChallenge;
  var handlePoliteChallengePlay;
  var handlePoliteChallengeGuess;
  var renderPoliteWordsExplorer;
  var introductionsPromptById;
  var introductionsGameKids;
  var introductionsSelfIntroItemForKid;
  var resetIntroductionsChallenge;
  var ensureIntroductionsChallenge;
  var handleIntroductionsChallengePlay;
  var handleIntroductionsChallengeGuess;
  var introductionsBuildTarget;
  var resetIntroductionsBuilder;
  var ensureIntroductionsBuilder;
  var handleIntroductionsBuildToken;
  var handleIntroductionsBuildClear;
  var renderIntroductionsExplorer;
  var ageGameItems;
  var resetAgeChallenge;
  var ensureAgeChallenge;
  var handleAgeChallengePlay;
  var handleAgeChallengeGuess;
  var ageBuildTarget;
  var resetAgeBuilder;
  var ensureAgeBuilder;
  var handleAgeBuildToken;
  var handleAgeBuildClear;
  var renderAgeExplorer;
  var schoolPracticeItems;
  var ensureSchoolPractice;
  var renderSchoolPractice;
  var renderStationeryPractice;
  var renderSchoolSuppliesPractice;
  var renderFoodPractice;
  var renderMealsConversationPractice;
  var renderFoodPreferencesPractice;
  var renderClassroomPractice;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.view);
    });
  });
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.viewTarget);
      document.querySelector(".switcher-panel").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
  document.querySelectorAll("[data-global-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      state.topicPageOpen = false;
      switchView(link.dataset.globalView);
      updateTopicPageVisibility();
      document.querySelector(".switcher-panel").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      link.closest(".global-view-menu")?.removeAttribute("open");
    });
  });
  function updateDisplayControls() {
    renderFocusControls();
    renderFocusDisplay(currentFocusItem());
    renderFocusWordList2();
    renderFocusExplorer();
    renderActivityPanel(currentTopic());
  }
  toggleAudioButton.addEventListener("click", () => {
    state.tapAudioEnabled = !state.tapAudioEnabled;
    updateDisplayControls();
  });
  togglePinyinButton.addEventListener("click", () => {
    state.showPinyin = !state.showPinyin;
    updateDisplayControls();
  });
  toggleArabicButton.addEventListener("click", () => {
    state.showArabic = !state.showArabic;
    renderFocusControls();
    renderFocusExplorer();
    renderActivityPanel(currentTopic());
  });
  toggleEnglishButton.addEventListener("click", () => {
    state.showEnglish = !state.showEnglish;
    updateDisplayControls();
  });
  function renderFocusControls() {
    const topic = currentTopic();
    document.body.classList.toggle("is-pinyin-hidden", !state.showPinyin);
    document.body.classList.toggle("is-english-hidden", !state.showEnglish);
    const controlPairs = [
      [toggleAudioButton, state.tapAudioEnabled, "Tap sound"],
      [togglePinyinButton, state.showPinyin, "Pinyin"],
      [toggleArabicButton, state.showArabic, "Numbers"],
      [toggleEnglishButton, state.showEnglish, "English"]
    ];
    controlPairs.forEach(([button, enabled, label]) => {
      button.classList.toggle("is-toggle-active", enabled);
      button.classList.toggle("is-toggle-inactive", !enabled);
      button.textContent = `${label} ${enabled ? "on" : "off"}`;
    });
    toggleArabicButton.classList.toggle("is-hidden", topic.id !== "numbers");
    learningCultureNav?.querySelectorAll("[data-display-toggle]").forEach((button) => {
      const control = button.dataset.displayToggle;
      const enabled = control === "sound" ? state.tapAudioEnabled : control === "pinyin" ? state.showPinyin : state.showEnglish;
      const label = control === "sound" ? "Sound" : control === "pinyin" ? "Pinyin" : "English";
      button.classList.toggle("is-toggle-active", enabled);
      button.classList.toggle("is-toggle-inactive", !enabled);
      button.textContent = `${label} ${enabled ? "on" : "off"}`;
      button.setAttribute("aria-pressed", String(enabled));
    });
  }
  function renderFocusDisplay(item) {
    if (!item) {
      focusHanzi.textContent = "";
      focusPinyin.textContent = "";
      focusEnglish.textContent = "";
      return;
    }
    focusHanzi.textContent = item.hanzi;
    focusPinyin.textContent = state.showPinyin ? item.pinyin : "";
    focusEnglish.textContent = state.showEnglish ? item.english : "";
  }
  function renderFocusStatus() {
    const topic = currentTopic();
    if (topic.id === "body") {
      focusStatus.textContent = state.lastBodyFeedback || "Tap a body word to hear it, then point to the same part.";
      return;
    }
    if (topic.id === "numbers") {
      const stage = currentNumberStage();
      focusStatus.textContent = stage.telephoneMode ? "Listen to the question, then the answer. Telephone numbers are for speaking and listening, not counting objects." : state.lastNumberFeedback || `Now learning ${stage.title}. ${stage.summary}`;
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
      state.lastBodyFeedback = options.bodyFeedback ?? `Showing ${item.hanzi}${state.showEnglish ? ` (${item.english})` : ""}.`;
    }
    renderFocusDisplay(item);
    renderFocusWordList2();
    renderFocusExplorer();
    renderFocusStatus();
    if (options.playAudio && state.tapAudioEnabled) {
      speak(options.audioText ?? item.audio, 0.78);
    }
  }
  function renderFocusWordList2() {
    if (["body", "dates", "comparisons", "positions", "transport", "daily-life", "multiplication-rhyme", "identity", "stationery", "school-supplies", "classroom", "school", "school-subjects", "food", "food-preferences", "meals-feelings"].includes(currentTopic().id) || currentTopic().id === "numbers" && currentNumberStage().telephoneMode) {
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
    const visibleItems = topic.id === "numbers" ? numberWordListItems(items, currentFocusItem(), currentNumberStage()) : topic.id === "time-date" ? timeDateExpressionItems : isLessonTemplate ? bookWordItemsForTopic(topic) : items;
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
            renderFocusWordList2();
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
  function sharedLessonPracticeConfig(topic) {
    if (schoolTopicData2[topic.id]) {
      return {
        summary: "Listen for a school word, then match each Chinese card to its English meaning.",
        shellClass: "lesson-practice-shell",
        ensure: () => ensureSchoolPractice(topic.id),
        listen: {
          items: () => schoolPracticeItems(topic.id),
          optionIds: () => state.schoolChallengeOptionIds,
          pickedId: () => state.schoolChallengePickedId,
          result: () => state.schoolChallengeResult,
          wrongIds: () => state.schoolChallengeWrongIds,
          feedback: () => state.schoolListenFeedback,
          onPlay: handleSchoolChallengePlay,
          onGuess: handleSchoolChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "English",
          items: () => schoolPracticeItems(topic.id).slice(0, 6),
          phraseIds: () => state.schoolPhraseOrder,
          meaningIds: () => state.schoolMeaningOrder,
          matchedIds: () => state.schoolMatchedIds,
          selectedId: () => state.schoolSelectedPhraseId,
          feedback: () => state.schoolMatchFeedback,
          meaningLabel: (id) => schoolPracticeItems(topic.id).find((item) => item.id === id)?.english ?? "",
          onNew: () => {
            resetSchoolMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handleSchoolMatchPhrase,
          onMeaning: handleSchoolMatchAttempt
        }
      };
    }
    if (topic.id === "weekdays") {
      return {
        summary: "Listen for the weekday, then match each Chinese day to its English name.",
        shellClass: "lesson-practice-shell",
        sayItems: [
          { hanzi: "\u4ECA\u5929\u661F\u671F\u51E0\uFF1F", pinyin: "j\u012Bn ti\u0101n x\u012Bng q\u012B j\u01D0?", english: "What day is it today?", audio: "\u4ECA\u5929\u661F\u671F\u51E0" },
          { hanzi: "\u4ECA\u5929\u661F\u671F\u4E00\u3002", pinyin: "j\u012Bn ti\u0101n x\u012Bng q\u012B y\u012B.", english: "Today is Monday.", audio: "\u4ECA\u5929\u661F\u671F\u4E00" }
        ],
        ensure: () => {
          ensureWeekdayChallenge();
          ensureWeekdayMatchGame();
        },
        listen: {
          items: () => timeDateWeekItems2,
          optionIds: () => state.weekdayChallengeOptionIds,
          pickedId: () => state.weekdayChallengePickedId,
          result: () => state.weekdayChallengeResult,
          wrongIds: () => state.weekdayChallengeWrongIds,
          feedback: () => state.weekdayListenFeedback,
          onPlay: handleWeekdayChallengePlay,
          onGuess: handleWeekdayChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "English",
          items: () => timeDateWeekItems2,
          phraseIds: () => state.weekdayPhraseOrder,
          meaningIds: () => state.weekdayMeaningOrder,
          matchedIds: () => state.weekdayMatchedIds,
          selectedId: () => state.weekdaySelectedPhraseId,
          feedback: () => state.weekdayMatchFeedback,
          meaningLabel: (id) => timeDateWeekItems2.find((item) => item.id === id)?.english ?? "",
          onNew: () => {
            resetWeekdayMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handleWeekdayMatchPhrase,
          onMeaning: handleWeekdayMatchAttempt
        }
      };
    }
    if (topic.id === "family") {
      return {
        summary: "Practice the three core family sentences, then sort sibling and parent words by who they name.",
        ensure: () => {
          ensureFamilyChallenge();
          ensureFamilyMatchGame();
        },
        listen: {
          items: familyGameItems,
          optionIds: () => state.familyChallengeOptionIds,
          pickedId: () => state.familyChallengePickedId,
          result: () => state.familyChallengeResult,
          wrongIds: () => state.familyChallengeWrongIds,
          feedback: () => state.familyListenFeedback,
          onPlay: handleFamilyChallengePlay,
          onGuess: handleFamilyChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "Family member",
          meaningCardClass: "family-match-card",
          items: familyGameItems,
          phraseIds: () => state.familyPhraseOrder,
          meaningIds: () => state.familyMeaningOrder,
          matchedIds: () => state.familyMatchedIds,
          selectedId: () => state.familySelectedPhraseId,
          feedback: () => state.familyMatchFeedback,
          meaningLabel: (id) => familyPersonForItemId(id)?.label ?? "",
          meaningContent: (id) => {
            const person = familyPersonForItemId(id);
            if (!person) {
              return "";
            }
            return `
            <span class="family-match-avatar"><img class="family-match-avatar-image family-match-avatar-image-headshot" src="${familyHeadshotForItemId(id)}" alt="${person.label}" /></span>
            <span class="family-match-copy">
              <span class="match-answer-label">${person.label}</span>
            </span>
          `;
          },
          onNew: () => {
            resetFamilyMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handleFamilyMatchPhrase,
          onMeaning: handleFamilyMatchAttempt
        }
      };
    }
    if (topic.id === "greetings") {
      return {
        summary: "Listen, choose the matching greeting, then match each line to its situation.",
        shellClass: "lesson-practice-shell",
        ensure: () => {
          ensureGreetingsChallenge();
          ensureGreetingsMatchGame();
        },
        listen: {
          items: greetingsGameItems,
          optionIds: () => state.greetingsChallengeOptionIds,
          pickedId: () => state.greetingsChallengePickedId,
          result: () => state.greetingsChallengeResult,
          wrongIds: () => state.greetingsChallengeWrongIds,
          feedback: () => state.greetingsListenFeedback,
          onPlay: handleGreetingsChallengePlay,
          onGuess: handleGreetingsChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "Situation",
          items: greetingsGameItems,
          phraseIds: () => state.greetingsPhraseOrder,
          meaningIds: () => state.greetingsMeaningOrder,
          matchedIds: () => state.greetingsMatchedIds,
          selectedId: () => state.greetingsSelectedPhraseId,
          feedback: () => state.greetingsMatchFeedback,
          meaningLabel: greetingsMeaningLabel,
          onNew: () => {
            resetGreetingsMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handleGreetingsMatchPhrase,
          onMeaning: handleGreetingsMatchAttempt
        }
      };
    }
    if (topic.id === "polite-words") {
      return {
        summary: "Listen, choose the matching polite phrase, then match each phrase to its meaning.",
        shellClass: "lesson-practice-shell",
        ensure: () => {
          ensurePoliteChallenge();
          ensurePoliteMatchGame();
        },
        listen: {
          items: politeGameItems,
          optionIds: () => state.politeChallengeOptionIds,
          pickedId: () => state.politeChallengePickedId,
          result: () => state.politeChallengeResult,
          wrongIds: () => state.politeChallengeWrongIds,
          feedback: () => state.politeListenFeedback,
          onPlay: handlePoliteChallengePlay,
          onGuess: handlePoliteChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "Meaning",
          items: politeGameItems,
          phraseIds: () => state.politePhraseOrder,
          meaningIds: () => state.politeMeaningOrder,
          matchedIds: () => state.politeMatchedIds,
          selectedId: () => state.politeSelectedPhraseId,
          feedback: () => state.politeMatchFeedback,
          meaningLabel: politeMeaningLabel,
          onNew: () => {
            resetPoliteMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handlePoliteMatchPhrase,
          onMeaning: handlePoliteMatchAttempt
        }
      };
    }
    if (topic.id === "dates") {
      return {
        summary: "Listen for a date or celebration, then match months to their English names.",
        shellClass: "lesson-practice-shell",
        sayItems: [
          { hanzi: "\u4ECA\u5929\u51E0\u6708\u51E0\u53F7\uFF1F", pinyin: "j\u012Bn ti\u0101n j\u01D0 yu\xE8 j\u01D0 h\xE0o?", english: "What is the date today?", audio: "\u4ECA\u5929\u51E0\u6708\u51E0\u53F7" },
          { hanzi: "\u4ECA\u5929\u4E94\u6708\u4E8C\u5341\u53F7\u3002", pinyin: "j\u012Bn ti\u0101n w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o.", english: "Today is May twentieth.", audio: "\u4ECA\u5929\u4E94\u6708\u4E8C\u5341\u53F7" },
          { hanzi: "\u4E94\u6708\u4E8C\u5341\u53F7 = \u4E94\u6708\u4E8C\u5341\u65E5\u3002", pinyin: "w\u01D4 yu\xE8 \xE8r sh\xED h\xE0o = w\u01D4 yu\xE8 \xE8r sh\xED r\xEC.", english: "Both mean May twentieth.", audio: "\u4E94\u6708\u4E8C\u5341\u53F7\u4E94\u6708\u4E8C\u5341\u65E5" }
        ],
        ensure: () => {
          ensureDateChallenge();
          ensureDateMatchGame();
        },
        listen: {
          items: () => datePracticeItems,
          optionIds: () => state.dateChallengeOptionIds,
          pickedId: () => state.dateChallengePickedId,
          result: () => state.dateChallengeResult,
          wrongIds: () => state.dateChallengeWrongIds,
          feedback: () => state.dateListenFeedback,
          onPlay: handleDateChallengePlay,
          onGuess: handleDateChallengeGuess
        },
        match: {
          phraseHeading: "Chinese",
          meaningHeading: "English",
          items: () => timeDateMonthItems.filter((item) => state.datePhraseOrder.includes(item.id)),
          phraseIds: () => state.datePhraseOrder,
          meaningIds: () => state.dateEventOrder,
          matchedIds: () => state.dateMatchedIds,
          selectedId: () => state.dateSelectedPhraseId,
          feedback: () => state.dateMatchFeedback,
          meaningLabel: (id) => timeDateMonthItems.find((item) => item.id === id)?.english ?? "",
          onNew: () => {
            resetDateMatchGame();
            renderActivityPanel(topic);
          },
          onPhrase: handleDateMatchPhrase,
          onMeaning: handleDateMatchEvent
        }
      };
    }
    return null;
  }
  function renderActivityPanel(topic) {
    topicColumns?.classList.remove("is-hidden");
    activityPanelSummary.hidden = false;
    if (topic.id === "body") {
      topicColumns?.classList.add("is-hidden");
      activityPanelTitle.textContent = "";
      activityPanelSummary.textContent = "";
      activityList.innerHTML = "";
      return;
    }
    if (schoolTopicData2[topic.id]) {
      renderSchoolPractice(topic);
      return;
    }
    const sharedPracticeConfig = sharedLessonPracticeConfig(topic);
    if (sharedPracticeConfig) {
      renderSharedLessonPractice(topic, sharedPracticeConfig);
      return;
    }
    if (topic.id === "daily-life") {
      ensureRoomBuilder();
      const prompt = currentRoomBuildItem();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell room-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div></div>
        <figure class="clothes-quiz-visual room-build-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.roomBuildResult}">
          ${state.roomBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.roomBuildResult === "correct" ? "\u2713" : "\xD7"}</span>` : ""}
          ${state.roomBuildSelectedTokens.length ? state.roomBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.roomBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-room-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-room-build-clear>Clear</button>${state.roomBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-room-build-next>Next picture</button>' : ""}</div>
      </section>
      ${renderPracticeSayCards([
        { hanzi: "\u5730\u4E0A\u6709\u4E66\u3002", pinyin: "d\xEC sh\xE0ng y\u01D2u sh\u016B.", english: "There is a book on the floor.", audio: "\u5730\u4E0A\u6709\u4E66" }
      ])}
    `;
      activityList.querySelectorAll("[data-room-build-token]").forEach((button) => {
        button.addEventListener("click", () => handleRoomBuildToken(Number(button.dataset.roomBuildToken)));
      });
      activityList.querySelector("[data-room-build-clear]")?.addEventListener("click", clearRoomBuilder);
      activityList.querySelector("[data-room-build-next]")?.addEventListener("click", nextRoomBuilder);
      bindPracticeSayCards(activityList);
      return;
    }
    if (topic.id === "comparisons") {
      ensureComparisonBuilder();
      const prompt = currentComparisonBuildItem();
      const visual = visualTopicItems.comparisons.find((item) => item.id === prompt.id);
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Complete the sentence with the matching comparison words.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell comparison-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Complete the sentence</p><p class="numbers-game-note">Tap the two word cards in the order that completes the sentence.</p></div></div>
        <figure class="clothes-quiz-visual comparison-quiz-visual"><img class="clothes-quiz-image" src="${visual.imagePath}" alt="${visual.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target comparison-build-target is-${state.comparisonBuildResult}">
          ${state.comparisonBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.comparisonBuildResult === "correct" ? "\u2713" : "\xD7"}</span>` : ""}
          <span>${prompt.before}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[0] ?? ""}</span>
          <span>${prompt.between}</span>
          <span class="comparison-build-blank">${state.comparisonBuildSelectedTokens[1] ?? ""}</span>
          <span>${prompt.after}</span>
        </div>
        <div class="intro-build-choices">
          ${state.comparisonBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-comparison-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-comparison-build-clear>Clear</button>${state.comparisonBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-comparison-build-next>Next picture</button>' : ""}</div>
      </section>
    `;
      activityList.querySelectorAll("[data-comparison-build-token]").forEach((button) => {
        button.addEventListener("click", () => handleComparisonBuildToken(Number(button.dataset.comparisonBuildToken)));
      });
      activityList.querySelector("[data-comparison-build-clear]")?.addEventListener("click", clearComparisonBuilder);
      activityList.querySelector("[data-comparison-build-next]")?.addEventListener("click", nextComparisonBuilder);
      return;
    }
    if (topic.id === "positions") {
      ensurePositionQuiz();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Play the audio, then choose the matching Chinese sentence.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell position-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Listen and choose</p><p class="numbers-game-note">Play the audio, then tap the matching Chinese sentence.</p></div><button class="small-button is-action-button" type="button" data-position-quiz-play>Play audio</button></div>
        <div class="clothes-quiz-options">
          ${state.positionQuizOptionIds.map((itemId) => {
        const item = positionPracticeItems.find((entry) => entry.id === itemId);
        const isSelected = state.positionQuizSelectedId === itemId;
        const resultClass = isSelected ? ` is-${state.positionQuizResult}` : "";
        const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.positionQuizResult === "correct" ? "\u2713" : "\xD7"}</span>` : "";
        return `<button class="clothes-quiz-option${resultClass}" type="button" data-position-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}
        </div>
        ${state.positionQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-position-quiz-next>Next sentence</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "\u4E66\u67B6\u5728\u684C\u5B50\u5DE6\u8FB9\u3002", pinyin: "sh\u016B ji\xE0 z\xE0i zhu\u014D zi zu\u01D2 bi\u0101n.", english: "The bookshelf is to the left of the desk.", audio: "\u4E66\u67B6\u5728\u684C\u5B50\u5DE6\u8FB9" },
        { hanzi: "\u6905\u5B50\u5728\u5973\u5B69\u540E\u9762\u3002", pinyin: "y\u01D0 zi z\xE0i n\u01DA h\xE1i h\xF2u mi\xE0n.", english: "The chair is behind the girl.", audio: "\u6905\u5B50\u5728\u5973\u5B69\u540E\u9762" }
      ])}
    `;
      activityList.querySelectorAll("[data-position-quiz-pick]").forEach((button) => {
        button.addEventListener("click", () => handlePositionQuizPick(button.dataset.positionQuizPick));
      });
      activityList.querySelector("[data-position-quiz-play]")?.addEventListener("click", handlePositionQuizPlay);
      activityList.querySelector("[data-position-quiz-next]")?.addEventListener("click", nextPositionQuizQuestion);
      bindPracticeSayCards(activityList);
      return;
    }
    if (topic.id === "transport") {
      ensureTransportBuilder();
      const prompt = currentTransportBuildItem();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Build the matching sentence from the word cards.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell transport-builder-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Build the sentence</p><p class="numbers-game-note">Tap the word cards in order. Some cards do not belong.</p></div></div>
        <figure class="clothes-quiz-visual transport-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="transport-build-hint">
          ${state.showPinyin ? `<p class="transport-build-hint-pinyin">${prompt.pinyin}</p>` : ""}
          ${state.showEnglish ? `<p class="transport-build-hint-english">${prompt.english}</p>` : ""}
        </div>
        <div class="transport-build-target is-${state.transportBuildResult}">
          ${state.transportBuildResult ? `<span class="answer-result-mark" aria-hidden="true">${state.transportBuildResult === "correct" ? "\u2713" : "\xD7"}</span>` : ""}
          ${state.transportBuildSelectedTokens.length ? state.transportBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
        </div>
        <div class="intro-build-choices">
          ${state.transportBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-transport-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions"><button class="small-button" type="button" data-transport-build-clear>Clear</button>${state.transportBuildResult === "correct" ? '<button class="small-button is-action-button" type="button" data-transport-build-next>Next picture</button>' : ""}</div>
      </section>
    `;
      activityList.querySelectorAll("[data-transport-build-token]").forEach((button) => {
        button.addEventListener("click", () => handleTransportBuildToken(Number(button.dataset.transportBuildToken)));
      });
      activityList.querySelector("[data-transport-build-clear]")?.addEventListener("click", clearTransportBuilder);
      activityList.querySelector("[data-transport-build-next]")?.addEventListener("click", nextTransportBuilder);
      return;
    }
    if (topic.id === "time-date" && activeTimeDateSection() === "clock") {
      ensureClockQuiz();
      const answerId = state.clockQuizOrder[state.clockQuizIndex];
      const prompt = timeDateClockItems.find((item) => item.id === answerId);
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Look at the clock, then choose the matching Chinese time.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Picture choice</p><p class="numbers-game-note">Tap the Chinese time that matches the clock.</p></div></div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual"><img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" /></figure>
        <div class="clothes-quiz-options">
          ${state.clockQuizOptionIds.map((itemId) => {
        const item = timeDateClockItems.find((entry) => entry.id === itemId);
        const isSelected = state.clockQuizSelectedId === itemId;
        const resultClass = isSelected ? ` is-${state.clockQuizResult}` : "";
        const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clockQuizResult === "correct" ? "\u2713" : "\xD7"}</span>` : "";
        return `<button class="clothes-quiz-option${resultClass}" type="button" data-clock-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}
        </div>
        ${state.clockQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-clock-quiz-next>Next clock</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "\u51E0\u70B9\u4E86\uFF1F", pinyin: "j\u01D0 di\u01CEn le?", english: "What time is it?", audio: "\u51E0\u70B9\u4E86" },
        { hanzi: "\u73B0\u5728\u4E03\u70B9\u96F6\u4E94\u5206\u3002", pinyin: "xi\xE0n z\xE0i q\u012B di\u01CEn l\xEDng w\u01D4 f\u0113n.", english: "It is 7:05 now.", audio: "\u73B0\u5728\u4E03\u70B9\u96F6\u4E94\u5206" },
        { hanzi: "\u4E03\u70B9\u4E00\u523B = \u4E03\u70B9\u5341\u4E94\u5206\u3002", pinyin: "q\u012B di\u01CEn y\u012B k\xE8 = q\u012B di\u01CEn sh\xED w\u01D4 f\u0113n.", english: "7:15", audio: "\u4E03\u70B9\u4E00\u523B\u4E03\u70B9\u5341\u4E94\u5206" }
      ])}
    `;
      activityList.querySelectorAll("[data-clock-quiz-pick]").forEach((button) => {
        button.addEventListener("click", () => handleClockQuizPick(button.dataset.clockQuizPick));
      });
      activityList.querySelector("[data-clock-quiz-next]")?.addEventListener("click", nextClockQuizQuestion);
      bindPracticeSayCards(activityList);
      return;
    }
    if (topic.id === "time-date") {
      ensureTimeRoutineQuiz();
      const answerId = state.timeRoutineQuizOrder[state.timeRoutineQuizIndex];
      const prompt = timeDateRoutineItems.find((item) => item.id === answerId);
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Look at the routine picture, then choose the matching Chinese sentence.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell time-routine-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese sentence that matches the picture.</p>
          </div>
        </div>
        <figure class="clothes-quiz-visual time-routine-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.english}" />
        </figure>
        <div class="clothes-quiz-options">
          ${state.timeRoutineQuizOptionIds.map((itemId) => {
        const item = timeDateRoutineItems.find((entry) => entry.id === itemId);
        const isSelected = state.timeRoutineQuizSelectedId === itemId;
        const resultClass = isSelected ? ` is-${state.timeRoutineQuizResult}` : "";
        const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.timeRoutineQuizResult === "correct" ? "\u2713" : "\xD7"}</span>` : "";
        return `<button class="clothes-quiz-option${resultClass}" type="button" data-time-routine-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}
        </div>
        ${state.timeRoutineQuizResult === "correct" ? '<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-time-routine-quiz-next>Next picture</button></div>' : ""}
      </section>
      ${renderPracticeSayCards([
        { hanzi: "\u4F60\u6BCF\u5929\u51E0\u70B9\u8D77\u5E8A\uFF1F", pinyin: "n\u01D0 m\u011Bi ti\u0101n j\u01D0 di\u01CEn q\u01D0 chu\xE1ng?", english: "What time do you get up every day?", audio: "\u4F60\u6BCF\u5929\u51E0\u70B9\u8D77\u5E8A" },
        { hanzi: "\u6211\u6BCF\u5929\u4E03\u70B9\u8D77\u5E8A\u3002", pinyin: "w\u01D2 m\u011Bi ti\u0101n q\u012B di\u01CEn q\u01D0 chu\xE1ng.", english: "I get up at seven every day.", audio: "\u6211\u6BCF\u5929\u4E03\u70B9\u8D77\u5E8A" },
        { hanzi: "\u5237\u7259\u3001\u68B3\u5934\u3001\u7A7F\u6821\u670D\u3001\u7A7F\u978B\u5B50\u3002", pinyin: "shu\u0101 y\xE1, sh\u016B t\xF3u, chu\u0101n xi\xE0o f\xFA, chu\u0101n xi\xE9 zi.", english: "Brush teeth, comb hair, put on a school uniform, put on shoes.", audio: "\u5237\u7259\u68B3\u5934\u7A7F\u6821\u670D\u7A7F\u978B\u5B50" }
      ])}
    `;
      activityList.querySelectorAll("[data-time-routine-quiz-pick]").forEach((button) => {
        button.addEventListener("click", () => {
          handleTimeRoutineQuizPick(button.dataset.timeRoutineQuizPick);
        });
      });
      activityList.querySelector("[data-time-routine-quiz-next]")?.addEventListener("click", nextTimeRoutineQuizQuestion);
      bindPracticeSayCards(activityList);
      return;
    }
    if (topic.id === "clothes") {
      ensureClothesQuiz();
      const answerId = state.clothesQuizOrder[state.clothesQuizIndex];
      const prompt = clothesMatchItems.find((item) => item.id === answerId);
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Look at the picture, then choose the matching Chinese word.";
      activityList.className = "support-list";
      activityList.innerHTML = `
      <section class="clothes-quiz-shell">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Picture choice</p>
            <p class="numbers-game-note">Tap the Chinese word that matches the picture.</p>
          </div>
        </div>
        <figure class="clothes-quiz-visual">
          <img class="clothes-quiz-image" src="${prompt.imagePath}" alt="${prompt.imageAlt}" />
        </figure>
        <div class="clothes-quiz-options">
          ${state.clothesQuizOptionIds.map((itemId) => {
        const item = clothesMatchItems.find((entry) => entry.id === itemId);
        const isSelected = state.clothesQuizSelectedId === itemId;
        const resultClass = isSelected ? ` is-${state.clothesQuizResult}` : "";
        const mark = isSelected ? `<span class="answer-result-mark" aria-hidden="true">${state.clothesQuizResult === "correct" ? "\u2713" : "\xD7"}</span>` : "";
        return `<button class="clothes-quiz-option${resultClass}" type="button" data-clothes-quiz-pick="${item.id}">${mark}<span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`;
      }).join("")}
        </div>
        ${state.clothesQuizResult === "correct" ? `<div class="clothes-quiz-next"><button class="small-button is-action-button" type="button" data-clothes-quiz-next>Next picture</button></div>` : ""}
      </section>
    `;
      activityList.querySelectorAll("[data-clothes-quiz-pick]").forEach((button) => {
        button.addEventListener("click", () => {
          handleClothesQuizPick(button.dataset.clothesQuizPick);
        });
      });
      activityList.querySelector("[data-clothes-quiz-next]")?.addEventListener("click", nextClothesQuizQuestion);
      return;
    }
    if (topic.id === "numbers") {
      const stage = currentNumberStage();
      if (stage.telephoneMode) {
        topicColumns?.classList.add("is-hidden");
        activityPanelTitle.textContent = "";
        activityPanelSummary.textContent = "";
        activityList.className = "support-list";
        activityList.innerHTML = "";
        return;
      }
      const challengeItem = buildNumberItem(state.numberChallengeTargetValue ?? stage.start);
      ensureMathChallenge();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Practice seeing quantities quickly, then solve one small number sentence.";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      const gameCard = document.createElement("section");
      gameCard.className = "numbers-game-card";
      gameCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Quick Game</p>
          <h4>How many do you see?</h4>
        </div>
        <button class="small-button is-action-button" type="button" data-number-game-refresh>Try another</button>
      </div>
      <p class="numbers-game-note">The quantity changes each round, so kids do not always count in order from one.</p>
      <div class="numbers-game-visual">
        ${renderNumberVisual(challengeItem.value, stage)}
      </div>
      <div class="numbers-game-options">
        ${state.numberChallengeOptionValues.map((value) => {
        const option = buildNumberItem(value);
        return `
              <button class="numbers-game-option" type="button" data-number-game-guess="${value}">
                <span class="numbers-game-hanzi">${option.hanzi}</span>
                ${state.showArabic ? `<span class="numbers-game-arabic">${option.value}</span>` : ""}
                ${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}
                ${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}
              </button>
            `;
      }).join("")}
      </div>
    `;
      activityList.appendChild(gameCard);
      const mathCard = document.createElement("section");
      mathCard.className = "numbers-game-card";
      const displayAnswer = state.mathChallengeSolved ? state.mathChallengeAnswer : state.mathChallengeInput;
      const operatorSymbol = state.mathChallengeOperator;
      const operatorChinese = state.mathChallengeOperator === "+" ? "\u52A0" : "\u51CF";
      mathCard.innerHTML = `
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Mini Math</p>
        </div>
      </div>
      <p class="numbers-game-note">Type the answer and press Enter. After a correct answer, listen first, then move to the next question.</p>
      <form class="math-game-form" data-math-game-form>
        <div class="math-game-equation-wrap">
          <div class="math-game-equation">
            <span>${state.mathChallengeLeft}</span>
            <span>${operatorSymbol}</span>
            <span>${state.mathChallengeRight}</span>
            <span>=</span>
            <input
              id="math-game-input"
              class="math-game-input"
              type="text"
              inputmode="numeric"
              maxlength="3"
              autocomplete="off"
              value="${displayAnswer ?? ""}"
              ${state.mathChallengeSolved ? "disabled" : ""}
            />
          </div>
          <div class="math-game-chinese">
            <span>${numberHanzi(state.mathChallengeLeft)}</span>
            <span>${operatorChinese}</span>
            <span>${numberHanzi(state.mathChallengeRight)}</span>
            <span>\u7B49\u4E8E</span>
            <span>${state.mathChallengeSolved ? numberHanzi(state.mathChallengeAnswer) : "?"}</span>
          </div>
        </div>
      </form>
      <p class="numbers-game-note">This stage uses numbers up to ${stage.end}.</p>
      <p class="math-game-feedback">${state.lastMathFeedback}</p>
      ${state.mathChallengeSolved ? '<button class="small-button is-action-button math-game-next" type="button" data-math-game-next>Next question</button>' : ""}
    `;
      activityList.appendChild(mathCard);
      activityList.querySelector("[data-number-game-refresh]")?.addEventListener("click", () => {
        resetNumberChallenge();
        renderFocusExplorer();
        renderActivityPanel(topic);
        renderFocusStatus();
      });
      activityList.querySelectorAll("[data-number-game-guess]").forEach((button) => {
        button.addEventListener("click", () => {
          handleNumberChallengeGuess(Number(button.dataset.numberGameGuess));
        });
      });
      activityList.querySelector("[data-math-game-next]")?.addEventListener("click", () => {
        resetMathChallenge();
        renderActivityPanel(topic);
      });
      activityList.querySelector("[data-math-game-form]")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = activityList.querySelector("#math-game-input");
        handleMathChallengeSubmit(input?.value ?? "");
      });
      return;
    }
    if (topic.id === "introductions") {
      ensureIntroductionsBuilder();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Build the two core introduction patterns, then say your own name.";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      const buildTarget = introductionsBuildTarget();
      const gameCard = document.createElement("section");
      gameCard.className = "family-practice-shell";
      gameCard.innerHTML = `
      <div class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Build the sentence</p>
            <p class="numbers-game-note">Tap the word pieces in order.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-intro-build-new>New phrase</button>
        </div>
        ${state.lastIntroductionsFeedback ? `<p class="greetings-game-feedback">${state.lastIntroductionsFeedback}</p>` : ""}
        <div class="intro-build-target">
          <p class="body-match-kicker">Sentence</p>
          <div class="intro-build-selected">
            ${state.introductionsBuildSelectedTokens.length ? state.introductionsBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
          </div>
          <p class="numbers-game-english">${buildTarget.english}</p>
        </div>
        <div class="intro-build-choices">
          ${state.introductionsBuildAvailableTokens.map((token, index) => `<button class="intro-build-chip" type="button" data-intro-build-token="${index}">${token}</button>`).join("")}
        </div>
        <div class="intro-build-actions">
          <button class="small-button" type="button" data-intro-build-clear>Clear</button>
        </div>
        <div class="intro-character-grid" aria-label="Friends">
          ${Object.values(illustratedKids).map(
        (kid) => `
                <button class="intro-character-card" type="button" data-intro-character="${kid.id}">
                  <div class="intro-character-portrait">
                    <img class="intro-character-image intro-character-image-${kid.id}" src="${kid.path}" alt="${kid.label}" />
                  </div>
                  <span class="intro-character-hanzi">${kid.hanziName}</span>
                  <span class="intro-character-label">${kid.label}</span>
                </button>
              `
      ).join("")}
        </div>
      </div>
    `;
      activityList.appendChild(gameCard);
      activityList.querySelector("[data-intro-build-new]")?.addEventListener("click", () => {
        resetIntroductionsBuilder();
        renderActivityPanel(topic);
      });
      activityList.querySelector("[data-intro-build-clear]")?.addEventListener("click", () => {
        handleIntroductionsBuildClear();
      });
      activityList.querySelectorAll("[data-intro-build-token]").forEach((button) => {
        button.addEventListener("click", () => {
          handleIntroductionsBuildToken(Number(button.dataset.introBuildToken));
        });
      });
      activityList.querySelectorAll("[data-intro-character]").forEach((button) => {
        button.addEventListener("click", () => {
          const kid = illustratedKids[button.dataset.introCharacter];
          if (kid && state.tapAudioEnabled) {
            speak(`\u6211\u53EB${kid.hanziName}`, 0.78);
          }
        });
      });
      return;
    }
    if (topic.id === "age") {
      ensureAgeChallenge();
      ensureAgeBuilder();
      activityPanelTitle.textContent = "Let's practice";
      activityPanelSummary.textContent = "Practice age first, then add the grade-level question from the same Book 1A identity lesson.";
      activityList.className = "support-list";
      activityList.innerHTML = "";
      const buildTarget = ageBuildTarget();
      const gameCard = document.createElement("section");
      gameCard.className = "family-practice-shell";
      gameCard.innerHTML = `
      <div class="practice-split-board">
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Listen and choose</p>
              <h4>Which line did you hear?</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-game-play>Play audio</button>
          </div>
          <p class="numbers-game-note">Play the audio, then tap the matching age or grade question or answer.</p>
          ${state.lastAgeFeedback ? `<p class="greetings-game-feedback">${state.lastAgeFeedback}</p>` : ""}
          <div class="numbers-game-options">
            ${state.ageChallengeOptionIds.map((id) => {
        const item = ageGameItems().find((entry) => entry.id === id);
        if (!item) {
          return "";
        }
        return `
                  <button class="numbers-game-option greetings-game-option" type="button" data-age-game-guess="${item.id}">
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                    ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
                  </button>
                `;
      }).join("")}
          </div>
        </section>
        <section class="practice-split-card">
          <div class="numbers-game-top">
            <div>
              <p class="body-match-kicker">Build the phrase</p>
              <h4>${buildTarget.prompt}</h4>
            </div>
            <button class="small-button is-action-button" type="button" data-age-build-new>New phrase</button>
          </div>
          <p class="numbers-game-note">Tap the word pieces in order to build the sentence.</p>
          <div class="intro-build-target">
            <p class="body-match-kicker">Sentence</p>
            <div class="intro-build-selected">
              ${state.ageBuildSelectedTokens.length ? state.ageBuildSelectedTokens.map((token) => `<span class="intro-build-chip is-selected">${token}</span>`).join("") : '<span class="intro-build-placeholder">Your sentence will appear here.</span>'}
            </div>
            <p class="numbers-game-english">${buildTarget.english}</p>
          </div>
          <div class="intro-build-choices">
            ${state.ageBuildAvailableTokens.map(
        (token, index) => `
                  <button class="intro-build-chip" type="button" data-age-build-token="${index}">
                    ${token}
                  </button>
                `
      ).join("")}
          </div>
          <div class="intro-build-actions">
            <button class="small-button" type="button" data-age-build-clear>Clear</button>
          </div>
        </section>
      </div>
    `;
      activityList.appendChild(gameCard);
      activityList.querySelector("[data-age-game-play]")?.addEventListener("click", () => {
        handleAgeChallengePlay();
      });
      activityList.querySelectorAll("[data-age-game-guess]").forEach((button) => {
        button.addEventListener("click", () => {
          handleAgeChallengeGuess(button.dataset.ageGameGuess);
        });
      });
      activityList.querySelector("[data-age-build-new]")?.addEventListener("click", () => {
        resetAgeBuilder();
        renderActivityPanel(topic);
      });
      activityList.querySelector("[data-age-build-clear]")?.addEventListener("click", () => {
        handleAgeBuildClear();
      });
      activityList.querySelectorAll("[data-age-build-token]").forEach((button) => {
        button.addEventListener("click", () => {
          handleAgeBuildToken(Number(button.dataset.ageBuildToken));
        });
      });
      return;
    }
    topicColumns?.classList.add("is-hidden");
    activityPanelTitle.textContent = "";
    activityPanelSummary.textContent = "";
    activityList.innerHTML = "";
  }
  function renderDefaultExplorer() {
    focusExplorer.innerHTML = "";
  }
  function renderMultiplicationExplorer() {
    const items = focusItemsForTopic();
    const activeItem = currentFocusItem();
    const itemByPair = new Map(items.map((item) => [`${item.first}-${item.second}`, item]));
    focusExplorer.innerHTML = `
    <div class="multiplication-board">
      <div class="numbers-stage-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Chinese math rhythm</p>
            <h4>\u4E5D\u4E5D\u4E58\u6CD5\u53E3\u8BC0</h4>
            <p>Tap a cell in the matrix. First see the multiplication fact, then hear and read the Chinese rhyme line.</p>
          </div>
          <div class="multiplication-playback-controls">
            <button class="small-button is-action-button" type="button" data-multiplication-play-all>Play</button>
            <button class="small-button" type="button" data-multiplication-pause disabled>Pause</button>
            <button class="small-button" type="button" data-multiplication-stop disabled>Stop</button>
          </div>
        </div>
      </div>
      <div class="multiplication-matrix-card">
        <div class="multiplication-matrix">
          <div class="multiplication-corner"></div>
          ${Array.from({ length: 9 }, (_, index) => index + 1).map((value) => `<div class="multiplication-header">${value}</div>`).join("")}
          ${Array.from({ length: 9 }, (_, rowIndex) => rowIndex + 1).map((rowValue) => {
      const rowHeader = `<div class="multiplication-header">${rowValue}</div>`;
      const cells = Array.from({ length: 9 }, (_, colIndex) => colIndex + 1).map((colValue) => {
        if (colValue < rowValue) {
          return '<div class="multiplication-cell multiplication-cell-empty"></div>';
        }
        const item = itemByPair.get(`${rowValue}-${colValue}`);
        const isActive = item?.id === activeItem.id;
        return `
                    <button
                      class="multiplication-cell${isActive ? " is-active" : ""}"
                      type="button"
                      data-multiplication-item="${item?.id ?? ""}"
                    >
                      <span class="multiplication-cell-fact">${rowValue}\xD7${colValue}</span>
                      <span class="multiplication-cell-product">=${item?.product ?? ""}</span>
                    </button>
                  `;
      }).join("");
      return rowHeader + cells;
    }).join("")}
        </div>
      </div>
      <div class="multiplication-detail-card">
        <p class="body-match-kicker">Selected line</p>
        <p class="multiplication-line-hanzi">${activeItem.hanzi}</p>
        ${state.showPinyin ? `<p class="multiplication-line-pinyin">${activeItem.pinyin}</p>` : ""}
        ${state.showEnglish ? `<p class="multiplication-line-english">${activeItem.english}</p>` : ""}
        <button class="small-button is-action-button" type="button" data-multiplication-item="${activeItem.id}">Play audio</button>
      </div>
    </div>
  `;
    focusExplorer.querySelectorAll("[data-multiplication-item]").forEach((button) => {
      button.addEventListener("click", () => {
        stopMultiplicationRhyme();
        selectFocusItem(button.dataset.multiplicationItem, { playAudio: true });
      });
    });
    focusExplorer.querySelector("[data-multiplication-play-all]")?.addEventListener("click", () => {
      playMultiplicationRhyme(items, focusExplorer);
    });
    focusExplorer.querySelector("[data-multiplication-pause]")?.addEventListener("click", () => {
      toggleMultiplicationPause();
    });
    focusExplorer.querySelector("[data-multiplication-stop]")?.addEventListener("click", () => {
      stopMultiplicationRhyme();
    });
  }
  function playMultiplicationRhyme(items, container) {
    if (!state.tapAudioEnabled || !("speechSynthesis" in window)) {
      return;
    }
    stopMultiplicationRhyme();
    multiplicationPlaybackToken += 1;
    const playbackToken = multiplicationPlaybackToken;
    let index = 0;
    multiplicationPlaybackPaused = false;
    multiplicationPlaybackContainer = container;
    updateMultiplicationPlaybackControls(container);
    const playNext = () => {
      if (playbackToken !== multiplicationPlaybackToken || index >= items.length) {
        finishMultiplicationRhyme(container, playbackToken);
        return;
      }
      const item = items[index];
      index += 1;
      container.querySelectorAll(".multiplication-cell").forEach((cell) => {
        cell.classList.toggle("is-playing", cell.dataset.multiplicationItem === item.id);
      });
      const utterance = chineseUtterance(item.audio, 0.72);
      utterance.onend = () => window.setTimeout(playNext, 140);
      window.speechSynthesis.speak(utterance);
    };
    playNext();
  }
  function toggleMultiplicationPause() {
    if (!multiplicationPlaybackContainer || !("speechSynthesis" in window)) {
      return;
    }
    multiplicationPlaybackPaused = !multiplicationPlaybackPaused;
    if (multiplicationPlaybackPaused) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
    updateMultiplicationPlaybackControls(multiplicationPlaybackContainer);
  }
  function stopMultiplicationRhyme() {
    multiplicationPlaybackToken += 1;
    multiplicationPlaybackPaused = false;
    window.speechSynthesis?.cancel();
    const container = multiplicationPlaybackContainer;
    multiplicationPlaybackContainer = null;
    if (container) {
      container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => {
        cell.classList.remove("is-playing");
      });
      updateMultiplicationPlaybackControls(container);
    }
  }
  function finishMultiplicationRhyme(container, playbackToken) {
    if (playbackToken !== multiplicationPlaybackToken) {
      return;
    }
    container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => {
      cell.classList.remove("is-playing");
    });
    multiplicationPlaybackPaused = false;
    multiplicationPlaybackContainer = null;
    updateMultiplicationPlaybackControls(container);
  }
  function updateMultiplicationPlaybackControls(container) {
    const isPlaying = multiplicationPlaybackContainer === container;
    const pauseButton = container.querySelector("[data-multiplication-pause]");
    const stopButton = container.querySelector("[data-multiplication-stop]");
    if (pauseButton) {
      pauseButton.disabled = !isPlaying;
      pauseButton.textContent = multiplicationPlaybackPaused ? "Resume" : "Pause";
    }
    if (stopButton) {
      stopButton.disabled = !isPlaying;
    }
  }
  function renderFocusExplorer() {
    const topic = currentTopic();
    if (topic.interactiveScene === "body-face") {
      renderBodyExplorer();
      return;
    }
    if (topic.id === "numbers") {
      renderNumbersExplorer();
      return;
    }
    if (topic.interactiveScene === "polite-phrases") {
      renderPoliteWordsExplorer();
      return;
    }
    if (topic.interactiveScene === "introductions-conversation") {
      renderIntroductionsExplorer();
      return;
    }
    if (topic.interactiveScene === "identity-scenes") {
      renderIdentityExplorer();
      return;
    }
    if (topic.interactiveScene === "age-conversation") {
      renderAgeExplorer();
      return;
    }
    if (topic.interactiveScene === "family-home") {
      renderFamilyExplorer();
      return;
    }
    if (topic.interactiveScene === "greetings-conversation") {
      renderGreetingsExplorer();
      return;
    }
    if (topic.interactiveScene === "clothes-scenes") {
      renderClothesExplorer();
      return;
    }
    if (topic.interactiveScene === "time-date-routine") {
      renderTimeDateExplorer();
      return;
    }
    if (topic.interactiveScene === "weekdays") {
      renderWeekdaysExplorer();
      return;
    }
    if (topic.interactiveScene === "dates") {
      renderDatesExplorer();
      return;
    }
    if (topic.interactiveScene === "positions") {
      renderPositionsExplorer();
      return;
    }
    if (topic.interactiveScene === "rooms") {
      renderRoomsExplorer();
      return;
    }
    if (schoolTopicData2[topic.id]) {
      renderSchoolExplorer(topic.id);
      return;
    }
    if (["comparisons", "transport", "rooms"].includes(topic.interactiveScene)) {
      renderVisualTopicExplorer(topic.interactiveScene);
      return;
    }
    if (topic.interactiveScene === "multiplication-rhyme") {
      renderMultiplicationExplorer();
      return;
    }
    renderDefaultExplorer();
  }
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
  function topicLessonTitle(topic, step) {
    if (topic.id !== "numbers") {
      return step.title;
    }
    const stage = numberStages2.find(
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
    topicLessonStrip.innerHTML = steps.map((step) => {
      const bookId = step.book.toLowerCase();
      const isActive = currentBook().id === bookId && current.lesson === step.lesson;
      return `
        <button class="topic-lesson-card${isActive ? " is-active" : ""}" type="button" data-topic-lesson="${bookId}:${step.lesson}">
          <span class="topic-lesson-meta">Book ${step.book} Lesson ${step.lesson}</span>
          <strong>${topicLessonTitle(topic, step)}</strong>
        </button>
      `;
    }).join("");
    topicLessonStrip.querySelectorAll("[data-topic-lesson]").forEach((button) => {
      button.addEventListener("click", () => {
        const [bookId, lessonText] = button.dataset.topicLesson.split(":");
        selectBookLesson(bookId, Number(lessonText));
      });
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
      topic.id === "body" || usesLessonTemplate(topic) || topic.id === "numbers" || topic.id === "multiplication-rhyme" || topic.id === "weekdays" || topic.id === "time-date" || topic.id === "dates" || topic.id === "comparisons" || topic.id === "positions" || topic.id === "transport" || topic.id === "daily-life" || topic.id === "identity" || topic.id === "clothes" || schoolTopicData2[topic.id] || topic.id === "numbers" && currentNumberStage().telephoneMode
    );
    renderFocusControls();
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusWordList2();
    renderFocusStatus();
    renderActivityPanel(topic);
  }
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
  var {
    currentTopic,
    currentNumberStage,
    focusItemsForTopic,
    currentFocusItem,
    shuffleArray,
    topicById,
    selectedTopicGroupId,
    bookById,
    bookCategoryForBook,
    currentBook,
    currentLesson,
    syncBookSelectionFromTopic,
    syncLessonSelectionFromTopic,
    focusLearningPanel,
    scrollToSectionTop,
    narrowTopicBrowserTo,
    categoryIdForTopic,
    updateTopicPageVisibility,
    scrollCategorySectionIntoView,
    openTopicPage,
    switchView,
    toggleTopicGroup,
    renderTopicScene,
    displayControlsMarkup,
    bindDisplayControls,
    renderTopicStickyNav,
    bookAccent,
    renderBookStickyNav,
    renderStickyNav,
    categoryIconMarkup,
    renderTopics,
    renderBooks,
    updateLearningCultureNav
  } = createNavigationRuntime({
    state,
    topicData,
    books,
    topicGroups,
    learningHomeCategories,
    bookHomeCategories,
    topicCardMeta,
    topicPageUrl,
    topicGroupsRoot,
    bookSelect,
    lessonSelect,
    lookupCard,
    bookBrowser,
    topicPanel,
    bookPanel,
    detailLayout,
    learningCultureNav,
    renderFocusControls,
    renderFocusDisplay,
    renderFocusWordList: renderFocusWordList2,
    renderFocusExplorer,
    renderActivityPanel,
    renderTopicDetail,
    updateDisplayControls,
    selectBookLesson
  });
  ({
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
  } = createGreetingsController({
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
    elements: { focusExplorer, focusStatus }
  }));
  ({
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
  } = createPoliteWordsController({
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
    elements: { focusExplorer, focusStatus }
  }));
  ({
    introductionsPromptById,
    introductionsGameKids,
    introductionsSelfIntroItemForKid,
    resetIntroductionsChallenge,
    ensureIntroductionsChallenge,
    handleIntroductionsChallengePlay,
    handleIntroductionsChallengeGuess,
    introductionsBuildTarget,
    resetIntroductionsBuilder,
    ensureIntroductionsBuilder,
    handleIntroductionsBuildToken,
    handleIntroductionsBuildClear,
    renderIntroductionsExplorer
  } = createIntroductionsController({
    state,
    introductionsGameSpeakerIds,
    introductionsGamePrompts,
    introductionsBuildPhrases,
    introductionsPractice,
    illustratedKids,
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
    elements: { focusExplorer, focusStatus }
  }));
  ({
    ageGameItems,
    resetAgeChallenge,
    ensureAgeChallenge,
    handleAgeChallengePlay,
    handleAgeChallengeGuess,
    ageBuildTarget,
    resetAgeBuilder,
    ensureAgeBuilder,
    handleAgeBuildToken,
    handleAgeBuildClear,
    renderAgeExplorer
  } = createAgeController({
    state,
    ageGameItemIds,
    ageBuildPhrases,
    agePractice,
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
    elements: { focusExplorer, focusStatus }
  }));
  ({
    schoolPracticeItems,
    ensureSchoolPractice,
    renderSchoolPractice,
    renderStationeryPractice,
    renderSchoolSuppliesPractice,
    renderFoodPractice,
    renderMealsConversationPractice,
    renderFoodPreferencesPractice,
    renderClassroomPractice,
    renderSchoolExplorer
  } = createSchoolFoodRuntime({
    state,
    schoolTopicData: schoolTopicData2,
    schoolSentenceBuilds: schoolSentenceBuilds2,
    stationeryPictureMatchRounds,
    stationeryPictureMatchChoices,
    stationeryPictureMatchEnglish,
    currentTopic,
    currentBook,
    currentLesson,
    shuffleArray,
    speak,
    speakSceneLines,
    renderActivityPanel,
    focusItemsForTopic,
    activityPanelTitle,
    activityPanelSummary,
    activityList,
    focusExplorer,
    renderDefaultExplorer,
    renderListenPractice,
    renderMatchPractice
  }));
  var {
    resetWeekdayChallenge,
    ensureWeekdayChallenge,
    handleWeekdayChallengePlay,
    handleWeekdayChallengeGuess,
    resetWeekdayMatchGame,
    ensureWeekdayMatchGame,
    handleWeekdayMatchPhrase,
    handleWeekdayMatchAttempt,
    resetClothesQuiz,
    prepareClothesQuizQuestion,
    ensureClothesQuiz,
    handleClothesQuizPick,
    nextClothesQuizQuestion,
    resetTimeRoutineQuiz,
    prepareTimeRoutineQuizQuestion,
    ensureTimeRoutineQuiz,
    handleTimeRoutineQuizPick,
    nextTimeRoutineQuizQuestion,
    resetClockQuiz,
    prepareClockQuizQuestion,
    ensureClockQuiz,
    handleClockQuizPick,
    nextClockQuizQuestion,
    currentRoomBuildItem,
    resetRoomBuilder,
    prepareRoomBuilder,
    ensureRoomBuilder,
    isRoomBuildPrefixValid,
    handleRoomBuildToken,
    clearRoomBuilder,
    nextRoomBuilder,
    currentTransportBuildItem,
    resetTransportBuilder,
    prepareTransportBuilder,
    ensureTransportBuilder,
    handleTransportBuildToken,
    clearTransportBuilder,
    nextTransportBuilder,
    resetPositionQuiz,
    preparePositionQuizQuestion,
    ensurePositionQuiz,
    handlePositionQuizPlay,
    handlePositionQuizPick,
    nextPositionQuizQuestion,
    currentComparisonBuildItem,
    resetComparisonBuilder,
    prepareComparisonBuilder,
    ensureComparisonBuilder,
    handleComparisonBuildToken,
    clearComparisonBuilder,
    nextComparisonBuilder,
    resetDateMatchGame,
    ensureDateMatchGame,
    handleDateMatchPhrase,
    handleDateMatchEvent,
    resetDateChallenge,
    ensureDateChallenge,
    handleDateChallengePlay,
    handleDateChallengeGuess,
    timeDateSectionForCurrentLesson,
    activeTimeDateSection,
    renderTimeAssetGrid,
    bindTimeAssetAudio,
    renderWeekdaysExplorer,
    renderDatesExplorer,
    renderVisualTopicExplorer,
    renderRoomsExplorer,
    renderPositionsExplorer,
    renderTimeDateExplorer,
    renderClothesExplorer
  } = createTimeDailyLifeRuntime({
    state,
    timeDateWeekItems: timeDateWeekItems2,
    timeDateClockItems,
    timeDateExpressionItems,
    timeDateRoutineItems,
    datePracticeItems,
    timeDateDateItems,
    timeDateMonthItems,
    comparisonPracticeItems,
    comparisonWordItems,
    positionPracticeItems,
    positionScenes,
    clothesMatchItems,
    clothesPractice,
    roomScenes,
    roomSentenceTokens,
    transportSentenceTokens,
    visualTopicItems,
    shuffleArray,
    speak,
    speakSceneLines,
    currentTopic,
    currentBook,
    currentLesson,
    renderActivityPanel,
    focusExplorer,
    focusStatus
  });
  var {
    numberStageItems: numberStageItems2,
    resetNumberChallenge,
    ensureNumberChallenge,
    resetMathChallenge,
    ensureMathChallenge,
    familyGameItems,
    familyPersonForItemId,
    familyHeadshotForItemId,
    isFamilySentenceItemId,
    familyBookWordItems,
    usesLessonTemplate,
    bookWordItemsForTopic,
    usefulNoteForTopic,
    familyWordForPersonId,
    resetFamilyChallenge,
    ensureFamilyChallenge,
    resetListenChallengeResult,
    handleFamilyChallengePlay,
    handleFamilyChallengeGuess,
    resetFamilyMatchGame,
    ensureFamilyMatchGame,
    handleFamilyMatchPhrase,
    handleFamilyMatchAttempt,
    mathChallengeAudioText,
    handleMathChallengeSubmit,
    handleNumberChallengeGuess,
    bodyMatchItems,
    nextBodyRound,
    resetBodyMatchGame,
    ensureBodyMatchGame,
    handleBodyMatchChinese,
    handleBodyMatchAttempt,
    numberWordListItems,
    renderBodyLabelButton,
    renderBodyExplorer,
    renderNumberVisual,
    renderNumbersExplorer,
    renderTelephoneExplorer,
    renderFamilyHomeVisual,
    renderFamilyExplorer,
    renderIdentityExplorer
  } = createFoundationsRuntime({
    state,
    numberHanzi,
    numberPinyin,
    buildNumberItem,
    numberStages: numberStages2,
    telephonePractice,
    familyGameItemIds,
    familyPersonIdsByItemId,
    familyHeadshotsByItemId,
    familyPractice,
    illustratedFamily,
    illustratedKids,
    bodyBonusItemIds,
    bodyCoreItemIds,
    bodyDiagramLayout,
    identityConversation,
    identityCountries,
    identityQuestion,
    topicById,
    focusItemsForTopic,
    currentTopic,
    currentNumberStage,
    currentFocusItem,
    currentBook,
    currentLesson,
    shuffleArray,
    speak,
    speakSceneLines,
    renderActivityPanel,
    renderFocusDisplay,
    renderFocusExplorer,
    renderFocusStatus,
    selectFocusItem,
    focusExplorer,
    focusStatus
  });
  syncBookSelectionFromTopic();
  var initialTopicId = topicIdFromLocation(window.location, topicById);
  if (initialTopicId) {
    state.selectedTopicId = initialTopicId;
    state.expandedCategoryId = categoryIdForTopic(initialTopicId);
    state.topicPageOpen = true;
    syncBookSelectionFromTopic();
  }
  renderTopics();
  renderBooks();
  renderTopicDetail();
  switchView(viewFromLocation(window.location));
  updateTopicPageVisibility();
})();
