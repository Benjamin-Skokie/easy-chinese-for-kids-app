# Documentation Guide

Last updated: 2026-08-09

Use this guide to find the minimum source set for a task. Active instructions and source data stay at the root; generated views are clearly labeled; historical material is under `archive/` and must not drive new implementation work.

## Start a learning-topic change

1. [lesson_page_workflow.md](./lesson_page_workflow.md) - the short build order.
2. The relevant book OCR text, [curriculum_reference.json](./curriculum_reference.json), and [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json) - the evidence for the one topic.
3. The relevant asset manifests/folders - check what can actually teach the planned scene.
4. One topic contract in the matching [lesson-contracts/](./lesson-contracts/) category - create it before implementation and update the same decision record throughout the work.

Read these only when the task requires them:

- [game_templates.md](./game_templates.md) - after a remaining practice goal calls for an interaction.
- [art_direction.md](./art_direction.md), [character_bible.md](./character_bible.md), or [school_bible.md](./school_bible.md) - only when selecting or creating new art, or using a recurring character or school scene.
- [curriculum_guide.md](./curriculum_guide.md) - only for a series-wide progression question or a topic that returns across books with an unclear new language job.
- [series_audit.md](./series_audit.md), [development_log.md](./development_log.md), and [page-build-logs/](./page-build-logs/) - reference/history, not required page-build input.

Do not read the full documentation directory before starting a topic. It is slower and does not improve the page. The contract is the one working record for that topic.

## Current project references

- [topic_build_backlog.md](./topic_build_backlog.md) - short cross-catalog checklist for new topics, partial coverage, and optional asset integrations.
- [development_log.md](./development_log.md) - short cross-page workflow discoveries; consult only when the reason for a current rule is unclear.
- [page-build-logs/](./page-build-logs/) - detailed iteration records for a specific page; use only when resuming that page.
- [curriculum_guide.md](./curriculum_guide.md) - series-wide progression rules, not a page-production checklist.
- [security_publish.md](./security_publish.md) - publishing and security notes.

## Curriculum and asset data

- [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json) - primary mapping data.
- [curriculum_reference.json](./curriculum_reference.json) - structured book reference.
- [book_content_asset_review.json](./book_content_asset_review.json) - detailed book-first review data.
- [asset_summary.md](./asset_summary.md) - generated asset inventory; regenerate after manifest changes.
- `ocr/` - primary book evidence; use the relevant book file rather than broad audit summaries.

## Visual and culture references

- [art_direction.md](./art_direction.md) - product-wide lesson and asset rules.
- [character_bible.md](./character_bible.md) and [school_bible.md](./school_bible.md) - recurring visual anchors.
- [culture/](./culture/) - culture article, visual, workflow, and index guidance.

## Historical material

[`archive/`](./archive/) preserves superseded plans and first-pass audits for provenance. Do not use those files to make current product decisions. The active replacements are linked above.
