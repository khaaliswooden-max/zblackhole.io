import Link from 'next/link';
import {
  PLATFORMS,
  statusClass,
  statusLabel,
} from '@/lib/platforms';

const PROGRAM = 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM';

export default function Home() {
  return (
    <main>
      <section className="page-shell">
        <div
          className="grid gap-12 max-[900px]:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <div>
            <p
              className="mb-4 font-mono text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--fg-muted)' }}
            >
              Zuup Innovation Lab — Huntsville, AL
            </p>
            <h1
              className="mb-6 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight"
              style={{ color: 'var(--fg)' }}
            >
              Nine platforms. One substrate. On-chain.
            </h1>
            <p className="body-small max-w-md" style={{ color: 'var(--fg-dim)' }}>
              Solana devnet programs, shared attestations, and nine product lines for
              procurement, trust, halal compliance, edge compute, biosensing, legacy
              migration, spatial research, quantum reconstruction, and treasury rails.
            </p>
            <div className="cta-row">
              <Link href="/world" className="btn-outline">
                World
              </Link>
              <Link href="/substrates" className="btn-outline">
                Substrates
              </Link>
            </div>
          </div>
          <div className="flex flex-col font-mono">
            {[
              { label: 'Platforms', value: '9' },
              { label: 'TPS', value: '65,000' },
              { label: 'RSF', value: 'ω > 1.0' },
              { label: 'Program ID', value: PROGRAM, small: true },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-5"
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {row.label}
                </span>
                <span
                  className={`tabular-nums ${row.small ? 'break-all text-[11px]' : 'text-2xl font-light'}`}
                  style={{
                    color: row.label === 'Program ID' ? 'var(--chain-color)' : 'var(--fg)',
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t px-12 py-16 max-[900px]:px-6"
        style={{ borderColor: 'var(--line)' }}
      >
        <p
          className="mx-auto max-w-[1200px] text-center font-mono font-normal"
          style={{
            fontSize: 'clamp(14px, 2vw, 22px)',
            color: 'var(--fg-dim)',
          }}
        >
          Energy → Computation → Knowledge → Energy
        </p>
      </section>

      <section className="page-shell border-t" style={{ borderColor: 'var(--line)' }}>
        <div
          className="grid gap-px max-[900px]:grid-cols-1"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="p-6"
              style={{ background: 'var(--bg)' }}
            >
              <div className="mb-3 font-mono text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                {p.id}
              </div>
              <div className="mono-14 mb-1">{p.name}</div>
              <p className="body-small mb-4 min-h-[2.75rem]">{p.domain}</p>
              <p className="body-small mb-1" style={{ color: 'var(--fg-dim)' }}>
                {p.gridSummary[0]}
              </p>
              <p className="body-small mb-4" style={{ color: 'var(--fg-dim)' }}>
                {p.gridSummary[1]}
              </p>
              <span className={statusClass(p.status)}>{statusLabel(p.status)}</span>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="border-t px-12 py-10 font-mono text-[11px] max-[900px]:px-6"
        style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4">
          <span>Zuup Innovation Lab — Huntsville, Alabama</span>
          <span className="tabular-nums">H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM</span>
        </div>
      </footer>
    </main>
  );
}
