'use client';

import AudioPlayer from '@/components/AudioPlayer';

type Paper = {
  key: string;
  paperId: string;
  date: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  pdf: string;
  audioBase: string;
};

const canonicalPapers: Paper[] = [
  {
    key: 'master',
    paperId: 'WP-MA-01',
    date: '2025-03',
    title: 'Zuup Master Whitepaper',
    summary:
      'Defines the nine-platform layout, Solana program boundaries, and the energy–computation–knowledge loop that ties network fees to product delivery.',
    metrics: [
      { value: '9', label: 'Programs' },
      { value: '65K', label: 'TPS' },
      { value: '400ms', label: 'Block time' },
    ],
    pdf: 'zuup-master-whitepaper.pdf',
    audioBase: 'zuup-master',
  },
  {
    key: 'ecosystem',
    paperId: 'WP-EC-02',
    date: '2025-02',
    title: 'Zuup Blockchain Ecosystem',
    summary:
      'Documents the foundation, trust, and governance layers on Solana devnet: transaction flow, attestation coverage, and deployment cost figures measured on devnet.',
    metrics: [
      { value: '3', label: 'Layers' },
      { value: '100%', label: 'Attestation coverage' },
      { value: '$0.02', label: 'Deploy cost' },
    ],
    pdf: 'zuup-ecosystem.pdf',
    audioBase: 'zuup-chain',
  },
  {
    key: 'aureon',
    paperId: 'WP-AU-03',
    date: '2025-01',
    title: 'Aureon',
    summary:
      'Specifies sourcing workflows, solicitation parsing, and compliance gates used before obligation of funds on procurement actions.',
    metrics: [
      { value: 'ACS', label: 'Bench target ≥85' },
      { value: 'FAR', label: 'Rule coverage' },
      { value: 'Multi', label: 'Region routing' },
    ],
    pdf: 'aureon.pdf',
    audioBase: 'aureon',
  },
  {
    key: 'veyra',
    paperId: 'WP-VY-04',
    date: '2024-12',
    title: 'Veyra',
    summary:
      'Describes inference scheduling, logging, and rollback policies when ground control latency is measured in minutes instead of milliseconds.',
    metrics: [
      { value: '5', label: 'Stack layers' },
      { value: '7', label: 'Bench families' },
      { value: '3–22m', label: 'Latency window' },
    ],
    pdf: 'veyra.pdf',
    audioBase: 'veyra',
  },
  {
    key: 'podx',
    paperId: 'WP-PX-05',
    date: '2024-11',
    title: 'PodX',
    summary:
      'Covers containerized compute, power, environmental limits, and benchmark scores for mobile data center operation in DDIL settings.',
    metrics: [
      { value: '100', label: 'WCBI' },
      { value: '99.99%', label: 'Uptime target' },
      { value: '24h+', label: 'DDIL runtime' },
    ],
    pdf: 'podx.pdf',
    audioBase: 'podx',
  },
  {
    key: 'relian',
    paperId: 'WP-RL-06',
    date: '2024-10',
    title: 'Relian',
    summary:
      'Maps migration stages from legacy languages to targets, with symbolic tests and on-chain hashes for each promoted build.',
    metrics: [
      { value: '100x', label: 'Speed vs manual' },
      { value: '99%', label: 'Cost reduction' },
      { value: '85%', label: 'Risk model' },
    ],
    pdf: 'relian.pdf',
    audioBase: 'relian',
  },
  {
    key: 'symbion',
    paperId: 'WP-SB-07',
    date: '2024-09',
    title: 'Symbion',
    summary:
      'Defines capsule electronics, firmware update path, biomarker list, and clinical sensitivity targets referenced in trials.',
    metrics: [
      { value: '92.5%', label: 'Sensitivity' },
      { value: '94.3%', label: 'Specificity' },
      { value: '4', label: 'Markers' },
    ],
    pdf: 'symbion.pdf',
    audioBase: 'symbion',
  },
  {
    key: 'qal',
    paperId: 'WP-QAL-08',
    date: '2024-08',
    title: 'QAL — Quantum Archeology Labs OS',
    summary:
      'States the layered causal model, query grammar, and uncertainty reporting used when reconstructing past states from sparse data.',
    metrics: [
      { value: '5', label: 'Causal layers' },
      { value: 'QL', label: 'Query surface' },
      { value: 'Layer', label: 'Fidelity scope' },
    ],
    pdf: 'qal.pdf',
    audioBase: 'qal',
  },
];

function Card({ paper }: { paper: Paper }) {
  return (
    <article className="flex flex-col border p-6" style={{ borderColor: 'var(--line)' }}>
      <div className="mb-3 font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
        {paper.paperId} · {paper.date}
      </div>
      <h2 className="mono-14 mb-3">{paper.title}</h2>
      <p className="body-small mb-6">{paper.summary}</p>
      <div className="mb-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
        {paper.metrics.map((m) => (
          <div key={m.label}>
            <div className="tabular-nums" style={{ color: 'var(--fg)' }}>
              {m.value}
            </div>
            <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
        <a
          href={`/whitepapers/${paper.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-[11px]"
        >
          Download PDF
        </a>
        <AudioPlayer src={`/audio/whitepapers/${paper.audioBase}.mp3`} label="Play" />
      </div>
    </article>
  );
}

export default function WhitepapersPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Whitepapers
      </h1>
      <p className="body-small mb-10 max-w-2xl">
        PDF and audio pairs for each platform paper. PDFs are static assets under /whitepapers/.
      </p>
      <div
        className="mb-16 grid gap-6 max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        {canonicalPapers.map((p) => (
          <Card key={p.key} paper={p} />
        ))}
      </div>
      <section className="border-t pt-12" style={{ borderColor: 'var(--line)' }}>
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Extended Research
        </h2>
        <p className="body-small mb-6 max-w-3xl">
          Orb is a spatial intelligence research project developed within the Zuup Lab. It integrates with
          Aureon, Veyra, Civium, PodX, QAL, Symbion, and Relian as a post-ASI layer.
        </p>
        <article className="flex flex-col border p-6" style={{ borderColor: 'var(--line)' }}>
          <div className="mb-3 font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
            WP-ORB-XR · 2024-07
          </div>
          <h2 className="mono-14 mb-3">Orb™</h2>
          <p className="body-small mb-6">
            Spatial world-model stack using 3D Gaussian splatting for persisted environments, with compute
            budgets sized for edge deployment and integration points to the nine-program catalog above.
          </p>
          <div className="mb-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <div>
              <div style={{ color: 'var(--fg)' }}>3DGS</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Representation
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--fg)' }}>Edge</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Target tier
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--fg)' }}>LM</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Coupling
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
            <a
              href="/whitepapers/orb.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-[11px]"
            >
              Download PDF
            </a>
            <AudioPlayer src="/audio/whitepapers/orb.mp3" label="Play" />
          </div>
        </article>
      </section>
      <p className="body-small mt-12 max-w-3xl border-t pt-8" style={{ borderColor: 'var(--line)' }}>
        Audio narrations are recorded by Khaalis Wooden (Founder). Each recording is a single-take reading of
        the executive summary. No synthesis. No TTS. Files hosted at /audio/whitepapers/.
      </p>
    </main>
  );
}
