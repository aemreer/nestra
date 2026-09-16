export type ModelGalleryImage = {
  src: string;
  alt: string;
  type: "exterior" | "interior" | "plan";
  displayAspect?: "4/3";
  role:
    | "hero"
    | "exterior"
    | "living"
    | "bedroom"
    | "loft"
    | "detail"
    | "plan"
    | "plan-ground"
    | "plan-loft"
    | "plan-upper"
    | "private"
    | "upper-level"
    | "outdoor";
  label?: string;
};

export type ModelFeature = {
  title: string;
  description: string;
};

export type ModelEditorialSection = {
  eyebrow: string;
  headline: string;
  description: string;
  mediaRole?: "private" | "upper-level" | "outdoor";
  layout?: "split" | "wide";
};

export type ModelDetail = {
  storeys: string;
  heroLayout?: "standard" | "split" | "family" | "horizon";
  heroHeadline: string;
  shortDescription: string;
  storyHeadline: string;
  storyDescription: string;
  storyLayout?: "standard" | "split";
  livingHeadline: string;
  livingDescription: string;
  distinctiveSection?: ModelEditorialSection;
  editorialSections?: readonly ModelEditorialSection[];
  approachHeadline: string;
  layoutHeadline?: string;
  layoutDescription?: string;
  features: readonly ModelFeature[];
  gallery: readonly ModelGalleryImage[];
  ctaHeadline: string;
  ctaDescription: string;
  seoTitle: string;
  seoDescription: string;
};

export type NestraModel = {
  order: number;
  name: string;
  slug: string;
  area: string;
  rooms: string;
  keyword: string;
  heroImage: string;
  imageAlt: string;
  featured: boolean;
  detail?: ModelDetail;
};

