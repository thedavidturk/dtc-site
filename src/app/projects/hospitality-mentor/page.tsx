"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HERO_IMAGE =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/11572f8d-b70b-47ba-857e-2dd19d334b74_rw_3840.jpg?h=84b8fa267a6fdcd69f46f4e02e2158db";

const overview = {
  client: "The Hospitality Mentor",
  industry: "TV / Hospitality",
  timeline: "Documentary Episode",
  services: [
    "Cinematic Video Production",
    "Documentary-Style Direction",
    "Shot on Canon C70 in 4K",
    "Editorial in Premiere Pro",
    "Motion Graphics & VFX",
  ],
};

const approach = [
  {
    step: "01",
    title: "Shot on the Canon C70 in 4K",
    description:
      "We captured the entire episode on the Canon C70 in 4K, giving the Fontainebleau the dynamic range and detail it deserves. Every space, from the grand lobby to the quiet corners, was framed to honor a hotel that has been creating memories since 1954.",
  },
  {
    step: "02",
    title: "Documentary Direction",
    description:
      "We wanted to shine a light on the hard-working people and beautiful places that make hospitality such a magical industry. The episode follows The Hospitality Mentor on a journey through the property, letting the characters and the location tell the story.",
  },
  {
    step: "03",
    title: "Edited in Premiere Pro and After Effects",
    description:
      "The episode was edited in Adobe Premiere Pro and finished with motion graphics and visual effects in Adobe After Effects, shaping the lead character frames and location frames into a cohesive, broadcast-ready narrative.",
  },
  {
    step: "04",
    title: "Audio Mixed in Adobe Audition",
    description:
      "Audio was mixed in Adobe Audition to bring clarity to the interviews and warmth to the ambient sound of the hotel, so the atmosphere of the Fontainebleau comes through as vividly as the picture.",
  },
];

const results = [
  "An episode that celebrates the people and places behind great hospitality",
  "A look inside the Fontainebleau Miami Beach, a hotel creating memories since 1954",
  "Lead character frames and location frames woven into one cohesive story",
  "4K capture on the Canon C70 finished with motion graphics and VFX",
  "Documentary authenticity paired with cinematic, broadcast-ready polish",
];

const tools = [
  {
    name: "Canon C70",
    description:
      "Cinema camera used to capture the entire episode in 4K, delivering high dynamic range across the hotel's varied lighting.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, narrative structuring, and pacing for the lead character and location frames.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Motion graphics, visual effects, and titling that reinforce the premium, documentary feel.",
  },
  {
    name: "Adobe Audition",
    description:
      "Audio mixing for interviews and ambient sound, bringing warmth and clarity to the final cut.",
  },
];

/* Editorial gallery plan: aspect + column width per still, captions below. */
const galleryPlan = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/36260dbf-5542-4beb-8e58-8c29508d31f1_rw_3840.jpg?h=e4c0a60847058ccefbf7b4d46fd543e2",
    alt: "Fontainebleau Miami Beach cinematic still 1",
    discipline: "Cinematic Video Production",
    aspect: "aspect-[21/9]",
    width: "max-w-none",
    sizes: "100vw",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5c769b0c-465e-4b2f-85c6-cc7b98778c49_rw_3840.jpg?h=cdb8228ade21e66f1affc343d0ef322d",
    alt: "Fontainebleau Miami Beach cinematic still 2",
    discipline: "Shot on Canon C70 in 4K",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/691f76f8-a588-432b-ab11-065ec59b0a0b_rw_3840.jpg?h=ae9e2554c37a6c9afe2f55d02d2792cc",
    alt: "Fontainebleau Miami Beach cinematic still 3",
    discipline: "Documentary-Style Direction",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8c7398dd-4282-4ddc-873d-521dcee46d76_rw_3840.jpg?h=19fe9f7b33bc81864b8810735dc77586",
    alt: "Fontainebleau Miami Beach cinematic still 4",
    discipline: "Cinematic Video Production",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a320897b-6515-41fc-b406-6c19c703b083_rw_3840.jpg?h=822959a337e879c542ed3a40a347e19c",
    alt: "Fontainebleau Miami Beach cinematic still 5",
    discipline: "Documentary-Style Direction",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8564b4c1-291a-41ae-9a83-59135b9956ab_rw_3840.jpg?h=c2fccdb5a76147d85f2609b266b1fd82",
    alt: "Fontainebleau Miami Beach cinematic still 6",
    discipline: "Shot on Canon C70 in 4K",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7c7fb05d-78bb-43a8-82c3-4a1a5cc7f5fb_rw_3840.jpg?h=a392d944f5e60d6642c9185cae426438",
    alt: "Fontainebleau Miami Beach cinematic still 7",
    discipline: "Documentary-Style Direction",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e9c164e4-0e05-4ab3-a9f1-8b183a0b9677_rw_3840.jpg?h=3a6711cbe9f04febe3b9d25c311e64e4",
    alt: "Fontainebleau Miami Beach cinematic still 8",
    discipline: "Editorial in Premiere Pro",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/026b1245-42eb-4ad3-a850-f245624bcd44_rw_3840.jpg?h=a300b5c31fec6bae40aa6a3d7874c3b9",
    alt: "Fontainebleau Miami Beach cinematic closing still",
    discipline: "Cinematic Video Production",
    aspect: "aspect-[21/9]",
    width: "max-w-none",
    sizes: "100vw",
  },
];

