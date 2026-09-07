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
  const viewport = root?.querySelector(".feature-viewport");
  const track = root?.querySelector("[data-story-track]");
  const slides = [...(root?.querySelectorAll("[data-story-slide]") ?? [])];
  const dots = [...(root?.querySelectorAll("[data-story-dot]") ?? [])];
  let currentStory = 0;
  let scrollFrame = 0;

  const currentIndex = () => {
    if (!viewport?.clientWidth) return currentStory;
    return Math.min(
      slides.length - 1,
      Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth))
    );
  };

  const updateDots = (index = currentIndex()) => {
    currentStory = index;
    dots.forEach((dot, dotIndex) => {
      dot.toggleAttribute("aria-current", dotIndex === currentStory);
    });
  };

  const showStory = (index, behavior = "smooth") => {
    if (!viewport || !track || slides.length === 0) return;
    currentStory = (index + slides.length) % slides.length;
    viewport.scrollTo({
      left: currentStory * viewport.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : behavior,
    });
    updateDots(currentStory);
  };

  root?.querySelector("[data-story-previous]")?.addEventListener("click", () => {
    showStory(currentIndex() - 1);
  });

  root?.querySelector("[data-story-next]")?.addEventListener("click", () => {
    showStory(currentIndex() + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showStory(Number(dot.dataset.storyDot)));
  });

  viewport?.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        updateDots();
        scrollFrame = 0;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", () => showStory(currentStory, "auto"), { passive: true });

  showStory(0, "auto");
})();
