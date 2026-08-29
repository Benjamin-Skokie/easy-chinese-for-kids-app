import assert from "node:assert/strict";
import test from "node:test";
import { buildLearnAudioRequest, spokenInputFor } from "../scripts/audio/learn-audio-prompt.mjs";

test("learn-audio instructions define pause, onset, ending, and erhua behavior", () => {
  const { instructions } = buildLearnAudioRequest({
    text: "我喜欢画画儿。",
    pinyin: "wǒ xǐ huan huà huàr."
  });

  assert.match(instructions, /Never insert a pause between the characters or syllables of one word/);
  assert.match(instructions, /very short pause at a comma/);
  assert.match(instructions, /complete first consonant and vowel/);
  assert.match(instructions, /click, pop, crackle/);
  assert.match(instructions, /trailing breath, hesitation/);
  assert.match(instructions, /very brief, light rhotic coloring fused to the preceding syllable/);
  assert.match(instructions, /lexical 儿, such as the first syllable of 儿子/);
});

test("erhua spellings use a base-form input plus an explicit intended reading", () => {
  const examples = [
    ["我喜欢画画儿。", "我喜欢画画。", /huà huàr/],
    ["我每天玩儿游戏。", "我每天玩游戏。", /wánr yóu xì/],
    ["美美在海边玩儿沙子。", "美美在海边玩沙子。", /wánr shā zi/],
    ["她喜欢看动画片儿。", "她喜欢看动画片。", /dòng huà piānr/]
  ];

  for (const [text, expectedInput, expectedGuidance] of examples) {
    const request = buildLearnAudioRequest({ text, pinyin: "test reading" });
    assert.equal(request.input, expectedInput);
    assert.match(request.instructions, expectedGuidance);
    assert.match(request.instructions, /no separate ér|Never pronounce that suffix as a separate/);
  }
});

test("a lexical 儿 is not removed from the speech input", () => {
  assert.equal(spokenInputFor("这是我的儿子。"), "这是我的儿子。");
});

test("clip-specific pronunciation guidance is retained", () => {
  const family = buildLearnAudioRequest({ text: "爸爸妈妈爱我。", pinyin: "bà ba mā ma ài wǒ." });
  const weekday = buildLearnAudioRequest({ text: "星期一", pinyin: "xīng qī yī" });

  assert.match(family.instructions, /Say 爸爸 as two clean, fully voiced syllables/);
  assert.match(weekday.instructions, /Say xīng and qī as two crisp, confident syllables/);
});
