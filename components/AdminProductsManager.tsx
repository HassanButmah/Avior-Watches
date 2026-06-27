'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { toCurrency } from '@/lib/format';
import { TrashIcon } from './Icons';

export default function AdminProductsManager({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(products);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter(
      (product) =>
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.id.toString().includes(term)
    );
  }, [items, query]);

  async function removeProduct(id: number) {
    const response = await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="w-full rounded-full border border-white/10 bg-carbon-card px-5 py-3 text-white outline-none focus:border-gold sm:max-w-sm"
        />
        <Link href="/admin/products/add" className="btn-gold rounded-full px-5 py-3 text-sm text-center">
          Add Product
        </Link>
      </div>

      <div className="grid gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="rounded-3xl border border-white/10 bg-carbon-card p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{product.category}</p>
                <h3 className="mt-2 font-display text-2xl text-white">{product.name}</h3>
                <p className="text-sm text-white/55">{product.nameAr}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-white">{toCurrency(product.price)}</p>
                  <p className="text-xs text-white/40">ID {product.id}</p>
                </div>
                <Link href={`/admin/products/${product.id}/edit`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="rounded-full border border-red-500/40 px-4 py-2 text-sm text-red-300"
                >
                  <TrashIcon className="mr-2 inline-block h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
