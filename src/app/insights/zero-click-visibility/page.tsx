"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const moreArticles = [
  {
    title: "The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads",
    category: "BRAND + TRUST",
    href: "/insights/ai-authenticity-premium",
    gradient: "from-rose-500/30 via-pink-900/50 to-deep-space",
  },
  {
    title: "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    category: "AI + VIDEO",
    href: "/insights/ai-video-stack",
    gradient: "from-indigo-500/30 via-blue-900/50 to-deep-space",
  },
];

export default function ZeroClickVisibilityArticle() {
  return (
    <main className="relative min-h-screen bg-deep-space text-white overflow-hidden">
      <ArticleJsonLd
        title="Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website"
        description="Discovery has moved from ranking on Google to being the source an AI cites. Here is how brands stay found in a zero-click world."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/zero-click-visibility"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-800 to-slate-950 opacity-20" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-12"
          >
            <span aria-hidden>&larr;</span> Back to home
          </Link>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-6">
                AI + DISCOVERY
              </span>
            </motion.div>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-8"
            >
              People ask ChatGPT, Perplexity, and Gemini, get an answer, and never click through. Discovery has stopped being about ranking on Google and started being about whether an AI names you at all.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-4 text-sm text-white/50"
            >
              <span>David Turk</span>
              <span aria-hidden>&middot;</span>
              <span>8 min read</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="mt-10 h-px w-full bg-gradient-to-r from-white/40 via-white/10 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <article className="relative px-6 pb-24">
        <div className="max-w-3xl mx-auto prose-invert">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              The click is no longer the point
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              For two decades the entire discipline of getting found online pointed at one event: the click. You ranked, someone tapped your link, they landed on your site. Everything from headlines to schema to backlinks existed to win that single moment. That moment is quietly disappearing.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Zero-click search now spans ChatGPT, Perplexity, Gemini, Bing, and Meta AI. A person asks a question inside one of those tools, reads a confident answer, and moves on. The website that supplied the underlying facts may have shaped the reply, but the visitor never arrived. For a brand, that is either a quiet death or a new front door, depending on whether the answer mentions you.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              We have stopped asking clients &ldquo;where do you rank&rdquo; and started asking &ldquo;what does the model say when someone asks about your category.&rdquo; Those are very different questions, and most brands have never tested the second one.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              The rankings you optimized for barely apply
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Here is the part that unsettles most marketing teams. Only around 8% of the citations ChatGPT serves come from Google&rsquo;s top-10 results. Gemini is similar at roughly 8.6%. The page-one positions you spent years and budget defending are almost irrelevant to two of the biggest answer engines on the planet.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Perplexity is the exception that proves the rule. It leans more on live search, with about 28.6% of its citations drawn from first-page Google links. So classic SEO still buys you something there. But even at its strongest, traditional ranking explains under a third of what gets cited. The other two-thirds comes from somewhere else.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              That &ldquo;somewhere else&rdquo; is the new battleground. It is the body of structured, quotable, trusted material these models pull from when they assemble an answer. Winning it is a different craft than chasing keywords, and it rewards different work.
            </p>
          </motion.div>

          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="my-12 border-l-2 border-white/30 pl-6 text-xl md:text-2xl font-medium italic text-white/90 leading-relaxed"
          >
            &ldquo;The goal is no longer to rank on Google. It is to be the source an AI decides to cite.&rdquo;
          </motion.blockquote>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              From SEO to AEO and GEO
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              The acronyms are new but the logic is simple. Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) describe the practice of making your content the thing a model reaches for when it answers a question. SEO got you indexed. AEO and GEO get you quoted.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              This matters more every quarter because trust in these tools is climbing. Around 68% of consumers now view generative AI favorably, up from 62% in 2024. People are not just experimenting with answer engines, they are starting to believe them. When a model says a brand is the best option, that statement carries weight a tenth blue link never had.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              So the work shifts from gaming a ranking algorithm to earning a citation from a reasoning system. You cannot keyword-stuff your way into an answer. You have to be genuinely useful, clearly stated, and easy to verify.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              Write claims a machine can actually quote
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Models cite content that is structured and unambiguous. Vague brand poetry does not survive the trip into an answer. A clean factual claim, a number with a source, a clear definition, a direct comparison: these are the units a model can lift and repeat without inventing anything.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              We build content for clients with that in mind. State the claim plainly, support it with original data the brand actually owns, and format it so a machine can parse the structure. Original research is the strongest play of all, because a number nobody else has published gives the model a reason to name its source, and that source is you.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              The irony is that writing for machines makes the writing better for people too. Clarity, evidence, and a real point of view never went out of style. They were just easy to skip when keyword density paid the bills.
            </p>
          </motion.div>

          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="my-12 border-l-2 border-white/30 pl-6 text-xl md:text-2xl font-medium italic text-white/90 leading-relaxed"
          >
            &ldquo;You cannot keyword-stuff your way into an answer. You have to own a point of view worth repeating.&rdquo;
          </motion.blockquote>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              Be a consistent entity, not a scattered presence
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Answer engines reason about entities, not just pages. They build an internal model of who you are, what you do, and how reliable you seem, stitched together from everywhere you appear. If your brand describes itself five different ways across five platforms, the model gets a blurry picture and hedges its answer.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Entity consistency is now a discovery asset. The same name, the same category language, the same core claims, repeated cleanly across your site, your profiles, your press, and the third-party sources that mention you. The clearer and more consistent the signal, the more confidently a model will surface you by name.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              This is where a creative studio earns its keep. A distinctive, well-defined brand entity is not just a design exercise anymore. It is the thing that makes you legible to the systems deciding who gets mentioned.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              Get referenced where the models read
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Since classic rankings explain so little of what gets cited, presence across the wider web matters more. The communities, publications, directories, and conversations these models draw from are where reputations get built. A mention in a place a model trusts can outperform a page-one ranking you fought for.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              We treat this like editorial and partnership work, not link farming. Get the brand into genuine conversations, contribute real expertise, publish data others want to reference. The aim is to be present, credibly, in the exact corners of the web that feed the answer.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              You are no longer building a single destination and hoping people find it. You are seeding a presence across the sources that get read on your behalf, every time someone asks a question you should be the answer to.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2">
              What we would do first
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Start by asking the engines about yourself. Run the real questions your customers ask through ChatGPT, Perplexity, and Gemini and read what comes back. You will learn fast whether you are named, mischaracterized, or invisible. That audit is the whole strategy in miniature.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              From there the playbook is consistent. Publish citable, opinionated content backed by original data. Lock down your entity so every source tells the same story. Earn references in the places models trust. Then keep checking the answers, because the engines change and so do the questions.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              If you want help building content worth citing and a brand worth surfacing, that is the work we do. The click may be fading, but being the answer has never been more valuable.
            </p>
          </motion.div>
        </div>
      </article>

      {/* More Perspectives */}
      <section className="relative px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-10"
          >
            More Perspectives
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {moreArticles.map((article) => (
              <motion.div key={article.href} variants={staggerItem}>
                <Link
                  href={article.href}
                  className="group block relative overflow-hidden rounded-2xl border border-white/10 p-8 h-full"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-40 group-hover:opacity-60 transition-opacity`}
                  />
                  <div className="relative">
                    <span className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight mt-3 mb-2 group-hover:text-white transition-colors">
                      {article.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
