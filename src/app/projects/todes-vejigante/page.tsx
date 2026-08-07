"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PRISM_EASE },
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
    transition: { duration: 0.5, ease: PRISM_EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "El Ancon de Loiza & Proyecto Todes",
  industry: "Nonprofit / Cultural Preservation",
  timeline: "8 Weeks",
  services: [
    "Research & Discovery",
    "Campaign Strategy",
    "Documentary Production",
    "Photography & Exhibition",
    "Immersive Event Production",
  ],
};

const approach = [
  {
    step: "01",
    title: "Research & Cultural Immersion",
    description:
      "Embedded with the community in Loiza, Puerto Rico to understand the post-Hurricane Maria landscape: the economic pressures, the cultural erasure, and the role of vejigante mask traditions as symbols of resistance. This research became the foundation for every creative decision.",
  },
  {
    step: "02",
    title: "Campaign Strategy",
    description:
      "Developed a two-phase strategy: a documentary released through Puerto Rican artist networks and Latinx influencers to build awareness, followed by Proyecto Todes, a Miami activation amplifying LGBTQ voices within the Afro-Caribbean community. Each phase built on the last.",
  },
  {
    step: "03",
    title: "Documentary Production",
    description:
      "Produced and directed a documentary capturing the intersection of tradition, identity, and resilience in Loiza. The film centered the community's own voices and stories, distributed through social media to reach diaspora audiences.",
  },
  {
    step: "04",
    title: "Photography & Exhibition",
    description:
      "Created a portrait photography exhibition featuring 12 Afro-Caribbean subjects across diverse genders, ages, and beliefs. Subjects held machetes and labor tools; displayed against indigenous plants and Hurricane Maria debris in Miami's Wynwood arts district.",
  },
  {
    step: "05",
    title: "Immersive Event Production",
    description:
      "Produced a multi-sensory event combining video mapping installations, live bomba drumming and dance, limited edition merchandise, and mobile payment fundraising. Every element was designed to turn attendance into action.",
  },
];

const results = [
  "Spike Lee purchased original vejigante masks from the exhibition",
  "Knight Foundation provided recurring grants for continued programming",
  "El Estuario partnered to build an onsite water purification system",
  "Documentary reached diaspora audiences through artist and influencer networks",
  "Campaign established El Ancon as a cultural center for job training and preservation",
];

const tools = [
  {
    name: "Documentary Production",
    description:
      "Full production pipeline from story development and filming to editorial and distribution across social platforms.",
  },
  {
    name: "Portrait Photography",
    description:
      "Studio-quality portraiture shot on location, printed and exhibited at gallery scale in Wynwood.",
  },
  {
    name: "Video Mapping",
    description:
      "Projection mapping installations that transformed the event space into an immersive cultural experience.",
  },
  {
    name: "Social & Digital Strategy",
    description:
      "Influencer outreach, ambassador programs, and social media distribution targeting Puerto Rican and Latinx audiences.",
  },
];

/* ------------------------------------------------------------------ */
/*  Local pieces                                                       */
/* ------------------------------------------------------------------ */

