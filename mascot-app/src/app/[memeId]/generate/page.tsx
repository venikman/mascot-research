import { getMemeTemplateById, getSpec } from '@/lib/data';
import MemeGenerator from './MemeGenerator';

export default function MemeGeneratorPage({ params }: { params: { memeId: string } }) {
  const { memeId } = params;
  const template = getMemeTemplateById(memeId);
  const spec = getSpec();

  return <MemeGenerator template={template || null} spec={spec} />;
}