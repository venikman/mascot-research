## A) Maskot meta‑model template (YAML)

```yaml
version: 4.0
normative_mapping: "maskot ≡ ⟨holder: U.System, role: TransformerRole ⊑ Role, assignment: U.RoleAssignment: Context, enacts: U.Method via U.MethodDescription, yields: U.Work, ability: U.Capability{envelope,measures,validity}⟩"
governance:
  constraints:
    - "Only U.Systems act; epistemes never act."
    - "Measurement is a transformation by an external Transformer; no self‑action."
    - "Keep Role, Method, MethodDescription, and Work distinct in UI labels."
  validity_window: {start: "<iso8601|event>", end: "<iso8601|condition>", renewals: "<policy>"}
  approvals_gate: {states: ["blocked","amber","green"], SoD: "<segregation-of-duties rule>"}

identity:
  codename: "<string>"
  holder: {type: "U.System", name: "<system name>", owner: "<org|team>"}
  role:
    transformer_role: "<TransformerRole name>"   # authority, scope, and SoD
    assignment:
      context: "<U.BoundedContext label>"
      role_assignment: "<U.RoleAssignment reference>"
target_boundary_scene:
  target: "<who is transformed>"
  boundary: "<from → to; what is crossed>"
  scenes_apps: ["<scene/app 1>", "<scene/app 2>", "..."]  # e.g., stand‑up, PR review, incident bridge

ability:
  capability_envelope:
    transforms: ["<class of tasks the maskot can cause>"]
    limits: ["<hard limits>", "<safety rails>"]
    preconditions: ["<badges/gates required>"]
  measures:
    effectiveness: ["<metric name>: <definition>"]
    evidence_anchor: {carrier: "<url|id>", polarity: "<+|–>", scope: "<where>", time: "<when>"}

methods:  # each maps memes→method→work
  - name: "<method name>"
    method_description_id: "<U.MethodDescription id>"
    inputs: ["<input type|asset>"]
    steps: ["<key step 1>", "<key step 2>", "..."]
    outputs:
      work: "<U.Work artifact>"
      traces: ["<cards|chips|stamps>"]
    measures: ["<leading|lagging metric>"]
    memes_genes:
      source_memes: ["<meme_id>", "..."]  # from Memes.md
      weight: "<0..1 or scale unknown>"
      triggers: ["<situation>"]
      carriers: ["<doc|board|chat>"]
      anti_patterns: ["<what to avoid>"]

media_grammar:
  visual_dna:
    body_form: "<non‑human form>"
    symbols: ["<symbol 1>", "<symbol 2>"]
    palette: {primary: "<hex>", neutrals: ["<hex>"], states: {ok: "<hex>", warn: "<hex>", block: "<hex>"}}
    materials: {stroke: "1px inner", shadow: "soft 8–12px", gradients: "off|on"}
  pose_library:  # 8–12 poses
    - slug: "<pose-id>"
      description: "<what is signified>"
      shot: "<hero medium|OTS|top‑down>"
  gestures: ["<gesture 1>", "<gesture 2>"]
  loops_2_3s:
    - slug: "<loop-id>"
      action: "<what repeats>"
  camera: {shots: ["<list>"], safe_margins: "7.5%", min_text_px_at_1080: 24}
  background: {style: "clean grid + cards", labels: ["Context","Role","MethodDescription","Work"]}
  captions:
    language: "EN|RU" #TODO
    tone: "teacherly|…" #TODO
    templates: ["<line ≤48 chars>", "<line ≤48 chars>"]
    fonts: {titles: "Inter", labels: "Inter", code: "JetBrains Mono", fallback: "system sans/mono"}
  voice_lines: ["<≤3s lines>"]
  audio_cues: [{event: "<ring draw>", sfx: "<whoosh>"}]
  export:
    aspects: ["9:16","1:1","16:9"]
    base_px: 1080
    formats: {stills: ["PNG","SVG"], loops: ["MP4 H.264","GIF ≤3s"]}
    alt_text: "<short description>"
  creator_playground:
    slots: {badge_icon: "<role‑specific>", card_color: "<context‑specific>", micro_prop: "<scene‑specific>"}
    invariants: ["boundary","badge","gate"]

asset_manifest_schema:
  item:
    id: "<uuid>"
    pose: "<pose-id>"
    gesture: "<gesture-id>"
    loop: "<loop-id|none>"
    caption: "<text>"
    background: "<style>"
    labels: {context: "<text>", role: "<text>", method: "<id>", work: "<id>"}
    audio: "<cue-id|none>"
    accessibility: {alt: "<text>"}
storyboard_example:
  beats:
    - t: 1.0  # seconds
      action: "<draw boundary>"
      caption: "<text>"
    - t: 1.5
      action: "<flip badge>"
      chips: {Context: "<name>"}
    - t: 1.5
      action: "<gate pulse red→green>"
      caption: "<text>"
    - t: 2.0
      action: "<evidence stamp>"
      microtext: "MethodDescription: <id> | Work: <id>"
```

