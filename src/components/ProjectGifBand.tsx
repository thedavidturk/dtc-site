"use client";

import { m } from "framer-motion";
import AutoplayVideo from "./AutoplayVideo";

interface GifItem {
  /** Path to a self-hosted looping MP4, e.g. "/motion/brugal.mp4". */
  src: string;
  /** Poster still shown instantly while the video loads, e.g. "/motion/brugal.jpg". */
  poster?: string;
  label?: string;
}

interface ProjectGifBandProps {
  /** One or more looping clips to feature. 1 renders full-width, 2 renders side by side. */
  gifs: GifItem[];
  /** Small eyebrow above the band, e.g. "In Motion". */
  eyebrow?: string;
  /** Headline for the band. */
  heading?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Animated showcase band for project pages. Drops in just below the hero to
 * give the page immediate motion using the project's real work. Clips are
 * self-hosted, muted, looping MP4s (converted from the original GIFs for a
 * ~95% smaller payload) with a poster still for instant first paint.
 */
export default function ProjectGifBand({
  gifs,
  eyebrow = "In Motion",
  heading = "The Work, Moving",
}: ProjectGifBandProps) {
  if (!gifs || gifs.length === 0) return null;
  const isPair = gifs.length >= 2;

  return (
    <section
      className="section-container py-16 md:py-24"
      style={{ backgroundColor: "#fffef7" }}
    >
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10"
      >
        <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
          {eyebrow}
        </p>
        <h2 className="font-headline text-h3 font-light text-pure-white">
          {heading}
        </h2>
      </m.div>

      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={`grid gap-6 ${isPair ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {gifs.slice(0, 2).map((gif, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-none border border-black/10 bg-black  "
          >
            {/* Ambient glow on hover */}
            <div className="absolute -inset-px rounded-none bg-gradient-to-br from-terracotta/20 via-transparent to-sun-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />

            <AutoplayVideo
              src={gif.src}
              poster={gif.poster}
              aria-label={gif.label || "Project animation"}
              className="relative w-full aspect-video object-cover"
            />

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-terracotta/40 rounded-tl-lg z-10 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-sun-gold/40 rounded-br-lg z-10 pointer-events-none" />

            {gif.label && (
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-block font-mono text-xs text-bone-white/70 tracking-wider uppercase px-3 py-1 rounded-full border border-black/10 backdrop-blur-sm bg-black/30">
                  {gif.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </m.div>
    </section>
  );
}
