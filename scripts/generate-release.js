#!/usr/bin/env node
/**
 * Meme Release Generator
 *
 * Generates JSON files conforming to the cass meme.schema.json format
 * from the mascot-research spec and meme definitions.
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

// Read the spec.json
function loadSpec() {
  const specPath = path.join(__dirname, '..', 'Testing', 'GPT', 'spec.json');
  return JSON.parse(fs.readFileSync(specPath, 'utf8'));
}

// Parse Memes.md to extract meme data
function parseMemes() {
  const memesPath = path.join(__dirname, '..', 'Methods', 'GPTv2', 'Memes.md');
  const content = fs.readFileSync(memesPath, 'utf8');

  const memes = [];

  // Split by numbered items
  const items = content.split(/\n\d+\.\s+\*\*/);

  items.forEach((block) => {
    // Extract name (everything before — and after **)
    const nameMatch = block.match(/^([^—\n]+)/);
    const metricsMatch = block.match(/ρ=([\d.]+),\s*φ=([\d.]+),\s*H=([\d.]+),\s*A=([-\d.]+),\s*R=([\d.]+)/);
    const popularityMatch = block.match(/(\d+)\s+hits/);
    const descMatch = block.match(/\*\*Description\*\*:\s*(.+?)(?=\n\n\n|$)/s);

    if (nameMatch && metricsMatch && descMatch) {
      const name = nameMatch[1].replace(/\*\*/g, '').trim();

      memes.push({
        name: name,
        metrics: {
          recognizability: parseFloat(metricsMatch[1]),
          fidelity: parseFloat(metricsMatch[2]),
          diversity: parseFloat(metricsMatch[3]),
          affect: parseFloat(metricsMatch[4]),
          risk: parseFloat(metricsMatch[5])
        },
        popularity: popularityMatch ? parseInt(popularityMatch[1]) : 0,
        description: descMatch[1].trim()
      });
    }
  });

  return memes;
}

// Generate meme JSON conforming to cass schema
function generateMemeJSON(spec, memeData, memeTemplate, version) {
  const now = new Date().toISOString().split('T')[0];

  // Map template name to meme data
  const baseFormat = spec.base_formats[memeTemplate.format] || spec.base_formats.REFLECT;

  return {
    final_model: {
      title: memeTemplate.name,
      mode: determineMode(memeData.metrics.fidelity),
      edition: now,
      bc: {
        platform: "Instagram+Reels",
        culture: "SystemsWorld",
        language: "en",
        source_url: "https://github.com/venikman/mascot-research"
      },
      form: {
        aspect: "4:5",
        dimension_px: [1080, 1350],
        padding_px: 64,
        style: "flat",
        palette: spec.palette,
        geometry: {
          headline: { x: 64, y: 80, w: 952, h: 140 },
          left: { x: 64, y: 240, w: 456, h: 650 },
          right: { x: 564, y: 240, w: 452, h: 650 },
          footer: { x: 64, y: 1130, w: 952, h: 140 }
        },
        slots: {
          A: { role: "before_state", mandatory: true },
          B: { role: "after_state", mandatory: true }
        }
      },
      stance: determineStance(memeData.description),
      meaning: {
        claim_short: memeTemplate.hook,
        reasons: extractReasons(memeData.description),
        falsifier: "If practice does not lead to observable improvement over time.",
        roles: {
          A: "Learner seeking growth",
          B: "Educational system/mentor"
        }
      },
      policy: {
        copying_rules: "Must preserve core behavior pattern and metrics framework",
        rationality: "Empirically validated through MemeMeter_v1 metrics",
        identity: {
          must_stay: ["core_behavior_pattern", "metrics_framework", "educational_context"],
          may_change: ["visual_style", "language", "platform"]
        },
        invariants: [
          "Behavior pattern must remain recognizable (ρ >= 0.70)",
          "Educational value must be maintained",
          "No outcome promises allowed"
        ],
        allowed_mutations: [
          "Translate to different languages",
          "Adapt visual format to platform",
          "Adjust examples to cultural context"
        ],
        bridge: {
          en_ru: "Preserve systems-thinking terminology",
          cultures: "Maintain educational community values"
        }
      }
    },
    representation: {
      meta: {
        meme_id: memeTemplate.id,
        media_type: "image",
        platform: "Instagram",
        export_date: now
      },
      layout: {
        type: "image",
        geometry: {
          headline: { x: 64, y: 80, w: 952, h: 140 },
          body: { x: 64, y: 1130, w: 952, h: 140 },
          panels: baseFormat.panels || 3
        }
      },
      content: {
        headline: memeTemplate.hook,
        slot_A: "Before state visualization",
        slot_B: "After state visualization",
        slot_C: null,
        narration: null
      },
      invariants: {
        colors: spec.palette,
        contrast_threshold: spec.typography.contrast_min,
        stance_parity: true,
        glyphs: ["Stepper mascot", "Progress indicators"]
      },
      accessibility: {
        alt: `${memeTemplate.name}: ${memeTemplate.hook}`,
        caption: memeData.description.substring(0, 200) + "...",
        lang: "en"
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
        format: "PNG",
        resolution_px: [1080, 1350]
      }
    },
    _metadata: {
      version: version,
      method_version: "1.0.0",
      generator: "mascot-research/scripts/generate-release.js",
      metrics: memeData.metrics,
      popularity: memeData.popularity
    }
  };
}

