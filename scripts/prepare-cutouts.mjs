/**
 * Cutout por flood-fill a partir das bordas (fundo de estúdio cinza).
 * Preserva calça branca porque só remove o que está conectado à borda.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawDir = path.join(root, "public", "images", "raw");
const outDir = path.join(root, "public", "images");

const jobs = [
  { src: "hero-source.png", out: "luzia-mary-hero.png", label: "hero" },
  { src: "trajetoria-source.png", out: "luzia-mary-trajetoria.png", label: "trajetoria" },
  { src: "participe-source.png", out: "luzia-mary-participe.png", label: "participe" },
];

function colorDist(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function sampleBg(data, width, height) {
  const pts = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
    [Math.floor(width / 2), 2],
    [2, Math.floor(height / 2)],
    [width - 3, Math.floor(height / 2)],
  ];
  let r = 0, g = 0, b = 0;
  for (const [x, y] of pts) {
    const i = (y * width + x) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  return [r / pts.length, g / pts.length, b / pts.length];
}

function cutoutRgba(data, width, height, threshold = 38, soft = 18) {
  const [br, bg, bb] = sampleBg(data, width, height);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    const d = colorDist(data[i], data[i + 1], data[i + 2], br, bg, bb);
    if (d > threshold + soft) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  const out = Buffer.from(data);
  for (let idx = 0; idx < width * height; idx++) {
    if (!visited[idx]) continue;
    const i = idx * 4;
    const d = colorDist(out[i], out[i + 1], out[i + 2], br, bg, bb);
    let alpha = 255;
    if (d <= threshold) alpha = 0;
    else if (d < threshold + soft) alpha = Math.round(((d - threshold) / soft) * 255);
    out[i + 3] = Math.min(out[i + 3], alpha);
  }
  return out;
}

async function processOne(job) {
  const inputPath = path.join(rawDir, job.src);
  const outputPath = path.join(outDir, job.out);
  console.log(`[${job.label}] processando...`);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cut = cutoutRgba(data, info.width, info.height);

  await sharp(cut, { raw: { width: info.width, height: info.height, channels: 4 } })
    .modulate({ brightness: 1.03, saturation: 1.1 })
    .linear(1.05, -6)
    .trim({ threshold: 5 })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`[${job.label}] ok → ${job.out} (${meta.width}x${meta.height})`);
}

for (const job of jobs) {
  await processOne(job);
}
console.log("done");
