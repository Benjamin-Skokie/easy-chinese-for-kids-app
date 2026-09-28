# Eight-creature expansion: illustration record

Asset paths are relative to the repository root. Generated PNG filenames identify originals in this session's local Codex image archive; they are provenance records, not repository files.

Date: 2026-09-27
Mode: built-in ImageGen, eight separate new-image generations (not CLI and not edits).
Use case: illustration-story.

## Initial expansion assets

All paths below are relative to the repository root. Each image has a transparent background and is used both as a small map creature and as a full-body card illustration.

| Creature | Saved asset | Dimensions | Bytes |
| --- | --- | --- | --- |
| 应龙 Yinglong | culture/books/literature/shan-hai-jing/map/assets/yinglong.webp | 840 × 840 | 116,508 |
| 穷奇 Qiongqi | culture/books/literature/shan-hai-jing/map/assets/qiongqi.webp | 840 × 840 | 85,848 |
| 驺吾 Zouwu (superseded; see single-tail revision below) | culture/books/literature/shan-hai-jing/map/assets/zouwu.webp | 840 × 840 | 110,604 |
| 天狗 Tiangou | culture/books/literature/shan-hai-jing/map/assets/tiangou.webp | 900 × 900 | 101,566 |
| 三青鸟 Three Blue-Green Birds | culture/books/literature/shan-hai-jing/map/assets/sanqingniao.webp | 840 × 840 | 113,416 |
| 比翼鸟 Paired-Wing Birds | culture/books/literature/shan-hai-jing/map/assets/biyiniao.webp | 840 × 840 | 62,228 |
| 天马 Tianma | culture/books/literature/shan-hai-jing/map/assets/tianma.webp | 900 × 900 | 100,264 |
| 吉量 Jiliang | culture/books/literature/shan-hai-jing/map/assets/jiliang.webp | 900 × 900 | 112,974 |

Generated PNGs were converted to WebP without dropping the alpha channel. Every deployed image is below 120,000 bytes.

## Shared generation prompt

Create a single original creature specimen for a 6–10-year-old Chinese mythology picture-book map and a large creature discovery card. Refined hand-painted natural-history storybook illustration: fine gouache/colored-pencil fur or scales, soft dimensional shading, restrained texture, clear warm natural light, mysterious and alert but approachable. This must be a FULL-BODY ISOLATED CUTOUT with genuine TRANSPARENT ALPHA background, no scenery, no floor, no cloud, no text, no labels, no border, no signature or logo. Square canvas, entire creature including all wing tips, feet and tail inside the frame with 10% clear margin, centered balanced composition. Anatomically readable, not anime or chibi, not plastic 3D, not photorealistic horror. No human faces, no gore, no bared fangs, no aggressive open mouth.

## Subject prompt set — condensed directions

- **Yinglong:** A long serpentine Chinese dragon with four limbs and two wings, coiling tail, jade and cream scales, alert calm expression. Keep the wing tips, feet, horns and entire tail visible. The wings follow Guo Pu's annotation; detailed anatomy, color and feather design are artistic choices.
- **Qiongqi:** The winged tiger described in *Hai Nei Bei Jing*, orange fur with tiger stripes, two feathered wings, full body and tail, closed mouth. Do not mix in the ox/hedgehog description from *Xi Shan Jing*.
- **Zouwu:** A tiger-sized, many-colored feline creature with one exceptionally long flowing tail longer than its body; five softly integrated coat colors, soft fur and a curious expression. No human features or borrowed modern character design.
- **Tiangou:** A wildcat-like creature with a white head and a softly textured brown body. Gentle alert pose. No moon-swallowing scene or humanoid tengu features.
- **Three Blue-Green Birds:** Three separate complete birds, each with a red head, black eyes and blue-green feathers. Different natural poses, clearly separated bodies; one carrying a small berry as a visual interpretation of their food-fetching role. No shared body, multiple-headed bird or three-legged bird.
- **Paired-Wing Birds:** Two separate duck-like birds flying side by side, one blue-green and one reddish, each with one eye and one outward-facing wing. Two bodies and two wings in total, with no extra inner wings. Their arrangement and exact colors are illustration choices.
- **Tianma:** A white dog-like creature with a black head, fluffy fur, full body shown lightly airborne. Do not replace it with a horse or add unsupported wings. The text says it flies; it does not explicitly say it is wingless.
- **Jiliang:** A complete white horse with a red mane and golden-colored eyes, relaxed natural pose and fine hair detail. The eyes should look alive, not like metal.

Primary passages, annotations, variant descriptions and source-reading boundaries are recorded in [references.md](references.md). The art is a child-friendly interpretation, not a reconstruction of an ancient illustration.

## Single-tail Zouwu and four reading maps (intermediate iteration)

Date: 2026-09-27
Mode: built-in ImageGen. Zouwu is an edit of the existing illustration; the four landscapes were newly generated, with a correction pass on the western and other-chapters maps. No CLI generation was used.

### Exported assets from this iteration

Historical record: the four regional map drafts listed below and `map/assets/shan-hai-map-base.webp` were removed on 2026-09-28 because no current page uses them. Their filenames and prompts below document the discarded iteration; the draft image files are not included in the published source. The active `map-world.webp`, `map-world-preview.webp`, and creature illustrations were not changed.

| Asset | Dimensions | Bytes |
| --- | --- | --- |
| `culture/books/literature/shan-hai-jing/map/assets/zouwu-single-tail.webp` | 840 × 840 | 85,410 |
| `culture/books/literature/shan-hai-jing/map/assets/map-southern.webp` | 1448 × 1086 | 340,250 |
| `culture/books/literature/shan-hai-jing/map/assets/map-western.webp` | 1448 × 1086 | 164,956 |
| `culture/books/literature/shan-hai-jing/map/assets/map-northern.webp` | 1448 × 1086 | 284,492 |
| `culture/books/literature/shan-hai-jing/map/assets/map-other.webp` | 1448 × 1086 | 271,196 |

