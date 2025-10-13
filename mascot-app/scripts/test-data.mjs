import { getAllMemeInfo } from '../src/lib/data.js';

try {
  const memes = getAllMemeInfo();
  console.log('Successfully loaded memes:');
  console.log(JSON.stringify(memes, null, 2));
  console.log(`Total memes loaded: ${memes.length}`);
  if (memes.length !== 20) {
    throw new Error(`Expected 20 memes, but got ${memes.length}`);
  }
} catch (error) {
  console.error('Failed to load meme data:', error);
  process.exit(1);
}