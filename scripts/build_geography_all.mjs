import { buildPhilosophyPage } from "./build_philosophy_page.mjs";

const slugs = ["guilin", "highest-mountains", "panda-hometown", "yangtze-yellow-river"];

for (const slug of slugs) {
  await buildPhilosophyPage({ category: "geography", slug, target: "books" });
}
