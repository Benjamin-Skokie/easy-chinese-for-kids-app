export function createFoundationsRuntime(context) {
  const { state, numberHanzi, numberPinyin, buildNumberItem, numberStages, telephonePractice, familyGameItemIds, familyPersonIdsByItemId, familyHeadshotsByItemId, familyPractice, illustratedFamily, illustratedKids, bodyBonusItemIds, bodyCoreItemIds, bodyDiagramLayout, identityConversation, nationalityConversation, identityCountries, identityExploreCountries, identityLanguageQuestion, identityQuestion, topicById, focusItemsForTopic, currentTopic, currentNumberStage, currentFocusItem, currentBook, currentLesson, shuffleArray, chineseUtterance, speak, speakSceneLines, renderActivityPanel, renderFocusDisplay, renderFocusExplorer, renderFocusStatus, selectFocusItem, bodySentenceForItem, focusExplorer, focusStatus, activityPanelTitle, activityPanelSummary, activityList } = context;

function numberStageItems(stage = currentNumberStage()) {
  const start = Math.min(stage.start, stage.end);
  const end = Math.max(stage.start, stage.end);
  const items = [];
  for (let value = start; value <= end; value += 1) {
    items.push(buildNumberItem(value));
  }
  return items;
}

function resetNumberChallenge(options = {}) {
  const stage = currentNumberStage();
  const items = numberStageItems(stage);
  const pool = items.map((entry) => entry.value);
  const targetValue = nextRandomCycleId(state, `numbers-listen:${stage.id}`, pool);
  const distractors = shuffleArray(pool.filter((value) => value !== targetValue)).slice(
    0,
    Math.min(3, Math.max(0, pool.length - 1))
  );

  state.numberChallengeStageId = stage.id;
  state.numberChallengeTargetValue = targetValue;
  state.numberChallengeOptionValues = shuffleArray([targetValue, ...distractors]);
  state.lastNumberFeedback =
    options.feedback ??
    "Look carefully. Pick the number without counting from one every time.";
}

function ensureNumberChallenge() {
  const stage = currentNumberStage();
  if (state.numberChallengeStageId !== stage.id || !state.numberChallengeOptionValues.length) {
    resetNumberChallenge();
  }
}

function resetMathChallenge() {
  const stage = currentNumberStage();
  const low = Math.max(1, stage.start);
  const high = Math.max(low, stage.end);
  const additionMaxLeft = high > low ? high - 1 : high;
  const problems = [
    ...Array.from({ length: Math.max(0, additionMaxLeft - low + 1) }, (_, offset) => {
      const left = low + offset;
      return Array.from({ length: Math.max(1, high - left) }, (_, rightOffset) => {
        const right = rightOffset + 1;
        return { operator: "+", left, right, answer: left + right };
      });
    }).flat(),
    ...Array.from({ length: high - low + 1 }, (_, offset) => {
      const left = low + offset;
      return Array.from({ length: left + 1 }, (_, right) => ({ operator: "-", left, right, answer: left - right }));
    }).flat()
  ];
  const problemId = nextRandomCycleId(state, `math:${stage.id}`, problems.map((problem) => `${problem.operator}:${problem.left}:${problem.right}`));
  const { operator, left, right, answer } = problems.find((problem) => `${problem.operator}:${problem.left}:${problem.right}` === problemId) ?? problems[0];

  state.mathChallengeStageId = stage.id;
  state.mathChallengeOperator = operator;
  state.mathChallengeLeft = left;
  state.mathChallengeRight = right;
  state.mathChallengeAnswer = answer;
  state.lastMathFeedback = "Type the answer, then check it.";
  state.mathChallengeSolved = false;
  state.mathChallengeInput = "";
}

function ensureMathChallenge() {
  const stage = currentNumberStage();
  if (state.mathChallengeStageId !== stage.id || state.mathChallengeAnswer === null) {
    resetMathChallenge();
  }
}

function familyGameItems() {
  const familyTopic = topicById("family");
  return familyGameItemIds
    .map((id) => familyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function familyPersonForItemId(itemId) {
  const personId = familyPersonIdsByItemId[itemId];
  return (
    {
      dad: illustratedFamily.dad,
      mom: illustratedFamily.mom,
      "older-brother": { ...illustratedKids.yangyang, label: "Older brother" },
      "younger-brother": { ...illustratedKids.lele, label: "Younger brother" },
      "older-sister": { ...illustratedKids.anan, label: "Older sister" },
      "younger-sister": { ...illustratedKids.meimei, label: "Younger sister" }
    }[personId] ?? null
  );
}

function familyHeadshotForItemId(itemId) {
  return familyHeadshotsByItemId[itemId] ?? null;
}

function isFamilySentenceItemId(itemId) {
  return ["parents-love-me", "i-love-dad", "i-love-mom"].includes(itemId);
}

function familyBookWordItems() {
  return focusItemsForTopic(topicById("family")).filter((item) => !isFamilySentenceItemId(item.id));
}

const lessonTemplateTopicIds = new Set(["greetings", "polite-words", "introductions", "age", "family"]);

function usesLessonTemplate(topic) {
  return lessonTemplateTopicIds.has(topic.id);
}

function bookWordItemsForTopic(topic) {
  if (topic.id === "family") {
    return familyBookWordItems();
  }

  if (topic.id === "languages") {
    return focusItemsForTopic(topic).filter((item) => item.id !== "speak-language");
  }

  return focusItemsForTopic(topic);
}

function usefulNoteForTopic(topic) {
  const notes = {
    greetings: `
      <p class="greetings-note-hanzi">你 and 您</p>
      <p class="greetings-note-copy">
        <strong>你</strong> is the everyday word for “you.” <strong>您</strong> is the polite form, often used for teachers and other adults to show respect.
      </p>
      <p class="greetings-note-copy">
        <strong>老师</strong> means “teacher,” so <strong>李老师，您好！</strong> sounds warm and respectful.
      </p>
    `,
    "polite-words": `
      <p class="greetings-note-hanzi">谢谢 / 不客气 / 对不起 / 没关系</p>
      <p class="greetings-note-copy">
        <strong>谢谢你</strong> means “thank you,” and <strong>不客气</strong> is the kind reply: “you’re welcome.”
      </p>
      <p class="greetings-note-copy">
        <strong>对不起</strong> means “I’m sorry,” and <strong>没关系</strong> is the calm reply: “never mind” or “that’s okay.”
      </p>
      <p class="greetings-note-copy">
        <strong>请</strong> helps children sound polite in requests and classroom directions, for example:
        <strong>请安静。</strong>
      </p>
    `,
    introductions: `
      <p class="greetings-note-hanzi">我 / 叫 / 什么 / 名字</p>
      <p class="greetings-note-copy">
        <strong>我</strong> means “I” or “me,” and <strong>叫</strong> is used in beginner Chinese to say what someone is called.
      </p>
      <p class="greetings-note-copy">
        <strong>你叫什么名字？</strong> means “What is your name?” and <strong>我叫……</strong> gives the answer pattern: “My name is…”
      </p>
      <p class="greetings-note-copy">
        Let children pause after <strong>我叫</strong> and say their own name out loud.
      </p>
    `,
    age: `
      <p class="greetings-note-hanzi">你几岁？ / 我...岁。 / 你上几年级？ / 我上一年级。</p>
      <p class="greetings-note-copy">
        <strong>你几岁？</strong> literally means “you how-many years old?” Here, <strong>几</strong> asks for a small number, and <strong>岁</strong> is the common word for a child's age.
      </p>
      <p class="greetings-note-copy">
        The answer pattern stays simple: <strong>我 + number + 岁</strong>. So <strong>我五岁</strong> is “I am five years old,” <strong>我六岁</strong> is “I am six years old,” and <strong>我七岁</strong> is “I am seven years old.”
      </p>
      <p class="greetings-note-copy">
        <strong>你上几年级？</strong> asks what school year someone is in, and <strong>我上一年级。</strong> means “I am in first grade.” This topic links naturally with earlier self-introduction language: <strong>你好！你叫什么名字？我叫…… 你几岁？我五岁。你上几年级？我上一年级。</strong>
      </p>
    `,
    family: `
      <p class="greetings-note-hanzi">爸爸 / 妈妈 / 哥哥 / 弟弟 / 姐姐 / 妹妹</p>
      <p class="greetings-note-copy">
        In sentences like <strong>我爱爸爸</strong> and <strong>我爱妈妈</strong>, the family word names who the child loves. <strong>我</strong> names the speaker, and <strong>爱</strong> names the feeling.
      </p>
      <p class="greetings-note-copy">
        <strong>哥哥</strong> and <strong>弟弟</strong> are the brother pair: older brother, then younger brother. <strong>姐姐</strong> and <strong>妹妹</strong> are the sister pair: older sister, then younger sister.
      </p>
      <p class="greetings-note-copy">
        In listening practice, the repeated family word is the anchor. For sisters, <strong>姐姐</strong> and <strong>妹妹</strong> both use <strong>女</strong>, so children can group the two sister words together.
      </p>
    `,
    languages: `
      <p class="greetings-note-hanzi">国家 / 国籍 / 语言</p>
      <p class="greetings-note-copy">
        <strong>国家</strong> names a country, <strong>国籍</strong> names a nationality, and <strong>语言</strong> names a language. In this lesson, listen for the language word after <strong>说</strong>.
      </p>
      <p class="greetings-note-copy">
        People can speak one language or more than one language. The sentence pattern helps us practise words; it does not describe every person from a country.
      </p>
    `
  };

  return notes[topic.id] ?? "";
}

function familyWordForPersonId(personId) {
  return {
    mom: "妈妈",
    dad: "爸爸",
    "older-brother": "哥哥",
    "younger-brother": "弟弟",
    "older-sister": "姐姐",
    "younger-sister": "妹妹"
  }[personId] ?? "";
}

function resetFamilyChallenge(options = {}) {
  const items = familyGameItems();
  if (!items.length) {
    return;
  }

  const answerId = nextRandomCycleId(state, "family-listen", items.map((item) => item.id));
  const answer = items.find((item) => item.id === answerId);
  if (!answer) return;
  const distractors = shuffleArray(items.filter((item) => item.id !== answer.id)).slice(
    0,
    Math.min(3, Math.max(0, items.length - 1))
  );

  state.familyChallengeAnswerId = answer.id;
  state.familyChallengePickedId = "";
  state.familyChallengePromptId = answer.id;
  state.familyChallengeOptionIds = shuffleArray([answer.id, ...distractors.map((item) => item.id)]);
  state.familyChallengeResult = "";
  state.familyChallengeWrongIds = new Set();
  state.familyListenFeedback = options.feedback ?? "";
  state.lastFamilyFeedback = state.familyListenFeedback;
}

function ensureFamilyChallenge() {
  if (!state.familyChallengeAnswerId || !state.familyChallengeOptionIds.length) {
    resetFamilyChallenge();
  }
}

function resetListenChallengeResult(challengeKey) {
  state[`${challengeKey}ChallengePickedId`] = "";
  state[`${challengeKey}ChallengeResult`] = "";
  state[`${challengeKey}ChallengeWrongIds`] = new Set();
}

function handleFamilyChallengePlay() {
  ensureFamilyChallenge();
  const item = familyGameItems().find((entry) => entry.id === state.familyChallengePromptId);
  if (!item) {
    return;
  }

  resetListenChallengeResult("family");
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyListenFeedback = `Listen again and find ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyChallengeGuess(itemId) {
  ensureFamilyChallenge();
  const answer = familyGameItems().find((entry) => entry.id === state.familyChallengeAnswerId);
  const picked = familyGameItems().find((entry) => entry.id === itemId);
  if (!answer || !picked) {
    return;
  }

  if (itemId === answer.id) {
    state.selectedFocusItemId = answer.id;
    state.familyChallengePickedId = itemId;
    state.familyChallengeResult = "correct";
    if (state.tapAudioEnabled) {
      speak(answer.audio, 0.78);
    }
    state.familyListenFeedback = "Nice listening.";
    state.lastFamilyFeedback = state.familyListenFeedback;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();
    renderActivityPanel(currentTopic());
    return;
  }

  state.familyChallengePickedId = itemId;
  state.familyChallengeResult = "wrong";
  state.familyChallengeWrongIds = new Set([...state.familyChallengeWrongIds, itemId]);
  state.familyListenFeedback = "Not that one. Try another card.";
  state.lastFamilyFeedback = state.familyListenFeedback;
  renderActivityPanel(currentTopic());
}

function resetFamilyMatchGame() {
  const items = familyGameItems();
  state.familySelectedPhraseId = null;
  state.familyMatchedIds = new Set();
  state.familyPhraseOrder = shuffleArray(items.map((item) => item.id));
  state.familyMeaningOrder = shuffleArray(items.map((item) => item.id));
  state.familyMatchFeedback = "";
  state.lastFamilyFeedback = state.familyMatchFeedback;
}

function ensureFamilyMatchGame() {
  const items = familyGameItems();
  if (
    !state.familyPhraseOrder.length ||
    state.familyPhraseOrder.length !== items.length ||
    state.familyMeaningOrder.length !== items.length
  ) {
    resetFamilyMatchGame();
  }
}

function handleFamilyMatchPhrase(itemId) {
  const item = familyGameItems().find((entry) => entry.id === itemId);
  if (!item || state.familyMatchedIds.has(itemId)) {
    return;
  }

  state.familySelectedPhraseId = itemId;
  if (state.tapAudioEnabled) {
    speak(item.audio, 0.78);
  }
  state.familyMatchFeedback = `Now find who matches ${item.hanzi}.`;
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function handleFamilyMatchAttempt(targetId) {
  if (!state.familySelectedPhraseId || state.familyMatchedIds.has(targetId)) {
    return;
  }

  const selectedId = state.familySelectedPhraseId;
  const selectedItem = familyGameItems().find((entry) => entry.id === selectedId);
  if (!selectedItem) {
    return;
  }

  if (selectedId === targetId) {
    state.familyMatchedIds = new Set([...state.familyMatchedIds, targetId]);
    state.familySelectedPhraseId = null;
    state.familyMatchFeedback = "Matched.";
    state.lastFamilyFeedback = state.familyMatchFeedback;
    state.selectedFocusItemId = selectedItem.id;
    renderFocusDisplay(currentFocusItem());
    renderFocusExplorer();
    renderFocusStatus();

    if (state.familyMatchedIds.size === familyGameItems().length) {
      state.familyMatchFeedback = "All family members matched.";
      state.lastFamilyFeedback = state.familyMatchFeedback;
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.familyMatchFeedback = "Try a different family member.";
  state.lastFamilyFeedback = state.familyMatchFeedback;
  renderActivityPanel(currentTopic());
}

function mathChallengeAudioText() {
  if (state.mathChallengeAnswer === null) {
    return "";
  }

  const chineseOperator = state.mathChallengeOperator === "+" ? "加" : "减";
  return `${numberHanzi(state.mathChallengeLeft)}${chineseOperator}${numberHanzi(state.mathChallengeRight)}等于${numberHanzi(state.mathChallengeAnswer)}`;
}

function handleMathChallengeSubmit(rawValue) {
  ensureMathChallenge();
  if (state.mathChallengeSolved) {
    return;
  }

  const trimmed = rawValue.trim();
  state.mathChallengeInput = trimmed;
  const answer = Number(trimmed);
  const audioText = mathChallengeAudioText();

  if (!Number.isFinite(answer)) {
    state.lastMathFeedback = "Type one number first.";
    renderActivityPanel(currentTopic());
    return;
  }

  if (answer === state.mathChallengeAnswer) {
    if (state.tapAudioEnabled && audioText) {
      speak(audioText, 0.78);
    }
    state.lastMathFeedback = `Correct! ${audioText}`;
    state.mathChallengeSolved = true;
  } else {
    state.lastMathFeedback = "Try again.";
  }

  renderActivityPanel(currentTopic());
}

function handleNumberChallengeGuess(value) {
  ensureNumberChallenge();
  const target = state.numberChallengeTargetValue;
  const targetItem = buildNumberItem(target);

  if (value === target) {
    state.selectedFocusItemId = targetItem.id;
    if (state.tapAudioEnabled) {
      speak(targetItem.audio, 0.78);
    }
    state.lastNumberFeedback = `Correct! ${targetItem.hanzi} is right. Here comes a new round.`;
    renderFocusDisplay(currentFocusItem());
    renderFocusWordList();
    renderFocusStatus();

    if (state.numberChallengeAdvanceTimer) {
      window.clearTimeout(state.numberChallengeAdvanceTimer);
    }

    state.numberChallengeAdvanceTimer = window.setTimeout(() => {
      resetNumberChallenge();
      renderFocusExplorer();
      renderActivityPanel(currentTopic());
      renderFocusStatus();
      state.numberChallengeAdvanceTimer = null;
    }, 700);
    return;
  }

  state.lastNumberFeedback = `Try again. This group is ${targetItem.hanzi}, not ${buildNumberItem(value).hanzi}.`;
  renderFocusStatus();
}


function bodyMatchItems() {
  const ids = [...bodyCoreItemIds, ...bodyBonusItemIds];
  const bodyTopic = topicById("body");
  return ids
    .map((id) => bodyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function nextBodyRound() {
  const allIds = bodyMatchItems().map((item) => item.id);
  const remaining = allIds.filter((id) => !state.bodyMatchedIds.has(id));

  state.bodySelectedChineseId = null;
  state.bodySelectedEnglishId = null;
  state.bodyRoundIds = shuffleArray(remaining).slice(0, Math.min(3, remaining.length));
  state.bodyChineseOrder = shuffleArray(state.bodyRoundIds);
  state.bodyEnglishOrder = shuffleArray(state.bodyRoundIds);
}

function resetBodyMatchGame() {
  state.bodyMatchedIds = new Set();
  state.bodyMatchUniverseKey = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  nextBodyRound();
  state.lastBodyFeedback = "Match the Chinese words with the English words.";
}

function ensureBodyMatchGame() {
  const ids = bodyMatchItems()
    .map((item) => item.id)
    .sort()
    .join("|");
  if (!state.bodyRoundIds.length || state.bodyMatchUniverseKey !== ids) {
    resetBodyMatchGame();
  }
}

function handleBodyMatchChinese(itemId) {
  state.bodySelectedChineseId = itemId;
  state.bodySelectedEnglishId = null;
  selectFocusItem(itemId, {
    playAudio: true,
    bodyFeedback: "Now tap the matching English word."
  });
  renderActivityPanel(currentTopic());
}

function handleBodyMatchAttempt(englishId, chineseId = state.bodySelectedChineseId) {
  const itemsById = Object.fromEntries(bodyMatchItems().map((item) => [item.id, item]));

  if (!chineseId) {
    state.bodySelectedEnglishId = englishId;
    state.lastBodyFeedback = "Tap a Chinese word first.";
    renderActivityPanel(currentTopic());
    return;
  }

  state.bodySelectedEnglishId = englishId;

  if (englishId === chineseId) {
    state.bodyMatchedIds.add(englishId);
    state.bodySelectedChineseId = null;
    state.bodySelectedEnglishId = null;
    selectFocusItem(englishId, {
      playAudio: state.tapAudioEnabled,
      bodyFeedback: `Nice match! ${itemsById[englishId].hanzi} means ${itemsById[englishId].english}.`
    });

    const roundComplete = state.bodyRoundIds.every((id) => state.bodyMatchedIds.has(id));
    if (roundComplete) {
      const total = bodyMatchItems().length;
      const allDone = state.bodyMatchedIds.size === total;
      state.lastBodyFeedback = allDone
        ? "Great job! You matched all the words."
        : "Round complete! Tap Next set for the next words.";
    }
    renderActivityPanel(currentTopic());
    return;
  }

  state.lastBodyFeedback = `Try again. ${itemsById[chineseId].hanzi} is not ${itemsById[englishId].english}.`;
  renderActivityPanel(currentTopic());
}

function bodySpotlightItems() {
  const bodyTopic = topicById("body");
  return bodyCoreItemIds
    .map((id) => bodyTopic?.focusItems.find((item) => item.id === id))
    .filter(Boolean);
}

function nextBodySpotlightRound() {
  const items = bodySpotlightItems();
  const promptId = nextRandomCycleId(state, "body-spotlight-choose", items.map((item) => item.id));
  state.bodySpotlightPromptId = promptId;
  state.bodySpotlightOptionIds = shuffleArray([
    promptId,
    ...shuffleArray(items.filter((item) => item.id !== promptId).map((item) => item.id)).slice(0, 3)
  ]);
  state.bodySpotlightResult = "";
  state.bodySpotlightWrongIds = new Set();
}

function startBodySpotlightRound() {
  nextBodySpotlightRound();
  renderActivityPanel(currentTopic());
}

function handleBodySpotlightGuess(itemId) {
  const prompt = bodySpotlightItems().find((item) => item.id === state.bodySpotlightPromptId);
  if (!prompt || state.bodySpotlightResult === "correct") return;

  if (itemId === prompt.id) {
    state.bodySpotlightResult = "correct";
    if (state.tapAudioEnabled) speak(bodySentenceForItem(prompt).hanzi, 0.78);
  } else {
    state.bodySpotlightResult = "wrong";
    state.bodySpotlightWrongIds = new Set([...state.bodySpotlightWrongIds, itemId]);
  }
  renderActivityPanel(currentTopic());
}

const bodySpotlightRegions = {
  head: { x: 50, y: 24, width: 46, height: 22 },
  hair: { x: 50, y: 15, width: 31, height: 13 },
  eyes: { x: 41, y: 29, width: 15, height: 10 },
  ears: { x: 28, y: 31.5, width: 13, height: 13 },
  nose: { x: 50, y: 32, width: 12, height: 9 },
  mouth: { x: 50, y: 36.5, width: 17, height: 8 },
  hand: { x: 27, y: 61, width: 17, height: 13 },
  foot: { x: 36.5, y: 87.5, width: 18, height: 13 }
};

function renderBodyPractice() {
  const items = bodySpotlightItems();
  const prompt = items.find((item) => item.id === state.bodySpotlightPromptId);
  const complete = state.bodySpotlightResult === "correct";
  const sentence = prompt ? bodySentenceForItem(prompt) : null;
  const region = prompt ? bodySpotlightRegions[prompt.id] : null;
  const spotlightOptionMarkup = prompt
    ? state.bodySpotlightOptionIds.map((id) => {
        const option = items.find((item) => item.id === id);
        const isCorrect = complete && id === prompt.id;
        const isWrong = state.bodySpotlightWrongIds.has(id);
        return `<button class="numbers-game-option body-spotlight-option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}" type="button" data-body-spotlight-guess="${id}" ${complete ? "disabled" : ""}><span class="numbers-game-hanzi">${option.hanzi}</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${option.pinyin}</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${option.english}</span>` : ""}</button>`;
      })
    : [];
  const spotlightVisualMarkup = `
    <figure class="body-listen-visual">
      <div class="body-listen-scene-card">
        <img class="body-listen-image" src="assets/body/body-topic-kid-largehead.webp" alt="Cartoon child for body parts practice">
        ${region ? `<span class="body-spotlight-window" style="--body-spotlight-x: ${region.x}%; --body-spotlight-y: ${region.y}%; --body-spotlight-width: ${region.width}%; --body-spotlight-height: ${region.height}%;" aria-hidden="true"></span>` : ""}
      </div>
    </figure>`;

  activityPanelTitle.textContent = "Let's practice";
  activityPanelSummary.textContent = "Look at the highlighted body part, then choose its word.";
  activityList.className = "support-list";
  activityList.innerHTML = `
    <section class="clothes-quiz-shell body-listen-practice">
      <div class="numbers-game-top">
        <div>
          <p class="body-match-kicker">Look and choose</p>
          <p class="numbers-game-note">Press New game to reveal one body part. Then choose the matching word.</p>
        </div>
        <button class="small-button is-practice-advance-button" type="button" data-body-spotlight-new aria-label="Start a new game">New game</button>
      </div>
      <div class="body-spotlight-desktop">
        ${spotlightVisualMarkup}
        ${prompt ? `<div class="numbers-game-options body-spotlight-options">${spotlightOptionMarkup.join("")}</div>` : ""}
      </div>
      ${prompt ? `<div class="body-spotlight-mobile">
        <div class="body-spotlight-option-column">${spotlightOptionMarkup.slice(0, 2).join("")}</div>
        ${spotlightVisualMarkup}
        <div class="body-spotlight-option-column">${spotlightOptionMarkup.slice(2).join("")}</div>
      </div>` : ""}
      ${complete && sentence ? `<div class="body-listen-answer"><p class="telephone-line-hanzi">${sentence.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${sentence.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${sentence.english}</p>` : ""}</div>` : ""}
      ${renderBodyMatchPanel()}
    </section>
  `;

  activityList.querySelector("[data-body-spotlight-new]")?.addEventListener("click", startBodySpotlightRound);
  activityList.querySelectorAll("[data-body-spotlight-guess]").forEach((button) => {
    button.addEventListener("click", () => handleBodySpotlightGuess(button.dataset.bodySpotlightGuess));
  });
  bindBodyMatchPanel(activityList);
}


function numberWordListItems(items, currentItem, stage) {
  if (stage.end <= 10) {
    return items;
  }

  const byValue = [...items].sort((left, right) => left.value - right.value);
  const currentIndex = Math.max(
    0,
    byValue.findIndex((item) => item.id === currentItem.id)
  );
  const picked = new Map([[currentItem.id, currentItem]]);

  const offsets = [-1, 1, -2, 2];
  offsets.forEach((offset) => {
    const candidate = byValue[currentIndex + offset];
    if (candidate && picked.size < 5) {
      picked.set(candidate.id, candidate);
    }
  });

  if (picked.size < Math.min(5, byValue.length)) {
    shuffleArray(byValue).forEach((candidate) => {
      if (picked.size < Math.min(5, byValue.length)) {
        picked.set(candidate.id, candidate);
      }
    });
  }

  return shuffleArray([...picked.values()]);
}

function renderBodyLabelButton(item, align) {
  const isActive = item.id === state.selectedFocusItemId;
  return `
    <button
      class="body-label-button${isActive ? " is-active" : " is-muted"}"
      type="button"
      data-body-item-id="${item.id}"
      data-body-align="${align}"
      aria-pressed="${isActive ? "true" : "false"}"
    >
      <span class="body-label-hanzi">${item.hanzi}</span>
      ${state.showPinyin ? `<span class="body-label-pinyin">${item.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="body-label-english">${item.english}</span>` : ""}
    </button>
  `;
}

function renderBodyMatchPanel() {
  ensureBodyMatchGame();
  const matchItems = Object.fromEntries(bodyMatchItems().map((entry) => [entry.id, entry]));
  const solvedMatchIds = state.bodyChineseOrder.filter((id) => state.bodyMatchedIds.has(id));
  const remainingChineseIds = state.bodyChineseOrder.filter((id) => !state.bodyMatchedIds.has(id));
  const remainingEnglishIds = state.bodyEnglishOrder.filter((id) => !state.bodyMatchedIds.has(id));
  return `
        <section class="body-match-panel">
          <div class="body-match-heading">
            <div>
              <p class="body-match-kicker">Match Game</p>
              <h4>Chinese to English</h4>
            </div>
            <div class="body-match-actions">
              <button class="small-button is-practice-advance-button" type="button" data-body-reset-match aria-label="Start a new game">
                New game
              </button>
            </div>
          </div>
          <p class="body-match-helper">Tap a Chinese card, then tap the matching English card.</p>
          <div class="body-match-progress">
            Matched ${state.bodyMatchedIds.size} of ${bodyMatchItems().length}
          </div>
          <div class="body-match-board-headings">
            <p class="body-match-kicker">Chinese</p>
            <p class="body-match-kicker">English</p>
          </div>
          ${
            solvedMatchIds.length
              ? `
                <div class="body-match-solved-pairs">
                  ${solvedMatchIds
                    .map((id) => {
                      const matchItem = matchItems[id];
                      return `
                        <article class="body-match-solved-row">
                          <div class="body-match-card body-match-card-chinese is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="body-match-hanzi">${matchItem.hanzi}</span>
                            ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                          </div>
                          <div class="body-match-card body-match-card-english is-solved">
                            <span class="answer-result-mark" aria-hidden="true">✓</span>
                            <span class="body-match-english">${matchItem.english}</span>
                          </div>
                        </article>
                      `;
                    })
                    .join("")}
                </div>
              `
              : ""
          }
          ${
            remainingChineseIds.length
              ? `
                <div class="body-match-open-board">
                  <div class="body-match-column">
                    ${remainingChineseIds
              .map((id) => {
                const matchItem = matchItems[id];
                const selected = state.bodySelectedChineseId === id;
                return `
                  <button
                    class="body-match-card body-match-card-chinese${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-chinese="${id}"
                  >
                    <span class="body-match-hanzi">${matchItem.hanzi}</span>
                    ${state.showPinyin ? `<span class="body-match-pinyin">${matchItem.pinyin}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
                  </div>
                  <div class="body-match-column">
                    ${remainingEnglishIds
              .map((id) => {
                const matchItem = matchItems[id];
                if (!matchItem) {
                  return "";
                }
                const solved = state.bodyMatchedIds.has(id);
                const selected = state.bodySelectedEnglishId === id;
                return `
                  <button
                    class="body-match-card body-match-card-english${solved ? " is-solved" : ""}${selected ? " is-selected" : ""}"
                    type="button"
                    data-body-match-english="${id}"
                  >
                    <span class="body-match-english">${matchItem.english}</span>
                  </button>
                `;
              })
              .join("")}
                  </div>
                </div>
              `
              : ""
          }
        </section>
  `;
}

function bindBodyMatchPanel(root) {
  root.querySelector("[data-body-reset-match]")?.addEventListener("click", () => {
    resetBodyMatchGame();
    renderActivityPanel(currentTopic());
  });

  root.querySelectorAll("[data-body-match-chinese]").forEach((button) => {
    button.addEventListener("click", () => handleBodyMatchChinese(button.dataset.bodyMatchChinese));
  });

  root.querySelectorAll("[data-body-match-english]").forEach((button) => {
    button.addEventListener("click", () => handleBodyMatchAttempt(button.dataset.bodyMatchEnglish));
  });
}

function renderBodyExplorer() {
  const item = currentFocusItem();
  const items = Object.fromEntries(focusItemsForTopic().map((entry) => [entry.id, entry]));
  focusExplorer.innerHTML = `
    <div class="body-game">
      <div class="body-practice-visual">
        <div class="body-diagram">
          <div class="body-label-column body-label-column-left">
            ${bodyDiagramLayout.left.map((id) => renderBodyLabelButton(items[id], "left")).join("")}
          </div>
          <div class="body-scene">
            <div class="body-scene-card">
              <img
                class="body-scene-kid"
                src="assets/body/body-topic-kid-largehead.webp"
                alt="Cartoon child for body parts learning activity"
              />
              <div class="body-part-indicator body-part-indicator-${item.id}" aria-hidden="true"></div>
            </div>
          </div>
          <div class="body-label-column body-label-column-right">
            ${bodyDiagramLayout.right.map((id) => renderBodyLabelButton(items[id], "right")).join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-body-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.bodyItemId, { playAudio: true });
    });
  });

}

