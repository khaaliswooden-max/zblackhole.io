export type AbstractSection = {
  heading: string;
  body: string;
};

export type ResearchPaper = {
  key: string;
  paperId: string;
  date: string;
  title: string;
  platformId: string | null;
  platformLabel: string;
  keywords: string[];
  sections: AbstractSection[];
  pdf: string;
  audioBase: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    key: 'master',
    paperId: 'WP-MA-01',
    date: '2025-03',
    title: 'Decentralized Trust Infrastructure for Multi-Platform AI Systems: The Zuup Nine-Program Architecture',
    platformId: 'ZHQ-01',
    platformLabel: 'Zuup HQ',
    keywords: ['Solana', 'RBAC', 'Attestation', 'Multi-agent systems', 'Trust infrastructure'],
    sections: [
      {
        heading: 'Background',
        body: 'Enterprise AI deployments suffer from fragmented trust layers, ad-hoc attestation, and siloed governance models that cannot compose across product boundaries. Existing blockchain-based solutions lack the throughput and composability required for real-time multi-agent workloads coordinating across nine or more independent programs. This paper describes a unified trust substrate designed to underpin the full Zuup platform catalog.',
      },
      {
        heading: 'Methods',
        body: 'Nine Solana programs were specified and deployed to devnet forming a layered trust substrate: role-based access control (RBAC) accounts, a SHA-256 content-addressed attestation registry, an inter-program invocation bus, and per-platform governance accounts. Performance measurements were taken on Solana devnet under synthetic multi-agent load spanning concurrent attestation writes, RBAC delegation events, and inter-program calls.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: The nine-program layout sustains 65,000 transactions per second on devnet with a 400 ms median block confirmation time. RBAC delegation completes within a single transaction. Content-addressed attestation anchoring costs $0.000025 per hash at the devnet fee schedule, enabling economically viable high-frequency provenance recording.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Cross-program invocation overhead under mainnet congestion is estimated from devnet measurements but has not been validated at production scale. ◯ Speculative: Long-term fee stability assumptions depend on Solana validator governance and network economics that remain subject to change.',
      },
    ],
    pdf: 'zuup-master-whitepaper.pdf',
    audioBase: 'zuup-master',
  },
  {
    key: 'ecosystem',
    paperId: 'WP-EC-02',
    date: '2025-02',
    title: 'Layered Governance Architecture for AI Product Ecosystems on Solana',
    platformId: 'ZHQ-01',
    platformLabel: 'Zuup HQ',
    keywords: ['Blockchain governance', 'Solana devnet', 'Attestation coverage', 'Delegation', 'Foundation layer'],
    sections: [
      {
        heading: 'Background',
        body: 'AI product ecosystems require governance that spans foundation security, trust propagation, and product-level decision rights. Existing L1 smart contract platforms either expose raw key management to product teams — creating unacceptable attack surface — or provide no structured delegation model at all. This paper presents a three-layer governance architecture that isolates each concern while preserving composability.',
      },
      {
        heading: 'Methods',
        body: 'Three layers are defined and deployed on Solana devnet: (1) Foundation Layer — validator identity and stake weight configuration; (2) Trust Layer — RBAC accounts and SHA-256 attestation with content-addressed storage references anchored per artifact; (3) Governance Layer — per-platform program accounts with delegated vote weight and configurable quorum thresholds. Deployment cost was measured using the Solana Program Framework on devnet.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: All three layers are deployed and operational on Solana devnet. Attestation coverage measured at 100% of submitted model artifacts during the evaluation period. Single-program-account deployment cost measured at $0.02 USD at the devnet fee schedule. Transaction flow and inter-layer attestation propagation were validated end-to-end.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Vote weight aggregation across the governance layer has been tested with up to 50 accounts; behavior at 10,000+ governance participants is modeled but unverified in practice. ◯ Speculative: Mainnet economics and validator incentive shifts may affect governance participation rates in ways not captured by devnet measurements.',
      },
    ],
    pdf: 'zuup-ecosystem.pdf',
    audioBase: 'zuup-chain',
  },
  {
    key: 'aureon',
    paperId: 'WP-AU-03',
    date: '2025-01',
    title: 'Multi-Agent Workflow Automation for FAR-Compliant Procurement: Solicitation Ingestion to Award Documentation',
    platformId: 'AU-02',
    platformLabel: 'Aureon',
    keywords: ['Federal Acquisition Regulation', 'Multi-agent systems', 'Procurement automation', 'Compliance gates', 'Solicitation parsing'],
    sections: [
      {
        heading: 'Background',
        body: 'Federal Acquisition Regulation (FAR) compliance remains a high-friction, manual process in US government and DoD procurement. Solicitation parsing error rates and delayed compliance checks regularly extend acquisition timelines by weeks. No published system automates the full pipeline from solicitation ingestion through supplier evaluation to obligation of funds while maintaining a continuous, on-chain compliance audit trail.',
      },
      {
        heading: 'Methods',
        body: 'Aureon deploys a multi-agent workflow graph using a directed acyclic task queue. Solicitations are parsed via structured extraction against FAR Parts 8, 12, and 15 and commercial item rules. Supplier evaluation agents apply configured scoring matrices that include regulatory, technical, and past-performance dimensions. Compliance gates run as mandatory checkpoints before any fund obligation event is triggered. Performance was measured using the APP-Bench benchmark suite on the devnet version against synthetic solicitation corpora.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: APP-Bench Composite Score (ACS) of 85 or above was achieved in internal testing against 200 synthetic solicitation documents spanning FAR Parts 8, 12, and 15. Multi-region routing was tested across three geographic nodes. ◐ Plausible: Compliance gate latency is projected at under 800 ms per solicitation at production load; load tests were conducted only at devnet scale.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Reward-shaping parameters for supplier risk scoring use proprietary training datasets that are not publicly released, limiting independent reproducibility. ◯ Speculative: Cross-margining behavior under adversarial or incomplete supplier profiles requires red-team validation before production deployment.',
      },
    ],
    pdf: 'aureon.pdf',
    audioBase: 'aureon',
  },
  {
    key: 'veyra',
    paperId: 'WP-VY-04',
    date: '2024-12',
    title: 'Inference Scheduling and Governance Logging for Post-Superintelligence Language Models under Planetary Latency Constraints',
    platformId: 'VY-03',
    platformLabel: 'Veyra',
    keywords: ['Post-superintelligence', 'Inference scheduling', 'Multi-sovereign deployment', 'Audit logging', 'Latency-aware systems'],
    sections: [
      {
        heading: 'Background',
        body: 'Post-superintelligence (post-SI) language model deployments operating across interplanetary or contested multi-sovereign contexts face a fundamental inference scheduling problem: ground control feedback latency ranges from 3 minutes (Mars opposition) to 22 minutes (Mars conjunction), making human-in-the-loop oversight infeasible for real-time inference decisions. No existing LLM deployment framework addresses schedule generation, rollback policy, and audit logging under these constraints at governance-grade confidence levels.',
      },
      {
        heading: 'Methods',
        body: 'Veyra defines a five-layer inference stack: (1) request queuing with latency-aware priority weights derived from signal propagation timing; (2) schedule generation with configurable autonomy windows and human-review thresholds; (3) rollback policy engine with cryptographic state snapshots at each decision boundary; (4) delayed governance review queue that accumulates decisions for asynchronous human audit; (5) on-chain attestation of completed inference decisions for sovereign audit compliance. Stack performance was evaluated against the V-Score benchmark family across seven workload profiles.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: Architecture and interface specifications were validated against all seven V-Score benchmark workload profiles. ◐ Plausible: Rollback recovery under a 100 ms target is achievable based on snapshot delta sizes measured in prototype testing; production validation requires integration with flight-qualified hardware.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Autonomy window governance parameters depend on multi-sovereign negotiation outcomes that are outside the technical scope of this specification and subject to policy processes. ◯ Speculative: Behavioral characteristics under post-SI model capability levels are modeled analytically; empirical validation awaits frontier model availability and access agreements.',
      },
    ],
    pdf: 'veyra.pdf',
    audioBase: 'veyra',
  },
  {
    key: 'podx',
    paperId: 'WP-PX-05',
    date: '2024-11',
    title: 'ISO-Container Mobile Data Center Architecture for Disconnected, Degraded, Intermittent, and Low-Bandwidth Operational Environments',
    platformId: 'PX-06',
    platformLabel: 'PodX',
    keywords: ['DDIL operations', 'Mobile data center', 'Edge computing', 'ISO container', 'Tactical computing'],
    sections: [
      {
        heading: 'Background',
        body: 'Military and humanitarian operations regularly require compute, storage, and network services in environments where commercial infrastructure is absent, degraded, or actively contested. Existing tactical edge compute solutions do not provide full data center capability within the ISO-container form factor, and no published system demonstrates continuous operation exceeding 24 hours without external power under representative field conditions.',
      },
      {
        heading: 'Methods',
        body: 'PodX specifies a containerized compute, power conditioning, cooling, and network stack within a 20-foot ISO container footprint. Benchmark validation uses the XdoP (Cross-Domain Operational Performance) framework, measuring the Workload Continuity Benchmark Index (WCBI), thermal variance under sustained load, and network reconnect latency following simulated disconnection events lasting up to 6 hours. Power envelope tests were conducted using both generator-sourced and solar-supplemented configurations in a laboratory environment designed to approximate field conditions.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: WCBI score of 100 achieved in controlled lab environment. Uptime target of 99.99% verified across a 72-hour continuous operation validation run. DDIL runtime exceeds 24 hours on internal power conditioning without external grid connection. ◐ Plausible: Power envelope figures for the ISO-container tier were measured in a controlled lab environment only; sustained field operation data from deployed units is pending.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Thermal performance at sustained ambient temperatures above 45°C has been modeled from component datasheets but has not been validated with a fully integrated unit under those conditions. ◯ Speculative: Integration with satellite communication tiers assumes commercial SATCOM availability that may be restricted or denied in actively contested environments.',
      },
    ],
    pdf: 'podx.pdf',
    audioBase: 'podx',
  },
  {
    key: 'relian',
    paperId: 'WP-RL-06',
    date: '2024-10',
    title: 'LLM-Assisted Large-Scale Codebase Migration with Symbolic Execution Validation and On-Chain Attestation',
    platformId: 'RL-05',
    platformLabel: 'Relian',
    keywords: ['Codebase migration', 'LLM code generation', 'Symbolic execution', 'On-chain attestation', 'Legacy modernization'],
    sections: [
      {
        heading: 'Background',
        body: 'Enterprise software portfolios carry billions of lines of legacy code written in COBOL, Fortran, and aging object-oriented languages. Manual migration engagements are cost-prohibitive, operationally high-risk, and consume years of engineering capacity per portfolio. Existing automated translation tools achieve acceptable correctness rates only for narrow language pairs and uniformly require extensive post-migration manual review, eliminating most of the cost advantage.',
      },
      {
        heading: 'Methods',
        body: 'Relian implements a three-stage migration pipeline: (1) semantic parse of legacy source files into a language-neutral intermediate representation that preserves control flow, data structure, and side-effect semantics; (2) LLM-assisted code generation from the intermediate representation to target language modules with configurable style and idiom preferences; (3) symbolic execution tests run against input-output contract specifications extracted during the parse stage. Each promoted migration batch generates a SHA-256 hash anchored to Solana devnet via on-chain attestation. Performance was evaluated against the Migration Quality benchmark measuring the Fidelity Score (FS) and the Transformation Integrity Index (TII).',
      },
      {
        heading: 'Results',
        body: '✓ Verified: Migration throughput measured at 100× faster than expert manual migration on an equivalent test code corpus. Total cost reduction of 99% compared to professional services baseline on the internal evaluation corpus. ◐ Plausible: The risk model covers 85% of identified legacy anti-patterns; the remaining 15% of patterns require case-by-case expert review before attestation.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: LLM output quality is sensitive to prompt engineering and to the training data coverage of the target language; less common target languages may yield lower TII scores without additional fine-tuning. ◯ Speculative: Correctness guarantees for concurrent and stateful code patterns rely on symbolic test coverage that may be incomplete for production-scale state machines with large or unbounded state spaces.',
      },
    ],
    pdf: 'relian.pdf',
    audioBase: 'relian',
  },
  {
    key: 'symbion',
    paperId: 'WP-SB-07',
    date: '2024-09',
    title: 'Wireless Capsule Biosensor Platform for Real-Time Gut-Brain Axis Biomarker Monitoring: Firmware Architecture and Clinical Validation Protocol',
    platformId: 'SB-07',
    platformLabel: 'Symbion',
    keywords: ['Gut-brain axis', 'Ingestible biosensor', 'Biomarker monitoring', 'Clinical validation', 'Edge firmware'],
    sections: [
      {
        heading: 'Background',
        body: 'Emerging evidence links gut microbiome composition to neurological and psychiatric outcomes through bidirectional gut-brain signaling pathways. Continuous in-vivo biomarker monitoring within the gastrointestinal tract requires miniaturized sensors, low-power wireless telemetry, encrypted mobile relay, and a clinical-grade cloud pipeline — capabilities that have not previously been integrated into a single validated platform targeting the gut-brain axis specifically.',
      },
      {
        heading: 'Methods',
        body: 'Symbion deploys an ingestible capsule carrying a four-biomarker sensor panel targeting pH, temperature, serotonin precursor metabolites, and short-chain fatty acid proxies relevant to gut-brain signaling. Capsule firmware transmits AES-encrypted payloads via Bluetooth Low Energy (BLE) to a companion mobile application. The mobile ingestion path relays time-series data to a cloud pipeline for storage, segmentation, and longitudinal analysis aligned to clinical study protocols. Clinical Validation Score (CVS) was evaluated under the Symbion Clinical Benchmark framework measuring sensitivity, specificity, and signal-to-noise ratio under simulated gastrointestinal transit conditions.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: All four biomarker sensor specifications match Symbion prototype hardware documentation. Sensitivity of 92.5% and specificity of 94.3% achieved in bench testing under simulated gastrointestinal transit conditions. ◐ Plausible: BLE transmission range validated in open-air bench environment; in-vivo propagation through biological tissue is modeled from published BLE-in-body literature but not yet clinically confirmed.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Week-level microbiome shift forecast models require prospective clinical validation with real patient cohorts before regulatory submission. ◯ Speculative: Causal inference from biomarker time-series to neurological outcomes depends on longitudinal clinical data that has not yet been collected at statistically sufficient scale.',
      },
    ],
    pdf: 'symbion.pdf',
    audioBase: 'symbion',
  },
  {
    key: 'qal',
    paperId: 'WP-QAL-08',
    date: '2024-08',
    title: 'Layered Causal Inference for Probabilistic Reconstruction of Historical System States from Sparse Observational Records',
    platformId: 'QAL-08',
    platformLabel: 'QAL',
    keywords: ['Causal inference', 'State reconstruction', 'Sparse data', 'Posterior estimation', 'Quantum archeology'],
    sections: [
      {
        heading: 'Background',
        body: 'Reconstructing past states of complex systems — from organizational event histories to physical substrate measurements — is a fundamental challenge in intelligence analysis, forensic investigation, and long-horizon planning. Existing causal inference frameworks assume continuous or well-sampled observational data; none address the problem of state reconstruction under extreme sparsity, where only trace-level measurements survive and the generating process must be inferred from indirect evidence.',
      },
      {
        heading: 'Methods',
        body: 'QAL defines a five-layer causal model: (1) Physical Trace Layer — raw measurement artifacts and their provenance; (2) Event Reconstruction Layer — probabilistic event timing derived from trace distributions and decay models; (3) State Estimation Layer — system state posteriors over configurable reconstruction windows; (4) Hypothesis Layer — competing explanations ranked by posterior probability and Bayesian evidence weight; (5) Metasystem Layer — governance of reconstruction confidence reporting, coverage limits, and uncertainty disclosure. A domain-specific query language (QL) exposes each layer\'s posterior distributions to downstream consumers with explicit uncertainty bounds. Reconstruction accuracy was evaluated against the QAWM Fidelity benchmark using known ground-truth historical datasets.',
      },
      {
        heading: 'Results',
        body: '✓ Verified: Five-layer architecture is fully specified and the QL query surface is defined with typed return structures. ◐ Plausible: Posterior coverage estimates were validated against synthetic datasets with known ground truth across three distinct reconstruction domains, showing fidelity consistent with the QAWM benchmark targets.',
      },
      {
        heading: 'Limitations',
        body: '◐ Plausible: Coverage limits for real-world sparse records depend on domain-specific artifact survival rates that vary significantly across application contexts and cannot be generalized from synthetic benchmarks alone. ◯ Speculative: Metasystem-layer confidence calibration in adversarially incomplete or fabricated record sets has not been evaluated empirically and represents an open research problem.',
      },
    ],
    pdf: 'qal.pdf',
    audioBase: 'qal',
  },
  {
    key: 'orb',
    paperId: 'WP-ORB-XR',
    date: '2024-07',
    title: '3D Gaussian Splatting for Persistent Spatial World Models: Edge Deployment and Language Model Coupling across the Zuup Catalog',
    platformId: null,
    platformLabel: 'Cross-Platform',
    keywords: ['3D Gaussian splatting', 'Spatial world models', 'Edge inference', 'Language model coupling', 'Persistent environments'],
    sections: [
      {
        heading: 'Background',
        body: 'Persistent spatial representations for AI agents require efficient 3D scene encoding, real-time querying, and seamless integration with language model reasoning chains. Neural radiance fields (NeRF) achieve high reconstruction fidelity but are compute-prohibitive at edge-tier hardware. Point cloud representations lack the semantic richness required for agent reasoning. 3D Gaussian Splatting (3DGS) offers a compact, GPU-renderable, differentiable scene representation, but no published deployment framework integrates 3DGS with language model inference pipelines at edge-scale compute budgets sized for field-deployable hardware.',
      },
      {
        heading: 'Methods',
        body: 'Orb defines a spatial world-model stack using 3DGS as the primary scene representation. Scenes are captured via multi-view camera rigs, compressed using a learned Gaussian parameter reduction, and persisted across sessions in a content-addressed spatial store. A language model coupling layer (LM) exposes scene semantics — object identity, spatial relationships, and temporal change detection — through a structured query interface consumed by Aureon, Veyra, Civium, PodX, QAL, Symbion, and Relian. Compute budgets were sized for the PodX edge tier using the ISO-container GPU allocation profile. Reconstruction quality is evaluated against PSNR and SSIM baselines from the published 3DGS literature.',
      },
      {
        heading: 'Results',
        body: '◐ Plausible: 3DGS reconstruction quality at edge-tier compute budgets is projected from published benchmark results scaled to the target GPU allocation; direct Orb stack measurements are pending hardware integration and are not yet independently verified. The LM coupling interface has been specified and structurally validated against the nine-program catalog integration points.',
      },
      {
        heading: 'Limitations',
        body: '◯ Speculative: Real-time scene update rates under concurrent writes from multiple agents have not been empirically evaluated and depend on spatial index implementation details not yet finalized. ◯ Speculative: Performance in dynamic environments — moving objects, variable lighting, atmospheric distortion — requires scene-flow augmentation modules that are specified but not yet implemented.',
      },
    ],
    pdf: 'orb.pdf',
    audioBase: 'orb',
  },
];
