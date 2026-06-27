'use client';

import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/lib/types';
import { BagIcon } from './Icons';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.image })}
      className="btn-gold rounded-full px-6 py-3 text-sm"
    >
      <BagIcon className="mr-2 inline-block h-4 w-4" />
      Add to Cart
    </button>
  );
}
