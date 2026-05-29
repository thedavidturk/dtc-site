"use client";

import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";
import ValuePropositions from "@/components/ValuePropositions";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Insights from "@/components/Insights";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import Contact from "@/components/Contact";

export default function HomeClient() {
  return (
    <>
      <Hero />
      <HeroVideo />
      <ValuePropositions />
      <FeaturedProjects />
      <Services />
      <Process />
      <About />
      <Insights />
      <FAQ />
      <EmailCapture />
      <Contact />
    </>
  );
}
