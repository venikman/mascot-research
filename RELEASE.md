# Release Process

This document describes how to create and manage release versions of the Meme Mining, Modeling, and Representation methodology.

## Overview

The release system generates versioned packages containing:

- **Methodology documentation** (Meme.Mining.md, Meme.Modeling.md, etc.)
- **Example JSON templates** conforming to [cass meme.schema.json](https://github.com/venikman/cass/blob/main/memes/schema/meme.schema.json)
- **Manifest file** with release metadata

## Version Management

### Current Version

The current version is stored in `VERSION` file at the root:

```bash
cat VERSION
# Output: 1.0.0
```

### Versioning Scheme

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Breaking changes to the methodology or schema compatibility
- **MINOR** (x.1.x): New methodology sections, additional examples
- **PATCH** (x.x.1): Bug fixes, typos, minor corrections to docs

## Creating a Release

### 1. Update Version

Edit the `VERSION` file:

```bash
echo "1.1.0" > VERSION
```

### 2. Update CHANGELOG

Add an entry to `CHANGELOG.md`:

```markdown
## [1.1.0] - 2025-11-15

### Added
- New example template for DECOMPOSE pattern
- Additional documentation for bridge notes

### Changed
- Clarified stance definition in Meme.Meaning.md
```

### 3. Generate Release

Run the release generation script:

```bash
node scripts/generate-release.js
# or use npm script:
npm run release
```

This will:
- Read the current `VERSION` file
- Copy methodology documentation files
- Generate example JSON templates
- Create a `manifest.json` with metadata
- Create a `README.md` for the release

### 4. Review Output

Check the generated files:

```bash
ls -la releases/v1.0.0/
# Output:
# methodology/         - Documentation files
# examples/            - Example JSON templates
# manifest.json        - Release metadata
# README.md            - Release documentation
```

Inspect an example template:

```bash
cat releases/v1.0.0/examples/reflect_reflective_learning_pattern.json
```

### 5. Create Git Tag

Tag the release in git:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Comparing Releases

To see differences ("iff") between two versions:

```bash
node scripts/diff-releases.js 1.0.0 1.1.0
# or use npm script:
npm run diff 1.0.0 1.1.0
```

This will show:

- **Manifest comparison**: Version changes, doc counts, example counts
- **Methodology docs**: New, removed, or modified documentation
- **Example templates**: New, removed, or modified examples
- **Summary statistics**: Overall change count

### Example Output

```
🔍 Comparing releases v1.0.0 ↔ v1.1.0

📋 MANIFEST COMPARISON

Version:          1.0.0 → 1.1.0
Release Date:     2025-11-12 → 2025-11-15
Method Version:   1.0.0 → 1.0.0
Methodology Docs: 5 → 5
Example Templates: 3 → 4
                  (+1 new examples)

📚 METHODOLOGY DOCUMENTATION

🔄 Modified Documents (1):

   Meme.Meaning.md
      • Lines: 50 → 55 (+5)

📊 EXAMPLE TEMPLATES

✨ New Examples (1):
   + decompose_systems_analysis_pattern.json
      • Systems Analysis Pattern

✓ Unchanged: 3 examples

============================================================
📈 SUMMARY
============================================================

Methodology Documentation:
  Total in v1.0.0: 5 docs
  Total in v1.1.0: 5 docs
  Added:     0
  Removed:   0
  Modified:  1
  Unchanged: 4

Example Templates:
  Total in v1.0.0: 3 examples
  Total in v1.1.0: 4 examples
  Added:     1
  Removed:   0
  Modified:  0
  Unchanged: 3
============================================================
```

## Release Structure

Each release is stored in `releases/v{VERSION}/`:

```
releases/
├── v1.0.0/
│   ├── methodology/
│   │   ├── Meme.Mining.md
│   │   ├── Meme.Modeling.md
│   │   ├── Meme.Meaning.md
│   │   ├── Meme.Representation.md
│   │   └── Instuction.md
│   ├── examples/
│   │   ├── reflect_reflective_learning_pattern.json
│   │   ├── steps_incremental_progress_pattern.json
│   │   └── z-debug_error_correction_pattern.json
│   ├── manifest.json
│   └── README.md
```

### Manifest Schema

```json
{
  "version": "1.0.0",
  "release_date": "2025-11-12",
  "method_version": "1.0.0",
  "description": "Meme Mining, Modeling, and Representation Methodology",
  "compatible_with": "cass/meme.schema.json",
  "contents": {
    "methodology_docs": ["Meme.Mining.md", ...],
    "example_templates": 3,
    "example_files": ["reflect_reflective_learning_pattern.json", ...]
  },
  "usage": "Use methodology docs to create memes, then generate JSON following example templates",
  "repository": "https://github.com/venikman/mascot-research"
}
```

### Example JSON Structure

Each example template contains:

#### 1. `final_model` (Conceptual Definition)

- **title**: Meme name
- **mode**: M-0 to M-3 based on formality level
- **edition**: Release date
- **bc**: Broadcasting context (platform, culture, language)
- **form**: Visual layout specifications
- **stance**: Communicative attitude
- **meaning**: Claim, reasons, falsifier, roles
- **policy**: Copying rules, invariants, mutations

#### 2. `representation` (Concrete Instantiation)

- **meta**: Meme ID, media type, platform, export date
- **layout**: Geometry for image or multiform
- **content**: Headline, slots A/B/C
- **invariants**: Colors, contrast thresholds
- **accessibility**: Alt text, captions
- **lint**: Validation checks
- **export**: Format, resolution

#### 3. `_metadata` (Version Tracking)

- **version**: Release version
- **method_version**: Methodology version
- **generator**: Script that generated the file
- **template**: Format used (REFLECT, STEPS, etc.)
- **example**: Boolean flag indicating this is an example

## Integration with Cass

The [cass repository](https://github.com/venikman/cass) expects JSON files in its `memes/` directory:

```
cass/memes/
├── schema/
│   └── meme.schema.json
├── YourMemeName/
│   └── data.json  (copy from examples/*.json)
```

### Deployment Workflow

1. Generate release in mascot-research
2. Copy example JSON files to cass repository
3. Rename and organize into subdirectories
4. Create your own memes following the methodology
5. Generate JSON files using examples as templates

## Scripts Reference

### `scripts/generate-release.js`

**Purpose**: Generate versioned methodology releases

**Usage**:
```bash
node scripts/generate-release.js [version]
# or
npm run release
```

**Outputs**:
- Methodology documentation in `methodology/`
- Example JSON templates in `examples/`
- `manifest.json` with metadata
- `README.md` with usage instructions

### `scripts/diff-releases.js`

**Purpose**: Compare two release versions

**Usage**:
```bash
node scripts/diff-releases.js <version1> <version2>
# or
npm run diff <version1> <version2>
```

**Outputs**:
- Console report showing differences in docs and examples

## Best Practices

### Before Creating a Release

1. **Review methodology docs**: Ensure all .md files are current
2. **Test examples**: Verify example templates match current methodology
3. **Update CHANGELOG**: Document all changes clearly
4. **Review schema**: Confirm compatibility with cass meme.schema.json

### Version Bumping Guidelines

- **MAJOR**: Breaking changes to methodology or schema incompatibility
- **MINOR**: New docs, additional examples, non-breaking enhancements
- **PATCH**: Typos, clarifications, minor corrections

### Release Checklist

- [ ] Update `VERSION` file
- [ ] Update `CHANGELOG.md`
- [ ] Run `npm run release`
- [ ] Review generated files
- [ ] Commit changes
- [ ] Create git tag
- [ ] Push tag to remote

## Troubleshooting

### Missing methodology docs

**Symptom**: Fewer than 5 docs in release

**Cause**: Documentation files moved or renamed

**Fix**: Ensure these files exist in repository root:
- Meme.Mining.md
- Meme.Modeling.md
- Meme.Meaning.md
- Meme.Representation.md
- Instuction.md

### Example generation fails

**Symptom**: No example JSON files created

**Cause**: Script error or missing dependencies

**Fix**: Check Node.js version (requires >=14.0.0):
```bash
node --version
```

### Version mismatch

**Symptom**: Release version doesn't match `VERSION` file

**Cause**: Cached data or incorrect argument

**Fix**: Delete `releases/` and regenerate:
```bash
rm -rf releases/
npm run release
```

## Contact

For questions about the release process:
- Repository: [venikman/mascot-research](https://github.com/venikman/mascot-research)
- Issues: [GitHub Issues](https://github.com/venikman/mascot-research/issues)
