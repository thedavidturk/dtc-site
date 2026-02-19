"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TextReveal from "./TextReveal";

const AboutVisual3D = dynamic(() => import("./AboutVisual3D"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[3/4] w-full max-w-[480px] mx-auto lg:mx-0 rounded-2xl"
      style={{
        background:
          "linear-gradient(160deg, #131A2B 0%, #1a1f35 30%, #0B0F19 70%, #1a1535 100%)",
      }}
    />
  ),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative bg-deep-space overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at center, #F97316 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at center, #6366F1 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 section-container section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16 md:mb-20" variants={fadeUp}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            About
          </span>
          <TextReveal
            text="BUILT FOR WHAT'S NEXT"
            as="h2"
            className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight"
          />
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — 3D Visual */}
          <motion.div className="relative" variants={slideFromLeft}>
            <AboutVisual3D className="aspect-[3/4] w-full max-w-[480px] mx-auto lg:mx-0 rounded-2xl overflow-hidden relative" />

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-electric-indigo/20 rounded-tl-xl" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-warm-coral/20 rounded-br-xl" />
          </motion.div>

          {/* Right — Story */}
          <motion.div className="space-y-6" variants={slideFromRight}>
            <p className="font-body text-lg text-cool-gray leading-relaxed">
              Too many brands are stuck waiting — on slow production timelines,
              expensive location shoots, and content pipelines that can&apos;t
              keep up with the pace of culture.
            </p>

            <p className="font-headline text-2xl text-pure-white font-bold leading-snug">
              DT+C was built to change that.
            </p>

            <p className="font-body text-lg text-cool-gray leading-relaxed">
              We&apos;re a strategy-led creative agency that starts with
              research, builds around audience insight, and delivers through
              production pipelines designed for speed. From content strategy to
              4K cinematics, 3D animation to multi-platform delivery — our team
              handles the full creative lifecycle so your brand stays ahead.
            </p>

            <p className="font-body text-lg text-cool-gray leading-relaxed">
              The future belongs to brands that adapt. We&apos;re the agency
              that makes sure you&apos;re one of them.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              variants={fadeUp}
            >
              <motion.a
                href="https://www.linkedin.com/in/davidturk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
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
              </motion.a>
              <motion.a
                href="mailto:david@davidturkcreative.com"
                className="btn-primary"
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
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
