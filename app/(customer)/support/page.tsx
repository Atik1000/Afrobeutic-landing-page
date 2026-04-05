import { ContentPage, contentMetadata } from "@/components/content-page";
import Link from "next/link";

export const metadata = contentMetadata(
  "Support Center",
  "Get help with Afrobeutic.",
);

export default function SupportPage() {
  return (
    <ContentPage title="Support Center">
      <p>
        Browse common questions about booking, cancellations, and listing your
        business. This demo includes static guidance only.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Booking changes: contact the salon directly from your confirmation.</li>
        <li>Payments: not enabled in this preview build.</li>
        <li>
          List your business: start at{" "}
          <Link
            href="/business"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            /business
          </Link>
          .
        </li>
      </ul>
    </ContentPage>
  );
}
