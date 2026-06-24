import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { env } from '@/lib/env';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Avior Prestige | Luxury Watches',
    template: '%s | Avior Prestige',
  },
  description:
    'Experience precision engineering and timeless elegance with Avior Prestige. Luxury watches crafted for the discerning connoisseur.',
  keywords: ['luxury watches', 'Avior', 'Prestige', 'Swiss watches', 'horology'],
  authors: [{ name: 'Avior Prestige' }],
  openGraph: {
    title: 'Avior Prestige | Luxury Watches',
    description: 'Experience precision engineering and timeless elegance with Avior Prestige.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Avior Prestige',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avior Prestige | Luxury Watches',
    description: 'Experience precision engineering and timeless elegance with Avior Prestige.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
