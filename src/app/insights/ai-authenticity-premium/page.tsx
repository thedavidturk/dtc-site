"use client";

import Link from "next/link";
import { m } from "framer-motion";
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
    title: "Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website",
    category: "AI + DISCOVERY",
    href: "/insights/zero-click-visibility",
    gradient: "from-emerald-500/30 via-teal-900/50 to-deep-space",
  },
  {
    title: "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video",
    category: "PRODUCTION STRATEGY",
    href: "/insights/ai-content-pipeline",
    gradient: "from-amber-500/30 via-orange-900/50 to-deep-space",
  },
];

export default function AiAuthenticityPremiumArticle() {
  return (
    <main className="relative min-h-screen bg-deep-space text-white">
      <ArticleJsonLd
        title="The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads"
        description="As AI makes infinite content cheap, authenticity becomes the scarce, premium asset. Here is how brands earn trust instead of faking it."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/ai-authenticity-premium"
      />

      {/* Back link */}
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Insights
        </Link>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-800 to-slate-950 opacity-90" />
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <m.div initial="hidden" animate="visible" variants={staggerContainer}>
            <m.div variants={staggerItem} className="mb-6">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
                BRAND + TRUST
              </span>
            </m.div>
            <m.h1
              variants={staggerItem}
              className="font-display text-h1 font-bold"
            >
              The Authenticity Premium: Winning Trust When 57% of People Fear Fake AI Ads
            </m.h1>
            <m.p
              variants={staggerItem}
              className="mt-6 text-lg leading-relaxed text-white/70"
            >
              When anyone can fake anything, the real thing becomes the luxury good.
            </m.p>
            <m.div
              variants={staggerItem}
              className="mt-8 flex items-center gap-3 text-sm text-white/50"
            >
              <span>David Turk</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>7 min read</span>
            </m.div>
          </m.div>
        </div>
      </header>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            The scarce thing is no longer content
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            For most of advertising history, the bottleneck was production. Making the thing was
            expensive, so making the thing well was a competitive advantage. That era is over. In
            2026 a small team can generate a thousand variations of a campaign before lunch, and the
            tools keep getting cheaper and faster. Abundance has flipped the scarcity. What is rare
            now is not the asset. It is the belief that the asset is true.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            We see this every week in our own studio. We can produce more in a day than we used to
            ship in a quarter. But the question clients keep asking has changed. It is no longer
            &ldquo;can you make more&rdquo; but &ldquo;will people believe it.&rdquo; That shift is
            the whole story, and it has a number attached to it.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            57 percent are scared, and they are not wrong
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            Fifty-seven percent of consumers say they are concerned about fake ads created with
            generative AI. That is a majority of your audience walking into every impression with a
            raised eyebrow. They have seen the synthetic spokesperson, the testimonial from a person
            who does not exist, the &ldquo;before and after&rdquo; that was never photographed. Their
            skepticism is earned, and it does not switch off when your logo appears.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            Here is the part most brands miss. That same audience is not anti-AI. Sixty-eight percent
            view generative AI favorably, up from 62 percent in 2024. Among marketers, 75 percent are
            positive, up from 68 percent. People are not afraid of the technology. They are afraid of
            being deceived by it. The fear is specific, and a specific fear can be answered.
          </p>
        </m.div>

        <m.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="my-12 border-l-2 border-rose-400/60 pl-6 text-xl font-medium italic leading-relaxed text-white/90 sm:text-2xl"
        >
          &ldquo;People are not afraid of AI. They are afraid of being lied to by it. Those are very
          different problems, and only one of them is yours to solve.&rdquo;
        </m.blockquote>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            The governance gap is where trust leaks out
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            Look at where the money goes and you can see the problem forming. Organizations now spend
            roughly 22 percent of budget on content generation, with adoption around 81 percent.
            Meanwhile they spend about 3 percent on governance, with adoption near 31 percent. We are
            pouring resources into making more and almost nothing into making sure what we make is
            accurate, on brand, and defensible.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            The bill is already arriving. Over 70 percent of marketers have hit an AI issue, a
            hallucination, a bias problem, an off-brand piece that slipped out the door. And yet
            fewer than 35 percent plan to increase investment in governance or brand integrity in
            2026. The market is sprinting toward volume while leaving the trust controls unstaffed.
            That gap is not a risk to manage. For the brands that close it, it is an opening.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Disclose like you have nothing to hide
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            The instinct to hide the AI is the exact instinct that destroys trust. Audiences are
            good at sensing concealment, and the moment they catch you obscuring how something was
            made, every other claim you make inherits the doubt. We treat disclosure as a feature,
            not a confession. Provenance signals, clear labels on synthetic elements, and plain
            language about what is real and what is generated all read as confidence, not weakness.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            Good disclosure is not a legal disclaimer buried in eight-point gray type. It is part of
            the craft. When we use AI to extend a set, age a product over a decade, or stage a scene
            we could never physically build, we say so, and we say it in a way that adds to the
            story rather than apologizing for it. Honesty, framed well, is a brand asset.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Keep a human creative director accountable
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            A model does not have a reputation to protect. A person does. That is why every piece of
            work that leaves our studio has a named human who signed off on it and who owns the
            consequences if it is wrong. Human-in-the-loop is not a buzzword for us. It is the last
            and most important gate, the moment where someone with taste and liability looks at the
            output and decides whether it is true, on brand, and worth attaching a name to.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            This is also the cheapest insurance against the governance gap. The technology will
            hallucinate. It will drift off brand. It will occasionally produce something confidently
            wrong. A creative director who is accountable, not just present, catches those before the
            audience does. Accountability is the part you cannot automate, and that is precisely why
            it is becoming valuable.
          </p>
        </m.div>

        <m.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="my-12 border-l-2 border-rose-400/60 pl-6 text-xl font-medium italic leading-relaxed text-white/90 sm:text-2xl"
        >
          &ldquo;A model has no reputation to lose. A person does. Put a name on the work, and you
          have put trust back into the machine.&rdquo;
        </m.blockquote>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Enhance the real, do not fake the real
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            There is a bright line between using AI to enhance a real moment and using it to
            manufacture a fake one. We stay on the right side of it on purpose. Real people, real
            stories, and real product behavior stay at the center of the work. AI does the heavy
            lifting around them, the lighting passes, the environment extensions, the speed, the
            scale, the dozen variations a campaign now needs. It amplifies what is true. It does not
            invent what is not.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            This also keeps us out of the uncanny valley, which is where trust goes to die. A synthetic
            face that is almost right, a voice that is almost human, a testimonial that is almost
            believable, these do more damage than no ad at all. We would rather show a slightly
            imperfect real person than a flawless fake one, because the imperfection is the proof.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Brand integrity is a sonic and visual contract
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            Authenticity is not only about whether a person is real. It is also about whether the
            brand is consistent. When you generate at volume, the easy failure is drift, a thousand
            assets that each look a little less like you until the cumulative effect is a brand that
            feels off without anyone being able to say why. We protect against that with tight visual
            and sonic guardrails, reference libraries, locked palettes, approved voices, and a clear
            sense of what the brand will and will not say.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            Consistency is a trust signal in its own right. When every touchpoint feels like it came
            from the same intentional hand, audiences relax. When it feels assembled by a machine
            with no editor, they tense up. The studios that win the authenticity premium are the
            ones treating brand integrity as a contract with the audience, not a style guide nobody
            reads.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            The premium is real, and it compounds
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/70">
            Put it together and the strategy is simple to say and hard to fake. Disclose well. Keep
            a human accountable. Protect the brand. Use AI to enhance real moments rather than
            counterfeit them. Brands that do this earn what we call the authenticity premium, the
            measurable advantage of being believed in a feed full of things people no longer trust.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            The math is favorable. The crowd is overspending on generation and underspending on
            trust, which means the cost of standing out by being credible has never been lower. We
            use AI hard, for craft and for speed, because it lets us put more attention on the part
            that actually moves people. The human and the real stay at the center. Everything else
            is just production. And production, finally, is cheap.
          </p>
        </m.div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* More Perspectives */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <m.h2
            variants={staggerItem}
            className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            More Perspectives
          </m.h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {moreArticles.map((article) => (
              <m.div key={article.href} variants={staggerItem}>
                <Link
                  href={article.href}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10 p-6 transition hover:border-white/30"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-60 transition group-hover:opacity-80`}
                  />
                  <div className="relative">
                    <span className="text-xs font-medium uppercase tracking-widest text-white/60">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </m.div>
      </article>
    </main>
  );
}
