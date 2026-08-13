"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { m, MotionValue, useScroll, useTransform } from "framer-motion";

/**
 * PinnedApproach -- the scroll-pinned "director's viewport" for a
 * case study's Approach section.
 *
 * Replaces the static numbered 01-05 list on project pages with the
 * site's one earned scroll moment: a sticky stage where each step
 * crossfades in on the Prism system's own tokens (obsidian / bone /
 * fog-blue), the oversized step numeral set in Anton to match the
 * homepage hero's display voice, and a progress rail that carries the
 * spec's single narrow exception to "no prism color on UI": one prism
 * channel (cyan), used only as a wayfinding fill on this rail. See
 * DESIGN_SPEC.md, "PinnedApproach" for the full rationale.
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
/*  Section header -- eyebrow + heading, shared by both renderings     */
/* ------------------------------------------------------------------ */

function ApproachHeader({
  eyebrow,
  heading,
  headingId,
  className = "",
}: {
  eyebrow?: string;
  heading?: string;
  headingId: string;
  className?: string;
}) {
  if (!eyebrow && !heading) return null;
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2
          id={headingId}
          className="font-body text-heading-lg font-normal text-bone max-w-[900px]"
        >
          {heading}
        </h2>
      )}
    </div>
  );
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
      {/* Oversized step numeral -- purely decorative, Anton to match
          the homepage hero's display voice at case-study scale. */}
      <m.div
        aria-hidden
        style={{ opacity, y: numeralY }}
        className="col-span-5 flex items-center gap-6"
      >
        <span className="h-16 w-px shrink-0 bg-ash-border" />
        <span className="font-anton text-display font-normal uppercase tracking-normal text-bone/90 select-none">
          {pad2(index + 1)}
        </span>
      </m.div>

      {/* Step readout + copy */}
      <m.div
        style={{ opacity, y: textY }}
        className="col-span-6 col-start-7 max-w-xl"
      >
        <p className="font-body text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-5">
          Step {pad2(index + 1)}{" "}
          <span className="text-fog-blue/40">/</span> {pad2(count)}
        </p>
        <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
          {step.title}
        </h3>
        <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
          {step.body}
        </p>
      </m.div>
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
        <ApproachHeader
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
          className="section-container pt-28 pb-4"
        />

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

          {/* Progress rail: the spec's one narrow, named exception to
              "no prism color on UI" -- a single prism-cyan fill used
              purely as a wayfinding gauge, never as decoration. Track
              and boundary ticks stay on the neutral ash-border/bone
              tokens so the cyan reads as signal, not ornament. */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-[12%] bottom-[12%] w-px bg-ash-border"
          >
            <m.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-prism-cyan"
              style={{ scaleY: scrollYProgress }}
            />
            {Array.from({ length: count + 1 }, (_, i) => (
              <span
                key={i}
                className="absolute right-0 h-px w-3 bg-bone/40"
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
/*  Mirrors the numbered-list layout the project pages shipped with.   */
/* ------------------------------------------------------------------ */

interface StaticListProps {
  steps: PinnedApproachStep[];
  eyebrow?: string;
  heading?: string;
  headingId: string;
}

function StaticList({ steps, eyebrow, heading, headingId }: StaticListProps) {
  const count = steps.length;
  return (
    <div className="section-container section-padding">
      <ApproachHeader
        eyebrow={eyebrow}
        heading={heading}
        headingId={headingId}
        className="mb-16"
      />

      <div className="max-w-[720px]">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={`py-14 ${i > 0 ? "border-t border-ash-border" : ""}`}
          >
            <p className="font-body text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">
              Step {pad2(i + 1)}{" "}
              <span className="text-fog-blue/40">/</span> {pad2(count)}
            </p>
            <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
              {step.title}
            </h3>
            <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
              {step.body}
            </p>
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
