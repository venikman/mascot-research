#!/usr/bin/env node
/**
 * Meme Method Release Generator
 *
 * Generates versioned releases of the Meme Mining, Modeling, and Representation methodology
 * with example templates conforming to the cass meme.schema.json format.
 *
 * Usage: node scripts/generate-release.js [version]
 */

const fs = require('fs');
const path = require('path');

// Read VERSION file if no version argument provided
function getVersion() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args[0];
  }

  const versionPath = path.join(__dirname, '..', 'VERSION');
  return fs.readFileSync(versionPath, 'utf8').trim();
}

// Generate example meme templates conforming to cass schema
function generateExampleMemes(version) {
  const now = new Date().toISOString().split('T')[0];

  const examples = [
    {
      id: 'example_reflect',
      name: 'Reflective Learning Pattern',
      format: 'REFLECT',
      hook: 'Transform pressure into curiosity',
      description: 'A pattern for cultivating intrinsic motivation through reflection on personal growth',
      mode: 'M-3',
      platform: 'Instagram',
      aspect: '4:5'
    },
    {
      id: 'example_steps',
      name: 'Incremental Progress Pattern',
      format: 'STEPS',
      hook: 'One small step daily',
      description: 'A pattern for building consistency through small, regular actions',
      mode: 'M-2',
      platform: 'Instagram',
      aspect: '4:5'
    },
    {
      id: 'example_debug',
      name: 'Error Correction Pattern',
      format: 'Z-DEBUG',
      hook: 'Test ideas, not vibes',
      description: 'A pattern for systematic error identification and correction',
      mode: 'M-2',
      platform: 'Instagram',
      aspect: '4:5'
    }
  ];

  return examples.map(ex => ({
    final_model: {
      title: ex.name,
      mode: ex.mode,
      edition: now,
      bc: {
        platform: ex.platform,
        culture: 'systems-thinking-community',
        language: 'en',
        source_url: 'https://github.com/venikman/mascot-research'
      },
      form: {
        aspect: ex.aspect,
        dimension_px: [1080, 1350],
        padding_px: 64,
        style: 'flat-minimal',
        palette: {
          ink: '#111111',
          paper: '#FFFFFF',
          accentA: '#FF6A00',
          accentB: '#3178C6',
          calm: '#10B981',
          warn: '#D61F1F'
        },
        geometry: {
          headline: { x: 64, y: 80, w: 952, h: 140 },
          left: { x: 64, y: 240, w: 456, h: 650 },
          right: { x: 564, y: 240, w: 452, h: 650 },
          footer: { x: 64, y: 1130, w: 952, h: 140 }
        },
        slots: {
          A: { role: 'before_state', mandatory: true },
          B: { role: 'after_state', mandatory: true }
        }
      },
      stance: 'Earnest and supportive; growth-oriented',
      meaning: {
        claim_short: ex.hook,
        reasons: [
          'Supports sustainable learning habits',
          'Reduces cognitive load through systematic approach',
          'Builds long-term capability through regular practice'
        ],
        falsifier: 'If practice does not lead to observable improvement over consistent time period',
        roles: {
          A: 'Learner seeking growth',
          B: 'Educational context/system'
        }
      },
      policy: {
        copying_rules: 'Must preserve core behavior pattern and educational value',
        rationality: 'Evidence-based learning principles',
        identity: {
          must_stay: ['core_behavior_pattern', 'educational_stance', 'growth_orientation'],
          may_change: ['visual_style', 'language', 'platform_specifics']
        },
        invariants: [
          'Behavior pattern must remain clear and recognizable',
          'Educational value must be preserved',
          'Growth mindset must be maintained'
        ],
        allowed_mutations: [
          'Translate to different languages',
          'Adapt visual format to platform constraints',
          'Adjust examples to cultural context'
        ],
        bridge: {
          en_ru: 'Preserve systems-thinking terminology and learning concepts',
          cultures: 'Maintain universal learning principles while adapting examples'
        }
      }
    },
    representation: {
      meta: {
        meme_id: ex.id,
        media_type: 'image',
        platform: ex.platform,
        export_date: now
      },
      layout: {
        type: 'image',
        geometry: {
          headline: { x: 64, y: 80, w: 952, h: 140 },
          body: { x: 64, y: 1130, w: 952, h: 140 },
          panels: 3
        }
      },
      content: {
        headline: ex.hook,
        slot_A: 'Visual representation of current state',
        slot_B: 'Visual representation of desired state',
        slot_C: null,
        narration: null
      },
      invariants: {
        colors: {
          ink: '#111111',
          paper: '#FFFFFF',
          accentA: '#FF6A00',
          accentB: '#3178C6'
        },
        contrast_threshold: 4.5,
        stance_parity: true,
        glyphs: ['Mascot character', 'Progress indicators', 'Learning symbols']
      },
      accessibility: {
        alt: `${ex.name}: ${ex.hook}. ${ex.description}`,
        caption: ex.description,
        lang: 'en'
      },
      lint: {
        complete: true,
        contrast_ok: true,
        text_safe: true,
        no_anim_episteme: true,
        slots_filled: true,
        id_preserved: true
      },
      export: {
        format: 'PNG',
        resolution_px: [1080, 1350]
      }
    },
    _metadata: {
      version: version,
      method_version: '1.0.0',
      generator: 'mascot-research/scripts/generate-release.js',
      template: ex.format,
      example: true
    }
  }));
}

