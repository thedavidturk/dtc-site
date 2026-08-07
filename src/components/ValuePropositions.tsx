"use client";

/* Section headlines carry the prism's channels in rotation: the one
   chromatic voice, split across the page. */
const HEADLINE_CHANNELS = ["headline-cyan", "headline-lime", "headline-red", "headline-yellow"];

import { m } from "framer-motion";

/**
 * ValuePropositions -- the claims band.
 *
 * Obsidian void. A fog-blue eyebrow, a short bone lead line, then the
 * nine disciplines as hairline-divided rows: claim at heading-sm bone
 * on the left, description at body-sm fog-blue beside it. No cards,
 * no icons, no boxes. The 1px rules and the whitespace do all the
 * structural work.
 */

interface Pillar {
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    title: "Creative Strategy",
    description:
      "Positioning, brand platforms, and campaign concepts that give the work a reason to exist. We define what to say and why it matters before a single frame is made.",
  },
  {
    title: "Research & Discovery",
    description:
      "Audience, category, and cultural insight that grounds every idea. We dig into what your market actually responds to so the creative lands instead of guesses.",
  },
  {
    title: "AI Production Pipelines",
    description:
      "Custom AI workflows that turn one concept into a full campaign. Research, asset generation, and multi-format output, scaled without scaling your team.",
  },
  {
    title: "Virtual Cinematography",
    description:
      "Unreal Engine 5 virtual worlds and 4K cinematics. Create any environment, any location, without physical production. Real-time rendering means instant feedback.",
  },
  {
    title: "3D Animation & Visualization",
    description:
      "Photorealistic product visualization and dynamic motion graphics. Cinema 4D and UE5 combine for stunning 4K content, often before a product physically exists.",
  },
  {
    title: "Videography & Photography",
    description:
      "Cinematic storytelling, brand films, and high-impact imagery captured with intent. From documentaries to product shoots, every frame is made to count.",
  },
  {
    title: "Brand Systems & Messaging",
    description:
      "Visual identity, voice, and messaging frameworks that hold up across every channel. The connective tissue that makes a brand feel like one coherent thing.",
  },
  {
    title: "Content Flywheels",
    description:
      "One shoot, one render, one idea, repurposed into a steady stream of platform-native content. We build the engine, not just the one-off asset.",
  },
  {
    title: "Audience-First Craft",
    description:
      "Data-informed creative engineered for impact with your specific audience. Strategy and taste working together, measured against what actually moves people.",
  },
];

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PRISM_EASE,
    },
  },
};

export default function ValuePropositions() {
  return (
    <section id="value-propositions" className="relative ">
      <div className="section-padding">
        <div className="section-container">
          {/* Eyebrow */}
          <m.p
            className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-8 md:mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: PRISM_EASE }}
          >
            What We Do
          </m.p>

          {/* Lead line */}
          <m.p
            className="font-body font-normal text-body-lg text-bone max-w-[440px] mb-16 md:mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: PRISM_EASE }}
          >
            The future of creative production is here
          </m.p>

          {/* Claims as hairline-divided rows */}
          <div>
            {pillars.map((pillar, index) => (
              <m.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={rowVariants}
                className="border-t border-ash-border py-9 md:py-11 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-14"
              >
                <h3 className={`font-headline font-normal text-heading-sm md:col-span-6 lg:col-span-5 ${HEADLINE_CHANNELS[index % 4]}`}>
                  {pillar.title}
                </h3>
                <p className="font-body font-normal text-body-sm text-fog-blue md:col-span-6 lg:col-span-7 max-w-[640px]">
                  {pillar.description}
                </p>
              </m.div>
            ))}

            {/* Closing hairline */}
            <div className="border-t border-ash-border" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
