'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import { benchmarks, type Benchmark } from '@/lib/benchmarks';

const BenchmarkChart3D = dynamic(
  () => import('@/components/BenchmarkChart3D'),
  { ssr: false }
);

function FullDescription({ text }: { text: string }) {
  return (
    <div
      className="mt-4 font-mono text-[11px] leading-relaxed"
      style={{ color: 'var(--fg-dim)', whiteSpace: 'pre-line' }}
    >
      {text}
    </div>
  );
}

function BenchmarkCard({ bench }: { bench: Benchmark }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t pt-10 pb-4" style={{ borderColor: 'var(--line)' }}>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--fg-muted)' }}
            >
              {bench.platform}
            </span>
            <span
              className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}
            >
              {bench.code}
            </span>
          </div>
          <h2
            className="font-mono text-[15px] font-normal leading-snug"
            style={{ color: 'var(--fg)' }}
          >
            {bench.title}
          </h2>
        </div>
        <AudioPlayer src={`/api/narrate/${bench.audioSlug}`} label="Summary" />
      </div>

      {/* 3D Chart */}
      <div className="mb-5 border" style={{ borderColor: 'var(--line)' }}>
        <BenchmarkChart3D metrics={bench.chartMetrics} />
      </div>

      {/* Short summary */}
      <p className="body-small mb-4 max-w-3xl">{bench.summary}</p>

      {/* Full description accordion */}
      <button
        type="button"
        onClick={() => setOpen((v: boolean) => !v)}
        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150"
        style={{
          color: open ? 'var(--fg-dim)' : 'var(--fg-muted)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms ease',
          }}
        >
          ▶
        </span>
        {open ? 'Hide' : 'Full Description'}
      </button>

      {open && <FullDescription text={bench.fullDescription} />}
    </section>
  );
}

export default function BenchmarksPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Benchmarks
      </h1>
      <p className="body-small mb-4 max-w-2xl">
        Nine benchmark frameworks across the Zuup ecosystem. Each chart is interactive — drag to
        rotate. Audio plays a summary narration.
      </p>

      <div className="flex flex-col">
        {benchmarks.map((bench) => (
          <BenchmarkCard key={bench.key} bench={bench} />
        ))}
      </div>
    </main>
  );
}
