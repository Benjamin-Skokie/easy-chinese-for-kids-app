function noteExampleMarkup(example) {
  if (!example?.hanzi && !example?.english) return "";
  if (!example?.english) {
    return `<p class="visual-topic-note-example-pair"><span class="visual-topic-note-example-hanzi">${example.hanzi}</span></p>`;
  }
  return `<p class="visual-topic-note-example-pair"><span class="visual-topic-note-example-hanzi">${example.hanzi}</span><span class="visual-topic-note-example-separator" aria-hidden="true">-</span><span class="visual-topic-note-example-english">${example.english}</span></p>`;
}

function noteCardMarkup(note) {
  const hanzi = note.hanzi ?? note.pattern ?? "";
  const explanation = note.explanation ?? note.english ?? "";
  const examples = note.examples ?? [];
  return `
    <article class="visual-topic-note-card is-explanation-note">
      ${hanzi ? `<p class="visual-topic-note-hanzi">${hanzi}</p>` : ""}
      ${explanation ? `<p class="visual-topic-note-english">${explanation}</p>` : ""}
      ${examples.map(noteExampleMarkup).join("")}
    </article>
  `;
}

export function renderLessonNotes(notes, options = {}) {
  const visibleNotes = (notes ?? []).filter(Boolean);
  if (!visibleNotes.length) return "";
  const sectionClass = options.sectionClass ? ` ${options.sectionClass}` : "";
  const gridClass = options.gridClass ? ` ${options.gridClass}` : "";
  return `
    <section class="visual-topic-notes lesson-notes${sectionClass}" data-lesson-notes>
      <p class="body-match-kicker">Notes</p>
      <div class="visual-topic-note-grid lesson-notes-grid${gridClass}">
        ${visibleNotes.map(noteCardMarkup).join("")}
      </div>
    </section>
  `;
}
