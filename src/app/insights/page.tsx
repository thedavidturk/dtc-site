"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Article Data                                                        */
/* ------------------------------------------------------------------ */

const articles = [
  {
    title: "Why Your Competitors Are Using AI Agents — And You Should Too",
    description:
      "Autonomous AI agents are transforming how businesses operate — from customer service to content production.",
    category: "AI + BUSINESS",
    href: "/insights/ai-agents-business",
    gradient: "from-indigo-500/30 via-blue-900/50 to-deep-space",
  },
  {
    title:
      "The Rise of AI-Generated UGC: Authentic Content Without the Creator",
    description:
      "AI-generated user content is blurring the line between real and synthetic. Brands that master this format will dominate social feeds.",
    category: "AI + MARKETING",
    href: "/insights/ai-generated-ugc",
    gradient: "from-rose-500/30 via-pink-900/50 to-deep-space",
  },
  {
    title: "From Prompt to Production: How AI Is Rewriting the Creative Brief",
    description:
      "The traditional creative brief was built for a slower world. AI is compressing the gap between idea and execution.",
    category: "AI + CREATIVE",
    href: "/insights/ai-creative-brief",
    gradient: "from-fuchsia-500/30 via-purple-900/50 to-deep-space",
  },
  {
    title:
      "The AI Content Flywheel: How Smart Brands Turn One Idea Into 50 Assets",
    description:
      "The brands winning the content game aren't producing more — they're producing smarter with AI-powered content flywheels.",
    category: "CONTENT STRATEGY",
    href: "/insights/ai-content-flywheel",
    gradient: "from-violet-500/30 via-purple-900/50 to-deep-space",
  },
  {
    title:
      "Why Every Brand Needs a Custom AI Workflow (Not Just Off-the-Shelf Tools)",
    description:
      "Off-the-shelf AI tools are table stakes. The real competitive advantage comes from custom workflows built around your brand.",
    category: "AI + OPERATIONS",
    href: "/insights/custom-ai-workflows",
    gradient: "from-sky-500/30 via-cyan-900/50 to-deep-space",
  },
  {
    title:
      "AI-Powered Advertising: The End of the Generic Campaign",
    description:
      "Generic one-size-fits-all ad campaigns are dying. AI-powered creative production lets brands run hyper-targeted campaigns that convert.",
    category: "AI + ADVERTISING",
    href: "/insights/ai-powered-advertising",
    gradient: "from-red-500/30 via-rose-900/50 to-deep-space",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const heroVariants = {
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
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function InsightsIndexPage() {
  return (
    <div className="bg-deep-space min-h-screen">
      {/* -- Back Link ------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-24 left-6 md:left-8 lg:left-12 z-40"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cool-gray hover:text-pure-white transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
      </motion.div>

      {/* -- Hero Section ---------------------------------------------- */}
      <motion.section
        className="section-container pt-32 pb-16 md:pt-40 md:pb-20 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span
          variants={heroVariants}
          className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block"
        >
          Insights
        </motion.span>
        <motion.h1
          variants={heroVariants}
          className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-pure-white tracking-tight"
        >
          Perspectives
        </motion.h1>
        <motion.p
          variants={heroVariants}
          className="font-body text-cool-gray text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Thoughts on AI-driven production, creative technology, and the future
          of brand content.
        </motion.p>
      </motion.section>

      {/* -- Article Grid ---------------------------------------------- */}
      <motion.section
        className="section-container section-padding pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <motion.article key={article.href} variants={cardVariants}>
              <Link
                href={article.href}
                className="group block h-full bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-electric-indigo/30 hover:shadow-2xl hover:shadow-electric-indigo/5"
              >
                {/* Gradient header */}
                <div className="relative h-40 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
                  />
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0F19]/80 to-transparent" />
                  {/* Corner accent glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)]" />
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col">
                  {/* Category badge */}
                  <div className="border-l-2 border-electric-indigo pl-3">
                    <span className="font-mono text-xs text-electric-indigo uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-headline font-bold text-lg text-pure-white mt-3 leading-snug group-hover:text-soft-white transition-colors duration-300">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-cool-gray text-sm mt-2 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Read Article link */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <span className="inline-flex items-center gap-2 text-warm-coral text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Read Article
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
