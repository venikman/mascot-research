import type { MascotSpec } from '../types';

export async function loadSpec(): Promise<MascotSpec> {
  const response = await fetch('/GPT/spec.json');
  if (!response.ok) {
    throw new Error('Failed to load spec.json');
  }
  return response.json();
}

export function getSpecSync(): MascotSpec {
  return {
    holder: {
      id: "holder.deltabit.rig.v1",
      name: "Δbit Holder",
      type: "2D-vector-rig"
    },
    palette: {
      ink: "#111111",
      paper: "#FFFFFF",
      accentA: "#FF6A00",
      accentB: "#3178C6",
      calm: "#10B981",
      warn: "#D61F1F"
    },
    typography: {
      family: ["Inter", "Noto Sans"],
      weights: ["Regular", "Bold"],
      min_font_px: 28,
      max_words_hook: 7,
      max_words_body: 14,
      contrast_min: 4.5
    },
    layout_templates: {
      IG_portrait_1080x1350: {
        size_px: [1080, 1350],
        safe_area_px: { top: 80, bottom: 80, left: 64, right: 64 },
        grid_px: 16,
        text_zones: {
          hook_top: { y: [80, 220] },
          body_bottom: { y: [1130, 1270] }
        }
      },
      Story_1080x1920: {
        size_px: [1080, 1920],
        safe_area_px: { top: 120, bottom: 160, left: 64, right: 64 },
        grid_px: 16
      }
    },
    pose_library: [
      "neutral", "think", "aha", "wince", "shrug", "focus", "strain", "calm",
      "point", "hold_card", "carry_brick", "climb_step", "check_box", "cut_arrow",
      "open_book", "sweep_noise", "sit_meditate", "type_log"
    ],
    meme_templates: [
      { id: "m1", name: "Reflective Intrinsic Motivation Shift", format: "REFLECT", hook: "Swap pressure for curiosity.", variables: ["topic"] },
      { id: "m2", name: "Incremental Progress Reflection", format: "REFLECT", hook: "Log the micro‑win.", variables: ["micro_win"] },
      { id: "m3", name: "Exorcising Zombie Ideas", format: "Z-DEBUG", hook: "Test ideas. Not vibes.", variables: ["idea_to_test"] },
      { id: "m4", name: "Growth Through Error Reflection", format: "REFLECT", hook: "Mistake → method.", variables: ["rule"] },
      { id: "m5", name: "Consistent Practice Builds Mastery", format: "STEPS", hook: "One brick today.", variables: [] },
      { id: "m6", name: "Persistence Pays Off", format: "STEPS", hook: "Small force, daily.", variables: [] },
      { id: "m7", name: "Decomposing Everyday Systems", format: "DECOMPOSE", hook: "Name parts. Explain flows.", variables: ["object"] },
      { id: "m8", name: "Systemic Learning Discipline", format: "STEPS", hook: "Integrate, don't scatter.", variables: [] },
      { id: "m9", name: "Template‑Driven Learning Discipline", format: "TEMPLATE", hook: "Use the template.", variables: ["timescale"] },
      { id: "m10", name: "Self‑Check Discipline Habit", format: "CHECKLOOP", hook: "Run the self‑check.", variables: ["topic"] },
      { id: "m11", name: "Challenge Inner Zombie Autopilot", format: "Z-DEBUG", hook: "Question the autopilot.", variables: ["behavior"] },
      { id: "m12", name: "Monastic Study Discipline", format: "MONK-FOCUS", hook: "Short vows, deep work.", variables: ["duration_min"] },
      { id: "m13", name: "Student Digital Minimalism Harmony", format: "DIGI-MIN", hook: "Less feed. More world.", variables: [] },
      { id: "m14", name: "Incremental Before‑After Reflection", format: "REFLECT", hook: "Compare to yesterday.", variables: ["delta_unit"] },
      { id: "m15", name: "Incremental Mutations Mindset", format: "GIT-MUTATE", hook: "Ship small mutations.", variables: ["topic"] },
      { id: "m16", name: "Slow Steady Deep Reading", format: "DEEP-READ", hook: "Read slow. Think deep.", variables: ["pages"] },
      { id: "m17", name: "Slow Steady Skill Building", format: "STEPS", hook: "Repeat > sprint.", variables: ["skill"] },
      { id: "m18", name: "Stepping Stones Momentum", format: "STEPS", hook: "Only next stone matters.", variables: ["next_step"] },
      { id: "m19", name: "Micro‑Steps to Mastery", format: "CHECKLOOP", hook: "Make it atomic.", variables: ["micro_task"] },
      { id: "m20", name: "Slow and Steady Wins", format: "STEPS", hook: "Slow is sustainable.", variables: [] }
    ],
    base_formats: {
      REFLECT: { panels: 3, beats: ["before", "mirror", "delta"], gestures: ["think", "aha"] },
      STEPS: { panels: 3, beats: ["path", "step", "tick"], gestures: ["carry_brick", "climb_step"] },
      CHECKLOOP: { panels: 3, beats: ["list", "check", "streak"], gestures: ["check_box"] },
      "Z-DEBUG": { panels: 3, beats: ["mask", "verify", "fade"], gestures: ["point", "stamp"] },
      TEMPLATE: { panels: 3, beats: ["blank", "fill", "overview"], gestures: ["hold_card"] },
      "MONK-FOCUS": { panels: 3, beats: ["cone", "timer", "page+1"], gestures: ["sit_meditate"] },
      DECOMPOSE: { panels: 3, beats: ["object", "explode", "label"], gestures: ["point"] },
      "DIGI-MIN": { panels: 3, beats: ["noise", "route", "signal"], gestures: ["sweep_noise"] },
      "DEEP-READ": { panels: 3, beats: ["open", "page+1", "thought"], gestures: ["open_book"] },
      "GIT-MUTATE": { panels: 3, beats: ["commit1", "commit2", "diff"], gestures: ["type_log"] }
    },
    guardrails: {
      only_system_acts: true,
      no_outcome_promises: true,
      measurement_external: true
    }
  };
}
