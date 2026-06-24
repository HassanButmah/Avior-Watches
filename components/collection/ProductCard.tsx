'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import type { Watch } from '@/lib/watches';
import { formatPrice, getProductBadges, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useUIStore } from '@/store/ui-store';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  watch: Watch;
  index?: number;
}

export default function ProductCard({ watch, index = 0 }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = watch.images.length > 0 ? watch.images : [watch.image];
  const badges = getProductBadges(watch);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const openQuickView = useUIStore((s) => s.openQuickView);
  const wishlisted = isWishlisted(watch.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(watch);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(watch.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(watch);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0, 0, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="glass-surface luxury-border rounded-lg overflow-hidden transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5">
        <Link href={`/product/${watch.id}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-black">
            <Image
              src={images[currentImage]}
              alt={watch.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                'object-contain p-6 transition-transform duration-700',
                isHovered && 'scale-105'
              )}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={
                    badge === 'New' ? 'new' : badge === 'Bestseller' ? 'bestseller' : 'limited'
                  }
                />
              ))}
            </div>

            {/* Hover actions */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-4 bottom-4 flex gap-2 z-10"
            >
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-gold to-gold-light text-black text-xs font-semibold tracking-wider uppercase hover:shadow-lg hover:shadow-gold/30 transition-shadow"
                aria-label={`Add ${watch.name} to cart`}
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
              <button
                onClick={handleQuickView}
                className="p-2.5 glass-surface luxury-border text-white/80 hover:text-gold transition-colors"
                aria-label={`Quick view ${watch.name}`}
              >
                <Eye size={16} />
              </button>
              <button
                onClick={handleWishlist}
                className={cn(
                  'p-2.5 glass-surface luxury-border transition-colors',
                  wishlisted ? 'text-gold border-gold/40' : 'text-white/80 hover:text-gold'
                )}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </motion.div>

            {/* Image dots */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImage(idx);
                    }}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      idx === currentImage ? 'w-6 bg-gold' : 'w-1.5 bg-white/30 hover:bg-white/50'
                    )}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-5 md:p-6">
            <p className="text-gold text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
              {watch.collection}
            </p>
            <h3 className="font-display text-lg md:text-xl text-white mb-2 group-hover:text-gold transition-colors duration-300">
              {watch.name}
            </h3>
            <p className="text-white/50 text-sm line-clamp-2 mb-4 leading-relaxed">{watch.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-gold fill-gold" />
                <span className="text-white/70 text-sm">{watch.rating}</span>
                <span className="text-white/30 text-xs">({watch.reviews})</span>
              </div>
              <p className="text-gold font-semibold text-lg">{formatPrice(watch.price)}</p>
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
}
