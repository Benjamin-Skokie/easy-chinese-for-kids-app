export function lessonScopeKey(scope) {
  return scope ? `${scope.bookId}:${scope.lessonNumber}` : "";
}

export function filterLessonContent(items = [], scope = null) {
  const source = lessonScopeKey(scope);
  if (!source) return items;
  return items.filter((item) => item.lessonSources?.includes(source));
}

export function filterLessonGroups(groups = [], scope = null) {
  return groups
    .map((group) => ({ ...group, items: filterLessonContent(group.items, scope) }))
    .filter((group) => group.items.length);
}
