"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/TransitionLink";
import { site } from "@/content/work";
import PreviewNote from "./PreviewNote";

/**
 * Near-full-screen hero led by one project. Desktop plays a short muted
 * loop; phones and reduced-motion visitors get the still. Sound never
 * autoplays, and the loop can be paused.
 */
export default function HomeHero({
  still,
  loop,
  projectHref,
  projectLabel,
  showNotes,
}: {
  still?: string;
  loop?: string;
  projectHref: string;
  projectLabel: string;
  showNotes: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!loop) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseVideo(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [loop]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <section className="relative h-[92svh] min-h-[600px] w-full overflow-hidden" aria-label="Introduction">
      {/* Media */}
      <div className="absolute inset-0 bg-[#141414]">
        {still && (
          <Image
            src={still}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {loop && useVideo && (
          <video
            ref={videoRef}
            src={loop}
            poster={still}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-prism ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Legibility: a soft fade at the top for the nav, a deeper one at
          the bottom for the name. The hero is the one place type sits
          over media. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian/70 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-obsidian via-obsidian/55 to-transparent" />

      {!still && !loop && (
        <div className="absolute inset-x-0 top-24 md:top-28">
          <div className="section-container">
            <PreviewNote show={showNotes}>
              The 2062 hero goes here. Add public/work/2062/hero.mp4 (6&ndash;10s,
              muted, 1920px wide) and hero.jpg (the still for phones).
            </PreviewNote>
          </div>
        </div>
      )}

      {/* Copy */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="section-container pb-8 md:pb-12">
          <h1 className="font-anton text-display uppercase tracking-normal text-bone h1-paint-in">
            {site.person}
          </h1>
          <p className="mt-5 text-balance font-body text-heading-sm font-normal text-bone">
            {site.tagline}
          </p>
          <p className="mt-3 max-w-[52ch] text-balance font-body text-body-sm font-normal text-bone/75">
            {site.positioning}
          </p>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-t border-bone/15 pt-5">
            <Link
              href={projectHref}
              className="text-caption font-normal uppercase tracking-[0.02em] text-bone/80 transition-colors duration-500 ease-prism hover:text-bone"
            >
              {projectLabel}
            </Link>
            <div className="flex items-center gap-8">
              {loop && useVideo && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="text-caption font-normal uppercase tracking-[0.02em] text-bone/60 transition-colors duration-500 ease-prism hover:text-bone"
                  aria-label={paused ? "Play background video" : "Pause background video"}
                >
                  {paused ? "Play" : "Pause"}
                </button>
              )}
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
              >
                Explore the work
                <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
