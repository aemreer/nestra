"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function EditorialHeading({ children, className }: { children: ReactNode; className: string }) {
  return <h2 className={`${className} overflow-hidden`}>
    <motion.span className="block motion-reduce:!transform-none motion-reduce:!opacity-100" initial={{ y: "18%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.span>
  </h2>;
}
