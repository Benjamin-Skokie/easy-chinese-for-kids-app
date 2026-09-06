import fs from "node:fs/promises";
import path from "node:path";

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function loadCultureGlossary(root = process.cwd()) {
  const glossaryPath = path.join(root, "culture", "content", "glossary.json");
  const terminologyPath = path.join(root, "culture", "content", "terminology.json");

  try {
    const [glossarySource, terminologySource] = await Promise.all([
      fs.readFile(glossaryPath, "utf8"),
      fs.readFile(terminologyPath, "utf8").catch((error) => {
        if (error && error.code === "ENOENT") return "{}";
        throw error;
      })
    ]);
    return {
      ...JSON.parse(glossarySource),
      ...JSON.parse(terminologySource)
    };
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

function slugifyTerm(value) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function createGlossaryFormatter(glossary) {
  let glossaryId = 0;
  const seenTerms = new Set();

  return function formatGlossaryTerms(escapedText) {
    return escapedText.replace(/\[\[([^\]]+)\]\]/g, (match, rawTerm) => {
      const [rawLabel, rawKey] = rawTerm.split("|").map((part) => part.trim());
      const label = rawLabel || rawKey;
      const key = rawKey || rawLabel;
      const note = glossary[key];

      if (!label || !key || !note) {
        return label || key || match;
      }

      const language = /[\u3400-\u9fff]/u.test(label) ? "zh" : "en";
      const seenKey = `${language}:${key}`;
      if (seenTerms.has(seenKey)) {
        return label;
      }
      seenTerms.add(seenKey);

      const tooltipText = typeof note === "string"
        ? note
        : [
            note.pinyin,
            language === "en" ? note.zh : "",
            language === "zh" ? note.note_zh : note.note_en
          ].filter(Boolean).join(" · ");

      if (!tooltipText) {
        return label;
      }

      glossaryId += 1;
      const id = `glossary-${slugifyTerm(key)}-${glossaryId}`;

      return `<span class="glossary-entry"><button type="button" class="glossary-term" aria-expanded="false" aria-controls="${id}">${label}</button><span id="${id}" class="glossary-popover" role="tooltip">${escapeHtml(tooltipText)}</span></span>`;
    });
  };
}

export const glossaryScriptHtml = `    <script>
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
            const compactViewport = window.matchMedia("(max-width: 900px)").matches;
            const gap = compactViewport ? 8 : 10;
            const buttonRect = button.getBoundingClientRect();
            const popoverRect = popover.getBoundingClientRect();
            const halfWidth = popoverRect.width / 2;
            const buttonCenter = buttonRect.left + buttonRect.width / 2;
            const minCenter = margin + halfWidth;
            const maxCenter = window.innerWidth - margin - halfWidth;
            const left = Math.min(Math.max(buttonCenter, minCenter), maxCenter);

            let side = compactViewport ? "below" : "above";
            let top = side === "below"
              ? buttonRect.bottom + gap
              : buttonRect.top - popoverRect.height - gap;

            if (side === "above" && top < margin) {
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
    </script>`;
