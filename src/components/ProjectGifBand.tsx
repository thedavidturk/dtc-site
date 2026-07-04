"use client";

import { motion } from "framer-motion";

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
      style={{ backgroundColor: "#120D1A" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10"
      >
        <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
          {eyebrow}
        </p>
        <h2 className="font-headline text-h3 font-bold text-pure-white">
          {heading}
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={`grid gap-6 ${isPair ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {gifs.slice(0, 2).map((gif, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40"
          >
            {/* Ambient glow on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-electric-indigo/20 via-transparent to-warm-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />

            <video
              src={gif.src}
              poster={gif.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={gif.label || "Project animation"}
              className="relative w-full aspect-video object-cover"
            />

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-electric-indigo/40 rounded-tl-lg z-10 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-warm-coral/40 rounded-br-lg z-10 pointer-events-none" />

            {gif.label && (
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-block font-mono text-xs text-white/70 tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-black/30">
                  {gif.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
