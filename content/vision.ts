import type { Lang } from './types';

/**
 * Vision page: "What We're Creating".
 *
 * Unlike the per-language copy files, this page keeps all three languages side by side,
 * one `{ en, it, tr }` object per field. That is the shape of a localized Sanity
 * document, so `VisionPage`, `VisionSection` and `VisionImage` below map 1:1 to the
 * future schema. The page component reads only from this file.
 *
 * Source of the copy:
 * - EN and TR: the founder's text, verbatim.
 * - IT: translated for this page, in the site's Italian voice (informal "tu").
 * - Alt text, captions, the nav label, the page label and the SEO description were
 *   written for the site. In TR these lines carry the comment "TR: needs native review".
 *
 * Images: renders in public/vision/ (originals stay in _incoming/, never committed),
 * plus a few existing concept visuals from public/images/ for sections without a render.
 * Every image here is a concept: `concept: true` shows the small "Concept" label.
 */

export type Localized<T = string> = Record<Lang, T>;

export interface VisionImage {
  src: string;
  /** Intrinsic pixel size of the file. */
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
  /** Render / concept visual rather than a photograph. */
  concept: boolean;
}

export interface VisionList {
  title: Localized;
  items: Localized<string[]>;
}

/** A sub-section inside a section (e.g. Nido inside "Our Lodges"). */
export interface VisionBlock {
  id: string;
  title: Localized;
  /** Small-caps line above the title: meaning, size, guests. */
  kicker?: Localized;
  /** Italic line under the title. */
  lead?: Localized;
  text?: Localized<string[]>;
  list?: VisionList;
  images: VisionImage[];
}

export interface VisionTable {
  headings: Localized<[string, string, string]>;
  rows: { title: Localized; text: Localized; format: Localized }[];
}

export type VisionLink = { kind: 'page'; page: 'blog' } | { kind: 'signup' };

export interface VisionSection {
  id: string;
  title: Localized;
  kicker?: Localized;
  lead?: Localized;
  text: Localized<string[]>;
  list?: VisionList;
  blocks?: VisionBlock[];
  table?: VisionTable;
  /** Short lines set as a verse (closing journey). */
  lines?: Localized<string[]>;
  /** Small closing note (disclaimers, "to be announced"). */
  note?: Localized;
  ctas?: { label: Localized; link: VisionLink; style: 'solid' | 'outline' }[];
  images: VisionImage[];
}

export interface VisionPage {
  meta: { description: Localized };
  intro: {
    label: Localized;
    title: Localized;
    lead: Localized;
    text: Localized<string[]>;
    /** Concept-design disclaimer. */
    note: Localized;
    hero: VisionImage;
    /** Shown after the text: the site layout. */
    images: VisionImage[];
  };
  sections: VisionSection[];
  ui: {
    conceptLabel: Localized;
    /** Slider / Tiles switch, used for galleries of three or more images. */
    gallery: {
      group: Localized;
      slider: Localized;
      tiles: Localized;
      previous: Localized;
      next: Localized;
      /** "{n}" is replaced by the image number. */
      viewInSlider: Localized;
      /** Read out by screen readers; "{n}" and "{total}" are replaced. */
      position: Localized;
      /** Shown left of the switch in Tiles view: with a mouse, and on touch screens. */
      hint: Localized;
      hintTouch: Localized;
    };
  };
}

const V = '/vision';

