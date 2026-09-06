import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "mulan",
  "li-bai",
  "zheng-he",
  "luban",
  "cao-cao",
  "li-shi-zhen",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "figures", slug, target: "books" });
}