At this stage, the old `zouwu.webp` and continuous map background were retained as inactive drafts, not overwritten. The corrected Zouwu uses one continuous long tail. Four 4:3 map pages retained the source relationships recorded in references.md while deliberately separating unrelated journeys with pale mint gaps. Creatures remained separate clickable layers. Prompts describe intended geometry; actual exported placement was visually checked and refined in map-regions.js. These were illustrated reading maps, not measured geographic reconstructions.

### Zouwu edit prompt

Use case: precise-object-edit. Edit target: the attached Zouwu creature cutout. Correct ONLY its tail anatomy. It currently has an extra dangling S-shaped tail extending downward on the far right beside the rear paw. REMOVE that entire lower dangling tail and replace that area with genuine transparent alpha. KEEP just ONE single long fluffy tail emerging naturally from the rump, curving out to the right and then UP above the back into one broad elegant arc, ending at exactly ONE visible rounded furry tip above/left. There must be one tail root, one continuous unbranched tail, and one tail tip in the finished image. Its curved length is longer than the head-and-body length. Preserve the existing head, ears, expression, all four legs, pose, soft detailed fur, cream/charcoal/muted red/gold/teal coat, painted natural-history children's-book style. Do not grow another tail, do not add a lower tassel, do not let the tail fork, no ribbon-like appendages. Full body and whole single tail within square canvas with safe margins. Real transparent background, no backdrop, floor, shadow rectangle, labels or text. The bottom-right area where the second tail was must be empty transparency.

### Landscape prompts

#### southern

Use case: illustration-story. Create a beautiful, clear 4:3 LANDSCAPE illustrated exploration atlas page for children age 6-10 based on Shan Hai Jing Southern Mountains. NO ANIMALS OR PEOPLE: interactive creature cutouts and bilingual place labels will be added in code. No text, numbers, symbols, lettering, compass, borders, frames or map pins. Refined Chinese natural-history picture-book painting, gouache and colored pencil, bright clear natural light, jade/teal waters, restrained foliage, clean cream-pale-teal open space, rich but NOT busy, no haze, no muddy washes, no photorealistic satellite or game map.
CRITICAL COMPOSITION: THREE DISTINCT SCENIC VIGNETTES separated by broad clean pale-teal unpainted gaps. These are separate journeys, NOT one connected continent. Landscape illustrations seen from an elevated oblique viewpoint so streams and mountains are readable. Blank outer margin 5%.
LARGEST VIGNETTE fills upper half x=6–94%, y=7–49%. Two well-separated main mountain groups. LEFT mountain centered x22%, y24%: rocky green foothill with open land at x22,y30 for a small horse; a clear stream springs from its lower right foot and flows RIGHT/EAST from x25,y35 through x35,y38 toward a distinct receiving watercourse at x46,y39. Small turtle placement will be x33,y36 ON THE WATER. RIGHT mountain centered x75,y23: quiet jade hill with modest trees and a secluded fox clearing at x77,y29. Its OWN separate stream flows DOWN/SOUTH from x75,y32 into a small oval marsh at x76,y44. Do NOT connect the two streams. A few low intervening hills suggest travel between the two named mountain groups without making them adjacent peaks.
SECOND VIGNETTE fills bottom-left x5–60%, y60–93%. LEFT at x14,y72: completely BARREN rocky mountain, NO TREES OR GRASS, with many small clear water channels and a dry ledge at x15,y75 for an animal. Across a gap and several modest intervening rocky hills, RIGHT at x46,y72: a second completely BARREN gray-gold mountain without plants, with a stream at x46,y77 flowing DOWN/SOUTH to a receiving river near y85, then the receiving river turns RIGHT/EAST into a little sea edge at x58,y85. Reserve the water at x47,y80 for a small creature.
THIRD VIGNETTE bottom-right x68–94%,y61–94%, completely separated by blank space: one gracious pale-gold/jade mountain centered x81,y72 with a clear exposed perch at x81,y69; its stream flows DOWN/SOUTH toward a small sea inlet at y91. No volcano or lava.
Keep distinctive terrain readable and leave breathing space around all eight indicated landmarks. Render actual charming landscapes, not schematic icons or round floating islands. Whole composition visible, crisp landscape detail, 4:3 aspect ratio.

#### western

Use case: illustration-story. Paint a 4:3 LANDSCAPE children's picture-book atlas exploration page of the Western Mountains of Shan Hai Jing. NO animals, birds, people, buildings, labels, letters, symbols, pins, arrows or frames: overlays come later. Elevated oblique view, fine gouache/colored pencil, clear warm daylight, pale teal negative space, jade water, warm-gray rock, restrained greens, no haze, NOT a satellite map, not plastic isometric game art, not visually busy.
The main journey occupies x4–96%,y7–67%. WEST is LEFT and EAST is RIGHT. It progresses from a starting mountain at bottom RIGHT toward upper LEFT. Create EIGHT individually distinguishable mountain stations with generous open foothills and some small intervening distant ridges, NOT eight identical pyramid peaks.
1) At x89%,y57%: a graceful starting hill with a visible broad river running LEFT–RIGHT immediately NORTH/ABOVE it around y48%; a small marsh sits south of this hill at x89,y67%. Keep a clear flying-bird space at x90,y57.
2) Northwest of that hill at x78,y29: a gray-green mountain whose stream leaves the western/LEFT foot at x74,y37 and flows LEFT toward a pale sandy basin at x70,y41. A flying fish will be placed at x73,y38 over this stream.
3) At x66,y28: an elegant green-gray mountain with restrained shrubs and a clear animal foothill at x66,y36.
4) At x54,y28: a completely BARREN blue-gray/green-jade rocky mountain with NO trees or grass. Clear rock shelf at x54,y29 for a small bird and another ledge at x54,y39 for a feline creature, both visibly on this SAME mountain.
5) At x42,y28: a darker rocky hill with a clear animal ledge at x42,y35. A separate stream flows DOWN/SOUTH from x42,y38 to its own small marsh at x43,y49. Do not connect it to other streams.
6) At x30,y28: a distinct mountain group with a clear perch at x30,y33 for THREE small birds, modest shrubs.
7) At x18,y28: a warm gold/jade mountain, open slope at x18,y33. A stream travels DOWN-LEFT/SOUTHWEST from its foot toward a small valley pool at x12,y47.
8) At x7,y28: a completely BARREN pale rock mountain at water's edge, with NO trees or grass; a clear rocky perch at x7,y35 for a bird.
SEPARATE SECOND JOURNEY: a single isolated vignette centered x29%,y81%, occupying x10–49%,y72–94%. Leave a broad unpainted pale-teal gap between this and the main journey. This vignette is a white-jade rocky mountain with copper-colored lower slopes, and an open foothill at x30,y84. NO trail or river may connect it to the top journey. Remaining bottom-right space is quiet pale teal for UI explanation, not filled with random mountains.
Render tactile natural mountain scenery not icons. Keep river directions and bare-vs-vegetated differences very clear. Whole composition framed with 4% margins, 4:3 aspect ratio.

