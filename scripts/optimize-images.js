const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Simple image optimizer: finds images in public/img and writes optimized avif/webp to public/optimized
// Usage: node scripts/optimize-images.js

const srcDir = path.join(__dirname, "..", "public", "img");
const outDir = path.join(__dirname, "..", "public", "optimized");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full);
    } else {
      optimize(full);
    }
  }
}

async function optimize(file) {
  const rel = path.relative(srcDir, file);
  const outBase = path.join(outDir, rel);
  const outFolder = path.dirname(outBase);
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(ext)) return;

  const name = path.basename(file, ext);
  try {
    // write AVIF
    await sharp(file)
      .avif({ quality: 60 })
      .toFile(path.join(outFolder, `${name}.avif`));

    // write WebP
    await sharp(file)
      .webp({ quality: 70 })
      .toFile(path.join(outFolder, `${name}.webp`));

    // write a resized fallback for <img> heavy assets (max width 1200)
    await sharp(file)
      .resize({ width: 1200 })
      .toFile(path.join(outFolder, `${name}@1200${ext}`));

    console.log("Optimized:", rel);
  } catch (err) {
    console.error("Failed to optimize", rel, err.message || err);
  }
}

walk(srcDir);
