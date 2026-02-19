"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";
import ValuePropositions from "@/components/ValuePropositions";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";

const CinematicIntro = dynamic(() => import("@/components/CinematicIntro"), {
  ssr: false,
});

/** Survives client-side navigations but resets on hard reload / new tab */
let introHasPlayed = false;

export default function HomeClient() {
  const [introComplete, setIntroComplete] = useState(introHasPlayed);
  const introMounted = useRef(false);

  const completeIntro = useCallback(() => {
    introHasPlayed = true;
    setIntroComplete(true);
  }, []);

  // Called by CinematicIntro once its Canvas is rendering frames.
  // This starts the safety timeout — gives the animation 10s to finish
  // after it's confirmed to be running.
  const onIntroReady = useCallback(() => {
    introMounted.current = true;
  }, []);

  // Two-tier safety timeout:
  // 1. If the intro bundle hasn't loaded after 12s, force-skip (import failed).
  // 2. If the intro IS running but hasn't completed after 10s, force-skip (animation stuck).
  useEffect(() => {
    if (introComplete) return;

    // Tier 1: max wait for the dynamic import + Canvas init
    const importTimeout = setTimeout(() => {
      if (!introMounted.current) completeIntro();
    }, 12000);

    // Tier 2: max total time for everything (import + animation)
    const totalTimeout = setTimeout(completeIntro, 20000);

    return () => {
      clearTimeout(importTimeout);
      clearTimeout(totalTimeout);
    };
  }, [introComplete, completeIntro]);

  return (
    <>
      {/* Static dark overlay — blocks content while CinematicIntro JS bundle loads.
          CinematicIntro is dynamically imported (ssr: false), so without this overlay
          the page content flashes briefly before the intro canvas mounts. This overlay
          is purely CSS (no JS needed) and gets hidden once the intro takes over. */}
      {!introComplete && (
        <div
          className="fixed inset-0 z-[99] pointer-events-none"
          style={{ backgroundColor: "#0B0F19" }}
          aria-hidden="true"
        />
      )}
      {!introComplete && (
        <CinematicIntro onComplete={completeIntro} onReady={onIntroReady} />
      )}
      <Hero introComplete={introComplete} />
      <HeroVideo />
      <ValuePropositions />
      <FeaturedProjects />
      <Services />
      <Process />
      <About />
      <Insights />
      <Contact />
    </>
  );
}
