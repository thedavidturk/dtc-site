"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";

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
/*  Data (authentic, scraped from source)                              */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Runway Health",
  industry: "Healthcare / Telehealth Brand",
  timeline: "Product Visualization",
  services: [
    "3D Modeling",
    "Texture Design",
    "Scene Design",
    "Rendering",
    "Packaging Design",
  ],
};

const approach = [
  {
    step: "01",
    title: "Modeling",
    description:
      "Built every product, bottle, and package from the ground up as clean, accurate 3D geometry, ready to hold up under close inspection in hero shots and detail crops alike.",
  },
  {
    step: "02",
    title: "Texture Design",
    description:
      "Created product textures in Adobe Substance Painter, dialing in labels, caps, and surface finishes so each material reads as the real thing under studio light.",
  },
  {
    step: "03",
    title: "Scene Design",
    description:
      "Composed interior, studio, and outdoor sets to frame the products in context, giving the Runway Health line a consistent, premium environment across every render.",
  },
  {
    step: "04",
    title: "Custom Packaging in Cinema4D",
    description:
      "Designed a custom box in Cinema4D, using Volume Builder and modeling to create bespoke hold positions for the pill bottles so the packaging fit the product precisely.",
  },
  {
    step: "05",
    title: "Rendering",
    description:
      "Rendered the full set of interior, studio, and outdoor scenes, delivering hero imagery and product sets ready for the runwayhealth.com brand experience.",
  },
];

const results = [
  "Full 3D product line modeled, textured, and rendered for Runway Health",
  "Custom Cinema4D packaging with bespoke hold positions for pill bottles",
  "Photoreal product textures built in Adobe Substance Painter",
  "Interior, studio, and outdoor scene sets for a consistent brand world",
  "Hero imagery delivered for the runwayhealth.com product experience",
];

const tools = [
  {
    name: "Cinema4D",
    description:
      "Primary 3D pipeline for modeling the products and the custom packaging, including Volume Builder for the bottle hold positions.",
  },
  {
    name: "Adobe Substance Painter",
    description:
      "Texture authoring for labels, caps, and surface finishes so each material reads accurately under studio lighting.",
  },
  {
    name: "Scene & Lighting Design",
    description:
      "Interior, studio, and outdoor set design that places the products in a consistent, premium environment.",
  },
  {
    name: "Render & Delivery",
    description:
      "High-resolution rendering of hero imagery and product sets, delivered for the runwayhealth.com brand.",
  },
];

/* Real scraped images, largest verified rendition per unique asset */
const interiorSet = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd",
    alt: "Runway Health interior product render",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/c00f368d-3fb0-4c0f-a0e8-8aa87cc686ea_rw_1200.png?h=d996101cef558fefd29881837cea38a2",
    alt: "Runway Health interior product render",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8ef849d8-0777-44e2-ac10-80f7f4b4f8ff_rw_1200.png?h=f0cc282cfaf09645d9ba7413c5a07c2e",
    alt: "Runway Health interior product render",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/d5fba0ec-9a3c-4f67-9d9b-95cd8e5582c1_rw_1200.png?h=37d4700000b748d7ff9f2c50f70cad1a",
    alt: "Runway Health interior product render",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1cf511c5-ce20-44a9-afd9-1b06fa97e977_rw_1200.png?h=0a895cae71842fb810deca4041e6d1d4",
    alt: "Runway Health interior product render",
  },
];

/* Studio + outdoor product designs, in page order */
const studioSet = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/61ab1215-4a25-4a8c-b8dd-be535c8138b5_rw_1920.png?h=414c217bbc144eb9d2f3eace4f642912",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7c3cd610-936c-428b-880e-cbaf4fbfc8be_rw_1920.png?h=f50cedc2f8d87ca2bae59e5d0955b3f6",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/20088b97-36f9-4184-8dc7-f9f301be4dbd_rw_1920.png?h=548d8be623e34ababb41e342e2a4cf73",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2efc22b3-9f9b-45d6-9fba-be3ecb8e7fcc_rw_1920.png?h=2b7e4e15c80ba7f4e0a032277ba969b7",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/053106dc-138d-4119-ad3b-7473de8b9bde_rw_1920.png?h=4283f5cf7ba65b771b8be2184d1920b3",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/48a1b237-fb48-49b8-beba-55b3d23c643b_rw_3840.png?h=b7a31f22c154ad79cbde52f002ea5037",
    alt: "Runway Health studio product design",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9b459fa4-2f35-4dde-9c3e-3cf89d852a3f_rw_1920.png?h=64647bb12fee204b7f68273ecdd93002",
    alt: "Runway Health outdoor product design",
  },
];

const HERO_IMG =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/03d7ad0a-3dbf-4dd9-b83f-76d251618de7_rw_1920.png?h=d582ee03e4e384f9f738156179606bea";
const TEXTURE_IMG =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e9b5e003-9898-4e0b-88e5-f29f1d2f1a5b_rw_1920.png?h=89fac9ac1936cca75284c0b018bf2774";
const BOX_IMG =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6363adb3-9ddb-490d-921a-2ad4e2d974ae_rw_1920.png?h=346de5449d39c0a32b806dbfa807b1ce";
const HERO_WIDE_1 =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4715f0c1-5db3-4b8d-90b8-c6f7c19b9cbd_rw_3840.png?h=6a6b45717d373432940f4f923830feee";
const HERO_WIDE_2 =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/150f04c1-2789-4c52-b93d-a43130f4a3d0_rw_3840.png?h=70c5bb455f325d17784a6f22dcc9ed9b";
const INTERIOR_HERO =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e11b12cc-0672-4b9c-be4d-b2502d908b75_rw_1200.png?h=a1b91baf517f210509ef94c7036b5274";

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

