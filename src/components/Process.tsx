"use client";

/* Section headlines carry the prism's channels in rotation: the one
   chromatic voice, split across the page. */
const HEADLINE_CHANNELS = ["headline-cyan", "headline-lime", "headline-red", "headline-yellow"];

import { m } from "framer-motion";
import LineReveal from "./LineReveal";

const steps = [
  {
    number: "01",
    label: "Phase 01",
    title: "Discover",
    description:
      "Deep dive into your brand, audience, and objectives. We understand before we create.",
  },
  {
    number: "02",
    label: "Phase 02",
    title: "Design",
    description:
      "Virtual environments, camera moves, and creative concepts. Every detail engineered in 3D.",
  },
  {
    number: "03",
    label: "Phase 03",
    title: "Produce",
    description:
      "3D pipelines, AI workflows, VFX, video gen, and sound design. Cinematic quality, 4K ready.",
  },
  {
    number: "04",
    label: "Phase 04",
    title: "Evolve",
    description:
      "Performance data informs continuous improvement. Creative that gets smarter.",
  },
];

const easePrism = [0.52, 0.01, 0, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easePrism,
      delay: i * 0.08,
    },
  }),
};

export default function Process() {
  return (
    <section id="process" className="section-padding">
      {/* Section opener */}
      <div className="section-container mb-12 md:mb-16">
        <m.span
          className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easePrism }}
        >
          Our Process
        </m.span>
        <h2 className="font-anton font-normal uppercase tracking-normal text-h2 headline-yellow">
          <LineReveal>How we partner</LineReveal>
        </h2>
      </div>

      {/* The four phases, side by side: one row at desktop, 2x2 at
          tablet, a tight stack on mobile. Each card carries its own
          top hairline so the grid reads as one broken rule. */}
      <div className="section-container">
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <m.div
              key={step.number}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="border-t border-ash-border py-8 md:py-10"
            >
              <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
                {step.label}
              </span>
              <h3 className={`font-headline font-semibold uppercase text-heading-sm mt-4 mb-4 ${HEADLINE_CHANNELS[index % 4]}`}>
                {step.title}
              </h3>
              <p className="text-body-sm font-normal text-fog-blue">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
