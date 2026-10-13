import faq from "./faq.json";
import honeys from "../../data/honeys.json";

export default [
  ...faq,
  ...honeys.map((honey) => ({
    pl: {
      question: `${honey.pl.name} — jakie ma właściwości i do czego pasuje?`,
      answer: `${honey.pl.description} ${honey.pl.uses}`,
    },
    en: {
      question: `${honey.en.name} — what are its characteristics and suggested pairings?`,
      answer: `${honey.en.description} ${honey.en.uses}`,
    },
  })),
];
