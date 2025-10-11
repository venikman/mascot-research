## Section 1: VALIDATION

* **Role/Assignment ambiguity.** Q&A lists “Workers, professionals, students” as roles, which is a target segment, not a TransformerRole. I set `TransformerRole: Constructor` and keep audience as Target in Context. 
* **Methods missing in Q&A.** Memes drive methods; I selected top memes by popularity and instantiated U.Methods. 
* **Guardrails.** Q&A said “No special guards,” but the meta‑model mandates guardrails and “measurement is external.” I enforced the provided do/don’t and principles. 
* **Media grammar invariants.** Symbols, labels, motion types, captions, audio cues applied as specified. 
* **Scenes.** Stand‑up, PR review, habit tracker, learning log, weekly retro align with the Q&A’s “working life, regular life, self‑management.” 
* **Capability envelope + validity window.** Filled with concrete throughput, latency, and conformance mode. Measurement stays external. 
* **Deutsch challenge addressed.** Each method includes rival‑explanation generation, hard‑to‑vary checks, and green‑gate criteria that can falsify a step. Evidence is time‑stamped carriers, never authority claims. 

---

## Section 2: METHODS

### M1 — **Полезный мем 1**: internal motivation → **U.Method: InternalMotivationAnchor**  

* **Scenes/Apps:** Habit tracker, Weekly retro, Learning log. 
* **Inputs:** Reflection journal, “What I gained” note, goal card.
* **Key steps (use only allowed actions):** `draw_boundary` (scope “why this matters”), `assign_badge` (“Learner”), `stamp_evidence` (personal change + date), `author_bridge` (next concrete step), `toggle_gate` (green if step is minimal and self‑authored). 
* **Outputs (Work):**

  * `EvidenceTicket` + `BridgeChip` + `ContextCard` with fields `[context, role, method_description, work_ref, timestamp]`. 
* **Failure/Gates (M‑0…M‑3):**

  * M‑0: Boundary not explicit → fail.
  * M‑1: No dated evidence carrier → fail.
  * M‑2: No bridge to next action or bridge not reused → hold.
  * M‑3: No external measure hooked → hold. (Measurement transformer required.) 
* **Captions (≤48 chars):** “Boundary first. Then act.” / “Evidence wears a date.” / “Bridge it, or don’t mix.” 
* **Voice lines (≤3 s):** “Draw the room.” / “Note the change.” / “Bridge to next step.” 

### M2 — **Полезный мем 8**: gradual progress → **U.Method: StepwiseProgress**  

* **Scenes/Apps:** Habit tracker, Stand‑up, Learning log. 
* **Inputs:** Weekly reflection, tiny‑step backlog, time box.
* **Key steps:** `draw_boundary` (week scope), `stamp_evidence` (small win), `author_bridge` (next smallest step), `toggle_gate` (only 2–10 min steps), optional `assign_badge` (“Practitioner”). 
* **Outputs:** `TwoLaneCard` (Plan≠Run) + `EvidenceTicket` with required fields. 
* **Failure/Gates:**

  * M‑0: Plan mixed with run → fail.
  * M‑1: Step >10 min or vague → fail.
  * M‑2: No cumulative bridge chain → hold.
  * M‑3: No external adoption metric → hold. 
* **Captions:** “Plan ≠ Run. Keep both.” / “Small step. Green gate.” / “Progress compounds. Log it.” 
* **Voice lines:** “Recipe here, run there.” / “Gate the next step.” / “Log the win.” 

### M3 — **Полезный мем 3**: constructive errors → **U.Method: ErrorToTest**  

* **Scenes/Apps:** PR review, Design doc, Weekly retro.
* **Inputs:** Claim/explanation, counterexample, failing test.
* **Key steps:** `draw_boundary` (claim scope), generate rival explanations, specify a **critical test** that forbids outcomes, `stamp_evidence` (result with date), `author_bridge` (fix or adopt), `toggle_gate` (pass only hard‑to‑vary explanation). 
* **Outputs:** `EvidenceTicket` + `BridgeChip`.
* **Failure/Gates:**

  * M‑0: No explicit claim boundary → fail.
  * M‑1: No refutable prediction → fail.
  * M‑2: Survives no serious criticism → hold.
  * M‑3: No external quality signal (e.g., defect rate) → hold. 
* **Captions:** “Good tests kill bad ideas.” / “Critique, then act.” / “Evidence wears a date.” 
* **Voice lines:** “Propose. Critique. Test.” / “Make it hard to vary.” / “Record the result.” 

### M4 — **Полезный мем 9**: systematic practice → **U.Method: RoutineSystemization**  

