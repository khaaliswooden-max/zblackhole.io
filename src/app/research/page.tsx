'use client';

import AudioPlayer from '@/components/AudioPlayer';
import { researchPapers, type ResearchPaper } from '@/lib/research';
import { PLATFORMS, statusClass, statusLabel } from '@/lib/platforms';

function PlatformBadge({ platformId, platformLabel }: { platformId: string | null; platformLabel: string }) {
  const platform = platformId ? PLATFORMS.find((p) => p.id === platformId) : null;
  const cls = platform ? statusClass(platform.status) : 'badge';
  const label = platform ? `${platform.id} · ${platform.name}` : platformLabel;
  const statusLbl = platform ? statusLabel(platform.status) : 'Cross-Platform';

  return (
    <div className="flex items-center gap-2">
      <span className={cls}>{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--fg-muted)' }}>
        {statusLbl}
      </span>
    </div>
  );
}

function PaperCard({ paper }: { paper: ResearchPaper }) {
  return (
    <article
      className="border p-6 md:p-8"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Header row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <PlatformBadge platformId={paper.platformId} platformLabel={paper.platformLabel} />
        <span className="font-mono text-[11px] tabular-nums" style={{ color: 'var(--fg-muted)' }}>
          {paper.paperId} · {paper.date}
        </span>
      </div>

      {/* Title + audio row */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <h2 className="max-w-3xl font-mono text-[15px] leading-snug" style={{ color: 'var(--fg)' }}>
          {paper.title}
        </h2>
        <AudioPlayer src={`/api/narrate/${paper.audioBase}`} label="Abstract" />
      </div>

      {/* Abstract sections */}
      <div
        className="mb-6 border-t pt-6 flex flex-col gap-5"
        style={{ borderColor: 'var(--line)' }}
      >
        {paper.sections.map((sec) => (
          <div key={sec.heading}>
            <div
              className="mb-1 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'var(--fg-muted)' }}
            >
              {sec.heading}
            </div>
            <p className="body-small leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
              {sec.body}
            </p>
          </div>
        ))}
      </div>

      {/* Footer: keywords + PDF */}
      <div
        className="border-t pt-4 flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex flex-wrap gap-2">
          {paper.keywords.map((kw) => (
            <span
              key={kw}
              className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
              style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}
            >
              {kw}
            </span>
          ))}
        </div>
        <a
          href={`/whitepapers/${paper.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-[11px]"
        >
          Download PDF
        </a>
      </div>
    </article>
  );
}

export default function ResearchPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Research
      </h1>
      <p className="body-small mb-2 max-w-2xl">
        Technical papers for each Zuup platform. Each entry carries the originating platform, a full academic abstract, and a link to the primary PDF.
      </p>
      <p className="body-small mb-10 max-w-3xl" style={{ color: 'var(--fg-dim)' }}>
        Epistemic markers: ✓ Verified · ◐ Plausible · ◯ Speculative
      </p>
      <div className="flex flex-col gap-8">
        {researchPapers.map((paper) => (
          <PaperCard key={paper.key} paper={paper} />
        ))}
      </div>
    </main>
  );
}
