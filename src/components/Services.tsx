"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TextReveal from "./TextReveal";
import Lazy3D from "./Lazy3D";

// Dynamically import ServiceScene with SSR disabled (Three.js needs the DOM)
const ServiceScene = dynamic(() => import("./ServiceScene"), { ssr: false });

interface Service {
  label: string;
  headline: string;
  description: string;
  capabilities: string[];
  accentColor: string;
  scene: "cinematography" | "animation" | "direction" | "capture";
}

const services: Service[] = [
  {
    label: "VIRTUAL CINEMATOGRAPHY",
    headline: "Create any world. In 4K. Without leaving the studio.",
    description:
      "Unreal Engine 5 puts infinite environments at your fingertips. We build photorealistic virtual worlds, craft cinematic camera moves, and render in 4K — all in real-time. No location scouts. No travel days. No compromises on quality.",
    capabilities: [
      "Virtual world creation in UE5",
      "Cinematic camera work and sequencer animation",
      "4K real-time rendering",
      "Photorealistic environment design",
      "Look development and automated camera testing",
      "Multi-format delivery (16:9, 9:16, 4:5)",
    ],
    accentColor: "bg-electric-indigo",
    scene: "cinematography",
  },
  {
    label: "3D ANIMATION & VISUALIZATION",
    headline: "Products and worlds. Brought to life in pixels.",
    description:
      "From product launches to brand films, we create stunning 3D animation that captures attention. Cinema 4D and Unreal Engine 5 combine for photorealistic materials, dynamic motion, and cinematic storytelling.",
    capabilities: [
      "Product visualization and animation",
      "Environmental storytelling",
      "3D modeling and texturing",
      "Motion graphics and VFX",
      "4K delivery for any platform",
    ],
    accentColor: "bg-cyan-500",
    scene: "animation",
  },
  {
    label: "VIDEOGRAPHY & PHOTOGRAPHY",
    headline: "Real moments. Captured with intent.",
    description:
      "From brand documentaries and commercials to product photography and lifestyle shoots — we capture the real, human moments that make brands unforgettable. Every frame is deliberate, every shot tells a story.",
    capabilities: [
      "Brand documentaries and short films",
      "Commercial and promotional video",
      "Product photography and styling",
      "Lifestyle and editorial shoots",
      "On-location and studio production",
      "Color grading and retouching",
    ],
    accentColor: "bg-amber-500",
    scene: "capture",
  },
  {
    label: "CREATIVE DIRECTION & POST",
    headline: "Vision that drives results.",
    description:
      "Strategic creative direction ensures every asset serves your business goals. From brand films to social content — cohesive, compelling, and conversion-focused. Expert post-production brings it all together.",
    capabilities: [
      "Campaign strategy and concepting",
      "Video editing and color grading",
      "Motion graphics and compositing",
      "Brand storytelling",
      "Multi-channel execution",
    ],
    accentColor: "bg-warm-coral",
    scene: "direction",
  },
];

const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const textBlockVariants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const capabilityVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3 + i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="bg-deep-space relative overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04)_0%,transparent_50%)]" />

      {/* Section header */}
      <div className="section-container pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16 relative z-10">
        <motion.div
          variants={sectionHeadingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight">
            <TextReveal
              text="WHAT WE"
              as="span"
              className="inline"
            />{" "}
            <TextReveal
              text="DO"
              as="span"
              className="gradient-text inline"
              delay={0.15}
            />
          </h2>
        </motion.div>
      </div>

      {/* Service blocks */}
      <div className="relative z-10">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.label}
              className="border-t border-white/5 last:border-b"
            >
              <div className="section-container section-padding">
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12 lg:gap-16 xl:gap-20`}
                >
                  {/* 3D Scene visual */}
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="w-full lg:w-1/2 flex-shrink-0"
                  >
                    <Lazy3D className="aspect-video rounded-2xl overflow-hidden relative">
                      <ServiceScene
                        scene={service.scene}
                        className="w-full h-full"
                      />
                    </Lazy3D>
                  </motion.div>

                  {/* Text content */}
                  <motion.div
                    variants={textBlockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="w-full lg:w-1/2"
                  >
                    {/* Service label */}
                    <span className="inline-block font-mono text-xs tracking-widest uppercase text-electric-indigo mb-6 px-3 py-1.5 rounded-full border border-electric-indigo/20 bg-electric-indigo/5">
                      {service.label}
                    </span>

                    {/* Headline */}
                    <h3 className="font-headline text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-6">
                      <span className="gradient-text">{service.headline}</span>
                    </h3>

                    {/* Description */}
                    <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
                      {service.description}
                    </p>

                    {/* Capabilities grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {service.capabilities.map((cap, capIndex) => (
                        <motion.div
                          key={cap}
                          custom={capIndex}
                          variants={capabilityVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-40px" }}
                          className="flex items-start gap-3 group/cap"
                        >
                          {/* Indigo dot */}
                          <span
                            className={`mt-2 w-1.5 h-1.5 rounded-full ${service.accentColor} flex-shrink-0 group-hover/cap:scale-150 transition-transform duration-300`}
                          />
                          <span className="font-body text-sm text-cool-gray group-hover/cap:text-soft-white transition-colors duration-300 leading-relaxed">
                            {cap}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
