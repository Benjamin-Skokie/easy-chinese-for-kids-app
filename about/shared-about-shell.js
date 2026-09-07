(() => {
  const siteHeader = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector(".primary-nav");
  const aboutMenu = document.querySelector(".about-menu");

  const closeNavigation = () => {
    primaryNavigation?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  };

  const updateStickyHeader = () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  menuButton?.addEventListener("click", () => {
    const open = primaryNavigation?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  primaryNavigation?.addEventListener("click", closeNavigation);

  document.addEventListener("click", (event) => {
    if (aboutMenu?.open && !aboutMenu.contains(event.target)) aboutMenu.removeAttribute("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    aboutMenu?.removeAttribute("open");
    closeNavigation();
  });

  window.addEventListener("scroll", updateStickyHeader, { passive: true });
  updateStickyHeader();
})();
