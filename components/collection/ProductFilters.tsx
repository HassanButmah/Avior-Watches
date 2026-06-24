'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import type { WatchFilters, SortOption } from '@/lib/watches';
import { COLLECTIONS, CATEGORIES, SORT_OPTIONS, getPriceRange } from '@/lib/watches';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: WatchFilters;
  sort: SortOption;
  onFiltersChange: (filters: WatchFilters) => void;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

const availabilityOptions = [
  { value: 'all', label: 'All' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'limited', label: 'Limited Edition' },
  { value: 'preorder', label: 'Pre-Order' },
];

const categoryLabels: Record<string, string> = {
  all: 'All Categories',
  dress: 'Dress',
  sport: 'Sport',
  diver: 'Diver',
  chronograph: 'Chronograph',
};

export default function ProductFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  resultCount,
  isMobileOpen,
  onMobileToggle,
}: ProductFiltersProps) {
  const { min, max } = getPriceRange();

  const updateFilter = (key: keyof WatchFilters, value: string | number | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.collection ||
    filters.category ||
    filters.availability ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  const filterContent = (
    <div className="space-y-6">
      {/* Collection */}
      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Collection</h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={!filters.collection || filters.collection === 'all'}
            onClick={() => updateFilter('collection', 'all')}
            label="All"
          />
          {COLLECTIONS.map((c) => (
            <FilterChip
              key={c}
              active={filters.collection === c}
              onClick={() => updateFilter('collection', c)}
              label={c}
            />
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={!filters.category || filters.category === 'all'}
            onClick={() => updateFilter('category', 'all')}
            label="All"
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              active={filters.category === c}
              onClick={() => updateFilter('category', c)}
              label={categoryLabels[c]}
            />
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder={`$${min.toLocaleString()}`}
            value={filters.minPrice ?? ''}
            onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
            aria-label="Minimum price"
          />
          <span className="text-white/40">—</span>
          <input
            type="number"
            placeholder={`$${max.toLocaleString()}`}
            value={filters.maxPrice ?? ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Availability</h3>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((opt) => (
            <FilterChip
              key={opt.value}
              active={(!filters.availability && opt.value === 'all') || filters.availability === opt.value}
              onClick={() => updateFilter('availability', opt.value === 'all' ? undefined : opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-gold text-xs tracking-wider uppercase hover:text-gold-light transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 glass-surface luxury-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-sm font-semibold uppercase tracking-widest">Filters</h2>
            <span className="text-white/40 text-xs">{resultCount} results</span>
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile filter bar */}
      <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onMobileToggle}
          className="flex items-center gap-2 px-4 py-2.5 glass-surface luxury-border rounded-sm text-sm text-white/80 hover:text-gold transition-colors"
          aria-expanded={isMobileOpen}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 bg-gold rounded-full" />}
        </button>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-surface border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:border-gold/40 focus:outline-none"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile filter drawer */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        >
          <div className="p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-display">Filters</h2>
              <button onClick={onMobileToggle} className="p-2 text-white/60 hover:text-gold" aria-label="Close filters">
                <X size={24} />
              </button>
            </div>
            {filterContent}
            <button
              onClick={onMobileToggle}
              className="w-full mt-8 py-3 bg-gradient-to-r from-gold to-gold-light text-black text-sm font-semibold tracking-wider uppercase"
            >
              Show {resultCount} Results
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs tracking-wider uppercase rounded-sm border transition-all duration-300',
        active
          ? 'bg-gold/15 text-gold border-gold/30'
          : 'bg-transparent text-white/60 border-white/10 hover:border-gold/20 hover:text-white/80'
      )}
    >
      {label}
    </button>
  );
}

export function SortSelect({ sort, onSortChange }: { sort: SortOption; onSortChange: (s: SortOption) => void }) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <span className="text-white/40 text-xs tracking-wider uppercase">Sort by</span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-gold/40 focus:outline-none cursor-pointer"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
