import type { Metadata } from "next";
import Link from "next/link";

import { ModelComparison } from "@/components/public/model-comparison";
import { ModelExplorer } from "@/components/public/model-explorer";
import { getPublicModels } from "@/lib/public/models";

export const metadata: Metadata = {
  title: {
    absolute: "NESTRA Modelleri | Modüler Yaşam Alanları",
  },
  description:
    "NESTRA One, Loft, Family ve Horizon modellerini keşfedin. Farklı yaşam ihtiyaçları için tasarlanan modern modüler yaşam alanlarını karşılaştırın.",
};

export default async function ModelsPage() {
  const models = await getPublicModels();
  return (
    <>
      <section className="border-b border-charcoal/10 bg-warm-ivory px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
        <div className="mx-auto grid w-full max-w-[1440px] gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            MODELLER
          </p>

          <div className="lg:col-span-9">
            <h1 className="max-w-[12ch] font-serif text-[clamp(3.25rem,6.3vw,6.75rem)] leading-[0.94] tracking-[-0.04em] text-charcoal">
              Yaşamınıza uygun NESTRA’yı keşfedin.
            </h1>
            <div className="mt-10 grid sm:mt-12 lg:grid-cols-9">
              <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-5 lg:col-start-5">
                Kompakt yaşamdan geniş aile alanlarına kadar her NESTRA modeli
                farklı bir yaşam biçimi için tasarlanır.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ModelExplorer models={models} />
      <ModelComparison models={models} />

      <section className="border-b border-soft-white/15 bg-charcoal px-5 py-20 text-soft-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 className="max-w-[14ch] font-serif text-[clamp(2.75rem,4.8vw,5.25rem)] leading-[0.96] tracking-[-0.035em] lg:col-span-7">
            Hangi modelin size uygun olduğundan emin değil misiniz?
          </h2>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-base leading-7 text-soft-white/65 sm:text-lg sm:leading-8">
              İhtiyaçlarınızı birlikte değerlendirelim.
            </p>
            <Link
              href="/teklif-al"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-soft-white/45 text-sm font-medium tracking-[0.03em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white"
            >
              Teklif Al
              <span
                aria-hidden="true"
                className="transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
