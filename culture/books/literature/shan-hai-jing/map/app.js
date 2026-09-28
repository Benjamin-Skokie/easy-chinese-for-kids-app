import { creatures } from "./creatures.js?v=20260928-jingwei-sea-v1";
import { creatureStories } from "./stories.js?v=20260928-source-audit-v1";
import { worldMap, regions, annotations } from "./map-regions.js?v=20260928-jingwei-sea-v1";
import { cameraForBounds, creaturesInView } from "./map-camera.js?v=20260927-grounded-world-v1";
import { creatureScene, foregroundPath } from "./map-scenes.js?v=20260928-habitat-cover-v1";

const experience = document.querySelector("[data-map-experience]");
const viewport = document.querySelector("[data-map-viewport]");
const world = document.querySelector("[data-map-world]");
const layer = document.querySelector("[data-creature-layer]");
const mapBase = document.querySelector("[data-map-base]");
const creatureName = document.querySelector("[data-creature-name]");
const annotationLayer = document.querySelector("[data-annotation-layer]");
const regionSwitcher = document.querySelector("[data-region-switcher]");
const previewLayer = document.querySelector("[data-preview-creatures]");
const previewRegions = document.querySelector("[data-preview-regions]");
const sheet = document.querySelector("[data-creature-sheet]");
const sheetContent = document.querySelector("[data-sheet-content]");
const scrim = document.querySelector(".sheet-scrim");
const hintText = document.querySelector("[data-hint-text]");
const catalog = document.querySelector("[data-creature-catalog]");
const catalogCount = document.querySelector("[data-catalog-count]");
const chapterFilters = document.querySelector("[data-chapter-filters]");
const kindFilters = document.querySelector("[data-kind-filters]");

const WORLD_WIDTH = worldMap.width;
const WORLD_HEIGHT = worldMap.height;
world.style.setProperty("--world-width", `${WORLD_WIDTH}px`);
world.style.setProperty("--world-height", `${WORLD_HEIGHT}px`);
const chapterNamesEn = {
  "《南山经》": "The Southern Mountains",
  "《西山经》": "The Western Mountains",
  "《北山经》": "The Northern Mountains",
  "《东山经》": "The Eastern Mountains",
  "《中山经》": "The Central Mountains",
  "《大荒东经》": "The Great Wilderness: East",
  "《大荒北经》": "The Great Wilderness: North",
  "《海内北经》": "Within the Seas: North"
};
const kindNames = {
  beast: { zh: "走兽", en: "Beasts" },
  bird: { zh: "飞鸟", en: "Birds" },
  water: { zh: "水族", en: "Water creatures" },
  spirit: { zh: "神异", en: "Spirits" }
};
const catalogState = { chapter: "all", kind: "all" };
const state = {
  scale: 1,
  minScale: 1,
  maxScale: 4.5,
  x: 0,
  y: 0,
  pointers: new Map(),
  gesture: null,
  found: new Set(),
  hintIndex: 0,
  lastFocus: null,
  sheetFocus: null,
  discoveryTarget: null,
  discoveryTimer: null,
  regionId: "all",
  viewportWidth: 0,
  viewportHeight: 0
};

function hideCreatureName() {
  creatureName.hidden = true;
}

function showCreatureName(creature, button) {
  if (state.pointers.size || sheet.classList.contains("is-open")) return;
  creatureName.querySelector('[lang="zh-Hans"]').textContent = creature.nameZh;
  creatureName.querySelector('[lang="en"]').textContent = creature.nameEn;
  creatureName.hidden = false;

  // Keep the name readable at every zoom level, including near the map edges.
  const bounds = viewport.getBoundingClientRect();
  const target = button.getBoundingClientRect();
  const width = creatureName.offsetWidth;
  const height = creatureName.offsetHeight;
  const gap = 10;
  const left = (target.left + target.right) / 2 - bounds.left - width / 2;
  const above = target.top - bounds.top - height - gap;
  const top = above >= gap ? above : target.bottom - bounds.top + gap;
  creatureName.style.left = `${Math.max(gap, Math.min(bounds.width - width - gap, left))}px`;
  creatureName.style.top = `${Math.max(gap, Math.min(bounds.height - height - gap, top))}px`;
}

