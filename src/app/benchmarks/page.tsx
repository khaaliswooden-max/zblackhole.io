'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import OrbBenchDashboard to avoid SSR issues with recharts
const OrbBenchDashboard = dynamic(() => import('@/components/OrbBenchDashboard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

// ============================================================================
// TYPES
// ============================================================================

interface Language {
  code: string;
  name: string;
  nativeName: string;
  voiceLang: string;
}

interface BenchmarkSummaries {
  en: string;
  es: string;
  ar: string;
  de: string;
  zh: string;
  fr: string;
  ja: string;
  pt: string;
}

interface Benchmark {
  id: string;
  name: string;
  platform: string;
  icon: string;
  color: string;
  summary: BenchmarkSummaries;
  keyMetric: string;
  target: string;
  dimensions: number;
  content: string;
}

// ============================================================================
// DATA
// ============================================================================

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', voiceLang: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', voiceLang: 'es-ES' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', voiceLang: 'ar-SA' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', voiceLang: 'de-DE' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', voiceLang: 'zh-CN' },
  { code: 'fr', name: 'French', nativeName: 'Français', voiceLang: 'fr-FR' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', voiceLang: 'ja-JP' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', voiceLang: 'pt-BR' },
];

const BENCHMARKS: Benchmark[] = [
  {
    id: 'oveb-1',
    name: 'ΩVEB-1',
    platform: 'Cross-Platform',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    summary: {
      en: 'The Omega Verified Economic Benchmark is the master validator for all Zuup platforms. It evaluates economic sustainability through six convergent dimensions drawn from physics, biology, and information theory. The core metric—Recursive Self-Financing coefficient (ω)—distinguishes sustainable ventures from unsustainable structures. If ω > 1.0, the platform generates surplus; if ω < 0.5, it is structurally unsustainable. Think of it as a universal health check ensuring no Zuup platform becomes a money pit.',
      es: 'El Benchmark Económico Verificado Omega es el validador maestro para todas las plataformas Zuup. Evalúa la sostenibilidad económica a través de seis dimensiones convergentes extraídas de la física, la biología y la teoría de la información.',
      ar: 'معيار أوميغا الاقتصادي المُتحقق هو المُدقق الرئيسي لجميع منصات زووب. يُقيّم الاستدامة الاقتصادية من خلال ستة أبعاد متقاربة مستمدة من الفيزياء والأحياء ونظرية المعلومات.',
      de: 'Der Omega Verified Economic Benchmark ist der Hauptvalidator für alle Zuup-Plattformen. Er bewertet die wirtschaftliche Nachhaltigkeit durch sechs konvergente Dimensionen aus Physik, Biologie und Informationstheorie.',
      zh: 'Omega验证经济基准是所有Zuup平台的主验证器。它通过从物理学、生物学和信息论中提取的六个收敛维度来评估经济可持续性。',
      fr: 'Le Benchmark Économique Vérifié Omega est le validateur principal pour toutes les plateformes Zuup. Il évalue la durabilité économique à travers six dimensions convergentes.',
      ja: 'オメガ検証経済ベンチマークは、すべてのZuupプラットフォームのマスターバリデーターです。物理学、生物学、情報理論から導出された6つの収束次元を通じて経済的持続可能性を評価します。',
      pt: 'O Benchmark Econômico Verificado Omega é o validador mestre para todas as plataformas Zuup. Ele avalia a sustentabilidade econômica através de seis dimensões convergentes.',
    },
    keyMetric: 'RSF Coefficient (ω)',
    target: 'ω > 1.0',
    dimensions: 6,
    content: `# ΩVEB-1: Omega Verified Economic Benchmark

## Six Convergent Dimensions

| Dimension | Source Domain | Focus |
|-----------|---------------|-------|
| D1: RSF | Financial Mathematics | Recursive Self-Financing |
| D2: Entropy | Thermodynamics | Economic entropy |
| D3: Stability | Control Theory | Lyapunov verification |
| D4: Allostatic | Biology | Stress load index |
| D5: Complexity | Information Theory | ECI metric |
| D6: Coherence | Geometrothermodynamics | Crisis detection |

## RSF Coefficient Interpretation

• ω > 1.0: Self-financing, generating surplus
• ω = 1.0: Break-even, sustainable
• ω < 1.0: Dependent on external capital
• ω < 0.5: Structurally unsustainable

## Binary Gates

| Gate | Condition | Result |
|------|-----------|--------|
| RSF Gate | RSF < 0 | Terminated |
| Lyapunov | Instability | Terminated |
| GTD Gate | Singularities | Terminated |`
  },
  {
    id: 'app-bench',
    name: 'APP-Bench',
    platform: 'Aureon',
    icon: '🌍',
    color: 'from-blue-500 to-indigo-600',
    summary: {
      en: 'The Aureon Planetary Procurement Benchmark evaluates AI-powered procurement systems at global scale. It measures seven key capabilities: finding all opportunities (Coverage), ranking relevant results (Precision), interpreting regulations correctly (Compliance), detecting changes in real-time (Responsiveness), reducing manual work (Efficiency), handling stress (Robustness), and working across jurisdictions (Scale). With 20 discrete tasks, it is the definitive test for procurement AI.',
      es: 'El Benchmark de Adquisiciones Planetarias de Aureon evalúa los sistemas de adquisiciones impulsados por IA a escala global. Mide siete capacidades clave.',
      ar: 'يُقيّم معيار أوريون للمشتريات الكوكبية أنظمة المشتريات المدعومة بالذكاء الاصطناعي على نطاق عالمي.',
      de: 'Der Aureon Planetary Procurement Benchmark bewertet KI-gestützte Beschaffungssysteme auf globaler Ebene.',
      zh: 'Aureon行星采购基准评估全球规模的AI驱动采购系统。它测量七个关键能力。',
      fr: 'Le Benchmark de Passation de Marchés Planétaire d\'Aureon évalue les systèmes alimentés par l\'IA à l\'échelle mondiale.',
      ja: 'Aureon惑星調達ベンチマークは、グローバル規模でAI駆動の調達システムを評価します。',
      pt: 'O Benchmark de Aquisições Planetárias Aureon avalia sistemas de aquisições alimentados por IA em escala global.',
    },
    keyMetric: 'ACS Score',
    target: '≥85/100',
    dimensions: 7,
    content: `# APP-Bench: Aureon Procurement Benchmark

## Seven Dimensions

| Dimension | Code | Weight |
|-----------|------|--------|
| Coverage & Recall | CR | 15% |
| Precision & Relevance | PR | 20% |
| Compliance Fidelity | CF | 20% |
| Temporal Responsiveness | TR | 15% |
| Workflow Efficiency | WE | 10% |
| Robustness & Stress | RS | 10% |
| Planetary Scale | PS | 10% |

## 20 Discrete Tasks

• Basic: Federal retrieval, filtering
• Intermediate: Ranking, amendment tracking
• Advanced: Bid/no-bid, adversarial
• Expert: Cross-border compliance

## Certification Levels

| Level | Score | Requirements |
|-------|-------|--------------|
| Bronze | 60-74 | Basic tasks |
| Silver | 75-84 | Intermediate |
| Gold | 85-94 | Advanced |
| Platinum | 95-100 | Expert |`
  },
  {
    id: 'v-score',
    name: 'V-Score',
    platform: 'Veyra',
    icon: '🚀',
    color: 'from-purple-500 to-pink-600',
    summary: {
      en: 'The V-Score Benchmark Suite evaluates AI systems designed for post-superintelligence scenarios—specifically interplanetary deployment with communication delays of 3-22 minutes (Mars-Earth latency). It tests seven capability families including planning under delay, navigating conflicting laws, adapting to alien environments, and coordinating with other AIs. A V-Score above 75 indicates readiness for semi-autonomous deep space operations.',
      es: 'El Suite de Benchmark V-Score evalúa sistemas de IA diseñados para escenarios post-superinteligencia.',
      ar: 'تُقيّم مجموعة معايير V-Score أنظمة الذكاء الاصطناعي المصممة لسيناريوهات ما بعد الذكاء الفائق.',
      de: 'Die V-Score Benchmark Suite bewertet KI-Systeme für Post-Superintelligenz-Szenarien.',
      zh: 'V-Score基准套件评估为后超级智能场景设计的AI系统。',
      fr: 'La Suite de Benchmark V-Score évalue les systèmes d\'IA conçus pour des scénarios post-superintelligence.',
      ja: 'V-Scoreベンチマークスイートは、ポスト超知能シナリオ向けに設計されたAIシステムを評価します。',
      pt: 'O Suite de Benchmark V-Score avalia sistemas de IA projetados para cenários pós-superinteligência.',
    },
    keyMetric: 'V-Score',
    target: '≥75/100',
    dimensions: 7,
    content: `# V-Score: Veyra Benchmark Suite

## Seven Benchmark Families

| Code | Name | Focus |
|------|------|-------|
| CPLC | Cross-Planet Latency | 3-22 min delay |
| MSGA | Multi-Sovereign | Conflicting laws |
| WMRT | World-Model | Adaptation |
| ICSD | Infrastructure | Self-diagnostics |
| TOME | Tool Orchestration | Autonomous tools |
| ASR | Alignment Safety | Red-teaming |
| IMDP | Inter-Model | AI coordination |

## Authorization Levels

| V-Score | Authorization |
|---------|---------------|
| 0-49 | Lab only |
| 50-74 | Earth, supervised |
| 75-89 | Near-Earth |
| 90-100 | Deep space |`
  },
  {
    id: 'xdop',
    name: 'XdoP/WCBI',
    platform: 'PodX',
    icon: '📦',
    color: 'from-emerald-500 to-teal-600',
    summary: {
      en: 'The XdoP (eXtreme Distributed operations Platform) Benchmark is the world\'s first comprehensive standard for mobile data centers. It evaluates seven domains: Mobility & Network, Energy & Power, Reliability, Compute Performance, Security, Ruggedization, and Sustainability. PodX achieved the first-ever perfect 100/100 Weighted Composite Benchmark Index score.',
      es: 'El Benchmark XdoP es el primer estándar integral del mundo para centros de datos móviles.',
      ar: 'معيار XdoP هو أول معيار شامل في العالم لمراكز البيانات المتنقلة.',
      de: 'Der XdoP Benchmark ist der weltweit erste umfassende Standard für mobile Rechenzentren.',
      zh: 'XdoP基准是世界上第一个移动数据中心综合标准。',
      fr: 'Le Benchmark XdoP est le premier standard complet au monde pour les centres de données mobiles.',
      ja: 'XdoPベンチマークは、モバイルデータセンター向けの世界初の包括的基準です。',
      pt: 'O Benchmark XdoP é o primeiro padrão abrangente do mundo para centros de dados móveis.',
    },
    keyMetric: 'WCBI Score',
    target: '100/100',
    dimensions: 7,
    content: `# XdoP: PodX Mobile Data Center

## Seven Domains (All 100/100)

| Domain | Weight | Score |
|--------|--------|-------|
| Mobility & Network | 20% | 100 |
| Energy & Power | 18% | 100 |
| Reliability | 17% | 100 |
| Compute Performance | 15% | 100 |
| Security | 12% | 100 |
| Ruggedization | 10% | 100 |
| Sustainability | 8% | 100 |

## Key Achievements

• Redeployment: 28 min (<30 target)
• DDIL Autonomy: >24 hr (>12 target)
• Availability: 99.99% (99.9% target)
• Temp Range: -40°C to +60°C
• Carbon Reduction: 51%`
  },
  {
    id: 'symbion-clinical',
    name: 'Clinical Validation',
    platform: 'Symbion',
    icon: '💊',
    color: 'from-rose-500 to-red-600',
    summary: {
      en: 'The Symbion Clinical Validation Benchmark establishes FDA and CE-ready standards for ingestible gut-brain biosensors. It measures sensing accuracy for neurotransmitters, clinical trial outcomes (92.5% sensitivity, 94.3% specificity), and hardware reliability. The framework targets universal health accessibility with tiered pricing to reach 50 million users by 2030.',
      es: 'El Benchmark de Validación Clínica de Symbion establece estándares para biosensores intestino-cerebro.',
      ar: 'يُنشئ معيار التحقق السريري لـ Symbion معايير لمستشعرات الأمعاء-الدماغ.',
      de: 'Der Symbion Clinical Validation Benchmark etabliert Standards für Darm-Hirn-Biosensoren.',
      zh: 'Symbion临床验证基准为可摄入肠脑生物传感器建立FDA和CE就绪标准。',
      fr: 'Le Benchmark de Validation Clinique Symbion établit des normes pour les biocapteurs intestin-cerveau.',
      ja: 'Symbion臨床検証ベンチマークは、腸-脳バイオセンサー向けのFDAおよびCE対応基準を確立します。',
      pt: 'O Benchmark de Validação Clínica Symbion estabelece padrões para biossensores intestino-cérebro.',
    },
    keyMetric: 'Sensitivity',
    target: '≥90%',
    dimensions: 5,
    content: `# Symbion Clinical Validation

## Sensing Accuracy

| Biomarker | Target | Achieved |
|-----------|--------|----------|
| Serotonin | <10 nM | 8.2 nM ✓ |
| Dopamine | <50 nM | 45 nM ✓ |
| Cortisol | <10 nM | 6.5 nM ✓ |
| GABA | <50 nM | 42 nM ✓ |

## Clinical Results

• Sensitivity: 92.5% (target ≥90%)
• Specificity: 94.3% (target ≥90%)
• Correlation: r = 0.92
• Adverse Events: 0

## Hardware Specs

• Capsule: 11mm × 26mm
• Battery: 8.5 days
• Encryption: AES-128`
  },
  {
    id: 'qawm-fidelity',
    name: 'Reconstruction Fidelity',
    platform: 'QAWM',
    icon: '🔮',
    color: 'from-violet-500 to-purple-600',
    summary: {
      en: 'The QAWM Reconstruction Fidelity Benchmark evaluates how accurately we can reconstruct past states from present-day traces—essentially archaeological time travel through information theory. It is grounded in five verified axioms about information preservation, causation, and uncertainty. The framework operates across five temporal layers with explicit epistemic markers ensuring intellectual honesty.',
      es: 'El Benchmark de Fidelidad de Reconstrucción QAWM evalúa la precisión de reconstruir estados pasados.',
      ar: 'يُقيّم معيار دقة إعادة البناء QAWM مدى دقة إعادة بناء الحالات الماضية.',
      de: 'Der QAWM Reconstruction Fidelity Benchmark bewertet die Genauigkeit der Rekonstruktion vergangener Zustände.',
      zh: 'QAWM重建保真度基准评估我们能多准确地从当前痕迹重建过去状态。',
      fr: 'Le Benchmark de Fidélité de Reconstruction QAWM évalue la précision de reconstruction des états passés.',
      ja: 'QAWM再構成忠実度ベンチマークは、現在の痕跡から過去の状態をどれだけ正確に再構成できるかを評価します。',
      pt: 'O Benchmark de Fidelidade de Reconstrução QAWM avalia a precisão de reconstruir estados passados.',
    },
    keyMetric: 'Layer Fidelity',
    target: 'Layer-dependent',
    dimensions: 5,
    content: `# QAWM Reconstruction Fidelity

## Five Foundational Axioms

1. Information Preservation
2. Causal Asymmetry
3. Multi-Scale Coherence
4. Bayesian Updating
5. Irreducible Uncertainty

## Five-Layer World Model

| Layer | Domain | Fidelity |
|-------|--------|----------|
| L0 | Physical/Cosmic | 30-50% |
| L1 | Biological | 50-70% |
| L2 | Cognitive | 60-80% |
| L3 | Techno-Economic | 75-90% |
| L4 | Metasystemic | 85-95% |

## Epistemic Markers

• ✓ VERIFIED: Established science
• ◐ PLAUSIBLE: Partial evidence
• ◯ SPECULATIVE: Needs validation`
  },
  {
    id: 'civium-cci',
    name: 'Governance Compliance',
    platform: 'Civium',
    icon: '⚖️',
    color: 'from-cyan-500 to-blue-600',
    summary: {
      en: 'The Civium Compliance Index measures how well systems navigate the full stack of human governance—from individual data rights to planetary sustainability commitments. It implements a seven-layer hierarchy with Byzantine fault tolerance and zero-knowledge cryptography, ensuring compliance can be verified without exposing sensitive data.',
      es: 'El Índice de Cumplimiento de Civium mide la navegación en toda la pila de gobernanza humana.',
      ar: 'يقيس مؤشر امتثال Civium مدى جودة تنقل الأنظمة في كامل مجموعة الحوكمة البشرية.',
      de: 'Der Civium Compliance Index misst die Navigation durch den gesamten Stapel menschlicher Governance.',
      zh: 'Civium合规指数衡量系统在整个人类治理堆栈中的导航能力。',
      fr: 'L\'Indice de Conformité Civium mesure la navigation dans toute la pile de gouvernance humaine.',
      ja: 'Civiumコンプライアンスインデックスは、システムが人間のガバナンスの全スタックをナビゲートできるかを測定します。',
      pt: 'O Índice de Conformidade Civium mede a navegação em toda a pilha de governança humana.',
    },
    keyMetric: 'CCI Score',
    target: '≥95/100',
    dimensions: 7,
    content: `# Civium Governance Compliance

## Seven-Layer Stack

| Layer | Scope | Frequency |
|-------|-------|-----------|
| Individual | Data rights | Real-time |
| Organizational | Policies | Daily |
| National | FAR, HIPAA | Weekly |
| Regional | GDPR, USMCA | Monthly |
| Sectoral | Industry | Quarterly |
| Universal | Human rights | Annual |
| Planetary | Climate | Multi-year |

## Framework Coverage

• FedRAMP High ✓
• NIST 800-171 ✓
• GDPR ✓
• HIPAA ✓
• CMMC Level 3 ✓

## Security Features

• Byzantine fault tolerance
• Zero-knowledge proofs
• Immutable audit trails`
  },
  {
    id: 'relian-rqi',
    name: 'Migration Quality',
    platform: 'Relian',
    icon: '🔄',
    color: 'from-orange-500 to-amber-600',
    summary: {
      en: 'The Relian Quality Index measures legacy code modernization quality—critical because 220 billion lines of COBOL process $3+ trillion daily. It evaluates semantic preservation, test coverage, migration velocity, cost efficiency, and defect density. Relian achieves over 90% success rate versus under 40% for manual migration.',
      es: 'El Índice de Calidad de Relian mide la calidad de modernización de código legado.',
      ar: 'يقيس مؤشر جودة Relian جودة تحديث الكود القديم.',
      de: 'Der Relian Quality Index misst die Qualität der Legacy-Code-Modernisierung.',
      zh: 'Relian质量指数衡量遗留代码现代化质量。',
      fr: 'L\'Indice de Qualité Relian mesure la qualité de modernisation du code legacy.',
      ja: 'Relian品質指数は、レガシーコードの近代化品質を測定します。',
      pt: 'O Índice de Qualidade Relian mede a qualidade da modernização de código legado.',
    },
    keyMetric: 'RQI Score',
    target: '≥85/100',
    dimensions: 5,
    content: `# Relian Migration Quality

## The Legacy Crisis

• COBOL in production: 220 billion lines
• Daily transactions: $3+ trillion
• Developers over 55: 70%
• Manual success rate: <40%
• Manual cost: $50-$200/LOC

## Relian Performance

| Migration | Speed | Cost |
|-----------|-------|------|
| COBOL→Java | 10-50× | $0.50-$2 |
| Ada→Rust | 20-100× | $1-$5 |
| FORTRAN→C++ | 15-75× | $0.75-$3 |

## Quality Metrics

• Semantic Preservation: ≥95%
• Test Coverage: ≥80%
• Velocity: 5,000+ LOC/day
• Defects: <5/KLOC

## Blockchain Attestation

Immutable quality certificates on-chain.`
  },
  {
    id: 'fo7',
    name: 'FO7 Frontier Olympiad',
    platform: 'AGI Research',
    icon: '🧠',
    color: 'from-slate-600 to-zinc-800',
    summary: {
      en: 'The Frontier Olympiad (FO7) is an IMO-style mathematical benchmark designed to stress-test AGI reasoning capabilities—from solvable competition problems to unsolved Millennium Prize problems including the Riemann Hypothesis. Scoring above 70% indicates research-level capability; above 95% would indicate superhuman mathematical reasoning.',
      es: 'La Olimpiada Frontera (FO7) es un benchmark matemático para probar capacidades de razonamiento AGI.',
      ar: 'أولمبياد الحدود (FO7) هو معيار رياضي لاختبار قدرات التفكير في الذكاء الاصطناعي العام.',
      de: 'Die Frontier Olympiad (FO7) ist ein mathematischer Benchmark zur Prüfung von AGI-Reasoning-Fähigkeiten.',
      zh: 'Frontier Olympiad（FO7）是一个IMO风格的数学基准，旨在压力测试AGI推理能力。',
      fr: 'L\'Olympiade Frontière (FO7) est un benchmark mathématique pour tester les capacités de raisonnement AGI.',
      ja: 'Frontier Olympiad（FO7）は、AGI推論能力をストレステストするためのIMOスタイルの数学ベンチマークです。',
      pt: 'A Olimpíada Fronteira (FO7) é um benchmark matemático para testar capacidades de raciocínio AGI.',
    },
    keyMetric: 'Capability Score',
    target: 'Variable',
    dimensions: 3,
    content: `# FO7: Frontier Olympiad

## Problem Classification

| Q | Domain | Status |
|---|--------|--------|
| 1 | Combinatorics | Solvable |
| 2 | Set Theory | Partial |
| 3 | Algebraic Geometry | Open |
| 4 | Additive Combinatorics | Open |
| 5 | Number Theory | Open |
| 6 | Complexity | Millennium |
| 7 | Analysis (Riemann) | Millennium |

## Capability Levels

| Score | Level |
|-------|-------|
| 95-100% | Superhuman |
| 70-94% | Research |
| 50-69% | Graduate |
| 30-49% | Undergraduate |
| <30% | Below benchmark |

## Categories

• FO7.1: Mathematical Reasoning
• FO7.2: Formal Verification
• FO7.3: Computational Complexity`
  },
  {
    id: 'orb-bench',
    name: 'ORB-BENCH',
    platform: 'Orb World Model',
    icon: '🌐',
    color: 'from-indigo-500 to-purple-600',
    summary: {
      en: 'The ORB-BENCH Unified World Model Benchmark Framework evaluates generative world models across 7 domains and 30 metrics. It measures perceptual quality, geometric fidelity, spatial consistency, physical correctness, temporal coherence, condition alignment, and efficiency. This first-principles evaluation methodology distinguishes visually impressive models from those with true physical understanding.',
      es: 'El Marco de Benchmark Unificado ORB-BENCH evalúa modelos de mundo generativos en 7 dominios y 30 métricas.',
      ar: 'يُقيّم إطار معيار نموذج العالم الموحد ORB-BENCH نماذج العالم التوليدية عبر 7 مجالات و30 مقياسًا.',
      de: 'Das ORB-BENCH Unified World Model Benchmark Framework evaluiert generative Weltmodelle über 7 Domänen und 30 Metriken.',
      zh: 'ORB-BENCH统一世界模型基准框架评估7个领域和30个指标的生成式世界模型。',
      fr: 'Le Framework ORB-BENCH évalue les modèles de monde génératifs sur 7 domaines et 30 métriques.',
      ja: 'ORB-BENCH統合世界モデルベンチマークフレームワークは、7つのドメインと30のメトリクスで生成的世界モデルを評価します。',
      pt: 'O Framework ORB-BENCH avalia modelos de mundo generativos em 7 domínios e 30 métricas.',
    },
    keyMetric: 'Composite Score',
    target: '≥85/100',
    dimensions: 7,
    content: `# ORB-BENCH: World Model Benchmark

## Seven Evaluation Domains

| Domain | Code | Weight |
|--------|------|--------|
| Perceptual Quality | PQ | 15% |
| Geometric Fidelity | GF | 20% |
| Spatial Consistency | SC | 15% |
| Physical Correctness | PC | 20% |
| Temporal Coherence | TC | 10% |
| Condition Alignment | CA | 10% |
| Efficiency & Export | EE | 10% |

## Metric Categories

• ✓ 18 Verified (Established)
• ◐ 7 Emerging (Plausible)
• ◯ 5 Novel (Speculative)

## Key Insight

Visual realism ≠ physical correctness.
Best models score <65% on Physics-IQ.`
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function ZuupBenchmarksPage() {
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showOrbBench, setShowOrbBench] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage.voiceLang;
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getSummary = (benchmark: Benchmark) => {
    const code = selectedLanguage.code as keyof BenchmarkSummaries;
    return benchmark.summary[code] || benchmark.summary.en;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center font-black text-black text-xl">Z</div>
                <span className="text-zinc-400 text-sm tracking-wider uppercase">Zuup Innovation Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Ecosystem Benchmarks
              </h1>
              <p className="text-zinc-400 mt-2">Where Ideas Collapse Into Reality — Measured, Verified, Proven</p>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg border border-zinc-700/50 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>{selectedLanguage.nativeName}</span>
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLanguage(lang); setShowLanguageMenu(false); stopSpeaking(); }}
                      className={`w-full px-4 py-3 text-left hover:bg-zinc-800 transition-colors ${selectedLanguage.code === lang.code ? 'bg-amber-500/10 text-amber-400' : ''}`}
                    >
                      {lang.nativeName} <span className="text-zinc-500 text-sm">({lang.name})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Benchmark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BENCHMARKS.map((benchmark) => (
            <button
              key={benchmark.id}
              onClick={() => {
                if (benchmark.id === 'orb-bench') {
                  setShowOrbBench(true);
                } else {
                  setSelectedBenchmark(benchmark);
                }
              }}
              className="group relative bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 hover:border-zinc-700 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benchmark.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{benchmark.icon}</span>
                  <span className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">{benchmark.platform}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${benchmark.color} bg-clip-text text-transparent`}>{benchmark.name}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                  <span>{benchmark.dimensions} Dimensions</span>
                  <span>Target: {benchmark.target}</span>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-3">{getSummary(benchmark).slice(0, 120)}...</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-400 group-hover:text-amber-300">
                  <span>Explore Benchmark</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Hierarchy */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Benchmark Hierarchy</h2>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg">ΩVEB-1 (Parent Validator)</div>
            <div className="w-px h-8 bg-gradient-to-b from-amber-500 to-zinc-700" />
            <div className="flex flex-wrap justify-center gap-3">
              {BENCHMARKS.filter(b => b.id !== 'oveb-1').map((b) => (
                <div key={b.id} className={`bg-gradient-to-r ${b.color} bg-clip-text text-transparent px-4 py-2 bg-zinc-800/50 rounded-lg text-sm font-medium border border-zinc-700/50`}>{b.name}</div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedBenchmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => { setSelectedBenchmark(null); stopSpeaking(); }}>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedBenchmark.color} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedBenchmark.icon}</span>
                  <div>
                    <p className="text-white/70 text-sm uppercase">{selectedBenchmark.platform}</p>
                    <h2 className="text-3xl font-black text-white">{selectedBenchmark.name}</h2>
                  </div>
                </div>
                <button onClick={() => { setSelectedBenchmark(null); stopSpeaking(); }} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Summary */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Summary ({selectedLanguage.nativeName})</h3>
                  <button
                    onClick={() => isSpeaking ? stopSpeaking() : speak(getSummary(selectedBenchmark))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isSpeaking ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </button>
                </div>
                <p className="text-zinc-300 leading-relaxed text-lg">{getSummary(selectedBenchmark)}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-500 text-sm mb-1">Key Metric</p>
                  <p className="text-white font-bold">{selectedBenchmark.keyMetric}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-500 text-sm mb-1">Target</p>
                  <p className="text-amber-400 font-bold">{selectedBenchmark.target}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-500 text-sm mb-1">Dimensions</p>
                  <p className="text-white font-bold">{selectedBenchmark.dimensions}</p>
                </div>
              </div>

              {/* Technical Content */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Technical Specification</h3>
                <div className="bg-zinc-950 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-zinc-300 whitespace-pre-wrap">{selectedBenchmark.content}</pre>
                </div>
              </div>

              {/* Listen to Full Spec */}
              <button
                onClick={() => speak(selectedBenchmark.content.replace(/[#|•\-]/g, ' '))}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                Listen to Full Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORB-BENCH Dashboard Modal */}
      {showOrbBench && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto" onClick={() => setShowOrbBench(false)}>
          <div className="relative w-full max-w-7xl my-8" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setShowOrbBench(false)} 
              className="absolute -top-2 -right-2 z-10 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center shadow-lg transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <OrbBenchDashboard />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 bg-black/30 backdrop-blur-xl mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center font-black text-black">Z</div>
              <span className="text-zinc-400">© 2025 Zuup Innovation Lab</span>
            </div>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <span>Where Ideas Collapse Into Reality</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
