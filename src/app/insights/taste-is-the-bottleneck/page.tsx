"use client";

import Link from "next/link";
import { m } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const prismEase = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: prismEase } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: prismEase } },
};

const moreArticles = [
  {
    title: "The Campaign You Can Walk Through: World Models Turn Brand Films Into Places",
    category: "AI + WORLDS",
    href: "/insights/playable-brand-worlds",
  },
  {
    title: "The Authenticity Premium: Why Trust Beats Reach When 57% of People Doubt Your Ads",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
  },
];

const metaRow = [
  { label: "Words", value: "David Turk" },
  { label: "Published", value: "August 2026" },
  { label: "Reading Time", value: "8 min read" },
];

export default function TasteIsTheBottleneckArticle() {
  return (
    <main className="relative min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="Taste Is the Bottleneck: Creative Direction in the Slop Flood"
        description="Audiences spent the year learning to spot machine-made sameness, and the trust numbers doubled to prove it. The answer is not less AI. It is more direction."
        datePublished="2026-08-05"
        url="https://davidturkcreative.com/insights/taste-is-the-bottleneck"
      />

      {/* Opener: sculptural type on the obsidian void */}
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
            Craft + AI
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            Taste Is the Bottleneck: Creative Direction in the Slop Flood
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            Audiences spent this year getting fluent at spotting machine-made sameness, and the
            trust numbers doubled to prove it. The answer is not less AI. It is more direction over
            what the AI makes.
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

      {/* Article body: single narrow prose column */}
      <article className="section-container pb-28 md:pb-40">
        <div className="mx-auto max-w-[640px]">
          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The Numbers Doubled in a Year
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              In 2025, about twenty percent of consumers said heavy AI use would decrease their
              trust in a favorite brand. In 2026 that figure hit forty percent. It doubled in
              roughly the time it takes most organizations to finish an AI rollout. Half of US
              consumers now say they would rather buy from brands that do not use generative AI in
              customer-facing content at all.
            </p>
            <p className="text-body-sm font-normal text-bone">
              We wrote in June about the authenticity premium, and at the time the data looked like
              a warning. Two months later it looks like a verdict. Audiences did not slowly drift
              toward skepticism. They got trained, feed by feed, into a kind of fluency. They can
              read the tells now, and they hold what they read against the brand that posted it.
            </p>
          </m.section>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Slop Is a Consumer Word Now
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Research puts the detection rate at roughly seventy-three percent. Nearly three out
              of four people can identify AI-generated marketing content when they see it, and
              fifty-two percent reduce their engagement the moment they suspect it. Not when they
              confirm it. When they suspect it. Suspicion alone is now a conversion killer.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The audience even coined the vocabulary. Slop is not an industry term, it is what
              regular people call the low-effort, repetitive content drowning their feeds: work
              that looks polished and signals nothing. The polish is the giveaway. Everything is
              lit correctly, composed correctly, and utterly interchangeable with the post above it
              and the post below it.
            </p>
          </m.section>

          <m.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              &ldquo;Audiences are not detecting the model. They are detecting that nobody
              cared.&rdquo;
            </p>
          </m.blockquote>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Even Coke Could Not Outsource the Feeling
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              In December 2025, Coca-Cola released an AI remake of &ldquo;Holidays Are
              Coming,&rdquo; one of the most loved pieces of brand film ever made. The response was
              furious. Audiences called it soulless, and they were not wrong to. The trucks were
              there, the lights were there, and the thing people actually loved was not.
            </p>
            <p className="text-body-sm font-normal text-bone">
              That is the lesson of the year in one campaign. A century of brand equity could not
              cover for a pipeline that skipped the part where humans decide what the work should
              feel like. About eighty-six percent of consumers say authenticity matters in deciding
              which brands they support. You cannot generate your way around that number. You have
              to earn your way through it.
            </p>
          </m.section>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The Tension That Defines 2026
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Here is the trap every brand is standing in. Distribution rewards volume and variety.
              The algorithms want more posts, more formats, more versions per audience. At the same
              time, the humans on the other end punish sameness harder than they ever have. The
              platforms say publish constantly. The audience says bore me once and I am gone.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Producing more became easy at the exact moment producing something distinct became
              the whole game. That is not a paradox, it is a filter. The cost of making content
              went to nearly zero, so content stopped being the scarce thing. What is scarce is a
              point of view, and no model ships with one.
            </p>
          </m.section>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              This Is Not an Argument Against the Tools
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Let us be plain about where our studio stands, because we are AI-native and intend to
              stay that way. The backlash is not against the tools. It is against the absence of a
              point of view. When a brand hands the keys to a model and walks away, the output
              converges toward the average of everything the model has ever seen. And the average
              is invisible. It scrolls past without leaving a mark.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The same tools, pointed by a director with an actual opinion, produce work no
              committee of prompts could reach. The variable was never the model. It was whether
              anyone with taste was steering it, rejecting what it wanted to make, and pushing it
              toward what the brand needed to say.
            </p>
          </m.section>

          <m.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              &ldquo;AI without direction converges to the average of everything, and the average
              is invisible.&rdquo;
            </p>
          </m.blockquote>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              What Taste Looks Like on a Tuesday
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Taste sounds abstract until you watch it operate. In our studio it looks like
              rejecting the first competent draft on principle, because competent is exactly what
              everyone else is shipping. It looks like art direction that comes from the
              brand&rsquo;s world, its city, its people, its actual texture, instead of the
              model&rsquo;s defaults. It looks like human writing wherever the voice carries the
              brand.
            </p>
            <p className="text-body-sm font-normal text-bone">
              And it looks like craft passes at the end, the unglamorous rounds where we add the
              specific and the imperfect back in. The odd crop. The line that only this brand would
              say. The detail a model would never invent because no average contains it. That is
              the work the detection rate cannot catch, because there is nothing generic left to
              detect.
            </p>
          </m.section>

          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Who Survives the Flood
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The flood is not receding. The tools will get better, the volume will get higher, and
              the audience will get sharper right along with it. Every gain in generation gets
              matched by a gain in detection, which means the only durable advantage left is the
              one that was never automated in the first place.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The studios that survive this will not be the loudest or the fastest. They will be
              the ones whose work could not have been made by anyone else&rsquo;s pipeline. That is
              the bar we hold our own work to, and it is the only bar the audience is still
              grading on.
            </p>
          </m.section>
        </div>
      </article>

      {/* More perspectives: hairline listing rows */}
      <section className="section-container pb-32 md:pb-40">
        <div className="mx-auto max-w-4xl">
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            More Perspectives
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
    </main>
  );
}
