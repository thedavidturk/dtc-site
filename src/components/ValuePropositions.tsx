"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import to handle SSR gracefully -- Canvas requires browser APIs
const FloatingIcon = dynamic(() => import("./FloatingIcon"), { ssr: false });

type ShapeKey =
  | "globe"
  | "icosahedron"
  | "camera"
  | "aperture"
  | "nodes"
  | "torusKnot";

interface Pillar {
  shape: ShapeKey;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    shape: "globe",
    title: "VIRTUAL CINEMATOGRAPHY",
    description:
      "Unreal Engine 5 virtual worlds and 4K cinematics. Create any environment, any location \u2014 without physical production. Real-time rendering means instant feedback.",
  },
  {
    shape: "icosahedron",
    title: "3D ANIMATION & VISUALIZATION",
    description:
      "Photorealistic product visualization and dynamic motion graphics. Cinema 4D and UE5 combine for stunning 4K content.",
  },
  {
    shape: "camera",
    title: "VIDEOGRAPHY",
    description:
      "Professional video production from concept to final cut. Cinematic storytelling, brand films, and commercial content captured with precision and purpose.",
  },
  {
    shape: "aperture",
    title: "PHOTOGRAPHY",
    description:
      "High-impact visual imagery that elevates brands. Product photography, lifestyle shoots, and creative direction that makes every frame count.",
  },
  {
    shape: "nodes",
    title: "INTELLIGENT WORKFLOWS",
    description:
      "Systems that learn and adapt. From one concept to thirty deliverables automatically. Scale your content without scaling your team.",
  },
  {
    shape: "torusKnot",
    title: "AUDIENCE-FIRST CRAFT",
    description:
      "Data-informed creative that resonates. Every frame engineered for impact with your specific audience.",
  },
];

const sectionHeaderVariants = {
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

export default function ValuePropositions() {
  return (
    <section
      id="value-propositions"
      className="relative bg-deep-space py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse at center, #6366F1 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container section-padding relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionHeaderVariants}
        >
          <motion.span
            className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-electric-indigo mb-6"
            variants={sectionHeaderVariants}
          >
            What We Do
          </motion.span>
          <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl text-pure-white leading-tight">
            The future of creative production{" "}
            <span className="gradient-text">is here</span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
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

                {/* 3D Floating Icon */}
                <div className="relative mb-6 w-16 h-16 md:w-20 md:h-20">
                  <FloatingIcon shape={pillar.shape} />
                </div>

                {/* Title */}
                <h3 className="relative font-headline font-bold text-sm md:text-base tracking-[0.15em] text-pure-white mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="relative font-body text-cool-gray text-sm md:text-base leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
