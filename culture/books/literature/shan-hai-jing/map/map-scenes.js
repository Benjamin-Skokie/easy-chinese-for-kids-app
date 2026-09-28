import { spriteFrames } from "./sprite-frames.js?v=20260927-kui-restored-v1";

const flying = new Set(["biyiniao", "wenyaoyu", "tianma", "ershu", "jingwei", "yinglong", "sanqingniao"]);
// These positions mark the terrain BELOW a low flight, not the sprite's center.
// Clearance is a fraction of the visible artwork height and scales with the map.
const lowFlights = {
  ershu: { over: "earth", clearance: 0.1 },
  tianma: { over: "earth", clearance: 0.015 },
  wenyaoyu: { over: "water", clearance: 0.06 }
};
const water = new Set(["xuangui", "gudiao", "kui"]);
const stone = new Set(["changyou", "fenghuang", "jiao", "zheng", "bifang", "tiangou", "dijiang", "qitu", "zhuyan", "mengji", "fuzhu"]);

// Reviewed against the actual bushes/rocks at these two placements. Reveal the
// existing foreground across the lower body; never fade the whole creature out.
const sheltered = { "nine-tailed-fox": 0.28, fuzhu: 0.3 };

export function creatureScene(creature, world) {
  const frame = spriteFrames[creature.id];
  const surface = flying.has(creature.id) ? "air" : water.has(creature.id) ? "water" : stone.has(creature.id) ? "rock" : "earth";
  const width = creature.position.width / 100 * world.width * 0.7;
  const height = width * frame.artHeight / frame.artWidth;
  const x = creature.position.x / 100 * world.width;
  const y = creature.position.y / 100 * world.height;
  const lowFlight = lowFlights[creature.id];
  const anchorHeight = lowFlight ? 1 + lowFlight.clearance : surface === "air" ? 0.5 : 1;
  const immersion = surface === "water" ? (creature.id === "xuangui" ? 0.24 : 0.18) : 0;
  const coverDepth = sheltered[creature.id] || 0;
  return { surface, frame, width, height, x, y, lowFlight, anchorHeight, immersion, coverDepth,
    left: x - width / 2, top: y - height * anchorHeight };
}

// Reveal original foreground ground/water over a small, uneven part of the feet.
// This is a depth layer of the SAME landscape, not an added patch or a new habitat.
export function foregroundPath(scene) {
  if (scene.surface === "air") return "";
  const { x, y, width: w, height: h } = scene;
  const depth = scene.coverDepth || (scene.surface === "water" ? scene.immersion : scene.surface === "earth" ? 0.055 : 0.025);
  const l = x - w / 2;
  const r = x + w / 2;
  const edge = y - h * depth;
  if (scene.coverDepth) {
    // A broken foliage/stone edge, rather than a straight crop through the legs.
    const contour = [[0, 0], [0.08, -0.03], [0.15, 0.015], [0.22, -0.06],
      [0.3, -0.015], [0.4, 0.02], [0.48, -0.035], [0.57, 0],
      [0.65, -0.07], [0.72, -0.035], [0.8, -0.1], [0.9, -0.07], [1, -0.14]];
    return contour.map(([dx, dy], i) => `${i ? "L" : "M"} ${l + w * dx} ${edge + h * dy}`).join(" ")
      + ` L ${r} ${y + h * 0.14} L ${l} ${y + h * 0.14} Z`;
  }
  return `M ${l} ${y} Q ${l + w * 0.12} ${edge - h * 0.025} ${l + w * 0.3} ${edge} T ${l + w * 0.6} ${edge + h * 0.025} Q ${l + w * 0.85} ${edge - h * 0.035} ${r} ${y} L ${r} ${y + h * 0.14} L ${l} ${y + h * 0.14} Z`;
}

export function sceneFitsWorld(scene, world) {
  return scene.left >= 0 && scene.top >= 0 && scene.left + scene.width <= world.width && scene.top + scene.height <= world.height;
}
