"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import JsonLd from "@/components/JsonLd";

const faqItems = [
  {
    question: "What is AI video generation and how does it work?",
    answer:
      "It is machine learning trained to create, edit, and enhance footage. I run these tools inside a real production pipeline, directed the same way I would direct a shoot, so what comes out is campaign-ready, not a demo reel. You get cinematic quality at a fraction of the time a traditional shoot takes.",
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer:
      "GEO is how you get your brand to show up when someone asks ChatGPT, Perplexity, or Google's AI Overviews instead of typing a search. It is not SEO with a new name. It rewards structured, authoritative content that an AI engine actually wants to cite, and I build for that from the start.",
  },
  {
    question:
      "How much does AI product visualization cost compared to traditional photography?",
    answer:
      "Usually 80 to 95 percent less. A traditional shoot can run anywhere from $20,000 to well over $150,000 once you count location, crew, and post. I can get you photorealistic product imagery for a fraction of that, with faster turnaround and as many variations as the campaign needs.",
  },
  {
    question: "What does David Turk Creative do?",
    answer:
      "Creative direction, film and photography, 3D, VFX and AI production, and brand campaigns. That covers commercials, documentaries, virtual worlds, product CGI, and AI-generated film, for brands and for original stories of my own. I use AI where it makes the work better, not just faster.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects see initial concepts in 1 to 2 weeks and final assets in 3 to 6 weeks, depending on scope. The AI-powered pipeline moves noticeably faster than a traditional shop, often cutting timelines by 50 to 70 percent without cutting corners.",
  },
  {
    question: "What is AI-native brand identity?",
    answer:
      "It is a brand system built to run on AI workflows instead of a static guidelines PDF. Your brand's visual DNA gets encoded once, so every piece that comes out afterward, human-made or AI-generated, stays on-brand automatically across every platform.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const easePrism = [0.52, 0.01, 0, 1] as const;

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ash-border">
      <button
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-8 py-8 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-body font-normal text-body-lg text-bone">
          {question}
        </span>
        <m.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.5, ease: easePrism }}
          className="flex-shrink-0 mt-[0.05em] text-bone text-2xl font-normal leading-none select-none transition-colors duration-500 ease-prism group-hover:text-fog-blue"
          aria-hidden="true"
        >
          +
        </m.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easePrism }}
            className="overflow-hidden"
          >
            <p className="max-w-[640px] font-body font-normal text-body-sm text-fog-blue pb-8">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-container section-padding">
      <JsonLd data={faqSchema} />
      <div className="max-w-3xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: easePrism }}
          className="mb-16 md:mb-24"
        >
          <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">
            FAQ
          </span>
          <h2 className="font-anton font-normal uppercase tracking-normal text-h2 text-bone mb-8">
            Questions
          </h2>
          <p className="max-w-[640px] font-body font-normal text-body-sm text-fog-blue">
            What people usually ask before we start.
          </p>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: easePrism }}
          className="border-t border-ash-border"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
