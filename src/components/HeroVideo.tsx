"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  // Scan line offset
  const scanOffset = useRef(0);
  const scanLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      scanOffset.current = (scanOffset.current + 0.3) % 200;
      if (scanLineRef.current) {
        scanLineRef.current.style.backgroundPosition = `0px ${scanOffset.current}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

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
    <section
      ref={sectionRef}
      className="relative bg-deep-space overflow-hidden"
      style={{ backgroundColor: "#0B0F19" }}
    >
      {/* Ambient glow behind video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[80%] h-[60%] opacity-[0.06] blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #6366F1 0%, #F97316 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-10 py-16 md:py-24">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Agency Reel
          </p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-pure-white tracking-tight">
            <TextReveal text="SEE THE WORK" as="span" className="block" />
            <TextReveal
              text="IN MOTION"
              as="span"
              className="block gradient-text"
              delay={0.2}
            />
          </h2>
        </motion.div>

        {/* Video container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative max-w-6xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative group"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-electric-indigo/20 via-transparent to-warm-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

            {/* Main video frame */}
            <div
              className="video-container relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/40 cursor-pointer"
              onMouseMove={resetHideTimer}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              {/* HTML5 Video */}
              <video
                ref={videoRef}
                src="/videos/dtc-reel.mp4"
                poster="/videos/dtc-reel-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted={isMuted}
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onClick={togglePlay}
              />

              {/* Scan lines overlay — visible before play */}
              {!hasStarted && (
                <div
                  ref={scanLineRef}
                  className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                  }}
                />
              )}

              {/* Vignette — always present, subtle */}
              <div
                className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: hasStarted ? 0.3 : 1,
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* Big play button — poster state */}
              <AnimatePresence>
                {!hasStarted && (
                  <motion.button
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 0.4 }}
                    onClick={togglePlay}
                    className="absolute inset-0 z-[6] flex items-center justify-center cursor-pointer group/play"
                    aria-label="Play agency reel"
                  >
                    {/* Dark overlay for poster */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

                    <div className="relative">
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 rounded-full bg-electric-indigo/20 animate-ping" />

                      {/* Button circle */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/play:border-electric-indigo/60 group-hover/play:bg-electric-indigo/10 transition-all duration-500">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-pure-white ml-1 group-hover/play:scale-110 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom caption */}
                    <div className="absolute bottom-6 left-6 pointer-events-none">
                      <span className="inline-block font-mono text-xs text-white/50 tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
                        DT+C Agency Reel
                      </span>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Custom controls bar */}
              {hasStarted && (
                <motion.div
                  initial={false}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 inset-x-0 z-[8] pointer-events-auto"
                >
                  {/* Gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="relative px-4 md:px-6 pb-4 pt-10">
                    {/* Progress bar */}
                    <div
                      ref={progressRef}
                      onClick={handleProgressClick}
                      className="group/bar w-full h-1.5 bg-white/10 rounded-full cursor-pointer mb-3 hover:h-2.5 transition-all duration-200"
                    >
                      {/* Buffered / played */}
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-electric-indigo to-warm-coral relative"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Scrub handle */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pure-white shadow-lg shadow-black/30 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* Play / Pause */}
                        <button
                          onClick={togglePlay}
                          className="text-pure-white hover:text-electric-indigo transition-colors"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>

                        {/* Mute / Unmute */}
                        <button
                          onClick={toggleMute}
                          className="text-pure-white hover:text-electric-indigo transition-colors"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                          )}
                        </button>

                        {/* Time */}
                        <span className="font-mono text-xs text-white/60 tabular-nums">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-pure-white hover:text-electric-indigo transition-colors"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-electric-indigo/30 rounded-tl-lg z-[5] pointer-events-none" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-electric-indigo/30 rounded-tr-lg z-[5] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-warm-coral/30 rounded-bl-lg z-[5] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-warm-coral/30 rounded-br-lg z-[5] pointer-events-none" />
            </div>

            {/* Reflection glow beneath */}
            <div
              className="absolute -bottom-8 left-[10%] right-[10%] h-16 opacity-[0.08] blur-2xl rounded-full"
              style={{
                background: "linear-gradient(90deg, #6366F1, #F97316)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
