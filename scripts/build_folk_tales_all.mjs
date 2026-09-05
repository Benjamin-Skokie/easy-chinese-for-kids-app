import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = [
  "chang-e-moon",
  "qixi-cowherd-weaver-girl",
  "white-snake",
  "yu-gong",
  "heading-north-to-go-south",
  "marking-the-boat-to-find-a-lost-sword",
  "the-spear-and-the-shield",
  "covering-ears-to-steal-a-bell",
  "the-old-man-who-lost-his-horse",
  "make-noise-here-move-there",
  "the-man-who-pretended-to-play",
  "grind-an-iron-rod-into-a-needle",
  "borrow-a-little-light-and-keep-learning",
  "add-the-eyes-and-the-whole-thing-comes-alive",
];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "folk-tales", slug, target: "books" });
}
