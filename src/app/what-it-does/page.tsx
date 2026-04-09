export const metadata = {
  title: 'What It Does — Zuup Innovation Lab',
  description:
    'Zuup maps the causal structure of institutions. Each platform targets a specific failure mode in how institutions acquire, govern, verify, and deploy intelligence.',
};

const CAPABILITIES = [
  {
    id: 'AU-02',
    name: 'Procurement Intelligence',
    platform: 'Aureon',
    body: 'Automates the full FAR-compliant acquisition pipeline — from solicitation ingestion through supplier evaluation to award documentation — with mandatory compliance gates before any fund obligation.',
  },
  {
    id: 'ZHQ-01',
    name: 'Trust Infrastructure',
    platform: 'Zuup HQ',
    body: 'Provides role-based access control and SHA-256 content-addressed attestation for all nine programs. Every decision, artifact, and delegation is verifiable on-chain.',
  },
  {
    id: 'CV-04',
    name: 'Compliance Gating',
    platform: 'Civium',
    body: 'Maps halal supply chain policy graphs from farm through processing. Lot-level lineage and facility audit records are enforced against halal authority rules in real time.',
  },
  {
    id: 'PX-06',
    name: 'Edge Compute',
    platform: 'PodX',
    body: 'Delivers full data center capability in a 20-foot ISO container rated for disconnected, degraded, and contested environments. Sustains 99.99% uptime for periods exceeding 24 hours without external power.',
  },
  {
    id: 'RL-05',
    name: 'Legacy Modernization',
    platform: 'Relian',
    body: 'Migrates COBOL, Fortran, and legacy object-oriented codebases via LLM-assisted semantic translation with symbolic execution validation. 100× faster than manual migration at 99% lower cost.',
  },
  {
    id: 'SB-07',
    name: 'Biosensing',
    platform: 'Symbion',
    body: 'Monitors gut-brain axis biomarkers through ingestible capsule sensors. AES-encrypted payloads relay via Bluetooth to a clinical-grade cloud pipeline for longitudinal analysis.',
  },
  {
    id: 'QAL-08',
    name: 'State Reconstruction',
    platform: 'QAL',
    body: 'Infers the past states of complex systems from sparse observational records using a five-layer causal model. Queries return posterior distributions with explicit uncertainty bounds.',
  },
  {
    id: 'VY-03',
    name: 'Frontier Inference',
    platform: 'Veyra',
    body: 'Schedules and governs LLM inference under planetary latency constraints — from 3-minute Mars opposition to 22-minute conjunction delays — with cryptographic rollback and delayed governance review.',
  },
  {
    id: 'ZSD-09',
    name: 'Treasury Rails',
    platform: 'ZUSDC',
    body: 'Provides stablecoin mint-burn logic tied to reserve proofs and agent treasury routing on Solana devnet. Budget accounts enforce fund allocation per program governance rules.',
  },
];

export default function WhatItDoesPage() {
  return (
    <main className="page-shell">
      {/* Page label */}
      <p
        className="mb-4 font-mono text-[11px] uppercase tracking-widest"
        style={{ color: 'var(--fg-muted)' }}
      >
        Zuup Innovation Lab — Function
      </p>

      {/* Title */}
      <h1
        className="mb-6 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight"
        style={{ color: 'var(--fg)' }}
      >
        What It Does
      </h1>

      {/* Intro */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 font-sans text-[14px] leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
          Zuup maps the causal structure of institutions. Each program in the catalog targets a
          specific failure mode in how institutions acquire, govern, verify, and deploy intelligence.
        </p>
        <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
          The programs are not independent products. They are composable layers. The output of each
          becomes an attested input to the others — building a shared, queryable record of
          institutional state.
        </p>
      </div>

      {/* Capability cards */}
      <section className="mb-14">
        <h2
          className="mb-6 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--fg-muted)' }}
        >
          Nine Operational Layers
        </h2>
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            border: '1px solid var(--line)',
          }}
        >
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="flex flex-col gap-3 p-6"
              style={{
                background: 'var(--bg)',
                borderRight: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {cap.id} · {cap.platform}
                </span>
              </div>
              <div
                className="font-mono text-[13px]"
                style={{ color: 'var(--fg)' }}
              >
                {cap.name}
              </div>
              <p
                className="font-sans text-[12px] leading-relaxed"
                style={{ color: 'var(--fg-dim)' }}
              >
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Loop section */}
      <section className="mb-12 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <h2
          className="mb-1 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--fg-muted)' }}
        >
          The Integration Loop
        </h2>
        <p
          className="mb-6 font-mono text-[clamp(14px,2vw,20px)]"
          style={{ color: 'var(--fg-dim)' }}
        >
          Energy → Computation → Knowledge → Energy
        </p>
        <p
          className="mb-3 max-w-2xl font-sans text-[14px] leading-relaxed"
          style={{ color: 'var(--fg-dim)' }}
        >
          All nine programs feed their attested outputs into a single causal graph — the Zuup World
          Model. The graph accumulates institutional state across procurement decisions, compliance
          events, migration attestations, biomarker records, and treasury transactions.
        </p>
        <p
          className="max-w-2xl font-sans text-[14px] leading-relaxed"
          style={{ color: 'var(--fg-dim)' }}
        >
          Each cycle of the loop converts raw operational energy into computation, computation into
          verified knowledge, and verified knowledge back into operational advantage. The world model
          is the record of that conversion — live, queryable, and on-chain.
        </p>
      </section>

      {/* CTA */}
      <div className="border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <div className="cta-row">
          <a
            href="/research"
            className="btn-outline"
          >
            The Research
          </a>
          <a
            href="https://zwn-liart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Open the ZWM →
          </a>
        </div>
      </div>
    </main>
  );
}
