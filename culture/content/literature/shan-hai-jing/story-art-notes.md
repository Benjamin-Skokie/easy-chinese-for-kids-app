# Shan Hai Jing story illustration refresh — 2026-09-28

Asset paths are relative to the repository root. Generated PNG filenames identify originals in this session's local Codex image archive; they are provenance records, not repository files.

## Current revision — page 2: wider, airier three-creature landscape (2026-09-28)

The user found the restored three-creature scene crowded and subdued, with all three creatures facing the same way, and asked for a wider view with Xuangui farther away. The imagegen skill's built-in ImageGen editor used the existing page 2 image as the edit target and identity/style reference; no CLI/API generation or programmatic repainting was used.

- The viewpoint is wider, with more sky and broad, quieter river pools. Lushu is smaller and grounded on the near bank facing into the scene; Xuangui is smaller in a more distant pool, with its lower body in water; the white fox remains on a separate wooded ledge looking the other way. The same three creatures remain, with no added creatures or props.
- Deployed asset: `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- Byte-identical manuscript asset: `culture/content/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- Export: 1280 × 960, 4:3 WebP, 109,520 bytes. cwebp only resizes and encodes the generated image; it does not alter the composition.
- Generated original: `exec-f5e69193-e01e-440b-9013-3c2e0e4b7dce.png`.
- Previous export backup: `nihao-shj-page2-spacing-B0hzDi/previous-page2.webp` in the local temporary archive; its original PNG is still retained at `exec-ecde7ec2-47f6-4e6d-90ee-5ccce53ed32b.png`.
- Scope: illustration 2 source/deployed copies and these production notes only. Article wording, other illustrations, all map artwork and creature placements remain unchanged.
- Visual review: inspected generated original and compressed WebP. All three silhouettes are fully inside the frame, separated by landscape, with Xuangui visibly farther into the river. The setting remains an imagined scene, not a claim that the three creatures share one historical location.
- Browser QA: the replacement loads at 1280 × 960 and renders at 460 × 345 with the same 4:3 ratio and no cropping or horizontal page overflow. The source/deployed WebP synchronization and 120,000-byte budget test passes. SHA-256 checks confirm that illustrations 1, 3 and 4 are unchanged; the new page 2 SHA-256 is `3c1bf3d01926e5063bdab38325ae8afc55a6e9c2f46c2bd9b5ea37416ca092ef`.

### Exact prompt — page 2: wider composition

Use case: precise-object-edit.
Asset: replace ONLY illustration 2 of a children's Classic of Mountains and Seas article, ages 6–10. A landscape 4:3 raster illustration.
Image 1 is the EDIT TARGET and the authoritative reference for the three existing creature identities and painterly style.
Primary request: zoom OUT noticeably and make the scene more open, airy and spacious. Currently the three large creatures crowd the foreground and all face left. Recompose this SAME mountain-river landscape so they occupy separate places and depths, not a lineup. Keep exactly these three creatures, with their familiar appearance.
Composition: pull the viewpoint back to reveal more landscape between subjects. Reduce the animals to about 60–65 percent of their present relative sizes, retaining readable details. Use broad calm turquoise water and quieter patches of open bank as breathing room. Fewer dense little bushes and busy rock clusters; retain the mountain valley, winding river, distant blue sea, subtle waterfalls and natural woodland. Clear luminous daylight, airy clean greens, no gray veil or muddy brown haze.
Lushu: on a dry grassy near bank, a little deeper into the scene, standing naturally and facing right into the valley rather than left. White HORSE head with a natural long equine muzzle, small lateral eye, no human eyebrows or smile, flowing white mane, ochre horse body with irregular tiger stripes, exactly four grounded horse legs and hooves, ONE flowing coral red horse tail. Fully visible, balanced standing stance.
Xuangui: move it farther away into the middle distance, in a quiet pool of the river beyond Lushu, with a generous clear stretch of water between them. Smaller, roughly one-sixth of picture width. Bird head and gently extended feathered neck, teal-gold turtle shell, four short turtle legs, ONE curling snake tail. Head turned slightly toward the viewer/right, not all creatures facing the same direction. Feet and lower body in the water with gentle ripples; never floating above the river, never turned into a regular bird or dragon.
Nine-tailed fox: on a separate wooded riverbank ledge at a different depth, with room around it and subtle connection to the trees, body angled across the ledge and head looking back toward the viewer. Keep fluffy pure ivory-white fur and exactly nine distinct organic fur tails of varied curves, relaxed alert mysterious animal expression, not human or seductive. A small quiet discovery, not a giant dominating the mountain.
Preserve character designs, individual colors and refined hand-painted storybook gouache/watercolor texture. No redesign, no hard sticker outlines, no cartoon human faces, no photorealism. All animals comfortably inside the frame. The scene should feel like a spacious inhabited world, not a staged gathering or one shared action.
Constraints: exactly THREE creatures: Lushu, Xuangui, nine-tailed fox. No added creatures or birds, people, buildings, books, scrolls, human objects, signs, text, lettering, compass, labels, border or watermark. Do not modify any other article illustration.

