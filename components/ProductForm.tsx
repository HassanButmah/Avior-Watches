'use client';

import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/lib/types';

const emptyProduct: Product = {
  id: 0,
  name: '',
  nameAr: '',
  category: 'watches',
  price: 0,
  image: '/images/watch-assembled.jpg',
  description: '',
  descriptionAr: '',
  features: [],
  inStock: true,
};

export default function ProductForm({
  mode,
  product = emptyProduct,
}: {
  mode: 'create' | 'update';
  product?: Product;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    ...product,
    features: product.features.join('\n'),
  });
  const originalId = product.id;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      id: mode === 'update' ? originalId : Number(form.id),
      price: Number(form.price),
      features: String(form.features)
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const response = await fetch('/api/products', {
      method: mode === 'create' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setSaving(false);
      setError(data.message || 'Unable to save product');
      return;
    }

    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-carbon-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Product ID</span>
          <input
            value={form.id}
            onChange={(e) => update('id', Number(e.target.value))}
            type="number"
            disabled={mode === 'update'}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Category</span>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          >
            <option value="watches">Watches</option>
            <option value="bracelets">Bracelets</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Name</span>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Arabic Name</span>
          <input
            value={form.nameAr}
            onChange={(e) => update('nameAr', e.target.value)}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-white/60">Image Path</span>
        <input
          value={form.image}
          onChange={(e) => update('image', e.target.value)}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Price</span>
          <input
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
            type="number"
            step="0.01"
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/60">In Stock</span>
          <select
            value={String(form.inStock)}
            onChange={(e) => update('inStock', e.target.value === 'true')}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-white/60">Description</span>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-white/60">Arabic Description</span>
        <textarea
          value={form.descriptionAr}
          onChange={(e) => update('descriptionAr', e.target.value)}
          rows={4}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-white/60">Features, one per line</span>
        <textarea
          value={form.features}
          onChange={(e) => update('features', e.target.value)}
          rows={5}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={saving} className="btn-gold rounded-full px-5 py-3 text-sm disabled:opacity-60">
        {saving ? 'Saving...' : mode === 'create' ? 'Create product' : 'Update product'}
      </button>
    </form>
  );
}
