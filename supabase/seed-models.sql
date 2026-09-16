-- NESTRA mevcut statik model verisi. Supabase SQL Editor'de tamamını çalıştırın.
-- Kaynak: src/data/models.ts (SHA-256: df83f1fa6767550ed2c0fddc387c4bf1079fc930ce12271316307a06662dff6f)
-- Mevcut section sırası/ortak etiketler ve One yatak odası copy'si:
-- src/components/public/model-detail.tsx
-- Beklenen seed kapsamı: 4 model, 35 section, 27 benzersiz media.
-- One: 8/6; Loft: 8/7; Family: 9/6; Horizon: 10/8 (section/media).
-- Model summary = detail.shortDescription; level_label = detail.storeys.
-- Layout yalnız açıkça tanımlıysa saklanır; null mevcut renderer varsayılanıdır.
-- aspect_ratio yalnız gallery.displayAspect varsa aktarılır; responsive CSS oranı uydurulmaz.
-- Hero metadata: SEO, özgün liste alt metni, alan etiketi, gallery type/label/displayAspect.
-- Approach metadata: özellikler; layout metadata: plan rolleri. Yeni editorial içerik yoktur.
-- Horizon outdoor section'ının mediaRole alanı kaynakta yoktur: null korunur.
-- Tekrar çalıştırma bu dört modelin seed alanlarını günceller ve TÜM media kayıtlarını
-- yeniden oluşturur (media UUID'leri değişir). Diğer modeller etkilenmez.
-- Mevcut model/section UUID ve created_at korunur; seed dışı section'lar silinmez.
-- Şema, izin, RLS veya Storage değişikliği yapmaz. Uygulama bu SQL'i otomatik çalıştırmaz.

begin;

-- Aynı seed'in eşzamanlı çalıştırılmasını transaction süresince sıraya alır.
select pg_advisory_xact_lock(184723901, 20260912);

create temporary table _nestra_seed_models on commit drop as
select value as payload
from jsonb_array_elements($nestra_seed$
[
  {
    "name": "NESTRA One",
    "slug": "one",
    "area_sqm": 38,
    "rooms": "1+1",
    "keyword": "Sadelik",
    "level_label": "Tek kat",
    "summary": "NESTRA One, günlük yaşamın ihtiyaçlarını sade ve işlevsel bir plan içinde bir araya getiren kompakt yaşam modelidir.",
    "featured": false,
    "published": true,
    "sort_order": 1,
    "sections": [
      {
        "section_key": "hero",
        "eyebrow": "NESTRA ONE",
        "title": "Daha az alanda,\ndaha fazlası için.",
        "body": "NESTRA One, günlük yaşamın ihtiyaçlarını sade ve işlevsel bir plan içinde bir araya getiren kompakt yaşam modelidir.",
        "layout": null,
        "metadata": {
          "mediaRole": "hero",
          "heroImage": "/images/models/one/hero.png",
          "imageAlt": "NESTRA One'ın doğal orman peyzajındaki yatay ve geniş cam cepheli ahşap formu",
          "areaLabel": "38 m²",
          "seoTitle": "NESTRA One | 38 m² Modüler Yaşam Alanı",
          "seoDescription": "38 m² ve 1+1 planıyla NESTRA One’ı keşfedin. Kompakt yaşam için tasarlanan sade ve çağdaş modüler yaşam alanı.",
          "galleryMetadata": [
            {
              "src": "/images/models/one/hero.png",
              "role": "hero",
              "type": "exterior"
            },
            {
              "src": "/images/models/one/exterior-veranda.png",
              "role": "exterior",
              "type": "exterior"
            },
            {
              "src": "/images/models/one/interior-living.png",
              "role": "living",
              "type": "interior"
            },
            {
              "src": "/images/models/one/interior-bedroom.png",
              "role": "bedroom",
              "type": "interior"
            },
            {
              "src": "/images/models/one/material-detail.png",
              "role": "detail",
              "type": "interior"
            },
            {
              "src": "/images/models/one/plan-ground-floor-v2.png",
              "role": "plan",
              "type": "plan"
            }
          ]
        },
        "sort_order": 1
      },
      {
        "section_key": "story",
        "eyebrow": "NESTRA ONE",
        "title": "Sadelik, yaşam alanına dönüştüğünde.",
        "body": "NESTRA One, gereksiz alanlardan arındırılmış bir yaşam kurgusu sunar. Açık yaşam alanı, doğal ışıkla kurduğu ilişki ve kompakt planlamasıyla günlük ihtiyaçları yalın bir mimari içinde bir araya getirir.",
        "layout": null,
        "metadata": {
          "mediaRole": "exterior"
        },
        "sort_order": 2
      },
      {
        "section_key": "specifications",
        "eyebrow": "TEMEL BİLGİLER",
        "title": null,
        "body": null,
        "layout": null,
        "metadata": {
          "items": [
            {
              "value": "38 m²",
              "label": "Alan"
            },
            {
              "value": "1+1",
              "label": "Plan"
            },
            {
              "value": "Tek kat",
              "label": "Yapı"
            },
            {
              "value": "Sadelik",
              "label": "Karakter"
            }
          ]
        },
        "sort_order": 3
      },
      {
        "section_key": "living",
        "eyebrow": "YAŞAM",
        "title": "Kompakt, ama kısıtlı değil.",
        "body": "Yaşam alanı, mutfak ve dinlenme bölümleri arasında kurulan açık ilişki; küçük metrekareyi daha ferah ve kullanışlı bir deneyime dönüştürür.",
        "layout": null,
        "metadata": {
          "mediaRole": "living"
        },
        "sort_order": 4
      },
      {
        "section_key": "bedroom",
        "eyebrow": "ÖZEL ALAN",
        "title": "Günün ritminden uzaklaşan sakin bir alan.",
        "body": "Yatak odası, doğal ışık ve yalın malzeme diliyle kompakt plan içinde sakin ve kişisel bir yaşam alanı oluşturur.",
        "layout": "split",
        "metadata": {
          "mediaRole": "bedroom",
          "sourceFile": "src/components/public/model-detail.tsx"
        },
        "sort_order": 5
      },
      {
        "section_key": "approach",
        "eyebrow": "MODEL YAKLAŞIMI",
        "title": "One’ın yaşam karakteri.",
        "body": null,
        "layout": null,
        "metadata": {
          "features": [
            {
              "title": "Kompakt planlama",
              "description": "Günlük yaşam ihtiyaçlarını minimum alan kaybıyla bir araya getiren düzen."
            },
            {
              "title": "İç-dış ilişki",
              "description": "Geniş cam açıklıklarıyla yaşam alanını teras ve çevreyle buluşturan yaklaşım."
            },
            {
              "title": "Doğal malzeme dili",
              "description": "Ahşap, koyu metal ve sakin yüzeylerle kurulan sıcak mimari karakter."
            },
            {
              "title": "Tek katlı yaşam",
              "description": "Günlük kullanımı tek seviyede toplayan yalın mekânsal kurgu."
            }
          ],
          "mediaRole": "detail"
        },
        "sort_order": 6
      },
      {
        "section_key": "layout",
        "eyebrow": "YERLEŞİM",
        "title": "38 m² içinde dengeli bir yaşam kurgusu.",
        "body": "Açık yaşam alanı, özel alanlar ve teras ilişkisi kompakt plan içinde sade ve işlevsel bir bütün oluşturur.",
        "layout": null,
        "metadata": {
          "mediaRoles": [
            "plan"
          ]
        },
        "sort_order": 7
      },
      {
        "section_key": "cta",
        "eyebrow": "NESTRA ONE",
        "title": "One’ı size göre şekillendirelim.",
        "body": "İhtiyaçlarınızı paylaşın, NESTRA One için birlikte bir başlangıç oluşturalım.",
        "layout": null,
        "metadata": {
          "href": "/teklif-al",
          "label": "Teklif Al"
        },
        "sort_order": 8
      }
    ],
    "media": [
      {
        "role": "hero",
        "src": "/images/models/one/hero.png",
        "alt_text": "NESTRA One'ın doğal peyzajla çevrili ahşap dış cephesi ve verandası",
        "aspect_ratio": null,
        "sort_order": 1
      },
      {
        "role": "exterior",
        "src": "/images/models/one/exterior-veranda.png",
        "alt_text": "NESTRA One'ın ahşap verandası, geniş cam açıklıkları ve doğal peyzajla ilişkisi",
        "aspect_ratio": null,
        "sort_order": 2
      },
      {
        "role": "living",
        "src": "/images/models/one/interior-living.png",
        "alt_text": "NESTRA One'ın doğal ışık alan açık yaşam, mutfak ve yemek alanı",
        "aspect_ratio": null,
        "sort_order": 3
      },
      {
        "role": "bedroom",
        "src": "/images/models/one/interior-bedroom.png",
        "alt_text": "NESTRA One'ın ahşap yüzeyli ve bahçeye açılan sakin yatak odası",
        "aspect_ratio": null,
        "sort_order": 4
      },
      {
        "role": "detail",
        "src": "/images/models/one/material-detail.png",
        "alt_text": "NESTRA One'ın ahşap, koyu metal, cam ve doğal tekstil malzeme detayı",
        "aspect_ratio": null,
        "sort_order": 5
      },
      {
        "role": "plan",
        "src": "/images/models/one/plan-ground-floor-v2.png",
        "alt_text": "NESTRA One'ın yaşam alanı, yatak odası, banyo ve teras ilişkisini gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 6
      }
    ]
  },
  {
    "name": "NESTRA Loft",
    "slug": "loft",
    "area_sqm": 54,
    "rooms": "1+1 + Loft",
    "keyword": "Yükseklik",
    "level_label": "Loft",
    "summary": "NESTRA Loft, çift yükseklikli yaşam alanı ve kullanılabilir loft katıyla kompakt yaşamı daha güçlü bir mekânsal deneyime dönüştürür.",
    "featured": false,
    "published": true,
    "sort_order": 2,
    "sections": [
      {
        "section_key": "hero",
        "eyebrow": "NESTRA LOFT",
        "title": "Yüksekliğin açtığı\nyeni bir yaşam.",
        "body": "NESTRA Loft, çift yükseklikli yaşam alanı ve kullanılabilir loft katıyla kompakt yaşamı daha güçlü bir mekânsal deneyime dönüştürür.",
        "layout": "split",
        "metadata": {
          "mediaRole": "hero",
          "heroImage": "/images/models/loft/hero.png",
          "imageAlt": "NESTRA Loft'un orman içinde yükselen çatısı ve çift yükseklikte cam cephesi",
          "areaLabel": "54 m²",
          "seoTitle": "NESTRA Loft | 54 m² Modüler Yaşam Alanı",
          "seoDescription": "54 m², 1+1 + Loft planı ve çift yükseklikli yaşam alanıyla NESTRA Loft’u keşfedin.",
          "galleryMetadata": [
            {
              "src": "/images/models/loft/hero.png",
              "role": "hero",
              "type": "exterior"
            },
            {
              "src": "/images/models/loft/exterior-deck.png",
              "role": "exterior",
              "type": "exterior"
            },
            {
              "src": "/images/models/loft/interior-living-double-height.png",
              "role": "living",
              "type": "interior"
            },
            {
              "src": "/images/models/loft/interior-loft-level.png",
              "role": "loft",
              "type": "interior"
            },
            {
              "src": "/images/models/loft/material-detail.png",
              "role": "detail",
              "type": "interior"
            },
            {
              "src": "/images/models/loft/plan-ground-floor.png",
              "role": "plan-ground",
              "type": "plan",
              "label": "Zemin kat"
            },
            {
              "src": "/images/models/loft/plan-loft-floor.png",
              "role": "plan-loft",
              "type": "plan",
              "label": "Loft seviyesi"
            }
          ]
        },
        "sort_order": 1
      },
      {
        "section_key": "story",
        "eyebrow": "NESTRA LOFT",
        "title": "Alan yalnızca metrekareyle ölçülmez.",
        "body": "NESTRA Loft, yaşam alanını yalnızca yatayda değil dikeyde de genişleten bir kurgu sunar. Çift yükseklikli ana hacim ve loft seviyesi, kompakt ölçüler içinde daha açık, ferah ve katmanlı bir yaşam deneyimi oluşturur.",
        "layout": null,
        "metadata": {
          "mediaRole": "exterior"
        },
        "sort_order": 2
      },
      {
        "section_key": "specifications",
        "eyebrow": "TEMEL BİLGİLER",
        "title": null,
        "body": null,
        "layout": null,
        "metadata": {
          "items": [
            {
              "value": "54 m²",
              "label": "Alan"
            },
            {
              "value": "1+1 + Loft",
              "label": "Plan"
            },
            {
              "value": "Loft",
              "label": "Yapı"
            },
            {
              "value": "Yükseklik",
              "label": "Karakter"
            }
          ]
        },
        "sort_order": 3
      },
      {
        "section_key": "living",
        "eyebrow": "YAŞAM",
        "title": "Dikeyde büyüyen bir hacim.",
        "body": "Ana yaşam alanındaki çift yükseklik, doğal ışığı ve mekânsal derinliği güçlendirirken loft seviyesi yaşam alanına ikinci bir katman ekler.",
        "layout": null,
        "metadata": {
          "mediaRole": "living"
        },
        "sort_order": 4
      },
      {
        "section_key": "loft",
        "eyebrow": "LOFT",
        "title": "Yukarıda, yaşamın ikinci katmanı.",
        "body": "Kullanılabilir loft seviyesi, ana yaşam alanıyla görsel ilişki kurarken dinlenme, çalışma veya kişisel kullanım için ayrı bir alan tanımlar.",
        "layout": null,
        "metadata": {
          "mediaRole": "loft",
          "sourceField": "distinctiveSection"
        },
        "sort_order": 5
      },
      {
        "section_key": "approach",
        "eyebrow": "MODEL YAKLAŞIMI",
        "title": "Loft’un yaşam karakteri.",
        "body": null,
        "layout": null,
        "metadata": {
          "features": [
            {
              "title": "Çift yükseklik",
              "description": "Ana yaşam alanında daha güçlü hacim ve doğal ışık hissi."
            },
            {
              "title": "Kullanılabilir loft",
              "description": "Yaşam alanına ikinci bir kullanım seviyesi ekleyen gerçek loft kurgusu."
            },
            {
              "title": "Dikey mekân ilişkisi",
              "description": "Alt ve üst seviyeler arasında görsel süreklilik sağlayan açık plan yaklaşımı."
            },
            {
              "title": "Doğal malzeme dili",
              "description": "Ahşap, koyu metal ve sıcak yüzeylerle dengelenen çağdaş mimari karakter."
            }
          ],
          "mediaRole": "detail"
        },
        "sort_order": 6
      },
      {
        "section_key": "layout",
        "eyebrow": "YERLEŞİM",
        "title": "İki seviyede katmanlanan yaşam.",
        "body": "Zemin kattaki açık yaşam alanı ile kısmi loft seviyesi, çift yükseklikli ana hacim etrafında birbirine bağlanır.",
        "layout": null,
        "metadata": {
          "mediaRoles": [
            "plan-ground",
            "plan-loft"
          ]
        },
        "sort_order": 7
      },
      {
        "section_key": "cta",
        "eyebrow": "NESTRA LOFT",
        "title": "Loft’u size göre şekillendirelim.",
        "body": "İhtiyaçlarınızı paylaşın, NESTRA Loft için yaşam kurgusunu birlikte oluşturalım.",
        "layout": null,
        "metadata": {
          "href": "/teklif-al",
          "label": "Teklif Al"
        },
        "sort_order": 8
      }
    ],
    "media": [
      {
        "role": "hero",
        "src": "/images/models/loft/hero.png",
        "alt_text": "NESTRA Loft'un yükselen tek eğimli çatısı, çift yükseklikte cam cephesi ve orman içindeki ahşap terası",
        "aspect_ratio": null,
        "sort_order": 1
      },
      {
        "role": "exterior",
        "src": "/images/models/loft/exterior-deck.png",
        "alt_text": "NESTRA Loft'un ahşap deck alanı, koyu dış cephesi ve çift yükseklikte cam köşesi",
        "aspect_ratio": null,
        "sort_order": 2
      },
      {
        "role": "living",
        "src": "/images/models/loft/interior-living-double-height.png",
        "alt_text": "NESTRA Loft'un çift yükseklikli yaşam alanı, açık mutfağı ve üst loft seviyesi",
        "aspect_ratio": null,
        "sort_order": 3
      },
      {
        "role": "loft",
        "src": "/images/models/loft/interior-loft-level.png",
        "alt_text": "NESTRA Loft'un kullanılabilir üst seviyesi ve aşağıdaki yaşam alanıyla görsel ilişkisi",
        "aspect_ratio": null,
        "sort_order": 4
      },
      {
        "role": "detail",
        "src": "/images/models/loft/material-detail.png",
        "alt_text": "NESTRA Loft'un ahşap, koyu metal ve cam birleşimini gösteren eşik detayı",
        "aspect_ratio": null,
        "sort_order": 5
      },
      {
        "role": "plan-ground",
        "src": "/images/models/loft/plan-ground-floor.png",
        "alt_text": "NESTRA Loft'un zemin kattaki açık yaşam alanı, yatak odası ve deck ilişkisini gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 6
      },
      {
        "role": "plan-loft",
        "src": "/images/models/loft/plan-loft-floor.png",
        "alt_text": "NESTRA Loft'un üst seviyesi ile çift yükseklikli ana hacim ilişkisini gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 7
      }
    ]
  },
  {
    "name": "NESTRA Family",
    "slug": "family",
    "area_sqm": 76,
    "rooms": "2+1",
    "keyword": "Birliktelik",
    "level_label": "Tek kat",
    "summary": "NESTRA Family, ortak yaşam alanlarını özel alanlarla dengede tutan 2+1 planıyla günlük aile yaşamına daha geniş ve esnek bir zemin sunar.",
    "featured": false,
    "published": true,
    "sort_order": 3,
    "sections": [
      {
        "section_key": "hero",
        "eyebrow": "NESTRA FAMİLY",
        "title": "Birlikte yaşamaya\ndaha fazla alan.",
        "body": "NESTRA Family, ortak yaşam alanlarını özel alanlarla dengede tutan 2+1 planıyla günlük aile yaşamına daha geniş ve esnek bir zemin sunar.",
        "layout": "family",
        "metadata": {
          "mediaRole": "hero",
          "heroImage": "/images/models/family/hero.png",
          "imageAlt": "NESTRA Family'nin bağlantılı ahşap hacimleri ve geniş sosyal verandası",
          "areaLabel": "76 m²",
          "seoTitle": "NESTRA Family | 76 m² Modüler Yaşam Alanı",
          "seoDescription": "76 m² ve 2+1 planıyla NESTRA Family’yi keşfedin. Ortak yaşam ile kişisel alanları dengeleyen tek katlı modüler yaşam alanı.",
          "galleryMetadata": [
            {
              "src": "/images/models/family/hero.png",
              "role": "hero",
              "type": "exterior"
            },
            {
              "src": "/images/models/family/interior-living.png",
              "role": "living",
              "type": "interior"
            },
            {
              "src": "/images/models/family/interior-private-room-v2.png",
              "role": "private",
              "type": "interior"
            },
            {
              "src": "/images/models/family/exterior-terrace.png",
              "role": "outdoor",
              "type": "exterior"
            },
            {
              "src": "/images/models/family/material-detail.png",
              "role": "detail",
              "type": "interior"
            },
            {
              "src": "/images/models/family/plan-ground-floor.png",
              "role": "plan-ground",
              "type": "plan"
            }
          ]
        },
        "sort_order": 1
      },
      {
        "section_key": "story",
        "eyebrow": "NESTRA FAMİLY",
        "title": "Birlikte geçirilen zaman için tasarlandı.",
        "body": "NESTRA Family, ortak yaşamı merkeze alırken kişisel alanları da koruyan dengeli bir yerleşim sunar. Salon, mutfak ve yemek alanı günlük yaşamın buluşma noktası olurken iki ayrı oda daha uzun süreli ve esnek kullanıma alan açar.",
        "layout": "split",
        "metadata": {
          "mediaRole": null
        },
        "sort_order": 2
      },
      {
        "section_key": "specifications",
        "eyebrow": "TEMEL BİLGİLER",
        "title": null,
        "body": null,
        "layout": null,
        "metadata": {
          "items": [
            {
              "value": "76 m²",
              "label": "Alan"
            },
            {
              "value": "2+1",
              "label": "Plan"
            },
            {
              "value": "Tek kat",
              "label": "Yapı"
            },
            {
              "value": "Birliktelik",
              "label": "Karakter"
            }
          ]
        },
        "sort_order": 3
      },
      {
        "section_key": "living",
        "eyebrow": "YAŞAM",
        "title": "Ortak yaşamın merkezinde.",
        "body": "Açık mutfak, yemek ve oturma alanı aynı yaşam aksında buluşurken geniş açıklıklar iç mekânı teras ve bahçeyle ilişkilendirir.",
        "layout": null,
        "metadata": {
          "mediaRole": "living"
        },
        "sort_order": 4
      },
      {
        "section_key": "private",
        "eyebrow": "ÖZEL ALANLAR",
        "title": "Birlikte yaşarken, kendine ait alanlar.",
        "body": "İki ayrı oda, aile yaşamı içinde dinlenme, çalışma veya kişisel kullanım için daha sakin alanlar oluşturur.",
        "layout": "split",
        "metadata": {
          "mediaRole": "private",
          "sourceField": "editorialSections",
          "sourceIndex": 0
        },
        "sort_order": 5
      },
      {
        "section_key": "outdoor",
        "eyebrow": "İÇ-DIŞ YAŞAM",
        "title": "Yaşam alanı bahçeyle devam eder.",
        "body": "Geniş açıklıklar ve teras kurgusu, ortak yaşam alanını dış mekânla kesintisiz bir ilişki içinde genişletir.",
        "layout": "wide",
        "metadata": {
          "mediaRole": "outdoor",
          "sourceField": "editorialSections",
          "sourceIndex": 1
        },
        "sort_order": 6
      },
      {
        "section_key": "approach",
        "eyebrow": "MODEL YAKLAŞIMI",
        "title": "Family’nin yaşam karakteri.",
        "body": null,
        "layout": null,
        "metadata": {
          "features": [
            {
              "title": "Ortak yaşam",
              "description": "Salon, yemek ve mutfak alanlarını günlük yaşamın merkezinde bir araya getiren kurgu."
            },
            {
              "title": "2+1 esneklik",
              "description": "Aile yaşamı, çalışma veya misafir kullanımı için iki ayrı özel alan."
            },
            {
              "title": "İç-dış ilişki",
              "description": "Geniş açıklıklar ve terasla ortak yaşam alanını bahçeye taşıyan yaklaşım."
            },
            {
              "title": "Tek katlı kullanım",
              "description": "Günlük yaşamı tek seviyede toplayan rahat ve erişilebilir mekânsal düzen."
            }
          ],
          "mediaRole": "detail"
        },
        "sort_order": 7
      },
      {
        "section_key": "layout",
        "eyebrow": "YERLEŞİM",
        "title": "76 m² içinde dengeli bir aile yaşamı.",
        "body": "Ortak yaşam alanı, iki ayrı özel oda ve teras ilişkisi tek katlı plan içinde dengeli bir bütün oluşturur.",
        "layout": null,
        "metadata": {
          "mediaRoles": [
            "plan-ground"
          ]
        },
        "sort_order": 8
      },
      {
        "section_key": "cta",
        "eyebrow": "NESTRA FAMİLY",
        "title": "Family’yi size göre şekillendirelim.",
        "body": "İhtiyaçlarınızı paylaşın, NESTRA Family için yaşam kurgusunu birlikte oluşturalım.",
        "layout": null,
        "metadata": {
          "href": "/teklif-al",
          "label": "Teklif Al"
        },
        "sort_order": 9
      }
    ],
    "media": [
      {
        "role": "hero",
        "src": "/images/models/family/hero.png",
        "alt_text": "NESTRA Family'nin bağlantılı ahşap hacimleri, geniş cam açıklıkları ve ortak yaşam terası",
        "aspect_ratio": null,
        "sort_order": 1
      },
      {
        "role": "living",
        "src": "/images/models/family/interior-living.png",
        "alt_text": "NESTRA Family'nin açık mutfak, yemek ve oturma alanını bir araya getiren ortak yaşam mekânı",
        "aspect_ratio": null,
        "sort_order": 2
      },
      {
        "role": "private",
        "src": "/images/models/family/interior-private-room-v2.png",
        "alt_text": "NESTRA Family'nin bahçeye açılan, çalışma ve dinlenme kullanımını bir araya getiren özel odası",
        "aspect_ratio": null,
        "sort_order": 3
      },
      {
        "role": "outdoor",
        "src": "/images/models/family/exterior-terrace.png",
        "alt_text": "NESTRA Family'nin ortak yaşam alanını bahçe ve açık yemek terasıyla buluşturan cephesi",
        "aspect_ratio": null,
        "sort_order": 4
      },
      {
        "role": "detail",
        "src": "/images/models/family/material-detail.png",
        "alt_text": "NESTRA Family'nin ahşap yüzey, koyu metal çerçeve ve teras eşiği detayı",
        "aspect_ratio": null,
        "sort_order": 5
      },
      {
        "role": "plan-ground",
        "src": "/images/models/family/plan-ground-floor.png",
        "alt_text": "NESTRA Family'nin ortak yaşam alanı, iki özel odası ve teras ilişkisini gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 6
      }
    ]
  },
  {
    "name": "NESTRA Horizon",
    "slug": "horizon",
    "area_sqm": 132,
    "rooms": "3+1",
    "keyword": "Ufuk",
    "level_label": "Kısmi ikinci kat",
    "summary": "NESTRA Horizon, geniş yaşam alanlarını panoramik açıklıklar ve kullanılabilir kısmi ikinci katla bir araya getiren NESTRA’nın en kapsamlı modelidir.",
    "featured": true,
    "published": true,
    "sort_order": 4,
    "sections": [
      {
        "section_key": "hero",
        "eyebrow": "NESTRA HORİZON",
        "title": "Ufka açılan daha geniş bir yaşam.",
        "body": "NESTRA Horizon, geniş yaşam alanlarını panoramik açıklıklar ve kullanılabilir kısmi ikinci katla bir araya getiren NESTRA’nın en kapsamlı modelidir.",
        "layout": "horizon",
        "metadata": {
          "mediaRole": "hero",
          "heroImage": "/images/models/horizon/hero.png",
          "imageAlt": "NESTRA Horizon'ın panoramik cam cepheli yatay ana kütlesi ve kısmi üst katı",
          "areaLabel": "132 m²",
          "seoTitle": "NESTRA Horizon | 132 m² Modüler Yaşam Alanı",
          "seoDescription": "132 m², 3+1 planı ve kullanılabilir kısmi ikinci katıyla NESTRA Horizon’ı keşfedin.",
          "galleryMetadata": [
            {
              "src": "/images/models/horizon/hero.png",
              "role": "hero",
              "type": "exterior"
            },
            {
              "src": "/images/models/horizon/secondary.png",
              "role": "exterior",
              "type": "exterior",
              "displayAspect": "4/3"
            },
            {
              "src": "/images/models/horizon/interior-living.png",
              "role": "living",
              "type": "interior"
            },
            {
              "src": "/images/models/horizon/interior-upper-level.png",
              "role": "upper-level",
              "type": "interior"
            },
            {
              "src": "/images/models/horizon/interior-private-room.png",
              "role": "private",
              "type": "interior"
            },
            {
              "src": "/images/models/horizon/material-detail.png",
              "role": "detail",
              "type": "interior"
            },
            {
              "src": "/images/models/horizon/plan-ground-floor.png",
              "role": "plan-ground",
              "type": "plan",
              "label": "Zemin Kat"
            },
            {
              "src": "/images/models/horizon/plan-partial-upper-floor.png",
              "role": "plan-upper",
              "type": "plan",
              "label": "Kısmi Üst Kat"
            }
          ]
        },
        "sort_order": 1
      },
      {
        "section_key": "story",
        "eyebrow": "NESTRA HORİZON",
        "title": "Alan büyüdükçe, yaşam da çeşitlenir.",
        "body": "Horizon, geniş ortak yaşam alanlarını özel kullanım alanlarıyla dengeler. Kısmi ikinci kat, yaşamın farklı ihtiyaçlarına ayrı bir seviye kazandırırken ana kat iç-dış mekân ilişkisini güçlü biçimde sürdürür.",
        "layout": null,
        "metadata": {
          "mediaRole": "exterior"
        },
        "sort_order": 2
      },
      {
        "section_key": "specifications",
        "eyebrow": "TEMEL BİLGİLER",
        "title": null,
        "body": null,
        "layout": null,
        "metadata": {
          "items": [
            {
              "value": "132 m²",
              "label": "Alan"
            },
            {
              "value": "3+1",
              "label": "Plan"
            },
            {
              "value": "Kısmi ikinci kat",
              "label": "Yapı"
            },
            {
              "value": "Ufuk",
              "label": "Karakter"
            }
          ]
        },
        "sort_order": 3
      },
      {
        "section_key": "living",
        "eyebrow": "YAŞAM",
        "title": "Daha geniş, daha açık, daha akışkan.",
        "body": "Salon, mutfak ve yemek alanı geniş açıklıklarla teras ve peyzaja bağlanır. Horizon’ın ana yaşam alanı, büyük metrekareyi bölmek yerine açık ve dengeli bir akış içinde bir araya getirir.",
        "layout": null,
        "metadata": {
          "mediaRole": "living"
        },
        "sort_order": 4
      },
      {
        "section_key": "upper-level",
        "eyebrow": "ÜST SEVİYE",
        "title": "Yukarıda, daha özel bir yaşam katmanı.",
        "body": "Kısmi ikinci kat, ana yaşam alanından ayrışan daha sakin bir kullanım seviyesi sunar. Çalışma, dinlenme veya özel yaşam için ek alan yaratırken Horizon’ın yatay ana kütlesini korur.",
        "layout": null,
        "metadata": {
          "mediaRole": "upper-level",
          "sourceField": "editorialSections",
          "sourceIndex": 0
        },
        "sort_order": 5
      },
      {
        "section_key": "private",
        "eyebrow": "ÖZEL ALANLAR",
        "title": "Geniş yaşamın içinde daha sakin alanlar.",
        "body": "Üç ayrı oda, günlük yaşamın farklı ihtiyaçlarına karşılık verirken ortak alanlardan bağımsız daha kişisel kullanım alanları oluşturur.",
        "layout": null,
        "metadata": {
          "mediaRole": "private",
          "sourceField": "editorialSections",
          "sourceIndex": 1
        },
        "sort_order": 6
      },
      {
        "section_key": "outdoor",
        "eyebrow": "İÇ-DIŞ YAŞAM",
        "title": "Yaşam, terasla birlikte büyür.",
        "body": "Panoramik açıklıklar ve geniş teras, ana yaşam alanını Akdeniz peyzajıyla kesintisiz biçimde ilişkilendirir.",
        "layout": null,
        "metadata": {
          "mediaRole": null,
          "sourceField": "editorialSections",
          "sourceIndex": 2
        },
        "sort_order": 7
      },
      {
        "section_key": "approach",
        "eyebrow": "MODEL YAKLAŞIMI",
        "title": "Horizon’ın yaşam karakteri.",
        "body": null,
        "layout": null,
        "metadata": {
          "features": [
            {
              "title": "Panoramik açıklıklar",
              "description": "Geniş cam yüzeylerle yaşam alanlarını çevre ve doğal ışıkla güçlü biçimde ilişkilendiren cephe yaklaşımı."
            },
            {
              "title": "Kısmi ikinci kat",
              "description": "Ana yapının yatay karakterini bozmadan ek kullanım alanı sağlayan kontrollü üst seviye."
            },
            {
              "title": "3+1 esneklik",
              "description": "Ortak yaşam, özel yaşam ve çalışma ihtiyaçlarını aynı yapı içinde dengeleyen geniş planlama."
            },
            {
              "title": "İç-dış süreklilik",
              "description": "Teras, glazing ve peyzaj kararlarıyla iç mekânı açık yaşam alanlarına taşıyan kurgu."
            }
          ],
          "mediaRole": "detail"
        },
        "sort_order": 8
      },
      {
        "section_key": "layout",
        "eyebrow": "YERLEŞİM",
        "title": "İki seviyede dengelenen yaşam.",
        "body": "Ana kattaki ortak ve özel alanlar ile kısmi üst seviye, Horizon’ın yaşam kurgusunu birbirini tamamlayan iki katmanda bir araya getirir.",
        "layout": null,
        "metadata": {
          "mediaRoles": [
            "plan-ground",
            "plan-upper"
          ]
        },
        "sort_order": 9
      },
      {
        "section_key": "cta",
        "eyebrow": "NESTRA HORİZON",
        "title": "Horizon’ı size göre şekillendirelim.",
        "body": "İhtiyaçlarınızı paylaşın, NESTRA Horizon için yaşam kurgusunu birlikte oluşturalım.",
        "layout": null,
        "metadata": {
          "href": "/teklif-al",
          "label": "Teklif Al"
        },
        "sort_order": 10
      }
    ],
    "media": [
      {
        "role": "hero",
        "src": "/images/models/horizon/hero.png",
        "alt_text": "NESTRA Horizon'ın yatay ana kütlesi, panoramik cam yüzeyleri ve kullanılabilir kısmi ikinci katı",
        "aspect_ratio": null,
        "sort_order": 1
      },
      {
        "role": "exterior",
        "src": "/images/models/horizon/secondary.png",
        "alt_text": "NESTRA Horizon'ın geniş terası, cam cephesi ve kısmi üst kat ilişkisi",
        "aspect_ratio": "4/3",
        "sort_order": 2
      },
      {
        "role": "living",
        "src": "/images/models/horizon/interior-living.png",
        "alt_text": "NESTRA Horizon'ın teras ve peyzajla ilişki kuran geniş ana yaşam alanı",
        "aspect_ratio": null,
        "sort_order": 3
      },
      {
        "role": "upper-level",
        "src": "/images/models/horizon/interior-upper-level.png",
        "alt_text": "NESTRA Horizon'ın kapalı kısmi üst katındaki özel yaşam alanı",
        "aspect_ratio": null,
        "sort_order": 4
      },
      {
        "role": "private",
        "src": "/images/models/horizon/interior-private-room.png",
        "alt_text": "NESTRA Horizon'ın sakin ve esnek kullanıma uygun özel odası",
        "aspect_ratio": null,
        "sort_order": 5
      },
      {
        "role": "detail",
        "src": "/images/models/horizon/material-detail.png",
        "alt_text": "NESTRA Horizon'ın doğal malzemelerini ve rafine iç mekân detaylarını gösteren yakın görünüm",
        "aspect_ratio": null,
        "sort_order": 6
      },
      {
        "role": "plan-ground",
        "src": "/images/models/horizon/plan-ground-floor.png",
        "alt_text": "NESTRA Horizon'ın zemin kattaki mekânsal organizasyonunu gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 7
      },
      {
        "role": "plan-upper",
        "src": "/images/models/horizon/plan-partial-upper-floor.png",
        "alt_text": "NESTRA Horizon'ın kısmi üst katındaki mekânsal organizasyonu gösteren yerleşim görseli",
        "aspect_ratio": null,
        "sort_order": 8
      }
    ]
  }
]
$nestra_seed$::jsonb);

insert into public.models (
  id, name, slug, area_sqm, rooms, keyword, level_label, summary,
  featured, published, sort_order, created_at, updated_at
)
select gen_random_uuid(), p->>'name', p->>'slug', (p->>'area_sqm')::integer,
  p->>'rooms', p->>'keyword', p->>'level_label', p->>'summary',
  (p->>'featured')::boolean, true, (p->>'sort_order')::integer, now(), now()
from (select payload as p from pg_temp._nestra_seed_models) source
where true
on conflict (slug) do update set
  name = excluded.name, area_sqm = excluded.area_sqm, rooms = excluded.rooms,
  keyword = excluded.keyword, level_label = excluded.level_label, summary = excluded.summary,
  featured = excluded.featured, published = excluded.published, sort_order = excluded.sort_order,
  updated_at = excluded.updated_at;

insert into public.model_sections (
  id, model_id, section_key, eyebrow, title, body, layout, metadata,
  sort_order, created_at, updated_at
)
select gen_random_uuid(), m.id, s->>'section_key', s->>'eyebrow', s->>'title',
  s->>'body', s->>'layout', s->'metadata', (s->>'sort_order')::integer, now(), now()
from pg_temp._nestra_seed_models seed
join public.models m on m.slug = seed.payload->>'slug'
cross join lateral jsonb_array_elements(seed.payload->'sections') as section(s)
where true
on conflict (model_id, section_key) do update set
  eyebrow = excluded.eyebrow, title = excluded.title, body = excluded.body,
  layout = excluded.layout, metadata = excluded.metadata,
  sort_order = excluded.sort_order, updated_at = excluded.updated_at;

-- Yalnız payload'daki one, loft, family, horizon modellerinin media kayıtları.
delete from public.model_media media
using public.models m, pg_temp._nestra_seed_models seed
where media.model_id = m.id and m.slug = seed.payload->>'slug';

insert into public.model_media (
  id, model_id, role, src, alt_text, aspect_ratio, sort_order, created_at
)
select gen_random_uuid(), m.id, image->>'role', image->>'src', image->>'alt_text',
  image->>'aspect_ratio', (image->>'sort_order')::integer, now()
from pg_temp._nestra_seed_models seed
join public.models m on m.slug = seed.payload->>'slug'
cross join lateral jsonb_array_elements(seed.payload->'media') as media(image);

-- Beklenen kayıtlar yoksa commit yerine hata ver; transaction yarım kalmasın.
do $verify$
begin
  if (select count(*) from public.models m join pg_temp._nestra_seed_models s
      on m.slug = s.payload->>'slug') <> 4 then
    raise exception 'NESTRA seed: expected 4 models';
  end if;
  if (select count(*) from pg_temp._nestra_seed_models seed
      join public.models m on m.slug = seed.payload->>'slug'
      cross join lateral jsonb_array_elements(seed.payload->'sections') as expected(s)
      join public.model_sections actual on actual.model_id = m.id
        and actual.section_key = s->>'section_key') <> 35 then
    raise exception 'NESTRA seed: expected 35 seeded sections';
  end if;
  if (select count(*) from public.model_media media
      join public.models m on m.id = media.model_id
      join pg_temp._nestra_seed_models s on m.slug = s.payload->>'slug') <> 27 then
    raise exception 'NESTRA seed: expected 27 media rows';
  end if;
end;
$verify$;

-- Sonuç özeti yalnız bu dört model içindir; mevcut ek section'lar varsa sayıya dahildir.
select m.name, m.slug,
  (select count(*) from public.model_sections s where s.model_id = m.id) as section_count,
  (select count(*) from public.model_media i where i.model_id = m.id) as media_count
from public.models m join pg_temp._nestra_seed_models seed on m.slug = seed.payload->>'slug'
order by m.sort_order;

commit;
