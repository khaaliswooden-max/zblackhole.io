import type { Metadata } from 'next';
import { PLATFORMS, statusClass, statusLabel } from '@/lib/platforms';

export const metadata: Metadata = {
  title: 'Substrates — Zuup Innovation Lab',
  description:
    'Active substrate registry for Zuup World Model: on-chain program substrates, state snapshots, and substrate event anchors on Solana Devnet.',
};

const SUBSTRATE_TYPES: Record<string, string> = {
  'ZHQ-01': 'Trust Substrate',
  'AU-02': 'Procurement Substrate',
  'VY-03': 'Inference Substrate',
  'CV-04': 'Compliance Substrate',
  'RL-05': 'Migration Substrate',
  'PX-06': 'Compute Substrate',
  'SB-07': 'Biosignal Substrate',
  'QAL-08': 'Causal Substrate',
  'ZSD-09': 'Treasury Substrate',
};

const CHAIN_LAYER: Record<string, string> = {
  'ZHQ-01': 'L1 · Governance',
  'AU-02': 'L2 · Agent',
  'VY-03': 'L2 · Inference',
  'CV-04': 'L2 · Agent',
  'RL-05': 'L2 · Agent',
  'PX-06': 'L1 · Compute',
  'SB-07': 'L3 · Sensor',
  'QAL-08': 'L3 · Causal',
  'ZSD-09': 'L1 · Treasury',
};

export default function SubstratesPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Substrates
      </h1>
      <p className="body-small mb-2 max-w-2xl">
        Computational substrate registry for the Zuup World Model. Each substrate anchors a platform&apos;s on-chain state, event log, and causal snapshot on Solana Devnet.
      </p>
      <p className="body-small mb-10 max-w-3xl" style={{ color: 'var(--fg-dim)' }}>
        Network: Solana Devnet · Program: H1eSx6ij1Q2… · Block time ~400 ms
      </p>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Platform</th>
              <th>Substrate Type</th>
              <th>Chain Layer</th>
              <th>Domain</th>
              <th>Status</th>
              <th>ω Target</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr key={p.id}>
                <td style={{ color: 'var(--fg)' }}>{p.id}</td>
                <td style={{ color: 'var(--fg)' }}>{p.name}</td>
                <td style={{ color: 'var(--chain-color)' }}>{SUBSTRATE_TYPES[p.id]}</td>
                <td className="font-mono text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                  {CHAIN_LAYER[p.id]}
                </td>
                <td>{p.domain}</td>
                <td>
                  <span className={statusClass(p.status)}>{statusLabel(p.status)}</span>
                </td>
                <td style={{ color: 'var(--chain-color)' }}>{p.omega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
