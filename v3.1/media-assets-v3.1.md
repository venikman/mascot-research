
Here are ready‑to‑paste Sora prompts for each deliverable. Base spec first. Mascot visual grammar, poses, loops, captions, audio cues, and exports follow the model in **mascot‑v3.1.md**. Caption language aligns with “useful learning memes” and keeps one clear idea per card.
---
### [BASE — prefix this to every Sora prompt]
```
Style: Non-human capsule mascot "Maskot-ρ" with thin orbit ring (boundary). Two-dot eyes, straight mouth. Flat fills, 1 px inner stroke, soft shadow 8–12 px, no gradients. High-contrast AA.
Palette tokens: ink #111827; neutral #9CA3AF; blueprint #2563EB; green_gate #22C55E; amber #F59E0B; red #EF4444.
Chips visible but minimal: four micro-label pills reading exactly "Context", "Role", "MethodDescription", "Work". Keep them distinct and spatially separated. Role badge is on the mascot chest only. MethodDescription appears on a recipe card. Work appears in a run-log lane. Do not mix them.
Background: clean grid + sticky-note cards; faint blueprint lines. No vendor logos. No anthropomorphized documents.
Framing: hero medium or OTS-to-card. Safe margins 7.5%. Text never <24 px at 1080×1920.
Fonts: Inter (titles/labels); JetBrains Mono (chips/code). System sans/mono fallback OK.
Camera: locked. No dolly, no parallax. Crisp edges for vector trace.
Export masters: 9:16, 1:1, 16:9 at 1080 base. Still assets = PNG on transparent (or chroma #00FF00 as fallback). Loops = MP4/H.264 and GIF ≤3 s. Audio when requested = WAV 48 kHz.
Guardrails: keep Role–Method–Work separation explicit; always show a Context label on top of cards; evidence is a small stamp when present.
QC (pass/fail): orbit ring visible; role badge separated from cards; chips legible ≥24 px; palette matches tokens; no gradients; background grid faint.
```
## Pose pack — 12 PNG/SVG (use one prompt to generate a 12‑frame strip, then export frames)
**Sora prompt**
```
[BASE]

Goal: 12 static poses of Maskot-ρ. One pose per second, 12 s total. Transparent background. Each second is a perfectly still keyframe for clean PNG export and vector tracing.

Pose list in order:
1) Point-the-Boundary (drawn ring around a scene) — ¾ view mid-shot.
2) Badge-On (pins role badge to chest).
3) Green-Gate (holds green card; small halo) — approval.
4) Blocked (red cross over gate) — SoD/No-Go.
5) Bridge-Build (places tile between two labeled cards).
6) Evidence-Stamp (presses stamp onto doc corner).
7) Plan/Run Split (hands separate two lanes).
8) Service≠Capability (balances two labeled boxes).
9) Observe (loupe over meter).
10) Assemble-Γ (stacks three blocks).
11) Context-Card Hold (shows “Room: …” title bar).
12) Handoff (passes badge to another figure) — role transfer.

Per frame requirements: hero medium shot; chips visible but unobtrusive; only minimal microtext on cards: the four pill labels. No captions. No VO. No SFX. Hold each pose perfectly still during its second.

Output: 12 s video, 30 fps, alpha (or chroma #00FF00). Provide 1:1, 9:16, 16:9 masters. Intent: export frame t = 0.5 s, 1.5 s, …, 11.5 s to 12 PNGs and vector trace to SVG.
```

Source of the 12 poses: §3.2 Pose library.
**Optional per‑pose single‑image variant**  
Change “Goal” to the specific pose name and set duration = 1 s.
## Loop pack — 4 MP4/GIF (2–3 s seamless)
**1) Boundary Sweep Loop**
```
[BASE]

Goal: seamless 2.5 s loop. The orbit ring draws around a desk scene, locks, and emits a subtle glow. No camera move.

Action: draw → lock → faint glow breathing.
SFX marker only (mute picture): to be scored separately.

Visual constraints: ring stroke consistent; chips present but minimal; NO captions.

Output: MP4 1080, 30 fps, 1:1 and 9:16. Also GIF ≤3 s, small palette. Loop must be seamless at cut.
```
Gesture reference: boundary sweep.
**2) Badge Flip Loop**
```
[BASE]

Goal: seamless 2.0 s loop. Maskot-ρ flips role badge; tiny state LED toggles.

Action: badge flip → LED toggle → reset.
Output: MP4 1080, 30 fps, 1:1 and 9:16. Also GIF. No captions. Chips visible but minimal.
```
Gesture reference: badge flip.
**3) Gate Pulse Loop**
```
[BASE]

Goal: seamless 2.5 s loop. Gate card idles red→amber→green with soft pulse. No movement elsewhere.

Action: color cycle red #EF4444 → amber #F59E0B → green #22C55E → repeat.
Output: MP4 1080, 30 fps, 1:1 and 16:9. Also GIF. No captions.
```
Gate colors per palette.
**4) Bridge Snap Loop**
```
[BASE]

Goal: seamless 2.2 s loop. Alignment tile slides between two cards and snaps; a thin alignment line appears, then resets.

Action timing: slide-in ~1.2 s → snap 0.1 s → line glow 0.3 s → reset 0.6 s.
Output: MP4 1080, 30 fps, 16:9 and 1:1. Also GIF.
```
Bridge gesture.

