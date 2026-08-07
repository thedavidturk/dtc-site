"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants (prism ease: slow start, decisive stop)         */
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const galleryContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Media (scraped from live portfolio, exact size + hash pairings)    */
/* ------------------------------------------------------------------ */

const img = {
  hero: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/423a265d-ea56-49bc-8bb9-0b43f67218df_rw_1920.png?h=36ae7127653cc2259f7e19a1241ae691",
  g1: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/00bc8cf7-4b26-4999-a53d-d3f4b5b10892_rw_600.png?h=9d54251d4010db31aad6541626268807",
  g2: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/37b87f49-b443-42e7-be36-3a45b331995c_rw_600.png?h=84edb0a697233ea06a5e0580ef2945bc",
  g3: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a5eb1d67-0ee9-415a-b0d6-72d11f8a6058_rw_600.png?h=ab5d7351f1c8b67de05c2e94dc3c0619",
  g4: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ade88f39-e9e0-4f99-b72f-e352f3a2596c_rw_600.png?h=530c73b26a6acf50a0b26d1aaf7d487a",
  g5: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b696d37d-504e-47cc-a2c4-70636a6df542_rw_600.png?h=69f3727fbb6766df3ca7750abc1ad6b1",
};

/* Adobe CCV experience film embed scraped from the live source. */
const videoId = "8H9NzhRvvtx";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Miami Dolphins / Ford",
  industry: "Experiential / Sports Hospitality",
  role: "Creative Director",
  services: [
    "Experiential Creative Direction",
    "Premium Hospitality Concept",
    "Spatial & Environmental Design",
    "Brand Integration",
    "On-Site Activation",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room, and the Stadium",
    description:
      "I started where the fan starts, at the threshold. The Ford Field Club lives at the edge of the field at Hard Rock Stadium, so the brief was never about decorating a lounge. It was about choreographing the moment a guest steps out of the concourse and into the most exclusive vantage point in the building. Every decision flowed from that arrival.",
  },
  {
    step: "02",
    title: "A Club That Feels Like Miami",
    description:
      "Directing the creative, I pushed the space to feel unmistakably Miami, warm, confident, a little electric, without leaning on cliche. The palette, the materials, and the light were tuned so the club reads as premium and local at once, a place that belongs to the Dolphins and to the city around them.",
  },
  {
    step: "03",
    title: "Ford as Host, Not Sponsor",
    description:
      "The challenge with any brand partner inside a sports venue is presence without intrusion. I directed the Ford integration so the brand behaves like a host rather than a logo, woven into the experience through the design language and the touchpoints guests actually use, so it earns attention instead of demanding it.",
  },
  {
    step: "04",
    title: "Designing the Field-Level Moment",
    description:
      "The payoff of the Ford Field Club is proximity. I shaped the sightlines, the flow, and the pacing so the field-level access feels like a reward that builds across the visit, from the welcome to the rail, where the game is close enough to feel in your chest.",
  },
  {
    step: "05",
    title: "Holding the Standard On-Site",
    description:
      "Premium hospitality is won or lost in execution, so I stayed close through activation, making sure the environment, the brand moments, and the service touchpoints all landed at the level the concept promised. The goal was a club that feels effortless to the guest because every detail behind it was deliberate.",
  },
];

const results = [
  "A field-level club experience designed as the most exclusive vantage point at Hard Rock Stadium",
  "A premium hospitality environment tuned to feel distinctly Miami and distinctly Dolphins",
  "Ford integrated as a host within the experience rather than as overlaid sponsorship",
  "Arrival, flow, and field access choreographed into a single rising moment",
  "A repeatable standard for environment, brand, and service held through live game-day activation",
];

const capabilities = [
  {
    name: "Experiential Direction",
    description:
      "End-to-end creative direction of the guest journey, from concourse arrival to field-level access, treated as one continuous experience.",
  },
  {
    name: "Environmental Design",
    description:
      "Spatial, material, and lighting direction that gives the club a premium, local point of view inside a large-scale venue.",
  },
  {
    name: "Brand Integration",
    description:
      "Direction of the Ford presence so the partnership reads as hospitality, woven into the touchpoints guests use rather than bolted on.",
  },
  {
    name: "On-Site Activation",
    description:
      "Hands-on oversight through game day to hold the environment, brand, and service to the standard the concept set.",
  },
];

/* ------------------------------------------------------------------ */
/*  Local helpers                                                      */
/* ------------------------------------------------------------------ */

