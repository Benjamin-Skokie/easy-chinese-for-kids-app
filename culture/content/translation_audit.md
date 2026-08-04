# Translation Audit Notes

## Scope

This audit covers the source corpus under `culture/content/` and is meant to guide the English rewrite.

The immediate goals are:

- basic fact-checking of obvious historical or scientific claims
- flagging inconsistent or misleading use of `华夏`, `中国`, `中文`, and `古代中国`
- setting stable translation rules before the full English rewrite

## Term Usage Rules

### `中国`

Use `中国` when the source is speaking broadly about the Chinese civilization, Chinese territory in a general historical sense, or modern China.

Flag it when:

- the text is really talking about one specific dynasty, state, or court and should name that period directly
- the wording makes a modern nation-state sound identical to all earlier periods without qualification

Safer English options:

- `China`
- `in Chinese history`
- `in ancient China`
- the exact dynasty name, such as `in the Tang dynasty` or `in the Han dynasty`

### `古代中国`

Use `古代中国` for broad, cross-dynastic discussion.

Flag it when:

- the article is really about one named dynasty or one narrower period
- the phrase is being used where a tighter historical label would be more accurate

Safer English options:

- `ancient China`
- `early China`
- the exact dynasty or period name

### `中文`

Use `中文` only when the topic is the Chinese language or Chinese writing in a modern linguistic sense.

Flag it when:

- the article is really about `汉字` and not the full language
- the text uses `中文` as a fuzzy substitute for script, culture, or ethnicity

Safer English options:

- `Chinese`
- `written Chinese`
- `Chinese characters`
- `the Chinese language`

### `华夏`

This is the term that needs the most caution.

`华夏` is a historical-cultural label, not a safe all-purpose replacement for `中国`.

Flag it when:

- it is used to refer to all later dynasties as if the term were timeless and exact
- it is used for Song, Yuan, Ming, Qing, or later imperial institutions where `中国` or the dynasty name is clearer
- it is used for specific inventions or events where the real subject is a dynasty, court, army, or regional tradition
- `华夏先民` is used for people who were not actually "early ancestors" in the relevant period

Safer English options:

- `ancient Chinese people`
- `early Chinese thinkers`
- `Chinese artisans`
- `people in ancient China`
- the exact dynasty or group name

## Current Red Flags

### High-confidence terminology issues

These files use `华夏` or `华夏先民` in ways that should be reconsidered before final publication:

- `culture/content/culture/kung-fu/zh.md`
- `culture/content/culture/chinese-knot/zh.md`
- `culture/content/culture/idiom-spirit/zh.md`
- `culture/content/culture/new-year-greeting/zh.md`
- `culture/content/culture/weiqi/zh.md`
- `culture/content/culture/family-titles/zh.md`
- `culture/content/culture/chinese-characters/zh.md`
- `culture/content/culture/dragon-phoenix/zh.md`
- `culture/content/economy/tea/zh.md`
- `culture/content/military/warships/zh.md`
- `culture/content/politics/imperial-exam-history/zh.md`
- `culture/content/religion/buddhism-comes-to-china/zh.md`
- `culture/content/science/compass/zh.md`
- `culture/content/science/abacus/zh.md`
- `culture/content/science/paper-making/zh.md`
- `culture/content/science/solar-terms/zh.md`

In many of these, `华夏先民` is being used for people from much later periods, or as a poetic synonym for `Chinese people` in general. That is not precise enough for educational content.

### Likely `中国` / period-label cleanup needed

These files should be checked for places where a dynasty or narrower label would be stronger than a blanket `中国`:

- `culture/content/religion/buddhism-comes-to-china/zh.md`
- `culture/content/politics/imperial-exam-history/zh.md`
- `culture/content/economy/tea/zh.md`
- `culture/content/military/warships/zh.md`
- `culture/content/culture/chinese-characters/zh.md`

### `中文` review

The clearest likely case to watch is:

- `culture/content/culture/family-titles/zh.md`

There, the distinction between `中文`, `汉字`, and the broader Chinese language should stay sharp in translation.

## Fact-Check Notes

### Confirmed or strongly supported corrections

- The claim that the Great Wall is the only human-made structure visible from space is false.
  Source direction: NASA says the Great Wall is not visible from the Moon and is difficult or impossible to see from low Earth orbit without photographic aid.

- The Wooden Pagoda of Ying County is strongly supported as the oldest and tallest surviving multi-storey wooden pagoda.
  Source direction: UNESCO tentative-list documentation supports this.

- Zhaozhou Bridge is strongly supported as the oldest surviving open-spandrel single-arch stone bridge.
  Source direction: standard reference works and heritage sources support this.

- White Horse Temple is traditionally described as the first Buddhist temple in China, but that should be phrased carefully as a traditional or conventional claim rather than an absolute, undisputed fact in every line.

## English Translation Policy

When rewriting the English:

- prefer native, contemporary American English for children
- do not translate literally when the Chinese is rhetorical or poetic
- keep historical claims careful where the source is legendary or debated
- distinguish clearly between:
  - legend
  - tradition
  - documented history
- when the Chinese source uses an imprecise civilizational term, make the English more precise even if the Chinese wording stays unchanged

## Status

- audit started
- terminology rules drafted
- targeted fact-checking started
- full article-by-article rewrite still in progress
