(() => {
  const siteHeader = document.querySelector(".site-header");
  const menuButton = siteHeader?.querySelector(".menu-toggle");
  const primaryNavigation = siteHeader?.querySelector(".primary-nav");
  const aboutMenu = siteHeader?.querySelector(".about-menu");

  const updateStickyHeader = () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  const closePrimaryNavigation = () => {
    primaryNavigation?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  };

  updateStickyHeader();
  window.addEventListener("scroll", updateStickyHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const open = primaryNavigation?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("click", (event) => {
    if (aboutMenu?.open && !aboutMenu.contains(event.target)) {
      aboutMenu.removeAttribute("open");
    }
    if (primaryNavigation?.classList.contains("is-open") && !siteHeader?.contains(event.target)) {
      closePrimaryNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (aboutMenu?.open) {
      aboutMenu.removeAttribute("open");
      aboutMenu.querySelector("summary")?.focus();
    }
    if (primaryNavigation?.classList.contains("is-open")) {
      closePrimaryNavigation();
      menuButton?.focus();
    }
  });
})();