/** Full-width hairline rule separating bands. */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/** Media card on the void: 15px radius, caption below in bone + fog-blue. */
function Plate({
  label,
  value,
  aspect,
  children,
}: {
  label: string;
  value: string;
  aspect?: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-[15px] border border-ash-border ${
          aspect ?? ""
        }`}
      >
        {children}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
          {label}
        </span>
        <span className="font-body text-caption font-normal text-bone">
          {value}
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TodesVejiganteProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-28 md:pt-36 pb-16 md:pb-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: PRISM_EASE }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: PRISM_EASE }}
          className="mt-14 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
        >
          Strategy + Campaign Production
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: PRISM_EASE }}
          className="mt-6 font-headline text-display-sm font-normal text-bone"
        >
          Todes
          <br />
          Vejigante
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: PRISM_EASE }}
          className="mt-6 font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          Preserving Heritage Through Story
        </m.p>

        {/* Metadata row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: PRISM_EASE }}
          className="mt-16 border-t border-ash-border pt-10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 lg:gap-24">
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Client
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Industry
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Timeline
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.timeline}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Services
              </p>
              <ul className="space-y-1">
                {overview.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-body-sm font-normal text-bone"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.div>
      </header>

      {/* ── Hero Media ────────────────────────────────────────────── */}
      <section className="section-container pb-20 md:pb-28">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: PRISM_EASE }}
          className="mx-auto max-w-[1200px]"
        >
          <Plate
            label="Photography & Exhibition"
            value="Todes Vejigante exhibition portrait"
            aspect="aspect-[16/10]"
          >
            <Image
              src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/736208c5-f9f4-49ab-9e48-3c862261dc42_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
              alt="Todes Vejigante exhibition portrait"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </Plate>
        </m.div>
      </section>

      <Rule />

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            The Story, Moving
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px]"
        >
          <Plate label="In Motion" value="Todes Vejigante">
            <AutoplayVideo
              src="/motion/todes.mp4"
              poster="/motion/todes.jpg"
              aria-label="Todes Vejigante"
              className="block w-full h-auto"
            />
          </Plate>
        </m.div>
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Challenge
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-12">
            Cultural preservation against erasure
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              In the wake of Hurricane Maria, the community of Loiza, Puerto
              Rico faced a dual threat: the physical devastation of the storm
              and the economic forces of gentrification pushing out
              generations of Afro-Caribbean cultural heritage. El Ancon de
              Loiza needed to establish itself as a community center for job
              training and cultural preservation, but first, people needed to
              care.
            </p>
            <p>
              The challenge: build a campaign that would generate awareness,
              funding, and sustained support for cultural preservation, not
              through charity messaging, but through the power and dignity of
              the culture itself. The traditional vejigante coconut masks of
              Loiza, symbols of resistance against oppression for centuries,
              became our strategic anchor.
            </p>
          </div>
        </m.div>
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            From research to resistance in five phases
          </h2>
        </m.div>

        <div className="max-w-[640px]">
          {approach.map((step, i) => (
            <m.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={
                i === 0 ? "" : "border-t border-ash-border mt-14 pt-14"
              }
            >
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {step.step}
              </p>
              <h3 className="mt-4 font-headline text-heading-sm font-normal text-bone">
                {step.title}
              </h3>
              <p className="mt-5 font-body text-body-sm font-normal text-bone">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-12">
            Culture as the campaign itself
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Rather than producing traditional fundraising content, we made the
              culture the centerpiece. The documentary gave voice to the
              community&rsquo;s own story of resilience. The portrait exhibition
              confronted audiences with the faces and tools of people fighting
              to preserve their heritage. And the immersive event, with live
              bomba drumming, video mapping, and vejigante masks on display,
              turned passive sympathy into active participation.
            </p>
            <p>
              Proyecto Todes extended the campaign into Miami, amplifying LGBTQ
              voices within the Afro-Caribbean community and broadening the
              conversation beyond disaster relief into intersectional cultural
              preservation. Every touchpoint was designed to convert attention
              into lasting support through merchandise sales, mobile payment
              donations, and social sharing by message ambassadors.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Portraits, exhibition & community
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px] space-y-14 md:space-y-20"
        >
          {/* Pair: wide + tall portrait */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <m.div variants={galleryItem} className="md:col-span-7">
              <Plate
                label="Photography & Exhibition"
                value="Todes Vejigante community portrait"
                aspect="aspect-[16/10]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5c702b8d-e939-46c9-9a51-21f7465d6b67_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Todes Vejigante community portrait"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem} className="md:col-span-5">
              <Plate
                label="Photography & Exhibition"
                value="Vejigante mask portrait"
                aspect="aspect-[3/4]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a0c12513-c551-46dc-834c-7cc8b86565cf_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Vejigante mask portrait"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Pair: campaign identity + exhibition display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <m.div variants={galleryItem} className="md:col-span-5">
              <Plate
                label="Campaign Strategy"
                value="Campaign identity"
                aspect="aspect-[4/3]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2366b306-628e-40ef-b957-49ea27e2ca94_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Campaign identity"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem} className="md:col-span-7">
              <Plate
                label="Photography & Exhibition"
                value="Exhibition display"
                aspect="aspect-[16/9]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6f6775eb-a524-4ee6-921e-55d7dd255f6c_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Exhibition display"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Pair: portrait + event production */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <Plate
                label="Photography & Exhibition"
                value="Portrait with machete and plants"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bbc241fe-1029-4a0e-9f4d-d44d4eed7c48_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Portrait with machete and plants"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem}>
              <Plate
                label="Immersive Event Production"
                value="Event production"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a7c6289a-1050-405d-a340-a793d92b29cd_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Event production"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Single: bomba drumming */}
          <m.div variants={galleryItem} className="mx-auto max-w-[720px]">
            <Plate
              label="Immersive Event Production"
              value="Bomba drumming performance"
              aspect="aspect-square"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ec3965ca-86b5-46e9-a8dd-947479c91eeb_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                alt="Bomba drumming performance"
                fill
                className="object-cover"
                unoptimized
              />
            </Plate>
          </m.div>

          {/* Pair: video mapping + merchandise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <Plate
                label="Immersive Event Production"
                value="Video mapping installation"
                aspect="aspect-[16/10]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/34c014e3-651c-47cb-ae49-3572fc351b0f_rw_1200.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Video mapping installation"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem}>
              <Plate
                label="Campaign Strategy"
                value="Merchandise and fundraising"
                aspect="aspect-[16/10]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/95bd6c52-fbb1-4b5c-b8f4-f13e8bb8ad05_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Merchandise and fundraising"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Single: full-width closing shot */}
          <m.div variants={galleryItem}>
            <Plate
              label="Documentary Production"
              value="Todes Vejigante community gathering"
              aspect="aspect-[21/9]"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7cf1295f-7c6f-4057-a833-094f979df0d3_rw_1200.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                alt="Todes Vejigante community gathering"
                fill
                className="object-cover"
                unoptimized
              />
            </Plate>
          </m.div>
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
          className="mb-14"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Real impact, lasting support
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[820px]"
        >
          <p className="font-headline text-heading-sm font-normal text-bone">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="mt-16 max-w-[640px] border-t border-ash-border">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="border-b border-ash-border py-6 font-body text-body-sm font-normal text-bone"
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            The production toolkit
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] border-t border-ash-border"
        >
          {tools.map((tool) => (
            <div key={tool.name} className="border-b border-ash-border py-8">
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {tool.name}
              </p>
              <p className="mt-3 font-body text-body-sm font-normal text-bone">
                {tool.description}
              </p>
            </div>
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
          className="max-w-[640px]"
        >
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-6">
            Have a story worth telling?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s build a campaign that turns your mission into
            movement through research, strategy, and powerful content.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/new-era-cap"
              className="btn-secondary group gap-2"
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
