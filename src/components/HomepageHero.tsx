'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const SlideshowHero = dynamic(() => import('./SlideshowHero'), { ssr: false });

export default function HomepageHero() {
  const pathname = usePathname();
  if (pathname !== '/') return null;
  return <SlideshowHero />;
}
