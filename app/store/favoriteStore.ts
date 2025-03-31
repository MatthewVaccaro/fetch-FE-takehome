import type { z } from "zod";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Dog, dogSchema } from "~/api/types";

type Props = {
  favorites: Array<Dog>;
  isVisible: boolean;
  isMatch: boolean;
};

type Methods = {
  add: (dog: Dog) => void;
  remove: (id: string) => void;
  toggleVisible: () => void;
  toggleMatch: () => void;
};

export const useFavoriteStore = create<Props & Methods>()(
  persist(
    (set) => ({
      isVisible: false,
      isMatch: false,
      favorites: [],
      // METHODS
      toggleVisible: () =>
        set((state) => ({ ...state, isVisible: !state.isVisible })),
      toggleMatch: () =>
        set((state) => ({ ...state, isMatch: !state.isMatch })),
      add: (dog) => {
        set((state) => ({ ...state, favorites: [...state.favorites, dog] }));
      },
      remove: (id) =>
        set((state) => ({
          ...state,
          favorites: state.favorites.filter((prev) => prev.id !== id),
        })),
    }),
    {
      name: "favorite-storage",
    }
  )
);
