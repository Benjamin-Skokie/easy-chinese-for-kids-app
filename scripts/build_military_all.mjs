import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = ["great-wall", "art-of-war", "ancient-armor", "mingguang-armor", "warships"];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "military", slug, target: "books" });
  await buildPhilosophyPage({ category: "military", slug, target: "experiments" });
}
