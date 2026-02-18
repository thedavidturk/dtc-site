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
    title: "4K in Real-Time: How Unreal Engine Changed Everything",
    category: "TECHNOLOGY",
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
        {/* Gradient background — warm-coral/amber tones */}
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
              Methodology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            Building Worlds in Days, Not Months
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            The methodology behind rapid virtual production — and why speed
            doesn&rsquo;t mean cutting corners.
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
          {/* --- The Old Timeline Problem --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Old Timeline Problem
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s a scenario every creative professional knows: a brand
              needs a 30-second cinematic for a product launch. In the traditional
              pipeline, that 30 seconds of content could take three to four months
              to produce. Concept development. Storyboarding. Art direction. 3D
              modeling. Texturing and materials. Lighting. Animation. Rendering.
              Compositing. Color grading. Sound design. Revisions. More revisions.
              Final delivery.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Each of those stages is sequential — you can&rsquo;t light a scene
              that hasn&rsquo;t been modeled, you can&rsquo;t animate a camera in
              an environment that isn&rsquo;t textured, and you definitely
              can&rsquo;t composite final frames that haven&rsquo;t been rendered.
              The pipeline is inherently linear, and every stage has to wait for
              the one before it.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              In a market where brands need to move fast and stay relevant, that
              timeline is a liability. By the time a four-month production delivers,
              the cultural moment may have already passed.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The traditional production timeline wasn&rsquo;t built for the speed
            brands need today. Something had to be rethought from the ground up.
          </motion.blockquote>

          {/* --- The Pipeline --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Virtual Production Pipeline
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The pipeline I&rsquo;ve built over the past few years collapses the
              traditional timeline dramatically. Instead of sequential stages
              stretching over months, the process flows through four overlapping
              phases: concept, blockout, materials and lighting, and final polish.
              The key difference? In Unreal Engine, these phases aren&rsquo;t
              strictly sequential — they&rsquo;re iterative and often happen in
              parallel.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s what a typical week looks like when building a
              complete virtual environment from scratch.
            </p>
          </motion.div>

          {/* --- Day 1-2 --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Days 1&ndash;2: Concept and Rapid Blockout
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Everything starts with the brief and a clear creative direction. Once
              I know what the world needs to feel like — the mood, the scale, the
              story — I go straight into Unreal Engine and start blocking out the
              environment using simple geometric shapes and placeholder assets.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is where Unreal&rsquo;s modular approach pays massive dividends.
              I&rsquo;m not modeling from scratch. I&rsquo;m assembling — pulling
              from libraries of modular pieces, terrain systems, and atmospheric
              presets to rapidly establish the world&rsquo;s geography, scale, and
              spatial composition. Within a few hours, there&rsquo;s already a
              navigable 3D environment with rough camera angles identified.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              By the end of day two, I typically have a graybox environment that
              communicates the scale, layout, and camera flow of the final piece.
              It&rsquo;s rough, but it&rsquo;s dimensional — and clients can already
              walk through it in the engine and understand the vision.
            </p>
          </motion.div>

          {/* --- Day 3-5 --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Days 3&ndash;5: Materials, Lighting, and Atmosphere
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is where the magic happens. The graybox transforms into a
              photorealistic environment through three simultaneous workstreams:
              surface materials, lighting, and atmospheric effects.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For materials, I leverage Quixel Megascans — a massive library of
              photogrammetry-scanned real-world surfaces — along with custom shaders
              built in Unreal&rsquo;s material editor. Rock faces, water surfaces,
              metal textures, organic materials — all physically accurate and all
              responding to lighting in real-time. What used to take a texture artist
              weeks to hand-paint is now a matter of applying, blending, and
              customizing high-fidelity scanned materials.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Lighting is where I spend the most creative energy. With Lumen
              handling global illumination in real-time, I can sculpt the mood of a
              scene the way a cinematographer works on a film set — adjusting key
              lights, filling shadows, adding rim lights, and dialing in atmosphere
              until every frame tells the right story. Volumetric fog, god rays,
              haze, dust particles — all layered in to add depth and cinematic
              texture.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            Megascans and Lumen turned what used to be weeks of texturing and
            lighting into days of creative exploration. The quality didn&rsquo;t
            drop — the ceiling rose.
          </motion.blockquote>

          {/* --- Day 6-7 --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Days 6&ndash;7: Camera Work, Animation, and Final Polish
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              With the environment looking near-final, the last phase is all about
              cinematography and polish. Using Unreal&rsquo;s Sequencer — the
              engine&rsquo;s built-in timeline and cinematic tool — I block out
              camera moves, set keyframes, and choreograph the visual narrative.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is where my background in traditional cinematography becomes a
              superpower. I approach virtual camera work exactly like I would a
              real shoot — thinking about lens selection, depth of field, camera
              motion, pacing, and composition. The difference is that I can try a
              crane shot, a dolly move, and a handheld feel within minutes, compare
              them side by side, and pick the one that serves the story best.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Final polish includes color grading passes within the engine, particle
              effects tuning, post-process effects (bloom, chromatic aberration,
              lens flares), and any last material or lighting adjustments. By the
              end of day seven, the world is complete and camera-ready.
            </p>
          </motion.div>

          {/* --- The Secret --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Secret: Reusable Assets and Modular Thinking
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The speed isn&rsquo;t just about the tools — it&rsquo;s about the
              system. Over time, I&rsquo;ve built a deep library of reusable assets,
              material presets, lighting rigs, atmospheric setups, and modular
              environment pieces. Each project adds to that library, which means
              each subsequent project starts from a stronger foundation.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Modular design thinking is at the core of this approach. Instead of
              building every element from scratch, I design assets to be
              reconfigurable — a cliff face module that can be tiled, rotated, and
              varied. A lighting rig that can shift from golden hour to overcast
              with a few parameter changes. An atmospheric preset that can go from
              desert heat haze to misty forest with a single blend slider.
            </p>
          </motion.div>

          {/* --- Client Collaboration --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Real-Time Client Collaboration
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              One of the most underappreciated advantages of this pipeline is what
              it does for client relationships. Instead of presenting static
              storyboards and asking clients to imagine the final result, I bring
              them into the engine.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We sit together — in person or over a screen share — and I navigate
              through the environment in real-time. &ldquo;What if the camera came
              from this angle?&rdquo; Done, let&rsquo;s see it. &ldquo;Can the
              lighting feel warmer?&rdquo; Adjusted live. &ldquo;What would this
              look like at night?&rdquo; Give me thirty seconds. The client
              isn&rsquo;t guessing about the final product — they&rsquo;re seeing
              it evolve in front of them and shaping it with direct input.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This collapses the revision cycle dramatically. Instead of three
              rounds of notes over two weeks, we often nail the creative direction
              in a single collaborative session. Clients feel more ownership over
              the result, and I get clearer, more immediate feedback. Everyone wins.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            When clients can see changes happen in real-time, the conversation
            shifts from &ldquo;trust me, it&rsquo;ll look good&rdquo; to
            &ldquo;let&rsquo;s make this perfect together.&rdquo;
          </motion.blockquote>

          {/* --- Case Study --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Case in Point: Ford Mustang Mach-E
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The Ford Mustang Mach-E project is a perfect example of this pipeline
              in action. Ford needed cinematic environments — dramatic desert
              landscapes, urban environments, and atmospheric driving sequences —
              to showcase the vehicle in a way that felt premium, aspirational, and
              visually striking.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Using the methodology I&rsquo;ve outlined, we built multiple
              complete environments in under two weeks. Desert canyons with
              physically accurate rock formations and atmospheric dust. City streets
              with reflective wet asphalt and volumetric street lighting.
              Mountainous highways with dynamic sky systems and distance fog. Each
              environment was photorealistic, fully lit, and camera-ready.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              A traditional production would have required location scouts across
              multiple states, weather-dependent shoot schedules, vehicle transport
              logistics, and weeks of post-production compositing. We delivered
              equivalent — arguably superior — visual quality from a single
              workstation, in a fraction of the time and at a fraction of the cost.
            </p>
          </motion.div>

          {/* --- The Mindset Shift --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Working Smarter, Not Cutting Corners
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              I want to address something head-on: speed and quality are not
              opposites. When I say I can build a world in days instead of months,
              I&rsquo;m not talking about cutting corners or accepting lower
              standards. I&rsquo;m talking about a fundamentally different approach
              to production that removes unnecessary friction while maintaining —
              and often exceeding — traditional quality benchmarks.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The time savings come from eliminating waste, not quality. No more
              waiting overnight for renders that might need to be redone. No more
              rebuilding lighting setups from scratch for each revision. No more
              sequential bottlenecks where one delayed stage holds up the entire
              pipeline. The creative effort — the artistry, the attention to detail,
              the storytelling — that all stays the same. It&rsquo;s the logistics
              and technical overhead that get compressed.
            </p>
          </motion.div>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Speed Is the New Advantage
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              In a landscape where attention spans are shrinking and content
              cycles are accelerating, the brands that can move fast without
              sacrificing quality have a massive competitive advantage. Virtual
              production is how you get there.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              A week to build a world. Two weeks to deliver a complete cinematic
              campaign. Real-time collaboration with clients who see exactly what
              they&rsquo;re getting before a single frame is finalized. Reusable
              assets that make every subsequent project faster than the last.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This isn&rsquo;t about racing to the finish line. It&rsquo;s about
              having a production methodology that matches the speed of modern
              business — without ever compromising on the craft. The brands that
              embrace this approach will move faster, create more, and win more
              attention. The ones that don&rsquo;t will be left wondering how their
              competitors keep shipping cinematic content at a pace that seems
              impossible.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              It&rsquo;s not impossible. It&rsquo;s just a better pipeline.
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
