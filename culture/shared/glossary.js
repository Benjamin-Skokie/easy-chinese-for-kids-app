(() => {
  const entries = Array.from(document.querySelectorAll(".glossary-entry"));
  if (!entries.length) return;

  const closeEntry = (entry) => {
    entry.dataset.open = "false";
    entry.style.removeProperty("--glossary-left");
    entry.style.removeProperty("--glossary-top");
    entry.style.removeProperty("--glossary-arrow-left");
    const button = entry.querySelector(".glossary-term");
    if (button) button.setAttribute("aria-expanded", "false");
  };

  const closeAll = (except = null) => {
    for (const entry of entries) {
      if (entry !== except) closeEntry(entry);
    }
  };

  const placePopover = (entry) => {
    requestAnimationFrame(() => {
      const button = entry.querySelector(".glossary-term");
      const popover = entry.querySelector(".glossary-popover");
      if (!button || !popover) return;

      const margin = 12;
      const gap = 10;
      const buttonRect = button.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const halfWidth = popoverRect.width / 2;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const minCenter = margin + halfWidth;
      const maxCenter = window.innerWidth - margin - halfWidth;
      const left = Math.min(Math.max(buttonCenter, minCenter), maxCenter);

      let side = "above";
      let top = buttonRect.top - popoverRect.height - gap;

      if (top < margin) {
        side = "below";
        top = buttonRect.bottom + gap;
      }

      if (side === "below" && top + popoverRect.height > window.innerHeight - margin) {
        const fallbackTop = buttonRect.top - popoverRect.height - gap;
        if (fallbackTop >= margin) {
          side = "above";
          top = fallbackTop;
        } else {
          top = Math.max(margin, window.innerHeight - margin - popoverRect.height);
        }
      }

      const popoverLeft = left - halfWidth;
      const arrowLeft = Math.min(
        Math.max(buttonCenter - popoverLeft, 16),
        Math.max(16, popoverRect.width - 16)
      );

      entry.dataset.side = side;
      entry.style.setProperty("--glossary-left", left + "px");
      entry.style.setProperty("--glossary-top", top + "px");
      entry.style.setProperty("--glossary-arrow-left", arrowLeft + "px");
    });
  };

  const toggleEntry = (entry) => {
    const shouldOpen = entry.dataset.open !== "true";
    closeAll(entry);
    entry.dataset.open = shouldOpen ? "true" : "false";

    const button = entry.querySelector(".glossary-term");
    if (button) {
      button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
      if (!shouldOpen) button.blur();
    }

    if (shouldOpen) placePopover(entry);
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".glossary-term");
    if (button) {
      event.preventDefault();
      toggleEntry(button.closest(".glossary-entry"));
      return;
    }

    if (!event.target.closest(".glossary-entry")) {
      closeAll();
      if (document.activeElement && document.activeElement.classList.contains("glossary-term")) {
        document.activeElement.blur();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
      if (document.activeElement && document.activeElement.classList.contains("glossary-term")) {
        document.activeElement.blur();
      }
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("glossary-term")) {
      event.preventDefault();
      toggleEntry(event.target.closest(".glossary-entry"));
    }
  });

  for (const entry of entries) {
    entry.addEventListener("mouseenter", () => placePopover(entry));
  }

  window.addEventListener("resize", () => closeAll());
  window.addEventListener("scroll", () => closeAll(), { passive: true });
})();
