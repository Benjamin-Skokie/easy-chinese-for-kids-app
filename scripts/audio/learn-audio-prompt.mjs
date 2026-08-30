const baseInstructions = [
  "Record one clean, standalone Standard Mandarin learning clip for young children.",
  "Use a clear, warm adult female teacher voice at a natural, slightly slow pace, with stable volume and no exaggerated performance.",
  "Say the intended Mandarin utterance exactly once and say nothing else. Preserve every lexical tone and neutral tone.",
  "Prosody: keep each word and short phrase connected. Never insert a pause between the characters or syllables of one word. Pause only where Chinese punctuation or a natural clause boundary requires it: use a very short pause at a comma and a clean stop at sentence-final punctuation. Do not add dramatic, rhythmic, or hesitant pauses.",
  "Onset: begin promptly, but preserve the complete first consonant and vowel at normal volume. Do not add a lead-in breath, mouth noise, click, pop, crackle, fade-in, or clipped first syllable.",
  "Ending: stop cleanly immediately after the final syllable. Do not add a trailing breath, hesitation, filler, vocalization, echo, fade-out, or extra silence.",
  "Erhua: when 儿 is an erhua suffix and the intended pinyin marks an -r ending, realize it only as a very brief, light rhotic coloring fused to the preceding syllable. Never pronounce that suffix as a separate or stressed ér, and never pause before or after it. A lexical 儿, such as the first syllable of 儿子, is still pronounced normally."
].join(" ");

const pronunciationGuidance = new Map([
  ["爸爸妈妈爱我", "Say 爸爸 as two clean, fully voiced syllables: bà ba. Keep the first syllable crisp with no crackle, clipping, or break."],
  ["爸爸妈妈爱我。", "Say 爸爸 as two clean, fully voiced syllables: bà ba. Keep the first syllable crisp with no crackle, clipping, or break."],
  ["我们是哥哥弟弟姐姐和妹妹", "Say every family word smoothly and clearly: gē ge, dì di, jiě jie, hé mèi mei. Keep every syllable fully voiced, with no crackle, clipped consonant, or broken sound."],
  ["我们是哥哥、弟弟、姐姐和妹妹。", "Say every family word smoothly and clearly: gē ge, dì di, jiě jie, hé mèi mei. Keep every syllable fully voiced, with no crackle, clipped consonant, or broken sound."],
  ["书桌", "Say shū zhuō clearly and deliberately as two full syllables. Do not rush, clip, or omit either syllable."],
  ["T恤", "Say T恤 as tī xù, like the Chinese name for a T-shirt. Keep tī and xù clear and connected; do not spell the letter as English T or pause between the two syllables."],
  ["九月，开学了。", "Say jiǔ yuè clearly and at normal strength. Keep jiǔ yuè connected, then make only a brief natural comma pause before kāi xué le."],
  ["一年有十二个月", "Say yī nián yǒu shí èr ge yuè clearly and smoothly, with every word fully voiced and no unnecessary pauses."],
  ["多少", "Say duō shao clearly as one connected two-syllable question word. Keep the neutral-tone shao fully audible."],
  ["地铁站", "Say dì tiě zhàn as three clean, steady syllables with no vibrato, warble, or stretched final syllable."],
  ["西兰花", "Say xī lán huā clearly as three distinct, connected syllables at an even pace."],
  ["披萨", "Say pī sà with a clean, fully voiced pī onset and no click, pop, or clipped consonant."],
  ["我午饭喝了牛奶，吃了披萨。", "Say wǒ wǔ fàn as a connected phrase with a clear wǔ. Keep the sentence flowing naturally, with only a brief comma pause before chī le pī sà."],
  ["诺亚穿外套，戴帽子、围巾和手套。", "Say Nuò yà chuān wài tào as one smooth phrase. Use brief, natural list rhythm for mào zi, wéi jīn, hé shǒu tào, with no stretched gaps."],
  ["诺亚穿外套戴帽子围巾和手套", "Say Nuò yà chuān wài tào as one smooth phrase. Use brief, natural list rhythm for mào zi, wéi jīn, hé shǒu tào, with no stretched gaps."],
  ["玩具火车", "Say wán jù huǒ chē clearly and evenly, with a stable adult female teacher voice."],
  ["玩具熊", "Say wán jù xióng clearly and evenly, with the same warm adult female teacher voice used for the other toy words."],
  ["我叫苏菲", "Say wǒ jiào Sū fēi as one smooth short sentence. Do not pause between jiào and Sū fēi."],
  ["我叫安安", "Say wǒ jiào Ān an as one smooth short sentence, with no pauses within the name."],
  ["我可以看电视吗", "Keep 可以看 as one connected phrase with no artificial pause between 可以 and 看."],
  ["我可以看电视吗？", "Keep 可以看 as one connected phrase with no artificial pause between 可以 and 看."]
]);

const erhuaRewrites = [
  {
    written: "画画儿",
    spoken: "画画",
    guidance: "For 画画儿, say huà huàr: attach a very light -r coloring to the second huà, with no separate ér syllable."
  },
  {
    written: "玩儿电脑游戏",
    spoken: "玩电脑游戏",
    guidance: "For 玩儿电脑游戏, say wánr diàn nǎo yóu xì: make wánr one compact syllable and flow directly into diàn, with no gap."
  },
  {
    written: "玩儿游戏",
    spoken: "玩游戏",
    guidance: "For 玩儿游戏, use the spoken form wán yóu xì. Do not add a separate ér syllable or an artificial pause."
  },
  {
    written: "玩儿沙子",
    spoken: "玩沙子",
    guidance: "For 玩儿沙子, use the spoken form wán shā zi. Do not add a separate ér syllable or an artificial pause."
  },
  {
    written: "动画片儿",
    spoken: "动画片",
    guidance: "For 动画片儿, say dòng huà piānr: make piānr one compact syllable, with no separate ér and no gap after piān."
  }
];

export function spokenInputFor(text) {
  return erhuaRewrites.reduce(
    (input, rule) => input.replaceAll(rule.written, rule.spoken),
    text
  );
}

export function buildLearnAudioRequest(entry) {
  const reading = entry.pinyin
    ? ` The intended Mandarin reading is “${entry.pinyin}”; use it to disambiguate pronunciation and phrasing.`
    : "";
  const weekdayGuidance = /^星期[一二三四五六天]$/.test(entry.text)
    ? " Say xīng and qī as two crisp, confident syllables; do not blur them together."
    : "";
  const erhuaGuidance = erhuaRewrites
    .filter((rule) => entry.text.includes(rule.written))
    .map((rule) => ` ${rule.guidance}`)
    .join("");
  const clipGuidance = pronunciationGuidance.has(entry.text)
    ? ` ${pronunciationGuidance.get(entry.text)}`
    : "";

  return {
    input: spokenInputFor(entry.text),
    instructions: `${baseInstructions}${reading}${weekdayGuidance}${erhuaGuidance}${clipGuidance}`
  };
}
