'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useChainSlot } from './ChainSlotContext';

const LINKS = [
  { href: '/platforms', label: 'Platforms' },
  { href: '/whitepapers', label: 'Whitepapers' },
  { href: '/benchmarks', label: 'Benchmarks' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function formatSlot(n: number) {
  return n.toLocaleString('en-US');
}

export default function Nav() {
  const pathname = usePathname();
  const slot = useChainSlot();

  return (
    <nav
      className="fixed left-0 right-0 z-[99] font-mono font-medium"
      style={{
        top: 48,
        height: 52,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="relative mx-auto flex h-full max-w-[1200px] items-center px-12 max-md:justify-between max-md:px-4"
      >
        <Link
          href="/"
          className="shrink-0 text-[14px] tracking-wide"
          style={{ color: 'var(--fg)' }}
        >
          ZUUP
        </Link>
        <div className="flex min-w-0 flex-1 justify-center overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <div className="flex items-center gap-5 px-2 max-[900px]:gap-3">
            {LINKS.map(({ href, label }) => {
              const active =
                pathname === href ||
                (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 text-[12px] transition-colors duration-150 max-[900px]:text-[11px]"
                  style={{
                    color: active ? 'var(--fg)' : 'var(--fg-muted)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className="hidden shrink-0 text-[11px] min-[901px]:block"
          style={{ color: 'var(--chain-color)' }}
        >
          Slot {slot !== null ? formatSlot(slot) : '—'}
        </div>
      </div>
    </nav>
  );
}
