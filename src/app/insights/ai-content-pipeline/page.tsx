"use client";

import Link from "next/link";
import { m } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const EASE = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
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
    transition: { duration: 0.5, ease: EASE },
  },
};

const metadata = [
  { label: "Words By", value: "David Turk" },
  { label: "Published", value: "June 2026" },
  { label: "Category", value: "Production Strategy" },
  { label: "Read Time", value: "9 Min" },
];

const moreArticles = [
  {
    title:
      "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    category: "AI + VIDEO",
    href: "/insights/ai-video-stack",
  },
  {
    title:
      "The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
  },
];

export default function AiContentPipelineArticle() {
  return (
    <article className="bg-obsidian min-h-screen text-bone">
      <ArticleJsonLd
        title="From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video"
        description="A 60-second video that took 13 days now ships in 27 minutes. The bottleneck moved from production to taste. Here is how we rebuilt the pipeline."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/ai-content-pipeline"
      />

      {/* Hero: printed-essay opening */}
      <header className="section-container pt-32 md:pt-44">
        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: EASE }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-16 md:mt-20 text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue"
        >
          Production Strategy
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="font-headline font-normal text-h1 text-bone max-w-5xl mt-8"
        >
          From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="font-body font-normal text-body-lg text-fog-blue max-w-2xl mt-10"
        >
          When a 60-second spot drops from thirteen days to twenty-seven minutes, the real work doesn&rsquo;t disappear. It moves. The constraint is no longer the camera. It&rsquo;s the taste behind it.
        </m.p>

        {/* Metadata rule row */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          className="border-t border-ash-border mt-16 md:mt-20 pt-10 flex flex-wrap gap-x-14 gap-y-8"
        >
          {metadata.map((item) => (
            <div key={item.label}>
              <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">{item.label}</p>
              <p className="mt-2 font-body font-normal text-body-sm text-bone">{item.value}</p>
            </div>
          ))}
        </m.div>
      </header>

      {/* Article Body */}
      <section className="section-container section-padding">
        <m.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-[640px]">
          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              The Number That Broke Our Old Assumptions
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              Here&rsquo;s the data point we keep returning to. A 60-second marketing video that used to take our team about thirteen days, brief to final master, can now be produced in roughly twenty-seven minutes. Production cost on that kind of asset has dropped close to 91 percent against the traditional method. We didn&rsquo;t pull that number from a deck. We watched it happen on our own jobs.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              We&rsquo;re not alone, and that&rsquo;s the part worth sitting with. Around 78 percent of marketing teams now use AI-generated video in at least one campaign per quarter. The AI video market is compounding at roughly 34 percent a year, and the broader generative video category is already in the hundreds of millions and climbing fast. Agentic and multimodal systems are no longer a lab demo. They&rsquo;re embedded in the daily flow of how content gets made.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              When a cost collapses that hard and that fast, the temptation is to celebrate the savings and move on. That&rsquo;s a mistake. A change this large doesn&rsquo;t just make the old process cheaper. It quietly rearranges where the difficulty lives, and most teams are still staring at the place the difficulty used to be.
            </p>
          </m.div>

          <m.blockquote variants={fadeUp} className="border-l border-ash-border pl-8 my-16 font-body font-normal text-body-lg text-bone">
            When generation is free, the scarce resource is no longer production. It&rsquo;s the person willing to say no.
          </m.blockquote>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              The Bottleneck Moved. Most People Are Looking at the Wrong Place.
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              For a hundred years the binding constraint in production was capacity. You could only shoot so much, render so much, edit so much. Budgets, calendars, and org charts were all built around that scarcity. So when generation suddenly becomes near-instant and near-free, the instinct is to celebrate the unlock and pour the freed-up capacity straight back into volume.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              That instinct is wrong, or at least incomplete. When the cost of making a thing collapses, the cost of deciding whether the thing is any good does not. The constraint just relocated. It&rsquo;s now creative direction, taste, judgment, QA, and orchestration. The studios and brands that simply make more will drown in their own output. The ones that win will treat the new abundance as a reason to get sharper about decisions, not louder about quantity.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              Map the Old Pipeline Before You Rebuild It
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              We started where every honest rebuild starts, by drawing the thing we already had. The old linear pipeline looked like most agency pipelines: brief, concept, pre-production, shoot, edit, color, sound, revisions, delivery. Each stage handed off to the next, and each handoff was a cost and a delay. The diagram was less a process and more a relay race where the baton sat in someone&rsquo;s inbox for two days at a time.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              Once it was on the wall, the question got easy to ask. Which of these stages does AI genuinely compress, and which ones have to stay human no matter how good the models get? That single question is the whole project. Everything after it is just execution.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              What AI Compresses, and What It Must Not Touch
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The compressible stages were obvious in hindsight. Drafts, variations, volume. The first eighty cuts of a concept, the fifteen aspect ratios, the localized versions, the throwaway explorations that used to cost a day each. AI eats those for breakfast. We let it. That&rsquo;s where the twenty-seven-minute number actually comes from. It&rsquo;s not magic. It&rsquo;s the relay race collapsing into a single sprint because the slow legs got handed to a machine.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The stages that stay human are the ones that carry a point of view. The brief. The selection of which draft is worth pursuing. The decision about whether a piece is true to the brand or merely competent. Sign-off. AI can generate a thousand options. It cannot tell you which one means something, because meaning is the one thing it doesn&rsquo;t have a stake in. We protect those stages like they&rsquo;re the product, because they are.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              Build the Review Gates, or the Volume Will Bury You
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The most important thing we added to the new pipeline wasn&rsquo;t a model. It was friction, applied in exactly the right places. We installed review gates: a small number of moments where a human creative director has to look at the work and make a real call before it moves forward. A gate after the brief is approved. A gate after the first round of AI drafts. A gate before anything goes to a client or a platform.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              Gates sound like bureaucracy. Done badly, they are. Done well, they&rsquo;re the only thing that keeps near-infinite output from becoming near-infinite noise. The rule we hold to is simple. Generation can scale without limit. Approval cannot. Every gate has a name attached to it, a human who owns the standard at that point in the line.
            </p>
          </m.div>

          <m.blockquote variants={fadeUp} className="border-l border-ash-border pl-8 my-16 font-body font-normal text-body-lg text-bone">
            Generation scales infinitely. Judgment does not. Build your pipeline around the thing that stays scarce.
          </m.blockquote>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              Measure Velocity and Quality, Never Just One
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The trap is to fall in love with velocity because it&rsquo;s the easy thing to measure. Assets per week. Turnaround time. Cost per minute. All real, all worth tracking, all dangerous on their own. A pipeline tuned for pure speed will happily produce a hundred forgettable videos and call it a great quarter.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              So we measure both, and we weight them. Velocity tells us the machine is healthy. Quality tells us the machine is worth running. We track how often work clears a gate on the first pass, how often a client uses what we ship without further edits, and how the work performs once it&rsquo;s live. When velocity climbs but quality slips, that&rsquo;s not a win. That&rsquo;s a warning that we&rsquo;ve started optimizing for the wrong number.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              The Honest Risk: a Flood of Competent, Forgettable Content
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              We owe everyone the honest version of this story. The same tooling that took us from thirteen days to twenty-seven minutes is taking everyone else there too. The predictable result is a tidal wave of content slop: technically clean, on-brief, and completely forgettable. Cheap to make has always meant easy to ignore, and the cost of making has never been lower.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The defense isn&rsquo;t to opt out of the tools. That ship has sailed, and pretending otherwise is just slow surrender. The defense is to keep a human accountable for taste at every gate and to treat the quality bar as the one thing that doesn&rsquo;t bend when the volume goes up. Abundance isn&rsquo;t the enemy. Indifference is. A pipeline that scales output without scaling care is just a faster way to make work nobody remembers.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h2 className="font-headline text-heading-sm font-normal text-bone mt-12 mb-6">
              How We Re-Architected Our Own Studio
            </h2>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              At DT+C we rebuilt our own pipeline the same way we&rsquo;d advise a client to. Clear brief at the front, written by humans who know the brand. AI handling drafts, variations, and volume in the middle. Creative directors stationed at every decision gate, with tight feedback loops so a note becomes a new version in minutes instead of days. A quality bar that rises with the volume rather than dissolving into it.
            </p>
            <p className="font-body text-body-sm font-normal text-bone mb-7">
              The payoff isn&rsquo;t that we make more. It&rsquo;s that we make more of what matters, and we kill the rest early. Twenty-seven minutes bought us back the thirteen days, and we spent that time on the only thing the machines still can&rsquo;t do for us, which is deciding what&rsquo;s worth making in the first place. That&rsquo;s the work now. It was probably always the work. The AI just made it impossible to hide from.
            </p>
          </m.div>
        </m.div>
      </section>

      {/* Rule */}
      <div className="section-container">
        <div className="border-t border-ash-border" />
      </div>

      {/* More Perspectives */}
      <section className="section-container section-padding">
        <m.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16 md:mb-20">
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">Continue Reading</p>
          <h2 className="font-headline font-normal text-heading-lg text-bone">More Perspectives</h2>
        </m.div>
        <m.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="max-w-[900px]">
          {moreArticles.map((article) => (
            <m.div key={article.href} variants={staggerItem}>
              <Link
                href={article.href}
                className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-10 border-t border-ash-border py-10"
              >
                <div>
                  <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">{article.category}</span>
                  <h3 className="font-headline font-normal text-heading-sm text-bone mt-3 max-w-xl transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                    {article.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 shrink-0 text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </Link>
            </m.div>
          ))}
          <div className="border-t border-ash-border" />
        </m.div>
      </section>
    </article>
  );
}
