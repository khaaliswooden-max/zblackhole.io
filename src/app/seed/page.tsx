'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

// Platform data
const platforms = [
  { name: 'Aureon', code: 'AU', description: 'Procurement Substrate', color: '#00ff88', percentage: 18 },
  { name: 'Veyra', code: 'VY', description: 'Autonomy OS', color: '#ffaa00', percentage: 15 },
  { name: 'Civium', code: 'CV', description: 'Compliance Engine', color: '#00875a', percentage: 15 },
  { name: 'Relian', code: 'RL', description: 'Legacy Refactoring OS', color: '#627eea', percentage: 22 },
  { name: 'PodX', code: 'PX', description: 'Mobile Data Center', color: '#ec4899', percentage: 10 },
  { name: 'Symbion', code: 'SB', description: 'Gut-Brain Interface', color: '#ef4444', percentage: 10 },
  { name: 'QAWM', code: 'QA', description: 'Quantum Archaeology', color: '#a855f7', percentage: 10 },
];

const agentActions = [
  { icon: '🧠', title: 'Self-Improvement', desc: 'Purchase compute, fine-tune models, expand pattern libraries' },
  { icon: '📈', title: 'Self-Financing', desc: 'Generate revenue, reinvest profits, compound growth' },
  { icon: '🔄', title: 'Cross-Platform Arbitrage', desc: 'Share learnings, optimize resource allocation across ecosystem' },
  { icon: '🛡️', title: 'Reserve Building', desc: 'Maintain runway, weather market downturns, seize opportunities' },
];

