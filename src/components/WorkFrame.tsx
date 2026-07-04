"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * WorkFrame -- the single card treatment for work imagery across the site.
 *
 * Translates the 3D "director's viewport" language of ServiceScene's
 * CinematographyViewportFrame (corner crosshairs, wireframe pre-viz,
 * JetBrains Mono HUD annotations) into a 2D card:
 *
 * - Resting: clean cell. Rounded corners come through `className`.
 * - Hover / focus-within (hover-capable devices only): four 1px corner
 *   brackets draw in from the corners on a 60ms stagger, and a mono
 *   metadata readout eases up from the bottom edge.
 * - Touch (no hover): the metadata readout renders statically; brackets
 *   stay hidden so the resting cell stays clean.
 * - Subtle inner parallax: the media layer translates a few percent with
 *   element scroll progress (transform-only, framer's scroll listener).
 * - prefers-reduced-motion: no parallax, no media bleed, instant states.
 */

export interface WorkFrameProps {
  client?: string;
  year?: string | number;
  discipline?: string;
  /** Optional frame counter, rendered top-right as e.g. "FR 04". */
  index?: number;
  className?: string;
  children: React.ReactNode;
}

/* Site-wide easing: [0.22, 1, 0.36, 1] */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const BRACKETS = [
  {
    key: "tl",
    pos: "top-3 left-3",
    edges: "border-t border-l",
    origin: "origin-top-left",
    delay: "delay-0",
  },
  {
    key: "tr",
    pos: "top-3 right-3",
    edges: "border-t border-r",
    origin: "origin-top-right",
    delay: "delay-[60ms]",
  },
  {
    key: "br",
    pos: "bottom-3 right-3",
    edges: "border-b border-r",
    origin: "origin-bottom-right",
    delay: "delay-[120ms]",
  },
  {
    key: "bl",
    pos: "bottom-3 left-3",
    edges: "border-b border-l",
    origin: "origin-bottom-left",
    delay: "delay-[180ms]",
  },
] as const;

export default function WorkFrame({
  client,
  year,
  discipline,
  index,
  className = "",
  children,
}: WorkFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setCanHover(mql.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

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

  // HUD chrome reveals on hover/focus-within only when the device actually
  // hovers; on touch the metadata line is simply static.
  const hudReveal = canHover
    ? `opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-[transform,opacity] duration-300 delay-75 ${EASE} motion-reduce:transition-none motion-reduce:delay-0`
    : "opacity-100 translate-y-0";

  return (
    <div ref={frameRef} className={`group relative overflow-hidden ${className}`}>
      {/* Media layer with scroll parallax */}
      <m.div
        className={`absolute ${prefersReducedMotion ? "inset-0" : "-inset-[5%]"}`}
        style={{ y: prefersReducedMotion ? 0 : parallaxY }}
      >
        {children}
      </m.div>

      {/* Corner crosshair brackets (2D echo of CinematographyViewportFrame) */}
      {BRACKETS.map((b) => (
        <span
          key={b.key}
          aria-hidden
          className={`pointer-events-none absolute z-30 h-4 w-4 border-electric-indigo ${b.pos} ${b.edges} ${b.origin} ${
            canHover
              ? `scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 transition-[transform,opacity] duration-200 ${b.delay} ${EASE} motion-reduce:transition-none motion-reduce:delay-0`
              : "hidden"
          }`}
        />
      ))}

      {/* Frame counter, top-right */}
      {typeof index === "number" && (
        <span
          className={`pointer-events-none absolute top-3 right-4 z-30 font-mono text-[10px] uppercase tracking-[0.25em] text-cool-gray ${hudReveal}`}
        >
          <span className="text-electric-indigo">FR</span>{" "}
          {String(index).padStart(2, "0")}
        </span>
      )}

      {/* Metadata readout, bottom edge */}
      {hasMeta && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 ${hudReveal}`}
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-3.5 pt-8">
            <span
              aria-hidden
              className="h-3 w-[2px] shrink-0 bg-electric-indigo"
            />
            <p className="truncate font-mono text-caption uppercase tracking-[0.18em] text-cool-gray">
              {metaParts.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
