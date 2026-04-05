import { ContentPage, contentMetadata } from "@/components/content-page";

export const metadata = contentMetadata(
  "About Afrobeutic",
  "Learn about the Afrobeutic salon marketplace.",
);

export default function AboutPage() {
  return (
    <ContentPage title="About Afrobeutic">
      <p>
        Afrobeutic connects guests with salons and independent stylists through
        a modern marketplace experience. We focus on transparent pricing,
        verified reviews, and frictionless booking — no account required to
        reserve your first visit.
      </p>
      <p>
        This demo frontend uses mock data and does not process real payments
        or calendar integrations.
      </p>
    </ContentPage>
  );
}
