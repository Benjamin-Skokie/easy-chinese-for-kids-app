export function imageLoadingAttrs({ primary = false } = {}) {
  return primary
    ? 'loading="eager" decoding="async"'
    : 'loading="lazy" decoding="async"';
}