function renderNumberVisual(value, stage) {
  if (value === 0) {
    return '<p class="numbers-visual-note">Start with zero for phone-number reading.</p>';
  }

  const emojis = stage.visualEmojis?.length ? stage.visualEmojis : ["⭐"];
  const chosenEmoji = emojis[(Math.max(value, 1) - 1) % emojis.length];
  const objectMarkup = (count) =>
    Array.from(
      { length: count },
      () => `<span class="numbers-object">${chosenEmoji}</span>`
    ).join("");

  if (value <= 20) {
    const groups = [];
    let remaining = value;
    while (remaining > 0) {
      groups.push(Math.min(5, remaining));
      remaining -= 5;
    }

    return groups
      .map(
        (count) => `
          <div class="numbers-object-group">
            ${objectMarkup(count)}
          </div>
        `
      )
      .join("");
  }

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return `
    <div class="numbers-bundle-row">
      ${Array.from(
        { length: tens },
        () => `
          <div class="numbers-bundle-card">
            <span class="numbers-bundle-emoji">${chosenEmoji}</span>
            <span class="numbers-bundle-count">× 10</span>
          </div>
        `
      ).join("")}
    </div>
    ${
      ones
        ? `
          <div class="numbers-object-group">
            ${objectMarkup(ones)}
          </div>
        `
        : ""
    }
  `;
}

