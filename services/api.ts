import type { Review, Salon, SalonType } from "@/types";
import { MOCK_REVIEWS, MOCK_SALONS } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface SalonSearchParams {
  service?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  salonType?: SalonType | "all";
  country?: string;
  sort?: "recommended" | "rating" | "price_low" | "price_high";
}

function minServicePrice(salon: Salon) {
  if (!salon.services.length) return 0;
  return Math.min(...salon.services.map((s) => s.price));
}

export async function fetchSalons(
  params: SalonSearchParams = {},
): Promise<Salon[]> {
  await delay(320);
  let list = [...MOCK_SALONS];

  if (params.country) {
    list = list.filter((s) => s.country === params.country);
  }

  if (params.service && params.service !== "all") {
    list = list.filter((s) =>
      s.services.some((sv) => sv.categoryId === params.service),
    );
  }

  if (params.salonType && params.salonType !== "all") {
    list = list.filter((s) => s.type === params.salonType);
  }

  if (params.minRating != null) {
    list = list.filter((s) => s.rating >= params.minRating!);
  }

  if (params.minPrice != null) {
    list = list.filter((s) => minServicePrice(s) >= params.minPrice!);
  }
  if (params.maxPrice != null) {
    list = list.filter((s) => minServicePrice(s) <= params.maxPrice!);
  }

  if (params.location?.trim()) {
    const q = params.location.toLowerCase();
    list = list.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }

  switch (params.sort) {
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "price_low":
      list.sort((a, b) => minServicePrice(a) - minServicePrice(b));
      break;
    case "price_high":
      list.sort((a, b) => minServicePrice(b) - minServicePrice(a));
      break;
    default:
      list.sort((a, b) => {
        const score = (x: Salon) =>
          x.rating * 20 + (x.plan === "premium" ? 5 : 0);
        return score(b) - score(a);
      });
  }

  return list;
}

export async function fetchSalonById(id: string): Promise<Salon | null> {
  await delay(240);
  return MOCK_SALONS.find((s) => s.id === id) ?? null;
}

export async function fetchPremiumPicks(country: string): Promise<Salon[]> {
  const salons = await fetchSalons({ country });
  return salons.filter((s) => s.type === "salon" && s.plan === "premium");
}

export async function fetchFeaturedPicks(country: string): Promise<Salon[]> {
  const salons = await fetchSalons({ country });
  return salons.filter(
    (s) => s.plan === "freelancer_pro" || s.plan === "gold",
  );
}

export async function fetchReviewsForSalon(
  salonId: string,
): Promise<Review[]> {
  await delay(120);
  return MOCK_REVIEWS.filter((r) => r.salonId === salonId);
}
