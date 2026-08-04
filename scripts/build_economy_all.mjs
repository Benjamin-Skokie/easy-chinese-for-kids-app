import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = ["ancient-market", "ancient-money", "silk-road", "tang-cosmopolitan", "tea"];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "economy", slug, target: "books" });
  await buildPhilosophyPage({ category: "economy", slug, target: "experiments" });
}
