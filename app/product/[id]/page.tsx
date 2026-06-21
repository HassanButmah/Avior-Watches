'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import { getWatchById, watches } from '@/lib/watches';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [watch, setWatch] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ id }) => {
      const product = getWatchById(id);
      setWatch(product);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
            <Link href="/collection" className="text-amber-400 hover:text-amber-300 transition">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedWatches = watches
    .filter(w => w.id !== watch.id && w.collection === watch.collection)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Product Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="relative h-[500px] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl overflow-hidden">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[watch.image, ...Array(3).fill(watch.image)].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-24 w-24 rounded-lg border-2 transition-all flex-shrink-0 ${
                      activeImage === idx
                        ? 'border-amber-400'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <div className="text-sm text-white/60 mb-6">
                <Link href="/collection" className="hover:text-amber-400 transition">
                  Collection
                </Link>
                {' / '}
                <span>{watch.name}</span>
              </div>

              {/* Title and Collection */}
              <div className="mb-8">
                <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  {watch.collection}
                </p>
                <h1 className="text-5xl font-bold mb-4">{watch.name}</h1>
                <p className="text-xl text-white/70">{watch.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(watch.rating) ? 'fill-current' : 'fill-white/20'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/60">({watch.reviews} reviews)</span>
              </div>

              {/* Price and Availability */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm mb-2">Price</p>
                    <p className="text-4xl font-bold text-amber-400">
                      ${watch.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    {watch.availability === "in_stock" && (
                      <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">
                        ✓ In Stock
                      </span>
                    )}
                    {watch.availability === "limited" && (
                      <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-semibold">
                        ⚡ Limited Edition
                      </span>
                    )}
                    {watch.availability === "preorder" && (
                      <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold">
                        ⏱ Pre-Order
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {watch.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-white/60 hover:text-white transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 border-l border-r border-white/20">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-white/60 hover:text-white transition"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                >
                  Add to Cart
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border border-white/20 text-white font-semibold rounded-lg hover:border-amber-400 hover:text-amber-400 transition-all"
              >
                Save for Later
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Movement", value: watch.specs.movement },
              { label: "Case Size", value: watch.specs.caseSize },
              { label: "Case Material", value: watch.specs.caseMaterial },
              { label: "Water Resistance", value: watch.specs.water_resistance },
              { label: "Crystal", value: watch.specs.crystal },
              { label: "Dial", value: watch.specs.dial },
              { label: "Strap", value: watch.specs.strap },
              { label: "Power Reserve", value: watch.specs.power_reserve },
            ].map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-black/50 p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all"
              >
                <p className="text-white/60 text-sm mb-2">{spec.label}</p>
                <p className="text-white font-semibold">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Functions & Complications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {watch.specs.functions.map((fn: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-400/10 to-yellow-300/5 border border-amber-400/30 rounded-xl p-6 text-center hover:bg-gradient-to-br hover:from-amber-400/20 hover:to-yellow-300/10 transition-all"
              >
                <p className="text-white font-semibold">{fn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedWatches.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Related Watches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedWatches.map((w, idx) => (
                <Link key={w.id} href={`/product/${w.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
                  >
                    <div className="relative h-60 overflow-hidden bg-black">
                      <img
                        src={w.image}
                        alt={w.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {w.name}
                      </h3>
                      <p className="text-amber-400 font-bold mt-2">
                        ${w.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <li><Link href="/collection" className="hover:text-amber-400 transition">All Watches</Link></li>
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
