import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "mulan",
  "qin-shi-huang",
  "li-bai",
  "zheng-he",
  "wu-zetian",
  "luban",
  "shang-yang",
  "cao-cao",
  "li-shi-zhen",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "figures", slug, target: "books" });
}
