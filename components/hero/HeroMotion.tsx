"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/types";

/** Background photograph with gentle scroll parallax and slow settle-in zoom. */
export function HeroParallax({ image }: { image: SiteImage }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 180]);

  return (
    <motion.div aria-hidden="true" style={{ y }} className="absolute inset-0 -z-20">
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover object-[60%_center]" />
      </motion.div>
    </motion.div>
  );
}

export function HeroText({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
