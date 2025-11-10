**Meme ID:** `<slug-or-uuid>`
**Edition:** `<YYYY-MM-DD>`
**Mode:** `M-0|M-1|M-2|M-3`

## FinalModel — `m := ⟨BC, form, stance, meaning, policy⟩`

### BC (background context)
- **platform:** `<e.g., X/Twitter, Telegram, print>`
- **culture:** `<e.g., eng-tech, ru-mgmt>`
- **language:** `<ISO 639-1>`
- **source_url / short:** `<link>` / `<short>`

### form (reusable scaffold)
- **summary:** `<one-line scaffold description>`
- **aspect_ratio:** `<w:h, e.g., 1:1>`
- **size_px / padding:** `<1080×1080>` / `<0.05>`
- **style/palette / background/lighting/refs:** `<…>`
- **geometry (0..1):**
  - left: `[x0,y0,x1,y1]`
  - right: `[x0,y0,x1,y1]`
  - headline: `[x0,y0,x1,y1]`
  - footer: `[x0,y0,x1,y1]`
- **slots:** `A = <role name>`, `B = <role name>`

### stance (attitude)
`<e.g., earnest; lightly playful; prohibit dunking>`

### meaning (audience inference inside BC)
- **claim:** `<full sentence>`
- **claim_short:** `<≤8 words>`
- **reasons (1–3):**
  - `<reason 1>`
  - `<reason 2>`
- **falsifier:** `<what observation would disprove the claim>`
- **role_A / role_B (bindings):** `<what A maps to>` / `<what B maps to>`

### policy (copying rules & rationality)
- **copying_rules**
  - **must_stay:** `<identity constraints (e.g., 3 panels, path arrow continuity)>`
  - **may_change:** `<palette, language, micro-illustrations…>`
- **rationality**
  - **label:** `rational | mixed | anti-rational`
  - **argument:** `claim → reasons → counter-case → failure conditions`
- **invariants:** `<key geometry; role mapping; stance parity…>`
- **allowed_mutations:** `<synonyms in slots; minor palette shifts…>`
- **bridge_notes (cross-context)**
  - **kind:** `language | culture | modality | domain`
  - **mapping:** `<paraphrase / analogy / substitution>`
  - **anticipated_drift:** `<what may shift>`
  - **examples:** `• from → to`