* **Scenes/Apps:** Learning log, Habit tracker, Stand‑up.
* **Inputs:** Weekly template, schedule block, support tool link.
* **Key steps:** `draw_boundary` (time/energy), `assign_badge` (“Practitioner”), `author_bridge` (tool/template), `toggle_gate` (daily micro‑practice), `stamp_evidence` (done log). 
* **Outputs:** `TwoLaneCard` + `BadgeStamp` + `BridgeChip`.
* **Failure/Gates:**

  * M‑0: No time boundary → fail.
  * M‑1: Plan/Run mixed → fail.
  * M‑2: No tool chain or reuse → hold.
  * M‑3: No external adoption count → hold. 
* **Captions:** “Badge → Gate → Go.” / “Plan ≠ Run. Keep both.” / “Practice beats intention.” 
* **Voice lines:** “Wear the right badge.” / “Split plan from run.” / “Green gate? Proceed.” 

### M5 — **Полезный мем 2**: self‑discipline/control → **U.Method: DisciplineLoop**  

* **Scenes/Apps:** Habit tracker, Learning log.
* **Inputs:** Self‑check prompts, repeat‑question set.
* **Key steps:** `draw_boundary` (distraction sources), `assign_badge` (“Focused Learner”), `toggle_gate` (check → act), `stamp_evidence` (tick list), `author_bridge` (reset ritual). 
* **Outputs:** `BadgeStamp` + `EvidenceTicket` + `TwoLaneCard`.
* **Failure/Gates:**

  * M‑0: No boundary to distractions → fail.
  * M‑1: Missing check rhythm → fail.
  * M‑2: No reset ritual → hold.
  * M‑3: No external adherence metric → hold. 
* **Captions:** “Badge on. Focus on run.” / “Discipline is scheduled.” / “Boundary first. Then act.” 
* **Voice lines:** “Check. Gate. Execute.” / “Badge on. Distractions off.” / “Log. Reset. Continue.” 

---

## Section 3: STORYBOARDS & LOOPS

> Labels **Context · Role · MethodDescription · Work** are distinct on all frames. Symbols use boundary ring, role badge, green gate, bridge, evidence. 

**SB‑M1 (6–8 s): InternalMotivationAnchor**

* 0.0–0.7s: **Context** chip appears; boundary ring draws around “Why this matters” (audio: `ring_draw_whoosh`).
* 0.7–1.4s: **Role** chip; badge flips to “Learner” (audio: `badge_flip_clack`).
* 1.4–2.8s: **MethodDescription** chip; user scribbles “gain → action”.
* 2.8–4.0s: Evidence stamp hits with date (audio: `gate_tri_tone` soft).
* 4.0–5.2s: Bridge tile snaps to next step (audio: `bridge_click`).
* 5.2–6.8s: Green gate pulses, caption: “Boundary first. Then act.”

**Loops for M1**

* L1: **Boundary Sweep** 2.2s, pose “Point‑the‑Boundary,” caption “Evidence wears a date.” audio `ring_draw_whoosh`.
* L2: **Bridge Snap** 2.0s, pose “Bridge‑Build,” caption “Bridge it, or don’t mix.” audio `bridge_click`.

**SB‑M2 (6–8 s): StepwiseProgress**

* Boundary ring on week scope → TwoLaneCard splits Plan/Run → tiny step enters gate → evidence tick → caption “Plan ≠ Run. Keep both.” Audio sequence: whoosh → tri_tone.

**Loops for M2**

* L1: **Gate Pulse** 2.3s, pose “Green‑Gate,” caption “Small step. Green gate.” audio `gate_tri_tone`.
* L2: **Boundary Sweep** 2.0s, pose “Plan/Run Split,” caption “Progress compounds. Log it.” audio `ring_draw_whoosh`.

**SB‑M3 (6–8 s): ErrorToTest**

* Declare claim in **Context** → spawn 2 rival explanations → draw “forbidden outcome” test → stamp result with date → green gate only on survivor → caption “Good tests kill bad ideas.” Audio: whoosh → tri_tone.

**Loops for M3**

* L1: **Gate Pulse** 2.4s, pose “Blocked→Green‑Gate” flip, caption “Critique, then act.”
* L2: **Bridge Snap** 2.1s, pose “Evidence‑Stamp→Bridge,” caption “Evidence wears a date.”

**SB‑M4 (6–8 s): RoutineSystemization**

* Time boundary ring on calendar → badge “Practitioner” → Plan/Run split → daily micro‑practice passes green gate → caption “Practice beats intention.”

**Loops for M4**

* L1: **Badge Flip** 2.2s, caption “Badge → Gate → Go.”
* L2: **Boundary Sweep** 2.1s, caption “Plan ≠ Run. Keep both.”

**SB‑M5 (6–8 s): DisciplineLoop**

* Boundary on distractions → badge “Focused Learner” → self‑check ticks → green gate → reset ritual bridge → caption “Discipline is scheduled.”

**Loops for M5**

* L1: **Badge Flip** 2.0s, caption “Badge on. Focus on run.”
* L2: **Gate Pulse** 2.3s, caption “Boundary first. Then act.”

---

## Section 4: FILE SPECS

