# Documentation Index

Last updated: 2026-08-04

Purpose: explain which docs are active source-of-truth files, generated review views, historical audit notes, and workflow references. Do not delete a doc just because it overlaps another file; first check its role here.

## Start Here

- [next_session_notes.md](./next_session_notes.md): first handoff file for new sessions.
- [project_memory.md](./project_memory.md): durable project decisions and current state.
- [art_direction.md](./art_direction.md): general image and lesson-adaptation rules.
- [character_bible.md](./character_bible.md): recurring people, family relationships, and anti-drift rules.
- [school_bible.md](./school_bible.md): recurring school environment rules.

## Curriculum Sources

- [series_audit.md](./series_audit.md): human-readable book-by-book curriculum audit.
- [curriculum_reference.json](./curriculum_reference.json): structured curriculum reference.
- `docs/ocr/*.txt`: OCR text for the 8 books.
- [ocr/book_asset_coverage_map.json](./ocr/book_asset_coverage_map.json): OCR-derived lesson coverage seed map.

## Asset And Lesson Mapping

- [category_topic_content_asset_mapping.json](./category_topic_content_asset_mapping.json): active topic-first mapping data.
- [learn_by_topics_asset_mapping.md](./learn_by_topics_asset_mapping.md): review view for child-facing topic navigation.
- [learn_by_books_asset_mapping.md](./learn_by_books_asset_mapping.md): review view for parent/teacher book navigation.
- [topic_content_asset_matrix.md](./topic_content_asset_matrix.md): broader planning view generated from the topic mapping.
- [book_content_asset_review.json](./book_content_asset_review.json): detailed book-first review data, including culture rows.
- [book_content_asset_review.md](./book_content_asset_review.md): detailed book-first manual audit view; overlaps the newer book mapping but keeps culture-by-book review detail.
- [ocr/book_asset_coverage_map.json](./ocr/book_asset_coverage_map.json): older OCR-derived seed map used by later mapping docs; do not treat its date as current asset-review status.
- [ocr/book_asset_coverage_audit.md](./ocr/book_asset_coverage_audit.md): historical first-pass audit; keep for provenance, but prefer the newer mapping docs for current coverage decisions.

## Generated Inventories

- [asset_summary.md](./asset_summary.md): generated from `assets/*/manifest.json`; regenerate with `node scripts/generate_asset_summary.mjs` after asset or manifest changes.
- [assets/vocabulary-index.json](../assets/vocabulary-index.json): vocabulary-level asset lookup outside `docs/`.

## Product And Implementation Plans

- [learning_home_refactor.md](./learning_home_refactor.md): learning home information architecture.
- [structured_learning_content_refactor.md](./structured_learning_content_refactor.md): plan to move learning content out of `app.js`.
- [learning_topic_coverage_plan.md](./learning_topic_coverage_plan.md): topic build and implementation coverage plan.
- [lesson_page_workflow.md](./lesson_page_workflow.md): required workflow and completion checklist for topic pages.
- [time_daily_life_lesson_audit.md](./time_daily_life_lesson_audit.md): current lesson-contract audit for the Time & Daily Life category; use it before changing those pages.
- [game_templates.md](./game_templates.md): reusable practice interaction patterns.
- [grammar_asset_map.md](./grammar_asset_map.md): grammar-pattern-to-asset planning notes.
- [security_publish.md](./security_publish.md): static-site security and publish reminders.

## Culture Docs

- [culture_art_direction.md](./culture_art_direction.md): source of truth for culture article visuals.
- [culture_article_image_workflow.md](./culture_article_image_workflow.md): build-order workflow for culture article images.
- [culture_index_template.md](./culture_index_template.md): culture index page structure.

## Cleanup Rules

- Prefer labeling or archiving docs before deleting them.
- Remove local OS artifacts like `.DS_Store`; they are ignored and not project documentation.
- When two docs overlap, keep the code/data source and mark the other as a review or historical view.
