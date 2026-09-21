# NESTRA

NESTRA, modern modüler yaşam alanları sunan kurgusal bir marka için geliştirilmiş web projesidir.

Proje; dinamik ürün sayfaları, scroll tabanlı etkileşimler, teklif formu ve içerik yönetimi sağlayan özel bir admin panelinden oluşur.

## Canlı Demo

[nestra-homes](https://nestra-homes.netlify.app)

## Özellikler

- Responsive public web sitesi
- Dinamik model kataloğu
- Dinamik model detay sayfaları
- Scroll-driven animasyonlar
- Sticky model showcase
- Model karşılaştırma alanı
- Teklif alma formu
- Hakkımızda sayfası
- Reduced motion desteği
- Admin paneli
- Model oluşturma ve düzenleme
- İçerik bölümlerini yönetme
- Görsel yükleme ve medya yönetimi
- Yayın / taslak kontrolü
- Öne çıkan model yönetimi
- Teklif taleplerini görüntüleme ve durum güncelleme
- Supabase Auth ve Storage entegrasyonu

## Teknolojiler

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Supabase
- Zod
- Next/Image
- ESLint

## Teknik Yapı

Proje Next.js App Router ile geliştirildi.

Public sayfalarda ağırlıklı olarak Server Components kullanılırken, etkileşim gerektiren alanlar Client Component olarak ayrıldı.

Model içerikleri, teklif talepleri ve admin işlemleri Supabase üzerinden yönetilir.

## Environment Variables

Projenin çalışması için proje kökünde `.env.local` dosyası oluşturulmalıdır.

Gerekli değişkenler:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## Kurulum

Bağımlılıkları yükleyin:

```bash
npm install
```

Development sunucusunu başlatın:

```bash
npm run dev
```

Production build için:

```bash
npm run build
```
