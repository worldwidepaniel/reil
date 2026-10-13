export type Locale = 'pl' | 'en';

// Confirm these details before publication; null values never become contact links.
export const contact: { phone: string | null; email: string | null; address: string | null } = {
  phone: null, email: null, address: null,
};

interface Product {
  id: string; name: string; season: string; note: string; description: string;
  taste: string; use: string; crystallization: string;
}
interface Copy {
  title: string; description: string; nav: string[]; skip: string;
  craft: string; heroTop: string; heroMain: string; heroItalic: string;
  intro: string; discover: string; scroll: string; heroCaption: string;
  storyLabel: string; storyTitle: string; storyItalic: string; storyText: string; storyFoot: string;
  offerLabel: string; offerTitle: string; offerIntro: string; details: string; ask: string;
  taste: string; use: string; crystallization: string; close: string; draftProducts: string;
  faqLabel: string; faqTitle: string; faqIntro: string; faq: { q: string; a: string }[];
  contactLabel: string; contactTitle: string; contactItalic: string; contactIntro: string;
  phone: string; email: string; address: string; pending: string; draft: string;
  footer: string; back: string; theme: string; motion: string;
  products: Product[];
}

export const copy: Record<Locale, Copy> = {
  pl: {
    title: 'REIL — Pracownia Pszczelarska | Poznaj nasze miody',
    description: 'Poznaj Pracownię Pszczelarską REIL i pięć odmian miodu. Odkryj różnice w smaku, dowiedz się więcej o krystalizacji i skontaktuj się z pracownią.',
    nav: ['Pracownia', 'Miody', 'Pytania', 'Kontakt'], skip: 'Przejdź do treści',
    craft: 'Pracownia pszczelarska', heroTop: 'Małe pszczoły.', heroMain: 'Wielka', heroItalic: 'przyjemność.',
    intro: 'Zatrzymaj się na chwilę. Odkryj świat miodu, w którym każda łyżeczka ma swój charakter.',
    discover: 'Poznaj nasze miody', scroll: 'Dalej, w swoim tempie', heroCaption: 'Od pszczoły do słoika',
    storyLabel: '01 / Pracownia', storyTitle: 'Dobre rzeczy', storyItalic: 'zaczynają się od małych.',
    storyText: 'Od kwiatu. Od pszczoły. Od uważności. W REIL zapraszamy do poznawania miodu przez jego smak, zapach i konsystencję. Bo między jednym a drugim słoikiem kryje się cały świat różnic.',
    storyFoot: 'Pięć odmian. Pięć sposobów na słodką chwilę.',
    offerLabel: '02 / Kolekcja smaków', offerTitle: 'Znajdź swój ulubiony.',
    offerIntro: 'Delikatny czy wyrazisty? Kwiatowy czy z nutą goryczki? Poznaj charakter każdego z naszych miodów.',
    details: 'Poznaj szczegóły', ask: 'Zapytaj o ten miód', taste: 'Smak i aromat', use: 'Na dobry początek', crystallization: 'Krystalizacja', close: 'Zamknij szczegóły',
    draftProducts: 'Prezentacja robocza. Pory roku oznaczają typowy sezon świeżych zbiorów, nie bieżący stan zapasów. Opisy dotyczą typowych cech odmian; oferta i szczegóły partii wymagają potwierdzenia w pracowni.',
    faqLabel: '03 / Warto wiedzieć', faqTitle: 'Ciekawość jest naturalna.', faqIntro: 'Kilka odpowiedzi, które pomogą lepiej poznać miód.',
    faq: [
      { q: 'Jaki miód wybrać na początek?', a: 'Jeśli lubisz łagodny smak, zacznij od miodu akacjowego lub rzepakowego. Wielokwiatowy pozwala odkrywać różne nuty kwiatowe. Lipowy i wrzosowy to propozycje dla osób szukających bardziej wyrazistego aromatu. Smak konkretnej partii może się różnić.' },
      { q: 'Czym różnią się odmiany miodu?', a: 'Odmiany różnią się przede wszystkim pochodzeniem nektaru. Wpływa ono na barwę, zapach, smak i tempo krystalizacji. Miód wielokwiatowy powstaje z nektaru różnych roślin, dlatego jego charakter może zmieniać się wraz z miejscem i okresem zbioru.' },
      { q: 'Czy krystalizacja miodu jest naturalna?', a: 'Tak. Krystalizacja to naturalne przechodzenie miodu z postaci płynnej w bardziej stałą. Sama w sobie nie oznacza zepsucia. Jej tempo zależy między innymi od odmiany i temperatury przechowywania: miód rzepakowy zwykle krystalizuje szybciej niż akacjowy.' },
      { q: 'Jak przechowywać miód?', a: 'Przechowuj miód w szczelnie zamkniętym słoiku, w suchym miejscu, z dala od bezpośredniego słońca i źródeł ciepła. Nabieraj go czystą, suchą łyżeczką. Uwzględnij również informacje umieszczone na etykiecie konkretnego produktu.' },
      { q: 'Jak zapytać o zakup i dostępność miodu REIL?', a: 'Przejdź do sekcji Kontakt, aby znaleźć dane pracowni. W zapytaniu podaj interesującą Cię odmianę i ilość. Aktualną dostępność, cenę oraz sposób przekazania zamówienia należy ustalić bezpośrednio z pracownią. Dane kontaktowe w tej wersji roboczej czekają na uzupełnienie.' },
    ],
    contactLabel: '04 / Porozmawiajmy', contactTitle: 'Masz ochotę', contactItalic: 'na coś dobrego?',
    contactIntro: 'Zapytaj o wybrany miód, aktualną ofertę lub po prostu poznaj nas bliżej.',
    phone: 'Zadzwoń', email: 'Napisz', address: 'Znajdź pracownię', pending: 'Dane do uzupełnienia',
    draft: 'Wersja robocza — dane pracowni zostaną uzupełnione przed publikacją.',
    footer: 'Małe rzeczy. Wielka przyjemność.', back: 'Wróć na początek', theme: 'Ciemny motyw', motion: 'Animacje włączone',
    products: [
      { id: 'rzepak', season: 'Wiosna', name: 'Rzepakowy', note: 'Łagodny · jasny', description: 'Prosty smak codziennych przyjemności. Jasny miód, który po krystalizacji nabiera bardziej zwartej konsystencji.', taste: 'Łagodny, słodki, z aromatem charakterystycznym dla kwiatów rzepaku.', use: 'Pasuje do pieczywa, porannej owsianki i domowych wypieków.', crystallization: 'Zwykle krystalizuje szybko, tworząc drobne kryształki i bardzo jasną barwę.' },
      { id: 'wielokwiat', season: 'Wiosna – lato', name: 'Wielokwiatowy', note: 'Kwiatowy · różnorodny', description: 'Mały bukiet zamknięty w słoiku. Miód, którego charakter opowiada o różnorodności kwitnących roślin.', taste: 'Zwykle słodki i kwiatowy; intensywność, kolor i aromat zależą od roślin oraz okresu zbioru.', use: 'Spróbuj z jogurtem naturalnym, owsianką lub na kromce pieczywa.', crystallization: 'Krystalizuje naturalnie. Tempo i wielkość kryształków zależą od składu konkretnej partii.' },
      { id: 'akacja', season: 'Wczesne lato', name: 'Akacjowy', note: 'Subtelny · delikatny', description: 'Delikatna słodycz, która zostawia miejsce innym smakom. Spokojny początek przygody z miodem.', taste: 'Zwykle jasny, o łagodnym smaku i subtelnym kwiatowym aromacie.', use: 'Spróbuj z delikatnym twarożkiem, naleśnikami lub jogurtem.', crystallization: 'Zwykle pozostaje płynny dłużej niż wiele innych odmian. Również może naturalnie krystalizować.' },
      { id: 'lipa', season: 'Lato', name: 'Lipowy', note: 'Aromatyczny · wyrazisty', description: 'Wyrazisty charakter i zapach kojarzący się z kwitnącą lipą. Dla tych, którzy lubią odkrywać więcej.', taste: 'Intensywny aromat, niekiedy lekko ostry smak i subtelna goryczka.', use: 'Dobry towarzysz ziołowych naparów, cytryny lub prostych deserów.', crystallization: 'Z czasem przechodzi w postać krystaliczną; jej struktura zależy od danej partii.' },
      { id: 'wrzos', season: 'Koniec lata – jesień', name: 'Wrzosowy', note: 'Głęboki · charakterystyczny', description: 'Wyrazisty finał naszej kolekcji. Bogaty aromat i charakter, obok którego trudno przejść obojętnie.', taste: 'Intensywny, z nutą goryczki i charakterystycznym aromatem wrzosu.', use: 'Spróbuj z wyrazistymi serami, pieczywem lub jako akcent w sosie.', crystallization: 'Może mieć charakterystyczną, galaretowatą konsystencję; z czasem również krystalizuje.' },
    ],
  },
  en: {
    title: 'REIL — Beekeeping Workshop | Discover our honey',
    description: 'Meet REIL Beekeeping Workshop and explore five honey varieties. Discover their flavours, learn about crystallisation and get in touch with the workshop.',
    nav: ['Workshop', 'Honey', 'Questions', 'Contact'], skip: 'Skip to content',
    craft: 'Beekeeping workshop', heroTop: 'Little bees.', heroMain: 'Simple', heroItalic: 'pleasures.',
    intro: 'Take a moment. Discover a world of honey where every spoonful has a character of its own.',
    discover: 'Discover our honey', scroll: 'Explore at your own pace', heroCaption: 'From bee to jar',
    storyLabel: '01 / The workshop', storyTitle: 'Good things', storyItalic: 'start small.',
    storyText: 'A flower. A bee. A little attention. At REIL, we invite you to discover honey through its flavour, scent and texture. Because between one jar and the next, there is a whole world of difference.',
    storyFoot: 'Five varieties. Five ways to savour a sweet moment.',
    offerLabel: '02 / A collection of flavours', offerTitle: 'Find your favourite.',
    offerIntro: 'Gentle or bold? Floral or slightly bitter? Get to know the character of each of our honeys.',
    details: 'Explore this honey', ask: 'Ask about this honey', taste: 'Flavour & aroma', use: 'Try it with', crystallization: 'Crystallisation', close: 'Close details',
    draftProducts: 'Draft presentation. Seasons indicate typical fresh harvest periods, not current stock. Descriptions reflect typical varietal characteristics; the range and individual batches need confirmation from the workshop.',
    faqLabel: '03 / Good to know', faqTitle: 'Naturally curious.', faqIntro: 'A few answers to help you get to know honey.',
    faq: [
      { q: 'Which honey should I try first?', a: 'For a gentle flavour, start with acacia or rapeseed honey. Multifloral honey offers a range of floral notes. Linden and heather honey suit those looking for a bolder aroma. The flavour of individual batches can vary.' },
      { q: 'What makes honey varieties different?', a: 'The main difference is the source of nectar. It influences colour, aroma, flavour and the speed of crystallisation. Multifloral honey comes from various plants, so its character can change with the location and season of harvest.' },
      { q: 'Is honey crystallisation natural?', a: 'Yes. Crystallisation is the natural process of honey changing from liquid to a more solid form. On its own, it does not mean the honey has spoiled. The speed depends on factors including variety and storage temperature: rapeseed honey usually crystallises faster than acacia honey.' },
      { q: 'How should I store honey?', a: 'Keep honey in a tightly closed jar in a dry place, away from direct sunlight and heat. Use a clean, dry spoon. Also follow the information on the label of your particular product.' },
      { q: 'How can I ask about buying REIL honey?', a: 'Visit the Contact section for the workshop’s details. Include the variety and quantity you are interested in. Confirm current availability, prices and collection or delivery arrangements directly with the workshop. Contact details in this draft are awaiting completion.' },
    ],
    contactLabel: '04 / Let’s talk', contactTitle: 'In the mood', contactItalic: 'for something good?',
    contactIntro: 'Ask about a honey, explore the current range or simply get to know us a little better.',
    phone: 'Call us', email: 'Write to us', address: 'Find the workshop', pending: 'Details to be added',
    draft: 'Draft version — workshop details will be added before publication.',
    footer: 'Little things. Simple pleasures.', back: 'Back to top', theme: 'Dark theme', motion: 'Animations enabled',
    products: [
      { id: 'rzepak', season: 'Spring', name: 'Rapeseed', note: 'Mild · light', description: 'A simple everyday pleasure. A light honey that develops a firmer texture as it crystallises.', taste: 'Mild and sweet, with an aroma characteristic of rapeseed flowers.', use: 'Pairs with bread, morning porridge and home baking.', crystallization: 'Usually crystallises quickly, producing fine crystals and a very pale colour.' },
      { id: 'wielokwiat', season: 'Spring – summer', name: 'Multifloral', note: 'Floral · varied', description: 'A little bouquet in a jar. A honey whose character reflects the variety of flowering plants.', taste: 'Usually sweet and floral; intensity, colour and aroma depend on the plants and harvest season.', use: 'Try it with plain yoghurt, porridge or a slice of bread.', crystallization: 'Crystallises naturally. Speed and crystal size depend on the composition of each batch.' },
      { id: 'akacja', season: 'Early summer', name: 'Acacia', note: 'Subtle · delicate', description: 'A delicate sweetness that leaves room for other flavours. A gentle introduction to the world of honey.', taste: 'Usually light in colour, with a mild flavour and a subtle floral aroma.', use: 'Try it with fresh cheese, pancakes or yoghurt.', crystallization: 'Usually stays liquid longer than many other varieties. It can still crystallise naturally.' },
      { id: 'lipa', season: 'Summer', name: 'Linden', note: 'Aromatic · bold', description: 'A distinctive character and a scent reminiscent of linden blossom. For those who enjoy exploring.', taste: 'An intense aroma, sometimes a slightly sharp flavour with a subtle bitterness.', use: 'A companion for herbal infusions, lemon or simple desserts.', crystallization: 'Becomes crystalline over time; the texture depends on the individual batch.' },
      { id: 'wrzos', season: 'Late summer – autumn', name: 'Heather', note: 'Deep · distinctive', description: 'A bold finish to our collection. A rich aroma and a character that invites you to pause.', taste: 'Intense, with a hint of bitterness and a distinctive heather aroma.', use: 'Try it with stronger cheeses, bread or as an accent in a dressing.', crystallization: 'May have a characteristic jelly-like consistency; it also crystallises over time.' },
    ],
  },
};
