"use client";

import Link from "next/link";
import { m } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const prismEase = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
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
  },
  {
    title: "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
    category: "CREATIVE TECHNOLOGY",
    href: "/insights/real-time-4k",
  },
];

const metaRow = [
  { label: "Words", value: "David Turk" },
  { label: "Published", value: "February 2026" },
  { label: "Reading Time", value: "9 min read" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BuildingWorldsArticle() {
  return (
    <article className="min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="Your Brand in the Age of AI Search: Why GEO Is the New SEO"
        description="Generative Engine Optimization is reshaping how brands get discovered. If you're still optimizing only for Google rankings, you're optimizing for yesterday."
        datePublished="2026-02-01"
        url="https://davidturkcreative.com/insights/building-worlds"
      />

      {/* -- Opener: sculptural type on the void ------------------------ */}
      <header className="section-container pt-32 pb-16 md:pt-40 md:pb-24">
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <m.div variants={staggerItem}>
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

          <m.p
            variants={staggerItem}
            className="mt-16 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            AI Strategy
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            Your Brand in the Age of AI Search: Why GEO Is the New SEO
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            Generative Engine Optimization is reshaping how brands get
            discovered. If you&rsquo;re still optimizing only for Google
            rankings, you&rsquo;re optimizing for yesterday.
          </m.p>

          {/* Metadata rule row */}
          <m.div
            variants={staggerItem}
            className="mt-14 flex flex-wrap gap-x-16 gap-y-6 border-t border-ash-border pt-6"
          >
            {metaRow.map((item) => (
              <div key={item.label}>
                <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                  {item.label}
                </p>
                <p className="mt-2 text-body-sm font-normal text-bone">{item.value}</p>
              </div>
            ))}
          </m.div>
        </m.div>
      </header>

      {/* -- Article Body: narrow prose column ------------------------- */}
      <section className="section-container pb-28 md:pb-40">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-[640px]"
        >
          {/* --- The Shift --- */}
          <m.div variants={fadeUp} className="mb-16">
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The Way People Find Brands Has Fundamentally Changed
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Nearly 800 million people a week now use ChatGPT alone to answer
              questions, compare options, and plan purchases. 35% of Gen Z uses
              AI chatbots as their primary search tool. When someone asks an AI
              assistant &ldquo;what creative studio should I hire for a product
              launch video,&rdquo; the AI doesn&rsquo;t return ten blue links.
              It returns a direct recommendation. If your brand isn&rsquo;t in
              that recommendation, you don&rsquo;t exist for that buyer.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              This is the shift from SEO (Search Engine Optimization) to GEO
              (Generative Engine Optimization). Traditional SEO optimized for
              rankings, traffic, and clicks on Google. GEO optimizes for being
              cited, mentioned, and recommended in AI-generated answers across
              platforms like ChatGPT, Google AI Overviews, Perplexity, and
              Gemini.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The overlap between top Google links and AI-cited sources has
              dropped from 70% to below 20%. Ranking on page one of Google no
              longer guarantees visibility in the AI answers that are
              increasingly where buyer research starts and ends.
            </p>
          </m.div>

          {/* --- Pull Quote --- */}
          <m.blockquote
            variants={fadeUp}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              If your brand doesn&rsquo;t show up in AI-generated
              recommendations, it doesn&rsquo;t matter how well you rank on
              Google. The buyer never sees you.
            </p>
          </m.blockquote>

          {/* --- What GEO Actually Means --- */}
          <m.div variants={fadeUp} className="mb-16">
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              What Generative Engine Optimization Actually Means
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              GEO is not a rebrand of SEO. It requires a fundamentally
              different approach to content strategy. AI systems don&rsquo;t
              crawl and rank pages the way Google does. They understand the
              world through entities (brands, people, concepts) and the
              relationships between them. They favor authoritative,
              evidence-backed content over keyword-stuffed pages.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Where traditional SEO rewarded publishing frequency and keyword
              volume, GEO rewards expertise, credibility, and topical depth.
              AI engines pull from sources they trust, and trust is built
              through consistent, substantive content that demonstrates real
              knowledge, not content farms churning out thin articles optimized
              for search crawlers.
            </p>
            <p className="text-body-sm font-normal text-bone">
              This is actually good news for brands that do legitimate work.
              If you have genuine expertise and you articulate it clearly, GEO
              rewards you. If you&rsquo;ve been gaming search rankings with
              low-quality content, the AI era is going to be painful.
            </p>
          </m.div>

          {/* --- Why It Matters for Creative Brands --- */}
          <m.div variants={fadeUp} className="mb-16">
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Why This Matters for Every Brand Producing Content
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Here&rsquo;s where this connects directly to what we do at DT+C.
              The content you produce (videos, visuals, written insights,
              case studies) is now the primary signal that AI engines use to
              understand what your brand does and whether to recommend it. Your
              content isn&rsquo;t just marketing collateral anymore.
              It&rsquo;s your AI visibility strategy.
            </p>
            <p className="text-body-sm font-normal text-bone">
              A brand with a rich library of well-produced video content,
              detailed case studies, and substantive thought leadership will
              show up in AI recommendations. A brand with a thin website and a
              social media presence built on reposts will not. The quality and
              depth of your content portfolio directly determines whether AI
              engines consider you an authority worth citing.
            </p>
          </m.div>

          {/* --- Pull Quote --- */}
          <m.blockquote
            variants={fadeUp}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              Your content portfolio is no longer just a marketing asset.
              It&rsquo;s the data that AI engines use to decide whether your
              brand deserves to be recommended.
            </p>
          </m.blockquote>

          {/* --- How We're Building for GEO --- */}
          <m.div variants={fadeUp} className="mb-16">
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              How We Build Content for AI Visibility
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              We&rsquo;ve restructured our content approach around GEO
              principles, both for our own brand and for our clients. The
              strategy centers on three pillars.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              <span className="text-fog-blue">Topical authority over keyword targeting.</span>{" "}
              Instead of chasing individual keywords, we build comprehensive
              content around topics we genuinely own. For us, that&rsquo;s
              AI-powered creative production, 3D pipelines, and brand content
              strategy. Every piece of content we publish reinforces our
              authority in these areas, making it more likely that AI engines
              cite us when users ask about these subjects.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              <span className="text-fog-blue">Entity-first thinking.</span>{" "}
              AI engines understand brands as entities with attributes and
              relationships. We ensure our brand identity is clearly
              articulated across every touchpoint: who we are, what we do, who
              we serve, what makes us different. Structured data, consistent
              messaging, and clear positioning all feed into how AI systems
              categorize and recommend us.
            </p>
            <p className="text-body-sm font-normal text-bone">
              <span className="text-fog-blue">Evidence over assertions.</span>{" "}
              AI engines heavily favor content that provides evidence: case
              studies with real results, specific methodologies, concrete
              examples. Vague marketing language gets filtered out. Substantive,
              evidence-backed content gets cited. This has pushed us to be more
              transparent and specific in how we talk about our work, which has
              been good for client relationships too.
            </p>
          </m.div>

          {/* --- The Visibility Gap --- */}
          <m.div variants={fadeUp} className="mb-16">
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The Widening Visibility Gap
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              By the end of 2026, the gap between brands that proactively
              manage AI visibility and those that don&rsquo;t will be
              impossible to ignore. The brands investing in GEO now will
              consistently appear in AI-generated recommendations, shaping how
              buyers understand their market. The ones that ignore it will be
              mentioned less often, lose market share, and watch revenue
              growth slow without understanding why.
            </p>
            <p className="text-body-sm font-normal text-bone">
              This isn&rsquo;t speculation. We&rsquo;re already seeing it play
              out. Brands with deep, authoritative content libraries are
              showing up in AI responses for commercial queries. Brands with
              thin content footprints are invisible, regardless of how much
              they spend on traditional advertising.
            </p>
          </m.div>

          {/* --- Pull Quote --- */}
          <m.blockquote
            variants={fadeUp}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              The brands that own their AI narrative now will define their
              category in the minds of AI-assisted buyers. The rest will be
              playing catch-up for years.
            </p>
          </m.blockquote>

          {/* --- Conclusion --- */}
          <m.div variants={fadeUp}>
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Start Building Your AI Presence Now
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              GEO is not optional for brands that want to stay visible. It
              requires a content strategy built on genuine expertise, topical
              depth, and evidence-backed storytelling. It rewards the brands
              that do real work and talk about it substantively. It punishes
              the ones that relied on gaming search algorithms.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              At DT+C, we&rsquo;re building content that works across both
              paradigms: traditional search and AI-generated discovery. Our
              production pipeline (AI video generation, 3D pipelines, VFX,
              sound design) is designed to produce the volume and quality of
              content that GEO demands, at a pace that keeps brands relevant
              in both search engines and AI recommendations.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The question for every brand is simple: when someone asks an AI
              assistant about your category, does your name come up? If the
              answer is no, or if you don&rsquo;t know, that&rsquo;s the
              signal to start building. The brands that move first will own the
              conversation. Everyone else will be competing for whatever
              visibility is left.
            </p>
          </m.div>
        </m.div>
      </section>

      {/* -- More Perspectives: hairline listing rows ------------------ */}
      <section className="section-container pb-32 md:pb-40">
        <div className="mx-auto max-w-4xl">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            Continue Reading
          </m.p>
          <div className="border-b border-ash-border">
            {moreArticles.map((article) => (
              <m.div
                key={article.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="border-t border-ash-border"
              >
                <Link
                  href={article.href}
                  className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <div className="md:col-span-3">
                    <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                      {article.category}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="text-heading-sm font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-start md:col-span-2 md:justify-end">
                    <span className="inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                      Read
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
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
