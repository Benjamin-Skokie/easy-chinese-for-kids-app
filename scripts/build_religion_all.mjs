import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "buddhism-comes-to-china",
  "shaolin-kung-fu",
  "maitreya-buddha",
  "daoism",
  "lord-guan",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "religion", slug, target: "books" });
  await buildPhilosophyPage({ category: "religion", slug, target: "experiments" });
}
