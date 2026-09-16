"use client";

import { useContext, useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useScroll, useTransform, transform } from "motion/react";

import { EditorialProgress } from "./editorial-sequence";

const query = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

/** Only selected editorial images use this reversible, native-scroll timeline. */
export function ScrollImageReveal({ polished = false, ...props }: { children: ReactNode; className?: string; lateral?: boolean; polished?: boolean; revealStart?: number }) {
  return polished ? <PolishedImageReveal {...props} /> : <OriginalImageReveal {...props} />;
}

function PolishedImageReveal({ children, className = "", lateral = false, revealStart = 0 }: { children: ReactNode; className?: string; lateral?: boolean; revealStart?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const shared = useContext(EditorialProgress);
  const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 28%"] });
  const progress = shared ?? scrollYProgress;
  const clipPath = useTransform(() => transform(progress.get(), [revealStart, revealStart + (1 - revealStart) * 0.78], lateral ? ["inset(0% 24% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(18% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]));
  const x = useTransform(() => transform(progress.get(), [revealStart, revealStart + (1 - revealStart) * 0.85], [lateral ? 40 : 0, 0]));
  const y = useTransform(() => transform(progress.get(), [revealStart, revealStart + (1 - revealStart) * 0.85], [lateral ? 0 : 24, 0]));
  const scale = useTransform(() => transform(progress.get(), [revealStart, revealStart + (1 - revealStart) * 0.85], [1.045, 1]));
  return <motion.div ref={ref} data-editorial-image className={`overflow-hidden motion-reduce:![clip-path:inset(0)] ${className}`} style={desktop ? { clipPath } : undefined}>
    <motion.div className="relative h-full w-full motion-reduce:!transform-none" style={desktop ? { x, y, scale } : undefined}>{children}</motion.div>
  </motion.div>;
}

function OriginalImageReveal({ children, className = "", lateral = false }: { children: ReactNode; className?: string; lateral?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 15%"] });
  const clipPath = useTransform(scrollYProgress, [0, 0.48, 1], lateral ? ["inset(0% 9% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(12% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const x = useTransform(scrollYProgress, [0, 0.55, 1], [lateral ? 32 : 0, 0, lateral ? -12 : 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1.04, 1, 1.015]);
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [24, 0, -12]);
  return <div ref={ref} className={`overflow-hidden ${className}`}>
    <motion.div className="h-full w-full motion-reduce:!transform-none motion-reduce:![clip-path:inset(0)]" style={desktop ? { clipPath, x, scale, y } : undefined}>
      {children}
    </motion.div>
  </div>;
}
