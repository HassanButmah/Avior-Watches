'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import type { Settings } from '@/lib/types';
import { toCurrency } from '@/lib/format';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

export default function CartDrawer({ settings }: { settings: Settings }) {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, total, clearCart } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeItems = mounted ? items : [];
  const safeIsDrawerOpen = mounted && isDrawerOpen;
  const safeTotal = mounted ? total() : 0;
  const shippingRemaining = Math.max(0, settings.freeShippingThreshold - safeTotal);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity ${
          safeIsDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-carbon-card shadow-2xl transition-transform duration-300 ${
          safeIsDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Cart</p>
            <h2 className="font-display text-2xl text-white">Your Selection</h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full border border-white/10 p-2 text-white/70"
            aria-label="Close cart"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {safeItems.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-white/60">
              <div>
                <p className="mb-2 text-lg font-medium text-white">Your cart is empty</p>
                <p className="text-sm">Add a piece from the collections to begin.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {safeItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-white/10 p-3">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-carbon-deep">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{item.name}</p>
                        <p className="text-sm text-white/50">{toCurrency(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-white/40 transition hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full border border-white/10 p-2 text-white/70"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full border border-white/10 p-2 text-white/70"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-5">
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{toCurrency(safeTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Free shipping</span>
              <span>{shippingRemaining > 0 ? `${toCurrency(shippingRemaining)} left` : 'Unlocked'}</span>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button type="button" onClick={clearCart} className="btn-gold-outline flex-1 rounded-full px-4 py-3 text-sm">
              Clear
            </button>
            <Link href="/checkout" onClick={closeDrawer} className="btn-gold flex-1 rounded-full px-4 py-3 text-center text-sm">
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
