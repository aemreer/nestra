"use client";

import Image from "next/image";
import { ScrollImageReveal } from "./scroll-image-reveal";
import { motion, useReducedMotion } from "motion/react";

export function InteriorImageBreak() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="NESTRA Family iç mekanı"
      className="bg-warm-ivory px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-12 lg:gap-x-8">
        <motion.figure
          className="lg:col-span-11 lg:col-start-2"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrollImageReveal>
          <Image
            src="/images/models/family/interior-living.webp"
            alt="NESTRA Family'nin ahşap mimari omurga etrafında şekillenen ortak yaşam alanı"
            width={1535}
            height={1024}
            quality={95}
            sizes="(min-width: 1536px) 1318px, (min-width: 1024px) calc(91.67vw - 88px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
            className="h-auto w-full"
          />

          </ScrollImageReveal>
          <figcaption className="mt-4 flex flex-col gap-1 text-warm-gray sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="text-[0.6875rem] font-medium tracking-[0.2em]">
              NESTRA FAMILY
            </span>
            <span className="text-sm leading-6">
              Ortak yaşam için tasarlandı.
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

