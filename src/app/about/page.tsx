const credentials = [
  { certification: 'PMP', domain: 'Management', status: 'Active' },
  { certification: 'SAFe', domain: 'Agile', status: 'Active' },
  { certification: 'CISA', domain: 'Audit', status: 'Active' },
  { certification: 'CISM', domain: 'Security Mgmt', status: 'Active' },
  { certification: 'CRISC', domain: 'Risk Control', status: 'Active' },
  { certification: 'Lean Six Sigma Green Belt', domain: 'Operations', status: 'Active' },
  { certification: 'MBA IT Management / SNHU', domain: 'Graduate 2026', status: 'In Progress' },
];

const timeline = [
  {
    year: '1996',
    text: 'Fort Sam Houston logistics specialist. Systems either support users or they fail.',
  },
  {
    year: '1996–2006',
    text: 'Army service from artillery support to supply tasks in Kuwait and Iraq.',
  },
  {
    year: '2006–2015',
    text: 'Retail, higher education, and agriculture operations with measurable enrollment and certification throughput.',
  },
  {
    year: '2015–2020',
    text: 'Manufacturing quality roles with continuous safety reporting and OEM programs.',
  },
  {
    year: '2020–2024',
    text: 'Large-scale logistics and federal-facing process work with documented incident and error metrics.',
  },
  {
    year: '2024–present',
    text: 'Federal capture, MBA coursework at SNHU, and nine-platform architecture on Solana devnet.',
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        About
      </h1>
      <p className="body-small mb-10 max-w-xl">Founder credentials and timeline.</p>

      <section className="mb-14">
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Credentials
        </h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Certification</th>
              <th>Domain</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((c) => (
              <tr key={c.certification}>
                <td style={{ color: 'var(--fg)' }}>{c.certification}</td>
                <td>{c.domain}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Timeline
        </h2>
        <div className="flex flex-col gap-8">
          {timeline.map((t) => (
            <div key={t.year} className="grid gap-4 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '140px 1fr' }}>
              <div className="font-mono text-[12px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                {t.year}
              </div>
              <p className="body-small" style={{ color: 'var(--fg-dim)' }}>
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
