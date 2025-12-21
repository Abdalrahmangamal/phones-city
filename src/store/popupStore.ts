import { create } from 'zustand';

interface PopupState {
  hasShown: boolean;
  isShowing: boolean;
  showPopup: () => void;
  hidePopup: () => void;
  resetPopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  hasShown: false,
  isShowing: false,
  
  showPopup: () => set((state) => ({ isShowing: true, hasShown: true })),
  
  hidePopup: () => set({ isShowing: false }),
  
  resetPopup: () => set({ hasShown: false, isShowing: false })
}));