export function viewFromLocation(location) {
  const params = new URLSearchParams(location.search);
  const requestedView = params.get("view");
  const hash = location.hash.replace("#", "");
  if (requestedView === "culture" || hash === "culture" || hash === "culture-panel" || hash.startsWith("culture-")) {
    return "culture";
  }
  return requestedView === "books" || hash === "books" || hash === "books-panel" ? "books" : "topics";
}

export function topicIdFromLocation(location, hasTopic) {
  const topicId = new URLSearchParams(location.search).get("topic");
  return hasTopic(topicId) ? topicId : null;
}

export function lessonScopeFromLocation(location, books, topicId) {
  const params = new URLSearchParams(location.search);
  const bookId = params.get("book")?.toLowerCase();
  const lessonNumber = Number(params.get("lesson"));
  const lesson = books.find((book) => book.id === bookId)?.lessons.find((entry) => entry.lesson === lessonNumber);
  return lesson?.topicId === topicId ? { bookId, lessonNumber } : null;
}

export function topicPageUrl(location, topicId, lessonScope = null) {
  const params = new URLSearchParams();
  params.set("topic", topicId);
  if (lessonScope) {
    params.set("book", lessonScope.bookId);
    params.set("lesson", String(lessonScope.lessonNumber));
  }
  return `${location.pathname}?${params.toString()}#topic-detail`;
}
