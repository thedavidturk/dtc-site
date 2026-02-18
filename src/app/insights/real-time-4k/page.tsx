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
    title: "Why I Switched from Location Shoots to Virtual Worlds",
    category: "VIRTUAL PRODUCTION",
    href: "/insights/virtual-worlds",
    gradient: "from-electric-indigo/40 via-purple-900/60 to-deep-space",
  },
  {
    title: "Building Worlds in Days, Not Months",
    category: "METHODOLOGY",
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
        {/* Gradient background — cyan/blue tones */}
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
              Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            4K in Real-Time: How Unreal Engine Changed Everything
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            Why real-time rendering isn&rsquo;t just the future of premium
            content — it&rsquo;s already here.
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
          {/* --- The Old Way --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Overnight Render Era
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              There was a time — not that long ago — when producing a single 4K
              frame meant sending it to a render farm and waiting. Sometimes hours.
              Sometimes overnight. You&rsquo;d set up your scene, queue the render,
              go home, and hope that when you came back in the morning everything
              looked right. More often than not, something was off — a light was too
              hot, a shadow was wrong, a material looked flat — and you&rsquo;d fix
              it, re-queue, and wait again.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For animation and cinematic work, multiply that by hundreds or
              thousands of frames. A 30-second sequence at 30fps is 900 frames.
              If each frame takes 10 minutes to render, that&rsquo;s 150 hours of
              compute time — over six straight days — for half a minute of content.
              And that&rsquo;s before you factor in revisions, which meant
              re-rendering entire sequences from scratch.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The render queue was the bottleneck that defined every creative
            decision. Not because we wanted it to, but because we had no choice.
          </motion.blockquote>

          {/* --- The Jaw Drop --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Jaw-Drop Moment
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The first time I moved a camera through a fully lit, fully textured
              Unreal Engine 5 scene at 4K resolution — in real-time, at 60 frames
              per second — I genuinely couldn&rsquo;t process what I was seeing. I
              kept looking for the catch. Where&rsquo;s the quality tradeoff?
              Where&rsquo;s the visual compromise? There wasn&rsquo;t one.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              I was looking at cinematic-quality lighting, photorealistic materials,
              volumetric atmospherics, and physically accurate reflections —
              all updating in real-time as I adjusted parameters. Move the sun angle?
              Instant. Change a material color? Instant. Add fog density? Instant.
              Every change that used to cost hours of re-rendering was now
              happening live on my screen.
            </p>
          </motion.div>

          {/* --- Technical Deep Dive --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Technology Under the Hood
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              What makes this possible isn&rsquo;t magic — it&rsquo;s a suite of
              technologies that Epic Games has been building and refining. For
              anyone curious about the technical side, here&rsquo;s the short
              version of what changed the game.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Nanite</strong> is Unreal
              Engine&rsquo;s virtualized geometry system. It lets you work with
              film-quality 3D assets — millions of polygons per object — without
              tanking performance. The engine intelligently streams and renders only
              the detail you can actually see at any given moment. This means I can
              fill a scene with incredibly detailed assets and the engine handles the
              optimization automatically.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Lumen</strong> is the global
              illumination and reflections system, and it&rsquo;s the one that
              really blew my mind. Fully dynamic lighting — no more baking lightmaps
              for hours, no more faking bounce light with fill lights everywhere.
              Move a light source and the entire scene responds naturally: indirect
              bounces, color bleeding, accurate reflections, all in real-time. This
              single technology eliminated what used to be the most time-consuming
              part of 3D lighting.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              <strong className="text-pure-white">Virtual Shadow Maps</strong>{" "}
              deliver consistent, high-resolution shadows across massive
              environments without the artifacts and resolution issues that plagued
              older shadow techniques. Combined with Nanite and Lumen, you get
              scenes that look physically correct from any angle, at any distance.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            Nanite, Lumen, and Virtual Shadow Maps aren&rsquo;t incremental
            improvements. They&rsquo;re a generational leap that collapsed the
            gap between &ldquo;real-time&rdquo; and &ldquo;offline render
            quality.&rdquo;
          </motion.blockquote>

          {/* --- Creative Process --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              How Real-Time Changes the Creative Process
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The technical specs are impressive, but what matters to me as a
              creative is how real-time rendering changes the way I work. And the
              difference is night and day.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              In the old workflow, every creative decision carried risk. Want to try
              a different lighting angle? That&rsquo;s a re-render. Curious what the
              scene looks like at dusk instead of noon? Re-render. Client wants to
              see a warmer color palette? Re-render. Each experiment cost time and
              money, so you naturally became conservative — you&rsquo;d settle on
              &ldquo;good enough&rdquo; because &ldquo;let&rsquo;s try one more
              thing&rdquo; meant another four-hour wait.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              With real-time rendering, experimentation is free. I can try 50
              different lighting setups in the time it used to take to render one. I
              can sit with a client, make changes live on screen, and arrive at the
              best creative solution together — in the same session. The feedback
              loop went from days to seconds, and that fundamentally changes the
              quality of the output because you&rsquo;re never settling.
            </p>
          </motion.div>

          {/* --- Case Study --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Putting It to Work: SeaWorld Deep-Sea Environments
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The SeaWorld project was where real-time 4K rendering truly proved
              itself under pressure. We needed to create photorealistic underwater
              environments — deep ocean trenches, bioluminescent creatures, light
              shafts penetrating through water columns — all at a level of quality
              that would hold up on large-format displays.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              These are exactly the kinds of scenes that would have crushed a
              traditional render pipeline. Volumetric lighting through participating
              media (water), translucent materials (jellyfish, coral), thousands of
              particle effects (bubbles, plankton), and caustic light patterns on
              the ocean floor. In a traditional pipeline, a single frame of this
              complexity could take 30 minutes or more to render.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              In Unreal Engine 5, we were running the entire scene at 4K in
              real-time. I could adjust the depth of the water, the color of the
              bioluminescence, the density of particulate matter, and the camera
              path — all live, all immediately visible at final quality. We iterated
              faster, explored more creative directions, and delivered a
              higher-quality result than I could have achieved with unlimited time in
              a traditional pipeline.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            Real-time rendering doesn&rsquo;t just save time. It makes the work
            better, because you can explore more and settle for less.
          </motion.blockquote>

          {/* --- The Quality Myth --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Addressing the Quality Myth
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              I still encounter skepticism from people in the industry who assume
              that &ldquo;real-time&rdquo; means &ldquo;lower quality.&rdquo;
              It&rsquo;s an understandable assumption — for years, that was true.
              Real-time engines were for games, and offline renderers were for film.
              The quality gap was obvious.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              That gap doesn&rsquo;t exist anymore. Not in any way that matters for
              commercial production. The materials look photorealistic. The lighting
              is physically accurate. The geometry detail is virtually unlimited
              thanks to Nanite. When I show people final 4K output from Unreal
              Engine, they consistently assume it was rendered offline. It
              wasn&rsquo;t.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Are there edge cases where a dedicated offline renderer like Arnold or
              V-Ray might produce marginally better results for specific scenarios?
              Sure, if you&rsquo;re doing sub-surface scattering on a close-up
              human face for a feature film, offline still has a slight edge. But for
              95% of commercial content — product visualization, environmental
              cinematics, brand campaigns, motion graphics — real-time quality is
              indistinguishable from offline, and the production benefits make it the
              smarter choice by a wide margin.
            </p>
          </motion.div>

          {/* --- Where It's Heading --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Closing the Gap Faster Than Anyone Expected
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              What excites me most is the trajectory. Every major Unreal Engine
              update pushes the quality ceiling higher while making the tools more
              accessible. Features that required custom shader work a year ago are
              now built-in. Performance that required high-end workstations is
              becoming achievable on more modest hardware. The democratization of
              this technology is accelerating.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We&rsquo;re heading toward a world where the distinction between
              &ldquo;real-time&rdquo; and &ldquo;offline&rdquo; rendering becomes
              meaningless — because real-time will do everything offline can do,
              faster, and with a fundamentally better creative workflow. That
              world is closer than most people think. For the work I do, it&rsquo;s
              already here.
            </p>
          </motion.div>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Already Here
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Real-time 4K rendering isn&rsquo;t the future. It&rsquo;s the
              present, and it&rsquo;s been the present for anyone willing to invest
              the time to learn the tools. The production advantages are too
              significant to ignore — faster iteration, better creative
              collaboration, lower costs at scale, and output quality that stands
              toe-to-toe with anything produced offline.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Every project I take on now starts in Unreal Engine. Not because
              I&rsquo;m chasing a trend, but because it consistently produces the
              best work I&rsquo;ve ever done. The tools aren&rsquo;t just faster —
              they&rsquo;re better. And that&rsquo;s a combination that doesn&rsquo;t
              come along very often.
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
