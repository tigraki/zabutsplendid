import type { SiteContent } from './types';

/** English copy. Taken verbatim from reference/index.html; do not edit wording here without
 * checking the other languages keep the same shape (enforced by SiteContent). */
export const en: SiteContent = {
  site: {
    meta: {
      siteName: "Zabut the Splendid",
      description: "A more meaningful stay, taking shape in the Sicani hills of Sicily. Help bring Zabut to life.",
      ogLocale: "en_US",
    },
    header: {
      menuButtonLabel: "Open menu",
      languageSwitcherLabel: "Language",
    },
    nav: {
      fundraising: "Fundraising",
      story: "Story",
      experiences: "Experiences",
      blog: "Blog",
      contact: "Contact",
    },
    footer: {
      country: "Italy",
      newsletter: {
        title: "Newsletter",
        text: "Journal entries and project news, straight to your inbox.",
        linkLabel: "Join the list",
      },
      columns: {
        explore: "Explore",
        contact: "Contact",
        follow: "Follow",
        legal: "Legal",
      },
      instagramLabel: "Instagram",
      privacyLabel: "Privacy",
      termsLabel: "Terms",
    },
    images: {
      mark: "Zabut mark: arch, sun and olive branch",
      markHero: "Zabut mark",
      homeTerra: "Concept visual of Zabut's timber guest houses across the hillside",
      privateEvents: "Concept visual of an evening dinner under the pergola",
      weddings: "Concept visual of a wedding ceremony overlooking the lake and the sea",
      retreats: "Concept visual of a yoga session among the guest houses",
      workshops: "Concept visual of cooking with local produce",
      table: "Concept visual of dishes served at the table",
      land: "Concept visual of local growers and artisans in the village",
      fundTable: "Concept visual of a long table under an olive tree at Zabut",
      panorama: "Panorama of the countryside around Sambuca, with a lake and the sea beyond",
      storyIllustration: "Concept visual of Zabut's timber guest houses among olive trees",
    },
    behaviours: {
      cookiePreferencesPlaceholder: "Preference panel opens here once wired up",
    },
  },
  pages: {
    home: {
      place: {
        country: "Italy",
      },
      hero: {
        primaryCta: "Support the Vision",
        secondaryCta: "Sign up for updates",
      },
      essence: "Honoring what was already there.",
      project: {
        label: "The Project",
        title: "The first phase",
        lead: [
          "We are now working to secure the property and bring the first phase of Zabut to life.",
          "With thoughtful landscaping, gastronomy, wellness and creative gatherings, we aim to make Zabut a destination guests return to: to celebrate, explore and take time for themselves.",
        ],
        pillars: {
          terra: "Twelve timber guest houses set within the landscape.",
          persone: "Two distinct dining experiences inspired by Sicilian cuisine and Sambuca's Arab heritage.",
          storie: "Outdoor spaces designed for weddings and private events.",
        },
        caption: "Concept visuals",
        cta: "See the budget and how to take part",
      },
      location: {
        title: "Perched in the Sicani hills, close enough to everything, far from the noise.",
      },
    },
    fundraising: {
      label: "Support the Vision",
      title: "Help bring Zabut to life.",
      intro: "Zabut the Splendid is a hospitality project taking shape in Sambuca di Sicilia. We envision a place to stay, gather, celebrate and slow down, inspired by Sicily's landscape and Sambuca's cultural heritage.",
      figureCaption: "Concept visual",
      budget: {
        title: "An early look at the budget",
        rows: {
          twoPersonLodges: {
            label: "Six two-person lodges",
            note: "6 × €16,000",
          },
          familyLodges: {
            label: "Six family lodges",
            note: "6 × €31,000",
          },
          restaurants: {
            label: "Two restaurant concepts",
            note: "Furniture and interior finish materials",
          },
          bathrooms: {
            label: "Bathroom and toilet renovations",
          },
          entrance: {
            label: "Entrance and selected pathways",
            note: "Stone, gravel and landscape materials",
          },
          weddingSetting: {
            label: "Wedding setting",
            note: "Natural stone, timber and reusable decorative materials",
          },
          guestSubtotal: {
            label: "Guest houses and shared spaces",
          },
          property: {
            label: "Initial property payment allowance",
            note: "Not the full purchase price; future rent-to-buy payments are modelled separately",
          },
          itemsSubtotal: {
            label: "Property, lodges and shared spaces",
          },
          transport: {
            label: "Transport of materials from Türkiye to Sicily",
          },
          costedScope: {
            label: "Preliminary costed scope",
            tip: "Our initial budget covers the proposed property entry payment, twelve timber guest houses, shared hospitality spaces and materials transport from Türkiye to Sicily. The complete funding requirement will be confirmed once the remaining costs and contingency are budgeted.",
          },
          digital: {
            label: "Website, brand assets and pre-opening digital marketing",
            tip: "Digital launch preparation includes website design and setup, domain and hosting, the social media launch and brand story, production-ready vector files for the logo and brand book, and approximately 9–12 AI-assisted concept visuals. These visuals will illustrate the proposed design and will be identified as concepts until the spaces are built.",
          },
          company: {
            label: "Italian company formation and professional fees",
          },
          permits: {
            label: "Permits, infrastructure and installation",
          },
          pools: {
            label: "Two private pools",
          },
          operating: {
            label: "Equipment, taxes, pre-opening staffing, working capital and contingency",
          },
          total: {
            label: "Complete funding target",
          },
        },
        pendingValue: "Quote pending",
        toBudgetValue: "To be budgeted",
        totalValue: "To be confirmed",
        infoButtonLabel: "More information",
        currency: {
          symbols: {
            EUR: "€",
            USD: "US$",
          },
          position: "before",
          groupSeparator: ",",
        },
      },
      deckNote: {
        label: "Pitch deck",
        text: "Our pitch deck will be available here in the coming days. Join the list and we'll email it to you as soon as it's ready.",
        linkLabel: "Join the list",
      },
      support: {
        title: "What your support could help create",
        paragraphs: [
          "A stay shaped by natural materials and a sense of place. Tables that bring Sicilian ingredients and people together. A setting for weddings and meaningful gatherings. Space to rest, make, explore and reconnect.",
          "We are looking to speak with people who believe in this vision and would like to explore how they might take part in it.",
        ],
      },
      primaryCta: "Discuss a Partnership",
      secondaryCta: "Follow the Journey",
      closing: "From the first steps onward, we'll share how Zabut takes shape.",
    },
    story: {
      label: "Our Story",
      title: "A more meaningful stay",
      intro: "Some journeys begin with finding where you belong.",
      figureCaption: "Concept visual",
      body: {
        opening: [
          "Zabut's story began on a journey from Istanbul to Sicily. It started with an architect who works with timber structures and sustainable design. In Sambuca, that architect ran into a question that also applied to their own life: is it possible to live more slowly, more meaningfully, and with stronger ties to the world around us?",
          "Over time, that question grew into the dream of a place that could be shared with others. It would be a place where we can greet the morning without rushing, linger long at the table, and lose track of time while making something with our hands.",
        ],
        sections: [
          {
            title: "A future inspired by the past, shaped together.",
            paragraphs: [
              "As we design Zabut, we are guided by Sambuca's cultural memory and the everyday life of Sicily. Our approach, from the architecture to the table, draws on the meeting of Arab heritage and Sicilian light.",
              "In that spirit, we want to bring together natural materials, the warmth of wood, and local craftsmanship. With every design decision, we try to listen to the place we're in. We also want to build lasting relationships with local producers, artisans, and our neighbors.",
            ],
            italicLine: "For us, belonging to a place begins with taking part in its life.",
          },
          {
            title: "To stay, to taste, to celebrate, to take time for yourself.",
            paragraphs: [
              "In the Zabut we imagine, a quiet stay can turn into new friendships around a long table. On our chefs' plates, Sicilian ingredients will meet the stories of other cuisines.",
              "Some days we'll come together for a wedding. Some mornings we'll do yoga, some days we'll sit down at the potter's wheel, and some days we'll simply watch the view without rushing to keep any schedule.",
              "With each of these experiences, we want to leave our guests room to be curious, to rest, and to find their own rhythm.",
            ],
          },
          {
            title: "We're only at the beginning of the story.",
            paragraphs: [
              "Zabut the Splendid is a hospitality project we are building step by step. We look for the splendor in its name in a carefully prepared plate, in the way light falls into a room, and in a heartfelt welcome.",
              "When you leave one day, we hope you'll take home good memories of Sicily. We also hope you'll take something you want to make room for in your own life.",
              "Join us as this story takes shape.",
            ],
          },
        ],
      },
      cta: "Join Our Journey",
      pullQuote: "Some rooms don't need decorating. They need light, and time.",
    },
    experiences: {
      label: "What We Imagine",
      title: "Experiences",
      intro: "A first look at what we hope to offer once Zabut opens. Plans are still taking shape, and will grow with the place.",
      offers: {
        weddings: {
          title: "Weddings",
          text: "A ceremony setting of timber, natural stone and light fabrics moving in the breeze, and a wedding weekend where loved ones stay in one place, sharing meals and time together.",
        },
        privateEvents: {
          title: "Private Events",
          text: "Celebrations and gatherings of every size, with room to come together and room to be on your own.",
        },
        retreats: {
          title: "Retreats",
          text: "Small groups and creative retreats, with mornings of yoga and days that follow their own rhythm.",
        },
        workshops: {
          title: "Workshops",
          text: "Ceramics at the potter's wheel, cooking experiences, and the familiar closeness that comes from making something together.",
        },
        table: {
          title: "The Table",
          text: "Two distinct dining experiences inspired by Sicilian cuisine and Sambuca's Arab heritage: sometimes a tasting menu, sometimes a meal prepared together.",
        },
        land: {
          title: "The Land",
          text: "Walks in nature, local growers and artisans, and the streets of Sambuca, or simply a day spent watching the view.",
        },
      },
      caption: "Concept visuals",
      close: {
        title: "Planning something?",
        text: "If you are thinking of a wedding, retreat or event at Zabut, write to us. We will keep you posted as plans take shape.",
        primaryCta: "Get in Touch",
        secondaryCta: "Sign up for updates",
      },
    },
    blog: {
      label: "The Journal",
      title: "The Zabut Journal",
      intro: "The decisions, ideas, people and lessons that shape Zabut, shared as they happen, starting from the first page.",
      allPostsLabel: "All Posts",
    },
    contact: {
      label: "Get in Touch",
      title: "Be the first to know",
      intro: "We'll share how the project takes shape: updates, new journal posts, no spam.",
      signupCta: "Sign up for updates",
      emailLabel: "Email",
      followLabel: "Follow",
    },
    privacy: {
      label: "Legal",
      title: "Privacy Policy",
      paragraphs: [
        "When you join our list, we collect your email address and, if you choose to share them, your first name and interests. We use this only to send you updates about Zabut the Splendid.",
        "Your details are stored with the form and database tools we use to manage the list. We never sell them or share them with anyone for marketing.",
        "You can unsubscribe at any time by writing to {email}. You can also write to the same address to see, correct or delete your data.",
      ],
    },
    terms: {
      label: "Legal",
      title: "Terms of Use",
      paragraphs: [
        "This website presents Zabut the Splendid, a hospitality project in development. Plans, images, costs and timelines are preliminary and may change.",
        "Nothing on this site is an offer of investment, a booking or a binding commitment. Visuals marked as concepts show proposed designs, not built spaces.",
        "For questions, write to {email}.",
      ],
    },
  },
  posts: {
    "land-vision": {
      title: "A Piece of Land, a Vision of a Life",
      summary: "The first entry in Zabut's journal: a place I found in Sicily, and the life I hope to build and share there.",
      body: {
        opening: [
          "When I arrived in Sicily in August, I had the idea of finding a place and building something there. I brought my questions, the experience I had gathered through my work, and a dream whose shape I couldn't yet fully see.",
          "Then I came across this property at Monte Adrone, in Sambuca.",
          "The stone buildings, the trees, the contours of the land, and the view stretching toward the water… As an architect, I could see the possibilities. As a person, I found myself imagining the life that could unfold here.",
          "I think Zabut began where those two thoughts met.",
        ],
        sections: [
          {
            title: "What would a morning here feel like?",
            paragraphs: [
              "For years, I have worked on timber buildings and tiny house projects in Istanbul. Whenever I design a living space, I also imagine the everyday life it will hold: where will the morning light enter? Where will someone want to drink their coffee? Which corner will draw them outside, and which will invite them to spend a little time alone?",
              "In Sambuca, I found myself asking the same questions.",
              "I began imagining timber guest houses sitting comfortably within the landscape. Winding stone paths, shared spaces shaped around the trees, and corners that could serve different purposes throughout the day…",
              "A place used for yoga in the morning could become someone's reading spot in the afternoon. People meeting over breakfast at a long table could find themselves sitting together again that evening. Someone might bring freshly picked produce into the kitchen, while someone else could spend the whole day quietly on their own, without joining a single activity.",
              "These were things I wanted to make more room for in my own life, too: creating, sharing, slowing down, and truly getting to know the place around me.",
            ],
          },
          {
            title: "Two kitchens, one table",
            paragraphs: [
              "As the idea of Zabut developed, I realized that the table would be at its heart.",
              "I am imagining two distinct dining experiences inspired by Sicily's local cuisine and Sambuca's Arab heritage. Tables where we know where the ingredients come from, where we can meet the people who grow them, and where chefs can share their own interpretations.",
              "Sometimes a tasting menu, sometimes a meal prepared together, sometimes a simple dinner we never quite want to leave…",
              "To make this possible, I want to build relationships with local growers, artisans and businesses. It matters to me that Zabut grows alongside the life around it. I hope our guests will come to know Sambuca through its streets, its people and its food.",
            ],
          },
          {
            title: "A place to celebrate, and to find time for yourself",
            paragraphs: [
              "Looking out at this landscape, I also imagined the people who might get married here. A ceremony setting made with timber, natural stone and light fabrics moving in the breeze; a wedding weekend where loved ones stay in the same place for a few days, sharing meals and time together…",
              "At other times, I hope these spaces will welcome creative gatherings, small groups and retreats. Yoga, ceramics, cooking experiences, walks in nature, and the familiar closeness that comes from making something together.",
              "Throughout the design process, there is a balance I want to protect: creating a place that brings people together while giving them room to be on their own.",
            ],
          },
          {
            title: "Where are we today?",
            paragraphs: [
              "Zabut is still in the planning stage. We are working toward discussing the property's purchase terms, confirming how the project could take shape on this land, refining the budget and bringing the right partners together.",
              "For the first phase, we are exploring twelve timber guest houses, two distinct dining spaces, and areas for weddings and private events. The designs are evolving through research, conversations and a deeper understanding of what the site can offer.",
              "That is exactly why I am starting this journal. I want to share the decisions, changing ideas, materials, people and lessons that shape Zabut along the way.",
              "One day, when we are sitting around that long table, we will have a record of how we got there.",
              "For now, we have a view, plans we are working on, and the willingness to put the work into this dream.",
              "Welcome to the first page of Zabut.",
            ],
          },
        ],
      },
      signoff: {
        name: "Ayşe Zülal, Alba in Sicily",
        role: "Founder of Zabut the Splendid",
      },
    },
  },
};
