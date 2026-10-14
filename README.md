# REIL — Pracownia Pszczelarska

Statyczny landing w Astro 7, Tailwind CSS 4, Three.js i GSAP. Polski pod `/`, angielski pod `/en/`. Wersja robocza do lokalnego podglądu, bez backendu i usług zewnętrznych.

## Uruchomienie

Zalecany Node.js 22.19+ (wymaganie zależności Astro), npm i Chrome do testów.

```sh
npm ci
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev stop
```

Podgląd: `http://localhost:4321`.

```sh
npm run check
npm run build
npm test
```

Playwright uruchamia własny podgląd produkcyjny na porcie 4322. Testuje PL/EN, oba motywy, modale, fokus, FAQ, brak JavaScriptu, ograniczenie ruchu, awarię modeli i prawdziwe WebGL. Axe sprawdza dostępne automatycznie reguły WCAG, w tym kontrast AAA. Nie zastępuje to pełnego ręcznego audytu WCAG AAA ani testów na fizycznym telefonie.

## Treści i publikacja

- `src/content/site.ts`: teksty PL/EN, produkty, FAQ oraz obiekt `contact` z telefonem, e-mailem i adresem. Wartości `null` są wyświetlane jako pola do uzupełnienia, bez fikcyjnych linków.
- `src/components/Landing.astro`: wspólny układ obu języków i metadane. Szczegóły produktów i FAQ są w HTML; skrypt rozszerza opisy produktów o natywny modal.
- `src/styles/global.css`: Tailwind, paleta i układ responsywny.
- `src/scripts/scene.ts`: jedna scena Three.js; `main.ts` obsługuje preferencje i modale.

Przed publikacją potwierdź ofertę, teksty, zdjęcia, dane pracowni i docelową domenę. Usuń wtedy komunikaty o wersji roboczej oraz zaktualizuj odpowiedź FAQ o kontakcie. Nie deklarujemy cen, dostępności ani dostawy bez potwierdzenia.

Ustaw `SITE_URL` w środowisku budowania na prawdziwy adres HTTPS strony. Astro wygeneruje canonical, PL/EN hreflang, adres grafiki Open Graph, sitemapę i dane organizacji. Bez tego ustawienia nie powstają fikcyjne adresy: sitemap.xml jest pustą listą, a robots.txt nie zawiera odnośnika do niej. Przed publicznym wdrożeniem sprawdź także istniejącą grafikę `public/og-image.png`.

## Grafika i ruch

`pasieka-web.glb` jest pochodną `pasieka.glb`: animacja jest zachowana, trzy tekstury zmniejszone do 512 px i JPEG quality 85. W obu modelach słoika naprawiono sześć odwróconych ścian bocznych oraz ich położenie i normalne, aby usunąć widoczny pionowy szew. Pozostałe GLB i źródłowe TTF pozostają nienaruszone. Fonty WOFF2 skonwertowano z dostarczonych TTF narzędziem wawoff2 2.0.1; licencja jest w `public/OFL.txt`.

Scena ładuje się osobno po pierwszym renderze treści. Na telefonach używa prostych materiałów Lambert i niższej rozdzielczości. Na większych ekranach używa środowiska oświetleniowego i materiałów fizycznych. Pszczoła wykonuje krótki przelot, a słoik obraca się powoli, dopóki pozostaje widoczny. Słoik obraca się tylko wokół osi Y. Przeciągnięcie w poziomie zmienia kąt i wstrzymuje automatyczny obrót do puszczenia — wtedy obrót trwa dalej od pozostawionej pozycji. Strzałki w lewo i w prawo zmieniają kąt; Home resetuje widok. Renderowanie zatrzymuje się poza sceną i w nieaktywnej karcie.

Ustawienie systemowe `prefers-reduced-motion` ma pierwszeństwo; ręczne wyłączenie jest zapamiętywane. W tym trybie modele nie są pobierane. Bez WebGL lub przy błędzie modelu pozostaje statyczna kompozycja CSS. Bez JS działają nawigacja, języki, opisy i FAQ.

## SEO / GEO

Semantyczny HTML, jawne odpowiedzi FAQ, opisy odmian i osobne metadane językowe są podstawą indeksowania. Treści nie zależą od canvasu ani skryptu. Nie dodano specjalnego formatu „dla AI” ani niepotwierdzonych ocen czy ofert w danych strukturalnych. Widoczność i cytowanie przez wyszukiwarki nie są gwarantowane.
