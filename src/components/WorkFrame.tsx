"use client";

import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * WorkFrame -- the single card treatment for work imagery across the site.
 *
 * Editorial poster language: sharp corners, no chrome, the photograph is
 * the design unit. A quiet all-caps meta caption sits over the bottom
 * edge with a single chromatic tick for editorial tagging.
 *
 * - Subtle inner parallax: the media layer translates a few percent with
 *   element scroll progress (transform-only, framer's scroll listener).
 * - prefers-reduced-motion: no parallax, no media bleed.
 */

export interface WorkFrameProps {
  client?: string;
  year?: string | number;
  discipline?: string;
  /** Kept for call-site compatibility; the frame counter is no longer rendered. */
  index?: number;
  className?: string;
  children: React.ReactNode;
}

export default function WorkFrame({
  client,
  year,
  discipline,
  className = "",
  children,
}: WorkFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Inner parallax driven by this element's scroll progress. Transform-only;
  // the media layer is bled by 5% so the translation never exposes an edge.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);

  const metaParts = [
    client,
    year !== undefined && year !== null ? String(year) : undefined,
    discipline,
  ].filter(Boolean) as string[];
  const hasMeta = metaParts.length > 0;

  return (
    <div ref={frameRef} className={`group relative overflow-hidden ${className}`}>
      {/* Media layer with scroll parallax */}
      <m.div
        className={`absolute ${prefersReducedMotion ? "inset-0" : "-inset-[5%]"}`}
        style={{ y: prefersReducedMotion ? 0 : parallaxY }}
      >
        {children}
      </m.div>

      {/* Metadata caption, bottom edge */}
      {hasMeta && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <div className="flex items-center gap-2.5 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-5 pb-3.5 pt-8">
            <span
              aria-hidden
              className="h-3 w-[2px] shrink-0 bg-magenta-bloom"
            />
            <p className="truncate text-caption font-normal uppercase tracking-[0.18em] text-bone-white/85">
              {metaParts.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
