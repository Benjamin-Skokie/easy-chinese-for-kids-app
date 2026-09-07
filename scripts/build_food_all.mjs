import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "chinese-cuisine",
  "dumplings",
  "chopsticks",
  "flavors",
  "tea",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "food", slug, target: "books" });
}
