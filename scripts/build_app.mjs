import { build } from "esbuild";

await build({
  entryPoints: ["src/main.js"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  outfile: "app.js",
  banner: {
    js: "/* Generated from src/main.js. Do not edit directly. */"
  }
});
