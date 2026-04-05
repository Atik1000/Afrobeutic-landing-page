import type { Metadata } from "next";
import Link from "next/link";
import { MaxWidth } from "@/components/layout/max-width";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "List your business",
  description:
    "Reach new clients on Afrobeutic — tools inspired by modern provider marketplaces.",
};

const benefits = [
  {
    title: "Premium discovery",
    body: "Show up in category search, featured placements, and seasonal campaigns.",
    icon: Sparkles,
  },
  {
    title: "Fill your calendar",
    body: "Let guests self-serve slots that respect your staff and room capacity.",
    icon: Calendar,
  },
  {
    title: "Grow repeat visits",
    body: "Automated reminders and client notes keep relationships warm.",
    icon: Users,
  },
];

export default function BusinessPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.75_0.12_350/0.35),transparent)]"
          aria-hidden
        />
        <MaxWidth className="relative text-center">
          <Badge className="rounded-full">For salons & freelancers</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Turn empty chairs into{" "}
            <span className="text-primary">revenue you can predict</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Afrobeutic pairs marketplace reach with booking UX guests already
            understand — list services, set rules, and get paid on your terms
            (coming soon).
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <Link href="/business/pricing">View pricing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/search">Explore marketplace</Link>
            </Button>
          </div>
        </MaxWidth>
      </section>

      <section className="py-16">
        <MaxWidth>
          <h2 className="text-center font-heading text-3xl font-semibold">
            Why partners choose Afrobeutic
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Built like a modern SaaS provider page — clear story, crisp benefits.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <Card
                key={b.title}
                className="rounded-2xl border-0 bg-card shadow-md transition-shadow hover:shadow-xl"
              >
                <CardContent className="space-y-4 p-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <b.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MaxWidth>
      </section>

      <section className="py-16 bg-muted/30">
        <MaxWidth className="rounded-2xl border bg-card p-10 shadow-md md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Earnings snapshot
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-semibold">
                How much you could earn
              </h2>
              <p className="mt-3 text-muted-foreground">
                Illustrative math only — plug in your average ticket, fill
                rate, and active weeks to sanity-check upside.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-6 text-sm">
              <p className="font-medium text-foreground">Example</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>· 6 appointments / day @ $85 average</li>
                <li>· 5 working days / week</li>
                <li>· ~$2.5k / week gross before product costs</li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Not a forecast or guarantee — demo placeholder.
              </p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 shadow-md hover:shadow-xl transition-shadow"
            >
              <Link href="/business/pricing">See plans &amp; pricing</Link>
            </Button>
          </div>
        </MaxWidth>
      </section>
    </>
  );
}
