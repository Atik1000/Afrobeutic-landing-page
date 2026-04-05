"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { SERVICE_CATEGORIES, POPULAR_SERVICE_QUICK } from "@/lib/constants";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, CalendarDays, Search, Navigation } from "lucide-react";

const TIME_SLOTS = Array.from({ length: 24 }, (_, h) =>
  [0, 30].map((m) => `${h.toString().padStart(2, "0")}:${m === 0 ? "00" : "30"}`),
).flat();

export interface SearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
  initialService?: string;
  initialLocation?: string;
  initialDate?: Date | null;
  initialTime?: string | null;
}

export function SearchBar({
  className,
  variant = "hero",
  initialService = "all",
  initialLocation = "",
  initialDate = null,
  initialTime = null,
}: SearchBarProps) {
  const router = useRouter();
  const { country, geoStatus, requestGeolocation } = useVisitorRegion();
  const [service, setService] = useState(initialService);
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState<Date | undefined>(
    initialDate ?? undefined,
  );
  const [time, setTime] = useState(initialTime ?? "10:00");

  const countryLabel = useMemo(() => {
    try {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(country);
    } catch {
      return country;
    }
  }, [country]);

  const submit = useCallback(() => {
    const params = new URLSearchParams();
    params.set("service", service);
    if (location.trim()) params.set("location", location.trim());
    else params.set("country", country);
    if (date) params.set("date", format(date, "yyyy-MM-dd"));
    if (time) params.set("time", time);
    router.push(`/search?${params.toString()}`);
  }, [country, date, location, router, service, time]);

  const fillPopular = (categoryId: string) => {
    setService(categoryId);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "grid gap-3 rounded-2xl bg-card p-4 shadow-md sm:p-5",
          variant === "hero" && "md:grid-cols-[1fr_1fr_minmax(0,200px)_auto]",
          variant === "compact" && "md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Service
          </label>
          <Select
            value={service}
            onValueChange={(v) => setService(v ?? "all")}
          >
            <SelectTrigger className="h-12 rounded-xl border-input">
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All services</SelectItem>
              {SERVICE_CATEGORIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Location
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, area, or address"
                className="h-12 rounded-xl pl-9"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-12 shrink-0 rounded-xl px-3"
              onClick={requestGeolocation}
              title="Use my location"
            >
              <Navigation className="size-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {geoStatus === "granted" && "Location applied."}
            {geoStatus === "denied" &&
              `Using country: ${countryLabel ?? country}.`}
            {geoStatus === "pending" && "Locating…"}
            {geoStatus === "idle" && `Default region: ${countryLabel ?? country}.`}
          </p>
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-medium text-muted-foreground">
            Date & time
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 flex-1 justify-start rounded-xl font-normal",
                )}
              >
                <CalendarDays className="mr-2 size-4 text-muted-foreground" />
                {date ? format(date, "PPP") : "Pick a date"}
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-2xl p-2" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
            <Select
              value={time}
              onValueChange={(v) => v && setTime(v)}
            >
              <SelectTrigger className="h-12 rounded-xl sm:w-[140px]">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent className="max-h-60 rounded-xl">
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            className="h-12 w-full rounded-xl shadow-md hover:shadow-xl transition-shadow md:rounded-full"
            onClick={submit}
          >
            <Search className="mr-2 size-4" />
            Search
          </Button>
        </div>
      </div>

      {variant === "hero" && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground w-full sm:w-auto sm:mr-2 sm:self-center">
            Popular:
          </span>
          {POPULAR_SERVICE_QUICK.map((p) => (
            <Button
              key={p.id}
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-full"
              onClick={() => fillPopular(p.id)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      )}

    </div>
  );
}
