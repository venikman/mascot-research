https://chatgpt.com/share/68ea3a16-2c40-8012-b1b3-145e0438d45a - last prep


# 1 STEP
## Files 
- `meta-model-v3.2.yaml`
- `Memes.md`
- `q-a-3.2.md`
## Prompt
```
You are instantiating a constructor role Maskot in the First Principles Framework. 

Inputs you have:
1) Answered “Questions”. 
2) Memes.md corpus (memes act as genes; each selected meme becomes a U.Method). 
3) The Maskot meta-model v3.2 schema below.

Task:
A) Explore Role–Method–Work separation.
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
(Reference patterns: boundary ring, role badge, green gate, bridge, evidence; captions like “Boundary first. Then act.”) 
(The media grammar and artefact set follow v3.1; numeric parts stay variable. Tie conformance and gates to maturity modes M‑0…M‑3 per FPF.)
````

Response will have some more metadata, we ignore it. Only we copy from answer (it will be highlighted):
`yaml` format -> `maskot-spec.yaml` to crdate file. In repo its `maskot-model.yaml`.
`json` format -> `assets.json` to create file.

# STEP 2
- Copy prompt from `system-prompt-v3.2.4.md`
- Attach `assets.json` file.
- Attach `mascot-model-v3.2.4.yaml` file.

Run it.

