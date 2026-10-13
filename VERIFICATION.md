# Weryfikacja REIL — 2026-10-13

## Wyniki

- `npm run check`: 0 błędów, ostrzeżeń i sugestii.
- `npm run build`: poprawne generowanie `/`, `/en/`, `robots.txt` i `sitemap.xml`.
- `npm test`: 18/18 testów Playwright w Chrome, na profilach desktopowym i mobilnym.
- `npm audit`: 0 podatności. Jednorazowe narzędzie Lighthouse usunięto z zależności projektu po pomiarach.
- Kontrola buildu z testowym `SITE_URL`: poprawne canonical, wzajemne hreflang, JSON-LD Organization, sitemap i robots; następnie przywrócono lokalny build bez domeny.

## Lighthouse

Lighthouse 12.6.1, Chrome headless, domyślny profil mobilny i symulowane ograniczenie sieci/CPU. Lokalny build produkcyjny na porcie 4323, domyślnie włączone 3D. Trzy niezależne uruchomienia dla każdego języka.

| Język | Performance (3 pomiary) | Mediana | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| PL | 96 / 96 / 96 | 96 | 100 | 100 | 100 |
| EN | 96 / 96 / 96 | 96 | 100 | 100 | 100 |

W pomiarach: FCP około 1,0 s, LCP 2,8 s, TBT 0–10 ms, CLS 0. Surowe raporty są lokalnie w `.lighthouse/pl-1.json` do `pl-3.json` oraz `en-1.json` do `en-3.json` (katalog ignorowany przez Git). Drobna późniejsza korekta minimalnych rozmiarów odnośników nie zmieniała ładowania zasobów ani sceny.

Do powtórzenia pomiaru użyj buildu produkcyjnego i `npm exec --yes --package=lighthouse@12.6.1 -- lighthouse http://localhost:4323/ --chrome-flags=--headless`. Serwer uruchom wcześniej przez `npm run preview -- --background --port 4323`, a po pomiarze zatrzymaj przez `npm run astro -- preview stop`.

## Zakres kontroli

Testy obejmują oba języki i motywy, otwieranie modalu i przywracanie fokusu, Escape, kontakt z kart, FAQ, zapamiętywanie preferencji, układ bez poziomego przewijania, brak JS, ograniczenie ruchu bez pobierania GLB, awarię modeli, brak WebGL, rzeczywistą scenę 3D i jej wyłączanie. Axe sprawdza strony i modal, w tym podwyższony kontrast AAA. Sprawdzono wizualnie zrzuty sceny, pełnej strony mobilnej i ciemnego motywu.

Nie przeprowadzono pełnego ręcznego audytu WCAG AAA z czytnikiem ekranu ani pomiarów na fizycznych telefonach. Wyniki lokalne nie gwarantują identycznej wydajności na docelowym hostingu. Przed publikacją trzeba uzupełnić i potwierdzić dane firmy, domenę, ofertę oraz robocze teksty i materiały.
