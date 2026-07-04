"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import WorkMarquee from "./WorkMarquee";
import useAutoplayInView from "./useAutoplayInView";

/* ------------------------------------------------------------------ */
/*  Desktop / mobile detection (JS, not CSS)                           */
/*                                                                     */
/*  The desktop wall and mobile strip each mount dozens of videos, so  */
/*  only one variant may render - display:none alone doesn't stop the  */
/*  hidden copy from downloading and decoding. Pre-mount we default to */
/*  the mobile strip (its lg:hidden class keeps it invisible on        */
/*  desktop, so there's no layout flash while the wall swaps in).      */
/* ------------------------------------------------------------------ */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

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
/*  A single work tile                                                 */
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
      className="group relative block overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] shadow-xl shadow-black/40 transition-colors duration-300 hover:border-white/20"
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-space/90 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
        <span className="font-headline text-sm font-semibold text-pure-white">
          {tile.client}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-warm-coral">
          {tile.tag}
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  A vertically-scrolling column (interactive: auto + drag)           */
/* ------------------------------------------------------------------ */

function MarqueeColumn({
  tiles,
  reverse,
  speed,
}: {
  tiles: WorkTile[];
  reverse: boolean;
  speed: number;
}) {
  // Duplicate the set so the wrap-around loop is seamless.
  const loop = [...tiles, ...tiles];
  return (
    <WorkMarquee
      orientation="vertical"
      reverse={reverse}
      speed={speed}
      className="flex-1"
      trackClassName="flex flex-col gap-4"
    >
      {loop.map((tile, i) => (
        <Tile key={`${tile.client}-${i}`} tile={tile} />
      ))}
    </WorkMarquee>
  );
}

/* ------------------------------------------------------------------ */
/*  A horizontally-scrolling strip - mobile only (interactive)         */
/* ------------------------------------------------------------------ */

function MarqueeRow({ tiles }: { tiles: WorkTile[] }) {
  const loop = [...tiles, ...tiles];
  return (
    <WorkMarquee
      orientation="horizontal"
      reverse={false}
      speed={45}
      trackClassName="flex w-max gap-4"
    >
      {loop.map((tile, i) => (
        <div key={`${tile.client}-${i}`} className="w-44 shrink-0">
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
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const colA = work.filter((_, i) => i % 2 === 0);
  const colB = work.filter((_, i) => i % 2 === 1);
  const isDesktop = useIsDesktop();

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-deep-space pt-24 lg:pt-0"
      style={{ backgroundColor: "#120D1A" }}
    >
      {/* Ambient color wash */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-electric-indigo/15 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[32rem] w-[32rem] rounded-full bg-warm-coral/10 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12">
        {/* ---------------------------- Left: message ---------------------------- */}
        <m.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="py-16 lg:py-0"
        >
          {/* Eyebrow */}
          <m.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm-coral opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warm-coral" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cool-gray">
              DT+C - Creative Studio
            </span>
          </m.div>

          {/* Headline - editorial mixed-scale display type */}
          <h1 className="font-display text-pure-white">
            {/* Line 1: "Content that" - tight, bold, large */}
            <m.span
              variants={item}
              className="block font-bold leading-[0.86] tracking-[-0.03em] text-h1"
            >
              Content that
            </m.span>

            {/* Line 2: "moves at the speed of" - smaller, lighter, italic, wider tracking */}
            <m.span
              variants={item}
              className="mt-2 block font-light italic leading-none tracking-[0.01em] text-cool-gray text-2xl sm:text-3xl lg:text-[2.4rem]"
            >
              moves at the speed of
            </m.span>

            {/* Line 3: "culture." - oversized hero word in gradient */}
            <m.span
              variants={item}
              className="mt-1 block gradient-text font-extrabold leading-[0.82] tracking-[-0.04em] text-display"
            >
              culture.
            </m.span>
          </h1>

          {/* Subhead */}
          <m.p
            variants={item}
            className="mt-8 max-w-xl font-body text-lg leading-relaxed text-cool-gray"
          >
            Strategy, content, VFX, and web, under one roof and built to launch
            in <span className="text-pure-white">weeks, not months.</span>
          </m.p>

          {/* CTAs */}
          <m.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-cta px-7 py-4 font-headline font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
            >
              See Our Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-7 py-4 font-headline font-bold text-pure-white backdrop-blur-sm transition-all duration-300 hover:border-electric-indigo/60 hover:bg-electric-indigo/10"
            >
              Book a Call
            </a>
          </m.div>

          {/* Client strip */}
          <m.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool-gray/50">
              Trusted by
            </span>
            {[
              "New Era Cap",
              "United Parks",
              "Ford Motors",
              "Betterfly",
              "Barry's",
            ].map((name) => (
              <span
                key={name}
                className="font-headline text-sm font-semibold text-cool-gray/80"
              >
                {name}
              </span>
            ))}
            <span className="font-headline text-sm font-semibold text-cool-gray/40">
              &amp; more
            </span>
          </m.div>
        </m.div>

        {/* ---------------------------- Right: work wall ---------------------------- */}
        {isDesktop && (
          <m.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative hidden lg:block lg:h-screen"
          >
            {/* Two scrolling columns (auto-scroll, grab to drag, click to view work) */}
            <div className="absolute inset-0 flex gap-4 px-1 py-6">
              <MarqueeColumn tiles={colA} reverse={false} speed={34} />
              <MarqueeColumn tiles={colB} reverse speed={28} />
            </div>

            {/* Feather edges so the wall melts into the page */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-deep-space to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-deep-space to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-deep-space to-transparent" />
          </m.div>
        )}

        {/* ---------------------------- Mobile work strip ---------------------------- */}
        {!isDesktop && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="-mx-6 pb-16 md:-mx-8 lg:hidden"
          >
            <MarqueeRow tiles={work} />
          </m.div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool-gray/40">
          Scroll
        </span>
        <svg
          className="h-4 w-4 text-cool-gray/40 hero-scroll-bob"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
