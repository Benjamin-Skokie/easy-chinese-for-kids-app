# Culture Story 研究与改写流程 / Research and Rewrite Workflow

Last updated: 2026-09-06

这份文档说明在用户尚未提供最终中英文稿时，怎样从主题、旧稿或 Fact Pack 写出一篇可以进入快速落地流程的 Culture Story。

This document explains how to turn a topic, an old draft, or a Fact Pack into a finished bilingual Culture Story ready for the fast landing workflow.

---

# 中文流程

## 一、这份流程负责什么

使用场景：

- 只有主题，还没有完整故事；
- 旧稿需要大幅重写；
- 中英文内容、结构或事实边界互相冲突；
- 需要先研究，才能确定故事能安全讲到什么程度。

这份流程负责从研究到最终双语稿。完成后的稿件再交给 [Culture Story 快速落地流程](./story_landing_workflow.md) 写入网站、同步文件、构建和测试。

[Culture Story 写作原则](./story_writing_guidelines.md) 是成品质量标准；本文件是产生这个成品的工作顺序。不要在这里重复发明另一套写作原则。

## 二、开始前确认范围

只做足以理解当前故事的检查：

- 找到现有文章目录和 `page.md`；
- 查看现有图片、caption 和页面结构；
- 查看网站是否已经有专门文章覆盖同一主题；
- 查看相关术语是否已经存在于 `culture/content/terminology.json`；
- 不读取或恢复已经废弃的 V0–V3、多难度稿件。

先写下一句话：

> 这篇故事只需要让孩子看见、理解或记住什么？

如果不能用一句话回答，主题还没有收紧。

## 三、建立 Fact Pack

Fact Pack 只保存写作护栏，不是文章草稿。

优先查找：

- 原典或历史文献；
- 博物馆、图书馆和档案馆；
- 大学或可靠学术项目；
- 政府、专业机构和出版机构；
- 与具体事实直接相关的可靠研究。

每个关键事实记录：

- 事实本身；
- 直接来源链接；
- 来源能够支持到什么程度；
- 哪些细节仍不确定；
- 哪些内容属于传说、小说、戏曲、现代改编或编辑推断。

停止条件：中心事实已经可靠，故事边界已经清楚。不要为了普通背景知识继续无限搜索。

## 四、确定一个故事中心

选择一个孩子能够跟随的中心，例如：

- 一个问题；
- 一个意外；
- 一个目标；
- 一个需要解决的困难；
- 一件东西怎样改变；
- 一个人怎样作出选择；
- 一个画面为什么和我们以为的不一样。

与中心没有直接关系的名字、年份、制度、争论和背景知识删掉，或者只保留一句必要说明。其他专题已经详细讲过的内容不要在这里重新展开。

## 五、安排 story beats

故事性强的题目先列出大约 8–12 个 beats。简单题目可以更少。

每个 beat 必须让文章向前移动：

1. 具体场景、人物、动作、问题或意外；
2. 新情况出现；
3. 人物采取行动或读者得到新线索；
4. 情况发生变化；
5. 中心问题得到回答或形成有力量的结尾。

删除只负责补背景、没有推动主线的 beat。不要把“事实一、事实二、事实三、总结”误当成故事结构。

## 六、先写英文

英文是 primary version，应当像为美国 6–10 岁儿童原创的自然英文。

- 从 story beats 和 Fact Pack 写，不对着中文逐句翻译。
- 从人物、场景、问题、动作或意外开始，不从定义、朝代和年份开始。
- 使用具体、可见、能画出来的语言。
- 中文人名和术语统一使用带声调汉语拼音，不在括号中重复汉字。
- 正常文章通常约 650–800 words，约 700 words 最常见；简单题目可以更短，flagship story 可以更长。
- 使用完整自然段，不依靠一句一行制造节奏。
- 不编造 Fact Pack 无法支持的对白、动机、心理活动或历史事件。

英文写完后，脱离中文单独朗读。检查它是否像原生儿童故事，而不是翻译、博物馆标签、百科全书或 AI presenter。

