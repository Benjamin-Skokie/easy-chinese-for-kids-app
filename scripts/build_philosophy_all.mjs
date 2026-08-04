import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = ["yin-yang", "seed-dao", "confucius", "laozi"];

for (const slug of slugs) {
  await buildPhilosophyPage({ slug, target: "books" });
  await buildPhilosophyPage({ slug, target: "experiments" });
}
