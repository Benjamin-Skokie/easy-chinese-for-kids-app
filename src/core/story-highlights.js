const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export function initializeStoryHighlights() {
  const carousel = document.querySelector("[data-story-highlights]");
  const viewport = carousel?.querySelector(".story-highlights-viewport");
  const slides = [...(carousel?.querySelectorAll(".story-highlight-slide") ?? [])];
  const dots = [...(carousel?.querySelectorAll("[data-story-highlight-dot]") ?? [])];
  if (!viewport || slides.length < 2 || reducedMotion.matches) return;

  let paused = false;
  let timerId = 0;
  const currentIndex = () => Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth)));
  const updateDots = () => {
    const activeIndex = currentIndex();
    dots.forEach((dot, index) => dot.toggleAttribute("aria-current", index === activeIndex));
  };
  const showSlide = (index, behavior = "smooth") => {
    viewport.scrollTo({ left: index * viewport.clientWidth, behavior });
    dots.forEach((dot, dotIndex) => dot.toggleAttribute("aria-current", dotIndex === index));
  };
  const step = () => { if (!paused) showSlide((currentIndex() + 1) % slides.length); };

  const pause = () => { paused = true; };
  const resume = () => { paused = false; };
  viewport.addEventListener("pointerenter", pause);
  viewport.addEventListener("pointerleave", resume);
  viewport.addEventListener("focusin", pause);
  viewport.addEventListener("focusout", resume);
  viewport.addEventListener("scroll", updateDots, { passive: true });
  dots.forEach((dot) => dot.addEventListener("click", () => showSlide(Number(dot.dataset.storyHighlightDot))));
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) window.clearInterval(timerId);
  });
  timerId = window.setInterval(step, 5200);
}
