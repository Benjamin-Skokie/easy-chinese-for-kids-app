(() => {
  const siteHeader = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".primary-nav");
  const aboutMenu = document.querySelector(".about-menu");

  const updateStickyHeader = () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateStickyHeader();
  window.addEventListener("scroll", updateStickyHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const open = menu?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("click", (event) => {
    if (aboutMenu?.open && !aboutMenu.contains(event.target)) {
      aboutMenu.removeAttribute("open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && aboutMenu?.open) {
      aboutMenu.removeAttribute("open");
      aboutMenu.querySelector("summary")?.focus();
    }
  });

  const root = document.querySelector("[data-featured-stories]");
  const track = root?.querySelector("[data-story-track]");
  const slides = [...(root?.querySelectorAll("[data-story-slide]") ?? [])];
  const dots = [...(root?.querySelectorAll("[data-story-dot]") ?? [])];
  let currentStory = 0;

  const showStory = (index) => {
    if (!track || slides.length === 0) return;
    currentStory = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentStory * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === currentStory) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  root?.querySelector("[data-story-previous]")?.addEventListener("click", () => {
    showStory(currentStory - 1);
  });

  root?.querySelector("[data-story-next]")?.addEventListener("click", () => {
    showStory(currentStory + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showStory(Number(dot.dataset.storyDot)));
  });
})();
