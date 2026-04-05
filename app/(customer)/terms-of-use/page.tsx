import { ContentPage, contentMetadata } from "@/components/content-page";

export const metadata = contentMetadata(
  "Terms of Use",
  "Additional usage terms for Afrobeutic.",
);

export default function TermsOfUsePage() {
  return (
    <ContentPage title="Terms of Use">
      <p>
        This page holds supplementary usage rules for marketplace participants,
        including acceptable content, review integrity, and enforcement.
      </p>
      <p>Demo only — replace with counsel-approved language before launch.</p>
    </ContentPage>
  );
}
