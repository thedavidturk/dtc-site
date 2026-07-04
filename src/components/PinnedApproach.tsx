"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

/**
 * PinnedApproach -- the scroll-scrubbed "Approach" section for case studies.
 *
 * Replaces the static numbered 01-05 list on project pages with the site's
 * one earned scroll moment, in the director's-viewport language (Bricolage
 * display numerals, JetBrains Mono HUD readouts, electric-indigo ticks --
 * see WorkFrame.tsx for the 2D vocabulary this extends).
 *
 * Mechanics (desktop, motion-safe):
 * - Outer container is steps.length * 90vh tall; the inner stage is
 *   `sticky top-0 h-screen`, so the section pins while the user scrubs.
 * - One `useScroll` progress value drives everything. Each step layer maps
 *   its own [start, end] slice of progress to opacity/translate via
 *   `useTransform` -- transform/opacity only, zero React state per frame.
 * - A thin progress rail (right edge) fills with scroll and carries a tick
 *   at every step boundary, so the pin reads as wayfinding.
 *
 * Fallback (below lg, or prefers-reduced-motion): the exact static
 * numbered-list layout the project pages shipped with -- same content, no
 * pinning. Chosen at render via the house matchMedia pattern (see
 * Hero.tsx's useIsDesktop): we default to the static list pre-mount so
 * SSR/hydration match, then swap to the pinned stage when the queries say
 * desktop + motion-ok.
 *
 * Accessibility: every step's title/body/readout is always in the DOM (the
 * scrub only animates visibility); only the oversized numeral and the rail
 * are aria-hidden; the section is labelled by its heading.
 *
 * Usage:
 *   import PinnedApproach from "@/components/PinnedApproach";
 *   <PinnedApproach
 *     eyebrow="The Approach"
 *     heading="Directing the experience end to end"
 *     steps={approach.map(({ title, description }) => ({
 *       title,
 *       body: description,
 *     }))}
 *   />
 */

export interface PinnedApproachStep {
  title: string;
  body: string;
}

export interface PinnedApproachProps {
  /** 3-6 steps; numbering (01..0N) is derived from array order. */
  steps: PinnedApproachStep[];
  eyebrow?: string;
  heading?: string;
}

/** Scroll runway per step. 90vh reads deliberate without feeling sticky. */
const VH_PER_STEP = 90;

const pad2 = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Desktop + motion-safe detection (house matchMedia pattern)         */
/* ------------------------------------------------------------------ */

function usePinnedCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCapable(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return capable;
}

/* ------------------------------------------------------------------ */
/*  One scrubbed step layer (hooks live here, not in a loop)           */
/* ------------------------------------------------------------------ */

interface StepLayerProps {
  step: PinnedApproachStep;
  index: number;
  count: number;
  progress: MotionValue<number>;
}

