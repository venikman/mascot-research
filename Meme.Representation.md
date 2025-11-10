## Meta
- meme_id: `<link or id of FinalModel>`
- media: `image | multiform | video | audio | text`
- platform_target: `<where this instance will live>`
- export_date: `<YYYY-MM-DD>`

## 1. Layout / Timing / Beat Structure
- if **image**: geometry (left/right/headline/footer)
- if **multiform**: beats `P1→P2→P3` (variant = `REFLECT | STEPS | CHECKLOOP | …`)
- if **video**: duration; key beat timestamps (s)
- if **audio**: motif start–end; tempo (BPM)
- if **text**: structure (lines, rhythm, emphasis markers)

## 2. Content Slots
- headline_text: `"<text>"`
- slot_A: `"<text or mapping to A>"`
- slot_B: `"<text or mapping to B>"`
- slot_C: `"<optional>"`
- narration / voiceover: `"<optional>"`

## 3. Visual / Auditory Invariants
- palette or timbre: `<values or references>`
- contrast / volume thresholds: `<e.g., WCAG ≥ 4.5:1 | −14 LUFS>`
- stance parity rule: `<keep tone constraints from FinalModel>`
- required glyphs / sound motifs: `<list>`

## 4. Accessibility / Alt Layer
- alt_text or transcript: `"<paraphrase invariant meaning>"`
- captions/subtitles: `yes | no`
- language tag: `<bcp47 code>`

## 5. Lint Capsule (fill booleans)
beats_ok: `true|false`  
required_assets_present: `true|false`  
stance_parity_ok: `true|false`  
contrast_or_volume_ok: `true|false`  
alt_text_present: `true|false`  
identity_intact: `true|false`

## 6. Export Info
- format: `png | mp4 | wav | txt`
- resolution/duration: `<e.g., 1080×1080 | 12 s>`
- filename: `<export name>`

## 7. Render Roadmap (future assets)
- **Quote card (1:1):** headline top; A then B; neutral bg.
- **Two-panel contrast (1:1):** left=A (setup), right=B (twist); arrow continuity.
- **Three-beat strip (3:4):** setup → tension → release; stance parity rule.

