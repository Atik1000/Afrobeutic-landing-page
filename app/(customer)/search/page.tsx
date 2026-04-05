import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchView } from "@/features/search/search-view";
import { Skeleton } from "@/components/ui/skeleton";
import { MaxWidth } from "@/components/layout/max-width";

export const metadata: Metadata = {
  title: "Search salons",
  description: "Filter by service, price, rating, and salon type.",
};

function SearchFallback() {
  return (
    <MaxWidth className="py-10">
      <Skeleton className="mb-4 h-10 w-64 rounded-xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Skeleton className="h-[400px] rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    </MaxWidth>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchView />
    </Suspense>
  );
}
