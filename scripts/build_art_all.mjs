import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "ink-wash",
  "peking-opera",
  "paper-cutting",
  "bianzhong",
  "calligraphy",
  "porcelain",
  "erhu",
  "dunhuang",
  "terracotta-warriors",
  "gongbi",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "art", slug, target: "books" });
}
