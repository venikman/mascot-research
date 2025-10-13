'use client';

import { useState, useEffect } from 'react';
import { MemeTemplate, Spec } from '@/lib/types';
import MemePanel from '@/components/meme/MemePanel';

interface MemeGeneratorProps {
  template: MemeTemplate | null;
  spec: Spec | null;
}

export default function MemeGenerator({ template, spec }: MemeGeneratorProps) {
  const [variables, setVariables] = useState<{ [key: string]: string }>({});
  const [format, setFormat] = useState<'IG_portrait_1080x1350' | 'Story_1080x1920'>('IG_portrait_1080x1350');

  useEffect(() => {
    if (template) {
      const initialVariables: { [key: string]: string } = {};
      template.variables.forEach(variable => {
        initialVariables[variable] = `[${variable}]`;
      });
      setVariables(initialVariables);
    }
  }, [template]);

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const getInterpolatedText = (text: string) => {
    let interpolated = text;
    for (const key in variables) {
      interpolated = interpolated.replace(new RegExp(`\\[${key}\\]`, 'g'), variables[key]);
    }
    return interpolated;
  };

  if (!template || !spec) {
    return <div>Meme not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{template.name}</h1>
      <p className="text-center text-gray-600 mb-8">{template.hook}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="controls">
          <h2 className="text-2xl font-semibold mb-4">Customize</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full p-2 border rounded"
            >
              <option value="IG_portrait_1080x1350">Instagram Post (1080x1350)</option>
              <option value="Story_1080x1920">Story (1080x1920)</option>
            </select>
          </div>

          {template.variables.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Variables</h3>
              {template.variables.map(variable => (
                <div key={variable} className="mb-2">
                  <label className="block font-bold mb-1 capitalize">{variable.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    name={variable}
                    value={variables[variable] || ''}
                    onChange={handleVariableChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const link = document.createElement('a');
                link.download = `${template.id}-${format}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              }
            }}
            className="bg-accentA text-white font-bold py-2 px-4 rounded hover:bg-opacity-80"
          >
            Download Meme
          </button>
        </div>

        <div className="preview flex justify-center items-start">
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <MemePanel
              memeId={template.id}
              hookText={getInterpolatedText(template.hook)}
              bodyText={getInterpolatedText(template.name)}
              pose="neutral"
              format={format}
              spec={spec}
            />
          </div>
        </div>
      </div>
    </div>
  );
}