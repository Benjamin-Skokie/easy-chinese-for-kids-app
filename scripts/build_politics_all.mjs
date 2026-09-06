import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "emperor-day",
  "qin-shi-huang",
  "wu-zetian",
  "shang-yang",
  "six-arts",
  "imperial-exam-history",
  "exam-content",
  "yu-the-great"
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "politics", slug, target: "books" });
}
