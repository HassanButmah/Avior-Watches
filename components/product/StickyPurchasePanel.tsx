'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Minus, Plus, Star } from 'lucide-react';
import type { Watch } from '@/lib/watches';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatPrice, getProductBadges } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { ShippingInfo } from './ProductSpecs';

interface StickyPurchasePanelProps {
  watch: Watch;
}

export default function StickyPurchasePanel({ watch }: StickyPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const badges = getProductBadges(watch);
  const wishlisted = isWishlisted(watch.id);

  const availabilityBadge = {
    in_stock: 'stock' as const,
    limited: 'limited' as const,
    preorder: 'preorder' as const,
  };

  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      <div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {badges.map((badge) => (
            <Badge
              key={badge}
              variant={badge === 'New' ? 'new' : badge === 'Bestseller' ? 'bestseller' : 'limited'}
            />
          ))}
          <Badge variant={availabilityBadge[watch.availability]} />
        </div>

        <nav className="text-white/40 text-xs tracking-wider mb-4" aria-label="Breadcrumb">
          <Link href="/collection" className="hover:text-gold transition-colors">
            Collection
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{watch.name}</span>
        </nav>

        <p className="text-gold text-[10px] uppercase tracking-[0.25em] mb-2">{watch.collection}</p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
          {watch.name}
        </h1>
        <p className="text-white/60 leading-relaxed">{watch.description}</p>
      </div>

      <div className="flex items-center gap-3 pb-6 border-b border-white/10">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(watch.rating) ? 'text-gold fill-gold' : 'text-white/20'}
            />
          ))}
        </div>
        <span className="text-white/50 text-sm">
          {watch.rating} ({watch.reviews} reviews)
        </span>
      </div>

      <p className="text-gold text-3xl md:text-4xl font-semibold">{formatPrice(watch.price)}</p>

      <div>
        <h3 className="text-white text-sm font-medium mb-3">Key Features</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {watch.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-white/60 text-sm">
              <span className="text-gold mt-0.5">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center border border-white/15 rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-white/60 hover:text-gold transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-3 border-x border-white/15 text-white min-w-[3rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-white/60 hover:text-gold transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <Button
          className="flex-1"
          onClick={() => addItem(watch, quantity)}
        >
          <ShoppingBag size={16} />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          onClick={() => toggle(watch.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </Button>
      </div>

      <ShippingInfo info={watch.shippingInfo} />
    </div>
  );
}

interface RelatedProductsProps {
  products: Watch[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-t border-white/10" aria-labelledby="related-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="related-heading" className="font-display text-3xl md:text-4xl text-white mb-10">
          Related Timepieces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, idx) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group glass-surface luxury-border rounded-lg overflow-hidden hover:border-gold/20 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-gold text-[10px] uppercase tracking-widest mb-1">{product.collection}</p>
                  <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gold font-semibold mt-2">{formatPrice(product.price)}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
