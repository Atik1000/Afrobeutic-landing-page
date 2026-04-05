import { MaxWidth } from "@/components/layout/max-width";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Store, CalendarCheck } from "lucide-react";

const steps = [
  {
    title: "Search",
    body: "Filter by service, location, and time — like Fresha, tuned for discovery.",
    icon: Search,
  },
  {
    title: "Choose salon",
    body: "Compare ratings, services, and transparent pricing before you commit.",
    icon: Store,
  },
  {
    title: "Book instantly",
    body: "Pick staff and slot, add your details, and confirm without an account.",
    icon: CalendarCheck,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-muted/30">
      <MaxWidth>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Three calm steps from search to confirmed appointment.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card
              key={s.title}
              className="rounded-2xl border-0 bg-card shadow-md hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="size-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
