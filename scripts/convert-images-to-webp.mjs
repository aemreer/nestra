import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "images", "models");

function getQuality(filePath) {
  const name = path.basename(filePath).toLowerCase();

  if (name.includes("plan")) return 92;
  if (name.includes("material-detail")) return 88;

  return 85;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walk(fullPath);

    return [fullPath];
  });
}

const images = walk(root).filter((file) =>
  /\.(png|jpg|jpeg)$/i.test(file)
);

let originalTotal = 0;
let webpTotal = 0;

for (const file of images) {
  const output = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const quality = getQuality(file);

  await sharp(file)
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(output);

  const originalSize = fs.statSync(file).size;
  const webpSize = fs.statSync(output).size;

  originalTotal += originalSize;
  webpTotal += webpSize;

  console.log(
    `${path.relative(root, file)} | q${quality} | ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(webpSize / 1024 / 1024).toFixed(2)} MB`
  );
}

console.log("\n--- TOPLAM ---");
console.log(`Original: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`WebP:     ${(webpTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(
  `Kazanç:   ${((1 - webpTotal / originalTotal) * 100).toFixed(1)}%`
);