import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Avior Prestige | Luxury Watches",
  description: "Experience precision engineering and timeless elegance with Avior Prestige. Luxury watches crafted for the discerning.",
  openGraph: {
    title: "Avior Prestige | Luxury Watches",
    description: "Experience precision engineering and timeless elegance with Avior Prestige.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
