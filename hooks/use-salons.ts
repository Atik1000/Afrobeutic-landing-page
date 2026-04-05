import {
  fetchReviewsForSalon,
  fetchSalonById,
  fetchSalons,
  type SalonSearchParams,
} from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useSalonsSearch(params: SalonSearchParams) {
  return useQuery({
    queryKey: ["salons", params],
    queryFn: () => fetchSalons(params),
  });
}

export function useSalon(id: string | undefined) {
  return useQuery({
    queryKey: ["salon", id],
    queryFn: () => fetchSalonById(id!),
    enabled: Boolean(id),
  });
}

export function useSalonReviews(salonId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", salonId],
    queryFn: () => fetchReviewsForSalon(salonId!),
    enabled: Boolean(salonId),
  });
}
