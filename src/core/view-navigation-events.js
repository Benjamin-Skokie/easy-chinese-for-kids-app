export function bindViewNavigationEvents({ state, switchView, updateTopicPageVisibility }) {
  const viewHash = (view) => ({ topics: "#topics-panel", books: "#books-panel", culture: "#culture-panel" }[view] ?? "#topics-panel");

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.view);
    });
  });

  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.viewTarget);
      document.querySelector(".switcher-panel")?.scrollIntoView({
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
      window.history.pushState(null, "", `${window.location.pathname}${viewHash(link.dataset.globalView)}`);
      document.querySelector(".switcher-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      link.closest(".global-view-menu")?.removeAttribute("open");
    });
  });

  document.querySelectorAll("[data-culture-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      const target = document.getElementById(`culture-${link.dataset.cultureTarget}`);
      if (!target) {
        return;
      }

      document.querySelectorAll("[data-culture-target]").forEach((card) => {
        card.classList.toggle("is-selected", card === link);
      });
      window.history.pushState(null, "", link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
