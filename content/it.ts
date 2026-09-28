import type { SiteContent } from './types';

/** Italian copy. Taken verbatim from reference/it/index.html; do not edit wording here without
 * checking the other languages keep the same shape (enforced by SiteContent). */
export const it: SiteContent = {
  site: {
    meta: {
      siteName: "Zabut the Splendid",
      description: "Un soggiorno più significativo, che prende forma sui monti Sicani, in Sicilia. Aiutaci a dare vita a Zabut.",
      ogLocale: "it_IT",
    },
    header: {
      menuButtonLabel: "Apri il menu",
      languageSwitcherLabel: "Lingua",
    },
    nav: {
      fundraising: "Raccolta fondi",
      story: "Storia",
      experiences: "Esperienze",
      blog: "Blog",
      contact: "Contatti",
    },
    footer: {
      country: "Italia",
      newsletter: {
        title: "Newsletter",
        text: "Pagine del diario e notizie sul progetto, direttamente nella tua casella di posta.",
        linkLabel: "Iscriviti alla lista",
      },
      columns: {
        explore: "Esplora",
        contact: "Contatti",
        follow: "Seguici",
        legal: "Note legali",
      },
      instagramLabel: "Instagram",
      privacyLabel: "Privacy",
      termsLabel: "Termini",
    },
    images: {
      mark: "Marchio Zabut: arco, sole e ramo d'ulivo",
      markHero: "Marchio Zabut",
      homeTerra: "Immagine concettuale delle case in legno di Zabut sulla collina",
      privateEvents: "Immagine concettuale di una cena serale sotto il pergolato",
      weddings: "Immagine concettuale di una cerimonia nuziale affacciata sul lago e sul mare",
      retreats: "Immagine concettuale di una sessione di yoga tra le case",
      workshops: "Immagine concettuale di cucina con prodotti locali",
      table: "Immagine concettuale di piatti serviti a tavola",
      land: "Immagine concettuale di coltivatori e artigiani locali nel paese",
      fundTable: "Immagine concettuale di una lunga tavola sotto un ulivo a Zabut",
      panorama: "Panorama della campagna intorno a Sambuca, con un lago e il mare sullo sfondo",
      storyIllustration: "Immagine concettuale delle case in legno di Zabut tra gli ulivi",
    },
    behaviours: {
      cookiePreferencesPlaceholder: "Il pannello delle preferenze si aprirà qui",
    },
  },
  pages: {
    home: {
      place: {
        country: "Italia",
      },
      hero: {
        primaryCta: "Sostieni la visione",
        secondaryCta: "Iscriviti agli aggiornamenti",
      },
      essence: "Onorare ciò che c'era già.",
      project: {
        label: "Il progetto",
        title: "La prima fase",
        lead: [
          "Stiamo lavorando per assicurarci la proprietà e dare vita alla prima fase di Zabut.",
          "Con un paesaggio curato, gastronomia, benessere e incontri creativi, vogliamo fare di Zabut una meta in cui tornare: per festeggiare, esplorare e prendersi del tempo per sé.",
        ],
        pillars: {
          terra: "Dodici case in legno per gli ospiti, immerse nel paesaggio.",
          persone: "Due esperienze gastronomiche distinte, ispirate alla cucina siciliana e all'eredità araba di Sambuca.",
          storie: "Spazi all'aperto pensati per matrimoni ed eventi privati.",
        },
        caption: "Immagini concettuali",
        cta: "Scopri il budget e come partecipare",
      },
      location: {
        title: "Arroccata sui monti Sicani: abbastanza vicina a tutto, lontana dal rumore.",
      },
    },
    fundraising: {
      label: "Sostieni la visione",
      title: "Aiutaci a dare vita a Zabut.",
      intro: "Zabut the Splendid è un progetto di ospitalità che sta prendendo forma a Sambuca di Sicilia. Immaginiamo un luogo in cui soggiornare, ritrovarsi, festeggiare e rallentare, ispirato al paesaggio siciliano e al patrimonio culturale di Sambuca.",
      figureCaption: "Immagine concettuale",
      budget: {
        title: "Un primo sguardo al budget",
        rows: {
          property: {
            label: "Acquisto della proprietà",
          },
          guestHouses: {
            label: "Dodici case in legno per gli ospiti",
            note: "Stimate in €9.000 ciascuna",
          },
          weddingSetting: {
            label: "Allestimento per matrimoni",
            note: "Pietra naturale, legno e materiali decorativi riutilizzabili",
          },
          entrance: {
            label: "Ingresso e percorsi selezionati",
            note: "Pietra, ghiaia e materiali per il paesaggio",
          },
          restaurants: {
            label: "Due concept di ristorazione",
            note: "Arredi e materiali di finitura interna",
          },
          bathrooms: {
            label: "Ristrutturazione di bagni e servizi",
          },
          digital: {
            label: "Sito web, identità di marca e marketing digitale pre-apertura",
            tip: "La preparazione del lancio digitale comprende progettazione e realizzazione del sito web, dominio e hosting, lancio sui social media e racconto del brand, file vettoriali pronti per la produzione di logo e manuale del brand, e circa 9–12 immagini concettuali realizzate con l'aiuto dell'IA. Queste immagini illustreranno il progetto proposto e saranno indicate come concept finché gli spazi non saranno costruiti.",
          },
          contingency: {
            label: "Imprevisti",
            note: "Margine per costi imprevisti, circa il 16% delle voci precedenti",
          },
          seed: {
            label: "Investimento seed",
            tip: "L'investimento seed copre le voci stimate finora più un margine per imprevisti. Non rappresenta il costo complessivo dell'apertura di Zabut. Aggiorneremo l'obiettivo di finanziamento dopo aver confermato le condizioni di acquisto della proprietà, i requisiti tecnici, il piano di trasporto e i preventivi dei fornitori.",
          },
          transport: {
            label: "Trasporto dei materiali dalla Turchia alla Sicilia",
          },
          company: {
            label: "Costituzione della società italiana e onorari professionali",
          },
          total: {
            label: "Obiettivo di finanziamento complessivo",
          },
        },
        pendingValue: "Preventivo in attesa",
        totalValue: "Da confermare",
        infoButtonLabel: "Maggiori informazioni",
        currency: {
          symbol: "€",
          position: "before",
          groupSeparator: ".",
        },
      },
      deckNote: {
        label: "Pitch deck",
        text: "Il nostro pitch deck sarà disponibile qui nei prossimi giorni. Iscriviti alla lista e te lo invieremo via email non appena sarà pronto.",
        linkLabel: "Iscriviti alla lista",
      },
      support: {
        title: "Cosa può aiutare a creare il tuo sostegno",
        paragraphs: [
          "Un soggiorno plasmato da materiali naturali e dal senso del luogo. Tavole che uniscono ingredienti siciliani e persone. Una cornice per matrimoni e incontri significativi. Uno spazio per riposare, creare, esplorare e ritrovarsi.",
          "Vorremmo parlare con chi crede in questa visione e desidera capire come prenderne parte.",
        ],
      },
      primaryCta: "Parliamo di una partnership",
      secondaryCta: "Segui il percorso",
      closing: "Dai primi passi in poi, racconteremo come prende forma Zabut.",
    },
    story: {
      label: "La nostra storia",
      title: "Un soggiorno più significativo",
      intro: "Alcuni viaggi iniziano trovando il luogo a cui si appartiene.",
      figureCaption: "Immagine concettuale",
      body: {
        opening: [
          "La storia di Zabut è iniziata con un viaggio da Istanbul alla Sicilia. È nata da un architetto che lavora con strutture in legno e progettazione sostenibile. A Sambuca, a quell'architetto è sorta una domanda che riguardava anche la sua stessa vita: è possibile vivere più lentamente, in modo più significativo e con legami più forti con il mondo che ci circonda?",
          "Col tempo, quella domanda è diventata il sogno di un luogo da condividere con gli altri. Un luogo dove accogliere il mattino senza fretta, restare a lungo a tavola e perdere la cognizione del tempo mentre si crea qualcosa con le proprie mani.",
        ],
        sections: [
          {
            title: "Un futuro ispirato dal passato, costruito insieme.",
            paragraphs: [
              "Nel progettare Zabut ci lasciamo guidare dalla memoria culturale di Sambuca e dalla vita quotidiana della Sicilia. Il nostro approccio, dall'architettura alla tavola, nasce dall'incontro tra l'eredità araba e la luce siciliana.",
              "Con questo spirito vogliamo unire materiali naturali, il calore del legno e l'artigianato locale. In ogni scelta progettuale cerchiamo di ascoltare il luogo in cui ci troviamo. Vogliamo anche costruire relazioni durature con i produttori locali, gli artigiani e i nostri vicini.",
            ],
            italicLine: "Per noi, appartenere a un luogo comincia dal partecipare alla sua vita.",
          },
          {
            title: "Soggiornare, assaporare, festeggiare, prendersi del tempo per sé.",
            paragraphs: [
              "Nella Zabut che immaginiamo, un soggiorno tranquillo può trasformarsi in nuove amicizie attorno a una lunga tavola. Nei piatti dei nostri chef, gli ingredienti siciliani incontreranno le storie di altre cucine.",
              "Alcuni giorni ci riuniremo per un matrimonio. Alcune mattine faremo yoga, alcuni giorni ci siederemo al tornio del vasaio e altri ci limiteremo a guardare il panorama, senza correre dietro a nessun programma.",
              "Con ognuna di queste esperienze vogliamo lasciare ai nostri ospiti lo spazio per essere curiosi, riposare e trovare il proprio ritmo.",
            ],
          },
          {
            title: "Siamo solo all'inizio della storia.",
            paragraphs: [
              "Zabut the Splendid è un progetto di ospitalità che stiamo costruendo passo dopo passo. Cerchiamo lo splendore del suo nome in un piatto preparato con cura, nel modo in cui la luce entra in una stanza e in un'accoglienza sincera.",
              "Quando un giorno ripartirai, speriamo che porterai a casa bei ricordi della Sicilia. E speriamo anche che porterai con te qualcosa a cui vuoi fare spazio nella tua vita.",
              "Accompagnaci mentre questa storia prende forma.",
            ],
          },
        ],
      },
      cta: "Unisciti al nostro percorso",
      pullQuote: "Alcune stanze non hanno bisogno di essere decorate. Hanno bisogno di luce, e di tempo.",
    },
    experiences: {
      label: "Ciò che immaginiamo",
      title: "Esperienze",
      intro: "Un primo sguardo a ciò che speriamo di offrire quando Zabut aprirà. I progetti stanno ancora prendendo forma e cresceranno insieme al luogo.",
      offers: {
        weddings: {
          title: "Matrimoni",
          text: "Una cornice per la cerimonia fatta di legno, pietra naturale e tessuti leggeri mossi dalla brezza, e un weekend di nozze in cui le persone care restano nello stesso luogo, condividendo pasti e tempo insieme.",
        },
        privateEvents: {
          title: "Eventi privati",
          text: "Celebrazioni e incontri di ogni dimensione, con spazio per stare insieme e spazio per stare per conto proprio.",
        },
        retreats: {
          title: "Ritiri",
          text: "Piccoli gruppi e ritiri creativi, con mattine di yoga e giornate che seguono il proprio ritmo.",
        },
        workshops: {
          title: "Laboratori",
          text: "Ceramica al tornio, esperienze di cucina e quella familiarità che nasce dal creare qualcosa insieme.",
        },
        table: {
          title: "La tavola",
          text: "Due esperienze gastronomiche distinte, ispirate alla cucina siciliana e all'eredità araba di Sambuca: a volte un menu degustazione, a volte un pasto preparato insieme.",
        },
        land: {
          title: "Il territorio",
          text: "Passeggiate nella natura, coltivatori e artigiani locali, le strade di Sambuca, o semplicemente una giornata a guardare il panorama.",
        },
      },
      caption: "Immagini concettuali",
      close: {
        title: "Stai pensando a qualcosa?",
        text: "Se stai pensando a un matrimonio, a un ritiro o a un evento a Zabut, scrivici. Ti terremo aggiornato man mano che i progetti prenderanno forma.",
        primaryCta: "Contattaci",
        secondaryCta: "Iscriviti agli aggiornamenti",
      },
    },
    blog: {
      label: "Il Diario",
      title: "Il Diario di Zabut",
      intro: "Le decisioni, le idee, le persone e le lezioni che danno forma a Zabut, condivise man mano, a partire dalla prima pagina.",
      allPostsLabel: "Tutti gli articoli",
    },
    contact: {
      label: "Contattaci",
      title: "Sii il primo a saperlo",
      intro: "Ti racconteremo come prende forma il progetto: aggiornamenti, nuove pagine del diario, niente spam.",
      signupCta: "Iscriviti agli aggiornamenti",
      emailLabel: "Email",
      followLabel: "Seguici",
    },
    privacy: {
      label: "Note legali",
      title: "Informativa sulla privacy",
      paragraphs: [
        "Quando ti iscrivi alla nostra lista, raccogliamo il tuo indirizzo email e, se scegli di condividerli, il tuo nome e i tuoi interessi. Li usiamo solo per inviarti aggiornamenti su Zabut the Splendid.",
        "I tuoi dati sono conservati negli strumenti di moduli e database che usiamo per gestire la lista. Non li vendiamo mai né li condividiamo con nessuno a fini di marketing.",
        "Puoi annullare l'iscrizione in qualsiasi momento scrivendo a {email}. Puoi scrivere allo stesso indirizzo anche per consultare, correggere o cancellare i tuoi dati.",
      ],
    },
    terms: {
      label: "Note legali",
      title: "Termini di utilizzo",
      paragraphs: [
        "Questo sito presenta Zabut the Splendid, un progetto di ospitalità in fase di sviluppo. Progetti, immagini, costi e tempistiche sono preliminari e possono cambiare.",
        "Nulla di quanto contenuto in questo sito costituisce un'offerta di investimento, una prenotazione o un impegno vincolante. Le immagini indicate come concept mostrano progetti proposti, non spazi realizzati.",
        "Per domande, scrivi a {email}.",
      ],
    },
  },
  posts: {
    "land-vision": {
      title: "Un pezzo di terra, una visione di vita",
      summary: "La prima pagina del diario di Zabut: un luogo che ho trovato in Sicilia e la vita che spero di costruire e condividere lì.",
      body: {
        opening: [
          "Quando sono arrivata in Sicilia ad agosto, avevo l'idea di trovare un luogo e costruire qualcosa. Avevo con me le mie domande, l'esperienza maturata nel mio lavoro e un sogno di cui non riuscivo ancora a vedere del tutto la forma.",
          "Poi ho trovato questa proprietà a Monte Adrone, a Sambuca.",
          "Gli edifici in pietra, gli alberi, i profili del terreno e la vista che si apre verso l'acqua… Da architetta, vedevo le possibilità. Da persona, mi sono ritrovata a immaginare la vita che avrebbe potuto svolgersi qui.",
          "Credo che Zabut sia nata dove questi due pensieri si sono incontrati.",
        ],
        sections: [
          {
            title: "Come sarebbe una mattina qui?",
            paragraphs: [
              "Per anni ho lavorato su edifici in legno e progetti di tiny house a Istanbul. Ogni volta che progetto uno spazio abitativo, immagino anche la vita quotidiana che accoglierà: da dove entrerà la luce del mattino? Dove vorrà bere il caffè qualcuno? Quale angolo inviterà a uscire, e quale a trascorrere un po' di tempo da soli?",
              "A Sambuca mi sono ritrovata a pormi le stesse domande.",
              "Ho cominciato a immaginare case in legno per gli ospiti che si inseriscono con naturalezza nel paesaggio. Sentieri di pietra tortuosi, spazi comuni modellati attorno agli alberi e angoli che possono avere funzioni diverse nel corso della giornata…",
              "Un luogo usato per lo yoga al mattino potrebbe diventare l'angolo di lettura di qualcuno nel pomeriggio. Persone che si incontrano a colazione attorno a una lunga tavola potrebbero ritrovarsi sedute insieme anche la sera. Qualcuno potrebbe portare in cucina prodotti appena raccolti, mentre qualcun altro potrebbe trascorrere tutta la giornata in tranquillità, per conto proprio, senza partecipare a nessuna attività.",
              "Erano cose a cui volevo fare più spazio anche nella mia vita: creare, condividere, rallentare e conoscere davvero il luogo che mi circonda.",
            ],
          },
          {
            title: "Due cucine, una tavola",
            paragraphs: [
              "Man mano che l'idea di Zabut prendeva forma, ho capito che la tavola ne sarebbe stata il cuore.",
              "Immagino due esperienze gastronomiche distinte, ispirate alla cucina locale siciliana e all'eredità araba di Sambuca. Tavole dove sappiamo da dove vengono gli ingredienti, dove possiamo conoscere chi li coltiva e dove gli chef possono condividere le proprie interpretazioni.",
              "A volte un menu degustazione, a volte un pasto preparato insieme, a volte una cena semplice da cui non vorremmo mai alzarci…",
              "Per renderlo possibile, voglio costruire relazioni con coltivatori, artigiani e attività locali. Per me è importante che Zabut cresca insieme alla vita che la circonda. Spero che i nostri ospiti conoscano Sambuca attraverso le sue strade, la sua gente e il suo cibo.",
            ],
          },
          {
            title: "Un luogo per festeggiare e per trovare tempo per sé",
            paragraphs: [
              "Guardando questo paesaggio, ho immaginato anche le persone che potrebbero sposarsi qui. Una cornice per la cerimonia fatta di legno, pietra naturale e tessuti leggeri mossi dalla brezza; un weekend di nozze in cui le persone care restano nello stesso luogo per qualche giorno, condividendo pasti e tempo insieme…",
              "In altri momenti, spero che questi spazi accolgano incontri creativi, piccoli gruppi e ritiri. Yoga, ceramica, esperienze di cucina, passeggiate nella natura e quella familiarità che nasce dal creare qualcosa insieme.",
              "In tutto il processo di progettazione c'è un equilibrio che voglio proteggere: creare un luogo che riunisca le persone lasciando loro anche lo spazio per stare per conto proprio.",
            ],
          },
          {
            title: "A che punto siamo oggi?",
            paragraphs: [
              "Zabut è ancora in fase di progettazione. Stiamo lavorando per discutere le condizioni di acquisto della proprietà, verificare come il progetto potrebbe prendere forma su questo terreno, affinare il budget e riunire i partner giusti.",
              "Per la prima fase stiamo valutando dodici case in legno per gli ospiti, due spazi di ristorazione distinti e aree per matrimoni ed eventi privati. I progetti si evolvono attraverso ricerche, conversazioni e una comprensione più profonda di ciò che il luogo può offrire.",
              "È proprio per questo che inizio questo diario. Voglio condividere le decisioni, le idee che cambiano, i materiali, le persone e le lezioni che daranno forma a Zabut lungo il cammino.",
              "Un giorno, quando saremo seduti attorno a quella lunga tavola, avremo il racconto di come ci siamo arrivati.",
              "Per ora abbiamo una vista, dei progetti su cui stiamo lavorando e la volontà di impegnarci per questo sogno.",
              "Benvenuti alla prima pagina di Zabut.",
            ],
          },
        ],
      },
      signoff: {
        name: "Ayşe Zülal, Alba in Sicily",
        role: "Fondatrice di Zabut the Splendid",
      },
    },
  },
};