#### northern

Use case: illustration-story. Create a clear and beautiful 4:3 landscape illustrated exploration atlas page for children based on the Northern Mountains in Shan Hai Jing. Elevated oblique view, fine gouache/colored pencil natural-history storybook art, calm bright natural light, crisp rock textures, restrained green foliage, teal waterways and pale-teal paper gaps. NOT a satellite map, not a game board, no fog or muddy washes. NO creatures, people, words, numbers, borders, frames, labels, pins or arrows.
FOUR DISTINCT illustrated vignettes with broad pale-teal gaps. Only the TWO left-hand mountain scenes have a subtle continuous valley connection; all other scenes remain geographically separate.
LEFT strip x6–42%,y9–91% depicts a NORTH-SOUTH pair of mountains, north at top.
UPPER LEFT center x28%,y26%: a completely BARREN gray/blue-jade rocky mountain with NO trees, grass or shrubs; many rocky crevices, an animal ledge at x29,y31. A small clear stream at its foot flows LEFT/WEST from x23,y34 toward a short receiving river at x10,y35.
LOWER LEFT center x28%,y71%: a green mountain with modest cypress-like evergreen trees, woody shrubs and a clearing on DRY LAND at x31,y74; a separate stream leaves its western foot at x24,y79 and flows LEFT/WEST into a separate receiving watercourse at x10,y80. Do NOT merge the upper and lower streams. A simple winding land path between the two mountains shows the lower one lies south of the upper one.
UPPER RIGHT isolated vignette x55–93%,y8–42%: a broad mountain centered x73,y22 with patterned stones, pale mineral glints on its shaded slope, small amount of low vegetation; clear open AIR just above a dry rocky shoulder at x77,y27 for a flying dog-like creature. Do not add a river to this mountain.
LOWER RIGHT x53–94%,y54–91%: an inland green mountain with mulberry-like trees centered x65,y66; visible sticks/pebbles in the woodland edge and a clear perch at x65,y71. Its stream runs RIGHT/EAST from the eastern foot x71,y75 to a short receiving RIVER at x78,y75. This river must end as a river, NOT empty straight into the sea. Farther RIGHT, across a broad unpainted pale-teal gap x80–84%, paint a separate small EASTERN SEA vignette from x85–96%,y61–88%, deep blue water, tiny white breakers and no connecting land bridge. Keep the forest mountain distinctly INLAND and separated from the sea by the gap, because a bird's long journey will be explained in UI.
Do not visually connect the two right-hand mountains or invent neighbors for them. Clear breathing room for later bilingual labels, modest detail and no dark drama. Whole composition visible in 4:3 landscape.

#### other

Use case: illustration-story. Paint a beautiful 4:3 LANDSCAPE picture-book atlas page containing EIGHT SEPARATE small landscape vignettes arranged in TWO ROWS OF FOUR for a Chinese mythology exploration map for ages 6-10. These are independent places from different chapters, not neighboring lands: leave broad clean pale-teal paper gaps between ALL eight scenes, with no connected roads, rivers, coastline or landscape across the gaps. Refined natural-history gouache/colored-pencil storybook, clear bright daylight, calm warm-gray stone and teal water, soft natural shading, no haze, no muddy antique paper, no plastic isometric game style. Each vignette is an oblique natural scenic view, not a round floating island or emblem.
NO animals, people, buildings, words, labels, numbers, borders, frames, arrows or symbols; code will add small creature cutouts and bilingual labels.
Vignette centers in the upper row are x14%, x38%, x62%, x86%, all roughly y27%, each occupying about 20% width and 33% height.
TOP LEFT: a modest mountain with leafy paper-mulberry-like trees, a quiet dry forest clearing at x15,y29, no river.
TOP SECOND: a mountain with warm red-ochre shaded slope and pale jade sunlit rocks, restrained plants and a dry animal ledge at x39,y29, no river or flood.
TOP THIRD: a soft grassy hill centered x62,y31, NO giant exposed cliff; a spring stream flows UP/NORTH from this hill at x62,y30 to a small marsh ABOVE it at x63,y15. Reserve a dry open patch at x65,y32.
TOP RIGHT: a quiet southern rainy landscape, small rain cloud above and gentle fine rain over greenery and water, an open air/waterside space at x86,y28 for a dragon. Still bright and inviting, not a thunderstorm.
Bottom-row centers x14%,x38%,x62%,x86%, y76%, each occupying about20%width and34%height.
BOTTOM LEFT: an unmistakably OFFSHORE isolated rocky mountain island surrounded on ALL sides by deep eastern-sea water, no mainland touching it; clear shallow water edge at x16,y79 for a creature. Gentle wind and whitecaps, no hurricane.
BOTTOM SECOND: independent modest unnamed rocky plain with a few low hills, NO fabricated famous mountain or palace, open dry ground at x39,y77.
BOTTOM THIRD: separate quiet land with light low vegetation and room at x63,y77 for a long-tailed creature. Do not turn this into dense forest or city.
BOTTOM RIGHT: separate broad grassy land with a few low hills and a clear open patch at x87,y77 for a white horse, no palace or fantasy settlement.
All eight scenes have comparable detail and a natural irregular painted edge into pale teal, no decorative round borders. Open gaps at y48–55% and between columns must make the independence obvious. 4:3 landscape, clear full composition, children-friendly.

