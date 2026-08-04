import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "forbidden-city",
  "suzhou-gardens",
  "temple-of-heaven",
  "tulou",
  "pagodas",
  "zhaozhou-bridge"
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "architecture", slug, target: "books" });
  await buildPhilosophyPage({ category: "architecture", slug, target: "experiments" });
}
