"use client";

import { useCallback, useEffect, useState } from "react";

const DEFAULT_COUNTRY = "US";

export function useVisitorRegion() {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [geoStatus, setGeoStatus] = useState<
    "idle" | "pending" | "granted" | "denied" | "error"
  >("idle");

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("pending");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setGeoStatus("granted");
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          const data = (await res.json()) as { countryCode?: string };
          if (data.countryCode) setCountry(data.countryCode);
        } catch {
          setCountry(DEFAULT_COUNTRY);
        }
      },
      () => {
        setGeoStatus("denied");
        setCountry(DEFAULT_COUNTRY);
      },
      { enableHighAccuracy: false, timeout: 12_000 },
    );
  }, []);

  useEffect(() => {
    setCountry(
      typeof navigator !== "undefined" &&
        navigator.language?.split("-")[1]?.toUpperCase()
        ? navigator.language.split("-")[1]!.toUpperCase()
        : DEFAULT_COUNTRY,
    );
  }, []);

  return { country, coords, geoStatus, requestGeolocation, setCountry };
}
