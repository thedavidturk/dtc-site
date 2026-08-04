"use client";

import { m } from "framer-motion";

/**
 * About -- the inverted editorial letter.
 *
 * Full-bleed warm-ink band, centered serif prose in cream, small-caps
 * eyebrows top and bottom. Pure type: the paper/ink inversion is the
 * entire visual event.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
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
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-warm-ink overflow-hidden"
      style={{ backgroundColor: "#2a2722" }}
    >
      <m.div
        className="relative z-10 section-container py-20 md:py-28 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Top eyebrow */}
          <m.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.14em] text-bone-white/60 mb-12 md:mb-16"
          >
            About DT+C
          </m.p>

          {/* The letter */}
          <m.p
            variants={fadeUp}
            className="font-serif text-2xl md:text-3xl font-normal leading-[1.25] text-bone-white"
          >
            Most agencies were built for a pace that no longer exists.
            Campaigns launch on Monday whether you&apos;re ready or not, and
            trends move faster than any traditional production timeline can
            keep up with.
          </m.p>

          <m.p
            variants={fadeUp}
            className="font-serif italic text-3xl md:text-4xl font-normal leading-[1.2] text-bone-white mt-10 md:mt-12"
          >
            DT+C was built for the pace of right now.
          </m.p>

          <m.p
            variants={fadeUp}
            className="font-serif text-2xl md:text-3xl font-normal leading-[1.25] text-bone-white mt-10 md:mt-12"
          >
            Our stack: 3D pipelines, AI workflows, VFX, video gen, and sound
            design, powered by a team that thinks in systems, not silos. We
            handle the full creative lifecycle, from strategy and research
            through 4K production and multi-platform delivery, so your brand
            never falls behind.
          </m.p>

          <m.p
            variants={fadeUp}
            className="font-serif text-2xl md:text-3xl font-normal leading-[1.25] text-bone-white mt-10 md:mt-12"
          >
            The future belongs to brands that adapt. We make sure
            you&apos;re one of them.
          </m.p>

          {/* CTAs - inverted pills */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-12 md:pt-16"
            variants={fadeUp}
          >
            <m.a
              href="https://www.linkedin.com/in/davidturk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-bone-white/40 text-bone-white font-body font-normal rounded-pill transition-colors duration-300 hover:border-bone-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </m.a>
            <m.a
              href="mailto:david@davidturkcreative.com"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-bone-white text-warm-ink font-body font-normal rounded-pill transition-opacity duration-300 hover:opacity-80"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Get in Touch
            </m.a>
          </m.div>

          {/* Bottom eyebrow - mirrored sign-off */}
          <m.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.14em] text-bone-white/60 mt-12 md:mt-16"
          >
            Built for what&apos;s next
          </m.p>
        </div>
      </m.div>
    </section>
  );
}
