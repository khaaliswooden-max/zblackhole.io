'use client';

import ChainBar from './ChainBar';
import { ChainSlotProvider } from './ChainSlotContext';
import Nav from './Nav';

export default function SiteHeader() {
  return (
    <ChainSlotProvider>
      <ChainBar />
      <Nav />
    </ChainSlotProvider>
  );
}
