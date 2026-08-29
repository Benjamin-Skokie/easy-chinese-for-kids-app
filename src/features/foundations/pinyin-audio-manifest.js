import { pinyinUnits } from "./pinyin-course.js";

export const pinyinAudioBase = "assets/audio/pinyin";
export const pinyinAudioVersion = "20260828-28";

const reviewedBasicsClips = [
  { id: "final-a1", text: "ā", pinyin: "ā", ttsInput: "ā", kind: "single-final", context: "the first-tone a sound in 啊; hold the vowel naturally" },
  { id: "final-o1", text: "ō", pinyin: "ō", kind: "single-final" },
  { id: "final-e1", text: "ē", pinyin: "ē", kind: "single-final" },
  { id: "final-i1", text: "ī", pinyin: "ī", kind: "single-final" },
  { id: "final-u1", text: "ū", pinyin: "ū", ttsInput: "ū", kind: "single-final", context: "the first-tone u sound in 屋 (wū); pronounce it unhurriedly" },
  { id: "final-v1", text: "ǖ", pinyin: "ǖ", kind: "single-final" },
  { id: "ma1-mum", text: "妈", pinyin: "mā", kind: "word" },
  { id: "ma2-hemp", text: "麻", pinyin: "má", kind: "word", context: "the second-tone 麻 in 麻药 (máyào)" },
  { id: "ma3-horse", text: "马", pinyin: "mǎ", kind: "word" },
  { id: "ma4-scold", text: "骂", pinyin: "mà", ttsInput: "mà", kind: "word", context: "the fourth-tone 骂; use a clean, decisive falling tone" },
  { id: "ba4-dad", text: "爸", pinyin: "bà", kind: "word" },
  { id: "da4-big", text: "大", pinyin: "dà", kind: "word" },
  { id: "wo3-me", text: "我", pinyin: "wǒ", kind: "word" },
  { id: "mo1-touch", text: "摸", pinyin: "mō", ttsInput: "mō", kind: "word", context: "the first-tone 摸 in 摸一摸 (mō yi mō)" },
  { id: "bo1-wave", text: "波", pinyin: "bō", kind: "word" },
  { id: "ge1-brother", text: "哥", pinyin: "gē", kind: "word" },
  { id: "de2-get", text: "得", pinyin: "dé", ttsInput: "得", kind: "word", context: "得 pronounced dé with a clear rising second tone" },
  { id: "he2-and", text: "和", pinyin: "hé", kind: "word" },
  { id: "ni3-you", text: "你", pinyin: "nǐ", kind: "word" },
  { id: "mi3-rice", text: "米", pinyin: "mǐ", kind: "word" },
  { id: "di4-younger-brother", text: "弟", pinyin: "dì", ttsInput: "dì", kind: "word", context: "the fourth-tone 弟 in 弟弟 (dìdi)" },
  { id: "shu1-book", text: "书", pinyin: "shū", kind: "word" },
  { id: "tu3-earth", text: "土", pinyin: "tǔ", kind: "word" },
  { id: "lu4-road", text: "路", pinyin: "lù", kind: "word" },
  { id: "nv3-woman", text: "女", pinyin: "nǚ", kind: "word" },
  { id: "yu3-rain", text: "雨", pinyin: "yǔ", kind: "word", context: "the third-tone 雨 in 下雨 (xiàyǔ)" },
  { id: "yu2-fish", text: "鱼", pinyin: "yú", kind: "word" },
  { id: "shi2-ten", text: "十", pinyin: "shí", kind: "word" },
  { id: "si4-four", text: "四", pinyin: "sì", ttsInput: "饲", kind: "word", context: "the fourth-tone sound sì, as in 饲养" },
  { id: "niu2-cow", text: "牛", pinyin: "niú", kind: "word" }
];

