export type SalonType = "freelancer" | "salon";

export type SubscriptionPlan =
  | "free"
  | "premium"
  | "freelancer_pro"
  | "gold";

export interface ServiceItem {
  id: string;
  name: string;
  categoryId: string;
  durationMin: number;
  price: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export interface Review {
  id: string;
  salonId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Salon {
  id: string;
  name: string;
  slug: string;
  type: SalonType;
  plan: SubscriptionPlan;
  country: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  services: ServiceItem[];
  staff: StaffMember[];
  description: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}
