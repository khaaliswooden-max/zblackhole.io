'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const partnershipTypes = [
  {
    title: 'Technology Partners',
    description: 'Integrate your technology stack with Zuup platforms. Build on our blockchain infrastructure, APIs, and SDKs.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    benefits: ['API Access', 'Technical Documentation', 'Integration Support', 'Co-development Opportunities'],
    color: '#3b82f6',
  },
  {
    title: 'Research Partners',
    description: 'Collaborate on cutting-edge research in AI, blockchain, autonomous systems, and decentralized governance.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    benefits: ['Joint Publications', 'Research Grants', 'Data Access', 'Academic Collaboration'],
    color: '#a855f7',
  },
  {
    title: 'Enterprise Solutions',
    description: 'Deploy Zuup platforms within your organization. Custom implementations for enterprise-scale operations.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    benefits: ['Custom Deployment', 'SLA Support', 'Training Programs', 'Dedicated Account Team'],
    color: '#f97316',
  },
  {
    title: 'Government & Defense',
    description: 'Mission-critical deployments for government agencies and defense applications requiring highest security standards.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    benefits: ['Security Clearance Support', 'Compliance Frameworks', 'Air-Gapped Deployments', 'Priority Response'],
    color: '#06b6d4',
  },
];

const successStories = [
  {
    quote: "Zuup's trust infrastructure transformed how we verify AI model outputs across our enterprise.",
    author: 'Fortune 500 Technology Company',
    metric: '99.7% attestation accuracy',
    color: '#3b82f6',
  },
  {
    quote: "The quadratic voting mechanisms enabled truly democratic decision-making in our distributed organization.",
    author: 'Global DAO Collective',
    metric: '10,000+ governance participants',
    color: '#a855f7',
  },
  {
    quote: "PodX mobile data centers gave us compute capabilities in environments we never thought possible.",
    author: 'Defense Contractor',
    metric: '72-hour deployment time',
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

export default function PartnerPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    partnershipType: '',
    projectDescription: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="relative min-h-screen bg-zuup-void">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-zuup-accretion/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-zuup-gravitational/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-gravitational border border-zuup-gravitational/30 bg-zuup-gravitational/5 mb-6">
              PARTNERSHIPS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-white">Build the Future </span>
              <span className="gradient-text">With Us</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              We partner with visionary organizations to deploy breakthrough solutions in AI trust, 
              blockchain infrastructure, and autonomous systems. Let&apos;s create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Partnership Models
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Multiple pathways to collaborate, tailored to your organization&apos;s needs and objectives.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {partnershipTypes.map((type) => (
              <motion.div
                key={type.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-white/10 bg-zuup-singularity/80 p-8 h-full">
                  <div 
                    className="mb-6 text-white/80"
                    style={{ color: type.color }}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-zuup-accretion transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm text-white/50">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: type.color }}
                        />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-accretion border border-zuup-accretion/30 bg-zuup-accretion/5 mb-6">
              SUCCESS STORIES
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Partner Impact
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative p-8 rounded-2xl border border-white/10 bg-zuup-singularity/50"
              >
                <div 
                  className="w-12 h-1 rounded-full mb-6"
                  style={{ backgroundColor: story.color }}
                />
                <blockquote className="text-white/80 text-lg mb-6 leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div className="text-sm text-white/40 mb-2">{story.author}</div>
                <div 
                  className="text-sm font-mono font-medium"
                  style={{ color: story.color }}
                >
                  {story.metric}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-zuup-singularity/80 backdrop-blur-sm p-8 md:p-12"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-zuup-accretion to-zuup-gravitational flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Application Received!
                </h3>
                <p className="text-white/60 mb-8">
                  Thank you for your partnership interest. Our team will review your application 
                  and reach out within 3-5 business days.
                </p>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full font-medium border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
                >
                  Return Home
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-zuup-hawking border border-zuup-hawking/30 bg-zuup-hawking/5 mb-6">
                    START THE CONVERSATION
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Partnership Inquiry
                  </h2>
                  <p className="text-white/50">
                    Tell us about your organization and how we can work together.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all"
                        placeholder="Company or institution"
                      />
                    </div>
                    <div>
                      <label htmlFor="partnershipType" className="block text-sm font-medium text-white/70 mb-2">
                        Partnership Type *
                      </label>
                      <select
                        id="partnershipType"
                        name="partnershipType"
                        required
                        value={formState.partnershipType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all"
                      >
                        <option value="" className="bg-zuup-void">Select type</option>
                        <option value="technology" className="bg-zuup-void">Technology Partner</option>
                        <option value="research" className="bg-zuup-void">Research Partner</option>
                        <option value="enterprise" className="bg-zuup-void">Enterprise Solutions</option>
                        <option value="government" className="bg-zuup-void">Government & Defense</option>
                        <option value="investor" className="bg-zuup-void">Investment Partner</option>
                        <option value="other" className="bg-zuup-void">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white/70 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all"
                    >
                      <option value="" className="bg-zuup-void">Select timeline</option>
                      <option value="immediate" className="bg-zuup-void">Immediate (0-3 months)</option>
                      <option value="near" className="bg-zuup-void">Near-term (3-6 months)</option>
                      <option value="planning" className="bg-zuup-void">Planning phase (6-12 months)</option>
                      <option value="exploratory" className="bg-zuup-void">Exploratory</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-white/70 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      rows={6}
                      value={formState.projectDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-zuup-accretion/50 focus:ring-1 focus:ring-zuup-accretion/50 transition-all resize-none"
                      placeholder="Describe your project, goals, and how you envision partnering with Zuup..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-white/40">
                      * Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative px-8 py-3 rounded-full font-medium overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational" />
                      <div className="absolute inset-0 bg-gradient-to-r from-zuup-accretion to-zuup-gravitational blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <span className="relative text-white flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Inquiry
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}
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

