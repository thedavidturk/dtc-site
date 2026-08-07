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
    transition: { staggerChildren: 0.12 },
  },
};

const galleryItem = {
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
  client: "New Era Cap",
  industry: "Fashion / Headwear",
  scope: "4 Campaigns",
  services: [
    "Research & Discovery",
    "Creative Strategy",
    "3D Animation & Sequencing",
    "Post-Production & VFX",
    "Multi-Platform Delivery",
  ],
};

const campaigns = [
  {
    id: "out-of-this-world",
    title: "Out of This World",
    subtitle: "Space-themed collection campaign",
    description:
      "A cinematic campaign that placed New Era's space-themed caps inside immersive cosmic environments. We built entire planets, star fields, and galaxies in 3D, then wove the product into each world so the audience could feel the wonder of space exploration, not just see a hat in front of it.",
    discipline: "3D Animation & Sequencing",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6a9909de-e004-4637-b305-03c7c3afc105_rw_1920.png?h=0d2513de6a3d5442c9276b98ca32ddb3", alt: "Cosmic hero shot", aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9ec30c8f-1df0-44b6-beb6-4574f6a913b4_rw_1920.png?h=eeb922659707c7884cabc10a61293320", alt: "Planet environment", aspect: "aspect-[3/4]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cc3a4fbe-4ca6-4d60-bca6-51799a85db47_rw_1920.png?h=441fe9462b246273ed82dd6f83b66778", alt: "Star field product shot", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cb41ea3b-ac5a-4a74-8885-3a71b4a98a0c_rw_1920.png?h=18dd0e4e6a38f61470aa5c22c2946a1a", alt: "Galaxy campaign visual", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/640046cb-6deb-42c6-8f45-85daed849b04_rw_1920.png?h=9d2436cf80cf1291ef946d98bf298c79", alt: "Cosmic cap close-up", aspect: "aspect-[16/9]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f2556d88-e571-40ba-a976-5a4d51c6a6eb_rw_1920.png?h=12bfdb634517cd415cb4f17ec9361e37", alt: "Space environment detail", aspect: "aspect-square", span: "md:col-span-5" },
    ],
  },
  {
    id: "sprouted",
    title: "Sprouted Collection",
    subtitle: "Nature-inspired foliage campaign",
    description:
      "A nature-inspired campaign bringing New Era's foliage-themed hat collection to life through immersive 3D environments. We built lush forests, mushroom hilltops, and overgrown cityscapes, grounding each cap in a world that felt as organic and alive as the designs themselves.",
    discipline: "3D Animation & Sequencing",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9093a3b0-956b-49e3-a039-06897868e553_rw_1200.png?h=bf736fd7c3636fa8eedc8a44dd910bcd", alt: "Forest environment hero", aspect: "aspect-[16/10]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/81c15846-3edc-43b1-bd8c-21a7cae08637_rw_1200.png?h=c8ff17d05d3e9612c76960bd7b9a7f4c", alt: "Mushroom hilltop scene", aspect: "aspect-[16/10]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4cbd526d-9906-447f-91d0-5c6e59f609e8_rw_1200.png?h=0cc9df9997bca5886ff834d500818b09", alt: "Overgrown cityscape", aspect: "aspect-[4/3]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4d442495-867e-4cb8-893d-324b0d8b7891_rw_1200.png?h=c7e466457f34bb51662ca58b05450614", alt: "Product in nature", aspect: "aspect-[4/3]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2e0e99b6-fca3-46e9-ac63-c8c03e8b1293_rw_1920.png?h=1dfc1086152293dc45601cb3ab9b8dc3", alt: "Foliage cap detail", aspect: "aspect-[16/9]", span: "md:col-span-12" },
    ],
  },
  {
    id: "elements",
    title: "Elements",
    subtitle: "Earth, Fire, Air & Water 3D animation",
    description:
      "Immersive elemental environments built to showcase New Era's Elements collection. Each hat was reconstructed through photogrammetry and placed inside its own world: volcanic landscapes for Fire, underwater caverns for Water, windswept peaks for Air, and ancient forests for Earth.",
    discipline: "3D Animation & Sequencing",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc84ed39-2bc9-411a-8290-6f0cc5b43df2_rw_3840.png?h=ccf4884ee6b1129fa7a3eecd9ddb11f9", alt: "Elements hero shot", aspect: "aspect-[21/9]", span: "md:col-span-12" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5320bf72-8ee0-4db5-baec-efa352e93988_rw_3840.png?h=0a6bf09111cac68772eec801db975fd5", alt: "Fire element world", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6f3db669-3a2f-4529-b2bb-8ab286f37bfe_rw_3840.png?h=a1e1e912dc0671a55cc143d02cf4888b", alt: "Water element world", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ab23358c-183c-40a9-a20d-47805b1c8a1b_rw_3840.png?h=0d3ff6176f94da406a941bf52c2e10e2", alt: "Air element world", aspect: "aspect-[4/3]", span: "md:col-span-4" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/25bbc284-4291-46d4-8d96-e04f76ddcace_rw_1200.png?h=6064da262bda1da39f13bc149324cc1f", alt: "Earth element world", aspect: "aspect-[4/3]", span: "md:col-span-4" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/70ac1f4f-322c-46ab-a6c9-d88e19efbef6_rw_1200.png?h=d6b030c01cd6de104c8e502386b61df8", alt: "Elements product detail", aspect: "aspect-[4/3]", span: "md:col-span-4" },
    ],
  },
  {
    id: "holiday-2023",
    title: "Holiday 2023",
    subtitle: "Festive VFX campaign",
    description:
      "A festive opening sequence featuring a single brownstone on a snowy city block, built entirely in 3D. We captured the essence of a cozy holiday night with warm glowing windows, falling snow, and dynamic camera movement, delivering high-end production value without a single location shoot.",
    discipline: "Post-Production & VFX",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f5254e37-7c30-48ac-9a2c-cf4191fa8719_rw_3840.png?h=6bcd777da7c646bb14244acd5c429f4d", alt: "Holiday brownstone hero", aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc9ba708-0c5a-4b56-ae4a-269322f2a34b_rw_3840.png?h=3cc752b80414e61c042eed64e1b8eeaa", alt: "Snowy street scene", aspect: "aspect-[3/4]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1efa6945-881d-43fb-b59f-4c7456626f82_rw_3840.png?h=12069a14eac4b52fa136db33c2878e2e", alt: "Holiday environment detail", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/720cfec1-6be7-4eca-9c29-f4e355526930_rw_1920.png?h=f4b28d19628f8f76bf9222a33fe68d45", alt: "Warm window glow close-up", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/891f4e22-59c4-42e2-bcca-c6f989850a28_rw_1920.png?h=9cf6e144f3e3478c09c3eaba75bcd88f", alt: "Holiday product shot", aspect: "aspect-[16/9]", span: "md:col-span-12" },
    ],
  },
];

