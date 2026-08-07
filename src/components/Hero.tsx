"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import WorkMarquee from "./WorkMarquee";
import LineReveal from "./LineReveal";
import PrismArtifact from "./PrismArtifact";
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

/* Quiet client roll: one fog-blue caption line below the fold. */
const clients = [
  "New Era Cap",
  "Ford",
  "SeaWorld",
  "Miami Dolphins",
  "Betterfly",
  "Brugal Rum",
  "Faena",
  "Barry's",
  "United Parks",
  "Perez Art Museum Miami",
];

/* ------------------------------------------------------------------ */
/*  A single work tile - rounded media card on the void, caption below */
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
      className="group block"
      draggable={false}
    >
      {/* The card: 15px radius on the void, nothing overlaid */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[15px]">
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
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={tile.src}
            alt={`${tile.client} - ${tile.tag}`}
            fill
            sizes="(max-width: 1024px) 45vw, 22vw"
            className="pointer-events-none object-cover"
            unoptimized={isGif}
            draggable={false}
          />
        )}
      </div>
      {/* Caption below the card: client in bone, tag in fog-blue */}
      <div className="flex items-baseline justify-between gap-3 pt-3">
        <span className="text-sm font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
          {tile.client}
        </span>
        <span className="text-[11px] font-normal uppercase tracking-[0.02em] text-fog-blue">
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
          className="w-56 shrink-0 px-2 sm:w-72 sm:px-2.5 lg:w-[21.5rem] lg:px-3"
        >
          <Tile tile={tile} />
        </div>
      ))}
    </WorkMarquee>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion presets - focus-pull curve, transform + opacity only        */
/* ------------------------------------------------------------------ */

const easePrism = [0.52, 0.01, 0, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePrism } },
};

/* ------------------------------------------------------------------ */
/*  Hero - obsidian void, prism artifact, display type crossing it     */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* The hero-exit morph, scrubbed by how far the landing panel has
     scrolled out: the cubes converge and spin up, detonate into a
     chromatic flash, and the flash condenses into the hairline that
     introduces the next section. Scrolling back up reverses it. */
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start start", "end start"],
  });

  const converge = useTransform(scrollYProgress, [0.02, 0.32], [0, 1]);
  const morphRotation = useTransform(scrollYProgress, [0, 0.38], [0, Math.PI]);
  const prismOpacity = useTransform(scrollYProgress, [0.28, 0.4], [1, 0]);
  const prismScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.55]);

  /* The flash: a burst of light that peaks as the cubes vanish. It is
     anchored near the panel's exit edge, so it blooms exactly where
     the next band is arriving. */
  const burstOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.48, 0.56],
    [0, 0.95, 0.85, 0]
  );
  const burstHeight = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.56],
    ["4px", "34vh", "2px"]
  );
  const burstWidth = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.56],
    ["12vw", "44vw", "70vw"]
  );

  /* ...and condenses into the hairline that rules the next band. */
  const lineScaleX = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1]);
  const lineColor = useTransform(
    scrollYProgress,
    [0.58, 0.85],
    ["#fffdf9", "#403f3f"]
  );

  return (
    <section className="relative overflow-hidden ">
      {/* ------------------------- Void panel ------------------------- */}
      <div
        ref={panelRef}
        className="relative flex min-h-screen flex-col justify-center pb-16 pt-28 md:pt-32"
      >
        {/* The artifact: smaller and lower on mobile so the headline
            owns the screen; full presence on desktop. The scrub morphs
            it as the panel scrolls out. */}
        <m.div
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: prismOpacity, scale: prismScale }
          }
          className="pointer-events-none absolute left-1/2 top-[64%] z-0 h-[34vh] w-[74vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:h-[72vh] md:w-[40vw]"
        >
          <PrismArtifact
            className="h-full w-full opacity-70 md:opacity-100"
            scrollRotation={prefersReducedMotion ? undefined : morphRotation}
            converge={prefersReducedMotion ? undefined : converge}
          />
        </m.div>

        {/* The flash: light bursting from the collapsed cluster, with
            the artifact's red/cyan fringe, then the condensed hairline
            that introduces the next section. */}
        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[96%] z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center md:top-[94%]"
          >
            <m.div
              style={{
                opacity: burstOpacity,
                height: burstHeight,
                width: burstWidth,
                background:
                  "radial-gradient(closest-side, rgba(255,253,249,0.95), rgba(255,253,249,0.35) 45%, rgba(255,253,249,0) 72%)",
              }}
              className="relative rounded-[50%]"
            >
              <div
                className="absolute inset-0 -translate-x-[6px] rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,42,42,0.35), rgba(255,42,42,0) 70%)",
                }}
              />
              <div
                className="absolute inset-0 translate-x-[6px] rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(42,127,255,0.35), rgba(42,127,255,0) 70%)",
                }}
              />
            </m.div>
          </div>
        )}
        {!prefersReducedMotion && (
          <m.div
            aria-hidden="true"
            style={{
              scaleX: lineScaleX,
              opacity: lineOpacity,
              backgroundColor: lineColor,
            }}
            className="pointer-events-none absolute left-1/2 top-[96%] z-0 h-px w-[86vw] -translate-x-1/2 md:top-[94%]"
          />
        )}

        <div className="section-container relative z-30">
          {/* Sculptural display headline: one weight, hierarchy from
              scale alone, each line rising from its own mask. */}
          <h1 className="text-display font-normal text-bone">
            <LineReveal delay={0.15}>Content that</LineReveal>
            <LineReveal delay={0.27}>moves at the</LineReveal>
            <LineReveal delay={0.39}>speed of culture.</LineReveal>
          </h1>

          <m.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-12 md:mt-16"
          >
            {/* Lead paragraph: single narrow column, below-left */}
            <m.p
              variants={item}
              className="max-w-[440px] text-left text-body-lg font-normal text-bone"
            >
              Strategy, content, VFX, and web, under one roof and built to
              launch in weeks, not months.
            </m.p>

            {/* CTAs: one outlined button, one ghost link */}
            <m.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a href="/#contact" className="btn-primary">
                Book a Call
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
              >
                See Our Work
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </m.div>
          </m.div>
        </div>
      </div>

      {/* Quiet client roll: fog-blue caption line below the fold */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easePrism, delay: 0.8 }}
        className="section-container pb-10"
      >
        <p className="text-caption font-normal text-fog-blue">
          {clients.join(" · ")}
        </p>
      </m.div>

      {/* ------------- Full-bleed work band: the work, in motion ------------- */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easePrism, delay: 0.35 }}
        className="pb-16 md:pb-24"
      >
        <WorkBand tiles={work} />
      </m.div>
    </section>
  );
}
