(() => {
  const header = document.querySelector(".topic-site-header");
  const menuButton = header?.querySelector(".menu-toggle");
  const primaryNavigation = header?.querySelector(".primary-nav");
  const aboutMenu = header?.querySelector(".about-menu");

  const updateStickyHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 10);
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
  updateStickyHeader();
})();
