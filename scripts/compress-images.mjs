import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

// Compression settings per image type
const PNG_QUALITY = 80;        // WebP quality for former PNGs
const MAX_WIDTH = 1920;        // Max width in pixels

async function compressImages() {
  const files = await readdir(imagesDir);
  const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png');

  console.log(`\n🖼️  Found ${pngFiles.length} PNG images to compress\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of pngFiles) {
    const filePath = join(imagesDir, file);
    const { size: sizeBefore } = await stat(filePath);
    totalBefore += sizeBefore;

    try {
      const image = sharp(filePath);
      const meta = await image.metadata();
      const width = meta.width || 0;

      // Resize if wider than max, maintain aspect ratio
      const resized = width > MAX_WIDTH
        ? image.resize(MAX_WIDTH, null, { withoutEnlargement: true })
        : image;

      // Compress in-place: write to temp, then replace
      const tempPath = filePath + '.tmp.png';

      await resized
        .png({ quality: PNG_QUALITY, compressionLevel: 9, adaptiveFiltering: true })
        .toFile(tempPath);

      const { size: sizeAfter } = await stat(tempPath);

      // Only replace if the compressed version is actually smaller
      if (sizeAfter < sizeBefore) {
        await rename(tempPath, filePath);
        totalAfter += sizeAfter;
        const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
        console.log(`  ✅ ${file}`);
        console.log(`     ${(sizeBefore/1024).toFixed(0)} KB → ${(sizeAfter/1024).toFixed(0)} KB  (${saved}% smaller)`);
      } else {
        // Compressed is bigger — keep original, remove temp
        const { unlink } = await import('fs/promises');
        await unlink(tempPath);
        totalAfter += sizeBefore;
        console.log(`  ⏭️  ${file} — already optimal, kept original`);
      }
    } catch (err) {
      totalAfter += sizeBefore;
      console.error(`  ❌ ${file} — error: ${err.message}`);
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const pct = ((totalSaved / totalBefore) * 100).toFixed(1);
  console.log(`\n📊 Summary:`);
  console.log(`   Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved:  ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${pct}% reduction)`);
  console.log(`\n✨ Done!\n`);
}

compressImages().catch(console.error);
