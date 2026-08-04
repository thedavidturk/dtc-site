"use client";

import { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * SectionMasthead -- the stamped broadside section header.
 *
 * Ultra-condensed uppercase slab (Antonio) at viewport scale,
 * edge-to-edge, one weight, one color. Rises from a mask on entry,
 * then drifts a few percent horizontally with scroll so the slab
 * feels press-printed rather than pasted.
 *
 * The font-size lives on the MASK so its em-based glyph allowance
 * actually scales with the type (em padding on an element that only
 * wraps a large child resolves against the inherited 16px and clips).
 *
 * `inverted` renders Paper-on-Ink for use inside dark bands.
 */
export default function SectionMasthead({
  text,
  inverted = false,
  className = "",
}: {
  text: string;
  inverted?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Drift stays >= 0 so the slab's first glyph never slides off the
  // left edge; it settles flush as the section scrolls past.
  const driftX = useTransform(scrollYProgress, [0, 1], ["2%", "0%"]);

  // Fit the slab to the viewport: Antonio uppercase averages ~0.52em
  // per glyph, so size from character count (with slack for the
  // scroll drift) instead of a fixed vw that long titles overflow.
  const fitVw = Math.min(15.5, 93 / (text.length * 0.52));
  const fontSize = `clamp(3.25rem, ${fitVw.toFixed(2)}vw, 19rem)`;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      aria-label={text}
    >
      <m.div
        style={{ x: prefersReducedMotion ? 0 : driftX }}
        className="whitespace-nowrap"
      >
        {/* Observer lives on the visible mask; the translated child
            animates via variant propagation (a clipped child never
            intersects the viewport, so it can't observe itself). */}
        {/* Positive padding only: a negative-margin compensation would
            shrink the overflow-hidden ancestor's height and crop the
            glyphs right back. */}
        <m.span
          className="block overflow-hidden py-[0.15em]"
          style={{ fontSize }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <m.span
            variants={{
              hidden: { y: "120%" },
              visible: {
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={`block font-stamp uppercase leading-[0.85] tracking-[-0.01em] ${
              inverted ? "text-bone-white" : "text-warm-ink"
            }`}
          >
            {text}
          </m.span>
        </m.span>
      </m.div>
    </div>
  );
}
