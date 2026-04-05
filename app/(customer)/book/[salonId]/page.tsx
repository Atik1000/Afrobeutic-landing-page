import type { Metadata } from "next";
import { BookingStepper } from "@/components/booking-stepper";
import { MaxWidth } from "@/components/layout/max-width";
import { fetchSalonById } from "@/services/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ salonId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { salonId } = await params;
  return {
    title: "Book appointment",
    description: `Complete your booking for salon ${salonId}.`,
  };
}

export default async function BookPage({ params }: Props) {
  const { salonId } = await params;
  const salon = await fetchSalonById(salonId);

  if (!salon) {
    return (
      <MaxWidth className="py-20 text-center">
        <p className="text-muted-foreground">Salon not found.</p>
        <Button asChild className="mt-4 rounded-full">
          <Link href="/search">Browse salons</Link>
        </Button>
      </MaxWidth>
    );
  }

  return (
    <MaxWidth className="py-10 max-w-2xl">
      <BookingStepper salon={salon} />
    </MaxWidth>
  );
}
