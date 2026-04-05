import type { SalonType } from "@/types";
import { create } from "zustand";

export type SortValue =
  | "recommended"
  | "rating"
  | "price_low"
  | "price_high";

export interface FilterState {
  service: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  salonType: SalonType | "all";
  sort: SortValue;
  setService: (v: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinRating: (v: number) => void;
  setSalonType: (v: SalonType | "all") => void;
  setSort: (v: SortValue) => void;
  reset: () => void;
}

const initial = {
  service: "all",
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
  salonType: "all" as const,
  sort: "recommended" as SortValue,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initial,
  setService: (service) => set({ service }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setMinRating: (minRating) => set({ minRating }),
  setSalonType: (salonType) => set({ salonType }),
  setSort: (sort) => set({ sort }),
  reset: () => set(initial),
}));
