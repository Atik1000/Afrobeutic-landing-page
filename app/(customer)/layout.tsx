import { CustomerNavbar } from "@/components/layout/customer-navbar";
import { SiteFooter } from "@/components/layout/footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomerNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
