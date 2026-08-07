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
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: prismEase } },
};

const moreArticles = [
  {
    title: "The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
  },
  {
    title: "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    category: "AI + VIDEO",
    href: "/insights/ai-video-stack",
  },
];

const metaRow = [
  { label: "Words", value: "David Turk" },
  { label: "Published", value: "June 2026" },
  { label: "Reading Time", value: "8 min read" },
];

export default function ZeroClickVisibilityArticle() {
  return (
    <main className="relative min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website"
        description="Discovery has moved from ranking on Google to being the source an AI cites. Here is how brands stay found in a zero-click world."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/zero-click-visibility"
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
              Back to home
            </Link>
          </m.div>

          <m.p
            variants={staggerItem}
            className="mt-16 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
          >
            AI + Discovery
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            People ask ChatGPT, Perplexity, and Gemini, get an answer, and never click through.
            Discovery has stopped being about ranking on Google and started being about whether an
            AI names you at all.
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
              The click is no longer the point
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              For two decades the entire discipline of getting found online pointed at one event: the click. You ranked, someone tapped your link, they landed on your site. Everything from headlines to schema to backlinks existed to win that single moment. That moment is quietly disappearing.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Zero-click search now spans ChatGPT, Perplexity, Gemini, Bing, and Meta AI. A person asks a question inside one of those tools, reads a confident answer, and moves on. The website that supplied the underlying facts may have shaped the reply, but the visitor never arrived. For a brand, that is either a quiet death or a new front door, depending on whether the answer mentions you.
            </p>
            <p className="text-body-sm font-normal text-bone">
              We have stopped asking clients &ldquo;where do you rank&rdquo; and started asking &ldquo;what does the model say when someone asks about your category.&rdquo; Those are very different questions, and most brands have never tested the second one.
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
              The rankings you optimized for barely apply
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Here is the part that unsettles most marketing teams. Only around 8% of the citations ChatGPT serves come from Google&rsquo;s top-10 results. Gemini is similar at roughly 8.6%. The page-one positions you spent years and budget defending are almost irrelevant to two of the biggest answer engines on the planet.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Perplexity is the exception that proves the rule. It leans more on live search, with about 28.6% of its citations drawn from first-page Google links. So classic SEO still buys you something there. But even at its strongest, traditional ranking explains under a third of what gets cited. The other two-thirds comes from somewhere else.
            </p>
            <p className="text-body-sm font-normal text-bone">
              That &ldquo;somewhere else&rdquo; is the new battleground. It is the body of structured, quotable, trusted material these models pull from when they assemble an answer. Winning it is a different craft than chasing keywords, and it rewards different work.
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
              &ldquo;The goal is no longer to rank on Google. It is to be the source an AI decides to cite.&rdquo;
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
              From SEO to AEO and GEO
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The acronyms are new but the logic is simple. Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) describe the practice of making your content the thing a model reaches for when it answers a question. SEO got you indexed. AEO and GEO get you quoted.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              This matters more every quarter because trust in these tools is climbing. Around 68% of consumers now view generative AI favorably, up from 62% in 2024. People are not just experimenting with answer engines, they are starting to believe them. When a model says a brand is the best option, that statement carries weight a tenth blue link never had.
            </p>
            <p className="text-body-sm font-normal text-bone">
              So the work shifts from gaming a ranking algorithm to earning a citation from a reasoning system. You cannot keyword-stuff your way into an answer. You have to be genuinely useful, clearly stated, and easy to verify.
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
              Write claims a machine can actually quote
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Models cite content that is structured and unambiguous. Vague brand poetry does not survive the trip into an answer. A clean factual claim, a number with a source, a clear definition, a direct comparison: these are the units a model can lift and repeat without inventing anything.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              We build content for clients with that in mind. State the claim plainly, support it with original data the brand actually owns, and format it so a machine can parse the structure. Original research is the strongest play of all, because a number nobody else has published gives the model a reason to name its source, and that source is you.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The irony is that writing for machines makes the writing better for people too. Clarity, evidence, and a real point of view never went out of style. They were just easy to skip when keyword density paid the bills.
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
              &ldquo;You cannot keyword-stuff your way into an answer. You have to own a point of view worth repeating.&rdquo;
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
              Be a consistent entity, not a scattered presence
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Answer engines reason about entities, not just pages. They build an internal model of who you are, what you do, and how reliable you seem, stitched together from everywhere you appear. If your brand describes itself five different ways across five platforms, the model gets a blurry picture and hedges its answer.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Entity consistency is now a discovery asset. The same name, the same category language, the same core claims, repeated cleanly across your site, your profiles, your press, and the third-party sources that mention you. The clearer and more consistent the signal, the more confidently a model will surface you by name.
            </p>
            <p className="text-body-sm font-normal text-bone">
              This is where a creative studio earns its keep. A distinctive, well-defined brand entity is not just a design exercise anymore. It is the thing that makes you legible to the systems deciding who gets mentioned.
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
              Get referenced where the models read
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Since classic rankings explain so little of what gets cited, presence across the wider web matters more. The communities, publications, directories, and conversations these models draw from are where reputations get built. A mention in a place a model trusts can outperform a page-one ranking you fought for.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              We treat this like editorial and partnership work, not link farming. Get the brand into genuine conversations, contribute real expertise, publish data others want to reference. The aim is to be present, credibly, in the exact corners of the web that feed the answer.
            </p>
            <p className="text-body-sm font-normal text-bone">
              You are no longer building a single destination and hoping people find it. You are seeding a presence across the sources that get read on your behalf, every time someone asks a question you should be the answer to.
            </p>
          </m.section>

          <m.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <h2 className="mb-6 text-heading-sm font-normal text-bone">
              What we would do first
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Start by asking the engines about yourself. Run the real questions your customers ask through ChatGPT, Perplexity, and Gemini and read what comes back. You will learn fast whether you are named, mischaracterized, or invisible. That audit is the whole strategy in miniature.
            </p>
            <p className="mb-6 text-body-sm font-normal text-bone">
              From there the playbook is consistent. Publish citable, opinionated content backed by original data. Lock down your entity so every source tells the same story. Earn references in the places models trust. Then keep checking the answers, because the engines change and so do the questions.
            </p>
            <p className="text-body-sm font-normal text-bone">
              If you want help building content worth citing and a brand worth surfacing, that is the work we do. The click may be fading, but being the answer has never been more valuable.
            </p>
          </m.section>
        </div>
      </article>

      {/* More Perspectives: hairline listing rows */}
      <section className="section-container pb-32 md:pb-40">
        <div className="mx-auto max-w-4xl">
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
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