## B) Improved 10‑question checklist
1. **Target × Boundary × Scenes:** Who is transformed, what boundary is crossed, and in which scenes/apps. Keep it concrete. 
2. **Role and Assignment:** Name the TransformerRole, its authority, SoD, and the U.RoleAssignment inside a clear U.BoundedContext. 
3. **Capability Envelope:** What class of transformations the maskot can cause, limits, preconditions, and safety rails. 
4. **Methods Map (memes→methods→work):** List 5–12 methods. For each: inputs, steps, outputs (U.Work), MethodDescription id, measures, and the source memes driving it.
5. **Measures and Evidence:** What metrics prove effect; how evidence is anchored with carrier, polarity, scope, and time. 
6. **Visual DNA:** Body form, symbols, palette, materials. Specify invariants vs creative slots. 
7. **Pose and Loops:** 8–12 canonical poses, 3–5 seamless 2–3 s loops, and signature gestures. 
8. **Caption and Voice:** Language, tone, templates, fonts, ≤3 s voice lines, and audio cues. 
9. **Packaging:** Aspect ratios, base px, safe areas, min text size, exports, and alt text. 
10. **FPF Compliance:** Confirm “only systems act,” “measurement by external transformer,” and Role–Method–Work separation. State validity window and gate states. 

## C) Ready prompt (“run this after you fill the template and answer the questions”)

```
You are an expert spec compiler for a constructor‑role mascot.

Inputs you will receive:
1) A meta-model “Maskot meta‑model template v4.0”. #TODO 
2) Answers to the 10‑question checklist.
3) Memes.md listing gene‑memes with ids, themes, and cross‑refs.

Hard constraints:
- Only U.Systems act; epistemes never act. Measurement is by an external Transformer. No self‑action.
- Keep Role, Method, MethodDescription, and Work distinct in all labels.
- Respect capability envelope, validity window, and gate states.

Tasks:
1. Explore and understand answers and memes. #TODO
2. Create instance of mascot model that will represet identity and behavoir of the charecter::memeplex. #TODO
3. Compile **Mascot Mode Pack** with:
   1. Finalized methods table (memes→method→work) with measures and evidence anchors.
   2. Media grammar tokens: symbols, palette, materials, poses (8–12), gestures, loops (2–3 s), camera, background.
   3. Caption set (≤48 chars/line), voice lines (≤3 s), audio cue table.
   4. Asset manifest (10–20 entries) using the provided schema.
   5. One 6–8 s storyboard that demonstrates badge→gate→work or an equivalent core pattern.
4. Emit two artifacts:
   - `mascot_mode.yaml` (the merged, validated spec).
   - `asset_manifest.json` (list of assets ready for image/video generation).

Output format:
- Section 1: “Validation Report” (bullet list).
- Section 2: “Mascot Mode Pack” (subsections B1–B5).
- Section 3: “Next 5 assets to render” with one‑line prompts per asset and required labels (Context, Role, MethodDescription, Work).
```

This prompt assumes your template and Q answers are present, and treats Memes.md entries as genes that drive method selection and caption tone. 

If you want me to pre‑fill the template with your v3.1 defaults (poses, captions, palette) before you run the prompt, say so. 