function StepLayer({ step, index, count, progress }: StepLayerProps) {
  const seg = 1 / count;
  const start = index * seg;
  const end = start + seg;
  // Crossfade band around each boundary, capped so short step counts
  // don't spend their whole runway mid-transition.
  const fade = Math.min(seg * 0.35, 0.12);
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // Build the progress keyframes once per mount; first/last steps hold
  // fully visible at the section edges instead of fading in from nothing.
  const input = [
    ...(isFirst ? [start] : [start, start + fade]),
    ...(isLast ? [end] : [end - fade, end]),
  ];
  const opacity = useTransform(progress, input, [
    ...(isFirst ? [1] : [0, 1]),
    ...(isLast ? [1] : [1, 0]),
  ]);
  // The numeral travels further than the text: a light parallax split
  // that sells the crossfade as one continuous scrub.
  const numeralY = useTransform(progress, input, [
    ...(isFirst ? [0] : [96, 0]),
    ...(isLast ? [0] : [0, -96]),
  ]);
  const textY = useTransform(progress, input, [
    ...(isFirst ? [0] : [44, 0]),
    ...(isLast ? [0] : [0, -44]),
  ]);

  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-12 items-center gap-8">
      {/* Oversized step numeral -- purely decorative */}
      <motion.div
        aria-hidden
        style={{ opacity, y: numeralY }}
        className="col-span-5 flex items-center gap-6"
      >
        <span className="h-16 w-px shrink-0 bg-electric-indigo" />
        <span className="font-display text-display font-bold text-pure-white/90 select-none">
          {pad2(index + 1)}
        </span>
      </motion.div>

      {/* Step readout + copy */}
      <motion.div
        style={{ opacity, y: textY }}
        className="col-span-6 col-start-7 max-w-xl"
      >
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-cool-gray mb-5">
          <span className="text-electric-indigo">Step</span> {pad2(index + 1)}{" "}
          <span className="text-white/30">/</span> {pad2(count)}
        </p>
        <h3 className="font-headline text-h3 font-bold text-pure-white mb-4">
          {step.title}
        </h3>
        <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed">
          {step.body}
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pinned stage (desktop, motion-safe)                                */
/* ------------------------------------------------------------------ */

interface PinnedStageProps {
  steps: PinnedApproachStep[];
  eyebrow?: string;
  heading?: string;
  headingId: string;
}

function PinnedStage({ steps, eyebrow, heading, headingId }: PinnedStageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const count = steps.length;

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `${count * VH_PER_STEP}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Section header, pinned at the top of the stage */}
        <div className="section-container pt-28 pb-4">
          {eyebrow && (
            <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 id={headingId} className="font-headline text-h3 font-bold">
              {heading}
            </h2>
          )}
        </div>

        {/* Scrub area: stacked step layers + progress rail */}
        <div className="section-container relative w-full flex-1 pb-16">
          {steps.map((step, i) => (
            <StepLayer
              key={step.title}
              step={step}
              index={i}
              count={count}
              progress={scrollYProgress}
            />
          ))}

          {/* Progress rail: fill scrubs with scroll, ticks mark the step
              boundaries so the pin reads as wayfinding. */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-[12%] bottom-[12%] w-px bg-white/10"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-electric-indigo"
              style={{ scaleY: scrollYProgress }}
            />
            {Array.from({ length: count + 1 }, (_, i) => (
              <span
                key={i}
                className="absolute right-0 h-px w-3 bg-white/25"
                style={{ top: `${(i / count) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static fallback (below lg / prefers-reduced-motion)                */
/*  Mirrors the numbered-list markup the project pages shipped with.   */
/* ------------------------------------------------------------------ */

interface StaticListProps {
  steps: PinnedApproachStep[];
  eyebrow?: string;
  heading?: string;
  headingId: string;
}

function StaticList({ steps, eyebrow, heading, headingId }: StaticListProps) {
  return (
    <div className="section-container section-padding">
      <div className="mb-16">
        {eyebrow && (
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 id={headingId} className="font-headline text-h3 font-bold">
            {heading}
          </h2>
        )}
      </div>

      <div className="space-y-12">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 group"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-3xl md:text-4xl font-bold text-electric-indigo/30 group-hover:text-electric-indigo transition-colors duration-500">
                {pad2(i + 1)}
              </span>
            </div>
            <div className="md:col-span-11">
              <h3 className="font-headline text-xl md:text-2xl font-bold text-pure-white mb-3 group-hover:text-soft-white transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-body text-cool-gray leading-relaxed max-w-3xl">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PinnedApproach({
  steps,
  eyebrow,
  heading,
}: PinnedApproachProps) {
  const headingId = useId();
  const pinned = usePinnedCapable();

  if (steps.length === 0) return null;

  return (
    <section
      aria-labelledby={heading ? headingId : undefined}
      aria-label={heading ? undefined : "Approach"}
    >
      {pinned ? (
        <PinnedStage
          steps={steps}
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
        />
      ) : (
        <StaticList
          steps={steps}
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
        />
      )}
    </section>
  );
}
