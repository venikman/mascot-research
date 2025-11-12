#!/usr/bin/env node
/**
 * Auto Version Bump Analyzer
 *
 * Uses GPT (via GitHub Copilot / OpenAI API) to analyze changes in methodology documentation
 * and determine the appropriate semantic version bump.
 *
 * Usage: node scripts/auto-version.js [--apply]
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const METHODOLOGY_FILES = [
  'Meme.Mining.md',
  'Meme.Modeling.md',
  'Meme.Meaning.md',
  'Meme.Representation.md',
  'Instuction.md'
];

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.GITHUB_COPILOT_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o'; // Use gpt-4o or gpt-4-turbo

// Get current version
function getCurrentVersion() {
  const versionPath = path.join(__dirname, '..', 'VERSION');
  return fs.readFileSync(versionPath, 'utf8').trim();
}

// Parse version string
function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

// Bump version
function bumpVersion(version, type) {
  const v = parseVersion(version);

  switch (type) {
    case 'MAJOR':
      return `${v.major + 1}.0.0`;
    case 'MINOR':
      return `${v.major}.${v.minor + 1}.0`;
    case 'PATCH':
      return `${v.major}.${v.minor}.${v.patch + 1}`;
    default:
      return version;
  }
}

// Get git diff for methodology files
async function getMethodologyDiff() {
  const diffs = [];

  for (const file of METHODOLOGY_FILES) {
    try {
      const { stdout } = await execAsync(`git diff HEAD ${file}`);
      if (stdout.trim()) {
        diffs.push({
          file,
          diff: stdout
        });
      }
    } catch (error) {
      // File might not exist or no changes
    }
  }

  // Also check for staged changes
  for (const file of METHODOLOGY_FILES) {
    try {
      const { stdout } = await execAsync(`git diff --cached ${file}`);
      if (stdout.trim()) {
        const existingDiff = diffs.find(d => d.file === file);
        if (existingDiff) {
          existingDiff.diff += '\n\n--- STAGED CHANGES ---\n\n' + stdout;
        } else {
          diffs.push({
            file,
            diff: stdout
          });
        }
      }
    } catch (error) {
      // File might not exist or no changes
    }
  }

  return diffs;
}

// Analyze changes using OpenAI GPT API
async function analyzeChangesWithGPT(diffs) {
  if (!OPENAI_API_KEY) {
    console.log('\n⚠️  OPENAI_API_KEY or GITHUB_COPILOT_API_KEY not set. Using rule-based analysis instead.\n');
    return analyzeChangesRuleBased(diffs);
  }

  const prompt = `You are a semantic versioning expert analyzing changes to a methodology documentation repository.

The repository contains a Meme Mining, Modeling, and Representation methodology with these core documents:
- Meme.Mining.md: How to extract memes from text
- Meme.Modeling.md: How to define invariants and mutations
- Meme.Meaning.md: Schema for meme meaning structure
- Meme.Representation.md: How to generate visual/audio outputs
- Instuction.md: High-level workflow instructions

Based on semantic versioning principles:
- MAJOR (X.0.0): Breaking changes that would require users to revise their existing work
  * Changes to core schema structure (final_model, representation)
  * Removal of required fields or steps
  * Fundamental methodology changes that invalidate previous approaches

- MINOR (x.X.0): Backward-compatible additions
  * New optional fields or sections
  * Additional examples or clarifications
  * New methodology steps that don't invalidate existing ones

- PATCH (x.x.X): Backward-compatible bug fixes
  * Typo corrections
  * Clarification of existing text without changing meaning
  * Formatting improvements
  * Minor wording improvements

Here are the changes:

${diffs.map(d => `
=== ${d.file} ===
${d.diff}
`).join('\n\n')}

Analyze these changes and respond with ONLY a JSON object in this format:
{
  "bump": "MAJOR" | "MINOR" | "PATCH" | "NONE",
  "reasoning": "Brief explanation of why this bump level was chosen",
  "changes_summary": ["Change 1", "Change 2", ...],
  "breaking_changes": ["Breaking change 1", ...] (only if MAJOR)
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a semantic versioning expert. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON response
    const result = JSON.parse(content);

    // Validate response structure
    if (!result.bump || !result.reasoning || !result.changes_summary) {
      throw new Error('Invalid response structure from GPT');
    }

    return result;

  } catch (error) {
    console.log(`\n⚠️  GPT API error: ${error.message}. Using rule-based analysis.\n`);
    return analyzeChangesRuleBased(diffs);
  }
}

// Fallback rule-based analysis
function analyzeChangesRuleBased(diffs) {
  const changes = [];
  const breakingChanges = [];
  let bump = 'PATCH';

  for (const { file, diff } of diffs) {
    // Check for breaking changes
    if (
      diff.includes('-  **') || // Removed required field
      diff.includes('- **must') || // Removed must/required constraint
      diff.includes('- ## ') // Removed major section
    ) {
      bump = 'MAJOR';
      breakingChanges.push(`Removed content in ${file}`);
    }

    // Check for new additions
    if (
      diff.includes('+ ## ') || // Added major section
      diff.includes('+ **') || // Added new field
      diff.includes('+ - ') // Added list items
    ) {
      if (bump !== 'MAJOR') {
        bump = 'MINOR';
      }
      changes.push(`Added new content in ${file}`);
    }

    // Check for simple modifications
    if (
      diff.includes('typo') ||
      diff.includes('clarif') ||
      diff.includes('format')
    ) {
      changes.push(`Minor corrections in ${file}`);
    }
  }

  if (changes.length === 0 && diffs.length > 0) {
    changes.push('General documentation updates');
  }

  return {
    bump: diffs.length === 0 ? 'NONE' : bump,
    reasoning: breakingChanges.length > 0
      ? 'Breaking changes detected'
      : changes.some(c => c.includes('Added new'))
      ? 'Backward-compatible additions detected'
      : 'Minor corrections and clarifications',
    changes_summary: changes,
    breaking_changes: breakingChanges
  };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const shouldApply = args.includes('--apply');

  console.log('🔍 Analyzing methodology documentation changes...\n');

  // Get current version
  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}\n`);

  // Get diffs
  const diffs = await getMethodologyDiff();

  if (diffs.length === 0) {
    console.log('✓ No changes detected in methodology files.\n');
    return;
  }

  console.log(`Found changes in ${diffs.length} file(s):`);
  diffs.forEach(d => console.log(`  - ${d.file}`));
  console.log();

  // Analyze with GPT
  console.log('🤖 Analyzing changes with GPT...\n');
  const analysis = await analyzeChangesWithGPT(diffs);

  // Display results
  console.log('=' .repeat(60));
  console.log('ANALYSIS RESULTS');
  console.log('='.repeat(60));
  console.log(`\nRecommended bump: ${analysis.bump}`);
  console.log(`New version would be: ${currentVersion} → ${bumpVersion(currentVersion, analysis.bump)}`);
  console.log(`\nReasoning: ${analysis.reasoning}`);

  console.log('\nChanges detected:');
  analysis.changes_summary.forEach(change => {
    console.log(`  • ${change}`);
  });

  if (analysis.breaking_changes && analysis.breaking_changes.length > 0) {
    console.log('\n⚠️  Breaking changes:');
    analysis.breaking_changes.forEach(change => {
      console.log(`  ! ${change}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  // Apply if requested
  if (shouldApply && analysis.bump !== 'NONE') {
    const newVersion = bumpVersion(currentVersion, analysis.bump);

    console.log(`\n✓ Applying version bump: ${currentVersion} → ${newVersion}\n`);

    // Update VERSION file
    const versionPath = path.join(__dirname, '..', 'VERSION');
    fs.writeFileSync(versionPath, newVersion + '\n');

    // Update CHANGELOG
    const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
    const changelog = fs.readFileSync(changelogPath, 'utf8');
    const date = new Date().toISOString().split('T')[0];

    const newEntry = `## [${newVersion}] - ${date}

### ${analysis.bump === 'MAJOR' ? 'Breaking Changes' : analysis.bump === 'MINOR' ? 'Added' : 'Fixed'}
${analysis.changes_summary.map(c => `- ${c}`).join('\n')}
${analysis.breaking_changes && analysis.breaking_changes.length > 0
  ? '\n### Breaking Changes\n' + analysis.breaking_changes.map(c => `- ${c}`).join('\n')
  : ''}

`;

    const updatedChangelog = changelog.replace(
      /^(# Changelog.*?\n\n)/s,
      `$1${newEntry}`
    );

    fs.writeFileSync(changelogPath, updatedChangelog);

    console.log('✓ Updated VERSION file');
    console.log('✓ Updated CHANGELOG.md');
    console.log('\nNext steps:');
    console.log('  1. Review the changes');
    console.log('  2. Run: npm run release');
    console.log('  3. Commit and push\n');

  } else if (analysis.bump === 'NONE') {
    console.log('\n✓ No version bump needed.\n');
  } else {
    console.log('\n💡 To apply this version bump, run:');
    console.log(`   node scripts/auto-version.js --apply\n`);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { analyzeChangesWithGPT, bumpVersion };
