import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "guan-yu-blade",
  "gunpowder",
  "chariots",
  "kites",
  "paper-making",
  "compass",
  "abacus",
  "solar-terms",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "inventions", slug, target: "books" });
  await buildPhilosophyPage({ category: "inventions", slug, target: "experiments" });
}
