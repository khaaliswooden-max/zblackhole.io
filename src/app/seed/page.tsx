import Link from 'next/link';

const ALLOCATION = [
  { code: 'ZHQ', name: 'Zuup HQ', pct: 12 },
  { code: 'AU', name: 'Aureon', pct: 14 },
  { code: 'VY', name: 'Veyra', pct: 10 },
  { code: 'CV', name: 'Civium', pct: 12 },
  { code: 'RL', name: 'Relian', pct: 14 },
  { code: 'PX', name: 'PodX', pct: 10 },
  { code: 'SB', name: 'Symbion', pct: 10 },
  { code: 'QAL', name: 'QAL', pct: 9 },
  { code: 'ZSD', name: 'ZUSDC', pct: 9 },
];

const TARGET = 2_000_000;

async function getSeedStats(): Promise<{ raised: number; investors: number }> {
  try {
    // Use NEXT_PUBLIC_BASE_URL in production; fall back to localhost for dev
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/seed`, { next: { revalidate: 60 } });
    if (!res.ok) return { raised: 0, investors: 0 };
    return res.json();
  } catch {
    return { raised: 0, investors: 0 };
  }
}

export default async function SeedPage() {
  const { raised, investors } = await getSeedStats();
  const progressPercent = Math.min((raised / TARGET) * 100, 100);

  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Seed Round
      </h1>
      <p className="body-small mb-10 max-w-2xl">
        Open allocation for nine programs. Figures below update from treasury sources when the first tranche
        closes.
      </p>

      <div className="mb-10 border p-6" style={{ borderColor: 'var(--line)' }}>
        <div className="mb-2 font-mono text-[11px] uppercase" style={{ color: 'var(--fg-muted)' }}>
          Progress
        </div>
        <p className="body-small mb-6 max-w-3xl" style={{ color: 'var(--fg-dim)' }}>
          Seed round is open. Direct investment inquiries to khaalis.wooden@visionblox.com. On-chain minting begins
          upon first tranche close.
        </p>
        <div className="mb-2 flex flex-wrap gap-4 font-mono tabular-nums">
          <span style={{ color: 'var(--fg)' }}>${raised.toLocaleString()}</span>
          <span style={{ color: 'var(--fg-muted)' }}>raised</span>
          <span style={{ color: 'var(--fg-muted)' }}>/ ${TARGET.toLocaleString()} target</span>
        </div>
        <div className="mb-2 h-2 w-full" style={{ background: 'var(--line)' }}>
          <div className="h-2" style={{ width: `${progressPercent}%`, background: 'var(--fg-muted)' }} />
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-[12px]" style={{ color: 'var(--fg-dim)' }}>
          <span>Investors {investors}</span>
          <span>Platforms 9</span>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Agent Treasury Allocation
        </h2>
        <p className="body-small mb-6 max-w-2xl">
          zUSDC route sends ten percent of each qualified tranche to the agent treasury. Splits below sum to one hundred
          percent across nine programs.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Platform</th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {ALLOCATION.map((row) => (
              <tr key={row.code}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td className="tabular-nums">{row.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Rails
        </h2>
        <div className="grid gap-8 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="border p-5" style={{ borderColor: 'var(--line)' }}>
            <h3 className="mb-2 font-mono text-[12px]" style={{ color: 'var(--fg)' }}>
              Fiat
            </h3>
            <p className="body-small">
              To invest via ACH or wire, contact khaalis.wooden@visionblox.com with subject line ZUUP SEED.
            </p>
          </div>
          <div className="border p-5" style={{ borderColor: 'var(--line)' }}>
            <h3 className="mb-2 font-mono text-[12px]" style={{ color: 'var(--fg)' }}>
              Crypto
            </h3>
            <p className="body-small">
              USDC on Solana devnet is the reference rail for mint tests. Settlement address and compliance steps are
              issued after AML/KYC review.
            </p>
          </div>
        </div>
      </section>

      <p className="body-small font-mono" style={{ color: 'var(--fg-muted)' }}>
        <Link href="/contact" className="underline-offset-4 hover:underline">
          Contact
        </Link>{' '}
        for diligence materials.
      </p>
    </main>
  );
}