export default function SeedFundingPage() {
  const [rail, setRail] = useState<'fiat' | 'crypto'>('fiat');
  const [fiatAmount, setFiatAmount] = useState<string>('');
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const [raised, setRaised] = useState(0);
  const [investors, setInvestors] = useState(0);
  const [zusdcMinted, setZusdcMinted] = useState(0);

  const TARGET = 2000000;
  const MOCK_RAISED = 247500;
  const MOCK_INVESTORS = 12;

  // Animate stats on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = MOCK_RAISED / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(MOCK_RAISED, increment * step);
      setRaised(Math.floor(current));
      setInvestors(Math.floor((current / MOCK_RAISED) * MOCK_INVESTORS));
      setZusdcMinted(Math.floor(current * 0.10));
      
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const progressPercent = (raised / TARGET) * 100;
  const fiatZusdc = Math.floor(parseFloat(fiatAmount || '0') * 0.10);
  const cryptoZusdc = Math.floor(parseFloat(cryptoAmount || '0') * 0.10);

  return (
    <div className="min-h-screen bg-zuup-void">
      <Navigation />
      
      {/* Mesh gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(0,255,136,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(98,126,234,0.03)_0%,transparent_50%)]" />
      </div>
      
      {/* Grid pattern */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-50 grid-bg" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Hero Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zuup-singularity border border-white/10 text-xs font-mono text-seed-accent mb-6">
                  <span className="w-2 h-2 rounded-full bg-seed-accent animate-pulse" />
                  SEED ROUND OPEN
                </span>
                
                <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-6">
                  Fund the Future of<br />
                  <span className="italic text-seed-accent">Autonomous</span> Intelligence
                </h1>
                
                <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                  Zuup Innovation Labs is building seven self-improving, self-financing AI platforms. 
                  Your investment seeds autonomous agents that compound value indefinitely.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a href="#invest" className="px-8 py-4 bg-seed-accent text-black font-semibold rounded-lg hover:bg-seed-accentDim transition-colors">
                    Invest Now
                  </a>
                  <a href="#mechanism" className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors">
                    Learn the Mechanism
                  </a>
                </div>
              </motion.div>
              
              {/* Right: Live Raise Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-zuup-singularity border border-white/10 rounded-2xl p-8 seed-card-hover">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/40 text-sm font-mono">SEED ROUND</span>
                    <span className="flex items-center gap-2 text-seed-accent text-sm">
                      <span className="w-2 h-2 rounded-full bg-seed-accent animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-mono text-4xl font-semibold tabular-nums">${raised.toLocaleString()}</span>
                      <span className="text-white/40">raised</span>
                    </div>
                    <div className="text-white/60">
                      of <span className="text-white font-semibold">$2,000,000</span> target
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="h-3 bg-zuup-horizon rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-seed-accent to-seed-crypto rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/40 font-mono">
                      <span>0%</span>
                      <span>{progressPercent.toFixed(1)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="font-mono text-2xl font-semibold text-white">{investors}</div>
                      <div className="text-white/40 text-xs mt-1">Investors</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="font-mono text-2xl font-semibold text-seed-accent">{zusdcMinted.toLocaleString()}</div>
                      <div className="text-white/40 text-xs mt-1">zUSDC Minted</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="font-mono text-2xl font-semibold text-seed-crypto">7</div>
                      <div className="text-white/40 text-xs mt-1">Platforms</div>
                    </div>
                  </div>
                  
                  {/* Minimum Investment */}
                  <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/10">
                    <span className="text-white/60 text-sm">Minimum Investment</span>
                    <span className="font-mono font-semibold">$10,000</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
        
        {/* Mechanism Section */}
        <section id="mechanism" className="py-24 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-seed-accent font-mono text-sm">THE MECHANISM</span>
              <h2 className="font-display text-4xl mt-4 mb-6">Self-Financing Autonomous Agents</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                For every $100,000 raised, $10,000 is set aside to mint zUSDC—a stablecoin that funds 
                autonomous agents to recursively improve and finance each platform.
              </p>
            </div>
            
            {/* Flow Diagram */}
            <div className="bg-zuup-singularity border border-white/10 rounded-2xl p-8 lg:p-12 mb-16">
              <div className="grid lg:grid-cols-5 gap-6 items-center">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zuup-horizon border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💵</span>
                  </div>
                  <div className="font-mono text-sm text-seed-accent mb-1">$100,000</div>
                  <div className="text-white/60 text-sm">Investment Received</div>
                </div>
                
                {/* Arrow */}
                <div className="hidden lg:flex justify-center">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0 10H35M35 10L28 3M35 10L28 17" stroke="#00ff88" strokeWidth="2"/>
                  </svg>
                </div>
                
                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zuup-horizon border border-seed-accent/30 animate-seed-glow flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="font-mono text-sm text-seed-accent mb-1">90/10 SPLIT</div>
                  <div className="text-white/60 text-sm">Automatic Allocation</div>
                  <div className="mt-4 space-y-2 text-left max-w-[200px] mx-auto">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Operating</span>
                      <span className="text-seed-fiat font-mono">$90,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Agent Reserve</span>
                      <span className="text-seed-crypto font-mono">$10,000</span>
                    </div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="hidden lg:flex justify-center">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0 10H35M35 10L28 3M35 10L28 17" stroke="#627eea" strokeWidth="2"/>
                  </svg>
                </div>
                
                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-seed-crypto/20 to-seed-accent/20 border border-seed-crypto/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-mono font-bold text-seed-crypto">zUSDC</span>
                  </div>
                  <div className="font-mono text-sm text-seed-crypto mb-1">10,000 zUSDC</div>
                  <div className="text-white/60 text-sm">Minted to Agent Treasury</div>
                </div>
              </div>
            </div>
            
            {/* Treasury Distribution */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-zuup-singularity border border-white/10 rounded-2xl p-8">
                <h3 className="font-display text-2xl mb-6">Agent Treasury Distribution</h3>
                <p className="text-white/60 mb-8">
                  zUSDC flows autonomously to platform agents, enabling them to purchase compute, 
                  train models, and invest in their own improvement.
                </p>
                
                <div className="space-y-4">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{platform.name}</span>
                          <span className="font-mono text-sm text-white/40">{platform.percentage}%</span>
                        </div>
                        <div className="h-2 bg-zuup-horizon rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${platform.percentage}%`, backgroundColor: platform.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-zuup-singularity border border-white/10 rounded-2xl p-8">
                <h3 className="font-display text-2xl mb-6">What Agents Do With zUSDC</h3>
                <div className="space-y-6">
                  {agentActions.map((action) => (
                    <div key={action.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zuup-horizon flex items-center justify-center flex-shrink-0">
                        <span>{action.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">{action.title}</div>
                        <div className="text-white/60 text-sm">{action.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platforms Section */}
        <section id="platforms" className="py-24 px-6 border-t border-white/10 bg-zuup-singularity/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-seed-accent font-mono text-sm">THE ECOSYSTEM</span>
              <h2 className="font-display text-4xl mt-4 mb-6">Seven Autonomous Platforms</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Each platform operates as its own economic entity—generating revenue, 
                improving autonomously, and returning value to the parent.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <Link
                  key={platform.name}
                  href={`/platforms/${platform.name.toLowerCase()}`}
                  className="bg-zuup-singularity border border-white/10 rounded-xl p-6 seed-card-hover"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <span className="font-mono font-bold text-sm" style={{ color: platform.color }}>
                        {platform.code}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{platform.name}</div>
                      <div className="text-white/40 text-xs">{platform.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Coming Soon */}
              <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/40 text-sm">Platform 8</div>
                  <div className="text-white/20 text-xs mt-1">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Investment Section */}
        <section id="invest" className="py-24 px-6 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-seed-accent font-mono text-sm">INVEST</span>
              <h2 className="font-display text-4xl mt-4 mb-6">Choose Your Rail</h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Invest via traditional fiat or cryptocurrency. Both rails are secured with 
                Zero Trust architecture and full audit trails.
              </p>
            </div>
            
            <div className="bg-zuup-singularity border border-white/10 rounded-2xl overflow-hidden">
              {/* Rail Selector */}
              <div className="grid grid-cols-2 border-b border-white/10">
                <button
                  onClick={() => setRail('fiat')}
                  className={`p-6 text-center transition-all ${rail === 'fiat' ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-seed-fiat/20 flex items-center justify-center">
                      <span className="text-seed-fiat">$</span>
                    </div>
                    <span className="font-semibold">Fiat Rail</span>
                  </div>
                  <div className="text-white/40 text-sm">ACH or Wire Transfer</div>
                </button>
                <button
                  onClick={() => setRail('crypto')}
                  className={`p-6 text-center transition-all border-l border-white/10 ${rail === 'crypto' ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-seed-crypto/20 flex items-center justify-center">
                      <span className="text-seed-crypto">◈</span>
                    </div>
                    <span className="font-semibold">Crypto Rail</span>
                  </div>
                  <div className="text-white/40 text-sm">USDC, ETH, BTC</div>
                </button>
              </div>
              
              {/* Fiat Form */}
              {rail === 'fiat' && (
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8 p-4 bg-seed-fiat/5 border border-seed-fiat/20 rounded-xl">
                    <div className="text-sm text-white/60">Secured via Wells Fargo Business Banking</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Full Legal Name</label>
                        <input type="text" placeholder="As it appears on your bank account" className="seed-input" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Email Address</label>
                        <input type="email" placeholder="investor@example.com" className="seed-input" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Investment Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                        <input
                          type="number"
                          value={fiatAmount}
                          onChange={(e) => setFiatAmount(e.target.value)}
                          placeholder="10,000"
                          min="10000"
                          step="1000"
                          className="seed-input pl-8"
                        />
                      </div>
                      <div className="text-xs text-white/40 mt-2">Minimum investment: $10,000</div>
                    </div>
                    
                    {/* zUSDC Preview */}
                    <div className="p-4 bg-zuup-horizon rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">zUSDC to be minted (10%):</span>
                        <span className="font-mono text-seed-crypto font-semibold">{fiatZusdc.toLocaleString()} zUSDC</span>
                      </div>
                      <div className="text-xs text-white/40 mt-2">
                        This zUSDC funds autonomous agents across all seven platforms
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Transfer Method</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-4 bg-zuup-horizon rounded-xl cursor-pointer border border-transparent hover:border-seed-fiat/30 transition-colors">
                          <input type="radio" name="transfer-method" value="ach" defaultChecked className="accent-seed-fiat" />
                          <div>
                            <div className="font-semibold text-sm">ACH Transfer</div>
                            <div className="text-white/40 text-xs">3-5 business days</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-zuup-horizon rounded-xl cursor-pointer border border-transparent hover:border-seed-fiat/30 transition-colors">
                          <input type="radio" name="transfer-method" value="wire" className="accent-seed-fiat" />
                          <div>
                            <div className="font-semibold text-sm">Wire Transfer</div>
                            <div className="text-white/40 text-xs">Same day</div>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <button className="w-full py-4 bg-seed-fiat text-white font-semibold rounded-xl hover:bg-seed-fiat/90 transition-colors">
                      Continue with Fiat Investment
                    </button>
                  </div>
                </div>
              )}
              
              {/* Crypto Form */}
              {rail === 'crypto' && (
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8 p-4 bg-seed-crypto/5 border border-seed-crypto/20 rounded-xl">
                    <div className="text-sm text-white/60">Secured via Coinbase Commerce</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Full Legal Name</label>
                        <input type="text" placeholder="For compliance records" className="seed-input" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Email Address</label>
                        <input type="email" placeholder="investor@example.com" className="seed-input" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Select Cryptocurrency</label>
                      <div className="grid grid-cols-3 gap-4">
                        <label className="flex flex-col items-center gap-2 p-4 bg-zuup-horizon rounded-xl cursor-pointer border-2 border-transparent hover:border-seed-crypto/30 transition-colors has-[:checked]:border-seed-crypto">
                          <input type="radio" name="crypto-type" value="usdc" defaultChecked className="hidden" />
                          <span className="text-2xl">💵</span>
                          <span className="text-sm font-semibold">USDC</span>
                          <span className="text-xs text-white/40">Stablecoin</span>
                        </label>
                        <label className="flex flex-col items-center gap-2 p-4 bg-zuup-horizon rounded-xl cursor-pointer border-2 border-transparent hover:border-seed-crypto/30 transition-colors has-[:checked]:border-seed-crypto">
                          <input type="radio" name="crypto-type" value="eth" className="hidden" />
                          <span className="text-2xl">⟠</span>
                          <span className="text-sm font-semibold">ETH</span>
                          <span className="text-xs text-white/40">Ethereum</span>
                        </label>
                        <label className="flex flex-col items-center gap-2 p-4 bg-zuup-horizon rounded-xl cursor-pointer border-2 border-transparent hover:border-seed-crypto/30 transition-colors has-[:checked]:border-seed-crypto">
                          <input type="radio" name="crypto-type" value="btc" className="hidden" />
                          <span className="text-2xl">₿</span>
                          <span className="text-sm font-semibold">BTC</span>
                          <span className="text-xs text-white/40">Bitcoin</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Investment Amount (USD equivalent)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                        <input
                          type="number"
                          value={cryptoAmount}
                          onChange={(e) => setCryptoAmount(e.target.value)}
                          placeholder="10,000"
                          min="10000"
                          step="1000"
                          className="seed-input pl-8"
                        />
                      </div>
                      <div className="text-xs text-white/40 mt-2">Minimum investment: $10,000 equivalent</div>
                    </div>
                    
                    {/* zUSDC Preview */}
                    <div className="p-4 bg-zuup-horizon rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">zUSDC to be minted (10%):</span>
                        <span className="font-mono text-seed-crypto font-semibold">{cryptoZusdc.toLocaleString()} zUSDC</span>
                      </div>
                      <div className="text-xs text-white/40 mt-2">
                        This zUSDC funds autonomous agents across all seven platforms
                      </div>
                    </div>
                    
                    <button className="w-full py-4 bg-seed-crypto text-white font-semibold rounded-xl hover:bg-seed-crypto/90 transition-colors">
                      Connect Wallet & Invest
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Security Badges */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-zuup-singularity border border-white/10 rounded-xl">
                <span className="text-seed-accent">🔐</span>
                <span className="text-xs text-white/60">Zero Trust<br />Architecture</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zuup-singularity border border-white/10 rounded-xl">
                <span className="text-seed-accent">📋</span>
                <span className="text-xs text-white/60">SEC<br />Compliant</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zuup-singularity border border-white/10 rounded-xl">
                <span className="text-seed-accent">🔍</span>
                <span className="text-xs text-white/60">Full Audit<br />Trail</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zuup-singularity border border-white/10 rounded-xl">
                <span className="text-seed-accent">⛓️</span>
                <span className="text-xs text-white/60">On-Chain<br />Verification</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-seed-accent to-seed-crypto flex items-center justify-center">
                    <span className="font-mono font-bold text-black">Z</span>
                  </div>
                  <span className="font-display text-xl">Zuup Labs</span>
                </div>
                <p className="text-white/40 text-sm">Building autonomous intelligence that compounds value indefinitely.</p>
              </div>
              <div>
                <div className="font-semibold mb-4">Platforms</div>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/platforms/aureon" className="hover:text-seed-accent transition-colors">Aureon</Link></li>
                  <li><Link href="/platforms/veyra" className="hover:text-seed-accent transition-colors">Veyra</Link></li>
                  <li><Link href="/platforms/civium" className="hover:text-seed-accent transition-colors">Civium</Link></li>
                  <li><Link href="/platforms/relian" className="hover:text-seed-accent transition-colors">Relian</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-4">Resources</div>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/whitepapers" className="hover:text-seed-accent transition-colors">Whitepaper</Link></li>
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">GitHub</Link></li>
                  <li><Link href="/research" className="hover:text-seed-accent transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-4">Legal</div>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">Investment Disclosure</Link></li>
                  <li><Link href="#" className="hover:text-seed-accent transition-colors">SEC Filings</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/40 text-sm">
                © 2025 Zuup Innovation Labs. All rights reserved.
              </div>
              <div className="text-white/40 text-xs max-w-xl text-center md:text-right">
                This is not an offer to sell securities. Investment involves risk. 
                Consult with qualified advisors before investing.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
