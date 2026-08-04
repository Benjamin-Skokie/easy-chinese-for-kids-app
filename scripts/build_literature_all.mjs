import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "quiet-night-thought",
  "tang-poems",
  "song-ci",
  "journey-to-west",
  "three-kingdoms",
  "shan-hai-jing",
  "water-margin",
  "dream-red-chamber",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "literature", slug, target: "books" });
  await buildPhilosophyPage({ category: "literature", slug, target: "experiments" });
}
