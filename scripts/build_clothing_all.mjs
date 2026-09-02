import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "imperial-robes",
  "bufu",
  "tang-men-headwear",
  "tang-women-hair",
  "hanfu"
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "clothing", slug, target: "books" });
}
