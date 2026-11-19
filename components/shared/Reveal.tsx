"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
};

/** Subtle fade-and-rise when the element scrolls into view. */
export function Reveal({ delay = 0, y = 22, as = "div", children, ...rest }: RevealProps) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Image reveal: a sandstone-coloured veil slides away as the image enters. */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-sand"
      />
    </div>
  );
}
