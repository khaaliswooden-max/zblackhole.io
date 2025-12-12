'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';

const platformsData: Record<string, {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  color: string;
  icon: string;
  features: { title: string; description: string }[];
  useCases: string[];
  techStack: string[];
  status: string;
  metrics: { label: string; value: string }[];
}> = {
  aureon: {
    name: 'Aureon',
    tagline: 'Procurement Substrate',
    description: 'AI-native infrastructure transforming how organizations discover, evaluate, and execute procurement at scale.',
    longDescription: 'Aureon is a revolutionary procurement platform that leverages multi-agent AI systems to optimize every stage of the procurement lifecycle. From intelligent supplier discovery to automated contract negotiation, Aureon transforms procurement from a cost center into a strategic advantage.',
    color: '#3b82f6',
    icon: '◈',
    features: [
      { title: 'FitIQ Matching', description: 'AI-powered supplier matching based on capability, reliability, and strategic fit.' },
      { title: 'Autonomous Negotiation', description: 'Multi-agent systems that negotiate optimal terms while maintaining compliance.' },
      { title: 'Predictive Analytics', description: 'Forecast supply chain disruptions and optimize inventory in real-time.' },
      { title: 'Global Sourcing', description: 'Access to verified suppliers across 180+ countries with trust verification.' },
    ],
    useCases: [
      'Enterprise procurement transformation',
      'Government contract optimization',
      'Supply chain resilience planning',
      'Sustainable sourcing initiatives',
    ],
    techStack: ['Solana', 'Multi-Agent AI', 'Zuup HQ Integration', 'ZUSDC Payments'],
    status: 'Active Development',
    metrics: [
      { label: 'Cost Reduction', value: '23%' },
      { label: 'Processing Time', value: '-65%' },
      { label: 'Supplier Match Rate', value: '94%' },
      { label: 'Compliance Rate', value: '99.7%' },
    ],
  },
  veyra: {
    name: 'Veyra',
    tagline: 'Autonomy OS',
    description: 'Orchestration layer for autonomous systems, enabling seamless human-machine collaboration.',
    longDescription: 'Veyra serves as the operating system for autonomous operations, providing a unified framework for coordinating AI agents, robotic systems, and human operators. Built for post-superintelligent coordination, Veyra ensures safe, transparent, and auditable autonomous decision-making.',
    color: '#f97316',
    icon: '◎',
    features: [
      { title: 'Agent Registry', description: 'Comprehensive registry for autonomous agents with capability attestations.' },
      { title: 'Human-in-Loop', description: 'Configurable intervention points for human oversight of autonomous decisions.' },
      { title: 'Decision Audit Trail', description: 'Complete transparency into AI decision-making with blockchain attestation.' },
      { title: 'Multi-System Coordination', description: 'Orchestrate heterogeneous autonomous systems under unified governance.' },
    ],
    useCases: [
      'Autonomous vehicle fleet management',
      'Industrial robotics coordination',
      'AI agent deployment governance',
      'Multi-robot task allocation',
    ],
    techStack: ['Rust', 'Solana', 'ROS2', 'Zuup HQ Attestations'],
    status: 'Beta',
    metrics: [
      { label: 'Agent Uptime', value: '99.99%' },
      { label: 'Decision Latency', value: '<50ms' },
      { label: 'Coordination Scale', value: '10K+ agents' },
      { label: 'Audit Coverage', value: '100%' },
    ],
  },
  civium: {
    name: 'Civium',
    tagline: 'Compliance Engine',
    description: 'Real-time regulatory intelligence and automated compliance verification for complex environments.',
    longDescription: 'Civium provides enterprise-grade compliance automation with a focus on Halal certification, regulatory compliance, and supply chain transparency. The platform continuously monitors regulatory changes and automatically updates compliance workflows.',
    color: '#a855f7',
    icon: '◇',
    features: [
      { title: 'Halal Compliance OS', description: 'Comprehensive halal certification tracking and verification system.' },
      { title: 'Regulatory Intelligence', description: 'AI-powered monitoring of regulatory changes across jurisdictions.' },
      { title: 'Automated Auditing', description: 'Continuous compliance verification with blockchain-backed evidence.' },
      { title: 'Supply Chain Tracing', description: 'End-to-end traceability from source to consumer with cryptographic proof.' },
    ],
    useCases: [
      'Halal food industry compliance',
      'Cross-border trade regulations',
      'Financial services compliance',
      'Healthcare regulatory adherence',
    ],
    techStack: ['Python', 'Solana', 'NLP Models', 'Zuup HQ'],
    status: 'Active Development',
    metrics: [
      { label: 'Jurisdictions', value: '45+' },
      { label: 'Compliance Accuracy', value: '99.2%' },
      { label: 'Update Latency', value: '<24hr' },
      { label: 'Audit Time Saved', value: '78%' },
    ],
  },
  relian: {
    name: 'Relian',
    tagline: 'AI Trust Infrastructure',
    description: 'Enterprise-grade AI reliability, governance, and trust verification for mission-critical deployments.',
    longDescription: 'Relian is the Global Refactoring OS—a comprehensive platform for ensuring AI system reliability, establishing governance frameworks, and providing cryptographic trust verification. Built on Zuup HQ, Relian enables organizations to deploy AI with confidence.',
    color: '#eab308',
    icon: '◆',
    features: [
      { title: 'Model Attestation', description: 'Cryptographic verification of AI model integrity and provenance.' },
      { title: 'Output Verification', description: 'Real-time validation of AI outputs against safety constraints.' },
      { title: 'Governance Framework', description: 'Configurable policies for AI deployment, access, and escalation.' },
      { title: 'Trust Scoring', description: 'Dynamic trust scores based on model performance and reliability history.' },
    ],
    useCases: [
      'Enterprise AI deployment',
      'Regulated industry AI adoption',
      'Multi-model orchestration',
      'AI safety and alignment verification',
    ],
    techStack: ['Solana', 'Zuup HQ', 'Python', 'Rust'],
    status: 'Production',
    metrics: [
      { label: 'Models Attested', value: '500+' },
      { label: 'Verification Speed', value: '<100ms' },
      { label: 'Trust Accuracy', value: '97.8%' },
      { label: 'Uptime', value: '99.99%' },
    ],
  },
  podx: {
    name: 'PodX',
    tagline: 'Mobile Data Centers',
    description: 'Rapidly deployable edge computing infrastructure for contested and austere environments.',
    longDescription: 'PodX delivers sovereign compute capability anywhere in the world. These mobile data centers are designed for rapid deployment in challenging environments—from disaster zones to forward operating bases—providing full-stack computing infrastructure in a ruggedized, transportable form factor.',
    color: '#06b6d4',
    icon: '⬡',
    features: [
      { title: 'Rapid Deployment', description: '72-hour setup time for full operational capability.' },
      { title: 'Air-Gapped Security', description: 'Complete network isolation capability for sensitive operations.' },
      { title: 'Edge AI Processing', description: 'On-premise AI inference and training without cloud dependency.' },
      { title: 'Resilient Design', description: 'MIL-SPEC ruggedization for extreme environmental conditions.' },
    ],
    useCases: [
      'Disaster response operations',
      'Military forward operations',
      'Remote industrial sites',
      'Sovereign cloud deployments',
    ],
    techStack: ['Custom Hardware', 'Kubernetes', 'Mesh Networking', 'Solar/Generator Power'],
    status: 'Limited Availability',
    metrics: [
      { label: 'Deployment Time', value: '72 hrs' },
      { label: 'Compute Density', value: '500 TFLOPS' },
      { label: 'Operating Temp', value: '-40°C to 55°C' },
      { label: 'Power Autonomy', value: '7 days' },
    ],
  },
  symbion: {
    name: 'Symbion',
    tagline: 'Gut-Brain Interface',
    description: 'Ingestible biosensors revolutionizing gut-brain axis research and personalized health.',
    longDescription: 'Symbion represents the frontier of biotech innovation—an ingestible biosensor platform that provides unprecedented insight into the gut-brain axis. By enabling continuous monitoring of gut microbiome activity and its neurological correlates, Symbion opens new possibilities for personalized medicine.',
    color: '#22c55e',
    icon: '◉',
    features: [
      { title: 'Ingestible Sensors', description: 'Biocompatible sensors for real-time gut environment monitoring.' },
      { title: 'Microbiome Analysis', description: 'Continuous microbiome composition and activity tracking.' },
      { title: 'Neural Correlates', description: 'Mapping gut signals to neurological and cognitive patterns.' },
      { title: 'Personalized Insights', description: 'AI-driven recommendations based on individual gut-brain profiles.' },
    ],
    useCases: [
      'Gut-brain axis research',
      'Personalized nutrition',
      'Mental health interventions',
      'Drug efficacy monitoring',
    ],
    techStack: ['Bioelectronics', 'ML/AI', 'Secure Data Pipeline', 'FDA-Compliant'],
    status: 'Research Phase',
    metrics: [
      { label: 'Sensor Life', value: '48 hrs' },
      { label: 'Data Points', value: '10K+/day' },
      { label: 'Biomarkers Tracked', value: '15+' },
      { label: 'Clinical Trials', value: 'Phase I' },
    ],
  },
  qawm: {
    name: 'QAWM',
    tagline: 'Quantum Archaeology',
    description: 'Applying quantum computing methodologies to reconstruct and analyze historical data patterns.',
    longDescription: 'QAWM (Quantum Archaeology Working Model) pioneers the application of quantum computing techniques to historical data reconstruction. By leveraging quantum algorithms for pattern recognition and data interpolation, QAWM enables unprecedented insights into incomplete historical records.',
    color: '#ec4899',
    icon: '⬢',
    features: [
      { title: 'Quantum Pattern Recognition', description: 'Quantum algorithms for identifying patterns in fragmentary data.' },
      { title: 'Historical Reconstruction', description: 'Probabilistic reconstruction of incomplete historical records.' },
      { title: 'Cross-Reference Analysis', description: 'Correlating disparate historical sources with quantum speedup.' },
      { title: 'Temporal Modeling', description: 'Advanced modeling of historical cause-effect relationships.' },
    ],
    useCases: [
      'Archaeological site analysis',
      'Ancient text reconstruction',
      'Historical climate modeling',
      'Genealogical research',
    ],
    techStack: ['Quantum Circuits', 'Classical-Quantum Hybrid', 'ML Integration', 'Cloud Quantum Access'],
    status: 'Experimental',
    metrics: [
      { label: 'Reconstruction Accuracy', value: '89%' },
      { label: 'Speedup Factor', value: '100x' },
      { label: 'Datasets Processed', value: '50+' },
      { label: 'Research Papers', value: '12' },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function PlatformPage() {
  const params = useParams();
  const platformName = params.name as string;
  const platform = platformsData[platformName?.toLowerCase()];

  if (!platform) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-zuup-void">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: platform.color }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: platform.color }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#platforms" className="hover:text-white/60 transition-colors">Platforms</Link>
              <span>/</span>
              <span style={{ color: platform.color }}>{platform.name}</span>
            </div>

            {/* Icon & Status */}
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="text-5xl"
                style={{ color: platform.color }}
              >
                {platform.icon}
              </div>
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${platform.color}20`,
                  color: platform.color 
                }}
              >
                {platform.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <span style={{ color: platform.color }}>{platform.name}</span>
            </h1>
            <div 
              className="text-xl font-mono tracking-wider mb-6"
              style={{ color: platform.color }}
            >
              {platform.tagline}
            </div>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl">
              {platform.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {platform.metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className="relative p-6 rounded-xl border border-white/10 bg-zuup-singularity/50 text-center"
              >
                <div 
                  className="text-3xl font-display font-bold mb-2"
                  style={{ color: platform.color }}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-white/40">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Key Features
            </h2>
            <p className="text-white/50">
              Core capabilities that define {platform.name}&apos;s value proposition.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {platform.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-xl border border-white/10 bg-zuup-singularity/80 p-6">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold mb-4"
                    style={{ 
                      backgroundColor: `${platform.color}20`,
                      color: platform.color 
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-zuup-accretion transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases & Tech Stack */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-zuup-singularity/80 p-8"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6">
                Use Cases
              </h3>
              <div className="space-y-4">
                {platform.useCases.map((useCase) => (
                  <div key={useCase} className="flex items-start gap-3">
                    <div 
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-white/70">{useCase}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-zuup-singularity/80 p-8"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {platform.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: `${platform.color}15`,
                      color: platform.color,
                      border: `1px solid ${platform.color}30`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl p-12">
            <div 
              className="absolute inset-0 opacity-20"
              style={{ 
                background: `linear-gradient(135deg, ${platform.color}40, transparent, ${platform.color}20)` 
              }}
            />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
                Interested in <span style={{ color: platform.color }}>{platform.name}</span>?
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                Learn how {platform.name} can transform your operations. 
                Schedule a demo or explore partnership opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/partner"
                  className="group relative px-8 py-4 rounded-full font-medium overflow-hidden"
                >
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="relative text-white flex items-center gap-2">
                    Request Demo
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other Platforms */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Explore Other Platforms
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {Object.entries(platformsData)
              .filter(([key]) => key !== platformName?.toLowerCase())
              .map(([key, p]) => (
                <motion.div key={key} variants={itemVariants}>
                  <Link
                    href={`/platforms/${key}`}
                    className="block p-4 rounded-xl border border-white/10 bg-zuup-singularity/50 hover:bg-zuup-singularity/80 transition-all group text-center"
                  >
                    <div 
                      className="text-2xl mb-2"
                      style={{ color: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div className="text-sm font-medium text-white group-hover:text-zuup-accretion transition-colors">
                      {p.name}
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-zuup-accretion via-zuup-gravitational to-zuup-hawking opacity-80 blur-sm" />
                <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-sm font-bold gradient-text">Z</span>
                </div>
              </div>
              <span className="text-sm text-white/60">
                © 2024 Zuup Innovation Lab. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
              <a href="https://github.com/khaaliswooden-max" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

