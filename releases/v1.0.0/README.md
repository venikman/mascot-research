# Meme Method Release v1.0.0

Released: 2025-11-12

## Contents

### Methodology Documentation

- `methodology/Meme.Mining.md`
- `methodology/Meme.Modeling.md`
- `methodology/Meme.Meaning.md`
- `methodology/Meme.Representation.md`
- `methodology/Instuction.md`

### Example Templates

3 example templates in `examples/` directory demonstrating the cass meme.schema.json format.

## Usage

1. **Study the methodology**: Read the documentation in `methodology/` to understand the three-stage process:
   - **Mining**: Extract behavioral patterns from text (Meme.Mining.md)
   - **Modeling**: Define invariants and mutations (Meme.Modeling.md)
   - **Representation**: Generate visual/audio outputs (Meme.Representation.md)

2. **Use example templates**: The `examples/` directory contains JSON files that conform to the cass meme.schema.json format. Use these as starting points for your own memes.

3. **Create your memes**: Follow the methodology to extract memes from your source material, then generate JSON files following the template structure.

## Schema Compatibility

All example templates conform to [cass/meme.schema.json](https://github.com/venikman/cass/blob/main/memes/schema/meme.schema.json) with:

- **final_model**: Conceptual definition (title, mode, bc, form, stance, meaning, policy)
- **representation**: Concrete instantiation (meta, layout, content, invariants, accessibility, lint, export)
- **_metadata**: Version tracking and generation info

## Integration with Cass

Copy example JSON files to the cass repository structure:

```
cass/memes/
├── YourMemeName/
│   └── data.json  (copy from examples/*.json)
```

## Method Version

This release uses **Method v1.0.0** with the three-stage pipeline:
Mining → Modeling → Representation
