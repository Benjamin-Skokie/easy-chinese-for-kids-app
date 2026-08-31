import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = resolve(import.meta.dirname, "..");
const mascotPath = resolve(root, "assets/brand/zongzi-guide.webp");
const outputDir = resolve(root, "assets/forms");

const width = 1600;
const height = 400;
const ivory = "#fffaf0";
const teal = "#176f70";
const gold = "#d99c28";
const roundedFont = "Arial Rounded MT Bold, Arial Rounded Bold, sans-serif";

const variants = [
  {
    output: "nihao-world-report-problem-header.png",
    title: "Report a Problem",
    icon: `
      <g transform="translate(1165 128) scale(5)" fill="none" stroke="${teal}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.2 5.2a2 2 0 0 0 2.8 2.8l5.2-5.2a4 4 0 0 0 5.4-5.4L14.6 12l-2.6-.7-.7-2.6z"/>
      </g>
      <path d="m1388 177 7 15 15 7-15 7-7 15-7-15-15-7 15-7z" fill="${gold}"/>
    `
  },
  {
    output: "nihao-world-share-feedback-header.png",
    title: "Share Feedback",
    icon: `
      <g transform="translate(-90 0)">
        <path d="M1304 154h70a25 25 0 0 1 25 25v30a25 25 0 0 1-25 25h-33l-27 20 7-20h-17a25 25 0 0 1-25-25v-30a25 25 0 0 1 25-25z" fill="none" stroke="${teal}" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
        <circle cx="1320" cy="194" r="5" fill="${teal}"/>
        <circle cx="1339" cy="194" r="5" fill="${teal}"/>
        <circle cx="1358" cy="194" r="5" fill="${teal}"/>
      </g>
      <path d="m1415 171 7 15 15 7-15 7-7 15-7-15-15-7 15-7z" fill="${gold}"/>
    `
  }
];

function overlay(title, icon) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="${ivory}"/>
      <path d="M42 200h122" stroke="${gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="M1436 200h122" stroke="${gold}" stroke-width="3" stroke-linecap="round"/>
      <text x="555" y="165" fill="${teal}" font-family="${roundedFont}" font-size="78" font-weight="700">Nıhao World</text>
      <path d="M616 96l10 10 10-10M696 96l10 10 10-10" fill="none" stroke="${teal}" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"/>
      <text x="555" y="270" fill="${gold}" font-family="${roundedFont}" font-size="64" font-weight="700">${title}</text>
      ${icon}
    </svg>
  `);
}

const mascot = await sharp(mascotPath)
  .resize(290, 290, { fit: "contain" })
  .png()
  .toBuffer();

for (const variant of variants) {
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: ivory
    }
  })
    .composite([
      { input: overlay(variant.title, variant.icon), left: 0, top: 0 },
      { input: mascot, left: 205, top: 55 }
    ])
    .png()
    .toFile(resolve(outputDir, variant.output));
}

const brandOnlyOverlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${ivory}"/>
    <text x="630" y="235" fill="${teal}" font-family="${roundedFont}" font-size="96" font-weight="700">Nıhao World</text>
    <path d="M705 151l12 12 12-12M804 151l12 12 12-12" fill="none" stroke="${teal}" stroke-linecap="round" stroke-linejoin="round" stroke-width="7"/>
  </svg>
`);

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: ivory
  }
})
  .composite([
    { input: brandOnlyOverlay, left: 0, top: 0 },
    { input: mascot, left: 285, top: 55 }
  ])
  .png()
  .toFile(resolve(outputDir, "nihao-world-google-forms-header.png"));

console.log("Rendered the shared Nihao World header and two form-specific variants.");
