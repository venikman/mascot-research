export interface MascotSpec {
  holder: {
    id: string;
    name: string;
    type: string;
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
    IG_portrait_1080x1350: LayoutTemplate;
    Story_1080x1920: LayoutTemplate;
  };
  pose_library: string[];
  meme_templates: MemeTemplate[];
  base_formats: Record<string, BaseFormat>;
  guardrails: {
    only_system_acts: boolean;
    no_outcome_promises: boolean;
    measurement_external: boolean;
  };
}

export interface LayoutTemplate {
  size_px: [number, number];
  safe_area_px: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  grid_px: number;
  text_zones?: {
    hook_top?: { y: [number, number] };
    body_bottom?: { y: [number, number] };
  };
}

export interface MemeTemplate {
  id: string;
  name: string;
  format: string;
  hook: string;
  variables: string[];
}

export interface BaseFormat {
  panels: number;
  beats: string[];
  gestures: string[];
}

export interface Meme {
  rank: number;
  title: string;
  description: string;
  category: string;
  recognizability: number;
  fidelity: number;
  diversity: number;
  affect: number;
  popularity: number;
}

export interface GeneratorConfig {
  memeTemplate: MemeTemplate;
  pose: string;
  format: 'instagram' | 'story';
  customHook?: string;
  customBody?: string;
}
