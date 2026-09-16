"use client";

import Image from "next/image";
import { ScrollImageReveal } from "./scroll-image-reveal";
import Link from "next/link";
import { EditorialSequence, EditorialText } from "./editorial-sequence";

type FeaturedModelData = {
  name: string; keyword: string; area: string; rooms: string; storeys: string;
  summary: string; slug: string; image: string; imageAlt: string;
};

export function FeaturedModel({ model }: { model: FeaturedModelData }) {
  const specs = [model.area, model.rooms, model.storeys];

  return (
    <section
      id="featured-model"
      className="motion-reduce:!transform-none motion-reduce:!opacity-100 scroll-mt-20 border-b border-soft-white/10 bg-charcoal px-5 py-24 text-soft-white sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <EditorialSequence className="motion-reduce:!transform-none motion-reduce:!opacity-100 mx-auto grid w-full max-w-[1440px] items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 order-2 lg:order-1 lg:col-span-4"
        >
          <EditorialText start={0.12}><p className="motion-reduce:!transform-none motion-reduce:!opacity-100 text-xs tracking-[0.2em] text-soft-white/55">
            {model.name.toLocaleUpperCase("tr-TR")}
          </p></EditorialText>
          <EditorialText start={0.2}><h2 className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-6 max-w-[8ch] font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.96] tracking-[-0.035em]">
            {model.keyword}
          </h2></EditorialText>

          <EditorialText start={0.28}><ul className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-10 grid grid-cols-2 border-y border-soft-white/15 sm:grid-cols-3 lg:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            {specs.map((spec, index) => (
              <li
                key={index}
                className={`py-4 text-xs tracking-[0.08em] text-soft-white/75 sm:py-5 ${
                  index === 2 ? "col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1" : ""
                }`}
              >
                {spec}
              </li>
            ))}
          </ul></EditorialText>

          <EditorialText start={0.34}><p className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-8 max-w-md text-base leading-7 text-soft-white/65">
            {model.summary}
          </p></EditorialText>

          <EditorialText start={0.42}><Link
            href={`/modeller/${model.slug}`}
            className="motion-reduce:!transform-none motion-reduce:!opacity-100 group mt-8 inline-flex min-h-11 items-center border-b border-soft-white/35 text-sm font-medium tracking-[0.02em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white"
          >
            Modeli İncele
            <span
              aria-hidden="true"
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
            >
              →
            </span>
          </Link></EditorialText>
        </div>

        <div
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 relative order-1 aspect-[4/3] overflow-hidden lg:order-2 lg:col-span-7 lg:col-start-6"
        >
          <ScrollImageReveal polished lateral className="motion-reduce:!transform-none motion-reduce:!opacity-100 absolute inset-0">
          {model.image && <Image
            src={model.image}
            alt={model.imageAlt}
            fill
            quality={95}
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="motion-reduce:!transform-none motion-reduce:!opacity-100 object-cover"
          />}
          </ScrollImageReveal>
        </div>
      </EditorialSequence>
    </section>
  );
}
