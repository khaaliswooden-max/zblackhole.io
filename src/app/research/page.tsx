'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const publications = [
  {
    title: 'Decentralized Trust Infrastructure for Enterprise AI Systems',
    authors: ['K. Wooden', 'Z. Research Team'],
    date: 'November 2024',
    category: 'Trust & Governance',
    abstract: 'A comprehensive framework for implementing role-based access control and cryptographic attestations in enterprise AI deployments using Solana blockchain infrastructure.',
    tags: ['Blockchain', 'RBAC', 'AI Trust', 'Solana'],
    color: '#3b82f6',
    href: '#',
  },
  {
    title: 'Quadratic Voting Mechanisms for DAO Governance at Scale',
    authors: ['Z. Research Team'],
    date: 'October 2024',
    category: 'Governance',
    abstract: 'Analysis of quadratic voting implementations with time-locked execution and futarchy prediction markets for decentralized autonomous organizations.',
    tags: ['Governance', 'Quadratic Voting', 'DAOs', 'Futarchy'],
    color: '#a855f7',
    href: '#',
  },
  {
    title: 'Stablecoin Design Patterns: Atomic Operations and Reserve Verification',
    authors: ['K. Wooden', 'Z. Research Team'],
    date: 'September 2024',
    category: 'DeFi',
    abstract: 'Technical specifications for fully-collateralized stablecoins with atomic mint/burn operations and on-chain reserve verification mechanisms.',
    tags: ['Stablecoin', 'DeFi', 'Collateralization', 'Solana'],
    color: '#22c55e',
    href: '#',
  },
  {
    title: 'Edge Computing Architecture for Contested Environments',
    authors: ['PodX Research Division'],
    date: 'August 2024',
    category: 'Infrastructure',
    abstract: 'Design principles for rapidly deployable mobile data centers optimized for austere and contested operational environments.',
    tags: ['Edge Computing', 'Infrastructure', 'Defense', 'Mobile DC'],
    color: '#06b6d4',
    href: '#',
  },
  {
    title: 'Gut-Brain Axis: Biosensor Data Integration Protocols',
    authors: ['Symbion Research'],
    date: 'July 2024',
    category: 'Biotech',
    abstract: 'Novel approaches to ingestible biosensor data collection and analysis for gut-brain axis research and personalized health interventions.',
    tags: ['Biosensors', 'Gut-Brain', 'Health Tech', 'Data Integration'],
    color: '#22c55e',
    href: '#',
  },
  {
    title: 'AI Procurement Optimization: A Multi-Agent Approach',
    authors: ['Aureon Research'],
    date: 'June 2024',
    category: 'AI/ML',
    abstract: 'Multi-agent reinforcement learning systems for enterprise procurement optimization with real-time market analysis and supplier evaluation.',
    tags: ['AI', 'Procurement', 'Multi-Agent', 'Optimization'],
    color: '#3b82f6',
    href: '#',
  },
];

const researchAreas = [
  {
    title: 'Trust Infrastructure',
    description: 'Blockchain-based systems for verifiable trust, attestations, and access control in enterprise environments.',
    icon: '◆',
    color: '#eab308',
  },
  {
    title: 'Decentralized Governance',
    description: 'Novel voting mechanisms, treasury management, and coordination systems for DAOs and organizations.',
    icon: '◎',
    color: '#a855f7',
  },
  {
    title: 'Autonomous Systems',
    description: 'Human-machine collaboration frameworks and orchestration layers for autonomous operations.',
    icon: '◈',
    color: '#f97316',
  },
  {
    title: 'Distributed Computing',
    description: 'Edge computing, mobile data centers, and resilient infrastructure for contested environments.',
    icon: '⬡',
    color: '#06b6d4',
  },
];

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

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen bg-zuup-void">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-zuup-hawking/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-zuup-gravitational/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-hawking border border-zuup-hawking/30 bg-zuup-hawking/5 mb-6">
              RESEARCH & PUBLICATIONS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-white">Advancing the </span>
              <span className="gradient-text">Frontier</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              Our research spans blockchain infrastructure, decentralized governance, autonomous systems, 
              and human-machine collaboration. Explore our latest publications and working papers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Research Areas
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Our interdisciplinary approach bridges theoretical foundations with practical implementations.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {researchAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={itemVariants}
                className="relative p-6 rounded-xl border border-white/10 bg-zuup-singularity/50 hover:bg-zuup-singularity/80 transition-all group"
              >
                <div 
                  className="text-3xl mb-4"
                  style={{ color: area.color }}
                >
                  {area.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-zuup-accretion transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-white/50">{area.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Publications */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-gravitational border border-zuup-gravitational/30 bg-zuup-gravitational/5 mb-6">
              PUBLICATIONS
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Latest Research
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Working papers, technical specifications, and research findings from the Zuup Innovation Lab.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {publications.map((pub, index) => (
              <motion.article
                key={pub.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-white/10 bg-zuup-singularity/80 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Color Bar */}
                    <div 
                      className="hidden md:block w-1 h-full min-h-[120px] rounded-full"
                      style={{ backgroundColor: pub.color }}
                    />
                    
                    <div className="flex-1">
                      {/* Category & Date */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${pub.color}20`,
                            color: pub.color 
                          }}
                        >
                          {pub.category}
                        </span>
                        <span className="text-xs text-white/40">{pub.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-zuup-accretion transition-colors">
                        {pub.title}
                      </h3>

                      {/* Authors */}
                      <p className="text-sm text-white/50 mb-4">
                        {pub.authors.join(', ')}
                      </p>

                      {/* Abstract */}
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {pub.abstract}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pub.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-white/5 text-white/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read Link */}
                    <div className="md:self-center">
                      <a
                        href={pub.href}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
                      >
                        Read Paper
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-zuup-hawking/20 via-zuup-gravitational/20 to-zuup-accretion/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
                Research <span className="gradient-text">Collaboration</span>
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                We actively collaborate with universities, research institutions, and industry partners. 
                Interested in working with us?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 rounded-full font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white" />
                  <span className="relative text-zuup-void flex items-center gap-2">
                    Propose Collaboration
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <a
                  href="https://github.com/khaaliswooden-max"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  View Open Source
                </a>
              </div>
            </div>
          </div>
        </motion.div>
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

