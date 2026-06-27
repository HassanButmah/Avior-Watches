'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Settings } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';

type PaymentMethod = 'card' | 'cash';

export default function OrderSuccessClient({ settings }: { settings: Settings }) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [ready, setReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve(useCartStore.persist.rehydrate()).then(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const orderPlaced = sessionStorage.getItem('avior_order_placed') === 'true';
    const storedMethod = sessionStorage.getItem('avior_payment_method');
    const nextMethod: PaymentMethod = storedMethod === 'cash' ? 'cash' : 'card';

    if (!orderPlaced && items.length === 0) {
      router.replace('/collections');
      return;
    }

    setPaymentMethod(nextMethod);
    setReady(true);

    sessionStorage.removeItem('avior_order_placed');
    sessionStorage.removeItem('avior_payment_method');
    clearCart();
  }, [clearCart, hydrated, items.length, router]);

  if (!ready) {
    return <div className="flex min-h-[70vh] items-center justify-center text-white/60">Loading...</div>;
  }

  const isCash = paymentMethod === 'cash';

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center px-4 py-28 text-center">
      <div className="rounded-[2.5rem] border border-white/10 bg-carbon-card p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold">
          ✓
        </div>
        <h1 className="mt-6 font-display text-5xl text-white">
          {isCash ? 'Order Confirmed! | تم تأكيد طلبك' : 'Payment Successful! | تم الدفع بنجاح'}
        </h1>
        <p className="mt-4 text-white/60">
          {isCash
            ? 'Our team will contact you to confirm delivery | سيتواصل معك فريقنا لتأكيد التسليم'
            : 'Your order is being processed | طلبك قيد المعالجة'}
        </p>

        {isCash && (
          <Link
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-8 inline-flex rounded-full px-6 py-3 text-sm"
          >
            Contact us on WhatsApp | تواصل معنا على واتساب
          </Link>
        )}

        <Link href="/collections" className="btn-gold-outline mt-4 inline-flex rounded-full px-6 py-3 text-sm">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
