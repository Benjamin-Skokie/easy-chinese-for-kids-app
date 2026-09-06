const builders = [
  "./build_architecture_all.mjs",
  "./build_art_all.mjs",
  "./build_clothing_all.mjs",
  "./build_culture_all.mjs",
  "./build_economy_all.mjs",
  "./build_figures_all.mjs",
  "./build_folk_customs_all.mjs",
  "./build_folk_tales_all.mjs",
  "./build_food_all.mjs",
  "./build_geography_all.mjs",
  "./build_inventions_all.mjs",
  "./build_literature_all.mjs",
  "./build_military_all.mjs",
  "./build_philosophy_all.mjs",
  "./build_politics_all.mjs",
  "./build_religion_all.mjs"
];

for (const builder of builders) {
  await import(builder);
}
