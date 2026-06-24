import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[];
  toggle: (watchId: string) => void;
  isWishlisted: (watchId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (watchId) =>
        set((state) => ({
          items: state.items.includes(watchId)
            ? state.items.filter((id) => id !== watchId)
            : [...state.items, watchId],
        })),
      isWishlisted: (watchId) => get().items.includes(watchId),
      clear: () => set({ items: [] }),
    }),
    { name: 'avior-wishlist' }
  )
);
