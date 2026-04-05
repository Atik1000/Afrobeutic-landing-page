"use client";

import { useState } from "react";
import { MaxWidth } from "@/components/layout/max-width";
import { PricingCard, type PricingTier } from "@/components/pricing-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const salonPlans: PricingTier[] = [
  {
    name: "Starter",
    description: "Single location, essential discovery.",
    price: "$49",
    cadence: "/mo",
    highlights: [
      "Profile & services listing",
      "Booking inbox",
      "Email reminders",
    ],
    cta: "Start trial",
  },
  {
    name: "Growth",
    description: "Premium placement + staff scheduling.",
    price: "$129",
    cadence: "/mo",
    featured: true,
    highlights: [
      "Premium search boosts",
      "Multi-staff calendars",
      "Review highlights",
      "Priority support",
    ],
    cta: "Choose Growth",
  },
  {
    name: "Gold",
    description: "For busy shops and small chains.",
    price: "$249",
    cadence: "/mo",
    highlights: [
      "Featured picks eligibility",
      "Multi-location",
      "API & exports",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
  },
];

const stylistPlans: PricingTier[] = [
  {
    name: "Freelancer",
    description: "Solo chair or mobile — stay lean.",
    price: "$19",
    cadence: "/mo",
    highlights: ["Portfolio & services", "Direct booking links", "Basic stats"],
    cta: "Start trial",
  },
  {
    name: "Freelancer Pro",
    description: "Get discovered in your city.",
    price: "$49",
    cadence: "/mo",
    featured: true,
    highlights: [
      "City search priority",
      "Travel radius controls",
      "Instant payouts (soon)",
    ],
    cta: "Go Pro",
  },
  {
    name: "Collective",
    description: "Small squads sharing one brand.",
    price: "$99",
    cadence: "/mo",
    highlights: ["Up to 4 seats", "Shared calendar", "Team reviews"],
    cta: "Join waitlist",
  },
];

export function PricingView() {
  const [mode, setMode] = useState<"salon" | "stylist">("salon");
  const tiers = mode === "salon" ? salonPlans : stylistPlans;

  return (
    <section className="py-16">
      <MaxWidth>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            Simple pricing
          </h1>
          <p className="mt-3 text-muted-foreground">
            Toggle between salon shops and individual stylists. Numbers are
            placeholders for the demo.
          </p>
          <Tabs
            value={mode}
            onValueChange={(v) => v && setMode(v as typeof mode)}
            className="mt-8 flex justify-center"
          >
            <TabsList className="rounded-full p-1">
              <TabsTrigger value="salon" className="rounded-full px-6">
                Salon shop
              </TabsTrigger>
              <TabsTrigger value="stylist" className="rounded-full px-6">
                Individual stylist
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {tiers.map((t) => (
            <PricingCard key={t.name} tier={t} />
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
