# Auto-Versioning with Claude AI

This document describes how to use the AI-powered automatic version bump analyzer.

## Overview

The auto-versioning system uses Claude AI to analyze changes in methodology documentation and automatically determine the appropriate semantic version bump (MAJOR, MINOR, or PATCH).

## How It Works

1. **Analyzes git diffs** for methodology files (Meme.Mining.md, Meme.Modeling.md, etc.)
2. **Uses Claude AI** to understand the semantic impact of changes
3. **Recommends version bump** based on semantic versioning principles
4. **Optionally applies** the version bump and updates CHANGELOG.md

## Setup

### 1. Get Claude API Key

Get your API key from [Anthropic Console](https://console.anthropic.com/)

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
# ANTHROPIC_API_KEY=your_actual_key_here
```

### 3. Install Dependencies

The script uses Node.js built-in modules, no additional dependencies needed.

## Usage

### Check Recommended Version Bump

Analyze changes without applying anything:

```bash
npm run version:check
```

Or directly:

```bash
node scripts/auto-version.js
```

### Apply Version Bump Automatically

Analyze and apply the recommended version bump:

```bash
npm run version:auto
```

Or directly:

```bash
node scripts/auto-version.js --apply
```

## Example Workflow

### Scenario: You made changes to methodology docs

```bash
# 1. Make changes to Meme.Mining.md
vim Meme.Mining.md

# 2. Check what version bump is recommended
npm run version:check
```

Output:
```
🔍 Analyzing methodology documentation changes...

Current version: 1.0.0

Found changes in 1 file(s):
  - Meme.Mining.md

🤖 Analyzing changes with AI...

============================================================
ANALYSIS RESULTS
============================================================

Recommended bump: MINOR
New version would be: 1.0.0 → 1.1.0

Reasoning: Backward-compatible additions detected

Changes detected:
  • Added new section on bridge notes
  • Enhanced examples for claim extraction

============================================================

💡 To apply this version bump, run:
   node scripts/auto-version.js --apply
```

### Apply the recommendation

```bash
# 3. Apply the version bump
npm run version:auto
```

Output:
```
✓ Applying version bump: 1.0.0 → 1.1.0

✓ Updated VERSION file
✓ Updated CHANGELOG.md

Next steps:
  1. Review the changes
  2. Run: npm run release
  3. Commit and push
```

### Complete the release

```bash
# 4. Generate the release
npm run release

# 5. Review and commit
git add .
git commit -m "Bump version to 1.1.0"
git tag -a v1.1.0 -m "Release v1.1.0"
git push && git push --tags
```

## Version Bump Rules

The AI analyzer follows these semantic versioning principles:

### MAJOR (X.0.0) - Breaking Changes

Triggers when:
- Core schema structure changes (final_model, representation)
- Required fields or steps are removed
- Fundamental methodology changes that invalidate previous approaches
- Changes that would require users to revise existing work

Examples:
- Removing a required field from FinalModel schema
- Changing the three-stage pipeline structure
- Removing entire methodology sections

### MINOR (x.X.0) - New Features

Triggers when:
- New optional fields or sections are added
- Additional examples or clarifications are added
- New methodology steps that don't invalidate existing ones
- Enhancements that are backward-compatible

Examples:
- Adding a new optional field to the schema
- Adding new examples to existing methodology
- Adding a new visual format template

### PATCH (x.x.X) - Bug Fixes

Triggers when:
- Typo corrections
- Clarification of existing text without changing meaning
- Formatting improvements
- Minor wording improvements that don't change semantics

Examples:
- Fixing typos in Meme.Mining.md
- Clarifying ambiguous wording
- Formatting code blocks properly

### NONE - No Version Change

Triggers when:
- No changes detected in methodology files
- Only non-methodology files changed

## Fallback Mode

If the Claude API key is not configured or the API is unavailable, the script falls back to rule-based analysis:

- **MAJOR**: Detects removed required fields or sections
- **MINOR**: Detects new sections or fields
- **PATCH**: Detects typo/formatting keywords

The AI-powered analysis is more accurate and nuanced, but the fallback ensures the tool always works.

## Advanced Usage

### Analyze Specific Files

The script automatically analyzes these methodology files:
- Meme.Mining.md
- Meme.Modeling.md
- Meme.Meaning.md
- Meme.Representation.md
- Instuction.md

### Check Staged and Unstaged Changes

The script checks both:
- Uncommitted changes (`git diff HEAD`)
- Staged changes (`git diff --cached`)

### Manual Version Override

If you disagree with the AI recommendation, you can still bump manually:

```bash
npm run version:major  # Force MAJOR bump
npm run version:minor  # Force MINOR bump
npm run version:patch  # Force PATCH bump
```

## Integration with CI/CD

You can integrate this into your workflow:

```bash
# In your CI pipeline
npm run version:check

# Or as a pre-commit hook
#!/bin/bash
if [ -n "$(git diff --cached Meme.*.md)" ]; then
  echo "Methodology changes detected. Checking version..."
  npm run version:check
fi
```

## Troubleshooting

### "ANTHROPIC_API_KEY not set"

The script will fall back to rule-based analysis. To use AI analysis:
1. Get API key from https://console.anthropic.com/
2. Add to `.env` file
3. Run script again

### "No changes detected"

This means:
- No uncommitted or staged changes in methodology files
- All methodology docs are clean

If you expect changes:
```bash
# Check git status
git status

# Check if files are staged
git diff --cached

# Check unstaged changes
git diff
```

### "Could not parse Claude response"

This can happen if the API response is malformed. The script will automatically fall back to rule-based analysis.

### API Rate Limits

If you hit rate limits:
- Wait a few minutes
- Use the fallback mode (it's automatic)
- Consider upgrading your Anthropic API plan

## Best Practices

1. **Run before committing**: Check version bump recommendation before committing methodology changes

2. **Review AI reasoning**: Always read the reasoning provided by the AI to understand why a particular bump was recommended

3. **Test without --apply first**: Use `npm run version:check` to see the recommendation before applying

4. **Keep .env secure**: Never commit your .env file with API keys

5. **Document breaking changes**: If MAJOR bump is recommended, ensure CHANGELOG clearly documents what broke and how to migrate

## Examples

### Example 1: Adding a New Example

Change: Added example to Meme.Mining.md

```bash
npm run version:check
```

Result:
```
Recommended bump: MINOR
Reasoning: Added new examples without changing existing methodology
```

### Example 2: Fixing a Typo

Change: Fixed typo "methodoogy" → "methodology"

```bash
npm run version:check
```

Result:
```
Recommended bump: PATCH
Reasoning: Minor typo correction without semantic changes
```

### Example 3: Removing Required Field

Change: Removed "falsifier" field from Meme.Meaning.md

```bash
npm run version:check
```

Result:
```
Recommended bump: MAJOR
Reasoning: Breaking changes detected

⚠️  Breaking changes:
  ! Removed required field 'falsifier' from meaning schema
```

## API Costs

Claude Sonnet 4 pricing (as of documentation date):
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

Typical analysis uses:
- Input: ~2000-5000 tokens (diff content)
- Output: ~200 tokens (JSON response)

Cost per analysis: < $0.01

## Security

- API keys are stored in `.env` (not committed to git)
- `.env` is in `.gitignore` by default
- API calls are made over HTTPS
- No sensitive code is sent to the API, only diffs

## Support

For issues or questions:
- Repository: [venikman/mascot-research](https://github.com/venikman/mascot-research)
- Issues: [GitHub Issues](https://github.com/venikman/mascot-research/issues)
