import { EditorialSequence, EditorialText } from "@/components/public/editorial-sequence";
import { EditorialHeading } from "@/components/public/editorial-heading";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ScrollImageReveal } from "@/components/public/scroll-image-reveal";
import { ModelDetailReveal } from "@/components/public/model-detail-reveal";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "NESTRA’nın çağdaş modüler yaşam alanlarına, doğal malzemelere ve işlevsel mimariye dayanan tasarım yaklaşımını keşfedin.",
};

const principles = [
  {
    index: "01",
    title: "İhtiyaçtan başlayan planlama",
    description:
      "Her alan, günlük kullanım biçimleri ve gerçek yaşam ihtiyaçları üzerinden şekillenir.",
  },
  {
    index: "02",
    title: "Doğal malzeme dengesi",
    description:
      "Ahşap, taş, metal ve cam; yalnızca görünüşleri için değil, birlikte kurdukları atmosfer için kullanılır.",
  },
  {
    index: "03",
    title: "İç ve dış arasında süreklilik",
    description:
      "Geniş açıklıklar, teraslar ve peyzaj ilişkisi yaşam alanının sınırlarını daha geçirgen hale getirir.",
  },
  {
    index: "04",
    title: "Gereksiz olandan arınmak",
    description:
      "Mimariyi gösterişli hale getirmek yerine oran, ışık, malzeme ve detay kalitesine odaklanırız.",
  },
] as const;

