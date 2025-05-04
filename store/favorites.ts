import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteCity = {
    name: string;
    country: string;
};

interface FavoritesState {
    favorites: FavoriteCity[];
    toggleFavorite: (city: FavoriteCity) => void;
    isFavorite: (city: FavoriteCity) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (city) => {
                const { favorites } = get();
                const exists = favorites.some(
                    (c) => c.name === city.name && c.country === city.country
                );
                if (exists) {
                    set({ favorites: favorites.filter((c) => c.name !== city.name || c.country !== city.country) });
                } else {
                    set({ favorites: [...favorites, city] });
                }
            },
            isFavorite: (city) =>
                get().favorites.some(
                    (c) => c.name === city.name && c.country === city.country
                ),
        }),
        {
            name: "favorites-storage",
        }
    )
);
