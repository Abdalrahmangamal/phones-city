import { create } from 'zustand';

interface PopupState {
  hasShown: boolean;
  isShowing: boolean;
  homeAutoPopupAttempted: boolean;
  showPopup: () => void;
  hidePopup: () => void;
  markHomeAutoPopupAttempted: () => void;
  resetPopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  // In-memory only: resets on full page reload, stays during SPA navigation.
  hasShown: false,
  isShowing: false,
  homeAutoPopupAttempted: false,
  
  showPopup: () => set((state) => {
    if (state.hasShown) {
      return state;
    }
    return { isShowing: true, hasShown: true };
  }),
  
  hidePopup: () => set({ isShowing: false }),

  markHomeAutoPopupAttempted: () =>
    set((state) => (state.homeAutoPopupAttempted ? state : { homeAutoPopupAttempted: true })),
  
  resetPopup: () => set({ hasShown: false, isShowing: false, homeAutoPopupAttempted: false })
}));
