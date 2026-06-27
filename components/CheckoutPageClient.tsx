'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Settings } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { toCurrency } from '@/lib/format';

export default function CheckoutPageClient({ settings }: { settings: Settings }) {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const shipping = useMemo(() => (total() >= settings.freeShippingThreshold ? 0 : 12), [total, settings.freeShippingThreshold]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total() + shipping,
        currency: 'usd',
        items,
        customer: form,
      }),
    });

    clearCart();
    router.push('/order-success');
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-28 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
      <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Checkout</p>
          <h1 className="mt-4 font-display text-5xl text-white">Shipping details</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </div>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
        <textarea
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Shipping address"
          rows={5}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
        <button disabled={submitting || items.length === 0} type="submit" className="btn-gold rounded-full px-5 py-3 text-sm disabled:opacity-60">
          {submitting ? 'Processing...' : 'Place order'}
        </button>
      </form>

      <aside className="h-fit rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <h2 className="font-display text-3xl text-white">Payment preview</h2>
        <div className="mt-6 space-y-3 text-sm text-white/65">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{toCurrency(total())}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : toCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-base text-white">
            <span>Total</span>
            <span>{toCurrency(total() + shipping)}</span>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-white/50">
          Stripe ready placeholder. Wire the payment-intent route to your live Stripe keys when ready to move beyond demo mode.
        </p>
      </aside>
    </div>
  );
}