| asset_id | meme | type                | ratios        | base_res | format         | duration | alt‑text                                                                        |
| -------- | ---- | ------------------- | ------------- | -------- | -------------- | -------- | ------------------------------------------------------------------------------- |
| A‑001    | M1   | storyboard          | 9:16,1:1,16:9 | ≥1080    | MP4/H.264      | 6–8s     | “Maskot draws boundary, stamps dated evidence, snaps bridge, gate turns green.” |
| A‑002    | M1   | loop‑Boundary Sweep | 9:16,1:1      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Maskot traces boundary ring around Context chip.”                              |
| A‑003    | M1   | loop‑Bridge Snap    | 1:1,16:9      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Bridge tile clicks into place linking insight to next step.”                   |
| A‑004    | M2   | storyboard          | 9:16,1:1,16:9 | ≥1080    | MP4/H.264      | 6–8s     | “TwoLaneCard shows Plan vs Run, tiny step passes green gate.”                   |
| A‑005    | M2   | loop‑Gate Pulse     | 9:16,1:1      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Green gate pulses as micro‑task passes.”                                       |
| A‑006    | M2   | loop‑Boundary Sweep | 1:1,16:9      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Boundary ring sets weekly scope.”                                              |
| A‑007    | M3   | storyboard          | 9:16,1:1,16:9 | ≥1080    | MP4/H.264      | 6–8s     | “Rival explanations, critical test, dated evidence, survivor gated.”            |
| A‑008    | M3   | loop‑Gate Pulse     | 9:16,1:1      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Blocked flips to green after test passes.”                                     |
| A‑009    | M3   | loop‑Bridge Snap    | 1:1,16:9      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Evidence stamp leads to bridge action.”                                        |
| A‑010    | M4   | storyboard          | 9:16,1:1,16:9 | ≥1080    | MP4/H.264      | 6–8s     | “Calendar boundary, badge on, Plan/Run split, daily micro‑practice.”            |
| A‑011    | M4   | loop‑Badge Flip     | 9:16,1:1      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Badge flips to Practitioner.”                                                  |
| A‑012    | M4   | loop‑Boundary Sweep | 1:1,16:9      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Boundary over schedule block.”                                                 |
| A‑013    | M5   | storyboard          | 9:16,1:1,16:9 | ≥1080    | MP4/H.264      | 6–8s     | “Distraction boundary, Focused badge, self‑check ticks, reset bridge.”          |
| A‑014    | M5   | loop‑Badge Flip     | 9:16,1:1      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Badge flips to Focused Learner.”                                               |
| A‑015    | M5   | loop‑Gate Pulse     | 1:1,16:9      | ≥1080    | MP4/H.264, GIF | 2–3s     | “Gate pulses after check ritual.”                                               |


You are constrained by Maskot v3.2.
Role = Constructor. Allowed actions: draw_boundary, assign_badge, toggle_gate, stamp_evidence, author_bridge. Prohibited: act_as_episteme, self_measure. Keep Context · Role · MethodDescription · Work labeled on frames. Use symbols: boundary_ring, role_badge, green_gate, bridge_tile, evidence_stamp. Plan ≠ Run. Measurement is external. Enforce maturity gates M‑0…M‑3. Apply scenes per spec. Generate rival explanations, a critical test, and a hard‑to‑vary check for any claim before passing a green gate.

Task: Produce storyboard+2 loops for {method_id} in scene {scene}.
Inputs (fill): {inputs from answers}
Must return:
1) Method card: Context · Role · MethodDescription · Work (distinct chips).
2) Gates table: M-0..M-3 with fail/hold/pass and reasons.
3) Storyboard (6–8 s): bullet frames with audio_cue.
4) Two loops (≈2–3 s): loop name, pose, caption, VO, audio_cue.
5) Captions x3 and VO x3 using media grammar templates.
6) Exports: ratios [9:16,1:1,16:9], base_res ≥1080, formats [PNG, SVG, MP4, GIF], alt-text.
Apply hard-to-vary and rival-explanation test before any green gate.

### Operator checklist before you accept any output
* Labels present on every frame: Context, Role, MethodDescription, Work. 
* Plan not mixed with Run; TwoLane where relevant. If mixed, fail M‑0. 
* Evidence has a timestamp field. If missing, fail M‑1. 
* A rival‑explanations + critical‑test block exists for any claim. If absent, hold M‑2.
* No self‑measurement; only a binding to an external measure. If violated, fail. 
* Scenes match Stand‑up, PR review, Habit tracker, Learning log, Weekly retro. 
* Memes used are from the selected top set. 

### Minimal “one‑liner” for rapid iterations
```
Run {method_id} in {scene}. Return: method card, M‑gates, 6–8 s storyboard, two 2–3 s loops, captions×3, VO×3, exports, and updated assets.json. Apply rival‑explanations + critical‑test + hard‑to‑vary before green gate.
```