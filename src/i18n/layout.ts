export const translations = {
  en: {
    card: {
      ask: "Enquire for availability",
    },
    meta: {
      title:
        "Apiarist Atelier REIL | Authentic Raw Honey from Stary Żagań, Poland",
      desc: "Discover authentic, raw, and unheated honey from our family apiary in Stary Żagań. We offer limited batches of Acacia, Wildflower, Rapeseed, Linden, and Heather honey.",
      keywords:
        "raw honey, apiary Poland, Stary Zagan, unheated honey, acacia honey, wildflower honey, rapeseed honey, linden honey, heather honey, Apiarist Atelier REIL",
      og: {
        title:
          "Apiarist Atelier REIL | Authentic Raw Honey from Stary Żagań, Poland",
        desc: "Discover authentic, raw, and unheated honey from our family apiary in Stary Żagań.",
        image: "https://www.atelier-reil.pl/og-image.jpg",
      },
      twitter: {
        card: "summary_large_image",
        title: "Apiarist Atelier REIL | Authentic Raw Honey",
        desc: "Discover authentic, raw, and unheated honey from our family apiary in Stary Żagań.",
        image: "https://www.atelier-reil.pl/og-image.jpg",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Apiarist Atelier REIL",
        description:
          "A family heritage apiary in Stary Żagań offering only raw, unsweetened, unheated, and mechanically unfiltered honey.",
        url: "https://www.atelier-reil.pl/en",
        telephone: "+48123456789",
        email: "kontakt@atelier-reil.pl",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Stary Żagań 46",
          addressLocality: "Stary Żagań",
          addressCountry: "PL",
        },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Acacia Honey" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Wildflower Honey" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Rapeseed Honey" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Linden Honey" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Heather Honey" },
          },
        ],
      },
    },
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
    meta: {
      title:
        "Atelier Pszczelarskie REIL | Prawdziwy, Surowy Miód ze Starego Żagania",
      desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu. Oferujemy miód akacjowy, wielokwiatowy, rzepakowy, lipowy i wrzosowy.",
      keywords:
        "miód, prawdziwy miód, pasieka, Stary Żagań, miód surowy, miód akacjowy, miód wielokwiatowy, miód rzepakowy, miód lipowy, miód wrzosowy, Atelier Pszczelarskie REIL",
      og: {
        title:
          "Atelier Pszczelarskie REIL | Prawdziwy, Surowy Miód ze Starego Żagania",
        desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu.",
        image: "https://www.atelier-reil.pl/og-image.jpg",
      },
      twitter: {
        card: "summary_large_image",
        title: "Atelier Pszczelarskie REIL | Prawdziwy, Surowy Miód",
        desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu.",
        image: "https://www.atelier-reil.pl/og-image.jpg",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Atelier Pszczelarskie REIL",
        description:
          "Rodzinne dziedzictwo ze Starego Żagania. Oferujemy wyłącznie miody surowe, niedosładzane, nierozgrzewane i niefiltrowane mechanicznie.",
        url: "https://www.atelier-reil.pl",
        telephone: "+48123456789",
        email: "kontakt@atelier-reil.pl",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Stary Żagań 46",
          addressLocality: "Stary Żagań",
          addressCountry: "PL",
        },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Miód Akacjowy" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Miód Wielokwiatowy" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Miód Rzepakowy" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Miód Lipowy" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Miód Wrzosowy" },
          },
        ],
      },
    },
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
