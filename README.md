# 1 STEP
## Files 
- `meta-model.json`
- `Memes.md`
- `q-a.md`
## Prompt
```
Create a single CHARACTER‑MASCOT (“mascot”) whose job is to turn learning‑habit memes into repeatable image/video panels with short captions. You will output three things: A) Character Bible, B) Production Spec JSON, C) Derived FAQ.
### 2) Plain‑English model of “who does what”
- **System:** the only thing that acts. Here, the **Holder** is a production rig/avatar/puppet or small toolchain that can actually do work.
- **Role:** **TransformerRole** is a job label given to the Holder inside a specific **Context** and time window.
- **Method:** a recipe at design time (inputs → steps → outputs). Methods don’t run; they describe.
- **Episteme (docs like Memes.md/q-a.md):** never acts. They only constrain or inform.
### 3) Inputs you will be given
- **Memes.md:** meme formats, tropes, visual beats.
- **q-a.md:** world, values, constraints, tone.
You must synthesize the mascot from these.
### 4) Objective
From the two inputs, produce:
1. **Character Bible** for artists/writers/animators.
2. **Meme Playbook** mapping the mascot to repeatable meme formats so others can replicate the joke mechanics.
### 5) Hard rules (follow exactly)
- Provide concrete **Work** examples that other agents can reproduce.
- Visual and text rules must be sufficient for multi‑agent replication and for image generation with caption overlays.
```
## OUTPUT
- Copy `json` block into `spec.json`

# STEP 2
- Attach `spec.json` file.

## Prompt:
```
Using spec of our mascot, create prompt for image  where our mascot will replicate meme: <MEME to generate>, provide 4 versions on prompts
```

Run it.

