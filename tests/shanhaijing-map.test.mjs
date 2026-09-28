import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { cameraForBounds, creaturesInView } from "../culture/books/literature/shan-hai-jing/map/map-camera.js";
import { worldMap, regions, places } from "../culture/books/literature/shan-hai-jing/map/map-regions.js";
import { creatures } from "../culture/books/literature/shan-hai-jing/map/creatures.js";
import { creatureStories } from "../culture/books/literature/shan-hai-jing/map/stories.js";
import { spriteFrames } from "../culture/books/literature/shan-hai-jing/map/sprite-frames.js";
import { creatureScene, foregroundPath, sceneFitsWorld } from "../culture/books/literature/shan-hai-jing/map/map-scenes.js";

const allBounds = { x: 0, y: 0, width: 100, height: 100 };

test("all 28 cards have concise bilingual source facts and individually scoped creation notes", () => {
  assert.equal(creatures.length, 28);
  assert.equal(Object.keys(creatureStories).length, 28);
  const audit = readFileSync(new URL("../culture/content/literature/shan-hai-jing/map-source-audit.md", import.meta.url), "utf8");
  const notes = [];
  let sourceReadings = 0;
  for (const creature of creatures) {
    const story = creatureStories[creature.id];
    assert.ok(audit.includes(`\`${creature.id}\``), `${creature.id}: include in the editorial audit`);
    for (const key of ["factsZh", "factsEn"]) {
      assert.equal(typeof creature[key], "string", `${creature.id}: one paragraph for ${key}`);
      assert.ok(creature[key].trim());
      assert.doesNotMatch(creature[key], /\n|<[^>]+>|https?:\/\/|[—–]/);
      assert.equal(story[key], undefined, `${creature.id}: do not duplicate or override source facts`);
    }
    assert.equal(creature.storyZh, undefined, "do not confuse source facts with narrative copy");
    assert.equal(creature.storyEn, undefined);
    assert.ok(creature.factsZh.length <= 200, `${creature.id}: concise Chinese source note`);
    assert.ok(creature.factsEn.split(/\s+/).length <= 100, `${creature.id}: concise English source note`);
    assert.doesNotMatch([...story.zh, ...story.en].join(" "), /[—–]|Shān Hǎi Jīng|Shan Hai Jing/);
    if (story.kind === "source-reading") {
      sourceReadings++;
      assert.equal(story.creationNoteZh, undefined);
      assert.equal(story.creationNoteEn, undefined);
    } else {
      for (const key of ["creationNoteZh", "creationNoteEn"]) {
        assert.equal(typeof story[key], "string");
        assert.ok(story[key].trim());
        assert.doesNotMatch(story[key], /https?:\/\/|[—–]|这个故事是我们根据|We imagined this story using details/);
      }
      assert.ok(story.creationNoteEn.split(/\s+/).length <= 60);
      notes.push(story.creationNoteZh, story.creationNoteEn);
    }
  }
  assert.equal(sourceReadings, 8);
  assert.equal(notes.length, 40, "20 adaptations each need two language notes");
  assert.equal(new Set(notes).size, 40, "do not copy the same generic disclaimer to every card");
});