function updateNavigation() {
  regionSwitcher.querySelectorAll("[data-region]").forEach((button) => {
    const active = button.dataset.region === state.regionId;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderMap() {
  mapBase.src = worldMap.image;
  mapBase.alt = "《山海经》的山海世界：西山、北山、中山、东山、南山和东海 / One continuous world of mountains and seas";
  const destinations = [{ id: "all", nameZh: "全图", nameEn: "Whole map" }, ...regions];
  regionSwitcher.innerHTML = destinations.map((item) => `
    <button class="region-tab${item.id === state.regionId ? " is-active" : ""}" type="button" data-region="${escapeHtml(item.id)}" aria-pressed="${item.id === state.regionId}" aria-label="${item.id === "all" ? "查看整张地图 / See the whole map" : `放大${escapeHtml(item.nameZh)} / Explore ${escapeHtml(item.nameEn)}`} ">
      <span>${escapeHtml(item.nameZh)}</span><small lang="en">${escapeHtml(item.nameEn)}</small>
    </button>
  `).join("");
  regionSwitcher.querySelectorAll("[data-region]").forEach((button) => {
    button.addEventListener("click", () => {
      focusRegion(button.dataset.region);
    });
  });
  annotationLayer.innerHTML = annotations.filter((item) => item.overview).map((item) => `
    <p class="map-annotation map-annotation--${escapeHtml(item.kind)}" style="--x:${item.x}; --y:${item.y}">
      <span>${escapeHtml(item.textZh)}</span><small lang="en">${escapeHtml(item.textEn)}</small>
    </p>
  `).join("");
  previewRegions.innerHTML = annotations.filter((item) => item.overview).map((item) => `
    <span class="map-preview-region" style="--x:${item.x}; --y:${item.y}"><strong>${escapeHtml(item.textZh)}</strong><small lang="en">${escapeHtml(item.textEn)}</small></span>
  `).join("");
  renderCreatures();
  previewLayer.innerHTML = creatures.map((creature) => `
    <span class="creature-hotspot creature-hotspot--${creatureScene(creature, worldMap).surface}" style="${creaturePlacementStyle(creature)}">${creatureArt(creature)}</span>
  `).join("") + terrainForeground("preview-ground");
  hideCreatureName();
  hintText.textContent = "放大、拖动地图，再点一点奇兽。 · Zoom, drag, and tap a creature to meet it.";
}

function focusRegion(regionId) {
  const region = regions.find((item) => item.id === regionId);
  if (regionId !== "all" && !region) return;
  closeSheet(false);
  state.pointers.clear();
  state.gesture = null;
  viewport.classList.remove("is-dragging");
  state.hintIndex = 0;
  if (regionId === "all") {
    fitMap();
  } else {
    const bounds = viewport.getBoundingClientRect();
    const camera = cameraForBounds(bounds, worldMap, region.bounds);
    state.regionId = regionId;
    state.scale = Math.min(state.maxScale, Math.max(state.minScale, camera.scale));
    state.x = bounds.width / 2 - WORLD_WIDTH * (region.bounds.x + region.bounds.width / 2) / 100 * state.scale;
    state.y = bounds.height / 2 - WORLD_HEIGHT * (region.bounds.y + region.bounds.height / 2) / 100 * state.scale;
    clampPosition();
    applyTransform();
    updateNavigation();
  }
  hintText.textContent = "拖动地图，看看这片山水里还藏着谁。 · Drag the map. Who else is hiding nearby?";
}

function filterButton(value, zh, en, active, group) {
  return `
    <button class="filter-pill${active ? " is-active" : ""}" type="button" data-filter-group="${group}" data-filter-value="${escapeHtml(value)}" aria-pressed="${active}">
      <span lang="en">${escapeHtml(en)}</span><span lang="zh-Hans">${escapeHtml(zh)}</span>
    </button>
  `;
}

function renderCatalogFilters() {
  const chapters = [...new Set(creatures.map((creature) => creature.chapter))];
  chapterFilters.innerHTML = [
    filterButton("all", "全部", "All", catalogState.chapter === "all", "chapter"),
    ...chapters.map((chapter) => filterButton(
      chapter,
      chapter.replace(/[《》]/g, ""),
      (chapterNamesEn[chapter] || chapter).replace(/^The /, ""),
      catalogState.chapter === chapter,
      "chapter"
    ))
  ].join("");

  kindFilters.innerHTML = [
    filterButton("all", "全部", "All", catalogState.kind === "all", "kind"),
    ...Object.entries(kindNames).map(([key, label]) => filterButton(
      key,
      label.zh,
      label.en,
      catalogState.kind === key,
      "kind"
    ))
  ].join("");

  document.querySelectorAll("[data-filter-group]").forEach((button) => {
    button.addEventListener("click", () => {
      catalogState[button.dataset.filterGroup] = button.dataset.filterValue;
      renderCatalogFilters();
      renderCatalog();
    });
  });
}

function catalogCard(creature) {
  return `
    <article class="catalog-card">
      <button type="button" data-catalog-creature="${escapeHtml(creature.id)}" aria-label="查看${escapeHtml(creature.nameZh)}的故事 / Meet ${escapeHtml(creature.nameEn)}">
        <figure class="catalog-card-art catalog-card-art--${escapeHtml(creature.id)}">
          <img src="${creature.image}" alt="${escapeHtml(creature.nameZh)}" loading="lazy" draggable="false" />
        </figure>
        <div class="catalog-card-copy">
          <p class="catalog-card-source">${escapeHtml(creature.chapter)} · ${escapeHtml(creature.kind.zh)} <span lang="en">${escapeHtml(creature.kind.en)}</span></p>
          <h3>${escapeHtml(creature.nameZh)} <span>${escapeHtml(creature.pinyin)}</span></h3>
          <p class="catalog-card-en" lang="en">${escapeHtml(creature.nameEn)}</p>
          <div class="catalog-tags" aria-label="地点和特点">
            <span>📍 ${escapeHtml(creature.locationZh)}</span>
            <span>${escapeHtml(creature.habitat.zh)}</span>
            ${creature.traits.map((trait) => `<span>${escapeHtml(trait.zh)}</span>`).join("")}
          </div>
          <span class="catalog-card-action">看故事 <small lang="en">Meet this creature</small> →</span>
        </div>
      </button>
    </article>
  `;
}

function renderCatalog() {
  const visibleCreatures = creatures.filter((creature) => (
    (catalogState.chapter === "all" || creature.chapter === catalogState.chapter)
    && (catalogState.kind === "all" || creature.kind.key === catalogState.kind)
  ));

  catalogCount.textContent = `找到 ${visibleCreatures.length} 组奇兽 · Showing ${visibleCreatures.length} creature ${visibleCreatures.length === 1 ? "entry" : "entries"}`;
  catalog.innerHTML = visibleCreatures.map(catalogCard).join("");
  catalog.querySelectorAll("[data-catalog-creature]").forEach((button) => {
    button.addEventListener("click", () => {
      const creature = creatures.find((item) => item.id === button.dataset.catalogCreature);
      if (creature) openMap(button, creature);
    });
  });
}

function creaturePlacementStyle(creature) {
  const scene = creatureScene(creature, worldMap);
  return `--x:${creature.position.x};--y:${creature.position.y};--width:${creature.position.width};--anchor-y:${-100 * scene.anchorHeight}%;--flight-clearance:${(scene.lowFlight?.clearance || 0) * 100}%;--immersion:${scene.immersion * 100}%`;
}

function creatureArt(creature) {
  const { frame, surface, lowFlight } = creatureScene(creature, worldMap);
  const imageStyle = `left:${-frame.left / frame.artWidth * 100}%;top:${-frame.top / frame.artHeight * 100}%;width:${frame.width / frame.artWidth * 100}%;height:${frame.height / frame.artHeight * 100}%`;
  const contact = lowFlight ? `creature-contact creature-contact--low-flight creature-contact--over-${lowFlight.over}` : "creature-contact";
  return `${surface === "air" && !lowFlight ? "" : `<span class="${contact}" aria-hidden="true"></span>`}<span class="creature-figure" style="aspect-ratio:${frame.artWidth}/${frame.artHeight}"><img src="${escapeHtml(creature.image)}" alt="" draggable="false" style="${imageStyle}" /></span>`;
}

function terrainForeground(id) {
  const paths = creatures.map((creature) => foregroundPath(creatureScene(creature, worldMap))).filter(Boolean);
  return `<svg class="terrain-foreground" aria-hidden="true" viewBox="0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}" preserveAspectRatio="none"><defs><clipPath id="${id}" clipPathUnits="userSpaceOnUse"><path d="${paths.join(" ")}" /></clipPath></defs><image href="${escapeHtml(worldMap.image)}" width="${WORLD_WIDTH}" height="${WORLD_HEIGHT}" clip-path="url(#${id})" /></svg>`;
}

function renderCreatures() {
  layer.innerHTML = creatures.map((creature) => `
    <button
      class="creature-hotspot creature-hotspot--${creatureScene(creature, worldMap).surface}"
      type="button"
      data-creature="${creature.id}"
      aria-label="发现${creature.nameZh}，打开故事 / Discover ${creature.nameEn}"
      style="${creaturePlacementStyle(creature)}"
    >
      ${creatureArt(creature)}
    </button>
  `).join("") + terrainForeground("map-ground");

  layer.querySelectorAll("[data-creature]").forEach((button) => {
    const creature = creatures.find((item) => item.id === button.dataset.creature);
    const showOnHover = (event) => {
      if (event.pointerType !== "touch") showCreatureName(creature, button);
    };
    button.addEventListener("pointerenter", showOnHover);
    button.addEventListener("pointermove", showOnHover);
    button.addEventListener("pointerleave", hideCreatureName);
    button.addEventListener("focus", () => {
      if (button.matches(":focus-visible")) showCreatureName(creature, button);
    });
    button.addEventListener("blur", hideCreatureName);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (creature) openCreature(creature, button);
    });
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function renderSourceClues(creature, story) {
  const { factsZh, factsEn } = creature;
  const isSourceReading = story.kind === "source-reading";

  return `
    <details class="source-clues" aria-labelledby="source-${escapeHtml(creature.id)}">
      <summary id="source-${escapeHtml(creature.id)}">书里写了什么？ <span lang="en">What's in the book?</span></summary>
      <p>${escapeHtml(factsZh)}</p>
      <div class="source-clues-en" lang="en">
        <p>${escapeHtml(factsEn)}</p>
      </div>
      ${isSourceReading ? "" : `<p class="story-origin-note" lang="zh-Hans">${escapeHtml(story.creationNoteZh)}<span lang="en">${escapeHtml(story.creationNoteEn)}</span></p>`}
    </details>
  `;
}

function animateDiscovery(button) {
  window.clearTimeout(state.discoveryTimer);
  state.discoveryTarget?.classList.remove("is-found");
  state.discoveryTarget = button;
  state.discoveryTimer = null;
  if (!button) return;

  // Restart the same short response even when a creature is tapped twice quickly.
  void button.offsetWidth;
  button.classList.add("is-found");
  state.discoveryTimer = window.setTimeout(() => {
    button.classList.remove("is-found");
    state.discoveryTarget = null;
    state.discoveryTimer = null;
  }, 420);
}

function openCreature(creature, button) {
  state.sheetFocus = button;
  hideCreatureName();
  state.found.add(creature.id);
  layer.querySelector(".creature-hotspot.is-active")?.classList.remove("is-active");
  button?.classList.add("is-active");
  animateDiscovery(button);

  const story = creatureStories[creature.id];
  if (!story) return;

  sheetContent.innerHTML = `
    <figure class="creature-card-art creature-card-art--${escapeHtml(creature.id)}">
      <img src="${creature.image}" alt="${escapeHtml(creature.nameZh)}" draggable="false" />
    </figure>
    <p class="creature-kicker">
      <span>来自《山海经》· ${escapeHtml(creature.chapter.replace(/[《》]/g, ""))}篇</span>
      <span lang="en">From the Classic of Mountains and Seas · ${escapeHtml((chapterNamesEn[creature.chapter] || creature.chapter).replace(/^The /, ""))}</span>
    </p>
    <h2 class="creature-heading">${escapeHtml(creature.nameZh)}</h2>
    <p class="creature-romanization">${escapeHtml(creature.pinyin)} · ${escapeHtml(creature.nameEn)}</p>
    <div class="creature-tag-list" aria-label="奇兽分类">
      <span>${escapeHtml(creature.kind.zh)} <small lang="en">${escapeHtml(creature.kind.en)}</small></span>
      <span>${escapeHtml(creature.habitat.zh)} <small lang="en">${escapeHtml(creature.habitat.en)}</small></span>
      ${creature.traits.map((trait) => `<span>${escapeHtml(trait.zh)} <small lang="en">${escapeHtml(trait.en)}</small></span>`).join("")}
    </div>
    <div class="creature-place">
      <span class="creature-place-label">书中地点 <b lang="en">Place in the book</b></span>
      <strong>📍 ${escapeHtml(creature.locationZh)}</strong>
      <span lang="en">${escapeHtml(creature.locationEn)}</span>
    </div>
    <div class="creature-story creature-story--long">
      <h3 class="creature-story-title">${escapeHtml(story.titleZh)} <span lang="en">${escapeHtml(story.titleEn)}</span></h3>
      <div class="story-copy-zh">
        ${story.zh.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      <div class="creature-story-en" lang="en">
        ${story.en.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </div>
    <div class="word-list">
      ${creature.words.map((word) => `
        <div class="word-chip">
          <strong>${escapeHtml(word.hanzi)}</strong>
          <span>${escapeHtml(word.pinyin)} · ${escapeHtml(word.english)}</span>
        </div>
      `).join("")}
    </div>
    ${renderSourceClues(creature, story)}
  `;

  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  scrim.classList.add("is-open");
  sheet.scrollTop = 0;
  hintText.textContent = `你发现了${creature.nameZh}。关闭卡片后，还可以继续找。 · You found ${creature.nameEn}. Close the card to keep exploring.`;
  sheet.querySelector("[data-close-sheet]")?.focus({ preventScroll: true });
}

function closeSheet(restoreFocus = true) {
  const wasOpen = sheet.classList.contains("is-open");
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  scrim.classList.remove("is-open");
  if (wasOpen && restoreFocus) state.sheetFocus?.focus({ preventScroll: true });
}

function applyTransform() {
  hideCreatureName();
  world.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
  world.style.setProperty("--label-scale", Math.min(3.2, 1 / state.scale));
}

function clampPosition() {
  const bounds = viewport.getBoundingClientRect();
  const scaledWidth = WORLD_WIDTH * state.scale;
  const scaledHeight = WORLD_HEIGHT * state.scale;
  const overscroll = 52;

  if (scaledWidth <= bounds.width) {
    state.x = (bounds.width - scaledWidth) / 2;
  } else {
    state.x = Math.min(overscroll, Math.max(bounds.width - scaledWidth - overscroll, state.x));
  }

  if (scaledHeight <= bounds.height) {
    state.y = (bounds.height - scaledHeight) / 2;
  } else {
    state.y = Math.min(overscroll, Math.max(bounds.height - scaledHeight - overscroll, state.y));
  }
}

function fitMap() {
  const bounds = viewport.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  state.viewportWidth = bounds.width;
  state.viewportHeight = bounds.height;
  const containScale = Math.min(bounds.width / WORLD_WIDTH, bounds.height / WORLD_HEIGHT);
  state.minScale = containScale;
  state.maxScale = state.minScale * 5;
  state.scale = containScale;
  state.x = (bounds.width - WORLD_WIDTH * state.scale) / 2;
  state.y = (bounds.height - WORLD_HEIGHT * state.scale) / 2;
  state.regionId = "all";
  updateNavigation();
  applyTransform();
}

function zoomAt(nextScale, clientX, clientY) {
  const bounds = viewport.getBoundingClientRect();
  const pointX = clientX - bounds.left;
  const pointY = clientY - bounds.top;
  const clampedScale = Math.min(state.maxScale, Math.max(state.minScale, nextScale));
  const worldX = (pointX - state.x) / state.scale;
  const worldY = (pointY - state.y) / state.scale;
  state.x = pointX - worldX * clampedScale;
  state.y = pointY - worldY * clampedScale;
  state.scale = clampedScale;
  state.regionId = null;
  updateNavigation();
  clampPosition();
  applyTransform();
}

function zoomFromCenter(multiplier) {
  const bounds = viewport.getBoundingClientRect();
  zoomAt(state.scale * multiplier, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
}

function focusCreatureOnMap(creature) {
  const bounds = viewport.getBoundingClientRect();
  const targetScale = Math.min(state.maxScale, Math.max(state.scale, state.minScale * 2.6));
  state.scale = targetScale;
  state.x = bounds.width / 2 - WORLD_WIDTH * creature.position.x / 100 * targetScale;
  state.y = bounds.height / 2 - WORLD_HEIGHT * creature.position.y / 100 * targetScale;
  state.regionId = null;
  updateNavigation();
  clampPosition();
  applyTransform();
}

function openMap(trigger, creature = null) {
  state.lastFocus = trigger;
  experience.classList.add("is-open");
  experience.setAttribute("aria-hidden", "false");
  document.body.classList.add("map-open");
  requestAnimationFrame(() => {
    fitMap();
    if (creature) {
      const marker = layer.querySelector(`[data-creature="${creature.id}"]`);
      focusCreatureOnMap(creature);
      openCreature(creature, marker);
      sheet.querySelector("[data-close-sheet]")?.focus({ preventScroll: true });
    } else {
      experience.querySelector("[data-close-map]").focus({ preventScroll: true });
    }
  });
}

function closeMap() {
  hideCreatureName();
  closeSheet(false);
  experience.classList.remove("is-open");
  experience.setAttribute("aria-hidden", "true");
  document.body.classList.remove("map-open");
  state.lastFocus?.focus({ preventScroll: true });
}

function revealHint() {
  const visible = creaturesInView(creatures, state, viewport.getBoundingClientRect(), worldMap);
  const inRegion = visible.filter((creature) => creature.regionId === state.regionId);
  const nearby = inRegion.length ? inRegion : visible.length ? visible : creatures;
  const hidden = nearby.filter((creature) => !state.found.has(creature.id));
  const pool = hidden.length ? hidden : nearby;
  if (!pool.length) return;
  const creature = pool[state.hintIndex % pool.length];
  state.hintIndex += 1;
  hintText.textContent = `${creature.clueZh} · ${creature.clueEn}`;

  const button = layer.querySelector(`[data-creature="${creature.id}"]`);
  button?.classList.add("is-revealed");
  window.setTimeout(() => button?.classList.remove("is-revealed"), 3600);

  focusCreatureOnMap(creature);
}

viewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomAt(state.scale * (event.deltaY > 0 ? 0.88 : 1.13), event.clientX, event.clientY);
}, { passive: false });

viewport.addEventListener("dblclick", (event) => {
  zoomAt(state.scale * 1.65, event.clientX, event.clientY);
});

viewport.addEventListener("pointerdown", (event) => {
  hideCreatureName();
  if (event.target.closest(".creature-hotspot")) return;
  viewport.setPointerCapture(event.pointerId);
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  viewport.classList.add("is-dragging");

  if (state.pointers.size === 1) {
    state.gesture = { type: "pan", startX: event.clientX, startY: event.clientY, x: state.x, y: state.y };
  } else if (state.pointers.size === 2) {
    const [a, b] = [...state.pointers.values()];
    state.gesture = {
      type: "pinch",
      distance: Math.hypot(b.x - a.x, b.y - a.y),
      scale: state.scale,
      centerX: (a.x + b.x) / 2,
      centerY: (a.y + b.y) / 2
    };
  }
});

viewport.addEventListener("pointermove", (event) => {
  if (!state.pointers.has(event.pointerId)) return;
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (state.pointers.size === 1 && state.gesture?.type === "pan") {
    state.regionId = null;
    updateNavigation();
    state.x = state.gesture.x + event.clientX - state.gesture.startX;
    state.y = state.gesture.y + event.clientY - state.gesture.startY;
    clampPosition();
    applyTransform();
  } else if (state.pointers.size === 2) {
    const [a, b] = [...state.pointers.values()];
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    if (state.gesture?.type !== "pinch") {
      state.gesture = {
        type: "pinch",
        distance,
        scale: state.scale,
        centerX: (a.x + b.x) / 2,
        centerY: (a.y + b.y) / 2
      };
    }
    zoomAt(
      state.gesture.scale * distance / Math.max(1, state.gesture.distance),
      (a.x + b.x) / 2,
      (a.y + b.y) / 2
    );
  }
});

function endPointer(event) {
  state.pointers.delete(event.pointerId);
  if (!state.pointers.size) {
    state.gesture = null;
    viewport.classList.remove("is-dragging");
  } else {
    const [pointer] = state.pointers.values();
    state.gesture = { type: "pan", startX: pointer.x, startY: pointer.y, x: state.x, y: state.y };
  }
}

viewport.addEventListener("pointerup", endPointer);
viewport.addEventListener("pointercancel", endPointer);

document.querySelectorAll("[data-open-map]").forEach((button) => button.addEventListener("click", () => openMap(button)));
document.querySelector("[data-close-map]").addEventListener("click", closeMap);
document.querySelectorAll("[data-close-sheet]").forEach((button) => button.addEventListener("click", () => closeSheet()));
document.querySelector("[data-zoom-in]").addEventListener("click", () => zoomFromCenter(1.28));
document.querySelector("[data-zoom-out]").addEventListener("click", () => zoomFromCenter(0.78));
document.querySelector("[data-reset-map]").addEventListener("click", fitMap);
document.querySelector("[data-hint]").addEventListener("click", revealHint);
new ResizeObserver(() => {
  if (!experience.classList.contains("is-open")) return;
  const bounds = viewport.getBoundingClientRect();
  if (bounds.width === state.viewportWidth && bounds.height === state.viewportHeight) return;
  if (!state.viewportWidth || !state.viewportHeight || state.scale <= state.minScale * 1.01) {
    fitMap();
    return;
  }
  // Keep the same part of the map in view when a longer clue changes the help row.
  const centerX = (state.viewportWidth / 2 - state.x) / state.scale;
  const centerY = (state.viewportHeight / 2 - state.y) / state.scale;
  const zoom = state.scale / state.minScale;
  state.viewportWidth = bounds.width;
  state.viewportHeight = bounds.height;
  state.minScale = Math.min(bounds.width / WORLD_WIDTH, bounds.height / WORLD_HEIGHT);
  state.maxScale = state.minScale * 5;
  state.scale = Math.min(state.maxScale, state.minScale * zoom);
  state.x = bounds.width / 2 - centerX * state.scale;
  state.y = bounds.height / 2 - centerY * state.scale;
  clampPosition();
  applyTransform();
}).observe(viewport);
window.addEventListener("keydown", (event) => {
  if (!experience.classList.contains("is-open")) return;
  if (event.key === "Tab") {
    const scope = sheet.classList.contains("is-open") ? sheet : experience;
    const focusable = [...scope.querySelectorAll('button, a[href], [tabindex="0"]')]
      .filter((element) => !element.disabled && element.tabIndex >= 0 && getComputedStyle(element).visibility !== "hidden");
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || !scope.contains(document.activeElement))) {
      event.preventDefault();
      last?.focus({ preventScroll: true });
    } else if (!event.shiftKey && (document.activeElement === last || !scope.contains(document.activeElement))) {
      event.preventDefault();
      first?.focus({ preventScroll: true });
    }
    return;
  }
  if (event.key !== "Escape") return;
  if (sheet.classList.contains("is-open")) closeSheet();
  else if (!creatureName.hidden) hideCreatureName();
  else if (experience.classList.contains("is-open")) closeMap();
});

renderMap();
renderCatalogFilters();
renderCatalog();
