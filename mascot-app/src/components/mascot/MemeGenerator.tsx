import { useState, useRef, useEffect } from 'react';
import { Canvas, Text, Rect } from 'fabric';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Download, RefreshCw } from 'lucide-react';
import { getSpecSync } from '@/data/loadSpec';
import type { MemeTemplate } from '@/types';

interface MemeGeneratorProps {
  initialTemplate?: MemeTemplate;
  initialPose?: string;
}

export function MemeGenerator({ initialTemplate, initialPose }: MemeGeneratorProps) {
  const spec = getSpecSync();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | undefined>(initialTemplate);
  const [selectedPose, setSelectedPose] = useState<string>(initialPose || 'neutral');
  const [format, setFormat] = useState<'instagram' | 'story'>('instagram');
  const [customHook, setCustomHook] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        backgroundColor: spec.palette.paper,
      });
      fabricCanvasRef.current = canvas;
    }
    
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      setCustomHook(initialTemplate.hook);
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (initialPose) {
      setSelectedPose(initialPose);
    }
  }, [initialPose]);

  const generateMeme = () => {
    if (!fabricCanvasRef.current || !selectedTemplate) return;

    const canvas = fabricCanvasRef.current;
    const layout = format === 'instagram' 
      ? spec.layout_templates.IG_portrait_1080x1350 
      : spec.layout_templates.Story_1080x1920;

    canvas.setDimensions({
      width: layout.size_px[0],
      height: layout.size_px[1]
    });

    canvas.clear();
    canvas.backgroundColor = spec.palette.paper;

    const safeArea = layout.safe_area_px;
    const hookText = customHook || selectedTemplate.hook;
    const bodyText = customBody || `Format: ${selectedTemplate.format}`;

    const hookWords = hookText.split(' ').length;
    const bodyWords = bodyText.split(' ').length;
    if (hookWords > spec.typography.max_words_hook) {
      alert(`Hook has ${hookWords} words, max is ${spec.typography.max_words_hook}`);
      return;
    }
    if (bodyWords > spec.typography.max_words_body) {
      alert(`Body has ${bodyWords} words, max is ${spec.typography.max_words_body}`);
      return;
    }

    const hook = new Text(hookText, {
      left: safeArea.left,
      top: format === 'instagram' ? 100 : 140,
      fontSize: 48,
      fontFamily: spec.typography.family[0],
      fontWeight: 'bold',
      fill: spec.palette.ink,
      width: layout.size_px[0] - safeArea.left - safeArea.right,
    });
    canvas.add(hook);

    const mascotSize = 200;
    const mascot = new Rect({
      left: (layout.size_px[0] - mascotSize) / 2,
      top: format === 'instagram' ? 400 : 700,
      width: mascotSize,
      height: mascotSize,
      fill: spec.palette.accentA,
      rx: 20,
      ry: 20,
    });
    canvas.add(mascot);

    const poseLabel = new Text(`Δbit\n${selectedPose.replace(/_/g, ' ')}`, {
      left: (layout.size_px[0] - mascotSize) / 2,
      top: format === 'instagram' ? 420 : 720,
      fontSize: 36,
      fontFamily: spec.typography.family[0],
      fontWeight: 'bold',
      fill: spec.palette.paper,
      width: mascotSize,
      textAlign: 'center',
    });
    canvas.add(poseLabel);

    if (bodyText) {
      const body = new Text(bodyText, {
        left: safeArea.left,
        top: format === 'instagram' ? 1150 : 1700,
        fontSize: 32,
        fontFamily: spec.typography.family[0],
        fill: spec.palette.ink,
        width: layout.size_px[0] - safeArea.left - safeArea.right,
      });
      canvas.add(body);
    }

    const formatLabel = new Text(selectedTemplate.format, {
      left: safeArea.left,
      top: format === 'instagram' ? 650 : 1100,
      fontSize: 28,
      fontFamily: spec.typography.family[0],
      fill: spec.palette.accentB,
    });
    canvas.add(formatLabel);

    canvas.renderAll();
  };

  const downloadMeme = () => {
    if (!fabricCanvasRef.current) return;
    
    const dataURL = fabricCanvasRef.current.toDataURL();
    
    const link = document.createElement('a');
    link.download = `${selectedTemplate?.id || 'meme'}-${selectedPose}-${format}.png`;
    link.href = dataURL;
    link.click();
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#111111' }}>Meme Generator</h2>
        <p className="text-gray-600">Generate learning-habit meme panels using fabric.js canvas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Select template, pose, and format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Meme Template</Label>
                <Select
                  value={selectedTemplate?.id}
                  onValueChange={(id) => {
                    const template = spec.meme_templates.find(t => t.id === id);
                    setSelectedTemplate(template);
                    if (template) setCustomHook(template.hook);
                  }}
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a meme template" />
                  </SelectTrigger>
                  <SelectContent>
                    {spec.meme_templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pose">Mascot Pose</Label>
                <Select value={selectedPose} onValueChange={setSelectedPose}>
                  <SelectTrigger id="pose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {spec.pose_library.map(pose => (
                      <SelectItem key={pose} value={pose}>
                        {pose.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select value={format} onValueChange={(v) => setFormat(v as 'instagram' | 'story')}>
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram Post (1080x1350)</SelectItem>
                    <SelectItem value="story">Instagram Story (1080x1920)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hook">
                  Hook Text (max {spec.typography.max_words_hook} words)
                  {customHook && (
                    <span className={wordCount(customHook) > spec.typography.max_words_hook ? 'text-red-500 ml-2' : 'text-green-500 ml-2'}>
                      {wordCount(customHook)} words
                    </span>
                  )}
                </Label>
                <Input
                  id="hook"
                  value={customHook}
                  onChange={(e) => setCustomHook(e.target.value)}
                  placeholder={selectedTemplate?.hook || "Enter hook text"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">
                  Body Text (max {spec.typography.max_words_body} words)
                  {customBody && (
                    <span className={wordCount(customBody) > spec.typography.max_words_body ? 'text-red-500 ml-2' : 'text-green-500 ml-2'}>
                      {wordCount(customBody)} words
                    </span>
                  )}
                </Label>
                <Textarea
                  id="body"
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  placeholder="Optional body text"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={generateMeme} disabled={!selectedTemplate} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Meme
                </Button>
                <Button onClick={downloadMeme} disabled={!selectedTemplate} variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              {selectedTemplate && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Template Info</h4>
                  <p className="text-sm text-gray-600">Format: {selectedTemplate.format}</p>
                  <p className="text-sm text-gray-600">Default Hook: "{selectedTemplate.hook}"</p>
                  {selectedTemplate.variables.length > 0 && (
                    <p className="text-sm text-gray-600">Variables: {selectedTemplate.variables.join(', ')}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Canvas preview (scaled to fit)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center" style={{ minHeight: '400px' }}>
                <canvas ref={canvasRef} className="max-w-full h-auto" />
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>Colors: ink={spec.palette.ink}, paper={spec.palette.paper}, accentA={spec.palette.accentA}, accentB={spec.palette.accentB}</p>
                <p>Typography: {spec.typography.family.join(', ')}, min {spec.typography.min_font_px}px</p>
                <p>Contrast requirement: {'>='} {spec.typography.contrast_min}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
