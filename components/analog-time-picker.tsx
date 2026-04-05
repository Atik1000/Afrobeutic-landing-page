"use client";

import { useEffect, useState } from "react";
import {
  formatTime12hDisplay,
  parseTimeToParts,
  partsToTime24,
  clockPosition,
} from "@/lib/time-clock";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Clock } from "lucide-react";

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
const MINUTE_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;
const SIZE = 220;
const CENTER = SIZE / 2;
const R_HOUR = 86;
const R_MIN = 58;

type Mode = "hour" | "minute";

export function AnalogTimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled,
  triggerClassName,
  id,
  showChevron,
}: {
  value: string | null;
  onChange: (time24: string) => void;
  placeholder?: string;
  disabled?: boolean;
  triggerClassName?: string;
  id?: string;
  /** Match select-style fields (e.g. search bar). */
  showChevron?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("hour");
  const [hour12, setHour12] = useState(12);
  const [minute, setMinute] = useState(0);
  const [isPm, setIsPm] = useState(true);

  useEffect(() => {
    if (open) {
      const p = parseTimeToParts(value);
      setHour12(p.hour12);
      setMinute(p.minute);
      setIsPm(p.isPm);
      setMode("hour");
    }
  }, [open, value]);

  const commit = (h: number, m: number, pm: boolean) => {
    onChange(partsToTime24(h, m, pm));
    setOpen(false);
    setMode("hour");
  };

  const handleHourPick = (h: number) => {
    setHour12(h);
    setMode("minute");
  };

  const handleMinutePick = (m: number) => {
    setMinute(m);
    commit(hour12, m, isPm);
  };

  const display = value ? formatTime12hDisplay(value) : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "inline-flex h-11 w-full min-w-0 items-center gap-2 rounded-xl font-normal shadow-none",
          !display && "text-muted-foreground",
          triggerClassName,
        )}
      >
        <Clock className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-left">
          {display || placeholder}
        </span>
        {showChevron ? (
          <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground opacity-60" />
        ) : null}
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(100vw-2rem,280px)] rounded-2xl p-4"
        align="start"
      >
        <div className="mb-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {mode === "hour" ? "Pick hour" : "Pick minutes"}
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold tabular-nums tracking-tight">
            <span className="text-foreground">{hour12}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-foreground">
              {String(minute).padStart(2, "0")}
            </span>
            <span className="ml-2 text-base font-medium text-primary">
              {isPm ? "PM" : "AM"}
            </span>
          </p>
        </div>

        <div
          className="relative mx-auto rounded-full border border-border bg-muted/30"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* subtle clock ticks */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: `repeating-conic-gradient(from -90deg, transparent 0deg 29deg, oklch(0 0 0 / 0.04) 29deg 30deg)`,
            }}
          />

          {mode === "hour"
            ? HOURS.map((h, i) => {
                const { left, top } = clockPosition(i, 12, R_HOUR, CENTER);
                const selected = h === hour12;
                return (
                  <button
                    key={h}
                    type="button"
                    className={cn(
                      "absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      selected
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background/90 text-foreground hover:bg-accent",
                    )}
                    style={{ left, top }}
                    onClick={() => handleHourPick(h)}
                  >
                    {h}
                  </button>
                );
              })
            : MINUTE_STEPS.map((m, i) => {
                const { left, top } = clockPosition(i, 12, R_MIN, CENTER);
                const selected = m === minute;
                return (
                  <button
                    key={m}
                    type="button"
                    className={cn(
                      "absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-medium tabular-nums transition-colors",
                      selected
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background/90 text-foreground hover:bg-accent",
                    )}
                    style={{ left, top }}
                    onClick={() => handleMinutePick(m)}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                );
              })}

          <div className="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-sm ring-2 ring-background" />
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant={!isPm ? "default" : "outline"}
            size="sm"
            className="flex-1 rounded-full"
            onClick={() => {
              setIsPm(false);
              if (mode === "minute" || value) {
                onChange(partsToTime24(hour12, minute, false));
              }
            }}
          >
            AM
          </Button>
          <Button
            type="button"
            variant={isPm ? "default" : "outline"}
            size="sm"
            className="flex-1 rounded-full"
            onClick={() => {
              setIsPm(true);
              if (mode === "minute" || value) {
                onChange(partsToTime24(hour12, minute, true));
              }
            }}
          >
            PM
          </Button>
        </div>

        {mode === "minute" ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 w-full rounded-full text-muted-foreground"
            onClick={() => setMode("hour")}
          >
            ← Change hour
          </Button>
        ) : null}

        {value && mode === "hour" ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-1 w-full rounded-full text-xs text-muted-foreground"
            onClick={() => {
              setMode("minute");
            }}
          >
            Edit minutes ({String(minute).padStart(2, "0")})
          </Button>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
