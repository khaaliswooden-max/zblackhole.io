export type PlatformStatus = 'active' | 'devnet' | 'research';

export type PlatformRow = {
  id: string;
  short: string;
  name: string;
  domain: string;
  arch: string;
  gridSummary: [string, string];
  status: PlatformStatus;
  omega: string;
};

export const PLATFORMS: PlatformRow[] = [
  {
    id: 'ZHQ-01',
    short: 'ZHQ',
    name: 'Zuup HQ',
    domain: 'Trust Infrastructure',
    arch: 'Role-based access control, SHA256 content-addressed attestations, and Solana program governance for product-wide trust.',
    gridSummary: [
      'On-chain RBAC and attestation registry for product modules.',
      'Content-addressed storage references anchored to Solana devnet.',
    ],
    status: 'devnet',
    omega: 'ω ≥ 1.0',
  },
  {
    id: 'AU-02',
    short: 'AU',
    name: 'Aureon',
    domain: 'Global Procurement OS',
    arch: 'Agent workflows for opportunity discovery, compliance checks, and supplier evaluation against FAR and commercial rules.',
    gridSummary: [
      'Solicitation ingestion, evaluation queues, and award documentation.',
      'FAR-aligned checks run before funds movement.',
    ],
    status: 'active',
    omega: 'ω ≥ 0.88',
  },
  {
    id: 'VY-03',
    short: 'VY',
    name: 'Veyra',
    domain: 'Post-SI Frontier LLM',
    arch: 'Latency-aware inference stack with audit logs for multi-sovereign deployment and delayed ground links.',
    gridSummary: [
      'Planning and inference schedules that tolerate planet-scale latency.',
      'Governance hooks record decisions for delayed human review.',
    ],
    status: 'research',
    omega: 'ω TBD',
  },
  {
    id: 'CV-04',
    short: 'CV',
    name: 'Civium',
    domain: 'Global Halal Compliance OS',
    arch: 'Policy graphs for halal supply chains, audit events, and certificate lineage mapped to operational controls.',
    gridSummary: [
      'Lot-level lineage from farm through processing.',
      'Controls mapped to halal authority rules and facility audits.',
    ],
    status: 'active',
    omega: 'ω ≥ 0.95',
  },
  {
    id: 'RL-05',
    short: 'RL',
    name: 'Relian',
    domain: 'Global Refactoring OS',
    arch: 'LLM-assisted migration pipelines with symbolic execution tests and on-chain attestation of migration artifacts.',
    gridSummary: [
      'Semantic parse of legacy sources into target language modules.',
      'Tests and attestations recorded for each migration batch.',
    ],
    status: 'active',
    omega: 'ω ≥ 0.85',
  },
  {
    id: 'PX-06',
    short: 'PX',
    name: 'PodX',
    domain: 'Mobile Data Center OS',
    arch: 'ISO-container compute, power, cooling, and network stack rated for DDIL field operation.',
    gridSummary: [
      'Rugged container housing compute, storage, and power conditioning.',
      'Targeted for disconnected or contested network periods beyond 24 hours.',
    ],
    status: 'active',
    omega: 'ω = 1.00',
  },
  {
    id: 'SB-07',
    short: 'SB',
    name: 'Symbion',
    domain: 'Gut-Brain Interface OS',
    arch: 'Capsule firmware, mobile ingestion path, and cloud analytics for gut-brain biomarker time series.',
    gridSummary: [
      'Capsule samples biomarkers; phone relays encrypted payloads.',
      'Cloud pipeline stores time-series for clinical study protocols.',
    ],
    status: 'research',
    omega: 'ω layer-scoped',
  },
  {
    id: 'QAL-08',
    short: 'QAL',
    name: 'QAL',
    domain: 'Quantum Archeology Labs OS',
    arch: 'Layered causal model for inferring past system states from present measurements and sparse records.',
    gridSummary: [
      'Five layers from physical traces to metasystem hypotheses.',
      'Queries return posteriors with stated coverage limits.',
    ],
    status: 'research',
    omega: 'ω layer-scoped',
  },
  {
    id: 'ZSD-09',
    short: 'ZSD',
    name: 'ZUSDC',
    domain: 'Stablecoin + Agent Treasury',
    arch: 'Mint-burn logic tied to reserve proofs and agent treasury routing on Solana devnet.',
    gridSummary: [
      'Stablecoin contract enforces reserve reporting intervals.',
      'Agent treasury routes funds per on-chain budget accounts.',
    ],
    status: 'devnet',
    omega: 'ω ≥ 1.0',
  },
];

export function statusClass(s: PlatformStatus) {
  if (s === 'active') return 'badge badge-active';
  if (s === 'devnet') return 'badge badge-devnet';
  return 'badge badge-research';
}

export function statusLabel(s: PlatformStatus) {
  if (s === 'active') return 'Active Dev';
  if (s === 'devnet') return 'Devnet';
  return 'Research';
}
