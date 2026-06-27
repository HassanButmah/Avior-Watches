import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getSettings } from '@/lib/data';
import { toCurrency } from '@/lib/format';
import ExplodedWatch from '@/components/ExplodedWatch';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  const featured = products.slice(0, 3);

  return (
    <div className="pt-24">
      {settings.announcementBar.enabled && (
        <div className="border-y border-gold/20 bg-gold/10 px-4 py-3 text-center text-sm text-gold">
          {settings.announcementBar.text}
        </div>
      )}

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Luxury from Hebron</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            Precision made visible.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Avior translates mechanical discipline into a dark, architectural e-commerce experience built for luxury
            storytelling and direct conversion.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/collections" className="btn-gold rounded-full px-6 py-3 text-sm">
              Explore Collections
            </Link>
            <Link href="/about" className="btn-gold-outline rounded-full px-6 py-3 text-sm">
              Our Story
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ['6', 'Curated pieces'],
              ['100%', 'Hand-finished tone'],
              ['24/7', 'WhatsApp support'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-carbon-card p-5">
                <p className="font-display text-3xl text-gold">{value}</p>
                <p className="mt-2 text-sm text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.25),_transparent_60%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-carbon-card p-4 shadow-2xl">
            <Image
              src="/images/watch-assembled.jpg"
              alt="Avior watch"
              width={900}
              height={1100}
              className="h-full w-full rounded-[2rem] object-cover"
              priority
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/10 bg-black/40 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Starting at</p>
              <p className="mt-2 font-display text-3xl text-white">{toCurrency(products[0]?.price ?? 0)}</p>
            </div>
          </div>
        </div>
      </section>

      <ExplodedWatch />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Featured</p>
            <h2 className="mt-2 font-display text-4xl text-white">Selected pieces</h2>
          </div>
          <Link href="/collections" className="text-sm uppercase tracking-[0.35em] text-white/50">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} settings={settings} />
          ))}
        </div>
      </section>
    </div>
  );
}
