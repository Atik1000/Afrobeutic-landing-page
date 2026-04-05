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
import { ArrowRight, ChevronDown, Globe, Menu } from "lucide-react";
import { useState } from "react";

const navButtonClass = "h-11 gap-2 rounded-full px-5 text-base font-semibold";

export function CustomerNavbar() {
  const { locale, setLocale, t } = useLocale();
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
              className={cn(buttonVariants({ variant: "ghost" }), navButtonClass)}
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
              className={cn(buttonVariants({ variant: "ghost" }), navButtonClass)}
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
          <Button
            asChild
            className={cn(navButtonClass, "shadow-md transition-shadow hover:shadow-xl")}
          >
            <Link href="/business">{t("listBusiness")}</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu"
              className={cn(
                buttonVariants({ variant: "outline" }),
                navButtonClass,
                "shadow-sm",
              )}
            >
              Menu
              <Menu className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[min(90vw,24rem)] rounded-[28px] border border-border/70 bg-background p-6 shadow-2xl"
            >
              <div className="space-y-5">
                <div className="space-y-4">
                  <p className="text-2xl font-semibold cursor-pointer tracking-tight text-foreground">
                    For customers
                  </p>
                  <div className="space-y-1">
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium text-primary focus:bg-transparent focus:text-primary"
                      onClick={() => router.push("/login")}
                    >
                      Log in or sign up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent"
                      onClick={() => router.push("/support")}
                    >
                      Download the app
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent"
                      onClick={() => router.push("/support")}
                    >
                      Help and support
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent"
                      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
                    >
                      <Globe className="size-5 shrink-0" />
                      <span>{locale === "en" ? "English" : "Français"}</span>
                    </DropdownMenuItem>
                  </div>
                </div>

                <div className="h-px bg-border/70" />

                <DropdownMenuItem
                  className="rounded-none px-0 cursor-pointer py-2 text-lg font-semibold focus:bg-transparent"
                  onClick={() => router.push("/business")}
                >
                  <span>For businesses</span>
                  <ArrowRight className="ml-auto size-6" />
                </DropdownMenuItem>
              </div>
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
                <Button asChild className={navButtonClass}>
                  <Link href="/business" onClick={() => setOpen(false)}>
                    {t("listBusiness")}
                  </Link>
                </Button>
                <Button asChild variant="secondary" className={navButtonClass}>
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
