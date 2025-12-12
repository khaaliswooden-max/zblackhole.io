import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Khaalis Wooden | Zuup Innovation Lab',
  description: 'Thirty years of shop-floor wisdom meets frontier technology. Meet Khaalis Wooden, founder of Zuup Innovation Lab—veteran, builder, journeyman.',
  openGraph: {
    title: 'About | Khaalis Wooden | Zuup Innovation Lab',
    description: 'Thirty years of shop-floor wisdom meets frontier technology. Meet Khaalis Wooden, founder of Zuup Innovation Lab.',
    type: 'profile',
    firstName: 'Khaalis',
    lastName: 'Wooden',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Khaalis Wooden | Zuup Innovation Lab',
    description: 'Thirty years of shop-floor wisdom meets frontier technology.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
