import { ContentPage, contentMetadata } from "@/components/content-page";

export const metadata = contentMetadata(
  "Terms of Service",
  "Terms governing use of Afrobeutic.",
);

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service">
      <p>
        These Terms of Service are placeholder copy for the Afrobeutic demo.
        They are not legal advice and do not create a binding agreement.
      </p>
      <p>
        A production version would cover eligibility, marketplace rules,
        cancellations, liability caps, and dispute resolution.
      </p>
    </ContentPage>
  );
}