## Previous revision — page 4: clean shirt shading

The user noted that the boy's shirt looked dirty. Following the imagegen skill, the built-in ImageGen editor was used to remove mottled gray-brown shading from the cream shirt while keeping soft fabric folds, the navy collar, and the existing child-at-desk scene. No CLI/API generation or programmatic repainting was used. The dragon pictures, article wording, layout and other three illustrations are retained.

- Deployed asset: `culture/books/literature/shan-hai-jing/images/4-child-drawing-creatures.webp`.
- Matching manuscript asset: `culture/content/literature/shan-hai-jing/images/4-child-drawing-creatures.webp`. The clean export is also retained as `4-child-drawing-creatures-clean-shirt.webp`.
- Export: 1280 × 960, 4:3 WebP, 110,786 bytes, below 120,000 bytes. cwebp only resizes and encodes the generated output.
- Generated original: `exec-bdc9e3e5-d9d2-49d0-a6dc-be2e4d0c1035.png`.
- The previous WebP is preserved at `culture/content/literature/shan-hai-jing/images/4-child-drawing-creatures-before-shirt-cleanup.webp`. The article retains its existing tracked asset URL, in line with the project's deployment checks.
- Visual review: the cream shirt reads as clean cloth, with soft folds and no prominent dirty-looking back patches. The two Yinglong drawings and the original composition remain recognizable.

### Exact prompt — clean shirt shading

Use case: precise-object-edit. Asset: existing 4:3 children's-book website illustration. Image 1 is the EDIT TARGET. Make ONE localized correction only: clean up the boy's cream long-sleeved shirt, especially the large visible back and shoulder area on the right. The current brown-gray mottled brush texture looks like dirt or stains. Make the shirt look freshly washed, a clean even soft ivory cotton color, with smooth gentle light/shadow gradients and a few natural soft fabric folds. Remove dirty-looking patches, gray-brown smudges, distressed texture and speckles from the shirt. Do not flatten all folds or overexpose the cloth. Preserve its cream color and the navy-blue collar underneath. Preserve the boy's exact identity, hair, pose, hands, anatomy and proportions. Preserve EVERYTHING ELSE as closely as possible: both existing blue-green winged Chinese dragon drawings with their precise features and wings, open book, notebook, pencil, tabletop, plant, lamp, shelves, background, warm window sunlight, painterly children's-book style, camera viewpoint and entire 4:3 composition. No new objects, text or watermark. Do not redraw or redesign the scene; only make the shirt clean and softly shaded.

## Previous revision — page 4: a child drawing Yinglong

The user asked to replace the unrelated creature in the last illustration with one of the map's 28 entries, then explicitly rejected another Wenyaoyu picture as repetitive and requested a dragon instead. The final image shows the existing map Yinglong in both the open picture book and the child's sketchbook. The interim winged-fish generation was not deployed.

Method: imagegen skill, built-in ImageGen edit (not CLI/API fallback), using the previous child-at-desk illustration as edit target and `map/assets/yinglong.webp` as the character identity reference. The child's setting and drawing activity are retained; the decorative animal figurine is removed. The book picture and simpler, partly unfinished pencil drawing share the map dragon's jade-teal scales, cream mane, curling body and feathered wings. These colors and detailed wing design follow the site's illustration, not a claim about colors recorded in the ancient text.

- Deployed asset: `culture/books/literature/shan-hai-jing/images/4-child-drawing-creatures.webp`.
- Byte-identical manuscript asset: `culture/content/literature/shan-hai-jing/images/4-child-drawing-creatures.webp`.
- Final export: 1280 × 960, 4:3 WebP, 113,074 bytes, below the 120,000-byte limit. Resized and encoded with cwebp only; no programmatic repainting.
- Generated original: `exec-f13e1b03-11e1-4b27-95e8-d48769c83104.png`.
- Illustrations 1–3 and all map art are unchanged. The related prose rewrite now introduces the book directly, and page 4 names Yinglong and attributes the winged-dragon description to Guo Pu's commentary. Research is in `references.md`.
- Visual review: checked original and compressed output; both pictured dragons match the map character, both have prominent wings and a long coiling body, the drawing is legible, and no winged fish or unrelated creature remains.
- Verification: all 211 project tests pass, including the expanded four-image budget/source-sync check and the direct-opening/Yinglong copy regression. The manuscript audit passes. In the live browser all four pictures load at 1280 × 960 and render at 460 × 345 without aspect-ratio cropping or horizontal page overflow. The first three images retain their pre-edit SHA-256 checksums.

