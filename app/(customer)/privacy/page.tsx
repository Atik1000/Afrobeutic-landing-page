import { ContentPage, contentMetadata } from "@/components/content-page";

export const metadata = contentMetadata(
  "Privacy Policy",
  "How Afrobeutic handles your information.",
);

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy">
      <p>
        This placeholder policy describes how we would handle personal data in
        a production environment. The current site is a demonstration and does
        not collect or store real user information beyond what your browser
        shares with standard analytics (if enabled).
      </p>
      <p>
        In production, we would document lawful bases for processing, retention
        windows, subprocessors, and regional rights (GDPR, CCPA) here.
      </p>
    </ContentPage>
  );
}
