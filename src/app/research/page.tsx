type Paper = {
  date: string;
  title: string;
  abstract: string;
  tags: string[];
  venue: 'SSRN' | 'arXiv' | 'IEEE' | 'viXra';
  venueUrl: string;
};

const papers: Paper[] = [
  {
    date: 'Nov 2024',
    title: 'Decentralized Trust Infrastructure for Enterprise AI Systems',
    abstract:
      '✓ Verified: Solana devnet deployment referenced in lab repositories. ◐ Plausible: RBAC mapping to AI serving accounts. Framework for attestations on model weights and data lineage.',
    tags: ['Trust', 'Solana', 'RBAC', 'Attestation'],
    venue: 'SSRN',
    venueUrl: 'https://www.ssrn.com/',
  },
  {
    date: 'Oct 2024',
    title: 'Quadratic Voting Mechanisms for DAO Governance at Scale',
    abstract:
      '✓ Verified: Mechanism definitions align with published quadratic voting references. ◯ Speculative: Gas cost at 65k TPS sustained load on devnet remains to be benchmarked.',
    tags: ['Governance', 'Quadratic voting', 'DAO'],
    venue: 'arXiv',
    venueUrl: 'https://arxiv.org/',
  },
  {
    date: 'Sep 2024',
    title: 'Stablecoin Design Patterns: Atomic Operations and Reserve Verification',
    abstract:
      '✓ Verified: Atomic mint-burn patterns documented for Solana. ◐ Plausible: Reserve attestations via periodic oracle batches. ◯ Speculative: Cross-margining across agent treasuries.',
    tags: ['Stablecoin', 'Solana', 'Reserves'],
    venue: 'SSRN',
    venueUrl: 'https://www.ssrn.com/',
  },
  {
    date: 'Aug 2024',
    title: 'Edge Computing Architecture for Contested Environments',
    abstract:
      '✓ Verified: DDIL definitions from field manuals cited in PodX documentation. ◐ Plausible: Power envelope for ISO-container tier tested in lab environment only.',
    tags: ['Edge', 'PodX', 'DDIL'],
    venue: 'IEEE',
    venueUrl: 'https://ieeexplore.ieee.org/',
  },
  {
    date: 'Jul 2024',
    title: 'Gut-Brain Axis: Biosensor Data Integration Protocols',
    abstract:
      '◐ Plausible: Four-marker panel matches Symbion prototype specifications. ◯ Speculative: Week-level forecast models for microbiome shifts require external validation.',
    tags: ['Symbion', 'Biosensor', 'Protocol'],
    venue: 'viXra',
    venueUrl: 'https://vixra.org/',
  },
  {
    date: 'Jun 2024',
    title: 'AI Procurement Optimization: A Multi-Agent Approach',
    abstract:
      '✓ Verified: Multi-agent workflow mirrors Aureon orchestration diagrams. ◐ Plausible: Reward shaping for supplier risk uses proprietary data not released publicly.',
    tags: ['Aureon', 'Multi-agent', 'Procurement'],
    venue: 'arXiv',
    venueUrl: 'https://arxiv.org/',
  },
];

export default function ResearchPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Research
      </h1>
      <p className="body-small mb-4 max-w-2xl">
        Selected papers and specifications with venue routing. Claims carry epistemic markers inside abstracts.
      </p>
      <p className="body-small mb-10 max-w-3xl" style={{ color: 'var(--fg-dim)' }}>
        All claims carry epistemic markers: ✓ Verified ◐ Plausible ◯ Speculative.
      </p>
      <div className="flex flex-col gap-6">
        {papers.map((p) => (
          <div
            key={p.title}
            className="grid grid-cols-1 gap-6 border p-6 min-[901px]:grid-cols-[120px_1fr_140px]"
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="font-mono text-[12px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
              {p.date}
            </div>
            <div>
              <h2 className="mono-14 mb-3">{p.title}</h2>
              <p className="body-small mb-4">{p.abstract}</p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wide">
                {p.tags.map((t) => (
                  <span key={t} className="border px-2 py-0.5" style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-start min-[901px]:justify-end">
              <a
                href={p.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border px-3 py-2 font-mono text-[11px] uppercase tracking-wider"
                style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)', textDecoration: 'none' }}
              >
                {p.venue}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
