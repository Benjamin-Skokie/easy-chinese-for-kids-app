# Polite Words

Status: `implementation complete; visual QA pending`
URL: `index.html?topic=polite-words#topic-detail`

## Cross-book progression

| Book lesson | Language job |
| --- | --- |
| 1A Lesson 5 — Thank you! | `谢谢`, `不客气`, `对不起`, and `没关系` in short social exchanges. |
| 3A Lesson 6 — Request | Extend politeness with `请…` and `我可以…吗？` |

## Approved page blueprint

| Section | Owner | Decision |
| --- | --- | --- |
| Scene | Polite Words renderer | A 2 × 2 grid on desktop and one column on phones. The three 1A manners exchanges remain, and the fourth 4:3 frame uses `school-request-teacher-help.webp` for `我可以问老师吗？ / 可以。`. Every card has one top-right Play control. |
| Book words | Polite Words renderer | The existing manners words plus the full request `我可以问老师吗？`; `请` remains visible through `请安静。`. The cards are text-only because the scenes already provide the visual teaching evidence. |
| Useful note | Shared lesson template | Distinguish a polite request marker `请` from a permission question `我可以…吗？`. |
| Practice | Shared Polite Words listener and matcher | The no-repeat Listen and choose cycle includes the complete request question. Correct selection speaks the question; the scene supplies the answer `可以。`. Before completion, the green top-right control is Play; after completion, it is New game and starts and speaks a different round. |

## Lesson evidence

- **1A Lesson 5 — Thank you!:** Words: `谢谢、不客气、对不起、没关系`. Frames: polite classroom exchanges.
- **3A Lesson 6 — Request:** Words: request phrases. Frames: `请…` and `我可以…吗？`.

## Asset and scope decision

`school-request-teacher-help.webp` is the 3A request scene. The homework/TV permission image stays unused: it introduces homework wording not confirmed for this page. Requests remains a later layer of Polite Words because the curriculum already maps 3A Lesson 6 to this topic; it is not a duplicate sibling page.
