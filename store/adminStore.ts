'use client';
import { create } from 'zustand';

interface AdminStore {
  showLoginModal: boolean;
  clickCount: number;
  clickTimer: ReturnType<typeof setTimeout> | null;

  incrementClick: () => void;
  resetClicks: () => void;
  setShowModal: (show: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
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
}));
