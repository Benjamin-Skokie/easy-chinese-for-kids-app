import { learningHomeCategories, topicCardMeta } from "./src/data/curriculum.js";

const categoriesElement = document.querySelector("[data-learning-categories]");
const topicGrid = document.querySelector("[data-topic-grid]");
const selectedIcon = document.querySelector("[data-selected-icon]");
const selectedZh = document.querySelector("[data-selected-zh]");
const selectedEn = document.querySelector("[data-selected-en]");
const subcatalogBrowser = document.querySelector("[data-subcatalog-browser]");
const subcatalogsElement = document.querySelector("[data-subcatalogs]");
const topicListTitle = document.querySelector("[data-topic-list-title]");
const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
const aboutMenu = document.querySelector(".about-menu");
const siteHeader = document.querySelector(".site-header");

let selectedCategoryId = "";
let selectedSubcatalogId = "";

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

const activeSubcatalog = () =>
  activeCategory().subcatalogs?.find(
    (subcatalog) => subcatalog.id === selectedSubcatalogId
  );

const subcatalogForTopic = (category, topicId) =>
  category.subcatalogs?.find((subcatalog) => subcatalog.topicIds.includes(topicId));

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
  const subcatalog = activeSubcatalog();
  const topicIds = subcatalog?.topicIds ?? category.topicIds;
  selectedIcon.innerHTML = categoryIconMarkup(category);
  selectedZh.textContent = category.zhTitle;
  selectedEn.textContent = category.enTitle;
  topicListTitle.textContent = subcatalog?.enTitle ?? "";

  topicGrid.innerHTML = topicIds
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

const renderSubcatalogs = () => {
  const category = activeCategory();
  const subcatalogs = category.subcatalogs ?? [];
  subcatalogBrowser.hidden = subcatalogs.length === 0;

  if (!subcatalogs.length) {
    subcatalogsElement.innerHTML = "";
    return;
  }

  subcatalogsElement.innerHTML = subcatalogs
    .map(
      (subcatalog) => `
        <button
          class="subcatalog-button"
          type="button"
          aria-pressed="${subcatalog.id === selectedSubcatalogId}"
          data-subcatalog-id="${escapeHTML(subcatalog.id)}"
          style="--category-accent: ${escapeHTML(category.accent)}"
        >
          <strong lang="zh-Hans">${escapeHTML(subcatalog.zhTitle)}</strong>
          <span>${escapeHTML(subcatalog.enTitle)}</span>
        </button>
      `
    )
    .join("");

  subcatalogsElement.querySelectorAll("[data-subcatalog-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSubcatalogId = button.dataset.subcatalogId;
      renderSubcatalogs();
      renderTopics();
      updateLocationHash();
    });
  });
};

const selectCategory = (categoryId, updateLocation = false) => {
  const category =
    learningHomeCategories.find((item) => item.id === categoryId) ??
    learningHomeCategories[0];
  selectedCategoryId = category.id;
  selectedSubcatalogId = category.subcatalogs?.[0]?.id ?? "";
  renderCategories();
  renderSubcatalogs();
  renderTopics();

  if (updateLocation) {
    updateLocationHash();
  }
};

const updateLocationHash = () => {
  if (!selectedCategoryId) return;
  const catalogPath = selectedSubcatalogId
    ? `${selectedCategoryId}/${selectedSubcatalogId}`
    : selectedCategoryId;
  history.replaceState(
    null,
    "",
    `#${catalogPath}`
  );
};

const selectFromLocation = () => {
  const [requestedCategoryId, requestedSubcatalogId] = location.hash
    .slice(1)
    .split("/");
  const category =
    learningHomeCategories.find((item) => item.id === requestedCategoryId) ??
    learningHomeCategories[0];
  selectedCategoryId = category.id;
  const requestedSubcatalog = category.subcatalogs?.find(
    (subcatalog) => subcatalog.id === requestedSubcatalogId
  );
  const legacyTopicSubcatalog = subcatalogForTopic(category, requestedSubcatalogId);
  selectedSubcatalogId =
    requestedSubcatalog?.id ??
    legacyTopicSubcatalog?.id ??
    category.subcatalogs?.[0]?.id ??
    "";
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
  renderSubcatalogs();
  renderTopics();
});

selectFromLocation();
renderCategories();
renderSubcatalogs();
renderTopics();
updateStickyHeader();
