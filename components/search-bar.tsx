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
import { AnalogTimePicker } from "@/components/analog-time-picker";

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

  const fieldLabelClass =
    "text-xs font-medium text-muted-foreground block min-h-4 leading-4";

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "rounded-2xl bg-card p-4 shadow-md sm:p-5",
          variant === "hero" &&
            "grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,140px)]",
          variant === "compact" &&
            "grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,120px)]",
        )}
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          <label className={fieldLabelClass} htmlFor="search-service">
            Service
          </label>
          <Select
            value={service}
            onValueChange={(v) => setService(v ?? "all")}
          >
            <SelectTrigger
              id="search-service"
              size="lg"
              className="w-full min-w-0 rounded-xl border-input shadow-none"
            >
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

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className={fieldLabelClass} htmlFor="search-location">
            Location
          </label>
          <div className="flex min-w-0 gap-2">
            <div className="relative min-w-0 flex-1">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, area, or address"
                className="!h-12 w-full min-w-0 rounded-xl pl-9 md:text-sm"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-12 w-12 shrink-0 rounded-xl p-0"
              onClick={requestGeolocation}
              title="Use my location"
            >
              <Navigation className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={fieldLabelClass}>Date & time</span>
          <div className="grid min-w-0 grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 w-full min-w-0 justify-start rounded-xl font-normal shadow-none",
                )}
              >
                <CalendarDays className="mr-2 size-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-left">
                  {date ? format(date, "MMM d, yyyy") : "Pick a date"}
                </span>
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
            <AnalogTimePicker
              id="search-time"
              value={time}
              onChange={setTime}
              placeholder="Time"
              showChevron
              triggerClassName="!h-12 min-h-12 border-input"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={fieldLabelClass} aria-hidden />
          <Button
            type="button"
            className="h-12 w-full rounded-xl shadow-md hover:shadow-xl transition-shadow md:rounded-xl"
            onClick={submit}
          >
            <Search className="mr-2 size-4 shrink-0" />
            Search
          </Button>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground px-1 sm:px-0">
        {geoStatus === "granted" && "Location applied."}
        {geoStatus === "denied" &&
          `Using country: ${countryLabel ?? country}.`}
        {geoStatus === "pending" && "Locating…"}
        {geoStatus === "idle" &&
          `Default region: ${countryLabel ?? country}.`}
      </p>

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
