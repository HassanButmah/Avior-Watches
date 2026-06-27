'use client';

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Settings } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { toCurrency } from '@/lib/format';
import {
  CreditCardIcon,
  InfoIcon,
  LockIcon,
  MastercardBadge,
  SpinnerIcon,
  TruckIcon,
  VisaBadge,
} from './Icons';

type PaymentMethod = 'card' | 'cash';

type ShippingForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CardForm = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
};

type Errors = Partial<Record<keyof ShippingForm | keyof CardForm, string>>;

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatCardNumber(value: string) {
  return onlyDigits(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value: string) {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isValidExpiry(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(match[2]);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = Number(String(now.getFullYear()).slice(-2));
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

function getCardBrand(number: string) {
  const digits = onlyDigits(number);
  if (digits.startsWith('4')) return 'visa';
  if (digits.startsWith('5')) return 'mastercard';
  return null;
}

function fieldBase(hasError?: boolean) {
  return `w-full rounded-2xl border bg-carbon-deep px-4 py-3 text-white outline-none transition focus:border-gold ${
    hasError ? 'border-red-500' : 'border-white/10'
  }`;
}

export default function CheckoutPageClient({ settings }: { settings: Settings }) {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [shipping, setShipping] = useState<ShippingForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [card, setCard] = useState<CardForm>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  const shippingCost = useMemo(
    () => (total() >= settings.freeShippingThreshold ? 0 : 12),
    [settings.freeShippingThreshold, total]
  );

  const brand = getCardBrand(card.cardNumber);

  function updateShipping<K extends keyof ShippingForm>(key: K, value: ShippingForm[K]) {
    setShipping((current) => ({ ...current, [key]: value }));
  }

  function updateCardNumber(value: string) {
    setCard((current) => ({ ...current, cardNumber: formatCardNumber(value) }));
  }

  function updateExpiry(value: string) {
    setCard((current) => ({ ...current, expiry: formatExpiry(value) }));
  }

  function validate() {
    const nextErrors: Errors = {};

    (Object.keys(shipping) as (keyof ShippingForm)[]).forEach((key) => {
      if (!shipping[key].trim()) {
        nextErrors[key] = 'This field is required';
      }
    });

    if (paymentMethod === 'card') {
      const cardDigits = onlyDigits(card.cardNumber);
      if (cardDigits.length !== 16) nextErrors.cardNumber = 'Card number must be 16 digits';
      if (!isValidExpiry(card.expiry)) nextErrors.expiry = 'Enter a valid future expiry date';
      if (!/^\d{3,4}$/.test(card.cvv)) nextErrors.cvv = 'CVV must be 3 or 4 digits';
      if (!card.cardholderName.trim()) nextErrors.cardholderName = 'Cardholder name is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function persistOrderState(method: PaymentMethod) {
    sessionStorage.setItem('avior_payment_method', method);
    sessionStorage.setItem('avior_order_placed', 'true');
  }

  function goToSuccess(method: PaymentMethod) {
    persistOrderState(method);
    clearCart();
    router.push('/order-success');
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!validate()) return;

    setSubmitting(true);
    goToSuccess(paymentMethod);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-[120px] sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
      <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[4px] text-gold">CHECKOUT</p>
          <h1 className="mt-2 font-display text-5xl text-white">Shipping details</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm text-white/60">Full name</span>
            <input
              value={shipping.name}
              onChange={(e) => updateShipping('name', e.target.value)}
              placeholder="Full name"
              className={fieldBase(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-white/60">Phone</span>
            <input
              value={shipping.phone}
              onChange={(e) => updateShipping('phone', e.target.value)}
              placeholder="Phone"
              className={fieldBase(Boolean(errors.phone))}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm text-white/60">Email</span>
          <input
            value={shipping.email}
            onChange={(e) => updateShipping('email', e.target.value)}
            placeholder="Email"
            type="email"
            className={fieldBase(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/60">Shipping address</span>
          <textarea
            value={shipping.address}
            onChange={(e) => updateShipping('address', e.target.value)}
            placeholder="Shipping address"
            rows={5}
            className={fieldBase(Boolean(errors.address))}
            aria-invalid={Boolean(errors.address)}
          />
          {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label
            className={`cursor-pointer rounded-[1.5rem] border p-4 transition ${
              paymentMethod === 'card' ? 'border-gold bg-gold/10' : 'border-white/10 bg-carbon-deep/40'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-gold">
                <CreditCardIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white">Credit / Debit Card | بطاقة ائتمانية</p>
                <p className="mt-1 text-sm text-white/55">Pay securely with your card details.</p>
              </div>
            </div>
          </label>

          <label
            className={`cursor-pointer rounded-[1.5rem] border p-4 transition ${
              paymentMethod === 'cash' ? 'border-gold bg-gold/10' : 'border-white/10 bg-carbon-deep/40'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-gold">
                <TruckIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white">Cash on Delivery | الدفع عند الاستلام</p>
                <p className="mt-1 text-sm text-white/55">Pay when your order arrives.</p>
              </div>
            </div>
          </label>
        </div>

        {paymentMethod === 'cash' ? (
          <div className="rounded-2xl border border-white/10 bg-carbon-deep/40 p-4 text-sm text-white/70">
            You will pay when your order arrives | ستدفع عند وصول طلبك
          </div>
        ) : (
          <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-carbon-deep/30 p-4">
            <div className="grid gap-2">
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Card Number</span>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/45">
                    <CreditCardIcon className="h-5 w-5" />
                  </div>
                  <input
                    value={card.cardNumber}
                    onChange={(e) => updateCardNumber(e.target.value)}
                    type="text"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className={`${fieldBase(Boolean(errors.cardNumber))} pl-12 pr-20`}
                    aria-invalid={Boolean(errors.cardNumber)}
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    {brand === 'visa' ? (
                      <VisaBadge className="h-5 w-10" />
                    ) : brand === 'mastercard' ? (
                      <MastercardBadge className="h-5 w-10" />
                    ) : (
                      <span className="text-xs uppercase tracking-[0.25em] text-white/30">Card</span>
                    )}
                  </div>
                </div>
                {errors.cardNumber && <p className="text-xs text-red-400">{errors.cardNumber}</p>}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Expiry Date</span>
                <input
                  value={card.expiry}
                  onChange={(e) => updateExpiry(e.target.value)}
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  className={fieldBase(Boolean(errors.expiry))}
                  aria-invalid={Boolean(errors.expiry)}
                />
                {errors.expiry && <p className="text-xs text-red-400">{errors.expiry}</p>}
              </label>

              <label className="grid gap-2">
                <span className="flex items-center gap-2 text-sm text-white/60">
                  CVV
                  <span className="relative inline-flex items-center">
                    <button
                      type="button"
                      title="3 digits on back of card | 3 أرقام على ظهر البطاقة"
                      className="text-white/45"
                      aria-label="CVV help"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </button>
                  </span>
                </span>
                <input
                  value={card.cvv}
                  onChange={(e) => setCard((current) => ({ ...current, cvv: onlyDigits(e.target.value).slice(0, 4) }))}
                  type="password"
                  maxLength={4}
                  placeholder="•••"
                  className={fieldBase(Boolean(errors.cvv))}
                  aria-invalid={Boolean(errors.cvv)}
                />
                {errors.cvv && <p className="text-xs text-red-400">{errors.cvv}</p>}
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm text-white/60">Cardholder Name</span>
              <input
                value={card.cardholderName}
                onChange={(e) => setCard((current) => ({ ...current, cardholderName: e.target.value }))}
                type="text"
                placeholder="Name on card | الاسم على البطاقة"
                className={fieldBase(Boolean(errors.cardholderName))}
                aria-invalid={Boolean(errors.cardholderName)}
              />
              {errors.cardholderName && <p className="text-xs text-red-400">{errors.cardholderName}</p>}
            </label>

            <div className="rounded-2xl border border-white/10 bg-carbon-card/80 p-4">
              <div className="flex items-center gap-3 text-sm text-white/75">
                <LockIcon className="h-4 w-4 text-gold" />
                <span>256-bit SSL Secured | مؤمن بتشفير 256-bit</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <VisaBadge className="h-6 w-12" />
                <MastercardBadge className="h-6 w-12" />
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/45">
                  SSL
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={submitting || items.length === 0}
          type="submit"
          className="btn-gold rounded-full px-5 py-3 text-sm disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            {submitting && <SpinnerIcon className="h-4 w-4" />}
            {submitting
              ? 'PROCESSING...'
              : paymentMethod === 'card'
                ? 'PAY NOW | ادفع الآن'
                : 'PLACE ORDER | تأكيد الطلب'}
          </span>
        </button>
      </form>

      <aside className="h-fit rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <h2 className="font-display text-3xl text-white">Order summary</h2>
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
            <span>{shippingCost === 0 ? 'Free' : toCurrency(shippingCost)}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-base text-white">
            <span>Total</span>
            <span>{toCurrency(total() + shippingCost)}</span>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-white/50">
          Card UI is visual-only for now. Cash on delivery skips the card validation and proceeds directly to confirmation.
        </p>
      </aside>
    </div>
  );
}
