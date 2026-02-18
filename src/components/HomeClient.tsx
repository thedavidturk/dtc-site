"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
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
        <CinematicIntro onComplete={() => { introHasPlayed = true; setIntroComplete(true); }} />
      )}
      <Hero introComplete={introComplete} />
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
