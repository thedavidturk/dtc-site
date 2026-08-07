"use client";

import { m } from "framer-motion";

/**
 * About -- the letter band.
 *
 * Bone prose on the obsidian void, set at heading-sm scale in a
 * single max-w-3xl column. One weight, one face: the thesis line
 * gets its emphasis from scale alone, stepping up to heading-lg.
 * A fog-blue eyebrow above, an outlined CTA and a ghost link below.
 */

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PRISM_EASE,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative ">
      <m.div
        className="relative section-container section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <m.p
            variants={fadeUp}
            className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-12 md:mb-16"
          >
            About DT+C
          </m.p>

          {/* The letter */}
          <m.p
            variants={fadeUp}
            className="font-body font-normal text-heading-sm text-bone"
          >
            Most agencies were built for a pace that no longer exists.
            Campaigns launch on Monday whether you&apos;re ready or not, and
            trends move faster than any traditional production timeline can
            keep up with.
          </m.p>

          {/* The thesis: scale is the emphasis */}
          <m.p
            variants={fadeUp}
            className="font-body font-semibold uppercase text-heading-lg headline-lime mt-10 md:mt-12"
          >
            DT+C was built for the pace of right now.
          </m.p>

          <m.p
            variants={fadeUp}
            className="font-body font-normal text-heading-sm text-bone mt-10 md:mt-12"
          >
            Our stack: 3D pipelines, AI workflows, VFX, video gen, and sound
            design, powered by a team that thinks in systems, not silos. We
            handle the full creative lifecycle, from strategy and research
            through 4K production and multi-platform delivery, so your brand
            never falls behind.
          </m.p>

          <m.p
            variants={fadeUp}
            className="font-body font-normal text-heading-sm text-bone mt-10 md:mt-12"
          >
            The future belongs to brands that adapt. We make sure
            you&apos;re one of them.
          </m.p>

          {/* CTAs: one outlined button, one ghost link */}
          <m.div
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-12 md:pt-16"
            variants={fadeUp}
          >
            <a href="mailto:david@davidturkcreative.com" className="btn-primary">
              Get in Touch
            </a>
            <a
              href="https://www.linkedin.com/in/davidturk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              Connect on LinkedIn
            </a>
          </m.div>

          {/* Sign-off */}
          <m.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mt-12 md:mt-16"
          >
            Built for what&apos;s next
          </m.p>
        </div>
      </m.div>
    </section>
  );
}
