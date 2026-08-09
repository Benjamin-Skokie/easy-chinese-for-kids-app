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
    learningCultureNav?.querySelectorAll("[data-display-toggle]").forEach((button) => {
      const control = button.dataset.displayToggle;
      const enabled = control === "sound" ? state.tapAudioEnabled : control === "pinyin" ? state.showPinyin : state.showEnglish;
      const label = control === "sound" ? "Sound" : control === "pinyin" ? "Pinyin" : "English";
      button.classList.toggle("is-toggle-active", enabled);
      button.classList.toggle("is-toggle-inactive", !enabled);
      button.textContent = `${label} ${enabled ? "on" : "off"}`;
      button.setAttribute("aria-pressed", String(enabled));
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