/* Hairline band divider */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/* Caption below a media card: fog-blue uppercase label + bone value */
function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="text-caption font-normal text-bone">{value}</span>
    </figcaption>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FordFieldClubProject() {
  return (
    <article className="bg-obsidian min-h-screen text-bone">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <section className="section-container section-padding pt-36 md:pt-44">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: prismEase }}
          className="mb-14"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
          >
            <svg
              className="w-4 h-4 transition-transform duration-500 ease-prism group-hover:-translate-x-1"
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

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
          className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
        >
          Experiential Creative Direction
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-8"
        >
          Ford Field
          <br />
          Club
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          Field-Level Hospitality at Hard Rock Stadium
        </m.p>

        {/* Metadata rule row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: prismEase }}
          className="mt-16 border-t border-ash-border pt-10"
        >
          <dl className="flex flex-wrap gap-x-14 gap-y-10">
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Client
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Industry
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Role
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.role}
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
                      className="font-body text-caption font-normal text-fog-blue"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </m.div>

        {/* Hero media card */}
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
          className="mt-20"
        >
          <div className="relative w-full aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={img.hero}
              alt="Ford Field Club at Hard Rock Stadium"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <PlateCaption
            label="Ford Field Club"
            value="Hard Rock Stadium, Miami"
          />
        </m.figure>
      </section>

      <Rule />

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Gameday in Motion
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1200px]"
        >
          <div className="rounded-[15px] overflow-hidden border border-ash-border">
            <AutoplayVideo
              src="/motion/ford-field-club.mp4"
              poster="/motion/ford-field-club.jpg"
              className="w-full h-auto block"
            />
          </div>
          <PlateCaption label="In Motion" value="Ford Field Club" />
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
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Challenge
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            A premium club at the edge of the field
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] font-body text-body-sm font-normal text-bone space-y-7"
        >
          <p>
            The Ford Field Club sits in one of the most coveted positions in
            all of sports, field level at Hard Rock Stadium, home of the
            Miami Dolphins. A vantage point that exclusive carries its own
            expectation. The space could not feel like a hospitality area
            that happened to be near the action. It had to feel like the
            reason you came.
          </p>
          <p>
            As the creative director on the experience, my job was to take a
            premium club concept and a brand partnership with Ford and turn
            them into a single, coherent moment, one that felt genuinely
            Miami, genuinely Dolphins, and genuinely worth the access. The
            brand had to live inside the experience without ever talking over
            it, and every part of the journey had to build toward the field.
          </p>
        </m.div>
      </section>

      <Rule />

      {/* ── The Film ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Film
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Step inside the Ford Field Club
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1200px]"
        >
          <div className="relative w-full aspect-video rounded-[15px] overflow-hidden border border-ash-border">
            <iframe
              src={`https://www-ccv.adobe.io/v1/player/ccv/${videoId}/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View`}
              title="Ford Field Club at Hard Rock Stadium"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <PlateCaption label="Experience Film" value="Ford Field Club" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Approach ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Approach
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Directing the experience end to end
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {approach.map((step, index) => (
            <m.div
              key={step.step}
              variants={staggerItem}
              className={`py-14 ${
                index > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">
                {step.step}
              </p>
              <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
                {step.title}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {step.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Solution
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Access as the story, Ford as the host
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] font-body text-body-sm font-normal text-bone space-y-7"
        >
          <p>
            I directed the Ford Field Club as one continuous arc rather than a
            collection of features. The arrival sets the tone, the club holds
            the guest in a space that feels warm, premium, and unmistakably
            Miami, and the field-level access pays it all off. The further a
            guest moves through the experience, the closer the game gets, until
            the rail puts them right on top of the action.
          </p>
          <p>
            Ford runs through the whole thing as a host, not a billboard. I
            directed the integration so the brand shows up in the design
            language and the touchpoints guests actually use, present and
            confident without ever interrupting the moment. The result is a
            club where the partnership feels like part of the hospitality, and
            the field feels like the reward you were always headed toward.
          </p>
        </m.div>
      </section>

      <Rule />

      {/* ── The Club (gallery of media cards) ─────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Club
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Inside the Ford Field Club
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1000px] space-y-16"
        >
          {/* Pair: hospitality detail + brand integration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            <m.figure variants={galleryItem}>
              <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g1}
                  alt="Ford Field Club premium hospitality detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <PlateCaption
                label="Experiential Direction"
                value={overview.client}
              />
            </m.figure>
            <m.figure variants={galleryItem}>
              <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g2}
                  alt="Ford brand integration within the club"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <PlateCaption
                label="Brand Integration"
                value={overview.client}
              />
            </m.figure>
          </div>

          {/* Pair: environmental design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            <m.figure variants={galleryItem}>
              <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g3}
                  alt="Field-level vantage point at Hard Rock Stadium"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <PlateCaption
                label="Environmental Design"
                value={overview.client}
              />
            </m.figure>
            <m.figure variants={galleryItem}>
              <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                <Image
                  src={img.g4}
                  alt="Spatial and environmental design of the club"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <PlateCaption
                label="Environmental Design"
                value={overview.client}
              />
            </m.figure>
          </div>

          {/* Single closing card */}
          <m.figure variants={galleryItem} className="max-w-[600px]">
            <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={img.g5}
                alt="Guest hospitality touchpoint at the Ford Field Club"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <PlateCaption
              label="On-Site Activation"
              value={overview.client}
            />
          </m.figure>
        </m.div>
      </section>

      <Rule />

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            A club that earns the access
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.slice(1).map((result, index) => (
              <li
                key={result}
                className={`py-4 font-body text-body-sm font-normal text-fog-blue ${
                  index > 0 ? "border-t border-ash-border" : ""
                }`}
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Capabilities
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            The direction toolkit
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {capabilities.map((cap, index) => (
            <m.div
              key={cap.name}
              variants={staggerItem}
              className={`py-9 ${
                index > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-body text-heading-sm font-normal text-bone mb-3">
                {cap.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {cap.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[720px]"
        >
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Building an experience worth showing up for?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s direct a premium environment that turns access into a
            moment people remember, from the threshold to the main event.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/el-secreto"
              className="group inline-flex items-center gap-2 uppercase text-sm font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
            >
              View Next Project
              <svg
                className="w-4 h-4 transition-transform duration-500 ease-prism group-hover:translate-x-1"
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
