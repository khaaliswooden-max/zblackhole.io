'use client';

import { useChainSlot } from './ChainSlotContext';

const PROGRAM_FULL = 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM';
const PROGRAM_TRUNC = 'H1eSx6ij1Q2...';

function formatSlot(n: number) {
  return n.toLocaleString('en-US');
}

export default function ChainBar() {
  const slot = useChainSlot();

  return (
    <div
      className="chain-pulse-anchor fixed top-0 left-0 right-0 z-[100] font-mono text-[11px]"
      style={{
        height: 48,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
        color: 'var(--fg-dim)',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-6 px-12 max-md:flex-wrap max-md:gap-2 max-md:px-4 max-md:py-1">
        <span>
          <span style={{ color: 'var(--fg-muted)' }}>Network:</span> Solana Devnet
        </span>
        <span className="max-md:hidden">
          <span style={{ color: 'var(--fg-muted)' }}>Program:</span>{' '}
          <span style={{ color: 'var(--chain-color)' }} title={PROGRAM_FULL}>
            {PROGRAM_TRUNC}
          </span>
        </span>
        <span>
          <span style={{ color: 'var(--fg-muted)' }}>Slot:</span>{' '}
          <span style={{ color: 'var(--chain-color)' }}>
            {slot !== null ? formatSlot(slot) : '—'}
          </span>
        </span>
        <span className="max-md:hidden">
          <span style={{ color: 'var(--fg-muted)' }}>Block Time:</span> ~400ms
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span
            className="chain-dot inline-block h-2 w-2"
            style={{ background: 'var(--chain-color)' }}
            aria-hidden
          />
          <span style={{ color: 'var(--chain-color)' }}>Live</span>
        </span>
      </div>
    </div>
  );
}