function renderNumbersExplorer() {
  ensureNumberChallenge();
  const stage = currentNumberStage();
  if (stage.telephoneMode) {
    renderTelephoneExplorer(stage);
    return;
  }
  const item = currentFocusItem();
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="numbers-showcase-card">
        <div class="numbers-showcase-copy">
          <p class="body-match-kicker">Current number</p>
          <div class="numbers-current-line">
            <p class="numbers-hanzi">${item.hanzi}</p>
            <p class="numbers-arabic${state.showArabic ? "" : " is-hidden"}">${item.value}</p>
          </div>
        </div>
        <div class="numbers-count-board">
          ${renderNumberVisual(item.value, stage)}
        </div>
      </div>
    </div>
  `;
}

function renderTelephoneExplorer(stage) {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${stage.lesson}</p>
        <h4>${stage.title}</h4>
        <p>${stage.summary}</p>
      </div>
      <div class="telephone-scene-card">
        <div class="telephone-scene-people">
          <article class="telephone-bubble telephone-bubble-question">
            <div class="telephone-figure-card telephone-figure-card-left" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.anan.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Ask</p>
              <p class="telephone-line-hanzi">${telephonePractice.question.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.question.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.question.english}</p>` : ""}
              <button class="small-button is-play-button" type="button" data-telephone-play="question">Play</button>
            </div>
          </article>
          <article class="telephone-bubble telephone-bubble-answer">
            <div class="telephone-figure-card telephone-figure-card-right" aria-hidden="true">
              <img
                class="telephone-figure"
                src="${illustratedKids.tiantian.path}"
                alt=""
              />
            </div>
            <div class="telephone-bubble-copy">
              <p class="body-match-kicker">Answer</p>
              <p class="telephone-line-hanzi">${telephonePractice.answer.hanzi}</p>
              ${state.showPinyin ? `<p class="telephone-line-pinyin">${telephonePractice.answer.pinyin}</p>` : ""}
              ${state.showEnglish ? `<p class="telephone-line-english">${telephonePractice.answer.english}</p>` : ""}
              <button class="small-button is-play-button" type="button" data-telephone-play="answer">Play</button>
            </div>
          </article>
        </div>
        <div class="telephone-number-strip">
          <p class="body-match-kicker">Listen to the digits</p>
          <div class="telephone-digit-row">
            ${telephonePractice.digits
              .map(
                (digit) => `
                  <button class="telephone-digit-chip" type="button" data-telephone-digit="${digit}">
                    ${digit}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-telephone-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const line = button.dataset.telephonePlay === "question" ? telephonePractice.question : telephonePractice.answer;
      if (state.tapAudioEnabled) {
        speak(line.audio, 0.78);
      }
      focusStatus.textContent = button.dataset.telephonePlay === "question"
        ? "Listen to the question first, then listen for the answer."
        : "Listen to the answer and notice how each digit is said one by one.";
    });
  });

  focusExplorer.querySelectorAll("[data-telephone-digit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.tapAudioEnabled) {
        speak(button.dataset.telephoneDigit, 0.78);
      }
      focusStatus.textContent = `Practice the digit ${button.dataset.telephoneDigit} by itself.`;
    });
  });
}


function renderFamilyHomeVisual(exchange) {
  if (exchange.visual === "parents-love") {
    return `
      <div class="family-lesson-visual family-lesson-visual-love">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  if (exchange.visual === "siblings-compare") {
    return `
      <div class="family-lesson-visual family-lesson-visual-siblings">
        <img class="family-lesson-photo" src="${exchange.imagePath}" alt="${exchange.imageAlt}" />
      </div>
    `;
  }

  const roomClass = {
    "living-room": "family-room-living",
    playroom: "family-room-playroom",
    "family-visit": "family-room-visit"
  }[exchange.roomLabel] ?? "family-room-living";

  return `
    <div class="family-room ${roomClass}">
      <div class="family-room-scene-bar">
        <div class="family-room-scene-copy">
          <p class="family-room-scene-label">${exchange.sceneLabel}</p>
          <p class="family-room-scene-mood">${exchange.sceneMood}</p>
        </div>
        <div class="family-room-scene-sun" aria-hidden="true"></div>
      </div>
      <div class="family-room-backdrop">
        <div class="family-room-window">
          <div class="family-room-window-sky"></div>
          <div class="family-room-window-hill family-room-window-hill-back"></div>
          <div class="family-room-window-hill family-room-window-hill-front"></div>
        </div>
        <div class="family-room-curtain family-room-curtain-left"></div>
        <div class="family-room-curtain family-room-curtain-right"></div>
        <div class="family-room-rug"></div>
        <div class="family-room-floor-line"></div>
        <div class="family-room-furniture family-room-furniture-left"></div>
        <div class="family-room-furniture family-room-furniture-right"></div>
        <div class="family-room-decor family-room-decor-left"></div>
        <div class="family-room-decor family-room-decor-right"></div>
      </div>
      <div class="family-room-cast">
        ${exchange.cast
          .map((personId, index) => {
            const person = illustratedFamily[personId];
            if (!person) {
              return "";
            }
            return `
              <article class="family-room-person family-room-person-${person.id} family-room-person-${index === 0 ? "left" : "right"}">
                <div class="family-room-callout">${familyWordForPersonId(person.id)}</div>
                <div class="family-room-portrait">
                  <img class="family-room-image" src="${person.path}" alt="${person.label}" />
                </div>
                <div class="family-room-name">
                  <span class="family-room-name-hanzi">${familyWordForPersonId(person.id)}</span>
                  <span class="family-room-name-english">${person.label}</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderFamilyExplorer() {
  focusExplorer.innerHTML = `
    <div class="numbers-board">
      <div class="numbers-stage-card">
        <p class="body-match-kicker">${currentBook().label} Lesson ${currentLesson().lesson}</p>
        <h4>Book theme: family at home</h4>
        <p>Start with 爸爸妈妈爱我, then reuse the same small word set as the child moves to 我爱爸爸, 我爱妈妈, and sibling words.</p>
      </div>
      <div class="greetings-practice-grid family-scenes-grid">
        ${familyPractice
          .map(
            (exchange) => `
              <section class="greetings-exchange">
                <div class="greetings-exchange-top">
                  <div><p class="body-match-kicker">${exchange.title}</p></div>
                  <button class="small-button is-play-button" type="button" data-family-play-all="${exchange.id}">Play</button>
                </div>
                <div class="greetings-scene-layout family-scene-layout">
                  <div class="family-scene-visual">
                    ${renderFamilyHomeVisual(exchange)}
                  </div>
                  <div class="greetings-line-stack">
                    ${exchange.lines
                      .map(
                        (line, index) => `
                          <article class="greetings-line-card">
                            <div class="telephone-bubble-copy">
                              <p class="telephone-line-hanzi">${line.hanzi}</p>
                              ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                              ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-family-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const exchange = familyPractice.find((entry) => entry.id === button.dataset.familyPlayAll);
      if (!exchange || !state.tapAudioEnabled) {
        return;
      }

      speakSceneLines(exchange.lines);
      focusStatus.textContent = `Listen to the whole scene: ${exchange.lines.map((line) => line.hanzi).join(" ")}`;
    });
  });

  focusExplorer.querySelectorAll("[data-family-word]").forEach((button) => {
    button.addEventListener("click", () => {
      selectFocusItem(button.dataset.familyWord, { playAudio: true });
    });
  });
}

function renderLegacyIdentityExplorer() {
  const allIdentityCountries = [...identityCountries, ...identityExploreCountries];
  const selectedCountry = allIdentityCountries.find((country) => country.id === state.identitySelectedCountryId);
  const coreCountryIds = identityCountries.map((country) => country.id);
  const validPracticeIds = Array.isArray(state.identityPracticeRemainingIds)
    ? state.identityPracticeRemainingIds.filter((id) => coreCountryIds.includes(id))
    : [];
  if (!state.identityPracticeTargetId || !coreCountryIds.includes(state.identityPracticeTargetId)) {
    const nextIds = validPracticeIds.length ? validPracticeIds : shuffleArray(coreCountryIds);
    state.identityPracticeTargetId = nextIds.pop();
    state.identityPracticeRemainingIds = nextIds;
    state.identityPracticeFeedback = "";
  }
  const practiceCountry = identityCountries.find((country) => country.id === state.identityPracticeTargetId) ?? identityCountries[0];
  const selectedLanguageCountry = identityCountries.find((country) => country.id === state.identityLanguageSelectedCountryId);
  const countryCard = (country, group) => `
    <button class="identity-country-card${selectedCountry?.id === country.id ? " is-selected" : ""}" type="button" data-identity-country="${country.id}" data-identity-group="${group}">
      <img class="identity-flag" src="${country.asset}" alt="${country.label} flag" />
      <span class="numbers-game-hanzi">${country.nationality}</span>
      ${state.showPinyin ? `<span class="numbers-game-pinyin">${country.pinyin}</span>` : ""}
      ${state.showEnglish ? `<span class="numbers-game-english">${country.label}</span>` : ""}
    </button>
  `;
  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="identity-question-section">
        <div class="identity-question-top">
          <div>
            <p class="body-match-kicker">3A Lesson 5 · Nationality</p>
            <p class="greetings-exchange-prompt">Listen to the conversation. Choose the reply.</p>
            <p class="telephone-line-hanzi">${identityQuestion.hanzi}</p>
            ${state.showPinyin ? `<p class="telephone-line-pinyin">${identityQuestion.pinyin}</p>` : ""}
            ${state.showEnglish ? `<p class="telephone-line-english">${identityQuestion.english}</p>` : ""}
          </div>
          <button class="small-button is-play-button" type="button" data-identity-play-question>Play</button>
        </div>
        <div class="identity-practice-card">
          <div class="identity-practice-visual">
            <img class="identity-flag" src="${practiceCountry.asset}" alt="${practiceCountry.label} flag" />
            <p class="numbers-game-hanzi">${practiceCountry.hanzi}</p>
          </div>
          <div class="identity-practice-options" aria-label="Choose a nationality answer">
            ${identityCountries.map((country) => `<button class="choice-button" type="button" data-identity-practice-country="${country.id}">${country.nationality}</button>`).join("")}
          </div>
          <p class="identity-practice-feedback" aria-live="polite">${state.identityPracticeFeedback || "Choose the answer that completes 我是…人。"}</p>
          ${state.identityPracticeFeedback.startsWith("Correct") ? '<button class="small-button is-new-game-button" type="button" data-identity-next-practice>New round</button>' : ""}
        </div>
        ${
          selectedCountry
            ? `
              <article class="greetings-line-card identity-answer-card">
                <div class="telephone-bubble-copy">
                  <p class="telephone-line-hanzi">${selectedCountry.response.hanzi}</p>
                  ${state.showPinyin ? `<p class="telephone-line-pinyin">${selectedCountry.response.pinyin}</p>` : ""}
                  ${state.showEnglish ? `<p class="telephone-line-english">${selectedCountry.response.english}</p>` : ""}
                </div>
                <div class="identity-symbol-detail">
                  <img src="${selectedCountry.symbolAsset}" alt="${selectedCountry.symbolCaption}" />
                  <p>${selectedCountry.symbolCaption}</p>
                </div>
              </article>
            `
            : ""
        }
      </section>
      <section class="identity-question-section identity-explore-section">
        <div>
          <p class="body-match-kicker">Explore more countries</p>
          <p>These extra country words are for exploring, not for the 3A practice set.</p>
        </div>
        <div class="identity-country-grid identity-explore-grid">
          ${identityExploreCountries.map((country) => countryCard(country, "explore")).join("")}
        </div>
      </section>
      <section class="greetings-exchange identity-language-section">
        <div class="greetings-exchange-top">
          <div>
            <p class="body-match-kicker">4A Lesson 2 · Languages</p>
            <p class="greetings-exchange-prompt">Say one sentence for each picture.</p>
            <p class="telephone-line-hanzi">${identityLanguageQuestion.hanzi}</p>
            ${state.showPinyin ? `<p class="telephone-line-pinyin">${identityLanguageQuestion.pinyin}</p>` : ""}
            ${state.showEnglish ? `<p class="telephone-line-english">${identityLanguageQuestion.english}</p>` : ""}
          </div>
          <button class="small-button is-play-button" type="button" data-identity-play-language>Play</button>
        </div>
        <div class="identity-language-grid">
          ${identityCountries
            .map(
              (country) => `
                <button class="identity-language-card${selectedLanguageCountry?.id === country.id ? " is-selected" : ""}" type="button" data-identity-language-country="${country.id}">
                  <img class="identity-flag" src="${country.asset}" alt="${country.label} flag" />
                  <span class="numbers-game-hanzi">${country.nationality}说${country.language.hanzi}。</span>
                  ${state.showPinyin ? `<span class="numbers-game-pinyin">${country.pinyin} shuō ${country.language.pinyin}.</span>` : ""}
                  ${state.showEnglish ? `<span class="numbers-game-english">${country.nationality} people speak ${country.language.english}.</span>` : ""}
                </button>
              `
            )
            .join("")}
        </div>
        ${
          selectedLanguageCountry
            ? `<article class="greetings-line-card identity-answer-card">
                <div class="telephone-bubble-copy">
                  <p class="body-match-kicker">Make your own sentence</p>
                  <p class="telephone-line-hanzi">我是${selectedLanguageCountry.nationality}。我说${selectedLanguageCountry.language.hanzi}。</p>
                  ${state.showPinyin ? `<p class="telephone-line-pinyin">wǒ shì ${selectedLanguageCountry.pinyin}. wǒ shuō ${selectedLanguageCountry.language.pinyin}.</p>` : ""}
                  ${state.showEnglish ? `<p class="telephone-line-english">${selectedLanguageCountry.response.english} I speak ${selectedLanguageCountry.language.english}.</p>` : ""}
                </div>
              </article>`
            : ""
        }
        <div class="greetings-scene-layout">
          <div class="greetings-scene-visual">
            <img class="greetings-scene-image" src="${identityConversation.imagePath}" alt="${identityConversation.imageAlt}" />
          </div>
          <div class="greetings-line-stack">
            ${identityConversation.lines
              .map(
                (line) => `
                  <article class="greetings-line-card">
                    <div class="telephone-bubble-copy">
                      <p class="telephone-line-hanzi">${line.hanzi}</p>
                      ${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}
                      ${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
  `;

  focusExplorer.querySelector("[data-identity-play-language]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speakSceneLines(identityConversation.lines);
    }
  });
  focusExplorer.querySelector("[data-identity-play-question]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) {
      speak(identityQuestion.audio, 0.78);
    }
  });
  focusExplorer.querySelectorAll("[data-identity-country]").forEach((button) => {
    button.addEventListener("click", () => {
      const country = allIdentityCountries.find((entry) => entry.id === button.dataset.identityCountry);
      if (!country) {
        return;
      }
      state.identitySelectedCountryId = country.id;
      if (state.tapAudioEnabled) {
        speak(country.response.audio, 0.78);
      }
      renderIdentityExplorer();
    });
  });
  focusExplorer.querySelectorAll("[data-identity-practice-country]").forEach((button) => {
    button.addEventListener("click", () => {
      const country = identityCountries.find((entry) => entry.id === button.dataset.identityPracticeCountry);
      if (!country) return;
      if (country.id === practiceCountry.id) {
        state.identitySelectedCountryId = country.id;
        state.identityPracticeFeedback = `Correct! ${identityQuestion.hanzi} ${country.response.hanzi}`;
        if (state.tapAudioEnabled) speak(`${identityQuestion.audio} ${country.response.audio}`, 0.78);
      } else {
        state.identityPracticeFeedback = "Try again. Look carefully at the flag.";
        if (state.tapAudioEnabled) speak(country.nationality, 0.78);
      }
      renderIdentityExplorer();
    });
  });
  focusExplorer.querySelector("[data-identity-next-practice]")?.addEventListener("click", () => {
    const nextIds = state.identityPracticeRemainingIds?.length ? state.identityPracticeRemainingIds : shuffleArray(coreCountryIds);
    state.identityPracticeTargetId = nextIds.pop();
    state.identityPracticeRemainingIds = nextIds;
    state.identityPracticeFeedback = "";
    state.identitySelectedCountryId = "";
    renderIdentityExplorer();
  });
  focusExplorer.querySelectorAll("[data-identity-language-country]").forEach((button) => {
    button.addEventListener("click", () => {
      const country = identityCountries.find((entry) => entry.id === button.dataset.identityLanguageCountry);
      if (!country) return;
      state.identityLanguageSelectedCountryId = country.id;
      if (state.tapAudioEnabled) speak(`${country.nationality}说${country.language.hanzi}`, 0.78);
      renderIdentityExplorer();
    });
  });
}

function renderIdentityExplorer() {
  if (currentTopic().id === "languages") {
    renderLanguagesExplorer();
    return;
  }

  renderNationalityScene();
}

function renderNationalityScene() {
  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div>
            <p class="body-match-kicker">3A Lesson 5 · Nationality</p>
            <p class="greetings-exchange-prompt">Lele and Noah share family photos.</p>
          </div>
          <button class="small-button is-play-button" type="button" data-nationality-play-scene>Play</button>
        </div>
        <div class="greetings-scene-layout">
          <div class="greetings-scene-visual"><img class="greetings-scene-image" src="${nationalityConversation.imagePath}" alt="${nationalityConversation.imageAlt}" /></div>
          <div class="greetings-line-stack">${nationalityConversation.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div>
        </div>
      </section>
    </div>
  `;
  focusExplorer.querySelector("[data-nationality-play-scene]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) speakSceneLines(nationalityConversation.lines);
  });
}

function renderLegacyNationalityExplorer() {
  const practiceCountries = identityCountries;
  const flagCountries = [...identityCountries, ...identityExploreCountries];
  const practiceIds = practiceCountries.map((country) => country.id);
  const remainingIds = Array.isArray(state.identityPracticeRemainingIds)
    ? state.identityPracticeRemainingIds.filter((id) => practiceIds.includes(id))
    : [];
  if (!state.identityPracticeTargetId || !practiceIds.includes(state.identityPracticeTargetId)) {
    const nextIds = remainingIds.length ? remainingIds : shuffleArray(practiceIds);
    state.identityPracticeTargetId = nextIds.pop();
    state.identityPracticeRemainingIds = nextIds;
    state.identityPracticeFeedback = "";
  }
  const target = practiceCountries.find((country) => country.id === state.identityPracticeTargetId) ?? practiceCountries[0];
  const flagIds = flagCountries.map((country) => country.id);
  const remainingFlagIds = Array.isArray(state.identityFlagPracticeRemainingIds)
    ? state.identityFlagPracticeRemainingIds.filter((id) => flagIds.includes(id))
    : [];
  if (!state.identityFlagPracticeTargetId || !flagIds.includes(state.identityFlagPracticeTargetId)) {
    const nextIds = remainingFlagIds.length ? remainingFlagIds : shuffleArray(flagIds);
    state.identityFlagPracticeTargetId = nextIds.pop();
    state.identityFlagPracticeRemainingIds = nextIds;
    state.identityFlagPracticeFeedback = "";
  }
  const flagTarget = flagCountries.find((country) => country.id === state.identityFlagPracticeTargetId) ?? flagCountries[0];
  const selectedCountry = flagCountries.find((country) => country.id === state.identitySelectedCountryId);

  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div>
            <p class="body-match-kicker">3A Lesson 5 · Nationality</p>
            <p class="greetings-exchange-prompt">Lele and Noah share family photos.</p>
          </div>
          <button class="small-button is-play-button" type="button" data-nationality-play-scene>Play</button>
        </div>
        <div class="greetings-scene-layout">
          <div class="greetings-scene-visual">
            <img class="greetings-scene-image" src="${nationalityConversation.imagePath}" alt="${nationalityConversation.imageAlt}" />
          </div>
          <div class="greetings-line-stack">
            ${nationalityConversation.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}
          </div>
        </div>
      </section>
      <section class="identity-question-section">
        <div class="identity-question-top">
          <div>
            <p class="body-match-kicker">Practice</p>
            <p class="greetings-exchange-prompt">Look at the flag. Make the conversation.</p>
            <p class="telephone-line-hanzi">${identityQuestion.hanzi}</p>
            ${state.showPinyin ? `<p class="telephone-line-pinyin">${identityQuestion.pinyin}</p>` : ""}
            ${state.showEnglish ? `<p class="telephone-line-english">${identityQuestion.english}</p>` : ""}
          </div>
          <button class="small-button is-play-button" type="button" data-nationality-play-question>Play</button>
        </div>
        <div class="identity-practice-card">
          <div class="identity-practice-visual"><p>Play the whole conversation, then choose what the speaker says.</p></div>
          <div class="identity-practice-options" aria-label="Choose a nationality answer">${practiceCountries.map((country) => `<button class="choice-button" type="button" data-nationality-answer="${country.id}">${country.nationality}</button>`).join("")}</div>
          <p class="identity-practice-feedback" aria-live="polite">${state.identityPracticeFeedback || "Choose the reply that completes 我是…人。"}</p>
          ${state.identityPracticeFeedback.startsWith("Correct") ? '<button class="small-button is-new-game-button" type="button" data-nationality-next-round>New round</button>' : ""}
        </div>
      </section>
      <section class="identity-question-section">
        <div>
          <p class="body-match-kicker">Country flags</p>
          <p class="greetings-exchange-prompt">Look at the flag. Choose the country name.</p>
        </div>
        <div class="identity-practice-card">
          <div class="identity-practice-visual"><img class="identity-flag" src="${flagTarget.asset}" alt="${flagTarget.label} flag" /><p class="numbers-game-hanzi">?</p></div>
          <div class="identity-practice-options" aria-label="Choose a country name">${flagCountries.map((country) => `<button class="choice-button" type="button" data-flag-country-answer="${country.id}">${country.hanzi}</button>`).join("")}</div>
          <p class="identity-practice-feedback" aria-live="polite">${state.identityFlagPracticeFeedback || "Choose the country name for this flag."}</p>
          ${state.identityFlagPracticeFeedback.startsWith("Correct") ? '<button class="small-button is-new-game-button" type="button" data-flag-next-round>New round</button>' : ""}
        </div>
        ${selectedCountry ? `<article class="greetings-line-card identity-answer-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${selectedCountry.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${selectedCountry.hanzi === "中国" ? "Zhōngguó" : selectedCountry.pinyin.replace(" rén", "")}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${selectedCountry.label}</p>` : ""}</div><div class="identity-symbol-detail"><img src="${selectedCountry.symbolAsset}" alt="${selectedCountry.symbolCaption}" /><p>${selectedCountry.symbolCaption}</p></div></article>` : ""}
      </section>
    </div>
  `;

  focusExplorer.querySelector("[data-nationality-play-scene]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) speakSceneLines(nationalityConversation.lines);
  });
  focusExplorer.querySelector("[data-nationality-play-question]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) speakSceneLines([identityQuestion, target.response]);
  });
  focusExplorer.querySelectorAll("[data-nationality-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = practiceCountries.find((country) => country.id === button.dataset.nationalityAnswer);
      if (!answer) return;
      if (answer.id === target.id) {
        state.identityPracticeFeedback = `Correct! ${identityQuestion.hanzi} ${answer.response.hanzi}`;
        if (state.tapAudioEnabled) speak(`${identityQuestion.audio} ${answer.response.audio}`, 0.78);
      } else {
        state.identityPracticeFeedback = "Try again. Listen to the conversation once more.";
        if (state.tapAudioEnabled) speak(answer.nationality, 0.78);
      }
      renderNationalityExplorer();
    });
  });
  focusExplorer.querySelector("[data-nationality-next-round]")?.addEventListener("click", () => {
    const nextIds = state.identityPracticeRemainingIds?.length ? state.identityPracticeRemainingIds : shuffleArray(practiceIds);
    state.identityPracticeTargetId = nextIds.pop();
    state.identityPracticeRemainingIds = nextIds;
    state.identityPracticeFeedback = "";
    renderNationalityExplorer();
  });
  focusExplorer.querySelectorAll("[data-flag-country-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = flagCountries.find((country) => country.id === button.dataset.flagCountryAnswer);
      if (!answer) return;
      if (answer.id === flagTarget.id) {
        state.identitySelectedCountryId = answer.id;
        state.identityFlagPracticeFeedback = `Correct! ${answer.hanzi}`;
        if (state.tapAudioEnabled) speak(answer.hanzi, 0.78);
      } else {
        state.identityFlagPracticeFeedback = "Try again. Look carefully at the flag.";
        if (state.tapAudioEnabled) speak(answer.hanzi, 0.78);
      }
      renderNationalityExplorer();
    });
  });
  focusExplorer.querySelector("[data-flag-next-round]")?.addEventListener("click", () => {
    const nextIds = state.identityFlagPracticeRemainingIds?.length ? state.identityFlagPracticeRemainingIds : shuffleArray(flagIds);
    state.identityFlagPracticeTargetId = nextIds.pop();
    state.identityFlagPracticeRemainingIds = nextIds;
    state.identityFlagPracticeFeedback = "";
    state.identitySelectedCountryId = "";
    renderNationalityExplorer();
  });
}

