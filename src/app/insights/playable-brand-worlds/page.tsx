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
    title: "One Brief, a Thousand Variants: Creative Ops in the Agent Era",
    category: "AI + OPERATIONS",
    href: "/insights/agentic-creative-ops",
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
  { label: "Reading Time", value: "8 min read" },
];

export default function PlayableBrandWorldsArticle() {
  return (
    <main className="relative min-h-screen bg-obsidian text-bone">
      <ArticleJsonLd
        title="The Campaign You Can Walk Through: World Models Turn Brand Films Into Places"
        description="Real-time world models like Genie 3 just turned brand worlds from something audiences watch into somewhere they can go. Here is what that means for campaigns."
        datePublished="2026-08-01"
        url="https://davidturkcreative.com/insights/playable-brand-worlds"
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
            AI + Worlds
          </m.p>

          <m.h1
            variants={staggerItem}
            className="mt-6 font-body text-h1 font-normal text-bone"
          >
            The Campaign You Can Walk Through: World Models Turn Brand Films Into Places
          </m.h1>

          <m.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-body-lg font-normal text-fog-blue"
          >
            Real-time world models just changed the relationship between a brand world and its
            audience. What used to be something people watched is becoming somewhere they can go,
            and that shift will reshape how campaigns get made.
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
              The Demo That Changed the Verb
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Google DeepMind&rsquo;s Genie 3 is the first real-time interactive world model that
              actually earns the name. Type a description and it generates a photorealistic,
              explorable world, running at 720p and 24 frames per second, staying coherent for
              minutes of continuous interaction. You do not watch the output. You move through it,
              and the world holds together as you go.
            </p>
            <p className="text-body-sm font-normal text-bone">
              That is a different product than video generation, even when the frames look
              similar. A video model answers the question of what a place looks like. A world
              model answers the question of what it is like to be there. For anyone who builds
              brand worlds for a living, that distinction is not academic. It is the whole job
              changing shape.
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
              A Field, Not a Fluke
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Genie 3 is the headline, but it is not alone. A wave of competing systems, Oasis,
              GameNGen, Mineworld, Matrix-Game, is demonstrating real-time open environments built
              on streaming diffusion, with physics that emerge from the model rather than from a
              hand-coded engine. Matrix-Game 3.0 adds long-horizon memory, so the world remembers
              what you did in it minutes ago.
            </p>
            <p className="text-body-sm font-normal text-bone">
              When one lab shows a trick, it is a demo. When five labs converge on the same
              capability within a year, it is a direction. Real-time world generation is now a
              direction, and the pace looks a lot like AI video did two years before it landed in
              every campaign budget.
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
              &ldquo;The render is no longer a film. It is a place. And a place asks something
              different of the people who make it.&rdquo;
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
              From Watching to Walking
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The shift underneath all of this is from passive generation to active interaction.
              Every AI video tool to date produces something an audience receives. World models
              produce something an audience inhabits. The frame stops being a window and becomes a
              door, and the audience stops being a viewer and becomes a visitor.
            </p>
            <p className="text-body-sm font-normal text-bone">
              That changes the creative brief in a fundamental way. A film has a beginning, an
              edit, and a running time you control. A place has sightlines, paths, and moments
              people find on their own. You stop authoring a sequence and start authoring a
              space, and you have to trust the visitor to walk it in an order you did not choose.
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
              We Have Been Building Worlds Already
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Our studio already builds photoreal brand worlds in Unreal Engine 5 for campaigns.
              We took SeaWorld into deep-sea cinematics and built cosmic worlds for New Era, and
              in both cases the world was the asset: art-directed, lit, and staged like a set,
              then shot for the film. World models are the next step on the same road. Today you
              art-direct a world and shoot it. Soon the audience will walk through it themselves.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The encouraging part is how much of the craft carries over. Art direction, lighting,
              staging, restraint: a generated world without those is just square footage. The
              teams who already know how to make a place feel like a brand will be the ones who
              make these models sing, the same way cinematographers made early AI video watchable.
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
              What Brands Can Do With This Now
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              The near-term uses are more practical than the demos suggest. Explorable product
              environments, where a customer wanders the world a product implies instead of
              watching a thirty-second tour of it. Virtual location scouting in minutes instead of
              weeks, generating and walking a dozen candidate settings before lunch. Live
              backdrops for virtual production, generated to the brief rather than licensed from
              a library.
            </p>
            <p className="text-body-sm font-normal text-bone">
              And the one we find most interesting: campaign microsites where the hero film
              becomes a hero place. The sixty-second spot introduces the world, and the site lets
              people step into it. The film and the place share one art direction, one grade, one
              feeling. That is a campaign architecture nobody could sell a year ago.
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
              &ldquo;Brands spent a century buying attention inside other people&rsquo;s worlds.
              The next decade is about building worlds worth visiting.&rdquo;
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
              The Honest Limits
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Now the caveats, because the demos hide them. Coherence holds for minutes, not
              hours. Resolution sits at 720p, which is fine for a laptop window and wrong for a
              stadium screen. And there is no persistent state across sessions yet: leave the
              world and come back, and it will not remember you were there.
            </p>
            <p className="text-body-sm font-normal text-bone">
              So we treat 2026 world models the way we treated early AI video: as pre-viz and
              prototype tools while the fidelity climbs. They are already good enough to scout,
              to pitch, and to prototype a place before you commit an Unreal build to it. They
              are not yet good enough to be the flagship experience. That line will move, and
              probably faster than anyone budgets for.
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
              Worlds Worth Visiting
            </h2>
            <p className="mb-6 text-body-sm font-normal text-bone">
              Step back far enough and the pattern is old. Advertising has always been a tenant,
              renting thirty seconds inside someone else&rsquo;s show, someone else&rsquo;s feed,
              someone else&rsquo;s game. World models offer brands the landlord&rsquo;s side of
              the deal for the first time at a cost that is not a theme park.
            </p>
            <p className="text-body-sm font-normal text-bone">
              The bar, though, is brutal. Nobody has to visit your world, so it has to be worth
              the trip. That is a craft problem, not a compute problem, and it is exactly the kind
              of problem our studio likes. We spent the last few years learning to build places
              people want to look at. The next few are about building places people want to stay.
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
