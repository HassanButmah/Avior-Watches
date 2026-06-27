'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Settings } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { toCurrency } from '@/lib/format';
import { MinusIcon, PlusIcon, TrashIcon } from './Icons';

export default function CartPageClient({ settings }: { settings: Settings }) {
  const { items, updateQuantity, removeItem, total } = useCartStore();

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Cart</p>
        <h1 className="mt-4 font-display text-5xl text-white">Review your selection</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-carbon-card p-10 text-center text-white/60">
          Cart is empty. Browse the collections to add a piece.
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-3xl border border-white/10 bg-carbon-card p-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-carbon-deep">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-white">{item.name}</h2>
                      <p className="text-sm text-white/55">{item.nameAr}</p>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)} className="text-white/40 hover:text-red-400">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full border border-white/10 p-2 text-white/70">
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-white">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full border border-white/10 p-2 text-white/70">
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="ml-auto text-white">{toCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-carbon-card p-6">
            <h2 className="font-display text-3xl text-white">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-white/65">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{toCurrency(total())}</span>
              </div>
              <div className="flex justify-between">
                <span>Free shipping threshold</span>
                <span>{toCurrency(settings.freeShippingThreshold)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-gold mt-8 block rounded-full px-5 py-3 text-center text-sm">
              Continue to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