## 七、再自然重写中文

中文使用同一个中心、story beats 和事实边界重新写作，不逐句翻译英文。

- 直接使用汉字，不给人物和术语附拼音；
- 保持自然、温暖、具体、有画面感；
- 通常约 900–1,200 字，但不为了长度增加内容；
- 可以按照中文节奏调整句子和段落；
- 与英文共享同一故事发展和事实结论。

完成后对照两版，只检查故事 beats、关键事实、标题含义和 editorial boundaries，不要求句子一一对应。

## 八、完成 references

把 Fact Pack 中真正用到的来源整理进 `references.md`。每条包含：

```markdown
Source: <来源名称>
URL: <直接链接>
Accessed: YYYY-MM-DD

Supports:

- <具体支持的事实>

Editorial boundary:

- <可以安全写到什么程度>
- <哪些内容属于不确定、传说、改编或推断>
```

保留少量真正使用过的来源，不把搜索结果全部堆进去。`references.md` 是编辑研究记录，不在故事页面中显示。

## 九、检查现有图片

改写的主要任务是改善故事，不是推翻整套图片。

- 现有图片能够支持新的 story beat，就保留；
- 只需要修改 caption 时，不重新生成图片；
- 图片明显错误或无法支持新故事时，说明具体问题并向用户确认新图方向；
- 未经确认，不生成新图；
- 检查人物身份、服装、器物结构、动作、历史环境和跨图片一致性；
- 每张图必须服务一个清楚、不同的视觉 beat。

视觉判断遵守 [Culture Art Direction](./art_direction.md)。

## 十、完成稿检查和交接

交给快速落地流程之前，确认：

- 故事只有一个中心；
- 开头、中间和结尾形成真正的发展；
- 每节都推动同一主线；
- 英文可以独立自然朗读；
- 中文不是逐句翻译；
- 两版事实和 editorial boundaries 一致；
- 没有大量名字、年份和术语挤压故事；
- 没有 Fact Pack bullet points 拼接成文章；
- 没有连续的一句话段落；
- references 已经覆盖中心和高风险事实；
- 现有图片已经决定保留、修改 caption 或等待用户确认替换。

输出应该是一份完整、可确认的中英文稿和对应 references。用户确认后，进入 [Culture Story 快速落地流程](./story_landing_workflow.md)。

---

# English Workflow

## 1. What this workflow does

Use this workflow when:

- there is a topic but no complete story;
- an old manuscript needs substantial rewriting;
- the Chinese and English versions conflict in structure or factual boundaries; or
- research is needed before the safe limits of the story are clear.

This workflow covers research through the finished bilingual manuscript. Once the manuscript is approved, use the [Fast Story Landing Workflow](./story_landing_workflow.md) to add it to the site, synchronize files, build, and test.

The [Culture Story Writing Guidelines](./story_writing_guidelines.md) define the quality of the finished story. This document defines the sequence used to produce it; it should not invent a second set of writing principles.

## 2. Confirm the scope before starting

Inspect only what is necessary to understand the current story:

- locate the article directory and `page.md`;
- review existing images, captions, and page structure;
- check whether another site article already covers the same subject in depth;
- check related entries in `culture/content/terminology.json`;
- do not read or restore retired V0–V3 or multi-level manuscripts.

Write one sentence first:

> What is the one thing this story should help a child see, understand, or remember?

If that cannot be answered in one sentence, the topic is not focused enough.

## 3. Build the Fact Pack

The Fact Pack is a set of writing guardrails, not a draft.

Prefer:

- primary texts and historical documents;
- museums, libraries, and archives;
- universities and reliable scholarly projects;
- government, professional, and publishing institutions; and
- dependable research directly relevant to the claim.

For every central fact, record:

- the fact itself;
- a direct source URL;
- exactly what the source supports;
- what remains uncertain; and
- what belongs to legend, fiction, performance, modern adaptation, or editorial inference.

Stop when the central facts are reliable and the story boundaries are clear. Do not keep searching indefinitely for ordinary background information.

