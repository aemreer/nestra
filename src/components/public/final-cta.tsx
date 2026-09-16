"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.09 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FinalCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="teklif"
      className="scroll-mt-20 border-b border-soft-white/15 bg-charcoal px-5 py-24 text-soft-white sm:px-8 sm:py-28 lg:px-12 lg:py-[6.5rem]"
    >
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-x-8 lg:grid-cols-12"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.p
          className="text-xs tracking-[0.2em] text-soft-white/55 lg:col-span-3 lg:pt-3"
          variants={itemVariants}
        >
          BİRLİKTE TASARLAYALIM
        </motion.p>

        <motion.h2
          className="mt-7 max-w-[11ch] font-serif text-[clamp(3.25rem,6.4vw,6.75rem)] leading-[0.95] tracking-[-0.04em] lg:col-span-9 lg:col-start-4 lg:mt-0"
          variants={itemVariants}
        >
          Size ait bir alan tasarlayalım.
        </motion.h2>

        <motion.div
          className="mt-14 max-w-md sm:mt-16 lg:col-span-4 lg:col-start-8 lg:mt-12"
          variants={itemVariants}
        >
          <p className="text-base leading-7 text-soft-white/65 sm:text-lg sm:leading-8">
            İhtiyaçlarınıza uygun modeli birlikte şekillendirelim.
          </p>

          <Link
            href="/teklif-al"
            className="group mt-8 inline-flex min-h-11 items-center border-b border-soft-white/40 text-sm font-medium tracking-[0.03em] transition-colors duration-300 hover:border-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white"
          >
            Teklif Al
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
