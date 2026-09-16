"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const values = [
  {
    index: "01",
    title: "Size göre şekillenir",
    description:
      "Yaşam biçiminize ve ihtiyaçlarınıza göre uyarlanabilen alanlar.",
  },
  {
    index: "02",
    title: "Kontrollü üretim",
    description: "Planlı ve kontrollü üretim süreciyle tutarlı kalite.",
  },
  {
    index: "03",
    title: "Doğal malzemeler",
    description:
      "Ahşap, mineral yüzeyler ve rafine detaylarla sıcak bir malzeme dili.",
  },
  {
    index: "04",
    title: "Yaşam boyu verimlilik",
    description:
      "Alan, ışık ve kullanım kararlarında uzun vadeli düşünülmüş tasarım.",
  },
] as const;

const introVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.08 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyNestra() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="neden-nestra"
      className="scroll-mt-20 border-b border-charcoal/10 bg-warm-ivory px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={introVariants}
        >
          <p className="text-xs tracking-[0.2em] text-warm-gray">
            NEDEN NESTRA?
          </p>
          <h2 className="mt-6 max-w-[8.5ch] font-serif text-[clamp(3rem,5.4vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-charcoal">
            İyi tasarım, detaylarda başlar.
          </h2>
        </motion.div>

        <motion.ol
          className="border-b border-charcoal/15 lg:col-span-6 lg:col-start-7"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listVariants}
        >
          {values.map((value) => (
            <motion.li
              key={value.index}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-charcoal/15 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7 lg:py-8"
              variants={rowVariants}
            >
              <span className="pt-1 text-[0.6875rem] tracking-[0.2em] text-warm-gray">
                {value.index}
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.015em] text-charcoal sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-warm-gray sm:text-base sm:leading-7">
                  {value.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