export default function RunwayHealthProject() {
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
          Product Design + 3D
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-8"
        >
          Runway
          <br />
          Health
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          Product Built in 3D
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
                Discipline
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
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
              src={HERO_IMG}
              alt="Runway Health 3D product render"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <PlateCaption label="Rendering" value={overview.client} />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Brief ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Brief
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Product design for runwayhealth.com
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
            Runway Health needed a complete set of product visuals for its
            online experience, built entirely in 3D rather than shot on a
            physical set. The work spanned modeling, texture design, scene
            design, and rendering, turning the brand line into clean,
            photoreal imagery that could live anywhere on the site.
          </p>
          <p>
            Every bottle, package, and surface was created from scratch and
            lit to feel like a real studio photograph. Product textures were
            created in Adobe Substance Painter, while a custom box was
            designed in Cinema4D to carry the products with precision.
          </p>
        </m.div>
      </section>

      <Rule />

      {/* ── Interior Product Render Set ───────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Interior Product Render Set
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            The line, in context
          </h2>
        </m.div>

        {/* Lead interior render card */}
        <m.figure
          variants={galleryItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1000px] mb-16"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/12] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={INTERIOR_HERO}
              alt="Runway Health interior product render set"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          </div>
          <PlateCaption label="Scene Design" value={overview.client} />
        </m.figure>

        {/* Interior set as paired cards */}
        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1000px] space-y-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {interiorSet.slice(0, 2).map((img) => (
              <m.figure key={img.src} variants={galleryItem}>
                <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption label="Scene Design" value={overview.client} />
              </m.figure>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {interiorSet.slice(2, 4).map((img) => (
              <m.figure key={img.src} variants={galleryItem}>
                <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption label="Scene Design" value={overview.client} />
              </m.figure>
            ))}
          </div>

          <m.figure variants={galleryItem} className="max-w-[600px]">
            <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={interiorSet[4].src}
                alt={interiorSet[4].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <PlateCaption label="Scene Design" value={overview.client} />
          </m.figure>
        </m.div>
      </section>

      <Rule />

      {/* ── The Process ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Process
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            From geometry to finished render
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

      {/* ── Texture + Packaging (genuine pair) ────────────────────── */}
      <section className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-start max-w-[1200px]">
          {/* Substance Painter texture */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={TEXTURE_IMG}
                alt="Runway Health product texture creation in Adobe Substance Painter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <PlateCaption
              label="Texture Design"
              value="Product texture creation in Adobe Substance Painter"
            />
          </m.figure>

          {/* Cinema4D box */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={BOX_IMG}
                alt="Runway Health custom box design created in Cinema4D"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-4">
              <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Packaging Design
              </span>
              <span className="block font-body text-caption font-normal text-bone max-w-[480px]">
                Custom box design created in Cinema4D. Volume Builder and
                modeling allowed the box to have custom hold positions for the
                pill bottles.
              </span>
            </figcaption>
          </m.figure>
        </div>
      </section>

      <Rule />

      {/* ── Hero Imagery ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Hero Imagery
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Built for the brand experience
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-16"
        >
          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[21/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={HERO_WIDE_1}
                alt="Runway Health hero product imagery"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption label="Rendering" value={overview.client} />
          </m.figure>

          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[21/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={HERO_WIDE_2}
                alt="Runway Health hero product imagery"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption label="Rendering" value={overview.client} />
          </m.figure>
        </m.div>
      </section>

      <Rule />

      {/* ── Studio + Outdoor Gallery ──────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Studio & Outdoor Product Designs
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            One product, many scenes
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-16"
        >
          {/* Full-width opening render */}
          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={studioSet[0].src}
                alt={studioSet[0].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption label="Rendering" value={overview.client} />
          </m.figure>

          {/* Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start max-w-[1000px]">
            {studioSet.slice(1, 3).map((img) => (
              <m.figure key={img.src} variants={galleryItem}>
                <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption label="Rendering" value={overview.client} />
              </m.figure>
            ))}
          </div>

          {/* Single portrait */}
          <m.figure variants={galleryItem} className="max-w-[600px]">
            <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={studioSet[3].src}
                alt={studioSet[3].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <PlateCaption label="Rendering" value={overview.client} />
          </m.figure>

          {/* Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start max-w-[1000px]">
            {studioSet.slice(4, 6).map((img) => (
              <m.figure key={img.src} variants={galleryItem}>
                <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption label="Rendering" value={overview.client} />
              </m.figure>
            ))}
          </div>

          {/* Full-width closing render */}
          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={studioSet[6].src}
                alt={studioSet[6].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption label="Rendering" value={overview.client} />
          </m.figure>
        </m.div>
      </section>

      <Rule />

      {/* ── What Was Delivered ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            What Was Delivered
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            A complete 3D product world
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

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Tools & Technology
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            The 3D pipeline
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {tools.map((tool, index) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className={`py-9 ${
                index > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-body text-heading-sm font-normal text-bone mb-3">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {tool.description}
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
            Need product visuals built in 3D?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s model, texture, and render your product into imagery that
            looks like a studio shoot, without the studio.
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
