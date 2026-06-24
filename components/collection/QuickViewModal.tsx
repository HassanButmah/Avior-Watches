'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useUIStore } from '@/store/ui-store';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { formatPrice, getProductBadges } from '@/lib/utils';

export default function QuickViewModal() {
  const { isQuickViewOpen, quickViewWatch, closeQuickView } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  if (!quickViewWatch) return null;

  const badges = getProductBadges(quickViewWatch);
  const wishlisted = isWishlisted(quickViewWatch.id);

  return (
    <Modal isOpen={isQuickViewOpen} onClose={closeQuickView} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square bg-black">
          <Image
            src={quickViewWatch.image}
            alt={quickViewWatch.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === 'New' ? 'new' : badge === 'Bestseller' ? 'bestseller' : 'limited'}
              />
            ))}
          </div>
          <p className="text-gold text-[10px] uppercase tracking-[0.2em] mb-2">{quickViewWatch.collection}</p>
          <h2 className="font-display text-2xl text-white mb-3">{quickViewWatch.name}</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{quickViewWatch.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(quickViewWatch.rating) ? 'text-gold fill-gold' : 'text-white/20'}
                />
              ))}
            </div>
            <span className="text-white/40 text-xs">({quickViewWatch.reviews} reviews)</span>
          </div>

          <p className="text-gold text-2xl font-semibold mb-6">{formatPrice(quickViewWatch.price)}</p>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                addItem(quickViewWatch);
                closeQuickView();
              }}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle(quickViewWatch.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </Button>
          </div>

          <Link href={`/product/${quickViewWatch.id}`} onClick={closeQuickView}>
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-block mt-4 text-gold text-xs tracking-wider uppercase hover:text-gold-light transition-colors"
            >
              View Full Details →
            </motion.span>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
