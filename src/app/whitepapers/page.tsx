'use client';

import './whitepapers.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Summaries data for translation and TTS
const summaries: Record<string, string> = {
  master: `The Zuup Master Whitepaper presents a comprehensive technology stack comprising nine integrated platforms addressing civilization-scale challenges. The ecosystem operates on a fundamental optimization loop: Energy → Computation → Knowledge → Energy. Built on a three-layer Solana blockchain architecture (65,000 TPS, sub-second finality), it unifies procurement, AI governance, healthcare technology, edge computing, and legacy system modernization into a single coordinated framework. This document serves as the architectural blueprint connecting all Zuup platforms through shared trust infrastructure and quadratic voting governance.`,
  
  ecosystem: `This whitepaper details the Solana-based blockchain foundation powering the Zuup ecosystem. The three-layer architecture consists of Zuup-Solana (foundation layer for high-throughput processing), Zuup HQ (trust layer with role-based access control and SHA256 content-addressed storage), and Zuup DAO (governance layer implementing quadratic voting and futarchy mechanisms). Deployed on Solana Devnet, the system achieves 100% attestation coverage across all products with deployment costs under $0.02 USD, demonstrating enterprise-grade infrastructure for civilization-scale coordination.`,
  
  veyra: `Veyra is a vertically integrated large language model platform engineered for post-superintelligence (post-SI) operation across interplanetary distances. Unlike current LLM systems designed for single-planet deployment, Veyra addresses light-delay resilience (3-22 minute Mars-Earth latency), multi-sovereign governance alignment, and complete inference auditability. The five-layer architecture spans hardware awareness through governance observability, introducing seven novel benchmark families (CPLC, MSGA, WMRT, ICSD, TOME, ASR, IMDP) for evaluating AI capabilities under interplanetary constraints.`,
  
  podx: `PodX is the world's first 100% XdoP-compliant Mobile Distributed Data Center, achieving a perfect 100/100 Weighted Composite Benchmark Index (WCBI) score across all seven benchmark domains. Designed for mission-critical edge computing in extreme environments, it delivers 24+ hour DDIL (Disconnected, Disrupted, Intermittent, Limited) autonomy with 99.99% availability and 100% renewable off-grid operation. The four-zone physical architecture within an ISO 20-foot container provides datacenter-grade performance (384 CPU threads, 320 TOPS AI inference, 480TB storage) rated for -40°C to +60°C ambient operation.`,
  
  relian: `Relian addresses the $84 billion legacy modernization crisis where 220 billion lines of COBOL process $3+ trillion in daily transactions while 70% of COBOL developers are over 55. The platform combines large language model semantic understanding (GPT-4/Claude) with blockchain-verified quality attestation to deliver 10-100× faster migrations and 80-99% cost reduction. Key capabilities include semantic-preserving code migration, symbolic execution for 80%+ automated test coverage, Solana blockchain attestation, and ML-based risk scoring achieving 85%+ accuracy in predicting post-migration defects.`,
  
  symbion: `Symbion is a medical-grade ingestible biosensor platform designed for real-time gut-brain axis monitoring, engineered with FDA 510(k) and CE Mark regulatory compliance as foundational requirements. The system comprises nRF52832-based embedded firmware (C++/FreeRTOS), React Native mobile application, and Node.js cloud backend with MongoDB analytics. Clinical validation demonstrates 92.5% sensitivity and 94.3% specificity for neurotransmitter detection (serotonin, dopamine, GABA, pH, temperature). Tiered pricing ($3-$149) enables deployment across low and middle-income countries, targeting 50 million users by 2030.`,
  
  qawm: `The Quantum Archeological World Model (QAWM) is a first-principles computational framework for reconstructing historical states of complex systems from present-day entropic traces. Unlike classical approaches relying on documentary evidence and archaeological artifacts, QAWM treats history as a probabilistic distribution of past states recoverable through information-theoretic analysis. The framework implements a five-layer causal hierarchy (Physical, Biological, Techno-Economic, Socio-Political, Cognitive) and introduces QAWM-QL, a domain-specific query language for historical reconstructions. Applications span Bronze Age societal collapse analysis to future AI alignment scenario modeling.`
};

