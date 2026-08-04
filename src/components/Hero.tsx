"use client";

import Image from "next/image";
import { m } from "framer-motion";
import WorkMarquee from "./WorkMarquee";
import useAutoplayInView from "./useAutoplayInView";

/* ------------------------------------------------------------------ */
/*  Real work - pulled from the featured projects                      */
/* ------------------------------------------------------------------ */

interface WorkTile {
  src: string;
  /** Poster still for MP4 tiles, shown instantly while the clip loads. */
  poster?: string;
  client: string;
  tag: string;
}

const work: WorkTile[] = [
  {
    src: "/motion/new-era-3d.mp4",
    poster: "/motion/new-era-3d.jpg",
    client: "New Era Cap",
    tag: "3D / VFX",
  },
  {
    src: "/motion/brugal.mp4",
    poster: "/motion/brugal.jpg",
    client: "Brugal Rum",
    tag: "Activation",
  },
  {
    src: "/motion/faena.mp4",
    poster: "/motion/faena.jpg",
    client: "Faena",
    tag: "Film",
  },
  {
    src: "/motion/ford-mustang.mp4",
    poster: "/motion/ford-mustang.jpg",
    client: "Ford",
    tag: "Commercial",
  },
  {
    src: "/motion/seaworld-reel.mp4",
    poster: "/motion/seaworld-reel.jpg",
    client: "SeaWorld",
    tag: "Cinematics",
  },
  {
    src: "/motion/ford-field-club.mp4",
    poster: "/motion/ford-field-club.jpg",
    client: "Miami Dolphins",
    tag: "Experiential",
  },
  {
    src: "/motion/new-era-elements.mp4",
    poster: "/motion/new-era-elements.jpg",
    client: "New Era Cap",
    tag: "Elements",
  },
  {
    src: "/motion/betterfly-fooh.mp4",
    poster: "/motion/betterfly-fooh.jpg",
    client: "Betterfly",
    tag: "FOOH",
  },
  {
    src: "/motion/unplugged.mp4",
    poster: "/motion/unplugged.jpg",
    client: "Unplugged Sessions",
    tag: "Live Music",
  },
  {
    src: "/motion/new-era-cosmic.mp4",
    poster: "/motion/new-era-cosmic.jpg",
    client: "New Era Cap",
    tag: "Cosmic",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd",
    client: "Runway Health",
    tag: "Product",
  },
  {
    src: "/motion/todes.mp4",
    poster: "/motion/todes.jpg",
    client: "Todes Vejigante",
    tag: "Story",
  },
  {
    src: "/motion/pamm.mp4",
    poster: "/motion/pamm.jpg",
    client: "Perez Art Museum Miami",
    tag: "Cultural",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/24b244e3-b83b-4b7a-baf5-c6b8b65e4475_rw_3840.png?h=99f746c5ced60dde7de6ce105d8562a5",
    client: "Faena",
    tag: "Cinematic",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9093a3b0-956b-49e3-a039-06897868e553_rw_1200.png?h=bf736fd7c3636fa8eedc8a44dd910bcd",
    client: "New Era Cap",
    tag: "Sprouted",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/700cdcee-cf9b-4414-b54c-82e507d0ed53_rw_3840.jpg?h=ad51ee0c19861e16fffbd807aa14d780",
    client: "Betterfly",
    tag: "OOH",
  },
  {
    src: "/motion/crespo.mp4",
    poster: "/motion/crespo.jpg",
    client: "Jaden Smith x CRESPO",
    tag: "Documentary",
  },
  {
    src: "/motion/biscayne.mp4",
    poster: "/motion/biscayne.jpg",
    client: "Biscayne Coffee",
    tag: "Launch",
  },
  {
    src: "/motion/panthers.mp4",
    poster: "/motion/panthers.jpg",
    client: "Ford x Panthers",
    tag: "Brand Film",
  },
  {
    src: "/motion/barrys.mp4",
    poster: "/motion/barrys.jpg",
    client: "Barry's",
    tag: "Fitness",
  },
  {
    src: "/motion/hospitality.mp4",
    poster: "/motion/hospitality.jpg",
    client: "Fontainebleau",
    tag: "TV",
  },
];

