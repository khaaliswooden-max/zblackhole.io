'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const platforms = [
  { name: 'Aureon', description: 'Procurement Substrate', color: '#3b82f6' },
  { name: 'Veyra', description: 'Autonomy OS', color: '#f97316' },
  { name: 'Civium', description: 'Compliance Engine', color: '#a855f7' },
  { name: 'Relian', description: 'AI Trust Infrastructure', color: '#eab308' },
  { name: 'PodX', description: 'Mobile Data Centers', color: '#06b6d4' },
  { name: 'Symbion', description: 'Gut-Brain Interface', color: '#22c55e' },
  { name: 'QAWM', description: 'Quantum Archaeology', color: '#ec4899' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-zuup-singularity/90 backdrop-blur-cosmic border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-zuup-accretion via-zuup-gravitational to-zuup-hawking opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">Z</span>
                </div>
              </div>
              <span className="text-xl font-display font-semibold tracking-tight hidden sm:block">
                <span className="gradient-text">Zuup</span>
                <span className="text-white/60 font-light ml-1">Innovation Lab</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div 
                className="relative"
                onMouseEnter={() => setPlatformsOpen(true)}
                onMouseLeave={() => setPlatformsOpen(false)}
              >
                <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1 font-medium">
                  Platforms
                  <svg className={`w-4 h-4 transition-transform ${platformsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {platformsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-2 rounded-xl bg-zuup-singularity/95 backdrop-blur-cosmic border border-white/10 shadow-2xl"
                    >
                      {platforms.map((platform) => (
                        <Link
                          key={platform.name}
                          href={`/platforms/${platform.name.toLowerCase()}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: platform.color, boxShadow: `0 0 10px ${platform.color}` }}
                          />
                          <div>
                            <div className="font-medium text-white group-hover:text-zuup-accretion transition-colors">
                              {platform.name}
                            </div>
                            <div className="text-xs text-white/50">{platform.description}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/research" className="text-white/70 hover:text-white transition-colors font-medium">
                Research
              </Link>
              <Link href="/benchmarks" className="text-white/70 hover:text-white transition-colors font-medium">
                Benchmarks
              </Link>
              <Link href="/whitepapers" className="text-white/70 hover:text-white transition-colors font-medium">
                Whitepapers
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors font-medium">
                Contact
              </Link>

              <Link
                href="/partner"
                className="relative px-5 py-2.5 rounded-full font-medium overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className="relative text-white">Partner With Us</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-zuup-void/95 backdrop-blur-cosmic" />
            <div className="relative h-full pt-20 px-6 pb-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Platforms</div>
                  <div className="space-y-1">
                    {platforms.map((platform) => (
                      <Link
                        key={platform.name}
                        href={`/platforms/${platform.name.toLowerCase()}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: platform.color }}
                        />
                        <div>
                          <div className="font-medium text-white">{platform.name}</div>
                          <div className="text-xs text-white/50">{platform.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-1">
                  <Link
                    href="/research"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 text-lg text-white/70 hover:text-white transition-colors"
                  >
                    Research
                  </Link>
                  <Link
                    href="/benchmarks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 text-lg text-white/70 hover:text-white transition-colors"
                  >
                    Benchmarks
                  </Link>
                  <Link
                    href="/whitepapers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 text-lg text-white/70 hover:text-white transition-colors"
                  >
                    Whitepapers
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 text-lg text-white/70 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 text-lg text-white/70 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>

                <Link
                  href="/partner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 rounded-full font-medium bg-gradient-to-r from-zuup-accretion to-zuup-gravitational text-white"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