const langCodes: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  ar: 'ar-SA',
  de: 'de-DE',
  zh: 'zh-CN',
  fr: 'fr-FR',
  ja: 'ja-JP',
  pt: 'pt-BR',
  ru: 'ru-RU',
  hi: 'hi-IN'
};

const langNames: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  ar: 'Arabic',
  de: 'German',
  zh: 'Chinese',
  fr: 'French',
  ja: 'Japanese',
  pt: 'Portuguese',
  ru: 'Russian',
  hi: 'Hindi'
};

interface WhitepaperData {
  key: string;
  icon: string;
  iconClass: string;
  title: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
  pdfFile: string;
}

const whitepapers: WhitepaperData[] = [
  {
    key: 'master',
    icon: 'ZUUP',
    iconClass: 'icon-master',
    title: 'Zuup Master Whitepaper',
    subtitle: 'A Unified Framework for Decentralized Trust Infrastructure, AI Governance, and Civilization-Scale Coordination',
    metrics: [
      { value: '9', label: 'Integrated Platforms' },
      { value: '65,000', label: 'TPS Capacity' },
      { value: '3-Layer', label: 'Architecture' }
    ],
    pdfFile: 'zuup-master-whitepaper.pdf'
  },
  {
    key: 'ecosystem',
    icon: '∞',
    iconClass: 'icon-ecosystem',
    title: 'Zuup Blockchain Ecosystem',
    subtitle: 'A Three-Layer Architecture for Decentralized Trust Infrastructure on Solana',
    metrics: [
      { value: '400ms', label: 'Block Time' },
      { value: '100%', label: 'Attestation Coverage' },
      { value: '$0.02', label: 'Deployment Cost' }
    ],
    pdfFile: 'zuup-ecosystem.pdf'
  },
  {
    key: 'veyra',
    icon: 'VΞ',
    iconClass: 'icon-veyra',
    title: 'Veyra',
    subtitle: 'A Post-Super-Intelligence Interplanetary LLM System',
    metrics: [
      { value: '3-22 min', label: 'Light Delay Tolerance' },
      { value: '5-Layer', label: 'Vertical Integration' },
      { value: '7', label: 'Novel Benchmarks' }
    ],
    pdfFile: 'veyra.pdf'
  },
  {
    key: 'podx',
    icon: 'POD',
    iconClass: 'icon-podx',
    title: 'PodX',
    subtitle: 'XdoP-Compliant Mobile Distributed Data Center',
    metrics: [
      { value: '100/100', label: 'WCBI Score' },
      { value: '99.99%', label: 'Availability' },
      { value: '51%', label: 'Carbon Reduction' }
    ],
    pdfFile: 'podx.pdf'
  },
  {
    key: 'relian',
    icon: 'REL',
    iconClass: 'icon-relian',
    title: 'Relian™',
    subtitle: 'AI-Powered Legacy System Refactoring with Blockchain-Verified Migration',
    metrics: [
      { value: '10-100×', label: 'Faster Migration' },
      { value: '80-99%', label: 'Cost Reduction' },
      { value: '85%+', label: 'Risk Prediction' }
    ],
    pdfFile: 'relian.pdf'
  },
  {
    key: 'symbion',
    icon: 'SYM',
    iconClass: 'icon-symbion',
    title: 'Symbion',
    subtitle: 'An Ingestible Gut-Brain Biosensor Platform',
    metrics: [
      { value: '92.5%', label: 'Sensitivity' },
      { value: '94.3%', label: 'Specificity' },
      { value: '50M', label: 'Target Users by 2030' }
    ],
    pdfFile: 'symbion.pdf'
  },
  {
    key: 'qawm',
    icon: 'QΨ',
    iconClass: 'icon-qawm',
    title: 'QAWM',
    subtitle: 'Quantum Archeological World Model — A Computational Framework for Historical Reconstruction',
    metrics: [
      { value: '5-Layer', label: 'Causal Hierarchy' },
      { value: '100%', label: 'Python Codebase' },
      { value: '12', label: 'Primary Modules' }
    ],
    pdfFile: 'qal.pdf'
  }
];

