import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "chinese-new-year",
  "mid-autumn",
  "dragon-boat",
  "qingming",
  "chinese-zodiac",
  "lantern-festival",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "folk-customs", slug, target: "books" });
}
