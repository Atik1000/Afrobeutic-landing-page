"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { MaxWidth } from "@/components/layout/max-width";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLocale } from "@/components/providers/locale-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function BusinessNavbar() {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <MaxWidth className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden md:block">
          <Button variant="ghost" asChild className="rounded-full">
            <Link href="/business/pricing">{t("pricing")}</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="rounded-full hidden sm:inline-flex">
            <Link href="/">{t("marketplace")}</Link>
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
                className="rounded-xl md:hidden"
                onClick={() => router.push("/business/pricing")}
              >
                {t("pricing")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-xl sm:hidden"
                onClick={() => router.push("/")}
              >
                {t("marketplace")}
              </DropdownMenuItem>
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
                onClick={() => router.push("/")}
              >
                {t("marketplace")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </MaxWidth>
    </header>
  );
}