// Copy methodology documentation to release
function copyMethodologyDocs(releaseDir) {
  const docs = [
    'Meme.Mining.md',
    'Meme.Modeling.md',
    'Meme.Meaning.md',
    'Meme.Representation.md',
    'Instuction.md'
  ];

  const docsDir = path.join(releaseDir, 'methodology');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  docs.forEach(doc => {
    const srcPath = path.join(__dirname, '..', doc);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(docsDir, doc);
      fs.copyFileSync(srcPath, destPath);
    }
  });

  return docs.filter(doc => fs.existsSync(path.join(__dirname, '..', doc)));
}

// Main execution
function main() {
  const version = getVersion();
  console.log(`Generating release for version ${version}...`);

  // Create releases directory
  const releasesDir = path.join(__dirname, '..', 'releases', `v${version}`);
  if (!fs.existsSync(releasesDir)) {
    fs.mkdirSync(releasesDir, { recursive: true });
  }

  // Generate example meme templates
  const examples = generateExampleMemes(version);
  const examplesDir = path.join(releasesDir, 'examples');
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  examples.forEach(example => {
    const filename = `${example._metadata.template.toLowerCase()}_${example.final_model.title.replace(/\s+/g, '_').toLowerCase()}.json`;
    const filepath = path.join(examplesDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(example, null, 2));
    console.log(`  ✓ Generated example: ${filename}`);
  });

  // Copy methodology documentation
  const copiedDocs = copyMethodologyDocs(releasesDir);
  console.log(`  ✓ Copied ${copiedDocs.length} methodology documents`);

  // Generate release manifest
  const manifest = {
    version: version,
    release_date: new Date().toISOString().split('T')[0],
    method_version: '1.0.0',
    description: 'Meme Mining, Modeling, and Representation Methodology',
    compatible_with: 'cass/meme.schema.json',
    contents: {
      methodology_docs: copiedDocs,
      example_templates: examples.length,
      example_files: fs.readdirSync(examplesDir).filter(f => f.endsWith('.json'))
    },
    usage: 'Use methodology docs to create memes, then generate JSON following example templates',
    repository: 'https://github.com/venikman/mascot-research'
  };

  fs.writeFileSync(
    path.join(releasesDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Create README for the release
  const releaseReadme = `# Meme Method Release v${version}

Released: ${manifest.release_date}

## Contents

### Methodology Documentation

${copiedDocs.map(doc => `- \`methodology/${doc}\``).join('\n')}

### Example Templates

${examples.length} example templates in \`examples/\` directory demonstrating the cass meme.schema.json format.

## Usage

1. **Study the methodology**: Read the documentation in \`methodology/\` to understand the three-stage process:
   - **Mining**: Extract behavioral patterns from text (Meme.Mining.md)
   - **Modeling**: Define invariants and mutations (Meme.Modeling.md)
   - **Representation**: Generate visual/audio outputs (Meme.Representation.md)

2. **Use example templates**: The \`examples/\` directory contains JSON files that conform to the cass meme.schema.json format. Use these as starting points for your own memes.

3. **Create your memes**: Follow the methodology to extract memes from your source material, then generate JSON files following the template structure.

## Schema Compatibility

All example templates conform to [cass/meme.schema.json](https://github.com/venikman/cass/blob/main/memes/schema/meme.schema.json) with:

- **final_model**: Conceptual definition (title, mode, bc, form, stance, meaning, policy)
- **representation**: Concrete instantiation (meta, layout, content, invariants, accessibility, lint, export)
- **_metadata**: Version tracking and generation info

## Integration with Cass

Copy example JSON files to the cass repository structure:

\`\`\`
cass/memes/
├── YourMemeName/
│   └── data.json  (copy from examples/*.json)
\`\`\`

## Method Version

This release uses **Method v${manifest.method_version}** with the three-stage pipeline:
Mining → Modeling → Representation
`;

  fs.writeFileSync(path.join(releasesDir, 'README.md'), releaseReadme);

  console.log(`\n✅ Release v${version} generated successfully!`);
  console.log(`   Location: ${releasesDir}`);
  console.log(`   Methodology docs: ${copiedDocs.length}`);
  console.log(`   Example templates: ${examples.length}`);
  console.log(`   Files: manifest.json, README.md`);
}

if (require.main === module) {
  main();
}

module.exports = { generateExampleMemes };
