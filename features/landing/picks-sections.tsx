"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedPicks, fetchPremiumPicks } from "@/services/api";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { SalonCard, SalonCardSkeleton } from "@/components/salon-card";
import { MaxWidth } from "@/components/layout/max-width";

function Row({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <MaxWidth>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </MaxWidth>
    </section>
  );
}

export function PremiumPicksSection() {
  const { country } = useVisitorRegion();
  const { data, isPending } = useQuery({
    queryKey: ["premium-picks", country],
    queryFn: () => fetchPremiumPicks(country),
  });

  return (
    <Row
      title="Premium picks near you"
      subtitle="Salon shops with a Premium subscription in your region."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => (
              <SalonCardSkeleton key={i} />
            ))
          : data?.map((s) => <SalonCard key={s.id} salon={s} />)}
      </div>
      {!isPending && data?.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No premium salons in this country yet — browse all results from search.
        </p>
      ) : null}
    </Row>
  );
}

export function FeaturedPicksSection() {
  const { country } = useVisitorRegion();
  const { data, isPending } = useQuery({
    queryKey: ["featured-picks", country],
    queryFn: () => fetchFeaturedPicks(country),
  });

  return (
    <Row
      title="Featured stylists & salons"
      subtitle="Freelancer Pro and Gold partners we love right now."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => (
              <SalonCardSkeleton key={i} />
            ))
          : data?.map((s) => <SalonCard key={s.id} salon={s} />)}
      </div>
    </Row>
  );
}
