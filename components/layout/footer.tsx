import Link from "next/link";
import { MaxWidth } from "@/components/layout/max-width";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support Center" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30 py-16">
      <MaxWidth>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Book trusted salons and freelancers in minutes. Built for modern
              beauty discovery.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-10" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Afrobeutic. All rights reserved.
        </p>
      </MaxWidth>
    </footer>
  );
}
