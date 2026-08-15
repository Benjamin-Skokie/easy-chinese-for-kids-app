# Hobbies

Status: `partially implemented` — **What I Like (2A Lesson 5)** and its child page **Hobbies (3B Lesson 4)** are live; the two 4B lesson pages remain planned.  
URL: `index.html?topic=hobbies#topic-detail`  
Mapped lessons: **2A Lesson 5 — I Love Reading; 3B Lesson 4 — Hobbies; 4B Lesson 4 — Hobbies; 4B Lesson 7 — Leisure Time**

## Confirmed language and scope

The first Hobbies page is anchored in **2A Lesson 5**. Its activity words are `看书`, `画画儿`, `写字`, and `玩儿游戏`, with `每天`. The book models both preference and routine: `我爱看书。`, `我喜欢画画儿。`, `我喜欢写字。`, and `我每天玩儿游戏。` It also gives third-person review sentences such as `他每天看书。`, `她爱写字。`, `她喜欢画画儿。`, and `他喜欢玩儿游戏。`

The existing topic’s single `我喜欢看书。` focus is therefore too narrow. It needs the full 2A activity set and the distinction between a preference (`爱` / `喜欢`) and a routine (`每天`). The page uses the everyday form `画画` (rather than the book’s `画画儿`) so system speech reads it reliably.

## Cross-book progression

| Book | Confirmed language | Language job for Hobbies |
| --- | --- | --- |
| 2A Lesson 5 | `看书`, `画画儿`, `写字`, `玩儿游戏`, `每天`; `我爱…`, `我喜欢…`, `我每天…` | Core page: personal preferences and a daily activity. |
| 3B Lesson 4 | `唱歌`, `跳舞`, `游泳`, `滑冰`, `滑雪`; `你爱…吗？`, `你喜欢…吗？` | Broaden activity choices and turn preferences into a question-and-answer exchange. |
| 4B Lesson 4 | `看电视`, `弹钢琴`, `玩儿电脑游戏`, `看电影`, `看动画片儿`; `喜欢` / `爱` / `在…` | Add media and music activities; distinguish a general preference from something happening now. |
| 4B Lesson 7 | `跑步`, `踢足球`, `骑自行车`, `玩儿沙子`; `在 + place + activity` | Later leisure extension: place an activity in `公园` or `海边`. |

## Approved page architecture

Keep **Hobbies** as a grouping in Play & Hobbies, but give each mapped book lesson its own focused activity page/card. Do not place multiple book lessons and their practices in one long page or place a large lesson-navigation shelf inside another completed lesson. Each page owns only its vocabulary, sentence frame, scenes, and practice.

| Lesson page | Book source | Focused language job |
| --- | --- | --- |
| **What I Like** | 2A Lesson 5 | `我爱…`, `我喜欢…`, and `我每天…` with reading, drawing, writing, and games. |
| **Music & Movement** | 3B Lesson 4 | Singing, dancing, swimming, skating, skiing; ask and answer `你喜欢…吗？` |
| **Hobbies at Home** | 4B Lesson 4 | Media and music activities; preference versus `在…` happening now. |
| **Leisure Time** | 4B Lesson 7 | Activities in a place with `在 + place + activity`. |

The Play & Hobbies category should show these as equal topic cards. Book lesson selection may open the matching page, but it must not render a later lesson inside another page. Pages must not merge their Book words, scenes, Useful notes, or games.

## Approved first lesson page

| Section | Owner | Decision |
| --- | --- | --- |
| Scene | Hobbies renderer | A 2×2 grid: four compact, character-anchored activity scenes, each with one complete book-backed sentence. |
| Book words | Hobbies renderer | `看书`, `画画`, `写字`, `玩儿游戏`, and `每天` as compact text cards; their visual teaching remains in the Scene section, without duplicate images. |
| Useful note | Hobbies renderer | Explain the contrast: `我喜欢…` says what I like; `我每天…` says what I do every day. |
| Practice | Hobbies renderer | Use the shared sentence-builder format without punctuation as a token. Every activity picture accepts the same sensible frame variations: `我爱 + 活动`, `我喜欢 + 活动`, `我每天 + 活动`, and `我爱 / 喜欢每天 + 活动`—so, for example, `我爱玩儿游戏。` is as valid as `我喜欢玩儿游戏。`. On success show and speak the child’s actual complete sentence with Hanzi, pinyin, and English. **Play** starts a new randomized round. |
| Shared focus panels | Shared shell | Suppress generic duplicate panels when the Hobbies renderer owns the lesson content. |

