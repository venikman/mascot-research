'use client';

import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { Spec } from '@/lib/types';
import Mascot from '@/components/Mascot';
import { renderToStaticMarkup } from 'react-dom/server';

interface MemePanelProps {
  memeId: string;
  hookText: string;
  bodyText: string;
  pose: string;
  format: 'IG_portrait_1080x1350' | 'Story_1080x1920';
  spec: Spec;
}

const MemePanel: React.FC<MemePanelProps> = ({ memeId, hookText, bodyText, pose, format, spec }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layout = spec.layout_templates[format];
  const palette = spec.palette;

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: layout.size_px[0],
      height: layout.size_px[1],
      backgroundColor: palette.paper,
    });

    // Add Hook Text
    if (hookText) {
      const hook = new fabric.Textbox(hookText, {
        left: layout.safe_area_px.left,
        top: layout.safe_area_px.top,
        width: layout.size_px[0] - layout.safe_area_px.left - layout.safe_area_px.right,
        fontSize: spec.typography.min_font_px,
        fontFamily: spec.typography.family.join(', '),
        fill: palette.ink,
        textAlign: 'center',
      });
      canvas.add(hook);
    }

    // Add Body Text
    if (bodyText) {
      const body = new fabric.Textbox(bodyText, {
        left: layout.safe_area_px.left,
        top: layout.size_px[1] - layout.safe_area_px.bottom - 100, // Adjust position
        width: layout.size_px[0] - layout.safe_area_px.left - layout.safe_area_px.right,
        fontSize: spec.typography.min_font_px,
        fontFamily: spec.typography.family.join(', '),
        fill: palette.ink,
        textAlign: 'center',
      });
      canvas.add(body);
    }

    // Add Mascot
    const mascotSvgString = renderToStaticMarkup(<Mascot pose={pose} poseLibrary={spec.pose_library} />);
    fabric.loadSVGFromString(mascotSvgString, (objects, options) => {
      const mascot = fabric.util.groupSVGElements(objects, options);
      mascot.scaleToWidth(layout.size_px[0] * 0.6);
      mascot.scaleToHeight(layout.size_px[1] * 0.6);
      canvas.centerObject(mascot);
      canvas.add(mascot);
      canvas.renderAll();
    });

    return () => {
      canvas.dispose();
    };
  }, [hookText, bodyText, pose, format, spec, layout, palette]);

  return <canvas ref={canvasRef} />;
};

export default MemePanel;