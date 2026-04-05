"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSalon, useSalonReviews } from "@/hooks/use-salons";
import { StickyBookingWidget } from "@/features/salon/sticky-booking-widget";
import { MaxWidth } from "@/components/layout/max-width";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SalonDetailSkeleton() {
  return (
    <MaxWidth className="py-10">
      <Skeleton className="mb-6 h-10 w-40 rounded-full" />
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-[420px] rounded-2xl" />
      </div>
    </MaxWidth>
  );
}

export function SalonDetailView({ id }: { id: string }) {
  const { data: salon, isPending, isError } = useSalon(id);
  const { data: reviews } = useSalonReviews(id);
  const searchParams = useSearchParams();
  const booked = searchParams.get("booked") === "1";

  if (isPending) return <SalonDetailSkeleton />;
  if (isError || !salon) {
    return (
      <MaxWidth className="py-20 text-center">
        <p className="text-muted-foreground">Salon not found.</p>
        <Button asChild className="mt-4 rounded-full">
          <Link href="/search">Back to search</Link>
        </Button>
      </MaxWidth>
    );
  }

  return (
    <div className="py-10">
      <MaxWidth>
        {booked ? (
          <Alert className="mb-8 rounded-2xl border-primary/30 bg-primary/5">
            <AlertTitle>Booking confirmed (demo)</AlertTitle>
            <AlertDescription>
              Thanks — this is a mock flow. No payment or calendar invite was
              sent.
            </AlertDescription>
          </Alert>
        ) : null}

        <Button variant="ghost" asChild className="mb-6 rounded-full -ml-2">
          <Link href="/search">
            <ArrowLeft className="mr-2 size-4" />
            Back to results
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="min-w-0 space-y-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {salon.images.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl bg-muted shadow-md ${
                    i === 0 ? "sm:col-span-3 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${salon.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 66vw"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {salon.type === "salon" ? "Salon shop" : "Freelancer"}
                </Badge>
                {salon.plan === "premium" ? (
                  <Badge className="rounded-full">Premium</Badge>
                ) : null}
              </div>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {salon.name}
              </h1>
              <p className="mt-2 text-muted-foreground">{salon.address}</p>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {salon.rating.toFixed(1)} · {salon.reviewCount} reviews
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {salon.description}
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold">Services</h2>
              <Separator className="my-4" />
              <ul className="space-y-3">
                {salon.services.map((s) => (
                  <li
                    key={s.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-card px-4 py-3 shadow-sm"
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {s.durationMin} min
                    </span>
                    <span className="font-semibold">${s.price}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Reviews</h2>
              <Separator className="my-4" />
              <div className="space-y-4">
                {reviews?.length ? (
                  reviews.map((r) => (
                    <Card
                      key={r.id}
                      className="rounded-2xl border-0 bg-muted/40 shadow-none"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{r.author}</span>
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            {r.rating}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {r.comment}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {r.date}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          <StickyBookingWidget salon={salon} />
        </div>
      </MaxWidth>
    </div>
  );
}
