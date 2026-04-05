export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const defaultLocale: Locale = "en";

export const messages: Record<
  Locale,
  Record<string, string>
> = {
  en: {
    brand: "Afrobeutic",
    tagline: "Book beauty & wellness near you",
    search: "Search",
    listBusiness: "List your Business",
    marketplace: "Marketplace",
    login: "Login",
    language: "Language",
    pricing: "Pricing",
  },
  fr: {
    brand: "Afrobeutic",
    tagline: "Réservez beauté & bien-être près de chez vous",
    search: "Rechercher",
    listBusiness: "Référencer mon salon",
    marketplace: "Marketplace",
    login: "Connexion",
    language: "Langue",
    pricing: "Tarifs",
  },
};
