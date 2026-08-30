import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const argumentIndex = process.argv.indexOf("--out-dir");
if (argumentIndex === -1 || !process.argv[argumentIndex + 1]) {
  throw new Error("Usage: node scripts/generate-clock-assets.mjs --out-dir <directory>");
}

const outputDirectory = resolve(process.argv[argumentIndex + 1]);
mkdirSync(outputDirectory, { recursive: true });

const size = 512;
const center = size / 2;
const outerRadius = 214;
const blueRingRadius = 206;
const faceRadius = 188;
const tickRadius = 170;
const supersample = 4;
const sourceSize = size * supersample;
const colours = {
  background: [255, 251, 241],
  outline: [35, 35, 35],
  blueOutline: [11, 88, 181],
  blue: [25, 113, 207],
  hour: [204, 63, 50]
};

function tickMarkup() {
  return Array.from({ length: 60 }, (_, index) => {
    const angle = (index * 6 - 90) * Math.PI / 180;
    const isHour = index % 5 === 0;
    const outer = tickRadius;
    const inner = outer - (isHour ? 21 : 8);
    const x1 = (center + Math.cos(angle) * inner).toFixed(2);
    const y1 = (center + Math.sin(angle) * inner).toFixed(2);
    const x2 = (center + Math.cos(angle) * outer).toFixed(2);
    const y2 = (center + Math.sin(angle) * outer).toFixed(2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${isHour ? "tick-hour" : "tick-minute"}" />`;
  }).join("");
}

function clockSvg(hour) {
  const hourRotation = (hour % 12) * 30;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${hour} o'clock analog clock">
  <style>
    .tick-minute { stroke: #232323; stroke-width: 4; stroke-linecap: round; }
    .tick-hour { stroke: #232323; stroke-width: 10; stroke-linecap: round; }
    .minute { stroke: #232323; stroke-width: 13; stroke-linecap: round; }
    .hour { stroke: #cc3f32; stroke-width: 16; stroke-linecap: round; }
  </style>
  <rect width="${size}" height="${size}" fill="#ffffff" />
  <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="#0b58b5" />
  <circle cx="${center}" cy="${center}" r="${blueRingRadius}" fill="#1971cf" />
  <circle cx="${center}" cy="${center}" r="${faceRadius}" fill="#fffbf1" />
  ${tickMarkup()}
  <line x1="${center}" y1="${center}" x2="${center}" y2="130" class="minute" />
  <g transform="rotate(${hourRotation} ${center} ${center})"><line x1="${center}" y1="${center}" x2="${center}" y2="158" class="hour" /></g>
  <circle cx="${center}" cy="${center}" r="17" fill="#232323" />
  <circle cx="${center}" cy="${center}" r="10" fill="#4c4c4c" />
</svg>`;
}

function drawDisc(pixels, width, cx, cy, radius, colour) {
  const startX = Math.max(0, Math.floor(cx - radius));
  const endX = Math.min(width - 1, Math.ceil(cx + radius));
  const startY = Math.max(0, Math.floor(cy - radius));
  const endY = Math.min(width - 1, Math.ceil(cy + radius));
  const radiusSquared = radius * radius;
  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      if (dx * dx + dy * dy <= radiusSquared) {
        const offset = (y * width + x) * 3;
        pixels[offset] = colour[0];
        pixels[offset + 1] = colour[1];
        pixels[offset + 2] = colour[2];
      }
    }
  }
}

function drawRoundLine(pixels, width, x1, y1, x2, y2, lineWidth, colour) {
  const radius = lineWidth / 2;
  const minX = Math.max(0, Math.floor(Math.min(x1, x2) - radius));
  const maxX = Math.min(width - 1, Math.ceil(Math.max(x1, x2) + radius));
  const minY = Math.max(0, Math.floor(Math.min(y1, y2) - radius));
  const maxY = Math.min(width - 1, Math.ceil(Math.max(y1, y2) + radius));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const projection = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSquared));
      const closestX = x1 + projection * dx;
      const closestY = y1 + projection * dy;
      if ((px - closestX) ** 2 + (py - closestY) ** 2 <= radius * radius) {
        const offset = (y * width + x) * 3;
        pixels[offset] = colour[0];
        pixels[offset + 1] = colour[1];
        pixels[offset + 2] = colour[2];
      }
    }
  }
}

function clockPixels(hour) {
  const pixels = new Uint8Array(sourceSize * sourceSize * 3);
  for (let offset = 0; offset < pixels.length; offset += 3) {
    pixels[offset] = 255;
    pixels[offset + 1] = 255;
    pixels[offset + 2] = 255;
  }
  const scale = supersample;
  const scaledCenter = center * scale;
  drawDisc(pixels, sourceSize, scaledCenter, scaledCenter, outerRadius * scale, colours.blueOutline);
  drawDisc(pixels, sourceSize, scaledCenter, scaledCenter, blueRingRadius * scale, colours.blue);
  drawDisc(pixels, sourceSize, scaledCenter, scaledCenter, faceRadius * scale, colours.background);
  for (let index = 0; index < 60; index += 1) {
    const angle = (index * 6 - 90) * Math.PI / 180;
    const major = index % 5 === 0;
    const outer = tickRadius * scale;
    const inner = (tickRadius - (major ? 21 : 8)) * scale;
    drawRoundLine(pixels, sourceSize,
      scaledCenter + Math.cos(angle) * inner,
      scaledCenter + Math.sin(angle) * inner,
      scaledCenter + Math.cos(angle) * outer,
      scaledCenter + Math.sin(angle) * outer,
      (major ? 10 : 4) * scale,
      colours.outline);
  }
  drawRoundLine(pixels, sourceSize, scaledCenter, scaledCenter, scaledCenter, 130 * scale, 13 * scale, colours.outline);
  const hourAngle = ((hour % 12) * 30 - 90) * Math.PI / 180;
  drawRoundLine(pixels, sourceSize, scaledCenter, scaledCenter,
    scaledCenter + Math.cos(hourAngle) * 98 * scale,
    scaledCenter + Math.sin(hourAngle) * 98 * scale,
    16 * scale,
    colours.hour);
  drawDisc(pixels, sourceSize, scaledCenter, scaledCenter, 17 * scale, colours.outline);
  drawDisc(pixels, sourceSize, scaledCenter, scaledCenter, 10 * scale, [76, 76, 76]);
  return pixels;
}

function downsample(pixels) {
  const output = new Uint8Array(size * size * 3);
  const sampleCount = supersample * supersample;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sums = [0, 0, 0];
      for (let subY = 0; subY < supersample; subY += 1) {
        for (let subX = 0; subX < supersample; subX += 1) {
          const sourceOffset = (((y * supersample + subY) * sourceSize) + x * supersample + subX) * 3;
          sums[0] += pixels[sourceOffset];
          sums[1] += pixels[sourceOffset + 1];
          sums[2] += pixels[sourceOffset + 2];
        }
      }
      const targetOffset = (y * size + x) * 3;
      output[targetOffset] = Math.round(sums[0] / sampleCount);
      output[targetOffset + 1] = Math.round(sums[1] / sampleCount);
      output[targetOffset + 2] = Math.round(sums[2] / sampleCount);
    }
  }
  return output;
}

function writePpm(path, width, height, pixels) {
  writeFileSync(path, Buffer.concat([Buffer.from(`P6\n${width} ${height}\n255\n`), Buffer.from(pixels)]));
}

function contactSheetSvg() {
  const cardSize = 180;
  const padding = 20;
  const columns = 3;
  const rows = 4;
  const width = padding * 2 + columns * cardSize;
  const height = padding * 2 + rows * cardSize;
  const cards = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 1;
    const x = padding + (index % columns) * cardSize;
    const y = padding + Math.floor(index / columns) * cardSize;
    const scale = cardSize / size;
    return `<g transform="translate(${x} ${y}) scale(${scale})">${clockSvg(hour).replace(/^<svg[^>]*>|<\/svg>$/g, "")}</g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f7f2e9" />${cards}</svg>`;
}

function contactSheetPpm(clockImages) {
  const padding = 16;
  const card = 160;
  const columns = 3;
  const width = padding * 2 + columns * card;
  const height = padding * 2 + 4 * card;
  const output = new Uint8Array(width * height * 3);
  for (let offset = 0; offset < output.length; offset += 3) {
    output[offset] = 247;
    output[offset + 1] = 242;
    output[offset + 2] = 233;
  }
  clockImages.forEach((clock, index) => {
    const originX = padding + (index % columns) * card;
    const originY = padding + Math.floor(index / columns) * card;
    for (let y = 0; y < card; y += 1) {
      for (let x = 0; x < card; x += 1) {
        const sourceX = Math.floor(x * size / card);
        const sourceY = Math.floor(y * size / card);
        const sourceOffset = (sourceY * size + sourceX) * 3;
        const targetOffset = ((originY + y) * width + originX + x) * 3;
        output[targetOffset] = clock[sourceOffset];
        output[targetOffset + 1] = clock[sourceOffset + 1];
        output[targetOffset + 2] = clock[sourceOffset + 2];
      }
    }
  });
  return { width, height, pixels: output };
}

const renderedClocks = [];
for (let hour = 1; hour <= 12; hour += 1) {
  writeFileSync(resolve(outputDirectory, `${hour}oclock.svg`), clockSvg(hour));
  const rendered = downsample(clockPixels(hour));
  renderedClocks.push(rendered);
  writePpm(resolve(outputDirectory, `${hour}oclock.ppm`), size, size, rendered);
}
writeFileSync(resolve(outputDirectory, "clock-contact-sheet.svg"), contactSheetSvg());
const contactSheet = contactSheetPpm(renderedClocks);
writePpm(resolve(outputDirectory, "clock-contact-sheet.ppm"), contactSheet.width, contactSheet.height, contactSheet.pixels);
