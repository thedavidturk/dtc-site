"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: i * 0.12,
    },
  }),
};

const problems = [
  {
    title: "Slow agencies",
    description:
      "8-week timelines that miss the moment your audience is paying attention.",
  },
  {
    title: "Cheap content mills",
    description:
      "Volume without vision. Fast, forgettable, and off-brand.",
  },
  {
    title: "Traditional production",
    description:
      "$50K location shoots for a single deliverable.",
  },
];

export default function TheProblem() {
  return (
    <section
      className="relative bg-deep-space overflow-hidden"
      style={{ backgroundColor: "#0B0F19" }}
    >
      <div className="section-container pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-14 lg:pb-16 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <motion.span
            className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-electric-indigo mb-6"
            variants={fadeUp}
          >
            The Reality
          </motion.span>
          <TextReveal
            text="MOST BRANDS ARE CHOOSING BETWEEN THREE BAD OPTIONS"
            as="h2"
            className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl text-pure-white leading-tight"
          />
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
            >
              <motion.div
                className="group relative h-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:p-10 transition-colors duration-500"
                whileHover={{
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {/* Card hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Number */}
                <span className="relative inline-block font-mono text-xs text-electric-indigo/60 tracking-widest mb-4">
                  0{index + 1}
                </span>

                {/* Title */}
                <h3 className="relative font-headline font-bold text-lg md:text-xl text-pure-white mb-3">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="relative font-body text-cool-gray text-sm md:text-base leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="text-center font-headline text-xl md:text-2xl text-pure-white font-bold mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          There&apos;s a better way.{" "}
          <span className="gradient-text">We built it.</span>
        </motion.p>
      </div>
    </section>
  );
}
