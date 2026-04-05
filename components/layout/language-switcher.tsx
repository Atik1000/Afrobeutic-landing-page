"use client";

import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/messages";
import { LOCALES } from "@/lib/i18n/messages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const labels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function LanguageSwitcher(_props?: { variant?: "ghost" | "menu" }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-2 text-muted-foreground",
        )}
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{t("language")}</span>
        <span className="text-xs uppercase text-foreground/80">{locale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className={locale === l ? "font-medium" : ""}
          >
            {labels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
