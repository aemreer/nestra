"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

type ModelLayout = "one" | "loft" | "family" | "horizon";

type ModelEntry = {
  number: string;
  name: string;
  slug: string;
  details: string;
  identity: string;
  image: string;
  imageAlt: string;
  layout: ModelLayout;
};

const layoutStyles: Record<
  ModelLayout,
  {
    article: string;
    image: string;
    imagePosition: string;
    imageSizes: string;
    info: string;
    infoFrame: string;
    compactInfo: boolean;
    wideInfo: boolean;
  }
> = {
  one: {
    article: "gap-y-6 lg:gap-y-8",
    image:
      "aspect-[4/3] sm:aspect-[16/10] lg:col-span-8 lg:aspect-[16/9]",
    imagePosition: "object-[56%_center] sm:object-center",
    imageSizes: "(min-width: 1024px) 66vw, 100vw",
    info: "lg:col-span-3 lg:col-start-10 lg:self-end",
    infoFrame: "border-t border-charcoal/20 pt-4",
    compactInfo: false,
    wideInfo: false,
  },
  loft: {
    article: "gap-y-6 lg:gap-y-8",
    image:
      "aspect-[4/3] lg:order-2 lg:col-span-8 lg:col-start-5 lg:aspect-[5/4]",
    imagePosition: "object-[53%_center]",
    imageSizes: "(min-width: 1024px) 66vw, 100vw",
    info: "lg:order-1 lg:col-span-3 lg:col-start-1 lg:self-center",
    infoFrame: "border-t border-charcoal/20 pt-4",
    compactInfo: false,
    wideInfo: false,
  },
  family: {
    article: "-mb-8 gap-y-3 lg:mb-0 lg:gap-y-0",
    image:
      "aspect-[4/3] sm:aspect-[16/10] lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:aspect-[16/9]",
    imagePosition: "object-center",
    imageSizes: "(min-width: 1024px) 66vw, 100vw",
    info: "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-center",
    infoFrame: "",
    compactInfo: true,
    wideInfo: false,
  },
  horizon: {
    article: "-mt-4 gap-y-0 lg:-mt-6 lg:gap-y-0",
    image:
      "order-2 aspect-[4/3] sm:aspect-[16/10] lg:order-none lg:col-span-11 lg:col-start-2 lg:row-start-2 lg:aspect-[16/9]",
    imagePosition: "object-[54%_center] sm:object-center",
    imageSizes: "(min-width: 1024px) 91vw, 100vw",
    info: "order-1 lg:order-none lg:col-span-11 lg:col-start-2 lg:row-start-1",
    infoFrame: "pb-3",
    compactInfo: true,
    wideInfo: true,
  },
};

const entryVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    clipPath: "inset(4% 0% 0% 0%)",
    opacity: 0,
    y: 22,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const infoVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ModelMeta({
  details,
  identity,
  modelUrl,
  compact = false,
}: {
  details: string;
  identity: string;
  modelUrl: string;
  compact?: boolean;
}) {
  return (
    <div>
      <p className="motion-reduce:!transform-none motion-reduce:!opacity-100 text-[0.6875rem] font-medium tracking-[0.2em] text-olive">
        {identity}
      </p>
      <p className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-3 text-sm leading-6 text-charcoal/70">{details}</p>
      <Link
        href={modelUrl}
        className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] ${compact ? "mt-4" : "mt-6"} inline-flex min-h-11 items-center gap-2 text-sm font-medium text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal`}
      >
        <span className="motion-reduce:!transform-none motion-reduce:!opacity-100 border-b border-charcoal/60 pb-0.5">
          Modeli İncele
        </span>
        <span
          aria-hidden="true"
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 motion-safe:transition-transform motion-safe:duration-300 group-hover/entry:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

export function ModelShowcaseEntry({ model }: { model: ModelEntry }) {
  const reducedMotion = useReducedMotion();
  const modelUrl = `/modeller/${model.slug}`;
  const layout = layoutStyles[model.layout];
  const titleClassName =
    model.layout === "family"
      ? "font-serif text-[clamp(2.75rem,4vw,4rem)] leading-[0.92] tracking-[-0.035em] text-charcoal lg:whitespace-nowrap"
      : "font-serif text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-charcoal";

  return (
    <motion.article
      className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] group/entry grid lg:grid-cols-12 lg:gap-x-8 ${layout.article}`}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={entryVariants}
    >
      <motion.div
        variants={imageVariants}
        className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] relative overflow-hidden bg-stone ${layout.image}`}
      >
        <Link
          href={modelUrl}
          aria-label={`${model.name} modelini incele`}
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 group/image absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
        >
          {model.image && <Image
            src={model.image}
            alt={model.imageAlt}
            fill
            quality={95}
            sizes={layout.imageSizes}
            className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover/image:scale-[1.02] ${layout.imagePosition}`}
          />}
        </Link>
      </motion.div>

      <motion.div
        variants={infoVariants}
        className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] ${layout.infoFrame} ${layout.info}`}
      >
        {layout.wideInfo ? (
          <div className="motion-reduce:!transform-none motion-reduce:!opacity-100 grid gap-y-4 lg:grid-cols-10 lg:gap-x-8 lg:gap-y-0">
            <div className="motion-reduce:!transform-none motion-reduce:!opacity-100 lg:col-span-6">
              <p className="motion-reduce:!transform-none motion-reduce:!opacity-100 text-xs tracking-[0.2em] text-warm-gray">
                {model.number}
              </p>
              <h3 className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] mt-3 ${titleClassName}`}>
                {model.name}
              </h3>
            </div>

            <div className="motion-reduce:!transform-none motion-reduce:!opacity-100 lg:col-span-3 lg:col-start-8 lg:self-end">
              <ModelMeta
                details={model.details}
                identity={model.identity}
                modelUrl={modelUrl}
                compact
              />
            </div>
          </div>
        ) : (
          <>
            <p className="motion-reduce:!transform-none motion-reduce:!opacity-100 text-xs tracking-[0.2em] text-warm-gray">
              {model.number}
            </p>
            <h3 className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![clip-path:inset(0)] mt-4 ${titleClassName}`}>
              {model.name}
            </h3>
            <div className={layout.compactInfo ? "mt-4" : "mt-6"}>
              <ModelMeta
                details={model.details}
                identity={model.identity}
                modelUrl={modelUrl}
                compact={layout.compactInfo}
              />
            </div>
          </>
        )}
      </motion.div>
    </motion.article>
  );
}
