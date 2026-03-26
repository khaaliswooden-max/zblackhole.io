'use client';

import AudioPlayer from '@/components/AudioPlayer';
import { canonicalPapers, orbPaper, type Paper } from '@/lib/papers';

function Card({ paper }: { paper: Paper }) {
  return (
    <article className="flex flex-col border p-6" style={{ borderColor: 'var(--line)' }}>
      <div className="mb-3 font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
        {paper.paperId} · {paper.date}
      </div>
      <h2 className="mono-14 mb-3">{paper.title}</h2>
      <p className="body-small mb-6">{paper.summary}</p>
      <div className="mb-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
        {paper.metrics.map((m) => (
          <div key={m.label}>
            <div className="tabular-nums" style={{ color: 'var(--fg)' }}>
              {m.value}
            </div>
            <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
        <a
          href={`/whitepapers/${paper.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-[11px]"
        >
          Download PDF
        </a>
        <AudioPlayer src={`/api/narrate/${paper.audioBase}`} label="Play" />
      </div>
    </article>
  );
}

export default function WhitepapersPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Whitepapers
      </h1>
      <p className="body-small mb-10 max-w-2xl">
        PDF and audio pairs for each platform paper. PDFs are static assets under /whitepapers/.
      </p>
      <div
        className="mb-16 grid gap-6 max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        {canonicalPapers.map((p) => (
          <Card key={p.key} paper={p} />
        ))}
      </div>
      <section className="border-t pt-12" style={{ borderColor: 'var(--line)' }}>
        <h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
          Extended Research
        </h2>
        <p className="body-small mb-6 max-w-3xl">
          Orb is a spatial intelligence research project developed within the Zuup Lab. It integrates with
          Aureon, Veyra, Civium, PodX, QAL, Symbion, and Relian as a post-ASI layer.
        </p>
        <article className="flex flex-col border p-6" style={{ borderColor: 'var(--line)' }}>
          <div className="mb-3 font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
            {orbPaper.paperId} · {orbPaper.date}
          </div>
          <h2 className="mono-14 mb-3">{orbPaper.title}</h2>
          <p className="body-small mb-6">{orbPaper.summary}</p>
          <div className="mb-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <div>
              <div style={{ color: 'var(--fg)' }}>3DGS</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Representation
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--fg)' }}>Edge</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Target tier
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--fg)' }}>LM</div>
              <div className="uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
                Coupling
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
            <a
              href={`/whitepapers/${orbPaper.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-[11px]"
            >
              Download PDF
            </a>
            <AudioPlayer src={`/api/narrate/${orbPaper.audioBase}`} label="Play" />
          </div>
        </article>
      </section>
      <p className="body-small mt-12 max-w-3xl border-t pt-8" style={{ borderColor: 'var(--line)' }}>
        Audio narrations are AI-voiced readings of each executive summary. Files hosted at /audio/whitepapers/.
      </p>
    </main>
  );
}
