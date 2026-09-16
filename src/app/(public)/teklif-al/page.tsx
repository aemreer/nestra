import type { Metadata } from "next";

import { ModelDetailReveal } from "@/components/public/model-detail-reveal";
import { QuoteRequestForm } from "@/components/public/quote-request-form";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Teklif Al",
  description:
    "NESTRA yaşam alanları için teklif talebinizi oluşturun. İlgilendiğiniz modeli ve ihtiyaçlarınızı paylaşın, size uygun çözümü birlikte şekillendirelim.",
};

const nextSteps = [
  {
    index: "01",
    title: "İhtiyacınızı inceleriz",
    description:
      "Paylaştığınız model, kullanım amacı ve proje detaylarını değerlendiririz.",
  },
  {
    index: "02",
    title: "Sizinle iletişime geçeriz",
    description:
      "İhtiyaçlarınızı netleştirmek ve uygun seçenekleri konuşmak için sizinle iletişime geçeriz.",
  },
  {
    index: "03",
    title: "Teklifinizi şekillendiririz",
    description:
      "Model ve ihtiyaçlarınıza göre kapsamı birlikte netleştiririz.",
  },
] as const;

export default function QuoteRequestPage() {
  const modelNames = models.map((model) => model.name);

  return (
    <>
      <section className="border-b border-charcoal/10 bg-warm-ivory px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
        <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            TEKLİF AL
          </p>
          <div className="lg:col-span-8 lg:col-start-4">
            <h1 className="max-w-[13ch] font-serif text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.94] tracking-[-0.04em] text-charcoal">
              Size uygun alanı birlikte şekillendirelim.
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-7 text-charcoal/70 sm:mt-10 sm:text-lg sm:leading-8 lg:ml-auto lg:w-7/12">
              İlgilendiğiniz modeli ve temel ihtiyaçlarınızı paylaşın. NESTRA
              yaşam alanınızı birlikte değerlendirelim.
            </p>
          </div>
        </ModelDetailReveal>
      </section>

      <section className="border-b border-charcoal/10 bg-soft-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <ModelDetailReveal>
              <p className="mb-8 text-xs tracking-[0.2em] text-warm-gray sm:mb-10">
                TEKLİF TALEBİ
              </p>
              <QuoteRequestForm modelNames={modelNames} />
            </ModelDetailReveal>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <ModelDetailReveal>
              <p className="text-xs tracking-[0.2em] text-warm-gray">SÜREÇ</p>
              <h2 className="mt-5 max-w-[11ch] font-serif text-[clamp(2.5rem,3.8vw,4rem)] leading-[0.97] tracking-[-0.035em] text-charcoal">
                Talebinizden sonra ne olur?
              </h2>

              <ol className="mt-9 border-b border-charcoal/15 sm:mt-10">
                {nextSteps.map((step) => (
                  <li key={step.index} className="border-t border-charcoal/15 py-6">
                    <p className="text-[0.6875rem] tracking-[0.2em] text-warm-gray">
                      {step.index}
                    </p>
                    <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-charcoal/65">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-7 border-l border-olive/70 pl-4 text-sm leading-6 text-charcoal/65">
                Henüz hangi modelin size uygun olduğundan emin değilseniz sorun
                değil. Talebinizi birlikte değerlendirebiliriz.
              </p>
            </ModelDetailReveal>
          </aside>
        </div>
      </section>
    </>
  );
}
