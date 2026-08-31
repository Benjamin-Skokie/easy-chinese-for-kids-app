const stories = window.NIHAO_CULTURE_SOURCES ?? [];
const storyList = document.querySelector("[data-story-sources]");
const searchInput = document.querySelector("[data-source-search]");
const filterRoot = document.querySelector("[data-source-filters]");
const countLabel = document.querySelector("[data-source-count]");
const emptyState = document.querySelector("[data-empty-state]");
let activeCategory = "All";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderStory(story) {
  const details = element("details", "story-source-card");
  const summary = element("summary");
  const heading = element("span", "story-source-heading");
  heading.append(element("small", "story-category", story.categoryName));
  heading.append(element("strong", "story-title", story.title));
  if (story.titleEn) heading.append(element("span", "story-title-en", story.titleEn));
  const meta = element("span", "story-source-meta", `${story.groups.reduce((sum, group) => sum + group.sources.length, 0)} citations  +`);
  summary.append(heading, meta);
  details.append(summary);

  const body = element("div", "story-source-body");
  const storyLink = element("a", "story-link", "Read this story →");
  storyLink.href = story.storyPath;
  body.append(storyLink);

  story.groups.forEach((group) => {
    const section = element("section", "citation-group");
    section.append(element("h3", "", group.title));
    const list = element("ol", "citation-list");
    group.sources.forEach((source) => {
      const item = element("li");
      item.append(element("strong", "", source.label));
      item.append(element("span", "citation-url", source.url));
      list.append(item);
    });
    section.append(list);
    body.append(section);
  });

  details.append(body);
  return details;
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visible = stories.filter((story) => {
    const categoryMatch = activeCategory === "All" || story.categoryName === activeCategory;
    const textMatch = !query || `${story.title} ${story.titleEn} ${story.slug} ${story.categoryName}`.toLocaleLowerCase().includes(query);
    return categoryMatch && textMatch;
  });

  storyList.replaceChildren(...visible.map(renderStory));
  countLabel.textContent = `${visible.length} ${visible.length === 1 ? "story" : "stories"}`;
  emptyState.hidden = visible.length !== 0;
}

const categories = ["All", ...new Set(stories.map((story) => story.categoryName))];
categories.forEach((category) => {
  const button = element("button", category === "All" ? "is-active" : "", category);
  button.type = "button";
  button.addEventListener("click", () => {
    activeCategory = category;
    filterRoot.querySelectorAll("button").forEach((entry) => entry.classList.toggle("is-active", entry === button));
    render();
  });
  filterRoot.append(button);
});

searchInput.addEventListener("input", render);
render();
