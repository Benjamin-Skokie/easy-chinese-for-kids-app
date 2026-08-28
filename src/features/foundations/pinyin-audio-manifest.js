export const pinyinBasicsAudioBase = "assets/audio/pinyin/basics";
export const pinyinBasicsAudioVersion = "20260828-7";

export const pinyinBasicsAudioClips = [
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
  { id: "si4-four", text: "四", pinyin: "sì", kind: "word" },
  { id: "niu2-cow", text: "牛", pinyin: "niú", kind: "word" }
];

const clipsById = new Map(pinyinBasicsAudioClips.map((clip) => [clip.id, clip]));
const clipsByReading = new Map(
  pinyinBasicsAudioClips.map((clip) => [`${clip.text}\u0000${clip.pinyin}`, clip])
);

export function pinyinBasicsAudioClip(id) {
  return clipsById.get(id);
}

export function pinyinBasicsAudioId(text, pinyin = text) {
  return clipsByReading.get(`${text}\u0000${pinyin}`)?.id ?? "";
}

export function pinyinBasicsAudioPath(id) {
  return id && clipsById.has(id)
    ? `${pinyinBasicsAudioBase}/${id}.mp3?v=${pinyinBasicsAudioVersion}`
    : "";
}
