"use client";

import Cards from "@/components/projects/refokus-websitedesign/components/Cards";
import Hero from "@/components/projects/refokus-websitedesign/components/Hero";
import Marquees from "@/components/projects/refokus-websitedesign/components/Marquees";
import Projects from "@/components/projects/refokus-websitedesign/components/Projects";
import Cursor from "@/components/projects/refokus-websitedesign/components/StickyCursor/Index";
import Stripes from "@/components/projects/refokus-websitedesign/components/Stripes";
import Header from "@/components/projects/refokus-websitedesign/components/header/Index";
import { useRef, useEffect } from 'react';
import "@/components/projects/refokus-websitedesign/globals.css";

export default function RefokusWebsiteDesignClient() {
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import ('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  const stickyElement = useRef(null);
  return (
    <main className="w-full min-h-screen bg-primary text-secondary font-[satoshi_variable] overflow-hidden">
      <Header ref={stickyElement} />
      <Cursor stickyElement={stickyElement} />
      <Hero />
      <Marquees />
      <Projects />
      <Stripes padding="py-[8vw]" />
      <Cards />
    </main>
  );
}
