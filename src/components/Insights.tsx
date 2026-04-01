"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HolographicSheen from "./HolographicSheen";
import Lazy3D from "./Lazy3D";

// ---------------------------------------------------------------------------
// Dynamic imports for Three.js cover scenes (SSR disabled)
// ---------------------------------------------------------------------------
const InsightCoverVirtualWorlds = dynamic(
  () => import("./InsightCoverVirtualWorlds"),
  { ssr: false }
);
const InsightCoverRealTime4K = dynamic(
  () => import("./InsightCoverRealTime4K"),
  { ssr: false }
);
const InsightCoverBuildingWorlds = dynamic(
  () => import("./InsightCoverBuildingWorlds"),
  { ssr: false }
);
const InsightCoverProductViz = dynamic(
  () => import("./InsightCoverProductViz"),
  { ssr: false }
);
const InsightCoverShortForm = dynamic(
  () => import("./InsightCoverShortForm"),
  { ssr: false }
);
const InsightCoverBrandIdentity = dynamic(
  () => import("./InsightCoverBrandIdentity"),
  { ssr: false }
);

const coverComponents: Record<string, React.ComponentType> = {
  InsightCoverVirtualWorlds,
  InsightCoverRealTime4K,
  InsightCoverBuildingWorlds,
  InsightCoverProductViz,
  InsightCoverShortForm,
  InsightCoverBrandIdentity,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface BlogPost {
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  slug: string;
  month: string;
  coverComponent: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const posts: BlogPost[] = [
  {
    title: "Why Your Competitors Are Using AI Agents — And You Should Too",
    subtitle:
      "Autonomous AI agents are transforming how businesses operate. Here is why the companies adopting them now are pulling ahead.",
    category: "AI + BUSINESS",
    gradient: "from-indigo-500/40 via-blue-900/60 to-deep-space",
    slug: "ai-agents-business",
    month: "APR 2026",
    coverComponent: "InsightCoverVirtualWorlds",
  },
  {
    title: "The Rise of AI-Generated UGC: Authentic Content Without the Creator",
    subtitle:
      "AI-generated user content is blurring the line between real and synthetic. Brands that master this format will dominate social feeds.",
    category: "AI + MARKETING",
    gradient: "from-rose-500/30 via-pink-900/50 to-deep-space",
    slug: "ai-generated-ugc",
    month: "APR 2026",
    coverComponent: "InsightCoverRealTime4K",
  },
  {
    title: "From Prompt to Production: How AI Is Rewriting the Creative Brief",
    subtitle:
      "The traditional creative brief was built for a slower world. AI is compressing the gap between idea and execution.",
    category: "AI + CREATIVE",
    gradient: "from-fuchsia-500/30 via-purple-900/50 to-deep-space",
    slug: "ai-creative-brief",
    month: "APR 2026",
    coverComponent: "InsightCoverBuildingWorlds",
  },
  {
    title: "The AI Content Flywheel: How Smart Brands Turn One Idea Into 50 Assets",
    subtitle:
      "The brands winning the content game are not producing more — they are producing smarter with AI-powered content flywheels.",
    category: "CONTENT STRATEGY",
    gradient: "from-violet-500/30 via-purple-900/50 to-deep-space",
    slug: "ai-content-flywheel",
    month: "APR 2026",
    coverComponent: "InsightCoverProductViz",
  },
  {
    title: "Why Every Brand Needs a Custom AI Workflow (Not Just Off-the-Shelf Tools)",
    subtitle:
      "Off-the-shelf AI tools are table stakes. The real competitive advantage comes from custom workflows built around your brand.",
    category: "AI + OPERATIONS",
    gradient: "from-sky-500/30 via-cyan-900/50 to-deep-space",
    slug: "custom-ai-workflows",
    month: "APR 2026",
    coverComponent: "InsightCoverShortForm",
  },
  {
    title: "AI-Powered Advertising: The End of the Generic Campaign",
    subtitle:
      "Generic one-size-fits-all ad campaigns are dying. AI-powered creative production lets brands run hyper-targeted campaigns that convert.",
    category: "AI + ADVERTISING",
    gradient: "from-red-500/30 via-rose-900/50 to-deep-space",
    slug: "ai-powered-advertising",
    month: "APR 2026",
    coverComponent: "InsightCoverBrandIdentity",
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Live date helper
// ---------------------------------------------------------------------------
function getLiveDate(): string {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = now.getFullYear();
  return `${month} ${year}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Insights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [liveDate, setLiveDate] = useState("");

  useEffect(() => {
    setLiveDate(getLiveDate());
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 400;
    const gap = 24;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section id="insights" className="bg-deep-space section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.04)_0%,transparent_50%)]" />

      <motion.div
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div className="section-container text-center mb-12 md:mb-16" variants={headingVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Insights
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
            PERSPECTIVES
          </h2>
          {liveDate && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
                {liveDate}
              </span>
            </div>
          )}
          <p className="font-body text-cool-gray text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Thoughts on AI-driven production, creative technology, and the future of brand content. New perspectives every month.
          </p>
        </motion.div>

        {/* Scroll controls */}
        <div className="section-container flex items-center justify-end gap-3 mb-6">
          <span className="font-mono text-xs text-cool-gray tracking-wider mr-auto">
            {posts.length} ARTICLES
          </span>
          <button
            onClick={() => scroll("left")}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "border-white/20 text-pure-white hover:bg-white/10 hover:border-white/40"
                : "border-white/5 text-white/20 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "border-white/20 text-pure-white hover:bg-white/10 hover:border-white/40"
                : "border-white/5 text-white/20 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Scrollable card track */}
        <div className="relative">
          {/* Left fade */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#0B0F19] to-transparent pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Right fade */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#0B0F19] to-transparent pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post) => {
              const CoverScene = coverComponents[post.coverComponent];
              return (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw] snap-start"
              >
                <Link href={`/insights/${post.slug}`} className="block h-full bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-2xl hover:shadow-black/30">
                  <HolographicSheen className="rounded-2xl h-full flex flex-col">
                    {/* Cover area */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
                      />

                      {/* Three.js cover scene */}
                      {CoverScene && (
                        <Lazy3D className="absolute inset-0 z-10">
                          <CoverScene />
                        </Lazy3D>
                      )}

                      {/* Noise overlay */}
                      <div className="absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

                      {/* Grid pattern */}
                      <div className="absolute inset-0 z-20 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                      {/* Bottom fade */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 z-20 bg-gradient-to-t from-[#0B0F19]/80 to-transparent" />

                      {/* Month badge */}
                      <div className="absolute top-4 right-4 z-30">
                        <span className="font-mono text-[10px] tracking-widest text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                          {post.month}
                        </span>
                      </div>

                      {/* Corner accent glow on hover */}
                      <div className="absolute top-0 right-0 w-32 h-32 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)]" />
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category label */}
                      <div className="border-l-2 border-electric-indigo pl-3">
                        <span className="font-mono text-xs text-electric-indigo uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-headline font-bold text-lg text-pure-white mt-3 leading-snug group-hover:text-soft-white transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-cool-gray text-sm mt-2 leading-relaxed flex-1">
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
                </Link>
              </motion.article>
              );
            })}
          </div>
        </div>

        {/* Scroll progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {posts.map((post, i) => (
            <button
              key={post.slug}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const card = el.querySelectorAll("article")[i];
                if (card) {
                  card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
                }
              }}
              className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/50 transition-colors duration-300"
              aria-label={`Go to article ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