const modelIdentities = [
  { name: "One", identity: "Sadelik" },
  { name: "Loft", identity: "Yükseklik" },
  { name: "Family", identity: "Birliktelik" },
  { name: "Horizon", identity: "Ufuk" },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-charcoal/10 bg-warm-ivory px-5 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12 lg:pb-36 lg:pt-48">
        <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-9 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            HAKKIMIZDA
          </p>
          <div className="lg:col-span-9">
            <h1 className="max-w-[13ch] font-serif text-[clamp(3.25rem,6.4vw,6.9rem)] leading-[0.94] tracking-[-0.04em] text-charcoal lg:max-w-[20ch] xl:max-w-[22ch]">
              Yaşam alanlarını, yaşamın kendisinden başlayarak tasarlıyoruz.
            </h1>
            <div className="mt-10 grid sm:mt-12 lg:mt-8 lg:grid-cols-9">
              <p className="max-w-2xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-7 lg:col-start-3 lg:max-w-[44rem] lg:text-xl lg:leading-[2.125rem]">
                NESTRA, değişen yaşam biçimlerine uyum sağlayan çağdaş yaşam
                alanları tasarlar. Doğal malzemeleri, işlevsel planlamayı ve
                mimari sadeliği bir araya getirir.
              </p>
            </div>
          </div>
        </ModelDetailReveal>
      </section>

      <section className="border-b border-charcoal/10 bg-soft-white px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <EditorialSequence flowing className="mx-auto w-full max-w-[1440px]">
          <EditorialText start={0.02} className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
              MARKA YAKLAŞIMI
            </p>
            <div className="lg:col-span-8 lg:col-start-4">
              <h2 className="max-w-[11ch] font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                Daha büyük değil, daha doğru alanlar.
              </h2>
              <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-8 lg:gap-x-8">
                <p className="text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-4">
                  Bizim için iyi bir yaşam alanı yalnızca metrekareyle
                  tanımlanmaz. Gün ışığının içeri nasıl girdiği, odaların
                  birbirine nasıl bağlandığı, dışarıyla kurulan ilişki ve her
                  detayın günlük yaşama ne kattığı önemlidir.
                </p>
                <p className="text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-4">
                  Bu nedenle her NESTRA modeli farklı bir yaşam ihtiyacından
                  yola çıkar. One’ın sadeliği, Loft’un yüksekliği, Family’nin
                  birlikteliği ve Horizon’ın açıklığı aynı tasarım anlayışının
                  farklı yorumlarıdır.
                </p>
              </div>
            </div>
          </EditorialText>

          <ScrollImageReveal
            polished lateral revealStart={0.48}
            className="relative mt-14 aspect-[3/2] overflow-hidden bg-stone sm:mt-16 lg:ml-[8.333%] lg:mt-20 lg:w-[91.667%]"
          >
            <Image
              src="/images/models/family/exterior-terrace.webp"
              alt="NESTRA Family'nin doğal peyzajla bütünleşen geniş terası ve yaşam alanları"
              fill
              quality={95}
              sizes="(min-width: 1536px) 1320px, (min-width: 1024px) 92vw, 100vw"
              className="object-cover object-center"
            />
          </ScrollImageReveal>
        </EditorialSequence>
      </section>

      <section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:pb-36 lg:pt-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
              TASARIM İLKELERİ
            </p>
            <h2 className="max-w-[11ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal lg:col-span-7 lg:col-start-4">
              Tasarıma yön veren dört ilke.
            </h2>
          </ModelDetailReveal>

          <ol className="mt-14 grid border-b border-charcoal/15 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li
                key={principle.index}
                className={`border-t border-charcoal/15 py-7 sm:min-h-64 sm:px-6 sm:py-8 lg:min-h-64 lg:px-7 lg:py-9 ${
                  index % 2 === 1 ? "sm:border-l" : ""
                } ${
                  index > 0
                    ? "lg:border-l lg:border-l-charcoal/[0.07]"
                    : "lg:pl-0"
                }`}
              >
                <ModelDetailReveal className="flex h-full flex-col">
                  <span className="text-[0.6875rem] tracking-[0.2em] text-warm-gray">
                    {principle.index}
                  </span>
                  <h3 className="mt-8 max-w-[15ch] text-xl font-medium leading-tight tracking-[-0.015em] text-charcoal sm:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-auto max-w-[19rem] pt-8 text-sm leading-6 text-warm-gray sm:text-base sm:leading-7 lg:mt-10 lg:pt-0 lg:text-[1.0625rem] lg:leading-[1.8] lg:text-charcoal/68">
                    {principle.description}
                  </p>
                </ModelDetailReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-soft-white/15 bg-charcoal px-5 py-24 text-soft-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <ModelDetailReveal className="grid gap-y-9 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-xs tracking-[0.2em] text-soft-white/50 lg:col-span-3 lg:pt-3">
              MODEL AİLESİ
            </p>
            <div className="lg:col-span-8 lg:col-start-4">
              <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.95] tracking-[-0.04em]">
                Aynı yaklaşım, dört farklı yaşam.
              </h2>
              <p className="mt-9 max-w-2xl text-base leading-7 text-soft-white/65 sm:mt-10 sm:text-lg sm:leading-8">
                NESTRA modelleri birbirinin küçük ya da büyük versiyonları
                değildir. Her biri farklı kullanım biçimi, mekansal karakter
                ve yaşam senaryosu için tasarlanır.
              </p>
            </div>
          </ModelDetailReveal>

          <div className="mt-14 border-b border-soft-white/20 sm:mt-16 lg:ml-[25%] lg:mt-20 lg:w-3/4">
            {modelIdentities.map((model, index) => (
              <ModelDetailReveal
                key={model.name}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 border-t border-soft-white/20 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(8rem,auto)] sm:gap-6 sm:py-7"
              >
                <span className="text-[0.6875rem] tracking-[0.2em] text-soft-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[clamp(2rem,3.2vw,3.5rem)] leading-none tracking-[-0.03em]">
                  {model.name}
                </span>
                <span className="text-right text-xs tracking-[0.16em] text-soft-white/55 sm:text-sm">
                  {model.identity.toLocaleUpperCase("tr-TR")}
                </span>
              </ModelDetailReveal>
            ))}
          </div>

          <ModelDetailReveal className="mt-10 flex justify-end lg:mt-12">
            <Link
              href="/modeller"
              className="group inline-flex min-h-11 items-center border-b border-soft-white/45 text-sm font-medium tracking-[0.03em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white motion-reduce:transition-none"
            >
              Modelleri Keşfet
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </ModelDetailReveal>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-soft-white px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
        <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <EditorialHeading className="max-w-[15ch] font-serif text-[clamp(3rem,5.7vw,6rem)] leading-[0.95] tracking-[-0.04em] text-charcoal lg:col-span-10 lg:col-start-2 lg:max-w-[18ch]">
            İyi yaşamın daha fazla şeye değil, doğru şeylere ihtiyaç duyduğuna
            inanıyoruz.
          </EditorialHeading>
          <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-4 lg:col-start-8">
            NESTRA, doğayla bağ kuran, zaman içinde değerini koruyan ve
            kullanıcıyla birlikte yaşayan alanlar tasarlamak için var.
          </p>
        </ModelDetailReveal>
      </section>

      <section className="border-b border-soft-white/15 bg-[#191a18] px-5 py-24 text-soft-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.2em] text-soft-white/50">
              BİRLİKTE TASARLAYALIM
            </p>
            <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,5.4vw,5.75rem)] leading-[0.95] tracking-[-0.04em]">
              Size uygun NESTRA’yı birlikte bulalım.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-7 text-soft-white/65 sm:text-lg sm:leading-8">
              Yaşam biçiminize uygun modeli keşfedin veya ihtiyaçlarınızı
              bizimle paylaşın.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/modeller"
                className="group inline-flex min-h-11 items-center border-b border-soft-white/45 text-sm font-medium tracking-[0.03em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white motion-reduce:transition-none"
              >
                Modelleri Keşfet
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
              <Link
                href="/teklif-al"
                className="group inline-flex min-h-11 items-center border-b border-soft-white/45 text-sm font-medium tracking-[0.03em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white motion-reduce:transition-none"
              >
                Teklif Al
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </ModelDetailReveal>
      </section>
    </>
  );
}