test("source facts keep known corrections and separate primary text from adaptation", () => {
  const byId = Object.fromEntries(creatures.map((creature) => [creature.id, creature]));
  assert.match(byId.jingwei.factsZh, /西边的山/);
  assert.match(byId.jingwei.factsEn, /western mountains/);
  assert.doesNotMatch(byId.jingwei.factsEn, /from Fajiu/);
  assert.match(creatureStories.jingwei.creationNoteZh, /书中已有的故事/);
  assert.doesNotMatch(byId.ershu.factsZh + creatureStories.ershu.zh.join(""), /没有翅膀/);
  assert.doesNotMatch(byId.ershu.factsEn + creatureStories.ershu.en.join(" "), /no wings/);
  assert.match(byId.ershu.factsEn, /dog/);
  assert.match(creatureStories.ershu.creationNoteZh, /原文没有说明/);
  assert.match(byId.kui.factsZh, /风雨/);
  assert.match(byId.kui.factsEn, /wind and rain/);
  assert.doesNotMatch(creatureStories.zhuyan.zh.join("") + creatureStories.zhuyan.en.join(" "), /红色脚印|red footprints/);
  for (const id of ["fuzhu", "changyou"]) {
    assert.match(byId[id].factsZh, /大水.*征兆/);
    assert.match(byId[id].factsEn, /In the book.*flood/);
    assert.doesNotMatch(byId[id].factsZh + byId[id].factsEn, /带领|救援|rescue|leading animals/);
    assert.match(creatureStories[id].creationNoteZh, /我们想象的情节/);
  }
  for (const id of ["yinglong", "biyiniao"]) {
    assert.match(byId[id].factsZh, /郭璞/);
    assert.match(byId[id].factsEn, /Guo Pu/);
  }
  assert.match(byId.qiongqi.factsZh, /《海内北经》[\s\S]*《西山经》[\s\S]*另一种/);
  assert.match(byId.sanqingniao.factsZh, /《西山经》[\s\S]*《大荒西经》[\s\S]*另有记载/);
  assert.match(byId.jiliang.factsEn, /In the book's legend/);
  for (const id of ["nine-tailed-fox", "gudiao", "qiongqi"]) {
    assert.match(byId[id].factsEn, /dangerous to people/);
    assert.doesNotMatch(byId[id].factsEn, /eat people|involving gu/);
  }
  assert.match(creatureStories["nine-tailed-fox"].creationNoteZh, /原文没有写它的毛色/);
  assert.doesNotMatch(byId.dijiang.factsZh, /红黄相间/);
});

test("every creature card leads with its story and keeps source facts in a closed endnote", () => {
  const app = readFileSync(new URL("../culture/books/literature/shan-hai-jing/map/app.js", import.meta.url), "utf8");
  const context = {
    creatureStories,
    chapterNamesEn: {},
    state: { found: new Set() },
    hideCreatureName() {},
    layer: { querySelector: () => null },
    window: { setTimeout() {}, clearTimeout() {} },
    sheetContent: { innerHTML: "" },
    sheet: { classList: { add() {} }, setAttribute() {}, querySelector: () => null },
    scrim: { classList: { add() {} } },
    hintText: {}
  };
  runInNewContext(app.slice(app.indexOf("function escapeHtml("), app.indexOf("function closeSheet(")), context);

  for (const creature of creatures) {
    context.openCreature(creature, null);
    const html = context.sheetContent.innerHTML;
    const story = creatureStories[creature.id];
    const endnote = html.match(/<details class="source-clues"[^>]*>[\s\S]*?<\/details>/)?.[0];
    assert.ok(endnote, `${creature.id}: preserve the source facts as an endnote`);
    assert.doesNotMatch(endnote.match(/^<details[^>]*>/)[0], /\sopen(?:\s|=|>)/, `${creature.id}: do not reveal facts before reading`);
    assert.match(endnote, /<summary[^>]*>书里写了什么？[\s\S]*What's in the book\?/);
    assert.ok(html.indexOf('class="creature-story-title"') < html.indexOf('class="story-copy-zh"'));
    assert.ok(html.indexOf('class="creature-story-en"') < html.indexOf('class="word-list"'));
    assert.ok(html.indexOf('class="word-list"') < html.indexOf('<details class="source-clues"'));
    assert.ok(html.trim().endsWith("</details>"), `${creature.id}: keep source notes at the very bottom`);
    assert.doesNotMatch(html, /class="story-kind"|An imagined story|A closer look|This full story is not in/);
    for (const paragraph of [...story.zh, ...story.en]) {
      assert.ok(html.includes(context.escapeHtml(paragraph)), `${creature.id}: keep both stories unchanged`);
    }
    const { factsZh, factsEn } = creature;
    assert.ok(endnote.includes(context.escapeHtml(factsZh)), `${creature.id}: retain Chinese facts`);
    assert.ok(endnote.includes(context.escapeHtml(factsEn)), `${creature.id}: retain English facts`);
    assert.doesNotMatch(html.replace(endnote, ""), /class="story-origin-note"|这个故事是我们根据|We imagined this story/, `${creature.id}: keep the creation note out of the story body`);
    if (story.kind === "source-reading") {
      assert.doesNotMatch(html, /class="story-origin-note"/, `${creature.id}: don't label a source retelling as invented`);
    } else {
      assert.match(endnote, /class="story-origin-note" lang="zh-Hans"/);
      assert.ok(endnote.indexOf('class="story-origin-note"') > endnote.indexOf(context.escapeHtml(factsEn)), `${creature.id}: place the creation note after the source facts`);
      assert.ok(endnote.includes(context.escapeHtml(story.creationNoteZh)), `${creature.id}: explain this story's additions in Chinese`);
      assert.ok(endnote.includes(context.escapeHtml(story.creationNoteEn)), `${creature.id}: explain this story's additions in English`);
    }
  }
});

test("all creatures share a brief discovery response that restarts on repeat taps", () => {
  const app = readFileSync(new URL("../culture/books/literature/shan-hai-jing/map/app.js", import.meta.url), "utf8");
  const css = readFileSync(new URL("../culture/books/literature/shan-hai-jing/map/styles.css", import.meta.url), "utf8");
  const timers = new Map();
  let nextTimer = 0;
  const context = {
    state: {},
    window: {
      clearTimeout: (id) => timers.delete(id),
      setTimeout(callback, delay) {
        const id = ++nextTimer;
        timers.set(id, { callback, delay });
        return id;
      }
    }
  };
  runInNewContext(app.slice(app.indexOf("function animateDiscovery("), app.indexOf("function openCreature(")), context);
  let previous;
  for (const creature of creatures) {
    const classes = new Set();
    const events = [];
    const button = {
      get offsetWidth() { events.push("layout"); return 44; },
      classList: {
        add(value) { events.push("add"); classes.add(value); },
        remove(value) { events.push("remove"); classes.delete(value); }
      }
    };
    context.animateDiscovery(button);
    assert.equal(previous?.has("is-found") || false, false, `${creature.id}: stop the previous creature's highlight`);
    assert.ok(classes.has("is-found"), creature.id);
    assert.equal(timers.size, 1);
    assert.equal(timers.values().next().value.delay, 420);
    context.animateDiscovery(button);
    assert.deepEqual(events.slice(-3), ["remove", "layout", "add"], `${creature.id}: restart rather than inherit an unfinished animation`);
    assert.equal(timers.size, 1, "an old timeout must not end a new click response early");
    previous = classes;
  }
  const [timerId, timer] = timers.entries().next().value;
  timers.delete(timerId);
  timer.callback();
  assert.equal(previous.has("is-found"), false);
  assert.equal(context.state.discoveryTarget, null);
  assert.equal(context.state.discoveryTimer, null);
  context.animateDiscovery(null);
  assert.equal(timers.size, 0);

  assert.match(css, /\.creature-hotspot\.is-found \{ animation: creature-discover 420ms ease-out; \}/);
  assert.doesNotMatch(css, /\.creature-hotspot\[data-creature=/, "no species-specific click animations");
  assert.doesNotMatch(css, /dijiang-dance|wing-lift|tail-breathe|turtle-rise|lushu-step/);
  assert.match(css, /@keyframes creature-discover \{[\s\S]*?translate\(-50%, var\(--anchor-y\)\) scale\(1\.08\)/, "discovery must not lift the animal away from its habitat");
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("all twenty-eight sprites have valid transparent-padding bounds and fit the world", () => {
  assert.deepEqual(Object.keys(spriteFrames).sort(), creatures.map((creature) => creature.id).sort());
  for (const creature of creatures) {
    const scene = creatureScene(creature, worldMap);
    const f = scene.frame;
    assert.ok(f.width > 0 && f.height > 0 && f.artWidth > 0 && f.artHeight > 0, creature.id);
    assert.ok(f.left >= 0 && f.top >= 0 && f.left + f.artWidth <= f.width && f.top + f.artHeight <= f.height, creature.id);
    assert.equal(sceneFitsWorld(scene, worldMap), true, `${creature.id} must not spill outside the landscape`);
    assert.equal(scene.width, creature.position.width / 100 * worldMap.width * 0.7);
  }
});

test("ground contacts and low-flight clearances stay anchored to the landscape", () => {
  for (const creature of creatures) {
    const scene = creatureScene(creature, worldMap);
    const anchor = scene.top + scene.height * scene.anchorHeight;
    assert.ok(Math.abs(anchor - scene.y) < 0.00001, `${creature.id} has a drifting contact point`);
    assert.equal(Boolean(foregroundPath(scene)), scene.surface !== "air", `${creature.id} foreground depth`);
  }
  const byId = new Map(creatures.map((c) => [c.id, creatureScene(c, worldMap)]));
  assert.equal(byId.get("lushu").surface, "earth");
  assert.equal(byId.get("ershu").surface, "air");
  assert.equal(byId.get("fuzhu").surface, "rock");
  assert.equal(byId.get("kui").surface, "water");
  assert.equal(byId.get("yinglong").surface, "air");
  assert.equal(byId.get("biyiniao").surface, "air");
});

test("the whole world fits landscape and portrait screens without losing creatures", () => {
  for (const viewport of [{ width: 1024, height: 588 }, { width: 768, height: 844 }, { width: 390, height: 620 }]) {
    const camera = cameraForBounds(viewport, worldMap, allBounds, 0);
    assert.equal(creaturesInView(creatures, camera, viewport, worldMap).length, 28);
    assert.ok(camera.x >= 0 && camera.y >= 0);
    assert.ok(worldMap.width * camera.scale <= viewport.width + 0.001);
    assert.ok(worldMap.height * camera.scale <= viewport.height + 0.001);
  }
});

test("Wenyaoyu stays over the river bend and Tianma flies just above the slope", () => {
  const byId = new Map(creatures.map((creature) => [creature.id, creature]));
  const fish = byId.get("wenyaoyu");
  const horse = byId.get("tianma");
  // Positions checked against the shared landscape used in both map views.
  assert.deepEqual(fish.position, { x: 20.2, y: 50.3, width: 4 });
  assert.deepEqual(horse.position, { x: 42.5, y: 19.2, width: 4.4 });
  assert.equal(creatureScene(horse, worldMap).lowFlight.clearance, 0.015);
  assert.match(horse.clueZh, /林间的地面/);
  assert.equal(fish.placeId, "taiqi");
  assert.equal(horse.placeId, "macheng");
  for (const creature of [fish, horse]) {
    assert.equal(creatureScene(creature, worldMap).surface, "air");
  }
});

test("Xuangui sits in the southern river pool with water in front of its feet", () => {
  const turtle = creatures.find((creature) => creature.id === "xuangui");
  // This open-water location is checked visually against the shared landscape.
  assert.deepEqual(turtle.position, { x: 47.8, y: 83, width: 4 });
  assert.equal(turtle.regionId, "southern");
  assert.equal(turtle.placeId, "niuyang");
  const scene = creatureScene(turtle, worldMap);
  assert.equal(scene.surface, "water");
  assert.ok(foregroundPath(scene), "the river foreground should cover the bottom of the sprite");
  assert.ok(sceneFitsWorld(scene, worldMap));
});

test("Ear Mouse flies low beside the forest, not at an unanchored sky position", () => {
  const mouse = creatures.find((creature) => creature.id === "ershu");
  assert.deepEqual(mouse.position, { x: 33.4, y: 31.7, width: 4.2 });
  assert.equal(mouse.placeId, "danxun");
  assert.match(mouse.clueZh, /林边/);
  assert.match(mouse.factsZh, /尾巴飞/);
  for (const id of ["ershu", "tianma", "wenyaoyu"]) {
    const scene = creatureScene(creatures.find((c) => c.id === id), worldMap);
    assert.equal(scene.surface, "air");
    assert.ok(scene.lowFlight.clearance > 0 && scene.lowFlight.clearance <= 0.12);
    assert.equal(scene.lowFlight.over, id === "wenyaoyu" ? "water" : "earth");
    const gap = scene.y - (scene.top + scene.height);
    assert.ok(Math.abs(gap - scene.height * scene.lowFlight.clearance) < 0.00001);
    assert.equal(foregroundPath(scene), "", "low flyers are not cut off as if standing on land");
  }
});

test("the reviewed water and perch positions retain their contact treatment", () => {
  const byId = new Map(creatures.map((c) => [c.id, c]));
  assert.deepEqual(byId.get("gudiao").position, { x: 33.4, y: 88.25, width: 4.2 });
  assert.deepEqual(byId.get("fenghuang").position, { x: 63, y: 66, width: 4.4 });
  assert.equal(creatureScene(byId.get("fenghuang"), worldMap).surface, "rock");
  for (const id of ["xuangui", "gudiao", "kui"]) {
    const scene = creatureScene(byId.get(id), worldMap);
    assert.equal(scene.surface, "water");
    assert.ok(scene.immersion >= 0.18 && scene.immersion <= 0.24);
    assert.ok(foregroundPath(scene), `${id} needs a visible waterline`);
  }
});

test("fox and deer have shelter while their heads and identifying features remain exposed", () => {
  const reviewed = {
    "nine-tailed-fox": { x: 51.3, y: 68.6, width: 3.8 },
    fuzhu: { x: 59.2, y: 51.6, width: 3.6 }
  };
  for (const [id, position] of Object.entries(reviewed)) {
    const creature = creatures.find((c) => c.id === id);
    assert.deepEqual(creature.position, position);
    const scene = creatureScene(creature, worldMap);
    assert.ok(scene.coverDepth >= 0.25 && scene.coverDepth <= 0.3);
    const foreground = foregroundPath(scene);
    assert.ok((foreground.match(/ L /g) || []).length > 8, "shelter uses a broken foreground edge, not a flat crop");
    assert.ok(sceneFitsWorld(scene, worldMap));
  }
});

test("the former seven-entry cluster around the three birds is spread out", () => {
  const birds = creatures.find((c) => c.id === "sanqingniao");
  // A fixed local neighborhood, not a promise about every screen/zoom size.
  const neighbors = creatures.filter((c) => c.id !== birds.id
    && Math.abs(c.position.x - birds.position.x) <= 12
    && Math.abs(c.position.y - birds.position.y) <= 14);
  assert.ok(neighbors.length <= 3, neighbors.map((c) => c.id).join(", "));
  const west = creatures.filter((c) => c.regionId === "western");
  const ys = west.map((c) => c.position.y);
  assert.ok(Math.max(...ys) - Math.min(...ys) >= 40, "use the length of the western terrain, not one dense band");
  assert.equal(west.length, 10, "spread the same creatures out without deleting or filtering any");
});

test("Jingwei carries her twig over the sea while her home and source remain northern", () => {
  const bird = creatures.find((c) => c.id === "jingwei");
  assert.deepEqual(bird.position, { x: 91, y: 34, width: 5.5 });
  assert.equal(bird.regionId, "eastern-sea");
  assert.equal(bird.placeId, "fajiu");
  assert.equal(bird.chapter, "《北山经》");
  assert.equal(creatureScene(bird, worldMap).surface, "air");
  assert.match(bird.clueZh, /东海的海面/);
  assert.match(bird.clueEn, /Eastern Sea/);
});

test("every regional destination zooms into the same continuous world", () => {
  const viewport = { width: 1024, height: 588 };
  const whole = cameraForBounds(viewport, worldMap, allBounds, 0);
  for (const region of regions) {
    const { bounds } = region;
    assert.ok(bounds.x >= 0 && bounds.y >= 0);
    assert.ok(bounds.x + bounds.width <= 100 && bounds.y + bounds.height <= 100);
    const camera = cameraForBounds(viewport, worldMap, bounds);
    assert.ok(camera.scale > whole.scale, `${region.id} should zoom in`);
    assert.ok(camera.scale <= whole.scale * 5, `${region.id} must fit the allowed zoom range`);
    const visible = creaturesInView(creatures, camera, viewport, worldMap);
    assert.ok(visible.length > 0 && visible.length < 28);
    for (const creature of creatures.filter((item) => item.regionId === region.id)) {
      assert.ok(visible.includes(creature), `${creature.id} lies outside the ${region.id} view`);
    }
  }
});

test("clue candidates follow the actual viewport, not a chapter filter", () => {
  const viewport = { width: 1024, height: 588 };
  const west = regions.find((region) => region.id === "western");
  const camera = cameraForBounds(viewport, worldMap, west.bounds);
  const initial = creaturesInView(creatures, camera, viewport, worldMap);
  assert.ok(initial.some((creature) => creature.id === "zheng"));
  assert.ok(!initial.some((creature) => creature.id === "kui"));
  const panned = { ...camera, x: camera.x - worldMap.width * camera.scale * 0.6 };
  const shifted = creaturesInView(creatures, panned, viewport, worldMap);
  assert.ok(shifted.some((creature) => creature.id === "kui"));
  assert.ok(!shifted.some((creature) => creature.id === "zheng"));
  assert.equal(creatures.length, 28, "panning does not remove or replace entries");
});

test("Changyou sits on the high bare-rock ledge described in its story", () => {
  const monkey = creatures.find((creature) => creature.id === "changyou");
  // Checked against the ledge above the waterfalls, not the shoreline below.
  assert.deepEqual(monkey.position, { x: 16, y: 74, width: 4.2 });
  assert.equal(monkey.regionId, "southern");
  assert.equal(monkey.placeId, "changyou-mountain");
  const scene = creatureScene(monkey, worldMap);
  assert.equal(scene.surface, "rock");
  assert.ok(foregroundPath(scene), "keep the seated sprite in contact with the ledge");
  assert.match(creatureStories.changyou.zh.join(""), /坐在高处/);
});

test("source chapters do not override a creature's narrated home", () => {
  const byId = new Map(creatures.map((creature) => [creature.id, creature]));
  const homes = new Map(places.map((place) => [place.id, place]));
  assert.equal(byId.get("yinglong").chapter, "《大荒北经》");
  assert.equal(byId.get("yinglong").regionId, "southern");
  assert.ok(byId.get("yinglong").position.y > 70);
  assert.equal(byId.get("kui").regionId, "eastern-sea");
  assert.ok(homes.get("liubo").x > homes.get("fajiu").x);
  assert.ok(homes.get("danxun").y > homes.get("shizhe").y);
  assert.ok(homes.get("qin").x > homes.get("huo").x);
  assert.ok(homes.get("huo").x > homes.get("zhange").x);
});
