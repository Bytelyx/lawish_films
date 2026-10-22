import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '..', 'src', 'assets');

// Sample URLs for local file population
const categoryUrls = {
  wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=75',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=75',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=75',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=75',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=75',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=75',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=75',
    'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=600&q=75',
  ],
  intimate: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=75',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=75',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=75',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=75',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=75',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=75',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=75',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=75',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=75',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=75',
  ],
  party: [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=75',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=75',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=75',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=75',
  ],
  maternity: [
    'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&q=75',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=75',
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=75',
    'https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=600&q=75',
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=75',
  ]
};

async function downloadFile(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`Failed ${dest}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Populating local images...');
  for (const [cat, urls] of Object.entries(categoryUrls)) {
    const folder = path.join(baseDir, 'images', cat);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    // Populate 15 to 20 images
    const targetCount = cat === 'wedding' ? 20 : 15;
    for (let i = 1; i <= targetCount; i++) {
      const pad = String(i).padStart(2, '0');
      const filename = `${cat}-${pad}.jpg`;
      const filePath = path.join(folder, filename);

      if (!fs.existsSync(filePath)) {
        const sourceUrl = urls[(i - 1) % urls.length];
        await downloadFile(sourceUrl, filePath);
        process.stdout.write('.');
      }
    }
  }

  // Populate sample video placeholder
  const videoFolder = path.join(baseDir, 'videos');
  if (!fs.existsSync(videoFolder)) {
    fs.mkdirSync(videoFolder, { recursive: true });
  }
  const videoPath = path.join(videoFolder, 'wedding-highlight.mp4');
  if (!fs.existsSync(videoPath)) {
    console.log('\nFetching sample video placeholder...');
    await downloadFile(
      'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-under-an-arch-of-flowers-43389-large.mp4',
      videoPath
    );
  }

  console.log('\nLocal asset population complete.');
}

main();
