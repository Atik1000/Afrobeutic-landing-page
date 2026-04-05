import { ContentPage, contentMetadata } from "@/components/content-page";

export const metadata = contentMetadata(
  "Contact",
  "Reach the Afrobeutic team.",
);

export default function ContactPage() {
  return (
    <ContentPage title="Contact">
      <p>
        For partnerships, press, or support, email{" "}
        <a
          className="font-medium text-foreground underline-offset-4 hover:underline"
          href="mailto:hello@afrobeutic.com"
        >
          hello@afrobeutic.com
        </a>
        .
      </p>
      <p>We respond within two business days (demo — not monitored).</p>
    </ContentPage>
  );
}
