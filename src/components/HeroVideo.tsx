"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { m, useScroll, useTransform, AnimatePresence } from "framer-motion";
import LineReveal from "./LineReveal";

const easePrism = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePrism },
  },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gentle scroll drift: the card settles into place as it enters
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  // Auto-hide controls after inactivity
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isPlaying) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) setShowControls(true);
  }, [isPlaying]);

  // Video event handlers
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  // Playback controls
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!hasStarted) setHasStarted(true);
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
    resetHideTimer();
  }, [hasStarted, resetHideTimer]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = sectionRef.current?.querySelector(".video-container") as HTMLElement;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Scrub on progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden ">
      <div className="section-container relative z-10 section-padding">
        {/* Opener: one weight, scale carries the volume */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-h2 font-normal headline-cyan">
            <LineReveal>See the work</LineReveal>
            <LineReveal delay={0.15}>in motion</LineReveal>
          </h2>
        </m.div>

        {/* Monumental centered media card */}
        <m.div style={{ scale, opacity }} className="relative mx-auto max-w-6xl">
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Fullscreen target wraps card + controls so the strip
                survives fullscreen, on the void in both states */}
            <div
              className={`video-container flex flex-col ${
                isFullscreen ? "h-full" : ""
              }`}
              onMouseMove={resetHideTimer}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              {/* The card: 15px radius, hairline ash outline */}
              <div
                className={`relative cursor-pointer overflow-hidden rounded-[15px] border border-ash-border ${
                  isFullscreen ? "min-h-0 flex-1" : "aspect-video"
                }`}
              >
                {/* HTML5 Video */}
                <video
                  ref={videoRef}
                  src="/videos/dtc-reel.mp4"
                  poster="/videos/dtc-reel-poster.jpg"
                  className="absolute inset-0 h-full w-full object-cover"
                  playsInline
                  muted={isMuted}
                  preload="metadata"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                  onClick={togglePlay}
                />

                {/* Play affordance - poster state, outlined bone square,
                    no scrim over the still */}
                <AnimatePresence>
                  {!hasStarted && (
                    <m.button
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: easePrism }}
                      onClick={togglePlay}
                      className="group/play absolute inset-0 z-[6] flex cursor-pointer items-center justify-center"
                      aria-label="Play agency reel"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-[5px] border border-bone bg-transparent text-bone transition-colors duration-500 ease-prism group-hover/play:bg-bone group-hover/play:text-obsidian md:h-20 md:w-20">
                        <svg
                          className="ml-1 h-7 w-7 md:h-8 md:w-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </m.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls strip - below the card, on the void */}
              {hasStarted && (
                <m.div
                  initial={false}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`pt-4 ${isFullscreen ? "px-6 pb-5" : ""}`}
                >
                  {/* Progress rule: ash hairline track, bone fill */}
                  <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    className="group/bar mb-3 flex h-4 w-full cursor-pointer items-center"
                  >
                    <div className="relative h-[3px] w-full bg-ash-border">
                      <div
                        className="relative h-full bg-bone"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Scrub handle */}
                        <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-bone opacity-0 transition-opacity duration-200 group-hover/bar:opacity-100" />
                      </div>
                    </div>
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Mute / Unmute */}
                      <button
                        onClick={toggleMute}
                        className="text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        )}
                      </button>

                      {/* Time */}
                      <span className="text-xs font-normal tabular-nums text-fog-blue">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                      )}
                    </button>
                  </div>
                </m.div>
              )}
            </div>

            {/* Caption below the card: label in fog-blue, line in bone */}
            <div className="mt-5">
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                Agency Reel
              </p>
              <p className="mt-1 text-body font-normal text-bone">
                DT+C, the work in motion
              </p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
