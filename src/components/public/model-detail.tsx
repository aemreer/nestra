import Image from "next/image";
import { ScrollImageReveal } from "@/components/public/scroll-image-reveal";
import Link from "next/link";
import { ModelDetailReveal } from "@/components/public/model-detail-reveal";
import type { PublicModel, PublicSection } from "@/lib/public/model-mapper";

export function ModelDetail({ model }: { model: PublicModel }) {
  const editorial = model.detail.sections.filter((s) => ["private", "upper-level", "outdoor"].includes(s.key));
  return <>{model.detail.sections.map((section) => <DetailSection key={section.key} model={model} section={section} index={editorial.indexOf(section)} />)}</>;
}

function DetailSection({ model, section, index }: { model: PublicModel; section: PublicSection; index: number }) {
  const { detail } = model;
  const imageFor = (role?: string) => detail.gallery.find((image) => image.role === role);
  const sectionImage = imageFor(section.mediaRole);
  const primaryImage = imageFor("hero");
  const exteriorImage = sectionImage;
  const livingImage = sectionImage;
  const bedroomImage = sectionImage;
  const loftImage = sectionImage;
  const materialImage = sectionImage;
  const plans = section.mediaRoles.map(imageFor).filter((image) => image !== undefined);
  const groundPlanImage = plans.length > 1 ? plans[0] : undefined;
  const pairedUpperPlanImage = plans.length > 1 ? plans[1] : undefined;
  const singlePlanImage = plans.length === 1 ? plans[0] : undefined;
  const specifications = section.items;
  switch (section.key) {
    case "hero": return (<section className="border-b border-charcoal/10 bg-warm-ivory px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-44">
        <div className="mx-auto w-full max-w-[1440px]">
          {detail.heroLayout === "horizon" ? (
            <ModelDetailReveal className="grid gap-y-9 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
              <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-5 lg:col-span-12">
                <p className="text-xs font-medium tracking-[0.2em] text-olive">
                  {section.eyebrow}
                </p>
                <p className="text-right text-sm text-charcoal/65">
                  {model.area} · {model.rooms} · {detail.storeys}
                </p>
              </div>

              <h1 className="max-w-[13ch] font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.045em] text-charcoal lg:col-span-10">
                {section.title}
              </h1>

              <div className="lg:col-span-4 lg:col-start-9">
                <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8">
                  {detail.shortDescription}
                </p>
                <Link
                  href={section.href}
                  className="group mt-8 inline-flex min-h-11 w-fit items-center border-b border-charcoal/50 text-sm font-medium tracking-[0.03em] text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                >
              {section.label}
              <span
                    aria-hidden="true"
                    className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </ModelDetailReveal>
          ) : detail.heroLayout === "family" ? (
            <ModelDetailReveal className="grid gap-y-9 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:gap-y-12">
              <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-5 lg:col-span-12">
                <p className="text-xs font-medium tracking-[0.2em] text-olive">
                  {section.eyebrow}
                </p>
                <p className="shrink-0 text-sm text-charcoal/65">
                  {model.area} · {model.rooms}
                </p>
              </div>

              <h1 className="max-w-[11ch] whitespace-pre-line font-serif text-[clamp(3.5rem,6.7vw,7rem)] leading-[0.9] tracking-[-0.045em] text-charcoal lg:col-span-8">
                {section.title}
              </h1>

              <div className="lg:col-span-4 lg:pb-1">
                <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8">
                  {detail.shortDescription}
                </p>
                <Link
                  href={section.href}
                  className="group mt-8 inline-flex min-h-11 w-fit items-center border-b border-charcoal/50 text-sm font-medium tracking-[0.03em] text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                >
              {section.label}
              <span
                    aria-hidden="true"
                    className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </ModelDetailReveal>
          ) : detail.heroLayout === "split" ? (
            <ModelDetailReveal className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:gap-y-0">
              <div className="lg:col-span-8">
                <p className="text-xs font-medium tracking-[0.2em] text-olive">
                  {section.eyebrow}
                </p>
                <p className="mt-3 text-sm text-charcoal/65">
                  {model.area} · {model.rooms}
                </p>
                <h1 className="mt-10 max-w-[11ch] whitespace-pre-line font-serif text-[clamp(3.5rem,7.1vw,7.5rem)] leading-[0.9] tracking-[-0.045em] text-charcoal sm:mt-12">
                  {section.title}
                </h1>
              </div>

              <div className="lg:col-span-4 lg:pb-1">
                <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8">
                  {detail.shortDescription}
                </p>
                <Link
                  href={section.href}
                  className="group mt-8 inline-flex min-h-11 w-fit items-center border-b border-charcoal/50 text-sm font-medium tracking-[0.03em] text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                >
              {section.label}
              <span
                    aria-hidden="true"
                    className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </ModelDetailReveal>
          ) : (
            <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
              <div className="lg:col-span-3 lg:pt-2">
                <p className="text-xs font-medium tracking-[0.2em] text-olive">
                  {section.eyebrow}
                </p>
                <p className="mt-3 text-sm text-charcoal/65">
                  {model.area} · {model.rooms}
                </p>
              </div>

              <div className="lg:col-span-9">
                <h1 className="max-w-[11ch] whitespace-pre-line font-serif text-[clamp(3.5rem,7.1vw,7.5rem)] leading-[0.9] tracking-[-0.045em] text-charcoal">
                  {section.title}
                </h1>
                <div className="mt-10 grid gap-y-8 sm:mt-12 lg:grid-cols-9 lg:gap-x-8">
                  <p className="max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 lg:col-span-5 lg:col-start-1">
                    {detail.shortDescription}
                  </p>
                  <Link
                    href={section.href}
                    className="group inline-flex min-h-11 w-fit items-center border-b border-charcoal/50 text-sm font-medium tracking-[0.03em] text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal lg:col-span-2 lg:col-start-8 lg:self-end"
                  >
              {section.label}
              <span
                      aria-hidden="true"
                      className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </ModelDetailReveal>
          )}

          {section.body && section.body !== detail.shortDescription && <p className="mt-8 max-w-xl text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8">{section.body}</p>}
          {primaryImage ? (
            <ModelDetailReveal
              image
              className={
                detail.heroLayout === "family"
                  ? "relative mt-14 aspect-[16/10] overflow-hidden bg-stone sm:mt-16 lg:ml-[8.333%] lg:mt-20 lg:aspect-[16/9] lg:w-[91.667%]"
                  : "relative mt-14 aspect-[4/3] overflow-hidden bg-stone sm:mt-16 sm:aspect-[16/10] lg:mt-20 lg:aspect-[16/9]"
              }
            >
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                priority
                quality={95}
                sizes="(min-width: 1536px) 1440px, 100vw"
                className="object-cover object-center"
              />
            </ModelDetailReveal>
          ) : null}
        </div>
      </section>);
    case "story": return (<section className="border-b border-charcoal/10 bg-soft-white px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px]">
          {detail.storyLayout === "split" ? (
            <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
              <div className="lg:col-span-7">
                <p className="text-xs tracking-[0.2em] text-warm-gray">
                  {section.eyebrow}
                </p>
                <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,5.6vw,6rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                  {section.title}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8 lg:col-span-4 lg:col-start-9 lg:pb-1">
                {section.body}
              </p>
            </ModelDetailReveal>
          ) : (
            <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
              <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
                {section.eyebrow}
              </p>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,5.6vw,6rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                  {section.title}
                </h2>
                <p className="mt-10 max-w-2xl text-base leading-7 text-charcoal/68 sm:mt-12 sm:text-lg sm:leading-8 lg:ml-auto lg:w-7/12">
                  {section.body}
                </p>
              </div>
            </ModelDetailReveal>
          )}

          {exteriorImage ? (
            <ScrollImageReveal polished lateral
              className={`relative mt-14 overflow-hidden bg-stone sm:mt-16 lg:ml-[8.333%] lg:mt-20 lg:w-[83.333%] ${
                exteriorImage.displayAspect === "4/3"
                  ? "aspect-[4/3]"
                  : "aspect-[3/2]"
              }`}
            >
              <Image
                src={exteriorImage.src}
                alt={exteriorImage.alt}
                fill
                quality={95}
                sizes="(min-width: 1536px) 1200px, (min-width: 1024px) 84vw, 100vw"
                className="object-cover object-center"
              />
            </ScrollImageReveal>
          ) : null}
        </div>
      </section>);
    case "specifications": return (<section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <p className="text-xs tracking-[0.2em] text-warm-gray">{section.eyebrow}</p>
          {section.title && <h2 className="mt-6 font-serif text-4xl text-charcoal">{section.title}</h2>}
          {section.body && <p className="mt-6 text-base leading-7 text-charcoal/68">{section.body}</p>}
          <dl className="mt-8 grid grid-cols-2 border-b border-charcoal/15 sm:mt-10 lg:grid-cols-4">
            {specifications.map((specification) => (
              <ModelDetailReveal
                key={specification.label}
                className="border-t border-charcoal/15 py-7 even:border-l even:pl-5 sm:py-8 sm:even:pl-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <dt className="text-xs tracking-[0.18em] text-warm-gray">
                  {specification.label.toLocaleUpperCase("tr-TR")}
                </dt>
                <dd className="mt-3 font-serif text-[clamp(2rem,3.2vw,3.5rem)] leading-none tracking-[-0.03em] text-charcoal">
                  {specification.value}
                </dd>
              </ModelDetailReveal>
            ))}
          </dl>
        </div>
      </section>);
    case "living": return (<section className="border-b border-charcoal/10 bg-soft-white px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
              {section.eyebrow}
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <h2 className="max-w-[11ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                {section.title}
              </h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-charcoal/68 sm:mt-10 sm:text-lg sm:leading-8">
                {section.body}
              </p>
            </div>
          </ModelDetailReveal>

          {livingImage ? (
            <ScrollImageReveal polished lateral={detail.heroLayout === "horizon" || detail.heroLayout === "family"}
              className="relative mt-12 aspect-[3/2] overflow-hidden bg-stone sm:mt-14 lg:mt-16 lg:w-[91.666%]"
            >
              <Image
                src={livingImage.src}
                alt={livingImage.alt}
                fill
                quality={95}
                sizes="(min-width: 1536px) 1320px, (min-width: 1024px) 92vw, 100vw"
                className="object-cover object-center"
              />
            </ScrollImageReveal>
          ) : null}
        </div>
      </section>);
    case "loft": return ((
        <section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          {loftImage ? (
            <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
              <ModelDetailReveal
                image
                className="relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-8 lg:col-start-5 lg:row-start-1"
              >
                <Image
                  src={loftImage.src}
                  alt={loftImage.alt}
                  fill
                  quality={95}
                  sizes="(min-width: 1536px) 960px, (min-width: 1024px) 67vw, 100vw"
                  className="object-cover object-center"
                />
              </ModelDetailReveal>

              <ModelDetailReveal className="lg:col-span-3 lg:row-start-1">
                <p className="text-xs tracking-[0.2em] text-warm-gray">
                  {section.eyebrow}
                </p>
                <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.75rem,4.1vw,4.5rem)] leading-[0.96] tracking-[-0.035em] text-charcoal">
                  {section.title}
                </h2>
                <p className="mt-7 max-w-md text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8">
                  {section.body}
                </p>
              </ModelDetailReveal>
            </div>
          ) : (
            <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
              <div className="lg:col-span-7">
                <p className="text-xs tracking-[0.2em] text-warm-gray">
                  {section.eyebrow}
                </p>
                <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                  {section.title}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8 lg:col-span-4 lg:col-start-9 lg:pb-1">
                {section.body}
              </p>
            </ModelDetailReveal>
          )}
        </section>
      ));
    case "private": case "upper-level": case "outdoor": return ((
          <section
            key={section.eyebrow}
            className="border-b border-charcoal/10 bg-warm-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
          >
            {sectionImage && section.layout === "wide" ? (
              <div className="mx-auto w-full max-w-[1440px]">
                <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
                  <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
                    {section.eyebrow}
                  </p>
                  <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal lg:col-span-5 lg:col-start-4">
                    {section.title}
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8 lg:col-span-3 lg:col-start-10 lg:pb-1">
                    {section.body}
                  </p>
                </ModelDetailReveal>

                <ModelDetailReveal
                  image
                  className="relative mt-12 aspect-[3/2] overflow-hidden bg-stone sm:mt-14 lg:ml-[8.333%] lg:mt-16 lg:w-[91.667%]"
                >
                  <Image
                    src={sectionImage.src}
                    alt={sectionImage.alt}
                    fill
                    quality={95}
                    sizes="(min-width: 1536px) 1320px, (min-width: 1024px) 92vw, 100vw"
                    className="object-cover object-center"
                  />
                </ModelDetailReveal>
              </div>
            ) : sectionImage ? (
              <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
                <ModelDetailReveal
                  image
                  className={`relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-8 ${
                    index % 2 === 0
                      ? "lg:col-start-1 lg:row-start-1"
                      : "lg:col-start-5 lg:row-start-1"
                  }`}
                >
                  <Image
                    src={sectionImage.src}
                    alt={sectionImage.alt}
                    fill
                    quality={95}
                    sizes="(min-width: 1536px) 960px, (min-width: 1024px) 67vw, 100vw"
                    className="object-cover object-center"
                  />
                </ModelDetailReveal>

                <ModelDetailReveal
                  className={
                    index % 2 === 0
                      ? "lg:col-span-3 lg:col-start-10 lg:row-start-1"
                      : "lg:col-span-3 lg:col-start-1 lg:row-start-1"
                  }
                >
                  <p className="text-xs tracking-[0.2em] text-warm-gray">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.75rem,4.1vw,4.5rem)] leading-[0.96] tracking-[-0.035em] text-charcoal">
                    {section.title}
                  </h2>
                  <p className="mt-7 max-w-md text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8">
                    {section.body}
                  </p>
                </ModelDetailReveal>
              </div>
            ) : (
              <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
                {index % 2 === 0 ? (
                  <>
                    <div className="lg:col-span-7">
                      <p className="text-xs tracking-[0.2em] text-warm-gray">
                        {section.eyebrow}
                      </p>
                      <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                        {section.title}
                      </h2>
                    </div>
                    <p className="max-w-xl text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8 lg:col-span-4 lg:col-start-9 lg:pb-1">
                      {section.body}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
                      {section.eyebrow}
                    </p>
                    <div className="lg:col-span-8 lg:col-start-4">
                      <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                        {section.title}
                      </h2>
                      <p className="mt-8 max-w-xl text-base leading-7 text-charcoal/68 sm:mt-10 sm:text-lg sm:leading-8 lg:ml-auto lg:w-7/12">
                        {section.body}
                      </p>
                    </div>
                  </>
                )}
              </ModelDetailReveal>
            )}
          </section>
        ));
    case "bedroom": return (bedroomImage ? (
        <section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
            <ModelDetailReveal
              image
              className="relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-8"
            >
              <Image
                src={bedroomImage.src}
                alt={bedroomImage.alt}
                fill
                quality={95}
                sizes="(min-width: 1536px) 960px, (min-width: 1024px) 67vw, 100vw"
                className="object-cover object-center"
              />
            </ModelDetailReveal>

            <ModelDetailReveal className="lg:col-span-3 lg:col-start-10">
              <p className="text-xs tracking-[0.2em] text-warm-gray">{section.eyebrow}</p>
              <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.75rem,4.1vw,4.5rem)] leading-[0.96] tracking-[-0.035em] text-charcoal">
                {section.title}
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-charcoal/68 sm:text-lg sm:leading-8">
                {section.body}
              </p>
            </ModelDetailReveal>
          </div>
        </section>
      ) : null);
    case "approach": return (<section className="border-b border-charcoal/10 bg-soft-white px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-8">
          {materialImage ? (
            <ModelDetailReveal
              image
              className="relative aspect-[4/5] w-full overflow-hidden bg-stone sm:w-3/4 lg:col-span-4 lg:w-full"
            >
              <Image
                src={materialImage.src}
                alt={materialImage.alt}
                fill
                quality={95}
                sizes="(min-width: 1536px) 480px, (min-width: 1024px) 34vw, (min-width: 640px) 75vw, 100vw"
                className="object-cover object-center"
              />
            </ModelDetailReveal>
          ) : null}

          <div
            className={
              materialImage
                ? "lg:col-span-7 lg:col-start-6"
                : "lg:col-span-8 lg:col-start-4"
            }
          >
            <ModelDetailReveal>
              <p className="text-xs tracking-[0.2em] text-warm-gray">{section.eyebrow}</p>
              <h2 className="mt-6 max-w-[9ch] font-serif text-[clamp(2.75rem,4.5vw,4.75rem)] leading-[0.96] tracking-[-0.035em] text-charcoal">
                {section.title}
              </h2>
            </ModelDetailReveal>

            {section.body && <p className="mt-8 text-base leading-7 text-charcoal/68">{section.body}</p>}
            <ol className="mt-10 border-b border-charcoal/15 sm:mt-12">
              {section.features.map((feature, index) => (
                <li
                  key={feature.title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-charcoal/15 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
                >
                  <span className="pt-1 text-[0.6875rem] tracking-[0.2em] text-warm-gray">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ModelDetailReveal>
                    <h3 className="text-xl font-medium tracking-[-0.015em] text-charcoal sm:text-2xl">
                      {feature.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-warm-gray sm:text-base sm:leading-7">
                      {feature.description}
                    </p>
                  </ModelDetailReveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>);
    case "layout": return ((singlePlanImage || (groundPlanImage && pairedUpperPlanImage)) &&
      section.title &&
      section.body ? (
        <section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px]">
            <ModelDetailReveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
              <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
              {section.eyebrow}
              </p>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-charcoal">
                  {section.title}
                </h2>
                <p className="mt-8 max-w-xl text-base leading-7 text-charcoal/68 sm:mt-10 sm:text-lg sm:leading-8 lg:ml-auto lg:w-7/12">
                  {section.body}
                </p>
              </div>
            </ModelDetailReveal>

            {groundPlanImage && pairedUpperPlanImage ? (
              <div className="mt-12 grid gap-10 sm:mt-14 sm:gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-8">
                {[groundPlanImage, pairedUpperPlanImage].map((image, planIndex) => (
                  <figure key={image.role}>
                    <figcaption className="mb-4 text-xs tracking-[0.18em] text-warm-gray sm:mb-5">
                      {image.label?.toLocaleUpperCase("tr-TR")}
                    </figcaption>
                    <ModelDetailReveal
                      image
                      delay={planIndex * 0.1}
                      className="relative aspect-[4/3] overflow-hidden bg-soft-white"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={95}
                        sizes="(min-width: 1536px) 704px, (min-width: 1024px) 48vw, 100vw"
                        className="object-contain object-center"
                      />
                    </ModelDetailReveal>
                  </figure>
                ))}
              </div>
            ) : singlePlanImage ? (
              <ModelDetailReveal
                image
                className="relative mt-12 aspect-[4/3] overflow-hidden bg-soft-white sm:mt-14 lg:ml-[4.166%] lg:mt-16 lg:w-[91.666%]"
              >
                <Image
                  src={singlePlanImage.src}
                  alt={singlePlanImage.alt}
                  fill
                  quality={95}
                  sizes="(min-width: 1536px) 1320px, (min-width: 1024px) 92vw, 100vw"
                  className="object-contain object-center"
                />
              </ModelDetailReveal>
            ) : null}
          </div>
        </section>
      ) : null);
    case "cta": return (<section className="border-b border-soft-white/15 bg-charcoal px-5 py-24 text-soft-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <ModelDetailReveal className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.2em] text-soft-white/55">
              {section.eyebrow}
            </p>
            <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,5.8vw,6.25rem)] leading-[0.95] tracking-[-0.04em]">
              {section.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-md text-base leading-7 text-soft-white/65 sm:text-lg sm:leading-8">
              {section.body}
            </p>
            <Link
              href={section.href}
              className="group mt-8 inline-flex min-h-11 items-center border-b border-soft-white/45 text-sm font-medium tracking-[0.03em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white"
            >
              {section.label}
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </ModelDetailReveal>
      </section>);
    default: return null;
  }
}
