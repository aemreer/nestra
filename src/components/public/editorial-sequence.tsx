"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, transform, type MotionValue } from "motion/react";
import { useDesktopMotion } from "./scroll-image-reveal";

export const EditorialProgress = createContext<MotionValue<number> | null>(null);

/** A short shared timeline without changing the section height. */
export function EditorialSequence({ children, className, flowing = false }: { children: ReactNode; className?: string; flowing?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: flowing ? ["start 92%", "end 70%"] : ["start 92%", "start 28%"] });
  return <EditorialProgress.Provider value={scrollYProgress}><div ref={ref} className={className}>{children}</div></EditorialProgress.Provider>;
}

export function EditorialText({ children, className, start = 0.12 }: { children: ReactNode; className?: string; start?: number }) {
  const progress = useContext(EditorialProgress);
  const desktop = useDesktopMotion();
  const opacity = useTransform(() => transform(progress?.get() ?? 1, [start, Math.min(1, start + 0.3)], [0, 1]));
  const y = useTransform(() => transform(progress?.get() ?? 1, [start, Math.min(1, start + 0.3)], [12, 0]));
  return <motion.div className={`motion-reduce:!opacity-100 motion-reduce:!transform-none ${className ?? ""}`} style={desktop ? { opacity, y } : undefined}>{children}</motion.div>;
}
