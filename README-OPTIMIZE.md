Image & GLTF Optimization Guide

This repository includes a small helper script to generate AVIF and WebP derivatives for images under `public/img` and places them in `public/optimized`.

1. Install dependencies (locally):

   npm install --save-dev sharp

2. Run the optimizer:

   node scripts/optimize-images.js

The script will create `public/optimized/...` copies with `.avif`, `.webp` and resized fallbacks.

GLB / glTF (Draco) compression

For glTF compression we recommend using glTF-Transform (or the CLI) to produce a Draco-compressed GLB. Example steps:

1. Install the glTF-Transform CLI:

   npm install -g @gltf-transform/cli

2. Compress the GLB with Draco:

   gltf-transform draco public/gltf/logo.glb public/gltf/logo.drc.glb --encoder-method=edgebreaker --quantize=16

Notes:

- Test the compressed GLB in your local dev environment (three/drei) and verify visual fidelity.
- Keep the original as backup and reference the compressed file in production only after validation.

Integration tips

- Use `next/image` for images delivered on the page; for LCP images set `priority={true}` on the NextImage component so Next will preload it appropriately.
- Avoid manual `link rel="preload"` for images that NextImage is handling. If you must preload a non-next/image asset, ensure it is truly the LCP image and you use the correct `as`/`type` attributes.
- Consider serving static assets from a CDN for global performance.
