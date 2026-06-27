'use client';

import { useMemo, useState } from 'react';
import type { Product, Settings } from '@/lib/types';
import ProductCard from './ProductCard';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'watches', label: 'Watches' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'accessories', label: 'Accessories' },
];

export default function CollectionGrid({ products, settings }: { products: Product[]; settings: Settings }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === 'all' || product.category === category;
      const queryMatch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.nameAr.includes(query) ||
        product.description.toLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [category, query, products]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Collections</p>
          <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Curated objects of precision</h1>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-xl lg:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection"
            className="rounded-full border border-white/10 bg-carbon-card px-5 py-3 text-white outline-none focus:border-gold"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-white/10 bg-carbon-card px-5 py-3 text-white outline-none focus:border-gold"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value} className="bg-carbon-card">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} settings={settings} />
        ))}
      </div>
    </section>
  );
}

