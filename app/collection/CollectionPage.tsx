'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/collection/ProductCard';
import ProductFilters, { SortSelect } from '@/components/collection/ProductFilters';
import QuickViewModal from '@/components/collection/QuickViewModal';
import EmptyState from '@/components/collection/EmptyState';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import type { Watch, WatchFilters, SortOption } from '@/lib/watches';
import { filterWatches, sortWatches } from '@/lib/utils';

function CollectionContent() {
  const searchParams = useSearchParams();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<WatchFilters>({});
  const [sort, setSort] = useState<SortOption>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const collection = searchParams.get('collection');
    if (collection) {
      setFilters((prev) => ({ ...prev, collection }));
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchWatches() {
      try {
        const res = await fetch('/api/watches');
        const json = await res.json();
        if (json.success) setWatches(json.data);
      } catch {
        const { watches: localWatches } = await import('@/lib/watches');
        setWatches(localWatches);
      } finally {
        setLoading(false);
      }
    }
    fetchWatches();
  }, []);

  const filtered = sortWatches(filterWatches(watches, filters), sort);
  const clearFilters = useCallback(() => setFilters({}), []);

  return (
    <>
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4">
            Curated Excellence
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            Our Collections
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore meticulously curated timepieces, each representing a distinct facet of horological excellence.
          </motion.p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: 'Prestige', desc: 'The pinnacle of luxury watchmaking', filter: 'Prestige' },
            { name: 'Sports', desc: 'Engineered for adventure and precision', filter: 'Sports' },
            { name: 'Heritage', desc: 'Timeless designs reimagined', filter: 'Heritage' },
          ].map((col, idx) => (
            <motion.button
              key={col.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setFilters({ ...filters, collection: col.filter })}
              className={`text-left glass-surface luxury-border rounded-lg p-6 hover:border-gold/30 transition-all duration-300 ${
                filters.collection === col.filter ? 'border-gold/40 bg-gold/5' : ''
              }`}
            >
              <h3 className="font-display text-xl text-gold mb-2">{col.name}</h3>
              <p className="text-white/50 text-sm">{col.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-white">All Timepieces</h2>
            <SortSelect sort={sort} onSortChange={setSort} />
          </div>
          <div className="flex gap-8">
            <ProductFilters
              filters={filters}
              sort={sort}
              onFiltersChange={setFilters}
              onSortChange={setSort}
              resultCount={filtered.length}
              isMobileOpen={mobileFiltersOpen}
              onMobileToggle={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            />
            <div className="flex-1 min-w-0">
              {loading ? (
                <ProductGridSkeleton count={6} />
              ) : filtered.length === 0 ? (
                <EmptyState onClearFilters={clearFilters} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {filtered.map((watch, index) => (
                    <ProductCard key={watch.id} watch={watch} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <QuickViewModal />
    </>
  );
}

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <CollectionContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