export const models: readonly NestraModel[] = [
  {
    order: 1,
    name: "NESTRA One",
    slug: "one",
    area: "38 m²",
    rooms: "1+1",
    keyword: "Sadelik",
    heroImage: "/images/models/one/hero.webp",
    imageAlt:
      "NESTRA One'ın doğal orman peyzajındaki yatay ve geniş cam cepheli ahşap formu",
    featured: false,
    detail: {
      storeys: "Tek kat",
      heroHeadline: "Daha az alanda,\ndaha fazlası için.",
      shortDescription:
        "NESTRA One, günlük yaşamın ihtiyaçlarını sade ve işlevsel bir plan içinde bir araya getiren kompakt yaşam modelidir.",
      storyHeadline: "Sadelik, yaşam alanına dönüştüğünde.",
      storyDescription:
        "NESTRA One, gereksiz alanlardan arındırılmış bir yaşam kurgusu sunar. Açık yaşam alanı, doğal ışıkla kurduğu ilişki ve kompakt planlamasıyla günlük ihtiyaçları yalın bir mimari içinde bir araya getirir.",
      livingHeadline: "Kompakt, ama kısıtlı değil.",
      livingDescription:
        "Yaşam alanı, mutfak ve dinlenme bölümleri arasında kurulan açık ilişki; küçük metrekareyi daha ferah ve kullanışlı bir deneyime dönüştürür.",
      approachHeadline: "One’ın yaşam karakteri.",
      layoutHeadline: "38 m² içinde dengeli bir yaşam kurgusu.",
      layoutDescription:
        "Açık yaşam alanı, özel alanlar ve teras ilişkisi kompakt plan içinde sade ve işlevsel bir bütün oluşturur.",
      features: [
        {
          title: "Kompakt planlama",
          description:
            "Günlük yaşam ihtiyaçlarını minimum alan kaybıyla bir araya getiren düzen.",
        },
        {
          title: "İç-dış ilişki",
          description:
            "Geniş cam açıklıklarıyla yaşam alanını teras ve çevreyle buluşturan yaklaşım.",
        },
        {
          title: "Doğal malzeme dili",
          description:
            "Ahşap, koyu metal ve sakin yüzeylerle kurulan sıcak mimari karakter.",
        },
        {
          title: "Tek katlı yaşam",
          description:
            "Günlük kullanımı tek seviyede toplayan yalın mekansal kurgu.",
        },
      ],
      gallery: [
        {
          src: "/images/models/one/hero.webp",
          alt: "NESTRA One'ın doğal peyzajla çevrili ahşap dış cephesi ve verandası",
          type: "exterior",
          role: "hero",
        },
        {
          src: "/images/models/one/exterior-veranda.webp",
          alt: "NESTRA One'ın ahşap verandası, geniş cam açıklıkları ve doğal peyzajla ilişkisi",
          type: "exterior",
          role: "exterior",
        },
        {
          src: "/images/models/one/interior-living.webp",
          alt: "NESTRA One'ın doğal ışık alan açık yaşam, mutfak ve yemek alanı",
          type: "interior",
          role: "living",
        },
        {
          src: "/images/models/one/interior-bedroom.webp",
          alt: "NESTRA One'ın ahşap yüzeyli ve bahçeye açılan sakin yatak odası",
          type: "interior",
          role: "bedroom",
        },
        {
          src: "/images/models/one/material-detail.webp",
          alt: "NESTRA One'ın ahşap, koyu metal, cam ve doğal tekstil malzeme detayı",
          type: "interior",
          role: "detail",
        },
        {
          src: "/images/models/one/plan-ground-floor-v2.webp",
          alt: "NESTRA One'ın yaşam alanı, yatak odası, banyo ve teras ilişkisini gösteren yerleşim görseli",
          type: "plan",
          role: "plan",
        },
      ],
      ctaHeadline: "One’ı size göre şekillendirelim.",
      ctaDescription:
        "İhtiyaçlarınızı paylaşın, NESTRA One için birlikte bir başlangıç oluşturalım.",
      seoTitle: "NESTRA One | 38 m² Modüler Yaşam Alanı",
      seoDescription:
        "38 m² ve 1+1 planıyla NESTRA One’ı keşfedin. Kompakt yaşam için tasarlanan sade ve çağdaş modüler yaşam alanı.",
    },
  },
  {
    order: 2,
    name: "NESTRA Loft",
    slug: "loft",
    area: "54 m²",
    rooms: "1+1 + Loft",
    keyword: "Yükseklik",
    heroImage: "/images/models/loft/hero.webp",
    imageAlt:
      "NESTRA Loft'un orman içinde yükselen çatısı ve çift yükseklikte cam cephesi",
    featured: false,
    detail: {
      storeys: "Loft",
      heroLayout: "split",
      heroHeadline: "Yüksekliğin açtığı\nyeni bir yaşam.",
      shortDescription:
        "NESTRA Loft, çift yükseklikli yaşam alanı ve kullanılabilir loft katıyla kompakt yaşamı daha güçlü bir mekansal deneyime dönüştürür.",
      storyHeadline: "Alan yalnızca metrekareyle ölçülmez.",
      storyDescription:
        "NESTRA Loft, yaşam alanını yalnızca yatayda değil dikeyde de genişleten bir kurgu sunar. Çift yükseklikli ana hacim ve loft seviyesi, kompakt ölçüler içinde daha açık, ferah ve katmanlı bir yaşam deneyimi oluşturur.",
      livingHeadline: "Dikeyde büyüyen bir hacim.",
      livingDescription:
        "Ana yaşam alanındaki çift yükseklik, doğal ışığı ve mekansal derinliği güçlendirirken loft seviyesi yaşam alanına ikinci bir katman ekler.",
      distinctiveSection: {
        eyebrow: "LOFT",
        headline: "Yukarıda, yaşamın ikinci katmanı.",
        description:
          "Kullanılabilir loft seviyesi, ana yaşam alanıyla görsel ilişki kurarken dinlenme, çalışma veya kişisel kullanım için ayrı bir alan tanımlar.",
      },
      approachHeadline: "Loft’un yaşam karakteri.",
      layoutHeadline: "İki seviyede katmanlanan yaşam.",
      layoutDescription:
        "Zemin kattaki açık yaşam alanı ile kısmi loft seviyesi, çift yükseklikli ana hacim etrafında birbirine bağlanır.",
      features: [
        {
          title: "Çift yükseklik",
          description:
            "Ana yaşam alanında daha güçlü hacim ve doğal ışık hissi.",
        },
        {
          title: "Kullanılabilir loft",
          description:
            "Yaşam alanına ikinci bir kullanım seviyesi ekleyen gerçek loft kurgusu.",
        },
        {
          title: "Dikey mekan ilişkisi",
          description:
            "Alt ve üst seviyeler arasında görsel süreklilik sağlayan açık plan yaklaşımı.",
        },
        {
          title: "Doğal malzeme dili",
          description:
            "Ahşap, koyu metal ve sıcak yüzeylerle dengelenen çağdaş mimari karakter.",
        },
      ],
      gallery: [
        {
          src: "/images/models/loft/hero.webp",
          alt: "NESTRA Loft'un yükselen tek eğimli çatısı, çift yükseklikte cam cephesi ve orman içindeki ahşap terası",
          type: "exterior",
          role: "hero",
        },
        {
          src: "/images/models/loft/exterior-deck.webp",
          alt: "NESTRA Loft'un ahşap deck alanı, koyu dış cephesi ve çift yükseklikte cam köşesi",
          type: "exterior",
          role: "exterior",
        },
        {
          src: "/images/models/loft/interior-living-double-height.webp",
          alt: "NESTRA Loft'un çift yükseklikli yaşam alanı, açık mutfağı ve üst loft seviyesi",
          type: "interior",
          role: "living",
        },
        {
          src: "/images/models/loft/interior-loft-level.webp",
          alt: "NESTRA Loft'un kullanılabilir üst seviyesi ve aşağıdaki yaşam alanıyla görsel ilişkisi",
          type: "interior",
          role: "loft",
        },
        {
          src: "/images/models/loft/material-detail.webp",
          alt: "NESTRA Loft'un ahşap, koyu metal ve cam birleşimini gösteren eşik detayı",
          type: "interior",
          role: "detail",
        },
        {
          src: "/images/models/loft/plan-ground-floor.webp",
          alt: "NESTRA Loft'un zemin kattaki açık yaşam alanı, yatak odası ve deck ilişkisini gösteren yerleşim görseli",
          type: "plan",
          role: "plan-ground",
          label: "Zemin kat",
        },
        {
          src: "/images/models/loft/plan-loft-floor.webp",
          alt: "NESTRA Loft'un üst seviyesi ile çift yükseklikli ana hacim ilişkisini gösteren yerleşim görseli",
          type: "plan",
          role: "plan-loft",
          label: "Loft seviyesi",
        },
      ],
      ctaHeadline: "Loft’u size göre şekillendirelim.",
      ctaDescription:
        "İhtiyaçlarınızı paylaşın, NESTRA Loft için yaşam kurgusunu birlikte oluşturalım.",
      seoTitle: "NESTRA Loft | 54 m² Modüler Yaşam Alanı",
      seoDescription:
        "54 m², 1+1 + Loft planı ve çift yükseklikli yaşam alanıyla NESTRA Loft’u keşfedin.",
    },
  },
  {
    order: 3,
    name: "NESTRA Family",
    slug: "family",
    area: "76 m²",
    rooms: "2+1",
    keyword: "Birliktelik",
    heroImage: "/images/models/family/hero.webp",
    imageAlt:
      "NESTRA Family'nin bağlantılı ahşap hacimleri ve geniş sosyal verandası",
    featured: false,
    detail: {
      storeys: "Tek kat",
      heroLayout: "family",
      heroHeadline: "Birlikte yaşamaya\ndaha fazla alan.",
      shortDescription:
        "NESTRA Family, ortak yaşam alanlarını özel alanlarla dengede tutan 2+1 planıyla günlük aile yaşamına daha geniş ve esnek bir zemin sunar.",
      storyHeadline: "Birlikte geçirilen zaman için tasarlandı.",
      storyDescription:
        "NESTRA Family, ortak yaşamı merkeze alırken kişisel alanları da koruyan dengeli bir yerleşim sunar. Salon, mutfak ve yemek alanı günlük yaşamın buluşma noktası olurken iki ayrı oda daha uzun süreli ve esnek kullanıma alan açar.",
      storyLayout: "split",
      livingHeadline: "Ortak yaşamın merkezinde.",
      livingDescription:
        "Açık mutfak, yemek ve oturma alanı aynı yaşam aksında buluşurken geniş açıklıklar iç mekanı teras ve bahçeyle ilişkilendirir.",
      editorialSections: [
        {
          eyebrow: "ÖZEL ALANLAR",
          headline: "Birlikte yaşarken, kendine ait alanlar.",
          description:
            "İki ayrı oda, aile yaşamı içinde dinlenme, çalışma veya kişisel kullanım için daha sakin alanlar oluşturur.",
          mediaRole: "private",
          layout: "split",
        },
        {
          eyebrow: "İÇ-DIŞ YAŞAM",
          headline: "Yaşam alanı bahçeyle devam eder.",
          description:
            "Geniş açıklıklar ve teras kurgusu, ortak yaşam alanını dış mekanla kesintisiz bir ilişki içinde genişletir.",
          mediaRole: "outdoor",
          layout: "wide",
        },
      ],
      approachHeadline: "Family’nin yaşam karakteri.",
      layoutHeadline: "76 m² içinde dengeli bir aile yaşamı.",
      layoutDescription:
        "Ortak yaşam alanı, iki ayrı özel oda ve teras ilişkisi tek katlı plan içinde dengeli bir bütün oluşturur.",
      features: [
        {
          title: "Ortak yaşam",
          description:
            "Salon, yemek ve mutfak alanlarını günlük yaşamın merkezinde bir araya getiren kurgu.",
        },
        {
          title: "2+1 esneklik",
          description:
            "Aile yaşamı, çalışma veya misafir kullanımı için iki ayrı özel alan.",
        },
        {
          title: "İç-dış ilişki",
          description:
            "Geniş açıklıklar ve terasla ortak yaşam alanını bahçeye taşıyan yaklaşım.",
        },
        {
          title: "Tek katlı kullanım",
          description:
            "Günlük yaşamı tek seviyede toplayan rahat ve erişilebilir mekansal düzen.",
        },
      ],
      gallery: [
        {
          src: "/images/models/family/hero.webp",
          alt: "NESTRA Family'nin bağlantılı ahşap hacimleri, geniş cam açıklıkları ve ortak yaşam terası",
          type: "exterior",
          role: "hero",
        },
        {
          src: "/images/models/family/interior-living.webp",
          alt: "NESTRA Family'nin açık mutfak, yemek ve oturma alanını bir araya getiren ortak yaşam mekanı",
          type: "interior",
          role: "living",
        },
        {
          src: "/images/models/family/interior-private-room-v2.webp",
          alt: "NESTRA Family'nin bahçeye açılan, çalışma ve dinlenme kullanımını bir araya getiren özel odası",
          type: "interior",
          role: "private",
        },
        {
          src: "/images/models/family/exterior-terrace.webp",
          alt: "NESTRA Family'nin ortak yaşam alanını bahçe ve açık yemek terasıyla buluşturan cephesi",
          type: "exterior",
          role: "outdoor",
        },
        {
          src: "/images/models/family/material-detail.webp",
          alt: "NESTRA Family'nin ahşap yüzey, koyu metal çerçeve ve teras eşiği detayı",
          type: "interior",
          role: "detail",
        },
        {
          src: "/images/models/family/plan-ground-floor.webp",
          alt: "NESTRA Family'nin ortak yaşam alanı, iki özel odası ve teras ilişkisini gösteren yerleşim görseli",
          type: "plan",
          role: "plan-ground",
        },
      ],
      ctaHeadline: "Family’yi size göre şekillendirelim.",
      ctaDescription:
        "İhtiyaçlarınızı paylaşın, NESTRA Family için yaşam kurgusunu birlikte oluşturalım.",
      seoTitle: "NESTRA Family | 76 m² Modüler Yaşam Alanı",
      seoDescription:
        "76 m² ve 2+1 planıyla NESTRA Family’yi keşfedin. Ortak yaşam ile kişisel alanları dengeleyen tek katlı modüler yaşam alanı.",
    },
  },
  {
    order: 4,
    name: "NESTRA Horizon",
    slug: "horizon",
    area: "132 m²",
    rooms: "3+1",
    keyword: "Ufuk",
    heroImage: "/images/models/horizon/hero.webp",
    imageAlt:
      "NESTRA Horizon'ın panoramik cam cepheli yatay ana kütlesi ve kısmi üst katı",
    featured: true,
    detail: {
      storeys: "Kısmi ikinci kat",
      heroLayout: "horizon",
      heroHeadline: "Ufka açılan daha geniş bir yaşam.",
      shortDescription:
        "NESTRA Horizon, geniş yaşam alanlarını panoramik açıklıklar ve kullanılabilir kısmi ikinci katla bir araya getiren NESTRA’nın en kapsamlı modelidir.",
      storyHeadline: "Alan büyüdükçe, yaşam da çeşitlenir.",
      storyDescription:
        "Horizon, geniş ortak yaşam alanlarını özel kullanım alanlarıyla dengeler. Kısmi ikinci kat, yaşamın farklı ihtiyaçlarına ayrı bir seviye kazandırırken ana kat iç-dış mekan ilişkisini güçlü biçimde sürdürür.",
      livingHeadline: "Daha geniş, daha açık, daha akışkan.",
      livingDescription:
        "Salon, mutfak ve yemek alanı geniş açıklıklarla teras ve peyzaja bağlanır. Horizon’ın ana yaşam alanı, büyük metrekareyi bölmek yerine açık ve dengeli bir akış içinde bir araya getirir.",
      editorialSections: [
        {
          eyebrow: "ÜST SEVİYE",
          headline: "Yukarıda, daha özel bir yaşam katmanı.",
          description:
            "Kısmi ikinci kat, ana yaşam alanından ayrışan daha sakin bir kullanım seviyesi sunar. Çalışma, dinlenme veya özel yaşam için ek alan yaratırken Horizon’ın yatay ana kütlesini korur.",
          mediaRole: "upper-level",
        },
        {
          eyebrow: "ÖZEL ALANLAR",
          headline: "Geniş yaşamın içinde daha sakin alanlar.",
          description:
            "Üç ayrı oda, günlük yaşamın farklı ihtiyaçlarına karşılık verirken ortak alanlardan bağımsız daha kişisel kullanım alanları oluşturur.",
          mediaRole: "private",
        },
        {
          eyebrow: "İÇ-DIŞ YAŞAM",
          headline: "Yaşam, terasla birlikte büyür.",
          description:
            "Panoramik açıklıklar ve geniş teras, ana yaşam alanını Akdeniz peyzajıyla kesintisiz biçimde ilişkilendirir.",
        },
      ],
      approachHeadline: "Horizon’ın yaşam karakteri.",
      layoutHeadline: "İki seviyede dengelenen yaşam.",
      layoutDescription:
        "Ana kattaki ortak ve özel alanlar ile kısmi üst seviye, Horizon’ın yaşam kurgusunu birbirini tamamlayan iki katmanda bir araya getirir.",
      features: [
        {
          title: "Panoramik açıklıklar",
          description:
            "Geniş cam yüzeylerle yaşam alanlarını çevre ve doğal ışıkla güçlü biçimde ilişkilendiren cephe yaklaşımı.",
        },
        {
          title: "Kısmi ikinci kat",
          description:
            "Ana yapının yatay karakterini bozmadan ek kullanım alanı sağlayan kontrollü üst seviye.",
        },
        {
          title: "3+1 esneklik",
          description:
            "Ortak yaşam, özel yaşam ve çalışma ihtiyaçlarını aynı yapı içinde dengeleyen geniş planlama.",
        },
        {
          title: "İç-dış süreklilik",
          description:
            "Teras, glazing ve peyzaj kararlarıyla iç mekanı açık yaşam alanlarına taşıyan kurgu.",
        },
      ],
      gallery: [
        {
          src: "/images/models/horizon/hero.webp",
          alt: "NESTRA Horizon'ın yatay ana kütlesi, panoramik cam yüzeyleri ve kullanılabilir kısmi ikinci katı",
          type: "exterior",
          role: "hero",
        },
        {
          src: "/images/models/horizon/secondary.webp",
          alt: "NESTRA Horizon'ın geniş terası, cam cephesi ve kısmi üst kat ilişkisi",
          type: "exterior",
          role: "exterior",
          displayAspect: "4/3",
        },
        {
          src: "/images/models/horizon/interior-living.webp",
          alt: "NESTRA Horizon'ın teras ve peyzajla ilişki kuran geniş ana yaşam alanı",
          type: "interior",
          role: "living",
        },
        {
          src: "/images/models/horizon/interior-upper-level.webp",
          alt: "NESTRA Horizon'ın kapalı kısmi üst katındaki özel yaşam alanı",
          type: "interior",
          role: "upper-level",
        },
        {
          src: "/images/models/horizon/interior-private-room.webp",
          alt: "NESTRA Horizon'ın sakin ve esnek kullanıma uygun özel odası",
          type: "interior",
          role: "private",
        },
        {
          src: "/images/models/horizon/material-detail.webp",
          alt: "NESTRA Horizon'ın doğal malzemelerini ve rafine iç mekan detaylarını gösteren yakın görünüm",
          type: "interior",
          role: "detail",
        },
        {
          src: "/images/models/horizon/plan-ground-floor.webp",
          alt: "NESTRA Horizon'ın zemin kattaki mekansal organizasyonunu gösteren yerleşim görseli",
          type: "plan",
          role: "plan-ground",
          label: "Zemin Kat",
        },
        {
          src: "/images/models/horizon/plan-partial-upper-floor.webp",
          alt: "NESTRA Horizon'ın kısmi üst katındaki mekansal organizasyonu gösteren yerleşim görseli",
          type: "plan",
          role: "plan-upper",
          label: "Kısmi Üst Kat",
        },
      ],
      ctaHeadline: "Horizon’ı size göre şekillendirelim.",
      ctaDescription:
        "İhtiyaçlarınızı paylaşın, NESTRA Horizon için yaşam kurgusunu birlikte oluşturalım.",
      seoTitle: "NESTRA Horizon | 132 m² Modüler Yaşam Alanı",
      seoDescription:
        "132 m², 3+1 planı ve kullanılabilir kısmi ikinci katıyla NESTRA Horizon’ı keşfedin.",
    },
  },
];

export function getModelBySlug(slug: string) {
  return models.find((model) => model.slug === slug);
}

export const modelsWithDetail = models.filter(
  (model): model is NestraModel & { detail: ModelDetail } =>
    model.detail !== undefined,
);

export function getDetailedModelBySlug(slug: string) {
  return modelsWithDetail.find((model) => model.slug === slug);
}

