import Image from "next/image";
import Link from "next/link";
import type { Salon } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

function minPrice(salon: Salon) {
  if (!salon.services.length) return 0;
  return Math.min(...salon.services.map((s) => s.price));
}

export function SalonCard({ salon }: { salon: Salon }) {
  const from = minPrice(salon);
  const topServices = salon.services.slice(0, 3).map((s) => s.name);

  return (
    <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={salon.image}
          alt={salon.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="secondary" className="rounded-full bg-background/90 backdrop-blur">
            {salon.type === "salon" ? "Salon" : "Freelancer"}
          </Badge>
          {salon.plan === "premium" && (
            <Badge className="rounded-full">Premium</Badge>
          )}
        </div>
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{salon.name}</h3>
            <p className="text-sm text-muted-foreground">{salon.city}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium shrink-0">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {salon.rating.toFixed(1)}
            <span className="text-muted-foreground font-normal">
              ({salon.reviewCount})
            </span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {topServices.join(" · ")}
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-sm">
            <span className="text-muted-foreground">From </span>
            <span className="font-semibold">${from}</span>
          </p>
          <Button asChild size="sm" className="rounded-full">
            <Link href={`/salon/${salon.id}`}>Book</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function SalonCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-md">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <CardContent className="space-y-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
        <div className="flex justify-between pt-2">
          <div className="h-9 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
