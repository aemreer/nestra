"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, transform, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";

type StoryModel = { slug: string; name: string; area: string; rooms: string; keyword: string; heroImage: string; imageAlt: string };

export function ModelScrollStory({ models, children }: { models: StoryModel[]; children: ReactNode }) {
  if (models.length < 2) return <>{children}</>;
  return <><div className="signature-desktop"><DesktopStory models={models} /></div><div className="signature-fallback">{children}</div></>;
}

function DesktopStory({ models }: { models: StoryModel[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.max(0, Math.min(models.length - 1, Math.floor(value * models.length)));
    // React updates only at model boundaries, never on every scroll frame.
    if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
  });
  return <div ref={ref} className="relative mt-16" style={{ height: `${100 + models.length * 80}svh` }} data-model-story>
    <div className="sticky top-0 h-svh overflow-hidden">
      {models.map((model, index) => <StoryPanel key={model.slug} model={model} index={index} count={models.length} progress={scrollYProgress} active={active === index} />)}
      <a href="#model-story-end" className="sr-only focus:not-sr-only focus:absolute focus:bottom-5 focus:left-5 focus:z-50 focus:bg-soft-white focus:p-3">Model bölümünü geç</a>
    </div>
    <span id="model-story-end" className="absolute bottom-0" />
  </div>;
}

function StoryPanel({ model, index, count, progress, active }: { model: StoryModel; index: number; count: number; progress: MotionValue<number>; active: boolean }) {
  const start = index / count;
  const end = (index + 1) / count;
  const enter = Math.max(0, start - 0.16 / count);
  const settled = start + 0.04 / count;
  const leave = end - 0.16 / count;
  const gone = Math.min(1, end + 0.04 / count);
  const visibility = useTransform(progress, (value) => (index === 0 || value >= enter) && (index === count - 1 || value <= gone) ? "visible" : "hidden");
  const direction = index % 2 === 0 ? 1 : -1;
  const clipPath = useStoryTransform(progress, [enter, settled], index === 0 ? ["inset(0%)", "inset(0%)"] : direction === 1 ? ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const imageOpacity = useStoryTransform(progress, [enter, leave, gone], [1, 1, index === count - 1 ? 1 : 0]);
  const scale = useStoryTransform(progress, [start, end], [1.04, 1]);
  const x = useStoryTransform(progress, [start, end], [32 * direction, -12 * direction]);
  const y = useStoryTransform(progress, [start, end], [20, -12]);
  const opacity = useStoryTransform(progress, [enter, settled, leave, gone], [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0]);
  const textY = useStoryTransform(progress, [enter, settled, gone], [index === 0 ? 0 : 16, 0, index === count - 1 ? 0 : -12]);
  return <motion.div className="absolute inset-0 grid grid-cols-12 items-center gap-x-8 py-24" aria-hidden={!active} inert={!active} style={{ zIndex: index, visibility, pointerEvents: active ? "auto" : "none" }}>
    <motion.div className={`relative h-[min(62svh,720px)] overflow-hidden bg-stone ${direction === 1 ? "col-span-8 col-start-1 row-start-1" : "col-span-8 col-start-5 row-start-1"}`} style={{ clipPath, opacity: imageOpacity }}>
      <motion.div className="absolute -inset-6" style={{ scale, x, y }}>
        {model.heroImage && <Image src={model.heroImage} alt={model.imageAlt} fill sizes="66vw" quality={95} className="object-cover" />}
      </motion.div>
    </motion.div>
    <motion.div className={`row-start-1 border-t border-charcoal/20 bg-soft-white pt-4 ${direction === 1 ? "col-span-3 col-start-10" : "col-span-3 col-start-1"}`} style={{ opacity, y: textY }}>
      <p className="text-xs tracking-[0.2em] text-warm-gray">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-4 font-serif text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[0.92] tracking-[-0.035em]">{model.name}</h3>
      <p className="mt-6 text-[0.6875rem] font-medium tracking-[0.2em] text-olive">{model.keyword.toLocaleUpperCase("tr-TR")}</p>
      <p className="mt-3 text-sm leading-6 text-charcoal/70">{model.area} · {model.rooms}</p>
      <Link href={`/modeller/${model.slug}`} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"><span className="border-b border-charcoal/60 pb-0.5">Modeli İncele</span><span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
    </motion.div>
  </motion.div>;
}

// Keep clamped segment values after each reveal finishes, including reverse scroll.
function useStoryTransform<T>(progress: MotionValue<number>, input: number[], output: T[]) {
  return useTransform(() => transform(progress.get(), input, output));
}
