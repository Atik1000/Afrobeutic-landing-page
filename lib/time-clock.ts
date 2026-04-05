/** 24h "HH:mm" ↔ 12h clock parts (5-minute steps). */

export function parseTimeToParts(time24: string | null | undefined): {
  hour12: number;
  minute: number;
  isPm: boolean;
} {
  if (!time24 || !/^\d{1,2}:\d{2}$/.test(time24)) {
    return { hour12: 12, minute: 0, isPm: true };
  }
  const [hs, ms] = time24.split(":");
  let h = Number.parseInt(hs, 10);
  let m = Number.parseInt(ms, 10) || 0;
  m = ((Math.round(m / 5) * 5) % 60 + 60) % 60;
  const isPm = h >= 12;
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: m, isPm };
}

export function partsToTime24(
  hour12: number,
  minute: number,
  isPm: boolean,
): string {
  let h: number;
  if (hour12 === 12) {
    h = isPm ? 12 : 0;
  } else {
    h = isPm ? hour12 + 12 : hour12;
  }
  const m = ((Math.round(minute / 5) * 5) % 60 + 60) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatTime12hDisplay(
  time24: string | null | undefined,
): string {
  if (!time24) return "";
  const { hour12, minute, isPm } = parseTimeToParts(time24);
  return `${hour12}:${String(minute).padStart(2, "0")} ${isPm ? "PM" : "AM"}`;
}

/** Polar position for hour 1–12 (12 at top). */
export function clockPosition(
  index: number,
  total: number,
  radiusPx: number,
  center: number,
): { left: number; top: number } {
  const angleDeg = (index * (360 / total) - 90) * (Math.PI / 180);
  return {
    left: center + radiusPx * Math.cos(angleDeg),
    top: center + radiusPx * Math.sin(angleDeg),
  };
}
