import fs from "node:fs/promises";

const checks = [
  ["横钩", "买", 0], ["横撇", "又", 0], ["横撇弯钩", "队", 1], ["横折弯钩", "九", 1],
  ["横折折撇", "及", 1], ["横折折折钩", "奶", 3], ["竖钩", "小", 0], ["竖弯", "四", 3],
  ["竖弯钩", "儿", 1], ["撇点", "女", 0], ["撇折", "云", 2], ["斜钩", "我", 4],
  ["弯钩", "手", 3], ["卧钩", "心", 1], ["横斜钩", "风", 0], ["竖提", "衣", 3], ["横折提", "说", 2], ["横折钩", "书", 1]
];

const cards = await Promise.all(checks.map(async ([name, character, target], index) => {
  const data = JSON.parse(await fs.readFile(`assets/stroke-data/${character}.json`, "utf8"));
  const x = (index % 3) * 360;
  const y = Math.floor(index / 3) * 310;
  return `<g transform="translate(${x} ${y})"><rect width="340" height="290" rx="18" fill="#fffdf8" stroke="#c8d8d9"/><text x="20" y="30" font-family="sans-serif" font-size="20" font-weight="700">${name} · ${character}</text><g transform="translate(20 270) scale(.28 -.28)">${data.strokes.map((path, strokeIndex) => `<path d="${path}" fill="${strokeIndex === target ? "#be5b49" : "#b9c6c4"}"/>`).join("")}${data.medians.map((points, strokeIndex) => `<text x="${points[0][0]}" y="${points[0][1]}" transform="scale(1 -1)" font-family="sans-serif" font-size="72" font-weight="700" fill="#173c42">${strokeIndex + 1}</text>`).join("")}</g><text x="20" y="275" font-family="sans-serif" font-size="13" fill="#7d7162">red = current target · numbers = stroke order</text></g>`;
}));

await fs.mkdir("tmp", { recursive: true });
await fs.writeFile("tmp/stroke-audit.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1860" viewBox="0 0 1080 1860"><rect width="100%" height="100%" fill="#f4f1ea"/>${cards.join("")}</svg>`);
