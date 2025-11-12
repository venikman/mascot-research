#!/usr/bin/env node
/**
 * Release Diff Utility
 *
 * Shows differences between two release versions of the meme methodology.
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

  // Load methodology docs
  const methodologyDir = path.join(releaseDir, 'methodology');
  const methodologyDocs = {};
  if (fs.existsSync(methodologyDir)) {
    fs.readdirSync(methodologyDir).forEach(filename => {
      const filepath = path.join(methodologyDir, filename);
      methodologyDocs[filename] = fs.readFileSync(filepath, 'utf8');
    });
  }

  // Load example templates
  const examplesDir = path.join(releaseDir, 'examples');
  const examples = {};
  if (fs.existsSync(examplesDir)) {
    fs.readdirSync(examplesDir)
      .filter(f => f.endsWith('.json'))
      .forEach(filename => {
        const filepath = path.join(examplesDir, filename);
        examples[filename] = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      });
  }

  return { manifest, methodologyDocs, examples };
}

function compareManifests(v1, v2) {
  console.log('\n📋 MANIFEST COMPARISON\n');
  console.log(`Version:        ${v1.manifest.version} → ${v2.manifest.version}`);
  console.log(`Release Date:   ${v1.manifest.release_date} → ${v2.manifest.release_date}`);
  console.log(`Method Version: ${v1.manifest.method_version} → ${v2.manifest.method_version}`);

  const docs1 = v1.manifest.contents.methodology_docs.length;
  const docs2 = v2.manifest.contents.methodology_docs.length;
  console.log(`Methodology Docs: ${docs1} → ${docs2}`);

  const examples1 = v1.manifest.contents.example_templates;
  const examples2 = v2.manifest.contents.example_templates;
  console.log(`Example Templates: ${examples1} → ${examples2}`);

  const docsDiff = docs2 - docs1;
  if (docsDiff > 0) {
    console.log(`                  (+${docsDiff} new docs)`);
  } else if (docsDiff < 0) {
    console.log(`                  (${docsDiff} docs removed)`);
  }

  const examplesDiff = examples2 - examples1;
  if (examplesDiff > 0) {
    console.log(`                  (+${examplesDiff} new examples)`);
  } else if (examplesDiff < 0) {
    console.log(`                  (${examplesDiff} examples removed)`);
  }
}

function compareMethodologyDocs(v1, v2) {
  console.log('\n📚 METHODOLOGY DOCUMENTATION\n');

  const v1Docs = new Set(Object.keys(v1.methodologyDocs));
  const v2Docs = new Set(Object.keys(v2.methodologyDocs));

  // New docs
  const newDocs = [...v2Docs].filter(doc => !v1Docs.has(doc));
  if (newDocs.length > 0) {
    console.log(`✨ New Documents (${newDocs.length}):`);
    newDocs.forEach(doc => console.log(`   + ${doc}`));
    console.log();
  }

  // Removed docs
  const removedDocs = [...v1Docs].filter(doc => !v2Docs.has(doc));
  if (removedDocs.length > 0) {
    console.log(`🗑️  Removed Documents (${removedDocs.length}):`);
    removedDocs.forEach(doc => console.log(`   - ${doc}`));
    console.log();
  }

  // Modified docs
  const commonDocs = [...v1Docs].filter(doc => v2Docs.has(doc));
  const modifiedDocs = commonDocs.filter(doc => {
    return v1.methodologyDocs[doc] !== v2.methodologyDocs[doc];
  });

  if (modifiedDocs.length > 0) {
    console.log(`🔄 Modified Documents (${modifiedDocs.length}):\n`);
    modifiedDocs.forEach(doc => {
      const v1Lines = v1.methodologyDocs[doc].split('\n').length;
      const v2Lines = v2.methodologyDocs[doc].split('\n').length;
      const lineDiff = v2Lines - v1Lines;
      const diffStr = lineDiff > 0 ? `+${lineDiff}` : lineDiff;
      console.log(`   ${doc}`);
      console.log(`      • Lines: ${v1Lines} → ${v2Lines} (${diffStr})`);
    });
    console.log();
  }

  // Unchanged docs
  const unchanged = commonDocs.length - modifiedDocs.length;
  if (unchanged > 0) {
    console.log(`✓ Unchanged: ${unchanged} documents`);
  }
}

function compareExamples(v1, v2) {
  console.log('\n📊 EXAMPLE TEMPLATES\n');

  const v1Examples = new Set(Object.keys(v1.examples));
  const v2Examples = new Set(Object.keys(v2.examples));

  // New examples
  const newExamples = [...v2Examples].filter(ex => !v1Examples.has(ex));
  if (newExamples.length > 0) {
    console.log(`✨ New Examples (${newExamples.length}):`);
    newExamples.forEach(ex => {
      const example = v2.examples[ex];
      console.log(`   + ${ex}`);
      console.log(`      • ${example.final_model.title}`);
    });
    console.log();
  }

  // Removed examples
  const removedExamples = [...v1Examples].filter(ex => !v2Examples.has(ex));
  if (removedExamples.length > 0) {
    console.log(`🗑️  Removed Examples (${removedExamples.length}):`);
    removedExamples.forEach(ex => {
      const example = v1.examples[ex];
      console.log(`   - ${ex}`);
      console.log(`      • ${example.final_model.title}`);
    });
    console.log();
  }

  // Modified examples
  const commonExamples = [...v1Examples].filter(ex => v2Examples.has(ex));
  const modifiedExamples = commonExamples.filter(ex => {
    return JSON.stringify(v1.examples[ex]) !== JSON.stringify(v2.examples[ex]);
  });

  if (modifiedExamples.length > 0) {
    console.log(`🔄 Modified Examples (${modifiedExamples.length}):\n`);
    modifiedExamples.forEach(ex => {
      const v1Ex = v1.examples[ex];
      const v2Ex = v2.examples[ex];
      const changes = findExampleChanges(v1Ex, v2Ex);

      console.log(`   ${ex}`);
      changes.forEach(change => {
        console.log(`      • ${change}`);
      });
      console.log();
    });
  }

  // Unchanged examples
  const unchanged = commonExamples.length - modifiedExamples.length;
  if (unchanged > 0) {
    console.log(`✓ Unchanged: ${unchanged} examples`);
  }
}

function findExampleChanges(oldEx, newEx) {
  const changes = [];

  // Check title
  if (oldEx.final_model.title !== newEx.final_model.title) {
    changes.push(`Title: "${oldEx.final_model.title}" → "${newEx.final_model.title}"`);
  }

  // Check mode
  if (oldEx.final_model.mode !== newEx.final_model.mode) {
    changes.push(`Mode: ${oldEx.final_model.mode} → ${newEx.final_model.mode}`);
  }

  // Check hook
  if (oldEx.final_model.meaning.claim_short !== newEx.final_model.meaning.claim_short) {
    changes.push(`Hook: "${oldEx.final_model.meaning.claim_short}" → "${newEx.final_model.meaning.claim_short}"`);
  }

  // Check platform
  if (oldEx.final_model.bc.platform !== newEx.final_model.bc.platform) {
    changes.push(`Platform: ${oldEx.final_model.bc.platform} → ${newEx.final_model.bc.platform}`);
  }

  // Check palette
  if (JSON.stringify(oldEx.final_model.form.palette) !== JSON.stringify(newEx.final_model.form.palette)) {
    changes.push(`Palette updated`);
  }

  return changes;
}

function showSummary(v1, v2) {
  console.log('\n' + '='.repeat(60));
  console.log('📈 SUMMARY');
  console.log('='.repeat(60));

  const v1Docs = new Set(Object.keys(v1.methodologyDocs));
  const v2Docs = new Set(Object.keys(v2.methodologyDocs));
  const docsAdded = [...v2Docs].filter(doc => !v1Docs.has(doc)).length;
  const docsRemoved = [...v1Docs].filter(doc => !v2Docs.has(doc)).length;
  const commonDocs = [...v1Docs].filter(doc => v2Docs.has(doc));
  const docsModified = commonDocs.filter(doc => v1.methodologyDocs[doc] !== v2.methodologyDocs[doc]).length;
  const docsUnchanged = commonDocs.length - docsModified;

  const v1Examples = new Set(Object.keys(v1.examples));
  const v2Examples = new Set(Object.keys(v2.examples));
  const examplesAdded = [...v2Examples].filter(ex => !v1Examples.has(ex)).length;
  const examplesRemoved = [...v1Examples].filter(ex => !v2Examples.has(ex)).length;
  const commonExamples = [...v1Examples].filter(ex => v2Examples.has(ex));
  const examplesModified = commonExamples.filter(ex =>
    JSON.stringify(v1.examples[ex]) !== JSON.stringify(v2.examples[ex])
  ).length;
  const examplesUnchanged = commonExamples.length - examplesModified;

  console.log(`\nMethodology Documentation:`);
  console.log(`  Total in v${v1.manifest.version}: ${v1Docs.size} docs`);
  console.log(`  Total in v${v2.manifest.version}: ${v2Docs.size} docs`);
  console.log(`  Added:     ${docsAdded}`);
  console.log(`  Removed:   ${docsRemoved}`);
  console.log(`  Modified:  ${docsModified}`);
  console.log(`  Unchanged: ${docsUnchanged}`);

  console.log(`\nExample Templates:`);
  console.log(`  Total in v${v1.manifest.version}: ${v1Examples.size} examples`);
  console.log(`  Total in v${v2.manifest.version}: ${v2Examples.size} examples`);
  console.log(`  Added:     ${examplesAdded}`);
  console.log(`  Removed:   ${examplesRemoved}`);
  console.log(`  Modified:  ${examplesModified}`);
  console.log(`  Unchanged: ${examplesUnchanged}`);

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
    compareMethodologyDocs(v1, v2);
    compareExamples(v1, v2);
    showSummary(v1, v2);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadRelease, findExampleChanges, compareMethodologyDocs };
