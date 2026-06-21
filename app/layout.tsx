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
  title: "Rolex Day-Date 40 | Avior Watches",
  description: "A century of mastery. The Rolex Day-Date 40 in Everose gold.",
  openGraph: {
    title: "Rolex Day-Date 40 | Avior Watches",
    description: "A century of mastery. The Rolex Day-Date 40 in Everose gold.",
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
