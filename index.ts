import { MemePackage } from './types';
import { promises as fs, createWriteStream } from 'fs';
import * as path from 'path';
import archiver from 'archiver';

const REPO_PATH = 'cass';

// A simple logger
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`);
    if (error) {
      console.error(error);
    }
  },
};

async function getMemePackages(): Promise<MemePackage[]> {
  logger.info('Reading meme index from the repository...');
  const memeIndexContent = await fs.readFile(`${REPO_PATH}/public/memes/index.json`, 'utf-8');
  const memeIndex = JSON.parse(memeIndexContent);

  const memePackages: MemePackage[] = [];
  for (const meme of memeIndex.memes) {
    const memeFolderPath = `${REPO_PATH}/memes/${meme.folder}`;
    try {
      const titleFilePath = `${memeFolderPath}/${meme.folder}.md`;
      const title = (await fs.readFile(titleFilePath, 'utf-8')).trim();
      const finalModelRepresentation = (await fs.readFile(`${memeFolderPath}/FinalModel.md`, 'utf-8')).trim();

      const files = await fs.readdir(memeFolderPath);
      const imageFiles = files.filter(file => file.endsWith('.png'));

      if (imageFiles.length < 2) {
        logger.warn(`Could not find at least two images for meme: ${meme.folder}`);
        continue;
      }

      memePackages.push({
        title,
        url: `https://github.com/venikman/cass/tree/main/memes/${meme.folder}`,
        finalModelRepresentation: {
          type: 'text',
          content: finalModelRepresentation,
        },
        imagePrompts: [
          `Image prompt for ${title}`,
          `Another image prompt for ${title}`
        ],
        generatedImages: imageFiles.map((image: string) => `memes/${meme.folder}/${image}`) as [string, string],
      });
    } catch (error) {
      logger.error(`Failed to read or parse meme data for ${meme.folder}`, error);
    }
  }

  logger.info(`Found ${memePackages.length} meme packages.`);
  return memePackages;
}


async function packageArtifacts(memePackages: MemePackage[], zipFilePath: string) {
  logger.info(`Packaging artifacts into ${zipFilePath}...`);
  const output = createWriteStream(zipFilePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.append(JSON.stringify(memePackages, null, 2), { name: 'memes.json' });

  await archive.finalize();
  logger.info('Artifact packaging complete.');
}

async function main(outputZipFile: string) {
  logger.info('Starting meme extraction agent...');
  try {
    const memePackages = await getMemePackages();

    if (memePackages.length > 0) {
      await packageArtifacts(memePackages, outputZipFile);
    } else {
      logger.warn('No meme packages were found. Skipping packaging.');
    }

  } catch (error) {
    logger.error('An unexpected error occurred in the agent', error);
    process.exit(1);
  }
}

function printUsage() {
  console.log('Meme Extraction Agent');
  console.log('\nUsage: bun run index.ts <output-zip-file>');
  console.log('\nOptions:');
  console.log('  --help, -h    Show this help message and exit');
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const outputZipFile = args[0];

  if (!outputZipFile) {
    console.error('Error: Output file must be specified.');
    console.log('');
    printUsage();
    process.exit(1);
  }

  main(outputZipFile);
}
