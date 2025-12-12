import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://zblackhole.io'),
  title: 'Zuup Innovation Lab | Where Ideas Collapse Into Reality',
  description: 'Zuup Innovation Lab develops breakthrough platforms at the intersection of AI, autonomy, procurement, compliance, and distributed systems. Seven proprietary technologies forging the future.',
  keywords: ['AI', 'innovation lab', 'autonomy', 'procurement', 'compliance', 'distributed systems', 'quantum computing', 'biotech'],
  authors: [{ name: 'Zuup Innovation Lab' }],
  openGraph: {
    title: 'Zuup Innovation Lab',
    description: 'Where Ideas Collapse Into Reality',
    url: 'https://zblackhole.io',
    siteName: 'Zuup Innovation Lab',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zuup Innovation Lab - Black Hole',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuup Innovation Lab',
    description: 'Where Ideas Collapse Into Reality',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