function renderLanguagesExplorer() {
  renderLanguagesScene();
}

function renderLanguagesScene() {
  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div><p class="body-match-kicker">4A Lesson 2 · Languages</p><p class="greetings-exchange-prompt">Two classmates talk about the languages they speak.</p></div>
          <button class="small-button is-play-button" type="button" data-languages-play-scene>Play</button>
        </div>
        <div class="greetings-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${identityConversation.imagePath}" alt="${identityConversation.imageAlt}" /></div><div class="greetings-line-stack">${identityConversation.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div>
      </section>
    </div>
  `;
  focusExplorer.querySelector("[data-languages-play-scene]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) speakSceneLines(identityConversation.lines);
  });
}

function renderLegacyLanguagesExplorer() {
  const selectedCountry = identityCountries.find((country) => country.id === state.identityLanguageSelectedCountryId);
  focusExplorer.innerHTML = `
    <div class="numbers-board identity-board">
      <section class="greetings-exchange">
        <div class="greetings-exchange-top">
          <div><p class="body-match-kicker">4A Lesson 2 · Languages</p><p class="greetings-exchange-prompt">Two classmates talk about the languages they speak.</p></div>
          <button class="small-button is-play-button" type="button" data-languages-play-scene>Play</button>
        </div>
        <div class="greetings-scene-layout"><div class="greetings-scene-visual"><img class="greetings-scene-image" src="${identityConversation.imagePath}" alt="${identityConversation.imageAlt}" /></div><div class="greetings-line-stack">${identityConversation.lines.map((line) => `<article class="greetings-line-card"><div class="telephone-bubble-copy"><p class="telephone-line-hanzi">${line.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${line.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${line.english}</p>` : ""}</div></article>`).join("")}</div></div>
      </section>
      <section class="identity-question-section identity-language-section">
        <div><p class="body-match-kicker">Practice</p><p class="greetings-exchange-prompt">Say one sentence for each picture.</p><p class="telephone-line-hanzi">${identityLanguageQuestion.hanzi}</p>${state.showPinyin ? `<p class="telephone-line-pinyin">${identityLanguageQuestion.pinyin}</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${identityLanguageQuestion.english}</p>` : ""}</div>
        <div class="identity-language-grid">${identityCountries.map((country) => `<button class="identity-language-card${selectedCountry?.id === country.id ? " is-selected" : ""}" type="button" data-languages-country="${country.id}"><img class="identity-flag" src="${country.asset}" alt="${country.label} flag" /><span class="numbers-game-hanzi">${country.nationality}说${country.language.hanzi}。</span>${state.showPinyin ? `<span class="numbers-game-pinyin">${country.pinyin} shuō ${country.language.pinyin}.</span>` : ""}${state.showEnglish ? `<span class="numbers-game-english">${country.nationality} people speak ${country.language.english}.</span>` : ""}</button>`).join("")}</div>
        ${selectedCountry ? `<article class="greetings-line-card identity-answer-card"><div class="telephone-bubble-copy"><p class="body-match-kicker">Make your own sentence</p><p class="telephone-line-hanzi">我是${selectedCountry.nationality}。我说${selectedCountry.language.hanzi}。</p>${state.showPinyin ? `<p class="telephone-line-pinyin">wǒ shì ${selectedCountry.pinyin}. wǒ shuō ${selectedCountry.language.pinyin}.</p>` : ""}${state.showEnglish ? `<p class="telephone-line-english">${selectedCountry.response.english} I speak ${selectedCountry.language.english}.</p>` : ""}</div></article>` : ""}
      </section>
    </div>
  `;
  focusExplorer.querySelector("[data-languages-play-scene]")?.addEventListener("click", () => {
    if (state.tapAudioEnabled) speakSceneLines(identityConversation.lines);
  });
  focusExplorer.querySelectorAll("[data-languages-country]").forEach((button) => {
    button.addEventListener("click", () => {
      const country = identityCountries.find((entry) => entry.id === button.dataset.languagesCountry);
      if (!country) return;
      state.identityLanguageSelectedCountryId = country.id;
      if (state.tapAudioEnabled) speak(`${country.nationality}说${country.language.hanzi}`, 0.78);
      renderLanguagesExplorer();
    });
  });
}

let multiplicationPlaybackToken = 0;
let multiplicationPlaybackPaused = false;
let multiplicationPlaybackContainer = null;

function renderMultiplicationExplorer() {
  const items = focusItemsForTopic();
  const activeItem = currentFocusItem();
  const itemByPair = new Map(items.map((item) => [`${item.first}-${item.second}`, item]));

  focusExplorer.innerHTML = `
    <div class="multiplication-board">
      <div class="numbers-stage-card">
        <div class="numbers-game-top">
          <div>
            <p class="body-match-kicker">Chinese math rhythm</p>
            <h4>九九乘法口诀</h4>
            <p>Tap a cell in the matrix. First see the multiplication fact, then hear and read the Chinese rhyme line.</p>
          </div>
          <div class="multiplication-playback-controls">
            <button class="small-button is-play-button" type="button" data-multiplication-play-all>Play</button>
            <button class="small-button is-playback-control-button is-pause-button" type="button" data-multiplication-pause aria-label="Pause multiplication rhyme" disabled>Pause</button>
            <button class="small-button is-playback-control-button is-stop-button" type="button" data-multiplication-stop aria-label="Stop multiplication rhyme" disabled>Stop</button>
          </div>
        </div>
      </div>
      <div class="multiplication-matrix-card">
        <div class="multiplication-matrix">
          <div class="multiplication-corner"></div>
          ${Array.from({ length: 9 }, (_, index) => index + 1).map((value) => `<div class="multiplication-header">${value}</div>`).join("")}
          ${Array.from({ length: 9 }, (_, rowIndex) => rowIndex + 1).map((rowValue) => {
            const rowHeader = `<div class="multiplication-header">${rowValue}</div>`;
            const cells = Array.from({ length: 9 }, (_, colIndex) => colIndex + 1).map((colValue) => {
              if (colValue < rowValue) return '<div class="multiplication-cell multiplication-cell-empty"></div>';
              const item = itemByPair.get(`${rowValue}-${colValue}`);
              const isActive = item?.id === activeItem.id;
              return `<button class="multiplication-cell${isActive ? " is-active" : ""}" type="button" data-multiplication-item="${item?.id ?? ""}"><span class="multiplication-cell-fact">${rowValue}×${colValue}</span><span class="multiplication-cell-product">=${item?.product ?? ""}</span></button>`;
            }).join("");
            return rowHeader + cells;
          }).join("")}
        </div>
      </div>
      <div class="multiplication-detail-card">
        <div class="numbers-game-top">
          <p class="body-match-kicker">Selected line</p>
          <button class="small-button is-play-button" type="button" data-multiplication-item="${activeItem.id}">Play</button>
        </div>
        <p class="multiplication-line-hanzi">${activeItem.hanzi}</p>
        ${state.showPinyin ? `<p class="multiplication-line-pinyin">${activeItem.pinyin}</p>` : ""}
        ${state.showEnglish ? `<p class="multiplication-line-english">${activeItem.english}</p>` : ""}
      </div>
    </div>
  `;

  focusExplorer.querySelectorAll("[data-multiplication-item]").forEach((button) => {
    button.addEventListener("click", () => {
      stopMultiplicationRhyme();
      selectFocusItem(button.dataset.multiplicationItem, { playAudio: true });
    });
  });
  focusExplorer.querySelector("[data-multiplication-play-all]")?.addEventListener("click", () => playMultiplicationRhyme(items, focusExplorer));
  focusExplorer.querySelector("[data-multiplication-pause]")?.addEventListener("click", toggleMultiplicationPause);
  focusExplorer.querySelector("[data-multiplication-stop]")?.addEventListener("click", stopMultiplicationRhyme);
}

function playMultiplicationRhyme(items, container) {
  if (!state.tapAudioEnabled || !("speechSynthesis" in window)) return;

  stopMultiplicationRhyme();
  multiplicationPlaybackToken += 1;
  const playbackToken = multiplicationPlaybackToken;
  let index = 0;
  multiplicationPlaybackPaused = false;
  multiplicationPlaybackContainer = container;
  updateMultiplicationPlaybackControls(container);

  const playNext = () => {
    if (playbackToken !== multiplicationPlaybackToken || index >= items.length) {
      finishMultiplicationRhyme(container, playbackToken);
      return;
    }
    const item = items[index];
    index += 1;
    container.querySelectorAll(".multiplication-cell").forEach((cell) => {
      cell.classList.toggle("is-playing", cell.dataset.multiplicationItem === item.id);
    });
    const utterance = chineseUtterance(item.audio, 0.72);
    utterance.onend = () => window.setTimeout(playNext, 140);
    window.speechSynthesis.speak(utterance);
  };

  playNext();
}

function toggleMultiplicationPause() {
  if (!multiplicationPlaybackContainer || !("speechSynthesis" in window)) return;
  multiplicationPlaybackPaused = !multiplicationPlaybackPaused;
  if (multiplicationPlaybackPaused) window.speechSynthesis.pause();
  else window.speechSynthesis.resume();
  updateMultiplicationPlaybackControls(multiplicationPlaybackContainer);
}

function stopMultiplicationRhyme() {
  multiplicationPlaybackToken += 1;
  multiplicationPlaybackPaused = false;
  window.speechSynthesis?.cancel();
  const container = multiplicationPlaybackContainer;
  multiplicationPlaybackContainer = null;
  if (!container) return;
  container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => cell.classList.remove("is-playing"));
  updateMultiplicationPlaybackControls(container);
}

function finishMultiplicationRhyme(container, playbackToken) {
  if (playbackToken !== multiplicationPlaybackToken) return;
  container.querySelectorAll(".multiplication-cell.is-playing").forEach((cell) => cell.classList.remove("is-playing"));
  multiplicationPlaybackPaused = false;
  multiplicationPlaybackContainer = null;
  updateMultiplicationPlaybackControls(container);
}

function updateMultiplicationPlaybackControls(container) {
  const isPlaying = multiplicationPlaybackContainer === container;
  const pauseButton = container.querySelector("[data-multiplication-pause]");
  const stopButton = container.querySelector("[data-multiplication-stop]");
  if (pauseButton) {
    pauseButton.disabled = !isPlaying;
    pauseButton.textContent = multiplicationPlaybackPaused ? "Resume" : "Pause";
    pauseButton.classList.toggle("is-resume-button", multiplicationPlaybackPaused);
    pauseButton.classList.toggle("is-pause-button", !multiplicationPlaybackPaused);
    pauseButton.setAttribute("aria-label", multiplicationPlaybackPaused ? "Resume multiplication rhyme" : "Pause multiplication rhyme");
  }
  if (stopButton) stopButton.disabled = !isPlaying;
}


  return { numberStageItems, resetNumberChallenge, ensureNumberChallenge, resetMathChallenge, ensureMathChallenge, familyGameItems, familyPersonForItemId, familyHeadshotForItemId, isFamilySentenceItemId, familyBookWordItems, usesLessonTemplate, bookWordItemsForTopic, usefulNoteForTopic, familyWordForPersonId, resetFamilyChallenge, ensureFamilyChallenge, resetListenChallengeResult, handleFamilyChallengePlay, handleFamilyChallengeGuess, resetFamilyMatchGame, ensureFamilyMatchGame, handleFamilyMatchPhrase, handleFamilyMatchAttempt, mathChallengeAudioText, handleMathChallengeSubmit, handleNumberChallengeGuess, bodyMatchItems, nextBodyRound, resetBodyMatchGame, ensureBodyMatchGame, handleBodyMatchChinese, handleBodyMatchAttempt, nextBodySpotlightRound, startBodySpotlightRound, handleBodySpotlightGuess, renderBodyPractice, numberWordListItems, renderBodyLabelButton, renderBodyExplorer, renderNumberVisual, renderNumbersExplorer, renderTelephoneExplorer, renderFamilyHomeVisual, renderFamilyExplorer, renderIdentityExplorer, renderMultiplicationExplorer };
}
import { nextRandomCycleId } from "../../core/random-cycle.js";
