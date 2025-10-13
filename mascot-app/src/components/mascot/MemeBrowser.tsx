import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMemesSync } from '@/data/loadMemes';
import { getSpecSync } from '@/data/loadSpec';
import type { Meme, MemeTemplate } from '@/types';

interface MemeBrowserProps {
  onSelectMeme: (meme: Meme, template: MemeTemplate) => void;
}

export function MemeBrowser({ onSelectMeme }: MemeBrowserProps) {
  const memes = getMemesSync();
  const spec = getSpecSync();

  const getMemeTemplate = (meme: Meme): MemeTemplate | undefined => {
    return spec.meme_templates.find(t => t.name === meme.title);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      intrinsic_motivation: 'bg-orange-500',
      gradual_progress: 'bg-blue-500',
      error_reflection: 'bg-red-500',
      consistent_practice: 'bg-green-500',
      self_discipline: 'bg-purple-500',
      systematic_learning: 'bg-cyan-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#111111' }}>Meme Browser</h2>
        <p className="text-gray-600">Browse all 20 learning-habit memes from systemsworld.club and system-school.ru communities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => {
          const template = getMemeTemplate(meme);
          return (
            <Card 
              key={meme.rank}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => template && onSelectMeme(meme, template)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{meme.title}</CardTitle>
                    <CardDescription className="text-sm">{meme.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">#{meme.rank}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(meme.category)}>
                      {meme.category.replace(/_/g, ' ')}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {meme.popularity} hits
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
                    <div>
                      <span className="font-semibold">Recognizability:</span> {(meme.recognizability * 100).toFixed(0)}%
                    </div>
                    <div>
                      <span className="font-semibold">Fidelity:</span> {(meme.fidelity * 100).toFixed(0)}%
                    </div>
                    <div>
                      <span className="font-semibold">Diversity:</span> {(meme.diversity * 100).toFixed(0)}%
                    </div>
                    <div>
                      <span className="font-semibold">Affect:</span> {(meme.affect * 100).toFixed(0)}%
                    </div>
                  </div>

                  {template && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm">
                        <span className="font-semibold">Format:</span> {template.format}
                      </div>
                      <div className="text-sm italic mt-1" style={{ color: '#FF6A00' }}>
                        "{template.hook}"
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
