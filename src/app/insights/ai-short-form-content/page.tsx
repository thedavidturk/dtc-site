"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
    title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
    category: "AI STRATEGY",
    href: "/insights/building-worlds",
    gradient: "from-warm-coral/30 via-amber-900/40 to-deep-space",
  },
  {
    title: "AI-Native Brand Identity: Building Visual Systems That Adapt in Real Time",
    category: "BRAND + AI",
    href: "/insights/ai-brand-identity",
    gradient: "from-amber-500/30 via-orange-900/50 to-deep-space",
  },
];

export default function AIShortFormContentArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-700 to-rose-950" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
        <div className="absolute top-1/4 left-[18%] w-28 h-28 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-[15%] w-20 h-20 border border-white/10 rounded-xl rotate-12" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Social + AI
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 max-w-4xl">
            Short-Form, High Impact: How AI Is Powering the Next Wave of Social Content
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="font-body text-lg md:text-xl text-white/70 max-w-2xl">
            The playbook for producing scroll-stopping Reels, Shorts, and
            TikToks at scale with AI workflows, without losing the human
            edge that makes content connect.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center gap-4 mt-6">
            <span className="font-mono text-xs text-white/50 tracking-wide">David Turk</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-mono text-xs text-white/50 tracking-wide">9 min read</span>
          </motion.div>

          <motion.div initial={{ width: 0 }} animate={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="h-px bg-gradient-to-r from-pink-400 to-rose-500 mt-8" />
        </div>
      </section>

      {/* Article Body */}
      <section className="section-container section-padding">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Volume Problem Every Brand Faces
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The algorithms have spoken: brands that post once a week get buried. TikTok, Instagram Reels, YouTube Shorts, and LinkedIn video all prioritize accounts that publish consistently and frequently. The platforms reward volume. But volume without quality is noise, and quality without volume is invisible.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              This is the tension every brand faces in 2026. You need to publish three to five short-form videos per week across multiple platforms, each optimized for different aspect ratios, different audience behaviors, and different algorithmic preferences. Traditional production workflows cannot keep up with that demand. A single professionally produced video takes days to conceive, shoot, edit, and deliver. The math doesn&rsquo;t work.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            The platforms reward brands that show up every day. AI is how you show up every day without burning out your team or your budget.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              AI as the Content Multiplier
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The solution is not choosing between quality and quantity. It&rsquo;s building a pipeline where AI handles the repetitive production tasks so humans can focus on the creative strategy that makes content connect. Here&rsquo;s how we structure it.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We produce one high-quality &ldquo;hero&rdquo; piece per week. Full creative direction, professional production value, strong storytelling. Then AI workflows break that hero piece into five to eight derivative assets: clips, remixes, alternate cuts, platform-specific reformats, text overlay variations, and response hooks. Each derivative is reviewed and refined by a human editor, but the generation and rough assembly happen at machine speed.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              One shoot day becomes a week of content. One creative concept becomes a full multi-platform rollout. The human investment stays focused on the work that matters: the idea, the story, the creative direction. AI handles the multiplication.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Platform-Native Is Non-Negotiable
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The biggest mistake brands make with short-form content is treating every platform the same. A TikTok is not a Reel is not a Short. Each platform has different pacing expectations, different safe zones for text, different audience behaviors, and different algorithmic signals that determine reach.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              AI tools now handle platform-specific optimization automatically. They reframe content for different aspect ratios, adjust pacing and cut rhythm for each platform&rsquo;s engagement patterns, generate platform-native text overlays and captions, and even suggest optimal posting times based on audience data. The creative core stays the same, but the delivery is tailored for each platform&rsquo;s native language.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            The best short-form content feels like it was born on the platform, not adapted from something else. AI makes native formatting scalable.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Hook Economy
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              In short-form content, the first three seconds determine everything. You either stop the scroll or you don&rsquo;t exist. This is where AI has become genuinely useful. AI tools can analyze thousands of high-performing hooks in your category, identify patterns in what captures attention, and generate hook variations for testing.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We use AI to generate ten to fifteen hook options for every piece of content, then test the top three across platforms. The data comes back within 48 hours, and we know exactly which creative direction resonates. This level of systematic testing was impossible when every variation required manual production. With AI, it&rsquo;s standard practice.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Sound and Music: The Secret Weapon
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Sound is the most underrated element in short-form content. The right audio can make a mediocre video go viral. The wrong audio makes even great visuals forgettable. AI sound design tools have made professional audio accessible at the scale short-form content demands.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We generate custom sound beds, trending audio adaptations, and branded audio signatures using AI tools, then layer them with human-directed mixing and refinement. Every piece of content ships with audio that feels intentional and premium, not like it was pulled from a stock library five minutes before posting.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            Sound is where most brand content falls apart. AI sound design closes the gap between what brands can afford and what audiences expect.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Brands Winning the Short-Form Game
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The brands dominating short-form in 2026 share three characteristics. They publish at high volume without sacrificing production quality. They test relentlessly with AI-powered variation. And they treat each platform as a unique creative canvas, not a distribution endpoint for the same content.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              If your brand is posting the same 16:9 video cropped to 9:16 across every platform, you&rsquo;re leaving reach on the table. If you&rsquo;re publishing twice a week because your production team can&rsquo;t keep up, you&rsquo;re invisible to the algorithms. AI-powered short-form workflows solve both problems simultaneously: more content, better adapted, at a pace that keeps your brand in the feed and in the conversation.
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
