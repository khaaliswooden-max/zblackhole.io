import Link from 'next/link';
import { PLATFORMS, statusClass, statusLabel } from '@/lib/platforms';

const SUPERPOWERS: Record<string, { name: string; benchmark: string }> = {
  'ZHQ-01':  { name: 'The Trust Anchor',              benchmark: '100% SHA256 coverage' },
  'AU-02':   { name: 'The Procurement Intelligence',  benchmark: 'NDCG@20 ≥ 0.85' },
  'VY-03':   { name: 'The Reasoning Engine',          benchmark: 'V-Score > 75' },
  'CV-04':   { name: 'The Compliance Graph',          benchmark: 'W3C VC 2.0' },
  'RL-05':   { name: 'The Migration Engine',          benchmark: 'Sem. preservation ≥ 0.95' },
  'PX-06':   { name: 'The Field Compute',             benchmark: '99.99% availability' },
  'SB-07':   { name: 'The Biomarker Layer',           benchmark: 'Sensitivity 92.5%' },
  'QAL-08':  { name: 'The Historical Inference',      benchmark: 'Confidence > 0.75' },
  'ZSD-09':  { name: 'The Settlement Rail',           benchmark: '1:1 USDC backing' },
};

export const metadata = {
  title: 'Substrates — Zuup Innovation Lab',
  description: 'Nine substrate superpowers powering the Zuup World Model.',
};

export default function SubstratesPage() {
  return (
    <main>
      <section className="page-shell">
        <div className="mb-10">
          <p
            className="mb-3 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--fg-muted)' }}
          >
            Zuup Innovation Lab — Nine Substrates
          </p>
          <h1
            className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight"
            style={{ color: 'var(--fg)' }}
          >
            Nine superpowers. One world model.
          </h1>
        </div>
      </section>

      <section className="page-shell border-t" style={{ borderColor: 'var(--line)' }}>
        <div
          className="grid grid-cols-3 gap-px max-[900px]:grid-cols-1"
          style={{
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {PLATFORMS.map((p) => {
            const sp = SUPERPOWERS[p.id];
            return (
              <div
                key={p.id}
                className="flex flex-col p-6"
                style={{ background: 'var(--bg)' }}
              >
                <div
                  className="mb-1 font-mono text-[11px]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {p.id}
                </div>
                <h2
                  className="mb-1 font-mono text-[18px] font-normal leading-snug"
                  style={{ color: 'var(--fg)' }}
                >
                  {sp.name}
                </h2>
                <p
                  className="mb-3 text-[11px]"
                  style={{ fontFamily: 'Courier New, monospace', color: 'var(--fg-muted)' }}
                >
                  {p.name}
                </p>
                <p
                  className="body-small mb-4 flex-1"
                  style={{ color: 'var(--fg-dim)' }}
                >
                  {p.arch}
                </p>
                <div
                  className="mb-4 font-mono text-[13px] font-medium"
                  style={{ color: 'var(--fg)' }}
                >
                  {sp.benchmark}
                </div>
                <div className="flex items-center justify-between">
                  <span className={statusClass(p.status)}>{statusLabel(p.status)}</span>
                  <Link
                    href="/whitepapers"
                    className="font-mono text-[11px]"
                    style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}
                  >
                    Whitepaper →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
