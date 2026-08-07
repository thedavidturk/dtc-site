"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import LineReveal from "@/components/LineReveal";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const prismEase = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Media (scraped, verified 200)                                      */
/* ------------------------------------------------------------------ */

const CDN =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104";

const img = {
  hero: `${CDN}/6c60eb32-ab3d-4440-9760-a51d8972b648_rw_1920.png?h=d4d4979677cb67b029b6a7d91ecdf14d`,
  identity: `${CDN}/122121c7-f690-4fa8-979b-0b63b9f89aa4_rw_1920.png?h=bb76a662ee67a634a00b4cc1238909d2`,
  g1: `${CDN}/271b41c8-becd-45ec-85db-c6e687fba714_rw_1200.png?h=412067a06fddc410320e5ae36b11238e`,
  g2: `${CDN}/6b478864-2a60-4fec-b428-b487585824a3_rw_1200.png?h=4e56c9368f031bda4394aeffec973600`,
  g3: `${CDN}/798d9196-e64c-4bfe-bf6f-a93d1bd54c58_rw_1200.png?h=c1ce51d3a348e8cdc74cdde0e2a4e9af`,
  g4: `${CDN}/c175f207-3a1d-4c6f-ac18-764323462cd7_rw_1200.png?h=63dd73019374d89ac73c4c0efd32abad`,
  g5: `${CDN}/f626950b-3460-4266-b352-7d2f75e97975_rw_1200.png?h=9ecd756c844dcfb0437757579aedc674`,
  g6: `${CDN}/1645b182-4852-4138-9438-dc377400b56a_rw_600.png?h=22c3b73b893e1fe5770d333e52b89053`,
  g7: `${CDN}/7a723c2b-f1a3-4425-83b6-3e85e6b448f6_rw_600.png?h=9373069e9cd8dfe5d5d10c218ffd1bdd`,
  g8: `${CDN}/85ff7fb9-1893-455d-91f4-be10a0db3e3b_rw_600.png?h=bfe1afaff952f2699c981f22dbff117a`,
  g9: `${CDN}/a64f7059-1bc3-4209-93f5-e491a53a1d49_rw_600.png?h=2f822fc6c4e222e2738f83ad81413e2d`,
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Pérez Art Museum Miami",
  industry: "Cultural Institution / Contemporary Art",
  timeline: "Multi-Phase Engagement",
  services: [
    "Brand & Campaign Creative",
    "Art Direction",
    "Content & Social",
    "Experiential Activation",
    "Member & Audience Growth",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room",
    description:
      "PAMM sits where Biscayne Bay meets downtown Miami, a building designed to dissolve the line between inside and outside. We started by studying how visitors actually move through it, from the hanging gardens to the galleries, so the creative could feel like the museum rather than sit on top of it.",
  },
  {
    step: "02",
    title: "A Visual System Built to Flex",
    description:
      "Contemporary art changes every season, so the identity had to hold a rotating roster of artists without flattening any of them. We built a flexible system of type, color, and layout that frames the work, gives each exhibition room to breathe, and still reads unmistakably as PAMM.",
  },
  {
    step: "03",
    title: "Campaigns Around the Work",
    description:
      "Each exhibition got its own campaign, designed to translate from a banner on the bay to a phone screen on the train. Art direction stayed in service of the artists, letting the pieces lead while the system carried the museum voice across every placement.",
  },
  {
    step: "04",
    title: "Content That Lives Online",
    description:
      "Beyond the walls, we produced social-first content that brought openings, talks, and behind-the-scenes moments to a Miami audience that lives on its phone. The goal was simple: make people who had never thought of themselves as museum people feel like PAMM was theirs.",
  },
  {
    step: "05",
    title: "Showing Up in the City",
    description:
      "We extended the brand into the physical city through experiential touchpoints and activations timed to Miami's cultural calendar, turning the museum into a participant in the scene rather than a destination people visited once.",
  },
];

