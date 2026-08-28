import { pictographItems } from "./pictographs.js";
import { loadStrokeCharacter } from "../../data/stroke-data-loader.js";
import { applyImageLoading } from "../../core/image-loading.js";

// These are clean, transparent extractions of the historical forms in the teaching
// references supplied for this project. The original illustration cards remain ours;
// we do not redraw historical forms into generic look-alikes.
const oracleGlyphSources = {
  水: "assets/pictographs/oracle-glyphs/shui-reference.webp",
  日: "assets/pictographs/oracle-glyphs/ri-reference.webp",
  月: "assets/pictographs/oracle-glyphs/yue-reference.webp",
  山: "assets/pictographs/oracle-glyphs/shan-reference.webp",
  木: "assets/pictographs/oracle-glyphs/mu-reference.webp",
  火: "assets/pictographs/oracle-glyphs/huo-reference.webp",
  田: "assets/pictographs/oracle-glyphs/tian-reference.webp",
  人: "assets/pictographs/oracle-glyphs/ren-v2.webp",
  家: "assets/pictographs/oracle-glyphs/jia-reference.webp",
  门: "assets/pictographs/oracle-glyphs/men-reference.webp",
  鱼: "assets/pictographs/oracle-glyphs/yu-reference.webp",
  鸟: "assets/pictographs/oracle-glyphs/niao-reference.webp",
  羊: "assets/pictographs/oracle-glyphs/yang-reference.webp",
  牛: "assets/pictographs/oracle-glyphs/niu-reference.webp",
  竹: "assets/pictographs/oracle-glyphs/zhu-reference.webp"
};

const earlyGlyphPaths = {
  水: `<path d="M102 19 C93 38 83 53 99 72 C113 87 114 103 100 119 C89 133 91 153 105 181" stroke-width="8"/><path d="M46 51 C43 60 39 68 36 76 M50 123 C45 132 41 141 39 149 M154 51 C157 60 161 68 164 77 M150 124 C154 133 158 141 161 150" stroke-width="8"/>`,
  日: `<path d="M50 43 C74 34 126 33 150 43 L148 155 C126 167 74 169 51 156 Z" stroke-width="8"/><path d="M80 99 C91 94 109 94 121 98 C111 105 91 105 80 99 Z" fill="currentColor" stroke="none"/>`,
  月: `<path d="M132 27 C99 35 76 62 75 99 C75 133 91 160 126 174 C113 150 111 126 113 101 C115 71 122 47 132 27 Z" stroke-width="8"/><path d="M100 59 C93 81 91 111 95 143" stroke-width="7"/>`,
  山: `<path d="M35 156 L38 112 L62 146 L63 81 L94 119 L101 39 L129 118 L146 72 L148 156" stroke-width="8"/><path d="M36 156 C71 152 111 154 148 156" stroke-width="7"/>`,
  木: `<path d="M100 23 C97 58 100 101 98 179 M98 77 L50 49 M99 78 L150 47 M99 134 L59 165 M99 135 L142 167" stroke-width="8"/>`,
  火: `<path d="M100 27 C109 54 128 65 139 92 L151 121 L133 159 L101 178 L67 157 L50 121 L63 91 C76 65 89 54 100 27 Z" stroke-width="8"/><path d="M101 50 L101 148 M72 95 C83 98 91 106 98 117 M130 95 C120 100 111 107 103 118" stroke-width="7"/>`,
  田: `<path d="M43 42 C75 37 126 38 157 45 L155 155 C125 164 75 163 44 157 Z M99 41 C96 75 97 125 99 159 M45 99 C80 96 122 96 156 100" stroke-width="8"/>`,
  人: `<path fill="currentColor" d="M91 32 C83 32 79 41 80 55 C81 67 76 76 68 85 L46 110 C41 116 42 122 48 124 C53 126 58 122 64 116 L84 95 C90 89 97 86 105 87 C111 88 114 83 112 77 L105 54 C102 41 98 32 91 32 Z"/><path fill="currentColor" d="M111 76 C128 78 138 90 141 107 C145 128 141 151 131 174 C128 181 122 184 118 179 C115 175 118 168 121 162 C128 145 130 129 127 113 C124 98 119 90 108 87 Z"/>`,
  家: `<path d="M37 76 L98 29 L163 77 M50 77 L50 94 L150 94 L150 77 M64 113 C77 97 112 98 140 113 L133 137 L115 149 L96 142 L75 151 L62 133 Z M76 114 L70 130 M126 113 L133 130 M91 144 L87 164 M113 147 L119 164" stroke-width="8"/>`,
  门: `<path d="M43 166 L43 40 L156 41 L157 165 M43 91 L74 91 L74 139 M157 92 L126 91 L126 140" stroke-width="8"/>`,
  鱼: `<path d="M101 28 C83 43 71 61 69 84 L48 102 L67 117 C69 143 83 164 100 181 C118 164 132 143 134 117 L153 102 L134 84 C131 61 119 43 101 28 Z M72 83 C86 77 115 77 130 84 M61 101 L141 101 M74 121 L128 121 M84 143 L118 143" stroke-width="8"/>`,
  鸟: `<path d="M56 50 C72 42 88 36 101 40 C115 44 122 54 122 67 L141 73 L122 80 C131 95 136 112 131 129 C127 143 118 154 108 165 L94 177 L96 143 C81 132 75 119 76 104 L61 92 L80 84 C68 75 62 63 56 50 Z" stroke-width="8"/><path d="M88 56 L92 56 M88 97 C98 103 107 110 115 118 M89 115 L112 137" stroke-width="7"/>`,
  羊: `<path d="M59 58 L79 40 L98 63 L118 40 L141 58 M73 84 L99 73 L129 84 M100 62 L100 171 M69 115 L131 115 M77 139 L123 139" stroke-width="8"/>`,
  牛: `<path d="M99 25 L99 175 M90 53 C79 61 80 77 91 84 C104 92 113 79 108 67 C105 59 99 55 90 53 Z M91 105 C79 114 81 130 92 137 C104 144 113 132 109 119 C106 111 100 106 91 105 Z" stroke-width="8"/>`,
  竹: `<path d="M61 36 L83 72 L80 162 M83 72 L53 105 M82 73 L108 105 M140 36 L118 72 L121 162 M118 72 L92 105 M118 73 L147 105" stroke-width="8"/>`
};

