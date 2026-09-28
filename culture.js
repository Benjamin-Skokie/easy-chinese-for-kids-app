(() => {
  // Catalog source of truth. Keep this path relative so the page works on any host.
  const catalogSource = "docs/culture/catalog_mapping_proposal.md";
  const catalogIcons = {
    "stories-legends": "assets/brand/culture-catalog-icons/stories-legends-scroll.webp",
    "people-history":
      "assets/brand/culture-catalog-icons/people-history-transparent.webp",
    "festivals-everyday":
      "assets/brand/culture-catalog-icons/festivals-everyday-life-lantern.webp",
    "arts-literature": "assets/brand/culture-catalog-icons/arts-literature-brush.webp",
    "food-clothing": "assets/brand/culture-catalog-icons/food-clothing-bowl.webp",
    "places-buildings":
      "assets/brand/culture-catalog-icons/places-buildings-transparent.webp",
    "science-inventions-trade": "assets/brand/learning-culture-coin.webp",
    "ideas-beliefs": "assets/brand/culture-catalog-icons/ideas-beliefs-lotus.webp",
  };
  // Keep the mapping memo intact while using shorter labels in compact controls.
  const subcatalogDisplayNames = {
    "myths-great-legends": "Myths & Legends",
    "trying-learning": "Learning & Growth",
    "mistakes-contradictions": "Mistakes & Contradictions",
    "plans-luck-surprises": "Plans, Luck & Surprises",
    "family-symbols-wishes": "Family, Symbols & Wishes",
    "games-boards-sports": "Games & Sports",
    "characters-painting-paper": "Writing, Painting & Paper",
    "clay-ancient-treasures": "Clay & Ancient Art",
    "rivers-mountains-scenery": "Rivers, Mountains & Scenery",
    "pandas-farms-land": "Pandas, Farms & Land",
    "homes-gardens-engineering": "Homes, Gardens & Engineering",
  };
  const representativeImages = {
    "literature/shan-hai-jing":
      "culture/books/literature/shan-hai-jing/images/1-strange-ancient-book.webp",
    "figures/mulan": "culture/books/figures/mulan/images/farewell.webp",
    "figures/cao-cao": "culture/books/figures/cao-cao/images/warrior-and-poet.webp",
    "geography/highest-mountains":
      "culture/books/geography/highest-mountains/images/everest-climbers-shared-summit.webp",
    "geography/yangtze-yellow-river":
      "culture/books/geography/yangtze-yellow-river/images/yangtze-three-gorges.webp",
    "architecture/zhaozhou-bridge":
      "culture/books/architecture/zhaozhou-bridge/images/stone-rainbow-bridge.webp",
    "military/great-wall":
      "culture/books/military/great-wall/images/1-3-beacon-tower-smoke.webp",
    "figures/zheng-he": "culture/books/figures/zheng-he/images/fleet-commander-planning.webp",
    "religion/shaolin-kung-fu":
      "culture/books/religion/shaolin-kung-fu/images/4-shaolin-staff-practice.webp",
    "religion/lord-guan":
      "culture/books/religion/lord-guan/images/2-lord-guan-shop-altar.webp",
  };
  const imageCache = new Map();

  const mainCatalogsElement = document.querySelector("[data-main-catalogs]");
  const catalogBrowser = document.querySelector("[data-catalog-browser]");
  const subcatalogsElement = document.querySelector("[data-subcatalogs]");
  const storyGrid = document.querySelector("[data-story-grid]");
  const loadingMessage = document.querySelector("[data-loading-message]");
  const menuButton = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector(".primary-nav");
  const aboutMenu = document.querySelector(".about-menu");
  const siteHeader = document.querySelector(".site-header");

  let catalogs = [];
  let selectedCatalogId = "";
  let selectedSubcatalogId = "";

  const escapeHTML = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const plainMarkdown = (value) => value.replace(/^\*|\*$/g, "").trim();

  const catalogIconMarkup = (catalogId) => {
    const source = catalogIcons[catalogId];
    return source
      ? `<img src="${escapeHTML(source)}" alt="" decoding="async" />`
      : "";
  };

  const parseCatalogs = (markdown) => {
    const parsedCatalogs = [];
    let currentCatalog = null;
    let currentSubcatalog = null;

    markdown.split(/\r?\n/).forEach((line) => {
      const catalogMatch = line.match(
        /^###\s+\d+\.\s+(.+?)\s+·\s+(.+?)\s+\(`([^`]+)`\)\s+—\s+(\d+)\s+stories/
      );
      if (catalogMatch) {
        currentCatalog = {
          zh: catalogMatch[1],
          en: catalogMatch[2],
          id: catalogMatch[3],
          count: Number(catalogMatch[4]),
          subcatalogs: [],
        };
        parsedCatalogs.push(currentCatalog);
        currentSubcatalog = null;
        return;
      }

      const subcatalogMatch = line.match(
        /^####\s+\d+\.\d+\s+(.+?)\s+·\s+(.+?)\s+\(`([^`]+)`\)\s+—\s+(\d+)/
      );
      if (subcatalogMatch && currentCatalog) {
        currentSubcatalog = {
          zh: subcatalogMatch[1],
          en: subcatalogMatch[2],
          id: subcatalogMatch[3],
          count: Number(subcatalogMatch[4]),
          stories: [],
        };
        currentCatalog.subcatalogs.push(currentSubcatalog);
        return;
      }

      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const articleMatch = cells[0]?.match(/^`([^`]+)`$/);
      if (!articleMatch || !currentSubcatalog || cells.length < 3) return;

      const titleDivider = cells[1].indexOf(" · ");
      if (titleDivider < 0) return;
      currentSubcatalog.stories.push({
        id: articleMatch[1],
        href: `culture/books/${articleMatch[1]}/index.html`,
        zh: cells[1].slice(0, titleDivider).trim(),
        en: plainMarkdown(cells[1].slice(titleDivider + 3)),
        description: cells[2],
      });
    });

    return parsedCatalogs;
  };

  const activeCatalog = () => catalogs.find((catalog) => catalog.id === selectedCatalogId);

  const activeSubcatalog = () =>
    activeCatalog()?.subcatalogs.find((subcatalog) => subcatalog.id === selectedSubcatalogId);

  const subcatalogEnglish = (subcatalog) =>
    subcatalogDisplayNames[subcatalog.id] ?? subcatalog.en;

  const updateLocation = () => {
    if (!selectedCatalogId || !selectedSubcatalogId) return;
    history.replaceState(null, "", `#${selectedCatalogId}/${selectedSubcatalogId}`);
  };

  const revealSubcatalogsIfNeeded = () => {
    requestAnimationFrame(() => {
      const browserRect = catalogBrowser.getBoundingClientRect();
      const subcatalogsRect = subcatalogsElement.getBoundingClientRect();
      const firstStoryRect = storyGrid.firstElementChild?.getBoundingClientRect();
      const headerBottom = siteHeader?.getBoundingClientRect().bottom ?? 0;
      const visibleTop = headerBottom + 12;
      const viewportBottom = window.innerHeight - 16;
      const startsBelowHeader = browserRect.top >= visibleTop;
      const controlsVisible = subcatalogsRect.bottom <= viewportBottom;
      const storyPreviewVisible = firstStoryRect
        ? Math.min(firstStoryRect.bottom, firstStoryRect.top + 96) <= viewportBottom
        : true;

      if (startsBelowHeader && controlsVisible && storyPreviewVisible) return;
      window.scrollTo({
        top: Math.max(0, window.scrollY + browserRect.top - visibleTop),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  };

  const renderMainCatalogs = () => {
    mainCatalogsElement.innerHTML = catalogs
      .map(
        (catalog, index) => `
          <button
            class="catalog-button"
            type="button"
            aria-pressed="${catalog.id === selectedCatalogId}"
            data-catalog-id="${escapeHTML(catalog.id)}"
          >
            <span class="catalog-icon" aria-hidden="true">${catalogIconMarkup(catalog.id)}</span>
            <strong lang="zh-Hans">${escapeHTML(catalog.zh)}</strong>
            <span class="catalog-en">${escapeHTML(catalog.en)}</span>
          </button>
        `
      )
      .join("");

    mainCatalogsElement.querySelectorAll("[data-catalog-id]").forEach((button) => {
      button.addEventListener("click", () => selectCatalog(button.dataset.catalogId, true));
    });
  };

  const renderSubcatalogs = () => {
    const catalog = activeCatalog();
    if (!catalog) return;

    subcatalogsElement.dataset.selectionCount = String(catalog.subcatalogs.length);
    subcatalogsElement.style.setProperty(
      "--selection-count",
      String(catalog.subcatalogs.length || 1)
    );

    subcatalogsElement.innerHTML = catalog.subcatalogs
      .map(
        (subcatalog) => `
          <button
            class="subcatalog-button"
            type="button"
            aria-pressed="${subcatalog.id === selectedSubcatalogId}"
            data-subcatalog-id="${escapeHTML(subcatalog.id)}"
          >
            <strong class="subcatalog-zh" lang="zh-Hans">${escapeHTML(subcatalog.zh)}</strong>
            <span class="subcatalog-en">${escapeHTML(subcatalogEnglish(subcatalog))}</span>
          </button>
        `
      )
      .join("");

    subcatalogsElement.querySelectorAll("[data-subcatalog-id]").forEach((button) => {
      button.addEventListener("click", () => selectSubcatalog(button.dataset.subcatalogId, true));
    });
  };

  const findRepresentativeImage = (story) => {
    if (representativeImages[story.id]) {
      return Promise.resolve(representativeImages[story.id]);
    }

    if (!imageCache.has(story.id)) {
      imageCache.set(
        story.id,
        fetch(story.href)
          .then((response) => {
            if (!response.ok) throw new Error(`Unable to load ${story.href}`);
            return response.text();
          })
          .then((html) => {
            const article = new DOMParser().parseFromString(html, "text/html");
            const image = article.querySelector(
              ".floated-image, .story-art img, .cover-art img, .page img, main img"
            );
            const source = image?.getAttribute("src");
            if (!source) return "";
            const articleFolder = story.href.slice(0, story.href.lastIndexOf("/") + 1);
            return source.startsWith("./") ? `${articleFolder}${source.slice(2)}` : source;
          })
          .catch(() => "")
      );
    }
    return imageCache.get(story.id);
  };

  const hydrateStoryImages = (stories) => {
    stories.forEach(async (story, index) => {
      const imagePath = await findRepresentativeImage(story);
      const image = storyGrid.querySelector(`[data-story-image="${CSS.escape(story.id)}"]`);
      if (!image || !imagePath) return;
      image.addEventListener("load", () => image.parentElement?.classList.add("is-ready"), {
        once: true,
      });
      image.src = imagePath;
      image.loading = index < 4 ? "eager" : "lazy";
    });
  };

  const renderStories = () => {
    const subcatalog = activeSubcatalog();
    if (!subcatalog) return;

    document.querySelector("[data-subcatalog-title]").textContent =
      subcatalogEnglish(subcatalog);
    document.querySelector("[data-story-count]").textContent = subcatalog.stories.length;
    storyGrid.innerHTML = subcatalog.stories
      .map(
        (story) => {
          const storyCard = `
          <a class="story-card" href="${escapeHTML(story.href)}">
            <span class="story-image">
              <img data-story-image="${escapeHTML(story.id)}" alt="" decoding="async" />
            </span>
            <span class="story-copy">
              <h3 lang="zh-Hans">${escapeHTML(story.zh)}</h3>
              <h4>${escapeHTML(story.en)}</h4>
              <p>${escapeHTML(story.description)}</p>
              <span class="story-link-label">Read the story <b aria-hidden="true">→</b></span>
            </span>
          </a>
          `;
          if (story.id !== "literature/shan-hai-jing") return storyCard;
          return `
            <article class="story-card-bundle" data-story-experience="shan-hai-jing-map">
              ${storyCard}
              <a class="story-map-link" href="culture/books/literature/shan-hai-jing/map/index.html" data-creature-map-entry>
                <span lang="zh-Hans">认识奇兽</span>
                <span lang="en">Meet the Mythical Creatures <b aria-hidden="true">→</b></span>
              </a>
            </article>
          `;
        }
      )
      .join("");
    hydrateStoryImages(subcatalog.stories);
  };

  const renderSelectedCatalog = () => {
    const catalog = activeCatalog();
    if (!catalog) return;
    document.querySelector("[data-selected-icon]").innerHTML = catalogIconMarkup(catalog.id);
    document.querySelector("[data-selected-zh]").textContent = catalog.zh;
    document.querySelector("[data-selected-en]").textContent = catalog.en;
    document.querySelector("[data-selected-count]").textContent = catalog.count;
    catalogBrowser.hidden = false;
    renderSubcatalogs();
    renderStories();
  };

  const selectCatalog = (catalogId, shouldUpdateLocation = false) => {
    const catalog = catalogs.find((item) => item.id === catalogId) ?? catalogs[0];
    selectedCatalogId = catalog.id;
    selectedSubcatalogId = catalog.subcatalogs[0]?.id ?? "";
    renderMainCatalogs();
    renderSelectedCatalog();
    if (shouldUpdateLocation) {
      updateLocation();
      revealSubcatalogsIfNeeded();
    }
  };

  const selectSubcatalog = (subcatalogId, shouldUpdateLocation = false) => {
    const catalog = activeCatalog();
    if (!catalog?.subcatalogs.some((subcatalog) => subcatalog.id === subcatalogId)) return;
    selectedSubcatalogId = subcatalogId;
    renderSubcatalogs();
    renderStories();
    if (shouldUpdateLocation) updateLocation();
  };

  const selectFromLocation = () => {
    const [catalogId, subcatalogId] = location.hash.slice(1).split("/");
    const catalog = catalogs.find((item) => item.id === catalogId) ?? catalogs[0];
    selectedCatalogId = catalog.id;
    selectedSubcatalogId =
      catalog.subcatalogs.find((item) => item.id === subcatalogId)?.id ?? catalog.subcatalogs[0]?.id;
  };

  const updateStickyHeader = () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  menuButton?.addEventListener("click", () => {
    const open = primaryNavigation?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("click", (event) => {
    if (aboutMenu?.open && !aboutMenu.contains(event.target)) aboutMenu.removeAttribute("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    aboutMenu?.removeAttribute("open");
    primaryNavigation?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });

  window.addEventListener("scroll", updateStickyHeader, { passive: true });
  window.addEventListener("hashchange", () => {
    if (!catalogs.length) return;
    selectFromLocation();
    renderMainCatalogs();
    renderSelectedCatalog();
  });

  updateStickyHeader();

  fetch(catalogSource)
    .then((response) => {
      if (!response.ok) throw new Error("The catalog memo could not be loaded.");
      return response.text();
    })
    .then((markdown) => {
      catalogs = parseCatalogs(markdown);
      const totalStories = catalogs.reduce((sum, catalog) => sum + catalog.count, 0);
      if (catalogs.length !== 8 || totalStories !== 114) {
        throw new Error("The catalog memo is incomplete.");
      }
      document.querySelector("[data-total-stories]").textContent = totalStories;
      selectFromLocation();
      renderMainCatalogs();
      renderSelectedCatalog();
      loadingMessage.hidden = true;
    })
    .catch((error) => {
      loadingMessage.textContent = error.message;
      loadingMessage.classList.add("is-error");
    });
})();