/* ------------------------------------------------------------------ */
/*  A single work tile - sharp corners, meta pinned bottom-left        */
/* ------------------------------------------------------------------ */

function Tile({ tile }: { tile: WorkTile }) {
  // Self-hosted MP4 clips render as looping video; remote GIFs stay
  // unoptimized; static stills go through Next's image optimizer.
  const isVideo = tile.src.toLowerCase().endsWith(".mp4");
  const isGif = tile.src.toLowerCase().includes(".gif");
  const videoRef = useAutoplayInView<HTMLVideoElement>();
  return (
    <a
      href="#projects"
      aria-label={`${tile.client} - ${tile.tag}. View our work.`}
      className="group relative block overflow-hidden"
      draggable={false}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {isVideo ? (
          <video
            ref={videoRef}
            src={tile.src}
            poster={tile.poster}
            loop
            muted
            playsInline
            preload="none"
            aria-label={`${tile.client} - ${tile.tag}`}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={tile.src}
            alt={`${tile.client} - ${tile.tag}`}
            fill
            sizes="(max-width: 1024px) 45vw, 22vw"
            className="pointer-events-none object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            unoptimized={isGif}
            draggable={false}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 p-4">
        <span className="text-sm font-light text-bone-white">
          {tile.client}
        </span>
        <span className="text-[10px] font-normal uppercase tracking-[0.14em] text-bone-white/70">
          {tile.tag}
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-bleed horizontal work band                                    */
/* ------------------------------------------------------------------ */

function WorkBand({ tiles }: { tiles: WorkTile[] }) {
  const loop = [...tiles, ...tiles];
  return (
    <WorkMarquee
      orientation="horizontal"
      reverse={false}
      speed={45}
      trackClassName="flex w-max"
    >
      {loop.map((tile, i) => (
        <div
          key={`${tile.client}-${i}`}
          className="w-52 shrink-0 sm:w-64 lg:w-80"
        >
          <Tile tile={tile} />
        </div>
      ))}
    </WorkMarquee>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion presets                                                     */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ------------------------------------------------------------------ */
/*  Hero - oversized poster headline over a full-bleed work band       */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone-white pt-28 md:pt-36">
      {/* ---------------------------- Poster block ---------------------------- */}
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-container"
      >
        {/* Meta eyebrow */}
        <m.p
          variants={item}
          className="mb-8 text-caption font-normal uppercase tracking-[0.08em] text-graphite"
        >
          DT+C // AI-Native Creative Studio
        </m.p>

        {/* Poster headline - two lines, weight 300, one chromatic hit */}
        <h1 className="font-display font-light text-display text-ink-black">
          <m.span variants={item} className="block">
            Content that moves
          </m.span>
          <m.span variants={item} className="block">
            at the speed of{" "}
            <span className="text-magenta-bloom">culture.</span>
          </m.span>
        </h1>

        {/* Subhead + CTAs share a row on desktop */}
        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <m.p
            variants={item}
            className="max-w-xl text-body-lg font-normal text-graphite"
          >
            Strategy, content, VFX, and web, under one roof and built to
            launch in{" "}
            <span className="text-ink-black">weeks, not months.</span>
          </m.p>

          <m.div
            variants={item}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-ink-black px-7 py-3.5 font-normal text-bone-white transition-opacity duration-300 hover:opacity-75"
            >
              See Our Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-pill border border-ash px-7 py-3.5 font-normal text-ink-black transition-colors duration-300 hover:border-ink-black"
            >
              Book a Call
            </a>
          </m.div>
        </div>
      </m.div>

      {/* ---------------------------- Full-bleed work band ---------------------------- */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
        className="mt-14 md:mt-20"
      >
        <WorkBand tiles={work} />
      </m.div>

      {/* Client strip */}
      <div className="section-container">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-8"
        >
          <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-graphite">
            Trusted by
          </span>
          {[
            "New Era Cap",
            "United Parks",
            "Ford Motors",
            "Betterfly",
            "Barry's",
          ].map((name) => (
            <span key={name} className="text-sm font-normal text-ink-black">
              {name}
            </span>
          ))}
          <span className="text-sm font-normal text-graphite">
            &amp; more
          </span>
        </m.div>
      </div>
    </section>
  );
}
