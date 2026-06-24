'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square bg-black luxury-border rounded-lg overflow-hidden cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[activeIndex]}
            alt={`${name} - view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              'object-contain p-8 md:p-12 transition-transform duration-300',
              isZoomed && 'scale-150'
            )}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                : undefined
            }
          />
        </motion.div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Product images">
        {images.map((img, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`View image ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300',
              activeIndex === idx ? 'border-gold' : 'border-white/10 hover:border-white/30'
            )}
          >
            <Image src={img} alt="" fill className="object-contain p-2 bg-black" sizes="96px" />
          </button>
        ))}
      </div>
    </div>
  );
}
