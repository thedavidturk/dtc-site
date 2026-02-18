"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleNebula = dynamic(() => import("@/components/ParticleNebula"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-deep-space" />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const scrollIndicatorVariants = {
  animate: {
    y: [0, 12, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

interface HeroProps {
  introComplete?: boolean;
}

export default function Hero({ introComplete = true }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space pt-20">
      {/* 3D Particle Nebula background */}
      <ParticleNebula />

      {/* Overlay elements on top of the 3D canvas */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top edge gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-deep-space to-transparent" />

        {/* Bottom edge gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-space to-transparent" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 section-container section-padding text-center max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={introComplete ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.h1
          className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8"
          variants={fadeUp}
        >
          <span className="block text-pure-white">
            FUTURE-PROOF CREATIVE
          </span>
          <span className="block mt-2 gradient-text">
            FOR FORWARD-THINKING BRANDS
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body text-cool-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
          variants={fadeUp}
        >
          We combine Unreal Engine 5 virtual worlds, 4K cinematics, and
          intelligent workflows to create content that doesn&apos;t just keep
          up — it leads. Built for what&apos;s next.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          variants={fadeUp}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Our Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Project
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool-gray/50">
          Scroll
        </span>
        <motion.div variants={scrollIndicatorVariants} animate="animate">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cool-gray/50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
