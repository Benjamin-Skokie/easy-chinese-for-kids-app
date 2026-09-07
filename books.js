import { books } from "./src/data/curriculum.js";

const bookCatalogs = document.querySelector("[data-book-catalogs]");
const lessonGrid = document.querySelector("[data-lesson-grid]");
const selectedIcon = document.querySelector("[data-selected-icon]");
const selectedZh = document.querySelector("[data-selected-zh]");
const selectedEn = document.querySelector("[data-selected-en]");
const lessonListTitle = document.querySelector("[data-lesson-list-title]");
const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
const aboutMenu = document.querySelector(".about-menu");
const siteHeader = document.querySelector(".site-header");

let selectedBookId = "";
let selectedLessonNumber = null;

const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const activeBook = () =>
  books.find((book) => book.id === selectedBookId) ?? books[0];

const bookCode = (book) => book.id.toUpperCase();

const lessonUrl = (book, lesson) => {
  const params = new URLSearchParams({
    topic: lesson.topicId,
    book: book.id,
    lesson: String(lesson.lesson),
  });
  return `lesson.html?${params.toString()}`;
};

const renderBookCatalogs = () => {
  bookCatalogs.innerHTML = books
    .map(
      (book) => `
        <button
          class="category-button"
          type="button"
          aria-pressed="${book.id === selectedBookId}"
          data-book-id="${escapeHTML(book.id)}"
          style="--category-accent: var(--teal-700)"
        >
          <span class="category-icon" aria-hidden="true">
            <span class="book-code">${escapeHTML(bookCode(book))}</span>
          </span>
          <strong lang="zh-Hans">课本 ${escapeHTML(bookCode(book))}</strong>
          <span>${escapeHTML(book.label)}</span>
        </button>
      `
    )
    .join("");

  bookCatalogs.querySelectorAll("[data-book-id]").forEach((button) => {
    button.addEventListener("click", () => selectBook(button.dataset.bookId, true));
  });
};

const renderLessons = () => {
  const book = activeBook();
  const code = bookCode(book);
  selectedIcon.innerHTML = `<span class="selected-book-code">${escapeHTML(code)}</span>`;
  selectedZh.textContent = `课本 ${code}`;
  selectedEn.textContent = book.label;
  lessonListTitle.textContent = book.label;

  lessonGrid.innerHTML = book.lessons
    .map(
      (lesson) => `
        <a
          class="topic-card book-lesson-card${lesson.lesson === selectedLessonNumber ? " is-selected" : ""}"
          href="${escapeHTML(lessonUrl(book, lesson))}"
          style="--category-accent: var(--teal-700)"
          ${lesson.lesson === selectedLessonNumber ? 'aria-current="page"' : ""}
        >
          <span class="topic-copy">
            <span class="book-lesson-label">LESSON ${lesson.lesson}</span>
            <strong lang="zh-Hans">${escapeHTML(lesson.displayTitle?.zh ?? lesson.title)}</strong>
            <span>${escapeHTML(lesson.displayTitle?.en ?? lesson.title)}</span>
          </span>
          <b class="topic-arrow" aria-hidden="true">→</b>
        </a>
      `
    )
    .join("");
};

const selectBook = (bookId, updateLocation = false) => {
  const book = books.find((item) => item.id === bookId) ?? books[0];
  selectedBookId = book.id;
  selectedLessonNumber = null;
  renderBookCatalogs();
  renderLessons();
  if (updateLocation) history.replaceState(null, "", `#${book.id}`);
};

const selectFromLocation = () => {
  const [requestedBookId, requestedLesson] = location.hash.slice(1).toLowerCase().split("/");
  selectedBookId = books.some((book) => book.id === requestedBookId)
    ? requestedBookId
    : books[0].id;
  const lessonNumber = Number(requestedLesson);
  selectedLessonNumber = activeBook().lessons.some((lesson) => lesson.lesson === lessonNumber)
    ? lessonNumber
    : null;
};

const updateStickyHeader = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
};

menuButton?.addEventListener("click", () => {
  const open = primaryNavigation?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

document.addEventListener("click", (event) => {
  if (aboutMenu?.open && !aboutMenu.contains(event.target)) aboutMenu.removeAttribute("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  aboutMenu?.removeAttribute("open");
  primaryNavigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
});

window.addEventListener("scroll", updateStickyHeader, { passive: true });
window.addEventListener("hashchange", () => {
  selectFromLocation();
  renderBookCatalogs();
  renderLessons();
});

selectFromLocation();
renderBookCatalogs();
renderLessons();
updateStickyHeader();
