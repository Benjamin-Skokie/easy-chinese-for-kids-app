const sceneLineCardSelector = ".greetings-line-card";
const sceneLineTextSelector = ".telephone-line-hanzi";
// These are the Book Words / Review card variants used by the topic renderers.
// Practice choices deliberately use different classes and are not included here.
const bookWordCardSelector = [
  ".school-word-card",
  ".book-word-card",
  ".nature-word-card",
  ".comparison-word-card",
  ".time-asset-card",
  ".visual-vocabulary-card",
  ".focus-word-button",
  ".pet-food-story-card"
].join(", ");
const feedbackTimers = new WeakMap();
const bookWordDataKeys = [
  ["worldItem", "data-world-item"],
  ["schoolWord", "data-school-word"],
  ["hobbiesWord", "data-hobbies-word"],
  ["toysFlashcard", "data-toys-flashcard"],
  ["telephoneWord", "data-telephone-word"],
  ["timeBookWord", "data-time-book-word"],
  ["comparisonWord", "data-comparison-word"],
  ["transportWord", "data-transport-word"]
];

export function sceneLineAudioText(card) {
  return card?.querySelector?.(sceneLineTextSelector)?.textContent?.trim() ?? "";
}

export function prepareSceneLineAudioCards(container) {
  container?.querySelectorAll?.(sceneLineCardSelector).forEach((card) => {
    const text = sceneLineAudioText(card);
    if (!text) return;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Play: ${text}`);
  });
}

export function bindSceneLineAudio(container, { speak, isEnabled }) {
  const playCard = (target) => {
    const card = target?.closest?.(sceneLineCardSelector);
    if (!card || !container?.contains(card) || !isEnabled()) return;
    const text = sceneLineAudioText(card);
    if (!text) return;
    showAudioPlaybackFeedback(card);
    speak(text, 0.78);
  };

  container?.addEventListener("click", (event) => playCard(event.target));
  container?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target?.closest?.(sceneLineCardSelector);
    if (!card || !container.contains(card)) return;
    event.preventDefault();
    playCard(card);
  });
}

export function showAudioPlaybackFeedback(card) {
  const previousTimer = feedbackTimers.get(card);
  if (previousTimer) globalThis.clearTimeout(previousTimer);
  card.classList.remove("is-audio-playing");
  // Restart the short animation when a child taps the same card again.
  void card.offsetWidth;
  card.classList.add("is-audio-playing");
  feedbackTimers.set(card, globalThis.setTimeout(() => {
    card.classList.remove("is-audio-playing");
    feedbackTimers.delete(card);
    }, 900));
}

export function bindBookWordAudioFeedback(container) {
  container?.addEventListener("click", (event) => {
    const card = event.target?.closest?.(bookWordCardSelector);
    if (!card || !container.contains(card)) return;
    const replacementKey = bookWordDataKeys.find(([key]) => card.dataset?.[key]);
    // Some Book Words (for example Animals) redraw their Review immediately
    // after a tap. Apply the feedback after that redraw to the live replacement.
    globalThis.setTimeout(() => {
      const liveCard = container.contains(card)
        ? card
        : replacementKey
          ? container.querySelector(`[${replacementKey[1]}="${card.dataset[replacementKey[0]]}"]`)
          : null;
      if (liveCard) showAudioPlaybackFeedback(liveCard);
    }, 0);
  }, true);
}
