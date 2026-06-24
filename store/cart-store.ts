import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Watch } from '@/lib/watches';

export interface CartItem {
  watchId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (watch: Watch, quantity?: number) => void;
  removeItem: (watchId: string) => void;
  updateQuantity: (watchId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (watch, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.watchId === watch.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.watchId === watch.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { watchId: watch.id, name: watch.name, price: watch.price, image: watch.image, quantity },
            ],
          };
        });
      },
      removeItem: (watchId) => set((state) => ({ items: state.items.filter((i) => i.watchId !== watchId) })),
      updateQuantity: (watchId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(watchId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.watchId === watchId ? { ...i, quantity } : i)),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'avior-cart' }
  )
);
