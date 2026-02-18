"use client";

import { motion } from "framer-motion";
import HolographicSheen from "./HolographicSheen";

interface BlogPost {
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  gradientAccent: string;
}

const posts: BlogPost[] = [
  {
    title: "Why I Switched from Location Shoots to Virtual Worlds",
    subtitle:
      "The transition from traditional production to Unreal Engine 5.",
    category: "VIRTUAL PRODUCTION",
    gradient: "from-electric-indigo/40 via-purple-900/60 to-deep-space",
    gradientAccent: "bg-electric-indigo/10",
  },
  {
    title: "4K in Real-Time: How Unreal Engine Changed Everything",
    subtitle:
      "Why real-time rendering is the future of premium content.",
    category: "TECHNOLOGY",
    gradient: "from-cyan-500/30 via-blue-900/50 to-deep-space",
    gradientAccent: "bg-cyan-500/10",
  },
  {
    title: "Building Worlds in Days, Not Months",
    subtitle:
      "The methodology behind rapid virtual production.",
    category: "METHODOLOGY",
    gradient: "from-warm-coral/30 via-amber-900/40 to-deep-space",
    gradientAccent: "bg-warm-coral/10",
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

const headingVariants = {
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
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
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

export default function Insights() {
  return (
    <section id="insights" className="bg-deep-space section-padding relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.04)_0%,transparent_50%)]" />

      <motion.div
        className="section-container relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div className="text-center mb-16 md:mb-20" variants={headingVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Insights
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
            PERSPECTIVES
          </h2>
          <p className="font-body text-cool-gray text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Thoughts on virtual production, real-time rendering, and the future of creative content.
          </p>
        </motion.div>

        {/* Blog post grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              className="group relative bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-2xl hover:shadow-black/30"
            >
              <HolographicSheen className="rounded-2xl">
                {/* Gradient image placeholder area */}
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
                  />

                  {/* Noise overlay */}
                  <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0F19]/80 to-transparent" />

                  {/* Corner accent glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)]" />
                </div>

                {/* Card content */}
                <div className="p-6">
                  {/* Category label */}
                  <div className="border-l-2 border-electric-indigo pl-3">
                    <span className="font-mono text-xs text-electric-indigo uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline font-bold text-xl text-pure-white mt-3 leading-snug group-hover:text-soft-white transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-cool-gray text-sm mt-2 leading-relaxed">
                    {post.subtitle}
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

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_40px_rgba(99,102,241,0.05)]" />
              </HolographicSheen>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
