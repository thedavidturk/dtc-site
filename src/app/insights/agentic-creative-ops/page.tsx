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
    title: "Taste Is the Bottleneck: Creative Direction in the Slop Flood",
    category: "CRAFT + AI",
    href: "/insights/taste-is-the-bottleneck",
  },
];

const metaRow = [
  { label: "Words", value: "David Turk" },
  { label: "Published", value: "August 2026" },
  { label: "Reading Time", value: "7 min read" },
];

export default function AgenticCreativeOpsArticle() {
  return (
    <main className="relative min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="One Brief, a Thousand Variants: Creative Ops in the Agent Era"
        description="In July 2026 the platforms industrialized creative variation. Generation is free now. Orchestration and governance are the new job, and the brief is the most important document in the building."
        datePublished="2026-08-03"
        url="https://davidturkcreative.com/insights/agentic-creative-ops"
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
            AI + Operations
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            One Brief, a Thousand Variants: Creative Ops in the Agent Era
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            In one month the platforms industrialized creative variation. Generating a thousand
            versions of an ad is now a checkbox. The new job is orchestration and governance,
            deciding what the system makes, in what order, and what it may never touch.
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
              The Month Variation Became Free
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              July 2026 was the month the platforms stopped asking permission. OpenAI took ChatGPT
              ads out of private beta and opened a public self-serve portal, which means the
              largest conversational surface on the internet now sells placement to anyone with a
              login. LinkedIn rolled out Brand Kit, letting advertisers lock in brand colors,
              fonts, logo, and voice, and paired it with AI tools that generate multiple headline
              and copy combinations from a single campaign setup.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Canva went further and dissolved the app boundary entirely, shipping integrations
              that generate branded graphics directly from conversations with ChatGPT, Claude,
              Copilot, and Gemini. Ask for the asset in chat, get the asset in chat. Three
              platforms, one message: making more versions of the thing is no longer your problem.
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
              One Setup, a Bigger Pool
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Look at the mechanics of the LinkedIn release, because they are the template for
              where every channel is going. You supply images, video, and copy once. The system
              mixes and matches them into a larger creative pool and tests the permutations
              against real audiences. The unit of creative work is shifting from the ad to the
              pool the ads are drawn from.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The buy side has already voted. An IAB report found that 86 percent of media buyers
              currently use or plan to use AI-generated video ads in 2026. That is not an early
              adopter number. That is the market, and it prices generated volume at roughly zero.
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
              &ldquo;The platforms did not make creative better in July. They made creative
              plural. Whether that helps you depends entirely on what you fed the machine.&rdquo;
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
              From Generation to Orchestration
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The larger shift in 2026 is from single-task generation to systems orchestration.
              The leading teams no longer prompt a model for one asset at a time. They deploy
              autonomous agents that manage entire workflows, from intake to versioning to
              trafficking, and they spend their own hours designing the route the work travels
              rather than pushing it along by hand.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The channels reward this. Distribution now favors volume and variety, and
              performance depends on relevance to micro-audiences that no human team could
              hand-craft for at scale. Governance is catching up, but it is catching up from
              behind. The capability shipped first. The judgment about how to use it is still
              being written, and mostly by the teams willing to write it themselves.
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
              The Brief Is the Building Now
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Here is our studio&rsquo;s thesis. The platforms just made variation free, and that
              makes the brief the most important document in the building. When one setup fans out
              into a thousand executions, every weakness in the source idea fans out with it. A
              thousand variants of a weak idea is a thousand weak ads, shipped faster and to more
              micro-audiences than any weak idea has ever reached before.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Agents multiply whatever you hand them. They do not improve it, question it, or save
              it. The leverage in this system sits entirely upstream, in the strategy, the idea,
              and the brief that carries both. That is where we now spend the time we used to
              spend on production.
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
              What a Studio-Grade Pipeline Looks Like
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              A studio-grade agentic pipeline starts with a locked brand system the agents cannot
              drift from. Type, color, voice, and the rules for using them live as constraints in
              the pipeline, not as a PDF nobody opens. Then two human gates, one at concept and
              one at final cut. Nothing enters the system without a creative director approving
              the idea, and nothing leaves it without a human approving what ships.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Between those gates, the agents earn their keep. Resizing, versioning, localization,
              and testing permutations are exactly the work machines should own, because the work
              is defined by rules rather than judgment. The humans hold the two moments where
              judgment decides everything. The agents hold everything in between.
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
              &ldquo;Agents multiply whatever you hand them. The brief is no longer paperwork. It
              is the source code for everything the system will make in your name.&rdquo;
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
              Governance Is a Creative Act
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The least glamorous part of this shift may be the most creative. Deciding what the
              system may never generate is brand strategy now. The claims your agents cannot make,
              the imagery they cannot reach for, the tonal registers that are off limits no matter
              what the test data says: that negative space defines the brand as sharply as any
              campaign ever did.
            </p>
            <p className="text-body-sm font-normal text-bone">
              We write those constraints the way we used to write manifestos, carefully and with
              intent, because in an agentic pipeline they execute. A guideline a junior designer
              might bend, an agent will follow ten thousand times without blinking. Governance is
              no longer the legal review at the end. It is authorship at the start.
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
              The Idea That Deserved the Thousand
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              None of this argues against the machinery. We run it, and we run it hard. The
              self-serve portals, the brand kits, the variant engines are real leverage, and the
              studios that refuse them will simply be outpaced by the ones that do not. The
              argument is about where the advantage lives once everyone has the same machinery,
              which is roughly now.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The teams that win this era are not the ones generating the most. Everyone generates
              the most. They are the ones whose one idea deserved the thousand variants, and whose
              pipeline was disciplined enough to keep every one of them on brief. That is the work
              our studio is building for, and it starts, as it always has, with the brief.
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
