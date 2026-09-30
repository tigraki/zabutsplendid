import type { SiteContent } from './types';

/** Turkish copy. Taken verbatim from reference/tr/index.html; do not edit wording here without
 * checking the other languages keep the same shape (enforced by SiteContent). */
export const tr: SiteContent = {
  site: {
    meta: {
      siteName: "Zabut the Splendid",
      description: "Sicilya'nın Sicani tepelerinde şekillenen, daha anlamlı bir konaklama. Zabut'u hayata geçirmemize yardım et.",
      ogLocale: "tr_TR",
    },
    header: {
      menuButtonLabel: "Menüyü aç",
      languageSwitcherLabel: "Dil",
    },
    nav: {
      fundraising: "Destek",
      story: "Hikâye",
      experiences: "Deneyimler",
      blog: "Blog",
      contact: "İletişim",
    },
    footer: {
      country: "İtalya",
      newsletter: {
        title: "Bülten",
        text: "Günlük yazıları ve proje haberleri, doğrudan e-posta kutuna.",
        linkLabel: "Listeye katıl",
      },
      columns: {
        explore: "Keşfet",
        contact: "İletişim",
        follow: "Takip Et",
        legal: "Yasal",
      },
      instagramLabel: "Instagram",
      privacyLabel: "Gizlilik",
      termsLabel: "Şartlar",
    },
    images: {
      mark: "Zabut logosu: kemer, güneş ve zeytin dalı",
      markHero: "Zabut logosu",
      homeTerra: "Zabut'un yamaca yayılan ahşap misafir evlerinin konsept görseli",
      privateEvents: "Çardak altında bir akşam yemeğinin konsept görseli",
      weddings: "Göle ve denize bakan bir düğün töreninin konsept görseli",
      retreats: "Misafir evlerinin arasında bir yoga seansının konsept görseli",
      workshops: "Yerel ürünlerle yemek yapımının konsept görseli",
      table: "Sofrada servis edilen yemeklerin konsept görseli",
      land: "Kasabadaki yerel üreticilerin ve zanaatkârların konsept görseli",
      fundTable: "Zabut'ta bir zeytin ağacının altındaki uzun sofranın konsept görseli",
      panorama: "Sambuca çevresindeki kırsalın panoraması; ardında bir göl ve deniz",
      storyIllustration: "Zabut'un zeytin ağaçları arasındaki ahşap misafir evlerinin konsept görseli",
    },
    behaviours: {
      cookiePreferencesPlaceholder: "Tercih paneli burada açılacak",
    },
  },
  pages: {
    home: {
      place: {
        country: "İtalya",
      },
      hero: {
        primaryCta: "Vizyona Destek Ol",
        secondaryCta: "Güncellemelere abone ol",
      },
      essence: "Zaten var olana saygıyla.",
      project: {
        label: "Proje",
        title: "İlk aşama",
        lead: [
          "Şu anda mülkü güvence altına almak ve Zabut'un ilk aşamasını hayata geçirmek için çalışıyoruz.",
          "Özenli peyzaj, gastronomi, sağlıklı yaşam ve yaratıcı buluşmalarla Zabut'u misafirlerin kutlamak, keşfetmek ve kendilerine zaman ayırmak için yeniden döndüğü bir yer haline getirmeyi amaçlıyoruz.",
        ],
        pillars: {
          terra: "Doğayla iç içe on iki ahşap misafir evi.",
          persone: "Sicilya mutfağından ve Sambuca'nın Arap mirasından ilham alan iki ayrı yeme-içme deneyimi.",
          storie: "Düğünler ve özel etkinlikler için tasarlanmış açık alanlar.",
        },
        caption: "Konsept görseller",
        cta: "Bütçeyi ve nasıl dahil olabileceğini gör",
      },
      location: {
        title: "Sicani tepelerine kurulmuş: her şeye yeterince yakın, gürültüye uzak.",
      },
    },
    fundraising: {
      label: "Vizyona Destek Ol",
      title: "Zabut'u hayata geçirmemize yardım et.",
      intro: "Zabut the Splendid, Sambuca di Sicilia'da şekillenen bir konaklama projesi. Sicilya'nın doğasından ve Sambuca'nın kültürel mirasından ilham alan; konaklamak, bir araya gelmek, kutlamak ve yavaşlamak için bir yer hayal ediyoruz.",
      figureCaption: "Konsept görsel",
      budget: {
        title: "Bütçeye ilk bakış",
        rows: {
          twoPersonLodges: {
            label: "Altı iki kişilik ev",
            note: "6 × 16.000 €",
          },
          familyLodges: {
            label: "Altı aile evi",
            note: "6 × 31.000 €",
          },
          restaurants: {
            label: "İki restoran konsepti",
            note: "Mobilya ve iç mekân kaplama malzemeleri",
          },
          bathrooms: {
            label: "Banyo ve tuvalet yenilemeleri",
          },
          entrance: {
            label: "Giriş ve seçili yürüyüş yolları",
            note: "Taş, çakıl ve peyzaj malzemeleri",
          },
          weddingSetting: {
            label: "Düğün alanı",
            note: "Doğal taş, ahşap ve yeniden kullanılabilir dekoratif malzemeler",
          },
          guestSubtotal: {
            label: "Misafir evleri ve ortak alanlar",
          },
          property: {
            label: "Mülk için ilk ödeme payı",
            note: "Satın alma bedelinin tamamı değildir; ileriki kirala-satın al ödemeleri ayrıca hesaplanıyor",
          },
          itemsSubtotal: {
            label: "Mülk, evler ve ortak alanlar",
          },
          transport: {
            label: "Malzemelerin Türkiye'den Sicilya'ya taşınması",
          },
          costedScope: {
            label: "Ön maliyet kapsamı",
            tip: "İlk bütçemiz; mülk için öngörülen giriş ödemesini, on iki ahşap misafir evini, ortak konaklama alanlarını ve malzemelerin Türkiye'den Sicilya'ya taşınmasını kapsar. Toplam finansman ihtiyacı, kalan giderler ve beklenmedik giderler payı bütçelendiğinde netleşecek.",
          },
          digital: {
            label: "Web sitesi, marka varlıkları ve açılış öncesi dijital pazarlama",
            tip: "Dijital lansman hazırlığı; web sitesi tasarımı ve kurulumu, alan adı ve barındırma, sosyal medya lansmanı ve marka hikâyesi, logo ve marka kitabı için üretime hazır vektör dosyaları ile yapay zekâ destekli yaklaşık 9–12 konsept görseli kapsar. Bu görseller önerilen tasarımı gösterecek ve alanlar inşa edilene kadar konsept olarak belirtilecektir.",
          },
          company: {
            label: "İtalya'da şirket kuruluşu ve danışmanlık ücretleri",
          },
          permits: {
            label: "İzinler, altyapı ve kurulum",
          },
          pools: {
            label: "İki özel havuz",
          },
          operating: {
            label: "Ekipman, vergiler, açılış öncesi personel, işletme sermayesi ve beklenmedik giderler payı",
          },
          total: {
            label: "Toplam finansman hedefi",
          },
        },
        pendingValue: "Teklif bekleniyor",
        toBudgetValue: "Bütçelenecek",
        totalValue: "Netleşecek",
        infoButtonLabel: "Daha fazla bilgi",
        currency: {
          symbols: {
            EUR: "€",
            USD: "US$",
          },
          position: "after",
          groupSeparator: ".",
        },
      },
      deckNote: {
        label: "Yatırımcı sunumu",
        text: "Yatırımcı sunumumuz önümüzdeki günlerde burada olacak. Listeye katıl, hazır olur olmaz e-postana gönderelim.",
        linkLabel: "Listeye katıl",
      },
      support: {
        title: "Desteğinle neler yaratabiliriz",
        paragraphs: [
          "Doğal malzemelerle ve yerin ruhuyla şekillenen bir konaklama. Sicilya'nın ürünlerini ve insanları bir araya getiren sofralar. Düğünler ve anlamlı buluşmalar için bir ortam. Dinlenmek, üretmek, keşfetmek ve yeniden bağ kurmak için bir alan.",
          "Bu vizyona inanan ve nasıl dahil olabileceğini konuşmak isteyen kişilerle tanışmak istiyoruz.",
        ],
      },
      primaryCta: "Ortaklığı Konuşalım",
      secondaryCta: "Yolculuğu Takip Et",
      closing: "İlk adımlardan itibaren Zabut'un nasıl şekillendiğini paylaşacağız.",
    },
    story: {
      label: "Hikâyemiz",
      title: "Daha anlamlı bir konaklama",
      intro: "Bazı yolculuklar, ait olduğun yeri bulmakla başlar.",
      figureCaption: "Konsept görsel",
      body: {
        opening: [
          "Zabut’un hikâyesi, İstanbul’dan Sicilya’ya uzanan bir yolculukta başladı. Ahşap yapılar ve sürdürülebilir mimari üzerine çalışan bir mimarın, Sambuca’da kendi hayatı için de düşündüğü bir soruyla karşılaşmasıyla: Daha yavaş, daha anlamlı ve çevremizle daha güçlü bağlar kurarak yaşamak mümkün mü?",
          "Bu soru, zamanla başkalarıyla paylaşılabilecek bir yerin hayaline dönüştü. Sabahları acele etmeden karşılayabileceğimiz, bir sofrada uzun süre kalabileceğimiz, ellerimizle bir şey üretirken zamanın geçtiğini unutabileceğimiz bir yer.",
        ],
        sections: [
          {
            title: "Geçmişten ilham alan, birlikte şekillenen bir gelecek.",
            paragraphs: [
              "Zabut’u tasarlarken Sambuca’nın kültürel hafızası ve Sicilya’nın günlük yaşamı bize yön veriyor. Arap mirasıyla Sicilya ışığının buluşması, mimariden sofraya uzanan yaklaşımımızın ilham kaynağı.",
              "Doğal malzemeleri, ahşabın sıcaklığını ve yerel işçiliği bu anlayışla bir araya getirmek istiyoruz. Tasarımın her kararında bulunduğumuz yere kulak vermeyi; yerel üreticiler, zanaatkârlar ve komşularımızla kalıcı ilişkiler kurmayı önemsiyoruz.",
            ],
            italicLine: "Bizim için bir yere ait olmak, onun yaşamına katılmakla başlıyor.",
          },
          {
            title: "Kalmak, tatmak, kutlamak, kendine zaman ayırmak.",
            paragraphs: [
              "Hayal ettiğimiz Zabut’ta sakin bir konaklama, uzun bir sofranın etrafında yeni tanışıklıklara dönüşebilecek. Sicilya’nın malzemeleri, farklı mutfakların hikâyeleriyle şeflerin tabaklarında buluşacak.",
              "Bazı günler bir düğün için bir araya geleceğiz. Bazı sabahlar yoga yapacak, bazen kilin başına oturacak, bazen de hiçbir programa yetişmeden manzarayı seyredeceğiz.",
              "Bu deneyimlerin her birinde misafirlerimize alan bırakmak istiyoruz: merak etmeleri, dinlenmeleri ve kendi ritimlerini bulmaları için.",
            ],
          },
          {
            title: "Hikâyenin henüz başındayız.",
            paragraphs: [
              "Zabut the Splendid, bugün adım adım geliştirdiğimiz bir misafirperverlik projesi. Adındaki ihtişamı, özenle hazırlanmış bir tabakta, ışığın bir odaya düşüşünde ve içten bir karşılamada arıyoruz.",
              "Bir gün buradan ayrılırken Sicilya’ya dair güzel anıların yanında, kendi hayatında yer açmak istediğin bir şeyi de yanında götürmeni umuyoruz.",
              "Bu hikâye şekillenirken bize eşlik et.",
            ],
          },
        ],
      },
      cta: "Yolculuğumuza Katıl",
      pullQuote: "Bazı odaların süslenmeye ihtiyacı yoktur. Işığa ve zamana ihtiyaçları vardır.",
    },
    experiences: {
      label: "Hayal ettiklerimiz",
      title: "Deneyimler",
      intro: "Zabut açıldığında sunmayı umduğumuz şeylere ilk bakış. Planlar hâlâ şekilleniyor ve bu yerle birlikte büyüyecek.",
      offers: {
        weddings: {
          title: "Düğünler",
          text: "Ahşap, doğal taş ve rüzgârda salınan hafif kumaşlarla kurulmuş bir tören alanı; sevdiklerin aynı yerde kalıp yemekleri ve zamanı paylaştığı bir düğün hafta sonu.",
        },
        privateEvents: {
          title: "Özel Etkinlikler",
          text: "Her ölçekte kutlama ve buluşma; bir araya gelmek için de, kendi başına kalmak için de alan var.",
        },
        retreats: {
          title: "İnzivalar",
          text: "Küçük gruplar ve yaratıcı inzivalar; yoga ile başlayan sabahlar ve kendi ritmini izleyen günler.",
        },
        workshops: {
          title: "Atölyeler",
          text: "Çömlek tezgâhında seramik, yemek deneyimleri ve birlikte bir şey üretmenin getirdiği o tanıdık yakınlık.",
        },
        table: {
          title: "Sofra",
          text: "Sicilya mutfağından ve Sambuca'nın Arap mirasından ilham alan iki ayrı yeme-içme deneyimi: bazen bir tadım menüsü, bazen birlikte hazırlanan bir yemek.",
        },
        land: {
          title: "Toprak",
          text: "Doğa yürüyüşleri, yerel üreticiler ve zanaatkârlar, Sambuca'nın sokakları ya da sadece manzarayı izleyerek geçen bir gün.",
        },
      },
      caption: "Konsept görseller",
      close: {
        title: "Bir şey mi planlıyorsun?",
        text: "Zabut'ta bir düğün, inziva ya da etkinlik düşünüyorsan bize yaz. Planlar şekillendikçe seni haberdar edeceğiz.",
        primaryCta: "Bize Ulaş",
        secondaryCta: "Güncellemelere abone ol",
      },
    },
    blog: {
      label: "Günlük",
      title: "Zabut Günlüğü",
      intro: "Zabut'u şekillendiren kararlar, fikirler, insanlar ve dersler; ilk sayfadan başlayarak, yaşandıkça paylaşılıyor.",
      allPostsLabel: "Tüm Yazılar",
    },
    contact: {
      label: "Bize Ulaş",
      title: "Herkesten önce haberin olsun",
      intro: "Projenin nasıl şekillendiğini paylaşacağız: güncellemeler, yeni günlük yazıları, spam yok.",
      signupCta: "Güncellemelere abone ol",
      emailLabel: "E-posta",
      followLabel: "Takip Et",
    },
    privacy: {
      label: "Yasal",
      title: "Gizlilik Politikası",
      paragraphs: [
        "Listemize katıldığında e-posta adresini ve paylaşmayı seçersen adını ve ilgi alanlarını topluyoruz. Bunları yalnızca sana Zabut the Splendid hakkında güncellemeler göndermek için kullanıyoruz.",
        "Bilgilerin, listeyi yönetmek için kullandığımız form ve veritabanı araçlarında saklanır. Bunları asla satmıyor ve pazarlama amacıyla kimseyle paylaşmıyoruz.",
        "Aboneliğinden istediğin zaman {email} adresine yazarak çıkabilirsin. Verilerini görmek, düzeltmek veya sildirmek için de aynı adrese yazabilirsin.",
      ],
    },
    terms: {
      label: "Yasal",
      title: "Kullanım Şartları",
      paragraphs: [
        "Bu web sitesi, geliştirme aşamasındaki bir konaklama projesi olan Zabut the Splendid'i tanıtır. Planlar, görseller, maliyetler ve zaman çizelgeleri ön niteliktedir ve değişebilir.",
        "Bu sitedeki hiçbir içerik bir yatırım teklifi, rezervasyon ya da bağlayıcı bir taahhüt değildir. Konsept olarak belirtilen görseller inşa edilmiş alanları değil, önerilen tasarımları gösterir.",
        "Soruların için {email} adresine yazabilirsin.",
      ],
    },
  },
  posts: {
    "land-vision": {
      title: "Bir Parça Toprak, Bir Hayat Hayali",
      summary: "Zabut'un günlüğünün ilk sayfası: Sicilya'da bulduğum bir yer ve orada kurmayı, paylaşmayı umduğum hayat.",
      body: {
        opening: [
          "Ağustos'ta Sicilya'ya geldiğimde aklımda bir yer bulup orada bir şeyler inşa etme fikri vardı. Yanımda sorularımı, işim aracılığıyla edindiğim deneyimi ve henüz şeklini tam göremediğim bir hayali getirmiştim.",
          "Sonra Sambuca'da, Monte Adrone'deki bu araziyle karşılaştım.",
          "Taş yapılar, ağaçlar, arazinin kıvrımları ve suya doğru uzanan manzara… Bir mimar olarak olasılıkları görebiliyordum. Bir insan olarak da kendimi burada filizlenebilecek hayatı hayal ederken buldum.",
          "Sanırım Zabut, bu iki düşüncenin buluştuğu yerde başladı.",
        ],
        sections: [
          {
            title: "Burada bir sabah nasıl hissettirirdi?",
            paragraphs: [
              "Yıllardır İstanbul'da ahşap yapılar ve tiny house projeleri üzerine çalışıyorum. Bir yaşam alanı tasarlarken, orada yaşanacak gündelik hayatı da hayal ederim: Sabah ışığı nereden girecek? Biri kahvesini nerede içmek isteyecek? Hangi köşe insanı dışarı çekecek, hangisi biraz yalnız zaman geçirmeye davet edecek?",
              "Sambuca'da da kendimi aynı soruları sorarken buldum.",
              "Peyzajın içine rahatça yerleşen ahşap misafir evleri hayal etmeye başladım. Kıvrılan taş yollar, ağaçların etrafında şekillenen ortak alanlar ve gün boyunca farklı amaçlara hizmet edebilecek köşeler…",
              "Sabah yoga için kullanılan bir yer, öğleden sonra birinin okuma köşesine dönüşebilir. Kahvaltıda uzun bir masada buluşan insanlar, akşam yeniden yan yana oturabilir. Biri mutfağa taze toplanmış ürünler getirirken, bir başkası tek bir etkinliğe katılmadan bütün gününü kendi halinde, sessizce geçirebilir.",
              "Bunlar kendi hayatımda da daha fazla yer açmak istediğim şeylerdi: üretmek, paylaşmak, yavaşlamak ve çevremdeki yeri gerçekten tanımak.",
            ],
          },
          {
            title: "İki mutfak, tek sofra",
            paragraphs: [
              "Zabut fikri geliştikçe sofranın onun kalbinde olacağını fark ettim.",
              "Sicilya'nın yerel mutfağından ve Sambuca'nın Arap mirasından ilham alan iki ayrı yeme-içme deneyimi hayal ediyorum. Malzemelerin nereden geldiğini bildiğimiz, onları yetiştirenlerle tanışabildiğimiz ve şeflerin kendi yorumlarını paylaşabildiği sofralar.",
              "Bazen bir tadım menüsü, bazen birlikte hazırlanan bir yemek, bazen de kalkmaya hiç kıyamadığımız sade bir akşam yemeği…",
              "Bunu mümkün kılmak için yerel üreticiler, zanaatkârlar ve işletmelerle ilişkiler kurmak istiyorum. Zabut'un çevresindeki hayatla birlikte büyümesi benim için önemli. Misafirlerimizin Sambuca'yı sokakları, insanları ve yemekleriyle tanımasını umuyorum.",
            ],
          },
          {
            title: "Kutlamak ve kendine zaman ayırmak için bir yer",
            paragraphs: [
              "Bu manzaraya bakarken burada evlenebilecek insanları da hayal ettim. Ahşap, doğal taş ve rüzgârda salınan hafif kumaşlarla kurulmuş bir tören alanı; sevdiklerin birkaç gün boyunca aynı yerde kalıp yemekleri ve zamanı paylaştığı bir düğün hafta sonu…",
              "Başka zamanlarda bu alanların yaratıcı buluşmalara, küçük gruplara ve inzivalara ev sahipliği yapmasını umuyorum. Yoga, seramik, yemek deneyimleri, doğa yürüyüşleri ve birlikte bir şey üretmenin getirdiği o tanıdık yakınlık.",
              "Tasarım süreci boyunca korumak istediğim bir denge var: İnsanları bir araya getirirken onlara kendi başlarına kalabilecekleri alanı da tanıyan bir yer yaratmak.",
            ],
          },
          {
            title: "Bugün neredeyiz?",
            paragraphs: [
              "Zabut hâlâ planlama aşamasında. Arazinin satın alma koşullarını görüşmek, projenin bu toprak üzerinde nasıl şekillenebileceğini netleştirmek, bütçeyi olgunlaştırmak ve doğru ortakları bir araya getirmek için çalışıyoruz.",
              "İlk aşama için on iki ahşap misafir evi, iki ayrı yeme-içme alanı ve düğünler ile özel etkinlikler için alanlar üzerinde çalışıyoruz. Tasarımlar; araştırmalar, sohbetler ve arazinin sunabileceklerini daha derinden anlamamızla birlikte gelişiyor.",
              "Bu günlüğü tam da bu yüzden başlatıyorum. Yol boyunca Zabut'u şekillendiren kararları, değişen fikirleri, malzemeleri, insanları ve dersleri paylaşmak istiyorum.",
              "Bir gün o uzun sofranın etrafında otururken, oraya nasıl vardığımızın bir kaydı olacak elimizde.",
              "Şimdilik bir manzaramız, üzerinde çalıştığımız planlarımız ve bu hayal için emek vermeye hazır bir irademiz var.",
              "Zabut'un ilk sayfasına hoş geldin.",
            ],
          },
        ],
      },
      signoff: {
        name: "Ayşe Zülal, Alba in Sicily",
        role: "Zabut the Splendid kurucusu",
      },
    },
  },
};