### Western correction prompt

Use case: precise-object-edit. Edit this Western Mountains atlas illustration. Preserve the exact canvas/aspect ratio, positions, shapes, rock colors and character of all the main mountains, especially the barren pale peak in the center and the detached white/copper mountain vignette at bottom-left. Correct ONE major issue: the surrounding turquoise negative space must be UNPAINTED PALE MINT-TEAL PAPER, NOT AN OCEAN. Remove every open ocean, coastline foam, marine island, ocean horizon and marine background. Remove the tiny rocky islands in the wide gap between the top journey and the detached bottom-left scene. Fade those edges cleanly into solid very pale mint paper #edf6f2. The bottom-left mountain must be a detached LANDSCAPE VIGNETTE on paper, not a sea island. Keep the internal small rivers, streams and freshwater marshes within the upper land illustration, including the broad river immediately north of the rightmost foreground mountain. Keep their water blue so it is clearly DIFFERENT from the nearly-white paper gaps. The three small western streams should end in separate small local freshwater pools/marshes, never a giant enclosing ocean. Remove unneeded far distant islands above the main mountains, leaving pale paper breathing space. No new animals, people, text, borders, labels, arrows, roads or decorations. Clear charming hand-painted storybook map, airy and not busy, whole scene sharp.

### Other-chapters correction prompt

Use case: precise-object-edit. Edit ONLY the TOP ROW THIRD VIGNETTE (the grassy hill and marsh, centered 62% across the canvas) of this eight-scene atlas page. All other seven scenes, gaps, composition, colors, dimensions and art style must stay unchanged. This third scene represents a stream that flows NORTH, toward the TOP of the image, from a hill into the marsh behind it. The current waterfall visibly flows the WRONG WAY toward the foreground. REMOVE the foreground waterfall and all water spilling toward the bottom edge. Replace it with a rounded green foreground hill whose spring emerges near x62%,y35%, then a narrow gentle stream winds AWAY from us TOWARD the TOP through a low valley, ending IN the marsh near x62%,y14%. The foreground hill should be higher ground and the distant northern marsh should be a low basin. No waterfall or downstream outlet toward the viewer. Use a quiet continuous watercourse with no foam implying reversed flow. No big rocks in this third scene, mostly grassy soil, small trees, reeds. No labels, letters, creatures, arrows, compass or symbols. Preserve original refined clear picture-book painting and all remaining content exactly.

## Continuous world and landscape-diversity revision — 2026-09-27 (superseded terrain revision)

Generated and edited with the built-in ImageGen tool, using the imagegen skill. No fallback CLI or image-generation API runner was used. WebP export was performed locally with cwebp; the source PNGs remain unchanged.

| Current asset | Native pixels | Bytes |
| --- | --- | --- |
| `culture/books/literature/shan-hai-jing/map/assets/map-world.webp` | 1448 × 1086 | 869,142 |
| `culture/books/literature/shan-hai-jing/map/assets/map-world-preview.webp` | 880 × 660 | 107,340 |

The full world has a 1,500 KiB exception. Its logical layout canvas is 3072 × 2304, not the bitmap's native resolution. The preview and creature assets retain the ordinary 120 KB budget. The earlier four-page landscapes and first continuous draft are inactive. Creatures are separately positioned and remain interactive in one connected world; regional controls move the camera instead of replacing images.

First continuous draft: `exec-c7bf9149-cd05-41a5-a995-dc309ecc8192.png`.
Final diverse-landscape edit: `exec-86f16f5f-54d7-4951-984f-6a29d85b07cc.png`.

Visual QA: open grassland, conifer forest, broadleaf woodland, dry sandstone/mineral country, extensive reeds and water, bamboo valleys, bare waterfall-cut coast, and a rainy southeastern valley are distinct connected environments. Their particular climate and geological styling are artistic interpretation, not one-biome-per-chapter claims. Water labels encode source directions; the painterly network is not an exact drainage reconstruction. Xuangui, Wenyaoyu, and Gudiao were repositioned toward visible water, and Zheng and Bifang toward the same bare rock group after reviewing the actual output.

### Original continuous-world prompt

Use case: illustration-story.
Asset: one large continuous explorable world landscape for Nihao World's Shan Hai Jing picture-book map, children ages 6–10. Generate at 3072 × 2304 pixels if available, or the highest genuine native resolution with a 4:3 landscape aspect ratio. Fine clear detail for zooming is essential.
PRIMARY REQUEST: ONE SINGLE UNBROKEN IMMERSIVE LANDSCAPE filling the whole canvas, NOT an atlas, NOT a collection of vignettes, NOT detached postage-stamp islands, NOT a diagram. Hills, valleys, woodland paths and streams naturally connect one part of the mainland to the next. The child should want to travel across and look closely. All below locations are approximate layout anchors, not labels to print.
View: high oblique bird's-eye picture-book view, looking down on a broad mythic continent, north at top, east at right. NO visible sky or horizon. Mainland fills most of x=4–81%, y=10–92%. Turquoise EASTERN SEA fills the rightmost 18–20%, with a distinct rocky offshore island at x=91%,y=65%. Thin northern sea at the top and southern sea at the bottom wrap around the mainland. At far upper right, beyond the northern/eastern waters, distant wild headlands give a glimpse of the Great Wilderness. Coast and terrain organic, not a rectangle or real modern China. Do not subdivide the artwork with empty paper, borders, grids, separate panels or fog.

