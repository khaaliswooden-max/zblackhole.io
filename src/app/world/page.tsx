import WorldCanvas from '@/components/WorldCanvas';

export const metadata = {
  title: 'World — Zuup Innovation Lab',
  description: 'Live causal world model across nine Zuup substrates.',
};

export default function WorldPage() {
  return (
    <main>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <WorldCanvas />
      </div>
      <section
        className="page-shell border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex flex-col gap-2">
          <p
            className="font-mono text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--fg-muted)' }}
          >
            ZWM — Zuup World Model
          </p>
          <p
            className="body-small max-w-[520px]"
            style={{ color: 'var(--fg-dim)' }}
          >
            Force-directed graph of WorldActors, substrate state snapshots, and causal
            SubstrateEvents. Faint edges show HAS_STATE relationships; coral edges show
            CAUSED_BY propagation chains. Click any node to inspect.
          </p>
        </div>
      </section>
    </main>
  );
}
