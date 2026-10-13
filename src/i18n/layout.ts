import faq from "../components/faq/faq.ts";

// Polish copy is the source of truth for every translation.
export const translations = {
  en: {
    card: {
      ask: "Ask about availability",
      properties: "Characteristics",
      uses: "Best enjoyed with",
      details: "View honey details",
      close: "Close",
    },
    honeys: {
      sizesTitle: "Jar sizes",
      sizes: "900 ml, 450 ml and 200 ml, plus 30 ml gift jars.",
      sizesNote:
        "Ask about the available varieties and sizes from the latest harvest.",
    },
    meta: {
      title: "REIL Beekeeping Studio | Authentic Raw Honey from Stary Żagań",
      desc: "Buy authentic honey with no added sugar and no filtering from our family apiary in Stary Żagań. We offer acacia, wildflower, rapeseed, linden, and heather honey.",
      keywords:
        "honey, authentic honey, apiary, Stary Żagań, raw honey, acacia honey, wildflower honey, rapeseed honey, linden honey, heather honey, REIL Beekeeping Studio",
      og: {
        title: "REIL Beekeeping Studio | Authentic Raw Honey from Stary Żagań",
        desc: "Buy authentic honey with no added sugar and no filtering from our family apiary in Stary Żagań.",
        image: "https://reil.pages.dev/og-image.png",
      },
      twitter: {
        card: "summary_large_image",
        title: "REIL Beekeeping Studio | Authentic Raw Honey",
        desc: "Buy authentic honey with no added sugar and no filtering from our family apiary in Stary Żagań.",
        image: "https://reil.pages.dev/og-image.png",
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "REIL Beekeeping Studio",
          description:
            "A family heritage from Stary Żagań. We offer only raw honey with no added sugar, no heating, and no mechanical filtering.",
          url: "https://reil.pages.dev/en",
          telephone: "+48123456789",
          email: "kontakt@reil.pages.dev",
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
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.en.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.en.answer,
            },
          })),
        },
      ],
    },
    header: {
      main: "Beekeeping Studio",
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
        "Pracownia Pszczelarska REIL | Prawdziwy, Surowy Miód ze Starego Żagania",
      desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu. Oferujemy miód akacjowy, wielokwiatowy, rzepakowy, lipowy i wrzosowy.",
      keywords:
        "miód, prawdziwy miód, pasieka, Stary Żagań, miód surowy, miód akacjowy, miód wielokwiatowy, miód rzepakowy, miód lipowy, miód wrzosowy, Pracownia Pszczelarska REIL",
      og: {
        title:
          "Pracownia Pszczelarska REIL | Prawdziwy, Surowy Miód ze Starego Żagania",
        desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu.",
        image: "https://reil.pages.dev/og-image.png",
      },
      twitter: {
        card: "summary_large_image",
        title: "Pracownia Pszczelarska REIL | Prawdziwy, Surowy Miód",
        desc: "Kup prawdziwy, niedosładzany i niefiltrowany miód z rodzinnej pasieki w Starym Żaganiu.",
        image: "https://reil.pages.dev/og-image.png",
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Pracownia Pszczelarska REIL",
          description:
            "Rodzinne dziedzictwo ze Starego Żagania. Oferujemy wyłącznie miody surowe, niedosładzane, nierozgrzewane i niefiltrowane mechanicznie.",
          url: "https://reil.pages.dev",
          telephone: "+48123456789",
          email: "kontakt@reil.pages.dev",
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
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.pl.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.pl.answer,
            },
          })),
        },
      ],
    },
    card: {
      ask: "Zapytaj o dostępność",
      properties: "Właściwości",
      uses: "Do czego pasuje",
      details: "Poznaj ten miód",
      close: "Zamknij",
    },
    honeys: {
      sizesTitle: "Pojemności słoików",
      sizes: "900 ml, 450 ml i 200 ml oraz słoiczki prezentowe 30 ml.",
      sizesNote: "Zapytaj o dostępne odmiany i pojemności z ostatnich zbiorów.",
    },
    header: {
      main: "Pracownia Pszczelarska",
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
