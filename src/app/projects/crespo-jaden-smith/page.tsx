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

const overview = {
  client: "CRESPO x Jaden Smith",
  industry: "Documentary / Music",
  timeline: "24-Hour Turnaround",
  services: [
    "Documentary Direction",
    "On-Site Capture",
    "Editorial & Story",
    "Motion Graphics",
    "Color & Finishing",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room Fast",
    description:
      "With a single artist and a single night to work from, the first move was to read the energy of the moment and decide what the film was really about. The story had to be found in the room, not built after the fact.",
  },
  {
    step: "02",
    title: "Capturing Behind the Stage",
    description:
      "Shot the quiet space behind the show, the prep, the waiting, and the run up to the performance, so the film lives in the moments most people never see rather than the spectacle out front.",
  },
  {
    step: "03",
    title: "Cutting Against the Clock",
    description:
      "Assembled and edited the entire piece in Adobe Premiere Pro inside a 24-hour window, shaping a tight narrative arc that holds attention from the first frame and earns its short runtime.",
  },
  {
    step: "04",
    title: "Motion & Type",
    description:
      "Built titles and motion treatments in Adobe After Effects to give the short a finished, intentional feel, framing the documentary footage without ever pulling focus from the artist.",
  },
  {
    step: "05",
    title: "Finishing the Look",
    description:
      "Graded the short toward a cinematic, low-key palette that matches the backstage mood, keeping the tone honest and the focus locked on the people and the moment.",
  },
];

const results = [
  "A documentary short directed, shot, and finished in a 24-hour window",
  "A behind the stage point of view built around the artist and the moment",
  "A tight narrative cut shaped to hold attention from the first frame",
  "Custom titles and motion treatments built in After Effects",
  "A cinematic backstage grade that keeps the focus on the people in the room",
];

const tools = [
  {
    name: "Documentary Direction",
    description:
      "On-site direction shaped around the energy of the night, finding the story in real time rather than building it after the shoot.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Full editorial assembly and pacing, cut inside a 24-hour turnaround into a tight, self-contained documentary short.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Titles and motion treatments built to give the short a finished, intentional frame around the documentary footage.",
  },
  {
    name: "Color & Finishing",
    description:
      "A cinematic, low-key grade tuned to the backstage mood, keeping skin tones honest and the focus on the moment.",
  },
];

/* Real stills scraped from the live source, in page order. */
const galleryImages = [
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f40af874-5bc9-4587-8f9d-db17859dc0d4_rw_1920.png?h=fe79d831e34b086f0a55b6e716993816",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/40b0b754-89a0-4254-a924-5425c9761dab_rw_1920.png?h=4a6a6e9979d986e37a5628436784e35e",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/dcdb144d-b709-4d61-a8a7-3b1695a51e31_rw_1920.png?h=8da75b4f72215dc39ce1cc5d54b0bbbc",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b5f74cf0-0606-4c64-85ec-959dbd378a69_rw_1920.png?h=b830c4ca048f8c6095520abc4d80866b",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/aede3c9e-26cf-4f8d-8ce1-cc4750d743f4_rw_1920.png?h=579f4afe360cddfbd2446a649a036d8c",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/261fb2a6-fd39-4e88-8e32-fcf2494b767a_rw_1920.png?h=9728dcb8f19c294d959a280083e9b552",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/dcae9971-b27b-44fe-9f3b-ce2f6fe95132_rw_1920.png?h=08be0c1a4a6705b88c5b76e72e040a9c",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/da627ede-be72-4b7a-93fa-a760e576055d_rw_1920.png?h=d2c821bd5b5a5d7f70b3890aa7b06d63",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/08a96df2-8417-486d-a9fa-5dd0ca89d1a7_rw_1920.png?h=1996286d5e63c9cb0a6594969b1ce18d",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4e4eb44c-6192-46ae-a513-225f4ccca381_rw_1920.png?h=a0068bcf308dcf78c80c95b312833879",
];

/* Editorial gallery plan: aspect + column width per still, captions below.
   The final two stills are a genuine pair and stay 2-up. */
