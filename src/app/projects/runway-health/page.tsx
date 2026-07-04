"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

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
    transition: { staggerChildren: 0.1 },
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

const galleryContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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

/* Studio + outdoor product designs, full-bleed gallery */
const studioSet = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/61ab1215-4a25-4a8c-b8dd-be535c8138b5_rw_1920.png?h=414c217bbc144eb9d2f3eace4f642912",
    alt: "Runway Health studio product design",
    span: "md:col-span-12",
    ratio: "aspect-[16/9]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7c3cd610-936c-428b-880e-cbaf4fbfc8be_rw_1920.png?h=f50cedc2f8d87ca2bae59e5d0955b3f6",
    alt: "Runway Health studio product design",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/20088b97-36f9-4184-8dc7-f9f301be4dbd_rw_1920.png?h=548d8be623e34ababb41e342e2a4cf73",
    alt: "Runway Health studio product design",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2efc22b3-9f9b-45d6-9fba-be3ecb8e7fcc_rw_1920.png?h=2b7e4e15c80ba7f4e0a032277ba969b7",
    alt: "Runway Health studio product design",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/053106dc-138d-4119-ad3b-7473de8b9bde_rw_1920.png?h=4283f5cf7ba65b771b8be2184d1920b3",
    alt: "Runway Health studio product design",
    span: "md:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/48a1b237-fb48-49b8-beba-55b3d23c643b_rw_3840.png?h=b7a31f22c154ad79cbde52f002ea5037",
    alt: "Runway Health studio product design",
    span: "md:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9b459fa4-2f35-4dde-9c3e-3cf89d852a3f_rw_1920.png?h=64647bb12fee204b7f68273ecdd93002",
    alt: "Runway Health outdoor product design",
    span: "md:col-span-12",
    ratio: "aspect-[16/9]",
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
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RunwayHealthProject() {
  return (
    <article className="bg-deep-space min-h-screen" style={{ backgroundColor: "#120D1A" }}>
      {/* ── Back Link ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-24 left-6 md:left-8 lg:left-12 z-40"
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cool-gray hover:text-pure-white transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back to Work
        </Link>
      </motion.div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-end overflow-hidden">
        {/* Cover render */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Runway Health 3D product render"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Ambient color wash + dark fade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-electric-indigo/30 via-transparent to-warm-coral/10 mix-blend-screen" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/50 to-deep-space/10" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Product Design + 3D
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            RUNWAY HEALTH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Product Built in 3D
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
          />
        </div>
      </section>

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">{overview.industry}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Discipline
                </p>
                <p className="font-body text-cool-gray">{overview.timeline}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-indigo flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Challenge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
              The Brief
            </p>
            <h2 className="font-headline text-h3 font-bold mb-8">
              Product design for{" "}
              <span className="gradient-text">runwayhealth.com</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Interior Product Render Set ───────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Interior Product Render Set
          </p>
          <h2 className="font-headline text-h3 font-bold">
            The line, in <span className="text-white">context</span>
          </h2>
        </motion.div>

        {/* Lead interior render */}
        <motion.div
          variants={galleryItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6"
        >
          <div className="aspect-[4/5] sm:aspect-[16/12] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 relative group">
            <div className="relative w-full h-full">
              <Image
                src={INTERIOR_HERO}
                alt="Runway Health interior product render set"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1080px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Five-up interior grid */}
        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5"
        >
          {interiorSet.map((img, i) => (
            <motion.div
              key={img.src}
              variants={galleryItem}
              className={i === 4 ? "col-span-2 md:col-span-1" : ""}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl shadow-black/20 relative group">
                <div className="relative w-full h-full group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-electric-indigo/30 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Process / Approach ────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Process
          </p>
          <h2 className="font-headline text-h3 font-bold">
            From geometry to{" "}
            <span className="text-white">finished render</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-12"
        >
          {approach.map((item) => (
            <motion.div
              key={item.step}
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 group"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-3xl md:text-4xl font-bold text-electric-indigo/30 group-hover:text-electric-indigo transition-colors duration-500">
                  {item.step}
                </span>
              </div>
              <div className="md:col-span-11">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-pure-white mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-cool-gray leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Texture + Packaging feature ───────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Substance Painter texture */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative shadow-2xl shadow-black/30">
              <Image
                src={TEXTURE_IMG}
                alt="Runway Health product texture creation in Adobe Substance Painter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-widest uppercase text-cool-gray">
              Product texture creation in Adobe Substance Painter
            </p>
          </motion.div>

          {/* Cinema4D box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative shadow-2xl shadow-black/30">
              <Image
                src={BOX_IMG}
                alt="Runway Health custom box design created in Cinema4D"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-4 font-body text-sm text-cool-gray leading-relaxed">
              Custom box design created in Cinema4D. Volume Builder and modeling
              allowed the box to have custom hold positions for the pill bottles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Hero Imagery ──────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Hero Imagery
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Built for the <span className="text-white">brand experience</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <motion.div variants={galleryItem}>
            <div className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <Image
                src={HERO_WIDE_1}
                alt="Runway Health hero product imagery"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div variants={galleryItem}>
            <div className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <Image
                src={HERO_WIDE_2}
                alt="Runway Health hero product imagery"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Studio + Outdoor Gallery ──────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Studio & Outdoor Product Designs
          </p>
          <h2 className="font-headline text-h3 font-bold">
            One product, <span className="text-white">many scenes</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {studioSet.map((img) => (
            <motion.div key={img.src} variants={galleryItem} className={img.span}>
              <div className={`${img.ratio} rounded-2xl overflow-hidden relative group shadow-xl shadow-black/20`}>
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes={img.span.includes("12") ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                  />
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── What Was Delivered ────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            What Was Delivered
          </p>
          <h2 className="font-headline text-h3 font-bold">
            A complete <span className="text-white">3D product world</span>
          </h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {results.map((result) => (
            <motion.li
              key={result}
              variants={staggerItem}
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-electric-indigo flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-body text-soft-white text-sm md:text-base leading-relaxed">
                {result}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Tools & Technology
          </p>
          <h2 className="font-headline text-h3 font-bold">
            The <span className="text-white">3D pipeline</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-electric-indigo transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="font-body text-sm text-cool-gray leading-relaxed">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Need product visuals{" "}
            <span className="text-white">built in 3D</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s model, texture, and render your product into imagery that
            looks like a studio shoot, without the studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/el-secreto"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              View Next Project
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
