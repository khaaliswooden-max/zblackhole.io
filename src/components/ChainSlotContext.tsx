'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const RPC = 'https://api.devnet.solana.com';

const SlotContext = createContext<number | null>(null);

export function useChainSlot() {
  return useContext(SlotContext);
}

export function ChainSlotProvider({ children }: { children: ReactNode }) {
  const [slot, setSlot] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchSlot = async () => {
      try {
        const res = await fetch(RPC, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getSlot',
            params: [{ commitment: 'finalized' }],
          }),
        });
        const json = await res.json();
        const s = json?.result;
        if (!cancelled && typeof s === 'number') setSlot(s);
      } catch {
        if (!cancelled) setSlot(null);
      }
    };
    fetchSlot();
    const t = setInterval(fetchSlot, 5000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return <SlotContext.Provider value={slot}>{children}</SlotContext.Provider>;
}
