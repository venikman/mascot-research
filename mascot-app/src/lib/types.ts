export type Spec = {
  spec_version: string;
  holder: {
    id: string;
    name: string;
    type: string;
    acts: boolean;
    files: {
      rig_svg: string;
      pose_symbols: string;
      props_svg: string;
    };
  };
  palette: {
    ink: string;
    paper: string;
    accentA: string;
    accentB: string;
    calm: string;
    warn: string;
  };
  typography: {
    family: string[];
    weights: string[];
    min_font_px: number;
    max_words_hook: number;
    max_words_body: number;
    contrast_min: number;
  };
  layout_templates: {
    [key: string]: {
      size_px: number[];
      safe_area_px: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      grid_px: number;
      text_zones?: {
        [key: string]: {
          y: number[];
        };
      };
    };
  };
  pose_library: string[];
  base_formats: {
    [key: string]: {
      panels: number;
      beats: string[];
      gestures: string[];
    };
  };
  meme_templates: MemeTemplate[];
};

export type MemeTemplate = {
  id: string;
  name: string;
  format: string;
  hook: string;
  variables: string[];
};

export type MemeInfo = {
  id: string;
  name: string;
  description: string;
  popularity: number;
}