export type Paper = {
  key: string;
  paperId: string;
  date: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  pdf: string;
  audioBase: string;
  narration: string;
};

export type ExtendedPaper = Omit<Paper, 'key'> & { key: string };

export const canonicalPapers: Paper[] = [
  {
    key: 'master',
    paperId: 'WP-MA-01',
    date: '2025-03',
    title: 'Zuup Master Whitepaper',
    summary:
      'Defines the nine-platform layout, Solana program boundaries, and the energy–computation–knowledge loop that ties network fees to product delivery.',
    metrics: [
      { value: '9', label: 'Programs' },
      { value: '65K', label: 'TPS' },
      { value: '400ms', label: 'Block time' },
    ],
    pdf: 'zuup-master-whitepaper.pdf',
    audioBase: 'zuup-master',
    narration:
      'Zuup Master Whitepaper. Defines the nine-platform layout, Solana program boundaries, and the energy–computation–knowledge loop that ties network fees to product delivery.',
  },
  {
    key: 'ecosystem',
    paperId: 'WP-EC-02',
    date: '2025-02',
    title: 'Zuup Blockchain Ecosystem',
    summary:
      'Documents the foundation, trust, and governance layers on Solana devnet: transaction flow, attestation coverage, and deployment cost figures measured on devnet.',
    metrics: [
      { value: '3', label: 'Layers' },
      { value: '100%', label: 'Attestation coverage' },
      { value: '$0.02', label: 'Deploy cost' },
    ],
    pdf: 'zuup-ecosystem.pdf',
    audioBase: 'zuup-chain',
    narration:
      'Zuup Blockchain Ecosystem. Documents the foundation, trust, and governance layers on Solana devnet: transaction flow, attestation coverage, and deployment cost figures measured on devnet.',
  },
  {
    key: 'aureon',
    paperId: 'WP-AU-03',
    date: '2025-01',
    title: 'Aureon',
    summary:
      'Specifies sourcing workflows, solicitation parsing, and compliance gates used before obligation of funds on procurement actions.',
    metrics: [
      { value: 'ACS', label: 'Bench target ≥85' },
      { value: 'FAR', label: 'Rule coverage' },
      { value: 'Multi', label: 'Region routing' },
    ],
    pdf: 'aureon.pdf',
    audioBase: 'aureon',
    narration:
      'Aureon. Specifies sourcing workflows, solicitation parsing, and compliance gates used before obligation of funds on procurement actions.',
  },
  {
    key: 'veyra',
    paperId: 'WP-VY-04',
    date: '2024-12',
    title: 'Veyra',
    summary:
      'Describes inference scheduling, logging, and rollback policies when ground control latency is measured in minutes instead of milliseconds.',
    metrics: [
      { value: '5', label: 'Stack layers' },
      { value: '7', label: 'Bench families' },
      { value: '3–22m', label: 'Latency window' },
    ],
    pdf: 'veyra.pdf',
    audioBase: 'veyra',
    narration:
      'Veyra. Describes inference scheduling, logging, and rollback policies when ground control latency is measured in minutes instead of milliseconds.',
  },
  {
    key: 'podx',
    paperId: 'WP-PX-05',
    date: '2024-11',
    title: 'PodX',
    summary:
      'Covers containerized compute, power, environmental limits, and benchmark scores for mobile data center operation in DDIL settings.',
    metrics: [
      { value: '100', label: 'WCBI' },
      { value: '99.99%', label: 'Uptime target' },
      { value: '24h+', label: 'DDIL runtime' },
    ],
    pdf: 'podx.pdf',
    audioBase: 'podx',
    narration:
      'PodX. Covers containerized compute, power, environmental limits, and benchmark scores for mobile data center operation in DDIL settings.',
  },
  {
    key: 'relian',
    paperId: 'WP-RL-06',
    date: '2024-10',
    title: 'Relian',
    summary:
      'Maps migration stages from legacy languages to targets, with symbolic tests and on-chain hashes for each promoted build.',
    metrics: [
      { value: '100x', label: 'Speed vs manual' },
      { value: '99%', label: 'Cost reduction' },
      { value: '85%', label: 'Risk model' },
    ],
    pdf: 'relian.pdf',
    audioBase: 'relian',
    narration:
      'Relian. Maps migration stages from legacy languages to targets, with symbolic tests and on-chain hashes for each promoted build.',
  },
  {
    key: 'symbion',
    paperId: 'WP-SB-07',
    date: '2024-09',
    title: 'Symbion',
    summary:
      'Defines capsule electronics, firmware update path, biomarker list, and clinical sensitivity targets referenced in trials.',
    metrics: [
      { value: '92.5%', label: 'Sensitivity' },
      { value: '94.3%', label: 'Specificity' },
      { value: '4', label: 'Markers' },
    ],
    pdf: 'symbion.pdf',
    audioBase: 'symbion',
    narration:
      'Symbion. Defines capsule electronics, firmware update path, biomarker list, and clinical sensitivity targets referenced in trials.',
  },
  {
    key: 'qal',
    paperId: 'WP-QAL-08',
    date: '2024-08',
    title: 'QAL — Quantum Archeology Labs OS',
    summary:
      'States the layered causal model, query grammar, and uncertainty reporting used when reconstructing past states from sparse data.',
    metrics: [
      { value: '5', label: 'Causal layers' },
      { value: 'QL', label: 'Query surface' },
      { value: 'Layer', label: 'Fidelity scope' },
    ],
    pdf: 'qal.pdf',
    audioBase: 'qal',
    narration:
      'QAL — Quantum Archeology Labs OS. States the layered causal model, query grammar, and uncertainty reporting used when reconstructing past states from sparse data.',
  },
];

export const orbPaper = {
  paperId: 'WP-ORB-XR',
  date: '2024-07',
  title: 'Orb™',
  summary:
    'Spatial world-model stack using 3D Gaussian splatting for persisted environments, with compute budgets sized for edge deployment and integration points to the nine-program catalog above.',
  pdf: 'orb.pdf',
  audioBase: 'orb',
  narration:
    'Orb. Spatial world-model stack using 3D Gaussian splatting for persisted environments, with compute budgets sized for edge deployment and integration points to the nine-program catalog.',
};
