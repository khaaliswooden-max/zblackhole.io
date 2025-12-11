'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

// Dynamic import for Three.js to avoid SSR issues
const BlackHole = dynamic(() => import('@/components/BlackHole'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-zuup-void" />
  ),
});

const platforms = [
  {
    name: 'Aureon',
    tagline: 'Procurement Substrate',
    description: 'AI-native infrastructure transforming how organizations discover, evaluate, and execute procurement at scale.',
    color: '#3b82f6',
    icon: '◈',
  },
  {
    name: 'Veyra',
    tagline: 'Autonomy OS',
    description: 'Orchestration layer for autonomous systems, enabling seamless human-machine collaboration.',
    color: '#f97316',
    icon: '◎',
  },
  {
    name: 'Civium',
    tagline: 'Compliance Engine',
    description: 'Real-time regulatory intelligence and automated compliance verification for complex environments.',
    color: '#a855f7',
    icon: '◇',
  },
  {
    name: 'PodX',
    tagline: 'Mobile Data Centers',
    description: 'Rapidly deployable edge computing infrastructure for contested and austere environments.',
    color: '#06b6d4',
    icon: '⬡',
  },
  {
    name: 'Symbion',
    tagline: 'Gut-Brain Interface',
    description: 'Ingestible biosensors revolutionizing gut-brain axis research and personalized health.',
    color: '#22c55e',
    icon: '◉',
  },
  {
    name: 'QAWM',
    tagline: 'Quantum Archaeology',
    description: 'Applying quantum computing methodologies to reconstruct and analyze historical data patterns.',
    color: '#ec4899',
    icon: '⬢',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BlackHole />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-accretion border border-zuup-accretion/30 bg-zuup-accretion/5">
              INNOVATION LAB
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Where Ideas</span>
            <br />
            <span className="text-white">Collapse Into</span>
            <br />
            <span className="text-white">Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light"
          >
            Seven proprietary platforms forging breakthrough solutions at the intersection of 
            AI, autonomy, and distributed systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#platforms"
              className="group relative px-8 py-4 rounded-full font-medium overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational" />
              <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-white flex items-center gap-2">
                Explore Platforms
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            
            <a
              href="/research"
              className="px-8 py-4 rounded-full font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              View Research
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-gravitational border border-zuup-gravitational/30 bg-zuup-gravitational/5 mb-6">
              PLATFORM ECOSYSTEM
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-white">Seven Vectors of</span>
              <br />
              <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Each platform orbits our core—a gravitational well of first-principles thinking 
              that pulls ideas toward realized potential.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {platforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={`/platforms/${platform.name.toLowerCase()}`}
                variants={itemVariants}
                className="platform-card p-8 group cursor-pointer"
                style={{
                  ['--glow-color' as string]: platform.color,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="text-4xl"
                    style={{ color: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <svg
                    className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                <h3 className="text-2xl font-display font-semibold text-white mb-2 group-hover:text-zuup-accretion transition-colors">
                  {platform.name}
                </h3>
                <div
                  className="text-sm font-mono tracking-wider mb-4"
                  style={{ color: platform.color }}
                >
                  {platform.tagline}
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {platform.description}
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-hawking border border-zuup-hawking/30 bg-zuup-hawking/5 mb-6">
              OUR MISSION
            </span>
            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white/90 leading-tight mb-8">
              &ldquo;To engineer solutions that don&apos;t just solve problems—they 
              <span className="gradient-text font-medium"> redefine the problem space </span>
              entirely.&rdquo;
            </blockquote>
            <p className="text-white/50 text-lg">
              — Zuup Innovation Lab
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion/20 via-zuup-gravitational/20 to-zuup-hawking/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to <span className="gradient-text">Collaborate?</span>
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                We partner with organizations, researchers, and governments pushing the boundaries 
                of what&apos;s possible.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/partner"
                  className="group relative px-8 py-4 rounded-full font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white" />
                  <span className="relative text-zuup-void flex items-center gap-2">
                    Partner With Us
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Get In Touch
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
              <a href="/privacy" className="hover:text-white/70 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white/70 transition-colors">Terms</a>
              <a href="https://github.com/zuup-lab" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">GitHub</a>
              <a href="https://linkedin.com/company/zuup" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