const tools = [
  {
    name: "Brand Systems",
    description:
      "A flexible identity system designed to frame a constantly rotating program of contemporary artists without losing the museum's own voice.",
  },
  {
    name: "Art Direction",
    description:
      "Exhibition-led art direction that keeps the artwork in the lead role while carrying a consistent institutional look across every channel.",
  },
  {
    name: "Social & Content",
    description:
      "Social-first content built for a young, mobile Miami audience, turning openings and programming into shareable cultural moments.",
  },
  {
    name: "Experiential",
    description:
      "Activations and physical touchpoints that bring the brand off the bay and into the streets, events, and conversations of the city.",
  },
];

/* ------------------------------------------------------------------ */
/*  Local pieces                                                       */
/* ------------------------------------------------------------------ */

/** Full-width hairline rule between bands. */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/** Uppercase fog-blue metadata label. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
      {children}
    </p>
  );
}

/** Caption below a media card: fog-blue label + bone value. */
function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="font-body text-caption font-normal text-bone">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PammProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-24">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: prismEase }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back to Work
          </Link>
        </m.div>

        <div className="mt-16 md:mt-24">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
            className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
          >
            Cultural Branding + Content
          </m.p>

          <h1 className="font-headline font-normal text-bone text-display-sm">
            <LineReveal delay={0.25}>PÉREZ ART MUSEUM</LineReveal>
            <LineReveal delay={0.35}>MIAMI</LineReveal>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: prismEase }}
            className="mt-8 font-body text-body-lg font-normal text-bone"
          >
            A Museum That Feels Like Miami
          </m.p>
        </div>

        {/* Metadata row */}
        <m.dl
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="mt-16 md:mt-24 border-t border-ash-border pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Client
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Industry
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.industry}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Engagement
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.timeline}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Services
            </dt>
            <dd>
              <ul className="space-y-1.5">
                {overview.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-caption font-normal text-bone"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </m.dl>

        {/* Hero media card */}
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-24"
        >
          <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={img.hero}
              alt="Pérez Art Museum Miami creative campaign"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <figcaption>
            <PlateCaption
              label="Pérez Art Museum Miami"
              value="Creative campaign"
            />
          </figcaption>
        </m.figure>
      </header>

      <Rule />

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <Label>In Motion</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            The Identity, Moving
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="rounded-[15px] overflow-hidden border border-ash-border">
            <AutoplayVideo
              src="/motion/pamm.mp4"
              poster="/motion/pamm.jpg"
              aria-label="PAMM"
              className="w-full aspect-video object-cover"
            />
          </div>
          <figcaption>
            <PlateCaption label="In Motion" value="PAMM" />
          </figcaption>
        </m.figure>
      </section>

      <Rule />

      {/* ── The Challenge ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Challenge</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            Make a world-class museum feel like it belongs to Miami
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Pérez Art Museum Miami is one of the most architecturally
              striking contemporary art institutions in the country, perched on
              Biscayne Bay with hanging gardens and open-air galleries that
              blur the boundary between the building and the bay. The challenge
              was never the art or the architecture. It was perception.
            </p>
            <p>
              Plenty of Miamians still saw a museum as something formal,
              expensive, and a little intimidating, a place for tourists and
              collectors rather than locals. The brief was to keep PAMM
              unmistakably world-class while making it feel open, current, and
              genuinely of the city, so a young, diverse, mobile audience would
              see it as their museum.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Identity Feature ──────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={img.identity}
              alt="PAMM brand identity system"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
          <figcaption>
            <PlateCaption
              label="Brand & Campaign Creative"
              value={overview.client}
            />
          </figcaption>
        </m.figure>
      </section>

      <Rule />

      {/* ── Our Approach ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Our Approach</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            From the bay to the feed
          </h2>
        </m.div>

        <ol className="max-w-[720px]">
          {approach.map((item, i) => (
            <m.li
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-12 md:py-16 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <span
                  aria-hidden="true"
                  className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue shrink-0 pt-2"
                >
                  {item.step}
                </span>
                <div className="max-w-[640px]">
                  <h3 className="font-headline text-heading-sm font-normal text-bone mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm font-normal text-fog-blue">
                    {item.description}
                  </p>
                </div>
              </div>
            </m.li>
          ))}
        </ol>
      </section>

      <Rule />

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Solution</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            Let the art lead, let the city in
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              We built a brand system flexible enough to frame a constantly
              changing program of contemporary artists without ever competing
              with the work. Type, color, and layout were designed to step back
              and let each exhibition speak, while a consistent institutional
              voice held everything together from a bayfront banner to a
              fifteen-second story.
            </p>
            <p>
              Around that system we produced campaigns and social-first content
              tuned to how Miami actually lives, fast, visual, and mobile. The
              point was to take the energy already inside the museum, the
              openings, the talks, the architecture at golden hour, and push it
              out into the city so that people who never pictured themselves at a
              museum started to feel like PAMM was made for them too.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Selected Work</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            Identity, campaigns & content
          </h2>
        </m.div>

        <div className="space-y-16 md:space-y-24">
          {/* Wide exhibition campaign */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative aspect-[16/10] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g1}
                alt="PAMM exhibition campaign"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <figcaption>
              <PlateCaption label="Art Direction" value="Exhibition campaign" />
            </figcaption>
          </m.figure>

          {/* Portrait key art, narrow */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-[600px]"
          >
            <div className="relative aspect-[3/4] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g6}
                alt="PAMM campaign key art"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <figcaption>
              <PlateCaption
                label="Brand & Campaign Creative"
                value="Campaign key art"
              />
            </figcaption>
          </m.figure>

          {/* Brand application */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g2}
                alt="PAMM brand application"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <figcaption>
              <PlateCaption
                label="Brand & Campaign Creative"
                value="Brand application"
              />
            </figcaption>
          </m.figure>

          {/* Social content, wide */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g3}
                alt="PAMM social content"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <figcaption>
              <PlateCaption label="Content & Social" value="Social content" />
            </figcaption>
          </m.figure>

          {/* Content details: genuine pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <m.figure
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="relative aspect-square rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g7}
                  alt="PAMM content detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <PlateCaption label="Content & Social" value="Content detail" />
              </figcaption>
            </m.figure>

            <m.figure
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="relative aspect-square rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g8}
                  alt="PAMM content detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <PlateCaption label="Content & Social" value="Content detail" />
              </figcaption>
            </m.figure>
          </div>

          {/* Third content detail, narrow */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-[600px]"
          >
            <div className="relative aspect-square rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g9}
                alt="PAMM content detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <figcaption>
              <PlateCaption label="Content & Social" value="Content detail" />
            </figcaption>
          </m.figure>

          {/* Campaign system: genuine pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <m.figure
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="relative aspect-[16/10] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g4}
                  alt="PAMM campaign system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <PlateCaption
                  label="Brand & Campaign Creative"
                  value="Campaign system"
                />
              </figcaption>
            </m.figure>

            <m.figure
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="relative aspect-[16/10] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g5}
                  alt="PAMM campaign system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <PlateCaption label="Art Direction" value="Campaign system" />
              </figcaption>
            </m.figure>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Capabilities</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            The creative toolkit
          </h2>
        </m.div>

        <div className="max-w-[720px]">
          {tools.map((tool, i) => (
            <m.div
              key={tool.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-10 md:py-12 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-headline text-heading-sm font-normal text-bone mb-3">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {tool.description}
              </p>
            </m.div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-6">
            Have a brand worth showing off?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-12">
            Let&rsquo;s build a creative system that frames your work, reaches
            your city, and still feels like you across every screen and street.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/el-secreto"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
            >
              View Next Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </m.div>
      </section>
    </article>
  );
}
