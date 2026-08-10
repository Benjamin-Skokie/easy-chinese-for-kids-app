export function createFocusExplorerRuntime(context) {
  const {
    focusExplorer,
    schoolTopicData,
    currentTopic,
    renderBodyExplorer,
    renderNumbersExplorer,
    renderPoliteWordsExplorer,
    renderIntroductionsExplorer,
    renderIdentityExplorer,
    renderAgeExplorer,
    renderFamilyExplorer,
    renderGreetingsExplorer,
    renderClothesExplorer,
    renderTimeDateExplorer,
    renderWeekdaysExplorer,
    renderDatesExplorer,
    renderPositionsExplorer,
    renderRoomsExplorer,
    renderSchoolExplorer,
    renderVisualTopicExplorer,
    renderMultiplicationExplorer,
    renderWorldExplorer
  } = context;

  function renderDefaultExplorer() {
    focusExplorer.innerHTML = "";
  }

  function renderFocusExplorer() {
    const topic = currentTopic();
    if (topic.interactiveScene === "body-face") return renderBodyExplorer();
    if (topic.id === "numbers") return renderNumbersExplorer();
    if (topic.interactiveScene === "polite-phrases") return renderPoliteWordsExplorer();
    if (topic.interactiveScene === "introductions-conversation") return renderIntroductionsExplorer();
    if (topic.interactiveScene === "identity-scenes") return renderIdentityExplorer();
    if (topic.interactiveScene === "age-conversation") return renderAgeExplorer();
    if (topic.interactiveScene === "family-home") return renderFamilyExplorer();
    if (topic.interactiveScene === "greetings-conversation") return renderGreetingsExplorer();
    if (topic.interactiveScene === "clothes-scenes") return renderClothesExplorer();
    if (topic.interactiveScene === "time-date-routine") return renderTimeDateExplorer();
    if (topic.interactiveScene === "weekdays") return renderWeekdaysExplorer();
    if (topic.interactiveScene === "dates") return renderDatesExplorer();
    if (topic.interactiveScene === "positions") return renderPositionsExplorer();
    if (topic.interactiveScene === "rooms") return renderRoomsExplorer();
    if (schoolTopicData[topic.id]) return renderSchoolExplorer(topic.id);
    if (["pets", "animals", "colours", "nature", "weather"].includes(topic.id)) return renderWorldExplorer();
    if (["comparisons", "transport", "rooms"].includes(topic.interactiveScene)) return renderVisualTopicExplorer(topic.interactiveScene);
    if (topic.interactiveScene === "multiplication-rhyme") return renderMultiplicationExplorer();
    return renderDefaultExplorer();
  }

  return { renderDefaultExplorer, renderFocusExplorer };
}