// These are teaching call-sounds, not the ordinary dictionary readings of the
// Chinese helper characters. Keep the first-tone syllables explicit so TTS
// never substitutes English letter names or lexical tones such as fó / rì.
const initialCallSounds = [
  ["b", "bō", "波"], ["p", "pō", "坡"], ["m", "mō", "摸"], ["f", "fō", "佛"],
  ["d", "dē", "德"], ["t", "tē", "特"], ["n", "nē", "呢"], ["l", "lē", "勒"],
  ["g", "gē", "哥"], ["k", "kē", "科"], ["h", "hē", "喝"],
  ["j", "jī", "机"], ["q", "qī", "七"], ["x", "xī", "西"],
  ["zh", "zhī", "知"], ["ch", "chī", "吃"], ["sh", "shī", "诗"], ["r", "rī", "日"],
  ["z", "zī", "资"], ["c", "cī", "呲"], ["s", "sī", "斯"], ["y", "yī", "一"], ["w", "wū", "乌"]
];

// Picture-anchor words used in early-primary Pinyin charts.  They give the
// speech model phonetic context, while the recording itself says only the
// compound final (with a steady first-tone teaching contour).
const compoundFinalAnchors = [
  // The first value after the target is the exact first-tone generation input.
  // The final value is the child-facing picture mnemonic from the reference chart.
  ["ai", "āi", "哀", "爱"], ["ei", "ēi", "ēi", "诶"], ["ui", "uī", "威", "围"],
  ["ao", "āo", "āo", "袄", "Keep the pitch high and level from start to finish; it must not rise like a second tone."],
  ["ou", "ōu", "ōu", "欧", "Use a smooth, stable first tone with no wavering or vocal tremble; pronounce only one syllable, ōu."],
  ["iu", "iū", "优", "优"],
  ["ie", "iē", "耶", "耶"], ["üe", "üē", "约", "约"], ["er", "ēr", "ēr", "耳"]
];

const nasalFinalAnchors = [
  ["an", "ān", "安"], ["en", "ēn", "恩"], ["in", "īn", "因"],
  ["un", "ūn", "温"], ["ün", "ǖn", "ǖn"],
  ["ang", "āng", "肮"], ["eng", "ēng", "ēng"], ["ing", "īng", "鹰"], ["ong", "ōng", "ōng"]
];

const readingSyllableAnchors = [
  ["whole-zhchshr", "zhi", "zhī", "知", 13],
  ["whole-zhchshr", "chi", "chī", "chī", 13, "Use a firm, clean initial consonant and a steady tone; no wavering or vocal tremble."],
  ["whole-zhchshr", "shi", "shī", "shī", 13, "Say only one clear, audible syllable with a steady first tone."],
  ["whole-zhchshr", "ri", "rī", "rī", 13],
  ["whole-zcs", "zi", "zī", "资", 14], ["whole-zcs", "ci", "cī", "cī", 14], ["whole-zcs", "si", "sī", "丝", 14],
  ["whole-yiwu", "yi", "yī", "一", 15], ["whole-yiwu", "wu", "wū", "屋", 15], ["whole-yiwu", "yu", "yū", "迂", 15], ["whole-yiwu", "ye", "yē", "耶", 15],
  ["whole-yueyuan", "yue", "yuē", "约", 16], ["whole-yueyuan", "yuan", "yuān", "冤", 16], ["whole-yueyuan", "yin", "yīn", "音", 16], ["whole-yueyuan", "yun", "yūn", "yūn", 16], ["whole-yueyuan", "ying", "yīng", "英", 16],
  ["blending-tones", "b + a → ba", "bā", "八", 17], ["blending-tones", "g + u + a → gua", "guā", "瓜", 17], ["blending-tones", "x + i + ao → xiao", "xiāo", "消", 17]
];

