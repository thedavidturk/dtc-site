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
  client: "Ford (Mustang Mach-E)",
  industry: "Automotive / Social Media",
  role: "Designer & Animator",
  services: [
    "Concept & Art Direction",
    "Hi-Res Key Visuals",
    "3D Design (Cinema 4D)",
    "4K Motion Animation",
    "Social Media Delivery",
  ],
};

/* Real hi-res renditions scraped from the source case study.          */
/* Each URL keeps the exact hash so the CDN serves it (wrong hash 403). */
const heroImage =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ce534a9b-9d7b-4edd-bce4-c281dd58da7b_rw_1920.png?h=d58ba796f9778a2423288a3ad29e8a38";

const galleryImages = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e99154f1-4ec2-42c3-8161-f5d61dc7efed_rw_3840.jpg?h=12d2746f516b788b3bf32a1371d2f5da",
    alt: "Ford Mustang Mach-E hero key visual",
    aspect: "21/9",
    discipline: "Hi-Res Key Visuals",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fcf6296b-216c-429f-b8fc-4ada80f68dfc_rw_3840.jpg?h=9d25b37ccabacab16672b34557c312a4",
    alt: "Ford Mustang Mach-E rendered three quarter view",
    aspect: "16/10",
    discipline: "3D Design (Cinema 4D)",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b9902159-050d-4e1f-a691-35165cf456ba_rw_3840.jpg?h=ea86ac1cce2b7d16732f4aea590402e7",
    alt: "Ford Mustang Mach-E detail composition",
    aspect: "3/4",
    discipline: "Concept & Art Direction",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/143dcbf7-583c-47b6-92d4-bdd1bbf8173d_rw_3840.jpg?h=eb89949a5d83ab26d8665d77524d50e7",
    alt: "Ford Mustang Mach-E lighting study",
    aspect: "4/3",
    discipline: "3D Design (Cinema 4D)",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2c0d78b8-991d-46ca-8dfd-7cc0a4b0e7aa_rw_3840.jpg?h=4defce8940261e93c0bdfd9f8d010291",
    alt: "Ford Mustang Mach-E rendered profile",
    aspect: "4/3",
    discipline: "Hi-Res Key Visuals",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bbf6a1f7-2b68-4bd1-a519-4fef713a2cbf_rw_1920.png?h=60f9bbfa8172959bd001998034ef16e2",
    alt: "Ford Mustang Mach-E social frame",
    aspect: "4/3",
    discipline: "Social Media Delivery",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/da3d77ca-1e4b-4f7e-b3cb-7b0e58cf2210_rw_1920.png?h=4f041b47252b875962082d62685b2730",
    alt: "Ford Mustang Mach-E animation still",
    aspect: "21/9",
    discipline: "4K Motion Animation",
  },
];

/* Static class lookup so Tailwind sees the literal aspect utilities.  */
const aspectClass: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
};

const approach = [
  {
    step: "01",
    title: "Hi-Res Imagery as the Foundation",
    description:
      "Started from high resolution imagery of the Mustang Mach-E, treating each frame as a finished key visual rather than a screenshot. Sharp detail, clean reflections, and considered composition gave the social assets a print-quality look the moment they landed in the feed.",
  },
  {
    step: "02",
    title: "Built and Lit in Cinema 4D",
    description:
      "Designed and staged the scenes in Cinema 4D, sculpting light, materials, and camera moves around the vehicle. Working in 3D meant total control over angle, surface, and pacing, so the car could be presented exactly the way the brand needed across every cut.",
  },
  {
    step: "03",
    title: "Animated in 4K with After Effects",
    description:
      "Brought the stills to life with 4K animations finished in Adobe After Effects. Type, transitions, and motion graphics were layered over the renders to give the spots energy and rhythm while keeping the focus on the car.",
  },
  {
    step: "04",
    title: "Cut for Social, Built for the Brand",
    description:
      "Delivered the work formatted for social media feeds, where the first second has to earn the scroll. The result follows a simple equation the client signed off on. Hi-res imagery plus 4K animations equals a happy client.",
  },
];

const results = [
  "Hi-res imagery elevated into finished, feed-ready key visuals",
  "Full 3D control of angle, light, and surface in Cinema 4D",
  "Smooth 4K animations finished in Adobe After Effects",
  "Motion graphics that add energy without burying the car",
  "Social-first delivery tuned to stop the scroll",
];

