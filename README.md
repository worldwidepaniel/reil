# Astro Starter Kit: Minimal

## Content translations

Polish (`pl`, `/`) is the source of truth. Write or update Polish content first,
then translate it faithfully into English (`en`, `/en`) without adding claims.
Page copy lives in `src/pages/`, shared labels and metadata in `src/i18n/layout.ts`,
and product and FAQ copy in `src/data/honeys.json` and `src/components/faq/faq.json`.
FAQ structured data reuses the displayed FAQ translations.
Honey FAQ entries are generated in `src/components/faq/faq.ts` from the same
product descriptions and pairings used by the honey modals.

After updating translations, run `npm run build` followed by
`node --test tests/honeys.test.mjs` to check product copy and jar sizes on both
generated language pages.

Honey characteristics follow the Polish food-quality inspectorate's descriptions
of [honey analysis](https://www.gov.pl/web/ijhars/metody-analityczne-stosowane-w-badaniach-jakosci-handlowej-miodow)
and the Ministry of Agriculture's [varietal descriptions](https://www.gov.pl/web/rolnictwo/miody-rudnickie).
Culinary pairings are serving suggestions, informed by
[University of Missouri Extension's honey guide](https://extension.missouri.edu/publications/gh1120).

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
