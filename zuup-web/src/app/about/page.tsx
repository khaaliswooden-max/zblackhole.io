'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const repos = [
  {
    name: 'Zuup HQ',
    repo: 'zuuphq',
    tagline: 'Blockchain Trust Infrastructure',
    description: 'The foundational trust layer for the Zuup ecosystem. Provides role-based access control, content-addressed artifact storage, and cryptographic attestations for eight interconnected enterprise products on Solana.',
    stats: {
      members: '19',
      projects: '31',
      artifacts: '9',
      attestations: '8',
    },
    features: [
      'Role-Based Access Control (RBAC)',
      'SHA256 Content Addressing',
      'Cryptographic Attestations',
      'Multi-Product Integration',
    ],
    color: '#3b82f6',
    programId: 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM',
    github: 'https://github.com/khaaliswooden-max/zuuphq',
    explorer: 'https://explorer.solana.com/address/H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM?cluster=devnet',
  },
  {
    name: 'ZUSDC',
    repo: 'zusdc',
    tagline: 'Zuup USD Stablecoin',
    description: 'A fully-collateralized stablecoin on Solana maintaining 1:1 parity with USDC through atomic mint/burn operations and cryptographic reserve attestation. The payment layer for the entire Zuup ecosystem.',
    stats: {
      supply: '500 ZUSDC',
      collateral: '100%',
      minted: '1,000',
      burned: '500',
    },
    features: [
      '100% USDC Collateralization',
      'Atomic Mint/Burn Operations',
      'On-Chain Reserve Verification',
      'Emergency Circuit Breakers',
    ],
    color: '#22c55e',
    programId: 'E6JLgSB3qyzCmL6Kj2oF53vyib2EtZF2vCvLuPxAG3Gd',
    github: 'https://github.com/khaaliswooden-max/zusdc',
    explorer: 'https://explorer.solana.com/address/E6JLgSB3qyzCmL6Kj2oF53vyib2EtZF2vCvLuPxAG3Gd?cluster=devnet',
  },
  {
    name: 'Zuup DAO',
    repo: 'zuup-solana',
    tagline: 'Decentralized Governance',
    description: 'Token-based governance with quadratic voting, multi-sig treasury, and futarchy mechanisms. The governance layer enabling decentralized coordination for civilization-scale systems.',
    stats: {
      quorum: '20%',
      votingPeriod: '7 days',
      lockMultiplier: 'Up to 4x',
      emergencyQuorum: '10%',
    },
    features: [
      'Quadratic Voting (Sybil-Resistant)',
      'Time-Locked Execution (48hr)',
      'Multi-Sig Treasury',
      'Futarchy Prediction Markets',
    ],
    color: '#a855f7',
    programId: 'Coming Soon',
    github: 'https://github.com/khaaliswooden-max/zuup-solana',
    explorer: null,
  },
];

const ecosystemProducts = [
  { name: 'AUREON', description: 'Global Procurement with FitIQ', color: '#3b82f6' },
  { name: 'VEYRA', description: 'Post-Superintelligent AI Registry', color: '#f97316' },
  { name: 'CIVIUM', description: 'Halal Compliance OS', color: '#a855f7' },
  { name: 'RELIAN', description: 'Global Refactoring OS', color: '#eab308' },
  { name: 'PODX', description: 'Mobile Distributed Data Center', color: '#06b6d4' },
  { name: 'SYMBION', description: 'Gut-Brain Computing Interface', color: '#22c55e' },
  { name: 'QAL', description: 'Quantum Archeology Labs', color: '#ec4899' },
  { name: 'ZUSDC', description: 'Ecosystem Stablecoin', color: '#22c55e' },
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

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-zuup-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-accretion border border-zuup-accretion/30 bg-zuup-accretion/5 mb-6">
              ABOUT ZUUP
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-white">Building </span>
              <span className="gradient-text">Trust Infrastructure</span>
              <br />
              <span className="text-white">for the Future</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              Zuup Innovation Lab develops blockchain-based trust infrastructure on Solana, 
              powering decentralized governance, stablecoins, and enterprise coordination 
              for civilization-scale systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Infrastructure Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-gravitational border border-zuup-gravitational/30 bg-zuup-gravitational/5 mb-6">
              CORE INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Three Pillars of the Zuup Ecosystem
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Open-source Solana programs forming the foundation of decentralized trust, 
              payments, and governance.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {repos.map((repo) => (
              <motion.div
                key={repo.name}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-white/10 bg-zuup-singularity/80 backdrop-blur-sm p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 
                        className="text-2xl font-display font-bold mb-1"
                        style={{ color: repo.color }}
                      >
                        {repo.name}
                      </h3>
                      <p className="text-sm text-white/50 font-mono">{repo.tagline}</p>
                    </div>
                    <a
                      href={repo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                    {repo.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(repo.stats).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-lg p-3">
                        <div className="text-lg font-semibold text-white">{value}</div>
                        <div className="text-xs text-white/40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {repo.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-white/50">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: repo.color }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Program ID */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-white/30 mb-1">Program ID</div>
                    <code className="text-xs text-white/50 font-mono break-all">
                      {repo.programId}
                    </code>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-4">
                    <a
                      href={repo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                    >
                      View Source
                    </a>
                    {repo.explorer && (
                      <a
                        href={repo.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: repo.color }}
                      >
                        Explorer
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Map */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-hawking border border-zuup-hawking/30 bg-zuup-hawking/5 mb-6">
              ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Eight Interconnected Products
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              All products integrate with Zuup HQ for trust verification and use ZUSDC for payments, 
              governed by the Zuup DAO.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {ecosystemProducts.map((product) => (
              <motion.div
                key={product.name}
                variants={itemVariants}
                className="relative p-6 rounded-xl border border-white/10 bg-zuup-singularity/50 hover:bg-zuup-singularity/80 transition-all group"
              >
                <div 
                  className="w-3 h-3 rounded-full mb-4"
                  style={{ backgroundColor: product.color, boxShadow: `0 0 20px ${product.color}40` }}
                />
                <h3 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-zuup-accretion transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-white/40">{product.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Loop */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-zuup-accretion/5 to-transparent"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              The Zuup Feedback Loop
            </h2>
            <div className="flex items-center justify-center gap-4 text-xl sm:text-2xl font-mono mb-8">
              <span className="text-zuup-plasma">Energy</span>
              <span className="text-white/30">→</span>
              <span className="text-zuup-accretion">Computation</span>
              <span className="text-white/30">→</span>
              <span className="text-zuup-gravitational">Knowledge</span>
              <span className="text-white/30">→</span>
              <span className="text-2xl">🔄</span>
            </div>
            <p className="text-white/50 max-w-xl mx-auto mb-8">
              A civilization-scale system optimizing the fundamental feedback loop 
              that drives human progress. Governed transparently. Built to last.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/partner"
                className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-zuup-accretion to-zuup-gravitational text-white"
              >
                Partner With Us
              </Link>
              <a
                href="https://github.com/khaaliswooden-max"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-medium border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                View All Repos
              </a>
            </div>
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
              <Link href="/platforms" className="hover:text-white/70 transition-colors">Platforms</Link>
              <a href="https://github.com/khaaliswooden-max" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
