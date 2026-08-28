export function imageLoadingAttrs({ primary = false } = {}) {
  return primary
    ? 'loading="eager" decoding="async"'
    : 'loading="lazy" decoding="async"';
}

export function applyImageLoading(container, { primary = false, eager = false } = {}) {
  if (!container) return;
  let firstImage = true;
  const images = [...container.querySelectorAll("img")];
  for (const image of images) {
    if (!image.hasAttribute("decoding")) image.decoding = "async";
    if (eager) {
      image.loading = "eager";
    } else if (!image.hasAttribute("loading")) {
      image.loading = eager || (primary && firstImage) ? "eager" : "lazy";
    }
    firstImage = false;
  }

}
