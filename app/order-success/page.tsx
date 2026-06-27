'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center px-4 py-28 text-center">
      <div className="rounded-[2.5rem] border border-white/10 bg-carbon-card p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold">
          ✓
        </div>
        <h1 className="mt-6 font-display text-5xl text-white">Order received</h1>
        <p className="mt-4 text-white/60">Your checkout flow is connected to the demo payment intent route.</p>
        <Link href="/collections" className="btn-gold mt-8 inline-flex rounded-full px-6 py-3 text-sm">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

