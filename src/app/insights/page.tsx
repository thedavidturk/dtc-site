"use client";

import Link from "next/link";
import { m } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Article Data                                                        */
/* ------------------------------------------------------------------ */

const articles = [
  {
    title:
      "The Campaign You Can Walk Through: World Models Turn Brand Films Into Places",
    description:
      "Real-time world models like Genie 3 just turned brand worlds from something audiences watch into somewhere they can go. What that means for campaigns.",
    category: "AI + WORLDS",
    href: "/insights/playable-brand-worlds",
  },
  {
    title: "One Brief, a Thousand Variants: Creative Ops in the Agent Era",
    description:
      "The platforms just industrialized creative variation. Orchestration and governance, not generation, are the new job.",
    category: "AI + OPERATIONS",
    href: "/insights/agentic-creative-ops",
  },
  {
    title: "Taste Is the Bottleneck: Creative Direction in the Slop Flood",
    description:
      "Audiences got fluent at spotting machine-made sameness this year. The answer is more direction, not less AI.",
    category: "CRAFT + AI",
    href: "/insights/taste-is-the-bottleneck",
  },
  {
    title: "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    description:
      "OpenAI shut Sora down in March 2026. The studios making the best brand video now run a stack of tools, not one. Here is how we orchestrate it.",
    category: "AI + VIDEO",
    href: "/insights/ai-video-stack",
  },
  {
    title:
      "Native Audio Changes Everything: The Year AI Learned to Score Its Own Footage",
    description:
      "AI video models now generate matching sound in the same pass as the picture, collapsing a whole post stage. Where it wins, and where human sound direction still does.",
    category: "AI + PRODUCTION",
    href: "/insights/ai-native-audio",
  },
  {
    title: "Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website",
    description:
      "Discovery has moved from ranking on Google to being the source an AI cites. How brands stay found in a zero-click world.",
    category: "AI + DISCOVERY",
    href: "/insights/zero-click-visibility",
  },
  {
    title:
      "The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads",
    description:
      "As AI makes infinite content cheap, authenticity becomes the scarce, premium asset. How brands earn trust instead of faking it.",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
  },
  {
    title:
      "Virtual Production Without the Volume: AI Pre-Viz and LED-Free Worldbuilding",
    description:
      "LED volumes used to demand a soundstage and a massive budget. AI pre-viz and generative 3D worlds give smaller studios virtual production thinking.",
    category: "VIRTUAL PRODUCTION",
    href: "/insights/virtual-production-ai",
  },
  {
    title:
      "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video",
    description:
      "A 60-second video that took 13 days now ships in 27 minutes. The bottleneck moved from production to taste. Here is how we rebuilt the pipeline.",
    category: "PRODUCTION STRATEGY",
    href: "/insights/ai-content-pipeline",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */

const prismEase = [0.52, 0.01, 0, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: prismEase,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: prismEase,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function InsightsIndexPage() {
  return (
    <div className="min-h-screen bg-obsidian text-bone">
      {/* -- Opener: eyebrow and display statement on the void --------- */}
      <m.section
        className="section-container pt-32 pb-20 md:pt-40 md:pb-28"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <m.div variants={heroVariants}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
          >
            <svg
              className="h-4 w-4 transition-transform duration-500 ease-prism group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
        </m.div>

        <div className="mt-20 md:mt-28">
          <m.span
            variants={heroVariants}
            className="block text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            Insights
          </m.span>
          <m.h1
            variants={heroVariants}
            className="mt-6 font-body text-display font-normal text-bone"
          >
            Perspectives
          </m.h1>
          <m.p
            variants={heroVariants}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            Thoughts on AI-driven production, creative technology, and the future
            of brand content.
          </m.p>
        </div>
      </m.section>

      {/* -- The index: one hairline-divided listing row per article --- */}
      <section className="section-container pb-32 md:pb-40">
        {/* Index header over a hairline rule */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={heroVariants}
          className="mb-16 flex items-end justify-between border-t border-ash-border pt-6 md:mb-20"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
            The Index
          </p>
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
            {articles.length} Articles
          </p>
        </m.div>

        <div className="border-b border-ash-border">
          {articles.map((article) => (
            <m.article
              key={article.href}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={rowVariants}
              className="border-t border-ash-border"
            >
              <Link
                href={article.href}
                className="group grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
              >
                {/* Category label */}
                <div className="md:col-span-3">
                  <p className="text-body font-normal text-fog-blue">
                    {article.category}
                  </p>
                </div>

                {/* Title and one-line deck */}
                <div className="md:col-span-7">
                  <h2 className="text-heading-sm font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                    {article.title}
                  </h2>
                  <p className="mt-3 max-w-[600px] text-body-sm font-normal text-fog-blue">
                    {article.description}
                  </p>
                </div>

                {/* Quiet read link at the row end */}
                <div className="flex items-start md:col-span-2 md:justify-end">
                  <span className="inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                    Read Article
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </m.article>
          ))}
        </div>
      </section>
    </div>
  );
}