### Exact prompt — page 4 Yinglong drawing

Use case: precise-object-edit.
Asset type: replacement fourth illustration for a bilingual children's article about The Classic of Mountains and Seas, ages 6–10. Landscape 4:3.
Input Image 1 is the EDIT TARGET: a child at a desk drawing an unrelated horned creature. Input Image 2 is the authoritative CHARACTER IDENTITY reference: Yinglong, the winged Chinese dragon already featured in the site's 28-creature map.
Primary request: replace BOTH the generic horned creature in the open picture book AND the drawing in the child's sketchbook with the SAME recognizable YINGLONG from Image 2. No fish or winged fish anywhere. Do not leave the old unrelated quadruped in either drawing.
Preserve: the modern child seen over the shoulder, natural drawing posture and hands, warm quiet daylight, simple wooden desk, and finely painted children's picture-book look. Remove the tiny decorative animal figurine and simplify distracting background clutter, but do not add other props or people.
Book: show one beautiful painted Yinglong, fully visible on ONE page away from the gutter, against a very light mountain/water vignette. The dragon has a long curving jade-teal scaled body, cream segmented underside and flowing cream mane, gold horns, long whiskers, two large pale teal-and-cream feathered wings, four small clawed legs and one curling tail. Match the authoritative reference's face, color palette, silhouette, and wing construction. Majestic and calm, never aggressive or frightening.
Sketchbook: a clearly recognizable colored-pencil drawing of that same WINGED DRAGON, with long coiling body and TWO LARGE WINGS, matching the book picture and reference. The child's drawing is simpler and partly unfinished, not a pasted identical cutout. Some wing feathers are still outlines near the pencil point. The child is drawing this dragon, not a new invented creature.
Composition: keep both book picture and sketch large and readable at article size, no hands, sleeves or head obscuring the dragon's identifying wings and long body. Pictures lie FLAT on the paper in the correct perspective; they are not live creatures or miniatures. All dragon wing tips, tail and head inside page margins. The child's posture should feel natural and attentive. Entire composition landscape 4:3.
Constraints: ONE child, ONE dragon illustration in the book, ONE matching dragon drawing on the sketchbook. No other creatures, no Wenyaoyu, fish, cat, generic qilin, unrelated dragons, decorative figurines, text, fake writing, Chinese calligraphy, letters, labels, UI, logos or watermark. Keep gentle painterly daylight and paper texture; not photorealistic. The identifiable map character and clear drawing activity matter most.

## Previous revision — change page 1, restore the three-creature scene on page 2

The user clarified that the duplicated subject matter should have been fixed in illustration 1, not illustration 2. The original three-creature landscape on page 2 fits its accompanying descriptions and is restored exactly. Page 1 is now a new mountain-pool opening scene with a glimpse of Wenyaoyu, the winged fish mentioned in that page's text. It no longer depicts a book or repeats Lushu, Xuangui and the Nine-Tailed Fox.

The imagegen skill guided a new built-in ImageGen generation with the existing map asset `map/assets/wenyaoyu.webp` as the sole character/style reference. No CLI/API generation was used. cwebp only resized and encoded the generated image. Page 2 was restored from the preserved, previously reviewed WebP export; it was not regenerated.

Active assets (all 1280 × 960, 4:3 WebP, under 120,000 bytes):

- Page 1: `culture/books/literature/shan-hai-jing/images/1-strange-ancient-book.webp` — 113,282 bytes. The historical filename is retained for existing article/catalog references, but its content is now a mountain pool with Wenyaoyu.
- Page 2: `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp` — 112,610 bytes. Restored three-creature landscape; SHA-256 `837394e471a987444264fa7b6cfbaef31b00ed87f4fa70a26a34d949289c5ca6`.
- Page 3: `culture/books/literature/shan-hai-jing/images/3-jingwei-fills-the-sea.webp` — 114,264 bytes, unchanged; SHA-256 `3e3239d82d6e87418754ed1d6bd3e0fc3b51f0a05593924688587a8decdefe29`.
- Source copies under `culture/content/literature/shan-hai-jing/images/` match the deployed images byte for byte.
- New page 1 original: `exec-43f5b7f9-ca45-44c9-a198-60c560d6322d.png`.
- Restored page 2 original: `exec-ecde7ec2-47f6-4e6d-90ee-5ccce53ed32b.png`.

Review: inspected both the generated page 1 original and compressed export. Its white-headed, red-mouthed, blue-green winged fish has a visible fish tail under clear water beside a rock; no repeated page 2 creatures, book, lettering or props. Restored page 2 was visually checked against its prior export. This is imaginative scenery, not a reconstruction of a precise ancient place.

