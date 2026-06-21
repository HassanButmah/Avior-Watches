'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Watch } from '@/lib/watches';
import { useState } from 'react';

interface ProductCardProps {
  watch: Watch;
  index?: number;
}

export default function ProductCard({ watch, index = 0 }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = watch.images && watch.images.length > 0 ? watch.images : [watch.image];
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={watch.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Image Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 z-10"
                  style={{ backdropFilter: 'blur(4px)' }}
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 z-10"
                  style={{ backdropFilter: 'blur(4px)' }}
                >
                  ›
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'bg-amber-400 w-6'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
            
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
            <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
              {watch.description}
            </p>

            {/* Specs Preview */}
            <div className="flex flex-wrap gap-2 text-xs text-white/50 mb-4">
              <span className="bg-white/5 px-2 py-1 rounded">{watch.specs.caseSize}</span>
              <span className="bg-white/5 px-2 py-1 rounded">{watch.specs.caseMaterial}</span>
              <span className="bg-white/5 px-2 py-1 rounded">{watch.specs.water_resistance}</span>
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
