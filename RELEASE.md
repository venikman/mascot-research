# Release Process

This document describes how to create and manage release versions of the Meme Mining, Modeling, and Representation method.

## Overview

The release system generates JSON files conforming to the [cass meme.schema.json](https://github.com/venikman/cass/blob/main/memes/schema/meme.schema.json) format. Each release includes:

- **Versioned meme definitions** in JSON format
- **Manifest file** with release metadata
- **Compatibility** with the cass frontend application

## Version Management

### Current Version

The current version is stored in `VERSION` file at the root of the repository:

```bash
cat VERSION
# Output: 1.0.0
```

### Versioning Scheme

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Breaking changes to the method or schema compatibility
- **MINOR** (x.1.x): New memes added, non-breaking enhancements
- **PATCH** (x.x.1): Bug fixes, typos, minor corrections

## Creating a Release

### 1. Update Version

Edit the `VERSION` file with the new version number:

```bash
echo "1.1.0" > VERSION
```

### 2. Update CHANGELOG

Add an entry to `CHANGELOG.md` documenting what changed:

```markdown
## [1.1.0] - 2025-11-15

### Added
- 3 new memes for collaboration patterns
- Enhanced metrics for team dynamics

### Changed
- Updated visual format for REFLECT template
- Improved description clarity for existing memes

### Fixed
- Corrected metrics calculation for diversity (H)
```

### 3. Generate Release

Run the release generation script:

```bash
node scripts/generate-release.js
```

This will:
- Read the current `VERSION` file
- Parse `Methods/GPTv2/Memes.md` for meme data
- Load `Testing/GPT/spec.json` for templates
- Generate JSON files in `releases/v{VERSION}/`
- Create a `manifest.json` with metadata

### 4. Review Output

Check the generated files:

```bash
ls -la releases/v1.0.0/
# Output:
# m1_Reflective_Intrinsic_Motivation_Shift.json
# m2_Incremental_Progress_Reflection.json
# ...
# manifest.json
```

Inspect a sample meme file:

```bash
cat releases/v1.0.0/m1_Reflective_Intrinsic_Motivation_Shift.json
```

### 5. Create Git Tag

Tag the release in git:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Comparing Releases

To see differences between two versions:

```bash
node scripts/diff-releases.js 1.0.0 1.1.0
```

This will show:

- **Manifest comparison**: Version changes, meme count differences
- **New memes**: Memes added in the newer version
- **Removed memes**: Memes removed from the older version
- **Modified memes**: Changes to existing memes (title, metrics, hooks, etc.)
- **Summary statistics**: Overall change count

### Example Output

```
🔍 Comparing releases v1.0.0 ↔ v1.1.0

📋 MANIFEST COMPARISON

Version:        1.0.0 → 1.1.0
Release Date:   2025-11-12 → 2025-11-15
Method Version: 1.0.0 → 1.0.0
Spec Version:   1.0.0 → 1.0.0
Total Memes:    16 → 19
                (+3 new memes)

📊 MEME COMPARISON

✨ New Memes (3):
   + m21: Collaborative Systems Thinking
   + m22: Peer Review Discipline
   + m23: Knowledge Sharing Habit

🔄 Modified Memes (2):

   m1: Reflective Intrinsic Motivation Shift
      • Metric diversity: 0 → 0.5
      • Popularity: 69 → 72 hits

   m3: Exorcising Zombie Ideas
      • Hook: "Test ideas. Not vibes." → "Test ideas rigorously."

✓ Unchanged: 13 memes

============================================================
📈 SUMMARY
============================================================
Total in v1.0.0: 16 memes
Total in v1.1.0: 19 memes

Added:     3
Removed:   0
Modified:  2
Unchanged: 13
============================================================
```

## Release Structure

Each release is stored in `releases/v{VERSION}/` with the following structure:

```
releases/
├── v1.0.0/
│   ├── m1_Reflective_Intrinsic_Motivation_Shift.json
│   ├── m2_Incremental_Progress_Reflection.json
│   ├── ...
│   └── manifest.json
└── v1.1.0/
    ├── m1_Reflective_Intrinsic_Motivation_Shift.json
    ├── ...
    └── manifest.json
```

### Manifest Schema

```json
{
  "version": "1.0.0",
  "release_date": "2025-11-12",
  "method_version": "1.0.0",
  "spec_version": "1.0.0",
  "total_memes": 16,
  "compatible_with": "cass/meme.schema.json",
  "metrics_framework": "MemeMeter_v1",
  "files": [
    "m1_Reflective_Intrinsic_Motivation_Shift.json",
    "..."
  ]
}
```

### Meme JSON Schema

Each meme JSON file contains two main sections:

#### 1. `final_model` (Conceptual Definition)

- **title**: Meme name
- **mode**: M-0 to M-3 based on fidelity metric
- **edition**: Release date
- **bc**: Broadcasting context (platform, culture, language)
- **form**: Visual layout specifications
- **stance**: Philosophical position
- **meaning**: Claim, reasons, falsifier, roles
- **policy**: Copying rules, invariants, mutations, bridge notes

#### 2. `representation` (Concrete Instantiation)

- **meta**: Meme ID, media type, platform, export date
- **layout**: Image or multiform geometry
- **content**: Headline, slots A/B/C, narration
- **invariants**: Colors, contrast, glyphs
- **accessibility**: Alt text, captions, language
- **lint**: Validation checks
- **export**: Format, resolution

#### 3. `_metadata` (Internal Tracking)

- **version**: Release version
- **method_version**: Method framework version
- **generator**: Script that generated the file
- **metrics**: MemeMeter_v1 metrics (ρ, φ, H, A, R)
- **popularity**: Hit count from corpus

## Integration with Cass

The [cass repository](https://github.com/venikman/cass) expects these JSON files in its `memes/` directory structure:

```
cass/memes/
├── schema/
│   └── meme.schema.json
├── Reflective_Intrinsic_Motivation_Shift/
│   └── data.json  (copy from m1_*.json)
├── Incremental_Progress_Reflection/
│   └── data.json  (copy from m2_*.json)
└── ...
```

### Deployment Workflow

1. Generate release in mascot-research
2. Copy JSON files to cass repository
3. Organize by meme name into subdirectories
4. Rename to `data.json` within each subdirectory
5. Commit and deploy cass frontend

## Scripts Reference

### `scripts/generate-release.js`

**Purpose**: Generate versioned meme JSON files

**Usage**:
```bash
node scripts/generate-release.js [version]
```

**Arguments**:
- `version` (optional): Version number to use (default: reads from `VERSION` file)

**Outputs**:
- JSON files in `releases/v{VERSION}/`
- `manifest.json` with release metadata

**Example**:
```bash
# Use VERSION file
node scripts/generate-release.js

# Specify version explicitly
node scripts/generate-release.js 1.1.0
```

### `scripts/diff-releases.js`

**Purpose**: Compare two release versions

**Usage**:
```bash
node scripts/diff-releases.js <version1> <version2>
```

**Arguments**:
- `version1`: First version to compare (e.g., "1.0.0")
- `version2`: Second version to compare (e.g., "1.1.0")

**Outputs**:
- Console report showing differences

**Example**:
```bash
node scripts/diff-releases.js 1.0.0 1.1.0
```

## Best Practices

### Before Creating a Release

1. **Review all changes**: Check git diff for modifications
2. **Update documentation**: Ensure Memes.md reflects current state
3. **Validate metrics**: Confirm MemeMeter_v1 metrics are accurate
4. **Test spec.json**: Verify all template definitions are correct
5. **Update CHANGELOG**: Document all changes clearly

### Version Bumping Guidelines

- **MAJOR**: Change when schema is incompatible with cass
- **MINOR**: Add new memes or enhance existing ones non-destructively
- **PATCH**: Fix typos, correct metrics, minor updates

### Release Checklist

- [ ] Update `VERSION` file
- [ ] Update `CHANGELOG.md`
- [ ] Run `node scripts/generate-release.js`
- [ ] Review generated JSON files
- [ ] Test with cass (if available)
- [ ] Commit changes
- [ ] Create git tag
- [ ] Push tag to remote

## Troubleshooting

### No memes generated

**Symptom**: Script reports "Memes: 0"

**Cause**: Meme names in `spec.json` don't match names in `Memes.md`

**Fix**: Ensure exact name matching (case-sensitive)

### Missing metrics

**Symptom**: JSON files have null or undefined metrics

**Cause**: Metrics not found in `Memes.md`

**Fix**: Verify `Memes.md` has complete metrics for each meme:
```markdown
**Metrics**: ρ=0.85, φ=0.5157, H=0, A=0.95, R=0
```

### Version mismatch

**Symptom**: Release version doesn't match `VERSION` file

**Cause**: Cached data or wrong argument

**Fix**: Delete `releases/` and regenerate:
```bash
rm -rf releases/
node scripts/generate-release.js
```

## Contact

For questions about the release process:
- Repository: [venikman/mascot-research](https://github.com/venikman/mascot-research)
- Issues: [GitHub Issues](https://github.com/venikman/mascot-research/issues)
