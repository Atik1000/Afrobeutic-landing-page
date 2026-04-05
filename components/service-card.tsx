import Link from "next/link";
import type { ServiceCategory } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Scissors,
  Sparkles,
  Palette,
  Flower2,
  User,
  Hand,
  Eye,
  Sun,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Sparkles,
  Palette,
  Flower2,
  User,
  Hand,
  Eye,
  Sun,
};

export function ServiceCard({ category }: { category: ServiceCategory }) {
  const Icon = iconMap[category.icon] ?? Sparkles;

  return (
    <Link href={`/search?service=${category.id}`}>
      <Card className="group h-full rounded-2xl border-0 bg-card shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl">
        <CardContent className="flex flex-col gap-3 p-6">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{category.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {category.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