function WhitepaperCard({ paper }: { paper: WhitepaperData }) {
  const [selectedLang, setSelectedLang] = useState('en');
  const [translatedContent, setTranslatedContent] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    setShowTranslation(true);
    
    if (selectedLang === 'en') {
      setTranslatedContent(summaries[paper.key]);
      setIsTranslating(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(summaries[paper.key])}&langpair=en|${selectedLang}`
      );
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData.translatedText) {
        setTranslatedContent(data.responseData.translatedText);
      } else {
        throw new Error('Translation failed');
      }
    } catch {
      setTranslatedContent(`Note: Live translation requires an API connection. For production use, integrate with Google Translate, DeepL, or similar services.\n\nOriginal (English):\n${summaries[paper.key]}`);
    }
    setIsTranslating(false);
  };

  const handleListen = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(summaries[paper.key]);
    utterance.lang = langCodes[selectedLang] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.startsWith(selectedLang)) || voices[0];
    if (targetVoice) utterance.voice = targetVoice;

    setIsPlaying(true);
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <article className="whitepaper-card">
      <div className="card-header">
        <div className={`platform-icon ${paper.iconClass}`}>
          <span>{paper.icon}</span>
        </div>
        <div className="card-title-section">
          <h2 className="card-title">{paper.title}</h2>
          <p className="card-subtitle">{paper.subtitle}</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="summary-section">
          <div className="summary-label">Executive Summary</div>
          <p className="summary-text">{summaries[paper.key]}</p>
          <div className="key-metrics">
            {paper.metrics.map((metric, i) => (
              <div key={i} className="metric">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="actions-bar">
        <div className="language-controls">
          <span className="control-label">Read in:</span>
          <select 
            className="language-select"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="fr">Français</option>
            <option value="ja">日本語</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="hi">हिन्दी</option>
          </select>
          <button className="btn btn-secondary" onClick={handleTranslate}>
            Translate Summary
          </button>
        </div>
        
        <button 
          className={`btn btn-listen ${isPlaying ? 'playing' : ''}`}
          onClick={handleListen}
        >
          {isPlaying ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              Listen
            </>
          )}
        </button>
        
        <div className="spacer" />
        
        <a 
          href={`/whitepapers/${paper.pdfFile}`}
          className="btn btn-download"
          download
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download PDF
        </a>
      </div>

      {showTranslation && (
        <div className="translated-content active">
          <div className="translated-header">
            <span className="translated-title">
              Translated Summary ({langNames[selectedLang]})
            </span>
            <button 
              className="close-translation"
              onClick={() => setShowTranslation(false)}
            >
              ×
            </button>
          </div>
          <div className="translated-body">
            {isTranslating ? (
              <div className="loading-indicator">
                <div className="spinner" />
                Translating to {langNames[selectedLang]}...
              </div>
            ) : (
              translatedContent
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function WhitepapersPage() {
  useEffect(() => {
    // Load voices for speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="whitepapers-page">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      <header className="whitepapers-header">
        <div className="logo-section">
          <Link href="/" className="logo">Zuup Innovation Lab</Link>
          <div className="tagline">Where Ideas Collapse Into Reality</div>
        </div>
        <h1 className="page-title">Technical <span>Whitepapers</span></h1>
      </header>

      <main className="whitepapers-main">
        <div className="whitepapers-grid">
          {whitepapers.map((paper) => (
            <WhitepaperCard key={paper.key} paper={paper} />
          ))}
        </div>
      </main>

      <footer className="whitepapers-footer">
        <div className="footer-logo">ZUUP</div>
        <p className="footer-text">Zuup Innovation Lab — Huntsville, Alabama, USA</p>
        <p className="footer-equation">Energy → Computation → Knowledge → Energy</p>
        <Link href="/" className="back-link">← Back to Home</Link>
      </footer>
    </div>
  );
}