export function createPictographRuntime({ focusExplorer, speak }) {
  const characterOutlines = new Map();
  let outlineLoadingStarted = false;

  function loadCharacterOutlines() {
    if (outlineLoadingStarted) return;
    outlineLoadingStarted = true;
    Promise.all(pictographItems.map(async (item) => {
      try {
        characterOutlines.set(item.hanzi, await loadStrokeCharacter(item.hanzi));
      } catch {
        // Leave the small placeholder in place if a local outline is unavailable.
      }
    })).finally(() => renderPictographExplorer());
  }

  function characterSvg(item) {
    const character = characterOutlines.get(item.hanzi);
    if (!character) {
      loadCharacterOutlines();
      return `<div class="pictograph-character-loading" aria-label="Loading ${item.hanzi}"></div>`;
    }
    return `<svg class="pictograph-character-svg${item.hanzi === "人" ? " is-person" : ""}" viewBox="0 0 1024 900" role="img" aria-label="${item.hanzi}"><g transform="translate(0 900) scale(1 -1)">${character.paths.map((path) => `<path d="${path}"/>`).join("")}</g></svg>`;
  }

  function earlyGlyphSvg(item) {
    return `<svg class="pictograph-early-glyph" viewBox="0 0 200 200" role="img" aria-label="Learning reconstruction of the early form of ${item.hanzi}"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${earlyGlyphPaths[item.hanzi]}</g></svg>`;
  }

  function earlyGlyphMarkup(item) {
    const source = oracleGlyphSources[item.hanzi];
    if (source) {
      return `<img class="pictograph-oracle-image${item.hanzi === "人" ? " is-person" : ""}" src="${source}" alt="Oracle-bone form of ${item.hanzi}" decoding="async" />`;
    }
    return earlyGlyphSvg(item);
  }

  function storyMarkup(item) {
    return `<section class="pictograph-story-row" style="--pictograph-tone: ${item.theme}" aria-labelledby="pictograph-story-${item.id}"><header class="pictograph-story-header"><h3 id="pictograph-story-${item.id}">${item.hanzi} · ${item.english}</h3><button type="button" class="small-button is-play-button pictograph-frame-play" aria-label="Play ${item.hanzi}" data-pictograph-play="${item.hanzi}">Play</button></header><section class="pictograph-evolution-strip" aria-label="Four ways to understand ${item.hanzi}"><article class="pictograph-evolution-card"><div class="pictograph-stage-art"><img src="${item.scenePath}" alt="${item.sceneAlt}" decoding="async" /></div><p class="pictograph-stage-label">Illustration</p></article><article class="pictograph-evolution-card"><div class="pictograph-stage-art pictograph-glyph-stage">${earlyGlyphMarkup(item)}</div><p class="pictograph-stage-label">Oracle</p></article><article class="pictograph-evolution-card"><div class="pictograph-stage-art pictograph-modern-stage">${characterSvg(item)}</div><p class="pictograph-stage-label">Modern Chinese</p></article><article class="pictograph-evolution-card"><div class="pictograph-stage-art pictograph-description-stage"><p>${item.notice}</p></div><p class="pictograph-stage-label">What to notice</p></article></section></section>`;
  }

  function renderPictographExplorer() {
    focusExplorer.innerHTML = `<section class="pictograph-book pictograph-story-book"><header class="pictograph-book-header"><div><p class="body-match-kicker">From carved signs to characters</p><h3>How old writing changed</h3><p>More than 3,000 years ago, people in the Shang dynasty carved writing on animal bones and turtle shells. We call these carvings oracle-bone script. A few signs below began as pictures; as people wrote them again and again, their shapes gradually became the characters we use today. Most Chinese characters, though, are not simple pictures.</p></div></header>${pictographItems.map(storyMarkup).join("")}<p class="pictograph-book-footer">Reference for the historical form: 汉语多功能字库 · ${pictographItems[0].source}</p></section>`;
    applyImageLoading(focusExplorer, { eager: true });
    focusExplorer.querySelectorAll("[data-pictograph-play]").forEach((button) => button.addEventListener("click", () => speak(button.dataset.pictographPlay)));
  }

  function renderPictographPractice() {}

  return { renderPictographExplorer, renderPictographPractice };
}
