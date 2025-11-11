## 0) What you’re extracting (target object)
Your end product is a **FinalModel** tuple and one or more **Representation** instances:
- **FinalModel** `m := ⟨BC, form, stance, meaning, policy⟩`. This is the invariant “what this meme _is_” in a given background context (platform + culture + language); it includes the one‑sentence claim, short claim, 1–3 reasons, falsifier, role bindings, and copying rules (invariants vs allowed mutations).
- **Representation** is the per‑asset instance (image / multiform / video / audio / text) with layout/beat structure, content slots, palette/timbre thresholds, accessibility layer, lint capsule, and export info.
## 1) Meme.Mining – from text to **Meme‑Meaning**
**Input:** a single post or a long article; choose a _target platform/audience_ early because meaning is **context‑local** (BC = platform, culture, language).
**A. Frame the Background Context (BC)**
- Pick: `platform`, `culture`, `language`, and source link/short. Note 1–2 “reading norms” for that platform (e.g., IG loves bold contrast; X rewards compressed wit). Fill the BC fields in FinalModel.
**B. Claim mining (the “what’s being asserted?” pass)**
- Skim for _assertive_ sentences (modals like _should/must/will_, punchy aphorisms, or summary lines).
- Normalize to:
    - `claim` (1 full sentence) and `claim_short` (≤8 words).
- Pull **1–3 reasons** that the source gives (causes, benefits, evidence snippets).
- Draft a **falsifier**: a concrete observation that would disprove the claim (keeps you honest and clarifies scope).
**C. Role & mapping pass**
- Identify **slots** A/B in the claim frame (protagonist vs foil; old vs new; problem vs fix). Bind `role_A` and `role_B` to real referents (“A = remote work; B = office as collaboration hub”).
**D. Stance read**
- Mark the communicative attitude (earnest / lightly playful / no dunking, etc.). This controls tone constraints later.
**E. Policy & identity pass**
- Draft **must_stay** (identity invariants: ordering, key geometry, role mapping, stance parity) vs **may_change** (palette, synonyms, micro‑illustrations, localization).
- Capture **invariants** and **allowed_mutations** for future “same meme vs mutation” decisions (Stop/Go test).
> **Output of step 1:** a filled **FinalModel** with BC, form scaffold summary, stance, meaning (claim + reasons + falsifier + role bindings), and policy.
## 2) From **Meme‑Meaning** to **Meme‑Representation**
Pick the form that best carries the mined claim in this BC. Use your variants to make this mechanical:
**Variant chooser (fast mapping):**
- **REFLECT** — “before → mirror → delta” (comparisons/before‑after).
- **STEPS** — “path → step → tick” (how‑to / sequence / plan).
- **CHECKLOOP** — “list → check → streak” (progress / checklists / completion).
- **Z‑DEBUG** — “mask → verify → fade” (warnings / safety / failure modes).
- **DECOMPOSE** — “object → explode → label” (explanatory breakdowns).
- **DEEP‑READ** — “open → page+1 → thought” (reading → insight).
Then fill the **Representation** template:
- **Meta** (meme_id → link to FinalModel; media; platform_target; export_date).
- **Layout/Timing/Beat** (image geometry or multiform P1→P2→P3 beats; video timestamps).
- **Content Slots** (headline_text; slot_A/B/C; narration/VO).
- **Visual/Auditory invariants** (palette/timbre; contrast/volume thresholds; stance parity; required glyphs/effects).
- **Accessibility/Alt** (alt names beats + P3 outcome).
- **Lint Capsule & Export** (booleans + format/resolution/filename).
**Conformance pass (non‑negotiables):**
- Correct grid/timing; variant beats exactly in order; required glyphs/effects present; contrast ≥ 4.5:1; alt text present.
- Use the micro‑SOP to produce a clean 3‑panel multiform (declare context, set beats/poses, place glyphs, write copy/alt, lint & export).
- Run the “same meme?” Stop/Go test before publishing a variant.
## 3) Prompt constructors (image/video)
You can deterministically build prompts from the Representation fields. Here are **prompt templates** that reflect your schema.
### 3A) Image prompt (single or multiform)
```
[SCENE] A {media_style} {aspect_ratio} image for {platform_target}.
[LAYOUT] Use {variant or geometry spec}. If `media=multiform`, ensure beats P1→P2→P3 in order; otherwise follow the specified geometry (no P‑labels).
[ROLES] Slot A = {slot_A binding}; Slot B = {slot_B binding}. Headline: "{headline_text}".
[STANCE] Tone: {stance}; forbid {disallowed tone from policy}.
[PALETTE] {palette}; contrast >= 4.5:1; background/lighting {background/lighting}.
[GLYPHS] Required: {glyphs/effects per variant}.
[TEXT RULES] Keep text legible at target size; short copy.
[INVARIANTS] Must keep: {invariants}. May change: {allowed_mutations}.
[ALT] Alt should name beats and P3 outcome.
```
### 3B) Video prompt (short form)
```
[FORMAT] {duration}s video, {resolution}. Target: {platform_target}.
[BEATS] Timestamps → Beat1 {t1}s: {setup}; Beat2 {t2}s: {turn}; Beat3 {t3}s: {resolution}.
[VISUALS] Palette {palette}; required motifs {glyphs}; stance {stance}.
[AUDIO] Voiceover "{narration}" (optional). Loudness ≥ -14 LUFS if VO present.
[INVARIANTS] Keep {identity invariants}; allow {allowed_mutations}.
[CAPTIONS] Captions: {yes/no}; language {bcp47}; include alt transcript.
```
## 4) Worked mini‑examples (mining → meaning → representation → prompts)
### Example A — Blog line → “REFLECT”
**Source gist:** “Remote work is here to stay; offices shift into collaboration hubs.”
**FinalModel (core):**
- `claim`: “Remote work persists; the office’s purpose becomes collaboration.”
- `claim_short`: “Remote work persists; offices reinvent.”
- `reasons`: (1) hiring reach; (2) meeting density; (3) commute avoidance.
- `falsifier`: Return to majority mandatory on‑site with productivity gains.
- `role_A`: “Office as default workspace (before).”
- `role_B`: “Office as collaboration hub (after).”
- `stance`: Earnest; lightly playful; no dunking.
- `must_stay`: before/after ordering; A→B mapping; stance parity.
- `may_change`: palette; micro‑icons; localized copy.  
**Representation (multiform, 1:1):**
- Variant: **REFLECT** (beats `before→mirror→delta`; Δ in P3; think→aha pose).
- Slots: headline_text “The office changed”; A “default desk rows”; B “collab hub”.
- Visual invariants: neutral bg; palette “cool neutrals + one accent”; Δ glyph in P3.
- Alt: “P1 old office, P2 mirrored, P3 delta = collaboration hub outcome.”
**Image prompt:**
```
SCENE A 1:1 multiform for LinkedIn.
LAYOUT Use REFLECT; P1 old office rows → P2 mirrored; P3 shows Δ outcome (collab hub).
ROLES A = "default desk rows"; B = "collaboration hub zones"; Headline "The office changed".
STANCE Earnest, lightly playful; prohibit dunking.
PALETTE Cool neutrals with one accent; high legibility; contrast >= 4.5:1.
GLYPHS Required Δ symbol in P3; subtle mirror cue in P2.
TEXT RULES: Minimal copy; readable at feed size.
INVARIANTS Keep before/after ordering, A→B role mapping, stance parity. May change palette and micro‑icons.
ALT "Before office rows → mirrored → delta: collaboration hub outcome."
```

