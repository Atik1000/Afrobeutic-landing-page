import { SearchBar } from "@/components/search-bar";
import { ServiceCard } from "@/components/service-card";
import { MaxWidth } from "@/components/layout/max-width";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  FeaturedPicksSection,
  PremiumPicksSection,
} from "@/features/landing/picks-sections";
import { HowItWorksSection } from "@/features/landing/how-it-works";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover salons near you",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.85_0.08_350/0.35),transparent)]"
          aria-hidden
        />
        <MaxWidth className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Afrobeutic
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Beauty & wellness,{" "}
              <span className="text-primary">booked in seconds</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Search salons and freelancers, compare services, and lock your
              slot — no account required.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <SearchBar variant="hero" />
          </div>
        </MaxWidth>
      </section>

      <section className="py-16">
        <MaxWidth>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight font-heading">
              Popular services by category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Jump into results tailored to what you need today.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATEGORIES.map((c) => (
              <ServiceCard key={c.id} category={c} />
            ))}
          </div>
        </MaxWidth>
      </section>

      <PremiumPicksSection />
      <FeaturedPicksSection />
      <HowItWorksSection />
    </>
  );
}
