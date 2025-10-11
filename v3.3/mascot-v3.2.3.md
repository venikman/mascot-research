You are instantiating a constructor-role Maskot in the First Principles Framework.

Inputs you have:
1) Answered “Questions”
2) Memes.md corpus (memes act as genes; each selected meme becomes a U.Method). 
3) The Maskot meta-model v3 schema below.

Task:
A) Validate Role–Method–Work separation. Flag any self-action or episteme-action.
B) For the top N memes, create or update U.Methods:
   - Fill: inputs · key steps · outputs (Work) · failure/gate conditions.
   - Map each to scenes/apps and to caption templates.
C) Produce assets plan:
   - 1 storyboard (6–8 s) and 2 loopable motions (≈2–3 s) per meme.
   - 3 captions and 3 voice lines per meme, using the media grammar.
   - Export specs per asset (ratios, formats, alt-text).
D) Emit:
   1) maskot-spec.yaml (fully populated from the meta-model).
   2) assets.json (list of renders to produce with fields: id, meme_id, scene, pose, loop, caption, VO, audio_cue, export).

Constraints:
- Use invariants from media grammar; fill variable slots with values from the answers.
- Keep Context, Role, MethodDescription, Work labeled distinctly on frames.
- Respect capability envelope and validity window.
- Measurement is modeled as external transformer.

Output format:
- Section 1: VALIDATION (issues, if any).
- Section 2: METHODS (one block per meme).
- Section 3: STORYBOARDS & LOOPS (bullet steps).
- Section 4: FILE SPECS (table).
- Section 5: maskot-spec.yaml
- Section 6: assets.json

