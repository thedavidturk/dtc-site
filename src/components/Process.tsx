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

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easePrism,
    },
  },
};

export default function Process() {
  return (
    <section id="process" className="section-padding">
      {/* Section opener */}
      <div className="section-container mb-20 md:mb-28">
        <m.span
          className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easePrism }}
        >
          Our Process
        </m.span>
        <h2 className="font-headline font-semibold uppercase text-h2 headline-yellow">
          <LineReveal>How we partner</LineReveal>
        </h2>
      </div>

      {/* Hairline step rows */}
      <div className="border-b border-ash-border">
        {steps.map((step, index) => (
          <div key={step.number} className="border-t border-ash-border">
            <m.div
              className="section-container py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {/* Step number */}
              <div className="md:col-span-3">
                <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
                  {step.label}
                </span>
              </div>

              {/* Step content */}
              <div className="md:col-span-9">
                <h3 className={`font-headline font-semibold uppercase text-heading-lg mb-6 ${HEADLINE_CHANNELS[index % 4]}`}>
                  {step.title}
                </h3>
                <p className="max-w-[640px] text-body-sm font-normal text-fog-blue">
                  {step.description}
                </p>
              </div>
            </m.div>
          </div>
        ))}
      </div>
    </section>
  );
}
