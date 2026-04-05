import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  cadence: string;
  highlights: string[];
  cta: string;
  featured?: boolean;
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-2xl border-0 shadow-md transition-shadow hover:shadow-xl",
        tier.featured && "ring-2 ring-primary shadow-lg",
      )}
    >
      <CardHeader className="space-y-3">
        {tier.featured ? (
          <Badge className="w-fit rounded-full">Most popular</Badge>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Plan
          </span>
        )}
        <CardTitle className="text-2xl">{tier.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
        <div className="flex items-baseline gap-1 pt-2">
          <span className="text-4xl font-semibold tracking-tight">
            {tier.price}
          </span>
          <span className="text-muted-foreground">{tier.cadence}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <ul className="space-y-2">
          {tier.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {h}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full rounded-full shadow-md hover:shadow-xl transition-shadow"
          variant={tier.featured ? "default" : "secondary"}
        >
          {tier.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
