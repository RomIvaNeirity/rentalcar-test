import { create } from "zustand";
import { Car } from "@/types/car";

type Filters = {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
};

type CarsStore = {
  cars: Car[];
  page: number;
  totalCars: number;
  filters: Filters;
  favorites: string[];

  setCars: (cars: Car[], totalCars: number) => void;
  addCars: (cars: Car[], totalCars: number) => void;

  setPage: (page: number) => void;
  setFilters: (filters: Filters) => void;

  toggleFavorite: (id: string) => void;
};

export const useCarsStore = create<CarsStore>((set) => ({
  cars: [],
  page: 1,
  totalCars: 0,

  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },

  favorites:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [],

  setCars: (cars, totalCars) => set({ cars, totalCars }),

  addCars: (newCars, totalCars) =>
    set((state) => ({
      cars: [...state.cars, ...newCars],
      totalCars,
    })),

  setPage: (page) => set({ page }),

  setFilters: (filters) =>
    set({
      filters,
      cars: [],
      page: 1,
    }),

  toggleFavorite: (id) =>
    set((state) => {
      const exists = state.favorites.includes(id);

      const updated = exists
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));

      return { favorites: updated };
    }),
}));
