'use client';

import Header from '@/app/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-950/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              About Avior
            </h1>
            <p className="text-xl text-white/70">
              Crafting timeless elegance since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Avior Prestige was founded on the belief that luxury watches are more than just timepieces—they are expressions of style, precision, and craftsmanship. Our journey began in the heart of Switzerland, where master watchmakers dedicated themselves to creating exceptional timepieces that would stand the test of time.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Each watch in our collection represents years of research, development, and meticulous attention to detail. We combine traditional Swiss watchmaking techniques with modern innovation to create watches that are both timeless and contemporary.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Today, Avior Prestige is recognized worldwide as a symbol of excellence, reliability, and sophisticated taste. Our watches are cherished by collectors, professionals, and enthusiasts who appreciate the finer things in life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision",
                description: "Every movement is tested to COSC standards for accuracy"
              },
              {
                title: "Craftsmanship",
                description: "Handcrafted details by master watchmakers with decades of experience"
              },
              {
                title: "Innovation",
                description: "Combining traditional techniques with modern technology"
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/50 p-8 rounded-xl border border-white/10 text-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-amber-400">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Discover Our Collection</h2>
          <p className="text-xl text-white/70 mb-8">
            Experience the perfect blend of tradition and innovation
          </p>
          <Link href="/collection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-200"
            >
              View Collection
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-amber-400 font-bold mb-4">AVIOR</h3>
              <p className="text-white/60 text-sm">Luxury watches crafted with precision</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="/collection" className="hover:text-amber-400 transition">All Watches</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="/about" className="hover:text-amber-400 transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Instagram</a></li>
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
