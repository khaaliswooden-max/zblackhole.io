import { PLATFORMS, statusClass, statusLabel } from '@/lib/platforms';

export const metadata = {
  title: 'What It Is — Zuup Innovation Lab',
  description:
    'Zuup is a structured world model for institutional intelligence. Nine programs on Solana form the causal operating layers that underpin how institutions acquire, govern, verify, and deploy.',
};

const STATS = [
  { label: 'Programs', value: '9' },
  { label: 'Network', value: 'Solana Devnet' },
  { label: 'Throughput', value: '65,000 TPS' },
  { label: 'Block Time', value: '400 ms median' },
  { label: 'Attestation Cost', value: '$0.000025 / hash' },
];

export default function WhatItIsPage() {
  return (
    <main className="page-shell">
      {/* Page label */}
      <p
        className="mb-4 font-mono text-[11px] uppercase tracking-widest"
        style={{ color: 'var(--fg-muted)' }}
      >
        Zuup Innovation Lab — Identity
      </p>

      {/* Title */}
      <h1
        className="mb-6 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight"
        style={{ color: 'var(--fg)' }}
      >
        What It Is
      </h1>

      {/* Intro */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 font-sans text-[14px] leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
          Zuup is not a product suite. It is a substrate — a structured world model for institutional
          intelligence. Nine programs form the causal operating layers that underpin how institutions
          acquire, govern, verify, and deploy intelligence at scale.
        </p>
        <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
          Each program attests to its outputs on-chain, creating a shared provenance chain. The
          result is a live causal graph of institutional relationships — the Zuup World Model — that
          can be queried, audited, and extended by any authorized participant.
        </p>
      </div>

      {/* Stats row */}
      <div
        className="mb-12 grid border"
        style={{
          borderColor: 'var(--line)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 p-5"
            style={{
              borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: 'var(--fg-muted)' }}
            >
              {stat.label}
            </span>
            <span
              className="font-mono text-[13px] tabular-nums"
              style={{ color: 'var(--fg)' }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Nine Programs section */}
      <section className="mb-12">
        <h2
          className="mb-1 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--fg-muted)' }}
        >
          The Nine Programs
        </h2>
        <p className="mb-6 font-sans text-[13px]" style={{ color: 'var(--fg-dim)' }}>
          Each program targets a distinct failure mode in institutional operations.
        </p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Domain</th>
                <th>ω Target</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((p) => (
                <tr key={p.id}>
                  <td className="tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                    {p.id}
                  </td>
                  <td style={{ color: 'var(--fg)' }}>{p.name}</td>
                  <td>{p.domain}</td>
                  <td className="tabular-nums">{p.omega}</td>
                  <td>
                    <span className={statusClass(p.status)}>
                      {statusLabel(p.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Substrate section */}
      <section className="mb-12 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <h2
          className="mb-1 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--fg-muted)' }}
        >
          The Substrate
        </h2>
        <p className="mb-6 font-sans text-[13px]" style={{ color: 'var(--fg-dim)' }}>
          The trust layer that connects all nine programs.
        </p>
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {[
            {
              label: 'Role-Based Access Control',
              body: 'RBAC accounts govern every inter-program action. Delegation completes within a single transaction. No key management surfaces to product teams.',
            },
            {
              label: 'Content-Addressed Attestation',
              body: 'SHA-256 hashes of model artifacts, decisions, and migration batches are anchored on-chain. Every output is traceable to its originating program and timestamp.',
            },
            {
              label: 'Inter-Program Invocation',
              body: 'A shared IPI bus allows programs to call each other with verified identity. Cross-program trust propagates without centralized coordination.',
            },
            {
              label: 'Per-Platform Governance',
              body: 'Each program carries its own governance account with configurable quorum thresholds. Governance is delegated, not surrendered.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border p-5"
              style={{ borderColor: 'var(--line)' }}
            >
              <div
                className="mb-2 font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--fg-muted)' }}
              >
                {item.label}
              </div>
              <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <p
          className="mb-4 font-mono text-[12px]"
          style={{ color: 'var(--fg-dim)' }}
        >
          The live causal graph is available at the Zuup World Model.
        </p>
        <div className="cta-row">
          <a
            href="https://zworldmodel.xyz/"
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
