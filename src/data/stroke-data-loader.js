const cache = new Map();

function medianPath(points) {
  return points.map(([x, y], index) => `${index ? "L" : "M"} ${x} ${y}`).join(" ");
}

export async function loadStrokeCharacter(character) {
  if (cache.has(character)) return cache.get(character);
  const request = fetch(`assets/stroke-data/${encodeURIComponent(character)}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load stroke data for ${character}`);
      return response.json();
    })
    .then((data) => {
      const valid = Object.keys(data).length === 2
        && Array.isArray(data.strokes)
        && Array.isArray(data.medians)
        && data.strokes.length === data.medians.length
        && data.strokes.every((stroke) => typeof stroke === "string" && /^M(?:\s|[-\d])/.test(stroke))
        && data.medians.every((median) => Array.isArray(median));
      if (!valid) throw new Error(`Rejected invalid local stroke data for ${character}`);
      return { paths: data.strokes, medians: data.medians.map(medianPath) };
    });
  cache.set(character, request);
  return request;
}
