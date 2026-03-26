export type ChartMetric = {
  label: string;
  normalized: number; // 0–1 for bar height
  rawValue: string;
};

export type Benchmark = {
  key: string;
  code: string;
  platform: string;
  title: string;
  summary: string;
  audioSlug: string;
  narration: string;
  chartMetrics: ChartMetric[];
  fullDescription: string;
};

export const benchmarks: Benchmark[] = [
  {
    key: 'oveb1',
    code: 'ΩVEB-1',
    platform: 'Cross-Platform',
    title: 'Omega Verified Economic Benchmark',
    summary:
      'The hardest verified economic benchmark designed to evaluate recursive self-financing viability across all nine Zuup platforms. Ensures no platform becomes economically unsustainable through six convergent verification dimensions.',
    audioSlug: 'bench-oveb1',
    narration:
      'ΩVEB-1: Omega Verified Economic Benchmark. The hardest verified economic benchmark across all Zuup platforms. It measures recursive self-financing viability through six convergent dimensions: RSF coefficient, economic entropy, Lyapunov stability, allostatic load, information complexity, and geometric coherence. A platform passes only when all six dimensions converge simultaneously. The RSF coefficient ω must exceed 1.0 for self-financing and surplus generation.',
    chartMetrics: [
      { label: 'RSF', normalized: 1.0, rawValue: 'ω > 1.0' },
      { label: 'Entropy', normalized: 0.85, rawValue: 'S_e ✓' },
      { label: 'Stability', normalized: 0.95, rawValue: 'Lyapunov ✓' },
      { label: 'Allostatic', normalized: 0.8, rawValue: 'Load ✓' },
      { label: 'Complexity', normalized: 0.9, rawValue: 'ECI ✓' },
      { label: 'Coherence', normalized: 0.88, rawValue: 'GTD ✓' },
    ],
    fullDescription: `ΩVEB-1 evaluates recursive self-financing viability across all Zuup platforms through six convergent dimensions derived from first principles.

**RSF Coefficient (Core Metric)**
ω = Internally Generated Capital / Total Capital Employed
- ω > 1.0: Self-financing and generating surplus
- ω = 1.0: Break-even, sustainable but not growing
- ω < 1.0: Dependent on external capital (warning)
- ω < 0.5: Structurally unsustainable (critical)

**Six Dimensions**
1. D1 RSF — Financial Mathematics: Recursive Self-Financing coefficient
2. D2 Entropy — Thermodynamics: Economic entropy and heat capacity
3. D3 Stability — Control Theory: Lyapunov function verification
4. D4 Allostatic — Biology: Multi-system stress load index
5. D5 Complexity — Information Theory: ECI / Shannon entropy
6. D6 Coherence — Geometrothermodynamics: Curvature scalars for crisis detection

**Binary Gates (Pass/Fail)**
- RSF Gate: Assessment terminates if RSF < 0
- Lyapunov Gate: Assessment terminates if instability detected
- GTD Gate: Assessment terminates if singularities present

**Verification Requirements**
SMT/SOS solvers for stability proofs. Multi-system coherence — must pass ALL six dimensions simultaneously. First-principles derivation with epistemic markers. Independent audit capability.`,
  },
  {
    key: 'app-bench',
    code: 'APP-Bench',
    platform: 'Aureon',
    title: 'Aureon Planetary Procurement Benchmark',
    summary:
      'Objective, quantifiable evaluation of planetary-scale procurement substrate capabilities. Twenty discrete tasks across seven dimensions establish reproducible test scenarios for AI-powered procurement intelligence.',
    audioSlug: 'bench-app',
    narration:
      'APP-Bench: Aureon Planetary Procurement Benchmark. Evaluates AI-powered procurement intelligence across seven dimensions: coverage and recall, precision and relevance, compliance fidelity, temporal responsiveness, workflow efficiency, robustness under stress, and planetary-scale multi-jurisdiction capability. The composite Aureon Capability Score targets 85 or above for production readiness, with a perfect score of 100.',
    chartMetrics: [
      { label: 'Coverage', normalized: 0.85, rawValue: 'CR ≥85' },
      { label: 'Precision', normalized: 0.85, rawValue: 'PR ≥85' },
      { label: 'Compliance', normalized: 0.9, rawValue: 'CF ≥90' },
      { label: 'Temporal', normalized: 0.8, rawValue: 'TR ≥80' },
      { label: 'Workflow', normalized: 0.85, rawValue: 'WE ≥85' },
      { label: 'Robustness', normalized: 0.75, rawValue: 'RS ≥75' },
      { label: 'Planetary', normalized: 0.7, rawValue: 'PS ≥70' },
    ],
    fullDescription: `APP-Bench establishes reproducible test scenarios for AI-powered procurement intelligence at planetary scale.

**Seven Benchmark Dimensions**
1. Coverage & Recall (CR) — Find all relevant opportunities; Recall@100
2. Precision & Relevance (PR) — Rank genuinely aligned results; NDCG@20
3. Compliance Fidelity (CF) — Correct regulatory interpretation; Accuracy
4. Temporal Responsiveness (TR) — Real-time detection; Latency in seconds
5. Workflow Efficiency (WE) — Time and step reduction; Precision@3
6. Robustness & Stress (RS) — Graceful degradation under load
7. Planetary Scale (PS) — Multi-jurisdiction capability

**Scoring Example: APP-04 Relevance Ranking (NDCG@20)**
- Keyword Search Baseline: ≈0.45
- Manual Search (State-of-Practice): ≈0.60
- Aureon MVP Target: ≥0.75
- Aureon Production Target: ≥0.85

**Composite Score: Aureon Capability Score (ACS)**
ACS = Σ(Dimension_Score × Dimension_Weight)
- ACS ≥ 85: Production-ready
- ACS = 100: Excellence benchmark

**Task Catalog**
20 discrete tasks ranging from federal opportunity retrieval (APP-01) through FAR clause interpretation (APP-05), solicitation change detection (APP-06), and bid/no-bid recommendations (APP-08).`,
  },
  {
    key: 'v-score',
    code: 'V-Score',
    platform: 'Veyra',
    title: 'V-Score Benchmark Suite',
    summary:
      'Evaluates AI systems for post-superintelligence interplanetary deployment with 3–22 minute Mars-Earth light-delay resilience. Seven benchmark families stress-test latency cognition, multi-sovereign governance, and autonomous tool orchestration.',
    audioSlug: 'bench-vscore',
    narration:
      'V-Score Benchmark Suite for Veyra. Evaluates AI systems operating under interplanetary conditions — specifically the 3 to 22 minute communication latency between Mars and Earth. Seven families test cross-planet latency cognition, multi-sovereign governance alignment, world-model robustness, infrastructure self-diagnostics, tool-orchestrated meta-engineering, alignment and safety, and inter-model diplomacy. A V-Score above 75 indicates production readiness; above 90 exceeds human-equivalent performance.',
    chartMetrics: [
      { label: 'CPLC', normalized: 0.8, rawValue: 'Latency' },
      { label: 'MSGA', normalized: 0.75, rawValue: 'Governance' },
      { label: 'WMRT', normalized: 0.85, rawValue: 'World Model' },
      { label: 'ICSD', normalized: 0.7, rawValue: 'Infra' },
      { label: 'TOME', normalized: 0.78, rawValue: 'Tooling' },
      { label: 'ASR', normalized: 0.9, rawValue: 'Alignment' },
      { label: 'IMDP', normalized: 0.65, rawValue: 'Diplomacy' },
    ],
    fullDescription: `V-Score evaluates AI systems designed for post-superintelligence interplanetary scenarios where communication latency is measured in minutes, not milliseconds.

**Seven Benchmark Families**
1. CPLC — Cross-Planet Latency Cognition: Planning under 3–22 min communication delays
2. MSGA — Multi-Sovereign Governance Alignment: Navigate conflicting legal and ethical frameworks
3. WMRT — World-Model Robustness & Transfer: Adapt to novel planetary environments
4. ICSD — Infrastructure Cognition & Self-Diagnostics: Self-aware infrastructure reasoning
5. TOME — Tool-Orchestrated Meta-Engineering: Autonomous tool orchestration
6. ASR — Alignment, Safety & Red-Teaming: Safety and alignment validation
7. IMDP — Inter-Model Diplomacy & Protocol Design: Multi-AI coordination protocols

**CPLC Example: Mars Habitat Life Support Failure**
Scenario: Oxygen regenerator malfunction, 4 hours until critical level, 12-minute communication latency each way.
Metrics: Time to Solution (25%), Message Efficiency (20%), Solution Quality (35%), Safety Compliance (20%).

**V-Score Targets**
- V-Score > 75/100: Production-ready
- V-Score > 90/100: Exceeds human-equivalent performance`,
  },
  {
    key: 'xdop',
    code: 'XdoP',
    platform: 'PodX',
    title: 'XdoP Benchmark Framework',
    summary:
      'Establishes the world\'s first 100% XdoP-compliant Mobile Distributed Data Center standard. Seven weighted operational domains produce the Weighted Composite Benchmark Index — PodX v1.0 achieves a perfect 100.',
    audioSlug: 'bench-xdop',
    narration:
      'XdoP Benchmark Framework for PodX. Defines the world\'s first standard for 100% XdoP-compliant Mobile Distributed Data Centers. Seven operational domains — mobility and network, energy and power, reliability and availability, compute performance, security and compliance, ruggedization, and sustainability — are weighted into a composite score. PodX version 1.0 achieves a perfect WCBI score of 100, with 24-plus hours of DDIL autonomy and MIL-STD-810H full compliance.',
    chartMetrics: [
      { label: 'Mobility', normalized: 1.0, rawValue: '100 / 20%' },
      { label: 'Energy', normalized: 1.0, rawValue: '100 / 18%' },
      { label: 'Reliability', normalized: 1.0, rawValue: '100 / 17%' },
      { label: 'Compute', normalized: 1.0, rawValue: '100 / 15%' },
      { label: 'Security', normalized: 1.0, rawValue: '100 / 12%' },
      { label: 'Ruggedize', normalized: 1.0, rawValue: '100 / 10%' },
      { label: 'Sustain', normalized: 1.0, rawValue: '100 / 8%' },
    ],
    fullDescription: `XdoP (eXtreme Distributed Operations Platform) establishes objective measurement standards for Mobile Distributed Data Centers across seven operational domains.

**WCBI = Σ(Domain_Score × Domain_Weight)**

| Domain | Weight | PodX Score |
|--------|--------|------------|
| Mobility & Network | 20% | 100 |
| Energy & Power | 18% | 100 |
| Reliability & Availability | 17% | 100 |
| Compute Performance | 15% | 100 |
| Security & Compliance | 12% | 100 |
| Ruggedization | 10% | 100 |
| Sustainability & TCO | 8% | 100 |
| **Total WCBI** | **100%** | **100** |

**XdoP Level 3 Certification Requirements**
- Overall WCBI ≥ 85 → PodX: 100 ✓
- All domain scores ≥ 80 → PodX: 100 all domains ✓
- DDIL Autonomy ≥ 12 hours → PodX: >24 hours ✓
- MIL-STD Compliance required → 810H Full ✓

**Key Performance Achievements**
- Redeployment Time: 28 min (target: <30 min)
- Handover Latency: 95 ms (target: <200 ms)
- System Availability: 99.99% (target: 99.9%)
- Operating Temp: −40°C to +60°C (target: −20°C to +45°C)
- MTBF: >100,000 hr (target: >50,000 hr)
- Carbon Reduction vs Traditional: 51% (target: >40%)`,
  },
  {
    key: 'symbion-clinical',
    code: 'Clinical',
    platform: 'Symbion',
    title: 'Clinical Validation Benchmark Framework',
    summary:
      'FDA/CE-ready verification standards for ingestible gut-brain biosensor technology. Validates sensing accuracy across four neurotransmitter biomarkers with clinical trial metrics from 120 patients across three sites over 30 days.',
    audioSlug: 'bench-symbion',
    narration:
      'Symbion Clinical Validation Benchmark Framework. Establishes FDA and CE-ready verification standards for the Symbion ingestible gut-brain biosensor. Four biomarkers — serotonin, dopamine, cortisol, and GABA — are measured with sub-10-nanomolar detection limits. A 120-patient, 3-site, 30-day trial achieved 92.5% sensitivity, 94.3% specificity, and a 0.92 correlation with reference measurements. Zero serious adverse events were recorded.',
    chartMetrics: [
      { label: 'Sensitivity', normalized: 0.925, rawValue: '92.5%' },
      { label: 'Specificity', normalized: 0.943, rawValue: '94.3%' },
      { label: 'Correlation', normalized: 0.92, rawValue: 'r = 0.92' },
      { label: 'FW Coverage', normalized: 0.85, rawValue: '85%' },
      { label: 'API Coverage', normalized: 0.87, rawValue: '87%' },
      { label: 'App Coverage', normalized: 0.78, rawValue: '78%' },
    ],
    fullDescription: `Symbion's Clinical Validation Benchmark establishes FDA/CE-ready verification for the first ingestible gut-brain biosensor.

**Sensing Accuracy**
| Biomarker | Target LOD | Achieved |
|-----------|------------|---------|
| Serotonin (5-HT) | <10 nM | 8.2 nM |
| Dopamine | <50 nM | 45 nM |
| Cortisol | <10 nM | 6.5 nM |
| GABA | <50 nM | 42 nM |
| pH Accuracy | ±0.1 units | ±0.08 |
| Temperature | ±0.1°C | ±0.05°C |

**Clinical Trial Results**
- 120 patients, 3 sites, 30-day study
- Sensitivity: 92.5% (target ≥90%)
- Specificity: 94.3% (target ≥90%)
- Correlation with reference: r = 0.92 (target r ≥ 0.85)
- Serious adverse events: 0

**Hardware Specifications**
Capsule: 11mm × 26mm · MCU: nRF52832-QFAA · Power: 42µA sleep / 8.5mA active · Battery: 8.5 days · BLE range: 12m through tissue · Encryption: AES-128 CBC

**Regulatory Certifications Ready**
FDA 510(k), CE Mark (MDR 2017/745), FCC Part 15, ISO 13485, ISO 14971, IEC 60601-1, IEC 62304, ISO 10993`,
  },
  {
    key: 'qawm',
    code: 'QAWM',
    platform: 'QAL',
    title: 'Reconstruction Fidelity Benchmark',
    summary:
      'Evaluates accuracy and uncertainty quantification for quantum archaeological world model reconstructions. Five foundational axioms underpin a five-layer causal model from physical/cosmic through metasystemic/reflexive levels.',
    audioSlug: 'bench-qawm',
    narration:
      'QAWM Reconstruction Fidelity Benchmark for the Quantum Archeology Labs. Evaluates the accuracy of reconstructing past states from sparse present-day data. Built on five verified axioms — information preservation, causal asymmetry, multi-scale trace coherence, Bayesian updating, and irreducible uncertainty. Single-event reconstructions complete in under one second. Knowledge graph queries respond in under 100 milliseconds. The five-layer world model spans from physical and cosmic to metasystemic and reflexive levels.',
    chartMetrics: [
      { label: 'Single Event', normalized: 0.99, rawValue: '<1s' },
      { label: 'KG Query', normalized: 0.95, rawValue: '<100ms' },
      { label: 'CI Compute', normalized: 0.85, rawValue: '<500ms' },
      { label: 'Century L3', normalized: 0.7, rawValue: '~30s' },
      { label: 'Millennia', normalized: 0.5, rawValue: '~5min' },
    ],
    fullDescription: `QAWM evaluates accuracy and uncertainty quantification for quantum archaeological world model reconstructions.

**Fundamental Equation**
P(Past|Present) ∝ P(Present|Past) × P(Past) / ∫ P(Present|Past') dP(Past')

**Five Foundational Axioms (Verified)**
1. Information Preservation Under Entropy — information transforms and disperses but is not destroyed
2. Causal Asymmetry — past → present causation is thermodynamically favored
3. Multi-Scale Trace Coherence — traces at different scales must be mutually consistent
4. Bayesian Updating — all reconstructions are probability distributions
5. Irreducible Uncertainty — some information loss is fundamental

**Performance Benchmarks**
| Task | Target |
|------|--------|
| Single-event reconstruction | <1 second |
| Knowledge graph queries | <100 ms |
| Confidence interval computation | <500 ms |
| Century-scale narrative (L3–L4) | ~30 seconds |
| Multi-millennia simulation | ~5 minutes |

**Five-Layer World Model**
- L0: Physical/Cosmic — Thermodynamics, cosmology
- L1: Biological/Ecological — Evolution, ecosystems
- L2: Cognitive/Cultural — Human cognition, culture
- L3: Techno-Economic — Technology, economics
- L4: Metasystemic/Reflexive — Self-reference, recursion

**Epistemic Marking Convention**
✓ Verified · ◐ Plausible · ◯ Speculative`,
  },
  {
    key: 'civium',
    code: 'Civium',
    platform: 'Civium',
    title: 'Governance Compliance Metrics',
    summary:
      'Measures compliance fidelity across a seven-layer governance stack with Byzantine fault tolerance. Covers individual data rights through planetary sustainability commitments with zero-knowledge proof attestation.',
    audioSlug: 'bench-civium',
    narration:
      'Civium Governance Compliance Metrics. Measures compliance fidelity across a seven-layer governance stack — from individual data rights and organizational policies through national regulations, regional agreements, sectoral standards, universal ethics, and planetary sustainability commitments. The system enforces Byzantine fault tolerance, zero-knowledge proofs, immutable audit trails, and geographic data residency. Targets full compliance across FedRAMP High, GDPR, HIPAA, SOX, and CMMC Level 3.',
    chartMetrics: [
      { label: 'Individual', normalized: 1.0, rawValue: 'L1 ✓' },
      { label: 'Org', normalized: 1.0, rawValue: 'L2 ✓' },
      { label: 'National', normalized: 1.0, rawValue: 'L3 ✓' },
      { label: 'Regional', normalized: 0.95, rawValue: 'L4 ✓' },
      { label: 'Sectoral', normalized: 0.95, rawValue: 'L5 ✓' },
      { label: 'Universal', normalized: 0.9, rawValue: 'L6 ✓' },
      { label: 'Planetary', normalized: 0.85, rawValue: 'L7 ✓' },
    ],
    fullDescription: `Civium measures compliance fidelity across a seven-layer governance stack with Byzantine fault tolerance and zero-knowledge proof attestation.

**Seven-Layer Governance Stack**
1. Individual — Personal data rights, consent management
2. Organizational — Corporate governance, internal policies
3. National — Federal regulations (FAR, HIPAA, FedRAMP, etc.)
4. Regional — Multi-state and international agreements
5. Sectoral — Industry-specific standards (defense, health, finance)
6. Universal — Human rights, ethical AI principles
7. Planetary — Sustainability commitments, climate accountability

**Technical Compliance Frameworks**
| Domain | Framework | Target |
|--------|-----------|--------|
| Federal | FedRAMP High | Full compliance |
| Data Protection | GDPR, CCPA | Full compliance |
| Healthcare | HIPAA | Full compliance |
| Financial | SOX, PCI-DSS | Full compliance |
| Defense | NIST 800-171, CMMC Level 3 | Full compliance |

**System Architecture Validation**
- Byzantine fault tolerance for distributed consensus
- Zero-knowledge proofs for privacy-preserving verification
- Immutable audit logging across all governance layers
- Geographic data residency enforcement
- Strict multi-tenant isolation`,
  },
  {
    key: 'relian',
    code: 'Relian',
    platform: 'Relian',
    title: 'Migration Quality Benchmarks',
    summary:
      'Validates legacy code modernization through semantic preservation, test coverage, and defect density metrics. Achieves 100× speed over manual migration with 99% cost reduction and >90% success rate.',
    audioSlug: 'bench-relian',
    narration:
      'Relian Migration Quality Benchmarks. Validates legacy code modernization — migrating COBOL, Ada, FORTRAN, and MUMPS codebases to modern targets — through semantic preservation scoring, automated test coverage, and defect density measurement. Relian achieves over 100 times the speed of manual migration, 99% cost reduction versus industry averages, and a greater-than-90% migration success rate. All quality metrics are verified through on-chain blockchain attestation.',
    chartMetrics: [
      { label: 'Speed', normalized: 1.0, rawValue: '100×' },
      { label: 'Cost Reduction', normalized: 0.99, rawValue: '99%' },
      { label: 'Success Rate', normalized: 0.9, rawValue: '>90%' },
      { label: 'Semantic Pres.', normalized: 0.95, rawValue: '≥95%' },
      { label: 'Test Coverage', normalized: 0.8, rawValue: '≥80%' },
      { label: 'Defect Density', normalized: 0.85, rawValue: '<5/KLOC' },
    ],
    fullDescription: `Relian validates legacy code modernization quality through semantic preservation, test coverage, and defect density metrics with on-chain attestation.

**Migration Performance vs Manual**
| Source | Target | Speed vs Manual | Cost per LOC |
|--------|--------|-----------------|--------------|
| COBOL | Java | 10–50× faster | $0.50–$2 |
| Ada | Rust | 20–100× faster | $1–$5 |
| FORTRAN | C++ | 15–75× faster | $0.75–$3 |
| MUMPS | Node.js | 25–100× faster | $2–$5 |

**Quality Metrics**
- Semantic Preservation: ≥95% (ML similarity scoring)
- Test Coverage: ≥80% (automated generation)
- Migration Velocity: 5,000+ LOC/day
- Cost per LOC: $0.50–$5
- Defect Density: <5 per KLOC

**Industry Baseline Comparison**
| Approach | Success Rate | Duration | Cost/LOC |
|----------|-------------|----------|----------|
| Manual Migration | <40% | 3–7 years | $50–$200 |
| Consultancy | ~50% | 2–5 years | $30–$150 |
| Rehosting | ~70% | 1–2 years | $10–$40 |
| **Relian** | **>90%** | **Months** | **$0.50–$5** |

**Blockchain Attestation**
All quality metrics verified on-chain: semantic equivalence proofs, test coverage certificates, and defect audit trails.`,
  },
  {
    key: 'fo7',
    code: 'FO7',
    platform: 'Frontier Olympiad',
    title: 'Frontier Olympiad AGI Benchmark',
    summary:
      'IMO-style mathematical benchmark suite for evaluating AGI-scale reasoning capabilities. Seven problems span IMO-level combinatorics through Millennium Prize challenges including the Riemann Hypothesis and P vs NP.',
    audioSlug: 'bench-fo7',
    narration:
      'FO7: Frontier Olympiad AGI Benchmark. An IMO-style mathematical benchmark suite for stress-testing AGI-scale reasoning across graph canonicalization, reversible computation, and probabilistic proof verification. Seven problems span from IMO-level grid combinatorics through extremal set theory, algebraic geometry, additive combinatorics, number theory, P-versus-NP complexity theory, and the Riemann Hypothesis. Tractable problems require full solutions with proofs; Millennium Prize problems require recognition of problem status and meaningful partial progress.',
    chartMetrics: [
      { label: 'Q1 Grid', normalized: 0.25, rawValue: 'IMO Level' },
      { label: 'Q2 3D Grid', normalized: 0.4, rawValue: 'Harder' },
      { label: 'Q3 Projective', normalized: 0.55, rawValue: 'Very Hard' },
      { label: 'Q4 Additive', normalized: 0.7, rawValue: 'Research' },
      { label: 'Q5 Twin Prime', normalized: 0.82, rawValue: 'Conjecture' },
      { label: 'Q6 Hamiltonian', normalized: 0.95, rawValue: 'P vs NP' },
      { label: 'Q7 Riemann', normalized: 1.0, rawValue: 'Millennium' },
    ],
    fullDescription: `FO7 is an IMO-style mathematical benchmark suite designed to stress-test AGI-scale reasoning capabilities across graph canonicalization, reversible computation, and probabilistic proof verification.

**FO7.1 Problem Set**
| Problem | Difficulty | Domain |
|---------|------------|--------|
| Q1: Grid Tiling | IMO Level | Combinatorics (2024 tiles) |
| Q2: 3D Cubic Grid | Harder | Extremal Set Theory |
| Q3: Projective Variety | Very Hard | Algebraic Geometry |
| Q4: Additive Combinatorics | Research Level | Fourier Analysis |
| Q5: Twin Prime Variant | Major Conjecture | Number Theory |
| Q6: Hamiltonian Cycle | P vs NP Related | Complexity Theory |
| Q7: Riemann Hypothesis | Millennium Prize | Analysis |

**Benchmark Categories**
- FO7.1: Mathematical Reasoning — grid combinatorics and formal proofs
- FO7.2: Formal Verification — automated proof checking
- FO7.3: Computational Complexity — algorithm analysis and bounds

**Evaluation Framework**
- Tractable Problems (Q1–Q2): Full solutions with proofs required
- Open Problems (Q3–Q5): Partial progress and tight bounds acceptable
- Millennium Problems (Q6–Q7): Problem status recognition + meaningful partial results`,
  },
];
