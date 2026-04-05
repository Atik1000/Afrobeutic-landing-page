"use client";

import { useRouter } from "next/navigation";
import type { Salon } from "@/types";
import { useBookingStore } from "@/store/booking-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

const SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
];

export function StickyBookingWidget({ salon }: { salon: Salon }) {
  const router = useRouter();
  const { service, staff, date, timeSlot, setService, setStaff, setDate, setTimeSlot, setSalonId } =
    useBookingStore();

  const goBook = () => {
    setSalonId(salon.id);
    router.push(`/book/${salon.id}`);
  };

  return (
    <Card className="rounded-2xl border-0 shadow-lg lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle className="text-lg">Book appointment</CardTitle>
        <p className="text-sm text-muted-foreground">
          No login required. Adjust details and continue.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Service</Label>
          <Select
            value={service?.id ?? ""}
            onValueChange={(id) => {
              const s = salon.services.find((x) => x.id === id);
              setService(s ?? null);
            }}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {salon.services.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} — ${s.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Staff</Label>
          <Select
            value={staff?.id ?? ""}
            onValueChange={(id) => {
              const m = salon.staff.find((x) => x.id === id);
              setStaff(m ?? null);
            }}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Choose staff" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {salon.staff.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 w-full justify-start rounded-xl font-normal",
                )}
              >
                <CalendarDays className="mr-2 size-4" />
                {date ? format(date, "MMM d") : "Pick date"}
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-2xl p-2">
                <Calendar
                  mode="single"
                  selected={date ?? undefined}
                  onSelect={(d) => setDate(d ?? null)}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Select
              value={timeSlot ?? ""}
              onValueChange={(v) => setTimeSlot(v ?? null)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="button"
          className="w-full rounded-full shadow-md hover:shadow-xl transition-shadow"
          onClick={goBook}
        >
          Book now
        </Button>
      </CardContent>
    </Card>
  );
}
