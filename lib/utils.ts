import type { Watch, WatchFilters, SortOption } from '@/lib/watches';

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function filterWatches(watches: Watch[], filters: WatchFilters): Watch[] {
  return watches.filter((watch) => {
    if (filters.collection && filters.collection !== 'all' && watch.collection !== filters.collection) {
      return false;
    }
    if (filters.category && filters.category !== 'all' && watch.category !== filters.category) {
      return false;
    }
    if (filters.availability && filters.availability !== 'all' && watch.availability !== filters.availability) {
      return false;
    }
    if (filters.minPrice !== undefined && watch.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && watch.price > filters.maxPrice) return false;
    return true;
  });
}

export function sortWatches(watches: Watch[], sort: SortOption): Watch[] {
  const sorted = [...watches];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'bestselling':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function getProductBadges(watch: Watch): string[] {
  const badges: string[] = [];
  if (watch.isNew) badges.push('New');
  if (watch.isBestseller) badges.push('Bestseller');
  if (watch.availability === 'limited') badges.push('Limited Edition');
  return badges;
}
