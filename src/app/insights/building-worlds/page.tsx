"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Related Articles                                                   */
/* ------------------------------------------------------------------ */

const moreArticles = [
  {
    title: "AI Video Generation Is Replacing Traditional Production Pipelines",
    category: "AI PRODUCTION",
    href: "/insights/virtual-worlds",
    gradient: "from-electric-indigo/40 via-purple-900/60 to-deep-space",
  },
  {
    title: "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
    category: "CREATIVE TECHNOLOGY",
    href: "/insights/real-time-4k",
    gradient: "from-cyan-500/30 via-blue-900/50 to-deep-space",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BuildingWorldsArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
      <ArticleJsonLd
        title="Your Brand in the Age of AI Search: Why GEO Is the New SEO"
        description="Generative Engine Optimization is reshaping how brands get discovered. If you're still optimizing only for Google rankings, you're optimizing for yesterday."
        datePublished="2026-02-01"
        url="https://davidturkcreative.com/insights/building-worlds"
      />
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

      {/* -- Hero ----------------------------------------------------- */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-coral via-amber-700 to-amber-950" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-[15%] w-28 h-28 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-[18%] w-24 h-24 border border-white/10 rounded-xl -rotate-12" />
        <div className="absolute bottom-2/5 left-2/5 w-3 h-3 bg-warm-coral/30 rounded-full" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              AI Strategy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            Your Brand in the Age of AI Search: Why GEO Is the New SEO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            Generative Engine Optimization is reshaping how brands get
            discovered. If you&rsquo;re still optimizing only for Google
            rankings, you&rsquo;re optimizing for yesterday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4 mt-6"
          >
            <span className="font-mono text-xs text-white/50 tracking-wide">
              David Turk
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-mono text-xs text-white/50 tracking-wide">
              9 min read
            </span>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-warm-coral to-amber-500 mt-8"
          />
        </div>
      </section>

      {/* -- Article Body --------------------------------------------- */}
      <section className="section-container section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto"
        >
          {/* --- The Shift --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Way People Find Brands Has Fundamentally Changed
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Nearly 800 million people a week now use ChatGPT alone to answer
              questions, compare options, and plan purchases. 35% of Gen Z uses
              AI chatbots as their primary search tool. When someone asks an AI
              assistant &ldquo;what creative studio should I hire for a product
              launch video,&rdquo; the AI doesn&rsquo;t return ten blue links.
              It returns a direct recommendation. If your brand isn&rsquo;t in
              that recommendation, you don&rsquo;t exist for that buyer.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is the shift from SEO (Search Engine Optimization) to GEO
              (Generative Engine Optimization). Traditional SEO optimized for
              rankings, traffic, and clicks on Google. GEO optimizes for being
              cited, mentioned, and recommended in AI-generated answers across
              platforms like ChatGPT, Google AI Overviews, Perplexity, and
              Gemini.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The overlap between top Google links and AI-cited sources has
              dropped from 70% to below 20%. Ranking on page one of Google no
              longer guarantees visibility in the AI answers that are
              increasingly where buyer research starts and ends.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            If your brand doesn&rsquo;t show up in AI-generated
            recommendations, it doesn&rsquo;t matter how well you rank on
            Google. The buyer never sees you.
          </motion.blockquote>

          {/* --- What GEO Actually Means --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              What Generative Engine Optimization Actually Means
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              GEO is not a rebrand of SEO. It requires a fundamentally
              different approach to content strategy. AI systems don&rsquo;t
              crawl and rank pages the way Google does. They understand the
              world through entities (brands, people, concepts) and the
              relationships between them. They favor authoritative,
              evidence-backed content over keyword-stuffed pages.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Where traditional SEO rewarded publishing frequency and keyword
              volume, GEO rewards expertise, credibility, and topical depth.
              AI engines pull from sources they trust, and trust is built
              through consistent, substantive content that demonstrates real
              knowledge, not content farms churning out thin articles optimized
              for search crawlers.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is actually good news for brands that do legitimate work.
              If you have genuine expertise and you articulate it clearly, GEO
              rewards you. If you&rsquo;ve been gaming search rankings with
              low-quality content, the AI era is going to be painful.
            </p>
          </motion.div>

          {/* --- Why It Matters for Creative Brands --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Why This Matters for Every Brand Producing Content
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s where this connects directly to what we do at DT+C.
              The content you produce (videos, visuals, written insights,
              case studies) is now the primary signal that AI engines use to
              understand what your brand does and whether to recommend it. Your
              content isn&rsquo;t just marketing collateral anymore.
              It&rsquo;s your AI visibility strategy.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              A brand with a rich library of well-produced video content,
              detailed case studies, and substantive thought leadership will
              show up in AI recommendations. A brand with a thin website and a
              social media presence built on reposts will not. The quality and
              depth of your content portfolio directly determines whether AI
              engines consider you an authority worth citing.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            Your content portfolio is no longer just a marketing asset.
            It&rsquo;s the data that AI engines use to decide whether your
            brand deserves to be recommended.
          </motion.blockquote>

          {/* --- How We're Building for GEO --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              How We Build Content for AI Visibility
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We&rsquo;ve restructured our content approach around GEO
              principles, both for our own brand and for our clients. The
              strategy centers on three pillars.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Topical authority over keyword targeting.</strong>{" "}
              Instead of chasing individual keywords, we build comprehensive
              content around topics we genuinely own. For us, that&rsquo;s
              AI-powered creative production, 3D pipelines, and brand content
              strategy. Every piece of content we publish reinforces our
              authority in these areas, making it more likely that AI engines
              cite us when users ask about these subjects.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Entity-first thinking.</strong>{" "}
              AI engines understand brands as entities with attributes and
              relationships. We ensure our brand identity is clearly
              articulated across every touchpoint: who we are, what we do, who
              we serve, what makes us different. Structured data, consistent
              messaging, and clear positioning all feed into how AI systems
              categorize and recommend us.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Evidence over assertions.</strong>{" "}
              AI engines heavily favor content that provides evidence: case
              studies with real results, specific methodologies, concrete
              examples. Vague marketing language gets filtered out. Substantive,
              evidence-backed content gets cited. This has pushed us to be more
              transparent and specific in how we talk about our work, which has
              been good for client relationships too.
            </p>
          </motion.div>

          {/* --- The Visibility Gap --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Widening Visibility Gap
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              By the end of 2026, the gap between brands that proactively
              manage AI visibility and those that don&rsquo;t will be
              impossible to ignore. The brands investing in GEO now will
              consistently appear in AI-generated recommendations, shaping how
              buyers understand their market. The ones that ignore it will be
              mentioned less often, lose market share, and watch revenue
              growth slow without understanding why.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This isn&rsquo;t speculation. We&rsquo;re already seeing it play
              out. Brands with deep, authoritative content libraries are
              showing up in AI responses for commercial queries. Brands with
              thin content footprints are invisible, regardless of how much
              they spend on traditional advertising.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The brands that own their AI narrative now will define their
            category in the minds of AI-assisted buyers. The rest will be
            playing catch-up for years.
          </motion.blockquote>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Start Building Your AI Presence Now
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              GEO is not optional for brands that want to stay visible. It
              requires a content strategy built on genuine expertise, topical
              depth, and evidence-backed storytelling. It rewards the brands
              that do real work and talk about it substantively. It punishes
              the ones that relied on gaming search algorithms.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              At DT+C, we&rsquo;re building content that works across both
              paradigms: traditional search and AI-generated discovery. Our
              production pipeline (AI video generation, 3D pipelines, VFX,
              sound design) is designed to produce the volume and quality of
              content that GEO demands, at a pace that keeps brands relevant
              in both search engines and AI recommendations.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The question for every brand is simple: when someone asks an AI
              assistant about your category, does your name come up? If the
              answer is no, or if you don&rsquo;t know, that&rsquo;s the
              signal to start building. The brands that move first will own the
              conversation. Everyone else will be competing for whatever
              visibility is left.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* -- Divider -------------------------------------------------- */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* -- More Perspectives ---------------------------------------- */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Continue Reading
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            More <span className="gradient-text">Perspectives</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {moreArticles.map((article) => (
            <motion.div key={article.href} variants={staggerItem}>
              <Link
                href={article.href}
                className="group block rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Gradient header */}
                <div className="relative h-32 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.gradient} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs text-electric-indigo uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-pure-white mt-2 leading-snug group-hover:text-soft-white transition-colors duration-300">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-warm-coral text-sm font-medium mt-4 group-hover:gap-3 transition-all duration-300">
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </article>
  );
}
