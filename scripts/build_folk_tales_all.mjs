import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "chang-e-moon",
  "qixi-cowherd-weaver-girl",
  "monkey-king",
  "white-snake",
  "yu-gong",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "folk-tales", slug, target: "books" });
}
