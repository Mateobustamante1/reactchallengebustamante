import { create } from "zustand";

interface NavigationModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

export const useNavigationModal = create<NavigationModalProps>((set) => ({
  isVisible: false,
  setIsVisible: () => set((state) => ({ isVisible: !state.isVisible })),
}));
