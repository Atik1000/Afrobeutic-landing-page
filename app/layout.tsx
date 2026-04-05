import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://afrobeutic.com",
  ),
  title: {
    default: "Afrobeutic — Salon marketplace & booking",
    template: "%s · Afrobeutic",
  },
  description:
    "Search salons, book beauty appointments, and list your business on Afrobeutic.",
  openGraph: {
    title: "Afrobeutic",
    description:
      "Premium salon marketplace — discover, compare, and book in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <QueryProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
