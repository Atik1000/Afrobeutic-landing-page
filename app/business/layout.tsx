import { BusinessNavbar } from "@/components/layout/business-navbar";
import { SiteFooter } from "@/components/layout/footer";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BusinessNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