const wordPronunciationOverrides = new Map([
  ["妹\u0000mèi", { ttsInput: "姐妹", context: "the single syllable 妹 mèi, as in 姐妹" }],
  ["会\u0000huì", { ttsInput: "会", context: "the single syllable 会 huì, as in 开会; say only huì" }],
  ["别\u0000bié", { ttsInput: "别", context: "the single syllable 别 bié, as in 永别; say only bié" }],
  ["今\u0000jīn", { ttsInput: "今", context: "the single syllable 今 jīn, as in 今天; say only jīn" }],
  ["问\u0000wèn", { ttsInput: "问", context: "the single syllable 问 wèn; say only wèn, not the word 提问" }],
  ["上\u0000shàng", { ttsInput: "上", context: "the single syllable 上 shàng, as in 上海; say only shàng" }],
  ["东\u0000dōng", { ttsInput: "东", context: "the single syllable 东 dōng, as in 东北; say only dōng" }],
  ["子\u0000zǐ", { ttsInput: "子", context: "the single syllable 子 zǐ, as in 子女; say only zǐ" }],
  ["椅\u0000yǐ", { ttsInput: "椅", context: "the single syllable 椅 yǐ, as in 椅子; say only yǐ" }],
  ["意\u0000yì", { ttsInput: "意", context: "the single syllable 意 yì, as in 情意; say only yì" }],
  ["月\u0000yuè", { ttsInput: "月", context: "the single syllable 月 yuè, as in 月亮; say only yuè with a clear fourth tone" }],
  ["远\u0000yuǎn", { ttsInput: "远", context: "the single syllable 远 yuǎn; say only yuǎn" }],
  ["银\u0000yín", { ttsInput: "银", context: "the single syllable 银 yín, as in 金银; say only yín" }],
  ["晕\u0000yūn", { ttsInput: "晕", context: "the single syllable 晕 yūn, as in 晕车; say only yūn" }],
  ["影\u0000yǐng", { ttsInput: "影", context: "the single syllable 影 yǐng, as in 电影; make the final -ing a clear back nasal sound; say only yǐng" }],
  ["尺\u0000chǐ", { ttsInput: "尺", context: "the single syllable 尺 chǐ, as in 尺寸; say only chǐ" }],
  ["耶\u0000yē", { ttsInput: "耶", context: "the single syllable 耶 yē, as in 耶稣; say only yē" }],
  ["寡\u0000guǎ", { ttsInput: "寡", context: "the single syllable 寡 guǎ, as in 寡妇; use a complete third tone: dip low, then rise clearly before the sound ends; say only guǎ" }]
]);

const toneLetters = new Map([
  ["ā", ["a", 1]], ["á", ["a", 2]], ["ǎ", ["a", 3]], ["à", ["a", 4]],
  ["ē", ["e", 1]], ["é", ["e", 2]], ["ě", ["e", 3]], ["è", ["e", 4]],
  ["ī", ["i", 1]], ["í", ["i", 2]], ["ǐ", ["i", 3]], ["ì", ["i", 4]],
  ["ō", ["o", 1]], ["ó", ["o", 2]], ["ǒ", ["o", 3]], ["ò", ["o", 4]],
  ["ū", ["u", 1]], ["ú", ["u", 2]], ["ǔ", ["u", 3]], ["ù", ["u", 4]],
  ["ǖ", ["v", 1]], ["ǘ", ["v", 2]], ["ǚ", ["v", 3]], ["ǜ", ["v", 4]],
  ["ü", ["v", 0]]
]);

function readingSlug(pinyin) {
  let tone = 0;
  const letters = [...pinyin.normalize("NFC")].map((character) => {
    const mapped = toneLetters.get(character);
    if (!mapped) return character.toLowerCase();
    tone ||= mapped[1];
    return mapped[0];
  }).join("").replace(/[^a-zv]+/g, "-").replace(/^-|-$/g, "");
  return `${letters || "sound"}${tone || 0}`;
}

function characterSlug(text) {
  return [...text].map((character) => character.codePointAt(0).toString(16)).join("-");
}

const clipMap = new Map();

reviewedBasicsClips.forEach((clip) => {
  clipMap.set(`${clip.text}\u0000${clip.pinyin}`, {
    ...clip,
    file: `basics/${clip.id}.mp3`,
    chapters: [1, 2]
  });
});

initialCallSounds.forEach(([initial, callSound, promptCharacter]) => {
  const id = `initial-${initial}`;
  clipMap.set(`initial\u0000${initial}`, {
    id,
    file: `initials/${initial}.mp3`,
    text: initial,
    pinyin: callSound,
    ttsInput: promptCharacter,
    kind: "initial",
    chapters: [3, 4, 5, 6, 7, 8],
    context: `the classroom call-sound ${callSound} for the Hanyu Pinyin initial ${initial}; it must be a steady first tone, not an English letter name and not a vocabulary word`
  });
});

