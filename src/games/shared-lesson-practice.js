export function createSharedLessonPractice({ state, speak, elements, documentRef = document }) {
  const { activityPanelTitle, activityPanelSummary, activityList } = elements;

  function renderListenPractice(config) {
    return `
      <section class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">${config.kicker ?? "Listen and choose"}</p>
            ${config.title ? `<h4>${config.title}</h4>` : ""}
            <p class="numbers-game-note">Play the audio, then tap the matching Chinese card.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-template-listen-play>Play audio</button>
        </div>
        ${config.feedback() ? `<p class="greetings-game-feedback">${config.feedback()}</p>` : ""}
        <div class="numbers-game-options">
          ${config.optionIds().map((id) => {
            const item = config.items().find((entry) => entry.id === id);
            if (!item) return "";
            const isCorrectPick = config.pickedId() === item.id && config.result() === "correct";
            const isWrongPick = config.wrongIds().has(item.id);
            const resultClass = isCorrectPick ? " is-correct" : isWrongPick ? " is-wrong" : "";
            const resultMark = isCorrectPick || isWrongPick
              ? `<span class="answer-result-mark" aria-hidden="true">${isCorrectPick ? "✓" : "×"}</span>`
              : "";
            return `
              <button class="numbers-game-option greetings-game-option family-listen-option${resultClass}" type="button" data-template-listen-guess="${item.id}">
                ${resultMark}
                <span class="numbers-game-hanzi">${item.hanzi}</span>
                ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                ${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderMatchMeaningContent(config, id) {
    return config.meaningContent
      ? config.meaningContent(id)
      : `<span class="match-answer-label">${config.meaningLabel(id)}</span>`;
  }

  function renderMatchPractice(config) {
    const phraseIds = config.phraseIds();
    const meaningIds = config.meaningIds();
    const matchedIds = config.matchedIds();
    const solvedIds = phraseIds.filter((id) => matchedIds.has(id));
    const remainingPhraseIds = phraseIds.filter((id) => !matchedIds.has(id));
    const remainingMeaningIds = meaningIds.filter((id) => !matchedIds.has(id));

    return `
      <section class="practice-split-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">${config.kicker ?? "Matching game"}</p>
            ${config.title ? `<h4>${config.title}</h4>` : ""}
            <p class="numbers-game-note">Tap a card on the left, then tap its matching card on the right.</p>
          </div>
          <button class="small-button is-action-button" type="button" data-template-match-new>New mix</button>
        </div>
        ${config.feedback() ? `<div class="greetings-game-feedback">${config.feedback()}</div>` : ""}
        <div class="family-match-board-headings">
          <p class="body-match-kicker">${config.phraseHeading ?? "Chinese"}</p>
          <p class="body-match-kicker">${config.meaningHeading ?? "Meaning"}</p>
        </div>
        ${solvedIds.length ? `
          <div class="family-match-solved-pairs">
            ${solvedIds.map((id) => {
              const item = config.items().find((entry) => entry.id === id);
              if (!item) return "";
              return `
                <article class="family-match-solved-row">
                  <div class="polite-match-card polite-match-card-phrase family-match-pair-card is-solved">
                    <span class="answer-result-mark" aria-hidden="true">✓</span>
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                  </div>
                  <div class="polite-match-card ${config.meaningCardClass ?? "polite-match-card-meaning"} family-match-pair-card is-solved">
                    <span class="answer-result-mark" aria-hidden="true">✓</span>
                    ${renderMatchMeaningContent(config, id)}
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        ` : ""}
        ${remainingPhraseIds.length ? `
          <div class="polite-match-board family-match-open-board">
            <div class="polite-match-column">
              ${remainingPhraseIds.map((id) => {
                const item = config.items().find((entry) => entry.id === id);
                if (!item) return "";
                const selected = config.selectedId() === id;
                const wrong = config.wrongPhraseIds?.().has(id);
                return `
                  <button class="polite-match-card polite-match-card-phrase${selected ? " is-selected" : ""}${wrong ? " is-wrong" : ""}" type="button" data-template-match-phrase="${id}">
                    ${wrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}
                    <span class="numbers-game-hanzi">${item.hanzi}</span>
                    ${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}
                  </button>
                `;
              }).join("")}
            </div>
            <div class="polite-match-column">
              ${remainingMeaningIds.map((id) => {
                const wrong = config.wrongMeaningIds?.().has(id);
                return `
                  <button class="polite-match-card ${config.meaningCardClass ?? "polite-match-card-meaning"}${wrong ? " is-wrong" : ""}" type="button" data-template-match-meaning="${id}">
                    ${wrong ? '<span class="answer-result-mark" aria-hidden="true">×</span>' : ""}
                    ${renderMatchMeaningContent(config, id)}
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        ` : ""}
        ${config.showPlayAgain !== false && matchedIds.size === config.items().length ? '<button class="small-button is-action-button" type="button" data-template-match-play-again>Play again</button>' : ""}
      </section>
    `;
  }

  function renderPracticeSayCards(items = []) {
    if (!items.length) return "";
    return `
      <section class="practice-split-card practice-say-card">
        <div class="numbers-game-top"><div><p class="body-match-kicker">Say it</p><p class="numbers-game-note">Tap a sentence, listen, then say it back.</p></div></div>
        <div class="numbers-game-options">
          ${items.map((item) => `<button class="numbers-game-option greetings-game-option family-listen-option" type="button" data-practice-say="${item.audio ?? item.hanzi}"><span class="numbers-game-hanzi">${item.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${item.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${item.english}</span>` : ""}</button>`).join("")}
        </div>
      </section>
    `;
  }

  function bindPracticeSayCards(container) {
    container.querySelectorAll("[data-practice-say]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.tapAudioEnabled) speak(button.dataset.practiceSay, 0.78);
      });
    });
  }

  return function renderSharedLessonPractice(topic, config) {
    config.ensure();
    activityPanelTitle.textContent = "Let's practice";
    activityPanelSummary.textContent = config.summary;
    activityList.className = "support-list";
    activityList.innerHTML = "";

    const gameCard = documentRef.createElement("section");
    gameCard.className = `family-practice-shell${config.shellClass ? ` ${config.shellClass}` : ""}`;
    gameCard.innerHTML = `<div class="practice-split-board">${renderListenPractice(config.listen)}${renderMatchPractice(config.match)}</div>${renderPracticeSayCards(config.sayItems)}`;
    activityList.appendChild(gameCard);

    activityList.querySelector("[data-template-listen-play]")?.addEventListener("click", () => config.listen.onPlay());
    activityList.querySelectorAll("[data-template-listen-guess]").forEach((button) => button.addEventListener("click", () => config.listen.onGuess(button.dataset.templateListenGuess)));
    activityList.querySelector("[data-template-match-new]")?.addEventListener("click", () => config.match.onNew());
    activityList.querySelector("[data-template-match-play-again]")?.addEventListener("click", () => config.match.onNew());
    activityList.querySelectorAll("[data-template-match-phrase]").forEach((button) => button.addEventListener("click", () => config.match.onPhrase(button.dataset.templateMatchPhrase)));
    activityList.querySelectorAll("[data-template-match-meaning]").forEach((button) => button.addEventListener("click", () => config.match.onMeaning(button.dataset.templateMatchMeaning)));
    bindPracticeSayCards(activityList);
  };
}
