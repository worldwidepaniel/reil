// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'always',
  i18n: { defaultLocale: 'pl', locales: ['pl', 'en'], routing: { prefixDefaultLocale: false } },
  vite: { plugins: [tailwindcss()] },
});