## 4. Choose one story center

Choose one center a child can follow, such as:

- a question;
- a surprise;
- a goal;
- a problem that needs solving;
- an object changing over time;
- a person making a choice; or
- an image that is different from what people expect.

Remove names, dates, institutions, debates, and background facts that do not directly serve that center. If another Nihao World story already explains a topic in depth, mention it only when necessary and return to this story.

## 5. Arrange the story beats

For a story-rich topic, outline about 8–12 beats. A simple topic may need fewer.

Every beat must move the article forward:

1. a concrete scene, person, action, question, or surprise;
2. a new situation appears;
3. a person acts or the reader receives a clue;
4. the situation changes; and
5. the central question is answered or reaches a strong ending.

Delete beats that only add background without moving the main line. Do not mistake “fact one, fact two, fact three, summary” for a story structure.

## 6. Draft the English first

English is the primary version and should sound like original writing for American children ages 6–10.

- Write from the story beats and Fact Pack, not by translating Chinese sentences.
- Open with a person, scene, question, action, or surprise—not a definition, dynasty, or date.
- Prefer concrete, visible language that children can picture.
- Use tone-marked Hanyu Pinyin for Chinese names and terms without repeating Chinese characters in parentheses.
- A normal article is usually about 650–800 words, often around 700. Simple stories may be shorter, while flagship stories may be longer.
- Use normal cohesive paragraphs instead of one sentence per line.
- Do not invent dialogue, motives, thoughts, or historical events unsupported by the Fact Pack.

After drafting, read the English aloud without looking at Chinese. It should sound like native children’s writing, not a translation, museum label, encyclopedia entry, or AI presenter.

## 7. Rewrite naturally in Chinese

Write the Chinese version anew from the same center, story beats, and factual boundaries. Do not translate the English sentence by sentence.

- Use Chinese characters directly, without adding pinyin to names and terms.
- Keep the voice natural, warm, concrete, and visual.
- A normal article is often about 900–1,200 Chinese characters, but never add material merely to reach a target.
- Adjust sentences and paragraphs to natural Chinese rhythm.
- Preserve the same story development and factual conclusions as the English.

Compare the two versions only after both are complete. Check story beats, key facts, title meaning, and editorial boundaries—not sentence-by-sentence alignment.

## 8. Complete the references

Move only the sources actually used from the Fact Pack into `references.md`. Every source includes:

```markdown
Source: <source name>
URL: <direct URL>
Accessed: YYYY-MM-DD

Supports:

- <specific fact supported by the source>

Editorial boundary:

- <what the story may safely say>
- <what remains uncertain, legendary, adapted, or inferred>
```

Keep a small set of reviewed sources rather than copying every search result. `references.md` is an editorial research record and does not render on the story page.

## 9. Review the existing images

The main purpose of a rewrite is to improve the story, not to replace an entire image set.

- Keep an existing image when it supports the new story beat.
- If only the caption needs work, change only the caption.
- If an image is clearly wrong or cannot support the new story, explain the exact problem and confirm a new direction with the user.
- Do not generate new art without confirmation.
- Check identity, clothing, object structure, action, historical setting, and consistency across images.
- Every image must serve one clear and distinct visual beat.

Follow the [Culture Art Direction](./art_direction.md) for visual judgment.

## 10. Final review and handoff

Before handing the manuscript to the landing workflow, confirm:

- the story has one center;
- the beginning, middle, and ending show real development;
- every section advances the same main line;
- the English reads naturally on its own;
- the Chinese is not a sentence-by-sentence translation;
- both versions share the same facts and editorial boundaries;
- names, dates, and specialist terms do not crowd out the story;
- Fact Pack bullets were not stitched into prose;
- there are no runs of one-sentence paragraphs;
- references cover the central and high-risk claims; and
- every existing image has been designated to stay, receive a caption change, or await confirmation for replacement.

The output is a complete bilingual manuscript with its references. Once the user approves it, continue with the [Fast Story Landing Workflow](./story_landing_workflow.md).
