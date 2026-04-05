import { Suspense } from "react";
import type { Metadata } from "next";
import { SalonDetailView } from "@/features/salon/salon-detail-view";
import { fetchSalonById } from "@/services/api";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const salon = await fetchSalonById(id);
  return {
    title: salon?.name ?? "Salon",
    description:
      salon?.description ??
      "View services, reviews, and book an appointment on Afrobeutic.",
  };
}

export default async function SalonPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <SalonDetailView id={id} />
    </Suspense>
  );
}
