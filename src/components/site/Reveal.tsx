"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * The one entrance motion on the site: a short fade-up the first time a
 * block scrolls into view. Reduced-motion visitors get a plain fade.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.52, 0.01, 0, 1] }}
    >
      {children}
    </m.div>
  );
}