export const vision: VisionPage = {
  meta: {
    description: {
      en: 'A place to stay, taste, gather and find your own rhythm. Explore the spaces we’re imagining at Zabut, shown in concept designs for a project in development.',
      it: 'Un luogo per soggiornare, assaporare, ritrovarsi e trovare il proprio ritmo. Scopri gli spazi che immaginiamo a Zabut, nei progetti concettuali di un’iniziativa in fase di sviluppo.',
      // TR: needs native review
      tr: 'Konaklamak, tatmak, bir araya gelmek ve kendi ritmini bulmak için bir yer. Zabut’ta hayal ettiğimiz mekânları, geliştirme aşamasındaki bir projenin konsept tasarımlarıyla keşfedin.',
    },
  },

  intro: {
    label: {
      en: 'Vision',
      it: 'Visione',
      tr: 'Vizyon', // TR: needs native review
    },
    title: {
      en: 'What We’re Creating',
      it: 'Cosa stiamo creando',
      tr: 'Neler Tasarlıyoruz?',
    },
    lead: {
      en: 'A place to stay, taste, gather and find your own rhythm.',
      it: 'Un luogo per soggiornare, assaporare, ritrovarsi e trovare il proprio ritmo.',
      tr: 'Konaklamak, tatmak, bir araya gelmek ve kendi ritmini bulmak için bir yer.',
    },
    text: {
      en: [
        'In the landscape of Sambuca di Sicilia, we’re developing Zabut as a collection of intimate places: timber lodges with private gardens, shared tables, quiet corners and spaces for celebration.',
        'Natural materials, local culture and the character of the land guide our designs. Explore the spaces we’re imagining—and the experiences we hope to bring to life.',
      ],
      it: [
        'Nel paesaggio di Sambuca di Sicilia stiamo sviluppando Zabut come un insieme di luoghi intimi: lodge in legno con giardini privati, tavole condivise, angoli tranquilli e spazi per festeggiare.',
        'Materiali naturali, cultura locale e carattere del territorio guidano i nostri progetti. Scopri gli spazi che immaginiamo e le esperienze che speriamo di far nascere.',
      ],
      tr: [
        'Sambuca di Sicilia’nın manzarası içinde Zabut’u; özel bahçeli ahşap lodge’lar, paylaşılan sofralar, sakin köşeler ve kutlama alanlarından oluşan samimi bir yaşam alanı olarak geliştiriyoruz.',
        'Doğal malzemeler, yerel kültür ve arazinin karakteri tasarımlarımıza yön veriyor. Hayal ettiğimiz mekânları ve hayata geçirmek istediğimiz deneyimleri keşfedin.',
      ],
    },
    note: {
      en: 'Zabut is a project in development. These renders illustrate our design intentions. Layouts, facilities and capacities remain subject to technical assessments, permissions and final design.',
      it: 'Zabut è un progetto in fase di sviluppo. Questi render illustrano le nostre intenzioni progettuali. Disposizione, servizi e capacità restano soggetti a valutazioni tecniche, autorizzazioni e progetto definitivo.',
      tr: 'Zabut, geliştirme aşamasında bir projedir. Bu görselleştirmeler tasarım yaklaşımımızı yansıtır. Yerleşimler, olanaklar ve kapasiteler; teknik değerlendirmelere, izinlere ve nihai tasarıma bağlı olarak değişebilir.',
    },
    hero: {
      src: `${V}/01-site-aerial.jpg`,
      width: 1671,
      height: 941,
      concept: true,
      alt: {
        en: 'Aerial concept render of Zabut on the hillside: timber lodges, the farmhouse and the ceremony area, with the lake and the sea beyond',
        it: 'Render concettuale aereo di Zabut sulla collina: lodge in legno, il casale e l’area per le cerimonie, con il lago e il mare sullo sfondo',
        tr: 'Zabut’un yamaçtaki havadan konsept görseli: ahşap lodge’lar, çiftlik evi ve tören alanı; arkada göl ve deniz', // TR: needs native review
      },
    },
    images: [
      {
        src: `${V}/02-site-layout.jpg`,
        width: 1536,
        height: 1024,
        concept: true,
        alt: {
          en: 'Concept render of the site layout from above: lodges along the path, the farmhouse, private pools and the ceremony area',
          it: 'Render concettuale della disposizione vista dall’alto: i lodge lungo il sentiero, il casale, le piscine private e l’area per le cerimonie',
          tr: 'Yukarıdan arazi yerleşiminin konsept görseli: yol boyunca lodge’lar, çiftlik evi, özel havuzlar ve tören alanı', // TR: needs native review
        },
        caption: {
          en: 'Site layout',
          it: 'Disposizione del sito',
          tr: 'Arazi yerleşimi', // TR: needs native review
        },
      },
    ],
  },

  sections: [
    // ---------------------------------------------------------------- Soglia
    {
      id: 'soglia',
      title: { en: 'Soglia', it: 'Soglia', tr: 'Soglia' },
      kicker: {
        en: 'The threshold · Reception & Lounge',
        it: 'La soglia · Reception e lounge',
        tr: 'Eşik · Resepsiyon ve Lounge',
      },
      lead: {
        en: 'Every arrival begins with a change of pace.',
        it: 'Ogni arrivo comincia con un cambio di ritmo.',
        tr: 'Her varış, ritmin değişmesiyle başlar.',
      },
      text: {
        en: [
          'Meaning “threshold” in Italian, Soglia is the entrance to Zabut’s rhythm. Our reception building brings together a welcoming lobby, a library lounge, a café and bar, and a veranda for slow mornings and unhurried conversations.',
          'Existing stone walls, timber ceilings and soft lighting shape the atmosphere, with comfortable seating and books inviting you to settle in.',
        ],
        it: [
          'Soglia è l’ingresso nel ritmo di Zabut. Il nostro edificio di accoglienza riunisce una lobby accogliente, una lounge con biblioteca, un caffè e bar e una veranda per mattine lente e conversazioni senza fretta.',
          'I muri in pietra esistenti, i soffitti in legno e le luci soffuse creano l’atmosfera, mentre sedute comode e libri ti invitano a fermarti.',
        ],
        tr: [
          'İtalyancada “eşik” anlamına gelen Soglia, Zabut’un ritmine açılan girişimiz. Resepsiyon binamız; karşılayıcı bir lobi, kütüphaneli lounge, kafe ve bar ile sakin sabahlar ve uzun sohbetler için bir verandayı bir araya getiriyor.',
          'Mevcut taş duvarlar, ahşap tavanlar ve yumuşak aydınlatma mekânın atmosferini oluştururken rahat oturma alanları ve kitaplar sizi yerleşmeye davet ediyor.',
        ],
      },
      list: {
        title: { en: 'Planned spaces', it: 'Spazi previsti', tr: 'Planlanan alanlar' },
        items: {
          en: [
            'Reception and welcoming lobby',
            'A quiet lounge with a library wall',
            'Café and bar',
            'Veranda seating',
            'Our restaurant, bringing two culinary cultures to one table',
          ],
          it: [
            'Reception e lobby di accoglienza',
            'Una lounge tranquilla con una parete-biblioteca',
            'Caffè e bar',
            'Sedute in veranda',
            'Il nostro ristorante, che porta due culture culinarie alla stessa tavola',
          ],
          tr: [
            'Resepsiyon ve karşılama lobisi',
            'Kütüphane duvarıyla sakin bir lounge',
            'Kafe ve bar',
            'Veranda oturma alanı',
            'İki mutfak kültürünü aynı sofrada buluşturan restoranımız',
          ],
        },
      },
      images: [
        {
          src: `${V}/03-soglia-cover.jpg`,
          width: 1774,
          height: 887,
          concept: true,
          alt: {
            en: 'Concept render of Soglia: the stone farmhouse with a tiled roof and lounge seating under the pergola',
            it: 'Render concettuale di Soglia: il casale in pietra con il tetto in coppi e i salotti sotto il pergolato',
            tr: 'Soglia’nın konsept görseli: kiremit çatılı taş çiftlik evi ve pergola altındaki oturma alanı', // TR: needs native review
          },
        },
        {
          src: `${V}/04-soglia-lobby.jpg`,
          width: 1536,
          height: 1024,
          concept: true,
          alt: {
            en: 'Concept render of the Soglia lobby: a stone reception desk, a library wall and the lounge beyond',
            it: 'Render concettuale della lobby di Soglia: il banco della reception, la parete-biblioteca e la lounge sullo sfondo',
            tr: 'Soglia lobisinin konsept görseli: taş resepsiyon bankosu, kütüphane duvarı ve arkada lounge', // TR: needs native review
          },
          caption: {
            en: 'Reception and library lounge',
            it: 'Reception e lounge con biblioteca',
            tr: 'Resepsiyon ve kütüphaneli lounge', // TR: needs native review
          },
        },
      ],
    },

    // ---------------------------------------------------------------- Lodges
    {
      id: 'lodges',
      title: { en: 'Our Lodges', it: 'I nostri lodge', tr: 'Lodge’larımız' },
      lead: {
        en: 'Twelve places to make yourself at home.',
        it: 'Dodici luoghi in cui sentirsi a casa.',
        tr: 'Kendinizi evinizde hissedebileceğiniz on iki yer.',
      },
      text: {
        en: [
          'We’re planning six 21 m² lodges and six 42 m² lodges, with timber-shingle façades, green roofs and garden spaces. Warm interiors and natural textures connect each stay to its surroundings.',
        ],
        it: [
          'Prevediamo sei lodge da 21 m² e sei da 42 m², con facciate in scandole di legno, tetti verdi e giardini. Interni caldi e texture naturali legano ogni soggiorno a ciò che lo circonda.',
        ],
        tr: [
          'Ahşap şingle cepheleri, yeşil çatıları ve bahçe alanlarıyla altı adet 21 m² ve altı adet 42 m² lodge planlıyoruz. Sıcak iç mekânlar ve doğal dokular, her konaklamayı çevresindeki doğayla buluşturuyor.',
        ],
      },
      images: [],
      blocks: [
        {
          id: 'nido',
          title: { en: 'Nido', it: 'Nido', tr: 'Nido' },
          kicker: {
            en: 'The nest · 21 m² · Two guests',
            it: 'Il nido · 21 m² · Due ospiti',
            tr: 'Yuva · 21 m² · İki kişi',
          },
          text: {
            en: [
              'A small, sheltered retreat for two. Nido is designed for slow mornings, quiet evenings and time together, with a private garden extending life outdoors.',
            ],
            it: [
              'Un piccolo rifugio riparato per due. Nido è pensato per mattine lente, serate tranquille e tempo da trascorrere insieme, con un giardino privato che porta la vita all’aperto.',
            ],
            tr: [
              'İki kişi için küçük, korunaklı bir kaçış alanı. Nido; yavaş sabahlar, sessiz akşamlar ve birlikte geçirilen zaman için tasarlandı. Özel bahçesi, yaşamı açık havaya taşıyor.',
            ],
          },
          list: {
            title: { en: 'Planned features', it: 'Dotazioni previste', tr: 'Planlanan özellikler' },
            items: {
              en: [
                'Accommodation for two',
                'Private bathroom with a shower and bathtub',
                'Wardrobe',
                'Minibar and coffee machine',
                'Garden with a veranda and outdoor seating',
                'Sun loungers and a parasol',
              ],
              it: [
                'Alloggio per due persone',
                'Bagno privato con doccia e vasca',
                'Armadio',
                'Minibar e macchina del caffè',
                'Giardino con veranda e sedute all’aperto',
                'Lettini e ombrellone',
              ],
              tr: [
                'İki kişilik konaklama',
                'Duş ve küvet içeren özel banyo',
                'Gardırop',
                'Minibar ve kahve makinesi',
                'Veranda ve açık hava oturma alanı bulunan bahçe',
                'Şezlonglar ve şemsiye',
              ],
            },
          },
          images: [
            {
              src: `${V}/05-nido-garden.jpg`,
              width: 1600,
              height: 900,
              concept: true,
              alt: {
                en: 'Concept render of a Nido lodge with a timber-shingle façade, green roof and private garden with sun loungers',
                it: 'Render concettuale di un lodge Nido con facciata in scandole di legno, tetto verde e giardino privato con lettini',
                tr: 'Ahşap şingle cepheli, yeşil çatılı ve şezlonglu özel bahçesiyle bir Nido lodge’unun konsept görseli', // TR: needs native review
              },
            },
            {
              src: `${V}/06-nido-veranda.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Nido veranda with a small table for two',
                it: 'Render concettuale della veranda di Nido con un tavolino per due',
                tr: 'İki kişilik küçük masasıyla Nido verandasının konsept görseli', // TR: needs native review
              },
              caption: { en: 'Veranda', it: 'Veranda', tr: 'Veranda' },
            },
            {
              src: `${V}/07-nido-living.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Nido living area with stairs up to the sleeping loft',
                it: 'Render concettuale della zona giorno di Nido con la scala verso il soppalco',
                tr: 'Yatak katına çıkan merdiveniyle Nido oturma alanının konsept görseli', // TR: needs native review
              },
              caption: { en: 'Living area', it: 'Zona giorno', tr: 'Oturma alanı' }, // TR: needs native review
            },
            {
              src: `${V}/08-nido-loft-living.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Nido sleeping loft above the living area, with the stairs, sofa and coffee corner',
                it: 'Render concettuale del soppalco di Nido sopra la zona giorno, con la scala, il divano e l’angolo caffè',
                tr: 'Nido’nun oturma alanının üzerindeki asma kat yatağı; merdiven, kanepe ve kahve köşesiyle konsept görsel', // TR: needs native review
              },
              caption: {
                en: 'Sleeping loft above the living area',
                it: 'Il soppalco sopra la zona giorno',
                tr: 'Oturma alanının üzerindeki asma kat', // TR: needs native review
              },
            },
            {
              src: `${V}/09-nido-wardrobe-coffee.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Nido wardrobe, minibar and coffee corner',
                it: 'Render concettuale dell’armadio, del minibar e dell’angolo caffè di Nido',
                tr: 'Nido’nun gardırop, minibar ve kahve köşesinin konsept görseli', // TR: needs native review
              },
              caption: {
                en: 'Wardrobe, minibar and coffee machine',
                it: 'Armadio, minibar e macchina del caffè',
                tr: 'Gardırop, minibar ve kahve makinesi', // TR: needs native review
              },
            },
            {
              src: `${V}/10-nido-bathroom.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Nido bathroom with a bathtub and a shower',
                it: 'Render concettuale del bagno di Nido con vasca e doccia',
                tr: 'Küvet ve duşlu Nido banyosunun konsept görseli', // TR: needs native review
              },
              caption: {
                en: 'Bathroom with a shower and bathtub',
                it: 'Bagno con doccia e vasca',
                tr: 'Duş ve küvetli banyo', // TR: needs native review
              },
            },
          ],
        },
        {
          id: 'nido-jacuzzi',
          title: { en: 'Nido con Jacuzzi', it: 'Nido con Jacuzzi', tr: 'Nido con Jacuzzi' },
          lead: {
            en: 'The nest, with a little extra room to unwind.',
            it: 'Il nido, con un po’ di spazio in più per rilassarsi.',
            tr: 'Dinlenmeye biraz daha alan açan bir yuva.',
          },
          text: {
            en: [
              'All the comforts of Nido, with a private outdoor Jacuzzi and a small garden bar area for evenings under the Sicilian sky.',
            ],
            it: [
              'Tutti i comfort di Nido, con una Jacuzzi privata all’aperto e un piccolo angolo bar in giardino per le serate sotto il cielo siciliano.',
            ],
            tr: [
              'Nido’nun tüm olanaklarına ek olarak, Sicilya gökyüzünün altında geçirilecek akşamlar için özel açık hava jakuzisi ve küçük bir bahçe barı.',
            ],
          },
          list: {
            title: { en: 'Additional features', it: 'Dotazioni aggiuntive', tr: 'Ek özellikler' },
            items: {
              en: ['Private outdoor Jacuzzi', 'Garden bar area'],
              it: ['Jacuzzi privata all’aperto', 'Angolo bar in giardino'],
              tr: ['Özel açık hava jakuzisi', 'Bahçe bar alanı'],
            },
          },
          images: [
            {
              src: `${V}/11-nido-jacuzzi-garden.jpg`,
              width: 1536,
              height: 1024,
              concept: true,
              alt: {
                en: 'Concept render of Nido con Jacuzzi: a garden with a private outdoor Jacuzzi and a garden bar',
                it: 'Render concettuale di Nido con Jacuzzi: giardino con Jacuzzi privata all’aperto e angolo bar',
                tr: 'Nido con Jacuzzi’nin konsept görseli: özel açık hava jakuzisi ve bahçe barı olan bahçe', // TR: needs native review
              },
            },
          ],
        },
        {
          id: 'dimora',
          title: { en: 'Dimora', it: 'Dimora', tr: 'Dimora' },
          kicker: {
            en: 'A place to call home · 42 m² · Up to five guests',
            it: 'Un luogo da chiamare casa · 42 m² · Fino a cinque ospiti',
            tr: 'Ev diyebileceğiniz bir yer · 42 m² · Beş kişiye kadar',
          },
          text: {
            en: [
              'Dimora makes room for family and friends. Three bedrooms accommodate two, two and one guest, balancing shared time with space to retreat.',
              'A kitchenette supports easy mornings, while the garden becomes a place to gather, cook and relax.',
            ],
            it: [
              'Dimora fa spazio a famiglia e amici. Tre camere da letto, per due, due e un ospite, bilanciano il tempo condiviso con lo spazio per stare per conto proprio.',
              'Un angolo cottura rende semplici le mattine, mentre il giardino diventa il luogo in cui ritrovarsi, cucinare e rilassarsi.',
            ],
            tr: [
              'Dimora, aileye ve arkadaşlara yer açıyor. İki, iki ve bir kişilik kapasiteye sahip üç yatak odası, birlikte geçirilen zamanla kişisel alan arasında denge kuruyor.',
              'Mini mutfak sabahları kolaylaştırırken bahçe; buluşmak, yemek hazırlamak ve dinlenmek için ortak bir alana dönüşüyor.',
            ],
          },
          list: {
            title: { en: 'Planned features', it: 'Dotazioni previste', tr: 'Planlanan özellikler' },
            items: {
              en: [
                'Three bedrooms, accommodating up to five guests',
                'Kitchenette with a microwave and coffee machine',
                'Private bathroom with a spacious shower',
                'Private garden with outdoor seating',
                'Parasol and barbecue',
              ],
              it: [
                'Tre camere da letto, fino a cinque ospiti',
                'Angolo cottura con microonde e macchina del caffè',
                'Bagno privato con un’ampia doccia',
                'Giardino privato con sedute all’aperto',
                'Ombrellone e barbecue',
              ],
              tr: [
                'Toplam beş kişiye kadar konaklama sunan üç yatak odası',
                'Mikrodalga ve kahve makinesi bulunan mini mutfak',
                'Geniş duş alanına sahip özel banyo',
                'Açık hava oturma grubu bulunan özel bahçe',
                'Şemsiye ve barbekü',
              ],
            },
          },
          images: [
            {
              src: `${V}/12-dimora-living.jpg`,
              width: 1622,
              height: 970,
              concept: true,
              alt: {
                en: 'Concept render of the Dimora living room opening onto the veranda and garden',
                it: 'Render concettuale del soggiorno di Dimora aperto sulla veranda e sul giardino',
                tr: 'Verandaya ve bahçeye açılan Dimora oturma odasının konsept görseli', // TR: needs native review
              },
            },
            {
              src: `${V}/13-dimora-living-kitchenette.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Dimora living area and kitchenette',
                it: 'Render concettuale della zona giorno e dell’angolo cottura di Dimora',
                tr: 'Dimora’nın oturma alanı ve mini mutfağının konsept görseli', // TR: needs native review
              },
              caption: {
                en: 'Living area and kitchenette',
                it: 'Zona giorno e angolo cottura',
                tr: 'Oturma alanı ve mini mutfak', // TR: needs native review
              },
            },
            {
              src: `${V}/14-dimora-kitchenette.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of the Dimora kitchenette with a microwave',
                it: 'Render concettuale dell’angolo cottura di Dimora con microonde',
                tr: 'Mikrodalgalı Dimora mini mutfağının konsept görseli', // TR: needs native review
              },
              caption: { en: 'Kitchenette', it: 'Angolo cottura', tr: 'Mini mutfak' },
            },
            {
              src: `${V}/15-dimora-bedroom-1.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of one of the three Dimora bedrooms',
                it: 'Render concettuale di una delle tre camere di Dimora',
                tr: 'Dimora’nın üç yatak odasından birinin konsept görseli', // TR: needs native review
              },
              caption: { en: 'Bedroom', it: 'Camera da letto', tr: 'Yatak odası' }, // TR: needs native review
            },
            {
              src: `${V}/16-dimora-bedroom-2.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of one of the three Dimora bedrooms',
                it: 'Render concettuale di una delle tre camere di Dimora',
                tr: 'Dimora’nın üç yatak odasından birinin konsept görseli', // TR: needs native review
              },
              caption: { en: 'Bedroom', it: 'Camera da letto', tr: 'Yatak odası' }, // TR: needs native review
            },
            {
              src: `${V}/17-dimora-bedroom-3.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of one of the three Dimora bedrooms',
                it: 'Render concettuale di una delle tre camere di Dimora',
                tr: 'Dimora’nın üç yatak odasından birinin konsept görseli', // TR: needs native review
              },
              caption: { en: 'Bedroom', it: 'Camera da letto', tr: 'Yatak odası' }, // TR: needs native review
            },
            {
              src: `${V}/18-dimora-bathroom.jpg`,
              width: 1536,
              height: 1024,
              concept: true,
              alt: {
                en: 'Concept render of the Dimora bathroom with a spacious walk-in shower',
                it: 'Render concettuale del bagno di Dimora con un’ampia doccia',
                tr: 'Geniş duşlu Dimora banyosunun konsept görseli', // TR: needs native review
              },
              caption: {
                en: 'Bathroom with a spacious shower',
                it: 'Bagno con ampia doccia',
                tr: 'Geniş duşlu banyo', // TR: needs native review
              },
            },
          ],
        },
        {
          id: 'dimora-piscina',
          title: { en: 'Dimora con Piscina Privata', it: 'Dimora con Piscina Privata', tr: 'Dimora con Piscina Privata' },
          lead: {
            en: 'A shared stay, with your own private pool.',
            it: 'Un soggiorno condiviso, con la tua piscina privata.',
            tr: 'Birlikte geçirilen zamana eşlik eden özel bir havuz.',
          },
          text: {
            en: [
              'All the features of Dimora, with a private 3 × 6 m pool and a garden bar area. A place for leisurely afternoons and evenings together.',
            ],
            it: [
              'Tutte le dotazioni di Dimora, con una piscina privata di 3 × 6 m e un angolo bar in giardino. Un luogo per lunghi pomeriggi e serate insieme.',
            ],
            tr: [
              'Dimora’nın tüm özelliklerine ek olarak, özel 3 × 6 m havuz ve bahçe bar alanı. Uzun öğleden sonraları ve birlikte geçirilen akşamlar için bir yer.',
            ],
          },
          list: {
            title: { en: 'Additional features', it: 'Dotazioni aggiuntive', tr: 'Ek özellikler' },
            items: {
              en: ['Private 3 × 6 m swimming pool', 'Garden bar area'],
              it: ['Piscina privata di 3 × 6 m', 'Angolo bar in giardino'],
              tr: ['Özel 3 × 6 m yüzme havuzu', 'Bahçe bar alanı'],
            },
          },
          images: [
            {
              src: `${V}/19-dimora-pool-garden.jpg`,
              width: 1672,
              height: 941,
              concept: true,
              alt: {
                en: 'Concept render of Dimora con Piscina Privata: a private pool, garden bar, barbecue and outdoor seating',
                it: 'Render concettuale di Dimora con Piscina Privata: piscina privata, angolo bar, barbecue e sedute all’aperto',
                tr: 'Dimora con Piscina Privata’nın konsept görseli: özel havuz, bahçe barı, barbekü ve açık hava oturma alanı', // TR: needs native review
              },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Restaurant
    {
      id: 'two-kitchens',
      title: { en: 'Two Kitchens, One Story', it: 'Due cucine, una storia', tr: 'İki Mutfak, Bir Hikâye' },
      kicker: { en: 'Zabut × Sicilia', it: 'Zabut × Sicilia', tr: 'Zabut × Sicilia' },
      text: {
        en: [
          'Our restaurant brings Arab-inspired flavours into conversation with Sicilian culinary traditions, reflecting the cultural connections that shape our concept.',
          'Two distinct atmospheres share one open space. The Zabut side feels intimate and warmly lit, with deeper colours and textured materials. The Sicilian side is lighter, with natural tones and a garden-inspired atmosphere.',
          'Between them, The Bridge Table brings the two together: a long communal table for shared tasting menus, stories behind the ingredients and meals that unfold at their own pace.',
          'Stone walls and timber ceilings connect the room, while furniture, materials and lighting give each area its character.',
        ],
        it: [
          'Il nostro ristorante mette in dialogo sapori di ispirazione araba e tradizioni culinarie siciliane, riflettendo i legami culturali che danno forma al nostro concept.',
          'Due atmosfere distinte condividono un unico spazio aperto. Il lato Zabut è intimo e illuminato da una luce calda, con colori più profondi e superfici materiche. Il lato siciliano è più luminoso, con toni naturali e un’atmosfera ispirata al giardino.',
          'Tra i due, The Bridge Table li riunisce: una lunga tavola conviviale per menu degustazione condivisi, le storie dietro gli ingredienti e pasti che seguono il loro ritmo.',
          'Muri in pietra e soffitti in legno uniscono la sala, mentre arredi, materiali e luci danno carattere a ciascuna area.',
        ],
        tr: [
          'Restoranımız, konseptimize yön veren kültürel bağlardan ilham alarak Arap mutfağından esinlenen lezzetleri Sicilya’nın mutfak gelenekleriyle buluşturuyor.',
          'İki farklı atmosfer, tek bir açık mekânı paylaşıyor. Zabut bölümü, koyu renkleri, dokulu malzemeleri ve sıcak aydınlatmasıyla daha samimi bir his sunuyor. Sicilya bölümü ise doğal tonları ve bahçeden ilham alan atmosferiyle daha aydınlık bir karakter taşıyor.',
          'Aralarında yer alan The Bridge Table — Köprü Sofrası, bu iki dünyayı bir araya getiriyor: paylaşılan tadım menüleri, malzemelerin ardındaki hikâyeler ve kendi ritminde uzayan yemekler için uzun bir ortak sofra.',
          'Taş duvarlar ve ahşap tavanlar mekânı bütünleştirirken mobilyalar, malzemeler ve aydınlatma her bölüme kendi karakterini kazandırıyor.',
        ],
      },
      images: [
        {
          src: `${V}/20-restaurant-interior.jpg`,
          width: 1672,
          height: 941,
          concept: true,
          alt: {
            en: 'Concept render of the restaurant: stone walls, a timber ceiling and The Bridge Table running through the room',
            it: 'Render concettuale del ristorante: muri in pietra, soffitto in legno e The Bridge Table al centro della sala',
            tr: 'Restoranın konsept görseli: taş duvarlar, ahşap tavan ve salonun ortasında uzanan Köprü Sofrası', // TR: needs native review
          },
          caption: { en: 'The Bridge Table', it: 'The Bridge Table', tr: 'Köprü Sofrası' },
        },
      ],
    },

    // ---------------------------------------------------------------- Promessa
    {
      id: 'promessa',
      title: { en: 'Promessa', it: 'Promessa', tr: 'Promessa' },
      kicker: {
        en: 'The promise · Weddings & Celebrations',
        it: 'La promessa · Matrimoni e celebrazioni',
        tr: 'Söz · Düğünler ve Kutlamalar',
      },
      lead: {
        en: 'A place to make a promise, surrounded by the people who matter.',
        it: 'Un luogo in cui fare una promessa, circondati dalle persone che contano.',
        tr: 'Sizin için önemli olan insanlarla çevriliyken birbirinize söz vereceğiniz bir yer.',
      },
      text: {
        en: [
          'Promessa is our planned outdoor ceremony and event space for up to 200 guests. The design allows the landscape to remain the backdrop, with natural materials and an open setting for weddings and shared celebrations.',
          'From the first welcome to the evening gathering, we’re imagining occasions that feel personal and rooted in Sicily.',
        ],
        it: [
          'Promessa è lo spazio all’aperto che prevediamo per cerimonie ed eventi, fino a 200 ospiti. Il progetto lascia al paesaggio il ruolo di sfondo, con materiali naturali e un ambiente aperto per matrimoni e celebrazioni condivise.',
          'Dal primo benvenuto alla festa della sera, immaginiamo occasioni personali e radicate in Sicilia.',
        ],
        tr: [
          'Promessa, 200 kişiye kadar kapasiteyle planladığımız açık hava seramoni ve etkinlik alanımız. Doğal malzemeler ve açık yerleşim, düğünlere ve ortak kutlamalara yer açarken manzaranın arka planda varlığını korumasını sağlıyor.',
          'İlk karşılamadan akşam buluşmasına kadar, kişisel hissettiren ve Sicilya’yla bağ kuran kutlamalar hayal ediyoruz.',
        ],
      },
      images: [
        {
          src: `${V}/22-promessa-aerial.jpg`,
          width: 1672,
          height: 941,
          concept: true,
          alt: {
            en: 'Aerial concept render of Promessa, the outdoor ceremony space set among olive trees',
            it: 'Render concettuale aereo di Promessa, lo spazio per le cerimonie all’aperto tra gli ulivi',
            tr: 'Zeytin ağaçları arasındaki açık hava tören alanı Promessa’nın havadan konsept görseli', // TR: needs native review
          },
        },
        {
          src: '/images/exp-weddings.webp',
          width: 840,
          height: 630,
          concept: true,
          // alt text as used elsewhere on the site
          alt: {
            en: 'Concept visual of a wedding ceremony overlooking the lake and the sea',
            it: 'Immagine concettuale di una cerimonia nuziale affacciata sul lago e sul mare',
            tr: 'Göle ve denize bakan bir düğün töreninin konsept görseli',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- Respiro & Radici
    {
      id: 'respiro-radici',
      title: { en: 'Respiro & Radici', it: 'Respiro e Radici', tr: 'Respiro ve Radici' },
      lead: {
        en: 'Two settings for slowing down and reconnecting.',
        it: 'Due luoghi per rallentare e ritrovare il contatto.',
        tr: 'Yavaşlamak ve yeniden bağ kurmak için iki farklı ortam.',
      },
      text: {
        en: [
          'Our two shared activity spaces offer different relationships with the landscape: one sheltered among the trees, the other opening towards mountain views.',
        ],
        it: [
          'I nostri due spazi comuni per le attività offrono rapporti diversi con il paesaggio: uno riparato tra gli alberi, l’altro aperto verso le montagne.',
        ],
        tr: [
          'İki ortak aktivite alanımız, doğayla farklı ilişkiler kuruyor: biri ağaçların arasında korunaklı bir ortam sunarken diğeri dağ manzarasına açılıyor.',
        ],
      },
      images: [],
      blocks: [
        {
          id: 'respiro',
          title: { en: 'Respiro', it: 'Respiro', tr: 'Respiro' },
          kicker: { en: 'The breath', it: 'Il respiro', tr: 'Nefes' },
          text: {
            en: [
              'A space for yoga, breathwork, meditation and quiet morning gatherings. Simple, open and designed to leave room for stillness.',
            ],
            it: [
              'Uno spazio per yoga, respirazione, meditazione e tranquilli incontri mattutini. Semplice, aperto e pensato per lasciare spazio alla quiete.',
            ],
            tr: [
              'Yoga, nefes çalışmaları, meditasyon ve sakin sabah buluşmaları için bir alan. Sade, açık ve dinginliğe yer bırakacak şekilde tasarlandı.',
            ],
          },
          images: [
            {
              src: '/images/exp-retreats.webp',
              width: 840,
              height: 630,
              concept: true,
              alt: {
                en: 'Concept visual of a yoga session among the guest houses',
                it: 'Immagine concettuale di una sessione di yoga tra le case',
                tr: 'Misafir evlerinin arasında bir yoga seansının konsept görseli',
              },
            },
          ],
        },
        {
          id: 'radici',
          title: { en: 'Radici', it: 'Radici', tr: 'Radici' },
          kicker: { en: 'The roots', it: 'Le radici', tr: 'Kökler' },
          text: {
            en: [
              'A space for making, learning and spending time with nature. Painting, ceramics and shared workshops connect creative practice with the materials, people and stories around us.',
            ],
            it: [
              'Uno spazio per creare, imparare e passare tempo nella natura. Pittura, ceramica e laboratori condivisi legano la pratica creativa ai materiali, alle persone e alle storie che ci circondano.',
            ],
            tr: [
              'Üretmek, öğrenmek ve doğayla zaman geçirmek için bir alan. Resim, seramik ve ortak atölyeler; yaratıcı çalışmaları çevremizdeki malzemeler, insanlar ve hikâyelerle buluşturuyor.',
            ],
          },
          images: [
            {
              src: '/images/exp-workshops.webp',
              width: 840,
              height: 630,
              concept: true,
              alt: {
                en: 'Concept visual of cooking with local produce',
                it: 'Immagine concettuale di cucina con prodotti locali',
                tr: 'Yerel ürünlerle yemek yapımının konsept görseli',
              },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Experiences
    {
      id: 'experiences',
      title: {
        en: 'Experiences We’re Planning',
        it: 'Le esperienze che stiamo progettando',
        tr: 'Planladığımız Deneyimler',
      },
      lead: {
        en: 'Come for a stay. Make time for something new.',
        it: 'Vieni per soggiornare. Prenditi tempo per qualcosa di nuovo.',
        tr: 'Konaklamak için gelin. Yeni bir şey için zaman ayırın.',
      },
      text: {
        en: [
          'Our planned programme brings food, creativity and the landscape into small-group experiences, developed with local producers, chefs and facilitators.',
        ],
        it: [
          'Il programma che prevediamo unisce cucina, creatività e paesaggio in esperienze per piccoli gruppi, sviluppate con produttori locali, chef e facilitatori.',
        ],
        tr: [
          'Planladığımız program; yerel üreticiler, şefler ve eğitmenlerle birlikte geliştirilen küçük grup deneyimlerinde gastronomiyi, yaratıcılığı ve doğayı bir araya getiriyor.',
        ],
      },
      table: {
        headings: {
          en: ['Experience', 'What we’re imagining', 'Planned format'],
          it: ['Esperienza', 'Cosa immaginiamo', 'Formato previsto'],
          tr: ['Deneyim', 'Hayal ettiğimiz içerik', 'Planlanan format'],
        },
        rows: [
          {
            title: { en: 'The Chef’s Table', it: 'La tavola dello chef', tr: 'Şefin Sofrası' },
            text: {
              en: 'A hosted tasting menu exploring seasonal ingredients and the stories behind each dish.',
              it: 'Un menu degustazione guidato che esplora gli ingredienti di stagione e le storie dietro ogni piatto.',
              tr: 'Mevsimsel malzemeleri ve her yemeğin ardındaki hikâyeyi keşfeden, şefin ev sahipliğinde bir tadım menüsü.',
            },
            format: {
              en: 'A single-day experience or a two-day programme.',
              it: 'Un’esperienza di un giorno o un programma di due giorni.',
              tr: 'Tek günlük deneyim veya iki günlük program.',
            },
          },
          {
            title: { en: 'Retreat Stays', it: 'Soggiorni di ritiro', tr: 'Retreat Konaklamaları' },
            text: {
              en: 'Time for gentle movement, rest and shared activities in our outdoor spaces.',
              it: 'Tempo per movimento dolce, riposo e attività condivise nei nostri spazi all’aperto.',
              tr: 'Açık hava alanlarımızda hafif hareket, dinlenme ve ortak aktivitelere ayrılan zaman.',
            },
            format: {
              en: 'Programme and duration to be announced.',
              it: 'Programma e durata da annunciare.',
              tr: 'Program ve süre duyurulacak.',
            },
          },
          {
            title: { en: 'Art & Nature Gatherings', it: 'Incontri di arte e natura', tr: 'Sanat ve Doğa Buluşmaları' },
            text: {
              en: 'Creative workshops and outdoor encounters inspired by the surrounding landscape.',
              it: 'Laboratori creativi e incontri all’aperto ispirati al paesaggio circostante.',
              tr: 'Çevredeki manzaradan ilham alan yaratıcı atölyeler ve açık hava buluşmaları.',
            },
            format: {
              en: 'Selected daytime and seasonal events.',
              it: 'Eventi diurni e stagionali selezionati.',
              tr: 'Belirli günlerde ve mevsimlerde düzenlenen etkinlikler.',
            },
          },
          {
            title: { en: 'Painting the Landscape', it: 'Dipingere il paesaggio', tr: 'Doğayı Resmetmek' },
            text: {
              en: 'Time outdoors observing and painting Sicily’s colours, light and contours.',
              it: 'Tempo all’aperto per osservare e dipingere i colori, la luce e i profili della Sicilia.',
              tr: 'Sicilya’nın renklerini, ışığını ve arazi çizgilerini gözlemleyip resmetmek için doğada geçirilen zaman.',
            },
            format: {
              en: 'One night, two days · 10 participants.',
              it: 'Una notte, due giorni · 10 partecipanti.',
              tr: 'Bir gece, iki gün · 10 katılımcı.',
            },
          },
          {
            title: { en: 'Art & Wellbeing Retreat', it: 'Ritiro arte e benessere', tr: 'Sanat ve İyi Oluş Kampı' },
            text: {
              en: 'Painting, ceramics and acrylic workshops centred on creative exploration and self-expression.',
              it: 'Laboratori di pittura, ceramica e acrilico dedicati all’esplorazione creativa e all’espressione di sé.',
              tr: 'Yaratıcı keşif ve kendini ifade etmeye odaklanan resim, seramik ve akrilik atölyeleri.',
            },
            format: {
              en: 'Two nights, three days · 10 participants.',
              it: 'Due notti, tre giorni · 10 partecipanti.',
              tr: 'İki gece, üç gün · 10 katılımcı.',
            },
          },
          {
            title: { en: 'Cooking Workshops', it: 'Laboratori di cucina', tr: 'Yemek Atölyeleri' },
            text: {
              en: 'Hands-on cooking, local ingredients and meals enjoyed together.',
              it: 'Cucina pratica, ingredienti locali e pasti condivisi.',
              tr: 'Uygulamalı yemek hazırlığı, yerel malzemeler ve birlikte paylaşılan sofralar.',
            },
            format: {
              en: 'One night, two days · 10 participants.',
              it: 'Una notte, due giorni · 10 partecipanti.',
              tr: 'Bir gece, iki gün · 10 katılımcı.',
            },
          },
          {
            title: { en: 'The Wine Experience', it: 'L’esperienza del vino', tr: 'Şarap Deneyimi' },
            text: {
              en: 'Vineyard visits, guided tastings and conversations with producers, with grape harvesting when season and availability allow.',
              it: 'Visite in vigna, degustazioni guidate e conversazioni con i produttori, con la vendemmia quando stagione e disponibilità lo permettono.',
              tr: 'Bağ ziyaretleri, rehberli tadımlar ve üreticilerle sohbetler; mevsim ve uygunluk elverdiğinde üzüm hasadına katılım.',
            },
            format: {
              en: 'Three days · 10 participants · Two planned editions during the harvest season.',
              it: 'Tre giorni · 10 partecipanti · Due edizioni previste durante la vendemmia.',
              tr: 'Üç gün · 10 katılımcı · Bağ bozumu döneminde planlanan iki program.',
            },
          },
          {
            title: { en: 'From Clay to Table', it: 'Dall’argilla alla tavola', tr: 'Seramikten Sofraya' },
            text: {
              en: 'A ceramics-led experience connecting handmade objects with the ritual of sharing a meal.',
              it: 'Un’esperienza dedicata alla ceramica che lega gli oggetti fatti a mano al rito di condividere un pasto.',
              tr: 'El yapımı objelerle birlikte yemek paylaşma ritüelini buluşturan, seramik odaklı bir deneyim.',
            },
            format: {
              en: 'One night, two days · 10 participants.',
              it: 'Una notte, due giorni · 10 partecipanti.',
              tr: 'Bir gece, iki gün · 10 katılımcı.',
            },
          },
          {
            title: { en: 'Two Kitchens, One Table', it: 'Due cucine, una tavola', tr: 'İki Mutfak, Bir Sofra' },
            text: {
              en: 'An Arab- and Sicilian-inspired menu exploring the ingredients, dishes and stories that connect the two traditions.',
              it: 'Un menu di ispirazione araba e siciliana che esplora gli ingredienti, i piatti e le storie che uniscono le due tradizioni.',
              tr: 'Arap ve Sicilya mutfaklarından esinlenen; iki geleneği birbirine bağlayan malzemeleri, yemekleri ve hikâyeleri keşfeden bir menü.',
            },
            format: {
              en: 'An intimate dining experience · 10 participants.',
              it: 'Un’esperienza gastronomica intima · 10 partecipanti.',
              tr: 'Samimi bir yemek deneyimi · 10 katılımcı.',
            },
          },
        ],
      },
      note: {
        en: 'Dates, prices, hosts and inclusions will be announced as each programme is confirmed.',
        it: 'Date, prezzi, organizzatori e servizi inclusi saranno annunciati man mano che ogni programma verrà confermato.',
        tr: 'Tarihler, fiyatlar, ev sahipleri ve paket içerikleri, her program kesinleştikçe duyurulacak.',
      },
      images: [
        {
          src: '/images/exp-table.webp',
          width: 840,
          height: 560,
          concept: true,
          alt: {
            en: 'Concept visual of dishes served at the table',
            it: 'Immagine concettuale di piatti serviti a tavola',
            tr: 'Sofrada servis edilen yemeklerin konsept görseli',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- Bottega
    {
      id: 'bottega',
      title: { en: 'Bottega delle Radici', it: 'Bottega delle Radici', tr: 'Bottega delle Radici' },
      kicker: { en: 'Local Findings', it: 'Local Findings', tr: 'Local Findings' },
      lead: {
        en: 'Take a story of this place home.',
        it: 'Porta a casa una storia di questo luogo.',
        tr: 'Bu toprakların bir hikâyesini yanınızda götürün.',
      },
      text: {
        en: [
          'Bottega delle Radici means “the shop of roots”: a small space dedicated to local producers and the stories behind what they make.',
          'We’re planning a shop and wine-tasting bar where guests can discover regional wines, food specialities and handmade finds. Meet the flavours during your stay, then take something meaningful home.',
        ],
        it: [
          'Bottega delle Radici è un piccolo spazio dedicato ai produttori locali e alle storie dietro ciò che creano.',
          'Prevediamo una bottega con un bar per la degustazione dei vini, dove gli ospiti potranno scoprire vini del territorio, specialità gastronomiche e oggetti fatti a mano. Conosci questi sapori durante il soggiorno, poi porta a casa qualcosa che abbia un significato.',
        ],
        tr: [
          'Bottega delle Radici, “köklerin dükkânı” anlamına geliyor: yerel üreticilere ve ürettiklerinin ardındaki hikâyelere ayrılmış küçük bir mekân.',
          'Misafirlerimizin bölgesel şarapları, yöresel lezzetleri ve el yapımı ürünleri keşfedebileceği bir dükkân ve şarap tadım barı planlıyoruz. Konaklamanız sırasında bu lezzetlerle tanışın, sonra sizin için anlam taşıyan bir parçayı evinize götürün.',
        ],
      },
      images: [
        {
          src: `${V}/24-bottega-wine-bar.jpg`,
          width: 1536,
          height: 1024,
          concept: true,
          alt: {
            en: 'Concept render of Bottega delle Radici: a wine-tasting bar under a timber canopy, with the Local Findings shop behind and the lake beyond',
            it: 'Render concettuale di Bottega delle Radici: un banco di degustazione vini sotto una copertura in legno, con la bottega Local Findings alle spalle e il lago sullo sfondo',
            tr: 'Bottega delle Radici’nin konsept görseli: ahşap çatı altında şarap tadım barı, arkada Local Findings dükkânı ve uzakta göl', // TR: needs native review
          },
        },
      ],
    },

    // ---------------------------------------------------------------- Walk the Land
    {
      id: 'walk-the-land',
      title: { en: 'Walk the Land', it: 'A piedi nel territorio', tr: 'Arazide Yürü' },
      lead: {
        en: 'Explore at your own pace.',
        it: 'Esplora al tuo ritmo.',
        tr: 'Kendi ritminde keşfet.',
      },
      text: {
        en: [
          'We’re exploring walking routes within the grounds and connections to paths in the surrounding countryside.',
          'From a short morning stroll to a longer walk, these routes will invite guests to spend time with the landscape, notice its details and discover the area on foot.',
        ],
        it: [
          'Stiamo studiando percorsi a piedi all’interno della proprietà e collegamenti con i sentieri della campagna circostante.',
          'Da una breve passeggiata mattutina a una camminata più lunga, questi percorsi inviteranno gli ospiti a passare tempo nel paesaggio, a notarne i dettagli e a scoprire la zona a piedi.',
        ],
        tr: [
          'Arazi içinde yürüyüş rotalarını ve çevredeki kırsal patikalarla bağlantıları değerlendiriyoruz.',
          'Kısa bir sabah gezintisinden daha uzun bir yürüyüşe kadar bu rotalar, misafirleri doğayla zaman geçirmeye, ayrıntılarını fark etmeye ve çevreyi yürüyerek keşfetmeye davet edecek.',
        ],
      },
      note: {
        en: 'Routes will be confirmed following access and safety assessments.',
        it: 'I percorsi saranno confermati dopo le verifiche di accesso e sicurezza.',
        tr: 'Rotalar, erişim ve güvenlik değerlendirmelerinin ardından kesinleştirilecek.',
      },
      images: [
        {
          src: `${V}/23-walk-the-land-aerial.jpg`,
          width: 1672,
          height: 941,
          concept: true,
          alt: {
            en: 'Aerial concept render at sunset: paths winding between the lodges, with the lake and the sea in the distance',
            it: 'Render concettuale aereo al tramonto: sentieri tra i lodge, con il lago e il mare in lontananza',
            tr: 'Gün batımında havadan konsept görseli: lodge’lar arasında kıvrılan yollar, uzakta göl ve deniz', // TR: needs native review
          },
        },
      ],
    },

    // ---------------------------------------------------------------- Journey
    {
      id: 'journey',
      title: { en: 'A Journey Through Zabut', it: 'Un viaggio attraverso Zabut', tr: 'Zabut’ta Bir Yolculuk' },
      lines: {
        en: [
          'Cross the threshold at Soglia.',
          'Rest in Nido, settle into Dimora.',
          'Breathe at Respiro, put down roots at Radici.',
          'Make a promise for the future at Promessa.',
          'Take a story of this land home from Bottega.',
        ],
        it: [
          'Attraversa la soglia a Soglia.',
          'Riposa a Nido, sentiti a casa a Dimora.',
          'Respira a Respiro, metti radici a Radici.',
          'Fai una promessa per il futuro a Promessa.',
          'Porta a casa dalla Bottega una storia di questa terra.',
        ],
        tr: [
          'Soglia’da eşikten geç.',
          'Nido’da dinlen, Dimora’da yerleş.',
          'Respiro’da nefes al, Radici’de kök sal.',
          'Promessa’da geleceğe söz ver.',
          'Bottega’dan bu toprağın bir hikâyesini yanında götür.',
        ],
      },
      lead: {
        en: 'Follow the making of Zabut.',
        it: 'Segui la nascita di Zabut.',
        tr: 'Zabut’un oluşumunu takip edin.',
      },
      text: {
        en: ['We’ll share the sketches, materials, people and decisions as these spaces take shape.'],
        it: ['Condivideremo schizzi, materiali, persone e decisioni man mano che questi spazi prenderanno forma.'],
        tr: ['Bu mekânlar şekillenirken çizimleri, malzemeleri, insanları ve kararları paylaşacağız.'],
      },
      ctas: [
        {
          label: { en: 'Follow the Journey', it: 'Segui il percorso', tr: 'Yolculuğu Takip Et' },
          link: { kind: 'page', page: 'blog' },
          style: 'solid',
        },
        {
          label: { en: 'Explore a Partnership', it: 'Esplora una partnership', tr: 'Ortaklık Olanaklarını Keşfet' },
          link: { kind: 'signup' },
          style: 'outline',
        },
      ],
      images: [],
    },
  ],

  ui: {
    conceptLabel: { en: 'Concept', it: 'Concept', tr: 'Konsept' }, // TR: needs native review
    gallery: {
      group: { en: 'Gallery view', it: 'Vista della galleria', tr: 'Galeri görünümü' }, // TR: needs native review
      slider: { en: 'Slider', it: 'Slider', tr: 'Slayt' }, // TR: needs native review
      tiles: { en: 'Tiles', it: 'Griglia', tr: 'Izgara' }, // TR: needs native review
      previous: { en: 'Previous image', it: 'Immagine precedente', tr: 'Önceki görsel' }, // TR: needs native review
      next: { en: 'Next image', it: 'Immagine successiva', tr: 'Sonraki görsel' }, // TR: needs native review
      viewInSlider: {
        en: 'View image {n} in the slider',
        it: 'Mostra l’immagine {n} nello slider',
        tr: '{n}. görseli slaytta göster', // TR: needs native review
      },
      position: {
        en: 'Image {n} of {total}',
        it: 'Immagine {n} di {total}',
        tr: 'Görsel {n} / {total}', // TR: needs native review
      },
      hint: {
        en: 'Click an image to enlarge',
        it: 'Clicca su un’immagine per ingrandirla',
        tr: 'Büyütmek için bir görsele tıklayın', // TR: needs native review
      },
      hintTouch: {
        en: 'Tap an image to enlarge',
        it: 'Tocca un’immagine per ingrandirla',
        tr: 'Büyütmek için bir görsele dokunun', // TR: needs native review
      },
    },
  },
};
