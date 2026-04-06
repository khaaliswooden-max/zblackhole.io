import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build — Zuup Innovation Lab',
  description:
    'Developer resources for building on the Zuup platform: SDK setup, Solana program integration, agent framework documentation, and tooling.',
};

type BuildResource = {
  id: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  href: string | null;
};

const RESOURCES: BuildResource[] = [
  {
    id: 'BR-01',
    category: 'SDK',
    title: 'Zuup TypeScript SDK',
    description:
      'Client library for interacting with Zuup platform substrates, submitting SubstrateEvents, and reading on-chain state snapshots from Solana Devnet.',
    tag: 'In Development',
    href: null,
  },
  {
    id: 'BR-02',
    category: 'On-Chain',
    title: 'Solana Program Interface',
    description:
      'Anchor IDL and instruction reference for the Zuup World program. Covers WorldActor registration, substrate state writes, and causal event anchoring.',
    tag: 'Devnet',
    href: null,
  },
  {
    id: 'BR-03',
    category: 'Agents',
    title: 'Agent Framework Guide',
    description:
      'Documentation for building ΩVEB-1-compliant agent workflows. Includes task schema, evaluation hooks, and on-chain attestation patterns used by AU-02 Aureon and CV-04 Civium.',
    tag: 'Active',
    href: null,
  },
  {
    id: 'BR-04',
    category: 'Infrastructure',
    title: 'PodX Field Deployment Kit',
    description:
      'Integration guide for PX-06 PodX mobile data centers. Covers ISO-container compute provisioning, DDIL network configuration, and substrate sync for disconnected operations.',
    tag: 'Active',
    href: null,
  },
  {
    id: 'BR-05',
    category: 'Compliance',
    title: 'Halal Supply Chain API',
    description:
      'REST and agent API reference for CV-04 Civium. Lot-level lineage queries, halal authority certificate endpoints, and facility audit event streams.',
    tag: 'Active',
    href: null,
  },
  {
    id: 'BR-06',
    category: 'Research',
    title: 'ΩVEB-1 Benchmark Harness',
    description:
      'Tooling for running and submitting results to the ΩVEB-1 evaluation suite. Includes scoring rubrics, ground-truth datasets, and report templates for RSF notation.',
    tag: 'Research',
    href: null,
  },
  {
    id: 'BR-07',
    category: 'Treasury',
    title: 'ZUSDC Agent Treasury API',
    description:
      'Mint-burn interface, reserve proof submission, and agent budget account management for ZSD-09 ZUSDC on Solana Devnet. Includes wallet integration examples.',
    tag: 'Devnet',
    href: null,
  },
  {
    id: 'BR-08',
    category: 'Migration',
    title: 'Relian Migration Pipeline',
    description:
      'CLI and API for RL-05 Relian LLM-assisted code migration. Covers source ingestion, semantic parse configuration, test attestation recording, and batch artifact management.',
    tag: 'Active',
    href: null,
  },
];

const TAG_CLASS: Record<string, string> = {
  'In Development': 'badge badge-research',
  Devnet: 'badge badge-devnet',
  Active: 'badge badge-active',
  Research: 'badge badge-research',
};

export default function BuildPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Build
      </h1>
      <p className="body-small mb-2 max-w-2xl">
        Developer resources for the Zuup platform. SDKs, on-chain program interfaces, agent framework guides, and integration tooling for all nine canonical platforms.
      </p>
      <p className="body-small mb-10 max-w-3xl" style={{ color: 'var(--fg-dim)' }}>
        All on-chain resources target Solana Devnet · Program: H1eSx6ij1Q2…
      </p>
      <div className="flex flex-col gap-6">
        {RESOURCES.map((r) => (
          <article
            key={r.id}
            className="border p-6 md:p-8"
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={TAG_CLASS[r.tag] ?? 'badge'}>{r.tag}</span>
                <span
                  className="font-mono text-[10px] uppercase tracking-wide"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {r.category}
                </span>
              </div>
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: 'var(--fg-muted)' }}
              >
                {r.id}
              </span>
            </div>
            <h2
              className="mb-3 font-mono text-[15px] leading-snug"
              style={{ color: 'var(--fg)' }}
            >
              {r.title}
            </h2>
            <p className="body-small leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
              {r.description}
            </p>
            {r.href && (
              <div className="mt-4">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-[11px]"
                >
                  View Docs
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
