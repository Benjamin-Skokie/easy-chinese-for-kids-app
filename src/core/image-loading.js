export function imageLoadingAttrs({ primary = false } = {}) {
  return primary
    ? 'loading="eager" decoding="async"'
    : 'loading="lazy" decoding="async"';
}

export function applyImageLoading(container, { primary = false, eager = false, revealTogether = false } = {}) {
  if (!container) return;
  let firstImage = true;
  const images = [...container.querySelectorAll("img")];
  for (const image of images) {
    if (!image.hasAttribute("decoding")) image.decoding = "async";
    if (!image.hasAttribute("loading")) {
      image.loading = eager || (primary && firstImage) ? "eager" : "lazy";
    }
    firstImage = false;
  }

  if (!revealTogether || !images.length) return;
  const batch = String(Number(container.dataset.imageLoadBatch || "0") + 1);
  container.dataset.imageLoadBatch = batch;
  container.classList.remove("review-images-ready");
  container.classList.add("review-images-loading");
  Promise.all(images.map((image) => new Promise((resolve) => {
    if (image.complete) {
      resolve();
    } else {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    }
  }))).then(() => {
    requestAnimationFrame(() => {
      if (container.dataset.imageLoadBatch !== batch) return;
      container.classList.remove("review-images-loading");
      container.classList.add("review-images-ready");
    });
  });
}