### Example B — Post → “Z‑DEBUG”
**Source gist:** “AI assistants speed coding but can hallucinate; keep human‑in‑the‑loop checks.”
**FinalModel (core):**
- `claim`: “Use AI code assistants with verification; human review prevents failure.”
- `claim_short`: “Fast with guardrails.”
- `reasons`: boosts speed; reduces boilerplate; check avoids silent bugs.
- `falsifier`: audited data shows equal bug rate without review.
- `role_A`: “AI suggestion stream”; `role_B`: “human reviewer/tests”.
- `stance`: Practical caution; no fearmongering.
- `policy`: Must show mask→verify→fade sequence; may change palette/icons.

**Representation (multiform):**
- Variant: **Z‑DEBUG** (beats `mask→verify→fade`; warning mask P1; verify‑stamp P2; fade effect P3).
- Visual invariants: warning mask color band in P1; a **verify** stamp in P2; fading risk overlay dissolving in P3.
- Alt: “AI mask; human verification; risk fades after checks.”

**Image prompt:**
```
SCENE A 3-panel multiform (1:1) for X/Twitter.
LAYOUT Z-DEBUG beats in order: P1 mask (AI uncertainty) → P2 verify-stamp (human checks) → P3 fade (risk dissolves).
ROLES A = "AI code suggestions"; B = "human review and tests"; Headline "Fast with guardrails".
STANCE Practical caution; no fearmongering.
PALETTE Neutral UI tones; clear warning band in P1; high contrast.
GLYPHS Required: warning mask P1; verify-stamp P2; fade effect P3.
INVARIANTS Keep beat order and identity glyphs; may localize copy and icons.
ALT "Mask → human verifies → risk fades after checks."
```

**Video prompt (8-10 s):**

```
FORMAT 8-10s, square, LinkedIn.
BEATS Beat1 0–3s: code stream with warning mask; Beat2 3–7s: reviewer stamps
VERIFY; Beat3 7–10s: bug overlay fades.
VISUALS Palette neutral UI; stance practical.
AUDIO Optional VO "Fast with guardrails"; loudness >= -14 LUFS; captions on; en-US.
INVARIANTS Required mask→verify→fade; stance parity.`
```
## 6) Authoring/lint checklist (one‑minute sweep)
- FinalModel exists; claim + reasons + invariants clear.
- Representation meta set; beats/timing/geometry filled; variant rules satisfied.
- Stance parity holds; required glyphs/effects present; alt text present; legibility OK.  
    _(This mirrors your “micro‑checklist” + variant lint capsules.)_
## 7) Bridge across contexts (optional but useful)
If you’ll port the meme across languages/cultures/modalities, write **Bridge notes** (kind, mapping, anticipated drift, examples) so meaning doesn’t “slip” across rooms—er, **contexts**.

### TL;DR flow you can run today
1. **Mine**: claim → short claim → reasons → falsifier → roles → stance → policy.
2. **Model**: lock the FinalModel invariants & allowed mutations.
3. **Map**: choose a variant (REFLECT/STEPS/…) that carries the claim in your BC.
4. **Represent**: fill layout/slots/invariants/alt + lint capsule; export.
5. **Prompt**: assemble scene, layout, roles, stance, palette, glyphs, invariants → image/video prompts (templates above).