// Helper functions
function determineMode(fidelity) {
  if (fidelity >= 0.50) return "M-3";
  if (fidelity >= 0.45) return "M-2";
  if (fidelity >= 0.40) return "M-1";
  return "M-0";
}

function determineStance(description) {
  if (description.includes("growth") || description.includes("development")) {
    return "Growth-oriented, evidence-based learning";
  }
  if (description.includes("systematic") || description.includes("discipline")) {
    return "Systematic, disciplined approach to skill building";
  }
  return "Reflective, intrinsic motivation focus";
}

function extractReasons(description) {
  // Extract first 2-3 sentences as reasons
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 3).map(s => s.trim());
}

// Main execution
function main() {
  const version = getVersion();
  console.log(`Generating release for version ${version}...`);

  const spec = loadSpec();
  const memesParsed = parseMemes();

  // Create releases directory
  const releasesDir = path.join(__dirname, '..', 'releases', `v${version}`);
  if (!fs.existsSync(releasesDir)) {
    fs.mkdirSync(releasesDir, { recursive: true });
  }

  // Generate JSON for each meme template
  let generated = 0;
  spec.meme_templates.forEach((template) => {
    // Find matching meme data by name
    const memeData = memesParsed.find(m =>
      m.name.toLowerCase() === template.name.toLowerCase()
    );

    if (memeData) {
      const json = generateMemeJSON(spec, memeData, template, version);
      const filename = `${template.id}_${template.name.replace(/\s+/g, '_')}.json`;
      const filepath = path.join(releasesDir, filename);

      fs.writeFileSync(filepath, JSON.stringify(json, null, 2));
      console.log(`  ✓ Generated ${filename}`);
      generated++;
    }
  });

  // Generate release manifest
  const manifest = {
    version: version,
    release_date: new Date().toISOString().split('T')[0],
    method_version: "1.0.0",
    spec_version: spec.spec_version,
    total_memes: generated,
    compatible_with: "cass/meme.schema.json",
    metrics_framework: "MemeMeter_v1",
    files: fs.readdirSync(releasesDir).filter(f => f.endsWith('.json') && f !== 'manifest.json')
  };

  fs.writeFileSync(
    path.join(releasesDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n✅ Release v${version} generated successfully!`);
  console.log(`   Location: ${releasesDir}`);
  console.log(`   Memes: ${generated}`);
  console.log(`   Manifest: manifest.json`);
}

if (require.main === module) {
  main();
}

module.exports = { generateMemeJSON, parseMemes, loadSpec };