/* ------------------------------------------------------------------ */
/*  Local Prism Pieces                                                 */
/* ------------------------------------------------------------------ */

function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4">
      <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="mt-1 block font-body text-body-sm font-normal text-bone">
        {value}
      </span>
    </figcaption>
  );
}

function Rule() {
  return <div aria-hidden="true" className="border-t border-ash-border" />;
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14"
    >
      <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
        {eyebrow}
      </p>
      <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
        {title}
      </h2>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HospitalityMentorProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-36 pb-16 md:pt-44 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
          className="mt-14 text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue"
        >
          The Hospitality Mentor / TV Episode
        </m.p>

        <div className="mt-6 overflow-hidden">
          <m.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: prismEase }}
            className="font-body font-normal text-bone text-display-sm"
          >
            The Fontainebleau
          </m.h1>
        </div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: prismEase }}
          className="mt-6 font-body text-body-lg font-normal text-bone"
        >
          A Look Inside the Iconic Hotel
        </m.p>

        {/* Metadata row */}
        <m.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: prismEase }}
          className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-10 border-b border-ash-border pb-8"
        >
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Client
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Category
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.industry}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Format
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.timeline}
            </dd>
          </div>
        </m.dl>
      </header>

      {/* ── Hero Media Card ───────────────────────────────────────── */}
      <section className="section-container pb-24 md:pb-36">
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full"
        >
          <div className="relative aspect-[21/9] overflow-hidden rounded-[15px] border border-ash-border">
            <Image
              src={HERO_IMAGE}
              alt="Inside the Fontainebleau Miami Beach"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <PlateCaption
            label={overview.client}
            value="Inside the Fontainebleau Miami Beach"
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
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-sm font-normal text-bone">
            The Fontainebleau in Motion
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full max-w-[980px]"
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/hospitality.mp4"
              poster="/motion/hospitality.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="In Motion" value="Fontainebleau" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Episode ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Episode
          </p>
          <h2 className="font-body text-heading-sm font-normal text-bone">
            A Look Inside the Iconic Fontainebleau
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full"
        >
          <div className="relative w-full overflow-hidden rounded-[15px] border border-ash-border aspect-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/7x0nV-e70Wc?rel=0&modestbranding=1"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="The Hospitality Mentor"
            />
          </div>
          <PlateCaption
            label="The Episode"
            value="The Hospitality Mentor at the Fontainebleau"
          />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Story ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Story"
          title="The people and places behind the magic"
        />

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <div className="text-body-sm font-normal space-y-7">
            <p className="text-bone">
              We wanted to shine a light on the hard-working people and
              beautiful places that make hospitality such a magical industry.
              In this episode of The Hospitality Mentor, we feature the
              Fontainebleau Miami Beach Hotel.
            </p>
            <p className="text-fog-blue">
              This hotel is a special place. It has been creating lifelong
              memories for guests since it opened in 1954. Come on a journey
              with The Hospitality Mentor as we learn about what makes this
              hotel so magical.
            </p>
          </div>
        </m.div>

        {/* Services */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] mt-20"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
            Services
          </p>
          <ul>
            {overview.services.map((service) => (
              <m.li
                key={service}
                variants={staggerItem}
                className="border-b border-ash-border py-4 font-body text-body-lg font-normal text-bone"
              >
                {service}
              </m.li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Our Approach ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="Our Approach"
          title="From the lobby to the final cut"
        />

        <div className="max-w-[900px]">
          {approach.map((item) => (
            <m.div
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-10 border-t border-ash-border py-12"
            >
              <span
                aria-hidden="true"
                className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue"
              >
                Step {item.step}
              </span>
              <div>
                <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
                  {item.title}
                </h3>
                <p className="max-w-[640px] text-body-sm font-normal text-bone">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── Character & Location Frames ───────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader eyebrow="Frames" title="Character & Location Frames" />

        <div className="space-y-20 md:space-y-28">
          {galleryPlan.map((plate, i) => (
            <m.figure
              key={plate.src}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`w-full ${plate.width}`}
            >
              <div
                className={`relative ${plate.aspect} overflow-hidden rounded-[15px] border border-ash-border`}
              >
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  className="object-cover"
                  sizes={plate.sizes}
                />
              </div>
              <PlateCaption
                label={`${overview.client} / ${String(i + 1).padStart(2, "0")}`}
                value={plate.discipline}
              />
            </m.figure>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── The Result ────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Result"
          title="A magical hotel, captured in 4K"
        />

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-12">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="border-t border-ash-border py-5 text-body-sm font-normal text-bone"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="Tools & Technology"
          title="The production stack"
        />

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="border-t border-ash-border py-8"
            >
              <h3 className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                {tool.name}
              </h3>
              <p className="max-w-[640px] text-body-sm font-normal text-bone">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[720px]"
        >
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Ready to tell your story cinematically?
          </h2>
          <p className="text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s create premium video content that captures the soul of
            your brand and commands attention.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/el-secreto"
              className="btn-secondary group inline-flex items-center gap-2"
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
