## Part 1 — Build / Review the **FinalModel** (Invariant Meaning)
> Fill these once per meme family. Think “what must stay the same for it to still be _this_ meme?”
### 1A) Tuple: `⟨BC, form, stance, meaning, policy⟩`
-  **BC (background context).** Name platform, culture, language, and a source link/short. Note 1–2 reading norms relevant to interpretation.
-  **form (reusable scaffold).** One‑line summary; aspect ratio, size/padding, style/palette/background; geometry boxes (0–1 coords) and named **slots** (A, B, …).
-  **stance.** Short attitude envelope (e.g., “earnest; lightly playful; no dunking”).
-  **meaning.** One full‑sentence claim; a short claim (≤8 words); 1–3 reasons; bind **role_A / role_B** to real‑world referents.
-  **policy.** Identity rules: **must_stay** vs **may_change**; **invariants** and **allowed_mutations**; **bridge_notes** for crossing language/culture/modality.

**Prompts to think with**
- What layout/ordering or role mapping makes the claim legible in this BC? Mark these as **invariants** and write _why each preserves meaning_.
- Which swaps keep identity (synonyms, palette tweaks, localization) and which break it? List a few **forbidden mutations** and why.

### 1B) Rationality policy (text‑only)
-  Label: `rational | mixed | anti‑rational`.
-  Write a compact argument: **claim → reasons → counter‑case → failure conditions** (what would flip your label). No scores—just reasoning.

### 1C) Bridge notes (for reuse across contexts)
-  **kind:** language | culture | modality | domain
-  **mapping:** paraphrase / analogy / substitution
-  **anticipated drift** + one **example** (from → to); declare loss qualitatively. (Bridge thinking guards against meaning slippage across “rooms”.)

## Part 2 — Describe the **Representation** (Per‑asset Instance)
> Fill these for each concrete asset (image, multiform, video, audio, or text).
### 2A) Meta
-  `meme_id` → link back to the FinalModel entry
-  `media` → **image | multiform | video | audio | text**
-  `platform_target` / `export_date`
### 2B) Layout / Timing / Beat Structure
- **image:** normalized geometry for panels/headline/footer.
- **multiform:** beats **P1→P2→P3** (choose variant: **REFLECT | STEPS | CHECKLOOP | Z‑DEBUG | DECOMPOSE | DEEP‑READ**).
- **video:** duration; key beat timestamps (s).
- **audio:** motif start–end; tempo (BPM).
- **text:** structure (lines, rhythm, emphasis markers).
> For 3‑panel multiforms, use the variant capsules (beats + required glyphs/effects + pose deltas) when applicable.
### 2C) Content Slots
-  headline_text; slot_A; slot_B; slot_C; narration/voiceover (if any). Keep within the **form**’s slot semantics.
### 2D) Visual / Auditory Invariants (per asset)
-  palette/timbre; contrast/volume thresholds; stance‑parity rule; **required glyphs / sound motifs** per chosen variant.
### 2E) Accessibility / Alt Layer
-  alt_text or transcript; captions/subtitles (yes/no); language tag. (Alt should name beats and the panel‑3 outcome when multiform.)
### 2F) Lint Capsule (boolean fields)
-  `beats_ok` • `required_assets_present` • `stance_parity_ok` • `contrast_or_volume_ok` • `alt_text_present` • `identity_intact`.
### 2G) Export Info
-  format (png/mp4/wav/txt); resolution/duration; filename.

## Part 3 — Conformance & Lint (all variants)
**Generic authoring invariants**
-  Correct grid/timing (multiform): 3 panels with equal gutters and symmetric widths (unless overridden by variant).
-  For **multiform only**, beats match the variant triplet (P1→P2→P3) without re‑ordering; other media use declared beat labels (e.g., setup/turn/resolution) without P‑labels.
-  Required glyphs/effects/pose deltas present (per variant).
-  Legibility: text passes at target size; contrast ≥ 4.5:1.
-  Alt text present, naming beats and P3 outcome.
**Variant lint capsules (choose one; assert all rules)**
- **REFLECT:** beats `before→mirror→delta`; symmetric widths; **Δ** in P3; pose **think→aha**.
- **STEPS:** beats `path→step→tick`; path arrow spans P1–P3; **tick** in P3.
- **CHECKLOOP:** beats `list→check→streak`; ≥1 item checked; **streak** indicator in P3.
- **Z‑DEBUG:** beats `mask→verify→fade`; warning mask (P1), verify‑stamp (P2), **fade** effect (P3).
- **DECOMPOSE:** beats `object→explode→label`; P3 is exploded view; labels include interfaces/flows.
- **DEEP‑READ:** beats `open→page+1→thought`; page‑turn cue P1→P2; thought‑bubble **or** text band in P3.

## Part 4 — “Same meme?” Decision Rules
Use **FinalModel → policy** to decide if two assets are the same meme instance vs a mutation:
- **Identity hinges on**: key geometry/ordering, role mapping, stance envelope, and must‑keep assets (your **invariants**). If these hold, it’s still the same meme.
- **Allowed mutations** include: slot synonyms, minor palette shifts, localization analogies that preserve role mapping; format remix; small copy compression/expansion. If you exceed these, it’s a different meme.
**Stop/Go test**
-  **GO** if all invariants hold and only allowed mutations are used.
-  **STOP** if any invariant is violated or a forbidden mutation appears (document why).

## Part 5 — Bridges (reuse across contexts)
When porting a meme across **language/culture/modality/domain**:
-  Declare **kind** and **strategy** (literal, analogy, domestication, etc.).
-  Map **roles/slots/stance** (e.g., A→A′, irony→deadpan).
-  Note expected **loss** (none/low/medium/high) and guardrails (labels/disclaimers).
-  Give a concrete **before→after** example.  
    This follows the Bridge discipline to avoid moving semantics without an explicit mapping.

## Part 6 — Minimal SOP (how to do it, end‑to‑end)
Use this mini‑method when authoring a 3‑panel multiform (image) instance:
1. **Declare context & pick variant** → record in Representation meta.
2. **Lay out grid** → enforce equal gutters; symmetric widths unless variant overrides.
3. **Set beats & poses** → align exactly with chosen variant; ensure required pose delta if specified.
4. **Place glyphs/effects** → delta/tick/streak/verify‑stamp/page‑turn/fade per variant rules.
5. **Write copy & alt** → concise panel text; alt names beats and P3 outcome.
6. **Lint & export** → run generic + variant checks; bundle lint with exported asset.
> For rendering from slots to an image frame, follow your **ImageTemplate** MethodDescription (layout, slots, legibility/contrast, export, alt).

## Appendix A — Minimal Glossary (first‑use)
**BC** (background context): audience + platform norms that fix how the form is read.  
**form:** reusable structure (layout/slots/beat/pose or phrasing).  
**stance:** communicative attitude (earnest/ironic/etc.).  
**meaning:** local claim/analogy induced by the form in BC.  
**Bridge:** explicit plan for crossing BCs (kind/strategy/mapping/loss/guardrails).  
**Invariant/Mutation:** what must stay vs what may change while preserving identity.

## Appendix B — 60‑second author’s micro‑checklist
-  FinalModel exists; claim + reasons + invariants clear.
-  Representation meta set; beats/timing/geometry filled.
-  Variant capsule passes; required glyphs/effects present.
-  Stance parity holds; no hostile cues if disallowed.
-  Alt text/transcript done; legibility/contrast ok; export info set.
**Use this file as** `DescribeMeme.Checklist.md` (or similar) next to `FinalModel.md` and `Meme representation.md`. It gives you: what to fill, how to think, and what to verify—without changing your existing schemas.