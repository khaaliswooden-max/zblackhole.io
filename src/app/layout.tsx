import type { Metadata } from 'next';
import '@/styles/tokens.css';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';

export const metadata: Metadata = {
  metadataBase: new URL('https://zblackhole.io'),
  title: 'Zuup Innovation Lab',
  description:
    'Nine-platform on-chain intelligence network. Procurement, trust, compliance, edge, biosensing, legacy migration, and treasury rails on Solana.',
  keywords: [
    'Solana',
    'Zuup',
    'trust infrastructure',
    'procurement',
    'compliance',
    'edge computing',
  ],
  authors: [{ name: 'Zuup Innovation Lab' }],
  openGraph: {
    title: 'Zuup Innovation Lab',
    description: 'Nine platforms. One substrate. On-chain.',
    url: 'https://zblackhole.io',
    siteName: 'Zuup Innovation Lab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuup Innovation Lab',
    description: 'Nine platforms. One substrate. On-chain.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        <div style={{ paddingTop: 'var(--header-offset)' }}>{children}</div>
      </body>
    </html>
  );
}
