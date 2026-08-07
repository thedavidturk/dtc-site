"use client";

/* Section headlines carry the prism's channels in rotation: the one
   chromatic voice, split across the page. */
const HEADLINE_CHANNELS = ["headline-cyan", "headline-lime", "headline-red", "headline-yellow"];

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Lazy3D from "./Lazy3D";

// Dynamically import ServiceScene with SSR disabled (Three.js needs the DOM)
const ServiceScene = dynamic(() => import("./ServiceScene"), { ssr: false });

interface Service {
  label: string;
  headline: string;
  oldWay: string;
  ourWay: string;
  result: string;
  capabilities: string[];
  scene: "cinematography" | "animation" | "direction" | "capture";
  sceneCaption: string;
}

const services: Service[] = [
  {
    label: "Creative Strategy & Research",
    headline: "Strategy first. So the work has somewhere to go.",
    oldWay:
      "A brief lands, production starts, and nobody can say what the work is actually for.",
    ourWay:
      "We start with research and positioning. Audience, category, and cultural insight shape a clear creative strategy and messaging platform before anything goes into production.",
    result:
      "Campaigns built on a point of view, not a guess. Creative that means something to the people you are trying to reach.",
    capabilities: [
      "Brand positioning and platforms",
      "Audience and category research",
      "Messaging and narrative frameworks",
      "Campaign concepting and big ideas",
      "Competitive and cultural insight",
      "Creative briefs that actually direct",
    ],
    scene: "direction",
    sceneCaption: "Direction study",
  },
  {
    label: "AI Production Pipelines",
    headline: "One idea in. A full campaign out.",
    oldWay:
      "Every asset built from scratch, every format a new project, every round of edits a new bottleneck.",
    ourWay:
      "Custom AI pipelines run alongside our team. Research agents, asset generation, VFX, and sound design, orchestrated so one concept becomes dozens of platform-ready deliverables, with a human directing every decision.",
    result:
      "More output, more formats, faster turnarounds, without the work feeling mass-produced.",
    capabilities: [
      "Custom AI workflow design",
      "Research and trend agents",
      "AI image and video generation",
      "One-to-many asset repurposing",
      "Multi-format, multi-platform delivery",
      "Human-in-the-loop quality control",
    ],
    scene: "animation",
    sceneCaption: "Animation study",
  },
  {
    label: "Virtual Cinematography",
    headline: "Create any world. In 4K. Without leaving the studio.",
    oldWay: "Location scouts, permits, travel days, weather delays.",
    ourWay:
      "Photorealistic worlds built in UE5. Any environment. Any lighting. Any camera move. Rendered in 4K in real-time.",
    result: "Campaign-ready footage in days, not weeks.",
    capabilities: [
      "Virtual world creation in UE5",
      "Cinematic camera work and sequencer animation",
      "4K real-time rendering",
      "Photorealistic environment design",
      "Look development and automated camera testing",
      "Multi-format delivery (16:9, 9:16, 4:5)",
    ],
    scene: "cinematography",
    sceneCaption: "Cinematography study",
  },
  {
    label: "3D Animation & Visualization",
    headline: "Products and worlds. Brought to life in pixels.",
    oldWay:
      "Physical prototypes, expensive photo shoots, weeks of post-production.",
    ourWay:
      "3D pipelines including animation, cinematics, and look development for photorealistic materials, dynamic motion, and cinematic storytelling, all before anything exists in the real world. Custom AI workflows for image and video generation, VFX, and sound design to elevate every visual.",
    result:
      "Launch visuals before products are manufactured. Test concepts before building sets. AI-enhanced production that moves faster and hits harder.",
    capabilities: [
      "Product visualization and animation",
      "Environmental storytelling",
      "3D modeling and texturing",
      "Motion graphics and VFX",
      "4K delivery for any platform",
    ],
    scene: "animation",
    sceneCaption: "Animation study",
  },
  {
    label: "Videography & Photography",
    headline: "Real moments. Captured with intent.",
    oldWay: "Bloated crews, multi-day shoots, months in post.",
    ourWay:
      "Lean, intentional production. Every frame planned, every shot deliberate. From brand documentaries to product photography, captured with cinematic precision.",
    result: "Premium content delivered fast, without the overhead.",
    capabilities: [
      "Brand documentaries and short films",
      "Commercial and promotional video",
      "Product photography and styling",
      "Lifestyle and editorial shoots",
      "On-location and studio production",
      "Color grading and retouching",
    ],
    scene: "capture",
    sceneCaption: "Capture study",
  },
  {
    label: "Creative Direction & Post",
    headline: "Vision that drives results.",
    oldWay:
      "Strategy in one silo, production in another, post-production in a third.",
    ourWay:
      "One team from concept through delivery. Campaign strategy, video editing, motion graphics, and multi-channel execution, all under one roof.",
    result:
      "Cohesive creative that moves faster because nobody's waiting on a handoff.",
    capabilities: [
      "Campaign strategy and concepting",
      "Video editing and color grading",
      "Motion graphics and compositing",
      "Brand storytelling",
      "Multi-channel execution",
    ],
    scene: "direction",
    sceneCaption: "Direction study",
  },
];

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const riseVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PRISM_EASE },
  },
};

const plateVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PRISM_EASE },
  },
};

export default function Services() {
  return (
    <section id="services" className="">
      {/* Section opener */}
      <div className="pt-24 md:pt-32 lg:pt-[150px] pb-16 md:pb-24">
        <div className="section-container">
          <m.p
            variants={riseVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
          >
            Capabilities
          </m.p>
          <m.h2
            variants={riseVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="font-headline text-heading-lg font-semibold uppercase headline-red"
          >
            What we do
          </m.h2>
        </div>
      </div>

      {/* Service rows: hairline-divided listings on the void */}
      <div>
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.label}
              className="border-t border-ash-border last:border-b"
            >
              <div className="section-container section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-start">
                  {/* Text column */}
                  <m.div
                    variants={riseVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className={isReversed ? "lg:order-2" : "lg:order-1"}
                  >
                    {/* Service title */}
                    <h3 className={`font-headline text-heading-sm font-semibold uppercase max-w-[640px] ${HEADLINE_CHANNELS[index % 4]}`}>
                      {service.headline}
                    </h3>

                    {/* Ghost service label */}
                    <p className="font-body text-body font-normal text-fog-blue pt-[20px] pb-[30px]">
                      {service.label}
                    </p>

                    {/* Old way / Our way / Result */}
                    <div className="max-w-[640px] space-y-8 mb-14">
                      <div>
                        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                          The old way
                        </p>
                        <p className="font-body text-body-sm font-normal text-fog-blue">
                          {service.oldWay}
                        </p>
                      </div>
                      <div>
                        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                          Our way
                        </p>
                        <p className="font-body text-body-sm font-normal text-bone">
                          {service.ourWay}
                        </p>
                      </div>
                      <div>
                        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                          Result
                        </p>
                        <p className="font-body text-body font-normal text-bone">
                          {service.result}
                        </p>
                      </div>
                    </div>

                    {/* Capability list */}
                    <ul className="max-w-[640px] space-y-3 list-none">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="flex items-baseline gap-3">
                          <span
                            aria-hidden="true"
                            className="text-caption text-fog-blue flex-shrink-0"
                          >
                            &middot;
                          </span>
                          <span className="font-body text-body-sm font-normal text-fog-blue">
                            {cap}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </m.div>

                  {/* 3D scene as media card */}
                  <m.figure
                    variants={plateVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className={isReversed ? "lg:order-1" : "lg:order-2"}
                  >
                    <Lazy3D className="aspect-video rounded-[15px] overflow-hidden border border-ash-border relative">
                      <ServiceScene
                        scene={service.scene}
                        className="w-full h-full"
                      />
                    </Lazy3D>
                    <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
                        {service.sceneCaption}
                      </span>
                      <span className="font-body text-caption font-normal text-fog-blue">
                        Rendered live in-browser
                      </span>
                    </figcaption>
                  </m.figure>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
