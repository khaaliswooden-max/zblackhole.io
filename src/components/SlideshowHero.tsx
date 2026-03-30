'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDES = [
  { src: '/images/slide-1.png', alt: '' },
  { src: '/images/slide-2.png', alt: '' },
  { src: '/images/slide-3.png', alt: '' },
  { src: '/images/slide-4.png', alt: '' },
  { src: '/images/slide-5.png', alt: '' },
];

const INTERVAL_MS = 5000;

export default function SlideshowHero() {
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: reducedMotion ? 'none' : 'opacity 1000ms ease-in-out',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority={i === 0}
          />
        </div>
      ))}
      {/* Dark overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 10,
        }}
      />
    </div>
  );
}
