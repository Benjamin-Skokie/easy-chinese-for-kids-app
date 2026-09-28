// Percent-based regions are camera destinations, not separate maps.
export function cameraForBounds(viewport, world, bounds, padding = 24) {
  const width = world.width * bounds.width / 100;
  const height = world.height * bounds.height / 100;
  const scale = Math.min(
    Math.max(1, viewport.width - padding * 2) / width,
    Math.max(1, viewport.height - padding * 2) / height
  );
  return {
    scale,
    x: viewport.width / 2 - world.width * (bounds.x + bounds.width / 2) / 100 * scale,
    y: viewport.height / 2 - world.height * (bounds.y + bounds.height / 2) / 100 * scale
  };
}

export function creaturesInView(creatures, camera, viewport, world) {
  return creatures.filter(({ position }) => {
    const x = camera.x + position.x / 100 * world.width * camera.scale;
    const y = camera.y + position.y / 100 * world.height * camera.scale;
    return x >= 0 && x <= viewport.width && y >= 0 && y <= viewport.height;
  });
}
