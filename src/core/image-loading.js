export function imageLoadingAttrs({ primary = false } = {}) {
  return primary
    ? 'loading="eager" decoding="async"'
    : 'loading="lazy" decoding="async"';
}

export function applyImageLoading(container, { primary = false } = {}) {
  if (!container) return;
  let firstImage = true;
  for (const image of container.querySelectorAll("img")) {
    if (!image.hasAttribute("decoding")) image.decoding = "async";
    if (!image.hasAttribute("loading")) {
      image.loading = primary && firstImage ? "eager" : "lazy";
    }
    firstImage = false;
  }
}
