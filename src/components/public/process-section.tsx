"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const steps = [
  { number: "01", title: "Modelinizi seçin" },
  { number: "02", title: "Özelleştirin" },
  { number: "03", title: "Teklifinizi alın" },
  { number: "04", title: "Üretim" },
  { number: "05", title: "Teslim" },
] as const;

const introVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stepsVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="surec"
      className="scroll-mt-20 border-b border-charcoal/10 bg-warm-ivory px-5 py-20 sm:px-8 sm:py-24 md:py-28 lg:px-12 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-8"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={introVariants}
        >
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            SÜREÇ
          </p>
          <h2 className="max-w-[11ch] font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-charcoal lg:col-span-8 lg:col-start-4">
            Beş adımda NESTRA.
          </h2>
        </motion.div>

        <motion.ol
          className="mt-12 grid border-t border-charcoal/20 md:mt-16 md:grid-cols-3 lg:mt-[4.5rem] lg:grid-cols-5 lg:border-b"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stepsVariants}
        >
          {steps.map((step) => (
            <motion.li
              key={step.number}
              className="grid min-h-20 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4 border-b border-charcoal/15 py-4 md:flex md:min-h-40 md:flex-col md:items-stretch md:justify-between md:border-r md:px-6 md:py-7 md:[&:nth-child(3n)]:border-r-0 md:last:border-r-0 lg:min-h-40 lg:border-b-0 lg:border-r lg:px-7 lg:py-7 lg:[&:nth-child(3n)]:border-r lg:last:border-r-0 xl:px-8"
              variants={stepVariants}
            >
              <span className="text-[0.6875rem] tracking-[0.2em] text-warm-gray">
                {step.number}
              </span>
              <h3 className="max-w-none text-xl font-medium leading-tight tracking-[-0.02em] text-charcoal md:mt-8 md:max-w-[12ch] md:text-[1.375rem]">
                {step.title}
              </h3>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
