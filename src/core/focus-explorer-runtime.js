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
    renderPinyinExplorer,
    renderStrokeExplorer,
    renderWorldExplorer,
    renderHobbiesExplorer
  } = context;

  function renderDefaultExplorer() {
    focusExplorer.innerHTML = "";
  }

  function normalizeLessonPageChrome(topic) {
    if (!(topic.steps?.length)) return;
    focusExplorer.querySelectorAll(".numbers-stage-card").forEach((card) => card.remove());
    focusExplorer.querySelectorAll(".body-match-kicker").forEach((heading) => {
      if (heading.textContent.trim().toLowerCase() === "scenes") heading.textContent = "Review";
    });
  }

  function renderFocusExplorer() {
    const topic = currentTopic();
    let renderer = renderDefaultExplorer;
    if (topic.interactiveScene === "pinyin-lab") renderer = renderPinyinExplorer;
    else if (topic.interactiveScene === "stroke-lab") renderer = renderStrokeExplorer;
    else if (topic.interactiveScene === "body-face") renderer = renderBodyExplorer;
    else if (topic.id === "numbers") renderer = renderNumbersExplorer;
    else if (topic.interactiveScene === "telephone-numbers") renderer = renderTelephoneExplorer;
    else if (topic.interactiveScene === "polite-phrases") renderer = renderPoliteWordsExplorer;
    else if (topic.interactiveScene === "is-it-contrast") renderer = renderIsItExplorer;
    else if (topic.interactiveScene === "introductions-conversation") renderer = renderIntroductionsExplorer;
    else if (topic.interactiveScene === "identity-scenes") renderer = renderIdentityExplorer;
    else if (topic.interactiveScene === "age-conversation") renderer = renderAgeExplorer;
    else if (topic.interactiveScene === "family-home") renderer = renderFamilyExplorer;
    else if (topic.interactiveScene === "greetings-conversation") renderer = renderGreetingsExplorer;
    else if (topic.interactiveScene === "clothes-scenes") renderer = renderClothesExplorer;
    else if (topic.interactiveScene === "time-date-routine") renderer = renderTimeDateExplorer;
    else if (topic.interactiveScene === "weekdays") renderer = renderWeekdaysExplorer;
    else if (topic.interactiveScene === "dates") renderer = renderDatesExplorer;
    else if (topic.interactiveScene === "everyday-actions") renderer = renderEverydayActionsExplorer;
    else if (topic.interactiveScene === "positions") renderer = renderPositionsExplorer;
    else if (topic.interactiveScene === "rooms") renderer = renderRoomsExplorer;
    else if (schoolTopicData[topic.id]) renderer = () => renderSchoolExplorer(topic.id);
    else if (["pets", "animals", "colours", "nature", "weather"].includes(topic.id)) renderer = renderWorldExplorer;
    else if (["toys", "hobbies", "hobbies-3b", "hobbies-at-home", "hobbies-leisure"].includes(topic.id)) renderer = renderHobbiesExplorer;
    else if (["comparisons", "transport", "rooms"].includes(topic.interactiveScene)) renderer = () => renderVisualTopicExplorer(topic.interactiveScene);
    else if (topic.interactiveScene === "multiplication-rhyme") renderer = renderMultiplicationExplorer;
    renderer();
    normalizeLessonPageChrome(topic);
  }

  return { renderDefaultExplorer, renderFocusExplorer };
}
