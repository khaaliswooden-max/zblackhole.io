/**
 * generate-audio.mjs
 *
 * Generates MP3 narrations for all whitepapers using the ElevenLabs TTS API.
 * Output files are saved to public/audio/whitepapers/ and should be committed.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk-... node scripts/generate-audio.mjs
 *
 * Optional env vars:
 *   ELEVENLABS_VOICE_ID  — ElevenLabs voice ID (default: Adam, a clear neutral voice)
 *   ELEVENLABS_MODEL_ID  — Model to use (default: eleven_turbo_v2_5)
 *   OVERWRITE            — Set to "1" to regenerate files that already exist
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'audio', 'whitepapers');

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'pNInz6obpgDQGcFmaJgB'; // Adam
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_turbo_v2_5';
const OVERWRITE = process.env.OVERWRITE === '1';

if (!API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is required.');
  console.error('Usage: ELEVENLABS_API_KEY=sk-... node scripts/generate-audio.mjs');
  process.exit(1);
}

// Paper narration texts — mirrors src/lib/papers.ts
const papers = [
  {
    audioBase: 'zuup-master',
    narration:
      'Zuup Master Whitepaper. Defines the nine-platform layout, Solana program boundaries, and the energy–computation–knowledge loop that ties network fees to product delivery.',
  },
  {
    audioBase: 'zuup-chain',
    narration:
      'Zuup Blockchain Ecosystem. Documents the foundation, trust, and governance layers on Solana devnet: transaction flow, attestation coverage, and deployment cost figures measured on devnet.',
  },
  {
    audioBase: 'aureon',
    narration:
      'Aureon. Specifies sourcing workflows, solicitation parsing, and compliance gates used before obligation of funds on procurement actions.',
  },
  {
    audioBase: 'veyra',
    narration:
      'Veyra. Describes inference scheduling, logging, and rollback policies when ground control latency is measured in minutes instead of milliseconds.',
  },
  {
    audioBase: 'podx',
    narration:
      'PodX. Covers containerized compute, power, environmental limits, and benchmark scores for mobile data center operation in DDIL settings.',
  },
  {
    audioBase: 'relian',
    narration:
      'Relian. Maps migration stages from legacy languages to targets, with symbolic tests and on-chain hashes for each promoted build.',
  },
  {
    audioBase: 'symbion',
    narration:
      'Symbion. Defines capsule electronics, firmware update path, biomarker list, and clinical sensitivity targets referenced in trials.',
  },
  {
    audioBase: 'qal',
    narration:
      'QAL — Quantum Archeology Labs OS. States the layered causal model, query grammar, and uncertainty reporting used when reconstructing past states from sparse data.',
  },
  {
    audioBase: 'orb',
    narration:
      'Orb. Spatial world-model stack using 3D Gaussian splatting for persisted environments, with compute budgets sized for edge deployment and integration points to the nine-program catalog.',
  },
];

async function synthesize(text) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ElevenLabs API error ${response.status}: ${body}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Voice ID : ${VOICE_ID}`);
  console.log(`Model    : ${MODEL_ID}`);
  console.log(`Output   : ${OUT_DIR}`);
  console.log(`Overwrite: ${OVERWRITE ? 'yes' : 'no (skip existing)'}`);
  console.log('');

  let generated = 0;
  let skipped = 0;

  for (const paper of papers) {
    const outPath = join(OUT_DIR, `${paper.audioBase}.mp3`);

    if (!OVERWRITE && existsSync(outPath)) {
      console.log(`  skip  ${paper.audioBase}.mp3 (already exists)`);
      skipped++;
      continue;
    }

    process.stdout.write(`  gen   ${paper.audioBase}.mp3 ... `);
    try {
      const audio = await synthesize(paper.narration);
      writeFileSync(outPath, audio);
      console.log(`done (${Math.round(audio.length / 1024)} KB)`);
      generated++;
    } catch (err) {
      console.log(`FAILED`);
      console.error(`        ${err.message}`);
    }
  }

  console.log('');
  console.log(`Done. Generated: ${generated}, Skipped: ${skipped}`);

  if (generated > 0) {
    console.log('');
    console.log('Next steps:');
    console.log('  git add public/audio/whitepapers/');
    console.log('  git commit -m "Add AI voice narrations for whitepapers"');
  }
}

main();
