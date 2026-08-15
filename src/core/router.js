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

export function topicPageUrl(location, topicId) {
  return `${location.pathname}?topic=${encodeURIComponent(topicId)}#topic-detail`;
}
