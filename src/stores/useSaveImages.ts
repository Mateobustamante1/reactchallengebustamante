import { create } from "zustand";
import { ImageCard } from "../types";
import { persist } from "zustand/middleware";

interface SaveImages {
  cards: ImageCard[];
  saveCard: (card: ImageCard) => void;
  removeCard: (id: string) => void;
}

export const useSaveImages = create(
  persist<SaveImages>(
    (set) => ({
      cards: [],
      saveCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      removeCard: (id: string) =>
        set((state) => ({
          cards: [...state.cards.filter((c) => c.id !== id)],
        })),
    }),
    { name: "user-images-storage" }
  )
);
