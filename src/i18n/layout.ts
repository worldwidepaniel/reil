export const translations = {
  en: {
    meta: { title: "Apiarist Atelier REIL" },
    header: { home: "home", main: "Apiarist Atelier" },
  },
  pl: {
    meta: { title: "Atelier Pszczelarskie REIL" },
    header: { home: "strona główna", main: "Atelier Pszczelarskie" },
  },
} as const;

export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
