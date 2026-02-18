"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TextReveal from "./TextReveal";
import WireframeTerrain from "./WireframeTerrain";

const ProcessPipeline = dynamic(() => import("./ProcessPipeline"), {
  ssr: false,
});

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Deep dive into your brand, audience, and objectives. We understand before we create.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Virtual environments, camera moves, and creative concepts. Every detail engineered in 3D.",
  },
  {
    number: "03",
    title: "PRODUCE",
    description:
      "Unreal Engine cinematics, 3D animation, and post-production. Real-time iteration, 4K delivery.",
  },
  {
    number: "04",
    title: "EVOLVE",
    description:
      "Performance data informs continuous improvement. Creative that gets smarter.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const headerVariants = {
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

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Process() {
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep((prev) => Math.max(prev, index));
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section id="process" className="relative bg-deep-space overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Wireframe terrain background */}
      <WireframeTerrain
        className="absolute inset-0 z-0"
        color="#6366F1"
        opacity={0.07}
        speed={1}
      />

      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #6366F1 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 section-container section-padding"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={headerVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Our Process
          </span>
          <TextReveal
            text="HOW WE PARTNER"
            as="h2"
            className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight"
          />
        </motion.div>

        {/* 3D Pipeline — desktop only */}
        <div className="hidden lg:block mx-auto max-w-[800px] h-[100px] mb-12">
          <ProcessPipeline activeStep={activeStep} className="w-full h-full" />
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
          {/* Connecting Line — horizontal on desktop */}
          <motion.div
            className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/10"
            variants={lineVariants}
            style={{ originX: 0 }}
          />

          {/* Connecting Line — vertical on mobile */}
          <motion.div
            className="md:hidden absolute top-0 bottom-0 left-8 w-px bg-white/10"
            variants={lineVariants}
            style={{ originY: 0 }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              ref={setStepRef(index)}
              className="relative flex md:flex-col items-start md:items-center text-left md:text-center px-0 md:px-6"
              variants={stepVariants}
            >
              {/* Step Node Dot — desktop */}
              <div className="hidden md:block absolute top-[48px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-electric-indigo ring-4 ring-deep-space z-10" />

              {/* Step Node Dot — mobile */}
              <div className="md:hidden absolute top-2 left-[29px] w-[9px] h-[9px] rounded-full bg-electric-indigo ring-4 ring-deep-space z-10" />

              {/* Mobile left spacing for the vertical line */}
              <div className="md:hidden w-20 flex-shrink-0" />

              <div className="flex-1 md:flex-initial">
                {/* Step Number */}
                <span className="font-mono text-5xl md:text-6xl font-bold text-electric-indigo/20 leading-none block mb-3 md:mb-6">
                  {step.number}
                </span>

                {/* Step Title */}
                <h3 className="font-headline font-bold text-xl text-pure-white mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-cool-gray text-sm leading-relaxed max-w-[260px] md:mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Mobile separator spacing */}
              {index < steps.length - 1 && (
                <div className="md:hidden h-8" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
