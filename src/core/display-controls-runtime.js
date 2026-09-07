export function createDisplayControlsRuntime(context) {
  const {
    state,
    elements,
    getCurrentTopic,
    getCurrentFocusItem,
    renderFocusWordList,
    renderFocusExplorer,
    renderActivityPanel
  } = context;
  const {
    toggleAudioButton,
    togglePinyinButton,
    toggleArabicButton,
    toggleEnglishButton,
    focusHanzi,
    focusPinyin,
    focusEnglish,
    learningCultureNav
  } = elements;

  function updateDisplayControls() {
    renderFocusControls();
    renderFocusDisplay(getCurrentFocusItem());
    renderFocusWordList();
    renderFocusExplorer();
    renderActivityPanel(getCurrentTopic());
  }

  function renderFocusControls() {
    const topic = getCurrentTopic();
    document.body.classList.toggle("is-pinyin-hidden", !state.showPinyin);
    document.body.classList.toggle("is-english-hidden", !state.showEnglish);
    const controlPairs = [
      [toggleAudioButton, state.tapAudioEnabled, "Tap sound"],
      [togglePinyinButton, state.showPinyin, "Pinyin"],
      [toggleArabicButton, state.showArabic, "Numbers"],
      [toggleEnglishButton, state.showEnglish, "English"]
    ];

    controlPairs.forEach(([button, enabled, label]) => {
      button.classList.toggle("is-toggle-active", enabled);
      button.classList.toggle("is-toggle-inactive", !enabled);
      button.textContent = `${label} ${enabled ? "on" : "off"}`;
    });

    toggleArabicButton.classList.toggle("is-hidden", topic.id !== "numbers");
    const displayToggles =
      learningCultureNav?.ownerDocument?.querySelectorAll?.("[data-display-toggle]") ??
      learningCultureNav?.querySelectorAll("[data-display-toggle]") ??
      [];
    displayToggles.forEach((button) => {
      const control = button.dataset.displayToggle;
      const enabled = control === "sound" ? state.tapAudioEnabled : control === "pinyin" ? state.showPinyin : state.showEnglish;
      const label = control === "sound" ? "Sound" : control === "pinyin" ? "Pinyin" : "English";
      const icon = control === "sound"
        ? '<svg class="learning-display-sound-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 13h6l8-6v18l-8-6H5z" fill="currentColor" stroke="currentColor" stroke-linejoin="round"/><path d="M23 12c2 2 2 6 0 8M26 9c4 4 4 10 0 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>'
        : control === "pinyin"
          ? '<span class="learning-display-letter-icon learning-display-pinyin-icon" aria-hidden="true">Pin</span>'
          : '<span class="learning-display-letter-icon learning-display-english-icon" aria-hidden="true">En</span>';
      button.classList.toggle("is-toggle-active", enabled);
      button.classList.toggle("is-toggle-inactive", !enabled);
      button.innerHTML = icon;
      button.setAttribute("aria-pressed", String(enabled));
      button.setAttribute("aria-label", `${label} ${enabled ? "on" : "off"}`);
      button.setAttribute("title", `${label} ${enabled ? "on" : "off"}`);
    });
  }

  function renderFocusDisplay(item) {
    if (!item) {
      focusHanzi.textContent = "";
      focusPinyin.textContent = "";
      focusEnglish.textContent = "";
      return;
    }
    focusHanzi.textContent = item.hanzi;
    focusPinyin.textContent = state.showPinyin ? item.pinyin : "";
    focusEnglish.textContent = state.showEnglish ? item.english : "";
  }

  function bindDisplayControls() {
    toggleAudioButton.addEventListener("click", () => {
      state.tapAudioEnabled = !state.tapAudioEnabled;
      updateDisplayControls();
    });
    togglePinyinButton.addEventListener("click", () => {
      state.showPinyin = !state.showPinyin;
      updateDisplayControls();
    });
    toggleArabicButton.addEventListener("click", () => {
      state.showArabic = !state.showArabic;
      renderFocusControls();
      renderFocusExplorer();
      renderActivityPanel(getCurrentTopic());
    });
    toggleEnglishButton.addEventListener("click", () => {
      state.showEnglish = !state.showEnglish;
      updateDisplayControls();
    });
  }

  return { bindDisplayControls, renderFocusControls, renderFocusDisplay, updateDisplayControls };
}
