'use client';

import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { watches, getAllCollections } from '@/lib/watches';
import { motion } from 'framer-motion';

export default function CollectionPage() {
  const collections = getAllCollections();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-950/20 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Our Collection
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover our exclusive range of luxury watches, each crafted with precision and passion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="px-6 py-2 rounded-lg border border-amber-400 text-amber-400 font-semibold hover:bg-amber-400/10 transition-all"
              onClick={() => window.location.href = '/collection'}
            >
              All Watches
            </button>
            {collections.map((collection) => (
              <button
                key={collection}
                className="px-6 py-2 rounded-lg border border-white/20 text-white/70 font-semibold hover:border-amber-400 hover:text-amber-400 transition-all"
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watches.map((watch, index) => (
              <ProductCard key={watch.id} watch={watch} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-amber-400 font-bold mb-4">AVIOR</h3>
              <p className="text-white/60 text-sm">
                Luxury watches crafted with precision and passion
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="/collection" className="hover:text-amber-400 transition">All Watches</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Shipping</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 Avior Prestige. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
