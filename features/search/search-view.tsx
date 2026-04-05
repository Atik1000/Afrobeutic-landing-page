"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { parse, isValid } from "date-fns";
import type { SalonType } from "@/types";
import { useSalonsSearch } from "@/hooks/use-salons";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { useFilterStore } from "@/store/filter-store";
import { SORT_OPTIONS } from "@/lib/constants";
import { SalonCard, SalonCardSkeleton } from "@/components/salon-card";
import { SearchBar } from "@/components/search-bar";
import { MaxWidth } from "@/components/layout/max-width";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SERVICE_CATEGORIES } from "@/lib/constants";

function parseSalonType(v: string | null): SalonType | "all" {
  if (v === "freelancer" || v === "salon") return v;
  return "all";
}

export function SearchView() {
  const params = useSearchParams();
  const { country } = useVisitorRegion();
  const {
    service,
    minPrice,
    maxPrice,
    minRating,
    salonType,
    sort,
    setService,
    setPriceRange,
    setMinRating,
    setSalonType,
    setSort,
    reset,
  } = useFilterStore();

  useEffect(() => {
    const s = params.get("service") ?? "all";
    const t = parseSalonType(params.get("type"));
    setService(s);
    setSalonType(t);
  }, [params, setService, setSalonType]);

  const queryParams = useMemo(() => {
    const loc = params.get("location") ?? "";
    const dateStr = params.get("date");
    const countryParam = params.get("country");
    return {
      service: service === "all" ? undefined : service,
      location: loc || undefined,
      country:
        !loc && (countryParam || country)
          ? countryParam ?? country
          : undefined,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 500 ? maxPrice : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      salonType,
      sort,
      _date: dateStr,
    };
  }, [params, service, minPrice, maxPrice, minRating, salonType, sort, country]);

  const { data, isPending } = useSalonsSearch({
    service: queryParams.service,
    location: queryParams.location,
    country: queryParams.country,
    minPrice: queryParams.minPrice,
    maxPrice: queryParams.maxPrice,
    minRating: queryParams.minRating,
    salonType: queryParams.salonType,
    sort: queryParams.sort,
  });

  const initialDate = useMemo(() => {
    const d = params.get("date");
    if (!d) return null;
    const parsed = parse(d, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : null;
  }, [params]);

  return (
    <div className="py-10">
      <MaxWidth>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight font-heading">
            Search results
          </h1>
          <p className="mt-1 text-muted-foreground">
            {queryParams._date
              ? `Requested date: ${queryParams._date}`
              : "Adjust filters to refine your matches."}
          </p>
          <div className="mt-6">
            <SearchBar
              variant="compact"
              initialService={params.get("service") ?? "all"}
              initialLocation={params.get("location") ?? ""}
              initialDate={initialDate}
              initialTime={params.get("time")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-72">
            <div className="rounded-2xl border bg-card p-5 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="h-[min(70vh,640px)] pr-3">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select
                      value={service}
                      onValueChange={(v) => setService(v ?? "all")}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All</SelectItem>
                        {SERVICE_CATEGORIES.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>
                      Price range (${minPrice} – ${maxPrice})
                    </Label>
                    <Slider
                      value={[minPrice, maxPrice]}
                      min={0}
                      max={500}
                      step={5}
                      onValueChange={(v) => {
                        if (Array.isArray(v)) setPriceRange(v[0], v[1]);
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Minimum rating ({minRating || "any"})</Label>
                    <Slider
                      value={[minRating]}
                      min={0}
                      max={5}
                      step={0.5}
                      onValueChange={(v) => {
                        const n = Array.isArray(v) ? v[0] : v;
                        if (typeof n === "number") setMinRating(n);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Salon type</Label>
                    <Select
                      value={salonType}
                      onValueChange={(v) =>
                        v && setSalonType(v as typeof salonType)
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="salon">Salon shop</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {isPending
                  ? "Loading salons…"
                  : `${data?.length ?? 0} salons found`}
              </p>
              <Select
                value={sort}
                onValueChange={(v) => v && setSort(v as typeof sort)}
              >
                <SelectTrigger className="w-full rounded-xl sm:w-[220px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {isPending
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SalonCardSkeleton key={i} />
                  ))
                : data?.map((s) => <SalonCard key={s.id} salon={s} />)}
            </div>

            {!isPending && data?.length === 0 ? (
              <p className="rounded-2xl border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                No salons match these filters. Try widening price or service.
              </p>
            ) : null}
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}
