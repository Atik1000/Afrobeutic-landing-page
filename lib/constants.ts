import type { ServiceCategory } from "@/types";

export const MAX_WIDTH_CLASS = "max-w-[1280px]";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hair",
    label: "Hair",
    description: "Cuts, color, styling",
    icon: "Scissors",
  },
  {
    id: "nails",
    label: "Nails",
    description: "Manicure & pedicure",
    icon: "Sparkles",
  },
  {
    id: "makeup",
    label: "Makeup",
    description: "Bridal & glam",
    icon: "Palette",
  },
  {
    id: "spa",
    label: "Spa",
    description: "Facials & wellness",
    icon: "Flower2",
  },
  {
    id: "barber",
    label: "Barber",
    description: "Cuts & shaves",
    icon: "User",
  },
  {
    id: "massage",
    label: "Massage",
    description: "Deep tissue & relax",
    icon: "Hand",
  },
  {
    id: "brows",
    label: "Brows & Lashes",
    description: "Lamination & extensions",
    icon: "Eye",
  },
  {
    id: "waxing",
    label: "Waxing",
    description: "Full body",
    icon: "Sun",
  },
];

export const POPULAR_SERVICE_QUICK: { id: string; label: string }[] = [
  { id: "hair", label: "Haircut" },
  { id: "nails", label: "Gel manicure" },
  { id: "barber", label: "Fade & beard" },
  { id: "massage", label: "Deep tissue" },
  { id: "makeup", label: "Event makeup" },
  { id: "spa", label: "Facial" },
];

export const SALON_TYPE_OPTIONS = [
  { id: "freelancer" as const, label: "Individual Freelancer" },
  { id: "salon" as const, label: "Salon Shop" },
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
] as const;
