import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