LANDSCAPE SKELETON AND IMPORTANT LOCAL FEATURES:
WEST (left third, connected complex mountain country): a wandering chain of eight different small mountain groups, progressing from an eastern green mountain at (40%,60%) northwest to (36%,44%), then west toward (31%,45%), (26%,46%), (21%,46%), (16%,44%), (11%,40%), and (6%,43%). Keep them varied in silhouette, nestled into one connected region, NOT eight identical cones or aligned specimen icons. The mountain at (26%,46%) and the far western mountain at (6%,43%) are BARREN BLUE-GREY AND JADE ROCK, without grass or trees on their slopes, with exposed ledges for creatures. At (11%,40%), warm gold rock, a little stream leaving toward the southwest into a small valley at (6%,53%). At (21%,46%), a small stream flows south into a marsh around (21%,59%). At (36%,44%), a stream bends west into a sandy watercourse around (30%,50%). The low green mountain at (40%,60%) has a river passing to its north. Another smaller white-rock and red-copper hill sits in foothills at (13%,65%), visually distinct but naturally joined by valleys, not floating alone.
NORTH (top mainland): at (40%,18%) a bare blue-grey stony mountain without trees, its small stream flows west; below it at (40%,30%) a wooded hill with cypress-like trees and a DIFFERENT small stream flowing west. At (55%,18%) rugged patterned rocks. At (65%,30%) a leafy inland mountain grove, with a stream running east into an inland north-south river around (74%,31%); do not empty that stream straight into the sea. Between these mountains and the eastern shore are intervening smaller foothills. Upper-left mainland around (13%,20%), (23%,23%), (29%,13%) has open meadows, scrub, rocky hollows and winding paths, not additional islands.
CENTRAL (middle): a beautiful broad valley and low rolling connected hills, a woodland glade with light leaves at (49%,50%); a warm ochre/jade rocky hillside at (59%,57%). Calm, open clearings allow visual rest. Fine little paths, rocks, diverse trees and patches of flowers, but not a maze and not manmade towns.
EAST (near right mainland): at (74%,57%) a green-and-golden low mountain/knoll, with a stream starting near it and winding NORTH into a visible reed marsh around (74%,45%). Do not put a south-facing waterfall here.
SOUTH (bottom mainland): mountain woods at (31%,71%) with a distinct little stream flowing EAST through (38%,76%) to (45%,76%). Farther east, woods and green-jade cliffs at (55%,73%) with a DIFFERENT stream flowing SOUTH into an inland marsh near (55%,84%). At (17%,84%) and (29%,85%) two bare rocky southern mountains rich in water, no plants on their main slopes; connect them through rocky valleys with some intervening ridges, not adjacent isolated icons. A stream below the latter flows south then turns east near the bottom edge. At (65%,73%) a warm ochre/golden mountain with ledges and a stream running south into the southern sea at (65%,94%). The southeast around (73%,85%) is a lush rainy river bend, with just a small localized light rain cloud, no blanket fog. All southern land is organically connected to central and western mainland.

Style: exceptionally beautiful refined Chinese-myth picture-book painting, polished naturalistic digital gouache and colored-pencil detail, clear air, luminous natural light, mossy jade/teal greens, mineral grey and ochre rock, clear blue-turquoise water. Believable rocky geology, small readable trees, nuanced shadows. Rich enough for prolonged looking but balanced with calm water and open valleys. Mysterious through depth and enticing paths, not gloom, haze or spooky features. Avoid muddy watercolor washes, plasticky 3D, photorealistic satellite map, gaming terrain render, repetitious mountains, highly saturated lime green.
NO creatures, animals, people, faces, icons, pins, labels, words, compass rose, border, legend, text or watermarks. We will add our existing 28 creatures as small interactive layers. Keep landscape scale large so creatures will be much smaller than mountains. Do not draw a giant central peak that dwarfs every other visual. Do not draw the landscape as separate cutouts: land and vegetation must run continuously between all areas.

### Final diversity edit prompt

Use case: illustration-story edit.
Input image 1 is the EDIT TARGET, the continuous Shan Hai Jing world map. The user approves one continuous world but says it looks repetitious everywhere: similar green hills, scattered identical trees, bare or red peaks. Correct that specific failure through much stronger LARGE-SCALE LANDSCAPE DIVERSITY, not more decorative detail.
Keep the 4:3 canvas, one connected mainland, north at top and large Eastern Sea at right, offshore rocky island near (91%,65%), general mountain/river anchor positions, refined painted picture-book style, clear daylight, no creatures or text. Keep full canvas. Use maximum native resolution available. Preserve the directional geography; do not rotate or mirror anything.

THE CHANGE:
Reduce the omnipresent repeated small conical mountains, dotted trees, loops of paths and rocky islands. Distinguish terrain through different silhouettes, landforms, density, water patterns and vegetation, not just colors. These large environments should be recognizable even at thumbnail scale. Make them flow seamlessly into each other; absolutely no panels, borders, detached vignette cutouts or empty paper gaps.