## Approved second lesson page

**Music & Movement (3B Lesson 4)** is the next focused page. It broadens the activity set and gives the child a question-and-answer language job; it does not repeat the 2A routine lesson.

| Section | Owner | Decision |
| --- | --- | --- |
| Scene | Hobbies 3B page renderer | A 2×3 grid with five compact activity scenes. Every card uses the shared 4:3 scene frame. The chorus supports `我们爱唱歌。`; Luna’s solo scene supports `她爱跳舞。`; the other scenes support `我喜欢游泳。`, `我喜欢滑冰。`, and `我喜欢滑雪。`. The Useful note and practice supply the question-and-answer exchange. |
| Book words | Hobbies renderer | `我们`, `唱歌`, `跳舞`, `游泳`, `滑冰`, and `滑雪` as text-only cards. Scene images already teach each activity. |
| Useful note | Hobbies renderer | `你喜欢…吗？` asks whether someone likes an activity. Answer with `我喜欢…。`; the book also uses `爱` for a strong preference. |
| Practice | Hobbies renderer | A paired-question builder: the picture cue identifies one activity; build `你喜欢 + activity + 吗` or the affirmative response `我喜欢 + activity`. Each completed pair displays Hanzi, pinyin, English, and speech. **Play** starts a different random activity. |
| Shared focus panels | Shared shell | Suppress generic duplicate panels when the Hobbies renderer owns the lesson content. |

## Asset audit

| Lesson page | Exact reusable assets | Partial fit or missing asset |
| --- | --- | --- |
| **What I Like (2A)** | `child-reading-book-facing-child.webp` for `看书`; `anan-drawing.webp` for `画画儿`; `luna-writing-workbook.webp` for `写字`; `lele-anan-playing-board-game.webp` for non-device `玩儿游戏`. | The four activity cues now have exact, character-bible-matched assets. |
| **Music & Movement (3B)** | `kids_singing_chorus.webp`, `luna-dancing-landscape.webp`, `jaden_swimming.webp`, `noah-ice-skating.webp`, `noah_skiing.webp`. | All five activity cues now have exact, landscape-ready scenes. The original portrait `luna_dancing.webp` remains in the library but is not used in this grid. |
| **Hobbies at Home (4B)** | `meimei_watching_cartoons.webp`; `tiantian_playing_ipad_games.webp` is a close but not exact match for `玩儿电脑游戏`. | No exact scene for `看电视`, `弹钢琴`, or `看电影`; `piano_anchor.webp` is an environment asset, not an activity scene. |
| **Leisure Time (4B)** | `kids_running_playground.webp`, soccer scenes, and bicycle scenes. | No `玩儿沙子` image. |

Use a partial-fit asset only as a Book words cue, never to support a sentence that it does not depict. Do not reuse an asset from a later lesson as proof that the 2A page teaches its later wording. For the new drawing and writing art, orient the paper toward the child: even if the child faces the camera, the paper must be angled away toward the child, with no camera-facing presentation page.

## Lesson evidence

- **2A Lesson 5 — I Love Reading:** Words: `看书、画画儿、写字、玩儿游戏、每天`. Sentences: `我爱看书。` / `我喜欢画画儿。` / `我喜欢写字。` / `我每天玩儿游戏。`.
- **3B Lesson 4 — Hobbies:** Words: `唱歌、跳舞、游泳、滑冰、滑雪`. Frames: `你爱…吗？` / `你喜欢…吗？`.
- **4B Lesson 4 — Hobbies:** Words: `看电视、弹钢琴、玩儿电脑游戏、看电影、看动画片儿`. Frames: `喜欢…` / `爱…` / `在…`.
- **4B Lesson 7 — Leisure Time:** Words: `跑步、踢足球、骑自行车、玩儿沙子`. Frame: `在 + place + activity`.

## Remaining coverage

**What I Like (2A Lesson 5)** is implemented with the four activity assets, the `我喜欢… / 我每天…` note, and a complete-sentence builder. **Music & Movement (3B Lesson 4)** is implemented as a separate activity page with five activity scenes and a question builder. The 4B lessons remain separate planned activity pages, not additional Book words for either implemented page.
