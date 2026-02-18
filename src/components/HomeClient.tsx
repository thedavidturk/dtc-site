"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ValuePropositions from "@/components/ValuePropositions";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";

const CinematicIntro = dynamic(() => import("@/components/CinematicIntro"), {
  ssr: false,
});

export default function HomeClient() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}
      <Hero introComplete={introComplete} />
      <ValuePropositions />
      <FeaturedProjects />
      <Services />
      <Process />
      <About />
      <Pricing />
      <Insights />
      <Contact />
    </>
  );
}
