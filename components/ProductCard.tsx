'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product, Settings } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { toCurrency } from '@/lib/format';
import { BagIcon } from './Icons';

export default function ProductCard({ product, settings }: { product: Product; settings: Settings }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-carbon-card transition hover:-translate-y-1 hover:border-gold/40">
      <Link href={`/collections/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/70">{product.category}</p>
            <h3 className="mt-2 font-display text-2xl text-white">{product.name}</h3>
            <p className="mt-1 text-sm text-white/55">{product.nameAr}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-white">{toCurrency(product.price)}</p>
            <p className="text-xs text-white/50">{toCurrency(product.price * settings.usdToIls, 'ILS')}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-white/65">{product.description}</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => addItem({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.image })}
            className="btn-gold flex-1 rounded-full px-4 py-3 text-sm"
          >
            <BagIcon className="mr-2 inline-block h-4 w-4" />
            Add to Cart
          </button>
          <Link
            href={`/collections/${product.id}`}
            className="rounded-full border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:border-gold hover:text-gold"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
