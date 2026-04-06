import Link from 'next/link';
import WorldCanvas from '@/components/WorldCanvas';

const PROGRAM = 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM';

export default function Home() {
  return (
    <main>
      {/* Hero — unchanged */}
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
              <Link href="/substrates" className="btn-outline">
                Substrates
              </Link>
              <Link href="/whitepapers" className="btn-outline">
                Whitepapers
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

      {/* Tagline — unchanged */}
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

      {/* World Model Canvas */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <WorldCanvas />
      </section>

      {/* ZWM copy below canvas */}
      <section
        className="border-t px-12 py-12 max-[900px]:px-6"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3">
          <p
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontWeight: 700,
              fontSize: 28,
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            The institutional world model.
          </p>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 22,
              color: '#888880',
              margin: 0,
            }}
          >
            Nine substrates. One causal graph. Live on Solana.
          </p>
          <Link
            href="/build"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 22,
              color: '#1A1A2E',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Access the ZWM →
          </Link>
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