compoundFinalAnchors.forEach(([final, callSound, ttsInput, pictureAnchor, coaching]) => {
  const id = `compound-final-${final.replace("ü", "v")}`;
  clipMap.set(`compound-final\u0000${final}`, {
    id,
    file: `finals/${id}.mp3`,
    text: final,
    pinyin: callSound,
    ttsInput,
    kind: "compound-final",
    chapters: final === "ie" || final === "üe" || final === "er" ? [10] : [9],
    context: coaching ?? `the picture-anchor ${pictureAnchor} for the compound final ${final}; say only the first-tone final ${callSound}`
  });
});

nasalFinalAnchors.forEach(([final, callSound, ttsInput]) => {
  const id = `nasal-final-${final.replace("ü", "v")}`;
  clipMap.set(`nasal-final\u0000${final}`, {
    id,
    file: `finals/${id}.mp3`,
    text: final,
    pinyin: callSound,
    ttsInput,
    kind: "nasal-final",
    chapters: ["an", "en", "in", "un", "ün"].includes(final) ? [11] : [12],
    context: `say only the first-tone nasal final ${callSound}, clearly and without an initial consonant`
  });
});

readingSyllableAnchors.forEach(([unitId, label, callSound, ttsInput, chapter, coaching]) => {
  const id = `reading-${unitId}-${label.replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`;
  clipMap.set(`reading\u0000${unitId}\u0000${label}`, {
    id,
    file: `reading/${id}.mp3`,
    text: label,
    pinyin: callSound,
    ttsInput,
    kind: "reading-syllable",
    chapters: [chapter],
    context: coaching ?? `the whole-syllable Pinyin reading ${callSound}; say it once in a high, level first tone`
  });
});

pinyinUnits.filter((unit) => unit.number >= 3 && unit.examples).forEach((unit) => {
  unit.examples.forEach((example) => {
    example.words.forEach(([text, pinyin]) => {
      const key = `${text}\u0000${pinyin}`;
      const pronunciationOverride = wordPronunciationOverrides.get(key);
      const existing = clipMap.get(key);
      if (existing) {
        existing.chapters = [...new Set([...(existing.chapters ?? []), unit.number])];
        return;
      }
      const chapter = String(unit.number).padStart(2, "0");
      const id = `course/ch${chapter}-${readingSlug(pinyin)}-u${characterSlug(text)}`;
      clipMap.set(key, {
        id,
        file: `${id}.mp3`,
        text,
        pinyin,
        // A real Chinese character gives TTS an unambiguous pronunciation;
        // the pinyin field remains the lesson's visible reading.
        ttsInput: pronunciationOverride?.ttsInput ?? text,
        kind: "word",
        chapters: [unit.number],
        context: pronunciationOverride?.context ?? `the Mandarin word ${text}, pronounced ${pinyin}`
      });
    });
  });
});

export const pinyinAudioClips = [...clipMap.values()];

const clipsById = new Map(pinyinAudioClips.map((clip) => [clip.id, clip]));
const clipsByReading = new Map(
  pinyinAudioClips.map((clip) => [`${clip.text}\u0000${clip.pinyin}`, clip])
);

export function pinyinAudioClip(id) {
  return clipsById.get(id);
}

export function pinyinAudioId(text, pinyin = text) {
  return clipsByReading.get(`${text}\u0000${pinyin}`)?.id ?? "";
}

export function pinyinInitialAudioClip(initial) {
  return clipsById.get(`initial-${initial}`);
}

export function pinyinCompoundFinalAudioClip(final) {
  return clipsById.get(`compound-final-${final.replace("ü", "v")}`);
}

export function pinyinNasalFinalAudioClip(final) {
  return clipsById.get(`nasal-final-${final.replace("ü", "v")}`);
}

export function pinyinReadingSyllableAudioClip(unitId, label) {
  return clipsById.get(`reading-${unitId}-${label.replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`);
}

export function pinyinAudioPath(id) {
  const clip = clipsById.get(id);
  return clip ? `${pinyinAudioBase}/${clip.file}?v=${pinyinAudioVersion}` : "";
}

// Backward-compatible names for the first generated batch.
export const pinyinBasicsAudioBase = pinyinAudioBase;
export const pinyinBasicsAudioVersion = pinyinAudioVersion;
export const pinyinBasicsAudioClips = pinyinAudioClips;
export const pinyinBasicsAudioClip = pinyinAudioClip;
export const pinyinBasicsAudioId = pinyinAudioId;
export const pinyinBasicsAudioPath = pinyinAudioPath;
