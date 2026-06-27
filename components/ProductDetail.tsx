'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Product, Settings } from '@/lib/types';
import AddToCartButton from './AddToCartButton';
import { toCurrency } from '@/lib/format';

export default function ProductDetail({ product, settings }: { product: Product; settings: Settings }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const style = useMemo(
    () => ({
      transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
    }),
    [tilt]
  );

  return (
    <section className="mx-auto grid min-h-[80vh] max-w-7xl gap-10 px-4 py-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-carbon-card p-4"
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
          setTilt({ x, y });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
          <div style={style} className="relative h-full w-full transition-transform duration-300">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70">{product.category}</p>
        <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">{product.name}</h1>
        <p className="mt-2 text-lg text-white/60">{product.nameAr}</p>

        <div className="mt-6 flex items-end gap-4">
          <div>
            <p className="text-3xl font-semibold text-white">{toCurrency(product.price)}</p>
            <p className="text-sm text-white/50">{toCurrency(product.price * settings.usdToIls, 'ILS')}</p>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-base leading-8 text-white/70">{product.description}</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">{product.descriptionAr}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {product.features.map((feature) => (
            <span key={feature} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
