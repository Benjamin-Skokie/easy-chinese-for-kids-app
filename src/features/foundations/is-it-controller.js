export function createIsItController({ state, isItScene, currentTopic, speakSceneLines, focusExplorer }) {
  function renderIsItExplorer() {
    focusExplorer.innerHTML = `
      <div class="numbers-board">
        <div class="numbers-stage-card">
          <p class="body-match-kicker">Topic enrichment</p>
          <h4>Ask: is it?</h4>
          <p>Look at the picture, ask <strong>这是不是…？</strong>, then answer <strong>是</strong> or <strong>不是</strong>.</p>
        </div>
        <section class="greetings-exchange is-it-scene-card">
          <div class="greetings-exchange-top">
            <p class="body-match-kicker">${isItScene.title}</p>
            <button class="small-button is-play-button" type="button" data-is-it-play>Play</button>
          </div>
          <img class="greetings-scene-image is-it-scene-image" src="${isItScene.imagePath}" alt="${isItScene.imageAlt}" />
          <div class="greetings-line-stack is-it-line-stack">
            ${isItScene.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
          </div>
        </section>
      </div>
    `;
    focusExplorer.querySelector("[data-is-it-play]")?.addEventListener("click", () => {
      if (state.tapAudioEnabled && currentTopic().id === "is-it") speakSceneLines(isItScene.lines);
    });
  }

  return { renderIsItExplorer };
}
