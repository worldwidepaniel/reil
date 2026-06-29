// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  srcDir: "./src",
  site: "https://www.atelier-reil.pl",

  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "pl",
        locales: {
          pl: "pl",
          en: "en",
        },
      },
    }),
  ],
});

