#!/usr/bin/env node
import { generateCssForClass, scanAndGenerate } from "../dist/index.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`Usage:
  atomiccss-gen <className>
  atomiccss-gen --scan <dir> --out <file> [--watch]`);
  process.exit(1);
}

// Single class usage
if (!args[0].startsWith("--")) {
  for (const cls of args) {
    const result = generateCssForClass(cls);
    if (result) console.log(result);
    else console.error(`No rule found for ${cls}`);
  }
  process.exit(0);
}

// Scan usage
const srcDir = args[args.indexOf("--scan") + 1] || "./src";
const outFile = args[args.indexOf("--out") + 1] || "./atomic.css";
const watch = args.includes("--watch");

scanAndGenerate({ srcDir, outFile, watch });
