"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

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

const moreArticles = [
  {
    title: "The Rise of AI-Generated UGC: Authentic Content Without the Creator",
    category: "AI + MARKETING",
    href: "/insights/ai-generated-ugc",
    gradient: "from-rose-500/30 via-pink-900/50 to-deep-space",
  },
  {
    title: "The AI Content Flywheel: How Smart Brands Turn One Idea Into 50 Assets",
    category: "CONTENT STRATEGY",
    href: "/insights/ai-content-flywheel",
    gradient: "from-violet-500/30 via-purple-900/50 to-deep-space",
  },
];

export default function AICreativeBriefArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
      <ArticleJsonLd
        title="From Prompt to Production: How AI Is Rewriting the Creative Brief"
        description="The traditional creative brief was built for a slower world. AI is compressing the gap between idea and execution — and changing what a brief needs to contain."
        datePublished="2026-04-01"
        url="https://davidturkcreative.com/insights/ai-creative-brief"
      />
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
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Back to Home
        </Link>
      </motion.div>

      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-purple-800 to-fuchsia-950" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
        <div className="absolute top-1/4 left-[18%] w-32 h-32 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-[22%] w-20 h-20 border border-white/10 rounded-xl rotate-45" />
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-white/20 rounded-full" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              AI + Creative
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl">
            From Prompt to Production: How AI Is Rewriting the Creative Brief
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="font-body text-lg md:text-xl text-white/70 max-w-2xl">
            The traditional creative brief was built for a slower world. AI is compressing the gap between idea and execution &mdash; and changing what a brief needs to contain.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center gap-4 mt-6">
            <span className="font-mono text-xs text-white/50 tracking-wide">David Turk</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-mono text-xs text-white/50 tracking-wide">8 min read</span>
          </motion.div>

          <motion.div initial={{ width: 0 }} animate={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="h-px bg-gradient-to-r from-fuchsia-400 to-purple-500 mt-8" />
        </div>
      </section>

      {/* Article Body */}
      <section className="section-container section-padding">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Brief Was Built for a Different Era
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The traditional creative brief assumes a world where production is expensive and iteration is slow. It over-specifies every detail because changing direction mid-production costs real money &mdash; re-shoots, re-renders, re-edits. So the brief tries to get everything right on paper before a single pixel is created. That made sense when a wrong turn meant burning through budget and timeline.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              With AI in the production pipeline, iteration is nearly free. Exploring a different visual direction takes minutes, not weeks. Testing a different tone, a different color palette, a different compositional approach &mdash; all of it can happen in real time. The brief doesn&rsquo;t need to be a comprehensive blueprint anymore. It needs to be a creative launchpad that sets direction without constraining exploration.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            When you can go from concept to visual in minutes instead of weeks, the brief stops being a spec sheet and becomes a creative launchpad.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              What a Modern AI-Ready Brief Looks Like
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The briefs we write now look fundamentally different from what we were producing two years ago. Instead of rigid storyboards and exhaustive visual specifications, our briefs focus on intent. What&rsquo;s the emotional outcome we&rsquo;re driving toward? Who is the audience, and what do they need to feel? What are the brand guardrails that can&rsquo;t be crossed? Those are the things that matter. The visual execution is explored, not prescribed.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Our briefs now include prompt frameworks and style references instead of static mockups. We define the visual language in terms that AI tools can interpret: mood descriptors, reference imagery, compositional principles, color direction. This gives our team the structure to maintain brand coherence while leaving room for the kind of creative exploration that AI makes possible. The result is work that surprises us &mdash; in a good way &mdash; instead of work that merely confirms what we already decided.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Real-Time Concepting Changes Everything
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The most transformative change in our workflow is real-time concepting with clients in the room. We run sessions where concepts are generated live. The client says &ldquo;more premium, less playful&rdquo; and within minutes we&rsquo;re looking at revised directions. They say &ldquo;what if the background was more industrial&rdquo; and we show them three options before the sentence is finished. This collapses approval cycles from weeks to hours.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The dynamic this creates is fundamentally different from the old present-and-pray model. Clients aren&rsquo;t choosing between three options they saw for the first time in a meeting. They&rsquo;re actively participating in the creative process, shaping the direction in real time based on what they&rsquo;re seeing. The result is stronger creative alignment, faster approvals, and clients who feel genuine ownership over the work. Everyone wins.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            We used to present three concepts after two weeks of work. Now we explore thirty directions in a single afternoon with the client in the room.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Creative Director&rsquo;s Role Evolves
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              When AI can generate a hundred visual concepts in the time it used to take to sketch three, the creative director&rsquo;s job shifts. The skill isn&rsquo;t origination anymore &mdash; it&rsquo;s curation. Knowing which of those hundred directions has legs. Knowing what to push further, what to combine, what to kill. Taste and judgment matter more than ever, because the volume of options has exploded.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is actually a return to what creative direction was always supposed to be. Less time in production software, more time thinking about what the work needs to say and why. The creative directors who thrive in this environment are the ones who can articulate a vision clearly enough for AI to execute it, then have the eye to refine the output into something truly exceptional. The tools have changed. The need for great creative taste hasn&rsquo;t.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Clients Who Embrace This Win
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The brands that have adapted their briefing and approval processes to AI-native workflows are getting dramatically better results. They&rsquo;re seeing more creative options, faster turnarounds, lower costs, and work that more closely matches their vision because they were part of shaping it in real time. The brands still sending 30-page briefs and expecting a three-week turnaround are paying more for less.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The creative brief isn&rsquo;t dead. It&rsquo;s evolved. And the brands that evolve with it will produce better work, faster, with stronger creative alignment between agency and client. The ones clinging to the old model aren&rsquo;t just slower &mdash; they&rsquo;re actively preventing their creative partners from doing the best possible work. The brief should unlock creativity, not constrain it.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* More Perspectives */}
      <section className="section-container section-padding">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-12">
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">Continue Reading</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">More <span className="gradient-text">Perspectives</span></h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreArticles.map((article) => (
            <motion.div key={article.href} variants={staggerItem}>
              <Link href={article.href} className="group block rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-32 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} transition-transform duration-700 group-hover:scale-110`} />
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs text-electric-indigo uppercase tracking-wider">{article.category}</span>
                  <h3 className="font-headline font-bold text-lg text-pure-white mt-2 leading-snug group-hover:text-soft-white transition-colors duration-300">{article.title}</h3>
                  <span className="inline-flex items-center gap-2 text-warm-coral text-sm font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                    Read Article
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