1. UPPER LEFT, x6–32%, y10–29%: a truly OPEN northern grassland basin, broad sweeping tan-green grasses, one winding dry-earth path, a few isolated broad-canopied trees, shallow rolling contours, distant weathered ridges. Remove most small random mountains and tree clumps from this area. Space and a long sightline are the attraction.
2. WESTERN BAND, x3–32%, y34–64%: dry mineral country with a mix of sculpted sandstone canyon walls, horizontal ledges, narrow rocky ravines, a few white jade-like stone towers, and a warm ochre boulder field. Not a row of identical pyramid peaks. Far west at (6%,43%) and the bare mountain at (26%,46%) must stay entirely without plants on their rock faces. Tiny plants only in other valleys. Keep the westward river from approximately (36%,44%) to (30%,50%); southward stream from (21%,46%) to a reed pool at (21%,59%); southwestward water from (11%,40%) into (6%,53%). Rivers are small natural features, not canals around every hill.
3. NORTH CENTER, x34–47%, y23–35%: a clearly distinct deep cypress/conifer WOODLAND with close dark pointed crowns and a sheltered clearing around (40%,30%). The bare grey-blue mountain above at (40%,18%) stays treeless. The contrast should feel like bare high stone above a forested lower valley, not the same scattered trees everywhere.
4. CENTER, x43–62%, y40–63%: a generous lush BROADLEAF FOREST with rounded overlapping layered canopies, tree-trunk glimpses, dappled light, a small woodland opening at (49%,50%), a fallen log and mossy stones. Not a grassland sprinkled with tiny trees. At (59%,57%) let this open naturally onto an ochre rocky terrace with jade-colored stone. Keep some central meadow space but do not let meadow texture dominate the entire world.
5. EASTERN INTERIOR, x68–80%, y36–59%: a broad FLAT WETLAND, glinting still-water lagoons, dense ribbons of ochre reeds, mudflats, small sinuous channels, no conical hills or continuous forest in its center. Keep a single green low knoll near (74%,57%) and its stream winding NORTH into the wetland near (74%,45%). This stream must not be shown dropping down south-facing waterfalls. A distinct flat watery landscape, not a river between identical green slopes.
6. SOUTHERN WOODS, x26–60%, y66–82%: warm luxuriant southern woodland with broad leaves, a few bamboo-like groves and leafy ravines; clear rocky POOLS and shallow rushing STREAMS, not northern conifer forest. Mountain around (31%,71%) has a stream running EAST past (38%,76%). Separate wooded mountain around (55%,73%) drains SOUTH to a marsh at (55%,84%). Make the trees and undergrowth visibly unlike the northern forest. Rocks and streambanks leave hiding places.
7. SOUTHWEST near (17%,84%) and (29%,85%): retain the two dramatic BARREN GREY ROCK mountains, rich with water but without trees on their main slopes; connect by a rocky gorge, ledges, waterfalls and broad pale stone surfaces. Distinguish these folded grey rock forms from the horizontal warm western canyon walls.
8. SOUTHEAST x62–78%, y68–92%: warm ochre mountain around (65%,73%) with a stream flowing south into the southern sea; beside it, a deeply green RAINY GORGE around (73%,85%), dark wet rock, dense leaves, one delicate localized rain cloud and sheltered pool. Local atmospheric contrast only; don't cover the map in mist.
9. EAST COAST AND SEA: vary the shore with one clean sandy cove, jagged sea cliffs, flat intertidal shelves and pale turquoise shallows. Keep large expanses of OPEN BLUE WATER so the offshore Liubo island feels remote, not just one of a hundred crowded pinnacles. Keep the island at (91%,65%) and distant wilderness headlands at top right. Remove most tiny repeated rocky islets from the eastern sea.

Make diversity structural and substantial, not rainbow-coded. A child should be able to say 'the grassland', 'the dark forest', 'the canyon', 'the reed marsh', 'the river pools', and 'the distant island' without reading labels. Richness comes from changing environments and intriguing landforms, not filling every inch with the same little rocks.
No added human settlements, farms, roads, animals, monsters, people, faces, text, icons, symbols, UI, markers or watermarks. No patchwork/map grid/panel layout. No video game terrain rendering, no photorealism, no muddy colors or general fog. Preserve a beautiful luminous storybook painting.

## Grounded world and contained cards — 2026-09-27 (current)

This revision supersedes the terrain bitmap and byte counts in the preceding diversity iteration, while retaining its single connected world. Built-in ImageGen was used for all three raster edits, guided by the imagegen skill; no fallback image-generation API or CLI was used. Local cwebp only exported and compressed the resulting PNGs. The unmodified source PNGs remain in the generated-images directory.

| Active asset | Native pixels | Bytes |
| --- | --- | --- |
| `map/assets/map-world.webp` | 1448 × 1086 | 713,492 |
| `map/assets/map-world-preview.webp` | 880 × 660 | 95,614 |
| `map/assets/kui-ox.webp` | 900 × 675, alpha | 64,136 |
| `map/assets/fuzhu-pearl.webp` | 840 × 840, alpha | 74,152 |

The world alone retains the 1,500 KiB exception. All active creature assets and the small preview are below 120,000 bytes. The landscape's 3072 × 2304 coordinate system remains logical, not native resolution; desktop preview uses responsive image selection instead of stretching the small preview.

### Art and integration decisions

- Central Huo and Ao'an and the southern wooded mountains now have visible ridges, rock faces and elevation. Their precise shapes, the illustrated tree species and linking terrain remain artistic interpretation, not an ancient survey. Huo is 霍山, not a source-backed volcano.
- Actual dry ledges/clearings in the final painting determine the sprites' contact points. Land creatures are anchored at their feet rather than at the center of the transparent source canvas. Soft contact shadows and small irregular foreground cutouts from the SAME landscape improve depth; this does not turn the separate interactive sprite layers into animals painted into the bitmap.
- New alpha-bound metadata trims transparent padding only in the map presentation. Catalog and story art uses contained images with safe margins: no toes, wings or tails extend outside the colored image band.
- Kui has a broad bovine muzzle and body, no horns, one cloven-hoofed leg, short blue-gray fur and a thin cow tail. The lion-like mane and decorative fur of the old inactive image were removed.
- Fuzhu remains a white deer with four individually visible horns; pearly light, alert eyes and a poised step add liveliness without inventing a strongly colored coat.
- Three Blue-Green Birds, paired-wing birds, Qiongqi and Yinglong were visually checked. The existing illustrations show three birds; two paired birds each contributing one wing; a winged tiger; and a winged dragon, respectively. No unnecessary redraw was made.
- Repeated tail shapes on the fox, Zheng and other existing creatures are explicitly deferred at the user's request.
- Overview labels are only West, North, Center, East, South and Eastern Sea. Northern Sea/wilderness labels appear at detail zoom. Place labels use Chinese and plain English, without a separate pinyin line. Creature-name pinyin remains.

### Verification

Browser checks at 1440 × 1000 (desktop), 1024 × 768 (iPad landscape), and 390 × 844 (narrow phone) found no horizontal page overflow and no images outside any of the 28 catalog image bands. The phone story card's image and close button fit within the screen and the longer reading area scrolls. All 28 active image requests loaded, and the browser error log was empty. Regional visual review moved Tiangou to a visible bank, Dijiang/Jiao/Zhuyan to rock tops, Ershu to a dry forest-edge ledge, Mengji to a bare stone shoulder, Dangkang to the grassy knoll, and Fenghuang to an ochre perch. Liubo's label was aligned with the large offshore island. These contact points remain artistic layout coordinates, not new source geography claims.

Automated checks cover all 28 alpha bounds and complete image footprints, ground/air anchoring, source directions, shared mountain names, one continuous world, responsive camera fitting, overview labels, no place-pinyin UI, contained card art and image byte budgets. The full project check passed 207 tests. The largest active creature WebP is 119,054 bytes.