Browser QA: reloaded the article and visually checked both changed sections. The first three images load at 1280 × 960 and render at 798 × 598.5 in the current browser panel; there is no aspect-ratio cropping or horizontal page overflow. The WebP/source synchronization and image-budget regression test passes. Article text, layout, map assets and the fourth image remain unchanged.

### Exact prompt — page 1 mountain-pool opening

Use case: illustration-story.
Asset: a NEW opening illustration for a bilingual children's article about The Classic of Mountains and Seas, ages 6–10. Landscape 4:3.
Input Image 1 is an authoritative CHARACTER AND PAINTING STYLE REFERENCE ONLY: Wenyaoyu, the map's winged fish. Do not reproduce its cutout composition. No existing article image is an edit target.
Primary request: invite the child into a mysterious mountain river world, with one small surprising glimpse of this winged fish beside the water. This is NOT an illustration of a book, NOT a bestiary lineup, NOT a map, and NOT an ocean-bird flight scene.
Composition and setting: a beautiful intimate view from the edge of a clear mountain pool. Large rounded pale rocks and a few overhanging leaves frame the foreground; clear turquoise water curves between mossy stones into a narrow wooded valley. Uneven rocky slopes rise unmistakably into distant layered mountain silhouettes. A faint unpaved way beside the water disappears around a rock, suggesting there is more to discover. No modern hiking-trail infrastructure. Deep but uncluttered scene, with clear water and breathing room. Soft luminous early-evening light, quiet jade and blue greens, clean air, no muddy mist or gray veil.
The surprise: one Wenyaoyu at the edge of the foreground pool, emerging from behind a rounded stream rock. Its white head and coral-red mouth are visible, one bird-like wing beginning to unfold above the water while the other is lower; its scaled fish body and forked fish tail remain visible through the shallow clear water and small ripples. It is a fish moving in water, not a bird standing on a rock or a gigantic creature flying in the sky. Roughly one fifth to one quarter of the picture width, small relative to the landscape but recognizable at article size. A rock can overlap a small part of its flank, but not conceal its defining fish tail. No dramatic leap or splashing spectacle. The feeling is: wait, did that fish just open a wing?
Character invariants: same long fish-shaped blue-green scaled body, pale cream/white head, red mouth, two blue-green and cream feathered wings, and ONE flowing forked fish tail as the supplied reference. Preserve its face, palette, feather patterns and fish identity. No bird legs, no humanoid features, no whale or dragon, no redesign into an ordinary bird.
Style: refined hand-painted children's picture-book gouache/watercolor, matching the reference's organic delicate brushwork. Landscape and creature share the same light; no sticker outlines. The environment is the main subject, the creature a discovery.
Constraints: exactly ONE creature. No Lushu, no turtle, no nine-tailed fox, no Jingwei. No people, buildings, desk, open book, scroll, props, calligraphy, text, labels, compass, UI, logos, watermark or decorative frame. All essential features comfortably inside the 4:3 canvas.

## Superseded revision — natural horse face and clearly standing pose


At the user's request, the page 2 woodland Lushu was edited to remove the human-like eyebrow/smiling expression and replace the ambiguous walking pose with a balanced standing pose. This is a targeted edit of the previous woodland scene using the imagegen skill and the built-in ImageGen tool, not the CLI/API fallback. The forest setting, white head/mane, striped ochre coat, and single red tail remain.

- Deployed image: `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- Byte-identical manuscript copy: `culture/content/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- 1280 × 960, 4:3 WebP; 112,746 bytes.
- Generated original: `exec-b9c82ae3-c0fa-4dba-a65d-d6735583aedd.png`.
- Review: inspected generated original and compressed export. Longer equine muzzle, closed relaxed mouth, no separate arched eyebrow, smaller eye, and four grounded hooves. This is a painted standing pose, not a gait study.
- Scope: only illustration 2's source/deployed copies and these production notes; no map, article text, other pictures, or catalog edits. The concurrent discussion identifying Kun/Peng as the fish-to-bird transformation in Zhuangzi did not authorize adding it to Shan Hai Jing.
- Validation: source/deployed format, synchronization and 120,000-byte image-budget regression test passed.

### Exact prompt — natural horse face and standing pose

Use case: precise-object-edit.
Asset: corrected second article illustration for a children's Classic of Mountains and Seas story, landscape 4:3.
Input Image 1 is the EDIT TARGET. Preserve this exact woodland-path scene, tree framing, daylight, painterly children's-book style and the Lushu's white head, wavy ivory mane, ochre tiger-striped horse body and single flowing coral-red horse tail. Change only the facial anatomy/expression and the leg pose.

