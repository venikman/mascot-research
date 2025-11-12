#!/usr/bin/env node
/**
 * Release Diff Utility
 *
 * Shows differences between two release versions of the meme method.
 *
 * Usage: node scripts/diff-releases.js <version1> <version2>
 * Example: node scripts/diff-releases.js 1.0.0 1.1.0
 */

const fs = require('fs');
const path = require('path');

function loadRelease(version) {
  const releaseDir = path.join(__dirname, '..', 'releases', `v${version}`);

  if (!fs.existsSync(releaseDir)) {
    throw new Error(`Release v${version} not found at ${releaseDir}`);
  }

  const manifestPath = path.join(releaseDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest not found for v${version}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Load all meme JSON files
  const memes = {};
  manifest.files.forEach(filename => {
    const filepath = path.join(releaseDir, filename);
    const memeId = filename.split('_')[0];
    memes[memeId] = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  });

  return { manifest, memes };
}

function compareManifests(v1, v2) {
  console.log('\n📋 MANIFEST COMPARISON\n');
  console.log(`Version:        ${v1.manifest.version} → ${v2.manifest.version}`);
  console.log(`Release Date:   ${v1.manifest.release_date} → ${v2.manifest.release_date}`);
  console.log(`Method Version: ${v1.manifest.method_version} → ${v2.manifest.method_version}`);
  console.log(`Spec Version:   ${v1.manifest.spec_version} → ${v2.manifest.spec_version}`);
  console.log(`Total Memes:    ${v1.manifest.total_memes} → ${v2.manifest.total_memes}`);

  const diff = v2.manifest.total_memes - v1.manifest.total_memes;
  if (diff > 0) {
    console.log(`                (+${diff} new memes)`);
  } else if (diff < 0) {
    console.log(`                (${diff} memes removed)`);
  }
}

function compareMemes(v1, v2) {
  console.log('\n📊 MEME COMPARISON\n');

  const v1Ids = new Set(Object.keys(v1.memes));
  const v2Ids = new Set(Object.keys(v2.memes));

  // New memes
  const newMemes = [...v2Ids].filter(id => !v1Ids.has(id));
  if (newMemes.length > 0) {
    console.log(`✨ New Memes (${newMemes.length}):`);
    newMemes.forEach(id => {
      const meme = v2.memes[id];
      console.log(`   + ${id}: ${meme.final_model.title}`);
    });
    console.log();
  }

  // Removed memes
  const removedMemes = [...v1Ids].filter(id => !v2Ids.has(id));
  if (removedMemes.length > 0) {
    console.log(`🗑️  Removed Memes (${removedMemes.length}):`);
    removedMemes.forEach(id => {
      const meme = v1.memes[id];
      console.log(`   - ${id}: ${meme.final_model.title}`);
    });
    console.log();
  }

  // Modified memes
  const commonIds = [...v1Ids].filter(id => v2Ids.has(id));
  const modified = [];

  commonIds.forEach(id => {
    const changes = findChanges(v1.memes[id], v2.memes[id]);
    if (changes.length > 0) {
      modified.push({ id, changes });
    }
  });

  if (modified.length > 0) {
    console.log(`🔄 Modified Memes (${modified.length}):\n`);
    modified.forEach(({ id, changes }) => {
      const meme = v2.memes[id];
      console.log(`   ${id}: ${meme.final_model.title}`);
      changes.forEach(change => {
        console.log(`      • ${change}`);
      });
      console.log();
    });
  }

  // Unchanged memes
  const unchanged = commonIds.length - modified.length;
  if (unchanged > 0) {
    console.log(`✓ Unchanged: ${unchanged} memes`);
  }
}

function findChanges(old, updated) {
  const changes = [];

  // Check title
  if (old.final_model.title !== updated.final_model.title) {
    changes.push(`Title: "${old.final_model.title}" → "${updated.final_model.title}"`);
  }

  // Check mode
  if (old.final_model.mode !== updated.final_model.mode) {
    changes.push(`Mode: ${old.final_model.mode} → ${updated.final_model.mode}`);
  }

  // Check hook/claim
  if (old.final_model.meaning.claim_short !== updated.final_model.meaning.claim_short) {
    changes.push(`Hook: "${old.final_model.meaning.claim_short}" → "${updated.final_model.meaning.claim_short}"`);
  }

  // Check metrics
  if (old._metadata && updated._metadata) {
    const oldMetrics = old._metadata.metrics;
    const newMetrics = updated._metadata.metrics;

    ['recognizability', 'fidelity', 'diversity', 'affect', 'risk'].forEach(metric => {
      if (oldMetrics[metric] !== newMetrics[metric]) {
        changes.push(`Metric ${metric}: ${oldMetrics[metric]} → ${newMetrics[metric]}`);
      }
    });

    if (oldMetrics.popularity !== newMetrics.popularity) {
      changes.push(`Popularity: ${oldMetrics.popularity} → ${newMetrics.popularity} hits`);
    }
  }

  // Check form/layout changes
  if (JSON.stringify(old.final_model.form.palette) !== JSON.stringify(updated.final_model.form.palette)) {
    changes.push(`Palette updated`);
  }

  // Check export format
  if (old.representation.export.format !== updated.representation.export.format) {
    changes.push(`Export format: ${old.representation.export.format} → ${updated.representation.export.format}`);
  }

  return changes;
}

function showSummary(v1, v2) {
  console.log('\n' + '='.repeat(60));
  console.log('📈 SUMMARY');
  console.log('='.repeat(60));

  const v1Ids = new Set(Object.keys(v1.memes));
  const v2Ids = new Set(Object.keys(v2.memes));

  const added = [...v2Ids].filter(id => !v1Ids.has(id)).length;
  const removed = [...v1Ids].filter(id => !v2Ids.has(id)).length;
  const commonIds = [...v1Ids].filter(id => v2Ids.has(id));
  const modified = commonIds.filter(id => {
    return findChanges(v1.memes[id], v2.memes[id]).length > 0;
  }).length;
  const unchanged = commonIds.length - modified;

  console.log(`Total in v${v1.manifest.version}: ${v1Ids.size} memes`);
  console.log(`Total in v${v2.manifest.version}: ${v2Ids.size} memes`);
  console.log();
  console.log(`Added:     ${added}`);
  console.log(`Removed:   ${removed}`);
  console.log(`Modified:  ${modified}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log('='.repeat(60));
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node diff-releases.js <version1> <version2>');
    console.error('Example: node diff-releases.js 1.0.0 1.1.0');
    process.exit(1);
  }

  const [version1, version2] = args;

  try {
    console.log(`\n🔍 Comparing releases v${version1} ↔ v${version2}\n`);

    const v1 = loadRelease(version1);
    const v2 = loadRelease(version2);

    compareManifests(v1, v2);
    compareMemes(v1, v2);
    showSummary(v1, v2);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadRelease, findChanges, compareMemes };
