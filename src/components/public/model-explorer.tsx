"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { NestraModel } from "@/data/models";

const transitionEase = [0.22, 1, 0.36, 1] as const;

export function ModelExplorer({ models }: { models: readonly Omit<NestraModel, "detail">[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();
  const activeModel = models[activeIndex] ?? models[0];

  if (!activeModel) return null;

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % models.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + models.length) % models.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = models.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-label="NESTRA model seçici"
      className="border-b border-charcoal/10 bg-soft-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: transitionEase }}
      >
        <div className="lg:col-span-5">
          <ol className="border-b border-charcoal/20" aria-label="NESTRA modelleri">
            {models.map((model, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={model.slug}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group/row relative grid min-h-[4.75rem] cursor-pointer grid-cols-[minmax(0,1fr)_1.5rem] items-center border-t transition-[border-color] duration-300 motion-reduce:transition-none sm:min-h-[5.5rem] sm:grid-cols-[minmax(0,1fr)_5rem] lg:min-h-[6.75rem] lg:grid-cols-[minmax(0,1fr)_2rem] xl:grid-cols-[minmax(0,1fr)_5rem] ${
                    isActive ? "border-charcoal/35" : "border-charcoal/15"
                  }`}
                >
                  <button
                    ref={(element) => {
                      buttonRefs.current[index] = element;
                    }}
                    type="button"
                    id={`model-selector-${model.slug}`}
                    aria-label={`${model.name} modelini önizle`}
                    aria-current={isActive ? "true" : undefined}
                    aria-controls="model-explorer-preview"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onKeyDown={(event) => moveFocus(event, index)}
                    className="absolute inset-0 cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-charcoal/70"
                  />

                  <div
                    className={`pointer-events-none relative grid grid-cols-[1.75rem_minmax(0,1fr)_3.25rem] items-center gap-x-1.5 py-4 pr-1 transition-colors duration-300 motion-reduce:transition-none sm:grid-cols-[2.75rem_minmax(0,1fr)_4.75rem] sm:gap-x-4 sm:pr-3 lg:grid-cols-[2.25rem_minmax(0,1fr)_4rem] lg:gap-x-2 lg:py-5 xl:grid-cols-[2.75rem_minmax(0,1fr)_4.75rem] xl:gap-x-4 ${
                      isActive ? "text-charcoal" : "text-charcoal/62"
                    }`}
                  >
                    <span
                      className={`text-[0.625rem] tracking-[0.18em] transition-colors duration-300 motion-reduce:transition-none ${
                        isActive ? "text-charcoal/65" : "text-warm-gray"
                      }`}
                    >
                      {String(model.order).padStart(2, "0")}
                      <span
                        aria-hidden="true"
                        className={`mt-2 block h-px bg-charcoal transition-[width,opacity] duration-300 motion-reduce:transition-none ${
                          isActive ? "w-3 opacity-70" : "w-0 opacity-0"
                        }`}
                      />
                    </span>

                    <span
                      className={`whitespace-nowrap font-serif leading-none tracking-[-0.025em] transition-[font-size,color] duration-300 motion-reduce:transition-none ${
                        isActive
                          ? "text-[1.45rem] sm:text-[2rem] lg:text-[1.75rem] xl:text-[2.2rem]"
                          : "text-[1.34rem] sm:text-[1.75rem] lg:text-[1.6rem] xl:text-[1.9rem]"
                      }`}
                    >
                      {model.name}
                    </span>

                    <span
                      className={`min-w-0 text-right text-[0.625rem] leading-5 tabular-nums transition-colors duration-300 motion-reduce:transition-none sm:text-xs ${
                        isActive ? "text-charcoal/82" : "text-charcoal/58"
                      }`}
                    >
                      {model.area}
                      <span
                        className={`block transition-colors duration-300 motion-reduce:transition-none ${
                          isActive ? "text-charcoal/68" : "text-warm-gray"
                        }`}
                      >
                        {model.rooms}
                      </span>
                    </span>
                  </div>

                  <Link
                    href={`/modeller/${model.slug}`}
                    aria-label={`${model.name} modelini incele`}
                    onClick={(event) => event.stopPropagation()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`relative z-10 inline-flex min-h-11 items-center justify-end gap-1.5 text-[0.6875rem] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal motion-reduce:transition-none ${
                      isActive ? "text-charcoal" : "text-charcoal/60"
                    }`}
                  >
                    <span className="hidden xl:inline">İncele</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 motion-reduce:transition-none group-hover/row:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className="lg:col-span-7"
          id="model-explorer-preview"
          role="region"
          aria-label={`${activeModel.name} önizlemesi`}
          aria-live="polite"
        >
          <div className="relative aspect-video overflow-hidden bg-stone">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeModel.slug}
                className="absolute inset-0"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 1.012 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.48,
                  ease: transitionEase,
                }}
              >
                {activeModel.heroImage && <Image
                  src={activeModel.heroImage}
                  alt={activeModel.imageAlt}
                  fill
                  quality={95}
                  sizes="(min-width: 1024px) 58vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  className="object-cover"
                  priority={activeIndex === 0}
                />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 border-b border-charcoal/25 pb-4">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 sm:gap-x-6">
              <span className="text-[0.625rem] tracking-[0.18em] text-warm-gray">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(models.length).padStart(2, "0")}
              </span>
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-olive">
                {activeModel.keyword}
              </span>
            </div>

            <Link
              href={`/modeller/${activeModel.slug}`}
              className="group/link inline-flex min-h-11 items-center justify-self-end gap-2 whitespace-nowrap text-sm font-medium text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              <span className="border-b border-charcoal/55 pb-0.5">
                Modeli İncele
              </span>
              <span
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:duration-300 group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
