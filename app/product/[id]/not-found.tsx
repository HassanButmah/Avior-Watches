import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4">Not Found</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Timepiece Not Found</h1>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            The watch you&apos;re looking for may have been discontinued or moved.
          </p>
          <Link
            href="/collection"
            className="inline-block bg-gradient-to-r from-gold to-gold-light text-black px-8 py-3 text-xs tracking-widest uppercase font-semibold"
          >
            Browse Collection
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
