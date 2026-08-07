"use client";

import Link from "next/link";
import { m } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const prismEase = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const moreArticles = [
  {
    title: "Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website",
    category: "AI + DISCOVERY",
    href: "/insights/zero-click-visibility",
  },
  {
    title: "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video",
    category: "PRODUCTION STRATEGY",
    href: "/insights/ai-content-pipeline",
  },
];

const metaRow = [
  { label: "Words", value: "David Turk" },
  { label: "Published", value: "June 2026" },
  { label: "Reading Time", value: "7 min read" },
];

export default function AiAuthenticityPremiumArticle() {
  return (
    <main className="relative min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads"
        description="As AI makes infinite content cheap, authenticity becomes the scarce, premium asset. Here is how brands earn trust instead of faking it."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/ai-authenticity-premium"
      />

      {/* Opener: sculptural type on the void */}
      <header className="section-container pt-32 pb-16 md:pt-40 md:pb-24">
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <m.div variants={staggerItem}>
            <Link
              href="/insights"
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
              Back to Insights
            </Link>
          </m.div>

          <m.p
            variants={staggerItem}
            className="mt-16 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            Brand + Trust
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            When anyone can fake anything, the real thing becomes the luxury good.
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

      {/* Body: narrow prose column */}
      <article className="section-container pb-28 md:pb-40">
        <div className="mx-auto max-w-[640px]">
          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The scarce thing is no longer content
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              For most of advertising history, the bottleneck was production. Making the thing was
              expensive, so making the thing well was a competitive advantage. That era is over. In
              2026 a small team can generate a thousand variations of a campaign before lunch, and the
              tools keep getting cheaper and faster. Abundance has flipped the scarcity. What is rare
              now is not the asset. It is the belief that the asset is true.
            </p>
            <p className="text-body-sm font-normal text-bone">
              We see this every week in our own studio. We can produce more in a day than we used to
              ship in a quarter. But the question clients keep asking has changed. It is no longer
              &ldquo;can you make more&rdquo; but &ldquo;will people believe it.&rdquo; That shift is
              the whole story, and it has a number attached to it.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              57 percent are scared, and they are not wrong
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Fifty-seven percent of consumers say they are concerned about fake ads created with
              generative AI. That is a majority of your audience walking into every impression with a
              raised eyebrow. They have seen the synthetic spokesperson, the testimonial from a person
              who does not exist, the &ldquo;before and after&rdquo; that was never photographed. Their
              skepticism is earned, and it does not switch off when your logo appears.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Here is the part most brands miss. That same audience is not anti-AI. Sixty-eight percent
              view generative AI favorably, up from 62 percent in 2024. Among marketers, 75 percent are
              positive, up from 68 percent. People are not afraid of the technology. They are afraid of
              being deceived by it. The fear is specific, and a specific fear can be answered.
            </p>
          </m.section>

          <m.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              &ldquo;People are not afraid of AI. They are afraid of being lied to by it. Those are very
              different problems, and only one of them is yours to solve.&rdquo;
            </p>
          </m.blockquote>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The governance gap is where trust leaks out
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Look at where the money goes and you can see the problem forming. Organizations now spend
              roughly 22 percent of budget on content generation, with adoption around 81 percent.
              Meanwhile they spend about 3 percent on governance, with adoption near 31 percent. We are
              pouring resources into making more and almost nothing into making sure what we make is
              accurate, on brand, and defensible.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The bill is already arriving. Over 70 percent of marketers have hit an AI issue, a
              hallucination, a bias problem, an off-brand piece that slipped out the door. And yet
              fewer than 35 percent plan to increase investment in governance or brand integrity in
              2026. The market is sprinting toward volume while leaving the trust controls unstaffed.
              That gap is not a risk to manage. For the brands that close it, it is an opening.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Disclose like you have nothing to hide
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The instinct to hide the AI is the exact instinct that destroys trust. Audiences are
              good at sensing concealment, and the moment they catch you obscuring how something was
              made, every other claim you make inherits the doubt. We treat disclosure as a feature,
              not a confession. Provenance signals, clear labels on synthetic elements, and plain
              language about what is real and what is generated all read as confidence, not weakness.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Good disclosure is not a legal disclaimer buried in eight-point gray type. It is part of
              the craft. When we use AI to extend a set, age a product over a decade, or stage a scene
              we could never physically build, we say so, and we say it in a way that adds to the
              story rather than apologizing for it. Honesty, framed well, is a brand asset.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Keep a human creative director accountable
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              A model does not have a reputation to protect. A person does. That is why every piece of
              work that leaves our studio has a named human who signed off on it and who owns the
              consequences if it is wrong. Human-in-the-loop is not a buzzword for us. It is the last
              and most important gate, the moment where someone with taste and liability looks at the
              output and decides whether it is true, on brand, and worth attaching a name to.
            </p>
            <p className="text-body-sm font-normal text-bone">
              This is also the cheapest insurance against the governance gap. The technology will
              hallucinate. It will drift off brand. It will occasionally produce something confidently
              wrong. A creative director who is accountable, not just present, catches those before the
              audience does. Accountability is the part you cannot automate, and that is precisely why
              it is becoming valuable.
            </p>
          </m.section>

          <m.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="my-20 border-l border-ash-border pl-8"
          >
            <p className="text-heading-sm font-normal text-bone">
              &ldquo;A model has no reputation to lose. A person does. Put a name on the work, and you
              have put trust back into the machine.&rdquo;
            </p>
          </m.blockquote>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Enhance the real, do not fake the real
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              There is a bright line between using AI to enhance a real moment and using it to
              manufacture a fake one. We stay on the right side of it on purpose. Real people, real
              stories, and real product behavior stay at the center of the work. AI does the heavy
              lifting around them, the lighting passes, the environment extensions, the speed, the
              scale, the dozen variations a campaign now needs. It amplifies what is true. It does not
              invent what is not.
            </p>
            <p className="text-body-sm font-normal text-bone">
              This also keeps us out of the uncanny valley, which is where trust goes to die. A synthetic
              face that is almost right, a voice that is almost human, a testimonial that is almost
              believable, these do more damage than no ad at all. We would rather show a slightly
              imperfect real person than a flawless fake one, because the imperfection is the proof.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              Brand integrity is a sonic and visual contract
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Authenticity is not only about whether a person is real. It is also about whether the
              brand is consistent. When you generate at volume, the easy failure is drift, a thousand
              assets that each look a little less like you until the cumulative effect is a brand that
              feels off without anyone being able to say why. We protect against that with tight visual
              and sonic guardrails, reference libraries, locked palettes, approved voices, and a clear
              sense of what the brand will and will not say.
            </p>
            <p className="text-body-sm font-normal text-bone">
              Consistency is a trust signal in its own right. When every touchpoint feels like it came
              from the same intentional hand, audiences relax. When it feels assembled by a machine
              with no editor, they tense up. The studios that win the authenticity premium are the
              ones treating brand integrity as a contract with the audience, not a style guide nobody
              reads.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              The premium is real, and it compounds
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Put it together and the strategy is simple to say and hard to fake. Disclose well. Keep
              a human accountable. Protect the brand. Use AI to enhance real moments rather than
              counterfeit them. Brands that do this earn what we call the authenticity premium, the
              measurable advantage of being believed in a feed full of things people no longer trust.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The math is favorable. The crowd is overspending on generation and underspending on
              trust, which means the cost of standing out by being credible has never been lower. We
              use AI hard, for craft and for speed, because it lets us put more attention on the part
              that actually moves people. The human and the real stay at the center. Everything else
              is just production. And production, finally, is cheap.
            </p>
          </m.section>
        </div>
      </article>

      {/* More Perspectives: hairline listing rows */}
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
