import { EditorialHeading } from "./editorial-heading";
import { ModelShowcaseEntry } from "@/components/public/model-showcase-entry";

import { ModelScrollStory } from "@/components/public/model-scroll-story";
import type { PublicModel } from "@/lib/public/model-mapper";

export function ModelShowcase({ models }: { models: readonly PublicModel[] }) {
  return (
    <section
      id="modeller"
      className="scroll-mt-20 border-b border-charcoal/10 bg-soft-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:pt-24 lg:pb-8"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            MODELLER
          </p>
          <EditorialHeading className="max-w-[10.5ch] font-serif text-[clamp(3rem,5.6vw,6rem)] leading-[0.96] tracking-[-0.03em] text-charcoal lg:col-span-9">
            Size uygun alanı keşfedin.
          </EditorialHeading>
        </div>

        <ModelScrollStory models={models.map(({ slug, name, area, rooms, keyword, heroImage, imageAlt }) => ({ slug, name, area, rooms, keyword, heroImage, imageAlt }))}>
        <div className="mt-16 grid gap-y-24 sm:mt-20 sm:gap-y-28 lg:mt-[4.5rem] lg:gap-y-24">
          {models.map((model, index) => (
            <ModelShowcaseEntry key={model.slug} model={{
              number: String(index + 1).padStart(2, "0"), name: model.name, slug: model.slug,
              details: model.area + " · " + model.rooms, identity: model.keyword.toLocaleUpperCase("tr-TR"),
              image: model.heroImage, imageAlt: model.imageAlt,
              // Preserve the four accepted compositions; new models alternate left/right.
              layout: model.slug === "one" || model.slug === "loft" || model.slug === "family" || model.slug === "horizon"
                ? model.slug : index % 2 === 0 ? "one" : "loft",
            }} />
          ))}
        </div>
        </ModelScrollStory>
      </div>
    </section>
  );
}
