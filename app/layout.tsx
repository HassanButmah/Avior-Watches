import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SiteShell from '@/components/SiteShell';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://avior.vercel.app'),
  title: 'Avior Watches | Luxury Timepieces from Hebron, Palestine',
  description:
    'Avior — Premium luxury watches and accessories. Crafted for eternity. Born in Hebron, Palestine. مصنوعة للأبد',
  openGraph: {
    title: 'Avior Watches | Luxury Timepieces from Hebron, Palestine',
    description: 'Premium luxury watches and accessories. Crafted for eternity.',
    images: ['/images/watch-assembled.jpg'],
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className="font-body antialiased">
        <SiteShell settings={settings}>{children}</SiteShell>
      </body>
    </html>
  );
}
