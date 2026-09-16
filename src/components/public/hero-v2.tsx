"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

export function HeroV2() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "0.8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.008]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.68, 1],
    [1, 1, 0],
  );

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reducedMotion ? 0 : 0.08,
        staggerChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={heroRef}
      className="motion-reduce:!transform-none motion-reduce:!opacity-100 relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-soft-white"
    >
      <motion.div
        className="motion-reduce:!transform-none motion-reduce:!opacity-100 absolute -inset-[0.5%] -z-30"
        style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
      >
        <motion.div
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 absolute inset-0"
          initial={reducedMotion ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <Image
            src="/images/models/horizon/hero.webp"
            alt="Palmiye ağaçları arasında gün batımında görüntülenen NESTRA Horizon"
            fill
            preload
            quality={95}
            sizes="100vw"
            className="motion-reduce:!transform-none motion-reduce:!opacity-100 object-cover object-[58%_center] sm:object-[55%_center] lg:object-center"
          />
        </motion.div>
      </motion.div>

      <div
        className="motion-reduce:!transform-none motion-reduce:!opacity-100 absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(17,18,16,0.44)_0%,rgba(17,18,16,0.18)_24%,rgba(17,18,16,0.02)_42%,transparent_56%)]"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.8 }}
        className="motion-reduce:!transform-none motion-reduce:!opacity-100 absolute inset-0 -z-20 bg-gradient-to-t from-charcoal/16 via-transparent to-charcoal/3"
        aria-hidden="true"
      />

      <div className="motion-reduce:!transform-none motion-reduce:!opacity-100 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-end px-5 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <motion.div
          className="motion-reduce:!transform-none motion-reduce:!opacity-100 max-w-[48rem]"
          style={
            reducedMotion
              ? undefined
              : { y: contentY, opacity: contentOpacity }
          }
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 text-xs font-medium tracking-[0.22em] text-soft-white/75"
            >
              NESTRA HORIZON
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-5 max-w-[11.25ch] font-serif text-[clamp(3rem,6.75vw,6.125rem)] leading-[0.9] tracking-[-0.04em] text-soft-white"
            >
              Daha özgür bir yaşam için tasarlandı.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-7 max-w-xl text-base leading-7 text-soft-white/82 sm:text-lg sm:leading-8"
            >
              Doğayla uyumlu, çağdaş yaşam için tasarlanan modüler yaşam
              alanları.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                href="#modeller"
                className="motion-reduce:!transform-none motion-reduce:!opacity-100 inline-flex min-h-12 items-center justify-center border border-soft-white bg-soft-white px-6 text-sm font-medium text-charcoal transition-colors hover:bg-transparent hover:text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white motion-reduce:transition-none"
              >
                Modelleri Keşfet
              </Link>
              <Link
                href="/teklif-al"
                className="motion-reduce:!transform-none motion-reduce:!opacity-100 inline-flex min-h-12 items-center gap-2 text-sm font-medium text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-white"
              >
                <span className="motion-reduce:!transform-none motion-reduce:!opacity-100 border-b border-soft-white/65 pb-0.5">
                  Teklif Al
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="motion-reduce:!transform-none motion-reduce:!opacity-100 pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-warm-ivory/4"
        aria-hidden="true"
      />
    </section>
  );
}

