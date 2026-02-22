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
    title: "4K in Real-Time: How Unreal Engine Changed Everything",
    category: "TECHNOLOGY",
    href: "/insights/real-time-4k",
    gradient: "from-cyan-500/30 via-blue-900/50 to-deep-space",
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
              Virtual Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl"
          >
            Why I Switched from Location Shoots to Virtual Worlds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/70 max-w-2xl"
          >
            The transition from traditional production to Unreal Engine 5, and
            why I&rsquo;ll never go back to doing things the old way.
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
          {/* --- The Production Grind --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Production Grind
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For years, my workflow looked the same. Wake up before dawn to catch
              golden hour. Load a van full of gear: cameras, lenses, lighting rigs,
              monitors, batteries, cables, and whatever else the shoot demanded.
              Drive an hour, sometimes two, to a location I&rsquo;d scouted the
              week before. Set up. Wait for the light. Shoot. Tear down. Do it
              again tomorrow.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Don&rsquo;t get me wrong, there&rsquo;s a magic to location work that
              I genuinely love. The unpredictability of natural light, the energy of
              being on-set, the feeling of capturing something real and unrepeatable.
              But there&rsquo;s also the other side: permit headaches, weather
              cancellations, three-hour round trips for a 20-minute window of usable
              light, and the constant pressure of knowing that every second on
              location costs money.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            I spent more time fighting logistics than making creative decisions.
            Something had to change.
          </motion.blockquote>

          {/* --- The Discovery --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Moment Everything Shifted
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The first time I saw Unreal Engine 5 running in real-time, I sat
              there for a solid ten minutes just moving a virtual camera through a
              photorealistic environment. Volumetric fog rolling through a forest.
              Dynamic global illumination shifting as the sun angle changed. A fully
              realized world that I could light, frame, and shoot, right there on
              my screen, with instant feedback, no render queue, no waiting.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              It wasn&rsquo;t a gradual realization. It was more like a switch
              flipping in my head. I remember thinking: &ldquo;I could build any
              location I want. Any time of day. Any weather. Any planet.&rdquo; The
              creative possibilities weren&rsquo;t just expanded. They were
              fundamentally unlimited.
            </p>
          </motion.div>

          {/* --- The Learning Curve --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Honest Learning Curve
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              I&rsquo;m not going to sugarcoat this. Transitioning from traditional
              production to virtual production was one of the hardest things
              I&rsquo;ve done professionally. Unreal Engine is powerful, but
              it&rsquo;s also a beast. Blueprints, materials, lighting systems,
              Sequencer, Niagara particles. The amount of new knowledge required
              was staggering.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              There were weeks where I felt like a complete beginner again. I&rsquo;d
              been directing and shooting for years, and suddenly I was watching
              YouTube tutorials about node graphs and UV mapping. It was humbling.
              But it was also exhilarating. Every new technique I learned opened up
              ten more creative possibilities I hadn&rsquo;t considered.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            The learning curve was steep, but the view from the other side was
            worth every hour of frustration.
          </motion.blockquote>

          {/* --- The Breakthrough --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Breakthrough: New Era Cap
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The moment it all clicked was the New Era Cap project. They wanted a
              cosmic, &ldquo;out-of-this-world&rdquo; campaign (planets, galaxies,
              deep space environments) with their products floating through it all.
              On a traditional production, that brief would have meant green screen
              stages, weeks of post-production compositing, and a budget that would
              make most brands walk away.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Instead, I built the entire universe in Unreal Engine 5. Planets with
              atmospheric scattering. Nebulae with volumetric particle systems. Stars
              that reflected off photorealistic 3D cap models. And the best part? I
              could fly a virtual camera through the entire thing in real-time,
              composing shots on the fly, adjusting lighting with a slider, and
              seeing final-quality output instantly.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              What would have been a multi-month production became a six-week
              pipeline from concept to delivery. The client saw real-time previews
              during the process and could give feedback that I implemented in
              minutes, not days. That project didn&rsquo;t just prove the concept.
              It fundamentally changed how I approach every brief that comes through
              the door.
            </p>
          </motion.div>

          {/* --- Benefits Realized --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              What Virtual Production Actually Delivers
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              After working this way for a while now, the benefits have compounded
              in ways I didn&rsquo;t initially expect. Unlimited creative control is
              the obvious one. I can put a product on Mars or at the bottom of the
              ocean, and both scenarios are equally achievable. But the less obvious
              advantages are just as powerful.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Weather-proof production means I never cancel a shoot. Rapid iteration
              means clients see their vision coming to life in real-time instead of
              waiting weeks for a rough cut. Cost efficiency at scale means I can
              deliver cinematic 4K content at a fraction of what traditional
              production would cost, and reinvest that savings into higher
              production value.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              And then there&rsquo;s reusability. Every environment I build, every
              asset I create, every lighting setup I dial in, it all lives in a
              library that I can pull from for future projects. The more I create, the
              faster and more efficient the pipeline becomes.
            </p>
          </motion.div>

          {/* --- Pull Quote --- */}
          <motion.blockquote
            variants={fadeUp}
            className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8"
          >
            Virtual production isn&rsquo;t about replacing what works. It&rsquo;s
            about removing the barriers between imagination and execution.
          </motion.blockquote>

          {/* --- The Hybrid Approach --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Hybrid Approach
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s something I want to be clear about: I haven&rsquo;t
              abandoned real-world cinematography. I still shoot on location when it
              makes sense. There are projects where nothing beats the texture and
              authenticity of a real environment, real talent, and real light. I
              still love those shoots.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              What&rsquo;s changed is that virtual production has expanded my
              toolkit. Now when a brief comes in, I&rsquo;m not limited by physical
              constraints. I can ask &ldquo;what&rsquo;s the best approach for this
              story?&rdquo; instead of &ldquo;what can we afford to build on
              set?&rdquo; Sometimes the answer is a location shoot. Sometimes
              it&rsquo;s a fully virtual environment. Often, it&rsquo;s a hybrid:
              real footage enhanced and extended by virtual worlds.
            </p>
          </motion.div>

          {/* --- Conclusion --- */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              More Tools, Better Work
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This isn&rsquo;t a story about traditional filmmaking dying. It&rsquo;s
              a story about having more tools in the arsenal. The brands I work with
              don&rsquo;t care whether their content was shot on location or rendered
              in Unreal Engine. They care that it looks incredible, tells a
              compelling story, and was delivered on time and on budget.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Virtual production lets me deliver on all three, consistently, without
              compromise. And the technology is only getting better. Every update to
              Unreal Engine closes the gap between &ldquo;virtual&rdquo; and
              &ldquo;indistinguishable from reality&rdquo; a little further.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              If you&rsquo;re a creative professional still on the fence about making
              the leap, or a brand wondering if virtual production is right for your
              next project, my advice is simple: the best time to start was two years
              ago. The second-best time is now.
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