FACE CORRECTION: Make this clearly a HORSE'S face, never a human face. Remove the separate arched eyebrow line completely. Replace the large human-like almond eye and cosmetic-looking eyelid with a smaller, naturally lateral horse eye: dark brown, understated highlight, quiet neutral alertness, ordinary thin eyelid, subtle short fur above it. No eyebrow stripe, no raised eyebrow, no eyeliner, no exaggerated eyelashes, no human smile. Give it a natural long equine muzzle, appropriate nostrils, relaxed closed horse lips and a horse jaw. It has paused and is listening, not smiling or speaking. Keep the ears alert and mane soft; natural animal charm, not a princess face or human expression. Preserve the gentle painted look; do not make this photorealistic or frightening.

POSE CORRECTION: The Lushu is deliberately standing still, NOT walking. Depict a relaxed, balanced, nearly square horse stance, with exactly four anatomically connected legs and four intact hooves all planted on the path. The two forelegs bear weight below their shoulders; the hind legs have natural hock angles beneath the hindquarters. Same-side legs should not both stretch forward as if pacing. Show the far legs with a small believable perspective offset so all four are readable, not four parallel cloned sticks. Match hoof contact shadows to the ground and keep the whole body grounded. Keep the current three-quarter body orientation as far as compatible with a natural standing pose.

Composition invariants: same single creature at about the current size, all ears, hooves and the red tail tip completely inside the frame, same clean forest and mountain glimpse. No new animals, no people, no human features, no additional props, no text, no logos or watermark. Do not change its coat pattern into a normal horse.

## Previous revision — a distinct woodland encounter for page 2


The user pointed out that the open-book image and the second landscape showed essentially the same three-creature scene. Illustration 2 now focuses on one encounter with the singing Lushu on a woodland path at eye level. It is no longer a miniature world panorama or a repeated creature lineup. Page 1 remains the open book; page 3 remains Jingwei carrying a twig over the sea.

Following the imagegen skill, this illustration was generated with the built-in ImageGen tool using `map/assets/lushu.webp` as its character/style reference only. The old landscape was not used as a composition reference. No fallback API or CLI image generation was used; cwebp only resized and encoded the result.

