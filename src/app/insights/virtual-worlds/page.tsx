"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
    title: "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
    category: "CREATIVE TECHNOLOGY",
    href: "/insights/real-time-4k",
    gradient: "from-cyan-500/30 via-blue-900/50 to-deep-space",
  },
  {
    title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
    category: "AI STRATEGY",
    href: "/insights/building-worlds",
    gradient: "from-warm-coral/30 via-amber-900/40 to-deep-space",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VirtualWorldsArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
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
        <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo via-purple-600 to-violet-900" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-[20%] w-32 h-32 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-12" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              AI Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            AI Video Generation Is Replacing Traditional Production Pipelines
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            75% of marketing videos will be AI-generated or AI-assisted by the
            end of 2026. Here&rsquo;s how we&rsquo;re building for that shift,
            and why it matters for every brand producing content today.
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
              8 min read
            </span>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
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
              The Numbers Are Already Here
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This isn&rsquo;t a prediction anymore. 91% of businesses now use
              video as a marketing tool. The demand for short-form, personalized,
              multi-platform video content has outpaced what traditional
              production crews can deliver on any reasonable timeline or budget.
              AI video generation didn&rsquo;t emerge because the technology was
              ready. It emerged because brands had no other choice.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The cost math alone tells the story. Traditional freelance or
              agency production runs between $1,000 and $50,000 per finished
              minute. AI-assisted production pipelines are delivering comparable
              quality at a fraction of that, while cutting turnaround from weeks
              to days. For brands producing content at volume across TikTok,
              Instagram Reels, YouTube Shorts, and LinkedIn, that efficiency
              gap is existential.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The brands still debating whether to adopt AI video are already
            losing ground to the ones that built it into their pipeline six
            months ago.
          </motion.blockquote>

          {/* --- How We Use It --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              How We Actually Use AI Video Generation
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Let me be direct about how this works in our studio, because
              there&rsquo;s a lot of noise around AI video right now and most of
              it misses the point. We don&rsquo;t use AI to replace creative
              vision. We use it to remove the bottlenecks that sit between a
              creative idea and a finished deliverable.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Our workflow starts with concept and storyboarding, the same as it
              always has. Then AI enters the pipeline at specific leverage
              points: generating initial visual concepts for client approval,
              producing motion tests before committing to full animation,
              creating variations for A/B testing across platforms, and
              generating supplementary assets like b-roll, transitions, and
              background footage that would otherwise require separate shoots.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The human creative directs every stage. AI handles the execution
              velocity. That distinction matters. The brands getting the best
              results from AI video aren&rsquo;t the ones automating everything.
              They&rsquo;re the ones with strong creative directors who know
              exactly where to deploy AI for maximum leverage.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            AI doesn&rsquo;t replace the creative eye. It gives the creative
            eye more tools to work with, faster iterations, and fewer
            compromises.
          </motion.blockquote>

          {/* --- Personalization --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Hyper-Personalized Video at Scale
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The capability that changes the game most is hyper-personalization.
              AI video generation tools can now produce customized video content
              tailored to specific audience segments, demographics, and even
              individual viewer behaviors. One campaign, dozens of variations,
              each one feeling bespoke.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We&rsquo;ve been building workflows around this for clients who
              need multi-market content. Instead of shooting separate campaigns
              for different regions, we produce a core creative and then
              generate localized variations with AI. Different talent
              representations, different environmental contexts, different
              messaging angles. All maintaining brand consistency because the
              creative DNA was set by a human director from the start.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is where AI video generation stops being a novelty and
              becomes a competitive weapon. The brand that can speak directly to
              ten different audience segments with ten different video
              executions, while their competitor is still finishing one generic
              spot, wins the attention game every time.
            </p>
          </motion.div>

          {/* --- Transparency --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Transparency Builds Trust
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s something most agencies won&rsquo;t talk about: as
              AI-generated video becomes indistinguishable from traditional
              footage, transparency about AI involvement becomes a competitive
              advantage, not a liability. Audiences can tell when brands are
              hiding something. The ones that openly share how they use AI in
              their creative process are building stronger relationships than
              the ones pretending everything was shot on a soundstage.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We lean into this with our clients. We explain the workflow. We
              show where AI accelerated the process and where human craft
              elevated the output. That transparency has consistently
              strengthened client relationships, not weakened them.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The brands that openly share how they use AI in production are
            building more trust than the ones pretending it doesn&rsquo;t exist
            in their workflow.
          </motion.blockquote>

          {/* --- The Pipeline --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Building the Pipeline That Scales
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The real advantage isn&rsquo;t any single AI tool. It&rsquo;s the
              pipeline you build around them. We&rsquo;ve spent the last year
              constructing custom workflows that chain AI video generation with
              our 3D animation pipelines, sound design tools, and
              post-production processes into a unified system.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              A brief comes in. Creative direction is set by a human. AI
              generates initial visual concepts in hours, not days. 3D pipelines
              handle product visualization and environmental work. AI-powered
              VFX and sound design layers are added. The final output goes
              through human quality control and creative refinement. What used
              to be a six-week pipeline is now a six-day pipeline, with higher
              output quality because we have more room for creative iteration.
            </p>
          </motion.div>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Adapt Now or Fall Behind
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              AI video generation is not a trend. It&rsquo;s a structural shift
              in how content gets made. The studios and brands that are building
              AI into their production pipelines right now will own the next
              decade of visual content. The ones waiting for the technology to
              &ldquo;mature&rdquo; are already behind.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The question isn&rsquo;t whether AI will change your production
              process. It&rsquo;s whether you&rsquo;ll be the one setting the
              pace or the one trying to catch up. We chose to build. If
              you&rsquo;re a brand thinking about where your content strategy
              goes from here, the answer starts with the pipeline.
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