### Exact edit prompts and source outputs

#### Mountain relief and usable ground

Input: `culture/books/literature/shan-hai-jing/map/assets/map-world.webp` (the pre-edit asset).
Source output: `exec-709f4806-9075-4796-80d1-8e3d9e51c9ad.png`.
Active export: `map/assets/map-world.webp`.

Use case: precise-object-edit. Image 1 is the EDIT TARGET, the existing continuous illustrated Shan Hai Jing landscape. Preserve its 4:3 aspect ratio, single connected landmass, coastline, north-up layout, northeastern sea, eastern offshore island, western sandstone canyons and barren mineral peaks, northwestern open grassland, northern bare mountain and conifer forest, eastern reed wetlands. Do not change these established geographical anchors. No animals, people, text, icons, borders or labels; interactive animals will be added separately.
Correct the central and southern landscape: they currently read as flat tree canopies without mountains. Make their actual elevation unmistakable while retaining beautiful variation.
CENTRAL area x43–63%, y37–62%: add two clearly modeled MOUNTAIN masses with ridgelines, exposed gray/ochre rock shoulders and steep wooded slopes. Huo Mountain centered at x48%,y43%, rocky summit around y36%, broadleaf trees on its flanks, dry gently tilted forest clearing/rock ledge centered x49%,y52% in FRONT of the trees. Ao'an centered x60%,y51%, a higher pale-jade/ochre ridge with an open dry ochre ledge at x59%,y59%. Keep these two peaks separate enough to read, joined by a natural valley, not isolated sticker-shaped vignettes. Keep eastern wetland open and flat.
SOUTH x27–61%,y61–84%: create readable rolling mountain ridges and rock faces rising ABOVE the bamboo and broadleaf groves. Niuyang is an identifiable green-gray mountain rising at x31%,y64%, summit near y60%. In its lower right foothill make an unobstructed dry EARTH clearing at x33%,y74%, about 5% canvas width, naturally surrounded by trees behind and low rocks beside it. It must be visible ground, NOT tall bamboo/tree crowns, for a horse-sized creature's feet. A shallow creek from the mountain runs toward the RIGHT/east to x39%,y80%. Qingqiu is a distinct wooded mountain around x53%,y70%, with visible ridgeline and rocky face, a quiet dry ledge at x55%,y75% with foliage behind it, a separate small stream south to the marsh at y84%. Preserve the southeastern warm golden mountain near65%,73% and rainy waterfall valley near73%,85%. Keep southwestern bare gray water-cut mountains near17%,84% and29%,87%; no added trees there.
Grounding requirements: small dry shelves and clearings for animals at the existing west/north positions must be actual rock/earth surfaces, not the tops of foliage. Most important are central49,52;central59,59;south33,74;south55,75;north40,32. Surround the clearings naturally with low vegetation/rock edges, not circles, platforms or empty white spots. This is a large landscape; keep tree-to-mountain scale believable, far from identical cone-shaped hills.
Style: polished hand-painted Chinese children's picture-book landscape, softly detailed gouache/digital painting, calm clear light, clean mineral color, varied silhouettes and convincing height. Keep the existing palette and natural diversity. Avoid photorealistic satellite maps, videogame terrain, heavy haze, repeating pyramid mountains, exaggerated cliffs everywhere, farmland, buildings or new islands. No frame. Render at the highest genuine available 4:3 resolution.

#### Kui: a hornless one-legged ox

Input: `culture/books/literature/shan-hai-jing/map/assets/kui.webp` (the pre-edit asset).
Source output: `exec-d8c8c4fe-c38e-4ef7-bb50-cac0d8c54aa9.png`.
Export: `map/assets/kui-ox.webp` (now inactive). On 2026-09-27, the user requested restoring the earlier, less realistic illustration. The map, catalog and reading card now use `map/assets/kui.webp` (900 × 675, transparent WebP, 81,838 bytes). Its alpha bounds were remeasured for correct map placement. Both original files are retained; no image was regenerated for this restoration.

Use case: precise-object-edit. Image 1 is the EDIT TARGET: a previous inaccurate Kui illustration. Redraw this creature so it unmistakably looks like an OX or cow, NOT a lion, cat, horse or fantasy dog. Keep a calm child-friendly natural-history picture-book painting and the full creature isolated on a GENUINELY TRANSPARENT background.
Required source anatomy: large broad bovine muzzle with wide nostrils, long bovine face, sideways rounded cow ears, thick cow neck and barrel-shaped bovine torso; blue-gray/slate-teal SHORT coat; absolutely NO horns. Exactly ONE sturdy leg beneath the chest/body, ending in a single cloven bovine hoof. No hidden extra legs. One thin natural cow tail with one modest dark tuft, not a flowing lion/horse tail. Remove all the elaborate lion mane, beard, decorative swirl markings and long flowing fur. A small gentle reflective pale sheen can suggest a magical being, but do not add symbols or jewellery. Gentle alert dark eyes, quiet sturdy posture, three-quarter side view facing left. Wholesome and slightly mysterious, no snarling, no claws, no aggressive expression. Clean softly shaded digital-gouache illustration with fine short fur, readable anatomy. Full muzzle, ears, one leg, hoof and tail fully in frame, 10% safe margins. No ground, stones, water, halo, backdrop, shadow rectangle, letters or labels. Transparent alpha outside the creature, not painted white and not a checkerboard.

#### Fuzhu: an alert four-horned white deer

Input: `culture/books/literature/shan-hai-jing/map/assets/fuzhu.webp` (the pre-edit asset).
Source output: `exec-e672ea5d-2270-45e5-b4e9-dd120bb7b445.png`.
Active export: `map/assets/fuzhu-pearl.webp`.

