import type { Metadata } from "next";
import { PricingView } from "@/features/business/pricing-view";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans for salon shops and individual stylists on Afrobeutic.",
};

export default function PricingPage() {
  return <PricingView />;
}
