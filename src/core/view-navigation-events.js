export function bindViewNavigationEvents({ state, switchView, updateTopicPageVisibility }) {
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
      document.querySelector(".switcher-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      link.closest(".global-view-menu")?.removeAttribute("open");
    });
  });
}
