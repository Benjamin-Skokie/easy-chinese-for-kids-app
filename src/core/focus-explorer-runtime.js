export function createFocusExplorerRuntime(context) {
  const {
    focusExplorer,
    schoolTopicData,
    currentTopic,
    renderBodyExplorer,
    renderNumbersExplorer,
    renderTelephoneExplorer,
    renderPoliteWordsExplorer,
    renderIsItExplorer,
    renderIntroductionsExplorer,
    renderIdentityExplorer,
    renderAgeExplorer,
    renderFamilyExplorer,
    renderGreetingsExplorer,
    renderClothesExplorer,
    renderTimeDateExplorer,
    renderWeekdaysExplorer,
    renderDatesExplorer,
    renderEverydayActionsExplorer,
    renderPositionsExplorer,
    renderRoomsExplorer,
    renderSchoolExplorer,
    renderVisualTopicExplorer,
    renderMultiplicationExplorer,
    renderWorldExplorer,
    renderHobbiesExplorer
  } = context;

  function renderDefaultExplorer() {
    focusExplorer.innerHTML = "";
  }

  function renderFocusExplorer() {
    const topic = currentTopic();
    if (topic.interactiveScene === "body-face") return renderBodyExplorer();
    if (topic.id === "numbers") return renderNumbersExplorer();
    if (topic.interactiveScene === "telephone-numbers") return renderTelephoneExplorer();
    if (topic.interactiveScene === "polite-phrases") return renderPoliteWordsExplorer();
    if (topic.interactiveScene === "is-it-contrast") return renderIsItExplorer();
    if (topic.interactiveScene === "introductions-conversation") return renderIntroductionsExplorer();
    if (topic.interactiveScene === "identity-scenes") return renderIdentityExplorer();
    if (topic.interactiveScene === "age-conversation") return renderAgeExplorer();
    if (topic.interactiveScene === "family-home") return renderFamilyExplorer();
    if (topic.interactiveScene === "greetings-conversation") return renderGreetingsExplorer();
    if (topic.interactiveScene === "clothes-scenes") return renderClothesExplorer();
    if (topic.interactiveScene === "time-date-routine") return renderTimeDateExplorer();
    if (topic.interactiveScene === "weekdays") return renderWeekdaysExplorer();
    if (topic.interactiveScene === "dates") return renderDatesExplorer();
    if (topic.interactiveScene === "everyday-actions") return renderEverydayActionsExplorer();
    if (topic.interactiveScene === "positions") return renderPositionsExplorer();
    if (topic.interactiveScene === "rooms") return renderRoomsExplorer();
    if (schoolTopicData[topic.id]) return renderSchoolExplorer(topic.id);
    if (["pets", "animals", "colours", "nature", "weather"].includes(topic.id)) return renderWorldExplorer();
    if (["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"].includes(topic.id)) return renderHobbiesExplorer();
    if (["comparisons", "transport", "rooms"].includes(topic.interactiveScene)) return renderVisualTopicExplorer(topic.interactiveScene);
    if (topic.interactiveScene === "multiplication-rhyme") return renderMultiplicationExplorer();
    return renderDefaultExplorer();
  }

  return { renderDefaultExplorer, renderFocusExplorer };
}
