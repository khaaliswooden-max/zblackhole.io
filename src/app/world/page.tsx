import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'World — Zuup Innovation Lab',
  description:
    'Live force-directed graph of the Zuup World Model: WorldActors, substrate state snapshots, and causal SubstrateEvents on Solana Devnet.',
};

const WorldCanvas = dynamic(() => import('@/components/WorldCanvas'), { ssr: false });

export default function WorldPage() {
  return (
    <main
      style={{
        height: 'calc(100vh - var(--header-offset))',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <WorldCanvas />
    </main>
  );
}
