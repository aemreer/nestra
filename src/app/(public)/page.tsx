import { FeaturedModel } from "@/components/public/featured-horizon";
import { FinalCta } from "@/components/public/final-cta";
import { HeroV2 } from "@/components/public/hero-v2";
import { InteriorImageBreak } from "@/components/public/interior-image-break";
import { ModelShowcase } from "@/components/public/model-showcase";
import { ProcessSection } from "@/components/public/process-section";
import { getPublicModels } from "@/lib/public/models";
import { WhyNestra } from "@/components/public/why-nestra";

export default async function Home() {
  const models = await getPublicModels();
  const featured = models.find((model) => model.featured);
  const featuredImage = featured?.detail.gallery.find((image) => image.role === "exterior")
    ?? featured?.detail.gallery.find((image) => image.role === "hero");
  return (
    <>
      <HeroV2 />

      <section
        id="hakkimizda"
        className="scroll-mt-20 border-b border-charcoal/10 bg-warm-ivory px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:pt-32 lg:pb-36"
      >
        <div className="mx-auto grid w-full max-w-[1440px] gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            NESTRA YAKLAŞIMI
          </p>

          <div className="lg:col-span-9 lg:col-start-4">
            <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,6.4vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
              Doğayla bağ kuran, yaşamla şekillenen alanlar.
            </h2>

            <div className="mt-12 grid sm:mt-16 lg:mt-14 lg:grid-cols-9">
              <p className="max-w-xl text-base leading-7 text-charcoal/75 sm:text-lg sm:leading-8 lg:col-span-5 lg:col-start-5">
                Doğal malzemeler, işlevsel planlama ve çağdaş mimari. NESTRA,
                değişen yaşam biçimlerine uyum sağlayan alanlar tasarlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ModelShowcase models={models} />
      <WhyNestra />
      {featured && <FeaturedModel model={{
        name: featured.name, keyword: featured.keyword, area: featured.area, rooms: featured.rooms,
        storeys: featured.detail.storeys, summary: featured.detail.shortDescription, slug: featured.slug,
        image: featuredImage?.src ?? "", imageAlt: featuredImage?.alt ?? "",
      }} />}
      <ProcessSection />
      <InteriorImageBreak />
      <FinalCta />
    </>
  );
}
