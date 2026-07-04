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
    title:
      "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    category: "AI + VIDEO",
    href: "/insights/ai-video-stack",
    gradient: "from-indigo-500/30 via-blue-900/50 to-deep-space",
  },
  {
    title:
      "The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
    gradient: "from-rose-500/30 via-pink-900/50 to-deep-space",
  },
];

export default function AiContentPipelineArticle() {
  return (
    <article className="bg-deep-space min-h-screen">
      <ArticleJsonLd
        title="From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video"
        description="A 60-second video that took 13 days now ships in 27 minutes. The bottleneck moved from production to taste. Here is how we rebuilt the pipeline."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/ai-content-pipeline"
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-800 to-slate-950" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
        <div className="absolute top-1/4 left-[20%] w-32 h-32 border border-white/[0.06] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-12" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Production Strategy
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="font-display text-h1 font-bold mb-4 max-w-4xl">
            From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="font-body text-lg md:text-xl text-white/70 max-w-2xl">
            When a 60-second spot drops from thirteen days to twenty-seven minutes, the real work doesn&rsquo;t disappear. It moves. The constraint is no longer the camera. It&rsquo;s the taste behind it.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center gap-4 mt-6">
            <span className="font-mono text-xs text-white/50 tracking-wide">David Turk</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-mono text-xs text-white/50 tracking-wide">9 min read</span>
          </motion.div>

          <motion.div initial={{ width: 0 }} animate={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="h-px bg-gradient-to-r from-electric-indigo to-blue-400 mt-8" />
        </div>
      </section>

      {/* Article Body */}
      <section className="section-container section-padding">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Number That Broke Our Old Assumptions
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Here&rsquo;s the data point we keep returning to. A 60-second marketing video that used to take our team about thirteen days, brief to final master, can now be produced in roughly twenty-seven minutes. Production cost on that kind of asset has dropped close to 91 percent against the traditional method. We didn&rsquo;t pull that number from a deck. We watched it happen on our own jobs.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We&rsquo;re not alone, and that&rsquo;s the part worth sitting with. Around 78 percent of marketing teams now use AI-generated video in at least one campaign per quarter. The AI video market is compounding at roughly 34 percent a year, and the broader generative video category is already in the hundreds of millions and climbing fast. Agentic and multimodal systems are no longer a lab demo. They&rsquo;re embedded in the daily flow of how content gets made.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              When a cost collapses that hard and that fast, the temptation is to celebrate the savings and move on. That&rsquo;s a mistake. A change this large doesn&rsquo;t just make the old process cheaper. It quietly rearranges where the difficulty lives, and most teams are still staring at the place the difficulty used to be.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            When generation is free, the scarce resource is no longer production. It&rsquo;s the person willing to say no.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Bottleneck Moved. Most People Are Looking at the Wrong Place.
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              For a hundred years the binding constraint in production was capacity. You could only shoot so much, render so much, edit so much. Budgets, calendars, and org charts were all built around that scarcity. So when generation suddenly becomes near-instant and near-free, the instinct is to celebrate the unlock and pour the freed-up capacity straight back into volume.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              That instinct is wrong, or at least incomplete. When the cost of making a thing collapses, the cost of deciding whether the thing is any good does not. The constraint just relocated. It&rsquo;s now creative direction, taste, judgment, QA, and orchestration. The studios and brands that simply make more will drown in their own output. The ones that win will treat the new abundance as a reason to get sharper about decisions, not louder about quantity.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Map the Old Pipeline Before You Rebuild It
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We started where every honest rebuild starts, by drawing the thing we already had. The old linear pipeline looked like most agency pipelines: brief, concept, pre-production, shoot, edit, color, sound, revisions, delivery. Each stage handed off to the next, and each handoff was a cost and a delay. The diagram was less a process and more a relay race where the baton sat in someone&rsquo;s inbox for two days at a time.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Once it was on the wall, the question got easy to ask. Which of these stages does AI genuinely compress, and which ones have to stay human no matter how good the models get? That single question is the whole project. Everything after it is just execution.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              What AI Compresses, and What It Must Not Touch
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The compressible stages were obvious in hindsight. Drafts, variations, volume. The first eighty cuts of a concept, the fifteen aspect ratios, the localized versions, the throwaway explorations that used to cost a day each. AI eats those for breakfast. We let it. That&rsquo;s where the twenty-seven-minute number actually comes from. It&rsquo;s not magic. It&rsquo;s the relay race collapsing into a single sprint because the slow legs got handed to a machine.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The stages that stay human are the ones that carry a point of view. The brief. The selection of which draft is worth pursuing. The decision about whether a piece is true to the brand or merely competent. Sign-off. AI can generate a thousand options. It cannot tell you which one means something, because meaning is the one thing it doesn&rsquo;t have a stake in. We protect those stages like they&rsquo;re the product, because they are.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Build the Review Gates, or the Volume Will Bury You
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The most important thing we added to the new pipeline wasn&rsquo;t a model. It was friction, applied in exactly the right places. We installed review gates: a small number of moments where a human creative director has to look at the work and make a real call before it moves forward. A gate after the brief is approved. A gate after the first round of AI drafts. A gate before anything goes to a client or a platform.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              Gates sound like bureaucracy. Done badly, they are. Done well, they&rsquo;re the only thing that keeps near-infinite output from becoming near-infinite noise. The rule we hold to is simple. Generation can scale without limit. Approval cannot. Every gate has a name attached to it, a human who owns the standard at that point in the line.
            </p>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="pl-6 border-l-2 border-electric-indigo text-soft-white italic text-xl my-8">
            Generation scales infinitely. Judgment does not. Build your pipeline around the thing that stays scarce.
          </motion.blockquote>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              Measure Velocity and Quality, Never Just One
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The trap is to fall in love with velocity because it&rsquo;s the easy thing to measure. Assets per week. Turnaround time. Cost per minute. All real, all worth tracking, all dangerous on their own. A pipeline tuned for pure speed will happily produce a hundred forgettable videos and call it a great quarter.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              So we measure both, and we weight them. Velocity tells us the machine is healthy. Quality tells us the machine is worth running. We track how often work clears a gate on the first pass, how often a client uses what we ship without further edits, and how the work performs once it&rsquo;s live. When velocity climbs but quality slips, that&rsquo;s not a win. That&rsquo;s a warning that we&rsquo;ve started optimizing for the wrong number.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              The Honest Risk: a Flood of Competent, Forgettable Content
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              We owe everyone the honest version of this story. The same tooling that took us from thirteen days to twenty-seven minutes is taking everyone else there too. The predictable result is a tidal wave of content slop: technically clean, on-brief, and completely forgettable. Cheap to make has always meant easy to ignore, and the cost of making has never been lower.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The defense isn&rsquo;t to opt out of the tools. That ship has sailed, and pretending otherwise is just slow surrender. The defense is to keep a human accountable for taste at every gate and to treat the quality bar as the one thing that doesn&rsquo;t bend when the volume goes up. Abundance isn&rsquo;t the enemy. Indifference is. A pipeline that scales output without scaling care is just a faster way to make work nobody remembers.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-headline font-bold text-pure-white mt-12 mb-4">
              How We Re-Architected Our Own Studio
            </h2>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              At DT+C we rebuilt our own pipeline the same way we&rsquo;d advise a client to. Clear brief at the front, written by humans who know the brand. AI handling drafts, variations, and volume in the middle. Creative directors stationed at every decision gate, with tight feedback loops so a note becomes a new version in minutes instead of days. A quality bar that rises with the volume rather than dissolving into it.
            </p>
            <p className="font-body text-cool-gray text-lg leading-relaxed mb-6">
              The payoff isn&rsquo;t that we make more. It&rsquo;s that we make more of what matters, and we kill the rest early. Twenty-seven minutes bought us back the thirteen days, and we spent that time on the only thing the machines still can&rsquo;t do for us, which is deciding what&rsquo;s worth making in the first place. That&rsquo;s the work now. It was probably always the work. The AI just made it impossible to hide from.
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
          <h2 className="font-headline text-h3 font-bold">More <span className="gradient-text">Perspectives</span></h2>
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