const motionReel = [
  {
    src: "/motion/new-era-cosmic.mp4",
    poster: "/motion/new-era-cosmic.jpg",
    label: "Out of This World",
  },
  {
    src: "/motion/new-era-elements.mp4",
    poster: "/motion/new-era-elements.jpg",
    label: "Elements",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="text-caption font-normal text-bone">{value}</span>
    </figcaption>
  );
}

function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Campaign Section Component                                         */
/* ------------------------------------------------------------------ */

function CampaignSection({
  campaign,
  index,
}: {
  campaign: (typeof campaigns)[0];
  index: number;
}) {
  return (
    <section id={campaign.id} className="section-container section-padding">
      {/* Campaign chapter opener */}
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16 max-w-[640px]"
      >
        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
          {campaign.subtitle}
        </p>
        <h2 className="font-body text-heading-lg font-normal text-bone mb-10">
          {campaign.title}
        </h2>
        <p className="font-body text-body-sm font-normal text-bone">
          {campaign.description}
        </p>
      </m.div>

      {/* Media plates */}
      <m.div
        variants={galleryContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12"
      >
        {campaign.images.map((img) => (
          <m.div key={img.src} variants={galleryItem} className={img.span}>
            <figure>
              <div
                className={`relative ${img.aspect} overflow-hidden rounded-[15px] border border-ash-border`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <PlateCaption label={campaign.discipline} value={img.alt} />
            </figure>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function NewEraCapProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-20">
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
          className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-6"
        >
          Strategy + 3D Animation + VFX
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-6"
        >
          New Era Cap
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone"
        >
          4 Campaigns. One Vision.
        </m.p>

        {/* Metadata row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: prismEase }}
          className="mt-16 border-t border-b border-ash-border py-8"
        >
          <dl className="flex flex-wrap gap-x-16 gap-y-8">
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
                Scope
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.scope}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Services
              </dt>
              <dd>
                <ul className="space-y-1">
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
          </dl>
        </m.div>
      </header>

      {/* ── Hero media plate ──────────────────────────────────────── */}
      <section className="section-container pb-24 md:pb-32">
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/new-era-3d.mp4"
              poster="/motion/new-era-3d.jpg"
              aria-label="New Era Cap campaign visual"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="Campaign Film" value="New Era Cap campaign visual" />
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
          className="mb-14 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Campaigns in Motion
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12"
        >
          {motionReel.map((gif) => (
            <m.figure key={gif.src} variants={galleryItem}>
              <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
                <AutoplayVideo
                  src={gif.src}
                  poster={gif.poster}
                  aria-label={gif.label}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <PlateCaption label="In Motion" value={gif.label} />
            </m.figure>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── The Partnership ───────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Partnership
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone mb-8">
            Building worlds for an iconic brand
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              New Era Cap is one of the most recognized headwear brands in the
              world. Over the course of four campaigns, DT+C became their go-to
              partner for immersive 3D content, transforming each seasonal
              collection into a fully realized visual world.
            </p>
            <p>
              From cosmic galaxies to lush forests, elemental landscapes to snowy
              city blocks, every campaign started with research and creative
              strategy, then came to life through 3D animation, VFX, and
              cinematic sequencing. No location shoots. No physical sets. Just
              ambitious creative delivered at the speed their release calendar
              demanded.
            </p>
          </div>

          {/* Campaign index */}
          <m.nav
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 border-t border-ash-border"
            aria-label="Campaign index"
          >
            {campaigns.map((c, i) => (
              <m.a
                key={c.id}
                href={`#${c.id}`}
                variants={staggerItem}
                className="group flex items-baseline gap-6 border-b border-ash-border py-5"
              >
                <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-body text-body font-normal text-bone group-hover:text-fog-blue transition-colors duration-500 ease-prism">
                    {c.title}
                  </span>
                  <span className="block font-body text-body-sm font-normal text-fog-blue mt-0.5">
                    {c.subtitle}
                  </span>
                </span>
              </m.a>
            ))}
          </m.nav>
        </m.div>
      </section>

      {/* ── Campaign Sections ───────────────────────────────────────── */}
      {campaigns.map((campaign, index) => (
        <div key={campaign.id}>
          <Rule />
          <CampaignSection campaign={campaign} index={index} />
        </div>
      ))}

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
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Ready to build your next world?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s create a campaign with the same cinematic ambition and
            creative strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/seaworld"
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
