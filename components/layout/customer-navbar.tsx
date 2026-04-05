"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { MaxWidth } from "@/components/layout/max-width";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLocale } from "@/components/providers/locale-provider";
import { SERVICE_CATEGORIES, SALON_TYPE_OPTIONS } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

export function CustomerNavbar() {
  const { t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const goSearch = (params: Record<string, string>) => {
    const q = new URLSearchParams(params).toString();
    router.push(`/search?${q}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <MaxWidth className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}
            >
              Services
              <ChevronDown className="size-4 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 max-h-[min(70vh,420px)] overflow-y-auto rounded-2xl p-2">
              <DropdownMenuItem
                className="rounded-xl"
                onClick={() => goSearch({ service: "all" })}
              >
                All services
              </DropdownMenuItem>
              {SERVICE_CATEGORIES.map((c) => (
                <DropdownMenuItem
                  key={c.id}
                  className="rounded-xl"
                  onClick={() => goSearch({ service: c.id })}
                >
                  {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}
            >
              Salon Types
              <ChevronDown className="size-4 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2">
              {SALON_TYPE_OPTIONS.map((o) => (
                <DropdownMenuItem
                  key={o.id}
                  className="rounded-xl"
                  onClick={() => goSearch({ type: o.id })}
                >
                  {o.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild className="rounded-full shadow-md hover:shadow-xl transition-shadow">
            <Link href="/business">{t("listBusiness")}</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full",
              )}
            >
              <Menu className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2">
              <DropdownMenuItem
                className="rounded-xl"
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </DropdownMenuItem>
              <div className="px-2 py-1.5">
                <LanguageSwitcher variant="menu" />
              </div>
              <DropdownMenuItem
                className="rounded-xl"
                onClick={() => router.push("/business")}
              >
                {t("listBusiness")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,380px)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Services
                  </p>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="rounded-xl px-3 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => goSearch({ service: "all" })}
                    >
                      All services
                    </button>
                    {SERVICE_CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="rounded-xl px-3 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => goSearch({ service: c.id })}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Salon types
                  </p>
                  <div className="flex flex-col gap-1">
                    {SALON_TYPE_OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        className="rounded-xl px-3 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => goSearch({ type: o.id })}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button asChild className="rounded-full">
                  <Link href="/business" onClick={() => setOpen(false)}>
                    {t("listBusiness")}
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="rounded-full">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    {t("login")}
                  </Link>
                </Button>
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWidth>
    </header>
  );
}
