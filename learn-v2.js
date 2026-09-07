import { learningHomeCategories, topicCardMeta } from "./src/data/curriculum.js";

const categoriesElement = document.querySelector("[data-learning-categories]");
const topicGrid = document.querySelector("[data-topic-grid]");
const selectedIcon = document.querySelector("[data-selected-icon]");
const selectedZh = document.querySelector("[data-selected-zh]");
const selectedEn = document.querySelector("[data-selected-en]");
const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
const aboutMenu = document.querySelector(".about-menu");
const siteHeader = document.querySelector(".site-header");

let selectedCategoryId = "";

const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const categoryIconMarkup = (category) => {
  if (category.iconSrc) {
    return `<img src="${escapeHTML(category.iconSrc)}" alt="" decoding="async" />`;
  }

  return `<span class="category-emoji" aria-hidden="true">${escapeHTML(category.iconEmoji ?? "")}</span>`;
};

const topicUrl = (topicId) =>
  `index.html?topic=${encodeURIComponent(topicId)}#topic-detail`;

const activeCategory = () =>
  learningHomeCategories.find((category) => category.id === selectedCategoryId) ??
  learningHomeCategories[0];

const renderCategories = () => {
  categoriesElement.innerHTML = learningHomeCategories
    .map(
      (category) => `
        <button
          class="category-button"
          type="button"
          aria-pressed="${category.id === selectedCategoryId}"
          data-category-id="${escapeHTML(category.id)}"
          style="--category-accent: ${escapeHTML(category.accent)}"
        >
          <span class="category-icon" aria-hidden="true">${categoryIconMarkup(category)}</span>
          <strong lang="zh-Hans">${escapeHTML(category.zhTitle)}</strong>
          <span>${escapeHTML(category.enTitle)}</span>
        </button>
      `
    )
    .join("");

  categoriesElement.querySelectorAll("[data-category-id]").forEach((button) => {
    button.addEventListener("click", () => selectCategory(button.dataset.categoryId, true));
  });
};

const renderTopics = () => {
  const category = activeCategory();
  selectedIcon.innerHTML = categoryIconMarkup(category);
  selectedZh.textContent = category.zhTitle;
  selectedEn.textContent = category.enTitle;

  topicGrid.innerHTML = category.topicIds
    .map((topicId) => {
      const topic = topicCardMeta[topicId];
      if (!topic) return "";

      return `
        <a
          class="topic-card"
          href="${escapeHTML(topicUrl(topicId))}"
          style="--category-accent: ${escapeHTML(category.accent)}"
        >
          <span class="topic-copy">
            <strong lang="zh-Hans">${escapeHTML(topic.zhTitle)}</strong>
            <span>${escapeHTML(topic.enTitle)}</span>
            <small>${escapeHTML(topic.hint)}</small>
          </span>
          <b class="topic-arrow" aria-hidden="true">→</b>
        </a>
      `;
    })
    .join("");
};

const selectCategory = (categoryId, updateLocation = false) => {
  const category =
    learningHomeCategories.find((item) => item.id === categoryId) ??
    learningHomeCategories[0];
  selectedCategoryId = category.id;
  renderCategories();
  renderTopics();

  if (updateLocation) {
    history.replaceState(null, "", `#${category.id}`);
  }
};

const selectFromLocation = () => {
  const requestedId = location.hash.slice(1);
  selectedCategoryId = learningHomeCategories.some(
    (category) => category.id === requestedId
  )
    ? requestedId
    : learningHomeCategories[0].id;
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
  if (aboutMenu?.open && !aboutMenu.contains(event.target)) {
    aboutMenu.removeAttribute("open");
  }
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
  renderCategories();
  renderTopics();
});

selectFromLocation();
selectCategory(selectedCategoryId);
updateStickyHeader();
