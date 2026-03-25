import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Khaalis Wooden | Zuup Innovation Lab',
  description:
    'Founder credentials and timeline for Khaalis Wooden, Zuup Innovation Lab, Huntsville, Alabama.',
  openGraph: {
    title: 'About | Khaalis Wooden | Zuup Innovation Lab',
    description:
      'Founder credentials and timeline for Khaalis Wooden, Zuup Innovation Lab.',
    type: 'profile',
    firstName: 'Khaalis',
    lastName: 'Wooden',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Khaalis Wooden | Zuup Innovation Lab',
    description: 'Founder credentials and timeline for Khaalis Wooden, Zuup Innovation Lab.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
