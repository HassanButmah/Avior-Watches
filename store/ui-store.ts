import { create } from 'zustand';
import type { Watch } from '@/lib/watches';

interface UIStore {
  quickViewWatch: Watch | null;
  isQuickViewOpen: boolean;
  openQuickView: (watch: Watch) => void;
  closeQuickView: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  quickViewWatch: null,
  isQuickViewOpen: false,
  openQuickView: (watch) => set({ quickViewWatch: watch, isQuickViewOpen: true }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewWatch: null }),
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
