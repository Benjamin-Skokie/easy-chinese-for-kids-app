(() => {
  const storageKey = "easyChineseCultureReadingLevel";
  const levels = new Set(["early", "story", "advanced"]);
  const storyTitles = {
    "philosophy/confucius": {
      early: ["孔子的大问题：如果是你呢？", "Confucius's Big Question: What If It Were You?"],
      story: ["孔子的一句话：先想想别人", "Confucius's One-Life Question"],
      advanced: ["孔子的一句话：先把自己放到别人心里", "Confucius’s Big Question: How Would It Feel to Be Them?"]
    },
    "philosophy/laozi": {
      early: ["像水一样找到路", "Find a Way Like Water"],
      story: ["老子与水的智慧", "Laozi and the Wisdom of Water"],
      advanced: ["老子的智慧：水为什么不争？", "Laozi’s Wisdom: Why Doesn’t Water Compete?"]
    },
    "philosophy/seed-dao": {
      early: ["等一颗种子发芽", "Waiting for a Seed to Grow"],
      story: ["一颗种子教我们慢慢来", "What a Seed Can Teach Us About Time"],
      advanced: ["一颗种子的耐心：照料，而不强迫", "The Patience of a Seed: Care Without Forcing"]
    },
    "philosophy/yin-yang": {
      early: ["阴和阳：同一座山的两边", "Yin and Yang: Two Sides of One Mountain"],
      story: ["阴和阳：看见关系与变化", "Yin and Yang: Seeing Connection and Change"],
      advanced: ["阴和阳：一座山为什么有两种温度？", "Yin and Yang: How Can One Mountain Have Two Temperatures?"]
    },
    "politics/emperor-day": {
      early: ["朱元璋为什么成了一个特别忙的皇帝？", "Why Did Zhu Yuanzhang Become Such a Busy Emperor?"],
      story: ["朱元璋为什么成了一个特别忙的皇帝？", "Why Did Zhu Yuanzhang Become Such a Busy Emperor?"],
      advanced: ["朱元璋为什么成了一个特别忙的皇帝？", "Why Did Zhu Yuanzhang Become Such a Busy Emperor?"]
    },
    "politics/exam-content": {
      early: ["古代考试都考什么？", "What Was on an Ancient Exam?"],
      story: ["科举试卷为什么一直在变？", "Why Did Imperial Exam Questions Keep Changing?"],
      advanced: ["科举到底考什么？一张考卷的千年变化", "What Did the Imperial Exams Test? A Thousand Years of Changing Questions"]
    },
    "politics/imperial-exam-history": {
      early: ["谁能走进当官的大门？", "Who Could Walk Through the Government Door?"],
      story: ["从家世到考卷：古代怎样选官？", "From Family Names to Exam Papers"],
      advanced: ["一张考卷能打开多大的门？——中国古代怎样选官", "How Far Could an Exam Open the Door? Choosing Officials in Imperial China"]
    },
    "politics/six-arts": {
      early: ["古代的六种本领", "Six Skills from Long Ago"],
      story: ["六艺：古书里的完整教育", "The Six Arts: An Ancient Idea of a Complete Education"],
      advanced: ["六艺：古代学生真的一天学六门课吗？", "The Six Arts: Did Ancient Students Really Study All Six in One Day?"]
    },
    "politics/yu-the-great": {
      early: ["大禹怎样给洪水找路？", "How Did Yu Make a Path for the Water?"],
      story: ["大禹治水：传说与证据", "Yu the Great: Legend and Evidence"],
      advanced: ["大禹治水：洪水、英雄与王朝的记忆", "Yu the Great: A Flood, a Hero, and the Memory of a Dynasty"]
    },
    "military/ancient-armor": {
      early: ["古代铠甲是怎样拼起来的？", "How Was Ancient Armor Put Together?"],
      story: ["一片甲能告诉我们什么？", "What Can One Armor Plate Tell Us?"],
      advanced: ["一片甲，许多答案：中国古代铠甲怎样保护身体", "One Armor Plate, Many Answers: Body Armor in Ancient China"]
    },
    "military/art-of-war": {
      early: ["《孙子兵法》：行动以前先看看", "The Art of War: Look Before You Move"],
      story: ["《孙子兵法》：先看清，再行动", "The Art of War: See Clearly Before You Act"],
      advanced: ["《孙子兵法》：行动之前，先看清局面", "The Art of War: Look Before You Move"]
    },
    "military/great-wall": {
      early: ["长城不只是一堵墙", "The Great Wall Is More Than One Wall"],
      story: ["长城：许多时代，许多边疆", "The Great Wall: Many Times, Many Frontiers"],
      advanced: ["长城不是一堵墙：读懂两千年的边疆", "The Great Wall Is Not One Wall: Reading Two Thousand Years of Frontier History"]
    },
    "figures/mulan": {
      early: ["木兰的勇敢旅程", "Mulan's Brave Journey"],
      story: ["木兰：替父出征的女儿", "Mulan: The Daughter Who Rode to War"],
      advanced: ["木兰：一首诗怎样长成一千年的传奇？", "Mulan: How a Poem Became a Thousand-Year Legend"]
    }
  };

  const buttons = [...document.querySelectorAll("[data-culture-reading-level]")];
  if (!buttons.length) return;

  const storyKeyFromLink = (link) => {
    const match = new URL(link.href, window.location.href).pathname.match(/\/culture\/books\/([^/]+\/[^/]+)\/index\.html$/);
    return match?.[1] || "";
  };

  const storyLinks = [...document.querySelectorAll('a[href*="culture/books/"]')]
    .filter((link) => !link.matches(".story-highlight-slide"))
    .map((link) => ({ link, key: storyKeyFromLink(link) }))
    .filter(({ key }) => storyTitles[key]);

  const updateStoryLink = ({ link, key }, level) => {
    const url = new URL(link.href, window.location.href);
    url.searchParams.set("reading", level);
    link.href = url.href;

    if (!link.closest(".topic.done")) return;
    const [titleZh, titleEn] = storyTitles[key][level];
    const zh = link.querySelector(":scope > .zh");
    const en = link.querySelector(":scope > .en");
    if (zh) zh.textContent = titleZh;
    if (en) en.textContent = titleEn;
  };

  const setLevel = (level, save = false) => {
    const nextLevel = levels.has(level) ? level : "story";
    document.documentElement.dataset.cultureReadingLevel = nextLevel;
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.cultureReadingLevel === nextLevel));
    }
    for (const storyLink of storyLinks) updateStoryLink(storyLink, nextLevel);
    if (save) {
      try {
        window.localStorage.setItem(storageKey, nextLevel);
      } catch {}
    }
  };

  let savedLevel = "";
  try {
    savedLevel = window.localStorage.getItem(storageKey) || "";
  } catch {}

  for (const button of buttons) {
    button.addEventListener("click", () => setLevel(button.dataset.cultureReadingLevel, true));
  }

  setLevel(savedLevel);
})();
