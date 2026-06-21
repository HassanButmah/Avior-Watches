'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Watch } from '@/lib/watches';

interface ProductCardProps {
  watch: Watch;
  index?: number;
}

export default function ProductCard({ watch, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${watch.id}`}>
        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
          {/* Image Container */}
          <div className="relative h-80 overflow-hidden bg-black">
            <motion.img
              src={watch.image}
              alt={watch.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <button className="w-full py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-200">
                View Details
              </button>
            </div>

            {/* Availability Badge */}
            <div className="absolute top-4 right-4">
              {watch.availability === "in_stock" && (
                <span className="px-3 py-1 bg-green-500/80 text-white text-xs font-semibold rounded-full backdrop-blur">
                  In Stock
                </span>
              )}
              {watch.availability === "limited" && (
                <span className="px-3 py-1 bg-amber-500/80 text-white text-xs font-semibold rounded-full backdrop-blur">
                  Limited
                </span>
              )}
              {watch.availability === "preorder" && (
                <span className="px-3 py-1 bg-blue-500/80 text-white text-xs font-semibold rounded-full backdrop-blur">
                  Pre-Order
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Collection */}
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              {watch.collection}
            </p>

            {/* Name */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              {watch.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/60 mb-4 line-clamp-2">
              {watch.description}
            </p>

            {/* Specs Preview */}
            <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
              <span>{watch.specs.caseSize}</span>
              <span>•</span>
              <span>{watch.specs.caseMaterial}</span>
              <span>•</span>
              <span>{watch.specs.water_resistance}</span>
            </div>

            {/* Rating and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(watch.rating) ? 'fill-current' : 'fill-white/20'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-white/60">({watch.reviews})</span>
              </div>
              <p className="text-lg font-bold text-amber-400">
                ${watch.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
