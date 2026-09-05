import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "dragon-phoenix",
  "chinese-characters",
  "chinese-knot",
  "new-year-greeting",
  "kung-fu",
  "weiqi",
  "mahjong",
  "cuju",
  "polo",
  "family-titles",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "culture", slug, target: "books" });
}