- Deployed asset: `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- Identical manuscript asset: `culture/content/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp`.
- Export: 1280 × 960, 4:3 WebP, 114,086 bytes (below 120,000).
- Original: `exec-99174e43-4f9c-475e-9e67-d7fa1de88660.png`.
- Scope: only the two copies of illustration 2 and this production note changed. Article text/layout, images 1 and 3, and the map's Lushu anchor remain unchanged.
- Visual review: original and compressed export checked; one white-headed, tiger-striped, red-tailed Lushu, four hooves, full ears and tail inside frame, natural ground contact, no extra creatures or desk props.
- Validation: the source/deployed WebP budget regression test passes. Reloaded the live article and inspected its page 2 screenshot: the replacement loaded at 1280 × 960 and rendered at 798 × 598.5 with the complete creature visible, no aspect-ratio cropping, and no horizontal page overflow.

### Exact prompt — page 2 woodland encounter

Use case: illustration-story.
Asset: replacement second illustration in a children's article about The Classic of Mountains and Seas, ages 6–10. Landscape 4:3.
Input Image 1 is an authoritative CHARACTER AND PAINTING-STYLE REFERENCE ONLY: Lushu from our interactive map. Keep this character's recognizable identity, but give it a new pose and place it in a new scene. Do not reproduce its isolated portrait composition.
Primary request: a single intimate encounter with the singing Lushu on a woodland mountain path, seen at a child's eye level from INSIDE the forest. This must feel completely different from a panoramic map, a book spread, or a lineup of three animals.
Scene and action: the path bends between mossy stones and tall broadleaf trees. A graceful Lushu has just stepped out from between the trunks. Its body continues along the path while its neck and head turn gently back toward the viewer, ears alert, mouth slightly open as if a clear musical call has just escaped. Pose is natural, softly animated and curious, not roaring or threatening. A little breeze moves its white mane and single red tail. The animal is fully visible, hooves grounded in the path, with believable contact shadows. Tree trunks and a few foreground leaves give depth, while a small glimpse of a mountain slope through the trees suggests the world beyond.
Composition: ONE creature, large enough to read its face and striped coat at article size, roughly half the image height, framed by ample woodland space. Keep ears, hooves and tail tip entirely inside the frame. Eye-level close story scene, NOT elevated bird's-eye view, panorama, distant coastline, mini map, book, or diorama. Clear uncluttered focal point; foreground greenery may frame but not hide the body.
Character invariants: same ivory-white HORSE head and softly wavy white mane, slender horse body with ochre coat and irregular dark tiger stripes, exactly FOUR horse legs ending in dark hooves, ONE flowing coral-red HORSE tail. Same gentle attentive eye and painted fur as the reference. NO tiger face, horns, wings, antlers, extra tails, horse tack or human features. Do not paste the original stiff rearing pose into a background.
Style: warm, finely painted children's picture-book gouache/watercolor matching the reference. Calm jade-green woodland, warm soft daylight through leaves, dappled patches of sun, clean clear air, inviting quiet mystery. Painterly rather than photorealistic. Organic leaves and fur, not cloned textures.
Constraints: no fox, turtle, other animals, people, buildings, objects on display, books, scrolls, text, musical-note icons, magic particles, decorative borders, labels, watermark, heavy fog or muddy sepia cast. Only the scene described.

## Previous revision — simpler book scene and consistent Jingwei


The follow-up request was to remove the unnecessary desk objects in illustration 1 and match illustration 3's Jingwei to the interactive map. Using the imagegen skill and the built-in ImageGen tool (not the CLI/API fallback), illustration 1 was edited from the previous book image, and illustration 3 was edited with the existing map Jingwei as its character identity reference. Only illustrations 1 and 3 were replaced in this revision. Illustration 2, illustration 4, all map assets, and page text/layout were left unchanged.

Current assets are all 1280 × 960, 4:3 WebP, with byte-identical copies in the deployed article and manuscript image directories:

- `culture/books/literature/shan-hai-jing/images/1-strange-ancient-book.webp` — 112,520 bytes. The open book is now alone on a bare tabletop.
- `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp` — 112,610 bytes, unchanged by this revision.
- `culture/books/literature/shan-hai-jing/images/3-jingwei-fills-the-sea.webp` — 114,264 bytes. Jingwei now follows the map's patterned blue-gray and cream plumage, white beak, coral-red feet, head markings, and short patterned tail.
- Matching manuscript copies: `culture/content/literature/shan-hai-jing/images/`.

Generated originals:

- Book: `exec-2ced79b5-07fd-4f08-b798-57b48fc07840.png`.
- Jingwei: `exec-e6a7b9a4-ce7b-4d36-9fad-d6e29d02d314.png`.

Both generated originals and compressed exports were visually reviewed. In the live article both updated images loaded at 1280 × 960 and rendered at 460 × 345 without aspect-ratio cropping. Screenshots of both sections show the book and bird fully framed. There was no horizontal page overflow and the browser error log was empty. The asset regression test now covers all three refreshed images for WebP format, the 120,000-byte budget, and source/deployed equality.

Validation: all 209 project tests passed after replacement, and `git diff --check` reported no whitespace errors.

Unchanged checksums (SHA-256):

- Illustration 2: `837394e471a987444264fa7b6cfbaef31b00ed87f4fa70a26a34d949289c5ca6`.
- Map Jingwei reference: `30d5aee873722c2c7563ee6ae86f49231a9070ccd30de5f44912c4fa6cc931a1`.

### Exact current prompt — illustration 1

Use case: precise-object-edit / illustration-story.
Asset: illustration 1 for a bilingual children's article about The Classic of Mountains and Seas, landscape 4:3.
Input Image 1 is the EDIT TARGET. Change ONLY the clutter surrounding the book and framing enough to show the whole book.
Primary request: remove absolutely every object outside the open book: the brush, ink vessel, carved wooden stand, rolled bamboo bundle, wooden ornament, jade pendant, beads and cord. Replace their areas with simple unobtrusive bare wood. The entire scene must contain ONE open illustrated book on an otherwise EMPTY quiet tabletop. No decorative props, flowers, new tools, paper sheets, accessories, or extra books.
Preserve: the existing open book, slightly overhead perspective, cream paper, landscape painted into the pages, and EXACTLY these same three painted creatures with their current faces, colors and shapes: white-headed striped Lushu with red horse tail, bird-headed blue-green Xuangui turtle with curled snake tail, fluffy white Nine-Tailed Fox. Do not redesign the creatures or add others. Paintings must remain flat illustrations on the paper, not figurines.
Framing: center the open book with a modest clean margin showing every outer corner and the full cover edges; the book is the sole focus and fills most of the frame. Natural soft daylight, same polished picture-book painting style. No lettering, labels, logos, watermark or additional objects.

### Exact current prompt — illustration 3

Use case: compositing / identity-preserve / illustration-story.
Asset: replacement illustration 3, Jingwei Fills the Sea, for a bilingual children's article about The Classic of Mountains and Seas. Landscape 4:3.
Input Image 1 is the EDIT TARGET and scene/composition reference: a bird carrying a twig above the sea. Input Image 2 is the authoritative CHARACTER IDENTITY reference: the current map's Jingwei. Replace the old orange-throated, dark-beaked swallow-like bird with the EXACT Jingwei character from Image 2. The second image is a character reference, not a scene to reproduce.
Scene: preserve the broad blue sea, gentle white waves, rocky wooded shore, distant green mountains and clear sky. One determined small mythic bird is flying from the wooded shore toward the sea, carrying a small leafy twig firmly in its beak. Foreground perspective makes its appearance readable without making it a gigantic bird. Full bird with both wings, feet and tail tips inside frame, ample breathing room.
Character invariants: Image 2's same blue-gray feather coat, cream-white face and belly, delicately patterned cream-and-muted-gold wing bands, rusty-coral forehead stripe, patterned head, large amber-brown attentive eye, IVORY-WHITE beak, TWO coral-red feet. Same body and head proportions and feather styling, TWO feathered wings and one short blue-gray patterned tail. NO orange throat, black beak, forked swallow tail, long phoenix tail, horns, human face or newly invented plumage. The twig may change angle but the identity may not.
Style: polished warm children's picture-book watercolor/gouache, matching the map character's softly detailed painted feathers. Clear turquoise sea and clean natural daylight, readable at small article size, not photorealistic.
Constraints: exactly ONE bird; no other creatures, people, drowning scene, buildings, extra props, text, labels, arrows, logos or watermark. Preserve the simple story action. No sticker halo or flat pasted-on look; integrate the bird with the scene's light.

## Initial revision — first two illustrations (historical record)

The first- and second-image outputs below were superseded by the later revisions above.


### Scope and method

The user requested replacing the article's first two illustrations because the creatures did not match the interactive map. The imagegen skill guided use of the built-in ImageGen tool with the existing article pictures as composition/edit targets and the active map assets as character identity references. No fallback image-generation API or CLI was used. cwebp was used only for resizing and WebP encoding.

The three identity references were `map/assets/lushu.webp`, `map/assets/xuangui.webp`, and `map/assets/nine-tailed-fox.webp` under the deployed article directory. These reference assets and all map placements were left unchanged.

The first image retains the open illustrated book but replaces the assorted invented creatures with Lushu, Xuangui, and the Nine-Tailed Fox. The second shows the same three creatures in their respective land/river/wooded-slope settings. This is a pictorial scene, not a reconstruction of ancient distances. Illustrative colors and costume-free appearance follow the map's approved art, not a claim that every color is specified in the ancient text.

### Initial assets

Both are 1280 × 960 (4:3) WebP, below the stricter 120,000-byte cap. The deployed and manuscript-source copies are byte-identical; existing asset filenames are retained so the article and its catalog thumbnail update together.

- `culture/books/literature/shan-hai-jing/images/1-strange-ancient-book.webp` — 113,442 bytes.
- `culture/books/literature/shan-hai-jing/images/2-mountains-rivers-scroll.webp` — 112,610 bytes.
- Matching source copies: `culture/content/literature/shan-hai-jing/images/`.

Original generated PNGs remain at:

- `exec-11675450-f8ea-4e68-a6cf-e94074ccace3.png`.
- `exec-ecde7ec2-47f6-4e6d-90ee-5ccce53ed32b.png`.

The old source PNGs are retained but are not the active article images. Images 3 and 4, story text, card illustrations, and the interactive map are not changed by this refresh.

### Initial visual review

Inspected both generated outputs and compressed WebP exports. Lushu retains a white horse head and mane, striped ochre body, and red horse tail; Xuangui retains the feathered bird head, teal/gold turtle shell, and curled snake tail; the fox retains white fluffy fur, an alert expression, and its fan of tails. All three creatures are fully framed, and the landscape scene places their feet at ground or water level. Anatomical review is manual, not an automated count claim.

Browser verification: both deployed images loaded at 1280 × 960 and rendered at 460 × 345 in the article without cropping or horizontal page overflow. Both article sections were visually inspected at their actual rendered size; the browser error log was empty. The full project check passed 209 tests, including the source/deployed sync and 120,000-byte checks above.

### Initial prompt — illustration 1

Use case: compositing / illustration-story.
Asset type: replacement illustration 1 for a bilingual children's article about The Classic of Mountains and Seas, ages 6–10. Landscape 4:3.
Input images: Image 1 is the EDIT TARGET and composition reference: an open illustrated book on a wood table. Images 2, 3, 4 are authoritative CHARACTER IDENTITY REFERENCES from the same website's interactive map: Lushu, Xuangui, Nine-Tailed Fox. Do not redesign those three characters.
Primary request: completely replace the inconsistent animals drawn on the open pages with faithful small painted versions of ONLY these three reference creatures. Preserve the open book's physical shape, appealing slightly overhead perspective, pages lying on the table, brush and quiet desk surroundings. The result should feel like the same world as the map cards, not a different bestiary.
Page layout: a beautiful uncluttered continuous painted journey over both pages, with mountains, a winding stream, groups of trees and generous pale paper between drawings. Lushu on the left page on dry ground beside a wooded hill, Xuangui below it beside the stream, the fluffy white fox on the right page against a muted teal grove. Keep drawings fully on the page, painted INTO the paper plane with appropriate perspective, not figurines standing on a book or pasted stickers. All three complete creatures should be large enough to recognize. No gutter cutting through an animal.
Character invariants:
Lushu: graceful horse-shaped body, ivory-white horse head and flowing white mane, ochre coat with dark tiger stripes, FOUR horse legs and hooves, ONE flowing coral-red horse tail. Not a tiger head, not a dragon, no horns.
Xuangui: the exact teal/blue-gray and gold-edged turtle shell, pale feathered bird head with golden beak, FOUR turtle legs, ONE long curled snake tail. Not a normal turtle or dragon.
Nine-Tailed Fox: the exact quiet alert white fox face, amber eyes, soft fluffy snow-white coat and NINE long fluffy fur tails of varying curves; gentle cool pale-jade shadows, no orange markings, no red horns. All nine tails attached naturally to ONE rump; not tentacles, feathers or nine identical clones. Quiet, watchful and mysterious, never seductive or threatening.
Style/medium: polished hand-painted children's picture-book gouache/digital watercolor, fine soft fur and feathers matching the references, luminous mineral jade and clear warm daylight. The book can have subtly aged ivory paper, but avoid dirty brown sepia cast over the characters.
Constraints: remove ALL other animals from the old pages, including the whale, generic dragons, generic horned lion, deer and normal turtle. Do not add any new creatures, human faces, people, labels, Chinese writing, arrows, numbers, map pins, UI, borders outside the book, logos or watermarks. No faux historical text. No photorealistic zoology, horror, thick fog or glowing fantasy effects.

### Initial prompt — illustration 2

Use case: compositing / illustration-story.
Asset type: replacement illustration 2 for a bilingual children's article about The Classic of Mountains and Seas, landscape 4:3.
Input images: Image 1 is the EDIT TARGET / landscape-composition reference, an expansive painted world of mountains and rivers. Images 2, 3, 4 are authoritative CHARACTER IDENTITY REFERENCES from the same website's interactive map: Lushu, Xuangui, Nine-Tailed Fox.
Primary request: rebuild this landscape illustration around ONLY the THREE creatures actually described in this article section, preserving their exact identities from the map cards. This is the Southern Mountains journey: a singing Lushu on dry ground, a bird-headed Xuangui in the mountain river, and a white nine-tailed fox farther east near a wooded mountain. Remove every other invented creature in the old image.
Composition: one continuous luminous landscape, not separate panels. Moderately elevated storybook viewpoint. Rounded rocky southern mountain ridges rise unmistakably above bamboo and broadleaf woodland, with a clear winding river leading toward a distant eastern sea. Leave breathing room and distinct open ground. The mountain masses must be far larger than the animals. Bring the three animals into the lower and middle foreground so they are recognizable but each fits naturally in its habitat, not monster-sized or pasted onto tree crowns. Lushu on a dry earth clearing in the left foreground, Xuangui at a shallow river pool nearer the middle with bird head, shell and curled tail visible, fox on a wooded slope farther to the right. They occupy separate places, no invented interaction or shared party. Foreground plants and a little shoreline overlap should integrate their feet into the setting without hiding identifying features. Complete heads, hooves, shell, ears and tail tips inside frame. Keep clear water, varied greenery, pale stone, clean air; no blanket of clouds obscuring terrain.
Character invariants:
Lushu MUST match image 2: graceful horse shape, white horse head and flowing ivory mane, golden ochre body with dark tiger stripes, four horse legs, one flowing coral-red horse tail. No horns or tiger face.
Xuangui MUST match image 3: teal blue-gray turtle shell with subdued gold edging, cream-and-blue feathered bird head, golden pointed beak, four turtle legs, one curled scaly snake tail. Not an ordinary turtle or aquatic dragon.
Nine-Tailed Fox MUST match image 4: a quiet alert amber-eyed snow-white fox, very fluffy wispy white fur, exactly nine thick long natural fur tails fanning behind ONE rump, subtle cool gray-jade shading, curves and overlaps organically varied, no crimson or orange marks, no horns, no extra faces. Contrast its white coat with darker jade foliage. Quiet and mysterious rather than aggressive or seductive.
Style/medium: graceful Chinese children's picture-book gouache/digital watercolor, same soft finely painted fur, eyes, shell ornament and color palette as the three character references. Detailed but calm and readable at article size, not photorealistic and not cartoonishly babyish. Natural soft daylight, no muddy haze or neon magic.
Constraints: ONLY these three animals. No whale, generic dragons, qilin, flying phoenix, normal turtle, ordinary tiger, people, buildings, invented landmarks, labels, writing, arrows, UI, badges or watermark. No flat sticker-like animal overlays. Do not alter the reference designs to match the old wrong animals.
