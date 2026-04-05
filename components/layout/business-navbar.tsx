"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { MaxWidth } from "@/components/layout/max-width";
import { useLocale } from "@/components/providers/locale-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Globe, Menu } from "lucide-react";

const navButtonClass = "h-11 gap-2 rounded-full px-5 text-base font-semibold";

export function BusinessNavbar() {
  const { locale, setLocale, t } = useLocale();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <MaxWidth className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden md:block">
          <Button variant="ghost" asChild className={navButtonClass}>
            <Link href="/business/pricing">{t("pricing")}</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className={cn(navButtonClass, "hidden sm:inline-flex")}
          >
            <Link href="/">{t("marketplace")}</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu"
              className={cn(buttonVariants({ variant: "outline" }), navButtonClass)}
            >
              Menu
              <Menu className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[min(90vw,24rem)] rounded-[28px] border border-border/70 bg-background p-6 shadow-2xl"
            >
              <div className="space-y-1">
                <DropdownMenuItem
                  className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent md:hidden"
                  onClick={() => router.push("/business/pricing")}
                >
                  {t("pricing")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent"
                  onClick={() => router.push("/login")}
                >
                  <span className="text-primary">Log in or sign up</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="rounded-none cursor-pointer px-0 py-2 text-lg font-medium focus:bg-transparent"
                  onClick={() => setLocale(locale === "en" ? "fr" : "en")}
                >
                  <Globe className="size-5 shrink-0" />
                  <span className="uppercase text-foreground/80">{locale}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="mt-3 rounded-none border-t border-border/70 cursor-pointer px-0 pt-4 pb-2 text-lg font-semibold focus:bg-transparent"
                  onClick={() => router.push("/")}
                >
                  <span>{t("marketplace")}</span>
                  <ArrowRight className="ml-auto size-6" />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </MaxWidth>
    </header>
  );
}
