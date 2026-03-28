const credentials = [
  { certification: 'PMP', domain: 'Project Management', status: 'Active' },
  { certification: 'SAFe', domain: 'Agile', status: 'Active' },
  { certification: 'CISA', domain: 'Audit', status: 'Active' },
  { certification: 'CISM', domain: 'Security Management', status: 'Active' },
  { certification: 'CRISC', domain: 'Risk & Control', status: 'Active' },
  { certification: 'Lean Six Sigma Green Belt', domain: 'Operations', status: 'Active' },
  { certification: 'MBA IT Management / SNHU', domain: 'Graduate Studies', status: 'In Progress' },
];

const chapters = [
  {
    anchor: '1996',
    headline: 'Fort Sam Houston, day one.',
    body: `I was 19 when the Army handed me a logistics role and a lesson I have never let go: systems either support the people depending on them, or they fail. There is no middle. That first posting was the first time I understood what accountability felt like in the body — not just as a concept.`,
  },
  {
    anchor: '1996 – 2006',
    headline: 'Artillery. Barracks. Kuwait. Iraq.',
    body: `Ft. Sill. Ft. Benning. Then the desert. I ran supply lines and troop welfare operations in Kuwait and Iraq under MWR/KBR contracts — logistics in environments where the margin for error is measured in lives. I learned to plan under pressure, earn trust fast, and move resources toward the point of greatest need. I came home carrying things I still don't have full words for. My discharge upgrade is in progress. I've never stopped being a soldier in the ways that matter.`,
  },
  {
    anchor: '2006 – 2022',
    headline: 'The long way around.',
    body: `Sixteen years of finding footing in civilian life. Hibbett Sports — twelve stores, $10M in operations. Albany State and Columbus State — ERP/CRM rollouts and a 21% enrollment surge. A USDA-certified halal poultry operation. A creative brand. A performance wellness company. I wasn't wandering — I was collecting patterns. My brain doesn't let me do anything halfway. I'm neurodivergent, and I've learned to lean into the obsessive depth that comes with that rather than fight it. Every industry I touched, I mapped the whole system, not just my corner of it. That hyperconnective way of seeing became my edge.`,
  },
  {
    anchor: '2020 – 2024',
    headline: 'Quality, scale, and the throughline.',
    body: `Stratosphere Quality put me over 50 to 100 simultaneous QA and IT-integrated projects across OEM and Tier 1 automotive sites. I built 320 consecutive days without a safety incident. At Amazon I trained PIT operators and cut error rates 15% through workflow redesign. The thread running through all of it: I see where systems break before they break. That's not a skill I built — it's how I'm wired.`,
  },
  {
    anchor: '2024 – present',
    headline: 'Building the thing.',
    body: `I stopped fitting myself into other people's systems and started building my own. Zuup Innovation Labs is a nine-platform blockchain ecosystem on Solana — federal procurement, AI autonomy, compliance, edge compute, biosensing. I'm finishing my MBA at SNHU while leading federal capture and business development at Visionblox. The GSA MAS sprint, the Aureon whitepaper, the Orb spatial intelligence platform — these aren't side projects. This is the mission.`,
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        About
      </h1>
      <p className="body-small mb-10 max-w-xl" style={{ color: 'var(--fg-dim)' }}>
        Khaalis Wooden — Army veteran, neurodivergent systems builder, founder of Zuup Innovation Labs.
      </p>

      <section className="mb-14 max-w-2xl">
        <p className="body-small mb-5" style={{ color: 'var(--fg-dim)', lineHeight: '1.75' }}>
          I&apos;ve spent thirty years learning how systems break and how to build ones that don&apos;t. I started
          in the U.S. Army — not because I had a plan, but because structure and purpose were things I needed
          before I had words for why. What I found was that I was built for this: pattern-recognition under
          pressure, logistics as a first language, and a brain that refuses to stop connecting dots.
        </p>
        <p className="body-small" style={{ color: 'var(--fg-dim)', lineHeight: '1.75' }}>
          Being neurodivergent shaped everything. The hyperfocus that made me unusual in classrooms made me
          effective in operations. The compulsion to understand the whole system — not just the part I was
          handed — drove me across industries and disciplines until I had enough to build something that
          didn&apos;t exist yet.
        </p>
      </section>

      <section className="mb-14">
        <h2
          className="mb-8 font-mono text-[13px] font-medium uppercase tracking-wide"
          style={{ color: 'var(--fg-muted)' }}
        >
          The Journey
        </h2>
        <div className="flex flex-col gap-10">
          {chapters.map((ch) => (
            <div
              key={ch.anchor}
              className="grid gap-4 max-[900px]:grid-cols-1"
              style={{ gridTemplateColumns: '160px 1fr' }}
            >
              <div className="pt-[3px] font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                {ch.anchor}
              </div>
              <div>
                <p className="mb-2 font-mono text-[12px] font-medium" style={{ color: 'var(--fg)' }}>
                  {ch.headline}
                </p>
                <p className="body-small" style={{ color: 'var(--fg-dim)', lineHeight: '1.75' }}>
                  {ch.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide"
          style={{ color: 'var(--fg-muted)' }}
        >
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
    </main>
  );
}
