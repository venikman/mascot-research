import fs from 'fs';
import path from 'path';
import { Spec, MemeInfo, MemeTemplate } from './types';
import specData from '@/data/spec.json';

const memesFilePath = path.join(process.cwd(), 'src/data/Memes.md');

export function getSpec(): Spec {
  return specData as Spec;
}

export function getAllMemeInfo(): MemeInfo[] {
  const fileContents = fs.readFileSync(memesFilePath, 'utf8');
  // The memes are in the second block, between the first and second '---'
  const sections = fileContents.split('\n---\n');
  if (sections.length < 2) return [];
  const memeContentBlock = sections[1];

  // The memes are separated by one or more blank lines.
  const memeStrings = memeContentBlock.split('\n\n');

  const memes = memeStrings.map(section => {
    const trimmedSection = section.trim();
    if (!trimmedSection.match(/^\d+\.\s\*\*/)) {
      return null; // Not a meme entry
    }
    const lines = trimmedSection.split('\n');
    const titleLine = lines[0];

    const nameMatch = titleLine.match(/\d+\.\s\*\*(.*?)\*\*/);
    const name = nameMatch ? nameMatch[1].split('—')[0].trim() : "Unknown";

    const idMatch = titleLine.match(/\[Полезный мем (\d+)\]/);
    const memeNumber = idMatch ? idMatch[1] : null;

    const specMeme = getSpec().meme_templates.find(m => m.id === `m${memeNumber}`);
    const id = specMeme ? specMeme.id : (memeNumber ? `m${memeNumber}` : 'm-unknown');
    const finalName = specMeme ? specMeme.name : name;

    const popularityLine = lines.find(line => line.includes('Popularity'));
    const popularityMatch = popularityLine ? popularityLine.match(/(\d+)\s+hits/) : null;
    const popularity = popularityMatch ? parseInt(popularityMatch[1]) : 0;

    const descriptionLine = lines.find(line => line.includes('**Description**:'));
    const description = descriptionLine ? descriptionLine.split('**Description**:')[1].trim() : '';

    return { id, name: finalName, description, popularity };
  }).filter((meme): meme is MemeInfo => meme !== null);

  return memes;
}

export function getMemeTemplateById(id: string): MemeTemplate | undefined {
    const spec = getSpec();
    return spec.meme_templates.find(template => template.id === id);
}