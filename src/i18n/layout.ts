export const translations = {
  en: {
    card: {
      ask: "Enquire for availability",
    },
    meta: { title: "Apiarist Atelier REIL" },
    header: {
      main: "Apiarist Atelier",
      nav: {
        history: "Our Story",
        honey: "Honey",
        process: "Process",
        values: "Values",
        contact: "Contact",
      },
      lang: {
        pl: "PL",
        en: "EN",
      },
    },
  },
  pl: {
    meta: { title: "Atelier Pszczelarskie REIL" },
    card: {
      ask: "Zapytaj o dostępność",
    },
    header: {
      main: "Atelier Pszczelarskie",
      nav: {
        history: "Nasza Historia",
        honey: "Miód",
        process: "Proces",
        values: "Wartości",
        contact: "Kontakt",
      },
      lang: {
        pl: "PL",
        en: "EN",
      },
    },
  },
} as const;

export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
