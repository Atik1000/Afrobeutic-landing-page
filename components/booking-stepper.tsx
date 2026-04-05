"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import type { Salon } from "@/types";
import { useBookingStore } from "@/store/booking-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const STEPS = [
  "Service",
  "Staff",
  "Date & time",
  "Your details",
  "Confirm",
] as const;

const SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "17:00",
];

export function BookingStepper({ salon }: { salon: Salon }) {
  const router = useRouter();
  const {
    step,
    service,
    staff,
    date,
    timeSlot,
    customer,
    setStep,
    setService,
    setStaff,
    setDate,
    setTimeSlot,
    setCustomer,
    nextStep,
    prevStep,
  } = useBookingStore();

  useEffect(() => {
    const { salonId: sid, reset: r, setSalonId: set } =
      useBookingStore.getState();
    if (sid !== salon.id) {
      r();
      set(salon.id);
    }
  }, [salon.id]);

  const canNext =
    (step === 1 && !!service) ||
    (step === 2 && !!staff) ||
    (step === 3 && !!date && !!timeSlot) ||
    (step === 4 &&
      customer.fullName.trim() &&
      customer.email.trim() &&
      customer.phone.trim()) ||
    step === 5;

  const handleConfirm = () => {
    router.push(`/salon/${salon.id}?booked=1`);
    useBookingStore.getState().reset();
  };

  return (
    <Card className="rounded-2xl border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Book at {salon.name}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {STEPS.map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4 | 5;
            const active = step === n;
            const done = step > n;
            return (
              <button
                key={label}
                type="button"
                onClick={() => done && setStep(n)}
                className={cn(
                  "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active && "border-primary bg-primary/10 text-primary",
                  done && "border-muted bg-muted/50 text-muted-foreground",
                  !active && !done && "border-transparent bg-muted/40 text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3" /> : null}
                {label}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-3">
            <Label>Select service</Label>
            <div className="grid gap-2">
              {salon.services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all hover:shadow-md",
                    service?.id === s.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border",
                  )}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">
                    {s.durationMin} min · ${s.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Label>Select staff</Label>
            <div className="grid gap-2">
              {salon.staff.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setStaff(m)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition-all hover:shadow-md",
                    staff?.id === m.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border",
                  )}
                >
                  <span className="font-medium">{m.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {m.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 w-full justify-start rounded-xl font-normal",
                  )}
                >
                  <CalendarDays className="mr-2 size-4" />
                  {date ? format(date, "PPP") : "Choose date"}
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
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select time" />
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
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                className="rounded-xl"
                value={customer.fullName}
                onChange={(e) => setCustomer({ fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="rounded-xl"
                value={customer.email}
                onChange={(e) => setCustomer({ email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                className="rounded-xl"
                value={customer.phone}
                onChange={(e) => setCustomer({ phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                className="rounded-xl"
                value={customer.notes}
                onChange={(e) => setCustomer({ notes: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 5 && service && staff && date && timeSlot && (
          <div className="space-y-3 rounded-2xl bg-muted/50 p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Service:</span>{" "}
              {service.name}
            </p>
            <p>
              <span className="text-muted-foreground">Staff:</span> {staff.name}
            </p>
            <p>
              <span className="text-muted-foreground">When:</span>{" "}
              {format(date, "PPP")} at {timeSlot}
            </p>
            <Separator />
            <p>
              <span className="text-muted-foreground">Guest:</span>{" "}
              {customer.fullName}
            </p>
            <p>
              <span className="text-muted-foreground">Contact:</span>{" "}
              {customer.email} · {customer.phone}
            </p>
            {customer.notes ? (
              <p>
                <span className="text-muted-foreground">Notes:</span>{" "}
                {customer.notes}
              </p>
            ) : null}
            <p className="pt-2 font-semibold">
              Total: ${service.price}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (mock — no payment)
              </span>
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" asChild className="rounded-full">
            <Link href={`/salon/${salon.id}`}>Back to salon</Link>
          </Button>
          <div className="flex gap-2">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={prevStep}
              >
                <ChevronLeft className="mr-1 size-4" />
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                type="button"
                className="rounded-full shadow-md hover:shadow-xl transition-shadow"
                disabled={!canNext}
                onClick={nextStep}
              >
                Continue
                <ChevronRight className="ml-1 size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                className="rounded-full shadow-md hover:shadow-xl transition-shadow"
                onClick={handleConfirm}
              >
                Confirm booking
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