const galleryPlan = [
  {
    src: galleryImages[0],
    alt: "Behind the Stage documentary still 1",
    discipline: "Documentary Direction",
    aspect: "aspect-[21/9]",
    width: "max-w-none",
    sizes: "100vw",
  },
  {
    src: galleryImages[1],
    alt: "Behind the Stage documentary still 2",
    discipline: "On-Site Capture",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
  {
    src: galleryImages[2],
    alt: "Behind the Stage documentary still 3",
    discipline: "Documentary Direction",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: galleryImages[3],
    alt: "Behind the Stage documentary still 4",
    discipline: "On-Site Capture",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[4],
    alt: "Behind the Stage documentary still 5",
    discipline: "On-Site Capture",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[5],
    alt: "Behind the Stage documentary still 6",
    discipline: "Color & Finishing",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[6],
    alt: "Behind the Stage documentary still 7",
    discipline: "Documentary Direction",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: galleryImages[7],
    alt: "Behind the Stage documentary still 8",
    discipline: "Editorial & Story",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
];

const galleryPair = [
  {
    src: galleryImages[8],
    alt: "Behind the Stage documentary still 9",
    discipline: "On-Site Capture",
  },
  {
    src: galleryImages[9],
    alt: "Behind the Stage documentary closing still",
    discipline: "Color & Finishing",
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

export default function CrespoJadenSmithProject() {
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
          Documentary / Music
        </m.p>

        <div className="mt-6 overflow-hidden">
          <m.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: prismEase }}
            className="font-body font-normal text-bone text-display-sm"
          >
            Behind the Stage
          </m.h1>
        </div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: prismEase }}
          className="mt-6 font-body text-body-lg font-normal text-bone"
        >
          Jaden Smith + CRESPO, a 24-Hour Docu Short
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
              Project
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Discipline
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
              src={galleryImages[0]}
              alt="Behind the Stage: Jaden Smith and CRESPO documentary still"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <PlateCaption
            label={overview.client}
            value="Behind the Stage documentary still"
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
            Behind the Stage, Moving
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
              src="/motion/crespo.mp4"
              poster="/motion/crespo.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="In Motion" value="Behind the Stage" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Film ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Film
          </p>
          <h2 className="font-body text-heading-sm font-normal text-bone">
            Press play on the documentary short
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
              src="https://www-ccv.adobe.io/v1/player/ccv/Tevy7Apn4ss/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Behind the Stage"
            />
          </div>
          <PlateCaption label="The Film" value="Behind the Stage documentary short" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Idea ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Idea"
          title="A documentary short shot and edited in 24 hours"
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
              Behind the Stage follows Jaden Smith and CRESPO away from the
              show, in the quiet space most people never see. The idea was to
              capture the moments before the moment, the prep and the waiting
              and the run up, and turn them into a self-contained film.
            </p>
            <p className="text-fog-blue">
              The challenge was time. The entire piece was shot and edited in
              24 hours in Adobe Premiere Pro and After Effects, which meant the
              story had to be found in the room and shaped on the fly without
              losing the cinematic feel the artists deserved.
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

      {/* ── The Direction ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Direction"
          title="From the room to the cut in five moves"
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

      {/* ── The Feel ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Feel"
          title="Cinematic, but honest to the moment"
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
              The short is built around presence. The camera stays close to the
              people in the room, catching the small, unguarded moments that a
              polished concert film would skip over. The aim was to make the
              backstage feel like the real story, not the warm up.
            </p>
            <p className="text-fog-blue">
              Titles and motion treatments give the piece a finished frame, while
              the grade keeps it grounded and low-key. The result is a film that
              reads as intentional and cinematic even though it was made against
              the clock, shot and edited in a single 24-hour window.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Gallery ───────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader eyebrow="Stills" title="Moments from behind the stage" />

        <div className="space-y-20 md:space-y-28">
          {galleryPlan.map((plate, i) => (
            <m.figure
              key={plate.src + i}
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

          {/* Closing pair: two matched 16/10 stills */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6"
          >
            {galleryPair.map((plate, i) => (
              <m.figure key={plate.src} variants={staggerItem}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[15px] border border-ash-border">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption
                  label={`${overview.client} / ${String(
                    galleryPlan.length + i + 1
                  ).padStart(2, "0")}`}
                  value={plate.discipline}
                />
              </m.figure>
            ))}
          </m.div>
        </div>
      </section>

      <Rule />

      {/* ── The Result ────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Result"
          title="A short that lives in the room"
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

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader eyebrow="Capabilities" title="The production toolkit" />

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
            Have a moment worth documenting?
          </h2>
          <p className="text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s capture a documentary short that finds the real story in
            the room and finishes with a cinematic, intentional feel.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/unplugged-sessions"
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
