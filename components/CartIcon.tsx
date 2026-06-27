'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { BagIcon } from './Icons';

export default function CartIcon() {
  const itemCount = useCartStore((state) => state.itemCount());
  const openDrawer = useCartStore((state) => state.openDrawer);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="relative rounded-full border border-white/15 p-2 text-white transition hover:border-gold hover:text-gold"
      aria-label="Open cart"
    >
      <BagIcon className="h-[18px] w-[18px]" />
      {mounted && itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}
