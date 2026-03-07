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
    title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
    category: "AI STRATEGY",
    href: "/insights/building-worlds",
    gradient: "from-warm-coral/30 via-amber-900/40 to-deep-space",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RealTime4KArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
      <ArticleJsonLd
        title="The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed"
        description="How custom AI workflows are collapsing post-production timelines from months to days, without sacrificing the craft."
        datePublished="2026-02-15"
        url="https://davidturkcreative.com/insights/real-time-4k"
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-700 to-blue-950" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 right-[20%] w-36 h-36 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-2/5 left-1/4 w-16 h-16 border border-white/10 rounded-lg rotate-45" />
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-cyan-400/20 rounded-full" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Creative Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            How custom AI workflows are collapsing post-production timelines
            from months to days, without sacrificing the craft.
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
              10 min read
            </span>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-cyan-400 to-blue-500 mt-8"
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
          {/* --- The Old Post-Production --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Post-Production Used to Be the Bottleneck
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For as long as I&rsquo;ve been in this industry, post-production
              has been where timelines go to die. You shoot for three days, then
              spend three weeks in post. VFX compositing, color grading, sound
              design, audio mixing, motion graphics, format conversions. Each
              stage is sequential. Each stage has its own specialists, its own
              tools, its own revision cycles. A single round of client feedback
              could add a week to the schedule.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The irony was always obvious: the creative work (the part that
              actually matters) takes a fraction of the total production time.
              Most of the calendar was consumed by technical execution, file
              management, rendering, and waiting. AI didn&rsquo;t just offer to
              speed that up. It offered to fundamentally restructure how
              post-production works.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            We used to spend 80% of post-production time on technical
            execution and 20% on creative decisions. AI flipped that ratio.
          </motion.blockquote>

          {/* --- AI VFX --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              AI-Powered VFX: 40% Cost Reduction, Zero Quality Compromise
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The VFX side of the pipeline has seen the most dramatic
              transformation. Tasks that used to require frame-by-frame manual
              work are now handled by AI tools that deliver results in a
              fraction of the time. Rotoscoping, cleanup, motion tracking,
              object removal, sky replacements, crowd augmentation. These are
              tasks that ate hundreds of artist-hours per project. AI tools are
              now handling them with 30-40% cost reduction while maintaining
              broadcast-quality output.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              But here&rsquo;s what matters: the AI handles the repetitive
              technical execution. The creative decisions (what the effect
              should look like, how it serves the story, where it directs the
              viewer&rsquo;s eye) those remain entirely human. We&rsquo;re not
              replacing VFX artists. We&rsquo;re freeing them from the grunt
              work so they can focus on the craft.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We&rsquo;ve integrated AI VFX tools directly into our 3D
              pipelines, creating a seamless workflow where generated
              environments, composited elements, and real-time rendered scenes
              all feed into the same output. No more bouncing between six
              different applications. One pipeline, one creative direction,
              dramatically faster execution.
            </p>
          </motion.div>

          {/* --- AI Sound Design --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Sound Design: Where AI Removes Friction Without Removing Soul
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Sound is the most underestimated element of visual content. Great
              visuals with mediocre audio feel amateur. But traditional sound
              design and mixing has always been expensive and time-consuming,
              which meant it was the first thing to get cut when budgets got
              tight.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              AI has changed this equation completely. Audio cleanup, noise
              reduction, stem separation, dialogue enhancement. These used to
              require dedicated studio time and specialized engineers. Now AI
              tools handle them as part of the pipeline, automatically, at a
              quality level that matches or exceeds what we were getting from
              manual processing.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For original score and sound design, we use AI as a starting
              point, not an endpoint. AI generates initial sound beds,
              atmospheric layers, and tonal foundations that our team then
              sculpts, layers, and refines into the final soundtrack. The
              result is faster production with the same level of sonic craft
              that brands expect from studio-quality content.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            AI handles the technical foundation. Humans handle the emotion.
            That&rsquo;s the workflow that produces content people actually
            feel.
          </motion.blockquote>

          {/* --- Image Generation --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              AI Image Generation as a Creative Accelerator
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Before a single frame of video is produced, AI image generation
              has already transformed our pre-production process. Concept art
              that used to take days now takes hours. Mood boards are generated
              with specific lighting references, color palettes, and
              compositional styles that communicate creative direction to
              clients with an immediacy that sketches and reference folders
              never could.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We also use AI image generation for texture creation, environment
              concepts, and product visualization mockups. These assets feed
              directly into our 3D pipelines, giving the animation and look
              development teams a head start on the visual language of each
              project. The creative iteration that used to happen over weeks of
              back-and-forth now happens in a single afternoon session with the
              client.
            </p>
          </motion.div>

          {/* --- The Unified Pipeline --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Unified Pipeline: Everything Connects
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The real power isn&rsquo;t in any individual AI tool. It&rsquo;s
              in how we&rsquo;ve wired them together into a single production
              pipeline. AI image generation feeds into 3D look development.
              3D animation and cinematics render in real-time. AI VFX handles
              compositing and cleanup. AI sound design delivers the audio
              foundation. Human creatives direct, refine, and elevate at every
              stage.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This unified approach means there&rsquo;s no handoff delay
              between stages. No waiting for one vendor to finish before
              another can start. The pipeline flows continuously from concept
              to delivery, with AI handling the throughput and humans handling
              the taste.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The competitive advantage isn&rsquo;t the AI tools you use.
            It&rsquo;s how you connect them into a pipeline that moves at the
            speed of creative thought.
          </motion.blockquote>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The New Standard for Creative Production
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Virtual production hardware costs have dropped 40% since 2022.
              AI tools driving real-time rendering and post-production have
              reached quality thresholds that make them viable for premium brand
              content. The economic and creative case for AI-powered pipelines
              is no longer theoretical. It&rsquo;s proven.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Every project we take on now runs through this AI-augmented
              pipeline. Not because we&rsquo;re chasing technology trends, but
              because it consistently delivers better creative work in less
              time. More iterations. More experimentation. More polish. Less
              waiting. Less waste. Less compromise.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The studios that build this pipeline now will set the standard for
              the next era of content production. The ones still running
              traditional post-production workflows will find themselves
              outpaced by teams that can deliver the same quality in a fifth of
              the time. That&rsquo;s not a threat. It&rsquo;s an invitation to
              build something better.
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
