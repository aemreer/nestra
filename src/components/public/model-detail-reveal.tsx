"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 18, clipPath: "inset(3% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ModelDetailReveal({
  children,
  className,
  image = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  image?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={`${className ?? ""} motion-reduce:!transform-none motion-reduce:!opacity-100 ${
        image ? "motion-reduce:![clip-path:inset(0%_0_0_0)]" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: image ? 0.12 : 0.25 }}
      variants={image ? { ...imageVariants, visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] } } } : revealVariants}
    >
      {children}
    </motion.div>
  );
}