Use case: precise-object-edit. Image 1 is the EDIT TARGET: Fuzhu, a four-horned white deer. Preserve its textual identity as a WHITE DEER with FOUR separate horns and four graceful legs, not a qilin, reindeer herd or rainbow animal. Improve this illustration's grace, alertness, beautiful light and sense of quiet wonder.
Make a slender elegant deer with a lifted head, large clear expressive dark eyes with a small bright reflection, softly translucent warm inner ears, very fine luminous WHITE fur. Subtle pearl, cool pale jade and very pale blue reflected tones in the white coat, delicate warm ivory light along the back: mostly white, NOT strong colored markings. Natural delicate anatomy, relaxed long neck, softly layered little chest fur, four elegant nonidentical subtly curving unbranched horns emerging from four distinct roots in two front/rear pairs, all FOUR tips clearly visible with separation. Horns ivory with subtle warm gold shading, no metal, jewellery, gems or ornate patterns. One foreleg raised slightly in a poised listening step; other feet at compatible ground level. One natural deer tail. Mysterious and watchful but not seductive or babyish.
Polished Chinese children's natural-history picture-book gouache/digital painting, graceful softly detailed fur, clean edges, no dramatic magic particles, halo or neon glow. Keep full-body three-quarter side view facing left, complete horns, ears, hooves and tail inside square canvas with generous 10% safe margins. GENUINELY TRANSPARENT alpha background. No landscape, floor, grass, pedestal, shadow rectangle, text, labels or frame.

## Dijiang: six visible feet — 2026-09-27

The user correctly noticed only five countable feet in the earlier active Dijiang asset. *Shan Hai Jing*, Western Mountains, Tianshan passage, explicitly describes six feet and four wings: https://zh.wikisource.org/zh-hans/山海經/西山經 . The wording was retained and the image corrected.

This focused edit used the imagegen skill and the built-in ImageGen tool. No fallback CLI/API generation was used; cwebp was used only for WebP export. The map, catalog and reading card share the new image. The original five-visible-foot asset remains inactive.

Final asset: `culture/books/literature/shan-hai-jing/map/assets/dijiang-six-feet.webp`.
Export: 900 × 675, transparent alpha, **75,004 bytes**, within the 120,000-byte budget.
Original source PNG: `exec-16312a2c-df36-49be-9af7-c19de59ac8a6.png`.
Alpha bounds: left 46, top 10, artwork width 831, height 656. Map geometry metadata was updated to preserve foot anchoring.

### Visual count and rejected draft

The first edit produced **seven** feet and was rejected without being integrated into the page. Its source PNG is `exec-e9c737ad-21a4-4917-b945-05172a94424f.png`. A targeted second edit removed the small extra leg directly under the center of the belly.

Manual inspection of the final art counts six separate hooves: outer left, smaller rear left, large near left, large near right, smaller rear right, outer right. Four wings remain visible and the body has no face. The exposed central gap makes the count clearer. This is a manual visual check, not an automated anatomical-count claim.

### Initial edit prompt (rejected seven-foot draft)

Use case: precise-object-edit.
Image 1 is the EDIT TARGET, the current Dijiang creature illustration. Correct ONLY its leg anatomy while preserving its faceless plump yellow-and-red sack-like body, existing red/gold cloud markings, its FOUR feathered wings, gentle picture-book painting style and transparent background. This image is used in a children's educational card about Shan Hai Jing.
ERROR TO FIX: the current image shows only FIVE countable feet. The book describes SIX FEET and FOUR WINGS. The corrected illustration must show EXACTLY SIX complete distinct short legs, each ending in ONE rounded gray-gold hoof/foot. Every one of the six feet must be visible and individually countable by a six-year-old, with clear empty space between its silhouette and the next foot. Do not hide a foot behind the body, another leg or a wing. No ambiguous little bumps passing for a sixth foot.
Recompose the lower-body leg arrangement as THREE NEAR-SIDE LEGS plus THREE FAR-SIDE LEGS, staggered so all six feet are separately visible beneath or just beside the lower body. Use a gently dancing pose and a slightly low three-quarter viewpoint, not a flat six-spoke wheel. The far-side feet appear in the gaps between the near-side legs; preserve enough of each leg's visible length to read as a complete leg. The six feet can terminate at different heights and the leg bends may vary naturally. The count must be six, not five or seven; no extra toes, arms or limb-like decorative curls.
Keep the FOUR original wings clearly distinct: two upper raised wings and two lower outward wings. Do NOT add a fifth wing or sacrifice a wing to make a leg. The round body remains without a face: no head, eyes, nose, mouth or ears. No horns, no tail, no scary claws, no face or belly button. Maintain the friendly mysterious original, original warm yellow-red palette and soft detailed hand-painted feathers.
Full creature centered inside a 4:3 landscape canvas, all four wing tips and all six feet fully inside frame with safe margins. GENUINELY TRANSPARENT alpha background. No floor, grass, shadow rectangle, sky, checkerboard drawing, labels, counting numerals, diagram marks, arrows or text. Do not change this into a different character.

### Final corrective edit prompt (accepted)

Use case: precise-object-edit.
Image 1 is the edit target. Make ONE VERY LOCAL REMOVAL, preserving everything else exactly.
This Dijiang currently has SEVEN hoofed legs. Remove the SMALL CENTRAL REAR LEG directly underneath the middle of the belly. It is the short leg with gray hoof at approximately x=52%, y=82% of the canvas, hanging in the gap BETWEEN the two big foreground legs. Remove that entire small central leg and its hoof, from the curved bottom edge of the belly downward, and make the resulting gap genuinely TRANSPARENT. Retain the smooth rounded belly edge above the gap.
KEEP ALL SIX OTHER LEGS EXACTLY AS THEY ARE: the far-left side leg; the smaller left rear leg; the large left foreground leg; the large right foreground leg; the small right rear leg; and the far-right side leg. Do NOT redraw, add, hide, shorten or merge any of these six retained legs. Their feet are already individually visible. The sole correction is subtraction of the seventh central leg. After removal there must be SIX distinct visible feet, with a clear transparent gap at the very center below the belly.
Keep the body, color, patterns, all FOUR wings, feathers, faceless identity, framing, dimensions, aspect ratio, margins and gentle hand-painted style unchanged. No face, no eyes, no nose, no mouth, no extra limbs, no tail. Preserve true alpha background. Do not put a solid backdrop behind it, do not fill the removed leg with a larger body. No words, numbers, arrows, outlines or labels.
