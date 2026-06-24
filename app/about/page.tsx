import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story behind Avior Prestige — luxury watches crafted with precision and Palestinian heritage.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 text-center">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-8 text-center">The Avior Legacy</h1>
          <p className="text-white/60 text-lg leading-relaxed mb-12 text-center max-w-2xl mx-auto">
            Born from a passion for horological excellence and rooted in Palestinian heritage, Avior Prestige represents the convergence of tradition and innovation.
          </p>

          <div className="space-y-12">
            {[
              {
                title: 'Craftsmanship',
                content:
                  'Every Avior timepiece is assembled by master watchmakers who bring decades of experience to each component. We source the finest materials — from Swiss movements to sapphire crystals — ensuring every detail meets the highest standards.',
              },
              {
                title: 'Innovation',
                content:
                  'While honoring traditional watchmaking techniques, we embrace modern engineering. Our in-house movements, advanced water resistance systems, and precision chronometer certification push the boundaries of what luxury timepieces can achieve.',
              },
              {
                title: 'Heritage',
                content:
                  'Est. 2025 in Palestine, Avior Prestige carries forward a legacy of resilience and excellence. Our watches are more than instruments of time — they are symbols of enduring craftsmanship and cultural pride.',
              },
            ].map((section) => (
              <div key={section.title} className="glass-surface luxury-border rounded-lg p-8">
                <h2 className="font-display text-2xl text-gold mb-4">{section.title}</h2>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
