'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AdminStore {
  showLoginModal: boolean;
  clickCount: number;
  clickTimer: ReturnType<typeof setTimeout> | null;

  incrementClick: () => void;
  resetClicks: () => void;
  setShowModal: (show: boolean) => void;
}

const noopStorage = {
  get length() {
    return 0;
  },
  clear: () => undefined,
  getItem: () => null,
  key: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
} as Storage;

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      showLoginModal: false,
      clickCount: 0,
      clickTimer: null,

      incrementClick: () => {
        const state = get();
        const newCount = state.clickCount + 1;

        if (newCount === 1) {
          const timer = setTimeout(() => {
            set({ clickCount: 0, clickTimer: null });
          }, 3000);
          set({ clickCount: newCount, clickTimer: timer });
        } else if (newCount >= 5) {
          if (state.clickTimer) clearTimeout(state.clickTimer);
          set({ clickCount: 0, clickTimer: null, showLoginModal: true });
        } else {
          set({ clickCount: newCount });
        }
      },

      resetClicks: () => {
        const timer = get().clickTimer;
        if (timer) clearTimeout(timer);
        set({ clickCount: 0, clickTimer: null, showLoginModal: false });
      },

      setShowModal: (show) => set({ showLoginModal: show }),
    }),
    {
      name: 'avior-admin',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : noopStorage)),
      skipHydration: true,
      partialize: (state) => ({ showLoginModal: state.showLoginModal }),
    }
  )
);
