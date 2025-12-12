'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const milestones = [
  {
    year: '1996',
    title: 'The Foundation',
    location: 'Fort Sam Houston',
    description: 'Army logistics specialist. First lesson: systems either serve people or fail them.',
  },
  {
    year: '1996–2006',
    title: 'A Decade in Uniform',
    location: 'Fort Sill → Fort Benning → Kuwait → Iraq',
    description: 'Artillery support. Barracks management. MWR operations. Supply chain in war zones. The military teaches you that shortcuts cost lives.',
  },
  {
    year: '2006–2015',
    title: 'The Proving Ground',
    location: 'Retail → Higher Ed → Agriculture',
    description: '$10M retail operations at Hibbett. 87% enrollment surge at ASU/CSU through ERP integration. 10M+ USDA-certified units at Halal Co.',
  },
  {
    year: '2015–2020',
    title: 'The Shop Floor',
    location: 'Manufacturing QA',
    description: '386 consecutive days. Zero safety incidents. Up to 100 projects across OEM and Tier 1 sites. The reputation forms: treat every opportunity like your last.',
  },
  {
    year: '2020–2024',
    title: 'Systems at Scale',
    location: 'Amazon → Federal',
    description: '30% reduction in safety incidents. 15% process error reduction. Not through heroics—through systems that make integrity the default.',
  },
  {
    year: '2024–Present',
    title: 'The Convergence',
    location: 'Visionblox → Zuup',
    description: 'Federal capture leadership. GSA MAS preparation across eight SINs. MBA completion. Seven platforms. One mission: technology that works when no one\'s watching.',
  },
];

const credentials = [
  { label: 'PMP Foundations', category: 'Management' },
  { label: 'Lean Six Sigma Green Belt', category: 'Operations' },
  { label: 'ITIL', category: 'IT Service' },
  { label: 'Scrum Advanced', category: 'Agile' },
  { label: 'AI/ML Engineering', category: 'Technology' },
  { label: 'RPA Specialist', category: 'Automation' },
];