const tools = [
  {
    name: "Cinema 4D",
    description:
      "3D design, scene staging, lighting, and camera work for every rendered frame of the Mustang Mach-E.",
  },
  {
    name: "Adobe After Effects",
    description:
      "4K animation, motion graphics, transitions, and type to bring the stills into motion.",
  },
  {
    name: "Hi-Res Pipeline",
    description:
      "High resolution capture and rendering so each asset reads as a finished key visual, not a frame grab.",
  },
  {
    name: "Social Delivery",
    description:
      "Output formatted and paced for social media feeds where the first second has to earn the scroll.",
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

/** Gallery plate bound to a galleryImages entry. */
function GalleryPlate({ index }: { index: number }) {
  const img = galleryImages[index];
  return (
    <Plate label={img.discipline} value={img.alt} aspect={aspectClass[img.aspect]}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 1200px"
        className="object-cover"
      />
    </Plate>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FordMustangMachEProject() {
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
          Automotive / Social Media
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: PRISM_EASE }}
          className="mt-6 font-headline text-display-sm font-normal text-bone"
        >
          Rebuilding
          <br />
          a Classic
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: PRISM_EASE }}
          className="mt-6 font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          Ford Mustang Mach-E
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
                Role
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.role}
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
            label="Hi-Res Key Visuals"
            value="Ford Mustang Mach-E key visual"
            aspect="aspect-[16/10]"
          >
            <Image
              src={heroImage}
              alt="Ford Mustang Mach-E key visual"
              fill
              priority
              sizes="100vw"
              className="object-cover"
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
            Rebuilt in Motion
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px]"
        >
          <Plate label="In Motion" value="Mustang Mach-E">
            <AutoplayVideo
              src="/motion/ford-mustang.mp4"
              poster="/motion/ford-mustang.jpg"
              aria-label="Mustang Mach-E"
              className="block w-full h-auto"
            />
          </Plate>
        </m.div>
      </section>

      <Rule />

      {/* ── The Brief ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Brief
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-12">
            A muscle-car icon, reborn for the feed
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              The Mustang Mach-E is Ford taking the most loaded name in its
              history and putting it on something electric. For social, that
              story had to land in seconds, with imagery that felt as crafted
              and premium as the car itself.
            </p>
            <p>
              The approach was direct. Build the vehicle in 3D, light it like
              a hero, and animate it in 4K so every frame reads as a finished
              key visual rather than a screen grab. Hi-res imagery plus 4K
              animations, designed and animated in Cinema 4D and Adobe After
              Effects, with one goal at the end of it. A happy client.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── The Animation ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Animation
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Hi-res imagery, brought to life in 4K
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px]"
        >
          <figure>
            <div className="relative overflow-hidden rounded-[15px] border border-ash-border">
              {/* 16:9 responsive embed (Adobe CCV player from the source case study) */}
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www-ccv.adobe.io/v1/player/ccv/V3B-d9Ww-Nr/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
                  title="Rebuilding a Classic: Ford Mustang Mach-E"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                4K Motion Animation
              </span>
              <span className="font-body text-caption font-normal text-bone">
                Rebuilding a Classic: Ford Mustang Mach-E
              </span>
            </figcaption>
          </figure>
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
            From render to feed in four moves
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

      {/* ── Key Visuals Gallery ──────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Key Visuals
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Every frame, a finished piece
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px] space-y-14 md:space-y-20"
        >
          {/* Single: full-width hero key visual */}
          <m.div variants={galleryItem}>
            <GalleryPlate index={0} />
          </m.div>

          {/* Pair: three quarter view + detail composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <m.div variants={galleryItem} className="md:col-span-7">
              <GalleryPlate index={1} />
            </m.div>
            <m.div variants={galleryItem} className="md:col-span-5">
              <GalleryPlate index={2} />
            </m.div>
          </div>

          {/* Pair: lighting study + rendered profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <GalleryPlate index={3} />
            </m.div>
            <m.div variants={galleryItem}>
              <GalleryPlate index={4} />
            </m.div>
          </div>

          {/* Single: social frame */}
          <m.div variants={galleryItem} className="mx-auto max-w-[900px]">
            <GalleryPlate index={5} />
          </m.div>

          {/* Single: full-width animation still */}
          <m.div variants={galleryItem}>
            <GalleryPlate index={6} />
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
            Premium imagery, built for social
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

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Tools &amp; Technology
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            The production stack
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
            Have an icon to reinvent?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s build imagery and motion that makes your brand impossible
            to scroll past.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link href="/#projects" className="btn-secondary group gap-2">
              View More Work
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