---
## Caption sheet — templates + font stack (static card)
**Sora prompt**
```
[BASE]

Goal: single static “Caption Sheet” that shows six caption templates and the font stack.

Layout:
- Title: "Caption Templates"
- Grid of six cards (3x2). Each card shows: H1 in Inter, cue line, and the four chips. No body text.
- Captions (exact):
  1) "Boundary first. Then act."
  2) "Badge → Gate → Go."
  3) "Service ≠ Capability."
  4) "Plan ≠ Run. Keep both."
  5) "Bridge it, or don’t mix."
  6) "Evidence wears a date."
- Footer: “Fonts: Inter; JetBrains Mono (chips).”

Visual constraints: keep cards inside 7.5% safe area. Background blueprint grid faint. No extra icons.

Output: 1:1 PNG (transparent or white), 9:16 and 16:9 variants.
```
Captions and typography per §3.7; “one idea per card” aligns with the meme set on gradual progress and constructive error handling.

---
## SFX pack — 4 WAV (generate as audio tracks; picture may be a black frame or static slate)
**1) Ring Draw (pencil‑scratch + soft whoosh)**
```
[BASE]

Goal: 1.8 s WAV @ 48 kHz. Sound of pencil sketch drawing a ring, followed by a soft whoosh as it locks. Clean room tone, no music.

Dynamics: -18 LUFS integrated, short attack, gentle release. No distortion. Tail <250 ms.
Output: WAV only; if picture is required, render black slate with "Ring draw SFX".
```
**2) Badge Flip (clack)**
```
[BASE]

Goal: 0.4 s WAV @ 48 kHz. Short mechanical "clack" of a badge flipping. Tight transient, minimal tail.

Dynamics: peak -3 dBFS, no hiss. Output WAV; black slate if picture needed.
```
**3) Gate Change (soft tri‑tone: red low, green high)**
```
[BASE]

Goal: 0.6 s WAV @ 48 kHz. Three gentle tones ascending in pitch to signal red→amber→green. Soft attack, clean decay.

Tones: ~392 Hz → ~494 Hz → ~784 Hz (do not hard-quantize; keep organic). Output WAV.
```
**4) Bridge Snap (click with short reverb)**
```
[BASE]

Goal: 0.5 s WAV @ 48 kHz. Single precise click with a short plate reverb (~120 ms) to imply a satisfying snap fit.

Dynamics: transient preserved; no low-frequency rumble. Output WAV.
```
Audio cue definitions per §3.9.

---
## Color tokens — swatch card
**Sora prompt**
```
[BASE]

Goal: static “Color Tokens” sheet with six swatches and labels.

Layout: two rows of three tiles. Each tile shows a large color block, token name, and HEX.
Tokens:
- ink — #111827
- neutral — #9CA3AF
- blueprint — #2563EB
- green_gate — #22C55E
- amber — #F59E0B
- red — #EF4444

Notes: small text "High contrast AA" at footer. No extra graphics.
Output: 1:1, 16:9 PNG.
```
Palette per §3.1.

---
## Chip labels — “Context / Role / MethodDescription / Work” sheet
**Sora prompt**

```
[BASE]

Goal: static sheet that defines the four chip labels.

Layout:
- Row 1: "Context" chip (primary), "Role" chip (accent).
- Row 2: "MethodDescription" chip (info), "Work" chip (neutral).
Styles:
- Context chip: blueprint #2563EB fill, white text.
- Role chip: green_gate #22C55E fill, ink text.
- MethodDescription chip: neutral #9CA3AF outline, ink text.
- Work chip: ink #111827 outline, ink text on white.
- All chips: JetBrains Mono, 24–28 px, rounded; pill shape; 1 px inner stroke.

Constraint: chips appear in distinct areas of the layout, not touching. No other labels.

Output: 1:1 PNG with transparent background. Include 9:16 variant.
```
Role–Method–Work split and chip grammar per §2 and §3.6.

---
### QC checklist (Deutsch‑style falsifiers)
- If any frame mixes Role badge with MethodDescription or Work, reject. Separation is mandatory.
- If captions exceed one idea or break templates, reject; violates clarity and meme intent.
- If palette hex values differ from tokens, reject.
- If loops do not close seamlessly at cut, reject.
- If text falls below 24 px at 1080 base or inside 7.5% margins, reject.

These prompts keep FPF terms visible yet minimal and keep role badges apart from recipe cards and run logs, as required.