const languages = [
  { name: 'English', level: 'Full Professional' },
  { name: 'Arabic', level: 'Limited Working' },
  { name: 'German', level: 'Limited Working' },
  { name: 'Spanish', level: 'Limited Working' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zuup-singularity text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20">
        {/* Gravitational glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-zuup-accretion/10 via-transparent to-transparent blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 max-w-4xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-zuup-accretion/80 uppercase tracking-[0.3em] text-sm mb-6"
          >
            Founder
          </motion.p>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            <span className="text-white/90">Khaalis</span>{' '}
            <span className="text-zuup-accretion">Wooden</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Thirty years. Warehouses to war zones. Spreadsheets to supply chains.
            <br />
            <span className="text-white/80">Every role the same mission: leave it better than you found it.</span>
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-zuup-accretion/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-12 tracking-tight">
              The path to Zuup wasn&apos;t planned.
              <br />
              <span className="text-zuup-accretion">It was earned.</span>
            </h2>

            <div className="space-y-8 text-lg text-white/70 leading-relaxed font-light">
              <p>
                It started in 1996 at Fort Sam Houston, where a young logistics specialist learned that 
                systems either serve people or fail them. There&apos;s no middle ground. That principle followed 
                me through a decade of Army service—from artillery support at Fort Sill to barracks management 
                at Fort Benning, from MWR operations in Kuwait to supply chain logistics in Iraq.
              </p>
              
              <p className="text-white/80">
                The military doesn&apos;t teach you to cut corners. It teaches you that shortcuts cost lives.
              </p>

              <p>
                After uniform came the proving ground of civilian operations. Managing $10 million in retail 
                operations. Supporting an 87% enrollment surge through ERP integration. Overseeing quality 
                assurance for 10 million USDA-certified poultry units. Each role different. Each role the same question:
              </p>

              <p className="text-xl text-white/90 italic border-l-2 border-zuup-accretion/50 pl-6 my-12">
                &ldquo;Can you build something that actually works when no one&apos;s watching?&rdquo;
              </p>

              <p>
                The answer had to be yes. Every time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-zuup-accretion/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.3em] text-zuup-accretion/80 mb-20"
          >
            The Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zuup-accretion/30 to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''} pl-8 md:pl-0`}>
                  <div className="text-zuup-accretion font-mono text-sm mb-2">{milestone.year}</div>
                  <h3 className="text-2xl font-light text-white/90 mb-1">{milestone.title}</h3>
                  <div className="text-white/40 text-sm mb-3">{milestone.location}</div>
                  <p className="text-white/60 leading-relaxed">{milestone.description}</p>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-zuup-accretion/80 ring-4 ring-zuup-singularity" />

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Shop Floor */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-12">
              What mattered was
              <br />
              <span className="text-zuup-accretion">the shop floor.</span>
            </h2>

            <div className="space-y-8 text-lg text-white/70 leading-relaxed font-light">
              <p>
                Not the title. Not the org chart. The shop floor—where problems are real, where excuses 
                don&apos;t ship product, where your word is either good or it isn&apos;t.
              </p>

              <p>
                I built a reputation there: the leader who treated a weekend warehouse shift with the same 
                intensity as a federal contract negotiation. Because every opportunity—big or small—was 
                an opportunity to prove that integrity scales.
              </p>

              <div className="grid grid-cols-2 gap-4 my-12 py-8 border-y border-white/10">
                <div className="text-center">
                  <div className="text-4xl font-light text-zuup-accretion mb-2">386</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Days Zero Incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-zuup-accretion mb-2">30%</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Safety Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-zuup-accretion mb-2">100+</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Projects Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-zuup-accretion mb-2">15%</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Error Reduction</div>
                </div>
              </div>

              <p>
                Co-founded brands. Built creative campaigns at Pvlse Media. Developed performance wellness 
                systems at 4.0 Fitness. Some succeeded. Some didn&apos;t. All of them taught. The wins showed 
                what was possible. The losses showed what mattered.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zuup Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-zuup-void to-zuup-singularity">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-8">
              Zuup Innovation Lab is what happens when
              <br />
              <span className="text-zuup-accretion">thirty years of shop-floor wisdom</span>
              <br />
              meets frontier technology.
            </h2>

            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-12">
              Every platform we build—Aureon, Veyra, Civium, PodX, Symbion, QAWM—carries the same DNA: 
              systems that serve people, not the other way around. We don&apos;t build technology to impress. 
              We build technology that works when no one&apos;s watching.
            </p>

            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 max-w-2xl mx-auto">
              <p className="text-lg text-white/80 italic leading-relaxed mb-6">
                &ldquo;The road less traveled isn&apos;t romantic. It&apos;s longer, harder, and lonelier than the well-worn path. 
                But it&apos;s where you learn what you&apos;re actually made of. It&apos;s where losses become lessons 
                and lessons become moats.&rdquo;
              </p>
              <p className="text-white/50 text-sm">
                Zuup is that moat—built from every hard lesson, every shop floor challenge, every moment 
                when doing the right thing was the harder choice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-zuup-accretion/80 mb-8">
                Certifications
              </h3>
              <div className="space-y-4">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/80">{cred.label}</span>
                    <span className="text-white/40 text-sm">{cred.category}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-zuup-accretion/80 mb-8">
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/80">{lang.name}</span>
                    <span className="text-white/40 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white/40 text-sm uppercase tracking-wider mb-2">Education</div>
                <div className="text-white/80 mb-1">MBA, IT Management</div>
                <div className="text-white/50 text-sm">Southern New Hampshire University • 2024–2026</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="text-white/40">◆</span>
              <span className="text-sm uppercase tracking-[0.3em] text-white/60">Veteran</span>
              <span className="text-white/40">◆</span>
              <span className="text-sm uppercase tracking-[0.3em] text-white/60">Builder</span>
              <span className="text-white/40">◆</span>
              <span className="text-sm uppercase tracking-[0.3em] text-white/60">Journeyman</span>
              <span className="text-white/40">◆</span>
            </div>

            <p className="text-2xl md:text-3xl text-white/80 font-light italic mb-12">
              &ldquo;Every role. Every shift. Every opportunity—like it was my last.&rdquo;
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zuup-accretion/50 text-zuup-accretion hover:bg-zuup-accretion/10 transition-all duration-300"
            >
              <span>Explore the Platforms</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
